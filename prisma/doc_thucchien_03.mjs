// doc_thucchien_03.mjs — 4 bài "Thực chiến doanh nghiệp" (kind=thucchien):
// E-commerce (coupon/order-to-cash), Retail (omnichannel/loyalty), CRM (dedup/RBAC), ERP (purchase/GL close).
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ============================================================================================
// BÀI 1: E-commerce — Khuyến mãi/coupon (stacking, ngưỡng, giới hạn dùng) & Order-to-Cash
// ============================================================================================

const cover1 = makeThumb({ id: "ec-o2c-01", domain: "ecommerce", kind: "thucchien", label: "実戦 · O2C COUPON" });

const svg1Arch = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Luồng Order-to-Cash · Order-to-Cash flow</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="78" text-anchor="middle">Giỏ hàng + Coupon</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="215" y="78" text-anchor="middle">Pricing Engine</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="355" y="78" text-anchor="middle">Order Service</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="495" y="78" text-anchor="middle">Payment Gateway</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="635" y="78" text-anchor="middle">Ledger/Revenue</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#94a3b8" stroke-width="2" marker-end="url(#a1)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="215" y="158" text-anchor="middle">Coupon Ledger</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="355" y="158" text-anchor="middle">Inventory Reserve</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="495" y="158" text-anchor="middle">Fulfillment/WMS</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="300" y="200" width="220" height="40" rx="8" fill="#052e2b" stroke="#34d399"/><text x="410" y="225" text-anchor="middle" fill="#6ee7b7">Bất biến: Tổng tiền = Σ item − giảm giá hợp lệ</text>
</g>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg1Matrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca coupon · Coupon case matrix</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="44" width="700" height="30" fill="#1e293b"/>
<text x="30" y="64">Ca</text><text x="180" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Mức rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 Stack 2 coupon</text><text x="180" y="94">%giảm + freeship, không loại trừ nhau</text><text x="420" y="94">Tổng giảm ≤ trần cấu hình</text><text x="620" y="94" fill="#f59e0b">Cao</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 Ngưỡng đơn tối thiểu</text><text x="180" y="124">Đơn 299k, coupon yêu cầu ≥300k</text><text x="420" y="124">Coupon bị từ chối, giỏ hàng không đổi</text><text x="620" y="124" fill="#34d399">TB</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 Giới hạn dùng/user</text><text x="180" y="154">User dùng lần 2 khi limit=1</text><text x="420" y="154">Từ chối, không trừ thêm ngân sách coupon</text><text x="620" y="154" fill="#f59e0b">Cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 Race condition</text><text x="180" y="184">2 request áp cùng coupon giới hạn 1 lượt cuối</text><text x="420" y="184">Chỉ 1 request thắng, không vượt limit</text><text x="620" y="184" fill="#ef4444">Rất cao</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Hủy đơn sau khi dùng coupon</text><text x="180" y="214">Refund toàn phần</text><text x="420" y="214">Hoàn ngân sách coupon, đơn về CANCELLED</text><text x="620" y="214" fill="#34d399">TB</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Timeout thanh toán</text><text x="180" y="244">Gateway timeout sau khi giữ tồn kho</text><text x="420" y="244">Giải phóng reserve, không double revenue</text><text x="620" y="264" fill="#ef4444">Rất cao</text>
</g>
</svg>`;

const pages1 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một sàn TMĐT thời trang đa danh mục xử lý trung bình 180.000 đơn hàng/ngày, cao điểm sale 9.9 hoặc 11.11 có thể chạm 1,2 triệu đơn trong 24 giờ. Đội ngũ marketing phát hành liên tục các chương trình khuyến mãi: mã giảm giá phần trăm, mã freeship, mã giảm giá theo ngưỡng đơn hàng, và các chương trình có thể stack (cộng dồn) với nhau theo quy tắc ưu tiên. Sai sót trong tính coupon từng khiến một sàn tương tự lỗ hơn 4 tỷ đồng trong một đợt flash sale do lỗi cho phép cộng dồn hai mã loại trừ lẫn nhau.",
        "A multi-category fashion e-commerce platform processes an average of 180,000 orders per day, and flagship sale events like 9.9 or 11.11 can spike to 1.2 million orders within 24 hours. The marketing team continuously launches promotions: percentage discounts, free-shipping codes, threshold-based discounts, and stackable combinations governed by priority rules. A similar platform once lost over 4 billion VND in a flash sale due to a bug that allowed stacking of two mutually exclusive codes.",
        "あるマルチカテゴリのファッションECサイトは、平均で1日18万件の注文を処理しており、9.9セールや11.11セールのようなピーク時には24時間で120万件に達することもあります。マーケティングチームは、パーセント割引・送料無料クーポン・注文金額の閾値による割引、そして優先順位ルールに基づき重複適用（スタッキング）可能な組み合わせなど、キャンペーンを継続的に展開しています。類似のプラットフォームでは、相互排他のはずの2つのクーポンが重複適用されてしまうバグにより、あるフラッシュセールで40億ドン以上の損失を出した事例があります。"
      ),
      P(
        "Phạm vi bài viết bao trùm toàn bộ vòng đời order-to-cash: khách chọn sản phẩm, áp mã khuyến mãi, đặt hàng, thanh toán qua cổng (VNPay/Momo/thẻ), giao vận, và cuối cùng ghi nhận doanh thu vào sổ cái kế toán. Đây là chuỗi nghiệp vụ xuyên nhiều service (pricing, order, payment, inventory, ledger) nên lỗi ở một khâu có thể lan sang khâu sau, gây lệch số liệu tài chính hoặc bán vượt tồn kho. Ràng buộc tuân thủ bao gồm: không được ghi nhận doanh thu trước khi hàng giao thành công (theo nguyên tắc kế toán dồn tích có điều kiện), và log áp dụng coupon phải lưu tối thiểu 5 năm để phục vụ kiểm toán thuế.",
        "The scope covers the entire order-to-cash lifecycle: product selection, promo code application, checkout, payment via gateway (VNPay/Momo/card), fulfillment, and finally revenue recognition in the accounting ledger. This chain spans multiple services (pricing, order, payment, inventory, ledger), so a defect in one stage can cascade downstream, causing financial discrepancies or overselling. Compliance constraints include: revenue must not be recognized before successful delivery (per conditional accrual accounting), and coupon application logs must be retained for at least 5 years for tax audit purposes.",
        "本稿の範囲は、商品選択・プロモコード適用・注文確定・決済（VNPay/Momo/カード）・配送、そして最終的な会計元帳への売上計上までの、order-to-cash（受注から入金まで）ライフサイクル全体をカバーします。これは価格計算・注文・決済・在庫・元帳という複数サービスをまたぐ業務フローであり、ある工程での不具合が後工程に波及し、財務数値のずれや超過販売を引き起こす可能性があります。コンプライアンス上の制約として、配送完了前に売上を計上してはならないこと（条件付き発生主義会計の原則）、およびクーポン適用ログは税務監査のため最低5年間保存する必要があります。"
      ),
      IMG(svg1Arch, "Kiến trúc luồng Order-to-Cash với các service pricing/order/payment/ledger", "Order-to-Cash architecture across pricing/order/payment/ledger services", "価格計算・注文・決済・元帳サービスにまたがるOrder-to-Cashアーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho pricing engine: tính giảm giá, stacking, ngưỡng, giới hạn dùng", "Kiểm thử E2E Playwright cho luồng đặt hàng có áp coupon", "Kiểm thử đối soát cuối ngày giữa order, payment, ledger"],
        ["API testing for the pricing engine: discount calculation, stacking, thresholds, usage limits", "Playwright E2E testing for the order flow with coupon application", "End-of-day reconciliation testing between order, payment, and ledger"],
        ["価格計算エンジンのAPIテスト：割引計算・重複適用・閾値・利用回数上限", "クーポン適用を含む注文フローのPlaywright E2Eテスト", "注文・決済・元帳間の日次締め対査テスト"]
      ),
      NOTE("Bài này giả định hệ thống có test-only endpoint để seed coupon và reset ví ngân sách khuyến mãi giữa các lần chạy.", "This article assumes the system has test-only endpoints to seed coupons and reset promo budget wallets between runs.", "本稿では、実行間でクーポンやプロモ予算ウォレットをシードおよびリセットするテスト専用エンドポイントが存在することを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 service chính: Pricing Engine (tính giá và giảm giá), Order Service (quản lý vòng đời đơn hàng), Payment Gateway (tích hợp cổng thanh toán bên thứ ba), Inventory Reserve (giữ tồn kho tạm thời trong 15 phút chờ thanh toán), và Ledger/Revenue (ghi nhận bút toán kế toán). Luồng đồng bộ diễn ra khi khách bấm 'Áp dụng mã' — pricing engine phải phản hồi trong dưới 300ms để không ảnh hưởng trải nghiệm; luồng bất đồng bộ diễn ra sau khi thanh toán thành công, hệ thống phát sự kiện OrderPaid để Inventory chốt trừ kho vĩnh viễn và Ledger ghi nhận doanh thu tạm hoãn (deferred revenue) chờ giao hàng.",
        "The architecture has 5 core services: Pricing Engine (price and discount calculation), Order Service (order lifecycle management), Payment Gateway (third-party payment integration), Inventory Reserve (temporary stock hold for 15 minutes pending payment), and Ledger/Revenue (accounting entries). The synchronous flow happens when a customer clicks 'Apply code' — the pricing engine must respond in under 300ms to avoid degrading UX; the asynchronous flow happens after successful payment, when the system emits an OrderPaid event so Inventory permanently deducts stock and Ledger records deferred revenue pending delivery.",
        "アーキテクチャは5つの主要サービスで構成されます：価格計算エンジン（価格・割引計算）、注文サービス（注文ライフサイクル管理）、決済ゲートウェイ（サードパーティ決済連携）、在庫リザーブ（決済待ちの間15分間在庫を一時保持）、そして元帳・売上（会計仕訳）です。同期フローは、顧客が「コードを適用」をクリックした際に発生し、UXを損なわないよう価格計算エンジンは300ミリ秒未満で応答する必要があります。非同期フローは決済成功後に発生し、システムがOrderPaidイベントを発行することで、在庫サービスが恒久的に在庫を差し引き、元帳サービスは配送完了までの繰延収益（deferred revenue）を記録します。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất nằm ở việc pricing engine phải tính đúng thứ tự áp dụng khi có nhiều coupon: giảm giá theo % áp dụng trước, sau đó trừ ngưỡng cố định, cuối cùng mới áp freeship — nếu đổi thứ tự sẽ ra số tiền khác. Ngoài ra, giới hạn dùng coupon (ví dụ 'chỉ 500 lượt đầu') là một tài nguyên chia sẻ (shared counter) dễ bị race condition khi nhiều người dùng bấm cùng lúc trong khung giờ vàng — cần kiểm thử đồng thời (concurrency testing) chứ không chỉ kiểm thử tuần tự. Một khó khăn khác là việc hoàn tiền coupon khi huỷ đơn: ngân sách coupon đã trừ phải được hoàn lại đúng, nếu không sẽ làm cạn quỹ khuyến mãi giả tạo trước hạn.",
        "The trickiest part is that the pricing engine must apply discounts in the correct order when multiple coupons are involved: percentage discount first, then fixed-threshold deduction, and free-shipping last — reordering changes the final amount. Additionally, the usage cap (e.g., 'first 500 redemptions only') is a shared counter resource prone to race conditions when many users click simultaneously during a golden hour — this requires concurrency testing, not just sequential testing. Another challenge is refunding the coupon budget on order cancellation: the previously deducted budget must be restored correctly, otherwise the promo fund appears artificially depleted before its deadline.",
        "最も難しいのは、複数のクーポンが絡む場合に価格計算エンジンが正しい順序で割引を適用しなければならない点です。まずパーセント割引、次に固定閾値の控除、最後に送料無料を適用します。順序を変えると最終金額が変わってしまいます。さらに、利用上限（例：「先着500件限定」）は共有カウンターであり、ゴールデンタイムに多数のユーザーが同時にクリックするとレースコンディションが発生しやすいため、逐次テストだけでなく並行テストが必要です。もう一つの課題は、注文キャンセル時のクーポン予算の払い戻しです。既に差し引かれた予算が正しく復元されないと、期限前にプロモ予算が人為的に枯渇してしまいます。"
      ),
      SCEN(
        "Sự cố thực tế",
        "Real incident",
        "Trong đợt sale 11.11 năm trước, đội vận hành phát hiện quỹ coupon 'giảm 50k' báo hết ngân sách chỉ sau 20 phút dù giới hạn là 10.000 lượt. Điều tra cho thấy một lỗi retry ở client (người dùng bấm nút 'Áp dụng' nhiều lần do UI phản hồi chậm) đã gửi trùng request, và backend không có idempotency key nên đã trừ ngân sách 3 lần cho cùng một hành động của một người dùng.",
        "During last year's 11.11 sale, the ops team found the '50k off' coupon fund reported exhausted after only 20 minutes despite a 10,000-redemption cap. Investigation revealed a client-side retry bug (users clicking 'Apply' repeatedly because the UI responded slowly) sent duplicate requests, and the backend lacked an idempotency key, so it deducted the budget three times for a single user action.",
        "実際のインシデント",
        "昨年の11.11セール期間中、運用チームは「5万ドン割引」クーポンの予算上限が1万件であるにもかかわらず、開始からわずか20分で枯渇したと報告されているのを発見しました。調査の結果、クライアント側のリトライバグ（UIの反応が遅いため、ユーザーが「適用」ボタンを何度もクリックしていた）が重複リクエストを送信し、バックエンドに冪等性キーがなかったため、1人のユーザーの1つの操作に対して予算が3回差し引かれていたことが判明しました。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến (oracle)", en: "3. Data model & invariants (oracle)", ja: "3. データモデルと不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm bảng Order (id, userId, status, subtotal, discountTotal, shippingFee, grandTotal), CouponRedemption (couponId, userId, orderId, amountApplied, redeemedAt), CouponBudget (couponId, totalBudget, usedBudget, usageLimitPerUser), và LedgerEntry (orderId, debitAccount, creditAccount, amount, postedAt). Trạng thái đơn hàng đi theo máy trạng thái hữu hạn: DRAFT → PLACED → PAID → FULFILLED → REVENUE_RECOGNIZED, hoặc bất kỳ trạng thái nào trước FULFILLED có thể chuyển sang CANCELLED kèm theo bù trừ (compensation) tương ứng.",
        "The core data model includes the Order table (id, userId, status, subtotal, discountTotal, shippingFee, grandTotal), CouponRedemption (couponId, userId, orderId, amountApplied, redeemedAt), CouponBudget (couponId, totalBudget, usedBudget, usageLimitPerUser), and LedgerEntry (orderId, debitAccount, creditAccount, amount, postedAt). Order status follows a finite state machine: DRAFT → PLACED → PAID → FULFILLED → REVENUE_RECOGNIZED, or any state before FULFILLED can transition to CANCELLED with corresponding compensation.",
        "コアデータモデルには、Order（受注）テーブル（id、userId、status、subtotal、discountTotal、shippingFee、grandTotal）、CouponRedemption（クーポン利用履歴：couponId、userId、orderId、amountApplied、redeemedAt）、CouponBudget（クーポン予算：couponId、totalBudget、usedBudget、usageLimitPerUser）、およびLedgerEntry（元帳仕訳：orderId、debitAccount、creditAccount、amount、postedAt）が含まれます。注文ステータスは有限状態機械に従います：DRAFT（下書き）→ PLACED（確定）→ PAID（決済済み）→ FULFILLED（配送完了）→ REVENUE_RECOGNIZED（売上計上済み）。FULFILLED以前のどの状態からもCANCELLED（取消）へ遷移でき、それに対応する補償処理が実行されます。"
      ),
      H("Bất biến nghiệp vụ bắt buộc (oracle)", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Bất biến 1: grandTotal = subtotal − discountTotal + shippingFee, sai lệch phải bằng 0 (không làm tròn quá 1 đồng)",
          "Bất biến 2: Σ amountApplied của một coupon (usedBudget) không bao giờ vượt totalBudget đã cấu hình",
          "Bất biến 3: số lượt redeem của 1 user cho 1 coupon ≤ usageLimitPerUser tại mọi thời điểm",
          "Bất biến 4: mỗi orderId chỉ có đúng 1 trạng thái hiệu lực tại một thời điểm (không tồn tại PAID và CANCELLED đồng thời)",
          "Bất biến 5: doanh thu chỉ được ghi Ledger khi status = FULFILLED, không sớm hơn",
        ],
        [
          "Invariant 1: grandTotal = subtotal − discountTotal + shippingFee, deviation must equal 0 (rounding tolerance ≤ 1 unit)",
          "Invariant 2: Σ amountApplied for a coupon (usedBudget) never exceeds the configured totalBudget",
          "Invariant 3: a user's redemption count for a coupon ≤ usageLimitPerUser at any point in time",
          "Invariant 4: each orderId has exactly one valid status at any time (never both PAID and CANCELLED)",
          "Invariant 5: revenue is only posted to the Ledger when status = FULFILLED, never earlier",
        ],
        [
          "不変条件1：grandTotal = subtotal − discountTotal + shippingFee。差異はゼロでなければならない（丸め誤差は1単位以内）",
          "不変条件2：あるクーポンのΣamountApplied（usedBudget）は、設定されたtotalBudgetを決して超えない",
          "不変条件3：あるユーザーのあるクーポンの利用回数は、いかなる時点でもusageLimitPerUser以下でなければならない",
          "不変条件4：各orderIdは、いかなる時点でも有効なステータスを1つだけ持つ（PAIDとCANCELLEDが同時に存在しない）",
          "不変条件5：売上はstatus=FULFILLEDの時のみ元帳に計上され、それより早く計上されることはない",
        ]
      ),
      CODE("typescript", `// Oracle helper — dùng lại trong mọi test case liên quan tiền
export function assertOrderInvariant(order: OrderSnapshot) {
  const expectedTotal = round2(order.subtotal - order.discountTotal + order.shippingFee);
  expect(Math.abs(order.grandTotal - expectedTotal)).toBeLessThanOrEqual(1); // tolerance 1 đồng do làm tròn
}

