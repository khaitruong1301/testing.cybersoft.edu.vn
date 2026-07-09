// ============================================================================
// INTERVIEW6 — Bổ sung đợt: 3 câu / danh mục phỏng vấn = 12 câu.
// Danh mục: iv-manual, iv-automation, iv-playwright, iv-ai.
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật, katakana cho thuật ngữ).
// ============================================================================
export const DATA = [
  // ===================== iv-manual (3) — answers: 1,3,2 =====================
  { cat: "iv-manual",
    q: { vi: "Phỏng vấn hỏi: 「Phân biệt Severity và Priority của một bug」. Đâu là cách phân biệt đúng?",
        en: "The interviewer asks: distinguish a bug's Severity from its Priority. Which distinction is correct?",
        ja: "面接で「バグのSeverity(重大度)とPriority(優先度)を区別してください」と聞かれました。正しい区別はどれですか。" },
    options: [
      { vi: "Severity và Priority luôn bằng nhau, chỉ là hai tên gọi", en: "Severity and Priority are always equal, just two names", ja: "SeverityとPriorityは常に等しく、単なる二つの呼び方である" },
      { vi: "Severity là mức nghiêm trọng về mặt kỹ thuật/tác động; Priority là mức cần sửa gấp về mặt kinh doanh", en: "Severity is the technical/impact seriousness; Priority is how urgently the business needs it fixed", ja: "Severityは技術的な影響の深刻さ、Priorityはビジネス上どれだけ急いで修正すべきかを表す" },
      { vi: "Priority do tester quyết, Severity do khách hàng quyết, không liên quan tác động", en: "Priority is set by the tester, Severity by the customer, unrelated to impact", ja: "Priorityはテスター、Severityは顧客が決め、影響とは無関係である" },
      { vi: "Severity chỉ dùng cho web, Priority chỉ dùng cho mobile", en: "Severity is only for web, Priority only for mobile", ja: "Severityはウェブ専用、Priorityはモバイル専用である" }
    ],
    answer: 1,
    exp: { vi: "Severity phản ánh mức tác động kỹ thuật của lỗi (ví dụ crash = cao), còn Priority phản ánh mức khẩn cấp cần sửa theo góc nhìn kinh doanh. Chúng độc lập: một lỗi chính tả trên logo có thể Severity thấp nhưng Priority cao.", en: "Severity reflects the technical impact of a defect (e.g. a crash = high), while Priority reflects business urgency to fix. They are independent: a typo on the logo can be low Severity yet high Priority.", ja: "Severityは欠陥の技術的影響(例: クラッシュ=高)を、Priorityはビジネス上の修正の緊急度を表す。両者は独立で、ロゴの誤字はSeverityが低くてもPriorityが高いことがある。" } },

  { cat: "iv-manual",
    q: { vi: "Với ô mã giảm giá chấp nhận 4–8 ký tự, áp dụng phân vùng tương đương (equivalence partitioning) thì tối thiểu cần mấy nhóm và gồm những nhóm nào?",
        en: "For a discount-code field accepting 4–8 characters, applying equivalence partitioning, what is the minimal set of partitions?",
        ja: "4〜8文字を受け付ける割引コード欄に同値分割を適用する場合、最小限で必要な分割はどれですか。" },
    options: [
      { vi: "Chỉ một nhóm: chuỗi 6 ký tự", en: "Just one partition: a 6-character string", ja: "1つの分割のみ: 6文字の文字列" },
      { vi: "Không cần chia nhóm, cứ thử ngẫu nhiên là đủ", en: "No partitions needed, random trials suffice", ja: "分割は不要で、ランダムに試せば十分である" },
      { vi: "Mỗi độ dài từ 4 đến 8 là một ca kiểm thử bắt buộc riêng", en: "Every length from 4 to 8 is a separate mandatory case", ja: "4から8までの各長さがそれぞれ必須の別ケースである" },
      { vi: "Ba nhóm: dưới 4 (không hợp lệ), 4–8 (hợp lệ), trên 8 (không hợp lệ)", en: "Three partitions: below 4 (invalid), 4–8 (valid), above 8 (invalid)", ja: "3つの分割: 4未満(無効)、4〜8(有効)、8超(無効)" }
    ],
    answer: 3,
    exp: { vi: "Phân vùng tương đương chia miền đầu vào thành các nhóm mà mọi giá trị trong nhóm được xử lý như nhau; ở đây là 3 nhóm (quá ngắn, hợp lệ, quá dài). Chọn một đại diện mỗi nhóm là đủ, không cần thử mọi độ dài.", en: "Equivalence partitioning splits the input domain into groups treated the same; here three groups (too short, valid, too long). One representative per group suffices, no need to try every length.", ja: "同値分割は入力領域を同じ扱いを受けるグループに分ける。ここでは3グループ(短すぎ・有効・長すぎ)。各グループから代表を1つ選べば十分で、全長さを試す必要はない。" } },

  { cat: "iv-manual",
    q: { vi: "Đặc điểm nào KHÔNG phải là dấu hiệu của một test case tốt?",
        en: "Which characteristic is NOT a sign of a good test case?",
        ja: "良いテストケースの特徴として当てはまらないものはどれですか。" },
    options: [
      { vi: "Có điều kiện tiền đề, bước rõ ràng và kết quả mong đợi cụ thể", en: "Has preconditions, clear steps and a specific expected result", ja: "前提条件、明確な手順、具体的な期待結果がある" },
      { vi: "Có thể lặp lại và cho kết quả nhất quán khi chạy lại", en: "Is repeatable and gives consistent results on re-run", ja: "再現可能で、再実行時に一貫した結果を出す" },
      { vi: "Phụ thuộc vào kết quả của một test case khác và không nêu kết quả mong đợi", en: "Depends on another test case's outcome and states no expected result", ja: "他のテストケースの結果に依存し、期待結果を示さない" },
      { vi: "Truy vết được tới một yêu cầu/đặc tả cụ thể", en: "Is traceable to a specific requirement/specification", ja: "特定の要件・仕様まで追跡できる" }
    ],
    answer: 2,
    exp: { vi: "Test case tốt phải độc lập, có kết quả mong đợi rõ ràng, lặp lại được và truy vết tới yêu cầu. Việc phụ thuộc lẫn nhau và thiếu kết quả mong đợi khiến ca kiểm thử dễ vỡ và không thể đánh giá pass/fail.", en: "A good test case is independent, has a clear expected result, is repeatable and traceable to a requirement. Interdependence and a missing expected result make it fragile and impossible to judge pass/fail.", ja: "良いテストケースは独立し、明確な期待結果を持ち、再現可能で要件に追跡できる。相互依存や期待結果の欠如はケースを脆くし、合否判定を不可能にする。" } },

  // ===================== iv-automation (3) — answers: 0,2,1 =====================
  { cat: "iv-automation",
    q: { vi: "Theo mô hình 「kim tự tháp kiểm thử」 (test pyramid), tầng nào nên chiếm số lượng test nhiều nhất?",
        en: "According to the test pyramid, which layer should have the largest number of tests?",
        ja: "テストピラミッドによると、最も多くのテスト数を占めるべき層はどれですか。" },
    options: [
      { vi: "Unit test (đơn vị) ở đáy — nhanh, rẻ, ổn định", en: "Unit tests at the base — fast, cheap, stable", ja: "最下層のユニットテスト — 高速・低コスト・安定" },
      { vi: "UI/E2E test ở đỉnh — chậm và dễ gãy", en: "UI/E2E tests at the top — slow and brittle", ja: "最上層のUI/E2Eテスト — 低速で壊れやすい" },
      { vi: "Manual test — không nằm trong tự động hóa", en: "Manual tests — not part of automation", ja: "手動テスト — 自動化には含まれない" },
      { vi: "Performance test — cho mọi tính năng", en: "Performance tests — for every feature", ja: "全機能に対する性能テスト" }
    ],
    answer: 0,
    exp: { vi: "Kim tự tháp khuyến nghị nhiều unit test ở đáy (chạy nhanh, cô lập, dễ bảo trì), ít hơn ở tầng integration, và ít nhất ở tầng UI/E2E (chậm, đắt, dễ gãy). Cân bằng này giúp phản hồi nhanh và ổn định.", en: "The pyramid recommends many unit tests at the base (fast, isolated, maintainable), fewer integration tests, and the fewest UI/E2E tests (slow, costly, brittle). This balance yields fast, stable feedback.", ja: "ピラミッドは、最下層に多くのユニットテスト(高速・独立・保守容易)、中間に統合テスト、最上部に最少のUI/E2Eテスト(低速・高コスト・脆弱)を推奨する。この配分が高速で安定したフィードバックを生む。" } },

  { cat: "iv-automation",
    q: { vi: "Nguyên nhân phổ biến nhất gây ra 「flaky test」 (test lúc pass lúc fail không do lỗi thật) trong kiểm thử UI tự động là gì?",
        en: "What is the most common cause of flaky tests (passing/failing inconsistently without a real defect) in automated UI testing?",
        ja: "自動UIテストで「flakyテスト(本当の欠陥がないのに成功したり失敗したりする)」の最も一般的な原因は何ですか。" },
    options: [
      { vi: "Vì dùng ngôn ngữ lập trình có kiểu tĩnh", en: "Because a statically typed language is used", ja: "静的型付け言語を使っているから" },
      { vi: "Vì có quá nhiều comment trong mã test", en: "Because there are too many comments in the test code", ja: "テストコードにコメントが多すぎるから" },
      { vi: "Chờ cố định/không đồng bộ đúng với thời điểm phần tử sẵn sàng (dùng sleep cứng thay vì chờ tường minh theo điều kiện)", en: "Improper synchronization with element readiness (hard sleeps instead of explicit condition-based waits)", ja: "要素の準備完了との同期不備(条件に基づく明示的な待機ではなく固定のsleepを使う)" },
      { vi: "Vì đặt tên hàm test bằng tiếng Anh", en: "Because test functions are named in English", ja: "テスト関数を英語で命名しているから" }
    ],
    answer: 2,
    exp: { vi: "Flaky test thường bắt nguồn từ vấn đề đồng bộ thời gian: dùng sleep cứng hoặc không chờ đúng điều kiện khiến test chạy trước khi phần tử/dữ liệu sẵn sàng. Giải pháp là dùng chờ tường minh (explicit wait) theo trạng thái phần tử.", en: "Flaky tests usually stem from timing/synchronization: hard sleeps or missing condition waits let the test act before the element/data is ready. The fix is explicit waits based on element state.", ja: "flakyテストは通常タイミング/同期の問題に起因する。固定sleepや条件待機の欠如により、要素やデータが準備される前にテストが動く。解決策は要素状態に基づく明示的な待機である。" } },

  { cat: "iv-automation",
    q: { vi: "Lợi ích chính của mẫu thiết kế Page Object Model (POM) trong kiểm thử tự động là gì?",
        en: "What is the main benefit of the Page Object Model (POM) design pattern in test automation?",
        ja: "テスト自動化におけるPage Object Model(POM)デザインパターンの主な利点は何ですか。" },
    options: [
      { vi: "Làm cho test chạy nhanh hơn phần cứng vốn có", en: "Makes tests run faster than the hardware allows", ja: "ハードウェアの限界を超えてテストを高速化する" },
      { vi: "Tách locator/thao tác trang khỏi kịch bản test, giúp giảm trùng lặp và dễ bảo trì khi UI đổi", en: "Separates locators/page actions from test scripts, reducing duplication and easing maintenance when UI changes", ja: "ロケーターやページ操作をテストスクリプトから分離し、重複を減らしUI変更時の保守を容易にする" },
      { vi: "Loại bỏ hoàn toàn nhu cầu viết assertion", en: "Completely removes the need to write assertions", ja: "アサーションを書く必要を完全になくす" },
      { vi: "Tự động sửa bug trong mã sản phẩm", en: "Automatically fixes bugs in the product code", ja: "製品コードのバグを自動的に修正する" }
    ],
    answer: 1,
    exp: { vi: "POM đóng gói locator và hành vi của từng trang vào một lớp riêng; test chỉ gọi phương thức nghiệp vụ. Khi UI đổi, chỉ sửa page object một nơi thay vì sửa rải rác nhiều test — giảm trùng lặp, tăng khả năng bảo trì.", en: "POM encapsulates each page's locators and behavior in its own class; tests call business methods. When the UI changes, you edit the page object in one place instead of many tests — reducing duplication and improving maintainability.", ja: "POMは各ページのロケーターと振る舞いを専用クラスにカプセル化し、テストは業務メソッドを呼ぶだけになる。UI変更時は多数のテストではなくページオブジェクト1か所を直せばよく、重複を減らし保守性を高める。" } },

  // ===================== iv-playwright (3) — answers: 3,1,0 =====================
  { cat: "iv-playwright",
    q: { vi: "Trong Playwright, cơ chế 「auto-waiting」 và web-first assertion như expect(locator).toBeVisible() giúp giải quyết vấn đề gì?",
        en: "In Playwright, how do auto-waiting and web-first assertions like expect(locator).toBeVisible() help?",
        ja: "Playwrightの「自動待機(auto-waiting)」やexpect(locator).toBeVisible()のようなweb-firstアサーションは、何の問題を解決しますか。" },
    options: [
      { vi: "Chúng biên dịch mã test sang C để chạy nhanh hơn", en: "They compile test code to C for speed", ja: "テストコードをCにコンパイルして高速化する" },
      { vi: "Chúng thay thế nhu cầu có trình duyệt", en: "They remove the need for a browser", ja: "ブラウザの必要性をなくす" },
      { vi: "Chúng mã hóa dữ liệu test", en: "They encrypt test data", ja: "テストデータを暗号化する" },
      { vi: "Chúng tự chờ phần tử đạt trạng thái cần thiết và tự thử lại assertion tới khi đạt hoặc hết timeout, giảm mạnh flaky do timing", en: "They automatically wait for elements to reach the needed state and retry assertions until met or timed out, greatly reducing timing-based flakiness", ja: "要素が必要な状態に達するまで自動的に待ち、条件を満たすかタイムアウトするまでアサーションを再試行し、タイミング由来のflakyを大きく減らす" }
    ],
    answer: 3,
    exp: { vi: "Playwright tự động chờ phần tử actionable trước khi thao tác, và web-first assertion tự thử lại tới khi điều kiện đúng hoặc hết timeout. Nhờ đó tester ít phải thêm sleep thủ công và test ổn định hơn nhiều.", en: "Playwright auto-waits for elements to be actionable before acting, and web-first assertions auto-retry until the condition holds or times out. This means fewer manual sleeps and far more stable tests.", ja: "Playwrightは操作前に要素が操作可能になるまで自動的に待ち、web-firstアサーションは条件成立かタイムアウトまで自動再試行する。これにより手動sleepが減り、テストがはるかに安定する。" } },

  { cat: "iv-playwright",
    q: { vi: "Playwright khuyến nghị ưu tiên loại locator nào để test bền vững và gần với cách người dùng thực tương tác?",
        en: "Which kind of locator does Playwright recommend prioritizing for resilient, user-facing tests?",
        ja: "Playwrightは、堅牢で実利用者に近いテストのためにどの種類のロケーターを優先することを推奨していますか。" },
    options: [
      { vi: "XPath tuyệt đối bám theo cấu trúc DOM sâu", en: "Absolute XPath tied to deep DOM structure", ja: "深いDOM構造に依存した絶対XPath" },
      { vi: "Locator theo vai trò/nội dung người dùng thấy như getByRole, getByLabel, getByText", en: "User-facing role/content locators like getByRole, getByLabel, getByText", ja: "getByRole・getByLabel・getByTextなど、利用者が認識するロール/内容に基づくロケーター" },
      { vi: "Chỉ số vị trí phần tử cứng như phần tử thứ 7 trên trang", en: "Hard positional index such as the 7th element on the page", ja: "ページ上の7番目の要素のような固定的な位置インデックス" },
      { vi: "Màu sắc CSS của phần tử", en: "The CSS color of the element", ja: "要素のCSS色" }
    ],
    answer: 1,
    exp: { vi: "Playwright khuyên dùng locator hướng người dùng (getByRole, getByLabel, getByText) vì chúng phản ánh cách người dùng và công nghệ trợ năng nhận biết phần tử, ít gãy khi cấu trúc DOM/CSS thay đổi — bền hơn XPath tuyệt đối hay chỉ số vị trí.", en: "Playwright recommends user-facing locators (getByRole, getByLabel, getByText) because they mirror how users and assistive tech perceive elements and break less when DOM/CSS structure changes — more robust than absolute XPath or positional indices.", ja: "Playwrightは利用者志向のロケーター(getByRole・getByLabel・getByText)を推奨する。利用者や支援技術が要素を認識する方法を反映し、DOM/CSS構造の変化に強く、絶対XPathや位置インデックスより堅牢だからである。" } },

  { cat: "iv-playwright",
    q: { vi: "Khi một test Playwright thất bại trên CI mà khó tái hiện ở máy cá nhân, công cụ tích hợp nào giúp điều tra hiệu quả nhất bằng cách xem lại từng bước, DOM và ảnh chụp?",
        en: "When a Playwright test fails on CI but is hard to reproduce locally, which built-in tool best helps investigate by replaying steps, DOM snapshots and screenshots?",
        ja: "PlaywrightのテストがCIで失敗するがローカルで再現しにくいとき、手順・DOMスナップショット・スクリーンショットを再生して調査するのに最適な組み込みツールはどれですか。" },
    options: [
      { vi: "Trace Viewer (mở trace.zip để xem lại timeline, DOM snapshot, ảnh và log mạng)", en: "Trace Viewer (open trace.zip to replay timeline, DOM snapshots, screenshots and network logs)", ja: "Trace Viewer(trace.zipを開いてタイムライン・DOMスナップショット・スクリーンショット・ネットワークログを再生する)" },
      { vi: "Một trình soạn thảo văn bản thuần", en: "A plain text editor", ja: "単なるテキストエディタ" },
      { vi: "Công cụ nén ảnh", en: "An image compression tool", ja: "画像圧縮ツール" },
      { vi: "Bảng tính để nhập tay kết quả", en: "A spreadsheet to type results manually", ja: "結果を手入力する表計算ソフト" }
    ],
    answer: 0,
    exp: { vi: "Trace Viewer của Playwright ghi lại timeline từng hành động kèm DOM snapshot, ảnh chụp, và log mạng/console. Bật trace on-first-retry trên CI rồi mở trace.zip giúp tester tái hiện và chẩn đoán lỗi mà không cần chạy lại trên môi trường CI.", en: "Playwright's Trace Viewer records a per-action timeline with DOM snapshots, screenshots and network/console logs. Enabling trace on-first-retry on CI and opening the trace.zip lets a tester replay and diagnose the failure without re-running on the CI environment.", ja: "PlaywrightのTrace Viewerは各アクションのタイムラインをDOMスナップショット・スクリーンショット・ネットワーク/コンソールログとともに記録する。CIでtrace on-first-retryを有効にしtrace.zipを開けば、CI環境で再実行せずに失敗を再生・診断できる。" } },

  // ===================== iv-ai (3) — answers: 2,0,3 =====================
  { cat: "iv-ai",
    q: { vi: "Khi dùng AI (ví dụ LLM) để sinh test case từ đặc tả, thực hành đúng đắn nhất của tester là gì?",
        en: "When using AI (e.g. an LLM) to generate test cases from a spec, what is the tester's soundest practice?",
        ja: "AI(例: LLM)で仕様からテストケースを生成するとき、テスターとして最も適切な実践はどれですか。" },
    options: [
      { vi: "Tin tuyệt đối và đưa thẳng vào bộ kiểm thử vì AI không bao giờ sai", en: "Trust it fully and add directly to the suite because AI never errs", ja: "AIは決して誤らないので全面的に信頼し、そのままスイートに加える" },
      { vi: "Không bao giờ dùng AI vì mọi output đều vô giá trị", en: "Never use AI because all output is worthless", ja: "出力はすべて無価値なのでAIは決して使わない" },
      { vi: "Dùng AI để phác nhanh rồi tester rà soát, đối chiếu đặc tả và bổ sung ca biên/âm mà AI bỏ sót", en: "Use AI to draft quickly, then review against the spec and add boundary/negative cases it missed", ja: "AIで素早く草案を作り、仕様と照合してレビューし、AIが漏らした境界/異常系ケースを補う" },
      { vi: "Chỉ dùng AI để đặt tên file test", en: "Use AI only to name test files", ja: "テストファイルの命名だけにAIを使う" }
    ],
    answer: 2,
    exp: { vi: "LLM có thể 「bịa」 (hallucinate) hoặc bỏ sót ca biên và luồng âm. Cách dùng đúng là coi AI như trợ lý phác thảo nhanh, còn tester giữ vai trò kiểm chứng: đối chiếu đặc tả, loại ca sai và bổ sung ca thiếu.", en: "LLMs can hallucinate or miss boundary and negative cases. The right approach treats AI as a drafting assistant while the tester verifies: cross-check the spec, drop wrong cases and add missing ones.", ja: "LLMは幻覚(hallucination)を起こしたり境界・異常系ケースを漏らすことがある。正しい使い方はAIを草案作成の助手とし、テスターが検証役を担い、仕様と照合し誤ケースを除き不足ケースを補うことである。" } },

  { cat: "iv-ai",
    q: { vi: "Trong kiểm thử tự động, tính năng 「self-healing locator」 dựa trên AI hoạt động theo nguyên tắc nào?",
        en: "In test automation, how do AI-based self-healing locators work in principle?",
        ja: "テスト自動化におけるAIベースの「セルフヒーリング・ロケーター」は、原理的にどのように機能しますか。" },
    options: [
      { vi: "Khi locator gốc hỏng do UI đổi, hệ thống dùng nhiều thuộc tính/ngữ cảnh để đoán phần tử tương ứng và tự cập nhật, giảm test gãy", en: "When the original locator breaks after a UI change, the system uses multiple attributes/context to infer the matching element and auto-update, reducing broken tests", ja: "UI変更で元のロケーターが壊れたとき、複数の属性や文脈から対応要素を推測して自動更新し、壊れたテストを減らす" },
      { vi: "Nó tự viết lại toàn bộ mã sản phẩm cho khớp test", en: "It rewrites all product code to match the tests", ja: "テストに合わせて製品コード全体を書き換える" },
      { vi: "Nó xóa các test thất bại để báo cáo luôn xanh", en: "It deletes failing tests so the report is always green", ja: "失敗したテストを削除して常に緑の結果にする" },
      { vi: "Nó tắt hoàn toàn việc kiểm tra kết quả mong đợi", en: "It disables checking of expected results entirely", ja: "期待結果の確認を完全に無効化する" }
    ],
    answer: 0,
    exp: { vi: "Self-healing dùng nhiều tín hiệu (thuộc tính, văn bản, vị trí tương đối, ngữ cảnh) để nhận lại phần tử khi locator cứng hỏng, rồi đề xuất/cập nhật locator mới. Nó giảm bảo trì nhưng vẫn cần người rà soát để tránh 「chữa nhầm」 phần tử.", en: "Self-healing uses several signals (attributes, text, relative position, context) to re-identify an element when a rigid locator breaks, then proposes/updates a new locator. It cuts maintenance but still needs human review to avoid healing to the wrong element.", ja: "セルフヒーリングは複数の手がかり(属性・テキスト・相対位置・文脈)を使い、固定ロケーターが壊れた際に要素を再識別し、新しいロケーターを提案/更新する。保守を減らすが、誤った要素への修復を避けるため人のレビューは依然必要である。" } },

  { cat: "iv-ai",
    q: { vi: "Rủi ro cốt lõi cần cảnh giác khi dựa vào test do AI sinh ra mà thiếu 「test oracle」 (nguồn xác định kết quả đúng) là gì?",
        en: "What core risk must you watch for when relying on AI-generated tests that lack a proper test oracle (a source of truth for the correct result)?",
        ja: "正しい結果を判断する「テストオラクル」を欠いたAI生成テストに依存する際、警戒すべき本質的なリスクは何ですか。" },
    options: [
      { vi: "Test sẽ chạy chậm hơn nhưng luôn cho kết quả đúng", en: "Tests run slower but always give correct results", ja: "テストは遅くなるが常に正しい結果を出す" },
      { vi: "AI sẽ tự động sửa mọi lỗi sản phẩm mà không cần dev", en: "AI will auto-fix all product bugs without developers", ja: "AIが開発者なしで全ての製品バグを自動修正する" },
      { vi: "Không có rủi ro nào; AI luôn biết kết quả đúng", en: "There is no risk; AI always knows the correct result", ja: "リスクはなく、AIは常に正しい結果を知っている" },
      { vi: "Test có thể khẳng định kết quả 「sai nhưng ổn định」: AI đoán kỳ vọng dựa trên hành vi hiện tại, hợp thức hóa cả bug hiện có nên bỏ sót lỗi thật", en: "Tests may assert a wrong-but-stable result: AI infers expectations from current behavior, cementing existing bugs and missing real defects", ja: "テストが「誤っているが安定した」結果を確定してしまう: AIが現在の挙動から期待値を推測し、既存のバグを正当化して本当の欠陥を見逃す" }
    ],
    answer: 3,
    exp: { vi: "Nếu AI suy ra kết quả mong đợi từ hành vi hiện tại của hệ thống, nó có thể 「đóng băng」 chính bug đang tồn tại thành kỳ vọng — test xanh nhưng vô nghĩa. Cần oracle độc lập (đặc tả, quy tắc nghiệp vụ, con người) để xác định đúng/sai thật sự.", en: "If AI derives expected results from the system's current behavior, it can freeze an existing bug into the expectation — green but meaningless tests. An independent oracle (spec, business rules, humans) is needed to define true correctness.", ja: "AIがシステムの現在の挙動から期待結果を導くと、既存のバグを期待値として固定しかねない — 緑だが無意味なテストになる。真の正しさを定義するには独立したオラクル(仕様・業務ルール・人)が必要である。" } },
];
