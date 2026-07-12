// ============================================================================
// INTERVIEW12 — Playwright bổ sung (đạt 400) — 305 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":77,"1":76,"2":76,"3":76}
// ============================================================================
export const DATA = [
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi một nút bấm chỉ có icon SVG, không có text hiển thị, cách nào là best practice để locator vẫn truy cập được theo vai trò (role) một cách có ý nghĩa?",
      "en": "When a button only contains an SVG icon with no visible text, what is the best practice so that a role-based locator remains meaningful?",
      "ja": "ボタンがSVGアイコンのみでテキストが表示されない場合、ロールベースのロケーターを意味のあるものにするベストプラクティスは何ですか。"
    },
    "options": [
      {
        "vi": "Thêm thuộc tính aria-label mô tả chức năng nút rồi dùng getByRole('button', { name: ... })",
        "en": "Add an aria-label describing the button's function, then use getByRole('button', { name: ... })",
        "ja": "ボタンの機能を説明するaria-labelを追加し、getByRole('button', { name: ... }) を使用する"
      },
      {
        "vi": "Dùng getByText với nội dung rỗng",
        "en": "Use getByText with an empty string",
        "ja": "空文字列でgetByTextを使用する"
      },
      {
        "vi": "Chuyển sang dùng page.locator('svg') trực tiếp",
        "en": "Switch to using page.locator('svg') directly",
        "ja": "直接page.locator('svg')を使用する"
      },
      {
        "vi": "Bỏ qua kiểm thử nút đó vì không thể locator theo role",
        "en": "Skip testing that button since it cannot be located by role",
        "ja": "ロールで特定できないため、そのボタンのテストを省略する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "aria-label cung cấp accessible name cho phần tử không có text hiển thị, giúp getByRole tìm đúng và đồng thời cải thiện khả năng truy cập của ứng dụng.",
      "en": "An aria-label supplies the accessible name for elements with no visible text, letting getByRole find it correctly while also improving app accessibility.",
      "ja": "aria-labelは表示テキストのない要素にアクセシブルネームを与え、getByRoleが正しく要素を見つけられるようにすると同時にアプリのアクセシビリティも向上させます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, getByTestId() mặc định tìm phần tử dựa trên thuộc tính HTML nào?",
      "en": "By default, what HTML attribute does Playwright's getByTestId() look for?",
      "ja": "Playwrightのgetカスタムテスト属性getByTestId()は、デフォルトでどのHTML属性を検索しますか。"
    },
    "options": [
      {
        "vi": "id",
        "en": "id",
        "ja": "id"
      },
      {
        "vi": "data-testid",
        "en": "data-testid",
        "ja": "data-testid"
      },
      {
        "vi": "name",
        "en": "name",
        "ja": "name"
      },
      {
        "vi": "class",
        "en": "class",
        "ja": "class"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mặc định Playwright cấu hình testIdAttribute là data-testid; có thể đổi qua playwright.config bằng testIdAttribute nếu dự án dùng attribute khác.",
      "en": "By default Playwright's testIdAttribute is data-testid; it can be changed via testIdAttribute in playwright.config if the project uses a different attribute.",
      "ja": "Playwrightのデフォルトのtestthingtestidattributeはdata-testidですが、プロジェクトが別の属性を使う場合はplaywright.configのtestIdAttributeで変更できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một form đăng nhập có input với thẻ <label for=\"email\">Email</label> liên kết đúng chuẩn. Locator nào được khuyến nghị nhất để chọn ô nhập này?",
      "en": "A login form has an input correctly linked via <label for=\"email\">Email</label>. Which locator is most recommended to select this field?",
      "ja": "ログインフォームに<label for=\"email\">Email</label>で正しく紐付けられた入力欄があります。この欄を選択するのに最も推奨されるロケーターはどれですか。"
    },
    "options": [
      {
        "vi": "page.locator('#email')",
        "en": "page.locator('#email')",
        "ja": "page.locator('#email')"
      },
      {
        "vi": "page.getByPlaceholder('Email')",
        "en": "page.getByPlaceholder('Email')",
        "ja": "page.getByPlaceholder('Email')"
      },
      {
        "vi": "page.getByLabel('Email')",
        "en": "page.getByLabel('Email')",
        "ja": "page.getByLabel('Email')"
      },
      {
        "vi": "page.locator('input[type=\"email\"]')",
        "en": "page.locator('input[type=\"email\"]')",
        "ja": "page.locator('input[type=\"email\"]')"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "getByLabel mô phỏng cách người dùng nhận diện trường qua nhãn liên kết, ổn định hơn so với id hay selector CSS vốn dễ đổi khi refactor.",
      "en": "getByLabel mirrors how users identify a field via its associated label, and is more resilient than an id or CSS selector that can change during refactors.",
      "ja": "getByLabelは関連付けられたラベルを通じてユーザーがフィールドを識別する方法を模倣し、リファクタリングで変わりやすいidやCSSセレクターより安定しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trang có hai nút cùng chữ \"Submit\" nhưng thuộc hai form khác nhau (form đăng ký và form phản hồi). Cách tốt nhất để phân biệt chúng khi viết locator là gì?",
      "en": "A page has two buttons with the same \"Submit\" text belonging to two different forms (registration and feedback). What is the best way to distinguish them in a locator?",
      "ja": "ページに同じ「Submit」というテキストを持つが異なる2つのフォーム(登録フォームとフィードバックフォーム)に属するボタンがあります。ロケーターでそれらを区別する最良の方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng page.getByRole('button', { name: 'Submit' }).first() và .last() theo thứ tự DOM",
        "en": "Use page.getByRole('button', { name: 'Submit' }).first() and .last() based on DOM order",
        "ja": "DOM順序に基づきpage.getByRole('button', { name: 'Submit' }).first()と.last()を使う"
      },
      {
        "vi": "Chỉ dùng page.click('text=Submit') vì Playwright tự chọn đúng phần tử",
        "en": "Just use page.click('text=Submit') since Playwright automatically picks the right element",
        "ja": "Playwrightが自動的に正しい要素を選ぶのでpage.click('text=Submit')だけを使う"
      },
      {
        "vi": "Dùng CSS nth-child(1) và nth-child(2)",
        "en": "Use CSS nth-child(1) and nth-child(2)",
        "ja": "CSSのnth-child(1)とnth-child(2)を使う"
      },
      {
        "vi": "Scope locator bằng cách chain từ container cha, ví dụ page.getByTestId('register-form').getByRole('button', { name: 'Submit' })",
        "en": "Scope the locator by chaining from a parent container, e.g. page.getByTestId('register-form').getByRole('button', { name: 'Submit' })",
        "ja": "page.getByTestId('register-form').getByRole('button', { name: 'Submit' })のように親コンテナからチェーンしてロケーターをスコープする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Scope locator theo container cha (form, section, testid) giúp locator tường minh về ngữ cảnh và ổn định hơn nhiều so với dựa vào thứ tự DOM dễ đổi.",
      "en": "Scoping the locator to a parent container (form, section, testid) makes intent explicit and is far more stable than relying on DOM order which can change.",
      "ja": "親コンテナ(フォーム、セクション、testid)にロケーターをスコープすることで意図が明確になり、変わりやすいDOM順序に依存するより遥かに安定します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "getByText('Đăng nhập') và getByText('Đăng nhập', { exact: true }) khác nhau ở điểm nào?",
      "en": "What is the difference between getByText('Login') and getByText('Login', { exact: true })?",
      "ja": "getByText('Login')とgetByText('Login', { exact: true })の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Bản không có exact sẽ match cả các chuỗi con và không phân biệt khoảng trắng thừa/hoa-thường một phần, còn exact:true yêu cầu khớp chính xác toàn bộ text (kể cả hoa thường)",
        "en": "Without exact it matches substrings and is more lenient with whitespace, while exact:true requires matching the whole text precisely (case-sensitive)",
        "ja": "exactなしの場合は部分文字列にもマッチし空白にも寛容だが、exact:trueは大文字小文字も含めテキスト全体の完全一致を要求する"
      },
      {
        "vi": "Không có khác biệt, cả hai đều match chính xác toàn bộ chuỗi",
        "en": "There is no difference; both match the full string exactly",
        "ja": "違いはなく、どちらも文字列全体を完全一致でマッチする"
      },
      {
        "vi": "exact:true khiến locator chỉ tìm trong thẻ input",
        "en": "exact:true makes the locator search only within input elements",
        "ja": "exact:trueはロケーターをinput要素内のみ検索するようにする"
      },
      {
        "vi": "exact:true bỏ qua hoàn toàn nội dung text và chỉ so khớp theo role",
        "en": "exact:true ignores text content entirely and matches only by role",
        "ja": "exact:trueはテキスト内容を完全に無視しロールのみで一致させる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mặc định getByText match theo substring (chuẩn hoá khoảng trắng), trong khi exact:true yêu cầu chuỗi khớp hoàn toàn kể cả phân biệt hoa thường, tránh match nhầm các đoạn text chứa cụm từ tương tự.",
      "en": "By default getByText matches substrings (with whitespace normalization), whereas exact:true requires a full, case-sensitive match, avoiding false matches on text containing similar phrases.",
      "ja": "デフォルトのgetByTextは部分文字列にマッチします(空白は正規化)が、exact:trueは大文字小文字を区別した完全一致を要求し、似たフレーズを含むテキストへの誤マッチを防ぎます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao Playwright khuyến nghị ưu tiên locator theo role/label/text hơn là CSS selector dựa trên class như '.btn-primary-v2'?",
      "en": "Why does Playwright recommend prioritizing role/label/text locators over CSS class-based selectors like '.btn-primary-v2'?",
      "ja": "Playwrightがrole/label/textロケーターを'.btn-primary-v2'のようなCSSクラスベースのセレクターより優先することを推奨するのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì class selector chạy chậm hơn đáng kể so với role selector",
        "en": "Because class selectors run significantly slower than role selectors",
        "ja": "クラスセレクターはロールセレクターより実行速度が著しく遅いため"
      },
      {
        "vi": "Vì tên class thường thay đổi theo styling/refactor UI trong khi role/label/text phản ánh cách người dùng thực sự tương tác, giúp test bền vững hơn",
        "en": "Because class names often change with styling/UI refactors, while role/label/text reflect how real users interact, making tests more resilient",
        "ja": "クラス名はスタイリングやUIリファクタリングでよく変わるが、role/label/textは実際のユーザーの操作方法を反映しテストがより堅牢になるため"
      },
      {
        "vi": "Vì CSS selector không được Playwright hỗ trợ đầy đủ",
        "en": "Because CSS selectors are not fully supported by Playwright",
        "ja": "CSSセレクターはPlaywrightで完全にはサポートされていないため"
      },
      {
        "vi": "Vì role selector luôn trả về đúng 1 phần tử duy nhất còn class thì không",
        "en": "Because role selectors always return exactly one element while class selectors do not",
        "ja": "ロールセレクターは常にちょうど1つの要素を返すがクラスセレクターはそうではないため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Locator theo user-facing attribute (role, label, text) gắn với hành vi/ngữ nghĩa mà người dùng thấy được, ít bị ảnh hưởng khi đổi CSS/refactor, nên test ổn định lâu dài hơn.",
      "en": "User-facing locators (role, label, text) are tied to semantics users actually perceive, so they survive CSS/refactor changes better, making tests more durable over time.",
      "ja": "ユーザー向けロケーター(role、label、text)はユーザーが実際に認識するセマンティクスに結び付いているため、CSS変更やリファクタリングの影響を受けにくく、長期的にテストがより安定します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đoạn code: await page.getByRole('checkbox', { checked: true }).count() dùng để làm gì?",
      "en": "What does the code await page.getByRole('checkbox', { checked: true }).count() do?",
      "ja": "コードawait page.getByRole('checkbox', { checked: true }).count()は何をしますか。"
    },
    "options": [
      {
        "vi": "Kiểm tra checkbox đầu tiên có tồn tại hay không",
        "en": "Check whether the first checkbox exists",
        "ja": "最初のチェックボックスが存在するかどうかを確認する"
      },
      {
        "vi": "Tick tất cả checkbox trên trang",
        "en": "Check all checkboxes on the page",
        "ja": "ページ上のすべてのチェックボックスをチェックする"
      },
      {
        "vi": "Đếm số checkbox đang ở trạng thái đã được tick (checked) trên trang",
        "en": "Count the number of checkboxes currently in the checked state on the page",
        "ja": "ページ上で現在チェック済み状態のチェックボックスの数を数える"
      },
      {
        "vi": "Xoá thuộc tính checked khỏi tất cả checkbox",
        "en": "Remove the checked attribute from all checkboxes",
        "ja": "すべてのチェックボックスからchecked属性を削除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Option checked trong getByRole cho phép lọc theo trạng thái checked của phần tử role checkbox/radio, kết hợp .count() để đếm số phần tử khớp điều kiện đó.",
      "en": "The checked option in getByRole filters elements with role checkbox/radio by their checked state, and .count() then counts how many elements match that condition.",
      "ja": "getByRoleのcheckedオプションはrole checkbox/radio要素をチェック状態でフィルタリングし、.count()でその条件に一致する要素数を数えます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi một bảng dữ liệu (table) hiển thị danh sách sản phẩm, cách locator nào phù hợp để lấy đúng hàng chứa sản phẩm tên \"Áo thun\" rồi click nút xoá trong hàng đó?",
      "en": "When a table displays a product list, which locator approach correctly gets the row containing product \"T-shirt\" and clicks the delete button in that row?",
      "ja": "テーブルに商品リストが表示されている場合、商品名「Tシャツ」を含む行を取得し、その行内の削除ボタンをクリックする正しいロケーターの方法はどれですか。"
    },
    "options": [
      {
        "vi": "page.getByRole('button', { name: 'Xoá' }).first().click()",
        "en": "page.getByRole('button', { name: 'Delete' }).first().click()",
        "ja": "page.getByRole('button', { name: '削除' }).first().click()"
      },
      {
        "vi": "page.getByText('Áo thun').click()",
        "en": "page.getByText('T-shirt').click()",
        "ja": "page.getByText('Tシャツ').click()"
      },
      {
        "vi": "page.locator('tr').nth(3).click()",
        "en": "page.locator('tr').nth(3).click()",
        "ja": "page.locator('tr').nth(3).click()"
      },
      {
        "vi": "page.getByRole('row', { name: 'Áo thun' }).getByRole('button', { name: 'Xoá' })",
        "en": "page.getByRole('row', { name: 'T-shirt' }).getByRole('button', { name: 'Delete' })",
        "ja": "page.getByRole('row', { name: 'Tシャツ' }).getByRole('button', { name: '削除' })"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "getByRole('row', { name }) tìm hàng chứa văn bản chỉ định trong phạm vi role row, sau đó chain tiếp getByRole('button') để scope chính xác nút xoá trong hàng đó, tránh nhầm giữa nhiều hàng.",
      "en": "getByRole('row', { name }) finds the row containing the specified text within the row role, then chaining getByRole('button') scopes precisely to the delete button in that row, avoiding confusion across multiple rows.",
      "ja": "getByRole('row', { name })はrowロール内で指定テキストを含む行を検索し、続けてgetByRole('button')をチェーンすることでその行内の削除ボタンに正確にスコープでき、複数行間の混同を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, khác biệt cốt lõi giữa Locator (ví dụ page.getByRole(...)) và ElementHandle là gì?",
      "en": "In Playwright, what is the core difference between a Locator (e.g., page.getByRole(...)) and an ElementHandle?",
      "ja": "PlaywrightにおいてLocator(例:page.getByRole(...))とElementHandleの本質的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Locator đại diện cho cách tìm phần tử và tự động tìm lại (re-query) mỗi lần thao tác, còn ElementHandle tham chiếu tới một node DOM cụ thể tại thời điểm lấy, có thể trở nên stale",
        "en": "A Locator represents a strategy to find an element and re-queries the DOM on every action, while an ElementHandle references a specific DOM node at the time it was obtained and can become stale",
        "ja": "Locatorは要素を見つける戦略を表し、操作のたびにDOMを再クエリするが、ElementHandleは取得時点の特定のDOMノードを参照し、stale(古く無効)になり得る"
      },
      {
        "vi": "Locator luôn nhanh hơn ElementHandle về tốc độ thực thi",
        "en": "Locator always executes faster than ElementHandle",
        "ja": "Locatorは常にElementHandleより実行速度が速い"
      },
      {
        "vi": "ElementHandle hỗ trợ auto-waiting còn Locator thì không",
        "en": "ElementHandle supports auto-waiting while Locator does not",
        "ja": "ElementHandleはauto-waitingをサポートするがLocatorはサポートしない"
      },
      {
        "vi": "Locator chỉ dùng được cho input, ElementHandle dùng được cho mọi phần tử",
        "en": "Locator can only be used for inputs, while ElementHandle can be used for any element",
        "ja": "Locatorはinputにのみ使用でき、ElementHandleはあらゆる要素に使用できる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Locator lazy và tự re-resolve DOM node mỗi hành động nên chịu được thay đổi DOM động, trong khi ElementHandle giữ tham chiếu cứng tới node, dễ bị stale khi DOM re-render — đây là lý do Playwright khuyến nghị dùng Locator.",
      "en": "Locator is lazy and re-resolves the DOM node on each action, so it tolerates dynamic DOM changes, whereas ElementHandle holds a fixed reference that can become stale when the DOM re-renders — this is why Playwright recommends Locator.",
      "ja": "Locatorは遅延評価で各操作時にDOMノードを再解決するため動的なDOM変化に耐えられますが、ElementHandleは固定参照を保持するためDOMが再レンダリングされるとstaleになりやすい—これがPlaywrightがLocatorを推奨する理由です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một dropdown tuỳ chỉnh (không dùng thẻ <select>) render bằng div có role=\"combobox\" và aria-expanded. Locator getByRole nào phù hợp để kiểm tra dropdown đang mở?",
      "en": "A custom dropdown (not a native <select>) renders as a div with role=\"combobox\" and aria-expanded. Which getByRole locator is appropriate to verify the dropdown is open?",
      "ja": "カスタムドロップダウン(ネイティブの<select>ではない)がrole=\"combobox\"とaria-expandedを持つdivとしてレンダリングされます。ドロップダウンが開いていることを検証するのに適切なgetByRoleロケーターはどれですか。"
    },
    "options": [
      {
        "vi": "page.getByRole('select').isOpen()",
        "en": "page.getByRole('select').isOpen()",
        "ja": "page.getByRole('select').isOpen()"
      },
      {
        "vi": "page.getByRole('combobox', { expanded: true })",
        "en": "page.getByRole('combobox', { expanded: true })",
        "ja": "page.getByRole('combobox', { expanded: true })"
      },
      {
        "vi": "page.getByRole('combobox').isVisible({ open: true })",
        "en": "page.getByRole('combobox').isVisible({ open: true })",
        "ja": "page.getByRole('combobox').isVisible({ open: true })"
      },
      {
        "vi": "page.locator('[aria-expanded]').first()",
        "en": "page.locator('[aria-expanded]').first()",
        "ja": "page.locator('[aria-expanded]').first()"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "getByRole hỗ trợ option expanded để lọc phần tử theo thuộc tính aria-expanded, phản ánh đúng trạng thái ARIA mà trình duyệt hỗ trợ công nghệ trợ năng nhận diện, không cần selector CSS thô.",
      "en": "getByRole supports the expanded option to filter elements by the aria-expanded attribute, correctly reflecting the ARIA state that assistive technologies perceive, without a raw CSS selector.",
      "ja": "getByRoleはexpandedオプションをサポートし、aria-expanded属性で要素をフィルタリングでき、生のCSSセレクターなしで支援技術が認識するARIA状態を正しく反映します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Best practice nào ĐÚNG khi viết locator cho một danh sách item động (item render lại liên tục do polling dữ liệu)?",
      "en": "Which best practice is CORRECT when writing a locator for a dynamic item list (items re-render frequently due to data polling)?",
      "ja": "データポーリングにより頻繁に再レンダリングされる動的なアイテムリストのロケーターを書く際に正しいベストプラクティスはどれですか。"
    },
    "options": [
      {
        "vi": "Lưu ElementHandle của item một lần rồi tái sử dụng cho các thao tác sau để tránh tìm lại DOM",
        "en": "Save the item's ElementHandle once and reuse it for later actions to avoid re-querying the DOM",
        "ja": "アイテムのElementHandleを一度保存し、DOMの再クエリを避けるため後続の操作で再利用する"
      },
      {
        "vi": "Tắt auto-waiting để tăng tốc độ chạy test",
        "en": "Disable auto-waiting to speed up test execution",
        "ja": "テスト実行を速くするためauto-waitingを無効にする"
      },
      {
        "vi": "Dùng Locator (không phải ElementHandle) vì nó tự re-query DOM mỗi lần thao tác, tránh lỗi stale element khi list re-render",
        "en": "Use a Locator (not an ElementHandle) since it re-queries the DOM on every action, avoiding stale element errors when the list re-renders",
        "ja": "Locator(ElementHandleではなく)を使用する。これは操作のたびにDOMを再クエリするため、リストが再レンダリングされてもstale element エラーを回避できる"
      },
      {
        "vi": "Luôn dùng page.waitForTimeout(5000) trước mỗi thao tác trên item để đảm bảo DOM ổn định",
        "en": "Always use page.waitForTimeout(5000) before every action on an item to ensure the DOM is stable",
        "ja": "DOMが安定していることを保証するため、アイテムへの各操作前に常にpage.waitForTimeout(5000)を使う"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Locator được thiết kế để re-resolve phần tử mỗi lần gọi hành động, phù hợp với UI động, tránh được lỗi stale reference thường gặp khi giữ tham chiếu cố định như ElementHandle.",
      "en": "Locator is designed to re-resolve the element on every action call, which suits dynamic UIs and avoids the stale-reference errors common when holding a fixed reference like ElementHandle.",
      "ja": "Locatorは操作を呼び出すたびに要素を再解決するよう設計されており、動的UIに適し、ElementHandleのような固定参照を保持することで生じがちなstale reference エラーを回避します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "getByRole('button', { name: /lưu/i }) sử dụng biểu thức chính quy cho tham số name nhằm mục đích gì?",
      "en": "What is the purpose of using a regular expression for the name parameter in getByRole('button', { name: /save/i })?",
      "ja": "getByRole('button', { name: /save/i })でname引数に正規表現を使う目的は何ですか。"
    },
    "options": [
      {
        "vi": "Bắt buộc phần tử phải có nhiều hơn một accessible name",
        "en": "To require the element to have more than one accessible name",
        "ja": "要素が複数のアクセシブルネームを持つことを強制するため"
      },
      {
        "vi": "Regex chỉ hoạt động với getByText, không hoạt động với getByRole",
        "en": "Regex only works with getByText, not getByRole",
        "ja": "正規表現はgetByTextでのみ機能し、getByRoleでは機能しない"
      },
      {
        "vi": "Regex khiến Playwright bỏ qua thuộc tính role hoàn toàn",
        "en": "The regex causes Playwright to ignore the role attribute entirely",
        "ja": "正規表現によりPlaywrightはrole属性を完全に無視する"
      },
      {
        "vi": "Cho phép match linh hoạt không phân biệt hoa/thường hoặc khớp một phần tên hiển thị, hữu ích khi text có thể thay đổi nhẹ (ví dụ \"Lưu\" hay \"LƯU\")",
        "en": "To allow flexible, case-insensitive or partial matching of the accessible name, useful when the displayed text may vary slightly (e.g., \"Save\" vs \"SAVE\")",
        "ja": "表示テキストがわずかに異なる場合(例:「Save」と「SAVE」)に有用な、アクセシブルネームの大文字小文字を区別しない柔軟な部分一致を可能にするため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tham số name của getByRole chấp nhận string hoặc RegExp; dùng regex với flag i giúp match không phân biệt hoa thường và linh hoạt hơn khi text hiển thị có biến thể nhỏ.",
      "en": "getByRole's name parameter accepts a string or RegExp; using regex with the i flag enables case-insensitive, more flexible matching when the displayed text has minor variations.",
      "ja": "getByRoleのname引数は文字列または正規表現を受け付けます。iフラグ付きの正規表現を使うことで、表示テキストにわずかな違いがある場合でも大文字小文字を区別しない柔軟なマッチングが可能になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao không nên dùng locator dựa trên cấu trúc XPath tuyệt đối kiểu \"/html/body/div[3]/div/div[2]/button\" trong test Playwright?",
      "en": "Why should absolute XPath locators like \"/html/body/div[3]/div/div[2]/button\" be avoided in Playwright tests?",
      "ja": "Playwrightのテストで\"/html/body/div[3]/div/div[2]/button\"のような絶対XPathロケーターを避けるべき理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì XPath tuyệt đối gắn chặt vào cấu trúc DOM hiện tại, chỉ cần thêm/bớt một div trong cây DOM là locator sẽ gãy, gây test giòn (flaky/brittle)",
        "en": "Because absolute XPath is tightly coupled to the current DOM structure — adding or removing one div anywhere in the tree breaks the locator, making tests brittle",
        "ja": "絶対XPathは現在のDOM構造に密結合しており、ツリー内のどこかにdivが1つ追加・削除されただけでロケーターが壊れ、テストが壊れやすく(flaky/brittle)なるため"
      },
      {
        "vi": "Vì Playwright không hỗ trợ cú pháp XPath",
        "en": "Because Playwright does not support XPath syntax",
        "ja": "PlaywrightはXPath構文をサポートしていないため"
      },
      {
        "vi": "Vì XPath tuyệt đối luôn chậm hơn CSS gấp 10 lần",
        "en": "Because absolute XPath is always 10 times slower than CSS",
        "ja": "絶対XPathは常にCSSより10倍遅いため"
      },
      {
        "vi": "Vì XPath tuyệt đối không tương thích với trình duyệt Chromium",
        "en": "Because absolute XPath is not compatible with the Chromium browser",
        "ja": "絶対XPathはChromiumブラウザと互換性がないため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "XPath tuyệt đối phụ thuộc hoàn toàn vào vị trí phân cấp DOM, cực kỳ dễ gãy khi UI thay đổi nhỏ; đây là lý do Playwright khuyến nghị locator ngữ nghĩa (role/label/text/testid) thay vì XPath vị trí.",
      "en": "Absolute XPath depends entirely on DOM hierarchy position and breaks extremely easily with minor UI changes; this is why Playwright recommends semantic locators (role/label/text/testid) over positional XPath.",
      "ja": "絶対XPathはDOM階層内の位置に完全に依存し、UIのわずかな変更で非常に壊れやすくなります。これが、Playwrightが位置ベースのXPathよりrole/label/text/testidのようなセマンティックロケーターを推奨する理由です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Component Testing hoặc trang có nhiều instance của cùng một component con lặp lại (ví dụ card sản phẩm), việc gắn data-testid có nên kèm giá trị động (ví dụ data-testid=\"product-card-123\") không?",
      "en": "In a page with many repeated instances of the same child component (e.g. product cards), should the data-testid include a dynamic value (e.g. data-testid=\"product-card-123\")?",
      "ja": "同じ子コンポーネントの複数インスタンスが繰り返されるページ(例:商品カード)で、data-testidに動的な値(例:data-testid=\"product-card-123\")を含めるべきですか。"
    },
    "options": [
      {
        "vi": "Không bao giờ, data-testid chỉ được dùng cho phần tử duy nhất trên toàn trang",
        "en": "Never — data-testid may only be used for elements that are unique across the whole page",
        "ja": "絶対にダメ。data-testidはページ全体で一意な要素にのみ使用できる"
      },
      {
        "vi": "Có, nên gắn ID sản phẩm cụ thể vào data-testid để locator luôn định danh đúng 1 phần tử duy nhất, kết hợp getByTestId để truy cập trực tiếp",
        "en": "Yes, embedding the specific product ID in the data-testid lets the locator always uniquely identify one element, and getByTestId can access it directly",
        "ja": "はい、data-testidに具体的な商品IDを埋め込むことで、ロケーターは常に一意の1要素を特定でき、getByTestIdで直接アクセスできる"
      },
      {
        "vi": "Không cần thiết, vì getByTestId luôn tự động chọn phần tử đầu tiên khớp mà không cần định danh riêng",
        "en": "Not necessary, since getByTestId always automatically picks the first matching element without needing a unique id",
        "ja": "必要ない。getByTestIdは常に一意な識別子なしで最初に一致した要素を自動的に選ぶため"
      },
      {
        "vi": "Chỉ nên làm vậy nếu component đó không có role ARIA nào",
        "en": "This should only be done if the component has no ARIA role at all",
        "ja": "そのコンポーネントにARIAロールが一切ない場合にのみそうすべきである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với danh sách item lặp có ID nghiệp vụ, nhúng ID vào data-testid (hoặc scope theo container rồi lọc theo text/role bên trong) giúp locator xác định chính xác 1 phần tử, tránh nhầm giữa các card giống hệt nhau.",
      "en": "For repeated list items with a business ID, embedding that ID in the data-testid (or scoping to the container and filtering inside by text/role) lets the locator target exactly one element and avoids mixing up identical cards.",
      "ja": "ビジネスIDを持つ繰り返しリストアイテムでは、そのIDをdata-testidに埋め込む(またはコンテナでスコープし内部をtext/roleでフィルタする)ことで、ロケーターが正確に1要素をターゲットでき、同一に見えるカード同士の混同を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "page.getByRole('link', { name: 'Xem thêm', exact: true }) sẽ KHÔNG khớp với link nào sau đây?",
      "en": "page.getByRole('link', { name: 'View more', exact: true }) will NOT match which of the following links?",
      "ja": "page.getByRole('link', { name: 'View more', exact: true })は次のうちどのリンクにマッチ<しない>ですか。"
    },
    "options": [
      {
        "vi": "<a href=\"#\">Xem thêm</a>",
        "en": "<a href=\"#\">View more</a>",
        "ja": "<a href=\"#\">View more</a>"
      },
      {
        "vi": "<a href=\"#\" aria-label=\"Xem thêm\"><span aria-hidden=\"true\">...</span></a>",
        "en": "<a href=\"#\" aria-label=\"View more\"><span aria-hidden=\"true\">...</span></a>",
        "ja": "<a href=\"#\" aria-label=\"View more\"><span aria-hidden=\"true\">...</span></a>"
      },
      {
        "vi": "<a href=\"#\">Xem thêm sản phẩm</a>",
        "en": "<a href=\"#\">View more products</a>",
        "ja": "<a href=\"#\">View more products</a>"
      },
      {
        "vi": "<a href=\"#\">  Xem thêm  </a> (có khoảng trắng thừa hai đầu)",
        "en": "<a href=\"#\">  View more  </a> (with extra leading/trailing whitespace)",
        "ja": "<a href=\"#\">  View more  </a>(前後に余分な空白あり)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Với exact:true, accessible name phải khớp chính xác toàn bộ chuỗi 'Xem thêm'; 'Xem thêm sản phẩm' có thêm text nên không khớp, trong khi khoảng trắng thừa được chuẩn hoá và aria-label vẫn tính là accessible name hợp lệ.",
      "en": "With exact:true the accessible name must match the full string 'View more' precisely; 'View more products' has extra text so it does not match, while extra whitespace is normalized and aria-label still counts as a valid accessible name.",
      "ja": "exact:trueでは、アクセシブルネームは文字列「View more」全体と正確に一致する必要があります。「View more products」は余分なテキストがあるため一致しませんが、余分な空白は正規化され、aria-labelも有効なアクセシブルネームとしてカウントされます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một modal xác nhận xoá xuất hiện với overlay, bên trong có nút \"Xác nhận\" trùng tên với nút \"Xác nhận\" khác nằm ẩn phía sau (display:none) trên trang chính. Playwright getByRole('button', { name: 'Xác nhận' }) sẽ ứng xử ra sao?",
      "en": "A delete-confirmation modal appears with an overlay, containing a \"Confirm\" button with the same name as another hidden (display:none) \"Confirm\" button behind it on the main page. How does Playwright's getByRole('button', { name: 'Confirm' }) behave?",
      "ja": "削除確認モーダルがオーバーレイとともに表示され、その中に同名の「Confirm」ボタンがあります。メインページの背後には別の非表示(display:none)の「Confirm」ボタンがあります。PlaywrightのgetクリックbyロールですgetByRole('button', { name: 'Confirm' })はどう動作しますか。"
    },
    "options": [
      {
        "vi": "Ném lỗi vì tìm thấy 2 phần tử khớp (strict mode violation)",
        "en": "It throws an error because two matching elements are found (strict mode violation)",
        "ja": "一致する要素が2つ見つかるためエラーをスローする(strict mode violation)"
      },
      {
        "vi": "Trả về undefined vì có xung đột tên",
        "en": "It returns undefined due to the name conflict",
        "ja": "名前の競合のためundefinedを返す"
      },
      {
        "vi": "Luôn chọn phần tử xuất hiện đầu tiên trong DOM bất kể hiển thị hay ẩn",
        "en": "It always picks the element appearing first in the DOM regardless of visibility",
        "ja": "表示・非表示に関わらず常にDOM内で最初に現れる要素を選ぶ"
      },
      {
        "vi": "Mặc định getByRole chỉ tính các phần tử accessible (visible/không display:none), nên chỉ nút trong modal được coi là khớp và không strict-mode-violate",
        "en": "By default getByRole only considers accessible elements (visible / not display:none), so only the modal's button counts as a match and there is no strict-mode violation",
        "ja": "デフォルトではgetByRoleはアクセシブルな要素(表示されている/display:noneでない)のみを対象とするため、モーダル内のボタンのみが一致とみなされ、strict mode violationは発生しない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Accessible name/role chỉ được tính toán cho phần tử mà accessibility tree hiển thị; phần tử display:none bị loại khỏi accessibility tree nên không được getByRole xem xét, tránh strict mode error không cần thiết.",
      "en": "Accessible name/role is only computed for elements exposed in the accessibility tree; display:none elements are excluded from it, so getByRole does not consider them, avoiding an unnecessary strict mode error.",
      "ja": "アクセシブルネーム/ロールはアクセシビリティツリーに公開されている要素に対してのみ計算されます。display:noneの要素はそこから除外されるため、getByRoleはそれを考慮せず、不要なstrict modeエラーを回避します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi cần lấy phần tử con thứ 2 trong danh sách kết quả mà thứ tự có thể thay đổi theo dữ liệu, cách tiếp cận nào tốt hơn dùng .nth(1) một cách mù quáng?",
      "en": "When needing the 2nd child in a result list whose order may change with data, what approach is better than blindly using .nth(1)?",
      "ja": "データによって順序が変わりうる結果リストの2番目の子要素を取得する必要がある場合、盲目的に.nth(1)を使うよりも良いアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Lọc bằng nội dung/thuộc tính nghiệp vụ đặc trưng (ví dụ filter theo tên sản phẩm hoặc data-testid chứa id) thay vì dựa vào vị trí index",
        "en": "Filter by a distinguishing business attribute or content (e.g. filter by product name or a data-testid containing the id) instead of relying on positional index",
        "ja": "位置インデックスに頼るのではなく、識別可能なビジネス属性やコンテンツ(例:商品名でフィルタ、またはidを含むdata-testid)でフィルタする"
      },
      {
        "vi": "Luôn dùng .nth(1) vì đây là cách Playwright khuyến nghị duy nhất",
        "en": "Always use .nth(1) since it is the only approach Playwright recommends",
        "ja": "Playwrightが唯一推奨する方法なので常に.nth(1)を使う"
      },
      {
        "vi": "Dùng page.waitForTimeout để đợi dữ liệu sắp xếp lại theo đúng thứ tự mong muốn",
        "en": "Use page.waitForTimeout to wait for the data to reorder into the expected sequence",
        "ja": "データが期待通りの順序に並び替わるのをpage.waitForTimeoutで待つ"
      },
      {
        "vi": "Bỏ qua việc kiểm thử các item không phải đầu tiên",
        "en": "Skip testing items that are not the first one",
        "ja": "最初以外のアイテムのテストは省略する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dựa vào index dễ gãy khi dữ liệu/thứ tự thay đổi; lọc theo thuộc tính nghiệp vụ ổn định (tên, id, testid) giúp locator đúng ý định kiểm thử và không phụ thuộc thứ tự hiển thị.",
      "en": "Relying on index is brittle when data/order changes; filtering by a stable business attribute (name, id, testid) keeps the locator aligned with test intent and independent of display order.",
      "ja": "インデックスに依存するとデータや順序が変わると壊れやすくなります。安定したビジネス属性(名前、id、testid)でフィルタすることで、ロケーターがテストの意図に沿ったものになり、表示順序に依存しなくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "getByLabel có thể tìm được input trong trường hợp nào ngoài <label for=\"id\">?",
      "en": "Besides <label for=\"id\">, in which other case can getByLabel find an input?",
      "ja": "<label for=\"id\">以外に、getByLabelがinputを見つけられるのはどのケースですか。"
    },
    "options": [
      {
        "vi": "Chỉ khi input có thuộc tính placeholder trùng với text nhãn",
        "en": "Only when the input's placeholder attribute matches the label text",
        "ja": "inputのplaceholder属性がラベルテキストと一致する場合のみ"
      },
      {
        "vi": "Khi input được lồng trực tiếp bên trong thẻ <label> (implicit label) hoặc input có aria-labelledby trỏ tới phần tử chứa text",
        "en": "When the input is nested directly inside a <label> tag (implicit label), or the input has aria-labelledby pointing to an element containing the text",
        "ja": "inputが<label>タグ内に直接ネストされている場合(暗黙的ラベル)、またはinputがテキストを含む要素を指すaria-labelledbyを持つ場合"
      },
      {
        "vi": "Chỉ khi label và input nằm trong cùng file CSS",
        "en": "Only when the label and input are defined in the same CSS file",
        "ja": "ラベルとinputが同じCSSファイル内に定義されている場合のみ"
      },
      {
        "vi": "getByLabel không bao giờ hoạt động nếu không có thuộc tính for/id",
        "en": "getByLabel never works without a for/id attribute",
        "ja": "for/id属性がなければgetByLabelは決して機能しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "getByLabel nhận diện cả label tường minh (for/id), label lồng ngầm định (input nằm trong <label>), và liên kết qua aria-labelledby — đều là các cách chuẩn để gán accessible name cho input.",
      "en": "getByLabel recognizes explicit labels (for/id), implicit nested labels (input inside <label>), and aria-labelledby associations — all standard ways to assign an accessible name to an input.",
      "ja": "getByLabelは明示的ラベル(for/id)、暗黙的なネストラベル(inputが<label>内にある)、およびaria-labelledbyによる関連付けを認識します。これらはすべてinputにアクセシブルネームを割り当てる標準的な方法です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, một test dùng getByText('Đã lưu') để verify toast thông báo đôi khi fail dù thao tác lưu thành công, do toast tự ẩn nhanh sau 1 giây. Cách khắc phục đúng đắn nhất về mặt locator/assertion là gì?",
      "en": "In CI, a test using getByText('Saved') to verify a toast notification sometimes fails even though the save action succeeded, because the toast auto-hides after 1 second. What is the most correct locator/assertion fix?",
      "ja": "CIでgetByText('Saved')を使ってトーストを検証するテストが、保存操作が成功しているにもかかわらず、トーストが1秒後に自動的に消えるため時々失敗します。ロケーター/アサーションの観点で最も正しい修正方法は何ですか。"
    },
    "options": [
      {
        "vi": "Thêm page.waitForTimeout(2000) trước khi thao tác lưu để \"chuẩn bị\" trang",
        "en": "Add page.waitForTimeout(2000) before the save action to \"prepare\" the page",
        "ja": "ページを「準備」するために保存操作前にpage.waitForTimeout(2000)を追加する"
      },
      {
        "vi": "Bỏ hẳn assertion vì toast là UI phụ không quan trọng",
        "en": "Remove the assertion entirely since the toast is a minor, unimportant UI",
        "ja": "トーストは重要でない補助UIなのでアサーションを完全に削除する"
      },
      {
        "vi": "Dùng await expect(page.getByText('Đã lưu')).toBeVisible() ngay sau hành động lưu để tận dụng auto-retrying assertion của Playwright, bắt kịp toast trước khi nó biến mất",
        "en": "Use await expect(page.getByText('Saved')).toBeVisible() immediately after the save action to leverage Playwright's auto-retrying assertion and catch the toast before it disappears",
        "ja": "保存操作の直後にawait expect(page.getByText('Saved')).toBeVisible()を使い、Playwrightの自動リトライアサーションを活用してトーストが消える前に捕捉する"
      },
      {
        "vi": "Tăng timeout mặc định toàn cục lên 60 giây để có đủ thời gian chờ",
        "en": "Increase the global default timeout to 60 seconds to have enough time to wait",
        "ja": "十分な待機時間を確保するためグローバルなデフォルトタイムアウトを60秒に増やす"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "expect(...).toBeVisible() là web-first assertion tự động retry cho đến khi điều kiện đúng hoặc hết timeout, nên gọi ngay sau hành động sẽ bắt được toast thoáng qua thay vì chờ cố định rồi mới kiểm tra khi toast đã biến mất.",
      "en": "expect(...).toBeVisible() is a web-first assertion that auto-retries until the condition holds or times out; calling it right after the action catches the brief toast instead of waiting a fixed time and checking after it's gone.",
      "ja": "expect(...).toBeVisible()は条件が満たされるかタイムアウトするまで自動リトライするweb-firstアサーションです。操作直後に呼び出すことで、固定時間待ってから確認しトーストが既に消えているという事態を避け、一瞬のトーストを捕捉できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Locator page.getByRole('textbox', { name: 'Tìm kiếm' }) có thể khớp với những loại phần tử HTML nào?",
      "en": "Which kinds of HTML elements can page.getByRole('textbox', { name: 'Search' }) match?",
      "ja": "page.getByRole('textbox', { name: 'Search' })はどの種類のHTML要素にマッチしますか。"
    },
    "options": [
      {
        "vi": "Chỉ thẻ <textarea>",
        "en": "Only <textarea> tags",
        "ja": "<textarea>タグのみ"
      },
      {
        "vi": "Chỉ phần tử có class \"search-box\"",
        "en": "Only elements with the class \"search-box\"",
        "ja": "クラス\"search-box\"を持つ要素のみ"
      },
      {
        "vi": "Chỉ thẻ <input type=\"search\">",
        "en": "Only <input type=\"search\"> tags",
        "ja": "<input type=\"search\">タグのみ"
      },
      {
        "vi": "<input type=\"text\">, <textarea>, hoặc bất kỳ phần tử nào có role=\"textbox\" gán thủ công (đều thuộc role textbox trong accessibility tree)",
        "en": "<input type=\"text\">, <textarea>, or any element manually assigned role=\"textbox\" (all map to the textbox role in the accessibility tree)",
        "ja": "<input type=\"text\">、<textarea>、または手動でrole=\"textbox\"を割り当てられた任意の要素(すべてアクセシビリティツリーでtextboxロールにマッピングされる)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Role 'textbox' trong accessibility tree ánh xạ từ nhiều loại phần tử: input text mặc định, textarea, hoặc bất kỳ phần tử nào gán role='textbox' rõ ràng qua ARIA, không giới hạn ở một thẻ HTML cụ thể.",
      "en": "The 'textbox' role in the accessibility tree maps from several element types: default text inputs, textareas, or any element explicitly given role='textbox' via ARIA — not limited to one specific HTML tag.",
      "ja": "アクセシビリティツリーの'textbox'ロールは、デフォルトのテキストinput、textarea、またはARIAで明示的にrole='textbox'が付与された任意の要素など複数の要素タイプからマッピングされ、特定の1つのHTMLタグに限定されません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đội dev thêm data-testid vào toàn bộ phần tử tương tác trong ứng dụng chỉ để phục vụ test, kể cả những phần tử đã có role và accessible name rõ ràng như <button>Lưu</button>. Nhận định nào ĐÚNG về best practice?",
      "en": "The dev team adds data-testid to every interactive element in the app purely for testing, even ones that already have a clear role and accessible name like <button>Save</button>. Which statement about best practice is CORRECT?",
      "ja": "開発チームは、<button>Save</button>のようにすでに明確なロールとアクセシブルネームを持つ要素を含め、アプリ内のすべてのインタラクティブ要素にテストのためだけにdata-testidを追加しました。ベストプラクティスに関して正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "getByTestId nên là lựa chọn cuối khi phần tử không có role/label/text rõ ràng; với phần tử đã có accessible name tốt, ưu tiên getByRole/getByLabel/getByText để test phản ánh đúng trải nghiệm người dùng thật",
        "en": "getByTestId should be a last resort when an element has no clear role/label/text; for elements that already have a good accessible name, prefer getByRole/getByLabel/getByText so tests reflect real user experience",
        "ja": "getByTestIdは要素に明確なロール/ラベル/テキストがない場合の最終手段とすべきであり、すでに良いアクセシブルネームを持つ要素についてはgetByRole/getByLabel/getByTextを優先し、テストが実際のユーザー体験を反映するようにすべきである"
      },
      {
        "vi": "Đây là cách làm lý tưởng nhất và nên áp dụng cho mọi phần tử không ngoại lệ",
        "en": "This is the ideal approach and should be applied to every element without exception",
        "ja": "これは最も理想的な方法であり、例外なくすべての要素に適用すべきである"
      },
      {
        "vi": "data-testid làm chậm tốc độ render của trang nên tuyệt đối không được dùng",
        "en": "data-testid slows down page rendering, so it must never be used",
        "ja": "data-testidはページのレンダリング速度を低下させるため、絶対に使用してはならない"
      },
      {
        "vi": "getByTestId luôn ưu tiên hơn getByRole vì nhanh hơn về mặt thực thi",
        "en": "getByTestId always takes priority over getByRole because it executes faster",
        "ja": "getByTestIdは実行が速いため常にgetByRoleより優先される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright khuyến nghị thứ tự ưu tiên locator theo mức độ phản ánh trải nghiệm người dùng: role/label/text trước, testid là phương án dự phòng khi không có thuộc tính user-facing phù hợp, giúp test vừa bền vững vừa gắn với accessibility thực tế.",
      "en": "Playwright recommends prioritizing locators by how well they reflect user experience: role/label/text first, with testid as a fallback when no suitable user-facing attribute exists — keeping tests both resilient and grounded in real accessibility.",
      "ja": "Playwrightは、ユーザー体験をどれだけ反映しているかによってロケーターの優先順位を推奨します。role/label/textを最初に使い、適切なユーザー向け属性がない場合の代替としてtestidを使うことで、テストが堅牢でありながら実際のアクセシビリティに根ざしたものになります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong pipeline CI, một selector CSS phức tạp như 'div.container > ul > li:nth-child(2) > a.link-item' đột nhiên fail sau khi designer đổi cấu trúc HTML nhẹ mà không đổi nội dung hiển thị. Đây là ví dụ điển hình của vấn đề gì, và cách phòng tránh?",
      "en": "In a CI pipeline, a complex CSS selector like 'div.container > ul > li:nth-child(2) > a.link-item' suddenly fails after a designer slightly changes the HTML structure without changing visible content. What problem does this illustrate, and how to prevent it?",
      "ja": "CIパイプラインで、'div.container > ul > li:nth-child(2) > a.link-item'のような複雑なCSSセレクターが、デザイナーが表示内容を変えずにHTML構造を少し変更した後に突然失敗しました。これはどのような問題の典型例であり、どう防ぐべきですか。"
    },
    "options": [
      {
        "vi": "Vấn đề tốc độ mạng; nên tăng timeout mạng lên tối đa",
        "en": "A network speed problem; the network timeout should be maximized",
        "ja": "ネットワーク速度の問題であり、ネットワークタイムアウトを最大にすべきである"
      },
      {
        "vi": "Locator gắn chặt với cấu trúc DOM (structural coupling); nên chuyển sang locator dựa trên vai trò/nội dung hiển thị (getByRole/getByText/getByLabel) để tách biệt logic test khỏi cấu trúc HTML nội bộ",
        "en": "Structural coupling of the locator to the DOM; it should be replaced with role/content-based locators (getByRole/getByText/getByLabel) to decouple test logic from internal HTML structure",
        "ja": "ロケーターがDOM構造に密結合している問題(structural coupling)であり、テストロジックを内部HTML構造から切り離すためrole/コンテンツベースのロケーター(getByRole/getByText/getByLabel)に置き換えるべきである"
      },
      {
        "vi": "Vấn đề bảo mật do CSS selector lộ thông tin nhạy cảm",
        "en": "A security issue because the CSS selector exposes sensitive information",
        "ja": "CSSセレクターが機密情報を漏らすセキュリティ上の問題"
      },
      {
        "vi": "Đây là hành vi bình thường không cần khắc phục vì test flaky là điều không tránh khỏi",
        "en": "This is normal behavior that needs no fix, since flaky tests are unavoidable",
        "ja": "これは正常な動作であり、flakyなテストは避けられないため修正の必要はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Selector CSS theo cấu trúc phân cấp/vị trí (nth-child, combinator) tạo liên kết chặt với DOM, dễ gãy khi refactor HTML dù nội dung không đổi; locator ngữ nghĩa theo role/text ổn định hơn vì bám vào những gì người dùng thực sự thấy.",
      "en": "CSS selectors based on hierarchical/positional structure (nth-child, combinators) tightly couple to the DOM and break easily when HTML is refactored even if content stays the same; semantic role/text locators are more stable since they track what the user actually sees.",
      "ja": "階層的・位置的構造(nth-child、結合子)に基づくCSSセレクターはDOMに密結合しており、内容が変わらなくてもHTMLがリファクタリングされると壊れやすくなります。role/textによるセマンティックロケーターは、ユーザーが実際に見るものを追跡するためより安定しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright Test Generator (codegen) khi ghi lại thao tác click vào nút có text rõ ràng thường sinh ra locator dạng nào theo mặc định?",
      "en": "When recording a click on a button with clear text, Playwright's Test Generator (codegen) typically generates which type of locator by default?",
      "ja": "Playwright Test Generator(codegen)が明確なテキストを持つボタンへのクリックを記録する際、デフォルトでどの種類のロケーターを通常生成しますか。"
    },
    "options": [
      {
        "vi": "page.locator('button.btn.btn-primary.mt-2')",
        "en": "page.locator('button.btn.btn-primary.mt-2')",
        "ja": "page.locator('button.btn.btn-primary.mt-2')"
      },
      {
        "vi": "page.xpath('//button[1]')",
        "en": "page.xpath('//button[1]')",
        "ja": "page.xpath('//button[1]')"
      },
      {
        "vi": "page.getByRole('button', { name: '...' }) dựa trên role và accessible name của phần tử",
        "en": "page.getByRole('button', { name: '...' }) based on the element's role and accessible name",
        "ja": "要素のロールとアクセシブルネームに基づくpage.getByRole('button', { name: '...' })"
      },
      {
        "vi": "page.locator('#root > div > button')",
        "en": "page.locator('#root > div > button')",
        "ja": "page.locator('#root > div > button')"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Codegen của Playwright ưu tiên sinh locator theo role/accessible name khi có thể, phản ánh khuyến nghị chính thức về locator bền vững, thay vì các selector CSS/XPath phụ thuộc cấu trúc.",
      "en": "Playwright's codegen prioritizes generating role/accessible-name based locators when possible, reflecting the official guidance for resilient locators, rather than structure-dependent CSS/XPath selectors.",
      "ja": "Playwrightのcodegenは可能な限りrole/アクセシブルネームベースのロケーターを優先的に生成し、構造依存のCSS/XPathセレクターではなく、堅牢なロケーターに関する公式ガイダンスを反映しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một trường input số lượng có hai nút tăng/giảm cùng nằm cạnh nhau, không có text, chỉ có icon \"+\" và \"-\" hiển thị bằng font-icon (không phải text thật). Để locator hoạt động đáng tin cậy, giải pháp tốt nhất là gì?",
      "en": "A quantity input has increment/decrement buttons side by side, with no real text — only \"+\" and \"-\" icons rendered via a font-icon (not real text). What is the best solution for a reliable locator?",
      "ja": "数量入力欄には増減ボタンが並んでおり、実際のテキストはなく、フォントアイコン(実テキストではない)でレンダリングされた「+」と「-」アイコンだけがあります。信頼できるロケーターのための最良の解決策は何ですか。"
    },
    "options": [
      {
        "vi": "Luôn dùng page.mouse.click(x, y) theo toạ độ pixel cố định",
        "en": "Always use page.mouse.click(x, y) with fixed pixel coordinates",
        "ja": "常に固定ピクセル座標でpage.mouse.click(x, y)を使う"
      },
      {
        "vi": "Dùng getByText('+') và getByText('-') vì font-icon vẫn được coi là text node bình thường",
        "en": "Use getByText('+') and getByText('-') since font-icon glyphs are still treated as normal text nodes",
        "ja": "フォントアイコンのグリフも通常のテキストノードとして扱われるため、getByText('+')とgetByText('-')を使う"
      },
      {
        "vi": "Không thể test được các nút này bằng Playwright",
        "en": "These buttons cannot be tested with Playwright at all",
        "ja": "これらのボタンはPlaywrightでテストすることが一切できない"
      },
      {
        "vi": "Gán aria-label=\"Tăng số lượng\" / aria-label=\"Giảm số lượng\" cho mỗi nút rồi dùng getByRole('button', { name: ... })",
        "en": "Assign aria-label=\"Increase quantity\" / aria-label=\"Decrease quantity\" to each button, then use getByRole('button', { name: ... })",
        "ja": "各ボタンにaria-label=\"数量を増やす\"/aria-label=\"数量を減らす\"を付与し、getByRole('button', { name: ... })を使用する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Font-icon thường không phải text thật (có thể là pseudo-element hoặc ký tự unicode không mang ý nghĩa ngữ nghĩa rõ ràng), nên aria-label là cách chuẩn để cung cấp accessible name, giúp getByRole hoạt động ổn định và cải thiện accessibility.",
      "en": "Font-icon glyphs are often not real semantic text (they may be pseudo-elements or unicode characters without clear meaning), so aria-label is the standard way to provide an accessible name, letting getByRole work reliably while improving accessibility.",
      "ja": "フォントアイコンのグリフはしばしば実際の意味のあるテキストではありません(疑似要素や明確な意味を持たないUnicode文字である場合があります)。そのためaria-labelはアクセシブルネームを提供する標準的な方法であり、getByRoleを確実に機能させると同時にアクセシビリティも向上させます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào sau đây về getByPlaceholder là ĐÚNG khi so sánh với getByLabel trong việc chọn ô input?",
      "en": "Which statement about getByPlaceholder is CORRECT compared to getByLabel when selecting an input field?",
      "ja": "input欄を選択する際、getByLabelと比較したgetByPlaceholderに関する正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "getByPlaceholder dựa vào thuộc tính placeholder — vốn chỉ là gợi ý tạm thời không phải nhãn cố định, nên kém ổn định về mặt UX/accessibility hơn getByLabel khi trường có label thật",
        "en": "getByPlaceholder relies on the placeholder attribute — which is only a temporary hint, not a persistent label — so it is less robust for UX/accessibility than getByLabel when the field has a real label",
        "ja": "getByPlaceholderはplaceholder属性に依存する。これは一時的なヒントであり永続的なラベルではないため、フィールドに実際のラベルがある場合、UX/アクセシビリティの観点でgetByLabelより堅牢性が劣る"
      },
      {
        "vi": "getByPlaceholder và getByLabel luôn cho kết quả giống hệt nhau trong mọi trường hợp",
        "en": "getByPlaceholder and getByLabel always produce identical results in every case",
        "ja": "getByPlaceholderとgetByLabelはあらゆる場合で常に同一の結果を生む"
      },
      {
        "vi": "getByPlaceholder ưu tiên hơn getByLabel theo khuyến nghị chính thức của Playwright",
        "en": "getByPlaceholder is officially recommended by Playwright to be prioritized over getByLabel",
        "ja": "getByPlaceholderはPlaywrightの公式推奨でgetByLabelより優先される"
      },
      {
        "vi": "getByPlaceholder không hoạt động với thẻ input, chỉ hoạt động với textarea",
        "en": "getByPlaceholder does not work with input tags, only with textarea",
        "ja": "getByPlaceholderはinputタグでは機能せず、textareaでのみ機能する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Placeholder biến mất khi người dùng gõ nội dung và không phải là nhãn accessible chuẩn cho công nghệ trợ năng, nên khi trường input đã có label thật, getByLabel phản ánh đúng trải nghiệm và bền vững hơn getByPlaceholder.",
      "en": "A placeholder disappears once the user types and is not a proper accessible label for assistive technologies, so when a real label exists, getByLabel better reflects the user experience and is more robust than getByPlaceholder.",
      "ja": "placeholderはユーザーが入力すると消えてしまい、支援技術にとって適切なアクセシブルラベルではありません。実際のラベルが存在する場合、getByLabelはユーザー体験をより正しく反映し、getByPlaceholderより堅牢です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong file cấu hình playwright.config.ts, việc đổi testIdAttribute từ 'data-testid' thành 'data-qa' ảnh hưởng thế nào đến các hàm locator?",
      "en": "In playwright.config.ts, changing testIdAttribute from 'data-testid' to 'data-qa' affects which locator functions?",
      "ja": "playwright.config.tsでtestIdAttributeを'data-testid'から'data-qa'に変更すると、どのロケーター関数に影響しますか。"
    },
    "options": [
      {
        "vi": "Ảnh hưởng đến tất cả locator kể cả getByRole và getByText",
        "en": "It affects all locators including getByRole and getByText",
        "ja": "getByRoleやgetByTextを含むすべてのロケーターに影響する"
      },
      {
        "vi": "Chỉ ảnh hưởng đến getByTestId(), khiến nó tìm theo thuộc tính data-qa thay vì data-testid mặc định",
        "en": "It only affects getByTestId(), making it search by the data-qa attribute instead of the default data-testid",
        "ja": "getByTestId()のみに影響し、デフォルトのdata-testidの代わりにdata-qa属性で検索するようになる"
      },
      {
        "vi": "Không ảnh hưởng gì, phải sửa trực tiếp trong code test",
        "en": "It has no effect; the code must be edited directly in each test",
        "ja": "何の影響もなく、各テストのコードを直接修正する必要がある"
      },
      {
        "vi": "Làm vô hiệu hoá hoàn toàn getByTestId trong toàn bộ project",
        "en": "It completely disables getByTestId across the entire project",
        "ja": "プロジェクト全体でgetByTestIdを完全に無効化する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "testIdAttribute là cấu hình toàn cục riêng cho getByTestId, cho phép dự án dùng quy ước attribute khác (như data-qa hay data-cy) mà không cần đổi cách gọi getByTestId trong code test.",
      "en": "testIdAttribute is a global setting specific to getByTestId, allowing a project to use a different attribute convention (like data-qa or data-cy) without changing how getByTestId is called in test code.",
      "ja": "testIdAttributeはgetByTestId専用のグローバル設定であり、テストコード内でのgetByTestIdの呼び出し方を変えることなく、プロジェクトが別の属性規約(data-qaやdata-cyなど)を使えるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trước khi thực thi một hành động như click() hoặc fill(), Playwright áp dụng cơ chế auto-waiting theo cách nào?",
      "en": "Before performing an action like click() or fill(), how does Playwright's auto-waiting mechanism work?",
      "ja": "click()やfill()などのアクションを実行する前に、Playwrightのオートウェイト機構はどのように動作しますか。"
    },
    "options": [
      {
        "vi": "Luôn chờ cố định 30 giây trước mỗi hành động để đảm bảo an toàn",
        "en": "It always waits a fixed 30 seconds before every action to be safe",
        "ja": "安全のため毎回必ず30秒固定で待機してからアクションを実行する"
      },
      {
        "vi": "Chỉ chờ sự kiện DOMContentLoaded của trang rồi thực hiện hành động ngay lập tức",
        "en": "It only waits for the page's DOMContentLoaded event before performing the action immediately",
        "ja": "ページのDOMContentLoadedイベントのみを待ってから即座にアクションを実行する"
      },
      {
        "vi": "Lặp lại các actionability checks (visible, enabled, stable, receives events...) cho đến khi tất cả đạt hoặc hết timeout, rồi mới thực hiện hành động",
        "en": "It repeatedly runs actionability checks (visible, enabled, stable, receives events...) until all pass or the timeout is reached, then performs the action",
        "ja": "アクショナビリティチェック（表示中、有効、安定、イベント受信可能など）をすべて満たすかタイムアウトになるまで繰り返し確認してからアクションを実行する"
      },
      {
        "vi": "Yêu cầu lập trình viên tự gọi waitForSelector trước mỗi hành động, Playwright không tự chờ",
        "en": "It requires the developer to manually call waitForSelector before every action; Playwright does not wait automatically",
        "ja": "開発者が毎回waitForSelectorを手動で呼ぶ必要があり、Playwrightは自動では待機しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Auto-waiting của Playwright thực hiện các kiểm tra khả năng thao tác (actionability checks) trên phần tử một cách lặp lại theo chu kỳ cho đến khi đủ điều kiện hoặc hết thời gian chờ, giúp loại bỏ các lệnh sleep thủ công.",
      "en": "Playwright's auto-waiting polls actionability checks on the element repeatedly until conditions are met or the timeout expires, eliminating the need for manual sleeps.",
      "ja": "Playwrightのオートウェイトは、条件が満たされるかタイムアウトになるまで要素のアクショナビリティチェックを繰り返しポーリングし、手動のスリープを不要にします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa web-first assertion expect(locator).toBeVisible() và assertion đồng bộ thông thường (ví dụ expect(value).toBe(x)) là gì?",
      "en": "What is the core difference between a web-first assertion like expect(locator).toBeVisible() and a regular synchronous assertion (e.g. expect(value).toBe(x))?",
      "ja": "expect(locator).toBeVisible()のようなweb-firstアサーションと、通常の同期的なアサーション（例：expect(value).toBe(x)）との根本的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Web-first assertion không bao giờ ném lỗi cho dù điều kiện sai",
        "en": "A web-first assertion never throws an error even if the condition is false",
        "ja": "web-firstアサーションは条件が偽であっても決してエラーを投げない"
      },
      {
        "vi": "Web-first assertion chỉ hoạt động trong API testing, không dùng được cho UI",
        "en": "A web-first assertion only works in API testing, not for UI elements",
        "ja": "web-firstアサーションはAPIテストでのみ動作し、UI要素には使えない"
      },
      {
        "vi": "Web-first assertion chạy song song với action, còn assertion thường chạy tuần tự",
        "en": "A web-first assertion runs in parallel with the action, while a regular assertion runs sequentially",
        "ja": "web-firstアサーションはアクションと並行して実行されるが、通常のアサーションは順次実行される"
      },
      {
        "vi": "Web-first assertion tự động retry (poll lại) điều kiện cho đến khi đúng hoặc hết timeout, còn assertion thường chỉ kiểm tra giá trị tại một thời điểm duy nhất",
        "en": "A web-first assertion automatically retries (polls) the condition until it becomes true or times out, while a regular assertion only checks a value at a single point in time",
        "ja": "web-firstアサーションは条件が真になるかタイムアウトするまで自動的に再試行（ポーリング）するが、通常のアサーションは一時点の値のみをチェックする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Web-first assertions bọc locator và tự động polling lại điều kiện nhiều lần trong khoảng timeout, phù hợp với UI động; assertion thông thường chỉ đánh giá giá trị đã có sẵn ngay lúc gọi.",
      "en": "Web-first assertions wrap a locator and poll the condition repeatedly within the timeout window, suited to dynamic UI; regular assertions evaluate an already-resolved value once.",
      "ja": "web-firstアサーションはロケーターをラップし、タイムアウト内で条件を何度もポーリングするため動的なUIに適しています。通常のアサーションはすでに確定した値を一度だけ評価します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi nào nên dùng expect(locator).toBeAttached() thay vì expect(locator).toBeVisible()?",
      "en": "When should you use expect(locator).toBeAttached() instead of expect(locator).toBeVisible()?",
      "ja": "expect(locator).toBeVisible()ではなくexpect(locator).toBeAttached()を使うべきなのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi muốn xác nhận phần tử tồn tại trong DOM nhưng không quan tâm nó có đang hiển thị trên màn hình hay không (ví dụ phần tử bị ẩn bởi CSS display:none có chủ đích)",
        "en": "When you want to confirm the element exists in the DOM but don't care whether it is currently rendered on screen (e.g. an element intentionally hidden via display:none)",
        "ja": "要素がDOMに存在することだけを確認したく、現在画面上に表示されているかは問わない場合（例：意図的にdisplay:noneで非表示にされた要素）"
      },
      {
        "vi": "Khi muốn kiểm tra phần tử có màu sắc đúng theo thiết kế",
        "en": "When you want to check the element has the correct color per the design",
        "ja": "要素が設計通りの色になっているかを確認したい場合"
      },
      {
        "vi": "Khi muốn kiểm tra phần tử nhận được sự kiện click",
        "en": "When you want to check the element receives a click event",
        "ja": "要素がクリックイベントを受け取れるかを確認したい場合"
      },
      {
        "vi": "toBeAttached() và toBeVisible() luôn cho kết quả giống nhau nên không có lý do để chọn cái này thay cái kia",
        "en": "toBeAttached() and toBeVisible() always yield the same result, so there is no reason to prefer one over the other",
        "ja": "toBeAttached()とtoBeVisible()は常に同じ結果になるため、どちらを選んでも理由はない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "toBeAttached() chỉ kiểm tra phần tử có mặt trong cây DOM, còn toBeVisible() còn yêu cầu phần tử có kích thước khác 0 và không bị display:none/visibility:hidden — hai kiểm tra phục vụ mục đích khác nhau.",
      "en": "toBeAttached() only checks the element is present in the DOM tree, while toBeVisible() additionally requires non-zero size and no display:none/visibility:hidden — they serve different purposes.",
      "ja": "toBeAttached()は要素がDOMツリーに存在することのみを確認しますが、toBeVisible()はさらにサイズがゼロでないこと、display:noneやvisibility:hiddenでないことを要求します。両者は目的が異なります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cách nào đúng để rút ngắn timeout mặc định của MỘT web-first assertion cụ thể xuống 5 giây mà không ảnh hưởng các assertion khác?",
      "en": "What is the correct way to shorten just one web-first assertion's timeout to 5 seconds without affecting other assertions?",
      "ja": "他のアサーションに影響を与えずに、特定の1つのweb-firstアサーションのタイムアウトだけを5秒に短縮する正しい方法はどれですか。"
    },
    "options": [
      {
        "vi": "Sửa timeout mặc định trong playwright.config.ts cho toàn bộ dự án",
        "en": "Change the default timeout in playwright.config.ts for the whole project",
        "ja": "プロジェクト全体のplaywright.config.tsでデフォルトタイムアウトを変更する"
      },
      {
        "vi": "Truyền { timeout: 5000 } làm tham số thứ hai vào chính assertion đó, ví dụ expect(locator).toBeVisible({ timeout: 5000 })",
        "en": "Pass { timeout: 5000 } as the second argument to that specific assertion, e.g. expect(locator).toBeVisible({ timeout: 5000 })",
        "ja": "そのアサーション自体の第二引数に{ timeout: 5000 }を渡す。例：expect(locator).toBeVisible({ timeout: 5000 })"
      },
      {
        "vi": "Gọi test.setTimeout(5000) ở đầu file test",
        "en": "Call test.setTimeout(5000) at the top of the test file",
        "ja": "テストファイルの先頭でtest.setTimeout(5000)を呼び出す"
      },
      {
        "vi": "Dùng page.waitForTimeout(5000) ngay trước assertion",
        "en": "Use page.waitForTimeout(5000) right before the assertion",
        "ja": "アサーションの直前にpage.waitForTimeout(5000)を使う"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mỗi web-first assertion nhận một object option riêng chứa timeout, cho phép tuỳ chỉnh cục bộ cho từng assertion mà không sửa cấu hình toàn cục.",
      "en": "Each web-first assertion accepts its own options object containing timeout, allowing per-assertion customization without touching the global config.",
      "ja": "各web-firstアサーションはtimeoutを含む独自のオプションオブジェクトを受け取ることができ、グローバル設定を変更せずにアサーション単位でカスタマイズできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong danh sách actionability checks mà Playwright thực hiện trước khi click, mục nào KHÔNG thuộc về checklist này?",
      "en": "Among the actionability checks Playwright performs before a click, which of the following is NOT part of that checklist?",
      "ja": "Playwrightがクリック前に実行するアクショナビリティチェックの一覧のうち、次のうちチェックリストに含まれないものはどれですか。"
    },
    "options": [
      {
        "vi": "Element phải Visible (hiển thị)",
        "en": "Element must be Visible",
        "ja": "要素がVisible（表示中）であること"
      },
      {
        "vi": "Element phải Stable (không còn đang animate, vị trí ổn định giữa hai frame liên tiếp)",
        "en": "Element must be Stable (not animating, position steady across two consecutive frames)",
        "ja": "要素がStable（アニメーション中でなく、連続する2フレームで位置が安定していること）であること"
      },
      {
        "vi": "Element phải có thuộc tính data-testid được khai báo tường minh trong HTML",
        "en": "Element must have a data-testid attribute explicitly declared in the HTML",
        "ja": "要素がHTML内に明示的にdata-testid属性を持っていること"
      },
      {
        "vi": "Element phải Receives Events (không bị phần tử khác che phủ tại điểm click)",
        "en": "Element must Receive Events (not obscured by another element at the click point)",
        "ja": "要素がReceives Events（クリック位置で他の要素に覆われていないこと）であること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "data-testid chỉ là một chiến lược chọn phần tử (selector strategy), hoàn toàn không phải điều kiện actionability. Các kiểm tra thực sự gồm Visible, Stable, Receives Events, Enabled và không bị disabled/animating.",
      "en": "data-testid is merely a selector strategy and has nothing to do with actionability. The real checks include Visible, Stable, Receives Events, and Enabled.",
      "ja": "data-testidは単なるセレクター戦略であり、アクショナビリティの条件とは無関係です。実際のチェックにはVisible、Stable、Receives Events、Enabledなどが含まれます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tại sao trong test Playwright hiện đại nên tránh dùng page.waitForTimeout(3000) trước khi assert trạng thái UI?",
      "en": "Why should modern Playwright tests avoid using page.waitForTimeout(3000) before asserting UI state?",
      "ja": "最新のPlaywrightテストで、UI状態をアサートする前にpage.waitForTimeout(3000)を使うのを避けるべきなのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì waitForTimeout đã bị xoá khỏi Playwright API và sẽ gây lỗi cú pháp",
        "en": "Because waitForTimeout has been removed from the Playwright API and will cause a syntax error",
        "ja": "waitForTimeoutはPlaywright APIから削除されており、構文エラーになるため"
      },
      {
        "vi": "Vì waitForTimeout tự động chụp screenshot gây tốn dung lượng ổ đĩa",
        "en": "Because waitForTimeout automatically takes a screenshot, wasting disk space",
        "ja": "waitForTimeoutは自動的にスクリーンショットを撮影し、ディスク容量を消費するため"
      },
      {
        "vi": "Vì waitForTimeout chỉ hoạt động trên trình duyệt Firefox",
        "en": "Because waitForTimeout only works in the Firefox browser",
        "ja": "waitForTimeoutはFirefoxブラウザでしか動作しないため"
      },
      {
        "vi": "Vì nó chờ cố định một khoảng thời gian bất kể UI đã sẵn sàng hay chưa, làm test chậm khi không cần thiết và vẫn có thể flaky khi UI chậm hơn dự kiến — trong khi web-first assertion tự retry đến khi điều kiện đúng",
        "en": "Because it waits a fixed duration regardless of whether the UI is actually ready, making the test unnecessarily slow while still being flaky if the UI is slower than expected — whereas a web-first assertion retries until the condition is true",
        "ja": "UIが実際に準備できているかに関係なく固定時間待つため、不要にテストが遅くなる上、UIが想定より遅い場合はやはりフレーキーになりうる。一方web-firstアサーションは条件が真になるまで再試行する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "waitForTimeout là chờ cứng, không phản ánh trạng thái thực của ứng dụng, vừa lãng phí thời gian vừa không đảm bảo hết flaky; web-first assertion đảm bảo cả tốc độ lẫn độ ổn định vì nó poll đúng điều kiện cần.",
      "en": "waitForTimeout is a hard sleep unrelated to the app's actual state — it wastes time and still doesn't guarantee stability; web-first assertions poll the exact condition needed, giving both speed and reliability.",
      "ja": "waitForTimeoutはアプリの実際の状態と無関係な固定待機であり、時間を無駄にする上に安定性も保証しません。web-firstアサーションは必要な条件そのものをポーリングするため、速度と安定性の両方を実現します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect.soft(locator).toBeVisible() khác gì so với expect(locator).toBeVisible() (hard assertion) thông thường?",
      "en": "How does expect.soft(locator).toBeVisible() differ from a regular hard assertion expect(locator).toBeVisible()?",
      "ja": "expect.soft(locator).toBeVisible()は、通常のハードアサーションであるexpect(locator).toBeVisible()とどう違いますか。"
    },
    "options": [
      {
        "vi": "Soft assertion khi thất bại sẽ ghi nhận lỗi nhưng test vẫn tiếp tục chạy đến hết, chỉ đánh dấu fail ở cuối; hard assertion thất bại thì dừng test ngay lập tức",
        "en": "When a soft assertion fails it records the failure but the test keeps running to completion and is only marked failed at the end; a hard assertion failure stops the test immediately",
        "ja": "soft assertionが失敗した場合、失敗を記録するがテストは最後まで実行され続け、最終的に失敗としてマークされる。hard assertionが失敗すると即座にテストが停止する"
      },
      {
        "vi": "Soft assertion không bao giờ retry, trong khi hard assertion luôn retry",
        "en": "A soft assertion never retries, while a hard assertion always retries",
        "ja": "soft assertionは決してリトライしないが、hard assertionは常にリトライする"
      },
      {
        "vi": "Soft assertion chỉ dùng được cho API testing, không dùng cho locator",
        "en": "A soft assertion can only be used in API testing, not with a locator",
        "ja": "soft assertionはAPIテストでしか使えず、ロケーターには使えない"
      },
      {
        "vi": "Soft assertion không hỗ trợ .not()",
        "en": "A soft assertion does not support .not()",
        "ja": "soft assertionは.not()をサポートしない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Soft assertions vẫn thực hiện đầy đủ cơ chế polling như assertion thường, nhưng khi thất bại chỉ ghi nhận vào danh sách lỗi thay vì throw ngay, giúp thu thập nhiều lỗi trong một lần chạy.",
      "en": "Soft assertions still perform the same polling mechanism as regular assertions, but on failure they only record the error instead of throwing immediately, allowing multiple failures to be collected in one run.",
      "ja": "soft assertionも通常のアサーションと同様のポーリング機構を実行しますが、失敗しても即座にthrowせずエラーリストに記録するだけなので、1回の実行で複数の失敗を収集できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect(locator).toHaveText('Xin chào') và expect(locator).toContainText('chào') khác nhau ở điểm nào?",
      "en": "What is the difference between expect(locator).toHaveText('Hello') and expect(locator).toContainText('ello')?",
      "ja": "expect(locator).toHaveText('こんにちは')とexpect(locator).toContainText('んにち')の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "Both are completely identical, differing only in name",
        "ja": "両者は名前が違うだけで完全に同一である"
      },
      {
        "vi": "toHaveText yêu cầu khớp chính xác toàn bộ nội dung text (sau khi chuẩn hoá whitespace), còn toContainText chỉ cần chuỗi con xuất hiện trong text",
        "en": "toHaveText requires an exact match of the whole text content (after whitespace normalization), while toContainText only requires the substring to appear within the text",
        "ja": "toHaveTextは（空白を正規化した上で）テキスト全体の完全一致を要求するが、toContainTextはテキストの中に部分文字列が含まれていればよい"
      },
      {
        "vi": "toHaveText không tự động retry còn toContainText có retry",
        "en": "toHaveText does not auto-retry while toContainText does",
        "ja": "toHaveTextは自動リトライしないがtoContainTextはリトライする"
      },
      {
        "vi": "toContainText chỉ hoạt động với input, toHaveText chỉ hoạt động với span",
        "en": "toContainText only works on input elements, toHaveText only works on span elements",
        "ja": "toContainTextはinput要素にのみ、toHaveTextはspan要素にのみ動作する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "toHaveText đòi hỏi văn bản khớp toàn bộ (hoặc regex đầy đủ), trong khi toContainText khớp một phần — cả hai đều là web-first assertion có retry.",
      "en": "toHaveText requires a full match (or full regex), whereas toContainText matches a substring — both are retrying web-first assertions.",
      "ja": "toHaveTextは完全一致（または完全な正規表現）を要求しますが、toContainTextは部分一致で判定します。両方ともリトライするweb-firstアサーションです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect.poll(async () => await getOrderCountFromApi()).toBe(3) được dùng khi nào?",
      "en": "When would you use expect.poll(async () => await getOrderCountFromApi()).toBe(3)?",
      "ja": "expect.poll(async () => await getOrderCountFromApi()).toBe(3)はどのような場面で使いますか。"
    },
    "options": [
      {
        "vi": "Khi cần retry điều kiện dựa trên một locator UI thông thường",
        "en": "When you need to retry a condition based on a regular UI locator",
        "ja": "通常のUIロケーターに基づく条件をリトライしたい場合"
      },
      {
        "vi": "Khi cần chụp screenshot toàn trang định kỳ",
        "en": "When you need to take a full-page screenshot periodically",
        "ja": "定期的にページ全体のスクリーンショットを撮りたい場合"
      },
      {
        "vi": "Khi cần polling lặp lại một giá trị bất kỳ không phải locator (ví dụ kết quả gọi API, giá trị từ hàm bất đồng bộ) cho đến khi thoả điều kiện hoặc hết timeout, vì các web-first assertion thông thường chỉ hoạt động với locator",
        "en": "When you need to repeatedly poll an arbitrary non-locator value (e.g. an API call result, a value from an async function) until it satisfies a condition or times out, since regular web-first assertions only work with locators",
        "ja": "ロケーター以外の任意の値（例：API呼び出しの結果、非同期関数からの値）を条件が満たされるかタイムアウトになるまで繰り返しポーリングしたい場合。通常のweb-firstアサーションはロケーターにしか使えないため"
      },
      {
        "vi": "Khi cần disable auto-waiting hoàn toàn cho toàn bộ test",
        "en": "When you need to fully disable auto-waiting for the entire test",
        "ja": "テスト全体でオートウェイトを完全に無効化したい場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "expect.poll mở rộng cơ chế polling của web-first assertions ra ngoài phạm vi locator, cho phép chờ bất kỳ giá trị bất đồng bộ nào ổn định đúng điều kiện.",
      "en": "expect.poll extends the polling mechanism of web-first assertions beyond locators, allowing you to wait for any asynchronous value to satisfy a condition.",
      "ja": "expect.pollはweb-firstアサーションのポーリング機構をロケーター以外にも拡張し、任意の非同期値が条件を満たすまで待機できるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Truyền option { force: true } vào locator.click({ force: true }) có tác dụng gì đối với auto-waiting?",
      "en": "What effect does passing { force: true } to locator.click({ force: true }) have on auto-waiting?",
      "ja": "locator.click({ force: true })に{ force: true }オプションを渡すと、オートウェイトにどのような影響がありますか。"
    },
    "options": [
      {
        "vi": "Tự động chụp screenshot trước khi thực hiện click",
        "en": "It automatically takes a screenshot before performing the click",
        "ja": "クリックを実行する前に自動的にスクリーンショットを撮る"
      },
      {
        "vi": "Tăng timeout mặc định lên gấp đôi",
        "en": "It doubles the default timeout",
        "ja": "デフォルトタイムアウトを2倍にする"
      },
      {
        "vi": "Buộc Playwright chờ thêm animation kết thúc trước khi click",
        "en": "It forces Playwright to wait for animations to finish before clicking",
        "ja": "クリック前にアニメーションが終わるまでPlaywrightに強制的に待たせる"
      },
      {
        "vi": "Bỏ qua các actionability checks (như visible, stable, receives events) và thực hiện hành động ngay, nên nên dùng thận trọng vì có thể che giấu lỗi UI thực sự",
        "en": "It skips the actionability checks (such as visible, stable, receives events) and performs the action immediately, so it should be used cautiously as it can mask real UI bugs",
        "ja": "アクショナビリティチェック（visible、stable、receives eventsなど）をスキップして即座にアクションを実行するため、実際のUIバグを隠してしまう可能性があり慎重に使うべきである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "force: true tắt các actionability checks, hữu ích trong vài trường hợp đặc biệt nhưng dễ tạo test không phản ánh đúng trải nghiệm người dùng thật.",
      "en": "force: true disables actionability checks; useful in edge cases but risks producing tests that don't reflect real user experience.",
      "ja": "force: trueはアクショナビリティチェックを無効化します。特殊なケースでは有用ですが、実際のユーザー体験を反映しないテストになりがちです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong một form đăng ký, nút Submit bị disable cho đến khi tất cả trường hợp lệ. Cách kiểm tra web-first assertion phù hợp nhất để xác nhận nút đã kích hoạt sau khi điền đủ form là gì?",
      "en": "In a signup form, the Submit button is disabled until all fields are valid. What is the most appropriate web-first assertion to confirm the button becomes enabled after filling the form?",
      "ja": "サインアップフォームで、すべての項目が有効になるまでSubmitボタンが無効化されています。フォーム入力後にボタンが有効になったことを確認する最も適切なweb-firstアサーションはどれですか。"
    },
    "options": [
      {
        "vi": "expect(submitButton).toBeEnabled()",
        "en": "expect(submitButton).toBeEnabled()",
        "ja": "expect(submitButton).toBeEnabled()"
      },
      {
        "vi": "expect(submitButton).toHaveText('Submit')",
        "en": "expect(submitButton).toHaveText('Submit')",
        "ja": "expect(submitButton).toHaveText('Submit')"
      },
      {
        "vi": "expect(page).toHaveURL('/success')",
        "en": "expect(page).toHaveURL('/success')",
        "ja": "expect(page).toHaveURL('/success')"
      },
      {
        "vi": "expect(submitButton).toHaveCount(1)",
        "en": "expect(submitButton).toHaveCount(1)",
        "ja": "expect(submitButton).toHaveCount(1)"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "toBeEnabled() là assertion trực tiếp và ngữ nghĩa nhất để xác nhận trạng thái kích hoạt/không kích hoạt của một phần tử tương tác, và tự động retry chờ trạng thái chuyển đổi.",
      "en": "toBeEnabled() is the most direct and semantically correct assertion to confirm an interactive element's enabled state, and it auto-retries while waiting for the state to change.",
      "ja": "toBeEnabled()はインタラクティブ要素の有効/無効状態を確認する最も直接的で意味的に正しいアサーションであり、状態変化を待つ間自動的にリトライします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào về assertion expect(value).toEqual(expected) (không đi kèm locator) là ĐÚNG?",
      "en": "Which statement about expect(value).toEqual(expected) (not wrapping a locator) is TRUE?",
      "ja": "（ロケーターをラップしない）expect(value).toEqual(expected)についての記述のうち正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Đây vẫn là web-first assertion và sẽ tự động retry cho đến khi value đúng",
        "en": "This is still a web-first assertion and will auto-retry until the value is correct",
        "ja": "これも依然としてweb-firstアサーションであり、値が正しくなるまで自動的にリトライする"
      },
      {
        "vi": "Đây là non-retrying assertion — value phải được lấy (ví dụ qua await locator.textContent()) trước khi so sánh, Playwright không tự động chờ giá trị này thay đổi",
        "en": "This is a non-retrying assertion — the value must already be resolved (e.g. via await locator.textContent()) before comparison; Playwright will not automatically wait for this value to change",
        "ja": "これはリトライしないアサーションであり、比較前にvalueがすでに（例えばawait locator.textContent()で）取得されている必要がある。Playwrightはこの値の変化を自動的には待たない"
      },
      {
        "vi": "toEqual chỉ hoạt động với kiểu dữ liệu chuỗi",
        "en": "toEqual only works with string data types",
        "ja": "toEqualは文字列型にしか使えない"
      },
      {
        "vi": "toEqual tự động bỏ qua khác biệt thứ tự phần tử trong mảng",
        "en": "toEqual automatically ignores element order differences in arrays",
        "ja": "toEqualは配列内の要素順序の違いを自動的に無視する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chỉ các assertion nhận locator trực tiếp (như toBeVisible, toHaveText) mới có cơ chế polling web-first; toEqual thông thường của Playwright Test kế thừa từ expect chuẩn nên chỉ so sánh giá trị tĩnh đã có sẵn.",
      "en": "Only assertions that directly accept a locator (like toBeVisible, toHaveText) have the web-first polling mechanism; the regular toEqual inherited from standard expect only compares an already-resolved static value.",
      "ja": "ロケーターを直接受け取るアサーション（toBeVisible、toHaveTextなど）のみがweb-firstのポーリング機構を持ちます。標準のexpectから継承された通常のtoEqualは、すでに確定した静的な値を比較するだけです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect(inputLocator).toHaveValue('abc') dùng để kiểm tra điều gì và tại sao nó hữu ích hơn so với việc đọc value bằng inputValue() rồi so sánh thủ công?",
      "en": "What does expect(inputLocator).toHaveValue('abc') check, and why is it more useful than manually reading the value with inputValue() and comparing?",
      "ja": "expect(inputLocator).toHaveValue('abc')は何を検証し、inputValue()で手動に値を取得して比較するより、なぜ有用なのですか。"
    },
    "options": [
      {
        "vi": "Kiểm tra số lượng ký tự tối đa cho phép nhập (maxlength)",
        "en": "It checks the maximum allowed character length (maxlength)",
        "ja": "入力可能な最大文字数（maxlength）を検証する"
      },
      {
        "vi": "Kiểm tra thuộc tính CSS color của input",
        "en": "It checks the CSS color property of the input",
        "ja": "inputのCSSカラープロパティを検証する"
      },
      {
        "vi": "Kiểm tra giá trị hiện tại của phần tử input/textarea/select, và nó tự động retry — hữu ích khi giá trị được set bởi JS bất đồng bộ (ví dụ debounce, autofill) sau một khoảng trễ",
        "en": "It checks the current value of an input/textarea/select element, and it auto-retries — useful when the value is set by async JS (e.g. debounce, autofill) after a delay",
        "ja": "input/textarea/select要素の現在の値を検証し、自動的にリトライする。値が非同期のJS（デバウンスやオートフィルなど）によって遅延して設定される場合に有用である"
      },
      {
        "vi": "Kiểm tra input có đang focus hay không",
        "en": "It checks whether the input currently has focus",
        "ja": "inputが現在フォーカスされているかを検証する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "toHaveValue là web-first assertion cho các phần tử form, tự động chờ giá trị cập nhật đúng thay vì phải đọc giá trị một lần rồi so sánh tĩnh, tránh race condition với logic bất đồng bộ.",
      "en": "toHaveValue is a web-first assertion for form elements, automatically waiting for the value to update correctly instead of reading it once and comparing statically, avoiding race conditions with async logic.",
      "ja": "toHaveValueはフォーム要素向けのweb-firstアサーションであり、値を一度読んで静的に比較するのではなく、値が正しく更新されるのを自動的に待つため、非同期ロジックとの競合状態を回避できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect(page).toHaveScreenshot('home.png') hoạt động theo cơ chế nào liên quan đến auto-waiting?",
      "en": "How does expect(page).toHaveScreenshot('home.png') relate to auto-waiting?",
      "ja": "expect(page).toHaveScreenshot('home.png')はオートウェイトとどのように関連していますか。"
    },
    "options": [
      {
        "vi": "Chụp ảnh ngay lập tức không quan tâm trạng thái trang, không có retry",
        "en": "It takes the screenshot immediately regardless of page state, with no retry",
        "ja": "ページの状態に関係なく即座にスクリーンショットを撮り、リトライは行わない"
      },
      {
        "vi": "Luôn bỏ qua sự khác biệt màu sắc do chế độ dark mode",
        "en": "It always ignores color differences caused by dark mode",
        "ja": "ダークモードによる色の違いは常に無視する"
      },
      {
        "vi": "Chỉ hoạt động khi chạy ở chế độ headed, không hoạt động ở headless",
        "en": "It only works in headed mode, not in headless mode",
        "ja": "headedモードでのみ動作し、headlessモードでは動作しない"
      },
      {
        "vi": "Nó tự retry chụp và so sánh pixel với baseline nhiều lần trong khoảng timeout cho đến khi ảnh ổn định và khớp (trong ngưỡng cho phép), giúp giảm false positive do trang chưa render xong hoặc đang animate",
        "en": "It automatically retries capturing and comparing pixels against the baseline within the timeout window until the image stabilizes and matches (within a tolerance), reducing false positives from an unfinished render or ongoing animation",
        "ja": "タイムアウト内で画像が安定し（許容範囲内で）一致するまで、スクリーンショットの撮影とベースラインとのピクセル比較を自動的に再試行し、レンダリング未完了やアニメーション中による誤検知を減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "toHaveScreenshot cũng là một web-first assertion: nó retry chụp/so sánh cho đến khi ổn định, tránh chụp ảnh khi trang còn đang loading hoặc animation chưa kết thúc.",
      "en": "toHaveScreenshot is also a web-first assertion — it retries capture/comparison until stable, avoiding screenshots taken mid-load or mid-animation.",
      "ja": "toHaveScreenshotもweb-firstアサーションの一種であり、安定するまでキャプチャと比較を再試行するため、ロード中やアニメーション中のスクリーンショットを避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong playwright.config.ts, thuộc tính expect: { timeout: 10000 } dùng để làm gì?",
      "en": "In playwright.config.ts, what does the expect: { timeout: 10000 } property configure?",
      "ja": "playwright.config.tsにおけるexpect: { timeout: 10000 }プロパティは何を設定しますか。"
    },
    "options": [
      {
        "vi": "Đặt timeout mặc định (global) cho tất cả web-first assertions trong dự án, có thể override cục bộ cho từng assertion",
        "en": "It sets the default (global) timeout for all web-first assertions in the project, which can be overridden per assertion",
        "ja": "プロジェクト内のすべてのweb-firstアサーションのデフォルト（グローバル）タイムアウトを設定するもので、各アサーションごとに個別に上書きできる"
      },
      {
        "vi": "Đặt timeout tổng cho toàn bộ file test, quá 10 giây thì cả file fail",
        "en": "It sets a total timeout for the entire test file; if it exceeds 10 seconds the whole file fails",
        "ja": "テストファイル全体のタイムアウトを設定し、10秒を超えるとファイル全体が失敗する"
      },
      {
        "vi": "Đặt thời gian chờ khởi động trình duyệt trước khi bắt đầu test",
        "en": "It sets how long to wait for the browser to launch before starting a test",
        "ja": "テスト開始前にブラウザ起動を待つ時間を設定する"
      },
      {
        "vi": "Đặt thời gian chờ giữa các test case chạy song song",
        "en": "It sets the wait time between parallel-running test cases",
        "ja": "並列実行されるテストケース間の待機時間を設定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là cấu hình global riêng cho khối expect (web-first assertions), tách biệt với test.timeout tổng thể; từng assertion vẫn có thể ghi đè bằng option timeout cục bộ.",
      "en": "This is a global config dedicated to the expect block (web-first assertions), separate from the overall test.timeout; individual assertions can still override it with a local timeout option.",
      "ja": "これはexpectブロック（web-firstアサーション）専用のグローバル設定で、全体のtest.timeoutとは別物です。個々のアサーションはローカルのtimeoutオプションで上書き可能です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong actionability checks, tiêu chí \"Stable\" của một phần tử được xác định như thế nào?",
      "en": "In actionability checks, how is an element's \"Stable\" criterion determined?",
      "ja": "アクショナビリティチェックにおいて、要素の「Stable（安定）」基準はどのように判定されますか。"
    },
    "options": [
      {
        "vi": "Element không thay đổi thuộc tính class trong 1 giờ",
        "en": "The element's class attribute has not changed for 1 hour",
        "ja": "要素のclass属性が1時間変化していないこと"
      },
      {
        "vi": "Element có cùng vị trí/bounding box trong ít nhất hai khung hình (animation frame) liên tiếp, tức là không còn đang di chuyển/animate",
        "en": "The element has the same position/bounding box across at least two consecutive animation frames, meaning it is no longer moving/animating",
        "ja": "少なくとも連続する2つのアニメーションフレームで要素の位置・バウンディングボックスが同じであること、すなわちもはや移動・アニメーションしていないこと"
      },
      {
        "vi": "Element đã tồn tại trong DOM ít nhất từ lúc trang bắt đầu load",
        "en": "The element has existed in the DOM since the page began loading",
        "ja": "要素がページのロード開始時からDOMに存在していること"
      },
      {
        "vi": "Element có giá trị z-index bằng 0",
        "en": "The element has a z-index value of 0",
        "ja": "要素のz-index値が0であること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm tra Stable so sánh vị trí phần tử qua hai lần đo liên tiếp; nếu vị trí không đổi, phần tử được coi là đã ổn định, tránh click nhầm vào đối tượng đang di chuyển do CSS transition/animation.",
      "en": "The Stable check compares the element's position across two consecutive measurements; if unchanged, the element is considered stable, avoiding mis-clicks on an object still moving due to CSS transitions/animations.",
      "ja": "Stableチェックは連続する2回の測定で要素の位置を比較します。変化がなければ安定していると判断され、CSSトランジションやアニメーションでまだ動いている要素への誤クリックを防ぎます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sau khi click nút \"Đặt hàng\", trang chuyển hướng sang /order/success. Cách kiểm tra web-first phù hợp nhất cho việc điều hướng hoàn tất là gì?",
      "en": "After clicking the \"Place Order\" button, the page navigates to /order/success. What is the most appropriate web-first check to confirm navigation completed?",
      "ja": "「注文する」ボタンをクリックした後、ページは/order/successに遷移します。ナビゲーションが完了したことを確認する最も適切なweb-firstチェックはどれですか。"
    },
    "options": [
      {
        "vi": "page.waitForTimeout(2000) rồi kiểm tra thủ công bằng console.log",
        "en": "page.waitForTimeout(2000) then manually check with console.log",
        "ja": "page.waitForTimeout(2000)の後、console.logで手動確認する"
      },
      {
        "vi": "expect(page.url()).toBe('/order/success') ngay sau lệnh click, không chờ gì thêm",
        "en": "expect(page.url()).toBe('/order/success') immediately after the click, with no further waiting",
        "ja": "クリック直後にexpect(page.url()).toBe('/order/success')を実行し、それ以上待たない"
      },
      {
        "vi": "expect(page).toHaveURL('/order/success')",
        "en": "expect(page).toHaveURL('/order/success')",
        "ja": "expect(page).toHaveURL('/order/success')"
      },
      {
        "vi": "expect(page).toHaveTitle('Trang chủ')",
        "en": "expect(page).toHaveTitle('Home Page')",
        "ja": "expect(page).toHaveTitle('ホームページ')"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "toHaveURL là web-first assertion chuyên dùng để chờ URL của trang khớp với giá trị/regex mong đợi, tự động retry trong lúc điều hướng đang diễn ra, tránh race condition với page.url() đọc tức thời.",
      "en": "toHaveURL is a web-first assertion specifically for waiting until the page's URL matches an expected value/regex, auto-retrying while navigation is in progress, avoiding a race condition with the instantaneous page.url().",
      "ja": "toHaveURLはページのURLが期待値・正規表現と一致するまで待つ専用のweb-firstアサーションであり、ナビゲーション中も自動的にリトライするため、即時に取得するpage.url()との競合状態を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi dùng await expect(loadingSpinner).not.toBeVisible() để chờ một spinner biến mất sau khi tải xong dữ liệu, điều gì xảy ra bên dưới?",
      "en": "When using await expect(loadingSpinner).not.toBeVisible() to wait for a spinner to disappear after data finishes loading, what happens under the hood?",
      "ja": "データ読み込み完了後にスピナーが消えるのを待つためにawait expect(loadingSpinner).not.toBeVisible()を使う場合、内部では何が起きていますか。"
    },
    "options": [
      {
        "vi": "Playwright lấy trạng thái visible tại thời điểm gọi, đảo ngược giá trị boolean rồi so sánh một lần duy nhất",
        "en": "Playwright captures the visible state at call time, inverts the boolean, then compares it just once",
        "ja": "Playwrightは呼び出し時点でのvisible状態を取得し、真偽値を反転させて一度だけ比較する"
      },
      {
        "vi": "Playwright tự động xoá phần tử loadingSpinner khỏi DOM để assertion luôn pass",
        "en": "Playwright automatically removes the loadingSpinner element from the DOM so the assertion always passes",
        "ja": "アサーションが常にパスするよう、Playwrightがloading Spinner要素を自動的にDOMから削除する"
      },
      {
        "vi": ".not() làm assertion mất khả năng retry, biến nó thành kiểm tra tĩnh",
        "en": "Using .not() removes the assertion's ability to retry, turning it into a static check",
        "ja": ".not()を使うとアサーションはリトライ機能を失い、静的なチェックになる"
      },
      {
        "vi": "Playwright liên tục poll trạng thái visible của locator cho đến khi nó KHÔNG còn visible (hoặc bị gỡ khỏi DOM) hoặc hết timeout, tương tự cơ chế retry của các web-first assertion khác kết hợp với .not",
        "en": "Playwright continuously polls the locator's visible state until it is NOT visible anymore (or removed from the DOM) or the timeout expires, the same retrying mechanism as other web-first assertions combined with .not",
        "ja": "Playwrightはロケーターのvisible状態を、visibleでなくなる（またはDOMから削除される）か、タイムアウトになるまで継続的にポーリングする。これは他のweb-firstアサーションと.notを組み合わせた場合と同じリトライ機構である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": ".not kết hợp với web-first assertion vẫn giữ nguyên cơ chế polling, chỉ đảo điều kiện dừng — rất hữu ích để chờ một phần tử biến mất thay vì xuất hiện.",
      "en": ".not combined with a web-first assertion preserves the same polling mechanism, only inverting the stop condition — very useful for waiting until an element disappears rather than appears.",
      "ja": ".notをweb-firstアサーションと組み合わせても同じポーリング機構は保たれ、停止条件が反転するだけです。要素が出現するのではなく消えるのを待つ際に非常に有用です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So với việc dùng try/catch bọc quanh nhiều lệnh page.$() và tự viết vòng lặp retry thủ công, lợi ích chính của web-first assertions là gì?",
      "en": "Compared to wrapping multiple page.$() calls in try/catch and writing manual retry loops, what is the main benefit of web-first assertions?",
      "ja": "複数のpage.$()呼び出しをtry/catchで囲み、手動でリトライループを書く方法と比べて、web-firstアサーションの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Chúng cung cấp cơ chế retry/polling chuẩn hoá, thông báo lỗi rõ ràng khi timeout, và code test ngắn gọn dễ đọc hơn nhiều so với tự viết logic retry lặp lại ở nhiều nơi",
        "en": "They provide a standardized retry/polling mechanism, clear error messages on timeout, and much more concise, readable test code than hand-rolled retry logic scattered across many places",
        "ja": "標準化されたリトライ／ポーリング機構を提供し、タイムアウト時に明確なエラーメッセージを出し、あちこちに手書きのリトライロジックを書くよりもテストコードがはるかに簡潔で読みやすくなる"
      },
      {
        "vi": "Chúng chạy nhanh hơn vì bỏ qua hoàn toàn việc kiểm tra điều kiện",
        "en": "They run faster because they skip condition checking entirely",
        "ja": "条件チェックを完全に省略するため実行が速い"
      },
      {
        "vi": "Chúng không cần await vì luôn đồng bộ",
        "en": "They never need await because they are always synchronous",
        "ja": "常に同期的であるためawaitが不要である"
      },
      {
        "vi": "Chúng thay thế hoàn toàn nhu cầu dùng Page Object Model",
        "en": "They completely eliminate the need for a Page Object Model",
        "ja": "Page Object Modelを使う必要を完全になくす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Web-first assertions đóng gói sẵn logic polling, timeout, và thông báo lỗi hữu ích (kèm snapshot trạng thái), giúp giảm code lặp và giảm flaky test so với việc tự viết retry thủ công rải rác.",
      "en": "Web-first assertions bundle polling logic, timeout handling, and helpful error messages (with a state snapshot), reducing repetitive code and flakiness compared to scattered hand-written retries.",
      "ja": "web-firstアサーションはポーリングロジック、タイムアウト処理、有用なエラーメッセージ（状態のスナップショット付き）をあらかじめまとめており、あちこちに手書きしたリトライに比べてコードの重複とフレーキーさを減らします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "expect(imageLocator).toHaveAttribute('src', /\\.png$/) hữu ích trong tình huống nào?",
      "en": "When is expect(imageLocator).toHaveAttribute('src', /\\.png$/) useful?",
      "ja": "expect(imageLocator).toHaveAttribute('src', /\\.png$/)はどのような場面で有用ですか。"
    },
    "options": [
      {
        "vi": "Khi cần kiểm tra kích thước file ảnh tính bằng byte",
        "en": "When you need to check the image file size in bytes",
        "ja": "画像ファイルのサイズ（バイト数）を確認したい場合"
      },
      {
        "vi": "Khi cần chờ và xác nhận thuộc tính HTML src của ảnh khớp một pattern, đặc biệt khi src được set bất đồng bộ sau khi ảnh load xong (ví dụ qua lazy-loading)",
        "en": "When you need to wait for and confirm the HTML src attribute of an image matches a pattern, especially when src is set asynchronously after the image finishes loading (e.g. lazy-loading)",
        "ja": "画像のHTML src属性がパターンに一致することを待って確認したい場合、特にsrcが画像読み込み完了後に非同期で（例えば遅延読み込みで）設定される場合"
      },
      {
        "vi": "Khi cần kiểm tra độ phân giải màn hình của thiết bị test",
        "en": "When you need to check the screen resolution of the testing device",
        "ja": "テスト端末の画面解像度を確認したい場合"
      },
      {
        "vi": "Khi cần đổi giá trị thuộc tính src của ảnh",
        "en": "When you need to change the image's src attribute value",
        "ja": "画像のsrc属性の値を変更したい場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "toHaveAttribute là web-first assertion cho thuộc tính HTML, tự động retry cho đến khi giá trị attribute khớp chuỗi hoặc regex mong đợi, phù hợp với các attribute được cập nhật động.",
      "en": "toHaveAttribute is a web-first assertion for HTML attributes, auto-retrying until the attribute value matches the expected string or regex, well-suited to dynamically updated attributes.",
      "ja": "toHaveAttributeはHTML属性向けのweb-firstアサーションであり、属性値が期待する文字列や正規表現に一致するまで自動的にリトライするため、動的に更新される属性に適しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sự khác biệt chính giữa await locator.waitFor({ state: 'visible' }) và await expect(locator).toBeVisible() là gì?",
      "en": "What is the key difference between await locator.waitFor({ state: 'visible' }) and await expect(locator).toBeVisible()?",
      "ja": "await locator.waitFor({ state: 'visible' })とawait expect(locator).toBeVisible()の主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "waitFor() không có timeout còn expect().toBeVisible() luôn có timeout vô hạn",
        "en": "waitFor() has no timeout while expect().toBeVisible() always has an infinite timeout",
        "ja": "waitFor()にはタイムアウトがなく、expect().toBeVisible()は常に無限のタイムアウトを持つ"
      },
      {
        "vi": "Hai API này hoàn toàn giống nhau, dùng cái nào cũng như nhau",
        "en": "The two APIs are completely identical; using either makes no difference",
        "ja": "この2つのAPIは完全に同一であり、どちらを使っても違いはない"
      },
      {
        "vi": "waitFor() chỉ chờ trạng thái mà không assert/throw kèm thông báo so sánh kỳ vọng — nó là công cụ chờ, còn expect().toBeVisible() vừa chờ vừa là một assertion thất bại sẽ làm fail test với thông báo rõ ràng",
        "en": "waitFor() only waits for a state without producing an assertion/expectation-style failure message — it is purely a waiting utility, while expect().toBeVisible() both waits and acts as an assertion that fails the test with a clear message",
        "ja": "waitFor()は状態を待つだけでアサーション／期待値の比較メッセージを出さない、単なる待機ユーティリティであるのに対し、expect().toBeVisible()は待機すると同時にアサーションとして機能し、失敗時に明確なメッセージでテストを失敗させる"
      },
      {
        "vi": "waitFor() chỉ dùng được với Page, expect().toBeVisible() chỉ dùng được với Locator",
        "en": "waitFor() can only be used with Page, while expect().toBeVisible() can only be used with Locator",
        "ja": "waitFor()はPageでしか使えず、expect().toBeVisible()はLocatorでしか使えない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "waitFor() là một helper chờ đơn thuần (đôi khi dùng khi cần chờ điều kiện mà không cần gắn semantics assertion), còn expect(locator).toBeVisible() vừa đóng vai trò assertion trong báo cáo test, tạo thông báo lỗi chi tiết khi thất bại.",
      "en": "waitFor() is a plain waiting helper (sometimes used when a condition needs waiting without assertion semantics), while expect(locator).toBeVisible() also functions as an assertion in the test report, producing detailed failure messages.",
      "ja": "waitFor()は単なる待機ヘルパーです（アサーションの意味を持たせずに条件を待ちたい場合に使うことがあります）。一方expect(locator).toBeVisible()はテストレポート上でアサーションとしても機能し、失敗時に詳細なエラーメッセージを生成します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một nút button chuyển từ class \"btn-loading\" sang \"btn-success\" sau khi gọi API bất đồng bộ hoàn tất. Cách kiểm tra web-first đúng nhất là gì?",
      "en": "A button transitions its class from \"btn-loading\" to \"btn-success\" once an async API call completes. What is the correct web-first way to verify this?",
      "ja": "非同期API呼び出しが完了すると、ボタンのクラスが「btn-loading」から「btn-success」に変わります。これを検証する正しいweb-first的な方法はどれですか。"
    },
    "options": [
      {
        "vi": "const cls = await button.getAttribute('class'); expect(cls).toContain('btn-success') — đọc một lần rồi so sánh tĩnh",
        "en": "const cls = await button.getAttribute('class'); expect(cls).toContain('btn-success') — read once then compare statically",
        "ja": "const cls = await button.getAttribute('class'); expect(cls).toContain('btn-success') — 一度読み取ってから静的に比較する"
      },
      {
        "vi": "console.log(await button.getAttribute('class')) để xem bằng mắt",
        "en": "console.log(await button.getAttribute('class')) to visually inspect it",
        "ja": "console.log(await button.getAttribute('class'))で目視確認する"
      },
      {
        "vi": "await page.waitForTimeout(5000) rồi kiểm tra bằng if/else thủ công",
        "en": "await page.waitForTimeout(5000) then check manually with if/else",
        "ja": "await page.waitForTimeout(5000)の後、if/elseで手動に確認する"
      },
      {
        "vi": "await expect(button).toHaveClass(/btn-success/) — assertion tự động retry cho đến khi class cập nhật đúng hoặc hết timeout",
        "en": "await expect(button).toHaveClass(/btn-success/) — an assertion that auto-retries until the class updates correctly or the timeout expires",
        "ja": "await expect(button).toHaveClass(/btn-success/) — クラスが正しく更新されるかタイムアウトになるまで自動的にリトライするアサーション"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "toHaveClass là web-first assertion, tự retry lại việc đọc class cho đến khi khớp regex/kỳ vọng, tránh việc đọc class quá sớm khi API chưa trả về xong.",
      "en": "toHaveClass is a web-first assertion that retries reading the class until it matches the expected regex, avoiding reading the class too early before the API resolves.",
      "ja": "toHaveClassはweb-firstアサーションであり、期待する正規表現に一致するまでクラスの読み取りを繰り返します。APIがまだ完了していない段階で早くクラスを読んでしまうことを防げます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một danh sách sản phẩm tải thêm item khi cuộn (infinite scroll) bằng JS bất đồng bộ. Cách nào phù hợp để kiểm tra số lượng item hiển thị đã tăng lên 20 sau khi cuộn?",
      "en": "A product list loads more items on scroll (infinite scroll) via async JS. What is the appropriate way to check the visible item count has grown to 20 after scrolling?",
      "ja": "商品リストが非同期JSによる無限スクロールで追加アイテムを読み込みます。スクロール後に表示アイテム数が20件に増えたことを確認する適切な方法はどれですか。"
    },
    "options": [
      {
        "vi": "await expect(productItems).toHaveCount(20) — tự động chờ và đếm lại số phần tử khớp locator cho đến khi đủ 20 hoặc hết timeout",
        "en": "await expect(productItems).toHaveCount(20) — automatically waits and recounts matching elements until there are 20 or the timeout expires",
        "ja": "await expect(productItems).toHaveCount(20) — 20件になるかタイムアウトになるまで自動的に待機し、一致する要素数を数え直す"
      },
      {
        "vi": "const items = await productItems.all(); expect(items.length).toBe(20) — lấy snapshot ngay lập tức rồi so sánh",
        "en": "const items = await productItems.all(); expect(items.length).toBe(20) — take an immediate snapshot then compare",
        "ja": "const items = await productItems.all(); expect(items.length).toBe(20) — 即座にスナップショットを取ってから比較する"
      },
      {
        "vi": "page.reload() rồi đếm lại từ đầu",
        "en": "page.reload() then recount from the beginning",
        "ja": "page.reload()してから最初から数え直す"
      },
      {
        "vi": "Dùng document.querySelectorAll trong evaluate() để đếm ngay tại thời điểm gọi",
        "en": "Use document.querySelectorAll inside evaluate() to count immediately at call time",
        "ja": "evaluate()内でdocument.querySelectorAllを使い、呼び出し時点で即座に数える"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "toHaveCount là web-first assertion, retry đếm lại số phần tử khớp cho đến khi đủ số lượng mong đợi, rất phù hợp với danh sách được load động, tránh đếm quá sớm khi item mới chưa kịp render.",
      "en": "toHaveCount is a web-first assertion that retries counting matched elements until the expected number is reached, well-suited to dynamically loaded lists, avoiding counting too early before new items render.",
      "ja": "toHaveCountはweb-firstアサーションであり、期待する数に達するまで一致する要素数を数え直します。動的に読み込まれるリストに適しており、新しいアイテムがまだレンダリングされていない段階で早く数えてしまうことを防ぎます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một framework SPA render lại (re-render) toàn bộ danh sách khiến phần tử DOM cũ bị gỡ và thay bằng phần tử mới có cùng nội dung (React key thay đổi). Locator lấy trước đó có còn dùng được để click sau khi re-render không?",
      "en": "An SPA framework re-renders an entire list, causing the old DOM element to be removed and replaced by a new one with the same content (React key changed). Is a locator obtained earlier still usable to click after the re-render?",
      "ja": "SPAフレームワークがリスト全体を再レンダリングし、古いDOM要素が削除されて同じ内容の新しい要素に置き換わる（Reactのkeyが変わる）とします。再レンダリング後も、以前取得したロケーターはクリックに使えますか。"
    },
    "options": [
      {
        "vi": "Không, vì Playwright cache tham chiếu phần tử DOM một lần duy nhất khi tạo locator",
        "en": "No, because Playwright caches the DOM element reference only once when the locator is created",
        "ja": "いいえ、Playwrightはロケーター作成時に一度だけDOM要素の参照をキャッシュするため使えません"
      },
      {
        "vi": "Có, vì Playwright locator là lazy — mỗi lần dùng nó sẽ resolve lại phần tử trong DOM tại thời điểm đó, nên vẫn tự động tìm và tương tác đúng phần tử mới nếu selector còn khớp",
        "en": "Yes, because a Playwright locator is lazy — each time it is used it re-resolves the element in the DOM at that moment, so it will correctly find and interact with the new element as long as the selector still matches",
        "ja": "はい、Playwrightのロケーターは遅延評価であり、使用するたびにその時点のDOMで要素を再解決するため、セレクターが引き続き一致すれば新しい要素を自動的に見つけて正しく操作できます"
      },
      {
        "vi": "Chỉ dùng được nếu gọi lại page.reload() trước",
        "en": "It only works if page.reload() is called first",
        "ja": "事前にpage.reload()を呼んだ場合にのみ使用できます"
      },
      {
        "vi": "Chỉ dùng được với locator tạo bằng page.$() (ElementHandle), không dùng được với Locator API",
        "en": "It only works with locators created via page.$() (ElementHandle), not the Locator API",
        "ja": "page.$()で作成したロケーター（ElementHandle）でのみ動作し、Locator APIでは動作しません"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây là ưu điểm cốt lõi của Locator API so với ElementHandle cũ: locator không giữ tham chiếu DOM cố định mà resolve lại mỗi khi thao tác, kết hợp với auto-waiting giúp xử lý tốt các trường hợp re-render.",
      "en": "This is the core advantage of the Locator API over the legacy ElementHandle: a locator holds no fixed DOM reference but re-resolves on every action, which combined with auto-waiting handles re-renders gracefully.",
      "ja": "これは従来のElementHandleに対するLocator APIの中核的な利点です。ロケーターは固定のDOM参照を保持せず、操作のたびに再解決するため、オートウェイトと組み合わさって再レンダリングにうまく対応できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Auto-waiting của Playwright áp dụng cho hầu hết các action, nhưng phương thức nào sau đây thường KHÔNG chạy đầy đủ actionability checks như click/fill?",
      "en": "Playwright's auto-waiting applies to most actions, but which of the following typically does NOT run the full actionability checks like click/fill do?",
      "ja": "Playwrightのオートウェイトはほとんどのアクションに適用されますが、次のうちclickやfillのような完全なアクショナビリティチェックを通常実行しないのはどれですか。"
    },
    "options": [
      {
        "vi": "locator.click()",
        "en": "locator.click()",
        "ja": "locator.click()"
      },
      {
        "vi": "locator.fill('text')",
        "en": "locator.fill('text')",
        "ja": "locator.fill('text')"
      },
      {
        "vi": "locator.evaluate(el => el.scrollIntoView()) — chạy JS trực tiếp trên phần tử, không đi qua actionability checks đầy đủ như một user action thật",
        "en": "locator.evaluate(el => el.scrollIntoView()) — runs JS directly on the element, bypassing the full actionability checks a real user action would go through",
        "ja": "locator.evaluate(el => el.scrollIntoView()) — 要素に対して直接JSを実行するため、実際のユーザーアクションが通るような完全なアクショナビリティチェックを経由しない"
      },
      {
        "vi": "locator.check()",
        "en": "locator.check()",
        "ja": "locator.check()"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "evaluate() thực thi JS tuỳ ý trong ngữ cảnh trang, không mô phỏng hành vi người dùng nên không áp dụng actionability checks như visible/stable/enabled — cần cẩn trọng vì nó có thể thao tác cả phần tử ẩn.",
      "en": "evaluate() runs arbitrary JS in the page context rather than simulating user behavior, so it does not apply actionability checks like visible/stable/enabled — caution is needed since it can manipulate even hidden elements.",
      "ja": "evaluate()はユーザー操作を模倣するのではなく、ページのコンテキストで任意のJSを実行するため、visible/stable/enabledといったアクショナビリティチェックは適用されません。非表示の要素even操作できてしまうため注意が必要です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào sau đây về expect.soft là ĐÚNG khi dùng trong một chuỗi nhiều assertion kiểm tra layout của trang (nhiều phần tử khác nhau)?",
      "en": "Which statement about expect.soft is TRUE when used in a chain of multiple assertions checking a page's layout (different elements)?",
      "ja": "ページのレイアウト（複数の異なる要素）を検証する一連の複数アサーションでexpect.softを使う場合、正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "Nếu assertion soft đầu tiên fail, các soft assertion tiếp theo trong cùng test sẽ không chạy nữa",
        "en": "If the first soft assertion fails, subsequent soft assertions in the same test will not run",
        "ja": "最初のsoft assertionが失敗すると、同じテスト内の以降のsoft assertionは実行されなくなる"
      },
      {
        "vi": "expect.soft tự động bỏ qua timeout, chạy vô hạn cho đến khi đúng",
        "en": "expect.soft automatically ignores timeout and runs indefinitely until true",
        "ja": "expect.softはタイムアウトを自動的に無視し、正しくなるまで無限に実行される"
      },
      {
        "vi": "expect.soft không thể dùng cho web-first assertions, chỉ dùng cho giá trị tĩnh",
        "en": "expect.soft cannot be used with web-first assertions, only static values",
        "ja": "expect.softはweb-firstアサーションには使えず、静的な値にしか使えない"
      },
      {
        "vi": "Tất cả soft assertions vẫn được chạy hết dù cái trước đó fail, và cuối test Playwright sẽ tổng hợp báo cáo toàn bộ lỗi soft đã ghi nhận, giúp phát hiện nhiều vấn đề layout trong một lần chạy thay vì dừng ở lỗi đầu tiên",
        "en": "All soft assertions still run even if an earlier one failed, and at the end Playwright reports the full set of recorded soft failures, helping surface multiple layout issues in a single run instead of stopping at the first failure",
        "ja": "以前のものが失敗しても、すべてのsoft assertionは実行され続け、テストの最後にPlaywrightは記録されたsoft failureをまとめて報告する。これにより最初の失敗で止まらず、1回の実行で複数のレイアウト問題を発見できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Giá trị của soft assertions nằm ở việc thu thập nhiều lỗi trong một lần chạy test thay vì dừng ngay ở lỗi đầu tiên như hard assertion, rất hữu ích khi kiểm tra nhiều phần tử layout độc lập cùng lúc.",
      "en": "The value of soft assertions is collecting multiple failures in one test run rather than stopping at the first one like hard assertions, very useful when checking many independent layout elements at once.",
      "ja": "soft assertionの価値は、hard assertionのように最初の失敗で止まるのではなく、1回のテスト実行で複数の失敗を収集できる点にあります。独立した多数のレイアウト要素を一度に検証する際に非常に有用です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, để tạo một fixture tùy chỉnh (custom fixture) dùng chung cho nhiều test, ta sử dụng API nào?",
      "en": "In Playwright, which API is used to create a custom fixture shared across multiple tests?",
      "ja": "Playwrightで、複数のテストで共有するカスタムフィクスチャを作成するにはどのAPIを使いますか。"
    },
    "options": [
      {
        "vi": "test.extend()",
        "en": "test.extend()",
        "ja": "test.extend()"
      },
      {
        "vi": "test.use()",
        "en": "test.use()",
        "ja": "test.use()"
      },
      {
        "vi": "test.beforeEach()",
        "en": "test.beforeEach()",
        "ja": "test.beforeEach()"
      },
      {
        "vi": "page.fixture()",
        "en": "page.fixture()",
        "ja": "page.fixture()"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "test.extend() cho phép định nghĩa fixture mới và mở rộng đối tượng test cơ bản để dùng chung trong nhiều file test.",
      "en": "test.extend() lets you define new fixtures and extend the base test object for reuse across test files.",
      "ja": "test.extend()は新しいフィクスチャを定義し、ベースのtestオブジェクトを拡張して複数のテストファイルで再利用できるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Fixture có scope 'worker' trong Playwright nghĩa là gì?",
      "en": "What does a fixture with 'worker' scope mean in Playwright?",
      "ja": "Playwrightにおける'worker'スコープのフィクスチャとは何を意味しますか。"
    },
    "options": [
      {
        "vi": "Fixture được khởi tạo lại cho mỗi test case",
        "en": "The fixture is re-initialized for every test case",
        "ja": "フィクスチャはテストケースごとに再初期化される"
      },
      {
        "vi": "Fixture được khởi tạo một lần cho mỗi worker process và dùng chung cho các test chạy trong worker đó",
        "en": "The fixture is initialized once per worker process and shared by tests running in that worker",
        "ja": "フィクスチャはワーカープロセスごとに一度だけ初期化され、そのワーカー内で実行されるテストで共有される"
      },
      {
        "vi": "Fixture chỉ chạy khi có lỗi",
        "en": "The fixture only runs when there is a failure",
        "ja": "フィクスチャは失敗時にのみ実行される"
      },
      {
        "vi": "Fixture chỉ áp dụng cho browser Chromium",
        "en": "The fixture only applies to the Chromium browser",
        "ja": "フィクスチャはChromiumブラウザにのみ適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scope 'worker' giúp tái sử dụng tài nguyên tốn kém (như đăng nhập) giữa nhiều test trong cùng worker, tránh khởi tạo lại nhiều lần.",
      "en": "Worker scope allows reusing expensive resources (like logging in) across tests sharing the same worker, avoiding repeated setup.",
      "ja": "workerスコープはログインなどコストの高いリソースを同じワーカー内の複数テストで再利用でき、毎回の再作成を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong playwright.config.ts, thuộc tính nào dùng để chỉ định thư mục chứa các file test?",
      "en": "In playwright.config.ts, which property specifies the directory containing test files?",
      "ja": "playwright.config.tsで、テストファイルを含むディレクトリを指定するプロパティはどれですか。"
    },
    "options": [
      {
        "vi": "testMatch",
        "en": "testMatch",
        "ja": "testMatch"
      },
      {
        "vi": "outputDir",
        "en": "outputDir",
        "ja": "outputDir"
      },
      {
        "vi": "testDir",
        "en": "testDir",
        "ja": "testDir"
      },
      {
        "vi": "rootDir",
        "en": "rootDir",
        "ja": "rootDir"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "testDir xác định thư mục gốc mà Playwright sẽ quét để tìm các file test.",
      "en": "testDir defines the root directory Playwright scans to discover test files.",
      "ja": "testDirはPlaywrightがテストファイルを探索する際の基点となるディレクトリを定義します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Mảng 'projects' trong playwright.config.ts thường được dùng để làm gì?",
      "en": "What is the 'projects' array in playwright.config.ts commonly used for?",
      "ja": "playwright.config.tsの'projects'配列は一般的に何のために使われますか。"
    },
    "options": [
      {
        "vi": "Cấu hình reporter HTML",
        "en": "Configuring the HTML reporter",
        "ja": "HTMLレポーターを設定するため"
      },
      {
        "vi": "Chia nhỏ test theo tên file",
        "en": "Splitting tests by file name",
        "ja": "ファイル名でテストを分割するため"
      },
      {
        "vi": "Định nghĩa các fixture toàn cục",
        "en": "Defining global fixtures",
        "ja": "グローバルフィクスチャを定義するため"
      },
      {
        "vi": "Chạy cùng bộ test trên nhiều trình duyệt hoặc cấu hình khác nhau (Chromium, Firefox, WebKit, mobile viewport...)",
        "en": "Running the same test suite across multiple browsers or configurations (Chromium, Firefox, WebKit, mobile viewport...)",
        "ja": "同じテストスイートを複数のブラウザや設定（Chromium、Firefox、WebKit、モバイルビューポートなど）で実行するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi project có thể có block 'use' riêng (browser, viewport...) cho phép chạy cùng bộ test trên nhiều môi trường song song.",
      "en": "Each project can have its own 'use' block (browser, viewport...), letting the same suite run across multiple environments in parallel.",
      "ja": "各projectは独自のuseブロック（ブラウザやビューポートなど）を持てるため、同じスイートを複数環境で並列実行できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tùy chọn 'fullyParallel: true' trong playwright.config.ts có tác dụng gì?",
      "en": "What does the 'fullyParallel: true' option do in playwright.config.ts?",
      "ja": "playwright.config.tsの'fullyParallel: true'オプションは何をしますか。"
    },
    "options": [
      {
        "vi": "Cho phép các test trong CÙNG một file cũng chạy song song với nhau, thay vì chỉ song song giữa các file",
        "en": "Allows tests within the SAME file to also run in parallel with each other, instead of only parallelizing across files",
        "ja": "同じファイル内のテスト同士も並列実行できるようにする（デフォルトはファイル間のみ並列）"
      },
      {
        "vi": "Bắt buộc tất cả test chạy tuần tự",
        "en": "Forces all tests to run sequentially",
        "ja": "すべてのテストを逐次実行させる"
      },
      {
        "vi": "Tự động retry test thất bại 3 lần",
        "en": "Automatically retries failed tests 3 times",
        "ja": "失敗したテストを自動的に3回再試行する"
      },
      {
        "vi": "Chỉ chạy test trên trình duyệt headless",
        "en": "Only runs tests in headless browser mode",
        "ja": "ヘッドレスブラウザでのみテストを実行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mặc định Playwright chạy song song giữa các file nhưng tuần tự trong cùng file; fullyParallel bật song song ở cấp từng test.",
      "en": "By default Playwright parallelizes across files but runs tests within a file sequentially; fullyParallel enables parallelism at the individual test level.",
      "ja": "デフォルトではファイル間は並列、ファイル内は逐次ですが、fullyParallelを有効にするとテスト単位でも並列化されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'workers' trong playwright.config.ts kiểm soát điều gì?",
      "en": "What does the 'workers' property in playwright.config.ts control?",
      "ja": "playwright.config.tsの'workers'プロパティは何を制御しますか。"
    },
    "options": [
      {
        "vi": "Số lần retry khi test fail",
        "en": "The number of retries when a test fails",
        "ja": "テスト失敗時の再試行回数"
      },
      {
        "vi": "Số lượng process song song tối đa dùng để chạy test",
        "en": "The maximum number of parallel processes used to run tests",
        "ja": "テスト実行に使用される並列プロセスの最大数"
      },
      {
        "vi": "Số trình duyệt được cài đặt",
        "en": "The number of browsers installed",
        "ja": "インストールされるブラウザの数"
      },
      {
        "vi": "Thời gian timeout của mỗi test",
        "en": "The timeout duration of each test",
        "ja": "各テストのタイムアウト時間"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "workers xác định mức độ song song hóa, thường giảm xuống 1 trên CI để tránh xung đột tài nguyên.",
      "en": "workers determines the degree of parallelism, often reduced to 1 on CI to avoid resource contention.",
      "ja": "workersは並列度を決定し、リソース競合を避けるためCIでは1に減らすことがよくあります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong playwright.config.ts, block 'use: {}' dùng để làm gì?",
      "en": "In playwright.config.ts, what is the 'use: {}' block for?",
      "ja": "playwright.config.tsの'use: {}'ブロックは何のためにありますか。"
    },
    "options": [
      {
        "vi": "Import các thư viện phụ thuộc",
        "en": "Importing dependency libraries",
        "ja": "依存ライブラリをインポートするため"
      },
      {
        "vi": "Định nghĩa route mock API",
        "en": "Defining mocked API routes",
        "ja": "APIのモックルートを定義するため"
      },
      {
        "vi": "Đặt giá trị mặc định cho các tuỳ chọn context/browser như baseURL, viewport, headless áp dụng cho mọi test",
        "en": "Setting default context/browser options like baseURL, viewport, headless that apply to all tests",
        "ja": "baseURLやviewport、headlessなど、すべてのテストに適用されるコンテキスト/ブラウザのデフォルトオプションを設定するため"
      },
      {
        "vi": "Khai báo biến môi trường CI",
        "en": "Declaring CI environment variables",
        "ja": "CI環境変数を宣言するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "use{} chứa các default option được truyền vào browser context khi tạo test, có thể override ở từng project hoặc file.",
      "en": "use{} holds default options passed to the browser context when creating tests, which can be overridden per project or file.",
      "ja": "use{}はテスト作成時にブラウザコンテキストへ渡されるデフォルトオプションを保持し、project単位やファイル単位で上書きできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn 'globalSetup' trong playwright.config.ts phù hợp nhất cho tình huống nào?",
      "en": "When is the 'globalSetup' option in playwright.config.ts most appropriate?",
      "ja": "playwright.config.tsの'globalSetup'オプションはどのような場面に最も適していますか。"
    },
    "options": [
      {
        "vi": "Cấu hình proxy cho từng project riêng lẻ",
        "en": "Configuring proxy settings for each individual project",
        "ja": "各projectごとに個別にプロキシを設定する場合"
      },
      {
        "vi": "Chạy lại trước mỗi test case",
        "en": "Running again before every test case",
        "ja": "各テストケースの前に毎回実行する場合"
      },
      {
        "vi": "Tạo báo cáo HTML sau khi test xong",
        "en": "Generating an HTML report after tests finish",
        "ja": "テスト終了後にHTMLレポートを生成する場合"
      },
      {
        "vi": "Chạy một lần logic chuẩn bị trước toàn bộ test suite, ví dụ tạo dữ liệu hoặc đăng nhập lấy storageState",
        "en": "Running preparation logic once before the entire test suite, e.g. seeding data or logging in to capture storageState",
        "ja": "データの準備やログインしてstorageStateを取得するなど、テストスイート全体の前に一度だけ準備処理を実行する場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "globalSetup chạy một lần duy nhất trước khi toàn bộ test suite bắt đầu, thích hợp chuẩn bị trạng thái chung như dữ liệu hoặc phiên đăng nhập.",
      "en": "globalSetup runs exactly once before the whole suite starts, ideal for preparing shared state like seed data or a login session.",
      "ja": "globalSetupはスイート全体の開始前に一度だけ実行され、共有データやログインセッションなど共通状態の準備に適しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Fixture có thuộc tính { auto: true } trong test.extend() hoạt động như thế nào?",
      "en": "How does a fixture with { auto: true } in test.extend() behave?",
      "ja": "test.extend()で{ auto: true }が指定されたフィクスチャはどのように動作しますか。"
    },
    "options": [
      {
        "vi": "Tự động chạy cho mọi test dù test đó không khai báo tham số sử dụng fixture",
        "en": "It automatically runs for every test even if that test does not declare the fixture as a parameter",
        "ja": "テストがフィクスチャをパラメータとして宣言していなくても、すべてのテストで自動的に実行される"
      },
      {
        "vi": "Chỉ chạy khi được truyền tham số rõ ràng vào hàm test",
        "en": "It only runs when explicitly passed as a parameter to the test function",
        "ja": "テスト関数に明示的にパラメータとして渡されたときのみ実行される"
      },
      {
        "vi": "Tự động retry khi fixture lỗi",
        "en": "It automatically retries when the fixture fails",
        "ja": "フィクスチャが失敗した場合に自動的に再試行する"
      },
      {
        "vi": "Tự động đóng browser sau mỗi test",
        "en": "It automatically closes the browser after every test",
        "ja": "各テストの後にブラウザを自動的に閉じる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Fixture auto:true được kích hoạt ngầm cho mọi test trong phạm vi áp dụng, không cần khai báo tham số sử dụng.",
      "en": "An auto:true fixture is implicitly activated for every test in scope, without needing to be declared as a parameter.",
      "ja": "auto:trueのフィクスチャは適用範囲内のすべてのテストで暗黙的に有効化され、パラメータとして宣言する必要はありません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, thuộc tính 'dependencies' của một project (ví dụ project 'chromium' phụ thuộc project 'setup') dùng để làm gì?",
      "en": "In Playwright, what is the 'dependencies' property of a project (e.g. project 'chromium' depending on project 'setup') used for?",
      "ja": "Playwrightにおいて、あるprojectの'dependencies'プロパティ（例：project 'chromium'がproject 'setup'に依存する）は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Cài đặt các package npm cần thiết",
        "en": "Installing required npm packages",
        "ja": "必要なnpmパッケージをインストールするため"
      },
      {
        "vi": "Đảm bảo project 'setup' chạy xong trước, thường dùng để đăng nhập và lưu storageState trước khi project chính chạy",
        "en": "Ensuring the 'setup' project finishes first, commonly used to log in and save storageState before the main project runs",
        "ja": "'setup'プロジェクトを先に完了させ、メインプロジェクト実行前にログインしてstorageStateを保存するために使われることが多い"
      },
      {
        "vi": "Chỉ định browser engine sử dụng",
        "en": "Specifying which browser engine to use",
        "ja": "使用するブラウザエンジンを指定するため"
      },
      {
        "vi": "Giới hạn số lượng test tối đa",
        "en": "Limiting the maximum number of tests",
        "ja": "テストの最大数を制限するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "dependencies cho phép một project chạy trước như bước chuẩn bị (login, seed data) rồi mới chạy các project phụ thuộc vào nó.",
      "en": "dependencies lets one project run first as a preparation step (login, seed data) before projects that depend on it execute.",
      "ja": "dependenciesにより、あるprojectを準備ステップ（ログインやデータ投入）として先に実行し、それに依存する他のprojectを後で実行できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn command line '--shard=1/3' khi chạy 'npx playwright test' dùng để làm gì?",
      "en": "What does the command-line option '--shard=1/3' do when running 'npx playwright test'?",
      "ja": "'npx playwright test'実行時のコマンドラインオプション'--shard=1/3'は何をしますか。"
    },
    "options": [
      {
        "vi": "Chỉ chạy test số 1 trong 3 lần thử",
        "en": "Only runs test number 1 out of 3 attempts",
        "ja": "3回の試行のうち1回目のテストのみ実行する"
      },
      {
        "vi": "Giới hạn số worker tối đa là 3",
        "en": "Limits the maximum number of workers to 3",
        "ja": "ワーカー数の上限を3に制限する"
      },
      {
        "vi": "Chia bộ test thành nhiều phần để chạy song song trên nhiều máy CI khác nhau",
        "en": "Splits the test suite into multiple parts to run in parallel across different CI machines",
        "ja": "テストスイートを複数の部分に分割し、複数のCIマシンで並列実行できるようにする"
      },
      {
        "vi": "Chọn trình duyệt thứ 1 trong 3 trình duyệt cấu hình",
        "en": "Selects the 1st browser out of 3 configured browsers",
        "ja": "設定された3つのブラウザのうち1番目を選択する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "--shard cho phép phân tán test suite ra nhiều máy/agent CI để tăng tốc độ chạy tổng thể.",
      "en": "--shard distributes the test suite across multiple CI machines/agents to speed up overall execution.",
      "ja": "--shardはテストスイートを複数のCIマシン/エージェントに分散させ、全体の実行時間を短縮します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi nào nên dùng test.describe.serial() trong Playwright?",
      "en": "When should test.describe.serial() be used in Playwright?",
      "ja": "Playwrightでtest.describe.serial()を使うべきなのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi muốn chạy test trên nhiều trình duyệt cùng lúc",
        "en": "When you want to run tests on multiple browsers at once",
        "ja": "複数のブラウザで同時にテストを実行したい場合"
      },
      {
        "vi": "Khi muốn các test chạy song song nhanh hơn",
        "en": "When you want tests to run faster in parallel",
        "ja": "テストをより高速に並列実行したい場合"
      },
      {
        "vi": "Khi muốn bỏ qua toàn bộ nhóm test",
        "en": "When you want to skip the entire test group",
        "ja": "テストグループ全体をスキップしたい場合"
      },
      {
        "vi": "Khi các test trong nhóm phụ thuộc lẫn nhau về trạng thái và cần chạy tuần tự theo thứ tự khai báo, dừng lại nếu một test fail",
        "en": "When tests in the group depend on each other's state and must run sequentially in declaration order, stopping if one test fails",
        "ja": "グループ内のテストが互いの状態に依存し、宣言順に逐次実行する必要があり、一つが失敗したら停止すべき場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "describe.serial buộc các test chạy tuần tự trong cùng worker, và nếu một test fail thì các test sau bị bỏ qua.",
      "en": "describe.serial forces tests to run sequentially in the same worker, and if one test fails, subsequent tests are skipped.",
      "ja": "describe.serialは同じワーカー内でテストを逐次実行させ、一つが失敗すると以降のテストはスキップされます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'retries' trong playwright.config.ts (ví dụ retries: 2) có ý nghĩa gì?",
      "en": "What does the 'retries' property in playwright.config.ts mean (e.g. retries: 2)?",
      "ja": "playwright.config.tsの'retries'プロパティ（例：retries: 2）は何を意味しますか。"
    },
    "options": [
      {
        "vi": "Tự động chạy lại một test tối đa 2 lần nữa nếu nó thất bại, trước khi báo fail cuối cùng",
        "en": "Automatically reruns a failing test up to 2 more times before reporting a final failure",
        "ja": "失敗したテストを最終的に失敗と報告する前に、最大2回まで自動的に再実行する"
      },
      {
        "vi": "Giới hạn thời gian chờ tối đa 2 giây",
        "en": "Limits the maximum wait time to 2 seconds",
        "ja": "最大待機時間を2秒に制限する"
      },
      {
        "vi": "Số lần mở lại trình duyệt",
        "en": "The number of times the browser is reopened",
        "ja": "ブラウザを再起動する回数"
      },
      {
        "vi": "Số lượng project được kích hoạt",
        "en": "The number of projects activated",
        "ja": "有効化されるprojectの数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "retries giúp giảm nhiễu do flaky test bằng cách tự động thử lại trước khi kết luận thất bại.",
      "en": "retries reduces noise from flaky tests by automatically retrying before concluding failure.",
      "ja": "retriesはフレーキーなテストによるノイズを減らすため、失敗と結論づける前に自動的に再試行します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'timeout' ở cấp cao nhất trong playwright.config.ts kiểm soát điều gì?",
      "en": "What does the top-level 'timeout' property in playwright.config.ts control?",
      "ja": "playwright.config.tsの最上位にある'timeout'プロパティは何を制御しますか。"
    },
    "options": [
      {
        "vi": "Thời gian chờ phần tử xuất hiện trong mỗi assertion",
        "en": "The wait time for an element to appear in each assertion",
        "ja": "各アサーションで要素が現れるまでの待機時間"
      },
      {
        "vi": "Thời gian tối đa cho phép một test case chạy trước khi bị đánh dấu timeout",
        "en": "The maximum time a test case is allowed to run before being marked as timed out",
        "ja": "テストケースがタイムアウトとみなされるまでに許される最大実行時間"
      },
      {
        "vi": "Thời gian khởi động server",
        "en": "The time to start up the server",
        "ja": "サーバーの起動時間"
      },
      {
        "vi": "Thời gian giữa các lần retry",
        "en": "The time between retries",
        "ja": "再試行の間隔時間"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "timeout cấp global/project quy định giới hạn tổng thời gian thực thi một test, khác với expect timeout riêng cho assertion.",
      "en": "The global/project-level timeout limits total execution time for a test, distinct from the expect timeout for assertions.",
      "ja": "グローバル/プロジェクトレベルのtimeoutはテストの総実行時間の上限を規定し、アサーション用のexpectタイムアウトとは別物です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'expect: { timeout: 10000 }' trong playwright.config.ts khác gì với 'timeout' cấp test?",
      "en": "How does 'expect: { timeout: 10000 }' in playwright.config.ts differ from the test-level 'timeout'?",
      "ja": "playwright.config.tsの'expect: { timeout: 10000 }'はテストレベルの'timeout'と何が違いますか。"
    },
    "options": [
      {
        "vi": "Nó thay thế hoàn toàn timeout của test",
        "en": "It completely replaces the test's timeout",
        "ja": "テストのタイムアウトを完全に置き換える"
      },
      {
        "vi": "Nó chỉ dùng cho fixture",
        "en": "It is only used for fixtures",
        "ja": "フィクスチャにのみ使われる"
      },
      {
        "vi": "Nó chỉ áp dụng riêng cho thời gian chờ của các lệnh expect/assertion, không phải tổng thời gian chạy cả test",
        "en": "It applies only to the wait time of expect/assertion calls, not the total execution time of the test",
        "ja": "expect／アサーション呼び出しの待機時間のみに適用され、テスト全体の実行時間には適用されない"
      },
      {
        "vi": "Nó chỉ áp dụng khi chạy trên CI",
        "en": "It only applies when running on CI",
        "ja": "CI上で実行する場合にのみ適用される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "expect.timeout kiểm soát riêng thời gian chờ tối đa của mỗi web-first assertion, độc lập với timeout tổng của test.",
      "en": "expect.timeout controls only the maximum wait time of each web-first assertion, independent of the test's overall timeout.",
      "ja": "expect.timeoutは各web-firstアサーションの最大待機時間のみを制御し、テスト全体のタイムアウトとは独立しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Hàm test.step() trong Playwright dùng để làm gì?",
      "en": "What is the test.step() function in Playwright used for?",
      "ja": "Playwrightのtest.step()関数は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua test hiện tại",
        "en": "Skipping the current test",
        "ja": "現在のテストをスキップする"
      },
      {
        "vi": "Tạo fixture mới cho test",
        "en": "Creating a new fixture for the test",
        "ja": "テスト用の新しいフィクスチャを作成する"
      },
      {
        "vi": "Định nghĩa project chạy song song",
        "en": "Defining a project to run in parallel",
        "ja": "並列実行するprojectを定義する"
      },
      {
        "vi": "Nhóm các hành động liên quan thành một bước có tên, giúp báo cáo và trace dễ đọc hơn",
        "en": "Grouping related actions into a named step, making reports and traces easier to read",
        "ja": "関連する操作を名前付きのステップにまとめ、レポートやトレースを読みやすくする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "test.step bọc một nhóm thao tác thành một bước được đặt tên, hiển thị rõ ràng trong báo cáo HTML và trace viewer.",
      "en": "test.step wraps a group of actions into a named step, shown clearly in the HTML report and trace viewer.",
      "ja": "test.stepは一連の操作を名前付きステップとしてまとめ、HTMLレポートやトレースビューアで明確に表示されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi gọi test.use({ viewport: { width: 400, height: 800 } }) ngay trong một file test, điều gì xảy ra?",
      "en": "What happens when calling test.use({ viewport: { width: 400, height: 800 } }) inside a test file?",
      "ja": "テストファイル内でtest.use({ viewport: { width: 400, height: 800 } })を呼び出すと何が起こりますか。"
    },
    "options": [
      {
        "vi": "Ghi đè giá trị mặc định của viewport chỉ cho các test trong file (hoặc describe block) đó, không ảnh hưởng file khác",
        "en": "It overrides the default viewport only for tests in that file (or describe block), without affecting other files",
        "ja": "そのファイル（またはdescribeブロック）内のテストに限りデフォルトのビューポートを上書きし、他のファイルには影響しない"
      },
      {
        "vi": "Thay đổi viewport cho toàn bộ dự án vĩnh viễn",
        "en": "It permanently changes the viewport for the entire project",
        "ja": "プロジェクト全体のビューポートが恒久的に変更される"
      },
      {
        "vi": "Gây lỗi vì không thể override cấu hình global",
        "en": "It causes an error because global config cannot be overridden",
        "ja": "グローバル設定を上書きできないためエラーになる"
      },
      {
        "vi": "Chỉ áp dụng khi chạy trên project mobile",
        "en": "It only applies when running on a mobile project",
        "ja": "モバイルprojectで実行する場合にのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "test.use() cho phép override cục bộ các option đã cấu hình trong use{} toàn cục, phạm vi giới hạn trong file/block gọi nó.",
      "en": "test.use() allows locally overriding options configured in the global use{} block, scoped to the file/block that calls it.",
      "ja": "test.use()はグローバルなuse{}で設定されたオプションを、それを呼び出したファイル/ブロックの範囲でローカルに上書きできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong khai báo custom fixture bằng async function, đoạn code SAU từ khoá 'await use(value)' có vai trò gì?",
      "en": "In an async custom fixture declaration, what role does the code AFTER 'await use(value)' play?",
      "ja": "非同期のカスタムフィクスチャ宣言において、'await use(value)'の後に書かれるコードはどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Là phần setup chạy trước test",
        "en": "It is the setup part that runs before the test",
        "ja": "テストの前に実行されるセットアップ部分である"
      },
      {
        "vi": "Là phần teardown, chạy sau khi test sử dụng fixture kết thúc, dùng để dọn dẹp tài nguyên",
        "en": "It is the teardown part, running after the test using the fixture finishes, used to clean up resources",
        "ja": "フィクスチャを使用したテストが終了した後に実行されるティアダウン部分であり、リソースの後片付けに使われる"
      },
      {
        "vi": "Không có tác dụng, chỉ để đọc code dễ hiểu hơn",
        "en": "It has no effect, it's only there for readability",
        "ja": "効果はなく、コードの可読性のためだけに存在する"
      },
      {
        "vi": "Chỉ chạy khi test bị lỗi",
        "en": "It only runs when the test fails",
        "ja": "テストが失敗した場合にのみ実行される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Code sau await use() thực thi sau khi test hoàn tất, tương tự khối cleanup, dùng để đóng kết nối hay xoá dữ liệu tạm.",
      "en": "Code after await use() executes once the test completes, functioning like a cleanup block to close connections or remove temp data.",
      "ja": "await use()の後のコードはテスト完了後に実行され、接続のクローズや一時データの削除などクリーンアップ処理として機能します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'reporter' trong playwright.config.ts (ví dụ [['html'], ['list']]) dùng để làm gì?",
      "en": "What is the 'reporter' property in playwright.config.ts (e.g. [['html'], ['list']]) used for?",
      "ja": "playwright.config.tsの'reporter'プロパティ（例：[['html'], ['list']]）は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Định nghĩa số lượng worker",
        "en": "Defining the number of workers",
        "ja": "ワーカー数を定義するため"
      },
      {
        "vi": "Chỉ định trình duyệt mặc định",
        "en": "Specifying the default browser",
        "ja": "デフォルトのブラウザを指定するため"
      },
      {
        "vi": "Cấu hình một hoặc nhiều định dạng báo cáo kết quả test được sinh ra sau khi chạy",
        "en": "Configuring one or more report formats generated after the test run",
        "ja": "テスト実行後に生成されるレポート形式を1つ以上設定するため"
      },
      {
        "vi": "Bật chế độ debug từng bước",
        "en": "Enabling step-by-step debug mode",
        "ja": "ステップごとのデバッグモードを有効にするため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "reporter cho phép kết hợp nhiều loại báo cáo (html, list, json, junit...) sinh ra đồng thời sau khi chạy test.",
      "en": "reporter allows combining multiple report types (html, list, json, junit...) generated simultaneously after the test run.",
      "ja": "reporterはhtml、list、json、junitなど複数のレポート形式を組み合わせ、テスト実行後に同時に生成できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính 'testMatch' trong playwright.config.ts hoặc trong một project được dùng để làm gì?",
      "en": "What is the 'testMatch' property in playwright.config.ts or within a project used for?",
      "ja": "playwright.config.tsまたはprojectの中にある'testMatch'プロパティは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Chọn trình duyệt headless hay headed",
        "en": "Choosing headless or headed browser mode",
        "ja": "ヘッドレスかヘッド付きかのブラウザモードを選択するため"
      },
      {
        "vi": "Đánh dấu test nào cần retry",
        "en": "Marking which tests need to be retried",
        "ja": "どのテストを再試行すべきかを示すため"
      },
      {
        "vi": "Giới hạn thời gian chạy tối đa",
        "en": "Limiting the maximum run time",
        "ja": "最大実行時間を制限するため"
      },
      {
        "vi": "Xác định pattern (glob/regex) chọn ra những file nào được coi là file test để chạy",
        "en": "Defining a pattern (glob/regex) that selects which files are considered test files to run",
        "ja": "実行対象のテストファイルとみなすファイルを選択するパターン（glob/regex）を定義するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "testMatch dùng pattern để lọc file test cần chạy, có thể cấu hình khác nhau cho từng project.",
      "en": "testMatch uses a pattern to filter which test files to run, and can be configured differently per project.",
      "ja": "testMatchはパターンを使って実行対象のテストファイルを絞り込み、project ごとに異なる設定が可能です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đoạn cấu hình 'workers: process.env.CI ? 1 : undefined' trong playwright.config.ts thể hiện thực hành phổ biến nào?",
      "en": "What common practice does the config 'workers: process.env.CI ? 1 : undefined' in playwright.config.ts represent?",
      "ja": "playwright.config.tsの'workers: process.env.CI ? 1 : undefined'という設定はどのような一般的な実践を表していますか。"
    },
    "options": [
      {
        "vi": "Giảm số worker song song xuống 1 khi chạy trên CI để tránh cạn tài nguyên/flaky, còn local thì dùng mặc định",
        "en": "Reducing parallel workers to 1 on CI to avoid resource exhaustion/flakiness, while using the default locally",
        "ja": "CI環境ではリソース枯渇やフレーキーさを避けるためワーカー数を1に減らし、ローカルではデフォルトを使う"
      },
      {
        "vi": "Vô hiệu hoá test khi chạy CI",
        "en": "Disabling tests when running on CI",
        "ja": "CI上で実行する際にテストを無効化する"
      },
      {
        "vi": "Chỉ chạy test trên máy local",
        "en": "Only running tests on the local machine",
        "ja": "ローカルマシンでのみテストを実行する"
      },
      {
        "vi": "Bắt buộc luôn chạy song song tối đa dù ở CI hay local",
        "en": "Forcing maximum parallelism always, whether on CI or locally",
        "ja": "CIでもローカルでも常に最大並列度で実行させる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nhiều CI runner có tài nguyên giới hạn nên giảm workers giúp test ổn định hơn, trong khi local có thể tận dụng nhiều lõi CPU.",
      "en": "Many CI runners have limited resources, so reducing workers improves test stability, while local machines can leverage more CPU cores.",
      "ja": "多くのCIランナーはリソースが限られているためワーカー数を減らすことでテストが安定し、ローカルでは複数のCPUコアを活用できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sự khác biệt chính giữa test.skip() và test.fixme() trong Playwright là gì?",
      "en": "What is the main difference between test.skip() and test.fixme() in Playwright?",
      "ja": "Playwrightにおけるtest.skip()とtest.fixme()の主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Chúng hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are completely identical, only differing in name",
        "ja": "両者は完全に同一で、名前が異なるだけである"
      },
      {
        "vi": "test.fixme() đánh dấu test đang lỗi cần sửa và Playwright sẽ báo cáo riêng biệt, trong khi test.skip() chỉ đơn thuần bỏ qua không chạy",
        "en": "test.fixme() marks a test as broken needing a fix and Playwright reports it distinctly, while test.skip() simply skips the test without running it",
        "ja": "test.fixme()は修正が必要な壊れたテストとしてマークされ、Playwrightは区別して報告するが、test.skip()は単に実行せずスキップするだけである"
      },
      {
        "vi": "test.skip() chạy test nhưng bỏ qua kết quả, test.fixme() không chạy gì cả",
        "en": "test.skip() runs the test but ignores the result, while test.fixme() runs nothing at all",
        "ja": "test.skip()はテストを実行するが結果を無視し、test.fixme()は何も実行しない"
      },
      {
        "vi": "test.fixme() chỉ dùng được trong CI",
        "en": "test.fixme() can only be used on CI",
        "ja": "test.fixme()はCI上でのみ使用できる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cả hai đều bỏ qua việc chạy test, nhưng fixme mang ý nghĩa 'cần sửa' và được phân loại riêng trong báo cáo để nhắc nhở nợ kỹ thuật.",
      "en": "Both skip running the test, but fixme conveys 'needs fixing' and is categorized separately in reports as a reminder of technical debt.",
      "ja": "どちらもテストの実行をスキップしますが、fixmeは「修正が必要」という意味を持ち、レポート上で技術的負債として別枠に分類されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Giả sử playwright.config.ts khai báo 3 project: chromium, firefox, webkit, khi chạy 'npx playwright test' không tham số, điều gì xảy ra?",
      "en": "Suppose playwright.config.ts declares 3 projects: chromium, firefox, webkit. What happens when running 'npx playwright test' without parameters?",
      "ja": "playwright.config.tsでchromium、firefox、webkitの3つのprojectを宣言している場合、パラメータなしで'npx playwright test'を実行すると何が起こりますか。"
    },
    "options": [
      {
        "vi": "Chỉ chạy trên chromium vì đó là project đầu tiên",
        "en": "Only runs on chromium since it's the first project",
        "ja": "最初のprojectであるchromiumでのみ実行される"
      },
      {
        "vi": "Playwright báo lỗi vì không được chỉ định project cụ thể",
        "en": "Playwright throws an error because no specific project was specified",
        "ja": "特定のprojectが指定されていないためPlaywrightがエラーを出す"
      },
      {
        "vi": "Toàn bộ test suite được chạy trên cả 3 trình duyệt tương ứng với 3 project, tăng tổng số lần thực thi",
        "en": "The entire test suite runs on all 3 browsers corresponding to the 3 projects, increasing total execution count",
        "ja": "テストスイート全体が3つのprojectに対応する3つのブラウザすべてで実行され、実行総数が増える"
      },
      {
        "vi": "Chỉ chạy project có tên trùng biến môi trường",
        "en": "Only runs the project whose name matches an environment variable",
        "ja": "環境変数と名前が一致するprojectのみ実行される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mặc định Playwright chạy test trên tất cả project được khai báo, trừ khi dùng cờ --project để giới hạn.",
      "en": "By default, Playwright runs tests on all declared projects unless the --project flag is used to limit them.",
      "ja": "デフォルトでは--projectフラグで限定しない限り、宣言されたすべてのprojectでテストが実行されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi đã cấu hình 'baseURL' trong use{} của playwright.config.ts, lợi ích chính khi viết test là gì?",
      "en": "When 'baseURL' is configured in the use{} block of playwright.config.ts, what is the main benefit when writing tests?",
      "ja": "playwright.config.tsのuse{}ブロックに'baseURL'が設定されている場合、テストを書く際の主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Bắt buộc phải dùng HTTPS",
        "en": "It forces the use of HTTPS",
        "ja": "HTTPSの使用を強制する"
      },
      {
        "vi": "Tự động đăng nhập cho mọi test",
        "en": "It automatically logs in for every test",
        "ja": "すべてのテストで自動的にログインする"
      },
      {
        "vi": "Tăng tốc độ tải trang",
        "en": "It increases page load speed",
        "ja": "ページの読み込み速度を向上させる"
      },
      {
        "vi": "Có thể gọi page.goto('/login') với đường dẫn tương đối thay vì phải viết URL đầy đủ mỗi lần",
        "en": "You can call page.goto('/login') with a relative path instead of writing the full URL every time",
        "ja": "毎回完全なURLを書く代わりに、page.goto('/login')のように相対パスで呼び出せる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "baseURL cho phép dùng đường dẫn tương đối trong goto/request, giúp test dễ chuyển đổi giữa các môi trường (dev/staging/prod).",
      "en": "baseURL allows using relative paths in goto/request calls, making it easy to switch tests between environments (dev/staging/prod).",
      "ja": "baseURLによりgoto/requestで相対パスを使用でき、テストを開発・ステージング・本番などの環境間で切り替えやすくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một fixture có scope 'worker' được dùng để đăng nhập một lần rồi trả về storageState dùng chung. Lợi ích thực tế của cách làm này là gì?",
      "en": "A fixture with 'worker' scope is used to log in once and return a shared storageState. What is the practical benefit of this approach?",
      "ja": "'worker'スコープのフィクスチャを使って一度だけログインし、共有のstorageStateを返す場合、この手法の実用的な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Tránh phải thực hiện lại thao tác đăng nhập tốn thời gian cho từng test riêng lẻ trong cùng worker, giúp test chạy nhanh hơn",
        "en": "It avoids repeating the time-consuming login for each individual test in the same worker, making tests run faster",
        "ja": "同じワーカー内の各テストごとに時間のかかるログイン操作を繰り返す必要がなくなり、テストの実行が速くなる"
      },
      {
        "vi": "Đảm bảo mọi test dùng chung một session để phát hiện lỗi race condition",
        "en": "It ensures all tests share one session to detect race condition bugs",
        "ja": "すべてのテストが同一セッションを共有し、レースコンディションのバグを検出できるようにする"
      },
      {
        "vi": "Giúp test chạy chậm hơn nhưng an toàn hơn",
        "en": "It makes tests run slower but safer",
        "ja": "テストの実行は遅くなるがより安全になる"
      },
      {
        "vi": "Bắt buộc phải tắt song song hoá",
        "en": "It requires disabling parallelization",
        "ja": "並列化を無効にする必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi đăng nhập tốn kém (nhiều bước), scope worker giúp tái sử dụng kết quả giữa các test cùng worker thay vì lặp lại mỗi lần.",
      "en": "When login is expensive (multi-step), worker scope allows reusing the result across tests in the same worker instead of repeating it each time.",
      "ja": "ログインが複数ステップで負荷が高い場合、workerスコープにより同じワーカー内のテスト間で結果を再利用でき、毎回繰り返す必要がなくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Gọi test.describe.parallel() cho một nhóm test trong file có tác dụng gì trong ngữ cảnh Playwright?",
      "en": "What does calling test.describe.parallel() for a group of tests in a file do in Playwright?",
      "ja": "Playwrightにおいて、ファイル内のテストグループに対してtest.describe.parallel()を呼び出すと何が起こりますか。"
    },
    "options": [
      {
        "vi": "Vô hiệu hoá song song hoá cho nhóm test",
        "en": "Disables parallelization for the test group",
        "ja": "そのテストグループの並列化を無効にする"
      },
      {
        "vi": "Ép các test trong nhóm đó chạy song song với nhau ngay cả khi fullyParallel không được bật toàn cục",
        "en": "Forces tests in that group to run in parallel with each other even when fullyParallel is not enabled globally",
        "ja": "fullyParallelがグローバルに有効化されていなくても、そのグループ内のテストを互いに並列実行させる"
      },
      {
        "vi": "Chỉ áp dụng cho project mobile",
        "en": "Only applies to mobile projects",
        "ja": "モバイルprojectにのみ適用される"
      },
      {
        "vi": "Tự động tăng số lượng worker lên gấp đôi",
        "en": "Automatically doubles the number of workers",
        "ja": "ワーカー数を自動的に2倍にする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "describe.parallel cho phép kích hoạt song song hoá cục bộ ở cấp nhóm test mà không cần bật fullyParallel cho toàn bộ suite.",
      "en": "describe.parallel enables local parallelization at the test-group level without needing to enable fullyParallel for the whole suite.",
      "ja": "describe.parallelはスイート全体でfullyParallelを有効にすることなく、テストグループ単位でローカルに並列化を有効化できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, khi dùng context.route() thay vì page.route(), điểm khác biệt chính là gì?",
      "en": "In Playwright, when using context.route() instead of page.route(), what is the main difference?",
      "ja": "Playwrightでpage.route()の代わりにcontext.route()を使う場合、主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "context.route() không thể gọi fulfill(), chỉ có thể abort()",
        "en": "context.route() cannot call fulfill(), only abort()",
        "ja": "context.route()はfulfill()を呼べず、abort()しかできない"
      },
      {
        "vi": "context.route() chỉ hoạt động với request GraphQL",
        "en": "context.route() only works with GraphQL requests",
        "ja": "context.route()はGraphQLリクエストにのみ動作する"
      },
      {
        "vi": "context.route() áp dụng cho mọi trang (tab) được tạo trong cùng BrowserContext, không chỉ một page",
        "en": "context.route() applies to every page (tab) created within the same BrowserContext, not just one page",
        "ja": "context.route()は同一BrowserContext内で作成されるすべてのページ（タブ）に適用され、1つのページだけではない"
      },
      {
        "vi": "context.route() chạy trên tiến trình server, còn page.route() chạy trên trình duyệt",
        "en": "context.route() runs on the server process while page.route() runs in the browser",
        "ja": "context.route()はサーバープロセスで動作し、page.route()はブラウザで動作する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Route đăng ký ở cấp BrowserContext sẽ can thiệp mọi request của mọi page thuộc context đó, hữu ích khi cần mock chung cho nhiều tab.",
      "en": "A route registered at the context level intercepts requests from every page belonging to that context, useful for mocking across multiple tabs.",
      "ja": "context レベルで登録したルートは、その context に属するすべてのページのリクエストに介入するため、複数タブを一括でモックしたい場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi gọi route.fulfill({status: 201, contentType: 'application/json', body: JSON.stringify(data)}), điều gì xảy ra với request gốc?",
      "en": "When calling route.fulfill({status: 201, contentType: 'application/json', body: JSON.stringify(data)}), what happens to the original request?",
      "ja": "route.fulfill({status: 201, contentType: 'application/json', body: JSON.stringify(data)}) を呼び出すと、元のリクエストはどうなりますか。"
    },
    "options": [
      {
        "vi": "Playwright gửi request tới cả server thật và trả về response giả song song, lấy cái nào nhanh hơn",
        "en": "Playwright sends the request to both the real server and returns the fake response in parallel, using whichever is faster",
        "ja": "Playwrightは実サーバーと偽レスポンスの両方を並行して送り、速い方を採用する"
      },
      {
        "vi": "Request vẫn được gửi tới server thật rồi Playwright ghi đè response sau khi nhận được",
        "en": "The request is still sent to the real server and Playwright overwrites the response after receiving it",
        "ja": "リクエストは実際のサーバーへ送信され、受信後にPlaywrightがレスポンスを上書きする"
      },
      {
        "vi": "Request bị hủy hoàn toàn và trình duyệt hiển thị lỗi mạng",
        "en": "The request is entirely cancelled and the browser shows a network error",
        "ja": "リクエストは完全にキャンセルされ、ブラウザにネットワークエラーが表示される"
      },
      {
        "vi": "Request không được gửi đi tới server thật; Playwright trả về ngay response giả với status và body chỉ định",
        "en": "The request is never sent to the real server; Playwright immediately returns the fake response with the given status and body",
        "ja": "リクエストは実際のサーバーへ送信されず、Playwrightが指定したstatusとbodyの偽のレスポンスを即座に返す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "fulfill() chặn request và trả response tự tạo ngay lập tức, không có network call thật nào được thực hiện.",
      "en": "fulfill() short-circuits the request and immediately returns a synthetic response, with no real network call made.",
      "ja": "fulfill() はリクエストを遮断し、実際のネットワーク通信を行わずに即座に自作のレスポンスを返します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn giữ nguyên hành vi mặc định của một request sau khi kiểm tra nó trong route handler (ví dụ log URL) mà không sửa gì, nên gọi phương thức nào?",
      "en": "To preserve the default behavior of a request after inspecting it in a route handler (e.g. logging the URL) without modifying anything, which method should you call?",
      "ja": "ルートハンドラー内でリクエストを検査（例：URLをログ出力）した後、何も変更せずデフォルトの挙動を維持したい場合、どのメソッドを呼ぶべきですか。"
    },
    "options": [
      {
        "vi": "route.continue()",
        "en": "route.continue()",
        "ja": "route.continue()"
      },
      {
        "vi": "route.abort()",
        "en": "route.abort()",
        "ja": "route.abort()"
      },
      {
        "vi": "route.fulfill()",
        "en": "route.fulfill()",
        "ja": "route.fulfill()"
      },
      {
        "vi": "route.retry()",
        "en": "route.retry()",
        "ja": "route.retry()"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "route.continue() cho phép request đi tiếp tới đích ban đầu (có thể kèm override tùy chọn), giữ hành vi gần như mặc định.",
      "en": "route.continue() lets the request proceed to its original destination (optionally with overrides), preserving near-default behavior.",
      "ja": "route.continue() はリクエストを元の宛先へそのまま（必要ならオーバーライドを付けて）進めるため、ほぼデフォルトの挙動を維持します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong một route handler, để đọc dữ liệu JSON được gửi trong body của request POST, nên dùng gì?",
      "en": "In a route handler, to read the JSON data sent in a POST request's body, what should you use?",
      "ja": "ルートハンドラー内で、POSTリクエストのボディに送られたJSONデータを読み取るには何を使うべきですか。"
    },
    "options": [
      {
        "vi": "route.response().json()",
        "en": "route.response().json()",
        "ja": "route.response().json()"
      },
      {
        "vi": "route.request().postDataJSON()",
        "en": "route.request().postDataJSON()",
        "ja": "route.request().postDataJSON()"
      },
      {
        "vi": "page.evaluate(() => document.body.innerHTML)",
        "en": "page.evaluate(() => document.body.innerHTML)",
        "ja": "page.evaluate(() => document.body.innerHTML)"
      },
      {
        "vi": "route.fulfill().json()",
        "en": "route.fulfill().json()",
        "ja": "route.fulfill().json()"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "request.postDataJSON() parse phần body của request thành object JavaScript, tiện để kiểm tra payload gửi lên.",
      "en": "request.postDataJSON() parses the request's body into a JavaScript object, convenient for asserting the outgoing payload.",
      "ja": "request.postDataJSON() はリクエストボディをJavaScriptオブジェクトに変換し、送信ペイロードの検証に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cách nào đúng để chỉ chặn (route) các request có resourceType là 'image' nhằm tăng tốc test?",
      "en": "What is the correct way to intercept only requests whose resourceType is 'image' to speed up tests?",
      "ja": "テストを高速化するため、resourceTypeが'image'のリクエストだけをインターセプトする正しい方法は何ですか。"
    },
    "options": [
      {
        "vi": "await page.setResourceFilter('image')",
        "en": "await page.setResourceFilter('image')",
        "ja": "await page.setResourceFilter('image')"
      },
      {
        "vi": "await page.route('**/*.png', route => route.request().block())",
        "en": "await page.route('**/*.png', route => route.request().block())",
        "ja": "await page.route('**/*.png', route => route.request().block())"
      },
      {
        "vi": "await page.route('**/*', route => { if (route.request().resourceType() === 'image') route.abort(); else route.continue(); })",
        "en": "await page.route('**/*', route => { if (route.request().resourceType() === 'image') route.abort(); else route.continue(); })",
        "ja": "await page.route('**/*', route => { if (route.request().resourceType() === 'image') route.abort(); else route.continue(); })"
      },
      {
        "vi": "await page.blockImages(true)",
        "en": "await page.blockImages(true)",
        "ja": "await page.blockImages(true)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cách chuẩn là route mọi request rồi kiểm tra resourceType() để quyết định abort() ảnh, continue() cho phần còn lại; Playwright không có API block() hay setResourceFilter() sẵn.",
      "en": "The standard approach is to route all requests and check resourceType() to decide when to abort() images and continue() the rest; there is no built-in block() or setResourceFilter() API.",
      "ja": "標準的な方法は全リクエストをrouteし、resourceType()を確認して画像はabort()、それ以外はcontinue()することです。block()やsetResourceFilter()という組み込みAPIは存在しません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test cần chờ một request cụ thể hoàn tất (ví dụ sau khi click nút submit) để lấy response thật mà không mock, nên dùng API nào?",
      "en": "When a test needs to wait for a specific request to complete (e.g. after clicking submit) to get the real response without mocking, which API should be used?",
      "ja": "（送信ボタンをクリックした後など）モックせずに実際のレスポンスを取得するため、特定のリクエストの完了を待つ必要がある場合、どのAPIを使うべきですか。"
    },
    "options": [
      {
        "vi": "page.waitForTimeout(5000)",
        "en": "page.waitForTimeout(5000)",
        "ja": "page.waitForTimeout(5000)"
      },
      {
        "vi": "page.route(urlOrPredicate).wait()",
        "en": "page.route(urlOrPredicate).wait()",
        "ja": "page.route(urlOrPredicate).wait()"
      },
      {
        "vi": "page.waitForSelector('response')",
        "en": "page.waitForSelector('response')",
        "ja": "page.waitForSelector('response')"
      },
      {
        "vi": "page.waitForResponse(urlOrPredicate)",
        "en": "page.waitForResponse(urlOrPredicate)",
        "ja": "page.waitForResponse(urlOrPredicate)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "waitForResponse() theo dõi sự kiện response mạng khớp URL/predicate, trả về đối tượng Response thật khi hoàn tất, không cần đoán thời gian chờ cố định.",
      "en": "waitForResponse() listens for a network response matching a URL/predicate and returns the real Response object once it completes, avoiding brittle fixed timeouts.",
      "ja": "waitForResponse() はURL／述語に一致するネットワークレスポンスを監視し、完了時に実際のResponseオブジェクトを返すため、固定タイムアウトに頼る必要がありません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu đã đăng ký nhiều route handler khớp cùng một URL bằng nhiều lệnh page.route() liên tiếp, Playwright xử lý theo thứ tự nào?",
      "en": "If multiple route handlers matching the same URL are registered via several consecutive page.route() calls, in what order does Playwright process them?",
      "ja": "複数のpage.route()呼び出しで同じURLに一致するルートハンドラーを連続して登録した場合、Playwrightはどの順序で処理しますか。"
    },
    "options": [
      {
        "vi": "Theo thứ tự đăng ký ngược lại: handler đăng ký sau cùng chạy trước, có thể gọi route.fallback() để chuyển cho handler trước đó",
        "en": "In reverse registration order: the most recently registered handler runs first, and can call route.fallback() to pass to the previous one",
        "ja": "登録順の逆順：最後に登録したハンドラーが最初に実行され、route.fallback()を呼んで前のハンドラーに渡せる"
      },
      {
        "vi": "Playwright chạy song song tất cả handler và gộp kết quả",
        "en": "Playwright runs all handlers in parallel and merges the results",
        "ja": "Playwrightはすべてのハンドラーを並行実行し結果をマージする"
      },
      {
        "vi": "Chỉ handler đăng ký đầu tiên có hiệu lực, các handler sau bị bỏ qua hoàn toàn",
        "en": "Only the first registered handler takes effect; later ones are completely ignored",
        "ja": "最初に登録したハンドラーだけが有効で、以降のものは完全に無視される"
      },
      {
        "vi": "Playwright báo lỗi ngay khi phát hiện route trùng lặp",
        "en": "Playwright throws an error immediately upon detecting a duplicate route",
        "ja": "Playwrightは重複ルートを検出すると即座にエラーを投げる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Các route handler xếp chồng theo kiểu LIFO; handler mới nhất được gọi trước và có thể ủy quyền lại cho handler cũ hơn bằng route.fallback().",
      "en": "Route handlers stack in LIFO order; the newest one is invoked first and can delegate to an older handler via route.fallback().",
      "ja": "ルートハンドラーはLIFO方式で積み重なり、最新のものが先に呼ばれ、route.fallback()で古いハンドラーに委譲できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để mock một request GraphQL (thường tất cả đều POST tới cùng một endpoint /graphql) theo tên operation cụ thể, cách tiếp cận hợp lý nhất là gì?",
      "en": "To mock a GraphQL request (typically all POST to the same /graphql endpoint) based on a specific operation name, what is the most reasonable approach?",
      "ja": "GraphQLリクエスト（通常すべて同じ/graphqlエンドポイントへのPOST）を特定のオペレーション名に基づいてモックする最も妥当な方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng page.route('**/graphql*') là đủ vì Playwright tự tách theo operationName",
        "en": "Using page.route('**/graphql*') is enough because Playwright automatically splits by operationName",
        "ja": "page.route('**/graphql*')だけで十分。PlaywrightがoperationNameで自動的に振り分けるため"
      },
      {
        "vi": "Trong route handler, parse postDataJSON() để lấy operationName, chỉ fulfill() khi khớp tên mong muốn, còn lại continue()",
        "en": "In the route handler, parse postDataJSON() to get operationName, only fulfill() when it matches the desired name, otherwise continue()",
        "ja": "ルートハンドラー内でpostDataJSON()をパースしてoperationNameを取得し、目的の名前に一致する場合のみfulfill()、それ以外はcontinue()する"
      },
      {
        "vi": "GraphQL không thể mock được bằng page.route vì luôn dùng WebSocket",
        "en": "GraphQL cannot be mocked with page.route because it always uses WebSocket",
        "ja": "GraphQLは常にWebSocketを使うため、page.routeではモックできない"
      },
      {
        "vi": "Phải cấu hình route theo từng field trả về trong query, không thể theo operationName",
        "en": "Routes must be configured per return field in the query, not by operationName",
        "ja": "ルートはクエリの戻りフィールドごとに設定する必要があり、operationNameでは不可能"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì mọi request GraphQL thường chung một URL, cần đọc body để lấy operationName rồi mới quyết định fulfill hay continue cho từng loại truy vấn.",
      "en": "Since all GraphQL requests usually share one URL, you must inspect the body for the operationName and decide per-operation whether to fulfill or continue.",
      "ja": "GraphQLリクエストは通常同一URLを共有するため、ボディを検査してoperationNameを取得し、オペレーションごとにfulfillするかcontinueするか判断する必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi dùng route.fulfill({ response, headers: {...route.request().headers, 'x-custom': '1'} }) với response là đối tượng APIResponse lấy từ route.fetch(), mục đích thường thấy là gì?",
      "en": "When using route.fulfill({ response, headers: {...route.request().headers, 'x-custom': '1'} }) where response is an APIResponse from route.fetch(), what is the common purpose?",
      "ja": "route.fetch()で取得したAPIResponseをresponseとして使いroute.fulfill({ response, headers: {...} })とする場合、一般的な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng để log request, không ảnh hưởng response",
        "en": "Only used for logging the request without affecting the response",
        "ja": "リクエストのログ記録専用で、レスポンスには影響しない"
      },
      {
        "vi": "Bỏ qua hoàn toàn request, không gọi server nào",
        "en": "Completely skip the request without calling any server",
        "ja": "リクエストを完全にスキップし、サーバーを一切呼び出さない"
      },
      {
        "vi": "Gửi request thật tới server rồi chỉnh sửa header/response trước khi trả về cho trình duyệt",
        "en": "Send the real request to the server, then modify the header/response before returning it to the browser",
        "ja": "実際のリクエストをサーバーへ送信し、ブラウザに返す前にヘッダー／レスポンスを修正する"
      },
      {
        "vi": "Tự động retry request 3 lần khi lỗi",
        "en": "Automatically retries the request 3 times on failure",
        "ja": "エラー時にリクエストを自動的に3回リトライする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "route.fetch() thực hiện request thật và trả về APIResponse, sau đó có thể tùy biến (thêm header, đổi status/body) rồi fulfill() lại cho trình duyệt — kỹ thuật hay dùng để chỉnh sửa response thay vì mock hoàn toàn.",
      "en": "route.fetch() performs the real request and returns an APIResponse, which can then be customized (extra headers, changed status/body) and passed to fulfill() — a common technique to tweak rather than fully replace a response.",
      "ja": "route.fetch()は実際のリクエストを実行しAPIResponseを返します。それをカスタマイズ（ヘッダー追加、status/body変更）してfulfill()に渡すのは、完全なモックではなくレスポンスを微調整する際によく使われる手法です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn giả lập lỗi mạng kiểu 'mất kết nối' (network failure) thay vì trả về mã lỗi HTTP, nên gọi phương thức nào trong route handler?",
      "en": "To simulate a 'connection lost' network failure instead of returning an HTTP error code, which method should be called in the route handler?",
      "ja": "HTTPエラーコードを返すのではなく「接続失敗」のようなネットワーク障害をシミュレートしたい場合、ルートハンドラー内でどのメソッドを呼ぶべきですか。"
    },
    "options": [
      {
        "vi": "route.fulfill({status: 0})",
        "en": "route.fulfill({status: 0})",
        "ja": "route.fulfill({status: 0})"
      },
      {
        "vi": "route.fulfill({status: 500})",
        "en": "route.fulfill({status: 500})",
        "ja": "route.fulfill({status: 500})"
      },
      {
        "vi": "route.continue({timeout: 0})",
        "en": "route.continue({timeout: 0})",
        "ja": "route.continue({timeout: 0})"
      },
      {
        "vi": "route.abort('failed') hoặc route.abort('connectionrefused')",
        "en": "route.abort('failed') or route.abort('connectionrefused')",
        "ja": "route.abort('failed') または route.abort('connectionrefused')"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "abort() với mã lỗi mạng (như 'failed', 'connectionrefused', 'timedout') làm request thất bại ở tầng network thật, khác với fulfill(status:500) vẫn là một response HTTP hợp lệ.",
      "en": "abort() with a network error code (like 'failed', 'connectionrefused', 'timedout') fails the request at the network layer, unlike fulfill(status:500) which is still a valid HTTP response.",
      "ja": "abort()にネットワークエラーコード（'failed'、'connectionrefused'、'timedout'など）を指定すると、実際のネットワーク層でリクエストが失敗します。一方fulfill(status:500)は依然として有効なHTTPレスポンスです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, khi cần đảm bảo một request tới third-party analytics KHÔNG BAO GIỜ được gửi thật (tránh làm nhiễu số liệu production) trong toàn bộ test suite, cách thiết lập hiệu quả nhất là gì?",
      "en": "In CI, to ensure a request to third-party analytics is NEVER actually sent (avoiding polluting production data) across the whole test suite, what is the most effective setup?",
      "ja": "CIにおいて、テストスイート全体でサードパーティのアナリティクスへのリクエストが絶対に実際に送信されない（本番データを汚染しない）ようにするには、どの設定が最も効果的ですか。"
    },
    "options": [
      {
        "vi": "Đăng ký route chặn domain analytics ở mức context (context.route) trong test fixture dùng chung cho mọi test",
        "en": "Register a route blocking the analytics domain at the context level (context.route) in a shared test fixture used by every test",
        "ja": "すべてのテストで共有するfixture内でcontext.routeを使いanalyticsドメインをコンテキストレベルでブロックするルートを登録する"
      },
      {
        "vi": "Thêm try/catch quanh mỗi test để bắt lỗi analytics",
        "en": "Add try/catch around each test to catch analytics errors",
        "ja": "各テストをtry/catchで囲みanalyticsのエラーを捕捉する"
      },
      {
        "vi": "Tắt JavaScript của trang bằng page.setJavaScriptEnabled(false)",
        "en": "Disable page JavaScript via page.setJavaScriptEnabled(false)",
        "ja": "page.setJavaScriptEnabled(false)でページのJavaScriptを無効化する"
      },
      {
        "vi": "Chạy test với --offline flag của Playwright CLI",
        "en": "Run tests with Playwright CLI's --offline flag",
        "ja": "Playwright CLIの--offlineフラグでテストを実行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đặt route chặn ở cấp context trong fixture dùng chung đảm bảo mọi test tự động áp dụng, tránh lặp code và tránh bỏ sót test nào gửi request thật.",
      "en": "Placing the blocking route at the context level inside a shared fixture ensures every test automatically applies it, avoiding duplicated code and any test slipping through with a real request.",
      "ja": "共有fixture内でcontextレベルにブロッキングルートを設定することで、すべてのテストに自動適用され、コードの重複や実リクエスト漏れを防げます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "page.unroute(url, handler) dùng để làm gì?",
      "en": "What does page.unroute(url, handler) do?",
      "ja": "page.unroute(url, handler)は何をするためのものですか。"
    },
    "options": [
      {
        "vi": "Chuyển hướng (redirect) request sang URL khác",
        "en": "Redirect the request to a different URL",
        "ja": "リクエストを別のURLへリダイレクトする"
      },
      {
        "vi": "Gỡ bỏ một route handler đã đăng ký trước đó cho URL/pattern chỉ định",
        "en": "Remove a previously registered route handler for the given URL/pattern",
        "ja": "指定したURL／パターンに対して以前登録したルートハンドラーを解除する"
      },
      {
        "vi": "Xóa cache của trình duyệt cho URL đó",
        "en": "Clear the browser cache for that URL",
        "ja": "そのURLに対するブラウザキャッシュを削除する"
      },
      {
        "vi": "Tạm dừng mọi request đang chờ xử lý",
        "en": "Pause all pending requests",
        "ja": "保留中のすべてのリクエストを一時停止する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "unroute() gỡ bỏ handler đã đăng ký bằng route() trước đó, hữu ích khi chỉ muốn mock trong một đoạn test cụ thể rồi khôi phục hành vi mặc định.",
      "en": "unroute() removes a handler previously registered via route(), useful when mocking should apply only for a specific test segment before restoring default behavior.",
      "ja": "unroute()はroute()で登録したハンドラーを解除するもので、特定のテスト区間だけモックし、その後デフォルトの挙動に戻したい場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi ghi lại và phát lại lưu lượng mạng bằng HAR (page.routeFromHAR), lợi ích chính so với viết fulfill() thủ công cho từng request là gì?",
      "en": "When recording and replaying network traffic with HAR (page.routeFromHAR), what is the main benefit compared to manually writing fulfill() for each request?",
      "ja": "HAR（page.routeFromHAR）を使ってネットワークトラフィックを記録・再生する場合、各リクエストに手動でfulfill()を書くのと比べた主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "HAR chỉ hoạt động với WebSocket, không hỗ trợ HTTP thông thường",
        "en": "HAR only works with WebSocket, not regular HTTP",
        "ja": "HARはWebSocketにのみ対応し、通常のHTTPには対応しない"
      },
      {
        "vi": "HAR chạy nhanh hơn vì bỏ qua toàn bộ JavaScript của trang",
        "en": "HAR runs faster because it skips all page JavaScript",
        "ja": "HARはページのJavaScriptをすべてスキップするため高速に動作する"
      },
      {
        "vi": "Tự động ghi lại toàn bộ request/response thật một lần rồi phát lại chính xác mà không cần viết mock thủ công cho từng endpoint",
        "en": "It automatically records all real requests/responses once and replays them accurately without manually mocking each endpoint",
        "ja": "実際のリクエスト／レスポンス全体を一度自動記録し、各エンドポイントを手動でモックすることなく正確に再生できる"
      },
      {
        "vi": "HAR tự động tạo assertion cho mọi response nhận được",
        "en": "HAR automatically generates assertions for every response received",
        "ja": "HARは受信したすべてのレスポンスに対して自動的にアサーションを生成する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "routeFromHAR cho phép ghi một lần bằng recordHar rồi tái sử dụng file HAR để phát lại chính xác traffic thật, giảm công sức viết mock tay cho nhiều endpoint phức tạp.",
      "en": "routeFromHAR lets you record once via recordHar and reuse the HAR file to replay real traffic accurately, reducing the effort of hand-writing mocks for many complex endpoints.",
      "ja": "routeFromHARはrecordHarで一度記録したHARファイルを再利用して実際のトラフィックを正確に再生できるため、複雑な多数のエンドポイントを手作業でモックする手間を減らせます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong route handler bất đồng bộ, nếu quên gọi route.continue(), route.fulfill() hoặc route.abort() thì điều gì xảy ra?",
      "en": "In an async route handler, if you forget to call route.continue(), route.fulfill(), or route.abort(), what happens?",
      "ja": "非同期のルートハンドラーでroute.continue()、route.fulfill()、route.abort()のいずれも呼び忘れた場合、何が起こりますか。"
    },
    "options": [
      {
        "vi": "Browser tự bỏ qua route handler và tải trang bình thường",
        "en": "The browser ignores the route handler and loads the page normally",
        "ja": "ブラウザはルートハンドラーを無視し、通常通りページを読み込む"
      },
      {
        "vi": "Playwright tự động gọi continue() sau 100ms",
        "en": "Playwright automatically calls continue() after 100ms",
        "ja": "Playwrightが100ms後に自動的にcontinue()を呼ぶ"
      },
      {
        "vi": "Request tự động fulfill với status 200 rỗng",
        "en": "The request auto-fulfills with an empty 200 status",
        "ja": "リクエストは自動的に空の200ステータスでfulfillされる"
      },
      {
        "vi": "Request bị treo vô thời hạn, có thể khiến test timeout",
        "en": "The request hangs indefinitely, which can cause the test to time out",
        "ja": "リクエストが無期限にハングし、テストがタイムアウトする可能性がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi route đã đăng ký bắt buộc phải kết thúc bằng đúng một trong ba lệnh; nếu không, request bị treo chờ mãi và dễ gây timeout khó chẩn đoán.",
      "en": "Every registered route must end with exactly one of the three calls; otherwise the request stalls indefinitely, often causing hard-to-diagnose timeouts.",
      "ja": "登録した各ルートは必ず3つのいずれか一つで終了する必要があります。そうしないとリクエストが永久にハングし、原因の特定が難しいタイムアウトを引き起こします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để chỉ mock request tới một API cụ thể nhưng vẫn cho phép các request khác (CSS, JS, font...) đi qua bình thường, cách viết pattern nào là tốt nhất?",
      "en": "To mock requests to only a specific API while letting other requests (CSS, JS, fonts...) pass through normally, what pattern is best?",
      "ja": "特定のAPIへのリクエストだけをモックし、他のリクエスト（CSS、JS、フォントなど）は通常通り通過させたい場合、最適なパターンの書き方はどれですか。"
    },
    "options": [
      {
        "vi": "page.route('**/api/users**', handler) — chỉ đăng ký route với glob pattern khớp đúng endpoint cần mock",
        "en": "page.route('**/api/users**', handler) — only register a route with a glob pattern matching exactly the endpoint to mock",
        "ja": "page.route('**/api/users**', handler) — モックしたいエンドポイントにのみ一致するglobパターンでルートを登録する"
      },
      {
        "vi": "page.route('**/*', handler) rồi bên trong handler luôn gọi fulfill() cho mọi loại request",
        "en": "page.route('**/*', handler) then always call fulfill() for every request type inside the handler",
        "ja": "page.route('**/*', handler)を使い、ハンドラー内であらゆる種類のリクエストに対して常にfulfill()を呼ぶ"
      },
      {
        "vi": "page.route('**/api/users**', handler) rồi gọi route.abort() cho các request không phải API đó",
        "en": "page.route('**/api/users**', handler) then call route.abort() for requests that aren't that API",
        "ja": "page.route('**/api/users**', handler)を使い、そのAPI以外のリクエストにはroute.abort()を呼ぶ"
      },
      {
        "vi": "Dùng page.setRequestInterception(true) thay cho route",
        "en": "Use page.setRequestInterception(true) instead of route",
        "ja": "routeの代わりにpage.setRequestInterception(true)を使う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đăng ký route với glob pattern chính xác cho endpoint cần mock là cách gọn nhất; các request khác không khớp pattern sẽ không bị handler này can thiệp, tự đi tiếp bình thường.",
      "en": "Registering a route with a precise glob pattern for the target endpoint is cleanest; other requests that don't match simply proceed unaffected by this handler.",
      "ja": "対象エンドポイントに正確に一致するglobパターンでルートを登録するのが最もシンプルです。パターンに一致しない他のリクエストはこのハンドラーの影響を受けず通常通り進みます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi muốn kiểm tra rằng header 'Authorization' được gửi đúng trong mọi request tới API sau khi đăng nhập, cách kiểm tra hợp lý bằng route là gì?",
      "en": "To verify that the 'Authorization' header is correctly sent in every API request after login, what is a reasonable way to check this using route?",
      "ja": "ログイン後のすべてのAPIリクエストで'Authorization'ヘッダーが正しく送信されていることを検証したい場合、routeを使った妥当な確認方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng route.fulfill() để tự sinh header Authorization giả, không cần kiểm tra request thật",
        "en": "Use route.fulfill() to generate a fake Authorization header, no need to check the real request",
        "ja": "route.fulfill()を使って偽のAuthorizationヘッダーを生成し、実際のリクエストは確認しない"
      },
      {
        "vi": "Trong route handler, đọc route.request().headers()['authorization'] và assert giá trị trước khi gọi continue()",
        "en": "In the route handler, read route.request().headers()['authorization'] and assert its value before calling continue()",
        "ja": "ルートハンドラー内でroute.request().headers()['authorization']を読み取り、continue()を呼ぶ前に値をアサートする"
      },
      {
        "vi": "Header request không thể đọc được từ route handler, chỉ đọc được ở response",
        "en": "Request headers cannot be read from a route handler, only response headers can",
        "ja": "リクエストヘッダーはルートハンドラーから読み取れず、レスポンスヘッダーのみ読み取れる"
      },
      {
        "vi": "Phải dùng DevTools Protocol riêng biệt, Playwright API không hỗ trợ đọc header request",
        "en": "You must use a separate DevTools Protocol call; the Playwright API doesn't support reading request headers",
        "ja": "別途DevTools Protocolを使う必要があり、Playwright APIはリクエストヘッダーの読み取りをサポートしていない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "route.request().headers() trả về toàn bộ header của request thật, cho phép assert giá trị Authorization trước khi cho request tiếp tục bằng continue().",
      "en": "route.request().headers() returns the real request's full headers, allowing assertion of the Authorization value before letting the request proceed via continue().",
      "ja": "route.request().headers() は実際のリクエストの全ヘッダーを返すため、continue() でリクエストを進める前にAuthorizationの値をアサートできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một API trả về dữ liệu phân trang. Muốn test giao diện khi API trả về danh sách rỗng (empty state), cách nhanh nhất bằng network mocking là gì?",
      "en": "An API returns paginated data. To test the UI when the API returns an empty list (empty state), what is the fastest way using network mocking?",
      "ja": "あるAPIがページネーションされたデータを返します。APIが空のリスト（empty state）を返した場合のUIをテストしたい場合、ネットワークモックを使った最速の方法は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉnh sửa mã nguồn frontend tạm thời để luôn hiển thị empty state",
        "en": "Temporarily modify the frontend source code to always show the empty state",
        "ja": "フロントエンドのソースコードを一時的に修正し、常にempty stateを表示させる"
      },
      {
        "vi": "Xóa toàn bộ dữ liệu trong database thật trước khi chạy test",
        "en": "Delete all data in the real database before running the test",
        "ja": "テスト実行前に実データベースのデータをすべて削除する"
      },
      {
        "vi": "Dùng page.route() chặn endpoint đó và fulfill() với body JSON chứa mảng rỗng, không cần chuẩn bị dữ liệu thật trong DB",
        "en": "Use page.route() to intercept that endpoint and fulfill() with a JSON body containing an empty array, without needing real data setup in the DB",
        "ja": "page.route()でそのエンドポイントをインターセプトし、空配列を含むJSONボディでfulfill()する。DBに実データを用意する必要はない"
      },
      {
        "vi": "Dùng page.evaluate() để xóa DOM danh sách sau khi trang tải xong",
        "en": "Use page.evaluate() to remove the list DOM after the page loads",
        "ja": "ページ読み込み後にpage.evaluate()でリストのDOMを削除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mock response trả về mảng rỗng qua route.fulfill() là cách nhanh, cô lập, không phụ thuộc trạng thái dữ liệu thật, phù hợp kiểm thử edge case như empty state.",
      "en": "Mocking an empty-array response via route.fulfill() is fast, isolated, and independent of real data state — ideal for testing edge cases like an empty state.",
      "ja": "route.fulfill()で空配列レスポンスをモックする方法は、高速かつ独立しており、実データの状態に依存しないため、empty stateのようなエッジケースのテストに適しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi kiểm thử giao diện phản ứng với lỗi mạng chậm (loading spinner), có thể dùng route handler kết hợp gì để giả lập độ trễ?",
      "en": "When testing UI behavior under slow network (loading spinner), what can be combined in a route handler to simulate latency?",
      "ja": "低速ネットワーク下でのUIの挙動（ローディングスピナー）をテストする際、遅延をシミュレートするためにルートハンドラーで何を組み合わせられますか。"
    },
    "options": [
      {
        "vi": "Không thể giả lập độ trễ trong route handler, phải dùng network throttling của DevTools ngoài Playwright",
        "en": "Latency cannot be simulated in a route handler; you must use DevTools network throttling outside Playwright",
        "ja": "ルートハンドラーでは遅延をシミュレートできず、Playwright外のDevToolsネットワークスロットリングを使う必要がある"
      },
      {
        "vi": "Dùng route.setLatency(ms) — API tích hợp sẵn của Playwright",
        "en": "Use route.setLatency(ms) — a built-in Playwright API",
        "ja": "route.setLatency(ms)という組み込みAPIを使う"
      },
      {
        "vi": "Đặt page.slowMo trong route handler",
        "en": "Set page.slowMo inside the route handler",
        "ja": "ルートハンドラー内でpage.slowMoを設定する"
      },
      {
        "vi": "Chèn await new Promise(r => setTimeout(r, ms)) trước khi gọi route.fulfill() hoặc route.continue()",
        "en": "Insert await new Promise(r => setTimeout(r, ms)) before calling route.fulfill() or route.continue()",
        "ja": "route.fulfill()やroute.continue()を呼ぶ前にawait new Promise(r => setTimeout(r, ms))を挿入する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì handler là async, có thể tự chèn một delay bằng setTimeout trước khi trả kết quả, mô phỏng network chậm mà không cần API riêng nào của Playwright.",
      "en": "Since the handler is async, you can insert a manual delay via setTimeout before resolving, simulating slow network without any special Playwright API.",
      "ja": "ハンドラーは非同期なので、結果を返す前にsetTimeoutで手動の遅延を挿入でき、Playwright専用APIなしで低速ネットワークをシミュレートできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào sau đây về route.fulfill() và content-type là SAI?",
      "en": "Which of the following statements about route.fulfill() and content-type is INCORRECT?",
      "ja": "route.fulfill()とcontent-typeに関する次の記述のうち、誤っているものはどれですか。"
    },
    "options": [
      {
        "vi": "Nếu không chỉ định contentType, Playwright luôn mặc định là 'text/plain' và không thể đổi",
        "en": "If contentType is not specified, Playwright always defaults to 'text/plain' and it cannot be changed",
        "ja": "contentTypeを指定しない場合、Playwrightは常に'text/plain'をデフォルトとし変更できない"
      },
      {
        "vi": "Có thể chỉ định contentType là 'application/json' để trình duyệt parse body đúng định dạng JSON",
        "en": "You can specify contentType as 'application/json' so the browser parses the body correctly as JSON",
        "ja": "ブラウザがbodyを正しくJSONとしてパースできるよう、contentTypeを'application/json'に指定できる"
      },
      {
        "vi": "Có thể fulfill() với body là dữ liệu binary (Buffer) và contentType phù hợp như 'image/png'",
        "en": "You can fulfill() with binary data (Buffer) as body and an appropriate contentType like 'image/png'",
        "ja": "バイナリデータ（Buffer）をbodyとして、'image/png'のような適切なcontentTypeでfulfill()できる"
      },
      {
        "vi": "contentType có thể được truyền qua option headers['content-type'] thay vì option contentType riêng",
        "en": "contentType can be passed via the headers['content-type'] option instead of the separate contentType option",
        "ja": "contentTypeはcontentTypeオプションの代わりにheaders['content-type']で渡すこともできる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "contentType hoàn toàn có thể tùy chỉnh (json, html, binary...); phát biểu nói luôn mặc định 'text/plain' và không đổi được là sai.",
      "en": "contentType is fully customizable (json, html, binary, etc.); the claim that it always defaults to 'text/plain' and cannot change is false.",
      "ja": "contentTypeは（json、html、バイナリなど）自由にカスタマイズ可能であり、常に'text/plain'固定で変更できないという主張は誤りです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong một test end-to-end, backend thật trả lỗi 500 ngẫu nhiên do flaky server ở môi trường staging. Cách dùng route để cô lập test khỏi vấn đề này là gì?",
      "en": "In an end-to-end test, the real backend intermittently returns 500 due to a flaky staging server. How can route be used to isolate the test from this issue?",
      "ja": "E2Eテストで、ステージング環境の不安定なサーバーが原因で実バックエンドがランダムに500を返します。routeを使ってこの問題からテストを分離するにはどうすればよいですか。"
    },
    "options": [
      {
        "vi": "Tăng số lần retry của test lên 100 để chờ backend ổn định",
        "en": "Increase the test retry count to 100 to wait for the backend to stabilize",
        "ja": "バックエンドが安定するまで待つため、テストのリトライ回数を100に増やす"
      },
      {
        "vi": "Mock endpoint đó bằng route.fulfill() trả về response ổn định, tách biệt việc test UI khỏi độ ổn định của backend staging",
        "en": "Mock that endpoint with route.fulfill() returning a stable response, decoupling the UI test from the staging backend's stability",
        "ja": "そのエンドポイントをroute.fulfill()で安定したレスポンスを返すようモックし、UIテストをステージングバックエンドの安定性から切り離す"
      },
      {
        "vi": "Gọi route.abort() cho mọi request để bỏ qua toàn bộ luồng kiểm thử",
        "en": "Call route.abort() on every request to skip the entire test flow",
        "ja": "すべてのリクエストでroute.abort()を呼び、テストフロー全体をスキップする"
      },
      {
        "vi": "Không có cách nào dùng route để giải quyết vấn đề backend flaky",
        "en": "There is no way to use route to solve a flaky backend issue",
        "ja": "routeを使ってflakyなバックエンドの問題を解決する方法はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mock response cho endpoint thất thường giúp UI test chạy độc lập, ổn định, không phụ thuộc vào chất lượng hạ tầng staging.",
      "en": "Mocking the flaky endpoint's response lets the UI test run independently and reliably, decoupled from staging infrastructure quality.",
      "ja": "不安定なエンドポイントのレスポンスをモックすることで、UIテストはステージングインフラの品質に左右されず、独立して安定的に実行できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So sánh route.fulfill({path: 'mock.json'}) và route.fulfill({body: fs.readFileSync('mock.json')}), điểm khác biệt là gì?",
      "en": "Comparing route.fulfill({path: 'mock.json'}) and route.fulfill({body: fs.readFileSync('mock.json')}), what is the difference?",
      "ja": "route.fulfill({path: 'mock.json'})とroute.fulfill({body: fs.readFileSync('mock.json')})を比較した場合、違いは何ですか。"
    },
    "options": [
      {
        "vi": "path chỉ hoạt động với file ảnh, body chỉ hoạt động với file JSON",
        "en": "path only works with image files, body only works with JSON files",
        "ja": "pathは画像ファイルにのみ、bodyはJSONファイルにのみ動作する"
      },
      {
        "vi": "Hai cách hoàn toàn giống nhau về mọi mặt, không có khác biệt",
        "en": "The two approaches are completely identical in every way",
        "ja": "両者はあらゆる面で完全に同一であり違いはない"
      },
      {
        "vi": "path tự động đọc file và suy ra content-type từ phần mở rộng, còn body cần tự đọc file và có thể cần chỉ định contentType thủ công",
        "en": "path automatically reads the file and infers content-type from the extension, while body requires manually reading the file and possibly specifying contentType",
        "ja": "pathは自動的にファイルを読み込み拡張子からcontent-typeを推測するが、bodyは自分でファイルを読み込み、必要に応じてcontentTypeを手動指定する必要がある"
      },
      {
        "vi": "path đọc file bất đồng bộ trên server test, body đọc file trên trình duyệt của người dùng",
        "en": "path reads the file asynchronously on the test server, body reads the file in the user's browser",
        "ja": "pathはテストサーバー上で非同期にファイルを読み込み、bodyはユーザーのブラウザ上でファイルを読み込む"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "path là tiện ích giúp Playwright tự đọc nội dung file và đoán content-type; dùng body thì phải tự tay đọc và chỉ định các thuộc tính cần thiết.",
      "en": "path is a convenience where Playwright reads the file itself and guesses the content-type; using body requires manually reading the file and setting properties yourself.",
      "ja": "pathはPlaywrightが自らファイルを読み込みcontent-typeを推測してくれる利便機能であり、bodyを使う場合は自分でファイルを読み込み必要なプロパティを設定する必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là phát biểu ĐÚNG về việc route handler có thể là async function trả về Promise?",
      "en": "Which statement is CORRECT about a route handler being an async function that returns a Promise?",
      "ja": "ルートハンドラーがPromiseを返す非同期関数であることに関する正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "async handler chỉ hoạt động với route.abort(), không hoạt động với fulfill/continue",
        "en": "async handlers only work with route.abort(), not with fulfill/continue",
        "ja": "非同期ハンドラーはroute.abort()でのみ動作し、fulfill/continueでは動作しない"
      },
      {
        "vi": "Route handler bắt buộc phải là hàm đồng bộ (sync), không được dùng async/await",
        "en": "Route handlers must be synchronous functions and cannot use async/await",
        "ja": "ルートハンドラーは同期関数でなければならず、async/awaitは使用できない"
      },
      {
        "vi": "Dùng async trong route handler sẽ khiến Playwright bỏ qua handler đó",
        "en": "Using async in a route handler causes Playwright to skip that handler",
        "ja": "ルートハンドラーでasyncを使うと、Playwrightはそのハンドラーをスキップする"
      },
      {
        "vi": "Playwright hỗ trợ đầy đủ async handler, cho phép gọi await bên trong (ví dụ gọi API khác) trước khi quyết định fulfill/continue/abort",
        "en": "Playwright fully supports async handlers, allowing await calls inside (e.g. calling another API) before deciding to fulfill/continue/abort",
        "ja": "Playwrightは非同期ハンドラーを完全にサポートしており、内部でawait呼び出し（別のAPIを呼ぶなど）を行ってからfulfill/continue/abortを決定できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright thiết kế route handler để hỗ trợ async/await tự nhiên, cho phép thực hiện logic phức tạp như gọi service khác trước khi quyết định phản hồi.",
      "en": "Playwright designs route handlers to natively support async/await, enabling complex logic like calling another service before deciding on a response.",
      "ja": "Playwrightはルートハンドラーがasync/awaitをネイティブにサポートするよう設計されており、レスポンスを決定する前に他のサービスを呼ぶといった複雑なロジックを実行できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test luồng thanh toán, muốn mock API trả về lỗi 'thẻ bị từ chối' (status 402) chỉ ở LẦN GỌI ĐẦU TIÊN, các lần sau trả về thành công bình thường. Cách triển khai hợp lý là gì?",
      "en": "When testing a payment flow, you want to mock the API returning a 'card declined' error (status 402) only on the FIRST call, with subsequent calls succeeding normally. What is a reasonable implementation?",
      "ja": "決済フローをテストする際、APIが「カード拒否」エラー（status 402）を返すのを最初の1回だけモックし、それ以降は通常通り成功させたい場合、妥当な実装方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng biến đếm bên ngoài route handler, kiểm tra trong handler: nếu là lần gọi đầu thì fulfill(402), ngược lại continue()",
        "en": "Use a counter variable outside the route handler; inside the handler, check: if it's the first call, fulfill(402), otherwise continue()",
        "ja": "ルートハンドラーの外にカウンター変数を用意し、ハンドラー内で：初回呼び出しならfulfill(402)、それ以外はcontinue()とする"
      },
      {
        "vi": "Playwright tự động chỉ áp dụng route cho lần gọi đầu tiên theo mặc định",
        "en": "Playwright automatically applies the route only to the first call by default",
        "ja": "Playwrightはデフォルトで最初の呼び出しにのみ自動的にルートを適用する"
      },
      {
        "vi": "Dùng route.once() — API built-in tự động unroute sau khi khớp lần đầu",
        "en": "Use route.once() — a built-in API that automatically unroutes after the first match",
        "ja": "最初のマッチ後に自動的にunrouteされる組み込みAPIであるroute.once()を使う"
      },
      {
        "vi": "Không thể làm được vì route handler chỉ chạy được đúng một lần trong toàn bộ test",
        "en": "This is impossible because a route handler can only run exactly once during the entire test",
        "ja": "ルートハンドラーはテスト全体で1回しか実行できないため不可能"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright không có sẵn route.once(); cách thực tế là dùng closure/biến đếm trong scope bên ngoài để theo dõi số lần gọi và rẽ nhánh logic trong handler.",
      "en": "Playwright has no built-in route.once(); the practical approach is a closure/counter variable in the outer scope tracking call count and branching logic accordingly.",
      "ja": "Playwrightにroute.once()という組み込みAPIはありません。実際的な方法は、外側スコープのクロージャ／カウンター変数で呼び出し回数を追跡し、ハンドラー内で分岐処理を行うことです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào đúng khi so sánh sự kiện page.on('request') / page.on('response') với page.route()?",
      "en": "Which statement is correct when comparing the events page.on('request') / page.on('response') with page.route()?",
      "ja": "page.on('request')／page.on('response')イベントとpage.route()を比較した場合、正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "on('request') có thể fulfill() response giống hệt route(), chỉ khác cú pháp",
        "en": "on('request') can fulfill() a response just like route(), only the syntax differs",
        "ja": "on('request')はroute()と同様にfulfill()でレスポンスを返せる。構文が異なるだけ"
      },
      {
        "vi": "Sự kiện on('request')/on('response') chỉ dùng để QUAN SÁT (log, assert) mà không thể can thiệp hay sửa đổi request/response, trong khi route() có thể fulfill/abort/continue",
        "en": "The on('request')/on('response') events are only for OBSERVING (logging, asserting) and cannot intervene or modify request/response, while route() can fulfill/abort/continue",
        "ja": "on('request')／on('response')イベントは観察（ログ記録、アサーション）専用であり、リクエスト／レスポンスに介入・変更できないが、route()はfulfill/abort/continueが可能"
      },
      {
        "vi": "route() chỉ dùng để log, không thể sửa response; on('request') mới có thể sửa response",
        "en": "route() is only for logging and cannot modify responses; on('request') is what can modify responses",
        "ja": "route()はログ記録専用でレスポンスを変更できず、on('request')の方がレスポンスを変更できる"
      },
      {
        "vi": "Cả hai đều không thể dùng chung trong một test, phải chọn một trong hai",
        "en": "Both cannot be used together in the same test; you must choose one or the other",
        "ja": "両方を同じテストで併用することはできず、どちらか一方を選ぶ必要がある"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "page.on('request')/on('response') là event listener thuần túy để quan sát lưu lượng, không có khả năng chặn hay đổi nội dung; muốn can thiệp phải dùng page.route().",
      "en": "page.on('request')/on('response') are pure event listeners for observing traffic, with no ability to intercept or alter content; intervention requires page.route().",
      "ja": "page.on('request')／on('response')は純粋にトラフィックを観察するためのイベントリスナーであり、内容の遮断や変更はできません。介入するにはpage.route()が必要です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong test đo hiệu năng frontend khi API trả về danh sách rất lớn (10.000 phần tử), cách tạo dữ liệu mock lớn mà không cần backend thật sinh ra là gì?",
      "en": "When testing frontend performance with a very large API response (10,000 items), how can you create large mock data without needing a real backend to generate it?",
      "ja": "APIが非常に大きなレスポンス（10,000件）を返す際のフロントエンドパフォーマンスをテストする場合、実際のバックエンドにデータを生成させずに大きなモックデータを作成するにはどうすればよいですか。"
    },
    "options": [
      {
        "vi": "Playwright không hỗ trợ mock response lớn hơn 1000 phần tử",
        "en": "Playwright doesn't support mocking responses larger than 1000 items",
        "ja": "Playwrightは1000件を超えるレスポンスのモックをサポートしていない"
      },
      {
        "vi": "Phải yêu cầu backend thật insert 10.000 bản ghi vào database trước mỗi lần chạy test",
        "en": "You must ask the real backend to insert 10,000 records into the database before every test run",
        "ja": "テスト実行のたびに実際のバックエンドにデータベースへ10,000件のレコードを挿入させる必要がある"
      },
      {
        "vi": "Sinh mảng dữ liệu giả bằng vòng lặp trong test code, rồi truyền vào route.fulfill({body: JSON.stringify(bigArray)})",
        "en": "Generate a fake array via a loop in the test code, then pass it into route.fulfill({body: JSON.stringify(bigArray)})",
        "ja": "テストコード内のループで偽の配列を生成し、route.fulfill({body: JSON.stringify(bigArray)})に渡す"
      },
      {
        "vi": "Dùng page.route() nhưng chỉ trả về 1 phần tử rồi lặp lại request 10.000 lần",
        "en": "Use page.route() but return only 1 item and repeat the request 10,000 times",
        "ja": "page.route()を使うが1件だけ返し、リクエストを10,000回繰り返す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì fulfill() nhận body tự do, có thể lập trình sinh dữ liệu giả với số lượng lớn ngay trong test, hoàn toàn tách biệt khỏi backend thật, giúp test hiệu năng nhanh và có kiểm soát.",
      "en": "Since fulfill() accepts an arbitrary body, you can programmatically generate large fake datasets directly in the test, fully decoupled from the real backend, enabling fast, controlled performance testing.",
      "ja": "fulfill()は任意のbodyを受け付けるため、テスト内でプログラム的に大量の偽データを生成でき、実バックエンドから完全に独立した、高速で制御可能なパフォーマンステストが可能になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi mock một request nhưng vẫn muốn giữ nguyên các response header quan trọng như 'set-cookie' từ response thật, cách tiếp cận nào phù hợp?",
      "en": "When mocking a request but still wanting to preserve important response headers like 'set-cookie' from the real response, what approach is appropriate?",
      "ja": "リクエストをモックしつつ、実際のレスポンスから'set-cookie'のような重要なレスポンスヘッダーは保持したい場合、どのアプローチが適切ですか。"
    },
    "options": [
      {
        "vi": "Chỉ có thể giữ header gốc nếu dùng route.continue(), fulfill() luôn xóa toàn bộ header",
        "en": "Original headers can only be kept if using route.continue(); fulfill() always wipes all headers",
        "ja": "元のヘッダーを保持できるのはroute.continue()を使った場合のみで、fulfill()は常にすべてのヘッダーを消去する"
      },
      {
        "vi": "Không thể giữ header gốc khi đã dùng fulfill(), phải bỏ hết mọi header",
        "en": "It's impossible to keep original headers once fulfill() is used; all headers must be dropped",
        "ja": "fulfill()を使うと元のヘッダーは保持できず、すべて破棄する必要がある"
      },
      {
        "vi": "Header set-cookie tự động được Playwright thêm vào mọi fulfill() response mà không cần làm gì",
        "en": "The set-cookie header is automatically added to every fulfill() response by Playwright without any action needed",
        "ja": "set-cookieヘッダーは何もしなくてもPlaywrightがすべてのfulfill()レスポンスに自動的に付与する"
      },
      {
        "vi": "Dùng route.fetch() để lấy response thật, sau đó fulfill() lại với body đã sửa nhưng giữ nguyên headers gốc (hoặc merge có chọn lọc)",
        "en": "Use route.fetch() to get the real response, then fulfill() again with a modified body while preserving the original headers (or selectively merging)",
        "ja": "route.fetch()で実際のレスポンスを取得し、bodyは変更しつつ元のheadersは保持（または選択的にマージ）してfulfill()し直す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "route.fetch() trả về APIResponse thật, có thể lấy headers() của nó rồi truyền lại (kết hợp chỉnh sửa body) khi fulfill(), giữ được các header quan trọng như set-cookie.",
      "en": "route.fetch() returns the real APIResponse, whose headers() can be reused (combined with a modified body) when calling fulfill(), preserving important headers like set-cookie.",
      "ja": "route.fetch()は実際のAPIResponseを返すため、そのheaders()を取得し（bodyの変更と組み合わせて）fulfill()時に再利用でき、set-cookieのような重要なヘッダーを保持できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là ví dụ SAI về cách viết url pattern trong page.route()?",
      "en": "Which is an INCORRECT example of a url pattern in page.route()?",
      "ja": "page.route()のurlパターンの書き方として誤っている例はどれですか。"
    },
    "options": [
      {
        "vi": "page.route('SELECT * FROM requests WHERE url LIKE api', handler) — dùng cú pháp SQL để lọc URL",
        "en": "page.route('SELECT * FROM requests WHERE url LIKE api', handler) — using SQL syntax to filter URLs",
        "ja": "page.route('SELECT * FROM requests WHERE url LIKE api', handler) — URLをフィルタするためSQL構文を使う"
      },
      {
        "vi": "page.route('**/api/users/**', handler) — dùng glob pattern với wildcard",
        "en": "page.route('**/api/users/**', handler) — using a glob pattern with wildcards",
        "ja": "page.route('**/api/users/**', handler) — ワイルドカードを使ったglobパターン"
      },
      {
        "vi": "page.route(url => url.pathname.startsWith('/api'), handler) — dùng hàm predicate nhận URL object",
        "en": "page.route(url => url.pathname.startsWith('/api'), handler) — using a predicate function that receives a URL object",
        "ja": "page.route(url => url.pathname.startsWith('/api'), handler) — URLオブジェクトを受け取る述語関数を使う"
      },
      {
        "vi": "page.route(/\\/api\\/users\\/\\d+$/, handler) — dùng regular expression để khớp URL có số id",
        "en": "page.route(/\\/api\\/users\\/\\d+$/, handler) — using a regular expression to match a URL with a numeric id",
        "ja": "page.route(/\\/api\\/users\\/\\d+$/, handler) — 数値IDを含むURLに一致させるため正規表現を使う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright chỉ chấp nhận glob string, RegExp, hoặc hàm predicate cho tham số url của route(); cú pháp SQL không có ý nghĩa và không được hỗ trợ.",
      "en": "Playwright's route() url parameter only accepts a glob string, RegExp, or predicate function; SQL syntax is meaningless and unsupported.",
      "ja": "Playwrightのroute()のurlパラメータはglob文字列、RegExp、述語関数のみを受け付けます。SQL構文は無意味でサポートされていません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test một tính năng upload file, muốn xác nhận rằng request gửi lên đúng có multipart/form-data chứa file, cách kiểm tra bằng route là gì?",
      "en": "When testing a file upload feature, to confirm the outgoing request has multipart/form-data containing the file, how can this be checked using route?",
      "ja": "ファイルアップロード機能をテストする際、送信リクエストにファイルを含むmultipart/form-dataが正しく含まれていることを確認するには、routeを使ってどう検証すればよいですか。"
    },
    "options": [
      {
        "vi": "Không thể kiểm tra được vì Playwright không cho đọc request khi có file đính kèm",
        "en": "This cannot be checked because Playwright doesn't allow reading requests with file attachments",
        "ja": "ファイル添付付きのリクエストはPlaywrightで読み取れないため確認できない"
      },
      {
        "vi": "Trong route handler, kiểm tra route.request().headers()['content-type'] chứa 'multipart/form-data' và postData() có độ dài > 0 trước khi continue()",
        "en": "In the route handler, check that route.request().headers()['content-type'] contains 'multipart/form-data' and postData() has length > 0 before calling continue()",
        "ja": "ルートハンドラー内でroute.request().headers()['content-type']に'multipart/form-data'が含まれ、postData()の長さが0より大きいことを確認してからcontinue()する"
      },
      {
        "vi": "Phải mở file trên đĩa bằng fs và so sánh byte-by-byte với route.request()",
        "en": "You must open the file on disk with fs and compare byte-by-byte with route.request()",
        "ja": "fsでディスク上のファイルを開き、route.request()とバイト単位で比較する必要がある"
      },
      {
        "vi": "Chỉ có thể xác nhận qua response, không thể qua request",
        "en": "You can only confirm this via the response, not the request",
        "ja": "レスポンス経由でのみ確認可能で、リクエスト経由では確認できない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "route.request() vẫn cho phép đọc header và postData() ngay cả với request multipart, đủ để kiểm tra sơ bộ rằng file đã được đính kèm đúng định dạng.",
      "en": "route.request() still allows reading headers and postData() even for multipart requests, sufficient for a basic check that the file was attached with the correct format.",
      "ja": "route.request()はマルチパートリクエストでもheadersとpostData()の読み取りが可能で、ファイルが正しい形式で添付されたことを簡易的に確認するには十分です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, một test dùng route.fulfill() để mock API nhưng đôi khi bị fail vì route đăng ký SAU KHI trang đã bắt đầu gọi request (do gọi page.route() sau page.goto()). Cách khắc phục đúng là gì?",
      "en": "In CI, a test using route.fulfill() to mock an API sometimes fails because the route is registered AFTER the page already started the request (calling page.route() after page.goto()). What is the correct fix?",
      "ja": "CIにおいて、route.fulfill()でAPIをモックするテストが、ページがすでにリクエストを開始した後にルートを登録している（page.goto()の後にpage.route()を呼んでいる）ため、時々失敗します。正しい修正方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng page.reload() hai lần liên tiếp để đảm bảo route được áp dụng",
        "en": "Call page.reload() twice in a row to ensure the route is applied",
        "ja": "ルートが適用されるようpage.reload()を2回連続で呼ぶ"
      },
      {
        "vi": "Thêm page.waitForTimeout(5000) sau goto() rồi mới route() để chờ mọi request cũ kết thúc",
        "en": "Add page.waitForTimeout(5000) after goto() then call route() to wait for old requests to finish",
        "ja": "goto()の後にpage.waitForTimeout(5000)を追加してからroute()を呼び、古いリクエストが終わるのを待つ"
      },
      {
        "vi": "Đăng ký page.route() TRƯỚC khi gọi page.goto(), đảm bảo handler đã sẵn sàng chặn request ngay từ đầu",
        "en": "Register page.route() BEFORE calling page.goto(), ensuring the handler is ready to intercept requests from the start",
        "ja": "page.route()をpage.goto()の前に登録し、最初からリクエストをインターセプトできる状態にしておく"
      },
      {
        "vi": "Vấn đề này không liên quan đến thứ tự gọi route() và goto()",
        "en": "This issue is unrelated to the order of calling route() and goto()",
        "ja": "この問題はroute()とgoto()の呼び出し順序とは無関係"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Route handler chỉ áp dụng cho request phát sinh SAU khi đăng ký; vì vậy cần route() trước goto() để chắc chắn request điều hướng và các request theo sau đều bị chặn đúng.",
      "en": "A route handler only applies to requests initiated AFTER registration; hence route() must precede goto() to guarantee the navigation and subsequent requests are properly intercepted.",
      "ja": "ルートハンドラーは登録後に発生したリクエストにのみ適用されるため、ナビゲーションとその後のリクエストが確実にインターセプトされるよう、route()をgoto()より前に呼ぶ必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào đúng về việc dùng page.route() để mock response cho request kiểu 'document' (chính trang HTML) so với mock các API request?",
      "en": "Which statement is correct about using page.route() to mock a 'document' request (the main HTML page) compared to mocking API requests?",
      "ja": "page.route()を使って'document'リクエスト（メインHTMLページ）をモックする場合、APIリクエストのモックと比較して正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "Mock document request sẽ làm crash trình duyệt vì vi phạm same-origin policy",
        "en": "Mocking a document request will crash the browser due to same-origin policy violations",
        "ja": "documentリクエストをモックするとsame-origin policy違反によりブラウザがクラッシュする"
      },
      {
        "vi": "page.route() chỉ hoạt động với request kiểu 'xhr' hoặc 'fetch', tuyệt đối không can thiệp được request document",
        "en": "page.route() only works with 'xhr' or 'fetch' request types and absolutely cannot intercept document requests",
        "ja": "page.route()は'xhr'または'fetch'タイプのリクエストにのみ動作し、documentリクエストには絶対に介入できない"
      },
      {
        "vi": "Muốn mock request document phải dùng API riêng gọi là page.routeDocument()",
        "en": "To mock document requests you must use a separate API called page.routeDocument()",
        "ja": "documentリクエストをモックするにはpage.routeDocument()という別のAPIを使う必要がある"
      },
      {
        "vi": "Playwright hỗ trợ mock cả request document (thay đổi toàn bộ nội dung HTML trả về), không giới hạn chỉ ở API/XHR",
        "en": "Playwright supports mocking document requests too (replacing the entire returned HTML content), not limited to just API/XHR",
        "ja": "Playwrightはdocumentリクエストのモック（返されるHTMLコンテンツ全体の置き換え）もサポートしており、API／XHRに限定されない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "route() chặn được mọi loại request bao gồm cả document (điều hướng trang), cho phép thay thế toàn bộ HTML nếu cần, không chỉ giới hạn ở XHR/fetch.",
      "en": "route() intercepts every request type including document (navigation) requests, allowing full HTML replacement if needed, not limited to XHR/fetch.",
      "ja": "route()はdocument（ナビゲーション）リクエストを含むあらゆる種類のリクエストをインターセプトでき、必要に応じてHTML全体を置き換えることも可能で、XHR/fetchに限定されません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, để nhiều test file dùng chung một phiên đăng nhập đã lưu, người ta thường tổ chức một 'project' setup riêng chạy trước rồi khai báo phụ thuộc (dependency) cho các project test khác. Cấu hình này nằm ở đâu?",
      "en": "In Playwright, to let multiple test files share one saved login session, teams typically create a separate 'setup' project that runs first and declare it as a dependency for other test projects. Where is this configured?",
      "ja": "Playwrightで複数のテストファイルが同じ保存済みログインセッションを共有できるようにするため、先に実行する専用の『setup』プロジェクトを作り、他のテストプロジェクトの依存関係として指定することが一般的です。この設定はどこで行いますか。"
    },
    "options": [
      {
        "vi": "Trong playwright.config.ts, mảng projects với thuộc tính dependencies",
        "en": "In playwright.config.ts, the projects array using the dependencies property",
        "ja": "playwright.config.tsのprojects配列でdependenciesプロパティを使用する"
      },
      {
        "vi": "Trong package.json, mục scripts",
        "en": "In package.json, under scripts",
        "ja": "package.jsonのscriptsセクション"
      },
      {
        "vi": "Trong file .env của môi trường CI",
        "en": "In the CI environment's .env file",
        "ja": "CI環境の.envファイル"
      },
      {
        "vi": "Trong tsconfig.json, mục paths",
        "en": "In tsconfig.json, under paths",
        "ja": "tsconfig.jsonのpathsセクション"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright hỗ trợ khai báo project 'setup' và dùng thuộc tính dependencies trong playwright.config.ts để các project test khác chờ setup chạy xong trước, đảm bảo storageState đã sẵn sàng.",
      "en": "Playwright lets you declare a setup project and use the dependencies property in playwright.config.ts so other test projects wait for setup to finish first, ensuring storageState is ready.",
      "ja": "Playwrightではsetupプロジェクトを定義し、playwright.config.tsのdependenciesプロパティを使って他のテストプロジェクトがsetup完了を待つようにでき、storageStateの準備が保証されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "File auth.setup.ts điển hình dùng để đăng nhập một lần và lưu trạng thái, thường gọi API nào của Playwright để ghi trạng thái ra file JSON?",
      "en": "A typical auth.setup.ts file logs in once and saves state — which Playwright API is typically called to write the state to a JSON file?",
      "ja": "典型的なauth.setup.tsファイルは一度だけログインして状態を保存しますが、状態をJSONファイルに書き出すために通常呼び出すPlaywrightのAPIはどれですか。"
    },
    "options": [
      {
        "vi": "page.screenshot()",
        "en": "page.screenshot()",
        "ja": "page.screenshot()"
      },
      {
        "vi": "page.context().storageState({ path })",
        "en": "page.context().storageState({ path })",
        "ja": "page.context().storageState({ path })"
      },
      {
        "vi": "page.evaluate()",
        "en": "page.evaluate()",
        "ja": "page.evaluate()"
      },
      {
        "vi": "page.waitForLoadState()",
        "en": "page.waitForLoadState()",
        "ja": "page.waitForLoadState()"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "storageState({path}) trên context sẽ tuần tự hoá cookie và localStorage hiện tại rồi ghi ra file JSON tại đường dẫn chỉ định.",
      "en": "Calling storageState({path}) on a context serializes the current cookies and localStorage and writes them to a JSON file at the given path.",
      "ja": "コンテキストでstorageState({path})を呼び出すと、現在のクッキーとlocalStorageがシリアライズされ、指定パスのJSONファイルに書き出されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một team có hai vai trò 'admin' và 'user' cần test song song với hai phiên đăng nhập khác nhau. Cách tiếp cận phù hợp nhất trong Playwright là gì?",
      "en": "A team needs to test two roles 'admin' and 'user' in parallel with two different logged-in sessions. What is the most appropriate Playwright approach?",
      "ja": "あるチームは『admin』と『user』という2つのロールを、それぞれ異なるログイン済みセッションで並行してテストする必要があります。Playwrightで最も適切なアプローチはどれですか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng một storageState chung, đổi quyền bằng cách sửa cookie thủ công trong test",
        "en": "Use a single shared storageState and manually edit cookies in each test to switch roles",
        "ja": "1つの共有storageStateだけを使い、テスト内で手動でクッキーを書き換えてロールを切り替える"
      },
      {
        "vi": "Đăng nhập lại bằng UI trong mỗi test case bất kể vai trò nào",
        "en": "Always log in via the UI inside every single test case regardless of role",
        "ja": "ロールに関わらず、すべてのテストケース内でUIから毎回ログインし直す"
      },
      {
        "vi": "Tạo hai file storageState riêng (vd admin.json, user.json) và khai báo project hoặc test.use({storageState}) tương ứng cho từng nhóm test",
        "en": "Create two separate storageState files (e.g. admin.json, user.json) and configure separate projects or test.use({storageState}) per test group",
        "ja": "admin.json、user.jsonのように別々のstorageStateファイルを作成し、テストグループごとにプロジェクトまたはtest.use({storageState})を設定する"
      },
      {
        "vi": "Dùng chung một browser context cho toàn bộ test suite để tránh tạo nhiều file",
        "en": "Share a single browser context across the entire test suite to avoid creating multiple files",
        "ja": "複数ファイルを作らないようにテストスイート全体で1つのブラウザコンテキストを共有する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tách file storageState theo vai trò và gán riêng cho từng project/test giúp các phiên độc lập, chạy song song an toàn, dễ bảo trì.",
      "en": "Separating storageState files per role and assigning them to distinct projects/tests keeps sessions independent, safe for parallel execution, and easy to maintain.",
      "ja": "ロールごとにstorageStateファイルを分け、それぞれのプロジェクト/テストに割り当てることで、セッションが独立し並列実行でも安全でメンテナンスしやすくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "storageState mà Playwright lưu ra file JSON bao gồm những loại dữ liệu nào?",
      "en": "What kinds of data does the storageState JSON file saved by Playwright include?",
      "ja": "Playwrightが保存するstorageStateのJSONファイルには、どのような種類のデータが含まれますか。"
    },
    "options": [
      {
        "vi": "Chỉ cookie của domain hiện tại",
        "en": "Only cookies of the current domain",
        "ja": "現在のドメインのクッキーのみ"
      },
      {
        "vi": "Ảnh chụp DOM hiện tại của trang",
        "en": "A snapshot of the page's current DOM",
        "ja": "現在のページのDOMスナップショット"
      },
      {
        "vi": "Toàn bộ lịch sử điều hướng của trình duyệt",
        "en": "The full browser navigation history",
        "ja": "ブラウザのナビゲーション履歴全体"
      },
      {
        "vi": "Cookie và dữ liệu localStorage theo từng origin",
        "en": "Cookies and localStorage data per origin",
        "ja": "クッキーとオリジンごとのlocalStorageデータ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cấu trúc storageState gồm mảng cookies toàn cục và mảng origins, mỗi origin chứa localStorage tương ứng, không lưu sessionStorage hay lịch sử điều hướng.",
      "en": "The storageState structure has a global cookies array and an origins array, each origin holding its localStorage entries — it does not capture sessionStorage or navigation history.",
      "ja": "storageStateの構造はグローバルなcookies配列とorigins配列から成り、各originにlocalStorageが含まれます。sessionStorageやナビゲーション履歴は保存されません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một ứng dụng lưu token đăng nhập trong sessionStorage thay vì cookie hay localStorage. Điều gì xảy ra khi dùng storageState mặc định của Playwright?",
      "en": "An application stores its login token in sessionStorage instead of cookies or localStorage. What happens with Playwright's default storageState?",
      "ja": "あるアプリケーションがログイントークンをクッキーやlocalStorageではなくsessionStorageに保存しています。Playwrightのデフォルトのstorage Stateを使うとどうなりますか。"
    },
    "options": [
      {
        "vi": "sessionStorage KHÔNG được ghi vào storageState nên phiên đăng nhập dựa vào nó sẽ không được khôi phục",
        "en": "sessionStorage is NOT captured in storageState, so a login relying on it will not be restored",
        "ja": "sessionStorageはstorageStateに含まれないため、それに依存するログイン状態は復元されない"
      },
      {
        "vi": "sessionStorage vẫn được lưu và khôi phục bình thường như localStorage",
        "en": "sessionStorage is saved and restored normally just like localStorage",
        "ja": "sessionStorageもlocalStorageと同様に正常に保存・復元される"
      },
      {
        "vi": "Playwright tự động chuyển sessionStorage thành localStorage khi lưu",
        "en": "Playwright automatically converts sessionStorage into localStorage when saving",
        "ja": "Playwrightは保存時にsessionStorageを自動的にlocalStorageへ変換する"
      },
      {
        "vi": "Playwright báo lỗi và dừng test ngay khi phát hiện sessionStorage",
        "en": "Playwright throws an error and stops the test as soon as it detects sessionStorage usage",
        "ja": "Playwrightはsession Storageの使用を検知すると即座にエラーを出してテストを停止する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "storageState hiện tại của Playwright chỉ ghi cookie và localStorage; sessionStorage bị bỏ qua nên cần giải pháp khác (ví dụ inject script) nếu app phụ thuộc vào nó.",
      "en": "Playwright's storageState only captures cookies and localStorage; sessionStorage is not included, so apps relying on it need a workaround such as injecting a script.",
      "ja": "PlaywrightのstorageStateはクッキーとlocalStorageのみを保存し、sessionStorageは対象外です。それに依存するアプリではスクリプト注入などの回避策が必要です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, việc tạo storageState mỗi lần chạy pipeline bằng cách đăng nhập qua UI có nhược điểm gì đáng chú ý so với đăng nhập qua API?",
      "en": "Generating storageState on every CI pipeline run by logging in through the UI has what notable drawback compared to logging in via API?",
      "ja": "CIパイプラインの実行ごとにUI経由でログインしてstorageStateを生成する方法は、API経由のログインと比べてどのような顕著な欠点がありますか。"
    },
    "options": [
      {
        "vi": "Không thể lưu ra file JSON được",
        "en": "It cannot be saved to a JSON file at all",
        "ja": "そもそもJSONファイルに保存できない"
      },
      {
        "vi": "Chậm hơn và dễ bị ảnh hưởng bởi thay đổi giao diện (selector, captcha, MFA) làm setup không ổn định",
        "en": "It is slower and more fragile to UI changes (selectors, captcha, MFA), making setup less stable",
        "ja": "処理が遅く、UIの変更（セレクタ、キャプチャ、MFA）の影響を受けやすくセットアップが不安定になる"
      },
      {
        "vi": "Không tương thích với trình duyệt Chromium",
        "en": "It is incompatible with the Chromium browser",
        "ja": "Chromiumブラウザと互換性がない"
      },
      {
        "vi": "Chỉ hoạt động trên hệ điều hành Windows",
        "en": "It only works on Windows operating systems",
        "ja": "Windows OS上でしか動作しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đăng nhập qua UI kéo theo render trang, các bước thao tác và phụ thuộc selector nên chậm và dễ gãy hơn; gọi thẳng API đăng nhập (APIRequestContext) rồi lưu storageState thường nhanh và ổn định hơn.",
      "en": "UI login involves page rendering, multiple steps and selector dependencies, making it slower and more brittle; calling the login API directly (APIRequestContext) and saving storageState is typically faster and more stable.",
      "ja": "UIログインはページ描画や複数の操作、セレクタ依存を伴うため遅く壊れやすくなります。ログインAPIを直接呼び出し（APIRequestContext）storageStateを保存する方が通常は速く安定します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu muốn một test cụ thể chạy KHÔNG đăng nhập (ẩn danh) trong khi các test khác trong cùng project đều dùng storageState đã lưu, nên làm thế nào?",
      "en": "If you want one specific test to run WITHOUT being logged in (anonymous) while other tests in the same project use the saved storageState, what should you do?",
      "ja": "同じプロジェクト内の他のテストは保存済みstorageStateを使う中で、特定の1つのテストだけログインしていない（匿名）状態で実行したい場合、どうすればよいですか。"
    },
    "options": [
      {
        "vi": "Xóa file storageState trước khi chạy toàn bộ suite",
        "en": "Delete the storageState file before running the whole suite",
        "ja": "スイート全体の実行前にstorageStateファイルを削除する"
      },
      {
        "vi": "Chạy test đó bằng trình duyệt khác không hỗ trợ cookie",
        "en": "Run that test in a different browser that does not support cookies",
        "ja": "クッキーをサポートしない別のブラウザでそのテストを実行する"
      },
      {
        "vi": "Dùng test.use({ storageState: undefined }) trong describe block hoặc file chứa test đó",
        "en": "Use test.use({ storageState: undefined }) in the describe block or file containing that test",
        "ja": "そのテストを含むdescribeブロックやファイルでtest.use({ storageState: undefined })を使う"
      },
      {
        "vi": "Thêm await page.reload() hai lần liên tiếp trước khi test bắt đầu",
        "en": "Add await page.reload() twice in a row before the test begins",
        "ja": "テスト開始前にawait page.reload()を2回連続で実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "test.use({storageState: undefined}) ghi đè storageState mặc định của project cho phạm vi file/describe đó, tạo context sạch không có phiên đăng nhập.",
      "en": "test.use({storageState: undefined}) overrides the project's default storageState for that file/describe scope, producing a clean context with no logged-in session.",
      "ja": "test.use({storageState: undefined})はそのファイル/describeの範囲でプロジェクトのデフォルトstorageStateを上書きし、ログインセッションのないクリーンなコンテキストを作ります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một hệ thống dùng xác thực đa yếu tố (MFA/OTP) khiến việc đăng nhập tự động qua UI khó lặp lại ổn định trong test. Chiến lược nào thường được khuyến nghị để vẫn có được storageState hợp lệ cho automation?",
      "en": "A system uses multi-factor authentication (MFA/OTP), making automated UI login hard to repeat reliably in tests. What strategy is commonly recommended to still obtain a valid storageState for automation?",
      "ja": "多要素認証（MFA/OTP）を使用しているシステムでは、UI経由の自動ログインを安定して繰り返すのが難しくなります。それでも自動化用の有効なstorageStateを取得するために一般的に推奨される戦略は何ですか。"
    },
    "options": [
      {
        "vi": "Tăng timeout mặc định của toàn bộ test suite lên vài giờ",
        "en": "Increase the whole test suite's default timeout to several hours",
        "ja": "テストスイート全体のデフォルトタイムアウトを数時間に延長する"
      },
      {
        "vi": "Chạy test vào ban đêm để giảm khả năng bị yêu cầu OTP",
        "en": "Run tests at night to reduce the chance of being prompted for OTP",
        "ja": "OTPを要求される可能性を減らすため夜間にテストを実行する"
      },
      {
        "vi": "Tắt JavaScript trong trình duyệt khi chạy test đăng nhập",
        "en": "Disable JavaScript in the browser when running the login test",
        "ja": "ログインテスト実行時にブラウザのJavaScriptを無効にする"
      },
      {
        "vi": "Bỏ qua bước MFA bằng cách thiết lập tài khoản test/backdoor hoặc cấp token qua API riêng cho môi trường test, rồi tạo storageState từ đó",
        "en": "Bypass MFA using dedicated test accounts/backdoor endpoints or a test-only API that issues a token, then build storageState from that",
        "ja": "専用のテストアカウントやバックドア用エンドポイント、テスト環境限定のトークン発行APIでMFAを迂回し、そこからstorageStateを構築する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thực tế phổ biến là môi trường test cấp cơ chế đăng nhập rút gọn (test account, mã OTP cố định, hoặc endpoint cấp token) để automation lấy được phiên hợp lệ mà không phải giả lập MFA qua UI.",
      "en": "A common practice is for the test environment to expose a shortened login path (test accounts, fixed OTP, or a token-issuing endpoint) so automation can obtain a valid session without simulating MFA through the UI.",
      "ja": "一般的なプラクティスとして、テスト環境にテストアカウントや固定OTP、トークン発行エンドポイントなど簡略化されたログイン手段を用意し、UI経由でMFAを再現せずに有効なセッションを取得できるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Giả sử token đăng nhập trong storageState có thời hạn ngắn (ví dụ 30 phút) và test suite chạy lâu hơn thế. Vấn đề nào có thể phát sinh nếu chỉ tạo storageState một lần ở đầu pipeline?",
      "en": "Suppose the login token in storageState has a short lifetime (e.g. 30 minutes) and the test suite runs longer than that. What problem can arise if storageState is only generated once at the start of the pipeline?",
      "ja": "storageState内のログイントークンの有効期限が短く（例：30分）、テストスイートの実行時間がそれより長いとします。パイプライン開始時に一度だけstorageStateを生成した場合、どのような問題が起こり得ますか。"
    },
    "options": [
      {
        "vi": "Các test chạy sau khi token hết hạn sẽ bị đăng xuất/nhận lỗi 401, gây fail không liên quan đến lỗi thực tế của ứng dụng",
        "en": "Tests running after the token expires will get logged out or receive 401 errors, causing failures unrelated to real application bugs",
        "ja": "トークン失効後に実行されるテストはログアウト状態や401エラーとなり、実際のアプリ不具合とは無関係な失敗が発生する"
      },
      {
        "vi": "Không có vấn đề gì vì Playwright tự động làm mới token khi hết hạn",
        "en": "No problem, because Playwright automatically refreshes the token upon expiry",
        "ja": "Playwrightが期限切れ時に自動的にトークンを更新するため問題は起こらない"
      },
      {
        "vi": "File storageState sẽ tự bị Playwright xóa khi token hết hạn",
        "en": "Playwright will automatically delete the storageState file once the token expires",
        "ja": "トークン失効時にPlaywrightがstorageStateファイルを自動削除する"
      },
      {
        "vi": "Trình duyệt sẽ crash ngay lập tức khi mở trang có token hết hạn",
        "en": "The browser will crash immediately when opening a page with an expired token",
        "ja": "失効したトークンを含むページを開くとブラウザが即座にクラッシュする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright không tự làm mới token; nếu thời hạn phiên ngắn hơn thời gian chạy suite, cần chiến lược làm mới storageState định kỳ hoặc dùng refresh token, nếu không các test cuối sẽ fail do phiên hết hạn.",
      "en": "Playwright does not refresh tokens on its own; if the session lifetime is shorter than the suite's runtime, you need a strategy to periodically regenerate storageState or use a refresh token, otherwise later tests fail due to an expired session.",
      "ja": "Playwrightはトークンを自動更新しません。セッションの有効期限がスイートの実行時間より短い場合、storageStateを定期的に再生成する仕組みやリフレッシュトークンの利用が必要で、そうしないと後半のテストがセッション失効で失敗します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi commit code lên repository, việc để file storageState (chứa cookie/token thật) nằm trong lịch sử git tiềm ẩn rủi ro gì?",
      "en": "When committing code to a repository, leaving the storageState file (containing real cookies/tokens) in git history poses what risk?",
      "ja": "リポジトリへコミットする際、実際のクッキーやトークンを含むstorageStateファイルをgit履歴に残すと、どのようなリスクがありますか。"
    },
    "options": [
      {
        "vi": "Không có rủi ro vì storageState chỉ chứa dữ liệu giao diện",
        "en": "No risk, since storageState only contains UI layout data",
        "ja": "storageStateはUIレイアウトデータのみを含むためリスクはない"
      },
      {
        "vi": "Rò rỉ thông tin xác thực nhạy cảm (cookie/token phiên) cho bất kỳ ai có quyền đọc repo, có thể bị lợi dụng để mạo danh phiên đăng nhập",
        "en": "It leaks sensitive authentication data (session cookies/tokens) to anyone with repo read access, which could be exploited to hijack the session",
        "ja": "リポジトリの閲覧権限を持つ誰にでも機密の認証情報（セッションクッキー/トークン）が漏洩し、セッションの乗っ取りに悪用され得る"
      },
      {
        "vi": "Làm tăng thời gian build của CI đáng kể",
        "en": "It significantly increases CI build time",
        "ja": "CIのビルド時間が大幅に増加する"
      },
      {
        "vi": "Khiến Playwright không thể chạy song song (parallel) được nữa",
        "en": "It prevents Playwright from running tests in parallel",
        "ja": "Playwrightが並列実行できなくなる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "storageState chứa cookie/token thật của phiên đăng nhập; nên thêm vào .gitignore và tạo mới trong CI ở mỗi lần chạy hoặc lưu an toàn qua secrets, tránh commit vào repo.",
      "en": "storageState contains real session cookies/tokens; it should be added to .gitignore and regenerated in CI on each run, or stored securely via secrets, rather than committed to the repo.",
      "ja": "storageStateには実際のセッションクッキー/トークンが含まれます。.gitignoreに追加し、CIの実行ごとに再生成するか、シークレット経由で安全に管理し、リポジトリへコミットしないようにすべきです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So sánh việc dùng globalSetup (trong playwright.config) với dùng project 'setup' + dependencies để tạo storageState, phát biểu nào ĐÚNG?",
      "en": "Comparing using globalSetup (in playwright.config) versus a 'setup' project + dependencies to create storageState, which statement is TRUE?",
      "ja": "storageState作成において、playwright.configのglobalSetupを使う方法と『setup』プロジェクト＋dependenciesを使う方法を比較したとき、正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "globalSetup không thể chạy trong ngữ cảnh trình duyệt (browser context) nên không bao giờ tạo được storageState",
        "en": "globalSetup can never run in a browser context, so it can never create storageState",
        "ja": "globalSetupはブラウザコンテキスト内で実行できないため、storageStateを作成することは絶対にできない"
      },
      {
        "vi": "globalSetup chạy song song với mọi test nên nhanh hơn project setup",
        "en": "globalSetup runs in parallel with every test, making it faster than a setup project",
        "ja": "globalSetupはすべてのテストと並行実行されるためsetupプロジェクトより高速である"
      },
      {
        "vi": "Cả hai đều có thể tạo storageState, nhưng project setup có ưu điểm là xuất hiện trong báo cáo test, hỗ trợ retry/trace như test bình thường và dễ debug hơn",
        "en": "Both can create storageState, but the setup-project approach has the advantage of appearing in the test report, supporting retries/traces like a normal test, and being easier to debug",
        "ja": "どちらもstorageStateを作成できるが、setupプロジェクト方式にはテストレポートに表示され、通常のテストと同様にリトライやトレースをサポートしデバッグしやすいという利点がある"
      },
      {
        "vi": "Project setup chỉ hoạt động với trình duyệt Firefox",
        "en": "The setup-project approach only works with the Firefox browser",
        "ja": "setupプロジェクト方式はFirefoxブラウザでしか動作しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "globalSetup vẫn có thể mở browser thủ công để đăng nhập, nhưng Playwright khuyến nghị dùng project setup vì nó được coi như một test thật, có trace/retry/report, dễ theo dõi khi lỗi.",
      "en": "globalSetup can still launch a browser manually to log in, but Playwright recommends the setup-project pattern because it's treated as a real test with trace/retry/reporting, making failures easier to diagnose.",
      "ja": "globalSetupでもブラウザを手動起動してログインは可能ですが、Playwrightはsetupプロジェクト方式を推奨しています。これは実際のテストとして扱われ、トレース・リトライ・レポートが得られ、失敗時の調査がしやすいためです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy test song song với nhiều worker, việc mọi worker dùng CHUNG một file storageState nhưng KHÔNG dùng chung một browser context có ý nghĩa gì?",
      "en": "When running tests in parallel across multiple workers, if every worker uses the SAME storageState file but does NOT share a single browser context, what does this mean?",
      "ja": "複数ワーカーで並列テストを実行する際、すべてのワーカーが同じstorageStateファイルを使うが、単一のブラウザコンテキストは共有しない場合、これはどういう意味ですか。"
    },
    "options": [
      {
        "vi": "Việc dùng chung storageState giữa các worker luôn bị Playwright cấm và báo lỗi khi khởi động",
        "en": "Sharing storageState across workers is always forbidden by Playwright and throws a startup error",
        "ja": "ワーカー間でstorageStateを共有することは常にPlaywrightで禁止されており、起動時にエラーになる"
      },
      {
        "vi": "Tất cả worker sẽ tranh chấp (race condition) trên cùng một cookie thực khi chạy đồng thời",
        "en": "All workers will race-condition on the exact same live cookie while running concurrently",
        "ja": "すべてのワーカーが並行実行中に同一の実クッキーを奪い合う競合状態になる"
      },
      {
        "vi": "Playwright sẽ tự động gộp các worker thành một tiến trình duy nhất",
        "en": "Playwright will automatically merge the workers into a single process",
        "ja": "Playwrightがワーカーを自動的に1つのプロセスへ統合する"
      },
      {
        "vi": "Mỗi worker sẽ tạo context riêng biệt khởi tạo từ cùng dữ liệu phiên, nên các test vẫn cô lập với nhau (không chia sẻ cookie runtime) dù xuất phát điểm đăng nhập giống nhau",
        "en": "Each worker creates its own separate context initialized from the same session data, so tests remain isolated from each other (no shared runtime cookies) despite starting from the same logged-in state",
        "ja": "各ワーカーは同じセッションデータから初期化された独自のコンテキストを作成するため、ログイン開始状態は同じでも実行時のクッキーは共有されずテストは互いに独立している"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "storageState chỉ là dữ liệu khởi tạo; mỗi browser context được tạo từ nó là bản sao độc lập, thay đổi cookie/localStorage trong một context không ảnh hưởng context khác, nên chạy song song vẫn an toàn.",
      "en": "storageState is just initialization data; each browser context created from it is an independent copy, so changes to cookies/localStorage in one context don't affect another, keeping parallel runs safe.",
      "ja": "storageStateは単なる初期化データであり、そこから作成される各ブラウザコンテキストは独立したコピーです。あるコンテキストでのクッキー/localStorageの変更は他に影響しないため、並列実行でも安全です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một dự án cần test cả trường hợp 'đã đăng nhập' và 'chưa đăng nhập' cho cùng một trang. Cách tổ chức project trong playwright.config nào hợp lý nhất?",
      "en": "A project needs to test both the 'logged-in' and 'not logged-in' cases for the same page. What is the most sensible way to organize projects in playwright.config?",
      "ja": "あるプロジェクトで同じページについて『ログイン済み』と『未ログイン』の両方のケースをテストする必要があります。playwright.configのプロジェクト構成として最も妥当な方法はどれですか。"
    },
    "options": [
      {
        "vi": "Tạo hai project riêng, một dùng storageState đã lưu, một không set storageState (hoặc set undefined)",
        "en": "Create two separate projects, one using the saved storageState and one with no storageState set (or set to undefined)",
        "ja": "保存済みstorageStateを使うプロジェクトと、storageStateを設定しない（またはundefinedにする）プロジェクトの2つを作成する"
      },
      {
        "vi": "Chỉ tạo một project và luôn đăng xuất thủ công ở cuối mỗi test",
        "en": "Create only one project and always manually log out at the end of every test",
        "ja": "プロジェクトを1つだけ作成し、すべてのテストの最後に手動でログアウトする"
      },
      {
        "vi": "Dùng cùng một storageState cho cả hai trường hợp vì Playwright tự phân biệt được",
        "en": "Use the same storageState for both cases since Playwright automatically distinguishes them",
        "ja": "Playwrightが自動的に区別してくれるため、両ケースで同じstorageStateを使う"
      },
      {
        "vi": "Không thể test trường hợp chưa đăng nhập nếu project đã cấu hình storageState mặc định",
        "en": "It's impossible to test the not-logged-in case once a project has a default storageState configured",
        "ja": "プロジェクトにデフォルトのstorageStateが設定されている場合、未ログインのケースはテストできない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tách thành hai project với cấu hình storageState khác nhau (có/không) là cách rõ ràng, tận dụng cơ chế project của Playwright thay vì xử lý thủ công trong từng test.",
      "en": "Splitting into two projects with different storageState settings (present/absent) is the cleanest approach, leveraging Playwright's project mechanism instead of handling it manually in each test.",
      "ja": "storageStateの設定（あり/なし）が異なる2つのプロジェクトに分けるのが明確な方法で、各テストで手動処理するのではなくPlaywrightのプロジェクト機構を活用できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright Test, đâu là cách đúng để một test cụ thể sử dụng storageState khác với storageState mặc định của project mà nó thuộc về?",
      "en": "In Playwright Test, what is the correct way for a specific test to use a storageState different from its project's default storageState?",
      "ja": "Playwright Testにおいて、特定のテストが所属プロジェクトのデフォルトとは異なるstorageStateを使うための正しい方法はどれですか。"
    },
    "options": [
      {
        "vi": "Sửa trực tiếp file playwright.config.ts mỗi lần chạy test đó",
        "en": "Directly edit playwright.config.ts every time before running that test",
        "ja": "そのテストを実行するたびにplaywright.config.tsを直接編集する"
      },
      {
        "vi": "Gọi test.use({ storageState: 'path/to/other.json' }) ở đầu file hoặc trong describe block chứa test đó",
        "en": "Call test.use({ storageState: 'path/to/other.json' }) at the top of the file or in the describe block containing that test",
        "ja": "そのテストを含むファイルの先頭またはdescribeブロック内でtest.use({ storageState: 'path/to/other.json' })を呼び出す"
      },
      {
        "vi": "Đặt tên file test kết thúc bằng .auth.spec.ts để Playwright tự nhận diện",
        "en": "Name the test file ending in .auth.spec.ts so Playwright auto-detects it",
        "ja": "Playwrightが自動認識するよう、テストファイル名を.auth.spec.tsで終わらせる"
      },
      {
        "vi": "Không thể override storageState ở cấp test/file, chỉ có thể ở cấp project",
        "en": "storageState cannot be overridden at the test/file level, only at the project level",
        "ja": "storageStateはテスト/ファイルレベルでは上書きできず、プロジェクトレベルでのみ可能である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "test.use() cho phép ghi đè các tuỳ chọn fixture (bao gồm storageState) ở phạm vi file hoặc describe, linh hoạt hơn việc chỉ cấu hình ở cấp project.",
      "en": "test.use() allows overriding fixture options (including storageState) at the file or describe scope, offering more flexibility than only configuring at the project level.",
      "ja": "test.use()はfixtureオプション（storageStateを含む）をファイルやdescribeスコープで上書きでき、プロジェクトレベルのみの設定より柔軟です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi dùng APIRequestContext (playwright.request) để đăng nhập trực tiếp qua API rồi lấy cookie đưa vào storageState cho UI test, lợi ích chính là gì?",
      "en": "When using APIRequestContext (playwright.request) to log in directly via API and feed the resulting cookies into storageState for UI tests, what is the main benefit?",
      "ja": "APIRequestContext（playwright.request）を使ってAPI経由で直接ログインし、得られたクッキーをUIテスト用のstorageStateに組み込む場合、主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Cho phép test chạy mà không cần cài trình duyệt Chromium/Firefox/WebKit",
        "en": "It lets tests run without needing to install Chromium/Firefox/WebKit browsers",
        "ja": "Chromium/Firefox/WebKitブラウザをインストールせずにテストを実行できるようになる"
      },
      {
        "vi": "Tự động mã hóa toàn bộ lưu lượng mạng của test",
        "en": "It automatically encrypts all network traffic of the test",
        "ja": "テストのネットワークトラフィック全体を自動的に暗号化する"
      },
      {
        "vi": "Bỏ qua hoàn toàn bước render UI khi thiết lập phiên, giúp setup nhanh hơn nhiều và ít phụ thuộc vào thay đổi giao diện",
        "en": "It skips the UI rendering step entirely when establishing the session, making setup much faster and less dependent on UI changes",
        "ja": "セッション確立時にUIレンダリングのステップを完全に省略でき、セットアップが大幅に高速化しUIの変更に左右されにくくなる"
      },
      {
        "vi": "Giúp Playwright tự sinh mã kiểm thử (codegen) chính xác hơn",
        "en": "It makes Playwright's codegen tool generate more accurate test code",
        "ja": "Playwrightのcodegenツールがより正確なテストコードを生成できるようになる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đăng nhập qua API tránh phải render form đăng nhập, điền input, chờ điều hướng... nên nhanh và ổn định hơn; cookie nhận được có thể lưu trực tiếp thành storageState.",
      "en": "Logging in via API avoids rendering the login form, filling inputs, waiting for navigation, etc., making it faster and more stable; the received cookies can be saved directly as storageState.",
      "ja": "APIログインではログインフォームの描画、入力欄への入力、遷移待ちなどが不要なため高速かつ安定します。取得したクッキーはそのままstorageStateとして保存できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu ứng dụng dùng cookie có thuộc tính HttpOnly cho phiên đăng nhập, điều này ảnh hưởng gì đến việc Playwright thao tác cookie đó?",
      "en": "If the application uses an HttpOnly cookie for the login session, how does this affect Playwright's ability to manipulate that cookie?",
      "ja": "アプリケーションがログインセッションにHttpOnly属性付きのクッキーを使用している場合、Playwrightがそのクッキーを操作する能力にどう影響しますか。"
    },
    "options": [
      {
        "vi": "Playwright hoàn toàn không thể lưu hay khôi phục cookie HttpOnly vì bị JavaScript trên trang chặn",
        "en": "Playwright cannot save or restore HttpOnly cookies at all because in-page JavaScript blocks it",
        "ja": "HttpOnlyクッキーはページ内JavaScriptによってブロックされるため、Playwrightは保存も復元も一切できない"
      },
      {
        "vi": "Playwright sẽ tự động chuyển cookie HttpOnly thành localStorage để dễ thao tác",
        "en": "Playwright will automatically convert HttpOnly cookies into localStorage for easier handling",
        "ja": "Playwrightは扱いやすくするためHttpOnlyクッキーを自動的にlocalStorageへ変換する"
      },
      {
        "vi": "HttpOnly khiến cookie chỉ tồn tại trong một request duy nhất rồi bị xóa",
        "en": "HttpOnly causes the cookie to exist for only a single request before being deleted",
        "ja": "HttpOnlyによりクッキーは1回のリクエストのみ存在しその後削除される"
      },
      {
        "vi": "Playwright thao tác cookie ở cấp trình duyệt/CDP nên vẫn đọc/ghi được cookie HttpOnly qua storageState, dù JavaScript của trang không truy cập được nó",
        "en": "Playwright manipulates cookies at the browser/CDP level, so it can still read/write HttpOnly cookies via storageState, even though the page's own JavaScript cannot access them",
        "ja": "Playwrightはブラウザ/CDPレベルでクッキーを操作するため、ページ側のJavaScriptからはアクセスできなくてもstorageState経由でHttpOnlyクッキーの読み書きが可能"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "HttpOnly chỉ ngăn JavaScript phía client (document.cookie) truy cập, không ảnh hưởng đến API trình duyệt/CDP mà Playwright dùng nên context.cookies() và storageState vẫn hoạt động bình thường.",
      "en": "HttpOnly only blocks client-side JavaScript (document.cookie) from accessing the cookie; it doesn't affect the browser/CDP APIs Playwright uses, so context.cookies() and storageState work normally.",
      "ja": "HttpOnlyはクライアント側JavaScript（document.cookie）からのアクセスのみをブロックし、Playwrightが使用するブラウザ/CDP APIには影響しません。そのためcontext.cookies()やstorageStateは通常どおり機能します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong sharding (chia nhỏ test suite chạy trên nhiều máy CI song song), điều gì cần lưu ý về file storageState để mọi shard đều dùng được?",
      "en": "When sharding a test suite across multiple parallel CI machines, what needs to be considered about the storageState file so every shard can use it?",
      "ja": "複数のCIマシンでテストスイートをシャーディング（分割並列実行）する際、すべてのシャードが利用できるようにstorageStateファイルについて何を考慮する必要がありますか。"
    },
    "options": [
      {
        "vi": "File storageState cần được tạo trước (hoặc trong bước setup dùng chung) và đảm bảo mọi shard/máy CI đều truy cập được đường dẫn/artifact đó, ví dụ qua cache hoặc artifact chia sẻ",
        "en": "The storageState file must be created beforehand (or via a shared setup step) and made accessible to every shard/CI machine, e.g. via a shared cache or artifact",
        "ja": "storageStateファイルは事前に（または共有setupステップで）作成し、キャッシュや共有アーティファクトなどを通じてすべてのシャード/CIマシンからアクセスできるようにする必要がある"
      },
      {
        "vi": "Mỗi shard cần tự đăng nhập lại từ đầu vì storageState không thể chia sẻ giữa các máy",
        "en": "Each shard must log in from scratch because storageState cannot be shared between machines",
        "ja": "storageStateはマシン間で共有できないため、各シャードは最初からログインし直す必要がある"
      },
      {
        "vi": "Không cần quan tâm vì Playwright tự đồng bộ storageState qua mạng giữa các máy CI",
        "en": "No need to worry, Playwright automatically syncs storageState over the network between CI machines",
        "ja": "Playwrightが CIマシン間でstorageStateをネットワーク経由で自動同期するため気にする必要はない"
      },
      {
        "vi": "Chỉ shard đầu tiên cần storageState, các shard sau sẽ bỏ qua bước đăng nhập hoàn toàn",
        "en": "Only the first shard needs storageState; subsequent shards skip the login step entirely without any file",
        "ja": "最初のシャードだけがstorageStateを必要とし、それ以降のシャードはファイルなしでログイン手順を完全に省略する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì mỗi shard có thể chạy trên máy/container riêng biệt, file storageState do bước setup tạo cần được lưu lại (artifact, cache, volume dùng chung) để mọi shard đọc được, tránh mỗi shard phải đăng nhập lại tốn thời gian.",
      "en": "Since each shard may run on a separate machine/container, the storageState file produced by the setup step needs to be persisted (artifact, cache, shared volume) so every shard can read it, avoiding costly repeated logins per shard.",
      "ja": "各シャードは別々のマシン/コンテナで実行される可能性があるため、setupステップで生成したstorageStateファイルはアーティファクトやキャッシュ、共有ボリュームなどで永続化し、全シャードが読み込めるようにする必要があります。そうしないと各シャードで再度ログインする時間コストが発生します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu ứng dụng dưới test có nhiều origin khác nhau (ví dụ app chính ở domain A, dịch vụ xác thực (SSO) ở domain B), storageState xử lý việc lưu localStorage như thế nào?",
      "en": "If the application under test spans multiple origins (e.g. the main app on domain A, an SSO auth service on domain B), how does storageState handle saving localStorage?",
      "ja": "テスト対象アプリケーションが複数のオリジンにまたがる場合（例：メインアプリはドメインA、SSO認証サービスはドメインB）、storageStateはlocalStorageの保存をどのように扱いますか。"
    },
    "options": [
      {
        "vi": "storageState chỉ lưu được localStorage của domain cuối cùng được truy cập, các domain trước đó bị bỏ qua",
        "en": "storageState only saves localStorage for the last domain visited, ignoring earlier ones",
        "ja": "storageStateは最後に訪問したドメインのlocalStorageのみを保存し、それ以前のドメインは無視される"
      },
      {
        "vi": "storageState ghi origins dưới dạng mảng, mỗi phần tử chứa origin và localStorage riêng của origin đó, nên nhiều domain vẫn được lưu đầy đủ",
        "en": "storageState records origins as an array, each entry holding its own origin and localStorage, so multiple domains are all captured correctly",
        "ja": "storageStateはoriginsを配列として記録し、各要素がそのoriginごとのlocalStorageを保持するため、複数ドメインでも正しく保存される"
      },
      {
        "vi": "Playwright không hỗ trợ lưu localStorage khi có nhiều hơn một origin trong cùng một trang",
        "en": "Playwright does not support saving localStorage when more than one origin is involved on the same page",
        "ja": "同一ページ内に複数のoriginが存在する場合、Playwrightはlocalstorageの保存をサポートしない"
      },
      {
        "vi": "Tất cả localStorage của mọi domain bị gộp chung vào một namespace duy nhất, gây xung đột key",
        "en": "All localStorage from every domain gets merged into a single namespace, causing key collisions",
        "ja": "すべてのドメインのlocalStorageが単一のネームスペースに統合され、キーの衝突が発生する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cấu trúc storageState có mảng 'origins', mỗi phần tử ghi rõ origin và localStorage tương ứng, nên các luồng SSO đa domain vẫn được ghi nhận đúng miễn là trang đã từng điều hướng qua các origin đó trong lúc lưu.",
      "en": "The storageState structure has an 'origins' array where each entry records its origin and corresponding localStorage, so multi-domain SSO flows are captured correctly as long as the page visited those origins while saving.",
      "ja": "storageStateの構造には'origins'配列があり、各要素がoriginと対応するlocalStorageを記録するため、保存時にそれらのoriginを訪問していれば複数ドメインのSSOフローも正しく記録されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là mô tả ĐÚNG về việc dùng browser.newContext({ storageState }) so với new Page trực tiếp từ browser (không truyền storageState)?",
      "en": "Which statement correctly describes using browser.newContext({ storageState }) compared to creating a page directly from browser without passing storageState?",
      "ja": "storageStateを渡さずにブラウザから直接ページを作成する場合と比べて、browser.newContext({ storageState })を使うことについて正しい説明はどれですか。"
    },
    "options": [
      {
        "vi": "newContext({storageState}) yêu cầu phải khởi động lại toàn bộ trình duyệt (browser.close() rồi launch lại)",
        "en": "newContext({storageState}) requires restarting the entire browser (browser.close() then relaunch)",
        "ja": "newContext({storageState})はブラウザ全体の再起動（browser.close()後の再launch）を必要とする"
      },
      {
        "vi": "newContext({storageState}) luôn mở một cửa sổ trình duyệt mới hiển thị trên màn hình bất kể chế độ headless",
        "en": "newContext({storageState}) always opens a new visible browser window on screen regardless of headless mode",
        "ja": "newContext({storageState})はheadlessモードに関わらず常に画面上に新しいブラウザウィンドウを表示する"
      },
      {
        "vi": "newContext({storageState}) khởi tạo context với cookie/localStorage đã lưu sẵn, các trang mở trong context đó đã ở trạng thái đăng nhập ngay từ đầu",
        "en": "newContext({storageState}) initializes the context with pre-saved cookies/localStorage, so pages opened in that context start out already logged in",
        "ja": "newContext({storageState})は保存済みのクッキー/localStorageでコンテキストを初期化するため、そのコンテキスト内で開くページは最初からログイン済み状態になる"
      },
      {
        "vi": "newContext({storageState}) chỉ hoạt động khi kết hợp với chế độ debug (PWDEBUG=1)",
        "en": "newContext({storageState}) only works when combined with debug mode (PWDEBUG=1)",
        "ja": "newContext({storageState})はデバッグモード（PWDEBUG=1）と組み合わせた場合にのみ動作する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Truyền storageState khi tạo context sẽ nạp sẵn cookie và localStorage cho context đó, nên bất kỳ trang nào mở trong context đó thừa hưởng phiên đăng nhập ngay lập tức, không cần thao tác đăng nhập lại.",
      "en": "Passing storageState when creating a context preloads that context with cookies and localStorage, so any page opened within it inherits the logged-in session immediately without repeating the login flow.",
      "ja": "コンテキスト作成時にstorageStateを渡すと、そのコンテキストにクッキーとlocalStorageが事前ロードされるため、そこで開くどのページもログイン手順を繰り返すことなく即座にログイン済みセッションを引き継ぎます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhóm test 'khách vãng lai chưa đăng nhập' vô tình chạy chung project với storageState của tài khoản admin do cấu hình sai. Hậu quả kiểm thử điển hình là gì?",
      "en": "A 'guest, not logged in' test group accidentally runs under a project configured with the admin account's storageState due to misconfiguration. What is a typical testing consequence?",
      "ja": "設定ミスにより『未ログインのゲスト』テストグループが誤ってadminアカウントのstorageStateを持つプロジェクトで実行されてしまいました。典型的なテスト上の問題は何ですか。"
    },
    "options": [
      {
        "vi": "Playwright sẽ tự phát hiện và bỏ qua storageState khi test không cần đăng nhập",
        "en": "Playwright will automatically detect and ignore storageState when a test doesn't require login",
        "ja": "ログイン不要なテストの場合、Playwrightが自動的にstorageStateを無視する"
      },
      {
        "vi": "Không ảnh hưởng gì vì storageState chỉ áp dụng cho request API, không áp dụng cho UI",
        "en": "No impact at all, since storageState only applies to API requests, not UI",
        "ja": "storageStateはAPIリクエストにのみ適用されUIには影響しないため、まったく問題ない"
      },
      {
        "vi": "Test sẽ bị Playwright chặn chạy và báo lỗi cấu hình ngay lập tức",
        "en": "Playwright will block the test from running and immediately throw a configuration error",
        "ja": "Playwrightはテストの実行をブロックし、即座に設定エラーを報告する"
      },
      {
        "vi": "Test 'khách vãng lai' thực ra chạy với phiên đã đăng nhập, dẫn đến kết quả không phản ánh đúng hành vi thực tế của người dùng chưa đăng nhập (false negative/positive)",
        "en": "The 'guest' test actually runs with a logged-in session, causing results that don't reflect the real behavior of an unauthenticated user (false negative/positive)",
        "ja": "『ゲスト』テストは実際にはログイン済みセッションで実行されるため、未ログインユーザーの実際の挙動を反映しない結果（偽陰性/偽陽性）になる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "storageState áp dụng cho toàn bộ context bao gồm cả UI, nên nếu gán nhầm storageState của admin cho test 'chưa đăng nhập', trang sẽ hiển thị như đã đăng nhập, khiến test không kiểm chứng đúng luồng khách vãng lai và có thể che giấu lỗi thật.",
      "en": "storageState applies to the whole context including the UI, so if the admin's storageState is mistakenly assigned to a 'not logged in' test, the page renders as logged in, meaning the test fails to verify the real guest flow and may mask actual bugs.",
      "ja": "storageStateはUIを含むコンテキスト全体に適用されるため、adminのstorageStateを誤って『未ログイン』テストに割り当てると、ページはログイン済みとして表示され、実際のゲストフローを正しく検証できず、本来のバグを見逃す可能性があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong các câu sau, đâu là phát biểu SAI về storageState trong Playwright?",
      "en": "Among the following statements, which one is FALSE regarding storageState in Playwright?",
      "ja": "次の記述のうち、Playwrightのstorage Stateに関して誤っているものはどれですか。"
    },
    "options": [
      {
        "vi": "storageState đảm bảo phiên đăng nhập luôn hợp lệ vĩnh viễn bất kể cấu hình hết hạn phía server",
        "en": "storageState guarantees the login session is valid forever, regardless of the server's expiry configuration",
        "ja": "storageStateはサーバー側の有効期限設定に関わらず、ログインセッションが永久に有効であることを保証する"
      },
      {
        "vi": "storageState có thể được truyền trực tiếp dưới dạng object JavaScript (không cần file) vào newContext",
        "en": "storageState can be passed directly as a JavaScript object (without a file) into newContext",
        "ja": "storageStateはファイルを使わずJavaScriptオブジェクトとして直接newContextに渡すことができる"
      },
      {
        "vi": "storageState có thể được lưu thành file JSON và tái sử dụng ở nhiều lần chạy test khác nhau",
        "en": "storageState can be saved to a JSON file and reused across multiple separate test runs",
        "ja": "storageStateはJSONファイルとして保存でき、複数の異なるテスト実行で再利用できる"
      },
      {
        "vi": "storageState có thể chứa dữ liệu của nhiều origin khác nhau trong cùng một file",
        "en": "storageState can contain data from multiple different origins within the same file",
        "ja": "storageStateは同一ファイル内に複数の異なるoriginのデータを含めることができる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "storageState chỉ là bản chụp trạng thái tại thời điểm lưu; nếu server có thời hạn phiên hoặc token hết hạn, phiên vẫn sẽ mất hiệu lực theo đúng cấu hình đó, Playwright không can thiệp vào logic hết hạn phía server.",
      "en": "storageState is just a snapshot at the time it was saved; if the server enforces session/token expiry, the session will still become invalid according to that configuration — Playwright does not override server-side expiry logic.",
      "ja": "storageStateは保存時点でのスナップショットに過ぎず、サーバー側でセッションやトークンの有効期限が設定されていれば、その設定通りにセッションは無効になります。Playwrightはサーバー側の失効ロジックを上書きしません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi viết test.beforeEach trong file test dùng storageState của project, việc gọi page.goto('/') ngay đầu mỗi test thường nhằm mục đích gì liên quan đến phiên đăng nhập?",
      "en": "When writing test.beforeEach in a test file that relies on the project's storageState, calling page.goto('/') at the start of each test typically serves what purpose related to the login session?",
      "ja": "プロジェクトのstorageStateを利用するテストファイルでtest.beforeEachを書く際、各テストの最初にpage.goto('/')を呼び出すのは、ログインセッションに関連してどのような目的が一般的ですか。"
    },
    "options": [
      {
        "vi": "Để buộc Playwright tạo storageState mới hoàn toàn cho mỗi test",
        "en": "To force Playwright to generate a brand-new storageState for every test",
        "ja": "すべてのテストに対して完全に新しいstorageStateを生成するよう強制するため"
      },
      {
        "vi": "Để điều hướng đến trang cần kiểm tra với phiên đã được nạp sẵn từ storageState, xác nhận trạng thái đăng nhập được áp dụng đúng trước khi bắt đầu các bước kiểm thử",
        "en": "To navigate to the page under test with the session already loaded from storageState, confirming the logged-in state is correctly applied before the actual test steps begin",
        "ja": "storageStateから既に読み込まれたセッションを持った状態でテスト対象ページへ遷移し、実際のテスト手順を始める前にログイン状態が正しく適用されていることを確認するため"
      },
      {
        "vi": "Để xóa toàn bộ cookie hiện có trước khi test chạy",
        "en": "To clear all existing cookies before the test runs",
        "ja": "テスト実行前に既存のクッキーをすべて削除するため"
      },
      {
        "vi": "page.goto('/') là bắt buộc về mặt kỹ thuật để storageState hoạt động, nếu thiếu Playwright sẽ báo lỗi",
        "en": "page.goto('/') is technically required for storageState to work at all; omitting it causes a Playwright error",
        "ja": "page.goto('/')はstorageStateが機能するために技術的に必須であり、省略するとPlaywrightがエラーを出す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "storageState đã nạp cookie/localStorage vào context sẵn, page.goto điều hướng để trang thực sự tải và áp dụng phiên đó (ví dụ set header, đọc cookie), giúp test bắt đầu ở trạng thái đăng nhập rõ ràng, dễ debug nếu setup sai.",
      "en": "storageState has already loaded cookies/localStorage into the context; page.goto navigates so the page actually loads and applies that session (e.g. reading cookies, setting headers), letting the test start from a clearly logged-in state and making misconfiguration easier to spot.",
      "ja": "storageStateは既にコンテキストへクッキー/localStorageを読み込んでいますが、page.gotoによってページが実際に読み込まれ、そのセッションが適用されます（クッキー読み取りやヘッダー設定など）。これによりテストは明確にログイン済みの状態から開始でき、設定ミスがあれば発見しやすくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một team muốn kiểm tra rằng token trong storageState đã hết hạn sẽ khiến app tự động chuyển hướng về trang đăng nhập. Cách tiếp cận hợp lý để viết test này là gì?",
      "en": "A team wants to verify that an expired token in storageState causes the app to automatically redirect to the login page. What is a reasonable approach to write this test?",
      "ja": "あるチームは、storageState内のトークンが失効している場合にアプリが自動的にログインページへリダイレクトすることを検証したいと考えています。このテストを書くための妥当なアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ file storageState và coi đó là mô phỏng token hết hạn tương đương",
        "en": "Delete the entire storageState file and treat that as an equivalent simulation of an expired token",
        "ja": "storageStateファイル全体を削除し、それをトークン失効の同等シミュレーションとみなす"
      },
      {
        "vi": "Không thể test được vì storageState luôn luôn hợp lệ mãi mãi",
        "en": "This cannot be tested because storageState is always valid forever",
        "ja": "storageStateは常に永久に有効なため、このテストは実施不可能である"
      },
      {
        "vi": "Dùng một storageState hợp lệ nhưng cố tình chỉnh sửa giá trị token/cookie trong file JSON (hoặc set thời gian hệ thống) để mô phỏng hết hạn, rồi kiểm tra app điều hướng đúng",
        "en": "Use a normally valid storageState but deliberately alter the token/cookie value in the JSON file (or manipulate expiry) to simulate expiration, then verify the app redirects correctly",
        "ja": "通常は有効なstorageStateを使いつつ、JSONファイル内のトークン/クッキー値を意図的に改変（または有効期限を操作）して失効をシミュレートし、アプリが正しくリダイレクトすることを確認する"
      },
      {
        "vi": "Chỉ có thể kiểm tra bằng cách chờ thực sự đến khi token hết hạn theo thời gian thực trên server",
        "en": "The only way to test this is to actually wait in real time until the server-side token expires",
        "ja": "実際にサーバー側でトークンが失効するまでリアルタイムで待つことしか方法がない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Có thể chỉnh sửa trực tiếp cookie/token giả trong file storageState JSON (ví dụ đổi giá trị thành chuỗi không hợp lệ) để mô phỏng phiên hết hạn mà không cần chờ thời gian thực, giúp test nhanh và chủ động; xóa hẳn file lại là kịch bản khác (chưa từng đăng nhập) chứ không phải hết hạn.",
      "en": "You can directly edit the cookie/token value in the storageState JSON file (e.g. set it to an invalid string) to simulate an expired session without waiting in real time, keeping the test fast and deterministic; deleting the file entirely represents a different scenario (never logged in), not expiration.",
      "ja": "storageStateのJSONファイル内のクッキー/トークン値を直接編集（例えば無効な文字列に変更）することで、リアルタイムで待たずにセッション失効をシミュレートでき、テストを高速かつ決定的にできます。ファイルを完全に削除するのは別のシナリオ（一度もログインしていない状態）であり、失効とは異なります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi debug một test dùng storageState mà bị fail vì trang hiển thị như chưa đăng nhập, bước kiểm tra hợp lý ĐẦU TIÊN nên là gì?",
      "en": "When debugging a test that uses storageState but fails because the page appears not logged in, what is a reasonable FIRST thing to check?",
      "ja": "storageStateを使うテストが、ページが未ログイン状態に見えて失敗した場合、最初に確認すべき妥当なステップは何ですか。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ project khỏi playwright.config và viết lại từ đầu",
        "en": "Delete the entire project from playwright.config and rewrite everything from scratch",
        "ja": "playwright.configからプロジェクト全体を削除し、最初から書き直す"
      },
      {
        "vi": "Chuyển toàn bộ test sang chạy ở chế độ headed để tự động sửa lỗi",
        "en": "Switch all tests to run in headed mode, which will automatically fix the issue",
        "ja": "すべてのテストをheadedモードで実行するように切り替えれば自動的に問題が解決する"
      },
      {
        "vi": "Nâng cấp phiên bản Node.js lên bản mới nhất",
        "en": "Upgrade the Node.js version to the latest release",
        "ja": "Node.jsのバージョンを最新版にアップグレードする"
      },
      {
        "vi": "Kiểm tra file storageState có được tạo đúng đường dẫn, có nội dung cookie hợp lệ (chưa hết hạn) và project test có trỏ đúng tới file đó không",
        "en": "Check that the storageState file was generated at the correct path, contains valid (non-expired) cookies, and that the test project correctly points to that file",
        "ja": "storageStateファイルが正しいパスに生成され、有効な（失効していない）クッキーが含まれているか、そしてテストプロジェクトがそのファイルを正しく参照しているかを確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các nguyên nhân phổ biến nhất khi storageState 'không hoạt động' là: file không tồn tại/đường dẫn sai, cookie đã hết hạn từ trước khi test chạy, hoặc project không cấu hình use.storageState đúng — nên đây là điểm cần rà soát đầu tiên trước khi nghĩ tới nguyên nhân phức tạp hơn.",
      "en": "The most common causes when storageState 'doesn't work' are: the file doesn't exist or has the wrong path, the cookies had already expired before the test ran, or the project's use.storageState isn't configured correctly — so this is the first thing to check before considering more complex causes.",
      "ja": "storageStateが『機能しない』最も一般的な原因は、ファイルが存在しない/パスが間違っている、テスト実行前にすでにクッキーが失効していた、またはプロジェクトのuse.storageStateが正しく設定されていない、のいずれかです。より複雑な原因を検討する前に、まずこの点を確認すべきです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là phát biểu ĐÚNG khi so sánh việc lưu trạng thái đăng nhập bằng storageState với việc mock hoàn toàn phản hồi API xác thực bằng page.route?",
      "en": "Which statement is TRUE when comparing saving login state via storageState versus fully mocking the authentication API response with page.route?",
      "ja": "storageStateによるログイン状態保存と、page.routeによる認証APIレスポンスの完全モックを比較したとき、正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "storageState tái tạo trạng thái phiên thật đã được server cấp (cookie/token thật), còn mock qua page.route chỉ giả lập phản hồi ở tầng network mà không có phiên thật trên server",
        "en": "storageState reproduces a real session state actually issued by the server (real cookies/tokens), whereas mocking via page.route merely fakes the network-level response without any real server-side session",
        "ja": "storageStateはサーバーが実際に発行した本物のセッション状態（実際のクッキー/トークン）を再現するのに対し、page.routeによるモックはネットワークレベルのレスポンスを偽装するだけで、サーバー側には実際のセッションが存在しない"
      },
      {
        "vi": "Hai cách này hoàn toàn giống nhau về bản chất kỹ thuật và luôn có thể thay thế cho nhau trong mọi trường hợp",
        "en": "Both approaches are technically identical in nature and can always substitute for each other in every scenario",
        "ja": "この2つの方法は技術的な本質がまったく同じであり、あらゆる場面で常に互換的に使用できる"
      },
      {
        "vi": "page.route không thể dùng để giả lập bất cứ điều gì liên quan đến xác thực",
        "en": "page.route cannot be used to simulate anything related to authentication",
        "ja": "page.routeは認証に関連するいかなるものもシミュレートできない"
      },
      {
        "vi": "storageState chỉ dùng được khi kết hợp bắt buộc với page.route",
        "en": "storageState can only be used when mandatorily combined with page.route",
        "ja": "storageStateはpage.routeとの組み合わせが必須でなければ使用できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "storageState phản ánh phiên đăng nhập thật do backend cấp (đúng luồng thật, kiểm thử tích hợp có giá trị), trong khi page.route chỉ chặn và trả response giả ở tầng trình duyệt, phù hợp để cô lập frontend khỏi backend chứ không xác nhận backend hoạt động đúng.",
      "en": "storageState reflects a real login session issued by the backend (a genuine flow, valuable for integration testing), while page.route merely intercepts and returns a fake response at the browser layer, useful for isolating the frontend from the backend but not for validating the backend itself.",
      "ja": "storageStateはバックエンドが実際に発行した本物のログインセッションを反映します（本来のフローであり、統合テストとして価値があります）。一方page.routeはブラウザ層でリクエストを傍受し偽のレスポンスを返すだけで、フロントエンドをバックエンドから切り離すのには有用ですが、バックエンド自体の正しさを検証するものではありません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong file playwright.config.ts, thuộc tính use.storageState được đặt ở cấp toàn cục (top-level use) có ý nghĩa gì?",
      "en": "In playwright.config.ts, what does it mean when the use.storageState property is set at the top level (global use)?",
      "ja": "playwright.config.tsにおいて、use.storageStateプロパティをトップレベル（グローバルなuse）に設定するとどういう意味になりますか。"
    },
    "options": [
      {
        "vi": "Chỉ áp dụng cho project đầu tiên trong mảng projects",
        "en": "It applies only to the first project in the projects array",
        "ja": "projects配列の最初のプロジェクトにのみ適用される"
      },
      {
        "vi": "Trở thành giá trị mặc định cho MỌI project không tự override, giúp tránh lặp lại cấu hình storageState ở từng project",
        "en": "It becomes the default value for EVERY project that doesn't override it, avoiding repeating the storageState config in each project",
        "ja": "上書きしないすべてのプロジェクトにおけるデフォルト値となり、各プロジェクトでstorageState設定を繰り返す必要がなくなる"
      },
      {
        "vi": "Không có tác dụng gì, storageState chỉ có thể đặt trong từng project",
        "en": "It has no effect at all; storageState can only be set inside each individual project",
        "ja": "何の効果もなく、storageStateは各プロジェクト内でしか設定できない"
      },
      {
        "vi": "Bắt buộc phải trùng với tên biến môi trường STORAGE_STATE",
        "en": "It must match the name of the STORAGE_STATE environment variable",
        "ja": "STORAGE_STATEという環境変数名と一致させなければならない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright cho phép đặt các tuỳ chọn dùng chung (use) ở cấp toàn cục của config, các project kế thừa giá trị này trừ khi tự định nghĩa lại use riêng, giúp giảm lặp code khi nhiều project cùng cần một storageState mặc định.",
      "en": "Playwright allows shared options (use) to be set at the config's top level; projects inherit these values unless they define their own use block, reducing duplication when multiple projects share the same default storageState.",
      "ja": "Playwrightではconfigのトップレベルで共通オプション（use）を設定でき、独自のuseブロックを定義しない限り各プロジェクトはこの値を継承します。これにより複数のプロジェクトが同じデフォルトstorageStateを必要とする場合のコード重複を減らせます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Một QA nhận xét: 'Vì đã dùng storageState để bỏ qua bước đăng nhập UI trong hầu hết test, nên không cần bất kỳ test nào kiểm tra chính luồng đăng nhập (login form) nữa.' Nhận xét này có vấn đề gì?",
      "en": "A QA comments: 'Since we use storageState to skip the UI login step in most tests, we no longer need any test that actually verifies the login form flow itself.' What is wrong with this statement?",
      "ja": "あるQAが『ほとんどのテストでstorageStateを使いUIログイン手順を省略しているので、ログインフォーム自体のフローを検証するテストはもう必要ない』とコメントしました。この主張の問題点は何ですか。"
    },
    "options": [
      {
        "vi": "Nhận xét hoàn toàn đúng, storageState thay thế mọi nhu cầu kiểm thử luồng đăng nhập",
        "en": "The statement is completely correct; storageState replaces any need to test the login flow",
        "ja": "この主張は完全に正しく、storageStateがログインフローのテストの必要性をすべて置き換える"
      },
      {
        "vi": "storageState tự động kiểm thử luồng đăng nhập ngầm mỗi khi được tạo ra",
        "en": "storageState implicitly tests the login flow automatically every time it is generated",
        "ja": "storageStateは生成されるたびにログインフローを暗黙的に自動テストする"
      },
      {
        "vi": "storageState chỉ nhằm tối ưu tốc độ cho các test KHÔNG liên quan tới đăng nhập; luồng đăng nhập (form, validate lỗi sai mật khẩu, khoá tài khoản...) vẫn cần test riêng để đảm bảo tính năng đăng nhập tự nó hoạt động đúng",
        "en": "storageState only optimizes speed for tests NOT about login itself; the login flow (the form, wrong-password validation, account lockout, etc.) still needs its own dedicated tests to ensure the login feature itself works correctly",
        "ja": "storageStateはログイン自体に関係しないテストの速度を最適化するだけであり、ログインフロー（フォーム、パスワード誤り時のバリデーション、アカウントロックなど）自体は正しく動作することを保証するために専用のテストが依然として必要である"
      },
      {
        "vi": "Chỉ cần kiểm thử luồng đăng nhập một lần khi ứng dụng mới ra mắt, không cần lặp lại về sau",
        "en": "The login flow only needs to be tested once when the app first launches, never again afterward",
        "ja": "ログインフローはアプリの初回リリース時に一度だけテストすればよく、その後は不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "storageState là kỹ thuật tối ưu hiệu năng cho các test không cần kiểm thử đăng nhập, không thay thế test chuyên biệt cho chính chức năng đăng nhập; bỏ hẳn test đăng nhập sẽ tạo lỗ hổng kiểm thử với tính năng quan trọng.",
      "en": "storageState is a performance optimization for tests that don't need to verify login itself, not a substitute for dedicated tests of the login feature; removing login tests entirely would create a coverage gap for a critical feature.",
      "ja": "storageStateはログイン自体を検証する必要のないテストのためのパフォーマンス最適化手法であり、ログイン機能そのものの専用テストの代わりにはなりません。ログインテストを完全に廃止すると、重要な機能に対するテストカバレッジの欠落が生じます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu vô tình cấu hình project setup (tạo storageState) chạy song song CÙNG LÚC với các project test phụ thuộc vào nó (thay vì tuần tự trước), hậu quả có thể là gì?",
      "en": "If the setup project (which creates storageState) is accidentally configured to run in parallel AT THE SAME TIME as the test projects depending on it (instead of running sequentially first), what could be the consequence?",
      "ja": "storageStateを作成するsetupプロジェクトが、それに依存するテストプロジェクトと（先に順番通り実行されるのではなく）誤って同時並行で実行されるよう設定された場合、どのような結果が起こり得ますか。"
    },
    "options": [
      {
        "vi": "Không ảnh hưởng gì vì Playwright luôn tự phát hiện thứ tự đúng bất kể cấu hình",
        "en": "No impact at all, since Playwright always auto-detects the correct order regardless of configuration",
        "ja": "設定に関わらずPlaywrightは常に正しい順序を自動検出するため、影響はない"
      },
      {
        "vi": "Test sẽ luôn pass vì storageState là tùy chọn không bắt buộc phải tồn tại trước",
        "en": "Tests will always pass because storageState is optional and doesn't need to exist beforehand",
        "ja": "storageStateは事前に存在する必要のないオプションのものであるため、テストは常にパスする"
      },
      {
        "vi": "Playwright sẽ tự động chuyển các test đó sang chạy tuần tự vĩnh viễn sau lần đầu lỗi",
        "en": "Playwright will permanently switch those tests to sequential execution after the first failure",
        "ja": "最初の失敗後、Playwrightはそれらのテストを永久にシーケンシャル実行へ自動的に切り替える"
      },
      {
        "vi": "Các test phụ thuộc có thể chạy trước khi file storageState được tạo xong (hoặc dùng bản cũ/rỗng), dẫn tới lỗi 'chưa đăng nhập' ngẫu nhiên, khó tái hiện",
        "en": "Dependent tests may run before the storageState file finishes being written (or use a stale/empty version), causing intermittent, hard-to-reproduce 'not logged in' failures",
        "ja": "依存するテストがstorageStateファイルの書き込み完了前に実行される（あるいは古い/空のファイルを使う）可能性があり、再現しにくい断続的な『未ログイン』エラーが発生する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đúng như mục đích cơ chế dependencies trong Playwright: project setup phải hoàn tất trước khi project phụ thuộc chạy; nếu cấu hình sai khiến chúng chạy song song, race condition có thể khiến test đọc phải storageState chưa hoàn chỉnh hoặc cũ, gây fail không ổn định (flaky).",
      "en": "This is exactly why Playwright's dependencies mechanism exists: the setup project must finish before dependent projects run; misconfiguring them to run in parallel introduces a race condition where tests may read an incomplete or stale storageState, causing flaky failures.",
      "ja": "これはまさにPlaywrightのdependencies機構が存在する理由です。setupプロジェクトは依存するプロジェクトの実行前に完了している必要があります。並行実行になるよう誤設定すると競合状態が生じ、テストが不完全または古いstorageStateを読み込んでしまい、不安定な（flakyな）失敗を引き起こす可能性があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi lưu storageState, nếu context đã từng gọi context.clearCookies() ngay trước khi gọi storageState({path}), kết quả file JSON sẽ như thế nào?",
      "en": "When saving storageState, if the context had previously called context.clearCookies() right before calling storageState({path}), what will the resulting JSON file look like?",
      "ja": "storageStateを保存する際、context.storageState({path})を呼び出す直前にcontext.clearCookies()を呼んでいた場合、生成されるJSONファイルはどうなりますか。"
    },
    "options": [
      {
        "vi": "Mảng cookies trong storageState sẽ rỗng (hoặc không có các cookie đã xoá), dù localStorage của các origin đã truy cập vẫn có thể còn nguyên nếu chưa bị xoá riêng",
        "en": "The cookies array in storageState will be empty (or missing the cleared cookies), though localStorage for visited origins may remain intact if it wasn't separately cleared",
        "ja": "storageStateのcookies配列は空になる（あるいは削除されたクッキーが含まれなくなる）が、訪問済みoriginのlocalStorageは別途クリアされていなければそのまま残る可能性がある"
      },
      {
        "vi": "File vẫn chứa toàn bộ cookie cũ vì clearCookies() không có tác dụng thực sự",
        "en": "The file still contains all the old cookies because clearCookies() has no real effect",
        "ja": "clearCookies()には実際の効果がないため、ファイルには古いクッキーがすべて残る"
      },
      {
        "vi": "Playwright sẽ báo lỗi và không cho phép lưu storageState sau khi gọi clearCookies()",
        "en": "Playwright will throw an error and refuse to save storageState after clearCookies() is called",
        "ja": "clearCookies()呼び出し後にstorageStateを保存しようとするとPlaywrightはエラーを出し保存を拒否する"
      },
      {
        "vi": "clearCookies() sẽ xóa luôn cả localStorage của mọi origin đã truy cập",
        "en": "clearCookies() will also wipe the localStorage of every visited origin",
        "ja": "clearCookies()は訪問済みのすべてのoriginのlocalStorageも消去する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "context.clearCookies() chỉ xoá cookie hiện có trong context, không đụng tới localStorage; vì vậy storageState chụp sau đó sẽ có mảng cookies trống (hoặc thiếu các cookie đã xoá) trong khi origins/localStorage vẫn được ghi nhận bình thường.",
      "en": "context.clearCookies() only removes the context's current cookies and doesn't touch localStorage; so a storageState snapshot taken afterward will have an empty (or missing) cookies array while origins/localStorage are still captured normally.",
      "ja": "context.clearCookies()はコンテキストの現在のクッキーのみを削除し、localStorageには影響しません。そのため、その後に取得したstorageStateスナップショットはcookies配列が空（または削除分が欠落）になりますが、origins/localStorageは通常通り記録されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi so sánh storageState với việc set cookie thủ công bằng context.addCookies() trong mỗi test, ưu điểm chính của storageState là gì?",
      "en": "When comparing storageState with manually setting cookies via context.addCookies() in every test, what is the main advantage of storageState?",
      "ja": "storageStateと、各テストでcontext.addCookies()を使い手動でクッキーを設定する方法を比較した場合、storageStateの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "context.addCookies() không tồn tại trong Playwright nên storageState là lựa chọn duy nhất",
        "en": "context.addCookies() doesn't exist in Playwright, so storageState is the only option",
        "ja": "context.addCookies()はPlaywrightに存在しないため、storageStateが唯一の選択肢である"
      },
      {
        "vi": "storageState tự động lưu và khôi phục đầy đủ cả cookie lẫn localStorage của nhiều origin từ một phiên đăng nhập thật, thay vì phải tự liệt kê tay từng cookie/giá trị trong code",
        "en": "storageState automatically saves and restores both cookies and localStorage across multiple origins from a real login session, rather than requiring you to manually list every cookie/value in code",
        "ja": "storageStateは実際のログインセッションから複数オリジンにわたるクッキーとlocalStorageの両方を自動的に保存・復元できるため、コード内で個々のクッキー/値を手動で列挙する必要がない"
      },
      {
        "vi": "storageState nhanh hơn vì không cần mở trình duyệt trong khi addCookies() luôn cần mở trình duyệt trước",
        "en": "storageState is faster because it never requires opening a browser, whereas addCookies() always needs one opened first",
        "ja": "storageStateはブラウザを開く必要が一切ないため高速だが、addCookies()は常に事前にブラウザを開く必要がある"
      },
      {
        "vi": "context.addCookies() chỉ hoạt động trên WebKit còn storageState hoạt động trên mọi trình duyệt",
        "en": "context.addCookies() only works on WebKit while storageState works on every browser",
        "ja": "context.addCookies()はWebKitでしか動作しないが、storageStateはすべてのブラウザで動作する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "storageState ghi lại trạng thái thật (nhiều cookie, nhiều origin với localStorage) sau khi đăng nhập thành công, tránh việc phải hard-code từng giá trị cookie thủ công vốn dễ lỗi thời khi backend thay đổi cấu trúc token/cookie.",
      "en": "storageState captures the real state (many cookies, multiple origins with localStorage) after a successful login, avoiding the need to hard-code individual cookie values by hand, which easily becomes outdated when the backend changes its token/cookie structure.",
      "ja": "storageStateはログイン成功後の実際の状態（複数のクッキー、複数オリジンのlocalStorage）を記録するため、個々のクッキー値を手動でハードコードする必要がなくなります。ハードコードはバックエンドがトークン/クッキー構造を変更するとすぐに古くなってしまいます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Biến môi trường nào khi được đặt sẽ tự động mở Playwright Inspector lúc chạy test?",
      "en": "Which environment variable, when set, automatically opens the Playwright Inspector when running a test?",
      "ja": "テスト実行時にPlaywright Inspectorを自動的に開く環境変数はどれですか。"
    },
    "options": [
      {
        "vi": "HEADLESS=false",
        "en": "HEADLESS=false",
        "ja": "HEADLESS=false"
      },
      {
        "vi": "CI=true",
        "en": "CI=true",
        "ja": "CI=true"
      },
      {
        "vi": "PWDEBUG=1",
        "en": "PWDEBUG=1",
        "ja": "PWDEBUG=1"
      },
      {
        "vi": "DEBUG=pw:api",
        "en": "DEBUG=pw:api",
        "ja": "DEBUG=pw:api"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đặt biến môi trường PWDEBUG=1 trước khi chạy test sẽ khởi động Playwright Inspector, tự động chuyển sang chế độ headed và tạm dừng để debug từng bước.",
      "en": "Setting PWDEBUG=1 before running a test launches the Playwright Inspector, forces headed mode, and pauses execution for step-by-step debugging.",
      "ja": "テスト実行前にPWDEBUG=1を設定すると、Playwright Inspectorが起動しヘッド付きモードで一時停止し、ステップごとにデバッグできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lệnh `await page.pause()` trong test có tác dụng gì?",
      "en": "What does calling `await page.pause()` inside a test do?",
      "ja": "テスト内で `await page.pause()` を呼び出すとどうなりますか。"
    },
    "options": [
      {
        "vi": "Chờ trang tải xong hoàn toàn rồi tiếp tục",
        "en": "Waits for the page to fully load before continuing",
        "ja": "ページの読み込み完了を待ってから続行する"
      },
      {
        "vi": "Chụp ảnh màn hình rồi thoát tiến trình",
        "en": "Takes a screenshot then terminates the process",
        "ja": "スクリーンショットを撮ってからプロセスを終了する"
      },
      {
        "vi": "Tạm dừng đúng 1 giây rồi tự động tiếp tục",
        "en": "Pauses for exactly one second then continues automatically",
        "ja": "正確に1秒間停止した後、自動的に続行する"
      },
      {
        "vi": "Tạm dừng thực thi test và mở Playwright Inspector để thao tác thủ công/debug",
        "en": "Pauses test execution and opens the Playwright Inspector for manual interaction/debugging",
        "ja": "テストの実行を一時停止し、Playwright Inspectorを開いて手動操作やデバッグができるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "page.pause() tạm dừng test và mở Inspector, cho phép người dùng bấm từng bước, chỉnh locator hoặc tiếp tục chạy bằng tay.",
      "en": "page.pause() halts the test and opens the Inspector, letting the user step through actions, tweak locators, or resume manually.",
      "ja": "page.pause() はテストを停止しInspectorを開き、ユーザーがステップ実行やロケーターの調整、手動再開を行えるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong cấu hình `playwright.config.ts`, thiết lập `trace: 'on-first-retry'` nghĩa là gì?",
      "en": "In `playwright.config.ts`, what does the setting `trace: 'on-first-retry'` mean?",
      "ja": "`playwright.config.ts` の設定 `trace: 'on-first-retry'` は何を意味しますか。"
    },
    "options": [
      {
        "vi": "Trace chỉ được ghi ở lần retry đầu tiên sau khi test fail",
        "en": "Trace is only recorded on the first retry attempt after a test fails",
        "ja": "テストが失敗した後の最初のリトライ実行時のみトレースを記録する"
      },
      {
        "vi": "Trace chỉ được ghi khi test fail ngay từ lần chạy đầu tiên",
        "en": "Trace is only recorded when a test fails on the very first attempt",
        "ja": "最初の実行で失敗した場合のみトレースを記録する"
      },
      {
        "vi": "Trace không bao giờ được ghi trong CI",
        "en": "Trace is never recorded in CI",
        "ja": "CIではトレースが記録されることはない"
      },
      {
        "vi": "Trace được ghi cho mọi lần chạy test, kể cả khi pass",
        "en": "Trace is recorded for every test run, even passing ones",
        "ja": "パスしたテストも含め、すべてのテスト実行でトレースを記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "'on-first-retry' chỉ bật ghi trace khi Playwright thực hiện lần thử lại đầu tiên sau khi test thất bại, giúp tiết kiệm dung lượng so với ghi mọi lần chạy.",
      "en": "'on-first-retry' only enables tracing during the first retry attempt after a failure, saving storage compared to tracing every run.",
      "ja": "'on-first-retry' はテスト失敗後の最初のリトライ実行時のみトレース記録を有効にし、毎回記録するよりストレージを節約できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "File trace.zip được tạo ra dùng để làm gì tiếp theo?",
      "en": "What is the generated trace.zip file used for afterward?",
      "ja": "生成されたtrace.zipファイルはその後何に使われますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng làm log văn bản thuần trong terminal",
        "en": "Only used as plain text logs in the terminal",
        "ja": "ターミナルの単なるテキストログとしてのみ使用する"
      },
      {
        "vi": "Mở bằng lệnh `npx playwright show-trace trace.zip` để xem lại timeline, DOM snapshot, network và console log",
        "en": "Opened with `npx playwright show-trace trace.zip` to review the timeline, DOM snapshots, network, and console logs",
        "ja": "`npx playwright show-trace trace.zip` で開き、タイムラインやDOMスナップショット、ネットワーク、コンソールログを確認するため"
      },
      {
        "vi": "Cần giải nén và import thủ công vào cơ sở dữ liệu",
        "en": "Must be manually unzipped and imported into a database",
        "ja": "手動で解凍しデータベースにインポートする必要がある"
      },
      {
        "vi": "Chỉ chứa video, không có thông tin DOM hay network",
        "en": "Only contains video, no DOM or network information",
        "ja": "動画のみが含まれ、DOMやネットワーク情報は含まれない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trace.zip là một gói dữ liệu đầy đủ (snapshot DOM, network, console, action timeline) mở bằng Trace Viewer qua lệnh show-trace để điều tra lỗi.",
      "en": "Trace.zip is a complete data bundle (DOM snapshots, network, console, action timeline) opened with the Trace Viewer via the show-trace command to investigate failures.",
      "ja": "trace.zipはDOMスナップショット、ネットワーク、コンソール、アクションタイムラインを含む完全なデータバンドルで、show-traceコマンドでTrace Viewerを開き障害調査に使います。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cấu hình `screenshot: 'only-on-failure'` trong Playwright config làm gì?",
      "en": "What does the config `screenshot: 'only-on-failure'` do in Playwright?",
      "ja": "Playwright設定の `screenshot: 'only-on-failure'` は何をしますか。"
    },
    "options": [
      {
        "vi": "Chụp ảnh màn hình sau mỗi bước hành động bất kể kết quả",
        "en": "Captures a screenshot after every action regardless of outcome",
        "ja": "結果に関係なく、すべてのアクションの後にスクリーンショットを撮る"
      },
      {
        "vi": "Không bao giờ chụp ảnh màn hình",
        "en": "Never captures screenshots",
        "ja": "スクリーンショットを一切撮らない"
      },
      {
        "vi": "Chỉ chụp ảnh màn hình khi test kết thúc thất bại",
        "en": "Only captures a screenshot when a test ends in failure",
        "ja": "テストが失敗して終了した場合のみスクリーンショットを撮る"
      },
      {
        "vi": "Chụp ảnh màn hình định kỳ mỗi 5 giây",
        "en": "Captures a screenshot periodically every 5 seconds",
        "ja": "5秒ごとに定期的にスクリーンショットを撮る"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "only-on-failure chỉ lưu ảnh chụp màn hình khi test thất bại, giúp tiết kiệm dung lượng lưu trữ so với chụp ở mọi test.",
      "en": "only-on-failure saves a screenshot only when the test fails, saving storage compared to capturing on every test.",
      "ja": "only-on-failureはテストが失敗した場合のみスクリーンショットを保存し、すべてのテストで撮影するよりストレージを節約します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn chụp toàn bộ trang (kể cả phần cuộn ngoài viewport), nên dùng option nào của `page.screenshot()`?",
      "en": "To capture the entire page including content outside the viewport, which option of `page.screenshot()` should be used?",
      "ja": "ビューポート外のスクロール部分も含めてページ全体をキャプチャするには、`page.screenshot()` のどのオプションを使うべきですか。"
    },
    "options": [
      {
        "vi": "clip: { x: 0, y: 0 }",
        "en": "clip: { x: 0, y: 0 }",
        "ja": "clip: { x: 0, y: 0 }"
      },
      {
        "vi": "type: 'jpeg'",
        "en": "type: 'jpeg'",
        "ja": "type: 'jpeg'"
      },
      {
        "vi": "omitBackground: true",
        "en": "omitBackground: true",
        "ja": "omitBackground: true"
      },
      {
        "vi": "fullPage: true",
        "en": "fullPage: true",
        "ja": "fullPage: true"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "fullPage: true yêu cầu Playwright chụp toàn bộ chiều cao/rộng nội dung trang, kể cả phần nằm ngoài khung nhìn hiện tại.",
      "en": "fullPage: true instructs Playwright to capture the full scrollable height/width of the page content, not just the current viewport.",
      "ja": "fullPage: trueは、現在のビューポートだけでなくページ全体のスクロール可能な高さ・幅をキャプチャするよう指示します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thiết lập `video: 'retain-on-failure'` trong config có nghĩa gì?",
      "en": "What does setting `video: 'retain-on-failure'` mean in the config?",
      "ja": "設定の `video: 'retain-on-failure'` は何を意味しますか。"
    },
    "options": [
      {
        "vi": "Video được ghi cho mọi test nhưng chỉ giữ lại file nếu test đó fail, còn pass thì bị xoá",
        "en": "Video is recorded for every test but the file is only kept if that test fails; it is deleted if the test passes",
        "ja": "すべてのテストで録画されるが、そのテストが失敗した場合のみファイルが保持され、パスした場合は削除される"
      },
      {
        "vi": "Video luôn được ghi và luôn giữ lại kể cả test pass",
        "en": "Video is always recorded and always kept, even for passing tests",
        "ja": "テストがパスしても常に録画され、常に保持される"
      },
      {
        "vi": "Không ghi video trong bất kỳ trường hợp nào",
        "en": "Never records video under any circumstance",
        "ja": "いかなる場合も動画を録画しない"
      },
      {
        "vi": "Chỉ ghi video khi chạy ở chế độ headed",
        "en": "Only records video when running in headed mode",
        "ja": "ヘッド付きモードで実行している場合のみ動画を録画する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "retain-on-failure ghi video cho mọi test nhưng tự động xoá file video của các test pass, chỉ giữ lại video của test thất bại để phục vụ debug.",
      "en": "retain-on-failure records video for every test but automatically deletes the video file for passing tests, keeping only videos of failed tests for debugging.",
      "ja": "retain-on-failureはすべてのテストで動画を録画しますが、パスしたテストの動画ファイルは自動的に削除され、失敗したテストの動画のみデバッグ用に保持されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lệnh nào dùng để khởi động công cụ codegen tự động sinh mã Playwright bằng cách ghi lại thao tác trên trình duyệt?",
      "en": "Which command launches the Playwright codegen tool that auto-generates test code by recording browser interactions?",
      "ja": "ブラウザ操作を記録してPlaywrightのテストコードを自動生成するcodegenツールを起動するコマンドはどれですか。"
    },
    "options": [
      {
        "vi": "npx playwright test --ui",
        "en": "npx playwright test --ui",
        "ja": "npx playwright test --ui"
      },
      {
        "vi": "npx playwright codegen",
        "en": "npx playwright codegen",
        "ja": "npx playwright codegen"
      },
      {
        "vi": "npx playwright install",
        "en": "npx playwright install",
        "ja": "npx playwright install"
      },
      {
        "vi": "npx playwright merge-reports",
        "en": "npx playwright merge-reports",
        "ja": "npx playwright merge-reports"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "npx playwright codegen mở trình duyệt và Playwright Inspector, ghi lại mọi thao tác của người dùng rồi sinh mã kiểm thử tương ứng theo thời gian thực.",
      "en": "npx playwright codegen opens a browser plus the Playwright Inspector, records the user's actions, and generates corresponding test code in real time.",
      "ja": "npx playwright codegenはブラウザとPlaywright Inspectorを開き、ユーザーの操作を記録してリアルタイムで対応するテストコードを生成します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi dùng codegen, tuỳ chọn `--target` dùng để làm gì?",
      "en": "When using codegen, what does the `--target` option do?",
      "ja": "codegen使用時、`--target` オプションは何をしますか。"
    },
    "options": [
      {
        "vi": "Chọn trình duyệt đích để mở (Chromium/Firefox/WebKit)",
        "en": "Selects the target browser to open (Chromium/Firefox/WebKit)",
        "ja": "開く対象のブラウザ(Chromium/Firefox/WebKit)を選択する"
      },
      {
        "vi": "Chọn URL đích ban đầu để bắt đầu ghi",
        "en": "Selects the initial target URL to start recording from",
        "ja": "記録を開始する最初の対象URLを選択する"
      },
      {
        "vi": "Chọn ngôn ngữ/loại mã nguồn được sinh ra, ví dụ JavaScript, Python, Java, C#",
        "en": "Selects the language/type of generated source code, e.g. JavaScript, Python, Java, C#",
        "ja": "生成されるソースコードの言語・種類(JavaScript、Python、Java、C#など)を選択する"
      },
      {
        "vi": "Chọn thư mục lưu file trace",
        "en": "Selects the folder to save the trace file",
        "ja": "トレースファイルの保存先フォルダを選択する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "--target chỉ định ngôn ngữ đầu ra của mã sinh ra bởi codegen, ví dụ --target=python hoặc --target=csharp, mặc định là JavaScript/TypeScript.",
      "en": "--target specifies the output language of the code generated by codegen, e.g. --target=python or --target=csharp, defaulting to JavaScript/TypeScript.",
      "ja": "--target はcodegenが生成するコードの出力言語を指定します。例: --target=python や --target=csharp。デフォルトはJavaScript/TypeScriptです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy `npx playwright codegen --save-storage=auth.json`, sau khi đăng nhập thủ công trong trình duyệt được mở ra, điều gì xảy ra?",
      "en": "When running `npx playwright codegen --save-storage=auth.json` and logging in manually in the opened browser, what happens?",
      "ja": "`npx playwright codegen --save-storage=auth.json` を実行し、開かれたブラウザで手動でログインすると何が起こりますか。"
    },
    "options": [
      {
        "vi": "Mã nguồn test bị xoá sau khi đóng trình duyệt",
        "en": "The generated test code is deleted after closing the browser",
        "ja": "ブラウザを閉じると生成されたテストコードが削除される"
      },
      {
        "vi": "Tự động chạy toàn bộ test suite ngay sau khi đăng nhập",
        "en": "Automatically runs the entire test suite right after login",
        "ja": "ログイン直後に自動的にテストスイート全体を実行する"
      },
      {
        "vi": "Chỉ lưu ảnh chụp màn hình của trang đăng nhập",
        "en": "Only saves a screenshot of the login page",
        "ja": "ログインページのスクリーンショットのみ保存する"
      },
      {
        "vi": "Trạng thái đăng nhập (cookie, localStorage) được lưu vào auth.json khi đóng trình duyệt, có thể tái sử dụng cho các test sau",
        "en": "The login state (cookies, localStorage) is saved to auth.json when the browser closes, reusable for later tests",
        "ja": "ブラウザを閉じるとログイン状態(クッキー、localStorage)がauth.jsonに保存され、後のテストで再利用できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tuỳ chọn --save-storage ghi lại trạng thái storage (cookie, localStorage) vào file JSON khi trình duyệt đóng, phục vụ việc tái sử dụng phiên đăng nhập giữa các lần chạy codegen hoặc test.",
      "en": "The --save-storage option writes the storage state (cookies, localStorage) to a JSON file when the browser closes, enabling reuse of the logged-in session across codegen runs or tests.",
      "ja": "--save-storage オプションはブラウザを閉じたときにストレージ状態(クッキー、localStorage)をJSONファイルに書き込み、codegenやテスト実行間でログインセッションを再利用できるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong file config, thiết lập `use: { headless: false, slowMo: 500 }` có tác dụng gì khi debug?",
      "en": "In the config file, what does `use: { headless: false, slowMo: 500 }` do when debugging?",
      "ja": "設定ファイルで `use: { headless: false, slowMo: 500 }` はデバッグ時に何をしますか。"
    },
    "options": [
      {
        "vi": "Hiển thị cửa sổ trình duyệt và làm chậm mỗi thao tác 500ms để quan sát bằng mắt",
        "en": "Shows the browser window and slows down each action by 500ms so it can be observed visually",
        "ja": "ブラウザウィンドウを表示し、各操作を500ms遅らせて目視で確認できるようにする"
      },
      {
        "vi": "Chạy trình duyệt ẩn hoàn toàn và tăng tốc độ thực thi",
        "en": "Runs the browser fully hidden and speeds up execution",
        "ja": "ブラウザを完全に非表示で実行し、実行速度を速める"
      },
      {
        "vi": "Tắt hoàn toàn tính năng auto-waiting",
        "en": "Completely disables the auto-waiting feature",
        "ja": "自動待機機能を完全に無効化する"
      },
      {
        "vi": "Ghi trace nhưng không ghi video",
        "en": "Records trace but not video",
        "ja": "トレースは記録するが動画は記録しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "headless: false mở trình duyệt có giao diện, slowMo thêm độ trễ giữa các thao tác Playwright thực hiện, giúp quan sát trực quan quá trình chạy test khi debug.",
      "en": "headless: false opens a visible browser window, and slowMo adds a delay between each Playwright action, making it easier to visually follow the test while debugging.",
      "ja": "headless: falseは表示付きブラウザを開き、slowMoは各Playwright操作の間に遅延を追加するため、デバッグ時にテストの流れを目視で追いやすくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Trace Viewer, tab \"Network\" cung cấp thông tin gì?",
      "en": "In the Trace Viewer, what does the \"Network\" tab provide?",
      "ja": "Trace Viewerの「Network」タブは何の情報を提供しますか。"
    },
    "options": [
      {
        "vi": "Sơ đồ cấu trúc thư mục dự án",
        "en": "A diagram of the project's folder structure",
        "ja": "プロジェクトのフォルダ構造の図"
      },
      {
        "vi": "Danh sách các request/response HTTP kèm status, headers, thời gian, dùng để kiểm tra các lời gọi API trong lúc test chạy",
        "en": "A list of HTTP requests/responses with status, headers, and timing, useful for inspecting API calls made during the test run",
        "ja": "ステータス、ヘッダー、タイミングを含むHTTPリクエスト/レスポンスの一覧で、テスト実行中のAPI呼び出しを検証するのに使う"
      },
      {
        "vi": "Danh sách các package npm đã cài đặt",
        "en": "A list of installed npm packages",
        "ja": "インストール済みのnpmパッケージ一覧"
      },
      {
        "vi": "Biểu đồ hiệu năng CPU của máy chạy test",
        "en": "A CPU performance chart of the machine running the test",
        "ja": "テスト実行マシンのCPUパフォーマンスチャート"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tab Network trong Trace Viewer liệt kê toàn bộ request/response mạng đã xảy ra trong quá trình chạy test, cho phép kiểm tra request thực tế mà không cần công cụ bên ngoài.",
      "en": "The Network tab in the Trace Viewer lists all network requests/responses that occurred during the test run, letting you inspect real traffic without external tools.",
      "ja": "Trace ViewerのNetworkタブはテスト実行中に発生したすべてのネットワークリクエスト/レスポンスを一覧表示し、外部ツールなしで実際の通信を検証できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Trace Viewer, khi click vào một hành động (action) trên timeline, panel bên phải hiển thị gì đặc trưng?",
      "en": "In the Trace Viewer, when clicking an action on the timeline, what does the right-side panel characteristically display?",
      "ja": "Trace Viewerでタイムライン上のアクションをクリックすると、右側パネルには特徴的に何が表示されますか。"
    },
    "options": [
      {
        "vi": "Danh sách người dùng đã đăng nhập vào hệ thống",
        "en": "A list of users who logged into the system",
        "ja": "システムにログインしたユーザーの一覧"
      },
      {
        "vi": "Chỉ hiển thị mã lỗi HTTP 500",
        "en": "Only an HTTP 500 error code",
        "ja": "HTTP 500エラーコードのみ"
      },
      {
        "vi": "Ảnh chụp DOM snapshot trước/sau hành động đó cùng đoạn mã nguồn tương ứng",
        "en": "A before/after DOM snapshot of that action along with the corresponding source code line",
        "ja": "そのアクションの前後のDOMスナップショットと対応するソースコード行"
      },
      {
        "vi": "Biểu đồ giá trị bộ nhớ RAM sử dụng",
        "en": "A chart of RAM memory usage",
        "ja": "RAM使用量のチャート"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chọn một action trong timeline sẽ hiển thị DOM snapshot trước và sau khi thực hiện, cùng với dòng mã nguồn tương ứng, giúp xác định chính xác nguyên nhân lỗi.",
      "en": "Selecting an action on the timeline shows the before/after DOM snapshot plus the corresponding source line, helping pinpoint the exact cause of a failure.",
      "ja": "タイムライン上のアクションを選択すると、実行前後のDOMスナップショットと対応するソースコード行が表示され、障害の正確な原因特定に役立ちます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn debug chỉ một test cụ thể theo tên thay vì cả suite, nên dùng cú pháp CLI nào?",
      "en": "To debug a single specific test by name instead of the whole suite, which CLI syntax should be used?",
      "ja": "スイート全体ではなく名前で特定の1つのテストだけをデバッグしたい場合、どのCLI構文を使うべきですか。"
    },
    "options": [
      {
        "vi": "npx playwright test --workers=1",
        "en": "npx playwright test --workers=1",
        "ja": "npx playwright test --workers=1"
      },
      {
        "vi": "npx playwright test --shard=1/2",
        "en": "npx playwright test --shard=1/2",
        "ja": "npx playwright test --shard=1/2"
      },
      {
        "vi": "npx playwright test --reporter=list",
        "en": "npx playwright test --reporter=list",
        "ja": "npx playwright test --reporter=list"
      },
      {
        "vi": "npx playwright test -g \"tên test\" --debug",
        "en": "npx playwright test -g \"test name\" --debug",
        "ja": "npx playwright test -g \"テスト名\" --debug"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cờ -g (grep) lọc test theo tên khớp regex, kết hợp --debug sẽ mở Inspector và chạy headed chỉ cho test đó, rất tiện khi cần tập trung debug một ca cụ thể.",
      "en": "The -g (grep) flag filters tests by matching name/regex, and combined with --debug it opens the Inspector and runs headed for only that test, convenient for focused debugging.",
      "ja": "-g (grep) フラグは名前/正規表現でテストを絞り込み、--debugと組み合わせると該当テストのみInspectorを開いてヘッド付きで実行でき、特定ケースの集中デバッグに便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright Inspector, tính năng \"Pick locator\" (chọn locator) dùng để làm gì?",
      "en": "In the Playwright Inspector, what is the \"Pick locator\" feature used for?",
      "ja": "Playwright Inspectorの「Pick locator」機能は何のために使いますか。"
    },
    "options": [
      {
        "vi": "Cho phép hover/click vào phần tử trên trang để Playwright tự sinh locator gợi ý tương ứng",
        "en": "Lets you hover/click an element on the page so Playwright suggests a corresponding generated locator",
        "ja": "ページ上の要素にホバー/クリックすることで、Playwrightが対応するロケーターの候補を自動生成する"
      },
      {
        "vi": "Tự động sửa lỗi assertion sai trong test",
        "en": "Automatically fixes incorrect assertions in the test",
        "ja": "テスト内の誤ったアサーションを自動的に修正する"
      },
      {
        "vi": "Xoá toàn bộ locator hiện có trong test",
        "en": "Deletes all existing locators in the test",
        "ja": "テスト内の既存のロケーターをすべて削除する"
      },
      {
        "vi": "Ghi lại video thao tác của người dùng",
        "en": "Records a video of the user's actions",
        "ja": "ユーザーの操作の動画を記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Pick locator cho phép người dùng trỏ chuột vào phần tử bất kỳ trên trang, Inspector sẽ đề xuất locator ổn định (ưu tiên role/text) tương ứng để dùng trong test.",
      "en": "Pick locator lets the user point at any element on the page, and the Inspector suggests a stable locator (preferring role/text) to use in the test.",
      "ja": "Pick locatorはユーザーがページ上の任意の要素を指し示すと、Inspectorが対応する安定したロケーター(role/textを優先)を提案してくれる機能です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "API `context.tracing.start()` và `context.tracing.stop({ path })` được dùng khi nào?",
      "en": "When are the `context.tracing.start()` and `context.tracing.stop({ path })` APIs used?",
      "ja": "`context.tracing.start()` と `context.tracing.stop({ path })` APIはどのような場合に使いますか。"
    },
    "options": [
      {
        "vi": "Khi cần cài đặt trình duyệt mới",
        "en": "When needing to install a new browser",
        "ja": "新しいブラウザをインストールしたい場合"
      },
      {
        "vi": "Khi cần bật/tắt ghi trace theo chương trình (programmatically) cho một đoạn thao tác cụ thể thay vì cấu hình toàn cục",
        "en": "When needing to programmatically start/stop tracing around a specific block of actions instead of relying on global config",
        "ja": "グローバル設定に頼らず、特定の操作ブロックに対してプログラム的にトレースの開始/停止を制御したい場合"
      },
      {
        "vi": "Khi cần tạo báo cáo HTML sau khi test chạy xong",
        "en": "When needing to generate an HTML report after tests finish",
        "ja": "テスト終了後にHTMLレポートを生成したい場合"
      },
      {
        "vi": "Khi cần xác thực token OAuth",
        "en": "When needing to authenticate an OAuth token",
        "ja": "OAuthトークンを認証したい場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ngoài cấu hình trace trong config file, Playwright cung cấp API tracing.start()/stop() để kiểm soát thủ công phạm vi ghi trace ngay trong mã test, hữu ích khi chỉ muốn trace một phần luồng.",
      "en": "Besides config-file tracing, Playwright exposes tracing.start()/stop() APIs to manually control the tracing scope directly in test code, useful when only part of a flow needs tracing.",
      "ja": "設定ファイルでのトレースに加え、Playwrightはtracing.start()/stop() APIを提供し、テストコード内で直接トレース範囲を手動制御できます。フローの一部のみトレースしたい場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI (ví dụ GitHub Actions), lý do phổ biến nhất để BẮT BUỘC chạy Playwright ở chế độ headless là gì?",
      "en": "In CI (e.g. GitHub Actions), what is the most common reason Playwright MUST run in headless mode?",
      "ja": "CI(例:GitHub Actions)でPlaywrightをヘッドレスモードで実行しなければならない最も一般的な理由は何ですか。"
    },
    "options": [
      {
        "vi": "Headless nhanh hơn tuyệt đối trong mọi trường hợp",
        "en": "Headless is absolutely faster in every case",
        "ja": "ヘッドレスはあらゆる場合で絶対的に高速だから"
      },
      {
        "vi": "Playwright chỉ hỗ trợ headless, không hỗ trợ headed",
        "en": "Playwright only supports headless mode, not headed",
        "ja": "Playwrightはヘッドレスモードのみをサポートし、ヘッド付きはサポートしないから"
      },
      {
        "vi": "Máy chủ CI thường không có màn hình/display server để hiển thị giao diện trình duyệt",
        "en": "CI servers typically have no display/screen server to render a browser UI",
        "ja": "CIサーバーには通常、ブラウザUIを描画するディスプレイ/スクリーンサーバーがないから"
      },
      {
        "vi": "Headless giúp tăng độ phân giải ảnh chụp màn hình",
        "en": "Headless improves the resolution of screenshots",
        "ja": "ヘッドレスはスクリーンショットの解像度を向上させるから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Máy chủ CI thường không có môi trường đồ hoạ (X server), nên chạy headed sẽ lỗi trừ khi dùng xvfb; vì vậy headless là lựa chọn mặc định và thực tế nhất trong CI.",
      "en": "CI servers usually lack a graphical environment (X server), so headed mode fails unless xvfb is used; hence headless is the default and practical choice in CI.",
      "ja": "CIサーバーには通常グラフィカル環境(Xサーバー)がないため、xvfbを使わない限りヘッド付きモードはエラーになります。そのためCIではヘッドレスがデフォルトかつ実用的な選択となります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thư mục `test-results/` mặc định lưu những gì sau khi chạy `playwright test`?",
      "en": "What does the default `test-results/` folder store after running `playwright test`?",
      "ja": "`playwright test` 実行後、デフォルトの `test-results/` フォルダには何が保存されますか。"
    },
    "options": [
      {
        "vi": "Chỉ chứa file log console dạng .txt",
        "en": "Only contains console log files as .txt",
        "ja": "コンソールログの.txtファイルのみ含まれる"
      },
      {
        "vi": "Chứa file cấu hình package.json đã build lại",
        "en": "Contains a rebuilt package.json config file",
        "ja": "再ビルドされたpackage.json設定ファイルが含まれる"
      },
      {
        "vi": "Chứa mã nguồn gốc của toàn bộ dự án",
        "en": "Contains the original source code of the entire project",
        "ja": "プロジェクト全体の元のソースコードが含まれる"
      },
      {
        "vi": "Chứa artifact của từng test như trace.zip, screenshot, video (khi được cấu hình bật)",
        "en": "Contains per-test artifacts such as trace.zip, screenshots, and videos (when enabled in config)",
        "ja": "設定で有効化されている場合、trace.zip、スクリーンショット、動画などテストごとのアーティファクトが含まれる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "test-results/ là thư mục output mặc định chứa artifact theo từng test case (trace, screenshot, video) khi các tuỳ chọn tương ứng được bật trong config, phục vụ điều tra sau khi chạy.",
      "en": "test-results/ is the default output folder holding per-test-case artifacts (trace, screenshot, video) when the corresponding config options are enabled, for post-run investigation.",
      "ja": "test-results/は、設定で対応するオプションが有効な場合にテストケースごとのアーティファクト(トレース、スクリーンショット、動画)を保存するデフォルトの出力フォルダで、実行後の調査に使われます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lệnh `npx playwright show-report` dùng để làm gì?",
      "en": "What does the `npx playwright show-report` command do?",
      "ja": "`npx playwright show-report` コマンドは何をしますか。"
    },
    "options": [
      {
        "vi": "Mở báo cáo HTML tổng hợp kết quả chạy test (pass/fail, thời gian, kèm link tới trace/screenshot/video của từng test)",
        "en": "Opens the aggregated HTML report of the test run (pass/fail, duration, with links to each test's trace/screenshot/video)",
        "ja": "テスト実行結果(合否、所要時間)を集約したHTMLレポートを開き、各テストのトレース/スクリーンショット/動画へのリンクも含む"
      },
      {
        "vi": "Cài đặt lại toàn bộ trình duyệt Playwright",
        "en": "Reinstalls all Playwright browsers",
        "ja": "Playwrightのブラウザをすべて再インストールする"
      },
      {
        "vi": "Xoá cache của npm",
        "en": "Clears the npm cache",
        "ja": "npmキャッシュをクリアする"
      },
      {
        "vi": "Khởi động lại CI pipeline",
        "en": "Restarts the CI pipeline",
        "ja": "CIパイプラインを再起動する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "show-report mở HTML reporter mặc định của Playwright trên trình duyệt local, hiển thị tổng quan kết quả và cho phép truy cập trực tiếp trace/screenshot/video của từng test.",
      "en": "show-report opens Playwright's default HTML reporter in a local browser, showing an overview of results with direct access to each test's trace/screenshot/video.",
      "ja": "show-reportはPlaywrightのデフォルトHTMLレポーターをローカルブラウザで開き、結果の概要と各テストのトレース/スクリーンショット/動画への直接アクセスを提供します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, vì sao nên upload thư mục artifact (chứa trace/screenshot/video) làm build artifact thay vì chỉ xem log console?",
      "en": "In CI, why should the artifact folder (containing trace/screenshot/video) be uploaded as a build artifact rather than only relying on console logs?",
      "ja": "CIにおいて、なぜコンソールログだけに頼るのではなく、アーティファクトフォルダ(トレース/スクリーンショット/動画を含む)をビルドアーティファクトとしてアップロードすべきなのですか。"
    },
    "options": [
      {
        "vi": "Vì console log không bao giờ hiển thị được trên CI",
        "en": "Because console logs never display on CI",
        "ja": "コンソールログはCIで表示されることが決してないから"
      },
      {
        "vi": "Vì log console chỉ cho biết pass/fail và thông báo lỗi, không tái hiện được trực quan DOM/network/hành động lúc lỗi xảy ra; artifact giúp debug sau khi môi trường CI đã bị huỷ",
        "en": "Because console logs only show pass/fail and error messages, not a visual replay of the DOM/network/actions at failure time; artifacts allow debugging after the CI environment is torn down",
        "ja": "コンソールログは合否とエラーメッセージしか示さず、失敗時のDOM/ネットワーク/操作を視覚的に再現できないため。アーティファクトはCI環境が破棄された後でもデバッグを可能にする"
      },
      {
        "vi": "Vì artifact giúp giảm thời gian build xuống 0 giây",
        "en": "Because artifacts reduce build time to zero seconds",
        "ja": "アーティファクトはビルド時間をゼロ秒に短縮するから"
      },
      {
        "vi": "Vì artifact thay thế hoàn toàn cho việc viết test",
        "en": "Because artifacts completely replace the need to write tests",
        "ja": "アーティファクトはテストを書く必要を完全になくすから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Môi trường CI thường ngắn hạn (ephemeral) và bị huỷ sau job; nếu không upload artifact thì trace/screenshot/video sẽ mất, khiến việc điều tra lỗi sau đó gần như không thể tái hiện chi tiết.",
      "en": "CI environments are typically ephemeral and torn down after the job; without uploading artifacts, the trace/screenshot/video would be lost, making detailed post-mortem debugging nearly impossible.",
      "ja": "CI環境は通常一時的でジョブ後に破棄されます。アーティファクトをアップロードしないと、トレース/スクリーンショット/動画が失われ、後から詳細な事後調査を再現することがほぼ不可能になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi so sánh, `toHaveScreenshot()` trong Playwright Test khác gì so với `page.screenshot()` thông thường?",
      "en": "How does `toHaveScreenshot()` in Playwright Test differ from a plain `page.screenshot()` call?",
      "ja": "Playwright Testの `toHaveScreenshot()` は通常の `page.screenshot()` 呼び出しとどう違いますか。"
    },
    "options": [
      {
        "vi": "Hai hàm hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are entirely identical, differing only in name",
        "ja": "両者は名前が違うだけで完全に同一である"
      },
      {
        "vi": "toHaveScreenshot() chỉ hoạt động trên trình duyệt Firefox",
        "en": "toHaveScreenshot() only works in the Firefox browser",
        "ja": "toHaveScreenshot()はFirefoxブラウザでのみ動作する"
      },
      {
        "vi": "toHaveScreenshot() là một assertion so khớp ảnh chụp hiện tại với ảnh baseline đã lưu, tự động fail test nếu khác biệt vượt ngưỡng cho phép (visual regression testing)",
        "en": "toHaveScreenshot() is an assertion that compares the current screenshot against a saved baseline image, failing the test automatically if the difference exceeds a threshold (visual regression testing)",
        "ja": "toHaveScreenshot()は現在のスクリーンショットを保存済みのベースライン画像と比較するアサーションで、差異が閾値を超えると自動的にテストを失敗させる(ビジュアルリグレッションテスト)"
      },
      {
        "vi": "toHaveScreenshot() không lưu file ảnh nào, chỉ trả về base64 string",
        "en": "toHaveScreenshot() saves no image file at all, only returns a base64 string",
        "ja": "toHaveScreenshot()は画像ファイルを一切保存せず、base64文字列を返すだけである"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "toHaveScreenshot() là API assertion phục vụ visual regression testing: nó chụp ảnh hiện tại, so sánh pixel với baseline lưu sẵn (thư mục -snapshots-) và fail nếu sai khác vượt ngưỡng cấu hình.",
      "en": "toHaveScreenshot() is an assertion API for visual regression testing: it captures the current screenshot, compares pixels against a saved baseline (in the -snapshots- folder), and fails if the difference exceeds a configured threshold.",
      "ja": "toHaveScreenshot()はビジュアルリグレッションテスト用のアサーションAPIです。現在のスクリーンショットを撮影し、保存済みのベースライン(-snapshots-フォルダ)とピクセル比較を行い、設定された閾値を超える差異があればテストを失敗させます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy test lần đầu với `toHaveScreenshot()` mà chưa có ảnh baseline, điều gì xảy ra?",
      "en": "When running a test with `toHaveScreenshot()` for the first time and no baseline image exists yet, what happens?",
      "ja": "`toHaveScreenshot()` を含むテストを初めて実行し、まだベースライン画像が存在しない場合、何が起こりますか。"
    },
    "options": [
      {
        "vi": "Test tự động pass mà không kiểm tra gì",
        "en": "The test automatically passes without checking anything",
        "ja": "何もチェックせずにテストが自動的にパスする"
      },
      {
        "vi": "Playwright báo lỗi và không tạo ra bất kỳ file nào",
        "en": "Playwright throws an error and creates no files at all",
        "ja": "Playwrightはエラーを出し、いかなるファイルも作成しない"
      },
      {
        "vi": "Test bị bỏ qua (skip) hoàn toàn",
        "en": "The test is skipped entirely",
        "ja": "テストは完全にスキップされる"
      },
      {
        "vi": "Playwright tự tạo ảnh baseline mới từ ảnh hiện tại và test fail lần đó (cần chạy lại để so khớp lần sau) hoặc pass tuỳ phiên bản, nhưng luôn sinh file baseline mới",
        "en": "Playwright generates a new baseline image from the current screenshot and the test typically fails that run (needing a re-run to compare later) or passes depending on version, but always writes a new baseline file",
        "ja": "Playwrightは現在のスクリーンショットから新しいベースライン画像を生成し、その回のテストは失敗する(次回比較のため再実行が必要)場合が多いが、常に新しいベースラインファイルが書き込まれる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nếu chưa có baseline, Playwright tạo file ảnh mới trong thư mục snapshot và báo thiếu baseline (test không pass ở lần chạy đó); người viết test cần review rồi commit ảnh baseline để các lần chạy sau so khớp.",
      "en": "Without an existing baseline, Playwright writes a new snapshot file and reports the missing baseline (the test does not pass that run); the author must review and commit the baseline image for future comparisons.",
      "ja": "ベースラインが存在しない場合、Playwrightは新しいスナップショットファイルを書き込み、ベースライン不足を報告します(その回のテストはパスしません)。テスト作成者はベースライン画像をレビューしコミットして、以降の比較に使う必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lệnh `npx playwright test --debug` khác gì so với `npx playwright test --headed`?",
      "en": "How does `npx playwright test --debug` differ from `npx playwright test --headed`?",
      "ja": "`npx playwright test --debug` は `npx playwright test --headed` とどう違いますか。"
    },
    "options": [
      {
        "vi": "--headed chỉ hiển thị trình duyệt và chạy bình thường (không dừng); --debug hiển thị trình duyệt, tự động mở Inspector và tạm dừng trước hành động đầu tiên để debug từng bước",
        "en": "--headed only shows the browser and runs normally (no pause); --debug shows the browser, automatically opens the Inspector, and pauses before the first action for step-by-step debugging",
        "ja": "--headedはブラウザを表示して通常通り実行するだけ(停止しない);--debugはブラウザを表示し、自動的にInspectorを開き、最初のアクションの前で一時停止してステップごとのデバッグを可能にする"
      },
      {
        "vi": "Hai lệnh hoàn toàn giống nhau",
        "en": "The two commands are completely identical",
        "ja": "両者は完全に同一である"
      },
      {
        "vi": "--debug chỉ dùng được với Firefox",
        "en": "--debug only works with Firefox",
        "ja": "--debugはFirefoxでのみ動作する"
      },
      {
        "vi": "--headed chạy nhanh hơn --debug nhưng không hiển thị trình duyệt",
        "en": "--headed runs faster than --debug but does not show the browser",
        "ja": "--headedは--debugより高速に実行されるがブラウザは表示されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "--headed chỉ bật giao diện trình duyệt, test vẫn chạy tự động không dừng; --debug thêm việc mở Playwright Inspector và set PWDEBUG ngầm định, tạm dừng để người dùng debug từng bước.",
      "en": "--headed merely shows the browser UI while the test still runs automatically without pausing; --debug additionally opens the Playwright Inspector and implicitly sets PWDEBUG, pausing for step-by-step user debugging.",
      "ja": "--headedは単にブラウザUIを表示するだけでテストは自動的に停止せず実行されます。--debugはさらにPlaywright Inspectorを開き暗黙的にPWDEBUGを設定し、ユーザーがステップごとにデバッグできるよう一時停止します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Trace Viewer, tab \"Console\" hiển thị thông tin gì?",
      "en": "In the Trace Viewer, what does the \"Console\" tab display?",
      "ja": "Trace Viewerの「Console」タブは何を表示しますか。"
    },
    "options": [
      {
        "vi": "Danh sách các package đã cài trong node_modules",
        "en": "A list of packages installed in node_modules",
        "ja": "node_modulesにインストールされたパッケージの一覧"
      },
      {
        "vi": "Các log console.log/console.error và lỗi JavaScript xảy ra trên trang trong lúc test chạy",
        "en": "console.log/console.error output and JavaScript errors that occurred on the page during the test run",
        "ja": "テスト実行中にページ上で発生したconsole.log/console.error出力とJavaScriptエラー"
      },
      {
        "vi": "Lịch sử commit Git của dự án",
        "en": "The project's Git commit history",
        "ja": "プロジェクトのGitコミット履歴"
      },
      {
        "vi": "Danh sách biến môi trường trên máy CI",
        "en": "A list of environment variables on the CI machine",
        "ja": "CIマシンの環境変数一覧"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tab Console trong Trace Viewer thu thập log và lỗi JavaScript phát sinh trong browser context lúc chạy test, giúp phát hiện lỗi phía client không hiển thị trong log terminal.",
      "en": "The Console tab in the Trace Viewer collects logs and JavaScript errors emitted from the browser context during the test run, helping surface client-side issues not visible in terminal logs.",
      "ja": "Trace ViewerのConsoleタブは、テスト実行中にブラウザコンテキストから発生したログとJavaScriptエラーを収集し、ターミナルログには表示されないクライアント側の問題を発見するのに役立ちます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, việc cấu hình `retries: 2` kết hợp với `trace: 'on-first-retry'` mang lại lợi ích thực tế nào?",
      "en": "In CI, what practical benefit does configuring `retries: 2` combined with `trace: 'on-first-retry'` provide?",
      "ja": "CIで `retries: 2` と `trace: 'on-first-retry'` を組み合わせて設定すると、実際にどのような利点がありますか。"
    },
    "options": [
      {
        "vi": "Giúp test luôn pass bất kể lỗi thật sự",
        "en": "Ensures tests always pass regardless of real bugs",
        "ja": "実際のバグに関係なく常にテストをパスさせる"
      },
      {
        "vi": "Giảm số lượng test cần viết",
        "en": "Reduces the number of tests that need to be written",
        "ja": "作成が必要なテストの数を減らす"
      },
      {
        "vi": "Giúp phân biệt lỗi flaky (qua ở lần retry) với lỗi thật, đồng thời chỉ tốn chi phí lưu trace ở đúng lần thất bại đầu tiên thay vì mọi lần chạy",
        "en": "Helps distinguish flaky failures (which pass on retry) from real bugs, while only incurring trace storage cost on the exact first failing attempt instead of every run",
        "ja": "フレーキーな失敗(リトライで成功する)と本当のバグを区別するのに役立ち、かつ最初に失敗した試行時のみトレース保存コストが発生し、毎回のトレース記録を避けられる"
      },
      {
        "vi": "Tự động sửa code lỗi trong repository",
        "en": "Automatically fixes buggy code in the repository",
        "ja": "リポジトリ内のバグのあるコードを自動修正する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "retries cho phép test chạy lại khi fail để loại trừ tình huống flaky; kết hợp on-first-retry chỉ bật trace đúng lúc cần điều tra (lần fail đầu), cân bằng giữa khả năng debug và chi phí lưu trữ/CI time.",
      "en": "retries lets a failed test rerun to rule out flakiness; combined with on-first-retry, tracing is only enabled exactly when investigation is needed (the first failure), balancing debuggability against storage/CI time cost.",
      "ja": "retriesは失敗したテストを再実行させ、フレーキーさを排除するのに役立ちます。on-first-retryと組み合わせることで、調査が必要なとき(最初の失敗時)にのみトレースが有効化され、デバッグ性とストレージ/CI時間のコストのバランスを取れます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điểm khác biệt cốt lõi trong cách Playwright và Selenium giao tiếp với trình duyệt là gì?",
      "en": "What is the core difference in how Playwright and Selenium communicate with the browser?",
      "ja": "PlaywrightとSeleniumがブラウザと通信する方法の根本的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Cả hai không cần giao thức, thao tác trực tiếp lên hệ điều hành",
        "en": "Neither needs a protocol; both operate directly on the OS",
        "ja": "どちらもプロトコルは不要でOSを直接操作する"
      },
      {
        "vi": "Selenium giao tiếp qua CDP còn Playwright dùng WebDriver",
        "en": "Selenium talks via CDP while Playwright uses WebDriver",
        "ja": "SeleniumがCDPで通信し、PlaywrightがWebDriverを使う"
      },
      {
        "vi": "Cả hai đều dùng đúng một giao thức WebDriver giống hệt nhau",
        "en": "Both use exactly the same WebDriver protocol",
        "ja": "両者とも全く同じWebDriverプロトコルを使う"
      },
      {
        "vi": "Playwright giao tiếp qua giao thức gốc của từng engine (như CDP với Chromium), còn Selenium dùng chuẩn WebDriver qua HTTP",
        "en": "Playwright talks to each engine via its native protocol (like CDP for Chromium), while Selenium uses the WebDriver standard over HTTP",
        "ja": "PlaywrightはChromiumならCDPのようにエンジン固有のプロトコルで通信し、SeleniumはHTTP経由のWebDriver標準を使う"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright kết nối trực tiếp với engine trình duyệt qua giao thức riêng (CDP cho Chromium, các kênh tương đương cho Firefox/WebKit), giúp giao tiếp nhanh và giàu thông tin hơn; Selenium dựa trên chuẩn WebDriver W3C truyền lệnh qua HTTP tới driver trung gian.",
      "en": "Playwright connects directly to the browser engine via native protocols (CDP for Chromium, equivalent channels for Firefox/WebKit), giving richer, faster communication; Selenium relies on the W3C WebDriver standard sending commands over HTTP to an intermediary driver.",
      "ja": "Playwrightはエンジン固有のプロトコル(ChromiumならCDP、Firefox/WebKitは同等のチャネル)でブラウザエンジンと直接通信するため高速で情報量が多い。一方Seleniumは中間ドライバーへHTTP経由でコマンドを送るW3C WebDriver標準に依存する。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao khi bắt đầu dùng Playwright, người dùng thường không cần tự tải chromedriver hay geckodriver như khi dùng Selenium?",
      "en": "Why do Playwright users typically not need to manually download chromedriver or geckodriver the way Selenium users do?",
      "ja": "Playwrightを使い始める際、Seleniumのようにchromedriverやgeckodriverを手動でダウンロードする必要が通常ないのはなぜですか?"
    },
    "options": [
      {
        "vi": "Playwright tự tải và quản lý sẵn các bản build trình duyệt tương thích thông qua lệnh cài đặt của chính nó",
        "en": "Playwright automatically downloads and manages compatible browser builds through its own install command",
        "ja": "Playwrightは自身のインストールコマンドを通じて互換性のあるブラウザビルドを自動でダウンロード・管理するから"
      },
      {
        "vi": "Vì Playwright không hỗ trợ chạy trên máy Windows",
        "en": "Because Playwright doesn't support running on Windows",
        "ja": "WindowsではPlaywrightが動作しないから"
      },
      {
        "vi": "Vì Playwright chỉ chạy được trên trình duyệt đã cài sẵn trên máy",
        "en": "Because Playwright can only run on browsers already installed on the machine",
        "ja": "マシンに既にインストール済みのブラウザでしかPlaywrightは動作しないから"
      },
      {
        "vi": "Vì Playwright không hỗ trợ Chromium",
        "en": "Because Playwright doesn't support Chromium",
        "ja": "PlaywrightはChromiumをサポートしないから"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Playwright đóng gói sẵn các bản build trình duyệt (Chromium, Firefox, WebKit) đã được kiểm thử tương thích và tải về qua `npx playwright install`, loại bỏ vấn đề lệch phiên bản driver mà Selenium hay gặp.",
      "en": "Playwright ships and downloads pre-tested browser builds (Chromium, Firefox, WebKit) via `npx playwright install`, eliminating the driver version mismatch issues common with Selenium.",
      "ja": "Playwrightは`npx playwright install`でテスト済みのブラウザビルド(Chromium、Firefox、WebKit)を配布・ダウンロードするため、Seleniumでよくあるドライバーのバージョン不一致問題が起きない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Kiến trúc test runner của Cypress (chạy test bên trong trình duyệt, cùng vòng lặp sự kiện với ứng dụng) dẫn tới hạn chế nào so với Playwright?",
      "en": "Cypress's test runner architecture (tests execute inside the browser, sharing the app's event loop) leads to what limitation compared to Playwright?",
      "ja": "Cypressのテストランナー構成(テストがブラウザ内でアプリと同じイベントループを共有して実行される)は、Playwrightと比べてどのような制約を生みますか?"
    },
    "options": [
      {
        "vi": "Cypress không thể chạy trên Linux",
        "en": "Cypress cannot run on Linux",
        "ja": "CypressはLinuxで動作しない"
      },
      {
        "vi": "Cypress gặp khó khăn khi điều khiển nhiều tab/nhiều trình duyệt cùng lúc trong một test",
        "en": "Cypress historically struggles to control multiple tabs/browsers simultaneously within a single test",
        "ja": "Cypressは1つのテスト内で複数タブ・複数ブラウザを同時制御することが従来難しい"
      },
      {
        "vi": "Cypress không hỗ trợ TypeScript",
        "en": "Cypress doesn't support TypeScript",
        "ja": "CypressはTypeScriptをサポートしない"
      },
      {
        "vi": "Cypress không thể chụp ảnh màn hình",
        "en": "Cypress cannot take screenshots",
        "ja": "Cypressはスクリーンショットを撮れない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì chạy trong cùng tiến trình/vòng lặp sự kiện với trang web, Cypress khó điều khiển nhiều tab hoặc nhiều trình duyệt song song trong một test; Playwright chạy ngoài tiến trình nên kiểm soát linh hoạt nhiều page/context cùng lúc.",
      "en": "Because it runs in the same process/event loop as the page under test, Cypress has historically struggled to drive multiple tabs or browsers in one test; Playwright runs out-of-process, giving flexible control over multiple pages/contexts at once.",
      "ja": "テスト対象ページと同じプロセス・イベントループで動くため、Cypressは1つのテストで複数タブや複数ブラウザを扱うのが従来困難。Playwrightはプロセス外で動作するため複数のpage/contextを柔軟に同時制御できる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright hỗ trợ chạy test trên những engine trình duyệt nào ngay từ hộp (out-of-the-box)?",
      "en": "Which browser engines does Playwright support out-of-the-box?",
      "ja": "Playwrightが標準でサポートするブラウザエンジンはどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ Chromium",
        "en": "Only Chromium",
        "ja": "Chromiumのみ"
      },
      {
        "vi": "Chỉ Chromium và Firefox",
        "en": "Only Chromium and Firefox",
        "ja": "ChromiumとFirefoxのみ"
      },
      {
        "vi": "Chromium, Firefox và WebKit",
        "en": "Chromium, Firefox and WebKit",
        "ja": "Chromium、Firefox、WebKit"
      },
      {
        "vi": "Internet Explorer và Edge Legacy",
        "en": "Internet Explorer and Edge Legacy",
        "ja": "Internet ExplorerとEdge Legacy"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright cung cấp API thống nhất cho ba engine Chromium, Firefox và WebKit (nền tảng của Safari), giúp kiểm thử chéo trình duyệt mà không cần viết code riêng cho từng engine.",
      "en": "Playwright provides a unified API across three engines — Chromium, Firefox, and WebKit (the engine behind Safari) — enabling cross-browser testing without engine-specific code.",
      "ja": "Playwrightは Chromium、Firefox、WebKit(Safariの基盤エンジン)の3エンジンに対して統一APIを提供し、エンジンごとに別コードを書かずにクロスブラウザテストができる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trước khi có `cy.origin()`, Cypress gặp trở ngại gì khi test một luồng chuyển hướng qua nhiều domain khác nhau (ví dụ trang thanh toán bên thứ ba)?",
      "en": "Before `cy.origin()` existed, what obstacle did Cypress face when testing a flow that navigates across different domains (e.g. a third-party payment page)?",
      "ja": "`cy.origin()`が登場する前、Cypressは異なるドメインをまたぐフロー(例:サードパーティ決済ページ)のテストでどんな障害に直面していましたか?"
    },
    "options": [
      {
        "vi": "Cypress không thể chạy ở chế độ headless",
        "en": "Cypress could not run in headless mode",
        "ja": "Cypressはヘッドレスモードで動作できなかった"
      },
      {
        "vi": "Cypress không thể chạy song song nhiều test",
        "en": "Cypress could not run multiple tests in parallel",
        "ja": "Cypressは複数のテストを並列実行できなかった"
      },
      {
        "vi": "Cypress không hỗ trợ chụp video",
        "en": "Cypress did not support video recording",
        "ja": "Cypressは動画録画をサポートしていなかった"
      },
      {
        "vi": "Cypress bị giới hạn bởi chính sách same-origin nên khó thao tác trên domain khác trong cùng một test",
        "en": "Cypress was constrained by the same-origin policy, making it hard to interact with a different domain within one test",
        "ja": "同一オリジンポリシーに制約され、1つのテスト内で別ドメインを操作することが困難だった"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì Cypress chạy trong trình duyệt thật và bị ràng buộc bởi same-origin policy, việc chuyển sang domain khác trong cùng test từng rất khó; `cy.origin()` được thêm để giải quyết vấn đề này, trong khi Playwright vốn không bị hạn chế đó do kiến trúc điều khiển ngoài tiến trình.",
      "en": "Because Cypress runs inside the real browser and is bound by the same-origin policy, switching domains mid-test used to be very difficult; `cy.origin()` was added to address this, whereas Playwright was never constrained this way due to its out-of-process architecture.",
      "ja": "Cypressは実ブラウザ内で動作し同一オリジンポリシーに縛られるため、テスト途中で別ドメインへ切り替えるのが従来非常に困難だった。この問題を解決するために`cy.origin()`が追加された。一方Playwrightはプロセス外アーキテクチャのためこの制約を元々受けない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "`browser.newContext()` trong Playwright mang lại lợi ích gì khi cần chạy nhiều kịch bản test song song với trạng thái đăng nhập/cookie khác nhau?",
      "en": "What benefit does `browser.newContext()` in Playwright provide when running many parallel test scenarios with different login states/cookies?",
      "ja": "異なるログイン状態・クッキーで多数のテストシナリオを並列実行する際、Playwrightの`browser.newContext()`はどんな利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Nó tạo môi trường trình duyệt cô lập (cookie, storage riêng) mà không cần khởi động một tiến trình trình duyệt mới cho mỗi test",
        "en": "It creates an isolated browser environment (separate cookies/storage) without launching a brand-new browser process for each test",
        "ja": "テストごとに新しいブラウザプロセスを起動せずに、独立したブラウザ環境(クッキー・ストレージを分離)を作成する"
      },
      {
        "vi": "Nó tự động chấm điểm kết quả test",
        "en": "It automatically grades test results",
        "ja": "テスト結果を自動採点する"
      },
      {
        "vi": "Nó thay thế hoàn toàn nhu cầu dùng CI/CD",
        "en": "It completely eliminates the need for CI/CD",
        "ja": "CI/CDの必要性を完全になくす"
      },
      {
        "vi": "Nó chuyển đổi test sang chạy trên trình duyệt di động thật",
        "en": "It converts tests to run on real mobile devices",
        "ja": "テストを実機モバイルデバイス上での実行に変換する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "BrowserContext hoạt động như một hồ sơ trình duyệt độc lập (cookie, localStorage, session riêng) nhưng dùng chung một tiến trình trình duyệt đã khởi chạy, giúp chạy song song rẻ và nhanh hơn nhiều so với việc mở nhiều instance trình duyệt riêng biệt như cách tiếp cận truyền thống với Selenium.",
      "en": "A BrowserContext acts like an independent browser profile (separate cookies, localStorage, session) while sharing a single already-launched browser process, making parallel runs much cheaper and faster than spinning up separate browser instances the traditional Selenium way.",
      "ja": "BrowserContextは独立したブラウザプロファイル(個別のクッキー、localStorage、セッション)として機能しつつ、既に起動済みの1つのブラウザプロセスを共有するため、Selenium流に個別のブラウザインスタンスを都度起動するより並列実行がはるかに安価かつ高速になる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Selenium Grid được dùng để giải quyết vấn đề gì trong automation testing?",
      "en": "What problem does Selenium Grid solve in automation testing?",
      "ja": "Selenium Gridは自動テストにおいてどんな問題を解決するために使われますか?"
    },
    "options": [
      {
        "vi": "Tự động sinh mã kiểm thử từ thao tác chuột",
        "en": "Automatically generating test code from mouse actions",
        "ja": "マウス操作からテストコードを自動生成する"
      },
      {
        "vi": "Chạy test song song và phân tán trên nhiều máy/node trình duyệt khác nhau",
        "en": "Running tests in parallel and distributed across multiple machines/browser nodes",
        "ja": "複数のマシン・ブラウザノードにまたがってテストを並列かつ分散実行する"
      },
      {
        "vi": "Chấm điểm chất lượng code test",
        "en": "Grading the quality of test code",
        "ja": "テストコードの品質を採点する"
      },
      {
        "vi": "Quản lý cơ sở dữ liệu kết quả test",
        "en": "Managing a database of test results",
        "ja": "テスト結果のデータベースを管理する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Selenium Grid cho phép phân phối việc thực thi test trên nhiều máy chủ/trình duyệt khác nhau để tăng tốc độ và độ phủ; Playwright đạt mục tiêu tương tự bằng cơ chế worker song song tích hợp sẵn trong test runner của nó mà không cần hạ tầng Grid riêng.",
      "en": "Selenium Grid distributes test execution across multiple hosts/browsers to increase speed and coverage; Playwright achieves a similar goal via built-in parallel workers in its own test runner, without needing separate Grid infrastructure.",
      "ja": "Selenium Gridは複数のホスト・ブラウザにテスト実行を分散させることで速度とカバレッジを高める。Playwrightは専用のGridインフラを必要とせず、自身のテストランナーに組み込まれた並列ワーカー機構で同様の目的を達成する。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điểm mạnh về hỗ trợ ngôn ngữ lập trình chính thức của Playwright (do Microsoft duy trì) so với Cypress là gì?",
      "en": "What is Playwright's (Microsoft-maintained) advantage in official language support compared to Cypress?",
      "ja": "Microsoftが保守するPlaywrightの公式言語サポートは、Cypressと比べてどんな強みがありますか?"
    },
    "options": [
      {
        "vi": "Playwright chỉ hỗ trợ duy nhất JavaScript giống Cypress",
        "en": "Playwright only supports JavaScript, just like Cypress",
        "ja": "PlaywrightもCypressと同様JavaScriptのみをサポートする"
      },
      {
        "vi": "Cypress hỗ trợ nhiều ngôn ngữ hơn Playwright",
        "en": "Cypress supports more languages than Playwright",
        "ja": "CypressはPlaywrightより多くの言語をサポートする"
      },
      {
        "vi": "Playwright có binding chính thức cho JS/TS, Python, Java và .NET, trong khi Cypress chủ yếu chỉ dùng JS/TS",
        "en": "Playwright has official bindings for JS/TS, Python, Java, and .NET, while Cypress is essentially JS/TS-only",
        "ja": "PlaywrightはJS/TS、Python、Java、.NET向けの公式バインディングを持つが、CypressはほぼJS/TS限定である"
      },
      {
        "vi": "Playwright không hỗ trợ TypeScript",
        "en": "Playwright does not support TypeScript",
        "ja": "PlaywrightはTypeScriptをサポートしない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright cung cấp bộ API chính thức, được bảo trì đồng bộ cho JS/TS, Python, Java và .NET, phù hợp với đội ngũ đa công nghệ; Cypress được thiết kế gắn chặt với hệ sinh thái JavaScript/TypeScript nên không có lựa chọn ngôn ngữ khác chính thức.",
      "en": "Playwright ships officially maintained, feature-parallel APIs for JS/TS, Python, Java, and .NET, suiting polyglot teams; Cypress is tightly coupled to the JavaScript/TypeScript ecosystem with no official alternative language bindings.",
      "ja": "Playwrightは JS/TS、Python、Java、.NET向けに公式かつ機能面で足並みを揃えたAPIを提供し、多言語チームに適している。一方Cypressは JavaScript/TypeScriptエコシステムに密結合しており、公式な他言語バインディングは存在しない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So với Playwright và Cypress, điểm mạnh truyền thống của Selenium về hỗ trợ ngôn ngữ lập trình là gì?",
      "en": "Compared to Playwright and Cypress, what is Selenium's traditional strength in language support?",
      "ja": "PlaywrightやCypressと比べて、言語サポートにおけるSeleniumの伝統的な強みは何ですか?"
    },
    "options": [
      {
        "vi": "Selenium chỉ hỗ trợ một ngôn ngữ duy nhất là Java",
        "en": "Selenium only supports a single language, Java",
        "ja": "SeleniumはJavaのみをサポートする"
      },
      {
        "vi": "Selenium không có binding cho ngôn ngữ nào ngoài JavaScript",
        "en": "Selenium has no bindings for any language other than JavaScript",
        "ja": "SeleniumはJavaScript以外の言語バインディングを持たない"
      },
      {
        "vi": "Selenium chỉ chạy được với ngôn ngữ biên dịch (compiled language)",
        "en": "Selenium only works with compiled languages",
        "ja": "Seleniumはコンパイル言語でしか動作しない"
      },
      {
        "vi": "Selenium có hệ sinh thái binding cộng đồng rất rộng (Java, Python, C#, Ruby, JavaScript, Kotlin...) tích lũy qua nhiều năm",
        "en": "Selenium has a very broad community-driven binding ecosystem (Java, Python, C#, Ruby, JavaScript, Kotlin, etc.) accumulated over many years",
        "ja": "Seleniumは長年蓄積された非常に幅広いコミュニティ製バインディングのエコシステム(Java、Python、C#、Ruby、JavaScript、Kotlinなど)を持つ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhờ ra đời sớm và cộng đồng lớn, Selenium có binding cho rất nhiều ngôn ngữ được duy trì bởi cộng đồng, phù hợp khi tổ chức đã có sẵn đội ngũ và hệ thống automation xây dựng từ trước bằng ngôn ngữ ít phổ biến hơn.",
      "en": "Thanks to its early adoption and large community, Selenium has bindings for a wide range of languages maintained by the community, making it a fit when an organization already has teams and legacy automation built in a less mainstream language.",
      "ja": "早期に普及し大規模なコミュニティを持つため、Seleniumは非常に多くの言語向けにコミュニティ保守のバインディングを持ち、あまり主流でない言語で既に構築されたチームやレガシー自動化がある組織に適している。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong tình huống nào việc chọn Cypress thường hợp lý hơn Playwright?",
      "en": "In which situation is choosing Cypress typically more reasonable than Playwright?",
      "ja": "どのような状況でPlaywrightよりCypressを選ぶ方が一般的に理にかなっていますか?"
    },
    "options": [
      {
        "vi": "Khi đội ngũ là các nhà phát triển frontend quen thuộc với Cypress, ưu tiên trải nghiệm debug trực quan kiểu time-travel ngay trong trình duyệt khi phát triển component",
        "en": "When the team is frontend developers already comfortable with Cypress, prioritizing its visual time-travel debugging experience directly in the browser while building components",
        "ja": "チームがCypressに慣れたフロントエンド開発者で、コンポーネント開発中にブラウザ内で直感的なタイムトラベルデバッグ体験を重視する場合"
      },
      {
        "vi": "Khi cần chạy test song song trên nhiều máy chủ CI với chi phí thấp",
        "en": "When you need low-cost distributed parallel test execution across many CI machines",
        "ja": "多数のCIマシンにまたがる低コストの分散並列テスト実行が必要な場合"
      },
      {
        "vi": "Khi cần test đồng thời trên WebKit thực sự để mô phỏng Safari",
        "en": "When you need to test on real WebKit to emulate Safari",
        "ja": "実際のWebKitでSafariを再現してテストする必要がある場合"
      },
      {
        "vi": "Khi cần điều khiển nhiều domain khác nhau trong cùng một test mà không gặp rào cản kỹ thuật",
        "en": "When you need to control multiple different domains in one test without technical friction",
        "ja": "技術的な障壁なく1つのテスト内で複数の異なるドメインを操作する必要がある場合"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cypress được nhiều đội frontend ưa chuộng vì tích hợp chặt với quy trình phát triển component, cung cấp giao diện debug trực quan (time-travel, snapshot DOM) chạy ngay trong trình duyệt — phù hợp khi ưu tiên trải nghiệm phát triển hơn là phạm vi trình duyệt rộng.",
      "en": "Cypress is popular with frontend teams because it integrates tightly with the component development workflow and offers an intuitive in-browser debugging UI (time-travel, DOM snapshots) — a good fit when developer experience matters more than broad browser coverage.",
      "ja": "Cypressはコンポーネント開発ワークフローと密に統合され、ブラウザ内で直感的なデバッグUI(タイムトラベル、DOMスナップショット)を提供するため、フロントエンドチームに人気がある。幅広いブラウザカバレッジよりも開発体験を重視する場合に適している。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi nào tổ chức thường vẫn giữ Selenium thay vì chuyển sang Playwright?",
      "en": "When would an organization typically stick with Selenium instead of migrating to Playwright?",
      "ja": "組織がPlaywrightへの移行ではなくSeleniumを維持することが多いのはどんな場合ですか?"
    },
    "options": [
      {
        "vi": "Khi cần tốc độ thực thi test nhanh nhất có thể trên trình duyệt hiện đại",
        "en": "When maximum test execution speed on modern browsers is required",
        "ja": "モダンブラウザで最速のテスト実行速度が求められる場合"
      },
      {
        "vi": "Khi đã đầu tư lớn vào hệ thống automation Selenium lâu năm, nhiều ngôn ngữ/nền tảng khác nhau, và chi phí di trú cao hơn lợi ích ngắn hạn",
        "en": "When there is heavy long-standing investment in a Selenium automation system across multiple languages/platforms, and migration cost outweighs short-term benefit",
        "ja": "複数の言語・プラットフォームにまたがる長年のSelenium自動化システムに多大な投資をしており、移行コストが短期的利益を上回る場合"
      },
      {
        "vi": "Khi chỉ cần test trên một trình duyệt Chromium duy nhất",
        "en": "When only a single Chromium browser needs testing",
        "ja": "Chromiumブラウザ1種類のみをテストすればよい場合"
      },
      {
        "vi": "Khi cần API mock mạng tích hợp sẵn hiện đại",
        "en": "When a modern built-in network mocking API is needed",
        "ja": "モダンな組み込みネットワークモック機能が必要な場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với hệ thống automation Selenium quy mô lớn đã ổn định qua nhiều năm, chi phí và rủi ro di trú toàn bộ sang công cụ khác thường vượt lợi ích, nên nhiều tổ chức chọn duy trì Selenium, chỉ áp dụng Playwright cho dự án mới.",
      "en": "For large, stable Selenium automation systems built over years, the cost and risk of fully migrating to another tool often outweigh the benefit, so many organizations keep Selenium and adopt Playwright only for new projects.",
      "ja": "何年もかけて構築された大規模で安定したSelenium自動化システムでは、他ツールへの全面移行のコストとリスクが利益を上回ることが多く、多くの組織は既存はSeleniumを維持し、新規プロジェクトにのみPlaywrightを採用する。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao đội ngũ cần kiểm thử trên nhiều trình duyệt hiện đại với tốc độ nhanh và tích hợp CI đơn giản thường ưu tiên chọn Playwright?",
      "en": "Why do teams needing fast, modern cross-browser testing with simple CI integration typically favor Playwright?",
      "ja": "高速でモダンなクロスブラウザテストとシンプルなCI統合が必要なチームがPlaywrightを好む理由は何ですか?"
    },
    "options": [
      {
        "vi": "Vì Playwright không cần viết bất kỳ mã kiểm thử nào",
        "en": "Because Playwright requires writing no test code at all",
        "ja": "テストコードを一切書く必要がないから"
      },
      {
        "vi": "Vì Playwright là công cụ duy nhất chạy được trên CI",
        "en": "Because Playwright is the only tool that can run on CI",
        "ja": "CIで動作できる唯一のツールだから"
      },
      {
        "vi": "Vì Playwright kết hợp hỗ trợ đa engine, đa ngôn ngữ, tự động cài đặt browser, và test runner song song tích hợp trong một bộ công cụ nhất quán",
        "en": "Because Playwright combines multi-engine support, multi-language bindings, automatic browser installation, and a built-in parallel test runner in one cohesive toolset",
        "ja": "Playwrightはマルチエンジンサポート、多言語バインディング、自動ブラウザインストール、組み込みの並列テストランナーを一貫したツールセットとして兼ね備えているから"
      },
      {
        "vi": "Vì Playwright chỉ hoạt động khi không có CI",
        "en": "Because Playwright only works when there is no CI",
        "ja": "CIが存在しない場合にのみ動作するから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright gói gọn nhiều lợi thế kiến trúc — đa engine thật (Chromium/Firefox/WebKit), đa ngôn ngữ chính thức, tự quản lý binary trình duyệt, và cơ chế song song hóa built-in — giúp thiết lập CI nhanh mà không cần hạ tầng Grid riêng như Selenium.",
      "en": "Playwright bundles several architectural advantages — real multi-engine support (Chromium/Firefox/WebKit), official multi-language bindings, self-managed browser binaries, and built-in parallelization — enabling fast CI setup without needing separate Grid infrastructure like Selenium.",
      "ja": "Playwrightは複数のアーキテクチャ上の利点(Chromium/Firefox/WebKitの実エンジンサポート、公式多言語バインディング、自己管理型ブラウザバイナリ、組み込みの並列化)を兼ね備えており、Seleniumのような別途Gridインフラなしで迅速なCIセットアップが可能になる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cả Playwright và Cypress đều hỗ trợ tính năng gì mà Selenium không có khái niệm tương đương?",
      "en": "Both Playwright and Cypress support a capability that Selenium has no equivalent concept for. What is it?",
      "ja": "PlaywrightとCypressの両方がサポートし、Seleniumには対応する概念がない機能は何ですか?"
    },
    "options": [
      {
        "vi": "Click và nhập liệu vào form",
        "en": "Clicking and typing into form fields",
        "ja": "フォームへのクリックと入力"
      },
      {
        "vi": "Chụp ảnh màn hình khi test thất bại",
        "en": "Taking screenshots on test failure",
        "ja": "テスト失敗時のスクリーンショット撮影"
      },
      {
        "vi": "Điều hướng URL trong trình duyệt",
        "en": "Navigating URLs in the browser",
        "ja": "ブラウザでのURLナビゲーション"
      },
      {
        "vi": "Component testing — kiểm thử trực tiếp một component UI riêng lẻ mà không cần dựng toàn bộ ứng dụng",
        "en": "Component testing — testing an individual UI component directly without spinning up the full application",
        "ja": "コンポーネントテスト — アプリ全体を起動せずに個々のUIコンポーネントを直接テストする機能"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Component testing cho phép mount và test một component UI (React/Vue/Svelte...) độc lập, không cần chạy toàn bộ ứng dụng — cả Cypress Component Testing lẫn Playwright Component Testing đều hỗ trợ, trong khi Selenium chỉ vận hành ở cấp độ trình duyệt/trang hoàn chỉnh.",
      "en": "Component testing lets you mount and test a UI component (React/Vue/Svelte, etc.) in isolation without running the whole app — both Cypress Component Testing and Playwright Component Testing support this, while Selenium only operates at the full browser/page level.",
      "ja": "コンポーネントテストでは、アプリ全体を起動せずにUIコンポーネント(React/Vue/Svelteなど)を単独でマウントしてテストできる。Cypress Component TestingとPlaywright Component Testingの両方がこれをサポートするが、Seleniumはブラウザ・ページ全体のレベルでしか動作しない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So với Cypress trước đây, Playwright xử lý việc thao tác bên trong iframe (kể cả iframe lồng nhau) như thế nào?",
      "en": "Compared to older Cypress, how does Playwright handle interacting with content inside iframes (including nested ones)?",
      "ja": "従来のCypressと比較して、Playwrightはiframe内(ネストされたものを含む)の操作をどう扱いますか?"
    },
    "options": [
      {
        "vi": "Playwright cung cấp `frameLocator` giúp truy cập trực tiếp phần tử trong iframe (kể cả lồng nhau) một cách tự nhiên hơn so với hạn chế lịch sử của Cypress",
        "en": "Playwright provides `frameLocator`, giving natural, direct access to elements inside iframes (even nested) — easier than Cypress's historical limitations",
        "ja": "Playwrightは`frameLocator`を提供し、(ネストされたものも含め)iframe内の要素へ自然かつ直接アクセスできる。これはCypressの従来の制約より扱いやすい"
      },
      {
        "vi": "Playwright không hỗ trợ thao tác trong iframe",
        "en": "Playwright does not support interacting inside iframes",
        "ja": "Playwrightはiframe内の操作をサポートしない"
      },
      {
        "vi": "Cả hai công cụ đều không thể tương tác với iframe",
        "en": "Neither tool can interact with iframes",
        "ja": "どちらのツールもiframeとやり取りできない"
      },
      {
        "vi": "Playwright chỉ hỗ trợ iframe khi chạy ở chế độ headed",
        "en": "Playwright only supports iframes in headed mode",
        "ja": "Playwrightはヘッド付きモードでのみiframeをサポートする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "`frameLocator` của Playwright cho phép truy vấn phần tử bên trong iframe (kể cả iframe lồng nhau) tự nhiên như thao tác trên trang chính; Cypress trước đây từng gặp khó khăn đáng kể với iframe do kiến trúc chạy trong trình duyệt.",
      "en": "Playwright's `frameLocator` lets you query elements inside an iframe (even nested ones) as naturally as on the main page; older Cypress historically struggled significantly with iframes due to its in-browser architecture.",
      "ja": "Playwrightの`frameLocator`は、メインページと同様に自然な形でiframe内(ネストされたものを含む)の要素をクエリできる。従来のCypressはブラウザ内実行のアーキテクチャゆえにiframeの扱いに大きく苦労していた。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright cung cấp cơ chế nào chuyên biệt để xử lý sự kiện tải file (download) trong test, tiện lợi hơn so với cách làm truyền thống trong Selenium?",
      "en": "What dedicated mechanism does Playwright provide for handling file download events in tests, more convenient than the traditional Selenium approach?",
      "ja": "Playwrightがテストでファイルダウンロードイベントを処理するために提供する専用の仕組みは何で、従来のSeleniumのやり方より便利な点は何ですか?"
    },
    "options": [
      {
        "vi": "Playwright tự động mở file tải về bằng ứng dụng mặc định của hệ điều hành",
        "en": "Playwright automatically opens downloaded files with the OS's default application",
        "ja": "PlaywrightはダウンロードしたファイルをOSの既定アプリで自動的に開く"
      },
      {
        "vi": "Sự kiện `download` cho phép chờ và truy cập trực tiếp file đã tải mà không cần cấu hình thư mục tải xuống của trình duyệt qua driver",
        "en": "A `download` event that lets you await and directly access the downloaded file, without configuring the browser's download folder through the driver",
        "ja": "ドライバー経由でブラウザのダウンロードフォルダを設定することなく、待機してダウンロード済みファイルへ直接アクセスできる`download`イベント"
      },
      {
        "vi": "Playwright không hỗ trợ kiểm thử download file",
        "en": "Playwright does not support testing file downloads",
        "ja": "Playwrightはファイルダウンロードのテストをサポートしない"
      },
      {
        "vi": "Playwright yêu cầu cài plugin bên thứ ba để bắt sự kiện download",
        "en": "Playwright requires a third-party plugin to capture download events",
        "ja": "ダウンロードイベントを捕捉するには サードパーティ製プラグインが必要"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright cung cấp API `page.waitForEvent('download')` để bắt sự kiện tải file và thao tác trực tiếp với đối tượng download (đường dẫn, lưu file...) mà không cần thiết lập profile trình duyệt phức tạp như khi dùng Selenium.",
      "en": "Playwright's `page.waitForEvent('download')` API captures the download event and lets you work directly with the download object (path, save, etc.) without the complex browser profile setup often needed with Selenium.",
      "ja": "Playwrightの`page.waitForEvent('download')` APIはダウンロードイベントを捕捉し、Seleniumでしばしば必要となる複雑なブラウザプロファイル設定なしに、ダウンロードオブジェクト(パス、保存など)を直接扱える。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Selenium truyền thống cần công cụ bổ sung nào (như BrowserMob Proxy) để làm điều mà Playwright/Cypress hỗ trợ tích hợp sẵn qua API can thiệp mạng?",
      "en": "What additional tool did traditional Selenium need (like BrowserMob Proxy) to do what Playwright/Cypress support natively via network interception APIs?",
      "ja": "PlaywrightやCypressがネットワークインターセプトAPIで標準サポートすることを実現するために、従来のSeleniumが必要としていた追加ツール(BrowserMob Proxyなど)は何ですか?"
    },
    "options": [
      {
        "vi": "Một trình duyệt headless riêng biệt",
        "en": "A separate standalone headless browser",
        "ja": "独立したヘッドレスブラウザ"
      },
      {
        "vi": "Một trình quản lý cơ sở dữ liệu riêng",
        "en": "A separate database manager",
        "ja": "独立したデータベース管理ツール"
      },
      {
        "vi": "Một proxy trung gian để chặn và kiểm tra/sửa đổi lưu lượng mạng của trình duyệt",
        "en": "An intermediary proxy to intercept and inspect/modify the browser's network traffic",
        "ja": "ブラウザのネットワークトラフィックを傍受・検査・変更するための中間プロキシ"
      },
      {
        "vi": "Một trình biên dịch JavaScript riêng",
        "en": "A separate JavaScript compiler",
        "ja": "独立したJavaScriptコンパイラー"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì WebDriver không có API can thiệp mạng gốc, Selenium truyền thống phải dựa vào proxy trung gian như BrowserMob Proxy để ghi/sửa lưu lượng; Playwright và Cypress có API route/intercept tích hợp sẵn, đơn giản hơn nhiều.",
      "en": "Because WebDriver lacks a native network interception API, traditional Selenium had to rely on an intermediary proxy like BrowserMob Proxy to record/modify traffic; Playwright and Cypress have built-in route/intercept APIs, which are far simpler.",
      "ja": "WebDriverにはネイティブのネットワークインターセプトAPIがないため、従来のSeleniumはBrowserMob Proxyのような中間プロキシに頼ってトラフィックを記録・変更する必要があった。PlaywrightとCypressにはroute/interceptの組み込みAPIがあり、はるかにシンプルである。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi nói Playwright hỗ trợ WebKit thực sự chứ không phải giả lập, điều đó có nghĩa là gì và tại sao quan trọng?",
      "en": "When Playwright is said to support real WebKit rather than an emulation, what does that mean and why does it matter?",
      "ja": "Playwrightが「エミュレーションではなく本物のWebKitをサポートする」と言われるのはどういう意味で、なぜ重要ですか?"
    },
    "options": [
      {
        "vi": "WebKit trong Playwright chỉ dùng được cho test hiệu năng, không dùng cho test chức năng",
        "en": "WebKit in Playwright is only usable for performance tests, not functional tests",
        "ja": "Playwright内のWebKitはパフォーマンステスト専用で機能テストには使えない"
      },
      {
        "vi": "Playwright chỉ giả lập user agent của Safari trên nền Chromium",
        "en": "Playwright merely spoofs the Safari user agent on top of Chromium",
        "ja": "PlaywrightはChromium上でSafariのユーザーエージェントを偽装しているだけ"
      },
      {
        "vi": "Playwright yêu cầu máy Mac thật để giả lập WebKit",
        "en": "Playwright requires a real Mac machine to emulate WebKit",
        "ja": "WebKitをエミュレートするために実機Macが必要"
      },
      {
        "vi": "Playwright chạy chính engine WebKit (nền tảng Safari) nên phát hiện được các lỗi/khác biệt hành vi đặc trưng của Safari mà chạy Chrome không thể mô phỏng chính xác",
        "en": "Playwright runs the actual WebKit engine (the one behind Safari), catching Safari-specific bugs/behavior differences that running Chrome cannot accurately mimic",
        "ja": "PlaywrightはSafariの基盤である本物のWebKitエンジンを実行するため、Chromeでは正確に再現できないSafari特有のバグ・挙動差を検出できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhiều công cụ trước đây 'giả lập' Safari bằng cách đổi user agent trên Chromium, dẫn đến bỏ sót lỗi thực tế. Playwright build và chạy chính engine WebKit, cho kết quả phản ánh sát hành vi Safari thật, một lợi thế mà Cypress không có đầy đủ.",
      "en": "Many older tools 'emulated' Safari by spoofing the user agent on Chromium, missing real bugs. Playwright builds and runs the actual WebKit engine, giving results that closely reflect real Safari behavior — an advantage Cypress lacks in full.",
      "ja": "多くの旧来のツールはChromium上でユーザーエージェントを偽装して Safariを『エミュレート』しており、実際のバグを見逃していた。Playwrightは本物のWebKitエンジンをビルド・実行するため、実際のSafariの挙動を忠実に反映した結果が得られる。これはCypressが十分に持たない利点である。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Về khả năng test trên Safari/WebKit, Cypress có hạn chế gì đáng chú ý so với Playwright?",
      "en": "Regarding Safari/WebKit testing, what notable limitation does Cypress have compared to Playwright?",
      "ja": "Safari/WebKitテストに関して、Playwrightと比べてCypressにはどんな注目すべき制約がありますか?"
    },
    "options": [
      {
        "vi": "Cypress không hỗ trợ chính thức việc chạy test trên engine WebKit thực sự, hạn chế độ phủ Safari",
        "en": "Cypress does not officially support running tests on the real WebKit engine, limiting Safari coverage",
        "ja": "Cypressは本物のWebKitエンジンでのテスト実行を公式サポートしておらず、Safariカバレッジが限定される"
      },
      {
        "vi": "Cypress không thể chạy test trên Chrome",
        "en": "Cypress cannot run tests on Chrome",
        "ja": "CypressはChromeでテストを実行できない"
      },
      {
        "vi": "Cypress không có chế độ headless",
        "en": "Cypress has no headless mode",
        "ja": "Cypressにはヘッドレスモードがない"
      },
      {
        "vi": "Cypress không hỗ trợ ghi video test",
        "en": "Cypress does not support recording test videos",
        "ja": "Cypressはテスト動画の録画をサポートしない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cypress tập trung mạnh vào các trình duyệt Chromium (và có hỗ trợ Firefox), nhưng không có hỗ trợ chính thức, đầy đủ cho engine WebKit thật, khiến độ phủ kiểm thử Safari kém tin cậy hơn so với Playwright.",
      "en": "Cypress focuses heavily on Chromium browsers (with some Firefox support) but lacks full, official support for the real WebKit engine, making Safari test coverage less reliable than with Playwright.",
      "ja": "CypressはChromium系ブラウザ(および一部Firefox)に強く注力しているが、本物のWebKitエンジンに対する公式かつ完全なサポートを欠いており、SafariのテストカバレッジはPlaywrightに比べて信頼性が劣る。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Về mô hình lập trình API, sự khác biệt điển hình giữa Playwright và Selenium (client cổ điển) là gì?",
      "en": "In terms of API programming model, what is a typical difference between Playwright and classic Selenium clients?",
      "ja": "APIのプログラミングモデルという点で、Playwrightと従来型Seleniumクライアントの典型的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Selenium là API bất đồng bộ còn Playwright là đồng bộ hoàn toàn",
        "en": "Selenium is asynchronous while Playwright is fully synchronous",
        "ja": "Seleniumが非同期でPlaywrightが完全に同期的である"
      },
      {
        "vi": "Playwright được thiết kế API bất đồng bộ (Promise/async-await) ngay từ đầu, còn nhiều client Selenium truyền thống dùng lời gọi đồng bộ, chặn luồng",
        "en": "Playwright is designed as an asynchronous (Promise/async-await) API from the ground up, while many traditional Selenium clients use synchronous, blocking calls",
        "ja": "Playwrightは最初から非同期(Promise/async-await)APIとして設計されているが、従来の多くのSeleniumクライアントは同期的でブロッキングな呼び出しを使う"
      },
      {
        "vi": "Cả hai đều không hỗ trợ bất đồng bộ dưới bất kỳ hình thức nào",
        "en": "Neither supports asynchronous execution in any form",
        "ja": "どちらもいかなる形でも非同期実行をサポートしない"
      },
      {
        "vi": "Sự khác biệt này không tồn tại, cả hai giống hệt nhau về mô hình lập trình",
        "en": "This difference doesn't exist; both share an identical programming model",
        "ja": "この違いは存在せず、両者のプログラミングモデルは全く同一である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright (đặc biệt bản JS/TS) xây dựng quanh Promise và async/await tự nhiên, phù hợp với các thao tác I/O bất đồng bộ của trình duyệt; nhiều client Selenium cổ điển (ví dụ Java) theo mô hình gọi hàm chặn tuần tự truyền thống hơn.",
      "en": "Playwright (especially its JS/TS flavor) is built natively around Promises and async/await, fitting the async, I/O-heavy nature of browser automation; many classic Selenium clients (e.g. Java) follow a more traditional blocking, sequential call model.",
      "ja": "Playwright(特にJS/TS版)はPromiseとasync/awaitを中心に自然に構築されており、ブラウザ自動化の非同期・I/O主体な性質に適している。多くの従来型Seleniumクライアント(例:Java)はよりブロッキングで逐次的な呼び出しモデルに従う。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Selenium 4 đã có bước tiến nào giúp thu hẹp khoảng cách kiến trúc với Playwright?",
      "en": "What advancement did Selenium 4 introduce that narrowed the architectural gap with Playwright?",
      "ja": "Selenium 4はPlaywrightとのアーキテクチャ上のギャップを縮めるためにどんな進歩を導入しましたか?"
    },
    "options": [
      {
        "vi": "Selenium 4 chuyển hoàn toàn sang chạy trong trình duyệt như Cypress",
        "en": "Selenium 4 fully switched to running inside the browser like Cypress",
        "ja": "Selenium 4はCypressのようにブラウザ内で完全に動作するよう切り替わった"
      },
      {
        "vi": "Selenium 4 loại bỏ hoàn toàn giao thức WebDriver",
        "en": "Selenium 4 completely removed the WebDriver protocol",
        "ja": "Selenium 4はWebDriverプロトコルを完全に廃止した"
      },
      {
        "vi": "Selenium 4 bổ sung khả năng truy cập một phần Chrome DevTools Protocol (CDP) bên cạnh giao thức WebDriver truyền thống",
        "en": "Selenium 4 added partial access to the Chrome DevTools Protocol (CDP) alongside the traditional WebDriver protocol",
        "ja": "Selenium 4は従来のWebDriverプロトコルに加え、Chrome DevTools Protocol(CDP)への部分的なアクセスを追加した"
      },
      {
        "vi": "Selenium 4 không còn hỗ trợ Chrome",
        "en": "Selenium 4 no longer supports Chrome",
        "ja": "Selenium 4はChromeのサポートを廃止した"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Selenium 4 cho phép truy cập một số tính năng CDP (như can thiệp mạng, log console) song song với WebDriver, thu hẹp phần nào khoảng cách năng lực với Playwright dù kiến trúc lõi vẫn dựa trên chuẩn WebDriver.",
      "en": "Selenium 4 allows access to some CDP features (like network interception, console logs) alongside WebDriver, partially closing the capability gap with Playwright even though its core architecture still relies on the WebDriver standard.",
      "ja": "Selenium 4はWebDriverと並行して一部のCDP機能(ネットワークインターセプト、コンソールログなど)へのアクセスを可能にし、コアアーキテクチャは依然としてWebDriver標準に依拠しているものの、Playwrightとの機能面でのギャップを部分的に縮めた。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao chi phí bảo trì bộ test tự động của Selenium thường được xem là cao hơn Playwright/Cypress trong dài hạn?",
      "en": "Why is Selenium's test suite maintenance cost typically considered higher than Playwright/Cypress in the long run?",
      "ja": "なぜSeleniumのテストスイート保守コストは長期的にPlaywright/Cypressより高いとみなされることが多いのですか?"
    },
    "options": [
      {
        "vi": "Vì Selenium không thể chạy trên CI",
        "en": "Because Selenium cannot run on CI",
        "ja": "SeleniumがCIで実行できないから"
      },
      {
        "vi": "Vì Selenium chỉ chạy được một test tại một thời điểm trên toàn hệ thống",
        "en": "Because Selenium can only run one test at a time system-wide",
        "ja": "Seleniumはシステム全体で一度に1つのテストしか実行できないから"
      },
      {
        "vi": "Vì Selenium tính phí bản quyền theo số lượng test",
        "en": "Because Selenium charges licensing fees per test",
        "ja": "Seleniumがテスト数に応じたライセンス料を課すから"
      },
      {
        "vi": "Vì thiếu cơ chế chờ và ổn định hoá tích hợp sẵn mạnh mẽ như Playwright/Cypress, đội ngũ thường phải tự viết nhiều lớp helper để xử lý sự không ổn định của UI",
        "en": "Because it lacks the strong built-in waiting/stability mechanisms of Playwright/Cypress, teams often must hand-write many helper layers to handle UI flakiness",
        "ja": "Playwright/Cypressのような強力な組み込み待機・安定化機構がないため、UIの不安定さに対処する多くのヘルパー層を自前で書く必要があることが多いから"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Do thiếu các cơ chế chờ/ổn định hoá tích hợp mạnh mẽ như Playwright hay Cypress, các dự án Selenium thường phải tự xây dựng nhiều tiện ích wait/retry, làm tăng khối lượng code bảo trì và rủi ro test không ổn định theo thời gian.",
      "en": "Lacking the strong built-in waiting/stabilization mechanisms of Playwright or Cypress, Selenium projects often need to build many custom wait/retry utilities themselves, increasing maintenance code and long-term flakiness risk.",
      "ja": "PlaywrightやCypressのような強力な組み込み待機・安定化機構を欠くため、Seleniumプロジェクトはしばしば独自のwait/retryユーティリティを多数構築する必要があり、保守コードが増え長期的な不安定性のリスクが高まる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi cần automation cho ứng dụng mobile native (không phải web di động), lựa chọn nào thường được kết hợp với Selenium mà Playwright chưa hỗ trợ trực tiếp?",
      "en": "When automating native mobile apps (not mobile web), what option is typically paired with Selenium that Playwright doesn't directly support?",
      "ja": "(モバイルウェブではなく)ネイティブモバイルアプリの自動化が必要な場合、Playwrightが直接サポートしない、Seleniumと組み合わされることが多い選択肢は何ですか?"
    },
    "options": [
      {
        "vi": "Appium, dựa trên giao thức tương thích WebDriver để điều khiển ứng dụng native trên iOS/Android",
        "en": "Appium, built on a WebDriver-compatible protocol to control native apps on iOS/Android",
        "ja": "iOS/Android上のネイティブアプリを制御する、WebDriver互換プロトコルに基づくAppium"
      },
      {
        "vi": "Cypress Studio",
        "en": "Cypress Studio",
        "ja": "Cypress Studio"
      },
      {
        "vi": "Trace Viewer",
        "en": "Trace Viewer",
        "ja": "Trace Viewer"
      },
      {
        "vi": "Playwright Inspector",
        "en": "Playwright Inspector",
        "ja": "Playwright Inspector"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Appium mở rộng ý tưởng của giao thức WebDriver sang tự động hoá ứng dụng mobile native, tận dụng hệ sinh thái quen thuộc với người dùng Selenium; Playwright hiện tập trung vào trình duyệt/web, chưa có giải pháp native app tương đương chính thức.",
      "en": "Appium extends the WebDriver protocol concept to native mobile app automation, leveraging an ecosystem familiar to Selenium users; Playwright currently focuses on browsers/web and has no equivalent official native-app solution.",
      "ja": "AppiumはWebDriverプロトコルの概念をネイティブモバイルアプリ自動化に拡張し、Seleniumユーザーに馴染みのあるエコシステムを活用する。Playwrightは現在ブラウザ・ウェブに焦点を当てており、同等の公式ネイティブアプリソリューションは存在しない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright Codegen (công cụ ghi lại thao tác và sinh mã) có vai trò tương tự công cụ nào phía Selenium?",
      "en": "Playwright Codegen (a tool that records actions and generates code) plays a role similar to which tool on the Selenium side?",
      "ja": "操作を記録してコードを生成するPlaywright Codegenは、Selenium側のどのツールと似た役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Selenium Grid",
        "en": "Selenium Grid",
        "ja": "Selenium Grid"
      },
      {
        "vi": "Selenium IDE, công cụ ghi lại thao tác trình duyệt và xuất ra kịch bản kiểm thử",
        "en": "Selenium IDE, a tool that records browser interactions and exports them as test scripts",
        "ja": "ブラウザ操作を記録しテストスクリプトとして出力するSelenium IDE"
      },
      {
        "vi": "BrowserMob Proxy",
        "en": "BrowserMob Proxy",
        "ja": "BrowserMob Proxy"
      },
      {
        "vi": "WebDriverWait",
        "en": "WebDriverWait",
        "ja": "WebDriverWait"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cả Playwright Codegen và Selenium IDE đều ghi lại tương tác của người dùng trên trình duyệt rồi sinh ra mã kiểm thử tương ứng, giúp người mới bắt đầu nhanh, dù chất lượng mã sinh ra thường cần chỉnh sửa thêm để dùng lâu dài.",
      "en": "Both Playwright Codegen and Selenium IDE record user interactions in the browser and generate corresponding test code, helping beginners get started quickly, though the generated code usually needs refinement for long-term use.",
      "ja": "Playwright CodegenとSelenium IDEはどちらもブラウザ上のユーザー操作を記録し、対応するテストコードを生成することで初心者が素早く始められるようにする。ただし生成されたコードは長期利用のために通常さらなる調整が必要になる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Về khía cạnh giấy phép và chi phí phần mềm, nhận định nào ĐÚNG khi so sánh Playwright, Selenium và Cypress (bản open-source)?",
      "en": "Regarding licensing/software cost, which statement is TRUE when comparing Playwright, Selenium, and Cypress (open-source edition)?",
      "ja": "ライセンスとソフトウェアコストの観点で、Playwright、Selenium、Cypress(オープンソース版)を比較したとき正しい記述はどれですか?"
    },
    "options": [
      {
        "vi": "Playwright yêu cầu mua license doanh nghiệp để chạy trên CI",
        "en": "Playwright requires an enterprise license to run on CI",
        "ja": "PlaywrightはCIで実行するために企業向けライセンスが必要"
      },
      {
        "vi": "Selenium là công cụ trả phí duy nhất trong ba công cụ",
        "en": "Selenium is the only paid tool among the three",
        "ja": "3つの中でSeleniumだけが有料ツールである"
      },
      {
        "vi": "Cả ba đều là mã nguồn mở, miễn phí sử dụng ở lõi công cụ — yếu tố quyết định lựa chọn thường không phải chi phí bản quyền mà là năng lực kiến trúc, hệ sinh thái và phù hợp với đội ngũ",
        "en": "All three are open-source and free at their core — the deciding factor is usually not licensing cost but architectural capability, ecosystem, and team fit",
        "ja": "3つともコア部分はオープンソースで無料利用可能であり、選定を左右するのは通常ライセンス費用ではなくアーキテクチャの能力・エコシステム・チームとの相性である"
      },
      {
        "vi": "Cypress core hoàn toàn trả phí, không có bản miễn phí",
        "en": "Cypress core is entirely paid with no free tier",
        "ja": "Cypressのコアは完全有料で無料版は存在しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Selenium, Playwright và bản lõi (open-source) của Cypress đều miễn phí và mã nguồn mở; sự khác biệt trong lựa chọn công cụ chủ yếu nằm ở kiến trúc, độ phủ trình duyệt, trải nghiệm phát triển và hệ sinh thái, không phải chi phí giấy phép.",
      "en": "Selenium, Playwright, and Cypress's core (open-source) edition are all free and open source; the deciding factors for tool choice mostly lie in architecture, browser coverage, developer experience, and ecosystem — not licensing cost.",
      "ja": "Selenium、Playwright、そしてCypressのコア(オープンソース)版はすべて無料でオープンソースである。ツール選定を左右する要因は主にアーキテクチャ、ブラウザカバレッジ、開発者体験、エコシステムであり、ライセンス費用ではない。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cypress Dashboard (dịch vụ trả phí) cung cấp tính năng gì mà khi dùng Playwright, đội ngũ thường phải tự lắp ráp qua CI/reporter riêng?",
      "en": "What does the paid Cypress Dashboard service offer that, when using Playwright, teams typically must assemble themselves via CI/custom reporters?",
      "ja": "有料サービスであるCypress Dashboardが提供する機能のうち、Playwrightを使う場合はチームが自前でCI/カスタムレポーターを組み立てて実現することが多いものは何ですか?"
    },
    "options": [
      {
        "vi": "Chạy test trên trình duyệt Internet Explorer",
        "en": "Running tests on Internet Explorer",
        "ja": "Internet Explorerでのテスト実行"
      },
      {
        "vi": "Tự động sửa lỗi code ứng dụng",
        "en": "Automatically fixing application code bugs",
        "ja": "アプリケーションコードのバグを自動修正する機能"
      },
      {
        "vi": "Khả năng viết test bằng Python",
        "en": "The ability to write tests in Python",
        "ja": "Pythonでのテスト記述機能"
      },
      {
        "vi": "Tổng hợp kết quả test, phân tải song song thông minh và báo cáo tập trung trên nền tảng đám mây có sẵn",
        "en": "Aggregated test results, smart parallel load-balancing, and centralized reporting on a ready-made cloud platform",
        "ja": "テスト結果の集約、スマートな並列負荷分散、既製のクラウドプラットフォーム上での一元的なレポート"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cypress Dashboard là dịch vụ đám mây trả phí cung cấp sẵn tổng hợp kết quả, cân bằng tải song song thông minh giữa các máy CI và báo cáo tập trung; với Playwright, các đội thường tự cấu hình reporter, lưu trữ artifact và công cụ CI/CD để đạt hiệu quả tương đương.",
      "en": "Cypress Dashboard is a paid cloud service offering out-of-the-box result aggregation, smart parallel load balancing across CI machines, and centralized reporting; with Playwright, teams usually configure their own reporters, artifact storage, and CI/CD tooling to achieve a similar effect.",
      "ja": "Cypress Dashboardは、結果の集約、CIマシン間でのスマートな並列負荷分散、一元的なレポートを標準で提供する有料クラウドサービスである。Playwrightではチームが通常、同様の効果を得るために独自のレポーター、成果物ストレージ、CI/CDツールを構成する必要がある。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright Trace Viewer và Cypress đều hỗ trợ ghi video/ảnh chụp khi test thất bại, nhưng điểm khác biệt kiến trúc nào khiến Playwright có thể tái hiện lại toàn bộ dòng thời gian DOM+network+console sau khi test đã chạy xong ở môi trường CI?",
      "en": "Both Playwright's Trace Viewer and Cypress support recording video/screenshots on failure, but what architectural difference lets Playwright fully replay the DOM+network+console timeline after a test has finished running in a CI environment?",
      "ja": "Playwright Trace ViewerとCypressはどちらも失敗時の動画・スクリーンショット記録をサポートするが、CI環境でテスト実行完了後にDOM+ネットワーク+コンソールのタイムライン全体を再生できるPlaywrightのアーキテクチャ上の違いは何ですか?"
    },
    "options": [
      {
        "vi": "Playwright ghi lại trace dưới dạng file zip chứa snapshot DOM theo từng bước, log mạng và console, có thể mở lại độc lập bằng Trace Viewer sau khi CI kết thúc mà không cần trình duyệt gốc",
        "en": "Playwright records a trace as a zip file containing step-by-step DOM snapshots, network logs, and console logs, which can be reopened independently in Trace Viewer after CI finishes, without the original browser",
        "ja": "Playwrightはステップごとのdomスナップショット・ネットワークログ・コンソールログを含むzipファイルとしてトレースを記録し、CI終了後に元のブラウザなしでTrace Viewerで独立して開き直せる"
      },
      {
        "vi": "Playwright gửi trace trực tiếp lên máy chủ Microsoft để xử lý",
        "en": "Playwright sends the trace directly to Microsoft's servers for processing",
        "ja": "PlaywrightはトレースをMicrosoftのサーバーに直接送信して処理する"
      },
      {
        "vi": "Playwright chỉ ghi lại ảnh chụp cuối cùng, không có dòng thời gian",
        "en": "Playwright only captures a final screenshot, with no timeline",
        "ja": "Playwrightは最終スクリーンショットのみを記録し、タイムラインはない"
      },
      {
        "vi": "Playwright yêu cầu trình duyệt vẫn mở để xem lại trace",
        "en": "Playwright requires the browser to remain open to view the trace",
        "ja": "トレースを閲覧するにはブラウザを開いたままにしておく必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trace của Playwright là một file zip tự chứa gồm snapshot DOM từng bước, log mạng, console và ảnh chụp, cho phép mở lại toàn bộ dòng thời gian bằng Trace Viewer trên máy bất kỳ sau khi CI đã kết thúc, không phụ thuộc trình duyệt gốc còn chạy hay không.",
      "en": "A Playwright trace is a self-contained zip file with step-by-step DOM snapshots, network logs, console logs, and screenshots, allowing the full timeline to be replayed in Trace Viewer on any machine after CI finishes, independent of whether the original browser is still running.",
      "ja": "Playwrightのトレースは、ステップごとのDOMスナップショット、ネットワークログ、コンソールログ、スクリーンショットを含む自己完結型のzipファイルであり、元のブラウザが実行中かどうかに関わらず、CI終了後に任意のマシンでTrace Viewerを使って全タイムラインを再生できる。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính `forbidOnly` trong playwright.config.js có tác dụng gì khi chạy trên CI?",
      "en": "What does the `forbidOnly` option in playwright.config.js do when running on CI?",
      "ja": "playwright.config.js の `forbidOnly` オプションは CI 実行時にどのような役割を果たしますか?"
    },
    "options": [
      {
        "vi": "Tự động tăng số lần retry cho mọi test",
        "en": "Automatically increases the retry count for every test",
        "ja": "すべてのテストのリトライ回数を自動的に増やす"
      },
      {
        "vi": "Khiến build fail nếu code còn sót `test.only`, tránh vô tình chỉ chạy một phần test",
        "en": "Fails the build if `test.only` is left in the code, preventing an accidental partial test run",
        "ja": "コードに `test.only` が残っていた場合にビルドを失敗させ、意図せず一部のテストだけ実行されるのを防ぐ"
      },
      {
        "vi": "Chặn không cho chạy test song song",
        "en": "Blocks parallel test execution",
        "ja": "テストの並列実行を禁止する"
      },
      {
        "vi": "Tự động bỏ qua các test bị đánh dấu `skip`",
        "en": "Automatically skips tests marked with `skip`",
        "ja": "`skip` が付いたテストを自動的に飛ばす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "`forbidOnly: !!process.env.CI` giúp pipeline fail sớm nếu có `test.only` sót lại, tránh trường hợp CI chỉ chạy một phần rất nhỏ của bộ test mà tưởng là chạy đầy đủ.",
      "en": "`forbidOnly: !!process.env.CI` makes the pipeline fail fast if a stray `test.only` remains, preventing CI from silently running only a tiny subset while appearing to run the full suite.",
      "ja": "`forbidOnly: !!process.env.CI` を設定すると、`test.only` が残っている場合に早期にパイプラインを失敗させ、CIが一部のテストしか実行していないのに全体を実行したかのように見えるのを防げます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cờ `--shard=2/4` khi chạy `npx playwright test` có ý nghĩa gì?",
      "en": "What does the flag `--shard=2/4` mean when running `npx playwright test`?",
      "ja": "`npx playwright test` 実行時の `--shard=2/4` フラグは何を意味しますか?"
    },
    "options": [
      {
        "vi": "Giới hạn thời gian chạy tối đa 2 phút trên 4 CPU",
        "en": "Limit the max run time to 2 minutes using 4 CPUs",
        "ja": "4つのCPUを使って最大実行時間を2分に制限する"
      },
      {
        "vi": "Retry mỗi test 2 lần trên 4 worker",
        "en": "Retry each test 2 times across 4 workers",
        "ja": "4つのワーカーでそれぞれのテストを2回リトライする"
      },
      {
        "vi": "Chạy phần thứ 2 trong tổng số 4 phần được chia đều từ toàn bộ test suite",
        "en": "Run the 2nd chunk out of 4 evenly divided chunks of the total test suite",
        "ja": "テストスイート全体を4分割したうちの2番目のチャンクを実行する"
      },
      {
        "vi": "Chạy song song 2 trình duyệt trong 4 project",
        "en": "Run 2 browsers in parallel out of 4 configured projects",
        "ja": "設定された4つのプロジェクトのうち2つのブラウザを並列実行する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Sharding chia test suite thành nhiều phần độc lập để chạy song song trên nhiều máy CI, `--shard=2/4` nghĩa là job này chạy phần thứ 2 trong 4 phần.",
      "en": "Sharding splits the suite into independent chunks to run across multiple CI machines; `--shard=2/4` means this job runs the 2nd chunk out of 4.",
      "ja": "シャーディングはテストスイートを独立したチャンクに分割し複数のCIマシンで並列実行するための仕組みで、`--shard=2/4` はこのジョブが4分割中の2番目を実行することを意味します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy test theo shard trên nhiều job CI, reporter `blob` được dùng để làm gì?",
      "en": "When running sharded tests across multiple CI jobs, what is the `blob` reporter used for?",
      "ja": "複数のCIジョブでシャーディングされたテストを実行する際、`blob` レポーターは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Tự động retry các test flaky trên shard khác",
        "en": "Automatically retries flaky tests on a different shard",
        "ja": "フレーキーなテストを別のシャードで自動的にリトライする"
      },
      {
        "vi": "Nén video và screenshot để giảm dung lượng lưu trữ",
        "en": "Compresses videos and screenshots to reduce storage size",
        "ja": "動画とスクリーンショットを圧縮してストレージ容量を削減する"
      },
      {
        "vi": "Gửi thông báo qua Slack khi test fail",
        "en": "Sends a Slack notification when a test fails",
        "ja": "テストが失敗したときにSlack通知を送る"
      },
      {
        "vi": "Sinh ra file báo cáo trung gian của mỗi shard để sau đó gộp lại bằng lệnh `playwright merge-reports`",
        "en": "Produces an intermediate report file per shard that can later be combined via `playwright merge-reports`",
        "ja": "各シャードの中間レポートファイルを生成し、後で `playwright merge-reports` コマンドでまとめられるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi shard chạy độc lập nên không thể trực tiếp tạo một report HTML thống nhất; reporter `blob` xuất dữ liệu trung gian, sau đó `npx playwright merge-reports` gộp tất cả blob lại thành một report HTML duy nhất.",
      "en": "Since each shard runs independently, a unified HTML report can't be produced directly; the `blob` reporter outputs intermediate data that `npx playwright merge-reports` later merges into a single HTML report.",
      "ja": "各シャードは独立して実行されるため直接統一されたHTMLレポートを作れません。`blob` レポーターは中間データを出力し、後で `npx playwright merge-reports` によって1つのHTMLレポートに統合されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Image Docker chính thức `mcr.microsoft.com/playwright:v1.4x-jammy` mang lại lợi ích gì cho CI?",
      "en": "What benefit does the official `mcr.microsoft.com/playwright:v1.4x-jammy` Docker image bring to CI?",
      "ja": "公式の `mcr.microsoft.com/playwright:v1.4x-jammy` Dockerイメージは CI にどのような利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Đã cài sẵn Node.js, các trình duyệt và mọi thư viện hệ thống cần thiết, tránh lỗi thiếu dependency khi chạy trên Linux runner",
        "en": "Comes with Node.js, browsers and all required system libraries preinstalled, avoiding missing-dependency errors on Linux runners",
        "ja": "Node.js、ブラウザ、必要なシステムライブラリがすべてプリインストールされており、Linuxランナーでの依存関係不足エラーを回避できる"
      },
      {
        "vi": "Tự động tăng tốc độ mạng khi tải trang test",
        "en": "Automatically speeds up network requests when loading test pages",
        "ja": "テストページ読み込み時のネットワーク速度を自動的に向上させる"
      },
      {
        "vi": "Tự sinh dữ liệu test giả (mock data) cho API",
        "en": "Automatically generates mock data for API tests",
        "ja": "APIテスト用のモックデータを自動生成する"
      },
      {
        "vi": "Bắt buộc chạy test ở chế độ headed",
        "en": "Forces tests to run in headed mode",
        "ja": "テストをheadedモードで強制的に実行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Image chính thức đóng gói sẵn các thư viện hệ thống (font, codec...) mà Chromium/Firefox/WebKit cần, giúp tránh phải chạy `--with-deps` hay tự cài thủ công trên mỗi lần build.",
      "en": "The official image bundles the system libraries (fonts, codecs, etc.) that Chromium/Firefox/WebKit need, avoiding manual `--with-deps` installs on every build.",
      "ja": "公式イメージには Chromium/Firefox/WebKit が必要とするシステムライブラリ(フォント、コーデックなど)が同梱されており、毎回のビルドで `--with-deps` を手動実行する必要がなくなります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Biến môi trường `CI=true` ảnh hưởng thế nào đến hành vi mặc định của Playwright?",
      "en": "How does the `CI=true` environment variable affect Playwright's default behavior?",
      "ja": "環境変数 `CI=true` は Playwright のデフォルト動作にどのような影響を与えますか?"
    },
    "options": [
      {
        "vi": "Tự động chuyển sang chạy trên trình duyệt Firefox thay vì Chromium",
        "en": "Automatically switches to running on Firefox instead of Chromium",
        "ja": "Chromium の代わりに自動的に Firefox で実行するようになる"
      },
      {
        "vi": "Playwright tự nhận diện để áp dụng các giá trị mặc định phù hợp cho CI như `forbidOnly` và số `retries` cấu hình theo điều kiện `process.env.CI`",
        "en": "Playwright detects it to apply CI-appropriate defaults such as `forbidOnly` and `retries` configured conditionally on `process.env.CI`",
        "ja": "Playwright はこれを検知し、`process.env.CI` に応じて設定される `forbidOnly` や `retries` などCIに適した既定値を適用する"
      },
      {
        "vi": "Bỏ qua toàn bộ assertion trong test",
        "en": "Skips all assertions in the test",
        "ja": "テスト内のすべてのアサーションをスキップする"
      },
      {
        "vi": "Tự động tăng độ phân giải màn hình khi chụp screenshot",
        "en": "Automatically increases screen resolution when taking screenshots",
        "ja": "スクリーンショット撮影時に自動的に画面解像度を上げる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cấu hình mẫu của Playwright thường viết `retries: process.env.CI ? 2 : 0` và `forbidOnly: !!process.env.CI`, tận dụng biến `CI` mà hầu hết nền tảng CI tự set để điều chỉnh hành vi phù hợp môi trường.",
      "en": "Playwright's sample config typically writes `retries: process.env.CI ? 2 : 0` and `forbidOnly: !!process.env.CI`, leveraging the `CI` variable that most CI platforms set automatically to tailor behavior.",
      "ja": "Playwright のサンプル設定では通常 `retries: process.env.CI ? 2 : 0` や `forbidOnly: !!process.env.CI` のように記述し、ほとんどのCIプラットフォームが自動的に設定する `CI` 変数を利用して環境に応じた挙動にします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong GitHub Actions, cách hiệu quả để cache trình duyệt Playwright giữa các lần chạy workflow là gì?",
      "en": "In GitHub Actions, what is an effective way to cache Playwright browsers between workflow runs?",
      "ja": "GitHub Actions において、ワークフロー実行間で Playwright のブラウザをキャッシュする効果的な方法は何ですか?"
    },
    "options": [
      {
        "vi": "Chạy `npm install` hai lần liên tiếp",
        "en": "Run `npm install` twice in a row",
        "ja": "`npm install` を連続で2回実行する"
      },
      {
        "vi": "Không cần cache vì GitHub Actions tự lưu trình duyệt vĩnh viễn",
        "en": "No caching is needed because GitHub Actions permanently stores browsers by default",
        "ja": "GitHub Actions はデフォルトでブラウザを永続的に保存するためキャッシュは不要"
      },
      {
        "vi": "Dùng `actions/cache` với key dựa theo phiên bản Playwright, trỏ tới thư mục cache browser (ví dụ `~/.cache/ms-playwright`)",
        "en": "Use `actions/cache` keyed on the Playwright version, pointing at the browser cache directory (e.g. `~/.cache/ms-playwright`)",
        "ja": "Playwright のバージョンをキーにした `actions/cache` を使い、ブラウザキャッシュディレクトリ(例: `~/.cache/ms-playwright`)を対象にする"
      },
      {
        "vi": "Cache trực tiếp thư mục `node_modules/.bin`",
        "en": "Cache the `node_modules/.bin` directory directly",
        "ja": "`node_modules/.bin` ディレクトリを直接キャッシュする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trình duyệt tải bởi Playwright nằm ở thư mục cache riêng ngoài `node_modules`, nên cần cache thư mục đó (kèm key theo version) để tránh tải lại toàn bộ browser mỗi lần chạy workflow.",
      "en": "Playwright-downloaded browsers live in a separate cache directory outside `node_modules`, so that directory (keyed by version) needs caching to avoid re-downloading browsers on every workflow run.",
      "ja": "Playwright がダウンロードするブラウザは `node_modules` とは別のキャッシュディレクトリに保存されるため、そのディレクトリをバージョンをキーにしてキャッシュしないと、ワークフロー実行のたびにブラウザを再ダウンロードすることになります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lệnh `npx playwright install --with-deps` khác gì so với `npx playwright install` thông thường?",
      "en": "How does `npx playwright install --with-deps` differ from a plain `npx playwright install`?",
      "ja": "`npx playwright install --with-deps` は通常の `npx playwright install` とどう違いますか?"
    },
    "options": [
      {
        "vi": "Chỉ cài trình duyệt Chromium, bỏ qua Firefox và WebKit",
        "en": "Installs only Chromium, skipping Firefox and WebKit",
        "ja": "Chromium のみをインストールし、Firefox と WebKit はスキップする"
      },
      {
        "vi": "Cài thêm phiên bản Node.js mới nhất",
        "en": "Also installs the latest Node.js version",
        "ja": "最新の Node.js も追加でインストールする"
      },
      {
        "vi": "Bỏ qua bước tải trình duyệt để tăng tốc CI",
        "en": "Skips downloading browsers to speed up CI",
        "ja": "CIを高速化するためブラウザのダウンロードをスキップする"
      },
      {
        "vi": "Cài thêm các gói thư viện hệ thống (system dependencies) mà trình duyệt cần, thường dùng trên Linux CI runner sạch",
        "en": "Also installs the system-level OS packages the browsers require, typically used on a fresh Linux CI runner",
        "ja": "ブラウザが必要とするシステムレベルのOSパッケージも追加でインストールし、通常はクリーンなLinux CIランナーで使われる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trên runner Linux mặc định thường thiếu các thư viện hệ thống (font, codec, thư viện đồ họa) mà trình duyệt cần; `--with-deps` gọi `apt-get` để cài bổ sung các gói này.",
      "en": "A default Linux runner often lacks the system libraries (fonts, codecs, graphics libs) browsers need; `--with-deps` invokes `apt-get` to install those extra packages.",
      "ja": "デフォルトのLinuxランナーにはブラウザが必要とするシステムライブラリ(フォント、コーデック、グラフィックライブラリ)が不足していることが多く、`--with-deps` は `apt-get` を呼び出してこれらの追加パッケージをインストールします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao nhiều pipeline CI cấu hình `workers: 1` hoặc số worker thấp thay vì để mặc định như máy dev?",
      "en": "Why do many CI pipelines set `workers: 1` or a low worker count instead of leaving the local-machine default?",
      "ja": "多くのCIパイプラインでは、ローカルマシンのデフォルトのままにせず `workers: 1` や少ない数のワーカーを設定するのはなぜですか?"
    },
    "options": [
      {
        "vi": "Runner CI thường có ít CPU/RAM hơn máy dev, chạy quá nhiều worker song song dễ gây timeout hoặc test không ổn định",
        "en": "CI runners typically have fewer CPU/RAM resources than dev machines, so too many parallel workers can cause timeouts or flaky results",
        "ja": "CIランナーは開発マシンよりCPU/RAMが少ないことが多く、並列ワーカーが多すぎるとタイムアウトやテストの不安定化を招きやすい"
      },
      {
        "vi": "Playwright không hỗ trợ chạy đa worker trên Linux",
        "en": "Playwright doesn't support multiple workers on Linux",
        "ja": "Playwright は Linux で複数ワーカーをサポートしていないため"
      },
      {
        "vi": "Chạy 1 worker giúp tự động tạo báo cáo HTML đẹp hơn",
        "en": "Running 1 worker automatically produces a nicer HTML report",
        "ja": "ワーカーを1にするとHTMLレポートが自動的にきれいになるため"
      },
      {
        "vi": "Giấy phép Playwright giới hạn số worker theo gói miễn phí",
        "en": "Playwright's license restricts worker count on the free tier",
        "ja": "Playwright のライセンスが無料版でワーカー数を制限しているため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tài nguyên hạn chế trên shared runner khiến chạy song song quá nhiều worker gây tranh chấp CPU, dẫn tới test chậm/flaky; giảm số worker hoặc dựa vào sharding để chia tải hợp lý hơn.",
      "en": "Limited resources on shared runners mean too many parallel workers cause CPU contention, leading to slow or flaky tests; reducing worker count or relying on sharding distributes load more sensibly.",
      "ja": "共有ランナーではリソースが限られているため、並列ワーカーが多すぎるとCPUの競合が発生し、テストが遅くなったりフレーキーになったりします。ワーカー数を減らすか、シャーディングに頼ることでより適切に負荷を分散できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Mục đích của cấu hình `webServer` trong playwright.config.js khi chạy trên CI là gì?",
      "en": "What is the purpose of the `webServer` option in playwright.config.js when running on CI?",
      "ja": "CI 実行時における playwright.config.js の `webServer` オプションの目的は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ định server proxy để giấu địa chỉ IP thật khi test",
        "en": "Specifies a proxy server to hide the real IP address during tests",
        "ja": "テスト時に実際のIPアドレスを隠すためのプロキシサーバーを指定する"
      },
      {
        "vi": "Tự động khởi động ứng dụng (build/serve) trước khi test chạy và tắt nó sau khi hoàn tất, không cần bước riêng trong workflow",
        "en": "Automatically starts the application (build/serve) before tests run and shuts it down afterward, without a separate workflow step",
        "ja": "テスト実行前にアプリケーション(ビルド/サーブ)を自動的に起動し、終了後に停止させ、ワークフローで別ステップを用意する必要をなくす"
      },
      {
        "vi": "Bắt buộc mọi request phải đi qua HTTPS",
        "en": "Forces every request to go through HTTPS",
        "ja": "すべてのリクエストをHTTPS経由にすることを強制する"
      },
      {
        "vi": "Giới hạn số lượng request đồng thời tới server test",
        "en": "Limits the number of concurrent requests to the test server",
        "ja": "テストサーバーへの同時リクエスト数を制限する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "`webServer` cho phép Playwright tự chạy lệnh start app (vd `npm run start`) và chờ health check trước khi bắt đầu test, rất hữu ích trên CI để không phải viết thêm step khởi động server thủ công.",
      "en": "`webServer` lets Playwright itself run the app-start command (e.g. `npm run start`) and wait for a health check before tests begin, which is very handy on CI to avoid a manual server-startup step.",
      "ja": "`webServer` を使うと Playwright 自身がアプリ起動コマンド(例: `npm run start`)を実行し、ヘルスチェックを待ってからテストを開始できます。CIで手動のサーバー起動ステップを書かずに済むため非常に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Chiến lược `strategy.matrix` trong GitHub Actions thường được dùng thế nào để tối ưu thời gian chạy Playwright test?",
      "en": "How is the `strategy.matrix` feature in GitHub Actions typically used to optimize Playwright test run time?",
      "ja": "GitHub Actions の `strategy.matrix` 機能は、Playwright テストの実行時間を最適化するためにどのように使われますか?"
    },
    "options": [
      {
        "vi": "Gộp toàn bộ test lại thành một job duy nhất để tiết kiệm tài nguyên",
        "en": "Merges all tests into a single job to save resources",
        "ja": "リソース節約のためすべてのテストを1つのジョブにまとめる"
      },
      {
        "vi": "Tự động sinh dữ liệu test giả lập cho mọi trường hợp biên",
        "en": "Automatically generates mock data for every edge case",
        "ja": "あらゆるエッジケース用のモックデータを自動生成する"
      },
      {
        "vi": "Định nghĩa nhiều job chạy song song, mỗi job nhận một giá trị shard (hoặc browser) khác nhau, rút ngắn tổng thời gian pipeline",
        "en": "Defines multiple parallel jobs, each receiving a different shard (or browser) value, shortening overall pipeline time",
        "ja": "それぞれ異なるシャード(またはブラウザ)値を受け取る複数の並列ジョブを定義し、パイプライン全体の時間を短縮する"
      },
      {
        "vi": "Chỉ dùng để cấu hình biến môi trường bí mật (secrets)",
        "en": "Is used only to configure secret environment variables",
        "ja": "シークレット環境変数の設定にのみ使われる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kết hợp `matrix` với `--shard` cho phép tạo N job song song, mỗi job chạy 1/N test suite trên runner riêng, giảm đáng kể tổng thời gian chờ so với chạy tuần tự trong một job.",
      "en": "Combining `matrix` with `--shard` spins up N parallel jobs, each running 1/N of the suite on its own runner, dramatically cutting total wait time versus a single sequential job.",
      "ja": "`matrix` と `--shard` を組み合わせることでN個の並列ジョブが起動し、それぞれが専用ランナーでスイートの1/Nを実行するため、単一ジョブで順次実行するよりも全体の待ち時間が大幅に短縮されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cấu hình `video: 'retain-on-failure'` trong playwright.config.js mang lại lợi ích gì cho pipeline CI?",
      "en": "What benefit does `video: 'retain-on-failure'` in playwright.config.js bring to a CI pipeline?",
      "ja": "playwright.config.js の `video: 'retain-on-failure'` 設定はCIパイプラインにどのような利点をもたらしますか?"
    },
    "options": [
      {
        "vi": "Chạy lại toàn bộ test suite hai lần để có video đầy đủ",
        "en": "Re-runs the entire suite twice to capture full video",
        "ja": "完全な動画を得るためテストスイート全体を2回実行する"
      },
      {
        "vi": "Tự động sửa lỗi test thất bại dựa trên video",
        "en": "Automatically fixes failing tests based on the recorded video",
        "ja": "記録された動画をもとに失敗したテストを自動修正する"
      },
      {
        "vi": "Tăng độ phân giải video lên 4K để dễ debug",
        "en": "Increases video resolution to 4K for easier debugging",
        "ja": "デバッグしやすいよう動画解像度を4Kに上げる"
      },
      {
        "vi": "Chỉ giữ lại video của các test thất bại, giảm dung lượng artifact cần upload so với quay video mọi test",
        "en": "Keeps video only for failed tests, reducing the artifact size to upload compared to recording video for every test",
        "ja": "失敗したテストの動画のみを保持し、すべてのテストで動画を記録する場合に比べてアップロードするアーティファクトサイズを削減する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Quay video cho tất cả test tốn dung lượng và thời gian upload; `retain-on-failure` chỉ giữ video khi test fail, cân bằng giữa khả năng debug và chi phí lưu trữ artifact trên CI.",
      "en": "Recording video for every test wastes storage and upload time; `retain-on-failure` keeps videos only on failures, balancing debuggability against CI artifact storage cost.",
      "ja": "すべてのテストで動画を記録するとストレージとアップロード時間が無駄になります。`retain-on-failure` は失敗時のみ動画を保持し、デバッグのしやすさとCIのアーティファクト保存コストのバランスを取ります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cấu hình `trace: 'on-first-retry'` phù hợp với mục tiêu nào trên CI?",
      "en": "What CI goal does `trace: 'on-first-retry'` serve?",
      "ja": "`trace: 'on-first-retry'` 設定はCIにおけるどのような目的に適していますか?"
    },
    "options": [
      {
        "vi": "Chỉ ghi trace khi test fail lần đầu và được retry, giúp debug lỗi flaky mà không tốn overhead ghi trace cho mọi lần chạy pass",
        "en": "Records a trace only when a test fails and gets retried, aiding flaky-test debugging without the overhead of tracing every passing run",
        "ja": "テストが失敗しリトライされた場合のみトレースを記録し、すべての成功実行でトレースを取るオーバーヘッドをかけずにフレーキーテストのデバッグを助ける"
      },
      {
        "vi": "Bắt buộc mọi test phải retry ít nhất một lần",
        "en": "Forces every test to be retried at least once",
        "ja": "すべてのテストを最低1回リトライすることを強制する"
      },
      {
        "vi": "Tắt hoàn toàn tính năng trace trên CI",
        "en": "Completely disables tracing on CI",
        "ja": "CI上でトレース機能を完全に無効化する"
      },
      {
        "vi": "Ghi trace cho toàn bộ test kể cả khi pass để so sánh hiệu năng",
        "en": "Records traces for all tests, even passing ones, to compare performance",
        "ja": "パフォーマンス比較のため成功したテストも含めすべてのテストのトレースを記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "`on-first-retry` chỉ bật trace khi lần chạy đầu fail và Playwright thực hiện retry, cung cấp dữ liệu debug chi tiết cho các test flaky mà không làm nặng CI khi test pass ngay lần đầu.",
      "en": "`on-first-retry` enables tracing only when the first attempt fails and Playwright retries, giving detailed debug data for flaky tests without burdening CI when tests pass on the first try.",
      "ja": "`on-first-retry` は最初の実行が失敗し Playwright がリトライした場合にのみトレースを有効にし、最初の実行で成功した場合にCIに負荷をかけることなくフレーキーテストの詳細なデバッグデータを提供します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "`test.describe.configure({ retries: 3 })` khác gì với việc set `retries` trong playwright.config.js?",
      "en": "How does `test.describe.configure({ retries: 3 })` differ from setting `retries` in playwright.config.js?",
      "ja": "`test.describe.configure({ retries: 3 })` は playwright.config.js で `retries` を設定するのと何が違いますか?"
    },
    "options": [
      {
        "vi": "Là cách duy nhất để bật retry trên CI",
        "en": "Is the only way to enable retries on CI",
        "ja": "CIでリトライを有効にする唯一の方法である"
      },
      {
        "vi": "Chỉ áp dụng số lần retry riêng cho các test trong khối `describe` đó, thay vì áp dụng toàn cục cho cả suite",
        "en": "Applies the retry count only to tests inside that specific `describe` block, rather than globally to the whole suite",
        "ja": "スイート全体にグローバルに適用するのではなく、その特定の `describe` ブロック内のテストにのみリトライ回数を適用する"
      },
      {
        "vi": "Ghi đè hoàn toàn cấu hình worker của toàn bộ project",
        "en": "Completely overrides the worker configuration for the whole project",
        "ja": "プロジェクト全体のワーカー設定を完全に上書きする"
      },
      {
        "vi": "Chỉ hoạt động khi chạy local, không hoạt động trên CI",
        "en": "Only works locally and does not work on CI",
        "ja": "ローカル実行時のみ動作し、CIでは動作しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cấu hình `retries` trong config file áp dụng toàn cục, còn `test.describe.configure` cho phép ghi đè riêng ở cấp suite/nhóm test, hữu ích khi chỉ một nhóm test dễ flaky cần retry nhiều hơn.",
      "en": "The `retries` setting in the config file applies globally, while `test.describe.configure` allows a per-suite/group override — useful when only a particular flaky-prone group needs extra retries.",
      "ja": "設定ファイルの `retries` はグローバルに適用されますが、`test.describe.configure` はスイート/グループ単位での上書きを可能にし、特に不安定になりがちな一部のグループだけ追加のリトライが必要な場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong workflow GitHub Actions, bước `actions/upload-artifact` thường dùng để làm gì sau khi chạy Playwright test?",
      "en": "In a GitHub Actions workflow, what is the `actions/upload-artifact` step typically used for after running Playwright tests?",
      "ja": "GitHub Actions ワークフローで、Playwright テスト実行後に `actions/upload-artifact` ステップは通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Gửi email báo cáo tới toàn bộ team ngay lập tức",
        "en": "Immediately emails the report to the whole team",
        "ja": "チーム全員に即座にレポートをメールで送信する"
      },
      {
        "vi": "Tự động deploy ứng dụng lên production",
        "en": "Automatically deploys the application to production",
        "ja": "アプリケーションを自動的に本番環境へデプロイする"
      },
      {
        "vi": "Lưu lại thư mục report HTML, ảnh chụp lỗi, video, trace để tải xuống xem sau khi job kết thúc",
        "en": "Preserves the HTML report folder, failure screenshots, videos, and traces for download after the job finishes",
        "ja": "HTMLレポートフォルダ、失敗時のスクリーンショット、動画、トレースを保存し、ジョブ終了後にダウンロードできるようにする"
      },
      {
        "vi": "Xóa các test không liên quan để giảm dung lượng repo",
        "en": "Deletes unrelated tests to reduce repository size",
        "ja": "リポジトリサイズを削減するため無関係なテストを削除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Sau khi job chạy xong, các file trong thư mục `test-results`/`playwright-report` chỉ tồn tại trên runner tạm thời; `upload-artifact` lưu chúng lại để đội ngũ tải về hoặc xem trong tab Artifacts của run.",
      "en": "After a job finishes, files under `test-results`/`playwright-report` only exist on the ephemeral runner; `upload-artifact` preserves them so the team can download or view them in the run's Artifacts tab.",
      "ja": "ジョブ終了後、`test-results`/`playwright-report` 配下のファイルは一時的なランナー上にしか存在しません。`upload-artifact` はそれらを保存し、チームが実行結果のArtifactsタブからダウンロード・閲覧できるようにします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao Playwright Test trả về exit code khác 0 khi có test fail lại quan trọng đối với CI?",
      "en": "Why is it important for CI that Playwright Test returns a non-zero exit code when a test fails?",
      "ja": "テストが失敗した際に Playwright Test が非ゼロの終了コードを返すことは、なぜCIにとって重要なのですか?"
    },
    "options": [
      {
        "vi": "Bắt buộc phải chạy lại toàn bộ suite từ đầu",
        "en": "Forces the entire suite to be re-run from scratch",
        "ja": "スイート全体を最初から再実行することを強制する"
      },
      {
        "vi": "Giúp tăng tốc độ chạy test lên gấp đôi",
        "en": "Doubles the test execution speed",
        "ja": "テスト実行速度を2倍にする"
      },
      {
        "vi": "Tự động tạo pull request sửa lỗi",
        "en": "Automatically creates a pull request to fix the bug",
        "ja": "バグを修正するプルリクエストを自動作成する"
      },
      {
        "vi": "Đó là tín hiệu để CI đánh dấu job/pipeline là thất bại, ngăn code lỗi được merge hoặc deploy tự động",
        "en": "It's the signal CI uses to mark the job/pipeline as failed, preventing broken code from being auto-merged or deployed",
        "ja": "CIがジョブ/パイプラインを失敗としてマークするための合図であり、壊れたコードが自動的にマージやデプロイされるのを防ぐ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "CI runner dựa vào exit code của process để quyết định job pass/fail; nếu Playwright luôn trả 0 bất kể kết quả, pipeline sẽ không bao giờ chặn được code lỗi.",
      "en": "CI runners rely on the process exit code to decide pass/fail; if Playwright always returned 0 regardless of results, the pipeline could never block broken code.",
      "ja": "CIランナーはプロセスの終了コードに基づいてジョブの成否を判断します。もし Playwright が結果に関わらず常に0を返すなら、パイプラインは壊れたコードを決してブロックできません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Việc cấu hình `baseURL` thông qua biến môi trường (ví dụ `process.env.BASE_URL`) trong playwright.config.js giúp ích gì trên CI?",
      "en": "How does configuring `baseURL` via an environment variable (e.g. `process.env.BASE_URL`) in playwright.config.js help on CI?",
      "ja": "playwright.config.js で環境変数(例: `process.env.BASE_URL`)経由で `baseURL` を設定することはCIでどう役立ちますか?"
    },
    "options": [
      {
        "vi": "Cho phép cùng một bộ test chạy nhắm vào các môi trường khác nhau (staging, preview, production) chỉ bằng cách đổi giá trị biến môi trường ở mỗi job",
        "en": "Lets the same test suite target different environments (staging, preview, production) simply by changing the env var per job",
        "ja": "環境変数の値をジョブごとに変えるだけで、同じテストスイートを異なる環境(ステージング、プレビュー、本番)に対して実行できる"
      },
      {
        "vi": "Tự động mã hóa toàn bộ request HTTP",
        "en": "Automatically encrypts all HTTP requests",
        "ja": "すべてのHTTPリクエストを自動的に暗号化する"
      },
      {
        "vi": "Bắt buộc dùng chung một domain cho mọi project test",
        "en": "Forces every test project to share a single domain",
        "ja": "すべてのテストプロジェクトで単一のドメインを共有することを強制する"
      },
      {
        "vi": "Giảm số lượng assertion cần viết trong test",
        "en": "Reduces the number of assertions needed in tests",
        "ja": "テストに必要なアサーションの数を減らす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thay vì hardcode URL, đọc từ biến môi trường giúp cùng bộ test tái sử dụng linh hoạt cho nhiều môi trường CI khác nhau (PR preview, staging, production) mà không sửa code.",
      "en": "Instead of hardcoding the URL, reading it from an environment variable lets the same suite be flexibly reused across different CI environments (PR preview, staging, production) without code changes.",
      "ja": "URLをハードコードする代わりに環境変数から読み込むことで、コードを変更せずに同じスイートをPRプレビュー、ステージング、本番など異なるCI環境で柔軟に再利用できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, cờ `--grep @smoke` (hoặc tag tương tự) thường được dùng để làm gì?",
      "en": "In CI, what is the `--grep @smoke` flag (or similar tagging) typically used for?",
      "ja": "CIにおいて `--grep @smoke` フラグ(または同様のタグ付け)は通常何のために使われますか?"
    },
    "options": [
      {
        "vi": "Xóa các test không được tag",
        "en": "Deletes tests that are not tagged",
        "ja": "タグが付いていないテストを削除する"
      },
      {
        "vi": "Chỉ chạy tập con test được gắn tag smoke để kiểm tra nhanh trên mỗi PR, còn full suite chạy ở bước riêng (vd nightly)",
        "en": "Runs only the subset of tests tagged smoke for a fast check on every PR, while the full suite runs separately (e.g. nightly)",
        "ja": "すべてのPRで高速チェックを行うためsmokeタグが付いたテストのサブセットのみ実行し、フルスイートは別途(例: 夜間)実行する"
      },
      {
        "vi": "Tự động sinh thêm test case mới có tag tương ứng",
        "en": "Automatically generates new test cases with matching tags",
        "ja": "対応するタグを持つ新しいテストケースを自動生成する"
      },
      {
        "vi": "Bắt buộc tất cả test phải có tag mới chạy được",
        "en": "Requires every test to have a tag before any can run",
        "ja": "すべてのテストにタグがなければ実行できないようにする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Gắn tag trong tên test (vd `@smoke`) rồi lọc bằng `--grep` cho phép CI chạy nhanh một tập con quan trọng ở mỗi PR, giữ full regression cho pipeline chạy định kỳ, cân bằng tốc độ và độ bao phủ.",
      "en": "Tagging test titles (e.g. `@smoke`) and filtering with `--grep` lets CI run a quick, important subset on every PR while the full regression runs on a scheduled pipeline, balancing speed and coverage.",
      "ja": "テストタイトルにタグを付け(例: `@smoke`)、`--grep` でフィルタリングすることで、CIは毎回のPRで重要なサブセットを高速に実行しつつ、フルリグレッションは定期実行パイプラインで行い、速度とカバレッジのバランスを取れます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cấu hình `fullyParallel: true` trong playwright.config.js thay đổi hành vi chạy test như thế nào?",
      "en": "How does `fullyParallel: true` in playwright.config.js change test execution behavior?",
      "ja": "playwright.config.js の `fullyParallel: true` 設定はテスト実行の挙動をどう変えますか?"
    },
    "options": [
      {
        "vi": "Tự động tăng gấp đôi số lần retry",
        "en": "Automatically doubles the retry count",
        "ja": "リトライ回数を自動的に2倍にする"
      },
      {
        "vi": "Bắt buộc mọi test phải chạy tuần tự trên một worker duy nhất",
        "en": "Forces all tests to run sequentially on a single worker",
        "ja": "すべてのテストを単一のワーカーで順次実行することを強制する"
      },
      {
        "vi": "Cho phép các test trong cùng một file chạy song song trên nhiều worker khác nhau, thay vì mặc định các test cùng file chạy tuần tự trên một worker",
        "en": "Allows tests within the same file to run in parallel across multiple workers, instead of the default where tests in one file run sequentially on a single worker",
        "ja": "同じファイル内のテストが単一のワーカーで順次実行されるデフォルトとは異なり、複数のワーカーにまたがって並列実行できるようにする"
      },
      {
        "vi": "Chỉ ảnh hưởng tới việc chạy test ở chế độ headed",
        "en": "Only affects test execution in headed mode",
        "ja": "headedモードでのテスト実行にのみ影響する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mặc định Playwright chạy tuần tự các test trong cùng file trên một worker; bật `fullyParallel` phân phối từng test riêng lẻ ra các worker khác nhau, tăng tốc đáng kể khi có nhiều CPU trên CI.",
      "en": "By default Playwright runs tests within the same file sequentially on one worker; enabling `fullyParallel` distributes individual tests across different workers, significantly speeding things up when CI has many CPUs.",
      "ja": "デフォルトでは Playwright は同じファイル内のテストを単一のワーカーで順次実行しますが、`fullyParallel` を有効にすると個々のテストが異なるワーカーに分散され、CIに多くのCPUがある場合に大幅な高速化が見込めます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi ứng dụng và Playwright chạy trong hai container Docker riêng biệt trên CI, vấn đề phổ biến nào cần lưu ý về networking?",
      "en": "When the app and Playwright run in two separate Docker containers on CI, what common networking issue must be considered?",
      "ja": "アプリケーションと Playwright がCI上で別々の2つのDockerコンテナで実行される場合、注意すべき一般的なネットワークの問題は何ですか?"
    },
    "options": [
      {
        "vi": "Docker tự động đồng bộ cookie giữa các container",
        "en": "Docker automatically syncs cookies between containers",
        "ja": "Docker はコンテナ間でクッキーを自動的に同期する"
      },
      {
        "vi": "Playwright không thể chạy trong container Docker",
        "en": "Playwright cannot run inside a Docker container at all",
        "ja": "Playwright は Docker コンテナ内では一切実行できない"
      },
      {
        "vi": "Phải tắt hoàn toàn HTTPS khi dùng Docker",
        "en": "HTTPS must be completely disabled when using Docker",
        "ja": "Dockerを使う場合はHTTPSを完全に無効化しなければならない"
      },
      {
        "vi": "Không thể dùng `localhost` để trỏ tới container ứng dụng; cần dùng tên service/network Docker (hoặc `host.docker.internal`) để hai container giao tiếp được",
        "en": "`localhost` cannot be used to reach the app container; the Docker service/network name (or `host.docker.internal`) must be used so the two containers can communicate",
        "ja": "`localhost` ではアプリコンテナに到達できないため、2つのコンテナが通信できるようDockerサービス/ネットワーク名(または `host.docker.internal`)を使う必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi container có network namespace riêng nên `localhost` trong container test không trỏ tới container app; cần cấu hình cùng Docker network và gọi bằng tên service, hoặc dùng `host.docker.internal` khi kết nối ra host.",
      "en": "Each container has its own network namespace, so `localhost` inside the test container doesn't point to the app container; they need a shared Docker network and to be addressed by service name, or `host.docker.internal` when reaching the host.",
      "ja": "各コンテナは独自のネットワーク名前空間を持つため、テストコンテナ内の `localhost` はアプリコンテナを指しません。共有Dockerネットワークを構成しサービス名でアクセスするか、ホストに接続する場合は `host.docker.internal` を使う必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Câu nào mô tả ĐÚNG về lệnh `npx playwright merge-reports`?",
      "en": "Which statement CORRECTLY describes the `npx playwright merge-reports` command?",
      "ja": "`npx playwright merge-reports` コマンドについて正しく説明しているのはどれですか?"
    },
    "options": [
      {
        "vi": "Gộp các file blob report được sinh ra từ nhiều job shard riêng lẻ thành một báo cáo HTML thống nhất",
        "en": "Merges the blob report files produced by separate sharded jobs into a single unified HTML report",
        "ja": "個別のシャードジョブから生成された blob レポートファイルを1つの統合HTMLレポートにマージする"
      },
      {
        "vi": "Gộp nhiều file playwright.config.js thành một file duy nhất",
        "en": "Merges multiple playwright.config.js files into a single file",
        "ja": "複数の playwright.config.js ファイルを1つに統合する"
      },
      {
        "vi": "Gộp danh sách trình duyệt cần cài đặt",
        "en": "Merges the list of browsers that need to be installed",
        "ja": "インストールが必要なブラウザのリストを統合する"
      },
      {
        "vi": "Gộp các branch git trước khi deploy",
        "en": "Merges git branches before deployment",
        "ja": "デプロイ前にgitブランチを統合する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Sau khi mỗi shard job xuất blob report riêng, một job tổng hợp tải toàn bộ blob về và chạy `merge-reports` để tạo report HTML duy nhất phản ánh kết quả toàn bộ suite.",
      "en": "After each shard job exports its own blob report, a final aggregation job downloads all blobs and runs `merge-reports` to produce a single HTML report reflecting the whole suite's results.",
      "ja": "各シャードジョブが独自の blob レポートを出力した後、最終的な集約ジョブがすべての blob をダウンロードし `merge-reports` を実行してスイート全体の結果を反映した単一のHTMLレポートを生成します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright coi một test là \"flaky\" khi nào trong báo cáo kết quả?",
      "en": "When does Playwright mark a test as \"flaky\" in the results report?",
      "ja": "Playwright が結果レポートでテストを「flaky」と判定するのはどのような場合ですか?"
    },
    "options": [
      {
        "vi": "Khi test bị skip do thiếu dữ liệu",
        "en": "When a test is skipped due to missing data",
        "ja": "データ不足によりテストがスキップされた場合"
      },
      {
        "vi": "Khi test fail ở lần chạy đầu nhưng pass ở một trong các lần retry tiếp theo (nhờ cấu hình `retries` > 0)",
        "en": "When a test fails on the first attempt but passes on one of the subsequent retries (thanks to `retries` > 0)",
        "ja": "最初の実行では失敗したが、その後のリトライ(`retries` が0より大きい設定による)のいずれかで成功した場合"
      },
      {
        "vi": "Khi test chạy nhanh hơn timeout quy định",
        "en": "When a test runs faster than the configured timeout",
        "ja": "設定されたタイムアウトより速くテストが完了した場合"
      },
      {
        "vi": "Khi test không có assertion nào",
        "en": "When a test contains no assertions",
        "ja": "テストにアサーションが1つもない場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trạng thái \"flaky\" xuất hiện khi test thất bại ở lần thử đầu nhưng cuối cùng pass sau khi retry — đây là tín hiệu quan trọng để đội ngũ điều tra nguyên nhân bất ổn định thay vì bỏ qua vì \"cuối cùng cũng pass\".",
      "en": "The \"flaky\" status appears when a test fails on the first attempt but eventually passes after a retry — an important signal for teams to investigate the instability rather than ignore it just because it \"passed eventually\".",
      "ja": "「flaky」ステータスは、最初の実行では失敗したがリトライ後に最終的に成功した場合に表示されます。「最終的には成功した」からと無視するのではなく、チームが不安定性の原因を調査すべき重要なシグナルです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Reporter kép `reporter: [['list'], ['github']]` trong CI có tác dụng gì đặc biệt?",
      "en": "What special effect does the combined `reporter: [['list'], ['github']]` setting have on CI?",
      "ja": "CIにおける `reporter: [['list'], ['github']]` の組み合わせ設定にはどのような特別な効果がありますか?"
    },
    "options": [
      {
        "vi": "Tăng gấp đôi tốc độ chạy test",
        "en": "Doubles the test run speed",
        "ja": "テスト実行速度を2倍にする"
      },
      {
        "vi": "Tự động merge PR khi test pass",
        "en": "Automatically merges the PR when tests pass",
        "ja": "テストが成功した場合にPRを自動マージする"
      },
      {
        "vi": "Reporter `github` tự động tạo annotation lỗi ngay trên giao diện GitHub Actions/PR, giúp thấy lỗi mà không cần mở report HTML riêng",
        "en": "The `github` reporter automatically creates error annotations directly in the GitHub Actions/PR UI, so failures are visible without opening a separate HTML report",
        "ja": "`github` レポーターがGitHub Actions/PRのUI上に直接エラーのアノテーションを自動作成し、別途HTMLレポートを開かなくても失敗が確認できるようになる"
      },
      {
        "vi": "Vô hiệu hóa mọi reporter khác kể cả report HTML",
        "en": "Disables every other reporter including the HTML report",
        "ja": "HTMLレポートを含む他のすべてのレポーターを無効化する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Reporter `github` sinh ra các annotation error hiển thị trực tiếp trong tab Checks của PR, kết hợp cùng `list` để log console dễ đọc — giúp reviewer thấy ngay lỗi mà không cần tải artifact.",
      "en": "The `github` reporter generates error annotations shown directly in the PR's Checks tab, combined with `list` for readable console logs — letting reviewers see failures immediately without downloading artifacts.",
      "ja": "`github` レポーターはPRのChecksタブに直接表示されるエラーアノテーションを生成し、`list` と組み合わせることで読みやすいコンソールログも得られます。これによりレビュアーはアーティファクトをダウンロードせずに失敗をすぐに確認できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Biến môi trường `PLAYWRIGHT_HTML_REPORT` dùng để làm gì khi cấu hình pipeline CI?",
      "en": "What is the `PLAYWRIGHT_HTML_REPORT` environment variable used for when configuring a CI pipeline?",
      "ja": "CIパイプラインを構成する際、`PLAYWRIGHT_HTML_REPORT` 環境変数は何のために使われますか?"
    },
    "options": [
      {
        "vi": "Mã hóa nội dung report để bảo mật",
        "en": "Encrypts the report content for security",
        "ja": "セキュリティのためレポート内容を暗号化する"
      },
      {
        "vi": "Tự động gửi report qua email",
        "en": "Automatically emails the report",
        "ja": "レポートを自動的にメール送信する"
      },
      {
        "vi": "Bật chế độ report bằng giọng nói",
        "en": "Enables a voice-narrated report mode",
        "ja": "音声によるレポート読み上げモードを有効にする"
      },
      {
        "vi": "Chỉ định thư mục đầu ra tùy chỉnh cho report HTML, giúp bước upload artifact biết chính xác đường dẫn cần lưu",
        "en": "Specifies a custom output folder for the HTML report, so the artifact-upload step knows exactly which path to save",
        "ja": "HTMLレポートのカスタム出力フォルダを指定し、アーティファクトアップロードのステップが正確にどのパスを保存すべきか分かるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mặc định report HTML xuất ra thư mục `playwright-report`; biến `PLAYWRIGHT_HTML_REPORT` cho phép đổi đường dẫn này, hữu ích khi cần khớp với đường dẫn mà bước `upload-artifact` cấu hình sẵn.",
      "en": "By default the HTML report is written to `playwright-report`; the `PLAYWRIGHT_HTML_REPORT` variable lets you change that path, useful for matching the path configured in the `upload-artifact` step.",
      "ja": "デフォルトではHTMLレポートは `playwright-report` フォルダに出力されますが、`PLAYWRIGHT_HTML_REPORT` 変数を使うとこのパスを変更でき、`upload-artifact` ステップで設定済みのパスに合わせたい場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "So với GitHub-hosted runner mặc định, self-hosted runner mang lại lợi thế gì khi chạy Playwright trên CI cho dự án lớn?",
      "en": "Compared to a default GitHub-hosted runner, what advantage does a self-hosted runner offer when running Playwright on CI for a large project?",
      "ja": "デフォルトのGitHub-hostedランナーと比較して、大規模プロジェクトのCIでPlaywrightを実行する際にセルフホストランナーが持つ利点は何ですか?"
    },
    "options": [
      {
        "vi": "Có thể tùy biến cấu hình phần cứng/cache lâu dài và tránh giới hạn thời gian/tài nguyên của runner dùng chung, tăng tốc các lần chạy lặp lại",
        "en": "Allows customizing hardware/persisting long-term caches and avoids the time/resource limits of shared runners, speeding up repeated runs",
        "ja": "ハードウェアをカスタマイズしたり長期的なキャッシュを永続化したりでき、共有ランナーの時間/リソース制限を回避できるため、繰り返しの実行が高速化される"
      },
      {
        "vi": "Tự động miễn phí không giới hạn cho mọi tổ chức",
        "en": "Is automatically free and unlimited for every organization",
        "ja": "すべての組織に対して自動的に無料かつ無制限になる"
      },
      {
        "vi": "Không cần cấu hình gì, GitHub tự động quản lý toàn bộ vòng đời",
        "en": "Requires no configuration; GitHub automatically manages its entire lifecycle",
        "ja": "設定は一切不要で、GitHubがそのライフサイクル全体を自動管理する"
      },
      {
        "vi": "Bắt buộc phải chạy trên Windows Server",
        "en": "Must run on Windows Server",
        "ja": "必ずWindows Server上で実行しなければならない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Self-hosted runner cho phép giữ lại cache trình duyệt/node_modules giữa các lần chạy trên cùng máy, tùy chỉnh cấu hình mạnh hơn, tránh giới hạn phút chạy của gói GitHub-hosted, phù hợp khi suite lớn chạy thường xuyên.",
      "en": "A self-hosted runner can persist browser/node_modules caches between runs on the same machine, allows stronger hardware customization, and avoids GitHub-hosted minute limits — well suited when a large suite runs frequently.",
      "ja": "セルフホストランナーは同じマシン上で実行間にブラウザ/node_modulesのキャッシュを永続化でき、より強力なハードウェアカスタマイズが可能で、GitHub-hostedの実行時間制限を回避できます。大規模なスイートを頻繁に実行する場合に適しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, việc tăng giá trị `timeout` toàn cục (test timeout) so với khi chạy local thường xuất phát từ lý do nào?",
      "en": "On CI, increasing the global `timeout` (test timeout) compared to local runs is usually motivated by what reason?",
      "ja": "CIにおいてグローバルな `timeout`(テストタイムアウト)をローカル実行時より長く設定するのは、通常どのような理由からですか?"
    },
    "options": [
      {
        "vi": "Playwright yêu cầu bắt buộc timeout tối thiểu 10 phút trên mọi CI",
        "en": "Playwright mandates a minimum 10-minute timeout on all CI systems",
        "ja": "Playwright はすべてのCIで最低10分のタイムアウトを義務付けているため"
      },
      {
        "vi": "Runner CI thường có tài nguyên hạn chế hơn và chạy nhiều test song song, khiến từng thao tác chậm hơn máy dev nên cần thời gian chờ rộng rãi hơn",
        "en": "CI runners typically have more limited resources and run many tests in parallel, making each action slower than on a dev machine, so a more generous timeout is needed",
        "ja": "CIランナーは通常リソースが限られており、多くのテストを並列実行するため各操作が開発マシンより遅くなり、より余裕のあるタイムアウトが必要になるため"
      },
      {
        "vi": "Tăng timeout giúp giảm số lượng test cần viết",
        "en": "Increasing the timeout reduces the number of tests that need to be written",
        "ja": "タイムアウトを増やすと書くべきテストの数が減るため"
      },
      {
        "vi": "Timeout dài hơn tự động tắt tính năng auto-waiting",
        "en": "A longer timeout automatically disables auto-waiting",
        "ja": "タイムアウトを長くすると自動的にauto-waiting機能が無効になるため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "CPU/RAM chia sẻ trên runner cùng việc chạy nhiều worker song song khiến ứng dụng và trình duyệt phản hồi chậm hơn máy dev cá nhân, nên nhiều team nới rộng timeout trên CI để tránh fail giả do máy chậm chứ không phải lỗi thật.",
      "en": "Shared CPU/RAM on runners plus many parallel workers make the app and browser respond slower than on a personal dev machine, so many teams widen the CI timeout to avoid false failures from a slow machine rather than a real bug.",
      "ja": "ランナー上での共有CPU/RAMと多数の並列ワーカーにより、アプリとブラウザの応答が個人の開発マシンより遅くなります。そのため多くのチームは、実際のバグではなく遅いマシンによる誤った失敗を避けるためCIのタイムアウトを広げています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Việc tách riêng cache cho `node_modules` (theo `package-lock.json`) và cache cho browser binaries (theo phiên bản Playwright) trong GitHub Actions nhằm mục đích gì?",
      "en": "Why separate the cache for `node_modules` (keyed on `package-lock.json`) from the cache for browser binaries (keyed on Playwright version) in GitHub Actions?",
      "ja": "GitHub Actions で `node_modules` のキャッシュ(`package-lock.json` をキーとする)とブラウザバイナリのキャッシュ(Playwright のバージョンをキーとする)を分けるのはなぜですか?"
    },
    "options": [
      {
        "vi": "Cache `node_modules` và browser bắt buộc phải nằm trên hai runner khác nhau",
        "en": "The `node_modules` and browser caches must reside on two different runners",
        "ja": "`node_modules` とブラウザのキャッシュは2つの異なるランナー上に置かなければならないため"
      },
      {
        "vi": "GitHub Actions chỉ cho phép tối đa một cache key trên mỗi workflow",
        "en": "GitHub Actions allows only one cache key per workflow",
        "ja": "GitHub Actions では1ワークフローにつきキャッシュキーを1つしか使えないため"
      },
      {
        "vi": "Hai loại dữ liệu thay đổi theo tần suất khác nhau; tách cache theo key riêng tránh invalidate cache browser (vốn nặng, tải lâu) chỉ vì một dependency JS nhỏ thay đổi",
        "en": "The two kinds of data change at different frequencies; separating cache keys avoids invalidating the (heavy, slow-to-download) browser cache just because a small JS dependency changed",
        "ja": "この2種類のデータは変化する頻度が異なるため、キャッシュキーを分けることで、小さなJS依存関係の変更だけで(重く、ダウンロードに時間がかかる)ブラウザキャッシュを無効化してしまうのを防げる"
      },
      {
        "vi": "Tách cache giúp bỏ qua hoàn toàn bước cài đặt npm",
        "en": "Separating caches lets you skip the npm install step entirely",
        "ja": "キャッシュを分けることでnpmインストールのステップを完全にスキップできるため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "package.json/lock thường đổi thường xuyên hơn phiên bản Playwright; nếu dùng chung một cache key, mỗi lần cập nhật dependency nhỏ sẽ vô tình buộc tải lại toàn bộ browser vốn nặng và chậm — tách key theo từng loại giúp cache hiệu quả hơn.",
      "en": "package.json/lock changes more often than the Playwright version; sharing one cache key means every small dependency bump would force a full, slow browser re-download — separating keys per data type makes caching far more effective.",
      "ja": "package.json/lock は Playwright のバージョンより頻繁に変更されます。1つのキャッシュキーを共有すると、小さな依存関係の更新のたびに重くて遅いブラウザの再ダウンロードを強制してしまいます。データの種類ごとにキーを分けることでキャッシュがはるかに効果的になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright Test, để gọi API mà hoàn toàn không cần mở trình duyệt, nên dùng cách nào?",
      "en": "In Playwright Test, to call an API without opening a browser at all, what should you use?",
      "ja": "Playwright Testでブラウザを一切起動せずにAPIを呼び出すには、何を使うべきですか。"
    },
    "options": [
      {
        "vi": "page.request vì nó luôn độc lập với browser context",
        "en": "page.request, since it is always independent of the browser context",
        "ja": "page.requestはブラウザコンテキストと常に独立しているため、それを使う"
      },
      {
        "vi": "browser.newPage() rồi chặn network bằng route",
        "en": "browser.newPage() then intercepting network with route",
        "ja": "browser.newPage()を使い、routeでネットワークを傍受する"
      },
      {
        "vi": "page.evaluate() gọi fetch bên trong DOM",
        "en": "page.evaluate() calling fetch inside the DOM",
        "ja": "DOM内でfetchを呼び出すpage.evaluate()"
      },
      {
        "vi": "request fixture — một APIRequestContext độc lập, không cần page hay browser",
        "en": "the request fixture — a standalone APIRequestContext that needs no page or browser",
        "ja": "requestフィクスチャ — pageやブラウザを必要としない独立したAPIRequestContext"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright cung cấp fixture request là một APIRequestContext độc lập, cho phép gọi API trực tiếp mà không cần khởi tạo browser/page, phù hợp cho test API thuần túy.",
      "en": "Playwright provides the request fixture, a standalone APIRequestContext that lets you call APIs directly without launching a browser or page, ideal for pure API tests.",
      "ja": "Playwrightにはrequestフィクスチャという独立したAPIRequestContextがあり、ブラウザやページを起動せずに直接APIを呼び出せるため、純粋なAPIテストに適しています。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa fixture request và page.request là gì?",
      "en": "What is the core difference between the request fixture and page.request?",
      "ja": "requestフィクスチャとpage.requestの本質的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "page.request dùng chung cookie/session với trình duyệt trong page, còn request là ngữ cảnh API tách biệt",
        "en": "page.request shares cookies/session with the page's browser context, while request is a separate API context",
        "ja": "page.requestはページのブラウザコンテキストとCookie/セッションを共有するが、requestは分離されたAPIコンテキストである"
      },
      {
        "vi": "page.request chỉ dùng được với phương thức GET",
        "en": "page.request only works with the GET method",
        "ja": "page.requestはGETメソッドでしか使えない"
      },
      {
        "vi": "request nhanh hơn page.request về tốc độ mạng",
        "en": "request is faster than page.request in network speed",
        "ja": "requestはネットワーク速度がpage.requestより速い"
      },
      {
        "vi": "request chỉ hoạt động trong môi trường CI, không chạy local",
        "en": "request only works in CI, not locally",
        "ja": "requestはCI環境でのみ動作し、ローカルでは動かない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "page.request gắn liền với browser context của page nên tự động dùng chung cookie đã đăng nhập trên UI, trong khi request là APIRequestContext riêng biệt không liên quan gì tới trình duyệt.",
      "en": "page.request is tied to the page's browser context so it automatically shares login cookies from the UI, whereas request is a separate APIRequestContext unrelated to any browser.",
      "ja": "page.requestはページのブラウザコンテキストに紐づいているため、UIでログインしたCookieを自動的に共有しますが、requestはブラウザとは無関係な独立したAPIRequestContextです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cách viết assertion chuẩn (web-first) để kiểm tra một response API trả về mã trạng thái thành công trong Playwright Test là gì?",
      "en": "What is the standard (web-first) assertion to check that an API response returned a successful status code in Playwright Test?",
      "ja": "Playwright Testで、APIレスポンスが成功ステータスコードを返したことを確認する標準的な（web-first）アサーションは何ですか。"
    },
    "options": [
      {
        "vi": "assert.equal(response.status, 200)",
        "en": "assert.equal(response.status, 200)",
        "ja": "assert.equal(response.status, 200)"
      },
      {
        "vi": "expect(response).toBeOK()",
        "en": "expect(response).toBeOK()",
        "ja": "expect(response).toBeOK()"
      },
      {
        "vi": "expect(response.body).toBe('OK')",
        "en": "expect(response.body).toBe('OK')",
        "ja": "expect(response.body).toBe('OK')"
      },
      {
        "vi": "console.log(response.status()) rồi kiểm tra bằng mắt",
        "en": "console.log(response.status()) and check it visually",
        "ja": "console.log(response.status())で目視確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright cung cấp matcher chuyên biệt toBeOK() để kiểm tra response có status trong khoảng 200-299, giúp assertion API ngắn gọn và có thông báo lỗi rõ ràng khi thất bại.",
      "en": "Playwright provides a dedicated toBeOK() matcher to check that a response status is within 200-299, keeping API assertions concise with clear failure messages.",
      "ja": "Playwrightにはレスポンスのステータスが200〜299の範囲にあるかを確認する専用のtoBeOK()マッチャーがあり、簡潔でエラー内容が分かりやすいAPIアサーションを実現します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Phương thức response.json() trong APIResponse dùng để làm gì?",
      "en": "What does the response.json() method on an APIResponse do?",
      "ja": "APIResponseのresponse.json()メソッドは何をしますか。"
    },
    "options": [
      {
        "vi": "Chuyển response thành chuỗi văn bản thô",
        "en": "Convert the response into a raw text string",
        "ja": "レスポンスを生のテキスト文字列に変換する"
      },
      {
        "vi": "Kiểm tra header Content-Type có phải JSON hay không",
        "en": "Check whether the Content-Type header is JSON",
        "ja": "Content-TypeヘッダーがJSONかどうかを確認する"
      },
      {
        "vi": "Parse phần body của response dạng JSON thành object JavaScript",
        "en": "Parse the response body as JSON into a JavaScript object",
        "ja": "レスポンスボディをJSONとしてパースし、JavaScriptオブジェクトに変換する"
      },
      {
        "vi": "Ghi log response ra console dưới dạng JSON",
        "en": "Log the response to the console as JSON",
        "ja": "レスポンスをJSON形式でコンソールに出力する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "response.json() đọc body và parse thành object JS, cho phép truy cập trực tiếp các trường dữ liệu để assertion, thay vì phải tự parse chuỗi text.",
      "en": "response.json() reads the body and parses it into a JS object so you can directly access fields for assertions, instead of manually parsing raw text.",
      "ja": "response.json()はボディを読み取りJSオブジェクトにパースするため、生のテキストを自分でパースすることなく、フィールドに直接アクセスしてアサーションできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi gửi POST kèm dữ liệu JSON bằng apiContext.post(url, {data: {...}}), Playwright sẽ tự động làm gì?",
      "en": "When sending a POST with apiContext.post(url, {data: {...}}), what does Playwright automatically do?",
      "ja": "apiContext.post(url, {data: {...}})でJSONデータを送信する際、Playwrightは自動的に何を行いますか。"
    },
    "options": [
      {
        "vi": "Gửi dữ liệu dạng query string trên URL",
        "en": "Send the data as a query string on the URL",
        "ja": "データをURLのクエリ文字列として送信する"
      },
      {
        "vi": "Bỏ qua trường data nếu không khai báo headers thủ công",
        "en": "Ignore the data field unless headers are set manually",
        "ja": "headersを手動で設定しない限りdataフィールドを無視する"
      },
      {
        "vi": "Yêu cầu phải tự gọi JSON.stringify trước khi truyền vào data",
        "en": "Require you to call JSON.stringify manually before passing it to data",
        "ja": "dataに渡す前に自分でJSON.stringifyを呼ぶ必要がある"
      },
      {
        "vi": "Serialize object thành JSON và tự set header Content-Type: application/json",
        "en": "Serialize the object to JSON and automatically set the Content-Type: application/json header",
        "ja": "オブジェクトをJSONにシリアライズし、Content-Type: application/jsonヘッダーを自動的に設定する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi data là một object thuần, Playwright tự động serialize thành JSON và set header Content-Type phù hợp, giúp code test API ngắn gọn hơn.",
      "en": "When data is a plain object, Playwright automatically serializes it to JSON and sets the appropriate Content-Type header, keeping API test code concise.",
      "ja": "dataがプレーンオブジェクトの場合、Playwrightは自動的にJSONへシリアライズし適切なContent-Typeヘッダーを設定するため、APIテストコードが簡潔になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn mọi request trong một APIRequestContext đều tự động kèm header Authorization, nên cấu hình ở đâu?",
      "en": "To have every request in an APIRequestContext automatically include an Authorization header, where should you configure it?",
      "ja": "APIRequestContext内のすべてのリクエストに自動的にAuthorizationヘッダーを付与したい場合、どこで設定すべきですか。"
    },
    "options": [
      {
        "vi": "Truyền extraHTTPHeaders khi tạo context bằng request.newContext() hoặc trong use của config",
        "en": "Pass extraHTTPHeaders when creating the context via request.newContext() or in the config's use section",
        "ja": "request.newContext()でコンテキストを作成する際、またはconfigのuseセクションでextraHTTPHeadersを渡す"
      },
      {
        "vi": "Thêm header thủ công vào từng lệnh gọi get/post riêng lẻ",
        "en": "Manually add the header to each individual get/post call",
        "ja": "個々のget/post呼び出しに手動でヘッダーを追加する"
      },
      {
        "vi": "Ghi header vào biến môi trường process.env rồi Playwright tự đọc",
        "en": "Write the header into a process.env variable and Playwright reads it automatically",
        "ja": "process.env環境変数にヘッダーを書き込み、Playwrightが自動的に読み取る"
      },
      {
        "vi": "Không thể set header dùng chung, phải lặp lại ở mỗi request",
        "en": "Shared headers cannot be set; they must be repeated on every request",
        "ja": "共有ヘッダーは設定できず、リクエストごとに繰り返す必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "extraHTTPHeaders được truyền khi tạo APIRequestContext (hoặc trong use của playwright.config) sẽ áp dụng cho mọi request gửi qua context đó, tránh lặp code.",
      "en": "extraHTTPHeaders passed when creating the APIRequestContext (or in the config's use section) applies to every request made through that context, avoiding repetition.",
      "ja": "APIRequestContextの作成時（またはplaywright.configのuseセクション）に渡されたextraHTTPHeadersは、そのコンテキストを通るすべてのリクエストに適用され、コードの重複を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "request.newContext() dùng để làm gì trong test API bằng Playwright?",
      "en": "What is request.newContext() used for in Playwright API testing?",
      "ja": "PlaywrightのAPIテストにおいてrequest.newContext()は何のために使いますか。"
    },
    "options": [
      {
        "vi": "Mở một tab trình duyệt mới trong background",
        "en": "Open a new browser tab in the background",
        "ja": "バックグラウンドで新しいブラウザタブを開く"
      },
      {
        "vi": "Tạo một APIRequestContext mới, có thể cấu hình baseURL, headers, storageState riêng biệt",
        "en": "Create a new APIRequestContext that can have its own baseURL, headers, and storageState",
        "ja": "独自のbaseURL、headers、storageStateを設定できる新しいAPIRequestContextを作成する"
      },
      {
        "vi": "Reset toàn bộ database test về trạng thái ban đầu",
        "en": "Reset the entire test database to its initial state",
        "ja": "テストデータベース全体を初期状態にリセットする"
      },
      {
        "vi": "Ghi lại trace file cho phiên API hiện tại",
        "en": "Record a trace file for the current API session",
        "ja": "現在のAPIセッションのトレースファイルを記録する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "request.newContext() khởi tạo một ngữ cảnh API độc lập với các cấu hình riêng như baseURL, headers, storageState — hữu ích khi cần nhiều context với quyền/khách khác nhau.",
      "en": "request.newContext() creates an independent API context with its own configuration such as baseURL, headers, and storageState — useful when multiple contexts with different permissions/users are needed.",
      "ja": "request.newContext()は、baseURLやheaders、storageStateなど独自の設定を持つ独立したAPIコンテキストを作成し、異なる権限やユーザーで複数のコンテキストが必要な場合に役立ちます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao nên gọi apiContext.dispose() sau khi dùng xong một context API được tạo thủ công bằng request.newContext()?",
      "en": "Why should you call apiContext.dispose() after finishing with an API context created manually via request.newContext()?",
      "ja": "request.newContext()で手動作成したAPIコンテキストの使用後に、apiContext.dispose()を呼ぶべき理由は何ですか。"
    },
    "options": [
      {
        "vi": "Để tăng tốc độ chạy test bằng cách cache response cũ",
        "en": "To speed up test runs by caching old responses",
        "ja": "古いレスポンスをキャッシュしてテスト実行を高速化するため"
      },
      {
        "vi": "Để bắt buộc test phải fail nếu context không dùng nữa",
        "en": "To force the test to fail once the context is no longer used",
        "ja": "コンテキストが使われなくなった時点でテストを強制的に失敗させるため"
      },
      {
        "vi": "Để giải phóng kết nối/tài nguyên, vì context tự tạo không được Playwright tự động dọn dẹp như fixture",
        "en": "To free connections/resources, since a manually created context is not auto-cleaned by Playwright like a fixture",
        "ja": "手動作成したコンテキストはフィクスチャのようにPlaywrightが自動的にクリーンアップしないため、接続やリソースを解放するため"
      },
      {
        "vi": "dispose() là bắt buộc để Playwright ghi log ra report HTML",
        "en": "dispose() is required for Playwright to write logs into the HTML report",
        "ja": "dispose()はPlaywrightがHTMLレポートにログを書き込むために必須である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Context tạo thủ công bằng request.newContext() không được framework tự dọn như fixture request; gọi dispose() giúp đóng kết nối và tránh rò rỉ tài nguyên khi chạy nhiều test.",
      "en": "A context created manually with request.newContext() is not auto-cleaned by the framework like the request fixture; calling dispose() closes connections and prevents resource leaks across many tests.",
      "ja": "request.newContext()で手動作成したコンテキストは、requestフィクスチャのようにフレームワークが自動でクリーンアップしません。dispose()を呼ぶことで接続を閉じ、多数のテスト実行時のリソースリークを防げます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn test API cần dùng cookie đăng nhập đã có sẵn từ một phiên UI trước đó, cách tiếp cận hiệu quả nhất là gì?",
      "en": "To run API tests that need login cookies already established from a prior UI session, what is the most effective approach?",
      "ja": "以前のUIセッションで確立済みのログインCookieを必要とするAPIテストを実行する場合、最も効果的な方法は何ですか。"
    },
    "options": [
      {
        "vi": "Đăng nhập lại bằng UI trước mỗi test API riêng lẻ",
        "en": "Log in again via the UI before every single API test",
        "ja": "個々のAPIテストの前に毎回UIで再ログインする"
      },
      {
        "vi": "Không thể chia sẻ trạng thái đăng nhập giữa UI và request context",
        "en": "Login state cannot be shared between the UI and a request context",
        "ja": "ログイン状態はUIとrequestコンテキスト間で共有できない"
      },
      {
        "vi": "Copy thủ công giá trị cookie từ DevTools rồi hard-code vào test",
        "en": "Manually copy the cookie value from DevTools and hard-code it into the test",
        "ja": "DevToolsからCookie値を手動でコピーしテストにハードコードする"
      },
      {
        "vi": "Export storageState từ context UI đã đăng nhập rồi truyền vào request.newContext({storageState})",
        "en": "Export storageState from the logged-in UI context and pass it into request.newContext({storageState})",
        "ja": "ログイン済みのUIコンテキストからstorageStateをエクスポートし、request.newContext({storageState})に渡す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "storageState lưu cookie và localStorage của một context đã đăng nhập; truyền lại vào request.newContext cho phép API context tái sử dụng phiên đăng nhập đó mà không cần đăng nhập lại.",
      "en": "storageState captures the cookies and localStorage of a logged-in context; passing it into request.newContext lets the API context reuse that session without logging in again.",
      "ja": "storageStateはログイン済みコンテキストのCookieとlocalStorageを保存します。これをrequest.newContextに渡すことで、再ログインせずにAPIコンテキストがそのセッションを再利用できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tùy chọn failOnStatusCode khi cấu hình request context có tác dụng gì?",
      "en": "What does the failOnStatusCode option do when configuring a request context?",
      "ja": "リクエストコンテキストを設定する際のfailOnStatusCodeオプションは何をしますか。"
    },
    "options": [
      {
        "vi": "Nếu bật, request sẽ throw exception khi response status ngoài phạm vi 2xx/3xx thay vì trả về response bình thường",
        "en": "When enabled, the request throws an exception if the response status is outside the 2xx/3xx range instead of returning a normal response",
        "ja": "有効にすると、レスポンスステータスが2xx/3xx範囲外の場合、通常のレスポンスを返す代わりに例外をスローする"
      },
      {
        "vi": "Chặn hoàn toàn các request có status ngoài 2xx, không cho gửi đi",
        "en": "Blocks any request with a status outside 2xx from being sent at all",
        "ja": "2xx以外のステータスになるリクエストの送信自体を完全にブロックする"
      },
      {
        "vi": "Tự động retry request khi gặp status lỗi",
        "en": "Automatically retries the request on an error status",
        "ja": "エラーステータスの際にリクエストを自動的にリトライする"
      },
      {
        "vi": "Ghi lại status code vào file report riêng",
        "en": "Logs the status code into a separate report file",
        "ja": "ステータスコードを別のレポートファイルに記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "failOnStatusCode=true khiến Playwright ném lỗi ngay khi status code không nằm trong 2xx/3xx, hữu ích để test tự fail sớm thay vì phải tự kiểm tra status trong từng assertion.",
      "en": "With failOnStatusCode=true, Playwright throws immediately when the status code isn't in the 2xx/3xx range, letting the test fail fast instead of manually checking status in every assertion.",
      "ja": "failOnStatusCode=trueにすると、ステータスコードが2xx/3xx範囲外の場合にPlaywrightが即座にエラーを投げるため、各アサーションでステータスを手動チェックせずにテストを早期に失敗させられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Lợi ích chính khi kết hợp gọi API để seed dữ liệu trước rồi mới kiểm tra trên UI (thay vì tạo dữ liệu hoàn toàn qua UI) là gì?",
      "en": "What is the main benefit of seeding data via API calls before verifying on the UI, instead of creating everything through the UI?",
      "ja": "UIですべて作成する代わりに、APIでデータを事前にシードしてからUIで検証することの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Giúp test trông chuyên nghiệp hơn khi báo cáo",
        "en": "Makes the test look more professional in reports",
        "ja": "レポート上でテストがより専門的に見える"
      },
      {
        "vi": "Setup nhanh hơn và ổn định hơn, không phụ thuộc vào các bước UI chậm và dễ flaky",
        "en": "Faster and more stable setup, independent of slow and flaky UI steps",
        "ja": "遅くフレーキーになりがちなUI手順に依存せず、セットアップがより速く安定する"
      },
      {
        "vi": "Bắt buộc phải làm vậy vì Playwright không cho phép tạo dữ liệu qua UI",
        "en": "It's mandatory because Playwright forbids creating data via the UI",
        "ja": "PlaywrightはUI経由でのデータ作成を禁止しているため必須である"
      },
      {
        "vi": "Giúp bỏ qua hoàn toàn bước assertion trên UI",
        "en": "Lets you skip UI assertions entirely",
        "ja": "UIでのアサーションを完全に省略できる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Gọi API để chuẩn bị dữ liệu tránh phải thao tác nhiều bước UI chậm và dễ lỗi, giúp test chạy nhanh, ổn định và tập trung vào phần cần kiểm thử thật sự.",
      "en": "Preparing data via API avoids many slow, error-prone UI steps, keeping tests fast, stable, and focused on the actual thing under test.",
      "ja": "APIでデータを準備することで、遅くエラーの起きやすい複数のUI操作を避けられ、テストが高速・安定し、本当に検証すべき部分に集中できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright Component Testing (@playwright/experimental-ct-react và tương đương cho Vue/Svelte) dùng để làm gì?",
      "en": "What is Playwright Component Testing (@playwright/experimental-ct-react and its Vue/Svelte equivalents) used for?",
      "ja": "Playwright Component Testing（@playwright/experimental-ct-reactおよびVue/Svelte向けの同等品）は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Test toàn bộ luồng nghiệp vụ end-to-end của ứng dụng",
        "en": "Testing the entire end-to-end business flow of an application",
        "ja": "アプリケーション全体のエンドツーエンド業務フローをテストする"
      },
      {
        "vi": "Kiểm tra hiệu năng server API",
        "en": "Checking API server performance",
        "ja": "APIサーバーのパフォーマンスを検証する"
      },
      {
        "vi": "Test một component UI riêng lẻ trong trình duyệt thật, không cần dựng toàn bộ ứng dụng",
        "en": "Testing a single UI component in a real browser without spinning up the whole application",
        "ja": "アプリケーション全体を起動せずに、実際のブラウザで単一のUIコンポーネントをテストする"
      },
      {
        "vi": "Thay thế hoàn toàn cho unit test bằng Jest",
        "en": "Fully replacing unit tests written with Jest",
        "ja": "Jestによるユニットテストを完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Component Testing cho phép mount và tương tác với một component đơn lẻ trong trình duyệt thật (thông qua bundler), giúp kiểm thử cô lập nhanh hơn so với chạy toàn bộ app.",
      "en": "Component Testing lets you mount and interact with a single component in a real browser (via a bundler), enabling faster isolated testing than running the whole app.",
      "ja": "コンポーネントテストは、バンドラーを介して実際のブラウザで単一コンポーネントをマウントし操作できるため、アプリ全体を実行するよりも高速な分離テストが可能です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright Component Testing, hàm mount() có vai trò gì?",
      "en": "In Playwright Component Testing, what role does the mount() function play?",
      "ja": "Playwright Component Testingにおいて、mount()関数はどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Chạy migration cho database test",
        "en": "Runs migrations for the test database",
        "ja": "テストデータベースのマイグレーションを実行する"
      },
      {
        "vi": "Chỉ dùng để mock API, không liên quan đến render UI",
        "en": "Is only used to mock APIs and has nothing to do with rendering UI",
        "ja": "APIをモックするためだけに使われ、UIレンダリングとは関係ない"
      },
      {
        "vi": "Biên dịch mã TypeScript sang JavaScript trước khi chạy test",
        "en": "Compiles TypeScript code to JavaScript before running tests",
        "ja": "テスト実行前にTypeScriptコードをJavaScriptにコンパイルする"
      },
      {
        "vi": "Render component vào DOM của trình duyệt thật và trả về locator để tương tác/kiểm tra",
        "en": "Renders the component into a real browser DOM and returns a locator to interact with/assert against",
        "ja": "コンポーネントを実際のブラウザDOMにレンダリングし、操作・検証用のロケーターを返す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "mount() render component thực sự vào trình duyệt và trả về một locator đại diện cho component gốc, cho phép click, gõ, và assertion giống như locator thông thường của Playwright.",
      "en": "mount() actually renders the component in the browser and returns a locator representing the root component, allowing clicks, typing, and assertions just like a normal Playwright locator.",
      "ja": "mount()はコンポーネントを実際にブラウザにレンダリングし、ルートコンポーネントを表すロケーターを返すため、通常のPlaywrightロケーターと同様にクリック、入力、アサーションが可能です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khác với môi trường JSDOM của một số framework test khác, Playwright Component Testing chạy component ở đâu?",
      "en": "Unlike the JSDOM environment used by some other test frameworks, where does Playwright Component Testing run the component?",
      "ja": "他のテストフレームワークが使うJSDOM環境とは異なり、Playwright Component Testingはコンポーネントをどこで実行しますか。"
    },
    "options": [
      {
        "vi": "Trong trình duyệt thật (Chromium/Firefox/WebKit) thông qua một bundler như Vite",
        "en": "In a real browser (Chromium/Firefox/WebKit) via a bundler such as Vite",
        "ja": "Viteなどのバンドラーを介した実際のブラウザ（Chromium/Firefox/WebKit）内"
      },
      {
        "vi": "Trong một sandbox Node.js giả lập DOM",
        "en": "In a Node.js sandbox that emulates the DOM",
        "ja": "DOMをエミュレートするNode.jsサンドボックス内"
      },
      {
        "vi": "Trên server Node bằng render server-side thuần túy",
        "en": "On the Node server using pure server-side rendering",
        "ja": "純粋なサーバーサイドレンダリングによるNodeサーバー上"
      },
      {
        "vi": "Trong worker thread riêng biệt không có DOM",
        "en": "In a separate worker thread with no DOM",
        "ja": "DOMを持たない別個のワーカースレッド内"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Component được build bằng bundler (ví dụ Vite) rồi mount và chạy thật trong trình duyệt, cho kết quả sát thực tế hơn so với môi trường giả lập DOM như JSDOM.",
      "en": "The component is built with a bundler (e.g. Vite) then mounted and run in a real browser, giving more realistic results than a simulated DOM environment like JSDOM.",
      "ja": "コンポーネントはバンドラー（Viteなど）でビルドされ、実際のブラウザでマウント・実行されるため、JSDOMのようなシミュレートされたDOM環境よりも実際に近い結果が得られます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điểm khác biệt chính giữa Component Testing và E2E Testing trong Playwright là gì?",
      "en": "What is the key difference between Component Testing and E2E Testing in Playwright?",
      "ja": "PlaywrightにおけるComponent TestingとE2E Testingの主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Component Testing chỉ chạy được trên Chromium, E2E chạy được trên cả 3 engine",
        "en": "Component Testing only runs on Chromium, while E2E runs on all three engines",
        "ja": "Component TestingはChromiumでのみ動作し、E2Eは3つのエンジンすべてで動作する"
      },
      {
        "vi": "Component Testing mount và cô lập một component đơn lẻ, còn E2E điều hướng qua toàn bộ trang/ứng dụng thật",
        "en": "Component Testing mounts and isolates a single component, while E2E navigates through the whole real page/application",
        "ja": "Component Testingは単一コンポーネントをマウントして分離するのに対し、E2Eは実際のページ/アプリケーション全体をナビゲートする"
      },
      {
        "vi": "E2E không thể kiểm tra được thao tác click hay nhập liệu",
        "en": "E2E cannot verify click or input interactions",
        "ja": "E2Eはクリックや入力操作を検証できない"
      },
      {
        "vi": "Component Testing không hỗ trợ assertion, chỉ hỗ trợ chụp ảnh màn hình",
        "en": "Component Testing does not support assertions, only screenshots",
        "ja": "Component Testingはアサーションをサポートせず、スクリーンショットのみをサポートする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Component Testing tập trung vào một component riêng lẻ, mount trực tiếp không cần load toàn bộ app, trong khi E2E test mô phỏng hành trình người dùng qua nhiều trang thật.",
      "en": "Component Testing focuses on a single component, mounted directly without loading the whole app, whereas E2E testing simulates a user journey across multiple real pages.",
      "ja": "Component Testingはアプリ全体をロードせず単一コンポーネントを直接マウントすることに焦点を当てるのに対し、E2Eテストは複数の実際のページにまたがるユーザーの行動をシミュレートします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cú pháp nào đúng để truyền props vào component khi mount trong Playwright Component Testing (React)?",
      "en": "Which syntax is correct for passing props to a component when mounting it in Playwright Component Testing (React)?",
      "ja": "Playwright Component Testing（React）でマウント時にコンポーネントにpropsを渡す正しい構文はどれですか。"
    },
    "options": [
      {
        "vi": "await mount(MyComponent, {props: undefined})",
        "en": "await mount(MyComponent, {props: undefined})",
        "ja": "await mount(MyComponent, {props: undefined})"
      },
      {
        "vi": "await page.setProps(MyComponent, value)",
        "en": "await page.setProps(MyComponent, value)",
        "ja": "await page.setProps(MyComponent, value)"
      },
      {
        "vi": "await mount(<MyComponent prop={value} />)",
        "en": "await mount(<MyComponent prop={value} />)",
        "ja": "await mount(<MyComponent prop={value} />)"
      },
      {
        "vi": "await mount.render(MyComponent).withProps(value)",
        "en": "await mount.render(MyComponent).withProps(value)",
        "ja": "await mount.render(MyComponent).withProps(value)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Với React, mount nhận trực tiếp JSX như trong React thông thường, ví dụ mount(<MyComponent prop={value} />), giúp cú pháp gần gũi với cách viết component test quen thuộc.",
      "en": "For React, mount accepts JSX directly just like normal React code, e.g. mount(<MyComponent prop={value} />), keeping the syntax familiar to typical component testing.",
      "ja": "Reactの場合、mountは通常のReactコードと同様にJSXを直接受け取ります。例：mount(<MyComponent prop={value} />)。これにより、一般的なコンポーネントテストの書き方に近い構文になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "File cấu hình playwright-ct.config (dành riêng cho Component Testing) thường cần khai báo thêm gì so với config E2E thông thường?",
      "en": "What does the playwright-ct.config file (specific to Component Testing) typically need to declare beyond a normal E2E config?",
      "ja": "（Component Testing専用の）playwright-ct.configファイルは、通常のE2E configに加えて通常何を追加で宣言する必要がありますか。"
    },
    "options": [
      {
        "vi": "Danh sách các trình duyệt di động cần test",
        "en": "A list of mobile browsers to test",
        "ja": "テストすべきモバイルブラウザのリスト"
      },
      {
        "vi": "Thông tin đăng nhập admin để chạy migration",
        "en": "Admin login credentials for running migrations",
        "ja": "マイグレーション実行用の管理者ログイン情報"
      },
      {
        "vi": "Danh sách các API endpoint cần mock sẵn",
        "en": "A list of API endpoints to pre-mock",
        "ja": "事前にモックすべきAPIエンドポイントのリスト"
      },
      {
        "vi": "Cấu hình bundler (ví dụ ctViteConfig/ctPort) và plugin tương ứng với framework UI (React/Vue/Svelte)",
        "en": "Bundler configuration (e.g. ctViteConfig/ctPort) and the plugin matching the UI framework (React/Vue/Svelte)",
        "ja": "バンドラー設定（例：ctViteConfig/ctPort）とUIフレームワーク（React/Vue/Svelte）に対応するプラグイン"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì Component Testing cần build component bằng bundler trước khi mount trong trình duyệt, config CT thường khai báo thêm cấu hình bundler và plugin phù hợp với framework UI đang dùng.",
      "en": "Since Component Testing needs to build the component with a bundler before mounting in the browser, CT config typically adds bundler configuration and a plugin matching the UI framework in use.",
      "ja": "Component Testingではブラウザでマウントする前にバンドラーでコンポーネントをビルドする必要があるため、CT configには通常、使用中のUIフレームワークに対応するバンドラー設定とプラグインが追加されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn kiểm tra một callback prop (ví dụ onClick) đã được component gọi khi người dùng tương tác, cách phổ biến trong Playwright CT là gì?",
      "en": "To verify a callback prop (e.g. onClick) was invoked by a component on user interaction, what is the common approach in Playwright CT?",
      "ja": "ユーザー操作時にコンポーネントによってコールバックprop（例：onClick）が呼び出されたことを検証する、Playwright CTでの一般的な方法は何ですか。"
    },
    "options": [
      {
        "vi": "Truyền một hàm giả (spy/stub) làm prop vào mount, sau đó trigger tương tác qua locator rồi kiểm tra hàm đã được gọi",
        "en": "Pass a fake function (spy/stub) as the prop into mount, trigger the interaction via the locator, then check the function was called",
        "ja": "モック関数（スパイ/スタブ）をpropとしてmountに渡し、ロケーター経由で操作をトリガーした後、関数が呼び出されたか確認する"
      },
      {
        "vi": "Không thể kiểm tra callback trong Component Testing",
        "en": "Callbacks cannot be verified in Component Testing",
        "ja": "Component Testingではコールバックを検証できない"
      },
      {
        "vi": "Chỉ có thể kiểm tra bằng cách đọc log console.log thủ công",
        "en": "It can only be verified by manually reading console.log output",
        "ja": "console.logの出力を手動で確認する方法でしか検証できない"
      },
      {
        "vi": "Phải chuyển sang viết E2E test mới kiểm tra được callback",
        "en": "You must switch to writing an E2E test to verify callbacks",
        "ja": "コールバックを検証するにはE2Eテストに切り替える必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Giống cách test component UI thông thường, ta truyền hàm giả làm prop, sau khi tương tác (ví dụ click qua locator của Playwright) thì kiểm tra hàm giả đã được gọi với tham số mong muốn.",
      "en": "Similar to typical UI component testing, you pass a fake function as a prop, then after interacting (e.g. clicking via a Playwright locator) verify the fake function was called with the expected arguments.",
      "ja": "一般的なUIコンポーネントテストと同様に、モック関数をpropとして渡し、操作（例：Playwrightロケーター経由のクリック）後にそのモック関数が期待する引数で呼び出されたかを確認します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để gửi file kèm request (multipart/form-data) qua APIRequestContext, cách viết đúng là gì?",
      "en": "To send a file with a request (multipart/form-data) via APIRequestContext, what is the correct syntax?",
      "ja": "APIRequestContext経由でファイルを添付したリクエスト（multipart/form-data）を送信する正しい構文は何ですか。"
    },
    "options": [
      {
        "vi": "Truyền option {data: fileBuffer} như JSON thông thường",
        "en": "Pass the option {data: fileBuffer} like a normal JSON body",
        "ja": "通常のJSONボディのように{data: fileBuffer}オプションを渡す"
      },
      {
        "vi": "Truyền option {multipart: {file: {name, mimeType, buffer}}}",
        "en": "Pass the option {multipart: {file: {name, mimeType, buffer}}}",
        "ja": "{multipart: {file: {name, mimeType, buffer}}}オプションを渡す"
      },
      {
        "vi": "Playwright không hỗ trợ upload file qua request context, chỉ hỗ trợ qua UI setInputFiles",
        "en": "Playwright does not support file upload via request context, only via UI setInputFiles",
        "ja": "Playwrightはrequestコンテキスト経由のファイルアップロードをサポートせず、UIのsetInputFilesのみサポートする"
      },
      {
        "vi": "Phải tự viết header Content-Type: multipart/form-data thủ công vì Playwright không tự set",
        "en": "You must manually write the Content-Type: multipart/form-data header since Playwright does not set it automatically",
        "ja": "PlaywrightはContent-Type: multipart/form-dataを自動設定しないため、手動で書く必要がある"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright hỗ trợ option multipart trong các phương thức request để gửi dữ liệu dạng form kèm file, tự động set boundary và Content-Type phù hợp mà không cần cấu hình thủ công.",
      "en": "Playwright supports a multipart option in its request methods to send form data with files, automatically setting the correct boundary and Content-Type without manual configuration.",
      "ja": "Playwrightのリクエストメソッドはmultipartオプションをサポートしており、ファイル付きのフォームデータを送信する際、境界文字列やContent-Typeを手動設定なしで自動的に適切に設定します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi khai báo baseURL cho APIRequestContext, lợi ích chính là gì?",
      "en": "When declaring a baseURL for an APIRequestContext, what is the main benefit?",
      "ja": "APIRequestContextにbaseURLを宣言する主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Tự động retry request khi baseURL không phản hồi",
        "en": "Automatically retries the request when the baseURL is unresponsive",
        "ja": "baseURLが応答しない場合にリクエストを自動的にリトライする"
      },
      {
        "vi": "Bắt buộc tất cả request phải dùng HTTPS",
        "en": "Forces all requests to use HTTPS",
        "ja": "すべてのリクエストにHTTPSの使用を強制する"
      },
      {
        "vi": "Cho phép gọi endpoint bằng đường dẫn tương đối, Playwright tự nối với baseURL đã khai báo",
        "en": "Allows calling endpoints with relative paths, since Playwright automatically prepends the declared baseURL",
        "ja": "エンドポイントを相対パスで呼び出せるようになり、Playwrightが宣言済みのbaseURLを自動的に付加する"
      },
      {
        "vi": "Giới hạn số lượng request tối đa gửi tới server",
        "en": "Limits the maximum number of requests sent to the server",
        "ja": "サーバーに送信できる最大リクエスト数を制限する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "baseURL giúp code test ngắn gọn hơn: chỉ cần viết path tương đối như '/users' thay vì URL đầy đủ mỗi lần gọi, Playwright tự động ghép với baseURL đã cấu hình.",
      "en": "baseURL keeps test code concise: you only write a relative path like '/users' instead of the full URL each time, and Playwright automatically joins it with the configured baseURL.",
      "ja": "baseURLはテストコードを簡潔にします。毎回フルURLを書く代わりに'/users'のような相対パスを書くだけで、Playwrightが設定済みのbaseURLと自動的に結合します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn giới hạn thời gian chờ cho riêng một lệnh gọi apiContext.get() cụ thể (khác với timeout mặc định của toàn test), nên làm gì?",
      "en": "To limit the wait time for one specific apiContext.get() call (different from the test's default timeout), what should you do?",
      "ja": "特定のapiContext.get()呼び出しに対してのみ待機時間を制限したい（テストのデフォルトタイムアウトとは別に）場合、どうすべきですか。"
    },
    "options": [
      {
        "vi": "Không thể set timeout riêng cho từng request, chỉ có timeout toàn cục",
        "en": "Per-request timeouts are not possible; only a global timeout exists",
        "ja": "リクエストごとのタイムアウトは設定できず、グローバルタイムアウトのみ存在する"
      },
      {
        "vi": "Sửa timeout mặc định trong playwright.config, áp dụng cho tất cả request",
        "en": "Change the default timeout in playwright.config, applying it to all requests",
        "ja": "playwright.configのデフォルトタイムアウトを変更し、すべてのリクエストに適用する"
      },
      {
        "vi": "Dùng test.setTimeout() để đổi timeout của toàn bộ file test",
        "en": "Use test.setTimeout() to change the timeout for the whole test file",
        "ja": "test.setTimeout()を使ってテストファイル全体のタイムアウトを変更する"
      },
      {
        "vi": "Truyền option {timeout: ms} trực tiếp vào lệnh gọi get/post/put/delete đó",
        "en": "Pass the option {timeout: ms} directly into that get/post/put/delete call",
        "ja": "そのget/post/put/delete呼び出しに直接{timeout: ms}オプションを渡す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các phương thức của APIRequestContext như get/post đều nhận option timeout riêng cho từng lệnh gọi, cho phép tinh chỉnh thời gian chờ theo từng API cụ thể mà không ảnh hưởng test khác.",
      "en": "APIRequestContext methods like get/post accept a per-call timeout option, allowing fine-tuning of wait time for a specific API without affecting other tests.",
      "ja": "get/postなどのAPIRequestContextメソッドは呼び出しごとのtimeoutオプションを受け取れるため、他のテストに影響を与えずに特定のAPIの待機時間を調整できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy test API song song với nhiều worker trong CI, điều gì cần đặc biệt lưu ý để tránh flaky?",
      "en": "When running API tests in parallel across multiple CI workers, what needs special attention to avoid flakiness?",
      "ja": "CIで複数ワーカーを使いAPIテストを並列実行する際、フレーキーを避けるために特に注意すべき点は何ですか。"
    },
    "options": [
      {
        "vi": "Mỗi worker/test nên dùng dữ liệu hoặc tài nguyên riêng biệt, tránh cùng thao tác ghi trên chung một bản ghi để hạn chế race condition",
        "en": "Each worker/test should use separate data or resources, avoiding concurrent writes to the same record to limit race conditions",
        "ja": "各ワーカー/テストは別々のデータやリソースを使用し、同じレコードへの同時書き込みを避けて競合状態を減らすべきである"
      },
      {
        "vi": "Chỉ cần tăng số lượng worker càng nhiều càng tốt",
        "en": "Simply increasing the number of workers as much as possible",
        "ja": "ワーカー数をできるだけ多く増やすだけでよい"
      },
      {
        "vi": "Không cần lưu ý gì vì Playwright tự động cô lập mọi dữ liệu server",
        "en": "Nothing in particular, since Playwright automatically isolates all server-side data",
        "ja": "Playwrightがサーバー側のデータをすべて自動的に分離するため、特に注意は不要"
      },
      {
        "vi": "Nên tắt hẳn chế độ song song khi test có gọi API",
        "en": "Parallelism should be disabled entirely whenever tests call APIs",
        "ja": "APIを呼び出すテストがある場合は並列実行を完全に無効化すべきである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì server thường dùng chung giữa các worker, nếu nhiều test cùng ghi/sửa một bản ghi dữ liệu sẽ dễ gây race condition; nên tạo dữ liệu riêng cho từng test/worker để chạy song song an toàn.",
      "en": "Since the server is typically shared across workers, multiple tests writing to the same record easily causes race conditions; creating separate data per test/worker keeps parallel runs safe.",
      "ja": "サーバーは通常ワーカー間で共有されるため、複数のテストが同じレコードに書き込むと競合状態が発生しやすくなります。テスト/ワーカーごとに別々のデータを作成することで、並列実行を安全に行えます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vì sao nên tránh dùng chung một APIRequestContext duy nhất cho nhiều test có thao tác ghi dữ liệu (POST/PUT/DELETE) khác nhau?",
      "en": "Why should you avoid sharing a single APIRequestContext across multiple tests that perform different write operations (POST/PUT/DELETE)?",
      "ja": "異なる書き込み操作（POST/PUT/DELETE）を行う複数のテストで単一のAPIRequestContextを共有すべきでない理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì APIRequestContext chỉ hỗ trợ tối đa 1 request duy nhất",
        "en": "Because an APIRequestContext supports only a single request at most",
        "ja": "APIRequestContextは最大1回のリクエストしかサポートしないため"
      },
      {
        "vi": "Vì trạng thái (cookie/session) và dữ liệu có thể bị ảnh hưởng chéo giữa các test, dẫn tới kết quả không ổn định (flaky)",
        "en": "Because state (cookies/session) and data can bleed across tests, leading to unstable (flaky) results",
        "ja": "状態（Cookie/セッション）とデータがテスト間で相互に影響し合い、結果が不安定（フレーキー）になる可能性があるため"
      },
      {
        "vi": "Vì mỗi APIRequestContext chỉ được dùng cho phương thức GET",
        "en": "Because each APIRequestContext can only be used with the GET method",
        "ja": "各APIRequestContextはGETメソッドでしか使用できないため"
      },
      {
        "vi": "Vì Playwright giới hạn số request tối đa là 10 cho mỗi context",
        "en": "Because Playwright limits each context to a maximum of 10 requests",
        "ja": "Playwrightは各コンテキストのリクエスト数を最大10回に制限しているため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi nhiều test cùng ghi dữ liệu qua chung một context, thứ tự thực thi và trạng thái dữ liệu có thể ảnh hưởng lẫn nhau, gây kết quả test không nhất quán giữa các lần chạy.",
      "en": "When multiple tests write data through a shared context, execution order and data state can interfere with one another, causing inconsistent results across runs.",
      "ja": "複数のテストが共有コンテキストを通じてデータを書き込むと、実行順序やデータ状態が互いに干渉し、実行ごとに結果が一貫しなくなる可能性があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tùy chọn ignoreHTTPSErrors khi tạo request context thường hữu ích trong tình huống nào?",
      "en": "When is the ignoreHTTPSErrors option useful when creating a request context?",
      "ja": "リクエストコンテキスト作成時のignoreHTTPSErrorsオプションはどのような状況で役立ちますか。"
    },
    "options": [
      {
        "vi": "Khi cần bỏ qua lỗi cú pháp JSON trong response",
        "en": "When you need to skip JSON syntax errors in the response",
        "ja": "レスポンスのJSON構文エラーをスキップする必要がある場合"
      },
      {
        "vi": "Khi muốn tắt hoàn toàn giao thức HTTPS trên server production",
        "en": "When you want to fully disable the HTTPS protocol on a production server",
        "ja": "本番サーバーでHTTPSプロトコルを完全に無効化したい場合"
      },
      {
        "vi": "Khi gọi tới server dùng chứng chỉ tự ký (self-signed certificate) ở môi trường test/staging",
        "en": "When calling a server using a self-signed certificate in a test/staging environment",
        "ja": "テスト/ステージング環境で自己署名証明書を使用するサーバーを呼び出す場合"
      },
      {
        "vi": "Khi cần tăng tốc độ phản hồi của API gấp đôi",
        "en": "When you need to double the API response speed",
        "ja": "APIのレスポンス速度を2倍にする必要がある場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Môi trường test/staging thường dùng chứng chỉ tự ký khiến trình duyệt/HTTP client báo lỗi SSL; ignoreHTTPSErrors cho phép request bỏ qua cảnh báo này để test không bị chặn.",
      "en": "Test/staging environments often use self-signed certificates that trigger SSL errors; ignoreHTTPSErrors lets requests bypass this warning so tests aren't blocked.",
      "ja": "テスト/ステージング環境では自己署名証明書がよく使われ、SSLエラーが発生します。ignoreHTTPSErrorsを使うとこの警告を回避してリクエストを送れるため、テストがブロックされません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Kết quả trả về từ apiContext.get(url) là một đối tượng có kiểu gì và chứa những gì?",
      "en": "What type of object does apiContext.get(url) return, and what does it contain?",
      "ja": "apiContext.get(url)はどのような型のオブジェクトを返し、何を含んでいますか。"
    },
    "options": [
      {
        "vi": "Một chuỗi text thuần chứa toàn bộ nội dung response",
        "en": "A plain text string containing the entire response body",
        "ja": "レスポンス全体を含むプレーンなテキスト文字列"
      },
      {
        "vi": "Một Promise<void>, không trả về dữ liệu gì cả",
        "en": "A Promise<void> that returns no data at all",
        "ja": "何もデータを返さないPromise<void>"
      },
      {
        "vi": "Một object DOM giống như trả về từ page.locator()",
        "en": "A DOM-like object similar to what page.locator() returns",
        "ja": "page.locator()が返すもののようなDOMライクなオブジェクト"
      },
      {
        "vi": "Một APIResponse chứa các phương thức status(), headers(), json(), text(), body()",
        "en": "An APIResponse object with methods like status(), headers(), json(), text(), body()",
        "ja": "status()、headers()、json()、text()、body()などのメソッドを持つAPIResponseオブジェクト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "apiContext.get() trả về một APIResponse với các phương thức tiện lợi để lấy status, headers, và body dưới nhiều định dạng (json, text, buffer) phục vụ assertion.",
      "en": "apiContext.get() returns an APIResponse with convenient methods to retrieve the status, headers, and body in multiple formats (json, text, buffer) for assertions.",
      "ja": "apiContext.get()は、アサーションのためにステータス、ヘッダー、複数形式（json、text、buffer）のボディを取得できる便利なメソッドを持つAPIResponseを返します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright Component Testing, muốn kiểm tra component đã hiển thị đúng đoạn văn bản mong muốn sau khi mount, cách làm phổ biến là gì?",
      "en": "In Playwright Component Testing, what is the common way to verify a component rendered the expected text after mounting?",
      "ja": "Playwright Component Testingで、マウント後にコンポーネントが期待するテキストを表示しているかを検証する一般的な方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng locator trả về từ mount() rồi gọi expect(locator).toHaveText(...) giống locator thông thường",
        "en": "Use the locator returned by mount() and call expect(locator).toHaveText(...), just like a normal locator",
        "ja": "mount()が返すロケーターを使い、通常のロケーターと同様にexpect(locator).toHaveText(...)を呼ぶ"
      },
      {
        "vi": "Phải viết snapshot test riêng bằng thư viện bên thứ ba vì Playwright CT không hỗ trợ kiểm tra text",
        "en": "You must write a separate snapshot test using a third-party library, since Playwright CT doesn't support text checks",
        "ja": "Playwright CTはテキストチェックをサポートしないため、サードパーティライブラリで別途スナップショットテストを書く必要がある"
      },
      {
        "vi": "Chỉ có thể kiểm tra bằng cách chụp screenshot rồi so sánh ảnh bằng mắt",
        "en": "It can only be checked by taking a screenshot and visually comparing images",
        "ja": "スクリーンショットを撮って目視で画像比較するしかない"
      },
      {
        "vi": "Gọi console.log(component.innerHTML) rồi đọc thủ công trong terminal",
        "en": "Call console.log(component.innerHTML) and read it manually in the terminal",
        "ja": "console.log(component.innerHTML)を呼び出しターミナルで手動確認する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "mount() trả về một locator của Playwright, nên có thể dùng toàn bộ hệ sinh thái assertion sẵn có như toHaveText, toBeVisible... để kiểm tra nội dung hiển thị của component.",
      "en": "mount() returns a regular Playwright locator, so the full existing assertion ecosystem such as toHaveText, toBeVisible, etc. can be used to verify the component's rendered content.",
      "ja": "mount()は通常のPlaywrightロケーターを返すため、toHaveTextやtoBeVisibleなど既存のアサーションエコシステムをそのまま使ってコンポーネントの表示内容を検証できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi cần test một API endpoint yêu cầu nhiều vai trò khác nhau (ví dụ admin và user thường) trong cùng một file test, cách tiếp cận hợp lý là gì?",
      "en": "When testing an API endpoint that requires different roles (e.g. admin and regular user) within the same test file, what is a sensible approach?",
      "ja": "同じテストファイル内で異なるロール（管理者と一般ユーザーなど）を必要とするAPIエンドポイントをテストする場合、妥当なアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Dùng chung 1 context rồi liên tục đổi header Authorization giữa các assertion",
        "en": "Use a single shared context and repeatedly swap the Authorization header between assertions",
        "ja": "1つの共有コンテキストを使い、アサーションの間でAuthorizationヘッダーを何度も切り替える"
      },
      {
        "vi": "Tạo nhiều APIRequestContext riêng biệt, mỗi context gắn với storageState/headers tương ứng với từng vai trò",
        "en": "Create several separate APIRequestContext instances, each bound to the storageState/headers matching a role",
        "ja": "それぞれのロールに対応するstorageState/headersを持つ複数の独立したAPIRequestContextを作成する"
      },
      {
        "vi": "Không thể test nhiều vai trò trong cùng 1 file, phải tách ra nhiều file riêng",
        "en": "Testing multiple roles in one file is impossible; they must be split into separate files",
        "ja": "1つのファイルで複数のロールをテストすることはできず、別ファイルに分ける必要がある"
      },
      {
        "vi": "Chạy test với quyền admin trước rồi hạ quyền bằng cách xoá cookie hoàn toàn",
        "en": "Run the test as admin first, then downgrade permissions by fully deleting cookies",
        "ja": "まず管理者権限でテストを実行し、その後Cookieを完全に削除して権限を下げる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tạo riêng mỗi APIRequestContext cho từng vai trò (kèm storageState/headers phù hợp) giúp test rõ ràng, tránh nhầm lẫn trạng thái đăng nhập giữa các vai trò khác nhau trong cùng file.",
      "en": "Creating a separate APIRequestContext for each role (with matching storageState/headers) keeps tests clear and avoids mixing up login state between roles in the same file.",
      "ja": "各ロールごとに（対応するstorageState/headersを持つ）独立したAPIRequestContextを作成することで、同じファイル内で異なるロール間のログイン状態が混同されるのを避け、テストが明確になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, khi gọi `expect(page).toHaveScreenshot()` mà chưa có ảnh baseline, hành vi mặc định là gì?",
      "en": "In Playwright, when calling `expect(page).toHaveScreenshot()` without an existing baseline image, what is the default behavior?",
      "ja": "Playwrightで`expect(page).toHaveScreenshot()`を呼び出したとき、ベースライン画像がまだ存在しない場合、デフォルトの動作はどうなりますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua assertion và log cảnh báo",
        "en": "It skips the assertion and logs a warning",
        "ja": "アサーションをスキップして警告を記録する"
      },
      {
        "vi": "So sánh với ảnh trống và luôn pass",
        "en": "It compares against a blank image and always passes",
        "ja": "空の画像と比較し、常に成功する"
      },
      {
        "vi": "Tự động chụp ảnh và lưu làm baseline mới, đồng thời báo test fail để nhắc commit ảnh",
        "en": "It captures the screenshot, saves it as the new baseline, and fails the test to prompt committing the image",
        "ja": "スクリーンショットを撮影して新しいベースラインとして保存し、画像をコミットするよう促すためテストを失敗させる"
      },
      {
        "vi": "Yêu cầu nhập baseline thủ công qua terminal",
        "en": "It prompts for manual baseline input via the terminal",
        "ja": "ターミナル経由で手動のベースライン入力を要求する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi chưa có baseline, Playwright chụp ảnh hiện tại, lưu thành file baseline mới trong thư mục snapshot, nhưng vẫn báo fail lần chạy đó để buộc người dùng review và commit ảnh vào repo.",
      "en": "Without a baseline, Playwright captures the current screenshot, writes it as the new baseline file in the snapshot folder, but still fails that run so the user must review and commit the image.",
      "ja": "ベースラインがない場合、Playwrightは現在のスクリーンショットを撮影しスナップショットフォルダに新しいベースラインとして保存しますが、その実行は失敗として報告され、ユーザーに確認とコミットを促します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `maxDiffPixelRatio` trong cấu hình `toHaveScreenshot` dùng để làm gì?",
      "en": "What does the `maxDiffPixelRatio` option in `toHaveScreenshot` configuration control?",
      "ja": "`toHaveScreenshot`設定の`maxDiffPixelRatio`オプションは何を制御しますか。"
    },
    "options": [
      {
        "vi": "Giới hạn thời gian chờ tối đa trước khi so sánh ảnh",
        "en": "Limits the maximum wait time before comparing images",
        "ja": "画像比較前の最大待機時間を制限する"
      },
      {
        "vi": "Quy định số lần thử lại khi so sánh ảnh thất bại",
        "en": "Defines the number of retries when the image comparison fails",
        "ja": "画像比較が失敗した場合の再試行回数を定義する"
      },
      {
        "vi": "Đặt tỉ lệ thu phóng của ảnh chụp so với kích thước thật",
        "en": "Sets the zoom scale of the screenshot relative to actual size",
        "ja": "実際のサイズに対するスクリーンショットの拡大縮小率を設定する"
      },
      {
        "vi": "Giới hạn tỉ lệ pixel khác biệt cho phép so với tổng số pixel của ảnh",
        "en": "Limits the allowed ratio of differing pixels relative to the total pixel count of the image",
        "ja": "画像の総ピクセル数に対して許容される差分ピクセルの割合を制限する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "`maxDiffPixelRatio` là ngưỡng tỉ lệ (0 đến 1) số pixel khác biệt trên tổng số pixel; nếu vượt ngưỡng thì test fail, giúp linh hoạt hơn `maxDiffPixels` khi ảnh có kích thước thay đổi.",
      "en": "`maxDiffPixelRatio` is a threshold (0 to 1) for the fraction of differing pixels over the total pixel count; exceeding it fails the test, offering more flexibility than `maxDiffPixels` for images of varying size.",
      "ja": "`maxDiffPixelRatio`は総ピクセル数に対する差分ピクセルの割合の閾値（0〜1）で、これを超えるとテストが失敗します。画像サイズが変わる場合、`maxDiffPixels`より柔軟です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, tuỳ chọn `threshold` (0 đến 1) trong so sánh ảnh visual regression điều chỉnh điều gì ở cấp độ từng pixel?",
      "en": "In Playwright, what does the `threshold` option (0 to 1) in visual comparison adjust at the per-pixel level?",
      "ja": "Playwrightにおいて、視覚比較の`threshold`オプション（0〜1）はピクセル単位で何を調整しますか。"
    },
    "options": [
      {
        "vi": "Độ nhạy màu sắc cho phép giữa pixel tương ứng của hai ảnh trước khi bị tính là khác biệt",
        "en": "The allowed color sensitivity between corresponding pixels of two images before they count as different",
        "ja": "2つの画像の対応するピクセル間で、異なると判定される前に許容される色の感度"
      },
      {
        "vi": "Số lượng luồng CPU dùng để xử lý so sánh ảnh song song",
        "en": "The number of CPU threads used to process image comparison in parallel",
        "ja": "画像比較を並列処理するために使用するCPUスレッド数"
      },
      {
        "vi": "Độ phân giải tối thiểu của ảnh baseline được chấp nhận",
        "en": "The minimum accepted resolution of the baseline image",
        "ja": "許容されるベースライン画像の最小解像度"
      },
      {
        "vi": "Thời gian chờ animation hoàn tất trước khi chụp ảnh",
        "en": "The wait time for animations to finish before taking the screenshot",
        "ja": "スクリーンショット撮影前にアニメーションが完了するのを待つ時間"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "`threshold` là tham số của thuật toán pixelmatch, quy định mức khác biệt màu (theo không gian YIQ) tối đa giữa một cặp pixel tương ứng để vẫn coi là giống nhau, tách biệt với `maxDiffPixels`/`maxDiffPixelRatio` là ngưỡng tổng thể.",
      "en": "`threshold` is a pixelmatch algorithm parameter controlling the maximum color difference (in YIQ space) between a corresponding pixel pair to still be considered matching, distinct from the overall thresholds `maxDiffPixels`/`maxDiffPixelRatio`.",
      "ja": "`threshold`はpixelmatchアルゴリズムのパラメータで、対応するピクセルペア間で一致とみなされる最大の色差（YIQ空間）を制御します。全体閾値である`maxDiffPixels`/`maxDiffPixelRatio`とは区別されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi chạy Playwright test tạo baseline ảnh trên máy macOS của lập trình viên rồi đem lên CI chạy trên Linux Docker, hiện tượng gì thường xảy ra và cách khắc phục phổ biến là gì?",
      "en": "When generating baseline screenshots on a developer's macOS machine and then running on a Linux Docker CI, what commonly happens and what is the typical fix?",
      "ja": "開発者のmacOSマシンでベースラインスクリーンショットを生成し、Linux DockerのCIで実行した場合、一般的に何が起こり、典型的な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Không có vấn đề gì vì Playwright chuẩn hoá ảnh theo nền tảng tự động",
        "en": "There is no issue because Playwright automatically normalizes images across platforms",
        "ja": "Playwrightがプラットフォーム間で画像を自動的に正規化するため問題は発生しない"
      },
      {
        "vi": "Sai lệch do khác biệt font rendering, GPU/anti-aliasing giữa hệ điều hành; khắc phục bằng cách chạy Docker image chính thức của Playwright cả khi tạo lẫn khi kiểm tra baseline",
        "en": "Diffs occur due to font rendering and GPU/anti-aliasing differences between OSes; fixed by using the official Playwright Docker image both to generate and verify baselines",
        "ja": "OS間のフォントレンダリングやGPU/アンチエイリアシングの違いにより差分が発生する。公式のPlaywright Dockerイメージをベースライン生成時と検証時の両方で使用することで解決する"
      },
      {
        "vi": "Ảnh baseline mất hoàn toàn và Playwright tự tạo lại ngẫu nhiên",
        "en": "The baseline image is completely lost and Playwright regenerates it randomly",
        "ja": "ベースライン画像が完全に失われ、Playwrightがランダムに再生成する"
      },
      {
        "vi": "Playwright sẽ tự chuyển sang so sánh DOM thay vì ảnh khi phát hiện khác hệ điều hành",
        "en": "Playwright automatically switches to DOM comparison instead of image comparison when it detects a different OS",
        "ja": "異なるOSを検出すると、Playwrightは自動的に画像比較からDOM比較に切り替える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Rendering font, subpixel anti-aliasing và driver GPU khác nhau giữa macOS và Linux khiến ảnh lệch pixel dù nội dung giống hệt; giải pháp chuẩn là luôn dùng cùng Docker image Playwright (ví dụ `mcr.microsoft.com/playwright`) để tạo và kiểm tra baseline nhất quán.",
      "en": "Font rendering, subpixel anti-aliasing, and GPU drivers differ between macOS and Linux, causing pixel-level mismatches even with identical content; the standard fix is always using the same Playwright Docker image (e.g. `mcr.microsoft.com/playwright`) for consistent baseline generation and verification.",
      "ja": "macOSとLinuxではフォントレンダリング、サブピクセルのアンチエイリアシング、GPUドライバーが異なるため、内容が同一でもピクセル単位のずれが生じます。標準的な解決策は、常に同じPlaywright Dockerイメージ（例：`mcr.microsoft.com/playwright`）を使ってベースラインの生成と検証を一貫させることです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cờ dòng lệnh nào dùng để cập nhật lại toàn bộ ảnh baseline sau khi giao diện thay đổi có chủ đích?",
      "en": "Which command-line flag is used to update all baseline screenshots after an intentional UI change?",
      "ja": "意図的なUI変更後にすべてのベースラインスクリーンショットを更新するために使用するコマンドラインフラグはどれですか。"
    },
    "options": [
      {
        "vi": "`npx playwright screenshot --force`",
        "en": "`npx playwright screenshot --force`",
        "ja": "`npx playwright screenshot --force`"
      },
      {
        "vi": "`npx playwright test --refresh-baseline`",
        "en": "`npx playwright test --refresh-baseline`",
        "ja": "`npx playwright test --refresh-baseline`"
      },
      {
        "vi": "`npx playwright test --update-snapshots`",
        "en": "`npx playwright test --update-snapshots`",
        "ja": "`npx playwright test --update-snapshots`"
      },
      {
        "vi": "`npx playwright test --reset-images`",
        "en": "`npx playwright test --reset-images`",
        "ja": "`npx playwright test --reset-images`"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "`--update-snapshots` (viết tắt `-u`) khiến Playwright ghi đè ảnh baseline hiện có bằng ảnh mới chụp được, dùng khi thay đổi UI là có chủ ý và cần review commit lại ảnh.",
      "en": "`--update-snapshots` (shorthand `-u`) makes Playwright overwrite existing baseline images with newly captured ones, used when UI changes are intentional and images need to be reviewed and committed.",
      "ja": "`--update-snapshots`（省略形`-u`）は、Playwrightに既存のベースライン画像を新しく撮影した画像で上書きさせます。UI変更が意図的で、画像をレビューしてコミットし直す必要がある場合に使用します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright đặt tên file ảnh baseline theo mẫu như thế nào để tránh xung đột khi chạy trên nhiều trình duyệt/hệ điều hành?",
      "en": "How does Playwright name baseline screenshot files to avoid conflicts when running across multiple browsers/operating systems?",
      "ja": "複数のブラウザ/OSで実行する際の競合を避けるため、Playwrightはベースラインスクリーンショットのファイル名をどのように命名しますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng tên test, ghi đè lẫn nhau giữa các trình duyệt",
        "en": "Only using the test name, overwriting between browsers",
        "ja": "テスト名のみを使用し、ブラウザ間で上書きされる"
      },
      {
        "vi": "Tự động nén tất cả ảnh vào một file zip duy nhất",
        "en": "Automatically compressing all images into a single zip file",
        "ja": "すべての画像を単一のzipファイルに自動圧縮する"
      },
      {
        "vi": "Đặt tên ngẫu nhiên bằng UUID mỗi lần chạy",
        "en": "Naming randomly with a UUID on every run",
        "ja": "実行ごとにUUIDでランダムに命名する"
      },
      {
        "vi": "Thêm hậu tố tên project/trình duyệt và platform vào tên file, ví dụ `-chromium-darwin.png`",
        "en": "Appending the project/browser name and platform as a suffix to the filename, e.g. `-chromium-darwin.png`",
        "ja": "プロジェクト/ブラウザ名とプラットフォームをファイル名にサフィックスとして追加する、例：`-chromium-darwin.png`"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Theo mặc định, tên snapshot bao gồm hậu tố platform (và tên project nếu có nhiều browser) để mỗi tổ hợp có baseline riêng, tránh so sánh chéo giữa Chromium/Firefox/WebKit hay giữa Windows/macOS/Linux.",
      "en": "By default, snapshot names include a platform suffix (and project name for multiple browsers) so each combination has its own baseline, avoiding cross-comparison between Chromium/Firefox/WebKit or Windows/macOS/Linux.",
      "ja": "デフォルトでは、スナップショット名にプラットフォームのサフィックス（複数ブラウザの場合はプロジェクト名も）が含まれ、各組み合わせが独自のベースラインを持つため、Chromium/Firefox/WebKit間やWindows/macOS/Linux間の誤った比較を避けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `animations: 'disabled'` trong `toHaveScreenshot` có tác dụng gì?",
      "en": "What does the `animations: 'disabled'` option in `toHaveScreenshot` do?",
      "ja": "`toHaveScreenshot`の`animations: 'disabled'`オプションは何をしますか。"
    },
    "options": [
      {
        "vi": "Chuyển tất cả CSS animation và transition về trạng thái kết thúc ngay lập tức để tránh ảnh bị chụp giữa chừng",
        "en": "Finishes all CSS animations and transitions instantly to avoid capturing mid-animation frames",
        "ja": "すべてのCSSアニメーションとトランジションを即座に終了状態にし、アニメーション途中のフレームが撮影されるのを防ぐ"
      },
      {
        "vi": "Tắt hoàn toàn JavaScript trên trang trước khi chụp",
        "en": "Completely disables JavaScript on the page before capturing",
        "ja": "キャプチャ前にページ上のJavaScriptを完全に無効化する"
      },
      {
        "vi": "Xoá toàn bộ phần tử có class `animate` khỏi DOM",
        "en": "Removes all elements with the `animate` class from the DOM",
        "ja": "`animate`クラスを持つすべての要素をDOMから削除する"
      },
      {
        "vi": "Vô hiệu hoá auto-waiting của Playwright khi thao tác chuột",
        "en": "Disables Playwright's auto-waiting during mouse interactions",
        "ja": "マウス操作時のPlaywrightの自動待機を無効化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "`animations: 'disabled'` khiến Playwright chèn CSS để finite animation/transition kết thúc ngay và vô hiệu infinite animation, giúp ảnh so sánh ổn định thay vì bị flaky do trạng thái animation ngẫu nhiên.",
      "en": "`animations: 'disabled'` makes Playwright inject CSS to instantly finish finite animations/transitions and disable infinite ones, producing stable comparison screenshots instead of flaky results from random animation states.",
      "ja": "`animations: 'disabled'`は、Playwrightが有限のアニメーション/トランジションを即座に終了させ、無限アニメーションを無効化するCSSを挿入し、ランダムなアニメーション状態によるフレーキーな結果ではなく安定した比較用スクリーンショットを生成します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `mask` trong `toHaveScreenshot` được dùng khi nào?",
      "en": "When is the `mask` option in `toHaveScreenshot` used?",
      "ja": "`toHaveScreenshot`の`mask`オプションはどのような場合に使用しますか。"
    },
    "options": [
      {
        "vi": "Khi cần nén ảnh baseline để giảm dung lượng repo",
        "en": "When you need to compress baseline images to reduce repo size",
        "ja": "リポジトリのサイズを減らすためにベースライン画像を圧縮する場合"
      },
      {
        "vi": "Khi cần che phủ (bằng ô màu hồng) các vùng nội dung động như đồng hồ, quảng cáo, avatar ngẫu nhiên để chúng không ảnh hưởng đến kết quả so sánh",
        "en": "When you need to cover (with a pink box) dynamic content areas like clocks, ads, or random avatars so they don't affect the comparison result",
        "ja": "時計、広告、ランダムなアバターなどの動的なコンテンツ領域を（ピンクのボックスで）隠し、比較結果に影響しないようにする場合"
      },
      {
        "vi": "Khi cần chuyển ảnh sang định dạng WebP thay vì PNG",
        "en": "When you need to convert images to WebP format instead of PNG",
        "ja": "画像をPNGではなくWebP形式に変換する場合"
      },
      {
        "vi": "Khi cần mã hoá ảnh baseline để bảo mật dữ liệu nhạy cảm",
        "en": "When you need to encrypt baseline images to protect sensitive data",
        "ja": "機密データを保護するためにベースライン画像を暗号化する場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "`mask` nhận danh sách locator, các vùng tương ứng sẽ bị phủ ô màu (mặc định hồng) trước khi chụp và so sánh, hữu ích để loại trừ nội dung thay đổi liên tục không phải lỗi UI thật.",
      "en": "`mask` accepts a list of locators; matching regions get covered with a colored box (pink by default) before capturing and comparing, useful for excluding constantly changing content that isn't a real UI defect.",
      "ja": "`mask`はロケーターのリストを受け取り、対応する領域はキャプチャと比較の前に色付きボックス（デフォルトはピンク）で覆われます。実際のUI不具合ではない、常に変化するコンテンツを除外するのに便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sự khác biệt chính giữa `toHaveScreenshot()` và `toMatchSnapshot()` trong Playwright là gì?",
      "en": "What is the main difference between `toHaveScreenshot()` and `toMatchSnapshot()` in Playwright?",
      "ja": "Playwrightにおける`toHaveScreenshot()`と`toMatchSnapshot()`の主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Không có khác biệt, hai API hoàn toàn tương đương và có thể thay thế nhau mọi lúc",
        "en": "There is no difference; the two APIs are entirely equivalent and interchangeable in all cases",
        "ja": "違いはなく、両APIは完全に同等でいつでも置き換え可能である"
      },
      {
        "vi": "`toHaveScreenshot()` chỉ hoạt động trên Firefox còn `toMatchSnapshot()` chỉ hoạt động trên Chromium",
        "en": "`toHaveScreenshot()` only works on Firefox while `toMatchSnapshot()` only works on Chromium",
        "ja": "`toHaveScreenshot()`はFirefoxでのみ動作し、`toMatchSnapshot()`はChromiumでのみ動作する"
      },
      {
        "vi": "`toHaveScreenshot()` chuyên dùng để so sánh ảnh page/element với cấu hình mặc định tối ưu cho screenshot (đặt tên tự động, chờ ổn định); `toMatchSnapshot()` tổng quát hơn, nhận buffer bất kỳ (ảnh, text, dữ liệu nhị phân)",
        "en": "`toHaveScreenshot()` is specialized for comparing page/element screenshots with defaults optimized for screenshots (auto-naming, stability waiting); `toMatchSnapshot()` is more general, accepting any buffer (images, text, binary data)",
        "ja": "`toHaveScreenshot()`はスクリーンショット向けに最適化されたデフォルト（自動命名、安定性待機）を持つページ/要素のスクリーンショット比較専用。`toMatchSnapshot()`はより汎用的で、任意のバッファ（画像、テキスト、バイナリデータ）を受け付ける"
      },
      {
        "vi": "`toMatchSnapshot()` chỉ dùng được trong test API, không dùng được trong test UI",
        "en": "`toMatchSnapshot()` can only be used in API tests, not UI tests",
        "ja": "`toMatchSnapshot()`はAPIテストでのみ使用可能で、UIテストでは使用できない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "`toHaveScreenshot` là API cấp cao chuyên biệt cho screenshot với auto-waiting và naming theo project/platform; `toMatchSnapshot` là API cấp thấp hơn nhận trực tiếp Buffer/string để so khớp với bất kỳ loại snapshot nào, không riêng ảnh.",
      "en": "`toHaveScreenshot` is a specialized high-level API for screenshots with auto-waiting and project/platform-based naming; `toMatchSnapshot` is a lower-level API that directly accepts a Buffer/string to match any kind of snapshot, not just images.",
      "ja": "`toHaveScreenshot`は自動待機とプロジェクト/プラットフォームに基づく命名を持つスクリーンショット専用の高レベルAPIです。`toMatchSnapshot`はBuffer/文字列を直接受け取り、画像に限らず任意の種類のスナップショットと照合する低レベルAPIです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi so sánh ảnh cho một element cụ thể thay vì cả trang, cú pháp nào là đúng?",
      "en": "When comparing a screenshot for a specific element instead of the full page, which syntax is correct?",
      "ja": "ページ全体ではなく特定の要素のスクリーンショットを比較する場合、正しい構文はどれですか。"
    },
    "options": [
      {
        "vi": "`await page.screenshot({ selector: '.card' })`",
        "en": "`await page.screenshot({ selector: '.card' })`",
        "ja": "`await page.screenshot({ selector: '.card' })`"
      },
      {
        "vi": "`await page.locator('.card').assertScreenshot('card.png')`",
        "en": "`await page.locator('.card').assertScreenshot('card.png')`",
        "ja": "`await page.locator('.card').assertScreenshot('card.png')`"
      },
      {
        "vi": "`await expect(page).toHaveScreenshot('.card')`",
        "en": "`await expect(page).toHaveScreenshot('.card')`",
        "ja": "`await expect(page).toHaveScreenshot('.card')`"
      },
      {
        "vi": "`await expect(page.locator('.card')).toHaveScreenshot('card.png')`",
        "en": "`await expect(page.locator('.card')).toHaveScreenshot('card.png')`",
        "ja": "`await expect(page.locator('.card')).toHaveScreenshot('card.png')`"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "`toHaveScreenshot` áp dụng được cho `Locator`, chỉ chụp và so sánh vùng bounding box của phần tử đó thay vì toàn trang; các cú pháp còn lại không tồn tại trong API của Playwright.",
      "en": "`toHaveScreenshot` can be called on a `Locator`, capturing and comparing only that element's bounding box instead of the full page; the other syntaxes do not exist in Playwright's API.",
      "ja": "`toHaveScreenshot`は`Locator`に対して呼び出すことができ、ページ全体ではなくその要素のバウンディングボックスのみをキャプチャして比較します。他の構文はPlaywrightのAPIには存在しません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `clip` trong `page.screenshot()` khác với `fullPage: true` như thế nào?",
      "en": "How does the `clip` option in `page.screenshot()` differ from `fullPage: true`?",
      "ja": "`page.screenshot()`の`clip`オプションは`fullPage: true`とどう違いますか。"
    },
    "options": [
      {
        "vi": "`clip` chỉ định một vùng chữ nhật cụ thể (x, y, width, height) để chụp, còn `fullPage` chụp toàn bộ chiều cao trang kể cả phần phải cuộn",
        "en": "`clip` specifies a particular rectangular region (x, y, width, height) to capture, while `fullPage` captures the entire scrollable page height",
        "ja": "`clip`はキャプチャする特定の矩形領域（x, y, width, height）を指定し、`fullPage`はスクロールが必要な部分を含むページ全体の高さをキャプチャする"
      },
      {
        "vi": "`clip` chụp toàn bộ trang kể cả phần cuộn ngoài viewport, còn `fullPage` chỉ chụp viewport hiện tại",
        "en": "`clip` captures the entire page including content scrolled outside the viewport, while `fullPage` only captures the current viewport",
        "ja": "`clip`はビューポート外にスクロールされた部分を含むページ全体をキャプチャし、`fullPage`は現在のビューポートのみをキャプチャする"
      },
      {
        "vi": "Hai tuỳ chọn hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "The two options are completely identical, differing only in name",
        "ja": "2つのオプションは名前が違うだけで完全に同一である"
      },
      {
        "vi": "`clip` chỉ áp dụng cho video còn `fullPage` chỉ áp dụng cho ảnh tĩnh",
        "en": "`clip` only applies to video, while `fullPage` only applies to static images",
        "ja": "`clip`は動画にのみ適用され、`fullPage`は静止画にのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "`clip` cho phép giới hạn vùng chụp theo toạ độ và kích thước cụ thể trên trang, trong khi `fullPage: true` mở rộng chụp toàn bộ chiều cao/rộng nội dung trang kể cả phần cần cuộn mới thấy.",
      "en": "`clip` restricts the capture to a specific coordinate and size region on the page, while `fullPage: true` expands capture to the full scrollable content height/width of the page.",
      "ja": "`clip`はページ上の特定の座標とサイズの領域にキャプチャを制限し、`fullPage: true`はスクロールが必要な部分を含むページコンテンツ全体の高さ/幅までキャプチャを拡張します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong file cấu hình `playwright.config.ts`, `expect.toHaveScreenshot.threshold` được đặt ở đâu để áp dụng mặc định cho toàn bộ project?",
      "en": "In `playwright.config.ts`, where is `expect.toHaveScreenshot.threshold` set to apply as a default for the entire project?",
      "ja": "`playwright.config.ts`で、`expect.toHaveScreenshot.threshold`をプロジェクト全体のデフォルトとして適用するにはどこに設定しますか。"
    },
    "options": [
      {
        "vi": "Trong khối `use: { threshold: ... }`",
        "en": "Inside the `use: { threshold: ... }` block",
        "ja": "`use: { threshold: ... }`ブロック内"
      },
      {
        "vi": "Trong khối `expect: { toHaveScreenshot: { threshold: ... } } }` ở cấp cao nhất của config",
        "en": "Inside the top-level `expect: { toHaveScreenshot: { threshold: ... } } }` block",
        "ja": "config最上位の`expect: { toHaveScreenshot: { threshold: ... } } }`ブロック内"
      },
      {
        "vi": "Trong khối `reporter: { threshold: ... }`",
        "en": "Inside the `reporter: { threshold: ... }` block",
        "ja": "`reporter: { threshold: ... }`ブロック内"
      },
      {
        "vi": "Chỉ có thể đặt trực tiếp trong từng lời gọi `toHaveScreenshot`, không có cấu hình mặc định toàn cục",
        "en": "It can only be set directly in each individual `toHaveScreenshot` call; there is no global default configuration",
        "ja": "個々の`toHaveScreenshot`呼び出しに直接設定するしかなく、グローバルなデフォルト設定は存在しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright config hỗ trợ khối `expect.toHaveScreenshot` (cùng cấp với `use`, `reporter`) để đặt mặc định chung như `threshold`, `maxDiffPixels`, `animations`, áp dụng cho mọi lời gọi trừ khi bị ghi đè cục bộ.",
      "en": "Playwright config supports an `expect.toHaveScreenshot` block (sibling to `use`, `reporter`) to set shared defaults like `threshold`, `maxDiffPixels`, `animations`, applied to every call unless overridden locally.",
      "ja": "Playwrightのconfigは`use`や`reporter`と同階層の`expect.toHaveScreenshot`ブロックをサポートしており、`threshold`、`maxDiffPixels`、`animations`などの共通デフォルトを設定でき、ローカルで上書きされない限りすべての呼び出しに適用されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test visual regression fail do khác biệt ảnh, Playwright HTML report cung cấp tính năng gì để debug nhanh?",
      "en": "When a visual regression test fails due to an image mismatch, what feature does the Playwright HTML report provide for quick debugging?",
      "ja": "視覚回帰テストが画像の不一致で失敗した場合、Playwright HTMLレポートはデバッグを迅速に行うためにどのような機能を提供しますか。"
    },
    "options": [
      {
        "vi": "Chỉ hiển thị mã lỗi số học, không có hình ảnh trực quan",
        "en": "It only shows a numeric error code without any visual images",
        "ja": "視覚的な画像なしで数値エラーコードのみを表示する"
      },
      {
        "vi": "Tự động sửa mã nguồn CSS gây ra khác biệt",
        "en": "It automatically fixes the CSS source code causing the difference",
        "ja": "差分の原因となるCSSソースコードを自動的に修正する"
      },
      {
        "vi": "Hiển thị ba ảnh cạnh nhau (expected, actual, diff) kèm khả năng chuyển đổi kiểu xem để so sánh trực quan",
        "en": "It shows three images side by side (expected, actual, diff) with a view-toggle to visually compare them",
        "ja": "3つの画像（expected、actual、diff）を並べて表示し、視覚的に比較できるビュー切り替え機能を提供する"
      },
      {
        "vi": "Gửi email cảnh báo cho toàn bộ team ngay khi phát hiện khác biệt",
        "en": "It sends a warning email to the entire team as soon as a difference is detected",
        "ja": "差分が検出されるとすぐにチーム全員に警告メールを送信する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "HTML report hiển thị bộ ba ảnh expected/actual/diff (vùng khác biệt tô đỏ) và cho phép chuyển qua lại (side-by-side, slider, diff-only) để nhanh chóng xác định thay đổi thật hay false positive.",
      "en": "The HTML report displays the expected/actual/diff trio (differences highlighted in red) and lets you toggle views (side-by-side, slider, diff-only) to quickly determine if it's a real change or a false positive.",
      "ja": "HTMLレポートはexpected/actual/diffの3枚組（差分は赤でハイライト）を表示し、ビューの切り替え（サイドバイサイド、スライダー、diffのみ）により実際の変更か誤検出かを素早く判断できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tại sao nên hạn chế dùng `fullPage: true` cho các trang có nội dung load lazy (lazy-loaded) khi làm visual regression test?",
      "en": "Why should `fullPage: true` be used cautiously for pages with lazy-loaded content in visual regression testing?",
      "ja": "視覚回帰テストにおいて、遅延読み込み（lazy-loaded）コンテンツを持つページで`fullPage: true`の使用に注意が必要なのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì `fullPage: true` không tương thích với trình duyệt WebKit",
        "en": "Because `fullPage: true` is incompatible with the WebKit browser",
        "ja": "`fullPage: true`はWebKitブラウザと互換性がないため"
      },
      {
        "vi": "Vì `fullPage: true` chỉ hoạt động khi chạy ở chế độ headed, không hoạt động ở headless",
        "en": "Because `fullPage: true` only works in headed mode, not in headless mode",
        "ja": "`fullPage: true`はheadedモードでのみ動作し、headlessモードでは動作しないため"
      },
      {
        "vi": "Vì `fullPage: true` giới hạn tối đa ảnh chỉ 1920x1080 pixel",
        "en": "Because `fullPage: true` limits the image to a maximum of 1920x1080 pixels",
        "ja": "`fullPage: true`は画像を最大1920x1080ピクセルに制限するため"
      },
      {
        "vi": "Vì nội dung lazy-load có thể chưa kịp render khi cuộn tự động để chụp toàn trang, dẫn đến ảnh thiếu nội dung hoặc không nhất quán giữa các lần chạy",
        "en": "Because lazy-loaded content may not have finished rendering during the automatic scroll used to capture the full page, causing missing content or inconsistent images between runs",
        "ja": "ページ全体をキャプチャするための自動スクロール中に遅延読み込みコンテンツのレンダリングが間に合わず、内容の欠落や実行ごとの不整合が生じる可能性があるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi chụp full page, Playwright cuộn qua toàn trang để render các phần ngoài viewport; nếu nội dung lazy-load (ảnh, infinite scroll) chưa kịp tải xong tại thời điểm cuộn, ảnh kết quả sẽ thiếu hoặc khác nhau mỗi lần chạy gây flaky test.",
      "en": "When capturing full page, Playwright scrolls through the entire page to render sections outside the viewport; if lazy-loaded content (images, infinite scroll) hasn't finished loading by scroll time, the resulting screenshot may be missing content or differ run to run, causing flaky tests.",
      "ja": "フルページキャプチャ時、Playwrightはビューポート外の部分をレンダリングするためページ全体をスクロールします。遅延読み込みコンテンツ（画像、無限スクロール）がスクロール時点でロードを完了していない場合、結果の画像に欠落が生じたり実行ごとに異なったりし、フレーキーなテストの原因になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Câu nào sau đây mô tả ĐÚNG về thư mục lưu ảnh baseline mặc định của Playwright?",
      "en": "Which statement correctly describes Playwright's default folder for storing baseline images?",
      "ja": "Playwrightのベースライン画像を保存するデフォルトフォルダについて正しく説明しているのはどれですか。"
    },
    "options": [
      {
        "vi": "Ảnh baseline được lưu trong thư mục `__screenshots__` con của thư mục chứa file test và MẶC ĐỊNH cần commit vào git để CI có thể so sánh",
        "en": "Baseline images are stored in a `__screenshots__` subfolder next to the test file, and by default should be committed to git so CI can compare against them",
        "ja": "ベースライン画像はテストファイルのそばにある`__screenshots__`サブフォルダに保存され、デフォルトではCIが比較できるようgitにコミットする必要がある"
      },
      {
        "vi": "Ảnh baseline luôn được lưu trong `node_modules/.playwright-cache` và không nên commit",
        "en": "Baseline images are always stored in `node_modules/.playwright-cache` and should not be committed",
        "ja": "ベースライン画像は常に`node_modules/.playwright-cache`に保存され、コミットすべきではない"
      },
      {
        "vi": "Ảnh baseline được nén và lưu trực tiếp trong file `playwright.config.ts`",
        "en": "Baseline images are compressed and stored directly inside the `playwright.config.ts` file",
        "ja": "ベースライン画像は圧縮され、`playwright.config.ts`ファイル内に直接保存される"
      },
      {
        "vi": "Ảnh baseline được lưu ở server đám mây của Microsoft mặc định, không lưu local",
        "en": "Baseline images are stored on Microsoft's cloud server by default, not locally",
        "ja": "ベースライン画像はデフォルトでMicrosoftのクラウドサーバーに保存され、ローカルには保存されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mặc định Playwright tạo thư mục `<tên-file-test>-snapshots` (thường gọi chung xu hướng đặt trong `__screenshots__` khi cấu hình theo `snapshotPathTemplate` phổ biến) cạnh file test; các ảnh này phải được commit vào version control để CI dùng làm chuẩn so sánh.",
      "en": "By default Playwright creates a `<test-file-name>-snapshots` folder (commonly organized under `__screenshots__` when using a popular `snapshotPathTemplate`) next to the test file; these images must be committed to version control so CI has a baseline to compare against.",
      "ja": "デフォルトでは、Playwrightはテストファイルのそばに`<テストファイル名>-snapshots`フォルダ（一般的な`snapshotPathTemplate`を使う場合`__screenshots__`にまとめられることが多い）を作成します。これらの画像はCIが比較のベースラインとして使えるようバージョン管理にコミットする必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `stylePath` (hoặc chèn CSS tuỳ chỉnh) trước khi chụp screenshot thường dùng để giải quyết vấn đề gì?",
      "en": "Injecting custom CSS (e.g. via a style path) before capturing a screenshot is commonly used to solve what problem?",
      "ja": "スクリーンショット撮影前にカスタムCSSを挿入する（スタイルパスなどを使う）ことは、一般的にどのような問題を解決するために使われますか。"
    },
    "options": [
      {
        "vi": "Tăng tốc độ load trang lên gấp đôi",
        "en": "Doubling the page load speed",
        "ja": "ページの読み込み速度を2倍にする"
      },
      {
        "vi": "Ẩn con trỏ chuột (caret) nhấp nháy, cuộn thanh scrollbar, hoặc các phần tử gây nhiễu hình ảnh không liên quan đến logic kiểm thử",
        "en": "Hiding the blinking caret, scrollbars, or other visually noisy elements unrelated to the actual test logic",
        "ja": "点滅するカーソル（キャレット）、スクロールバー、テストロジックに関係のない視覚的なノイズ要素を非表示にする"
      },
      {
        "vi": "Mã hoá nội dung HTML trước khi gửi lên server CI",
        "en": "Encrypting HTML content before sending it to the CI server",
        "ja": "CIサーバーに送信する前にHTMLコンテンツを暗号化する"
      },
      {
        "vi": "Chuyển đổi ngôn ngữ hiển thị trang sang tiếng Anh mặc định",
        "en": "Switching the page's display language to English by default",
        "ja": "ページの表示言語をデフォルトで英語に切り替える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chèn CSS tuỳ chỉnh (ẩn caret, scrollbar, animation không mong muốn) giúp loại bỏ các yếu tố visual không ổn định gây false positive trong so sánh ảnh, làm test đáng tin cậy hơn.",
      "en": "Injecting custom CSS (hiding the caret, scrollbars, unwanted animations) removes unstable visual elements that cause false positives in image comparison, making the test more reliable.",
      "ja": "カスタムCSSを挿入（キャレット、スクロールバー、不要なアニメーションを非表示）することで、画像比較における誤検出の原因となる不安定な視覚要素を除去し、テストの信頼性を高めます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi một test visual regression liên tục fail với diff rất nhỏ (vài pixel) dù giao diện không đổi, hướng xử lý hợp lý nhất là gì?",
      "en": "When a visual regression test keeps failing with a very small diff (a few pixels) even though the UI hasn't changed, what is the most reasonable fix?",
      "ja": "UIが変更されていないにもかかわらず、視覚回帰テストがごく小さな差分（数ピクセル）で失敗し続ける場合、最も合理的な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Xoá test đó khỏi bộ kiểm thử vì nó vô dụng",
        "en": "Delete the test from the suite because it is useless",
        "ja": "そのテストは無意味なのでテストスイートから削除する"
      },
      {
        "vi": "Chuyển toàn bộ test sang dùng `page.pause()` để dừng và chụp ảnh thủ công mỗi lần chạy CI",
        "en": "Convert all tests to use `page.pause()` to manually pause and capture screenshots on every CI run",
        "ja": "すべてのテストを`page.pause()`に変換し、CI実行のたびに手動で一時停止してスクリーンショットを撮る"
      },
      {
        "vi": "Tăng nhẹ `maxDiffPixels`/`threshold` một cách hợp lý và đảm bảo môi trường chụp nhất quán (cùng Docker image, tắt animation, font hinting) thay vì chấp nhận diff lớn tuỳ tiện",
        "en": "Reasonably increase `maxDiffPixels`/`threshold` slightly and ensure a consistent capture environment (same Docker image, animations disabled, font hinting), rather than arbitrarily accepting large diffs",
        "ja": "`maxDiffPixels`/`threshold`を妥当な範囲でわずかに引き上げ、キャプチャ環境の一貫性（同じDockerイメージ、アニメーション無効化、フォントヒンティング）を確保する。むやみに大きな差分を許容するのではない"
      },
      {
        "vi": "Đặt `threshold: 1` và `maxDiffPixelRatio: 1` để loại bỏ hoàn toàn khả năng fail",
        "en": "Set `threshold: 1` and `maxDiffPixelRatio: 1` to completely eliminate the possibility of failure",
        "ja": "失敗の可能性を完全になくすために`threshold: 1`と`maxDiffPixelRatio: 1`を設定する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Diff nhỏ vài pixel thường do rendering không hoàn toàn tất định (anti-aliasing, font); giải pháp đúng là tăng ngưỡng vừa phải kết hợp chuẩn hoá môi trường chụp, tránh vô hiệu hoá hoàn toàn khả năng phát hiện lỗi thật của test.",
      "en": "Small few-pixel diffs are usually due to non-deterministic rendering (anti-aliasing, fonts); the correct fix is a modest threshold increase combined with standardizing the capture environment, avoiding a setting that fully defeats the test's ability to catch real regressions.",
      "ja": "数ピクセルの小さな差分は通常、非決定的なレンダリング（アンチエイリアシング、フォント）が原因です。正しい解決策は、キャプチャ環境を標準化しつつ閾値を適度に引き上げることであり、テストが本当の不具合を検出する能力を完全に無効化するような設定は避けるべきです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tuỳ chọn `scale` trong `toHaveScreenshot` (giá trị `'css'` hoặc `'device'`) ảnh hưởng đến điều gì?",
      "en": "What does the `scale` option (`'css'` or `'device'`) in `toHaveScreenshot` affect?",
      "ja": "`toHaveScreenshot`の`scale`オプション（`'css'`または`'device'`）は何に影響しますか。"
    },
    "options": [
      {
        "vi": "Tốc độ chạy test song song trên CI",
        "en": "The speed of parallel test execution on CI",
        "ja": "CIでのテスト並列実行速度"
      },
      {
        "vi": "Số lần retry tối đa khi test visual fail",
        "en": "The maximum number of retries when a visual test fails",
        "ja": "視覚テストが失敗した場合の最大リトライ回数"
      },
      {
        "vi": "Ngôn ngữ hiển thị trong báo cáo test",
        "en": "The display language in the test report",
        "ja": "テストレポートの表示言語"
      },
      {
        "vi": "Kích thước pixel thực của ảnh xuất ra: `'css'` dùng kích thước CSS còn `'device'` dùng device pixel ratio thực tế (ví dụ ảnh Retina lớn gấp đôi)",
        "en": "The actual pixel dimensions of the output image: `'css'` uses CSS pixel sizing while `'device'` uses the real device pixel ratio (e.g. Retina images are double size)",
        "ja": "出力画像の実際のピクセルサイズ：`'css'`はCSSピクセルサイズを使用し、`'device'`は実際のデバイスピクセル比を使用する（例：Retina画像はサイズが2倍になる）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "`scale: 'css'` chụp theo kích thước CSS logic (nhất quán bất kể devicePixelRatio), còn `'device'` chụp theo pixel vật lý thực của thiết bị; chọn sai có thể khiến baseline lệch kích thước khi đổi devicePixelRatio giữa các máy.",
      "en": "`scale: 'css'` captures at logical CSS pixel size (consistent regardless of devicePixelRatio), while `'device'` captures at the device's actual physical pixels; choosing the wrong one can cause baseline size mismatches when devicePixelRatio differs between machines.",
      "ja": "`scale: 'css'`は論理CSSピクセルサイズでキャプチャします（devicePixelRatioに関係なく一貫）。`'device'`はデバイスの実際の物理ピクセルでキャプチャします。誤った選択は、マシン間でdevicePixelRatioが異なる場合にベースラインのサイズ不一致を引き起こす可能性があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI pipeline, nên tránh chạy visual regression test song song với số lượng worker quá cao trên cùng máy vì lý do gì?",
      "en": "In a CI pipeline, why should you avoid running visual regression tests with too many parallel workers on the same machine?",
      "ja": "CIパイプラインにおいて、同じマシンで並列ワーカー数を多くしすぎて視覚回帰テストを実行するのを避けるべき理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì tài nguyên CPU/GPU bị chia sẻ có thể ảnh hưởng đến rendering (font hinting, layout timing), làm tăng nguy cơ flaky diff giữa các lần chạy",
        "en": "Because shared CPU/GPU resources can affect rendering (font hinting, layout timing), increasing the risk of flaky diffs between runs",
        "ja": "共有されるCPU/GPUリソースがレンダリング（フォントヒンティング、レイアウトタイミング）に影響を与える可能性があり、実行ごとのフレーキーな差分のリスクが高まるため"
      },
      {
        "vi": "Vì Playwright giới hạn cứng tối đa 2 worker cho mọi loại test",
        "en": "Because Playwright hard-limits all test types to a maximum of 2 workers",
        "ja": "Playwrightはすべてのテストタイプにおいてワーカー数を最大2に固定制限しているため"
      },
      {
        "vi": "Vì mỗi worker sẽ tạo baseline riêng và ghi đè lẫn nhau vĩnh viễn",
        "en": "Because each worker creates its own baseline and permanently overwrites the others",
        "ja": "各ワーカーが独自のベースラインを作成し、互いを永久に上書きしてしまうため"
      },
      {
        "vi": "Vì Playwright không hỗ trợ chạy `toHaveScreenshot` trong môi trường đa luồng",
        "en": "Because Playwright does not support running `toHaveScreenshot` in a multi-threaded environment",
        "ja": "Playwrightはマルチスレッド環境での`toHaveScreenshot`実行をサポートしていないため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi nhiều worker tranh chấp CPU/GPU trên cùng máy, thời gian layout/paint có thể thay đổi, ảnh hưởng nhẹ đến rendering và làm tăng khả năng xuất hiện diff không mong muốn; không phải giới hạn kỹ thuật cứng hay lỗi ghi đè baseline.",
      "en": "When multiple workers contend for CPU/GPU on the same machine, layout/paint timing can shift, subtly affecting rendering and increasing the chance of unwanted diffs; it's not a hard technical limit or a baseline overwrite bug.",
      "ja": "複数のワーカーが同じマシン上でCPU/GPUを奪い合うと、レイアウト/ペイントのタイミングが変動し、レンダリングに微妙な影響を与え、望まない差分が発生する可能性が高まります。これは技術的なハード制限やベースライン上書きのバグではありません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu muốn tách riêng nhóm test visual regression để chạy trên một project cấu hình đặc biệt (ví dụ chỉ 1 viewport cố định), cách tổ chức phổ biến trong `playwright.config.ts` là gì?",
      "en": "To isolate visual regression tests to run under a special configuration (e.g. a single fixed viewport), what is a common organizational approach in `playwright.config.ts`?",
      "ja": "視覚回帰テストを特別な設定（例：固定された単一のビューポート）で実行するために分離したい場合、`playwright.config.ts`での一般的な構成方法は何ですか。"
    },
    "options": [
      {
        "vi": "Không thể tách riêng, mọi project trong Playwright bắt buộc dùng chung một cấu hình viewport",
        "en": "It cannot be isolated; all projects in Playwright are required to share the same viewport configuration",
        "ja": "分離は不可能であり、Playwrightのすべてのプロジェクトは同じviewport設定を共有しなければならない"
      },
      {
        "vi": "Định nghĩa một `project` riêng (ví dụ `name: 'visual'`) với `use` chứa viewport/deviceScaleFactor cố định, rồi lọc test bằng convention tên file hoặc thư mục",
        "en": "Define a separate `project` (e.g. `name: 'visual'`) with `use` containing a fixed viewport/deviceScaleFactor, then filter tests by file naming or folder convention",
        "ja": "固定されたviewport/deviceScaleFactorを含む`use`を持つ独立した`project`（例：`name: 'visual'`）を定義し、ファイル命名やフォルダの規約でテストをフィルタリングする"
      },
      {
        "vi": "Phải tạo một file `playwright.config.ts` hoàn toàn riêng biệt và chạy bằng lệnh khác, không thể gộp chung project array",
        "en": "You must create a completely separate `playwright.config.ts` file and run it with a different command; it cannot be combined in the same project array",
        "ja": "完全に別の`playwright.config.ts`ファイルを作成し、別のコマンドで実行する必要があり、同じprojectの配列にまとめることはできない"
      },
      {
        "vi": "Dùng biến môi trường `PLAYWRIGHT_VISUAL=1` là cách duy nhất được Playwright chính thức hỗ trợ",
        "en": "Using the `PLAYWRIGHT_VISUAL=1` environment variable is the only officially supported way by Playwright",
        "ja": "`PLAYWRIGHT_VISUAL=1`環境変数を使用することがPlaywrightで公式にサポートされている唯一の方法である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mảng `projects` trong config cho phép định nghĩa nhiều cấu hình `use` khác nhau (viewport, deviceScaleFactor, browserName); kết hợp với `testMatch`/quy ước đặt tên để chỉ chạy test visual trong project đó, giữ môi trường chụp ảnh nhất quán.",
      "en": "The `projects` array in the config allows defining multiple different `use` configurations (viewport, deviceScaleFactor, browserName); combined with `testMatch`/naming conventions to run only visual tests in that project, keeping the capture environment consistent.",
      "ja": "config内の`projects`配列は、異なる複数の`use`設定（viewport、deviceScaleFactor、browserName）を定義できます。`testMatch`や命名規則と組み合わせることで、そのプロジェクトでのみ視覚テストを実行し、キャプチャ環境の一貫性を保てます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tính năng `snapshotPathTemplate` trong Playwright config dùng để làm gì?",
      "en": "What is the `snapshotPathTemplate` feature in Playwright config used for?",
      "ja": "Playwright configの`snapshotPathTemplate`機能は何のために使用されますか。"
    },
    "options": [
      {
        "vi": "Cấu hình template email gửi báo cáo test",
        "en": "Configuring the email template used to send test reports",
        "ja": "テストレポート送信用のメールテンプレートを設定する"
      },
      {
        "vi": "Chỉ định URL API để upload ảnh lên cloud storage tự động",
        "en": "Specifying the API URL to automatically upload images to cloud storage",
        "ja": "画像をクラウドストレージに自動アップロードするAPI URLを指定する"
      },
      {
        "vi": "Tùy biến đường dẫn/tên file lưu ảnh baseline theo mẫu tự định nghĩa (ví dụ nhóm theo thư mục `__screenshots__/{platform}/{testName}`)",
        "en": "Customizing the path/filename pattern used to store baseline images (e.g. grouping under `__screenshots__/{platform}/{testName}`)",
        "ja": "ベースライン画像を保存するパス/ファイル名パターンをカスタマイズする（例：`__screenshots__/{platform}/{testName}`のようにグループ化する）"
      },
      {
        "vi": "Định nghĩa thứ tự chạy test theo alphabet",
        "en": "Defining the order tests run in alphabetically",
        "ja": "テストをアルファベット順に実行する順序を定義する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "`snapshotPathTemplate` cho phép định nghĩa mẫu đường dẫn linh hoạt dùng các token như `{testDir}`, `{platform}`, `{projectName}`, `{arg}` để tổ chức thư mục ảnh baseline theo ý muốn, thay vì cấu trúc mặc định.",
      "en": "`snapshotPathTemplate` lets you define a flexible path pattern using tokens like `{testDir}`, `{platform}`, `{projectName}`, `{arg}` to organize the baseline image folder structure as desired, instead of the default layout.",
      "ja": "`snapshotPathTemplate`により、`{testDir}`、`{platform}`、`{projectName}`、`{arg}`などのトークンを使った柔軟なパスパターンを定義し、デフォルトのレイアウトではなく望み通りにベースライン画像のフォルダ構造を整理できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Việc so sánh ảnh visual regression trong Playwright dựa trên thư viện thuật toán nào ở tầng dưới?",
      "en": "Playwright's visual regression image comparison is built on top of which underlying algorithm library?",
      "ja": "Playwrightの視覚回帰画像比較は、内部でどのアルゴリズムライブラリを基盤としていますか。"
    },
    "options": [
      {
        "vi": "TensorFlow.js với mô hình học sâu nhận diện khác biệt",
        "en": "TensorFlow.js with a deep-learning model for difference detection",
        "ja": "差分検出用のディープラーニングモデルを持つTensorFlow.js"
      },
      {
        "vi": "ImageMagick command-line thông qua child_process",
        "en": "The ImageMagick command-line tool invoked via child_process",
        "ja": "child_process経由で呼び出されるImageMagickコマンドラインツール"
      },
      {
        "vi": "OpenCV với thuật toán feature matching SIFT",
        "en": "OpenCV with the SIFT feature-matching algorithm",
        "ja": "SIFT特徴マッチングアルゴリズムを備えたOpenCV"
      },
      {
        "vi": "pixelmatch — thuật toán so sánh pixel-by-pixel dựa trên không gian màu YIQ",
        "en": "pixelmatch — a pixel-by-pixel comparison algorithm based on the YIQ color space",
        "ja": "pixelmatch — YIQ色空間に基づくピクセル単位の比較アルゴリズム"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright dùng thư viện `pixelmatch` (kết hợp `pngjs`) để so sánh từng pixel giữa hai ảnh dựa trên độ lệch màu trong không gian YIQ, là nền tảng cho các tham số `threshold`, `maxDiffPixels`.",
      "en": "Playwright uses the `pixelmatch` library (combined with `pngjs`) to compare each pixel between two images based on color deviation in the YIQ color space, forming the basis for the `threshold` and `maxDiffPixels` parameters.",
      "ja": "Playwrightは`pixelmatch`ライブラリ（`pngjs`と組み合わせて）を使用し、YIQ色空間における色の偏差に基づいて2つの画像のピクセルごとの比較を行います。これが`threshold`や`maxDiffPixels`パラメータの基盤となります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test dùng `expect(locator).toHaveScreenshot()` nhưng phần tử đang bị che khuất một phần bởi overlay/modal khác, kết quả thường gặp là gì?",
      "en": "When using `expect(locator).toHaveScreenshot()` but the element is partially obscured by another overlay/modal, what typically happens?",
      "ja": "`expect(locator).toHaveScreenshot()`を使用しているが、その要素が別のオーバーレイ/モーダルによって部分的に隠されている場合、一般的にどうなりますか。"
    },
    "options": [
      {
        "vi": "Ảnh chụp sẽ bao gồm cả phần overlay che phủ (vì chụp theo bounding box, không phải theo z-index thực), dẫn đến diff không phản ánh đúng nội dung element gốc",
        "en": "The screenshot will include the obscuring overlay (since capture is based on bounding box, not actual z-index visibility), causing diffs that don't accurately reflect the original element's content",
        "ja": "（実際のz-indexによる可視性ではなくバウンディングボックスに基づいてキャプチャされるため）スクリーンショットには覆っているオーバーレイも含まれ、元の要素の内容を正しく反映しない差分が生じる"
      },
      {
        "vi": "Playwright tự động đóng overlay đó trước khi chụp mà không cần cấu hình gì",
        "en": "Playwright automatically closes that overlay before capturing without any configuration",
        "ja": "設定なしでPlaywrightがキャプチャ前にそのオーバーレイを自動的に閉じる"
      },
      {
        "vi": "Test sẽ tự động fail ngay lập tức với thông báo lỗi rõ ràng về overlay",
        "en": "The test automatically fails immediately with a clear error message about the overlay",
        "ja": "オーバーレイに関する明確なエラーメッセージとともに、テストは即座に自動的に失敗する"
      },
      {
        "vi": "Playwright bỏ qua overlay và chỉ render nội dung của locator gốc bằng cách truy xuất trực tiếp DOM ảo",
        "en": "Playwright ignores the overlay and only renders the original locator's content by accessing a virtual DOM directly",
        "ja": "Playwrightはオーバーレイを無視し、仮想DOMに直接アクセスして元のロケーターの内容のみをレンダリングする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Screenshot chụp theo vùng hình chữ nhật thực tế trên màn hình tại vị trí của locator, nên nếu có overlay/modal khác nằm đè lên (cùng khu vực, z-index cao hơn) thì ảnh sẽ bao gồm cả phần đó, cần chủ động đóng overlay trước khi chụp để tránh false diff.",
      "en": "Screenshots capture the actual rectangular screen area at the locator's position, so if another overlay/modal sits on top (same region, higher z-index) it will be included in the image; you must proactively close the overlay before capturing to avoid false diffs.",
      "ja": "スクリーンショットはロケーターの位置における実際の矩形画面領域をキャプチャするため、別のオーバーレイ/モーダルが上に重なっている（同じ領域、より高いz-index）場合、その部分も画像に含まれます。誤った差分を避けるため、キャプチャ前に能動的にオーバーレイを閉じる必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong quy trình review pull request có ảnh diff visual regression thay đổi hợp lệ (do redesign UI), bước nào là bắt buộc trước khi merge để không phá vỡ CI về sau?",
      "en": "In a PR review process with valid visual regression diffs (due to a UI redesign), which step is mandatory before merging to avoid breaking CI afterward?",
      "ja": "有効な視覚回帰の差分（UIリデザインによる）を含むPRレビューのプロセスで、後でCIを壊さないようマージ前に必須のステップはどれですか。"
    },
    "options": [
      {
        "vi": "Xoá toàn bộ thư mục snapshot để CI tự tạo lại từ đầu mỗi lần chạy",
        "en": "Delete the entire snapshot folder so CI regenerates it from scratch every run",
        "ja": "CIが毎回ゼロから再生成するよう、スナップショットフォルダ全体を削除する"
      },
      {
        "vi": "Chạy `--update-snapshots` trên đúng môi trường dùng cho CI (ví dụ Docker image), review ảnh mới, rồi commit ảnh baseline cập nhật vào cùng PR",
        "en": "Run `--update-snapshots` in the exact environment used by CI (e.g. the Docker image), review the new images, then commit the updated baseline images in the same PR",
        "ja": "CIが使用するのと全く同じ環境（例：Dockerイメージ）で`--update-snapshots`を実行し、新しい画像をレビューした上で、更新されたベースライン画像を同じPRにコミットする"
      },
      {
        "vi": "Đặt `maxDiffPixelRatio: 1` vĩnh viễn trong config để mọi lần fail sau này đều tự pass",
        "en": "Permanently set `maxDiffPixelRatio: 1` in the config so all future failures automatically pass",
        "ja": "今後の失敗がすべて自動的にパスするよう、configに`maxDiffPixelRatio: 1`を恒久的に設定する"
      },
      {
        "vi": "Bỏ hẳn các dòng `toHaveScreenshot` khỏi test để tránh phải cập nhật ảnh",
        "en": "Remove all `toHaveScreenshot` lines from the tests entirely to avoid having to update images",
        "ja": "画像を更新する手間を避けるため、テストから`toHaveScreenshot`の行をすべて削除する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Để baseline nhất quán với môi trường CI thực tế chạy test, cần cập nhật ảnh bằng chính môi trường đó (thường qua Docker), review kỹ để chắc chắn thay đổi là chủ ý, rồi commit ảnh mới cùng code thay đổi UI trong cùng PR.",
      "en": "To keep baselines consistent with the actual CI test environment, images must be updated using that same environment (typically via Docker), carefully reviewed to confirm the change is intentional, then committed alongside the UI code changes in the same PR.",
      "ja": "実際にテストを実行するCI環境とベースラインの整合性を保つには、その同じ環境（通常はDocker経由）を使って画像を更新し、変更が意図的であることを慎重に確認した上で、UIコードの変更と共に同じPRに新しい画像をコミットする必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu team chọn KHÔNG commit ảnh baseline vào git mà lưu trên cloud storage riêng (S3, Azure Blob), điều gì cần được xử lý thêm trong CI pipeline?",
      "en": "If a team chooses NOT to commit baseline images to git and instead stores them in separate cloud storage (S3, Azure Blob), what needs to be additionally handled in the CI pipeline?",
      "ja": "チームがベースライン画像をgitにコミットせず、別のクラウドストレージ（S3、Azure Blobなど）に保存することを選んだ場合、CIパイプラインで追加で何を処理する必要がありますか。"
    },
    "options": [
      {
        "vi": "Không cần làm gì thêm vì Playwright tự động kết nối mọi cloud storage mặc định",
        "en": "Nothing extra is needed because Playwright automatically connects to any cloud storage by default",
        "ja": "Playwrightがデフォルトであらゆるクラウドストレージに自動接続するため、追加対応は不要である"
      },
      {
        "vi": "Chỉ cần đổi tên biến môi trường `PLAYWRIGHT_BASELINE_URL` mà không cần thao tác gì khác trong pipeline",
        "en": "Only renaming the `PLAYWRIGHT_BASELINE_URL` environment variable is needed, with no other pipeline steps required",
        "ja": "パイプラインで他に何もせず`PLAYWRIGHT_BASELINE_URL`環境変数の名前を変更するだけでよい"
      },
      {
        "vi": "Cần thêm bước tải (download) ảnh baseline từ cloud storage về đúng thư mục snapshot trước khi chạy test, và bước upload lại sau khi cập nhật",
        "en": "A step to download baseline images from cloud storage into the correct snapshot folder before running tests, and an upload step after updates, must be added",
        "ja": "テスト実行前にクラウドストレージから正しいスナップショットフォルダにベースライン画像をダウンロードするステップと、更新後にアップロードし直すステップを追加する必要がある"
      },
      {
        "vi": "Playwright sẽ tự sinh baseline giả lập bằng AI nếu không tìm thấy ảnh trong git",
        "en": "Playwright will auto-generate a simulated baseline using AI if no image is found in git",
        "ja": "gitに画像が見つからない場合、PlaywrightはAIを使ってシミュレートされたベースラインを自動生成する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright không có tích hợp sẵn với cloud storage cho baseline; team phải tự viết bước CI (script) tải ảnh về đúng cấu trúc thư mục snapshot trước khi test chạy, và upload ảnh mới lên storage sau khi cập nhật baseline.",
      "en": "Playwright has no built-in cloud storage integration for baselines; the team must write custom CI steps (scripts) to download images into the correct snapshot folder structure before tests run, and upload new images to storage after baseline updates.",
      "ja": "Playwrightにはベースライン用のクラウドストレージ統合機能が組み込まれていません。チームはテスト実行前に正しいスナップショットフォルダ構造に画像をダウンロードし、ベースライン更新後に新しい画像をストレージにアップロードするカスタムCIステップ（スクリプト）を自作する必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là lý do CHÍNH đáng để giới hạn số lượng test visual regression full-page trên toàn bộ ứng dụng thay vì chụp mọi trang?",
      "en": "What is the MAIN reason to limit the number of full-page visual regression tests across an application instead of capturing every page?",
      "ja": "すべてのページをキャプチャするのではなく、アプリケーション全体でフルページの視覚回帰テストの数を制限すべき主な理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì Playwright giới hạn cứng tối đa 10 ảnh baseline cho mỗi project",
        "en": "Because Playwright hard-limits each project to a maximum of 10 baseline images",
        "ja": "Playwrightは各プロジェクトにつき最大10枚のベースライン画像という固定制限を設けているため"
      },
      {
        "vi": "Vì visual regression test không hỗ trợ chạy trên CI, chỉ chạy được local",
        "en": "Because visual regression tests are not supported on CI and can only run locally",
        "ja": "視覚回帰テストはCIをサポートしておらず、ローカルでのみ実行可能であるため"
      },
      {
        "vi": "Vì ảnh PNG chỉ được phép lưu tối đa dung lượng 1KB mỗi file trong git",
        "en": "Because PNG images are only allowed a maximum file size of 1KB each in git",
        "ja": "gitではPNG画像を1ファイルにつき最大1KBしか保存できないため"
      },
      {
        "vi": "Vì chi phí bảo trì (review diff, cập nhật baseline khi UI thay đổi hợp lệ) và nguy cơ flaky tăng theo số lượng ảnh, nên cần ưu tiên các khu vực UI quan trọng/ổn định thay vì bao phủ toàn bộ",
        "en": "Because maintenance cost (reviewing diffs, updating baselines on valid UI changes) and flakiness risk grow with the number of images, so it's better to prioritize critical/stable UI areas rather than covering everything",
        "ja": "メンテナンスコスト（差分のレビュー、正当なUI変更時のベースライン更新）とフレーキーになるリスクは画像数に比例して増大するため、すべてを網羅するよりも重要/安定したUI領域を優先すべきである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mỗi ảnh baseline thêm vào là một điểm cần bảo trì: mỗi thay đổi UI hợp lệ đòi hỏi review và cập nhật lại, và số lượng ảnh lớn làm tăng khả năng gặp flaky diff; do đó nên tập trung visual test vào các thành phần UI quan trọng, ổn định thay vì phủ toàn bộ trang một cách dàn trải.",
      "en": "Every added baseline image is a maintenance point: each valid UI change requires reviewing and re-updating it, and a large number of images increases the chance of encountering flaky diffs; therefore visual tests should focus on critical, stable UI components rather than spreading coverage across every page.",
      "ja": "追加されるベースライン画像はそれぞれメンテナンスの対象となります。正当なUI変更のたびにレビューと再更新が必要になり、画像数が多いほどフレーキーな差分に遭遇する可能性が高まります。そのため、視覚テストはすべてのページに薄く広くカバーするのではなく、重要で安定したUIコンポーネントに集中させるべきです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI, nếu artifact `test-results` chứa ảnh `-actual.png`, `-expected.png`, `-diff.png` cho một test fail, những file này dùng để làm gì?",
      "en": "In CI, if the `test-results` artifact contains `-actual.png`, `-expected.png`, `-diff.png` images for a failed test, what are these files used for?",
      "ja": "CIにおいて、失敗したテストの`test-results`アーティファクトに`-actual.png`、`-expected.png`、`-diff.png`の画像が含まれている場合、これらのファイルは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Cho phép tải về offline để phân tích: `expected` là baseline đã lưu, `actual` là ảnh mới chụp lúc chạy fail, `diff` là ảnh highlight vùng khác biệt để xác định nguyên nhân",
        "en": "They allow offline analysis: `expected` is the stored baseline, `actual` is the newly captured image at failure time, `diff` highlights the differing regions to help identify the cause",
        "ja": "オフラインでの分析を可能にする：`expected`は保存されたベースライン、`actual`は失敗時に新しく撮影された画像、`diff`は差分領域をハイライトして原因特定を助ける"
      },
      {
        "vi": "Chỉ dùng để trang trí báo cáo, không có giá trị debug thực tế",
        "en": "They are only used to decorate the report and have no real debugging value",
        "ja": "レポートを装飾するためだけに使われ、実際のデバッグ価値はない"
      },
      {
        "vi": "Chỉ `diff.png` được sinh ra, hai file còn lại là tên gọi sai không tồn tại thực tế",
        "en": "Only `diff.png` is actually generated; the other two filenames don't really exist",
        "ja": "実際に生成されるのは`diff.png`のみで、他の2つのファイル名は実在しない"
      },
      {
        "vi": "Ba ảnh này đại diện cho ba trình duyệt Chromium, Firefox, WebKit tương ứng",
        "en": "These three images represent the three browsers Chromium, Firefox, and WebKit respectively",
        "ja": "この3つの画像はそれぞれChromium、Firefox、WebKitの3つのブラウザに対応している"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi so sánh ảnh thất bại, Playwright ghi cả ba file vào thư mục kết quả test: baseline gốc (`expected`), ảnh chụp thực tế lúc chạy (`actual`), và ảnh diff tô đỏ vùng khác biệt, giúp kỹ sư tải về xem ngay cả khi không mở được HTML report.",
      "en": "When an image comparison fails, Playwright writes all three files to the test results folder: the original baseline (`expected`), the actually captured image at run time (`actual`), and a diff image highlighting differences in red, letting engineers download and inspect them even without opening the HTML report.",
      "ja": "画像比較が失敗すると、Playwrightは3つのファイルすべてをテスト結果フォルダに書き込みます。元のベースライン（`expected`）、実行時に実際に撮影された画像（`actual`）、差分を赤でハイライトした画像（`diff`）です。これにより、HTMLレポートを開かなくてもエンジニアがダウンロードして確認できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi cần chụp ảnh của một component trong Storybook để làm visual regression bằng Playwright, cách tiếp cận phổ biến nào là hợp lý?",
      "en": "When capturing a Storybook component for visual regression with Playwright, what is a reasonable common approach?",
      "ja": "Playwrightを使ってStorybookコンポーネントの視覚回帰テストを行う場合、一般的で妥当なアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Playwright không thể tương tác với Storybook dưới bất kỳ hình thức nào",
        "en": "Playwright cannot interact with Storybook in any form",
        "ja": "Playwrightはいかなる形でもStorybookとやり取りできない"
      },
      {
        "vi": "Điều hướng `page.goto()` đến URL iframe story riêng lẻ (`?path=/story/...`) rồi chụp `expect(page).toHaveScreenshot()` cho từng story",
        "en": "Navigate `page.goto()` to the individual story's iframe URL (`?path=/story/...`) and capture `expect(page).toHaveScreenshot()` for each story",
        "ja": "`page.goto()`で個別のストーリーのiframe URL（`?path=/story/...`）に移動し、各ストーリーに対して`expect(page).toHaveScreenshot()`でキャプチャする"
      },
      {
        "vi": "Phải cài thêm plugin trả phí độc quyền của Storybook mới chụp được ảnh",
        "en": "A proprietary paid Storybook plugin must be installed to capture screenshots at all",
        "ja": "スクリーンショットを撮影するには、Storybookの独自の有料プラグインを追加インストールしなければならない"
      },
      {
        "vi": "Chỉ có thể chụp ảnh toàn bộ trang Storybook, không thể chụp riêng từng component/story",
        "en": "Only the entire Storybook page can be captured; individual components/stories cannot be captured separately",
        "ja": "Storybookページ全体のみキャプチャ可能であり、個々のコンポーネント/ストーリーを個別にキャプチャすることはできない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Storybook cho phép truy cập trực tiếp từng story qua URL dạng iframe.html?id=..., nên có thể `page.goto()` tới URL đó rồi dùng `toHaveScreenshot` bình thường để chụp riêng lẻ từng component, không cần plugin đặc biệt.",
      "en": "Storybook allows direct access to each story via an iframe.html?id=... URL, so you can `page.goto()` to that URL and use `toHaveScreenshot` normally to capture each component individually, with no special plugin needed.",
      "ja": "Storybookはiframe.html?id=...形式のURLで各ストーリーに直接アクセスできるため、そのURLへ`page.goto()`し、通常の`toHaveScreenshot`を使って各コンポーネントを個別にキャプチャできます。特別なプラグインは不要です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nhận định nào sau đây về `maxDiffPixels` so với `maxDiffPixelRatio` là ĐÚNG?",
      "en": "Which of the following statements about `maxDiffPixels` versus `maxDiffPixelRatio` is TRUE?",
      "ja": "`maxDiffPixels`と`maxDiffPixelRatio`に関する次の記述のうち正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Cả hai chỉ có thể dùng độc lập, không bao giờ được set đồng thời trong cùng một lời gọi",
        "en": "Both can only be used independently and can never be set simultaneously in the same call",
        "ja": "両方とも独立してのみ使用可能であり、同じ呼び出しで同時に設定することはできない"
      },
      {
        "vi": "`maxDiffPixelRatio` chỉ áp dụng cho ảnh định dạng JPEG, không áp dụng cho PNG",
        "en": "`maxDiffPixelRatio` only applies to JPEG-format images, not PNG",
        "ja": "`maxDiffPixelRatio`はJPEG形式の画像にのみ適用され、PNGには適用されない"
      },
      {
        "vi": "`maxDiffPixels` là số pixel khác biệt tuyệt đối cho phép; `maxDiffPixelRatio` là tỉ lệ phần trăm (0-1) so với tổng pixel — chọn cái phù hợp tuỳ ảnh có kích thước cố định hay thay đổi",
        "en": "`maxDiffPixels` is the absolute allowed count of differing pixels; `maxDiffPixelRatio` is a percentage (0-1) relative to total pixels — choose based on whether image size is fixed or variable",
        "ja": "`maxDiffPixels`は許容される差分ピクセルの絶対数、`maxDiffPixelRatio`は総ピクセル数に対する割合（0〜1）である。画像サイズが固定か可変かによって使い分ける"
      },
      {
        "vi": "`maxDiffPixels` luôn override `threshold` và làm cho `threshold` không còn tác dụng",
        "en": "`maxDiffPixels` always overrides `threshold`, rendering `threshold` ineffective",
        "ja": "`maxDiffPixels`は常に`threshold`をオーバーライドし、`threshold`を無効にする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hai tuỳ chọn có thể dùng độc lập hoặc kết hợp; `maxDiffPixels` phù hợp khi kích thước ảnh cố định và biết trước ngưỡng pixel chấp nhận được, còn `maxDiffPixelRatio` linh hoạt hơn cho ảnh có kích thước thay đổi theo nội dung động.",
      "en": "The two options can be used independently or together; `maxDiffPixels` suits fixed-size images where an acceptable pixel threshold is known in advance, while `maxDiffPixelRatio` is more flexible for images whose size varies with dynamic content.",
      "ja": "この2つのオプションは独立してもまとめても使用できます。`maxDiffPixels`は画像サイズが固定で許容ピクセル閾値が事前にわかっている場合に適し、`maxDiffPixelRatio`は動的コンテンツによってサイズが変わる画像により柔軟に対応できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điều gì KHÔNG đúng khi mô tả cách Playwright xử lý screenshot cho các trang có font web (web font) chưa load xong?",
      "en": "Which statement is INCORRECT about how Playwright handles screenshots for pages with web fonts that haven't finished loading?",
      "ja": "Webフォントの読み込みが完了していないページのスクリーンショットをPlaywrightがどう処理するかについて、誤っている記述はどれですか。"
    },
    "options": [
      {
        "vi": "Font web tải chậm là một nguồn phổ biến gây flaky test trong visual regression nếu team không chủ động xử lý trạng thái chờ",
        "en": "Slow-loading web fonts are a common source of flaky visual regression tests if the team doesn't proactively handle the wait state",
        "ja": "チームが待機状態を能動的に処理しない場合、読み込みが遅いWebフォントは視覚回帰テストがフレーキーになる一般的な原因となる"
      },
      {
        "vi": "Font web chưa load kịp có thể khiến trình duyệt render bằng font fallback tạm thời, gây khác biệt ảnh giữa các lần chạy nếu không xử lý",
        "en": "Web fonts not finished loading can cause the browser to render with a temporary fallback font, causing image differences between runs if unhandled",
        "ja": "Webフォントの読み込みが間に合わない場合、ブラウザが一時的なフォールバックフォントでレンダリングすることがあり、対処しないと実行ごとに画像差分が生じる可能性がある"
      },
      {
        "vi": "Có thể chủ động chờ bằng `page.evaluate(() => document.fonts.ready)` trong test trước khi gọi `toHaveScreenshot` để tăng độ ổn định",
        "en": "You can proactively wait using `page.evaluate(() => document.fonts.ready)` in the test before calling `toHaveScreenshot` to increase stability",
        "ja": "テスト内で`toHaveScreenshot`を呼ぶ前に`page.evaluate(() => document.fonts.ready)`で能動的に待機し、安定性を高めることができる"
      },
      {
        "vi": "Playwright tự động chờ `document.fonts.ready` trước khi chụp để đảm bảo font đã load, giảm sai lệch text rendering",
        "en": "Playwright automatically waits for `document.fonts.ready` before capturing to ensure fonts are loaded, reducing text rendering mismatches",
        "ja": "Playwrightはキャプチャ前に自動的に`document.fonts.ready`を待機し、フォントの読み込みを保証してテキストレンダリングの不一致を減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright KHÔNG tự động chờ font load xong trước khi chụp; đây là điểm sai trong câu A. Người viết test cần tự đảm bảo font đã sẵn sàng (ví dụ chờ `document.fonts.ready`) để tránh flaky do FOUT/FOIT.",
      "en": "Playwright does NOT automatically wait for fonts to finish loading before capturing; this is the incorrect claim. Test authors must ensure fonts are ready themselves (e.g. waiting on `document.fonts.ready`) to avoid flakiness from FOUT/FOIT.",
      "ja": "Playwrightはキャプチャ前にフォントの読み込み完了を自動的に待機する「わけではありません」。これが誤った記述です。テスト作成者はFOUT/FOITによるフレーキーさを避けるため、自分でフォントの準備完了（例：`document.fonts.ready`の待機）を保証する必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong Playwright, để tương tác với phần tử bên trong một iframe, cách được khuyến nghị hiện nay là gì?",
      "en": "In Playwright, what is the currently recommended way to interact with elements inside an iframe?",
      "ja": "Playwrightでは、iframe内の要素を操作する現在推奨される方法は何ですか。"
    },
    "options": [
      {
        "vi": "Dùng page.frameLocator(selector) để lấy locator phạm vi trong iframe rồi thao tác trực tiếp",
        "en": "Use page.frameLocator(selector) to get a scoped locator inside the iframe and interact directly",
        "ja": "page.frameLocator(selector)でiframe内にスコープされたロケーターを取得し、直接操作する"
      },
      {
        "vi": "Dùng page.switchTo().frame() như Selenium",
        "en": "Use page.switchTo().frame() like Selenium",
        "ja": "Seleniumのようにpage.switchTo().frame()を使う"
      },
      {
        "vi": "Chỉ có thể thao tác iframe bằng cách chạy JavaScript injection",
        "en": "Iframes can only be interacted with via JavaScript injection",
        "ja": "iframeはJavaScriptインジェクションでしか操作できない"
      },
      {
        "vi": "Playwright không hỗ trợ thao tác trong iframe",
        "en": "Playwright does not support interacting inside iframes",
        "ja": "Playwrightはiframe内の操作をサポートしていない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "frameLocator trả về một đối tượng locator đã tự động chờ iframe xuất hiện và cho phép truy vấn phần tử bên trong mà không cần chuyển ngữ cảnh thủ công.",
      "en": "frameLocator returns a locator object that auto-waits for the iframe to appear and lets you query elements inside without manually switching context.",
      "ja": "frameLocatorはiframeの出現を自動待機するロケーターオブジェクトを返し、手動でコンテキストを切り替えずに内部要素を照会できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi một iframe nằm lồng bên trong một iframe khác, cú pháp nào đúng để truy cập phần tử ở iframe trong cùng?",
      "en": "When an iframe is nested inside another iframe, which syntax correctly accesses an element in the innermost iframe?",
      "ja": "iframeが別のiframeの中にネストされている場合、最も内側のiframeの要素にアクセスする正しい構文はどれですか。"
    },
    "options": [
      {
        "vi": "page.frame('outer').frame('inner').locator(selector)",
        "en": "page.frame('outer').frame('inner').locator(selector)",
        "ja": "page.frame('outer').frame('inner').locator(selector)"
      },
      {
        "vi": "page.frameLocator('#outer').frameLocator('#inner').locator(selector)",
        "en": "page.frameLocator('#outer').frameLocator('#inner').locator(selector)",
        "ja": "page.frameLocator('#outer').frameLocator('#inner').locator(selector)"
      },
      {
        "vi": "page.locator('#outer #inner').locator(selector)",
        "en": "page.locator('#outer #inner').locator(selector)",
        "ja": "page.locator('#outer #inner').locator(selector)"
      },
      {
        "vi": "page.mainFrame().childFrame('inner').locator(selector)",
        "en": "page.mainFrame().childFrame('inner').locator(selector)",
        "ja": "page.mainFrame().childFrame('inner').locator(selector)"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "frameLocator có thể xâu chuỗi liên tiếp để đi vào từng lớp iframe lồng nhau, mỗi frameLocator tự động chờ iframe tương ứng sẵn sàng.",
      "en": "frameLocator can be chained to drill into each nested iframe level, with each frameLocator auto-waiting for its corresponding iframe to be ready.",
      "ja": "frameLocatorは連鎖させて各ネストされたiframe階層に入ることができ、それぞれが対応するiframeの準備完了を自動待機します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sự khác biệt chính giữa page.frame({name}) và page.frameLocator(selector) là gì?",
      "en": "What is the key difference between page.frame({name}) and page.frameLocator(selector)?",
      "ja": "page.frame({name})とpage.frameLocator(selector)の主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are completely identical, only the naming differs",
        "ja": "両者は完全に同一で、名前が違うだけ"
      },
      {
        "vi": "page.frame chỉ dùng được trong TypeScript",
        "en": "page.frame only works in TypeScript",
        "ja": "page.frameはTypeScriptでしか使えない"
      },
      {
        "vi": "page.frame trả về Frame ngay lập tức và có thể null nếu chưa tồn tại, còn frameLocator trả về locator lười và tự chờ iframe xuất hiện",
        "en": "page.frame returns a Frame immediately and may be null if it doesn't exist yet, while frameLocator returns a lazy locator that auto-waits for the iframe to appear",
        "ja": "page.frameはすぐにFrameを返しまだ存在しない場合はnullになり得るが、frameLocatorは遅延評価のロケーターを返しiframeの出現を自動待機する"
      },
      {
        "vi": "frameLocator không hỗ trợ click hay fill",
        "en": "frameLocator does not support click or fill",
        "ja": "frameLocatorはclickやfillをサポートしていない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "page.frame trả về đối tượng Frame tại thời điểm gọi nên cần iframe đã load, trong khi frameLocator được thiết kế theo triết lý auto-waiting nên an toàn hơn khi iframe load bất đồng bộ.",
      "en": "page.frame returns the Frame object at call time so the iframe must already be loaded, whereas frameLocator follows the auto-waiting philosophy, making it safer when iframes load asynchronously.",
      "ja": "page.frameは呼び出し時点でFrameオブジェクトを返すためiframeが既にロードされている必要がありますが、frameLocatorは自動待機の思想に基づいているため、非同期でロードされるiframeに対してより安全です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để bắt sự kiện khi ứng dụng mở một tab/trang mới (ví dụ do click vào link target=_blank), Playwright cung cấp cách nào?",
      "en": "To capture the event when an application opens a new tab/page (e.g. from clicking a target=_blank link), what does Playwright provide?",
      "ja": "アプリケーションが新しいタブ/ページを開いたとき（例：target=_blankリンクのクリック）のイベントを捕捉するために、Playwrightは何を提供していますか。"
    },
    "options": [
      {
        "vi": "Chỉ có thể phát hiện tab mới bằng cách polling document.title",
        "en": "New tabs can only be detected by polling document.title",
        "ja": "新しいタブはdocument.titleをポーリングすることでしか検出できない"
      },
      {
        "vi": "page.reload() sau khi click",
        "en": "page.reload() after clicking",
        "ja": "クリック後にpage.reload()"
      },
      {
        "vi": "Playwright tự động đóng tab mới nên không cần xử lý",
        "en": "Playwright automatically closes new tabs so no handling is needed",
        "ja": "Playwrightは新しいタブを自動的に閉じるため処理は不要"
      },
      {
        "vi": "context.waitForEvent('page') kết hợp Promise.all với hành động gây ra tab mới",
        "en": "context.waitForEvent('page') combined with Promise.all alongside the action that triggers the new tab",
        "ja": "新しいタブを引き起こすアクションとPromise.allで組み合わせるcontext.waitForEvent('page')"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sự kiện 'page' trên BrowserContext bắn ra khi có trang mới được tạo; dùng Promise.all để chờ đồng thời sự kiện và hành động kích hoạt nhằm tránh race condition.",
      "en": "The 'page' event on BrowserContext fires when a new page is created; Promise.all is used to wait for both the event and the triggering action simultaneously to avoid a race condition.",
      "ja": "BrowserContextの'page'イベントは新しいページが作成されたときに発火します。イベントとトリガーとなるアクションを同時に待つためにPromise.allを使い、競合状態を回避します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi một popup được mở bằng window.open() từ JavaScript, Playwright coi popup đó là gì?",
      "en": "When a popup is opened via JavaScript window.open(), how does Playwright treat that popup?",
      "ja": "JavaScriptのwindow.open()でポップアップが開かれた場合、Playwrightはそのポップアップをどう扱いますか。"
    },
    "options": [
      {
        "vi": "Một Page mới thuộc cùng BrowserContext, có thể lấy qua sự kiện 'popup' trên trang gốc",
        "en": "A new Page belonging to the same BrowserContext, obtainable via the 'popup' event on the originating page",
        "ja": "同じBrowserContextに属する新しいPageで、元のページの'popup'イベントから取得できる"
      },
      {
        "vi": "Một BrowserContext hoàn toàn tách biệt",
        "en": "A completely separate BrowserContext",
        "ja": "完全に分離されたBrowserContext"
      },
      {
        "vi": "Một Frame con của trang gốc",
        "en": "A child Frame of the originating page",
        "ja": "元のページの子Frame"
      },
      {
        "vi": "Playwright bỏ qua popup, không thể truy cập được",
        "en": "Playwright ignores popups entirely and they are inaccessible",
        "ja": "Playwrightはポップアップを完全に無視し、アクセスできない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "popup được tạo trong cùng context với trang mở nó, và sự kiện 'popup' trên Page gốc cho phép lấy đối tượng Page mới để thao tác tiếp.",
      "en": "A popup is created within the same context as the page that opened it, and the 'popup' event on the originating Page lets you retrieve the new Page object to continue interacting.",
      "ja": "ポップアップは開いた元のページと同じコンテキスト内に作成され、元のPageの'popup'イベントで新しいPageオブジェクトを取得して操作を続けられます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đâu là cách xử lý ĐÚNG một hộp thoại alert() xuất hiện khi click nút trên trang?",
      "en": "What is the correct way to handle an alert() dialog that appears when clicking a button on the page?",
      "ja": "ページ上のボタンをクリックしたときに表示されるalert()ダイアログを正しく処理する方法はどれですか。"
    },
    "options": [
      {
        "vi": "Click nút trước, rồi gọi page.click('button:has-text(\"OK\")') để đóng dialog vì nó là phần tử DOM",
        "en": "Click the button first, then call page.click('button:has-text(\"OK\")') to close the dialog since it's a DOM element",
        "ja": "まずボタンをクリックし、ダイアログはDOM要素なのでpage.click('button:has-text(\"OK\")')で閉じる"
      },
      {
        "vi": "Đăng ký page.on('dialog', dialog => dialog.accept()) TRƯỚC khi thực hiện hành động gây ra dialog",
        "en": "Register page.on('dialog', dialog => dialog.accept()) BEFORE performing the action that triggers the dialog",
        "ja": "ダイアログを発生させるアクションを実行する前にpage.on('dialog', dialog => dialog.accept())を登録する"
      },
      {
        "vi": "Không cần xử lý gì vì Playwright tự động đóng mọi dialog theo mặc định",
        "en": "No handling needed because Playwright automatically closes all dialogs by default",
        "ja": "Playwrightはデフォルトですべてのダイアログを自動的に閉じるため、何も処理する必要はない"
      },
      {
        "vi": "Dùng page.keyboard.press('Enter') để xác nhận alert",
        "en": "Use page.keyboard.press('Enter') to confirm the alert",
        "ja": "page.keyboard.press('Enter')でalertを確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Dialog gốc trình duyệt không phải phần tử DOM nên phải xử lý qua sự kiện 'dialog'; listener cần đăng ký trước hành động kích hoạt để tránh dialog bị treo hoặc auto-dismiss.",
      "en": "Native browser dialogs are not DOM elements so they must be handled via the 'dialog' event; the listener must be registered before the triggering action to avoid the dialog hanging or being auto-dismissed.",
      "ja": "ネイティブブラウザダイアログはDOM要素ではないため'dialog'イベントで処理する必要があり、ダイアログがハングしたり自動的に却下されたりしないよう、トリガーとなるアクションの前にリスナーを登録する必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu không đăng ký listener page.on('dialog') nào, hành vi mặc định của Playwright khi gặp dialog alert/confirm là gì?",
      "en": "If no page.on('dialog') listener is registered, what is Playwright's default behavior when it encounters an alert/confirm dialog?",
      "ja": "page.on('dialog')リスナーが登録されていない場合、alert/confirmダイアログに遭遇したときのPlaywrightのデフォルト動作は何ですか。"
    },
    "options": [
      {
        "vi": "Playwright ném lỗi ngay lập tức và dừng test",
        "en": "Playwright throws an error immediately and stops the test",
        "ja": "Playwrightは即座にエラーを投げてテストを停止する"
      },
      {
        "vi": "Test sẽ bị treo vô thời hạn chờ người dùng thao tác",
        "en": "The test hangs indefinitely waiting for user interaction",
        "ja": "テストはユーザー操作を待って無期限にハングする"
      },
      {
        "vi": "Playwright tự động dismiss (hủy) dialog để test không bị treo",
        "en": "Playwright automatically dismisses the dialog so the test doesn't hang",
        "ja": "Playwrightはテストがハングしないように自動的にダイアログをdismissする"
      },
      {
        "vi": "Dialog bị bỏ qua hoàn toàn và không xuất hiện trên trình duyệt",
        "en": "The dialog is completely ignored and never appears in the browser",
        "ja": "ダイアログは完全に無視され、ブラウザに表示されることもない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khác với chạy thủ công, Playwright tự động dismiss mọi dialog nếu không có listener xử lý, giúp tránh treo test nhưng có thể che giấu hành vi cần assert.",
      "en": "Unlike manual browsing, Playwright auto-dismisses any dialog when no listener handles it, preventing the test from hanging but potentially hiding behavior that should be asserted.",
      "ja": "手動ブラウジングとは異なり、Playwrightはリスナーが処理しない場合すべてのダイアログを自動的にdismissし、テストのハングを防ぎますが、アサートすべき動作を隠してしまう可能性があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để nhập văn bản và xác nhận một dialog kiểu prompt() trong Playwright, cần làm gì?",
      "en": "To enter text and confirm a prompt()-type dialog in Playwright, what needs to be done?",
      "ja": "Playwrightでprompt()型のダイアログにテキストを入力して確認するには何をする必要がありますか。"
    },
    "options": [
      {
        "vi": "Dùng page.keyboard.type() sau khi dialog xuất hiện",
        "en": "Use page.keyboard.type() after the dialog appears",
        "ja": "ダイアログが表示された後にpage.keyboard.type()を使う"
      },
      {
        "vi": "Gõ trực tiếp bằng page.fill() vào dialog",
        "en": "Type directly into the dialog using page.fill()",
        "ja": "page.fill()を使ってダイアログに直接入力する"
      },
      {
        "vi": "Prompt dialog không thể nhập văn bản bằng Playwright",
        "en": "Prompt dialogs cannot have text entered via Playwright",
        "ja": "prompt型ダイアログにはPlaywrightでテキストを入力できない"
      },
      {
        "vi": "Gọi dialog.accept('văn bản cần nhập') trong handler 'dialog'",
        "en": "Call dialog.accept('the text to enter') inside the 'dialog' handler",
        "ja": "'dialog'ハンドラー内でdialog.accept('入力するテキスト')を呼び出す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Phương thức dialog.accept() nhận tham số tùy chọn là chuỗi văn bản, dùng để điền vào prompt trước khi xác nhận, khác với confirm/alert không cần tham số.",
      "en": "The dialog.accept() method takes an optional string parameter used to fill the prompt before confirming, unlike confirm/alert which need no parameter.",
      "ja": "dialog.accept()メソッドはオプションの文字列パラメータを受け取り、確認前にプロンプトに入力するために使用されます。パラメータ不要のconfirm/alertとは異なります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Dialog beforeunload (cảnh báo khi rời trang có form chưa lưu) trong Playwright cần được xử lý như thế nào để test tiếp tục?",
      "en": "How should a beforeunload dialog (warning when leaving a page with unsaved form data) be handled in Playwright so the test proceeds?",
      "ja": "beforeunloadダイアログ（未保存フォームのあるページを離れる際の警告）はテストを継続させるためにPlaywrightでどう処理すべきですか。"
    },
    "options": [
      {
        "vi": "Đăng ký page.on('dialog') và gọi accept() hoặc dismiss() giống các dialog khác",
        "en": "Register page.on('dialog') and call accept() or dismiss() just like other dialogs",
        "ja": "他のダイアログと同様にpage.on('dialog')を登録しaccept()またはdismiss()を呼ぶ"
      },
      {
        "vi": "Không thể xử lý được, đây là giới hạn của Playwright",
        "en": "It cannot be handled; this is a limitation of Playwright",
        "ja": "処理できない。これはPlaywrightの制限である"
      },
      {
        "vi": "Phải tắt JavaScript của trang trước khi điều hướng",
        "en": "Must disable the page's JavaScript before navigating",
        "ja": "ナビゲーション前にページのJavaScriptを無効化する必要がある"
      },
      {
        "vi": "Dùng page.close({runBeforeUnload: false}) là cách duy nhất",
        "en": "Using page.close({runBeforeUnload: false}) is the only way",
        "ja": "page.close({runBeforeUnload: false})が唯一の方法である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "beforeunload cũng phát sinh sự kiện 'dialog' loại beforeunload, được xử lý đồng nhất qua cùng cơ chế accept/dismiss như alert, confirm, prompt.",
      "en": "beforeunload also fires a 'dialog' event of type beforeunload, handled uniformly through the same accept/dismiss mechanism as alert, confirm, and prompt.",
      "ja": "beforeunloadもtypeがbeforeunloadの'dialog'イベントを発生させ、alert、confirm、promptと同じaccept/dismiss機構で統一的に処理されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cách đơn giản và đáng tin cậy nhất để upload một file qua input[type=file] trong Playwright là gì?",
      "en": "What is the simplest and most reliable way to upload a file via input[type=file] in Playwright?",
      "ja": "Playwrightでinput[type=file]を通じてファイルをアップロードする最もシンプルで信頼性の高い方法は何ですか。"
    },
    "options": [
      {
        "vi": "Giả lập kéo-thả file bằng chuột (mouse drag) vào vùng upload",
        "en": "Simulate a mouse drag-and-drop of the file into the upload area",
        "ja": "アップロード領域へのファイルのマウスドラッグ＆ドロップをシミュレートする"
      },
      {
        "vi": "page.locator('input[type=file]').setInputFiles('duong/dan/file.pdf')",
        "en": "page.locator('input[type=file]').setInputFiles('path/to/file.pdf')",
        "ja": "page.locator('input[type=file]').setInputFiles('path/to/file.pdf')"
      },
      {
        "vi": "Gửi file trực tiếp qua API request thay vì UI",
        "en": "Send the file directly via an API request instead of the UI",
        "ja": "UIではなくAPIリクエストで直接ファイルを送信する"
      },
      {
        "vi": "Điều khiển hộp thoại chọn file gốc của hệ điều hành bằng phím tắt",
        "en": "Control the native OS file picker dialog using keyboard shortcuts",
        "ja": "キーボードショートカットでOSネイティブのファイル選択ダイアログを操作する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "setInputFiles thao tác trực tiếp trên input DOM để gán file, không cần mở hộp thoại hệ điều hành, hoạt động ổn định và nhanh trên mọi trình duyệt.",
      "en": "setInputFiles operates directly on the DOM input to assign files, without needing to open the native OS dialog, and works reliably and fast across all browsers.",
      "ja": "setInputFilesはDOMのinputに対して直接ファイルを割り当てる操作を行い、OSネイティブダイアログを開く必要がなく、全ブラウザで安定して高速に動作します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi input[type=file] bị ẩn hoàn toàn (display:none) và chỉ được kích hoạt bởi một nút tùy chỉnh qua hộp thoại hệ điều hành, Playwright xử lý ra sao?",
      "en": "When input[type=file] is completely hidden (display:none) and only triggered via a custom button through the OS file picker, how does Playwright handle it?",
      "ja": "input[type=file]が完全に非表示（display:none）で、カスタムボタン経由でOSファイル選択ダイアログを介してのみトリガーされる場合、Playwrightはどう処理しますか。"
    },
    "options": [
      {
        "vi": "Không thể test upload nếu input bị ẩn",
        "en": "Uploading cannot be tested if the input is hidden",
        "ja": "inputが非表示だとアップロードのテストはできない"
      },
      {
        "vi": "Bắt buộc phải bắt sự kiện 'filechooser' rồi mới setInputFiles",
        "en": "You must always catch the 'filechooser' event before calling setInputFiles",
        "ja": "必ず'filechooser'イベントをキャッチしてからsetInputFilesを呼ぶ必要がある"
      },
      {
        "vi": "Vẫn có thể gọi setInputFiles trực tiếp trên input ẩn đó mà không cần mở hộp thoại hệ điều hành",
        "en": "You can still call setInputFiles directly on that hidden input without opening the OS dialog",
        "ja": "OSダイアログを開かずに、その非表示inputに対して直接setInputFilesを呼び出せる"
      },
      {
        "vi": "Phải dùng CDP session để can thiệp trực tiếp vào OS",
        "en": "You must use a CDP session to directly control the OS",
        "ja": "OSを直接制御するためにCDPセッションを使わなければならない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "setInputFiles không phụ thuộc trạng thái hiển thị hay việc mở hộp thoại hệ điều hành thật, chỉ cần locator trỏ đúng tới phần tử input trong DOM, kể cả khi bị ẩn bằng CSS.",
      "en": "setInputFiles doesn't depend on visibility state or actually opening a native OS dialog; it only needs the locator to correctly target the input element in the DOM, even if hidden via CSS.",
      "ja": "setInputFilesは表示状態や実際のOSダイアログのオープンに依存せず、CSSで非表示になっていてもDOM内のinput要素を正しくターゲットするロケーターがあればよいです。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sự kiện 'filechooser' trong Playwright được dùng khi nào là phù hợp nhất?",
      "en": "When is Playwright's 'filechooser' event most appropriately used?",
      "ja": "Playwrightの'filechooser'イベントが最も適切に使用されるのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi cần chuyển đổi giữa các iframe",
        "en": "When you need to switch between iframes",
        "ja": "iframe間を切り替える必要がある場合"
      },
      {
        "vi": "Khi muốn tải file xuống máy",
        "en": "When you want to download a file to disk",
        "ja": "ファイルをディスクにダウンロードしたい場合"
      },
      {
        "vi": "Khi muốn đóng popup mới mở",
        "en": "When you want to close a newly opened popup",
        "ja": "新しく開いたポップアップを閉じたい場合"
      },
      {
        "vi": "Khi ứng dụng mở hộp thoại chọn file bằng JavaScript (ví dụ input.click() được kích hoạt gián tiếp) và ta cần chờ để gán file",
        "en": "When the app opens the file picker via JavaScript (e.g. input.click() triggered indirectly) and we need to wait for it to assign a file",
        "ja": "アプリがJavaScriptでファイル選択ダイアログを開き（例：間接的にトリガーされるinput.click()）、ファイルを割り当てるために待つ必要がある場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "page.waitForEvent('filechooser') bắt sự kiện FileChooser phát sinh khi input file được kích hoạt gián tiếp qua JS, cho phép gọi setFiles trên đối tượng đó để hoàn tất upload.",
      "en": "page.waitForEvent('filechooser') captures the FileChooser event fired when a file input is triggered indirectly via JS, letting you call setFiles on that object to complete the upload.",
      "ja": "page.waitForEvent('filechooser')はJS経由で間接的にファイル入力がトリガーされたときに発生するFileChooserイベントを捕捉し、そのオブジェクトに対してsetFilesを呼び出してアップロードを完了できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để upload nhiều file cùng lúc vào một input[type=file] hỗ trợ multiple, ta truyền tham số như thế nào cho setInputFiles?",
      "en": "To upload multiple files at once to an input[type=file] that supports multiple, how should the parameter be passed to setInputFiles?",
      "ja": "multiple属性をサポートするinput[type=file]に複数ファイルを一度にアップロードするには、setInputFilesにどうパラメータを渡すべきですか。"
    },
    "options": [
      {
        "vi": "Truyền một mảng đường dẫn file, ví dụ setInputFiles(['a.png', 'b.png'])",
        "en": "Pass an array of file paths, e.g. setInputFiles(['a.png', 'b.png'])",
        "ja": "ファイルパスの配列を渡す。例：setInputFiles(['a.png', 'b.png'])"
      },
      {
        "vi": "Gọi setInputFiles nhiều lần liên tiếp, mỗi lần một file",
        "en": "Call setInputFiles multiple times in sequence, once per file",
        "ja": "setInputFilesを連続して複数回呼び出し、1回につき1ファイルずつ渡す"
      },
      {
        "vi": "Playwright không hỗ trợ upload nhiều file cùng lúc",
        "en": "Playwright does not support uploading multiple files at once",
        "ja": "Playwrightは複数ファイルの同時アップロードをサポートしていない"
      },
      {
        "vi": "Nén các file thành zip rồi upload zip",
        "en": "Compress the files into a zip and upload the zip",
        "ja": "ファイルをzipに圧縮してからzipをアップロードする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "setInputFiles chấp nhận một mảng đường dẫn hoặc buffer, gán tất cả cùng lúc vào thuộc tính files của input, tương ứng hành vi chọn nhiều file trên hệ điều hành thật.",
      "en": "setInputFiles accepts an array of paths or buffers, assigning them all at once to the input's files property, mirroring real OS multi-file selection.",
      "ja": "setInputFilesはパスやバッファの配列を受け付け、それらすべてを一度にinputのfilesプロパティに割り当てます。実際のOSでの複数ファイル選択の動作を再現します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "setInputFiles còn hỗ trợ cách nào khác ngoài truyền đường dẫn file có sẵn trên đĩa?",
      "en": "Besides passing a path to an existing file on disk, what other way does setInputFiles support?",
      "ja": "ディスク上の既存ファイルへのパスを渡す以外に、setInputFilesがサポートしている方法は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ hỗ trợ đường dẫn tuyệt đối, không hỗ trợ gì khác",
        "en": "Only supports absolute paths, nothing else",
        "ja": "絶対パスのみをサポートし、他は一切サポートしない"
      },
      {
        "vi": "Truyền một object gồm name, mimeType và buffer để tạo file trong bộ nhớ mà không cần file vật lý",
        "en": "Passing an object with name, mimeType, and buffer to create an in-memory file without a physical file",
        "ja": "物理ファイルなしでインメモリのファイルを作成するために、name、mimeType、bufferを含むオブジェクトを渡す"
      },
      {
        "vi": "Truyền URL từ xa để Playwright tự tải file về trước",
        "en": "Passing a remote URL so Playwright downloads the file first",
        "ja": "Playwrightが事前にファイルをダウンロードするようにリモートURLを渡す"
      },
      {
        "vi": "Chỉ hỗ trợ file ảnh (png, jpg)",
        "en": "Only supports image files (png, jpg)",
        "ja": "画像ファイル（png、jpg）のみをサポートする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Có thể truyền {name, mimeType, buffer} để tạo file ảo trong lúc chạy test, rất hữu ích khi cần sinh dữ liệu động mà không phụ thuộc file tĩnh trên đĩa.",
      "en": "You can pass {name, mimeType, buffer} to create a virtual file on the fly during the test run, useful when you need dynamically generated data without relying on a static file on disk.",
      "ja": "{name, mimeType, buffer}を渡すことでテスト実行中に仮想ファイルを作成でき、ディスク上の静的ファイルに依存せずに動的に生成されたデータが必要な場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để bắt sự kiện tải file xuống khi click nút download, Playwright yêu cầu thao tác nào?",
      "en": "To capture a file download event when clicking a download button, what does Playwright require?",
      "ja": "ダウンロードボタンをクリックしたときのファイルダウンロードイベントを捕捉するために、Playwrightは何を要求しますか。"
    },
    "options": [
      {
        "vi": "Dùng page.route để chặn request tải file rồi tự parse response",
        "en": "Use page.route to intercept the download request and manually parse the response",
        "ja": "page.routeを使ってダウンロードリクエストをインターセプトし、手動でレスポンスをパースする"
      },
      {
        "vi": "Chỉ cần click, Playwright tự lưu file vào thư mục Downloads mặc định mà không cần code gì thêm",
        "en": "Just click; Playwright automatically saves the file to the default Downloads folder with no extra code",
        "ja": "クリックするだけでよく、追加コードなしでPlaywrightが自動的にデフォルトのDownloadsフォルダにファイルを保存する"
      },
      {
        "vi": "page.waitForEvent('download') kết hợp Promise.all cùng hành động click, hoặc dùng page.waitForDownload",
        "en": "page.waitForEvent('download') combined with Promise.all alongside the click action, or using page.waitForDownload",
        "ja": "クリックアクションとPromise.allで組み合わせるpage.waitForEvent('download')、またはpage.waitForDownloadの使用"
      },
      {
        "vi": "Download không thể test được trong Playwright vì lý do bảo mật trình duyệt",
        "en": "Downloads cannot be tested in Playwright due to browser security restrictions",
        "ja": "ブラウザのセキュリティ制限のためPlaywrightではダウンロードをテストできない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Sự kiện 'download' phát sinh khi trình duyệt bắt đầu tải file; chờ đồng thời với hành động click qua Promise.all tránh bỏ lỡ sự kiện xảy ra quá nhanh.",
      "en": "The 'download' event fires when the browser starts a file download; waiting for it concurrently with the click action via Promise.all avoids missing an event that fires too fast.",
      "ja": "'download'イベントはブラウザがファイルダウンロードを開始したときに発火します。Promise.allでクリックアクションと同時に待つことで、発火が速すぎるイベントを見逃すことを防ぎます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Đối tượng Download trả về từ sự kiện 'download' cung cấp phương thức nào để lấy đường dẫn file tạm mà Playwright đã tải?",
      "en": "What method does the Download object returned from the 'download' event provide to get the temp file path Playwright downloaded?",
      "ja": "'download'イベントから返されるDownloadオブジェクトは、Playwrightがダウンロードした一時ファイルパスを取得するためにどのメソッドを提供していますか。"
    },
    "options": [
      {
        "vi": "download.url()",
        "en": "download.url()",
        "ja": "download.url()"
      },
      {
        "vi": "download.createReadStream() bắt buộc dùng thay path()",
        "en": "download.createReadStream() which must be used instead of path()",
        "ja": "path()の代わりに必ず使用しなければならないdownload.createReadStream()"
      },
      {
        "vi": "download.suggestedFilename()",
        "en": "download.suggestedFilename()",
        "ja": "download.suggestedFilename()"
      },
      {
        "vi": "download.path()",
        "en": "download.path()",
        "ja": "download.path()"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "download.path() trả về đường dẫn tới file đã được Playwright lưu tạm trên đĩa, dùng để đọc nội dung hoặc kiểm tra sự tồn tại của file sau khi tải xong.",
      "en": "download.path() returns the path to the file Playwright saved temporarily on disk, used to read the content or verify the file's existence after the download completes.",
      "ja": "download.path()はPlaywrightがディスクに一時保存したファイルへのパスを返し、ダウンロード完了後にコンテンツを読み取ったりファイルの存在を確認したりするために使用されます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Muốn lưu file đã tải về vào một vị trí cụ thể trên đĩa thay vì thư mục tạm mặc định, ta dùng phương thức nào của Download?",
      "en": "To save a downloaded file to a specific location on disk instead of the default temp folder, which Download method should be used?",
      "ja": "ダウンロードしたファイルをデフォルトの一時フォルダではなくディスク上の特定の場所に保存したい場合、Downloadのどのメソッドを使うべきですか。"
    },
    "options": [
      {
        "vi": "download.saveAs('/duong/dan/luu/file.pdf')",
        "en": "download.saveAs('/path/to/save/file.pdf')",
        "ja": "download.saveAs('/path/to/save/file.pdf')"
      },
      {
        "vi": "download.move('/duong/dan/luu/file.pdf')",
        "en": "download.move('/path/to/save/file.pdf')",
        "ja": "download.move('/path/to/save/file.pdf')"
      },
      {
        "vi": "download.write('/duong/dan/luu/file.pdf')",
        "en": "download.write('/path/to/save/file.pdf')",
        "ja": "download.write('/path/to/save/file.pdf')"
      },
      {
        "vi": "Không thể thay đổi vị trí lưu, phải copy thủ công bằng fs",
        "en": "You cannot change the save location; you must manually copy it using fs",
        "ja": "保存場所は変更できず、fsで手動コピーする必要がある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "saveAs sao chép file đã tải từ vị trí tạm sang đường dẫn chỉ định, tiện lợi khi cần lưu file kết quả để đối chiếu hoặc đính kèm báo cáo test.",
      "en": "saveAs copies the downloaded file from its temp location to a specified path, convenient when you need to persist the result file for comparison or attaching to a test report.",
      "ja": "saveAsはダウンロードされたファイルを一時的な場所から指定パスにコピーします。比較用やテストレポートへの添付のために結果ファイルを保存する必要がある場合に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Thuộc tính BrowserContext nào cần được bật để Playwright cho phép và theo dõi việc tải file xuống trong test?",
      "en": "Which BrowserContext option must be enabled for Playwright to allow and track file downloads during tests?",
      "ja": "テスト中のファイルダウンロードをPlaywrightが許可し追跡するために有効にする必要があるBrowserContextのオプションはどれですか。"
    },
    "options": [
      {
        "vi": "headless: false",
        "en": "headless: false",
        "ja": "headless: false"
      },
      {
        "vi": "acceptDownloads (mặc định đã bật ở các phiên bản mới nhưng có thể cấu hình rõ khi tạo context)",
        "en": "acceptDownloads (enabled by default in newer versions but can be explicitly configured when creating a context)",
        "ja": "acceptDownloads（新しいバージョンではデフォルトで有効だが、コンテキスト作成時に明示的に設定可能）"
      },
      {
        "vi": "ignoreHTTPSErrors",
        "en": "ignoreHTTPSErrors",
        "ja": "ignoreHTTPSErrors"
      },
      {
        "vi": "bypassCSP",
        "en": "bypassCSP",
        "ja": "bypassCSP"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "acceptDownloads kiểm soát việc trình duyệt có xử lý và lưu file tải về hay không; nếu tắt, sự kiện download vẫn bắn nhưng không thể lấy nội dung file.",
      "en": "acceptDownloads controls whether the browser processes and saves downloaded files; if disabled, the download event still fires but the file content cannot be retrieved.",
      "ja": "acceptDownloadsはブラウザがダウンロードされたファイルを処理・保存するかどうかを制御します。無効の場合、downloadイベントは発火してもファイルの内容を取得できません。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "download.suggestedFilename() trả về giá trị gì?",
      "en": "What value does download.suggestedFilename() return?",
      "ja": "download.suggestedFilename()はどのような値を返しますか。"
    },
    "options": [
      {
        "vi": "Đường dẫn tuyệt đối trên đĩa nơi file được lưu tạm",
        "en": "The absolute path on disk where the file was temporarily saved",
        "ja": "ファイルが一時保存されたディスク上の絶対パス"
      },
      {
        "vi": "Kích thước file tính bằng byte",
        "en": "The file size in bytes",
        "ja": "バイト単位のファイルサイズ"
      },
      {
        "vi": "Tên file gợi ý dựa trên header Content-Disposition hoặc URL, dùng để đặt tên khi lưu file",
        "en": "The suggested filename derived from the Content-Disposition header or URL, used when naming the file on save",
        "ja": "Content-Disposisionヘッダーまたはurlに基づく推奨ファイル名で、保存時のファイル名付けに使用される"
      },
      {
        "vi": "MIME type của file",
        "en": "The MIME type of the file",
        "ja": "ファイルのMIMEタイプ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "suggestedFilename lấy tên mà trình duyệt đề xuất để lưu (dựa vào server hoặc URL), khác với path() là vị trí file tạm nội bộ do Playwright quản lý.",
      "en": "suggestedFilename returns the name the browser proposes for saving (based on the server or URL), distinct from path() which is the internal temp location managed by Playwright.",
      "ja": "suggestedFilenameはブラウザが保存のために提案する名前（サーバーまたはURLに基づく）を返し、Playwrightが管理する内部一時保存場所であるpath()とは異なります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test có nhiều tab đang mở, làm sao lấy được tất cả các Page hiện có trong một BrowserContext?",
      "en": "When a test has multiple tabs open, how do you get all current Page objects in a BrowserContext?",
      "ja": "テストで複数のタブが開いている場合、BrowserContext内の現在のすべてのPageオブジェクトを取得するにはどうすればよいですか。"
    },
    "options": [
      {
        "vi": "Không có API nào liệt kê các tab, phải tự lưu biến thủ công",
        "en": "There is no API to list tabs; you must manually track them yourself with variables",
        "ja": "タブを一覧表示するAPIは存在せず、変数で手動追跡する必要がある"
      },
      {
        "vi": "browser.contexts() trả về danh sách tab",
        "en": "browser.contexts() returns the list of tabs",
        "ja": "browser.contexts()がタブの一覧を返す"
      },
      {
        "vi": "page.frames() trả về danh sách tab",
        "en": "page.frames() returns the list of tabs",
        "ja": "page.frames()がタブの一覧を返す"
      },
      {
        "vi": "context.pages() trả về mảng tất cả các Page đang mở trong context đó",
        "en": "context.pages() returns an array of all Page objects currently open in that context",
        "ja": "context.pages()はそのコンテキスト内で現在開いているすべてのPageオブジェクトの配列を返す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "context.pages() cho danh sách đầy đủ Page hiện có, hữu ích khi cần tìm tab mới nhất hoặc lọc theo URL/title để chuyển thao tác sang đúng tab.",
      "en": "context.pages() returns the complete list of current Pages, useful for finding the newest tab or filtering by URL/title to switch actions to the correct tab.",
      "ja": "context.pages()は現在のPageの完全なリストを返し、最新のタブを見つけたりURL/タイトルでフィルタリングして正しいタブに操作を切り替えたりする際に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để đưa một tab cụ thể lên trước (giả lập người dùng chuyển focus sang tab đó), Playwright dùng phương thức nào?",
      "en": "To bring a specific tab to the front (simulating a user switching focus to it), which Playwright method is used?",
      "ja": "特定のタブを前面に出す（ユーザーがそのタブにフォーカスを切り替えることをシミュレートする）ために、Playwrightのどのメソッドを使いますか。"
    },
    "options": [
      {
        "vi": "page.bringToFront()",
        "en": "page.bringToFront()",
        "ja": "page.bringToFront()"
      },
      {
        "vi": "page.focus()",
        "en": "page.focus()",
        "ja": "page.focus()"
      },
      {
        "vi": "page.activate()",
        "en": "page.activate()",
        "ja": "page.activate()"
      },
      {
        "vi": "context.switchTab()",
        "en": "context.switchTab()",
        "ja": "context.switchTab()"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "bringToFront kích hoạt tab đó trong trình duyệt, hữu ích khi hành vi ứng dụng phụ thuộc trạng thái visibility/focus của tab, ví dụ xử lý sự kiện visibilitychange.",
      "en": "bringToFront activates that tab in the browser, useful when app behavior depends on the tab's visibility/focus state, e.g. handling the visibilitychange event.",
      "ja": "bringToFrontはブラウザ内でそのタブをアクティブにします。アプリの動作がタブの可視性/フォーカス状態に依存する場合、例えばvisibilitychangeイベントの処理などで便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Sau khi một popup hoàn thành nhiệm vụ (ví dụ xác thực OAuth) và tự đóng, thao tác tiếp theo trên trang gốc nên xử lý ra sao trong Playwright?",
      "en": "After a popup completes its task (e.g. OAuth authentication) and closes itself, how should subsequent actions on the original page be handled in Playwright?",
      "ja": "ポップアップがタスク（例：OAuth認証）を完了して自ら閉じた後、元のページでの後続操作はPlaywrightでどう処理すべきですか。"
    },
    "options": [
      {
        "vi": "Phải tạo lại toàn bộ BrowserContext mới",
        "en": "Must recreate the entire BrowserContext from scratch",
        "ja": "BrowserContext全体を新規に作り直さなければならない"
      },
      {
        "vi": "Tiếp tục thao tác trên đối tượng page gốc như bình thường; có thể chờ popup.waitForEvent('close') trước nếu cần đồng bộ thời điểm",
        "en": "Continue operating on the original page object as normal; can wait on popup.waitForEvent('close') beforehand if synchronization is needed",
        "ja": "元のpageオブジェクトで通常通り操作を続ける。タイミングの同期が必要な場合は事前にpopup.waitForEvent('close')を待つこともできる"
      },
      {
        "vi": "Trang gốc sẽ tự động bị đóng theo popup",
        "en": "The original page will automatically close along with the popup",
        "ja": "元のページはポップアップとともに自動的に閉じる"
      },
      {
        "vi": "Phải gọi page.reload() bắt buộc để đồng bộ trạng thái",
        "en": "Must call page.reload() mandatorily to sync state",
        "ja": "状態を同期するために必ずpage.reload()を呼ばなければならない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trang gốc không bị ảnh hưởng bởi việc popup đóng; nếu logic phụ thuộc kết quả trả về từ popup (như token), có thể chờ sự kiện 'close' của popup trước khi kiểm tra trạng thái trang gốc.",
      "en": "The original page is unaffected by the popup closing; if logic depends on a result returned from the popup (like a token), you can wait for the popup's 'close' event before checking the original page's state.",
      "ja": "元のページはポップアップが閉じても影響を受けません。ロジックがポップアップから返される結果（トークンなど）に依存する場合、元のページの状態を確認する前にポップアップの'close'イベントを待つことができます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong CI headless, việc chờ 'download' event bằng Promise.all thay vì gọi waitForEvent riêng lẻ sau click nhằm mục đích gì?",
      "en": "In a headless CI environment, why wait for the 'download' event using Promise.all instead of calling waitForEvent separately after the click?",
      "ja": "ヘッドレスCI環境において、クリック後に個別にwaitForEventを呼ぶのではなくPromise.allで'download'イベントを待つのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì headless không hỗ trợ download nên bắt buộc phải dùng Promise.all",
        "en": "Because headless mode doesn't support downloads, so Promise.all is mandatory",
        "ja": "ヘッドレスモードはダウンロードをサポートしないため、Promise.allが必須だから"
      },
      {
        "vi": "Chỉ để code ngắn gọn hơn, không có tác dụng kỹ thuật thực sự",
        "en": "Purely for shorter code, with no real technical benefit",
        "ja": "単にコードを短くするためで、実質的な技術的効果はない"
      },
      {
        "vi": "Để tránh race condition: nếu đăng ký waitForEvent sau khi click, sự kiện download có thể đã xảy ra và bị bỏ lỡ trước khi listener kịp gắn",
        "en": "To avoid a race condition: if waitForEvent is registered after the click, the download event may have already fired and been missed before the listener attaches",
        "ja": "競合状態を回避するため：クリック後にwaitForEventを登録すると、リスナーがアタッチされる前にすでにdownloadイベントが発火し見逃される可能性がある"
      },
      {
        "vi": "Vì click() trong Playwright luôn bất đồng bộ hoàn toàn độc lập với response",
        "en": "Because click() in Playwright is always fully async and independent of the response",
        "ja": "Playwrightのclick()は常に完全に非同期でレスポンスとは独立しているから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Promise.all đảm bảo listener của sự kiện được đăng ký song song và sẵn sàng trước khi hành động click thực sự kích hoạt tải file, tránh trường hợp sự kiện bắn ra quá nhanh trước khi kịp lắng nghe.",
      "en": "Promise.all ensures the event listener is registered in parallel and ready before the click action actually triggers the download, avoiding cases where the event fires too fast to be caught.",
      "ja": "Promise.allはイベントリスナーが並行して登録され、クリックアクションが実際にダウンロードをトリガーする前に準備が整っていることを保証し、イベントが速すぎてキャッチできないケースを回避します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi iframe chứa nội dung cross-origin (khác domain với trang chính), Playwright có thể thao tác được không?",
      "en": "When an iframe contains cross-origin content (a different domain from the main page), can Playwright still interact with it?",
      "ja": "iframeにクロスオリジンのコンテンツ（メインページと異なるドメイン）が含まれている場合、Playwrightはそれでも操作できますか。"
    },
    "options": [
      {
        "vi": "Không, cross-origin iframe hoàn toàn không thể truy cập vì chính sách same-origin của trình duyệt",
        "en": "No, cross-origin iframes are completely inaccessible due to the browser's same-origin policy",
        "ja": "いいえ、クロスオリジンのiframeはブラウザのsame-originポリシーにより完全にアクセス不可能"
      },
      {
        "vi": "Chỉ đọc được nội dung nhưng không click hay fill được",
        "en": "Content can only be read, not clicked or filled",
        "ja": "コンテンツは読み取れるだけで、クリックや入力はできない"
      },
      {
        "vi": "Chỉ thao tác được nếu tắt CORS trên server đích",
        "en": "Only works if CORS is disabled on the target server",
        "ja": "ターゲットサーバーでCORSを無効にした場合のみ動作する"
      },
      {
        "vi": "Có, vì Playwright điều khiển trình duyệt ở tầng CDP/protocol nên không bị giới hạn same-origin policy của JavaScript như khi thao tác qua window/document trong trang",
        "en": "Yes, because Playwright controls the browser at the CDP/protocol layer and is not bound by the JavaScript same-origin policy that applies to window/document access from within the page",
        "ja": "はい、Playwrightはページ内からのwindow/documentアクセスに適用されるJavaScriptのsame-originポリシーに縛られず、CDP/プロトコル層でブラウザを制御しているため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Playwright dùng giao thức điều khiển trình duyệt (như CDP) để truy cập DOM của mọi frame bất kể cross-origin, khác với script JS chạy trong trang bị chặn bởi same-origin policy.",
      "en": "Playwright uses a browser control protocol (like CDP) to access the DOM of any frame regardless of cross-origin, unlike in-page JS scripts which are blocked by the same-origin policy.",
      "ja": "Playwrightはブラウザ制御プロトコル（CDPなど）を使用してクロスオリジンに関わらずどのフレームのDOMにもアクセスできます。same-originポリシーによってブロックされるページ内JSスクリプトとは異なります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi test cần thao tác qua lại giữa hai tab (ví dụ tab A gửi lời mời, tab B chấp nhận), cách tổ chức code hợp lý nhất là gì?",
      "en": "When a test needs to interact back and forth between two tabs (e.g. tab A sends an invite, tab B accepts), what is the most sensible way to organize the code?",
      "ja": "テストが2つのタブ間で相互に操作する必要がある場合（例：タブAが招待を送りタブBが承諾する）、最も合理的なコード構成はどれですか。"
    },
    "options": [
      {
        "vi": "Giữ hai biến Page riêng biệt (pageA, pageB) và gọi hành động tương ứng trên từng biến, không cần 'chuyển đổi ngữ cảnh' như driver truyền thống",
        "en": "Keep two separate Page variables (pageA, pageB) and call actions on each accordingly, with no need to 'switch context' like a traditional driver",
        "ja": "2つの別々のPage変数（pageA, pageB）を保持し、それぞれに対応するアクションを呼び出す。従来のドライバーのような「コンテキスト切り替え」は不要"
      },
      {
        "vi": "Phải gọi context.switchToTab(index) trước mỗi thao tác",
        "en": "Must call context.switchToTab(index) before every action",
        "ja": "アクションのたびに必ずcontext.switchToTab(index)を呼ぶ必要がある"
      },
      {
        "vi": "Chỉ có thể thao tác trên một tab tại một thời điểm trong toàn bộ context",
        "en": "Only one tab can be interacted with at a time across the entire context",
        "ja": "コンテキスト全体で一度に1つのタブしか操作できない"
      },
      {
        "vi": "Phải đóng tab A trước khi thao tác tab B",
        "en": "Must close tab A before interacting with tab B",
        "ja": "タブBを操作する前に必ずタブAを閉じなければならない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mỗi Page trong Playwright là một đối tượng độc lập, có thể thao tác song song hoặc xen kẽ mà không cần cơ chế 'switch' như Selenium WebDriver, giúp mô phỏng kịch bản đa người dùng/đa tab tự nhiên hơn.",
      "en": "Each Page in Playwright is an independent object that can be operated on in parallel or interleaved without a 'switch' mechanism like Selenium WebDriver, making multi-user/multi-tab scenarios more natural to simulate.",
      "ja": "Playwrightの各Pageは独立したオブジェクトであり、Selenium WebDriverのような「切り替え」機構なしに並行または交互に操作できるため、マルチユーザー/マルチタブのシナリオをより自然にシミュレートできます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi click một link có target=_blank nhưng ứng dụng mở tab mới rất chậm (network chậm), cách nào giúp test ổn định thay vì bị timeout ngẫu nhiên?",
      "en": "When clicking a target=_blank link but the app opens the new tab slowly (slow network), what helps make the test stable instead of timing out randomly?",
      "ja": "target=_blankリンクをクリックしたがアプリが新しいタブを開くのが遅い（ネットワークが遅い）場合、ランダムなタイムアウトを避けテストを安定させるにはどうすればよいですか。"
    },
    "options": [
      {
        "vi": "Thêm page.waitForTimeout(5000) cố định trước khi click",
        "en": "Add a fixed page.waitForTimeout(5000) before clicking",
        "ja": "クリック前に固定のpage.waitForTimeout(5000)を追加する"
      },
      {
        "vi": "Tăng timeout của context.waitForEvent('page') và/hoặc chờ newPage.waitForLoadState() sau khi lấy được page mới",
        "en": "Increase the timeout of context.waitForEvent('page') and/or wait for newPage.waitForLoadState() after obtaining the new page",
        "ja": "context.waitForEvent('page')のタイムアウトを増やす、および/または新しいpageを取得した後にnewPage.waitForLoadState()を待つ"
      },
      {
        "vi": "Chuyển hẳn sang chạy test bằng cURL để tránh phải mở tab",
        "en": "Switch entirely to running the test via cURL to avoid opening tabs",
        "ja": "タブを開く必要を避けるためテストを完全にcURLで実行するように切り替える"
      },
      {
        "vi": "Không thể làm gì, phải chấp nhận test flaky",
        "en": "Nothing can be done; the test must be accepted as flaky",
        "ja": "何もできない。テストがフラッキーになるのを受け入れるしかない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cấu hình timeout hợp lý cho waitForEvent kết hợp chờ trạng thái load của trang mới giúp xử lý đúng độ trễ thực tế thay vì dùng waitForTimeout cố định vốn kém tin cậy và lãng phí thời gian.",
      "en": "Configuring a reasonable timeout for waitForEvent combined with waiting for the new page's load state properly handles real-world latency, unlike a fixed waitForTimeout which is unreliable and wastes time.",
      "ja": "waitForEventに適切なタイムアウトを設定し、新しいページのロード状態を待つことを組み合わせることで、固定のwaitForTimeoutのように信頼性が低く時間を浪費することなく、実際の遅延に適切に対応できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Điều nào sau đây là ĐÚNG khi đóng một tab/popup trong khi vẫn cần tiếp tục thao tác trên tab chính?",
      "en": "Which of the following is TRUE when closing a tab/popup while still needing to continue operating on the main tab?",
      "ja": "メインタブでの操作を続ける必要がある一方でタブ/ポップアップを閉じる場合、次のうち正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Không thể đóng riêng lẻ một tab, chỉ có thể đóng cả browser",
        "en": "You cannot close a single tab individually; you can only close the whole browser",
        "ja": "個別に1つのタブを閉じることはできず、ブラウザ全体しか閉じられない"
      },
      {
        "vi": "Gọi popup.close() sẽ đóng luôn toàn bộ BrowserContext bao gồm tab chính",
        "en": "Calling popup.close() will also close the entire BrowserContext including the main tab",
        "ja": "popup.close()を呼ぶとメインタブを含むBrowserContext全体も閉じられる"
      },
      {
        "vi": "Gọi popup.close() chỉ đóng riêng Page đó, không ảnh hưởng tới các Page khác cùng context",
        "en": "Calling popup.close() only closes that specific Page and does not affect other Pages in the same context",
        "ja": "popup.close()を呼ぶとそのPageだけが閉じられ、同じコンテキスト内の他のPageには影響しない"
      },
      {
        "vi": "Việc đóng tab phải thực hiện thông qua context.close()",
        "en": "Closing a tab must be done through context.close()",
        "ja": "タブを閉じるにはcontext.close()を通じて行う必要がある"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "page.close() chỉ tác động tới đối tượng Page cụ thể đó; các Page khác trong cùng BrowserContext (kể cả tab chính) vẫn hoạt động bình thường, phù hợp khi cần dọn tab phụ sau khi lấy dữ liệu cần thiết.",
      "en": "page.close() only affects that specific Page object; other Pages in the same BrowserContext (including the main tab) continue operating normally, useful when cleaning up a secondary tab after retrieving needed data.",
      "ja": "page.close()はその特定のPageオブジェクトにのみ影響し、同じBrowserContext内の他のPage（メインタブを含む）は正常に動作し続けます。必要なデータを取得した後に補助タブを片付ける際に便利です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong pipeline CI chạy Playwright headless để test luồng upload/download, điều gì cần lưu ý về hệ thống file trên máy chạy CI?",
      "en": "In a CI pipeline running headless Playwright to test upload/download flows, what should be noted about the filesystem on the CI runner?",
      "ja": "アップロード/ダウンロードフローをテストするためにヘッドレスPlaywrightを実行するCIパイプラインで、CIランナーのファイルシステムについて注意すべき点は何ですか。"
    },
    "options": [
      {
        "vi": "Download luôn thất bại trên CI nên phải mock hoàn toàn",
        "en": "Downloads always fail on CI so they must always be fully mocked",
        "ja": "ダウンロードはCIでは常に失敗するため常に完全にモックする必要がある"
      },
      {
        "vi": "CI luôn có sẵn hộp thoại hệ điều hành để chọn file như máy local",
        "en": "CI always has a native OS file picker dialog available just like a local machine",
        "ja": "CIはローカルマシンと同様に常にネイティブOSファイル選択ダイアログが利用可能"
      },
      {
        "vi": "Không cần quan tâm vì Playwright tự tạo file ảo cho mọi test upload",
        "en": "No need to worry because Playwright automatically creates virtual files for every upload test",
        "ja": "Playwrightがすべてのアップロードテストで仮想ファイルを自動作成するため気にする必要はない"
      },
      {
        "vi": "File fixture dùng để upload phải tồn tại tại đường dẫn có thể truy cập trên runner (ví dụ trong repo hoặc artifact đã checkout), và file download nên được dọn dẹp/kiểm tra trong thư mục tạm phù hợp với CI",
        "en": "Fixture files used for upload must exist at a path accessible on the runner (e.g. in the checked-out repo or artifacts), and downloaded files should be cleaned up/checked in a temp directory suitable for CI",
        "ja": "アップロードに使うフィクスチャファイルはランナー上でアクセス可能なパス（例：チェックアウト済みのリポジトリやアーティファクト内）に存在する必要があり、ダウンロードされたファイルはCIに適した一時ディレクトリでクリーンアップ/検証されるべき"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "CI runner thường không có hộp thoại OS thật và môi trường ephemeral, nên cần đảm bảo đường dẫn file fixture đúng và dùng download.path()/saveAs() để lưu vào vị trí có thể kiểm tra được trong bước test.",
      "en": "CI runners typically lack a real OS dialog and use an ephemeral environment, so it's important to ensure fixture file paths are correct and use download.path()/saveAs() to save to a location verifiable within the test step.",
      "ja": "CIランナーには通常実際のOSダイアログがなく一時的な環境であるため、フィクスチャファイルのパスが正しいことを確認し、download.path()/saveAs()を使ってテストステップ内で検証可能な場所に保存することが重要です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Nếu ứng dụng hiển thị dialog confirm() trước khi cho phép đóng một popup, thứ tự xử lý đúng trong Playwright là gì?",
      "en": "If the app shows a confirm() dialog before allowing a popup to close, what is the correct handling order in Playwright?",
      "ja": "アプリがポップアップを閉じる前にconfirm()ダイアログを表示する場合、Playwrightでの正しい処理順序は何ですか。"
    },
    "options": [
      {
        "vi": "Đăng ký listener 'dialog' trên đối tượng popup (Page) TRƯỚC khi gọi hành động đóng, vì dialog thuộc về Page nào phát sinh ra nó",
        "en": "Register the 'dialog' listener on the popup's Page object BEFORE calling the close action, because the dialog belongs to whichever Page raised it",
        "ja": "閉じるアクションを呼ぶ前に、ポップアップのPageオブジェクトに'dialog'リスナーを登録する。ダイアログはそれを発生させたPageに属するため"
      },
      {
        "vi": "Đăng ký listener 'dialog' trên trang chính vì mọi dialog toàn cục đều đi qua trang chính",
        "en": "Register the 'dialog' listener on the main page since all global dialogs pass through the main page",
        "ja": "すべてのグローバルダイアログはメインページを通るため、メインページに'dialog'リスナーを登録する"
      },
      {
        "vi": "Không cần đăng ký gì, popup tự đóng dialog mặc định giống trang chính",
        "en": "No registration needed; the popup auto-closes the dialog by default just like the main page",
        "ja": "登録は不要で、ポップアップはメインページと同様にデフォルトでダイアログを自動的に閉じる"
      },
      {
        "vi": "Dialog trong popup không thể xử lý bằng Playwright",
        "en": "Dialogs inside a popup cannot be handled by Playwright at all",
        "ja": "ポップアップ内のダイアログはPlaywrightでは全く処理できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mỗi Page (kể cả popup) có sự kiện 'dialog' riêng của nó; phải gắn listener đúng trên đối tượng Page của popup thì mới bắt được dialog phát sinh từ ngữ cảnh đó.",
      "en": "Each Page (including popups) has its own 'dialog' event; the listener must be attached to the correct popup Page object to catch dialogs originating from that context.",
      "ja": "各Page（ポップアップを含む）には独自の'dialog'イベントがあります。そのコンテキストから発生するダイアログを捕捉するには、正しいポップアップのPageオブジェクトにリスナーをアタッチする必要があります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Kiểu dữ liệu chuẩn cho thuộc tính lưu locator trong class Page Object viết bằng TypeScript là gì?",
      "en": "What is the standard type for a property that stores a locator inside a TypeScript Page Object class?",
      "ja": "TypeScriptで書かれたPage Objectクラスにおいて、ロケーターを保持するプロパティに適した標準の型は何ですか？"
    },
    "options": [
      {
        "vi": "string",
        "en": "string",
        "ja": "string"
      },
      {
        "vi": "Locator",
        "en": "Locator",
        "ja": "Locator"
      },
      {
        "vi": "any",
        "en": "any",
        "ja": "any"
      },
      {
        "vi": "HTMLElement",
        "en": "HTMLElement",
        "ja": "HTMLElement"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Playwright cung cấp kiểu Locator chuyên dụng, giúp IDE gợi ý đầy đủ phương thức (click, fill, waitFor...) và bắt lỗi kiểu khi biên dịch.",
      "en": "Playwright provides the dedicated Locator type, giving full IDE autocompletion for methods like click, fill, waitFor and catching type errors at compile time.",
      "ja": "Playwrightは専用のLocator型を提供しており、click・fill・waitForなどのメソッド補完がIDEで効き、コンパイル時に型エラーを検出できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Để mở rộng fixture tuỳ biến với kiểu dữ liệu riêng trong Playwright TypeScript, ta dùng API nào?",
      "en": "To extend Playwright with custom typed fixtures in TypeScript, which API is used?",
      "ja": "Playwright TypeScriptで独自の型を持つカスタムフィクスチャを拡張するには、どのAPIを使いますか？"
    },
    "options": [
      {
        "vi": "test.only()",
        "en": "test.only()",
        "ja": "test.only()"
      },
      {
        "vi": "test.use()",
        "en": "test.use()",
        "ja": "test.use()"
      },
      {
        "vi": "test.extend<T>()",
        "en": "test.extend<T>()",
        "ja": "test.extend<T>()"
      },
      {
        "vi": "test.step()",
        "en": "test.step()",
        "ja": "test.step()"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "test.extend<CustomFixtures>() cho phép khai báo kiểu tường minh cho các fixture mới, đảm bảo type-safe khi dùng trong test.",
      "en": "test.extend<CustomFixtures>() allows declaring explicit types for new fixtures, ensuring type safety when used in tests.",
      "ja": "test.extend<CustomFixtures>()を使うと新しいフィクスチャに明示的な型を宣言でき、テスト内で型安全に利用できます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trong constructor của một Page Object class TypeScript, tham số truyền vào để thao tác trình duyệt thường có kiểu gì?",
      "en": "In the constructor of a TypeScript Page Object class, what type does the parameter used to interact with the browser typically have?",
      "ja": "TypeScriptのPage Objectクラスのコンストラクタで、ブラウザ操作用に渡す引数は通常どの型ですか？"
    },
    "options": [
      {
        "vi": "Browser",
        "en": "Browser",
        "ja": "Browser"
      },
      {
        "vi": "BrowserContext",
        "en": "BrowserContext",
        "ja": "BrowserContext"
      },
      {
        "vi": "Frame",
        "en": "Frame",
        "ja": "Frame"
      },
      {
        "vi": "Page",
        "en": "Page",
        "ja": "Page"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Page Object thường thao tác trực tiếp trên một tab, nên constructor nhận đối tượng Page để gọi các locator và hành động trên đó.",
      "en": "A Page Object usually operates on a single tab, so the constructor receives a Page object to call locators and actions on it.",
      "ja": "Page Objectは通常1つのタブに対して操作するため、コンストラクタはPageオブジェクトを受け取り、そこでロケーターや操作を呼び出します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Khi định nghĩa file playwright.config.ts, hàm nào giúp có gợi ý kiểu (IntelliSense) đầy đủ cho cấu hình?",
      "en": "When defining playwright.config.ts, which function provides full type hints (IntelliSense) for the configuration?",
      "ja": "playwright.config.tsを定義する際、設定に対して完全な型ヒント（IntelliSense）を提供する関数はどれですか？"
    },
    "options": [
      {
        "vi": "defineConfig",
        "en": "defineConfig",
        "ja": "defineConfig"
      },
      {
        "vi": "setupConfig",
        "en": "setupConfig",
        "ja": "setupConfig"
      },
      {
        "vi": "buildConfig",
        "en": "buildConfig",
        "ja": "buildConfig"
      },
      {
        "vi": "createConfig",
        "en": "createConfig",
        "ja": "createConfig"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "defineConfig là helper của Playwright, bọc object cấu hình để TypeScript suy luận đúng kiểu PlaywrightTestConfig và gợi ý thuộc tính hợp lệ.",
      "en": "defineConfig is Playwright's helper that wraps the config object so TypeScript infers the correct PlaywrightTestConfig type and suggests valid properties.",
      "ja": "defineConfigはPlaywrightのヘルパーで、設定オブジェクトをラップすることでTypeScriptが正しくPlaywrightTestConfig型を推論し、有効なプロパティを補完します。"
    }
  }
];
