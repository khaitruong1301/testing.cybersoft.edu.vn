// doc_ma_l10n_advanced.mjs — BÀI MANUAL NÂNG CAO (advanced):
// Kiểm thử bản địa hóa & quốc tế hóa nâng cao (i18n/L10n edge cases) — sàn TMĐT bán hàng
// đa quốc gia GlobalMart (VN/JP/UAE). Tập trung EDGE CASE: múi giờ & DST/đổi ngày, tiền tệ &
// làm tròn theo vùng (ISO 4217 exponent), định dạng số/ngày, RTL, sắp xếp theo locale, độ dài
// chuỗi dịch, ký tự unicode/emoji, đơn vị đo. KHÔNG trùng bài người mới
// "kiem-thu-da-ngon-ngu-localization-cho-nguoi-moi". Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "nangcao", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle, description: cfg.metaDescription, slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword, keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq), courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "ecommerce", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình đơn hàng GlobalMart hiển thị SAI giờ & SAI tiền, annotate lỗi ──
const m_screen = browser("globalmart.vn/don-hang/GM-88231", [
  field(24, 20, 330, "Giờ đặt hàng (hiển thị cho khách Tokyo)", "15/03 00:30", "normal"),
  field(372, 20, 330, "Tổng tiền sau giảm giá (JPY)", "¥2.699,10", "normal"),
  field(24, 92, 330, "Trạng thái áp mã Flash Sale 14/3", "KHÔNG áp dụng", "error"),
  field(372, 92, 330, "Ngày đối soát thanh toán", "15/03/2025", "normal"),
  annotate(20, 12, 330, 62, "SAI: đơn đặt trong khung giờ Flash Sale nhưng bị tính lệch ngày do DST"),
  annotate(368, 12, 330, 62, "SAI: JPY không có phần thập phân — phải là ¥2.699"),
  btn(24, 168, 220, "Xem chi tiết đối soát", "danger"),
].join(""), { h: 232, title: "GlobalMart · Chi tiết đơn hàng", accent: "#0f766e" });

// ── Mockup 2: bảng edge case bản địa hóa theo vùng — VN / JP / UAE ──
const m_region = grid("Bảng edge case bản địa hóa theo vùng — Việt Nam / Nhật Bản / UAE", ["Hạng mục", "Việt Nam (vi-VN)", "Nhật Bản (ja-JP)", "UAE (ar-AE)"], [
  ["Múi giờ chuẩn", "UTC+7, không có DST", "UTC+9, không có DST", "UTC+4, không có DST"],
  ["Định dạng ngày mặc định", "dd/mm/yyyy — 15/03/2025", "yyyy/mm/dd — 2025/03/15", "dd/mm/yyyy, có thể kèm lịch Hijri"],
  ["Tiền tệ & số chữ số thập phân", "VND — 0 chữ số (làm tròn đồng)", "JPY — 0 chữ số (làm tròn yên)", "AED — 2 chữ số (fils)"],
  ["Hướng chữ viết", "Trái sang phải (LTR)", "Trái sang phải (LTR)", "Phải sang trái (RTL) với tiếng Ả Rập"],
  ["Sắp xếp theo bảng chữ (collation)", "Theo bảng chữ có dấu vi-VN", "Theo âm on'yomi/kana, khác Unicode thô", "Theo bảng chữ Ả Rập, đảo hướng so LTR"],
  ["Đơn vị đo lường", "Hệ mét: kg, km, °C", "Hệ mét, một số ngành dùng tsubo riêng", "Hệ mét phổ biến nhưng khách quen lb, °F"],
  ["Ký tự đặc biệt cần hỗ trợ", "Dấu tiếng Việt tổ hợp sẵn (precomposed)", "Half-width/full-width, kanji, emoji", "Ký tự Ả Rập nối chữ, số Ả Rập-Đông"],
], { accent: "#0f766e", note: "Mỗi hạng mục là một NGUỒN LỖI riêng — không thể suy ra hạng mục này từ hạng mục khác dù cùng một quốc gia." });

// ── Mockup 3: bảng ca kiểm i18n/L10n nâng cao dùng được ngay trong dự án ──
const m_cases = grid("Bảng ca kiểm i18n/L10n nâng cao — GlobalMart", ["Mã ca", "Hạng mục", "Input / điều kiện kiểm", "Kết quả mong đợi"], [
  ["L10N-01", "Múi giờ & DST", "Đặt hàng 23:50–00:40 giờ Tokyo, đúng dịp Mỹ chuyển giờ DST ở service phụ trợ", "Ngày ghi nhận theo giờ KHÁCH HÀNG, không lệch theo giờ máy chủ phụ trợ"],
  ["L10N-02", "Làm tròn tiền tệ", "Giá 2.999 JPY áp giảm 10% (kết quả có phần thập phân)", "Làm tròn về số nguyên yên theo ISO 4217 (exponent=0), khớp cổng thanh toán"],
  ["L10N-03", "RTL", "Nhập địa chỉ giao hàng bằng tiếng Ả Rập ở trang thanh toán", "Toàn bộ layout lật RTL đúng; số điện thoại/mã đơn vẫn hiển thị LTR"],
  ["L10N-04", "Sắp xếp locale", "Danh sách tên khách có dấu tiếng Việt: Ánh, Ân, A, Àn", "Sắp xếp theo bảng chữ vi-VN, không theo mã Unicode thô"],
  ["L10N-05", "Độ dài chuỗi dịch", "Nút 'Thêm vào giỏ hàng' dịch sang tiếng Ả Rập dài hơn bản gốc ~40%", "Nút không vỡ layout, chữ không bị cắt hay chồng lấp"],
  ["L10N-06", "Unicode/emoji", "Tên sản phẩm chứa emoji 🎉 và ký tự half-width tiếng Nhật", "Lưu & hiển thị đúng, không vỡ thành ký tự lạ (mojibake)"],
  ["L10N-07", "Đơn vị đo", "Cân nặng sản phẩm 2kg hiển thị cho khách UAE quen dùng lb", "Hiển thị đúng đơn vị theo cấu hình vùng, không tự quy đổi sai số"],
], { accent: "#0f766e", highlight: 0, note: "Mỗi ca cần ghi rõ MÚI GIỜ/LOCALE của người kiểm thử — thiếu thông tin này, ca không thể tái hiện chính xác." });

// ── Mockup 4: jira ticket lỗi DST khiến đơn hàng bị tính lệch ngày ──
const m_jira = jira({
  key: "GM-77410", title: "Đơn đặt lúc 00:30 giờ Tokyo (trong khung Flash Sale) bị tính lệch sang ngày hôm sau do DST của service phụ trợ",
  type: "Bug", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "production · promotion-service (chạy tại us-east-1, TZ=America/New_York) · GlobalMart app"],
    ["Các bước", "1) Khách Tokyo đặt hàng 00:30 ngày 15/3 2) promotion-service so khung Flash Sale '14/3' theo giờ local máy chủ 3) Đúng cuối tuần Mỹ chuyển DST, giờ máy chủ lệch thêm 1h"],
    ["Kết quả mong đợi", "Đơn được ghi nhận đúng khung Flash Sale theo giờ khách hàng (Asia/Tokyo), áp mã giảm giá bình thường"],
    ["Kết quả thực tế", "Đơn bị tính là đặt ngày 15/3, ngoài khung khuyến mãi — hệ thống KHÔNG áp mã giảm giá dù khách đặt đúng giờ hiển thị"],
    ["Ảnh hưởng", "Ước tính ~120 đơn/tháng rơi vào các mốc chuyển DST bị tính sai khuyến mãi, phát sinh khiếu nại và hoàn tiền thủ công"],
  ],
});