export async function assertCouponBudgetInvariant(couponId: string, api: ApiClient) {
  const budget = await api.get(\`/internal/coupons/\${couponId}/budget\`);
  expect(budget.usedBudget).toBeLessThanOrEqual(budget.totalBudget);
}`),
      TIP("Luôn viết assertion dựa trên công thức bất biến, không assert chuỗi UI như 'Áp dụng thành công' — chuỗi UI có thể đổi theo bản dịch hoặc redesign.", "Always assert against the invariant formula, never against UI strings like 'Applied successfully' — UI copy can change with translations or redesigns.", "常にUIの文字列（「適用に成功しました」など）ではなく、不変条件の数式に基づいてアサーションを書いてください。UIの文言は翻訳やリデザインで変わる可能性があります。"),
    ],
  },
  {
    heading: { vi: "4. Rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Ma trận rủi ro xếp hạng theo mức độ ảnh hưởng tài chính và tần suất xảy ra: rủi ro cao nhất là race condition trên giới hạn coupon (ảnh hưởng: mất tiền trực tiếp, tần suất: cao vào giờ vàng flash sale); tiếp theo là sai thứ tự tính giảm giá khi stacking (ảnh hưởng: sai giá bán cho hàng chục nghìn đơn); rủi ro trung bình là đồng bộ trạng thái đơn giữa order và payment khi gateway timeout; rủi ro thấp hơn là hiển thị sai UI mã giảm giá đã hết hạn. Chiến lược kiểm thử áp dụng kim tự tháp: 60% unit test cho pricing engine (các quy tắc tính toán thuần túy, chạy nhanh, cô lập), 30% integration/API test cho luồng order-payment-inventory, 10% E2E Playwright cho các happy path và một số kịch bản biên quan trọng nhất.",
        "The risk matrix ranks issues by financial impact and likelihood: highest risk is the race condition on coupon usage limits (impact: direct monetary loss, likelihood: high during flash-sale golden hours); next is incorrect discount-calculation order under stacking (impact: wrong price for tens of thousands of orders); medium risk is order-payment status desync during gateway timeout; lower risk is UI showing an expired coupon incorrectly. The test strategy follows a pyramid: 60% unit tests for the pricing engine (pure calculation rules, fast, isolated), 30% integration/API tests for the order-payment-inventory flow, 10% E2E Playwright for happy paths and the most critical edge scenarios.",
        "リスクマトリクスは財務への影響度と発生頻度でランク付けします。最高リスクはクーポン利用上限のレースコンディション（影響：直接的な金銭的損失、頻度：フラッシュセールのゴールデンタイムに高頻度）。次に、重複適用時の割引計算順序の誤り（影響：数万件の注文で価格が誤る）。中リスクはゲートウェイタイムアウト時の注文・決済ステータスの不整合。より低いリスクは、期限切れクーポンのUI表示誤りです。テスト戦略はピラミッド型を採用します：価格計算エンジンの単体テスト60%（純粋な計算ロジック、高速・独立）、注文・決済・在庫フローの結合/APIテスト30%、ハッピーパスと最重要な境界シナリオのE2E Playwrightテスト10%。"
      ),
      H("Kim tự tháp kiểm thử áp dụng", "Applied test pyramid", "適用するテストピラミッド"),
      UL(
        ["Unit (60%): quy tắc tính coupon, làm tròn số, thứ tự áp dụng", "Integration/API (30%): luồng order→payment→inventory→ledger, retry/idempotency", "E2E (10%): happy path checkout + 2-3 kịch bản race condition mô phỏng qua song song request"],
        ["Unit (60%): coupon calculation rules, rounding, application order", "Integration/API (30%): order→payment→inventory→ledger flow, retry/idempotency", "E2E (10%): happy-path checkout + 2-3 race-condition scenarios via parallel requests"],
        ["ユニット（60%）：クーポン計算ルール、丸め処理、適用順序", "結合/API（30%）：注文→決済→在庫→元帳フロー、リトライ・冪等性", "E2E（10%）：ハッピーパスのチェックアウト＋並行リクエストによるレースコンディションシナリオ2〜3件"]
      ),
      WARN("Không nên phủ toàn bộ ma trận coupon bằng E2E — chi phí chạy và bảo trì quá cao. Đẩy các case tính toán thuần tuý xuống unit test.", "Do not cover the entire coupon matrix with E2E — the run and maintenance cost is too high. Push pure calculation cases down to unit tests.", "クーポンのマトリクス全体をE2Eでカバーしてはいけません。実行・保守コストが高すぎます。純粋な計算ケースはユニットテストに落とし込んでください。"),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi (in-scope: pricing, order, payment sandbox, inventory, ledger; out-of-scope: hệ thống vận chuyển vật lý của đối tác 3PL), tiêu chí bắt đầu (entry criteria: môi trường staging có dữ liệu seed coupon và sản phẩm, mock gateway thanh toán sẵn sàng), và tiêu chí kết thúc (exit criteria: 100% ca P1/P2 pass, không còn bug Critical/High mở, độ phủ code pricing engine ≥ 85%). Môi trường kiểm thử dùng 3 tầng: dev (unit, mock toàn bộ), staging (integration với sandbox payment thật của VNPay/Momo), và pre-prod (dữ liệu ẩn danh hoá từ production để kiểm thử khối lượng).",
        "The test plan defines scope (in-scope: pricing, order, payment sandbox, inventory, ledger; out-of-scope: the 3PL partner's physical shipping system), entry criteria (staging environment seeded with coupon/product data, payment gateway mock ready), and exit criteria (100% P1/P2 cases pass, no open Critical/High bugs, pricing engine code coverage ≥ 85%). Testing uses 3 tiers: dev (unit, fully mocked), staging (integration with real VNPay/Momo sandbox), and pre-prod (anonymized production data for volume testing).",
        "テスト計画では、範囲（対象：価格計算・注文・決済サンドボックス・在庫・元帳、対象外：3PLパートナーの物理配送システム）、開始基準（クーポン・商品データがシードされたステージング環境、決済ゲートウェイのモック準備完了）、終了基準（P1/P2ケース100%合格、Critical/High未解決バグゼロ、価格計算エンジンのコードカバレッジ85%以上）を定義します。テスト環境は3層構成です：dev（ユニット、完全モック）、ステージング（VNPay/Momoの実サンドボックスとの結合）、プレプロダクション（本番データを匿名化した量的テスト用）。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: duyệt test plan, ký exit criteria", "SDET: viết API/E2E automation, duy trì CI", "Backend dev: review oracle & cùng debug ca lỗi race condition", "Kế toán/Finance SME: xác nhận quy tắc ghi nhận doanh thu"],
        ["QA Lead: approves test plan, signs off exit criteria", "SDET: writes API/E2E automation, maintains CI", "Backend dev: reviews oracle, co-debugs race-condition failures", "Finance/Accounting SME: confirms revenue recognition rules"],
        ["QAリード：テスト計画を承認し、終了基準にサインオフする", "SDET：API/E2E自動化を作成し、CIを保守する", "バックエンド開発者：オラクルをレビューし、レースコンディションの不具合を共同デバッグする", "経理・財務SME：売上計上ルールを確認する"]
      ),
      NOTE("Chỉ số theo dõi hàng tuần: số ca automation pass ổn định 3 lần liên tiếp (không flaky), tỉ lệ bug leak sang production, thời gian trung bình debug 1 ca race condition.", "Weekly tracked metrics: number of automated cases passing 3 consecutive runs (non-flaky), bug leak rate to production, average debugging time per race-condition case.", "週次で追跡する指標：3回連続で安定して合格した自動化ケース数（フレークなし）、本番環境へのバグ流出率、レースコンディションケース1件あたりの平均デバッグ時間。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca sử dụng kỹ thuật equivalence partitioning cho ngưỡng đơn hàng (dưới ngưỡng, đúng ngưỡng, trên ngưỡng), boundary value analysis cho giới hạn dùng coupon (limit-1, limit, limit+1), và decision table cho tổ hợp stacking giữa các loại coupon (phần trăm, số tiền cố định, freeship). Mỗi ca được đặt tên theo chuẩn TC-<module>-<số>-<mô tả ngắn> để dễ truy vết trong test management tool, và mỗi ca đều gắn rõ oracle tương ứng để reviewer không cần đoán kỳ vọng.",
        "The case matrix uses equivalence partitioning for order thresholds (below, at, above threshold), boundary value analysis for coupon usage limits (limit-1, limit, limit+1), and a decision table for stacking combinations across coupon types (percentage, fixed amount, free-shipping). Each case is named per the TC-<module>-<number>-<short description> convention for traceability in the test management tool, and each case is tagged with its corresponding oracle so reviewers never have to guess the expectation.",
        "ケースマトリクスでは、注文金額の閾値に対する同値分割（閾値未満・閾値ちょうど・閾値超過）、クーポン利用上限に対する境界値分析（上限-1・上限・上限+1）、そしてクーポン種別（パーセント・固定金額・送料無料）の重複適用組み合わせに対するデシジョンテーブルを使用します。各ケースはテスト管理ツールでの追跡性のためTC-<モジュール>-<番号>-<短い説明>という命名規則に従い、レビュアーが期待値を推測しなくて済むよう、各ケースには対応するオラクルが明記されています。"
      ),
      IMG(svg1Matrix, "Ma trận ca kiểm thử coupon với mức rủi ro và oracle tương ứng", "Coupon test case matrix with risk level and corresponding oracle", "リスクレベルと対応オラクルを示すクーポンテストケースマトリクス"),
      H("Ưu tiên chạy", "Run priority", "実行優先度"),
      UL(
        ["P1 (chạy mỗi build): TC-01 stacking, TC-03 giới hạn dùng, TC-04 race condition", "P2 (chạy nightly): TC-02 ngưỡng, TC-05 hoàn coupon khi huỷ", "P3 (chạy trước release): TC-06 timeout thanh toán, edge case đa tiền tệ"],
        ["P1 (every build): TC-01 stacking, TC-03 usage limit, TC-04 race condition", "P2 (nightly): TC-02 threshold, TC-05 coupon refund on cancel", "P3 (pre-release): TC-06 payment timeout, multi-currency edge cases"],
        ["P1（毎ビルド実行）：TC-01重複適用、TC-03利用上限、TC-04レースコンディション", "P2（夜間実行）：TC-02閾値、TC-05キャンセル時のクーポン払い戻し", "P3（リリース前実行）：TC-06決済タイムアウト、多通貨のエッジケース"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment setup", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Việc seed dữ liệu dùng test-only API `/internal/test/seed` để tạo coupon với budget và limit tuỳ chỉnh, tránh phụ thuộc vào dữ liệu do marketing tạo thủ công trên production. Trước mỗi test suite chạy, một hook `beforeAll` gọi endpoint reset để đưa toàn bộ usedBudget về 0 và xoá các CouponRedemption test cũ, đảm bảo cô lập giữa các lần chạy CI song song. Payment gateway được mock ở tầng API test bằng WireMock để giả lập timeout, thất bại 3D-Secure, và độ trễ mạng, còn ở tầng E2E dùng sandbox thật của VNPay để kiểm thử tích hợp tối thiểu 1 lần/ngày.",
        "Data seeding uses a test-only `/internal/test/seed` API to create coupons with custom budgets and limits, avoiding dependency on marketing-created production data. Before each test suite, a `beforeAll` hook calls a reset endpoint to zero out usedBudget and delete stale CouponRedemption records, ensuring isolation across parallel CI runs. The payment gateway is mocked at the API-test layer with WireMock to simulate timeouts, 3D-Secure failures, and network latency, while the E2E layer uses the real VNPay sandbox for at least one integration run per day.",
        "データシードには、マーケティングが本番環境で手動作成したデータへの依存を避けるため、テスト専用の`/internal/test/seed` APIを使用し、カスタムの予算・上限を持つクーポンを作成します。各テストスイート実行前に、`beforeAll`フックがリセットエンドポイントを呼び出してusedBudgetをゼロに戻し、古いCouponRedemptionレコードを削除することで、並行CI実行間の分離を確保します。決済ゲートウェイはAPIテスト層ではWireMockでモックし、タイムアウト・3Dセキュア失敗・ネットワーク遅延を再現します。E2E層では、少なくとも1日1回はVNPayの実サンドボックスを使った結合テストを実行します。"
      ),
      CODE("bash", `# Reset & seed dữ liệu coupon trước khi chạy suite
curl -X POST https://staging.shop.internal/internal/test/reset \\
  -H "X-Test-Key: $TEST_API_KEY"

curl -X POST https://staging.shop.internal/internal/test/seed/coupon \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "SALE50K",
    "type": "FIXED",
    "amount": 50000,
    "totalBudget": 100,
    "usageLimitPerUser": 1,
    "minOrderValue": 300000
  }'`),
      TIP("Đặt totalBudget nhỏ (ví dụ 100) khi test race condition để dễ đẩy hệ thống chạm giới hạn trong vài giây thay vì phải gửi hàng nghìn request.", "Set a small totalBudget (e.g. 100) for race-condition testing so the system hits the limit within seconds instead of requiring thousands of requests.", "レースコンディションのテストでは、数千件のリクエストを送らずに数秒で上限に到達できるよう、totalBudgetを小さく（例：100）設定してください。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright kết hợp Page Object Model: CartPage, CheckoutPage, OrderConfirmationPage, cùng fixture apiClient để gọi thẳng API xác minh dữ liệu backend song song với việc kiểm tra UI. Assertion cuối cùng không dừng ở việc thấy trang 'Đặt hàng thành công' mà gọi API `/orders/:id` để xác minh đúng bất biến grandTotal đã trình bày ở chương 3, đảm bảo automation kiểm tra đúng nghiệp vụ chứ không chỉ giao diện.",
        "Happy-path automation uses Playwright with the Page Object Model: CartPage, CheckoutPage, OrderConfirmationPage, plus an apiClient fixture to call the API directly and verify backend state alongside UI checks. The final assertion doesn't stop at seeing an 'Order placed successfully' page — it calls the `/orders/:id` API to verify the grandTotal invariant from chapter 3, ensuring the automation validates real business logic, not just the interface.",
        "ハッピーパス自動化には、Playwrightとページオブジェクトモデル（CartPage、CheckoutPage、OrderConfirmationPage）を使用し、UIチェックと並行してバックエンド状態を直接検証するapiClientフィクスチャを併用します。最終アサーションは「注文が完了しました」という画面を見て終わりにするのではなく、`/orders/:id` APIを呼び出して第3章の不変条件（grandTotal）を検証し、自動化が画面表示だけでなく実際の業務ロジックを検証していることを保証します。"
      ),
      CODE("typescript", `import { test, expect } from "./fixtures";
import { CartPage, CheckoutPage } from "./pages";

test("checkout với 1 coupon % + freeship, oracle đúng theo bất biến", async ({ page, apiClient }) => {
  const cart = new CartPage(page);
  await cart.goto();
  await cart.addProduct("SKU-DRESS-001", 2);
  await cart.applyCoupon("SUMMER10");   // giảm 10%
  await cart.applyCoupon("FREESHIP");   // freeship, không loại trừ SUMMER10

  const checkout = new CheckoutPage(page);
  const orderId = await checkout.placeOrder({ payment: "COD" });

  // Oracle: verify qua API, không phải qua text UI
  const order = await apiClient.get(\`/orders/\${orderId}\`);
  const expectedTotal = round2(order.subtotal * 0.9); // giảm 10%, shippingFee = 0
  expect(Math.abs(order.grandTotal - expectedTotal)).toBeLessThanOrEqual(1);
  expect(order.status).toBe("PLACED");
});`),
      CODE("typescript", `// API-level test cho pricing engine — nhanh, cô lập, chạy trong CI mỗi commit
test("pricing engine áp coupon theo đúng thứ tự % -> ngưỡng -> freeship", async ({ apiClient }) => {
  const res = await apiClient.post("/pricing/quote", {
    items: [{ sku: "SKU-DRESS-001", qty: 2, price: 250000 }],
    coupons: ["SUMMER10", "FREESHIP"],
  });
  expect(res.discountBreakdown).toEqual([
    { code: "SUMMER10", amount: 50000, appliedOrder: 1 },
    { code: "FREESHIP", amount: 30000, appliedOrder: 2 },
  ]);
  expect(res.grandTotal).toBe(450000);
});`),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Các ca lỗi chuyên sâu là nơi tạo ra giá trị kiểm thử cao nhất và cũng là chủ đề được hỏi nhiều nhất trong phỏng vấn SDET cấp senior, vì chúng đòi hỏi hiểu sâu về concurrency, idempotency, và compensation logic thay vì chỉ click qua giao diện. Ba nhóm ca lỗi trọng tâm ở bài toán O2C là: race condition trên giới hạn coupon dùng chung, mất đồng bộ trạng thái đơn khi cổng thanh toán timeout hoặc callback đến trễ/trùng lặp, và sai lệch khi huỷ đơn giữa chừng cần hoàn cả tồn kho lẫn ngân sách coupon.",
        "Deep failure cases deliver the highest testing value and are also the most frequently asked topics in senior SDET interviews, because they require deep understanding of concurrency, idempotency, and compensation logic rather than simple UI clicking. Three focal failure groups for this O2C problem are: race conditions on shared coupon usage limits, order-status desync when the payment gateway times out or sends late/duplicate callbacks, and discrepancies when mid-flight cancellation must roll back both inventory and coupon budget.",
        "高度な異常系は最も高いテスト価値を生み出し、また上級SDET面接で最も頻繁に問われるトピックでもあります。単純なUI操作ではなく、並行性・冪等性・補償ロジックへの深い理解が求められるためです。このO2Cの課題における3つの主要な異常系グループは、共有クーポン利用上限のレースコンディション、決済ゲートウェイのタイムアウトや遅延・重複コールバックによる注文ステータスの不整合、そして途中キャンセル時に在庫とクーポン予算の両方をロールバックする必要がある際の不整合です。"
      ),
      CODE("typescript", `// Ca 1: Race condition trên giới hạn coupon — gửi song song N request khi budget còn ít
test("chỉ đúng số lượt = budget còn lại được chấp nhận khi 20 request đồng thời", async ({ apiClient }) => {
  await apiClient.post("/internal/test/seed/coupon", { code: "LASTCALL", totalBudget: 5 });

  const requests = Array.from({ length: 20 }, (_, i) =>
    apiClient.post("/orders/checkout", { userId: \`user-\${i}\`, coupon: "LASTCALL" })
  );
  const results = await Promise.allSettled(requests);
  const accepted = results.filter((r) => r.status === "fulfilled" && r.value.status === 200);

  // Oracle: usedBudget không vượt totalBudget dù có 20 request đồng thời
  expect(accepted.length).toBeLessThanOrEqual(5);
  const budget = await apiClient.get("/internal/coupons/LASTCALL/budget");
  expect(budget.usedBudget).toBeLessThanOrEqual(budget.totalBudget);
});`),
      CODE("typescript", `// Ca 2: Idempotency khi client retry request thanh toán do timeout UI
test("gửi trùng request checkout với cùng Idempotency-Key chỉ tạo 1 đơn", async ({ apiClient }) => {
  const idemKey = "idem-" + Date.now();
  const payload = { userId: "user-42", coupon: "SALE50K", items: [{ sku: "SKU-1", qty: 1 }] };

  const [r1, r2] = await Promise.all([
    apiClient.post("/orders/checkout", payload, { headers: { "Idempotency-Key": idemKey } }),
    apiClient.post("/orders/checkout", payload, { headers: { "Idempotency-Key": idemKey } }),
  ]);

  expect(r1.data.orderId).toBe(r2.data.orderId); // cùng 1 order, không tạo trùng
  const budget = await apiClient.get("/internal/coupons/SALE50K/budget");
  expect(budget.usedBudget).toBe(1); // chỉ trừ ngân sách 1 lần, không phải 2
});`),
      CODE("typescript", `// Ca 3: Huỷ đơn giữa chừng phải hoàn cả tồn kho lẫn ngân sách coupon
test("huỷ đơn PLACED phải hoàn nguyên trạng inventory và coupon budget", async ({ apiClient }) => {
  const before = await apiClient.get("/internal/coupons/SALE50K/budget");
  const order = await apiClient.post("/orders/checkout", { userId: "user-7", coupon: "SALE50K", items: [{ sku: "SKU-1", qty: 1 }] });

  await apiClient.post(\`/orders/\${order.data.orderId}/cancel\`);

  const after = await apiClient.get("/internal/coupons/SALE50K/budget");
  expect(after.usedBudget).toBe(before.usedBudget); // hoàn lại đúng, không rò rỉ ngân sách
  const stock = await apiClient.get("/internal/inventory/SKU-1");
  expect(stock.reserved).toBe(0);
});`),
      WARN("Callback thanh toán đến trùng lặp (duplicate webhook) là nguyên nhân phổ biến gây ghi nhận doanh thu hai lần — luôn kiểm tra idempotency ở tầng nhận webhook, không chỉ ở tầng API đặt hàng.", "Duplicate payment callbacks (duplicate webhooks) are a common cause of double revenue recognition — always verify idempotency at the webhook-receiving layer, not just the order-placement API layer.", "決済コールバックの重複（webhookの重複）は、売上の二重計上を引き起こす一般的な原因です。注文作成APIだけでなく、webhook受信層でも必ず冪等性を検証してください。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm / batch / đối soát", en: "10. Post-checks / batch / reconciliation", ja: "10. 事後検証・バッチ・突合" },
    blocks: [
      P(
        "Ngoài kiểm thử theo luồng giao dịch đơn lẻ, hệ thống cần một batch job đối soát cuối ngày (End-of-Day reconciliation) chạy lúc 23:59 để so khớp tổng grandTotal của mọi đơn PAID trong ngày với tổng tiền cổng thanh toán báo về, và so khớp usedBudget của từng coupon với số bản ghi CouponRedemption thực tế. Bất kỳ sai lệch nào trên 0 đồng đều phải sinh cảnh báo tới kênh Slack #finance-alerts kèm danh sách orderId nghi vấn để đội vận hành xử lý trong vòng 4 giờ theo SLA nội bộ.",
        "Beyond single-transaction flow testing, the system needs an End-of-Day reconciliation batch job running at 23:59 to match the total grandTotal of all PAID orders that day against the payment gateway's reported total, and to match each coupon's usedBudget against the actual count of CouponRedemption records. Any discrepancy above zero must trigger an alert to the #finance-alerts Slack channel with the list of suspect orderIds for the ops team to resolve within a 4-hour internal SLA.",
        "単一トランザクションのフローテストに加え、23:59に実行される日次締め対査（End-of-Day reconciliation）バッチジョブが必要です。これは、その日のPAID状態の全注文のgrandTotal合計を決済ゲートウェイが報告する合計金額と照合し、各クーポンのusedBudgetを実際のCouponRedemptionレコード数と照合します。ゼロを超える差異があれば、疑わしいorderIdのリストとともに#finance-alertsのSlackチャンネルへアラートを送信し、運用チームが社内SLAである4時間以内に対応する必要があります。"
      ),
      CODE("sql", `-- Query đối soát: tổng grandTotal đơn PAID trong ngày vs bút toán ledger
SELECT
  o.order_date,
  SUM(o.grand_total) AS total_orders,
  (SELECT SUM(le.amount) FROM ledger_entry le
     WHERE le.credit_account = 'REVENUE_DEFERRED' AND le.posted_at::date = o.order_date) AS total_ledger,
  SUM(o.grand_total) - (SELECT SUM(le.amount) FROM ledger_entry le
     WHERE le.credit_account = 'REVENUE_DEFERRED' AND le.posted_at::date = o.order_date) AS diff
FROM orders o
WHERE o.status IN ('PAID','FULFILLED') AND o.order_date = CURRENT_DATE
GROUP BY o.order_date
HAVING SUM(o.grand_total) <> (SELECT SUM(le.amount) FROM ledger_entry le
     WHERE le.credit_account = 'REVENUE_DEFERRED' AND le.posted_at::date = o.order_date);`),
      NOTE("Batch đối soát nên chạy dạng idempotent — chạy lại nhiều lần trong ngày không được tạo thêm bản ghi báo cáo trùng lặp.", "The reconciliation batch should be idempotent — re-running it multiple times a day must not create duplicate report records.", "対査バッチは冪等であるべきです。1日に何度再実行しても、重複したレポートレコードが作成されてはいけません。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD & giám sát", en: "11. CI/CD & monitoring", ja: "11. CI/CDと監視" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit test pricing engine (dưới 2 phút), API/integration test với testcontainers Postgres + WireMock (dưới 8 phút), và E2E Playwright chia shard 4 luồng chạy trên môi trường staging (dưới 15 phút). Gate release yêu cầu toàn bộ 3 tầng pass và không có ca nào bị đánh dấu flaky quá 2 lần trong 10 lần chạy gần nhất; nếu vi phạm, pipeline tự động chặn merge và gắn nhãn `needs-flaky-triage`.",
        "The CI pipeline runs 3 parallel tiers: pricing-engine unit tests (under 2 minutes), API/integration tests with Postgres testcontainers + WireMock (under 8 minutes), and Playwright E2E sharded across 4 workers on staging (under 15 minutes). The release gate requires all 3 tiers to pass and no case flagged flaky more than twice in the last 10 runs; violations auto-block the merge and tag it `needs-flaky-triage`.",
        "CIパイプラインは3層を並行実行します：価格計算エンジンのユニットテスト（2分未満）、Postgres testcontainers + WireMockによるAPI/結合テスト（8分未満）、ステージング環境で4ワーカーにシャーディングされたPlaywright E2E（15分未満）。リリースゲートは3層すべての合格と、直近10回の実行でフレークと判定された回数が2回以下であることを要求します。違反した場合、パイプラインは自動的にマージをブロックし、`needs-flaky-triage`のラベルを付与します。"
      ),
      CODE("yaml", `name: o2c-coupon-pipeline
on: [pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:unit:pricing -- --coverage
  integration:
    needs: unit
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:15, ports: ["5432:5432"] }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration -- --shard=1/1
  e2e:
    needs: integration
    strategy:
      matrix: { shard: [1, 2, 3, 4] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - run: npm run flaky:report`),
      TIP("Gắn dashboard Grafana theo dõi p95 latency của pricing engine trong giờ cao điểm — nếu vượt 300ms, cảnh báo trước khi khách hàng phàn nàn.", "Attach a Grafana dashboard tracking the pricing engine's p95 latency during peak hours — alert before customers complain if it exceeds 300ms.", "ピーク時間帯の価格計算エンジンのp95レイテンシを追跡するGrafanaダッシュボードを設定してください。300ミリ秒を超えた場合、顧客からの苦情の前にアラートを出します。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent hỗ trợ sinh ma trận ca kiểm thử stacking coupon tự động bằng cách đọc bảng cấu hình luật khuyến mãi (loại, ngưỡng, giới hạn, ngày hiệu lực) và liệt kê các tổ hợp equivalence partition có khả năng bỏ sót nếu con người tự viết thủ công, ví dụ tổ hợp 3 coupon cùng lúc mà QA thường quên kiểm. Agent cũng có thể được giao nhiệm vụ phân tích log lỗi CI để phân loại flaky test do timing (chờ selector) và flaky test do race condition thật sự của backend, giúp SDET tiết kiệm thời gian điều tra ban đầu.",
        "An AI agent helps auto-generate the coupon-stacking test-case matrix by reading the promotion rule configuration table (type, threshold, limit, validity dates) and listing equivalence-partition combinations that humans commonly miss, such as 3-coupon-at-once combinations that QA often forgets to test. The agent can also be tasked with analyzing CI failure logs to classify flaky tests caused by timing (waiting for selectors) versus flaky tests caused by genuine backend race conditions, saving SDETs initial investigation time.",
        "AIエージェントは、プロモーションルール設定テーブル（種別・閾値・上限・有効期間）を読み取り、人間が手作業で書くと見落としがちな同値分割の組み合わせ（例えば、QAがテストを忘れがちな3つのクーポン同時適用の組み合わせ）を列挙することで、クーポン重複適用のテストケースマトリクスの自動生成を支援します。また、エージェントにCIの失敗ログを分析させ、タイミング起因（セレクター待ち）のフレークテストと、バックエンドの本当のレースコンディションによるフレークテストを分類させることで、SDETの初期調査時間を節約できます。"
      ),
      P(
        "Ranh giới trách nhiệm rất rõ ràng: AI agent được phép đề xuất ca kiểm thử mới, tóm tắt log lỗi, và soạn thảo bản nháp test case, nhưng con người luôn phải review và ký duyệt trước khi ca test được đưa vào bộ regression chính thức, đặc biệt là những ca liên quan trực tiếp đến tiền (grandTotal, ledger). Agent tuyệt đối không được cấp quyền tự động approve hoặc merge PR chứa thay đổi vào pricing engine mà không có con người review, để tránh rủi ro hallucination sinh ra assertion sai gây false negative trong hệ thống tài chính.",
        "Responsibility boundaries are clear: the AI agent may propose new test cases, summarize failure logs, and draft test-case skeletons, but a human must always review and sign off before a case enters the official regression suite, especially cases directly touching money (grandTotal, ledger). The agent must never be granted permission to auto-approve or merge a PR touching the pricing engine without human review, to avoid hallucination risk producing incorrect assertions that create false negatives in a financial system.",
        "責任範囲は明確です。AIエージェントは新しいテストケースの提案、失敗ログの要約、テストケース草案の作成を行うことができますが、特に金額に直接関わるケース（grandTotal、元帳）については、正式なリグレッションスイートに組み込まれる前に必ず人間がレビューし承認する必要があります。エージェントは、ハルシネーションのリスクにより誤ったアサーションが生成され財務システムに偽陰性が発生することを避けるため、人間のレビューなしに価格計算エンジンに関わるPRを自動承認またはマージする権限を絶対に与えられてはなりません。"
      ),
      NOTE("Log prompt và output của AI agent nên được lưu lại kèm test case được tạo ra, phục vụ truy vết khi kiểm toán yêu cầu giải trình nguồn gốc ca kiểm thử.", "AI agent prompts and outputs should be logged alongside generated test cases, for traceability when an audit requires explaining a test case's origin.", "監査でテストケースの出所説明が求められた際の追跡性のため、AIエージェントのプロンプトと出力は生成されたテストケースとともにログ保存すべきです。"),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao thiết kế test case cho tính năng cho phép stack nhiều coupon cùng lúc?",
        "How would you design test cases for a feature that allows stacking multiple coupons at once?",
        "Tôi sẽ dùng decision table liệt kê mọi tổ hợp loại coupon (%, cố định, freeship) x trạng thái loại trừ, xác định thứ tự áp dụng là bất biến cần giữ, sau đó viết oracle kiểm tra tổng giảm giá cuối cùng khớp công thức toán học, thay vì chỉ kiểm tra 'có giảm giá là được'. Tôi cũng thêm ca đồng thời (concurrency) để phát hiện lỗi giới hạn dùng bị vượt.",
        "I'd use a decision table listing every combination of coupon types (%, fixed, free-shipping) against exclusion rules, identify the application order as the invariant to preserve, then write an oracle that checks the final discount matches the mathematical formula — not just 'some discount was applied.' I'd also add concurrency cases to catch usage-limit overruns.",
        "複数のクーポンを同時に重複適用できる機能のテストケースをどう設計しますか？",
        "私は、クーポン種別（%・固定額・送料無料）と排他ルールのすべての組み合わせを列挙するデシジョンテーブルを使い、適用順序を保持すべき不変条件として特定します。その上で、「何らかの割引が適用された」ではなく、最終的な割引額が数式と一致することを検証するオラクルを書きます。また、利用上限超過を検出するための並行テストケースも追加します。"
      ),
      QA(
        "Nếu phát hiện coupon budget bị trừ vượt limit trong production, bạn điều tra thế nào?",
        "If you discover a coupon budget was deducted beyond its limit in production, how would you investigate?",
        "Trước hết tôi kiểm tra log CouponRedemption theo timestamp để tìm cụm request đến gần nhau (dấu hiệu race condition), xem có Idempotency-Key hay không, và kiểm tra cơ chế lock/transaction ở tầng DB (row lock hay optimistic lock). Sau đó tôi viết lại kịch bản bằng test đồng thời để tái hiện lỗi trước khi đề xuất fix, tránh sửa mù.",
        "First I'd inspect CouponRedemption logs by timestamp to find request clusters occurring close together (a race-condition signature), check whether an Idempotency-Key was used, and inspect the DB-level locking mechanism (row lock vs optimistic lock). Then I'd reproduce the issue with a concurrency test before proposing a fix, to avoid blind patching.",
        "本番環境でクーポン予算が上限を超えて差し引かれていることを発見した場合、どのように調査しますか？",
        "まず、タイムスタンプでCouponRedemptionのログを調べ、近接して発生したリクエスト群（レースコンディションの兆候）を探し、冪等性キーが使われていたかを確認し、DB層のロック機構（行ロックか楽観的ロックか）を調べます。次に、盲目的な修正を避けるため、修正案を提案する前に並行テストで問題を再現します。"
      ),
      QA(
        "Khi nào doanh thu nên được ghi nhận trong hệ thống order-to-cash: lúc thanh toán hay lúc giao hàng?",
        "In an order-to-cash system, when should revenue be recognized: at payment or at delivery?",
        "Theo nguyên tắc kế toán dồn tích, tiền thu về lúc thanh toán nên ghi vào tài khoản doanh thu chưa thực hiện (deferred revenue), chỉ khi hàng giao thành công (FULFILLED) mới chuyển sang doanh thu đã ghi nhận. Về kiểm thử, điều này có nghĩa oracle không chỉ nhìn vào Order.status mà phải verify đúng bút toán Ledger tương ứng tại đúng thời điểm chuyển trạng thái.",
        "Under accrual accounting principles, money received at payment should be posted to a deferred-revenue account; only once delivery succeeds (FULFILLED) does it move to recognized revenue. For testing, this means the oracle must not just check Order.status but must verify the corresponding Ledger entry is posted at the exact moment of the state transition.",
        "受注から入金までのシステムにおいて、売上はいつ計上すべきですか：決済時か、それとも配送時か？",
        "発生主義会計の原則に従い、決済時に受け取った金銭は繰延収益（deferred revenue）勘定に計上し、配送が完了（FULFILLED）した時点で初めて計上済み収益に振り替えるべきです。テストの観点では、これはオラクルがOrder.statusを見るだけでなく、状態遷移の正確なタイミングで対応する元帳仕訳が計上されていることを検証しなければならないことを意味します。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Giả sử bạn phát hiện trong giờ sale, 1 coupon giới hạn 100 lượt nhưng hệ thống đã cho redeem 137 lượt. Bạn sẽ trình bày báo cáo bug thế nào và đề xuất fix tạm thời (mitigation) trong lúc chờ fix triệt để?",
        "Suppose during a sale you discover a coupon capped at 100 redemptions but the system allowed 137. How would you write the bug report and propose a temporary mitigation while waiting for a permanent fix?",
        "面接シナリオ",
        "セール中に、100件を上限とするクーポンがシステムで137件も利用されてしまったことを発見したとします。バグレポートをどのように書き、恒久修正を待つ間の一時的な緩和策をどう提案しますか？"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き渡しチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi qua toàn bộ vòng đời kiểm thử cho bài toán khuyến mãi/coupon và order-to-cash của một sàn TMĐT thực tế, từ bối cảnh kinh doanh, kiến trúc, bất biến dữ liệu, đến automation, ca lỗi chuyên sâu, CI/CD, và tích hợp AI. Điểm cốt lõi xuyên suốt là oracle-first: mọi assertion đều bám vào công thức toán học hoặc bất biến nghiệp vụ (grandTotal, usedBudget, trạng thái đơn) thay vì chuỗi hiển thị UI, giúp bộ test bền vững trước thay đổi giao diện và phát hiện đúng lỗi tài chính nghiêm trọng.",
        "This article has walked through the full testing lifecycle for a real-world e-commerce promo/coupon and order-to-cash problem, from business context and architecture to data invariants, automation, deep failure cases, CI/CD, and AI integration. The throughline is oracle-first testing: every assertion anchors to a mathematical formula or business invariant (grandTotal, usedBudget, order status) rather than UI display strings, keeping the test suite resilient to UI changes while catching serious financial defects.",
        "本稿では、実際のEC事業者におけるプロモーション/クーポンおよびOrder-to-Cashの課題について、事業背景・アーキテクチャからデータ不変条件、自動化、高度な異常系、CI/CD、AI統合まで、テストのライフサイクル全体を解説しました。一貫した核心はオラクルファーストであることです。すべてのアサーションはUI表示文字列ではなく数式や業務不変条件（grandTotal、usedBudget、注文ステータス）に基づいており、UI変更に強く、深刻な財務上の不具合を確実に検出できるテストスイートを実現します。"
      ),
      UL(
        [
          "Đã xác định 5 bất biến nghiệp vụ làm oracle cho toàn bộ test suite",
          "Đã phủ 3 tầng kim tự tháp: unit pricing engine, integration order-payment-inventory, E2E happy path",
          "Đã có ca đồng thời (race condition) và idempotency cho giới hạn coupon",
          "Đã gắn batch đối soát cuối ngày làm lưới an toàn tài chính",
          "Đã xác định ranh giới AI agent: đề xuất/tóm tắt, không tự động approve thay đổi tiền",
        ],
        [
          "Defined 5 business invariants as the oracle for the entire test suite",
          "Covered all 3 pyramid layers: unit pricing engine, integration order-payment-inventory, E2E happy path",
          "Added concurrency (race-condition) and idempotency cases for coupon limits",
          "Wired in end-of-day reconciliation batch as a financial safety net",
          "Defined AI agent boundaries: propose/summarize only, never auto-approve money-related changes",
        ],
        [
          "テストスイート全体のオラクルとして5つの業務不変条件を定義した",
          "ピラミッドの3層すべてをカバーした：価格計算エンジンのユニット、注文・決済・在庫の結合、ハッピーパスのE2E",
          "クーポン上限に対する並行性（レースコンディション）と冪等性のケースを追加した",
          "日次締め対査バッチを財務上の安全網として組み込んだ",
          "AIエージェントの境界を定義した：提案・要約のみで、金銭に関わる変更の自動承認は行わない",
        ]
      ),
      TIP("Trước khi bàn giao, chạy lại toàn bộ ca P1 3 lần liên tiếp để xác nhận không flaky, và đính kèm báo cáo coverage pricing engine vào tài liệu release.", "Before handover, re-run all P1 cases 3 consecutive times to confirm they're not flaky, and attach the pricing-engine coverage report to the release documentation.", "引き渡し前に、フレークでないことを確認するためP1ケースをすべて3回連続で再実行し、価格計算エンジンのカバレッジレポートをリリース資料に添付してください。"),
    ],
  },
];

// ============================================================================================
// EXPORT tạm thời — sẽ nối thêm art2, art3, art4
// ============================================================================================

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "ecommerce-promo-coupon-order-to-cash",
  cover: cover1,
  tags: tags("thucchien", "ecommerce", "playwright", "api", "realworld"),
  title: {
    vi: "Thực chiến: kiểm thử khuyến mãi/coupon & Order-to-Cash trong TMĐT",
    en: "Enterprise: testing promo/coupon & order-to-cash in e-commerce",
    ja: "実戦：ECにおけるプロモ/クーポンとOrder-to-Cashのテスト",
  },
  summary: {
    vi: "Bài sâu: bối cảnh, kiến trúc order-to-cash, bất biến tiền/coupon, test plan, ma trận ca, automation, race condition, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: context, order-to-cash architecture, money/coupon invariants, test plan, case matrix, automation, race conditions, reconciliation, CI, AI, interview.",
    ja: "詳細解説：背景、Order-to-Cashアーキテクチャ、金額/クーポン不変条件、テスト計画、ケースマトリクス、自動化、レースコンディション、対査、CI、AI、面接。",
  },
  pages: buildDoc(pages1),
};

// ============================================================================================
// BÀI 2: Retail/POS — Đồng bộ tồn kho omnichannel đa kho, hoàn/đổi, tích điểm loyalty
// ============================================================================================

const cover2 = makeThumb({ id: "rt-omni-02", domain: "retail", kind: "thucchien", label: "実戦 · OMNICHANNEL" });

const svg2Arch = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#1c1917"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#fed7aa">Luồng tồn kho Omnichannel · Omnichannel inventory flow</text>
<g font-size="11" fill="#fed7aa">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#292524" stroke="#fb923c"/><text x="75" y="78" text-anchor="middle">App/Web (Online)</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#292524" stroke="#fb923c"/><text x="215" y="78" text-anchor="middle">POS cửa hàng</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#292524" stroke="#fb923c"/><text x="355" y="78" text-anchor="middle">Inventory Hub</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#292524" stroke="#f59e0b"/><text x="495" y="78" text-anchor="middle">Order/OMS</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#292524" stroke="#34d399"/><text x="635" y="78" text-anchor="middle">Loyalty Ledger</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#d6d3d1" stroke-width="2" marker-end="url(#a2)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#292524" stroke="#a78bfa"/><text x="215" y="158" text-anchor="middle">Kho A (WH-HN)</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#292524" stroke="#a78bfa"/><text x="355" y="158" text-anchor="middle">Kho B (WH-HCM)</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#292524" stroke="#a78bfa"/><text x="495" y="158" text-anchor="middle">Cửa hàng #12</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130" stroke="#d6d3d1" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="280" y="200" width="260" height="40" rx="8" fill="#1c2b1f" stroke="#34d399"/><text x="410" y="225" text-anchor="middle" fill="#6ee7b7">Bất biến: Tồn kho tổng ≥ 0 tại mọi kênh, mọi thời điểm</text>
</g>
<defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#d6d3d1"/></marker></defs>
</svg>`;

const svg2Matrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#1c1917"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#fed7aa">Ma trận ca omnichannel · Omnichannel case matrix</text>
<g font-size="11" fill="#fed7aa">
<rect x="20" y="44" width="700" height="30" fill="#292524"/>
<text x="30" y="64">Ca</text><text x="180" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Mức rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#171412"/><text x="30" y="94">TC-01 Bán đồng thời 2 kênh</text><text x="180" y="94">Online + POS cùng bán SKU còn 1 đơn vị</text><text x="420" y="94">Chỉ 1 giao dịch thắng, tồn kho không âm</text><text x="620" y="94" fill="#ef4444">Rất cao</text>
<rect x="20" y="104" width="700" height="30" fill="#171412"/><text x="30" y="124">TC-02 Đổi hàng khác size</text><text x="180" y="124">Đổi SKU A lấy SKU B cùng giá</text><text x="420" y="124">Tồn A +1, tồn B -1, không phát sinh doanh thu mới</text><text x="620" y="124" fill="#34d399">TB</text>
<rect x="20" y="134" width="700" height="30" fill="#171412"/><text x="30" y="154">TC-03 Hoàn hàng online, trả tại cửa hàng</text><text x="180" y="154">BOPIS return ngược kênh</text><text x="420" y="154">Tồn kho cộng đúng vào kho cửa hàng nhận trả</text><text x="620" y="154" fill="#f59e0b">Cao</text>
<rect x="20" y="164" width="700" height="30" fill="#171412"/><text x="30" y="184">TC-04 Đồng bộ trễ giữa kho</text><text x="180" y="184">Mạng cửa hàng gián đoạn 5 phút</text><text x="420" y="184">Không mất event, đồng bộ bù khi mạng phục hồi</text><text x="620" y="184" fill="#f59e0b">Cao</text>
<rect x="20" y="194" width="700" height="30" fill="#171412"/><text x="30" y="214">TC-05 Tích điểm loyalty khi trả hàng 1 phần</text><text x="180" y="214">Trả 1/2 sản phẩm trong đơn</text><text x="420" y="214">Điểm bị trừ đúng tỉ lệ giá trị hàng trả</text><text x="620" y="214" fill="#34d399">TB</text>
<rect x="20" y="224" width="700" height="30" fill="#171412"/><text x="30" y="244">TC-06 Đổi tier loyalty</text><text x="180" y="244">Khách vượt ngưỡng điểm lên hạng Vàng</text><text x="420" y="264" fill="#f59e0b">Cao</text><text x="420" y="244">Hạng cập nhật ngay, ưu đãi mới áp dụng từ giao dịch kế tiếp</text>
</g>
</svg>`;

