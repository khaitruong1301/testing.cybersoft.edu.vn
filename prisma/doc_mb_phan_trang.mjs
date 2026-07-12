// doc_mb_phan_trang.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử phân trang & sắp xếp (Pagination & Sort Testing) — số item mỗi trang, trang đầu/cuối,
// nhảy trang, trang vượt giới hạn, giữ bộ lọc khi đổi trang, sắp xếp tăng/giảm theo giá/tên/mới nhất,
// ổn định thứ tự (stable sort), kết hợp lọc + sắp xếp + phân trang. Gắn app TMĐT ShopEasy.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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

// ── Mockup 1: danh sách sản phẩm ShopEasy có phân trang + dropdown sắp xếp, annotate ──
const m_list = browser("shopeasy.vn/san-pham?trang=2&sort=gia-tang", [
  panel("ShopEasy · Danh sách sản phẩm (48 sản phẩm)", [
    field(24, 20, 260, "Sắp xếp theo", "Giá: Tăng dần", "normal"),
    field(300, 20, 260, "Số sản phẩm / trang", "12", "normal"),
    btn(24, 92, 64, "‹ Trước", "ghost"),
    btn(96, 92, 40, "1", "ghost"),
    btn(144, 92, 40, "2", "primary"),
    btn(192, 92, 40, "3", "ghost"),
    btn(240, 92, 40, "4", "ghost"),
    btn(288, 92, 64, "Sau ›", "ghost"),
    annotate(20, 12, 260, 62, "SẮP XẾP: đổi tiêu chí, kiểm thứ tự & tính ổn định"),
    annotate(20, 84, 332, 46, "PHÂN TRANG: nhảy trang, trang đầu/cuối, vượt giới hạn"),
  ].join(""), { h: 200, accent: "#0e7490" }),
].join(""), { h: 256, title: "ShopEasy · TMĐT", accent: "#0e7490" });

// ── Mockup 2: các kỹ thuật kiểm thử phân trang & sắp xếp ──
const m_technique = grid("Các kỹ thuật kiểm thử phân trang & sắp xếp", ["Kỹ thuật", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Số item mỗi trang", "Kiểm số sản phẩm hiển thị đúng cấu hình", "12 sản phẩm/trang, trang cuối chỉ còn 4"],
  ["Trang đầu / trang cuối", "Kiểm nút 'Trước' ở trang 1, nút 'Sau' ở trang cuối", "Trang 1: nút 'Trước' bị vô hiệu hoá"],
  ["Nhảy trang", "Bấm số trang bất kỳ hoặc gõ số trang", "Từ trang 1 nhảy thẳng tới trang 4"],
  ["Trang vượt giới hạn", "Gõ URL hoặc số trang lớn hơn tổng số trang", "?trang=999 khi chỉ có 4 trang"],
  ["Giữ bộ lọc khi đổi trang", "Sang trang 2 nhưng bộ lọc đã chọn phải còn nguyên", "Lọc 'Thời trang nam' + đổi sang trang 2"],
  ["Sắp xếp tăng/giảm", "Kiểm thứ tự theo giá, tên, mới nhất cả 2 chiều", "'Giá: Giảm dần' phải liệt kê từ cao xuống thấp"],
  ["Ổn định thứ tự (stable sort)", "Khi nhiều item có cùng giá trị sắp xếp, thứ tự không đảo lộn", "3 sản phẩm cùng giá 199.000đ giữ nguyên thứ tự"],
], { accent: "#0e7490" });

// ── Mockup 3: bảng ca kiểm thử phân trang & sắp xếp (grid) ──
const m_testcase = grid("Bảng ca kiểm thử phân trang & sắp xếp (ShopEasy)", ["Ca kiểm thử", "Dữ liệu / thao tác", "Kết quả mong đợi"], [
  ["Số item mỗi trang đúng", "48 sản phẩm, 12/trang", "Trang 1-3 có 12 sản phẩm, trang 4 có 12 (đủ chia hết)"],
  ["Trang cuối lẻ số dư", "50 sản phẩm, 12/trang", "Trang 5 chỉ hiện 2 sản phẩm, không lỗi giao diện"],
  ["Nhảy tới trang vượt giới hạn", "Sửa URL ?trang=999", "Báo 'Không có dữ liệu' hoặc tự đưa về trang cuối, không crash"],
  ["Giữ bộ lọc khi đổi trang", "Lọc danh mục + giá, rồi bấm sang trang 2", "Trang 2 vẫn áp đúng bộ lọc đã chọn, không reset"],
  ["Sắp xếp giá tăng dần", "Chọn 'Giá: Tăng dần'", "Danh sách liệt kê từ giá thấp nhất đến cao nhất"],
  ["Sắp xếp tên Z-A", "Chọn 'Tên: Z đến A'", "Danh sách liệt kê theo bảng chữ cái ngược"],
  ["Ổn định thứ tự khi giá bằng nhau", "3 sản phẩm cùng giá, sắp xếp theo giá", "Thứ tự giữa 3 sản phẩm đó không đổi qua các lần tải lại"],
  ["Kết hợp lọc + sắp xếp + trang 3", "Danh mục + 'Mới nhất' + Trang 3", "Đúng bộ lọc, đúng thứ tự, đúng đúng dữ liệu của trang 3"],
], { accent: "#0e7490", note: "Mỗi ca cần ghi rõ Expected trước khi thực hiện để dễ so sánh với Actual." });

// ── Mockup 4: trang vượt giới hạn (?trang=999) ──
const m_overflow = browser("shopeasy.vn/san-pham?trang=999&sort=gia-tang", [
  panel("ShopEasy · Danh sách sản phẩm", [
    `<text x="24" y="60" font-size="34" fill="#94a3b8">📄</text>`,
    `<text x="70" y="58" font-size="15" font-weight="800" fill="#334155">Trang 999 không tồn tại</text>`,
    `<text x="70" y="80" font-size="12" fill="#64748b">Hệ thống chỉ có 4 trang — trang hiện tại đang trống trơn</text>`,
    btn(24, 120, 176, "Về trang 1", "primary"),
    annotate(20, 42, 596, 66, "BUG: ?trang=999 hiện trang trắng, không báo lỗi, không có nút quay lại"),
  ].join(""), { h: 190, accent: "#ef4444" }),
].join(""), { h: 246, title: "ShopEasy · TMĐT", accent: "#ef4444" });

// ── Mockup 5: ticket Jira lỗi mất bộ lọc khi sang trang ──
const m_jira = jira({
  key: "SE-11402", title: "Danh sách sản phẩm: mất bộ lọc 'Danh mục' và 'Khoảng giá' khi bấm sang trang 2",
  type: "Bug", status: "New", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Lọc Danh mục = 'Thời trang nam', Giá 100.000-500.000 2) Kết quả hiện đúng 26 sản phẩm 3) Bấm sang trang 2"],
    ["Kết quả mong đợi", "Trang 2 vẫn áp đúng bộ lọc Danh mục + Khoảng giá đã chọn"],
    ["Kết quả thực tế", "Trang 2 hiện toàn bộ sản phẩm (mất bộ lọc), bộ đếm '26 sản phẩm' cũng biến mất"],
    ["Bằng chứng", "video-se11402.mp4, screenshot-mat-bo-loc-trang-2.png"],
  ],
});

