// doc_mb_smoke_sanity.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Phân biệt Smoke test & Sanity test — khi nào dùng cái nào, khác regression thế nào,
// checklist smoke thực tế, và cách quyết định "đủ ổn định để test tiếp?".
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, grid, jira, kanban, dashboard, btn, annotate } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình CI/CD — build mới vừa lên staging, trạng thái + chú thích ──
const m_build = browser("shopeasy.vn/ci-cd/build/482", [
  `<rect x="24" y="16" width="712" height="94" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="44" y="46" font-size="14" font-weight="800" fill="#166534">Build #482 · nhánh main · vừa deploy staging</text>
  <text x="44" y="70" font-size="12" fill="#15803d">CI: Unit test ✓ · Build ✓ · Deploy staging ✓ — chờ Tester kiểm tra</text>
  <text x="44" y="92" font-size="11" fill="#64748b">08:32 · gộp PR #1290 "Thêm mã giảm giá" + PR #1288 "Sửa API đăng nhập"</text>`,
  btn(24, 126, 300, "▶ Chạy Smoke Test (chức năng sống còn)", "primary"),
  btn(340, 126, 260, "Chạy Sanity (vùng vừa sửa)", "ghost"),
  annotate(20, 10, 712, 104, "BUILD MỚI · gộp nhiều thay đổi → nên ưu tiên Smoke trước"),
].join(""), { h: 210, title: "ShopEasy · CI/CD", accent: "#0ea5e9" });

// ── Mockup 2: bảng so sánh Smoke vs Sanity vs Regression ──
const m_compare = grid("So sánh Smoke Test · Sanity Test · Regression Test", ["Tiêu chí", "Smoke Test", "Sanity Test", "Regression Test"], [
  ["Khi nào chạy", "Ngay sau mỗi bản build mới", "Ngay sau khi sửa/thêm 1 vùng cụ thể", "Trước khi release / định kỳ"],
  ["Phạm vi", "Rộng nhưng NÔNG", "Hẹp nhưng SÂU", "Rộng và sâu"],
  ["Câu hỏi trả lời", "Build có 'sống' để test tiếp không?", "Chỗ vừa sửa đúng, không vỡ lân cận?", "Thay đổi có làm hỏng chức năng cũ?"],
  ["Thời lượng thường gặp", "5–15 phút", "5–15 phút", "Vài giờ – vài ngày"],
  ["Ai thường chạy", "Tester hoặc CI tự động", "Tester phụ trách vùng vừa sửa", "Đội test / bộ tự động hoá lớn"],
], { accent: "#0ea5e9", note: "Smoke và Sanity đều NHANH; khác nhau ở PHẠM VI — Smoke rộng-nông, Sanity hẹp-sâu. Regression thì rộng VÀ sâu, tốn thời gian hơn hẳn." });

// ── Mockup 3: checklist Smoke thực tế trên ShopEasy ──
const m_checklist = grid("Checklist Smoke Test — ShopEasy (chạy sau mỗi bản build mới)", ["Chức năng sống còn", "Cách kiểm nhanh", "Kết quả mong đợi"], [
  ["Trang chủ tải được", "Mở shopeasy.vn", "Tải xong dưới 3 giây, không trắng trang"],
  ["Đăng nhập", "Đăng nhập tài khoản có sẵn", "Vào được trang chủ, không lỗi 500"],
  ["Tìm kiếm sản phẩm", "Gõ 'áo thun', bấm Tìm", "Ra danh sách kết quả liên quan"],
  ["Thêm vào giỏ hàng", "Bấm 'Thêm vào giỏ' 1 sản phẩm", "Số lượng giỏ hàng tăng, không lỗi"],
  ["Đặt hàng", "Đi hết luồng đặt 1 sản phẩm", "Đặt thành công, có mã đơn hàng"],
], { accent: "#0ea5e9", note: "5 chức năng này là 'xương sống' — Smoke KHÔNG cần kiểm chi tiết từng trường, chỉ cần xác nhận chúng còn CHẠY ĐƯỢC." });

// ── Mockup 4: ticket Jira — bug lọt vì chỉ chạy Sanity hẹp, bỏ qua Smoke ──
const m_jira = jira({
  key: "SE-11330", title: "Đăng nhập lỗi 500 trên toàn site — không phát hiện vì chỉ chạy Sanity cho mã giảm giá",
  type: "Bug", status: "New", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126"],
    ["Bối cảnh", "Build #482 gộp PR 'Thêm mã giảm giá' + PR 'Sửa API đăng nhập'"],
    ["Các bước", "1) Mở shopeasy.vn 2) Nhập tài khoản có sẵn 3) Bấm Đăng nhập"],
    ["Kết quả mong đợi", "Đăng nhập thành công, vào trang chủ"],
    ["Kết quả thực tế", "Lỗi 500, không đăng nhập được — mọi khách hàng đều bị chặn"],
    ["Ghi chú", "Tester chỉ Sanity vùng mã giảm giá, không chạy Smoke rộng nên bỏ sót"],
  ],
});

// ── Mockup 5: dashboard so sánh thời gian Smoke vs Sanity trong tuần ──
const m_dash = dashboard("Thời gian kiểm thử sau build — ShopEasy (tuần này)", [
  { label: "Build mới trong tuần", value: "6", sub: "cần Smoke rộng", color: "#0ea5e9" },
  { label: "Chỉ sửa 1 vùng nhỏ", value: "9", sub: "đủ Sanity hẹp", color: "#16a34a" },
  { label: "TB thời gian Smoke", value: "12'", sub: "phút / lần", color: "#7c3aed" },
  { label: "TB thời gian Sanity", value: "4'", sub: "phút / lần", color: "#f59e0b" },
]);