const pages2 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một chuỗi bán lẻ thời trang - gia dụng có 85 cửa hàng vật lý trên toàn quốc và một kênh online (app + website) vận hành song song, tổng cộng phục vụ khoảng 40.000 giao dịch/ngày, trong đó 65% diễn ra tại cửa hàng qua POS và 35% qua kênh online. Mỗi cửa hàng có kho riêng, ngoài ra còn 2 trung tâm phân phối lớn (WH-HN, WH-HCM) giữ vai trò kho dự phòng cho các đơn online khi cửa hàng gần nhất hết hàng. Bài toán cốt lõi là đồng bộ tồn kho thời gian thực giữa hàng chục điểm bán để tránh tình trạng bán vượt tồn kho (oversell) — một lỗi từng khiến chuỗi bán lẻ tương tự phải hoàn tiền và xin lỗi hơn 1.200 khách hàng trong một đợt sale cuối năm do hệ thống hiển thị 'còn hàng' tại 12 cửa hàng dù kho thực tế đã hết.",
        "A fashion-and-homeware retail chain operates 85 physical stores nationwide alongside an online channel (app + website), serving roughly 40,000 transactions per day, with 65% occurring in-store via POS and 35% online. Each store holds its own stock, plus two large distribution centers (WH-HN, WH-HCM) act as backup warehouses for online orders when the nearest store runs out. The core problem is real-time inventory synchronization across dozens of selling points to prevent overselling — a defect that once forced a similar chain to refund and apologize to over 1,200 customers during a year-end sale because the system displayed 'in stock' at 12 stores when the physical stock was actually zero.",
        "あるファッション・生活雑貨の小売チェーンは、全国85店舗の実店舗とオンラインチャネル（アプリ＋ウェブサイト）を並行運営しており、1日あたり約4万件の取引を処理しています。そのうち65%は店舗のPOS経由、35%はオンラインチャネル経由です。各店舗は独自の在庫を持ち、さらに2つの大型物流センター（WH-HN、WH-HCM）が、最寄り店舗の在庫切れ時にオンライン注文のバックアップ倉庫として機能します。中核となる課題は、数十の販売拠点間でリアルタイムに在庫を同期し、超過販売（オーバーセル）を防ぐことです。類似チェーンでは過去に、実際には在庫がゼロなのにシステムが12店舗で「在庫あり」と表示してしまい、年末セール中に1,200人以上の顧客への返金と謝罪を余儀なくされた事例があります。"
      ),
      P(
        "Phạm vi bài viết bao trùm 3 luồng nghiệp vụ chính: đồng bộ tồn kho đa kênh (online, POS, kho dự phòng), quy trình hoàn/đổi hàng theo mô hình omnichannel (mua online trả tại cửa hàng — BOPIS return, mua tại cửa hàng đổi online), và hệ thống tích điểm loyalty gắn liền với giá trị giao dịch thực (sau khi trừ hàng trả). Ràng buộc nghiệp vụ quan trọng: tồn kho hiển thị cho khách phải trễ tối đa 5 giây so với tồn kho thực tại quầy, và điểm loyalty phải được tính lại chính xác trong vòng 24 giờ nếu có hoàn/đổi xảy ra sau khi điểm đã cộng.",
        "The scope covers 3 core business flows: multi-channel inventory synchronization (online, POS, backup warehouse), the omnichannel return/exchange process (buy-online-return-in-store — BOPIS return, buy-in-store-exchange-online), and the loyalty points system tied to actual transaction value (net of returned items). Key business constraints: inventory displayed to customers must lag actual counter stock by no more than 5 seconds, and loyalty points must be recalculated accurately within 24 hours if a return/exchange occurs after points were already credited.",
        "本稿の範囲は3つの主要業務フローをカバーします：マルチチャネル在庫同期（オンライン・POS・バックアップ倉庫）、オムニチャネル型の返品・交換プロセス（オンライン購入・店舗返品＝BOPIS return、店舗購入・オンライン交換）、そして実際の取引金額（返品分を差し引いた額）に連動するロイヤルティポイント制度です。重要な業務制約として、顧客に表示される在庫は実際のレジ在庫との差が最大5秒以内でなければならず、ポイント計上後に返品・交換が発生した場合は24時間以内にポイントを正確に再計算する必要があります。"
      ),
      IMG(svg2Arch, "Kiến trúc luồng tồn kho omnichannel giữa Online/POS/kho/loyalty", "Omnichannel inventory architecture across online/POS/warehouse/loyalty", "オンライン・POS・倉庫・ロイヤルティ間のオムニチャネル在庫アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho Inventory Hub: trừ/cộng tồn kho, khoá tạm thời (reservation)", "Kiểm thử E2E Playwright cho luồng bán hàng và hoàn/đổi liên kênh", "Kiểm thử tính điểm loyalty và cập nhật hạng thành viên"],
        ["API testing for the Inventory Hub: stock deduction/replenishment, temporary reservation locks", "Playwright E2E testing for the sales and cross-channel return/exchange flow", "Testing loyalty point calculation and tier upgrade logic"],
        ["在庫ハブのAPIテスト：在庫の増減、一時的な予約ロック", "販売およびチャネル横断の返品・交換フローのPlaywright E2Eテスト", "ロイヤルティポイント計算と会員ランク更新のテスト"]
      ),
      NOTE("Bài này giả định Inventory Hub expose test-only endpoint để seed tồn kho theo từng kho/cửa hàng và reset điểm loyalty giữa các lần chạy.", "This article assumes the Inventory Hub exposes test-only endpoints to seed per-warehouse/store stock and reset loyalty points between runs.", "本稿では、在庫ハブが倉庫・店舗ごとの在庫をシードし、実行間でロイヤルティポイントをリセットするテスト専用エンドポイントを公開していることを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc trung tâm là Inventory Hub — một service độc lập giữ bảng tồn kho theo (SKU, locationId) và phát sự kiện StockChanged mỗi khi có giao dịch tại bất kỳ kênh nào. POS tại cửa hàng và app online đều gọi Inventory Hub qua API đồng bộ khi cần kiểm tra tồn kho khả dụng (available-to-sell = tồn vật lý − đã giữ chỗ), và gọi bất đồng bộ (qua message queue) khi ghi nhận thay đổi để tránh nghẽn tại quầy thu ngân lúc cao điểm. OMS (Order Management System) đóng vai trò điều phối: khi kho gần nhất hết hàng, OMS tự động chọn kho dự phòng theo thứ tự ưu tiên khoảng cách địa lý và tồn kho khả dụng.",
        "The central architecture is the Inventory Hub — a standalone service holding the stock table keyed by (SKU, locationId) and emitting a StockChanged event whenever a transaction occurs on any channel. Both in-store POS and the online app call the Inventory Hub synchronously when checking available-to-sell stock (physical stock minus reserved), and asynchronously (via message queue) when recording changes to avoid bottlenecking the checkout counter during peak hours. The OMS (Order Management System) acts as orchestrator: when the nearest store is out of stock, it automatically selects a backup warehouse ranked by geographic proximity and available stock.",
        "中核となるアーキテクチャは在庫ハブです。これは(SKU, locationId)をキーとする在庫テーブルを保持する独立サービスで、いずれかのチャネルで取引が発生するたびにStockChangedイベントを発行します。店舗POSとオンラインアプリはどちらも、販売可能在庫（物理在庫マイナス予約分）を確認する際は同期的に在庫ハブを呼び出し、変更を記録する際はピーク時のレジ渋滞を避けるためメッセージキュー経由で非同期に呼び出します。OMS（受注管理システム）はオーケストレーター役を担い、最寄り店舗の在庫切れ時には、地理的近さと販売可能在庫でランク付けしたバックアップ倉庫を自動選択します。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất là bán đồng thời trên 2 kênh cho cùng 1 SKU chỉ còn 1 đơn vị tồn kho — đây là race condition kinh điển của bài toán omnichannel, đòi hỏi Inventory Hub phải dùng cơ chế khoá (row lock hoặc optimistic lock với version number) để đảm bảo chỉ 1 giao dịch thắng. Khó khăn thứ hai là độ trễ đồng bộ giữa các kho khi mạng cửa hàng gián đoạn: POS phải hoạt động offline-first (ghi log giao dịch cục bộ) rồi đồng bộ bù khi mạng phục hồi, nhưng thứ tự đồng bộ bù sai có thể khiến tồn kho tính sai tạm thời. Khó khăn thứ ba là hoàn hàng ngược kênh (BOPIS return): khách mua online nhưng trả tại cửa hàng bất kỳ, đòi hỏi tồn kho phải cộng đúng vào kho của cửa hàng nhận trả chứ không phải kho gốc đã xuất bán, nếu không sẽ gây lệch tồn kho giữa các kho theo thời gian.",
        "The trickiest part is simultaneous sales across 2 channels for the same SKU with only 1 unit left in stock — the classic omnichannel race condition, requiring the Inventory Hub to use a locking mechanism (row lock or optimistic lock with a version number) to guarantee only one transaction wins. The second challenge is sync latency between warehouses when a store's network drops: POS must operate offline-first (logging transactions locally) then reconcile once connectivity returns, but an incorrect reconciliation order can temporarily miscalculate stock. The third challenge is cross-channel returns (BOPIS return): a customer who bought online but returns at any physical store requires stock to be credited to the receiving store's warehouse, not the original fulfilling warehouse — otherwise stock drifts out of sync across locations over time.",
        "最も難しいのは、同一SKUの在庫が残り1点のときに2つのチャネルで同時に販売が発生するケースです。これはオムニチャネル特有の典型的なレースコンディションであり、在庫ハブは行ロックまたはバージョン番号付き楽観的ロックといったロック機構を用いて、1つの取引のみが成立することを保証する必要があります。2つ目の難点は、店舗のネットワークが途絶した際の倉庫間同期の遅延です。POSはオフラインファーストで動作（取引をローカルにログ記録）し、接続復旧後に補完同期を行う必要がありますが、補完同期の順序を誤ると在庫が一時的に誤計算されます。3つ目の難点はチャネルを跨いだ返品（BOPIS return）です。オンラインで購入した顧客が任意の実店舗で返品する場合、在庫は元の出荷倉庫ではなく、返品を受け付けた店舗の在庫に加算される必要があり、そうしないと時間の経過とともに拠点間で在庫がずれてしまいます。"
      ),
      SCEN(
        "Sự cố thực tế",
        "Real incident",
        "Trong đợt khai trương bộ sưu tập giới hạn, một mẫu túi xách chỉ có 3 chiếc tại kho trung tâm nhưng hệ thống đã bán được 5 đơn hàng online trong vòng 90 giây đầu tiên. Điều tra cho thấy cache tồn kho ở tầng CDN của app có TTL 30 giây, khiến 2 request cuối vẫn thấy 'còn hàng' dù kho đã về 0, và Inventory Hub không có cơ chế publish invalidate cache ngay khi tồn kho chạm ngưỡng thấp.",
        "During a limited-collection launch, a handbag model had only 3 units at the central warehouse, but the system sold 5 online orders within the first 90 seconds. Investigation revealed the app's CDN-layer inventory cache had a 30-second TTL, so the last 2 requests still saw 'in stock' even though stock had reached zero, and the Inventory Hub had no mechanism to publish a cache invalidation the moment stock hit a low threshold.",
        "実際のインシデント",
        "限定コレクションの発売時、あるハンドバッグは中央倉庫に3個しかなかったにもかかわらず、最初の90秒間でオンライン注文が5件成立してしまいました。調査の結果、アプリのCDN層の在庫キャッシュはTTLが30秒であったため、在庫がゼロになった後も最後の2件のリクエストは「在庫あり」と表示されており、在庫ハブには在庫が低い閾値に達した瞬間にキャッシュ無効化を発行する仕組みがなかったことが判明しました。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến (oracle)", en: "3. Data model & invariants (oracle)", ja: "3. データモデルと不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm bảng StockLevel (sku, locationId, onHand, reserved, version), StockTransfer (fromLocation, toLocation, sku, qty, status), ReturnExchange (originalOrderId, returnLocationId, sku, qty, refundAmount, type: RETURN|EXCHANGE), và LoyaltyLedger (customerId, points, tier, txnRef, effectiveAt). Available-to-sell của một SKU tại một địa điểm luôn được tính là onHand − reserved, và giá trị này là số hiển thị cho khách chứ không phải onHand thô.",
        "The core data model includes StockLevel (sku, locationId, onHand, reserved, version), StockTransfer (fromLocation, toLocation, sku, qty, status), ReturnExchange (originalOrderId, returnLocationId, sku, qty, refundAmount, type: RETURN|EXCHANGE), and LoyaltyLedger (customerId, points, tier, txnRef, effectiveAt). A SKU's available-to-sell at a location is always computed as onHand − reserved, and this is the value shown to customers, not raw onHand.",
        "コアデータモデルには、StockLevel（在庫：sku、locationId、onHand、reserved、version）、StockTransfer（在庫移動：fromLocation、toLocation、sku、qty、status）、ReturnExchange（返品・交換：originalOrderId、returnLocationId、sku、qty、refundAmount、type: RETURN|EXCHANGE）、およびLoyaltyLedger（ロイヤルティ元帳：customerId、points、tier、txnRef、effectiveAt）が含まれます。あるSKUのある拠点における販売可能在庫は常にonHand − reservedとして計算され、これは生のonHandではなく顧客に表示される値です。"
      ),
      H("Bất biến nghiệp vụ bắt buộc (oracle)", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Bất biến 1: tồn kho tổng toàn hệ thống của 1 SKU (Σ onHand mọi location) không bao giờ âm và không đổi ngoài các giao dịch hợp lệ (bán, nhập, chuyển kho, trả hàng)",
          "Bất biến 2: available-to-sell = onHand − reserved luôn ≥ 0 tại mọi location, mọi thời điểm",
          "Bất biến 3: mọi StockTransfer hoàn tất phải làm tổng tồn kho hai đầu (from+to) không đổi (bảo toàn số lượng)",
          "Bất biến 4: điểm loyalty cộng cho 1 đơn hàng phải bị điều chỉnh giảm tương ứng khi có hoàn/đổi làm giảm giá trị giao dịch thực",
          "Bất biến 5: hạng thành viên (tier) chỉ tăng khi điểm tích luỹ hợp lệ vượt ngưỡng, không giảm ngược khi có hoàn hàng xảy ra sau khi đã lên hạng trong kỳ trước",
        ],
        [
          "Invariant 1: total system-wide stock for a SKU (Σ onHand across locations) is never negative and changes only via valid transactions (sale, receiving, transfer, return)",
          "Invariant 2: available-to-sell = onHand − reserved is always ≥ 0 at every location, at all times",
          "Invariant 3: every completed StockTransfer must leave the combined stock of both endpoints (from+to) unchanged (quantity conservation)",
          "Invariant 4: loyalty points credited for an order must be adjusted downward correspondingly when a return/exchange reduces the actual transaction value",
          "Invariant 5: membership tier only increases when valid accumulated points cross a threshold, and never retroactively decreases due to a return that happens after the tier was already upgraded in a prior period",
        ],
        [
          "不変条件1：あるSKUのシステム全体の在庫合計（全拠点のΣonHand）は決して負にならず、有効な取引（販売・入荷・移動・返品）によってのみ変化する",
          "不変条件2：販売可能在庫（onHand − reserved）は、いかなる拠点・時点でも常に0以上である",
          "不変条件3：完了したすべてのStockTransferは、移動元と移動先の在庫合計を変えない（数量保存）",
          "不変条件4：注文に付与されたロイヤルティポイントは、返品・交換により実際の取引額が減少した場合、それに応じて減算調整されなければならない",
          "不変条件5：会員ランクは、有効な累積ポイントが閾値を超えた場合にのみ上昇し、前期にすでにランクアップした後に発生した返品によって遡って引き下げられることはない",
        ]
      ),
      CODE("typescript", `// Oracle helper — dùng lại trong mọi test case liên quan tồn kho
export function assertStockInvariant(stock: StockLevel) {
  expect(stock.onHand - stock.reserved).toBeGreaterThanOrEqual(0); // available-to-sell không âm
}

export async function assertGlobalStockConserved(sku: string, before: number, api: ApiClient) {
  const rows = await api.get(\`/internal/inventory/\${sku}/all-locations\`);
  const totalNow = rows.reduce((sum: number, r: StockLevel) => sum + r.onHand, 0);
  expect(totalNow).toBe(before); // transfer không được làm mất/sinh thêm hàng
}`),
      TIP("Luôn assert bằng available-to-sell (onHand − reserved), không assert bằng onHand thô — nhiều lỗi UI 'còn hàng' sai bắt nguồn từ việc dev quên trừ reserved.", "Always assert using available-to-sell (onHand − reserved), never raw onHand — many 'incorrectly in stock' UI bugs stem from developers forgetting to subtract reserved.", "常に販売可能在庫（onHand − reserved）でアサーションしてください。生のonHandでアサーションしてはいけません。「誤って在庫ありと表示される」バグの多くは、開発者がreservedの控除を忘れたことに起因します。"),
    ],
  },
  {
    heading: { vi: "4. Rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Ma trận rủi ro xếp hạng: cao nhất là race condition bán đồng thời đa kênh trên tồn kho thấp (ảnh hưởng: oversell, mất uy tín, chi phí xử lý khiếu nại); tiếp theo là lệch tồn kho sau BOPIS return sai kho; rủi ro trung bình là cache tồn kho hiển thị trễ gây trải nghiệm khách hàng kém; rủi ro thấp hơn là tính sai điểm loyalty hiển thị trên app (không ảnh hưởng tài chính trực tiếp nhưng ảnh hưởng lòng tin). Chiến lược áp dụng kim tự tháp: 55% unit test cho logic tính available-to-sell và tier loyalty, 35% integration/API test cho luồng transfer/return giữa các location, 10% E2E Playwright cho các luồng bán hàng - hoàn/đổi quan trọng nhất.",
        "The risk matrix ranks: highest is the multi-channel simultaneous-sale race condition on low stock (impact: overselling, reputation damage, complaint-handling cost); next is stock drift after a BOPIS return credited to the wrong location; medium risk is stale inventory cache degrading customer experience; lower risk is an incorrectly displayed loyalty point total on the app (no direct financial impact but erodes trust). The strategy follows a pyramid: 55% unit tests for available-to-sell and loyalty-tier logic, 35% integration/API tests for transfer/return flows across locations, 10% E2E Playwright for the most critical sale and return/exchange flows.",
        "リスクマトリクスのランク付け：最高リスクは低在庫時のマルチチャネル同時販売によるレースコンディション（影響：オーバーセル、信用低下、クレーム対応コスト）。次に、誤った拠点に加算されたBOPIS returnによる在庫のずれ。中リスクは在庫キャッシュの遅延による顧客体験の悪化。より低いリスクは、アプリに表示されるロイヤルティポイント合計の誤り（直接的な財務影響はないが信頼を損なう）です。戦略はピラミッド型を採用します：販売可能在庫計算とロイヤルティランクロジックのユニットテスト55%、拠点間の移動・返品フローの結合/APIテスト35%、最重要な販売・返品/交換フローのE2E Playwrightテスト10%。"
      ),
      H("Kim tự tháp kiểm thử áp dụng", "Applied test pyramid", "適用するテストピラミッド"),
      UL(
        ["Unit (55%): công thức available-to-sell, tính điểm loyalty, ngưỡng tier", "Integration/API (35%): transfer giữa location, BOPIS return, đồng bộ bù offline", "E2E (10%): happy path bán hàng đa kênh + 2-3 kịch bản race condition song song"],
        ["Unit (55%): available-to-sell formula, loyalty point calculation, tier thresholds", "Integration/API (35%): inter-location transfer, BOPIS return, offline reconciliation sync", "E2E (10%): multi-channel happy-path sale + 2-3 parallel race-condition scenarios"],
        ["ユニット（55%）：販売可能在庫の計算式、ロイヤルティポイント計算、ランク閾値", "結合/API（35%）：拠点間移動、BOPIS return、オフライン補完同期", "E2E（10%）：マルチチャネル販売のハッピーパス＋並行レースコンディションシナリオ2〜3件"]
      ),
      WARN("Không nên phủ toàn bộ tổ hợp kho×kênh bằng E2E thật trên nhiều cửa hàng — chi phí seed dữ liệu và bảo trì rất cao. Ưu tiên mô phỏng qua API cho phần lớn ca.", "Do not cover every warehouse-x-channel combination with real E2E across many stores — data-seeding and maintenance cost is very high. Prefer API-level simulation for most cases.", "多数の店舗にまたがる倉庫×チャネルの全組み合わせを実際のE2Eでカバーしてはいけません。データシードと保守のコストが非常に高くなります。ほとんどのケースはAPIレベルのシミュレーションを優先してください。"),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi (in-scope: Inventory Hub, OMS, POS API, Loyalty Ledger; out-of-scope: phần cứng máy quét mã vạch tại quầy), tiêu chí bắt đầu (staging có dữ liệu seed tồn kho cho ít nhất 5 location mô phỏng, mock POS offline sẵn sàng), và tiêu chí kết thúc (100% ca P1/P2 pass, không còn bug Critical/High mở, không phát hiện oversell trong 72 giờ test khối lượng liên tục). Môi trường kiểm thử dùng 3 tầng: dev (unit, mock hoàn toàn), staging (integration với POS giả lập offline/online), và pre-prod (dữ liệu ẩn danh hoá từ 10 cửa hàng thật để test khối lượng và độ trễ đồng bộ).",
        "The test plan defines scope (in-scope: Inventory Hub, OMS, POS API, Loyalty Ledger; out-of-scope: barcode-scanner hardware at the counter), entry criteria (staging seeded with stock data for at least 5 simulated locations, offline-POS mock ready), and exit criteria (100% P1/P2 cases pass, no open Critical/High bugs, zero oversell detected during 72 hours of continuous volume testing). Testing uses 3 tiers: dev (unit, fully mocked), staging (integration with simulated offline/online POS), and pre-prod (anonymized data from 10 real stores for volume and sync-latency testing).",
        "テスト計画では、範囲（対象：在庫ハブ・OMS・POS API・ロイヤルティ元帳、対象外：レジのバーコードスキャナーのハードウェア）、開始基準（少なくとも5つの模擬拠点分の在庫データがシードされたステージング環境、オフラインPOSモック準備完了）、終了基準（P1/P2ケース100%合格、Critical/High未解決バグゼロ、72時間の連続量的テストでオーバーセル検出ゼロ）を定義します。テスト環境は3層構成です：dev（ユニット、完全モック）、ステージング（模擬オフライン/オンラインPOSとの結合）、プレプロダクション（実店舗10店分のデータを匿名化した量的・同期遅延テスト用）。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: duyệt test plan, ký exit criteria", "SDET: viết API/E2E automation, duy trì CI", "Vận hành kho (Ops): review kịch bản transfer/return thực tế", "Đội CRM/Loyalty SME: xác nhận quy tắc tính điểm và lên hạng"],
        ["QA Lead: approves test plan, signs off exit criteria", "SDET: writes API/E2E automation, maintains CI", "Warehouse Ops: reviews real-world transfer/return scenarios", "CRM/Loyalty SME: confirms point calculation and tier-upgrade rules"],
        ["QAリード：テスト計画を承認し、終了基準にサインオフする", "SDET：API/E2E自動化を作成し、CIを保守する", "倉庫運用担当：実際の移動・返品シナリオをレビューする", "CRM/ロイヤルティSME：ポイント計算とランクアップのルールを確認する"]
      ),
      NOTE("Chỉ số theo dõi hàng tuần: số lần phát hiện chênh lệch tồn kho qua đối soát, tỉ lệ đơn online bị huỷ do hết hàng ảo (phantom out-of-stock), thời gian trung bình đồng bộ bù sau mất kết nối.", "Weekly tracked metrics: number of stock discrepancies caught via reconciliation, rate of online orders cancelled due to phantom out-of-stock, average reconciliation-sync time after disconnection.", "週次で追跡する指標：対査で発見された在庫差異の件数、幻の欠品（phantom out-of-stock）によりキャンセルされたオンライン注文の割合、切断後の補完同期にかかる平均時間。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca sử dụng equivalence partitioning cho mức tồn kho (0, 1, nhiều), boundary value analysis cho ngưỡng lên hạng loyalty (ngưỡng-1, ngưỡng, ngưỡng+1), và decision table cho tổ hợp kênh mua × kênh trả (online-online, online-cửa hàng, cửa hàng-online, cửa hàng-cửa hàng khác). Mỗi ca được đặt tên theo chuẩn TC-<module>-<số>-<mô tả ngắn>, gắn oracle tương ứng ngay trong test management tool để review nhanh và tránh hiểu lầm kỳ vọng.",
        "The case matrix uses equivalence partitioning for stock levels (0, 1, many), boundary value analysis for loyalty tier thresholds (threshold-1, threshold, threshold+1), and a decision table for purchase-channel x return-channel combinations (online-online, online-store, store-online, store-different store). Each case follows the TC-<module>-<number>-<short description> naming convention, tagged with its oracle directly in the test management tool for fast review and to avoid ambiguity.",
        "ケースマトリクスでは、在庫レベルに対する同値分割（0・1・複数）、ロイヤルティランク閾値に対する境界値分析（閾値-1・閾値・閾値+1）、そして購入チャネル×返品チャネルの組み合わせ（オンライン-オンライン、オンライン-店舗、店舗-オンライン、店舗-別店舗）に対するデシジョンテーブルを使用します。各ケースはTC-<モジュール>-<番号>-<短い説明>という命名規則に従い、迅速なレビューと期待値の誤解を避けるため、テスト管理ツール内でオラクルを直接タグ付けします。"
      ),
      IMG(svg2Matrix, "Ma trận ca kiểm thử omnichannel với mức rủi ro và oracle tương ứng", "Omnichannel test case matrix with risk level and corresponding oracle", "リスクレベルと対応オラクルを示すオムニチャネルテストケースマトリクス"),
      H("Ưu tiên chạy", "Run priority", "実行優先度"),
      UL(
        ["P1 (mỗi build): TC-01 race condition đa kênh, TC-03 BOPIS return, TC-04 đồng bộ trễ", "P2 (nightly): TC-02 đổi hàng khác size, TC-05 điểm loyalty khi trả 1 phần", "P3 (trước release): TC-06 đổi tier, edge case đa tiền tệ/khuyến mãi kèm loyalty"],
        ["P1 (every build): TC-01 multi-channel race condition, TC-03 BOPIS return, TC-04 sync latency", "P2 (nightly): TC-02 size exchange, TC-05 partial-return loyalty points", "P3 (pre-release): TC-06 tier change, multi-currency/promo-plus-loyalty edge cases"],
        ["P1（毎ビルド実行）：TC-01マルチチャネルレースコンディション、TC-03 BOPIS return、TC-04同期遅延", "P2（夜間実行）：TC-02サイズ交換、TC-05一部返品時のロイヤルティポイント", "P3（リリース前実行）：TC-06ランク変更、多通貨/プロモ併用ロイヤルティのエッジケース"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment setup", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Việc seed dữ liệu dùng test-only API `/internal/test/seed` để tạo tồn kho tuỳ chỉnh cho từng location (SKU, onHand, reserved), tránh phụ thuộc dữ liệu sản xuất. Trước mỗi suite, hook `beforeAll` gọi endpoint reset để đưa reserved về 0 và xoá StockTransfer/ReturnExchange test cũ, đảm bảo cô lập giữa các lần chạy CI song song. POS offline được mock bằng cách chặn network layer trong test container để giả lập gián đoạn kết nối, còn Loyalty Ledger dùng snapshot điểm ban đầu cố định trước mỗi ca liên quan tier.",
        "Data seeding uses a test-only `/internal/test/seed` API to create custom stock per location (SKU, onHand, reserved), avoiding dependency on production data. Before each suite, a `beforeAll` hook calls a reset endpoint to zero out reserved and delete stale StockTransfer/ReturnExchange records, ensuring isolation across parallel CI runs. Offline POS is mocked by blocking the network layer in the test container to simulate a connectivity outage, while the Loyalty Ledger uses a fixed starting-point snapshot before each tier-related case.",
        "データシードには、本番データへの依存を避けるため、テスト専用の`/internal/test/seed` APIを使用し、拠点ごとにカスタムの在庫（SKU、onHand、reserved）を作成します。各スイート実行前に、`beforeAll`フックがリセットエンドポイントを呼び出してreservedをゼロに戻し、古いStockTransfer/ReturnExchangeレコードを削除することで、並行CI実行間の分離を確保します。オフラインPOSはテストコンテナ内でネットワーク層をブロックすることで接続断を模擬し、ロイヤルティ元帳はランク関連ケースの前に固定の初期ポイントスナップショットを使用します。"
      ),
      CODE("bash", `# Reset & seed dữ liệu tồn kho trước khi chạy suite
curl -X POST https://staging.retail.internal/internal/test/reset \\
  -H "X-Test-Key: $TEST_API_KEY"

curl -X POST https://staging.retail.internal/internal/test/seed/stock \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "BAG-LTD-2026",
    "locations": [
      { "locationId": "WH-HCM", "onHand": 3, "reserved": 0 },
      { "locationId": "STORE-12", "onHand": 0, "reserved": 0 }
    ]
  }'`),
      TIP("Đặt onHand cực thấp (1-3) khi test race condition đa kênh để dễ đẩy hệ thống chạm giới hạn nhanh, thay vì phải mô phỏng hàng trăm request trên tồn kho lớn.", "Set onHand extremely low (1-3) for multi-channel race-condition testing so the system hits the limit quickly, instead of simulating hundreds of requests against large stock.", "マルチチャネルのレースコンディションテストでは、大量の在庫に対して数百件のリクエストをシミュレートする代わりに、システムがすぐに上限に到達するようonHandを極端に低く（1〜3）設定してください。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright với Page Object Model: POSTerminalPage, OnlineCheckoutPage, ReturnCounterPage, cùng fixture apiClient gọi thẳng Inventory Hub để xác minh trạng thái backend song song với UI. Assertion cuối không dừng ở 'Giao dịch thành công' mà gọi API `/inventory/:sku/:location` để xác minh available-to-sell đúng theo công thức đã nêu ở chương 3.",
        "Happy-path automation uses Playwright with the Page Object Model: POSTerminalPage, OnlineCheckoutPage, ReturnCounterPage, plus an apiClient fixture calling the Inventory Hub directly to verify backend state alongside UI. The final assertion doesn't stop at 'Transaction successful' — it calls the `/inventory/:sku/:location` API to verify available-to-sell matches the formula from chapter 3.",
        "ハッピーパス自動化には、Playwrightとページオブジェクトモデル（POSTerminalPage、OnlineCheckoutPage、ReturnCounterPage）を使用し、UIと並行してバックエンド状態を直接検証するapiClientフィクスチャを併用します。最終アサーションは「取引成功」で終わらず、`/inventory/:sku/:location` APIを呼び出して第3章の計算式どおりに販売可能在庫が正しいことを検証します。"
      ),
      CODE("typescript", `import { test, expect } from "./fixtures";
import { POSTerminalPage, OnlineCheckoutPage } from "./pages";

test("bán tại POS trừ đúng tồn kho cửa hàng, oracle qua API", async ({ page, apiClient }) => {
  const pos = new POSTerminalPage(page);
  await pos.goto("STORE-12");
  await pos.scanSku("SHOE-042", 1);
  const before = await apiClient.get("/inventory/SHOE-042/STORE-12");

  await pos.checkout({ payment: "CASH" });

  const after = await apiClient.get("/inventory/SHOE-042/STORE-12");
  expect(after.onHand).toBe(before.onHand - 1);
  expect(after.onHand - after.reserved).toBeGreaterThanOrEqual(0);
});`),
      CODE("typescript", `// API-level test cho tích điểm loyalty theo giá trị giao dịch thực
test("tích điểm loyalty đúng công thức 1 điểm / 10.000đ", async ({ apiClient }) => {
  const res = await apiClient.post("/loyalty/accrue", {
    customerId: "cus-001",
    orderTotal: 850000,
  });
  expect(res.pointsEarned).toBe(85);
  const ledger = await apiClient.get("/loyalty/cus-001/balance");
  expect(ledger.points).toBeGreaterThanOrEqual(85);
});`),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ba nhóm ca lỗi trọng tâm của bài toán omnichannel là: race condition khi bán đồng thời trên nhiều kênh cho tồn kho thấp, đồng bộ bù sai thứ tự sau khi mạng cửa hàng gián đoạn gây tồn kho tạm thời sai, và tính điểm loyalty sai khi có hoàn hàng một phần xảy ra sau khi điểm đã được cộng và khách đã dùng điểm đó để đổi quà.",
        "The three focal failure groups for the omnichannel problem are: race conditions when selling simultaneously across multiple channels on low stock, incorrectly ordered reconciliation after a store network outage causing temporarily wrong stock, and incorrect loyalty point recalculation when a partial return occurs after points were already credited and the customer already redeemed them.",
        "オムニチャネルの課題における3つの主要な異常系グループは、低在庫時に複数チャネルで同時に販売が発生するレースコンディション、店舗ネットワーク切断後の補完同期の順序誤りによる一時的な在庫の誤り、そしてポイントが既に付与され顧客がそれを既に交換に使用した後に一部返品が発生した場合のロイヤルティポイント再計算の誤りです。"
      ),
      CODE("typescript", `// Ca 1: Race condition bán đồng thời đa kênh trên tồn kho = 1
test("chỉ 1 trong N giao dịch đồng thời thắng khi tồn kho chỉ còn 1", async ({ apiClient }) => {
  await apiClient.post("/internal/test/seed/stock", { sku: "BAG-LTD-2026", locations: [{ locationId: "WH-HCM", onHand: 1, reserved: 0 }] });

  const requests = Array.from({ length: 10 }, (_, i) =>
    apiClient.post("/orders/checkout", { channel: i % 2 === 0 ? "ONLINE" : "POS", sku: "BAG-LTD-2026", locationId: "WH-HCM", qty: 1 })
  );
  const results = await Promise.allSettled(requests);
  const accepted = results.filter((r) => r.status === "fulfilled" && r.value.status === 200);

  expect(accepted.length).toBe(1); // chỉ đúng 1 giao dịch thắng
  const stock = await apiClient.get("/inventory/BAG-LTD-2026/WH-HCM");
  expect(stock.onHand - stock.reserved).toBeGreaterThanOrEqual(0);
});`),
      CODE("typescript", `// Ca 2: Đồng bộ bù sai thứ tự sau khi POS offline rồi online lại
test("đồng bộ bù theo đúng thứ tự timestamp, không ghi đè sự kiện mới hơn", async ({ apiClient }) => {
  // Giả lập 2 sự kiện xảy ra offline: bán rồi huỷ, gửi lên theo thứ tự SAI (huỷ trước, bán sau)
  await apiClient.post("/internal/test/offline-sync", {
    locationId: "STORE-12",
    events: [
      { type: "SALE_CANCELLED", sku: "SHOE-042", qty: 1, ts: "2026-07-06T10:01:00Z" },
      { type: "SALE", sku: "SHOE-042", qty: 1, ts: "2026-07-06T10:00:00Z" },
    ],
  });
  const stock = await apiClient.get("/inventory/SHOE-042/STORE-12");
  // Oracle: hệ thống phải sắp lại theo ts, kết quả cuối = trạng thái trước khi bán (huỷ thắng vì ts sau)
  expect(stock.onHand).toBe(stock.onHandBeforeTest);
});`),
      CODE("typescript", `// Ca 3: Hoàn hàng 1 phần sau khi điểm loyalty đã dùng để đổi quà
test("hoàn 1 phần đơn phải trừ điểm tương ứng dù điểm đã dùng, tạo nợ điểm (negative balance) có kiểm soát", async ({ apiClient }) => {
  const order = await apiClient.post("/orders/checkout", { customerId: "cus-77", items: [{ sku: "A", price: 500000 }, { sku: "B", price: 500000 }] });
  await apiClient.post("/loyalty/redeem", { customerId: "cus-77", points: 100 }); // dùng hết điểm vừa cộng

  await apiClient.post(\`/orders/\${order.data.orderId}/return\`, { sku: "A", refundAmount: 500000 });

  const ledger = await apiClient.get("/loyalty/cus-77/balance");
  // Oracle: điểm bị trừ đúng tỉ lệ (50 điểm cho SKU A), có thể âm tạm thời nhưng phải có log rõ ràng
  expect(ledger.points).toBe(-50);
  expect(ledger.hasNegativeBalanceFlag).toBe(true);
});`),
      WARN("Đồng bộ bù (reconciliation sync) không được áp dụng theo thứ tự nhận được mà PHẢI theo thứ tự timestamp gốc tại nơi phát sinh — nếu không tồn kho có thể sai tạm thời và tự sửa sai vào lần đồng bộ kế tiếp, gây khó debug.", "Reconciliation sync must not apply events in arrival order but MUST apply them in original timestamp order at the point of origin — otherwise stock can be temporarily wrong and silently self-correct on the next sync, making debugging hard.", "補完同期は到着順ではなく、発生元での元のタイムスタンプ順で適用しなければなりません。そうしないと在庫が一時的に誤った状態になり、次回の同期で静かに自己修正されてしまい、デバッグが困難になります。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm / batch / đối soát", en: "10. Post-checks / batch / reconciliation", ja: "10. 事後検証・バッチ・突合" },
    blocks: [
      P(
        "Ngoài kiểm thử theo giao dịch đơn lẻ, hệ thống cần một batch đối soát tồn kho chạy mỗi 6 giờ để so khớp Σ onHand toàn hệ thống của mỗi SKU với số liệu kiểm kê vật lý gần nhất (cycle count) tại từng cửa hàng, và so khớp tổng điểm loyalty đã cộng/trừ với tổng giá trị giao dịch thực trong ngày. Sai lệch trên ngưỡng cho phép (ví dụ 0.5% số lượng) phải sinh cảnh báo tới kênh Slack #retail-ops-alerts kèm danh sách SKU và location nghi vấn.",
        "Beyond single-transaction testing, the system needs an inventory reconciliation batch running every 6 hours to match each SKU's system-wide Σ onHand against the latest physical cycle count at each store, and to match total loyalty points credited/debited against the day's actual transaction value. Discrepancies beyond an allowed threshold (e.g. 0.5% of quantity) must trigger an alert to the #retail-ops-alerts Slack channel with the suspect SKU and location list.",
        "単一トランザクションのテストに加え、各SKUのシステム全体のΣonHandを各店舗の最新の実地棚卸（サイクルカウント）と照合し、付与・減算されたロイヤルティポイント合計をその日の実際の取引額と照合する在庫対査バッチを6時間ごとに実行する必要があります。許容閾値（例：数量の0.5%）を超える差異があれば、疑わしいSKUと拠点のリストとともに#retail-ops-alertsのSlackチャンネルへアラートを送信する必要があります。"
      ),
      CODE("sql", `-- Query đối soát: tồn kho hệ thống vs kiểm kê vật lý gần nhất
SELECT
  s.sku,
  SUM(s.on_hand) AS system_total,
  cc.counted_total,
  SUM(s.on_hand) - cc.counted_total AS diff
FROM stock_level s
JOIN (
  SELECT sku, SUM(counted_qty) AS counted_total
  FROM cycle_count
  WHERE counted_at >= NOW() - INTERVAL '6 hours'
  GROUP BY sku
) cc ON cc.sku = s.sku
GROUP BY s.sku, cc.counted_total
HAVING ABS(SUM(s.on_hand) - cc.counted_total) > 0.005 * cc.counted_total;`),
      NOTE("Batch đối soát nên tách riêng luồng ghi cảnh báo và luồng tự động điều chỉnh — không nên tự động sửa tồn kho hệ thống mà không có xác nhận thủ công của quản lý kho.", "The reconciliation batch should separate alerting from auto-adjustment — it should never auto-correct system stock without manual warehouse-manager confirmation.", "対査バッチはアラート発行と自動調整のフローを分離すべきです。倉庫管理者による手動確認なしに、システム在庫を自動的に修正してはいけません。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD & giám sát", en: "11. CI/CD & monitoring", ja: "11. CI/CDと監視" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit test cho Inventory Hub/Loyalty (dưới 2 phút), API/integration test với testcontainers Postgres + mock POS offline (dưới 10 phút), và E2E Playwright chia shard 3 luồng trên staging (dưới 15 phút). Gate release yêu cầu toàn bộ 3 tầng pass, không ca nào flaky quá 2 lần trong 10 lần chạy gần nhất, và báo cáo test khối lượng 72 giờ không phát hiện oversell nào trước khi merge vào nhánh release.",
        "The CI pipeline runs 3 parallel tiers: Inventory Hub/Loyalty unit tests (under 2 minutes), API/integration tests with Postgres testcontainers + offline-POS mock (under 10 minutes), and Playwright E2E sharded across 3 workers on staging (under 15 minutes). The release gate requires all 3 tiers to pass, no case flagged flaky more than twice in the last 10 runs, and a 72-hour volume test report showing zero oversell before merging to the release branch.",
        "CIパイプラインは3層を並行実行します：在庫ハブ・ロイヤルティのユニットテスト（2分未満）、Postgres testcontainers＋オフラインPOSモックによるAPI/結合テスト（10分未満）、ステージング環境で3ワーカーにシャーディングされたPlaywright E2E（15分未満）。リリースゲートは3層すべての合格、直近10回の実行でフレークと判定された回数が2回以下であること、そしてリリースブランチへのマージ前に72時間の量的テストでオーバーセルがゼロであることを要求します。"
      ),
      CODE("yaml", `name: retail-omnichannel-pipeline
on: [pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:unit:inventory -- --coverage
  integration:
    needs: unit
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:15, ports: ["5432:5432"] }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration -- --shard=1/1
  e2e:
    needs: integration
    strategy:
      matrix: { shard: [1, 2, 3] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --shard=\${{ matrix.shard }}/3
      - run: npm run flaky:report`),
      TIP("Gắn dashboard theo dõi số lần cache tồn kho trả 'còn hàng' sai trong 1 giờ — nếu vượt ngưỡng, cảnh báo trước khi khách đặt hàng thất bại hàng loạt.", "Attach a dashboard tracking how many times the inventory cache incorrectly returns 'in stock' within an hour — alert before customers experience mass checkout failures.", "在庫キャッシュが1時間以内に誤って「在庫あり」を返した回数を追跡するダッシュボードを設定してください。閾値を超えた場合、顧客の注文が大量に失敗する前にアラートを出します。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent hỗ trợ sinh ma trận ca kiểm thử cho tổ hợp kênh mua × kênh trả bằng cách đọc cấu hình các location đang hoạt động và tự liệt kê các cặp tổ hợp mà QA thường bỏ sót, ví dụ mua tại cửa hàng A, đổi tại cửa hàng B khác tỉnh. Agent cũng có thể phân tích log đối soát tồn kho hàng tuần để phát hiện SKU/location có xu hướng lệch tăng dần theo thời gian, gợi ý ưu tiên điều tra trước khi lệch tích luỹ đủ lớn để ảnh hưởng tài chính.",
        "An AI agent helps generate the test-case matrix for purchase-channel x return-channel combinations by reading the configuration of active locations and automatically listing combination pairs QA often misses, such as buying at store A and exchanging at store B in a different province. The agent can also analyze weekly stock-reconciliation logs to detect SKU/location pairs trending toward growing drift over time, suggesting investigation priority before the drift accumulates enough to cause financial impact.",
        "AIエージェントは、稼働中の拠点設定を読み取り、QAが見落としがちな組み合わせペア（例えば店舗Aで購入し、別の省の店舗Bで交換するケース）を自動的に列挙することで、購入チャネル×返品チャネルの組み合わせのテストケースマトリクス生成を支援します。エージェントはまた、週次の在庫対査ログを分析し、時間の経過とともにずれが拡大傾向にあるSKU・拠点の組み合わせを検出し、財務的影響を及ぼすほどずれが蓄積する前に調査の優先順位を提案できます。"
      ),
      P(
        "Ranh giới trách nhiệm: AI agent được phép đề xuất ca kiểm thử mới, tóm tắt log đối soát, và soạn draft báo cáo lệch tồn kho, nhưng con người luôn phải xác nhận trước khi thực hiện điều chỉnh tồn kho hệ thống hoặc cộng/trừ điểm loyalty thủ công cho khách. Agent không được cấp quyền tự động ghi đè StockLevel hoặc LoyaltyLedger production dựa trên suy luận của nó, để tránh rủi ro hallucination gây sai lệch dữ liệu tài chính-khách hàng.",
        "Responsibility boundaries: the AI agent may propose new test cases, summarize reconciliation logs, and draft stock-discrepancy reports, but a human must always confirm before adjusting system stock or manually crediting/debiting a customer's loyalty points. The agent must never be granted permission to auto-overwrite production StockLevel or LoyaltyLedger records based on its own inference, to avoid hallucination risk corrupting financial-customer data.",
        "責任範囲：AIエージェントは新しいテストケースの提案、対査ログの要約、在庫差異レポートの草案作成を行うことができますが、システム在庫の調整や顧客のロイヤルティポイントの手動加減算を実行する前には、必ず人間が確認する必要があります。エージェントは、ハルシネーションのリスクにより財務・顧客データが破損することを避けるため、自らの推論に基づいて本番のStockLevelやLoyaltyLedgerを自動的に上書きする権限を絶対に与えられてはなりません。"
      ),
      NOTE("Log prompt và output của AI agent nên được lưu lại kèm báo cáo lệch tồn kho được tạo ra, phục vụ truy vết khi kiểm toán nội bộ yêu cầu giải trình.", "AI agent prompts and outputs should be logged alongside generated discrepancy reports, for traceability when internal audit requires explanation.", "内部監査で説明が求められた際の追跡性のため、AIエージェントのプロンプトと出力は生成された差異レポートとともにログ保存すべきです。"),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao thiết kế test case cho tính năng bán hàng đồng thời trên nhiều kênh khi tồn kho gần cạn?",
        "How would you design test cases for simultaneous multi-channel selling when stock is nearly depleted?",
        "Tôi xác định bất biến cần giữ là available-to-sell không âm, sau đó thiết kế ca gửi N request đồng thời (concurrency test) vào cùng 1 SKU/location với tồn kho rất thấp (1-2 đơn vị) để buộc hệ thống lộ race condition nếu có. Oracle là số giao dịch được chấp nhận phải đúng bằng tồn kho ban đầu, không hơn.",
        "I'd identify the invariant to preserve as available-to-sell never going negative, then design a concurrency test sending N simultaneous requests against the same SKU/location with very low stock (1-2 units) to force any race condition to surface. The oracle is that the number of accepted transactions must exactly equal the starting stock, no more.",
        "在庫がほぼ枯渇している状況でのマルチチャネル同時販売機能のテストケースをどう設計しますか？",
        "私は、維持すべき不変条件を「販売可能在庫が負にならないこと」と特定し、非常に低い在庫（1〜2個）の同一SKU・拠点に対してN件の同時リクエストを送る並行テストを設計し、レースコンディションがあれば必ず顕在化させます。オラクルは、受理された取引数が開始時の在庫数と正確に一致し、それを超えないことです。"
      ),
      QA(
        "Nếu phát hiện tồn kho hệ thống lệch so với kiểm kê thực tế tại 1 cửa hàng, bạn điều tra thế nào?",
        "If you discover system stock is off from the physical cycle count at one store, how would you investigate?",
        "Trước hết tôi kéo log StockTransfer/ReturnExchange/Sale trong khoảng thời gian nghi vấn theo location đó, so khớp thứ tự timestamp với các sự kiện đồng bộ bù nếu cửa hàng từng offline, và kiểm tra xem có event nào bị double-apply hoặc bị bỏ sót. Sau đó tôi viết test tái hiện đúng chuỗi sự kiện đó trước khi đề xuất fix.",
        "First I'd pull StockTransfer/ReturnExchange/Sale logs for that location during the suspect window, cross-check timestamp order against any reconciliation-sync events if the store had been offline, and check for any event double-applied or missed. Then I'd write a test reproducing that exact event sequence before proposing a fix.",
        "1店舗でシステム在庫と実際の棚卸結果にずれがあることを発見した場合、どのように調査しますか？",
        "まず、疑わしい期間のその拠点のStockTransfer/ReturnExchange/Saleのログを取得し、店舗がオフラインだった場合は補完同期イベントとタイムスタンプの順序を照合し、二重適用または見落とされたイベントがないか確認します。次に、修正案を提案する前に、そのイベント順序を正確に再現するテストを作成します。"
      ),
      QA(
        "Điểm loyalty nên được cộng lúc thanh toán hay lúc giao dịch hoàn tất không thể huỷ (ví dụ hết hạn đổi trả)?",
        "Should loyalty points be credited at payment time or once the transaction is finalized beyond return window?",
        "Về mặt trải nghiệm, điểm nên hiển thị ngay lúc thanh toán để khách thấy phản hồi tức thì, nhưng về mặt oracle kiểm thử, điểm phải ở trạng thái 'tạm tính' (pending) cho đến khi qua thời hạn đổi trả, sau đó mới chuyển sang 'đã xác nhận' (confirmed) và không thể bị điều chỉnh ngược trừ trường hợp gian lận. Test phải phủ cả 2 trạng thái và đường chuyển đổi giữa chúng.",
        "For UX, points should display immediately at payment for instant feedback, but for the test oracle, points should sit in a 'pending' state until the return window passes, then transition to 'confirmed' and become non-adjustable except in fraud cases. Tests must cover both states and the transition path between them.",
        "ロイヤルティポイントは決済時に付与すべきか、それとも返品期限を過ぎて取引が確定した後に付与すべきですか？",
        "UXの観点では、顧客に即座のフィードバックを与えるため決済時にすぐポイントを表示すべきですが、テストオラクルの観点では、返品期限を過ぎるまでポイントは「仮計上（pending）」状態にあるべきで、その後「確定（confirmed）」に遷移し、不正の場合を除いて遡って調整されるべきではありません。テストはこの2つの状態とその間の遷移パスの両方をカバーする必要があります。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Giả sử trong đợt sale flash, một SKU giới hạn hiển thị 'còn hàng' tại 8 cửa hàng dù kho trung tâm chỉ còn 2 chiếc, dẫn đến 15 đơn được xác nhận. Bạn sẽ viết báo cáo bug thế nào và đề xuất mitigation tạm thời trong lúc chờ fix triệt để cache tồn kho?",
        "Suppose during a flash sale, a limited SKU shows 'in stock' at 8 stores while the central warehouse only has 2 units left, resulting in 15 confirmed orders. How would you write the bug report and propose a temporary mitigation while waiting for a permanent fix to the inventory cache?",
        "面接シナリオ",
        "フラッシュセール中に、ある限定SKUが中央倉庫に在庫2個しか残っていないにもかかわらず8店舗で「在庫あり」と表示され、15件の注文が確定してしまったとします。バグレポートをどのように書き、在庫キャッシュの恒久修正を待つ間の一時的な緩和策をどう提案しますか？"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き渡しチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi qua toàn bộ vòng đời kiểm thử cho bài toán đồng bộ tồn kho omnichannel, hoàn/đổi liên kênh, và tích điểm loyalty của một chuỗi bán lẻ thực tế, từ bối cảnh kinh doanh, kiến trúc, bất biến dữ liệu, đến automation, ca lỗi chuyên sâu, CI/CD, và tích hợp AI. Điểm cốt lõi xuyên suốt là oracle-first: mọi assertion đều bám vào công thức available-to-sell, bảo toàn số lượng khi transfer, và quy tắc điểm loyalty theo giá trị giao dịch thực, thay vì chuỗi hiển thị UI, giúp bộ test bền vững và phát hiện đúng lỗi oversell nghiêm trọng.",
        "This article has walked through the full testing lifecycle for a real-world retail chain's omnichannel inventory synchronization, cross-channel return/exchange, and loyalty point problem, from business context and architecture to data invariants, automation, deep failure cases, CI/CD, and AI integration. The throughline is oracle-first testing: every assertion anchors to the available-to-sell formula, quantity conservation during transfers, and loyalty-point rules based on actual transaction value, rather than UI display strings, keeping the test suite resilient and reliably catching serious oversell defects.",
        "本稿では、実際の小売チェーンにおけるオムニチャネル在庫同期、チャネル横断の返品・交換、ロイヤルティポイントの課題について、事業背景・アーキテクチャからデータ不変条件、自動化、高度な異常系、CI/CD、AI統合まで、テストのライフサイクル全体を解説しました。一貫した核心はオラクルファーストであることです。すべてのアサーションはUI表示文字列ではなく、販売可能在庫の計算式、移動時の数量保存、実際の取引額に基づくロイヤルティポイントのルールに基づいており、テストスイートの堅牢性を保ちながら深刻なオーバーセルの不具合を確実に検出します。"
      ),
      UL(
        [
          "Đã xác định 5 bất biến nghiệp vụ làm oracle cho toàn bộ test suite",
          "Đã phủ 3 tầng kim tự tháp: unit công thức tồn kho/loyalty, integration transfer/return, E2E happy path",
          "Đã có ca đồng thời (race condition) và đồng bộ bù đúng thứ tự cho tồn kho đa kênh",
          "Đã gắn batch đối soát tồn kho và điểm loyalty làm lưới an toàn vận hành",
          "Đã xác định ranh giới AI agent: đề xuất/tóm tắt, không tự động ghi đè tồn kho/điểm khách hàng",
        ],
        [
          "Defined 5 business invariants as the oracle for the entire test suite",
          "Covered all 3 pyramid layers: unit stock/loyalty formulas, integration transfer/return, E2E happy path",
          "Added concurrency (race-condition) and correctly-ordered reconciliation-sync cases for multi-channel stock",
          "Wired in stock and loyalty-point reconciliation batches as an operational safety net",
          "Defined AI agent boundaries: propose/summarize only, never auto-overwrite customer stock/points",
        ],
        [
          "テストスイート全体のオラクルとして5つの業務不変条件を定義した",
          "ピラミッドの3層すべてをカバーした：在庫/ロイヤルティ計算式のユニット、移動・返品の結合、ハッピーパスのE2E",
          "マルチチャネル在庫に対する並行性（レースコンディション）と正しい順序の補完同期のケースを追加した",
          "在庫とロイヤルティポイントの対査バッチを運用上の安全網として組み込んだ",
          "AIエージェントの境界を定義した：提案・要約のみで、顧客の在庫・ポイントの自動上書きは行わない",
        ]
      ),
      TIP("Trước khi bàn giao, chạy lại toàn bộ ca P1 3 lần liên tiếp để xác nhận không flaky, và đính kèm báo cáo test khối lượng 72 giờ vào tài liệu release.", "Before handover, re-run all P1 cases 3 consecutive times to confirm they're not flaky, and attach the 72-hour volume test report to the release documentation.", "引き渡し前に、フレークでないことを確認するためP1ケースをすべて3回連続で再実行し、72時間の量的テストレポートをリリース資料に添付してください。"),
    ],
  },
];

