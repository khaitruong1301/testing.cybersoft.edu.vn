// doc_manual_beginner_severity_priority.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Severity vs Priority (Độ nghiêm trọng vs Độ ưu tiên của lỗi). Practice-first, nhiều MOCKUP giao diện
// (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, quy trình lỗi, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "congnghe", label: cfg.coverLabel });
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình có lỗi (nút Đặt hàng sai chính tả) ──
const m_screen = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán", [
    field(24, 20, 330, "Sản phẩm", "Tai nghe Bluetooth", "normal"),
    field(372, 20, 330, "Tổng tiền", "890.000 ₫", "normal"),
    field(24, 92, 678, "Địa chỉ giao", "45 Lê Lợi, Q1, TP.HCM", "normal"),
    btn(24, 168, 200, "Đặc hàng", "primary"),
    annotate(20, 160, 210, 46, "BUG: sai chính tả 'Đặc' -> 'Đặt'"),
    `<text x="250" y="196" font-size="12" fill="#64748b">Nút mua chính, ai cũng nhìn thấy</text>`,
  ].join(""), { h: 240, accent: "#0ea5e9" }),
].join(""), { h: 296, title: "ShopEasy · TMĐT", accent: "#0ea5e9" });

// ── Mockup 2: thang Severity ──
const m_sev = grid("Thang ĐỘ NGHIÊM TRỌNG (Severity) — do tester đánh giá", ["Mức", "Ý nghĩa (ảnh hưởng kỹ thuật)", "Ví dụ"], [
  ["Critical", "Sập hệ thống / mất dữ liệu / chặn hoàn toàn", "Không thanh toán được đơn nào"],
  ["High", "Chức năng chính sai nặng, chưa có cách né", "Tính sai tổng tiền đơn hàng"],
  ["Medium", "Sai nhưng có cách làm khác (workaround)", "Bộ lọc sản phẩm lỗi ở 1 danh mục"],
  ["Low", "Lỗi nhỏ, ít ảnh hưởng chức năng", "Sai chính tả, lệch canh lề"],
], { accent: "#0ea5e9" });

// ── Mockup 3: thang Priority ──
const m_pri = grid("Thang ĐỘ ƯU TIÊN (Priority) — do PM/Leader quyết định", ["Mức", "Ý nghĩa (thứ tự sửa)", "Dựa trên"], [
  ["Highest", "Phải sửa ngay, chặn phát hành", "Rủi ro kinh doanh/khách hàng"],
  ["High", "Sửa trong sprint này", "Nhiều người dùng bị ảnh hưởng"],
  ["Medium", "Sửa khi có thời gian", "Ảnh hưởng vừa phải"],
  ["Low", "Có thể để sau / backlog", "Ít người thấy, không gấp"],
], { accent: "#7c3aed" });

// ── Mockup 4: ma trận Severity × Priority với ví dụ ──
const m_matrix = grid("Ma trận Severity × Priority (4 ô kinh điển)", ["Tình huống", "Severity", "Priority", "Vì sao"], [
  ["Không đặt được hàng (sập checkout)", "Critical", "Highest", "Vừa nặng vừa gấp — mất doanh thu"],
  ["Sai chính tả nút 'Đặt hàng' ở trang chủ", "Low", "High", "Nhẹ về kỹ thuật nhưng ai cũng thấy → uy tín"],
  ["Sập tính năng xuất báo cáo admin hiếm dùng", "High", "Low", "Nặng nhưng ít người dùng → chưa gấp"],
  ["Lệch màu icon ở trang cài đặt ít vào", "Low", "Low", "Nhẹ và ít ảnh hưởng → để sau"],
], { accent: "#0ea5e9", highlight: 1, note: "Severity ≠ Priority: một lỗi 'nhẹ' vẫn có thể rất GẤP." });

// ── Mockup 5: ticket Jira có cả 2 trường ──
const m_jira = jira({
  key: "SE-10510", title: "Nút 'Đặt hàng' viết sai thành 'Đặc hàng' ở trang thanh toán",
  type: "Bug", status: "Open", priority: "High", severity: "Low",
  fields: [
    ["Môi trường", "prod · web ShopEasy · mọi trình duyệt"],
    ["Ảnh hưởng", "Không sập chức năng (Low) nhưng lộ ở nút mua chính"],
    ["Vì sao Priority cao", "Trang thanh toán, mọi khách đều thấy → hại uy tín"],
    ["Đề xuất", "Sửa gấp trong hotfix dù severity thấp"],
  ],
});

