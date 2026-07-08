export const DATA = [
  // ===================== iv-playwright (50) =====================
  { cat: "iv-playwright",
    q: { vi: "Locator nào được Playwright khuyến nghị dùng đầu tiên vì gần với cách người dùng và công nghệ hỗ trợ tiếp cận (accessibility) nhìn thấy phần tử?", en: "Which locator does Playwright recommend first because it matches how users and assistive technology perceive an element?", ja: "ユーザーや支援技術（アクセシビリティ）が要素を認識する方法に近いため、Playwright が最初に推奨するロケーターはどれですか？" },
    options: [
      { vi: "getByRole", en: "getByRole", ja: "getByRole" },
      { vi: "Bộ chọn CSS (CSS selector)", en: "CSS selector", ja: "CSS セレクター" },
      { vi: "Biểu thức XPath", en: "XPath expression", ja: "XPath 式" },
      { vi: "Chọn theo id nội bộ", en: "Internal id selector", ja: "内部 id セレクター" }
    ],
    answer: 0,
    exp: { vi: "getByRole dựa trên vai trò ARIA và tên có thể truy cập, bền vững và phản ánh trải nghiệm người dùng nên được ưu tiên.", en: "getByRole relies on ARIA role and accessible name, is resilient, and reflects user experience, so it is preferred.", ja: "getByRole は ARIA ロールとアクセシブルネームに基づき、堅牢でユーザー体験を反映するため優先されます。" } },

  { cat: "iv-playwright",
    q: { vi: "Cơ chế 「auto-waiting」 của Playwright thực hiện điều gì trước khi thao tác trên một phần tử?", en: "What does Playwright's auto-waiting do before acting on an element?", ja: "Playwright の「オートウェイティング」は、要素を操作する前に何を行いますか？" },
    options: [
      { vi: "Chờ một khoảng cố định 5 giây rồi thao tác", en: "Wait a fixed 5 seconds then act", ja: "固定の 5 秒待ってから操作する" },
      { vi: "Tự động kiểm tra phần tử đã sẵn sàng (hiển thị, ổn định, nhận sự kiện) rồi mới thao tác", en: "Automatically check the element is actionable (visible, stable, receives events) before acting", ja: "要素が操作可能（表示・安定・イベント受信可）であることを自動確認してから操作する" },
      { vi: "Bỏ qua kiểm tra và thao tác ngay", en: "Skip checks and act immediately", ja: "チェックを省略して即座に操作する" },
      { vi: "Chụp ảnh màn hình trước mỗi thao tác", en: "Take a screenshot before every action", ja: "各操作前にスクリーンショットを撮る" }
    ],
    answer: 1,
    exp: { vi: "Playwright tự chờ các điều kiện actionability, giúp giảm test flaky mà không cần sleep thủ công.", en: "Playwright auto-waits for actionability conditions, reducing flakiness without manual sleeps.", ja: "Playwright は操作可能条件を自動的に待機し、手動の sleep なしでフレーキーさを減らします。" } },

  { cat: "iv-playwright",
    q: { vi: "「web-first assertion」 như expect(locator).toBeVisible() khác gì so với kiểm tra giá trị tức thời?", en: "How does a web-first assertion like expect(locator).toBeVisible() differ from an immediate value check?", ja: "expect(locator).toBeVisible() のような「ウェブファーストアサーション」は、即時の値チェックとどう違いますか？" },
    options: [
      { vi: "Nó chạy nhanh hơn nhưng không đáng tin", en: "It runs faster but is unreliable", ja: "速いが信頼性が低い" },
      { vi: "Nó chỉ dùng được cho văn bản", en: "It works only for text", ja: "テキストにのみ使える" },
      { vi: "Nó tự thử lại (retry) cho tới khi điều kiện đúng hoặc hết timeout", en: "It automatically retries until the condition is met or times out", ja: "条件が満たされるかタイムアウトするまで自動的にリトライする" },
      { vi: "Nó yêu cầu phải gọi await riêng biệt hai lần", en: "It requires calling await twice separately", ja: "await を別々に 2 回呼ぶ必要がある" }
    ],
    answer: 2,
    exp: { vi: "Web-first assertion tự động poll và retry, phù hợp với UI bất đồng bộ, giảm flaky đáng kể.", en: "Web-first assertions poll and retry automatically, fitting async UIs and cutting flakiness.", ja: "ウェブファーストアサーションは自動的にポーリング・リトライし、非同期 UI に適しフレーキーさを大きく減らします。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong Playwright Test, 「fixtures」 dùng để làm gì?", en: "In Playwright Test, what are fixtures used for?", ja: "Playwright Test における「フィクスチャ」は何のために使いますか？" },
    options: [
      { vi: "Chỉ để đặt tên file test", en: "Only to name test files", ja: "テストファイルの命名のためだけ" },
      { vi: "Để cố định độ phân giải màn hình", en: "To fix screen resolution", ja: "画面解像度を固定するため" },
      { vi: "Để tạo báo cáo HTML", en: "To generate HTML reports", ja: "HTML レポートを生成するため" },
      { vi: "Để cung cấp và thiết lập/dọn dẹp tài nguyên (page, context, dữ liệu) cho test một cách tái sử dụng", en: "To provide and set up/tear down reusable resources (page, context, data) for tests", ja: "テストに再利用可能なリソース（page、context、データ）を提供しセットアップ/後始末するため" }
    ],
    answer: 3,
    exp: { vi: "Fixtures đóng gói khởi tạo và dọn dẹp tài nguyên, giúp test gọn gàng và độc lập.", en: "Fixtures encapsulate setup and teardown of resources, keeping tests clean and isolated.", ja: "フィクスチャはリソースのセットアップと後始末をカプセル化し、テストを簡潔かつ独立に保ちます。" } },

  { cat: "iv-playwright",
    q: { vi: "Vì sao mỗi test trong Playwright thường chạy trong một 「browser context」 riêng?", en: "Why does each Playwright test usually run in its own browser context?", ja: "なぜ各 Playwright テストは通常、独自の「ブラウザーコンテキスト」で実行されますか？" },
    options: [
      { vi: "Để đảm bảo cách ly (isolation): cookie, storage, phiên không lẫn giữa các test", en: "To ensure isolation: cookies, storage, sessions do not leak between tests", ja: "分離を保証するため：クッキー・ストレージ・セッションがテスト間で混ざらない" },
      { vi: "Để tiết kiệm RAM tối đa", en: "To save the maximum RAM", ja: "RAM を最大限節約するため" },
      { vi: "Vì Playwright không hỗ trợ dùng chung trình duyệt", en: "Because Playwright cannot share a browser", ja: "Playwright はブラウザーを共有できないため" },
      { vi: "Để buộc chạy tuần tự", en: "To force sequential execution", ja: "逐次実行を強制するため" }
    ],
    answer: 0,
    exp: { vi: "Context riêng cho mỗi test tạo môi trường sạch, độc lập, tránh trạng thái rò rỉ gây flaky.", en: "A fresh context per test gives a clean, independent environment and avoids leaking state.", ja: "テストごとの新しいコンテキストはクリーンで独立した環境を与え、状態の漏れを防ぎます。" } },

  { cat: "iv-playwright",
    q: { vi: "「Trace Viewer」 của Playwright giúp gì khi điều tra một test thất bại?", en: "How does Playwright's Trace Viewer help when investigating a failed test?", ja: "Playwright の「トレースビューアー」は、失敗したテストの調査でどう役立ちますか？" },
    options: [
      { vi: "Chỉ hiển thị log văn bản", en: "Shows only text logs", ja: "テキストログのみ表示する" },
      { vi: "Cho xem lại timeline, ảnh chụp từng bước, DOM snapshot, network và console để tua lại lỗi", en: "Lets you replay a timeline with per-step snapshots, DOM snapshots, network and console", ja: "タイムライン、各ステップのスナップショット、DOM スナップショット、ネットワーク、コンソールを再生できる" },
      { vi: "Tự sửa test bị lỗi", en: "Automatically fixes the broken test", ja: "壊れたテストを自動修正する" },
      { vi: "Chỉ dùng được trên trình duyệt Firefox", en: "Works only in Firefox", ja: "Firefox でのみ動作する" }
    ],
    answer: 1,
    exp: { vi: "Trace Viewer ghi lại toàn bộ hành trình test, cực kỳ hữu ích để chẩn đoán lỗi trên CI.", en: "Trace Viewer records the full test journey and is invaluable for diagnosing CI failures.", ja: "トレースビューアーはテストの全行程を記録し、CI での失敗診断に非常に有用です。" } },

  { cat: "iv-playwright",
    q: { vi: "「Codegen」 (playwright codegen) làm gì?", en: "What does Playwright Codegen (playwright codegen) do?", ja: "Playwright の「コードジェン」（playwright codegen）は何をしますか？" },
    options: [
      { vi: "Biên dịch test sang mã máy", en: "Compiles tests to machine code", ja: "テストを機械語にコンパイルする" },
      { vi: "Tạo dữ liệu ngẫu nhiên", en: "Generates random data", ja: "ランダムデータを生成する" },
      { vi: "Ghi lại thao tác trên trình duyệt và sinh ra mã test kèm locator gợi ý", en: "Records browser actions and generates test code with suggested locators", ja: "ブラウザー操作を記録し、推奨ロケーター付きのテストコードを生成する" },
      { vi: "Xóa các test trùng lặp", en: "Deletes duplicate tests", ja: "重複したテストを削除する" }
    ],
    answer: 2,
    exp: { vi: "Codegen ghi tương tác và sinh mã, là điểm khởi đầu nhanh; cần tinh chỉnh locator sau đó.", en: "Codegen records interactions and emits code as a fast starting point; locators need refining after.", ja: "コードジェンは操作を記録してコードを生成する素早い出発点で、その後ロケーターの調整が必要です。" } },

  { cat: "iv-playwright",
    q: { vi: "Theo mặc định, Playwright Test chạy các file test như thế nào để tăng tốc?", en: "By default, how does Playwright Test run test files to speed things up?", ja: "デフォルトでは、Playwright Test は高速化のためにテストファイルをどう実行しますか？" },
    options: [
      { vi: "Luôn chạy tuần tự một luồng", en: "Always sequentially on one thread", ja: "常に 1 スレッドで逐次実行する" },
      { vi: "Chỉ chạy song song trên CI", en: "Parallel only on CI", ja: "CI でのみ並列実行する" },
      { vi: "Chạy hai lần để so sánh", en: "Runs twice to compare", ja: "比較のため 2 回実行する" },
      { vi: "Song song trên nhiều 「worker」 process, mỗi file thường ở một worker", en: "In parallel across multiple worker processes, typically one file per worker", ja: "複数の「ワーカー」プロセスで並列に、通常 1 ファイル 1 ワーカーで実行する" }
    ],
    answer: 3,
    exp: { vi: "Playwright dùng nhiều worker để chạy song song các file, tận dụng CPU và rút ngắn thời gian.", en: "Playwright uses multiple workers to run files in parallel, using CPU and cutting time.", ja: "Playwright は複数のワーカーでファイルを並列実行し、CPU を活用して時間を短縮します。" } },

  { cat: "iv-playwright",
    q: { vi: "Cấu hình 「retries」 trong Playwright có tác dụng gì?", en: "What does the retries setting do in Playwright?", ja: "Playwright の「リトライ」設定は何をしますか？" },
    options: [
      { vi: "Chạy lại test bị thất bại một số lần trước khi báo fail hẳn", en: "Re-runs a failed test a number of times before marking it failed", ja: "失敗したテストを最終失敗と判定する前に指定回数再実行する" },
      { vi: "Tăng timeout mặc định lên gấp đôi", en: "Doubles the default timeout", ja: "デフォルトタイムアウトを 2 倍にする" },
      { vi: "Bỏ qua các test lỗi", en: "Skips failing tests", ja: "失敗したテストをスキップする" },
      { vi: "Chạy test theo thứ tự ngẫu nhiên", en: "Runs tests in random order", ja: "テストをランダム順で実行する" }
    ],
    answer: 0,
    exp: { vi: "Retries giúp vượt qua lỗi thoáng qua; nên kèm trace on-first-retry để phân tích test flaky.", en: "Retries survive transient failures; pair with trace on-first-retry to analyze flakiness.", ja: "リトライは一時的な失敗を乗り越えます。trace on-first-retry と併用してフレーキーさを分析しましょう。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong config, 「projects」 thường được dùng để làm gì trong Playwright?", en: "In config, what are projects commonly used for in Playwright?", ja: "設定における「プロジェクト」は Playwright で一般的に何に使われますか？" },
    options: [
      { vi: "Để chia hóa đơn theo dự án", en: "To split billing by project", ja: "プロジェクトごとに請求を分ける" },
      { vi: "Để chạy cùng bộ test trên nhiều trình duyệt/thiết bị hoặc cấu hình khác nhau", en: "To run the same tests across multiple browsers/devices or configurations", ja: "同じテストを複数のブラウザー/デバイスや設定で実行する" },
      { vi: "Để đổi ngôn ngữ báo cáo", en: "To change the report language", ja: "レポートの言語を変える" },
      { vi: "Để nén ảnh chụp màn hình", en: "To compress screenshots", ja: "スクリーンショットを圧縮する" }
    ],
    answer: 1,
    exp: { vi: "Projects cho phép định nghĩa nhiều môi trường (Chromium, Firefox, WebKit, mobile...) chạy cùng test.", en: "Projects define multiple environments (Chromium, Firefox, WebKit, mobile...) running the same tests.", ja: "プロジェクトは複数の環境（Chromium、Firefox、WebKit、モバイルなど）を定義し同じテストを実行できます。" } },

  { cat: "iv-playwright",
    q: { vi: "Để kiểm thử API trực tiếp (không qua UI) trong Playwright, ta dùng gì?", en: "To test an API directly (without UI) in Playwright, what do you use?", ja: "UI を介さずに API を直接テストするには、Playwright で何を使いますか？" },
    options: [
      { vi: "page.click", en: "page.click", ja: "page.click" },
      { vi: "getByRole", en: "getByRole", ja: "getByRole" },
      { vi: "「request」 context (APIRequestContext) qua request.get/post...", en: "The request context (APIRequestContext) via request.get/post...", ja: "request.get/post などによる「request」コンテキスト（APIRequestContext）" },
      { vi: "expect.toHaveScreenshot", en: "expect.toHaveScreenshot", ja: "expect.toHaveScreenshot" }
    ],
    answer: 2,
    exp: { vi: "APIRequestContext gửi HTTP request trực tiếp, dùng để test API hoặc thiết lập dữ liệu nhanh.", en: "APIRequestContext sends HTTP requests directly, useful for API tests or fast data setup.", ja: "APIRequestContext は HTTP リクエストを直接送信し、API テストや高速なデータ準備に使えます。" } },

  { cat: "iv-playwright",
    q: { vi: "page.route() dùng để làm gì?", en: "What is page.route() used for?", ja: "page.route() は何のために使いますか？" },
    options: [
      { vi: "Điều hướng sang trang khác", en: "Navigate to another page", ja: "別のページへ遷移する" },
      { vi: "Định tuyến điều hướng bằng URL", en: "Route navigation by URL", ja: "URL でナビゲーションをルーティングする" },
      { vi: "Chuyển đổi ngôn ngữ trang", en: "Switch the page language", ja: "ページの言語を切り替える" },
      { vi: "Chặn/can thiệp request mạng để mock hoặc chỉnh sửa phản hồi", en: "Intercept network requests to mock or modify responses", ja: "ネットワークリクエストを傍受してレスポンスをモック/変更する" }
    ],
    answer: 3,
    exp: { vi: "page.route cho phép intercept và fulfill/abort request, hữu ích để mock API và test trạng thái lỗi.", en: "page.route intercepts and can fulfill/abort requests, great for mocking APIs and error states.", ja: "page.route はリクエストを傍受し fulfill/abort でき、API のモックやエラー状態のテストに有用です。" } },

  { cat: "iv-playwright",
    q: { vi: "Khi nào ảnh chụp màn hình được lưu tự động hữu ích nhất trong CI?", en: "When is automatic screenshot capture most useful in CI?", ja: "CI において自動スクリーンショットの取得が最も役立つのはいつですか？" },
    options: [
      { vi: "Khi test thất bại (screenshot: 'only-on-failure') để xem trạng thái lúc lỗi", en: "On failure (screenshot: 'only-on-failure') to see the state at the moment of error", ja: "失敗時（screenshot: 'only-on-failure'）にエラー時点の状態を確認する" },
      { vi: "Chỉ khi test thành công", en: "Only when tests pass", ja: "テスト成功時のみ" },
      { vi: "Trước khi trình duyệt khởi động", en: "Before the browser starts", ja: "ブラウザー起動前" },
      { vi: "Không bao giờ nên bật trong CI", en: "It should never be enabled in CI", ja: "CI では決して有効にすべきでない" }
    ],
    answer: 0,
    exp: { vi: "Chụp khi thất bại giúp lưu bằng chứng trực quan trên CI mà không tốn dung lượng cho test đạt.", en: "Capturing on failure preserves visual evidence in CI without wasting storage on passing tests.", ja: "失敗時のキャプチャは、成功テストで容量を浪費せず CI に視覚的証拠を残します。" } },

  { cat: "iv-playwright",
    q: { vi: "Tùy chọn video: 'retain-on-failure' có ý nghĩa gì?", en: "What does the video: 'retain-on-failure' option mean?", ja: "video: 'retain-on-failure' オプションは何を意味しますか？" },
    options: [
      { vi: "Luôn quay và giữ mọi video", en: "Always record and keep every video", ja: "常に録画しすべての動画を保持する" },
      { vi: "Quay video nhưng chỉ giữ lại video của các test thất bại", en: "Record video but keep only videos of failed tests", ja: "録画するが、失敗したテストの動画のみ保持する" },
      { vi: "Không quay video gì cả", en: "Record no video at all", ja: "動画を一切録画しない" },
      { vi: "Chỉ quay 5 giây đầu", en: "Record only the first 5 seconds", ja: "最初の 5 秒のみ録画する" }
    ],
    answer: 1,
    exp: { vi: "Chế độ này quay tất cả nhưng chỉ lưu video của test lỗi, cân bằng giữa bằng chứng và dung lượng.", en: "This records all but keeps only failing tests' videos, balancing evidence and storage.", ja: "このモードはすべて録画するが失敗テストの動画のみ保持し、証拠と容量のバランスを取ります。" } },

  { cat: "iv-playwright",
    q: { vi: "「storageState」 giúp giải quyết bài toán xác thực (auth) như thế nào?", en: "How does storageState help with the authentication problem?", ja: "「storageState」は認証の課題をどう解決しますか？" },
    options: [
      { vi: "Bằng cách tắt xác thực", en: "By disabling authentication", ja: "認証を無効にすることで" },
      { vi: "Bằng cách chia sẻ mật khẩu trong code", en: "By hardcoding passwords in code", ja: "コードにパスワードを埋め込むことで" },
      { vi: "Lưu cookie/localStorage sau khi đăng nhập một lần rồi tái sử dụng cho nhiều test, khỏi đăng nhập lại", en: "Save cookies/localStorage after one login and reuse across tests, avoiding repeated logins", ja: "一度ログインした後のクッキー/localStorage を保存し複数テストで再利用して再ログインを避ける" },
      { vi: "Tăng tốc render trang", en: "Speed up page rendering", ja: "ページのレンダリングを高速化する" }
    ],
    answer: 2,
    exp: { vi: "Đăng nhập một lần, lưu storageState và nạp lại cho các test giúp nhanh và ổn định hơn.", en: "Log in once, save storageState and load it into tests for speed and stability.", ja: "一度ログインして storageState を保存しテストに読み込むことで、速度と安定性が向上します。" } },

  { cat: "iv-playwright",
    q: { vi: "「reporter」 trong Playwright là gì?", en: "What is a reporter in Playwright?", ja: "Playwright における「レポーター」とは何ですか？" },
    options: [
      { vi: "Một loại locator đặc biệt", en: "A special kind of locator", ja: "特殊な種類のロケーター" },
      { vi: "Công cụ ghi lại video", en: "A video recorder", ja: "動画レコーダー" },
      { vi: "Trình quản lý phiên đăng nhập", en: "A login session manager", ja: "ログインセッション管理ツール" },
      { vi: "Thành phần xuất kết quả chạy test (list, line, HTML, JUnit, JSON...) theo định dạng khác nhau", en: "A component that outputs test run results (list, line, HTML, JUnit, JSON...) in various formats", ja: "テスト実行結果を各種形式（list、line、HTML、JUnit、JSON など）で出力するコンポーネント" }
    ],
    answer: 3,
    exp: { vi: "Reporter quyết định cách hiển thị/kết xuất kết quả; HTML và JUnit hay dùng để xem và tích hợp CI.", en: "Reporters decide how results are shown/exported; HTML and JUnit are common for viewing and CI integration.", ja: "レポーターは結果の表示/出力方法を決めます。表示や CI 連携には HTML や JUnit がよく使われます。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong playwright.config, 「testDir」 chỉ định điều gì?", en: "In playwright.config, what does testDir specify?", ja: "playwright.config において「testDir」は何を指定しますか？" },
    options: [
      { vi: "Thư mục chứa các file test cần thu thập và chạy", en: "The directory containing test files to collect and run", ja: "収集して実行するテストファイルを含むディレクトリ" },
      { vi: "Thư mục cài đặt trình duyệt", en: "The browser installation directory", ja: "ブラウザーのインストールディレクトリ" },
      { vi: "Đường dẫn tới báo cáo HTML", en: "The path to the HTML report", ja: "HTML レポートへのパス" },
      { vi: "Nơi lưu trace", en: "Where traces are stored", ja: "トレースの保存先" }
    ],
    answer: 0,
    exp: { vi: "testDir cho Playwright biết nơi tìm test; các đường dẫn khác có tùy chọn riêng như outputDir.", en: "testDir tells Playwright where to find tests; other paths have their own options like outputDir.", ja: "testDir は Playwright にテストの場所を伝えます。他のパスは outputDir など別のオプションがあります。" } },

  { cat: "iv-playwright",
    q: { vi: "getByText khớp phần tử dựa trên điều gì?", en: "getByText matches an element based on what?", ja: "getByText は何に基づいて要素を一致させますか？" },
    options: [
      { vi: "Thuộc tính id", en: "The id attribute", ja: "id 属性" },
      { vi: "Nội dung văn bản hiển thị của phần tử", en: "The element's visible text content", ja: "要素の表示テキスト内容" },
      { vi: "Class CSS", en: "The CSS class", ja: "CSS クラス" },
      { vi: "Vị trí toạ độ", en: "The coordinate position", ja: "座標位置" }
    ],
    answer: 1,
    exp: { vi: "getByText định vị theo văn bản; mặc định so khớp gần đúng, có thể yêu cầu khớp chính xác nếu cần.", en: "getByText locates by text; matching is substring by default and can be made exact if needed.", ja: "getByText はテキストで要素を特定し、既定では部分一致で、必要なら完全一致にできます。" } },

  { cat: "iv-playwright",
    q: { vi: "Phương thức locator.filter() dùng để làm gì?", en: "What is the locator.filter() method used for?", ja: "locator.filter() メソッドは何に使いますか？" },
    options: [
      { vi: "Đổi màu phần tử", en: "Change element color", ja: "要素の色を変える" },
      { vi: "Chờ trang tải", en: "Wait for page load", ja: "ページ読み込みを待つ" },
      { vi: "Thu hẹp một tập locator theo văn bản chứa hoặc theo locator con", en: "Narrow a set of matched elements by contained text or a child locator", ja: "一致した要素集合を、含まれるテキストや子ロケーターで絞り込む" },
      { vi: "Xóa phần tử khỏi DOM", en: "Remove an element from the DOM", ja: "要素を DOM から削除する" }
    ],
    answer: 2,
    exp: { vi: "filter({ hasText }) hoặc filter({ has }) giúp chọn đúng phần tử trong danh sách, ví dụ một hàng cụ thể.", en: "filter({ hasText }) or filter({ has }) pick the right element in a list, e.g. a specific row.", ja: "filter({ hasText }) や filter({ has }) はリスト内の正しい要素（例：特定の行）を選ぶのに役立ちます。" } },

  { cat: "iv-playwright",
    q: { vi: "expect(locator).toBeVisible() sẽ thất bại trong trường hợp nào?", en: "In which case does expect(locator).toBeVisible() fail?", ja: "expect(locator).toBeVisible() はどの場合に失敗しますか？" },
    options: [
      { vi: "Khi phần tử có văn bản dài", en: "When the element has long text", ja: "要素のテキストが長いとき" },
      { vi: "Khi phần tử là nút bấm", en: "When the element is a button", ja: "要素がボタンのとき" },
      { vi: "Khi trang dùng React", en: "When the page uses React", ja: "ページが React を使うとき" },
      { vi: "Khi phần tử không xuất hiện/không hiển thị cho đến khi hết timeout", en: "When the element does not appear/become visible before the timeout", ja: "タイムアウトまでに要素が現れない/表示されないとき" }
    ],
    answer: 3,
    exp: { vi: "Assertion này poll cho tới khi phần tử hiển thị; nếu hết timeout mà vẫn ẩn/không có thì fail.", en: "The assertion polls until the element is visible; it fails if it stays hidden/absent past the timeout.", ja: "このアサーションは要素が表示されるまでポーリングし、タイムアウト後も非表示/不在なら失敗します。" } },

  { cat: "iv-playwright",
    q: { vi: "「Sharding」 (ví dụ --shard=1/3) trên CI để làm gì?", en: "What is sharding (e.g. --shard=1/3) on CI for?", ja: "CI での「シャーディング」（例：--shard=1/3）は何のためですか？" },
    options: [
      { vi: "Chia bộ test thành nhiều phần chạy song song trên nhiều máy/job để giảm tổng thời gian", en: "Split the test suite into parts run in parallel across machines/jobs to reduce total time", ja: "テストスイートを分割し複数マシン/ジョブで並列実行して総時間を短縮する" },
      { vi: "Mã hóa test", en: "Encrypt the tests", ja: "テストを暗号化する" },
      { vi: "Giảm số assertion", en: "Reduce the number of assertions", ja: "アサーション数を減らす" },
      { vi: "Ghép nhiều báo cáo thành một", en: "Merge many reports into one", ja: "複数のレポートを 1 つに統合する" }
    ],
    answer: 0,
    exp: { vi: "Sharding phân bố test qua nhiều job; kết quả từng shard có thể gộp lại thành báo cáo chung.", en: "Sharding distributes tests across jobs; per-shard results can be merged into one report.", ja: "シャーディングはテストを複数ジョブに分散し、各シャードの結果は 1 つのレポートに統合できます。" } },

  { cat: "iv-playwright",
    q: { vi: "Khi chạy Playwright trên GitHub Actions, việc gì thường bắt buộc trước khi test?", en: "When running Playwright on GitHub Actions, what step is usually required before testing?", ja: "GitHub Actions で Playwright を実行する際、テスト前に通常必要な手順は何ですか？" },
    options: [
      { vi: "Vô hiệu hóa mạng", en: "Disable networking", ja: "ネットワークを無効化する" },
      { vi: "Cài đặt trình duyệt bằng npx playwright install (kèm --with-deps trên Linux)", en: "Install browsers with npx playwright install (with --with-deps on Linux)", ja: "npx playwright install でブラウザーをインストールする（Linux では --with-deps 付き）" },
      { vi: "Xóa toàn bộ cache", en: "Clear all caches", ja: "すべてのキャッシュを削除する" },
      { vi: "Tắt chế độ headless", en: "Turn off headless mode", ja: "ヘッドレスモードをオフにする" }
    ],
    answer: 1,
    exp: { vi: "Trên CI cần cài trình duyệt và phụ thuộc hệ thống trước; --with-deps cài các thư viện Linux cần thiết.", en: "On CI you must install browsers and system deps first; --with-deps installs needed Linux libraries.", ja: "CI ではまずブラウザーとシステム依存をインストールする必要があり、--with-deps が必要な Linux ライブラリを入れます。" } },

  { cat: "iv-playwright",
    q: { vi: "Đặt 「baseURL」 trong config đem lại lợi ích gì?", en: "What benefit does setting baseURL in the config give?", ja: "設定で「baseURL」を設定する利点は何ですか？" },
    options: [
      { vi: "Tự động dịch trang", en: "Auto-translate the page", ja: "ページを自動翻訳する" },
      { vi: "Bật chế độ debug", en: "Enable debug mode", ja: "デバッグモードを有効にする" },
      { vi: "Cho phép dùng đường dẫn tương đối trong page.goto('/path') và dễ đổi môi trường", en: "Lets you use relative paths in page.goto('/path') and switch environments easily", ja: "page.goto('/path') で相対パスを使え、環境の切り替えが容易になる" },
      { vi: "Tăng số worker", en: "Increase the number of workers", ja: "ワーカー数を増やす" }
    ],
    answer: 2,
    exp: { vi: "baseURL cho phép viết đường dẫn tương đối và chuyển giữa dev/staging/prod chỉ bằng một biến.", en: "baseURL enables relative paths and switching between dev/staging/prod with a single variable.", ja: "baseURL は相対パスを可能にし、1 つの変数で dev/staging/prod を切り替えられます。" } },

  { cat: "iv-playwright",
    q: { vi: "test.beforeEach() thường được dùng để làm gì?", en: "What is test.beforeEach() commonly used for?", ja: "test.beforeEach() は一般的に何に使われますか？" },
    options: [
      { vi: "Chỉ chạy một lần cho cả file", en: "Run once for the whole file", ja: "ファイル全体で 1 回だけ実行する" },
      { vi: "Xuất báo cáo", en: "Export a report", ja: "レポートを出力する" },
      { vi: "Đóng trình duyệt", en: "Close the browser", ja: "ブラウザーを閉じる" },
      { vi: "Thiết lập chung trước mỗi test, ví dụ điều hướng tới trang hoặc đăng nhập", en: "Set up shared steps before each test, e.g. navigating or logging in", ja: "各テスト前の共通準備（例：ページ遷移やログイン）を行う" }
    ],
    answer: 3,
    exp: { vi: "beforeEach chạy trước từng test để đưa hệ thống về trạng thái ban đầu mong muốn.", en: "beforeEach runs before every test to bring the system to the desired initial state.", ja: "beforeEach は各テスト前に実行され、システムを望ましい初期状態にします。" } },

  { cat: "iv-playwright",
    q: { vi: "await page.goto(url) mặc định chờ điều kiện nào trước khi tiếp tục?", en: "By default, what does await page.goto(url) wait for before continuing?", ja: "await page.goto(url) は既定で続行前に何を待ちますか？" },
    options: [
      { vi: "Sự kiện 'load' của trang (mặc định là load)", en: "The page's 'load' event (default is load)", ja: "ページの 'load' イベント（既定は load）" },
      { vi: "Người dùng bấm phím", en: "The user pressing a key", ja: "ユーザーのキー押下" },
      { vi: "Hết 30 giây bất kể trạng thái", en: "A full 30 seconds regardless of state", ja: "状態に関係なく 30 秒経過" },
      { vi: "Toàn bộ ảnh tải xong", en: "All images finished loading", ja: "すべての画像の読み込み完了" }
    ],
    answer: 0,
    exp: { vi: "goto trả về sau khi đạt waitUntil (mặc định 'load'); có thể đổi sang 'domcontentloaded' hay 'networkidle'.", en: "goto resolves after the waitUntil state (default 'load'); it can be 'domcontentloaded' or 'networkidle'.", ja: "goto は waitUntil 状態（既定 'load'）到達後に解決し、'domcontentloaded' や 'networkidle' に変更できます。" } },

  { cat: "iv-playwright",
    q: { vi: "Vì sao thường không cần gọi waitForSelector thủ công trước locator.click()?", en: "Why is a manual waitForSelector usually unnecessary before locator.click()?", ja: "なぜ locator.click() の前に手動の waitForSelector は通常不要なのですか？" },
    options: [
      { vi: "Vì click bỏ qua mọi kiểm tra", en: "Because click skips all checks", ja: "click はすべてのチェックを省略するため" },
      { vi: "Vì click tự chờ phần tử actionable (hiển thị, ổn định, enabled) rồi mới nhấn", en: "Because click auto-waits for the element to be actionable (visible, stable, enabled) before pressing", ja: "click は要素が操作可能（表示・安定・有効）になるのを自動的に待ってから押すため" },
      { vi: "Vì Playwright không hỗ trợ chờ", en: "Because Playwright cannot wait", ja: "Playwright は待機をサポートしないため" },
      { vi: "Vì phải luôn thêm sleep thay thế", en: "Because you must add a sleep instead", ja: "代わりに常に sleep を追加する必要があるため" }
    ],
    answer: 1,
    exp: { vi: "Auto-waiting của click đã bao gồm chờ actionability nên waitForSelector thủ công thường thừa.", en: "click's auto-waiting already includes actionability checks, so a manual waitForSelector is usually redundant.", ja: "click のオートウェイティングには操作可能性チェックが含まれるため、手動 waitForSelector は通常冗長です。" } },

  { cat: "iv-playwright",
    q: { vi: "getByTestId dựa vào thuộc tính nào theo mặc định?", en: "getByTestId relies on which attribute by default?", ja: "getByTestId は既定でどの属性に依存しますか？" },
    options: [
      { vi: "name", en: "name", ja: "name" },
      { vi: "aria-label", en: "aria-label", ja: "aria-label" },
      { vi: "data-testid (có thể cấu hình đổi tên qua testIdAttribute)", en: "data-testid (configurable via testIdAttribute)", ja: "data-testid（testIdAttribute で変更可能）" },
      { vi: "href", en: "href", ja: "href" }
    ],
    answer: 2,
    exp: { vi: "Mặc định getByTestId đọc data-testid; có thể đổi thuộc tính qua cấu hình testIdAttribute.", en: "By default getByTestId reads data-testid; the attribute can be changed via testIdAttribute config.", ja: "getByTestId は既定で data-testid を読み、testIdAttribute 設定で属性を変更できます。" } },

  { cat: "iv-playwright",
    q: { vi: "expect.soft() khác expect() thông thường ở điểm nào?", en: "How does expect.soft() differ from a normal expect()?", ja: "expect.soft() は通常の expect() とどう違いますか？" },
    options: [
      { vi: "Chạy nhanh gấp đôi", en: "Runs twice as fast", ja: "2 倍速く実行する" },
      { vi: "Không bao giờ thất bại", en: "Never fails", ja: "決して失敗しない" },
      { vi: "Chỉ dùng cho ảnh chụp", en: "Works only for screenshots", ja: "スクリーンショットにのみ使える" },
      { vi: "Khi thất bại vẫn cho test tiếp tục chạy để gom nhiều lỗi, thay vì dừng ngay", en: "On failure it lets the test continue to collect multiple errors instead of stopping immediately", ja: "失敗しても即停止せずテストを続行し、複数のエラーを収集できる" }
    ],
    answer: 3,
    exp: { vi: "Soft assertion không ngắt test khi fail, hữu ích để kiểm nhiều điều kiện và báo cáo tổng hợp lỗi.", en: "A soft assertion does not abort on failure, useful to check many conditions and report all errors.", ja: "ソフトアサーションは失敗しても中断せず、多くの条件を確認して全エラーを報告するのに便利です。" } },

  { cat: "iv-playwright",
    q: { vi: "Cấu hình trace: 'on-first-retry' nghĩa là gì?", en: "What does trace: 'on-first-retry' mean?", ja: "trace: 'on-first-retry' は何を意味しますか？" },
    options: [
      { vi: "Chỉ ghi trace khi test được chạy lại lần đầu (sau khi lần chạy đầu thất bại)", en: "Record a trace only on the first retry (after the initial run failed)", ja: "最初のリトライ時（初回実行が失敗した後）にのみトレースを記録する" },
      { vi: "Luôn ghi trace cho mọi test", en: "Always record traces for all tests", ja: "すべてのテストで常にトレースを記録する" },
      { vi: "Không bao giờ ghi trace", en: "Never record traces", ja: "トレースを決して記録しない" },
      { vi: "Chỉ ghi trace khi test thành công", en: "Record traces only when tests pass", ja: "テスト成功時のみトレースを記録する" }
    ],
    answer: 0,
    exp: { vi: "Chế độ này tránh chi phí ghi trace cho mọi lần chạy nhưng vẫn có dữ liệu khi test flaky bị retry.", en: "This avoids the cost of tracing every run but still captures data when a flaky test is retried.", ja: "このモードは毎回のトレースコストを避けつつ、フレーキーテストのリトライ時にデータを取得します。" } },

  { cat: "iv-playwright",
    q: { vi: "Chạy 「headless」 nghĩa là gì?", en: "What does running headless mean?", ja: "「ヘッドレス」で実行するとはどういう意味ですか？" },
    options: [
      { vi: "Chạy không có assertion", en: "Run without assertions", ja: "アサーションなしで実行する" },
      { vi: "Chạy trình duyệt không hiển thị giao diện cửa sổ (không UI), phù hợp CI", en: "Run the browser without a visible window (no UI), suitable for CI", ja: "ブラウザーを可視ウィンドウなし（UI なし）で実行し、CI に適する" },
      { vi: "Chạy mà không có network", en: "Run without any network", ja: "ネットワークなしで実行する" },
      { vi: "Chạy trên máy khác", en: "Run on a different machine", ja: "別のマシンで実行する" }
    ],
    answer: 1,
    exp: { vi: "Headless không mở cửa sổ trình duyệt, nhanh và phù hợp môi trường CI không có màn hình.", en: "Headless does not open a browser window, is faster, and fits headless CI environments.", ja: "ヘッドレスはブラウザーウィンドウを開かず高速で、画面のない CI 環境に適します。" } },

  { cat: "iv-playwright",
    q: { vi: "Hai context của cùng một trình duyệt trong Playwright có chia sẻ cookie không?", en: "Do two contexts of the same browser in Playwright share cookies?", ja: "Playwright で同じブラウザーの 2 つのコンテキストはクッキーを共有しますか？" },
    options: [
      { vi: "Có, luôn chia sẻ", en: "Yes, always shared", ja: "はい、常に共有する" },
      { vi: "Có, nếu cùng trang", en: "Yes, if on the same page", ja: "同じページなら共有する" },
      { vi: "Không, mỗi context cách ly cookie/storage riêng như phiên trình duyệt độc lập", en: "No, each context isolates its own cookies/storage like an independent browser session", ja: "いいえ、各コンテキストは独立したブラウザーセッションのようにクッキー/ストレージを分離する" },
      { vi: "Chỉ chia sẻ localStorage", en: "They share only localStorage", ja: "localStorage のみ共有する" }
    ],
    answer: 2,
    exp: { vi: "Mỗi browser context độc lập về cookie và storage, cho phép mô phỏng nhiều người dùng song song.", en: "Each browser context is independent in cookies and storage, enabling parallel multi-user simulation.", ja: "各ブラウザーコンテキストはクッキーとストレージが独立し、並列の複数ユーザーシミュレーションを可能にします。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong page.route, route.fulfill() được dùng để làm gì?", en: "Within page.route, what is route.fulfill() used for?", ja: "page.route 内で route.fulfill() は何に使いますか？" },
    options: [
      { vi: "Đóng trình duyệt", en: "Close the browser", ja: "ブラウザーを閉じる" },
      { vi: "Chuyển hướng người dùng", en: "Redirect the user", ja: "ユーザーをリダイレクトする" },
      { vi: "Ghi log request", en: "Log the request", ja: "リクエストをログ出力する" },
      { vi: "Trả về một phản hồi giả (mock) với status/body/headers do ta định nghĩa", en: "Return a mocked response with status/body/headers you define", ja: "自分で定義した status/body/headers を持つモックレスポンスを返す" }
    ],
    answer: 3,
    exp: { vi: "route.fulfill cho phép trả phản hồi mock, hữu ích để test UI với dữ liệu cố định hoặc trạng thái lỗi.", en: "route.fulfill returns a mocked response, useful to test UI with fixed data or error states.", ja: "route.fulfill はモックレスポンスを返し、固定データやエラー状態で UI をテストするのに役立ちます。" } },

  { cat: "iv-playwright",
    q: { vi: "request.newContext() với extraHTTPHeaders hữu ích khi nào?", en: "When is request.newContext() with extraHTTPHeaders useful?", ja: "extraHTTPHeaders 付きの request.newContext() が役立つのはいつですか？" },
    options: [
      { vi: "Khi cần tạo context API độc lập kèm header chung, ví dụ token Authorization cho nhiều lời gọi", en: "When you need an independent API context with shared headers, e.g. an Authorization token for many calls", ja: "共通ヘッダー（例：多数の呼び出し用の Authorization トークン）を持つ独立した API コンテキストが必要なとき" },
      { vi: "Khi muốn tắt JavaScript", en: "When you want to disable JavaScript", ja: "JavaScript を無効にしたいとき" },
      { vi: "Khi cần quay video", en: "When you need to record video", ja: "動画を録画する必要があるとき" },
      { vi: "Khi đổi ngôn ngữ UI", en: "When changing the UI language", ja: "UI 言語を変更するとき" }
    ],
    answer: 0,
    exp: { vi: "API request context riêng với header mặc định giúp gọi API xác thực gọn gàng, tách khỏi context trình duyệt.", en: "A dedicated API request context with default headers cleanly authenticates API calls, separate from the browser context.", ja: "既定ヘッダー付きの専用 API リクエストコンテキストは、ブラウザーコンテキストと分離して認証済み API 呼び出しを簡潔にします。" } },

  { cat: "iv-playwright",
    q: { vi: "Khác biệt chính giữa toHaveText và toContainText là gì?", en: "What is the key difference between toHaveText and toContainText?", ja: "toHaveText と toContainText の主な違いは何ですか？" },
    options: [
      { vi: "toHaveText chỉ dùng cho input", en: "toHaveText works only for inputs", ja: "toHaveText は input にのみ使える" },
      { vi: "toHaveText yêu cầu khớp toàn bộ văn bản, còn toContainText chỉ cần chứa chuỗi con", en: "toHaveText requires the whole text to match, while toContainText only needs to contain a substring", ja: "toHaveText はテキスト全体の一致を要求し、toContainText は部分文字列を含めばよい" },
      { vi: "Cả hai giống hệt nhau", en: "They are identical", ja: "両者は同一である" },
      { vi: "toContainText không tự retry", en: "toContainText does not auto-retry", ja: "toContainText は自動リトライしない" }
    ],
    answer: 1,
    exp: { vi: "toHaveText so khớp đầy đủ (đã chuẩn hoá khoảng trắng), toContainText kiểm tra có chứa chuỗi con.", en: "toHaveText matches the full normalized text; toContainText checks for a contained substring.", ja: "toHaveText は正規化された全テキストと一致し、toContainText は部分文字列の包含を確認します。" } },

  { cat: "iv-playwright",
    q: { vi: "Nếu một locator khớp nhiều hơn một phần tử khi bạn gọi hành động, Playwright sẽ làm gì (chế độ strict)?", en: "If a locator matches more than one element when you call an action, what does Playwright do (strict mode)?", ja: "アクション呼び出し時にロケーターが複数の要素に一致した場合、Playwright はどうしますか（strict モード）？" },
    options: [
      { vi: "Chọn ngẫu nhiên một phần tử", en: "Pick a random element", ja: "ランダムに 1 つ選ぶ" },
      { vi: "Chọn phần tử cuối cùng", en: "Pick the last element", ja: "最後の要素を選ぶ" },
      { vi: "Báo lỗi strict mode violation vì locator không đơn nhất", en: "Throw a strict mode violation error because the locator is not unique", ja: "ロケーターが一意でないため strict モード違反エラーを投げる" },
      { vi: "Bỏ qua và tiếp tục im lặng", en: "Silently ignore and continue", ja: "静かに無視して続行する" }
    ],
    answer: 2,
    exp: { vi: "Strictness buộc locator dùng cho hành động phải chỉ một phần tử; nếu không phải thu hẹp bằng filter/nth.", en: "Strictness requires an action locator to resolve to one element; otherwise narrow it with filter/nth.", ja: "strict 性はアクション用ロケーターが 1 要素に解決することを要求し、そうでなければ filter/nth で絞ります。" } },

  { cat: "iv-playwright",
    q: { vi: "Khi nào page.waitForLoadState('networkidle') phù hợp, dù không nên lạm dụng?", en: "When is page.waitForLoadState('networkidle') appropriate, though it should not be overused?", ja: "多用すべきではないものの、page.waitForLoadState('networkidle') が適切なのはいつですか？" },
    options: [
      { vi: "Trước mọi click để chắc chắn", en: "Before every click to be safe", ja: "念のため毎回のクリック前に" },
      { vi: "Thay cho tất cả assertion", en: "As a replacement for all assertions", ja: "すべてのアサーションの代わりに" },
      { vi: "Để tăng tốc test", en: "To speed up tests", ja: "テストを高速化するため" },
      { vi: "Khi cần chờ các request nền lắng xuống, ví dụ sau một hành động kích hoạt nhiều gọi mạng", en: "When you need background requests to settle, e.g. after an action triggering many network calls", ja: "多くのネットワーク呼び出しを起こす操作の後など、バックグラウンドリクエストが落ち着くのを待つ必要があるとき" }
    ],
    answer: 3,
    exp: { vi: "networkidle chờ mạng yên; nên ưu tiên web-first assertion vào phần tử cụ thể thay vì chờ mạng chung.", en: "networkidle waits for the network to quiet; prefer web-first assertions on specific elements over generic waits.", ja: "networkidle はネットワークの静止を待ちます。汎用的な待機より特定要素へのウェブファーストアサーションを優先しましょう。" } },

  { cat: "iv-playwright",
    q: { vi: "test.describe.configure({ mode: 'parallel' }) trong một file có tác dụng gì?", en: "What does test.describe.configure({ mode: 'parallel' }) do inside a file?", ja: "ファイル内の test.describe.configure({ mode: 'parallel' }) は何をしますか？" },
    options: [
      { vi: "Cho phép các test trong cùng file/khối chạy song song trên nhiều worker", en: "Allows tests within the same file/block to run in parallel across workers", ja: "同じファイル/ブロック内のテストを複数ワーカーで並列実行できるようにする" },
      { vi: "Buộc chạy tuần tự", en: "Forces sequential execution", ja: "逐次実行を強制する" },
      { vi: "Tắt retries", en: "Disables retries", ja: "リトライを無効にする" },
      { vi: "Xóa fixtures", en: "Removes fixtures", ja: "フィクスチャを削除する" }
    ],
    answer: 0,
    exp: { vi: "Mặc định test trong một file chạy tuần tự; mode 'parallel' cho phép chúng chạy song song.", en: "By default tests in a file run sequentially; 'parallel' mode lets them run concurrently.", ja: "既定ではファイル内のテストは逐次実行され、'parallel' モードで並列実行できます。" } },

  { cat: "iv-playwright",
    q: { vi: "Việc expect trong Playwright 「poll」 nghĩa là gì?", en: "What does it mean that Playwright's expect polls?", ja: "Playwright の expect が「ポーリングする」とはどういう意味ですか？" },
    options: [
      { vi: "Nó gửi khảo sát cho người dùng", en: "It sends a survey to users", ja: "ユーザーにアンケートを送る" },
      { vi: "Nó lặp lại việc kiểm tra điều kiện định kỳ cho tới khi đạt hoặc hết timeout", en: "It repeatedly checks the condition periodically until it passes or times out", ja: "条件を定期的に繰り返し確認し、成功するかタイムアウトするまで続ける" },
      { vi: "Nó bỏ phiếu chọn locator", en: "It votes to choose a locator", ja: "ロケーターを投票で選ぶ" },
      { vi: "Nó chỉ kiểm tra đúng một lần", en: "It checks exactly once", ja: "ちょうど 1 回だけ確認する" }
    ],
    answer: 1,
    exp: { vi: "Cơ chế polling khiến assertion tự chờ UI cập nhật, giảm test flaky trong ứng dụng bất đồng bộ.", en: "The polling mechanism makes assertions wait for the UI to update, reducing flakiness in async apps.", ja: "ポーリング機構によりアサーションは UI 更新を待ち、非同期アプリのフレーキーさを減らします。" } },

  { cat: "iv-playwright",
    q: { vi: "Đặt fullyParallel: true trong config có nghĩa gì?", en: "What does fullyParallel: true in config mean?", ja: "設定の fullyParallel: true は何を意味しますか？" },
    options: [
      { vi: "Chỉ một worker được dùng", en: "Only one worker is used", ja: "1 ワーカーのみ使う" },
      { vi: "Tắt hoàn toàn song song", en: "Disable parallelism entirely", ja: "並列を完全に無効化する" },
      { vi: "Tất cả test trong mọi file đều đủ điều kiện chạy song song với nhau", en: "All tests in every file are eligible to run in parallel with each other", ja: "すべてのファイルの全テストが互いに並列実行の対象になる" },
      { vi: "Chỉ song song trên máy nhiều CPU", en: "Parallel only on many-CPU machines", ja: "多 CPU マシンでのみ並列にする" }
    ],
    answer: 2,
    exp: { vi: "fullyParallel cho phép cả test trong cùng một file chạy song song, tối đa hóa mức song song hoá.", en: "fullyParallel lets even tests within the same file run in parallel, maximizing concurrency.", ja: "fullyParallel は同じファイル内のテストも並列実行でき、並列度を最大化します。" } },

  { cat: "iv-playwright",
    q: { vi: "toHaveScreenshot với tùy chọn fullPage: true chụp gì?", en: "What does toHaveScreenshot with fullPage: true capture?", ja: "fullPage: true 付きの toHaveScreenshot は何をキャプチャしますか？" },
    options: [
      { vi: "Chỉ vùng nhìn thấy (viewport)", en: "Only the visible viewport", ja: "表示中のビューポートのみ" },
      { vi: "Chỉ một phần tử", en: "Only one element", ja: "1 つの要素のみ" },
      { vi: "Chỉ header trang", en: "Only the page header", ja: "ページヘッダーのみ" },
      { vi: "Toàn bộ chiều dài trang, kể cả phần phải cuộn mới thấy", en: "The entire scrollable page length, including off-screen parts", ja: "スクロールしないと見えない部分を含むページ全体の長さ" }
    ],
    answer: 3,
    exp: { vi: "fullPage chụp cả nội dung ngoài viewport; ảnh này được dùng để so khớp trực quan (visual comparison).", en: "fullPage captures content beyond the viewport; the image is used for visual comparison.", ja: "fullPage はビューポート外の内容も撮影し、この画像はビジュアル比較に使われます。" } },

  { cat: "iv-playwright",
    q: { vi: "video: 'on' khác 'retain-on-failure' ở chỗ nào?", en: "How does video: 'on' differ from 'retain-on-failure'?", ja: "video: 'on' は 'retain-on-failure' とどう違いますか？" },
    options: [
      { vi: "'on' quay và giữ video cho mọi test, kể cả test đạt", en: "'on' records and keeps video for every test, including passing ones", ja: "'on' は成功を含むすべてのテストで動画を録画・保持する" },
      { vi: "'on' không quay gì", en: "'on' records nothing", ja: "'on' は何も録画しない" },
      { vi: "'on' chỉ quay khi retry", en: "'on' records only on retry", ja: "'on' はリトライ時のみ録画する" },
      { vi: "Cả hai giống nhau", en: "Both are the same", ja: "両者は同じ" }
    ],
    answer: 0,
    exp: { vi: "'on' giữ video mọi test (tốn dung lượng), còn 'retain-on-failure' chỉ giữ video test lỗi.", en: "'on' keeps videos for all tests (uses storage), while 'retain-on-failure' keeps only failing ones.", ja: "'on' は全テストの動画を保持し（容量消費）、'retain-on-failure' は失敗分のみ保持します。" } },

  { cat: "iv-playwright",
    q: { vi: "Lệnh playwright codegen thường được dùng cho mục đích nào?", en: "The playwright codegen command is commonly used for what purpose?", ja: "playwright codegen コマンドは一般的にどんな目的で使われますか？" },
    options: [
      { vi: "Chạy toàn bộ suite trên CI", en: "Run the whole suite on CI", ja: "CI で全スイートを実行する" },
      { vi: "Nhanh chóng ghi lại các bước và gợi ý locator để làm bản nháp test ban đầu", en: "Quickly record steps and suggest locators to draft an initial test", ja: "手順を素早く記録しロケーターを提案して初期テストの下書きを作る" },
      { vi: "Tự động deploy ứng dụng", en: "Auto-deploy the application", ja: "アプリを自動デプロイする" },
      { vi: "Xóa cache trình duyệt", en: "Clear browser cache", ja: "ブラウザーキャッシュを削除する" }
    ],
    answer: 1,
    exp: { vi: "Codegen tăng tốc viết nháp; sau đó cần lọc locator theo vai trò/nhãn để test bền hơn.", en: "Codegen speeds up drafting; afterward refine locators to roles/labels for more robust tests.", ja: "コードジェンは下書きを加速します。その後ロール/ラベルへロケーターを調整して堅牢にします。" } },

  { cat: "iv-playwright",
    q: { vi: "globalSetup trong Playwright dùng để làm gì?", en: "What is globalSetup in Playwright used for?", ja: "Playwright の globalSetup は何に使いますか？" },
    options: [
      { vi: "Đặt màu cho reporter", en: "Set the reporter color", ja: "レポーターの色を設定する" },
      { vi: "Đổi tên test", en: "Rename tests", ja: "テスト名を変更する" },
      { vi: "Chạy một hàm một lần trước toàn bộ test suite, ví dụ để chuẩn bị dữ liệu hoặc đăng nhập lấy storageState", en: "Run a function once before the whole suite, e.g. to seed data or log in to obtain storageState", ja: "スイート全体の前に関数を 1 回実行する（例：データ準備や storageState 取得のためのログイン）" },
      { vi: "Tự động sửa test lỗi", en: "Auto-fix failing tests", ja: "失敗テストを自動修正する" }
    ],
    answer: 2,
    exp: { vi: "globalSetup thực hiện chuẩn bị dùng chung một lần; kết quả (như storageState) được các project tái sử dụng.", en: "globalSetup performs one-time shared preparation; results (like storageState) are reused by projects.", ja: "globalSetup は 1 回限りの共通準備を行い、その結果（storageState など）を各プロジェクトが再利用します。" } },

  { cat: "iv-playwright",
    q: { vi: "Khối 「use」 trong config/describe dùng để làm gì?", en: "What is the use block in config/describe for?", ja: "設定/describe の「use」ブロックは何のためですか？" },
    options: [
      { vi: "Import thư viện", en: "Import libraries", ja: "ライブラリをインポートする" },
      { vi: "Định nghĩa hook", en: "Define hooks", ja: "フックを定義する" },
      { vi: "Viết assertion", en: "Write assertions", ja: "アサーションを書く" },
      { vi: "Đặt các tùy chọn cho fixture/môi trường như viewport, locale, baseURL, storageState cho phạm vi đó", en: "Set options for fixtures/environment like viewport, locale, baseURL, storageState for that scope", ja: "その範囲の viewport、locale、baseURL、storageState などフィクスチャ/環境のオプションを設定する" }
    ],
    answer: 3,
    exp: { vi: "use cấu hình các tùy chọn môi trường test ở cấp global, project hoặc describe cụ thể.", en: "use configures test environment options at global, project, or specific describe scope.", ja: "use はグローバル・プロジェクト・特定 describe の範囲でテスト環境オプションを設定します。" } },

  { cat: "iv-playwright",
    q: { vi: "getByLabel định vị phần tử theo cách nào?", en: "How does getByLabel locate an element?", ja: "getByLabel はどのように要素を特定しますか？" },
    options: [
      { vi: "Theo nhãn (label) liên kết với trường nhập, phản ánh cách người dùng nhận diện input", en: "By the label associated with a form control, reflecting how users identify the input", ja: "フォームコントロールに関連付けられたラベルで特定し、ユーザーが入力欄を認識する方法を反映する" },
      { vi: "Theo màu nền", en: "By background color", ja: "背景色で" },
      { vi: "Theo thứ tự tab", en: "By tab order", ja: "タブ順で" },
      { vi: "Theo kích thước phần tử", en: "By element size", ja: "要素サイズで" }
    ],
    answer: 0,
    exp: { vi: "getByLabel dùng cho form control, bền và thân thiện với accessibility, ưu tiên hơn selector CSS mong manh.", en: "getByLabel targets form controls, is robust and accessibility-friendly, preferred over fragile CSS selectors.", ja: "getByLabel はフォームコントロール向けで堅牢かつアクセシビリティに優しく、壊れやすい CSS セレクターより好まれます。" } },

  { cat: "iv-playwright",
    q: { vi: "Kiểm thử trực quan (visual) với toHaveScreenshot hoạt động thế nào ở lần chạy đầu?", en: "How does visual testing with toHaveScreenshot behave on the first run?", ja: "toHaveScreenshot によるビジュアルテストは初回実行時どう動作しますか？" },
    options: [
      { vi: "Luôn thất bại lần đầu", en: "Always fails the first time", ja: "初回は必ず失敗する" },
      { vi: "Tạo ảnh baseline (mốc) rồi các lần sau so sánh với baseline đó", en: "Creates a baseline image, then later runs compare against that baseline", ja: "ベースライン画像を作成し、以降の実行はそのベースラインと比較する" },
      { vi: "Chỉ so sánh văn bản", en: "Compares text only", ja: "テキストのみ比較する" },
      { vi: "Bỏ qua ảnh và chỉ log", en: "Skips images and only logs", ja: "画像を無視してログのみ出す" }
    ],
    answer: 1,
    exp: { vi: "Lần đầu tạo baseline; sau đó so pixel với ngưỡng cho phép, cần chú ý ổn định môi trường render.", en: "The first run creates a baseline; later runs diff pixels within a threshold, so a stable render environment matters.", ja: "初回はベースラインを作成し、以降は許容しきい値でピクセル比較するため、安定したレンダリング環境が重要です。" } },

  { cat: "iv-playwright",
    q: { vi: "test.step() được dùng để làm gì?", en: "What is test.step() used for?", ja: "test.step() は何に使いますか？" },
    options: [
      { vi: "Bỏ qua một bước", en: "Skip a step", ja: "ステップをスキップする" },
      { vi: "Tăng timeout", en: "Increase timeout", ja: "タイムアウトを増やす" },
      { vi: "Nhóm các thao tác thành bước có tên, giúp báo cáo và trace dễ đọc hơn", en: "Group actions into named steps to make reports and traces more readable", ja: "操作を名前付きステップにまとめ、レポートやトレースを読みやすくする" },
      { vi: "Chạy lại test", en: "Re-run the test", ja: "テストを再実行する" }
    ],
    answer: 2,
    exp: { vi: "test.step tạo cấu trúc rõ ràng trong báo cáo/trace, thuận tiện khi kịch bản có nhiều giai đoạn.", en: "test.step gives clear structure in reports/traces, handy when a scenario has multiple phases.", ja: "test.step はレポート/トレースに明確な構造を与え、多段階シナリオで便利です。" } },

  { cat: "iv-playwright",
    q: { vi: "locator.nth(1) trả về gì?", en: "What does locator.nth(1) return?", ja: "locator.nth(1) は何を返しますか？" },
    options: [
      { vi: "Phần tử đầu tiên", en: "The first element", ja: "最初の要素" },
      { vi: "Tất cả phần tử", en: "All elements", ja: "すべての要素" },
      { vi: "Phần tử cuối cùng", en: "The last element", ja: "最後の要素" },
      { vi: "Phần tử thứ hai (chỉ số bắt đầu từ 0)", en: "The second element (zero-based index)", ja: "2 番目の要素（0 始まりのインデックス）" }
    ],
    answer: 3,
    exp: { vi: "nth dùng chỉ số bắt đầu từ 0, nên nth(1) là phần tử thứ hai; first()/last() là lối tắt tiện lợi.", en: "nth is zero-based, so nth(1) is the second element; first()/last() are convenient shortcuts.", ja: "nth は 0 始まりで nth(1) は 2 番目の要素です。first()/last() は便利な近道です。" } },

  { cat: "iv-playwright",
    q: { vi: "Có thể chỉnh timeout mặc định cho web-first assertion ở đâu?", en: "Where can you configure the default timeout for web-first assertions?", ja: "ウェブファーストアサーションの既定タイムアウトはどこで設定できますか？" },
    options: [
      { vi: "Ở mục expect.timeout trong playwright.config", en: "Via expect.timeout in playwright.config", ja: "playwright.config の expect.timeout で" },
      { vi: "Không thể chỉnh được", en: "It cannot be changed", ja: "変更できない" },
      { vi: "Chỉ chỉnh qua biến môi trường của hệ điều hành", en: "Only via an OS environment variable", ja: "OS の環境変数でのみ" },
      { vi: "Chỉ trong từng câu lệnh click", en: "Only inside each click call", ja: "各 click 呼び出し内でのみ" }
    ],
    answer: 0,
    exp: { vi: "expect.timeout đặt thời gian chờ mặc định cho assertion; có thể ghi đè cục bộ bằng tùy chọn timeout.", en: "expect.timeout sets the default assertion wait; it can be overridden locally with a timeout option.", ja: "expect.timeout はアサーションの既定待機時間を設定し、timeout オプションで局所的に上書きできます。" } },

  { cat: "iv-playwright",
    q: { vi: "Cách quản lý xác thực tốt cho suite lớn là dùng một 「setup project」 phụ thuộc. Ý tưởng là gì?", en: "A good auth pattern for large suites uses a dependent setup project. What is the idea?", ja: "大規模スイートの良い認証パターンは依存する setup プロジェクトを使います。その考え方は？" },
    options: [
      { vi: "Đăng nhập lại trong từng test", en: "Log in again inside each test", ja: "各テスト内で毎回ログインする" },
      { vi: "Một project 'setup' đăng nhập trước và lưu storageState, các project test phụ thuộc nó và nạp state đó", en: "A 'setup' project logs in first and saves storageState; test projects depend on it and load that state", ja: "'setup' プロジェクトが先にログインして storageState を保存し、テストプロジェクトはそれに依存して state を読み込む" },
      { vi: "Tắt hết xác thực trên môi trường test", en: "Disable all auth in the test environment", ja: "テスト環境で認証をすべて無効化する" },
      { vi: "Lưu mật khẩu trong mã nguồn", en: "Store passwords in source code", ja: "パスワードをソースコードに保存する" }
    ],
    answer: 1,
    exp: { vi: "Mẫu setup project đăng nhập một lần và chia sẻ storageState qua dependencies, nhanh và dễ bảo trì.", en: "The setup-project pattern logs in once and shares storageState via dependencies, fast and maintainable.", ja: "setup プロジェクトパターンは一度ログインして依存関係経由で storageState を共有し、高速で保守しやすいです。" } },

  // ===================== iv-ai (50) =====================
  { cat: "iv-ai",
    q: { vi: "Cách dùng AI hợp lý nhất khi sinh test case từ tài liệu yêu cầu là gì?", en: "What is the most sensible way to use AI when generating test cases from requirements?", ja: "要件から테스트ケースを生成する際、AI を最も賢く使う方法は何ですか？" },
    options: [
      { vi: "Coi test case do AI sinh là bản nháp, sau đó tester rà soát, bổ sung ca biên và loại ca sai", en: "Treat AI-generated cases as a draft, then a tester reviews, adds edge cases, and removes wrong ones", ja: "AI 生成のケースを下書きとして扱い、テスターがレビューして境界ケースを追加し誤りを除く" },
      { vi: "Chạy thẳng test do AI sinh mà không xem lại", en: "Run AI-generated tests directly without review", ja: "AI 生成テストをレビューせずにそのまま実行する" },
      { vi: "Xóa hết yêu cầu và chỉ tin AI", en: "Discard the requirements and trust only AI", ja: "要件を捨てて AI のみを信じる" },
      { vi: "Chỉ dùng AI để đặt tên file", en: "Use AI only to name files", ja: "AI をファイル命名にのみ使う" }
    ],
    answer: 0,
    exp: { vi: "AI tăng tốc phác thảo nhưng con người phải kiểm định tính đúng, độ phủ và ca biên trước khi dùng.", en: "AI speeds up drafting, but humans must verify correctness, coverage and edge cases before use.", ja: "AI は下書きを加速しますが、使用前に人間が正確性・網羅性・境界ケースを検証する必要があります。" } },

  { cat: "iv-ai",
    q: { vi: "「Self-healing locators」 trong công cụ kiểm thử AI nghĩa là gì?", en: "What does self-healing locators mean in AI testing tools?", ja: "AI テストツールにおける「セルフヒーリングロケーター」とは何ですか？" },
    options: [
      { vi: "Locator tự mã hóa", en: "Locators that encrypt themselves", ja: "自己暗号化するロケーター" },
      { vi: "Khi selector cũ hỏng do UI thay đổi, công cụ tự đề xuất/dùng locator thay thế dựa trên thuộc tính khác", en: "When an old selector breaks due to UI changes, the tool suggests/uses an alternative locator from other attributes", ja: "UI 変更で古いセレクターが壊れたとき、ツールが他の属性から代替ロケーターを提案/使用する" },
      { vi: "Locator tự xóa khi lỗi", en: "Locators that delete themselves on error", ja: "エラー時に自己削除するロケーター" },
      { vi: "Locator chỉ hoạt động offline", en: "Locators that work only offline", ja: "オフラインでのみ動くロケーター" }
    ],
    answer: 1,
    exp: { vi: "Self-healing giảm bảo trì khi UI đổi, nhưng cần giám sát để tránh 「chữa nhầm」 che giấu lỗi thật.", en: "Self-healing reduces maintenance when UI changes, but needs oversight to avoid masking real defects.", ja: "セルフヒーリングは UI 変更時の保守を減らしますが、真のバグを隠す「誤修正」を避けるため監視が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "「Hallucination」 của mô hình ngôn ngữ lớn (LLM) trong bối cảnh test là gì?", en: "What is LLM hallucination in a testing context?", ja: "テストの文脈における大規模言語モデル（LLM）の「ハルシネーション」とは何ですか？" },
    options: [
      { vi: "Mô hình chạy quá chậm", en: "The model runs too slowly", ja: "モデルの動作が遅すぎる" },
      { vi: "Mô hình dùng quá nhiều bộ nhớ", en: "The model uses too much memory", ja: "モデルがメモリを使いすぎる" },
      { vi: "Mô hình tạo ra thông tin nghe hợp lý nhưng sai hoặc bịa, ví dụ API/hàm không tồn tại", en: "The model produces plausible-sounding but wrong or fabricated info, e.g. non-existent APIs/functions", ja: "モデルがもっともらしいが誤りや捏造の情報（例：存在しない API/関数）を生成する" },
      { vi: "Mô hình từ chối trả lời", en: "The model refuses to answer", ja: "モデルが回答を拒否する" }
    ],
    answer: 2,
    exp: { vi: "Hallucination khiến kết quả sai vẫn trông đáng tin; luôn kiểm chứng mã/khẳng định do AI tạo ra.", en: "Hallucination makes wrong output look trustworthy; always verify AI-produced code/claims.", ja: "ハルシネーションは誤った出力を信頼できそうに見せます。AI の生成コード/主張は必ず検証しましょう。" } },

  { cat: "iv-ai",
    q: { vi: "「Human-in-the-loop」 trong kiểm thử hỗ trợ bởi AI nhấn mạnh điều gì?", en: "What does human-in-the-loop emphasize in AI-assisted testing?", ja: "AI 支援テストにおける「ヒューマン・イン・ザ・ループ」は何を強調しますか？" },
    options: [
      { vi: "Loại bỏ hoàn toàn con người", en: "Removing humans entirely", ja: "人間を完全に排除すること" },
      { vi: "Để AI tự phê duyệt release", en: "Letting AI approve releases by itself", ja: "AI が自らリリースを承認すること" },
      { vi: "Chỉ dùng con người để gõ phím", en: "Using humans only to type", ja: "人間をタイピングのためだけに使うこと" },
      { vi: "Con người giữ vai trò xét duyệt, ra quyết định và chịu trách nhiệm với đầu ra của AI", en: "Humans keep the role of reviewing, deciding, and being accountable for AI output", ja: "人間がレビュー・意思決定を担い、AI の出力に責任を持つこと" }
    ],
    answer: 3,
    exp: { vi: "Human-in-the-loop bảo đảm chuyên gia kiểm soát chất lượng, đạo đức và rủi ro thay vì phó mặc cho AI.", en: "Human-in-the-loop ensures experts control quality, ethics and risk rather than deferring to AI.", ja: "ヒューマン・イン・ザ・ループは、AI に委ねるのではなく専門家が品質・倫理・リスクを管理することを保証します。" } },

  { cat: "iv-ai",
    q: { vi: "Khi dùng LLM để sinh dữ liệu test, rủi ro về quyền riêng tư cần lưu ý là gì?", en: "When using an LLM to generate test data, what privacy risk should you note?", ja: "LLM でテストデータを生成する際、注意すべきプライバシーリスクは何ですか？" },
    options: [
      { vi: "Không được dán dữ liệu cá nhân/nhạy cảm thật (PII) vào prompt gửi cho dịch vụ bên thứ ba", en: "Do not paste real personal/sensitive data (PII) into prompts sent to a third-party service", ja: "実際の個人/機微データ（PII）を第三者サービスへ送るプロンプトに貼らないこと" },
      { vi: "Dữ liệu sinh ra luôn quá ít", en: "Generated data is always too small", ja: "生成データは常に少なすぎる" },
      { vi: "LLM không thể sinh số", en: "LLMs cannot generate numbers", ja: "LLM は数値を生成できない" },
      { vi: "Dữ liệu test không cần đa dạng", en: "Test data need not be diverse", ja: "テストデータは多様である必要がない" }
    ],
    answer: 0,
    exp: { vi: "Nên dùng dữ liệu tổng hợp/ẩn danh; đừng gửi PII thật ra ngoài để tránh rò rỉ và vi phạm quy định.", en: "Use synthetic/anonymized data; never send real PII externally to avoid leaks and compliance breaches.", ja: "合成/匿名データを使い、漏洩や規制違反を避けるため実 PII を外部に送らないようにします。" } },

  { cat: "iv-ai",
    q: { vi: "Kiểm thử trực quan dựa trên AI (AI visual testing) hứa hẹn cải thiện điều gì so với so pixel cứng?", en: "AI-based visual testing promises to improve what over strict pixel diffing?", ja: "AI ベースのビジュアルテストは、厳密なピクセル差分に比べ何の改善を約束しますか？" },
    options: [
      { vi: "Loại bỏ mọi cần thiết phải test", en: "Removing any need to test", ja: "テストの必要性をなくすこと" },
      { vi: "Giảm cảnh báo giả (false positive) do khác biệt nhỏ không quan trọng, tập trung vào khác biệt có ý nghĩa", en: "Reducing false positives from tiny irrelevant differences and focusing on meaningful changes", ja: "些細で無関係な差分による誤検知を減らし、意味のある変化に集中すること" },
      { vi: "Bỏ hoàn toàn ảnh baseline", en: "Eliminating baseline images completely", ja: "ベースライン画像を完全に不要にすること" },
      { vi: "Tăng độ nhạy tới từng pixel tuyệt đối", en: "Increasing sensitivity to every absolute pixel", ja: "すべての絶対ピクセルへの感度を上げること" }
    ],
    answer: 1,
    exp: { vi: "AI visual cố phân biệt thay đổi có ý nghĩa với nhiễu render, giảm flaky; vẫn cần người xác nhận kết quả.", en: "AI visual tries to tell meaningful change from render noise, reducing flakiness; humans still confirm results.", ja: "AI ビジュアルは意味ある変化とレンダリングノイズを区別しフレーキーさを減らしますが、結果確認には人間が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Một prompt tốt để nhờ AI viết test nên có đặc điểm nào?", en: "A good prompt for asking AI to write tests should have which trait?", ja: "AI にテストを書かせる良いプロンプトが持つべき特徴はどれですか？" },
    options: [
      { vi: "Càng mơ hồ càng tốt", en: "As vague as possible", ja: "できるだけ曖昧に" },
      { vi: "Không cung cấp bối cảnh nào", en: "Provide no context at all", ja: "文脈を一切与えない" },
      { vi: "Nêu rõ bối cảnh, framework, tiêu chí chấp nhận, ràng buộc và ví dụ đầu ra mong muốn", en: "State context, framework, acceptance criteria, constraints and an example of the desired output", ja: "文脈・フレームワーク・受け入れ基準・制約・望む出力例を明確に示す" },
      { vi: "Chỉ gồm một từ", en: "Contain only one word", ja: "1 単語のみ含む" }
    ],
    answer: 2,
    exp: { vi: "Prompt cụ thể, có ngữ cảnh và tiêu chí giúp AI cho kết quả sát nhu cầu và dễ kiểm chứng hơn.", en: "Specific prompts with context and criteria yield output closer to needs and easier to verify.", ja: "文脈と基準を伴う具体的なプロンプトは、要求に近く検証しやすい出力を生みます。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao phải rà soát (review) mã test do AI sinh trước khi đưa vào suite?", en: "Why must you review AI-generated test code before adding it to the suite?", ja: "AI が生成したテストコードをスイートに追加する前にレビューすべき理由は？" },
    options: [
      { vi: "Vì AI luôn viết sai cú pháp", en: "Because AI always writes wrong syntax", ja: "AI は常に構文を間違えるから" },
      { vi: "Vì review là thủ tục vô nghĩa", en: "Because review is a meaningless formality", ja: "レビューは無意味な形式だから" },
      { vi: "Vì AI không thể chạy test", en: "Because AI cannot run tests", ja: "AI はテストを実行できないから" },
      { vi: "Vì có thể có assertion yếu, test luôn xanh, mock che lỗi hoặc logic sai không phát hiện được", en: "Because it may contain weak assertions, always-green tests, masking mocks, or wrong logic that go unnoticed", ja: "弱いアサーション、常に成功するテスト、バグを隠すモック、誤ったロジックが潜む可能性があるから" }
    ],
    answer: 3,
    exp: { vi: "Test 「xanh giả」 hoặc assertion hời hợt do AI sinh có thể tạo cảm giác an toàn sai; review là bắt buộc.", en: "AI-produced falsely-green tests or shallow assertions can create false confidence; review is mandatory.", ja: "AI 生成の偽の成功テストや浅いアサーションは誤った安心感を生むため、レビューは必須です。" } },

  { cat: "iv-ai",
    q: { vi: "RAG (Retrieval-Augmented Generation) giúp trợ lý AI cho đội test như thế nào?", en: "How does RAG (Retrieval-Augmented Generation) help an AI assistant for a test team?", ja: "RAG（検索拡張生成）はテストチームの AI アシスタントをどう助けますか？" },
    options: [
      { vi: "Truy xuất tài liệu nội bộ (yêu cầu, test plan) rồi đưa vào ngữ cảnh, giúp câu trả lời bám sát dữ liệu thật", en: "Retrieves internal docs (requirements, test plans) into context so answers stay grounded in real data", ja: "社内文書（要件、テスト計画）を検索して文脈に入れ、回答を実データに基づかせる" },
      { vi: "Tăng tốc độ CPU", en: "Speeds up the CPU", ja: "CPU を高速化する" },
      { vi: "Xóa nhu cầu prompt", en: "Removes the need for prompts", ja: "プロンプトの必要をなくす" },
      { vi: "Thay thế toàn bộ tester", en: "Replaces all testers", ja: "すべてのテスターを置き換える" }
    ],
    answer: 0,
    exp: { vi: "RAG bổ sung ngữ cảnh từ nguồn đáng tin, giảm bịa và giúp câu trả lời khớp tài liệu dự án.", en: "RAG adds context from trusted sources, reducing fabrication and aligning answers with project docs.", ja: "RAG は信頼できる情報源から文脈を補い、捏造を減らしプロジェクト文書に沿った回答にします。" } },

  { cat: "iv-ai",
    q: { vi: "AI có thể hỗ trợ 「bug triage」 (phân loại lỗi) theo cách nào?", en: "How can AI assist with bug triage?", ja: "AI はどのように「バグトリアージ」を支援できますか？" },
    options: [
      { vi: "Tự động vá mọi lỗi mà không cần code", en: "Auto-patch every bug without code", ja: "コードなしですべてのバグを自動修正する" },
      { vi: "Gợi ý mức độ ưu tiên, gom nhóm bug trùng, tóm tắt và đề xuất người phụ trách để con người quyết định cuối", en: "Suggest priority, group duplicate bugs, summarize, and propose an assignee for humans to finalize", ja: "優先度の提案、重複バグのグルーピング、要約、担当者候補の提示を行い、最終判断は人間が下す" },
      { vi: "Xóa các bug khó", en: "Delete difficult bugs", ja: "難しいバグを削除する" },
      { vi: "Đóng tất cả bug tự động", en: "Close all bugs automatically", ja: "すべてのバグを自動でクローズする" }
    ],
    answer: 1,
    exp: { vi: "AI có thể phân nhóm và gợi ý ưu tiên/gán người, nhưng quyết định cuối vẫn thuộc con người.", en: "AI can cluster and suggest priority/assignment, but final decisions remain with humans.", ja: "AI は分類し優先度/担当を提案できますが、最終決定は人間が行います。" } },

  { cat: "iv-ai",
    q: { vi: "Để đánh giá độ tin cậy đầu ra của một mô hình AI dùng trong test, cách nào hợp lý?", en: "To evaluate the reliability of an AI model's output used in testing, what is a sound approach?", ja: "テストで使う AI モデルの出力の信頼性を評価する妥当な方法は？" },
    options: [
      { vi: "Giả định luôn đúng", en: "Assume it is always correct", ja: "常に正しいと仮定する" },
      { vi: "Chỉ nhìn giao diện đẹp", en: "Just check that the UI looks nice", ja: "UI がきれいかだけ見る" },
      { vi: "Đối chiếu với bộ dữ liệu chuẩn (ground truth), đo tỉ lệ đúng/sai và theo dõi theo thời gian", en: "Compare against a ground-truth set, measure correct/incorrect rates, and track over time", ja: "正解データ（グラウンドトゥルース）と照合し、正誤率を測定し経時的に追跡する" },
      { vi: "Đếm số dòng đầu ra", en: "Count output lines", ja: "出力行数を数える" }
    ],
    answer: 2,
    exp: { vi: "Cần thước đo khách quan dựa trên ground truth và giám sát theo thời gian, vì mô hình có thể trôi (drift).", en: "Objective metrics against ground truth plus ongoing monitoring are needed, since models can drift.", ja: "モデルはドリフトしうるため、グラウンドトゥルースに基づく客観指標と継続監視が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Cân nhắc đạo đức/pháp lý nào quan trọng khi đưa dữ liệu công ty vào công cụ AI ngoài?", en: "Which ethical/legal consideration matters when feeding company data into an external AI tool?", ja: "社内データを外部 AI ツールに入れる際に重要な倫理的/法的考慮は？" },
    options: [
      { vi: "Màu logo của công cụ", en: "The tool's logo color", ja: "ツールのロゴの色" },
      { vi: "Tốc độ gõ của người dùng", en: "The user's typing speed", ja: "ユーザーのタイピング速度" },
      { vi: "Phông chữ trong báo cáo", en: "The font in the report", ja: "レポートのフォント" },
      { vi: "Bảo mật dữ liệu, tuân thủ hợp đồng/quy định và chính sách lưu trữ của nhà cung cấp AI", en: "Data confidentiality, contractual/regulatory compliance, and the AI vendor's data retention policy", ja: "データ機密性、契約/規制順守、AI ベンダーのデータ保持ポリシー" }
    ],
    answer: 3,
    exp: { vi: "Trước khi gửi dữ liệu, phải xét bảo mật, tuân thủ và cách nhà cung cấp lưu/dùng dữ liệu đó.", en: "Before sending data, weigh confidentiality, compliance, and how the vendor stores/uses that data.", ja: "データ送信前に、機密性・順守・ベンダーのデータ保持/利用方法を検討する必要があります。" } },

  { cat: "iv-ai",
    q: { vi: "Nhận định nào đúng về vai trò của AI với tư duy kiểm thử (test thinking) của con người?", en: "Which statement is true about AI's role versus human test thinking?", ja: "AI の役割と人間のテスト思考について正しい記述はどれですか？" },
    options: [
      { vi: "AI hỗ trợ tăng năng suất nhưng chưa thay được tư duy phản biện, hiểu ngữ cảnh và đánh giá rủi ro của con người", en: "AI boosts productivity but does not replace human critical thinking, context understanding and risk judgment", ja: "AI は生産性を高めるが、人間の批判的思考・文脈理解・リスク判断を置き換えはしない" },
      { vi: "AI đã thay thế hoàn toàn tester", en: "AI has fully replaced testers", ja: "AI はテスターを完全に置き換えた" },
      { vi: "AI không có ích gì cho test", en: "AI is useless for testing", ja: "AI はテストに全く役立たない" },
      { vi: "AI chỉ dùng để in báo cáo", en: "AI is only for printing reports", ja: "AI はレポート印刷にのみ使う" }
    ],
    answer: 0,
    exp: { vi: "AI là công cụ khuếch đại; đánh giá rủi ro, hiểu nghiệp vụ và phản biện vẫn cần con người dẫn dắt.", en: "AI is an amplifier; risk assessment, domain understanding and critique still need human leadership.", ja: "AI は増幅装置であり、リスク評価・業務理解・批判は依然として人間の主導が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "AI có thể giúp phát hiện test 「flaky」 bằng cách nào?", en: "How can AI help detect flaky tests?", ja: "AI はどのように「フレーキー」テストの検出を助けますか？" },
    options: [
      { vi: "Bằng cách xóa mọi test chậm", en: "By deleting all slow tests", ja: "遅いテストをすべて削除して" },
      { vi: "Phân tích lịch sử chạy để nhận diện test lúc đạt lúc rớt bất định và gợi ý nguyên nhân/nhóm liên quan", en: "Analyzing run history to spot tests that pass/fail nondeterministically and suggest likely causes/clusters", ja: "実行履歴を分析し、非決定的に成功/失敗するテストを見つけ、原因/クラスターを提案して" },
      { vi: "Bằng cách tắt retries", en: "By disabling retries", ja: "リトライを無効化して" },
      { vi: "Bằng cách tăng timeout vô hạn", en: "By setting infinite timeouts", ja: "タイムアウトを無限にして" }
    ],
    answer: 1,
    exp: { vi: "Phân tích dữ liệu lịch sử chạy giúp khoanh vùng test bất định; con người vẫn cần xác nhận và sửa gốc.", en: "Analyzing historical run data helps flag nondeterministic tests; humans still confirm and fix root causes.", ja: "実行履歴データの分析は非決定的テストの特定に役立ちますが、根本原因の確認と修正は人間が行います。" } },

  { cat: "iv-ai",
    q: { vi: "Nguyên tắc 「specificity」 (cụ thể) trong prompt cho AI test đề cập điều gì?", en: "What does the specificity principle in prompts for AI testing refer to?", ja: "AI テスト用プロンプトにおける「具体性」の原則は何を指しますか？" },
    options: [
      { vi: "Viết prompt bằng nhiều ngôn ngữ", en: "Writing prompts in many languages", ja: "多言語でプロンプトを書くこと" },
      { vi: "Dùng thật nhiều biểu tượng cảm xúc", en: "Using many emojis", ja: "多くの絵文字を使うこと" },
      { vi: "Nêu rõ đầu vào, đầu ra mong đợi, ràng buộc và tiêu chí để giảm mơ hồ và kết quả sai lệch", en: "Stating clear inputs, expected outputs, constraints and criteria to reduce ambiguity and drift", ja: "入力・期待出力・制約・基準を明確にし、曖昧さや逸脱を減らすこと" },
      { vi: "Giữ prompt ngắn nhất có thể bất kể ý nghĩa", en: "Keeping prompts shortest regardless of meaning", ja: "意味を問わず最短にすること" }
    ],
    answer: 2,
    exp: { vi: "Prompt cụ thể giới hạn không gian trả lời, giúp AI bám đúng yêu cầu và dễ đánh giá kết quả.", en: "Specific prompts constrain the answer space, keeping AI on target and results easier to evaluate.", ja: "具体的なプロンプトは回答空間を制限し、AI を要求に沿わせ結果評価を容易にします。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao đầu ra của cùng một LLM cho cùng một prompt có thể khác nhau giữa các lần?", en: "Why can the same LLM produce different outputs for the same prompt across runs?", ja: "同じ LLM が同じプロンプトに対し実行ごとに異なる出力を出しうるのはなぜ？" },
    options: [
      { vi: "Vì mạng luôn hỏng", en: "Because the network always fails", ja: "ネットワークが必ず落ちるから" },
      { vi: "Vì prompt tự đổi", en: "Because the prompt changes itself", ja: "プロンプトが自ら変わるから" },
      { vi: "Vì bàn phím khác nhau", en: "Because keyboards differ", ja: "キーボードが違うから" },
      { vi: "Vì sinh văn bản có yếu tố ngẫu nhiên (ví dụ nhiệt độ/sampling), nên không hoàn toàn tất định", en: "Because generation has randomness (e.g. temperature/sampling), so it is not fully deterministic", ja: "生成には乱数性（温度/サンプリング）があり完全に決定的ではないから" }
    ],
    answer: 3,
    exp: { vi: "Tính không tất định của LLM đòi hỏi kiểm thử cần chiến lược đánh giá ổn định, không giả định đầu ra cố định.", en: "LLM non-determinism means testing needs robust evaluation strategies, not assuming fixed output.", ja: "LLM の非決定性のため、テストは固定出力を前提にせず堅牢な評価戦略が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "「Test oracle problem」 trở nên khó hơn khi kiểm thử tính năng do AI tạo vì lý do gì?", en: "Why does the test oracle problem get harder when testing AI-generated features?", ja: "AI 生成機能をテストする際、「テストオラクル問題」が難しくなる理由は？" },
    options: [
      { vi: "Đầu ra AI có thể đúng theo nhiều cách, khó định nghĩa một kết quả 「đúng」 duy nhất để so sánh", en: "AI output can be valid in many ways, making it hard to define a single correct result to compare against", ja: "AI の出力は多様に妥当でありうるため、比較すべき唯一の「正解」を定義しにくい" },
      { vi: "Vì AI không có đầu ra", en: "Because AI has no output", ja: "AI に出力がないから" },
      { vi: "Vì oracle luôn là số nguyên", en: "Because an oracle is always an integer", ja: "オラクルは常に整数だから" },
      { vi: "Vì không cần so sánh gì cả", en: "Because no comparison is ever needed", ja: "比較が一切不要だから" }
    ],
    answer: 0,
    exp: { vi: "Với đầu ra mở, cần oracle dựa trên thuộc tính/tiêu chí (property-based) thay vì so khớp chính xác một giá trị.", en: "For open-ended output, use property/criteria-based oracles rather than exact-value matching.", ja: "オープンエンドな出力には、完全一致でなく特性/基準ベースのオラクルを使います。" } },

  { cat: "iv-ai",
    q: { vi: "Dùng AI để review test hiện có mang lại giá trị gì?", en: "What value does using AI to review existing tests provide?", ja: "既存テストのレビューに AI を使う価値は何ですか？" },
    options: [
      { vi: "Bảo đảm không còn lỗi nào", en: "Guarantees zero remaining bugs", ja: "バグゼロを保証する" },
      { vi: "Gợi ý điểm yếu như thiếu assertion, ca biên bị bỏ sót, hoặc trùng lặp để người xem xét", en: "Suggests weaknesses like missing assertions, uncovered edge cases, or duplication for humans to consider", ja: "アサーション不足、未カバーの境界ケース、重複などの弱点を提案し人間が検討する" },
      { vi: "Tự động merge vào nhánh chính", en: "Auto-merges into the main branch", ja: "自動でメインブランチにマージする" },
      { vi: "Thay thế mọi code review của người", en: "Replaces all human code review", ja: "人間のコードレビューをすべて置き換える" }
    ],
    answer: 1,
    exp: { vi: "AI có thể chỉ ra khả năng thiếu sót và gợi ý cải thiện, nhưng không đảm bảo tuyệt đối và không thay người quyết.", en: "AI can point out potential gaps and improvements but offers no absolute guarantee and does not replace human decisions.", ja: "AI は潜在的な抜けや改善を指摘できますが、絶対的保証はなく人間の判断を置き換えません。" } },

  { cat: "iv-ai",
    q: { vi: "Khi tạo dữ liệu tổng hợp (synthetic) thay cho dữ liệu thật, lợi ích chính về tuân thủ là gì?", en: "When generating synthetic data instead of real data, what is the main compliance benefit?", ja: "実データの代わりに合成データを生成する際の、順守面の主な利点は？" },
    options: [
      { vi: "Dữ liệu chạy nhanh hơn", en: "Data runs faster", ja: "データの実行が速くなる" },
      { vi: "Không cần schema", en: "No schema is needed", ja: "スキーマが不要になる" },
      { vi: "Tránh phơi bày PII thật, giảm rủi ro vi phạm quyền riêng tư trong môi trường test", en: "Avoids exposing real PII, reducing privacy-violation risk in test environments", ja: "実 PII の露出を避け、テスト環境でのプライバシー侵害リスクを減らす" },
      { vi: "Bảo đảm phủ 100% code", en: "Guarantees 100% code coverage", ja: "コードカバレッジ 100% を保証する" }
    ],
    answer: 2,
    exp: { vi: "Dữ liệu tổng hợp giữ tính đại diện mà không lộ thông tin cá nhân thật, giảm rủi ro pháp lý.", en: "Synthetic data stays representative without exposing real personal info, lowering legal risk.", ja: "合成データは実個人情報を露出せず代表性を保ち、法的リスクを下げます。" } },

  { cat: "iv-ai",
    q: { vi: "「Confidence score」 mà một công cụ AI đưa ra nên được hiểu như thế nào?", en: "How should a confidence score from an AI tool be interpreted?", ja: "AI ツールが出す「信頼度スコア」はどう解釈すべきですか？" },
    options: [
      { vi: "Là bằng chứng tuyệt đối rằng kết quả đúng", en: "As absolute proof the result is correct", ja: "結果が正しいという絶対的証拠として" },
      { vi: "Là thứ có thể bỏ qua hoàn toàn", en: "As something to ignore entirely", ja: "完全に無視してよいものとして" },
      { vi: "Là điểm số duy nhất quyết định release", en: "As the sole metric to decide releases", ja: "リリースを決める唯一の指標として" },
      { vi: "Là chỉ dấu tham khảo về độ chắc chắn của mô hình, không đảm bảo tính đúng, cần con người kiểm định", en: "As a reference signal of the model's certainty, not a guarantee of correctness, needing human verification", ja: "モデルの確信度を示す参考シグナルで、正確性の保証ではなく人間の検証が必要" }
    ],
    answer: 3,
    exp: { vi: "Confidence chỉ phản ánh mức chắc chắn nội tại của mô hình; nó có thể sai nên vẫn cần xác minh độc lập.", en: "Confidence reflects the model's internal certainty; it can be wrong, so independent verification is still needed.", ja: "信頼度はモデル内部の確信度を示すだけで誤りうるため、独立した検証が依然必要です。" } },

  { cat: "iv-ai",
    q: { vi: "AI hỗ trợ kiểm thử thăm dò (exploratory testing) hiệu quả nhất khi nào?", en: "AI supports exploratory testing most effectively when?", ja: "AI が探索的テストを最も効果的に支援するのはどんなときですか？" },
    options: [
      { vi: "Khi thay tester ra mọi quyết định", en: "When it makes every decision for the tester", ja: "テスターの代わりに全決定を下すとき" },
      { vi: "Khi gợi ý ý tưởng kịch bản, vùng rủi ro và biến thể đầu vào để tester tự khám phá sâu hơn", en: "When it suggests scenario ideas, risk areas and input variations for the tester to explore deeper", ja: "シナリオの発想、リスク領域、入力バリエーションを提案しテスターが深く探索できるようにするとき" },
      { vi: "Khi vô hiệu hóa trực giác của tester", en: "When it disables the tester's intuition", ja: "テスターの直感を無効化するとき" },
      { vi: "Khi chỉ chạy test hồi quy", en: "When it only runs regression tests", ja: "回帰テストのみ実行するとき" }
    ],
    answer: 1,
    exp: { vi: "AI như 「bạn cùng brainstorm」 mở rộng ý tưởng, còn tester dẫn dắt khám phá và đánh giá phát hiện.", en: "AI acts as a brainstorming partner to broaden ideas, while the tester drives exploration and judges findings.", ja: "AI はアイデアを広げるブレスト相手として働き、テスターが探索を主導し発見を評価します。" } },

  { cat: "iv-ai",
    q: { vi: "Rủi ro khi tin tưởng quá mức (automation bias) vào gợi ý của AI trong test là gì?", en: "What is the risk of automation bias, over-trusting AI suggestions in testing?", ja: "テストで AI の提案を過信する「自動化バイアス」のリスクは何ですか？" },
    options: [
      { vi: "Tester bỏ qua phán đoán của mình và chấp nhận cả gợi ý sai, làm lọt lỗi", en: "The tester defers judgment and accepts even wrong suggestions, letting defects slip through", ja: "テスターが自分の判断を捨て誤った提案まで受け入れ、欠陥を見逃す" },
      { vi: "Test chạy chậm hơn", en: "Tests run slower", ja: "テストが遅くなる" },
      { vi: "Báo cáo bị đổi màu", en: "Reports change color", ja: "レポートの色が変わる" },
      { vi: "Không có rủi ro nào", en: "There is no risk", ja: "リスクはない" }
    ],
    answer: 0,
    exp: { vi: "Automation bias khiến người bỏ qua kiểm chứng; cần duy trì thái độ hoài nghi và xác minh gợi ý AI.", en: "Automation bias makes people skip verification; keep a skeptical stance and verify AI suggestions.", ja: "自動化バイアスは検証を省かせます。懐疑的姿勢を保ち AI の提案を検証しましょう。" } },

  { cat: "iv-ai",
    q: { vi: "Khi AI đề xuất sửa một locator hỏng (self-heal), thực hành tốt là gì?", en: "When AI proposes to fix a broken locator (self-heal), what is good practice?", ja: "AI が壊れたロケーターの修正（セルフヒール）を提案するとき、良い実践は？" },
    options: [
      { vi: "Luôn tự động áp dụng mà không ghi log", en: "Always auto-apply without logging", ja: "ログなしで常に自動適用する" },
      { vi: "Ghi lại thay đổi và cho người xem xét, vì UI đổi có thể là dấu hiệu lỗi thật cần điều tra", en: "Log the change and let a human review, since a UI change may signal a real defect to investigate", ja: "変更を記録し人間がレビューする。UI 変更は調査すべき真のバグの兆候かもしれないから" },
      { vi: "Xóa test đó đi", en: "Delete that test", ja: "そのテストを削除する" },
      { vi: "Bỏ qua và không chạy", en: "Skip and never run it", ja: "スキップして実行しない" }
    ],
    answer: 1,
    exp: { vi: "Self-heal cần minh bạch: log lại và review để không vô tình che giấu thay đổi UI ngoài ý muốn.", en: "Self-heal must be transparent: log and review so unintended UI changes are not silently masked.", ja: "セルフヒールは透明であるべきで、意図しない UI 変更を隠さぬようログとレビューが必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Cách kiểm thử một tính năng chatbot dùng LLM về mặt hành vi nên tập trung vào gì?", en: "Testing an LLM-powered chatbot feature should focus on what, behaviorally?", ja: "LLM 搭載チャットボット機能のテストは、振る舞いの面で何に注力すべきですか？" },
    options: [
      { vi: "Chỉ so khớp đúng từng ký tự đầu ra", en: "Only exact character-by-character output matching", ja: "文字単位の完全一致のみ" },
      { vi: "Chỉ đo tốc độ gõ", en: "Only measuring typing speed", ja: "タイピング速度のみ測定" },
      { vi: "Chỉ kiểm tra màu chữ", en: "Only checking font color", ja: "文字色のみ確認" },
      { vi: "Các thuộc tính như tính liên quan, an toàn nội dung, không rò rỉ dữ liệu và xử lý đầu vào xấu, thay vì khớp chính xác", en: "Properties like relevance, content safety, no data leakage, and handling bad input, rather than exact matching", ja: "完全一致でなく、関連性・コンテンツ安全性・情報漏洩なし・不正入力処理などの特性" }
    ],
    answer: 3,
    exp: { vi: "Với đầu ra sinh, kiểm thử theo thuộc tính/an toàn phù hợp hơn so khớp chuỗi cứng nhắc.", en: "For generative output, property/safety-based testing suits better than rigid string matching.", ja: "生成出力には、厳密な文字列一致より特性/安全性ベースのテストが適します。" } },

  { cat: "iv-ai",
    q: { vi: "Đâu là giới hạn cần nêu khi phỏng vấn hỏi 「AI có thay thế được tester không」?", en: "What limitation should you state when an interview asks 'can AI replace testers'?", ja: "面接で「AI はテスターを置き換えられるか」と聞かれたとき述べるべき限界は？" },
    options: [
      { vi: "AI hiểu ngữ cảnh nghiệp vụ, chịu trách nhiệm và phán đoán rủi ro tốt hơn người", en: "AI understands business context, is accountable, and judges risk better than people", ja: "AI は業務文脈を理解し責任を持ちリスク判断が人より優れている" },
      { vi: "AI thiếu hiểu biết nghiệp vụ sâu, trách nhiệm giải trình và khả năng phán đoán rủi ro/đạo đức, nên chỉ hỗ trợ", en: "AI lacks deep domain understanding, accountability and risk/ethics judgment, so it only assists", ja: "AI は深い業務理解・説明責任・リスク/倫理判断を欠くため、あくまで支援に留まる" },
      { vi: "AI không thể sinh văn bản", en: "AI cannot generate text", ja: "AI はテキストを生成できない" },
      { vi: "AI luôn chậm hơn con người", en: "AI is always slower than humans", ja: "AI は常に人間より遅い" }
    ],
    answer: 1,
    exp: { vi: "Câu trả lời cân bằng: AI là công cụ tăng năng suất; trách nhiệm, ngữ cảnh và phán đoán vẫn ở con người.", en: "A balanced answer: AI amplifies productivity; accountability, context and judgment stay with humans.", ja: "バランスの取れた回答：AI は生産性を高める道具で、責任・文脈・判断は人間に残ります。" } },

  { cat: "iv-ai",
    q: { vi: "Để giảm hallucination khi nhờ AI viết test dựa trên tài liệu, cách nào hiệu quả?", en: "To reduce hallucination when asking AI to write tests from docs, what works?", ja: "文書からテストを書かせる際、ハルシネーションを減らす有効な方法は？" },
    options: [
      { vi: "Cung cấp trực tiếp trích đoạn tài liệu/nguồn liên quan trong ngữ cảnh và yêu cầu bám sát nguồn", en: "Provide the relevant doc excerpts/sources in context and ask it to stay grounded in them", ja: "関連する文書抜粋/情報源を文脈に直接与え、それに沿うよう求める" },
      { vi: "Yêu cầu AI đoán mọi thứ", en: "Ask AI to guess everything", ja: "AI にすべて推測させる" },
      { vi: "Không đưa bối cảnh nào", en: "Give no context", ja: "文脈を一切与えない" },
      { vi: "Tăng độ dài prompt bằng chữ ngẫu nhiên", en: "Pad the prompt with random text", ja: "ランダムな文字でプロンプトを水増しする" }
    ],
    answer: 0,
    exp: { vi: "Đưa nguồn vào ngữ cảnh (grounding/RAG) và yêu cầu trích dẫn giúp giảm bịa; vẫn phải kiểm chứng.", en: "Grounding with sources (RAG) and asking for citations reduces fabrication; still verify afterward.", ja: "情報源で根拠付け（RAG）し引用を求めると捏造が減りますが、事後検証は必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Khi AI đề xuất test case, dấu hiệu nào cho thấy độ phủ có thể chưa đủ?", en: "When AI proposes test cases, which sign suggests coverage may be insufficient?", ja: "AI がテストケースを提案するとき、網羅性が不十分かもしれない兆候は？" },
    options: [
      { vi: "Có quá nhiều case", en: "There are too many cases", ja: "ケースが多すぎる" },
      { vi: "Chỉ có luồng thành công (happy path), thiếu ca lỗi, biên, dữ liệu xấu và điều kiện đồng thời", en: "Only happy paths, missing error, boundary, invalid-data and concurrency cases", ja: "正常系（ハッピーパス）のみで、エラー・境界・不正データ・並行条件のケースが欠けている" },
      { vi: "Các case có tên rõ ràng", en: "The cases have clear names", ja: "ケース名が明確である" },
      { vi: "Các case chạy nhanh", en: "The cases run fast", ja: "ケースの実行が速い" }
    ],
    answer: 1,
    exp: { vi: "AI thường thiên về happy path; tester cần bổ sung ca biên, lỗi và tình huống bất thường để đủ phủ.", en: "AI often favors happy paths; testers must add edge, error and abnormal cases for adequate coverage.", ja: "AI は正常系に偏りがちで、テスターは境界・エラー・異常ケースを追加して網羅性を確保します。" } },

  { cat: "iv-ai",
    q: { vi: "Về mặt bảo mật, dùng mô hình chạy nội bộ (self-hosted/on-prem) thay vì API đám mây giúp ích gì?", en: "Security-wise, how does a self-hosted/on-prem model help versus a cloud API?", ja: "セキュリティ面で、クラウド API に対しセルフホスト/オンプレのモデルはどう役立ちますか？" },
    options: [
      { vi: "Luôn cho kết quả chính xác hơn", en: "Always gives more accurate results", ja: "常により正確な結果を出す" },
      { vi: "Không cần kiểm chứng đầu ra", en: "Removes the need to verify output", ja: "出力検証を不要にする" },
      { vi: "Giữ dữ liệu nhạy cảm trong hạ tầng của tổ chức, giảm rủi ro rò rỉ ra bên thứ ba", en: "Keeps sensitive data within the organization's infrastructure, reducing third-party leakage risk", ja: "機微データを組織のインフラ内に留め、第三者への漏洩リスクを減らす" },
      { vi: "Loại bỏ hoàn toàn chi phí", en: "Eliminates all cost", ja: "コストを完全になくす" }
    ],
    answer: 2,
    exp: { vi: "On-prem giúp kiểm soát dữ liệu tốt hơn cho thông tin nhạy cảm, dù đánh đổi về chi phí/vận hành.", en: "On-prem gives better data control for sensitive info, at some cost/operational trade-off.", ja: "オンプレは機微情報のデータ制御を高めますが、コスト/運用の代償があります。" } },

  { cat: "iv-ai",
    q: { vi: "Khi đánh giá một công cụ 「AI test generation」 để mua, tiêu chí nào quan trọng?", en: "When evaluating an AI test-generation tool to buy, which criterion matters?", ja: "購入する「AI テスト生成」ツールを評価する際、重要な基準は？" },
    options: [
      { vi: "Chỉ nhìn logo đẹp", en: "Just a nice logo", ja: "ロゴが良いかだけ" },
      { vi: "Số lượng nút bấm trên giao diện", en: "The number of buttons in the UI", ja: "UI のボタン数" },
      { vi: "Màu nền trang chủ", en: "The homepage background color", ja: "ホームページの背景色" },
      { vi: "Khả năng tích hợp, chất lượng/độ tin cậy đầu ra, chính sách dữ liệu, khả năng review và chi phí bảo trì", en: "Integration, output quality/reliability, data policy, reviewability, and maintenance cost", ja: "統合性、出力の品質/信頼性、データポリシー、レビュー可能性、保守コスト" }
    ],
    answer: 3,
    exp: { vi: "Chọn công cụ dựa trên độ tin cậy, tích hợp CI, minh bạch dữ liệu và chi phí bảo trì thực tế.", en: "Pick tools by reliability, CI integration, data transparency and real maintenance cost.", ja: "信頼性・CI 統合・データ透明性・実際の保守コストでツールを選びます。" } },

  { cat: "iv-ai",
    q: { vi: "「Grounding」 câu trả lời AI vào tài liệu nội bộ chủ yếu nhằm mục đích gì?", en: "Grounding AI answers in internal docs primarily aims to do what?", ja: "AI の回答を社内文書に根拠付けする主な目的は？" },
    options: [
      { vi: "Giảm khả năng bịa và tăng độ chính xác theo ngữ cảnh dự án cụ thể", en: "Reduce fabrication and improve accuracy relative to the specific project context", ja: "捏造を減らし、特定のプロジェクト文脈に対する正確性を高める" },
      { vi: "Tăng độ dài câu trả lời", en: "Make answers longer", ja: "回答を長くする" },
      { vi: "Đổi giọng văn", en: "Change the writing tone", ja: "文体を変える" },
      { vi: "Giảm chi phí điện", en: "Reduce electricity cost", ja: "電気代を減らす" }
    ],
    answer: 0,
    exp: { vi: "Grounding gắn câu trả lời với nguồn thật, giảm hallucination và tăng tính phù hợp với dự án.", en: "Grounding ties answers to real sources, cutting hallucination and boosting project relevance.", ja: "根拠付けは回答を実際の情報源に結び付け、ハルシネーションを減らしプロジェクト適合性を高めます。" } },

  { cat: "iv-ai",
    q: { vi: "Trong quy trình CI, một 「AI code review bot」 cho test nên đóng vai trò nào?", en: "In a CI process, what role should an AI code review bot for tests play?", ja: "CI プロセスで、テスト用の「AI コードレビューボット」が担うべき役割は？" },
    options: [
      { vi: "Người phê duyệt cuối cùng, tự merge", en: "The final approver that auto-merges", ja: "自動マージする最終承認者" },
      { vi: "Người đánh giá phụ trợ, gắn nhận xét gợi ý để con người xem xét và quyết định merge", en: "An assistive reviewer that leaves suggestion comments for humans to consider before merging", ja: "補助的なレビュアーとして提案コメントを付け、マージ前に人間が検討する" },
      { vi: "Công cụ xóa test lỗi", en: "A tool that deletes failing tests", ja: "失敗テストを削除するツール" },
      { vi: "Trình biên dịch", en: "A compiler", ja: "コンパイラー" }
    ],
    answer: 1,
    exp: { vi: "Bot nên hỗ trợ, không thay quyền phê duyệt; con người vẫn giữ quyết định merge và trách nhiệm.", en: "The bot should assist, not own approval; humans keep the merge decision and accountability.", ja: "ボットは支援すべきで承認権は持たず、マージ判断と責任は人間が保持します。" } },

  { cat: "iv-ai",
    q: { vi: "Khi AI sinh dữ liệu test cho form, việc kiểm tra 「tính hợp lệ theo ràng buộc nghiệp vụ」 vì sao quan trọng?", en: "When AI generates test data for a form, why is checking validity against business rules important?", ja: "AI がフォーム用テストデータを生成する際、業務ルールに対する妥当性確認が重要な理由は？" },
    options: [
      { vi: "Vì AI luôn tuân thủ ràng buộc", en: "Because AI always respects constraints", ja: "AI は常に制約を守るから" },
      { vi: "Vì ràng buộc nghiệp vụ không quan trọng", en: "Because business rules do not matter", ja: "業務ルールは重要でないから" },
      { vi: "Vì dữ liệu càng nhiều càng đúng", en: "Because more data is always correct", ja: "データが多いほど正しいから" },
      { vi: "Vì AI có thể tạo dữ liệu vi phạm ràng buộc (định dạng, phạm vi, phụ thuộc), làm test sai lệch nếu không lọc", en: "Because AI may create constraint-violating data (format, range, dependencies) that skews tests if unfiltered", ja: "AI は制約違反データ（形式・範囲・依存）を作りうるため、未検査だとテストが歪む" }
    ],
    answer: 3,
    exp: { vi: "Dữ liệu do AI sinh cần được kiểm ràng buộc; nếu không, có thể vừa thừa vừa thiếu ca hợp lệ/không hợp lệ.", en: "AI-generated data must be constraint-checked; otherwise valid/invalid cases may be over- or under-covered.", ja: "AI 生成データは制約検査が必要で、さもないと有効/無効ケースが過不足になります。" } },

  { cat: "iv-ai",
    q: { vi: "Một cách đo lường lợi ích của AI trong đội test là gì?", en: "What is one way to measure the benefit of AI in a test team?", ja: "テストチームでの AI の効果を測る一つの方法は？" },
    options: [
      { vi: "Theo dõi chỉ số như thời gian tạo test, độ phủ, tỉ lệ flaky và thời gian phát hiện lỗi trước/sau khi áp dụng", en: "Track metrics like test authoring time, coverage, flaky rate and defect detection time before/after adoption", ja: "導入前後でテスト作成時間・網羅性・フレーキー率・欠陥検出時間などの指標を追う" },
      { vi: "Đếm số lần mở công cụ", en: "Count how often the tool is opened", ja: "ツールを開いた回数を数える" },
      { vi: "Đo dung lượng ảnh nền", en: "Measure wallpaper file size", ja: "壁紙のファイルサイズを測る" },
      { vi: "Hỏi cảm giác chung chung", en: "Ask for vague general feelings", ja: "漠然とした感想を聞く" }
    ],
    answer: 0,
    exp: { vi: "So sánh chỉ số định lượng trước/sau giúp đánh giá khách quan giá trị AI mang lại cho đội.", en: "Comparing quantitative metrics before/after objectively assesses the value AI brings to the team.", ja: "導入前後の定量指標を比較することで、AI がチームにもたらす価値を客観的に評価できます。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao không nên dán toàn bộ mã nguồn độc quyền vào một chatbot AI công cộng?", en: "Why should you not paste an entire proprietary codebase into a public AI chatbot?", ja: "独自のコードベース全体を公開 AI チャットボットに貼るべきでない理由は？" },
    options: [
      { vi: "Vì chatbot không đọc được code", en: "Because chatbots cannot read code", ja: "チャットボットはコードを読めないから" },
      { vi: "Vì code sẽ chạy chậm", en: "Because the code will run slowly", ja: "コードが遅くなるから" },
      { vi: "Vì có nguy cơ lộ tài sản trí tuệ/bí mật và vi phạm chính sách bảo mật dữ liệu", en: "Because it risks leaking intellectual property/secrets and violating data-security policy", ja: "知的財産/機密の漏洩やデータセキュリティ方針違反のリスクがあるから" },
      { vi: "Vì chatbot chỉ nhận tiếng Anh", en: "Because chatbots accept only English", ja: "チャットボットは英語しか受け付けないから" }
    ],
    answer: 2,
    exp: { vi: "Gửi mã độc quyền ra dịch vụ ngoài có thể vi phạm bảo mật và làm rò rỉ IP; cần theo chính sách công ty.", en: "Sending proprietary code externally can breach security and leak IP; follow company policy.", ja: "独自コードの外部送信はセキュリティ違反や IP 漏洩になりうるため、会社の方針に従います。" } },

  { cat: "iv-ai",
    q: { vi: "Khi mô hình AI trong pipeline test bị 「drift」 (trôi) theo thời gian, hệ quả là gì?", en: "When an AI model in a test pipeline drifts over time, what is the consequence?", ja: "テストパイプライン内の AI モデルが時間とともに「ドリフト」すると、どうなりますか？" },
    options: [
      { vi: "Không có gì thay đổi", en: "Nothing changes", ja: "何も変わらない" },
      { vi: "Chất lượng dự đoán/phân loại có thể giảm dần, cần giám sát và huấn luyện lại/định chuẩn", en: "Prediction/classification quality can degrade over time, requiring monitoring and retraining/recalibration", ja: "予測/分類の品質が徐々に低下しうるため、監視と再学習/再調整が必要になる" },
      { vi: "Mô hình tự khỏi hẳn", en: "The model heals itself permanently", ja: "モデルが永久に自己回復する" },
      { vi: "Test tự động biến mất", en: "Tests disappear automatically", ja: "テストが自動的に消える" }
    ],
    answer: 1,
    exp: { vi: "Drift do dữ liệu/hệ thống thay đổi làm hiệu năng giảm; cần theo dõi chỉ số và cập nhật mô hình định kỳ.", en: "Drift from changing data/systems degrades performance; monitor metrics and update the model periodically.", ja: "データ/システムの変化によるドリフトは性能を下げるため、指標を監視しモデルを定期更新します。" } },

  { cat: "iv-ai",
    q: { vi: "Khi phỏng vấn hỏi cách bạn xác minh một test do AI viết 「thực sự kiểm tra đúng thứ cần kiểm」, bạn trả lời thế nào tốt?", en: "If asked how you verify an AI-written test actually checks the right thing, what is a good answer?", ja: "AI が書いたテストが本当に正しいものを検証しているか確認する方法を問われたら、良い答えは？" },
    options: [
      { vi: "Đọc kỹ assertion, cố ý gây lỗi (mutation) để xem test có bắt được, và đối chiếu với tiêu chí chấp nhận", en: "Read assertions carefully, deliberately introduce a fault (mutation) to see if it catches it, and check against acceptance criteria", ja: "アサーションを精読し、意図的に不具合（ミューテーション）を入れて検出できるか確認し、受け入れ基準と照合する" },
      { vi: "Chỉ cần thấy test màu xanh là đủ", en: "Just seeing the test go green is enough", ja: "テストが緑になれば十分" },
      { vi: "Tin tưởng vì AI viết", en: "Trust it because AI wrote it", ja: "AI が書いたから信頼する" },
      { vi: "Xóa assertion cho chắc pass", en: "Delete assertions to ensure it passes", ja: "確実に通すためアサーションを削除する" }
    ],
    answer: 0,
    exp: { vi: "Test xanh chưa chắc kiểm đúng; gây lỗi có chủ đích và đọc assertion giúp xác nhận test thật sự phát hiện lỗi.", en: "A green test may not check the right thing; deliberate faults and reading assertions confirm it truly detects defects.", ja: "緑のテストが正しく検証しているとは限らず、意図的な不具合注入とアサーション精読で真に欠陥を検出するか確認します。" } },

  { cat: "iv-ai",
    q: { vi: "Ưu điểm chính của việc để AI tóm tắt log lỗi lớn khi điều tra sự cố test là gì?", en: "What is the main advantage of letting AI summarize large error logs during test failure investigation?", ja: "テスト失敗調査時に大量のエラーログを AI に要約させる主な利点は？" },
    options: [
      { vi: "Bảo đảm tìm ra nguyên nhân gốc 100%", en: "Guarantees finding the root cause 100%", ja: "根本原因を 100% 特定する保証" },
      { vi: "Rút gọn nhanh khối log lớn thành điểm nghi vấn để con người điều tra sâu hơn", en: "Quickly condensing large logs into suspicious points for humans to investigate deeper", ja: "大量ログを素早く要約し、人間がさらに深掘りする疑わしい点を示す" },
      { vi: "Tự vá lỗi trong log", en: "Auto-fixing bugs in the log", ja: "ログ内のバグを自動修正する" },
      { vi: "Thay thế trace viewer", en: "Replacing the trace viewer", ja: "トレースビューアーを置き換える" }
    ],
    answer: 1,
    exp: { vi: "AI giúp lọc nhiễu và định hướng điều tra nhanh, nhưng kết luận nguyên nhân gốc vẫn cần con người kiểm chứng.", en: "AI filters noise and speeds investigation direction, but root-cause conclusions still need human verification.", ja: "AI はノイズを除き調査方向を加速しますが、根本原因の結論は人間の検証が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao nên lưu lại prompt và phiên bản mô hình khi dùng AI tạo tài liệu test cho dự án?", en: "Why should you keep the prompt and model version when using AI to produce test artifacts?", ja: "AI でテスト成果物を作る際、プロンプトとモデルのバージョンを保存すべき理由は？" },
    options: [
      { vi: "Để khoe với đồng nghiệp", en: "To show off to colleagues", ja: "同僚に自慢するため" },
      { vi: "Vì prompt chiếm ít dung lượng", en: "Because prompts take little space", ja: "プロンプトは容量が小さいから" },
      { vi: "Để tái lập, truy vết và giải thích được nguồn gốc đầu ra khi kiểm toán/soát lỗi (reproducibility)", en: "For reproducibility, traceability and explaining output provenance during audit/debugging", ja: "再現性・追跡可能性のため、監査/デバッグ時に出力の由来を説明できるようにする" },
      { vi: "Vì không có lý do gì", en: "For no reason at all", ja: "理由は特にない" }
    ],
    answer: 2,
    exp: { vi: "Ghi lại prompt và phiên bản mô hình giúp tái lập kết quả và minh bạch nguồn gốc khi cần kiểm toán.", en: "Recording prompts and model versions enables reproducing results and transparent provenance for audits.", ja: "プロンプトとモデルバージョンの記録は結果の再現と、監査時の由来の透明性を可能にします。" } },

  { cat: "iv-ai",
    q: { vi: "Trong triage lỗi, AI gom cụm (clustering) các báo lỗi giống nhau giúp ích gì?", en: "In defect triage, how does AI clustering of similar failure reports help?", ja: "欠陥トリアージで、AI が似た障害レポートをクラスタリングするとどう役立ちますか？" },
    options: [
      { vi: "Giảm trùng lặp và giúp thấy các lỗi cùng nguyên nhân gốc, tiết kiệm công điều tra", en: "Reduces duplicates and surfaces failures sharing a root cause, saving investigation effort", ja: "重複を減らし、同じ根本原因を持つ障害を可視化し調査の手間を節約する" },
      { vi: "Tự động đóng mọi lỗi", en: "Auto-closes all defects", ja: "すべての欠陥を自動でクローズする" },
      { vi: "Làm mất dữ liệu lỗi", en: "Loses defect data", ja: "欠陥データを失う" },
      { vi: "Chỉ đổi tiêu đề lỗi", en: "Only renames defect titles", ja: "欠陥タイトルを変えるだけ" }
    ],
    answer: 0,
    exp: { vi: "Clustering giúp thấy bức tranh chung của các lỗi liên quan; con người vẫn xác nhận nhóm và ưu tiên xử lý.", en: "Clustering reveals the big picture of related failures; humans still confirm groups and prioritize fixes.", ja: "クラスタリングは関連障害の全体像を示し、人間がグループを確認し修正を優先付けします。" } },

  { cat: "iv-ai",
    q: { vi: "Khi dùng AI để mở rộng bộ dữ liệu test, làm sao tránh 「thiên lệch」 (bias) trong dữ liệu?", en: "When using AI to expand a test dataset, how do you avoid bias in the data?", ja: "AI でテストデータセットを拡張する際、データの「バイアス」を避けるには？" },
    options: [
      { vi: "Chỉ tạo dữ liệu cho một nhóm người dùng", en: "Generate data for only one user group", ja: "1 つのユーザー群のデータのみ生成する" },
      { vi: "Chủ động yêu cầu đa dạng (ngôn ngữ, vùng miền, biên, trường hợp hiếm) và rà soát phân bố kết quả", en: "Deliberately request diversity (languages, regions, edges, rare cases) and review the resulting distribution", ja: "多様性（言語・地域・境界・稀なケース）を意図的に求め、結果の分布をレビューする" },
      { vi: "Bỏ qua kiểm tra phân bố", en: "Skip checking the distribution", ja: "分布の確認を省く" },
      { vi: "Chỉ dùng dữ liệu tiếng Anh chuẩn", en: "Use only standard English data", ja: "標準的な英語データのみ使う" }
    ],
    answer: 1,
    exp: { vi: "Chủ động yêu cầu đa dạng và kiểm tra phân bố giúp dữ liệu phản ánh nhiều tình huống thực, giảm bias.", en: "Actively requesting diversity and reviewing distribution makes data reflect real varied situations, reducing bias.", ja: "多様性を積極的に求め分布を確認すると、データが多様な実状況を反映しバイアスを減らせます。" } },

  { cat: "iv-ai",
    q: { vi: "Câu nào mô tả đúng ranh giới trách nhiệm khi AI 「gợi ý pass/fail」 một kết quả kiểm thử?", en: "Which correctly describes accountability when AI suggests pass/fail for a test result?", ja: "AI がテスト結果の合否を「提案」する際の責任範囲を正しく説明するのは？" },
    options: [
      { vi: "AI hoàn toàn chịu trách nhiệm kết luận", en: "AI is fully accountable for the verdict", ja: "AI が判定に全責任を負う" },
      { vi: "Không ai chịu trách nhiệm", en: "No one is accountable", ja: "誰も責任を負わない" },
      { vi: "Khách hàng chịu trách nhiệm", en: "The customer is accountable", ja: "顧客が責任を負う" },
      { vi: "Đội test/tổ chức vẫn chịu trách nhiệm cuối; AI chỉ gợi ý, con người xác nhận và ký duyệt", en: "The test team/organization remains ultimately accountable; AI only suggests, humans confirm and sign off", ja: "最終責任はテストチーム/組織にあり、AI は提案のみで人間が確認し承認する" }
    ],
    answer: 3,
    exp: { vi: "Trách nhiệm giải trình thuộc về con người/tổ chức; AI là công cụ hỗ trợ, không phải bên chịu trách nhiệm.", en: "Accountability belongs to humans/the organization; AI is an assistive tool, not the responsible party.", ja: "説明責任は人間/組織にあり、AI は支援ツールで責任主体ではありません。" } },

  { cat: "iv-ai",
    q: { vi: "Khi tích hợp gợi ý AI vào CI, thực hành an toàn nào giúp tránh phá vỡ pipeline?", en: "When integrating AI suggestions into CI, which safe practice avoids breaking the pipeline?", ja: "AI の提案を CI に統合する際、パイプラインを壊さない安全な実践は？" },
    options: [
      { vi: "Cho AI tự sửa và đẩy thẳng lên nhánh chính", en: "Let AI fix and push straight to main", ja: "AI に修正させ直接メインへプッシュさせる" },
      { vi: "Chạy gợi ý AI ở bước không chặn (non-blocking) hoặc nhánh riêng, xem xét trước khi hợp nhất", en: "Run AI suggestions as a non-blocking step or on a separate branch, reviewed before merging", ja: "AI の提案を非ブロッキングのステップや別ブランチで実行し、マージ前にレビューする" },
      { vi: "Tắt toàn bộ test khác", en: "Disable all other tests", ja: "他のテストをすべて無効化する" },
      { vi: "Bỏ qua review mã", en: "Skip code review", ja: "コードレビューを省く" }
    ],
    answer: 1,
    exp: { vi: "Đưa AI vào dạng không chặn hoặc nhánh riêng để đánh giá an toàn, tránh làm hỏng nhánh chính khi gợi ý sai.", en: "Introduce AI as non-blocking or on a branch for safe evaluation, avoiding damage to main when suggestions are wrong.", ja: "AI を非ブロッキングや別ブランチで導入し安全に評価し、提案が誤ってもメインを壊さないようにします。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao AI khó tự sinh 「tiêu chí chấp nhận」 (acceptance criteria) đúng nếu thiếu đầu vào?", en: "Why does AI struggle to generate correct acceptance criteria without proper input?", ja: "適切な入力がないと AI が正しい「受け入れ基準」を生成しにくいのはなぜ？" },
    options: [
      { vi: "Vì tiêu chí chấp nhận đến từ nhu cầu nghiệp vụ/bên liên quan mà AI không tự biết nếu không được cung cấp", en: "Because acceptance criteria come from business needs/stakeholders that AI cannot know unless provided", ja: "受け入れ基準は、提供されない限り AI が知り得ない業務ニーズ/ステークホルダーから来るから" },
      { vi: "Vì AI không viết được câu", en: "Because AI cannot write sentences", ja: "AI は文を書けないから" },
      { vi: "Vì tiêu chí chấp nhận luôn giống nhau", en: "Because acceptance criteria are always identical", ja: "受け入れ基準は常に同一だから" },
      { vi: "Vì AI chỉ hiểu số", en: "Because AI understands only numbers", ja: "AI は数値しか理解しないから" }
    ],
    answer: 0,
    exp: { vi: "Tiêu chí chấp nhận phản ánh ý định nghiệp vụ; thiếu ngữ cảnh, AI dễ đoán sai và cần con người cung cấp/duyệt.", en: "Acceptance criteria reflect business intent; without context AI guesses wrongly and needs humans to supply/approve them.", ja: "受け入れ基準は業務意図を反映するため、文脈なしでは AI が誤推測し、人間の提供/承認が必要です。" } },

  { cat: "iv-ai",
    q: { vi: "Khi dùng AI để chuyển yêu cầu ngôn ngữ tự nhiên thành kịch bản test tự động, bước kiểm soát quan trọng là gì?", en: "When using AI to turn natural-language requirements into automated test scripts, what is a key control step?", ja: "AI で自然言語要件を自動テストスクリプトに変換する際、重要な管理ステップは？" },
    options: [
      { vi: "Triển khai ngay không xem", en: "Deploy immediately without review", ja: "レビューなしで即デプロイ" },
      { vi: "Cho script tự chạy trên production", en: "Let scripts run directly on production", ja: "スクリプトを本番で直接実行させる" },
      { vi: "Đối chiếu script sinh ra với yêu cầu gốc, chạy thử trên môi trường an toàn và để tester phê duyệt", en: "Cross-check generated scripts against original requirements, dry-run in a safe environment, and have a tester approve", ja: "生成スクリプトを元要件と照合し、安全な環境で試行し、テスターが承認する" },
      { vi: "Xóa yêu cầu gốc", en: "Delete the original requirements", ja: "元の要件を削除する" }
    ],
    answer: 2,
    exp: { vi: "Bước xác minh so với yêu cầu và chạy thử an toàn giúp bắt sai lệch trước khi script vào suite chính thức.", en: "Verifying against requirements and safe dry-runs catch deviations before scripts enter the official suite.", ja: "要件との照合と安全な試行により、スクリプトが正式スイートに入る前に逸脱を捕捉できます。" } },

  { cat: "iv-ai",
    q: { vi: "Nhận định nào phù hợp về 「chi phí ẩn」 khi phụ thuộc mạnh vào công cụ test AI của bên thứ ba?", en: "Which is a fair point about hidden costs of relying heavily on a third-party AI testing tool?", ja: "第三者の AI テストツールに強く依存する際の「隠れたコスト」について妥当な指摘は？" },
    options: [
      { vi: "Không có chi phí ẩn nào", en: "There are no hidden costs", ja: "隠れたコストはない" },
      { vi: "Chi phí duy nhất là giá mua ban đầu", en: "The only cost is the upfront price", ja: "唯一のコストは初期購入価格" },
      { vi: "Công cụ AI luôn miễn phí vĩnh viễn", en: "AI tools are always free forever", ja: "AI ツールは永久に無料" },
      { vi: "Có thể gặp khóa nhà cung cấp (vendor lock-in), phụ thuộc dữ liệu, chi phí review đầu ra và rủi ro khi dịch vụ đổi/ngừng", en: "Possible vendor lock-in, data dependency, output-review cost, and risk if the service changes/shuts down", ja: "ベンダーロックイン、データ依存、出力レビューコスト、サービス変更/停止時のリスクがありうる" }
    ],
    answer: 3,
    exp: { vi: "Ngoài phí bản quyền, còn có lock-in, công review đầu ra và rủi ro liên tục nếu dịch vụ thay đổi.", en: "Beyond license fees there is lock-in, output-review effort, and ongoing risk if the service changes.", ja: "ライセンス料以外に、ロックイン、出力レビューの手間、サービス変更時の継続的リスクがあります。" } },

  { cat: "iv-ai",
    q: { vi: "Vai trò 「human-in-the-loop」 nên đặt ở đâu trong luồng test do AI đề xuất và tự chạy?", en: "Where should human-in-the-loop sit in a flow where AI proposes and auto-runs tests?", ja: "AI がテストを提案し自動実行するフローで、ヒューマン・イン・ザ・ループはどこに置くべきですか？" },
    options: [
      { vi: "Ở các điểm quyết định quan trọng: duyệt test mới, xác nhận sửa locator, và ký duyệt kết quả trước khi release", en: "At key decision points: approving new tests, confirming locator fixes, and signing off results before release", ja: "重要な意思決定点：新テストの承認、ロケーター修正の確認、リリース前の結果承認" },
      { vi: "Không cần ở đâu cả", en: "Nowhere is needed", ja: "どこにも不要" },
      { vi: "Chỉ ở khâu đặt tên file", en: "Only at file naming", ja: "ファイル命名の段階のみ" },
      { vi: "Chỉ khi máy chủ hỏng", en: "Only when the server crashes", ja: "サーバーがクラッシュしたときのみ" }
    ],
    answer: 0,
    exp: { vi: "Con người cần chốt ở các điểm rủi ro cao: phê duyệt test, xác nhận thay đổi và ký duyệt release, giữ kiểm soát.", en: "Humans must gate high-risk points: approving tests, confirming changes, and signing off releases, keeping control.", ja: "人間は高リスク点（テスト承認・変更確認・リリース承認）で関門となり、制御を保つべきです。" } },

  { cat: "iv-ai",
    q: { vi: "Câu trả lời phỏng vấn nào thể hiện tư duy chín chắn về AI trong kiểm thử?", en: "Which interview answer shows a mature view of AI in testing?", ja: "テストにおける AI について成熟した見方を示す面接回答はどれですか？" },
    options: [
      { vi: "「Tôi để AI tự lo hết, không cần kiểm tra」", en: "'I let AI handle everything, no checking needed'", ja: "「AI に全部任せて確認は不要」" },
      { vi: "「AI vô dụng, tôi không bao giờ dùng」", en: "'AI is useless, I never use it'", ja: "「AI は無用で決して使わない」" },
      { vi: "「Tôi dùng AI để tăng tốc phác thảo và phân tích, nhưng luôn kiểm chứng, đánh giá rủi ro và chịu trách nhiệm cuối」", en: "'I use AI to speed drafting and analysis, but always verify, assess risk and stay accountable'", ja: "「AI で下書きと分析を加速するが、常に検証しリスクを評価し最終責任を持つ」" },
      { vi: "「AI luôn đúng nên tôi bỏ hết assertion」", en: "'AI is always right so I remove all assertions'", ja: "「AI は常に正しいのでアサーションを全部消す」" }
    ],
    answer: 2,
    exp: { vi: "Quan điểm cân bằng: tận dụng AI để tăng năng suất nhưng giữ kiểm chứng, đánh giá rủi ro và trách nhiệm con người.", en: "A balanced view: leverage AI for productivity while keeping verification, risk assessment and human accountability.", ja: "バランスの取れた見方：生産性のため AI を活用しつつ、検証・リスク評価・人間の責任を保ちます。" } },

  { cat: "iv-ai",
    q: { vi: "Khi AI đề xuất một tập lớn test case, cách ưu tiên (prioritize) hợp lý để chạy trước là gì?", en: "When AI proposes a large set of test cases, what is a sound way to prioritize which to run first?", ja: "AI が大量のテストケースを提案したとき、先に実行するものを優先付けする妥当な方法は？" },
    options: [
      { vi: "Chạy theo thứ tự bảng chữ cái tên test", en: "Run alphabetically by test name", ja: "テスト名のアルファベット順で実行する" },
      { vi: "Chạy ngẫu nhiên hoàn toàn", en: "Run completely at random", ja: "完全にランダムで実行する" },
      { vi: "Dựa trên rủi ro nghiệp vụ, vùng thay đổi gần đây và tác động tới người dùng, do con người đánh giá", en: "Based on business risk, recently changed areas and user impact, judged by humans", ja: "業務リスク・最近の変更領域・ユーザー影響に基づき、人間が判断する" },
      { vi: "Chạy các test ngắn nhất trước bất kể ý nghĩa", en: "Run the shortest tests first regardless of meaning", ja: "意味を問わず最短のテストを先に実行する" }
    ],
    answer: 2,
    exp: { vi: "Ưu tiên theo rủi ro và vùng thay đổi giúp phát hiện lỗi quan trọng sớm; AI gợi ý nhưng con người quyết định.", en: "Prioritizing by risk and change areas surfaces critical defects early; AI suggests but humans decide.", ja: "リスクと変更領域による優先付けは重要な欠陥を早期に発見します。AI は提案し人間が決定します。" } },

  { cat: "iv-ai",
    q: { vi: "Khi trình bày kết quả do AI hỗ trợ cho các bên liên quan, thực hành minh bạch tốt là gì?", en: "When presenting AI-assisted results to stakeholders, what is a good transparency practice?", ja: "AI 支援の結果をステークホルダーに提示する際、良い透明性の実践は？" },
    options: [
      { vi: "Giấu việc đã dùng AI", en: "Hide that AI was used", ja: "AI を使ったことを隠す" },
      { vi: "Khẳng định AI luôn đúng", en: "Claim AI is always correct", ja: "AI は常に正しいと主張する" },
      { vi: "Trình bày như thể do con người làm hoàn toàn", en: "Present it as fully human-made", ja: "完全に人手によるものとして提示する" },
      { vi: "Nêu rõ phần nào có AI hỗ trợ, mức độ đã kiểm chứng và các giới hạn/độ không chắc chắn còn lại", en: "State which parts were AI-assisted, how far they were verified, and remaining limits/uncertainty", ja: "どの部分が AI 支援か、どこまで検証したか、残る限界/不確実性を明示する" }
    ],
    answer: 3,
    exp: { vi: "Minh bạch về vai trò AI, mức kiểm chứng và giới hạn giúp bên liên quan hiểu đúng độ tin cậy của kết quả.", en: "Transparency about AI's role, verification level and limits helps stakeholders correctly gauge reliability.", ja: "AI の役割・検証レベル・限界に関する透明性は、ステークホルダーが信頼性を正しく判断するのを助けます。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao nên xem AI như 「trợ lý tăng tốc」 hơn là 「nguồn chân lý」 trong kiểm thử?", en: "Why treat AI as an accelerating assistant rather than a source of truth in testing?", ja: "テストで AI を「真理の源」ではなく「加速する助手」とみなすべき理由は？" },
    options: [
      { vi: "Vì AI có thể sai/bịa và không hiểu trọn ngữ cảnh nghiệp vụ, nên đầu ra cần được kiểm chứng độc lập", en: "Because AI can be wrong/fabricate and does not fully grasp business context, so output needs independent verification", ja: "AI は誤り/捏造しうえ業務文脈を完全には把握しないため、出力は独立検証が必要だから" },
      { vi: "Vì AI chạy quá chậm để tin", en: "Because AI is too slow to trust", ja: "AI は遅すぎて信頼できないから" },
      { vi: "Vì AI không thể đọc tài liệu", en: "Because AI cannot read documents", ja: "AI は文書を読めないから" },
      { vi: "Vì AI chỉ hoạt động vào ban đêm", en: "Because AI only works at night", ja: "AI は夜間しか動かないから" }
    ],
    answer: 0,
    exp: { vi: "AI có thể sai và thiếu ngữ cảnh nghiệp vụ; coi nó là công cụ tăng tốc và luôn kiểm chứng giúp tránh sai lầm hệ thống.", en: "AI can err and lacks business context; treating it as an accelerator and always verifying avoids systemic mistakes.", ja: "AI は誤りうえ業務文脈を欠くため、加速装置とみなし常に検証することで系統的な誤りを避けられます。" } }
];