const art2 = {
  categorySlug: "enterprise-realworld",
  slug: "retail-omnichannel-inventory-loyalty",
  cover: cover2,
  tags: tags("thucchien", "retail", "api", "playwright", "db", "realworld"),
  title: {
    vi: "Thực chiến: đồng bộ tồn kho omnichannel, hoàn/đổi & tích điểm loyalty trong bán lẻ",
    en: "Enterprise: omnichannel inventory sync, return/exchange & loyalty points in retail",
    ja: "実戦：小売におけるオムニチャネル在庫同期、返品・交換とロイヤルティポイント",
  },
  summary: {
    vi: "Bài sâu: bối cảnh, kiến trúc omnichannel đa kho, bất biến tồn kho/loyalty, test plan, ma trận ca, automation, race condition, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: context, multi-warehouse omnichannel architecture, stock/loyalty invariants, test plan, case matrix, automation, race conditions, reconciliation, CI, AI, interview.",
    ja: "詳細解説：背景、複数倉庫のオムニチャネルアーキテクチャ、在庫/ロイヤルティ不変条件、テスト計画、ケースマトリクス、自動化、レースコンディション、対査、CI、AI、面接。",
  },
  pages: buildDoc(pages2),
};

// ============================================================================================
// BÀI 3: CRM — vòng đời lead→deal, phát hiện trùng & merge bản ghi (dedup), phân quyền RBAC
// ============================================================================================

const cover3 = makeThumb({ id: "crm-dedup-03", domain: "crm", kind: "thucchien", label: "実戦 · DEDUP/RBAC" });

const svg3Arch = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#0c1220"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e0f2fe">Luồng Lead→Deal & Dedup/RBAC · Lead-to-deal & dedup/RBAC flow</text>
<g font-size="11" fill="#e0f2fe">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#111827" stroke="#38bdf8"/><text x="75" y="78" text-anchor="middle">Lead Capture</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#111827" stroke="#38bdf8"/><text x="215" y="78" text-anchor="middle">Dedup Engine</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#111827" stroke="#38bdf8"/><text x="355" y="78" text-anchor="middle">Lead/Deal Service</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#111827" stroke="#f59e0b"/><text x="495" y="78" text-anchor="middle">RBAC Gateway</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#111827" stroke="#34d399"/><text x="635" y="78" text-anchor="middle">Activity Timeline</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#93c5fd" stroke-width="2" marker-end="url(#a3)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#111827" stroke="#a78bfa"/><text x="215" y="158" text-anchor="middle">Merge Job</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#111827" stroke="#a78bfa"/><text x="355" y="158" text-anchor="middle">Team/Owner Tree</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#111827" stroke="#a78bfa"/><text x="495" y="158" text-anchor="middle">Audit Log</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130" stroke="#93c5fd" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="270" y="200" width="280" height="40" rx="8" fill="#052e2b" stroke="#34d399"/><text x="410" y="225" text-anchor="middle" fill="#6ee7b7">Bất biến: Merge không mất/nhân bản dữ liệu; RBAC đúng theo team/owner</text>
</g>
<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#93c5fd"/></marker></defs>
</svg>`;

const svg3Matrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#0c1220"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e0f2fe">Ma trận ca dedup/RBAC · Dedup/RBAC case matrix</text>
<g font-size="11" fill="#e0f2fe">
<rect x="20" y="44" width="700" height="30" fill="#111827"/>
<text x="30" y="64">Ca</text><text x="180" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Mức rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 Phát hiện trùng theo email/SĐT</text><text x="180" y="94">2 lead trùng email chuẩn hoá</text><text x="420" y="94">Hệ thống gắn cờ duplicate-candidate, không tự xoá</text><text x="620" y="94" fill="#f59e0b">Cao</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 Merge 2 lead có activity khác nhau</text><text x="180" y="124">Lead A có 3 note, lead B có 2 call log</text><text x="420" y="124">Bản ghi hợp nhất có đủ 5 hoạt động, không trùng</text><text x="620" y="154" fill="#ef4444">Rất cao</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 RBAC theo team</text><text x="180" y="154">User team A truy cập lead team B</text><text x="420" y="154">Từ chối 403, không rò rỉ dữ liệu qua API phụ</text><text x="620" y="184" fill="#ef4444">Rất cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 Chuyển trạng thái lead→deal</text><text x="180" y="184">Lead chưa qualify chuyển thẳng sang deal</text><text x="420" y="184">Bị chặn, chỉ QUALIFIED mới được convert</text><text x="620" y="124" fill="#34d399">TB</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Merge xung đột owner</text><text x="180" y="214">2 lead trùng nhưng khác owner</text><text x="420" y="214">Ưu tiên owner theo rule cấu hình, ghi log lựa chọn</text><text x="620" y="214" fill="#f59e0b">Cao</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Đổi owner ngoài team</text><text x="180" y="244">Reassign deal cho user không cùng team</text><text x="420" y="244">Yêu cầu quyền admin, có audit log</text><text x="620" y="244" fill="#34d399">TB</text>
</g>
</svg>`;