// ── Mockup 6: bảng số liệu phân bổ lỗi theo mức ──
const m_dash = dashboard("Phân bổ lỗi theo mức — Sprint 13", [
  { label: "Critical", value: "1", sub: "sập checkout", color: "#dc2626" },
  { label: "High", value: "5", sub: "chức năng chính", color: "#ea580c" },
  { label: "Medium", value: "9", sub: "có workaround", color: "#ca8a04" },
  { label: "Low", value: "12", sub: "nhỏ/giao diện", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Severity và Priority khác nhau như thế nào?",
  "What is the difference between severity and priority?",
  "Severity (độ nghiêm trọng) đo mức ẢNH HƯỞNG KỸ THUẬT của lỗi lên hệ thống — do tester đánh giá dựa trên chức năng bị hỏng nặng hay nhẹ. Priority (độ ưu tiên) đo mức GẤP về thứ tự sửa — do PM/Leader quyết định dựa trên rủi ro kinh doanh và số người bị ảnh hưởng. Hai thứ độc lập: một lỗi có thể severity thấp nhưng priority cao (sai chính tả ở nút mua chính) hoặc ngược lại.",
  "Severity measures the TECHNICAL IMPACT of a bug on the system — set by the tester based on how badly a function breaks. Priority measures the URGENCY of the fix order — set by the PM/Leader based on business risk and how many users are affected. They are independent: a bug can be low severity but high priority (a typo on the main buy button) or vice versa.",
  "重大度と優先度の違いは？",
  "重大度（Severity）はバグがシステムに与える技術的影響を測り、機能がどれだけ壊れるかでテスターが判断します。優先度（Priority）は修正順の緊急度を測り、事業リスクと影響ユーザー数でPM/リーダーが決めます。両者は独立：低重大度・高優先度（購入ボタンの誤字）もその逆もあり得ます。");
const faq2 = FAQ(
  "Ai là người quyết định Severity, ai quyết định Priority?",
  "Who decides severity and who decides priority?",
  "Thông thường tester đề xuất Severity vì bạn là người hiểu lỗi ảnh hưởng chức năng ra sao. Priority thường do PM, Product Owner hoặc Leader quyết định vì nó gắn với kế hoạch phát hành, hợp đồng, và ưu tiên kinh doanh. Là người mới, hãy đặt Severity thật khách quan theo ảnh hưởng kỹ thuật, và nêu ý kiến về Priority nhưng đừng tự áp đặt.",
  "Usually the tester proposes Severity because you understand how the bug affects functionality. Priority is usually decided by the PM, Product Owner or Leader because it ties to release plans, contracts and business priorities. As a beginner, set Severity objectively by technical impact, and give your opinion on Priority but don't impose it.",
  "重大度と優先度は誰が決める？",
  "通常、重大度はテスターが提案します。機能への影響を最も理解しているからです。優先度はPM・プロダクトオーナー・リーダーが決めます。リリース計画・契約・事業優先度に関わるためです。初心者は技術的影響で重大度を客観的に付け、優先度は意見を述べつつ押し付けないこと。");
const faq3 = FAQ(
  "Một lỗi severity thấp có bao giờ được ưu tiên cao không?",
  "Can a low-severity bug ever get high priority?",
  "Có, và đây là điểm mấu chốt hay bị người mới nhầm. Ví dụ kinh điển: logo công ty hoặc tên nút 'Đặt hàng' bị sai ở trang chủ. Về kỹ thuật lỗi này rất nhẹ (Low severity) vì không làm hỏng chức năng, nhưng nó xuất hiện ngay trước mắt mọi khách hàng nên rất hại uy tín — cần sửa gấp (High/Highest priority). Vì thế đừng bao giờ suy ra Priority chỉ từ Severity.",
  "Yes, and this is the key point beginners often miss. The classic example: the company logo or the 'Buy' button label is wrong on the homepage. Technically it's very minor (Low severity) since no function breaks, but it's right in front of every customer and hurts credibility — so it needs an urgent fix (High/Highest priority). Never infer Priority from Severity alone.",
  "低重大度のバグが高優先度になることは？",
  "あります。初心者が最も見落とす点です。定番例：トップページで会社ロゴや『購入』ボタンの表記が誤り。技術的には軽微（低重大度）ですが、全顧客の目に入り信用を損なうため緊急修正（高優先度）が必要です。優先度を重大度だけから推測してはいけません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Severity (độ nghiêm trọng) đo điều gì?", en: "What does severity measure?", ja: "重大度（Severity）は何を測る？" },
    options: [
      { vi: "Thứ tự sửa lỗi gấp hay không", en: "How urgent the fix order is", ja: "修正順の緊急度" },
      { vi: "Mức ảnh hưởng kỹ thuật của lỗi lên hệ thống", en: "The technical impact of the bug on the system", ja: "バグのシステムへの技術的影響" },
      { vi: "Ai là người sửa lỗi", en: "Who fixes the bug", ja: "誰が修正するか" },
      { vi: "Lỗi xuất hiện lúc mấy giờ", en: "What time the bug appears", ja: "バグが何時に出るか" },
    ], correct: 1,
    explain: { vi: "Severity = mức ảnh hưởng kỹ thuật (sập/hỏng nặng hay nhẹ). Còn 'gấp hay không' là Priority.", en: "Severity = technical impact (how badly it breaks). Urgency is Priority.", ja: "重大度＝技術的影響（どれだけ壊れるか）。緊急度は優先度。" },
  }),
  mcq({
    q: { vi: "Nút 'Đặt hàng' ở trang chủ bị viết sai chính tả. Cách xếp hợp lý nhất là?", en: "The homepage 'Order' button has a typo. The most reasonable rating is?", ja: "トップの『注文』ボタンが誤字。最も妥当な評価は？" },
    options: [
      { vi: "Severity Critical, Priority Low", en: "Severity Critical, Priority Low", ja: "重大度Critical・優先度Low" },
      { vi: "Severity Low, Priority High", en: "Severity Low, Priority High", ja: "重大度Low・優先度High" },
      { vi: "Severity Critical, Priority Highest", en: "Severity Critical, Priority Highest", ja: "重大度Critical・優先度Highest" },
      { vi: "Severity Low, Priority Low", en: "Severity Low, Priority Low", ja: "重大度Low・優先度Low" },
    ], correct: 1,
    explain: { vi: "Không hỏng chức năng → Severity Low; nhưng lộ ở nút mua chính, hại uy tín → Priority High.", en: "No function breaks → Low severity; but it's on the main buy button, hurting trust → High priority.", ja: "機能は壊れない→低重大度；しかし購入ボタンで信用を損なう→高優先度。" },
  }),
  mcq({
    q: { vi: "Ai thường là người ĐỀ XUẤT Severity của một lỗi?", en: "Who usually PROPOSES a bug's severity?", ja: "通常、バグの重大度を提案するのは誰？" },
    options: [
      { vi: "Tester", en: "The tester", ja: "テスター" },
      { vi: "Khách hàng", en: "The customer", ja: "顧客" },
      { vi: "Kế toán", en: "The accountant", ja: "経理" },
      { vi: "Nhân viên giao hàng", en: "The delivery staff", ja: "配達員" },
    ], correct: 0,
    explain: { vi: "Tester hiểu lỗi ảnh hưởng chức năng ra sao nên đề xuất Severity; Priority thường do PM/Leader.", en: "The tester understands the functional impact so proposes Severity; Priority is usually PM/Leader's.", ja: "テスターが機能影響を理解し重大度を提案；優先度は通常PM/リーダー。" },
  }),
  mcq({
    q: { vi: "Câu nào ĐÚNG về quan hệ giữa Severity và Priority?", en: "Which statement is TRUE about severity vs priority?", ja: "重大度と優先度の関係で正しいのは？" },
    options: [
      { vi: "Severity cao thì Priority luôn cao", en: "High severity always means high priority", ja: "高重大度は必ず高優先度" },
      { vi: "Chúng độc lập: có thể lệch nhau tùy ngữ cảnh", en: "They are independent: they can differ by context", ja: "独立：文脈により異なり得る" },
      { vi: "Chúng luôn bằng nhau", en: "They are always equal", ja: "常に等しい" },
      { vi: "Chỉ cần đặt một trong hai", en: "You only need to set one of them", ja: "片方だけ設定すればよい" },
    ], correct: 1,
    explain: { vi: "Severity (ảnh hưởng kỹ thuật) và Priority (độ gấp) độc lập; một lỗi có thể lệch hai mức.", en: "Severity (technical impact) and Priority (urgency) are independent; a bug can differ on the two.", ja: "重大度（技術影響）と優先度（緊急度）は独立；1バグで両者が異なり得る。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Severity là độ nghiêm trọng về kỹ thuật của một lỗi; Priority là độ gấp cần sửa. Hai thứ độc lập và người mới rất hay nhầm. Bài này bám màn hình thanh toán ShopEasy: bạn học cách chấm Severity, đề xuất Priority, dùng ma trận để quyết định, và ghi đúng lên ticket. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Severity is a bug's technical seriousness; Priority is how urgent the fix is. They're independent and beginners often confuse them. This follows ShopEasy's checkout screen: you learn to rate Severity, propose Priority, use a matrix to decide, and record them correctly on a ticket. Lots of visuals and a quiz at the end.",
        "重大度はバグの技術的深刻さ、優先度は修正の緊急度です。両者は独立で初心者が混同しがち。本記事はShopEasyの決済画面に沿い、重大度の付け方、優先度の提案、マトリクスでの判断、チケットへの正しい記録を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi mở một lỗi, bạn sẽ phải điền hai ô hay bị nhầm: Severity và Priority. Nghe giống nhau nhưng chúng trả lời hai câu hỏi khác nhau: 'lỗi này hỏng nặng cỡ nào?' (Severity) và 'có cần sửa gấp không?' (Priority). Hiểu tách bạch hai câu hỏi này, bạn sẽ chấm lỗi chuyên nghiệp và giúp cả đội xử lý đúng thứ tự. Chúng ta học qua một app mua sắm thật, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! When you file a bug, you must fill two often-confused fields: Severity and Priority. They sound alike but answer two different questions: 'how badly does this break?' (Severity) and 'how urgently must we fix it?' (Priority). Separating these two questions lets you rate bugs professionally and helps the team work in the right order. We'll learn through a real shopping app, with visuals and hands-on practice.",
        "こんにちは、初心者さん！バグを起票する時、混同しやすい2項目を埋めます：重大度と優先度。似ていますが別の問いに答えます：『どれだけ壊れるか』（重大度）と『どれだけ急いで直すか』（優先度）。この2問を分けて考えれば、プロらしくバグを評価でき、チームが正しい順序で動けます。実際の買い物アプリで、図と実習を通じて学びます。"),
      IMG(m_screen, "Màn hình test: nút 'Đặt hàng' bị viết sai chính tả ở trang thanh toán ShopEasy", "Screen under test: the 'Order' button is misspelled on ShopEasy checkout", "テスト対象画面：ShopEasy決済の『注文』ボタンが誤字"),
      DEF("Severity (độ nghiêm trọng)", "mức ảnh hưởng kỹ thuật của lỗi lên hệ thống, do tester đánh giá.",
        "severity — the technical impact of a bug on the system, judged by the tester.",
        "重大度 — バグのシステムへの技術的影響。テスターが判断。"),
      DEF("Priority (độ ưu tiên)", "mức gấp về thứ tự sửa, do PM/Leader quyết định theo rủi ro kinh doanh.",
        "priority — the urgency of the fix order, decided by the PM/Leader based on business risk.",
        "優先度 — 修正順の緊急度。事業リスクに基づきPM/リーダーが決定。"),
    ] },
  { heading: { vi: "2. Hai khái niệm nhìn cạnh nhau", en: "2. The two concepts side by side", ja: "2. 2つの概念を並べて見る" },
    blocks: [
      P("Cách dễ nhớ nhất: Severity nói về SẢN PHẨM (lỗi làm hỏng chức năng tới đâu), còn Priority nói về KẾ HOẠCH (khi nào cần sửa). Một bên nhìn vào phần mềm, một bên nhìn vào lịch làm việc và khách hàng. Vì nhìn hai hướng khác nhau, chúng không nhất thiết đi cùng nhau.",
        "The easiest way to remember: Severity is about the PRODUCT (how badly a function breaks), while Priority is about the PLAN (when it must be fixed). One looks at the software, the other at the schedule and customers. Because they look in different directions, they don't have to move together.",
        "覚え方：重大度は製品（機能がどれだけ壊れるか）、優先度は計画（いつ直すべきか）。一方はソフト、他方はスケジュールと顧客を見ます。別方向を見るため、必ずしも一致しません。"),
      IMG(m_sev, "Thang độ nghiêm trọng (Severity): Critical → High → Medium → Low kèm ví dụ", "Severity scale: Critical → High → Medium → Low with examples", "重大度スケール：Critical→High→Medium→Low（例付き）"),
      IMG(m_pri, "Thang độ ưu tiên (Priority): Highest → High → Medium → Low kèm căn cứ", "Priority scale: Highest → High → Medium → Low with rationale", "優先度スケール：Highest→High→Medium→Low（根拠付き）"),
      P("Bạn không cần thuộc lòng từng nhãn ngay. Hãy nắm ý: Severity trả lời 'hỏng nặng cỡ nào', Priority trả lời 'sửa gấp cỡ nào'. Khi điền ticket, bạn tự hỏi hai câu này riêng biệt thay vì gộp làm một — đó đã là bước tiến lớn so với nhiều bạn mới.",
        "You don't need to memorize each label immediately. Grasp the idea: Severity answers 'how badly it breaks', Priority answers 'how urgently to fix'. When filling a ticket, ask these two questions separately instead of merging them — that alone is a big step ahead of many beginners.",
        "各ラベルをすぐ暗記する必要はありません。要点を掴む：重大度は『どれだけ壊れるか』、優先度は『どれだけ急ぐか』。チケット記入時、両者を混ぜず別々に問う — それだけで多くの初心者より一歩前進です。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần phân biệt rõ", en: "3. Why beginners must tell them apart", ja: "3. 初心者が明確に区別すべき理由" },
    blocks: [
      P("Nếu bạn nhầm hai khái niệm, cả đội sẽ xử lý sai thứ tự. Đặt Priority thấp cho một lỗi thực ra rất gấp có thể khiến lỗi hại uy tín nằm im nhiều ngày. Ngược lại, hét Priority cao cho mọi lỗi nhỏ khiến lập trình viên mất tập trung vào việc quan trọng. Chấm đúng giúp nguồn lực chảy vào đúng chỗ.",
        "If you confuse the two, the team works in the wrong order. Setting low Priority on a truly urgent bug can leave a reputation-hurting issue sitting for days. Conversely, shouting high Priority on every small bug distracts developers from important work. Rating correctly channels effort to the right place.",
        "2つを混同するとチームの順序が狂います。本当に急ぐバグに低優先度を付けると、信用を損なう問題が何日も放置され得ます。逆に小さなバグ全てに高優先度を叫ぶと開発者が重要作業から逸れます。正しい評価が労力を正しい場所へ導きます。"),
      P("Với riêng bạn — người mới — đây còn là câu hỏi phỏng vấn gần như chắc chắn gặp: 'Phân biệt Severity và Priority, cho ví dụ severity thấp nhưng priority cao'. Trả lời rành mạch kèm ví dụ thật cho thấy bạn hiểu công việc thực tế, không học vẹt. Đây là điểm cộng lớn khi ứng tuyển vị trí Tester.",
        "For you specifically — a beginner — this is also an almost-certain interview question: 'Distinguish severity and priority, give an example of low severity but high priority.' A clear answer with a real example shows you understand real work, not rote learning. It's a big plus when applying for a Tester role.",
        "特に初心者のあなたには、ほぼ確実に出る面接質問でもあります：『重大度と優先度を区別し、低重大度・高優先度の例を挙げて』。実例付きの明快な回答は、丸暗記でなく実務理解を示します。テスター応募で大きな加点です。"),
      P("Và quan trọng nhất, phân biệt đúng giúp bạn bảo vệ trải nghiệm khách hàng: nhiều lỗi 'nhỏ về kỹ thuật' nhưng đập vào mắt mọi người (sai giá hiển thị, sai tên nút mua) lại cần sửa trước cả những lỗi nặng nhưng ẩn sâu. Bạn chính là người nhìn ra và lên tiếng cho những trường hợp đó.",
        "Most importantly, telling them apart helps you protect the customer experience: many 'technically small' bugs that hit everyone's eyes (wrong displayed price, wrong buy-button label) need fixing before deep-but-hidden serious ones. You're the one who spots and speaks up for such cases.",
        "最も重要なのは、区別が顧客体験を守ることです：技術的には小さくても全員の目に入るバグ（表示価格の誤り、購入ボタン名の誤り）は、深く隠れた重大バグより先に直すべき場合が多い。あなたがそれを見抜き声を上げる人です。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: thang đo & công cụ", en: "4. Prepare: the scales & tools", ja: "4. 準備：スケールとツール" },
    blocks: [
      P("Mỗi công ty có thể đặt tên mức hơi khác, nhưng ý nghĩa giống nhau. Bạn chỉ cần nắm thang 4 mức cho mỗi bên và biết chỗ điền chúng trong công cụ quản lý lỗi.",
        "Each company may name the levels slightly differently, but the meaning is the same. You just need the 4-level scale for each side and to know where to enter them in the bug tracker.",
        "各社でレベル名は少し異なり得ますが意味は同じ。各側の4段階スケールを掴み、バグ管理ツールでの記入場所を知るだけで十分です。"),
      STEP(1, "Học thang Severity: Critical / High / Medium / Low (theo mức hỏng chức năng).", "Learn the Severity scale: Critical / High / Medium / Low (by how badly a function breaks).", "重大度スケールを学ぶ：Critical/High/Medium/Low（機能の壊れ度で）。"),
      STEP(2, "Học thang Priority: Highest / High / Medium / Low (theo mức gấp cần sửa).", "Learn the Priority scale: Highest / High / Medium / Low (by fix urgency).", "優先度スケールを学ぶ：Highest/High/Medium/Low（修正の緊急度で）。"),
      STEP(3, "Trong ticket (Jira/Excel), tìm hai trường 'Severity' và 'Priority' — điền riêng, đừng để trùng máy móc.", "In the ticket (Jira/Excel), find the 'Severity' and 'Priority' fields — fill them separately, don't mirror mechanically.", "チケット（Jira/Excel）で『Severity』『Priority』項目を探す — 別々に記入、機械的に一致させない。"),
      TRY("Nghĩ một lỗi bạn từng thấy trong app bạn dùng: bạn sẽ chấm Severity mức nào? Priority mức nào? Vì sao?", "Think of a bug you've seen in an app you use: what Severity would you give? What Priority? Why?", "使うアプリで見たバグを思い浮かべて：重大度は？優先度は？なぜ？"),
      PITFALL("Đặt Priority = Severity một cách máy móc (Critical → Highest, Low → Low). Đúng ý nghĩa mới là điều quan trọng, không phải sao chép.", "Mechanically setting Priority = Severity (Critical → Highest, Low → Low). What matters is the true meaning, not copying.", "優先度＝重大度を機械的に設定（Critical→Highest, Low→Low）。大切なのは真の意味で、コピーではない。"),
      IMG(m_sev, "Bảng thang Severity dùng làm chuẩn khi chấm lỗi", "The Severity scale table to use as a rating standard", "評価基準に使う重大度スケール表"),
    ] },
  { heading: { vi: "5. Ma trận Severity × Priority (cách quyết định)", en: "5. The Severity × Priority matrix (how to decide)", ja: "5. 重大度×優先度マトリクス（判断方法）" },
    blocks: [
      P("Cách thực dụng nhất để không nhầm là nghĩ theo ma trận: với mỗi lỗi, trả lời hai câu hỏi độc lập rồi đặt nó vào một trong bốn ô. Bốn ô 'kinh điển' dưới đây bao trùm hầu hết tình huống bạn gặp.",
        "The most practical way not to confuse them is to think in a matrix: for each bug, answer the two independent questions, then place it in one of four cells. The four 'classic' cells below cover most situations you'll meet.",
        "混同しない最も実用的な方法はマトリクス思考：各バグで独立した2問に答え、4象限のいずれかに置く。以下の4つの定番セルが遭遇状況の大半を覆います。"),
      STEP(1, "Hỏi 1: lỗi làm hỏng chức năng nặng hay nhẹ? → chọn Severity.", "Q1: does the bug break a function badly or mildly? → choose Severity.", "問1：機能を重く壊すか軽くか？→重大度を選ぶ。"),
      STEP(2, "Hỏi 2: có nhiều người thấy / gấp về kinh doanh không? → đề xuất Priority.", "Q2: do many people see it / is it business-urgent? → propose Priority.", "問2：多くの人が見るか/事業的に急ぐか？→優先度を提案。"),
      STEP(3, "Đặt lỗi vào ô tương ứng và viết một câu lý do — nhất là khi hai mức lệch nhau.", "Place the bug in the matching cell and write a one-line reason — especially when the two levels differ.", "対応セルに置き、理由を一行書く — 特に両者が異なる時。"),
      CODE("text", "VÍ DỤ CHẤM 4 LỖI (ShopEasy)\n1) Sập trang thanh toán        -> Severity Critical | Priority Highest (nặng + gấp)\n2) Sai chính tả nút 'Đặt hàng' -> Severity Low      | Priority High    (nhẹ nhưng ai cũng thấy)\n3) Sập export báo cáo admin     -> Severity High     | Priority Low     (nặng nhưng ít người dùng)\n4) Lệch màu icon trang cài đặt  -> Severity Low      | Priority Low     (nhẹ + ít ảnh hưởng)"),
      IMG(m_matrix, "Ma trận với 4 ví dụ: chú ý ô Severity Low nhưng Priority High", "The matrix with 4 examples: note the Low-severity but High-priority cell", "4例のマトリクス：低重大度・高優先度のセルに注目"),
      TRY("Tự đặt lỗi 'ảnh sản phẩm tải chậm 3 giây trên mobile' vào một ô: Severity? Priority? Giải thích ngắn.", "Place 'product image loads 3s slow on mobile' in a cell: Severity? Priority? Explain briefly.", "『モバイルで商品画像が3秒遅い』をセルに置こう：重大度？優先度？簡潔に説明。"),
    ] },
  { heading: { vi: "6. Tình huống 1: severity thấp nhưng priority cao", en: "6. Situation 1: low severity but high priority", ja: "6. シーン1：低重大度だが高優先度" },
    blocks: [
      SITUATION("Bạn thấy nút 'Đặt hàng' ở trang thanh toán bị viết thành 'Đặc hàng'.", "You see the checkout 'Order' button spelled as 'Ordre'.",
        "Về kỹ thuật, lỗi này không làm hỏng chức năng — bấm vẫn đặt được hàng — nên Severity chỉ Low. Nhưng nó nằm ngay nút mua chính ở trang thanh toán, mọi khách đều thấy, gây cảm giác thiếu chuyên nghiệp và giảm niềm tin.",
        "Technically it doesn't break the function — clicking still orders — so Severity is only Low. But it's right on the main buy button at checkout; every customer sees it, looking unprofessional and lowering trust.",
        "決済の『注文』ボタンが『注文』の誤字。", "技術的に機能は壊れず — 押せば注文できる — 重大度はLow。しかし決済の購入ボタン上にあり、全顧客が見て非専門的に映り信用を下げます。"),
      SOLVE("Chấm Severity Low nhưng đề xuất Priority High/Highest, ghi rõ lý do 'ảnh hưởng uy tín, hiển thị cho mọi khách ở nút mua chính'.", "Rate Severity Low but propose Priority High/Highest, stating the reason 'reputation impact, visible to all customers on the main buy button'.", "重大度Lowだが優先度High/Highestを提案し、理由『信用に影響、購入ボタンで全顧客に表示』を明記。"),
      P("Đây chính là ví dụ kinh điển cho thấy Severity và Priority độc lập. Nếu bạn máy móc đặt Priority Low chỉ vì Severity Low, một lỗi hại thương hiệu sẽ bị xếp cuối hàng và nằm đó rất lâu. Việc bạn nêu rõ 'nhẹ về kỹ thuật nhưng gấp về kinh doanh' giúp Leader ra quyết định đúng và cho thấy bạn tư duy như người đi làm thật.",
        "This is the classic example showing Severity and Priority are independent. If you mechanically set Priority Low just because Severity is Low, a brand-damaging bug gets queued last and sits there for ages. Clearly stating 'technically minor but business-urgent' helps the Leader decide right and shows you think like a real professional.",
        "これは重大度と優先度が独立である定番例です。重大度がLowだからと機械的に優先度Lowにすると、ブランドを傷つけるバグが最後尾に回り長く放置されます。『技術的に軽微だが事業的に緊急』と明記すれば、リーダーが正しく判断でき、実務家のような思考を示せます。"),
      IMG(m_jira, "Ticket ghi Severity Low, Priority High, kèm lý do vì sao gấp", "A ticket showing Severity Low, Priority High, with the urgency reason", "重大度Low・優先度High・緊急理由を記したチケット"),
      RECAP(["Severity thấp KHÔNG kéo theo Priority thấp", "Lỗi hiển thị cho mọi khách ở màn hình chính thường gấp"],
        ["Low severity does NOT imply low priority", "Bugs visible to all users on key screens are often urgent"],
        ["低重大度は低優先度を意味しない", "主要画面で全ユーザーに見えるバグは急ぐことが多い"]),
    ] },
  { heading: { vi: "7. Tình huống 2: severity cao nhưng priority thấp", en: "7. Situation 2: high severity but low priority", ja: "7. シーン2：高重大度だが低優先度" },
    blocks: [
      SITUATION("Bạn phát hiện tính năng 'Xuất báo cáo doanh thu' trong trang admin bị sập hoàn toàn.", "You find the 'Export revenue report' feature in the admin page fully crashes.",
        "Về kỹ thuật, tính năng hỏng nặng (bấm là lỗi trắng trang) → Severity High. Nhưng tính năng này chỉ một quản trị viên dùng vào cuối tháng, hiện đang giữa tháng và có thể xuất tạm bằng cách khác.",
        "Technically the feature is badly broken (clicking blanks the page) → High severity. But only one admin uses it at month-end, it's mid-month now, and there's a temporary export workaround.",
        "管理画面の『売上レポート出力』が完全にクラッシュ。", "技術的に機能は重く壊れ（押すと白画面）→高重大度。しかし月末に管理者1名のみ使用、今は月中で代替出力も可能。"),
      SOLVE("Chấm Severity High nhưng đề xuất Priority Low/Medium, nêu rõ 'ít người dùng, có workaround, không gấp trong tuần này'.", "Rate Severity High but propose Priority Low/Medium, noting 'few users, has a workaround, not urgent this week'.", "重大度Highだが優先度Low/Mediumを提案し『少数利用・代替あり・今週は急がない』と明記。"),
      P("Trường hợp ngược lại cũng quan trọng không kém. Một lỗi nặng về kỹ thuật chưa chắc phải sửa ngay nếu nó ít ảnh hưởng và có cách né tạm. Nếu bạn hét Priority Highest cho mọi lỗi Severity High, đội sẽ phải bỏ dở việc quan trọng hơn. Nêu đủ bối cảnh (số người dùng, có workaround, thời điểm cần) giúp Priority được đặt hợp lý — đó là tư duy cân bằng giữa kỹ thuật và kinh doanh.",
        "The reverse case matters just as much. A technically severe bug needn't be fixed immediately if it barely affects anyone and has a temporary workaround. If you shout Priority Highest for every High-severity bug, the team must drop more important work. Providing context (user count, workaround, when it's needed) helps set Priority sensibly — balanced thinking between tech and business.",
        "逆のケースも同様に重要です。技術的に重大でも、影響が小さく一時的回避策があれば即修正は不要。高重大度全てに優先度Highestを叫ぶと、チームはより重要な作業を中断せねばなりません。文脈（利用者数・回避策・必要時期）を示せば優先度を妥当に設定でき、技術と事業のバランス思考です。"),
      IMG(m_dash, "Bảng phân bổ lỗi theo mức nghiêm trọng giúp cả đội nhìn bức tranh chung", "A severity-distribution panel helps the team see the big picture", "重大度分布パネルでチームが全体像を把握"),
      TRY("Viết một câu lý do Priority cho lỗi trên để thuyết phục Leader vì sao chưa cần sửa gấp.", "Write a one-line Priority rationale for the bug above to convince the Leader why it isn't urgent yet.", "上記バグの優先度理由を一行書き、まだ急がない理由をリーダーに納得させよう。"),
    ] },
  { heading: { vi: "8. Ghi nhận đúng lên ticket", en: "8. Recording correctly on the ticket", ja: "8. チケットへの正しい記録" },
    blocks: [
      P("Khi mở lỗi, hãy điền cả hai trường và — nếu hai mức lệch nhau — thêm một câu giải thích. Câu giải thích đó chính là điểm khác biệt giữa một ticket nghiệp dư và một ticket chuyên nghiệp.",
        "When filing a bug, fill both fields and — if the two levels differ — add one explaining sentence. That sentence is the difference between an amateur ticket and a professional one.",
        "起票時は両項目を埋め、両者が異なるなら説明を一文添えます。その一文がアマとプロのチケットの差です。"),
      STEP(1, "Điền Severity theo ảnh hưởng kỹ thuật (đừng để trống hay đoán bừa).", "Fill Severity by technical impact (don't leave blank or guess wildly).", "技術的影響で重大度を記入（空欄や当てずっぽう禁止）。"),
      STEP(2, "Đề xuất Priority + 1 câu lý do dựa trên số người dùng và rủi ro kinh doanh.", "Propose Priority + a one-line reason based on user count and business risk.", "優先度を提案＋利用者数と事業リスクに基づく理由を一行。"),
      CODE("text", "TICKET SE-10510 (nút 'Đặt hàng' sai chính tả)\nSeverity: Low       (không hỏng chức năng, vẫn đặt được hàng)\nPriority: High       (nút mua chính ở trang thanh toán, mọi khách đều thấy)\nGhi chú: severity thấp nhưng priority cao vì ảnh hưởng uy tín -> đề xuất đưa vào hotfix."),
      IMG(m_pri, "Thang Priority làm căn cứ khi đề xuất mức ưu tiên trên ticket", "The Priority scale to justify the proposed priority on a ticket", "チケットで優先度を裏付ける優先度スケール"),
      TIP("Khi Severity và Priority lệch nhau, LUÔN thêm một câu lý do — đó là lúc người đọc ticket cần bạn giải thích nhất.", "When Severity and Priority differ, ALWAYS add a reason line — that's when the reader needs your explanation most.", "重大度と優先度が異なる時は必ず理由を一行 — 読み手が最も説明を必要とする場面です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi chấm Severity và Priority. Biết trước giúp bạn chấm khách quan và được đồng đội tin tưởng.",
        "Beginners often stumble on a few common mistakes when rating Severity and Priority. Knowing them helps you rate objectively and earn teammates' trust.",
        "初心者は重大度と優先度の評価で共通の失敗をしがちです。事前に知れば客観的に評価でき、仲間の信頼を得られます。"),
      PITFALL("Đặt Priority bằng Severity một cách tự động — bỏ qua yếu tố số người dùng và uy tín thương hiệu.", "Auto-setting Priority equal to Severity — ignoring user count and brand reputation.", "優先度を重大度に自動一致 — 利用者数やブランド信用を無視。"),
      PITFALL("Chấm Severity theo cảm xúc ('mình thấy khó chịu nên Critical') thay vì theo ảnh hưởng kỹ thuật thực tế.", "Rating Severity by emotion ('it annoys me so Critical') instead of actual technical impact.", "感情で重大度を付ける（『不快だからCritical』）— 実際の技術的影響でなく。"),
      TIP("Tự hỏi tách bạch hai câu: 'Hỏng nặng cỡ nào?' (Severity) và 'Sửa gấp cỡ nào?' (Priority). Trả lời riêng, rồi mới ghi.", "Ask two separate questions: 'How badly does it break?' (Severity) and 'How urgently fix?' (Priority). Answer each, then record.", "2問を分けて問う：『どれだけ壊れる？』（重大度）と『どれだけ急ぐ？』（優先度）。別々に答えてから記録。"),
      IMG(m_matrix, "Nhắc lại ma trận: hai trục độc lập, đừng gộp làm một", "Matrix reminder: two independent axes, don't merge them", "マトリクス再確認：独立した2軸、混ぜない"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học phân biệt Severity (độ nghiêm trọng kỹ thuật) và Priority (độ gấp cần sửa) qua app ShopEasy: nắm hai thang đo, dùng ma trận để đặt lỗi vào đúng ô, xử lý hai tình huống lệch mức kinh điển, và ghi đúng lên ticket kèm lý do. Đây là kỹ năng nền tảng giúp bạn chấm lỗi chuyên nghiệp và trả lời trôi chảy câu hỏi phỏng vấn quen thuộc.",
        "You just learned to distinguish Severity (technical seriousness) and Priority (fix urgency) through the ShopEasy app: grasping the two scales, using the matrix to place bugs correctly, handling the two classic mismatched cases, and recording correctly on a ticket with a reason. This foundational skill lets you rate bugs professionally and answer a familiar interview question fluently.",
        "ShopEasyアプリで重大度（技術的深刻さ）と優先度（修正緊急度）の区別を学びました：2つのスケール、マトリクスでの正しい配置、2つの定番のズレ事例、理由付きの正しいチケット記録。プロらしくバグを評価し、定番の面接質問に流暢に答える土台スキルです。"),
      P("Chặng tiếp theo, bạn nên luyện viết bug report thật chắc và nắm vòng đời của một lỗi để phối hợp mượt với lập trình viên. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, practice writing solid bug reports and master the bug life cycle to collaborate smoothly with developers. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、しっかりしたバグ報告の練習とバグライフサイクルの習得で開発者と円滑に連携を。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const SEV_PRI_01 = makeDoc({
  slug: "severity-priority-do-nghiem-trong-do-uu-tien-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "severity và priority",
  keywords: ["severity và priority", "độ nghiêm trọng độ ưu tiên", "severity vs priority", "phân biệt severity priority", "mức độ lỗi cho người mới"],
  coverLabel: "NGƯỜI MỚI · SEVERITY vs PRIORITY · TMĐT",
  crumb: "Severity vs Priority (Độ nghiêm trọng & Độ ưu tiên)",
  metaTitle: { vi: "Severity và Priority của lỗi cho người mới", en: "Bug severity vs priority for beginners", ja: "バグの重大度と優先度（初心者向け）" },
  metaDescription: {
    vi: "Phân biệt severity và priority của lỗi cho người mới: hai thang đo, ma trận severity × priority, ví dụ severity thấp priority cao, cách ghi ticket, có trắc nghiệm.",
    en: "Distinguish bug severity and priority for beginners: the two scales, the severity × priority matrix, a low-severity high-priority example, how to log a ticket, with visuals and a quiz.",
    ja: "初心者向けにバグの重大度と優先度を区別：2スケール、重大度×優先度マトリクス、低重大度・高優先度の例、チケット記録、図とクイズ付き。",
  },
  title: {
    vi: "Severity và Priority của lỗi cho người mới: phân biệt & ma trận quyết định (có trắc nghiệm)",
    en: "Bug severity vs priority for beginners: distinction & decision matrix (with quiz)",
    ja: "初心者のためのバグ重大度と優先度：区別と判断マトリクス（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: phân biệt Severity (độ nghiêm trọng kỹ thuật) và Priority (độ gấp cần sửa) qua app TMĐT ShopEasy. Hai thang đo 4 mức, ma trận severity × priority, hai tình huống lệch mức kinh điển (severity thấp/priority cao và ngược lại), ai chấm mức nào, cách ghi ticket kèm lý do, nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: distinguish Severity (technical seriousness) and Priority (fix urgency) through the ShopEasy e-commerce app. Two 4-level scales, the severity × priority matrix, two classic mismatched cases (low severity/high priority and vice versa), who rates what, how to log a ticket with a reason, many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyで重大度（技術的深刻さ）と優先度（修正緊急度）を区別。4段階の2スケール、重大度×優先度マトリクス、2つの定番のズレ事例、誰が何を評価するか、理由付きのチケット記録、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chấm Severity và Priority cho một lỗi", steps: [
    { name: "Chấm Severity theo ảnh hưởng kỹ thuật", text: "Hỏi 'lỗi làm hỏng chức năng nặng hay nhẹ?' → Critical/High/Medium/Low." },
    { name: "Đề xuất Priority theo mức gấp", text: "Hỏi 'nhiều người thấy / gấp về kinh doanh không?' → Highest/High/Medium/Low." },
    { name: "Ghi lên ticket kèm lý do khi hai mức lệch nhau", text: "Thêm một câu giải thích vì sao severity và priority khác nhau." },
  ] },
  pages,
});

export const MANUAL_BEGINNER_SEVPRI_01 = [SEV_PRI_01];