// ── Mockup 5: kanban theo dõi lỗi i18n/L10n nâng cao ──
const m_kanban = kanban("Bảng theo dõi lỗi i18n/L10n nâng cao (GlobalMart · Sprint 30)", [
  { name: "New", cards: [
    { key: "GM-77410", title: "DST khiến đơn lệch ngày, mất khuyến mãi", sev: "Critical" },
    { key: "GM-77415", title: "JPY hiển thị phần thập phân sai chuẩn", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "GM-77402", title: "Nút 'Thêm vào giỏ' vỡ layout khi dịch tiếng Ả Rập", sev: "Medium" },
  ] },
  { name: "Fixed", cards: [
    { key: "GM-77390", title: "Danh sách khách hàng sắp xếp sai theo dấu tiếng Việt", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "GM-77355", title: "Emoji trong tên sản phẩm hiển thị thành ký tự lạ", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu lỗi i18n/L10n theo nhóm edge case ──
const m_dash = dashboard("Lỗi i18n/L10n theo nhóm edge case — GlobalMart Sprint 30", [
  { label: "Tổng lỗi L10n", value: "23", sub: "sprint này", color: "#2563eb" },
  { label: "Múi giờ/DST/đổi ngày", value: "6", sub: "~26%, mức Critical/High", color: "#e11d48" },
  { label: "Tiền tệ & làm tròn", value: "5", sub: "~22%, ảnh hưởng đối soát", color: "#a16207" },
  { label: "RTL/collation/unicode", value: "12", sub: "~52%, đa số UI/hiển thị", color: "#0f766e" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử bản địa hóa nâng cao (i18n/L10n edge case) khác gì so với kiểm thử đa ngôn ngữ cơ bản?",
  "How is advanced i18n/L10n edge-case testing different from basic multi-language testing?",
  "Kiểm thử đa ngôn ngữ cơ bản chủ yếu kiểm tra bản dịch có đúng, giao diện có đổi theo ngôn ngữ chọn hay không. Kiểm thử bản địa hóa nâng cao đi xa hơn nhiều: nó xét tới các quy tắc VÙNG MIỀN không liên quan trực tiếp tới ngôn ngữ — múi giờ và DST, số chữ số thập phân của từng loại tiền tệ, hướng chữ viết (RTL), thứ tự sắp xếp theo bảng chữ cái của từng locale, độ dài chuỗi dịch khi render, và đơn vị đo. Đây là những lỗi im lặng: giao diện vẫn 'đẹp', bản dịch vẫn 'đúng chữ', nhưng số liệu hoặc ngày giờ hiển thị cho khách lại sai, ảnh hưởng trực tiếp tới tiền bạc và niềm tin khách hàng.",
  "Basic multi-language testing mainly checks whether translations are correct and the UI switches with the selected language. Advanced L10n edge-case testing goes much further: it examines REGIONAL rules not directly tied to language — timezones and DST, the number of decimal digits per currency, writing direction (RTL), locale-specific alphabetical sorting order, translated string length at render time, and units of measurement. These are silent bugs: the UI still looks 'nice', the translation is still 'correct wording', but the number or date/time shown to the customer is wrong, directly affecting money and customer trust.",
  "上級i18n/L10nエッジケーステストは基本的な多言語テストと何が違う？",
  "基本的な多言語テストは主に翻訳が正しいか、選択した言語に応じてUIが切り替わるかを確認します。上級L10nエッジケーステストはさらに踏み込み、言語と直接関係のない地域ルールを検証します——タイムゾーンとDST、通貨ごとの小数桁数、文字の書字方向（RTL）、ロケールごとのアルファベット順ソート、レンダリング時の翻訳文字列の長さ、計測単位です。これらは静かなバグです：UIは『きれい』に見え、翻訳は『言葉として正しい』のに、顧客に表示される数値や日時が間違っており、金銭と顧客の信頼に直接影響します。");
const faq2 = FAQ(
  "Vì sao chỉ đổi hiển thị múi giờ chưa đủ, còn phải kiểm cả DST và ranh giới đổi ngày?",
  "Why isn't simply converting the displayed timezone enough — you also need to test DST and date-change boundaries?",
  "Chuyển đổi múi giờ để HIỂN THỊ đúng giờ địa phương chỉ là phần nổi. Vấn đề nằm ở chỗ nhiều dịch vụ phụ trợ (khuyến mãi, đối soát, hàng tồn kho theo ngày) so sánh mốc thời gian bằng giờ LOCAL của chính máy chủ chứa dịch vụ đó, chứ không phải UTC chuẩn hoá. Nếu máy chủ đó đặt tại vùng có DST, hai lần một năm đồng hồ hệ thống 'nhảy' một giờ — mọi phép so sánh 'trong ngày X hay chưa' quanh mốc nhảy giờ đó có thể sai, đặc biệt với đơn hàng đặt gần nửa đêm. Đây chính là lý do một thị trường không dùng DST (như VN/JP/UAE) vẫn có thể dính lỗi DST nếu có bất kỳ service phụ trợ nào chạy ở vùng có DST.",
  "Converting the displayed timezone to local time is only the visible part. The real issue is that many backend services (promotions, reconciliation, day-based inventory) compare timestamps using the LOCAL clock of the server hosting that service, not normalized UTC. If that server sits in a DST region, the system clock 'jumps' by one hour twice a year — every 'is it still day X' comparison around that jump can be wrong, especially for orders placed near midnight. That's why a market that doesn't observe DST (like VN/JP/UAE) can still be hit by a DST bug if any backend service happens to run in a DST region.",
  "タイムゾーン表示の変換だけでは不十分で、DSTと日付境界もテストすべき理由は？",
  "表示用にローカル時間へ変換するのは目に見える部分だけです。本当の問題は、多くのバックエンドサービス（プロモーション、消込、日次在庫）が正規化されたUTCではなく、そのサービスをホストするサーバーのローカル時計でタイムスタンプを比較していることです。そのサーバーがDST地域にあると、年に2回システム時計が1時間『飛び』、その飛ぶ瞬間周辺の『まだX日か』という比較は全て誤りうります——特に深夜近くの注文で顕著です。だからDSTを採用しない市場（VN/JP/UAEなど）でも、DST地域で動くバックエンドサービスが1つでもあればDSTバグに遭遇し得るのです。");
const faq3 = FAQ(
  "Vì sao làm tròn tiền tệ theo vùng lại quan trọng đến vậy, không phải chỉ là chuyện hiển thị đẹp?",
  "Why does currency rounding by region matter so much — isn't it just a display cosmetic issue?",
  "Mỗi đồng tiền có số chữ số thập phân chuẩn riêng theo ISO 4217: JPY và VND có 0 chữ số thập phân (đơn vị nhỏ nhất là 1 yên/1 đồng), trong khi USD hay AED có 2 chữ số. Nếu hệ thống dùng chung một logic làm tròn 2 chữ số cho MỌI đồng tiền, giá trị hiển thị cho khách JPY/VND sẽ sai ngay từ giao diện — nhưng nguy hiểm hơn, nếu lỗi nằm ở TẦNG TÍNH GIÁ (không chỉ hiển thị), số tiền thực sự bị trừ/thu có thể lệch với số tiền cổng thanh toán ghi nhận, gây lệch sổ sách khi đối soát hàng loạt đơn hàng — một lỗi tài chính thật, không chỉ là vấn đề thẩm mỹ.",
  "Every currency has its own standard number of decimal digits per ISO 4217: JPY and VND have 0 decimal digits (the smallest unit is 1 yen/1 dong), while USD or AED have 2. If a system applies one shared 2-decimal rounding logic to EVERY currency, the amount shown to JPY/VND customers is wrong right at the UI — but worse, if the bug is at the PRICING layer (not just display), the amount actually charged can mismatch what the payment gateway records, causing ledger discrepancies when reconciling bulk orders — a real financial bug, not just a cosmetic one.",
  "通貨ごとの丸め処理がそれほど重要な理由は？単なる表示の見栄えの問題ではないの？",
  "各通貨にはISO 4217で定められた固有の小数桁数があります：JPYとVNDは0桁（最小単位は1円/1ドン）、USDやAEDは2桁です。全通貨に共通の2桁丸めロジックを適用すると、JPY/VND顧客に表示される金額はUI時点で既に間違っています——しかしさらに深刻なのは、バグが表示層ではなく価格計算層にある場合、実際に請求される金額が決済ゲートウェイの記録と食い違い、大量注文の消込時に帳簿の不一致を引き起こすことです。これは見た目の問題ではなく、実際の財務上のバグです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao một thị trường không áp dụng DST (như Việt Nam, Nhật Bản, UAE) vẫn có thể dính lỗi liên quan DST?", en: "Why can a market that doesn't observe DST (like Vietnam, Japan, UAE) still be hit by a DST-related bug?", ja: "DSTを採用しない市場（ベトナム、日本、UAEなど）でもDST関連バグに遭遇し得るのはなぜ？" },
    options: [
      { vi: "Vì Google Chrome tự động bật DST cho mọi trang web", en: "Because Google Chrome automatically enables DST for every website", ja: "Google Chromeが全てのウェブサイトにDSTを自動で有効化するから" },
      { vi: "Vì một dịch vụ phụ trợ (khuyến mãi, đối soát...) có thể đang chạy trên máy chủ đặt ở vùng CÓ DST, so sánh giờ theo giờ local máy chủ đó", en: "Because a backend service (promotion, reconciliation...) may run on a server located in a region THAT DOES observe DST, comparing time using that server's local clock", ja: "プロモーションや消込などのバックエンドサービスがDSTを採用する地域のサーバーで動き、そのサーバーのローカル時計で時刻比較しているから" },
      { vi: "Vì khách hàng ở các nước đó luôn đặt hàng vào ban ngày", en: "Because customers in those countries always order during daytime", ja: "その国の顧客は常に日中に注文するから" },
      { vi: "Vì DST chỉ ảnh hưởng tới ứng dụng di động, không ảnh hưởng web", en: "Because DST only affects mobile apps, not web", ja: "DSTはモバイルアプリにのみ影響し、ウェブには影響しないから" },
    ], correct: 1,
    explain: { vi: "Nếu service phụ trợ so sánh mốc thời gian bằng giờ local của máy chủ đặt ở vùng có DST, đồng hồ hệ thống 'nhảy' 1 giờ hai lần một năm sẽ làm sai các phép so sánh ngày, dù thị trường phục vụ không dùng DST.", en: "If a backend service compares timestamps using the local clock of a server in a DST region, the system clock jumping 1 hour twice a year will break date comparisons, even though the served market doesn't observe DST.", ja: "バックエンドサービスがDST地域のサーバーのローカル時計でタイムスタンプを比較すると、年2回のシステム時計の1時間シフトが日付比較を狂わせます。対象市場がDSTを採用していなくても発生します。" },
  }),
  mcq({
    q: { vi: "Theo chuẩn ISO 4217, JPY và VND có bao nhiêu chữ số thập phân?", en: "Per the ISO 4217 standard, how many decimal digits do JPY and VND have?", ja: "ISO 4217規格でJPYとVNDの小数桁数はいくつ？" },
    options: [
      { vi: "2 chữ số thập phân, giống USD", en: "2 decimal digits, same as USD", ja: "USDと同じ2桁" },
      { vi: "0 chữ số thập phân — đơn vị nhỏ nhất là 1 yên/1 đồng", en: "0 decimal digits — the smallest unit is 1 yen/1 dong", ja: "0桁——最小単位は1円/1ドン" },
      { vi: "3 chữ số thập phân", en: "3 decimal digits", ja: "3桁" },
      { vi: "Không cố định, tùy sàn TMĐT tự quy định", en: "Not fixed, each e-commerce platform decides freely", ja: "固定されておらず、各ECサイトが自由に決める" },
    ], correct: 1,
    explain: { vi: "JPY và VND có exponent = 0 theo ISO 4217, tức không có phần thập phân; dùng chung logic làm tròn 2 chữ số của USD sẽ ra kết quả sai.", en: "JPY and VND have exponent = 0 per ISO 4217, meaning no decimal part; reusing USD's 2-decimal rounding logic produces wrong results.", ja: "JPYとVNDはISO 4217でexponent=0、つまり小数部がありません。USDの2桁丸めロジックを流用すると誤った結果になります。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử giao diện RTL (phải-sang-trái) cho tiếng Ả Rập, điều gì KHÔNG nên bị đảo hướng?", en: "When testing an RTL (right-to-left) UI for Arabic, what should NOT be mirrored?", ja: "アラビア語のRTL（右から左）UIをテストする際、反転してはいけないものは？" },
    options: [
      { vi: "Toàn bộ layout menu và thanh điều hướng", en: "The entire menu layout and navigation bar", ja: "メニューとナビゲーションバー全体のレイアウト" },
      { vi: "Vị trí icon và hướng mũi tên điều hướng", en: "Icon positions and navigation arrow directions", ja: "アイコンの位置とナビゲーション矢印の向き" },
      { vi: "Số điện thoại, mã đơn hàng và các chuỗi số khác", en: "Phone numbers, order codes and other numeric strings", ja: "電話番号、注文コードなどの数値文字列" },
      { vi: "Hướng cuộn của danh sách sản phẩm", en: "The scroll direction of the product list", ja: "商品リストのスクロール方向" },
    ], correct: 2,
    explain: { vi: "Số điện thoại, mã đơn hàng vẫn cần đọc theo hướng số học bình thường (LTR) dù toàn bộ layout xung quanh đã lật RTL — đảo cả số là lỗi thường gặp khi làm RTL vội.", en: "Phone numbers and order codes still need to read in normal numeric direction (LTR) even though the surrounding layout is mirrored RTL — mirroring the numbers too is a common bug in rushed RTL work.", ja: "電話番号や注文コードは、周囲のレイアウトがRTLに反転していても通常の数字の向き（LTR）で読める必要があります。数字まで反転させるのは急いだRTL対応でよくあるバグです。" },
  }),
  mcq({
    q: { vi: "Vì sao sắp xếp danh sách tên khách hàng tiếng Việt theo mã Unicode thô lại là lỗi bản địa hóa?", en: "Why is sorting a list of Vietnamese customer names by raw Unicode code point a localization bug?", ja: "ベトナム語の顧客名リストを生のUnicodeコードポイントでソートするのがローカライズバグである理由は？" },
    options: [
      { vi: "Vì mã Unicode thô không phản ánh đúng thứ tự bảng chữ cái có dấu của người dùng, gây ra thứ tự 'trông sai' dù kỹ thuật không lỗi cú pháp", en: "Because raw Unicode order doesn't reflect the user's actual accented alphabetical order, producing an order that 'looks wrong' even though there's no syntax error", ja: "生のUnicode順はユーザーの実際のアクセント付きアルファベット順を反映せず、構文エラーはなくても『順序がおかしく見える』結果になるから" },
      { vi: "Vì Unicode không hỗ trợ tiếng Việt", en: "Because Unicode doesn't support Vietnamese", ja: "Unicodeはベトナム語をサポートしていないから" },
      { vi: "Vì sắp xếp theo Unicode luôn làm app bị treo", en: "Because sorting by Unicode always crashes the app", ja: "Unicodeでソートすると常にアプリがクラッシュするから" },
      { vi: "Vì đây không phải lỗi, chỉ là ý kiến cá nhân của người dùng", en: "Because this isn't a bug, just a user's personal opinion", ja: "これはバグではなく、単なるユーザーの個人的な意見だから" },
    ], correct: 0,
    explain: { vi: "Sắp xếp theo locale (collation) cần dùng quy tắc riêng của từng ngôn ngữ; sắp theo mã Unicode thô đặt các ký tự có dấu sai vị trí so với kỳ vọng người bản ngữ.", en: "Locale-aware sorting (collation) needs each language's own rule; sorting by raw Unicode places accented characters in positions native speakers don't expect.", ja: "ロケール対応ソート（collation）には各言語固有のルールが必要です。生のUnicodeでソートすると、アクセント付き文字がネイティブスピーカーの期待と異なる位置に置かれます。" },
  }),
  mcq({
    q: { vi: "Trong bài, tại sao độ dài chuỗi dịch (ví dụ nút bấm dịch sang tiếng Ả Rập) lại cần được kiểm thử riêng?", en: "In the article, why does translated string length (e.g. a button translated into Arabic) need to be tested separately?", ja: "本記事で、翻訳文字列の長さ（アラビア語に翻訳されたボタンなど）を個別にテストする必要がある理由は？" },
    options: [
      { vi: "Vì chuỗi dịch có thể dài hơn/ngắn hơn đáng kể bản gốc, dễ làm vỡ layout dù bản dịch hoàn toàn chính xác về nghĩa", en: "Because translated strings can be significantly longer/shorter than the original, easily breaking layout even when the translation is fully correct in meaning", ja: "翻訳文字列は原文より大幅に長く/短くなり得るため、意味的に完全に正しい翻訳でもレイアウトを崩しやすいから" },
      { vi: "Vì tiếng Ả Rập không có ký tự chữ cái", en: "Because Arabic has no alphabet characters", ja: "アラビア語にはアルファベット文字がないから" },
      { vi: "Vì độ dài chuỗi không bao giờ ảnh hưởng tới giao diện", en: "Because string length never affects the UI", ja: "文字列の長さがUIに影響することは決してないから" },
      { vi: "Vì chỉ cần kiểm thử ngữ nghĩa, không cần kiểm thử giao diện", en: "Because only meaning needs testing, not the UI", ja: "意味だけをテストすればよく、UIはテスト不要だから" },
    ], correct: 0,
    explain: { vi: "Một nút 'Thêm vào giỏ hàng' ngắn gọn ở tiếng Anh có thể dài hơn 30-50% khi dịch sang tiếng Đức hay Ả Rập — layout cứng nhắc sẽ cắt chữ hoặc vỡ nút dù bản dịch đúng.", en: "A short 'Add to cart' button in English can be 30-50% longer when translated into German or Arabic — a rigid layout will truncate text or break the button even with a correct translation.", ja: "英語の短い『カートに追加』ボタンは、ドイツ語やアラビア語に翻訳すると30〜50%長くなることがあります。硬直したレイアウトは、翻訳が正しくても文字を切り詰めたりボタンを崩したりします。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử bản địa hóa & quốc tế hóa nâng cao (i18n/L10n) không dừng ở việc dịch giao diện — nó đào sâu vào những EDGE CASE dễ bị bỏ sót nhất: múi giờ và quy tắc giờ mùa hè (DST) làm sai lệch ngày giờ, làm tròn tiền tệ khác nhau giữa các đồng tiền có số chữ số thập phân khác nhau, chữ viết phải-sang-trái (RTL), thứ tự sắp xếp theo bảng chữ cái từng locale, độ dài chuỗi dịch làm vỡ giao diện, ký tự Unicode/emoji, và đơn vị đo. Bài này bám sát sàn TMĐT GlobalMart bán hàng sang Việt Nam, Nhật Bản và UAE: bạn học cách thiết kế ca kiểm thử cho từng nhóm edge case, đọc hai tình huống lỗi thật (đơn hàng lệch ngày do DST, giá JPY làm tròn sai), và có sẵn một bảng ca kiểm i18n nâng cao dùng ngay được trong dự án thực tế.",
        "Advanced localization & internationalization (i18n/L10n) testing doesn't stop at translating the UI — it digs into the edge cases most easily missed: timezones and Daylight Saving Time (DST) rules skewing dates, currency rounding differing across currencies with different decimal digit counts, right-to-left (RTL) script, locale-specific alphabetical sorting order, translated string length breaking layouts, Unicode/emoji characters, and units of measurement. This article follows GlobalMart, an e-commerce platform selling into Vietnam, Japan and UAE: you'll learn to design test cases for each edge-case group, read two real bug situations (an order dated wrong due to DST, a mispriced JPY rounding), and get an advanced i18n case table ready to reuse in a real project.",
        "上級ローカライズ・国際化（i18n/L10n）テストは、UIの翻訳だけでは終わりません。最も見落とされやすいエッジケースに踏み込みます——タイムゾーンと夏時間（DST）ルールによる日付のずれ、通貨ごとに異なる小数桁数による丸めの違い、右から左（RTL）の文字表記、ロケールごとのアルファベット順ソート、レイアウトを崩す翻訳文字列の長さ、Unicode/絵文字文字、計測単位です。本記事はベトナム・日本・UAEに販売するECプラットフォームGlobalMartに沿い、各エッジケース群のテストケース設計、2つの実例バグ（DSTによる日付ずれ、JPYの丸め誤り）、実際のプロジェクトですぐ使える上級i18nケース表を学びます。"),
      P("Nếu bạn đã quen kiểm thử đa ngôn ngữ cơ bản — đổi ngôn ngữ, kiểm bản dịch có hiển thị đúng không — chương này đưa bạn lên một tầng sâu hơn nhiều: điều gì xảy ra khi hai KHÁCH HÀNG cùng bấm 'Đặt hàng' vào cùng một khoảnh khắc vật lý, nhưng hệ thống lại ghi nhận họ ở hai NGÀY khác nhau vì lệch múi giờ nội bộ? Điều gì xảy ra khi giá tiền hiển thị đúng đến từng xu, nhưng số tiền THỰC bị trừ lại lệch vì đồng tiền đó không có phần thập phân? Đây chính là kiểu bài toán mà kiểm thử bản địa hóa nâng cao được sinh ra để giải quyết, và nó xuất hiện thường xuyên nhất ở các hệ thống TMĐT bán hàng xuyên biên giới như GlobalMart.",
        "If you're already comfortable with basic multi-language testing — switching languages, checking that translations render correctly — this chapter takes you much deeper: what happens when two CUSTOMERS click 'Order' at the exact same physical moment, yet the system records them on two different DATES because of an internal timezone mismatch? What happens when the price displayed is correct to the cent, yet the ACTUAL amount charged is off because that currency has no decimal part? This is exactly the kind of problem advanced localization testing exists to solve, and it shows up most often in cross-border e-commerce systems like GlobalMart.",
        "基本的な多言語テスト——言語切り替え、翻訳が正しく表示されるかの確認——に慣れているなら、本章はさらに一段深いレベルへ導きます：2人の顧客が物理的に全く同じ瞬間に『注文する』をクリックしたのに、内部のタイムゾーンのずれによりシステムが2つの異なる日付として記録するとどうなるか？表示価格は1セント単位まで正しいのに、実際に請求される金額がその通貨に小数部がないためにずれるとどうなるか？これこそ上級ローカライズテストが解決すべき問題であり、GlobalMartのような国境を越えるECシステムで最も頻繁に現れます。"),
      IMG(m_screen, "Màn hình test: đơn hàng GlobalMart bị tính lệch ngày (DST) và hiển thị sai làm tròn tiền JPY", "Screen under test: a GlobalMart order miscalculated by a day (DST) and showing wrong JPY rounding", "テスト対象画面：DSTにより日付がずれ、JPYの丸めが誤って表示されるGlobalMartの注文"),
      DEF("i18n/L10n edge case", "các trường hợp bản địa hóa/quốc tế hóa ngoài việc dịch chữ — múi giờ & DST, làm tròn tiền tệ theo vùng, RTL, sắp xếp locale, độ dài chuỗi dịch, unicode/emoji, đơn vị đo — dễ gây lỗi im lặng vì giao diện vẫn 'trông đúng' nhưng số liệu/ngày giờ sai.",
        "localization/internationalization cases beyond text translation — timezones & DST, region-specific currency rounding, RTL, locale sorting, translated string length, unicode/emoji, units of measurement — prone to silent bugs because the UI still 'looks right' while the numbers or date/time are wrong.",
        "文字の翻訳を超えたローカライズ/国際化のケース——タイムゾーンとDST、地域別の通貨丸め、RTL、ロケールソート、翻訳文字列の長さ、Unicode/絵文字、計測単位。UIは『正しく見える』のに数値や日時が間違っているため、静かなバグを生みやすい。"),
    ] },
  { heading: { vi: "2. Múi giờ, DST và ranh giới đổi ngày — khái niệm nền", en: "2. Timezones, DST and date-change boundaries — foundational concepts", ja: "2. タイムゾーン、DST、日付境界——基礎概念" },
    blocks: [
      P("Múi giờ tưởng chừng đơn giản — chỉ là cộng/trừ số giờ so với UTC — nhưng thực tế có ba lớp phức tạp chồng lên nhau mà tester phải phân biệt rõ: (1) OFFSET cố định của một vùng so với UTC, ví dụ Asia/Tokyo là UTC+9; (2) QUY TẮC DST (Daylight Saving Time) khiến offset đó THAY ĐỔI hai lần một năm ở một số vùng (Mỹ, Châu Âu, Úc...) nhưng KHÔNG áp dụng ở VN/JP/UAE; và (3) RANH GIỚI ĐỔI NGÀY — thời điểm hệ thống coi là 'hết ngày X, sang ngày X+1', vốn phải tính theo múi giờ NGƯỜI DÙNG chứ không phải múi giờ máy chủ lưu trữ.",
        "Timezones seem simple — just adding/subtracting hours from UTC — but there are actually three overlapping layers a tester must distinguish: (1) a region's fixed OFFSET from UTC, e.g. Asia/Tokyo is UTC+9; (2) DST (Daylight Saving Time) RULES that make that offset CHANGE twice a year in some regions (US, Europe, Australia...) but NOT in VN/JP/UAE; and (3) the DATE-CHANGE BOUNDARY — the moment the system considers 'day X over, day X+1 begins', which must be computed using the USER's timezone, not the storage server's timezone.",
        "タイムゾーンは単純そう——UTCに対する時間の加減算だけ——に見えますが、実際にはテスターが区別すべき3つの層が重なっています：(1) ある地域のUTCに対する固定オフセット（例：Asia/TokyoはUTC+9）、(2) 一部地域（米国、欧州、豪州など）で年2回そのオフセットを変化させるDST（夏時間）ルール（ただしVN/JP/UAEには適用されない）、(3) 『X日が終わりX+1日が始まる』とシステムが判断する日付境界——これはストレージサーバーのタイムゾーンではなく、ユーザーのタイムゾーンで計算されなければならない。"),
      IMG(m_region, "Bảng edge case bản địa hóa theo vùng: múi giờ, tiền tệ, RTL, sắp xếp, đơn vị đo — VN/JP/UAE", "Regional localization edge-case table: timezone, currency, RTL, sorting, units — VN/JP/UAE", "地域別ローカライズエッジケース表：タイムゾーン、通貨、RTL、ソート、単位——VN/JP/UAE"),
      P("Điểm mấu chốt mà nhiều đội phát triển bỏ sót: dù VN, JP, UAE đều KHÔNG áp dụng DST cho thị trường của họ, hệ thống backend phục vụ các thị trường này vẫn có thể chạy trên hạ tầng đặt tại vùng CÓ DST (ví dụ máy chủ đặt ở Mỹ vì lý do chi phí hoặc lịch sử triển khai). Khi đó, mọi phép so sánh thời gian dùng giờ LOCAL của máy chủ đó — thay vì UTC chuẩn hoá — sẽ bị lệch đúng vào hai cuối tuần chuyển giờ DST mỗi năm, dù khách hàng ở VN/JP/UAE hoàn toàn không biết khái niệm DST là gì.",
        "The key point many dev teams miss: even though VN, JP and UAE don't observe DST for their own markets, the backend serving those markets may still run on infrastructure located in a DST region (e.g. a US-hosted server for cost or legacy deployment reasons). In that case, any time comparison using that server's LOCAL clock — instead of normalized UTC — will skew exactly on the two DST-transition weekends each year, even though customers in VN/JP/UAE have never heard of DST.",
        "多くの開発チームが見落とす要点：VN、JP、UAEは自国市場でDSTを採用していなくても、これらの市場を提供するバックエンドがDST地域（コストやレガシー展開の理由で米国にホストされたサーバーなど）のインフラで動いていることがあります。その場合、正規化されたUTCではなくそのサーバーのローカル時計を使った時刻比較は、毎年2回のDST切替週末にちょうどずれます。VN/JP/UAEの顧客はDSTという概念を知らなくてもです。"),
      DEF("DST (Daylight Saving Time)", "quy tắc chỉnh đồng hồ nhanh/chậm 1 giờ theo mùa ở một số vùng (Mỹ, Châu Âu...) để tận dụng ánh sáng ban ngày; KHÔNG áp dụng ở VN/JP/UAE nhưng vẫn có thể ảnh hưởng gián tiếp qua hạ tầng backend.",
        "a rule that shifts the clock forward/backward by 1 hour seasonally in some regions (US, Europe...) to make better use of daylight; NOT observed in VN/JP/UAE but can still cause indirect impact via backend infrastructure.",
        "一部地域（米国、欧州など）で日照をより活用するために季節ごとに時計を1時間進める/戻すルール。VN/JP/UAEでは採用されていないが、バックエンドインフラを介して間接的に影響することがある。"),
    ] },
  { heading: { vi: "3. Vì sao các edge case này nguy hiểm với sàn TMĐT đa quốc gia", en: "3. Why these edge cases are dangerous for a multi-country e-commerce platform", ja: "3. これらのエッジケースが多国籍ECプラットフォームにとって危険な理由" },
    blocks: [
      P("Ở GlobalMart, một lỗi múi giờ hay làm tròn tiền tệ không chỉ là 'giao diện xấu' — nó trực tiếp ảnh hưởng tới TIỀN THẬT của cả khách hàng lẫn doanh nghiệp. Một khuyến mãi Flash Sale bị tính sai ngày do DST có thể khiến hàng trăm khách hàng hợp lệ bị từ chối giảm giá, dẫn tới khiếu nại hàng loạt và hoàn tiền thủ công tốn kém. Một lỗi làm tròn JPY tưởng như nhỏ (0,10 yên mỗi đơn) có thể nhân lên hàng nghìn đơn mỗi ngày, tạo ra khoản chênh lệch sổ sách không giải trình được khi đối soát với cổng thanh toán quốc tế — điều mà bộ phận tài chính và kiểm toán rất khó chấp nhận.",
        "At GlobalMart, a timezone or currency-rounding bug isn't just 'ugly UI' — it directly affects REAL MONEY for both customers and the business. A Flash Sale miscalculated by DST can wrongly deny discounts to hundreds of eligible customers, triggering mass complaints and costly manual refunds. A seemingly tiny JPY rounding bug (0.10 yen per order) can multiply across thousands of orders a day, creating an unexplained ledger discrepancy when reconciling against an international payment gateway — something finance and audit teams find very hard to accept.",
        "GlobalMartでは、タイムゾーンや通貨丸めのバグは単なる『見た目の悪さ』ではなく、顧客と事業双方の実際のお金に直接影響します。DSTによって日付が誤計算されたフラッシュセールは、何百人もの適格な顧客の割引を誤って拒否し、大量のクレームと高コストな手動返金を引き起こしかねません。一見小さなJPYの丸めバグ（1注文あたり0.10円）は1日数千件の注文に積み重なり、国際決済ゲートウェイとの消込時に説明のつかない帳簿差異を生みます——財務・監査部門にとって非常に受け入れがたい問題です。"),
      P("Hơn nữa, GlobalMart phục vụ ba thị trường có VĂN HÓA THỜI GIAN và TIỀN TỆ khác hẳn nhau: người Nhật rất nhạy cảm với độ chính xác của giờ giấc (giao hàng trễ vài phút cũng có thể bị phàn nàn), người dùng UAE quen với giao diện RTL và có thể dùng song song lịch Hijri, còn thị trường Việt Nam lại đặc biệt nhạy cảm với giá hiển thị vì thói quen mua sắm theo khuyến mãi theo giờ. Một đội kiểm thử chỉ quen 'test cho một thị trường' rất dễ mang định kiến của thị trường đó áp vào toàn bộ hệ thống, bỏ sót đúng những khác biệt làm nên rủi ro thực sự.",
        "Moreover, GlobalMart serves three markets with very different TIME CULTURES and CURRENCIES: Japanese customers are highly sensitive to time precision (a delivery a few minutes late can draw complaints), UAE users are accustomed to RTL interfaces and may use the Hijri calendar alongside the Gregorian one, while the Vietnamese market is especially sensitive to displayed prices due to time-based promotion shopping habits. A test team used to 'testing for one market' easily carries that market's assumptions into the whole system, missing exactly the differences that create real risk.",
        "さらに、GlobalMartは時間文化と通貨が全く異なる3つの市場に対応しています：日本の顧客は時間の正確さに非常に敏感（数分の配達遅延でもクレームになり得る）、UAEのユーザーはRTLインターフェースに慣れ、ヒジュラ暦を併用することがある、一方ベトナム市場は時間限定プロモーションで買い物をする習慣から表示価格に特に敏感です。1つの市場向けのテストに慣れたチームは、その市場の思い込みをシステム全体に持ち込みやすく、実際のリスクを生む違いをまさに見逃します。"),
      P("Cuối cùng, các edge case này thường KHÔNG lộ ra trong môi trường test nội bộ vì đội phát triển thường làm việc cùng một múi giờ, cùng một đồng tiền mặc định (thường là USD hoặc VND), và hiếm khi test đúng vào các mốc chuyển DST của một vùng xa lạ. Vì vậy, kiểm thử bản địa hóa nâng cao đòi hỏi CHỦ ĐỘNG dựng lại các điều kiện biên đó — giả lập giờ hệ thống, giả lập locale, giả lập mốc DST — thay vì chờ chúng tự xảy ra trong quá trình phát triển bình thường.",
        "Finally, these edge cases usually DON'T surface in an internal test environment because the dev team typically works in the same timezone, the same default currency (often USD or VND), and rarely happens to test right at an unfamiliar region's DST transition. So advanced localization testing requires PROACTIVELY reconstructing those boundary conditions — mocking system time, mocking locale, mocking DST transition dates — rather than waiting for them to occur naturally during normal development.",
        "最後に、これらのエッジケースは通常、社内テスト環境では現れません。開発チームは通常同じタイムゾーン、同じデフォルト通貨（多くはUSDかVND）で作業し、見慣れない地域のDST切替のタイミングでたまたまテストすることは稀だからです。そのため上級ローカライズテストは、通常の開発中に自然に発生するのを待つのではなく、システム時刻・ロケール・DST切替日を意図的に再現することを要求します。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: tiền tệ, làm tròn & định dạng số theo vùng", en: "4. Prepare: currency, rounding & number formats by region", ja: "4. 準備：地域別の通貨・丸め・数値形式" },
    blocks: [
      P("Trước khi viết ca kiểm thử, bạn cần một danh sách CHUẨN cho từng đồng tiền GlobalMart hỗ trợ — không suy đoán, phải tra theo chuẩn ISO 4217 và định dạng số theo locale tương ứng.",
        "Before writing test cases, you need a STANDARD reference list for each currency GlobalMart supports — no guessing, look it up against the ISO 4217 standard and each locale's number format.",
        "テストケースを書く前に、GlobalMartが対応する各通貨の標準リストが必要です——推測せず、ISO 4217規格と各ロケールの数値形式を参照してください。"),
      STEP(1, "Liệt kê mọi đồng tiền hệ thống hỗ trợ (VND, JPY, AED...) và tra số chữ số thập phân chuẩn theo ISO 4217 cho từng đồng.", "List every currency the system supports (VND, JPY, AED...) and look up the standard decimal digit count per ISO 4217 for each.", "システムが対応する全通貨（VND、JPY、AEDなど）を列挙し、ISO 4217に基づく標準小数桁数を各通貨で確認する。"),
      STEP(2, "Xác định quy tắc làm tròn hệ thống dùng (làm tròn thường, hay làm tròn ngân hàng round-half-to-even) và đối chiếu với quy tắc cổng thanh toán thực tế áp dụng.", "Determine the rounding rule the system uses (ordinary rounding, or bankers' rounding round-half-to-even) and cross-check against the rule the real payment gateway applies.", "システムが使う丸めルール（通常の四捨五入か、バンカーズラウンディング）を特定し、実際の決済ゲートウェイが適用するルールと突き合わせる。"),
      STEP(3, "Xác định định dạng số & ngày mặc định của từng locale (dấu phân cách hàng nghìn, dấu thập phân, thứ tự ngày/tháng/năm) — dễ nhầm vì vi-VN dùng dấu phẩy cho thập phân trong khi en-US dùng dấu chấm.", "Determine each locale's default number & date format (thousands separator, decimal mark, day/month/year order) — easily confused since vi-VN uses a comma for decimals while en-US uses a period.", "各ロケールのデフォルトの数値・日付形式（桁区切り、小数点記号、日/月/年の順序）を特定する——vi-VNは小数にカンマを使い、en-USはピリオドを使うため混同しやすい。"),
      TRY("Tra cứu số chữ số thập phân chuẩn ISO 4217 của 3 đồng tiền bất kỳ bạn chưa biết (ví dụ KRW, BHD, KWD) và đoán xem mỗi đồng có bao nhiêu chữ số thập phân trước khi tra.", "Look up the ISO 4217 standard decimal digit count for 3 currencies you don't already know (e.g. KRW, BHD, KWD) and guess each one's decimal digit count before checking.", "まだ知らない3つの通貨（例：KRW、BHD、KWD）のISO 4217標準小数桁数を調べ、確認する前にそれぞれ何桁か予想してみよう。"),
      PITFALL("Giả định TẤT CẢ tiền tệ đều có 2 chữ số thập phân như USD vì đó là đồng tiền quen thuộc nhất khi code — dẫn tới lỗi hiển thị VÀ lỗi tính giá thực cho JPY/VND.", "Assuming ALL currencies have 2 decimal digits like USD because that's the most familiar currency while coding — leading to both display bugs AND real pricing bugs for JPY/VND.", "コーディング時に最も馴染みのある通貨であるUSDのように、全通貨が2桁の小数を持つと仮定すること——JPY/VNDの表示バグと実際の価格計算バグの両方につながる。"),
      IMG(m_region, "Bảng tham chiếu số chữ số thập phân & định dạng theo vùng — dùng làm checklist khi thiết kế ca kiểm thử", "Reference table of decimal digits & regional formats — use as a checklist when designing test cases", "小数桁数と地域別形式の参照表——テストケース設計時のチェックリストとして使用"),
    ] },
  { heading: { vi: "5. Thực hành: RTL, sắp xếp locale, độ dài chuỗi dịch, unicode & đơn vị đo", en: "5. Hands-on: RTL, locale sorting, translated string length, unicode & units", ja: "5. 実習：RTL、ロケールソート、翻訳文字列長、Unicode・単位" },
    blocks: [
      P("Nhóm edge case thứ hai xoay quanh CÁCH HIỂN THỊ và SẮP XẾP dữ liệu — dễ bị xem nhẹ hơn nhóm tiền tệ/thời gian vì không trực tiếp ảnh hưởng tới tiền, nhưng lại ảnh hưởng mạnh tới trải nghiệm và độ tin cậy thương hiệu, đặc biệt với thị trường UAE dùng chữ Ả Rập.",
        "The second edge-case group revolves around HOW DATA IS DISPLAYED and SORTED — easier to underrate than the currency/time group since it doesn't directly affect money, but it strongly affects user experience and brand credibility, especially for the UAE market using Arabic script.",
        "2つ目のエッジケース群はデータの表示方法とソート方法に関するものです——通貨・時間グループより金銭に直接影響しないため軽視されがちですが、体験とブランドの信頼性に強く影響します。特にアラビア文字を使うUAE市場で顕著です。"),
      STEP(1, "Bật giao diện tiếng Ả Rập (ar-AE) và kiểm layout có lật RTL đúng không — menu, icon, hướng cuộn — nhưng số điện thoại/mã đơn vẫn phải giữ LTR.", "Enable the Arabic UI (ar-AE) and check whether the layout correctly mirrors to RTL — menu, icons, scroll direction — while phone numbers/order codes still stay LTR.", "アラビア語UI（ar-AE）を有効にし、メニュー・アイコン・スクロール方向がRTLに正しく反転するか確認する。ただし電話番号/注文コードはLTRのまま維持する必要がある。"),
      STEP(2, "Nhập một danh sách tên khách hàng có dấu tiếng Việt và kiểm chức năng sắp xếp/tìm kiếm có dùng đúng collation vi-VN thay vì mã Unicode thô không.", "Enter a list of Vietnamese accented customer names and check whether the sort/search feature uses proper vi-VN collation instead of raw Unicode order.", "ベトナム語のアクセント付き顧客名リストを入力し、ソート/検索機能が生のUnicode順ではなく適切なvi-VN collationを使っているか確認する。"),
      STEP(3, "Dịch thử một nhãn nút ngắn (như 'Thêm vào giỏ hàng') sang ngôn ngữ dài hơn (Ả Rập, Đức) và kiểm layout ở màn hình nhỏ nhất hỗ trợ có bị cắt chữ/vỡ nút không.", "Try translating a short button label (like 'Add to cart') into a longer language (Arabic, German) and check whether the smallest supported screen truncates text or breaks the button.", "短いボタンラベル（『カートに追加』など）をより長くなる言語（アラビア語、ドイツ語）に翻訳し、対応する最小画面サイズで文字が切れたりボタンが崩れたりしないか確認する。"),
      STEP(4, "Nhập tên sản phẩm chứa emoji và ký tự half-width tiếng Nhật, lưu rồi tải lại trang — kiểm dữ liệu hiển thị đúng, không vỡ thành ký tự lạ (mojibake) do sai bảng mã.", "Enter a product name containing an emoji and Japanese half-width characters, save then reload the page — check the data displays correctly, not garbled into mojibake from a wrong character encoding.", "絵文字と日本語の半角文字を含む商品名を入力し、保存してページを再読み込みする——文字コードの誤りによる文字化け（mojibake）にならず正しく表示されるか確認する。"),
      CODE("text", "CHECKLIST NHANH - hien thi & sap xep theo locale (GlobalMart)\n[ ] RTL: menu/icon/huong cuon lat dung, SO DIEN THOAI + MA DON van LTR\n[ ] Collation: ten co dau tieng Viet sap dung thu tu bang chu vi-VN\n[ ] Do dai chuoi dich: nut/nhan khong vo layout o man hinh nho nhat\n[ ] Unicode/emoji: luu + tai lai khong vo thanh ky tu la (mojibake)\n[ ] Don vi do: kg/km hien thi dung theo cau hinh vung, khong tu quy doi sai"),
      TRY("Chọn 1 màn hình bất kỳ trong app bạn dùng, bật ngôn ngữ Ả Rập (nếu có) hoặc Đức, và tìm xem có nút/nhãn nào bị vỡ chữ không.", "Pick any screen in an app you use, switch to Arabic (if available) or German, and look for any button/label that breaks.", "使っているアプリの任意の画面を選び、アラビア語（あれば）またはドイツ語に切り替え、文字が崩れるボタン/ラベルがないか探そう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: đơn đặt lúc 00:30 rơi sai ngày do DST", en: "6. Situation 1: an order placed at 00:30 lands on the wrong date due to DST", ja: "6. シーン1：00:30の注文がDSTにより誤った日付になる" },
    blocks: [
      SITUATION("Đội chỉ test Flash Sale bằng cách đặt hàng vào giữa buổi chiều, không có ca nào đặt gần nửa đêm hay quanh mốc chuyển DST của service phụ trợ.", "The team only tests the Flash Sale by ordering in the mid-afternoon, with no case near midnight or around the backend service's DST transition.",
        "Một khách ở Tokyo đặt hàng lúc 00:30 ngày 15/3, đúng trong khung Flash Sale 'chỉ áp dụng ngày 14/3'. Vì promotion-service so sánh khung giờ bằng đồng hồ LOCAL của máy chủ đặt tại us-east-1 (múi giờ America/New_York, có DST), và đúng cuối tuần đó Mỹ chuyển sang giờ mùa hè khiến đồng hồ máy chủ lệch thêm 1 giờ so với dự kiến khi quy đổi, hệ thống tính đơn này là đặt ngày 15/3 — ngoài khung khuyến mãi — nên KHÔNG áp mã giảm giá dù khách hoàn toàn đặt đúng giờ hiển thị trên app.",
        "A customer in Tokyo orders at 00:30 on March 15, right within the Flash Sale window that only applies to March 14. Because the promotion-service compares the time window using the LOCAL clock of a server hosted in us-east-1 (America/New_York timezone, which observes DST), and that very weekend the US shifted to Daylight Saving Time, shifting the server clock by an extra hour beyond what the conversion expected, the system records this order as placed on March 15 — outside the promotion window — so it does NOT apply the discount, even though the customer ordered exactly within the time shown on the app.",
        "チームはフラッシュセールを午後の時間帯で注文するだけでテストし、深夜近くやバックエンドサービスのDST切替周辺のケースがない。",
        "東京の顧客が3月15日00:30に注文し、これは3月14日のみ有効なフラッシュセールの時間枠内にちょうど当たる。promotion-serviceがus-east-1（America/New_Yorkタイムゾーン、DST採用）にホストされたサーバーのローカル時計で時間枠を比較しており、ちょうどその週末に米国が夏時間に切り替わってサーバー時計が予想より1時間余分にずれたため、システムはこの注文を3月15日——プロモーション期間外——として記録し、顧客がアプリ表示どおりの時間に注文したにもかかわらず割引を適用しない。"),
      SOLVE("Chuyển toàn bộ so sánh thời gian khuyến mãi về UTC ở tầng service (không dùng giờ local máy chủ dưới bất kỳ hình thức nào), chỉ quy đổi sang múi giờ hiển thị cho khách ở tầng giao diện, đồng thời bổ sung ca hồi quy chạy quanh các mốc chuyển DST của Mỹ (cuối tháng 3, đầu tháng 11) để bắt sớm lỗi tương tự ở bất kỳ service phụ trợ nào còn dùng giờ local máy chủ.", "Move all promotion time comparisons to UTC at the service layer (never using the server's local clock in any form), only converting to the customer-facing timezone at the UI layer, and add regression cases running around the US DST transition dates (late March, early November) to catch similar bugs early in any backend service still using server local time.", "プロモーションの時刻比較を全てサービス層でUTCに統一し（いかなる形でもサーバーのローカル時計を使わない）、顧客向けタイムゾーンへの変換はUI層でのみ行う。さらに米国のDST切替日（3月末、11月初旬）周辺で実行する回帰ケースを追加し、サーバーのローカル時刻をまだ使っている他のバックエンドサービスの同様のバグを早期に発見する。"),
      P("Bài học cốt lõi: một service phụ trợ hoàn toàn 'vô hình' với người dùng cuối (promotion-service) vẫn có thể là nguồn gốc của một lỗi ảnh hưởng trực tiếp tới trải nghiệm khách hàng ở một thị trường không hề dùng DST. Việc chỉ test 'giờ hiển thị trên app có đúng không' là chưa đủ — tester cần truy ngược xem MỖI service liên quan tới thời gian đang so sánh theo giờ nào, đặt ở đâu, và có phụ thuộc ngầm vào giờ hệ điều hành của máy chủ hay không.",
        "The core lesson: a backend service completely 'invisible' to end users (promotion-service) can still be the root cause of a bug directly affecting customer experience in a market that doesn't use DST at all. Testing only 'is the time shown on the app correct' isn't enough — a tester needs to trace back which timezone EACH time-related service compares against, where it's hosted, and whether it silently depends on the host server's OS clock.",
        "核心的な教訓：エンドユーザーには完全に『見えない』バックエンドサービス（promotion-service）でも、DSTを全く使わない市場の顧客体験に直接影響するバグの根本原因になり得ます。『アプリに表示される時刻が正しいか』だけをテストするのでは不十分です。テスターは時間に関わる各サービスがどのタイムゾーンで比較しているか、どこにホストされているか、サーバーのOS時計に暗黙的に依存していないかを遡って調べる必要があります。"),
      IMG(m_jira, "Ticket lỗi DST khiến đơn hàng bị tính lệch ngày, mất khuyến mãi Flash Sale", "A DST bug ticket that miscalculates an order's date, losing the Flash Sale discount", "注文の日付を誤計算しフラッシュセール割引を失わせるDSTバグチケット"),
      RECAP(["Service phụ trợ 'vô hình' vẫn có thể gây lỗi DST dù thị trường không dùng DST", "Mọi so sánh thời gian nên chuẩn hoá về UTC ở tầng service, chỉ đổi múi giờ ở tầng hiển thị"],
        ["An 'invisible' backend service can still cause a DST bug even in a non-DST market", "All time comparisons should be normalized to UTC at the service layer, converting timezone only at the display layer"],
        ["『見えない』バックエンドサービスでも、DSTを使わない市場でDSTバグを起こし得る", "全ての時刻比較はサービス層でUTCに正規化し、タイムゾーン変換は表示層のみで行うべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: giá làm tròn sai ở tiền tệ 0 chữ số thập phân (JPY)", en: "7. Situation 2: wrong rounding for a zero-decimal currency (JPY)", ja: "7. シーン2：小数点なしの通貨（JPY）での丸め誤り" },
    blocks: [
      SITUATION("Module tính giá sau khuyến mãi được viết chung cho mọi đồng tiền, mặc định làm tròn 2 chữ số thập phân như USD, và đã test kỹ với VND/USD nên đội tự tin đây là logic đúng.", "The post-discount pricing module was written to be shared across all currencies, defaulting to 2-decimal rounding like USD, and had been well tested with VND/USD, so the team was confident the logic was correct.",
        "Một sản phẩm giá gốc 2.999 JPY được áp mã giảm 10%, ra kết quả 2.699,10 JPY — hệ thống hiển thị VÀ tính tiền thực đúng bằng con số này. Nhưng JPY không tồn tại đơn vị nhỏ hơn 1 yên (exponent=0 theo ISO 4217): cổng thanh toán quốc tế tự động làm tròn giao dịch thành 2.699 JPY khi xử lý thẻ, trong khi hệ thống nội bộ GlobalMart vẫn ghi nhận 2.699,10 JPY — tạo ra khoản chênh lệch 0,10 JPY mỗi đơn, nhân lên hàng nghìn đơn/ngày khi đối soát cuối kỳ.",
        "A product with an original price of 2,999 JPY gets a 10% discount, producing 2,699.10 JPY — the system both displays AND actually charges this exact figure. But JPY has no unit smaller than 1 yen (exponent=0 per ISO 4217): the international payment gateway automatically rounds the transaction to 2,699 JPY when processing the card, while GlobalMart's internal system still records 2,699.10 JPY — creating a 0.10 JPY discrepancy per order, multiplying across thousands of orders a day at period-end reconciliation.",
        "割引後価格計算モジュールは全通貨共通で書かれ、USDのようにデフォルトで2桁丸めを行い、VND/USDでは十分にテストされていたため、チームはこのロジックが正しいと確信していた。",
        "原価2,999円の商品に10%割引を適用すると2,699.10円になり、システムは表示にも実際の請求にもこの数字をそのまま使う。しかしJPYには1円未満の単位が存在しない（ISO 4217でexponent=0）：国際決済ゲートウェイはカード処理時に取引を自動的に2,699円に丸めるが、GlobalMartの内部システムは2,699.10円のまま記録し続け、1注文あたり0.10円の差異を生み、期末消込時に1日数千件の注文にわたって積み重なる。"),
      SOLVE("Thêm bảng cấu hình 'số chữ số thập phân theo ISO 4217' cho từng đồng tiền (JPY=0, VND=0, USD=2, AED=2), áp dụng làm tròn NGAY Ở TẦNG TÍNH GIÁ (không chỉ tầng hiển thị) bằng đúng quy tắc cổng thanh toán đang dùng, và bổ sung ca hồi quy kiểm giá sau khuyến mãi riêng cho từng nhóm đồng tiền có exponent khác nhau.", "Add an ISO 4217 'decimal digits per currency' config table (JPY=0, VND=0, USD=2, AED=2), apply rounding RIGHT AT THE PRICING LAYER (not just the display layer) using the exact rule the payment gateway uses, and add separate post-discount pricing regression cases for each currency group with a different exponent.", "各通貨のISO 4217『通貨ごとの小数桁数』設定テーブル（JPY=0、VND=0、USD=2、AED=2）を追加し、表示層だけでなく価格計算層で決済ゲートウェイが使う正確なルールに従って丸め処理を行う。さらに異なるexponentを持つ通貨グループごとに、割引後価格の回帰ケースを個別に追加する。"),
      P("Lỗi này nguy hiểm hơn lỗi múi giờ ở một điểm: nó không tạo ra khiếu nại ồn ào ngay lập tức (0,10 yên là số quá nhỏ để khách hàng để ý), nhưng lại âm thầm tích luỹ thành một khoản chênh lệch không giải trình được trong báo cáo tài chính — loại lỗi mà kiểm toán nội bộ hoặc đối tác thanh toán sẽ phát hiện muộn hơn nhiều, và khi đó chi phí điều tra, truy vết qua hàng nghìn giao dịch cũ sẽ lớn hơn rất nhiều so với chi phí bổ sung một bảng cấu hình đơn giản ngay từ đầu.",
        "This bug is more dangerous than the timezone one in one respect: it doesn't trigger a loud immediate complaint (0.10 yen is too small for a customer to notice), but it quietly accumulates into an unexplained discrepancy in financial reports — the kind of bug internal audit or a payment partner discovers much later, at which point the cost of investigating and tracing back through thousands of old transactions is far higher than the cost of simply adding a config table upfront.",
        "このバグはタイムゾーンのバグより1つの点でより危険です：即座に大きなクレームを引き起こさない（0.10円は顧客が気づくには小さすぎる）が、財務報告における説明のつかない差異として静かに積み重なります。これは内部監査や決済パートナーがずっと後になって発見する類のバグで、その時には数千件の過去の取引を調査・追跡するコストが、最初にシンプルな設定テーブルを追加するコストよりもはるかに大きくなります。"),
      TRY("Nghĩ thêm một đồng tiền 0 chữ số thập phân khác ngoài JPY (ví dụ KRW) và đề xuất 1 ca kiểm thử làm tròn tương tự cho GlobalMart nếu mở rộng sang thị trường đó.", "Think of another zero-decimal currency besides JPY (e.g. KRW) and propose a similar rounding test case for GlobalMart if it expands into that market.", "JPY以外の小数桁数0の通貨（例：KRW）をもう1つ考え、GlobalMartがその市場に拡大する場合の同様の丸めテストケースを提案しよう。"),
    ] },
  { heading: { vi: "8. Bảng ca kiểm i18n nâng cao & cân bằng ưu tiên", en: "8. Advanced i18n case table & priority balancing", ja: "8. 上級i18nケース表と優先順位のバランス" },
    blocks: [
      P("Sau khi hiểu từng nhóm edge case, bước thực dụng tiếp theo là có một BẢNG CA KIỂM có thể tái sử dụng ngay cho dự án — không cần nghĩ lại từ đầu mỗi lần release tính năng mới liên quan tới đa quốc gia.",
        "After understanding each edge-case group, the next practical step is having a reusable CASE TABLE ready for the project — no need to rethink from scratch every time a new multi-country feature ships.",
        "各エッジケース群を理解した後の次の実用的なステップは、プロジェクトですぐ再利用できるケース表を持つことです——新しい多国籍機能をリリースするたびにゼロから考え直す必要がありません。"),
      IMG(m_cases, "Bảng ca kiểm i18n/L10n nâng cao GlobalMart — dùng làm checklist khi release tính năng đa quốc gia", "GlobalMart's advanced i18n/L10n case table — use as a checklist when releasing multi-country features", "GlobalMartの上級i18n/L10nケース表——多国籍機能リリース時のチェックリストとして使用"),
      P("Không phải mọi ca đều đáng đầu tư thời gian ngang nhau. Ca L10N-01 (múi giờ/DST) và L10N-02 (làm tròn tiền tệ) luôn nên ưu tiên cao nhất vì ảnh hưởng trực tiếp tới TIỀN và có thể gây lỗi ở TẦNG TÍNH TOÁN chứ không chỉ hiển thị. Các ca RTL, sắp xếp locale, độ dài chuỗi dịch tuy tần suất xuất hiện cao hơn (theo số liệu dashboard bên dưới) nhưng phần lớn là lỗi hiển thị — vẫn cần sửa nhưng hiếm khi gây thiệt hại tài chính trực tiếp.",
        "Not every case deserves equal time investment. L10N-01 (timezone/DST) and L10N-02 (currency rounding) should always be top priority because they directly affect MONEY and can break at the COMPUTATION layer, not just display. RTL, locale sorting, and translated string length cases appear more frequently (per the dashboard below) but are mostly display bugs — still worth fixing, but rarely causing direct financial damage.",
        "全てのケースが同じだけ時間を投資する価値があるわけではありません。L10N-01（タイムゾーン/DST）とL10N-02（通貨丸め）は、金銭に直接影響し表示だけでなく計算層で壊れ得るため、常に最優先とすべきです。RTL、ロケールソート、翻訳文字列長のケースは（下のダッシュボードによると）出現頻度は高いものの、大部分は表示上のバグです——修正すべきですが、直接的な財務被害を引き起こすことは稀です。"),
      IMG(m_kanban, "Bảng theo dõi lỗi i18n/L10n nâng cao theo mức độ ưu tiên (GlobalMart · Sprint 30)", "A board tracking advanced i18n/L10n bugs by priority (GlobalMart · Sprint 30)", "優先度別の上級i18n/L10nバグ追跡ボード（GlobalMart・スプリント30）"),
      TIP("Khi thời gian hạn hẹp, luôn kiểm nhóm ẢNH HƯỞNG TIỀN (múi giờ/DST, làm tròn tiền tệ) trước tiên, sau đó mới tới nhóm ảnh hưởng hiển thị (RTL, sắp xếp, độ dài chuỗi, unicode, đơn vị đo).", "When time is tight, always test the MONEY-AFFECTING group first (timezone/DST, currency rounding), then move to the display-affecting group (RTL, sorting, string length, unicode, units).", "時間が限られる場合は、常に金銭に影響するグループ（タイムゾーン/DST、通貨丸め）を最初にテストし、その後表示に影響するグループ（RTL、ソート、文字列長、Unicode、単位）に取り組もう。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo tránh sai lầm", en: "9. Common mistakes & tips to avoid them", ja: "9. よくある失敗と回避のコツ" },
    blocks: [
      P("Ngay cả tester có kinh nghiệm cũng dễ vấp một số lỗi giống nhau khi kiểm thử bản địa hóa nâng cao — vì các edge case này thường không lộ ra trong điều kiện làm việc thường ngày của chính người test.",
        "Even experienced testers easily stumble on a few common mistakes when doing advanced localization testing — because these edge cases usually don't surface under the tester's own everyday working conditions.",
        "経験豊富なテスターでも、上級ローカライズテストでいくつかの共通の失敗をしがちです——これらのエッジケースは通常、テスター自身の日常的な作業条件では現れないためです。"),
      PITFALL("Chỉ test múi giờ bằng cách đổi timezone HIỂN THỊ trên trình duyệt, không kiểm xem các service phụ trợ (khuyến mãi, tồn kho, đối soát) đang so sánh thời gian theo giờ nào ở tầng backend.", "Only testing timezone by changing the DISPLAY timezone in the browser, without checking which timezone the backend services (promotion, inventory, reconciliation) actually compare against.", "ブラウザの表示タイムゾーンを変更するだけでタイムゾーンをテストし、バックエンドサービス（プロモーション、在庫、消込）が実際にどのタイムゾーンで比較しているか確認しない。"),
      PITFALL("Test làm tròn tiền tệ chỉ bằng một vài con số 'đẹp' (chia hết, không có phần dư), bỏ sót đúng những con số gây ra phần thập phân lẻ mà quy tắc làm tròn phải xử lý.", "Testing currency rounding with only a few 'clean' numbers (evenly divisible, no remainder), missing exactly the numbers that produce odd decimal remainders the rounding rule must handle.", "通貨丸めのテストを『きれいな』数値（割り切れる、余りがない）だけで行い、丸めルールが処理すべき端数を生む数値をまさに見逃す。"),
      TIP("Trước khi báo một ca L10n là bug, xác nhận rõ 3 thứ: (1) locale/múi giờ đang test, (2) đồng tiền/đơn vị đang test, (3) kết quả mong đợi tra theo chuẩn nào (ISO 4217, ISO 8601...) — tránh báo nhầm hành vi đúng thành lỗi.", "Before reporting an L10n case as a bug, confirm 3 things: (1) the locale/timezone being tested, (2) the currency/unit being tested, (3) which standard (ISO 4217, ISO 8601...) the expected result is based on — to avoid mistakenly reporting correct behavior as a bug.", "L10nケースをバグとして報告する前に3点確認しよう：(1) テスト中のロケール/タイムゾーン、(2) テスト中の通貨/単位、(3) 期待結果がどの規格（ISO 4217、ISO 8601など）に基づくか——正しい挙動を誤ってバグ報告しないために。"),
      IMG(m_dash, "Số liệu lỗi i18n/L10n theo nhóm edge case — nhắc lại thứ tự ưu tiên khi thời gian hạn hẹp", "i18n/L10n bug metrics by edge-case group — a reminder of priority order when time is tight", "エッジケース群別のi18n/L10nバグ指標——時間が限られる時の優先順位の再確認"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử đa ngôn ngữ (localization) cho người mới", "Multi-language localization testing for beginners", "kiem-thu-da-ngon-ngu-localization-cho-nguoi-moi", "初心者のための多言語ローカライズテスト"),
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Phân tích miền & biên nâng cao (Domain Analysis) cho tester", "Advanced domain & boundary analysis for testers", "phan-tich-mien-bien-nang-cao-domain-analysis-cho-tester", "テスター向け上級ドメイン分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa nâng kiểm thử bản địa hóa lên một tầng sâu hơn qua sàn TMĐT GlobalMart bán sang VN/JP/UAE: phân biệt offset múi giờ với quy tắc DST, hiểu vì sao ranh giới đổi ngày phải tính theo giờ khách hàng chứ không phải giờ máy chủ, nắm số chữ số thập phân chuẩn ISO 4217 cho từng đồng tiền, và thực hành các edge case hiển thị (RTL, sắp xếp locale, độ dài chuỗi dịch, unicode/emoji, đơn vị đo). Hai tình huống thật — đơn hàng lệch ngày do DST của service phụ trợ, giá JPY làm tròn sai gây lệch sổ sách — cho thấy các lỗi này thường im lặng nhưng ảnh hưởng trực tiếp tới tiền bạc và niềm tin khách hàng.",
        "You just took localization testing a level deeper through GlobalMart, an e-commerce platform selling into VN/JP/UAE: distinguishing timezone offset from DST rules, understanding why the date-change boundary must be computed using the customer's time rather than the server's, knowing the ISO 4217 standard decimal digit count for each currency, and practicing display edge cases (RTL, locale sorting, translated string length, unicode/emoji, units of measurement). Two real situations — an order dated wrong due to a backend service's DST, and a JPY rounding bug causing ledger discrepancies — showed that these bugs are often silent yet directly affect money and customer trust.",
        "ベトナム・日本・UAEに販売するECプラットフォームGlobalMartを通じて、ローカライズテストを一段深めました：タイムゾーンオフセットとDSTルールの区別、日付境界がサーバー時刻ではなく顧客の時刻で計算されるべき理由の理解、各通貨のISO 4217標準小数桁数の把握、表示エッジケース（RTL、ロケールソート、翻訳文字列長、Unicode/絵文字、計測単位）の実習。2つの実例——バックエンドサービスのDSTによる日付誤り、帳簿差異を生むJPY丸めバグ——は、これらのバグがしばしば静かでありながら金銭と顧客の信頼に直接影響することを示しました。"),
      P("Chặng tiếp theo, bạn có thể kết hợp kỹ thuật này với kiểm thử báo cáo & đối soát dữ liệu để phát hiện các khoản chênh lệch tài chính tích luỹ từ nhiều nguồn khác nhau, hoặc học phân tích miền nâng cao để thiết kế ca biên có hệ thống hơn cho các hệ thống có nhiều biến ràng buộc. Nếu muốn luyện các kỹ thuật kiểm thử nâng cao này trên dự án mô phỏng doanh nghiệp thực tế cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tự tin đảm nhận các hệ thống TMĐT, fintech vận hành đa quốc gia.",
        "Next, you can combine this technique with report & data-reconciliation testing to catch financial discrepancies accumulating from multiple sources, or learn advanced domain analysis to design more systematic boundary cases for systems with many interdependent variables. If you want to practice these advanced testing techniques on real enterprise-like projects with a mentor, a structured Tester course helps you confidently take on multi-country e-commerce and fintech systems.",
        "次は、この技法を報告・データ消込テストと組み合わせて複数のソースから積み重なる財務差異を検出したり、上級ドメイン分析を学んで相互依存する多変数システム向けのより体系的な境界ケースを設計したりできます。指導者付きで実際の企業案件に近いプロジェクトでこれらの上級テスト技法を練習したいなら、体系的なテスターコースが多国籍のEC・フィンテックシステムを自信を持って担当できるよう助けます。"),
      CTA(course),
    ] },
];

const L10N_ADVANCED_01 = makeDoc({
  slug: "kiem-thu-ban-dia-hoa-quoc-te-hoa-nang-cao-cho-tester",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử bản địa hóa nâng cao",
  keywords: ["kiểm thử bản địa hóa nâng cao", "i18n testing", "l10n testing", "múi giờ DST", "làm tròn tiền tệ", "RTL testing", "sắp xếp theo locale"],
  coverLabel: "NÂNG CAO · I18N/L10N · TMĐT TOÀN CẦU",
  crumb: "Kiểm thử bản địa hóa & quốc tế hóa nâng cao (i18n/L10n)",
  metaTitle: { vi: "Kiểm thử bản địa hóa nâng cao (i18n/L10n) cho TMĐT", en: "Advanced i18n/L10n testing for testers", ja: "テスター向け上級i18n/L10nテスト" },
  metaDescription: {
    vi: "Kiểm thử bản địa hóa nâng cao cho tester: múi giờ, DST, làm tròn tiền tệ, RTL, sắp xếp locale, unicode - dự án TMĐT bán VN, Nhật Bản, UAE, có trắc nghiệm.",
    en: "Advanced localization (i18n/L10n) testing for testers: timezones, DST, region-specific currency rounding, RTL, locale sorting, unicode edge cases through a multi-country e-commerce project selling into Vietnam, Japan and UAE, with a quiz.",
    ja: "テスター向け上級ローカライズ（i18n/L10n）テスト：タイムゾーン、DST、地域別通貨丸め、RTL、ロケールソート、Unicodeエッジケース。ベトナム・日本・UAE向けEC案件でクイズ付き解説。",
  },
  title: {
    vi: "Kiểm thử bản địa hóa & quốc tế hóa nâng cao (i18n/L10n edge case) cho sàn TMĐT đa quốc gia (có trắc nghiệm)",
    en: "Advanced localization & internationalization (i18n/L10n edge case) testing for a multi-country e-commerce platform (with quiz)",
    ja: "多国籍ECプラットフォームのための上級ローカライズ・国際化（i18n/L10nエッジケース）テスト（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử bản địa hóa nâng cao cho sàn TMĐT GlobalMart bán hàng sang Việt Nam, Nhật Bản và UAE. Đi sâu vào edge case: múi giờ & DST/đổi ngày, làm tròn tiền tệ theo chuẩn ISO 4217, định dạng số/ngày, RTL, sắp xếp theo locale, độ dài chuỗi dịch, unicode/emoji, đơn vị đo. 2 tình huống lỗi thật (đơn hàng lệch ngày do DST, giá JPY làm tròn sai), bảng ca kiểm i18n nâng cao dùng ngay được, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: advanced localization testing for GlobalMart, an e-commerce platform selling into Vietnam, Japan and UAE. Deep dives into edge cases: timezones & DST/date-change, ISO 4217 currency rounding, number/date formats, RTL, locale sorting, translated string length, unicode/emoji, units of measurement. 2 real bug situations (a DST date mismatch, a wrong JPY rounding), a ready-to-reuse advanced i18n case table, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：ベトナム・日本・UAEに販売するECプラットフォームGlobalMart向けの上級ローカライズテスト。タイムゾーンとDST/日付変更、ISO 4217通貨丸め、数値・日付形式、RTL、ロケールソート、翻訳文字列長、Unicode/絵文字、計測単位のエッジケースを深く掘り下げる。2つの実例バグ（DSTによる日付不一致、JPY丸め誤り）、すぐ再利用できる上級i18nケース表、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử bản địa hóa nâng cao cho sàn TMĐT đa quốc gia", steps: [
    { name: "Chuẩn hoá múi giờ về UTC ở tầng service", text: "So sánh thời gian bằng UTC, chỉ quy đổi múi giờ ở tầng hiển thị; kiểm quanh các mốc chuyển DST." },
    { name: "Tra chuẩn ISO 4217 cho từng đồng tiền", text: "Xác định số chữ số thập phân, áp dụng làm tròn đúng ở tầng tính giá." },
    { name: "Kiểm các edge case hiển thị theo locale", text: "RTL, sắp xếp bảng chữ, độ dài chuỗi dịch, unicode/emoji, đơn vị đo." },
  ] },
  pages,
});

export const MA_L10N_01 = [L10N_ADVANCED_01];