const pages3 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một công ty B2B SaaS trung bình có 220 nhân viên kinh doanh chia thành 18 team theo khu vực và ngành hàng, vận hành một hệ thống CRM nội bộ xử lý khoảng 12.000 lead mới mỗi tháng đến từ nhiều nguồn: form website, hội thảo, quảng cáo, giới thiệu từ đối tác, và nhập tay từ email. Vì lead đến từ nhiều kênh khác nhau, tình trạng trùng lặp (duplicate) rất phổ biến — cùng một khách hàng có thể được ghi nhận 2-3 lần với thông tin liên hệ hơi khác nhau (email viết hoa/thường, số điện thoại có/không mã vùng). Một công ty CRM tương tự từng mất một hợp đồng trị giá 1,8 tỷ đồng vì hai sales ở hai team khác nhau cùng liên hệ một khách hàng theo hai kịch bản giá khác nhau do dữ liệu lead bị trùng mà không ai biết, khiến khách hàng mất niềm tin và huỷ deal.",
        "A mid-sized B2B SaaS company with 220 sales reps split into 18 territory/industry teams runs an internal CRM handling roughly 12,000 new leads per month sourced from website forms, conferences, ads, partner referrals, and manual email entry. Because leads arrive through so many channels, duplication is extremely common — the same customer can be recorded 2-3 times with slightly different contact details (uppercase/lowercase email, phone number with/without area code). A similar CRM operation once lost a 1.8-billion-VND contract because two reps on different teams contacted the same customer with two different pricing scripts, caused by an undetected duplicate lead record, eroding trust and killing the deal.",
        "従業員220名の中規模B2B SaaS企業は、地域・業種別に18のチームに分かれた営業組織を持ち、社内CRMシステムでウェブサイトフォーム・カンファレンス・広告・パートナー紹介・手動メール入力など多様な経路から月間約1万2000件の新規リードを処理しています。リードが多くのチャネルから流入するため、重複（duplicate）は非常に一般的です。同じ顧客がメールアドレスの大文字小文字や電話番号の市外局番の有無などわずかに異なる連絡先情報で2〜3回記録されることがあります。類似のCRM運用では、重複したリードデータに誰も気づかなかったために、異なるチームの2人の営業担当が同じ顧客に異なる価格提案を行ってしまい、顧客の信頼を失い18億ドン相当の契約が破談になった事例があります。"
      ),
      P(
        "Phạm vi bài viết bao trùm 3 luồng nghiệp vụ chính: vòng đời lead→deal (capture, qualify, convert, close), phát hiện trùng lặp và merge bản ghi (name matching/dedup) theo nhiều tiêu chí (email chuẩn hoá, số điện thoại, tên công ty tương tự), và phân quyền truy cập (RBAC) theo cấu trúc team/owner để đảm bảo sales chỉ thấy và sửa được lead/deal mà mình hoặc team mình sở hữu, trừ vai trò quản lý cấp cao. Ràng buộc nghiệp vụ quan trọng: mọi thao tác merge phải được ghi log không thể chỉnh sửa (immutable audit trail) để phục vụ tra soát khi có tranh chấp giữa các team về quyền sở hữu khách hàng.",
        "The scope covers 3 core business flows: the lead-to-deal lifecycle (capture, qualify, convert, close), duplicate detection and record merge (name matching/dedup) across multiple criteria (normalized email, phone number, similar company name), and role-based access control (RBAC) by team/owner structure to ensure a rep only sees and edits leads/deals they or their team own, except for senior management roles. Key business constraint: every merge operation must be logged in an immutable audit trail to support investigation when teams dispute customer ownership.",
        "本稿の範囲は3つの主要業務フローをカバーします：リードからディールへのライフサイクル（獲得・見込み判定・転換・成約）、複数の基準（正規化されたメールアドレス、電話番号、類似する会社名）による重複検出とレコード統合（名寄せ/dedup）、そして上級管理職を除き、営業担当が自分またはチームが所有するリード・ディールのみを閲覧・編集できるようにするチーム・オーナー構造に基づくアクセス権限制御（RBAC）です。重要な業務制約として、チーム間で顧客の所有権について紛争が発生した際の調査に対応するため、すべてのマージ操作は改ざん不能な監査証跡（immutable audit trail）に記録されなければなりません。"
      ),
      IMG(svg3Arch, "Kiến trúc luồng Lead→Deal với Dedup Engine và RBAC Gateway", "Lead-to-deal architecture with Dedup Engine and RBAC Gateway", "Dedupエンジンと権限ゲートウェイを含むLead→Dealアーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho Dedup Engine: phát hiện trùng, gợi ý merge, thực thi merge", "Kiểm thử E2E Playwright cho luồng lead→deal và phân quyền theo vai trò", "Kiểm thử RBAC ở nhiều tầng: UI ẩn/hiện, API chặn, và truy vấn DB trực tiếp"],
        ["API testing for the Dedup Engine: duplicate detection, merge suggestion, merge execution", "Playwright E2E testing for the lead-to-deal flow and role-based permissions", "Multi-layer RBAC testing: UI show/hide, API blocking, and direct DB query checks"],
        ["名寄せエンジンのAPIテスト：重複検出、マージ提案、マージ実行", "リード→ディールフローとロール別権限のPlaywright E2Eテスト", "複数層でのRBACテスト：UI表示/非表示、APIブロック、DB直接クエリの確認"]
      ),
      NOTE("Bài này giả định hệ thống có test-only endpoint để seed lead/deal theo team/owner tuỳ ý và reset trạng thái merge giữa các lần chạy.", "This article assumes the system has test-only endpoints to seed leads/deals under arbitrary teams/owners and reset merge state between runs.", "本稿では、任意のチーム・オーナーでリード・ディールをシードし、実行間でマージ状態をリセットするテスト専用エンドポイントが存在することを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 thành phần chính: Lead Capture (nhận lead từ nhiều nguồn, chuẩn hoá dữ liệu đầu vào), Dedup Engine (so khớp mờ — fuzzy matching — trên email/số điện thoại/tên công ty để tìm ứng viên trùng lặp), Lead/Deal Service (quản lý vòng đời và máy trạng thái), RBAC Gateway (kiểm tra quyền tại mọi request dựa trên team/owner/vai trò), và Activity Timeline (lưu toàn bộ lịch sử tương tác: note, call log, email, task). Khi Dedup Engine phát hiện ứng viên trùng với độ tương đồng vượt ngưỡng cấu hình (ví dụ ≥ 85%), nó không tự động xoá mà tạo một 'merge suggestion' để nhân viên hoặc quản lý xác nhận thủ công trước khi Merge Job thực thi.",
        "The architecture has 5 core components: Lead Capture (ingests leads from multiple sources, normalizes input data), Dedup Engine (fuzzy matching on email/phone/company name to find duplicate candidates), Lead/Deal Service (lifecycle and state-machine management), RBAC Gateway (checks permission on every request based on team/owner/role), and Activity Timeline (stores the full interaction history: notes, call logs, emails, tasks). When the Dedup Engine finds a candidate whose similarity exceeds a configured threshold (e.g. ≥ 85%), it does not auto-delete — it creates a 'merge suggestion' for a rep or manager to confirm manually before the Merge Job executes.",
        "アーキテクチャは5つの主要コンポーネントで構成されます：リードキャプチャ（複数の経路からリードを取り込み、入力データを正規化）、名寄せエンジン（メール・電話番号・会社名に対するファジーマッチングで重複候補を検出）、リード/ディールサービス（ライフサイクルと状態機械の管理）、権限ゲートウェイ（チーム・オーナー・ロールに基づき、すべてのリクエストで権限を確認）、そしてアクティビティタイムライン（ノート・通話記録・メール・タスクといった対応履歴全体を保存）です。名寄せエンジンが設定された閾値（例：85%以上）を超える類似度の候補を検出しても自動削除は行わず、担当者または管理者が手動で確認した上でマージジョブが実行される「マージ提案」を作成します。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất là việc merge phải bảo toàn toàn bộ lịch sử hoạt động của cả hai bản ghi gốc — nếu lead A có 3 ghi chú và lead B có 2 cuộc gọi, bản ghi sau merge phải có đủ 5 mục, không mất và không nhân đôi khi merge được gọi lặp lại do lỗi mạng. Điểm khó thứ hai là RBAC không chỉ kiểm tra ở tầng UI (ẩn nút) mà phải chặn đúng ở tầng API và thậm chí ở tầng truy vấn dữ liệu, vì một lỗi RBAC bypass kinh điển là API trả về đủ trường dữ liệu dù UI đã ẩn, khiến người dùng có thể lấy dữ liệu qua devtools hoặc gọi API trực tiếp. Điểm khó thứ ba là chuyển trạng thái lead→deal phải theo đúng máy trạng thái hữu hạn, không cho phép nhảy cóc (ví dụ từ NEW thẳng sang WON) dù thông qua API nội bộ hay thao tác hàng loạt (bulk update).",
        "The trickiest part is that merge must preserve the full activity history of both original records — if lead A has 3 notes and lead B has 2 call logs, the post-merge record must contain all 5 entries, with nothing lost and nothing duplicated if merge is retried due to a network error. The second challenge is that RBAC must not only be checked at the UI layer (hiding a button) but must be correctly enforced at the API layer and even at the data-query layer, since a classic RBAC-bypass bug is an API returning full fields even when the UI hides them, letting a user extract data via devtools or a direct API call. The third challenge is that the lead-to-deal transition must strictly follow the finite state machine, disallowing skips (e.g. jumping straight from NEW to WON) whether via an internal API or a bulk update operation.",
        "最も難しいのは、マージが両方の元レコードのアクティビティ履歴を完全に保存しなければならない点です。リードAに3件のノート、リードBに2件の通話記録がある場合、マージ後のレコードにはこの5件すべてが含まれる必要があり、ネットワークエラーによりマージが再試行されても、欠落や重複が発生してはいけません。2つ目の難点は、RBACがUI層（ボタンの非表示）だけでなく、API層、さらにはデータクエリ層でも正しく強制されなければならない点です。典型的なRBACバイパスのバグは、UIでフィールドを隠していてもAPIが全フィールドを返してしまい、devtoolsやAPI直接呼び出しでユーザーがデータを取得できてしまうというものです。3つ目の難点は、リードからディールへの遷移が厳密に有限状態機械に従わなければならない点です。内部APIや一括更新（bulk update）を経由しても、NEWからWONへ直接遷移するような飛び越しは許されません。"
      ),
      SCEN(
        "Sự cố thực tế",
        "Real incident",
        "Một quý trước, đội vận hành phát hiện một sales viên ở team miền Bắc có thể xem được danh sách deal của team miền Nam qua endpoint export báo cáo (`/reports/export`), dù giao diện chính đã ẩn đúng theo RBAC. Điều tra cho thấy endpoint export được viết bởi một team khác và quên áp dụng middleware kiểm tra quyền theo team, chỉ kiểm tra người dùng đã đăng nhập chứ không kiểm tra phạm vi dữ liệu được phép truy cập.",
        "Last quarter, ops discovered a rep in the Northern team could view the Southern team's deal list via a report-export endpoint (`/reports/export`), even though the main UI correctly hid it per RBAC. Investigation found the export endpoint was written by a different team and forgot to apply the team-scoped permission middleware, only checking that the user was logged in rather than checking their data-access scope.",
        "実際のインシデント",
        "前四半期、運用チームは、北部チームの営業担当がレポートエクスポートのエンドポイント（`/reports/export`）経由で南部チームのディール一覧を閲覧できてしまうことを発見しました。メイン画面はRBACに従って正しく非表示にしていたにもかかわらずです。調査の結果、このエクスポートエンドポイントは別のチームが実装したもので、チーム単位の権限チェックミドルウェアの適用を忘れており、ログイン済みかどうかのみを確認し、アクセス可能なデータ範囲を確認していなかったことが判明しました。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến (oracle)", en: "3. Data model & invariants (oracle)", ja: "3. データモデルと不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm bảng Lead (id, email, phone, companyName, status, teamId, ownerId, createdAt), Deal (id, leadId, stage, amount, teamId, ownerId), MergeRecord (survivorId, mergedIds[], mergedBy, mergedAt, fieldResolution), Activity (id, entityId, type, content, createdAt), và Role (userId, teamId, scope: OWNER|TEAM|ADMIN). Trạng thái lead đi theo máy trạng thái hữu hạn: NEW → CONTACTED → QUALIFIED → CONVERTED (tạo Deal), và Deal đi theo OPEN → NEGOTIATION → WON|LOST — chỉ lead ở trạng thái QUALIFIED mới được phép convert sang Deal.",
        "The core data model includes Lead (id, email, phone, companyName, status, teamId, ownerId, createdAt), Deal (id, leadId, stage, amount, teamId, ownerId), MergeRecord (survivorId, mergedIds[], mergedBy, mergedAt, fieldResolution), Activity (id, entityId, type, content, createdAt), and Role (userId, teamId, scope: OWNER|TEAM|ADMIN). Lead status follows a finite state machine: NEW → CONTACTED → QUALIFIED → CONVERTED (creates a Deal), and Deal follows OPEN → NEGOTIATION → WON|LOST — only a QUALIFIED lead may convert to a Deal.",
        "コアデータモデルには、Lead（リード：id、email、phone、companyName、status、teamId、ownerId、createdAt）、Deal（ディール：id、leadId、stage、amount、teamId、ownerId）、MergeRecord（マージ記録：survivorId、mergedIds[]、mergedBy、mergedAt、fieldResolution）、Activity（活動履歴：id、entityId、type、content、createdAt）、およびRole（権限：userId、teamId、scope: OWNER|TEAM|ADMIN）が含まれます。リードのステータスは有限状態機械に従います：NEW → CONTACTED → QUALIFIED → CONVERTED（ディール作成）。ディールはOPEN → NEGOTIATION → WON|LOSTに従います。QUALIFIED状態のリードのみがディールへ転換可能です。"
      ),
      H("Bất biến nghiệp vụ bắt buộc (oracle)", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Bất biến 1: RBAC — user chỉ đọc/ghi được Lead/Deal có teamId thuộc phạm vi quyền của mình (OWNER: chỉ bản ghi của mình; TEAM: mọi bản ghi trong team; ADMIN: toàn hệ thống), tại mọi tầng (UI, API, query)",
          "Bất biến 2: merge không mất dữ liệu — tổng số Activity của bản ghi sống sót sau merge = tổng Activity của tất cả bản ghi gốc trước merge",
          "Bất biến 3: merge không nhân bản dữ liệu — không có Activity nào xuất hiện 2 lần trong bản ghi sau merge dù merge được gọi lại (idempotent theo mergeRequestId)",
          "Bất biến 4: mỗi leadId/dealId chỉ tồn tại đúng 1 trạng thái hiệu lực tại một thời điểm, và chuyển trạng thái chỉ được phép theo cạnh hợp lệ của state machine",
          "Bất biến 5: các bản ghi bị merge (mergedIds) phải chuyển sang trạng thái MERGED (không xoá cứng), giữ tham chiếu tới survivorId để truy vết lịch sử",
        ],
        [
          "Invariant 1: RBAC — a user may only read/write Leads/Deals whose teamId falls within their permission scope (OWNER: their own records only; TEAM: all records in their team; ADMIN: system-wide), enforced at every layer (UI, API, query)",
          "Invariant 2: merge must not lose data — total Activity count on the surviving record after merge equals the sum of Activity counts on all original records before merge",
          "Invariant 3: merge must not duplicate data — no Activity appears twice on the post-merge record even if merge is retried (idempotent by mergeRequestId)",
          "Invariant 4: each leadId/dealId has exactly one valid status at any time, and transitions are only allowed along valid state-machine edges",
          "Invariant 5: merged-away records (mergedIds) must transition to a MERGED status (never hard-deleted), retaining a reference to survivorId for history traceability",
        ],
        [
          "不変条件1：権限（RBAC）— ユーザーは自身の権限範囲に属するteamIdのLead/Dealのみ読み書きできる（OWNER：自分のレコードのみ、TEAM：チーム内の全レコード、ADMIN：システム全体）。これはUI・API・クエリのすべての層で強制される",
          "不変条件2：マージによるデータ損失なし — マージ後の生存レコードのActivity総数は、マージ前の全元レコードのActivity数の合計と等しい",
          "不変条件3：マージによるデータ重複なし — マージがリトライされても（mergeRequestIdによる冪等性）、マージ後のレコードに同一Activityが2回現れることはない",
          "不変条件4：各leadId/dealIdは、いかなる時点でも有効なステータスを1つだけ持ち、状態遷移は状態機械の有効な経路に沿ってのみ許可される",
          "不変条件5：マージで統合された側のレコード（mergedIds）はMERGEDステータスに遷移しなければならず（物理削除は禁止）、履歴追跡のためsurvivorIdへの参照を保持する",
        ]
      ),
      CODE("typescript", `// Oracle helper — dùng lại trong mọi test case liên quan merge/RBAC
export async function assertMergeNoDataLoss(beforeIds: string[], survivorId: string, api: ApiClient) {
  const beforeCounts = await Promise.all(beforeIds.map((id) => api.get(\`/internal/activities/\${id}/count\`)));
  const expectedTotal = beforeCounts.reduce((sum, c) => sum + c.total, 0);
  const after = await api.get(\`/internal/activities/\${survivorId}/count\`);
  expect(after.total).toBe(expectedTotal); // không mất, không nhân bản
}

export function assertRbacScope(record: { teamId: string }, user: { scope: string; teamId: string }) {
  if (user.scope === "OWNER") expect(record.teamId).toBe(user.teamId);
  if (user.scope === "TEAM") expect(record.teamId).toBe(user.teamId);
  // ADMIN: không giới hạn teamId
}`),
      TIP("Luôn assert số lượng Activity bằng tổng đếm được từ backend trước merge, không assert bằng cách đếm dòng hiển thị trên UI timeline — UI có thể phân trang hoặc lazy-load gây đếm thiếu giả tạo.", "Always assert Activity count against the backend total counted before merge, never by counting rows rendered in the UI timeline — the UI may paginate or lazy-load, causing a false undercount.", "Activity数は必ずマージ前にバックエンドで数えた合計値でアサーションしてください。UIタイムラインに表示された行数で数えてはいけません。UIはページネーションや遅延読み込みを行う場合があり、見かけ上の数え漏れを引き起こします。"),
    ],
  },
  {
    heading: { vi: "4. Rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Ma trận rủi ro xếp hạng: cao nhất là RBAC bypass qua API phụ (ảnh hưởng: rò rỉ dữ liệu khách hàng giữa các team, vi phạm hợp đồng bảo mật với khách hàng doanh nghiệp); tiếp theo là merge làm mất hoặc nhân bản Activity (ảnh hưởng: mất lịch sử tương tác, sales mất ngữ cảnh khi chăm sóc khách); rủi ro trung bình là chuyển trạng thái sai máy trạng thái qua thao tác hàng loạt; rủi ro thấp hơn là hiển thị sai badge 'duplicate' trên UI danh sách lead. Chiến lược kiểm thử áp dụng kim tự tháp: 50% unit test cho logic dedup matching và state machine, 35% integration/API test cho RBAC đa tầng và merge, 15% E2E Playwright cho luồng thao tác thực tế của sales theo từng vai trò.",
        "The risk matrix ranks: highest is RBAC bypass via a secondary API (impact: customer data leakage across teams, breach of enterprise-customer confidentiality agreements); next is merge losing or duplicating Activity records (impact: lost interaction history, reps losing context when servicing customers); medium risk is an invalid state transition via bulk update; lower risk is an incorrectly displayed 'duplicate' badge in the lead list UI. The test strategy follows a pyramid: 50% unit tests for dedup-matching logic and the state machine, 35% integration/API tests for multi-layer RBAC and merge, 15% E2E Playwright for realistic rep workflows per role.",
        "リスクマトリクスのランク付け：最高リスクは副次的なAPI経由でのRBACバイパス（影響：チーム間での顧客データ漏洩、企業顧客との機密保持契約違反）。次に、マージによるActivityの喪失または重複（影響：対応履歴の喪失、営業担当が顧客対応時のコンテキストを失う）。中リスクは一括更新による不正な状態遷移。より低いリスクは、リード一覧UIでの「重複」バッジの誤表示です。テスト戦略はピラミッド型を採用します：名寄せマッチングロジックと状態機械のユニットテスト50%、複数層RBACとマージの結合/APIテスト35%、ロールごとの実際の営業担当ワークフローのE2E Playwrightテスト15%。"
      ),
      H("Kim tự tháp kiểm thử áp dụng", "Applied test pyramid", "適用するテストピラミッド"),
      UL(
        ["Unit (50%): thuật toán fuzzy matching, ngưỡng similarity, cạnh hợp lệ của state machine", "Integration/API (35%): RBAC đa tầng (API + query), merge idempotent, chuyển trạng thái qua bulk update", "E2E (15%): happy path lead→deal theo vai trò sales, 2-3 kịch bản RBAC bypass và merge xung đột"],
        ["Unit (50%): fuzzy-matching algorithm, similarity threshold, valid state-machine edges", "Integration/API (35%): multi-layer RBAC (API + query), idempotent merge, bulk-update state transitions", "E2E (15%): role-based lead-to-deal happy path, 2-3 RBAC-bypass and merge-conflict scenarios"],
        ["ユニット（50%）：ファジーマッチングアルゴリズム、類似度閾値、状態機械の有効な遷移経路", "結合/API（35%）：複数層RBAC（API＋クエリ）、冪等なマージ、一括更新による状態遷移", "E2E（15%）：ロール別のリード→ディールハッピーパス、RBACバイパスとマージ競合のシナリオ2〜3件"]
      ),
      WARN("Không nên chỉ kiểm thử RBAC ở tầng UI — luôn thêm ca gọi thẳng API và truy vấn DB test-only để xác nhận dữ liệu thực sự bị chặn, không chỉ bị ẩn trên giao diện.", "Do not test RBAC at the UI layer alone — always add cases calling the API directly and querying the DB via test-only endpoints to confirm data is actually blocked, not just hidden in the interface.", "RBACをUI層だけでテストしてはいけません。データが画面上で隠されているだけでなく実際にブロックされていることを確認するため、APIを直接呼び出すケースやテスト専用エンドポイント経由のDBクエリを必ず追加してください。"),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi (in-scope: Lead/Deal Service, Dedup Engine, RBAC Gateway, Activity Timeline; out-of-scope: tích hợp email marketing bên thứ ba), tiêu chí bắt đầu (staging có dữ liệu seed ít nhất 3 team với user ở cả 3 scope OWNER/TEAM/ADMIN, cấu hình ngưỡng dedup mặc định), và tiêu chí kết thúc (100% ca P1/P2 pass, không còn bug Critical/High mở liên quan RBAC hoặc mất dữ liệu merge, độ phủ code Dedup Engine ≥ 85%). Môi trường kiểm thử dùng 3 tầng: dev (unit, mock toàn bộ), staging (integration với dữ liệu đa team thật), và pre-prod (dữ liệu ẩn danh hoá từ production để kiểm thử khối lượng merge).",
        "The test plan defines scope (in-scope: Lead/Deal Service, Dedup Engine, RBAC Gateway, Activity Timeline; out-of-scope: third-party email-marketing integration), entry criteria (staging seeded with at least 3 teams and users across all 3 scopes OWNER/TEAM/ADMIN, default dedup threshold configured), and exit criteria (100% P1/P2 cases pass, no open Critical/High bugs related to RBAC or merge data loss, Dedup Engine code coverage ≥ 85%). Testing uses 3 tiers: dev (unit, fully mocked), staging (integration with real multi-team data), and pre-prod (anonymized production data for merge volume testing).",
        "テスト計画では、範囲（対象：リード/ディールサービス、名寄せエンジン、権限ゲートウェイ、アクティビティタイムライン、対象外：サードパーティのメールマーケティング連携）、開始基準（OWNER/TEAM/ADMINの3つのスコープすべてのユーザーを含む少なくとも3チーム分のデータがシードされたステージング環境、デフォルトの名寄せ閾値の設定完了）、終了基準（P1/P2ケース100%合格、RBACまたはマージによるデータ損失に関するCritical/High未解決バグゼロ、名寄せエンジンのコードカバレッジ85%以上）を定義します。テスト環境は3層構成です：dev（ユニット、完全モック）、ステージング（実際のマルチチームデータとの結合）、プレプロダクション（本番データを匿名化したマージ量的テスト用）。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: duyệt test plan, ký exit criteria", "SDET: viết API/E2E automation, duy trì CI", "Backend dev: review thuật toán dedup và middleware RBAC", "Sales Ops SME: xác nhận quy tắc phân quyền theo team/owner và luật ưu tiên khi merge xung đột"],
        ["QA Lead: approves test plan, signs off exit criteria", "SDET: writes API/E2E automation, maintains CI", "Backend dev: reviews the dedup algorithm and RBAC middleware", "Sales Ops SME: confirms team/owner permission rules and merge-conflict priority rules"],
        ["QAリード：テスト計画を承認し、終了基準にサインオフする", "SDET：API/E2E自動化を作成し、CIを保守する", "バックエンド開発者：名寄せアルゴリズムとRBACミドルウェアをレビューする", "セールスオペレーションSME：チーム/オーナー別の権限ルールとマージ競合時の優先ルールを確認する"]
      ),
      NOTE("Chỉ số theo dõi hàng tuần: số ca RBAC test pass ổn định không flaky, tỉ lệ merge suggestion bị từ chối bởi con người (false positive rate của dedup engine), thời gian trung bình xử lý 1 merge xung đột owner.", "Weekly tracked metrics: number of RBAC test cases passing stably without flakiness, rate of merge suggestions rejected by humans (dedup engine false-positive rate), average time to resolve an owner merge conflict.", "週次で追跡する指標：フレークなく安定して合格するRBACテストケース数、人間により却下されたマージ提案の割合（名寄せエンジンの誤検知率）、オーナー競合マージ1件あたりの平均処理時間。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca sử dụng equivalence partitioning cho độ tương đồng dedup (dưới ngưỡng, đúng ngưỡng, trên ngưỡng), boundary value analysis cho số lượng Activity khi merge (0, 1, nhiều), và decision table cho tổ hợp scope RBAC (OWNER/TEAM/ADMIN) × loại thao tác (đọc, sửa, xoá, export). Mỗi ca được đặt tên theo chuẩn TC-<module>-<số>-<mô tả ngắn> và gắn oracle tương ứng trực tiếp trong test management tool để reviewer không cần đoán kỳ vọng.",
        "The case matrix uses equivalence partitioning for dedup similarity (below, at, above threshold), boundary value analysis for Activity count during merge (0, 1, many), and a decision table for RBAC-scope combinations (OWNER/TEAM/ADMIN) x operation type (read, edit, delete, export). Each case follows the TC-<module>-<number>-<short description> naming convention, tagged with its oracle directly in the test management tool so reviewers never have to guess the expectation.",
        "ケースマトリクスでは、名寄せの類似度に対する同値分割（閾値未満・閾値ちょうど・閾値超過）、マージ時のActivity数に対する境界値分析（0・1・複数）、そしてRBACスコープ（OWNER/TEAM/ADMIN）×操作種別（読取・編集・削除・エクスポート）の組み合わせに対するデシジョンテーブルを使用します。各ケースはTC-<モジュール>-<番号>-<短い説明>という命名規則に従い、レビュアーが期待値を推測しなくて済むよう、テスト管理ツール内で直接オラクルをタグ付けします。"
      ),
      IMG(svg3Matrix, "Ma trận ca kiểm thử dedup/RBAC với mức rủi ro và oracle tương ứng", "Dedup/RBAC test case matrix with risk level and corresponding oracle", "リスクレベルと対応オラクルを示す名寄せ/RBACテストケースマトリクス"),
      H("Ưu tiên chạy", "Run priority", "実行優先度"),
      UL(
        ["P1 (mỗi build): TC-01 phát hiện trùng, TC-02 merge không mất dữ liệu, TC-03 RBAC theo team", "P2 (nightly): TC-04 chuyển trạng thái lead→deal, TC-05 merge xung đột owner", "P3 (trước release): TC-06 đổi owner ngoài team, edge case merge 3+ bản ghi"],
        ["P1 (every build): TC-01 duplicate detection, TC-02 merge without data loss, TC-03 team-based RBAC", "P2 (nightly): TC-04 lead-to-deal transition, TC-05 owner merge conflict", "P3 (pre-release): TC-06 cross-team owner reassignment, 3+ record merge edge cases"],
        ["P1（毎ビルド実行）：TC-01重複検出、TC-02データ損失なしマージ、TC-03チーム別RBAC", "P2（夜間実行）：TC-04リード→ディール遷移、TC-05オーナー競合マージ", "P3（リリース前実行）：TC-06チーム外オーナー変更、3件以上のマージのエッジケース"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment setup", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Việc seed dữ liệu dùng test-only API `/internal/test/seed` để tạo lead/deal với teamId/ownerId tuỳ chỉnh và Activity kèm theo, tránh phụ thuộc vào dữ liệu sales thật trên production. Trước mỗi test suite, hook `beforeAll` gọi endpoint reset để xoá MergeRecord test cũ và đưa toàn bộ lead/deal test về trạng thái ban đầu, đảm bảo cô lập giữa các lần chạy CI song song. User test được seed sẵn ở cả 3 scope (OWNER, TEAM, ADMIN) trên ít nhất 2 team khác nhau để phủ đủ tổ hợp RBAC.",
        "Data seeding uses a test-only `/internal/test/seed` API to create leads/deals with custom teamId/ownerId plus accompanying Activity records, avoiding dependency on real production sales data. Before each test suite, a `beforeAll` hook calls a reset endpoint to delete stale MergeRecords and restore all test leads/deals to their initial state, ensuring isolation across parallel CI runs. Test users are pre-seeded across all 3 scopes (OWNER, TEAM, ADMIN) on at least 2 different teams to cover the full RBAC combination set.",
        "データシードには、実際の本番営業データへの依存を避けるため、テスト専用の`/internal/test/seed` APIを使用し、カスタムのteamId/ownerIdと付随するActivityを持つリード/ディールを作成します。各テストスイート実行前に、`beforeAll`フックがリセットエンドポイントを呼び出して古いMergeRecordを削除し、テスト用の全リード/ディールを初期状態に戻すことで、並行CI実行間の分離を確保します。テストユーザーは、RBACの組み合わせを網羅するため、少なくとも2つの異なるチームにまたがる3つのスコープ（OWNER、TEAM、ADMIN）すべてで事前にシードされます。"
      ),
      CODE("bash", `# Reset & seed dữ liệu lead/deal + user theo team trước khi chạy suite
curl -X POST https://staging.crm.internal/internal/test/reset \\
  -H "X-Test-Key: $TEST_API_KEY"

curl -X POST https://staging.crm.internal/internal/test/seed/lead \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "contact@acme.vn",
    "phone": "0901234567",
    "companyName": "ACME Corp",
    "teamId": "team-north",
    "ownerId": "user-rep-01",
    "activities": [{ "type": "NOTE", "content": "Gọi lần 1" }]
  }'`),
      TIP("Seed 2 lead gần trùng (email khác hoa/thường, số điện thoại có/không mã vùng) ngay từ đầu để test dedup detection mà không cần chờ dữ liệu thật trôi vào theo thời gian.", "Seed 2 near-duplicate leads (email differing in case, phone number with/without area code) upfront so dedup detection can be tested without waiting for real data to drift in over time.", "実データが時間の経過とともに流入するのを待たずに名寄せ検出をテストできるよう、最初から準重複の2件のリード（大文字小文字の異なるメール、市外局番の有無が異なる電話番号）をシードしてください。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright kết hợp Page Object Model: LeadListPage, LeadDetailPage, MergeReviewPage, cùng fixture apiClient để gọi thẳng API xác minh dữ liệu backend song song với kiểm tra UI. Assertion cuối cùng không dừng ở việc thấy dialog 'Merge thành công' mà gọi API `/leads/:id/activities` để xác minh đúng bất biến không mất/nhân bản dữ liệu đã trình bày ở chương 3, và gọi lại API với token của user khác team để xác nhận RBAC vẫn chặn đúng sau merge.",
        "Happy-path automation uses Playwright with the Page Object Model: LeadListPage, LeadDetailPage, MergeReviewPage, plus an apiClient fixture to call the API directly and verify backend state alongside UI checks. The final assertion doesn't stop at seeing a 'Merge successful' dialog — it calls the `/leads/:id/activities` API to verify the no-loss/no-duplication invariant from chapter 3, and re-calls the API with a different team's user token to confirm RBAC still correctly blocks access after the merge.",
        "ハッピーパス自動化には、Playwrightとページオブジェクトモデル（LeadListPage、LeadDetailPage、MergeReviewPage）を使用し、UIチェックと並行してバックエンド状態を直接検証するapiClientフィクスチャを併用します。最終アサーションは「マージ成功」のダイアログを見て終わりにするのではなく、`/leads/:id/activities` APIを呼び出して第3章の損失なし/重複なしの不変条件を検証し、さらに別チームのユーザートークンで再度APIを呼び出して、マージ後もRBACが正しくアクセスをブロックし続けることを確認します。"
      ),
      CODE("typescript", `import { test, expect } from "./fixtures";
import { LeadListPage, MergeReviewPage } from "./pages";

test("merge 2 lead trùng giữ đủ activity, oracle qua API", async ({ page, apiClient }) => {
  const list = new LeadListPage(page);
  await list.gotoAsUser("user-rep-01"); // scope TEAM tại team-north

  const suggestion = await list.openDuplicateSuggestion("ACME Corp");
  const review = new MergeReviewPage(page);
  const survivorId = await review.confirmMerge(suggestion);

  // Oracle: verify qua API, không phải qua text UI
  const activities = await apiClient.get(\`/leads/\${survivorId}/activities\`);
  expect(activities.length).toBe(5); // 3 note + 2 call log từ 2 bản ghi gốc
  const uniqueIds = new Set(activities.map((a: any) => a.id));
  expect(uniqueIds.size).toBe(activities.length); // không nhân bản
});`),
      CODE("typescript", `// API-level test cho RBAC: user scope TEAM không đọc được lead của team khác
test("user team-north bị chặn khi đọc lead thuộc team-south", async ({ apiClient }) => {
  const res = await apiClient.get("/leads/lead-south-001", {
    headers: { Authorization: "Bearer <token-user-team-north>" },
  });
  expect(res.status).toBe(403);
});`),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Bốn nhóm ca lỗi trọng tâm của bài toán CRM dedup/RBAC là: merge bị gọi lặp (do retry mạng) làm nhân bản Activity nếu thiếu idempotency key, RBAC bị bypass qua endpoint phụ (export/report/webhook) không áp middleware kiểm tra team, chuyển trạng thái lead→deal nhảy cóc qua thao tác bulk update bỏ qua state machine, và merge xung đột owner khi 2 lead trùng nhưng thuộc 2 owner khác nhau cần luật ưu tiên rõ ràng thay vì chọn ngẫu nhiên bản ghi mới nhất.",
        "Four focal failure groups for this CRM dedup/RBAC problem are: merge retried due to network issues causing duplicated Activity records if idempotency keys are missing, RBAC bypassed through secondary endpoints (export/report/webhook) that lack team-permission middleware, lead-to-deal transitions skipping states via bulk-update operations that bypass the state machine, and owner merge conflicts when two duplicate leads belong to different owners and require an explicit priority rule rather than arbitrarily picking the most recent record.",
        "このCRM名寄せ/RBACの課題における4つの主要な異常系グループは、冪等性キーがない場合にネットワークのリトライによりマージが再実行されActivityが重複するケース、チーム権限ミドルウェアを欠いた副次的なエンドポイント（エクスポート・レポート・webhook）経由でのRBACバイパス、状態機械を回避する一括更新操作によるリードからディールへの状態遷移の飛び越し、そして2つの重複リードが異なるオーナーに属する場合に最新レコードを無作為に選ぶのではなく明確な優先ルールが必要となるオーナー競合マージです。"
      ),
      CODE("typescript", `// Ca 1: Merge gọi lặp do retry mạng — không được nhân bản Activity
test("gửi trùng request merge với cùng mergeRequestId chỉ tạo kết quả 1 lần", async ({ apiClient }) => {
  const mergeReqId = "merge-" + Date.now();
  const payload = { survivorId: "lead-A", mergedIds: ["lead-B"] };

  const [r1, r2] = await Promise.all([
    apiClient.post("/leads/merge", payload, { headers: { "Idempotency-Key": mergeReqId } }),
    apiClient.post("/leads/merge", payload, { headers: { "Idempotency-Key": mergeReqId } }),
  ]);

  expect(r1.data.survivorId).toBe(r2.data.survivorId);
  const activities = await apiClient.get("/leads/lead-A/activities");
  const uniqueIds = new Set(activities.map((a: any) => a.id));
  expect(uniqueIds.size).toBe(activities.length); // không nhân bản dù gọi 2 lần
});`),
      CODE("typescript", `// Ca 2: RBAC bypass qua endpoint export — phải bị chặn giống endpoint chính
test("endpoint export báo cáo cũng phải áp RBAC theo team như API chính", async ({ apiClient }) => {
  const res = await apiClient.get("/reports/export?team=team-south", {
    headers: { Authorization: "Bearer <token-user-team-north>" },
  });
  expect(res.status).toBe(403); // không được để lọt qua endpoint phụ
});`),
      CODE("typescript", `// Ca 3: Bulk update không được nhảy cóc trạng thái lead->deal
test("bulk update không cho phép chuyển NEW thẳng sang CONVERTED", async ({ apiClient }) => {
  await apiClient.post("/internal/test/seed/lead", { id: "lead-new-01", status: "NEW", teamId: "team-north" });

  const res = await apiClient.post("/leads/bulk-update", {
    ids: ["lead-new-01"],
    status: "CONVERTED",
  });

  expect(res.status).toBe(422); // vi phạm state machine, phải bị từ chối
  const lead = await apiClient.get("/leads/lead-new-01");
  expect(lead.status).toBe("NEW"); // trạng thái không đổi
});`),
      CODE("typescript", `// Ca 4: Merge xung đột owner — phải theo luật ưu tiên cấu hình, có log lựa chọn
test("merge 2 lead khác owner phải chọn owner theo rule và ghi log", async ({ apiClient }) => {
  await apiClient.post("/internal/test/seed/lead", { id: "lead-C", ownerId: "user-senior", createdAt: "2026-01-01" });
  await apiClient.post("/internal/test/seed/lead", { id: "lead-D", ownerId: "user-junior", createdAt: "2026-06-01" });

  const res = await apiClient.post("/leads/merge", { survivorId: "lead-C", mergedIds: ["lead-D"] });

  // Oracle: rule cấu hình ưu tiên owner có thâm niên cao hơn, không phải "mới nhất thắng"
  expect(res.data.ownerId).toBe("user-senior");
  const mergeLog = await apiClient.get(\`/internal/merges/\${res.data.mergeId}\`);
  expect(mergeLog.fieldResolution.ownerId.reason).toBe("SENIOR_OWNER_PRIORITY");
});`),
      WARN("Không bao giờ hard-delete bản ghi bị merge — luôn chuyển sang trạng thái MERGED kèm tham chiếu survivorId, vì kiểm toán hoặc tranh chấp quyền sở hữu khách hàng có thể cần truy vết lại bản ghi gốc bất cứ lúc nào.", "Never hard-delete a merged-away record — always transition it to a MERGED status with a survivorId reference, since audits or customer-ownership disputes may require tracing back to the original record at any time.", "マージされた側のレコードを物理削除してはいけません。監査や顧客の所有権をめぐる紛争でいつでも元のレコードを追跡できるよう、必ずsurvivorIdへの参照を持つMERGEDステータスに遷移させてください。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm / batch / đối soát", en: "10. Post-checks / batch / reconciliation", ja: "10. 事後検証・バッチ・突合" },
    blocks: [
      P(
        "Ngoài kiểm thử theo giao dịch đơn lẻ, hệ thống cần một batch đối soát chạy hàng đêm để so khớp tổng số Activity của mọi bản ghi MERGED cộng với survivor tương ứng, xác nhận không có Activity nào bị mất hoặc trôi nổi không gắn entity (orphan record), và quét toàn bộ Lead/Deal để phát hiện bản ghi có teamId không khớp với bất kỳ team hợp lệ nào trong hệ thống (dấu hiệu RBAC dữ liệu bị hỏng do lỗi migration hoặc thao tác thủ công trên DB). Bất kỳ sai lệch nào đều phải sinh cảnh báo tới kênh Slack #crm-data-alerts kèm danh sách entityId nghi vấn để đội vận hành xử lý trong vòng 24 giờ theo SLA nội bộ.",
        "Beyond single-transaction testing, the system needs a nightly reconciliation batch to match the total Activity count across all MERGED records plus their corresponding survivor, confirm no Activity is lost or floating without an entity reference (an orphan record), and scan all Leads/Deals to detect records whose teamId doesn't match any valid team in the system (a sign of RBAC data corruption from a migration bug or manual DB operation). Any discrepancy must trigger an alert to the #crm-data-alerts Slack channel with the list of suspect entityIds for the ops team to resolve within a 24-hour internal SLA.",
        "単一トランザクションのテストに加え、すべてのMERGEDレコードと対応するsurvivorのActivity総数を照合し、Activityが失われたりエンティティに紐付かず浮遊した状態（孤立レコード）になっていないことを確認し、システム内のどの有効なチームとも一致しないteamIdを持つレコード（マイグレーションのバグや手動DB操作によるRBACデータ破損の兆候）を検出するため、全リード/ディールをスキャンする夜間対査バッチが必要です。差異があれば、疑わしいentityIdのリストとともに#crm-data-alertsのSlackチャンネルへアラートを送信し、運用チームが社内SLAである24時間以内に対応する必要があります。"
      ),
      CODE("sql", `-- Query đối soát: Activity trước merge (từ audit log) vs Activity thực tế trên survivor
SELECT
  mr.survivor_id,
  mr.merged_ids,
  (SELECT COUNT(*) FROM activity a WHERE a.entity_id = ANY(mr.merged_ids || ARRAY[mr.survivor_id])) AS expected_total,
  (SELECT COUNT(*) FROM activity a WHERE a.entity_id = mr.survivor_id) AS actual_survivor_total
FROM merge_record mr
WHERE mr.merged_at::date = CURRENT_DATE - INTERVAL '1 day'
HAVING (SELECT COUNT(*) FROM activity a WHERE a.entity_id = ANY(mr.merged_ids || ARRAY[mr.survivor_id]))
    <> (SELECT COUNT(*) FROM activity a WHERE a.entity_id = mr.survivor_id);`),
      NOTE("Batch đối soát nên tách riêng luồng phát cảnh báo và luồng tự động sửa dữ liệu — không nên tự động gộp lại Activity bị lệch mà không có xác nhận thủ công của Sales Ops, để tránh che giấu triệu chứng của lỗi gốc.", "The reconciliation batch should separate alerting from auto-repair — it should never auto-reconcile mismatched Activity without manual Sales Ops confirmation, to avoid masking the symptom of an underlying bug.", "対査バッチはアラート発行とデータ自動修正のフローを分離すべきです。根本的なバグの兆候を隠してしまわないよう、Sales Opsの手動確認なしにずれたActivityを自動的に統合してはいけません。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD & giám sát", en: "11. CI/CD & monitoring", ja: "11. CI/CDと監視" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit test cho dedup matching và state machine (dưới 2 phút), API/integration test với testcontainers Postgres phủ toàn bộ tổ hợp RBAC (dưới 10 phút), và E2E Playwright chia shard 3 luồng theo vai trò (OWNER/TEAM/ADMIN) trên staging (dưới 15 phút). Gate release yêu cầu toàn bộ 3 tầng pass, không ca RBAC nào bị skip hoặc flaky quá 1 lần trong 10 lần chạy gần nhất — nghiêm ngặt hơn ngưỡng flaky thông thường vì đây là lớp bảo vệ dữ liệu nhạy cảm.",
        "The CI pipeline runs 3 parallel tiers: dedup-matching and state-machine unit tests (under 2 minutes), API/integration tests with Postgres testcontainers covering the full RBAC combination set (under 10 minutes), and Playwright E2E sharded across 3 workers by role (OWNER/TEAM/ADMIN) on staging (under 15 minutes). The release gate requires all 3 tiers to pass, with no RBAC case skipped or flagged flaky more than once in the last 10 runs — stricter than the usual flaky threshold, since this layer protects sensitive data.",
        "CIパイプラインは3層を並行実行します：名寄せマッチングと状態機械のユニットテスト（2分未満）、RBACの全組み合わせをカバーするPostgres testcontainersによるAPI/結合テスト（10分未満）、ステージング環境でロール別（OWNER/TEAM/ADMIN）に3ワーカーにシャーディングされたPlaywright E2E（15分未満）。リリースゲートは3層すべての合格と、直近10回の実行でスキップまたはフレークと判定されたRBACケースが1回以下であることを要求します。これは機密データを保護する層であるため、通常のフレーク閾値より厳格です。"
      ),
      CODE("yaml", `name: crm-dedup-rbac-pipeline
on: [pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:unit:dedup -- --coverage
  integration:
    needs: unit
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:15, ports: ["5432:5432"] }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration:rbac -- --shard=1/1
  e2e:
    needs: integration
    strategy:
      matrix: { role: [owner, team, admin] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --grep @\${{ matrix.role }}
      - run: npm run flaky:report`),
      TIP("Gắn dashboard theo dõi số lần request 403 bất thường trong 1 giờ (dấu hiệu ai đó đang dò tìm lỗ hổng RBAC) và số merge suggestion bị từ chối liên tục bởi cùng 1 người dùng (dấu hiệu ngưỡng similarity cần điều chỉnh).", "Attach a dashboard tracking abnormal 403-response spikes within an hour (a sign someone is probing for RBAC gaps) and repeated merge-suggestion rejections by the same user (a sign the similarity threshold needs tuning).", "1時間以内の異常な403レスポンスの急増（誰かがRBACの穴を探っている兆候）と、同一ユーザーによる繰り返しのマージ提案却下（類似度閾値の調整が必要な兆候）を追跡するダッシュボードを設定してください。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent hỗ trợ sinh ma trận ca kiểm thử RBAC tự động bằng cách đọc cấu hình vai trò/team hiện có và liệt kê mọi tổ hợp scope × loại thao tác mà con người dễ bỏ sót, đặc biệt là các endpoint phụ ít được chú ý như export, webhook, hoặc báo cáo định kỳ. Agent cũng có thể được giao phân tích log merge suggestion bị từ chối để tìm mẫu hình (ví dụ ngưỡng similarity quá thấp gây nhiều false positive ở một ngành hàng cụ thể), giúp team đề xuất điều chỉnh cấu hình dedup mà không cần rà thủ công hàng nghìn bản ghi.",
        "An AI agent helps auto-generate the RBAC test-case matrix by reading the existing role/team configuration and listing every scope x operation-type combination that humans commonly miss, especially overlooked secondary endpoints like exports, webhooks, or scheduled reports. The agent can also be tasked with analyzing rejected merge-suggestion logs to find patterns (e.g. a similarity threshold set too low causing many false positives in a specific industry vertical), helping the team propose dedup configuration tuning without manually reviewing thousands of records.",
        "AIエージェントは、既存のロール・チーム設定を読み取り、人間が見落としがちなスコープ×操作種別のあらゆる組み合わせ、特にエクスポート・webhook・定期レポートといった見落とされがちな副次的エンドポイントを列挙することで、RBACテストケースマトリクスの自動生成を支援します。また、エージェントに却下されたマージ提案ログの分析を任せることで、パターン（例えば特定の業種で類似度閾値が低すぎて誤検知が多いこと）を発見し、数千件のレコードを手動で確認することなく名寄せ設定の調整をチームに提案できます。"
      ),
      P(
        "Ranh giới trách nhiệm rất rõ ràng: AI agent được phép đề xuất ca kiểm thử RBAC mới, tóm tắt mẫu hình merge bị từ chối, và soạn thảo bản nháp cấu hình ngưỡng dedup, nhưng con người luôn phải review và ký duyệt trước khi bất kỳ thay đổi nào liên quan phân quyền hoặc thực thi merge thật được đưa vào production. Agent tuyệt đối không được cấp quyền tự động thực thi merge hàng loạt hoặc thay đổi middleware RBAC mà không có con người review, để tránh rủi ro hallucination gây rò rỉ dữ liệu khách hàng giữa các team hoặc mất dữ liệu do merge sai.",
        "Responsibility boundaries are clear: the AI agent may propose new RBAC test cases, summarize rejected-merge patterns, and draft dedup-threshold configuration proposals, but a human must always review and sign off before any permission-related change or an actual merge execution reaches production. The agent must never be granted permission to auto-execute bulk merges or modify RBAC middleware without human review, to avoid hallucination risk leaking customer data across teams or losing data through an incorrect merge.",
        "責任範囲は明確です。AIエージェントは新しいRBACテストケースの提案、却下されたマージのパターン要約、名寄せ閾値設定案の草案作成を行うことができますが、権限に関わる変更や実際のマージ実行が本番環境に反映される前には、必ず人間がレビューし承認する必要があります。エージェントは、ハルシネーションのリスクによりチーム間で顧客データが漏洩したり、誤ったマージによりデータが失われたりすることを避けるため、人間のレビューなしに一括マージを自動実行したりRBACミドルウェアを変更したりする権限を絶対に与えられてはなりません。"
      ),
      NOTE("Log prompt và output của AI agent nên được lưu lại kèm cấu hình dedup hoặc ca test RBAC được tạo ra, phục vụ truy vết khi kiểm toán yêu cầu giải trình nguồn gốc thay đổi.", "AI agent prompts and outputs should be logged alongside generated dedup configurations or RBAC test cases, for traceability when an audit requires explaining a change's origin.", "監査で変更の出所説明が求められた際の追跡性のため、AIエージェントのプロンプトと出力は生成された名寄せ設定やRBACテストケースとともにログ保存すべきです。"),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao thiết kế test case cho tính năng merge 2 bản ghi khách hàng trùng lặp trong CRM?",
        "How would you design test cases for a feature that merges two duplicate customer records in a CRM?",
        "Tôi xác định trước bất biến cần giữ: không mất dữ liệu (tổng Activity trước = sau merge) và không nhân bản (idempotent theo mergeRequestId). Sau đó tôi thiết kế ca với các tổ hợp: 2 bản ghi có Activity khác nhau, có Activity trùng loại nhưng nội dung khác, và trường hợp gọi merge lặp do retry mạng. Oracle luôn là đếm chính xác từ backend, không phải đếm dòng hiển thị trên UI.",
        "I'd first identify the invariants to preserve: no data loss (total Activity before equals after merge) and no duplication (idempotent by mergeRequestId). Then I'd design cases covering: two records with different Activity, records with same-type but different-content Activity, and a case where merge is retried due to a network issue. The oracle is always an exact backend count, never counting rows rendered in the UI.",
        "CRMにおいて重複する2つの顧客レコードをマージする機能のテストケースをどう設計しますか？",
        "まず維持すべき不変条件を特定します：データ損失なし（マージ前後でActivity総数が等しい）と重複なし（mergeRequestIdによる冪等性）です。次に、Activityが異なる2つのレコード、種別は同じだが内容が異なるActivity、ネットワーク問題によりマージが再試行されるケースといった組み合わせを設計します。オラクルは常にバックエンドでの正確な件数であり、UIに表示された行数を数えることは決してありません。"
      ),
      QA(
        "Nếu phát hiện một API phụ (ví dụ export báo cáo) trả về dữ liệu vượt phạm vi RBAC, bạn điều tra và đề xuất fix thế nào?",
        "If you discover a secondary API (e.g. report export) returns data beyond the RBAC scope, how would you investigate and propose a fix?",
        "Trước hết tôi rà soát toàn bộ endpoint của hệ thống để tìm những endpoint không đi qua RBAC Gateway trung tâm (dấu hiệu team viết riêng và quên áp middleware). Tôi viết test case gọi thẳng endpoint đó với token của user ngoài phạm vi để xác nhận lỗi tái lập được. Đề xuất fix là bắt buộc mọi endpoint mới phải qua cùng middleware kiểm tra quyền, và thêm bước review kiến trúc (architecture review) cho endpoint truy xuất dữ liệu nhạy cảm trước khi merge code.",
        "First I'd audit all system endpoints to find ones that bypass the central RBAC Gateway (a sign a team wrote it separately and forgot the middleware). I'd write a test case calling that endpoint directly with an out-of-scope user's token to confirm the bug reproduces. My fix proposal would be to mandate that every new endpoint pass through the same permission middleware, plus add an architecture-review step for any endpoint touching sensitive data before merging code.",
        "副次的なAPI（例えばレポートエクスポート）がRBACの範囲を超えたデータを返すことを発見した場合、どのように調査し、修正を提案しますか？",
        "まず、システム内の全エンドポイントを精査し、中央のRBACゲートウェイを経由していないもの（あるチームが個別に実装しミドルウェアの適用を忘れた兆候）を探します。そのエンドポイントを範囲外のユーザーのトークンで直接呼び出すテストケースを書き、バグが再現することを確認します。修正提案としては、すべての新規エンドポイントが同じ権限ミドルウェアを必ず経由するよう義務付け、機密データにアクセスするエンドポイントについてはコードマージ前にアーキテクチャレビューの工程を追加することです。"
      ),
      QA(
        "Theo bạn, ai nên có quyền quyết định 'bản ghi nào sống sót' khi merge 2 lead trùng nhưng khác owner?",
        "In your view, who should decide 'which record survives' when merging two duplicate leads with different owners?",
        "Về mặt sản phẩm, cần một luật ưu tiên tường minh được cấu hình sẵn (ví dụ owner thâm niên hơn, hoặc lead có giá trị deal cao hơn thắng), không nên để hệ thống chọn ngẫu nhiên hoặc chỉ dựa vào 'bản ghi mới nhất'. Về mặt kiểm thử, mọi lựa chọn phải được ghi log kèm lý do (fieldResolution.reason) để khi có tranh chấp giữa 2 sales, đội vận hành có thể giải trình được quyết định hệ thống đã đưa ra, không phải đoán mò.",
        "From a product standpoint, there should be an explicit, pre-configured priority rule (e.g. the more senior owner wins, or the lead with the higher deal value wins) — the system should never pick randomly or simply default to 'most recent record.' From a testing standpoint, every choice must be logged with a reason (fieldResolution.reason) so that when two reps dispute ownership, ops can explain exactly what decision the system made, rather than guessing.",
        "あなたの考えでは、異なるオーナーを持つ2つの重複リードをマージする際、「どちらのレコードが生存するか」は誰が決めるべきですか？",
        "製品の観点では、明示的で事前設定された優先ルール（例えば、より経験豊富なオーナーが勝つ、またはディール金額の高いリードが勝つ）が必要であり、システムが無作為に選んだり単に「最新のレコード」をデフォルトにしたりすべきではありません。テストの観点では、2人の営業担当の間で所有権をめぐる紛争が発生した際に運用チームが推測ではなくシステムが下した決定を正確に説明できるよう、すべての選択に理由（fieldResolution.reason）を添えてログ記録しなければなりません。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Giả sử bạn phát hiện một sales viên team A có thể xem được deal của team B thông qua tính năng 'gợi ý khách hàng tương tự' (similar-customer suggestion) mới ra mắt, dù RBAC ở màn hình chính vẫn đúng. Bạn sẽ trình bày báo cáo bug thế nào và đề xuất kiểm tra bổ sung nào để đảm bảo không còn lỗ hổng tương tự ở các tính năng khác?",
        "Suppose you discover a rep on team A can view team B's deals through a newly launched 'similar-customer suggestion' feature, even though RBAC on the main screen is still correct. How would you write the bug report and what additional checks would you propose to ensure no similar gap exists in other features?",
        "面接シナリオ",
        "新しくリリースされた「類似顧客の提案」機能を通じて、チームAの営業担当がチームBのディールを閲覧できてしまうことを発見したとします。メイン画面のRBACは正しいままです。バグレポートをどのように書き、他の機能に同様の抜け穴がないことを確認するためにどのような追加チェックを提案しますか？"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き渡しチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi qua toàn bộ vòng đời kiểm thử cho bài toán vòng đời lead→deal, phát hiện trùng lặp/merge, và phân quyền RBAC theo team/owner của một hệ thống CRM thực tế, từ bối cảnh kinh doanh, kiến trúc, bất biến dữ liệu, đến automation, ca lỗi chuyên sâu, CI/CD, và tích hợp AI. Điểm cốt lõi xuyên suốt là oracle-first: mọi assertion đều bám vào bất biến RBAC theo scope, số lượng Activity đếm chính xác từ backend, và cạnh hợp lệ của state machine, thay vì chuỗi hiển thị UI hay giả định 'trông có vẻ đúng', giúp bộ test bền vững trước thay đổi giao diện và phát hiện đúng lỗi rò rỉ dữ liệu hoặc mất lịch sử khách hàng nghiêm trọng.",
        "This article has walked through the full testing lifecycle for a real-world CRM's lead-to-deal problem, duplicate detection/merge, and team/owner-based RBAC, from business context and architecture to data invariants, automation, deep failure cases, CI/CD, and AI integration. The throughline is oracle-first testing: every assertion anchors to the RBAC scope invariant, an exact backend Activity count, and valid state-machine edges, rather than UI display strings or a 'looks about right' assumption, keeping the test suite resilient to UI changes while reliably catching serious data-leak or customer-history-loss defects.",
        "本稿では、実際のCRMシステムにおけるリードからディールへのライフサイクル、重複検出・マージ、チーム/オーナー別のRBACの課題について、事業背景・アーキテクチャからデータ不変条件、自動化、高度な異常系、CI/CD、AI統合まで、テストのライフサイクル全体を解説しました。一貫した核心はオラクルファーストであることです。すべてのアサーションは、UI表示文字列や「見た目上は正しそう」という前提ではなく、RBACスコープの不変条件、バックエンドでの正確なActivity数、状態機械の有効な遷移経路に基づいており、UI変更に強く、深刻なデータ漏洩や顧客履歴喪失の不具合を確実に検出できるテストスイートを実現します。"
      ),
      UL(
        [
          "Đã xác định 5 bất biến nghiệp vụ làm oracle cho toàn bộ test suite (RBAC, merge không mất/nhân bản, state machine, giữ vết bản ghi bị merge)",
          "Đã phủ 3 tầng kim tự tháp: unit dedup matching/state machine, integration RBAC đa tầng/merge, E2E theo vai trò",
          "Đã có ca merge idempotent, RBAC bypass qua endpoint phụ, và merge xung đột owner",
          "Đã gắn batch đối soát hàng đêm làm lưới an toàn dữ liệu khách hàng",
          "Đã xác định ranh giới AI agent: đề xuất/tóm tắt, không tự động thực thi merge hoặc đổi RBAC",
        ],
        [
          "Defined 5 business invariants as the oracle for the entire test suite (RBAC, merge without loss/duplication, state machine, traceable merged records)",
          "Covered all 3 pyramid layers: unit dedup matching/state machine, integration multi-layer RBAC/merge, role-based E2E",
          "Added idempotent-merge, RBAC-bypass-via-secondary-endpoint, and owner-merge-conflict cases",
          "Wired in a nightly reconciliation batch as a customer-data safety net",
          "Defined AI agent boundaries: propose/summarize only, never auto-execute merges or change RBAC",
        ],
        [
          "テストスイート全体のオラクルとして5つの業務不変条件を定義した（RBAC、損失・重複のないマージ、状態機械、マージされたレコードの追跡可能性）",
          "ピラミッドの3層すべてをカバーした：名寄せマッチング/状態機械のユニット、複数層RBAC/マージの結合、ロール別E2E",
          "冪等なマージ、副次的エンドポイント経由のRBACバイパス、オーナー競合マージのケースを追加した",
          "夜間対査バッチを顧客データの安全網として組み込んだ",
          "AIエージェントの境界を定義した：提案・要約のみで、マージの自動実行やRBACの変更は行わない",
        ]
      ),
      TIP("Trước khi bàn giao, chạy lại toàn bộ ca P1 3 lần liên tiếp để xác nhận không flaky, và đính kèm báo cáo coverage của Dedup Engine cùng kết quả quét RBAC toàn hệ thống vào tài liệu release.", "Before handover, re-run all P1 cases 3 consecutive times to confirm they're not flaky, and attach the Dedup Engine coverage report along with the system-wide RBAC scan results to the release documentation.", "引き渡し前に、フレークでないことを確認するためP1ケースをすべて3回連続で再実行し、名寄せエンジンのカバレッジレポートとシステム全体のRBACスキャン結果をリリース資料に添付してください。"),
    ],
  },
];

