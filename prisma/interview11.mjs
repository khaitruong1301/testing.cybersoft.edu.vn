// ============================================================================
// INTERVIEW11 — Automation bổ sung (đạt 400) — 299 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":75,"1":75,"2":75,"3":74}
// ============================================================================
export const DATA = [
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Selenium WebDriver, sự khác biệt chính giữa findElement() và findElements() là gì?",
      "en": "In Selenium WebDriver, what is the main difference between findElement() and findElements()?",
      "ja": "Selenium WebDriverにおいて、findElement()とfindElements()の主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "findElement() trả về một WebElement duy nhất và ném ngoại lệ nếu không tìm thấy, còn findElements() trả về danh sách (rỗng nếu không tìm thấy)",
        "en": "findElement() returns a single WebElement and throws an exception if not found, while findElements() returns a list (empty if none found)",
        "ja": "findElement()は単一のWebElementを返し、見つからない場合は例外を投げるが、findElements()はリスト(見つからなければ空)を返す"
      },
      {
        "vi": "findElement() chỉ dùng được với CSS còn findElements() chỉ dùng được với XPath",
        "en": "findElement() only works with CSS while findElements() only works with XPath",
        "ja": "findElement()はCSSでのみ使用でき、findElements()はXPathでのみ使用できる"
      },
      {
        "vi": "findElement() chạy nhanh hơn findElements() vì không quét toàn bộ DOM",
        "en": "findElement() always runs faster than findElements() because it does not scan the whole DOM",
        "ja": "findElement()はDOM全体をスキャンしないため、常にfindElements()より高速である"
      },
      {
        "vi": "findElements() chỉ hoạt động trong iframe còn findElement() thì không",
        "en": "findElements() only works inside an iframe while findElement() does not",
        "ja": "findElements()はiframe内でのみ動作し、findElement()は動作しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "findElement() luôn trả về một phần tử và ném NoSuchElementException nếu không khớp, trong khi findElements() trả về List<WebElement>, có thể rỗng nếu không có phần tử nào khớp.",
      "en": "findElement() returns a single element and throws NoSuchElementException if no match is found, whereas findElements() returns a List<WebElement>, which may be empty when nothing matches.",
      "ja": "findElement()は常に単一の要素を返し、一致しない場合はNoSuchElementExceptionを投げる。一方findElements()はList<WebElement>を返し、一致する要素がなければ空になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi nào nên ưu tiên dùng XPath tương đối (relative XPath) thay vì XPath tuyệt đối (absolute XPath)?",
      "en": "When should you prefer a relative XPath over an absolute XPath?",
      "ja": "絶対XPathよりも相対XPathを優先すべきなのはどのような場合ですか?"
    },
    "options": [
      {
        "vi": "Khi trang web không có thẻ id nào",
        "en": "When the web page has no id attributes at all",
        "ja": "ウェブページにid属性が全くない場合"
      },
      {
        "vi": "Khi muốn locator ổn định hơn trước thay đổi cấu trúc DOM, vì nó không phụ thuộc vào đường dẫn tuyệt đối từ gốc html",
        "en": "When you want a locator that is more resilient to DOM structure changes, since it does not depend on the absolute path from the html root",
        "ja": "htmlルートからの絶対パスに依存しないため、DOM構造の変化に強いロケーターが欲しいとき"
      },
      {
        "vi": "Khi cần locator chạy nhanh hơn CSS selector",
        "en": "When you need a locator that runs faster than a CSS selector",
        "ja": "CSSセレクタよりも高速に動作するロケーターが必要な場合"
      },
      {
        "vi": "Khi phần tử nằm trong Shadow DOM",
        "en": "When the element is inside the Shadow DOM",
        "ja": "要素がShadow DOM内にある場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "XPath tuyệt đối bắt đầu từ /html nên chỉ cần thay đổi nhỏ trong cấu trúc DOM cũng làm gãy locator; XPath tương đối (bắt đầu bằng //) linh hoạt và bền vững hơn.",
      "en": "Absolute XPath starts from /html, so even a small DOM structure change breaks it; relative XPath (starting with //) is more flexible and resilient.",
      "ja": "絶対XPathは/htmlから始まるため、DOM構造のわずかな変更でもロケーターが壊れる。//で始まる相対XPathの方が柔軟で堅牢である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "StaleElementReferenceException trong Selenium thường xảy ra khi nào?",
      "en": "When does a StaleElementReferenceException typically occur in Selenium?",
      "ja": "SeleniumでStaleElementReferenceExceptionが発生するのは一般的にどのような場合ですか?"
    },
    "options": [
      {
        "vi": "Khi trình duyệt bị đóng trước khi WebDriver khởi tạo",
        "en": "When the browser closes before the WebDriver is initialized",
        "ja": "WebDriverが初期化される前にブラウザが閉じられた場合"
      },
      {
        "vi": "Khi locator không tìm thấy phần tử nào ngay từ đầu",
        "en": "When the locator finds no matching element from the start",
        "ja": "ロケーターが最初から一致する要素を見つけられない場合"
      },
      {
        "vi": "Khi phần tử DOM tham chiếu bởi WebElement đã bị xóa hoặc thay thế sau khi trang được tải lại/cập nhật",
        "en": "When the DOM element referenced by the WebElement has been removed or replaced after the page reloads or updates",
        "ja": "ページが再読み込み・更新された後、WebElementが参照していたDOM要素が削除または置き換えられた場合"
      },
      {
        "vi": "Khi thời gian chờ ngầm định (implicit wait) được đặt bằng 0",
        "en": "When the implicit wait is set to 0",
        "ja": "暗黙的待機(implicit wait)が0に設定されている場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "WebElement là tham chiếu tới một nút DOM cụ thể; nếu DOM thay đổi (AJAX reload, re-render), tham chiếu cũ trở nên 'stale' và thao tác trên nó sẽ ném StaleElementReferenceException.",
      "en": "A WebElement references a specific DOM node; if the DOM changes (AJAX reload, re-render), the old reference becomes stale and any action on it throws StaleElementReferenceException.",
      "ja": "WebElementは特定のDOMノードへの参照である。DOMが変化(AJAX再読み込みや再描画)すると古い参照は無効(stale)になり、それに対する操作はStaleElementReferenceExceptionを投げる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG, annotation @BeforeMethod và @BeforeClass khác nhau như thế nào?",
      "en": "In TestNG, how do @BeforeMethod and @BeforeClass differ?",
      "ja": "TestNGにおいて、@BeforeMethodと@BeforeClassはどのように異なりますか?"
    },
    "options": [
      {
        "vi": "Cả hai đều chạy một lần duy nhất cho toàn bộ suite, không có sự khác biệt về phạm vi",
        "en": "Both run exactly once for the entire suite, with no difference in scope",
        "ja": "両方ともスイート全体で一度だけ実行され、範囲に違いはない"
      },
      {
        "vi": "@BeforeMethod chỉ dùng cho JUnit, @BeforeClass chỉ dùng cho TestNG",
        "en": "@BeforeMethod is only for JUnit, while @BeforeClass is only for TestNG",
        "ja": "@BeforeMethodはJUnit専用で、@BeforeClassはTestNG専用である"
      },
      {
        "vi": "@BeforeClass chạy sau mỗi test còn @BeforeMethod chạy trước toàn bộ suite",
        "en": "@BeforeClass runs after every test while @BeforeMethod runs before the whole suite",
        "ja": "@BeforeClassは各テストの後に実行され、@BeforeMethodはスイート全体の前に実行される"
      },
      {
        "vi": "@BeforeMethod chạy trước mỗi phương thức test, @BeforeClass chỉ chạy một lần trước tất cả test trong class đó",
        "en": "@BeforeMethod runs before every test method, while @BeforeClass runs only once before all tests in that class",
        "ja": "@BeforeMethodは各テストメソッドの前に実行され、@BeforeClassはそのクラス内の全テストの前に一度だけ実行される"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "@BeforeMethod thực thi trước mỗi test method (dùng để reset trạng thái), còn @BeforeClass chỉ chạy một lần trước khi các test method trong class bắt đầu (dùng để khởi tạo tài nguyên dùng chung).",
      "en": "@BeforeMethod executes before each test method (used to reset state), while @BeforeClass runs only once before the test methods in the class begin (used to initialize shared resources).",
      "ja": "@BeforeMethodは各テストメソッドの前に実行され(状態のリセットに使う)、@BeforeClassはクラス内のテストメソッドが始まる前に一度だけ実行される(共有リソースの初期化に使う)。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "CSS selector nào dùng để chọn phần tử input có thuộc tính name bắt đầu bằng chuỗi \"user_\"?",
      "en": "Which CSS selector selects an input element whose name attribute starts with \"user_\"?",
      "ja": "name属性が\"user_\"で始まるinput要素を選択するCSSセレクタはどれですか?"
    },
    "options": [
      {
        "vi": "input[name^='user_']",
        "en": "input[name^='user_']",
        "ja": "input[name^='user_']"
      },
      {
        "vi": "input[name*='user_']",
        "en": "input[name*='user_']",
        "ja": "input[name*='user_']"
      },
      {
        "vi": "input[name$='user_']",
        "en": "input[name$='user_']",
        "ja": "input[name$='user_']"
      },
      {
        "vi": "input[name~='user_']",
        "en": "input[name~='user_']",
        "ja": "input[name~='user_']"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ký hiệu ^= trong CSS selector nghĩa là 'bắt đầu bằng', $= nghĩa là 'kết thúc bằng', *= nghĩa là 'chứa chuỗi con', còn ~= dùng cho danh sách từ cách nhau bởi khoảng trắng.",
      "en": "The ^= symbol in a CSS selector means 'starts with', $= means 'ends with', *= means 'contains substring', and ~= is used for a whitespace-separated list of words.",
      "ja": "CSSセレクタの^=は「〜で始まる」、$=は「〜で終わる」、*=は「部分文字列を含む」、~=は空白区切りの単語リストに使われる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Hàm contains() trong XPath thường được dùng để làm gì?",
      "en": "What is the contains() function in XPath typically used for?",
      "ja": "XPathのcontains()関数は一般的に何に使われますか?"
    },
    "options": [
      {
        "vi": "Sắp xếp các phần tử theo thứ tự alphabet",
        "en": "Sorting elements alphabetically",
        "ja": "要素をアルファベット順に並べ替える"
      },
      {
        "vi": "Tìm phần tử có thuộc tính hoặc nội dung text chứa một chuỗi con cụ thể, hữu ích khi giá trị thuộc tính thay đổi động một phần",
        "en": "Finding an element whose attribute or text content contains a specific substring, useful when attribute values change dynamically in part",
        "ja": "属性値やテキスト内容の一部が動的に変化する場合に有用な、特定の部分文字列を含む要素を検索する"
      },
      {
        "vi": "Đếm số lượng phần tử con của một node",
        "en": "Counting the number of child nodes of an element",
        "ja": "要素の子ノードの数をカウントする"
      },
      {
        "vi": "Chuyển đổi phần tử từ XPath sang CSS selector",
        "en": "Converting an element locator from XPath to CSS selector",
        "ja": "要素ロケーターをXPathからCSSセレクタへ変換する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "contains(@attribute, 'text') hoặc contains(text(), 'text') giúp khớp phần tử khi giá trị thuộc tính/nội dung không cố định hoàn toàn, ví dụ id sinh động 'btn-123-submit'.",
      "en": "contains(@attribute, 'text') or contains(text(), 'text') helps match elements when the attribute/content value is not entirely fixed, e.g. a dynamic id like 'btn-123-submit'.",
      "ja": "contains(@attribute, 'text')やcontains(text(), 'text')は、属性値や内容が完全には固定されていない場合(例:動的なid 'btn-123-submit')に要素を照合するのに役立つ。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Selenium, WebDriverWait kết hợp với ExpectedConditions dùng để làm gì?",
      "en": "In Selenium, what is WebDriverWait combined with ExpectedConditions used for?",
      "ja": "SeleniumにおいてWebDriverWaitとExpectedConditionsを組み合わせて使う目的は何ですか?"
    },
    "options": [
      {
        "vi": "Để tạo báo cáo test dạng HTML sau khi chạy xong",
        "en": "To generate an HTML test report after execution finishes",
        "ja": "実行終了後にHTML形式のテストレポートを生成するため"
      },
      {
        "vi": "Để tự động chụp ảnh màn hình mỗi khi test thất bại",
        "en": "To automatically capture a screenshot whenever a test fails",
        "ja": "テストが失敗するたびに自動的にスクリーンショットを撮るため"
      },
      {
        "vi": "Chờ đợi một điều kiện cụ thể (ví dụ phần tử clickable) xảy ra trong tối đa một khoảng thời gian, thay vì chờ cố định (hard sleep)",
        "en": "To wait for a specific condition (e.g. element to be clickable) to occur within a maximum time span, instead of a fixed hard sleep",
        "ja": "固定のハードスリープの代わりに、特定の条件(例:要素がクリック可能になる)が最大待機時間内に発生するのを待つため"
      },
      {
        "vi": "Để đóng tất cả cửa sổ trình duyệt đang mở",
        "en": "To close all currently open browser windows",
        "ja": "現在開いているすべてのブラウザウィンドウを閉じるため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Explicit wait (WebDriverWait + ExpectedConditions) poll DOM liên tục cho tới khi điều kiện đúng hoặc hết timeout, giúp test ổn định hơn so với việc dùng Thread.sleep() cố định.",
      "en": "An explicit wait (WebDriverWait + ExpectedConditions) polls the DOM until the condition is true or the timeout expires, making tests more stable than using a fixed Thread.sleep().",
      "ja": "明示的待機(WebDriverWait + ExpectedConditions)は条件が真になるかタイムアウトするまでDOMをポーリングし続けるため、固定のThread.sleep()を使うよりテストが安定する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Class Actions trong Selenium chủ yếu dùng để làm gì?",
      "en": "What is the Actions class in Selenium mainly used for?",
      "ja": "SeleniumのActionsクラスは主に何のために使われますか?"
    },
    "options": [
      {
        "vi": "Quản lý version của driver binary (chromedriver, geckodriver)",
        "en": "Managing the driver binary version (chromedriver, geckodriver)",
        "ja": "ドライババイナリ(chromedriver、geckodriver)のバージョンを管理するため"
      },
      {
        "vi": "Kết nối WebDriver với cơ sở dữ liệu để lấy dữ liệu test",
        "en": "Connecting WebDriver to a database to fetch test data",
        "ja": "テストデータを取得するためにWebDriverをデータベースに接続するため"
      },
      {
        "vi": "Sinh báo cáo test tự động dạng Allure",
        "en": "Generating Allure-style automated test reports",
        "ja": "Allure形式の自動テストレポートを生成するため"
      },
      {
        "vi": "Thực hiện các thao tác tương tác phức tạp như kéo-thả, hover chuột, nhấn giữ phím, double click",
        "en": "Performing complex interactions such as drag-and-drop, mouse hover, key press-and-hold, or double click",
        "ja": "ドラッグ&ドロップ、マウスホバー、キー長押し、ダブルクリックなどの複雑な操作を実行するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Actions class cung cấp API để mô phỏng các thao tác chuột và bàn phím nâng cao mà click()/sendKeys() thông thường không hỗ trợ, như moveToElement(), dragAndDrop(), keyDown()/keyUp().",
      "en": "The Actions class provides an API to simulate advanced mouse and keyboard operations that plain click()/sendKeys() don't support, such as moveToElement(), dragAndDrop(), keyDown()/keyUp().",
      "ja": "Actionsクラスは、通常のclick()やsendKeys()ではサポートされない高度なマウス・キーボード操作(moveToElement()、dragAndDrop()、keyDown()/keyUp()など)をシミュレートするAPIを提供する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi làm việc với thẻ <select> trong Selenium, tại sao nên dùng class Select thay vì click() trực tiếp vào các <option>?",
      "en": "When working with a <select> tag in Selenium, why should you use the Select class instead of clicking directly on <option> elements?",
      "ja": "Seleniumで<select>タグを扱う際、<option>要素に直接クリックする代わりにSelectクラスを使うべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì Select cung cấp các phương thức chuyên dụng (selectByVisibleText, selectByValue, selectByIndex) xử lý đúng hành vi dropdown, kể cả multi-select",
        "en": "Because Select provides dedicated methods (selectByVisibleText, selectByValue, selectByIndex) that correctly handle dropdown behavior, including multi-select",
        "ja": "Selectはドロップダウンの挙動(マルチセレクトを含む)を正しく処理する専用メソッド(selectByVisibleText、selectByValue、selectByIndex)を提供するから"
      },
      {
        "vi": "Vì click() không tồn tại trong Selenium",
        "en": "Because click() does not exist in Selenium",
        "ja": "Seleniumにclick()が存在しないから"
      },
      {
        "vi": "Vì click() vào <option> luôn ném NoSuchElementException",
        "en": "Because clicking on an <option> always throws NoSuchElementException",
        "ja": "<option>をクリックすると常にNoSuchElementExceptionが投げられるから"
      },
      {
        "vi": "Vì Select chỉ hoạt động trên trình duyệt Firefox",
        "en": "Because Select only works on the Firefox browser",
        "ja": "Selectはブラウザ「Firefox」でのみ動作するから"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Class Select là wrapper chuẩn cho thẻ <select>, đảm bảo hành vi đúng chuẩn HTML kể cả với dropdown ẩn (một số trình duyệt render option khác nhau), giảm lỗi khi tương tác thô bằng click().",
      "en": "The Select class is the standard wrapper for <select>, ensuring HTML-compliant behavior even for hidden dropdowns (browsers may render options differently), reducing errors compared to raw click() interactions.",
      "ja": "Selectクラスは<select>用の標準ラッパーであり、非表示のドロップダウンでも(ブラウザによってoptionの描画が異なることがある)HTML準拠の動作を保証し、生のclick()操作によるエラーを減らす。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "@DataProvider trong TestNG dùng để làm gì?",
      "en": "What is @DataProvider used for in TestNG?",
      "ja": "TestNGの@DataProviderは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Kết nối trực tiếp tới cơ sở dữ liệu Postgres để lấy kết quả test",
        "en": "Connecting directly to a Postgres database to retrieve test results",
        "ja": "テスト結果を取得するために直接Postgresデータベースに接続する"
      },
      {
        "vi": "Cung cấp nhiều bộ dữ liệu test khác nhau để chạy cùng một test method nhiều lần (data-driven testing)",
        "en": "Supplying multiple different sets of test data so the same test method runs multiple times (data-driven testing)",
        "ja": "同じテストメソッドを複数回実行するために、複数の異なるテストデータセットを提供する(データ駆動テスト)"
      },
      {
        "vi": "Định nghĩa thứ tự chạy các class test trong suite",
        "en": "Defining the run order of test classes within a suite",
        "ja": "スイート内のテストクラスの実行順序を定義する"
      },
      {
        "vi": "Tạo báo cáo log chi tiết cho mỗi bước test",
        "en": "Generating a detailed log report for every test step",
        "ja": "各テストステップの詳細なログレポートを生成する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "@DataProvider trả về mảng Object[][] chứa các bộ tham số; TestNG sẽ gọi test method tương ứng nhiều lần, mỗi lần với một bộ dữ liệu khác nhau — phù hợp kiểm thử với nhiều input.",
      "en": "@DataProvider returns an Object[][] array of parameter sets; TestNG invokes the corresponding test method multiple times, once per data set — suitable for testing with many inputs.",
      "ja": "@DataProviderはパラメータセットのObject[][]配列を返し、TestNGは対応するテストメソッドをデータセットごとに複数回呼び出す。多様な入力でのテストに適している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "File testng.xml trong TestNG dùng để làm gì?",
      "en": "What is the testng.xml file used for in TestNG?",
      "ja": "TestNGのtestng.xmlファイルは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Là file cấu hình bắt buộc duy nhất để cài đặt Selenium WebDriver",
        "en": "The only required configuration file to install Selenium WebDriver",
        "ja": "Selenium WebDriverをインストールするために必要な唯一の設定ファイル"
      },
      {
        "vi": "Lưu trữ báo cáo kết quả test sau khi chạy xong",
        "en": "Storing the test result report after execution finishes",
        "ja": "実行終了後のテスト結果レポートを保存する"
      },
      {
        "vi": "Cấu hình suite test: nhóm các class/method, thiết lập tham số, chạy song song, chọn nhóm test (groups)",
        "en": "Configuring the test suite: grouping classes/methods, setting parameters, enabling parallel execution, selecting test groups",
        "ja": "テストスイートの設定:クラス/メソッドのグループ化、パラメータ設定、並列実行の有効化、テストグループの選択"
      },
      {
        "vi": "Chứa mã nguồn của các test case",
        "en": "Contains the source code of the test cases",
        "ja": "テストケースのソースコードを含む"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "testng.xml là file XML cấu hình suite, cho phép định nghĩa <test>, <classes>, <groups>, tham số truyền vào, mức độ song song (parallel), thứ tự chạy — không chứa logic test.",
      "en": "testng.xml is the XML configuration file for a suite, allowing definition of <test>, <classes>, <groups>, parameters, parallelism level, and run order — it contains no test logic itself.",
      "ja": "testng.xmlはスイートのXML設定ファイルであり、<test>、<classes>、<groups>、パラメータ、並列度、実行順序などを定義できる。テストロジック自体は含まれない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Để xử lý nhiều tab/cửa sổ trình duyệt trong Selenium, cần dùng phương thức nào để chuyển ngữ cảnh?",
      "en": "To handle multiple browser tabs/windows in Selenium, which method is used to switch context?",
      "ja": "Seleniumで複数のブラウザタブ・ウィンドウを扱う際、コンテキストを切り替えるにはどのメソッドを使いますか?"
    },
    "options": [
      {
        "vi": "driver.get().switchWindow(windowHandle)",
        "en": "driver.get().switchWindow(windowHandle)",
        "ja": "driver.get().switchWindow(windowHandle)"
      },
      {
        "vi": "driver.navigate().to(windowHandle)",
        "en": "driver.navigate().to(windowHandle)",
        "ja": "driver.navigate().to(windowHandle)"
      },
      {
        "vi": "driver.manage().window(windowHandle)",
        "en": "driver.manage().window(windowHandle)",
        "ja": "driver.manage().window(windowHandle)"
      },
      {
        "vi": "driver.switchTo().window(windowHandle)",
        "en": "driver.switchTo().window(windowHandle)",
        "ja": "driver.switchTo().window(windowHandle)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi cửa sổ/tab có một window handle duy nhất; dùng driver.getWindowHandles() để lấy danh sách rồi driver.switchTo().window(handle) để chuyển ngữ cảnh điều khiển WebDriver.",
      "en": "Each window/tab has a unique window handle; use driver.getWindowHandles() to get the list, then driver.switchTo().window(handle) to switch the WebDriver's control context.",
      "ja": "各ウィンドウ・タブには一意のウィンドウハンドルがある。driver.getWindowHandles()でリストを取得し、driver.switchTo().window(handle)でWebDriverの制御コンテキストを切り替える。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tại sao WebDriver không thể tương tác trực tiếp với các phần tử bên trong một <iframe> mà không cần thao tác gì thêm?",
      "en": "Why can't WebDriver directly interact with elements inside an <iframe> without any extra step?",
      "ja": "追加の操作なしでWebDriverが<iframe>内の要素に直接アクセスできないのはなぜですか?"
    },
    "options": [
      {
        "vi": "Vì WebDriver mặc định chỉ thao tác trong ngữ cảnh (context) của tài liệu chính; cần gọi driver.switchTo().frame() để chuyển vào ngữ cảnh của iframe trước",
        "en": "Because WebDriver by default only operates within the main document's context; you must call driver.switchTo().frame() to switch into the iframe's context first",
        "ja": "WebDriverはデフォルトでメインドキュメントのコンテキスト内でのみ操作するため、まずdriver.switchTo().frame()を呼び出してiframeのコンテキストに切り替える必要があるから"
      },
      {
        "vi": "Vì iframe luôn bị ẩn (display:none) theo mặc định",
        "en": "Because an iframe is always hidden (display:none) by default",
        "ja": "iframeはデフォルトで常に非表示(display:none)になっているから"
      },
      {
        "vi": "Vì phần tử trong iframe không có thuộc tính id",
        "en": "Because elements inside an iframe never have an id attribute",
        "ja": "iframe内の要素にはid属性が存在しないから"
      },
      {
        "vi": "Vì trình duyệt chặn mọi thao tác JavaScript trong iframe vì lý do bảo mật tuyệt đối",
        "en": "Because browsers absolutely block all JavaScript actions inside an iframe for security reasons",
        "ja": "ブラウザはセキュリティ上の理由でiframe内のあらゆるJavaScript操作を完全にブロックするから"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "iframe nhúng một document DOM riêng biệt; WebDriver cần switchTo().frame(nameOrIndexOrElement) để 'bước vào' ngữ cảnh đó, sau khi thao tác xong thường switchTo().defaultContent() để quay lại.",
      "en": "An iframe embeds a separate DOM document; WebDriver needs switchTo().frame(nameOrIndexOrElement) to 'step into' that context, then typically calls switchTo().defaultContent() to return afterward.",
      "ja": "iframeは別個のDOMドキュメントを埋め込んでいる。WebDriverはswitchTo().frame(nameOrIndexOrElement)でそのコンテキストに「入り」、操作後は通常switchTo().defaultContent()で戻る。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Sự khác biệt giữa getText() và getAttribute(\"value\") trên một WebElement là gì?",
      "en": "What is the difference between getText() and getAttribute(\"value\") on a WebElement?",
      "ja": "WebElementのgetText()とgetAttribute(\"value\")の違いは何ですか?"
    },
    "options": [
      {
        "vi": "Cả hai luôn trả về cùng một kết quả trong mọi trường hợp",
        "en": "Both always return the exact same result in every case",
        "ja": "両方とも常に全く同じ結果を返す"
      },
      {
        "vi": "getText() lấy nội dung text hiển thị của phần tử, còn getAttribute(\"value\") lấy giá trị thuộc tính value (thường dùng cho input/textarea)",
        "en": "getText() retrieves the visible displayed text of an element, while getAttribute(\"value\") retrieves the value attribute (typically used for input/textarea)",
        "ja": "getText()は要素の表示テキストを取得し、getAttribute(\"value\")はvalue属性(通常はinput/textareaに使う)の値を取得する"
      },
      {
        "vi": "getText() chỉ hoạt động với thẻ <button>, còn getAttribute chỉ hoạt động với thẻ <a>",
        "en": "getText() only works on <button> tags, while getAttribute only works on <a> tags",
        "ja": "getText()は<button>タグにのみ動作し、getAttributeは<a>タグにのみ動作する"
      },
      {
        "vi": "getAttribute(\"value\") trả về đáp án đúng của câu hỏi trắc nghiệm khi test đang chạy",
        "en": "getAttribute(\"value\") returns the correct answer of an MCQ question while the test is running",
        "ja": "getAttribute(\"value\")はテスト実行中にMCQ問題の正解を返す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "getText() lấy nội dung văn bản render ra trên DOM (không lấy được text ẩn bởi CSS), còn với ô input/textarea, giá trị người dùng nhập nằm trong thuộc tính value nên phải dùng getAttribute(\"value\").",
      "en": "getText() gets the rendered visible text on the DOM (it cannot retrieve CSS-hidden text), while for input/textarea fields, the user-entered value sits in the value attribute, so getAttribute(\"value\") must be used.",
      "ja": "getText()はDOM上でレンダリングされた表示テキストを取得する(CSSで非表示のテキストは取得できない)。一方input/textareaではユーザーが入力した値がvalue属性に入っているため、getAttribute(\"value\")を使う必要がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Phương thức isDisplayed() và isEnabled() trên WebElement khác nhau ở điểm nào?",
      "en": "How do the isDisplayed() and isEnabled() methods on a WebElement differ?",
      "ja": "WebElementのisDisplayed()メソッドとisEnabled()メソッドはどう違いますか?"
    },
    "options": [
      {
        "vi": "Cả hai đều kiểm tra cùng một thứ: phần tử có tồn tại trong DOM hay không",
        "en": "Both check the exact same thing: whether the element exists in the DOM",
        "ja": "両方とも同じもの(要素がDOMに存在するかどうか)をチェックする"
      },
      {
        "vi": "isDisplayed() dùng cho form còn isEnabled() dùng cho link",
        "en": "isDisplayed() is used for forms while isEnabled() is used for links",
        "ja": "isDisplayed()はフォームに、isEnabled()はリンクに使われる"
      },
      {
        "vi": "isDisplayed() kiểm tra phần tử có hiển thị trên giao diện hay không, isEnabled() kiểm tra phần tử có đang bị vô hiệu hóa (disabled) hay không",
        "en": "isDisplayed() checks whether the element is visible on the UI, isEnabled() checks whether the element is disabled or not",
        "ja": "isDisplayed()は要素がUI上で表示されているかを確認し、isEnabled()は要素が無効化(disabled)されているかを確認する"
      },
      {
        "vi": "isEnabled() luôn trả về true nếu isDisplayed() trả về false",
        "en": "isEnabled() always returns true whenever isDisplayed() returns false",
        "ja": "isDisplayed()がfalseを返すとき、isEnabled()は常にtrueを返す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "isDisplayed() kiểm tra tính hiển thị (visibility, kích thước >0), còn isEnabled() kiểm tra trạng thái tương tác được (không có thuộc tính disabled) — hai khái niệm độc lập, một nút có thể hiển thị nhưng bị disable.",
      "en": "isDisplayed() checks visibility (visible, with nonzero size), while isEnabled() checks whether the element can be interacted with (no disabled attribute) — these are independent concepts; a button can be visible yet disabled.",
      "ja": "isDisplayed()は表示状態(可視でサイズが0でない)を確認し、isEnabled()は操作可能な状態(disabled属性がない)を確認する。これらは独立した概念であり、ボタンは表示されていても無効化されている場合がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "XPath axis following-sibling dùng để làm gì?",
      "en": "What does the XPath axis following-sibling do?",
      "ja": "XPath軸のfollowing-siblingは何のために使いますか?"
    },
    "options": [
      {
        "vi": "Chọn tất cả các phần tử con của node hiện tại",
        "en": "Selects all child elements of the current node",
        "ja": "現在のノードのすべての子要素を選択する"
      },
      {
        "vi": "Chọn toàn bộ document gốc bất kể vị trí node hiện tại",
        "en": "Selects the entire root document regardless of the current node's position",
        "ja": "現在のノードの位置に関係なくドキュメント全体を選択する"
      },
      {
        "vi": "Chọn phần tử cha trực tiếp của node hiện tại",
        "en": "Selects the direct parent of the current node",
        "ja": "現在のノードの直接の親要素を選択する"
      },
      {
        "vi": "Chọn các phần tử anh em (cùng cấp) xuất hiện SAU node hiện tại trong cây DOM, dùng khi cần điều hướng ngang mà không có id/class ổn định",
        "en": "Selects sibling elements that appear AFTER the current node in the DOM tree, useful for horizontal navigation when there is no stable id/class",
        "ja": "DOMツリー内で現在のノードの後に現れる兄弟要素を選択する。安定したid/classがない場合の横方向のナビゲーションに便利"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "following-sibling::tagname chọn các phần tử cùng cấp cha, đứng sau node hiện tại trong tài liệu — hữu ích khi locator neo vào một label ổn định rồi tìm input ở cạnh nó.",
      "en": "following-sibling::tagname selects same-level sibling elements that come after the current node in document order — useful when anchoring the locator to a stable label and finding the adjacent input.",
      "ja": "following-sibling::tagnameは、ドキュメント順で現在のノードより後にある同階層の兄弟要素を選択する。安定したラベルにロケーターを固定し、隣接するinputを探す際に便利。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG, thuộc tính priority của annotation @Test dùng để làm gì?",
      "en": "In TestNG, what does the priority attribute of the @Test annotation do?",
      "ja": "TestNGにおいて、@Testアノテーションのpriority属性は何のために使いますか?"
    },
    "options": [
      {
        "vi": "Xác định thứ tự chạy các test method: giá trị nhỏ hơn được chạy trước",
        "en": "Determines the execution order of test methods: lower values run first",
        "ja": "テストメソッドの実行順序を決定する:値が小さいほど先に実行される"
      },
      {
        "vi": "Xác định mức độ nghiêm trọng (severity) của lỗi khi test fail",
        "en": "Determines the severity level of a bug when the test fails",
        "ja": "テストが失敗した際のバグの重大度を決定する"
      },
      {
        "vi": "Xác định số luồng song song tối đa được phép chạy test",
        "en": "Determines the maximum number of parallel threads allowed for the test",
        "ja": "テストに許可される最大並列スレッド数を決定する"
      },
      {
        "vi": "Xác định timeout tối đa cho phương thức test đó",
        "en": "Determines the maximum timeout for that test method",
        "ja": "そのテストメソッドの最大タイムアウトを決定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "@Test(priority = n) cho phép kiểm soát thứ tự thực thi trong cùng class; mặc định priority = 0, các method có priority thấp hơn chạy trước.",
      "en": "@Test(priority = n) controls execution order within the same class; the default priority is 0, and methods with a lower priority run first.",
      "ja": "@Test(priority = n)は同じクラス内での実行順序を制御する。デフォルトの優先度は0で、優先度の低いメソッドが先に実行される。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong JUnit 5, annotation @BeforeEach và @BeforeAll khác nhau như thế nào?",
      "en": "In JUnit 5, how do @BeforeEach and @BeforeAll differ?",
      "ja": "JUnit 5において、@BeforeEachと@BeforeAllはどう異なりますか?"
    },
    "options": [
      {
        "vi": "@BeforeAll chỉ dùng được trong TestNG, không dùng được trong JUnit",
        "en": "@BeforeAll can only be used in TestNG, not in JUnit",
        "ja": "@BeforeAllはTestNGでのみ使用でき、JUnitでは使用できない"
      },
      {
        "vi": "@BeforeEach chạy trước mỗi test method (instance method), @BeforeAll chạy một lần duy nhất trước tất cả test trong class và phải là static",
        "en": "@BeforeEach runs before each test method (instance method), while @BeforeAll runs only once before all tests in the class and must be static",
        "ja": "@BeforeEachは各テストメソッド(インスタンスメソッド)の前に実行され、@BeforeAllはクラス内のすべてのテストの前に一度だけ実行され、staticでなければならない"
      },
      {
        "vi": "@BeforeEach chạy sau khi test hoàn tất, @BeforeAll chạy trước khi test bắt đầu",
        "en": "@BeforeEach runs after a test completes, while @BeforeAll runs before a test begins",
        "ja": "@BeforeEachはテスト完了後に実行され、@BeforeAllはテスト開始前に実行される"
      },
      {
        "vi": "Cả hai chỉ chạy đúng một lần cho toàn bộ project, không phân biệt class",
        "en": "Both run exactly once for the entire project, regardless of class",
        "ja": "両方ともクラスに関係なくプロジェクト全体で一度だけ実行される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "@BeforeEach tương tự @BeforeMethod của TestNG (chạy mỗi test), còn @BeforeAll tương tự @BeforeClass nhưng bắt buộc là static method (trừ khi dùng @TestInstance(PER_CLASS)).",
      "en": "@BeforeEach is similar to TestNG's @BeforeMethod (runs before each test), while @BeforeAll is similar to @BeforeClass but must be a static method (unless @TestInstance(PER_CLASS) is used).",
      "ja": "@BeforeEachはTestNGの@BeforeMethodに似ており(各テストの前に実行)、@BeforeAllは@BeforeClassに似ているが、staticメソッドである必要がある(@TestInstance(PER_CLASS)を使う場合を除く)。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi thiết kế bộ locator cho một dự án automation lớn, thứ tự ưu tiên lựa chọn locator hợp lý nhất thường là gì?",
      "en": "When designing a locator strategy for a large automation project, what is the generally recommended priority order for choosing locators?",
      "ja": "大規模な自動化プロジェクトでロケーター戦略を設計する際、一般的に推奨されるロケーター選択の優先順位は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ dùng class name vì đây là locator nhanh nhất trong mọi trường hợp",
        "en": "Only use class name because it is always the fastest locator in every case",
        "ja": "どんな場合でも最速のロケーターであるため、classnameのみを使う"
      },
      {
        "vi": "Luôn dùng XPath tuyệt đối cho mọi phần tử để đảm bảo tính chính xác tuyệt đối",
        "en": "Always use absolute XPath for every element to guarantee absolute accuracy",
        "ja": "完全な正確性を保証するため、すべての要素に常に絶対XPathを使う"
      },
      {
        "vi": "id > CSS selector ổn định (ví dụ data-testid) > class ổn định > XPath tương đối, tránh XPath phức tạp/tuyệt đối khi có thể",
        "en": "id > stable CSS selector (e.g. data-testid) > stable class > relative XPath, avoiding complex/absolute XPath where possible",
        "ja": "id > 安定したCSSセレクタ(例:data-testid) > 安定したclass > 相対XPath、可能な限り複雑・絶対XPathは避ける"
      },
      {
        "vi": "Ưu tiên locator theo text hiển thị vì text không bao giờ thay đổi",
        "en": "Prioritize locators based on visible text because text never changes",
        "ja": "テキストは決して変わらないため、表示テキストによるロケーターを優先する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "id thường duy nhất và nhanh nhất; CSS selector rõ ràng, dễ đọc, hiệu năng tốt; XPath tương đối linh hoạt cho quan hệ phức tạp nhưng nên tránh XPath dài/tuyệt đối vì dễ gãy khi DOM thay đổi.",
      "en": "id is usually unique and fastest; CSS selectors are clear, readable, and performant; relative XPath is flexible for complex relationships but long/absolute XPath should be avoided since it breaks easily when the DOM changes.",
      "ja": "idは通常ユニークで最速。CSSセレクタは明確で読みやすく性能も良い。相対XPathは複雑な関係性に柔軟に対応できるが、長い・絶対的なXPathはDOM変化で壊れやすいため避けるべき。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Assertion trong TestNG (org.testng.Assert) và JUnit (org.junit.jupiter.api.Assertions) khác nhau chủ yếu ở điểm nào về thứ tự tham số assertEquals?",
      "en": "What is the main difference in assertEquals parameter order between TestNG (org.testng.Assert) and JUnit (org.junit.jupiter.api.Assertions)?",
      "ja": "TestNG(org.testng.Assert)とJUnit(org.junit.jupiter.api.Assertions)のassertEqualsにおける引数の順序の主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "JUnit dùng (actual, expected) còn TestNG dùng (expected, actual)",
        "en": "JUnit uses (actual, expected) while TestNG uses (expected, actual)",
        "ja": "JUnitは(actual, expected)を使い、TestNGは(expected, actual)を使う"
      },
      {
        "vi": "TestNG không có assertEquals, chỉ JUnit mới có",
        "en": "TestNG has no assertEquals method; only JUnit has one",
        "ja": "TestNGにはassertEqualsメソッドがなく、JUnitのみにある"
      },
      {
        "vi": "Cả hai đều dùng thứ tự (expected, actual) giống hệt nhau",
        "en": "Both use the exact same (expected, actual) order",
        "ja": "両方とも全く同じ(expected, actual)の順序を使う"
      },
      {
        "vi": "TestNG dùng thứ tự (actual, expected), còn JUnit dùng thứ tự (expected, actual)",
        "en": "TestNG uses the order (actual, expected), while JUnit uses the order (expected, actual)",
        "ja": "TestNGは(actual, expected)の順序を使い、JUnitは(expected, actual)の順序を使う"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là điểm dễ gây nhầm lẫn kinh điển: TestNG Assert.assertEquals(actual, expected) trong khi JUnit Assertions.assertEquals(expected, actual) — đảo ngược thứ tự tham số, ảnh hưởng tới thông báo lỗi khi assertion fail.",
      "en": "This is a classic source of confusion: TestNG's Assert.assertEquals(actual, expected) reverses the parameter order compared to JUnit's Assertions.assertEquals(expected, actual), which affects the failure message when an assertion fails.",
      "ja": "これは古典的な混乱の元である。TestNGのAssert.assertEquals(actual, expected)はJUnitのAssertions.assertEquals(expected, actual)と引数の順序が逆であり、アサーション失敗時のエラーメッセージに影響する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "NoSuchElementException khác gì với TimeoutException trong ngữ cảnh Selenium?",
      "en": "How does NoSuchElementException differ from TimeoutException in the context of Selenium?",
      "ja": "SeleniumにおいてNoSuchElementExceptionとTimeoutExceptionはどう違いますか?"
    },
    "options": [
      {
        "vi": "NoSuchElementException ném ra ngay khi locator không khớp phần tử nào (sau khi hết implicit wait nếu có), TimeoutException ném ra khi một điều kiện chờ đợi (thường trong WebDriverWait) không thỏa mãn trong thời gian quy định",
        "en": "NoSuchElementException is thrown immediately when a locator matches no element (after implicit wait expires if set), while TimeoutException is thrown when a wait condition (typically in WebDriverWait) is not satisfied within the given time",
        "ja": "NoSuchElementExceptionはロケーターが要素に一致しない場合(implicit waitが設定されていればそれが切れた後)に投げられ、TimeoutExceptionは待機条件(通常WebDriverWait内)が指定時間内に満たされない場合に投げられる"
      },
      {
        "vi": "Hai ngoại lệ này hoàn toàn giống nhau và có thể dùng thay thế cho nhau trong mọi trường hợp",
        "en": "These two exceptions are completely identical and interchangeable in every scenario",
        "ja": "この2つの例外は完全に同一であり、あらゆる状況で互換的に使用できる"
      },
      {
        "vi": "NoSuchElementException chỉ xảy ra với CSS selector, TimeoutException chỉ xảy ra với XPath",
        "en": "NoSuchElementException only occurs with CSS selectors, TimeoutException only occurs with XPath",
        "ja": "NoSuchElementExceptionはCSSセレクタでのみ発生し、TimeoutExceptionはXPathでのみ発生する"
      },
      {
        "vi": "TimeoutException chỉ liên quan tới việc tải trang (page load), không liên quan tới việc chờ phần tử",
        "en": "TimeoutException only relates to page load, never to waiting for elements",
        "ja": "TimeoutExceptionはページ読み込みにのみ関連し、要素の待機には無関係である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "NoSuchElementException là kết quả trực tiếp của findElement() khi không có phần tử khớp; TimeoutException đến từ cơ chế wait (WebDriverWait.until()) khi ExpectedCondition không đúng sau khoảng thời gian timeout đã đặt.",
      "en": "NoSuchElementException is the direct result of findElement() when no element matches; TimeoutException comes from the wait mechanism (WebDriverWait.until()) when the ExpectedCondition is not met within the set timeout duration.",
      "ja": "NoSuchElementExceptionは要素が一致しない場合のfindElement()の直接的な結果であり、TimeoutExceptionは設定されたタイムアウト時間内にExpectedConditionが満たされない場合に待機メカニズム(WebDriverWait.until())から発生する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một trang có nhiều phần tử cùng class \"btn\" nhưng chỉ một trong số đó là nút submit, cách locator nào phù hợp nhất để chọn đúng phần tử?",
      "en": "When a page has multiple elements sharing the class \"btn\" but only one of them is the submit button, which locator approach best selects the correct element?",
      "ja": "ページに複数の要素が同じclass \"btn\"を持つが、そのうち1つだけがsubmitボタンである場合、正しい要素を選択するために最も適したロケーターの手法はどれですか?"
    },
    "options": [
      {
        "vi": "Dùng driver.findElement(By.className(\"btn\")).click() vì Selenium sẽ tự động chọn đúng nút submit",
        "en": "Use driver.findElement(By.className(\"btn\")).click() because Selenium automatically picks the correct submit button",
        "ja": "Seleniumが自動的に正しいsubmitボタンを選択するため、driver.findElement(By.className(\"btn\")).click()を使う"
      },
      {
        "vi": "Kết hợp thêm điều kiện phân biệt, ví dụ CSS `button.btn[type='submit']` hoặc XPath `//button[contains(@class,'btn') and @type='submit']`",
        "en": "Combine additional distinguishing conditions, e.g. CSS `button.btn[type='submit']` or XPath `//button[contains(@class,'btn') and @type='submit']`",
        "ja": "追加の識別条件を組み合わせる。例:CSS `button.btn[type='submit']`やXPath `//button[contains(@class,'btn') and @type='submit']`"
      },
      {
        "vi": "Không thể locator chính xác trong trường hợp này, bắt buộc phải sửa mã nguồn HTML trước",
        "en": "It is impossible to locate precisely in this case; the HTML source must be modified first",
        "ja": "この場合、正確にロケートすることは不可能であり、まずHTMLソースを修正する必要がある"
      },
      {
        "vi": "Dùng By.className(\"btn\") kết hợp findElements() rồi luôn lấy phần tử đầu tiên trong danh sách",
        "en": "Use By.className(\"btn\") with findElements() and always take the first element in the list",
        "ja": "By.className(\"btn\")とfindElements()を使い、常にリストの最初の要素を取得する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "By.className(\"btn\") một mình khớp mọi phần tử có class đó và ném lỗi nếu dùng findElement() với nhiều kết quả nhập nhằng, hoặc lấy nhầm phần tử nếu chọn index cố định; cần thêm điều kiện lọc (type, thuộc tính khác) để locator chính xác và ổn định.",
      "en": "By.className(\"btn\") alone matches every element with that class and can be ambiguous or, if picking a fixed index, select the wrong element; adding a filtering condition (type, another attribute) makes the locator precise and stable.",
      "ja": "By.className(\"btn\")単体ではそのclassを持つすべての要素に一致し、曖昧になったり、固定インデックスを選ぶと誤った要素を取得したりする。フィルタ条件(type、他の属性)を追加することでロケーターが正確かつ安定する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong chiến lược automation testing, tại sao nên tránh viết quá nhiều test case E2E (end-to-end) qua UI thay vì cân bằng với unit/integration test?",
      "en": "In an automation testing strategy, why should you avoid writing too many UI end-to-end test cases instead of balancing with unit/integration tests?",
      "ja": "自動化テスト戦略において、ユニット・統合テストとバランスを取らずにUI経由のE2Eテストケースを書きすぎることを避けるべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì test E2E qua UI không bao giờ phát hiện được lỗi thực tế",
        "en": "Because UI end-to-end tests never actually catch real bugs",
        "ja": "UIを介したE2EテストはUE実際のバグを決して検出しないから"
      },
      {
        "vi": "Vì Selenium WebDriver không hỗ trợ chạy nhiều hơn 10 test case trong một suite",
        "en": "Because Selenium WebDriver does not support running more than 10 test cases in a single suite",
        "ja": "Selenium WebDriverは1つのスイートで10件を超えるテストケースの実行をサポートしないから"
      },
      {
        "vi": "Vì test E2E qua UI thường chạy chậm hơn, dễ flaky hơn, và chi phí bảo trì cao hơn so với test ở tầng thấp hơn (unit/integration)",
        "en": "Because UI end-to-end tests typically run slower, are more prone to flakiness, and have higher maintenance cost compared to lower-level tests (unit/integration)",
        "ja": "UIを介したE2Eテストは一般的に実行が遅く、フレーキーになりやすく、ユニット・統合テストなど下位層のテストに比べて保守コストが高いから"
      },
      {
        "vi": "Vì TestNG cấm chạy song song các test E2E",
        "en": "Because TestNG forbids running end-to-end tests in parallel",
        "ja": "TestNGはE2Eテストの並列実行を禁止しているから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test UI E2E phụ thuộc vào toàn bộ stack (frontend render, network, backend) nên chậm và dễ không ổn định hơn; nên tập trung phần lớn test ở tầng unit/integration nhanh và ổn định, chỉ dùng E2E cho các luồng nghiệp vụ quan trọng.",
      "en": "UI end-to-end tests depend on the entire stack (frontend rendering, network, backend), making them slower and more prone to instability; most tests should focus on the faster, more stable unit/integration layer, reserving E2E for critical business flows.",
      "ja": "UIのE2Eテストはスタック全体(フロントエンド描画、ネットワーク、バックエンド)に依存するため、遅く不安定になりやすい。テストの大部分は高速で安定したユニット・統合層に集中させ、E2Eは重要な業務フローのみに使うべきである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Selenium, sự khác biệt giữa By.id() và By.name() là gì?",
      "en": "In Selenium, what is the difference between By.id() and By.name()?",
      "ja": "SeleniumにおいてBy.id()とBy.name()の違いは何ですか?"
    },
    "options": [
      {
        "vi": "By.id() và By.name() là hai tên gọi khác nhau của cùng một cơ chế locator",
        "en": "By.id() and By.name() are just two different names for the exact same locator mechanism",
        "ja": "By.id()とBy.name()は同一のロケーターメカニズムの単なる別名である"
      },
      {
        "vi": "By.id() chỉ hoạt động với thẻ <div>, By.name() chỉ hoạt động với thẻ <input>",
        "en": "By.id() only works with <div> tags, while By.name() only works with <input> tags",
        "ja": "By.id()は<div>タグでのみ動作し、By.name()は<input>タグでのみ動作する"
      },
      {
        "vi": "By.name() luôn nhanh hơn By.id() vì được tối ưu hóa đặc biệt trong WebDriver",
        "en": "By.name() is always faster than By.id() because it is specially optimized in WebDriver",
        "ja": "By.name()はWebDriverで特別に最適化されているため、常にBy.id()より高速である"
      },
      {
        "vi": "By.id() tìm phần tử theo thuộc tính id (thường duy nhất trên trang), By.name() tìm theo thuộc tính name (có thể trùng nhau giữa nhiều phần tử, ví dụ radio button nhóm)",
        "en": "By.id() finds an element by its id attribute (usually unique on the page), while By.name() finds by its name attribute (which can repeat across multiple elements, e.g. a radio button group)",
        "ja": "By.id()はid属性(通常ページ内で一意)で要素を探し、By.name()はname属性(複数の要素間で重複する場合がある、例:ラジオボタングループ)で探す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "id thường được thiết kế duy nhất trên một trang HTML hợp lệ nên là locator nhanh và đáng tin cậy nhất; name lại thường dùng lặp lại cho nhóm input cùng loại (ví dụ radio/checkbox), nên By.name() có thể trả về nhiều kết quả khi dùng findElements.",
      "en": "id is typically designed to be unique within a valid HTML page, making it the fastest and most reliable locator; name is often reused for grouped inputs of the same kind (e.g. radio/checkbox), so By.name() may match multiple elements when used with findElements.",
      "ja": "idは有効なHTMLページ内で一意になるよう設計されることが多く、最も高速で信頼性の高いロケーターとなる。nameは同種のグループ化された入力(例:ラジオ/チェックボックス)で再利用されることが多く、findElementsで使うとBy.name()は複数の要素に一致することがある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG, thuộc tính dependsOnMethods của @Test dùng để làm gì?",
      "en": "In TestNG, what does the dependsOnMethods attribute of @Test do?",
      "ja": "TestNGにおいて、@Testのdependsonmethods属性は何のために使いますか?"
    },
    "options": [
      {
        "vi": "Chỉ định một test method chỉ chạy sau khi (các) method được liệt kê đã chạy thành công, dùng để mô tả sự phụ thuộc giữa các bước test",
        "en": "Specifies that a test method should only run after the listed method(s) have run successfully, used to describe dependencies between test steps",
        "ja": "リストされたメソッドが正常に実行された後にのみテストメソッドを実行するよう指定し、テストステップ間の依存関係を表すために使う"
      },
      {
        "vi": "Chỉ định số lần retry của test method khi thất bại",
        "en": "Specifies the number of retries for a test method when it fails",
        "ja": "テストメソッドが失敗した際のリトライ回数を指定する"
      },
      {
        "vi": "Chỉ định nhóm (group) mặc định cho toàn bộ suite",
        "en": "Specifies the default group for the entire suite",
        "ja": "スイート全体のデフォルトグループを指定する"
      },
      {
        "vi": "Chỉ định trình duyệt nào sẽ được dùng để chạy test method đó",
        "en": "Specifies which browser will be used to run that test method",
        "ja": "そのテストメソッドを実行するブラウザを指定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "dependsOnMethods = {\"login\"} nghĩa là test hiện tại chỉ chạy nếu method login() đã pass trước đó; nếu method phụ thuộc fail, các test phụ thuộc sẽ bị skip chứ không chạy tiếp.",
      "en": "dependsOnMethods = {\"login\"} means the current test only runs if the login() method has already passed; if the dependency fails, dependent tests are skipped rather than executed.",
      "ja": "dependsOnMethods = {\"login\"}は、login()メソッドが既にパスしている場合にのみ現在のテストが実行されることを意味する。依存先が失敗した場合、依存するテストは実行されずスキップされる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi nào nên dùng CSS selector thay vì XPath trong Selenium (xét về hiệu năng và khả năng đọc)?",
      "en": "When should CSS selectors be preferred over XPath in Selenium, considering performance and readability?",
      "ja": "パフォーマンスと可読性の観点から、SeleniumでXPathよりもCSSセレクタを優先すべきなのはどのような場合ですか?"
    },
    "options": [
      {
        "vi": "Khi cần chọn phần tử cha dựa trên phần tử con (ví dụ tìm div cha chứa span có text cụ thể)",
        "en": "When you need to select a parent element based on a child element (e.g. find the parent div containing a span with specific text)",
        "ja": "子要素に基づいて親要素を選択する必要がある場合(例:特定のテキストを持つspanを含む親divを探す)"
      },
      {
        "vi": "Khi việc chọn phần tử chỉ cần dựa trên tag, id, class, thuộc tính đơn giản mà không cần điều hướng ngược lên phần tử cha (parent) hay so sánh nội dung text",
        "en": "When element selection only requires tag, id, class, or simple attributes without needing to navigate up to a parent element or compare text content",
        "ja": "要素の選択がタグ、id、class、単純な属性のみに基づいており、親要素へのナビゲーションやテキスト内容の比較が不要な場合"
      },
      {
        "vi": "Khi cần so khớp phần tử dựa trên nội dung text hiển thị",
        "en": "When you need to match an element based on its displayed text content",
        "ja": "表示されているテキスト内容に基づいて要素を照合する必要がある場合"
      },
      {
        "vi": "Khi cần điều hướng theo trục sibling phức tạp qua nhiều cấp",
        "en": "When you need to navigate complex sibling axes across multiple levels",
        "ja": "複数階層にわたる複雑な兄弟軸のナビゲーションが必要な場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "CSS selector nói chung nhanh hơn và dễ đọc hơn XPath cho các trường hợp chọn đơn giản (theo tag/id/class/attribute), nhưng không hỗ trợ điều hướng lên cha hay so khớp theo text — những trường hợp đó XPath vẫn cần thiết.",
      "en": "CSS selectors are generally faster and more readable than XPath for simple selections (by tag/id/class/attribute), but they cannot navigate to a parent or match by text content — for those cases XPath is still necessary.",
      "ja": "CSSセレクタは一般的に、単純な選択(タグ/id/class/属性による)ではXPathより高速で読みやすいが、親要素へのナビゲーションやテキスト内容による照合はできない。そのような場合はXPathが依然として必要である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG, khi một test method có annotation @Test(enabled = false), điều gì sẽ xảy ra?",
      "en": "In TestNG, what happens when a test method has the annotation @Test(enabled = false)?",
      "ja": "TestNGにおいて、テストメソッドに@Test(enabled = false)アノテーションが付いている場合、何が起こりますか?"
    },
    "options": [
      {
        "vi": "Test method đó sẽ chạy trước tất cả các test khác trong class",
        "en": "That test method runs before all other tests in the class",
        "ja": "そのテストメソッドはクラス内の他のすべてのテストより先に実行される"
      },
      {
        "vi": "Test method đó sẽ chạy nhưng kết quả luôn được báo là pass bất kể logic bên trong",
        "en": "That test method still runs but the result is always reported as pass regardless of the internal logic",
        "ja": "そのテストメソッドは実行されるが、内部のロジックに関係なく結果は常にpassと報告される"
      },
      {
        "vi": "Test method đó sẽ bị bỏ qua hoàn toàn khi chạy suite, không được thực thi",
        "en": "That test method is completely skipped when the suite runs, and is not executed",
        "ja": "そのテストメソッドはスイート実行時に完全にスキップされ、実行されない"
      },
      {
        "vi": "TestNG sẽ ném lỗi biên dịch vì enabled=false không phải là thuộc tính hợp lệ",
        "en": "TestNG throws a compile error because enabled=false is not a valid attribute",
        "ja": "enabled=falseは有効な属性ではないため、TestNGはコンパイルエラーを投げる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "enabled = false là cách tạm thời tắt một test case (ví dụ khi tính năng đang phát triển dở hoặc test đang lỗi cần fix) mà không cần xóa hay comment code, giúp báo cáo suite rõ ràng vì method bị skip không tính vào pass/fail.",
      "en": "enabled = false is a way to temporarily disable a test case (e.g. when a feature is under development or a test needs fixing) without deleting or commenting out code; the skipped method does not count toward pass/fail in the suite report.",
      "ja": "enabled = falseは、コードを削除したりコメントアウトしたりせずにテストケースを一時的に無効化する方法である(例:機能開発中やテストの修正が必要な場合)。スキップされたメソッドはスイートレポートのpass/failにカウントされない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình automation testing, tại sao nên tách logic xác định môi trường (base URL, credentials) ra file cấu hình riêng thay vì hard-code trong test case?",
      "en": "In an automation testing workflow, why should environment configuration (base URL, credentials) be separated into a dedicated config file instead of hard-coded in test cases?",
      "ja": "自動化テストのワークフローにおいて、環境設定(ベースURL、認証情報)をテストケースにハードコーディングせず、専用の設定ファイルに分離すべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì TestNG yêu cầu bắt buộc phải có file properties mới build được project",
        "en": "Because TestNG strictly requires a properties file to build the project",
        "ja": "TestNGはプロジェクトをビルドするために必ずpropertiesファイルを要求するから"
      },
      {
        "vi": "Vì Selenium WebDriver không cho phép hard-code URL trong mã nguồn",
        "en": "Because Selenium WebDriver technically forbids hard-coding URLs in source code",
        "ja": "Selenium WebDriverはソースコード内にURLをハードコーディングすることを技術的に禁止しているから"
      },
      {
        "vi": "Vì file cấu hình giúp test chạy nhanh hơn về mặt tốc độ thực thi",
        "en": "Because a configuration file makes test execution run faster",
        "ja": "設定ファイルによってテストの実行速度が速くなるから"
      },
      {
        "vi": "Để dễ dàng chạy cùng bộ test trên nhiều môi trường (dev/staging/production) mà không cần sửa code test, chỉ cần đổi cấu hình",
        "en": "To easily run the same test suite across multiple environments (dev/staging/production) without modifying test code, just by changing the configuration",
        "ja": "テストコードを変更することなく、設定を変えるだけで同じテストスイートを複数の環境(dev/staging/production)で実行できるようにするため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tách cấu hình môi trường ra ngoài (file .properties/.yml/biến môi trường) giúp tái sử dụng test suite trên nhiều môi trường khác nhau, dễ tích hợp CI/CD (đổi biến môi trường theo pipeline) mà không phải sửa hay build lại mã test.",
      "en": "Separating environment configuration externally (.properties/.yml files/environment variables) enables reusing the test suite across different environments, and makes CI/CD integration easier (swap environment variables per pipeline) without modifying or rebuilding test code.",
      "ja": "環境設定を外部(.properties/.ymlファイル・環境変数)に分離することで、異なる環境間でテストスイートを再利用でき、テストコードを変更・再ビルドすることなくCI/CD統合(パイプラインごとに環境変数を切り替える)が容易になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Selenium WebDriver, implicit wait hoạt động theo cơ chế nào khi tìm phần tử?",
      "en": "In Selenium WebDriver, how does implicit wait behave when locating an element?",
      "ja": "Selenium WebDriverにおいて、暗黙的な待機(implicit wait)は要素を探すときどのように動作しますか。"
    },
    "options": [
      {
        "vi": "Áp dụng cho toàn bộ WebDriver, tự động chờ tối đa một khoảng thời gian trước khi ném NoSuchElementException",
        "en": "It applies globally to the WebDriver instance, automatically retrying up to a set timeout before throwing NoSuchElementException",
        "ja": "WebDriverインスタンス全体に適用され、NoSuchElementExceptionを投げる前に設定した時間まで自動的にリトライする"
      },
      {
        "vi": "Chỉ áp dụng cho một lệnh findElement duy nhất được gọi ngay sau đó",
        "en": "It only applies to a single findElement call invoked immediately after it",
        "ja": "直後に呼び出された1回のfindElement呼び出しにのみ適用される"
      },
      {
        "vi": "Chờ cho đến khi trang load xong hoàn toàn (document.readyState = complete)",
        "en": "It waits until the page fully loads (document.readyState = complete)",
        "ja": "ページが完全に読み込まれる(document.readyState = complete)まで待機する"
      },
      {
        "vi": "Chờ cho đến khi một điều kiện JavaScript tùy chỉnh trả về true",
        "en": "It waits until a custom JavaScript condition returns true",
        "ja": "カスタムのJavaScript条件がtrueを返すまで待機する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Implicit wait được thiết lập một lần trên đối tượng WebDriver và áp dụng cho mọi lệnh tìm phần tử trong suốt vòng đời của driver, tự động poll cho đến khi tìm thấy hoặc hết thời gian.",
      "en": "Implicit wait is set once on the WebDriver instance and applies to every element lookup for the driver's lifetime, polling until the element is found or the timeout elapses.",
      "ja": "暗黙的な待機はWebDriverインスタンスに一度設定され、ドライバのライフサイクル全体にわたるすべての要素検索に適用され、見つかるかタイムアウトするまでポーリングする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "WebDriverWait kết hợp với ExpectedConditions khác implicit wait ở điểm cốt lõi nào?",
      "en": "What is the core difference between WebDriverWait combined with ExpectedConditions and implicit wait?",
      "ja": "WebDriverWaitとExpectedConditionsの組み合わせは、暗黙的な待機と本質的に何が異なりますか。"
    },
    "options": [
      {
        "vi": "WebDriverWait chỉ dùng được với Firefox driver",
        "en": "WebDriverWait only works with the Firefox driver",
        "ja": "WebDriverWaitはFirefoxドライバでのみ使用できる"
      },
      {
        "vi": "WebDriverWait cho phép chờ một điều kiện cụ thể (ví dụ phần tử clickable) tại một thời điểm nhất định trong luồng test, không áp dụng toàn cục",
        "en": "WebDriverWait lets you wait for a specific condition (e.g. element clickable) at a particular point in the test flow, rather than applying globally",
        "ja": "WebDriverWaitは特定のポイントで特定の条件(例:要素がクリック可能になる)を待てるが、implicit waitのようにグローバルには適用されない"
      },
      {
        "vi": "WebDriverWait không thể ném ra ngoại lệ khi hết thời gian chờ",
        "en": "WebDriverWait never throws an exception on timeout",
        "ja": "WebDriverWaitはタイムアウトしても例外を投げない"
      },
      {
        "vi": "WebDriverWait tự động tắt implicit wait của driver",
        "en": "WebDriverWait automatically disables the driver's implicit wait",
        "ja": "WebDriverWaitはドライバの暗黙的な待機を自動的に無効化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Explicit wait thông qua WebDriverWait cho phép định nghĩa điều kiện chờ cụ thể tại từng bước, linh hoạt hơn nhiều so với implicit wait vốn chỉ chờ sự xuất hiện của phần tử.",
      "en": "Explicit wait via WebDriverWait lets you define a specific condition at each step, offering far more flexibility than implicit wait which only waits for element presence.",
      "ja": "WebDriverWaitによる明示的な待機は各ステップで特定の条件を定義でき、要素の存在のみを待つ暗黙的な待機よりはるかに柔軟である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Fluent wait trong Selenium bổ sung khả năng gì so với explicit wait cơ bản?",
      "en": "What extra capability does a fluent wait add compared to a basic explicit wait in Selenium?",
      "ja": "Selenium の fluent wait は基本的な explicit wait と比べてどんな追加機能を持ちますか。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu dùng ExpectedConditions",
        "en": "It removes the need for ExpectedConditions entirely",
        "ja": "ExpectedConditionsの必要性を完全になくす"
      },
      {
        "vi": "Tự động chụp ảnh màn hình mỗi khi wait thất bại",
        "en": "It automatically takes a screenshot whenever the wait fails",
        "ja": "待機が失敗するたびに自動的にスクリーンショットを撮る"
      },
      {
        "vi": "Cho phép cấu hình chu kỳ polling (polling interval) và danh sách ngoại lệ được bỏ qua trong lúc chờ",
        "en": "It allows configuring the polling interval and a list of exceptions to ignore while waiting",
        "ja": "ポーリング間隔と待機中に無視する例外のリストを設定できる"
      },
      {
        "vi": "Chạy song song nhiều điều kiện chờ trên nhiều thread",
        "en": "It runs multiple wait conditions in parallel across threads",
        "ja": "複数の待機条件を複数スレッドで並列実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "FluentWait cho phép tùy chỉnh tần suất kiểm tra điều kiện (polling every) và bỏ qua các ngoại lệ cụ thể như NoSuchElementException trong khi chờ, linh hoạt hơn WebDriverWait mặc định.",
      "en": "FluentWait lets you customize how often the condition is checked (polling every) and ignore specific exceptions like NoSuchElementException while waiting, offering more control than default WebDriverWait.",
      "ja": "FluentWaitは条件をチェックする頻度(ポーリング間隔)をカスタマイズでき、待機中にNoSuchElementExceptionなど特定の例外を無視できるため、デフォルトのWebDriverWaitより柔軟である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Việc trộn lẫn implicit wait và explicit wait trong cùng một test có thể gây ra hậu quả gì?",
      "en": "What problem can arise from mixing implicit wait and explicit wait in the same test?",
      "ja": "同じテストの中で暗黙的な待機と明示的な待機を混在させると、どんな問題が起こり得ますか。"
    },
    "options": [
      {
        "vi": "Test sẽ luôn chạy nhanh hơn vì hai loại wait cộng dồn hiệu quả",
        "en": "The test always runs faster because the two waits combine efficiently",
        "ja": "2種類の待機が効率的に合算されるため、テストは必ず速くなる"
      },
      {
        "vi": "Chỉ implicit wait được thực thi, explicit wait bị bỏ qua hoàn toàn",
        "en": "Only the implicit wait executes; the explicit wait is entirely ignored",
        "ja": "暗黙的な待機のみが実行され、明示的な待機は完全に無視される"
      },
      {
        "vi": "Selenium sẽ ném lỗi cấu hình ngay khi khởi tạo driver",
        "en": "Selenium throws a configuration error immediately at driver initialization",
        "ja": "Seleniumはドライバ初期化時に即座に設定エラーを投げる"
      },
      {
        "vi": "Thời gian chờ có thể cộng dồn không dự đoán được, dẫn đến thời gian chờ tổng cực dài khi điều kiện explicit chưa thỏa mãn",
        "en": "Wait times can compound unpredictably, leading to very long total waits when the explicit condition isn't yet met",
        "ja": "待機時間が予測不能に積み重なり、explicitの条件がまだ満たされない場合に合計待機時間が非常に長くなることがある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi mỗi lần findElement bên trong vòng lặp poll của explicit wait đều bị trì hoãn bởi implicit wait, tổng thời gian chờ có thể tăng lên rất lớn và khó dự đoán, đây là lý do tài liệu Selenium khuyến cáo không trộn hai cơ chế.",
      "en": "When each findElement call inside the explicit wait's polling loop is delayed by the implicit wait, total wait time can balloon unpredictably — which is why Selenium docs recommend not mixing the two.",
      "ja": "explicit waitのポーリングループ内の各findElement呼び出しがimplicit waitによって遅延されると、合計待機時間が予測不能に膨れ上がる可能性があり、これがSeleniumの公式ドキュメントが両者の混在を推奨しない理由である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "ExpectedConditions.elementToBeClickable dùng để chờ điều gì trước khi tương tác?",
      "en": "What does ExpectedConditions.elementToBeClickable wait for before interacting?",
      "ja": "ExpectedConditions.elementToBeClickableは操作前に何を待ちますか。"
    },
    "options": [
      {
        "vi": "Phần tử vừa hiển thị (visible) vừa được kích hoạt (enabled), sẵn sàng để click",
        "en": "The element is both visible and enabled, ready to be clicked",
        "ja": "要素が表示されており、かつ有効化されている(クリック可能な)状態である"
      },
      {
        "vi": "Trang đã tải xong toàn bộ tài nguyên tĩnh (CSS, ảnh)",
        "en": "The page has finished loading all static resources (CSS, images)",
        "ja": "ページがすべての静的リソース(CSS、画像)の読み込みを完了している"
      },
      {
        "vi": "Phần tử tồn tại trong DOM nhưng có thể đang bị ẩn",
        "en": "The element exists in the DOM but may still be hidden",
        "ja": "要素はDOMに存在するが、非表示のままである可能性がある"
      },
      {
        "vi": "URL của trang hiện tại khớp với một pattern cho trước",
        "en": "The current page URL matches a given pattern",
        "ja": "現在のページURLが指定されたパターンに一致している"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "elementToBeClickable kiểm tra phần tử vừa visible vừa enabled, đảm bảo hành động click sẽ không thất bại do phần tử bị disable hoặc chưa hiển thị.",
      "en": "elementToBeClickable checks that the element is both visible and enabled, ensuring a click action won't fail due to the element being disabled or not yet displayed.",
      "ja": "elementToBeClickableは要素が表示され、かつ有効化されていることを確認し、要素が無効または未表示のためにクリック操作が失敗しないようにする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "StaleElementReferenceException thường xảy ra trong ngữ cảnh nào liên quan đến chờ đồng bộ?",
      "en": "In what synchronization-related scenario does StaleElementReferenceException typically occur?",
      "ja": "同期待機に関連して、StaleElementReferenceExceptionは典型的にどのような状況で発生しますか。"
    },
    "options": [
      {
        "vi": "Khi trình duyệt bị đóng đột ngột trong lúc chạy test",
        "en": "When the browser is unexpectedly closed while the test is running",
        "ja": "テスト実行中にブラウザが突然閉じられたとき"
      },
      {
        "vi": "Khi tham chiếu phần tử đã lấy trước đó không còn hợp lệ vì DOM đã bị re-render (ví dụ sau AJAX cập nhật), nên cần tìm lại phần tử",
        "en": "When a previously fetched element reference is no longer valid because the DOM was re-rendered (e.g. after an AJAX update), requiring the element to be re-located",
        "ja": "以前取得した要素の参照が、DOMが再レンダリングされた(例:AJAX更新後)ために無効になり、要素を再取得する必要があるとき"
      },
      {
        "vi": "Khi timeout của WebDriverWait được đặt bằng 0",
        "en": "When the WebDriverWait timeout is set to 0",
        "ja": "WebDriverWaitのタイムアウトが0に設定されているとき"
      },
      {
        "vi": "Khi số lượng tab trình duyệt vượt quá giới hạn cho phép",
        "en": "When the number of open browser tabs exceeds the allowed limit",
        "ja": "開いているブラウザタブの数が許容限度を超えたとき"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "StaleElementReferenceException xuất hiện khi phần tử DOM đã bị thay thế/xoá sau khi driver lưu tham chiếu, thường do trang cập nhật động; giải pháp là tìm lại phần tử sau khi điều kiện chờ thỏa mãn.",
      "en": "StaleElementReferenceException occurs when the DOM element has been replaced or removed after the driver cached its reference, typically due to dynamic page updates; the fix is to re-locate the element after the wait condition is satisfied.",
      "ja": "StaleElementReferenceExceptionは、ドライバが参照をキャッシュした後にDOM要素が置き換えられたり削除されたりした場合(通常は動的なページ更新による)に発生し、対策は待機条件が満たされた後に要素を再取得することである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tại sao dùng ExpectedConditions.visibilityOfElementLocated thường an toàn hơn presenceOfElementLocated khi tương tác nhập liệu?",
      "en": "Why is ExpectedConditions.visibilityOfElementLocated usually safer than presenceOfElementLocated for input interactions?",
      "ja": "入力操作を行う際、ExpectedConditions.visibilityOfElementLocatedがpresenceOfElementLocatedより安全とされるのはなぜですか。"
    },
    "options": [
      {
        "vi": "visibilityOfElementLocated chạy nhanh hơn về mặt hiệu năng CPU",
        "en": "visibilityOfElementLocated performs faster in terms of CPU usage",
        "ja": "visibilityOfElementLocatedはCPU性能の面でより高速に動作する"
      },
      {
        "vi": "visibilityOfElementLocated tự động thực hiện click trước khi kiểm tra",
        "en": "visibilityOfElementLocated automatically performs a click before checking",
        "ja": "visibilityOfElementLocatedはチェック前に自動的にクリックを実行する"
      },
      {
        "vi": "presenceOfElementLocated chỉ xác nhận phần tử có trong DOM, kể cả khi bị ẩn hoặc chưa render xong, nên gõ chữ vào phần tử ẩn sẽ lỗi ElementNotInteractableException",
        "en": "presenceOfElementLocated only confirms the element exists in the DOM, even if hidden or not fully rendered, so typing into a hidden element throws ElementNotInteractableException",
        "ja": "presenceOfElementLocatedは要素がDOM上に存在することだけを確認するため、非表示やレンダリング未完了でも真となり、非表示の要素に入力するとElementNotInteractableExceptionが発生する"
      },
      {
        "vi": "presenceOfElementLocated không hoạt động với Chrome headless",
        "en": "presenceOfElementLocated does not work with headless Chrome",
        "ja": "presenceOfElementLocatedはヘッドレスChromeでは動作しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "presenceOfElementLocated chỉ kiểm tra DOM có node đó, không quan tâm hiển thị hay không, nên nếu phần tử còn ẩn (display:none) mà cố gõ chữ sẽ gây lỗi tương tác.",
      "en": "presenceOfElementLocated only checks that the DOM node exists, regardless of visibility, so typing into an element that is still hidden (display:none) will fail with an interaction error.",
      "ja": "presenceOfElementLocatedはDOMノードの存在のみを確認し、表示状態は問わないため、非表示(display:none)の要素に入力しようとすると操作エラーが発生する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi cần chờ một spinner loading biến mất trước khi tiếp tục thao tác, cách tiếp cận đúng nhất là gì?",
      "en": "When you need to wait for a loading spinner to disappear before continuing, what is the most correct approach?",
      "ja": "ローディングスピナーが消えるのを待ってから操作を続ける必要がある場合、最も正しいアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Dùng Thread.sleep với thời gian cố định đủ lớn để chắc chắn spinner đã biến mất",
        "en": "Use Thread.sleep with a fixed large enough duration to be sure the spinner has disappeared",
        "ja": "スピナーが確実に消えるだけの固定時間でThread.sleepを使う"
      },
      {
        "vi": "Bắt ngoại lệ NoSuchElementException rồi bỏ qua bước chờ",
        "en": "Catch the NoSuchElementException and skip the wait step entirely",
        "ja": "NoSuchElementExceptionをキャッチして待機ステップを丸ごとスキップする"
      },
      {
        "vi": "Refresh lại trang cho đến khi spinner không còn xuất hiện",
        "en": "Refresh the page repeatedly until the spinner no longer appears",
        "ja": "スピナーが表示されなくなるまでページを何度もリフレッシュする"
      },
      {
        "vi": "Dùng ExpectedConditions.invisibilityOfElementLocated cho locator của spinner",
        "en": "Use ExpectedConditions.invisibilityOfElementLocated on the spinner's locator",
        "ja": "スピナーのロケータに対してExpectedConditions.invisibilityOfElementLocatedを使う"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "invisibilityOfElementLocated là điều kiện chờ chuyên biệt cho trường hợp này, trả về true khi phần tử không còn hiển thị hoặc không còn trong DOM, tránh dùng sleep cứng gây lãng phí hoặc không đủ thời gian.",
      "en": "invisibilityOfElementLocated is the purpose-built condition for this case, returning true once the element is no longer visible or absent from the DOM, avoiding wasteful or insufficient hard sleeps.",
      "ja": "invisibilityOfElementLocatedはこのケース専用の条件で、要素が非表示になるかDOMから消えた時点でtrueを返し、無駄な、あるいは不十分な固定sleepを避けられる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "pageLoadTimeout trong Selenium khác với implicit wait / explicit wait ở chỗ nào?",
      "en": "How does pageLoadTimeout in Selenium differ from implicit wait / explicit wait?",
      "ja": "Seleniumのpage LoadTimeoutは、implicit wait／explicit waitとどう違いますか。"
    },
    "options": [
      {
        "vi": "pageLoadTimeout giới hạn thời gian chờ trình duyệt tải xong toàn bộ trang (điều hướng), không liên quan đến việc tìm phần tử cụ thể",
        "en": "pageLoadTimeout limits how long the browser waits for a full page navigation to complete, unrelated to locating a specific element",
        "ja": "pageLoadTimeoutはブラウザがページ全体のナビゲーション読み込みを完了するまでの待機時間を制限するもので、特定の要素の検索とは無関係である"
      },
      {
        "vi": "pageLoadTimeout thay thế hoàn toàn cho cả implicit và explicit wait",
        "en": "pageLoadTimeout completely replaces both implicit and explicit wait",
        "ja": "pageLoadTimeoutはimplicitとexplicitの両方の待機を完全に置き換える"
      },
      {
        "vi": "pageLoadTimeout chỉ áp dụng khi chạy trên trình duyệt Safari",
        "en": "pageLoadTimeout only applies when running on the Safari browser",
        "ja": "pageLoadTimeoutはSafariブラウザで実行する場合にのみ適用される"
      },
      {
        "vi": "pageLoadTimeout tự động retry điều hướng trang khi thất bại",
        "en": "pageLoadTimeout automatically retries page navigation upon failure",
        "ja": "pageLoadTimeoutはナビゲーションが失敗すると自動的に再試行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "pageLoadTimeout kiểm soát thời gian tối đa cho một lần điều hướng (driver.get hoặc click gây chuyển trang) hoàn tất, khác biệt về phạm vi so với wait dùng để chờ phần tử cụ thể.",
      "en": "pageLoadTimeout controls the maximum time allowed for a navigation (driver.get or a click that triggers navigation) to complete, a different scope from waits used to locate a specific element.",
      "ja": "pageLoadTimeoutはナビゲーション(driver.getや遷移を伴うクリック)が完了するまでの最大許容時間を制御するもので、特定の要素を待つwaitとは適用範囲が異なる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong một ứng dụng Single Page Application (SPA) dùng nhiều gọi AJAX bất đồng bộ, chiến lược wait nào phù hợp nhất để xác nhận dữ liệu đã render?",
      "en": "In a Single Page Application (SPA) with many asynchronous AJAX calls, which wait strategy is most suitable to confirm data has rendered?",
      "ja": "非同期AJAX呼び出しを多用するSPA(シングルページアプリケーション)で、データがレンダリングされたことを確認するのに最も適した待機戦略はどれですか。"
    },
    "options": [
      {
        "vi": "Chỉ dựa vào implicit wait mặc định 0 giây",
        "en": "Rely solely on the default implicit wait of 0 seconds",
        "ja": "デフォルトの0秒のimplicit waitのみに頼る"
      },
      {
        "vi": "Chờ explicit theo điều kiện nội dung/phần tử cụ thể xuất hiện trên UI (ví dụ textToBePresentInElement), thay vì chờ theo thời gian cố định",
        "en": "Use an explicit wait for a specific UI condition (e.g. textToBePresentInElement) rather than waiting a fixed amount of time",
        "ja": "固定時間の待機ではなく、UI上の特定の条件(例:textToBePresentInElement)を待つexplicit waitを使う"
      },
      {
        "vi": "Tắt JavaScript trong trình duyệt để tránh AJAX chạy chậm",
        "en": "Disable JavaScript in the browser to prevent slow AJAX calls",
        "ja": "AJAX呼び出しの遅延を避けるためブラウザでJavaScriptを無効にする"
      },
      {
        "vi": "Luôn dùng driver.navigate().refresh() sau mỗi hành động",
        "en": "Always call driver.navigate().refresh() after every action",
        "ja": "すべてのアクションの後に必ずdriver.navigate().refresh()を呼び出す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với SPA, thời gian phản hồi AJAX không cố định nên cần chờ theo điều kiện nội dung thực tế xuất hiện trên UI thay vì đoán thời gian, giúp test ổn định và không quá chậm.",
      "en": "In SPAs, AJAX response times are unpredictable, so waiting for the actual UI condition to appear rather than guessing a duration keeps tests stable and not needlessly slow.",
      "ja": "SPAではAJAXの応答時間が一定でないため、時間を推測するのではなく実際のUI条件の出現を待つことで、テストが安定し無駄に遅くならない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh với Selenium, cơ chế auto-waiting của Playwright/Cypress mang lại lợi ích gì về mặt đồng bộ?",
      "en": "Compared to Selenium, what synchronization benefit does the auto-waiting mechanism of Playwright/Cypress provide?",
      "ja": "SeleniumとPlaywright／Cypressの自動待機(auto-waiting)メカニズムを比較すると、同期においてどんな利点がありますか。"
    },
    "options": [
      {
        "vi": "Chúng chỉ hoạt động với trình duyệt Internet Explorer",
        "en": "They only work with the Internet Explorer browser",
        "ja": "Internet Explorerブラウザでのみ動作する"
      },
      {
        "vi": "Chúng loại bỏ hoàn toàn khái niệm timeout khỏi mọi test",
        "en": "They completely remove the concept of timeout from every test",
        "ja": "すべてのテストからタイムアウトという概念を完全になくす"
      },
      {
        "vi": "Chúng tự động chờ phần tử actionable (visible, enabled, không bị che) trước hầu hết hành động mà không cần viết wait tường minh cho từng bước",
        "en": "They automatically wait for an element to be actionable (visible, enabled, not obstructed) before most actions, without needing explicit waits written for every step",
        "ja": "ほとんどのアクションの前に要素がアクション可能(表示・有効・遮蔽なし)であることを自動的に待つため、各ステップごとに明示的な待機コードを書く必要がない"
      },
      {
        "vi": "Chúng yêu cầu viết fluent wait thủ công cho mọi lệnh click",
        "en": "They require manually writing a fluent wait for every click command",
        "ja": "すべてのクリックコマンドに手動でfluent waitを書く必要がある"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright và Cypress tích hợp sẵn cơ chế tự động chờ phần tử ở trạng thái sẵn sàng thao tác trước khi thực hiện hành động, giảm đáng kể nhu cầu viết wait tường minh so với Selenium truyền thống.",
      "en": "Playwright and Cypress have built-in mechanisms that automatically wait for elements to be actionable before performing actions, greatly reducing the need for explicit waits compared to traditional Selenium.",
      "ja": "PlaywrightとCypressはアクション実行前に要素がアクション可能な状態になるのを自動的に待つ組み込みメカニズムを持っており、従来のSeleniumに比べて明示的な待機コードの必要性を大幅に減らす。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Custom ExpectedCondition (implement interface Function<WebDriver, T>) thường được viết khi nào?",
      "en": "When would you typically write a custom ExpectedCondition (implementing the Function<WebDriver, T> interface)?",
      "ja": "カスタムExpectedCondition(Function<WebDriver, T>インターフェースを実装)は通常どのような場合に書きますか。"
    },
    "options": [
      {
        "vi": "Khi muốn bỏ qua bước đăng nhập trong test",
        "en": "When you want to skip the login step in a test",
        "ja": "テストでログインステップをスキップしたい場合"
      },
      {
        "vi": "Khi muốn tắt hẳn tính năng wait của Selenium",
        "en": "When you want to completely disable Selenium's wait feature",
        "ja": "Seleniumの待機機能を完全に無効化したい場合"
      },
      {
        "vi": "Khi cần chuyển đổi ngôn ngữ hiển thị của trình duyệt",
        "en": "When you need to change the browser's display language",
        "ja": "ブラウザの表示言語を変更する必要がある場合"
      },
      {
        "vi": "Khi cần điều kiện chờ nghiệp vụ đặc thù mà thư viện ExpectedConditions có sẵn không đáp ứng, ví dụ chờ số lượng phần tử trong bảng đạt một giá trị cụ thể",
        "en": "When you need a business-specific wait condition not covered by the built-in ExpectedConditions library, e.g. waiting for a table's row count to reach a specific value",
        "ja": "組み込みのExpectedConditionsライブラリでカバーされていない特有のビジネス的待機条件(例:テーブルの行数が特定の値に達するのを待つ)が必要な場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Custom ExpectedCondition hữu ích khi logic chờ vượt ngoài các điều kiện sẵn có, cho phép định nghĩa hàm apply() trả về kết quả mong muốn khi điều kiện nghiệp vụ thỏa mãn.",
      "en": "A custom ExpectedCondition is useful when the wait logic goes beyond the built-in conditions, letting you define an apply() function that returns the desired result once a business condition is met.",
      "ja": "カスタムExpectedConditionは、待機ロジックが組み込み条件の範囲を超える場合に有用で、ビジネス条件が満たされたときに望む結果を返すapply()関数を定義できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì xảy ra khi thời gian chờ của WebDriverWait hết hạn mà điều kiện vẫn chưa thỏa mãn?",
      "en": "What happens when a WebDriverWait's timeout expires while the condition is still not met?",
      "ja": "WebDriverWaitのタイムアウトが経過しても条件がまだ満たされていない場合、何が起こりますか。"
    },
    "options": [
      {
        "vi": "Selenium ném ra TimeoutException",
        "en": "Selenium throws a TimeoutException",
        "ja": "SeleniumはTimeoutExceptionを投げる"
      },
      {
        "vi": "WebDriverWait trả về null một cách âm thầm mà không báo lỗi",
        "en": "WebDriverWait silently returns null without raising an error",
        "ja": "WebDriverWaitはエラーを出さずに黙ってnullを返す"
      },
      {
        "vi": "Trình duyệt tự động đóng lại",
        "en": "The browser automatically closes",
        "ja": "ブラウザが自動的に閉じる"
      },
      {
        "vi": "Test tự động chuyển sang trạng thái skip",
        "en": "The test automatically transitions to a skipped state",
        "ja": "テストは自動的にスキップ状態に移行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi hết thời gian chờ mà điều kiện chưa đúng, WebDriverWait ném TimeoutException, cho phép test framework ghi nhận thất bại rõ ràng thay vì tiếp tục chạy với trạng thái không xác định.",
      "en": "When the timeout elapses without the condition being met, WebDriverWait throws a TimeoutException, letting the test framework register a clear failure instead of continuing in an undefined state.",
      "ja": "タイムアウトが経過しても条件が満たされない場合、WebDriverWaitはTimeoutExceptionを投げ、テストフレームワークが不確定な状態のまま続行するのではなく明確な失敗として記録できるようにする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi chờ một alert JavaScript xuất hiện trước khi tương tác, nên dùng ExpectedConditions nào?",
      "en": "When waiting for a JavaScript alert to appear before interacting with it, which ExpectedConditions method should be used?",
      "ja": "JavaScriptアラートが表示されるのを待ってから操作する場合、どのExpectedConditionsメソッドを使うべきですか。"
    },
    "options": [
      {
        "vi": "presenceOfElementLocated",
        "en": "presenceOfElementLocated",
        "ja": "presenceOfElementLocated"
      },
      {
        "vi": "alertIsPresent",
        "en": "alertIsPresent",
        "ja": "alertIsPresent"
      },
      {
        "vi": "titleContains",
        "en": "titleContains",
        "ja": "titleContains"
      },
      {
        "vi": "frameToBeAvailableAndSwitchToIt",
        "en": "frameToBeAvailableAndSwitchToIt",
        "ja": "frameToBeAvailableAndSwitchToIt"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "alertIsPresent là điều kiện chuyên biệt trả về đối tượng Alert khi hộp thoại JavaScript (alert/confirm/prompt) xuất hiện, tránh NoAlertPresentException khi thao tác quá sớm.",
      "en": "alertIsPresent is the dedicated condition that returns an Alert object once a JavaScript dialog (alert/confirm/prompt) appears, avoiding a NoAlertPresentException from acting too early.",
      "ja": "alertIsPresentは、JavaScriptダイアログ(alert/confirm/prompt)が表示されたときにAlertオブジェクトを返す専用の条件であり、早すぎる操作によるNoAlertPresentExceptionを回避する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao thao tác trên iframe thường cần chờ đồng bộ đặc biệt, ví dụ frameToBeAvailableAndSwitchToIt?",
      "en": "Why does interacting with an iframe typically require special synchronization, such as frameToBeAvailableAndSwitchToIt?",
      "ja": "iframe内での操作にframeToBeAvailableAndSwitchToItのような特別な同期待機が通常必要なのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì iframe luôn tải chậm hơn 10 lần so với trang chính",
        "en": "Because an iframe always loads 10 times slower than the main page",
        "ja": "iframeは常にメインページより10倍遅く読み込まれるため"
      },
      {
        "vi": "Vì iframe không hỗ trợ locator theo CSS selector",
        "en": "Because iframes do not support CSS selector locators",
        "ja": "iframeはCSSセレクタによるロケータをサポートしないため"
      },
      {
        "vi": "Vì nội dung iframe có thể chưa được tải/gắn vào DOM ngay khi trang cha sẵn sàng, và WebDriver cần chuyển ngữ cảnh (switchTo) đúng lúc mới thao tác được bên trong",
        "en": "Because the iframe's content may not yet be loaded/attached to the DOM when the parent page is ready, and WebDriver must switch context (switchTo) at the right time to interact inside it",
        "ja": "親ページが準備完了しても、iframeの内容がまだ読み込まれてDOMにアタッチされていない場合があり、WebDriverが内部を操作するには適切なタイミングでコンテキストを切り替える(switchTo)必要があるため"
      },
      {
        "vi": "Vì mỗi iframe yêu cầu một trình duyệt riêng biệt",
        "en": "Because each iframe requires a separate browser instance",
        "ja": "各iframeは個別のブラウザインスタンスを必要とするため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "iframe có tài liệu con độc lập, có thể tải bất đồng bộ; nếu chuyển ngữ cảnh quá sớm khi frame chưa gắn vào DOM sẽ gây lỗi NoSuchFrameException, do đó cần chờ điều kiện frame khả dụng trước khi switchTo.",
      "en": "An iframe has its own independent document that may load asynchronously; switching context too early, before the frame is attached to the DOM, causes a NoSuchFrameException, so waiting for frame availability before switchTo is necessary.",
      "ja": "iframeは独立したドキュメントを持ち非同期に読み込まれることがあるため、フレームがDOMにアタッチされる前に早すぎるコンテキスト切り替えを行うとNoSuchFrameExceptionが発生する。そのためswitchToの前にフレームが利用可能になるのを待つ必要がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Giá trị mặc định của implicit wait khi khởi tạo một WebDriver mới (chưa cấu hình gì) là bao nhiêu?",
      "en": "What is the default implicit wait value when a new WebDriver is instantiated (with no configuration applied)?",
      "ja": "新しいWebDriverをインスタンス化した際(何も設定していない状態)の暗黙的な待機のデフォルト値はいくつですか。"
    },
    "options": [
      {
        "vi": "30 giây",
        "en": "30 seconds",
        "ja": "30秒"
      },
      {
        "vi": "5 phút",
        "en": "5 minutes",
        "ja": "5分"
      },
      {
        "vi": "60 giây",
        "en": "60 seconds",
        "ja": "60秒"
      },
      {
        "vi": "0 giây (không chờ, tìm ngay lập tức)",
        "en": "0 seconds (no wait, searches immediately)",
        "ja": "0秒(待機なし、即座に検索)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mặc định implicit wait là 0, nghĩa là WebDriver tìm phần tử ngay lập tức và ném NoSuchElementException nếu không thấy, trừ khi được cấu hình rõ ràng qua driver.manage().timeouts().implicitlyWait(...).",
      "en": "The default implicit wait is 0, meaning WebDriver searches for the element immediately and throws NoSuchElementException if not found, unless explicitly configured via driver.manage().timeouts().implicitlyWait(...).",
      "ja": "デフォルトの暗黙的な待機は0であり、WebDriverは要素を即座に検索し、見つからなければNoSuchElementExceptionを投げる。これはdriver.manage().timeouts().implicitlyWait(...)で明示的に設定しない限り変わらない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tại sao việc lạm dụng thời gian timeout quá dài cho mọi explicit wait trong toàn bộ bộ test là một anti-pattern?",
      "en": "Why is setting an excessively long timeout for every explicit wait across the whole test suite considered an anti-pattern?",
      "ja": "テストスイート全体のあらゆるexplicit waitに過度に長いタイムアウトを設定することが、なぜアンチパターンとされるのですか。"
    },
    "options": [
      {
        "vi": "Vì nó che giấu các lỗi thực sự (bug đồng bộ, phần tử không bao giờ xuất hiện) bằng cách khiến test chạy rất lâu trước khi thất bại, làm chậm phản hồi và khó chẩn đoán nguyên nhân",
        "en": "Because it masks real defects (synchronization bugs, elements that never appear) by making tests run very long before failing, slowing feedback and hindering diagnosis",
        "ja": "実際の欠陥(同期バグ、決して現れない要素)を、テストが失敗する前に非常に長く実行させることで隠してしまい、フィードバックを遅らせ原因の診断を困難にするため"
      },
      {
        "vi": "Vì Selenium giới hạn tối đa timeout là 3 giây",
        "en": "Because Selenium enforces a hard maximum timeout of 3 seconds",
        "ja": "Seleniumはタイムアウトの上限を3秒に強制しているため"
      },
      {
        "vi": "Vì timeout dài làm tăng dung lượng file log gấp đôi",
        "en": "Because a long timeout doubles the log file size",
        "ja": "タイムアウトを長くするとログファイルのサイズが2倍になるため"
      },
      {
        "vi": "Vì trình duyệt sẽ tự động crash sau 10 giây chờ",
        "en": "Because the browser automatically crashes after 10 seconds of waiting",
        "ja": "ブラウザは10秒待機すると自動的にクラッシュするため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Timeout quá dài khiến mỗi test thất bại thực sự tốn rất nhiều thời gian mới báo lỗi, làm chậm toàn bộ suite và gây khó khăn khi debug; nên chọn timeout hợp lý dựa trên đặc tính ứng dụng.",
      "en": "An excessively long timeout means every genuinely failing test takes a long time to report the failure, slowing the whole suite and making debugging harder; timeouts should be tuned to the application's real behavior.",
      "ja": "タイムアウトが長すぎると、実際に失敗するテストが失敗を報告するまでに長い時間がかかり、スイート全体が遅くなりデバッグも困難になる。タイムアウトはアプリケーションの実際の挙動に基づいて適切に設定すべきである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong tình huống một danh sách sản phẩm được load dần bằng lazy loading khi cuộn trang, chiến lược wait nào phù hợp để kiểm tra đủ số lượng phần tử?",
      "en": "For a product list that lazy-loads more items as the user scrolls, which wait strategy suits verifying the item count has reached the expected number?",
      "ja": "スクロールに応じて商品リストが遅延読み込み(lazy loading)される場面で、要素数が期待値に達したことを確認するのに適した待機戦略はどれですか。"
    },
    "options": [
      {
        "vi": "Gọi driver.close() rồi mở lại trang để reset danh sách",
        "en": "Call driver.close() then reopen the page to reset the list",
        "ja": "driver.close()を呼んでからページを開き直してリストをリセットする"
      },
      {
        "vi": "Dùng fluent wait hoặc custom condition poll số lượng phần tử findElements() cho đến khi đạt ngưỡng mong muốn",
        "en": "Use a fluent wait or custom condition that polls the findElements() count until it reaches the desired threshold",
        "ja": "期待するしきい値に達するまでfindElements()の数をポーリングするfluent waitまたはカスタム条件を使う"
      },
      {
        "vi": "Chỉ cần một lần findElements() duy nhất ngay khi trang vừa load xong",
        "en": "A single findElements() call right when the page finishes loading is sufficient",
        "ja": "ページの読み込み完了直後に一度だけfindElements()を呼べば十分である"
      },
      {
        "vi": "Tắt tính năng cuộn trang bằng CSS để tránh phải chờ",
        "en": "Disable page scrolling via CSS to avoid having to wait",
        "ja": "待機を避けるためCSSでページのスクロール機能を無効にする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì danh sách tăng dần theo thời gian không xác định, cần poll liên tục số lượng phần tử bằng fluent wait hoặc custom ExpectedCondition cho đến khi đạt số lượng mong muốn, thay vì kiểm tra một lần.",
      "en": "Since the list grows over an indeterminate time, you need to continuously poll the element count via a fluent wait or custom ExpectedCondition until the expected count is reached, rather than checking once.",
      "ja": "リストは不確定な時間をかけて増加していくため、一度だけチェックするのではなく、fluent waitまたはカスタムExpectedConditionで要素数を継続的にポーリングし、期待する数に達するのを待つ必要がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì KHÔNG đúng khi mô tả về script timeout (setScriptTimeout) trong Selenium?",
      "en": "Which statement is INCORRECT about script timeout (setScriptTimeout) in Selenium?",
      "ja": "Seleniumのスクリプトタイムアウト(setScriptTimeout)についての説明として正しくないものはどれですか。"
    },
    "options": [
      {
        "vi": "Nó giới hạn thời gian thực thi tối đa cho các lệnh executeAsyncScript",
        "en": "It limits the maximum execution time for executeAsyncScript calls",
        "ja": "executeAsyncScriptの実行にかかる最大時間を制限する"
      },
      {
        "vi": "Nó liên quan đến việc thực thi mã JavaScript bất đồng bộ trong trình duyệt",
        "en": "It relates to executing asynchronous JavaScript code within the browser",
        "ja": "ブラウザ内での非同期JavaScriptコード実行に関連する"
      },
      {
        "vi": "Nó dùng để chờ phần tử HTML xuất hiện trong DOM, thay thế cho explicit wait",
        "en": "It is used to wait for an HTML element to appear in the DOM, replacing explicit wait",
        "ja": "HTML要素がDOMに現れるのを待つために使われ、explicit waitの代替となる"
      },
      {
        "vi": "Nó có thể cấu hình riêng biệt với pageLoadTimeout và implicit wait",
        "en": "It can be configured independently of pageLoadTimeout and implicit wait",
        "ja": "pageLoadTimeoutやimplicit waitとは独立して設定できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Script timeout chỉ áp dụng cho việc thực thi script bất đồng bộ (executeAsyncScript), không liên quan đến việc chờ phần tử HTML xuất hiện — đó là vai trò của explicit/implicit wait.",
      "en": "Script timeout only applies to asynchronous script execution (executeAsyncScript) and has nothing to do with waiting for HTML elements to appear — that's the role of explicit/implicit wait.",
      "ja": "スクリプトタイムアウトは非同期スクリプト実行(executeAsyncScript)にのみ適用され、HTML要素の出現を待つこととは無関係である。それはexplicit/implicit waitの役割である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi phỏng vấn, ứng viên được hỏi tại sao không nên gọi Thread.sleep(5000) sau MỌI hành động click trong test suite lớn. Lý do thuyết phục nhất là gì?",
      "en": "An interviewer asks why you shouldn't call Thread.sleep(5000) after EVERY click action in a large test suite. What is the most convincing reason?",
      "ja": "面接で、大規模なテストスイートのすべてのクリックアクションの後にThread.sleep(5000)を呼ぶべきでない理由を尋ねられました。最も説得力のある理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì Thread.sleep tự động đóng phiên trình duyệt sau khi gọi",
        "en": "Because Thread.sleep automatically closes the browser session after being called",
        "ja": "Thread.sleepは呼び出し後にブラウザセッションを自動的に閉じるため"
      },
      {
        "vi": "Vì Thread.sleep không tồn tại trong ngôn ngữ Java",
        "en": "Because Thread.sleep does not exist in the Java language",
        "ja": "Thread.sleepはJava言語に存在しないため"
      },
      {
        "vi": "Vì Thread.sleep chỉ hoạt động trên hệ điều hành Linux",
        "en": "Because Thread.sleep only works on Linux operating systems",
        "ja": "Thread.sleepはLinuxオペレーティングシステムでしか動作しないため"
      },
      {
        "vi": "Nó làm tăng đáng kể tổng thời gian chạy test một cách không cần thiết dù điều kiện đã sẵn sàng sớm hơn, đồng thời vẫn có thể không đủ khi hệ thống chậm bất thường",
        "en": "It unnecessarily inflates total suite runtime even when the condition is ready earlier, while still potentially being insufficient when the system is unusually slow",
        "ja": "条件がそれより早く整っている場合でもスイート全体の実行時間を不必要に増大させる一方、システムが異常に遅い場合には依然として不十分な可能性がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sleep cố định vừa lãng phí thời gian khi hệ thống phản hồi nhanh, vừa không đủ tin cậy khi hệ thống chậm hơn dự kiến, khác với wait động luôn bám sát điều kiện thực tế.",
      "en": "A fixed sleep wastes time when the system responds quickly, yet remains unreliable when the system is slower than expected — unlike dynamic waits that track the actual condition.",
      "ja": "固定のsleepは、システムが速く応答する場合には時間を無駄にし、想定より遅い場合には依然として信頼性がない。これは実際の条件に追随する動的な待機とは対照的である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Cypress, thay vì gọi cy.wait(5000), nhóm test nên ưu tiên cách nào để đồng bộ với một request mạng cụ thể?",
      "en": "In Cypress, instead of calling cy.wait(5000), what should a test team prefer to synchronize with a specific network request?",
      "ja": "Cypressにおいて、cy.wait(5000)を呼ぶ代わりに、特定のネットワークリクエストと同期するためにテストチームはどの方法を優先すべきですか。"
    },
    "options": [
      {
        "vi": "Dùng cy.intercept() để gắn alias cho request rồi cy.wait('@aliasName') để chờ chính xác request đó hoàn tất",
        "en": "Use cy.intercept() to alias the request, then cy.wait('@aliasName') to wait precisely for that request to complete",
        "ja": "cy.intercept()でリクエストにエイリアスを付け、cy.wait('@aliasName')でそのリクエストの完了を正確に待つ"
      },
      {
        "vi": "Gọi cy.reload() liên tục cho đến khi request hoàn tất",
        "en": "Repeatedly call cy.reload() until the request completes",
        "ja": "リクエストが完了するまでcy.reload()を繰り返し呼ぶ"
      },
      {
        "vi": "Tăng số lượng cy.wait(5000) lên gấp đôi để chắc chắn hơn",
        "en": "Double up the number of cy.wait(5000) calls to be extra sure",
        "ja": "より確実にするためcy.wait(5000)の呼び出し回数を2倍にする"
      },
      {
        "vi": "Chuyển toàn bộ test sang chạy đồng bộ (synchronous) thủ công",
        "en": "Convert the entire test to run manually in a synchronous manner",
        "ja": "テスト全体を手動で同期的(synchronous)に実行するよう変換する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "cy.intercept kết hợp alias và cy.wait('@alias') cho phép chờ chính xác network request cụ thể hoàn tất thay vì đoán thời gian cố định, giúp test ổn định và nhanh hơn.",
      "en": "cy.intercept combined with an alias and cy.wait('@alias') lets you wait precisely for a specific network request to finish instead of guessing a fixed duration, making tests more stable and faster.",
      "ja": "cy.interceptとエイリアス、そしてcy.wait('@alias')を組み合わせることで、固定時間を推測するのではなく特定のネットワークリクエストの完了を正確に待つことができ、テストがより安定し高速になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Playwright, phương thức nào thường được dùng để chờ một phần tử đạt trạng thái cụ thể (visible, hidden, attached...) trước khi tương tác?",
      "en": "In Playwright, which method is typically used to wait for an element to reach a specific state (visible, hidden, attached...) before interacting?",
      "ja": "Playwrightで、操作前に要素が特定の状態(visible、hidden、attachedなど)に達するのを待つために通常使われるメソッドはどれですか。"
    },
    "options": [
      {
        "vi": "page.setViewportSize()",
        "en": "page.setViewportSize()",
        "ja": "page.setViewportSize()"
      },
      {
        "vi": "page.waitForSelector() với tùy chọn state",
        "en": "page.waitForSelector() with a state option",
        "ja": "stateオプション付きのpage.waitForSelector()"
      },
      {
        "vi": "page.setDefaultNavigationTimeout()",
        "en": "page.setDefaultNavigationTimeout()",
        "ja": "page.setDefaultNavigationTimeout()"
      },
      {
        "vi": "page.emulateMedia()",
        "en": "page.emulateMedia()",
        "ja": "page.emulateMedia()"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "waitForSelector cho phép chỉ định state như 'visible' hoặc 'attached' để chờ phần tử đạt đúng trạng thái mong muốn trước khi thao tác tiếp, tương tự vai trò ExpectedConditions trong Selenium.",
      "en": "waitForSelector allows specifying a state such as 'visible' or 'attached' to wait for the element to reach the desired state before proceeding, similar to the role of ExpectedConditions in Selenium.",
      "ja": "waitForSelectorは'visible'や'attached'などのstateを指定でき、操作を続ける前に要素が望む状態に達するのを待てる。これはSeleniumにおけるExpectedConditionsの役割に似ている。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một test tự động click nút Submit ngay sau khi gõ dữ liệu vào form, nhưng thỉnh thoảng bị lỗi vì nút chưa kịp enable sau khi validation JS chạy xong. Giải pháp đúng đắn nhất là gì?",
      "en": "A test clicks the Submit button right after filling the form, but occasionally fails because the button hasn't been enabled yet after client-side JS validation finishes. What is the most correct fix?",
      "ja": "フォーム入力直後にSubmitボタンをクリックするテストが、クライアント側のJSバリデーション完了後にまだボタンが有効化されていないために時折失敗します。最も正しい解決策は何ですか。"
    },
    "options": [
      {
        "vi": "Click hai lần liên tiếp để tăng khả năng thành công",
        "en": "Click twice in quick succession to increase the chance of success",
        "ja": "成功率を上げるために連続して2回クリックする"
      },
      {
        "vi": "Xóa toàn bộ đoạn code validate JS phía client",
        "en": "Remove the entire client-side JS validation code",
        "ja": "クライアント側のJSバリデーションコードを丸ごと削除する"
      },
      {
        "vi": "Thêm explicit wait chờ ExpectedConditions.elementToBeClickable(submitButton) trước khi click",
        "en": "Add an explicit wait for ExpectedConditions.elementToBeClickable(submitButton) before clicking",
        "ja": "クリック前にExpectedConditions.elementToBeClickable(submitButton)を待つexplicit waitを追加する"
      },
      {
        "vi": "Dùng JavaScriptExecutor để ép click bất kể trạng thái enable của nút",
        "en": "Use JavaScriptExecutor to force a click regardless of the button's enabled state",
        "ja": "ボタンの有効化状態に関わらずJavaScriptExecutorで強制的にクリックする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "elementToBeClickable đảm bảo nút vừa hiển thị vừa enable trước khi click, giải quyết đúng gốc rễ vấn đề là race condition giữa validate JS và hành động click, thay vì các cách né tránh không bền vững.",
      "en": "elementToBeClickable ensures the button is both visible and enabled before clicking, correctly addressing the root cause — a race condition between JS validation and the click action — rather than relying on unreliable workarounds.",
      "ja": "elementToBeClickableはクリック前にボタンが表示され有効化されていることを保証し、JSバリデーションとクリック操作の間の競合状態(レースコンディション)という根本原因に正しく対処する。信頼性の低い回避策とは異なる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong mô hình Page Object Model, thành phần nào KHÔNG nên xuất hiện bên trong một lớp Page Object?",
      "en": "In the Page Object Model, which element should NOT appear inside a Page Object class?",
      "ja": "ページオブジェクトモデルにおいて、ページオブジェクトクラスの中に含めるべきでない要素はどれか。"
    },
    "options": [
      {
        "vi": "Các locator (bộ định vị) của phần tử trên trang",
        "en": "Locators for elements on the page",
        "ja": "ページ上の要素のロケーター"
      },
      {
        "vi": "Các phương thức thao tác nghiệp vụ (ví dụ login, addToCart)",
        "en": "Methods for business actions (e.g. login, addToCart)",
        "ja": "ログインやカート追加などのビジネス操作メソッド"
      },
      {
        "vi": "Constructor khởi tạo driver/page cho lớp",
        "en": "A constructor that initializes the driver/page for the class",
        "ja": "クラスのdriver/pageを初期化するコンストラクタ"
      },
      {
        "vi": "Câu lệnh assert kiểm tra kết quả mong đợi của test case",
        "en": "Assertion statements that verify the test case's expected result",
        "ja": "テストケースの期待結果を検証するアサーション文"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Page Object chỉ nên mô tả cấu trúc và hành vi của trang; việc assert kết quả thuộc về lớp test để giữ Page Object tái sử dụng được cho nhiều kịch bản khác nhau.",
      "en": "A Page Object should only describe the page's structure and behavior; assertions belong in the test layer so the Page Object stays reusable across different scenarios.",
      "ja": "ページオブジェクトはページの構造と振る舞いのみを表すべきで、検証（アサーション）はテスト層に置くことで、異なるシナリオでも再利用可能になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Page Factory trong Selenium Java sử dụng annotation nào để khai báo một WebElement?",
      "en": "In Selenium Java's Page Factory, which annotation is used to declare a WebElement?",
      "ja": "Selenium JavaのPage Factoryにおいて、WebElementを宣言するために使われるアノテーションはどれか。"
    },
    "options": [
      {
        "vi": "@FindBy",
        "en": "@FindBy",
        "ja": "@FindBy"
      },
      {
        "vi": "@Autowired",
        "en": "@Autowired",
        "ja": "@Autowired"
      },
      {
        "vi": "@Override",
        "en": "@Override",
        "ja": "@Override"
      },
      {
        "vi": "@Inject",
        "en": "@Inject",
        "ja": "@Inject"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Page Factory dùng annotation @FindBy để gắn locator lên trường WebElement, sau đó PageFactory.initElements() sẽ khởi tạo các phần tử đó.",
      "en": "Page Factory uses the @FindBy annotation to attach a locator to a WebElement field, then PageFactory.initElements() initializes those elements.",
      "ja": "Page FactoryはWebElementフィールドにロケーターを紐付けるために@FindByアノテーションを使い、その後PageFactory.initElements()がそれらの要素を初期化する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Cơ chế 'lazy initialization' (khởi tạo trễ) mà Page Factory áp dụng cho WebElement mang lại lợi ích chính nào?",
      "en": "What is the main benefit of the 'lazy initialization' mechanism that Page Factory applies to WebElement?",
      "ja": "Page FactoryがWebElementに適用する「遅延初期化（レイジー初期化）」の主な利点は何か。"
    },
    "options": [
      {
        "vi": "Tự động chụp ảnh màn hình khi test thất bại",
        "en": "Automatically takes a screenshot when a test fails",
        "ja": "テスト失敗時に自動でスクリーンショットを撮る"
      },
      {
        "vi": "Phần tử chỉ được tìm kiếm thực sự trên DOM tại thời điểm được sử dụng, giúp giảm lỗi tìm phần tử quá sớm khi trang chưa tải xong",
        "en": "The element is only actually located on the DOM when it is used, reducing errors from searching too early before the page finishes loading",
        "ja": "要素は実際に使用される時点で初めてDOM上を検索されるため、ページ読み込み前の早すぎる検索によるエラーを減らせる"
      },
      {
        "vi": "Giảm số dòng code cấu hình driver",
        "en": "Reduces the number of lines needed to configure the driver",
        "ja": "driver設定に必要な行数を減らす"
      },
      {
        "vi": "Tự động dịch nội dung trang sang nhiều ngôn ngữ",
        "en": "Automatically translates page content into multiple languages",
        "ja": "ページ内容を自動的に多言語翻訳する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với lazy initialization, WebElement chỉ được proxy tìm kiếm thực sự khi có thao tác gọi tới nó, tránh NoSuchElementException nếu tìm quá sớm.",
      "en": "With lazy initialization, the WebElement proxy only performs the actual lookup when an action is invoked on it, avoiding NoSuchElementException from searching too early.",
      "ja": "遅延初期化により、WebElementのプロキシは実際に操作が呼び出された時に初めて検索を行うため、早すぎる検索によるNoSuchElementExceptionを回避できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "So với việc gọi driver.findElement() trực tiếp rải rác khắp các file test, lợi ích bảo trì lớn nhất của POM là gì?",
      "en": "Compared to calling driver.findElement() scattered across many test files, what is the biggest maintenance benefit of POM?",
      "ja": "driver.findElement()を多数のテストファイルに散在させて呼び出す方法と比べ、POMの最大の保守上の利点は何か。"
    },
    "options": [
      {
        "vi": "Không cần cài đặt trình duyệt để chạy test",
        "en": "No browser installation is needed to run tests",
        "ja": "テスト実行にブラウザのインストールが不要になる"
      },
      {
        "vi": "Test chạy nhanh hơn gấp đôi",
        "en": "Tests run twice as fast",
        "ja": "テストの実行速度が2倍になる"
      },
      {
        "vi": "Khi UI thay đổi, chỉ cần sửa locator ở một nơi duy nhất (Page Object) thay vì sửa ở nhiều file test",
        "en": "When the UI changes, you only need to update the locator in one place (the Page Object) instead of many test files",
        "ja": "UIが変更されても、ロケーターの修正はPage Object一箇所のみで済み、多数のテストファイルを直す必要がない"
      },
      {
        "vi": "Tự động tạo báo cáo test dạng PDF",
        "en": "Automatically generates test reports in PDF format",
        "ja": "テストレポートを自動でPDF形式で生成する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "POM tập trung locator và thao tác vào một lớp đại diện cho trang, nên khi UI đổi chỉ cần sửa một chỗ, giảm chi phí bảo trì đáng kể.",
      "en": "POM centralizes locators and actions into one class representing the page, so a UI change requires editing only one place, greatly reducing maintenance cost.",
      "ja": "POMはロケーターと操作をページを表す1つのクラスに集約するため、UI変更時の修正箇所が一つで済み、保守コストを大幅に削減できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong mô hình 'Fluent Page Object', các phương thức thường được thiết kế theo phong cách nào?",
      "en": "In the 'Fluent Page Object' pattern, methods are typically designed in what style?",
      "ja": "「フルーエントページオブジェクト」パターンにおいて、メソッドは通常どのようなスタイルで設計されるか。"
    },
    "options": [
      {
        "vi": "Mỗi phương thức trả về void và không liên kết được với nhau",
        "en": "Every method returns void and cannot be chained together",
        "ja": "すべてのメソッドがvoidを返し、連結できない"
      },
      {
        "vi": "Mỗi phương thức bắt buộc phải nhận tham số kiểu String",
        "en": "Every method must accept a String parameter",
        "ja": "すべてのメソッドはString型の引数を受け取る必要がある"
      },
      {
        "vi": "Mỗi phương thức chỉ được gọi một lần duy nhất trong toàn bộ chương trình",
        "en": "Each method can only be called once in the entire program",
        "ja": "各メソッドはプログラム全体で一度しか呼び出せない"
      },
      {
        "vi": "Mỗi phương thức trả về đối tượng Page Object (this hoặc trang kế tiếp) để có thể gọi chuỗi liên tiếp (method chaining)",
        "en": "Each method returns a Page Object instance (this or the next page) so calls can be chained together (method chaining)",
        "ja": "各メソッドがPage Objectインスタンス（thisまたは次のページ）を返し、メソッドチェーンとして連続呼び出しできるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Fluent Page Object cho phép gọi chuỗi các hành động như loginPage.enterUsername(x).enterPassword(y).clickLogin() nhờ mỗi phương thức trả về đối tượng page tương ứng.",
      "en": "Fluent Page Objects allow chained calls like loginPage.enterUsername(x).enterPassword(y).clickLogin() because each method returns the relevant page object.",
      "ja": "フルーエントページオブジェクトは、各メソッドが該当するページオブジェクトを返すことで、loginPage.enterUsername(x).enterPassword(y).clickLogin()のような連続呼び出しを可能にする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một hành động trên trang (ví dụ click nút Submit) dẫn tới điều hướng sang trang khác, phương thức đó trong Page Object nên trả về gì để đúng nguyên tắc thiết kế?",
      "en": "When an action on a page (e.g. clicking Submit) navigates to a different page, what should that method in the Page Object return to follow good design practice?",
      "ja": "ページ上の操作（例：Submitボタンのクリック）が別のページへの遷移を伴う場合、優れた設計原則に従うとPage Object内のそのメソッドは何を返すべきか。"
    },
    "options": [
      {
        "vi": "Một đối tượng đại diện cho trang mới được điều hướng tới",
        "en": "An object representing the new page that was navigated to",
        "ja": "遷移先の新しいページを表すオブジェクト"
      },
      {
        "vi": "Chuỗi HTML thô của trang hiện tại",
        "en": "The raw HTML string of the current page",
        "ja": "現在のページの生のHTML文字列"
      },
      {
        "vi": "Giá trị boolean true bất kể kết quả thế nào",
        "en": "A boolean true regardless of the outcome",
        "ja": "結果に関わらず常にboolean true"
      },
      {
        "vi": "Không trả về gì (void) để tránh phức tạp hóa code",
        "en": "Nothing (void), to avoid complicating the code",
        "ja": "複雑さを避けるため何も返さない（void）"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trả về đối tượng Page Object của trang mới giúp test rõ ràng về luồng điều hướng và tận dụng được method chaining, đây là thực hành chuẩn của POM.",
      "en": "Returning the Page Object of the new page makes navigation flow explicit in the test and enables method chaining, which is standard POM practice.",
      "ja": "新しいページのPage Objectを返すことで、テストにおける遷移フローが明確になり、メソッドチェーンも活用できる。これはPOMの標準的な実践方法である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa 'Screenplay Pattern' và 'Page Object Model' truyền thống là gì?",
      "en": "What is the core difference between the 'Screenplay Pattern' and traditional 'Page Object Model'?",
      "ja": "「スクリーンプレイパターン」と従来の「ページオブジェクトモデル」の本質的な違いは何か。"
    },
    "options": [
      {
        "vi": "Screenplay Pattern chỉ dùng được với Cypress, còn POM chỉ dùng được với Selenium",
        "en": "Screenplay Pattern only works with Cypress, while POM only works with Selenium",
        "ja": "スクリーンプレイパターンはCypressでのみ使用でき、POMはSeleniumでのみ使用できる"
      },
      {
        "vi": "Screenplay Pattern tổ chức test xoay quanh 'actor' thực hiện 'task/interaction/question', hướng tới hành vi người dùng thay vì gom mọi thứ theo từng trang",
        "en": "Screenplay Pattern organizes tests around an 'actor' performing 'tasks/interactions/questions', focusing on user behavior rather than grouping everything by page",
        "ja": "スクリーンプレイパターンは「アクター」が「タスク／インタラクション／クエスチョン」を実行することを中心に構成され、ページ単位にまとめるのではなくユーザー行動に焦点を当てる"
      },
      {
        "vi": "Screenplay Pattern không cho phép viết test tự động, chỉ dùng để thiết kế UI",
        "en": "Screenplay Pattern does not allow writing automated tests, it is only for UI design",
        "ja": "スクリーンプレイパターンは自動テストの記述を許可せず、UI設計のみに使用される"
      },
      {
        "vi": "Screenplay Pattern loại bỏ hoàn toàn nhu cầu sử dụng locator",
        "en": "Screenplay Pattern completely eliminates the need for locators",
        "ja": "スクリーンプレイパターンはロケーターの必要性を完全に排除する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Screenplay Pattern là kiến trúc hướng hành vi/actor, giúp tái sử dụng và mở rộng tốt hơn khi hệ thống test lớn dần, khác với POM tổ chức theo từng trang.",
      "en": "Screenplay Pattern is an actor/behavior-oriented architecture that scales better as the test suite grows, unlike POM which organizes code per page.",
      "ja": "スクリーンプレイパターンはアクター／行動指向のアーキテクチャであり、テストスイートが拡大しても再利用性と拡張性に優れる。ページ単位で構成するPOMとは異なる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Selenium, sau khi dùng @FindBy với Page Factory, lỗi StaleElementReferenceException vẫn có thể xảy ra trong trường hợp nào?",
      "en": "In Selenium, even after using @FindBy with Page Factory, in what case can a StaleElementReferenceException still occur?",
      "ja": "SeleniumでPage Factoryの@FindByを使用していても、StaleElementReferenceExceptionが発生し得るのはどのような場合か。"
    },
    "options": [
      {
        "vi": "Khi số lượng dòng code trong lớp Page Object vượt quá 100 dòng",
        "en": "When the Page Object class exceeds 100 lines of code",
        "ja": "Page Objectクラスのコード行数が100行を超える場合"
      },
      {
        "vi": "Khi tên biến WebElement viết hoa chữ cái đầu",
        "en": "When the WebElement variable name starts with an uppercase letter",
        "ja": "WebElement変数名が大文字で始まる場合"
      },
      {
        "vi": "Khi trang được tải lại (reload) hoặc DOM bị thay thế sau khi phần tử đã được tương tác một lần trước đó, tham chiếu cũ tới phần tử không còn hợp lệ",
        "en": "When the page is reloaded or the DOM is replaced after the element has already been interacted with once, the old element reference becomes invalid",
        "ja": "要素と一度やり取りした後にページがリロードされたりDOMが置き換わったりすると、古い要素参照が無効になる場合"
      },
      {
        "vi": "Khi test được chạy trên hệ điều hành Linux thay vì Windows",
        "en": "When the test is run on Linux instead of Windows",
        "ja": "テストをWindowsではなくLinuxで実行する場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Proxy của Page Factory chỉ trễ hoá việc tìm phần tử lần đầu; nếu DOM thay đổi sau khi phần tử đã được resolve và cache, thao tác tiếp theo có thể gặp stale reference.",
      "en": "Page Factory's proxy only delays the first lookup; if the DOM changes after the element has been resolved and cached, subsequent actions can hit a stale reference.",
      "ja": "Page Factoryのプロキシは最初の検索を遅延させるだけであり、要素が解決・キャッシュされた後にDOMが変化すると、以降の操作でstale referenceが発生し得る。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một ứng dụng có nhiều trang dùng chung header, footer, và menu điều hướng, cách tổ chức POM hợp lý nhất là gì?",
      "en": "When an application has multiple pages sharing a common header, footer, and navigation menu, what is the most appropriate way to organize POM?",
      "ja": "アプリケーションの複数ページが共通のヘッダー、フッター、ナビゲーションメニューを持つ場合、POMを組織する最も適切な方法は何か。"
    },
    "options": [
      {
        "vi": "Copy-paste code của header/footer vào từng Page Object riêng lẻ",
        "en": "Copy-paste the header/footer code into each individual Page Object",
        "ja": "ヘッダー・フッターのコードを各Page Objectに個別にコピー＆ペーストする"
      },
      {
        "vi": "Không sử dụng class nào cả, chỉ dùng biến toàn cục cho locator",
        "en": "Don't use any classes at all, just use global variables for locators",
        "ja": "クラスを一切使わず、ロケーターにはグローバル変数だけを使う"
      },
      {
        "vi": "Viết toàn bộ locator của tất cả các trang vào một file duy nhất không phân lớp",
        "en": "Write all locators for every page into a single unstructured file",
        "ja": "すべてのページのロケーターを構造化せずに1つのファイルにまとめて書く"
      },
      {
        "vi": "Tạo một BasePage chứa các phần tử/hành vi dùng chung, hoặc tách thành các Component Object riêng (ví dụ HeaderComponent) rồi kế thừa/kết hợp vào các Page Object cụ thể",
        "en": "Create a BasePage containing shared elements/behaviors, or extract separate Component Objects (e.g. HeaderComponent) and inherit/compose them into specific Page Objects",
        "ja": "共通の要素・振る舞いを持つBasePageを作成するか、あるいは個別のComponent Object（例：HeaderComponent）に切り出し、具体的なPage Objectに継承・合成する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dùng BasePage hoặc Component Object cho phần tử dùng chung giúp tránh trùng lặp code và đồng bộ thay đổi ở một nơi duy nhất, đúng nguyên tắc DRY.",
      "en": "Using a BasePage or Component Object for shared elements avoids code duplication and centralizes changes in one place, following the DRY principle.",
      "ja": "共通要素にBasePageやComponent Objectを使うことで、コードの重複を避け、変更箇所を一箇所に集約できる。これはDRY原則に沿った方法である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nguyên tắc SRP (Single Responsibility Principle) áp dụng vào Page Object có nghĩa là gì?",
      "en": "What does applying the SRP (Single Responsibility Principle) to a Page Object mean?",
      "ja": "Page ObjectにSRP（単一責任の原則）を適用するとはどういう意味か。"
    },
    "options": [
      {
        "vi": "Mỗi Page Object nên chịu trách nhiệm về đúng một trang/màn hình, chỉ chứa locator và hành vi liên quan tới trang đó",
        "en": "Each Page Object should be responsible for exactly one page/screen, containing only the locators and behaviors relevant to that page",
        "ja": "各Page Objectは1つのページ／画面のみを担当し、そのページに関連するロケーターと振る舞いだけを含めるべきである"
      },
      {
        "vi": "Mỗi Page Object chỉ được có đúng một phương thức duy nhất",
        "en": "Each Page Object may only have exactly one method",
        "ja": "各Page Objectはメソッドを1つだけしか持てない"
      },
      {
        "vi": "Mỗi dự án chỉ được có đúng một Page Object cho toàn bộ ứng dụng",
        "en": "A project may only have exactly one Page Object for the entire application",
        "ja": "プロジェクトはアプリケーション全体でPage Objectを1つしか持てない"
      },
      {
        "vi": "Mỗi Page Object phải được viết bởi đúng một lập trình viên duy nhất",
        "en": "Each Page Object must be written by exactly one single developer",
        "ja": "各Page Objectは必ず一人の開発者のみが書かなければならない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "SRP giúp Page Object tập trung, dễ đọc, dễ bảo trì; khi trách nhiệm rõ ràng, thay đổi ở một trang không ảnh hưởng tới các Page Object khác.",
      "en": "SRP keeps each Page Object focused, readable, and easy to maintain; with clear responsibility, a change on one page doesn't ripple into other Page Objects.",
      "ja": "SRPによりPage Objectは焦点が絞られ、読みやすく保守しやすくなる。責任が明確であれば、あるページの変更が他のPage Objectに波及しない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Playwright, cách khuyến nghị để định nghĩa các phần tử trong một Page Object class là gì?",
      "en": "In Playwright, what is the recommended way to define elements within a Page Object class?",
      "ja": "PlaywrightにおいてPage Objectクラス内で要素を定義する推奨方法は何か。"
    },
    "options": [
      {
        "vi": "Luôn dùng document.querySelector thuần JavaScript thay vì API của Playwright",
        "en": "Always use plain JavaScript document.querySelector instead of Playwright's API",
        "ja": "Playwright APIの代わりに常に素のJavaScriptのdocument.querySelectorを使う"
      },
      {
        "vi": "Dùng getter trả về Locator (this.page.locator(...) hoặc getByRole/getByTestId) thay vì lưu trực tiếp ElementHandle đã resolve sẵn",
        "en": "Use getters that return a Locator (this.page.locator(...) or getByRole/getByTestId) instead of storing a pre-resolved ElementHandle directly",
        "ja": "事前に解決済みのElementHandleを直接保持するのではなく、Locator（this.page.locator(...)やgetByRole/getByTestId）を返すgetterを使う"
      },
      {
        "vi": "Lưu sẵn ElementHandle trong constructor và tái sử dụng cho toàn bộ test suite",
        "en": "Pre-store an ElementHandle in the constructor and reuse it across the entire test suite",
        "ja": "コンストラクタでElementHandleを事前に保存し、テストスイート全体で再利用する"
      },
      {
        "vi": "Không cần định nghĩa phần tử, gọi trực tiếp XPath tuyệt đối trong mỗi test",
        "en": "No need to define elements at all — call absolute XPath directly in every test",
        "ja": "要素を定義する必要はなく、各テストで絶対XPathを直接呼び出す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Locator của Playwright tự động chờ và luôn truy vấn lại DOM tại thời điểm hành động, tránh stale reference — nên trả về Locator qua getter là cách khuyến nghị.",
      "en": "Playwright's Locator auto-waits and always re-queries the DOM at action time, avoiding staleness — returning a Locator via a getter is the recommended approach.",
      "ja": "PlaywrightのLocatorは自動待機し、操作時に常にDOMを再クエリするためstaleを回避できる。そのためgetter経由でLocatorを返すことが推奨される。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi viết Page Object, việc đặt tên phương thức theo kiểu 'clickLoginButton()' so với 'login(username, password)' khác nhau ở điểm nào về mặt thiết kế?",
      "en": "When writing a Page Object, naming a method 'clickLoginButton()' versus 'login(username, password)' differs in what design aspect?",
      "ja": "Page Objectを書く際、メソッド名を「clickLoginButton()」とするか「login(username, password)」とするかは、設計上どのような点で異なるか。"
    },
    "options": [
      {
        "vi": "Không có sự khác biệt nào, hai cách đặt tên hoàn toàn tương đương",
        "en": "There is no difference at all, the two naming approaches are entirely equivalent",
        "ja": "両者に違いはなく、命名方法は完全に等価である"
      },
      {
        "vi": "'clickLoginButton()' chạy nhanh hơn về mặt hiệu năng do ít tham số hơn",
        "en": "'clickLoginButton()' runs faster performance-wise because it has fewer parameters",
        "ja": "「clickLoginButton()」は引数が少ないためパフォーマンス的に高速に動作する"
      },
      {
        "vi": "'clickLoginButton()' mô tả hành động kỹ thuật cấp thấp (click), còn 'login(...)' mô tả hành vi nghiệp vụ cấp cao, giúp test dễ đọc và ít bị vỡ khi thay đổi chi tiết UI",
        "en": "'clickLoginButton()' describes a low-level technical action (click), while 'login(...)' describes a high-level business behavior, making tests more readable and less brittle to UI detail changes",
        "ja": "「clickLoginButton()」は低レベルな技術的操作（クリック）を表すのに対し、「login(...)」は高レベルなビジネス上の振る舞いを表し、テストが読みやすく、UI詳細の変更にも壊れにくくなる"
      },
      {
        "vi": "Chỉ 'login(...)' mới tương thích được với TestNG, còn 'clickLoginButton()' không tương thích",
        "en": "Only 'login(...)' is compatible with TestNG, while 'clickLoginButton()' is not compatible at all",
        "ja": "「login(...)」のみがTestNGと互換性があり、「clickLoginButton()」は互換性がない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phương thức đặt tên theo hành vi nghiệp vụ giúp che giấu chi tiết cài đặt (đóng gói), khi UI thay đổi (ví dụ gộp 2 bước thành 1) chỉ cần sửa bên trong login() mà không ảnh hưởng test.",
      "en": "Business-behavior-named methods hide implementation detail (encapsulation); when UI changes (e.g. merging two steps into one) only the inside of login() needs updating, not the tests.",
      "ja": "ビジネス行動に基づいたメソッド名は実装詳細を隠蔽（カプセル化）する。UIが変更されても（例：2ステップを1つに統合）login()の内部だけを修正すればよく、テストには影響しない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nhược điểm chính khi lạm dụng kế thừa (inheritance) giữa các Page Object thay vì sử dụng thành phần (composition) là gì?",
      "en": "What is the main drawback of overusing inheritance between Page Objects instead of using composition?",
      "ja": "合成（composition）ではなくPage Object間の継承を多用することの主な欠点は何か。"
    },
    "options": [
      {
        "vi": "Kế thừa khiến test không thể chạy song song được",
        "en": "Inheritance makes it impossible to run tests in parallel",
        "ja": "継承によりテストの並列実行が不可能になる"
      },
      {
        "vi": "Kế thừa không được hỗ trợ trong bất kỳ ngôn ngữ lập trình nào dùng cho automation",
        "en": "Inheritance is not supported in any programming language used for automation",
        "ja": "継承は自動化に使われるいかなるプログラミング言語でもサポートされていない"
      },
      {
        "vi": "Kế thừa làm tăng chi phí license của công cụ automation",
        "en": "Inheritance increases the licensing cost of the automation tool",
        "ja": "継承により自動化ツールのライセンス費用が増加する"
      },
      {
        "vi": "Tạo ra cây phân cấp cứng nhắc, khó thay đổi; một Page Object có thể buộc phải kế thừa các phương thức không liên quan, gây coupling chặt và khó bảo trì",
        "en": "It creates a rigid, hard-to-change class hierarchy; a Page Object may be forced to inherit unrelated methods, causing tight coupling and poor maintainability",
        "ja": "硬直的で変更しにくいクラス階層を生み出す。Page Objectが無関係なメソッドまで継承せざるを得なくなり、密結合となり保守性が低下する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Composition ('has-a') linh hoạt hơn inheritance ('is-a') khi các trang chỉ chia sẻ một phần hành vi, tránh việc kế thừa cả những thứ không liên quan.",
      "en": "Composition ('has-a') is more flexible than inheritance ('is-a') when pages only share partial behavior, avoiding inheriting unrelated functionality.",
      "ja": "ページが振る舞いの一部のみを共有する場合、合成（has-a）は継承（is-a）よりも柔軟であり、無関係な機能まで継承することを避けられる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Cypress, cộng đồng thường khuyến nghị dùng 'Custom Commands' kết hợp với Page Object nhẹ thay vì Page Object nặng kiểu Selenium truyền thống. Lý do chính là gì?",
      "en": "In Cypress, the community often recommends using 'Custom Commands' combined with lightweight Page Objects instead of traditional heavy Selenium-style Page Objects. What is the main reason?",
      "ja": "CypressではコミュニティがしばしばSelenium流の重いPage Objectではなく、軽量なPage Objectと「カスタムコマンド」の組み合わせを推奨する。その主な理由は何か。"
    },
    "options": [
      {
        "vi": "Cypress hoạt động theo cơ chế bất đồng bộ dựa trên command queue và tự động retry, nên các lớp trừu tượng quá phức tạp có thể che giấu hành vi retry và gây khó debug",
        "en": "Cypress operates on an asynchronous command-queue mechanism with automatic retrying, so overly complex abstraction layers can obscure retry behavior and make debugging harder",
        "ja": "Cypressはコマンドキューに基づく非同期メカニズムと自動リトライで動作するため、過度に複雑な抽象化レイヤーはリトライの挙動を隠してしまい、デバッグを難しくする可能性がある"
      },
      {
        "vi": "Cypress không hỗ trợ class hay function nên buộc phải dùng cú pháp khác",
        "en": "Cypress does not support classes or functions at all, forcing a different syntax",
        "ja": "Cypressはクラスや関数を一切サポートしないため、別の構文を使わざるを得ない"
      },
      {
        "vi": "Page Object trong Cypress bị cấm hoàn toàn bởi giấy phép sử dụng phần mềm",
        "en": "Page Objects in Cypress are entirely prohibited by the software license",
        "ja": "CypressにおいてPage Objectはソフトウェアライセンスにより完全に禁止されている"
      },
      {
        "vi": "Cypress chỉ chạy được trên trình duyệt Internet Explorer nên không cần trừu tượng hóa",
        "en": "Cypress only runs on Internet Explorer, so abstraction is unnecessary",
        "ja": "CypressはInternet Explorerでしか動作しないため、抽象化は不要である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cypress command tự retry và bất đồng bộ; trừu tượng hóa quá mức có thể làm mất khả năng debug rõ ràng, nên khuyến khích giữ Page Object đơn giản, kết hợp custom command.",
      "en": "Cypress commands auto-retry asynchronously; over-abstraction can hide clear debugging, so keeping Page Objects simple combined with custom commands is encouraged.",
      "ja": "Cypressのコマンドは非同期で自動リトライされるため、過度な抽象化は明確なデバッグを妨げる可能性がある。そのため、シンプルなPage Objectとカスタムコマンドの併用が推奨される。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một team automation nhận thấy khi tester viết test mới, họ thường copy nguyên một Page Object cũ rồi sửa lại vì không biết phương thức đã có sẵn. Giải pháp quy trình phù hợp nhất là gì?",
      "en": "An automation team notices that when writing new tests, testers often copy an entire existing Page Object and modify it because they don't know reusable methods already exist. What is the most appropriate process solution?",
      "ja": "あるオートメーションチームは、テスターが新しいテストを書く際、既存の再利用可能なメソッドの存在を知らないために既存のPage Objectをまるごとコピーして修正することが多いと気づいた。最も適切なプロセス上の解決策は何か。"
    },
    "options": [
      {
        "vi": "Cấm hoàn toàn việc tạo Page Object mới trong dự án",
        "en": "Completely ban creating any new Page Object in the project",
        "ja": "プロジェクト内で新規のPage Object作成を全面的に禁止する"
      },
      {
        "vi": "Xây dựng tài liệu/README mô tả các Page Object và phương thức hiện có, kết hợp code review để phát hiện trùng lặp và khuyến khích tái sử dụng/refactor",
        "en": "Build documentation/README describing existing Page Objects and methods, combined with code review to catch duplication and encourage reuse/refactoring",
        "ja": "既存のPage Objectとメソッドを説明するドキュメント／READMEを整備し、コードレビューと組み合わせて重複を検出し再利用・リファクタリングを促す"
      },
      {
        "vi": "Yêu cầu mỗi tester viết Page Object bằng ngôn ngữ lập trình khác nhau để dễ phân biệt",
        "en": "Require each tester to write Page Objects in a different programming language for easier distinction",
        "ja": "各テスターに異なるプログラミング言語でPage Objectを書かせ、区別しやすくする"
      },
      {
        "vi": "Xóa hết Page Object cũ mỗi khi có tester mới gia nhập team",
        "en": "Delete all old Page Objects whenever a new tester joins the team",
        "ja": "新しいテスターがチームに加わるたびに古いPage Objectをすべて削除する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vấn đề trùng lặp thường do thiếu khả năng khám phá (discoverability); tài liệu hoá kết hợp code review giúp team tái sử dụng thay vì nhân bản code, giữ codebase gọn và dễ bảo trì.",
      "en": "Duplication usually stems from poor discoverability; documentation combined with code review helps the team reuse rather than clone code, keeping the codebase lean and maintainable.",
      "ja": "重複は通常、発見可能性の低さに起因する。ドキュメント化とコードレビューの併用により、コードの複製ではなく再利用を促し、コードベースを整理された保守しやすい状態に保てる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong .NET với Selenium, PageFactory.InitElements sử dụng cơ chế nào ở tầng thấp để tạo các đối tượng proxy cho WebElement khi dùng thuộc tính [FindsBy]?",
      "en": "In .NET with Selenium, what low-level mechanism does PageFactory.InitElements use to create proxy objects for WebElement when using the [FindsBy] attribute?",
      "ja": ".NETとSeleniumにおいて、[FindsBy]属性を使う際、PageFactory.InitElementsはWebElementのプロキシオブジェクトを作成するために低レベルでどのような仕組みを使うか。"
    },
    "options": [
      {
        "vi": "Biên dịch lại toàn bộ mã nguồn C# thành JavaScript trước khi chạy",
        "en": "It recompiles the entire C# source code into JavaScript before running",
        "ja": "実行前にC#のソースコード全体をJavaScriptに再コンパイルする"
      },
      {
        "vi": "Gửi yêu cầu HTTP trực tiếp tới Google để tra cứu locator",
        "en": "It sends an HTTP request directly to Google to look up the locator",
        "ja": "ロケーターを検索するためGoogleへ直接HTTPリクエストを送信する"
      },
      {
        "vi": "Sử dụng reflection để đọc các attribute trên trường/thuộc tính, sau đó sinh dynamic proxy đại diện cho phần tử",
        "en": "It uses reflection to read attributes on fields/properties, then generates a dynamic proxy representing the element",
        "ja": "リフレクションを使ってフィールド／プロパティの属性を読み取り、要素を表す動的プロキシを生成する"
      },
      {
        "vi": "Yêu cầu người dùng nhập tay tọa độ pixel của từng phần tử",
        "en": "It requires the user to manually enter the pixel coordinates of each element",
        "ja": "各要素のピクセル座標をユーザーが手動で入力する必要がある"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "PageFactory dùng reflection để quét các attribute như [FindsBy] trên field, rồi tạo proxy WebElement trễ hoá việc tìm kiếm thực sự cho tới khi được sử dụng.",
      "en": "PageFactory uses reflection to scan attributes like [FindsBy] on fields, then creates a WebElement proxy that defers the actual lookup until the element is used.",
      "ja": "PageFactoryはリフレクションを使ってフィールド上の[FindsBy]などの属性をスキャンし、実際の検索を要素が使用されるまで遅延させるWebElementプロキシを作成する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nếu một Page Object có phương thức trả về kiểu dữ liệu nguyên thủy (ví dụ getErrorMessageText() trả về String) thay vì thực hiện assert bên trong, lợi ích chính là gì?",
      "en": "If a Page Object method returns a primitive value (e.g. getErrorMessageText() returning a String) instead of performing an assertion inside it, what is the main benefit?",
      "ja": "Page Objectのメソッドが内部でアサーションを行う代わりにプリミティブ値（例：Stringを返すgetErrorMessageText()）を返す場合、主な利点は何か。"
    },
    "options": [
      {
        "vi": "Là yêu cầu bắt buộc để Page Object tương thích với Docker",
        "en": "It is a mandatory requirement for the Page Object to be compatible with Docker",
        "ja": "Page ObjectをDockerと互換させるための必須要件である"
      },
      {
        "vi": "Giúp trang web tải nhanh hơn khi chạy trên trình duyệt thật",
        "en": "It makes the web page load faster when running on a real browser",
        "ja": "実際のブラウザで実行する際にウェブページの読み込みが速くなる"
      },
      {
        "vi": "Giúp giảm dung lượng file log của CI/CD",
        "en": "It reduces the size of the CI/CD log files",
        "ja": "CI/CDのログファイルのサイズを削減できる"
      },
      {
        "vi": "Page Object trở nên trung lập với framework assertion, cho phép test dùng bất kỳ thư viện assert nào (JUnit, TestNG, Chai...) và dễ tái sử dụng cho nhiều test khác nhau",
        "en": "The Page Object becomes agnostic to any assertion framework, letting tests use any assertion library (JUnit, TestNG, Chai...) and making it easier to reuse across different tests",
        "ja": "Page Objectはアサーションフレームワークに依存しなくなり、テストは任意のアサーションライブラリ（JUnit、TestNG、Chaiなど）を使えるようになり、さまざまなテストで再利用しやすくなる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tách assert ra khỏi Page Object giúp lớp này chỉ tập trung lấy dữ liệu/trạng thái trang, còn việc kiểm tra đúng/sai thuộc về test — tăng tính tái sử dụng và linh hoạt.",
      "en": "Separating assertions from the Page Object keeps it focused purely on retrieving page data/state, while pass/fail verification belongs to the test — increasing reusability and flexibility.",
      "ja": "アサーションをPage Objectから分離することで、Page Objectはページのデータ・状態取得に専念でき、合否判定はテスト側の責務となる。これにより再利用性と柔軟性が高まる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một trang web có bảng dữ liệu (table) với nhiều dòng động, cách thiết kế Page Object hợp lý cho từng dòng là gì?",
      "en": "When a web page has a data table with many dynamic rows, what is a sensible Page Object design for handling each row?",
      "ja": "ウェブページに動的な多数の行を持つデータテーブルがある場合、各行を扱うためのPage Object設計として妥当なのはどれか。"
    },
    "options": [
      {
        "vi": "Tạo một 'Row Object' hoặc 'Component Object' đại diện cho một dòng, cung cấp phương thức lấy danh sách các dòng và tương tác với từng dòng theo dữ liệu, không phụ thuộc số lượng cố định",
        "en": "Create a 'Row Object' or 'Component Object' representing a single row, exposing methods to get the list of rows and interact with each row by data, independent of a fixed count",
        "ja": "1行を表す「Row Object」または「Component Object」を作成し、行のリストを取得し、固定数に依存せずデータに基づいて各行を操作できるメソッドを提供する"
      },
      {
        "vi": "Viết cứng locator cho từng dòng theo số thứ tự cố định (row1, row2, row3...) trong Page Object",
        "en": "Hardcode a fixed-index locator for every row (row1, row2, row3...) in the Page Object",
        "ja": "Page Object内で各行に固定インデックスのロケーター（row1, row2, row3...）をハードコードする"
      },
      {
        "vi": "Không cần Page Object cho bảng, thay vào đó copy toàn bộ nội dung bảng thành file ảnh để so sánh",
        "en": "No Page Object is needed for the table; instead copy the whole table content into an image and compare it",
        "ja": "テーブルにはPage Objectは不要で、代わりにテーブル全体を画像としてコピーして比較する"
      },
      {
        "vi": "Viết một biến global lưu số dòng cố định là 10 cho mọi trường hợp",
        "en": "Use a global variable that hardcodes the row count to 10 for all cases",
        "ja": "あらゆるケースで行数を10に固定するグローバル変数を使う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Row/Component Object cho phép xử lý số dòng động, tái sử dụng logic tương tác với từng dòng và dễ mở rộng khi dữ liệu bảng thay đổi.",
      "en": "A Row/Component Object handles a dynamic number of rows, reuses interaction logic per row, and is easy to extend as table data changes.",
      "ja": "Row/Component Objectは動的な行数を扱い、各行とのやり取りロジックを再利用でき、テーブルデータの変化にも柔軟に対応できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong tình huống một ứng dụng có nhiều phiên bản UI khác nhau theo từng thị trường (locale) nhưng logic nghiệp vụ giống nhau, cách tổ chức Page Object nào giúp giảm trùng lặp?",
      "en": "When an application has different UI variants per locale/market but the same business logic, which Page Object organization reduces duplication?",
      "ja": "アプリケーションがマーケット（ロケール）ごとに異なるUIバリエーションを持つが、ビジネスロジックは同じである場合、重複を減らすPage Objectの組織方法はどれか。"
    },
    "options": [
      {
        "vi": "Viết lại toàn bộ bộ test tự động hoàn toàn riêng biệt cho mỗi locale, không chia sẻ code",
        "en": "Rewrite the entire automation test suite completely separately for each locale, sharing no code",
        "ja": "各ロケールごとに自動化テストスイート全体を完全に別々に書き直し、コードを一切共有しない"
      },
      {
        "vi": "Định nghĩa một interface/abstract Page Object mô tả hành vi chung, rồi mỗi locale có implementation riêng chỉ khác về locator",
        "en": "Define an interface/abstract Page Object describing shared behavior, then each locale has its own implementation that differs only in locators",
        "ja": "共通の振る舞いを記述するインターフェース／抽象Page Objectを定義し、各ロケールはロケーターのみが異なる個別の実装を持つ"
      },
      {
        "vi": "Gộp tất cả locator của mọi locale vào cùng một biến duy nhất phân tách bằng dấu phẩy",
        "en": "Merge all locators from every locale into a single comma-separated variable",
        "ja": "すべてのロケールのロケーターを1つのカンマ区切り変数にまとめる"
      },
      {
        "vi": "Không tự động hóa cho các locale khác ngoài locale mặc định",
        "en": "Do not automate any locale other than the default one",
        "ja": "デフォルトロケール以外は自動化しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Dùng interface/abstract class tách hành vi chung khỏi chi tiết locator theo locale giúp tái sử dụng logic test, chỉ cần thay đổi implementation locator riêng cho từng thị trường.",
      "en": "Using an interface/abstract class separates shared behavior from locale-specific locator details, allowing test logic reuse while only swapping the locator implementation per market.",
      "ja": "インターフェース／抽象クラスを使うことで、共通の振る舞いをロケール固有のロケーター詳細から分離でき、テストロジックを再利用しつつ、マーケットごとにロケーター実装のみを差し替えられる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Câu nào mô tả ĐÚNG mối quan hệ giữa Page Object Model và kim tự tháp kiểm thử tự động (test automation pyramid)?",
      "en": "Which statement CORRECTLY describes the relationship between the Page Object Model and the test automation pyramid?",
      "ja": "ページオブジェクトモデルとテスト自動化ピラミッドの関係を正しく説明しているのはどれか。"
    },
    "options": [
      {
        "vi": "POM chỉ áp dụng được cho unit test, không dùng được cho UI test",
        "en": "POM only applies to unit testing and cannot be used for UI testing",
        "ja": "POMは単体テストにのみ適用でき、UIテストには使用できない"
      },
      {
        "vi": "POM thay thế hoàn toàn nhu cầu viết unit test, vì mọi logic đều được kiểm tra qua UI",
        "en": "POM completely replaces the need to write unit tests, since all logic gets verified through the UI",
        "ja": "すべてのロジックがUI経由で検証されるため、POMは単体テストを書く必要性を完全に代替する"
      },
      {
        "vi": "POM là một kỹ thuật cấu trúc mã nguồn cho lớp UI/E2E test, giúp các test ở tầng trên (thường ít hơn và chậm hơn) dễ bảo trì hơn — nó không thay thế nhu cầu có đủ unit test và integration test ở các tầng dưới",
        "en": "POM is a code-organization technique for the UI/E2E test layer, making the upper-layer tests (typically fewer and slower) easier to maintain — it does not replace the need for sufficient unit and integration tests at lower layers",
        "ja": "POMはUI／E2Eテスト層のためのコード構造化手法であり、（通常より少なく低速な）上位層のテストを保守しやすくする。下位層における十分な単体テストや統合テストの必要性を代替するものではない"
      },
      {
        "vi": "Kim tự tháp kiểm thử yêu cầu bắt buộc phải dùng POM ở mọi tầng, kể cả unit test",
        "en": "The test pyramid mandates that POM must be used at every layer, including unit tests",
        "ja": "テストピラミッドはすべての層（単体テストを含む）でPOMを使用することを義務付けている"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "POM giải quyết vấn đề bảo trì code ở tầng UI/E2E — tầng vốn ít test hơn theo kim tự tháp — chứ không phải là chiến lược phân bổ số lượng test giữa các tầng.",
      "en": "POM addresses code maintainability at the UI/E2E layer — the layer with fewer tests per the pyramid — it is not a strategy for allocating test counts across layers.",
      "ja": "POMはUI／E2E層（ピラミッドにおいてテスト数が少ない層）のコード保守性の問題を解決するものであり、各層間のテスト数配分戦略ではない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TypeScript, việc dùng 'private readonly' cho các Locator trong Page Object class và chỉ expose qua public method mang lại lợi ích thiết kế nào?",
      "en": "In TypeScript, using 'private readonly' for Locators in a Page Object class and exposing them only through public methods provides what design benefit?",
      "ja": "TypeScriptにおいて、Page Objectクラス内のLocatorを「private readonly」とし、public メソッド経由でのみ公開することはどのような設計上の利点をもたらすか。"
    },
    "options": [
      {
        "vi": "Tăng tốc độ chạy test lên gấp nhiều lần",
        "en": "Increases test execution speed many times over",
        "ja": "テスト実行速度を大幅に高速化する"
      },
      {
        "vi": "Cho phép bỏ qua bước cài đặt Node.js khi chạy Playwright",
        "en": "Allows skipping the Node.js installation step when running Playwright",
        "ja": "Playwright実行時にNode.jsのインストール手順を省略できる"
      },
      {
        "vi": "Bắt buộc phải chạy test trên trình duyệt headless",
        "en": "Forces tests to run only in a headless browser",
        "ja": "テストをheadlessブラウザでのみ実行させる"
      },
      {
        "vi": "Đóng gói (encapsulation): ngăn code test bên ngoài truy cập/thay đổi trực tiếp locator, buộc mọi tương tác đi qua các phương thức có ý nghĩa nghiệp vụ, giảm rủi ro test bị vỡ khi cấu trúc nội bộ thay đổi",
        "en": "Encapsulation: prevents external test code from directly accessing/modifying locators, forcing all interaction through methods with business meaning, reducing the risk of tests breaking when internal structure changes",
        "ja": "カプセル化：外部のテストコードがロケーターに直接アクセス・変更することを防ぎ、すべてのやり取りをビジネス上意味のあるメソッド経由に限定することで、内部構造の変更によるテストの破損リスクを減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Che giấu locator sau các phương thức public giúp bảo vệ tính toàn vẹn của Page Object, tránh test truy cập trực tiếp vào chi tiết cài đặt dễ thay đổi.",
      "en": "Hiding locators behind public methods protects the integrity of the Page Object, preventing tests from directly accessing implementation details that are prone to change.",
      "ja": "ロケーターをpublicメソッドの背後に隠すことで、Page Objectの整合性が保たれ、変更されやすい実装詳細にテストが直接アクセスすることを防げる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một dự án automation có 500 test case và mỗi khi UI đổi một chút, hàng chục test bị fail vì locator sai ở nhiều nơi khác nhau — điều này cho thấy dấu hiệu ANTI-PATTERN nào?",
      "en": "An automation project has 500 test cases, and whenever the UI changes slightly, dozens of tests fail due to incorrect locators scattered in many places — what anti-pattern does this indicate?",
      "ja": "あるオートメーションプロジェクトには500件のテストケースがあり、UIが少し変わるたびに誤ったロケーターが多数の箇所に散在しているために数十件のテストが失敗する。これはどのアンチパターンを示しているか。"
    },
    "options": [
      {
        "vi": "Locator đang bị hard-code/lặp lại trực tiếp trong nhiều file test thay vì được tập trung hoá trong các Page Object — vi phạm nguyên tắc DRY và mất đi lợi ích chính của POM",
        "en": "Locators are hard-coded/duplicated directly in many test files instead of being centralized in Page Objects — violating the DRY principle and losing POM's main benefit",
        "ja": "ロケーターがPage Objectに集約されず、多数のテストファイルにハードコード／重複している状態であり、DRY原則に違反し、POMの主な利点が失われている"
      },
      {
        "vi": "Team đã áp dụng POM đúng cách và không có vấn đề gì",
        "en": "The team has correctly applied POM and there is no issue",
        "ja": "チームはPOMを正しく適用しており、問題はない"
      },
      {
        "vi": "Vấn đề là do trình duyệt Chrome không tương thích với automation",
        "en": "The problem is that the Chrome browser is incompatible with automation",
        "ja": "問題はChromeブラウザが自動化と互換性がないことにある"
      },
      {
        "vi": "Vấn đề là do máy chủ CI/CD có RAM quá thấp",
        "en": "The problem is that the CI/CD server has too little RAM",
        "ja": "問題はCI/CDサーバーのRAMが少なすぎることにある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi thay đổi UI nhỏ gây fail hàng loạt ở nhiều nơi, đó là dấu hiệu locator chưa được tập trung hoá đúng theo POM, mất đi lợi ích bảo trì cốt lõi của pattern này.",
      "en": "When a small UI change breaks many tests scattered across files, it signals locators were never properly centralized under POM, losing the pattern's core maintenance benefit.",
      "ja": "小さなUI変更が多数の箇所で失敗を引き起こす場合、それはロケーターがPOMの下で適切に集約されていないことを示しており、このパターンの中核的な保守上の利点が失われている。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi thiết kế Page Object cho một form đăng ký dài với nhiều bước (multi-step wizard), cách tiếp cận hợp lý nhất là gì?",
      "en": "When designing a Page Object for a long multi-step registration wizard, what is the most reasonable approach?",
      "ja": "多段階の登録ウィザードに対してPage Objectを設計する場合、最も妥当なアプローチはどれか。"
    },
    "options": [
      {
        "vi": "Nhồi toàn bộ locator và hành vi của tất cả các bước vào một Page Object khổng lồ duy nhất",
        "en": "Cram all locators and behaviors of every step into one giant single Page Object",
        "ja": "すべてのステップのロケーターと振る舞いを1つの巨大なPage Objectに詰め込む"
      },
      {
        "vi": "Tách mỗi bước thành một Page Object/Step Object riêng, mỗi step trả về đối tượng của bước kế tiếp khi hoàn tất, giữ mỗi lớp gọn và tập trung",
        "en": "Split each step into its own Page Object/Step Object, with each step returning the object for the next step upon completion, keeping each class focused and manageable",
        "ja": "各ステップを独立したPage Object／Step Objectに分割し、完了時にそれぞれが次のステップのオブジェクトを返すようにして、各クラスを簡潔で焦点を絞った状態に保つ"
      },
      {
        "vi": "Không dùng Page Object cho wizard, chỉ dùng lệnh sleep(5000) giữa mỗi bước",
        "en": "Don't use a Page Object for the wizard at all — just use sleep(5000) between each step",
        "ja": "ウィザードにはPage Objectを使わず、各ステップ間でsleep(5000)を使うだけにする"
      },
      {
        "vi": "Viết lại toàn bộ wizard bằng SQL script để tránh dùng UI automation",
        "en": "Rewrite the entire wizard using SQL scripts to avoid UI automation altogether",
        "ja": "UI自動化を完全に避けるため、ウィザード全体をSQLスクリプトで書き直す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tách theo từng bước giữ mỗi Page Object nhỏ gọn, dễ đọc, dễ bảo trì và tận dụng được method chaining để mô tả luồng nghiệp vụ tuần tự.",
      "en": "Splitting by step keeps each Page Object small, readable, and maintainable, while leveraging method chaining to express the sequential business flow.",
      "ja": "ステップごとに分割することで各Page Objectは小さく読みやすく保守しやすくなり、メソッドチェーンを活用して逐次的なビジネスフローを表現できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều nào sau đây là SAI về mối quan hệ giữa Page Object và test data (dữ liệu kiểm thử)?",
      "en": "Which of the following is INCORRECT regarding the relationship between Page Objects and test data?",
      "ja": "Page Objectとテストデータの関係について正しくない記述はどれか。"
    },
    "options": [
      {
        "vi": "Page Object nên nhận dữ liệu test làm tham số đầu vào của phương thức, không nên hard-code dữ liệu cụ thể bên trong lớp",
        "en": "Page Objects should receive test data as method parameters, and should not hard-code specific data inside the class",
        "ja": "Page Objectはテストデータをメソッドの引数として受け取るべきであり、特定のデータをクラス内にハードコードすべきではない"
      },
      {
        "vi": "Việc tách dữ liệu test khỏi Page Object giúp cùng một Page Object phục vụ được nhiều test case với bộ dữ liệu khác nhau",
        "en": "Separating test data from the Page Object allows the same Page Object to serve multiple test cases with different data sets",
        "ja": "テストデータをPage Objectから分離することで、同じPage Objectが異なるデータセットを持つ複数のテストケースに対応できる"
      },
      {
        "vi": "Page Object nên hard-code sẵn toàn bộ giá trị test (username, password cụ thể) ngay trong các phương thức để test chạy nhanh hơn",
        "en": "A Page Object should hard-code all test values (specific username, password) directly inside its methods so tests run faster",
        "ja": "Page Objectはテスト値（特定のユーザー名、パスワードなど）をメソッド内にハードコードし、テストの実行を速くすべきである"
      },
      {
        "vi": "Dữ liệu test nên được quản lý riêng, ví dụ qua file config, fixture, hoặc data provider, độc lập với logic thao tác trang",
        "en": "Test data should be managed separately, e.g. via config files, fixtures, or data providers, independent of the page interaction logic",
        "ja": "テストデータは設定ファイル、フィクスチャ、データプロバイダーなどを通じて、ページ操作ロジックとは独立して別途管理されるべきである"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hard-code dữ liệu vào Page Object làm giảm khả năng tái sử dụng cho nhiều kịch bản và trộn lẫn trách nhiệm dữ liệu với trách nhiệm thao tác trang, đi ngược nguyên tắc POM.",
      "en": "Hard-coding data into a Page Object reduces reusability across scenarios and mixes data responsibility with page-interaction responsibility, going against POM principles.",
      "ja": "データをPage Objectにハードコードすると、複数のシナリオへの再利用性が下がり、データの責務とページ操作の責務が混在してしまい、POMの原則に反する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi review code Page Object mới, reviewer thấy một phương thức tên là 'doStuff()' chứa 15 dòng thao tác không liên quan tới nhau trên nhiều phần khác nhau của trang. Vấn đề chính cần góp ý là gì?",
      "en": "When reviewing a new Page Object, a reviewer sees a method named 'doStuff()' containing 15 lines of unrelated actions across different parts of the page. What is the main issue to flag?",
      "ja": "新しいPage Objectのレビュー中に、レビュアーは「doStuff()」という名前のメソッドがページの異なる部分にまたがる無関係な操作を15行含んでいることに気づいた。指摘すべき主な問題点は何か。"
    },
    "options": [
      {
        "vi": "Không có vấn đề gì, càng nhiều dòng trong một phương thức càng tốt cho hiệu năng",
        "en": "There is no issue at all; more lines in one method is better for performance",
        "ja": "問題はなく、1つのメソッドに多くの行があるほどパフォーマンスに良い"
      },
      {
        "vi": "Nên chuyển toàn bộ nội dung phương thức đó sang file cấu hình JSON",
        "en": "The entire content of that method should be moved into a JSON configuration file",
        "ja": "そのメソッドの内容全体をJSON設定ファイルに移すべきである"
      },
      {
        "vi": "Chỉ cần đổi tên thành 'doStuff2()' là đủ để giải quyết vấn đề",
        "en": "Simply renaming it to 'doStuff2()' is enough to solve the issue",
        "ja": "「doStuff2()」に名前を変えるだけで問題は十分に解決する"
      },
      {
        "vi": "Tên phương thức mơ hồ và phương thức gộp quá nhiều hành vi không liên quan — nên tách nhỏ thành các phương thức có tên rõ nghĩa, mỗi phương thức làm một việc, giúp dễ đọc và tái sử dụng",
        "en": "The method name is vague and it bundles too many unrelated actions — it should be split into smaller, clearly named methods each doing one thing, improving readability and reuse",
        "ja": "メソッド名が曖昧であり、無関係な操作を多く詰め込みすぎている。明確な名前を持つ小さなメソッドに分割し、それぞれが1つのことを行うようにすべきで、可読性と再利用性が向上する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tên phương thức mơ hồ và gộp nhiều trách nhiệm vi phạm nguyên tắc đặt tên rõ ràng và SRP, khiến code khó đọc, khó tái sử dụng và khó bảo trì về sau.",
      "en": "A vague name bundling many responsibilities violates clear naming and SRP, making the code harder to read, reuse, and maintain over time.",
      "ja": "曖昧な名前で多くの責務を詰め込むことは、明確な命名原則とSRPに違反し、コードの可読性・再利用性・将来の保守性を低下させる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong bối cảnh CI/CD chạy test song song trên nhiều worker, Page Object nên tránh điều gì để không gây xung đột trạng thái giữa các luồng chạy song song?",
      "en": "In a CI/CD context running tests in parallel across multiple workers, what should a Page Object avoid to prevent state conflicts between parallel runs?",
      "ja": "複数のワーカーで並列にテストを実行するCI/CD環境において、並列実行間の状態競合を防ぐためにPage Objectが避けるべきことは何か。"
    },
    "options": [
      {
        "vi": "Tránh dùng biến static/singleton dùng chung driver hoặc trạng thái giữa các instance Page Object, vì các luồng chạy song song có thể ghi đè trạng thái của nhau",
        "en": "Avoid using static/singleton variables that share the driver or state across Page Object instances, because parallel threads may overwrite each other's state",
        "ja": "ドライバーや状態をPage Objectインスタンス間で共有するstatic／シングルトン変数の使用を避けるべきである。並列スレッドが互いの状態を上書きしてしまう可能性があるため"
      },
      {
        "vi": "Tránh viết bất kỳ phương thức public nào trong Page Object",
        "en": "Avoid writing any public methods at all in the Page Object",
        "ja": "Page Objectにpublicメソッドを一切書かないようにする"
      },
      {
        "vi": "Tránh sử dụng try-catch trong bất kỳ đoạn code nào",
        "en": "Avoid using try-catch anywhere in the code at all",
        "ja": "いかなるコードにおいてもtry-catchの使用を避ける"
      },
      {
        "vi": "Tránh đặt tên biến bằng tiếng Anh",
        "en": "Avoid naming variables in English",
        "ja": "変数名を英語で命名することを避ける"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi chạy song song, mỗi luồng test cần driver/state độc lập; dùng static/singleton dùng chung dễ gây race condition và kết quả test không ổn định (flaky).",
      "en": "In parallel execution, each test thread needs an independent driver/state; sharing via static/singleton risks race conditions and flaky results.",
      "ja": "並列実行では、各テストスレッドが独立したドライバー・状態を必要とする。static／シングルトンで共有すると競合状態が発生しやすく、テスト結果が不安定（flaky）になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Data-Driven Testing, đặc điểm cốt lõi là gì?",
      "en": "What is the core characteristic of Data-Driven Testing?",
      "ja": "データ駆動テスト(Data-Driven Testing)の中心的な特徴は何か。"
    },
    "options": [
      {
        "vi": "Test case được viết hoàn toàn bằng các từ khóa hành động, không có mã lệnh",
        "en": "Test cases are written entirely using action keywords, with no code",
        "ja": "テストケースはすべてアクションキーワードで記述され、コードは一切使わない"
      },
      {
        "vi": "Một kịch bản kiểm thử cố định được chạy lặp lại với nhiều bộ dữ liệu đầu vào khác nhau",
        "en": "A single fixed test script is executed repeatedly with multiple different sets of input data",
        "ja": "1つの固定されたテストスクリプトを、複数の異なる入力データセットで繰り返し実行する"
      },
      {
        "vi": "Toàn bộ luồng kiểm thử được ghi lại bằng công cụ record & playback",
        "en": "The entire test flow is captured using a record & playback tool",
        "ja": "テストフロー全体をレコード＆プレイバックツールで記録する"
      },
      {
        "vi": "Mỗi module ứng dụng có một framework kiểm thử riêng biệt hoàn toàn độc lập",
        "en": "Each application module has a completely independent, separate test framework",
        "ja": "アプリケーションの各モジュールが完全に独立した専用のテストフレームワークを持つ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Data-Driven Testing tách dữ liệu ra khỏi logic kịch bản: cùng một script được tái sử dụng, chỉ thay đổi bộ dữ liệu đầu vào (ví dụ đọc từ Excel, CSV, DB) để mở rộng phạm vi kiểm thử.",
      "en": "Data-Driven Testing separates data from script logic: the same script is reused while only the input data set changes (e.g., read from Excel, CSV, DB) to widen test coverage.",
      "ja": "データ駆動テストはデータとスクリプトのロジックを分離し、同じスクリプトを再利用しながら入力データセット(Excel、CSV、DBなど)だけを変えてテスト範囲を広げる手法である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Keyword-Driven Testing biểu diễn các bước kiểm thử bằng cách nào?",
      "en": "How does Keyword-Driven Testing represent test steps?",
      "ja": "キーワード駆動テストはテストステップをどのように表現するか。"
    },
    "options": [
      {
        "vi": "Bằng mã nguồn Java/Python viết trực tiếp trong từng test case",
        "en": "Directly with Java/Python source code written in each test case",
        "ja": "各テストケースに直接記述されたJava/Pythonのソースコード"
      },
      {
        "vi": "Bằng số lượng bug được phát hiện trong mỗi lần chạy",
        "en": "With the number of bugs found in each run",
        "ja": "各実行で検出されたバグの数によって"
      },
      {
        "vi": "Bằng các từ khóa (keyword) đại diện cho hành động, ánh xạ tới đoạn mã xử lý tương ứng",
        "en": "With keywords representing actions, each mapped to a corresponding piece of implementation code",
        "ja": "アクションを表すキーワードを用い、それぞれを対応する実装コードにマッピングする"
      },
      {
        "vi": "Bằng biểu đồ luồng UI được vẽ tự động",
        "en": "With auto-generated UI flow diagrams",
        "ja": "自動生成されたUIフロー図によって"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Keyword-Driven dùng một bảng keyword (ví dụ: OpenBrowser, EnterText, ClickButton) mà công cụ tự động ánh xạ sang hàm xử lý thực thi, cho phép người không rành lập trình vẫn viết được test case.",
      "en": "Keyword-Driven uses a keyword table (e.g., OpenBrowser, EnterText, ClickButton) that the automation engine maps to implementation functions, letting non-programmers author test cases.",
      "ja": "キーワード駆動はOpenBrowserやEnterText、ClickButtonなどのキーワード表を用い、自動化エンジンがそれを実装関数にマッピングすることで、プログラミング未経験者でもテストケースを作成できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Hybrid Framework trong automation testing thường được mô tả chính xác nhất là gì?",
      "en": "What best describes a Hybrid Framework in automation testing?",
      "ja": "自動化テストにおけるハイブリッドフレームワークを最も正確に表す説明はどれか。"
    },
    "options": [
      {
        "vi": "Framework chỉ dùng riêng công cụ record & playback để tiết kiệm thời gian",
        "en": "A framework that relies solely on a record & playback tool to save time",
        "ja": "時間節約のためレコード＆プレイバックツールのみに依存するフレームワーク"
      },
      {
        "vi": "Framework chạy test song song trên nhiều trình duyệt cùng lúc",
        "en": "A framework that runs tests in parallel across multiple browsers at once",
        "ja": "複数のブラウザで同時にテストを並列実行するフレームワーク"
      },
      {
        "vi": "Framework chỉ áp dụng cho kiểm thử API, không dùng cho UI",
        "en": "A framework used only for API testing, never for UI",
        "ja": "UIには使わずAPIテスト専用に用いられるフレームワーク"
      },
      {
        "vi": "Framework kết hợp ưu điểm của nhiều kỹ thuật (ví dụ modular, data-driven, keyword-driven) để tận dụng thế mạnh của từng loại",
        "en": "A framework that combines strengths of multiple techniques (e.g., modular, data-driven, keyword-driven) to leverage each one's advantages",
        "ja": "モジュラー・データ駆動・キーワード駆動など複数の手法の長所を組み合わせ、それぞれの強みを活かすフレームワーク"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Hybrid Framework phối hợp nhiều kỹ thuật cùng lúc — thường lấy tính tái sử dụng của modular, khả năng tách dữ liệu của data-driven và tính dễ đọc/dễ dùng của keyword-driven — để cân bằng giữa hiệu quả phát triển và khả năng bảo trì.",
      "en": "A Hybrid Framework combines several techniques at once — typically modular reusability, data-driven data separation, and keyword-driven readability — balancing development effort and maintainability.",
      "ja": "ハイブリッドフレームワークは複数の手法を組み合わせる——通常はモジュラーの再利用性、データ駆動のデータ分離、キーワード駆動の可読性を統合し、開発効率と保守性のバランスを取る。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong dự án automation, nguồn dữ liệu nào KHÔNG phải là lựa chọn phổ biến cho Data-Driven Testing?",
      "en": "In automation projects, which of the following is NOT a common data source choice for Data-Driven Testing?",
      "ja": "自動化プロジェクトにおいて、データ駆動テストのデータソースとして一般的でないものはどれか。"
    },
    "options": [
      {
        "vi": "Nhật ký lỗi runtime của server production",
        "en": "The production server's runtime error logs",
        "ja": "本番サーバーのランタイムエラーログ"
      },
      {
        "vi": "Cơ sở dữ liệu (Database)",
        "en": "A Database",
        "ja": "データベース"
      },
      {
        "vi": "File cấu hình JSON/YAML",
        "en": "JSON/YAML configuration files",
        "ja": "JSON/YAML設定ファイル"
      },
      {
        "vi": "File Excel hoặc CSV",
        "en": "Excel or CSV files",
        "ja": "ExcelまたはCSVファイル"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Excel/CSV, database và JSON/YAML là các nguồn dữ liệu điển hình để tham số hóa test case. Log lỗi production không phải là nguồn dữ liệu kiểm thử tự động — nó dùng để phân tích sự cố, không phải để cấp input cho test.",
      "en": "Excel/CSV, databases, and JSON/YAML are typical parameterization sources for test cases. Production error logs are not a test-data source — they're used for incident analysis, not for feeding test inputs.",
      "ja": "Excel/CSV、データベース、JSON/YAMLはテストケースをパラメータ化する典型的なデータソースである。本番エラーログは障害分析用であり、テスト入力のためのデータソースではない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Ai là đối tượng chính được hưởng lợi từ Keyword-Driven Testing?",
      "en": "Who benefits most directly from Keyword-Driven Testing?",
      "ja": "キーワード駆動テストから最も直接的に恩恵を受けるのは誰か。"
    },
    "options": [
      {
        "vi": "Người quản trị hạ tầng server sản xuất",
        "en": "The production infrastructure administrator",
        "ja": "本番インフラの管理者"
      },
      {
        "vi": "Tester ít hoặc không có kỹ năng lập trình, vì họ có thể tạo test case bằng cách ghép các keyword có sẵn",
        "en": "Testers with little or no programming skill, since they can build test cases by combining pre-built keywords",
        "ja": "プログラミングスキルがほとんど、または全くないテスターで、既存のキーワードを組み合わせてテストケースを作成できる"
      },
      {
        "vi": "Nhà thiết kế UI/UX của sản phẩm",
        "en": "The product's UI/UX designer",
        "ja": "製品のUI/UXデザイナー"
      },
      {
        "vi": "Đội DevOps chịu trách nhiệm CI/CD pipeline",
        "en": "The DevOps team responsible for the CI/CD pipeline",
        "ja": "CI/CDパイプラインを担当するDevOpsチーム"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì logic kỹ thuật đã được đóng gói trong thư viện keyword/function do người có kỹ năng code xây dựng sẵn, tester không biết lập trình vẫn có thể soạn test case bằng cách sắp xếp các keyword trong bảng.",
      "en": "Since the technical logic is encapsulated in a keyword/function library built by skilled developers, non-programming testers can still author test cases by arranging keywords in a table.",
      "ja": "技術的なロジックは開発スキルを持つ人が構築したキーワード/関数ライブラリにカプセル化されているため、プログラミングができないテスターでも表の中でキーワードを並べるだけでテストケースを作成できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "TestNG @DataProvider trong automation testing được dùng cho mục đích gì?",
      "en": "What is TestNG's @DataProvider used for in automation testing?",
      "ja": "自動化テストにおいてTestNGの@DataProviderは何のために使われるか。"
    },
    "options": [
      {
        "vi": "Kết nối tới hệ thống CI/CD để trigger pipeline",
        "en": "Connecting to the CI/CD system to trigger the pipeline",
        "ja": "CI/CDシステムに接続してパイプラインをトリガーする"
      },
      {
        "vi": "Tự động sinh báo cáo HTML sau khi test chạy xong",
        "en": "Automatically generating an HTML report after tests finish",
        "ja": "テスト終了後にHTMLレポートを自動生成する"
      },
      {
        "vi": "Cung cấp nhiều bộ dữ liệu đầu vào để chạy cùng một test method nhiều lần, hỗ trợ mô hình data-driven",
        "en": "Supplying multiple sets of input data to run the same test method repeatedly, supporting the data-driven model",
        "ja": "同じテストメソッドを複数回実行するために複数の入力データセットを供給し、データ駆動モデルをサポートする"
      },
      {
        "vi": "Ghi log lỗi vào hệ thống quản lý bug",
        "en": "Logging errors into a bug-tracking system",
        "ja": "エラーをバグ管理システムに記録する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "@DataProvider là annotation của TestNG cho phép truyền một mảng/ma trận dữ liệu vào test method, khiến method đó chạy lặp lại một lần cho mỗi bộ dữ liệu — đây là cơ chế tiêu biểu hiện thực hóa data-driven testing trong Java.",
      "en": "@DataProvider is a TestNG annotation that feeds an array/matrix of data into a test method, causing it to run once per data set — a typical mechanism for implementing data-driven testing in Java.",
      "ja": "@DataProviderはTestNGのアノテーションで、データの配列や行列をテストメソッドに渡し、データセットごとに1回ずつ実行させる。Javaでデータ駆動テストを実装する典型的な仕組みである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nhược điểm lớn nhất khi triển khai Keyword-Driven Testing thường nằm ở đâu?",
      "en": "Where does the biggest drawback of implementing Keyword-Driven Testing typically lie?",
      "ja": "キーワード駆動テストを導入する際の最大の欠点は通常どこにあるか。"
    },
    "options": [
      {
        "vi": "Chỉ áp dụng được cho ứng dụng di động",
        "en": "It only applies to mobile applications",
        "ja": "モバイルアプリケーションにのみ適用可能である"
      },
      {
        "vi": "Không thể chạy trên môi trường CI/CD",
        "en": "It cannot run on a CI/CD environment",
        "ja": "CI/CD環境では実行できない"
      },
      {
        "vi": "Không hỗ trợ kiểm thử hồi quy",
        "en": "It does not support regression testing",
        "ja": "回帰テストをサポートしない"
      },
      {
        "vi": "Chi phí và công sức ban đầu lớn để thiết kế, xây dựng thư viện keyword và cơ chế ánh xạ",
        "en": "The high upfront cost and effort to design and build the keyword library and mapping engine",
        "ja": "キーワードライブラリとマッピングエンジンを設計・構築するための初期コストと労力が大きい"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Xây dựng và bảo trì hệ thống keyword — bao gồm định nghĩa keyword, cơ chế parser/ánh xạ, và thư viện hàm xử lý — đòi hỏi đầu tư thiết kế ban đầu đáng kể trước khi mang lại lợi ích về tốc độ viết test case sau này.",
      "en": "Building and maintaining the keyword system — keyword definitions, the parsing/mapping engine, and the underlying function library — requires significant upfront design investment before it pays off in faster test case authoring later.",
      "ja": "キーワード定義、パーサー/マッピングエンジン、基盤となる関数ライブラリを含むキーワードシステムの構築と保守には、後にテストケース作成が高速化するまでにかなりの初期設計投資が必要である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Robot Framework là một ví dụ tiêu biểu cho loại kiến trúc automation nào?",
      "en": "Robot Framework is a typical example of which automation architecture style?",
      "ja": "Robot Frameworkはどの自動化アーキテクチャスタイルの典型例か。"
    },
    "options": [
      {
        "vi": "Kiến trúc keyword-driven, cho phép viết test case bằng cú pháp bảng từ khóa (kể cả tự định nghĩa keyword mới)",
        "en": "A keyword-driven architecture, allowing test cases to be written using keyword-table syntax (including defining custom keywords)",
        "ja": "キーワードテーブル構文でテストケースを記述できる(カスタムキーワードの定義も含む)キーワード駆動アーキテクチャ"
      },
      {
        "vi": "Kiến trúc thuần code, không hỗ trợ khái niệm từ khóa",
        "en": "A pure-code architecture with no keyword concept",
        "ja": "キーワードの概念を持たない純粋なコードベースのアーキテクチャ"
      },
      {
        "vi": "Kiến trúc chỉ dành riêng cho kiểm thử hiệu năng (performance testing)",
        "en": "An architecture used exclusively for performance testing",
        "ja": "パフォーマンステスト専用のアーキテクチャ"
      },
      {
        "vi": "Kiến trúc yêu cầu bắt buộc phải dùng ngôn ngữ Ruby",
        "en": "An architecture that mandates the use of Ruby",
        "ja": "Ruby言語の使用を必須とするアーキテクチャ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Robot Framework dùng cú pháp bảng dạng keyword (Test Cases, Keywords section...) cho phép người dùng ghép các keyword có sẵn hoặc tự tạo keyword mới, là ví dụ điển hình của keyword-driven framework mã nguồn mở.",
      "en": "Robot Framework uses table-based keyword syntax (Test Cases, Keywords sections, etc.), letting users combine built-in keywords or create custom ones — a classic example of an open-source keyword-driven framework.",
      "ja": "Robot FrameworkはTest CasesやKeywordsセクションなどのテーブル形式のキーワード構文を用い、組み込みキーワードの組み合わせやカスタムキーワードの作成を可能にする、オープンソースのキーワード駆動フレームワークの代表例である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Lợi ích chính khi áp dụng Data-Driven Testing so với viết test case cứng cho từng bộ dữ liệu là gì?",
      "en": "What is the main benefit of Data-Driven Testing compared to hard-coding a separate test case for each data set?",
      "ja": "データセットごとに個別のテストケースをハードコーディングする方法と比べ、データ駆動テストの主な利点は何か。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu review test case trước khi release",
        "en": "It completely removes the need to review test cases before release",
        "ja": "リリース前のテストケースレビューの必要性を完全になくす"
      },
      {
        "vi": "Giảm số lượng script cần bảo trì vì một script phục vụ nhiều bộ dữ liệu, dễ mở rộng coverage",
        "en": "Fewer scripts to maintain since one script serves many data sets, making it easy to extend coverage",
        "ja": "1つのスクリプトが複数のデータセットに対応するため保守すべきスクリプト数が減り、カバレッジを容易に拡張できる"
      },
      {
        "vi": "Không cần môi trường test riêng biệt, chạy trực tiếp trên production",
        "en": "It removes the need for a separate test environment, running directly on production",
        "ja": "独立したテスト環境が不要になり、本番環境で直接実行できる"
      },
      {
        "vi": "Tự động sửa lỗi ứng dụng khi phát hiện sai lệch",
        "en": "It automatically fixes application bugs when a mismatch is detected",
        "ja": "不一致を検出した際にアプリケーションのバグを自動修正する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thay vì nhân bản script cho từng trường hợp dữ liệu, data-driven chỉ cần một script chung, thêm dòng dữ liệu mới trong file nguồn (Excel/CSV/DB) là đã mở rộng được phạm vi kiểm thử mà không phải sửa code.",
      "en": "Instead of duplicating scripts per data case, data-driven testing needs only one shared script; adding a new data row in the source file (Excel/CSV/DB) extends test coverage without touching the code.",
      "ja": "データケースごとにスクリプトを複製する代わりに、データ駆動テストは共有スクリプト1つで済み、ソースファイル(Excel/CSV/DB)に新しいデータ行を追加するだけでコードを変更せずにテストカバレッジを拡張できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong kiến trúc Keyword-Driven, thành phần \"driver script\" (test executor) có vai trò gì?",
      "en": "In a Keyword-Driven architecture, what role does the \"driver script\" (test executor) play?",
      "ja": "キーワード駆動アーキテクチャにおいて「ドライバスクリプト」(テスト実行エンジン)の役割は何か。"
    },
    "options": [
      {
        "vi": "Lưu trữ toàn bộ dữ liệu môi trường như URL, tài khoản đăng nhập",
        "en": "Storing all environment data such as URLs and login accounts",
        "ja": "URLやログインアカウントなどすべての環境データを保存する"
      },
      {
        "vi": "Thiết kế giao diện người dùng cho ứng dụng đang được kiểm thử",
        "en": "Designing the UI of the application under test",
        "ja": "テスト対象アプリケーションのUIを設計する"
      },
      {
        "vi": "Đọc bảng keyword của test case, thông dịch từng keyword và gọi hàm xử lý tương ứng để thực thi hành động",
        "en": "Reading the test case's keyword table, interpreting each keyword, and invoking the corresponding function to execute the action",
        "ja": "テストケースのキーワード表を読み取り、各キーワードを解釈して対応する関数を呼び出しアクションを実行する"
      },
      {
        "vi": "Sinh dữ liệu ngẫu nhiên cho kiểm thử fuzz testing",
        "en": "Generating random data for fuzz testing",
        "ja": "ファズテスト用のランダムデータを生成する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Driver script (test executor/engine) là bộ não trung tâm: nó đọc lần lượt các dòng keyword trong test case, tra cứu bảng ánh xạ keyword-to-function rồi gọi đoạn code tương ứng để thực hiện hành động trên ứng dụng.",
      "en": "The driver script (test executor/engine) is the central brain: it reads keyword rows in the test case one by one, looks them up in the keyword-to-function mapping, and calls the matching code to perform the action on the application.",
      "ja": "ドライバスクリプト(テスト実行エンジン)は中枢的な役割を果たす。テストケース中のキーワード行を1つずつ読み取り、キーワードと関数のマッピングを参照して対応するコードを呼び出し、アプリケーション上でアクションを実行する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trường hợp nào SAU ĐÂY phù hợp nhất để lựa chọn triển khai Hybrid Framework thay vì chỉ dùng thuần data-driven?",
      "en": "Which scenario below is most suitable for choosing a Hybrid Framework instead of a purely data-driven approach?",
      "ja": "純粋なデータ駆動アプローチではなくハイブリッドフレームワークを選ぶのに最も適したシナリオはどれか。"
    },
    "options": [
      {
        "vi": "Ứng dụng chỉ có một màn hình đăng nhập duy nhất, không có logic nghiệp vụ phức tạp",
        "en": "The application has only a single login screen with no complex business logic",
        "ja": "アプリケーションが複雑な業務ロジックのない単一のログイン画面しか持たない"
      },
      {
        "vi": "Nhóm không có ai biết viết mã, chỉ cần công cụ record & playback đơn giản",
        "en": "No one on the team can write code, and only a simple record & playback tool is needed",
        "ja": "チームにコードを書ける人が誰もおらず、単純なレコード＆プレイバックツールだけが必要"
      },
      {
        "vi": "Toàn bộ kiểm thử chỉ chạy một lần duy nhất rồi loại bỏ, không cần bảo trì lâu dài",
        "en": "All tests are run only once and then discarded, with no long-term maintenance needed",
        "ja": "すべてのテストが一度だけ実行されて破棄され、長期的な保守が不要"
      },
      {
        "vi": "Dự án có đội ngũ vừa gồm automation engineer viết code lẫn manual tester cần tự viết test case đơn giản, đồng thời cần tái sử dụng module và tham số hóa dữ liệu lớn",
        "en": "The project has a mixed team of coding automation engineers and manual testers who need to author simple test cases themselves, while also needing module reuse and large-scale data parameterization",
        "ja": "コードを書く自動化エンジニアと、簡単なテストケースを自作する必要のある手動テスターが混在するチームで、モジュールの再利用と大規模なデータパラメータ化も必要とするプロジェクト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Hybrid phát huy giá trị khi cần kết hợp nhiều lợi ích cùng lúc: tính module hóa để tái sử dụng, tách dữ liệu để mở rộng coverage, và lớp keyword để người ít kỹ năng code vẫn tham gia viết test — phù hợp với đội hình hỗn hợp và dự án dài hạn.",
      "en": "Hybrid pays off when several benefits are needed simultaneously: modular reuse, data separation for coverage scaling, and a keyword layer so less technical staff can still author tests — fitting mixed teams and long-lived projects.",
      "ja": "ハイブリッドは複数の利点を同時に必要とする場合に効果を発揮する。モジュールの再利用性、カバレッジ拡張のためのデータ分離、そして技術力の低いメンバーでもテストを作成できるキーワード層——これらは混成チームや長期プロジェクトに適している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Modular-Driven Framework khác biệt cơ bản với Data-Driven Framework ở điểm nào?",
      "en": "What is the fundamental difference between a Modular-Driven Framework and a Data-Driven Framework?",
      "ja": "モジュラー駆動フレームワークとデータ駆動フレームワークの根本的な違いは何か。"
    },
    "options": [
      {
        "vi": "Modular-driven tập trung chia nhỏ ứng dụng thành các module/hàm tái sử dụng độc lập, trong khi data-driven tập trung tách dữ liệu ra khỏi script",
        "en": "Modular-driven focuses on breaking the application into independent, reusable modules/functions, while data-driven focuses on separating data from the script",
        "ja": "モジュラー駆動はアプリケーションを独立した再利用可能なモジュール/関数に分割することに重点を置き、データ駆動はスクリプトからデータを分離することに重点を置く"
      },
      {
        "vi": "Modular-driven không thể tái sử dụng bất kỳ đoạn code nào",
        "en": "Modular-driven cannot reuse any code at all",
        "ja": "モジュラー駆動はコードを一切再利用できない"
      },
      {
        "vi": "Data-driven chỉ chạy được trên trình duyệt Firefox",
        "en": "Data-driven only works on the Firefox browser",
        "ja": "データ駆動はFirefoxブラウザでしか動作しない"
      },
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "Both are entirely identical, differing only in name",
        "ja": "両者は完全に同一で、名称が異なるだけである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Modular-driven nhấn mạnh việc chia nhỏ hành động lặp lại (ví dụ login, search) thành các hàm/module độc lập để tái sử dụng giữa nhiều test case, còn data-driven nhấn mạnh việc tách bộ dữ liệu ra khỏi logic thực thi — hai mối quan tâm bổ sung cho nhau, thường được kết hợp trong hybrid.",
      "en": "Modular-driven emphasizes breaking repeated actions (e.g., login, search) into independent reusable functions/modules across test cases, while data-driven emphasizes separating data sets from execution logic — complementary concerns often combined in a hybrid.",
      "ja": "モジュラー駆動は、ログインや検索など繰り返されるアクションを独立した再利用可能な関数/モジュールに分割することに重点を置き、データ駆動は実行ロジックからデータセットを分離することに重点を置く。両者は相補的な関心事であり、しばしばハイブリッドで組み合わされる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một \"keyword table\" điển hình trong test case keyword-driven thường chứa những cột nào?",
      "en": "What columns does a typical \"keyword table\" in a keyword-driven test case usually contain?",
      "ja": "キーワード駆動テストケースの典型的な「キーワードテーブル」には通常どのような列が含まれるか。"
    },
    "options": [
      {
        "vi": "Chỉ chứa mã nguồn Java đầy đủ của toàn bộ test case",
        "en": "Only the full Java source code of the entire test case",
        "ja": "テストケース全体の完全なJavaソースコードのみ"
      },
      {
        "vi": "Tên keyword (hành động), đối tượng/locator mục tiêu, và giá trị/tham số cần thiết",
        "en": "Keyword name (action), target object/locator, and required value/parameter",
        "ja": "キーワード名(アクション)、対象オブジェクト/ロケータ、必要な値/パラメータ"
      },
      {
        "vi": "Chỉ số hiệu năng CPU và RAM của máy chạy test",
        "en": "Only CPU and RAM performance metrics of the machine running the test",
        "ja": "テスト実行マシンのCPUとRAMのパフォーマンス指標のみ"
      },
      {
        "vi": "Danh sách email của toàn bộ thành viên team QA",
        "en": "A list of email addresses of the whole QA team",
        "ja": "QAチーム全員のメールアドレスの一覧"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Bảng keyword thường có cấu trúc dạng hàng-cột: mỗi hàng là một bước, gồm keyword (ví dụ ClickButton), đối tượng đích (locator) và giá trị tham số nếu cần (ví dụ text nhập vào) — driver script sẽ đọc và thực thi lần lượt.",
      "en": "A keyword table is typically row-column structured: each row is a step, containing the keyword (e.g., ClickButton), the target object (locator), and a parameter value if needed (e.g., text to enter) — the driver script reads and executes them in sequence.",
      "ja": "キーワードテーブルは通常、行と列の構造を持つ。各行は1つのステップであり、キーワード(例:ClickButton)、対象オブジェクト(ロケータ)、必要に応じたパラメータ値(例:入力するテキスト)を含む。ドライバスクリプトがこれらを順に読み取り実行する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nhược điểm nào sau đây thường được nhắc đến với Pure Data-Driven Testing?",
      "en": "Which drawback is commonly associated with Pure Data-Driven Testing?",
      "ja": "純粋なデータ駆動テストでよく指摘される欠点はどれか。"
    },
    "options": [
      {
        "vi": "Chỉ hoạt động được với ứng dụng desktop, không hỗ trợ web",
        "en": "It only works with desktop applications, not web",
        "ja": "デスクトップアプリケーションでしか動作せず、Webはサポートしない"
      },
      {
        "vi": "Không thể lưu trữ dữ liệu kiểm thử ở bất kỳ định dạng nào ngoài XML",
        "en": "Test data can only be stored in XML format and no other",
        "ja": "テストデータはXML形式でしか保存できない"
      },
      {
        "vi": "Vẫn cần người viết script gốc có kỹ năng lập trình để xây dựng logic điều khiển và đọc dữ liệu",
        "en": "It still requires someone with programming skills to write the underlying script that builds control logic and reads data",
        "ja": "制御ロジックの構築とデータ読み込みを行う基礎となるスクリプトを記述するには、依然としてプログラミングスキルを持つ人が必要である"
      },
      {
        "vi": "Không thể tham số hóa số lượng bộ dữ liệu lớn hơn 10 dòng",
        "en": "It cannot parameterize more than 10 rows of data",
        "ja": "10行を超えるデータセットはパラメータ化できない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Data-driven giúp tái sử dụng script cho nhiều dữ liệu, nhưng bản thân việc thiết kế script đọc dữ liệu, xử lý logic điều khiển (vòng lặp, assertion) vẫn đòi hỏi kỹ năng lập trình — đây không phải là giải pháp \"không cần code\" hoàn toàn.",
      "en": "Data-driven lets a script serve many data sets, but designing the script itself — data-reading logic, loops, assertions — still requires programming skill; it is not a fully \"no-code\" solution.",
      "ja": "データ駆動により1つのスクリプトで複数のデータセットに対応できるが、データ読み込みロジック、ループ、アサーションなどスクリプト自体の設計には依然としてプログラミングスキルが必要であり、完全な「ノーコード」ソリューションではない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Mối liên hệ giữa BDD (Cucumber/Gherkin) và Keyword-Driven Testing là gì?",
      "en": "What is the relationship between BDD (Cucumber/Gherkin) and Keyword-Driven Testing?",
      "ja": "BDD(Cucumber/Gherkin)とキーワード駆動テストの関係は何か。"
    },
    "options": [
      {
        "vi": "Không liên quan gì đến nhau, hai kỹ thuật hoàn toàn tách biệt",
        "en": "They are unrelated, completely separate techniques",
        "ja": "両者は無関係で、まったく別個の技術である"
      },
      {
        "vi": "Gherkin bắt buộc phải chạy trên trình duyệt Internet Explorer",
        "en": "Gherkin must run in the Internet Explorer browser",
        "ja": "GherkinはInternet Explorerブラウザでしか実行できない"
      },
      {
        "vi": "BDD chỉ dùng để kiểm thử bảo mật (security testing)",
        "en": "BDD is used exclusively for security testing",
        "ja": "BDDはセキュリティテスト専用に使われる"
      },
      {
        "vi": "Các bước Given/When/Then trong Gherkin đóng vai trò tương tự keyword, được ánh xạ tới đoạn code step definition thực thi — về bản chất là một dạng keyword-driven",
        "en": "Given/When/Then steps in Gherkin act like keywords, mapped to step-definition code that executes them — essentially a form of keyword-driven testing",
        "ja": "GherkinのGiven/When/Thenステップはキーワードのように機能し、それを実行するステップ定義コードにマッピングされる——本質的にキーワード駆動テストの一形態である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi câu Gherkin (Given/When/Then) hoạt động như một \"keyword\" ở mức business, được ánh xạ tới step definition (hàm code) thực thi hành động — vì vậy BDD framework như Cucumber được xem là một biến thể của keyword-driven, hướng tới cả stakeholder phi kỹ thuật.",
      "en": "Each Gherkin line (Given/When/Then) acts as a business-level \"keyword\" mapped to a step definition (code function) that executes the action — so BDD frameworks like Cucumber are considered a variant of keyword-driven testing, aimed at non-technical stakeholders too.",
      "ja": "各Gherkin行(Given/When/Then)はビジネスレベルの「キーワード」として機能し、アクションを実行するステップ定義(コード関数)にマッピングされる。そのためCucumberのようなBDDフレームワークは、非技術系の関係者にも配慮したキーワード駆動テストの一種と見なされる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Việc tách biệt test data khỏi test logic trong data-driven framework mang lại lợi ích nào rõ nhất?",
      "en": "What benefit does separating test data from test logic in a data-driven framework most clearly provide?",
      "ja": "データ駆動フレームワークにおいてテストデータをテストロジックから分離することが最も明確にもたらす利点は何か。"
    },
    "options": [
      {
        "vi": "Non-technical member (BA, tester) có thể cập nhật/bổ sung bộ dữ liệu kiểm thử mà không cần sửa code script",
        "en": "Non-technical members (BAs, testers) can update/add test data sets without touching the script code",
        "ja": "非技術系メンバー(BAやテスター)がスクリプトのコードに触れることなくテストデータセットを更新・追加できる"
      },
      {
        "vi": "Giúp ứng dụng chạy nhanh hơn trên môi trường production",
        "en": "Makes the application run faster in production",
        "ja": "本番環境でアプリケーションの動作を高速化する"
      },
      {
        "vi": "Tự động vá lỗi bảo mật trong ứng dụng",
        "en": "Automatically patches security vulnerabilities in the application",
        "ja": "アプリケーションのセキュリティ脆弱性を自動的に修正する"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu môi trường staging",
        "en": "Eliminates the need for a staging environment entirely",
        "ja": "ステージング環境の必要性を完全になくす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi dữ liệu nằm ở file riêng (Excel/CSV/DB), người không viết code vẫn có thể thêm dòng dữ liệu mới, sửa giá trị test mà không đụng tới logic script — giúp mở rộng test coverage linh hoạt và giảm rủi ro phá vỡ script.",
      "en": "When data lives in a separate file (Excel/CSV/DB), non-coders can add new data rows or edit test values without touching script logic — enabling flexible coverage growth with less risk of breaking the script.",
      "ja": "データが別ファイル(Excel/CSV/DB)にある場合、コードを書かない人でもスクリプトのロジックに触れずに新しいデータ行を追加したりテスト値を編集したりできる。これにより柔軟にカバレッジを拡大でき、スクリプトを壊すリスクも低減する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi số lượng tổ hợp dữ liệu đầu vào tăng nhanh (ví dụ kiểm thử validation form với hàng trăm biến thể), chiến lược nào nên được ưu tiên?",
      "en": "When the number of input data combinations grows rapidly (e.g., testing form validation with hundreds of variants), which strategy should be prioritized?",
      "ja": "入力データの組み合わせが急速に増加する場合(例:数百通りのバリエーションを持つフォームバリデーションのテスト)、優先すべき戦略はどれか。"
    },
    "options": [
      {
        "vi": "Viết một test case riêng biệt cho từng biến thể dữ liệu bằng cách copy-paste script",
        "en": "Write a separate test case for each data variant by copy-pasting the script",
        "ja": "スクリプトをコピー＆ペーストしてバリエーションごとに個別のテストケースを書く"
      },
      {
        "vi": "Áp dụng data-driven testing để một script chung chạy lặp qua tất cả các bộ dữ liệu từ nguồn ngoài",
        "en": "Apply data-driven testing so one shared script iterates over all data sets from an external source",
        "ja": "外部ソースからのすべてのデータセットを1つの共有スクリプトで反復処理するデータ駆動テストを適用する"
      },
      {
        "vi": "Bỏ qua kiểm thử tự động, chuyển hết sang kiểm thử thủ công",
        "en": "Skip automation entirely and switch to fully manual testing",
        "ja": "自動化をすべて放棄し完全な手動テストに切り替える"
      },
      {
        "vi": "Chỉ kiểm thử một biến thể ngẫu nhiên duy nhất để tiết kiệm thời gian",
        "en": "Test only a single random variant to save time",
        "ja": "時間節約のためランダムに選んだ1つのバリエーションのみをテストする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây chính là tình huống lý tưởng cho data-driven: một script tham số hóa lặp qua toàn bộ bộ dữ liệu (đọc từ file/DB) thay vì nhân bản script, giúp mở rộng coverage mà không tăng chi phí bảo trì tuyến tính theo số biến thể.",
      "en": "This is exactly the ideal scenario for data-driven testing: one parameterized script iterates over the full data set (read from a file/DB) instead of duplicating scripts, expanding coverage without linear maintenance cost growth per variant.",
      "ja": "これはまさにデータ駆動テストの理想的なシナリオである。パラメータ化された1つのスクリプトがファイル/DBから読み込んだデータセット全体を反復処理し、スクリプトを複製することなくカバレッジを拡大でき、バリエーション数に比例した保守コストの増大を防げる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong kiến trúc keyword-driven, \"action/function library\" (thư viện hàm xử lý) chứa gì?",
      "en": "In a keyword-driven architecture, what does the \"action/function library\" contain?",
      "ja": "キーワード駆動アーキテクチャにおいて「アクション/関数ライブラリ」には何が含まれるか。"
    },
    "options": [
      {
        "vi": "Danh sách các bug đã được xác nhận đóng (closed)",
        "en": "A list of confirmed closed bugs",
        "ja": "確認済みでクローズされたバグの一覧"
      },
      {
        "vi": "Biểu đồ Gantt lập kế hoạch dự án",
        "en": "A Gantt chart for project planning",
        "ja": "プロジェクト計画のガントチャート"
      },
      {
        "vi": "Đoạn code triển khai thực tế cho từng keyword, ví dụ hàm xử lý click, nhập text, chờ phần tử xuất hiện",
        "en": "The actual implementation code for each keyword, e.g., functions that click, enter text, wait for an element",
        "ja": "クリックやテキスト入力、要素の出現待機など、各キーワードの実際の実装コード"
      },
      {
        "vi": "Bảng lương của đội automation testing",
        "en": "The automation testing team's payroll table",
        "ja": "自動化テストチームの給与表"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Function/action library là nơi kỹ sư automation viết code thực thi hành động thực tế (click, input, wait, verify...) ứng với mỗi keyword; driver script sẽ gọi các hàm này khi thông dịch bảng keyword của test case.",
      "en": "The function/action library is where automation engineers write the actual execution code (click, input, wait, verify, etc.) for each keyword; the driver script calls these functions when interpreting the test case's keyword table.",
      "ja": "関数/アクションライブラリは、自動化エンジニアが各キーワードに対応する実際の実行コード(クリック、入力、待機、検証など)を記述する場所である。ドライバスクリプトはテストケースのキーワードテーブルを解釈する際にこれらの関数を呼び出す。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một ví dụ điển hình của Data-Driven Testing với Selenium là gì?",
      "en": "What is a typical example of Data-Driven Testing with Selenium?",
      "ja": "Seleniumを用いたデータ駆動テストの典型例は何か。"
    },
    "options": [
      {
        "vi": "Dùng Selenium để viết tài liệu đặc tả yêu cầu (SRS)",
        "en": "Using Selenium to write requirement specification documents (SRS)",
        "ja": "Seleniumを使って要件仕様書(SRS)を作成する"
      },
      {
        "vi": "Dùng Selenium để deploy ứng dụng lên server production",
        "en": "Using Selenium to deploy the application to a production server",
        "ja": "Seleniumを使ってアプリケーションを本番サーバーにデプロイする"
      },
      {
        "vi": "Dùng Selenium để đo tốc độ tải trang mà không cần dữ liệu đầu vào nào",
        "en": "Using Selenium to measure page load speed without any input data",
        "ja": "入力データなしでSeleniumを使いページの読み込み速度を測定する"
      },
      {
        "vi": "Dùng Apache POI đọc dữ liệu tài khoản đăng nhập từ file Excel, sau đó vòng lặp truyền từng dòng vào cùng một script đăng nhập Selenium",
        "en": "Using Apache POI to read login account data from an Excel file, then looping through each row into the same Selenium login script",
        "ja": "Apache POIを使ってExcelファイルからログインアカウントデータを読み込み、各行を同じSeleniumログインスクリプトにループで渡す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cách phổ biến trong Java/Selenium là dùng thư viện Apache POI đọc từng dòng tài khoản (username/password) từ file Excel, rồi lặp qua từng dòng để chạy cùng một script login — minh họa rõ nguyên lý tách data khỏi logic.",
      "en": "A common Java/Selenium approach is to use the Apache POI library to read each account row (username/password) from an Excel file, then loop through the rows to run the same login script — clearly illustrating the separation of data from logic.",
      "ja": "Java/Seleniumでよく使われる方法は、Apache POIライブラリを使ってExcelファイルから各アカウント行(ユーザー名/パスワード)を読み込み、その行をループしながら同じログインスクリプトを実行することである。データとロジックの分離という原則を明確に示している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Rủi ro thường gặp khi lưu trữ test data trong file CSV/Excel lớn để phục vụ data-driven testing là gì?",
      "en": "What is a common risk of storing test data in large CSV/Excel files for data-driven testing?",
      "ja": "データ駆動テスト用に大きなCSV/Excelファイルにテストデータを保存する際によく見られるリスクは何か。"
    },
    "options": [
      {
        "vi": "Khó version control và review diff khi nhiều người cùng chỉnh sửa, dễ gây xung đột hoặc dữ liệu không nhất quán",
        "en": "Difficulty with version control and diff review when multiple people edit it, easily causing conflicts or inconsistent data",
        "ja": "複数人が編集する際にバージョン管理やdiffレビューが難しく、競合やデータの不整合が生じやすい"
      },
      {
        "vi": "File Excel không thể mở được trên máy tính Windows",
        "en": "Excel files cannot be opened on Windows machines",
        "ja": "ExcelファイルはWindowsマシンでは開けない"
      },
      {
        "vi": "CSV chỉ hỗ trợ tối đa 5 dòng dữ liệu",
        "en": "CSV supports a maximum of only 5 data rows",
        "ja": "CSVはデータ行を最大5行までしかサポートしない"
      },
      {
        "vi": "Selenium không thể tương tác với bất kỳ file Excel nào",
        "en": "Selenium cannot interact with any Excel file at all",
        "ja": "SeleniumはいかなるExcelファイルとも連携できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "File nhị phân như Excel hoặc CSV lớn khó theo dõi thay đổi (diff) trong git, nhiều người chỉnh sửa cùng lúc dễ gây conflict hoặc ghi đè dữ liệu — đây là lý do nhiều team chuyển sang dùng database hoặc file dạng text có cấu trúc rõ ràng (JSON/YAML) khi quy mô lớn.",
      "en": "Large binary/Excel or CSV files are hard to diff and track in git; concurrent edits by multiple people easily cause conflicts or overwritten data — which is why many teams move to a database or structured text formats (JSON/YAML) at scale.",
      "ja": "大きなバイナリ形式のExcelやCSVファイルはgit上での差分追跡が難しく、複数人による同時編集は競合やデータの上書きを引き起こしやすい。そのため規模が大きくなると多くのチームがデータベースや構造化されたテキスト形式(JSON/YAML)へ移行する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Hybrid Framework, lớp \"business/domain function\" (hàm nghiệp vụ) thường đóng vai trò gì?",
      "en": "In a Hybrid Framework, what role does the \"business/domain function\" layer typically play?",
      "ja": "ハイブリッドフレームワークにおいて「ビジネス/ドメイン関数」層は通常どのような役割を果たすか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn nhu cầu có tester, ứng dụng tự kiểm thử chính nó",
        "en": "Completely replacing the need for testers, with the app testing itself",
        "ja": "テスターの必要性を完全になくし、アプリケーション自身がテストを行う"
      },
      {
        "vi": "Bọc các thao tác UI cấp thấp (click, type) thành các hành động nghiệp vụ cấp cao (ví dụ \"đặt hàng thành công\"), giúp test case dễ đọc và dễ tái sử dụng",
        "en": "Wrapping low-level UI actions (click, type) into high-level business actions (e.g., \"place order successfully\"), making test cases more readable and reusable",
        "ja": "クリックや入力といった低レベルのUI操作を「注文を正常に完了する」といった高レベルの業務アクションにまとめ、テストケースの可読性と再利用性を高める"
      },
      {
        "vi": "Quản lý ngân sách và chi phí vận hành server test",
        "en": "Managing budget and operating costs of the test server",
        "ja": "テストサーバーの予算と運用コストを管理する"
      },
      {
        "vi": "Chỉ dùng để style CSS cho báo cáo test",
        "en": "Used only to style the CSS of test reports",
        "ja": "テストレポートのCSSスタイリングのみに使用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Lớp hàm nghiệp vụ đóng gói nhiều bước UI nhỏ lẻ thành một hành động có ý nghĩa nghiệp vụ, giúp test case ở tầng trên viết ngắn gọn, dễ hiểu, và khi UI thay đổi chỉ cần sửa một nơi — đây là nguyên lý cốt lõi kết hợp modular vào hybrid.",
      "en": "The business-function layer packages many small UI steps into a single business-meaningful action, letting higher-level test cases be short and readable, and when the UI changes only one place needs updating — a core modular principle woven into hybrid frameworks.",
      "ja": "ビジネス関数層は多数の細かいUIステップを1つの業務的に意味のあるアクションにまとめ、上位のテストケースを簡潔で理解しやすくする。UIが変更された際も1箇所を修正するだけで済む——これはハイブリッドフレームワークに組み込まれたモジュラー原則の核心である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Phát biểu nào sau đây là SAI về mối quan hệ giữa \"test data\" và \"test script\" trong data-driven testing?",
      "en": "Which statement below is INCORRECT about the relationship between \"test data\" and \"test script\" in data-driven testing?",
      "ja": "データ駆動テストにおける「テストデータ」と「テストスクリプト」の関係について、誤っている記述はどれか。"
    },
    "options": [
      {
        "vi": "Test script chứa logic điều khiển (đọc dữ liệu, thực thi hành động, so sánh kết quả) và có thể tái sử dụng cho nhiều bộ dữ liệu",
        "en": "The test script contains control logic (reading data, executing actions, comparing results) and can be reused across many data sets",
        "ja": "テストスクリプトは制御ロジック(データ読み込み、アクション実行、結果比較)を含み、複数のデータセットに対して再利用できる"
      },
      {
        "vi": "Test data chứa các giá trị đầu vào cụ thể và kết quả mong đợi tương ứng, được lưu tách biệt khỏi script",
        "en": "Test data contains specific input values and corresponding expected results, stored separately from the script",
        "ja": "テストデータは具体的な入力値と対応する期待結果を含み、スクリプトとは別に保存される"
      },
      {
        "vi": "Test data và test script phải luôn được viết gộp trong cùng một file mã nguồn để đảm bảo tính nhất quán",
        "en": "Test data and test script must always be written together in a single source code file to ensure consistency",
        "ja": "テストデータとテストスクリプトは一貫性を保証するため常に同じソースコードファイル内にまとめて記述しなければならない"
      },
      {
        "vi": "Khi thêm bộ dữ liệu mới, thường chỉ cần cập nhật file dữ liệu mà không cần sửa test script",
        "en": "When adding a new data set, usually only the data file needs updating, not the test script",
        "ja": "新しいデータセットを追加する場合、通常はデータファイルの更新のみで済み、テストスクリプトを修正する必要はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nguyên lý cốt lõi của data-driven testing chính là TÁCH dữ liệu khỏi script, không phải gộp chung. Việc gộp chung sẽ triệt tiêu lợi ích tái sử dụng và khiến việc thêm dữ liệu mới đòi hỏi sửa code — đi ngược lại mục tiêu của kỹ thuật này.",
      "en": "The core principle of data-driven testing is SEPARATING data from the script, not merging them. Merging them would eliminate the reuse benefit and require code changes just to add new data — contrary to the technique's purpose.",
      "ja": "データ駆動テストの核心原則は、データとスクリプトを「分離する」ことであり、統合することではない。統合してしまうと再利用の利点が失われ、新しいデータを追加するだけでコード変更が必要になってしまい、この手法の目的に反する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "So với việc chỉ dùng một kỹ thuật đơn lẻ (ví dụ chỉ data-driven), Hybrid Framework mang lại lợi thế cạnh tranh nào rõ rệt nhất?",
      "en": "Compared to using a single technique alone (e.g., only data-driven), what is the most distinct competitive advantage of a Hybrid Framework?",
      "ja": "単一の手法(例:データ駆動のみ)だけを使う場合と比べ、ハイブリッドフレームワークが持つ最も明確な優位性は何か。"
    },
    "options": [
      {
        "vi": "Không bao giờ cần bảo trì lại vì mọi thứ tự động thích nghi với UI mới",
        "en": "It never needs re-maintenance because everything automatically adapts to the new UI",
        "ja": "すべてが新しいUIに自動的に適応するため、再保守が一切不要になる"
      },
      {
        "vi": "Chỉ cần một người duy nhất trong team, không cần phối hợp",
        "en": "It requires only a single person on the team, with no need for coordination",
        "ja": "チームに必要なのは1人だけで、連携は不要になる"
      },
      {
        "vi": "Giá thành công cụ luôn rẻ hơn tất cả các kỹ thuật khác",
        "en": "The tooling cost is always cheaper than any other technique",
        "ja": "ツールのコストが他のどの手法よりも常に安い"
      },
      {
        "vi": "Vừa tái sử dụng được module/hàm nghiệp vụ, vừa mở rộng coverage qua tham số hóa dữ liệu, vừa cho phép người ít kỹ thuật tham gia qua lớp keyword — tối ưu tổng thể hơn một kỹ thuật đơn lẻ",
        "en": "It reuses business modules/functions, extends coverage via data parameterization, and lets less technical people contribute through a keyword layer — an overall better optimum than any single technique",
        "ja": "業務モジュール/関数の再利用、データパラメータ化によるカバレッジ拡張、キーワード層を通じた非技術系メンバーの参加を同時に実現し、単一手法よりも総合的に最適化されている"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Hybrid không phải là \"miễn phí bảo trì\" hay \"rẻ nhất tuyệt đối\" mà là sự cân bằng có chủ đích: kết hợp tái sử dụng module, mở rộng dữ liệu, và khả năng tiếp cận của keyword để tối ưu hiệu quả tổng thể cho các dự án phức tạp, nhiều vai trò tham gia.",
      "en": "Hybrid isn't \"maintenance-free\" or \"absolutely cheapest\" — it's a deliberate balance: combining module reuse, data scalability, and keyword accessibility to optimize overall effectiveness for complex projects with mixed roles.",
      "ja": "ハイブリッドは「保守不要」でも「絶対的に最も安価」でもなく、意図的なバランスである。モジュールの再利用性、データの拡張性、キーワードによるアクセスしやすさを組み合わせ、複数の役割が関わる複雑なプロジェクトの全体的な効果を最適化する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Dự án có nhiều manual tester chưa biết lập trình nhưng cần họ tự viết được test case automation cơ bản, framework nào giúp việc này dễ dàng nhất?",
      "en": "For a project with many manual testers who can't code but need to author basic automation test cases themselves, which framework makes this easiest?",
      "ja": "コーディング未経験の手動テスターが多く在籍し、彼らが基本的な自動化テストケースを自作する必要があるプロジェクトでは、どのフレームワークが最も容易にそれを実現できるか。"
    },
    "options": [
      {
        "vi": "Framework keyword-driven, vì tester chỉ cần chọn và sắp xếp keyword có sẵn trong bảng mà không cần viết mã",
        "en": "A keyword-driven framework, since testers only need to select and arrange pre-built keywords in a table without writing code",
        "ja": "テスターがコードを書かずに表内で既存のキーワードを選択・配置するだけで済むキーワード駆動フレームワーク"
      },
      {
        "vi": "Framework thuần modular chỉ để engineer viết hàm và gọi trực tiếp trong code",
        "en": "A pure modular framework where only engineers write functions and call them directly in code",
        "ja": "エンジニアのみが関数を書きコード内で直接呼び出す純粋なモジュラーフレームワーク"
      },
      {
        "vi": "Framework chỉ hỗ trợ dòng lệnh (CLI) thuần túy",
        "en": "A framework that only supports a pure command-line interface",
        "ja": "純粋なコマンドラインインターフェース(CLI)のみをサポートするフレームワーク"
      },
      {
        "vi": "Không có framework nào có thể giúp tester không biết code tham gia automation",
        "en": "No framework can help a non-coding tester participate in automation at all",
        "ja": "コーディングできないテスターが自動化に関与できるようにするフレームワークは存在しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây chính là mục tiêu thiết kế của keyword-driven testing: logic kỹ thuật được đóng gói sẵn trong thư viện keyword, tester chỉ cần thao tác ở tầng bảng keyword (chọn hành động, nhập tham số) mà không cần biết lập trình.",
      "en": "This is precisely the design goal of keyword-driven testing: technical logic is pre-packaged in the keyword library, so testers only operate at the keyword-table level (selecting actions, entering parameters) without needing programming knowledge.",
      "ja": "これはまさにキーワード駆動テストの設計目標である。技術的なロジックはあらかじめキーワードライブラリにパッケージ化されており、テスターはプログラミング知識なしにキーワード表のレベル(アクションの選択、パラメータの入力)で操作するだけでよい。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Parameterization trong JUnit 5 (@ParameterizedTest kết hợp @CsvSource/@MethodSource) hỗ trợ trực tiếp cho kỹ thuật automation nào?",
      "en": "Parameterization in JUnit 5 (@ParameterizedTest combined with @CsvSource/@MethodSource) directly supports which automation technique?",
      "ja": "JUnit 5のパラメータ化(@ParameterizedTestと@CsvSource/@MethodSourceの組み合わせ)は、どの自動化手法を直接サポートするか。"
    },
    "options": [
      {
        "vi": "Kiểm thử bảo mật xâm nhập (penetration testing)",
        "en": "Penetration security testing",
        "ja": "侵入型セキュリティテスト(ペネトレーションテスト)"
      },
      {
        "vi": "Data-Driven Testing, vì cho phép chạy cùng một test method với nhiều bộ giá trị đầu vào khác nhau",
        "en": "Data-Driven Testing, since it allows the same test method to run with many different sets of input values",
        "ja": "データ駆動テスト。同じテストメソッドを異なる入力値のセットで複数回実行できるため"
      },
      {
        "vi": "Thiết kế giao diện responsive cho mobile",
        "en": "Responsive mobile UI design",
        "ja": "モバイル向けレスポンシブUIデザイン"
      },
      {
        "vi": "Quản lý version control của mã nguồn",
        "en": "Source code version control management",
        "ja": "ソースコードのバージョン管理"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "@ParameterizedTest cùng nguồn dữ liệu như @CsvSource, @MethodSource, @ValueSource cho phép một test method chạy nhiều lần với các bộ dữ liệu khác nhau — đúng bản chất của data-driven testing, tương tự @DataProvider trong TestNG.",
      "en": "@ParameterizedTest with data sources like @CsvSource, @MethodSource, @ValueSource lets a single test method run multiple times with different data sets — the essence of data-driven testing, analogous to TestNG's @DataProvider.",
      "ja": "@ParameterizedTestは@CsvSourceや@MethodSource、@ValueSourceなどのデータソースと組み合わせることで、1つのテストメソッドを異なるデータセットで複数回実行できる。これはデータ駆動テストの本質であり、TestNGの@DataProviderに相当する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi ứng dụng thay đổi UI thường xuyên (locator, layout đổi liên tục), yếu tố nào ảnh hưởng lớn nhất đến chi phí bảo trì của cả ba loại framework (data-driven, keyword-driven, hybrid)?",
      "en": "When an application's UI changes frequently (locators, layout constantly shifting), what factor most affects the maintenance cost across all three framework types (data-driven, keyword-driven, hybrid)?",
      "ja": "アプリケーションのUI(ロケータやレイアウト)が頻繁に変化する場合、3種類のフレームワーク(データ駆動、キーワード駆動、ハイブリッド)いずれにおいても保守コストに最も影響する要因は何か。"
    },
    "options": [
      {
        "vi": "Số lượng ngôn ngữ lập trình mà toàn đội biết nói",
        "en": "The number of spoken human languages the team knows",
        "ja": "チーム全員が話せる人間の言語の数"
      },
      {
        "vi": "Màu sắc giao diện của báo cáo test (report) sau khi chạy xong",
        "en": "The color scheme of the test report after execution",
        "ja": "テスト実行後のレポートの配色"
      },
      {
        "vi": "Mức độ tập trung hóa (centralize) các thao tác tương tác UI vào một lớp/module duy nhất, giúp chỉ cần sửa một nơi khi UI đổi",
        "en": "How well UI interaction actions are centralized into a single layer/module, so only one place needs fixing when the UI changes",
        "ja": "UI操作を単一の層/モジュールにどれだけ集約できているか。それによりUI変更時に1箇所を修正するだけで済む"
      },
      {
        "vi": "Tốc độ mạng internet của máy chủ CI/CD",
        "en": "The internet speed of the CI/CD server",
        "ja": "CI/CDサーバーのインターネット速度"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bất kể là kỹ thuật nào, nếu các thao tác tương tác trực tiếp với UI (locator, click, input) được tập trung vào một lớp duy nhất (page object, action library, keyword implementation) thì khi UI thay đổi chỉ cần cập nhật một chỗ — đây là yếu tố quyết định chi phí bảo trì, không phụ thuộc vào việc gọi framework là data-driven hay keyword-driven.",
      "en": "Regardless of technique, if direct UI interactions (locators, clicks, inputs) are centralized into a single layer (page object, action library, keyword implementation), a UI change requires updating only one place — this centralization is the decisive maintenance-cost factor, independent of whether the framework is labeled data-driven or keyword-driven.",
      "ja": "手法にかかわらず、UIとの直接的なやり取り(ロケータ、クリック、入力)が単一の層(ページオブジェクト、アクションライブラリ、キーワード実装)に集約されていれば、UI変更時は1箇所を更新するだけで済む。この集約度こそが保守コストを左右する決定的要因であり、フレームワークがデータ駆動と呼ばれるかキーワード駆動と呼ばれるかには依存しない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, cú pháp given().when().then() thể hiện phong cách thiết kế nào?",
      "en": "In RestAssured, the given().when().then() syntax reflects which design style?",
      "ja": "RestAssuredのgiven().when().then()構文はどのような設計スタイルを表していますか?"
    },
    "options": [
      {
        "vi": "Mô hình sự kiện bất đồng bộ",
        "en": "Asynchronous event-driven model",
        "ja": "非同期イベント駆動モデル"
      },
      {
        "vi": "Lập trình hướng đối tượng thuần túy",
        "en": "Pure object-oriented programming",
        "ja": "純粋なオブジェクト指向プログラミング"
      },
      {
        "vi": "Lập trình hàm không trạng thái",
        "en": "Stateless functional programming",
        "ja": "状態を持たない関数型プログラミング"
      },
      {
        "vi": "Behavior-Driven Development (BDD) với cú pháp Gherkin-like",
        "en": "Behavior-Driven Development (BDD) with a Gherkin-like syntax",
        "ja": "Gherkin風の記法によるビヘイビア駆動開発(BDD)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "given (điều kiện đầu vào), when (hành động gọi API), then (kiểm tra kết quả) mô phỏng cấu trúc Given-When-Then quen thuộc trong BDD, giúp test dễ đọc như đặc tả hành vi.",
      "en": "given (preconditions), when (action calling the API), then (verify result) mirrors the familiar Given-When-Then BDD structure, making tests read like behavior specifications.",
      "ja": "given(前提条件)、when(APIを呼び出す動作)、then(結果検証)はBDDでおなじみのGiven-When-Then構造を模しており、テストが振る舞い仕様のように読みやすくなります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi dùng RestAssured để kiểm tra response body JSON, phương thức nào thường dùng để trích xuất giá trị theo đường dẫn JsonPath?",
      "en": "When using RestAssured to check a JSON response body, which method is typically used to extract a value via a JsonPath expression?",
      "ja": "RestAssuredでJSONレスポンスボディを検証する際、JsonPath式で値を抽出するのに通常使われるメソッドはどれですか?"
    },
    "options": [
      {
        "vi": "response.path() hoặc response.jsonPath().get()",
        "en": "response.path() or response.jsonPath().get()",
        "ja": "response.path() または response.jsonPath().get()"
      },
      {
        "vi": "response.getHeader()",
        "en": "response.getHeader()",
        "ja": "response.getHeader()"
      },
      {
        "vi": "response.getStatusLine()",
        "en": "response.getStatusLine()",
        "ja": "response.getStatusLine()"
      },
      {
        "vi": "response.getCookies()",
        "en": "response.getCookies()",
        "ja": "response.getCookies()"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "path()/jsonPath().get() cho phép truy vấn giá trị bên trong JSON bằng cú pháp JsonPath, ví dụ lấy trường 'data.id' trong body trả về.",
      "en": "path()/jsonPath().get() allow querying values inside JSON using JsonPath syntax, e.g. retrieving the 'data.id' field from the response body.",
      "ja": "path()/jsonPath().get()はJsonPath構文でJSON内の値を照会でき、例えばレスポンスボディの'data.id'フィールドを取得できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Postman, biến môi trường (environment variable) thường dùng để làm gì khi test API trên nhiều môi trường (dev/staging/prod)?",
      "en": "In Postman, environment variables are typically used for what purpose when testing an API across multiple environments (dev/staging/prod)?",
      "ja": "Postmanで複数環境(dev/staging/prod)にわたってAPIをテストする際、環境変数は通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Mã hóa toàn bộ request body",
        "en": "Encrypt the entire request body",
        "ja": "リクエストボディ全体を暗号化する"
      },
      {
        "vi": "Lưu trữ giá trị thay đổi theo môi trường như base URL, token, để tái sử dụng collection mà không sửa từng request",
        "en": "Store values that change per environment, such as base URL or token, so the collection can be reused without editing each request",
        "ja": "ベースURLやトークンなど環境ごとに変わる値を保存し、各リクエストを編集せずコレクションを再利用できるようにする"
      },
      {
        "vi": "Tự động sinh test case ngẫu nhiên",
        "en": "Automatically generate random test cases",
        "ja": "ランダムなテストケースを自動生成する"
      },
      {
        "vi": "Thay thế hoàn toàn cho assertion trong tab Tests",
        "en": "Fully replace assertions in the Tests tab",
        "ja": "Testsタブのアサーションを完全に置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Environment variable tách cấu hình theo môi trường ra khỏi request, chỉ cần đổi environment đang active mà không phải sửa URL hay token trong từng request.",
      "en": "Environment variables separate per-environment configuration from requests, so switching the active environment avoids editing the URL or token in every request.",
      "ja": "環境変数は環境ごとの設定をリクエストから分離し、アクティブな環境を切り替えるだけで各リクエストのURLやトークンを編集する必要がなくなります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Newman là công cụ dùng để làm gì trong quy trình test API?",
      "en": "What is Newman used for in the API testing workflow?",
      "ja": "API テストワークフローにおいてNewmanは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Quản lý cơ sở dữ liệu quan hệ",
        "en": "Manage relational databases",
        "ja": "リレーショナルデータベースを管理する"
      },
      {
        "vi": "Thiết kế giao diện người dùng cho ứng dụng web",
        "en": "Design the user interface for a web application",
        "ja": "Webアプリケーションのユーザーインターフェースを設計する"
      },
      {
        "vi": "Chạy Postman collection từ command line, phù hợp tích hợp vào CI/CD",
        "en": "Run a Postman collection from the command line, suitable for CI/CD integration",
        "ja": "コマンドラインからPostmanコレクションを実行し、CI/CDへの統合に適したツール"
      },
      {
        "vi": "Ghi lại video thao tác kiểm thử thủ công",
        "en": "Record video of manual testing sessions",
        "ja": "手動テストのセッションを動画に記録する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Newman là CLI runner của Postman, cho phép chạy collection ngoài giao diện Postman, xuất báo cáo và dễ dàng nhúng vào pipeline CI/CD.",
      "en": "Newman is Postman's CLI runner, allowing collections to run outside the Postman UI, generate reports, and be easily embedded into CI/CD pipelines.",
      "ja": "NewmanはPostmanのCLIランナーで、Postman UIの外でコレクションを実行し、レポートを出力してCI/CDパイプラインに簡単に組み込めます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Postman Tests tab, đoạn script pm.test('Status code is 200', function () { pm.response.to.have.status(200); }) sử dụng thư viện assertion nào?",
      "en": "In the Postman Tests tab, the script pm.test('Status code is 200', function () { pm.response.to.have.status(200); }) uses which assertion library?",
      "ja": "PostmanのTestsタブにあるスクリプトpm.test('Status code is 200', function () { pm.response.to.have.status(200); })はどのアサーションライブラリを使用していますか?"
    },
    "options": [
      {
        "vi": "JUnit",
        "en": "JUnit",
        "ja": "JUnit"
      },
      {
        "vi": "Hamcrest",
        "en": "Hamcrest",
        "ja": "Hamcrest"
      },
      {
        "vi": "Mockito",
        "en": "Mockito",
        "ja": "Mockito"
      },
      {
        "vi": "Chai (thông qua cú pháp BDD-style của pm)",
        "en": "Chai (via pm's BDD-style syntax)",
        "ja": "Chai(pmのBDDスタイル構文経由)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Postman nhúng thư viện Chai.js để viết assertion theo cú pháp BDD như to.have.status, to.include, giúp test script đọc gần với ngôn ngữ tự nhiên.",
      "en": "Postman embeds the Chai.js library for writing BDD-style assertions like to.have.status and to.include, making test scripts read close to natural language.",
      "ja": "Postmanはto.have.statusやto.includeのようなBDDスタイルのアサーションを書くためにChai.jsライブラリを組み込んでおり、テストスクリプトが自然言語に近い形で読めます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi kiểm thử API trả về danh sách JSON array, cách nào phù hợp để assert rằng MỖI phần tử trong mảng đều có trường 'status' bằng 'active'?",
      "en": "When testing an API that returns a JSON array, what is an appropriate way to assert that EVERY element in the array has a 'status' field equal to 'active'?",
      "ja": "JSON配列を返すAPIをテストする際、配列内のすべての要素の'status'フィールドが'active'であることをアサートする適切な方法はどれですか?"
    },
    "options": [
      {
        "vi": "Dùng hasItems() với JsonPath collection matcher hoặc lặp qua toàn bộ phần tử để kiểm tra từng giá trị 'status'",
        "en": "Use hasItems() with a JsonPath collection matcher, or iterate over all elements to check each 'status' value",
        "ja": "hasItems()とJsonPathのコレクションマッチャーを使うか、全要素をループして各'status'値を確認する"
      },
      {
        "vi": "Chỉ kiểm tra phần tử đầu tiên trong mảng rồi suy ra cho toàn bộ",
        "en": "Only check the first element in the array and infer it applies to the rest",
        "ja": "配列の最初の要素だけを確認し、残り全体もそうだと推測する"
      },
      {
        "vi": "Chỉ kiểm tra status code HTTP là 200",
        "en": "Only check that the HTTP status code is 200",
        "ja": "HTTPステータスコードが200であることだけを確認する"
      },
      {
        "vi": "Bỏ qua vì mảng rỗng cũng được coi là hợp lệ",
        "en": "Skip it, since an empty array is also considered valid",
        "ja": "配列が空でも有効とみなし省略する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Để đảm bảo TẤT CẢ phần tử thỏa điều kiện, cần dùng matcher tác động lên toàn bộ collection (như everyItem trong Hamcrest/RestAssured) hoặc duyệt qua từng phần tử, thay vì chỉ kiểm tra một phần tử mẫu.",
      "en": "To ensure ALL elements satisfy the condition, use a matcher that operates on the whole collection (like everyItem in Hamcrest/RestAssured) or iterate through each element, rather than checking only a sample element.",
      "ja": "すべての要素が条件を満たすことを保証するには、コレクション全体に作用するマッチャー(Hamcrest/RestAssuredのeveryItemなど)を使うか、各要素をループして確認する必要があり、サンプル1件だけの確認では不十分です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình kiểm thử API, tại sao nên tách riêng bước xác thực schema (JSON Schema Validation) khỏi việc assert giá trị dữ liệu cụ thể?",
      "en": "In an API testing workflow, why should JSON Schema validation be separated from asserting specific data values?",
      "ja": "APIテストのワークフローにおいて、JSONスキーマ検証を具体的なデータ値のアサーションから分離すべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì schema validation chạy chậm hơn nên phải tách để tăng tốc độ CI",
        "en": "Because schema validation runs slower, so it must be separated to speed up CI",
        "ja": "スキーマ検証は実行が遅いため、CIを高速化するために分離する必要がある"
      },
      {
        "vi": "Schema validation kiểm tra cấu trúc/kiểu dữ liệu ổn định qua thời gian, còn assert giá trị kiểm tra logic nghiệp vụ cụ thể — gộp chung khiến lỗi khó chẩn đoán và test dễ vỡ khi dữ liệu mẫu thay đổi",
        "en": "Schema validation checks structure/data types that stay stable over time, while value assertions check specific business logic — mixing them makes failures hard to diagnose and tests brittle when sample data changes",
        "ja": "スキーマ検証は時間が経っても安定する構造・データ型を確認するのに対し、値のアサーションは特定の業務ロジックを確認するものであり、両者を混在させると失敗の診断が難しくなり、サンプルデータが変わるとテストが壊れやすくなる"
      },
      {
        "vi": "Vì Postman không hỗ trợ JSON Schema Validation",
        "en": "Because Postman does not support JSON Schema validation",
        "ja": "PostmanはJSONスキーマ検証をサポートしていないため"
      },
      {
        "vi": "Vì RestAssured yêu cầu bắt buộc phải viết hai file test riêng biệt",
        "en": "Because RestAssured mandates writing two separate test files",
        "ja": "RestAssuredでは2つの別々のテストファイルを書くことが必須のため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Schema validation đảm bảo hợp đồng API (kiểu, trường bắt buộc) không đổi, còn assert giá trị xác nhận logic nghiệp vụ theo dữ liệu cụ thể; tách riêng giúp báo lỗi rõ ràng: lỗi hợp đồng hay lỗi dữ liệu/logic.",
      "en": "Schema validation ensures the API contract (types, required fields) stays intact, while value assertions confirm business logic against specific data; separating them yields clearer failure diagnosis: contract issue versus data/logic issue.",
      "ja": "スキーマ検証はAPIの契約(型、必須フィールド)が保たれていることを保証し、値のアサーションは特定データに対する業務ロジックを確認します。分離することで、契約の問題かデータ/ロジックの問題かを明確に切り分けられます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi API yêu cầu xác thực bằng OAuth2 Bearer Token, trong RestAssured nên thiết lập token này ở đâu để tái sử dụng cho nhiều request?",
      "en": "When an API requires OAuth2 Bearer Token authentication, where should the token typically be set in RestAssured to be reused across multiple requests?",
      "ja": "APIがOAuth2 Bearerトークン認証を要求する場合、RestAssuredでは複数のリクエストで再利用するためにこのトークンをどこに設定すべきですか?"
    },
    "options": [
      {
        "vi": "Gán cứng token trực tiếp vào từng file test riêng lẻ",
        "en": "Hardcode the token directly into each individual test file",
        "ja": "各テストファイルにトークンを直接ハードコードする"
      },
      {
        "vi": "Lưu token trong file HTML báo cáo test",
        "en": "Store the token inside the test HTML report file",
        "ja": "テストのHTMLレポートファイルにトークンを保存する"
      },
      {
        "vi": "Cấu hình RequestSpecification dùng chung (ví dụ RestAssured.requestSpecification) có header Authorization, khởi tạo một lần trong @BeforeClass/@BeforeAll",
        "en": "Configure a shared RequestSpecification (e.g. RestAssured.requestSpecification) with the Authorization header, initialized once in @BeforeClass/@BeforeAll",
        "ja": "Authorizationヘッダーを持つ共有のRequestSpecification(例:RestAssured.requestSpecification)を@BeforeClass/@BeforeAllで一度だけ初期化して設定する"
      },
      {
        "vi": "Không cần thiết lập vì RestAssured tự động lấy token từ trình duyệt",
        "en": "No setup needed, since RestAssured automatically fetches the token from the browser",
        "ja": "RestAssuredはブラウザから自動的にトークンを取得するため設定は不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Dùng RequestSpecification dùng chung giúp cấu hình header xác thực một lần, tránh lặp code, dễ bảo trì khi token hoặc endpoint xác thực thay đổi.",
      "en": "Using a shared RequestSpecification configures the auth header once, avoiding duplicated code and making maintenance easier when the token or auth endpoint changes.",
      "ja": "共有のRequestSpecificationを使うことで認証ヘッダーを一度だけ設定でき、コードの重複を避け、トークンや認証エンドポイントが変わった際の保守が容易になります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Postman, script nào được thực thi TRƯỚC KHI request được gửi đi?",
      "en": "In Postman, which script is executed BEFORE the request is sent?",
      "ja": "Postmanでは、リクエストが送信される前に実行されるスクリプトはどれですか?"
    },
    "options": [
      {
        "vi": "Tests script",
        "en": "Tests script",
        "ja": "Testsスクリプト"
      },
      {
        "vi": "Response Visualizer",
        "en": "Response Visualizer",
        "ja": "Response Visualizer"
      },
      {
        "vi": "Collection Runner Report",
        "en": "Collection Runner Report",
        "ja": "Collection Runner Report"
      },
      {
        "vi": "Pre-request Script",
        "en": "Pre-request Script",
        "ja": "Pre-request Script"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Pre-request Script chạy trước khi request được gửi, thường dùng để tạo dữ liệu động, ký request, hoặc set biến môi trường cần thiết trước đó.",
      "en": "The Pre-request Script runs before the request is sent, commonly used to generate dynamic data, sign the request, or set required environment variables beforehand.",
      "ja": "Pre-request Scriptはリクエスト送信前に実行され、動的データの生成、リクエストの署名、事前に必要な環境変数の設定などによく使われます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một API PATCH cập nhật một phần resource trả về mã 200 nhưng body rỗng. Chiến lược assertion hợp lý nhất là gì?",
      "en": "A PATCH API that partially updates a resource returns status 200 with an empty body. What is the most reasonable assertion strategy?",
      "ja": "リソースを部分更新するPATCH APIがステータス200で空のボディを返します。最も妥当なアサーション戦略は何ですか?"
    },
    "options": [
      {
        "vi": "Assert status code, đồng thời gọi thêm GET để xác nhận resource đã thực sự được cập nhật đúng giá trị mong đợi (kiểm tra hiệu ứng phụ)",
        "en": "Assert the status code and additionally call GET to confirm the resource was actually updated with the expected values (verify the side effect)",
        "ja": "ステータスコードをアサートし、さらにGETを呼び出してリソースが実際に期待通りの値に更新されたことを確認する(副作用の検証)"
      },
      {
        "vi": "Chỉ assert status code 200 vì body rỗng không có gì để kiểm tra",
        "en": "Only assert status code 200 since an empty body has nothing to check",
        "ja": "空のボディには確認するものがないため、ステータスコード200だけをアサートする"
      },
      {
        "vi": "Không cần assert gì vì mã 200 đã đủ chứng minh nghiệp vụ đúng",
        "en": "No assertion is needed at all, since status 200 already proves the business logic is correct",
        "ja": "ステータス200だけで業務ロジックが正しいと十分に証明されるため、アサーションは不要"
      },
      {
        "vi": "Assert độ trễ (response time) là đủ để xác nhận cập nhật thành công",
        "en": "Asserting response time alone is enough to confirm the update succeeded",
        "ja": "レスポンスタイムをアサートするだけで更新成功を確認するのに十分"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Status code chỉ xác nhận request được xử lý, không đảm bảo dữ liệu được cập nhật đúng; cần thêm bước xác minh trạng thái thực tế (ví dụ GET lại resource) để đảm bảo hiệu ứng phụ đúng như mong đợi.",
      "en": "The status code only confirms the request was processed, not that data was correctly updated; an additional verification step (e.g. re-fetching the resource via GET) is needed to ensure the side effect matches expectations.",
      "ja": "ステータスコードはリクエストが処理されたことを示すだけで、データが正しく更新されたことは保証しません。期待通りの副作用であることを確認するには、追加の検証ステップ(例:GETでリソースを再取得する)が必要です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, việc dùng RequestSpecBuilder và ResponseSpecBuilder mang lại lợi ích chính nào?",
      "en": "In RestAssured, what is the main benefit of using RequestSpecBuilder and ResponseSpecBuilder?",
      "ja": "RestAssuredでRequestSpecBuilderとResponseSpecBuilderを使う主な利点は何ですか?"
    },
    "options": [
      {
        "vi": "Tự động tạo dữ liệu test ngẫu nhiên",
        "en": "Automatically generate random test data",
        "ja": "ランダムなテストデータを自動生成する"
      },
      {
        "vi": "Tái sử dụng cấu hình request/response chung (base URI, header, assertion mặc định) qua nhiều test case, giảm lặp code",
        "en": "Reuse common request/response configuration (base URI, headers, default assertions) across many test cases, reducing code duplication",
        "ja": "複数のテストケースにわたって共通のリクエスト/レスポンス設定(ベースURI、ヘッダー、デフォルトのアサーション)を再利用し、コードの重複を減らす"
      },
      {
        "vi": "Thay thế hoàn toàn cho công cụ mock server",
        "en": "Fully replace the need for a mock server tool",
        "ja": "モックサーバーツールを完全に置き換える"
      },
      {
        "vi": "Ký số cho request tự động theo chuẩn JWT",
        "en": "Automatically digitally sign requests according to the JWT standard",
        "ja": "JWT標準に従ってリクエストを自動的にデジタル署名する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Builder pattern giúp đóng gói cấu hình request/response dùng chung (base URI, content-type, status code kỳ vọng...) thành spec tái sử dụng, giảm code trùng lặp giữa các test.",
      "en": "The builder pattern packages shared request/response configuration (base URI, content-type, expected status code, etc.) into reusable specs, reducing duplicated code across tests.",
      "ja": "ビルダーパターンは共通のリクエスト/レスポンス設定(ベースURI、コンテンツタイプ、期待するステータスコードなど)を再利用可能なspecにまとめ、テスト間のコード重複を減らします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi test API có phân trang (pagination), điều nào KHÔNG nên bỏ qua trong bộ test tự động?",
      "en": "When testing a paginated API, what should NOT be skipped in the automated test suite?",
      "ja": "ページネーションのあるAPIをテストする際、自動テストスイートで省略すべきでないことは何ですか?"
    },
    "options": [
      {
        "vi": "Bỏ qua test phân trang nếu API đã có schema validation",
        "en": "Skipping pagination tests entirely if the API already has schema validation",
        "ja": "APIにすでにスキーマ検証があればページネーションのテストは省略してよい"
      },
      {
        "vi": "Chỉ cần test trang đầu tiên vì các trang sau có cấu trúc giống hệt",
        "en": "Only testing the first page, since later pages have the identical structure",
        "ja": "後続のページも同じ構造なので最初のページだけをテストすれば十分"
      },
      {
        "vi": "Kiểm tra trang cuối cùng, trang không tồn tại, và tham số page/size không hợp lệ (biên và ngoại lệ)",
        "en": "Checking the last page, a non-existent page, and invalid page/size parameters (boundary and edge cases)",
        "ja": "最終ページ、存在しないページ、不正なpage/sizeパラメータ(境界値と例外ケース)の確認"
      },
      {
        "vi": "Chỉ kiểm tra tốc độ phản hồi của trang đầu tiên",
        "en": "Only checking the response time of the first page",
        "ja": "最初のページのレスポンス速度だけを確認すればよい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Lỗi phân trang thường xảy ra ở biên (trang cuối, trang rỗng) và tham số bất thường (page âm, size quá lớn); test phải bao phủ các trường hợp này chứ không chỉ trang đầu 'điển hình'.",
      "en": "Pagination bugs commonly occur at boundaries (last page, empty page) and with abnormal parameters (negative page, oversized page size); tests must cover these cases, not just the 'typical' first page.",
      "ja": "ページネーションのバグは境界(最終ページ、空のページ)や異常なパラメータ(負のページ番号、過大なサイズ)でよく発生するため、テストは'典型的な'最初のページだけでなくこれらのケースをカバーする必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Postman Collection Runner, tính năng nào cho phép chạy cùng một request nhiều lần với các bộ dữ liệu khác nhau từ file CSV/JSON?",
      "en": "In the Postman Collection Runner, which feature allows the same request to run multiple times with different data sets from a CSV/JSON file?",
      "ja": "PostmanのCollection Runnerで、同じリクエストをCSV/JSONファイルからの異なるデータセットで複数回実行できる機能はどれですか?"
    },
    "options": [
      {
        "vi": "Monitor lịch chạy định kỳ",
        "en": "Scheduled Monitor",
        "ja": "スケジュールされたMonitor"
      },
      {
        "vi": "Mock Server",
        "en": "Mock Server",
        "ja": "Mock Server"
      },
      {
        "vi": "API Documentation Generator",
        "en": "API Documentation Generator",
        "ja": "API Documentation Generator"
      },
      {
        "vi": "Data-driven testing bằng cách nạp file dữ liệu (Data File)",
        "en": "Data-driven testing by loading a data file",
        "ja": "データファイルを読み込むデータ駆動テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Collection Runner hỗ trợ nạp file CSV/JSON làm nguồn dữ liệu, lặp request cho từng dòng dữ liệu — đây chính là data-driven testing trong Postman.",
      "en": "The Collection Runner supports loading a CSV/JSON file as a data source, iterating the request for each row — this is data-driven testing in Postman.",
      "ja": "Collection RunnerはCSV/JSONファイルをデータソースとして読み込み、各行についてリクエストを繰り返すことができます。これがPostmanにおけるデータ駆動テストです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi kiểm thử API trả về thời gian theo định dạng ISO 8601 (ví dụ createdAt), cách assert nào tốt hơn so với so khớp chuỗi cứng?",
      "en": "When testing an API that returns a timestamp in ISO 8601 format (e.g. createdAt), which assertion approach is better than a hardcoded string match?",
      "ja": "ISO 8601形式のタイムスタンプ(例:createdAt)を返すAPIをテストする際、ハードコードされた文字列との一致確認より優れたアサーション方法はどれですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra định dạng đúng chuẩn ISO 8601 (regex/parse thành công) và nằm trong khoảng thời gian hợp lý (ví dụ gần thời điểm hiện tại)",
        "en": "Verify the value matches the ISO 8601 format (regex/successful parsing) and falls within a reasonable time window (e.g. close to the current time)",
        "ja": "値がISO 8601形式に一致すること(正規表現/パース成功)と、妥当な時間範囲内(例:現在時刻に近い)にあることを確認する"
      },
      {
        "vi": "So sánh chuỗi createdAt với giá trị cố định ghi sẵn từ lần chạy trước",
        "en": "Compare the createdAt string against a fixed value recorded from a previous run",
        "ja": "createdAtの文字列を前回実行時に記録した固定値と比較する"
      },
      {
        "vi": "Bỏ qua trường thời gian vì không thể kiểm thử được",
        "en": "Skip the timestamp field entirely since it cannot be tested",
        "ja": "タイムスタンプフィールドはテスト不可能なので省略する"
      },
      {
        "vi": "Chỉ kiểm tra trường createdAt có tồn tại mà không quan tâm giá trị",
        "en": "Only check that the createdAt field exists, without caring about its value",
        "ja": "createdAtフィールドが存在することだけを確認し、値は気にしない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Giá trị thời gian động không thể so khớp cứng; nên kiểm tra định dạng hợp lệ và tính hợp lý về mặt thời gian (ví dụ không ở tương lai xa, gần thời điểm test chạy) để test ổn định.",
      "en": "Dynamic timestamps cannot be hardcoded-matched; instead verify the format is valid and the value is reasonable in time (e.g. not far in the future, close to when the test ran) for a stable test.",
      "ja": "動的なタイムスタンプはハードコードされた値と一致させることはできません。テストを安定させるには、形式が正しいことと、時間的に妥当であること(例:遠い未来ではなく、テスト実行時刻に近いこと)を確認すべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi viết test API xác thực (login), nên tránh điều gì để không làm lộ thông tin nhạy cảm trong báo cáo test (test report) công khai?",
      "en": "When writing authentication (login) API tests, what should be avoided to prevent leaking sensitive information in a public test report?",
      "ja": "認証(ログイン)APIのテストを書く際、公開されるテストレポートに機密情報が漏洩しないよう避けるべきことは何ですか?"
    },
    "options": [
      {
        "vi": "Sử dụng biến môi trường cho thông tin đăng nhập",
        "en": "Using environment variables for credentials",
        "ja": "認証情報に環境変数を使用する"
      },
      {
        "vi": "Log toàn bộ request/response bao gồm mật khẩu và token dạng plain text vào báo cáo mà không che (mask)",
        "en": "Logging the full request/response including plaintext passwords and tokens into the report without masking",
        "ja": "パスワードやトークンを含むリクエスト/レスポンス全体をマスクせずプレーンテキストのままレポートに記録する"
      },
      {
        "vi": "Chạy test trên môi trường staging thay vì production",
        "en": "Running tests against the staging environment instead of production",
        "ja": "本番環境ではなくステージング環境でテストを実行する"
      },
      {
        "vi": "Xóa token sau khi test kết thúc",
        "en": "Revoking the token after the test finishes",
        "ja": "テスト終了後にトークンを無効化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Log log request/response chứa mật khẩu/token dạng rõ vào báo cáo có thể bị rò rỉ nếu report được chia sẻ; cần che (mask) hoặc loại bỏ các trường nhạy cảm trước khi ghi log.",
      "en": "Logging requests/responses with plaintext passwords/tokens into reports risks exposure if the report is shared; sensitive fields must be masked or excluded before logging.",
      "ja": "パスワードやトークンを平文のままレポートに記録すると、レポートが共有された際に情報漏洩のリスクがあります。ログ記録前に機密フィールドをマスクするか除外する必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, phương thức extract().response() thường dùng để làm gì?",
      "en": "In RestAssured, what is the extract().response() method typically used for?",
      "ja": "RestAssuredのextract().response()メソッドは通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Xóa response khỏi bộ nhớ để tiết kiệm RAM",
        "en": "Remove the response from memory to save RAM",
        "ja": "メモリを節約するためにレスポンスをメモリから削除する"
      },
      {
        "vi": "Tự động tạo báo cáo Allure",
        "en": "Automatically generate an Allure report",
        "ja": "Allureレポートを自動生成する"
      },
      {
        "vi": "Lấy đối tượng Response để xử lý thêm sau assertion, ví dụ trích giá trị dùng cho request tiếp theo (chaining request)",
        "en": "Retrieve the Response object for further processing after assertions, e.g. extracting a value to use in a subsequent request (request chaining)",
        "ja": "アサーション後にさらに処理するためResponseオブジェクトを取得すること。例えば次のリクエストで使う値を抽出する(リクエストチェーン)"
      },
      {
        "vi": "Chuyển đổi request từ GET sang POST",
        "en": "Convert the request from GET to POST",
        "ja": "リクエストをGETからPOSTに変換する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "extract().response() lấy đối tượng Response để thao tác thêm ngoài chuỗi given-when-then, thường dùng để lấy id/token trả về và truyền cho request kế tiếp trong kịch bản end-to-end.",
      "en": "extract().response() retrieves the Response object for further manipulation outside the given-when-then chain, commonly used to grab a returned id/token and pass it into the next request in an end-to-end scenario.",
      "ja": "extract().response()はgiven-when-thenチェーンの外でさらに操作するためにResponseオブジェクトを取得します。エンドツーエンドのシナリオで返却されたidやトークンを取得し、次のリクエストに渡す際によく使われます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một API trả về mã lỗi 429 (Too Many Requests) khi vượt rate limit. Test tự động nên xử lý tình huống này như thế nào?",
      "en": "An API returns error code 429 (Too Many Requests) when the rate limit is exceeded. How should automated tests handle this situation?",
      "ja": "レート制限を超えるとAPIがエラーコード429(Too Many Requests)を返します。自動テストはこの状況をどう扱うべきですか?"
    },
    "options": [
      {
        "vi": "Coi 429 là lỗi hệ thống nghiêm trọng và cho toàn bộ suite fail ngay lập tức",
        "en": "Treat 429 as a critical system failure and fail the entire suite immediately",
        "ja": "429を重大なシステム障害とみなし、直ちにスイート全体を失敗させる"
      },
      {
        "vi": "Luôn retry vô hạn cho đến khi request thành công mà không giới hạn số lần",
        "en": "Always retry indefinitely until the request succeeds, with no retry limit",
        "ja": "リクエストが成功するまで回数制限なく無限にリトライし続ける"
      },
      {
        "vi": "Bỏ qua hoàn toàn việc test rate limit vì không liên quan đến chức năng",
        "en": "Completely ignore rate limit testing since it is unrelated to functionality",
        "ja": "機能とは無関係なのでレート制限のテストは完全に無視する"
      },
      {
        "vi": "Có kịch bản test riêng để cố ý gửi vượt rate limit và assert đúng mã 429 cùng header Retry-After, đồng thời tách biệt với test luồng chức năng bình thường",
        "en": "Have a dedicated test scenario that intentionally exceeds the rate limit and asserts the correct 429 code plus a Retry-After header, kept separate from normal functional flow tests",
        "ja": "意図的にレート制限を超えて429コードとRetry-Afterヘッダーを正しくアサートする専用のテストシナリオを用意し、通常の機能フローのテストとは分離しておく"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Rate limiting là hành vi thiết kế có chủ đích, nên cần test riêng xác nhận API trả đúng 429 và header hướng dẫn retry, tách khỏi test chức năng để tránh nhiễu kết quả do bị giới hạn ngoài ý muốn.",
      "en": "Rate limiting is intentional design behavior, so it deserves a dedicated test confirming the API correctly returns 429 with retry guidance headers, kept separate from functional tests to avoid unintended limiting polluting results.",
      "ja": "レート制限は意図的な設計上の挙動であるため、APIが正しく429とリトライ案内のヘッダーを返すことを確認する専用テストを用意すべきです。意図しない制限が結果を汚染しないよう機能テストとは分離します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, khi cần gửi request với nhiều query parameter động, cách viết nào rõ ràng và dễ bảo trì nhất?",
      "en": "In RestAssured, when sending a request with multiple dynamic query parameters, which approach is clearest and most maintainable?",
      "ja": "RestAssuredで複数の動的なクエリパラメータを送信する際、最も明確で保守しやすい書き方はどれですか?"
    },
    "options": [
      {
        "vi": "Dùng .queryParam(key, value) hoặc .queryParams(Map) để RestAssured tự xử lý encode và ghép URL",
        "en": "Use .queryParam(key, value) or .queryParams(Map) so RestAssured handles encoding and URL assembly automatically",
        "ja": ".queryParam(key, value) または .queryParams(Map) を使い、エンコードとURL組み立てをRestAssuredに任せる"
      },
      {
        "vi": "Nối trực tiếp chuỗi query string vào URL bằng cách cộng chuỗi thủ công",
        "en": "Manually concatenate the query string directly into the URL using string addition",
        "ja": "文字列を手動で連結してクエリ文字列をURLに直接追加する"
      },
      {
        "vi": "Ghi toàn bộ query param vào file cấu hình pom.xml",
        "en": "Write all query parameters into the pom.xml configuration file",
        "ja": "すべてのクエリパラメータをpom.xml設定ファイルに書く"
      },
      {
        "vi": "Chuyển toàn bộ query param thành header tùy chỉnh",
        "en": "Convert all query parameters into custom headers",
        "ja": "すべてのクエリパラメータをカスタムヘッダーに変換する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "queryParam/queryParams giúp RestAssured tự động encode giá trị và ghép đúng cú pháp URL, tránh lỗi thủ công khi nối chuỗi và giúp code test dễ đọc, dễ bảo trì hơn.",
      "en": "queryParam/queryParams let RestAssured automatically encode values and correctly assemble the URL syntax, avoiding manual string-concatenation errors and making test code more readable and maintainable.",
      "ja": "queryParam/queryParamsを使うことでRestAssuredが値を自動的にエンコードし、URLの構文を正しく組み立ててくれるため、手動での文字列連結によるミスを避け、テストコードがより読みやすく保守しやすくなります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì KHÔNG nên làm khi thiết kế bộ test API tự động chạy trong pipeline CI/CD?",
      "en": "What should NOT be done when designing an automated API test suite that runs in a CI/CD pipeline?",
      "ja": "CI/CDパイプラインで実行される自動APIテストスイートを設計する際、してはいけないことは何ですか?"
    },
    "options": [
      {
        "vi": "Chạy test song song để giảm thời gian pipeline",
        "en": "Run tests in parallel to reduce pipeline duration",
        "ja": "パイプライン時間を短縮するためテストを並列実行する"
      },
      {
        "vi": "Để các test case phụ thuộc chặt vào thứ tự chạy và trạng thái dữ liệu do test trước để lại, khiến test dễ fail khi chạy độc lập hoặc song song",
        "en": "Make test cases tightly dependent on execution order and data state left behind by earlier tests, causing failures when run independently or in parallel",
        "ja": "テストケースを実行順序や前のテストが残したデータ状態に強く依存させ、単独実行や並列実行時に失敗しやすくする"
      },
      {
        "vi": "Tách riêng cấu hình theo môi trường bằng biến CI/CD",
        "en": "Separate environment-specific configuration using CI/CD variables",
        "ja": "CI/CD変数を使って環境ごとの設定を分離する"
      },
      {
        "vi": "Sinh báo cáo test (report) sau mỗi lần chạy",
        "en": "Generate a test report after each run",
        "ja": "実行のたびにテストレポートを生成する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test phụ thuộc thứ tự và dữ liệu để lại từ test khác là anti-pattern, gây flaky khi chạy song song/độc lập trong CI; mỗi test nên tự thiết lập và dọn dẹp dữ liệu riêng (test isolation).",
      "en": "Tests that depend on execution order and leftover data from other tests are an anti-pattern, causing flakiness when run in parallel or independently in CI; each test should set up and clean up its own data (test isolation).",
      "ja": "実行順序や他のテストが残したデータに依存するテストはアンチパターンであり、CIで並列/独立実行した際にflakyになる原因です。各テストは自身のデータをセットアップ・クリーンアップすべきです(テストの独立性)。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi test API POST tạo resource mới, ngoài kiểm tra status code 201, còn nên assert thêm điều gì để đảm bảo REST convention?",
      "en": "When testing a POST API that creates a new resource, besides checking status code 201, what else should be asserted to ensure REST convention compliance?",
      "ja": "新しいリソースを作成するPOST APIをテストする際、ステータスコード201の確認以外にREST規約への準拠を確認するために何をアサートすべきですか?"
    },
    "options": [
      {
        "vi": "Thời gian uptime của server",
        "en": "The server's uptime",
        "ja": "サーバーの稼働時間(アップタイム)"
      },
      {
        "vi": "Header User-Agent của client gửi request",
        "en": "The User-Agent header of the client that sent the request",
        "ja": "リクエストを送信したクライアントのUser-Agentヘッダー"
      },
      {
        "vi": "Header Location trỏ đến URI của resource vừa được tạo",
        "en": "That the Location header points to the URI of the newly created resource",
        "ja": "作成されたリソースのURIを指すLocationヘッダー"
      },
      {
        "vi": "Số lượng cookie được thiết lập",
        "en": "The number of cookies set",
        "ja": "設定されたクッキーの数"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Theo REST convention, response 201 Created nên kèm header Location trỏ đến resource mới tạo; assert điều này giúp phát hiện API không tuân thủ chuẩn RESTful đầy đủ.",
      "en": "Per REST convention, a 201 Created response should include a Location header pointing to the newly created resource; asserting this helps catch APIs that don't fully follow RESTful conventions.",
      "ja": "REST規約では、201 Createdレスポンスには作成されたリソースを指すLocationヘッダーが含まれるべきです。これをアサートすることで、RESTfulな規約に完全に準拠していないAPIを検出できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Newman, tham số dòng lệnh nào thường dùng để xuất báo cáo HTML sau khi chạy collection?",
      "en": "In Newman, which command-line option is typically used to export an HTML report after running a collection?",
      "ja": "Newmanでコレクション実行後にHTMLレポートを出力するために通常使われるコマンドラインオプションはどれですか?"
    },
    "options": [
      {
        "vi": "--generate-mock",
        "en": "--generate-mock",
        "ja": "--generate-mock"
      },
      {
        "vi": "--convert-to-pdf",
        "en": "--convert-to-pdf",
        "ja": "--convert-to-pdf"
      },
      {
        "vi": "--export-video",
        "en": "--export-video",
        "ja": "--export-video"
      },
      {
        "vi": "--reporters html (kết hợp reporter htmlextra/html qua plugin)",
        "en": "--reporters html (combined with an html/htmlextra reporter plugin)",
        "ja": "--reporters html(html/htmlextraレポータープラグインと組み合わせる)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Newman hỗ trợ reporter, trong đó reporter html hoặc plugin newman-reporter-htmlextra giúp xuất báo cáo HTML trực quan sau khi chạy collection từ CLI.",
      "en": "Newman supports reporters, where the html reporter or the newman-reporter-htmlextra plugin generates a visual HTML report after running the collection from the CLI.",
      "ja": "Newmanはレポーターをサポートしており、htmlレポーターやnewman-reporter-htmlextraプラグインを使うことで、CLIからコレクションを実行した後に視覚的なHTMLレポートを出力できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi assert response header 'Content-Type', tại sao nên kiểm tra dạng chứa (contains) 'application/json' thay vì so khớp tuyệt đối (equals) toàn bộ chuỗi header?",
      "en": "When asserting the 'Content-Type' response header, why should you check that it contains 'application/json' rather than doing an exact (equals) match of the whole header string?",
      "ja": "'Content-Type'レスポンスヘッダーをアサートする際、ヘッダー文字列全体を完全一致(equals)で確認するのではなく、'application/json'を含む(contains)ことを確認すべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì header Content-Type thường có thêm tham số như charset=UTF-8 phía sau, so khớp tuyệt đối dễ làm test fail sai dù dữ liệu thực chất đúng",
        "en": "Because the Content-Type header often has extra parameters like charset=UTF-8 appended, so an exact match can cause false test failures even when the data is actually correct",
        "ja": "Content-Typeヘッダーにはcharset=UTF-8のような追加パラメータが付くことが多く、完全一致だと実際にはデータが正しくてもテストが誤って失敗しやすいため"
      },
      {
        "vi": "Vì so khớp tuyệt đối không được RestAssured hỗ trợ",
        "en": "Because exact matching is not supported by RestAssured",
        "ja": "完全一致はRestAssuredでサポートされていないため"
      },
      {
        "vi": "Vì header Content-Type luôn thay đổi ngẫu nhiên giữa các lần gọi",
        "en": "Because the Content-Type header always changes randomly between calls",
        "ja": "Content-Typeヘッダーは呼び出しごとに常にランダムに変わるため"
      },
      {
        "vi": "Vì contains() chạy nhanh hơn equals() đáng kể",
        "en": "Because contains() runs significantly faster than equals()",
        "ja": "contains()はequals()よりも実行速度が大幅に速いため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nhiều server trả Content-Type kèm charset (application/json;charset=UTF-8), nếu so khớp tuyệt đối 'application/json' sẽ fail dù response thực tế hoàn toàn hợp lệ; dùng contains giúp test bền vững hơn.",
      "en": "Many servers return Content-Type with a charset suffix (application/json;charset=UTF-8); an exact match against 'application/json' would fail even though the response is perfectly valid, so using contains makes tests more robust.",
      "ja": "多くのサーバーはcharset付きのContent-Type(application/json;charset=UTF-8)を返すため、'application/json'との完全一致ではレスポンスが実際には有効でもテストが失敗します。containsを使うことでテストがより堅牢になります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong kiểm thử API, 'contract testing' (ví dụ dùng Pact) khác với việc chạy test tích hợp end-to-end như thế nào?",
      "en": "In API testing, how does 'contract testing' (e.g. using Pact) differ from running full end-to-end integration tests?",
      "ja": "APIテストにおいて、'コントラクトテスト'(例:Pactを使用)はエンドツーエンドの統合テストを実行することとどう違いますか?"
    },
    "options": [
      {
        "vi": "Contract testing luôn chậm hơn và tốn tài nguyên hơn end-to-end test",
        "en": "Contract testing is always slower and more resource-intensive than end-to-end testing",
        "ja": "コントラクトテストは常にエンドツーエンドテストより低速でリソースを多く消費する"
      },
      {
        "vi": "Contract testing xác minh thỏa thuận giao tiếp (request/response format) giữa consumer và provider độc lập, không cần dựng toàn bộ hệ thống thật để chạy",
        "en": "Contract testing verifies the agreed communication format (request/response) between consumer and provider independently, without needing to stand up the entire real system to run",
        "ja": "コントラクトテストはconsumerとproviderの間で合意された通信形式(リクエスト/レスポンス)を、実システム全体を構築しなくても独立して検証する"
      },
      {
        "vi": "Contract testing chỉ áp dụng được cho giao diện người dùng, không dùng cho API",
        "en": "Contract testing only applies to user interfaces, not APIs",
        "ja": "コントラクトテストはユーザーインターフェースにのみ適用でき、APIには使えない"
      },
      {
        "vi": "Contract testing và end-to-end test là một khái niệm giống hệt nhau, chỉ khác tên gọi",
        "en": "Contract testing and end-to-end testing are identical concepts, differing only in name",
        "ja": "コントラクトテストとエンドツーエンドテストは同一の概念であり、名称が違うだけ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Contract testing kiểm tra hai bên (consumer/provider) tuân thủ đúng hợp đồng giao tiếp đã thống nhất mà không cần triển khai toàn bộ hệ thống, giúp phát hiện sớm sai lệch tích hợp với chi phí thấp hơn end-to-end test đầy đủ.",
      "en": "Contract testing checks that both sides (consumer/provider) honor the agreed communication contract without deploying the full system, catching integration mismatches early at a lower cost than full end-to-end tests.",
      "ja": "コントラクトテストは、システム全体をデプロイすることなく、consumerとproviderの両者が合意した通信契約を守っているかを確認します。これにより、完全なエンドツーエンドテストよりも低コストで統合の不整合を早期に発見できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một API endpoint hỗ trợ cả hai định dạng phản hồi JSON và XML tùy theo header Accept, chiến lược test nào phù hợp?",
      "en": "When an API endpoint supports both JSON and XML response formats depending on the Accept header, what testing strategy is appropriate?",
      "ja": "APIエンドポイントがAcceptヘッダーに応じてJSONとXMLの両方のレスポンス形式をサポートしている場合、適切なテスト戦略は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ test định dạng JSON vì XML đã lỗi thời, không cần quan tâm",
        "en": "Only test the JSON format since XML is outdated and can be ignored",
        "ja": "XMLはもう古いので気にせず、JSON形式のみをテストすればよい"
      },
      {
        "vi": "Không cần gửi header Accept trong bất kỳ test nào vì server sẽ tự chọn định dạng",
        "en": "Never send the Accept header in any test since the server will choose the format automatically",
        "ja": "サーバーが自動的に形式を選ぶので、どのテストでもAcceptヘッダーを送る必要はない"
      },
      {
        "vi": "Viết test case riêng cho từng giá trị header Accept, xác nhận đúng định dạng và nội dung tương ứng được trả về cho mỗi trường hợp",
        "en": "Write separate test cases for each Accept header value, confirming the correct format and corresponding content is returned in each case",
        "ja": "Acceptヘッダーの各値に対して個別のテストケースを書き、それぞれの場合に正しい形式と対応する内容が返されることを確認する"
      },
      {
        "vi": "Chỉ kiểm tra status code, bỏ qua việc xác minh định dạng nội dung trả về",
        "en": "Only check the status code and skip verifying the format of the returned content",
        "ja": "ステータスコードだけを確認し、返される内容の形式検証は省略する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Content negotiation là hành vi cần được kiểm chứng rõ ràng cho từng giá trị Accept khả dĩ, đảm bảo API trả đúng định dạng và cấu trúc dữ liệu tương ứng, tránh phát hiện thiếu sót khi client thực tế dùng định dạng ít phổ biến hơn.",
      "en": "Content negotiation is behavior that must be explicitly verified for each possible Accept value, ensuring the API returns the correct format and corresponding data structure, avoiding gaps discovered only when a real client uses a less common format.",
      "ja": "コンテントネゴシエーションは、可能な各Accept値について明示的に検証すべき挙動です。APIが正しい形式と対応するデータ構造を返すことを保証し、実際のクライアントがあまり一般的でない形式を使った際に不備が発覚するのを防ぎます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, khi test API yêu cầu gửi file (multipart/form-data), phương thức nào thường được dùng?",
      "en": "In RestAssured, when testing an API that requires uploading a file (multipart/form-data), which method is typically used?",
      "ja": "RestAssuredでファイルアップロード(multipart/form-data)を要求するAPIをテストする際、通常使われるメソッドはどれですか?"
    },
    "options": [
      {
        "vi": ".body(byte[]) kèm header Content-Type text/plain",
        "en": ".body(byte[]) combined with a text/plain Content-Type header",
        "ja": ".body(byte[]) とtext/plain Content-Typeヘッダーの組み合わせ"
      },
      {
        "vi": ".cookie(\"file\", fileContent)",
        "en": ".cookie(\"file\", fileContent)",
        "ja": ".cookie(\"file\", fileContent)"
      },
      {
        "vi": ".queryParam(\"file\", filePath)",
        "en": ".queryParam(\"file\", filePath)",
        "ja": ".queryParam(\"file\", filePath)"
      },
      {
        "vi": ".multiPart(\"file\", fileObject) để gửi phần file trong request multipart",
        "en": ".multiPart(\"file\", fileObject) to send the file part in a multipart request",
        "ja": ".multiPart(\"file\", fileObject) を使い、マルチパートリクエストでファイル部分を送信する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "RestAssured cung cấp phương thức multiPart() để đính kèm file cùng các trường form khác trong request dạng multipart/form-data, đúng chuẩn upload file qua API.",
      "en": "RestAssured provides the multiPart() method to attach a file along with other form fields in a multipart/form-data request, matching the standard way to upload files via an API.",
      "ja": "RestAssuredはmultiPart()メソッドを提供しており、multipart/form-dataリクエストで他のフォームフィールドと共にファイルを添付でき、APIを介したファイルアップロードの標準的な方法に対応します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh giữa việc test API bằng Postman/Newman và bằng RestAssured (Java), điểm khác biệt lớn nhất thường được nhắc đến là gì?",
      "en": "When comparing API testing with Postman/Newman versus RestAssured (Java), what is the most commonly cited key difference?",
      "ja": "Postman/NewmanによるAPIテストとRestAssured(Java)によるAPIテストを比較する際、最もよく挙げられる主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Postman/Newman thân thiện, dễ tiếp cận với người không chuyên code (JavaScript đơn giản, giao diện trực quan); RestAssured mạnh về khả năng tích hợp sâu vào codebase Java, dễ tái sử dụng logic phức tạp và tích hợp CI/CD dạng code",
        "en": "Postman/Newman is beginner-friendly and approachable for non-heavy coders (simple JavaScript, visual UI); RestAssured excels at deep integration into a Java codebase, reusing complex logic and code-based CI/CD integration",
        "ja": "Postman/Newmanは初心者に優しく、コーディング経験が浅い人にも扱いやすい(シンプルなJavaScript、視覚的なUI)。一方RestAssuredはJavaコードベースへの深い統合に強く、複雑なロジックの再利用やコードベースのCI/CD統合がしやすい"
      },
      {
        "vi": "Postman/Newman không thể chạy trong CI/CD, chỉ RestAssured mới chạy được",
        "en": "Postman/Newman cannot run in CI/CD; only RestAssured can",
        "ja": "Postman/NewmanはCI/CDで実行できず、RestAssuredのみ実行可能"
      },
      {
        "vi": "RestAssured chỉ dùng để test giao diện người dùng, không dùng cho API",
        "en": "RestAssured is only for testing user interfaces, not APIs",
        "ja": "RestAssuredはユーザーインターフェースのテスト専用であり、APIには使えない"
      },
      {
        "vi": "Cả hai công cụ đều không hỗ trợ assertion, phải viết thư viện riêng",
        "en": "Neither tool supports assertions; a custom library must be written for both",
        "ja": "どちらのツールもアサーションをサポートしておらず、独自ライブラリを書く必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Postman/Newman phù hợp khám phá nhanh và người ít kinh nghiệm code; RestAssured phù hợp đội ngũ dev/SDET muốn viết test như code Java thực thụ, tận dụng OOP, tái sử dụng, tích hợp sâu vào build pipeline.",
      "en": "Postman/Newman suits rapid exploration and those with less coding experience; RestAssured suits dev/SDET teams wanting to write tests as real Java code, leveraging OOP, reuse, and deep build pipeline integration.",
      "ja": "Postman/Newmanは迅速な探索やコーディング経験の少ない人に向いており、RestAssuredは本物のJavaコードとしてテストを書き、OOPや再利用性、ビルドパイプラインへの深い統合を活用したい開発者/SDETチームに向いています。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong RestAssured, sử dụng Hamcrest matcher equalTo() để so sánh số nguyên trả về từ JSON có thể gây lỗi kiểu dữ liệu nào phổ biến?",
      "en": "In RestAssured, using the Hamcrest matcher equalTo() to compare an integer value from JSON can commonly cause what type of data mismatch error?",
      "ja": "RestAssuredでHamcrestマッチャーのequalTo()を使ってJSONから返された整数値を比較すると、どのような型の不一致エラーがよく発生しますか?"
    },
    "options": [
      {
        "vi": "Lỗi kết nối mạng do timeout",
        "en": "A network connection error due to timeout",
        "ja": "タイムアウトによるネットワーク接続エラー"
      },
      {
        "vi": "Lỗi so sánh Integer với Long/Double do JsonPath tự suy luận kiểu số, cần dùng equalTo với kiểu tường minh hoặc chuyển đổi kiểu phù hợp",
        "en": "A mismatch comparing Integer with Long/Double, since JsonPath auto-infers numeric types; you need equalTo with an explicit type or an appropriate conversion",
        "ja": "JsonPathが数値型を自動推論するため、IntegerとLong/Doubleを比較する際の不一致エラーが起きやすく、明示的な型を指定したequalToや適切な型変換が必要"
      },
      {
        "vi": "Lỗi không tìm thấy endpoint (404)",
        "en": "An endpoint-not-found (404) error",
        "ja": "エンドポイントが見つからない(404)エラー"
      },
      {
        "vi": "Lỗi xác thực SSL certificate",
        "en": "An SSL certificate validation error",
        "ja": "SSL証明書検証エラー"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "JsonPath có thể trả số dạng Integer hoặc Long/Float/Double tùy giá trị, nếu equalTo() so sánh với kiểu literal không khớp (ví dụ equalTo(5) trong khi thực tế là Long) sẽ fail dù giá trị số giống nhau; cần ép kiểu hoặc dùng matcher phù hợp.",
      "en": "JsonPath may return numbers as Integer or Long/Float/Double depending on the value; if equalTo() compares against a mismatched literal type (e.g. equalTo(5) when the actual value is a Long) it fails even though the numeric value matches; casting or an appropriate matcher is needed.",
      "ja": "JsonPathは値によって数値をIntegerやLong/Float/Doubleとして返すことがあり、equalTo()が一致しないリテラル型(例:実際はLongなのにequalTo(5))と比較すると、数値としては一致していてもテストが失敗します。型変換や適切なマッチャーの使用が必要です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi thiết kế bộ test cho một API GraphQL bằng RestAssured, điểm cần lưu ý khác biệt so với REST thuần là gì?",
      "en": "When designing a test suite for a GraphQL API using RestAssured, what key difference from plain REST should be noted?",
      "ja": "RestAssuredでGraphQL APIのテストスイートを設計する際、通常のRESTとの違いとして注意すべき点は何ですか?"
    },
    "options": [
      {
        "vi": "GraphQL luôn dùng nhiều endpoint khác nhau cho mỗi loại truy vấn, giống hệt REST",
        "en": "GraphQL always uses many different endpoints for each type of query, exactly like REST",
        "ja": "GraphQLはクエリの種類ごとに多数の異なるエンドポイントを使用し、RESTとまったく同じである"
      },
      {
        "vi": "GraphQL không hỗ trợ gửi qua phương thức POST, chỉ dùng GET",
        "en": "GraphQL does not support POST and can only use GET",
        "ja": "GraphQLはPOSTをサポートせず、GETのみ使用できる"
      },
      {
        "vi": "GraphQL thường chỉ dùng một endpoint duy nhất (thường là POST /graphql) với body chứa query/mutation, nên status code HTTP thường vẫn 200 dù có lỗi nghiệp vụ — cần kiểm tra trường 'errors' trong body thay vì chỉ dựa vào status code",
        "en": "GraphQL typically uses a single endpoint (often POST /graphql) with the query/mutation in the body, so the HTTP status code often stays 200 even when there's a business-level error — the 'errors' field in the body must be checked instead of relying on status code alone",
        "ja": "GraphQLは通常、クエリ/ミューテーションをボディに含む単一のエンドポイント(多くはPOST /graphql)のみを使用するため、業務レベルのエラーがあってもHTTPステータスコードは200のままであることが多く、ステータスコードだけに頼らずボディ内の'errors'フィールドを確認する必要がある"
      },
      {
        "vi": "GraphQL yêu cầu bắt buộc phải test bằng Postman, không thể dùng RestAssured",
        "en": "GraphQL mandates testing exclusively with Postman and cannot be tested with RestAssured",
        "ja": "GraphQLは必ずPostmanでテストしなければならず、RestAssuredでは不可能"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "GraphQL thường trả về 200 OK ngay cả khi có lỗi logic bên trong (nằm ở mảng errors trong response body), khác với REST nơi lỗi thường phản ánh qua status code; test cần đọc kỹ nội dung body thay vì chỉ dựa vào status code.",
      "en": "GraphQL commonly returns 200 OK even with internal logic errors (surfaced in the response body's errors array), unlike REST where errors are usually reflected via the status code; tests must inspect the body content rather than relying solely on the status code.",
      "ja": "GraphQLは内部的なロジックエラーがあってもレスポンスボディのerrors配列にそれが現れる形で、200 OKを返すことが一般的です。これはエラーが通常ステータスコードに反映されるRESTとは異なります。テストではステータスコードのみに頼らず、ボディの内容を注意深く検証する必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình automation API, việc dùng WireMock hoặc mock server đóng vai trò gì khi test một service phụ thuộc vào API bên thứ ba chưa ổn định?",
      "en": "In an API automation workflow, what role does using WireMock or a mock server play when testing a service that depends on an unstable third-party API?",
      "ja": "API自動化のワークフローにおいて、不安定なサードパーティAPIに依存するサービスをテストする際、WireMockやモックサーバーを使うことはどのような役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Tự động sửa lỗi trong code nguồn của service đang test",
        "en": "Automatically fix bugs in the source code of the service under test",
        "ja": "テスト対象サービスのソースコード内のバグを自動的に修正する"
      },
      {
        "vi": "Thay thế hoàn toàn nhu cầu viết bất kỳ assertion nào",
        "en": "Completely eliminate the need to write any assertions",
        "ja": "アサーションを一切書く必要をなくす"
      },
      {
        "vi": "Tăng tốc độ mạng thực tế khi gọi API bên thứ ba",
        "en": "Speed up the actual network calls to the real third-party API",
        "ja": "実際のサードパーティAPI呼び出しのネットワーク速度を向上させる"
      },
      {
        "vi": "Giả lập response của API bên thứ ba với các kịch bản kiểm soát được (thành công, lỗi, timeout), giúp test ổn định và không phụ thuộc vào tính khả dụng thực tế của bên thứ ba",
        "en": "Simulate the third-party API's responses under controllable scenarios (success, error, timeout), keeping tests stable and independent of the third party's real availability",
        "ja": "サードパーティAPIのレスポンスを制御可能なシナリオ(成功、エラー、タイムアウト)でシミュレートし、実際のサードパーティの可用性に依存しない安定したテストを可能にする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mock server cho phép giả lập các phản hồi đa dạng (kể cả trường hợp lỗi/timeout khó tái hiện thực tế) từ dependency bên ngoài, giúp test độc lập, nhanh, ổn định, không bị ảnh hưởng bởi sự cố hoặc rate limit của bên thứ ba.",
      "en": "A mock server enables simulating diverse responses (including error/timeout cases hard to reproduce in reality) from an external dependency, keeping tests independent, fast, stable, and unaffected by third-party outages or rate limits.",
      "ja": "モックサーバーを使うことで、外部依存からの多様なレスポンス(実際には再現しにくいエラー/タイムアウトケースも含む)をシミュレートでき、テストが独立して高速かつ安定し、サードパーティの障害やレート制限の影響を受けなくなります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi review một test API tự động, phát hiện assertion duy nhất là response.statusCode() == 200 cho một API tạo đơn hàng phức tạp. Đây là dấu hiệu của vấn đề gì?",
      "en": "While reviewing an automated API test, you find the only assertion is response.statusCode() == 200 for a complex order-creation API. What issue does this signal?",
      "ja": "自動APIテストをレビューしていて、複雑な注文作成APIに対するアサーションがresponse.statusCode() == 200のみであることに気づきました。これは何の問題を示していますか?"
    },
    "options": [
      {
        "vi": "Assertion quá mỏng (shallow assertion) — không xác minh dữ liệu trả về, các trường quan trọng (id đơn hàng, tổng tiền, trạng thái), dễ bỏ sót lỗi nghiệp vụ dù request 'thành công' về mặt HTTP",
        "en": "This is a shallow assertion — it fails to verify the returned data or important fields (order id, total amount, status), so business logic bugs can slip through even when the request 'succeeds' at the HTTP level",
        "ja": "これは浅いアサーション(shallow assertion)であり、返却データや重要なフィールド(注文ID、合計金額、ステータス)を検証していないため、HTTPレベルでリクエストが'成功'していても業務ロジックのバグを見逃しやすい"
      },
      {
        "vi": "Test đã đủ tốt vì status code 200 là bằng chứng đủ mạnh cho mọi API",
        "en": "The test is already sufficient because a 200 status code is strong enough proof for any API",
        "ja": "200ステータスコードはどんなAPIにとっても十分強力な証拠であり、このテストはすでに十分良い"
      },
      {
        "vi": "Nên xóa luôn assertion status code vì không cần thiết",
        "en": "The status code assertion should be removed entirely since it's unnecessary",
        "ja": "ステータスコードのアサーションは不要なので削除すべきである"
      },
      {
        "vi": "Vấn đề duy nhất là tên biến response chưa đúng chuẩn đặt tên",
        "en": "The only issue is that the variable name 'response' does not follow naming conventions",
        "ja": "唯一の問題は変数名'response'が命名規則に従っていないことである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Chỉ kiểm tra status code là assertion nông, không đảm bảo logic nghiệp vụ đúng (ví dụ tổng tiền tính sai, trạng thái đơn hàng sai) — cần bổ sung assertion trên các trường dữ liệu quan trọng trong response body.",
      "en": "Checking only the status code is a shallow assertion that doesn't guarantee correct business logic (e.g. miscalculated totals, wrong order status) — assertions on key response body fields must be added.",
      "ja": "ステータスコードのみの確認は浅いアサーションであり、業務ロジックが正しいことを保証しません(例:合計金額の計算ミス、誤った注文ステータス)。レスポンスボディ内の重要なフィールドに対するアサーションを追加する必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình CI/CD tự động hóa kiểm thử, webhook có vai trò chính là gì khi có commit mới được đẩy lên repository?",
      "en": "In a CI/CD pipeline for test automation, what is the main role of a webhook when a new commit is pushed to the repository?",
      "ja": "テスト自動化のCI/CDパイプラインにおいて、新しいコミットがリポジトリにプッシュされたときのWebhookの主な役割は何ですか?"
    },
    "options": [
      {
        "vi": "Tự động sinh mã nguồn test case dựa trên commit",
        "en": "Automatically generate test case source code based on the commit",
        "ja": "コミットに基づいてテストケースのソースコードを自動生成する"
      },
      {
        "vi": "Gửi thông báo tới hệ thống CI để kích hoạt pipeline chạy ngay khi có sự kiện commit/push xảy ra",
        "en": "Notify the CI system to trigger the pipeline immediately when a commit/push event occurs",
        "ja": "コミット/プッシュのイベントが発生した際、CIシステムに通知してパイプラインを即座に起動させる"
      },
      {
        "vi": "Lưu trữ lịch sử commit vĩnh viễn trên server CI",
        "en": "Permanently store commit history on the CI server",
        "ja": "コミット履歴をCIサーバーに永続的に保存する"
      },
      {
        "vi": "Mã hóa dữ liệu commit trước khi lưu vào database",
        "en": "Encrypt commit data before saving it to the database",
        "ja": "コミットデータをデータベースに保存する前に暗号化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Webhook là cơ chế HTTP callback mà repository (GitHub/GitLab) gọi tới CI server ngay khi có sự kiện push/PR, giúp pipeline được kích hoạt gần như tức thời sau mỗi commit.",
      "en": "A webhook is an HTTP callback that the repository (GitHub/GitLab) sends to the CI server as soon as a push/PR event occurs, triggering the pipeline almost instantly after each commit.",
      "ja": "Webhookはリポジトリ(GitHub/GitLab)がプッシュやPRイベント発生時にCIサーバーへ送るHTTPコールバックであり、コミット後ほぼ即座にパイプラインを起動させます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Sự khác biệt cốt lõi giữa Declarative Pipeline và Scripted Pipeline trong Jenkins là gì?",
      "en": "What is the core difference between a Declarative Pipeline and a Scripted Pipeline in Jenkins?",
      "ja": "JenkinsにおけるDeclarative PipelineとScripted Pipelineの本質的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Declarative không hỗ trợ chạy song song, Scripted thì có",
        "en": "Declarative does not support parallel execution while Scripted does",
        "ja": "Declarativeは並列実行をサポートせず、Scriptedはサポートする"
      },
      {
        "vi": "Declarative chỉ chạy được trên Windows, Scripted chỉ chạy trên Linux",
        "en": "Declarative only runs on Windows, Scripted only runs on Linux",
        "ja": "DeclarativeはWindowsでしか動作せず、ScriptedはLinuxでしか動作しない"
      },
      {
        "vi": "Declarative dùng cú pháp có cấu trúc chặt chẽ (khối pipeline, stages) dễ đọc và kiểm soát; Scripted dùng Groovy linh hoạt, tự do hơn nhưng phức tạp hơn",
        "en": "Declarative uses a strict, structured syntax (pipeline block, stages) that is easy to read and control; Scripted uses flexible Groovy code that is more free-form but more complex",
        "ja": "Declarativeは構造化された厳格な構文(pipelineブロック、stages)で読みやすく管理しやすい。一方Scripted は柔軟なGroovyを使い自由度は高いが複雑になりやすい"
      },
      {
        "vi": "Declarative không thể tích hợp với Git, Scripted mới tích hợp được",
        "en": "Declarative cannot integrate with Git, only Scripted can",
        "ja": "DeclarativeはGitと統合できず、Scriptedのみ統合できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Declarative Pipeline cung cấp cú pháp khai báo chuẩn hóa, dễ đọc, dễ bảo trì; Scripted Pipeline dùng Groovy thuần nên linh hoạt hơn nhưng đòi hỏi kỹ năng lập trình cao hơn. Cả hai đều hỗ trợ song song và tích hợp Git.",
      "en": "Declarative Pipeline offers a standardized, readable, maintainable syntax; Scripted Pipeline uses raw Groovy, offering more flexibility but requiring stronger programming skills. Both support parallelism and Git integration.",
      "ja": "Declarative Pipelineは標準化された読みやすく保守しやすい構文を提供し、Scripted PipelineはGroovyそのものを使うため柔軟だがより高いプログラミングスキルが必要です。どちらも並列実行やGit統合をサポートします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong GitHub Actions, file cấu hình workflow để định nghĩa trigger chạy test khi có commit cần đặt ở thư mục nào của repository?",
      "en": "In GitHub Actions, where in the repository should the workflow configuration file that defines a commit-triggered test run be placed?",
      "ja": "GitHub Actionsにおいて、コミットをトリガーとしてテストを実行するワークフロー設定ファイルはリポジトリのどのディレクトリに配置する必要がありますか?"
    },
    "options": [
      {
        "vi": ".jenkins/pipelines/",
        "en": ".jenkins/pipelines/",
        "ja": ".jenkins/pipelines/"
      },
      {
        "vi": ".ci/scripts/",
        "en": ".ci/scripts/",
        "ja": ".ci/scripts/"
      },
      {
        "vi": "config/actions/",
        "en": "config/actions/",
        "ja": "config/actions/"
      },
      {
        "vi": ".github/workflows/",
        "en": ".github/workflows/",
        "ja": ".github/workflows/"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "GitHub Actions quy định workflow YAML phải nằm trong thư mục .github/workflows/ của repository thì mới được GitHub tự động nhận diện và thực thi.",
      "en": "GitHub Actions requires workflow YAML files to reside in the .github/workflows/ directory of the repository in order to be automatically detected and executed.",
      "ja": "GitHub Actionsでは、ワークフローのYAMLファイルをリポジトリの.github/workflows/ディレクトリに置くことで自動的に検出・実行されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Stage\" trong một Jenkins pipeline biểu thị điều gì?",
      "en": "What does a \"stage\" represent in a Jenkins pipeline?",
      "ja": "Jenkinsパイプラインにおける「stage(ステージ)」とは何を表しますか?"
    },
    "options": [
      {
        "vi": "Một giai đoạn công việc riêng biệt trong pipeline, ví dụ Build, Test, Deploy, giúp trực quan hóa tiến trình",
        "en": "A distinct phase of work in the pipeline, such as Build, Test, Deploy, that visualizes the progress",
        "ja": "Build、Test、Deployのようにパイプライン内の独立した作業段階であり、進行状況を可視化する"
      },
      {
        "vi": "Một biến môi trường dùng chung cho toàn bộ pipeline",
        "en": "An environment variable shared across the whole pipeline",
        "ja": "パイプライン全体で共有される環境変数"
      },
      {
        "vi": "Một loại plugin quản lý credentials",
        "en": "A type of plugin for managing credentials",
        "ja": "認証情報を管理するプラグインの一種"
      },
      {
        "vi": "Một node vật lý chạy Jenkins agent",
        "en": "A physical node running a Jenkins agent",
        "ja": "Jenkinsエージェントを実行する物理ノード"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Stage đại diện cho một giai đoạn logic của pipeline (ví dụ Build, Test, Deploy), giúp người xem theo dõi trực quan tiến trình chạy trên giao diện Jenkins.",
      "en": "A stage represents a logical phase of the pipeline (e.g. Build, Test, Deploy), letting users visually track progress in the Jenkins UI.",
      "ja": "stageはパイプラインの論理的な段階(Build、Test、Deployなど)を表し、Jenkinsの画面上で進行状況を視覚的に追跡できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi bộ test tự động có hàng nghìn test case, chiến lược nào giúp giảm đáng kể thời gian chạy trong pipeline CI?",
      "en": "When an automated test suite has thousands of test cases, which strategy significantly reduces execution time in the CI pipeline?",
      "ja": "自動テストスイートが数千のテストケースを含む場合、CIパイプラインの実行時間を大幅に短縮する戦略はどれですか?"
    },
    "options": [
      {
        "vi": "Chạy tuần tự toàn bộ test case theo thứ tự alphabet",
        "en": "Run all test cases sequentially in alphabetical order",
        "ja": "すべてのテストケースをアルファベット順に逐次実行する"
      },
      {
        "vi": "Chia nhỏ bộ test và chạy song song (parallel) trên nhiều executor/runner",
        "en": "Split the test suite and run it in parallel across multiple executors/runners",
        "ja": "テストスイートを分割し、複数のexecutor/runnerで並列実行する"
      },
      {
        "vi": "Tăng số lượng test case retry lên gấp đôi",
        "en": "Double the number of test case retries",
        "ja": "テストケースのリトライ回数を倍に増やす"
      },
      {
        "vi": "Giảm số lượng assertion trong mỗi test case",
        "en": "Reduce the number of assertions in each test case",
        "ja": "各テストケースのアサーション数を減らす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chia nhỏ bộ test và phân phối chạy song song trên nhiều executor/runner là cách hiệu quả nhất để rút ngắn thời gian pipeline mà vẫn giữ đầy đủ độ phủ test.",
      "en": "Splitting the suite and distributing it to run in parallel across multiple executors/runners is the most effective way to shorten pipeline time while keeping full test coverage.",
      "ja": "テストスイートを分割し複数のexecutor/runnerで並列実行することが、テストカバレッジを維持しながらパイプライン時間を短縮する最も効果的な方法です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Báo cáo định dạng JUnit XML thường được dùng trong pipeline CI/CD với mục đích gì?",
      "en": "What is the purpose of JUnit XML format reports commonly used in CI/CD pipelines?",
      "ja": "CI/CDパイプラインでよく使われるJUnit XML形式のレポートの目的は何ですか?"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho file cấu hình pipeline",
        "en": "Completely replace the pipeline configuration file",
        "ja": "パイプライン設定ファイルを完全に置き換える"
      },
      {
        "vi": "Lưu trữ mã nguồn của các test case",
        "en": "Store the source code of the test cases",
        "ja": "テストケースのソースコードを保存する"
      },
      {
        "vi": "Chuẩn hóa kết quả test để các công cụ CI (Jenkins, GitHub Actions) có thể hiển thị, tổng hợp pass/fail trực quan",
        "en": "Standardize test results so CI tools (Jenkins, GitHub Actions) can visually display and aggregate pass/fail status",
        "ja": "テスト結果を標準化し、Jenkins や GitHub Actions などのCIツールがpass/failを視覚的に表示・集計できるようにする"
      },
      {
        "vi": "Mã hóa thông tin đăng nhập vào hệ thống CI",
        "en": "Encrypt login credentials for the CI system",
        "ja": "CIシステムへのログイン情報を暗号化する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "JUnit XML là định dạng chuẩn để báo cáo kết quả test, được hầu hết công cụ CI hỗ trợ đọc và hiển thị số liệu pass/fail, thời gian chạy một cách trực quan.",
      "en": "JUnit XML is a standard test result format that most CI tools can parse and display visually, showing pass/fail counts and run duration.",
      "ja": "JUnit XMLはテスト結果の標準フォーマットであり、ほとんどのCIツールが読み取ってpass/fail数や実行時間を視覚的に表示できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Quality gate\" trong công cụ như SonarQube khi tích hợp vào CI/CD có tác dụng gì?",
      "en": "What effect does a \"quality gate\" in tools like SonarQube have when integrated into CI/CD?",
      "ja": "SonarQubeのようなツールの「クオリティゲート」をCI/CDに統合した場合、どのような効果がありますか?"
    },
    "options": [
      {
        "vi": "Tự động sửa lỗi code khi phát hiện bug",
        "en": "Automatically fix code when a bug is detected",
        "ja": "バグを検出したときにコードを自動修正する"
      },
      {
        "vi": "Tăng tốc độ build bằng cách bỏ qua test không quan trọng",
        "en": "Speed up the build by skipping unimportant tests",
        "ja": "重要でないテストをスキップしてビルドを高速化する"
      },
      {
        "vi": "Ghi log toàn bộ hoạt động của server CI",
        "en": "Log all activity on the CI server",
        "ja": "CIサーバーの全アクティビティをログに記録する"
      },
      {
        "vi": "Chặn pipeline (build fail) nếu chất lượng code hoặc kết quả test không đạt ngưỡng quy định trước",
        "en": "Block the pipeline (fail the build) if code quality or test results fail to meet a predefined threshold",
        "ja": "コード品質やテスト結果があらかじめ定められた基準に達しない場合、パイプラインをブロックする(ビルドを失敗させる)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Quality gate là bộ tiêu chí (coverage, số bug, code smell...) mà nếu không đạt sẽ khiến pipeline dừng lại, ngăn code chất lượng kém được merge/deploy.",
      "en": "A quality gate is a set of criteria (coverage, bug count, code smells, etc.) that, if not met, halts the pipeline, preventing poor-quality code from being merged or deployed.",
      "ja": "クオリティゲートはカバレッジやバグ数、コードスメルなどの基準セットであり、満たされない場合パイプラインを停止させ、品質の低いコードがマージ・デプロイされるのを防ぎます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tính năng \"matrix\" trong GitHub Actions được dùng để làm gì?",
      "en": "What is the \"matrix\" feature in GitHub Actions used for?",
      "ja": "GitHub Actionsの「matrix」機能は何のために使われますか?"
    },
    "options": [
      {
        "vi": "Chạy cùng một job trên nhiều tổ hợp cấu hình khác nhau (ví dụ nhiều phiên bản Node.js, nhiều hệ điều hành) song song",
        "en": "Run the same job across multiple configuration combinations (e.g. multiple Node.js versions, multiple operating systems) in parallel",
        "ja": "同一のジョブを複数の設定の組み合わせ(複数のNode.jsバージョンや複数のOSなど)で並列実行する"
      },
      {
        "vi": "Mã hóa secrets trong workflow",
        "en": "Encrypt secrets in the workflow",
        "ja": "ワークフロー内のシークレットを暗号化する"
      },
      {
        "vi": "Giới hạn số lần retry của một job",
        "en": "Limit the number of retries for a job",
        "ja": "ジョブのリトライ回数を制限する"
      },
      {
        "vi": "Tạo báo cáo coverage tự động",
        "en": "Automatically generate coverage reports",
        "ja": "カバレッジレポートを自動生成する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Matrix strategy cho phép định nghĩa nhiều tổ hợp biến (OS, phiên bản ngôn ngữ...) để GitHub Actions tự động sinh và chạy song song các job tương ứng, hữu ích khi test đa môi trường.",
      "en": "The matrix strategy lets you define multiple variable combinations (OS, language version, etc.) so GitHub Actions auto-generates and runs the corresponding jobs in parallel, useful for cross-environment testing.",
      "ja": "matrix戦略により、OSや言語バージョンなど複数の変数の組み合わせを定義し、GitHub Actionsが対応するジョブを自動生成して並列実行できます。マルチ環境テストに有用です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Để lên lịch chạy bộ test tự động vào mỗi đêm (nightly build) trong GitHub Actions, ta cần cấu hình trigger nào?",
      "en": "To schedule an automated test suite to run every night (nightly build) in GitHub Actions, which trigger should be configured?",
      "ja": "GitHub Actionsで毎晩(nightly build)自動テストスイートを実行するようスケジュールするには、どのトリガーを設定する必要がありますか?"
    },
    "options": [
      {
        "vi": "on: push",
        "en": "on: push",
        "ja": "on: push"
      },
      {
        "vi": "on: schedule với biểu thức cron",
        "en": "on: schedule with a cron expression",
        "ja": "cron式を使ったon: schedule"
      },
      {
        "vi": "on: pull_request",
        "en": "on: pull_request",
        "ja": "on: pull_request"
      },
      {
        "vi": "on: workflow_dispatch",
        "en": "on: workflow_dispatch",
        "ja": "on: workflow_dispatch"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "on: schedule sử dụng cú pháp cron cho phép GitHub Actions tự động kích hoạt workflow theo thời gian định kỳ, ví dụ chạy mỗi đêm mà không cần có commit hay PR mới.",
      "en": "on: schedule using cron syntax lets GitHub Actions automatically trigger a workflow at recurring times, e.g. every night, without needing a new commit or PR.",
      "ja": "cron構文を使うon: scheduleにより、新しいコミットやPRがなくてもGitHub Actionsが定期的(例:毎晩)にワークフローを自動起動できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điểm khác biệt chính giữa self-hosted runner và GitHub-hosted runner là gì?",
      "en": "What is the main difference between a self-hosted runner and a GitHub-hosted runner?",
      "ja": "セルフホストランナーとGitHubホストランナーの主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "GitHub-hosted runner chỉ hỗ trợ ngôn ngữ Python",
        "en": "GitHub-hosted runners only support Python",
        "ja": "GitHubホストランナーはPythonのみサポートする"
      },
      {
        "vi": "Self-hosted runner không thể chạy test tự động",
        "en": "A self-hosted runner cannot run automated tests",
        "ja": "セルフホストランナーは自動テストを実行できない"
      },
      {
        "vi": "Self-hosted runner chạy trên máy chủ do người dùng tự quản lý và cài đặt, cho phép tùy biến môi trường/tài nguyên; GitHub-hosted runner do GitHub cung cấp và quản lý sẵn",
        "en": "A self-hosted runner runs on a server that the user manages and configures themselves, allowing environment/resource customization; a GitHub-hosted runner is provided and managed by GitHub",
        "ja": "セルフホストランナーはユーザー自身が管理・設定するサーバー上で動作し、環境やリソースをカスタマイズできる。GitHubホストランナーはGitHubが提供・管理する"
      },
      {
        "vi": "Self-hosted runner bắt buộc phải trả phí theo phút chạy",
        "en": "Self-hosted runners must always be paid for per minute of usage",
        "ja": "セルフホストランナーは常に実行分数に応じて課金される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Self-hosted runner do người dùng tự cài đặt và quản lý trên hạ tầng riêng, phù hợp khi cần cấu hình đặc thù hoặc bảo mật; GitHub-hosted runner là máy ảo tạm thời do GitHub cấp sẵn, tiện lợi nhưng ít tùy biến hơn.",
      "en": "A self-hosted runner is installed and managed by the user on their own infrastructure, useful for custom configurations or security needs; a GitHub-hosted runner is a temporary VM provisioned by GitHub, convenient but less customizable.",
      "ja": "セルフホストランナーはユーザーが自前のインフラにインストール・管理するもので、特殊な設定やセキュリティ要件に適しています。GitHubホストランナーはGitHubが用意する一時的な仮想マシンで、便利だがカスタマイズ性は低いです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong pipeline CI/CD, cách làm nào đúng để quản lý thông tin nhạy cảm như API key, mật khẩu database dùng cho test?",
      "en": "In a CI/CD pipeline, what is the correct way to manage sensitive data such as API keys or database passwords used in tests?",
      "ja": "CI/CDパイプラインにおいて、テストで使用するAPIキーやデータベースパスワードなどの機密情報を管理する正しい方法は何ですか?"
    },
    "options": [
      {
        "vi": "Ghi trực tiếp giá trị vào file YAML của workflow để dễ theo dõi",
        "en": "Write the values directly into the workflow YAML file for easy tracking",
        "ja": "追跡しやすいようにワークフローのYAMLファイルに値を直接書き込む"
      },
      {
        "vi": "Lưu vào biến môi trường trong Jenkinsfile không mã hóa",
        "en": "Store them as unencrypted environment variables in the Jenkinsfile",
        "ja": "Jenkinsfile内に暗号化せず環境変数として保存する"
      },
      {
        "vi": "Commit trực tiếp vào file .env trong repository public",
        "en": "Commit them directly into a .env file in a public repository",
        "ja": "公開リポジトリの.envファイルに直接コミットする"
      },
      {
        "vi": "Sử dụng cơ chế Secrets được mã hóa của hệ thống CI (GitHub Secrets, Jenkins Credentials) thay vì hardcode",
        "en": "Use the CI system's encrypted secrets mechanism (GitHub Secrets, Jenkins Credentials) instead of hardcoding",
        "ja": "ハードコードする代わりに、CIシステムの暗号化されたシークレット機構(GitHub Secrets、Jenkins Credentials)を使用する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Secrets Manager tích hợp sẵn của CI (GitHub Secrets, Jenkins Credentials Store) mã hóa và ẩn giá trị nhạy cảm khỏi log, tránh rò rỉ credentials khi lưu trong mã nguồn.",
      "en": "The CI system's built-in secrets manager (GitHub Secrets, Jenkins Credentials Store) encrypts sensitive values and hides them from logs, preventing credential leaks if they were stored in source code.",
      "ja": "CI内蔵のシークレット管理機構(GitHub Secrets、Jenkins Credentials Store)は機密情報を暗号化しログから隠すため、ソースコードに保存した場合の認証情報漏洩を防ぎます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Kỹ thuật cache dependency (ví dụ cache thư mục node_modules) trong pipeline CI mang lại lợi ích gì?",
      "en": "What benefit does dependency caching (e.g. caching the node_modules folder) provide in a CI pipeline?",
      "ja": "CIパイプラインにおける依存関係のキャッシュ(例:node_modulesフォルダのキャッシュ)はどのような利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Giảm thời gian cài đặt lại dependency ở mỗi lần chạy pipeline, giúp build nhanh hơn",
        "en": "Reduce the time spent reinstalling dependencies on every pipeline run, making builds faster",
        "ja": "パイプライン実行のたびに依存関係を再インストールする時間を減らし、ビルドを高速化する"
      },
      {
        "vi": "Tăng độ chính xác của test case",
        "en": "Increase the accuracy of test cases",
        "ja": "テストケースの正確性を高める"
      },
      {
        "vi": "Tự động phát hiện flaky test",
        "en": "Automatically detect flaky tests",
        "ja": "フレーキーテストを自動的に検出する"
      },
      {
        "vi": "Mã hóa toàn bộ mã nguồn dự án",
        "en": "Encrypt the entire project source code",
        "ja": "プロジェクトのソースコード全体を暗号化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cache dependency lưu lại các gói đã cài đặt giữa các lần chạy pipeline, tránh phải tải/cài lại từ đầu, giúp rút ngắn đáng kể thời gian build và test.",
      "en": "Dependency caching stores installed packages between pipeline runs, avoiding repeated downloads/installs and significantly shortening build and test times.",
      "ja": "依存関係キャッシュはパイプライン実行間でインストール済みパッケージを保持し、再ダウンロード・再インストールを避けることでビルドとテストの時間を大幅に短縮します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Branch protection rule yêu cầu \"status check phải pass\" trước khi merge Pull Request nhằm mục đích gì?",
      "en": "What is the purpose of a branch protection rule requiring \"status checks must pass\" before merging a Pull Request?",
      "ja": "プルリクエストをマージする前に「ステータスチェックが合格すること」を要求するブランチ保護ルールの目的は何ですか?"
    },
    "options": [
      {
        "vi": "Tự động xóa nhánh sau khi merge",
        "en": "Automatically delete the branch after merging",
        "ja": "マージ後にブランチを自動削除する"
      },
      {
        "vi": "Ngăn merge code khi các job CI (build, test) chưa chạy thành công, đảm bảo chất lượng nhánh chính",
        "en": "Prevent merging code when CI jobs (build, test) have not succeeded, ensuring the quality of the main branch",
        "ja": "CIジョブ(ビルド、テスト)が成功していない状態でのマージを防ぎ、メインブランチの品質を保証する"
      },
      {
        "vi": "Giới hạn số lượng reviewer tối đa",
        "en": "Limit the maximum number of reviewers",
        "ja": "レビュアーの最大人数を制限する"
      },
      {
        "vi": "Tăng tốc độ pipeline bằng cách bỏ qua test",
        "en": "Speed up the pipeline by skipping tests",
        "ja": "テストをスキップしてパイプラインを高速化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Yêu cầu status check pass là cơ chế bắt buộc CI phải xanh (build/test thành công) trước khi cho phép merge, giúp bảo vệ nhánh chính khỏi code lỗi.",
      "en": "Requiring passing status checks forces CI to be green (build/test succeeded) before allowing a merge, protecting the main branch from broken code.",
      "ja": "ステータスチェック合格を要求することで、マージ前にCIがグリーン(ビルド/テスト成功)であることを強制し、メインブランチを壊れたコードから保護します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Artifact được tạo ra trong một pipeline CI/CD (ví dụ file báo cáo test, file build) thường phục vụ mục đích gì?",
      "en": "What is an artifact generated in a CI/CD pipeline (e.g. a test report file, a build file) typically used for?",
      "ja": "CI/CDパイプラインで生成されるアーティファクト(テストレポートファイルやビルドファイルなど)は通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Chỉ dùng để trang trí giao diện dashboard CI",
        "en": "Only to decorate the CI dashboard interface",
        "ja": "CIダッシュボードの見た目を飾るためだけに使う"
      },
      {
        "vi": "Thay thế cho version control system",
        "en": "Replace the version control system",
        "ja": "バージョン管理システムを置き換える"
      },
      {
        "vi": "Lưu trữ lại kết quả/sản phẩm của một lần chạy để tải xuống, kiểm tra hoặc dùng cho bước tiếp theo",
        "en": "Store the results/output of a run for download, inspection, or use in a subsequent step",
        "ja": "実行結果や成果物を保存し、ダウンロード・確認・後続ステップでの利用を可能にする"
      },
      {
        "vi": "Tự động deploy artifact lên production mà không cần approval",
        "en": "Automatically deploy the artifact to production without approval",
        "ja": "承認なしにアーティファクトを本番環境へ自動デプロイする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Artifact là sản phẩm đầu ra của một job (báo cáo test, file build, log) được lưu lại để người dùng tải về xem, hoặc chuyển tiếp cho stage/job kế tiếp sử dụng.",
      "en": "An artifact is the output of a job (test report, build file, logs) that is stored so users can download and review it, or so downstream stages/jobs can consume it.",
      "ja": "アーティファクトはジョブの出力(テストレポート、ビルドファイル、ログなど)であり、ユーザーがダウンロードして確認したり、後続のステージ/ジョブが利用したりできるよう保存されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao nhiều đội automation testing chạy test trong container Docker khi thực thi trên CI?",
      "en": "Why do many automation testing teams run tests inside Docker containers when executing on CI?",
      "ja": "多くの自動化テストチームがCI実行時にDockerコンテナ内でテストを実行するのはなぜですか?"
    },
    "options": [
      {
        "vi": "Docker giúp giảm số lượng test case cần viết",
        "en": "Docker reduces the number of test cases that need to be written",
        "ja": "Dockerを使うと書くべきテストケース数が減る"
      },
      {
        "vi": "Docker tự động sinh test case mới",
        "en": "Docker automatically generates new test cases",
        "ja": "Dockerが新しいテストケースを自動生成する"
      },
      {
        "vi": "Docker thay thế hoàn toàn cho Jenkins/GitHub Actions",
        "en": "Docker completely replaces Jenkins/GitHub Actions",
        "ja": "DockerはJenkinsやGitHub Actionsを完全に置き換える"
      },
      {
        "vi": "Docker đảm bảo môi trường thực thi test nhất quán, tránh lỗi \"chạy được trên máy tôi nhưng fail trên CI\"",
        "en": "Docker ensures a consistent test execution environment, avoiding \"works on my machine but fails on CI\" issues",
        "ja": "Dockerはテスト実行環境の一貫性を保証し、「自分の環境では動くがCIでは失敗する」という問題を防ぐ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Container Docker đóng gói môi trường (OS, thư viện, phiên bản runtime) cố định, giúp test chạy giống hệt nhau trên mọi máy/CI, loại bỏ sai khác môi trường gây flaky.",
      "en": "A Docker container packages a fixed environment (OS, libraries, runtime versions), making tests run identically on any machine/CI, eliminating environment differences that cause flakiness.",
      "ja": "Dockerコンテナは固定された環境(OS、ライブラリ、ランタイムバージョン)をパッケージ化し、どのマシン/CIでもテストが同一に実行されるようにし、フレーキーの原因となる環境差異を排除します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Smoke test\" chạy ngay sau khi deploy lên môi trường staging/production trong pipeline CI/CD nhằm mục đích gì?",
      "en": "What is the purpose of a \"smoke test\" run right after deploying to staging/production in a CI/CD pipeline?",
      "ja": "CI/CDパイプラインでステージング/本番環境へのデプロイ直後に実行される「スモークテスト」の目的は何ですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra nhanh các chức năng cốt lõi hoạt động bình thường sau khi triển khai, phát hiện sớm lỗi nghiêm trọng",
        "en": "Quickly verify that core functionality works normally after deployment, catching critical failures early",
        "ja": "デプロイ後にコア機能が正常に動作していることを素早く確認し、重大な問題を早期に発見する"
      },
      {
        "vi": "Thay thế hoàn toàn cho regression test",
        "en": "Completely replace regression testing",
        "ja": "リグレッションテストを完全に置き換える"
      },
      {
        "vi": "Tính toán coverage code chi tiết",
        "en": "Calculate detailed code coverage",
        "ja": "詳細なコードカバレッジを計算する"
      },
      {
        "vi": "Sinh dữ liệu test tự động cho môi trường production",
        "en": "Automatically generate test data for the production environment",
        "ja": "本番環境用のテストデータを自動生成する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Smoke test là bộ test nhỏ, chạy nhanh nhằm xác nhận các chức năng thiết yếu (login, trang chủ, API chính) hoạt động ổn sau deploy, giúp phát hiện sớm sự cố nghiêm trọng trước khi chạy regression đầy đủ.",
      "en": "A smoke test is a small, fast suite that confirms essential functions (login, homepage, key APIs) work correctly after deployment, catching serious issues early before a full regression run.",
      "ja": "スモークテストはログインやトップページ、主要APIなど重要な機能がデプロイ後に正常に動作することを確認する、小規模で高速なテスト群であり、完全なリグレッション実行の前に重大な問題を早期発見します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Lợi ích chính của việc áp dụng \"Pipeline as Code\" (Jenkinsfile, YAML workflow) so với cấu hình pipeline thủ công qua giao diện là gì?",
      "en": "What is the main benefit of \"Pipeline as Code\" (Jenkinsfile, YAML workflow) compared to manually configuring a pipeline through a UI?",
      "ja": "UIによる手動パイプライン設定と比べて「Pipeline as Code」(Jenkinsfile、YAMLワークフロー)を採用する主な利点は何ですか?"
    },
    "options": [
      {
        "vi": "Pipeline as Code không cần bảo trì",
        "en": "Pipeline as Code requires no maintenance",
        "ja": "Pipeline as Codeは保守が不要になる"
      },
      {
        "vi": "Cấu hình pipeline được version-control cùng mã nguồn, dễ review, tái sử dụng và đồng bộ giữa các môi trường",
        "en": "Pipeline configuration is version-controlled alongside the source code, making it easy to review, reuse, and keep consistent across environments",
        "ja": "パイプライン設定がソースコードと共にバージョン管理され、レビューや再利用、環境間での一貫性維持が容易になる"
      },
      {
        "vi": "Pipeline as Code chỉ chạy được với Jenkins",
        "en": "Pipeline as Code only works with Jenkins",
        "ja": "Pipeline as CodeはJenkinsでしか動作しない"
      },
      {
        "vi": "Pipeline as Code loại bỏ hoàn toàn nhu cầu viết test tự động",
        "en": "Pipeline as Code completely eliminates the need to write automated tests",
        "ja": "Pipeline as Codeは自動テストを書く必要性を完全になくす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi pipeline được định nghĩa bằng code (Jenkinsfile/YAML) và lưu trong repository, nó được version-control, review qua Pull Request, dễ tái sử dụng và đảm bảo nhất quán giữa các môi trường/dự án.",
      "en": "When the pipeline is defined as code (Jenkinsfile/YAML) and stored in the repository, it becomes version-controlled, reviewable via Pull Requests, reusable, and consistent across environments/projects.",
      "ja": "パイプラインをコード(Jenkinsfile/YAML)として定義しリポジトリに保存することで、バージョン管理され、プルリクエストでレビューでき、再利用性が高まり、環境やプロジェクト間で一貫性を保てます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong GitHub Actions, trigger \"on: pull_request\" khác với \"on: push\" ở điểm nào quan trọng đối với automation test?",
      "en": "In GitHub Actions, how does the \"on: pull_request\" trigger differ importantly from \"on: push\" for automation testing?",
      "ja": "GitHub Actionsにおいて、自動テストにとって重要な「on: pull_request」と「on: push」の違いは何ですか?"
    },
    "options": [
      {
        "vi": "pull_request chỉ chạy trên nhánh main, push chạy trên mọi nhánh",
        "en": "pull_request only runs on the main branch, push runs on every branch",
        "ja": "pull_requestはmainブランチでのみ実行され、pushはすべてのブランチで実行される"
      },
      {
        "vi": "push không thể dùng để chạy test tự động",
        "en": "push cannot be used to run automated tests",
        "ja": "pushは自動テストの実行に使用できない"
      },
      {
        "vi": "pull_request kích hoạt test trên mã kết hợp giữa nhánh nguồn và nhánh đích, phù hợp kiểm tra trước khi merge; push kích hoạt khi commit được đẩy lên một nhánh cụ thể",
        "en": "pull_request triggers tests on the merged code between the source and target branches, suitable for pre-merge checks; push triggers when a commit is pushed to a specific branch",
        "ja": "pull_requestはソースブランチとターゲットブランチをマージしたコードに対してテストを起動し、マージ前チェックに適する。pushは特定のブランチへコミットがプッシュされたときに起動する"
      },
      {
        "vi": "pull_request không hỗ trợ chạy song song job",
        "en": "pull_request does not support running jobs in parallel",
        "ja": "pull_requestはジョブの並列実行をサポートしない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "pull_request event chạy test trên bản merge giả lập giữa nhánh nguồn và đích, giúp phát hiện xung đột/lỗi trước khi merge; push event chạy ngay khi có commit mới trên một nhánh cụ thể.",
      "en": "The pull_request event runs tests on a simulated merge between the source and target branches, catching conflicts/errors before merging; the push event runs as soon as a new commit lands on a specific branch.",
      "ja": "pull_requestイベントはソースブランチとターゲットブランチの仮想マージに対してテストを実行し、マージ前に競合やエラーを検出します。pushイベントは特定ブランチに新しいコミットがあった際すぐに実行されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Fail fast\" trong thiết kế pipeline CI/CD nghĩa là gì?",
      "en": "What does \"fail fast\" mean in CI/CD pipeline design?",
      "ja": "CI/CDパイプライン設計における「fail fast」とは何を意味しますか?"
    },
    "options": [
      {
        "vi": "Chạy toàn bộ các bước dù có bước nào fail, để lấy đầy đủ báo cáo cuối cùng",
        "en": "Run all steps even if one fails, to get a complete final report",
        "ja": "あるステップが失敗しても全ステップを実行し、完全な最終レポートを得る"
      },
      {
        "vi": "Tự động retry vô hạn lần khi test fail",
        "en": "Automatically retry indefinitely when a test fails",
        "ja": "テストが失敗した際に無限にリトライする"
      },
      {
        "vi": "Tăng tốc độ chạy test bằng cách bỏ qua assertion",
        "en": "Speed up test execution by skipping assertions",
        "ja": "アサーションをスキップしてテスト実行を高速化する"
      },
      {
        "vi": "Dừng pipeline ngay khi phát hiện bước quan trọng (ví dụ build hoặc unit test) thất bại, tránh lãng phí thời gian chạy các bước sau",
        "en": "Stop the pipeline immediately when a critical step (e.g. build or unit test) fails, avoiding wasted time on subsequent steps",
        "ja": "重要なステップ(ビルドやユニットテストなど)が失敗した時点でパイプラインを即座に停止し、後続ステップの実行時間を無駄にしないようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Fail fast nghĩa là pipeline dừng ngay ở bước đầu tiên thất bại thay vì tiếp tục chạy các bước sau vô ích, giúp tiết kiệm tài nguyên và cho phản hồi lỗi nhanh cho developer.",
      "en": "Fail fast means the pipeline stops at the first failing step instead of wastefully continuing subsequent steps, saving resources and giving developers quick feedback on failures.",
      "ja": "fail fastとは、最初に失敗したステップでパイプラインを停止し、無駄に後続ステップを続行しないことを意味し、リソースを節約し開発者に迅速なフィードバックを与えます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Việc cấu hình thông báo (Slack, email) khi pipeline CI/CD thất bại mang lại lợi ích gì cho đội automation?",
      "en": "What benefit does configuring notifications (Slack, email) on CI/CD pipeline failure provide for the automation team?",
      "ja": "CI/CDパイプライン失敗時に通知(Slack、メール)を設定することは、自動化チームにどのような利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Giúp đội phát triển/QA biết ngay lập tức để xử lý sự cố, giảm thời gian phát hiện lỗi",
        "en": "Help the dev/QA team know immediately to handle the issue, reducing the time to detect failures",
        "ja": "開発/QAチームが問題を即座に把握し対応できるようにし、障害検知までの時間を短縮する"
      },
      {
        "vi": "Tự động sửa lỗi code thay cho developer",
        "en": "Automatically fix the code instead of the developer",
        "ja": "開発者に代わってコードを自動修正する"
      },
      {
        "vi": "Thay thế hoàn toàn cho việc xem log chi tiết",
        "en": "Completely replace the need to review detailed logs",
        "ja": "詳細なログの確認を完全に不要にする"
      },
      {
        "vi": "Tăng số lượng test case được thực thi",
        "en": "Increase the number of test cases executed",
        "ja": "実行されるテストケースの数を増やす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thông báo tự động khi pipeline fail giúp đội ngũ nhận biết sự cố ngay lập tức thay vì phải chủ động kiểm tra dashboard, rút ngắn thời gian phản ứng và khắc phục.",
      "en": "Automatic failure notifications let the team learn about issues immediately instead of having to proactively check the dashboard, shortening response and remediation time.",
      "ja": "失敗時の自動通知により、チームはダッシュボードを能動的に確認しなくても問題を即座に把握でき、対応・修正までの時間が短縮されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong chiến lược canary release, automation test đóng vai trò gì?",
      "en": "What role does automation testing play in a canary release strategy?",
      "ja": "カナリアリリース戦略において、自動化テストはどのような役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Không cần thiết vì canary release chỉ áp dụng cho một phần nhỏ người dùng",
        "en": "Not necessary, since canary release only applies to a small subset of users",
        "ja": "カナリアリリースは一部のユーザーにのみ適用されるため不要である"
      },
      {
        "vi": "Xác thực phiên bản mới hoạt động đúng trên nhóm nhỏ trước khi mở rộng ra toàn bộ hệ thống, giảm rủi ro sự cố diện rộng",
        "en": "Verify the new version works correctly on a small group before rolling out to the whole system, reducing the risk of widespread incidents",
        "ja": "新バージョンが小規模グループで正しく動作することを検証してからシステム全体に展開し、大規模障害のリスクを減らす"
      },
      {
        "vi": "Chỉ dùng để kiểm tra hiệu năng, không liên quan chức năng",
        "en": "Only used to check performance, unrelated to functionality",
        "ja": "パフォーマンスチェックのみに使われ、機能とは無関係である"
      },
      {
        "vi": "Thay thế cho việc theo dõi monitoring sau deploy",
        "en": "Replace post-deployment monitoring",
        "ja": "デプロイ後のモニタリングを置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Automation test kết hợp với canary release giúp xác nhận phiên bản mới ổn định trên một tập nhỏ traffic/người dùng trước khi mở rộng, giảm thiểu rủi ro ảnh hưởng toàn bộ hệ thống nếu có lỗi.",
      "en": "Automation testing combined with canary release confirms the new version is stable on a small subset of traffic/users before scaling out, minimizing the risk of impacting the entire system if issues occur.",
      "ja": "自動化テストとカナリアリリースを組み合わせることで、新バージョンが少量のトラフィック/ユーザーで安定していることを確認してから展開を拡大し、問題発生時にシステム全体へ影響するリスクを最小化します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Shift-left testing\" trong bối cảnh CI/CD nghĩa là gì?",
      "en": "What does \"shift-left testing\" mean in the context of CI/CD?",
      "ja": "CI/CDの文脈における「シフトレフトテスト」とは何を意味しますか?"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn bước code review",
        "en": "Completely eliminate the code review step",
        "ja": "コードレビューの工程を完全になくす"
      },
      {
        "vi": "Chỉ chạy test ở môi trường production sau khi release",
        "en": "Only run tests in the production environment after release",
        "ja": "リリース後の本番環境でのみテストを実行する"
      },
      {
        "vi": "Chuyển việc kiểm thử sang giai đoạn sớm hơn trong vòng đời phát triển, tích hợp test tự động ngay từ khi code được commit",
        "en": "Move testing to an earlier stage of the development lifecycle, integrating automated tests as soon as code is committed",
        "ja": "テストを開発ライフサイクルのより早い段階に移し、コードがコミットされた時点から自動テストを組み込む"
      },
      {
        "vi": "Ưu tiên chạy test thủ công thay vì tự động",
        "en": "Prioritize manual testing over automated testing",
        "ja": "自動テストより手動テストを優先する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Shift-left nghĩa là đưa hoạt động kiểm thử vào sớm nhất có thể trong vòng đời phát triển (ngay khi commit) thay vì chờ tới cuối, giúp phát hiện lỗi sớm, giảm chi phí sửa lỗi.",
      "en": "Shift-left means moving testing activities as early as possible in the development lifecycle (right at commit time) rather than waiting until the end, enabling early defect detection and lower fix costs.",
      "ja": "シフトレフトとは、テスト活動を開発ライフサイクルの最後まで待たず、可能な限り早い段階(コミット時点)で行うことを意味し、欠陥の早期発見と修正コストの削減につながります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Plugin \"Git\"/SCM trong Jenkins khi cấu hình pipeline dùng để làm gì?",
      "en": "What is the \"Git\"/SCM plugin used for when configuring a Jenkins pipeline?",
      "ja": "Jenkinsパイプラインの設定における「Git」/SCMプラグインは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Quản lý version của Jenkins server",
        "en": "Manage the version of the Jenkins server itself",
        "ja": "Jenkinsサーバー自体のバージョンを管理する"
      },
      {
        "vi": "Mã hóa dữ liệu kết quả test",
        "en": "Encrypt test result data",
        "ja": "テスト結果データを暗号化する"
      },
      {
        "vi": "Tự động deploy ứng dụng lên cloud",
        "en": "Automatically deploy the application to the cloud",
        "ja": "アプリケーションをクラウドへ自動デプロイする"
      },
      {
        "vi": "Kết nối và lấy mã nguồn từ hệ thống quản lý mã nguồn (Git, SVN) để pipeline có dữ liệu chạy build/test",
        "en": "Connect to and pull source code from a source control system (Git, SVN) so the pipeline has data to build/test",
        "ja": "バージョン管理システム(Git、SVN)に接続してソースコードを取得し、パイプラインがビルド/テストを実行できるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Plugin Git/SCM cho phép Jenkins checkout mã nguồn từ repository (branch, tag, commit cụ thể) trước khi thực thi các stage build/test trong pipeline.",
      "en": "The Git/SCM plugin lets Jenkins check out source code from a repository (a specific branch, tag, or commit) before executing the build/test stages in the pipeline.",
      "ja": "Git/SCMプラグインにより、Jenkinsはパイプライン内のビルド/テストステージを実行する前に、リポジトリから特定のブランチ・タグ・コミットのソースコードをチェックアウトできます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Cơ chế rollback tự động sau khi deploy trong pipeline CI/CD thường được kích hoạt dựa trên điều gì?",
      "en": "What typically triggers an automatic rollback mechanism after deployment in a CI/CD pipeline?",
      "ja": "CI/CDパイプラインにおけるデプロイ後の自動ロールバック機構は通常何によって起動されますか?"
    },
    "options": [
      {
        "vi": "Kết quả smoke test/health check sau deploy thất bại, hệ thống tự động khôi phục về phiên bản ổn định trước đó",
        "en": "A failed post-deployment smoke test/health check, causing the system to automatically restore the previous stable version",
        "ja": "デプロイ後のスモークテスト/ヘルスチェックが失敗し、システムが以前の安定バージョンへ自動的に復元される"
      },
      {
        "vi": "Số lượng dòng code thay đổi trong commit",
        "en": "The number of lines of code changed in the commit",
        "ja": "コミットで変更されたコード行数"
      },
      {
        "vi": "Thời gian build vượt quá 5 phút",
        "en": "The build time exceeding 5 minutes",
        "ja": "ビルド時間が5分を超えること"
      },
      {
        "vi": "Số lượng reviewer duyệt Pull Request",
        "en": "The number of reviewers who approved the Pull Request",
        "ja": "プルリクエストを承認したレビュアーの数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rollback tự động thường được kích hoạt khi smoke test hoặc health check sau deploy phát hiện lỗi nghiêm trọng, hệ thống sẽ tự khôi phục về bản trước đó để giảm downtime.",
      "en": "Automatic rollback is typically triggered when post-deployment smoke tests or health checks detect a critical failure, causing the system to restore the previous version and minimize downtime.",
      "ja": "自動ロールバックは通常、デプロイ後のスモークテストやヘルスチェックが重大な障害を検出した際に起動され、システムはダウンタイムを最小化するために以前のバージョンへ復元します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Từ khóa \"needs\" trong GitHub Actions workflow dùng để làm gì?",
      "en": "What is the \"needs\" keyword used for in a GitHub Actions workflow?",
      "ja": "GitHub Actionsワークフローにおける「needs」キーワードは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Khai báo biến môi trường bí mật",
        "en": "Declare secret environment variables",
        "ja": "シークレットの環境変数を宣言する"
      },
      {
        "vi": "Thiết lập thứ tự phụ thuộc giữa các job, job sau chỉ chạy khi job trước (được liệt kê trong needs) hoàn thành thành công",
        "en": "Establish dependency order between jobs, so a job only runs after the jobs listed in needs have completed successfully",
        "ja": "ジョブ間の依存関係を設定し、needsに列挙されたジョブが正常に完了した後にのみ後続のジョブを実行する"
      },
      {
        "vi": "Giới hạn thời gian chạy tối đa của workflow",
        "en": "Limit the maximum runtime of the workflow",
        "ja": "ワークフローの最大実行時間を制限する"
      },
      {
        "vi": "Chỉ định runner sử dụng hệ điều hành nào",
        "en": "Specify which operating system the runner should use",
        "ja": "ランナーが使用するOSを指定する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "needs khai báo job hiện tại phụ thuộc vào một hoặc nhiều job khác, đảm bảo thứ tự thực thi hợp lý, ví dụ job deploy chỉ chạy sau khi job test đã pass.",
      "en": "needs declares that the current job depends on one or more other jobs, ensuring correct execution order, e.g. a deploy job only runs after the test job has passed.",
      "ja": "needsは現在のジョブが1つ以上の他のジョブに依存することを宣言し、正しい実行順序を保証します。例えば、testジョブが成功した後にのみdeployジョブが実行されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong triển khai blue-green deployment, automation test thường được thực thi ở giai đoạn nào để đảm bảo an toàn?",
      "en": "In a blue-green deployment, at what stage is automation testing typically executed to ensure safety?",
      "ja": "ブルーグリーンデプロイメントにおいて、安全性を確保するために自動化テストは通常どの段階で実行されますか?"
    },
    "options": [
      {
        "vi": "Chỉ chạy trước khi code được commit",
        "en": "Only run before the code is committed",
        "ja": "コードがコミットされる前にのみ実行する"
      },
      {
        "vi": "Không cần chạy test vì blue-green tự động đảm bảo chất lượng",
        "en": "No testing is needed since blue-green automatically ensures quality",
        "ja": "ブルーグリーンは品質を自動的に保証するためテストは不要である"
      },
      {
        "vi": "Chạy trên môi trường \"green\" (phiên bản mới) trước khi chuyển traffic sang, nhằm xác nhận hoạt động đúng trước khi thay thế môi trường \"blue\" đang phục vụ người dùng",
        "en": "Run on the \"green\" environment (the new version) before switching traffic to it, to confirm correct behavior before replacing the \"blue\" environment currently serving users",
        "ja": "トラフィックを切り替える前に「green」環境(新バージョン)でテストを実行し、ユーザーにサービスを提供している「blue」環境を置き換える前に正常動作を確認する"
      },
      {
        "vi": "Chạy sau khi đã xóa hoàn toàn môi trường \"blue\"",
        "en": "Run only after the \"blue\" environment has been completely removed",
        "ja": "「blue」環境を完全に削除した後にのみ実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong blue-green deployment, automation test được chạy trên môi trường green (bản mới) trước khi chuyển hướng traffic, nhằm phát hiện lỗi trước khi người dùng thực sự bị ảnh hưởng, giữ blue làm phương án dự phòng.",
      "en": "In blue-green deployment, automation tests run against the green environment (the new version) before traffic is switched, catching issues before real users are affected, while blue remains as a fallback.",
      "ja": "ブルーグリーンデプロイメントでは、トラフィックを切り替える前にgreen環境(新バージョン)に対して自動テストを実行し、実際のユーザーに影響が出る前に問題を検出します。blue環境はフォールバックとして維持されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi hai test case chạy song song cùng ghi vào một biến toàn cục hoặc file chung khiến kết quả kiểm thử thay đổi ngẫu nhiên giữa các lần chạy, đây là biểu hiện của loại lỗi nào?",
      "en": "When two test cases running in parallel both write to a shared global variable or file, causing results to change randomly between runs, this is a symptom of which type of issue?",
      "ja": "並列実行される2つのテストケースが同じグローバル変数や共有ファイルに書き込み、実行のたびに結果がランダムに変わる場合、これは何の兆候か。"
    },
    "options": [
      {
        "vi": "Sai phiên bản trình duyệt",
        "en": "Wrong browser version",
        "ja": "ブラウザのバージョン違い"
      },
      {
        "vi": "Lỗi cú pháp trong script test",
        "en": "Syntax error in the test script",
        "ja": "テストスクリプトの構文エラー"
      },
      {
        "vi": "Thiếu quyền truy cập database",
        "en": "Missing database access permission",
        "ja": "データベースへのアクセス権限不足"
      },
      {
        "vi": "Race condition (tranh chấp tài nguyên dùng chung)",
        "en": "Race condition (contention over shared resources)",
        "ja": "レースコンディション(共有リソースの競合)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhiều tiến trình/luồng cùng đọc-ghi một tài nguyên dùng chung mà không có cơ chế đồng bộ sẽ dẫn đến kết quả không nhất quán, đặc trưng của race condition.",
      "en": "Multiple processes/threads reading and writing the same shared resource without synchronization produce inconsistent results, which is the hallmark of a race condition.",
      "ja": "複数のプロセス・スレッドが同期機構なしに同じ共有リソースを読み書きすると結果が不安定になり、これがレースコンディションの特徴である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một bộ test chạy PASS khi thực thi tuần tự nhưng FAIL khi chạy theo thứ tự ngẫu nhiên (random order). Nguyên nhân phổ biến nhất là gì?",
      "en": "A test suite passes when run sequentially but fails when run in random order. What is the most common cause?",
      "ja": "順番通りに実行するとPASSするが、ランダムな順序で実行するとFAILするテストスイート。最も一般的な原因は何か。"
    },
    "options": [
      {
        "vi": "Các test phụ thuộc trạng thái do test trước để lại (test order dependency)",
        "en": "Tests depend on state left behind by a previous test (test order dependency)",
        "ja": "前のテストが残した状態に依存している(テスト順序依存)"
      },
      {
        "vi": "Trình duyệt bị lỗi driver",
        "en": "Browser driver crashed",
        "ja": "ブラウザドライバーの不具合"
      },
      {
        "vi": "Mạng internet chậm",
        "en": "Slow internet connection",
        "ja": "インターネット接続が遅い"
      },
      {
        "vi": "Server chưa khởi động xong",
        "en": "The server hasn't finished starting up",
        "ja": "サーバーの起動が完了していない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi test không tự thiết lập trạng thái ban đầu mà ngầm dựa vào dữ liệu/trạng thái do test khác tạo ra trước đó, đổi thứ tự chạy sẽ làm lộ ra sự phụ thuộc này và gây fail.",
      "en": "If tests implicitly rely on state or data created by another test rather than setting up their own, changing execution order exposes the hidden dependency and causes failures.",
      "ja": "テストが自身で初期状態を用意せず、他のテストが作った状態やデータに暗黙的に依存していると、実行順序を変えた際にその依存関係が露見して失敗する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Bật tính năng tự động retry (ví dụ chạy lại 3 lần) cho test thất bại trong CI có rủi ro lớn nhất nào?",
      "en": "Enabling automatic retry (e.g., re-running a failed test 3 times) in CI carries what major risk?",
      "ja": "CIで失敗したテストを自動的に再実行する(例:3回まで再試行)機能を有効にする最大のリスクは何か。"
    },
    "options": [
      {
        "vi": "Làm CI chạy nhanh hơn quá mức cần thiết",
        "en": "Making CI run unnecessarily faster",
        "ja": "CIの実行が必要以上に速くなること"
      },
      {
        "vi": "Che giấu lỗi thật của sản phẩm bằng cách coi nó là flaky, khiến bug thực sự lọt qua",
        "en": "Masking real product defects as flakiness, allowing genuine bugs to slip through",
        "ja": "実際の製品不具合をフレーキーとして隠蔽し、本物のバグを見逃してしまうこと"
      },
      {
        "vi": "Tăng chi phí lưu trữ log",
        "en": "Increasing log storage cost",
        "ja": "ログ保存コストの増加"
      },
      {
        "vi": "Làm giảm số lượng test case trong bộ test",
        "en": "Reducing the number of test cases in the suite",
        "ja": "テストスイート内のテストケース数が減ること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Nếu lạm dụng retry mà không điều tra nguyên nhân gốc, một lỗi thực sự (regression) có thể đôi khi pass ngẫu nhiên và bị coi nhầm là flaky, khiến đội ngũ bỏ sót bug.",
      "en": "If retries are overused without root-cause investigation, a genuine regression that occasionally passes by chance may be mistaken for flakiness, letting real bugs go unnoticed.",
      "ja": "根本原因を調査せずリトライを乱用すると、本物の不具合がたまたまPASSしてフレーキーだと誤認され、実際のバグが見逃されてしまう。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Chiến lược \"quarantine\" (cách ly) test flaky trong CI/CD nghĩa là gì?",
      "en": "What does the \"quarantine\" strategy for flaky tests in CI/CD mean?",
      "ja": "CI/CDにおけるフレーキーテストの「隔離(quarantine)」戦略とは何を意味するか。"
    },
    "options": [
      {
        "vi": "Xóa vĩnh viễn test đó khỏi bộ test",
        "en": "Permanently deleting the test from the suite",
        "ja": "そのテストをスイートから完全に削除すること"
      },
      {
        "vi": "Chạy test đó chỉ vào cuối tuần",
        "en": "Running that test only on weekends",
        "ja": "そのテストを週末だけ実行すること"
      },
      {
        "vi": "Tách test flaky vào một nhóm riêng, không chặn build chính, nhưng vẫn theo dõi để sửa",
        "en": "Moving the flaky test into a separate group that doesn't block the main build, while still tracking it for a fix",
        "ja": "フレーキーテストを別グループに分離してメインビルドをブロックしないようにしつつ、修正のために追跡し続けること"
      },
      {
        "vi": "Tăng timeout của test lên vô hạn",
        "en": "Setting the test's timeout to infinite",
        "ja": "そのテストのタイムアウトを無限に設定すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Quarantine giúp tránh làm gián đoạn pipeline vì test không ổn định, đồng thời vẫn đảm bảo có trách nhiệm theo dõi và khắc phục thay vì bỏ quên hay xóa bỏ.",
      "en": "Quarantining prevents unstable tests from blocking the pipeline while still ensuring accountability to track and fix them, rather than ignoring or deleting them.",
      "ja": "隔離により不安定なテストがパイプラインを止めるのを防ぎつつ、無視や削除ではなく追跡・修正の責任を維持できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Test tự động gọi trực tiếp API bên thứ ba (ví dụ cổng thanh toán thật) và thỉnh thoảng fail vì dịch vụ đó chậm hoặc downtime. Giải pháp phù hợp nhất để giảm flaky là gì?",
      "en": "An automated test calls a real third-party API (e.g., a live payment gateway) directly and occasionally fails due to that service's latency or downtime. What is the most appropriate fix to reduce flakiness?",
      "ja": "自動テストが実際のサードパーティAPI(例:本物の決済ゲートウェイ)を直接呼び出しており、そのサービスの遅延やダウンタイムでときどき失敗する。フレーキーさを減らす最適な解決策は何か。"
    },
    "options": [
      {
        "vi": "Tăng số lần retry lên 20 lần",
        "en": "Increase the retry count to 20",
        "ja": "リトライ回数を20回に増やす"
      },
      {
        "vi": "Xóa test đó vì không quan trọng",
        "en": "Delete the test since it's unimportant",
        "ja": "重要でないのでそのテストを削除する"
      },
      {
        "vi": "Chạy test đó vào ban đêm khi ít traffic",
        "en": "Run that test at night when traffic is low",
        "ja": "トラフィックが少ない夜間にそのテストを実行する"
      },
      {
        "vi": "Mock/stub dịch vụ bên thứ ba trong môi trường test để kiểm soát phản hồi",
        "en": "Mock/stub the third-party service in the test environment to control its responses",
        "ja": "テスト環境でサードパーティサービスをモック/スタブ化し、応答を制御する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mock/stub loại bỏ sự phụ thuộc vào tính sẵn sàng và độ trễ của hệ thống bên ngoài mà vẫn kiểm chứng được logic xử lý phía ứng dụng một cách ổn định.",
      "en": "Mocking/stubbing removes dependency on the external system's availability and latency while still reliably verifying the application's handling logic.",
      "ja": "モック/スタブ化により外部システムの可用性や遅延への依存をなくしつつ、アプリケーション側の処理ロジックを安定して検証できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong kiểm thử tự động, việc mỗi test tự tạo dữ liệu riêng (ví dụ user với email random/UUID) thay vì dùng chung một bản ghi cố định trong DB nhằm mục đích gì?",
      "en": "In test automation, having each test create its own data (e.g., a user with a random email/UUID) instead of sharing a fixed DB record serves what purpose?",
      "ja": "テスト自動化において、各テストが固定のDBレコードを共有せず、自身でデータ(例:ランダムなメール/UUIDを持つユーザー)を作成するのは何のためか。"
    },
    "options": [
      {
        "vi": "Đảm bảo cô lập dữ liệu (data isolation), tránh xung đột khi nhiều test/luồng chạy song song",
        "en": "Ensure data isolation, avoiding conflicts when multiple tests/threads run in parallel",
        "ja": "複数のテスト/スレッドが並列実行される際の衝突を避け、データの分離(データアイソレーション)を確保するため"
      },
      {
        "vi": "Giảm dung lượng lưu trữ database",
        "en": "Reduce database storage usage",
        "ja": "データベースのストレージ使用量を減らすため"
      },
      {
        "vi": "Giúp test chạy chậm hơn để dễ debug",
        "en": "Make tests run slower for easier debugging",
        "ja": "デバッグしやすいようテストを遅くするため"
      },
      {
        "vi": "Tuân thủ chuẩn code style của dự án",
        "en": "Comply with the project's code style standard",
        "ja": "プロジェクトのコードスタイル規約に従うため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nếu nhiều test dùng chung một bản ghi cố định, chạy song song sẽ dẫn tới xung đột đọc/ghi hoặc test này ảnh hưởng dữ liệu của test khác; tạo dữ liệu riêng biệt cho từng test giúp cô lập hoàn toàn.",
      "en": "If multiple tests share one fixed record, parallel execution causes read/write conflicts or one test altering another's data; creating unique data per test achieves full isolation.",
      "ja": "複数のテストが同じ固定レコードを共有すると、並列実行で読み書きの衝突や他テストのデータへの影響が生じる。テストごとに固有のデータを作成することで完全な分離が実現する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Playwright và Cypress có cơ chế \"auto-waiting/retry-ability\" cho assertion (tự động chờ và thử lại việc kiểm tra điều kiện trước khi báo fail). Cơ chế này giúp giảm flaky test chủ yếu bằng cách nào?",
      "en": "Playwright and Cypress have an \"auto-waiting/retry-ability\" mechanism for assertions (automatically waiting and re-checking a condition before failing). How does this mechanism mainly reduce flaky tests?",
      "ja": "PlaywrightやCypressにはアサーションの「自動待機/リトライ機能」(失敗と判定する前に条件を自動的に待って再チェックする)がある。この仕組みは主にどのようにフレーキーテストを減らすか。"
    },
    "options": [
      {
        "vi": "Tự động sửa lỗi logic trong code ứng dụng",
        "en": "Automatically fixing logic bugs in the application code",
        "ja": "アプリケーションコードのロジックバグを自動修正することで"
      },
      {
        "vi": "Liên tục kiểm tra điều kiện trong một khoảng thời gian thay vì đánh giá một lần duy nhất ngay khi phần tử chưa kịp render/cập nhật",
        "en": "Continuously re-checking the condition over a time window instead of evaluating once immediately, before the element has finished rendering/updating",
        "ja": "要素のレンダリング/更新が完了する前に一度だけ評価するのではなく、一定時間にわたって条件を継続的に再チェックすることで"
      },
      {
        "vi": "Bỏ qua hoàn toàn các assertion bị fail",
        "en": "Completely skipping any failing assertions",
        "ja": "失敗したアサーションを完全に無視することで"
      },
      {
        "vi": "Chạy test trên nhiều trình duyệt cùng lúc",
        "en": "Running the test on multiple browsers simultaneously",
        "ja": "複数ブラウザで同時にテストを実行することで"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thay vì kiểm tra một lần rồi fail ngay nếu DOM chưa cập nhật kịp do async/animation, assertion được thử lại nhiều lần trong một khoảng thời gian cho tới khi đúng hoặc hết timeout, giúp giảm fail giả do timing.",
      "en": "Instead of checking once and failing immediately if the DOM hasn't updated yet due to async behavior/animation, the assertion is retried repeatedly within a time window until it passes or times out, reducing false failures caused by timing.",
      "ja": "非同期処理やアニメーションによりDOMがまだ更新されていない状態で一度だけチェックして即座に失敗させるのではなく、成功するかタイムアウトするまで一定時間内でアサーションを繰り返し再試行することで、タイミングによる偽の失敗を減らす。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi dùng plugin retry (như pytest-rerunfailures hoặc jest.retryTimes) để chạy lại test fail, thực hành TỐT NHẤT đi kèm là gì?",
      "en": "When using a retry plugin (such as pytest-rerunfailures or jest.retryTimes) to re-run failing tests, what best practice should accompany it?",
      "ja": "pytest-rerunfailuresやjest.retryTimesのようなリトライプラグインを使って失敗したテストを再実行する場合、併せて行うべきベストプラクティスは何か。"
    },
    "options": [
      {
        "vi": "Xóa test khỏi báo cáo nếu nó cần retry",
        "en": "Remove the test from the report if it needed a retry",
        "ja": "リトライが必要だったテストはレポートから削除する"
      },
      {
        "vi": "Tắt toàn bộ log của CI để chạy nhanh hơn",
        "en": "Disable all CI logs to run faster",
        "ja": "実行を速くするためにCIのログをすべて無効化する"
      },
      {
        "vi": "Ghi log/báo cáo riêng số lần test cần retry mới pass, để theo dõi và ưu tiên sửa các test flaky nhất",
        "en": "Separately log/report how many retries each test needed to pass, to track and prioritize fixing the flakiest tests",
        "ja": "各テストがPASSするまでに何回リトライが必要だったかを別途ログ/レポートし、最もフレーキーなテストの追跡・優先修正に役立てる"
      },
      {
        "vi": "Retry vô hạn lần cho tới khi pass",
        "en": "Retry an unlimited number of times until it passes",
        "ja": "PASSするまで無制限にリトライする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Retry chỉ nên là biện pháp tạm thời để pipeline không bị chặn; việc ghi nhận và báo cáo tỉ lệ retry giúp đội ngũ nhận diện và ưu tiên khắc phục gốc rễ các test kém ổn định nhất.",
      "en": "Retries should only be a stopgap so the pipeline isn't blocked; logging and reporting retry rates helps the team identify and prioritize root-cause fixes for the least stable tests.",
      "ja": "リトライはパイプラインを止めないための一時的な措置に過ぎない。リトライ率を記録・レポートすることで、チームは最も不安定なテストを特定し根本修正を優先できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một test UI thường xuyên fail vì phần tử vẫn còn đang trong hiệu ứng chuyển động (CSS transition/animation) khi Selenium cố click vào nó. Đây thuộc nhóm nguyên nhân flaky nào?",
      "en": "A UI test frequently fails because an element is still mid CSS transition/animation when Selenium tries to click it. Which category of flaky-test cause does this belong to?",
      "ja": "SeleniumがクリックしようとしたときにCSSトランジション/アニメーションの途中である要素に対してUIテストが頻繁に失敗する。これはどのフレーキーテスト原因のカテゴリに属するか。"
    },
    "options": [
      {
        "vi": "Thiếu quyền hệ điều hành",
        "en": "Missing OS-level permissions",
        "ja": "OSレベルの権限不足"
      },
      {
        "vi": "Lỗi cấu hình mạng",
        "en": "Network configuration error",
        "ja": "ネットワーク設定の誤り"
      },
      {
        "vi": "Sai dữ liệu test",
        "en": "Incorrect test data",
        "ja": "テストデータの誤り"
      },
      {
        "vi": "Vấn đề timing/đồng bộ hóa giữa UI và test script",
        "en": "Timing/synchronization issue between the UI and the test script",
        "ja": "UIとテストスクリプト間のタイミング/同期の問題"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là lỗi timing kinh điển: phần tử tồn tại trong DOM nhưng chưa ổn định về vị trí/trạng thái tương tác được do animation, dẫn đến thao tác click thất bại ngẫu nhiên tùy tốc độ máy.",
      "en": "This is a classic timing issue: the element exists in the DOM but is not yet stable/interactable due to the animation, causing the click to intermittently fail depending on machine speed.",
      "ja": "これは典型的なタイミングの問題である。要素はDOM上に存在するが、アニメーションのためまだ安定・操作可能な状態になっておらず、マシンの速度によってクリックが断続的に失敗する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi kiểm tra thao tác nghiệp vụ liên quan đến ngày hết hạn (ví dụ: gói học 30 ngày), test bị flaky vào cuối tháng do phép tính ngày tháng. Kỹ thuật nào giúp cô lập test khỏi ảnh hưởng của đồng hồ hệ thống thực?",
      "en": "When testing business logic involving an expiry date (e.g., a 30-day course package), the test becomes flaky near month-end due to date arithmetic. What technique isolates the test from the real system clock?",
      "ja": "有効期限に関するビジネスロジック(例:30日間のコースパッケージ)をテストする際、月末付近で日付計算のためにテストがフレーキーになる。テストを実際のシステム時計の影響から分離する技術は何か。"
    },
    "options": [
      {
        "vi": "Freeze/mock thời gian hệ thống (ví dụ freezegun, sinon fake timers) trong test",
        "en": "Freeze/mock the system clock (e.g., freezegun, sinon fake timers) in the test",
        "ja": "テスト内でシステム時刻をフリーズ/モック化する(例:freezegun、sinonのfake timers)"
      },
      {
        "vi": "Tăng số CPU core cho máy chạy CI",
        "en": "Add more CPU cores to the CI machine",
        "ja": "CIマシンのCPUコア数を増やす"
      },
      {
        "vi": "Chạy lại test 10 lần liên tiếp",
        "en": "Re-run the test 10 times in a row",
        "ja": "テストを10回連続で再実行する"
      },
      {
        "vi": "Đổi tên biến trong test cho rõ ràng hơn",
        "en": "Rename variables in the test for clarity",
        "ja": "テスト内の変数名をわかりやすく変更する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đóng băng hoặc giả lập thời gian hệ thống giúp test luôn chạy với một mốc thời gian xác định, loại bỏ hoàn toàn ảnh hưởng của việc ngày thực tế thay đổi theo lịch.",
      "en": "Freezing or mocking system time ensures the test always runs against a fixed, known point in time, completely removing the effect of the real calendar date changing.",
      "ja": "システム時刻をフリーズまたはモック化することで、テストは常に固定された既知の時点で実行され、実際のカレンダー日付の変化による影響を完全に排除できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Đội automation nghi ngờ một test là flaky nhưng chưa chắc chắn. Cách tiếp cận đúng đắn nhất để xác nhận là gì?",
      "en": "The automation team suspects a test is flaky but isn't certain. What is the most correct approach to confirm this?",
      "ja": "自動化チームはあるテストがフレーキーではないかと疑っているが確信が持てない。これを確認する最も正しいアプローチは何か。"
    },
    "options": [
      {
        "vi": "Hỏi ý kiến người quản lý dự án",
        "en": "Ask the project manager for their opinion",
        "ja": "プロジェクトマネージャーに意見を聞く"
      },
      {
        "vi": "Chạy lại test đó nhiều lần liên tiếp (ví dụ 20-50 lần) trong cùng điều kiện để đo tỉ lệ pass/fail",
        "en": "Re-run that test many times consecutively (e.g., 20-50 times) under the same conditions to measure the pass/fail rate",
        "ja": "同じ条件下でそのテストを何度も連続実行し(例:20〜50回)、PASS/FAIL率を測定する"
      },
      {
        "vi": "Xóa test ngay lập tức để an toàn",
        "en": "Delete the test immediately to be safe",
        "ja": "安全のため直ちにテストを削除する"
      },
      {
        "vi": "Chuyển test đó sang manual test vĩnh viễn",
        "en": "Permanently convert it to a manual test",
        "ja": "そのテストを恒久的に手動テストに変更する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chạy lặp lại nhiều lần trong cùng môi trường là cách thực nghiệm khách quan để xác định tính không ổn định của test, phân biệt với lỗi thật (fail 100% có nguyên nhân rõ ràng).",
      "en": "Repeated execution under identical conditions is the objective, empirical way to confirm instability, distinguishing it from a genuine defect that fails consistently for a clear reason.",
      "ja": "同一環境での反復実行は、テストの不安定性を客観的・実証的に確認する方法であり、明確な原因で常に失敗する本物の不具合と区別できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Nhiều test tự động chạy song song trên cùng một máy đều cố gắng khởi động server ở cổng (port) 3000 cố định, gây lỗi \"port already in use\" ngẫu nhiên. Cách khắc phục căn cơ là gì?",
      "en": "Multiple automated tests running in parallel on the same machine all try to start a server on the same fixed port 3000, causing intermittent \"port already in use\" errors. What is the root fix?",
      "ja": "同じマシン上で並列実行される複数の自動テストが、いずれも固定のポート3000でサーバーを起動しようとし、間欠的に「port already in use」エラーが発生する。根本的な解決策は何か。"
    },
    "options": [
      {
        "vi": "Tăng RAM cho máy chạy test",
        "en": "Add more RAM to the test machine",
        "ja": "テスト実行マシンのRAMを増やす"
      },
      {
        "vi": "Giảm số lượng test case xuống còn 1",
        "en": "Reduce the number of test cases to just one",
        "ja": "テストケース数を1つに減らす"
      },
      {
        "vi": "Cấp phát cổng động (dynamic/random port) hoặc dùng container riêng cho từng tiến trình test",
        "en": "Allocate a dynamic/random port, or use a separate container per test process",
        "ja": "動的/ランダムなポートを割り当てるか、テストプロセスごとに個別のコンテナを使用する"
      },
      {
        "vi": "Tắt firewall trên máy CI",
        "en": "Disable the firewall on the CI machine",
        "ja": "CIマシンのファイアウォールを無効化する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nguyên nhân gốc là nhiều tiến trình tranh chấp cùng một tài nguyên cổng cố định; cấp phát cổng động cho mỗi tiến trình hoặc cô lập bằng container loại bỏ hoàn toàn xung đột.",
      "en": "The root cause is multiple processes contending for the same fixed port resource; assigning a dynamic port per process or isolating with containers eliminates the conflict entirely.",
      "ja": "根本原因は複数プロセスが同じ固定ポートというリソースを奪い合っていることであり、プロセスごとに動的ポートを割り当てるか、コンテナで分離することで衝突を完全に排除できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi phân loại (triage) một test fail trong CI, tiêu chí nào giúp phân biệt đây là test THẬT SỰ phát hiện bug, chứ không phải flaky?",
      "en": "When triaging a failing CI test, which criterion helps distinguish a test that has GENUINELY found a bug from one that is merely flaky?",
      "ja": "CIで失敗したテストをトリアージする際、そのテストが単なるフレーキーではなく本当にバグを検出したものであるかを見分ける基準は何か。"
    },
    "options": [
      {
        "vi": "Test đó có tên dài hay ngắn",
        "en": "Whether the test name is long or short",
        "ja": "テスト名が長いか短いか"
      },
      {
        "vi": "Test chạy vào giờ nào trong ngày",
        "en": "What time of day the test ran",
        "ja": "1日のうち何時にテストが実行されたか"
      },
      {
        "vi": "Test đó được viết bởi ai",
        "en": "Who wrote the test",
        "ja": "そのテストを誰が書いたか"
      },
      {
        "vi": "Fail có lặp lại nhất quán khi chạy lại trên cùng build/commit và có thể tái hiện bằng bước thao tác thủ công tương ứng",
        "en": "The failure reproduces consistently when re-run on the same build/commit, and can be reproduced manually via the corresponding steps",
        "ja": "同じビルド/コミットで再実行しても失敗が一貫して再現し、対応する手順を手動で行っても再現できるかどうか"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lỗi thật có tính tất định (deterministic): tái hiện ổn định trên cùng mã nguồn và có thể xác minh bằng thao tác thủ công, trong khi flaky test cho kết quả không nhất quán dù điều kiện giống hệt.",
      "en": "A genuine bug is deterministic — it reproduces reliably on the same codebase and can be verified manually — whereas a flaky test yields inconsistent results even under identical conditions.",
      "ja": "本物のバグは決定論的であり、同じコードベースで安定して再現し、手動でも検証できる。一方フレーキーテストは同じ条件でも結果が一貫しない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong test API tự động hóa với database dùng chung giữa các test, kỹ thuật nào giúp mỗi test kết thúc mà không để lại dữ liệu ảnh hưởng test sau (rollback)?",
      "en": "In automated API testing that shares a database across tests, which technique ensures each test finishes without leaving behind data that affects subsequent tests (rollback)?",
      "ja": "テスト間でデータベースを共有する自動化APIテストにおいて、各テストが終了時に後続テストへ影響を与えるデータを残さないようにする(ロールバック)技術は何か。"
    },
    "options": [
      {
        "vi": "Bọc mỗi test trong một transaction và rollback sau khi test kết thúc",
        "en": "Wrap each test in a database transaction and roll it back after the test finishes",
        "ja": "各テストをデータベーストランザクションでラップし、テスト終了後にロールバックする"
      },
      {
        "vi": "Tắt hẳn database trong lúc test",
        "en": "Turn off the database entirely during testing",
        "ja": "テスト中にデータベースを完全にオフにする"
      },
      {
        "vi": "Chạy tất cả test trong một transaction duy nhất và commit ở cuối",
        "en": "Run all tests inside a single transaction and commit at the end",
        "ja": "すべてのテストを1つのトランザクションで実行し、最後にコミットする"
      },
      {
        "vi": "Xóa toàn bộ database sau mỗi lần chạy CI",
        "en": "Delete the entire database after every CI run",
        "ja": "CI実行のたびにデータベース全体を削除する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mỗi test tự mở transaction riêng và rollback khi xong đảm bảo mọi thay đổi dữ liệu chỉ tồn tại trong phạm vi test đó, giữ database sạch cho các test tiếp theo mà không cần dọn dẹp thủ công tốn thời gian.",
      "en": "Each test opening its own transaction and rolling it back afterward ensures data changes stay scoped to that test, keeping the database clean for subsequent tests without costly manual cleanup.",
      "ja": "各テストが独自にトランザクションを開始しテスト後にロールバックすることで、データ変更はそのテストの範囲内にとどまり、手間のかかる手動クリーンアップなしにデータベースを次のテストのためにクリーンな状態に保てる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Đâu là ví dụ điển hình của lỗi \"StaleElementReferenceException\" trong Selenium, một nguyên nhân phổ biến gây flaky test?",
      "en": "Which is a classic example of a \"StaleElementReferenceException\" in Selenium, a common cause of flaky tests?",
      "ja": "フレーキーテストの一般的な原因であるSeleniumの「StaleElementReferenceException」の典型的な例はどれか。"
    },
    "options": [
      {
        "vi": "Sai mật khẩu đăng nhập trong dữ liệu test",
        "en": "Wrong login password in the test data",
        "ja": "テストデータのログインパスワードが間違っている"
      },
      {
        "vi": "Trang bị load lại/re-render sau khi đã tìm được element, khiến tham chiếu element cũ không còn hợp lệ trong DOM",
        "en": "The page reloads/re-renders after the element was located, so the old element reference is no longer valid in the DOM",
        "ja": "要素を取得した後にページがリロード/再レンダリングされ、古い要素参照がDOM上で無効になる"
      },
      {
        "vi": "Server trả về mã lỗi 500",
        "en": "The server returns a 500 error code",
        "ja": "サーバーが500エラーコードを返す"
      },
      {
        "vi": "File cấu hình test bị thiếu",
        "en": "The test configuration file is missing",
        "ja": "テスト設定ファイルが欠落している"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "StaleElementReferenceException xảy ra khi tham chiếu tới một node DOM đã được tìm thấy trước đó, nhưng DOM đã thay đổi (re-render, AJAX cập nhật) khiến node đó bị gỡ bỏ hoặc thay thế, tham chiếu cũ không còn dùng được.",
      "en": "This exception occurs when a reference to a previously located DOM node becomes invalid because the DOM has since changed (re-render, AJAX update), detaching or replacing that node.",
      "ja": "この例外は、以前に取得したDOMノードへの参照が、その後のDOM変化(再レンダリングやAJAX更新)によりそのノードが削除・置換されて無効になった際に発生する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một test tự động luôn PASS khi chạy trên máy local (chế độ headful, có giao diện) nhưng thường xuyên FAIL khi chạy trên CI (chế độ headless). Đây là nguyên nhân flaky thuộc nhóm nào?",
      "en": "An automated test always passes locally in headful mode but frequently fails on CI in headless mode. What category of flaky-test cause is this?",
      "ja": "自動テストがローカル(GUIありのheadfulモード)では常にPASSするが、CI(headlessモード)では頻繁にFAILする。これはどのフレーキーテスト原因のカテゴリか。"
    },
    "options": [
      {
        "vi": "Sai locator hoàn toàn",
        "en": "Completely incorrect locator",
        "ja": "完全に誤ったロケーター"
      },
      {
        "vi": "Lỗi cú pháp JavaScript",
        "en": "JavaScript syntax error",
        "ja": "JavaScriptの構文エラー"
      },
      {
        "vi": "Sự khác biệt về môi trường thực thi (environment inconsistency)",
        "en": "Environment inconsistency between execution contexts",
        "ja": "実行環境間の不整合(environment inconsistency)"
      },
      {
        "vi": "Thiếu unit test",
        "en": "Missing unit tests",
        "ja": "ユニットテストの不足"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Headless và headful có thể khác nhau về kích thước viewport, tốc độ render, hoặc hành vi một số API trình duyệt, dẫn đến kết quả không nhất quán giữa hai môi trường — đặc trưng của lỗi do khác biệt môi trường.",
      "en": "Headless and headful modes can differ in viewport size, rendering speed, or behavior of certain browser APIs, leading to inconsistent results between environments — a hallmark of environment inconsistency.",
      "ja": "headlessモードとheadfulモードではビューポートサイズ、レンダリング速度、一部のブラウザAPIの挙動が異なることがあり、環境間で結果が不一致になる。これは環境不整合の典型例である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi phát hiện một test flaky do timing, hành động nào là ưu tiên ĐÚNG ĐẮN nhất trước khi nghĩ tới việc thêm retry?",
      "en": "When a timing-related flaky test is discovered, what is the correct top priority action before resorting to adding a retry?",
      "ja": "タイミングに起因するフレーキーテストが見つかった場合、リトライを追加する前に取るべき最も正しい優先アクションは何か。"
    },
    "options": [
      {
        "vi": "Đổi framework test sang framework khác ngay lập tức",
        "en": "Immediately switch to a different test framework",
        "ja": "直ちに別のテストフレームワークに切り替える"
      },
      {
        "vi": "Xóa toàn bộ assertion trong test",
        "en": "Delete all assertions in the test",
        "ja": "テスト内のすべてのアサーションを削除する"
      },
      {
        "vi": "Tăng gấp đôi số lượng test case tương tự",
        "en": "Double the number of similar test cases",
        "ja": "類似のテストケース数を倍にする"
      },
      {
        "vi": "Điều tra và sửa nguyên nhân gốc (ví dụ dùng wait điều kiện thay vì sleep cứng, đồng bộ đúng trạng thái ứng dụng)",
        "en": "Investigate and fix the root cause (e.g., use conditional waits instead of relying on retries, and properly synchronize with application state)",
        "ja": "根本原因を調査して修正する(例:リトライに頼るのではなく条件付き待機を使用し、アプリケーションの状態と適切に同期させる)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Retry chỉ che giấu triệu chứng và làm chậm phản hồi; ưu tiên hàng đầu luôn là tìm và sửa nguyên nhân gốc để test ổn định thực sự, đảm bảo độ tin cậy lâu dài của bộ test.",
      "en": "Retries only mask the symptom and slow feedback; the top priority is always to find and fix the root cause so the test becomes genuinely stable, ensuring long-term suite reliability.",
      "ja": "リトライは症状を覆い隠すだけでフィードバックを遅らせる。最優先すべきは常に根本原因を見つけて修正し、テストを本当に安定させ、テストスイートの長期的な信頼性を確保することである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Ephemeral test environment (môi trường test tạm thời, được tạo mới và hủy sau mỗi lần chạy, ví dụ qua Testcontainers/Docker) giúp giảm flaky test chủ yếu nhờ điều gì?",
      "en": "An ephemeral test environment (spun up fresh and torn down after each run, e.g., via Testcontainers/Docker) mainly reduces flaky tests through what?",
      "ja": "エフェメラルなテスト環境(実行のたびに新規作成され破棄される。例:Testcontainers/Docker)が主にどのようにフレーキーテストを減らすか。"
    },
    "options": [
      {
        "vi": "Đảm bảo mỗi lần chạy bắt đầu từ trạng thái sạch, không bị ảnh hưởng bởi dữ liệu/rác còn sót lại từ lần chạy trước",
        "en": "Ensuring each run starts from a clean state, unaffected by leftover data/artifacts from previous runs",
        "ja": "実行のたびにクリーンな状態から開始し、前回の実行で残ったデータ/残留物の影響を受けないようにするため"
      },
      {
        "vi": "Làm giảm số dòng code cần viết cho test",
        "en": "Reducing the number of lines of test code needed",
        "ja": "テストコードの行数を減らすため"
      },
      {
        "vi": "Giúp lập trình viên không cần viết assertion",
        "en": "Allowing developers to skip writing assertions",
        "ja": "開発者がアサーションを書かなくてよくなるため"
      },
      {
        "vi": "Tăng tốc độ mạng nội bộ",
        "en": "Speeding up the internal network",
        "ja": "社内ネットワークの速度を上げるため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì môi trường được dựng mới hoàn toàn và hủy đi ngay sau đó, các lần chạy hoàn toàn độc lập với nhau, loại bỏ vấn đề trạng thái tồn dư (leftover state) — một nguyên nhân lớn của flaky test.",
      "en": "Because the environment is freshly created and destroyed right after, each run is fully independent, eliminating leftover-state issues — a major source of flaky tests.",
      "ja": "環境が毎回新しく作成され直後に破棄されるため、各実行は完全に独立しており、フレーキーテストの大きな原因である残留状態の問題を排除できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Đội ngũ QA theo dõi \"flaky test rate\" (tỉ lệ % test không nhất quán trên tổng số lần chạy) như một chỉ số sức khỏe CI. Mục đích chính của chỉ số này là gì?",
      "en": "A QA team tracks the \"flaky test rate\" (percentage of inconsistent test results across runs) as a CI health metric. What is the main purpose of this metric?",
      "ja": "QAチームがCIの健全性指標として「フレーキーテスト率」(実行全体に対する結果不一致テストの割合)を追跡している。この指標の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Đo tốc độ gõ code của lập trình viên",
        "en": "Measuring how fast developers type code",
        "ja": "開発者のタイピング速度を測定するため"
      },
      {
        "vi": "Định lượng mức độ tin cậy của bộ test theo thời gian, giúp ưu tiên đầu tư khắc phục và cảnh báo sớm khi chất lượng suy giảm",
        "en": "Quantifying the reliability of the test suite over time, helping prioritize remediation efforts and providing early warning when quality degrades",
        "ja": "テストスイートの信頼性を時系列で定量化し、修正への投資優先度付けや品質低下の早期警告に役立てるため"
      },
      {
        "vi": "Thay thế hoàn toàn cho code coverage",
        "en": "Fully replacing code coverage as a metric",
        "ja": "コードカバレッジを完全に置き換えるため"
      },
      {
        "vi": "Tính lương thưởng cho đội QA",
        "en": "Calculating bonuses for the QA team",
        "ja": "QAチームの賞与を計算するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Theo dõi tỉ lệ flaky theo thời gian giúp đội ngũ nhận biết xu hướng suy giảm độ tin cậy của bộ test tự động, từ đó phân bổ nguồn lực sửa chữa hợp lý và duy trì niềm tin vào kết quả CI.",
      "en": "Tracking flakiness over time helps the team spot declining trust in the automated suite's reliability, allocate remediation resources appropriately, and maintain confidence in CI results.",
      "ja": "時系列でフレーキー率を追跡することで、チームは自動テストスイートの信頼性低下の傾向を把握し、適切に修正リソースを配分し、CI結果への信頼を維持できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong một bộ test E2E, test A tạo ra một user và KHÔNG xóa sau khi chạy xong; sau nhiều lần chạy, test B bị fail vì \"user đã tồn tại\" (duplicate email). Giải pháp bền vững nhất là gì?",
      "en": "In an E2E suite, test A creates a user and does NOT clean it up afterward; after many runs, test B fails with \"user already exists\" (duplicate email). What is the most durable fix?",
      "ja": "あるE2Eスイートで、テストAがユーザーを作成した後クリーンアップせず、何度も実行するうちにテストBが「ユーザーが既に存在する」(メール重複)で失敗するようになった。最も持続的な解決策は何か。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ bảng user trong production",
        "en": "Delete the entire user table in production",
        "ja": "本番環境のユーザーテーブルを丸ごと削除する"
      },
      {
        "vi": "Chạy test B trước test A",
        "en": "Run test B before test A",
        "ja": "テストBをテストAより先に実行する"
      },
      {
        "vi": "Thêm bước dọn dẹp (teardown) sau mỗi test và/hoặc sinh dữ liệu duy nhất (unique) cho mỗi lần chạy",
        "en": "Add a cleanup (teardown) step after each test and/or generate unique data for every run",
        "ja": "各テストの後にクリーンアップ(ティアダウン)手順を追加し、かつ/または実行ごとに一意なデータを生成する"
      },
      {
        "vi": "Comment tạm thời test B lại",
        "en": "Temporarily comment out test B",
        "ja": "テストBを一時的にコメントアウトする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kết hợp teardown dọn dẹp dữ liệu sau mỗi test và sinh dữ liệu duy nhất cho từng lần chạy giải quyết tận gốc vấn đề trùng lặp, không phụ thuộc vào thứ tự chạy test.",
      "en": "Combining post-test cleanup with unique data generation per run addresses the duplication problem at its root, independent of test execution order.",
      "ja": "テスト後のクリーンアップと実行ごとの一意なデータ生成を組み合わせることで、テストの実行順序に依存せず重複問題を根本的に解決できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh giữa \"implicit wait\" (chờ ngầm định, áp dụng toàn cục cho mọi thao tác tìm phần tử) và \"explicit wait\" (chờ tường minh, chờ một điều kiện cụ thể) trong Selenium, phát biểu nào ĐÚNG về ảnh hưởng tới flaky test?",
      "en": "Comparing \"implicit wait\" (a global wait applied to every element lookup) and \"explicit wait\" (waiting for a specific condition) in Selenium, which statement about their effect on flaky tests is TRUE?",
      "ja": "Seleniumにおける「暗黙的待機」(すべての要素検索にグローバルに適用される待機)と「明示的待機」(特定の条件を待つ)を比較した場合、フレーキーテストへの影響について正しい記述はどれか。"
    },
    "options": [
      {
        "vi": "Cả hai loại wait đều không liên quan gì đến flaky test",
        "en": "Neither type of wait has anything to do with flaky tests",
        "ja": "どちらの待機もフレーキーテストとは無関係である"
      },
      {
        "vi": "Implicit wait và explicit wait hoàn toàn giống nhau về cơ chế",
        "en": "Implicit wait and explicit wait work identically under the hood",
        "ja": "暗黙的待機と明示的待機は内部の仕組みが完全に同じである"
      },
      {
        "vi": "Implicit wait luôn nhanh hơn và ổn định hơn explicit wait trong mọi trường hợp",
        "en": "Implicit wait is always faster and more stable than explicit wait in every case",
        "ja": "暗黙的待機はあらゆる場合において明示的待機より常に高速で安定している"
      },
      {
        "vi": "Explicit wait thường đáng tin cậy hơn vì chờ đúng điều kiện cụ thể (ví dụ phần tử clickable) thay vì chỉ chờ phần tử tồn tại trong DOM",
        "en": "Explicit wait is generally more reliable because it waits for a specific condition (e.g., element clickable) rather than just waiting for the element to exist in the DOM",
        "ja": "明示的待機は、要素がDOMに存在することだけを待つのではなく、特定の条件(クリック可能であることなど)を待つため、一般的により信頼性が高い"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Implicit wait chỉ đảm bảo phần tử có mặt trong DOM, không đảm bảo nó đã tương tác được (visible, enabled, clickable); explicit wait cho phép chờ chính xác điều kiện cần thiết, giảm fail do thao tác quá sớm.",
      "en": "Implicit wait only ensures an element exists in the DOM, not that it's interactable (visible, enabled, clickable); explicit wait lets you wait precisely for the required condition, reducing failures from acting too early.",
      "ja": "暗黙的待機は要素がDOM上に存在することしか保証せず、操作可能(表示・有効・クリック可能)であることは保証しない。明示的待機は必要な条件を正確に待てるため、早すぎる操作による失敗を減らせる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một test mock interview tự động sinh câu hỏi theo thứ tự ngẫu nhiên bằng `Math.random()` không cố định seed, khiến kết quả test đôi khi khác nhau giữa các lần chạy dù logic đúng. Cách khắc phục nào phù hợp nhất để test có thể tái lập (reproducible)?",
      "en": "An automated mock-interview test randomizes question order using `Math.random()` without a fixed seed, so results sometimes differ between runs even though the logic is correct. What is the most appropriate fix to make the test reproducible?",
      "ja": "自動化されたモック面接テストが、シードを固定しない`Math.random()`で質問順序をランダム化しており、ロジックが正しくても実行のたびに結果が異なることがある。テストを再現可能にする最適な解決策は何か。"
    },
    "options": [
      {
        "vi": "Cố định seed ngẫu nhiên (fixed/deterministic seed) trong môi trường test để kết quả nhất quán giữa các lần chạy",
        "en": "Fix/set a deterministic random seed in the test environment so results are consistent across runs",
        "ja": "テスト環境で決定論的な(固定の)乱数シードを設定し、実行間で結果を一貫させる"
      },
      {
        "vi": "Bỏ hoàn toàn tính năng random khỏi ứng dụng thật",
        "en": "Remove randomization entirely from the production application",
        "ja": "本番アプリケーションからランダム化機能を完全に削除する"
      },
      {
        "vi": "Chạy test bằng tay thay vì tự động",
        "en": "Run the test manually instead of automating it",
        "ja": "自動化せず手動でテストを実行する"
      },
      {
        "vi": "Tăng timeout của test lên gấp 10 lần",
        "en": "Increase the test timeout by 10x",
        "ja": "テストのタイムアウトを10倍に増やす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Việc cố định seed cho bộ sinh số ngẫu nhiên trong môi trường test giúp chuỗi \"ngẫu nhiên\" trở nên tất định và lặp lại được, cho phép test kiểm chứng logic ổn định mà vẫn giữ nguyên hành vi random ở production.",
      "en": "Fixing the random-number generator's seed in the test environment makes the \"random\" sequence deterministic and repeatable, letting the test reliably verify logic while production keeps genuine randomness.",
      "ja": "テスト環境で乱数生成器のシードを固定することで「ランダム」な系列が決定論的かつ再現可能になり、本番環境では本物のランダム性を保ちながらテストではロジックを安定して検証できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một microservice phụ thuộc (dependency service) trong môi trường staging thỉnh thoảng bị restart gây gián đoạn 5-10 giây, các test gọi tới nó bị fail ngẫu nhiên. Ngoài việc mock service, giải pháp bổ sung nào giúp test chịu lỗi tốt hơn mà KHÔNG che giấu lỗi thật?",
      "en": "When a dependency microservice in staging occasionally restarts causing a 5-10 second interruption, tests calling it fail intermittently. Besides mocking the service, what additional approach makes tests more resilient WITHOUT masking real bugs?",
      "ja": "ステージング環境の依存マイクロサービスが時々再起動して5〜10秒の中断が発生し、それを呼び出すテストが間欠的に失敗する。サービスをモック化する以外に、本物のバグを隠さずにテストの耐性を高める追加のアプローチは何か。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ test liên quan tới service đó",
        "en": "Delete all tests related to that service",
        "ja": "そのサービスに関連するテストをすべて削除する"
      },
      {
        "vi": "Thêm health-check/readiness check trước khi chạy test để đảm bảo dependency đã sẵn sàng, kết hợp timeout hợp lý cho lệnh gọi",
        "en": "Add a health-check/readiness check before running tests to confirm the dependency is ready, combined with a reasonable call timeout",
        "ja": "テスト実行前にヘルスチェック/レディネスチェックを追加して依存サービスの準備完了を確認し、適切な呼び出しタイムアウトと組み合わせる"
      },
      {
        "vi": "Tắt cảnh báo lỗi trong CI để không ai thấy fail",
        "en": "Disable CI failure alerts so no one sees the failures",
        "ja": "CIの失敗アラートを無効化して誰にも見えないようにする"
      },
      {
        "vi": "Chạy test song song nhiều hơn để bù lại thời gian mất",
        "en": "Run more tests in parallel to compensate for the lost time",
        "ja": "失われた時間を補うためにより多くのテストを並列実行する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm tra dependency đã sẵn sàng trước khi test chạy (readiness check) giải quyết đúng nguyên nhân môi trường chưa ổn định, trong khi vẫn giữ nguyên khả năng phát hiện lỗi thật của test, khác với việc mock hoàn toàn hoặc che giấu fail.",
      "en": "Verifying the dependency is ready before the test runs directly addresses the environment-instability root cause while preserving the test's ability to catch real bugs, unlike full mocking or hiding failures.",
      "ja": "テスト実行前に依存サービスの準備完了を確認することで、環境の不安定さという根本原因に直接対処しつつ、本物のバグを検出するテストの能力を維持できる。完全なモック化や失敗の隠蔽とは異なる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong báo cáo kết quả CI, một hệ thống theo dõi tự động gắn nhãn (tag) \"known flaky\" cho các test có lịch sử pass/fail xen kẽ không liên quan tới commit thay đổi gần nhất. Lợi ích chính của cơ chế này là gì?",
      "en": "In CI reporting, an automated tracking system tags tests with a history of alternating pass/fail unrelated to the latest commit changes as \"known flaky\". What is the main benefit of this mechanism?",
      "ja": "CIレポートにおいて、最新のコミット変更とは無関係にPASS/FAILを繰り返す履歴を持つテストに自動追跡システムが「known flaky(既知のフレーキー)」タグを付ける。この仕組みの主な利点は何か。"
    },
    "options": [
      {
        "vi": "Làm cho tất cả test luôn pass",
        "en": "Makes all tests always pass",
        "ja": "すべてのテストを常にPASSさせる"
      },
      {
        "vi": "Tự động sửa lỗi code không cần con người can thiệp",
        "en": "Automatically fixes the code without any human intervention",
        "ja": "人間の介入なしにコードを自動的に修正する"
      },
      {
        "vi": "Giúp reviewer/dev nhanh chóng phân biệt fail cần điều tra ngay với fail đã biết là không ổn định, tránh lãng phí thời gian điều tra sai hướng",
        "en": "Helps reviewers/developers quickly distinguish failures that need immediate investigation from ones already known to be unstable, avoiding wasted investigation effort",
        "ja": "レビュアー/開発者が、直ちに調査が必要な失敗と既知の不安定な失敗をすばやく区別できるようにし、誤った方向への調査時間の浪費を防ぐ"
      },
      {
        "vi": "Thay thế hoàn toàn quy trình code review",
        "en": "Completely replaces the code review process",
        "ja": "コードレビューのプロセスを完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Gắn nhãn known flaky là công cụ hỗ trợ triage, giúp đội ngũ tập trung điều tra các fail mới/bất thường thay vì mất thời gian với những test đã biết không ổn định, đồng thời vẫn duy trì hồ sơ để ưu tiên sửa sau.",
      "en": "Tagging known flaky tests is a triage aid, letting the team focus investigation on new/unusual failures instead of re-litigating already-known instability, while keeping a record to prioritize eventual fixes.",
      "ja": "known flakyタグは切り分け(トリアージ)を助けるツールであり、既知の不安定なテストに時間を割かず、新しい/異常な失敗の調査に集中できるようにする。同時に記録を残すことで最終的な修正の優先順位付けにも役立つ。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong thiết kế framework automation test theo hướng OOP, tính kế thừa (inheritance) thường được áp dụng như thế nào?",
      "en": "In OOP-based automation test framework design, how is inheritance typically applied?",
      "ja": "OOPベースの自動化テストフレームワーク設計において、継承(inheritance)は通常どのように適用されますか?"
    },
    "options": [
      {
        "vi": "Gộp tất cả bước kiểm thử của mọi màn hình vào một lớp duy nhất không phân cấp",
        "en": "Merge all test steps of every screen into a single flat class with no hierarchy",
        "ja": "すべての画面のテスト手順を階層のない単一クラスに統合する"
      },
      {
        "vi": "Xoá toàn bộ phương thức không dùng đến trong lớp cha để giảm dung lượng",
        "en": "Delete all unused methods in the parent class to reduce code size",
        "ja": "使用しないメソッドをすべて親クラスから削除してコード量を減らす"
      },
      {
        "vi": "Biến mọi biến cục bộ trong test thành biến static để dùng chung giữa các luồng",
        "en": "Turn every local test variable into a static variable shared across threads",
        "ja": "すべてのローカル変数をスレッド間で共有するstatic変数に変換する"
      },
      {
        "vi": "Tạo lớp BasePage/BaseTest chứa các phương thức chung để các lớp Page Object hoặc lớp test kế thừa lại",
        "en": "Create a BasePage/BaseTest class containing common methods that Page Object or test classes inherit from",
        "ja": "共通メソッドを含むBasePage/BaseTestクラスを作成し、Page Objectやテストクラスがそれを継承する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kế thừa giúp tái sử dụng logic chung (khởi tạo driver, wait, thao tác cơ bản) qua lớp cha, giảm trùng lặp code giữa các Page Object hoặc Test Class.",
      "en": "Inheritance enables reuse of common logic (driver setup, waits, base actions) via a parent class, reducing duplication across Page Objects or Test Classes.",
      "ja": "継承により、共通ロジック(ドライバー初期化、待機、基本操作)を親クラスで再利用でき、Page Objectやテストクラス間の重複を減らせる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Encapsulation (đóng gói) trong Page Object thường được thể hiện qua đặc điểm nào?",
      "en": "Encapsulation in a Page Object is typically reflected by which characteristic?",
      "ja": "Page Objectにおけるカプセル化は通常どのような特徴で表されますか?"
    },
    "options": [
      {
        "vi": "Các web element được khai báo private, chỉ truy cập qua các phương thức public của lớp",
        "en": "Web elements are declared private and accessed only through the class's public methods",
        "ja": "Web要素はprivateとして宣言され、クラスのpublicメソッドを通じてのみアクセスされる"
      },
      {
        "vi": "Mọi element và phương thức đều để public để test script gọi trực tiếp locator",
        "en": "All elements and methods are made public so test scripts can call locators directly",
        "ja": "すべての要素とメソッドをpublicにし、テストスクリプトが直接ロケーターを呼び出せるようにする"
      },
      {
        "vi": "Không sử dụng constructor để khởi tạo driver cho Page Object",
        "en": "Never use a constructor to initialize the driver in a Page Object",
        "ja": "Page Objectでドライバーを初期化するためにコンストラクタを使用しない"
      },
      {
        "vi": "Viết toàn bộ locator trực tiếp trong file test thay vì trong lớp Page",
        "en": "Write all locators directly in the test file instead of the Page class",
        "ja": "すべてのロケーターをPageクラスではなくテストファイルに直接記述する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đóng gói che giấu chi tiết locator/element, chỉ lộ hành vi (phương thức) ra ngoài, giúp test script không phụ thuộc trực tiếp vào cấu trúc DOM.",
      "en": "Encapsulation hides locator/element details and exposes only behavior (methods), so test scripts don't depend directly on DOM structure.",
      "ja": "カプセル化はロケーター/要素の詳細を隠し、振る舞い(メソッド)のみを公開することで、テストスクリプトがDOM構造に直接依存しないようにする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một test case gọi phương thức login() nhưng thực tế mỗi loại người dùng (admin, guest) có luồng đăng nhập khác nhau dù cùng tên phương thức, đây là ví dụ của khái niệm OOP nào?",
      "en": "When a test calls login() but each user type (admin, guest) has a different login flow despite sharing the same method name, this illustrates which OOP concept?",
      "ja": "テストがlogin()を呼び出すが、ユーザー種別(admin, guest)ごとに同名メソッドでも異なるログインフローが実行される場合、これはどのOOP概念の例ですか?"
    },
    "options": [
      {
        "vi": "Encapsulation",
        "en": "Encapsulation",
        "ja": "カプセル化"
      },
      {
        "vi": "Polymorphism",
        "en": "Polymorphism",
        "ja": "ポリモーフィズム"
      },
      {
        "vi": "Abstraction data-only",
        "en": "Data-only abstraction",
        "ja": "データのみの抽象化"
      },
      {
        "vi": "Composition cứng (hard composition)",
        "en": "Hard composition",
        "ja": "ハードコンポジション"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đa hình (polymorphism) cho phép cùng một tên phương thức nhưng hành vi khác nhau tuỳ vào lớp con hoặc đối tượng cụ thể được override.",
      "en": "Polymorphism allows the same method name to behave differently depending on the subclass or overriding object implementing it.",
      "ja": "ポリモーフィズムは同じメソッド名でも、実装するサブクラスやオブジェクトによって異なる振る舞いを可能にする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Java Selenium, nếu không bắt (catch) NoSuchElementException khi tìm một element không tồn tại, điều gì xảy ra với test đang chạy?",
      "en": "In Java Selenium, if a NoSuchElementException is not caught when locating a missing element, what happens to the running test?",
      "ja": "Java Seleniumで存在しない要素を検索した際にNoSuchElementExceptionをキャッチしない場合、実行中のテストはどうなりますか?"
    },
    "options": [
      {
        "vi": "Test tự động retry vô hạn lần cho đến khi tìm thấy element",
        "en": "The test automatically retries indefinitely until the element is found",
        "ja": "要素が見つかるまでテストが無限にリトライされる"
      },
      {
        "vi": "Test bỏ qua lỗi và tự gán giá trị null cho element rồi tiếp tục",
        "en": "The test ignores the error, assigns null to the element, and continues",
        "ja": "エラーを無視してnullを代入し、テストを続行する"
      },
      {
        "vi": "Exception sẽ propagate lên, khiến test case dừng lại và được đánh dấu failed/error",
        "en": "The exception propagates up, causing the test case to stop and be marked failed/error",
        "ja": "例外が伝播し、テストケースが停止してfailed/errorとしてマークされる"
      },
      {
        "vi": "Framework tự chuyển sang bước test tiếp theo mà không ghi nhận lỗi",
        "en": "The framework silently moves to the next test step without logging any error",
        "ja": "フレームワークがエラーを記録せずに次のテストステップへ自動的に進む"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nếu không được xử lý, exception sẽ lan truyền lên ngăn xếp gọi hàm, dừng luồng thực thi và test runner ghi nhận test đó thất bại/lỗi.",
      "en": "If unhandled, the exception propagates up the call stack, halting execution, and the test runner records the test as failed/errored.",
      "ja": "未処理の場合、例外は呼び出しスタックを伝播して実行を停止させ、テストランナーはそのテストをfailed/errorとして記録する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong automation test bằng Java, việc dùng try-catch để bắt exception khi click một nút rồi chỉ log cảnh báo và tiếp tục chạy tiềm ẩn rủi ro gì?",
      "en": "In Java automation, wrapping a button click in try-catch that only logs a warning and continues carries what risk?",
      "ja": "Javaの自動化テストで、ボタンクリックをtry-catchで囲み警告ログのみ出して続行する場合、どのようなリスクがありますか?"
    },
    "options": [
      {
        "vi": "Test sẽ chạy nhanh hơn đáng kể do không cần assert",
        "en": "Tests run significantly faster because assertions are skipped",
        "ja": "アサーションが不要になりテストが大幅に高速化する"
      },
      {
        "vi": "Không có rủi ro nào vì exception đã được catch đúng chuẩn",
        "en": "There is no risk since the exception is properly caught",
        "ja": "例外が正しくキャッチされているためリスクはない"
      },
      {
        "vi": "WebDriver sẽ tự động đóng session để tránh lãng phí tài nguyên",
        "en": "WebDriver automatically closes the session to save resources",
        "ja": "WebDriverがリソース節約のため自動的にセッションを閉じる"
      },
      {
        "vi": "Có thể che giấu lỗi thật, khiến test báo pass dù bước quan trọng đã thất bại (false positive)",
        "en": "It can mask real failures, letting the test report pass even though a critical step failed (false positive)",
        "ja": "実際の失敗を隠してしまい、重要なステップが失敗してもテストがpassと報告される可能性がある(偽陽性)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nuốt exception mà không rethrow hoặc fail rõ ràng có thể khiến test tiếp tục chạy trong trạng thái sai và báo cáo kết quả không đáng tin cậy.",
      "en": "Swallowing an exception without rethrowing or failing explicitly lets the test continue in a broken state, producing unreliable results.",
      "ja": "例外を再スローや明示的な失敗処理なしに握りつぶすと、テストが壊れた状態のまま続行し、信頼できない結果を報告することになる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khối finally trong Java thường được dùng trong automation test cho mục đích nào sau đây?",
      "en": "The finally block in Java is commonly used in automation testing for which purpose?",
      "ja": "Javaのfinallyブロックは自動化テストにおいて通常どの目的で使われますか?"
    },
    "options": [
      {
        "vi": "Đảm bảo đóng driver/giải phóng tài nguyên dù test pass hay fail hoặc ném exception",
        "en": "Ensuring the driver is closed/resources released regardless of whether the test passes, fails, or throws",
        "ja": "テストのpass/fail/例外発生に関わらずドライバーを閉じ、リソースを解放することを保証する"
      },
      {
        "vi": "Chỉ chạy khi test pass để log kết quả thành công",
        "en": "Running only when the test passes to log the success result",
        "ja": "テストがpassした場合のみ成功結果をログする"
      },
      {
        "vi": "Định nghĩa dữ liệu test cần chạy trước khi test bắt đầu",
        "en": "Defining test data that must run before the test starts",
        "ja": "テスト開始前に実行すべきテストデータを定義する"
      },
      {
        "vi": "Bắt buộc phải throw lại exception mới mỗi lần được gọi",
        "en": "Forcing a new exception to be thrown every time it is invoked",
        "ja": "呼び出されるたびに新しい例外を強制的にスローする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "finally luôn thực thi bất kể kết quả try/catch, thích hợp để dọn dẹp tài nguyên như driver.quit() nhằm tránh rò rỉ session trình duyệt.",
      "en": "finally always executes regardless of the try/catch outcome, making it ideal for cleanup like driver.quit() to avoid leaking browser sessions.",
      "ja": "finallyはtry/catchの結果に関わらず必ず実行されるため、driver.quit()のようなクリーンアップに適しており、ブラウザセッションのリークを防ぐ。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Sự khác biệt cốt lõi giữa checked exception và unchecked exception trong Java là gì?",
      "en": "What is the core difference between a checked exception and an unchecked exception in Java?",
      "ja": "Javaのchecked exceptionとunchecked exceptionの本質的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Checked exception chỉ xảy ra trong test tự động, unchecked chỉ xảy ra khi chạy thủ công",
        "en": "Checked exceptions only occur in automated tests, unchecked ones only occur in manual testing",
        "ja": "checked exceptionは自動テストでのみ発生し、uncheckedは手動テストでのみ発生する"
      },
      {
        "vi": "Checked exception bắt buộc khai báo throws hoặc try-catch tại compile-time; unchecked exception thì không bắt buộc",
        "en": "Checked exceptions must be declared with throws or handled with try-catch at compile time; unchecked exceptions are not required to be",
        "ja": "checked exceptionはコンパイル時にthrows宣言かtry-catchが必須だが、unchecked exceptionは必須ではない"
      },
      {
        "vi": "Unchecked exception luôn làm crash toàn bộ JVM ngay lập tức, checked thì không",
        "en": "Unchecked exceptions always crash the entire JVM immediately, checked exceptions never do",
        "ja": "unchecked exceptionは常にJVM全体を即座にクラッシュさせるが、checkedはしない"
      },
      {
        "vi": "Checked exception không thể được catch bằng khối catch(Exception e)",
        "en": "Checked exceptions can never be caught by a catch(Exception e) block",
        "ja": "checked exceptionはcatch(Exception e)ブロックで決してキャッチできない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Checked exception (như IOException) được trình biên dịch kiểm tra bắt buộc xử lý, còn unchecked (như RuntimeException, NoSuchElementException) không bị ép buộc tại compile-time.",
      "en": "Checked exceptions (like IOException) are enforced by the compiler to be handled, while unchecked ones (like RuntimeException, NoSuchElementException) are not enforced at compile time.",
      "ja": "checked exception(IOExceptionなど)はコンパイラによって処理が強制されるが、unchecked exception(RuntimeException、NoSuchElementExceptionなど)はコンパイル時に強制されない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong framework automation, việc tạo lớp custom exception riêng (ví dụ ElementNotVisibleTimeoutException) mang lại lợi ích nào?",
      "en": "In an automation framework, creating a custom exception class (e.g., ElementNotVisibleTimeoutException) provides which benefit?",
      "ja": "自動化フレームワークにおいて、カスタム例外クラス(例:ElementNotVisibleTimeoutException)を作成することの利点は何ですか?"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu dùng try-catch trong toàn bộ project",
        "en": "Eliminates the need for try-catch anywhere in the project",
        "ja": "プロジェクト全体でtry-catchを使う必要性を完全になくす"
      },
      {
        "vi": "Tự động sửa lỗi và làm cho test luôn pass",
        "en": "Automatically fixes the bug and makes the test always pass",
        "ja": "バグを自動的に修正しテストを常にpassさせる"
      },
      {
        "vi": "Giúp thông báo lỗi rõ ràng, cụ thể theo ngữ cảnh nghiệp vụ, dễ debug hơn exception generic",
        "en": "Provides clear, context-specific error messages tied to business context, easier to debug than generic exceptions",
        "ja": "ビジネスコンテキストに沿った明確で具体的なエラーメッセージを提供し、汎用例外よりデバッグしやすくする"
      },
      {
        "vi": "Bắt buộc chạy lại toàn bộ test suite mỗi khi xuất hiện",
        "en": "Forces the entire test suite to rerun whenever it occurs",
        "ja": "発生するたびにテストスイート全体を再実行させる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Custom exception cho phép đặt tên và thông điệp phù hợp ngữ cảnh, giúp người đọc log/report hiểu nhanh nguyên nhân lỗi thay vì exception chung chung.",
      "en": "Custom exceptions allow context-appropriate names and messages, helping log/report readers quickly understand the root cause instead of a generic exception.",
      "ja": "カスタム例外により文脈に適した名前とメッセージを付けられ、ログやレポートを見る人が汎用例外よりも原因を素早く理解できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi lưu danh sách các phần tử tìm được bởi findElements() trong Selenium Java, kiểu dữ liệu collection nào thường được trả về?",
      "en": "When storing the result of findElements() in Selenium Java, which collection type is typically returned?",
      "ja": "Selenium JavaでfindElements()の結果を保存する際、通常返されるコレクション型はどれですか?"
    },
    "options": [
      {
        "vi": "Array nguyên thuỷ kiểu int[]",
        "en": "A primitive int[] array",
        "ja": "プリミティブなint[]配列"
      },
      {
        "vi": "Set<String>",
        "en": "Set<String>",
        "ja": "Set<String>"
      },
      {
        "vi": "Map<Integer, WebElement>",
        "en": "Map<Integer, WebElement>",
        "ja": "Map<Integer, WebElement>"
      },
      {
        "vi": "List<WebElement>",
        "en": "List<WebElement>",
        "ja": "List<WebElement>"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "findElements() trả về List<WebElement>, cho phép duyệt qua nhiều phần tử khớp locator kể cả khi danh sách rỗng thay vì ném exception.",
      "en": "findElements() returns a List<WebElement>, allowing iteration over all matching elements even when empty, without throwing an exception.",
      "ja": "findElements()はList<WebElement>を返し、要素が0件でも例外をスローせず、一致するすべての要素を反復処理できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi cần lưu trữ danh sách các test case ID duy nhất (không trùng lặp) để tránh chạy lại, collection nào trong Java phù hợp nhất?",
      "en": "When storing unique (non-duplicate) test case IDs to avoid rerunning, which Java collection is most suitable?",
      "ja": "重複しないテストケースIDを保存し再実行を避けたい場合、Javaのどのコレクションが最も適していますか?"
    },
    "options": [
      {
        "vi": "HashSet",
        "en": "HashSet",
        "ja": "HashSet"
      },
      {
        "vi": "LinkedList",
        "en": "LinkedList",
        "ja": "LinkedList"
      },
      {
        "vi": "ArrayList",
        "en": "ArrayList",
        "ja": "ArrayList"
      },
      {
        "vi": "Stack",
        "en": "Stack",
        "ja": "Stack"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "HashSet không cho phép phần tử trùng lặp, tự động loại bỏ ID lặp lại, phù hợp khi chỉ cần tính duy nhất chứ không cần thứ tự.",
      "en": "HashSet disallows duplicates, automatically eliminating repeated IDs, suitable when uniqueness matters more than ordering.",
      "ja": "HashSetは重複を許さず、重複するIDを自動的に排除するため、順序より一意性が重要な場合に適している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Java, dùng Map<String, String> để lưu dữ liệu test theo cặp key-value (ví dụ username-password từ file config) có ưu điểm gì so với dùng nhiều biến String riêng lẻ?",
      "en": "Using a Map<String, String> to store key-value test data (e.g., username-password from a config file) offers what advantage over separate String variables?",
      "ja": "Map<String, String>を使ってキーバリュー形式のテストデータ(設定ファイルのusername-passwordなど)を保存することは、個別のString変数を使うのに比べどんな利点がありますか?"
    },
    "options": [
      {
        "vi": "Tự động mã hoá password khi lưu vào Map",
        "en": "Automatically encrypts the password when stored in the Map",
        "ja": "Mapに保存する際にパスワードを自動的に暗号化する"
      },
      {
        "vi": "Truy xuất động theo key mà không cần biết trước số lượng hoặc tên biến tại thời điểm biên dịch",
        "en": "Allows dynamic key-based lookup without knowing the number or names of variables at compile time",
        "ja": "コンパイル時に変数の数や名前を知らなくても、キーによる動的な取得が可能になる"
      },
      {
        "vi": "Chỉ Map mới có thể dùng trong vòng lặp for-each, String thì không",
        "en": "Only Map can be used in a for-each loop, unlike String variables",
        "ja": "for-eachループで使えるのはMapだけで、String変数は使えない"
      },
      {
        "vi": "Map luôn nhanh hơn String về tốc độ xử lý CPU trong mọi trường hợp",
        "en": "Map is always faster than String for CPU processing in every case",
        "ja": "MapはあらゆるケースでStringよりCPU処理速度が常に速い"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Map cho phép truy cập giá trị linh hoạt qua key tại runtime, hữu ích khi dữ liệu test được nạp động từ file config/Excel mà không cố định số lượng.",
      "en": "Map allows flexible runtime access via keys, useful when test data is loaded dynamically from config/Excel files without a fixed count.",
      "ja": "Mapはランタイムでキーによる柔軟なアクセスを可能にし、設定ファイルやExcelから動的にロードされる、件数が固定でないテストデータに有用である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi cần xử lý dữ liệu test theo dạng hàng đợi FIFO (chạy đúng thứ tự nạp vào, ví dụ queue các API request cần test tuần tự), cấu trúc dữ liệu nào phù hợp?",
      "en": "When processing test data as a FIFO queue (executed in insertion order, e.g., a queue of API requests to test sequentially), which data structure fits best?",
      "ja": "テストデータをFIFOキュー(挿入順に実行、例:順次テストするAPIリクエストのキュー)として処理したい場合、どのデータ構造が適していますか?"
    },
    "options": [
      {
        "vi": "Stack",
        "en": "Stack",
        "ja": "Stack"
      },
      {
        "vi": "TreeSet",
        "en": "TreeSet",
        "ja": "TreeSet"
      },
      {
        "vi": "Queue",
        "en": "Queue",
        "ja": "Queue"
      },
      {
        "vi": "HashMap",
        "en": "HashMap",
        "ja": "HashMap"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Queue tuân theo nguyên tắc FIFO (vào trước ra trước), phù hợp khi thứ tự xử lý dữ liệu test phải khớp thứ tự nạp vào.",
      "en": "Queue follows FIFO (first-in-first-out), ideal when the processing order of test data must match the insertion order.",
      "ja": "QueueはFIFO(先入れ先出し)に従うため、テストデータの処理順序が投入順序と一致する必要がある場合に適している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG/JUnit, khi một exception không mong muốn xảy ra ngoài phạm vi assertion (ví dụ NullPointerException do element chưa init), test thường được báo cáo ở trạng thái nào, phân biệt với 'failed' do assertion sai?",
      "en": "In TestNG/JUnit, when an unexpected exception occurs outside assertions (e.g., NullPointerException from an uninitialized element), the test is often reported in which status, distinct from an assertion 'failure'?",
      "ja": "TestNG/JUnitで、アサーション範囲外で予期しない例外(初期化されていない要素によるNullPointerExceptionなど)が発生した場合、アサーション失敗による「failed」とは区別されるどの状態として報告されますか?"
    },
    "options": [
      {
        "vi": "Skipped",
        "en": "Skipped",
        "ja": "Skipped"
      },
      {
        "vi": "Passed with warning",
        "en": "Passed with warning",
        "ja": "Passed with warning"
      },
      {
        "vi": "Blocked",
        "en": "Blocked",
        "ja": "Blocked"
      },
      {
        "vi": "Error",
        "en": "Error",
        "ja": "Error"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhiều framework/report phân biệt 'failure' (assertion không khớp kỳ vọng) với 'error' (exception ngoài ý muốn làm gián đoạn luồng thực thi), giúp phân loại nguyên nhân lỗi rõ ràng hơn.",
      "en": "Many frameworks/reports distinguish 'failure' (assertion mismatch) from 'error' (an unexpected exception interrupting execution), helping classify root causes more clearly.",
      "ja": "多くのフレームワークやレポートは、'failure'(アサーション不一致)と'error'(実行を中断させる予期しない例外)を区別し、原因分類をより明確にする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Abstraction (trừu tượng hoá) trong thiết kế automation framework thể hiện rõ nhất qua ví dụ nào?",
      "en": "Abstraction in automation framework design is best illustrated by which example?",
      "ja": "自動化フレームワーク設計における抽象化(abstraction)を最もよく表す例はどれですか?"
    },
    "options": [
      {
        "vi": "Test script chỉ gọi page.login(user, pass) mà không cần biết chi tiết cách tìm element hay click bên trong",
        "en": "A test script simply calls page.login(user, pass) without needing to know how elements are located or clicked internally",
        "ja": "テストスクリプトはpage.login(user, pass)を呼ぶだけで、内部で要素をどう特定しクリックするかを知る必要がない"
      },
      {
        "vi": "Test script viết trực tiếp driver.findElement(By.id(...)).click() cho từng bước trong mọi file test",
        "en": "Test scripts write driver.findElement(By.id(...)).click() directly for every step in every test file",
        "ja": "すべてのテストファイルの各ステップでdriver.findElement(By.id(...)).click()を直接記述する"
      },
      {
        "vi": "Khai báo tất cả biến trong lớp là public static để truy cập toàn cục",
        "en": "Declaring all variables in a class as public static for global access",
        "ja": "すべての変数をpublic staticとして宣言しグローバルにアクセスできるようにする"
      },
      {
        "vi": "Copy-paste cùng đoạn code xử lý wait vào mọi test case",
        "en": "Copy-pasting the same wait-handling code into every test case",
        "ja": "同じ待機処理コードをすべてのテストケースにコピー&ペーストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trừu tượng hoá ẩn đi chi tiết triển khai (locator, click, wait), chỉ phơi bày hành vi mức cao (login) để test script dễ đọc và ít phụ thuộc chi tiết kỹ thuật.",
      "en": "Abstraction hides implementation details (locators, clicks, waits) and exposes only high-level behavior (login), keeping test scripts readable and less coupled to technical details.",
      "ja": "抽象化は実装の詳細(ロケーター、クリック、待機)を隠し、高レベルの振る舞い(login)のみを公開することで、テストスクリプトを読みやすく技術詳細への依存を減らす。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi hai lớp Page Object khác nhau (LoginPage, RegisterPage) đều cần logic xử lý dropdown chọn quốc gia giống hệt nhau, cách tiếp cận OOP nào tránh trùng lặp code tốt nhất mà không tạo quan hệ kế thừa gượng ép?",
      "en": "When two different Page Object classes (LoginPage, RegisterPage) both need identical country-dropdown logic, which OOP approach best avoids code duplication without forcing an awkward inheritance relationship?",
      "ja": "LoginPageとRegisterPageという異なる2つのPage Objectクラスが同一の国選択ドロップダウン処理を必要とする場合、不自然な継承関係を作らずにコード重複を避ける最良のOOPアプローチはどれですか?"
    },
    "options": [
      {
        "vi": "Copy nguyên đoạn code dropdown vào cả hai lớp để đảm bảo độc lập tuyệt đối",
        "en": "Copy the dropdown code verbatim into both classes to ensure absolute independence",
        "ja": "完全な独立性を保証するため、両方のクラスにドロップダウンコードをそのままコピーする"
      },
      {
        "vi": "Composition: tạo lớp CountryDropdownComponent riêng rồi cho cả hai Page Object sử dụng (has-a) thông qua thuộc tính",
        "en": "Composition: create a separate CountryDropdownComponent class and have both Page Objects use it (has-a) via a field",
        "ja": "コンポジション:独立したCountryDropdownComponentクラスを作成し、両方のPage Objectがフィールドを通じてそれを利用する(has-a)"
      },
      {
        "vi": "Cho RegisterPage kế thừa LoginPage dù chúng không có quan hệ is-a về mặt nghiệp vụ",
        "en": "Make RegisterPage extend LoginPage even though there's no business is-a relationship",
        "ja": "ビジネス上is-a関係がないにもかかわらず、RegisterPageにLoginPageを継承させる"
      },
      {
        "vi": "Biến toàn bộ phương thức dropdown thành static trong lớp Utils dùng chung toàn dự án không kiểm soát phạm vi",
        "en": "Turn the dropdown methods into unscoped static methods in a project-wide Utils class",
        "ja": "ドロップダウンのメソッドをスコープ管理せずプロジェクト全体のUtilsクラスにstaticメソッドとして置く"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Composition (has-a) cho phép chia sẻ hành vi giữa các lớp không liên quan trực tiếp mà không cần ép buộc quan hệ kế thừa is-a sai bản chất.",
      "en": "Composition (has-a) allows sharing behavior between unrelated classes without forcing an inaccurate is-a inheritance relationship.",
      "ja": "コンポジション(has-a)は、本質的に誤ったis-a継承関係を強制することなく、直接関係のないクラス間で振る舞いを共有できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Interface trong Java (ví dụ interface DriverFactory với các phương thức tạo ChromeDriver, FirefoxDriver) mang lại lợi ích gì cho automation framework đa trình duyệt?",
      "en": "A Java interface (e.g., DriverFactory with methods to create ChromeDriver, FirefoxDriver) offers what benefit to a multi-browser automation framework?",
      "ja": "Javaのインターフェース(ChromeDriverやFirefoxDriverを生成するメソッドを持つDriverFactoryなど)は、マルチブラウザ自動化フレームワークにどのような利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu cấu hình driver path/binary cho từng trình duyệt",
        "en": "Completely eliminates the need to configure driver paths/binaries per browser",
        "ja": "ブラウザごとのドライバーパス/バイナリ設定を完全に不要にする"
      },
      {
        "vi": "Bắt buộc mọi trình duyệt phải dùng cùng driver session để tiết kiệm RAM",
        "en": "Forces all browsers to share the same driver session to save RAM",
        "ja": "すべてのブラウザに同一のドライバーセッションを共有させRAMを節約する"
      },
      {
        "vi": "Cho phép định nghĩa hợp đồng chung, các lớp triển khai cụ thể có thể thay thế nhau linh hoạt (loose coupling)",
        "en": "Allows defining a common contract where concrete implementations can be swapped interchangeably (loose coupling)",
        "ja": "共通の契約を定義でき、具体的な実装を柔軟に交換可能にする(疎結合)"
      },
      {
        "vi": "Tự động đồng bộ version driver với version trình duyệt cài trên máy",
        "en": "Automatically syncs the driver version with the browser version installed on the machine",
        "ja": "インストールされているブラウザのバージョンとドライバーバージョンを自動的に同期する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Interface định nghĩa hợp đồng chung (ví dụ createDriver()), cho phép framework chuyển đổi giữa các trình duyệt khác nhau mà không sửa code gọi, tuân theo nguyên tắc lập trình theo interface.",
      "en": "An interface defines a common contract (e.g., createDriver()), letting the framework switch between browsers without changing calling code, following program-to-interface principles.",
      "ja": "インターフェースは共通の契約(例:createDriver())を定義し、呼び出し側のコードを変更せずにブラウザを切り替えられるようにする、インターフェースに対するプログラミング原則に従う。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong pattern Factory kết hợp với automation testing, việc dùng phương thức static getDriver(String browserType) để trả về WebDriver phù hợp giúp giải quyết vấn đề gì?",
      "en": "In a Factory pattern combined with automation testing, a static getDriver(String browserType) method returning the appropriate WebDriver solves what problem?",
      "ja": "自動化テストと組み合わせたFactoryパターンで、適切なWebDriverを返す静的メソッドgetDriver(String browserType)はどんな問題を解決しますか?"
    },
    "options": [
      {
        "vi": "Đảm bảo mọi test case chạy đúng thứ tự khai báo trong file test",
        "en": "Guarantees all test cases run in the exact order declared in the test file",
        "ja": "すべてのテストケースがファイル内の宣言順に実行されることを保証する"
      },
      {
        "vi": "Giúp test chạy song song mà không cần cấu hình gì thêm ở tầng CI",
        "en": "Enables parallel test execution with zero additional CI-layer configuration",
        "ja": "CI層で追加設定なしに並列テスト実行を可能にする"
      },
      {
        "vi": "Tự động tạo báo cáo test theo định dạng Allure không cần thư viện phụ trợ",
        "en": "Automatically generates Allure-format reports without any extra libraries",
        "ja": "追加ライブラリなしでAllure形式のレポートを自動生成する"
      },
      {
        "vi": "Tách logic khởi tạo driver ra khỏi test case, giúp thêm trình duyệt mới mà không sửa code test hiện có",
        "en": "Decouples driver-creation logic from test cases, allowing new browsers to be added without modifying existing test code",
        "ja": "ドライバー生成ロジックをテストケースから分離し、既存のテストコードを変更せずに新しいブラウザを追加できるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Factory pattern tập trung logic tạo đối tượng (driver) vào một nơi, giúp test case không cần biết chi tiết khởi tạo và dễ mở rộng thêm trình duyệt/thiết bị mới.",
      "en": "The Factory pattern centralizes object (driver) creation logic in one place, so test cases don't need creation details and new browsers/devices are easy to add.",
      "ja": "Factoryパターンはオブジェクト(ドライバー)生成ロジックを一箇所に集約し、テストケースが生成の詳細を知る必要をなくし、新しいブラウザ/デバイスの追加を容易にする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Java, sự khác biệt cơ bản giữa Array và ArrayList khi lưu trữ danh sách kết quả test là gì?",
      "en": "In Java, what is the fundamental difference between an Array and an ArrayList when storing a list of test results?",
      "ja": "Javaで、テスト結果のリストを保存する際、ArrayとArrayListの基本的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Array có kích thước cố định khi khởi tạo, ArrayList có thể tự động thay đổi kích thước khi thêm/xoá phần tử",
        "en": "Array has a fixed size once created, while ArrayList can dynamically resize as elements are added or removed",
        "ja": "Arrayは作成時にサイズが固定されるが、ArrayListは要素の追加・削除に応じて動的にサイズが変わる"
      },
      {
        "vi": "Array chỉ dùng được cho kiểu String, ArrayList dùng được cho mọi kiểu dữ liệu",
        "en": "Array can only hold Strings, while ArrayList can hold any data type",
        "ja": "ArrayはString型のみ格納できるが、ArrayListはあらゆるデータ型を格納できる"
      },
      {
        "vi": "ArrayList không thể duyệt bằng vòng lặp for, chỉ Array mới duyệt được",
        "en": "ArrayList cannot be iterated with a for loop, only Array can",
        "ja": "ArrayListはforループで反復できないが、Arrayはできる"
      },
      {
        "vi": "Array luôn chạy chậm hơn ArrayList trong mọi thao tác đọc/ghi",
        "en": "Array is always slower than ArrayList for every read/write operation",
        "ja": "Arrayはあらゆる読み書き操作でArrayListより常に低速である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Array có độ dài cố định sau khi khai báo, còn ArrayList (thuộc Collections Framework) tự động mở rộng/thu hẹp kích thước, linh hoạt hơn khi số lượng kết quả test không biết trước.",
      "en": "Array has a fixed length once declared, while ArrayList (part of the Collections Framework) automatically grows or shrinks, offering more flexibility when the number of test results is unknown in advance.",
      "ja": "Arrayは宣言後は長さが固定されるが、ArrayList(Collections Frameworkの一部)は自動的にサイズが増減し、テスト結果の件数が事前にわからない場合により柔軟である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi duyệt qua một List<WebElement> để click từng phần tử và giữa chừng DOM bị thay đổi (element bị stale), lỗi thường gặp là gì?",
      "en": "When iterating a List<WebElement> to click each element and the DOM changes mid-loop (element becomes stale), what error is commonly encountered?",
      "ja": "List<WebElement>を反復して各要素をクリックする際、ループ中にDOMが変化(要素がstaleになる)すると、一般的にどのエラーが発生しますか?"
    },
    "options": [
      {
        "vi": "ArrayIndexOutOfBoundsException",
        "en": "ArrayIndexOutOfBoundsException",
        "ja": "ArrayIndexOutOfBoundsException"
      },
      {
        "vi": "StaleElementReferenceException",
        "en": "StaleElementReferenceException",
        "ja": "StaleElementReferenceException"
      },
      {
        "vi": "ClassCastException",
        "en": "ClassCastException",
        "ja": "ClassCastException"
      },
      {
        "vi": "NumberFormatException",
        "en": "NumberFormatException",
        "ja": "NumberFormatException"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "StaleElementReferenceException xảy ra khi tham chiếu WebElement trỏ tới một node DOM đã bị gỡ bỏ hoặc thay thế sau khi trang được render lại.",
      "en": "StaleElementReferenceException occurs when a WebElement reference points to a DOM node that has been removed or replaced after the page re-renders.",
      "ja": "StaleElementReferenceExceptionは、WebElementの参照先DOMノードがページの再描画後に削除または置き換えられた場合に発生する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong việc thiết kế test data theo hướng OOP, một lớp TestUser với các thuộc tính username, password, role và các phương thức getter/setter thể hiện nguyên lý nào rõ nhất?",
      "en": "When designing test data using OOP, a TestUser class with username, password, role fields plus getter/setter methods best demonstrates which principle?",
      "ja": "OOPを用いてテストデータを設計する際、username、password、roleフィールドとgetter/setterメソッドを持つTestUserクラスは、どの原則を最もよく示していますか?"
    },
    "options": [
      {
        "vi": "Inheritance, vì TestUser bắt buộc phải kế thừa từ lớp WebDriver",
        "en": "Inheritance, since TestUser must inherit from the WebDriver class",
        "ja": "継承。TestUserはWebDriverクラスを継承しなければならないため"
      },
      {
        "vi": "Polymorphism, vì mỗi user có thể override phương thức login khác nhau",
        "en": "Polymorphism, since each user can override the login method differently",
        "ja": "ポリモーフィズム。各ユーザーがloginメソッドを異なる形でオーバーライドできるため"
      },
      {
        "vi": "Encapsulation, vì dữ liệu và hành vi liên quan được gói gọn trong một đối tượng, kiểm soát truy cập qua getter/setter",
        "en": "Encapsulation, since related data and behavior are bundled into one object with access controlled via getters/setters",
        "ja": "カプセル化。関連するデータと振る舞いが1つのオブジェクトにまとめられ、getter/setterでアクセスが制御されているため"
      },
      {
        "vi": "Interface segregation, vì lớp này không có phương thức nào cả",
        "en": "Interface segregation, since the class has no methods at all",
        "ja": "インターフェース分離。このクラスにはメソッドが全く存在しないため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Gói dữ liệu (username, password, role) cùng phương thức truy cập (getter/setter) vào một model là ví dụ điển hình của encapsulation trong thiết kế test data hướng đối tượng.",
      "en": "Bundling data (username, password, role) with access methods (getters/setters) into a model is a textbook example of encapsulation in object-oriented test data design.",
      "ja": "データ(username、password、role)とアクセスメソッド(getter/setter)を1つのモデルにまとめることは、オブジェクト指向のテストデータ設計におけるカプセル化の典型例である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh hai object TestResult trong Java bằng '==' luôn trả về false dù dữ liệu bên trong giống hệt nhau, nguyên nhân và giải pháp phổ biến là gì?",
      "en": "When comparing two TestResult objects in Java with '==' always returns false even though their internal data is identical, what is the common cause and fix?",
      "ja": "Javaで2つのTestResultオブジェクトを'=='で比較すると内部データが同一でも常にfalseが返る場合、一般的な原因と解決策は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ cần restart JVM là hai object sẽ so sánh đúng bằng '=='",
        "en": "Simply restarting the JVM will make '==' compare correctly",
        "ja": "JVMを再起動するだけで'=='が正しく比較できるようになる"
      },
      {
        "vi": "Java không cho phép so sánh object bằng bất kỳ toán tử nào",
        "en": "Java does not allow comparing objects with any operator at all",
        "ja": "Javaはいかなる演算子によるオブジェクト比較も許可しない"
      },
      {
        "vi": "Cần chuyển toàn bộ object sang kiểu int trước khi so sánh",
        "en": "The objects must be converted to int type before comparison",
        "ja": "比較の前にオブジェクトをint型に変換する必要がある"
      },
      {
        "vi": "'==' so sánh tham chiếu (reference) không phải giá trị; cần override phương thức equals() để so sánh nội dung",
        "en": "'==' compares references, not values; the equals() method should be overridden to compare content",
        "ja": "'=='は値ではなく参照を比較する。内容を比較するにはequals()メソッドをオーバーライドする必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mặc định '==' so sánh địa chỉ tham chiếu trong bộ nhớ; để so sánh giá trị logic (dữ liệu bên trong), lớp cần override equals() (và thường cả hashCode()).",
      "en": "By default '==' compares memory reference addresses; to compare logical value equality (internal data), the class needs to override equals() (and typically hashCode()).",
      "ja": "デフォルトで'=='はメモリ上の参照アドレスを比較する。論理的な値の等価性(内部データ)を比較するには、クラスでequals()(通常はhashCode()も)をオーバーライドする必要がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong chiến lược xử lý lỗi của automation framework, việc phân loại exception thành 'ApplicationException' (lỗi do hệ thống đang test) và 'FrameworkException' (lỗi do chính code automation) mang lại lợi ích gì?",
      "en": "In an automation framework's error-handling strategy, classifying exceptions into 'ApplicationException' (system-under-test errors) and 'FrameworkException' (automation code errors) provides what benefit?",
      "ja": "自動化フレームワークのエラー処理戦略で、例外を'ApplicationException'(テスト対象システムのエラー)と'FrameworkException'(自動化コード自体のエラー)に分類することの利点は何ですか?"
    },
    "options": [
      {
        "vi": "Giúp team nhanh chóng phân biệt lỗi do sản phẩm hay do script/framework, ưu tiên xử lý và báo cáo chính xác hơn",
        "en": "Helps the team quickly distinguish product bugs from script/framework issues, enabling more accurate prioritization and reporting",
        "ja": "プロダクトのバグかスクリプト/フレームワークの問題かをチームが素早く区別できるようにし、より正確な優先順位付けと報告を可能にする"
      },
      {
        "vi": "Làm cho tất cả test luôn pass bất kể lỗi thuộc loại nào",
        "en": "Makes all tests always pass regardless of the exception type",
        "ja": "例外の種類に関わらずすべてのテストを常にpassさせる"
      },
      {
        "vi": "Xoá bỏ hoàn toàn nhu cầu viết log trong framework",
        "en": "Eliminates the need to write any logs in the framework entirely",
        "ja": "フレームワークでのログ記述の必要性を完全になくす"
      },
      {
        "vi": "Giúp trình duyệt chạy nhanh hơn khi gặp lỗi mạng",
        "en": "Makes the browser run faster when a network error occurs",
        "ja": "ネットワークエラー発生時にブラウザの動作を高速化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Phân loại exception rõ ràng giúp đội automation và đội phát triển xác định nhanh nguồn gốc lỗi (bug thật sự hay lỗi hạ tầng test), tiết kiệm thời gian điều tra.",
      "en": "Clear exception classification helps automation and dev teams quickly identify the root cause (real bug vs. test infrastructure issue), saving investigation time.",
      "ja": "明確な例外分類により、自動化チームと開発チームは原因(実際のバグかテスト基盤の問題か)を素早く特定でき、調査時間を節約できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một phương thức retry() cố gắng thực hiện lại một hành động tối đa 3 lần trước khi ném exception cuối cùng, đây là ví dụ áp dụng khái niệm nào để tăng độ ổn định của automation?",
      "en": "When a retry() method attempts an action up to 3 times before finally throwing an exception, this is an example of applying which concept to improve automation stability?",
      "ja": "retry()メソッドが最終的に例外をスローする前に最大3回アクションを再試行する場合、これは自動化の安定性を高めるためにどの概念を適用した例ですか?"
    },
    "options": [
      {
        "vi": "Data-driven testing thuần tuý không liên quan đến exception",
        "en": "Pure data-driven testing unrelated to exceptions",
        "ja": "例外とは無関係な純粋なデータ駆動テスト"
      },
      {
        "vi": "Retry mechanism kết hợp exception handling để xử lý lỗi tạm thời (transient error)",
        "en": "A retry mechanism combined with exception handling to deal with transient errors",
        "ja": "一時的なエラー(transient error)に対処するためのリトライ機構と例外処理の組み合わせ"
      },
      {
        "vi": "Chuyển đổi kiểu dữ liệu tự động (auto-boxing)",
        "en": "Automatic data type conversion (auto-boxing)",
        "ja": "自動的なデータ型変換(オートボクシング)"
      },
      {
        "vi": "Đóng gói giao diện người dùng (UI encapsulation) không liên quan đến lỗi runtime",
        "en": "UI encapsulation unrelated to runtime errors",
        "ja": "実行時エラーとは無関係なUIカプセル化"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cơ chế retry kết hợp try-catch giúp tự động thử lại hành động khi gặp lỗi tạm thời (mạng chậm, element chưa kịp render), tăng độ ổn định thay vì fail ngay lập tức.",
      "en": "A retry mechanism combined with try-catch automatically re-attempts an action on transient errors (slow network, element not yet rendered), improving stability instead of failing immediately.",
      "ja": "try-catchと組み合わせたリトライ機構は、一時的なエラー(遅いネットワーク、未描画の要素)発生時にアクションを自動的に再試行し、即座に失敗させる代わりに安定性を向上させる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi thiết kế BaseTest chứa các phương thức @BeforeMethod/@AfterMethod dùng chung, nếu một lớp test con override phương thức setUp() của lớp cha mà quên gọi super.setUp(), rủi ro phổ biến nhất là gì?",
      "en": "When designing a BaseTest with shared @BeforeMethod/@AfterMethod methods, if a child test class overrides setUp() but forgets to call super.setUp(), what is the most common risk?",
      "ja": "共有の@BeforeMethod/@AfterMethodを持つBaseTestを設計する際、子テストクラスがsetUp()をオーバーライドしてsuper.setUp()の呼び出しを忘れると、最も一般的なリスクは何ですか?"
    },
    "options": [
      {
        "vi": "Test sẽ tự động pass vì bỏ qua toàn bộ assertion",
        "en": "The test will automatically pass because all assertions are skipped",
        "ja": "すべてのアサーションがスキップされテストが自動的にpassする"
      },
      {
        "vi": "Chương trình sẽ không biên dịch được do lỗi cú pháp",
        "en": "The program fails to compile due to a syntax error",
        "ja": "構文エラーによりプログラムがコンパイルできなくなる"
      },
      {
        "vi": "Logic khởi tạo chung của lớp cha (như tạo driver, mở URL) không được thực thi, khiến test fail vì thiếu bước chuẩn bị",
        "en": "The parent class's shared setup logic (e.g., driver creation, opening the URL) is never executed, causing the test to fail due to missing preparation",
        "ja": "親クラスの共通初期化ロジック(ドライバー生成、URLオープンなど)が実行されず、準備不足でテストが失敗する"
      },
      {
        "vi": "Không có ảnh hưởng gì vì Java luôn tự gọi super.setUp() ngầm định",
        "en": "There is no impact because Java always implicitly calls super.setUp()",
        "ja": "Javaは常に暗黙的にsuper.setUp()を呼ぶため影響はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi override một phương thức không phải constructor, Java không tự động gọi phiên bản của lớp cha; nếu quên gọi super.setUp(), các bước khởi tạo chung sẽ bị bỏ sót.",
      "en": "When overriding a non-constructor method, Java does not automatically call the parent's version; forgetting super.setUp() skips the shared initialization steps.",
      "ja": "コンストラクタ以外のメソッドをオーバーライドする場合、Javaは親クラスのバージョンを自動的に呼び出さない。super.setUp()の呼び出し忘れは、共通の初期化ステップの欠落を招く。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình review Pull Request cho test automation framework, điều gì QUAN TRỌNG NHẤT cần kiểm tra ngoài việc code có chạy được?",
      "en": "When reviewing a Pull Request for a test automation framework, besides whether the code runs, what is MOST important to check?",
      "ja": "テスト自動化フレームワークのプルリクエストをレビューする際、コードが動作するかどうか以外に最も重要な確認事項は何ですか。"
    },
    "options": [
      {
        "vi": "Số dòng code càng ít càng tốt",
        "en": "The fewer lines of code, the better",
        "ja": "コード行数が少ないほど良い"
      },
      {
        "vi": "Số lượng assertion phải nhiều nhất có thể trong một test",
        "en": "Maximizing the number of assertions in a single test",
        "ja": "1つのテストにできるだけ多くのアサーションを含めること"
      },
      {
        "vi": "Tên biến có ngắn gọn hay không",
        "en": "Whether variable names are short",
        "ja": "変数名が短いかどうか"
      },
      {
        "vi": "Test case có độc lập, không phụ thuộc thứ tự chạy và không để lại dữ liệu rác",
        "en": "Whether test cases are independent, order-agnostic, and clean up after themselves without leaving test data behind",
        "ja": "テストケースが独立しており、実行順序に依存せず、テストデータを残さないかどうか"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test không độc lập hoặc để lại dữ liệu rác sẽ gây flaky và ảnh hưởng các test khác khi chạy song song hoặc theo thứ tự khác nhau trên CI.",
      "en": "Tests that are not independent or that leave residual data cause flakiness and affect other tests when run in parallel or in different orders on CI.",
      "ja": "独立性がない、またはデータを残すテストは、CI上で並列実行や順序変更時にフレーキーになり他のテストに影響します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi hai thành viên team QA cùng sửa file test suite và xảy ra conflict lúc merge, bước xử lý ĐÚNG là gì?",
      "en": "When two QA team members edit the same test suite file and a merge conflict occurs, what is the correct way to handle it?",
      "ja": "2人のQAメンバーが同じテストスイートファイルを編集しマージコンフリクトが発生した場合、正しい対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Đọc kỹ đoạn conflict, hiểu ý đồ của cả hai thay đổi rồi hợp nhất hợp lý, sau đó chạy lại test để xác nhận",
        "en": "Carefully read the conflict markers, understand the intent of both changes, merge them sensibly, then re-run the tests to confirm correctness",
        "ja": "競合マーカーを注意深く読み、両方の変更意図を理解した上で適切に統合し、その後テストを再実行して確認する"
      },
      {
        "vi": "Xóa file conflict rồi viết lại từ đầu",
        "en": "Delete the conflicting file and rewrite it from scratch",
        "ja": "競合したファイルを削除して最初から書き直す"
      },
      {
        "vi": "Luôn giữ nguyên phiên bản của mình và ghi đè phiên bản kia",
        "en": "Always keep your own version and overwrite the other one",
        "ja": "常に自分のバージョンを保持し相手のバージョンを上書きする"
      },
      {
        "vi": "Dùng git push --force để bỏ qua conflict",
        "en": "Use git push --force to bypass the conflict",
        "ja": "git push --force を使って競合を無視する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Merge conflict cần được giải quyết dựa trên hiểu logic của cả hai thay đổi, và phải chạy lại test để đảm bảo bản hợp nhất không phá vỡ test suite.",
      "en": "Merge conflicts must be resolved by understanding both changes' logic, and tests must be re-run to ensure the merged result doesn't break the suite.",
      "ja": "マージコンフリクトは両方の変更ロジックを理解した上で解決し、統合後にテストスイートが壊れていないか再実行して確認する必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "git rebase khác git merge ở điểm nào khi tích hợp nhánh feature test automation vào main?",
      "en": "How does git rebase differ from git merge when integrating a test automation feature branch into main?",
      "ja": "テスト自動化のフィーチャーブランチをmainに統合する際、git rebaseとgit mergeの違いは何ですか。"
    },
    "options": [
      {
        "vi": "rebase và merge hoàn toàn giống nhau về kết quả",
        "en": "Rebase and merge produce identical results",
        "ja": "rebaseとmergeの結果は完全に同じである"
      },
      {
        "vi": "rebase viết lại lịch sử commit thành một chuỗi tuyến tính, còn merge giữ nguyên lịch sử và tạo commit hợp nhất",
        "en": "Rebase rewrites commit history into a linear sequence, while merge preserves history and creates a merge commit",
        "ja": "rebaseはコミット履歴を線形に書き換え、mergeは履歴をそのまま保持しマージコミットを作成する"
      },
      {
        "vi": "rebase chỉ dùng được cho file test .json, merge dùng cho file code",
        "en": "Rebase only works for .json test files, merge only for code files",
        "ja": "rebaseは.jsonテストファイルにのみ使用でき、mergeはコードファイルにのみ使用できる"
      },
      {
        "vi": "merge sẽ tự động chạy lại toàn bộ test suite còn rebase thì không",
        "en": "Merge automatically re-runs the entire test suite while rebase does not",
        "ja": "mergeは自動的にテストスイート全体を再実行するがrebaseはしない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "rebase áp lại từng commit lên đầu nhánh đích tạo lịch sử tuyến tính, trong khi merge tạo một commit hợp nhất giữ cả hai nhánh lịch sử song song.",
      "en": "Rebase reapplies each commit on top of the target branch creating linear history, whereas merge creates a merge commit preserving both branch histories in parallel.",
      "ja": "rebaseは各コミットを対象ブランチの先頭に再適用し線形履歴を作るのに対し、mergeは両方の履歴を並行して保持するマージコミットを作成します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Lệnh git bisect thường được QA sử dụng để làm gì?",
      "en": "What is git bisect commonly used for by QA?",
      "ja": "git bisectコマンドはQAによって通常何のために使用されますか。"
    },
    "options": [
      {
        "vi": "Tự động sinh test case mới",
        "en": "Automatically generating new test cases",
        "ja": "新しいテストケースを自動生成するため"
      },
      {
        "vi": "Xóa các branch không còn sử dụng",
        "en": "Deleting unused branches",
        "ja": "使われなくなったブランチを削除するため"
      },
      {
        "vi": "Tìm commit nào đã gây ra một bug hoặc test bị fail bằng cách tìm kiếm nhị phân qua lịch sử commit",
        "en": "Finding which commit introduced a bug or broke a test by binary-searching through commit history",
        "ja": "コミット履歴を二分探索してバグやテスト失敗を引き起こしたコミットを特定するため"
      },
      {
        "vi": "Nén dung lượng repository",
        "en": "Compressing the repository size",
        "ja": "リポジトリのサイズを圧縮するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "git bisect dùng thuật toán tìm kiếm nhị phân, đánh dấu commit good/bad để nhanh chóng xác định commit gây regression.",
      "en": "git bisect uses binary search, marking commits as good/bad to quickly pinpoint the commit that caused a regression.",
      "ja": "git bisectは二分探索アルゴリズムを使い、コミットをgood/badとマークして回帰の原因となったコミットを素早く特定します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao nên đặt file report, screenshot, video của test run vào .gitignore thay vì commit vào repo?",
      "en": "Why should test run reports, screenshots, and videos be added to .gitignore instead of being committed to the repo?",
      "ja": "テスト実行のレポート、スクリーンショット、動画をコミットせず.gitignoreに追加すべき理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì CI/CD sẽ tự xóa file report nếu nó nằm trong Git",
        "en": "Because CI/CD will automatically delete report files if they are tracked in Git",
        "ja": "CI/CDはGit管理下のレポートファイルを自動的に削除するため"
      },
      {
        "vi": "Vì Git không hỗ trợ lưu file ảnh",
        "en": "Because Git does not support storing image files",
        "ja": "Gitは画像ファイルの保存をサポートしていないため"
      },
      {
        "vi": "Vì report luôn chứa mã nguồn bí mật",
        "en": "Because reports always contain confidential source code",
        "ja": "レポートには常に機密ソースコードが含まれているため"
      },
      {
        "vi": "Vì chúng là output tạm thời, thay đổi mỗi lần chạy, làm phình repo và không có giá trị lịch sử code",
        "en": "Because they are transient outputs that change on every run, bloat the repository, and have no code-history value",
        "ja": "実行のたびに変化する一時的な出力であり、リポジトリを肥大化させ、コード履歴としての価値がないため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Report/artifact test là output động, không phải mã nguồn; commit chúng làm repo phình to và gây nhiễu diff không cần thiết.",
      "en": "Test reports/artifacts are dynamic outputs, not source code; committing them bloats the repo and creates noisy, meaningless diffs.",
      "ja": "テストレポート/成果物は動的な出力でありソースコードではないため、コミットするとリポジトリが肥大化し無意味な差分ノイズが生じます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong quy trình trunk-based development áp dụng cho test automation, đặc điểm nổi bật là gì?",
      "en": "In trunk-based development applied to test automation, what is the key characteristic?",
      "ja": "テスト自動化に適用されるトランクベース開発の特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Nhánh feature ngắn ngày, tích hợp thường xuyên vào main để phát hiện conflict và lỗi test sớm",
        "en": "Feature branches are short-lived and integrated into main frequently to catch conflicts and test failures early",
        "ja": "フィーチャーブランチは短命で、頻繁にmainへ統合しコンフリクトやテスト失敗を早期に発見する"
      },
      {
        "vi": "Chỉ chạy test một lần mỗi tháng",
        "en": "Tests are run only once a month",
        "ja": "テストは月に1回だけ実行される"
      },
      {
        "vi": "Các nhánh feature tồn tại rất lâu, đôi khi hàng tháng, trước khi merge",
        "en": "Feature branches live for a very long time, sometimes months, before merging",
        "ja": "フィーチャーブランチは数か月に及ぶ長期間存在してからマージされる"
      },
      {
        "vi": "Mỗi tester có một nhánh riêng và không bao giờ merge vào main",
        "en": "Each tester has their own branch that never merges into main",
        "ja": "各テスターが専用ブランチを持ち、mainには一切マージしない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trunk-based development khuyến khích tích hợp thường xuyên với nhánh ngắn ngày, giúp phát hiện lỗi và conflict sớm thay vì dồn nén rủi ro tích hợp.",
      "en": "Trunk-based development encourages frequent integration with short-lived branches, catching bugs and conflicts early rather than accumulating integration risk.",
      "ja": "トランクベース開発は短命なブランチによる頻繁な統合を推奨し、統合リスクを蓄積させずに早期にバグやコンフリクトを発見します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Lệnh git cherry-pick hữu ích trong tình huống nào đối với QA automation?",
      "en": "In which scenario is git cherry-pick useful for QA automation?",
      "ja": "QA自動化においてgit cherry-pickが役立つのはどのような場面ですか。"
    },
    "options": [
      {
        "vi": "Khi cần xóa toàn bộ lịch sử commit của repository",
        "en": "When you need to delete the entire commit history of a repository",
        "ja": "リポジトリのコミット履歴全体を削除したいとき"
      },
      {
        "vi": "Khi cần lấy một commit fix test cụ thể từ nhánh khác áp dụng vào nhánh hiện tại mà không merge toàn bộ nhánh đó",
        "en": "When you need to apply a specific test-fix commit from another branch onto the current branch without merging the entire branch",
        "ja": "別ブランチのブランチ全体をマージせずに、特定のテスト修正コミットだけを現在のブランチに適用したいとき"
      },
      {
        "vi": "Khi muốn nén nhiều commit thành một file zip",
        "en": "When you want to compress multiple commits into a zip file",
        "ja": "複数のコミットを1つのzipファイルに圧縮したいとき"
      },
      {
        "vi": "Khi cần đổi tên toàn bộ repository",
        "en": "When you need to rename the entire repository",
        "ja": "リポジトリ全体の名前を変更したいとき"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "cherry-pick cho phép lấy đúng một commit (ví dụ fix flaky test) từ nhánh khác mà không kéo theo các thay đổi khác chưa sẵn sàng.",
      "en": "Cherry-pick lets you pull exactly one commit (e.g. a flaky-test fix) from another branch without dragging in unrelated, not-yet-ready changes.",
      "ja": "cherry-pickは他のブランチから特定の1コミット（例:フレーキーテスト修正）だけを、準備できていない他の変更を巻き込まずに取り込めます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Pre-commit hook trong quy trình test automation thường được cấu hình để làm gì?",
      "en": "What is a pre-commit hook commonly configured to do in a test automation workflow?",
      "ja": "テスト自動化ワークフローにおいてpre-commitフックは通常何をするよう設定されますか。"
    },
    "options": [
      {
        "vi": "Tự động deploy code lên production",
        "en": "Automatically deploy code to production",
        "ja": "コードを自動的に本番環境へデプロイする"
      },
      {
        "vi": "Xóa toàn bộ branch không liên quan",
        "en": "Delete all unrelated branches",
        "ja": "関係のないブランチをすべて削除する"
      },
      {
        "vi": "Chạy lint, format code và một tập test nhanh (smoke test) trước khi cho phép commit",
        "en": "Run linting, code formatting, and a fast smoke test suite before allowing the commit",
        "ja": "コミットを許可する前にlintやコード整形、高速なスモークテストを実行する"
      },
      {
        "vi": "Gửi email thông báo cho toàn bộ công ty",
        "en": "Send an email notification to the entire company",
        "ja": "会社全体にメール通知を送信する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Pre-commit hook chặn commit chất lượng thấp sớm nhất có thể, thường chạy lint/format và smoke test nhanh để tránh phá vỡ pipeline CI.",
      "en": "Pre-commit hooks catch low-quality commits as early as possible, typically running lint/format and a quick smoke test to avoid breaking the CI pipeline.",
      "ja": "pre-commitフックは低品質なコミットをできるだけ早く防ぐため、通常lint/整形と高速なスモークテストを実行しCIパイプラインの破壊を避けます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một PR chứa thay đổi test automation bị reviewer yêu cầu sửa nhiều lần, thực hành commit nào giúp reviewer dễ theo dõi nhất?",
      "en": "When a PR containing test automation changes gets multiple review rounds, which commit practice makes it easiest for reviewers to follow?",
      "ja": "テスト自動化の変更を含むPRが複数回レビューされる場合、レビュアーが追いやすい最も良いコミット方法はどれですか。"
    },
    "options": [
      {
        "vi": "Squash toàn bộ thay đổi thành một commit khổng lồ ngay từ đầu, không phân tách",
        "en": "Squash all changes into one giant commit from the very start, without separation",
        "ja": "最初からすべての変更を1つの巨大なコミットにまとめてしまう"
      },
      {
        "vi": "Xóa và tạo lại PR mới mỗi lần có comment",
        "en": "Delete and recreate the PR every time there's a review comment",
        "ja": "レビューコメントがあるたびにPRを削除して作り直す"
      },
      {
        "vi": "Force-push đè lên history mà không thông báo cho reviewer",
        "en": "Force-push over the history without notifying the reviewer",
        "ja": "レビュアーに知らせずにforce-pushして履歴を上書きする"
      },
      {
        "vi": "Commit thêm các thay đổi sửa theo comment với message rõ ràng, sau đó squash gọn khi merge nếu team quy ước vậy",
        "en": "Add follow-up commits addressing review comments with clear messages, then squash cleanly at merge time if the team convention calls for it",
        "ja": "レビューコメントへの対応を明確なメッセージで追加コミットし、チームの慣習に従ってマージ時にきれいにsquashする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Commit gia tăng theo từng vòng review giúp reviewer thấy rõ thay đổi nào ứng với comment nào, còn squash cuối cùng giữ lịch sử main gọn gàng.",
      "en": "Incremental commits per review round let reviewers clearly trace which change addresses which comment, while a final squash keeps main's history clean.",
      "ja": "レビューごとの段階的なコミットは、どの変更がどのコメントに対応するかをレビュアーが明確に追跡でき、最終的なsquashでmainの履歴もきれいに保てます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tag Git (git tag) thường được QA team dùng để đánh dấu điều gì trong quy trình test?",
      "en": "What do QA teams commonly use Git tags to mark in the testing workflow?",
      "ja": "QAチームはテストワークフローにおいてGitタグを何を示すために使いますか。"
    },
    "options": [
      {
        "vi": "Đánh dấu commit tương ứng với một phiên bản release đã được test và regression pass để dễ dàng quay lại tham chiếu sau này",
        "en": "Marking the commit corresponding to a released version that has passed testing/regression, for easy future reference",
        "ja": "テストや回帰テストに合格したリリースバージョンに対応するコミットを示し、後で簡単に参照できるようにするため"
      },
      {
        "vi": "Đánh dấu file nào cần xóa",
        "en": "Marking which files need to be deleted",
        "ja": "削除すべきファイルを示すため"
      },
      {
        "vi": "Đánh dấu ai là người viết test nhiều nhất",
        "en": "Marking who wrote the most tests",
        "ja": "最も多くテストを書いた人を示すため"
      },
      {
        "vi": "Đánh dấu commit bị lỗi cú pháp để Git tự sửa",
        "en": "Marking commits with syntax errors so Git auto-fixes them",
        "ja": "構文エラーのあるコミットを示しGitに自動修正させるため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tag (ví dụ v1.2.0) gắn cố định vào một commit cụ thể, thường dùng đánh dấu bản release đã qua kiểm thử, phục vụ traceability và rollback.",
      "en": "A tag (e.g. v1.2.0) permanently points to a specific commit, commonly used to mark a tested release build for traceability and rollback.",
      "ja": "タグ（例: v1.2.0）は特定のコミットを恒久的に指し、トレーサビリティやロールバックのためテスト済みリリースを示すのに使われます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "git stash được dùng trong tình huống nào khi đang viết test tự động?",
      "en": "In which situation is git stash used while writing automated tests?",
      "ja": "自動テストを書いている最中、git stashはどのような場面で使われますか。"
    },
    "options": [
      {
        "vi": "Khi muốn xóa vĩnh viễn một file test",
        "en": "When you want to permanently delete a test file",
        "ja": "テストファイルを完全に削除したいとき"
      },
      {
        "vi": "Khi đang dở dang sửa test nhưng cần chuyển sang branch khác gấp để fix bug khẩn, có thể tạm cất thay đổi chưa commit rồi lấy lại sau",
        "en": "When you're mid-way through editing a test but urgently need to switch branches to fix a critical bug, allowing you to temporarily shelve uncommitted changes and restore them later",
        "ja": "テストの編集途中で緊急バグ修正のため別ブランチに切り替える必要がある際、未コミットの変更を一時的に退避し後で復元できる"
      },
      {
        "vi": "Khi muốn publish test framework lên npm",
        "en": "When you want to publish the test framework to npm",
        "ja": "テストフレームワークをnpmに公開したいとき"
      },
      {
        "vi": "Khi muốn merge hai remote repository khác nhau",
        "en": "When you want to merge two different remote repositories",
        "ja": "2つの異なるリモートリポジトリをマージしたいとき"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "git stash tạm lưu working directory chưa commit để chuyển branch sạch sẽ, sau đó pop lại để tiếp tục công việc dang dở.",
      "en": "git stash temporarily saves uncommitted working directory changes so you can switch branches cleanly, then pop them back later to resume work.",
      "ja": "git stashは未コミットの作業内容を一時保存し、クリーンな状態でブランチを切り替え、後でpopして作業を再開できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì KHÔNG nên làm khi commit vào repository chứa test automation framework?",
      "en": "What should you NOT do when committing to a repository containing a test automation framework?",
      "ja": "テスト自動化フレームワークを含むリポジトリにコミットする際、してはいけないことは何ですか。"
    },
    "options": [
      {
        "vi": "Viết commit message mô tả rõ thay đổi gì và tại sao",
        "en": "Writing a commit message that clearly describes what changed and why",
        "ja": "何がどう変更され、なぜそうしたかを明確に記述したコミットメッセージを書く"
      },
      {
        "vi": "Chia nhỏ commit theo từng thay đổi logic riêng biệt",
        "en": "Splitting commits by separate logical changes",
        "ja": "論理的に独立した変更ごとにコミットを分割する"
      },
      {
        "vi": "Commit hardcode API key, mật khẩu hoặc token dùng để login vào môi trường test thật",
        "en": "Committing hardcoded API keys, passwords, or tokens used to log into a real test environment",
        "ja": "実際のテスト環境にログインするためのAPIキー、パスワード、トークンをハードコードしてコミットする"
      },
      {
        "vi": "Chạy test cục bộ trước khi commit",
        "en": "Running tests locally before committing",
        "ja": "コミット前にローカルでテストを実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hardcode secret vào repo là lỗ hổng bảo mật nghiêm trọng, dù xóa sau vẫn còn trong lịch sử Git; nên dùng biến môi trường hoặc secret manager.",
      "en": "Hardcoding secrets in a repo is a serious security vulnerability — even if removed later, it remains in Git history; use environment variables or a secret manager instead.",
      "ja": "シークレットをリポジトリにハードコードすることは重大なセキュリティ脆弱性であり、後で削除してもGit履歴に残るため、環境変数やシークレット管理を使うべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Quy tắc branch protection trên main (yêu cầu PR review + CI pass trước khi merge) mang lại lợi ích chính nào cho test automation?",
      "en": "What is the main benefit of branch protection rules on main (requiring PR review + passing CI before merge) for test automation?",
      "ja": "main上のブランチ保護ルール（マージ前にPRレビューとCI合格を必須とする）はテスト自動化にどのような主な利点をもたらしますか。"
    },
    "options": [
      {
        "vi": "Giúp code chạy nhanh hơn về mặt hiệu năng runtime",
        "en": "Makes the code run faster at runtime",
        "ja": "ランタイムのパフォーマンスが向上する"
      },
      {
        "vi": "Giảm dung lượng ổ cứng của máy chủ CI",
        "en": "Reduces disk usage on the CI server",
        "ja": "CIサーバーのディスク使用量を削減する"
      },
      {
        "vi": "Tự động sinh tài liệu API",
        "en": "Automatically generates API documentation",
        "ja": "APIドキュメントを自動生成する"
      },
      {
        "vi": "Ngăn code test chưa được kiểm chứng hoặc gây fail CI lọt vào nhánh chính, giữ main luôn ở trạng thái ổn định, có thể release",
        "en": "Prevents unverified test code or CI-breaking changes from entering the main branch, keeping main always in a stable, releasable state",
        "ja": "未検証のテストコードやCIを失敗させる変更がmainブランチに入るのを防ぎ、mainを常に安定したリリース可能な状態に保つ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Branch protection buộc mọi thay đổi phải qua review và CI pass, tránh việc merge code lỗi hoặc test fail trực tiếp vào main.",
      "en": "Branch protection forces every change through review and passing CI, preventing broken code or failing tests from merging directly into main.",
      "ja": "ブランチ保護はすべての変更にレビューとCI合格を義務付け、壊れたコードやテスト失敗がmainに直接マージされるのを防ぎます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Git, .gitattributes có thể được cấu hình để làm gì liên quan tới test data giữa các hệ điều hành khác nhau (Windows/Linux)?",
      "en": "In Git, what can .gitattributes be configured to do regarding test data across different operating systems (Windows/Linux)?",
      "ja": "Gitにおいて、異なるOS（Windows/Linux）間のテストデータに関して.gitattributesは何を設定するために使えますか。"
    },
    "options": [
      {
        "vi": "Chuẩn hóa line ending (LF/CRLF) để tránh diff giả và lỗi parse file test data khi làm việc đa hệ điều hành",
        "en": "Normalize line endings (LF/CRLF) to avoid false diffs and test-data parsing errors when working across operating systems",
        "ja": "異なるOSで作業する際の改行コード（LF/CRLF）を正規化し、偽の差分やテストデータ解析エラーを防ぐ"
      },
      {
        "vi": "Tự động dịch test case sang nhiều ngôn ngữ",
        "en": "Automatically translate test cases into multiple languages",
        "ja": "テストケースを複数言語に自動翻訳する"
      },
      {
        "vi": "Chạy test song song trên nhiều máy",
        "en": "Run tests in parallel across multiple machines",
        "ja": "複数マシンでテストを並列実行する"
      },
      {
        "vi": "Tăng tốc độ mạng khi push code",
        "en": "Speed up the network when pushing code",
        "ja": "コードpush時のネットワーク速度を向上させる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": ".gitattributes có thể ép line ending nhất quán (ví dụ text=auto eol=lf), tránh tình trạng file CSV/JSON test data bị đổi ký tự xuống dòng gây lỗi parse hoặc diff sai lệch không cần thiết.",
      "en": ".gitattributes can enforce consistent line endings (e.g. text=auto eol=lf), preventing CSV/JSON test data files from having altered line endings that cause parsing errors or noisy diffs.",
      "ja": ".gitattributesは改行コードの一貫性（例: text=auto eol=lf）を強制でき、CSV/JSONテストデータの改行が変わることによる解析エラーや不要な差分ノイズを防ぎます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi phát hiện một commit đã push lên nhánh chia sẻ (shared branch) chứa lỗi phá vỡ toàn bộ test suite, cách xử lý AN TOÀN nhất là gì?",
      "en": "When you discover a commit already pushed to a shared branch contains a bug that breaks the entire test suite, what is the SAFEST way to fix it?",
      "ja": "共有ブランチにすでにpushされたコミットがテストスイート全体を壊すバグを含んでいると判明した場合、最も安全な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng git reset --hard rồi force-push để xóa commit khỏi lịch sử chung",
        "en": "Use git reset --hard then force-push to remove the commit from shared history",
        "ja": "git reset --hardしてforce-pushし共有履歴からコミットを削除する"
      },
      {
        "vi": "Dùng git revert để tạo commit mới hoàn tác thay đổi, giữ nguyên lịch sử cho những người đã pull",
        "en": "Use git revert to create a new commit that undoes the change, preserving history for others who already pulled",
        "ja": "git revertで変更を取り消す新しいコミットを作成し、すでにpullした人のために履歴を保持する"
      },
      {
        "vi": "Xóa toàn bộ repository và tạo lại từ đầu",
        "en": "Delete the entire repository and start over",
        "ja": "リポジトリ全体を削除して最初からやり直す"
      },
      {
        "vi": "Không làm gì, để commit lỗi tồn tại vì test suite sẽ tự sửa",
        "en": "Do nothing and leave the broken commit, since the test suite will fix itself",
        "ja": "何もせず、テストスイートが自動的に直ることを期待して放置する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trên nhánh đã chia sẻ, git revert an toàn hơn vì không viết lại lịch sử, tránh gây conflict và mất đồng bộ cho các thành viên khác đã pull commit đó.",
      "en": "On a shared branch, git revert is safer because it doesn't rewrite history, avoiding conflicts and desync for teammates who already pulled that commit.",
      "ja": "共有ブランチではgit revertの方が安全です。履歴を書き換えないため、すでにそのコミットをpullした他のメンバーとのコンフリクトや不整合を避けられます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Git submodule có thể được dùng cho mục đích gì trong dự án test automation lớn?",
      "en": "What can Git submodules be used for in a large test automation project?",
      "ja": "大規模なテスト自動化プロジェクトにおいてGitサブモジュールは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Tăng tốc độ chạy test lên gấp đôi",
        "en": "Doubling test execution speed",
        "ja": "テスト実行速度を2倍にする"
      },
      {
        "vi": "Tự động sửa lỗi test flaky",
        "en": "Automatically fixing flaky tests",
        "ja": "フレーキーテストを自動的に修正する"
      },
      {
        "vi": "Nhúng một thư viện test helper hoặc bộ dữ liệu test dùng chung được quản lý ở repository riêng vào trong project chính",
        "en": "Embedding a shared test-helper library or a test-data set, maintained in its own separate repository, into the main project",
        "ja": "独立したリポジトリで管理されている共有のテストヘルパーライブラリやテストデータセットをメインプロジェクトに組み込む"
      },
      {
        "vi": "Mã hóa toàn bộ report test",
        "en": "Encrypting the entire test report",
        "ja": "テストレポート全体を暗号化する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Submodule cho phép tham chiếu tới một repo con cụ thể (ví dụ common test utils) ở một commit cố định, tái sử dụng code giữa nhiều project.",
      "en": "Submodules let you reference a specific child repo (e.g. common test utilities) pinned to a fixed commit, enabling code reuse across multiple projects.",
      "ja": "サブモジュールは特定の子リポジトリ（例: 共通テストユーティリティ）を固定コミットで参照でき、複数プロジェクト間でコードを再利用できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong CI pipeline, việc trigger test suite dựa trên sự kiện Git nào là phổ biến nhất để đảm bảo mọi thay đổi được kiểm tra?",
      "en": "In a CI pipeline, which Git event is most commonly used to trigger a test suite to ensure every change gets verified?",
      "ja": "CIパイプラインにおいて、すべての変更を検証するためにテストスイートをトリガーする最も一般的なGitイベントは何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ khi tạo tag release mới, không chạy lúc nào khác",
        "en": "Only when a new release tag is created, never at any other time",
        "ja": "新しいリリースタグが作成されたときのみで、他のタイミングでは実行しない"
      },
      {
        "vi": "Chỉ khi xóa branch",
        "en": "Only when a branch is deleted",
        "ja": "ブランチが削除されたときのみ"
      },
      {
        "vi": "Chỉ khi admin thủ công bấm nút mỗi tuần một lần",
        "en": "Only when an admin manually clicks a button once a week",
        "ja": "管理者が毎週手動でボタンを押したときのみ"
      },
      {
        "vi": "push commit lên branch và mở/cập nhật Pull Request",
        "en": "Pushing a commit to a branch and opening/updating a Pull Request",
        "ja": "ブランチへのコミットpushとプルリクエストの作成・更新"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "CI thường cấu hình trigger on push và on pull_request để chạy test ngay khi có thay đổi, giúp phát hiện lỗi sớm trước khi merge.",
      "en": "CI is typically configured to trigger on push and on pull_request events to run tests as soon as changes occur, catching issues early before merge.",
      "ja": "CIは通常pushとpull_requestイベントでトリガーされるよう設定され、変更が発生した直後にテストを実行し、マージ前に早期に問題を発見します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Semantic commit message (ví dụ: \"test: fix login flaky test do race condition\") mang lại lợi ích gì cho team automation?",
      "en": "What benefit does a semantic commit message (e.g. \"test: fix login flaky test due to race condition\") bring to an automation team?",
      "ja": "セマンティックなコミットメッセージ（例:「test: ログインのフレーキーテストをレースコンディションのため修正」）は自動化チームにどんな利点をもたらしますか。"
    },
    "options": [
      {
        "vi": "Giúp phân loại và tìm kiếm lịch sử thay đổi dễ dàng hơn, có thể dùng để tự động sinh changelog",
        "en": "Makes it easier to categorize and search change history, and can be used to auto-generate a changelog",
        "ja": "変更履歴の分類・検索が容易になり、チェンジログの自動生成にも活用できる"
      },
      {
        "vi": "Làm test chạy nhanh hơn",
        "en": "Makes tests run faster",
        "ja": "テストの実行が速くなる"
      },
      {
        "vi": "Tự động fix lỗi trong code",
        "en": "Automatically fixes bugs in the code",
        "ja": "コード内のバグを自動修正する"
      },
      {
        "vi": "Bắt buộc Git phải nén commit đó lại",
        "en": "Forces Git to compress that commit",
        "ja": "そのコミットをGitに強制的に圧縮させる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Prefix như test:, fix:, feat: giúp phân loại commit theo mục đích, hỗ trợ tìm kiếm nhanh và công cụ có thể tự sinh changelog từ đó.",
      "en": "Prefixes like test:, fix:, feat: categorize commits by purpose, enabling fast searching and automated changelog generation from commit history.",
      "ja": "test:、fix:、feat:のようなプレフィックスはコミットを目的別に分類し、検索を容易にし、コミット履歴からのチェンジログ自動生成を可能にします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi review PR, thấy một test case mới bị comment lại (bị disable bằng //skip) mà không có giải thích, phản ứng phù hợp của reviewer là gì?",
      "en": "When reviewing a PR, you notice a new test case has been disabled (e.g. via //skip) without any explanation. What is the appropriate reviewer reaction?",
      "ja": "PRレビュー中、新しいテストケースが説明なしに（例: //skipで）無効化されているのを見つけた場合、レビュアーの適切な対応は何ですか。"
    },
    "options": [
      {
        "vi": "Tự động approve vì test bị skip không ảnh hưởng gì",
        "en": "Auto-approve since a skipped test has no impact",
        "ja": "スキップされたテストは影響がないので自動的に承認する"
      },
      {
        "vi": "Yêu cầu tác giả giải thích lý do skip và thêm comment/ticket tham chiếu, tránh việc skip âm thầm che giấu bug hoặc giảm coverage không kiểm soát",
        "en": "Ask the author to explain the reason for skipping and add a comment/reference ticket, to avoid silently hiding a bug or uncontrolled coverage loss",
        "ja": "作成者にスキップの理由を説明させ、コメントや参照チケットを追加させる。これにより、バグを隠蔽したり制御不能なカバレッジ低下を招くことを防ぐ"
      },
      {
        "vi": "Xóa toàn bộ PR ngay lập tức không hỏi lý do",
        "en": "Immediately delete the entire PR without asking why",
        "ja": "理由を尋ねずに直ちにPR全体を削除する"
      },
      {
        "vi": "Merge ngay để tiết kiệm thời gian",
        "en": "Merge immediately to save time",
        "ja": "時間節約のためすぐにマージする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Skip test không giải thích có thể che giấu bug thật hoặc nợ kỹ thuật; reviewer nên yêu cầu lý do rõ ràng và theo dõi bằng ticket để không bị quên.",
      "en": "Unexplained skipped tests can mask real bugs or accumulate technical debt silently; reviewers should require a clear reason and a tracking ticket so it isn't forgotten.",
      "ja": "説明のないテストスキップは実際のバグや技術的負債を隠す可能性があるため、レビュアーは明確な理由を求め、忘れないよう追跡チケットを付けるべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Git, sự khác biệt giữa git fetch và git pull là gì, điều này quan trọng thế nào khi đồng bộ test framework?",
      "en": "In Git, what is the difference between git fetch and git pull, and why does it matter when syncing a test framework?",
      "ja": "Gitにおいてgit fetchとgit pullの違いは何で、テストフレームワークの同期においてなぜ重要ですか。"
    },
    "options": [
      {
        "vi": "pull chỉ tải về mà không merge, fetch mới tự động merge",
        "en": "Pull only downloads without merging; fetch automatically merges",
        "ja": "pullはダウンロードのみでマージしない。fetchが自動的にマージする"
      },
      {
        "vi": "fetch và pull hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "Fetch and pull are completely identical, just different names",
        "ja": "fetchとpullは完全に同一で名前が違うだけである"
      },
      {
        "vi": "fetch chỉ tải về thay đổi từ remote mà không tự động merge vào working branch, còn pull = fetch + merge ngay lập tức",
        "en": "Fetch only downloads changes from remote without merging into the working branch, while pull is fetch + immediate merge",
        "ja": "fetchはリモートの変更をダウンロードするだけで作業ブランチに自動マージしないが、pullはfetch+即座のマージである"
      },
      {
        "vi": "fetch xóa toàn bộ commit local chưa push",
        "en": "Fetch deletes all local commits that haven't been pushed",
        "ja": "fetchは未pushのローカルコミットをすべて削除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "fetch an toàn hơn vì chỉ cập nhật thông tin remote-tracking để xem trước thay đổi, còn pull tự merge ngay có thể gây conflict bất ngờ nếu chưa kiểm tra kỹ.",
      "en": "Fetch is safer since it only updates remote-tracking references so you can preview changes, while pull merges immediately and can cause unexpected conflicts if not reviewed first.",
      "ja": "fetchはリモート追跡情報を更新するだけで変更を事前確認できるため安全であり、pullは即座にマージするため事前確認なしでは予期しないコンフリクトを招く可能性があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao nhóm automation nên tránh commit trực tiếp thư mục node_modules hoặc thư mục driver binary (chromedriver, geckodriver) vào Git?",
      "en": "Why should an automation team avoid directly committing the node_modules folder or driver binaries (chromedriver, geckodriver) to Git?",
      "ja": "自動化チームがnode_modulesフォルダやドライバーバイナリ（chromedriver、geckodriverなど）を直接Gitにコミットすべきでない理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì node_modules luôn chứa mã độc",
        "en": "Because node_modules always contains malware",
        "ja": "node_modulesには常にマルウェアが含まれているため"
      },
      {
        "vi": "Vì Git không cho phép lưu file .exe hoặc .dll",
        "en": "Because Git does not allow storing .exe or .dll files",
        "ja": "Gitは.exeや.dllファイルの保存を許可していないため"
      },
      {
        "vi": "Vì commit driver binary sẽ tự động xóa test case",
        "en": "Because committing driver binaries automatically deletes test cases",
        "ja": "ドライバーバイナリをコミットするとテストケースが自動的に削除されるため"
      },
      {
        "vi": "Vì chúng là file lớn, thay đổi theo môi trường/hệ điều hành, có thể cài lại dễ dàng qua package manager, commit chỉ làm phình repo và gây conflict vô nghĩa",
        "en": "Because they are large, environment/OS-specific files that can easily be reinstalled via a package manager; committing them only bloats the repo and causes meaningless conflicts",
        "ja": "これらは大きく、環境やOSに依存するファイルであり、パッケージマネージャーで簡単に再インストールできるため、コミットするとリポジトリが肥大化し無意味なコンフリクトを引き起こすだけであるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các file này nên khai báo trong package.json/config và cài đặt lại qua npm install hoặc trình quản lý driver, đưa vào .gitignore để giữ repo nhẹ và tránh conflict không cần thiết theo môi trường.",
      "en": "These files should be declared in package.json/config and reinstalled via npm install or a driver manager, added to .gitignore to keep the repo lightweight and avoid unnecessary environment-specific conflicts.",
      "ja": "これらのファイルはpackage.json/設定に宣言し、npm installやドライバーマネージャーで再インストールすべきで、.gitignoreに追加してリポジトリを軽量に保ち環境依存の不要なコンフリクトを避けるべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi một reviewer thấy PR test automation có diff quá lớn (hàng nghìn dòng, gộp nhiều tính năng không liên quan), rủi ro chính là gì?",
      "en": "When a reviewer sees a test automation PR with a massive diff (thousands of lines, bundling unrelated features), what is the main risk?",
      "ja": "レビュアーがテスト自動化PRで巨大な差分（数千行、無関係な機能が混在）を見た場合、主なリスクは何ですか。"
    },
    "options": [
      {
        "vi": "Review hời hợt do quá tải thông tin, khó phát hiện lỗi logic hoặc test thiếu coverage, khó rollback nếu có vấn đề vì thay đổi đan xen nhau",
        "en": "Superficial review due to information overload, making it hard to catch logic bugs or coverage gaps, and hard to roll back if issues arise since changes are intertwined",
        "ja": "情報過多による表面的なレビューとなり、論理バグやカバレッジ不足を見逃しやすく、変更が絡み合っているため問題発生時のロールバックも困難になる"
      },
      {
        "vi": "Diff lớn luôn có nghĩa là chất lượng code tốt hơn",
        "en": "A large diff always means better code quality",
        "ja": "大きな差分は常により良いコード品質を意味する"
      },
      {
        "vi": "CI sẽ tự động từ chối mọi PR lớn",
        "en": "CI will automatically reject any large PR",
        "ja": "CIは大きなPRを自動的に拒否する"
      },
      {
        "vi": "Không có rủi ro nào, càng lớn càng tốt vì tiết kiệm số lượng PR",
        "en": "There is no risk; bigger is better because it reduces the number of PRs",
        "ja": "リスクはなく、PR数を減らせるので大きいほど良い"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "PR quá lớn khiến reviewer khó tập trung, dễ bỏ sót lỗi, và nếu phát hiện vấn đề sau merge thì việc revert/rollback phức tạp vì nhiều thay đổi không liên quan bị trộn lẫn.",
      "en": "An oversized PR overwhelms reviewers, makes bugs easy to miss, and if an issue is found post-merge, reverting is complicated because unrelated changes are tangled together.",
      "ja": "過大なPRはレビュアーの負荷を増大させバグを見逃しやすくし、マージ後に問題が見つかった場合も無関係な変更が絡み合っているためロールバックが複雑になります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "git log --author kết hợp với --grep có thể giúp QA lead làm gì trong quản lý nhóm automation?",
      "en": "How can git log --author combined with --grep help a QA lead manage an automation team?",
      "ja": "git log --authorと--grepの組み合わせは、QAリーダーが自動化チームを管理する上でどう役立ちますか。"
    },
    "options": [
      {
        "vi": "Tự động phân công task test mới cho từng thành viên",
        "en": "Automatically assigning new test tasks to each member",
        "ja": "各メンバーに新しいテストタスクを自動的に割り当てる"
      },
      {
        "vi": "Lọc lịch sử commit theo tác giả cụ thể và từ khóa trong message (ví dụ tìm mọi commit sửa \"login test\" của một dev) để rà soát đóng góp hoặc điều tra thay đổi liên quan",
        "en": "Filtering commit history by a specific author and keyword in the message (e.g. finding every \"login test\" fix commit by a dev) to review contributions or investigate related changes",
        "ja": "特定の作成者とメッセージ内のキーワードでコミット履歴をフィルタリングする（例: あるdevの「login test」修正コミットをすべて検索する）ことで貢献度確認や関連変更の調査に役立てる"
      },
      {
        "vi": "Tự động xóa commit của thành viên nghỉ việc",
        "en": "Automatically delete commits from a member who has left the team",
        "ja": "退職したメンバーのコミットを自動削除する"
      },
      {
        "vi": "Đổi tên tác giả của tất cả commit cũ",
        "en": "Rename the author of all old commits",
        "ja": "すべての古いコミットの作成者名を変更する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kết hợp --author và --grep cho phép lọc chính xác lịch sử commit theo người và nội dung, hữu ích khi cần truy vết ai đã sửa gì liên quan tới một khu vực test cụ thể.",
      "en": "Combining --author and --grep precisely filters commit history by person and content, useful for tracing who changed what related to a specific test area.",
      "ja": "--authorと--grepを組み合わせることで、人物と内容の両方でコミット履歴を正確にフィルタリングでき、特定のテスト領域に関連する変更の追跡に役立ちます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong workflow Gitflow áp dụng cho một dự án automation, nhánh \"release\" thường dùng để làm gì trước khi merge vào main?",
      "en": "In a Gitflow workflow applied to an automation project, what is the \"release\" branch typically used for before merging into main?",
      "ja": "自動化プロジェクトに適用されるGitflowワークフローにおいて、「release」ブランチはmainにマージする前に通常何のために使われますか。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ test suite cũ để thay bằng bộ mới",
        "en": "Deleting the entire old test suite to replace it with a new one",
        "ja": "古いテストスイート全体を削除して新しいものに置き換える"
      },
      {
        "vi": "Viết tất cả test case mới từ đầu",
        "en": "Writing all new test cases from scratch",
        "ja": "すべての新しいテストケースを最初から書く"
      },
      {
        "vi": "Chạy full regression test suite, ổn định lại code, chỉ sửa bug nhỏ, không thêm tính năng mới",
        "en": "Running the full regression suite, stabilizing the code, fixing only minor bugs, and not adding new features",
        "ja": "フルリグレッションテストスイートを実行し、コードを安定化させ、軽微なバグ修正のみ行い新機能は追加しない"
      },
      {
        "vi": "Thử nghiệm các tính năng thử nghiệm rủi ro cao chưa hoàn thiện",
        "en": "Experimenting with unfinished, high-risk experimental features",
        "ja": "未完成でリスクの高い実験的機能を試す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nhánh release trong Gitflow dùng để chốt lại phiên bản chuẩn bị phát hành: chạy regression đầy đủ, sửa lỗi nhỏ phát sinh, tránh thêm tính năng mới gây bất ổn.",
      "en": "The release branch in Gitflow is used to finalize a version prior to shipping: running full regression, fixing minor issues found, and avoiding new feature additions that could destabilize it.",
      "ja": "Gitflowのreleaseブランチはリリース前のバージョンを確定させるために使われ、フルリグレッションを実行し軽微な問題を修正し、不安定化を招く新機能追加は避けます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì xảy ra nếu QA quên chạy git pull trước khi bắt đầu viết test mới trên một nhánh feature đã lỗi thời nhiều commit?",
      "en": "What happens if a QA engineer forgets to run git pull before starting to write new tests on a feature branch that is many commits behind?",
      "ja": "多くのコミット分遅れているフィーチャーブランチで新しいテストを書き始める前にgit pullを忘れた場合、何が起こりますか。"
    },
    "options": [
      {
        "vi": "Không có vấn đề gì, Git tự động đồng bộ theo thời gian thực",
        "en": "No issue at all, since Git automatically syncs in real time",
        "ja": "Gitはリアルタイムで自動同期するため問題は起こらない"
      },
      {
        "vi": "Git sẽ ngăn không cho commit bất kỳ thay đổi nào",
        "en": "Git will block any commits from being made",
        "ja": "Gitはいかなる変更のコミットも阻止する"
      },
      {
        "vi": "Repository sẽ tự động bị xóa",
        "en": "The repository will be automatically deleted",
        "ja": "リポジトリが自動的に削除される"
      },
      {
        "vi": "Test mới có thể dựa trên page object/selector đã lỗi thời, dễ dẫn tới conflict lớn khi push và có thể viết test trùng lặp với người khác đã làm",
        "en": "The new tests may be built on outdated page objects/selectors, leading to large conflicts when pushing, and risk duplicating work someone else already did",
        "ja": "新しいテストが古くなったページオブジェクトやセレクタに基づいて書かれ、push時に大きなコンフリクトが起きたり、他の人がすでに行った作業と重複したりするリスクがある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Làm việc trên branch cũ dễ gây conflict lớn khi tích hợp và có nguy cơ trùng lặp công sức với đồng đội đã cập nhật selector/logic mới; nên pull/rebase thường xuyên.",
      "en": "Working on a stale branch causes large integration conflicts and risks duplicating effort with teammates who already updated selectors/logic; frequent pull/rebase is recommended.",
      "ja": "古いブランチで作業すると統合時に大きなコンフリクトが発生し、すでにセレクタやロジックを更新した同僚と作業が重複するリスクがあるため、頻繁なpull/rebaseが推奨されます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh git diff giữa hai commit của một file Page Object, mục đích chính của reviewer khi đọc diff này là gì?",
      "en": "When comparing git diff between two commits of a Page Object file, what is the reviewer's main purpose in reading this diff?",
      "ja": "Page Objectファイルの2つのコミット間のgit diffを比較する際、レビュアーがこの差分を読む主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Xác nhận selector/method mới không phá vỡ các test khác đang dùng chung Page Object đó và thay đổi có ý nghĩa hợp lý",
        "en": "Confirming that new selectors/methods don't break other tests sharing that Page Object, and that the change makes logical sense",
        "ja": "新しいセレクタやメソッドが同じPage Objectを共有する他のテストを壊さないこと、そして変更が論理的に妥当であることを確認するため"
      },
      {
        "vi": "Đếm số ký tự đã thay đổi để tính lương",
        "en": "Counting the number of changed characters for payroll purposes",
        "ja": "給与計算のために変更文字数を数えるため"
      },
      {
        "vi": "Kiểm tra font chữ trong file",
        "en": "Checking the font used in the file",
        "ja": "ファイル内のフォントを確認するため"
      },
      {
        "vi": "Xác định màu sắc giao diện của ứng dụng",
        "en": "Determining the application's UI color scheme",
        "ja": "アプリケーションのUI配色を確認するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Page Object thường được nhiều test case dùng chung, nên reviewer cần xác nhận thay đổi selector/method không gây side-effect phá vỡ các test khác đang phụ thuộc vào nó.",
      "en": "Page Objects are typically shared across many test cases, so the reviewer must confirm selector/method changes don't cause side effects that break other dependent tests.",
      "ja": "Page Objectは多くのテストケースで共有されるため、レビュアーはセレクタやメソッドの変更が依存する他のテストを壊す副作用を引き起こさないことを確認する必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một chiến lược tốt để quản lý phiên bản của bộ test data (ví dụ file JSON chứa tài khoản test) trong Git là gì?",
      "en": "What is a good strategy for version-controlling a test data set (e.g. a JSON file of test accounts) in Git?",
      "ja": "Gitでテストデータセット（例: テストアカウントを含むJSONファイル）をバージョン管理する良い戦略は何ですか。"
    },
    "options": [
      {
        "vi": "Không bao giờ thay đổi test data sau khi tạo lần đầu",
        "en": "Never change the test data after it's first created",
        "ja": "最初に作成した後はテストデータを一切変更しない"
      },
      {
        "vi": "Lưu test data không nhạy cảm trong repo có kiểm soát version như code, tách biệt dữ liệu nhạy cảm (mật khẩu thật) ra khỏi repo và dùng biến môi trường/secret store",
        "en": "Keep non-sensitive test data version-controlled in the repo like code, while separating sensitive data (real passwords) out of the repo using environment variables/a secret store",
        "ja": "機密性のないテストデータはコードと同様にリポジトリでバージョン管理し、機密データ（実際のパスワードなど）はリポジトリから分離し環境変数やシークレットストアを使用する"
      },
      {
        "vi": "Gửi test data qua email cho từng thành viên thay vì dùng Git",
        "en": "Send test data via email to each member instead of using Git",
        "ja": "Gitを使わず各メンバーにメールでテストデータを送る"
      },
      {
        "vi": "Lưu test data trực tiếp trong file test case, không tách riêng file",
        "en": "Embed test data directly inside test case files without separating it",
        "ja": "テストデータをテストケースファイル内に直接埋め込み分離しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test data không nhạy cảm nên version-control như code để dễ track thay đổi và rollback, còn dữ liệu nhạy cảm cần tách khỏi repo để tránh rò rỉ bảo mật.",
      "en": "Non-sensitive test data should be version-controlled like code for easy change tracking and rollback, while sensitive data must be kept out of the repo to avoid security leaks.",
      "ja": "機密性のないテストデータはコードのようにバージョン管理し変更追跡やロールバックを容易にすべきで、機密データはセキュリティ漏洩を避けるためリポジトリから分離すべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao \"Squash and merge\" trên GitHub thường được team automation chọn khi merge PR chứa nhiều commit \"WIP\", \"fix typo\", \"debug\"?",
      "en": "Why do automation teams often choose \"Squash and merge\" on GitHub when merging a PR full of \"WIP\", \"fix typo\", \"debug\" commits?",
      "ja": "「WIP」「fix typo」「debug」といったコミットが多いPRをマージする際、自動化チームがGitHubで「Squash and merge」を選ぶことが多いのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì squash sẽ tự động fix mọi bug trong test",
        "en": "Because squashing automatically fixes every bug in the tests",
        "ja": "squashはテスト内のすべてのバグを自動的に修正するため"
      },
      {
        "vi": "Vì đó là cách duy nhất GitHub cho phép merge",
        "en": "Because it is the only way GitHub allows merging",
        "ja": "それがGitHubがマージを許可する唯一の方法であるため"
      },
      {
        "vi": "Vì nó gộp toàn bộ commit lặt vặt thành một commit sạch trên main, giúp lịch sử dễ đọc và dễ revert nguyên một tính năng nếu cần",
        "en": "Because it condenses all the small messy commits into one clean commit on main, keeping history readable and making it easy to revert an entire feature if needed",
        "ja": "細々としたコミットを1つのクリーンなコミットにまとめ、履歴を読みやすくし、必要な場合に機能全体を簡単にrevertできるようにするため"
      },
      {
        "vi": "Vì squash sẽ xóa test khỏi repo",
        "en": "Because squashing deletes tests from the repo",
        "ja": "squashはリポジトリからテストを削除するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Squash gộp các commit nháp trong quá trình phát triển thành một commit ý nghĩa duy nhất trên main, giúp lịch sử main gọn gàng và dễ revert theo từng tính năng.",
      "en": "Squashing condenses the in-progress draft commits into a single meaningful commit on main, keeping main's history clean and easy to revert per feature.",
      "ja": "squashは開発中の下書きコミットを1つの意味のあるコミットに統合し、mainの履歴をきれいに保ち機能単位でのrevertを容易にします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong JMeter, thông số \"Ramp-up Period\" của Thread Group dùng để làm gì?",
      "en": "In JMeter, what does the \"Ramp-up Period\" setting of a Thread Group control?",
      "ja": "JMeterのスレッドグループにある「ランプアップ期間」は何を制御しますか?"
    },
    "options": [
      {
        "vi": "Ngưỡng số lượng thread tối đa mà server đích có thể xử lý an toàn",
        "en": "The maximum number of threads the target server can safely handle",
        "ja": "対象サーバーが安全に処理できる最大スレッド数のしきい値"
      },
      {
        "vi": "Số lần kịch bản test được lặp lại cho mỗi thread",
        "en": "The number of times the test script repeats for each thread",
        "ja": "各スレッドがテストスクリプトを繰り返す回数"
      },
      {
        "vi": "Thời gian chờ giữa hai request liên tiếp trong cùng một thread",
        "en": "The wait time between two consecutive requests within the same thread",
        "ja": "同じスレッド内で連続する2つのリクエストの間の待ち時間"
      },
      {
        "vi": "Khoảng thời gian JMeter dùng để khởi động dần tất cả các thread thay vì tạo đồng thời cùng lúc, giúp tránh gây tải đột ngột lên hệ thống",
        "en": "The time span JMeter uses to gradually start all threads instead of launching them all at once, avoiding a sudden load spike on the system",
        "ja": "JMeterがすべてのスレッドを一斉に起動せず、徐々に立ち上げるための時間で、システムへの急激な負荷を避ける役割を持つ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ramp-up Period quy định thời gian để JMeter khởi động lần lượt toàn bộ số thread đã cấu hình, giúp mô phỏng người dùng tăng dần thay vì tấn công đồng thời gây sai lệch kết quả.",
      "en": "Ramp-up Period defines how long JMeter takes to start all configured threads, simulating a gradual increase of users rather than an instant burst that would skew results.",
      "ja": "ランプアップ期間は、設定された全スレッドを起動し終えるまでの時間を定め、ユーザーが徐々に増える状況を再現し、瞬間的な同時起動による結果の歪みを防ぐ。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong JMeter, ô \"Loop Count\" của Thread Group quyết định điều gì?",
      "en": "In JMeter, what does the \"Loop Count\" field of a Thread Group determine?",
      "ja": "JMeterのスレッドグループにある「ループ回数」は何を決定しますか?"
    },
    "options": [
      {
        "vi": "Số lần mỗi thread thực thi toàn bộ kịch bản test (chuỗi sampler) từ đầu đến cuối trước khi kết thúc",
        "en": "The number of times each thread executes the full test script (chain of samplers) from start to end before finishing",
        "ja": "各スレッドが終了するまでにテストスクリプト（サンプラーの連鎖）を最初から最後まで実行する回数"
      },
      {
        "vi": "Thời gian tối đa mà test được phép chạy",
        "en": "The maximum duration the test is allowed to run",
        "ja": "テストが実行を許可される最大時間"
      },
      {
        "vi": "Số lượng thread song song được tạo ra",
        "en": "The number of concurrent threads created",
        "ja": "作成される並列スレッドの数"
      },
      {
        "vi": "Số request tối đa mỗi giây mà JMeter được phép gửi",
        "en": "The maximum number of requests per second JMeter is allowed to send",
        "ja": "JMeterが1秒間に送信できる最大リクエスト数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Loop Count xác định số vòng lặp mà mỗi thread chạy hết kịch bản test; kết hợp với số thread và ramp-up sẽ tạo ra tổng khối lượng tải mong muốn.",
      "en": "Loop Count sets how many times each thread repeats the entire script; combined with thread count and ramp-up it produces the desired total load.",
      "ja": "ループ回数は各スレッドがスクリプト全体を繰り返す回数を指定し、スレッド数やランプアップと組み合わせて目標の総負荷量を作り出す。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Response Assertion trong JMeter thường được dùng để kiểm tra điều gì?",
      "en": "What is a Response Assertion in JMeter typically used to verify?",
      "ja": "JMeterの「レスポンスアサーション」は通常何を検証するために使われますか?"
    },
    "options": [
      {
        "vi": "Thời gian phản hồi của server có nằm trong ngưỡng cho phép hay không",
        "en": "Whether the server's response time stays within an allowed threshold",
        "ja": "サーバーの応答時間が許容しきい値内かどうか"
      },
      {
        "vi": "Nội dung, mã trạng thái hoặc header của response có khớp với giá trị/mẫu mong đợi hay không, để xác nhận request thành công về mặt chức năng chứ không chỉ về tốc độ",
        "en": "Whether the response body, status code or headers match the expected value/pattern, confirming the request succeeded functionally rather than just quickly",
        "ja": "レスポンスの本文・ステータスコード・ヘッダーが期待する値やパターンと一致するかを確認し、速度だけでなく機能面でリクエストが成功したかを検証する"
      },
      {
        "vi": "Số lượng thread đang hoạt động tại một thời điểm",
        "en": "The number of threads currently active at a given moment",
        "ja": "ある時点でアクティブなスレッド数"
      },
      {
        "vi": "Mức sử dụng CPU và bộ nhớ của máy chủ chạy JMeter",
        "en": "CPU and memory usage of the machine running JMeter",
        "ja": "JMeterを実行しているマシンのCPUとメモリ使用率"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Response Assertion kiểm tra nội dung/mã trạng thái/header trả về, giúp phát hiện lỗi chức năng ẩn dưới tải cao dù thời gian phản hồi vẫn nhanh.",
      "en": "Response Assertion checks the returned body/status code/headers, catching functional errors hidden under load even when response time looks fast.",
      "ja": "レスポンスアサーションは返されたボディ・ステータスコード・ヘッダーを検証し、応答時間が速く見えても負荷下に隠れた機能エラーを検出できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Duration Assertion trong JMeter khác với Response Assertion ở điểm nào?",
      "en": "How does a Duration Assertion in JMeter differ from a Response Assertion?",
      "ja": "JMeterの「デュレーションアサーション」は「レスポンスアサーション」とどう違いますか?"
    },
    "options": [
      {
        "vi": "Duration Assertion kiểm tra header của response còn Response Assertion kiểm tra body",
        "en": "Duration Assertion checks response headers while Response Assertion checks the body",
        "ja": "デュレーションアサーションはレスポンスヘッダーを検証し、レスポンスアサーションは本文を検証する"
      },
      {
        "vi": "Duration Assertion chỉ dùng được với giao thức HTTPS",
        "en": "Duration Assertion only works with the HTTPS protocol",
        "ja": "デュレーションアサーションはHTTPSプロトコルでのみ使用できる"
      },
      {
        "vi": "Duration Assertion đánh giá mẫu sampler có bị fail hay không dựa trên thời gian phản hồi có vượt quá một ngưỡng cho trước hay không, trong khi Response Assertion đánh giá dựa trên nội dung trả về",
        "en": "Duration Assertion fails a sampler based on whether the response time exceeds a given threshold, while Response Assertion fails it based on the returned content",
        "ja": "デュレーションアサーションは応答時間が指定したしきい値を超えたかどうかでサンプラーを失敗判定し、レスポンスアサーションは返却内容に基づいて判定する"
      },
      {
        "vi": "Duration Assertion kiểm tra số lượng thread đồng thời còn Response Assertion kiểm tra loop count",
        "en": "Duration Assertion checks the number of concurrent threads while Response Assertion checks loop count",
        "ja": "デュレーションアサーションは同時スレッド数を検証し、レスポンスアサーションはループ回数を検証する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Duration Assertion chỉ quan tâm đến thời gian phản hồi vượt ngưỡng hay không, còn Response Assertion quan tâm đến nội dung/mã trạng thái trả về; hai loại này bổ trợ nhau để đánh giá cả tốc độ lẫn tính đúng đắn.",
      "en": "Duration Assertion cares only about whether response time exceeds a threshold, while Response Assertion cares about the returned content/status code; together they cover both speed and correctness.",
      "ja": "デュレーションアサーションは応答時間がしきい値を超えるかのみを見るが、レスポンスアサーションは返却内容やステータスコードを見る。両者は速度と正しさの両面を補完し合う。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong k6, khái niệm \"Virtual User\" (VU) mô tả điều gì?",
      "en": "In k6, what does the concept of \"Virtual User\" (VU) describe?",
      "ja": "k6における「仮想ユーザー」（VU）とは何を表しますか?"
    },
    "options": [
      {
        "vi": "Một plugin mở rộng để kết nối k6 với Grafana",
        "en": "An extension plugin that connects k6 to Grafana",
        "ja": "k6をGrafanaに接続するための拡張プラグイン"
      },
      {
        "vi": "Một biến toàn cục lưu token xác thực dùng chung cho toàn bộ test",
        "en": "A global variable storing an auth token shared across the whole test",
        "ja": "テスト全体で共有される認証トークンを格納するグローバル変数"
      },
      {
        "vi": "Một loại báo cáo tổng hợp xuất ra sau khi test kết thúc",
        "en": "A summary report type generated after the test finishes",
        "ja": "テスト終了後に生成されるサマリーレポートの一種"
      },
      {
        "vi": "Một luồng thực thi độc lập chạy lặp đi lặp lại hàm kịch bản test, mô phỏng hành vi của một người dùng thực song song với các VU khác",
        "en": "An independent execution unit that repeatedly runs the test script function, simulating one real user's behavior in parallel with other VUs",
        "ja": "テストスクリプト関数を繰り返し実行する独立した実行単位で、他のVUと並行して実際のユーザーの挙動を模倣するもの"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "VU trong k6 tương đương một luồng ảo thực thi hàm default() lặp lại, số lượng VU và thời gian chạy quyết định tải sinh ra.",
      "en": "A VU in k6 is a virtual thread repeatedly executing the default() function; the number of VUs and duration determine the generated load.",
      "ja": "k6のVUはdefault()関数を繰り返し実行する仮想スレッドであり、VU数と実行時間が生成される負荷を決定する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong file kịch bản k6, hàm \"default\" (export default function) đóng vai trò gì?",
      "en": "In a k6 script file, what role does the \"default\" function (export default function) play?",
      "ja": "k6のスクリプトファイルにおいて、「default」関数（export default function）はどんな役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Chứa đoạn code được mỗi VU thực thi lặp lại theo vòng lặp (iteration) trong suốt thời gian test, thường gồm các request và check",
        "en": "Contains the code each VU executes repeatedly per iteration for the duration of the test, typically including requests and checks",
        "ja": "各VUがテスト実行中、イテレーションごとに繰り返し実行するコード（通常はリクエストやチェックを含む）を格納する"
      },
      {
        "vi": "Cấu hình số lượng VU và stages cho toàn bộ test",
        "en": "Configures the number of VUs and stages for the whole test",
        "ja": "テスト全体のVU数とステージを設定する"
      },
      {
        "vi": "Xuất kết quả test ra file HTML report",
        "en": "Exports the test results to an HTML report file",
        "ja": "テスト結果をHTMLレポートファイルに出力する"
      },
      {
        "vi": "Định nghĩa threshold để quyết định test pass/fail",
        "en": "Defines thresholds to decide whether the test passes or fails",
        "ja": "テストの合否を決めるしきい値を定義する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Hàm default là phần thân kịch bản mà mỗi VU lặp lại thực thi mỗi iteration; cấu hình VU/stages nằm ở object options riêng biệt.",
      "en": "The default function is the script body each VU repeats per iteration; VU/stage configuration lives in a separate options object.",
      "ja": "default関数は各VUがイテレーションごとに繰り返すスクリプト本体であり、VU/ステージの設定は別のoptionsオブジェクトに置かれる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "CSV Data Set Config trong JMeter được dùng để làm gì trong kịch bản kiểm thử hiệu năng?",
      "en": "What is the CSV Data Set Config in JMeter used for in a performance test script?",
      "ja": "JMeterの「CSV Data Set Config」はパフォーマンステストのスクリプトで何のために使われますか?"
    },
    "options": [
      {
        "vi": "Ghi log kết quả test ra file CSV sau khi chạy xong",
        "en": "Writes test results to a CSV log file after the run finishes",
        "ja": "実行後にテスト結果をCSVログファイルへ書き出す"
      },
      {
        "vi": "Đọc dữ liệu từ file CSV để tham số hoá request, cho phép mỗi thread/iteration dùng dữ liệu khác nhau (ví dụ tài khoản đăng nhập, tham số tìm kiếm) thay vì cùng một giá trị cố định",
        "en": "Reads data from a CSV file to parameterize requests, letting each thread/iteration use different data (e.g. login accounts, search parameters) instead of one fixed value",
        "ja": "CSVファイルからデータを読み込んでリクエストをパラメータ化し、各スレッド/イテレーションが同じ固定値ではなく異なるデータ（例：ログインアカウント、検索パラメータ）を使えるようにする"
      },
      {
        "vi": "Cấu hình số lượng thread dựa trên số dòng trong file CSV",
        "en": "Configures the number of threads based on the number of rows in the CSV file",
        "ja": "CSVファイルの行数に基づいてスレッド数を設定する"
      },
      {
        "vi": "Mã hoá mật khẩu trước khi gửi trong request",
        "en": "Encrypts passwords before sending them in a request",
        "ja": "リクエスト送信前にパスワードを暗号化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "CSV Data Set Config nạp dữ liệu ngoài để tham số hoá kịch bản, tránh dùng một bộ dữ liệu cứng gây sai lệch kết quả (ví dụ cache, trùng khoá) khi mô phỏng nhiều người dùng thật.",
      "en": "CSV Data Set Config feeds external data to parameterize the script, avoiding a single hard-coded dataset that would skew results (e.g. caching, duplicate keys) when simulating many real users.",
      "ja": "CSV Data Set Configは外部データを読み込んでスクリプトをパラメータ化し、単一の固定データセットによる結果の歪み（キャッシュや重複キーなど）を避け、多数の実ユーザーを再現できるようにする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Timer (ví dụ Constant Timer) trong JMeter có mục đích gì?",
      "en": "What is the purpose of a Timer (e.g. Constant Timer) in JMeter?",
      "ja": "JMeterのタイマー（例：定数タイマー）の目的は何ですか?"
    },
    "options": [
      {
        "vi": "Giới hạn tổng thời gian chạy của toàn bộ test plan",
        "en": "Limits the total run time of the entire test plan",
        "ja": "テストプラン全体の実行時間を制限する"
      },
      {
        "vi": "Đo thời gian phản hồi trung bình của server",
        "en": "Measures the server's average response time",
        "ja": "サーバーの平均応答時間を測定する"
      },
      {
        "vi": "Chèn khoảng dừng giữa các request để mô phỏng thời gian người dùng thật đọc/nghĩ trước khi thao tác tiếp (think time), giúp tải sinh ra thực tế hơn",
        "en": "Inserts a pause between requests to simulate the time a real user spends reading/thinking before acting again (think time), making the generated load more realistic",
        "ja": "リクエスト間に一時停止を挿入し、実ユーザーが次の操作をする前に読んだり考えたりする時間（シンクタイム）を再現することで、生成される負荷をより現実的にする"
      },
      {
        "vi": "Tự động dừng test khi phát hiện lỗi",
        "en": "Automatically stops the test when an error is detected",
        "ja": "エラーを検出したときに自動的にテストを停止する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Timer thêm think time giữa các request, giúp kịch bản mô phỏng gần với hành vi người dùng thật thay vì bắn request liên tục không nghỉ.",
      "en": "Timers add think time between requests, making the script closer to real user behavior instead of firing requests back-to-back with no pause.",
      "ja": "タイマーはリクエスト間にシンクタイムを追加し、休みなく連続してリクエストを送るのではなく、実際のユーザー行動に近いスクリプトにする。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Sự khác biệt chính giữa Load Testing và Stress Testing là gì?",
      "en": "What is the main difference between Load Testing and Stress Testing?",
      "ja": "負荷テスト（ロードテスト）とストレステストの主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Load Testing kiểm tra giao diện người dùng còn Stress Testing kiểm tra API",
        "en": "Load Testing checks the user interface while Stress Testing checks APIs",
        "ja": "負荷テストはユーザーインターフェースを検証し、ストレステストはAPIを検証する"
      },
      {
        "vi": "Load Testing chỉ chạy trên môi trường production còn Stress Testing chỉ chạy trên môi trường staging",
        "en": "Load Testing only runs in production while Stress Testing only runs in staging",
        "ja": "負荷テストは本番環境でのみ実行し、ストレステストはステージング環境でのみ実行する"
      },
      {
        "vi": "Load Testing dùng JMeter còn Stress Testing bắt buộc phải dùng k6",
        "en": "Load Testing must use JMeter while Stress Testing must use k6",
        "ja": "負荷テストは必ずJMeterを使い、ストレステストは必ずk6を使わなければならない"
      },
      {
        "vi": "Load Testing đánh giá hệ thống dưới mức tải kỳ vọng bình thường để kiểm tra hiệu năng, còn Stress Testing đẩy tải vượt quá giới hạn thiết kế để tìm điểm hệ thống bắt đầu suy giảm hoặc sụp đổ",
        "en": "Load Testing evaluates the system under expected normal load to assess performance, while Stress Testing pushes load beyond the designed limit to find where the system starts degrading or breaking",
        "ja": "負荷テストは通常の想定負荷下でシステムの性能を評価するのに対し、ストレステストは設計上の限界を超える負荷をかけ、システムが劣化・破綻し始める点を見つける"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Load Testing xác nhận hệ thống đáp ứng tốt ở tải dự kiến, Stress Testing cố ý vượt ngưỡng để tìm giới hạn chịu tải và cách hệ thống phục hồi.",
      "en": "Load Testing confirms the system performs well at expected load, while Stress Testing intentionally exceeds limits to find the breaking point and recovery behavior.",
      "ja": "負荷テストは想定負荷下でシステムが良好に動作することを確認し、ストレステストは意図的に限界を超えて、破綻点と復旧挙動を調べる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Spike Testing trong kiểm thử hiệu năng nhằm mục đích gì?",
      "en": "What is the goal of Spike Testing in performance testing?",
      "ja": "パフォーマンステストにおけるスパイクテストの目的は何ですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra phản ứng của hệ thống khi lượng tải tăng đột ngột và rất nhanh trong thời gian ngắn (ví dụ tăng vọt lúc mở bán flash sale), rồi giảm lại, để xem hệ thống có xử lý được cú sốc tải và phục hồi tốt hay không",
        "en": "Test how the system reacts to a sudden, very rapid increase in load over a short period (e.g. a flash sale spike) followed by a drop, to see if it handles the shock and recovers well",
        "ja": "短時間で急激に負荷が跳ね上がり（例：フラッシュセール開始時）その後下がるという状況にシステムがどう反応するかを検証し、負荷の急変に耐えて正常に回復できるかを確認する"
      },
      {
        "vi": "Đánh giá hệ thống có duy trì ổn định trong thời gian dài với tải trung bình liên tục hay không",
        "en": "Assess whether the system stays stable over a long period under continuous average load",
        "ja": "システムが平均的な負荷のもとで長時間安定して動作するかを評価する"
      },
      {
        "vi": "Xác định số lượng lỗi cú pháp trong kịch bản test",
        "en": "Identifies syntax errors in the test script",
        "ja": "テストスクリプトの構文エラーを特定する"
      },
      {
        "vi": "Đo dung lượng ổ đĩa còn trống trên server ứng dụng",
        "en": "Measures the free disk space on the application server",
        "ja": "アプリケーションサーバーの空きディスク容量を測定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Spike Testing mô phỏng tải tăng vọt bất ngờ trong thời gian ngắn để kiểm tra khả năng chịu đựng và phục hồi của hệ thống sau cú sốc, khác với tải tăng dần đều của Load Testing.",
      "en": "Spike Testing simulates a sudden short-lived surge in load to check the system's resilience and recovery after the shock, unlike the gradual load increase of Load Testing.",
      "ja": "スパイクテストは短時間の急激な負荷増加を模擬し、負荷ショック後のシステムの耐久性と回復力を検証する点が、緩やかに負荷を上げる負荷テストと異なる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong k6, đối tượng \"thresholds\" trong options dùng để làm gì?",
      "en": "In k6, what is the \"thresholds\" object in options used for?",
      "ja": "k6のoptionsにある「thresholds」オブジェクトは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Chỉ định số lượng file kịch bản sẽ được chạy song song",
        "en": "Specifies how many script files will run in parallel",
        "ja": "並行して実行するスクリプトファイルの数を指定する"
      },
      {
        "vi": "Định nghĩa tiêu chí pass/fail tự động cho các chỉ số hiệu năng (ví dụ p95 thời gian phản hồi < 500ms, tỉ lệ lỗi < 1%); nếu chỉ số vượt ngưỡng, k6 báo test thất bại và có thể trả mã lỗi cho CI/CD",
        "en": "Defines automated pass/fail criteria for performance metrics (e.g. p95 response time < 500ms, error rate < 1%); if a metric breaches the threshold, k6 marks the test as failed and can return an error code to CI/CD",
        "ja": "パフォーマンス指標に対する自動的な合否基準を定義する（例：応答時間のp95が500ms未満、エラー率が1%未満）。指標がしきい値を超えるとk6はテスト失敗と判定し、CI/CDにエラーコードを返すことができる"
      },
      {
        "vi": "Đặt tên cho từng nhóm VU khác nhau",
        "en": "Names each different group of VUs",
        "ja": "それぞれのVUグループに名前を付ける"
      },
      {
        "vi": "Cấu hình proxy để gửi request qua VPN",
        "en": "Configures a proxy to route requests through a VPN",
        "ja": "リクエストをVPN経由で送るためのプロキシを設定する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thresholds cho phép định nghĩa tiêu chí chấp nhận được cho các metric hiệu năng, biến k6 thành công cụ kiểm thử tự động có thể tích hợp CI/CD thay vì chỉ xem báo cáo thủ công.",
      "en": "Thresholds let you define acceptance criteria for performance metrics, turning k6 into an automated test that can gate CI/CD instead of just producing a manual report.",
      "ja": "thresholdsによりパフォーマンス指標の合格基準を定義でき、単なる手動レポートではなく、CI/CDのゲートとして機能する自動テストにk6を変える。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong k6, \"checks\" khác với \"thresholds\" ở điểm nào?",
      "en": "How do \"checks\" differ from \"thresholds\" in k6?",
      "ja": "k6において「checks」は「thresholds」とどう違いますか?"
    },
    "options": [
      {
        "vi": "Checks chỉ hoạt động với giao thức WebSocket còn thresholds chỉ hoạt động với HTTP",
        "en": "Checks only work with the WebSocket protocol while thresholds only work with HTTP",
        "ja": "checksはWebSocketプロトコルでのみ動作し、thresholdsはHTTPでのみ動作する"
      },
      {
        "vi": "Checks dùng để cấu hình số lượng VU còn thresholds dùng để cấu hình stages",
        "en": "Checks configure the number of VUs while thresholds configure stages",
        "ja": "checksはVU数を設定するために使い、thresholdsはステージを設定するために使う"
      },
      {
        "vi": "Checks chỉ được viết bằng Python còn thresholds chỉ được viết bằng JavaScript",
        "en": "Checks can only be written in Python while thresholds can only be written in JavaScript",
        "ja": "checksはPythonでのみ記述でき、thresholdsはJavaScriptでのみ記述できる"
      },
      {
        "vi": "Checks giống assertion nhỏ kiểm tra một điều kiện cụ thể (ví dụ status là 200) ngay tại từng request và ghi nhận tỉ lệ pass/fail nhưng không tự làm test dừng lại, còn thresholds đánh giá tổng hợp trên toàn bộ metric và có thể khiến toàn bộ lần chạy test được đánh dấu là thất bại",
        "en": "Checks act like small assertions verifying a specific condition (e.g. status is 200) at each request and record a pass/fail rate but don't stop the test on their own, while thresholds evaluate aggregated metrics across the whole run and can mark the entire test run as failed",
        "ja": "checksは各リクエストで特定の条件（例：ステータスが200）を検証する小さなアサーションのようなもので、合否率を記録するがそれ自体でテストを止めることはない。一方thresholdsは実行全体の集計指標を評価し、テスト実行全体を失敗と判定できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Checks kiểm tra điều kiện tại mức từng request giống assertion chức năng, còn thresholds đánh giá chỉ số tổng hợp (percentile, tỉ lệ lỗi...) trên toàn bộ test để quyết định pass/fail cuối cùng.",
      "en": "Checks validate conditions per request like functional assertions, while thresholds evaluate aggregated metrics (percentiles, error rate...) across the whole test to decide the final pass/fail.",
      "ja": "checksは機能的なアサーションのように各リクエストレベルで条件を検証し、thresholdsはテスト全体の集計指標（パーセンタイル、エラー率など）を評価して最終的な合否を決める。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao khi thực hiện load test thật sự nên chạy JMeter ở chế độ Non-GUI (dùng lệnh -n) thay vì chạy trực tiếp trên giao diện đồ hoạ?",
      "en": "Why should real load tests run JMeter in Non-GUI mode (using the -n flag) instead of directly through the graphical interface?",
      "ja": "実際の負荷テストでは、なぜグラフィカルインターフェースで直接実行せず、Non-GUIモード（-nフラグ）でJMeterを実行すべきなのですか?"
    },
    "options": [
      {
        "vi": "Vì chế độ GUI không hỗ trợ HTTPS",
        "en": "Because GUI mode does not support HTTPS",
        "ja": "GUIモードはHTTPSをサポートしていないから"
      },
      {
        "vi": "Vì chế độ GUI không cho phép lưu kết quả ra file",
        "en": "Because GUI mode does not allow saving results to a file",
        "ja": "GUIモードは結果をファイルに保存できないから"
      },
      {
        "vi": "Vì chế độ Non-GUI tự động sửa lỗi trong kịch bản test",
        "en": "Because Non-GUI mode automatically fixes errors in the test script",
        "ja": "Non-GUIモードはテストスクリプトのエラーを自動的に修正するから"
      },
      {
        "vi": "Vì chế độ GUI tiêu tốn nhiều tài nguyên CPU/bộ nhớ để vẽ giao diện và biểu đồ trong lúc chạy, làm sai lệch kết quả đo và giới hạn số lượng thread có thể tạo ra; Non-GUI mode nhẹ hơn, phù hợp để tạo tải lớn và chạy trên server/CI",
        "en": "Because GUI mode consumes significant CPU/memory to render the interface and live graphs during the run, skewing measurements and limiting the number of threads that can be created; Non-GUI mode is lighter, suited for generating heavy load and running on a server/CI",
        "ja": "GUIモードは実行中に画面やグラフを描画するためCPU/メモリを大量に消費し、測定結果を歪め、作成できるスレッド数も制限してしまう。Non-GUIモードはより軽量で、大きな負荷の生成やサーバー/CI上での実行に適している"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chạy GUI trong lúc test tốn tài nguyên vẽ UI, làm kết quả không phản ánh đúng khả năng của hệ thống đích; Non-GUI mode được khuyến nghị cho các đợt load test thật, đặc biệt khi chạy trên máy chủ hoặc pipeline CI.",
      "en": "Running the GUI during a test wastes resources on rendering, distorting results that should reflect the target system's real capacity; Non-GUI mode is recommended for actual load tests, especially on servers or CI pipelines.",
      "ja": "テスト中にGUIを表示すると描画にリソースが消費され、対象システムの実際の能力を反映しない結果になる。特にサーバーやCIパイプライン上での実負荷テストにはNon-GUIモードが推奨される。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong báo cáo kiểm thử hiệu năng, chỉ số \"p95\" (95th percentile) của thời gian phản hồi có ý nghĩa gì?",
      "en": "In a performance test report, what does the \"p95\" (95th percentile) response time metric mean?",
      "ja": "パフォーマンステストレポートにおける応答時間の「p95」（95パーセンタイル）とは何を意味しますか?"
    },
    "options": [
      {
        "vi": "95% số request có thời gian phản hồi bằng hoặc thấp hơn giá trị này, chỉ 5% request còn lại chậm hơn — phản ánh trải nghiệm của gần như toàn bộ người dùng tốt hơn so với chỉ nhìn giá trị trung bình vốn dễ bị các request nhanh kéo xuống thấp",
        "en": "95% of requests have a response time equal to or below this value, with only the slowest 5% exceeding it — reflecting the experience of nearly all users better than an average, which can be pulled down by many fast requests",
        "ja": "リクエストの95%がこの値以下の応答時間であり、残りの遅い5%だけがこれを上回るという意味。多くの速いリクエストに引きずられがちな平均値よりも、ほぼ全ユーザーの体感を正確に反映する"
      },
      {
        "vi": "Thời gian phản hồi trung bình cộng của tất cả request",
        "en": "The arithmetic average response time of all requests",
        "ja": "すべてのリクエストの応答時間の算術平均"
      },
      {
        "vi": "Tỉ lệ phần trăm request bị lỗi trong tổng số request",
        "en": "The percentage of failed requests out of the total",
        "ja": "全リクエストのうちエラーになった割合"
      },
      {
        "vi": "Số lượng thread hoạt động đồng thời tại giây thứ 95 của test",
        "en": "The number of concurrently active threads at the 95th second of the test",
        "ja": "テスト開始95秒目に稼働中のスレッド数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Percentile giúp tránh bị đánh lừa bởi giá trị trung bình; p95 cho biết ngưỡng thời gian mà đại đa số (95%) người dùng trải nghiệm, thường được dùng làm SLA thay vì average.",
      "en": "Percentiles avoid being misled by averages; p95 shows the time threshold experienced by the vast majority (95%) of users, and is commonly used as an SLA instead of the average.",
      "ja": "パーセンタイルは平均値に惑わされないための指標であり、p95は大多数（95%）のユーザーが体感する応答時間のしきい値を示す。平均値の代わりにSLAとしてよく使われる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Throughput\" (thông lượng) trong kiểm thử hiệu năng được định nghĩa như thế nào?",
      "en": "How is \"Throughput\" defined in performance testing?",
      "ja": "パフォーマンステストにおける「スループット」はどのように定義されますか?"
    },
    "options": [
      {
        "vi": "Tổng dung lượng ổ cứng mà hệ thống sử dụng khi chạy test",
        "en": "The total disk space the system uses while running the test",
        "ja": "テスト実行中にシステムが使用する総ディスク容量"
      },
      {
        "vi": "Số lượng request (hoặc giao dịch) mà hệ thống xử lý được trong một đơn vị thời gian (thường tính theo request/giây), phản ánh khả năng đáp ứng khối lượng công việc của hệ thống",
        "en": "The number of requests (or transactions) the system processes per unit of time (typically requests/second), reflecting its capacity to handle workload",
        "ja": "システムが単位時間あたりに処理できるリクエスト（またはトランザクション）数（通常はリクエスト/秒）で、システムの処理能力を表す"
      },
      {
        "vi": "Thời gian tối đa mà một request được phép chờ trước khi bị timeout",
        "en": "The maximum time a request is allowed to wait before timing out",
        "ja": "リクエストがタイムアウトするまでに許容される最大待機時間"
      },
      {
        "vi": "Tỉ lệ phần trăm CPU nhàn rỗi trong suốt quá trình test",
        "en": "The percentage of idle CPU throughout the test",
        "ja": "テスト中のCPU空き時間の割合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Throughput đo lượng công việc hệ thống xử lý được mỗi giây, là chỉ số then chốt để đánh giá năng lực phục vụ song song với thời gian phản hồi và tỉ lệ lỗi.",
      "en": "Throughput measures how much work the system processes per second, a key metric alongside response time and error rate to assess serving capacity.",
      "ja": "スループットはシステムが1秒あたりに処理できる作業量を測定するもので、応答時間やエラー率と並んでサービス能力を評価する重要な指標である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong JMeter, Regular Expression Extractor thường được dùng để làm gì khi xây dựng kịch bản hiệu năng cho nghiệp vụ nhiều bước (ví dụ đăng nhập rồi đặt hàng)?",
      "en": "In JMeter, what is the Regular Expression Extractor typically used for when building a multi-step performance test script (e.g. login then place order)?",
      "ja": "複数ステップの業務フロー（例：ログインしてから注文する）に対するパフォーマンステストスクリプトを構築する際、JMeterの正規表現エクストラクタは通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Tăng số lượng thread tự động khi phát hiện lỗi",
        "en": "Automatically increases the thread count when an error is detected",
        "ja": "エラーを検出したときに自動的にスレッド数を増やす"
      },
      {
        "vi": "Kiểm tra chính tả nội dung response",
        "en": "Checks the spelling of the response content",
        "ja": "レスポンス内容のスペルをチェックする"
      },
      {
        "vi": "Trích xuất giá trị động từ response của một request trước (ví dụ session token, order ID) để sử dụng lại trong các request tiếp theo, kỹ thuật này gọi là correlation",
        "en": "Extracts a dynamic value from a prior request's response (e.g. session token, order ID) to reuse in subsequent requests — a technique known as correlation",
        "ja": "前のリクエストのレスポンスから動的な値（例：セッショントークン、注文ID）を抽出し、以降のリクエストで再利用する。この手法はコリレーション（相関）と呼ばれる"
      },
      {
        "vi": "Vẽ biểu đồ thời gian phản hồi theo thời gian thực",
        "en": "Draws a real-time response-time graph",
        "ja": "応答時間のリアルタイムグラフを描画する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Regular Expression Extractor lấy dữ liệu động sinh ra ở runtime (token, id) rồi truyền tiếp cho các request phụ thuộc, đây là kỹ thuật correlation bắt buộc trong hầu hết kịch bản nghiệp vụ nhiều bước.",
      "en": "Regular Expression Extractor captures dynamically generated runtime data (token, id) and passes it to dependent requests — the correlation technique required in most multi-step business scripts.",
      "ja": "正規表現エクストラクタは実行時に生成される動的データ（トークン、IDなど）を取得し、後続の依存リクエストに渡す。これはほとんどの複数ステップ業務スクリプトで必須のコリレーション技術である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Correlation\" (tương quan dữ liệu) trong kiểm thử hiệu năng là gì?",
      "en": "What is \"correlation\" in performance testing?",
      "ja": "パフォーマンステストにおける「コリレーション」とは何ですか?"
    },
    "options": [
      {
        "vi": "Việc gộp nhiều test case chức năng thành một test case hiệu năng duy nhất",
        "en": "Merging multiple functional test cases into a single performance test case",
        "ja": "複数の機能テストケースを1つのパフォーマンステストケースに統合すること"
      },
      {
        "vi": "Việc so sánh kết quả test giữa hai môi trường staging và production",
        "en": "Comparing test results between the staging and production environments",
        "ja": "ステージング環境と本番環境のテスト結果を比較すること"
      },
      {
        "vi": "Việc tính hệ số tương quan thống kê giữa số lượng VU và mức sử dụng CPU",
        "en": "Calculating the statistical correlation coefficient between VU count and CPU usage",
        "ja": "VU数とCPU使用率の間の統計的相関係数を計算すること"
      },
      {
        "vi": "Kỹ thuật lấy một giá trị động (session ID, CSRF token, order ID...) trả về từ response trước và gắn nó vào các request tiếp theo, để kịch bản test hoạt động đúng như luồng nghiệp vụ thật thay vì dùng giá trị tĩnh đã ghi lại lúc record",
        "en": "The technique of capturing a dynamic value (session ID, CSRF token, order ID, etc.) returned by an earlier response and injecting it into subsequent requests, so the script behaves like the real business flow instead of replaying a static value recorded earlier",
        "ja": "前のレスポンスから返された動的な値（セッションID、CSRFトークン、注文IDなど）を取得し、後続のリクエストに組み込む技術で、記録時の静的な値をそのまま再生するのではなく、実際の業務フローどおりにスクリプトを動作させるためのもの"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nếu không correlation, kịch bản replay lại giá trị tĩnh ghi lúc record (ví dụ token đã hết hạn) và sẽ thất bại hàng loạt khi chạy lại hoặc chạy với nhiều người dùng khác nhau.",
      "en": "Without correlation, the script replays the static value captured at record time (e.g. an expired token) and fails en masse when rerun or run with many different users.",
      "ja": "コリレーションを行わないと、記録時に取得した静的な値（期限切れトークンなど）がそのまま再生され、再実行時や多数の異なるユーザーで実行した際に大量の失敗を引き起こす。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Mô hình JMeter Master-Slave (Distributed Testing) được sử dụng trong tình huống nào?",
      "en": "When is the JMeter Master-Slave (Distributed Testing) model used?",
      "ja": "JMeterのマスター・スレーブ構成（分散テスト）はどのような状況で使われますか?"
    },
    "options": [
      {
        "vi": "Khi một máy đơn lẻ không đủ tài nguyên (CPU, bộ nhớ, băng thông mạng) để tạo ra số lượng thread/tải mong muốn, nên cần điều phối nhiều máy (slave) cùng sinh tải theo lệnh từ một máy điều khiển (master) để đạt tổng tải lớn hơn",
        "en": "When a single machine lacks enough resources (CPU, memory, network bandwidth) to generate the desired number of threads/load, requiring multiple machines (slaves) coordinated by one controller machine (master) to jointly generate a larger total load",
        "ja": "1台のマシンでは必要なスレッド数/負荷を生成するのに十分なリソース（CPU、メモリ、ネットワーク帯域）がない場合、1台のコントローラー（マスター）の指示のもとで複数のマシン（スレーブ）が協調して負荷を生成し、より大きな総負荷を実現する必要があるとき"
      },
      {
        "vi": "Khi cần kiểm tra tính bảo mật của API",
        "en": "When you need to check API security",
        "ja": "APIのセキュリティを検証する必要があるとき"
      },
      {
        "vi": "Khi muốn chạy kịch bản test chức năng song song với kịch bản hiệu năng",
        "en": "When you want to run a functional test script in parallel with a performance test script",
        "ja": "機能テストスクリプトをパフォーマンステストスクリプトと並行して実行したいとき"
      },
      {
        "vi": "Khi cần mã hoá dữ liệu nhạy cảm trong kịch bản test",
        "en": "When you need to encrypt sensitive data in the test script",
        "ja": "テストスクリプト内の機密データを暗号化する必要があるとき"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Distributed testing giải quyết giới hạn tài nguyên của một máy đơn khi cần mô phỏng tải rất lớn, bằng cách phân phối việc sinh tải cho nhiều máy slave và tổng hợp kết quả tại master.",
      "en": "Distributed testing overcomes a single machine's resource limits when simulating very heavy load, by spreading load generation across multiple slave machines and aggregating results at the master.",
      "ja": "分散テストは、非常に大きな負荷をシミュレートする際の1台のマシンのリソース制限を、複数のスレーブマシンに負荷生成を分散し、結果をマスターで集約することで解決する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Summary Report của JMeter, cột \"Error %\" thể hiện điều gì?",
      "en": "In JMeter's Summary Report, what does the \"Error %\" column show?",
      "ja": "JMeterのサマリーレポートにおける「Error %」列は何を示しますか?"
    },
    "options": [
      {
        "vi": "Tỉ lệ phần trăm sai lệch giữa Ramp-up Period thực tế và cấu hình",
        "en": "The percentage deviation between the actual ramp-up period and the configured one",
        "ja": "実際のランプアップ期間と設定値との差のパーセンテージ"
      },
      {
        "vi": "Tỉ lệ phần trăm trong tổng số request bị thất bại (không nhận được response mong đợi, ví dụ lỗi HTTP 5xx hoặc assertion không thoả), giúp phát hiện hệ thống có bị lỗi khi chịu tải hay không",
        "en": "The percentage of total requests that failed (did not receive the expected response, e.g. HTTP 5xx errors or a failed assertion), helping detect whether the system breaks under load",
        "ja": "総リクエスト数のうち失敗した（期待するレスポンスが得られなかった、例：HTTP 5xxエラーやアサーション不成立）割合で、負荷下でシステムが壊れていないかを検出するのに役立つ"
      },
      {
        "vi": "Tỉ lệ phần trăm request được cache thành công",
        "en": "The percentage of requests successfully served from cache",
        "ja": "キャッシュから正常に応答されたリクエストの割合"
      },
      {
        "vi": "Tỉ lệ phần trăm CPU được sử dụng bởi JMeter trong quá trình test",
        "en": "The percentage of CPU used by JMeter during the test",
        "ja": "テスト実行中にJMeterが使用したCPUの割合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Error % là chỉ số quan trọng ngang với thời gian phản hồi; nếu error % tăng cao khi tải tăng, đó là dấu hiệu hệ thống bắt đầu quá tải hoặc gặp lỗi.",
      "en": "Error % is a metric as important as response time; a rising error rate as load increases signals the system is starting to overload or fail.",
      "ja": "Error %は応答時間と同じくらい重要な指標であり、負荷が増えるにつれてエラー率が上昇する場合、システムが過負荷や障害を起こし始めている兆候である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong k6, phần \"stages\" bên trong options dùng để làm gì?",
      "en": "In k6, what is the \"stages\" array inside options used for?",
      "ja": "k6のoptions内にある「stages」は何のために使われますか?"
    },
    "options": [
      {
        "vi": "Liệt kê các endpoint API sẽ được test",
        "en": "Lists the API endpoints that will be tested",
        "ja": "テスト対象のAPIエンドポイントを列挙する"
      },
      {
        "vi": "Định nghĩa các nhóm assertion khác nhau cho từng loại response",
        "en": "Defines different groups of assertions for each response type",
        "ja": "レスポンスの種類ごとに異なるアサーショングループを定義する"
      },
      {
        "vi": "Mô tả kịch bản tăng/giảm số lượng VU theo thời gian (ví dụ tăng dần lên 100 VU trong 2 phút, giữ ổn định 5 phút, rồi giảm về 0 trong 1 phút), giúp mô phỏng ramp-up/ramp-down và các mẫu tải thực tế thay vì tải cố định suốt test",
        "en": "Describes a schedule for ramping the VU count up/down over time (e.g. ramp up to 100 VUs over 2 minutes, hold steady for 5 minutes, then ramp down to 0 over 1 minute), simulating ramp-up/ramp-down and realistic load patterns instead of a constant load",
        "ja": "時間経過に伴うVU数の増減スケジュールを記述する（例：2分かけて100VUまで増やし、5分間維持し、1分かけて0まで減らす）。一定の負荷ではなく、ランプアップ/ランプダウンや現実的な負荷パターンを再現できる"
      },
      {
        "vi": "Cấu hình mức độ log chi tiết khi chạy test",
        "en": "Configures the log verbosity level while running the test",
        "ja": "テスト実行時のログの詳細レベルを設定する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Stages cho phép định nghĩa nhiều giai đoạn với số VU và thời lượng khác nhau, tương đương khái niệm ramp-up/steady/ramp-down của JMeter nhưng linh hoạt hơn ở dạng code.",
      "en": "Stages let you define multiple phases with different VU counts and durations, equivalent to JMeter's ramp-up/steady/ramp-down concept but more flexible as code.",
      "ja": "stagesは異なるVU数と期間を持つ複数のフェーズを定義でき、JMeterのランプアップ/定常/ランプダウンの概念に相当するが、コードとしてより柔軟に扱える。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "\"Think Time\" trong kịch bản kiểm thử hiệu năng có mục đích chính là gì?",
      "en": "What is the main purpose of \"think time\" in a performance test script?",
      "ja": "パフォーマンステストスクリプトにおける「シンクタイム（think time）」の主な目的は何ですか?"
    },
    "options": [
      {
        "vi": "Bắt buộc phải bật để JMeter có thể kết nối HTTPS",
        "en": "Must be enabled for JMeter to be able to connect over HTTPS",
        "ja": "JMeterがHTTPS接続を行うために必ず有効化しなければならない"
      },
      {
        "vi": "Giảm số lượng license JMeter cần mua",
        "en": "Reduces the number of JMeter licenses that need to be purchased",
        "ja": "必要となるJMeterライセンスの数を減らす"
      },
      {
        "vi": "Tăng tốc độ ghi log kết quả test",
        "en": "Speeds up writing the test result log",
        "ja": "テスト結果ログの書き込み速度を上げる"
      },
      {
        "vi": "Mô phỏng khoảng thời gian người dùng thật cần để đọc thông tin, suy nghĩ hoặc điền form trước khi thực hiện thao tác tiếp theo, giúp mẫu tải sinh ra gần với hành vi thực tế thay vì các request bắn liên tục sát nhau một cách phi thực tế",
        "en": "Simulates the time a real user needs to read information, think, or fill a form before the next action, making the generated load pattern closer to real behavior instead of unrealistically back-to-back requests",
        "ja": "実際のユーザーが情報を読んだり、考えたり、フォームに入力したりしてから次の操作を行うまでの時間を再現し、非現実的に連続するリクエストではなく、実際の挙動に近い負荷パターンを生成する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Think time giúp phân bố request theo nhịp độ tự nhiên của người dùng, tránh tạo ra tải giả tạo dồn dập không phản ánh đúng traffic thực tế mà hệ thống sẽ gặp phải.",
      "en": "Think time spreads requests at a natural user pace, avoiding an artificially dense burst of load that doesn't reflect the real traffic the system will actually face.",
      "ja": "シンクタイムはリクエストを自然なユーザーのペースで分散させ、実際にシステムが直面するトラフィックを反映しない、人為的に密集した負荷の発生を防ぐ。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Việc bật/tắt HTTP Keep-Alive (giữ kết nối) trong kịch bản kiểm thử hiệu năng ảnh hưởng thế nào đến kết quả đo được?",
      "en": "How does enabling/disabling HTTP Keep-Alive (connection reuse) in a performance test script affect the measured results?",
      "ja": "パフォーマンステストスクリプトでHTTP Keep-Alive（コネクションの再利用）を有効/無効にすることは、測定結果にどう影響しますか?"
    },
    "options": [
      {
        "vi": "Nếu tắt Keep-Alive, mỗi request phải thiết lập kết nối TCP/TLS mới, làm tăng thời gian phản hồi và tải sai lệch so với hành vi trình duyệt thật (thường tái sử dụng kết nối); vì vậy cấu hình này cần được cân nhắc để mô phỏng đúng hành vi người dùng thực tế",
        "en": "Disabling Keep-Alive forces each request to establish a new TCP/TLS connection, inflating response time and creating load that misrepresents real browser behavior (which typically reuses connections); this setting therefore needs careful consideration to accurately simulate real user behavior",
        "ja": "Keep-Aliveを無効にすると、リクエストごとに新しいTCP/TLS接続を確立する必要があり、応答時間が増加し、通常は接続を再利用する実際のブラウザの挙動とは異なる負荷になる。そのため、実際のユーザー行動を正確に再現するにはこの設定を慎重に検討する必要がある"
      },
      {
        "vi": "Không ảnh hưởng gì vì đây chỉ là thiết lập giao diện hiển thị",
        "en": "It has no effect since it is only a display setting",
        "ja": "表示設定に過ぎないため、まったく影響しない"
      },
      {
        "vi": "Chỉ ảnh hưởng đến giao diện đồ hoạ của JMeter, không ảnh hưởng đến số liệu đo",
        "en": "It only affects JMeter's graphical interface, not the measured numbers",
        "ja": "JMeterのグラフィカルインターフェースにのみ影響し、測定値には影響しない"
      },
      {
        "vi": "Bắt buộc phải tắt Keep-Alive để JMeter chạy được ở chế độ Non-GUI",
        "en": "Keep-Alive must be disabled for JMeter to run in Non-GUI mode",
        "ja": "Non-GUIモードでJMeterを実行するにはKeep-Aliveを必ず無効にしなければならない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Keep-Alive quyết định việc tái sử dụng kết nối TCP; cấu hình sai lệch so với hành vi client thật (trình duyệt/app) sẽ khiến kết quả đo không phản ánh đúng hiệu năng thực tế mà người dùng cảm nhận.",
      "en": "Keep-Alive determines TCP connection reuse; a setting that mismatches real client behavior (browser/app) will produce results that don't reflect the actual performance users experience.",
      "ja": "Keep-AliveはTCP接続の再利用を左右する。実際のクライアント（ブラウザ/アプリ）の挙動と異なる設定にすると、ユーザーが体感する実際の性能を反映しない測定結果になる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "JSR223 Sampler/Assertion (dùng Groovy) trong JMeter thường được dùng khi nào?",
      "en": "When is a JSR223 Sampler/Assertion (using Groovy) in JMeter typically used?",
      "ja": "JMeterのJSR223サンプラー/アサーション（Groovyを使用）は通常どのようなときに使われますか?"
    },
    "options": [
      {
        "vi": "Khi cần tự động tạo Ramp-up Period cho Thread Group",
        "en": "When you need to auto-generate the Ramp-up Period for a Thread Group",
        "ja": "スレッドグループのランプアップ期間を自動生成する必要があるとき"
      },
      {
        "vi": "Khi muốn thay đổi giao diện màu sắc của JMeter",
        "en": "When you want to change JMeter's UI color theme",
        "ja": "JMeterのUIカラーテーマを変更したいとき"
      },
      {
        "vi": "Khi logic xử lý/kiểm tra phức tạp vượt quá khả năng của các component sẵn có (ví dụ tính toán, xử lý dữ liệu động, hoặc điều kiện kiểm tra phức tạp trên response) và cần viết code tuỳ biến bằng ngôn ngữ script, với hiệu năng tốt hơn BeanShell",
        "en": "When the processing/validation logic is too complex for built-in components (e.g. calculations, dynamic data manipulation, or complex response-checking conditions) and custom code is needed, with better performance than BeanShell",
        "ja": "処理・検証ロジックが標準コンポーネントの能力を超えて複雑な場合（例：計算、動的データ処理、レスポンスに対する複雑な条件チェックなど）に、BeanShellより高性能なスクリプト言語でカスタムコードを書く必要があるとき"
      },
      {
        "vi": "Khi cần chuyển đổi giao thức HTTP sang FTP",
        "en": "When you need to convert the protocol from HTTP to FTP",
        "ja": "プロトコルをHTTPからFTPへ変換する必要があるとき"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "JSR223 dùng engine Groovy biên dịch, cho hiệu năng tốt hơn BeanShell, phù hợp khi cần logic tuỳ biến mà các assertion/extractor có sẵn không đáp ứng được.",
      "en": "JSR223 uses a compiled Groovy engine, offering better performance than BeanShell, and is suited for custom logic that built-in assertions/extractors can't handle.",
      "ja": "JSR223はコンパイルされたGroovyエンジンを使用し、BeanShellより高性能で、既存のアサーション/エクストラクタでは対応できないカスタムロジックが必要な場合に適している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi kiểm thử hiệu năng cho API tạo đơn hàng (order), vì sao mỗi iteration cần dùng dữ liệu độc nhất (ví dụ mã đơn hàng, số điện thoại khác nhau) thay vì lặp lại cùng một bộ dữ liệu cố định?",
      "en": "When performance testing an order-creation API, why does each iteration need unique data (e.g. different order codes, phone numbers) instead of repeating the same fixed dataset?",
      "ja": "注文作成APIのパフォーマンステストを行う際、なぜ各イテレーションで同じ固定データセットを繰り返すのではなく、一意のデータ（例：異なる注文コード、電話番号）を使う必要があるのですか?"
    },
    "options": [
      {
        "vi": "Vì JMeter và k6 giới hạn số lần dùng một giá trị trong một lần chạy",
        "en": "Because JMeter and k6 limit how many times a single value can be reused in one run",
        "ja": "JMeterやk6は1回の実行で同じ値を使える回数を制限しているから"
      },
      {
        "vi": "Vì dữ liệu độc nhất giúp giao diện báo cáo đẹp hơn",
        "en": "Because unique data makes the report interface look nicer",
        "ja": "一意のデータの方がレポート画面が見やすくなるから"
      },
      {
        "vi": "Vì dữ liệu độc nhất làm giảm dung lượng file kết quả test",
        "en": "Because unique data reduces the size of the test result file",
        "ja": "一意のデータの方がテスト結果ファイルのサイズが小さくなるから"
      },
      {
        "vi": "Vì việc dùng lại cùng dữ liệu có thể vi phạm ràng buộc duy nhất (unique constraint) ở tầng database, gây lỗi trùng khoá, hoặc bị hệ thống cache/validate trùng lặp làm sai lệch kết quả đo, không phản ánh đúng tải mà nhiều đơn hàng thật đồng thời tạo ra",
        "en": "Because reusing the same data can violate a uniqueness constraint at the database layer, causing duplicate-key errors, or get caught by duplicate-detection/caching logic that skews the measured results and misrepresents the load of many concurrent real orders",
        "ja": "同じデータを繰り返し使うと、データベース層の一意制約に違反して重複キーエラーを起こしたり、重複検知・キャッシュ機構に引っかかって測定結果を歪め、多数の実注文が同時に作成される際の負荷を正しく反映しなくなる可能性があるから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Dùng lại dữ liệu tĩnh dễ gây lỗi trùng khoá hoặc bị logic chống trùng chặn, khiến kết quả không phản ánh đúng khả năng hệ thống xử lý nhiều giao dịch độc lập song song — vì vậy cần tham số hoá dữ liệu duy nhất cho mỗi iteration.",
      "en": "Reusing static data easily triggers duplicate-key errors or anti-duplicate logic, producing results that don't reflect the system's real capacity to handle many independent concurrent transactions — hence the need to parameterize unique data per iteration.",
      "ja": "静的データを再利用すると重複キーエラーや重複防止ロジックに引っかかりやすく、多数の独立した同時トランザクションを処理するシステムの実際の能力を反映しない結果になる。そのため、イテレーションごとに一意のデータをパラメータ化する必要がある。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Việc xuất kết quả k6 ra InfluxDB kết hợp Grafana (thay vì chỉ xem summary trên terminal) mang lại lợi ích gì?",
      "en": "What benefit does exporting k6 results to InfluxDB combined with Grafana (instead of only viewing the terminal summary) provide?",
      "ja": "（ターミナルのサマリーだけを見るのではなく）k6の結果をInfluxDBとGrafanaに出力することにはどんな利点がありますか?"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn nhu cầu viết threshold trong kịch bản test",
        "en": "Completely replaces the need to write thresholds in the test script",
        "ja": "テストスクリプトにthresholdsを書く必要を完全になくす"
      },
      {
        "vi": "Tự động sửa các lỗi phát hiện được trong quá trình test",
        "en": "Automatically fixes errors detected during the test",
        "ja": "テスト中に検出されたエラーを自動的に修正する"
      },
      {
        "vi": "Giảm số lượng VU cần thiết để đạt cùng mức tải",
        "en": "Reduces the number of VUs needed to reach the same load level",
        "ja": "同じ負荷レベルに達するために必要なVU数を減らす"
      },
      {
        "vi": "Cho phép theo dõi và trực quan hoá các chỉ số hiệu năng (response time, throughput, error rate...) theo thời gian thực dưới dạng biểu đồ, dễ dàng so sánh giữa các lần chạy và phát hiện xu hướng/điểm bất thường trong suốt quá trình test",
        "en": "Allows real-time monitoring and visualization of performance metrics (response time, throughput, error rate...) as charts, making it easy to compare across runs and spot trends/anomalies throughout the test",
        "ja": "パフォーマンス指標（応答時間、スループット、エラー率など）をリアルタイムでグラフとして可視化・監視でき、実行ごとの比較やテスト中の傾向・異常の発見が容易になる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "InfluxDB lưu trữ time-series metric, Grafana trực quan hoá theo thời gian thực, giúp đội ngũ theo dõi trực tiếp diễn biến hiệu năng và so sánh lịch sử các lần test dễ dàng hơn nhiều so với đọc bảng summary tĩnh.",
      "en": "InfluxDB stores time-series metrics and Grafana visualizes them in real time, letting teams watch performance unfold live and compare historical runs far more easily than reading a static summary table.",
      "ja": "InfluxDBは時系列メトリクスを保存し、Grafanaがそれをリアルタイムで可視化することで、チームはパフォーマンスの推移をライブで監視し、静的なサマリー表を読むよりもはるかに容易に過去の実行と比較できる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong kiểm thử hiệu năng, \"Bottleneck\" (điểm nghẽn) của hệ thống thường được xác định bằng cách nào?",
      "en": "In performance testing, how is a system \"bottleneck\" typically identified?",
      "ja": "パフォーマンステストにおいて、システムの「ボトルネック」は通常どのように特定されますか?"
    },
    "options": [
      {
        "vi": "Bằng cách tăng dần tải và theo dõi đồng thời các chỉ số ở nhiều tầng (thời gian phản hồi, throughput, tỉ lệ lỗi ở tầng ứng dụng cùng với CPU, RAM, I/O, connection pool ở tầng hạ tầng/database) để tìm ra thành phần đầu tiên bị bão hoà hoặc suy giảm khi tải tăng, gây giới hạn hiệu năng toàn hệ thống",
        "en": "By gradually increasing load while simultaneously monitoring metrics across multiple layers (response time, throughput, error rate at the application layer, along with CPU, RAM, I/O, connection pool at the infrastructure/database layer) to find the first component that saturates or degrades as load rises, limiting overall system performance",
        "ja": "負荷を徐々に増やしながら、複数の層の指標（応答時間、スループット、アプリケーション層のエラー率、およびCPU・RAM・I/O・DB接続プールなどのインフラ/データベース層の指標）を同時に監視し、負荷増加につれて最初に飽和・劣化してシステム全体の性能を制限するコンポーネントを見つけることによって特定する"
      },
      {
        "vi": "Chỉ dựa vào số lượng dòng code của ứng dụng",
        "en": "Solely based on the number of lines of code in the application",
        "ja": "アプリケーションのコード行数だけに基づいて判断する"
      },
      {
        "vi": "Bằng cách hỏi trực tiếp lập trình viên đã viết module nào chậm nhất",
        "en": "By simply asking the developer which module they think is the slowest",
        "ja": "どのモジュールが一番遅いか、開発者に直接聞くだけで判断する"
      },
      {
        "vi": "Bằng cách đếm số lượng test case chức năng đã pass",
        "en": "By counting the number of functional test cases that passed",
        "ja": "合格した機能テストケースの数を数えることによって判断する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Xác định bottleneck đòi hỏi giám sát đa tầng song song với việc tăng tải dần, để tìm chính xác tài nguyên/thành phần nào bão hoà trước và kéo giảm hiệu năng toàn hệ thống, thay vì chỉ dựa vào cảm tính.",
      "en": "Identifying a bottleneck requires multi-layer monitoring alongside gradually increasing load, to pinpoint exactly which resource/component saturates first and drags down overall performance, rather than relying on guesswork.",
      "ja": "ボトルネックの特定には、負荷を段階的に増やしながら複数層を監視し、どのリソース・コンポーネントが最初に飽和してシステム全体の性能を低下させるかを正確に突き止める必要があり、勘に頼るべきではない。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure Report, để thêm ảnh chụp màn hình vào báo cáo khi một bước test thất bại, người ta thường dùng cơ chế nào?",
      "en": "In Allure Report, what mechanism is typically used to attach a screenshot to the report when a test step fails?",
      "ja": "Allureレポートでテストステップが失敗した際にスクリーンショットをレポートに添付するには、通常どの仕組みを使いますか。"
    },
    "options": [
      {
        "vi": "Ghi đường dẫn ảnh vào biến môi trường của hệ điều hành",
        "en": "Writing the image path to an OS environment variable",
        "ja": "画像のパスをOSの環境変数に書き込む"
      },
      {
        "vi": "Allure.addAttachment() hoặc annotation @Attachment để đính kèm dữ liệu ảnh vào kết quả test",
        "en": "Allure.addAttachment() or the @Attachment annotation to attach the image bytes to the test result",
        "ja": "Allure.addAttachment()や@Attachmentアノテーションで画像データをテスト結果に添付する"
      },
      {
        "vi": "Gửi ảnh qua email cho tester ngay khi test fail",
        "en": "Emailing the screenshot to the tester as soon as the test fails",
        "ja": "テストが失敗した瞬間にスクリーンショットをテスターへメール送信する"
      },
      {
        "vi": "Lưu ảnh vào cơ sở dữ liệu sản phẩm đang test",
        "en": "Saving the screenshot into the application-under-test's production database",
        "ja": "テスト対象アプリの本番データベースにスクリーンショットを保存する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Allure cung cấp API đính kèm như addAttachment() hoặc annotation @Attachment, cho phép gắn ảnh, log, video trực tiếp vào bước hoặc kết quả test hiển thị trong report.",
      "en": "Allure exposes attachment APIs such as addAttachment() or the @Attachment annotation, letting you bind images, logs, or videos directly to a test step or result shown in the report.",
      "ja": "Allureにはaddአttachment()や@Attachmentアノテーションといった添付APIがあり、画像・ログ・動画をテストステップや結果に直接紐付けてレポートに表示できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Extent Report khác biệt cơ bản nhất so với báo cáo TestNG mặc định ở điểm nào?",
      "en": "What is the most fundamental difference between Extent Reports and the default TestNG report?",
      "ja": "Extent ReportとTestNG標準レポートとの最も根本的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "TestNG report có khả năng gửi báo cáo lên Slack tự động còn Extent Report thì không",
        "en": "The default TestNG report can auto-post to Slack while Extent Reports cannot",
        "ja": "標準のTestNGレポートはSlackへ自動投稿できるがExtent Reportはできない"
      },
      {
        "vi": "Extent Report chỉ chạy được với Selenium, không dùng được cho kiểm thử API",
        "en": "Extent Reports only work with Selenium and cannot be used for API testing",
        "ja": "Extent ReportはSeleniumでしか使えず、APIテストには利用できない"
      },
      {
        "vi": "Extent Report cho phép tùy biến giao diện HTML đẹp, gắn log/ảnh theo từng bước test một cách linh hoạt",
        "en": "Extent Reports allow customizable, visually rich HTML output with flexible step-level logging and attachments",
        "ja": "Extent Reportはステップごとにログや画像を柔軟に添付できる、見栄えの良いカスタマイズ可能なHTMLレポートを生成できる"
      },
      {
        "vi": "Extent Report thay thế hoàn toàn framework kiểm thử, không cần TestNG hay JUnit nữa",
        "en": "Extent Reports fully replace the testing framework, eliminating the need for TestNG or JUnit",
        "ja": "Extent ReportはテストフレームワークそのものでありTestNGやJUnitが不要になる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "TestNG report mặc định đơn giản, khó đọc; Extent Report là thư viện báo cáo bên thứ ba tạo giao diện HTML trực quan, hỗ trợ log chi tiết theo bước, đính kèm ảnh/video và biểu đồ thống kê.",
      "en": "The default TestNG report is plain and hard to read; Extent Reports is a third-party library that produces rich, interactive HTML with step-level logs, attachments, and dashboards.",
      "ja": "標準のTestNGレポートは簡素で読みにくい一方、Extent Reportはサードパーティ製ライブラリで、ステップ単位の詳細ログ・添付・グラフを備えた見やすいHTMLレポートを生成します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, khái niệm \"Step\" (@Step) dùng để làm gì?",
      "en": "In Allure, what is the purpose of the \"Step\" concept (@Step annotation)?",
      "ja": "Allureにおける「Step」（@Stepアノテーション）の目的は何ですか。"
    },
    "options": [
      {
        "vi": "Mã hóa dữ liệu nhạy cảm trước khi ghi log",
        "en": "To encrypt sensitive data before writing it to the log",
        "ja": "ログに書き込む前に機密データを暗号化するため"
      },
      {
        "vi": "Tự động retry lại bước bị lỗi ba lần trước khi báo fail",
        "en": "To automatically retry a failed step three times before marking it as failed",
        "ja": "失敗したステップを失敗と判定する前に自動で3回リトライするため"
      },
      {
        "vi": "Đặt breakpoint để debug trong IDE khi chạy test",
        "en": "To set a debugger breakpoint in the IDE when running the test",
        "ja": "テスト実行時にIDEでデバッグ用ブレークポイントを設定するため"
      },
      {
        "vi": "Chia nhỏ một test case thành các hành động con có tên rõ ràng, giúp report hiển thị chi tiết luồng thực thi",
        "en": "To break a test case into clearly named sub-actions so the report shows a detailed execution flow",
        "ja": "テストケースを明確な名前を持つ小さな操作に分割し、レポートで実行フローを詳細に表示するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "@Step cho phép đặt tên có ý nghĩa cho từng hành động trong test, Allure sẽ hiển thị các bước này lồng nhau trong report, giúp xác định nhanh bước nào gây fail.",
      "en": "@Step lets you give meaningful names to actions in a test; Allure nests these steps in the report, making it easy to pinpoint which step caused a failure.",
      "ja": "@Stepを使うとテスト内の各操作に意味のある名前を付けられ、Allureはこれらをレポート上で階層的に表示するため、どのステップで失敗したかを素早く特定できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Tính năng \"History Trend\" trong Allure Report cho biết điều gì?",
      "en": "What does the \"History Trend\" feature in Allure Report show?",
      "ja": "AllureレポートのHistory Trend（履歴トレンド）機能は何を示しますか。"
    },
    "options": [
      {
        "vi": "Xu hướng kết quả pass/fail của bộ test qua nhiều lần chạy trước đó, giúp phát hiện test không ổn định",
        "en": "The pass/fail trend of the test suite across previous runs, helping identify unstable tests",
        "ja": "過去の複数回の実行にわたるテストスイートの合否傾向を示し、不安定なテストの発見に役立つ"
      },
      {
        "vi": "Lịch sử chỉnh sửa mã nguồn của các file test case",
        "en": "The source-code edit history of the test case files",
        "ja": "テストケースファイルのソースコード編集履歴"
      },
      {
        "vi": "Thời gian phản hồi trung bình của server backend",
        "en": "The average response time of the backend server",
        "ja": "バックエンドサーバーの平均レスポンスタイム"
      },
      {
        "vi": "Danh sách người dùng đã đăng nhập vào hệ thống Allure",
        "en": "The list of users who have logged into the Allure system",
        "ja": "Allureシステムにログインしたユーザーの一覧"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "History Trend lưu kết quả các lần chạy trước (cần giữ thư mục history), vẽ biểu đồ xu hướng pass/fail/broken theo thời gian, rất hữu ích để nhận diện flaky test hoặc regression.",
      "en": "History Trend retains results from prior runs (by preserving the history folder) and charts pass/fail/broken trends over time, useful for spotting flaky tests or regressions.",
      "ja": "History Trendはhistoryフォルダを保持することで過去の実行結果を蓄積し、合格・失敗・エラーの推移をグラフ化します。フレークテストや退行の発見に役立ちます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Extent Report, phương thức test.log(Status.FAIL, ...) dùng để làm gì?",
      "en": "In Extent Reports, what is the purpose of calling test.log(Status.FAIL, ...)?",
      "ja": "Extent Reportでtest.log(Status.FAIL, ...)を呼び出す目的は何ですか。"
    },
    "options": [
      {
        "vi": "Dừng toàn bộ pipeline CI/CD ngay lập tức",
        "en": "To immediately halt the entire CI/CD pipeline",
        "ja": "CI/CDパイプライン全体を即座に停止させるため"
      },
      {
        "vi": "Ghi một dòng log với trạng thái thất bại vào báo cáo của test hiện tại, kèm thông điệp mô tả lỗi",
        "en": "To record a log entry with FAIL status into the current test's report, along with a descriptive error message",
        "ja": "現在のテストのレポートに失敗ステータスのログエントリをエラーメッセージとともに記録するため"
      },
      {
        "vi": "Xóa test case khỏi bộ test suite hiện tại",
        "en": "To remove the test case from the current test suite",
        "ja": "現在のテストスイートからテストケースを削除するため"
      },
      {
        "vi": "Tự động gửi báo cáo lỗi lên hệ thống quản lý issue như Jira",
        "en": "To automatically file a bug report in an issue tracker like Jira",
        "ja": "JiraなどのIssue管理システムに自動でバグ報告を起票するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ExtentTest cung cấp log() theo Status (PASS, FAIL, INFO, WARNING...) để ghi lại diễn biến từng bước; log(Status.FAIL,...) đánh dấu bước đó thất bại kèm chi tiết trong report cuối.",
      "en": "ExtentTest's log() method accepts a Status (PASS, FAIL, INFO, WARNING, etc.) to record step-level events; log(Status.FAIL, ...) marks that step as failed with details captured in the final report.",
      "ja": "ExtentTestのlog()メソッドはStatus（PASS、FAIL、INFO、WARNINGなど）を受け取りステップごとの状況を記録します。log(Status.FAIL, ...)はそのステップを失敗としてマークし、詳細を最終レポートに残します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi tích hợp chụp ảnh màn hình lúc test fail trong Selenium, đoạn code thường được đặt ở đâu để đảm bảo luôn chạy dù test pass hay fail?",
      "en": "When integrating failure screenshots in Selenium, where is the capture logic usually placed to guarantee execution regardless of pass or fail?",
      "ja": "Seleniumで失敗時スクリーンショットを組み込む際、合否に関わらず必ず実行されるようにするには、通常どこにキャプチャ処理を配置しますか。"
    },
    "options": [
      {
        "vi": "Trong file cấu hình pom.xml, phần dependency",
        "en": "In the pom.xml dependency section",
        "ja": "pom.xmlの依存関係（dependency）セクション"
      },
      {
        "vi": "Ngay dòng đầu tiên của phương thức main() trong ứng dụng",
        "en": "At the very first line of the application's main() method",
        "ja": "アプリケーションのmain()メソッドの先頭行"
      },
      {
        "vi": "Trong listener/hook như @AfterMethod (TestNG) hoặc ITestListener, kiểm tra kết quả test rồi chụp nếu fail",
        "en": "In a listener/hook such as @AfterMethod (TestNG) or ITestListener, checking the result and capturing only on failure",
        "ja": "@AfterMethod（TestNG）やITestListenerなどのリスナー・フックで結果を確認し、失敗時のみキャプチャする"
      },
      {
        "vi": "Trong constructor của lớp WebDriver khi khởi tạo driver",
        "en": "In the WebDriver class constructor when the driver is initialized",
        "ja": "ドライバー初期化時のWebDriverクラスのコンストラクタ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đặt logic chụp ảnh trong hook chạy sau mỗi test (như @AfterMethod hoặc listener onTestFailure) đảm bảo nó luôn được gọi bất kể test pass/fail, và chỉ lưu ảnh khi kết quả là FAIL.",
      "en": "Placing the capture logic in a post-test hook (like @AfterMethod or an onTestFailure listener) guarantees it runs after every test, while only saving the screenshot when the result is FAIL.",
      "ja": "@AfterMethodやonTestFailureリスナーなどテスト後に実行されるフックにキャプチャ処理を置くことで、合否にかかわらず必ず呼び出され、結果がFAILの場合のみスクリーンショットを保存できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, \"Severity\" của một test case dùng để làm gì?",
      "en": "What is the purpose of the \"Severity\" annotation on a test case in Allure?",
      "ja": "Allureにおけるテストケースの「Severity（重要度）」は何のためにありますか。"
    },
    "options": [
      {
        "vi": "Chỉ định ngôn ngữ lập trình được dùng để viết test",
        "en": "To specify the programming language used to write the test",
        "ja": "テストの記述に使用するプログラミング言語を指定するため"
      },
      {
        "vi": "Đo thời gian thực thi của test tính bằng mili-giây",
        "en": "To measure the test execution time in milliseconds",
        "ja": "テストの実行時間をミリ秒単位で計測するため"
      },
      {
        "vi": "Xác định số lượng trình duyệt cần chạy song song cho test",
        "en": "To determine how many browsers should run the test in parallel",
        "ja": "テストを並列実行するブラウザ数を決定するため"
      },
      {
        "vi": "Phân loại mức độ nghiêm trọng của test (blocker, critical, normal, minor, trivial) để ưu tiên xử lý khi có fail",
        "en": "To classify the importance level of a test (blocker, critical, normal, minor, trivial) so failures can be triaged by priority",
        "ja": "テストの重要度（blocker、critical、normal、minor、trivial）を分類し、失敗発生時の対応優先度を判断するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Annotation @Severity gắn nhãn mức độ nghiêm trọng cho test case, Allure dùng thông tin này để nhóm và ưu tiên các fail nghiêm trọng (blocker/critical) khi phân tích báo cáo.",
      "en": "The @Severity annotation tags a test with a criticality level; Allure uses this to group and prioritize blocker/critical failures when analyzing the report.",
      "ja": "@Severityアノテーションはテストに重要度ラベルを付け、Allureはこれを利用してレポート分析時にblocker/critical等の重大な失敗をグループ化・優先表示します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Extent Report hỗ trợ tính năng \"Dashboard\" nhằm mục đích gì?",
      "en": "What is the purpose of the \"Dashboard\" feature in Extent Reports?",
      "ja": "Extent Reportの「Dashboard」機能は何のためにありますか。"
    },
    "options": [
      {
        "vi": "Hiển thị tổng quan trực quan (biểu đồ tròn, cột) về tỉ lệ pass/fail/skip và các phân loại test toàn bộ suite",
        "en": "To visually summarize (pie/bar charts) the overall pass/fail/skip ratio and test categorization for the whole suite",
        "ja": "スイート全体の合格・失敗・スキップ比率やテスト分類を円グラフ・棒グラフで視覚的に要約表示するため"
      },
      {
        "vi": "Cho phép chỉnh sửa trực tiếp mã nguồn test case từ trình duyệt",
        "en": "To allow editing test case source code directly from the browser",
        "ja": "ブラウザから直接テストケースのソースコードを編集できるようにするため"
      },
      {
        "vi": "Tự động sinh test case mới dựa trên AI",
        "en": "To automatically generate new test cases using AI",
        "ja": "AIを用いて新しいテストケースを自動生成するため"
      },
      {
        "vi": "Kết nối trực tiếp tới cơ sở dữ liệu sản phẩm để so sánh dữ liệu",
        "en": "To connect directly to the production database for data comparison",
        "ja": "本番データベースに直接接続してデータ比較を行うため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dashboard trong Extent Report tổng hợp thống kê trực quan bằng biểu đồ, giúp người xem nắm nhanh sức khỏe tổng thể của lần chạy test mà không cần đọc từng test case.",
      "en": "The Dashboard in Extent Reports aggregates statistics into charts, letting viewers quickly grasp the overall health of a test run without reading every case.",
      "ja": "Extent ReportのDashboardは統計情報をグラフで集約表示し、個々のテストケースを読まなくてもテスト実行全体の健全性を素早く把握できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi log quá nhiều thông tin debug (verbose) vào Allure/Extent Report cho mỗi test, hệ quả tiêu cực chính là gì?",
      "en": "When too much verbose debug information is logged into Allure/Extent Report for every test, what is the main negative consequence?",
      "ja": "すべてのテストでAllure/Extent Reportに過度に詳細なデバッグ情報をログすると、主にどんな悪影響がありますか。"
    },
    "options": [
      {
        "vi": "Test case sẽ tự động bị đánh dấu là fail",
        "en": "The test case will automatically be marked as failed",
        "ja": "テストケースが自動的に失敗と判定される"
      },
      {
        "vi": "Báo cáo trở nên cồng kềnh, khó đọc và làm chậm quá trình generate report, gây nhiễu thông tin quan trọng",
        "en": "The report becomes bloated and hard to read, slows down report generation, and buries important information in noise",
        "ja": "レポートが肥大化して読みにくくなり、レポート生成が遅くなり、重要な情報がノイズに埋もれてしまう"
      },
      {
        "vi": "Trình duyệt sẽ ngừng thực thi kịch bản test ngay lập tức",
        "en": "The browser will immediately stop executing the test script",
        "ja": "ブラウザがテストスクリプトの実行を即座に停止する"
      },
      {
        "vi": "Dữ liệu test trên môi trường production sẽ bị thay đổi",
        "en": "The production environment's test data will be altered",
        "ja": "本番環境のテストデータが変更されてしまう"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Log verbose quá mức làm report phình to, chậm mở, khó lọc ra nguyên nhân fail thật sự; nên chỉ log thông tin cần thiết (step chính, lỗi, ảnh khi fail) thay vì mọi chi tiết vụn vặt.",
      "en": "Excessive verbose logging bloats the report, slows loading, and makes it hard to isolate the real failure cause; best practice is logging only essential info (key steps, errors, failure screenshots) rather than every minor detail.",
      "ja": "過剰な詳細ログはレポートを肥大化させ表示を遅くし、本当の失敗原因を見つけにくくします。些末な詳細ではなく主要ステップ・エラー・失敗時画像など必要な情報のみログするのが望ましいです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, file \"environment.properties\" đặt trong thư mục allure-results dùng để làm gì?",
      "en": "In Allure, what is the purpose of the \"environment.properties\" file placed in the allure-results directory?",
      "ja": "Allureのallure-resultsディレクトリに置く「environment.properties」ファイルは何のためにありますか。"
    },
    "options": [
      {
        "vi": "Chứa mật khẩu đăng nhập vào hệ thống Allure server",
        "en": "To store the login password for the Allure server",
        "ja": "Allureサーバーへのログインパスワードを保存するため"
      },
      {
        "vi": "Cấu hình biến môi trường cho toàn bộ hệ điều hành máy chạy CI",
        "en": "To configure OS-level environment variables for the CI machine",
        "ja": "CIマシンのOSレベル環境変数を設定するため"
      },
      {
        "vi": "Hiển thị thông tin môi trường chạy test (OS, browser, URL...) trong tab Environment của report",
        "en": "To display test execution environment info (OS, browser, URL, etc.) in the report's Environment tab",
        "ja": "テスト実行環境の情報（OS、ブラウザ、URLなど）をレポートのEnvironmentタブに表示するため"
      },
      {
        "vi": "Định nghĩa các test case sẽ bị bỏ qua (skip) khi chạy",
        "en": "To define which test cases should be skipped during the run",
        "ja": "実行時にスキップするテストケースを定義するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Allure đọc file environment.properties (key=value) để hiển thị thông tin ngữ cảnh chạy test như OS, trình duyệt, môi trường (staging/prod) ngay trên report, giúp người xem hiểu bối cảnh kết quả.",
      "en": "Allure reads the key=value pairs in environment.properties to show contextual run information such as OS, browser, and environment (staging/prod) right in the report, helping viewers interpret results.",
      "ja": "Allureはenvironment.propertiesのkey=valueを読み込み、OS・ブラウザ・環境（staging/prodなど）といった実行コンテキストをレポート上に表示し、閲覧者が結果を理解しやすくします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một tester triển khai chụp ảnh màn hình full-page thay vì chỉ viewport khi test fail. Lợi ích chính của cách này là gì?",
      "en": "A tester implements full-page screenshots instead of viewport-only captures on failure. What is the main benefit?",
      "ja": "あるテスターが失敗時にビューポートのみでなくフルページのスクリーンショットを実装しました。主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Tự động sửa lỗi giao diện được phát hiện",
        "en": "It automatically fixes the UI bug that was detected",
        "ja": "検出されたUIの不具合を自動的に修正する"
      },
      {
        "vi": "Giảm dung lượng file ảnh xuống mức tối thiểu",
        "en": "It minimizes the image file size",
        "ja": "画像ファイルサイズを最小限に抑えられる"
      },
      {
        "vi": "Tăng tốc độ chạy test lên đáng kể",
        "en": "It significantly speeds up test execution",
        "ja": "テスト実行速度が大幅に向上する"
      },
      {
        "vi": "Nhìn thấy toàn bộ trạng thái trang tại thời điểm fail, kể cả phần nội dung cần cuộn xuống mới thấy",
        "en": "It captures the entire page state at the moment of failure, including content that requires scrolling to see",
        "ja": "失敗時点のページ全体の状態を、スクロールしないと見えない部分も含めて確認できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ảnh full-page ghi lại toàn bộ layout kể cả phần ngoài viewport, hữu ích khi lỗi nằm ở vùng phải cuộn mới thấy, giúp debug đầy đủ ngữ cảnh hơn ảnh viewport thông thường.",
      "en": "A full-page screenshot records the entire layout, including areas outside the visible viewport, which is valuable when the defect lies below the fold and gives fuller debugging context than a viewport-only capture.",
      "ja": "フルページスクリーンショットは表示範囲外を含むレイアウト全体を記録するため、スクロールしないと見えない部分に不具合がある場合に有効で、ビューポートのみの画像より十分なデバッグ情報が得られます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong TestNG kết hợp Extent Report, ITestListener thường được dùng để làm gì liên quan đến báo cáo?",
      "en": "In TestNG combined with Extent Reports, what is ITestListener typically used for regarding reporting?",
      "ja": "TestNGとExtent Reportを組み合わせる際、レポートに関してITestListenerは通常何のために使われますか。"
    },
    "options": [
      {
        "vi": "Bắt các sự kiện onTestSuccess/onTestFailure/onTestSkipped để tự động ghi log tương ứng vào ExtentTest",
        "en": "To hook into onTestSuccess/onTestFailure/onTestSkipped events and automatically log the corresponding status to ExtentTest",
        "ja": "onTestSuccess/onTestFailure/onTestSkippedイベントを捕捉し、対応するステータスをExtentTestへ自動記録するため"
      },
      {
        "vi": "Biên dịch mã nguồn Java trước khi chạy test",
        "en": "To compile Java source code before running tests",
        "ja": "テスト実行前にJavaソースコードをコンパイルするため"
      },
      {
        "vi": "Quản lý kết nối cơ sở dữ liệu cho toàn bộ ứng dụng",
        "en": "To manage database connections for the whole application",
        "ja": "アプリケーション全体のデータベース接続を管理するため"
      },
      {
        "vi": "Tạo tài khoản người dùng thử nghiệm tự động trên hệ thống",
        "en": "To automatically create test user accounts on the system",
        "ja": "システム上にテスト用ユーザーアカウントを自動作成するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "ITestListener cung cấp các callback theo vòng đời test; implement onTestFailure/onTestSuccess để tự động cập nhật trạng thái và đính kèm log/ảnh vào ExtentTest mà không cần gọi thủ công trong từng test.",
      "en": "ITestListener provides lifecycle callbacks; implementing onTestFailure/onTestSuccess lets you automatically update status and attach logs/screenshots to ExtentTest without manual calls in every test.",
      "ja": "ITestListenerはテストのライフサイクルコールバックを提供します。onTestFailure/onTestSuccessを実装することで、各テストで手動呼び出しをせずにExtentTestのステータス更新やログ・画像添付を自動化できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, \"Categories\" (defect categories) dùng để làm gì?",
      "en": "In Allure, what are \"Categories\" (defect categories) used for?",
      "ja": "Allureにおける「Categories」（不具合カテゴリ）は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Sắp xếp test case theo bảng chữ cái tên file",
        "en": "To sort test cases alphabetically by file name",
        "ja": "ファイル名のアルファベット順にテストケースを並べ替えるため"
      },
      {
        "vi": "Tự động phân loại các fail theo mẫu (regex trên message/trace) như \"Product defects\", \"Test defects\" để dễ phân tích nguyên nhân hàng loạt",
        "en": "To automatically classify failures via regex patterns on messages/traces into groups like \"Product defects\" or \"Test defects\" for easier bulk root-cause analysis",
        "ja": "メッセージやスタックトレースへの正規表現パターンによって失敗を「Product defects」「Test defects」のように自動分類し、まとめて原因分析しやすくするため"
      },
      {
        "vi": "Giới hạn số lượng test được chạy song song",
        "en": "To limit the number of tests that can run in parallel",
        "ja": "並列実行できるテスト数を制限するため"
      },
      {
        "vi": "Mã hóa toàn bộ nội dung report trước khi xuất bản",
        "en": "To encrypt the entire report content before publishing",
        "ja": "公開前にレポート内容全体を暗号化するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "File categories.json định nghĩa quy tắc match lỗi (theo messageRegex/traceRegex) để Allure tự nhóm các fail tương tự lại, giúp phân biệt nhanh lỗi sản phẩm thật với lỗi do test/môi trường.",
      "en": "A categories.json file defines matching rules (via messageRegex/traceRegex) so Allure auto-groups similar failures, quickly distinguishing genuine product bugs from test or environment issues.",
      "ja": "categories.jsonでmessageRegex/traceRegexによるマッチングルールを定義すると、Allureが類似した失敗を自動グループ化し、本物の製品バグとテスト・環境起因の問題を素早く見分けられます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "So sánh giữa lưu log dạng text thuần và log có cấu trúc (structured logging, ví dụ JSON) trong automation test, ưu điểm chính của structured logging là gì?",
      "en": "Comparing plain-text logs with structured logging (e.g., JSON) in automation testing, what is the main advantage of structured logging?",
      "ja": "自動化テストにおいて、プレーンテキストログと構造化ログ（JSONなど）を比較した場合、構造化ログの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Không cần bất kỳ công cụ nào để xem, chỉ cần mở bằng Notepad",
        "en": "It requires no tooling to view and can always be opened in Notepad",
        "ja": "ツールを一切使わずメモ帳だけで常に閲覧できる"
      },
      {
        "vi": "Luôn có dung lượng file nhỏ hơn log text thuần",
        "en": "It always produces a smaller file size than plain-text logs",
        "ja": "常にプレーンテキストログよりファイルサイズが小さくなる"
      },
      {
        "vi": "Dễ dàng lọc, tìm kiếm và phân tích tự động bằng công cụ (ELK, Splunk) nhờ có trường dữ liệu rõ ràng",
        "en": "It can be easily filtered, searched, and analyzed by tools (ELK, Splunk) thanks to clearly defined fields",
        "ja": "フィールドが明確に定義されているため、ツール（ELK、Splunkなど）による絞り込み・検索・分析が容易になる"
      },
      {
        "vi": "Tự động sửa lỗi test case dựa trên nội dung log",
        "en": "It automatically fixes test case bugs based on the log content",
        "ja": "ログ内容に基づいてテストケースのバグを自動修正する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Log có cấu trúc (JSON, key-value) cho phép công cụ log aggregation lọc theo trường (timestamp, level, testId...), truy vấn nhanh và tích hợp dashboard, thay vì phải grep thủ công trên text.",
      "en": "Structured logs (JSON, key-value) let log-aggregation tools filter by fields (timestamp, level, testId...), enabling fast queries and dashboard integration instead of manual text grepping.",
      "ja": "構造化ログ（JSON、キー・バリュー形式）は、タイムスタンプ・レベル・testIdなどのフィールドでログ集約ツールが絞り込みできるため、テキストを手作業でgrepするよりも高速なクエリやダッシュボード連携が可能になります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi báo cáo test được publish lên CI/CD (ví dụ Jenkins Allure plugin), mục đích chính là gì?",
      "en": "When test reports are published in CI/CD (e.g., via the Jenkins Allure plugin), what is the main purpose?",
      "ja": "CI/CD上でテストレポートを公開する（例：Jenkins Allureプラグイン）目的は主に何ですか。"
    },
    "options": [
      {
        "vi": "Tự động triển khai ứng dụng lên môi trường production",
        "en": "To automatically deploy the application to production",
        "ja": "アプリケーションを本番環境へ自動デプロイするため"
      },
      {
        "vi": "Tăng tốc độ build ứng dụng lên gấp đôi",
        "en": "To double the application's build speed",
        "ja": "アプリケーションのビルド速度を2倍にするため"
      },
      {
        "vi": "Thay thế hoàn toàn việc code review trước khi merge",
        "en": "To completely replace code review before merging",
        "ja": "マージ前のコードレビューを完全に置き換えるため"
      },
      {
        "vi": "Cho phép cả nhóm (dev, tester, PM) xem kết quả và xu hướng test trực tiếp trên pipeline mà không cần chạy lại cục bộ",
        "en": "To let the whole team (dev, tester, PM) view results and trends directly on the pipeline without rerunning tests locally",
        "ja": "チーム全員（開発者・テスター・PM）がローカルで再実行しなくてもパイプライン上で結果とトレンドを直接確認できるようにするため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Publish report lên CI (Jenkins Allure plugin, GitLab Pages...) giúp report tồn tại như một artifact có thể truy cập từ xa, cả nhóm dễ dàng theo dõi kết quả/xu hướng mà không phụ thuộc máy cá nhân.",
      "en": "Publishing the report in CI (Jenkins Allure plugin, GitLab Pages, etc.) makes it a remotely accessible artifact, so the whole team can track results and trends without depending on anyone's local machine.",
      "ja": "CI（Jenkins Allureプラグイン、GitLab Pagesなど）でレポートを公開すると、リモートからアクセス可能な成果物として残り、個人のローカル環境に依存せずチーム全員が結果とトレンドを追跡できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Extent Report, khi một test được đánh dấu Status.SKIP, điều này thường phản ánh tình huống nào?",
      "en": "In Extent Reports, when a test is marked Status.SKIP, what situation does this typically reflect?",
      "ja": "Extent ReportでテストがStatus.SKIPとマークされる場合、通常どのような状況を反映していますか。"
    },
    "options": [
      {
        "vi": "Test bị bỏ qua do điều kiện tiên quyết không thỏa (ví dụ dependency test trước đó fail) hoặc bị disable chủ động",
        "en": "The test was skipped because a precondition failed (e.g., a dependent prior test failed) or it was deliberately disabled",
        "ja": "前提条件が満たされなかった（例：依存する先行テストが失敗した）、あるいは意図的に無効化されたためテストがスキップされた"
      },
      {
        "vi": "Test đã chạy thành công nhưng không có gì để kiểm tra",
        "en": "The test ran successfully but had nothing to verify",
        "ja": "テストは正常に実行されたが検証項目が存在しなかった"
      },
      {
        "vi": "Test đã bị xóa vĩnh viễn khỏi mã nguồn",
        "en": "The test has been permanently deleted from the source code",
        "ja": "テストがソースコードから永久に削除された"
      },
      {
        "vi": "Ứng dụng đang được kiểm thử đã crash hoàn toàn",
        "en": "The application under test crashed entirely",
        "ja": "テスト対象アプリケーションが完全にクラッシュした"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "SKIP thường xảy ra khi một test phụ thuộc (dependsOnMethods) vào test trước đó bị fail nên TestNG tự bỏ qua, hoặc tester chủ động dùng @Disabled/điều kiện để không chạy test đó.",
      "en": "SKIP usually happens when a test depends on a prior test (via dependsOnMethods) that failed, so TestNG auto-skips it, or when a tester deliberately disables the test via @Disabled or a conditional check.",
      "ja": "SKIPは通常、dependsOnMethodsで依存している先行テストが失敗しTestNGが自動的にスキップした場合、またはテスターが@Disabledや条件分岐で意図的にそのテストを実行しないようにした場合に発生します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một nhóm QA quyết định chỉ giữ ảnh chụp màn hình khi fail và xóa ảnh khi test pass. Lý do chính hợp lý nhất là gì?",
      "en": "A QA team decides to keep screenshots only on failure and discard them on pass. What is the most reasonable main reason?",
      "ja": "あるQAチームが、失敗時のみスクリーンショットを保持し合格時は破棄することにしました。最も妥当な主な理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì công cụ automation không hỗ trợ chụp ảnh khi pass",
        "en": "Because automation tools do not support capturing screenshots on pass",
        "ja": "自動化ツールが合格時のスクリーンショット撮影に対応していないため"
      },
      {
        "vi": "Giảm dung lượng lưu trữ và thời gian chạy test vì ảnh pass thường không cần thiết cho việc debug",
        "en": "To reduce storage usage and test run time, since pass screenshots usually add no debugging value",
        "ja": "合格時の画像は通常デバッグに不要であり、ストレージ使用量とテスト実行時間を削減するため"
      },
      {
        "vi": "Vì luật pháp cấm lưu trữ ảnh của test pass",
        "en": "Because storing screenshots of passing tests is illegal",
        "ja": "合格テストの画像を保存することは法律で禁止されているため"
      },
      {
        "vi": "Vì ảnh chụp khi pass luôn bị lỗi định dạng",
        "en": "Because screenshots taken on pass always have a corrupted format",
        "ja": "合格時に撮影した画像は常にフォーマットが壊れるため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chụp và lưu ảnh cho mọi test (kể cả pass) gây tốn dung lượng đĩa/artifact storage và làm chậm CI không cần thiết, trong khi giá trị debug của ảnh pass gần như bằng không, nên chiến lược phổ biến là chỉ chụp khi fail.",
      "en": "Capturing and storing screenshots for every test, including passes, wastes disk/artifact storage and needlessly slows CI, while the debugging value of a passing screenshot is near zero — so the common strategy is capturing only on failure.",
      "ja": "合格時も含めて全テストで画像を撮影・保存するとディスクやアーティファクトストレージを消費しCIを不必要に遅くします。合格時の画像はデバッグ価値がほぼないため、失敗時のみ撮影するのが一般的な戦略です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, \"Attachment\" khác với \"Step\" ở điểm nào?",
      "en": "In Allure, how does an \"Attachment\" differ from a \"Step\"?",
      "ja": "Allureにおいて「Attachment」は「Step」とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Attachment và Step là hai tên gọi khác nhau của cùng một khái niệm",
        "en": "Attachment and Step are just two names for the exact same concept",
        "ja": "AttachmentとStepは同じ概念の異なる名称にすぎない"
      },
      {
        "vi": "Attachment chỉ dùng cho test API, Step chỉ dùng cho test UI",
        "en": "Attachments are only for API tests, Steps are only for UI tests",
        "ja": "AttachmentはAPIテスト専用、StepはUIテスト専用である"
      },
      {
        "vi": "Attachment là dữ liệu bổ sung (ảnh, log, JSON) gắn vào một điểm cụ thể trong test, còn Step là hành động có tên thể hiện luồng thực thi",
        "en": "An Attachment is supplementary data (image, log, JSON) bound to a specific point in the test, while a Step is a named action representing the execution flow",
        "ja": "Attachmentはテスト内の特定の時点に紐付けられた補足データ（画像、ログ、JSONなど）であり、Stepは実行フローを表す名前付きアクションである"
      },
      {
        "vi": "Step chỉ tồn tại trong phiên bản Allure trả phí, Attachment miễn phí",
        "en": "Steps exist only in a paid version of Allure, while Attachments are free",
        "ja": "Stepは有料版Allureにのみ存在し、Attachmentは無料である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Step mô tả một hành động có tên trong luồng test (dùng @Step), còn Attachment là dữ liệu phụ trợ (ảnh, response JSON, log file) được gắn kèm vào step hoặc test để hỗ trợ debug, hai khái niệm bổ sung cho nhau.",
      "en": "A Step names an action in the test flow (via @Step), while an Attachment is supplementary data (images, JSON responses, log files) bound to a step or test for debugging — the two concepts complement each other.",
      "ja": "Step（@Step）はテストフロー内の名前付きアクションを表し、Attachmentはステップやテストに紐付く補足データ（画像、JSONレスポンス、ログファイルなど）でデバッグを助けます。両者は互いに補完し合う概念です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điều gì KHÔNG đúng khi nói về việc lưu log trong quá trình chạy automation test?",
      "en": "Which statement is INCORRECT about logging during automation test execution?",
      "ja": "自動化テスト実行中のログ記録について正しくない記述はどれですか。"
    },
    "options": [
      {
        "vi": "Log nên đủ chi tiết để tái hiện lại bối cảnh lỗi mà không cần chạy lại test",
        "en": "Logs should be detailed enough to reconstruct the failure context without rerunning the test",
        "ja": "テストを再実行しなくても失敗の状況を再現できるよう、ログは十分に詳細であるべきである"
      },
      {
        "vi": "Log nên có mức độ (level) như INFO, WARN, ERROR để dễ lọc theo mức độ nghiêm trọng",
        "en": "Logs should have severity levels (INFO, WARN, ERROR) to allow filtering by criticality",
        "ja": "ログには重要度に応じたフィルタリングを可能にするため、INFO・WARN・ERRORなどのレベルを設定すべきである"
      },
      {
        "vi": "Nên có timestamp trong mỗi dòng log để dễ đối chiếu thời điểm xảy ra sự kiện",
        "en": "Each log line should include a timestamp to correlate when events occurred",
        "ja": "イベント発生時刻を照合しやすくするため、各ログ行にタイムスタンプを含めるべきである"
      },
      {
        "vi": "Nên luôn log toàn bộ dữ liệu nhạy cảm như mật khẩu, token thật vào log để tiện debug sau này",
        "en": "Sensitive data such as real passwords or tokens should always be logged in full for easier future debugging",
        "ja": "パスワードや実際のトークンなどの機密情報は、後でのデバッグを容易にするため常に全文ログすべきである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Log dữ liệu nhạy cảm (mật khẩu thật, token, thông tin cá nhân) là vi phạm bảo mật nghiêm trọng; cần mask/ẩn các trường này. Ba lựa chọn còn lại là thực hành tốt được khuyến nghị.",
      "en": "Logging sensitive data (real passwords, tokens, PII) in plain text is a serious security violation; such fields must be masked. The other three options describe recommended best practices.",
      "ja": "機密情報（実際のパスワード、トークン、個人情報）を平文でログすることは重大なセキュリティ違反であり、これらのフィールドはマスキングする必要があります。残り3つの選択肢は推奨されるベストプラクティスです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi tích hợp Allure với Cucumber (BDD), thông tin nào thường được ánh xạ tự động vào report?",
      "en": "When integrating Allure with Cucumber (BDD), what information is typically auto-mapped into the report?",
      "ja": "AllureをCucumber（BDD）と統合する際、通常レポートに自動マッピングされる情報は何ですか。"
    },
    "options": [
      {
        "vi": "Các bước Given/When/Then trong feature file được ánh xạ thành các Step tương ứng trong Allure report",
        "en": "The Given/When/Then steps in the feature file are mapped to corresponding Steps in the Allure report",
        "ja": "feature ファイルのGiven/When/Thenステップが、Allureレポート上の対応するStepにマッピングされる"
      },
      {
        "vi": "Toàn bộ mã nguồn ứng dụng đang test được nhúng vào report dưới dạng văn bản",
        "en": "The entire source code of the application under test is embedded as text in the report",
        "ja": "テスト対象アプリケーションのソースコード全体がテキストとしてレポートに埋め込まれる"
      },
      {
        "vi": "Cấu hình mạng của máy chủ CI được tự động ghi vào report",
        "en": "The CI server's network configuration is automatically written into the report",
        "ja": "CIサーバーのネットワーク設定が自動的にレポートへ記録される"
      },
      {
        "vi": "Danh sách toàn bộ commit Git trong repository được liệt kê trong report",
        "en": "The full list of Git commits in the repository is listed in the report",
        "ja": "リポジトリ内の全Gitコミット一覧がレポートに列挙される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Allure có adapter cho Cucumber-JVM giúp tự động chuyển các bước Given/When/Then trong scenario thành các Step có tên trong report, giữ nguyên cấu trúc BDD dễ đọc cho stakeholder.",
      "en": "Allure provides a Cucumber-JVM adapter that automatically converts Given/When/Then steps in a scenario into named Steps in the report, preserving a readable BDD structure for stakeholders.",
      "ja": "AllureにはCucumber-JVM用アダプターがあり、シナリオ内のGiven/When/Thenステップを自動的に名前付きStepとしてレポートに変換し、ステークホルダーにも読みやすいBDD構造を維持します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong chiến lược reporting cho automation test, việc gắn \"Link\" (Issue link, TMS link) vào test case trong Allure mang lại lợi ích gì?",
      "en": "In an automation reporting strategy, what benefit does attaching \"Links\" (Issue link, TMS link) to a test case in Allure provide?",
      "ja": "自動化テストのレポート戦略において、Allureのテストケースに「Link」（Issueリンク、TMSリンク）を付けることにはどんな利点がありますか。"
    },
    "options": [
      {
        "vi": "Tự động sửa lỗi được liên kết trong Jira",
        "en": "It automatically resolves the linked issue in Jira",
        "ja": "Jira上のリンクされたIssueを自動的に解決する"
      },
      {
        "vi": "Cho phép nhảy trực tiếp từ report tới bug tracker hoặc test management system liên quan để tra cứu ngữ cảnh nhanh",
        "en": "It lets you jump directly from the report to the related bug tracker or test management system for quick context lookup",
        "ja": "レポートから関連するバグトラッカーやテスト管理システムへ直接遷移でき、素早く背景情報を確認できる"
      },
      {
        "vi": "Tăng tốc độ chạy test do giảm số bước thực thi",
        "en": "It speeds up test execution by reducing the number of executed steps",
        "ja": "実行ステップ数を減らすことでテスト実行速度を向上させる"
      },
      {
        "vi": "Bắt buộc phải có để test chạy được, thiếu sẽ lỗi biên dịch",
        "en": "It is mandatory for the test to run; omitting it causes a compilation error",
        "ja": "テスト実行に必須であり、省略するとコンパイルエラーになる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Annotation @Link/@Issue/@TmsLink gắn URL tham chiếu tới hệ thống quản lý bug/test case, giúp người đọc report click thẳng tới ngữ cảnh liên quan (yêu cầu, bug gốc) mà không cần tìm kiếm thủ công.",
      "en": "The @Link/@Issue/@TmsLink annotations attach reference URLs to bug/test-management systems, letting report readers click straight through to related context (requirements, original bugs) without manual searching.",
      "ja": "@Link/@Issue/@TmsLinkアノテーションはバグ・テスト管理システムへの参照URLを付与し、レポート閲覧者が手動検索なしで関連情報（要件、元のバグなど）へ直接アクセスできるようにします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Một pipeline chạy 500 test song song trên nhiều node, sau đó cần gộp kết quả thành một Allure report duy nhất. Bước nào là cần thiết?",
      "en": "A pipeline runs 500 tests in parallel across multiple nodes, then needs to merge results into a single Allure report. What step is necessary?",
      "ja": "パイプラインが複数ノードで500件のテストを並列実行し、その後結果を1つのAllureレポートに統合する必要があります。どのステップが必要ですか。"
    },
    "options": [
      {
        "vi": "Xóa hết log của các node để tránh xung đột dữ liệu",
        "en": "Delete all logs from every node to avoid data conflicts",
        "ja": "データ競合を避けるため全ノードのログを削除する"
      },
      {
        "vi": "Chạy lại toàn bộ 500 test tuần tự trên một máy duy nhất",
        "en": "Rerun all 500 tests sequentially on a single machine",
        "ja": "500件のテストを1台のマシンで再度シーケンシャルに実行する"
      },
      {
        "vi": "Thu thập (aggregate) toàn bộ thư mục allure-results từ các node về một nơi trước khi chạy lệnh allure generate",
        "en": "Aggregate the allure-results directories from all nodes into one location before running allure generate",
        "ja": "allure generate を実行する前に、全ノードのallure-resultsディレクトリを1か所に集約する"
      },
      {
        "vi": "Chuyển toàn bộ test sang chạy bằng một ngôn ngữ lập trình khác",
        "en": "Rewrite all tests to run using a different programming language",
        "ja": "全テストを別のプログラミング言語で書き直して実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Allure sinh report từ các file JSON/attachment trong thư mục allure-results; khi chạy phân tán, cần gom (merge) toàn bộ kết quả từ các node về một thư mục chung trước khi chạy `allure generate` để có report tổng hợp.",
      "en": "Allure builds its report from the JSON/attachment files in allure-results; in distributed runs, results from all nodes must be merged into a shared folder before running `allure generate` to produce a consolidated report.",
      "ja": "Allureはallure-results内のJSON・添付ファイルからレポートを生成します。分散実行の場合、統合レポートを得るには`allure generate`を実行する前に全ノードの結果を1つの共有フォルダにマージする必要があります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Extent Report cung cấp \"Author\", \"Device\", \"Category\" cho mỗi test nhằm mục đích chính nào?",
      "en": "Extent Reports lets you tag each test with \"Author\", \"Device\", \"Category\" mainly for what purpose?",
      "ja": "Extent Reportで各テストに「Author」「Device」「Category」を付与できるのは主に何のためですか。"
    },
    "options": [
      {
        "vi": "Xác định ngôn ngữ hiển thị của report (vi/en/ja)",
        "en": "It determines the display language of the report (vi/en/ja)",
        "ja": "レポートの表示言語（vi/en/ja）を決定する"
      },
      {
        "vi": "Bắt buộc để test có thể biên dịch thành công",
        "en": "It is required for the test to compile successfully",
        "ja": "テストが正常にコンパイルされるために必須である"
      },
      {
        "vi": "Tự động phân quyền truy cập report cho từng người dùng",
        "en": "It automatically assigns access permissions to the report per user",
        "ja": "レポートへのアクセス権をユーザーごとに自動割り当てする"
      },
      {
        "vi": "Hỗ trợ lọc/nhóm test trong report theo người viết, thiết bị hoặc phân loại chức năng để phân tích dễ dàng hơn",
        "en": "To support filtering/grouping tests in the report by author, device, or functional category for easier analysis",
        "ja": "作成者・デバイス・機能カテゴリでレポート内のテストを絞り込み・グループ化しやすくし、分析を容易にするため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "assignAuthor(), assignDevice(), assignCategory() gắn metadata cho test, Extent Report dùng chúng để tạo bộ lọc theo tag trên giao diện report, giúp người xem nhanh chóng khoanh vùng nhóm test quan tâm.",
      "en": "Methods like assignAuthor(), assignDevice(), assignCategory() tag tests with metadata that Extent Reports uses to build tag-based filters in the UI, helping viewers quickly narrow down the tests they care about.",
      "ja": "assignAuthor()、assignDevice()、assignCategory()はテストにメタデータを付与し、Extent Reportはこれを利用してUI上でタグベースのフィルターを構築、閲覧者が関心のあるテスト群を素早く絞り込めるようにします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi so sánh giữa việc lưu screenshot dạng PNG và việc quay video toàn bộ phiên chạy test khi fail, đánh đổi (trade-off) chính là gì?",
      "en": "Comparing PNG screenshots with recording a full video of the session on failure, what is the main trade-off?",
      "ja": "失敗時にPNGスクリーンショットを保存する方法とセッション全体の動画を録画する方法を比較した場合、主なトレードオフは何ですか。"
    },
    "options": [
      {
        "vi": "Video cho thấy toàn bộ diễn biến trước khi fail nhưng tốn dung lượng và thời gian xử lý hơn nhiều so với ảnh tĩnh",
        "en": "Video shows the full sequence of events leading to failure but consumes far more storage and processing time than a static image",
        "ja": "動画は失敗に至るまでの経緯全体を確認できるが、静止画に比べてはるかに多くのストレージと処理時間を消費する"
      },
      {
        "vi": "Ảnh PNG luôn cho nhiều thông tin hơn video trong mọi trường hợp",
        "en": "PNG screenshots always convey more information than video in every case",
        "ja": "PNGスクリーンショットはあらゆる場合において動画より常に多くの情報を伝える"
      },
      {
        "vi": "Video không thể đính kèm vào Allure hay Extent Report trong bất kỳ trường hợp nào",
        "en": "Video can never be attached to Allure or Extent Report under any circumstances",
        "ja": "動画はいかなる状況でもAllureやExtent Reportに添付できない"
      },
      {
        "vi": "Ảnh PNG và video có chi phí lưu trữ hoàn toàn giống nhau",
        "en": "PNG screenshots and video have exactly the same storage cost",
        "ja": "PNGスクリーンショットと動画のストレージコストはまったく同じである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Video ghi lại toàn bộ hành trình dẫn đến lỗi (hữu ích với lỗi động, race condition) nhưng dung lượng file lớn hơn nhiều và tốn tài nguyên/CPU để encode, nên nhiều team chỉ bật quay video có chọn lọc thay vì mặc định cho mọi test.",
      "en": "Video captures the full sequence leading to the failure (valuable for dynamic bugs or race conditions) but has a much larger file size and consumes more CPU/resources to encode, so many teams enable it selectively rather than by default for every test.",
      "ja": "動画は失敗に至る一連の経緯を記録でき（動的な不具合や競合状態の調査に有用）ますが、ファイルサイズがはるかに大きくエンコードにCPU・リソースを消費するため、多くのチームは全テストで既定にせず選択的に有効化します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong Allure, tính năng \"Retry\" hiển thị điều gì khi một test được chạy lại nhiều lần (rerun)?",
      "en": "In Allure, what does the \"Retry\" feature display when a test is rerun multiple times?",
      "ja": "Allureの「Retry」機能は、テストが複数回リトライされた場合に何を表示しますか。"
    },
    "options": [
      {
        "vi": "Xóa hoàn toàn kết quả của các lần chạy trước, chỉ giữ lần cuối cùng",
        "en": "It permanently deletes results of previous attempts, keeping only the latest one",
        "ja": "以前の試行結果を完全に削除し、最新の結果のみを保持する"
      },
      {
        "vi": "Gộp các lần thực thi lại thành một test entry, hiển thị lịch sử các lần retry với kết quả của từng lần",
        "en": "It groups the executions into a single test entry, showing the retry history with each attempt's result",
        "ja": "実行結果を1つのテストエントリにまとめ、各試行の結果を含むリトライ履歴を表示する"
      },
      {
        "vi": "Tự động sửa mã nguồn test để lần retry tiếp theo luôn pass",
        "en": "It automatically modifies the test source code so the next retry always passes",
        "ja": "次回のリトライで必ず合格するようテストのソースコードを自動修正する"
      },
      {
        "vi": "Yêu cầu người dùng nhập captcha trước khi hiển thị kết quả",
        "en": "It requires the user to solve a CAPTCHA before showing results",
        "ja": "結果を表示する前にユーザーへCAPTCHA入力を要求する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi bật retry (analyzer/rerun), Allure nhóm các lần chạy của cùng một test lại, hiển thị dạng \"Retries\" cho thấy lần nào fail lần nào pass, giúp phát hiện test không ổn định (flaky).",
      "en": "When retries are enabled, Allure groups multiple executions of the same test and shows a \"Retries\" history indicating which attempts failed or passed, helping identify flaky tests.",
      "ja": "リトライが有効な場合、Allureは同一テストの複数回の実行をグループ化し、どの試行が失敗・合格したかを示す「Retries」履歴を表示します。これによりフレークテストの発見に役立ちます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao nên đặt tên file ảnh chụp màn hình khi fail theo mẫu như \"{testName}_{timestamp}.png\" thay vì tên cố định \"screenshot.png\"?",
      "en": "Why should failure screenshot filenames follow a pattern like \"{testName}_{timestamp}.png\" rather than a fixed name like \"screenshot.png\"?",
      "ja": "失敗時のスクリーンショットのファイル名を固定名「screenshot.png」ではなく「{testName}_{timestamp}.png」のようなパターンにすべきなのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì tên file có timestamp sẽ tự động nén ảnh nhỏ hơn",
        "en": "Because a timestamped filename automatically compresses the image to a smaller size",
        "ja": "タイムスタンプ付きファイル名は自動的に画像をより小さく圧縮するため"
      },
      {
        "vi": "Vì hệ điều hành không cho phép tạo file PNG có tên cố định",
        "en": "Because operating systems do not allow creating a PNG file with a fixed name",
        "ja": "OSは固定名のPNGファイル作成を許可していないため"
      },
      {
        "vi": "Tránh việc các lần chạy hoặc test khác nhau ghi đè lên cùng một file, đảm bảo mỗi ảnh được lưu và truy vết riêng biệt",
        "en": "To prevent different runs or tests from overwriting the same file, ensuring each screenshot is saved and traceable individually",
        "ja": "異なる実行やテストが同じファイルを上書きしてしまうのを防ぎ、各スクリーンショットを個別に保存・追跡できるようにするため"
      },
      {
        "vi": "Vì Allure/Extent Report yêu cầu bắt buộc định dạng tên này để chạy được",
        "en": "Because Allure/Extent Report mandate this exact naming format to function at all",
        "ja": "Allure/Extent Reportがこの命名形式でなければ動作しないと厳格に要求しているため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tên file cố định sẽ bị ghi đè khi nhiều test/run cùng lưu ảnh, gây mất dữ liệu hoặc hiển thị sai ảnh trong report; đặt tên duy nhất theo testName+timestamp đảm bảo mỗi ảnh gắn đúng với ngữ cảnh fail của nó.",
      "en": "A fixed filename gets overwritten when multiple tests or runs save screenshots simultaneously, causing data loss or mismatched images in the report; a unique name using testName+timestamp ensures each image stays correctly tied to its failure context.",
      "ja": "固定ファイル名は複数のテストや実行が同時にスクリーンショットを保存する際に上書きされ、データ損失やレポート内の画像の不整合を招きます。testName+timestampで一意な名前を付けることで、各画像が正しく対応する失敗コンテキストに紐付けられます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong một buổi phỏng vấn SDET, khi được hỏi \"làm sao đảm bảo report không bị lộ dữ liệu nhạy cảm của khách hàng\", câu trả lời phù hợp nhất là gì?",
      "en": "In an SDET interview, when asked \"how do you ensure the report doesn't leak sensitive customer data\", what is the most appropriate answer?",
      "ja": "SDET面接で「レポートに顧客の機密データが漏洩しないようどう保証するか」と聞かれた場合、最も適切な回答は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ chạy test trên môi trường production với dữ liệu khách hàng thật để report chính xác nhất",
        "en": "Only run tests on production with real customer data so the report is as accurate as possible",
        "ja": "レポートを最も正確にするため、本番環境で実際の顧客データを使ってテストを実行する"
      },
      {
        "vi": "Không bao giờ tạo report để tránh mọi rủi ro",
        "en": "Never generate reports at all, to avoid any risk",
        "ja": "あらゆるリスクを避けるためレポートを一切生成しない"
      },
      {
        "vi": "Luôn công khai report cho toàn bộ internet để minh bạch",
        "en": "Always publish the report publicly on the internet for transparency",
        "ja": "透明性のためレポートを常にインターネット上に一般公開する"
      },
      {
        "vi": "Che (mask) hoặc lọc bỏ các trường nhạy cảm trước khi log/đính kèm vào report, dùng dữ liệu test giả thay vì dữ liệu thật",
        "en": "Mask or filter out sensitive fields before logging/attaching them to the report, and use synthetic test data instead of real data",
        "ja": "機密フィールドをログ・添付する前にマスキングまたは除外し、実データの代わりに合成テストデータを使用する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thực hành đúng là dùng dữ liệu test giả (synthetic/anonymized) và chủ động mask các trường nhạy cảm (PII, thẻ tín dụng, mật khẩu) trước khi ghi vào log/report, đồng thời kiểm soát quyền truy cập report.",
      "en": "Best practice is to use synthetic/anonymized test data and proactively mask sensitive fields (PII, credit card numbers, passwords) before writing them to logs/reports, along with controlling report access permissions.",
      "ja": "適切な方法は、合成・匿名化されたテストデータを使用し、機密フィールド（個人情報、クレジットカード番号、パスワードなど）をログ・レポートに書き込む前に積極的にマスキングし、レポートへのアクセス権限も管理することです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Điểm khác biệt giữa Allure và ReportPortal (một công cụ báo cáo/AI phân tích test khác) là gì?",
      "en": "What is a key difference between Allure and ReportPortal (another test reporting/AI-analysis tool)?",
      "ja": "Allureと（別のテストレポート・AI分析ツールである）ReportPortalとの主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "ReportPortal là nền tảng real-time có server riêng, hỗ trợ AI gợi ý nguyên nhân fail và theo dõi trực tiếp khi test đang chạy, còn Allure chủ yếu sinh report tĩnh sau khi chạy xong",
        "en": "ReportPortal is a real-time platform with its own server, offering AI-assisted failure analysis and live monitoring during execution, while Allure mainly generates a static report after the run completes",
        "ja": "ReportPortalは独自サーバーを持つリアルタイムプラットフォームで、AIによる失敗原因の提案や実行中のライブモニタリングに対応する一方、Allureは主に実行完了後に静的レポートを生成する"
      },
      {
        "vi": "Allure chỉ hỗ trợ ngôn ngữ Python, ReportPortal chỉ hỗ trợ Java",
        "en": "Allure only supports Python while ReportPortal only supports Java",
        "ja": "AllureはPythonのみ対応、ReportPortalはJavaのみ対応である"
      },
      {
        "vi": "ReportPortal không thể tích hợp với CI/CD trong khi Allure bắt buộc phải chạy trong CI/CD",
        "en": "ReportPortal cannot integrate with CI/CD while Allure must always run inside CI/CD",
        "ja": "ReportPortalはCI/CDと統合できないが、AllureはCI/CD内での実行が必須である"
      },
      {
        "vi": "Cả hai đều không hỗ trợ đính kèm ảnh chụp màn hình",
        "en": "Neither tool supports attaching screenshots",
        "ja": "どちらのツールもスクリーンショットの添付に対応していない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "ReportPortal là hệ thống server-side theo thời gian thực, có machine learning gợi ý phân loại lỗi tự động và dashboard live; Allure thường dùng để sinh report tĩnh (HTML) sau khi test hoàn tất, nhẹ và dễ tích hợp CI hơn.",
      "en": "ReportPortal is a real-time, server-side system with machine-learning-assisted defect classification and live dashboards, whereas Allure is typically used to produce a lightweight static HTML report after tests finish, making it simpler to integrate into CI.",
      "ja": "ReportPortalは機械学習による欠陥自動分類やライブダッシュボードを備えたリアルタイムのサーバーサイドシステムであるのに対し、Allureは通常テスト完了後に軽量な静的HTMLレポートを生成するために使われ、CIへの統合が容易です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi thiết kế cơ chế chụp ảnh fail cho một framework hybrid (Selenium + Appium), điều cần lưu ý đặc biệt là gì?",
      "en": "When designing a failure-screenshot mechanism for a hybrid framework (Selenium + Appium), what needs special attention?",
      "ja": "ハイブリッドフレームワーク（Selenium＋Appium）向けに失敗時スクリーンショット機構を設計する際、特に注意すべき点は何ですか。"
    },
    "options": [
      {
        "vi": "Không cần quan tâm vì mọi driver đều dùng chung một API chụp ảnh giống hệt nhau",
        "en": "No special consideration is needed since all drivers share an identical screenshot API",
        "ja": "全ドライバーが全く同じスクリーンショットAPIを共有しているため特別な配慮は不要である"
      },
      {
        "vi": "Cần trừu tượng hóa (abstraction) logic chụp ảnh vì API lấy screenshot của WebDriver (web) và AppiumDriver (mobile) khác nhau, tránh lặp code cho từng nền tảng",
        "en": "The screenshot logic should be abstracted since the screenshot-capture APIs of WebDriver (web) and AppiumDriver (mobile) differ, avoiding duplicated per-platform code",
        "ja": "WebDriver（Web）とAppiumDriver（モバイル）のスクリーンショット取得APIが異なるため、ロジックを抽象化しプラットフォームごとのコード重複を避ける必要がある"
      },
      {
        "vi": "Chỉ cần chụp ảnh cho web, còn mobile không bao giờ cần vì không hỗ trợ kỹ thuật",
        "en": "Only web needs screenshots; mobile never needs it because it is not technically supported",
        "ja": "Webのみスクリーンショットが必要で、モバイルは技術的にサポートされないため常に不要である"
      },
      {
        "vi": "Ảnh chụp trên mobile luôn có chất lượng thấp hơn nên không nên đính kèm vào report",
        "en": "Mobile screenshots always have lower quality, so they should never be attached to the report",
        "ja": "モバイルのスクリーンショットは常に画質が低いためレポートに添付すべきではない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "WebDriver và AppiumDriver đều implement TakesScreenshot nhưng ngữ cảnh khác nhau (viewport web vs màn hình thiết bị thật/emulator); nên viết một lớp interface/wrapper chung để lấy driver hiện tại và gọi getScreenshotAs() thống nhất, tránh code trùng lặp theo từng loại driver.",
      "en": "Both WebDriver and AppiumDriver implement TakesScreenshot but in different contexts (web viewport vs. real device/emulator screen); a shared interface/wrapper should be built to fetch the current driver and call getScreenshotAs() consistently, avoiding duplicated per-driver code.",
      "ja": "WebDriverとAppiumDriverはいずれもTakesScreenshotを実装していますが、コンテキストが異なります（Webビューポート対実機・エミュレータ画面）。共通のインターフェース・ラッパーを作り、現在のドライバーを取得して統一的にgetScreenshotAs()を呼び出すことで、ドライバーごとのコード重複を避けるべきです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong desired capabilities của Appium, capability \"platformName\" dùng để làm gì?",
      "en": "In Appium desired capabilities, what is the purpose of the \"platformName\" capability?",
      "ja": "AppiumのDesired Capabilitiesにおいて、\"platformName\"キャパビリティの役割は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ định thư mục lưu log kết quả test",
        "en": "Specifies the folder to store test log results",
        "ja": "テスト結果ログを保存するフォルダを指定する"
      },
      {
        "vi": "Chỉ định phiên bản trình duyệt dùng để test web",
        "en": "Specifies the browser version used for web testing",
        "ja": "Web テストに使用するブラウザのバージョンを指定する"
      },
      {
        "vi": "Chỉ định hệ điều hành di động mục tiêu (Android/iOS) để Appium chọn driver phù hợp",
        "en": "Specifies the target mobile OS (Android/iOS) so Appium selects the appropriate driver",
        "ja": "対象となるモバイルOS(Android/iOS)を指定し、Appiumが適切なドライバーを選択できるようにする"
      },
      {
        "vi": "Chỉ định tốc độ mạng giả lập khi test",
        "en": "Specifies the simulated network speed during testing",
        "ja": "テスト時のシミュレートされたネットワーク速度を指定する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "platformName báo cho Appium server biết nền tảng (Android hay iOS) để chọn automation engine tương ứng (UiAutomator2, XCUITest...).",
      "en": "platformName tells the Appium server which platform (Android or iOS) is targeted so it can route to the correct automation engine (UiAutomator2, XCUITest, etc.).",
      "ja": "platformNameはAppiumサーバーに対象プラットフォーム(AndroidまたはiOS)を伝え、対応する自動化エンジン(UiAutomator2、XCUITestなど)を選択させる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Capability \"automationName\" với giá trị \"UiAutomator2\" thường được dùng khi test trên nền tảng nào?",
      "en": "The \"automationName\" capability set to \"UiAutomator2\" is typically used when testing on which platform?",
      "ja": "\"automationName\"キャパビリティを\"UiAutomator2\"に設定するのは、通常どのプラットフォームをテストする場合ですか?"
    },
    "options": [
      {
        "vi": "iOS",
        "en": "iOS",
        "ja": "iOS"
      },
      {
        "vi": "macOS",
        "en": "macOS",
        "ja": "macOS"
      },
      {
        "vi": "Windows Desktop",
        "en": "Windows Desktop",
        "ja": "Windowsデスクトップ"
      },
      {
        "vi": "Android",
        "en": "Android",
        "ja": "Android"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "UiAutomator2 là driver mặc định của Appium để điều khiển ứng dụng Android hiện đại.",
      "en": "UiAutomator2 is Appium's default driver for automating modern Android applications.",
      "ja": "UiAutomator2は、最新のAndroidアプリケーションを自動化するためのAppiumの標準ドライバーである。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trong desired capabilities, capability \"app\" thường trỏ tới đâu?",
      "en": "In desired capabilities, what does the \"app\" capability typically point to?",
      "ja": "Desired Capabilitiesにおいて、\"app\"キャパビリティは通常何を指しますか?"
    },
    "options": [
      {
        "vi": "Đường dẫn hoặc URL tới file cài đặt ứng dụng (.apk/.ipa) cần cài và mở khi bắt đầu phiên",
        "en": "A path or URL to the app installer file (.apk/.ipa) to install and launch at session start",
        "ja": "セッション開始時にインストールして起動すべきアプリのインストーラーファイル(.apk/.ipa)へのパスまたはURL"
      },
      {
        "vi": "Tên gói ứng dụng đã cài sẵn trên thiết bị",
        "en": "The package name of an app already installed on the device",
        "ja": "デバイスに既にインストールされているアプリのパッケージ名"
      },
      {
        "vi": "URL trang web cần mở",
        "en": "The URL of the web page to open",
        "ja": "開くべきWebページのURL"
      },
      {
        "vi": "Tên tài khoản đăng nhập vào ứng dụng",
        "en": "The login account name used inside the app",
        "ja": "アプリ内で使用するログインアカウント名"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Capability \"app\" chỉ định đường dẫn/URL tới file .apk (Android) hoặc .ipa/.app (iOS) để Appium cài đặt và khởi chạy ứng dụng khi tạo phiên mới.",
      "en": "The \"app\" capability specifies a path or URL to the .apk (Android) or .ipa/.app (iOS) file for Appium to install and launch when a new session starts.",
      "ja": "\"app\"キャパビリティは、新しいセッション開始時にAppiumがインストールして起動する.apk(Android)または.ipa/.app(iOS)ファイルへのパスやURLを指定する。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Sự khác biệt chính giữa \"noReset\" và \"fullReset\" trong Appium là gì?",
      "en": "What is the main difference between \"noReset\" and \"fullReset\" in Appium?",
      "ja": "Appiumにおける\"noReset\"と\"fullReset\"の主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "noReset xóa và cài lại app mỗi phiên, fullReset giữ nguyên dữ liệu app",
        "en": "noReset uninstalls and reinstalls the app every session, fullReset keeps app data intact",
        "ja": "noResetは毎セッションでアプリをアンインストール・再インストールし、fullResetはアプリデータをそのまま保持する"
      },
      {
        "vi": "noReset giữ trạng thái/dữ liệu app giữa các phiên, fullReset xóa dữ liệu app và cài lại từ đầu",
        "en": "noReset preserves app state/data between sessions, fullReset clears app data and reinstalls from scratch",
        "ja": "noResetはセッション間でアプリの状態・データを保持し、fullResetはアプリデータを消去して最初から再インストールする"
      },
      {
        "vi": "Cả hai đều chỉ áp dụng cho trình duyệt, không áp dụng cho app native",
        "en": "Both only apply to browsers, not native apps",
        "ja": "両方ともブラウザにのみ適用され、ネイティブアプリには適用されない"
      },
      {
        "vi": "noReset và fullReset chỉ khác nhau ở tốc độ khởi động thiết bị giả lập",
        "en": "noReset and fullReset only differ in emulator boot speed",
        "ja": "noResetとfullResetの違いはエミュレーターの起動速度のみである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "noReset=true giữ nguyên dữ liệu app giữa các phiên test (không xóa cache/login), còn fullReset=true sẽ gỡ cài đặt và cài lại app, xóa sạch dữ liệu, đảm bảo trạng thái sạch nhưng chậm hơn.",
      "en": "noReset=true preserves app data between test sessions (keeps cache/login), while fullReset=true uninstalls and reinstalls the app, wiping data for a clean state but at the cost of speed.",
      "ja": "noReset=trueはテストセッション間でアプリデータ(キャッシュ・ログイン状態)を保持し、fullReset=trueはアプリをアンインストール・再インストールしてデータを消去し、クリーンな状態を保証するが速度は遅くなる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Capability \"udid\" trong Appium được dùng để làm gì?",
      "en": "What is the \"udid\" capability used for in Appium?",
      "ja": "Appiumにおける\"udid\"キャパビリティは何のために使用されますか?"
    },
    "options": [
      {
        "vi": "Xác định phiên bản hệ điều hành cần cài trên thiết bị",
        "en": "Specifies the OS version to install on the device",
        "ja": "デバイスにインストールすべきOSバージョンを指定する"
      },
      {
        "vi": "Xác định tên gói của ứng dụng cần test",
        "en": "Specifies the package name of the app under test",
        "ja": "テスト対象アプリのパッケージ名を指定する"
      },
      {
        "vi": "Xác định định danh duy nhất của thiết bị thật cụ thể để Appium kết nối đúng thiết bị đó",
        "en": "Specifies the unique identifier of a specific physical device so Appium connects to exactly that device",
        "ja": "Appiumが正確にその特定デバイスに接続できるよう、特定の実機の一意な識別子を指定する"
      },
      {
        "vi": "Xác định độ phân giải màn hình mong muốn",
        "en": "Specifies the desired screen resolution",
        "ja": "希望する画面解像度を指定する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "udid (Unique Device Identifier) giúp Appium chọn đúng thiết bị vật lý khi có nhiều thiết bị/giả lập kết nối cùng lúc, đặc biệt quan trọng khi chạy test song song trên nhiều real device.",
      "en": "udid (Unique Device Identifier) lets Appium select the exact physical device when multiple devices/emulators are connected at once, which matters for parallel testing on real devices.",
      "ja": "udid(一意のデバイス識別子)は、複数のデバイス/エミュレーターが同時に接続されている場合に、Appiumが正確な実機を選択できるようにするもので、実機での並列テストにおいて特に重要である。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Về mặt kiến trúc, Appium server đóng vai trò gì khi điều khiển ứng dụng di động?",
      "en": "Architecturally, what role does the Appium server play when driving a mobile app?",
      "ja": "アーキテクチャ上、Appiumサーバーはモバイルアプリを操作する際にどのような役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Là trình duyệt web giả lập chạy trực tiếp trên máy tính client",
        "en": "It is an emulated web browser running directly on the client machine",
        "ja": "クライアントマシン上で直接実行されるエミュレートされたWebブラウザである"
      },
      {
        "vi": "Là thư viện chỉ dùng để chụp ảnh màn hình thiết bị",
        "en": "It is a library only used to capture device screenshots",
        "ja": "デバイスのスクリーンショットを撮影するためだけのライブラリである"
      },
      {
        "vi": "Là công cụ biên dịch mã nguồn ứng dụng thành file cài đặt",
        "en": "It is a tool that compiles app source code into installer files",
        "ja": "アプリのソースコードをインストーラーファイルにコンパイルするツールである"
      },
      {
        "vi": "Là proxy chuyển tiếp lệnh WebDriver protocol tới automation engine gốc của nền tảng (UiAutomator2/XCUITest)",
        "en": "It acts as a proxy that forwards WebDriver protocol commands to the platform's native automation engine (UiAutomator2/XCUITest)",
        "ja": "WebDriverプロトコルのコマンドをプラットフォームのネイティブ自動化エンジン(UiAutomator2/XCUITest)へ転送するプロキシとして機能する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Appium hoạt động theo mô hình client-server: client gửi lệnh theo chuẩn WebDriver protocol, Appium server nhận và chuyển tiếp (proxy) tới engine automation gốc của từng nền tảng để thực thi.",
      "en": "Appium follows a client-server model: the client sends WebDriver protocol commands, and the Appium server receives and proxies them to the platform's native automation engine for execution.",
      "ja": "Appiumはクライアント・サーバーモデルで動作する。クライアントがWebDriverプロトコルに準拠したコマンドを送信し、Appiumサーバーがそれを受け取り、各プラットフォームのネイティブ自動化エンジンへプロキシして実行させる。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Vì sao locator \"accessibility id\" thường được ưu tiên khi automation mobile app?",
      "en": "Why is the \"accessibility id\" locator typically preferred in mobile app automation?",
      "ja": "モバイルアプリの自動化において、\"accessibility id\"ロケーターが一般的に推奨されるのはなぜですか?"
    },
    "options": [
      {
        "vi": "Vì nó hoạt động giống nhau trên cả Android và iOS, và ổn định vì gắn với thuộc tính hỗ trợ tiếp cận do dev đặt cố định",
        "en": "Because it works consistently on both Android and iOS, and is stable since it maps to a fixed accessibility attribute set by developers",
        "ja": "AndroidとiOSの両方で一貫して動作し、開発者が設定した固定のアクセシビリティ属性に紐づくため安定しているから"
      },
      {
        "vi": "Vì nó chỉ hoạt động khi ứng dụng đang chạy trên trình giả lập",
        "en": "Because it only works when the app is running on an emulator",
        "ja": "エミュレーター上でアプリを実行している場合のみ機能するから"
      },
      {
        "vi": "Vì nó có tốc độ chậm hơn nhưng chính xác tuyệt đối 100% trong mọi trường hợp",
        "en": "Because it is slower but 100% accurate in all cases",
        "ja": "動作は遅いが、あらゆる場合において100%正確だから"
      },
      {
        "vi": "Vì nó tự động sinh ra ngẫu nhiên mỗi lần build app",
        "en": "Because it is randomly auto-generated on every app build",
        "ja": "アプリをビルドするたびにランダムに自動生成されるから"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "accessibility id ánh xạ tới content-desc (Android) hoặc accessibilityIdentifier (iOS) — thuộc tính do lập trình viên gán cố định cho mục đích hỗ trợ tiếp cận, nên locator này nhất quán trên cả hai nền tảng và ít bị ảnh hưởng khi thay đổi giao diện.",
      "en": "accessibility id maps to content-desc (Android) or accessibilityIdentifier (iOS) — attributes developers set deliberately for accessibility, making this locator consistent across platforms and resilient to UI changes.",
      "ja": "accessibility idはcontent-desc(Android)またはaccessibilityIdentifier(iOS)にマッピングされる。これは開発者がアクセシビリティ目的で意図的に設定する属性であるため、両プラットフォームで一貫しており、UIの変更に強い。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Trên iOS, chiến lược locator \"predicate string\" cho phép làm gì mà XPath không tối ưu bằng?",
      "en": "On iOS, what does the \"predicate string\" locator strategy allow that XPath does not do as well?",
      "ja": "iOSにおいて、\"predicate string\"ロケーター戦略はXPathほど得意でない何を可能にしますか?"
    },
    "options": [
      {
        "vi": "Chạy test trên trình duyệt Safari mà không cần thiết bị thật",
        "en": "Run tests in Safari browser without a real device",
        "ja": "実機なしでSafariブラウザでテストを実行できる"
      },
      {
        "vi": "Truy vấn phần tử dựa trên thuộc tính native (type, name, label, value) trực tiếp qua engine XCUITest, nhanh hơn vì không cần duyệt cây XML",
        "en": "Querying elements by native attributes (type, name, label, value) directly via the XCUITest engine, faster since it avoids parsing an XML tree",
        "ja": "XMLツリーの解析を必要とせず、XCUITestエンジンを通じてネイティブ属性(type、name、label、value)で直接要素をクエリでき、より高速である"
      },
      {
        "vi": "Tự động dịch giao diện ứng dụng sang ngôn ngữ khác khi test",
        "en": "Automatically translate the app UI to another language during testing",
        "ja": "テスト中にアプリのUIを自動的に他の言語に翻訳する"
      },
      {
        "vi": "Ghi lại video màn hình trong suốt quá trình chạy test",
        "en": "Record a screen video throughout the test run",
        "ja": "テスト実行中の画面録画を行う"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "predicate string (NSPredicate) là cú pháp truy vấn native của XCUITest, cho phép tìm phần tử theo thuộc tính trực tiếp mà không cần dựng và duyệt cây XML như XPath, nên nhanh và ổn định hơn trên iOS.",
      "en": "Predicate string (NSPredicate) is XCUITest's native query syntax, allowing element lookup by attributes without building and traversing an XML tree like XPath, making it faster and more stable on iOS.",
      "ja": "Predicate string(NSPredicate)はXCUITestのネイティブクエリ構文であり、XPathのようにXMLツリーを構築・走査することなく属性で要素を検索できるため、iOSではより高速で安定している。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Locator \"class chain\" trên iOS trong Appium có đặc điểm gì?",
      "en": "What characterizes the \"class chain\" locator on iOS in Appium?",
      "ja": "AppiumにおけるiOSの\"class chain\"ロケーターの特徴は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ hoạt động với ứng dụng hybrid có WebView",
        "en": "It only works with hybrid apps containing a WebView",
        "ja": "WebViewを含むハイブリッドアプリでのみ機能する"
      },
      {
        "vi": "Chỉ dùng được khi ứng dụng chạy trên Android Emulator",
        "en": "It can only be used when the app runs on an Android Emulator",
        "ja": "アプリがAndroidエミュレーターで実行されている場合のみ使用できる"
      },
      {
        "vi": "Là cú pháp riêng của XCUITest cho phép chỉ định đường dẫn phân cấp phần tử tương tự XPath rút gọn nhưng thực thi nhanh hơn vì xử lý trực tiếp trên tiến trình XCUITest",
        "en": "It is an XCUITest-specific syntax allowing a hierarchical element path similar to a shortened XPath, but executes faster since it runs directly within the XCUITest process",
        "ja": "短縮されたXPathに似た階層的な要素パスを指定できるXCUITest独自の構文だが、XCUITestプロセス内で直接処理されるため実行が高速である"
      },
      {
        "vi": "Là locator dùng để xác định phiên bản hệ điều hành iOS",
        "en": "It is a locator used to identify the iOS version",
        "ja": "iOSのバージョンを識別するために使用されるロケーターである"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "class chain là cú pháp đặc trưng của XCUITest cho phép mô tả đường dẫn phân cấp phần tử (giống XPath rút gọn) nhưng được XCUITest xử lý native, nên hiệu năng tốt hơn XPath truyền thống trên iOS.",
      "en": "Class chain is an XCUITest-specific syntax describing a hierarchical element path (like a shortened XPath) but processed natively by XCUITest, giving better performance than traditional XPath on iOS.",
      "ja": "class chainはXCUITest固有の構文で、階層的な要素パス(短縮XPathのようなもの)を記述できるが、XCUITestによってネイティブに処理されるため、iOSでは従来のXPathよりパフォーマンスが優れている。"
    }
  }
];