// ── Mockup 6: kanban — quy trình quyết định sau mỗi thay đổi ──
const m_kanban = kanban("Quy trình quyết định: Smoke hay Sanity? (ShopEasy · Sprint 15)", [
  { name: "Build/PR mới", cards: [
    { key: "#482", title: "Gộp nhiều PR — chạy Smoke rộng", sev: "High" },
    { key: "#483", title: "Sửa nhãn nút — chỉ cần Sanity", sev: "Low" },
  ] },
  { name: "Đang Smoke", cards: [
    { key: "#482", title: "5 chức năng sống còn — đang chạy", sev: "High" },
  ] },
  { name: "Đang Sanity", cards: [
    { key: "#481", title: "Vùng giỏ hàng vừa sửa — đang kiểm", sev: "Medium" },
  ] },
  { name: "Đủ ổn định", cards: [
    { key: "#480", title: "Smoke pass — chuyển test sâu", sev: "Low" },
  ] },
  { name: "Trả về Dev", cards: [
    { key: "#479", title: "Smoke fail — chặn đăng nhập", sev: "Critical" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Smoke test và sanity test khác nhau ở điểm nào, nếu cả hai đều nhanh?",
  "How do smoke test and sanity test differ, if both are quick?",
  "Cả hai đều nhanh nhưng khác PHẠM VI: smoke test rộng và nông — chạy qua vài chức năng sống còn (đăng nhập, tìm kiếm, thêm giỏ, đặt hàng) để xác nhận cả build còn hoạt động, thường chạy ngay sau mỗi bản build mới. Sanity test hẹp và sâu — chỉ tập trung đúng vùng vừa sửa/thêm để xác nhận thay đổi đó đúng và không vỡ vùng lân cận gần nhất, thường chạy sau một bản vá nhỏ. Nói ngắn gọn: smoke hỏi 'cả build còn sống không?', sanity hỏi 'chỗ vừa sửa có ổn không?'.",
  "Both are quick but differ in SCOPE: smoke test is wide and shallow — it runs through a few vital functions (login, search, add to cart, checkout) to confirm the whole build still works, usually right after a new build. Sanity test is narrow and deep — it focuses only on the area just changed/added to confirm that change is correct and hasn't broken its closest neighbors, usually after a small patch. In short: smoke asks 'is the whole build alive?', sanity asks 'is the spot I just touched okay?'.",
  "スモークテストとサニティテストの違いは？両方とも速いのでは？",
  "どちらも短時間ですが範囲が異なります。スモークテストは広く浅く——ログイン・検索・カート追加・注文など少数の生命線機能を確認し、ビルド全体が動くかを確かめます（新しいビルド直後によく実施）。サニティテストは狭く深く——直前に変更・追加した箇所だけに集中し、その変更が正しく、近隣機能を壊していないかを確認します（小さな修正の後によく実施）。要するに、スモークは『ビルド全体が生きているか』、サニティは『いま触った箇所は大丈夫か』を問います。");
const faq2 = FAQ(
  "Khi nào nên chọn chạy sanity thay vì chạy smoke đầy đủ?",
  "When should I choose to run sanity instead of a full smoke test?",
  "Khi thay đổi rất nhỏ và bạn nắm rõ phạm vi ảnh hưởng — ví dụ chỉ đổi nhãn một nút, sửa một câu thông báo lỗi, hoặc vá một trường trong form — chạy sanity hẹp cho đúng vùng đó là đủ, không cần lặp lại toàn bộ smoke tốn thời gian. Ngược lại, nếu build gộp nhiều thay đổi cùng lúc, hoặc bạn không chắc phạm vi ảnh hưởng thực sự lớn tới đâu, hãy luôn ưu tiên chạy smoke rộng trước cho an toàn — chi phí một lần smoke rẻ hơn nhiều so với việc bỏ sót một chức năng sống còn bị vỡ.",
  "When the change is very small and you clearly know its impact scope — e.g. only changing a button's label, fixing an error message, or patching one form field — running a narrow sanity check on just that area is enough; you don't need to repeat the whole time-consuming smoke test. Conversely, if a build bundles many changes at once, or you're unsure how far the impact actually reaches, always prefer running a wide smoke test first for safety — one smoke run costs far less than missing a broken vital function.",
  "スモークではなくサニティを選ぶべきタイミングは？",
  "変更が非常に小さく、影響範囲を明確に把握できている場合——例えばボタンのラベル変更、エラーメッセージの修正、フォーム項目1つのパッチなど——その箇所だけの狭いサニティチェックで十分で、時間のかかるスモークテスト全体を繰り返す必要はありません。逆に、ビルドが複数の変更をまとめて含む場合や、影響範囲がどこまで及ぶか確信が持てない場合は、安全のため常に広いスモークテストを優先しましょう——1回のスモークのコストは、壊れた生命線機能を見逃すコストよりずっと小さいです。");
const faq3 = FAQ(
  "Smoke test và sanity test có thay thế được regression test không?",
  "Can smoke test and sanity test replace regression testing?",
  "Không. Smoke và sanity đều là kiểm tra NHANH, mang tính 'cổng vào' — trả lời câu hỏi build/bản vá có đủ ổn định để test tiếp hay không, chứ không đào sâu mọi luồng. Regression test thì rộng VÀ sâu hơn hẳn: kiểm tra lại toàn bộ chức năng liên quan (cũ lẫn mới) để chắc chắn thay đổi không làm hỏng bất cứ điều gì đã hoạt động trước đó, thường chạy trước khi release hoặc theo chu kỳ. Ba loại này bổ sung cho nhau theo tầng: smoke/sanity chặn sớm bản build lỗi rõ ràng, regression đảm bảo chất lượng tổng thể trước khi phát hành.",
  "No. Smoke and sanity are both quick, gate-style checks — answering whether a build/patch is stable enough to keep testing, not digging into every flow. Regression testing is far wider AND deeper: it re-checks all related functionality (old and new) to make sure the change hasn't broken anything that used to work, usually run before release or on a cycle. The three complement each other in layers: smoke/sanity catch obviously broken builds early, regression ensures overall quality before shipping.",
  "スモークテストとサニティテストは回帰テストの代わりになる？",
  "なりません。スモークとサニティはどちらも短時間の『関門』的チェックで、ビルド/パッチがテストを続けられるほど安定しているかに答えるだけで、あらゆるフローを深く掘り下げるものではありません。回帰テストははるかに広くて深く、関連する全機能（新旧問わず）を再確認し、変更が既存の動作を壊していないことを保証します。通常はリリース前や定期的に実施します。3つは階層的に補い合います：スモーク/サニティは明らかに壊れたビルドを早期に食い止め、回帰テストはリリース前の全体品質を保証します。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Smoke test dùng để trả lời câu hỏi nào?", en: "What question does a smoke test answer?", ja: "スモークテストはどんな問いに答える？" },
    options: [
      { vi: "Build mới có đủ ổn định (các chức năng sống còn còn chạy) để test tiếp không?", en: "Is the new build stable enough (vital functions still run) to keep testing?", ja: "新しいビルドはテストを続けられるほど安定している（生命線機能が動く）か？" },
      { vi: "Toàn bộ mọi trường trong mọi form có hợp lệ không?", en: "Are all fields in every form valid?", ja: "全フォームの全項目が有効か？" },
      { vi: "Hệ thống chịu được bao nhiêu người dùng cùng lúc?", en: "How many concurrent users can the system handle?", ja: "システムは同時に何人まで耐えられるか？" },
      { vi: "Giao diện có đúng màu sắc thiết kế không?", en: "Does the UI match the design colors?", ja: "UIはデザインの色と一致しているか？" },
    ], correct: 0,
    explain: { vi: "Smoke test kiểm nhanh, rộng nhưng nông vài chức năng sống còn để quyết định build có đáng test tiếp không.", en: "A smoke test quickly checks a few vital, wide-but-shallow functions to decide if a build is worth further testing.", ja: "スモークテストは少数の生命線機能を広く浅く素早く確認し、ビルドがさらにテストする価値があるか判断します。" },
  }),
  mcq({
    q: { vi: "Điểm khác biệt CHÍNH giữa sanity test và smoke test là gì?", en: "What is the MAIN difference between sanity test and smoke test?", ja: "サニティテストとスモークテストの主な違いは？" },
    options: [
      { vi: "Sanity test luôn tốn nhiều thời gian hơn smoke test", en: "Sanity test always takes longer than smoke test", ja: "サニティテストは常にスモークテストより時間がかかる" },
      { vi: "Sanity test tập trung hẹp và sâu vào đúng vùng vừa sửa/thêm, còn smoke test rộng và nông trên toàn hệ thống", en: "Sanity test focuses narrowly and deeply on the area just changed/added, while smoke test is wide and shallow across the whole system", ja: "サニティテストは変更・追加した箇所に狭く深く集中し、スモークテストはシステム全体を広く浅く確認する" },
      { vi: "Sanity test không cần môi trường staging", en: "Sanity test doesn't need a staging environment", ja: "サニティテストにはステージング環境は不要" },
      { vi: "Sanity test chỉ dành cho lập trình viên, không dành cho tester", en: "Sanity test is only for developers, not testers", ja: "サニティテストは開発者専用でテスターは行わない" },
    ], correct: 1,
    explain: { vi: "Smoke rộng-nông toàn hệ thống; sanity hẹp-sâu đúng vùng vừa đổi — đó là khác biệt cốt lõi về PHẠM VI.", en: "Smoke is wide-shallow across the system; sanity is narrow-deep on the changed area — that's the core difference in scope.", ja: "スモークはシステム全体を広く浅く、サニティは変更箇所を狭く深く——これが範囲における核心的な違いです。" },
  }),
  mcq({
    q: { vi: "Tình huống nào nên chọn chạy Sanity hẹp thay vì Smoke đầy đủ?", en: "Which situation should you choose a narrow Sanity check over a full Smoke test?", ja: "狭いサニティチェックをフルのスモークテストより選ぶべき状況は？" },
    options: [
      { vi: "Build gộp 5 pull request từ nhiều module khác nhau", en: "The build merges 5 pull requests from many different modules", ja: "ビルドが複数モジュールから5つのプルリクエストを統合している" },
      { vi: "Chỉ vừa sửa lại nhãn nút 'Áp dụng mã giảm giá', không đổi logic gì khác", en: "Only the 'Apply discount code' button label was just fixed, no other logic changed", ja: "『クーポン適用』ボタンのラベルだけを修正し、他のロジックは変えていない" },
      { vi: "Không rõ phạm vi ảnh hưởng của bản build mới", en: "The impact scope of the new build is unclear", ja: "新しいビルドの影響範囲が不明" },
      { vi: "Build vừa lên môi trường production lần đầu tiên", en: "The build has just gone to production for the first time", ja: "ビルドが初めて本番環境にリリースされた" },
    ], correct: 1,
    explain: { vi: "Thay đổi rất nhỏ, phạm vi rõ ràng (chỉ 1 nhãn nút) là tình huống lý tưởng để chạy Sanity hẹp thay vì lặp lại cả Smoke.", en: "A very small, clearly-scoped change (just one button label) is the ideal case for a narrow Sanity check instead of repeating the whole Smoke test.", ja: "非常に小さく範囲が明確な変更（ボタンラベル1つ）は、スモーク全体を繰り返すより狭いサニティチェックが理想的です。" },
  }),
  mcq({
    q: { vi: "Vì sao smoke/sanity test KHÔNG thể thay thế regression test?", en: "Why can't smoke/sanity testing replace regression testing?", ja: "なぜスモーク/サニティテストは回帰テストの代わりにならない？" },
    options: [
      { vi: "Vì smoke/sanity chỉ là kiểm tra nhanh mang tính cổng vào, không đào sâu và bao phủ toàn bộ chức năng liên quan như regression", en: "Because smoke/sanity are only quick gate-style checks, not deep and broad coverage of all related functions like regression", ja: "スモーク/サニティは短時間の関門チェックに過ぎず、回帰テストのように関連機能全体を深く広くカバーしない" },
      { vi: "Vì smoke/sanity chỉ được thực hiện bởi máy tính, không phải con người", en: "Because smoke/sanity can only be done by machines, not humans", ja: "スモーク/サニティは機械にしかできず人間には無理だから" },
      { vi: "Vì regression test không cần môi trường thật", en: "Because regression testing doesn't need a real environment", ja: "回帰テストは実環境を必要としないから" },
      { vi: "Vì smoke/sanity chỉ áp dụng cho ứng dụng di động", en: "Because smoke/sanity only apply to mobile apps", ja: "スモーク/サニティはモバイルアプリにしか使えないから" },
    ], correct: 0,
    explain: { vi: "Smoke/sanity trả lời 'đủ ổn định để test tiếp chưa', còn regression đào sâu toàn bộ chức năng liên quan trước khi release.", en: "Smoke/sanity answer 'stable enough to keep testing?', while regression digs deep into all related functionality before release.", ja: "スモーク/サニティは『テストを続けられるほど安定しているか』に答え、回帰テストはリリース前に関連機能全体を深く掘り下げます。" },
  }),
  mcq({
    q: { vi: "Khi Smoke Test FAIL ngay ở chức năng đăng nhập, hành động đúng tiếp theo là gì?", en: "When a Smoke Test FAILS right at the login function, what's the correct next action?", ja: "スモークテストがログイン機能で即座に失敗した場合、正しい次の行動は？" },
    options: [
      { vi: "Bỏ qua và tiếp tục test sâu các chức năng khác như bình thường", en: "Ignore it and keep deep-testing other functions as usual", ja: "無視して他の機能の詳細テストを通常どおり続ける" },
      { vi: "Dừng lại, báo lỗi và trả bản build về cho dev — chưa nên test tiếp trên build này", en: "Stop, report the bug and return the build to dev — don't keep testing this build yet", ja: "止まってバグを報告し、ビルドを開発者に差し戻す——このビルドでのテストはまだ続けない" },
      { vi: "Tự sửa code luôn để tiết kiệm thời gian", en: "Fix the code yourself right away to save time", ja: "時間を節約するため自分でコードを直してしまう" },
      { vi: "Chạy regression test đầy đủ ngay lập tức", en: "Immediately run the full regression test suite", ja: "すぐにフルの回帰テストを実行する" },
    ], correct: 1,
    explain: { vi: "Smoke fail nghĩa là build chưa đủ ổn định — test sâu tiếp lúc này chỉ lãng phí thời gian trên nền không vững.", en: "A failed smoke test means the build isn't stable enough — deep-testing further would just waste time on shaky ground.", ja: "スモーク失敗はビルドが十分に安定していないことを意味し、この状態で詳細テストを続けても不安定な土台の上で時間を無駄にするだけです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình build bạn sẽ kiểm", en: "1. TL;DR & the build screen you'll check", ja: "1. 要点とチェックするビルド画面" },
    blocks: [
      TLDR("Nhiều bạn mới nhầm lẫn smoke test và sanity test vì cả hai đều nhanh. Khác biệt nằm ở PHẠM VI: smoke test rộng-nông, kiểm vài chức năng sống còn (đăng nhập, tìm kiếm, giỏ hàng, đặt hàng) ngay sau mỗi bản build mới; sanity test hẹp-sâu, chỉ tập trung đúng vùng vừa sửa/thêm. Cả hai đều khác regression test — vốn rộng VÀ sâu hơn hẳn. Bài này bám vào bản build thật của app TMĐT ShopEasy, có checklist smoke, hai tình huống chọn sai loại kiểm thử, và cách quyết định 'build đã đủ ổn định để test tiếp chưa?'.",
        "Many beginners confuse smoke test and sanity test because both are quick. The difference is SCOPE: smoke test is wide-shallow, checking a few vital functions (login, search, cart, checkout) right after every new build; sanity test is narrow-deep, focusing only on the area just changed/added. Both differ from regression test, which is far wider AND deeper. This article follows a real build of the ShopEasy e-commerce app, with a smoke checklist, two situations of picking the wrong test type, and how to decide 'is the build stable enough to keep testing?'.",
        "初心者の多くはスモークテストとサニティテストを混同します。どちらも短時間だからです。違いは範囲にあります：スモークテストは広く浅く、新しいビルド直後に少数の生命線機能（ログイン、検索、カート、注文）を確認します。サニティテストは狭く深く、直前に変更・追加した箇所だけに集中します。どちらも回帰テストとは異なり、回帰テストははるかに広くて深いものです。本記事はECアプリShopEasyの実際のビルドに沿い、スモークチェックリスト、テスト種別を誤って選んだ2つのシーン、そして『ビルドはテストを続けられるほど安定しているか』の判断方法を扱います。"),
      P("Chào bạn mới! Câu hỏi 'phân biệt smoke test và sanity test' là một trong những câu phỏng vấn hay gặp nhất với tester mới vào nghề, vì hai khái niệm này rất dễ nhầm — cả hai đều là 'kiểm tra nhanh sau khi có thay đổi'. Nhưng nếu bạn từng đọc bài về hồi quy & smoke test, bài này sẽ đi một hướng khác: không nói về mối quan hệ smoke–regression nữa, mà đào sâu vào ranh giới thật sự giữa SMOKE và SANITY — hai loại kiểm thử rất dễ bị dùng lẫn cho nhau, và việc chọn sai loại có thể khiến bạn bỏ sót lỗi nghiêm trọng hoặc lãng phí thời gian quý giá.",
        "Hi, newcomer! The question 'distinguish smoke test and sanity test' is one of the most common interview questions for new testers, because the two concepts are easy to confuse — both are 'quick checks after a change'. But if you've read the article on regression & smoke testing, this one goes a different direction: not about the smoke–regression relationship, but digging into the real boundary between SMOKE and SANITY — two test types that get swapped for each other easily, and picking the wrong one can make you miss a serious bug or waste precious time.",
        "こんにちは、初心者さん！『スモークテストとサニティテストを区別する』という質問は、新人テスターへの面接で非常によく聞かれます。両者は混同しやすいからです——どちらも『変更後の素早い確認』です。しかし回帰テストとスモークテストに関する記事を読んだことがあるなら、本記事は別の方向に進みます：スモークと回帰の関係ではなく、スモークとサニティの本当の境界線を掘り下げます——この2つは互いに取り違えやすく、種類を間違えると重大なバグを見逃したり貴重な時間を無駄にしたりします。"),
      IMG(m_build, "Màn hình CI/CD: build #482 vừa lên staging, gộp nhiều thay đổi — cần quyết định chạy Smoke hay Sanity", "CI/CD screen: build #482 just deployed to staging, bundling several changes — need to decide Smoke or Sanity", "CI/CD画面：ビルド#482がステージングにデプロイされたばかりで複数の変更を含む——スモークかサニティか判断が必要"),
      DEF("Smoke Test", "kiểm thử nhanh, rộng nhưng nông trên vài chức năng sống còn của hệ thống, chạy ngay sau mỗi bản build mới, để trả lời 'build có đủ ổn định để test tiếp không'.",
        "a quick, wide-but-shallow test on a few vital system functions, run right after each new build, to answer 'is the build stable enough to keep testing'.",
        "新しいビルド直後に実施する、システムの少数の生命線機能に対する広く浅い迅速なテストで、『ビルドはテストを続けられるほど安定しているか』に答える。"),
    ] },
  { heading: { vi: "2. Smoke test là gì & khi nào chạy", en: "2. What is smoke test & when to run it", ja: "2. スモークテストとは何か・いつ実行するか" },
    blocks: [
      P("Tên gọi 'smoke test' xuất phát từ ngành điện: sau khi lắp ráp một mạch điện, kỹ sư cấp điện lần đầu và chỉ cần xem có bốc KHÓI hay không — nếu có khói, mạch hỏng rõ ràng, chưa cần kiểm chi tiết từng linh kiện. Trong phần mềm, smoke test cũng vậy: sau mỗi bản build mới (deploy lên staging, hoặc production), tester chạy nhanh qua vài chức năng SỐNG CÒN của hệ thống — đăng nhập, tìm kiếm, thêm vào giỏ, đặt hàng — để xem build có 'bốc khói' (lỗi rõ ràng, sập ngay) hay không.",
        "The name 'smoke test' comes from electronics: after assembling a circuit, engineers power it on for the first time and just watch for SMOKE — if smoke appears, the circuit is clearly broken, no need to check every component yet. In software, smoke test works the same way: after every new build (deployed to staging or production), a tester quickly runs through a few VITAL functions — login, search, add to cart, checkout — to see if the build 'smokes' (obvious, immediate breakage) or not.",
        "『スモークテスト』という名前は電子回路の分野に由来します：回路を組み立てた後、技術者は初めて通電し、煙が出るかどうかだけを見ます——煙が出れば回路は明らかに故障しており、まだ各部品を細かく確認する必要はありません。ソフトウェアでも同様です：新しいビルド（ステージングまたは本番へのデプロイ）ごとに、テスターはログイン・検索・カート追加・注文などシステムの生命線機能を素早く確認し、ビルドが『煙を出す』（明らかで即座の破損）かどうかを見ます。"),
      P("Vì sao smoke test luôn chạy TRƯỚC các loại kiểm thử khác? Vì nó rẻ và nhanh (thường 5–15 phút), giúp bạn tránh lãng phí hàng giờ test sâu trên một bản build hỏng ngay từ gốc. Nếu smoke fail — ví dụ trang chủ không tải được, hoặc đăng nhập báo lỗi 500 — quy tắc vàng là DỪNG LẠI, báo lỗi ngay và trả bản build về cho đội dev, thay vì cố gắng test tiếp trên nền không vững.",
        "Why does smoke test always run BEFORE other test types? Because it's cheap and fast (usually 5–15 minutes), saving you from wasting hours of deep testing on a build that's broken at the root. If smoke fails — e.g. the homepage won't load, or login returns a 500 error — the golden rule is STOP, report it immediately, and return the build to the dev team, instead of trying to keep testing on shaky ground.",
        "なぜスモークテストは常に他の種類のテストより先に実行するのでしょうか？安価で速い（通常5〜15分）ため、根本的に壊れたビルド上で何時間もの詳細テストを無駄にすることを防げるからです。スモークが失敗した場合——例えばホームページが読み込めない、ログインが500エラーを返すなど——黄金律は停止し、直ちに報告し、ビルドを開発チームに差し戻すことです。不安定な土台の上でテストを続けようとしてはいけません。"),
      TIP("Chọn chức năng cho Smoke theo tiêu chí: NẾU HỎNG THÌ CẢ APP GẦN NHƯ VÔ DỤNG. Với ShopEasy đó là tải trang, đăng nhập, tìm kiếm, giỏ hàng, đặt hàng — không phải mọi tính năng nhỏ lẻ.", "Pick Smoke functions by this rule: IF IT BREAKS, THE WHOLE APP IS NEARLY USELESS. For ShopEasy that's page load, login, search, cart, checkout — not every minor feature.", "スモーク対象機能の選び方：『壊れたらアプリ全体がほぼ使い物にならないもの』。ShopEasyならページ読み込み・ログイン・検索・カート・注文——些細な機能全部ではありません。"),
    ] },
  { heading: { vi: "3. Sanity test là gì & khác smoke, khác regression thế nào", en: "3. What is sanity test & how it differs from smoke and regression", ja: "3. サニティテストとは何か・スモークや回帰との違い" },
    blocks: [
      P("Nếu smoke test là 'khám tổng quát nhanh cả cơ thể', thì sanity test giống 'khám kỹ đúng một chỗ vừa bị đau'. Sanity test chỉ chạy SAU KHI có một thay đổi cụ thể, nhỏ — sửa lỗi, thêm một tính năng nhỏ, vá một trường dữ liệu — và tập trung HẸP nhưng SÂU vào đúng vùng đó cùng các chức năng lân cận gần nhất, để xác nhận thay đổi đúng như mong đợi và không gây vỡ những gì gần nó nhất. Sanity KHÔNG cần bao phủ toàn hệ thống như smoke, và cũng không cần đào sâu toàn bộ chức năng liên quan như regression.",
        "If smoke test is a 'quick general full-body check-up', sanity test is like 'a close look at exactly the spot that just hurt'. Sanity test only runs AFTER a specific, small change — a bug fix, a small feature addition, a patch to one data field — and focuses NARROWLY but DEEPLY on that exact area plus its closest neighbors, to confirm the change works as expected and hasn't broken what's nearest to it. Sanity doesn't need to cover the whole system like smoke, nor dig into all related functionality like regression.",
        "スモークテストが『体全体を素早く総合的に診る』ものなら、サニティテストは『いま痛んだ場所だけを念入りに診る』ようなものです。サニティテストは特定の小さな変更（バグ修正、小さな機能追加、1つのデータ項目のパッチ）の後にのみ実施し、その箇所と最も近い機能だけに狭く深く集中して、変更が期待どおりで最も近い部分を壊していないことを確認します。サニティはスモークのようにシステム全体をカバーする必要はなく、回帰テストのように関連機能全体を掘り下げる必要もありません。"),
      IMG(m_compare, "Bảng so sánh Smoke · Sanity · Regression theo phạm vi, thời điểm và mục tiêu", "Comparison of Smoke · Sanity · Regression by scope, timing and goal", "スモーク・サニティ・回帰の比較（範囲・タイミング・目的別）"),
      P("Điểm dễ nhầm nhất với người mới: cả smoke và sanity đều 'nhanh', nên nhiều bạn nghĩ chúng là một. Chìa khoá để phân biệt là hỏi 2 câu: (1) 'Đây là build hoàn toàn mới, hay chỉ một thay đổi nhỏ vừa vá?' — build mới thì nghiêng về smoke, thay đổi nhỏ thì nghiêng về sanity; (2) 'Mình đang kiểm TOÀN BỘ hệ thống hay ĐÚNG một vùng cụ thể?' — toàn bộ là smoke, một vùng cụ thể là sanity. Còn regression thì khác hẳn về quy mô: nó không phải kiểm tra nhanh, mà là một vòng kiểm tra đầy đủ, có kế hoạch, thường chạy trước khi release hoặc theo chu kỳ cố định.",
        "The point beginners confuse most: both smoke and sanity are 'quick', so many think they're the same. The key to telling them apart is asking 2 questions: (1) 'Is this a brand-new build, or just a small change that was just patched?' — a new build leans smoke, a small change leans sanity; (2) 'Am I checking the WHOLE system or ONE specific area?' — whole system is smoke, one specific area is sanity. Regression is different in scale entirely: it's not a quick check but a full, planned test cycle, usually run before release or on a fixed schedule.",
        "初心者が最も混同しやすい点：スモークもサニティも『速い』ので、同じものだと思いがちです。区別する鍵は2つの問いです：(1)『これは全く新しいビルドか、それともいま修正された小さな変更か？』——新しいビルドならスモーク寄り、小さな変更ならサニティ寄り。(2)『システム全体を確認しているのか、それとも特定の1箇所か？』——全体ならスモーク、特定の1箇所ならサニティ。回帰テストは規模がまったく異なります：短時間のチェックではなく、計画された完全なテストサイクルで、通常はリリース前や定期的なタイミングで実施します。"),
      DEF("Sanity Test", "kiểm thử nhanh, hẹp nhưng sâu vào đúng vùng vừa sửa/thêm cùng các chức năng lân cận gần nhất, chạy sau một thay đổi nhỏ cụ thể.",
        "a quick, narrow-but-deep test on exactly the area just changed/added and its closest neighbors, run after a specific small change.",
        "直前に変更・追加した箇所とその最も近い機能だけに、狭く深く行う迅速なテストで、特定の小さな変更の後に実施する。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: khi nào chọn Smoke, khi nào chọn Sanity", en: "4. Prepare: when to choose Smoke, when to choose Sanity", ja: "4. 準備：スモークとサニティ、どちらを選ぶか" },
    blocks: [
      P("Trước khi bấm nút test, hãy dành 30 giây trả lời câu hỏi 'nên chạy loại nào' — chọn đúng ngay từ đầu giúp bạn tiết kiệm rất nhiều thời gian và không bỏ sót lỗi. Ba bước dưới đây là cách tester ShopEasy vẫn dùng mỗi khi có build hoặc bản vá mới.",
        "Before hitting the test button, spend 30 seconds answering 'which type should I run' — choosing correctly from the start saves a lot of time and avoids missing bugs. The three steps below are what ShopEasy testers still use for every new build or patch.",
        "テストボタンを押す前に、『どちらを実行すべきか』を30秒考えましょう——最初から正しく選べば時間を大幅に節約し、バグの見逃しも防げます。以下の3ステップは、ShopEasyのテスターが新しいビルドやパッチのたびに使っている方法です。"),
      STEP(1, "Xác định đây là BUILD MỚI (deploy lại toàn bộ, gộp nhiều thay đổi) hay chỉ một BẢN VÁ NHỎ (sửa/thêm đúng 1 vùng).", "Determine whether this is a NEW BUILD (redeployed, bundling many changes) or just a SMALL PATCH (fixing/adding exactly one area).", "これは新しいビルド（複数の変更を統合した再デプロイ）か、それとも小さなパッチ（1箇所のみの修正・追加）かを判断する。"),
      STEP(2, "Nếu là build mới hoặc gộp nhiều PR → chạy SMOKE rộng trên các chức năng sống còn trước tiên, chưa test sâu.", "If it's a new build or bundles many PRs → run a wide SMOKE test on vital functions first, don't deep-test yet.", "新しいビルドまたは複数PRの統合なら → まず生命線機能に対する広いスモークテストを実行し、まだ詳細テストはしない。"),
      STEP(3, "Nếu là bản vá nhỏ, phạm vi rõ ràng (1 nút, 1 trường, 1 câu thông báo) → chạy SANITY hẹp đúng vùng đó và lân cận gần nhất.", "If it's a small patch with a clear scope (1 button, 1 field, 1 message) → run a narrow SANITY check on that exact area and its closest neighbors.", "範囲が明確な小さなパッチ（ボタン1つ、項目1つ、メッセージ1つ）なら → その箇所と最も近い機能だけに狭いサニティチェックを実行する。"),
      TRY("Nhìn lại 3 thay đổi gần nhất trong dự án hoặc app bạn theo dõi, và xác định mỗi thay đổi nên chạy Smoke hay Sanity.", "Look at the last 3 changes in a project or app you follow, and decide whether each should get Smoke or Sanity.", "追っているプロジェクトやアプリの直近3つの変更を振り返り、それぞれスモークとサニティのどちらを実行すべきか判断しよう。"),
      PITFALL("Mặc định luôn chạy Sanity vì 'nhanh hơn', kể cả khi build gộp nhiều thay đổi không rõ phạm vi — đây là lý do phổ biến khiến lỗi nghiêm trọng lọt qua vì Sanity không bao phủ đủ rộng.", "Defaulting to always run Sanity because it's 'faster', even when a build bundles many changes with unclear scope — this is a common reason serious bugs slip through, because Sanity doesn't cover wide enough.", "範囲が不明確な複数の変更を含むビルドでも『速いから』と常にサニティをデフォルトにしてしまうこと——これはサニティのカバー範囲が不十分なため重大なバグが漏れる一般的な原因です。"),
    ] },
  { heading: { vi: "5. Viết checklist Smoke từng bước (thực hành)", en: "5. Writing a Smoke checklist step by step (hands-on)", ja: "5. スモークチェックリストを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta xây một checklist Smoke thật cho ShopEasy — thứ bạn có thể chạy lại mỗi khi có build mới trong vòng chưa tới 15 phút.",
        "Now let's build a real Smoke checklist for ShopEasy — something you can re-run in under 15 minutes every time there's a new build.",
        "では、ShopEasy用の実際のスモークチェックリストを作りましょう——新しいビルドのたびに15分以内で再実行できるものです。"),
      STEP(1, "Liệt kê các chức năng mà NẾU HỎNG, app gần như vô dụng: tải trang, đăng nhập, tìm kiếm, giỏ hàng, đặt hàng.", "List the functions where, IF BROKEN, the app is nearly useless: page load, login, search, cart, checkout.", "壊れたらアプリがほぼ使い物にならなくなる機能を列挙する：ページ読み込み、ログイン、検索、カート、注文。"),
      STEP(2, "Với mỗi chức năng, viết 1 bước kiểm NHANH nhất (không cần nhiều dữ liệu, không cần biên) và 1 kết quả mong đợi rõ ràng.", "For each function, write the FASTEST check step (no need for lots of data, no need for boundaries) and a clear expected result.", "各機能について、最も速いチェック手順（大量のデータや境界値は不要）と明確な期待結果を1つずつ書く。"),
      STEP(3, "Sắp xếp thứ tự theo luồng người dùng thật: tải trang → đăng nhập → tìm kiếm → giỏ hàng → đặt hàng — để phát hiện lỗi sớm nhất có thể.", "Order them by the real user flow: page load → login → search → cart → checkout — to catch failures as early as possible.", "実際のユーザーフローの順に並べる：ページ読み込み→ログイン→検索→カート→注文——できるだけ早く失敗を発見するため。"),
      STEP(4, "Chạy checklist ngay khi build mới lên staging; nếu bất kỳ bước nào FAIL, dừng lại và báo bug ngay, chưa test tiếp.", "Run the checklist as soon as a new build hits staging; if any step FAILS, stop and report the bug immediately, don't keep testing.", "新しいビルドがステージングに上がったらすぐにチェックリストを実行する。いずれかのステップが失敗したら停止し、直ちにバグを報告し、テストを続けない。"),
      IMG(m_checklist, "Checklist Smoke Test thực tế cho ShopEasy — 5 chức năng sống còn", "A real Smoke Test checklist for ShopEasy — 5 vital functions", "ShopEasyの実際のスモークテストチェックリスト——5つの生命線機能"),
      CODE("text", "SMOKE CHECKLIST - ShopEasy (chay sau moi build moi, ~10 phut)\n1) Tai trang chu           | Expected: tai xong <3s, khong trang trang\n2) Dang nhap tai khoan co san | Expected: vao duoc trang chu, khong loi 500\n3) Tim kiem 'ao thun'      | Expected: ra danh sach ket qua lien quan\n4) Them 1 san pham vao gio | Expected: so luong gio hang tang, khong loi\n5) Dat hang 1 san pham     | Expected: dat thanh cong, co ma don hang\n=> 1 buoc FAIL -> DUNG lai, bao bug, chua test sau."),
      TRY("Thêm 1 chức năng sống còn nữa mà checklist trên chưa có (gợi ý: xem chi tiết sản phẩm, hoặc đăng xuất) và viết bước kiểm nhanh cho nó.", "Add one more vital function not in the checklist above (hint: view product details, or log out) and write a quick check step for it.", "上のチェックリストにない生命線機能をもう1つ追加し（ヒント：商品詳細表示、ログアウト）、その素早いチェック手順を書こう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ chạy Sanity hẹp, bỏ sót build gộp nhiều thay đổi", en: "6. Situation 1: running only a narrow Sanity, missing a build with bundled changes", ja: "6. シーン1：狭いサニティだけを実行し、複数変更を含むビルドで見逃す" },
    blocks: [
      SITUATION("Build #482 gộp 2 thay đổi: 'Thêm mã giảm giá' (frontend) và 'Sửa API đăng nhập' (backend). Tester chỉ tập trung Sanity vào vùng mã giảm giá vì đó là thứ mình 'được giao', bỏ qua Smoke rộng vì nghĩ 'chỉ có 1 tính năng mới, chắc không ảnh hưởng gì khác'.",
        "Build #482 bundles 2 changes: 'Add discount code' (frontend) and 'Fix login API' (backend). The tester only focuses Sanity on the discount-code area because that's what they were 'assigned', skipping the wide Smoke test, thinking 'it's just one new feature, probably nothing else is affected'.",
        "Toàn bộ khách hàng không đăng nhập được vào ShopEasy trong 40 phút — lỗi 500 do PR sửa API đăng nhập bị vỡ, nhưng không ai phát hiện vì không có bước Smoke rộng nào chạy qua chức năng đăng nhập.",
        "All customers can't log in to ShopEasy for 40 minutes — a 500 error caused by the login API fix PR breaking things, but no one caught it because no wide Smoke step ran through the login function.",
        "ビルド#482は2つの変更を含む：『クーポン追加』（フロントエンド）と『ログインAPI修正』（バックエンド）。テスターは『自分が担当した』クーポン部分だけにサニティを集中させ、『新機能は1つだけだから他に影響はないだろう』と考え、広いスモークテストを省いた。",
        "ShopEasyの全顧客が40分間ログインできなくなった——ログインAPI修正PRが壊れたことによる500エラーだが、ログイン機能を通る広いスモークステップがなかったため誰も気づかなかった。"),
      SOLVE("Quy tắc cứng: bất cứ khi nào build gộp NHIỀU thay đổi (nhất là từ nhiều module/PR khác nhau), luôn chạy Smoke rộng trước — bất kể bạn 'chỉ được giao' một phần nhỏ. Sanity chỉ nên là bước bổ sung SAU khi Smoke đã pass, không phải thay thế cho Smoke.", "Hard rule: whenever a build bundles MULTIPLE changes (especially from different modules/PRs), always run a wide Smoke test first — regardless of being 'only assigned' a small part. Sanity should only be an additional step AFTER Smoke has passed, not a replacement for Smoke.", "厳格なルール：ビルドが複数の変更（特に異なるモジュール/PRから）を含む場合は常に広いスモークテストを先に実行する——小さな部分だけを『担当』していたとしても。サニティはスモークが合格した後の追加ステップにすぎず、スモークの代替ではない。"),
      P("Bài học ở đây không phải 'sanity vô dụng' — sanity vẫn đúng và cần thiết cho vùng mã giảm giá. Vấn đề là dùng sanity THAY THẾ cho smoke khi build có phạm vi thay đổi rộng hơn những gì một tester đang thấy. Quy tắc đơn giản: hễ không chắc build chỉ đổi đúng 1 vùng, hãy luôn chạy smoke trước để có bức tranh tổng quát, rồi mới sanity sâu vào phần được giao.",
        "The lesson here isn't 'sanity is useless' — sanity was still correct and necessary for the discount-code area. The problem is using sanity to REPLACE smoke when the build's change scope is wider than what one tester can see. Simple rule: whenever you're not sure a build changes exactly one area, always run smoke first for the big picture, then sanity deep into your assigned part.",
        "ここでの教訓は『サニティが無意味』ということではありません——クーポン部分に対するサニティは依然として正しく必要でした。問題は、ビルドの変更範囲が1人のテスターに見えている範囲より広い場合に、サニティでスモークを代替してしまったことです。単純なルール：ビルドがちょうど1箇所だけ変更したと確信できない限り、常にまずスモークで全体像をつかみ、それから担当部分にサニティで深く入りましょう。"),
      IMG(m_jira, "Ticket lỗi Critical lọt qua vì chỉ chạy Sanity hẹp, bỏ qua Smoke rộng khi build gộp nhiều thay đổi", "A Critical bug ticket that slipped through because only a narrow Sanity ran, skipping wide Smoke on a build with bundled changes", "複数変更を含むビルドで広いスモークを省き、狭いサニティだけを実行したため見逃されたクリティカルなバグチケット"),
      RECAP(["Build gộp nhiều thay đổi -> luôn Smoke rộng trước, đừng chỉ Sanity phần mình được giao", "Sanity là bước BỔ SUNG sau Smoke, không phải thay thế Smoke"],
        ["A build with bundled changes -> always run wide Smoke first, don't just Sanity your assigned part", "Sanity is an ADDITIONAL step after Smoke, not a replacement for Smoke"],
        ["複数変更を含むビルド -> 常に広いスモークを先に、担当部分のサニティだけで済ませない", "サニティはスモークの後の追加ステップであり、代替ではない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: chạy Smoke đầy đủ cho một thay đổi cực nhỏ, lãng phí thời gian", en: "7. Situation 2: running a full Smoke test for a tiny change, wasting time", ja: "7. シーン2：ごく小さな変更にフルのスモークテストを実行し、時間を無駄にする" },
    blocks: [
      SITUATION("Dev chỉ sửa lại nhãn nút 'Đăng ký ngay' thành 'Áp dụng mã giảm giá' trên trang giỏ hàng — đổi đúng 1 chữ text, không đổi logic. Tester theo thói quen chạy lại TOÀN BỘ 5 bước Smoke (12 phút) mỗi khi có bất kỳ thay đổi nào, kể cả thay đổi cực nhỏ như thế này.",
        "A dev only fixed a button label from 'Sign up now' to 'Apply discount code' on the cart page — changing just 1 piece of text, no logic change. Out of habit, the tester re-runs the ENTIRE 5-step Smoke test (12 minutes) for any change at all, even one this tiny.",
        "Với hàng chục bản vá nhỏ mỗi ngày, việc lặp lại Smoke 12 phút cho mỗi thay đổi khiến cả đội trễ tiến độ, trong khi những bản vá nhỏ này chưa từng gây ảnh hưởng ngoài đúng khu vực bị sửa.",
        "With dozens of small patches per day, repeating the 12-minute Smoke test for every change makes the whole team fall behind schedule, while these small patches have never affected anything outside the exact area fixed.",
        "開発者はカートページのボタンラベルを『今すぐ登録』から『クーポン適用』に修正しただけ——テキスト1つの変更でロジックの変更はない。テスターは習慣的に、どんなに小さな変更でも5ステップのスモークテスト全体（12分）を再実行していた。",
        "1日に何十もの小さなパッチがある中、変更のたびに12分のスモークを繰り返すことでチーム全体が予定より遅れる一方、これらの小さなパッチは修正箇所以外に影響を及ぼしたことは一度もなかった。"),
      SOLVE("Đặt lại quy tắc theo phạm vi thay đổi: thay đổi chỉ 1 chữ/1 nhãn/1 style không đổi logic → chỉ cần Sanity 2–3 phút đúng vùng đó (mở trang giỏ hàng, xem nút hiển thị đúng chữ, bấm thử vẫn hoạt động). Dành thời gian tiết kiệm được để test sâu các tính năng khác thay vì lặp lại Smoke không cần thiết.", "Reset the rule based on change scope: a change that's just 1 word/1 label/1 style with no logic change → only needs a 2–3 minute Sanity check on that exact spot (open the cart page, confirm the button shows the right text, click it to confirm it still works). Spend the saved time on deep-testing other features instead of repeating unnecessary Smoke.", "変更範囲に基づいてルールを見直す：ロジックの変更を伴わない単語1つ・ラベル1つ・スタイル1つの変更なら → その箇所だけの2〜3分のサニティチェックで十分（カートページを開き、ボタンが正しいテキストを表示し、クリックしても正常に動くことを確認）。節約した時間は不要なスモークの繰り返しではなく、他機能の詳細テストに充てる。"),
      P("Đây là mặt còn lại của bài học chương 6: không phải lúc nào cũng cần Smoke đầy đủ. Chạy Smoke cho MỌI thay đổi dù nhỏ tới đâu không phải là 'cẩn thận' mà là lãng phí — nó khiến bạn có ít thời gian hơn cho những việc thực sự cần đào sâu. Kỹ năng thật sự của một tester giỏi là biết CÂN NHẮC đúng loại kiểm thử theo đúng phạm vi thay đổi, chứ không áp dụng máy móc một công thức cho mọi tình huống.",
        "This is the flip side of chapter 6's lesson: you don't always need a full Smoke test. Running Smoke for EVERY change, no matter how small, isn't 'being careful' — it's waste, leaving you less time for things that truly need deep testing. A skilled tester's real skill is WEIGHING the right test type against the actual change scope, not mechanically applying one formula to every situation.",
        "これは第6章の教訓の裏側です：常にフルのスモークテストが必要なわけではありません。どんなに小さくても全ての変更にスモークを実行することは『慎重』ではなく無駄です——本当に深く掘り下げる必要のあることに使える時間が減ってしまいます。優れたテスターの真のスキルは、あらゆる状況に1つの公式を機械的に当てはめるのではなく、実際の変更範囲に応じて適切なテスト種別を見極めることです。"),
      IMG(m_dash, "Số liệu thời gian: build mới cần Smoke (12 phút) vs thay đổi nhỏ chỉ cần Sanity (4 phút)", "Time metrics: new builds need Smoke (12 min) vs small changes only need Sanity (4 min)", "時間の指標：新しいビルドはスモーク（12分）が必要、小さな変更はサニティ（4分）だけで十分"),
      TRY("Nghĩ về một thay đổi cực nhỏ gần đây trong app bạn dùng (đổi màu nút, sửa 1 câu chữ) — bạn nghĩ nó chỉ cần Sanity hay vẫn cần Smoke đầy đủ? Vì sao?", "Think of a very small recent change in an app you use (button color, one line of text) — do you think it needs only Sanity or still a full Smoke? Why?", "使っているアプリの最近のごく小さな変更（ボタンの色、1行のテキスト）を考えよう——サニティだけで十分か、それでもフルのスモークが必要か？その理由は？"),
    ] },
  { heading: { vi: "8. Quyết định \"đủ ổn định để test tiếp?\"", en: "8. Deciding \"stable enough to keep testing?\"", ja: "8. 「テストを続けられるほど安定しているか」の判断" },
    blocks: [
      P("Sau khi chạy Smoke (và/hoặc Sanity), bạn cần đưa ra một quyết định rõ ràng: build này có ĐỦ ỔN ĐỊNH để chuyển sang test sâu (test case chi tiết, test biên, test âm...) hay chưa? Đây là lúc smoke/sanity thể hiện đúng vai trò 'cổng vào' — không phải để tìm hết lỗi, mà để quyết định có nên đi tiếp hay không.",
        "After running Smoke (and/or Sanity), you need to make a clear decision: is this build STABLE ENOUGH to move on to deep testing (detailed test cases, boundary tests, negative tests...) or not yet? This is where smoke/sanity play their true 'gate' role — not to find every bug, but to decide whether to proceed.",
        "スモーク（および/またはサニティ）を実行した後、明確な判断を下す必要があります：このビルドは詳細テスト（詳細なテストケース、境界値テスト、ネガティブテストなど）に進めるほど安定しているか、まだか？ここでスモーク/サニティが本来の『関門』としての役割を発揮します——全てのバグを見つけるためではなく、先に進むべきかを判断するためです。"),
      P("Quy tắc quyết định đơn giản: TẤT CẢ các bước trong checklist Smoke/Sanity PASS → đủ ổn định, chuyển sang test sâu. BẤT KỲ bước nào FAIL ở chức năng sống còn → chưa đủ ổn định, dừng lại, báo bug Critical/High ngay, trả build về dev, không lãng phí thời gian test sâu trên nền chưa vững. Ghi lại kết quả (pass/fail từng bước) mỗi lần chạy để có dữ liệu theo dõi xu hướng chất lượng qua các build.",
        "Simple decision rule: ALL steps in the Smoke/Sanity checklist PASS → stable enough, move to deep testing. ANY step FAILS on a vital function → not stable enough, stop, report a Critical/High bug immediately, return the build to dev, don't waste time deep-testing on shaky ground. Log the result (pass/fail per step) every run to track quality trends across builds.",
        "単純な判断ルール：スモーク/サニティチェックリストの全ステップが合格 → 十分安定しており、詳細テストに進む。生命線機能でいずれかのステップが失敗 → まだ十分安定しておらず、停止し、直ちにCritical/Highのバグを報告し、ビルドを開発者に差し戻す。不安定な土台の上で詳細テストに時間を無駄にしない。ビルドごとの品質傾向を追跡するため、毎回の結果（各ステップの合格/不合格）を記録する。"),
      IMG(m_kanban, "Quy trình quyết định Smoke/Sanity theo từng build và trạng thái sẵn sàng test sâu", "Decision flow for Smoke/Sanity per build and readiness for deep testing", "ビルドごとのスモーク/サニティ判断フローと詳細テストへの準備状況"),
      TIP("Đừng chờ tới lúc test sâu mới phát hiện chức năng sống còn bị hỏng — Smoke/Sanity chính là 'lưới lọc' rẻ nhất để chặn lỗi lớn ngay từ cổng vào, trước khi tốn công sức cho những thứ chi tiết hơn.", "Don't wait until deep testing to discover a vital function is broken — Smoke/Sanity is the cheapest 'filter' to catch big bugs right at the gate, before spending effort on finer details.", "生命線機能が壊れていることを詳細テストの段階まで待って発見してはいけません——スモーク/サニティは、より細かい部分に労力を費やす前に、関門で大きなバグを食い止める最も安価な『フィルター』です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi phân biệt và áp dụng smoke/sanity. Biết trước giúp bạn chọn đúng loại kiểm thử ngay từ đầu, tránh mất thời gian hoặc bỏ sót lỗi.",
        "Beginners often stumble on a few common mistakes when telling apart and applying smoke/sanity. Knowing them helps you pick the right test type from the start, avoiding wasted time or missed bugs.",
        "初心者はスモーク/サニティの区別と適用でよく同じ失敗をします。事前に知れば、最初から正しいテスト種別を選び、時間の浪費やバグの見逃しを避けられます。"),
      PITFALL("Coi smoke và sanity là 'cùng một thứ, gọi tên khác nhau'. Thực ra chúng khác nhau ở PHẠM VI (rộng-nông vs hẹp-sâu) và THỜI ĐIỂM (build mới vs thay đổi nhỏ) — nhầm lẫn này dễ khiến bạn chọn sai loại kiểm thử.", "Treating smoke and sanity as 'the same thing, just named differently'. They actually differ in SCOPE (wide-shallow vs narrow-deep) and TIMING (new build vs small change) — this confusion easily leads to picking the wrong test type.", "スモークとサニティを『同じもので名前が違うだけ』と考えること。実際には範囲（広く浅い vs 狭く深い）とタイミング（新しいビルド vs 小さな変更）が異なります——この混同は誤ったテスト種別の選択につながりやすいです。"),
      PITFALL("Nghĩ rằng chạy Smoke/Sanity xong là 'test xong', bỏ qua bước test sâu (test case chi tiết, biên, âm) — Smoke/Sanity chỉ là cổng vào, không thay thế cho một bộ test đầy đủ.", "Thinking that finishing Smoke/Sanity means 'testing is done', skipping the deep-testing step (detailed cases, boundaries, negatives) — Smoke/Sanity is only a gate, not a replacement for a full test suite.", "スモーク/サニティを終えたら『テスト完了』だと考え、詳細テスト（詳細ケース、境界値、ネガティブ）を省くこと——スモーク/サニティは関門にすぎず、完全なテストスイートの代替ではありません。"),
      TIP("Giữ checklist Smoke NGẮN GỌN và ỔN ĐỊNH (5–8 bước) để có thể chạy lại nhanh mỗi lần; nếu checklist ngày càng dài, có lẽ bạn đang nhồi cả test sâu vào Smoke.", "Keep the Smoke checklist SHORT and STABLE (5–8 steps) so it can be re-run quickly every time; if the checklist keeps growing, you may be cramming deep testing into Smoke.", "スモークチェックリストは短く（5〜8ステップ）安定させ、毎回素早く再実行できるようにしよう。チェックリストがどんどん長くなっているなら、詳細テストをスモークに詰め込んでいるかもしれません。"),
      IMG(m_checklist, "Nhắc lại checklist Smoke ngắn gọn — dùng làm mẫu khi build mới liên tục lên staging", "Reminder of the short Smoke checklist — use as a template when new builds keep hitting staging", "短いスモークチェックリストの再確認——新しいビルドが次々にステージングに上がる際のテンプレートとして"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử hồi quy & Smoke test cho người mới", "Regression & smoke testing for beginners", "kiem-thu-hoi-quy-smoke-test-cho-nguoi-moi", "初心者のための回帰テストとスモークテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果レポートの書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách phân biệt smoke test và sanity test qua bản build thật của ShopEasy: smoke rộng-nông trên vài chức năng sống còn ngay sau mỗi bản build mới, sanity hẹp-sâu đúng vùng vừa sửa/thêm, và cả hai đều khác regression test — vốn rộng và sâu hơn hẳn. Hai tình huống thật cho thấy chọn sai loại kiểm thử có thể khiến bạn bỏ sót lỗi nghiêm trọng (chỉ Sanity khi lẽ ra cần Smoke) hoặc lãng phí thời gian quý giá (Smoke đầy đủ cho một thay đổi cực nhỏ). Bạn cũng có checklist Smoke thực tế và cách quyết định 'build đã đủ ổn định để test tiếp chưa'.",
        "You just learned to distinguish smoke test from sanity test through a real ShopEasy build: smoke is wide-shallow on a few vital functions right after every new build, sanity is narrow-deep on exactly the area just changed/added, and both differ from regression testing, which is far wider and deeper. Two real situations showed that picking the wrong test type can make you miss a serious bug (only Sanity when Smoke was needed) or waste precious time (full Smoke for a tiny change). You also have a practical Smoke checklist and a way to decide 'is the build stable enough to keep testing'.",
        "ShopEasyの実際のビルドを通じて、スモークテストとサニティテストの区別を学びました：スモークは新しいビルド直後に少数の生命線機能に広く浅く、サニティは直前に変更・追加した箇所に狭く深く、そしてどちらもはるかに広く深い回帰テストとは異なります。2つの実例は、誤ったテスト種別を選ぶと重大なバグを見逃したり（スモークが必要な時にサニティだけ実施）、貴重な時間を無駄にしたり（ごく小さな変更にフルのスモーク）することを示しました。実践的なスモークチェックリストと『ビルドがテストを続けられるほど安定しているか』の判断方法も手に入れました。"),
      P("Chặng tiếp theo, bạn nên đọc lại bài về kiểm thử hồi quy để hiểu smoke/sanity/regression bổ sung nhau thế nào trong một quy trình phát hành đầy đủ, cùng cách viết báo cáo kết quả kiểm thử rõ ràng cho từng vòng test. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should revisit the article on regression testing to understand how smoke/sanity/regression complement each other in a full release process, along with how to write a clear test result report for each test round. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、リリースプロセス全体においてスモーク/サニティ/回帰テストがどのように補い合うかを理解するため回帰テストの記事を読み直し、各テストラウンドの明確なテスト結果レポートの書き方も学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const SMOKE_SANITY_01 = makeDoc({
  slug: "phan-biet-smoke-test-sanity-test-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "smoke test và sanity test",
  keywords: ["smoke test", "sanity test", "smoke test và sanity test", "phân biệt smoke sanity", "kiểm thử sau build cho người mới"],
  coverLabel: "NGƯỜI MỚI · SMOKE & SANITY · TMĐT",
  crumb: "Phân biệt Smoke test & Sanity test (Smoke vs Sanity Testing)",
  metaTitle: { vi: "Smoke test và Sanity test: phân biệt cho người mới", en: "Smoke test vs sanity test: a beginner's guide", ja: "初心者向け：スモークテストとサニティテストの違い" },
  metaDescription: {
    vi: "Phân biệt smoke test và sanity test cho người mới: khi nào kiểm chức năng sống còn, khi nào kiểm vùng vừa sửa, ví dụ ShopEasy, có checklist, hình minh hoạ và trắc nghiệm.",
    en: "Smoke test vs sanity test for beginners: when to quickly check vital functions, when to check just the changed area, real ShopEasy examples, a checklist, with visuals and a quiz.",
    ja: "初心者向けスモークテストとサニティテストの違い：生命線機能を素早く確認するタイミング、変更箇所だけ確認するタイミング、ShopEasyの実例、チェックリスト、図とクイズ付き。",
  },
  title: {
    vi: "Phân biệt Smoke test & Sanity test cho người mới: khi nào dùng cái nào (có trắc nghiệm)",
    en: "Smoke test vs Sanity test for beginners: when to use which (with quiz)",
    ja: "初心者のためのスモークテストとサニティテストの違い：どちらをいつ使うか（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: phân biệt smoke test và sanity test qua app TMĐT ShopEasy — smoke rộng-nông trên chức năng sống còn sau mỗi bản build mới, sanity hẹp-sâu đúng vùng vừa sửa, khác regression thế nào. Có checklist smoke thực tế, hai tình huống chọn sai loại kiểm thử, cách quyết định 'đủ ổn định để test tiếp?', nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: distinguishing smoke test from sanity test through the ShopEasy e-commerce app — smoke is wide-shallow on vital functions after every new build, sanity is narrow-deep on the area just changed, and how both differ from regression. Includes a practical smoke checklist, two situations of picking the wrong test type, how to decide 'stable enough to keep testing?', many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでスモークテストとサニティテストを区別する——スモークは新しいビルド直後に生命線機能へ広く浅く、サニティは変更箇所へ狭く深く、そして回帰テストとの違い。実践的なスモークチェックリスト、テスト種別を誤って選んだ2つのシーン、『テストを続けられるほど安定しているか』の判断方法、多数のモック、FAQ、5問クイズを収録。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách quyết định chạy Smoke hay Sanity", steps: [
    { name: "Xác định phạm vi thay đổi", text: "Build mới gộp nhiều thay đổi hay chỉ một bản vá nhỏ, rõ phạm vi." },
    { name: "Chạy đúng loại kiểm thử", text: "Build mới -> Smoke rộng trên chức năng sống còn; bản vá nhỏ -> Sanity hẹp đúng vùng đó." },
    { name: "Quyết định có test tiếp không", text: "Tất cả bước pass -> đủ ổn định, chuyển test sâu; có bước fail -> dừng, báo bug, trả build về dev." },
  ] },
  pages,
});

export const MB_SMOKESANITY_01 = [SMOKE_SANITY_01];