const art3 = {
  categorySlug: "enterprise-realworld",
  slug: "crm-lead-dedup-merge-rbac",
  cover: cover3,
  tags: tags("thucchien", "crm", "api", "playwright", "db", "realworld"),
  title: {
    vi: "Thực chiến: vòng đời lead→deal, phát hiện trùng/merge & phân quyền RBAC trong CRM",
    en: "Enterprise: lead-to-deal lifecycle, duplicate detection/merge & RBAC in CRM",
    ja: "実戦：CRMにおけるリード→ディールのライフサイクル、重複検出・マージとRBAC",
  },
  summary: {
    vi: "Bài sâu: bối cảnh, kiến trúc dedup/RBAC, bất biến merge/quyền, test plan, ma trận ca, automation, race/bypass, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: context, dedup/RBAC architecture, merge/permission invariants, test plan, case matrix, automation, race/bypass cases, reconciliation, CI, AI, interview.",
    ja: "詳細解説：背景、名寄せ/RBACアーキテクチャ、マージ/権限の不変条件、テスト計画、ケースマトリクス、自動化、競合/バイパスケース、対査、CI、AI、面接。",
  },
  pages: buildDoc(pages3),
};

// ============================================================================================
// BÀI 4: ERP — Mua hàng đa cấp duyệt (PR→PO→GRN→Invoice), hạch toán GL & khoá kỳ kế toán
// ============================================================================================

const cover4 = makeThumb({ id: "erp-gl-04", domain: "erp", kind: "thucchien", label: "実戦 · GL CLOSE" });