// ── Mockup 6: dashboard tỉ lệ lỗi tìm được qua kiểm thử phân trang & sắp xếp ──
const m_dash = dashboard("Lỗi tìm được: kiểm thử phân trang & sắp xếp — Sprint 22", [
  { label: "Tổng lỗi", value: "14", sub: "sprint này", color: "#0e7490" },
  { label: "Lỗi phân trang", value: "8", sub: "vượt giới hạn, mất bộ lọc", color: "#7c3aed" },
  { label: "Lỗi sắp xếp", value: "6", sub: "sai chiều, không ổn định", color: "#e11d48" },
  { label: "Mức High/Critical", value: "5", sub: "chủ yếu ở mất bộ lọc khi đổi trang", color: "#f97316" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử phân trang cần chú ý những gì nhất?",
  "What matters most when doing pagination testing?",
  "Ba điểm quan trọng nhất là: số item hiển thị mỗi trang phải đúng cấu hình (kể cả trang cuối có số dư lẻ), điều hướng trang (trang đầu/cuối, nhảy trang) không được để lọt trạng thái vô lý như trang âm hay trang vượt tổng số, và bộ lọc/tiêu chí sắp xếp đang áp dụng phải được giữ nguyên khi người dùng chuyển trang chứ không bị reset về mặc định.",
  "The three most important points are: the number of items shown per page must match the configuration (including the leftover count on the last page), page navigation (first/last page, jumping pages) must never allow an invalid state like a negative page or a page beyond the total, and the currently applied filters/sort criteria must persist when the user changes pages instead of resetting to default.",
  "ページネーションテストで最も注意すべき点は何？",
  "最も重要な3点は、各ページの表示件数が設定どおりであること（最終ページの端数も含む）、ページ移動（最初/最後のページ、ページジャンプ）で負のページ番号や総ページ数を超えるような不正な状態を許さないこと、そしてページを切り替えても現在適用中のフィルタや並び替え条件がデフォルトにリセットされず維持されることです。");
const faq2 = FAQ(
  "Vì sao cần test cả sắp xếp tăng dần lẫn giảm dần, không chỉ một chiều?",
  "Why test both ascending and descending sort, not just one direction?",
  "Vì logic đảo chiều sắp xếp (ví dụ đổi từ tăng sang giảm) thường được lập trình riêng và dễ có lỗi lệch dấu hoặc chỉ đảo phần hiển thị mà không đảo dữ liệu thực tế. Nếu chỉ test chiều tăng dần rồi giả định chiều giảm dần 'chắc cũng đúng', bạn có thể bỏ lọt lỗi kiểu 'Giá: Giảm dần' vẫn hiện giá thấp nhất lên đầu — một lỗi rất dễ khiến khách hàng hiểu nhầm và mất niềm tin vào shop.",
  "Because the logic for reversing sort direction (e.g. switching from ascending to descending) is often coded separately and prone to off-by-sign bugs or bugs that only flip the display without flipping the actual data. If you only test the ascending direction and assume the descending one 'is probably fine too', you can miss a bug where 'Price: High to Low' still shows the lowest price first — a bug that easily confuses customers and erodes trust in the shop.",
  "昇順だけでなく降順の並び替えも両方テストすべき理由は？",
  "並び替え方向を反転させるロジック（昇順から降順への切り替えなど）は別途実装されることが多く、符号を間違えたり表示だけを反転して実データを反転していなかったりするバグが起きやすいからです。昇順だけをテストして降順も『たぶん大丈夫』と思い込むと、『価格：高い順』なのに最安値が先頭に出るようなバグを見逃す恐れがあり、顧客を混乱させ店への信頼を損ないます。");
const faq3 = FAQ(
  "Thứ tự ổn định (stable sort) là gì và vì sao người mới hay bỏ qua?",
  "What is stable sort, and why do beginners often overlook it?",
  "Thứ tự ổn định nghĩa là khi nhiều item có cùng giá trị sắp xếp (ví dụ cùng giá 199.000đ), thứ tự tương đối giữa chúng phải giữ nguyên qua các lần tải lại hoặc đổi trang, thay vì bị xáo trộn ngẫu nhiên mỗi lần. Người mới hay bỏ qua vì nó không gây lỗi 'rõ ràng' như sai số liệu, nhưng lại khiến trải nghiệm khó chịu: khách vừa xem một sản phẩm ở vị trí thứ 3, tải lại trang thì nó nhảy xuống vị trí thứ 8 dù không có gì thay đổi.",
  "Stable sort means that when several items share the same sort value (e.g. the same price of 199,000đ), their relative order must stay the same across reloads or page changes, instead of being randomly shuffled each time. Beginners often overlook it because it doesn't cause an 'obvious' bug like wrong numbers, yet it creates an annoying experience: a customer just saw a product in the 3rd position, reloads the page, and it jumps to the 8th position even though nothing changed.",
  "安定ソート（stable sort）とは何で、なぜ初心者は見落としがち？",
  "安定ソートとは、複数の項目が同じ並び替え値を持つ場合（例えば同じ199,000ドンの価格）、再読み込みやページ切り替えを経てもそれらの相対的な順序が保たれ、毎回ランダムに入れ替わらないことを指します。数値の誤りのような『明らかな』バグを起こさないため初心者は見落としがちですが、体験としては不快です：顧客が3番目に見ていた商品が、何も変わっていないのにページを再読み込みすると8番目に飛んでしまうのです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Khi test phân trang, ca kiểm thử 'trang vượt giới hạn' nghĩa là gì?", en: "In pagination testing, what does the 'page beyond limit' test case mean?", ja: "ページネーションテストで『範囲外のページ』ケースとは何を指す？" },
    options: [
      { vi: "Nhập số trang lớn hơn tổng số trang thực tế (ví dụ ?trang=999 khi chỉ có 4 trang)", en: "Entering a page number greater than the actual total (e.g. ?trang=999 when there are only 4 pages)", ja: "実際の総ページ数より大きいページ番号を入力する（例：4ページしかないのに?trang=999）" },
      { vi: "Bấm đúng nút 'Trang 1'", en: "Clicking the correct 'Page 1' button", ja: "正しく『1ページ目』ボタンを押すこと" },
      { vi: "Chỉ kiểm tra số item hiển thị đúng cấu hình", en: "Only checking the item count matches configuration", ja: "表示件数が設定どおりかだけを確認すること" },
      { vi: "Đổi ngôn ngữ hiển thị của trang", en: "Changing the page's display language", ja: "ページの表示言語を変更すること" },
    ], correct: 0,
    explain: { vi: "Ca này kiểm hệ thống xử lý đúng khi số trang được yêu cầu vượt quá tổng số trang thực có.", en: "This case checks the system handles a requested page number that exceeds the actual total page count.", ja: "このケースは、要求されたページ番号が実際の総ページ数を超えたときの処理を確認します。" },
  }),
  mcq({
    q: { vi: "Vì sao cần test 'giữ bộ lọc khi đổi trang'?", en: "Why test 'keeping filters when changing pages'?", ja: "なぜ『ページ変更時にフィルタが維持されるか』をテストする必要がある？" },
    options: [
      { vi: "Vì tốc độ tải trang là quan trọng nhất", en: "Because page load speed is the most important thing", ja: "ページ読み込み速度が最も重要だから" },
      { vi: "Vì nếu bộ lọc bị mất khi sang trang, người dùng thấy dữ liệu sai với điều kiện họ đã chọn, gây nhầm lẫn", en: "Because if filters are lost when changing pages, users see data that doesn't match what they selected, causing confusion", ja: "ページ切り替え時にフィルタが失われると、ユーザーは自分が選択した条件と異なるデータを見ることになり混乱するから" },
      { vi: "Vì không cần thiết, bộ lọc luôn tự động giữ nguyên", en: "Because it's unnecessary, filters always stay automatically", ja: "不要だから。フィルタは常に自動的に維持される" },
      { vi: "Vì đây là kiểm thử bảo mật", en: "Because this is a security test", ja: "これはセキュリティテストだから" },
    ], correct: 1,
    explain: { vi: "Mất bộ lọc khi đổi trang là lỗi phổ biến, khiến người dùng tưởng nhầm dữ liệu hoặc mất công lọc lại từ đầu.", en: "Losing filters when changing pages is a common bug that makes users misread the data or have to filter again from scratch.", ja: "ページ変更時のフィルタ喪失はよくあるバグで、ユーザーがデータを誤解したり、最初からフィルタし直す羽目になります。" },
  }),
  mcq({
    q: { vi: "'Ổn định thứ tự' (stable sort) nghĩa là gì?", en: "What does 'stable sort' mean?", ja: "『安定ソート』とはどういう意味？" },
    options: [
      { vi: "Sắp xếp luôn chạy nhanh hơn 1 giây", en: "Sorting always runs in under 1 second", ja: "並び替えが常に1秒未満で完了する" },
      { vi: "Các item có cùng giá trị sắp xếp giữ nguyên thứ tự tương đối qua các lần tải lại", en: "Items with the same sort value keep their relative order across reloads", ja: "同じ並び替え値を持つ項目が再読み込みを経ても相対的な順序を保つ" },
      { vi: "Chỉ sắp xếp được theo giá, không sắp xếp được theo tên", en: "Can only sort by price, not by name", ja: "価格でしか並び替えできず、名前では並び替えできない" },
      { vi: "Hệ thống không cho phép đổi tiêu chí sắp xếp", en: "The system doesn't allow changing sort criteria", ja: "システムが並び替え条件の変更を許可しない" },
    ], correct: 1,
    explain: { vi: "Thứ tự ổn định giúp các item cùng giá trị sắp xếp không bị xáo trộn ngẫu nhiên mỗi lần tải lại hoặc đổi trang.", en: "Stable sort keeps items with equal sort values from being randomly shuffled on each reload or page change.", ja: "安定ソートは、同じ並び替え値の項目が再読み込みやページ切り替えのたびにランダムに入れ替わらないようにします。" },
  }),
  mcq({
    q: { vi: "Với 50 sản phẩm, 12 sản phẩm/trang, trang cuối (trang 5) nên hiển thị bao nhiêu sản phẩm?", en: "With 50 products, 12 per page, how many products should the last page (page 5) show?", ja: "商品50件、1ページ12件のとき、最終ページ（5ページ目）は何件表示すべき？" },
    options: [
      { vi: "12 sản phẩm, thêm 12 sản phẩm giả để lấp đầy", en: "12 products, padding with 12 fake ones to fill the page", ja: "12件、足りない分は12件のダミーで埋める" },
      { vi: "0 sản phẩm vì đã hết dữ liệu", en: "0 products because data has run out", ja: "データが尽きているので0件" },
      { vi: "2 sản phẩm — đúng số dư còn lại, không lỗi giao diện", en: "2 products — the exact remainder, with no layout bug", ja: "2件——残りの正確な件数で、レイアウト崩れなし" },
      { vi: "Toàn bộ 50 sản phẩm dồn vào 1 trang", en: "All 50 products crammed onto one page", ja: "50件全てを1ページに詰め込む" },
    ], correct: 2,
    explain: { vi: "50 chia 12 dư 2, nên trang cuối chỉ có đúng 2 sản phẩm và giao diện phải hiển thị gọn gàng, không lỗi khoảng trống.", en: "50 divided by 12 leaves a remainder of 2, so the last page should show exactly 2 products with no layout glitches.", ja: "50を12で割ると余り2なので、最終ページはちょうど2件表示し、レイアウトに崩れがあってはいけません。" },
  }),
  mcq({
    q: { vi: "Khi kết hợp lọc + sắp xếp + phân trang, điều gì cần kiểm tra kỹ nhất?", en: "When combining filter + sort + pagination, what should be checked most carefully?", ja: "フィルタ＋並び替え＋ページネーションを組み合わせる際、最も注意すべきことは？" },
    options: [
      { vi: "Chỉ cần kiểm tra bộ lọc, sắp xếp và phân trang không ảnh hưởng nhau nên test riêng lẻ là đủ", en: "Only check the filter; sort and pagination don't affect each other so testing them separately is enough", ja: "フィルタだけ確認すればよく、並び替えとページネーションは互いに影響しないので個別テストで十分" },
      { vi: "Cả ba (bộ lọc, tiêu chí sắp xếp, số trang) phải đúng đồng thời — dữ liệu trang N vừa đúng điều kiện lọc vừa đúng thứ tự đã chọn", en: "All three (filter, sort criteria, page number) must be correct at the same time — page N's data must match both the filter and the chosen order", ja: "3つ（フィルタ・並び替え条件・ページ番号）が同時に正しくなければならない——N ページ目のデータがフィルタ条件と選んだ順序の両方に一致すること" },
      { vi: "Chỉ cần kiểm tra tốc độ tải trang", en: "Only check the page load speed", ja: "ページ読み込み速度だけ確認すればよい" },
      { vi: "Không cần test kết hợp, chỉ cần test từng tính năng đơn lẻ", en: "No need to test combinations, only test each feature individually", ja: "組み合わせテストは不要で、各機能を個別にテストすればよい" },
    ], correct: 1,
    explain: { vi: "Ba tính năng thường tương tác với nhau qua cùng một truy vấn dữ liệu, nên lỗi dễ xuất hiện khi kết hợp mà từng tính năng riêng lẻ vẫn đúng.", en: "The three features usually interact through the same data query, so bugs often appear only when combined even if each feature is correct alone.", ja: "3つの機能は通常同じデータクエリを通じて相互作用するため、単体では正しくても組み合わせると初めてバグが現れることが多いです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử phân trang & sắp xếp là kiểm tra danh sách dài (như danh sách sản phẩm) được chia trang đúng số lượng, điều hướng trang đúng (đầu/cuối/nhảy trang/vượt giới hạn), giữ bộ lọc khi đổi trang, và sắp xếp đúng chiều tăng/giảm theo giá, tên, mới nhất — kể cả khi nhiều item có cùng giá trị (ổn định thứ tự). Bài này bám trang danh sách sản phẩm của app TMĐT ShopEasy: bạn học cách nghĩ ca kiểm thử, tìm lỗi thật (mất bộ lọc khi sang trang, trang vượt giới hạn hiện trắng), và cách kiểm khi kết hợp cả ba tính năng. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Pagination & sort testing checks that a long list (like a product list) is split into pages with the correct count, page navigation works correctly (first/last/jump/beyond limit), filters persist when changing pages, and sorting is correct in both directions by price, name, newest — even when several items share the same value (stable order). This follows ShopEasy's product list page: you learn to design test cases, find real bugs (lost filters when changing pages, a blank page beyond the limit), and how to check all three features combined. Lots of visuals and a quiz at the end.",
        "ページネーション＆並び替えテストとは、商品一覧のような長いリストが正しい件数でページ分割され、ページ移動（最初/最後/ジャンプ/範囲外）が正しく動き、ページを切り替えてもフィルタが維持され、価格・名前・新着順で正しい方向に並び替えられる（同じ値を持つ項目が複数あっても順序が安定している）かを確認することです。本記事はECアプリShopEasyの商品一覧ページに沿い、テストケースの考え方、実際のバグ（ページ切替時のフィルタ喪失、範囲外ページの白画面）の発見、3つの機能を組み合わせた確認方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Danh sách sản phẩm trông có vẻ đơn giản — chỉ là hiển thị vài chục món hàng chia thành nhiều trang. Nhưng đây lại là nơi ẩn chứa rất nhiều lỗi tinh vi: trang cuối bị lệch số lượng, bấm sang trang 2 thì bộ lọc bạn vừa chọn 'biến mất', hay đổi 'Giá: Giảm dần' mà danh sách vẫn hiện y như cũ. Kiểm thử phân trang chính là kỹ năng giúp bạn phát hiện đúng những lỗi 'nhỏ mà đau' này trước khi khách hàng gặp phải. Chúng ta sẽ học qua trang danh sách sản phẩm thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! A product list looks simple — just showing a few dozen items split across pages. But it's actually a hotspot for subtle bugs: the last page has the wrong count, filters you just picked 'vanish' when you go to page 2, or switching to 'Price: High to Low' doesn't actually change the order. Pagination testing is exactly the skill that helps you catch these 'small but painful' bugs before customers run into them. We'll learn through ShopEasy's real product list page, with visuals and hands-on practice.",
        "こんにちは、初心者さん！商品一覧は一見シンプル——数十件の商品を複数ページに分けて表示するだけです。しかし実は微妙なバグの温床です：最終ページの件数がずれる、2ページ目に進むと選んだフィルタが『消える』、『価格：高い順』に切り替えても順序が変わらない、など。ページネーションテストは、こうした『小さいが痛い』バグを顧客が遭遇する前に見つけるためのスキルです。実際のShopEasy商品一覧ページを通じて、図と実習付きで学びます。"),
      IMG(m_list, "Màn hình test: danh sách sản phẩm ShopEasy với dropdown sắp xếp và phân trang", "Screen under test: ShopEasy product list with a sort dropdown and pagination", "テスト対象画面：並び替えドロップダウンとページネーションがあるShopEasy商品一覧"),
      DEF("Pagination Testing", "kiểm thử việc chia một danh sách dài thành nhiều trang: đúng số lượng mỗi trang, điều hướng trang đúng, và giữ đúng trạng thái (bộ lọc, sắp xếp) khi đổi trang.",
        "testing how a long list is split into pages: correct item count per page, correct page navigation, and correctly preserving state (filters, sort) when changing pages.",
        "長いリストを複数ページに分割する処理をテストすること：各ページの件数の正しさ、ページ移動の正しさ、ページ切替時に状態（フィルタ、並び替え）が正しく維持されるかを確認する。"),
    ] },
  { heading: { vi: "2. Phân trang là gì, sắp xếp là gì?", en: "2. What is pagination, what is sorting?", ja: "2. ページネーションと並び替えとは？" },
    blocks: [
      P("Phân trang (pagination) là cách chia một danh sách dài (ví dụ 48 sản phẩm) thành nhiều trang nhỏ hơn (ví dụ 12 sản phẩm/trang, tổng 4 trang) để trang tải nhanh hơn và người dùng dễ theo dõi. Sắp xếp (sort) là cách quyết định thứ tự hiển thị các item trong danh sách đó — theo giá tăng/giảm, theo tên A-Z/Z-A, hay theo thời gian đăng (mới nhất trước). Hai tính năng này luôn đi cùng nhau trên các trang danh sách sản phẩm, vì người dùng thường vừa muốn sắp xếp theo ý mình vừa lướt qua nhiều trang để tìm món ưng ý.",
        "Pagination is how a long list (e.g. 48 products) is split into smaller pages (e.g. 12 products/page, 4 pages total) so the page loads faster and is easier to follow. Sorting decides the display order of items in that list — by price ascending/descending, by name A-Z/Z-A, or by posting time (newest first). These two features almost always appear together on product list pages, since users usually want to sort by their preference while also browsing multiple pages to find the right item.",
        "ページネーションとは、長いリスト（例：商品48件）をより小さなページ（例：1ページ12件、計4ページ）に分割し、読み込みを速くしユーザーが追いやすくする方法です。並び替えは、そのリスト内の項目の表示順序を決める方法です——価格の昇順/降順、名前のA-Z/Z-A、あるいは投稿時刻（新着順）など。この2つの機能は商品一覧ページでほぼ常に一緒に登場します。ユーザーは自分の好みで並び替えつつ、複数ページを閲覧して目当ての商品を探すことが多いからです。"),
      P("Với người mới, dễ nghĩ hai tính năng này 'chỉ là hiển thị', không quan trọng bằng nghiệp vụ đặt hàng hay thanh toán. Nhưng thực tế, đây là hai tính năng người dùng chạm vào NHIỀU NHẤT trên một trang thương mại điện tử — gần như mọi phiên duyệt web đều liên quan tới việc lướt trang và đổi cách sắp xếp. Một lỗi nhỏ ở đây (như mất bộ lọc khi sang trang) có thể khiến khách hàng bỏ cuộc tìm kiếm và rời trang, ảnh hưởng trực tiếp tới doanh thu dù lỗi chỉ nằm ở khâu hiển thị.",
        "Beginners often think these two features are 'just display', less important than ordering or payment. But in reality, these are the two features users touch THE MOST on an e-commerce site — nearly every browsing session involves flipping pages and changing the sort order. A small bug here (like losing filters when changing pages) can make a customer give up searching and leave, directly hurting revenue even though the bug is only in the display layer.",
        "初心者は、この2つの機能を『表示だけ』で、注文や決済ほど重要ではないと考えがちです。しかし実際は、ECサイトでユーザーが最も頻繁に触れる機能です——ほぼ全ての閲覧セッションでページ送りや並び替えの変更が関わります。ここでの小さなバグ（ページ切替時のフィルタ喪失など）は、顧客が検索を諦めて離脱する原因となり、表示層だけのバグでも売上に直接影響します。"),
      DEF("Sort Testing", "kiểm thử việc sắp xếp danh sách đúng theo tiêu chí đã chọn (giá, tên, mới nhất) và đúng chiều (tăng/giảm), kể cả khi nhiều item có giá trị bằng nhau.",
        "testing that a list is sorted correctly by the chosen criterion (price, name, newest) and in the correct direction (ascending/descending), even when several items share the same value.",
        "選択した基準（価格、名前、新着）に沿ってリストが正しく、かつ正しい方向（昇順/降順）で並び替えられるかをテストすること。複数項目が同じ値を持つ場合も含む。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử phân trang & sắp xếp", en: "3. Why beginners need to master pagination & sort testing", ja: "3. 初心者がページネーション＆並び替えテストを習得すべき理由" },
    blocks: [
      P("Phân trang và sắp xếp thường được lập trình dựa trên tham số truy vấn (query parameter) như ?trang=2&sort=gia-tang. Vì logic tính offset, giới hạn (limit), và điều kiện sắp xếp khá 'toán học', đây là nơi rất dễ lệch một đơn vị (off-by-one) — ví dụ trang 2 lại lặp lại sản phẩm cuối của trang 1, hoặc trang cuối thiếu mất 1 sản phẩm. Người mới thạo kiểm thử phân trang sẽ chủ động soi ra những lỗi off-by-one này thay vì chỉ lướt qua 'thấy có phân trang là được'.",
        "Pagination and sorting are usually built on query parameters like ?trang=2&sort=gia-tang. Because the logic for offset, limit, and sort conditions is fairly 'mathematical', it's a hotspot for off-by-one errors — for example page 2 repeats the last product of page 1, or the last page is missing one product. A beginner skilled in pagination testing will proactively spot these off-by-one bugs instead of just glancing and thinking 'pagination exists, so it's fine'.",
        "ページネーションと並び替えは通常?trang=2&sort=gia-tangのようなクエリパラメータで実装されます。オフセット、limit、並び替え条件のロジックはかなり『数学的』なため、off-by-oneエラー（1つずれるバグ）が起きやすい箇所です——例えば2ページ目が1ページ目の最後の商品を繰り返す、最終ページに商品が1つ足りない、など。ページネーションテストに習熟した初心者は、『ページネーションがあるから大丈夫』と流し見るのではなく、こうしたoff-by-oneバグを積極的に見つけ出せます。"),
      P("Đây cũng là kỹ năng liên quan trực tiếp tới API testing sau này: hầu hết API danh sách (list API) đều nhận tham số page/limit/sort, và việc bạn hiểu rõ cách kiểm thử phân trang & sắp xếp ở giao diện sẽ giúp bạn dễ dàng chuyển sang kiểm thử các tham số đó ở tầng API. Ngoài ra, câu hỏi 'Bạn sẽ test phân trang như thế nào?' cũng là câu hỏi phỏng vấn khá phổ biến, vì nó cho thấy khả năng nghĩ ca kiểm thử có hệ thống thay vì chỉ test 'cho có'.",
        "This is also a skill directly related to future API testing: most list APIs accept page/limit/sort parameters, and understanding how to test pagination & sorting on the UI makes it easy to move on to testing those parameters at the API layer. Also, 'How would you test pagination?' is a fairly common interview question, since it shows the ability to design systematic test cases instead of just testing 'for the sake of it'.",
        "これは今後のAPIテストにも直結するスキルです：ほとんどの一覧APIはpage/limit/sortパラメータを受け取るため、UIでのページネーション＆並び替えテストの理解は、APIレイヤーでのそれらパラメータのテストへスムーズに移行できます。また、『ページネーションをどうテストしますか？』は面接でよくある質問で、体系的にテストケースを考える力を示せます。"),
      P("Và cuối cùng, phân trang/sắp xếp sai lệch có thể khiến sản phẩm bị 'ẩn' khỏi khách hàng một cách vô hình: nếu trang 2 bị lỗi không tải được, mọi sản phẩm chỉ nằm ở trang 2 trở đi coi như không bao giờ được khách nhìn thấy — dù dữ liệu vẫn tồn tại đúng trong hệ thống. Đây là loại lỗi 'im lặng' rất nguy hiểm vì không ai báo lỗi rõ ràng, chỉ âm thầm làm giảm doanh thu.",
        "Finally, faulty pagination or sorting can invisibly 'hide' products from customers: if page 2 fails to load, every product living from page 2 onward is effectively never seen by any customer — even though the data is perfectly intact in the system. This is a dangerous 'silent' type of bug because no one reports it clearly; it just quietly erodes revenue.",
        "最後に、ページネーションや並び替えの不具合は、商品を顧客から見えなくしてしまうことがあります：2ページ目が読み込めなければ、2ページ目以降にある商品はデータとしては正しく存在していても、実質的に誰にも見られなくなります。誰も明確に報告しないため気づかれにくい『サイレント』な種類のバグで、静かに売上を蝕みます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: khái niệm & các kỹ thuật nghĩ ca kiểm thử", en: "4. Prepare: concepts & techniques for test case ideas", ja: "4. 準備：概念とテストケースを考える技法" },
    blocks: [
      P("Trước khi viết ca kiểm thử, bạn cần nắm rõ vài khái niệm cơ bản của phân trang: tổng số item, số item/trang (page size), tổng số trang (tính từ hai số trên), trang hiện tại, và tiêu chí + chiều sắp xếp đang áp dụng. Danh sách kỹ thuật dưới đây giúp bạn không bỏ sót góc nào.",
        "Before writing test cases, you need to grasp a few basic pagination concepts: total item count, items per page (page size), total page count (derived from the two above), the current page, and the sort criterion + direction currently applied. The technique list below helps you not miss any angle.",
        "テストケースを書く前に、ページネーションの基本概念をいくつか理解しておく必要があります：総件数、1ページあたりの件数（ページサイズ）、総ページ数（上記2つから算出）、現在のページ、そして現在適用中の並び替え基準と方向です。以下の技法リストで漏れなく考えられます。"),
      STEP(1, "Mở trang danh sách cần test (ví dụ danh sách sản phẩm ShopEasy); ghi lại tổng số item và số item/trang.", "Open the list page to test (e.g. ShopEasy's product list); note the total item count and items per page.", "テストする一覧ページ（例：ShopEasy商品一覧）を開き、総件数と1ページあたりの件数を記録する。"),
      STEP(2, "Tính tổng số trang mong đợi = làm tròn lên (tổng item / item mỗi trang), rồi kiểm hệ thống hiển thị đúng con số đó.", "Compute the expected total pages = ceiling(total items / items per page), then check the system displays that exact number.", "期待される総ページ数＝切り上げ(総件数 ÷ 1ページの件数)を計算し、システムがその数値を正しく表示するか確認する。"),
      STEP(3, "Với mỗi tiêu chí sắp xếp, thử cả hai chiều (tăng và giảm) và so sánh thứ tự thực tế với thứ tự bạn tự tính tay từ dữ liệu.", "For each sort criterion, try both directions (ascending and descending) and compare the actual order with an order you calculate by hand from the data.", "各並び替え基準について両方向（昇順・降順）を試し、実際の順序をデータから自分で手計算した順序と比較する。"),
      TRY("Mở một trang danh sách bất kỳ (sản phẩm, bài viết, bình luận) trong app bạn dùng, đếm tổng item và item/trang, rồi tự tính xem tổng số trang hiển thị có đúng không.", "Open any list page (products, articles, comments) in an app you use, count the total items and items per page, then calculate whether the displayed total pages is correct.", "使っているアプリの任意の一覧ページ（商品、記事、コメント）を開き、総件数と1ページの件数を数え、表示されている総ページ数が正しいか自分で計算してみよう。"),
      PITFALL("Chỉ test trang 1 rồi coi như phân trang 'chắc cũng ổn' cho các trang còn lại. Lỗi off-by-one thường chỉ lộ ra ở trang 2, trang giữa, hoặc trang cuối — không bao giờ ở trang 1.", "Testing only page 1 and assuming pagination is 'probably fine' for the rest. Off-by-one bugs usually only surface on page 2, a middle page, or the last page — never on page 1.", "1ページ目だけテストして、残りのページは『たぶん大丈夫』と思い込むこと。off-by-oneバグは通常、2ページ目・中間ページ・最終ページでしか現れず、1ページ目では現れません。"),
      IMG(m_technique, "Các kỹ thuật kiểm thử phân trang & sắp xếp, minh hoạ trên danh sách sản phẩm ShopEasy", "Techniques for pagination & sort testing, illustrated on ShopEasy's product list", "ページネーション＆並び替えテストの技法、ShopEasy商品一覧で例示"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử phân trang & sắp xếp từng bước (thực hành)", en: "5. Writing pagination & sort test cases step by step (hands-on)", ja: "5. ページネーション＆並び替えテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào danh sách sản phẩm ShopEasy: 50 sản phẩm, cấu hình 12 sản phẩm/trang. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử phân trang & sắp xếp đầy đủ.",
        "Now let's apply this for real to ShopEasy's product list: 50 products, configured 12 per page. Follow the order below to get a full set of pagination & sort test cases.",
        "では、ShopEasyの商品一覧に実際に適用しましょう：商品50件、1ページ12件の設定です。以下の順に沿って、完全なページネーション＆並び替えテストケース一式を作りましょう。"),
      STEP(1, "Xác định con số mong đợi: 50/12 = 4 trang đầy (12 sản phẩm) + 1 trang dư 2 sản phẩm = tổng 5 trang.", "Determine the expected numbers: 50/12 = 4 full pages (12 products) + 1 page with a remainder of 2 = 5 pages total.", "期待値を確認：50÷12＝12件の満杯ページが4つ＋余り2件のページ1つ＝合計5ページ。"),
      STEP(2, "Kiểm trang 1: nút 'Trước' phải bị vô hiệu hoá hoặc ẩn; kiểm trang 5 (cuối): nút 'Sau' phải bị vô hiệu hoá hoặc ẩn.", "Check page 1: the 'Previous' button should be disabled or hidden; check page 5 (last): the 'Next' button should be disabled or hidden.", "1ページ目を確認：『前へ』ボタンは無効化または非表示になっているべき。5ページ目（最終）を確認：『次へ』ボタンが無効化または非表示になっているべき。"),
      STEP(3, "Thử nhảy trang trực tiếp bằng cách sửa URL ?trang=999 (vượt giới hạn); ghi Expected (báo trống/không lỗi) và Actual riêng biệt.", "Try jumping pages directly by editing the URL to ?trang=999 (beyond limit); record Expected (empty/no error) and Actual separately.", "URLを?trang=999（範囲外）に直接変更してジャンプを試す；Expected（空表示/エラーなし）とActualを別々に記録する。"),
      STEP(4, "Chọn 'Giá: Tăng dần', ghi lại 12 giá đầu tiên trang 1, tự sắp xếp tay để đối chiếu; lặp lại với 'Giá: Giảm dần'.", "Select 'Price: Low to High', note the first 12 prices on page 1, sort them by hand to cross-check; repeat with 'Price: High to Low'.", "『価格：安い順』を選び、1ページ目の最初の12個の価格を記録し、自分で並び替えて照合する；『価格：高い順』でも繰り返す。"),
      STEP(5, "Lọc Danh mục = 'Thời trang nam' rồi bấm sang trang 2; kiểm bộ lọc và bộ đếm số sản phẩm có còn đúng như trang 1 không.", "Filter Category = 'Men's fashion' then click to page 2; check whether the filter and the product-count badge are still correct as on page 1.", "カテゴリ＝『メンズファッション』でフィルタし2ページ目へ；フィルタと商品件数表示が1ページ目と同じく正しいか確認する。"),
      CODE("text", "BO CA KIEM THU - Danh sach san pham ShopEasy (50 SP, 12/trang)\nCa 1: Trang 1 -> nut 'Truoc' bi vo hieu hoa | Actual: dung\nCa 2: Trang 5 (cuoi) -> chi hien 2 SP, nut 'Sau' bi vo hieu hoa | Actual: dung\nCa 3: ?trang=999 -> Expected: bao trong/khong loi | Actual: hien trang trang, khong nut quay lai (BUG)\nCa 4: Loc 'Thoi trang nam' + sang trang 2 -> Expected: giu bo loc | Actual: mat bo loc, hien toan bo SP (BUG)\nCa 5: 'Gia: Tang dan' -> Expected: gia thap nhat truoc | Actual: dung"),
      TRY("Viết thêm 1 ca kiểm thử nữa cho danh sách sản phẩm ShopEasy mà bảng trên chưa có (gợi ý: đổi số sản phẩm/trang từ 12 sang 24, hoặc sắp xếp theo 'Mới nhất').", "Write one more test case for ShopEasy's product list not in the table above (hint: change items per page from 12 to 24, or sort by 'Newest').", "上の表にないShopEasy商品一覧のテストケースをもう1つ書こう（ヒント：1ページの件数を12から24に変更、または『新着順』で並び替え）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: mất bộ lọc khi đổi trang", en: "6. Situation 1: losing filters when changing pages", ja: "6. シーン1：ページ切替時にフィルタが消える" },
    blocks: [
      SITUATION("Đội chỉ test phân trang trên danh sách KHÔNG có bộ lọc nào được áp dụng — mọi ca đều pass, ai cũng yên tâm release.", "The team only tests pagination on a list with NO filter applied — every case passes, everyone feels safe to release.",
        "Lên production, khách lọc Danh mục = 'Thời trang nam' + khoảng giá, thấy đúng 26 sản phẩm phù hợp. Nhưng khi bấm sang trang 2 để xem tiếp, bộ lọc bị mất và trang 2 hiện toàn bộ sản phẩm của cả shop — khách tưởng nhầm không còn sản phẩm phù hợp ở mức giá mong muốn và rời đi.",
        "In production, a customer filters Category = 'Men's fashion' + a price range, sees exactly 26 matching products. But clicking to page 2 to see more, the filter is lost and page 2 shows every product in the whole shop — the customer mistakenly thinks there are no more matching products at their desired price and leaves.",
        "チームはフィルタが一切適用されていない一覧でのみページネーションをテスト——全ケース合格、安心してリリース。",
        "本番環境で、顧客がカテゴリ＝『メンズファッション』＋価格帯でフィルタし、該当する26件の商品を正しく確認。しかし続きを見ようと2ページ目をクリックするとフィルタが消え、2ページ目にはショップ全体の商品が表示される——顧客は希望価格帯に合う商品がもうないと誤解し離脱する。"),
      SOLVE("Bổ sung ca kiểm thử 'áp bộ lọc rồi đổi trang' vào bộ hồi quy bắt buộc cho mọi trang danh sách có cả lọc lẫn phân trang, và đảm bảo tham số lọc được gắn vào URL/trạng thái khi chuyển trang chứ không chỉ lưu tạm trên giao diện.", "Add the 'apply a filter then change pages' test case to the mandatory regression suite for every list page that has both filtering and pagination, and make sure filter parameters are carried in the URL/state when changing pages, not just held temporarily in the UI.", "フィルタとページネーションの両方を持つ全ての一覧ページの必須回帰テストスイートに『フィルタを適用してからページを変更する』ケースを追加し、ページ切替時にフィルタパラメータがURL/状態に確実に引き継がれる（UI上だけの一時保持でない）ようにする。"),
      P("Đây là bài học lớn nhất trong chương này: test phân trang 'trên dữ liệu sạch, không lọc gì' không đại diện cho cách người dùng thật sử dụng tính năng. Trong thực tế, khách hàng gần như luôn lọc trước rồi mới lướt qua nhiều trang — nên bộ ca kiểm thử của bạn PHẢI có ít nhất một ca kết hợp lọc + phân trang, không chỉ test phân trang đơn lẻ trên danh sách đầy đủ.",
        "This is the biggest lesson in this chapter: testing pagination 'on clean data with no filters' doesn't represent how real users actually use the feature. In reality, customers almost always filter first, then browse across pages — so your test case set MUST include at least one case combining filter + pagination, not just pagination alone on the full list.",
        "この章での最大の教訓です：『何もフィルタしていないクリーンなデータ』でページネーションをテストすることは、実際のユーザーの使い方を代表していません。実際には、顧客はほぼ常にまずフィルタしてから複数ページを閲覧します——そのためテストケース一式には、全件リストでのページネーション単体だけでなく、フィルタ＋ページネーションを組み合わせたケースが最低1つ必須です。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử 'lọc rồi đổi trang' trên danh sách sản phẩm", "A bug ticket found via the 'filter then change page' test case on the product list", "『フィルタしてからページ変更』ケースで見つかったバグチケット"),
      RECAP(["Test phân trang phải kết hợp cùng bộ lọc, không chỉ test riêng lẻ", "Tham số lọc cần được giữ trong URL/trạng thái khi đổi trang"],
        ["Pagination testing must combine with filters, not just be tested alone", "Filter parameters must persist in the URL/state when changing pages"],
        ["ページネーションテストはフィルタと組み合わせる必要があり、単体だけでは不十分", "フィルタパラメータはページ切替時もURL/状態に維持されるべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: trang vượt giới hạn hiện trắng, không có lối thoát", en: "7. Situation 2: a page beyond the limit shows blank with no way out", ja: "7. シーン2：範囲外ページが白画面で戻れない" },
    blocks: [
      SITUATION("Bạn thử sửa trực tiếp URL thành ?trang=999 chỉ để xem điều gì xảy ra, dù giao diện chỉ có 4 trang.", "You try directly editing the URL to ?trang=999 just to see what happens, even though the UI only shows 4 pages.",
        "Trang tải ra hoàn toàn trống, không có thông báo lỗi, không có nút 'Về trang 1' hay đường link nào để quay lại — người dùng bị 'kẹt' và phải tự sửa URL hoặc bấm nút Back của trình duyệt.",
        "The page loads completely blank, with no error message, no 'Back to page 1' button or any link to return — the user gets 'stuck' and has to manually edit the URL or hit the browser's Back button.",
        "画面に4ページしかないにもかかわらず、URLを直接?trang=999に変更して何が起きるか試してみる。",
        "ページは完全に空白で読み込まれ、エラーメッセージも『1ページ目に戻る』ボタンも戻るためのリンクも一切ない——ユーザーは『行き詰まり』、自分でURLを修正するかブラウザの戻るボタンを押すしかない。"),
      SOLVE("Báo bug Medium/High (ảnh hưởng trải nghiệm, có thể khiến người dùng thoát app), đề xuất hai hướng xử lý: hoặc tự động đưa về trang cuối hợp lệ, hoặc hiện thông báo rõ ràng kèm nút quay về trang 1 — rồi thêm ca này vào bộ hồi quy.", "Report it as a Medium/High bug (hurts UX, may drive users away), propose two possible fixes: either auto-redirect to the last valid page, or show a clear message with a button back to page 1 — then add this case to the regression suite.", "Medium/Highバグとして報告（UXに影響し、ユーザー離脱を招く可能性）、2つの対応案を提案：有効な最終ページへ自動リダイレクトするか、明確なメッセージと1ページ目に戻るボタンを表示するか——そしてこのケースを回帰テストスイートに追加する。"),
      P("Ví dụ này cho thấy phân trang không chỉ cần 'đúng số liệu' mà còn cần 'đúng trải nghiệm' ở các trạng thái biên (edge case): trang 0, trang âm, trang không phải số, trang vượt tổng số. Với người mới, đây là bài tập tốt để luyện lại tư duy giá trị biên đã học — áp dụng ngay vào một tính năng thật thay vì chỉ trên lý thuyết.",
        "This example shows pagination doesn't just need 'correct numbers' but also 'a correct experience' at boundary states: page 0, a negative page, a non-numeric page, a page beyond the total. For beginners, this is a great exercise to reapply boundary-value thinking you've already learned — right away on a real feature instead of just in theory.",
        "この例は、ページネーションには『正しい数値』だけでなく境界状態（0ページ目、負のページ、数値でないページ、総数を超えるページ）での『正しい体験』も必要なことを示します。初心者にとっては、既に学んだ境界値の考え方を理論だけでなく実際の機能に即座に応用する良い練習になります。"),
      TRY("Thử thêm các trạng thái biên khác cho ô số trang trong app bạn dùng: trang=0, trang=-1, trang=abc — ghi lại Actual của từng ca.", "Try more boundary states for the page parameter in an app you use: page=0, page=-1, page=abc — note the Actual result for each case.", "使っているアプリのページ番号パラメータで他の境界状態も試そう：page=0、page=-1、page=abc——各ケースのActualを記録しよう。"),
    ] },
  { heading: { vi: "8. Kết hợp lọc + sắp xếp + phân trang", en: "8. Combining filter + sort + pagination", ja: "8. フィルタ＋並び替え＋ページネーションの組み合わせ" },
    blocks: [
      P("Ba tính năng lọc, sắp xếp, phân trang thường được xử lý bởi cùng một truy vấn dữ liệu ở backend (áp bộ lọc trước, sắp xếp kết quả, rồi mới cắt trang). Chính vì chia sẻ chung một truy vấn, lỗi rất dễ xuất hiện khi kết hợp cả ba dù từng tính năng riêng lẻ đều đã pass — ví dụ áp lọc đúng, sắp xếp đúng, nhưng khi cả hai cùng lúc với trang 3 thì kết quả lại thiếu hoặc lặp sản phẩm.",
        "Filtering, sorting, and pagination are usually handled by the same backend data query (apply filters first, sort the results, then slice into pages). Because they share the same query, bugs easily appear when combining all three even if each feature passes on its own — for example the filter works, the sort works, but together with page 3 the result is missing or duplicating products.",
        "フィルタ、並び替え、ページネーションの3つは通常、バックエンドの同一データクエリで処理されます（先にフィルタを適用し、結果を並び替え、その後ページで切り出す）。同じクエリを共有するため、各機能が個別には合格していても、3つを組み合わせるとバグが現れやすくなります——例えばフィルタは正しく、並び替えも正しいのに、3ページ目と組み合わせると商品が欠落したり重複したりする、など。"),
      IMG(m_dash, "Số liệu: phần lớn lỗi nghiêm trọng của sprint đến từ khi kết hợp lọc + sắp xếp + phân trang, không phải từng tính năng riêng lẻ", "Metrics: most of the sprint's serious bugs come from combining filter + sort + pagination, not each feature alone", "指標：スプリントの重大バグの大半はフィルタ＋並び替え＋ページネーションを組み合わせた際に発生し、単体機能では発生していない"),
      P("Cách thực dụng để không bỏ sót là: sau khi test riêng từng tính năng, luôn thêm ít nhất một ca 'kết hợp cả ba' — chọn một bộ lọc, một tiêu chí sắp xếp, rồi lướt tới một trang giữa (không phải trang 1) để kiểm tra dữ liệu vẫn đúng cả ba điều kiện cùng lúc. Đây thường là ca kiểm thử bị bỏ sót nhiều nhất vì trông có vẻ 'thừa' khi từng tính năng đã pass riêng.",
        "A practical way to not miss this is: after testing each feature separately, always add at least one 'combine all three' case — pick a filter, a sort criterion, then browse to a middle page (not page 1) to check the data still satisfies all three conditions at once. This is often the most-overlooked test case because it seems 'redundant' once each feature has passed individually.",
        "見落とさないための実用的な方法は：各機能を個別にテストした後、必ず『3つを組み合わせる』ケースを最低1つ追加することです——フィルタを1つ選び、並び替え基準を1つ選び、（1ページ目ではない）中間のページまで進んで、データが3条件全てを同時に満たしているか確認します。各機能が個別に合格した後では『余計』に見えるため、最も見落とされやすいテストケースです。"),
      TIP("Ưu tiên test trang GIỮA (không phải trang 1) khi kết hợp lọc + sắp xếp — lỗi kết hợp gần như không bao giờ lộ ra ở trang 1 vì trang 1 thường được lập trình viên test kỹ nhất.", "Prioritize testing a MIDDLE page (not page 1) when combining filter + sort — combination bugs almost never surface on page 1 because it's usually the page developers test most carefully.", "フィルタ＋並び替えを組み合わせる際は中間のページ（1ページ目ではない）を優先的にテストしよう——組み合わせバグは1ページ目にはほぼ現れません。開発者が最も念入りにテストするのが通常1ページ目だからです。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm kiểm thử phân trang & sắp xếp. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when doing pagination & sort testing. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はページネーション＆並び替えテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ kiểm tra 'có nút phân trang hiển thị' mà không thực sự đếm số item hoặc đối chiếu thứ tự sắp xếp bằng tay — dẫn tới bỏ sót lỗi off-by-one hoặc sai thứ tự.", "Only checking that 'pagination buttons appear' without actually counting items or manually cross-checking the sort order — leading to missed off-by-one or wrong-order bugs.", "『ページネーションボタンが表示される』ことだけ確認し、実際に件数を数えたり並び替え順序を手で照合したりしない——off-by-oneや順序違いのバグを見逃す原因になる。"),
      PITFALL("Quên test khi tổng số item chia hết chẵn cho item/trang (ví dụ đúng 48/12 = 4 trang, không dư) — trường hợp này dễ lộ lỗi 'thừa 1 trang trống' mà trường hợp có số dư lẻ không lộ ra.", "Forgetting to test when the total item count divides evenly by items per page (e.g. exactly 48/12 = 4 pages, no remainder) — this case can reveal an 'extra blank page' bug that a case with a remainder wouldn't show.", "総件数が1ページの件数で割り切れる場合（例：48÷12＝ちょうど4ページ、余りなし）のテストを忘れる——このケースは『余分な空ページ』バグを露呈させることがあり、余りがあるケースでは出てこない。"),
      TIP("Trước khi báo lỗi thứ tự sắp xếp, tự tay sắp xếp lại 5-10 item bằng bảng tính hoặc giấy để chắc chắn hệ thống sai chứ không phải bạn đọc nhầm.", "Before reporting a sort-order bug, manually re-sort 5-10 items with a spreadsheet or on paper to make sure the system is wrong rather than you misreading it.", "並び替え順序のバグを報告する前に、表計算ソフトや紙で5〜10項目を自分の手で並び替え直し、システムの誤りであって自分の読み間違いでないことを確かめよう。"),
      IMG(m_testcase, "Nhắc lại bảng ca kiểm thử phân trang & sắp xếp — dùng làm checklist khi thời gian có hạn", "Reminder of the pagination & sort test case table — use as a checklist when time is limited", "ページネーション＆並び替えテストケース表の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
      INTERNAL("Kiểm thử tìm kiếm & bộ lọc cho người mới", "Search & filter testing for beginners", "kiem-thu-tim-kiem-bo-loc-cho-nguoi-moi", "初心者のための検索＆フィルタテスト"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử phân trang & sắp xếp qua danh sách sản phẩm ShopEasy: khái niệm cơ bản (số item/trang, tổng số trang, trang đầu/cuối), các kỹ thuật nghĩ ca kiểm thử (nhảy trang, trang vượt giới hạn, giữ bộ lọc, sắp xếp hai chiều, ổn định thứ tự), và hai tình huống thật cho thấy test phân trang riêng lẻ trên dữ liệu sạch dễ bỏ sót lỗi khi kết hợp với bộ lọc. Bạn cũng biết cách kiểm khi kết hợp cả ba tính năng lọc, sắp xếp, phân trang cùng lúc. Đây là kỹ năng nền tảng cho mọi trang danh sách của ứng dụng web/mobile.",
        "You just learned how to test pagination & sorting through ShopEasy's product list: basic concepts (items per page, total pages, first/last page), techniques for test case ideas (jumping pages, pages beyond the limit, keeping filters, two-way sorting, stable order), and two real situations showing that testing pagination alone on clean data easily misses bugs when combined with filters. You also learned how to check when combining all three features — filter, sort, pagination — at once. This is a foundational skill for every list page in web/mobile apps.",
        "ShopEasyの商品一覧を通じて、ページネーション＆並び替えのテスト方法を学びました：基本概念（1ページの件数、総ページ数、最初/最後のページ）、テストケースを考える技法（ページジャンプ、範囲外ページ、フィルタの維持、双方向の並び替え、安定した順序）、そしてクリーンなデータでページネーション単体をテストするだけではフィルタと組み合わせた際のバグを見逃しやすいことを示す2つの実例。フィルタ・並び替え・ページネーションの3つを同時に組み合わせて確認する方法も学びました。Web/モバイルアプリの全ての一覧ページに共通する土台スキルです。"),
      P("Chặng tiếp theo, bạn nên ôn lại kiểm thử tìm kiếm & bộ lọc và kỹ thuật phân vùng tương đương/giá trị biên để áp dụng cho các tham số phân trang (page, limit) một cách hệ thống hơn. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should review search & filter testing and equivalence partitioning/boundary value techniques to apply them more systematically to pagination parameters (page, limit). If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、検索＆フィルタテストと同値分割・境界値分析の技法を復習し、ページネーションパラメータ（page、limit）へより体系的に応用しましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const PHANTRANG_01 = makeDoc({
  slug: "kiem-thu-phan-trang-sap-xep-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử phân trang",
  keywords: ["kiểm thử phân trang", "pagination testing", "kiểm thử sắp xếp", "sort testing", "ca kiểm thử phân trang cho người mới"],
  coverLabel: "NGƯỜI MỚI · PHÂN TRANG & SẮP XẾP · TMĐT",
  crumb: "Kiểm thử phân trang & sắp xếp (Pagination & Sort Testing)",
  metaTitle: { vi: "Kiểm thử phân trang & sắp xếp cho người mới", en: "Pagination & sort testing for beginners", ja: "初心者向けページネーション＆並び替えテスト" },
  metaDescription: {
    vi: "Kiểm thử phân trang cho người mới: nhảy trang, vượt giới hạn, giữ bộ lọc khi đổi trang, sắp xếp tăng/giảm, ổn định thứ tự qua ShopEasy, có hình và trắc nghiệm.",
    en: "Pagination testing for beginners: jumping pages, pages beyond the limit, keeping filters when changing pages, ascending/descending sort and stable order through the ShopEasy example, with visuals and a quiz.",
    ja: "初心者向けページネーションテスト：ページジャンプ、範囲外ページ、ページ切替時のフィルタ維持、昇順/降順と安定ソートをShopEasy例で解説、図とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử phân trang & sắp xếp cho người mới: nhảy trang, giữ bộ lọc, sắp xếp ổn định (có trắc nghiệm)",
    en: "Pagination & sort testing for beginners: page jumps, keeping filters, stable sort (with quiz)",
    ja: "初心者のためのページネーション＆並び替えテスト：ページジャンプ、フィルタ維持、安定ソート（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử phân trang qua app TMĐT ShopEasy. Số item mỗi trang, trang đầu/cuối, nhảy trang, trang vượt giới hạn, giữ bộ lọc khi đổi trang, sắp xếp tăng/giảm theo giá/tên/mới nhất, ổn định thứ tự, kết hợp lọc + sắp xếp + phân trang. Nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn pagination testing through the ShopEasy e-commerce app. Items per page, first/last page, page jumps, pages beyond the limit, keeping filters when changing pages, ascending/descending sort by price/name/newest, stable order, combining filter + sort + pagination. Many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでページネーションテストを学ぶ。1ページの件数、最初/最後のページ、ページジャンプ、範囲外ページ、ページ切替時のフィルタ維持、価格/名前/新着順の昇順・降順、安定ソート、フィルタ＋並び替え＋ページネーションの組み合わせ。多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách nghĩ và viết ca kiểm thử phân trang & sắp xếp", steps: [
    { name: "Xác định tổng item, item/trang và tổng số trang mong đợi", text: "Tính số trang bằng làm tròn lên tổng item chia item/trang." },
    { name: "Test điều hướng trang và các trạng thái biên", text: "Trang đầu, trang cuối, nhảy trang, trang vượt giới hạn." },
    { name: "Test sắp xếp hai chiều và kết hợp với bộ lọc + phân trang", text: "Tăng/giảm, ổn định thứ tự, giữ bộ lọc khi đổi trang." },
  ] },
  pages,
});

export const MB_PHANTRANG_01 = [PHANTRANG_01];
