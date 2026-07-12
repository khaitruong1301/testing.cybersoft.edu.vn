// doc_mb_tim_kiem.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử tìm kiếm & bộ lọc (Search & Filter Testing) — cách nghĩ ca kiểm thử cho ô tìm kiếm
// (từ khóa rỗng, ký tự đặc biệt, không dấu, kết quả rỗng, phân biệt hoa/thường) và bộ lọc
// (nhiều điều kiện, khoảng giá, kết hợp lọc + sắp xếp + phân trang). Gắn app TMĐT ShopEasy.
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

// ── Mockup 1: trang danh sách sản phẩm ShopEasy có ô search + bộ lọc, annotate ──
const m_search = browser("shopeasy.vn/san-pham?tu-khoa=ao+thun", [
  panel("ShopEasy · Danh sách sản phẩm", [
    field(24, 20, 500, "Tìm kiếm sản phẩm", "ao thun", "normal"),
    btn(540, 42, 176, "Tìm kiếm", "primary"),
    field(24, 92, 220, "Danh mục", "Thời trang nam", "normal"),
    field(260, 92, 168, "Giá từ", "100.000", "normal"),
    field(444, 92, 168, "Giá đến", "500.000", "normal"),
    field(24, 164, 260, "Sắp xếp theo", "Giá tăng dần", "normal"),
    btn(300, 186, 200, "Áp dụng bộ lọc", "primary"),
    annotate(20, 12, 500, 62, "Ô TÌM KIẾM: rỗng, ký tự đặc biệt, không dấu, hoa/thường"),
    annotate(20, 84, 592, 62, "BỘ LỌC: danh mục + khoảng giá + sắp xếp"),
  ].join(""), { h: 260, accent: "#0891b2" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: các kỹ thuật nghĩ ca kiểm thử cho ô tìm kiếm ──
const m_technique = grid("Các kỹ thuật kiểm thử ô tìm kiếm", ["Kỹ thuật", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Từ khóa rỗng", "Bấm Tìm kiếm mà không nhập gì", "Bấm 'Tìm kiếm' khi ô còn trống"],
  ["Không dấu tiếng Việt", "Nhập từ khóa đã bỏ dấu", "Tìm 'ao thun' thay vì 'áo thun'"],
  ["Hoa/thường lẫn lộn", "Nhập chữ hoa, chữ thường bất kỳ", "Tìm 'ÁO THUN', 'Áo Thun', 'áo thun'"],
  ["Ký tự đặc biệt", "Nhập %, *, <script>, dấu ngoặc", "Tìm 'áo%20thun<script>'"],
  ["Từ khóa không tồn tại", "Tìm sản phẩm chắc chắn không bán", "Tìm 'máy bay phản lực'"],
  ["Khoảng trắng thừa", "Dư khoảng trắng ở đầu/cuối/giữa", "Tìm '  áo   thun  '"],
], { accent: "#0891b2" });

// ── Mockup 3: bảng ca kiểm tra tìm kiếm & bộ lọc (grid) ──
const m_testcase = grid("Bảng ca kiểm thử tìm kiếm & bộ lọc (ShopEasy)", ["Ca kiểm thử", "Dữ liệu nhập", "Kết quả mong đợi"], [
  ["Tìm từ khóa rỗng", "Ô tìm kiếm trống, bấm Tìm kiếm", "Hiện toàn bộ sản phẩm hoặc gợi ý nhập từ khóa"],
  ["Tìm không dấu", "'ao thun' (sản phẩm 'Áo thun' có tồn tại)", "Vẫn trả về sản phẩm 'Áo thun'"],
  ["Tìm hoa/thường", "'ÁO THUN' và 'áo thun'", "Trả về cùng một tập kết quả"],
  ["Lọc khoảng giá hợp lệ", "Từ 100.000đ đến 500.000đ", "Chỉ hiện sản phẩm trong khoảng giá"],
  ["Lọc khoảng giá min > max", "Từ 500.000đ đến 100.000đ", "Báo lỗi khoảng giá không hợp lệ"],
  ["Kết hợp lọc + sắp xếp + trang 2", "Danh mục + giá + 'Giá tăng dần' + Trang 2", "Kết quả đúng bộ lọc, đúng thứ tự, đúng trang"],
], { accent: "#0891b2", note: "Mỗi ca cần ghi rõ Expected trước khi thực hiện để dễ so sánh với Actual." });

// ── Mockup 4: màn hình kết quả rỗng khi tìm không dấu ──
const m_empty = browser("shopeasy.vn/san-pham?tu-khoa=ao+thun", [
  panel("ShopEasy · Kết quả tìm kiếm", [
    field(24, 20, 500, "Tìm kiếm sản phẩm", "ao thun", "normal"),
    btn(540, 42, 176, "Tìm kiếm", "primary"),
    `<text x="24" y="130" font-size="34" fill="#94a3b8">🔍</text>`,
    `<text x="70" y="128" font-size="15" font-weight="800" fill="#334155">Không tìm thấy sản phẩm nào phù hợp</text>`,
    `<text x="70" y="150" font-size="12" fill="#64748b">Từ khóa: "ao thun" — 0 kết quả</text>`,
    annotate(20, 100, 596, 66, "BUG: 'ao thun' (không dấu) ra 0 kết quả dù 'Áo thun' đang được bán"),
  ].join(""), { h: 220, accent: "#ef4444" }),
].join(""), { h: 276, title: "ShopEasy · TMĐT", accent: "#ef4444" });

// ── Mockup 5: ticket Jira lỗi bộ lọc khoảng giá min > max không báo lỗi ──
const m_jira = jira({
  key: "SE-11330", title: "Bộ lọc giá: nhập 'Từ' = 500.000đ, 'Đến' = 100.000đ vẫn áp dụng được, không báo lỗi",
  type: "Bug", status: "New", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Vào trang Danh sách sản phẩm 2) Nhập Giá từ = 500.000, Giá đến = 100.000 3) Bấm Áp dụng bộ lọc"],
    ["Kết quả mong đợi", "Hệ thống báo 'Khoảng giá không hợp lệ', không cho áp dụng"],
    ["Kết quả thực tế", "Không báo lỗi, hệ thống trả về toàn bộ sản phẩm (bỏ qua bộ lọc)"],
    ["Bằng chứng", "video-se11330.mp4, screenshot-khoang-gia-loi.png"],
  ],
});

// ── Mockup 6: dashboard tỉ lệ lỗi tìm được qua kiểm thử tìm kiếm/lọc ──
const m_dash = dashboard("Lỗi tìm được: kiểm thử tìm kiếm & bộ lọc — Sprint 20", [
  { label: "Tổng lỗi", value: "16", sub: "sprint này", color: "#0891b2" },
  { label: "Lỗi ô tìm kiếm", value: "9", sub: "không dấu, rỗng, hoa/thường", color: "#7c3aed" },
  { label: "Lỗi bộ lọc", value: "7", sub: "khoảng giá, kết hợp lọc+sắp xếp", color: "#e11d48" },
  { label: "Mức High/Critical", value: "6", sub: "chủ yếu ở bộ lọc giá", color: "#f97316" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vì sao cần test tìm kiếm không dấu tiếng Việt?",
  "Why do you need to test Vietnamese non-diacritic search?",
  "Vì rất nhiều người dùng Việt Nam gõ tìm kiếm không dấu do gõ vội hoặc dùng bàn phím không hỗ trợ dấu, đặc biệt trên di động. Nếu hệ thống không chuẩn hoá (normalize) dữ liệu trước khi so khớp, tìm 'ao thun' sẽ ra 0 kết quả dù sản phẩm 'Áo thun' đang tồn tại — khiến khách hàng tưởng shop không bán mặt hàng đó và rời đi, gây mất doanh thu trực tiếp dù lỗi chỉ nằm ở khâu tìm kiếm.",
  "Because many Vietnamese users type search terms without diacritics, either typing fast or using a keyboard without accent support, especially on mobile. If the system doesn't normalize data before matching, searching 'ao thun' returns 0 results even though the product 'Áo thun' exists — making the customer think the shop doesn't sell it and leave, causing a direct revenue loss even though the bug is only in search.",
  "なぜベトナム語の声調記号なし検索をテストする必要があるの？",
  "多くのベトナム人ユーザーが、急いで入力したり声調記号に対応しないキーボード（特にモバイル）を使ったりするため、声調記号なしで検索するからです。システムが照合前にデータを正規化していないと、『Áo thun（アオ・トゥン）』という商品があっても『ao thun』で検索すると0件になり、顧客はその商品を扱っていないと誤解して離脱し、検索だけのバグでも直接の売上損失につながります。");
const faq2 = FAQ(
  "Bộ lọc khoảng giá cần kiểm tra những trường hợp nào?",
  "What cases should a price-range filter be tested with?",
  "Cần kiểm tra cả giá trị hợp lệ (Từ nhỏ hơn Đến, có sản phẩm trong khoảng) và các ca âm: Từ lớn hơn Đến (min > max), chỉ nhập một trong hai ô, nhập số âm hoặc chữ vào ô giá, khoảng giá không có sản phẩm nào (kết quả rỗng), và giá trị biên đúng bằng giá thấp nhất/cao nhất đang có trong hệ thống. Đặc biệt, trường hợp min > max rất dễ bị bỏ sót vì trông như một ca 'hiếm khi người dùng làm', nhưng thực tế người dùng bấm nhầm hai ô khá thường xuyên.",
  "You should test both valid values (Min less than Max, with products in range) and negative cases: Min greater than Max, only one of the two fields filled in, entering a negative number or letters into the price field, a price range with zero matching products, and boundary values exactly equal to the lowest/highest price currently in the system. In particular, the min > max case is easy to overlook because it looks like something 'users rarely do', but in reality users mix up the two fields fairly often.",
  "価格範囲フィルターはどんなケースをテストすべき？",
  "有効な値（最小値が最大値より小さく、範囲内に商品がある）だけでなく、ネガティブケースもテストすべきです：最小値が最大値より大きい（min > max）、片方の項目しか入力しない、価格欄に負の数や文字を入力する、該当商品がゼロ件になる価格範囲、そしてシステム上の最安値・最高値ちょうどの境界値。特にmin > maxのケースは『ユーザーが滅多にしないこと』に見えて見落とされがちですが、実際には2つの項目を入れ違えるユーザーは少なくありません。");
const faq3 = FAQ(
  "Kết hợp lọc + sắp xếp + phân trang cần chú ý gì khi test?",
  "What should you watch for when testing filter + sort + pagination together?",
  "Điểm dễ lộ lỗi nhất là khi ba tính năng này chạy CÙNG LÚC: áp bộ lọc, chọn sắp xếp, rồi chuyển sang trang 2 — nếu đổi bộ lọc mà hệ thống không tự quay về trang 1, người dùng có thể thấy trang trống hoặc dữ liệu sai. Cần kiểm tra: đổi bộ lọc có reset về trang 1 không, thứ tự sắp xếp có giữ nguyên khi chuyển trang không, tổng số trang có cập nhật đúng theo số kết quả sau khi lọc không, và trang cuối cùng có hiển thị đúng số sản phẩm còn lại (không bị lặp hoặc thiếu) không.",
  "The trickiest bugs surface when all three features run TOGETHER: apply a filter, pick a sort order, then move to page 2 — if changing the filter doesn't reset the page back to 1, the user may see an empty page or wrong data. You should check: does changing the filter reset to page 1, does the sort order persist across pages, does the total page count update correctly based on the filtered result count, and does the last page show the correct remaining items (no duplicates or missing items).",
  "フィルター＋並び替え＋ページネーションを組み合わせてテストする際の注意点は？",
  "最もバグが出やすいのは3つの機能を同時に使う場合です：フィルターを適用し、並び順を選び、2ページ目に移動する——フィルターを変更してもページが1ページ目にリセットされないと、空白のページや誤ったデータが表示されることがあります。確認すべき点：フィルター変更で1ページ目にリセットされるか、ページ移動時に並び順が維持されるか、フィルター後の結果数に応じて総ページ数が正しく更新されるか、最終ページに残りの商品が正しく表示される（重複や欠落がない）か。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao cần test ô tìm kiếm với từ khóa RỖNG (không nhập gì rồi bấm Tìm kiếm)?", en: "Why test the search box with an EMPTY keyword (click Search with nothing typed)?", ja: "検索欄に何も入力せず『検索』を押す（空のキーワード）テストが必要な理由は？" },
    options: [
      { vi: "Để xác nhận hệ thống xử lý hợp lý (hiện toàn bộ sản phẩm hoặc yêu cầu nhập từ khóa), không bị lỗi/crash", en: "To confirm the system handles it sensibly (show all products or ask for a keyword), without erroring/crashing", ja: "システムが妥当に処理する（全商品表示またはキーワード入力を促す）か、エラーやクラッシュしないかを確認するため" },
      { vi: "Vì từ khóa rỗng luôn là lỗi nghiêm trọng nhất", en: "Because an empty keyword is always the most severe bug", ja: "空のキーワードは常に最も重大なバグだから" },
      { vi: "Vì không cần test trường hợp này", en: "Because this case doesn't need testing", ja: "このケースはテスト不要だから" },
      { vi: "Để kiểm tra tốc độ tải trang", en: "To check page load speed", ja: "ページの読み込み速度を確認するため" },
    ], correct: 0,
    explain: { vi: "Từ khóa rỗng là ca biên dễ bị bỏ sót; cần xác nhận hệ thống có hành vi rõ ràng, không lỗi.", en: "An empty keyword is an easily-missed edge case; you must confirm the system behaves predictably without errors.", ja: "空のキーワードは見落としやすい境界ケースで、システムがエラーなく明確に動作するか確認する必要があります。" },
  }),
  mcq({
    q: { vi: "Sản phẩm 'Áo thun' đang được bán. Người dùng gõ 'ao thun' (không dấu) để tìm, hệ thống trả về 0 kết quả. Đây là hiện tượng gì?", en: "Product 'Áo thun' is on sale. A user types 'ao thun' (no diacritics) to search, and the system returns 0 results. What is this?", ja: "商品『Áo thun』が販売中。ユーザーが声調記号なしの『ao thun』で検索すると0件になった。これは何を示す？" },
    options: [
      { vi: "Hành vi bình thường, không cần quan tâm", en: "Normal behavior, nothing to worry about", ja: "正常な挙動で気にする必要はない" },
      { vi: "Lỗi tìm kiếm: hệ thống chưa chuẩn hoá dữ liệu để so khớp không dấu", en: "A search bug: the system hasn't normalized data to match non-diacritic input", ja: "検索バグ：声調記号なしの照合のためデータが正規化されていない" },
      { vi: "Do sản phẩm đã hết hàng", en: "Because the product is out of stock", ja: "商品が在庫切れだから" },
      { vi: "Do người dùng nhập sai tên sản phẩm", en: "Because the user typed the wrong product name", ja: "ユーザーが商品名を間違えて入力したから" },
    ], correct: 1,
    explain: { vi: "Khi từ khóa không dấu của một sản phẩm CÓ THẬT ra 0 kết quả, đó là lỗi chuẩn hoá dữ liệu tìm kiếm, không phải hành vi bình thường.", en: "When a non-diacritic keyword for a REAL product returns 0 results, that's a search-normalization bug, not normal behavior.", ja: "実在する商品の声調記号なしキーワードが0件になるのは、検索の正規化バグであり正常な挙動ではありません。" },
  }),
  mcq({
    q: { vi: "Ca kiểm thử nào hợp lý để test bộ lọc khoảng giá?", en: "Which is a reasonable test case for the price-range filter?", ja: "価格範囲フィルターに適切なテストケースはどれ？" },
    options: [
      { vi: "Chỉ test khi Từ nhỏ hơn Đến, không cần test trường hợp khác", en: "Only test when Min is less than Max, no need for other cases", ja: "最小値が最大値より小さい場合だけテストし、他のケースは不要" },
      { vi: "Nhập Giá từ = 500.000đ, Giá đến = 100.000đ (min > max) để xem hệ thống có báo lỗi không", en: "Enter Min = 500,000đ, Max = 100,000đ (min > max) to see if the system reports an error", ja: "最小値＝500,000đ、最大値＝100,000đ（min > max）を入力しシステムがエラーを出すか確認する" },
      { vi: "Không cần test bộ lọc giá vì ít khi có lỗi", en: "No need to test the price filter since it rarely has bugs", ja: "めったにバグが出ないので価格フィルターはテスト不要" },
      { vi: "Chỉ test bằng cách nhìn giao diện, không cần bấm Áp dụng", en: "Only test by looking at the UI, no need to click Apply", ja: "UIを見るだけでテストし、『適用』は押さなくてよい" },
    ], correct: 1,
    explain: { vi: "Ca min > max là ca âm quan trọng cho bộ lọc khoảng giá, dễ bị người dùng bấm nhầm và dễ bị đội dev bỏ sót khi validate.", en: "The min > max case is an important negative case for a price-range filter, one users often mix up and developers often forget to validate.", ja: "min > maxは価格範囲フィルターの重要なネガティブケースで、ユーザーが入れ違えやすく、開発側もバリデーションを忘れがちです。" },
  }),
  mcq({
    q: { vi: "Khi kết hợp lọc + sắp xếp + phân trang, lỗi nào hay gặp nhất?", en: "When combining filter + sort + pagination, which bug is most common?", ja: "フィルター＋並び替え＋ページネーションを組み合わせた時、最もよくあるバグは？" },
    options: [
      { vi: "Đổi bộ lọc nhưng hệ thống không quay về trang 1, khiến trang hiện tại trống hoặc dữ liệu sai", en: "Changing the filter but the system doesn't reset to page 1, leaving the current page empty or with wrong data", ja: "フィルターを変更してもページが1ページ目にリセットされず、現在のページが空白または誤ったデータになる" },
      { vi: "Trang web bị đổi màu giao diện", en: "The website's UI color scheme changes", ja: "ウェブサイトの配色が変わる" },
      { vi: "Nút Tìm kiếm bị ẩn đi", en: "The Search button gets hidden", ja: "検索ボタンが非表示になる" },
      { vi: "Không có lỗi nào cần quan tâm khi kết hợp 3 tính năng này", en: "No bugs need attention when combining these 3 features", ja: "この3つの機能を組み合わせても気にすべきバグはない" },
    ], correct: 0,
    explain: { vi: "Đây là lỗi rất phổ biến: đổi điều kiện lọc mà không reset phân trang khiến người dùng thấy trang trống hoặc kết quả không khớp bộ lọc mới.", en: "This is a very common bug: changing filter conditions without resetting pagination leaves users seeing an empty page or results that don't match the new filter.", ja: "非常によくあるバグです：フィルター条件を変えてもページネーションがリセットされず、空のページや新しいフィルターに合わない結果が表示されます。" },
  }),
  mcq({
    q: { vi: "Tìm 'ÁO THUN' (viết hoa toàn bộ) và 'áo thun' (viết thường) nên cho kết quả thế nào để được xem là ĐÚNG?", en: "Searching 'ÁO THUN' (all caps) and 'áo thun' (lowercase) should give what result to be considered CORRECT?", ja: "『ÁO THUN』（全て大文字）と『áo thun』（小文字）で検索した場合、正しいと見なされる結果は？" },
    options: [
      { vi: "Ra hai tập kết quả khác nhau hoàn toàn", en: "Two completely different result sets", ja: "全く異なる2つの結果セット" },
      { vi: "Chỉ 'áo thun' viết thường mới có kết quả, còn lại 0 kết quả", en: "Only lowercase 'áo thun' returns results, the other returns 0", ja: "小文字の『áo thun』のみ結果があり、他方は0件" },
      { vi: "Cả hai đều trả về cùng một tập kết quả (không phân biệt hoa/thường)", en: "Both should return the same result set (case-insensitive)", ja: "両方とも同じ結果セットを返す（大文字小文字を区別しない）" },
      { vi: "Cả hai đều báo lỗi hệ thống", en: "Both should show a system error", ja: "両方ともシステムエラーを表示する" },
    ], correct: 2,
    explain: { vi: "Tìm kiếm chuẩn cần không phân biệt hoa/thường (case-insensitive); người dùng thật gõ hoa/thường lẫn lộn rất phổ biến.", en: "A proper search should be case-insensitive; real users frequently mix uppercase and lowercase.", ja: "適切な検索は大文字小文字を区別すべきではありません。実際のユーザーは大文字・小文字を混在させてよく入力します。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử tìm kiếm & bộ lọc là việc kiểm tra ô tìm kiếm (từ khóa rỗng, ký tự đặc biệt, không dấu, hoa/thường, kết quả rỗng) và bộ lọc (nhiều điều kiện, khoảng giá, kết hợp với sắp xếp và phân trang) có hoạt động đúng không. Bài này bám trang danh sách sản phẩm của app TMĐT ShopEasy: bạn học cách nghĩ ca kiểm thử cho ô search, phát hiện lỗi thật (tìm không dấu ra 0 kết quả, lọc giá min > max không báo lỗi), và cách test khi lọc + sắp xếp + phân trang chạy cùng lúc. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Search and filter testing means checking whether the search box (empty keyword, special characters, no diacritics, case sensitivity, empty results) and the filter (multiple conditions, price range, combined with sort and pagination) work correctly. This follows the product listing page of the ShopEasy e-commerce app: you'll learn to think up test cases for the search box, find real bugs (non-diacritic search returning 0 results, a min > max price filter not raising an error), and how to test when filter + sort + pagination run together. Lots of visuals and a quiz at the end.",
        "検索＆フィルターのテストとは、検索欄（空のキーワード、特殊文字、声調記号なし、大文字小文字、結果ゼロ）とフィルター（複数条件、価格範囲、並び替え・ページネーションとの組み合わせ）が正しく動作するかを確認することです。本記事はECアプリShopEasyの商品一覧ページに沿い、検索欄のテストケースの考え方、実際のバグ（声調記号なし検索が0件になる、min > maxの価格フィルターがエラーを出さない）の発見、そしてフィルター＋並び替え＋ページネーションを同時にテストする方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Ô tìm kiếm và bộ lọc trông có vẻ đơn giản — chỉ là gõ chữ rồi bấm nút — nhưng đây lại là nơi ẩn giấu rất nhiều lỗi mà người dùng thật gặp phải hằng ngày. Họ gõ vội không dấu, gõ nhầm hoa/thường, hoặc chọn khoảng giá ngược mà không để ý. Nếu bạn chỉ test đúng một từ khóa 'đẹp' rồi kết luận 'tìm kiếm chạy tốt', bạn đang bỏ sót đúng những tình huống khiến khách hàng bực mình rời trang. Chúng ta sẽ học qua trang danh sách sản phẩm thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! The search box and filters look simple — just type and click — but this is exactly where many bugs that real users face daily hide. They type quickly without diacritics, mix up upper/lowercase, or pick a reversed price range without noticing. If you only test one 'clean' keyword and conclude 'search works fine', you're missing exactly the situations that make customers frustrated and leave. We'll learn through ShopEasy's real product listing page, with visuals and hands-on practice.",
        "こんにちは、初心者さん！検索欄とフィルターは、文字を入力してボタンを押すだけの単純なものに見えますが、実際のユーザーが日々遭遇する多くのバグが潜む場所です。急いで声調記号なしで入力したり、大文字小文字を間違えたり、気付かずに逆の価格範囲を選んだりします。『きれいな』キーワード1つだけをテストして『検索は問題ない』と結論づけると、顧客をイライラさせて離脱させる状況をまさに見逃してしまいます。実際のShopEasyの商品一覧ページを通じて、図と実習付きで学びます。"),
      IMG(m_search, "Màn hình test: trang danh sách sản phẩm ShopEasy với ô tìm kiếm và bộ lọc", "Screen under test: ShopEasy product listing page with search box and filters", "テスト対象画面：検索欄とフィルターがあるShopEasy商品一覧ページ"),
      DEF("Search & Filter Testing", "kiểm thử ô tìm kiếm và các điều kiện lọc để xác nhận hệ thống trả về đúng, đủ kết quả với mọi kiểu dữ liệu nhập, kể cả dữ liệu bất thường.",
        "testing the search box and filter conditions to confirm the system returns correct, complete results for every kind of input, including unusual input.",
        "検索欄とフィルター条件をテストし、あらゆる種類の入力（異常な入力を含む）に対してシステムが正しく完全な結果を返すか確認する手法。"),
    ] },
  { heading: { vi: "2. Vì sao ô tìm kiếm dễ ẩn lỗi mà người mới hay bỏ sót", en: "2. Why the search box hides bugs beginners often miss", ja: "2. なぜ検索欄には初心者が見落としやすいバグが潜むのか" },
    blocks: [
      P("Ô tìm kiếm nhận MỌI kiểu dữ liệu người dùng gõ vào — không có định dạng cố định như ô 'Email' hay 'Số điện thoại'. Chính vì tự do như vậy, ô tìm kiếm dễ bị lập trình viên chỉ test với một vài từ khóa 'đẹp' (đúng chính tả, có dấu, viết thường) rồi coi là xong, trong khi người dùng thật gõ rất đa dạng: không dấu, viết hoa, thừa khoảng trắng, dán nhầm ký tự lạ.",
        "The search box accepts EVERY kind of data a user types — it has no fixed format like an 'Email' or 'Phone number' field. Precisely because of this freedom, developers often only test with a few 'clean' keywords (correctly spelled, with diacritics, lowercase) and call it done, while real users type very differently: no diacritics, uppercase, extra spaces, accidentally pasted stray characters.",
        "検索欄はユーザーが入力するあらゆる種類のデータを受け付けます——『メール』や『電話番号』のような固定フォーマットがありません。この自由度の高さゆえ、開発者は数個の『きれいな』キーワード（正しい綴り、声調記号あり、小文字）だけでテストして完了とみなしがちですが、実際のユーザーの入力は多様です：声調記号なし、大文字、余分な空白、誤って貼り付けた不審な文字など。"),
      P("Hậu quả là: ô tìm kiếm thường 'chạy đẹp' trên demo nhưng gãy ngay khi khách hàng thật gõ theo thói quen của họ. Đây là lý do vì sao kiểm thử tìm kiếm luôn cần một bộ ca đa dạng, không chỉ một từ khóa mẫu — và vì sao đây cũng là kỹ năng nền tảng rất được đánh giá cao ở một tester mới vào nghề.",
        "The result: the search box often 'looks fine' in demos but breaks the moment a real customer types the way they normally do. This is why search testing always needs a diverse set of cases, not just one sample keyword — and why it's a foundational skill highly valued in a junior tester.",
        "その結果、検索欄はデモでは『きれいに動く』ように見えても、実際の顧客が普段通りに入力した瞬間に壊れることがよくあります。これが、検索テストには1つのサンプルキーワードだけでなく多様なケースの一式が常に必要な理由であり、新人テスターにとって高く評価される基礎スキルである理由です。"),
      IMG(m_technique, "Các kỹ thuật kiểm thử ô tìm kiếm, minh hoạ trên ShopEasy", "Search-box testing techniques, illustrated on ShopEasy", "検索欄のテスト技法、ShopEasyで例示"),
      DEF("Chuẩn hoá dữ liệu (Normalize)", "bước hệ thống xử lý từ khóa (bỏ dấu, hạ chữ thường, cắt khoảng trắng thừa) trước khi so khớp với dữ liệu sản phẩm, để tìm kiếm không bị lệ thuộc vào cách gõ.",
        "the step where the system processes a keyword (removing diacritics, lowercasing, trimming extra spaces) before matching it against product data, so search doesn't depend on exact typing style.",
        "検索語（声調記号除去、小文字化、余分な空白の削除）を商品データと照合する前にシステムが処理する工程。入力方法に依存しない検索を実現する。"),
    ] },
  { heading: { vi: "3. Kiểm thử ô tìm kiếm: các ca người mới cần nắm", en: "3. Testing the search box: cases beginners must know", ja: "3. 検索欄のテスト：初心者が押さえるべきケース" },
    blocks: [
      P("Trước khi viết ca kiểm thử cụ thể, hãy nắm 5 nhóm ca quan trọng nhất cho MỌI ô tìm kiếm: (1) từ khóa rỗng, (2) từ khóa không dấu, (3) hoa/thường lẫn lộn, (4) ký tự đặc biệt, (5) từ khóa hợp lệ nhưng không có sản phẩm nào khớp (kết quả rỗng hợp lệ). Mỗi nhóm kiểm tra một khía cạnh khác nhau của cùng một ô nhập.",
        "Before writing specific test cases, learn the 5 most important case groups for ANY search box: (1) empty keyword, (2) non-diacritic keyword, (3) mixed uppercase/lowercase, (4) special characters, (5) a valid keyword with no matching product (a legitimately empty result). Each group checks a different aspect of the same input field.",
        "具体的なテストケースを書く前に、あらゆる検索欄に共通する最も重要な5つのケースグループを押さえましょう：(1)空のキーワード、(2)声調記号なしキーワード、(3)大文字小文字混在、(4)特殊文字、(5)有効なキーワードだが該当商品がない（正当な空の結果）。各グループは同じ入力項目の異なる側面を検証します。"),
      P("Điểm khác biệt quan trọng cần phân biệt rõ: 'kết quả rỗng hợp lệ' (tìm 'máy bay phản lực' trên ShopEasy — đúng là không bán, 0 kết quả là ĐÚNG) khác hoàn toàn với 'kết quả rỗng do lỗi' (tìm 'ao thun' không dấu ra 0 kết quả dù 'Áo thun' có bán — đây là BUG). Người mới rất dễ nhầm hai trường hợp này, nên khi thấy 0 kết quả, luôn tự hỏi: 'Sản phẩm này có thật sự không tồn tại, hay hệ thống tìm sai?'",
        "An important distinction to make: a 'legitimately empty result' (searching 'jet plane' on ShopEasy — genuinely not sold, so 0 results is CORRECT) is completely different from an 'empty result due to a bug' (searching non-diacritic 'ao thun' returns 0 results even though 'Áo thun' is sold — this is a BUG). Beginners easily confuse the two, so whenever you see 0 results, always ask: 'Does this product genuinely not exist, or did the system search incorrectly?'",
        "重要な区別：『正当な空の結果』（ShopEasyで『ジェット機』を検索——実際に販売していないので0件は正しい）と『バグによる空の結果』（声調記号なしの『ao thun』で検索すると『Áo thun』が販売中でも0件になる——これはバグ）は全く異なります。初心者はこの2つを混同しがちなので、0件を見たら常に自問しましょう：『この商品は本当に存在しないのか、それともシステムの検索が間違っているのか？』"),
      IMG(m_testcase, "Bảng ca kiểm thử tìm kiếm & bộ lọc trên trang sản phẩm ShopEasy", "A table of search & filter test cases on the ShopEasy product page", "ShopEasy商品ページの検索＆フィルターテストケース表"),
    ] },
  { heading: { vi: "4. Chuẩn bị: cách nghĩ ca kiểm thử tìm kiếm & bộ lọc", en: "4. Prepare: how to think up search & filter test cases", ja: "4. 準備：検索＆フィルターのテストケースの考え方" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần một quy trình nghĩ ca có thứ tự, để không bỏ sót góc nào khi test một ô tìm kiếm hoặc bộ lọc bất kỳ.",
        "You don't need special tools — just an ordered thinking process, so you don't miss any angle when testing any search box or filter.",
        "特別なツールは不要です——どんな検索欄やフィルターに対しても見落としを防ぐ、順序立てた考え方があれば十分です。"),
      STEP(1, "Mở trang có ô tìm kiếm/bộ lọc (ví dụ trang Danh sách sản phẩm ShopEasy); ghi lại các trường: ô search, danh mục, khoảng giá, sắp xếp, phân trang.", "Open the page with the search box/filter (e.g. ShopEasy's Product listing page); note the fields: search box, category, price range, sort, pagination.", "検索欄/フィルターがあるページ（例：ShopEasy商品一覧ページ）を開き、項目（検索欄、カテゴリ、価格範囲、並び替え、ページネーション）を記録する。"),
      STEP(2, "Với ô tìm kiếm, áp lần lượt: rỗng, không dấu, hoa/thường, ký tự đặc biệt, khoảng trắng thừa, từ khóa không tồn tại.", "For the search box, apply in turn: empty, non-diacritic, upper/lowercase, special characters, extra whitespace, a non-existent keyword.", "検索欄には、空欄、声調記号なし、大文字小文字、特殊文字、余分な空白、存在しないキーワードを順に適用する。"),
      STEP(3, "Với bộ lọc, áp lần lượt: 1 điều kiện, nhiều điều kiện cùng lúc, khoảng giá hợp lệ, khoảng giá min > max, khoảng giá không có kết quả.", "For the filter, apply in turn: 1 condition, multiple conditions at once, a valid price range, a min > max price range, a price range with no results.", "フィルターには、1条件、複数条件の同時適用、有効な価格範囲、min > maxの価格範囲、結果がない価格範囲を順に適用する。"),
      STEP(4, "Cuối cùng, kết hợp lọc + sắp xếp + chuyển trang để kiểm tra ba tính năng có 'sống chung' đúng không, không chỉ test riêng lẻ từng cái.", "Finally, combine filter + sort + page navigation to check whether the three features 'coexist' correctly, not just testing each in isolation.", "最後に、フィルター＋並び替え＋ページ移動を組み合わせ、3つの機能が個別だけでなく『共存』して正しく動くか確認する。"),
      TRY("Mở bất kỳ app TMĐT nào bạn dùng, thử gõ tìm kiếm không dấu một sản phẩm bạn biết chắc chắn có bán, xem có ra kết quả không.", "Open any e-commerce app you use, try searching without diacritics for a product you know for sure is sold, and see if results appear.", "使っているECアプリを開き、確実に販売されている商品を声調記号なしで検索し、結果が出るか確かめてみよう。"),
      PITFALL("Chỉ test tìm kiếm với ĐÚNG một từ khóa mẫu có dấu, viết thường, đúng chính tả rồi kết luận 'ô tìm kiếm chạy tốt'. Đây là ca dương duy nhất, chưa nói lên điều gì về các ca khác.", "Only testing search with EXACTLY one sample keyword — with diacritics, lowercase, correct spelling — then concluding 'the search box works fine'. That's a single positive case, and says nothing about the other cases.", "声調記号あり・小文字・正しい綴りの見本キーワード1つだけでテストし、『検索欄は問題ない』と結論づけること。それは1つのポジティブケースに過ぎず、他のケースについては何も分かりません。"),
      IMG(m_technique, "Nhắc lại các kỹ thuật kiểm thử ô tìm kiếm — dùng làm checklist", "Reminder of search-box testing techniques — use as a checklist", "検索欄のテスト技法の再確認 — チェックリストとして利用"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử tìm kiếm & bộ lọc từng bước (thực hành)", en: "5. Writing search & filter test cases step by step (hands-on)", ja: "5. 検索＆フィルターのテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào ô tìm kiếm và bộ lọc giá trên trang Danh sách sản phẩm ShopEasy — nơi rất dễ bị bỏ sót vì trông có vẻ đơn giản. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ.",
        "Now let's apply it for real to the search box and price filter on ShopEasy's Product listing page — an easy spot to overlook because it looks simple. Follow the order below to get a full set of test cases.",
        "では、ShopEasyの商品一覧ページにある検索欄と価格フィルターに実際に適用しましょう——見た目がシンプルなため見落としやすい箇所です。以下の順に沿って、完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca dương chuẩn trước: tìm 'áo thun' có dấu, đúng chính tả — sản phẩm 'Áo thun' phải hiện ra làm mốc so sánh.", "First define the standard positive case: search 'áo thun' with correct diacritics and spelling — the 'Áo thun' product must appear as the comparison baseline.", "まず標準的なポジティブケースを定義：正しい声調記号と綴りで『áo thun』を検索——『Áo thun』商品が表示されることを比較基準とする。"),
      STEP(2, "Áp kỹ thuật 'không dấu/hoa thường': thử 'ao thun', 'AO THUN', 'Ao Thun', so sánh với ca dương ở bước 1.", "Apply the 'no diacritics/case' technique: try 'ao thun', 'AO THUN', 'Ao Thun', and compare with the positive case from step 1.", "『声調記号なし/大文字小文字』の技法を適用：『ao thun』『AO THUN』『Ao Thun』を試し、ステップ1のポジティブケースと比較する。"),
      STEP(3, "Với bộ lọc giá, thử Từ=100.000/Đến=500.000 (hợp lệ), rồi đảo ngược thành Từ=500.000/Đến=100.000 (min > max).", "For the price filter, try Min=100,000/Max=500,000 (valid), then reverse it to Min=500,000/Max=100,000 (min > max).", "価格フィルターには、Min=100,000/Max=500,000（有効）を試し、次にMin=500,000/Max=100,000（min > max）と逆にする。"),
      STEP(4, "Với mỗi ca, ghi Expected (kết quả mong đợi) và Actual (điều thực sự xảy ra) riêng biệt, rồi so sánh.", "For each case, write Expected and Actual separately, then compare.", "各ケースでExpectedとActualを別々に記録し、比較する。"),
      CODE("text", "BO CA KIEM THU - o TIM KIEM va BO LOC GIA (trang san pham ShopEasy)\nCa 1: tim 'ao thun' (co dau)     | Expected: hien San pham 'Ao thun' | Actual: dung\nCa 2: tim 'ao thun' (khong dau)  | Expected: van hien 'Ao thun'     | Actual: 0 ket qua (BUG)\nCa 3: tim 'AO THUN' (viet hoa)   | Expected: cung ket qua nhu ca 1  | Actual: dung\nCa 4: loc gia Tu=100k Den=500k   | Expected: chi hien SP trong khoang | Actual: dung\nCa 5: loc gia Tu=500k Den=100k   | Expected: bao loi khoang gia sai | Actual: khong bao loi, tra ve tat ca SP (BUG)"),
      TRY("Viết thêm 1 ca kiểm thử nữa cho ô tìm kiếm ShopEasy mà bảng trên chưa có (gợi ý: tìm với dấu ngoặc hoặc dấu %, hoặc tìm với khoảng trắng thừa).", "Write one more search test case for ShopEasy not covered above (hint: search with brackets or % characters, or with extra whitespace).", "上の表にないShopEasy検索のテストケースをもう1つ書こう（ヒント：括弧や%記号での検索、または余分な空白での検索）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: tìm không dấu ra 0 kết quả dù sản phẩm có tồn tại", en: "6. Situation 1: non-diacritic search returns 0 results for an existing product", ja: "6. シーン1：声調記号なし検索で実在商品が0件になる" },
    blocks: [
      SITUATION("Đội chỉ test ô tìm kiếm với các từ khóa có dấu, đúng chính tả — mọi ca đều pass, ai cũng yên tâm release.", "The team only tests the search box with correctly-spelled, diacritic-marked keywords — every case passes, everyone feels safe to release.",
        "Lên production, một khách hàng dùng điện thoại cũ gõ 'ao thun' (không dấu) vì bàn phím gõ dấu chậm. Kết quả: 0 sản phẩm, dù ShopEasy đang bán hơn 40 mẫu áo thun. Khách hàng nghĩ shop không có hàng và chuyển sang mua ở đối thủ.",
        "In production, a customer using an old phone types 'ao thun' (no diacritics) because typing accents is slow on their keyboard. Result: 0 products, even though ShopEasy sells over 40 t-shirt styles. The customer assumes the shop has none and buys from a competitor instead.",
        "チームは声調記号があり正しい綴りのキーワードだけで検索欄をテスト——全ケース合格、安心してリリース。",
        "本番環境で、古い携帯電話を使う顧客が声調記号入力が遅いため『ao thun』（声調記号なし）で検索。結果：ShopEasyが40種類以上のTシャツを販売しているにもかかわらず0件。顧客は在庫がないと思い込み、競合他社で購入してしまう。"),
      SOLVE("Bổ sung bước chuẩn hoá từ khóa (bỏ dấu, hạ chữ thường, cắt khoảng trắng thừa) ở cả từ khóa người dùng nhập LẪN dữ liệu sản phẩm trước khi so khớp, không chỉ so khớp chuỗi nguyên văn.", "Add a keyword-normalization step (remove diacritics, lowercase, trim whitespace) for BOTH the user's typed keyword AND the product data before matching, instead of matching the raw string as-is.", "ユーザーが入力したキーワードと商品データの両方に対し、照合前にキーワード正規化（声調記号除去、小文字化、余分な空白の削除）のステップを追加し、生の文字列同士をそのまま照合しないようにする。"),
      P("Đây là bài học lớn nhất trong chương này: 'ca dương pass' không có nghĩa là ô tìm kiếm hoạt động tốt cho MỌI người dùng thật. Với riêng thị trường Việt Nam, việc gõ không dấu cực kỳ phổ biến, nên đây gần như là một 'ca bắt buộc' phải test cho mọi ô tìm kiếm, không phải một ca 'thêm cho vui'.",
        "This is the biggest lesson in this chapter: 'the positive case passing' doesn't mean the search box works well for EVERY real user. In the Vietnamese market specifically, typing without diacritics is extremely common, so this is nearly a 'mandatory case' to test for any search box, not an 'extra, nice-to-have' one.",
        "この章での最大の教訓です：『ポジティブケースの合格』は、あらゆる実際のユーザーに対して検索欄がうまく機能することを意味しません。特にベトナム市場では声調記号なしの入力が非常に一般的なため、これはどの検索欄でも『あればいい』ケースではなくほぼ『必須』のテストケースです。"),
      IMG(m_empty, "Màn hình kết quả rỗng khi tìm 'ao thun' không dấu, dù 'Áo thun' đang được bán", "Empty result screen when searching non-diacritic 'ao thun', even though 'Áo thun' is on sale", "『ao thun』（声調記号なし）検索で結果が0件になる画面。『Áo thun』は販売中にもかかわらず"),
      RECAP(["Ca dương pass KHÔNG đồng nghĩa ô tìm kiếm hoạt động tốt cho mọi người dùng thật", "Test không dấu tiếng Việt gần như là ca bắt buộc, không phải ca tuỳ chọn"],
        ["The positive case passing does NOT mean the search box works well for every real user", "Testing without Vietnamese diacritics is almost a mandatory case, not an optional one"],
        ["ポジティブケースの合格は、あらゆる実際のユーザーに対して検索欄がうまく機能することを意味しない", "声調記号なしのテストはオプションではなくほぼ必須のケース"]),
    ] },
  { heading: { vi: "7. Kiểm thử bộ lọc: nhiều điều kiện & khoảng giá", en: "7. Testing filters: multiple conditions & price ranges", ja: "7. フィルターのテスト：複数条件と価格範囲" },
    blocks: [
      P("Bộ lọc thường cho phép chọn NHIỀU điều kiện cùng lúc: danh mục, khoảng giá, thương hiệu, đánh giá sao... Ngoài việc test từng điều kiện riêng lẻ, bạn cần test khi CHÚNG KẾT HỢP với nhau — vì lỗi thường xuất hiện đúng ở phần logic 'gộp' các điều kiện lại, chứ không phải ở từng điều kiện đơn lẻ.",
        "Filters usually let users pick MULTIPLE conditions at once: category, price range, brand, star rating... Besides testing each condition individually, you need to test when they're COMBINED — because bugs often show up exactly in the logic that 'merges' conditions together, not in any single condition alone.",
        "フィルターは通常、カテゴリ、価格範囲、ブランド、星評価など複数の条件を同時に選べます。各条件を個別にテストするだけでなく、組み合わせた場合もテストする必要があります——バグは単一条件ではなく、条件を『統合』するロジックにこそ現れることが多いからです。"),
      P("Riêng bộ lọc khoảng giá cần chú ý đặc biệt vì nó có HAI ô liên quan tới nhau (Từ và Đến), khác với các ô lọc đơn lẻ như danh mục. Bất cứ khi nào có hai ô liên quan như vậy, hãy luôn nghĩ tới ca 'đảo ngược' (Từ lớn hơn Đến) — một kỹ thuật áp dụng được cho nhiều bộ lọc khoảng giá trị khác, như khoảng ngày, khoảng số lượng.",
        "The price-range filter needs special attention because it has TWO related fields (Min and Max), unlike single filters like category. Whenever there are two related fields like this, always think of the 'reversed' case (Min greater than Max) — a technique that applies to many other range filters too, like date ranges or quantity ranges.",
        "価格範囲フィルターは、カテゴリのような単一フィルターとは異なり、関連する2つの項目（最小値と最大値）があるため特に注意が必要です。このような関連する2項目がある場合は常に『逆転』ケース（最小値が最大値より大きい）を考えましょう——これは日付範囲や数量範囲など他の多くの範囲フィルターにも応用できる技法です。"),
      TIP("Khi test bộ lọc kết hợp nhiều điều kiện, luôn kiểm tra thêm: bấm 'Xoá bộ lọc' có trả về đúng trạng thái ban đầu không, và URL có phản ánh đúng bộ lọc đang áp dụng không (để người dùng chia sẻ link vẫn ra đúng kết quả).", "When testing filters with multiple combined conditions, also always check: does clicking 'Clear filters' correctly return to the initial state, and does the URL correctly reflect the currently applied filter (so a shared link still shows the right results)?", "複数条件を組み合わせたフィルターをテストする際は、『フィルターをクリア』を押すと正しく初期状態に戻るか、URLが現在適用中のフィルターを正しく反映しているか（共有リンクでも正しい結果が出るか）も必ず確認しましょう。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử bộ lọc giá 'min > max'", "A bug ticket found via the 'min > max' price-filter negative case", "『min > max』価格フィルターのネガティブケースで見つかったバグチケット"),
    ] },
  { heading: { vi: "8. Tình huống 2: lọc khoảng giá min > max không báo lỗi", en: "8. Situation 2: a min > max price filter doesn't raise an error", ja: "8. シーン2：min > maxの価格フィルターがエラーを出さない" },
    blocks: [
      SITUATION("Bạn thử nhập ngược hai ô giá trong bộ lọc: Giá từ = 500.000đ, Giá đến = 100.000đ, chỉ để xem điều gì xảy ra.", "You try reversing the two price fields in the filter: Price from = 500,000đ, Price to = 100,000đ, just to see what happens.",
        "Hệ thống không chặn, không báo lỗi khoảng giá không hợp lệ — mà âm thầm bỏ qua bộ lọc và trả về TOÀN BỘ sản phẩm, khiến khách hàng tưởng bộ lọc 'đã áp dụng' nhưng thực chất không lọc gì cả.",
        "The system doesn't block it, doesn't show an invalid-range error — it silently ignores the filter and returns ALL products, making the customer think the filter has 'been applied' when in fact nothing was filtered.",
        "フィルターの2つの価格項目を逆に入力してみる：価格（下限）＝500,000đ、価格（上限）＝100,000đ、何が起きるか確認するため。",
        "システムはブロックせず、無効な範囲というエラーも出さない——静かにフィルターを無視して全商品を返し、顧客はフィルターが『適用された』と思い込むが実際には何もフィルタリングされていない。"),
      SOLVE("Báo bug High (ảnh hưởng trải nghiệm mua sắm và niềm tin vào bộ lọc), đề xuất validate ngay khi người dùng nhập hoặc khi bấm Áp dụng: nếu Từ > Đến, hiện thông báo lỗi rõ ràng và không cho áp dụng, đồng thời bổ sung ca này vào bộ hồi quy.", "Report a High-severity bug (it affects the shopping experience and trust in the filter), propose validating as soon as the user enters values or clicks Apply: if Min > Max, show a clear error and don't allow applying, and add this case to the regression suite.", "Highバグとして報告（ショッピング体験とフィルターへの信頼に影響）し、ユーザーが値を入力した時または『適用』を押した時に即座にバリデーションするよう提案：最小値＞最大値なら明確なエラーを表示し適用させない。この件を回帰テストスイートにも追加する。"),
      P("Ví dụ này cho thấy vì sao ca kiểm thử âm cho bộ lọc khoảng giá lại quan trọng đến vậy: lỗi không gây crash, không hiện gì bất thường rõ ràng trên màn hình — nhưng lại âm thầm phá vỡ đúng chức năng chính của bộ lọc (thu hẹp kết quả), khiến khách hàng mất lòng tin dù không biết chính xác lỗi ở đâu.",
        "This example shows why the negative test case for a price-range filter matters so much: the bug doesn't crash anything, doesn't show anything obviously wrong on screen — but it silently breaks the filter's core function (narrowing results), eroding customer trust even though they can't pinpoint exactly what went wrong.",
        "この例は、価格範囲フィルターのネガティブテストケースがなぜこれほど重要かを示しています：バグはクラッシュを起こさず、画面上に明らかにおかしい表示もありません——しかし静かにフィルターの本来の機能（結果を絞り込む）を壊し、顧客は正確に何が悪いのか分からないまま信頼を失います。"),
      TRY("Nghĩ thêm một cặp ô 'liên quan tới nhau' khác trong app bạn dùng (ví dụ khoảng ngày đặt vé, khoảng số lượng) và đề xuất 1 ca kiểm thử 'đảo ngược' cho nó.", "Think of another pair of 'related' fields in an app you use (e.g. a booking date range, a quantity range) and propose one 'reversed' test case for it.", "使っているアプリの別の『関連する』項目ペア（例：予約日の範囲、数量の範囲）を考え、『逆転』テストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "9. Kết hợp lọc + sắp xếp + phân trang: lỗi hay gặp & mẹo", en: "9. Combining filter + sort + pagination: common bugs & tips", ja: "9. フィルター＋並び替え＋ページネーションの組み合わせ：よくあるバグとコツ" },
    blocks: [
      P("Ba tính năng lọc, sắp xếp và phân trang thường được test RIÊNG LẺ nhưng lại được người dùng thật SỬ DỤNG CÙNG LÚC gần như luôn luôn. Đây là lý do phần lớn lỗi 'khó tái hiện' trong báo cáo của khách hàng lại nằm ở chính điểm giao thoa này.",
        "The three features — filter, sort, and pagination — are usually tested SEPARATELY, but real users ALWAYS use them TOGETHER almost every time. This is why most 'hard to reproduce' bugs in customer reports live exactly at this intersection.",
        "フィルター、並び替え、ページネーションの3つの機能は通常個別にテストされますが、実際のユーザーはほぼ常にこれらを同時に使用します。そのため、顧客報告の中で『再現しにくい』バグの多くが、まさにこの交差点に存在するのです。"),
      PITFALL("Chỉ test 'lọc riêng', 'sắp xếp riêng', 'phân trang riêng' rồi coi như đã đủ, bỏ qua việc test khi cả ba chạy cùng lúc.", "Only testing 'filter alone', 'sort alone', 'pagination alone' and considering it enough, skipping the case where all three run together.", "『フィルター単独』『並び替え単独』『ページネーション単独』だけをテストして十分とみなし、3つが同時に動く場合をテストしないこと。"),
      PITFALL("Không kiểm tra việc đổi bộ lọc giữa chừng khi đang ở trang 2, 3 — dễ để lọt lỗi 'trang trống' hoặc dữ liệu cũ còn sót lại.", "Not checking what happens when changing the filter mid-way while on page 2 or 3 — easy to let 'empty page' bugs or leftover stale data slip through.", "2ページ目や3ページ目にいる状態でフィルターを途中変更した場合を確認しないこと——『空白ページ』バグや古いデータの残留を見逃しやすい。"),
      TIP("Với mọi kết hợp lọc + sắp xếp + phân trang, luôn thử đúng chuỗi thao tác: áp lọc → sắp xếp → sang trang 2 → đổi lại điều kiện lọc → kiểm tra trang có quay về trang 1 và dữ liệu có đúng không.", "For any filter + sort + pagination combination, always try this exact sequence: apply filter → sort → go to page 2 → change the filter again → check whether the page returns to page 1 and the data is correct.", "フィルター＋並び替え＋ページネーションのどの組み合わせでも、必ずこの順序で試そう：フィルター適用→並び替え→2ページ目に移動→フィルター条件を再変更→ページが1ページ目に戻りデータが正しいか確認する。"),
      IMG(m_dash, "Số liệu: lỗi tìm được qua kiểm thử tìm kiếm & bộ lọc trong một sprint của ShopEasy", "Metrics: bugs found via search & filter testing during a ShopEasy sprint", "指標：ShopEasyのスプリントで検索＆フィルターテストにより見つかったバグ"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử tìm kiếm & bộ lọc qua trang danh sách sản phẩm ShopEasy: các kỹ thuật cho ô tìm kiếm (rỗng, không dấu, hoa/thường, ký tự đặc biệt, kết quả rỗng hợp lệ vs kết quả rỗng do lỗi), cách test bộ lọc nhiều điều kiện và khoảng giá (đặc biệt ca 'đảo ngược' min > max), và hai tình huống thật cho thấy lỗi tìm kiếm/lọc tuy 'im lặng' nhưng ảnh hưởng trực tiếp tới doanh thu và niềm tin khách hàng. Bạn cũng biết cách test khi lọc + sắp xếp + phân trang kết hợp cùng lúc — nơi ẩn giấu nhiều lỗi khó tái hiện nhất.",
        "You just learned how to test search & filters through ShopEasy's product listing page: techniques for the search box (empty, non-diacritic, upper/lowercase, special characters, legitimately empty results vs buggy empty results), how to test multi-condition filters and price ranges (especially the 'reversed' min > max case), and two real situations showing that search/filter bugs are 'silent' yet directly hurt revenue and customer trust. You also learned to test when filter + sort + pagination combine — where the hardest-to-reproduce bugs hide.",
        "ShopEasyの商品一覧ページを通じて、検索＆フィルターのテスト方法を学びました：検索欄の技法（空欄、声調記号なし、大文字小文字、特殊文字、正当な空の結果 vs バグによる空の結果）、複数条件フィルターと価格範囲（特に『逆転』min > maxケース）のテスト方法、そして検索/フィルターのバグが『静か』でありながら売上と顧客の信頼に直接影響することを示す2つの実例。フィルター＋並び替え＋ページネーションを組み合わせた場合のテスト方法も学びました——最も再現しにくいバグが潜む場所です。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật phân vùng tương đương và giá trị biên để nghĩ ca kiểm thử có hệ thống hơn cho các ô nhập số/khoảng giá trị, cùng cách viết bug report chuẩn để báo cáo những gì bạn tìm được. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn equivalence partitioning and boundary value techniques to design more systematic test cases for numeric/range input fields, along with how to write a proper bug report for what you find. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、数値/範囲の入力項目に対してより体系的にテストケースを設計するための同値分割・境界値分析の技法と、見つけたバグを報告するための適切なバグレポートの書き方を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const TIMKIEM_01 = makeDoc({
  slug: "kiem-thu-tim-kiem-bo-loc-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử tìm kiếm",
  keywords: ["kiểm thử tìm kiếm", "test bộ lọc", "search testing", "filter testing", "kiểm thử tìm kiếm cho người mới"],
  coverLabel: "NGƯỜI MỚI · TÌM KIẾM & LỌC · TMĐT",
  crumb: "Kiểm thử tìm kiếm & bộ lọc (Search & Filter Testing)",
  metaTitle: { vi: "Kiểm thử tìm kiếm & bộ lọc cho người mới", en: "Search & filter testing for beginners", ja: "初心者向け検索＆フィルターテスト" },
  metaDescription: {
    vi: "Kiểm thử tìm kiếm & bộ lọc cho người mới: test ô tìm kiếm rỗng, không dấu, hoa/thường, bộ lọc khoảng giá trên ShopEasy, kèm ví dụ lỗi thật, hình minh hoạ và trắc nghiệm.",
    en: "Search and filter testing for beginners: test empty keywords, non-diacritics, case sensitivity, and price-range filters on ShopEasy, with real bug examples, visuals, and a quiz.",
    ja: "初心者向け検索＆フィルターテスト：ShopEasyで空のキーワード、声調記号なし、大文字小文字、価格範囲フィルターをテスト。実際のバグ例、図、クイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử tìm kiếm & bộ lọc cho người mới: từ ô search tới lọc giá, sắp xếp, phân trang (có trắc nghiệm)",
    en: "Search & filter testing for beginners: from the search box to price filters, sorting, pagination (with quiz)",
    ja: "初心者のための検索＆フィルターテスト：検索欄から価格フィルター、並び替え、ページネーションまで（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử ô tìm kiếm và bộ lọc qua app TMĐT ShopEasy. Các kỹ thuật cho ô search (rỗng, không dấu, hoa/thường, ký tự đặc biệt, kết quả rỗng), bộ lọc nhiều điều kiện và khoảng giá (ca min > max), kết hợp lọc + sắp xếp + phân trang, ví dụ lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to test the search box and filters through the ShopEasy e-commerce app. Techniques for the search box (empty, non-diacritic, upper/lowercase, special characters, empty results), multi-condition and price-range filters (the min > max case), combining filter + sort + pagination, real bug examples, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyで検索欄とフィルターのテストを学ぶ。検索欄の技法（空欄、声調記号なし、大文字小文字、特殊文字、空の結果）、複数条件と価格範囲のフィルター（min > maxケース）、フィルター＋並び替え＋ページネーションの組み合わせ、実際のバグ例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử tìm kiếm & bộ lọc", steps: [
    { name: "Liệt kê ô tìm kiếm và các điều kiện lọc", text: "Xác định ô search, danh mục, khoảng giá, sắp xếp, phân trang." },
    { name: "Áp các kỹ thuật cho ô tìm kiếm", text: "Rỗng, không dấu, hoa/thường, ký tự đặc biệt, khoảng trắng thừa." },
    { name: "Test bộ lọc kết hợp và ca đảo ngược min > max", text: "Nhiều điều kiện cùng lúc, khoảng giá hợp lệ/không hợp lệ." },
    { name: "Kết hợp lọc + sắp xếp + phân trang", text: "Kiểm tra đổi lọc có reset về trang 1, thứ tự và dữ liệu có đúng." },
  ] },
  pages,
});

export const MB_TIMKIEM_01 = [TIMKIEM_01];