const svg4Arch = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="280" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Luồng Procure-to-Pay & GL · Procure-to-Pay & GL flow</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="100" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="70" y="78" text-anchor="middle">PR (Yêu cầu mua)</text>
<rect x="150" y="50" width="100" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="200" y="78" text-anchor="middle">Duyệt PR</text>
<rect x="280" y="50" width="100" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="330" y="78" text-anchor="middle">PO (Đơn mua)</text>
<rect x="410" y="50" width="100" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="460" y="78" text-anchor="middle">GRN (Nhận hàng)</text>
<rect x="540" y="50" width="150" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="615" y="78" text-anchor="middle">Invoice (Hoá đơn)</text>
<path d="M120 73 H150 M250 73 H280 M380 73 H410 M510 73 H540" stroke="#94a3b8" stroke-width="2" marker-end="url(#a4)"/>
<rect x="150" y="130" width="100" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="200" y="152" text-anchor="middle" font-size="10">Approval Matrix</text><text x="200" y="166" text-anchor="middle" font-size="9">theo hạn mức</text>
<rect x="410" y="130" width="100" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="460" y="152" text-anchor="middle" font-size="10">3-Way Match</text><text x="460" y="166" text-anchor="middle" font-size="9">PO=GRN=Invoice</text>
<rect x="540" y="130" width="150" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="615" y="158" text-anchor="middle">General Ledger (GL)</text>
<path d="M200 96 V130 M460 96 V130 M615 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M510 153 H540" stroke="#94a3b8" stroke-width="2" marker-end="url(#a4)"/>
<rect x="280" y="210" width="410" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="485" y="236" text-anchor="middle" fill="#6ee7b7">Bất biến: Σ Nợ = Σ Có mọi bút toán · Khoá kỳ = không sửa/xoá chứng từ</text>
</g>
<defs><marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg4Matrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca duyệt & GL · Approval & GL case matrix</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="44" width="700" height="30" fill="#1e293b"/>
<text x="30" y="64">Ca</text><text x="170" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Mức rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 PO trong hạn mức cấp 1</text><text x="170" y="94">Giá trị 8tr, hạn mức trưởng nhóm 10tr</text><text x="420" y="94">Duyệt tự động ở cấp 1, không đẩy lên cấp 2</text><text x="620" y="94" fill="#34d399">TB</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 PO vượt hạn mức cấp 1</text><text x="170" y="124">Giá trị 50tr, hạn mức cấp 1 là 10tr</text><text x="420" y="124">Bắt buộc chuyển cấp 2 (GĐ tài chính)</text><text x="620" y="124" fill="#f59e0b">Cao</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 Tự duyệt (self-approval)</text><text x="170" y="154">Người tạo PR = người duyệt PO</text><text x="420" y="154">Từ chối, bắt buộc tách vai trò (SoD)</text><text x="620" y="154" fill="#ef4444">Rất cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 3-way match lệch giá</text><text x="170" y="184">Invoice cao hơn PO 5%</text><text x="420" y="184">Chặn thanh toán, sinh phiếu chờ xử lý</text><text x="620" y="184" fill="#f59e0b">Cao</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Bút toán mất cân đối</text><text x="170" y="214">Tổng Nợ ≠ Tổng Có do lỗi mapping</text><text x="420" y="214">Từ chối post, không ghi vào GL</text><text x="620" y="214" fill="#ef4444">Rất cao</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Sửa chứng từ sau khoá kỳ</text><text x="170" y="244">Kỳ 06/2026 đã khoá, sửa invoice tháng 6</text><text x="420" y="244">Từ chối ghi đè, bắt buộc bút toán điều chỉnh kỳ mới</text><text x="620" y="264" fill="#ef4444">Rất cao</text>
</g>
</svg>`;

const pages4 = [
  {
    heading: { vi: "1. Bối cảnh nghiệp vụ", en: "1. Business context", ja: "1. 業務背景" },
    blocks: [
      P(
        "Một tập đoàn sản xuất linh kiện điện tử có 12 nhà máy và hơn 40 phòng ban vận hành một hệ thống ERP tập trung để quản lý toàn bộ chuỗi mua hàng, từ khi nhân viên lập yêu cầu mua hàng (Purchase Requisition - PR) cho đến khi kế toán khoá sổ kỳ tài chính. Mỗi tháng hệ thống xử lý khoảng 25.000 đơn mua hàng (Purchase Order - PO) với tổng giá trị giao dịch dao động 800 tỷ đến 1.200 tỷ đồng, trải rộng từ mua nguyên vật liệu sản xuất, thiết bị văn phòng, đến dịch vụ bảo trì nhà máy. Vì giá trị giao dịch lớn và liên quan trực tiếp đến báo cáo tài chính hợp nhất phải nộp cho uỷ ban chứng khoán, bất kỳ lỗi nào trong quy trình duyệt mua hàng hoặc hạch toán sổ cái đều có thể dẫn đến sai lệch báo cáo tài chính, vi phạm kiểm soát nội bộ SOX (Sarbanes-Oxley), và trong trường hợp nghiêm trọng nhất là gian lận nội bộ không bị phát hiện.",
        "A manufacturing conglomerate producing electronic components operates 12 factories and more than 40 departments on a centralized ERP system managing the entire procurement chain, from an employee raising a Purchase Requisition (PR) through to the accounting team closing the financial period. Each month the system processes roughly 25,000 Purchase Orders (POs) with total transaction value ranging from 800 billion to 1.2 trillion VND, spanning raw materials, office equipment, and factory maintenance services. Because transaction volume is large and directly feeds the consolidated financial statements filed with the securities commission, any defect in the purchase-approval process or ledger posting can lead to misstated financials, violate SOX internal-control requirements, and in the worst case allow internal fraud to go undetected.",
        "電子部品を製造するある企業グループは、12の工場と40以上の部門を抱え、購買依頼（PR：Purchase Requisition）の起票から会計期間の締めに至るまで、購買プロセス全体を管理する統合ERPシステムを運用しています。同システムは毎月約2万5千件の発注（PO：Purchase Order）を処理し、取引総額は8,000億ドンから1兆2,000億ドンに及び、原材料の購入から事務用品、工場の保守サービスまで幅広くカバーしています。取引規模が大きく、証券委員会に提出する連結財務諸表に直接反映されるため、購買承認プロセスや総勘定元帳（GL）への計上に不具合があれば、財務諸表の虚偽記載につながり、SOX法（サーベンス・オクスリー法）の内部統制要件に違反し、最悪の場合は社内不正が発見されないまま放置される恐れがあります。"
      ),
      P(
        "Phạm vi bài viết bao trùm toàn bộ chuỗi Procure-to-Pay (P2P): PR → duyệt PR → PO → GRN (Goods Receipt Note - phiếu nhận hàng) → Invoice (hoá đơn nhà cung cấp) → 3-way match (đối chiếu 3 chiều PO-GRN-Invoice) → bút toán GL → khoá kỳ kế toán. Ràng buộc nghiệp vụ quan trọng nhất là ma trận duyệt theo hạn mức (approval matrix): mỗi cấp quản lý chỉ được duyệt PO trong một ngưỡng giá trị nhất định, vượt ngưỡng bắt buộc phải đẩy lên cấp cao hơn, và người lập yêu cầu tuyệt đối không được đồng thời là người duyệt (nguyên tắc phân tách trách nhiệm - Segregation of Duties, viết tắt SoD). Ràng buộc thứ hai là bất biến kế toán cơ bản nhất: tổng giá trị Nợ (debit) phải luôn bằng tổng giá trị Có (credit) trong mọi bút toán ghi vào sổ cái, nếu không hệ thống phải từ chối ghi nhận thay vì chấp nhận một bút toán lệch.",
        "The article's scope covers the full Procure-to-Pay (P2P) chain: PR → PR approval → PO → GRN (Goods Receipt Note) → Invoice → 3-way match (PO-GRN-Invoice reconciliation) → GL posting → period close. The most critical business constraint is the approval matrix: each management tier may only approve a PO up to a configured value threshold, anything above must escalate to a higher tier, and the requisition creator must never simultaneously be the approver (Segregation of Duties, SoD). The second constraint is the most fundamental accounting invariant: total debit must always equal total credit for every ledger entry — the system must reject posting rather than accept an unbalanced entry.",
        "本稿の範囲は、購買依頼から支払いまでの一連のプロセス（Procure-to-Pay、P2P）全体をカバーします：PR起票→PR承認→PO発行→GRN（入荷検収）→仕入先請求書（Invoice）→3ウェイマッチ（PO・GRN・請求書の3点照合）→総勘定元帳（GL）への計上→会計期間の締め、です。最も重要な業務制約は承認マトリクスです。各管理階層は設定された金額の上限までしかPOを承認できず、それを超える場合は必ず上位階層にエスカレーションしなければならず、また依頼を起票した本人が同時に承認者になることは決してあってはなりません（職務分掌：Segregation of Duties、SoD）。第二の制約は会計における最も基本的な不変条件であり、総勘定元帳に計上されるすべての仕訳について、借方（Debit）合計と貸方（Credit）合計は常に一致していなければならず、一致しない場合システムは計上を拒否しなければなりません。"
      ),
      IMG(svg4Arch, "Kiến trúc luồng Procure-to-Pay từ PR đến GL với 3-way match và bất biến kế toán", "Procure-to-Pay architecture from PR to GL with 3-way match and accounting invariant", "3ウェイマッチと会計不変条件を伴う、PRからGLまでのProcure-to-Payアーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho engine duyệt theo hạn mức (approval matrix) và nguyên tắc SoD", "Kiểm thử tích hợp 3-way match giữa PO, GRN, Invoice trước khi cho phép thanh toán", "Kiểm thử hạch toán GL và cơ chế khoá kỳ kế toán (period close)"],
        ["API testing for the limit-based approval engine and SoD rules", "Integration testing for the 3-way match between PO, GRN, and Invoice before payment is allowed", "GL posting and period-close mechanism testing"],
        ["ハンドル制限に基づく承認エンジンとSoDルールのAPIテスト", "支払いを許可する前のPO・GRN・請求書間の3ウェイマッチの結合テスト", "GL計上と会計期間締め（期締め）メカニズムのテスト"]
      ),
      NOTE("Bài này giả định hệ thống có test-only endpoint để seed cấu hình approval matrix, tạo PR/PO/GRN/Invoice mẫu, và mô phỏng thao tác khoá/mở kỳ kế toán trong môi trường staging.", "This article assumes the system has test-only endpoints to seed approval-matrix configuration, create sample PR/PO/GRN/Invoice records, and simulate period lock/unlock in staging.", "本稿では、承認マトリクス設定のシード、PR/PO/GRN/請求書のサンプル作成、およびステージング環境での会計期間のロック・解除操作をシミュレートするテスト専用エンドポイントが存在することを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng dữ liệu", en: "2. System architecture & data flow", ja: "2. システムアーキテクチャとデータフロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 module chính: Procurement Service (quản lý PR/PO), Approval Workflow Engine (điều phối luồng duyệt đa cấp dựa trên approval matrix cấu hình theo phòng ban và giá trị), Warehouse/GRN Service (ghi nhận hàng thực nhận), Accounts Payable (đối chiếu hoá đơn và 3-way match), và General Ledger Service (ghi bút toán và quản lý kỳ kế toán). Khi PR được tạo, Approval Workflow Engine tra bảng cấu hình hạn mức để xác định cấp duyệt cần thiết: nếu giá trị PR trong hạn mức của trưởng nhóm, hệ thống tự động gán duyệt cấp 1; nếu vượt, tự động đẩy tiếp lên giám đốc phòng ban hoặc giám đốc tài chính tuỳ ngưỡng cấu hình. Sau khi PO được duyệt và hàng về, GRN được tạo để xác nhận số lượng/chất lượng thực nhận, sau đó Accounts Payable chạy 3-way match so khớp PO (đã duyệt), GRN (đã nhận), và Invoice (nhà cung cấp gửi) trước khi cho phép thanh toán.",
        "The architecture has 5 core modules: Procurement Service (PR/PO management), Approval Workflow Engine (orchestrates the multi-tier approval flow based on an approval matrix configured by department and value), Warehouse/GRN Service (records actually-received goods), Accounts Payable (invoice reconciliation and 3-way match), and General Ledger Service (posts entries and manages accounting periods). When a PR is created, the Approval Workflow Engine looks up the limit-configuration table to determine the required approval tier: if the PR value is within the team lead's limit, the system auto-assigns tier-1 approval; if it exceeds that, it escalates to the department director or CFO depending on the configured threshold. Once the PO is approved and goods arrive, a GRN is created to confirm the actually-received quantity/quality, then Accounts Payable runs the 3-way match reconciling the approved PO, the received GRN, and the vendor-submitted Invoice before payment is authorized.",
        "アーキテクチャは5つの主要モジュールで構成されます：調達サービス（PR/PO管理）、承認ワークフローエンジン（部門と金額に応じて設定された承認マトリクスに基づき、複数階層の承認フローを制御）、倉庫・GRNサービス（実際に受け取った物品を記録）、買掛金管理（請求書の照合と3ウェイマッチ）、そして総勘定元帳サービス（仕訳の計上と会計期間の管理）です。PRが作成されると、承認ワークフローエンジンは限度額設定テーブルを参照し、必要な承認階層を判定します。PRの金額がチームリーダーの権限内であれば、システムは自動的に第1階層の承認を割り当てます。それを超える場合は、設定された閾値に応じて部門長やCFOへ自動的にエスカレーションされます。POが承認され物品が到着すると、実際に受け取った数量・品質を確認するGRNが作成され、その後買掛金管理が、承認済みのPO・受領済みのGRN・仕入先から届いた請求書を照合する3ウェイマッチを実行し、支払いを承認する前に確認を行います。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất nằm ở việc approval matrix không phải một quy tắc tĩnh đơn giản mà là tổ hợp nhiều chiều: phòng ban, loại chi phí (CAPEX hay OPEX), giá trị giao dịch, và thậm chí đơn vị tiền tệ nếu công ty có giao dịch quốc tế. Một PO giá trị 200 triệu đồng ở phòng IT có thể cần duyệt cấp giám đốc, nhưng cùng giá trị đó ở phòng sản xuất lại chỉ cần trưởng nhóm do khác nhóm chi phí đã cấu hình sẵn ngưỡng khác nhau — nếu tester chỉ kiểm thử theo giá trị mà bỏ qua chiều phòng ban/loại chi phí sẽ bỏ lọt rất nhiều lỗi cấu hình sai. Điểm khó thứ hai là việc phát hiện vi phạm SoD không chỉ đơn giản là so sánh userId người tạo và người duyệt, mà còn phải kiểm tra trường hợp một người có nhiều tài khoản hoặc được uỷ quyền tạm thời (delegate approval) trong lúc quản lý đi công tác — đây là lỗ hổng kiểm soát nội bộ tinh vi mà kiểm toán viên thường xoáy sâu vào khi audit ERP.",
        "The trickiest part is that the approval matrix isn't a simple static rule but a multi-dimensional combination: department, expense type (CAPEX vs OPEX), transaction value, and even currency for companies with international transactions. A 200-million-VND PO in the IT department might require director-level approval, while the same value in manufacturing only needs team-lead approval because the two expense categories have different configured thresholds — if a tester only tests by value and ignores the department/expense-type dimension, many configuration bugs will slip through. The second challenge is that detecting an SoD violation isn't simply comparing the creator's userId to the approver's — it must also handle a person holding multiple accounts, or temporary delegated approval while a manager is traveling, a subtle internal-control gap that auditors dig into deeply when reviewing an ERP system.",
        "最も難しいのは、承認マトリクスが単純な静的ルールではなく、部門・費用区分（CAPEXかOPEXか）・取引金額、さらに国際取引がある場合は通貨まで含む多次元の組み合わせである点です。IT部門の2億ドンのPOは部門長承認が必要な場合がありますが、同じ金額でも製造部門では費用区分の設定閾値が異なるためチームリーダー承認のみで済むことがあります。テスターが金額だけをテストし部門・費用区分の次元を無視すると、多くの設定ミスを見逃してしまいます。二つ目の課題は、SoD違反の検出が単に起票者と承認者のuserIdを比較するだけでは不十分な点です。一人が複数アカウントを保有している場合や、管理者が出張中の一時的な委任承認（delegate approval）のケースも考慮する必要があり、これはERPを監査する際に監査人が深く掘り下げる、内部統制上の微妙な抜け穴です。"
      ),
      SCEN(
        "Sự cố thực tế",
        "Real incident",
        "Trong một đợt kiểm toán nội bộ, đội audit phát hiện 14 PO có giá trị từ 80-95 triệu đồng được duyệt bởi chính người tạo PR, dù hạn mức tự duyệt tối đa của họ chỉ là 20 triệu. Điều tra sâu cho thấy nguyên nhân là một tính năng 'uỷ quyền tạm thời' (delegate) được bật cho một trưởng phòng đi công tác đã không bị tắt đúng hạn, khiến người được uỷ quyền (chính là cấp dưới đã tạo PR) vô tình có luôn quyền duyệt của cấp trên trong 3 tuần liên tiếp.",
        "During an internal audit, the audit team found 14 POs valued at 80-95 million VND approved by the very person who created the PR, despite their self-approval limit being only 20 million. Deep investigation revealed the cause was a 'temporary delegation' feature enabled for a department head who was traveling, which was not disabled on schedule, unintentionally granting the delegate (who was the subordinate who created the PR) the superior's approval authority for three consecutive weeks.",
        "実際のインシデント",
        "内部監査の際、監査チームは8,000万〜9,500万ドンの金額を持つ14件のPOが、本来20万ドンの自己承認上限しか持たない起票者本人によって承認されていたことを発見しました。詳細調査の結果、出張中の部門長に対して有効化された「一時委任」機能が予定通りに無効化されておらず、委任を受けた者（実はPRを起票した部下自身）が3週間連続で誤って上位者の承認権限を持ってしまっていたことが原因と判明しました。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến (oracle)", en: "3. Data model & invariants (oracle)", ja: "3. データモデルと不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm bảng PurchaseRequest (id, createdBy, department, expenseType, amount, status), PurchaseOrder (id, prId, approvedBy, approvalTier, amount, status), GoodsReceiptNote (id, poId, receivedQty, receivedAt), Invoice (id, poId, grnId, invoiceAmount, matchStatus), LedgerEntry (id, sourceDocId, debitAccount, debitAmount, creditAccount, creditAmount, postedAt, periodId), và AccountingPeriod (id, yearMonth, status: OPEN/CLOSED). Trạng thái PO đi theo máy trạng thái hữu hạn: DRAFT → PENDING_APPROVAL → APPROVED → PO_ISSUED → PARTIALLY_RECEIVED/FULLY_RECEIVED → INVOICED → PAID, với khả năng REJECTED ở bước duyệt bất kỳ trước APPROVED.",
        "The core data model includes PurchaseRequest (id, createdBy, department, expenseType, amount, status), PurchaseOrder (id, prId, approvedBy, approvalTier, amount, status), GoodsReceiptNote (id, poId, receivedQty, receivedAt), Invoice (id, poId, grnId, invoiceAmount, matchStatus), LedgerEntry (id, sourceDocId, debitAccount, debitAmount, creditAccount, creditAmount, postedAt, periodId), and AccountingPeriod (id, yearMonth, status: OPEN/CLOSED). PO status follows a finite state machine: DRAFT → PENDING_APPROVAL → APPROVED → PO_ISSUED → PARTIALLY_RECEIVED/FULLY_RECEIVED → INVOICED → PAID, with the ability to become REJECTED at any approval step before APPROVED.",
        "コアデータモデルには、PurchaseRequest（購買依頼：id、createdBy、department、expenseType、amount、status）、PurchaseOrder（発注：id、prId、approvedBy、approvalTier、amount、status）、GoodsReceiptNote（入荷検収：id、poId、receivedQty、receivedAt）、Invoice（請求書：id、poId、grnId、invoiceAmount、matchStatus）、LedgerEntry（仕訳：id、sourceDocId、debitAccount、debitAmount、creditAccount、creditAmount、postedAt、periodId）、そしてAccountingPeriod（会計期間：id、yearMonth、status: OPEN/CLOSED）が含まれます。PO（発注）のステータスは有限状態機械に従います：DRAFT（下書き）→ PENDING_APPROVAL（承認待ち）→ APPROVED（承認済み）→ PO_ISSUED（発注済み）→ PARTIALLY_RECEIVED/FULLY_RECEIVED（一部/全部受領）→ INVOICED（請求済み）→ PAID（支払済み）。APPROVED以前のどの承認ステップでもREJECTED（却下）になり得ます。"
      ),
      H("Bất biến nghiệp vụ bắt buộc (oracle)", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Bất biến 1: Σ debitAmount = Σ creditAmount cho mọi bút toán cùng sourceDocId, sai lệch phải bằng 0",
          "Bất biến 2: cấp duyệt của approvedBy phải ≥ cấp yêu cầu theo approval matrix ứng với amount, department, expenseType",
          "Bất biến 3: createdBy của PR ≠ approvedBy của PO cùng chuỗi tài liệu tại mọi thời điểm (SoD)",
          "Bất biến 4: khi AccountingPeriod.status = CLOSED, không LedgerEntry nào thuộc periodId đó được sửa/xoá — chỉ được thêm bút toán điều chỉnh (adjusting entry) ở kỳ mới",
          "Bất biến 5: matchStatus = MATCHED chỉ khi |Invoice.invoiceAmount − PO.amount| ≤ dung sai cấu hình VÀ GRN.receivedQty khớp PO.orderedQty",
        ],
        [
          "Invariant 1: Σ debitAmount = Σ creditAmount for every entry sharing sourceDocId, deviation must equal 0",
          "Invariant 2: approvedBy's tier must be ≥ the tier required by the approval matrix for the given amount, department, expenseType",
          "Invariant 3: a PR's createdBy ≠ the PO's approvedBy within the same document chain at all times (SoD)",
          "Invariant 4: once AccountingPeriod.status = CLOSED, no LedgerEntry under that periodId may be modified/deleted — only a new adjusting entry in a new period is allowed",
          "Invariant 5: matchStatus = MATCHED only when |Invoice.invoiceAmount − PO.amount| ≤ configured tolerance AND GRN.receivedQty matches PO.orderedQty",
        ],
        [
          "不変条件1：同一sourceDocIdを持つすべての仕訳について、Σdebit金額 = Σcredit金額。差異はゼロでなければならない",
          "不変条件2：approvedByの承認階層は、金額・部門・費用区分に応じた承認マトリクスが要求する階層以上でなければならない",
          "不変条件3：同一の文書チェーン内において、PRのcreatedByとPOのapprovedByは、いかなる時点でも同一人物であってはならない（職務分掌）",
          "不変条件4：AccountingPeriod.statusがCLOSEDになった後、そのperiodIdに属するLedgerEntryは修正・削除できない。新しい会計期間での調整仕訳の追加のみが許される",
          "不変条件5：matchStatus=MATCHEDとなるのは、|請求書金額 − PO金額| が設定された許容誤差以下、かつGRNの受領数量がPOの発注数量と一致する場合のみである",
        ]
      ),
      CODE("typescript", `// Oracle helper — dùng lại trong mọi test case liên quan GL & duyệt
export function assertLedgerBalanced(entries: LedgerEntry[]) {
  const totalDebit = entries.reduce((s, e) => s + e.debitAmount, 0);
  const totalCredit = entries.reduce((s, e) => s + e.creditAmount, 0);
  expect(Math.abs(totalDebit - totalCredit)).toBe(0); // tuyệt đối bằng 0, không tha thứ sai lệch
}

export async function assertApprovalTierValid(po: PurchaseOrder, matrix: ApprovalMatrix) {
  const requiredTier = matrix.resolveTier(po.department, po.expenseType, po.amount);
  expect(po.approvalTier).toBeGreaterThanOrEqual(requiredTier);
  expect(po.approvedBy).not.toBe(po.createdBy); // SoD
}`),
      TIP("Luôn assert bằng công thức bất biến kế toán (Nợ=Có tuyệt đối), không chấp nhận dung sai làm tròn cho bút toán GL như cách làm với giá bán lẻ — kế toán yêu cầu chính xác tuyệt đối.", "Always assert with the exact accounting-balance formula (debit=credit), never accept a rounding tolerance for GL entries the way you might for retail pricing — accounting demands exact precision.", "常に厳密な会計バランスの数式（借方=貸方）でアサーションを行ってください。小売価格計算のような丸め誤差の許容は、GL仕訳には認められません。会計には絶対的な正確性が求められます。"),
    ],
  },
  {
    heading: { vi: "4. Rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Ma trận rủi ro xếp hạng theo mức độ ảnh hưởng tuân thủ và tần suất xảy ra: rủi ro cao nhất là vi phạm SoD (tự duyệt hoặc uỷ quyền không kiểm soát), vì đây là điểm kiểm toán SOX luôn soi đầu tiên và có thể dẫn đến ý kiến kiểm toán ngoại lệ (qualified opinion); tiếp theo là bút toán GL mất cân đối do lỗi mapping tài khoản khi tích hợp giữa các module; rủi ro trung bình là 3-way match sai lệch cho phép thanh toán vượt giá trị PO; rủi ro thấp hơn là hiển thị sai trạng thái duyệt trên giao diện dashboard. Chiến lược kiểm thử áp dụng kim tự tháp: 55% unit test cho approval matrix resolver và ledger balance calculator (logic thuần tuý, chạy nhanh), 35% integration/API test cho luồng PR→PO→GRN→Invoice→GL xuyên nhiều service, 10% E2E cho các happy path và kịch bản khoá kỳ quan trọng nhất.",
        "The risk matrix ranks issues by compliance impact and likelihood: highest risk is SoD violation (self-approval or uncontrolled delegation), since this is always the first thing SOX auditors scrutinize and can lead to a qualified audit opinion; next is unbalanced GL entries from account-mapping errors during cross-module integration; medium risk is a faulty 3-way match allowing payment beyond the PO value; lower risk is the dashboard UI showing an incorrect approval status. The test strategy follows a pyramid: 55% unit tests for the approval-matrix resolver and ledger-balance calculator (pure logic, fast), 35% integration/API tests for the PR→PO→GRN→Invoice→GL flow across services, 10% E2E for happy paths and the most critical period-close scenarios.",
        "リスクマトリクスはコンプライアンスへの影響度と発生頻度でランク付けします。最高リスクはSoD違反（自己承認または統制されていない委任）です。これはSOX監査人が必ず最初に精査する項目であり、限定付き監査意見（qualified opinion）につながる可能性があります。次に、モジュール間統合時の勘定科目マッピング誤りによるGL仕訳の不均衡です。中リスクは、3ウェイマッチの不備によりPO金額を超える支払いが許可されてしまうことです。より低いリスクは、ダッシュボードUIで承認ステータスが誤って表示されることです。テスト戦略はピラミッド型を採用します：承認マトリクスリゾルバと元帳バランス計算機のユニットテスト55%（純粋なロジック、高速）、複数サービスにまたがるPR→PO→GRN→請求書→GLフローの結合/APIテスト35%、ハッピーパスと最重要な期締めシナリオのE2Eテスト10%。"
      ),
      H("Kim tự tháp kiểm thử áp dụng", "Applied test pyramid", "適用するテストピラミッド"),
      UL(
        ["Unit (55%): resolver hạn mức duyệt, tính cân đối Nợ/Có, quy tắc dung sai 3-way match", "Integration/API (35%): luồng PR→PO→GRN→Invoice→GL, kiểm tra SoD xuyên service", "E2E (10%): happy path mua hàng + kịch bản khoá kỳ và sửa chứng từ sau khoá kỳ"],
        ["Unit (55%): approval-limit resolver, debit/credit balance calculation, 3-way match tolerance rules", "Integration/API (35%): PR→PO→GRN→Invoice→GL flow, cross-service SoD checks", "E2E (10%): happy-path procurement + period-close and post-close-edit scenarios"],
        ["ユニット（55%）：承認限度額リゾルバ、借方/貸方バランス計算、3ウェイマッチの許容誤差ルール", "結合/API（35%）：PR→PO→GRN→請求書→GLフロー、サービス横断のSoDチェック", "E2E（10%）：ハッピーパスの購買フロー＋期締めおよび締め後の修正シナリオ"]
      ),
      WARN("Không nên phủ toàn bộ tổ hợp phòng ban x loại chi phí x giá trị bằng E2E — số tổ hợp có thể lên tới hàng trăm. Đẩy phần logic resolver thuần tuý xuống unit test và chỉ giữ vài đại diện ở E2E.", "Do not cover every department x expense-type x value combination with E2E — the combination count can reach hundreds. Push the pure resolver logic down to unit tests and keep only a few representative cases at the E2E layer.", "部門×費用区分×金額のすべての組み合わせをE2Eでカバーしてはいけません。組み合わせ数は数百に達する可能性があります。純粋なリゾルバロジックはユニットテストに落とし込み、E2Eでは代表的なケースのみを保持してください。"),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi (in-scope: procurement, approval workflow, warehouse/GRN, accounts payable, general ledger; out-of-scope: hệ thống ngân hàng thực hiện lệnh chuyển tiền vật lý), tiêu chí bắt đầu (entry criteria: môi trường staging có dữ liệu seed approval matrix cho tối thiểu 3 phòng ban x 2 loại chi phí, dữ liệu nhà cung cấp mẫu), và tiêu chí kết thúc (exit criteria: 100% ca P1/P2 pass, không còn bug Critical/High mở liên quan SoD hoặc cân đối GL, độ phủ code approval resolver ≥ 90% do đây là logic tuân thủ trọng yếu). Môi trường kiểm thử dùng 3 tầng: dev (unit, mock toàn bộ), staging (integration với dữ liệu approval matrix đầy đủ và một kỳ kế toán giả lập có thể khoá/mở), và UAT (người dùng nghiệp vụ kế toán và mua hàng trực tiếp kiểm tra kịch bản khoá kỳ thật).",
        "The test plan defines scope (in-scope: procurement, approval workflow, warehouse/GRN, accounts payable, general ledger; out-of-scope: the bank's actual funds-transfer execution system), entry criteria (staging seeded with an approval matrix covering at least 3 departments x 2 expense types, sample vendor data), and exit criteria (100% P1/P2 cases pass, no open Critical/High bugs related to SoD or GL balance, approval-resolver code coverage ≥ 90% given its compliance-critical nature). Testing uses 3 tiers: dev (unit, fully mocked), staging (integration with a full approval matrix and a simulated lockable/unlockable accounting period), and UAT (accounting and procurement business users directly verifying real period-close scenarios).",
        "テスト計画では、範囲（対象：調達・承認ワークフロー・倉庫/GRN・買掛金管理・総勘定元帳、対象外：銀行の実際の送金実行システム）、開始基準（少なくとも3部門×2費用区分をカバーする承認マトリクスと仕入先サンプルデータがシードされたステージング環境）、終了基準（P1/P2ケース100%合格、SoDまたはGLバランスに関連するCritical/High未解決バグゼロ、コンプライアンス上重要なロジックであることを踏まえ承認リゾルバのコードカバレッジ90%以上）を定義します。テスト環境は3層構成です：dev（ユニット、完全モック）、ステージング（完全な承認マトリクスとロック・解除可能な模擬会計期間を用いた結合テスト）、UAT（経理・購買の業務ユーザーが実際の期締めシナリオを直接検証）。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: duyệt test plan, ký exit criteria", "SDET: viết API/E2E automation cho luồng P2P, duy trì CI", "Backend dev: review oracle cân đối GL & cùng debug ca lỗi 3-way match", "Kế toán trưởng/Compliance SME: xác nhận quy tắc khoá kỳ và ma trận duyệt đúng chính sách công ty"],
        ["QA Lead: approves test plan, signs off exit criteria", "SDET: writes API/E2E automation for the P2P flow, maintains CI", "Backend dev: reviews the GL-balance oracle, co-debugs 3-way-match failures", "Chief Accountant/Compliance SME: confirms period-close rules and the approval matrix match company policy"],
        ["QAリード：テスト計画を承認し、終了基準にサインオフする", "SDET：P2PフローのAPI/E2E自動化を作成し、CIを保守する", "バックエンド開発者：GLバランスのオラクルをレビューし、3ウェイマッチの不具合を共同デバッグする", "経理部長・コンプライアンスSME：期締めルールと承認マトリクスが会社ポリシーに合致していることを確認する"]
      ),
      NOTE("Chỉ số theo dõi hàng tuần: số ca automation liên quan SoD/GL pass ổn định 3 lần liên tiếp, số lần phát hiện cấu hình approval matrix sai trong staging, thời gian trung bình xử lý 1 ca chặn thanh toán do 3-way match lệch.", "Weekly tracked metrics: number of SoD/GL-related automated cases passing 3 consecutive runs, number of approval-matrix misconfigurations caught in staging, average resolution time per payment-block case from a 3-way-match mismatch.", "週次で追跡する指標：SoD/GL関連の自動化ケースが3回連続で安定して合格した数、ステージングで発見された承認マトリクスの設定誤りの件数、3ウェイマッチの不一致による支払いブロックケース1件あたりの平均対応時間。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca sử dụng decision table cho tổ hợp phòng ban x loại chi phí x giá trị để xác định đúng cấp duyệt yêu cầu, boundary value analysis cho ranh giới hạn mức (limit-1, limit, limit+1) ở từng cấp, và state transition testing cho vòng đời chứng từ PO cùng với các cạnh chuyển trạng thái hợp lệ/không hợp lệ (ví dụ không được nhảy thẳng từ DRAFT sang PAID). Mỗi ca được đặt tên theo chuẩn TC-<module>-<số>-<mô tả ngắn>, gắn rõ oracle tương ứng (bất biến số mấy trong chương 3) để reviewer không cần đoán kỳ vọng, và gắn nhãn mức độ rủi ro tuân thủ để ưu tiên chạy đúng trọng số.",
        "The case matrix uses a decision table for department x expense-type x value combinations to determine the required approval tier, boundary value analysis for limit boundaries (limit-1, limit, limit+1) at each tier, and state-transition testing for the PO document lifecycle along with valid/invalid transition edges (e.g. it must never jump straight from DRAFT to PAID). Each case is named per the TC-<module>-<number>-<short description> convention, tagged with its corresponding oracle (which invariant number from chapter 3) so reviewers never guess the expectation, and labeled with a compliance risk level to prioritize execution weight correctly.",
        "ケースマトリクスでは、必要な承認階層を決定するための部門×費用区分×金額の組み合わせに対するデシジョンテーブル、各階層の限度額境界（限度額-1・限度額・限度額+1）に対する境界値分析、そしてPO文書のライフサイクルと有効/無効な遷移エッジ（例えばDRAFTから直接PAIDへは決して遷移してはならない）に対する状態遷移テストを使用します。各ケースはTC-<モジュール>-<番号>-<短い説明>という命名規則に従い、レビュアーが期待値を推測しなくて済むよう対応するオラクル（第3章のどの不変条件か）が明記され、実行時の優先度を正しく設定するためコンプライアンスリスクレベルもラベル付けされます。"
      ),
      IMG(svg4Matrix, "Ma trận ca kiểm thử duyệt & GL với mức rủi ro và oracle tương ứng", "Approval & GL test case matrix with risk level and corresponding oracle", "リスクレベルと対応オラクルを示す承認・GLテストケースマトリクス"),
      H("Ưu tiên chạy", "Run priority", "実行優先度"),
      UL(
        ["P1 (chạy mỗi build): TC-03 tự duyệt, TC-05 bút toán mất cân đối, TC-06 sửa chứng từ sau khoá kỳ", "P2 (chạy nightly): TC-02 vượt hạn mức, TC-04 3-way match lệch giá", "P3 (chạy trước release): TC-01 duyệt trong hạn mức, kịch bản đa tiền tệ"],
        ["P1 (every build): TC-03 self-approval, TC-05 unbalanced entry, TC-06 post-close edit", "P2 (nightly): TC-02 limit exceeded, TC-04 3-way match price mismatch", "P3 (pre-release): TC-01 within-limit approval, multi-currency scenarios"],
        ["P1（毎ビルド実行）：TC-03自己承認、TC-05仕訳の不均衡、TC-06締め後の修正", "P2（夜間実行）：TC-02限度額超過、TC-04 3ウェイマッチの価格不一致", "P3（リリース前実行）：TC-01限度額内承認、多通貨シナリオ"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment setup", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Việc seed dữ liệu dùng test-only API `/internal/test/seed` để tạo cấu hình approval matrix tuỳ biến theo phòng ban/loại chi phí/ngưỡng, tránh phụ thuộc vào cấu hình thật trên production vốn có thể thay đổi bất cứ lúc nào theo chính sách công ty. Trước mỗi test suite chạy, một hook `beforeAll` gọi endpoint reset để xoá PR/PO/GRN/Invoice test cũ và mở lại kỳ kế toán giả lập về trạng thái OPEN, đảm bảo cô lập giữa các lần chạy CI song song. Đối với kịch bản khoá kỳ, môi trường cần một endpoint riêng để giả lập việc kế toán trưởng bấm 'Khoá kỳ 06/2026', sau đó test có thể xác minh mọi thao tác ghi/sửa chứng từ thuộc kỳ đó đều bị chặn.",
        "Data seeding uses a test-only `/internal/test/seed` API to create custom approval-matrix configuration by department/expense-type/threshold, avoiding dependency on real production configuration that can change anytime per company policy. Before each test suite, a `beforeAll` hook calls a reset endpoint to delete stale PR/PO/GRN/Invoice test records and reopen the simulated accounting period to OPEN, ensuring isolation across parallel CI runs. For period-close scenarios, the environment needs a dedicated endpoint to simulate the chief accountant clicking 'Close period 06/2026', after which tests can verify all write/edit operations on documents belonging to that period are blocked.",
        "データシードには、会社ポリシーによっていつでも変更されうる本番環境の実際の設定への依存を避けるため、テスト専用の`/internal/test/seed` APIを使用し、部門/費用区分/閾値ごとにカスタムの承認マトリクス設定を作成します。各テストスイート実行前に、`beforeAll`フックがリセットエンドポイントを呼び出して古いPR/PO/GRN/請求書のテストレコードを削除し、模擬会計期間をOPEN状態に戻すことで、並行CI実行間の分離を確保します。期締めシナリオについては、経理部長が「06/2026期を締める」をクリックすることをシミュレートする専用エンドポイントが環境に必要であり、その後テストでその期間に属する文書への書き込み・修正操作がすべてブロックされることを検証できます。"
      ),
      CODE("bash", `# Reset & seed cấu hình approval matrix + mở kỳ kế toán trước khi chạy suite
curl -X POST https://staging.erp.internal/internal/test/reset \\
  -H "X-Test-Key: $TEST_API_KEY"

curl -X POST https://staging.erp.internal/internal/test/seed/approval-matrix \\
  -H "Content-Type: application/json" \\
  -d '{
    "department": "IT",
    "expenseType": "OPEX",
    "tiers": [
      { "tier": 1, "role": "TEAM_LEAD", "maxAmount": 10000000 },
      { "tier": 2, "role": "DEPT_DIRECTOR", "maxAmount": 100000000 },
      { "tier": 3, "role": "CFO", "maxAmount": null }
    ]
  }'`),
      TIP("Đặt maxAmount của cấp cuối là null (không giới hạn) để đảm bảo mọi giá trị PO đều có ít nhất một cấp duyệt hợp lệ, tránh trường hợp PO 'không ai đủ quyền duyệt' làm kẹt luồng vĩnh viễn.", "Set the last tier's maxAmount to null (unlimited) to guarantee every PO value has at least one valid approval tier, avoiding a PO that 'no one is authorized to approve' permanently stuck in the workflow.", "最終階層のmaxAmountをnull（無制限）に設定し、あらゆるPO金額に対して少なくとも1つの有効な承認階層が存在するようにしてください。「誰も承認権限を持たない」POがワークフローで永久に詰まることを避けられます。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation gọi trực tiếp API theo đúng thứ tự nghiệp vụ: tạo PR, duyệt PR theo đúng cấp trong approval matrix, chuyển thành PO, tạo GRN xác nhận nhận hàng đủ số lượng, gửi Invoice khớp giá, chạy 3-way match, và cuối cùng xác minh bút toán GL được ghi đúng với Nợ = Có. Assertion cuối cùng không dừng ở việc API trả về status 200 mà gọi thẳng oracle `assertLedgerBalanced` đã định nghĩa ở chương 3 để xác nhận đúng bất biến kế toán, đảm bảo automation kiểm tra đúng nghiệp vụ tài chính chứ không chỉ mã trạng thái HTTP.",
        "Happy-path automation calls the API directly in the correct business order: create a PR, approve it at the correct tier per the approval matrix, convert to a PO, create a GRN confirming full quantity received, submit an Invoice matching the price, run the 3-way match, and finally verify the GL entry is posted correctly with debit = credit. The final assertion doesn't stop at an HTTP 200 — it calls the `assertLedgerBalanced` oracle defined in chapter 3 to confirm the accounting invariant, ensuring the automation validates real financial business logic, not just the HTTP status code.",
        "ハッピーパス自動化は、正しい業務順序でAPIを直接呼び出します：PRを作成し、承認マトリクスに従って正しい階層で承認し、POに変換し、全数量受領を確認するGRNを作成し、価格が一致する請求書を送信し、3ウェイマッチを実行し、最後に借方=貸方でGL仕訳が正しく計上されていることを確認します。最終アサーションはHTTP 200で終わりにするのではなく、第3章で定義した`assertLedgerBalanced`オラクルを呼び出して会計上の不変条件を確認し、自動化がHTTPステータスコードだけでなく実際の財務業務ロジックを検証していることを保証します。"
      ),
      CODE("typescript", `import { test, expect } from "./fixtures";
import { assertLedgerBalanced, assertApprovalTierValid } from "./oracles";

test("PO trong hạn mức: PR->PO->GRN->Invoice->GL đúng bất biến", async ({ apiClient }) => {
  const pr = await apiClient.post("/procurement/pr", {
    createdBy: "user-buyer-01", department: "IT", expenseType: "OPEX", amount: 8000000,
  });
  const approved = await apiClient.post(\`/procurement/pr/\${pr.data.id}/approve\`, {
    approvedBy: "user-teamlead-02",
  });
  expect(approved.data.status).toBe("APPROVED");

  const po = await apiClient.post("/procurement/po", { prId: pr.data.id });
  await assertApprovalTierValid(po.data, await apiClient.get("/internal/approval-matrix/IT/OPEX"));

  const grn = await apiClient.post("/warehouse/grn", { poId: po.data.id, receivedQty: po.data.orderedQty });
  const invoice = await apiClient.post("/ap/invoice", { poId: po.data.id, grnId: grn.data.id, invoiceAmount: po.data.amount });

  const match = await apiClient.post(\`/ap/invoice/\${invoice.data.id}/match\`);
  expect(match.data.matchStatus).toBe("MATCHED");

  const entries = await apiClient.get(\`/gl/entries?sourceDocId=\${invoice.data.id}\`);
  assertLedgerBalanced(entries.data); // oracle: Nợ = Có tuyệt đối
});`),
      CODE("typescript", `// API-level test cho approval matrix resolver — nhanh, cô lập, chạy mỗi commit
test("PO vượt hạn mức cấp 1 phải resolve đúng cấp 2", async ({ apiClient }) => {
  const res = await apiClient.post("/internal/approval-matrix/resolve", {
    department: "IT", expenseType: "OPEX", amount: 50000000,
  });
  expect(res.data.requiredTier).toBe(2);
  expect(res.data.requiredRole).toBe("DEPT_DIRECTOR");
});`),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Các ca lỗi chuyên sâu trong bài toán ERP mua hàng là nơi phân biệt rõ nhất một SDET hiểu nghiệp vụ kế toán/kiểm soát nội bộ với một tester chỉ click qua giao diện, vì chúng đòi hỏi hiểu về SoD, cân đối bút toán kép, và bất biến bất biến của kỳ khoá sổ. Ba nhóm ca lỗi trọng tâm là: vi phạm SoD qua tự duyệt hoặc uỷ quyền chồng chéo, bút toán GL mất cân đối do lỗi mapping tài khoản khi tích hợp giữa Procurement và Ledger, và cố tình hoặc vô tình sửa/xoá chứng từ thuộc kỳ đã khoá — đây cũng chính là ba câu hỏi kiểm toán SOX luôn kiểm tra đầu tiên khi audit một hệ thống ERP thực tế.",
        "Deep failure cases in this ERP procurement problem are where an SDET who understands accounting/internal-control business logic is most clearly distinguished from a tester who merely clicks through the UI, since they require understanding SoD, double-entry balance, and period-lock immutability. The three focal failure groups are: SoD violation via self-approval or overlapping delegation, unbalanced GL entries from account-mapping errors when integrating Procurement and Ledger, and intentional or accidental modification/deletion of documents belonging to a closed period — these are also the exact three checks SOX auditors always run first when auditing a real ERP system.",
        "このERP購買問題における高度な異常系は、会計・内部統制の業務ロジックを理解しているSDETと、単にUIをクリックするだけのテスターとの違いが最も明確に表れる部分です。SoD、複式簿記のバランス、締め期間の不変性についての理解が求められるためです。3つの主要な異常系グループは、自己承認または重複した委任によるSoD違反、調達と元帳の統合時の勘定科目マッピング誤りによるGL仕訳の不均衡、そして締められた期間に属する文書の意図的または偶発的な修正・削除です。これらはまさに、実際のERPシステムを監査する際にSOX監査人が必ず最初にチェックする3つの項目でもあります。"
      ),
      CODE("typescript", `// Ca 1: Vi phạm SoD — người tạo PR không được là người duyệt, kể cả qua uỷ quyền tạm thời
test("PO bị từ chối nếu approvedBy trùng createdBy dù có active delegation", async ({ apiClient }) => {
  const pr = await apiClient.post("/procurement/pr", {
    createdBy: "user-99", department: "IT", expenseType: "OPEX", amount: 15000000,
  });
  await apiClient.post("/internal/test/seed/delegation", {
    fromUser: "user-teamlead-99", toUser: "user-99", active: true, // uỷ quyền tạm thời cho chính người tạo PR
  });

  const attempt = apiClient.post(\`/procurement/pr/\${pr.data.id}/approve\`, { approvedBy: "user-99" });
  await expect(attempt).rejects.toMatchObject({ response: { status: 409, data: { code: "SOD_VIOLATION" } } });
});`),
      CODE("typescript", `// Ca 2: Bút toán GL mất cân đối do lỗi mapping tài khoản — phải bị chặn trước khi post
test("GL post bị từ chối khi tổng Nợ khác tổng Có", async ({ apiClient }) => {
  const attempt = apiClient.post("/gl/entries", {
    sourceDocId: "invoice-broken-01",
    lines: [
      { account: "6421-EXPENSE", debit: 8000000, credit: 0 },
      { account: "3311-PAYABLE", debit: 0, credit: 7999000 }, // lệch 1000 do mapping sai
    ],
  });
  await expect(attempt).rejects.toMatchObject({ response: { status: 422, data: { code: "GL_UNBALANCED" } } });

  const entries = await apiClient.get("/gl/entries?sourceDocId=invoice-broken-01");
  expect(entries.data.length).toBe(0); // oracle: không được ghi bút toán lệch vào GL dù chỉ 1 đồng
});`),
      CODE("typescript", `// Ca 3: Sửa chứng từ sau khi kỳ đã khoá — phải bị chặn, chỉ cho phép bút toán điều chỉnh kỳ mới
test("update Invoice thuộc kỳ CLOSED phải bị từ chối", async ({ apiClient }) => {
  await apiClient.post("/internal/test/period/close", { yearMonth: "2026-06" });

  const invoice = await apiClient.get("/ap/invoice/inv-jun-2026-004"); // thuộc kỳ 06/2026 đã khoá
  const attempt = apiClient.put(\`/ap/invoice/\${invoice.data.id}\`, { invoiceAmount: 12000000 });

  await expect(attempt).rejects.toMatchObject({ response: { status: 423, data: { code: "PERIOD_LOCKED" } } });

  // Oracle: dữ liệu gốc không đổi, muốn điều chỉnh phải tạo adjusting entry ở kỳ 07/2026
  const unchanged = await apiClient.get(\`/ap/invoice/\${invoice.data.id}\`);
  expect(unchanged.data.invoiceAmount).toBe(invoice.data.invoiceAmount);
});`),
      WARN("Đừng chỉ kiểm tra API chính (update Invoice) bị chặn — kiểm tra luôn các đường vòng như sửa trực tiếp GRN hoặc xoá LedgerEntry qua endpoint nội bộ, vì kiểm toán từng phát hiện lỗ hổng ở chính các API 'ít ai để ý' này.", "Don't just check that the primary API (Invoice update) is blocked — also check bypass routes like directly editing a GRN or deleting a LedgerEntry via an internal endpoint, since audits have found gaps precisely in these 'overlooked' APIs.", "主要なAPI（請求書の更新）がブロックされることだけを確認してはいけません。GRNを直接編集したり内部エンドポイント経由でLedgerEntryを削除したりする迂回経路も確認してください。監査では、まさにこうした「見落とされがちな」APIに抜け穴が発見されています。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & khoá kỳ kế toán", en: "10. Post-checks & period close", ja: "10. 事後検証と期締め" },
    blocks: [
      P(
        "Ngoài kiểm thử theo từng giao dịch đơn lẻ, hệ thống cần một batch job đối soát cuối kỳ (Period-End Reconciliation) chạy trước khi kế toán trưởng bấm khoá kỳ, nhằm quét toàn bộ LedgerEntry trong kỳ để xác nhận không còn bút toán nào mất cân đối, không còn PO nào ở trạng thái PENDING_APPROVAL quá 30 ngày (dấu hiệu quy trình bị treo), và không còn Invoice nào ở trạng thái chưa MATCHED nhưng đã được thanh toán (dấu hiệu bỏ qua kiểm soát 3-way match). Chỉ khi batch này báo cáo sạch (0 sai lệch), nút 'Khoá kỳ' mới nên được kích hoạt trên giao diện; nếu không, hệ thống phải hiển thị rõ danh sách các mục cần xử lý trước khi khoá.",
        "Beyond single-transaction testing, the system needs a Period-End Reconciliation batch job that runs before the chief accountant clicks to close the period, scanning every LedgerEntry in that period to confirm no unbalanced entries remain, no PO remains PENDING_APPROVAL for over 30 days (a sign the process is stuck), and no Invoice remains unMATCHED yet already paid (a sign the 3-way-match control was bypassed). Only when this batch reports clean (0 discrepancies) should the 'Close period' button be enabled in the UI; otherwise the system must clearly display the list of items to resolve before closing.",
        "個別取引のテストに加え、経理部長が期締めボタンを押す前に実行される期末対査（Period-End Reconciliation）バッチジョブが必要です。これは、その期間内のすべてのLedgerEntryをスキャンし、不均衡な仕訳が残っていないこと、30日を超えてPENDING_APPROVAL（承認待ち）のままのPOが残っていないこと（プロセスが滞留している兆候）、そしてMATCHEDになっていないのに既に支払済みのInvoiceが残っていないこと（3ウェイマッチ統制が回避された兆候）を確認します。このバッチがクリーン（差異ゼロ）と報告した場合のみ、UI上で「期を締める」ボタンを有効化すべきであり、そうでない場合はシステムが締める前に対応すべき項目のリストを明確に表示しなければなりません。"
      ),
      CODE("sql", `-- Query đối soát cuối kỳ: phát hiện PO treo lâu và Invoice thanh toán mà chưa matched
SELECT
  'STALE_PO' AS issue_type, po.id, po.status, po.created_at
FROM purchase_order po
WHERE po.status = 'PENDING_APPROVAL' AND po.created_at < CURRENT_DATE - INTERVAL '30 days'
UNION ALL
SELECT
  'UNMATCHED_BUT_PAID' AS issue_type, inv.id, inv.match_status, inv.paid_at
FROM invoice inv
WHERE inv.paid_at IS NOT NULL AND inv.match_status <> 'MATCHED';`),
      NOTE("Batch đối soát cuối kỳ nên chạy dạng idempotent và có thể gọi lại nhiều lần trong ngày khoá kỳ mà không sinh thêm bản ghi cảnh báo trùng lặp; kết quả nên lưu snapshot kèm timestamp để phục vụ hồ sơ kiểm toán sau này.", "The period-end reconciliation batch should be idempotent and callable multiple times on close-day without generating duplicate warning records; results should be stored as a timestamped snapshot for later audit records.", "期末対査バッチは冪等であるべきで、締め当日に複数回呼び出しても重複した警告レコードが生成されてはいけません。結果は、後の監査記録のためタイムスタンプ付きのスナップショットとして保存すべきです。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD & giám sát", en: "11. CI/CD & monitoring", ja: "11. CI/CDと監視" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit test cho approval resolver và ledger balance calculator (dưới 2 phút), API/integration test với testcontainers Postgres mô phỏng đầy đủ luồng PR→PO→GRN→Invoice→GL (dưới 10 phút), và E2E Playwright cho happy path cùng 2-3 kịch bản khoá kỳ quan trọng nhất chạy trên môi trường staging (dưới 15 phút). Gate release yêu cầu toàn bộ 3 tầng pass, đặc biệt nhóm test SoD và cân đối GL phải pass 100% không có ngoại lệ — vì đây là nhóm test liên quan tuân thủ, không được phép merge nếu có bất kỳ ca nào trong nhóm này fail, kể cả khi được đánh dấu là flaky.",
        "The CI pipeline runs 3 parallel tiers: unit tests for the approval resolver and ledger-balance calculator (under 2 minutes), API/integration tests with Postgres testcontainers simulating the full PR→PO→GRN→Invoice→GL flow (under 10 minutes), and Playwright E2E for the happy path plus the 2-3 most critical period-close scenarios on staging (under 15 minutes). The release gate requires all 3 tiers to pass, and specifically the SoD and GL-balance test groups must pass 100% with no exceptions — since these are compliance-critical tests, merging must never be allowed if any case in this group fails, even if flagged flaky.",
        "CIパイプラインは3層を並行実行します：承認リゾルバと元帳バランス計算機のユニットテスト（2分未満）、Postgres testcontainersでPR→PO→GRN→請求書→GLの全フローをシミュレートするAPI/結合テスト（10分未満）、ステージング環境でハッピーパスと最重要な期締めシナリオ2〜3件を実行するPlaywright E2E（15分未満）。リリースゲートは3層すべての合格を要求し、特にSoDとGLバランスのテストグループは例外なく100%合格しなければなりません。これらはコンプライアンス上重要なテストであるため、このグループのケースが1つでも失敗した場合、フレークとマークされていてもマージを許可してはなりません。"
      ),
      CODE("yaml", `name: erp-p2p-gl-pipeline
on: [pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:unit:approval-gl -- --coverage
  integration:
    needs: unit
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:15, ports: ["5432:5432"] }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration:p2p
      - run: npm run test:integration:sod-gl -- --bail  # nhóm compliance: fail là chặn merge ngay
  e2e:
    needs: integration
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test tests/e2e/period-close.spec.ts`),
      TIP("Gắn dashboard riêng theo dõi số lần GL_UNBALANCED và SOD_VIOLATION bị chặn trong tuần — số này tăng đột biến là tín hiệu sớm cho thấy một thay đổi cấu hình hoặc release gần đây đã phá vỡ kiểm soát nội bộ.", "Attach a dedicated dashboard tracking weekly counts of blocked GL_UNBALANCED and SOD_VIOLATION events — a sudden spike is an early signal that a recent configuration change or release has broken internal controls.", "GL_UNBALANCEDとSOD_VIOLATIONがブロックされた週次件数を追跡する専用ダッシュボードを設定してください。急増は、最近の設定変更やリリースが内部統制を壊したことを示す早期シグナルです。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent hỗ trợ sinh ma trận ca kiểm thử approval matrix tự động bằng cách đọc bảng cấu hình hạn mức theo phòng ban/loại chi phí hiện có và liệt kê mọi tổ hợp ranh giới (boundary) có khả năng bị bỏ sót nếu con người tự viết thủ công, đặc biệt là các cặp phòng ban có ngưỡng gần nhau dễ gây nhầm lẫn khi cấu hình. Agent cũng có thể được giao phân tích log GL_UNBALANCED trong quá khứ để tìm mẫu hình tài khoản hay bị mapping sai (ví dụ một loại chi phí mới thêm gần đây thường xuyên gây lệch bút toán), giúp team đề xuất review lại cấu hình chart-of-accounts mà không cần rà thủ công hàng nghìn giao dịch.",
        "An AI agent helps auto-generate the approval-matrix test-case matrix by reading the existing department/expense-type limit configuration and listing every boundary combination humans commonly miss when writing cases manually, especially department pairs with thresholds close enough to cause configuration confusion. The agent can also be tasked with analyzing historical GL_UNBALANCED logs to find patterns of frequently mis-mapped accounts (e.g. a recently added expense type that often causes unbalanced entries), helping the team propose a chart-of-accounts configuration review without manually combing through thousands of transactions.",
        "AIエージェントは、既存の部門・費用区分別の限度額設定を読み取り、人間が手作業でケースを書く際に見落としがちなあらゆる境界の組み合わせ、特に閾値が近く設定を混同しやすい部門ペアを列挙することで、承認マトリクスのテストケースマトリクスの自動生成を支援します。また、エージェントに過去のGL_UNBALANCEDログの分析を任せることで、マッピングミスが頻発する勘定科目のパターン（例えば最近追加された費用区分が仕訳の不均衡を頻繁に引き起こしているなど）を発見し、数千件の取引を手動で確認することなく勘定科目表の設定見直しをチームに提案できます。"
      ),
      P(
        "Ranh giới trách nhiệm rất rõ ràng: AI agent được phép đề xuất ca kiểm thử mới, tóm tắt mẫu hình bút toán lỗi, và soạn thảo bản nháp cấu hình approval matrix, nhưng con người — cụ thể là kế toán trưởng và trưởng phòng compliance — luôn phải review và ký duyệt trước khi bất kỳ thay đổi nào liên quan hạn mức duyệt hoặc chart-of-accounts được đưa vào production. Agent tuyệt đối không được cấp quyền tự động thực thi khoá kỳ, mở lại kỳ đã khoá, hoặc chỉnh sửa approval matrix production mà không có con người review, để tránh rủi ro hallucination gây mở lỗ hổng kiểm soát nội bộ hoặc vi phạm nguyên tắc bất biến của kỳ đã khoá.",
        "Responsibility boundaries are clear: the AI agent may propose new test cases, summarize faulty-posting patterns, and draft approval-matrix configuration proposals, but humans — specifically the chief accountant and compliance lead — must always review and sign off before any change to approval limits or the chart of accounts reaches production. The agent must never be granted permission to auto-execute period close, reopen a closed period, or edit the production approval matrix without human review, to avoid hallucination risk opening an internal-control gap or violating the closed-period immutability principle.",
        "責任範囲は明確です。AIエージェントは新しいテストケースの提案、誤った仕訳のパターン要約、承認マトリクス設定案の草案作成を行うことができますが、人間、具体的には経理部長とコンプライアンス責任者が、承認限度額や勘定科目表への変更が本番環境に反映される前に必ずレビューし承認する必要があります。エージェントは、ハルシネーションのリスクにより内部統制の抜け穴が生じたり締め期間の不変性原則に違反したりすることを避けるため、人間のレビューなしに期締めの自動実行、締められた期間の再開、または本番の承認マトリクスの編集を行う権限を絶対に与えられてはなりません。"
      ),
      NOTE("Log prompt và output của AI agent nên được lưu lại kèm cấu hình approval matrix hoặc ca test được tạo ra, phục vụ truy vết khi kiểm toán SOX yêu cầu giải trình nguồn gốc thay đổi kiểm soát nội bộ.", "AI agent prompts and outputs should be logged alongside generated approval-matrix configurations or test cases, for traceability when a SOX audit requires explaining the origin of an internal-control change.", "SOX監査で内部統制の変更の出所説明が求められた際の追跡性のため、AIエージェントのプロンプトと出力は生成された承認マトリクス設定やテストケースとともにログ保存すべきです。"),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao thiết kế test case cho tính năng duyệt PO theo nhiều cấp dựa trên hạn mức?",
        "How would you design test cases for a multi-tier PO approval feature based on approval limits?",
        "Tôi xác định trước bất biến cần giữ: cấp duyệt thực tế phải ≥ cấp yêu cầu theo ma trận (phòng ban x loại chi phí x giá trị), và người tạo không được là người duyệt. Sau đó tôi dùng decision table cho tổ hợp phòng ban/loại chi phí, kết hợp boundary value analysis quanh từng ngưỡng hạn mức (limit-1/limit/limit+1) ở mọi cấp, và luôn có ca kiểm tra SoD kể cả khi có uỷ quyền tạm thời. Oracle luôn là so sánh cấp thực tế với cấp resolve từ cấu hình, không phải chỉ kiểm tra 'PO đã được duyệt'.",
        "I'd first identify the invariants to preserve: the actual approval tier must be ≥ the tier required by the matrix (department x expense type x value), and the creator must never be the approver. Then I'd use a decision table for department/expense-type combinations, combined with boundary value analysis around each limit threshold (limit-1/limit/limit+1) at every tier, and always include an SoD case even under temporary delegation. The oracle is always comparing the actual tier to the tier resolved from configuration, not just checking that 'the PO was approved.'",
        "承認限度額に基づく複数階層のPO承認機能のテストケースをどう設計しますか？",
        "まず維持すべき不変条件を特定します：実際の承認階層はマトリクス（部門×費用区分×金額）が要求する階層以上でなければならず、起票者が承認者になってはいけません。次に、部門/費用区分の組み合わせに対するデシジョンテーブルを使い、各階層の限度額境界（限度額-1/限度額/限度額+1）に対する境界値分析を組み合わせ、一時的な委任がある場合でも必ずSoDのケースを含めます。オラクルは常に、実際の階層と設定から解決された階層を比較することであり、単に「POが承認された」ことを確認するだけではありません。"
      ),
      QA(
        "Nếu phát hiện một bút toán GL bị mất cân đối trong production, bạn điều tra và đề xuất fix thế nào?",
        "If you discover a GL entry is unbalanced in production, how would you investigate and propose a fix?",
        "Trước hết tôi truy vết sourceDocId của bút toán lệch để xác định giao dịch gốc (invoice, PO, hay bút toán điều chỉnh thủ công), sau đó kiểm tra bảng mapping tài khoản xem có rule mới thêm gần đây gây lệch không. Tôi viết test case tái hiện đúng tổ hợp dữ liệu gây lỗi trước khi đề xuất fix, và đề xuất thêm một guard ở tầng ghi GL để từ chối post ngay từ đầu nếu tổng Nợ khác tổng Có, thay vì để lọt vào rồi phát hiện sau qua đối soát.",
        "First I'd trace the sourceDocId of the unbalanced entry to identify the originating transaction (an invoice, a PO, or a manual adjusting entry), then check the account-mapping table for a recently added rule causing the discrepancy. I'd write a test case reproducing the exact data combination causing the bug before proposing a fix, and propose adding a guard at the GL-posting layer to reject the post upfront if total debit differs from total credit, rather than letting it through and catching it later via reconciliation.",
        "本番環境でGL仕訳が不均衡になっていることを発見した場合、どのように調査し、修正を提案しますか？",
        "まず、不均衡な仕訳のsourceDocIdを追跡して元の取引（請求書、PO、または手動の調整仕訳）を特定し、次に勘定科目マッピングテーブルを確認して最近追加されたルールが不一致を引き起こしていないか調べます。修正を提案する前に、バグを引き起こす正確なデータの組み合わせを再現するテストケースを書き、対査で後から発見するのではなく、借方合計と貸方合計が異なる場合に最初から計上を拒否するガードをGL計上層に追加することを提案します。"
      ),
      QA(
        "Bạn xử lý thế nào khi nghiệp vụ yêu cầu 'điều chỉnh số liệu' cho một chứng từ thuộc kỳ đã khoá?",
        "How would you handle a business request to 'adjust figures' for a document belonging to an already-closed period?",
        "Nguyên tắc bất biến là không bao giờ sửa/xoá trực tiếp chứng từ gốc của kỳ đã khoá — dù yêu cầu đến từ ai. Thay vào đó, hệ thống phải tạo một bút toán điều chỉnh (adjusting entry) mới ở kỳ hiện tại đang mở, tham chiếu ngược lại chứng từ gốc qua trường reference, và bút toán điều chỉnh này vẫn phải tuân theo bất biến Nợ = Có. Về kiểm thử, tôi luôn có ca xác nhận chứng từ gốc trong kỳ đã khoá giữ nguyên y hệt trước và sau khi có yêu cầu điều chỉnh.",
        "The invariant principle is to never directly edit or delete an original document from a closed period, no matter who requests it. Instead, the system must create a new adjusting entry in the currently open period, referencing back to the original document, and this adjusting entry must still satisfy the debit = credit invariant. For testing, I always include a case confirming the original document in the closed period remains byte-for-byte identical before and after the adjustment request.",
        "既に締められた期間に属する文書に対して「数値を調整してほしい」という業務要求があった場合、どう対応しますか？",
        "不変の原則は、誰からの要求であっても締められた期間の元の文書を直接修正・削除しないことです。代わりに、システムは現在開いている期間に新しい調整仕訳を作成し、参照フィールドで元の文書を逆参照する必要があり、この調整仕訳も借方=貸方の不変条件を満たさなければなりません。テストの観点では、調整要求の前後で締められた期間の元の文書が完全に同一のままであることを確認するケースを常に含めます。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Giả sử bạn phát hiện một PO trị giá 300 triệu đồng được duyệt hợp lệ bởi giám đốc tài chính, nhưng 3-way match cho thấy Invoice cao hơn PO 15% và hệ thống vẫn cho thanh toán vì dung sai cấu hình quá rộng (20%). Bạn sẽ trình bày báo cáo bug/rủi ro thế nào, và đề xuất kiểm tra bổ sung nào để đảm bảo không còn cấu hình dung sai quá lỏng ở các loại chi phí khác?",
        "Suppose you discover a 300-million-VND PO was validly approved by the CFO, but the 3-way match shows the Invoice is 15% higher than the PO, and the system still allowed payment because the configured tolerance was too wide (20%). How would you write the bug/risk report, and what additional checks would you propose to ensure no similarly loose tolerance configuration exists for other expense types?",
        "面接シナリオ",
        "3億ドンのPOがCFOによって有効に承認されたものの、3ウェイマッチで請求書がPOより15%高いことが判明し、設定された許容誤差が広すぎた（20%）ためシステムが支払いを許可してしまったことを発見したとします。バグ・リスクレポートをどのように書き、他の費用区分についても同様に緩すぎる許容誤差設定がないことを確認するためにどのような追加チェックを提案しますか？"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き渡しチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi qua toàn bộ vòng đời kiểm thử cho bài toán mua hàng đa cấp duyệt và hạch toán sổ cái của một hệ thống ERP thực tế, từ bối cảnh doanh nghiệp, kiến trúc Procure-to-Pay, bất biến kế toán/duyệt/khoá kỳ, đến automation, ca lỗi chuyên sâu, hậu kiểm cuối kỳ, CI/CD, và tích hợp AI. Điểm cốt lõi xuyên suốt là oracle-first: mọi assertion đều bám vào bất biến Nợ = Có tuyệt đối, cấp duyệt thực tế phải khớp cấu hình ma trận hạn mức, và tính bất biến tuyệt đối của chứng từ thuộc kỳ đã khoá, thay vì chỉ dựa vào mã trạng thái HTTP hay giả định 'nhìn có vẻ hợp lý', giúp bộ test bền vững trước thay đổi giao diện và phát hiện đúng những lỗi có thể dẫn đến sai lệch báo cáo tài chính hoặc vi phạm kiểm soát nội bộ SOX nghiêm trọng.",
        "This article has walked through the full testing lifecycle for a real-world ERP's multi-tier purchase approval and ledger-posting problem, from business context and Procure-to-Pay architecture to accounting/approval/period-close invariants, automation, deep failure cases, period-end post-checks, CI/CD, and AI integration. The throughline is oracle-first testing: every assertion anchors to the exact debit-equals-credit invariant, the actual approval tier matching the configured limit matrix, and the absolute immutability of documents in a closed period, rather than relying on HTTP status codes or a 'looks plausible' assumption, keeping the test suite resilient to UI changes while reliably catching defects that could misstate financial reports or seriously breach SOX internal controls.",
        "本稿では、実際のERPシステムにおける多階層の購買承認と元帳計上の課題について、事業背景・Procure-to-Payアーキテクチャから会計/承認/期締めの不変条件、自動化、高度な異常系、期末事後検証、CI/CD、AI統合まで、テストのライフサイクル全体を解説しました。一貫した核心はオラクルファーストであることです。すべてのアサーションは、HTTPステータスコードや「妥当に見える」という前提ではなく、借方=貸方の厳密な不変条件、実際の承認階層が設定された限度額マトリクスと一致すること、そして締められた期間の文書の絶対的な不変性に基づいており、UI変更に強く、財務報告の虚偽記載や深刻なSOX内部統制違反につながりうる不具合を確実に検出できるテストスイートを実現します。"
      ),
      UL(
        [
          "Đã xác định 5 bất biến nghiệp vụ làm oracle cho toàn bộ test suite (cân đối GL, hạn mức duyệt, SoD, bất biến kỳ khoá, 3-way match)",
          "Đã phủ 3 tầng kim tự tháp: unit cho resolver hạn mức/cân đối bút toán, integration cho luồng P2P xuyên service, E2E cho happy path và khoá kỳ",
          "Đã có ca tự duyệt qua uỷ quyền chồng chéo, bút toán mất cân đối do lỗi mapping, và sửa chứng từ sau khoá kỳ",
          "Đã gắn batch đối soát cuối kỳ làm lưới an toàn trước khi cho phép khoá kỳ",
          "Đã xác định ranh giới AI agent: đề xuất/tóm tắt cấu hình, không tự động khoá/mở kỳ hoặc sửa approval matrix production",
        ],
        [
          "Defined 5 business invariants as the oracle for the entire test suite (GL balance, approval limits, SoD, closed-period immutability, 3-way match)",
          "Covered all 3 pyramid layers: unit for limit resolver/entry-balance, integration for the cross-service P2P flow, E2E for happy path and period close",
          "Added self-approval-via-overlapping-delegation, mapping-error unbalanced-entry, and post-close-edit cases",
          "Wired in a period-end reconciliation batch as a safety net before allowing period close",
          "Defined AI agent boundaries: propose/summarize configuration only, never auto-close/reopen a period or edit the production approval matrix",
        ],
        [
          "テストスイート全体のオラクルとして5つの業務不変条件を定義した（GLバランス、承認限度額、SoD、締め期間の不変性、3ウェイマッチ）",
          "ピラミッドの3層すべてをカバーした：限度額リゾルバ/仕訳バランスのユニット、サービス横断P2Pフローの結合、ハッピーパスと期締めのE2E",
          "重複委任による自己承認、マッピングエラーによる仕訳不均衡、締め後の修正のケースを追加した",
          "期締めを許可する前の安全網として期末対査バッチを組み込んだ",
          "AIエージェントの境界を定義した：設定の提案・要約のみで、期間の自動締め・再開や本番承認マトリクスの編集は行わない",
        ]
      ),
      TIP("Trước khi bàn giao, chạy lại toàn bộ ca P1 3 lần liên tiếp để xác nhận không flaky, và đính kèm báo cáo coverage của approval resolver cùng kết quả batch đối soát cuối kỳ gần nhất vào tài liệu release.", "Before handover, re-run all P1 cases 3 consecutive times to confirm they're not flaky, and attach the approval-resolver coverage report along with the latest period-end reconciliation batch results to the release documentation.", "引き渡し前に、フレークでないことを確認するためP1ケースをすべて3回連続で再実行し、承認リゾルバのカバレッジレポートと直近の期末対査バッチの結果をリリース資料に添付してください。"),
    ],
  },
];

const art4 = {
  categorySlug: "enterprise-realworld",
  slug: "erp-purchase-approval-gl-close",
  cover: cover4,
  tags: tags("thucchien", "erp", "api", "datadriven", "realworld"),
  title: {
    vi: "Thực chiến: mua hàng đa cấp duyệt (PR→PO→GRN→Invoice), hạch toán GL & khoá kỳ kế toán trong ERP",
    en: "Enterprise: multi-tier purchase approval (PR→PO→GRN→Invoice), GL posting & period close in ERP",
    ja: "実戦：ERPにおける多階層購買承認（PR→PO→GRN→請求書）、GL計上と期締め",
  },
  summary: {
    vi: "Bài sâu: bối cảnh, kiến trúc Procure-to-Pay, bất biến cân đối GL/hạn mức duyệt/khoá kỳ, test plan, ma trận ca, automation, ca lỗi SoD/mất cân đối/sửa sau khoá kỳ, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: context, Procure-to-Pay architecture, GL-balance/approval-limit/period-close invariants, test plan, case matrix, automation, SoD/unbalanced/post-close-edit failure cases, reconciliation, CI, AI, interview.",
    ja: "詳細解説：背景、Procure-to-Payアーキテクチャ、GLバランス/承認限度額/期締めの不変条件、テスト計画、ケースマトリクス、自動化、SoD/不均衡/締め後修正の異常系、対査、CI、AI、面接。",
  },
  pages: buildDoc(pages4),
};

export const THUCCHIEN_03_DOCS = [art1, art2, art3, art4];
