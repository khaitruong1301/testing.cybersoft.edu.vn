// ============================================================================
// INTERVIEW10 — Manual bổ sung (đạt 400) — 292 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":73,"1":73,"2":73,"3":73}
// ============================================================================
export const DATA = [
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một test case tốt cần có những thành phần cốt lõi nào để người khác thực thi được mà không cần hỏi lại?",
      "en": "What core elements should a good test case include so that someone else can execute it without needing to ask for clarification?",
      "ja": "他の人が確認なしに実行できるように、良いテストケースにはどのような核となる要素が必要ですか?"
    },
    "options": [
      {
        "vi": "ID, tiền điều kiện, các bước thực hiện rõ ràng, dữ liệu đầu vào và kết quả mong đợi",
        "en": "ID, preconditions, clear execution steps, input data, and expected results",
        "ja": "ID、事前条件、明確な実行手順、入力データ、期待結果"
      },
      {
        "vi": "Chỉ cần tiêu đề và kết quả mong đợi",
        "en": "Just a title and the expected result",
        "ja": "タイトルと期待結果だけ"
      },
      {
        "vi": "Chỉ cần mô tả bug liên quan",
        "en": "Just a description of the related bug",
        "ja": "関連するバグの説明だけ"
      },
      {
        "vi": "Chỉ cần liệt kê tên chức năng cần test",
        "en": "Just listing the name of the feature to be tested",
        "ja": "テスト対象の機能名を列挙するだけ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test case đầy đủ các thành phần giúp bất kỳ tester nào cũng thực thi được nhất quán, không phụ thuộc vào người viết ra nó.",
      "en": "A test case with all core elements lets any tester execute it consistently, regardless of who wrote it.",
      "ja": "必要な要素がすべて揃ったテストケースは、作成者に関係なく誰が実行しても一貫した結果が得られます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test case và test scenario khác nhau chủ yếu ở điểm nào?",
      "en": "What is the main difference between a test case and a test scenario?",
      "ja": "テストケースとテストシナリオの主な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Test scenario là bước thực hiện chi tiết, test case là ý tưởng chung",
        "en": "A test scenario is a detailed execution step, while a test case is a general idea",
        "ja": "テストシナリオは詳細な実行手順で、テストケースは大まかなアイデアである"
      },
      {
        "vi": "Test scenario là ý tưởng/kịch bản kiểm thử ở mức cao, test case là bước chi tiết cụ thể hóa scenario đó",
        "en": "A test scenario is a high-level testing idea/situation, while a test case is the detailed steps that realize that scenario",
        "ja": "テストシナリオは高レベルのテスト観点・状況であり、テストケースはそのシナリオを具体化した詳細な手順である"
      },
      {
        "vi": "Không có sự khác biệt, dùng thay thế nhau",
        "en": "There is no difference, the terms are interchangeable",
        "ja": "違いはなく、互いに置き換え可能である"
      },
      {
        "vi": "Test scenario chỉ dùng cho automation, test case chỉ dùng cho manual",
        "en": "Test scenarios are only used for automation, test cases only for manual testing",
        "ja": "テストシナリオは自動化専用で、テストケースは手動テスト専用である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scenario mô tả \"cái gì cần kiểm thử\" ở mức khái quát; test case cụ thể hóa thành các bước, dữ liệu và kết quả mong đợi để thực thi.",
      "en": "A scenario describes \"what needs to be tested\" at a high level; a test case turns it into concrete steps, data, and expected results for execution.",
      "ja": "シナリオは「何をテストすべきか」を大枠で示すものであり、テストケースはそれを実行可能な具体的な手順・データ・期待結果に落とし込んだものです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thiết kế dữ liệu test cho một trường \"tuổi\" chỉ nhận số nguyên từ 18-60, cách tiếp cận nào cho độ bao phủ tốt nhất?",
      "en": "When designing test data for an \"age\" field that only accepts integers from 18-60, which approach gives the best coverage?",
      "ja": "18から60までの整数のみを受け付ける「年齢」フィールドのテストデータを設計する場合、最も良いカバレッジが得られるアプローチはどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ cần một giá trị hợp lệ ở giữa khoảng, ví dụ 30",
        "en": "Just one valid value in the middle of the range, e.g. 30",
        "ja": "範囲の中間の有効な値を1つだけ使う(例:30)"
      },
      {
        "vi": "Chỉ cần test giá trị 0 và giá trị âm",
        "en": "Just test the value 0 and negative values",
        "ja": "0と負の値だけをテストする"
      },
      {
        "vi": "Kết hợp giá trị biên (17,18,60,61), giá trị hợp lệ điển hình, và giá trị không hợp lệ (chữ, số âm, rỗng)",
        "en": "Combine boundary values (17, 18, 60, 61), typical valid values, and invalid values (letters, negative numbers, empty)",
        "ja": "境界値(17、18、60、61)、代表的な有効値、無効な値(文字、負数、空欄)を組み合わせる"
      },
      {
        "vi": "Chỉ cần test giá trị lớn nhất có thể nhập được",
        "en": "Just test the largest value that can be entered",
        "ja": "入力できる最大値だけをテストする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kết hợp kỹ thuật phân vùng tương đương và giá trị biên với cả dữ liệu hợp lệ lẫn không hợp lệ giúp phát hiện lỗi validate ở nhiều tình huống thực tế.",
      "en": "Combining equivalence partitioning and boundary values with both valid and invalid data helps catch validation errors across many real-world situations.",
      "ja": "同値分割と境界値分析を組み合わせ、有効・無効の両方のデータを使うことで、さまざまな実際のケースでバリデーションの不具合を発見しやすくなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Tính tái sử dụng\" (reusability) của test case thể hiện rõ nhất qua đặc điểm nào sau đây?",
      "en": "Which characteristic best demonstrates the \"reusability\" of a test case?",
      "ja": "テストケースの「再利用性」が最もよく表れる特徴はどれですか?"
    },
    "options": [
      {
        "vi": "Test case viết càng dài càng chi tiết càng tốt",
        "en": "The longer and more detailed the test case, the better",
        "ja": "テストケースは長く詳細であればあるほど良い"
      },
      {
        "vi": "Test case chỉ dùng được một lần rồi xóa",
        "en": "The test case can only be used once and then discarded",
        "ja": "テストケースは一度使ったら削除する"
      },
      {
        "vi": "Test case gắn chặt với một môi trường cụ thể duy nhất",
        "en": "The test case is tightly bound to one specific environment only",
        "ja": "テストケースが特定の環境1つだけに強く依存している"
      },
      {
        "vi": "Test case được tham số hóa (data-driven), tách rời logic bước khỏi dữ liệu cụ thể, dễ áp dụng cho nhiều bộ dữ liệu/release khác nhau",
        "en": "The test case is parameterized (data-driven), separating step logic from specific data, making it easy to apply to different datasets/releases",
        "ja": "テストケースがパラメータ化(データ駆動)されており、手順のロジックと具体的なデータが分離されているため、異なるデータセットやリリースにも適用しやすい"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tách logic bước khỏi dữ liệu cụ thể (data-driven) là cách hiệu quả nhất để tái sử dụng test case cho nhiều bộ dữ liệu, môi trường hay phiên bản khác nhau.",
      "en": "Separating step logic from specific data (data-driven) is the most effective way to reuse a test case across different datasets, environments, or versions.",
      "ja": "手順のロジックと具体的なデータを分離する(データ駆動)ことは、異なるデータセット・環境・バージョンにテストケースを再利用する最も効果的な方法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao nên viết các bước test case theo nguyên tắc \"atomic\" (mỗi bước một hành động rõ ràng)?",
      "en": "Why should test case steps be written following the \"atomic\" principle (one clear action per step)?",
      "ja": "テストケースの手順を「アトミック」原則(1ステップに1つの明確なアクション)で書くべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Giúp dễ xác định chính xác bước nào fail, dễ tái hiện lỗi và dễ bảo trì khi yêu cầu thay đổi",
        "en": "It makes it easy to pinpoint exactly which step failed, easier to reproduce bugs, and easier to maintain when requirements change",
        "ja": "どのステップで失敗したかを正確に特定しやすくなり、バグの再現や要件変更時の保守がしやすくなる"
      },
      {
        "vi": "Để test case trông chuyên nghiệp hơn",
        "en": "To make the test case look more professional",
        "ja": "テストケースをより専門的に見せるため"
      },
      {
        "vi": "Vì tool quản lý test bắt buộc phải chia nhỏ",
        "en": "Because the test management tool requires breaking steps down",
        "ja": "テスト管理ツールが分割を強制するため"
      },
      {
        "vi": "Không có lý do kỹ thuật, chỉ là thói quen cá nhân",
        "en": "There's no technical reason, it's just a personal habit",
        "ja": "技術的な理由はなく、単なる個人の習慣である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Bước atomic giúp khoanh vùng lỗi chính xác, người khác dễ tái hiện, và khi requirement đổi chỉ cần sửa đúng bước liên quan thay vì viết lại cả test case.",
      "en": "Atomic steps allow precise fault isolation, easier reproduction by others, and when requirements change only the relevant step needs updating instead of rewriting the whole test case.",
      "ja": "アトミックなステップにより不具合箇所を正確に切り分けでき、他の人が再現しやすくなり、要件変更時も関連するステップだけを修正すればよくテストケース全体を書き直す必要がありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Traceability matrix (ma trận truy vết) trong thiết kế test case dùng để làm gì?",
      "en": "What is a traceability matrix used for in test case design?",
      "ja": "テストケース設計におけるトレーサビリティマトリクスは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Đo thời gian thực thi test",
        "en": "To measure test execution time",
        "ja": "テストの実行時間を測定するため"
      },
      {
        "vi": "Liên kết yêu cầu/requirement với các test case tương ứng, đảm bảo mọi yêu cầu đều được kiểm thử",
        "en": "To link requirements to their corresponding test cases, ensuring every requirement is covered by testing",
        "ja": "要件と対応するテストケースを紐付け、すべての要件がテストでカバーされていることを確認するため"
      },
      {
        "vi": "Ghi lại lịch sử chỉnh sửa code",
        "en": "To record the code edit history",
        "ja": "コードの変更履歴を記録するため"
      },
      {
        "vi": "Tính điểm hiệu năng hệ thống",
        "en": "To calculate the system's performance score",
        "ja": "システムのパフォーマンススコアを計算するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Traceability matrix giúp đảm bảo không có yêu cầu nào bị bỏ sót kiểm thử và giúp đánh giá tác động khi requirement thay đổi.",
      "en": "A traceability matrix ensures no requirement is left untested and helps assess impact when requirements change.",
      "ja": "トレーサビリティマトリクスは、テストされていない要件がないことを保証し、要件変更時の影響範囲の把握にも役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi requirement thay đổi thường xuyên, chiến lược thiết kế test case nào giúp giảm chi phí bảo trì?",
      "en": "When requirements change frequently, which test case design strategy helps reduce maintenance cost?",
      "ja": "要件が頻繁に変更される場合、保守コストを削減できるテストケース設計戦略はどれですか?"
    },
    "options": [
      {
        "vi": "Viết test case cực kỳ chi tiết từng pixel giao diện",
        "en": "Write extremely detailed test cases down to every UI pixel",
        "ja": "UIのピクセル単位まで極めて詳細にテストケースを書く"
      },
      {
        "vi": "Không cập nhật test case cũ, chỉ thêm test case mới",
        "en": "Never update old test cases, only add new ones",
        "ja": "古いテストケースを更新せず、新しいものだけを追加する"
      },
      {
        "vi": "Thiết kế test case theo module/nghiệp vụ, tách bước dùng chung thành test case con hoặc thư viện bước tái sử dụng",
        "en": "Design test cases by module/business function, extracting shared steps into sub-test-cases or a reusable step library",
        "ja": "モジュールや業務単位でテストケースを設計し、共通の手順をサブテストケースや再利用可能な手順ライブラリとして切り出す"
      },
      {
        "vi": "Xóa hết test case cũ và viết lại từ đầu mỗi lần thay đổi",
        "en": "Delete all old test cases and rewrite from scratch every time there's a change",
        "ja": "変更のたびに古いテストケースをすべて削除し、最初から書き直す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Modular hóa test case theo nghiệp vụ và tái sử dụng bước dùng chung giúp khi thay đổi chỉ cần cập nhật ở một nơi, giảm đáng kể công sức bảo trì.",
      "en": "Modularizing test cases by business function and reusing shared steps means a change only needs to be updated in one place, greatly reducing maintenance effort.",
      "ja": "業務単位でテストケースをモジュール化し、共通手順を再利用することで、変更時に1か所を更新するだけで済み、保守の手間を大幅に減らせます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một buổi phỏng vấn, bạn được hỏi: \"Test data cho môi trường staging lấy từ dữ liệu production, bạn cần lưu ý gì?\" Câu trả lời phù hợp nhất?",
      "en": "In an interview, you're asked: \"Test data for staging is taken from production data — what should you be careful about?\" What is the most appropriate answer?",
      "ja": "面接で「ステージング環境のテストデータを本番データから取得する場合、何に注意すべきですか?」と聞かれました。最も適切な答えはどれですか?"
    },
    "options": [
      {
        "vi": "Copy nguyên trạng dữ liệu production, không cần xử lý gì",
        "en": "Copy the production data as-is, no processing needed",
        "ja": "本番データをそのままコピーし、何も処理する必要はない"
      },
      {
        "vi": "Chỉ cần đổi tên database",
        "en": "Just rename the database",
        "ja": "データベース名を変更するだけでよい"
      },
      {
        "vi": "Không cần quan tâm vì staging không ai truy cập",
        "en": "No need to worry since no one accesses staging",
        "ja": "ステージング環境には誰もアクセスしないので気にする必要はない"
      },
      {
        "vi": "Cần che/ẩn (mask) thông tin nhạy cảm như email, số điện thoại, thông tin thanh toán trước khi dùng để test",
        "en": "Sensitive information such as emails, phone numbers, and payment details must be masked before being used for testing",
        "ja": "メールアドレス、電話番号、決済情報などの機密情報はテストに使う前にマスキング(匿名化)する必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dữ liệu production thường chứa thông tin cá nhân/nhạy cảm; cần mask trước khi dùng ở staging để tuân thủ bảo mật và quy định về dữ liệu.",
      "en": "Production data often contains personal/sensitive information; it must be masked before use in staging to comply with security and data regulations.",
      "ja": "本番データには個人情報や機密情報が含まれることが多いため、セキュリティやデータ規制を遵守するためにステージングで使用する前にマスキングする必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Test oracle\" trong thiết kế test case là gì?",
      "en": "What is a \"test oracle\" in test case design?",
      "ja": "テストケース設計における「テストオラクル」とは何ですか?"
    },
    "options": [
      {
        "vi": "Nguồn/cơ chế để xác định kết quả mong đợi (đúng/sai) của một test case, ví dụ: tài liệu đặc tả, quy tắc nghiệp vụ, hệ thống tham chiếu",
        "en": "A source/mechanism used to determine the expected (correct/incorrect) result of a test case, e.g. specification documents, business rules, a reference system",
        "ja": "テストケースの期待結果(正誤)を判断するための情報源・仕組みのこと。例:仕様書、業務ルール、参照システムなど"
      },
      {
        "vi": "Công cụ tự động sinh test case",
        "en": "A tool that automatically generates test cases",
        "ja": "テストケースを自動生成するツール"
      },
      {
        "vi": "Người viết test case",
        "en": "The person who writes the test case",
        "ja": "テストケースを作成する人"
      },
      {
        "vi": "Một loại lỗi hệ thống",
        "en": "A type of system error",
        "ja": "システムエラーの一種"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test oracle là căn cứ giúp tester biết kết quả thực tế đúng hay sai so với kỳ vọng, có thể là đặc tả, quy tắc nghiệp vụ hoặc hệ thống tham chiếu đáng tin cậy.",
      "en": "A test oracle is the basis that helps a tester judge whether an actual result is correct or not, which could be a specification, business rule, or a trusted reference system.",
      "ja": "テストオラクルは、実際の結果が期待通りかどうかをテスターが判断するための根拠であり、仕様書、業務ルール、信頼できる参照システムなどが該当します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao mỗi test case nên được thiết kế độc lập, không phụ thuộc vào việc test case khác đã chạy trước đó?",
      "en": "Why should each test case be designed independently, not depending on another test case having run before it?",
      "ja": "なぜ各テストケースは、他のテストケースが事前に実行されていることに依存せず、独立して設計されるべきなのですか?"
    },
    "options": [
      {
        "vi": "Vì tool test luôn chạy test theo thứ tự bảng chữ cái",
        "en": "Because test tools always run tests in alphabetical order",
        "ja": "テストツールは常にアルファベット順にテストを実行するため"
      },
      {
        "vi": "Để có thể chạy riêng lẻ, chạy song song, hoặc thay đổi thứ tự mà không làm sai kết quả",
        "en": "So it can be run individually, in parallel, or in a different order without producing incorrect results",
        "ja": "単独実行、並列実行、または実行順序の変更を行っても結果が狂わないようにするため"
      },
      {
        "vi": "Để test case chạy nhanh hơn",
        "en": "So the test case runs faster",
        "ja": "テストケースの実行を速くするため"
      },
      {
        "vi": "Không có lý do, thực tế test case luôn phụ thuộc lẫn nhau",
        "en": "There's no reason; in practice test cases always depend on each other",
        "ja": "理由はなく、実際にはテストケースは常に互いに依存している"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test case độc lập cho phép linh hoạt trong thực thi (chạy lẻ, song song, đổi thứ tự) mà vẫn đảm bảo kết quả tin cậy, đặc biệt quan trọng khi automation hoặc chạy song song.",
      "en": "Independent test cases allow flexible execution (individually, in parallel, in any order) while still ensuring reliable results, which matters especially for automation or parallel runs.",
      "ja": "独立したテストケースは、実行の柔軟性(単独実行、並列実行、順序変更)を確保しつつ、信頼できる結果を保証します。これは自動化や並列実行の際に特に重要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi viết test case từ acceptance criteria trong user story, nguyên tắc nào giúp đảm bảo bao phủ đầy đủ?",
      "en": "When writing test cases from acceptance criteria in a user story, which principle helps ensure full coverage?",
      "ja": "ユーザーストーリーの受け入れ基準からテストケースを作成する際、十分なカバレッジを確保するための原則はどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ cần viết một test case cho toàn bộ story",
        "en": "Just write a single test case for the entire story",
        "ja": "ストーリー全体に対して1つのテストケースだけを書けばよい"
      },
      {
        "vi": "Chỉ viết test case cho luồng chính, bỏ qua ngoại lệ vì đã có acceptance criteria",
        "en": "Only write test cases for the main flow, skipping exceptions since acceptance criteria already exist",
        "ja": "受け入れ基準があるから例外は無視し、メインフローのみテストケースを書く"
      },
      {
        "vi": "Mỗi tiêu chí chấp nhận (given-when-then) nên ánh xạ thành ít nhất một test case, bao gồm cả luồng chính và luồng ngoại lệ",
        "en": "Each acceptance criterion (given-when-then) should map to at least one test case, covering both the main flow and exception flows",
        "ja": "各受け入れ基準(given-when-then)は少なくとも1つのテストケースに対応させ、メインフローと例外フローの両方をカバーすべきである"
      },
      {
        "vi": "Test case không cần liên quan tới acceptance criteria",
        "en": "Test cases don't need to relate to acceptance criteria",
        "ja": "テストケースは受け入れ基準と関連させる必要はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ánh xạ mỗi tiêu chí chấp nhận thành test case cụ thể, kèm cả trường hợp ngoại lệ, giúp đảm bảo story được kiểm thử toàn diện chứ không chỉ luồng \"happy path\".",
      "en": "Mapping each acceptance criterion to a concrete test case, including exceptions, ensures the story is tested comprehensively rather than just the happy path.",
      "ja": "各受け入れ基準を具体的なテストケースに対応させ、例外ケースも含めることで、ハッピーパスだけでなくストーリー全体を網羅的にテストできます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong buổi review test case, đồng nghiệp góp ý \"kết quả mong đợi của bạn quá chung chung\". Vấn đề đó thường dẫn tới hệ quả gì?",
      "en": "During a test case review, a colleague comments \"your expected result is too vague.\" What consequence does this usually lead to?",
      "ja": "テストケースレビューで同僚から「期待結果が曖昧すぎる」と指摘されました。この問題は通常どのような結果を招きますか?"
    },
    "options": [
      {
        "vi": "Không ảnh hưởng gì vì tester tự hiểu",
        "en": "No impact, since the tester understands it themselves",
        "ja": "テスター自身が理解しているので影響はない"
      },
      {
        "vi": "Giúp test case linh hoạt hơn",
        "en": "It makes the test case more flexible",
        "ja": "テストケースがより柔軟になる"
      },
      {
        "vi": "Giúp giảm thời gian viết tài liệu",
        "en": "It reduces documentation time",
        "ja": "文書作成時間を削減できる"
      },
      {
        "vi": "Kết quả mong đợi mơ hồ khiến người thực thi khó xác định pass/fail chính xác, dễ gây tranh cãi khi báo bug",
        "en": "A vague expected result makes it hard for the executor to accurately determine pass/fail, easily causing disputes when reporting bugs",
        "ja": "曖昧な期待結果は実行者が正確にpass/failを判断しにくくし、バグ報告時に意見の食い違いを招きやすい"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kết quả mong đợi cần cụ thể, đo lường được để tránh chủ quan khi đánh giá pass/fail và giảm tranh cãi giữa tester và dev.",
      "en": "Expected results need to be specific and measurable to avoid subjective pass/fail judgments and reduce disputes between testers and developers.",
      "ja": "期待結果は具体的で測定可能である必要があり、pass/failの判断が主観的になることを避け、テスターと開発者間の意見の食い違いを減らせます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Kỹ thuật pairwise testing (kiểm thử theo cặp) được dùng trong thiết kế test data chủ yếu nhằm mục đích gì?",
      "en": "What is pairwise testing mainly used for in test data design?",
      "ja": "テストデータ設計におけるペアワイズテストの技法は主に何のために使われますか?"
    },
    "options": [
      {
        "vi": "Giảm đáng kể số lượng test case cần thiết trong khi vẫn bao phủ tốt các tổ hợp cặp tham số, phù hợp khi số biến đầu vào lớn",
        "en": "To significantly reduce the number of test cases needed while still covering pairwise combinations of parameters well, suitable when there are many input variables",
        "ja": "入力変数が多い場合でも、パラメータの組み合わせを効果的にカバーしながら、必要なテストケース数を大幅に削減するため"
      },
      {
        "vi": "Tăng số lượng test case lên tối đa để bao phủ 100% mọi tổ hợp",
        "en": "To maximize the number of test cases in order to cover 100% of all combinations",
        "ja": "すべての組み合わせを100%カバーするためにテストケース数を最大化する"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử hiệu năng",
        "en": "It only applies to performance testing",
        "ja": "パフォーマンステストにのみ適用される"
      },
      {
        "vi": "Thay thế hoàn toàn cho equivalence partitioning",
        "en": "It completely replaces equivalence partitioning",
        "ja": "同値分割を完全に置き換えるものである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Pairwise testing dựa trên thực tế phần lớn lỗi xuất phát từ tương tác giữa cặp tham số, nên chỉ cần bao phủ các cặp là đủ giảm số test case mà vẫn hiệu quả.",
      "en": "Pairwise testing relies on the observation that most defects arise from interactions between pairs of parameters, so covering just the pairs is enough to reduce test cases while remaining effective.",
      "ja": "ペアワイズテストは、多くの不具合がパラメータのペア間の相互作用から生じるという知見に基づいており、ペアの組み合わせをカバーするだけでテストケース数を減らしつつ十分な効果を得られます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao nên đặt tên test case theo quy ước rõ ràng (ví dụ: [Module]_[Chức năng]_[Điều kiện]_[Kết quả kỳ vọng])?",
      "en": "Why should test cases be named following a clear convention (e.g. [Module]_[Function]_[Condition]_[Expected Result])?",
      "ja": "テストケースに明確な命名規則(例:[モジュール]_[機能]_[条件]_[期待結果])を使うべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ để test case trông đẹp mắt",
        "en": "Just to make the test case look nice",
        "ja": "テストケースを見栄え良くするためだけ"
      },
      {
        "vi": "Giúp dễ tìm kiếm, phân loại, và hiểu nhanh mục đích test case mà không cần mở chi tiết",
        "en": "It makes it easy to search, categorize, and quickly understand the purpose of a test case without opening the details",
        "ja": "詳細を開かなくても、テストケースの目的をすぐに検索・分類・把握しやすくなる"
      },
      {
        "vi": "Vì đây là yêu cầu bắt buộc của mọi tool quản lý test",
        "en": "Because it's a mandatory requirement of every test management tool",
        "ja": "すべてのテスト管理ツールで必須の要件だから"
      },
      {
        "vi": "Không có tác dụng thực tế",
        "en": "It has no practical effect",
        "ja": "実際の効果はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tên test case theo quy ước nhất quán giúp cả team tra cứu, lọc và quản lý bộ test lớn hiệu quả hơn, đặc biệt khi số lượng test case tăng lên.",
      "en": "A consistent naming convention helps the whole team search, filter, and manage a large test suite more efficiently, especially as the number of test cases grows.",
      "ja": "一貫した命名規則により、チーム全体が大規模なテストスイートをより効率的に検索・フィルタリング・管理できるようになります。特にテストケース数が増えるほど効果的です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi một tính năng có nhiều luồng nghiệp vụ dùng chung bước đăng nhập, cách thiết kế test case hiệu quả để tránh lặp lại là gì?",
      "en": "When a feature has multiple business flows that share a common login step, what is an effective test case design to avoid repetition?",
      "ja": "ある機能に共通のログイン手順を使う複数の業務フローがある場合、重複を避ける効果的なテストケース設計方法は何ですか?"
    },
    "options": [
      {
        "vi": "Copy-paste toàn bộ bước đăng nhập vào từng test case",
        "en": "Copy-paste the entire login step into every test case",
        "ja": "ログイン手順全体を各テストケースにコピー&ペーストする"
      },
      {
        "vi": "Bỏ qua bước đăng nhập, giả định người thực thi tự biết",
        "en": "Skip the login step, assuming the executor already knows it",
        "ja": "実行者が知っているものとしてログイン手順を省略する"
      },
      {
        "vi": "Tách bước đăng nhập thành một \"reusable step\" hoặc precondition dùng chung, tham chiếu tới từ các test case khác",
        "en": "Extract the login step into a shared \"reusable step\" or precondition, referenced from other test cases",
        "ja": "ログイン手順を共通の「再利用可能なステップ」または事前条件として切り出し、他のテストケースから参照する"
      },
      {
        "vi": "Viết một test case duy nhất gộp tất cả luồng nghiệp vụ lại",
        "en": "Write a single test case that merges all business flows together",
        "ja": "すべての業務フローを1つのテストケースにまとめて書く"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tách bước dùng chung thành reusable step/precondition giúp giảm trùng lặp, dễ bảo trì khi bước đăng nhập thay đổi mà không phải sửa từng test case.",
      "en": "Extracting shared steps into a reusable step/precondition reduces duplication and makes maintenance easier when the login step changes, without editing every test case.",
      "ja": "共通手順を再利用可能なステップ・事前条件として切り出すことで重複を減らし、ログイン手順が変更された際も各テストケースを個別に修正する必要がなく保守が容易になります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Test data coverage\" khác với \"requirement coverage\" ở điểm nào?",
      "en": "How does \"test data coverage\" differ from \"requirement coverage\"?",
      "ja": "「テストデータカバレッジ」と「要件カバレッジ」の違いは何ですか?"
    },
    "options": [
      {
        "vi": "Hai khái niệm này giống hệt nhau",
        "en": "These two concepts are exactly the same",
        "ja": "この2つの概念はまったく同じである"
      },
      {
        "vi": "Test data coverage chỉ áp dụng cho automation",
        "en": "Test data coverage only applies to automation",
        "ja": "テストデータカバレッジは自動化にのみ適用される"
      },
      {
        "vi": "Requirement coverage chỉ dùng trong performance testing",
        "en": "Requirement coverage is only used in performance testing",
        "ja": "要件カバレッジはパフォーマンステストにのみ使用される"
      },
      {
        "vi": "Test data coverage đo mức độ đa dạng/đại diện của dữ liệu đầu vào được test (biên, hợp lệ, không hợp lệ...), còn requirement coverage đo tỷ lệ yêu cầu đã có test case",
        "en": "Test data coverage measures the diversity/representativeness of the input data tested (boundary, valid, invalid...), while requirement coverage measures the proportion of requirements that have test cases",
        "ja": "テストデータカバレッジはテストされる入力データの多様性・代表性(境界値、有効値、無効値など)を測るものであり、要件カバレッジはテストケースが存在する要件の割合を測るものである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Hai loại coverage đo hai khía cạnh khác nhau: một đo độ đa dạng dữ liệu đầu vào, một đo tỷ lệ yêu cầu được kiểm thử; bộ test tốt cần đạt cả hai.",
      "en": "These two types of coverage measure different aspects: one measures input data diversity, the other measures the ratio of requirements tested; a good test suite needs both.",
      "ja": "この2種類のカバレッジは異なる側面を測定します。1つは入力データの多様性、もう1つはテストされた要件の割合です。優れたテストスイートは両方を満たす必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thiết kế test case cho chức năng tìm kiếm, tester nên thiết kế test data như thế nào để phản ánh thực tế người dùng?",
      "en": "When designing test cases for a search feature, how should a tester design test data to reflect real-world user behavior?",
      "ja": "検索機能のテストケースを設計する際、実際のユーザー行動を反映するにはどのようにテストデータを設計すべきですか?"
    },
    "options": [
      {
        "vi": "Bao gồm từ khóa có dấu tiếng Việt, ký tự đặc biệt, chuỗi rất dài, từ khóa không tồn tại, và khoảng trắng thừa",
        "en": "Include Vietnamese keywords with diacritics, special characters, very long strings, non-existent keywords, and extra whitespace",
        "ja": "声調記号付きのベトナム語キーワード、特殊文字、非常に長い文字列、存在しないキーワード、余分な空白を含める"
      },
      {
        "vi": "Chỉ dùng từ khóa tiếng Anh không dấu",
        "en": "Only use unaccented English keywords",
        "ja": "アクセント記号のない英語キーワードだけを使う"
      },
      {
        "vi": "Chỉ test với chuỗi rỗng",
        "en": "Only test with an empty string",
        "ja": "空文字列だけをテストする"
      },
      {
        "vi": "Chỉ test với một từ khóa duy nhất luôn cho kết quả đúng",
        "en": "Only test with a single keyword that always returns correct results",
        "ja": "常に正しい結果が返る単一のキーワードだけをテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dữ liệu tìm kiếm cần đa dạng, sát với hành vi thực của người dùng để phát hiện lỗi encoding, xử lý ký tự đặc biệt hoặc chuỗi dài mà dữ liệu \"đẹp\" không phát hiện được.",
      "en": "Search data needs to be diverse and close to real user behavior in order to catch encoding issues, special character handling, or long-string bugs that \"clean\" data would never reveal.",
      "ja": "検索データは多様で実際のユーザー行動に近いものである必要があり、「きれいな」データでは発見できないエンコーディングの問題、特殊文字の処理、長い文字列によるバグを見つけられます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một test case bị \"flaky\" (lúc pass lúc fail dù không đổi code) trong thiết kế manual thường bắt nguồn từ đâu?",
      "en": "A \"flaky\" test case (passes sometimes, fails other times with no code change) in manual design usually originates from what?",
      "ja": "手動テストの設計において、コードを変更していないのにpassとfailが不安定に切り替わる「フレーキー」なテストケースは、通常何が原因ですか?"
    },
    "options": [
      {
        "vi": "Do server luôn hoạt động ổn định",
        "en": "Because the server always runs stably",
        "ja": "サーバーが常に安定して動作しているため"
      },
      {
        "vi": "Do bước thực hiện hoặc dữ liệu test không được mô tả rõ ràng/ổn định, dẫn tới thực thi không nhất quán giữa các lần",
        "en": "Because the execution steps or test data are not clearly/stably described, leading to inconsistent execution between runs",
        "ja": "実行手順やテストデータが明確・安定して記述されていないため、実行のたびに一貫性が失われる"
      },
      {
        "vi": "Do tester quá cẩn thận",
        "en": "Because the tester is too careful",
        "ja": "テスターが慎重すぎるため"
      },
      {
        "vi": "Flaky chỉ xảy ra với automation, không liên quan tới thiết kế test case",
        "en": "Flakiness only happens with automation and is unrelated to test case design",
        "ja": "フレーキーは自動化でのみ発生し、テストケース設計とは無関係である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test case thiếu rõ ràng về bước/dữ liệu/tiền điều kiện khiến người thực thi làm khác nhau mỗi lần, gây ra kết quả không nhất quán dù bản chất là do thiết kế chứ không phải hệ thống.",
      "en": "A test case lacking clarity in steps/data/preconditions causes executors to act differently each time, producing inconsistent results even though the root cause is design, not the system.",
      "ja": "手順・データ・事前条件が明確でないテストケースは、実行者が毎回異なる方法で実施することにつながり、根本原因はシステムではなく設計にあるにもかかわらず、結果が一貫しなくなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong thiết kế test case, \"precondition\" (tiền điều kiện) có vai trò gì?",
      "en": "In test case design, what role does a \"precondition\" play?",
      "ja": "テストケース設計における「事前条件(precondition)」の役割は何ですか?"
    },
    "options": [
      {
        "vi": "Ghi lại kết quả sau khi test xong",
        "en": "To record the result after testing is done",
        "ja": "テスト完了後の結果を記録する"
      },
      {
        "vi": "Là bước cuối cùng để đóng test case",
        "en": "It is the final step to close the test case",
        "ja": "テストケースを終了させる最後のステップである"
      },
      {
        "vi": "Mô tả trạng thái/dữ liệu hệ thống cần thiết lập trước khi thực hiện các bước test, đảm bảo môi trường nhất quán",
        "en": "Describes the system state/data that must be set up before executing the test steps, ensuring a consistent environment",
        "ja": "テスト手順を実行する前に整えておくべきシステムの状態・データを記述し、環境の一貫性を確保する"
      },
      {
        "vi": "Không bắt buộc và có thể bỏ qua ở mọi test case",
        "en": "It is not mandatory and can be skipped in every test case",
        "ja": "必須ではなく、どのテストケースでも省略してよい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Precondition đảm bảo môi trường/dữ liệu ở trạng thái đúng trước khi thực hiện test, tránh kết quả sai lệch do điều kiện ban đầu không nhất quán.",
      "en": "A precondition ensures the environment/data is in the correct state before testing, avoiding skewed results from inconsistent starting conditions.",
      "ja": "事前条件は、テスト実行前に環境やデータが正しい状態にあることを保証し、初期条件の不一致による誤った結果を防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi ưu tiên (prioritize) test case trong một bộ test lớn để chạy trong thời gian giới hạn, tiêu chí nào thường được dùng đầu tiên?",
      "en": "When prioritizing test cases in a large test suite to run within limited time, which criterion is typically used first?",
      "ja": "限られた時間内で大規模なテストスイートを実行するためにテストケースの優先順位を決める際、通常最初に使われる基準は何ですか?"
    },
    "options": [
      {
        "vi": "Thứ tự viết test case, viết trước chạy trước",
        "en": "The order in which test cases were written; first written, first run",
        "ja": "テストケースが作成された順序(先に作成されたものから実行)"
      },
      {
        "vi": "Độ dài của test case, ngắn chạy trước",
        "en": "The length of the test case; shorter ones run first",
        "ja": "テストケースの長さ(短いものから実行)"
      },
      {
        "vi": "Thứ tự bảng chữ cái tên test case",
        "en": "Alphabetical order of test case names",
        "ja": "テストケース名のアルファベット順"
      },
      {
        "vi": "Mức độ rủi ro nghiệp vụ, tần suất sử dụng chức năng, và mức độ ảnh hưởng nếu lỗi xảy ra",
        "en": "Business risk level, feature usage frequency, and the impact if a defect occurs",
        "ja": "業務上のリスクの大きさ、機能の利用頻度、そして不具合が発生した場合の影響度"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ưu tiên theo rủi ro (risk-based testing) giúp tập trung nguồn lực hạn chế vào các chức năng quan trọng, được dùng nhiều và có hậu quả nghiêm trọng nếu lỗi.",
      "en": "Risk-based prioritization focuses limited resources on features that are important, frequently used, and carry severe consequences if they fail.",
      "ja": "リスクベースの優先順位付けにより、限られたリソースを重要で利用頻度が高く、不具合発生時の影響が深刻な機能に集中させることができます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Việc chuẩn hóa test case theo một template chung (có các trường cố định như ID, Precondition, Steps, Expected Result) mang lại lợi ích chính nào?",
      "en": "What is the main benefit of standardizing test cases with a common template (fixed fields like ID, Precondition, Steps, Expected Result)?",
      "ja": "テストケースを共通テンプレート(ID、事前条件、手順、期待結果などの固定項目)で標準化する主な利点は何ですか?"
    },
    "options": [
      {
        "vi": "Giúp cả team hiểu và bảo trì test case dễ dàng, đồng nhất, thuận tiện review và audit",
        "en": "It helps the whole team understand and maintain test cases easily and consistently, and makes review/auditing convenient",
        "ja": "チーム全体がテストケースを容易かつ一貫して理解・保守でき、レビューや監査もしやすくなる"
      },
      {
        "vi": "Làm chậm quá trình viết test case",
        "en": "It slows down the process of writing test cases",
        "ja": "テストケース作成のプロセスを遅くする"
      },
      {
        "vi": "Không có lợi ích rõ ràng, chỉ là hình thức",
        "en": "There is no clear benefit, it's just a formality",
        "ja": "明確な利点はなく、単なる形式にすぎない"
      },
      {
        "vi": "Chỉ giúp đẹp báo cáo, không ảnh hưởng chất lượng test",
        "en": "It only makes reports look nicer, without affecting test quality",
        "ja": "レポートを見栄え良くするだけで、テスト品質には影響しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Template chuẩn giúp thông tin nhất quán giữa các test case, dễ dàng để người khác đọc hiểu, review, và tổng hợp báo cáo mà không mất công đoán ý người viết.",
      "en": "A standard template keeps information consistent across test cases, making them easy for others to read, review, and summarize into reports without guessing the author's intent.",
      "ja": "標準テンプレートによりテストケース間で情報の一貫性が保たれ、作成者の意図を推測する手間なく、他の人が読みやすく、レビューや報告書作成もしやすくなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi một chức năng có nhiều biến thể quyền người dùng (admin, user thường, khách), cách thiết kế test case tránh trùng lặp nhưng vẫn đủ bao phủ?",
      "en": "When a feature has multiple user permission variants (admin, regular user, guest), how should test cases be designed to avoid duplication while still ensuring full coverage?",
      "ja": "ある機能に複数のユーザー権限バリエーション(管理者、一般ユーザー、ゲスト)がある場合、重複を避けつつ十分なカバレッジを確保するテストケース設計方法は何ですか?"
    },
    "options": [
      {
        "vi": "Viết một bộ test case đầy đủ riêng biệt hoàn toàn cho từng vai trò, không chia sẻ gì",
        "en": "Write a fully separate, complete set of test cases for each role, sharing nothing",
        "ja": "各ロールごとに完全に独立した一式のテストケースを作成し、何も共有しない"
      },
      {
        "vi": "Thiết kế test case dạng bảng tham số hóa theo vai trò (data-driven theo role), dùng chung bước thực hiện nhưng khác input/expected result theo từng vai trò",
        "en": "Design test cases as a parameterized table by role (role-based data-driven), sharing the execution steps but varying input/expected result per role",
        "ja": "ロール別にパラメータ化された表形式でテストケースを設計し(ロールベースのデータ駆動)、実行手順は共通にしつつ、ロールごとに入力・期待結果を変える"
      },
      {
        "vi": "Chỉ test với vai trò admin vì có quyền cao nhất",
        "en": "Only test with the admin role since it has the highest permissions",
        "ja": "最も権限の高い管理者ロールだけをテストする"
      },
      {
        "vi": "Bỏ qua kiểm thử phân quyền vì tốn thời gian",
        "en": "Skip permission testing because it's time-consuming",
        "ja": "時間がかかるため権限テストを省略する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Dùng chung bước thực hiện, chỉ khác input/expected result theo vai trò giúp giảm số lượng test case trùng lặp mà vẫn đảm bảo bao phủ đủ các quyền truy cập khác nhau.",
      "en": "Sharing execution steps while only varying input/expected result by role reduces duplicate test cases while still ensuring adequate coverage of different access permissions.",
      "ja": "実行手順を共通化し、ロールごとに入力・期待結果だけを変えることで、重複するテストケースを減らしながら、異なるアクセス権限を十分にカバーできます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Baseline\" test case trong quản lý phiên bản kiểm thử nghĩa là gì?",
      "en": "What does a \"baseline\" test case mean in test version management?",
      "ja": "テストのバージョン管理における「ベースライン」テストケースとは何を意味しますか?"
    },
    "options": [
      {
        "vi": "Test case chỉ dùng để test hiệu năng",
        "en": "A test case only used for performance testing",
        "ja": "パフォーマンステストにのみ使用されるテストケース"
      },
      {
        "vi": "Test case bị lỗi cần xóa",
        "en": "A defective test case that needs to be deleted",
        "ja": "削除が必要な不具合のあるテストケース"
      },
      {
        "vi": "Phiên bản test case đã được review/chốt và dùng làm mốc tham chiếu để so sánh các thay đổi sau này",
        "en": "A version of a test case that has been reviewed/finalized and used as a reference point to compare later changes",
        "ja": "レビュー・確定済みで、その後の変更を比較するための基準点として使われるテストケースのバージョン"
      },
      {
        "vi": "Test case tự động sinh ra bởi AI",
        "en": "A test case automatically generated by AI",
        "ja": "AIによって自動生成されたテストケース"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Baseline là mốc chuẩn đã được thống nhất, dùng để so sánh, đánh giá tác động khi có thay đổi hoặc để rollback nếu cần.",
      "en": "A baseline is an agreed-upon reference point used for comparison, impact assessment when changes occur, or rollback if needed.",
      "ja": "ベースラインは合意済みの基準点であり、変更が発生した際の比較や影響評価、必要に応じたロールバックに使用されます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thiết kế test case cho form đăng ký, việc chỉ viết các test case với dữ liệu \"đẹp\" (luôn hợp lệ) dẫn tới rủi ro gì?",
      "en": "When designing test cases for a registration form, what risk arises from writing test cases only with \"clean\" (always valid) data?",
      "ja": "登録フォームのテストケースを設計する際、「きれいな」(常に有効な)データだけでテストケースを書くと、どのようなリスクが生じますか?"
    },
    "options": [
      {
        "vi": "Không có rủi ro vì dữ liệu đẹp là đủ đại diện",
        "en": "No risk, since clean data is representative enough",
        "ja": "きれいなデータで十分代表性があるため、リスクはない"
      },
      {
        "vi": "Giúp tiết kiệm thời gian mà không ảnh hưởng chất lượng",
        "en": "It saves time without affecting quality",
        "ja": "品質に影響を与えずに時間を節約できる"
      },
      {
        "vi": "Chỉ ảnh hưởng tới hiệu năng, không ảnh hưởng chức năng",
        "en": "It only affects performance, not functionality",
        "ja": "パフォーマンスにのみ影響し、機能には影響しない"
      },
      {
        "vi": "Bỏ sót các lỗi xử lý ngoại lệ, validate sai, hoặc crash khi người dùng nhập dữ liệu thực tế đa dạng và không hợp lệ",
        "en": "It misses exception handling bugs, validation errors, or crashes that occur when real users enter diverse, invalid data",
        "ja": "実際のユーザーが多様で無効なデータを入力した際の例外処理の不具合、バリデーションエラー、クラッシュなどを見逃してしまう"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chỉ test dữ liệu hợp lệ bỏ sót phần lớn lỗi thực tế; cần bổ sung negative test data để phát hiện lỗi validate và xử lý ngoại lệ.",
      "en": "Testing only valid data misses most real-world bugs; negative test data must be added to catch validation and exception-handling errors.",
      "ja": "有効なデータだけをテストすると、実際に発生する多くの不具合を見逃してしまいます。バリデーションや例外処理の不具合を発見するには、無効なテストデータも追加する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một buổi phỏng vấn, nhà tuyển dụng hỏi: \"Bạn đo độ bao phủ (coverage) của bộ test case bằng cách nào nếu không có coverage tool?\" Câu trả lời hợp lý là gì?",
      "en": "In an interview, the recruiter asks: \"How do you measure the coverage of your test suite without a coverage tool?\" What is a reasonable answer?",
      "ja": "面接で採用担当者が「カバレッジツールがない場合、テストスイートのカバレッジをどのように測定しますか?」と質問しました。妥当な答えはどれですか?"
    },
    "options": [
      {
        "vi": "Đối chiếu thủ công test case với traceability matrix/requirement list, checklist chức năng, và các kỹ thuật thiết kế (biên, phân vùng) đã áp dụng đủ chưa",
        "en": "Manually cross-check test cases against the traceability matrix/requirement list, functional checklist, and whether design techniques (boundary, partitioning) have been sufficiently applied",
        "ja": "トレーサビリティマトリクス/要件リスト、機能チェックリストとテストケースを手動で照合し、設計技法(境界値、分割)が十分に適用されているかを確認する"
      },
      {
        "vi": "Không thể đo được nếu thiếu tool",
        "en": "It's impossible to measure without a tool",
        "ja": "ツールがなければ測定は不可能である"
      },
      {
        "vi": "Chỉ cần đếm số lượng test case càng nhiều càng tốt",
        "en": "Just count as many test cases as possible",
        "ja": "できるだけ多くのテストケース数を数えればよい"
      },
      {
        "vi": "Copy bộ test case của dự án khác",
        "en": "Copy the test suite from another project",
        "ja": "別のプロジェクトのテストスイートをコピーする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Không có coverage tool vẫn có thể đánh giá bằng cách đối chiếu thủ công với requirement/checklist và kiểm tra các kỹ thuật thiết kế test đã áp dụng đầy đủ chưa.",
      "en": "Even without a coverage tool, coverage can be assessed by manually cross-checking against requirements/checklists and verifying whether test design techniques have been fully applied.",
      "ja": "カバレッジツールがなくても、要件・チェックリストとの手動照合や、テスト設計技法が十分に適用されているかの確認によってカバレッジを評価できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Yếu tố nào KHÔNG nên đưa vào bước thực hiện (test steps) của một test case chuẩn?",
      "en": "Which element should NOT be included in the execution steps of a standard test case?",
      "ja": "標準的なテストケースの実行手順に含めるべきでない要素はどれですか?"
    },
    "options": [
      {
        "vi": "Hành động cụ thể tester cần làm",
        "en": "The specific action the tester needs to perform",
        "ja": "テスターが行うべき具体的なアクション"
      },
      {
        "vi": "Ý kiến cá nhân, phỏng đoán chủ quan về nguyên nhân lỗi tiềm ẩn thay vì mô tả hành động khách quan",
        "en": "Personal opinions or subjective guesses about potential root causes, instead of an objective description of the action",
        "ja": "客観的な行動の記述の代わりに、潜在的な原因についての個人的な意見や主観的な推測"
      },
      {
        "vi": "Dữ liệu đầu vào cần nhập",
        "en": "The input data that needs to be entered",
        "ja": "入力すべきデータ"
      },
      {
        "vi": "Kết quả mong đợi tương ứng với bước đó",
        "en": "The expected result corresponding to that step",
        "ja": "そのステップに対応する期待結果"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Bước thực hiện cần khách quan, cụ thể và có thể lặp lại; ý kiến chủ quan hay phỏng đoán nên để ở phần ghi chú/báo cáo bug, không lẫn vào bước test.",
      "en": "Execution steps should be objective, specific, and repeatable; subjective opinions or guesses belong in notes/bug reports, not mixed into the test steps.",
      "ja": "実行手順は客観的で具体的、再現可能であるべきです。主観的な意見や推測はメモやバグ報告に記載すべきであり、テスト手順に混ぜるべきではありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một dự án thực tế, Test Strategy (chiến lược kiểm thử) thường được lập ở cấp độ nào so với Test Plan (kế hoạch kiểm thử)?",
      "en": "In a real project, at what level is the Test Strategy typically defined compared to the Test Plan?",
      "ja": "実際のプロジェクトでは、テスト戦略はテスト計画に対してどのレベルで定義されることが多いですか。"
    },
    "options": [
      {
        "vi": "Chỉ áp dụng cho riêng đội DevOps",
        "en": "Only applies to the DevOps team",
        "ja": "DevOpsチームだけに適用される"
      },
      {
        "vi": "Cấp từng module code, thay đổi theo từng commit",
        "en": "At the code-module level, changing with every commit",
        "ja": "コードモジュールごとのレベルで、コミットごとに変わる"
      },
      {
        "vi": "Cấp tổ chức/nhiều dự án, mang tính định hướng lâu dài và ít thay đổi",
        "en": "At organizational/multi-project level, long-term and rarely changed",
        "ja": "組織・複数プロジェクトレベルで、長期的で変更が少ない"
      },
      {
        "vi": "Chỉ tồn tại trong đầu tester, không cần văn bản",
        "en": "Only exists in the tester's mind, never documented",
        "ja": "テスト担当者の頭の中だけに存在し文書化しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test Strategy thường mang tính tổng quát, áp dụng cho nhiều dự án/toàn tổ chức và ít thay đổi, còn Test Plan cụ thể hóa cho từng dự án.",
      "en": "Test Strategy is usually general, applies across multiple projects/the whole organization, and changes rarely, while the Test Plan is project-specific.",
      "ja": "テスト戦略は一般的で複数プロジェクト・組織全体に適用され変更が少ない一方、テスト計画は各プロジェクト固有です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test Plan của một dự án cụ thể thường KHÔNG bao gồm nội dung nào sau đây?",
      "en": "Which of the following is typically NOT included in a project-specific Test Plan?",
      "ja": "特定プロジェクトのテスト計画に通常含まれないものはどれですか。"
    },
    "options": [
      {
        "vi": "Lịch trình kiểm thử và mốc thời gian (milestones)",
        "en": "Test schedule and milestones",
        "ja": "テストスケジュールとマイルストーン"
      },
      {
        "vi": "Danh sách nhân sự và vai trò trong đội kiểm thử",
        "en": "List of personnel and roles in the test team",
        "ja": "テストチームの人員とロールの一覧"
      },
      {
        "vi": "Phạm vi (scope) các tính năng cần kiểm thử của dự án",
        "en": "Scope of features to be tested for the project",
        "ja": "プロジェクトでテストすべき機能の範囲"
      },
      {
        "vi": "Chính sách kiểm thử chung áp dụng cho mọi dự án trong công ty",
        "en": "General test policy applied to every project in the company",
        "ja": "会社の全プロジェクトに適用される一般的なテストポリシー"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chính sách kiểm thử chung (test policy) thuộc cấp tổ chức, nằm trong tài liệu chiến lược chứ không phải kế hoạch kiểm thử của từng dự án.",
      "en": "The general test policy belongs at the organizational level and sits in strategy documents, not in a project's test plan.",
      "ja": "一般的なテストポリシーは組織レベルのものであり、戦略文書に属し、個々のプロジェクトのテスト計画には含まれません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một công ty có nhiều dự án cùng áp dụng một 'Test Strategy' chung nhưng mỗi dự án lại có 'Test Plan' riêng khác nhau. Điều này thể hiện đặc điểm gì?",
      "en": "A company applies one common Test Strategy across many projects, yet each project has its own distinct Test Plan. What does this illustrate?",
      "ja": "ある会社は多くのプロジェクトに共通のテスト戦略を適用しますが、各プロジェクトは独自のテスト計画を持っています。これは何を示していますか。"
    },
    "options": [
      {
        "vi": "Chiến lược là khung định hướng chung, kế hoạch là sự cụ thể hóa theo bối cảnh riêng của từng dự án",
        "en": "Strategy is a common guiding framework, while the plan is its concretization tailored to each project's context",
        "ja": "戦略は共通の指針であり、計画は各プロジェクトの文脈に合わせた具体化である"
      },
      {
        "vi": "Công ty đang làm sai quy trình vì phải dùng chung cả hai tài liệu",
        "en": "The company is doing it wrong because both documents must be identical",
        "ja": "両方の文書は同一でなければならないため、会社は誤ったプロセスを行っている"
      },
      {
        "vi": "Test Plan và Test Strategy là một tài liệu duy nhất, chỉ khác tên gọi",
        "en": "Test Plan and Test Strategy are actually the same single document, just named differently",
        "ja": "テスト計画とテスト戦略は実は同一文書で名前が違うだけである"
      },
      {
        "vi": "Không có mối liên hệ nào giữa hai tài liệu này",
        "en": "There is no relationship between the two documents at all",
        "ja": "この2つの文書には何の関係もない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Strategy đóng vai trò định hướng chung ổn định, còn Test Plan điều chỉnh theo phạm vi, rủi ro, nguồn lực của từng dự án cụ thể.",
      "en": "The Test Strategy provides stable, general guidance, while the Test Plan adapts to the scope, risk, and resources of each specific project.",
      "ja": "テスト戦略は安定した一般的な指針を提供し、テスト計画は各プロジェクト固有の範囲・リスク・リソースに応じて調整されます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong buổi phỏng vấn, bạn được hỏi: 'Ai là người thường chịu trách nhiệm chính soạn Test Plan cho một dự án?' Câu trả lời phù hợp nhất là gì?",
      "en": "In an interview, you're asked: 'Who is typically primarily responsible for writing a project's Test Plan?' What's the best answer?",
      "ja": "面接で「プロジェクトのテスト計画を主に作成する責任者は誰か」と聞かれた場合、最も適切な答えは何ですか。"
    },
    "options": [
      {
        "vi": "Khách hàng cuối (end user) tự viết mà không cần đội dự án tham gia",
        "en": "The end user writes it alone without any project team involvement",
        "ja": "プロジェクトチームの関与なしにエンドユーザーが単独で作成する"
      },
      {
        "vi": "Test Lead hoặc Test Manager, dựa trên yêu cầu và nguồn lực thực tế của dự án",
        "en": "The Test Lead or Test Manager, based on the project's actual requirements and resources",
        "ja": "プロジェクトの実際の要件とリソースに基づき、テストリードまたはテストマネージャー"
      },
      {
        "vi": "Bộ phận nhân sự (HR) của công ty",
        "en": "The company's HR department",
        "ja": "会社の人事部"
      },
      {
        "vi": "Không ai cần viết, vì test plan chỉ là hình thức",
        "en": "No one needs to write it, since a test plan is just a formality",
        "ja": "テスト計画は形式的なものなので誰も作成する必要はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Lead/Test Manager thường chủ trì lập Test Plan dựa trên phạm vi, rủi ro, lịch trình và nguồn lực thực tế của dự án.",
      "en": "The Test Lead/Test Manager typically leads the creation of the Test Plan based on the project's scope, risks, schedule, and available resources.",
      "ja": "テストリード/テストマネージャーは通常、プロジェクトの範囲・リスク・スケジュール・利用可能なリソースに基づきテスト計画の作成を主導します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Chuẩn IEEE 829 (nay là ISO/IEC/IEEE 29119) thường được nhắc đến khi nói về nội dung Test Plan vì lý do gì?",
      "en": "The IEEE 829 standard (now ISO/IEC/IEEE 29119) is often referenced regarding Test Plan content for what reason?",
      "ja": "IEEE 829規格（現在はISO/IEC/IEEE 29119）がテスト計画の内容について言及される理由は何ですか。"
    },
    "options": [
      {
        "vi": "Nó bắt buộc mọi công ty phải dùng đúng một mẫu duy nhất",
        "en": "It mandates every company use exactly one single template",
        "ja": "すべての会社が単一のテンプレートを使わなければならないと義務付けている"
      },
      {
        "vi": "Nó chỉ áp dụng cho phần mềm nhúng, không dùng được cho web/app",
        "en": "It only applies to embedded software, not to web/mobile apps",
        "ja": "組み込みソフトウェアにのみ適用され、Web/アプリには使えない"
      },
      {
        "vi": "Nó cung cấp cấu trúc/đề mục tham khảo phổ biến cho tài liệu test plan (mục tiêu, phạm vi, tiêu chí, nguồn lực...)",
        "en": "It provides a widely referenced outline/structure for test plan documents (objectives, scope, criteria, resources...)",
        "ja": "テスト計画文書の広く参照される構成（目的、範囲、基準、リソースなど）を提供する"
      },
      {
        "vi": "Nó thay thế hoàn toàn vai trò của Test Lead",
        "en": "It completely replaces the role of the Test Lead",
        "ja": "テストリードの役割を完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chuẩn này đưa ra khung đề mục tham khảo phổ biến, các đội tự điều chỉnh cho phù hợp bối cảnh dự án chứ không bắt buộc theo khuôn cứng.",
      "en": "The standard offers a commonly referenced outline that teams adapt to their project context rather than following rigidly.",
      "ja": "この規格は一般的に参照される構成を提供し、チームは厳密に従うのではなくプロジェクトの状況に合わせて調整します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa 'Test Approach' trong Test Strategy và 'Test Approach' cụ thể trong Test Plan là gì?",
      "en": "What's the core difference between the 'Test Approach' in a Test Strategy versus the specific 'Test Approach' in a Test Plan?",
      "ja": "テスト戦略における「テストアプローチ」と、テスト計画における具体的な「テストアプローチ」の本質的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Test Approach trong Strategy do lập trình viên quyết định, còn trong Plan do khách hàng quyết định",
        "en": "The Approach in Strategy is decided by developers, while in the Plan it's decided by the customer",
        "ja": "戦略のアプローチは開発者が決め、計画のアプローチは顧客が決める"
      },
      {
        "vi": "Hai khái niệm này hoàn toàn giống nhau, không có gì khác biệt",
        "en": "The two concepts are completely identical with no difference",
        "ja": "2つの概念は完全に同一で違いはない"
      },
      {
        "vi": "Test Approach chỉ xuất hiện trong Test Plan, không bao giờ có trong Strategy",
        "en": "Test Approach only ever appears in a Test Plan, never in a Strategy",
        "ja": "テストアプローチはテスト計画にのみ存在し、戦略には決して現れない"
      },
      {
        "vi": "Trong Strategy là nguyên tắc/loại hình chung (rủi ro, phân tích...); trong Plan là cách áp dụng cụ thể cho tính năng/module của dự án",
        "en": "In Strategy it's general principles/type (risk-based, analytical...); in the Plan it's the concrete application to the project's features/modules",
        "ja": "戦略では一般原則・種類（リスクベース、分析的など）、計画ではプロジェクトの機能・モジュールへの具体的な適用方法"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Strategy nêu định hướng chung (ví dụ risk-based testing), Plan sẽ chi tiết hóa cách áp dụng cho từng chức năng cụ thể trong phạm vi dự án.",
      "en": "Strategy states general direction (e.g., risk-based testing) while the Plan details how it's applied to specific functions within project scope.",
      "ja": "戦略は一般的な方向性（例：リスクベーステスト）を示し、計画はプロジェクト範囲内の具体的な機能への適用方法を詳細化します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong thực tế dự án Agile, tài liệu 'Test Plan' truyền thống thường được thay thế/rút gọn bằng hình thức nào?",
      "en": "In real-world Agile projects, the traditional 'Test Plan' document is often replaced/condensed into what form?",
      "ja": "実際のアジャイルプロジェクトでは、従来の「テスト計画」文書はしばしば何に置き換え/簡素化されますか。"
    },
    "options": [
      {
        "vi": "Test Charter/Sprint test plan ngắn gọn, cập nhật linh hoạt theo từng sprint",
        "en": "A lightweight Test Charter/Sprint test plan, updated flexibly each sprint",
        "ja": "各スプリントごとに柔軟に更新される軽量なテストチャーター/スプリントテスト計画"
      },
      {
        "vi": "Không cần bất kỳ tài liệu kiểm thử nào trong Agile",
        "en": "No test documentation of any kind is needed in Agile",
        "ja": "アジャイルではいかなるテスト文書も不要"
      },
      {
        "vi": "Vẫn giữ nguyên bộ tài liệu 500 trang như dự án Waterfall",
        "en": "It keeps the same 500-page document set as a Waterfall project",
        "ja": "ウォーターフォールプロジェクトと同じ500ページの文書一式をそのまま維持する"
      },
      {
        "vi": "Được thay bằng hợp đồng pháp lý với khách hàng",
        "en": "It's replaced by a legal contract with the customer",
        "ja": "顧客との法的契約に置き換えられる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dự án Agile thường dùng test charter hoặc test plan gọn nhẹ theo sprint/release thay vì tài liệu chi tiết cố định như Waterfall.",
      "en": "Agile projects often use lightweight test charters or sprint/release-level plans instead of a fixed detailed document like in Waterfall.",
      "ja": "アジャイルプロジェクトでは、ウォーターフォールのような固定的で詳細な文書ではなく、軽量なテストチャーターやスプリント/リリース単位の計画がよく使われます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một trong những mục 'Assumptions and Constraints' (giả định và ràng buộc) trong Test Plan có ý nghĩa thực tế gì?",
      "en": "What is the practical purpose of the 'Assumptions and Constraints' section in a Test Plan?",
      "ja": "テスト計画における「前提条件と制約」の項目には実務的にどのような意味がありますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng để liệt kê tên các tester trong đội",
        "en": "Only used to list the names of testers in the team",
        "ja": "チーム内のテスト担当者名を列挙するためだけに使う"
      },
      {
        "vi": "Ghi lại điều kiện tiền đề (môi trường sẵn sàng, nhân sự đủ...) và giới hạn (ngân sách, thời gian) ảnh hưởng tới kiểm thử",
        "en": "Records preconditions (environment ready, staffing sufficient...) and limitations (budget, time) affecting testing",
        "ja": "テストに影響する前提条件（環境準備完了、要員十分など）と制約（予算、時間）を記録する"
      },
      {
        "vi": "Là phần không cần thiết, có thể bỏ qua trong mọi dự án",
        "en": "An unnecessary section that can be skipped in every project",
        "ja": "すべてのプロジェクトで省略できる不要な項目である"
      },
      {
        "vi": "Ghi lại lịch sử commit code của lập trình viên",
        "en": "Records the developers' code commit history",
        "ja": "開発者のコードコミット履歴を記録する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mục này giúp nhóm dự án nhận diện sớm các điều kiện tiền đề và giới hạn có thể ảnh hưởng đến tiến độ, phạm vi kiểm thử.",
      "en": "This section helps the project team identify early the preconditions and limits that may impact testing schedule and scope.",
      "ja": "この項目は、テストのスケジュールや範囲に影響を与える可能性のある前提条件と制約をプロジェクトチームが早期に把握するのに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test Manager của bạn nói: 'Chiến lược của công ty là analytical (risk-based) strategy'. Điều này ảnh hưởng thế nào đến Test Plan của dự án bạn đang làm?",
      "en": "Your Test Manager says: 'The company's strategy is an analytical (risk-based) strategy.' How does this influence the Test Plan of your project?",
      "ja": "テストマネージャーが「会社の戦略は分析的（リスクベース）戦略だ」と言いました。これはあなたのプロジェクトのテスト計画にどう影響しますか。"
    },
    "options": [
      {
        "vi": "Chỉ cần kiểm thử smoke test là đủ, bỏ qua phân tích rủi ro",
        "en": "Only smoke testing is needed, risk analysis can be skipped entirely",
        "ja": "スモークテストだけで十分でリスク分析は省略できる"
      },
      {
        "vi": "Test Plan không cần quan tâm đến rủi ro vì đó là việc của Strategy",
        "en": "The Test Plan doesn't need to consider risk since that's the Strategy's job alone",
        "ja": "リスクは戦略の仕事なのでテスト計画は考慮する必要がない"
      },
      {
        "vi": "Test Plan phải ưu tiên phân tích rủi ro sản phẩm và phân bổ nỗ lực kiểm thử theo mức độ rủi ro của từng chức năng",
        "en": "The Test Plan must prioritize product risk analysis and allocate test effort according to each feature's risk level",
        "ja": "テスト計画は製品リスク分析を優先し、各機能のリスクレベルに応じてテスト工数を配分しなければならない"
      },
      {
        "vi": "Test Plan sẽ tự động giống hệt Test Strategy, không cần điều chỉnh gì",
        "en": "The Test Plan will automatically be identical to the Test Strategy with no adjustment needed",
        "ja": "テスト計画は自動的にテスト戦略と全く同じになり調整は不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test Plan cần cụ thể hóa định hướng chiến lược (ví dụ risk-based) bằng việc thực hiện phân tích rủi ro và phân bổ nguồn lực tương ứng cho dự án.",
      "en": "The Test Plan needs to concretize the strategic direction (e.g., risk-based) by performing risk analysis and allocating corresponding resources for the project.",
      "ja": "テスト計画は、リスク分析を実施しプロジェクトに応じたリソース配分を行うことで、戦略的方向性（例：リスクベース）を具体化する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Test Plan, mục 'Test Deliverables' (sản phẩm bàn giao kiểm thử) thường bao gồm những gì?",
      "en": "In a Test Plan, what does the 'Test Deliverables' section typically include?",
      "ja": "テスト計画の「テスト成果物」項目には通常何が含まれますか。"
    },
    "options": [
      {
        "vi": "Kế hoạch marketing sản phẩm",
        "en": "The product marketing plan",
        "ja": "製品のマーケティング計画"
      },
      {
        "vi": "Chỉ có duy nhất mã nguồn của ứng dụng",
        "en": "Only the application's source code",
        "ja": "アプリケーションのソースコードのみ"
      },
      {
        "vi": "Hóa đơn thanh toán lương nhân viên",
        "en": "Employee payroll invoices",
        "ja": "従業員の給与請求書"
      },
      {
        "vi": "Test case, test data, báo cáo kết quả kiểm thử, log lỗi và các tài liệu liên quan cần bàn giao",
        "en": "Test cases, test data, test result reports, defect logs, and related documents to be delivered",
        "ja": "テストケース、テストデータ、テスト結果報告書、不具合ログなど納品すべき関連文書"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test Deliverables liệt kê các tài liệu/sản phẩm mà đội kiểm thử tạo ra và bàn giao trong suốt dự án như test case, báo cáo, log lỗi.",
      "en": "Test Deliverables list the documents/artifacts the test team produces and hands over throughout the project, such as test cases, reports, and defect logs.",
      "ja": "テスト成果物は、テストケース、報告書、不具合ログなど、テストチームがプロジェクト全体で作成・引き渡す文書/成果物を列挙します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Nhà tuyển dụng hỏi: 'Nếu dự án không có Test Strategy văn bản riêng, bạn dựa vào đâu để viết Test Plan?' Câu trả lời hợp lý nhất là gì?",
      "en": "An interviewer asks: 'If a project has no separate written Test Strategy, what would you base the Test Plan on?' What's the most reasonable answer?",
      "ja": "面接官が「プロジェクトに独立した文書化されたテスト戦略がない場合、何を基にテスト計画を作成しますか」と尋ねました。最も妥当な答えは何ですか。"
    },
    "options": [
      {
        "vi": "Dựa vào chính sách kiểm thử/kinh nghiệm chung của tổ chức, yêu cầu dự án và rủi ro thực tế để tự xác định hướng tiếp cận",
        "en": "Base it on the organization's general test policy/experience, project requirements, and actual risks to define the approach",
        "ja": "組織の一般的なテストポリシー・経験、プロジェクト要件、実際のリスクを基に自らアプローチを定める"
      },
      {
        "vi": "Không thể viết Test Plan nếu thiếu Test Strategy văn bản",
        "en": "It's impossible to write a Test Plan without a written Test Strategy",
        "ja": "文書化されたテスト戦略がなければテスト計画は作成不可能"
      },
      {
        "vi": "Copy nguyên Test Plan của dự án khác không liên quan",
        "en": "Just copy an unrelated project's Test Plan verbatim",
        "ja": "無関係な他プロジェクトのテスト計画をそのままコピーする"
      },
      {
        "vi": "Chờ khách hàng tự viết Test Plan hộ",
        "en": "Wait for the customer to write the Test Plan themselves",
        "ja": "顧客が代わりにテスト計画を書いてくれるのを待つ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Không phải mọi tổ chức đều có tài liệu strategy riêng biệt; tester vẫn có thể xây Test Plan dựa trên chính sách chung, kinh nghiệm và rủi ro dự án.",
      "en": "Not every organization has a separate strategy document; testers can still build a Test Plan based on general policy, experience, and project risk.",
      "ja": "すべての組織が独立した戦略文書を持つわけではなく、テスト担当者は一般的なポリシー、経験、プロジェクトリスクに基づいてテスト計画を作成できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khác biệt nào sau đây MÔ TẢ ĐÚNG nhất giữa Test Strategy và Test Plan về tần suất cập nhật?",
      "en": "Which of the following most accurately describes the difference between Test Strategy and Test Plan in terms of update frequency?",
      "ja": "更新頻度の観点で、テスト戦略とテスト計画の違いを最も正確に表しているのはどれですか。"
    },
    "options": [
      {
        "vi": "Cả hai tài liệu đều không bao giờ được cập nhật sau khi ký duyệt",
        "en": "Neither document is ever updated after being signed off",
        "ja": "どちらの文書も承認後は決して更新されない"
      },
      {
        "vi": "Test Strategy ổn định, ít thay đổi; Test Plan có thể được cập nhật thường xuyên theo tiến độ và thay đổi thực tế của dự án",
        "en": "Test Strategy is stable and rarely changes; the Test Plan may be updated frequently as the project's progress and reality change",
        "ja": "テスト戦略は安定していて変更が少なく、テスト計画はプロジェクトの進捗と実態の変化に応じて頻繁に更新されうる"
      },
      {
        "vi": "Test Plan luôn ổn định hơn Test Strategy",
        "en": "The Test Plan is always more stable than the Test Strategy",
        "ja": "テスト計画は常にテスト戦略より安定している"
      },
      {
        "vi": "Tần suất cập nhật của hai tài liệu luôn bằng nhau trong mọi dự án",
        "en": "The update frequency of both documents is always equal in every project",
        "ja": "両文書の更新頻度はすべてのプロジェクトで常に同じである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Strategy mang tính định hướng dài hạn nên ít thay đổi, còn Plan cần điều chỉnh linh hoạt theo biến động thực tế của từng dự án.",
      "en": "Strategy is long-term guidance so it changes rarely, while the Plan needs flexible adjustment as each project's reality shifts.",
      "ja": "戦略は長期的な指針であるため変更が少なく、計画は各プロジェクトの実態の変化に応じて柔軟に調整する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Test Plan, phần 'Roles and Responsibilities' (vai trò và trách nhiệm) giúp giải quyết vấn đề thực tế nào?",
      "en": "In a Test Plan, the 'Roles and Responsibilities' section helps address what real-world issue?",
      "ja": "テスト計画の「役割と責任」項目は、どのような実務上の問題を解決するのに役立ちますか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho hợp đồng lao động",
        "en": "Fully replacing employment contracts",
        "ja": "雇用契約を完全に置き換える"
      },
      {
        "vi": "Quyết định mức lương của từng tester",
        "en": "Deciding each tester's salary",
        "ja": "各テスト担当者の給与を決定する"
      },
      {
        "vi": "Tránh chồng chéo/bỏ sót công việc do phân công không rõ ràng giữa các thành viên",
        "en": "Avoiding overlapping or missed work caused by unclear task assignment among team members",
        "ja": "メンバー間のタスク割当が不明確なことによる作業の重複や漏れを防ぐ"
      },
      {
        "vi": "Không có tác dụng thực tế, chỉ mang tính hình thức",
        "en": "Has no practical effect, purely a formality",
        "ja": "実務上の効果はなく単なる形式である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Xác định rõ ai làm gì (viết test case, thực thi, báo cáo...) giúp tránh chồng chéo hoặc bỏ sót công việc trong đội kiểm thử.",
      "en": "Clearly defining who does what (writing test cases, execution, reporting...) helps avoid overlap or gaps in the test team's work.",
      "ja": "誰が何をするか（テストケース作成、実行、報告など）を明確にすることで、テストチーム内の作業の重複や漏れを防げます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một dự án outsource cho 2 quốc gia khác nhau nhưng cùng áp dụng một Test Strategy chung của công ty mẹ. Vấn đề thực tế nào cần lưu ý khi viết Test Plan riêng cho mỗi bên?",
      "en": "A project is outsourced to two different countries but follows the parent company's common Test Strategy. What real issue should be considered when writing separate Test Plans for each side?",
      "ja": "あるプロジェクトが2つの異なる国にアウトソースされていますが、親会社共通のテスト戦略に従っています。それぞれのテスト計画を別々に作成する際に考慮すべき実際の問題は何ですか。"
    },
    "options": [
      {
        "vi": "Bắt buộc cả hai nhóm phải dùng chung một Test Plan giống hệt nhau",
        "en": "Both teams must be forced to use one identical Test Plan",
        "ja": "両チームは全く同一のテスト計画を使わなければならない"
      },
      {
        "vi": "Không cần lưu ý gì vì Test Strategy chung đã bao quát mọi thứ",
        "en": "Nothing to consider since the common Test Strategy already covers everything",
        "ja": "共通のテスト戦略がすべてをカバーしているため何も考慮する必要はない"
      },
      {
        "vi": "Chỉ cần dịch Test Plan sang ngôn ngữ khác là đủ",
        "en": "Just translating the Test Plan into another language is enough",
        "ja": "テスト計画を別の言語に翻訳するだけで十分"
      },
      {
        "vi": "Sự khác biệt về múi giờ, ngôn ngữ giao tiếp, quy định nội bộ và nguồn lực cụ thể của từng nhóm địa phương",
        "en": "Differences in time zones, communication language, local regulations, and specific resources of each local team",
        "ja": "タイムゾーン、コミュニケーション言語、現地の規則、各現地チームの具体的なリソースの違い"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dù chiến lược chung, Test Plan vẫn cần điều chỉnh theo bối cảnh thực tế (múi giờ, ngôn ngữ, quy định, nguồn lực) của từng nhóm địa phương.",
      "en": "Even with a common strategy, the Test Plan must adapt to each local team's real context (time zone, language, regulations, resources).",
      "ja": "共通の戦略があっても、テスト計画は各現地チームの実際の状況（タイムゾーン、言語、規則、リソース）に合わせて調整する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Câu nào sau đây mô tả ĐÚNG về mối quan hệ giữa Test Policy, Test Strategy và Test Plan?",
      "en": "Which statement correctly describes the relationship among Test Policy, Test Strategy, and Test Plan?",
      "ja": "テストポリシー、テスト戦略、テスト計画の関係を正しく説明しているのはどれですか。"
    },
    "options": [
      {
        "vi": "Test Policy nêu triết lý/mục tiêu kiểm thử tổng quát nhất; Test Strategy cụ thể hóa cách tiếp cận; Test Plan chi tiết hóa cho từng dự án",
        "en": "Test Policy states the most general testing philosophy/objectives; Test Strategy concretizes the approach; Test Plan details it for each project",
        "ja": "テストポリシーは最も一般的なテストの理念・目的を示し、テスト戦略はアプローチを具体化し、テスト計画は各プロジェクトごとに詳細化する"
      },
      {
        "vi": "Ba tài liệu này hoàn toàn độc lập, không có mối liên hệ phân cấp nào",
        "en": "These three documents are completely independent with no hierarchical relationship",
        "ja": "この3つの文書は完全に独立しており階層関係はない"
      },
      {
        "vi": "Test Plan là tài liệu cấp cao nhất, Test Policy là chi tiết nhất",
        "en": "The Test Plan is the highest-level document while the Test Policy is the most detailed",
        "ja": "テスト計画が最上位文書で、テストポリシーが最も詳細である"
      },
      {
        "vi": "Chỉ cần một trong ba tài liệu, hai tài liệu còn lại luôn thừa",
        "en": "Only one of the three is needed; the other two are always redundant",
        "ja": "3つのうち1つだけあれば十分で残り2つは常に不要"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thông thường có sự phân cấp: Test Policy (triết lý chung) → Test Strategy (cách tiếp cận tổ chức) → Test Plan (kế hoạch chi tiết theo dự án).",
      "en": "There's typically a hierarchy: Test Policy (general philosophy) → Test Strategy (organizational approach) → Test Plan (project-specific detailed plan).",
      "ja": "通常は階層があります：テストポリシー（一般的理念）→テスト戦略（組織的アプローチ）→テスト計画（プロジェクト固有の詳細計画）。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Test Plan, mục 'Risks and Contingencies' (rủi ro và kế hoạch dự phòng) khác gì so với phân tích rủi ro sản phẩm (product risk) trong Test Strategy?",
      "en": "In a Test Plan, how does 'Risks and Contingencies' differ from product risk analysis found in a Test Strategy?",
      "ja": "テスト計画の「リスクと対応策」は、テスト戦略にある製品リスク分析とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Hai loại rủi ro này hoàn toàn giống nhau, không có gì khác biệt",
        "en": "The two risk types are completely identical with no difference",
        "ja": "2種類のリスクは完全に同一で違いはない"
      },
      {
        "vi": "Đây thường là rủi ro về dự án (thiếu nhân sự, trễ tiến độ, môi trường không sẵn sàng) chứ không chỉ rủi ro chất lượng sản phẩm",
        "en": "These are typically project risks (staff shortage, schedule delay, environment unavailability), not just product quality risks",
        "ja": "これは通常、製品品質リスクだけでなく、プロジェクトリスク（人員不足、スケジュール遅延、環境未整備）である"
      },
      {
        "vi": "Risks and Contingencies chỉ nói về lỗi phần mềm đã tìm thấy",
        "en": "Risks and Contingencies only refers to software defects already found",
        "ja": "「リスクと対応策」は既に見つかったソフトウェア不具合のみを指す"
      },
      {
        "vi": "Đây là phần chỉ dành riêng cho dự án phần cứng, không áp dụng cho phần mềm",
        "en": "This section is only for hardware projects, not applicable to software",
        "ja": "この項目はハードウェアプロジェクト専用でソフトウェアには適用されない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Plan thường tập trung vào rủi ro dự án (project risk) ảnh hưởng tiến độ/nguồn lực, khác với product risk (rủi ro chất lượng sản phẩm) thường được bàn ở tầm chiến lược.",
      "en": "The Test Plan usually focuses on project risks affecting schedule/resources, distinct from product risk (quality risk) often discussed at the strategy level.",
      "ja": "テスト計画は通常、スケジュール/リソースに影響するプロジェクトリスクに焦点を当て、戦略レベルで議論されることが多い製品リスク（品質リスク）とは異なります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi khách hàng yêu cầu 'rút gọn thời gian kiểm thử' giữa dự án, tester nên cập nhật tài liệu nào trước tiên?",
      "en": "When a customer requests 'shortening the testing timeline' mid-project, which document should the tester update first?",
      "ja": "顧客がプロジェクト途中で「テスト期間の短縮」を要求した場合、テスト担当者はまずどの文書を更新すべきですか。"
    },
    "options": [
      {
        "vi": "Không cần cập nhật tài liệu nào, cứ làm theo cảm tính",
        "en": "No document needs updating; just proceed based on gut feeling",
        "ja": "どの文書も更新する必要はなく、感覚で進めればよい"
      },
      {
        "vi": "Test Strategy toàn công ty, vì mọi thay đổi đều phải sửa strategy trước",
        "en": "The company-wide Test Strategy, since every change must alter the strategy first",
        "ja": "あらゆる変更はまず戦略を変更しなければならないため、全社的なテスト戦略"
      },
      {
        "vi": "Test Plan của dự án (lịch trình, phạm vi, tiêu chí ưu tiên) chứ không phải Test Strategy chung của công ty",
        "en": "The project's Test Plan (schedule, scope, priority criteria), not the company's general Test Strategy",
        "ja": "会社の一般的なテスト戦略ではなく、プロジェクトのテスト計画（スケジュール、範囲、優先基準）"
      },
      {
        "vi": "Hợp đồng lao động của tester",
        "en": "The tester's employment contract",
        "ja": "テスト担当者の雇用契約"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Thay đổi về tiến độ/phạm vi thuộc cấp dự án nên cần điều chỉnh Test Plan cụ thể, còn Test Strategy tổng quát của công ty không cần sửa theo từng dự án.",
      "en": "Timeline/scope changes are project-level and require adjusting the specific Test Plan, while the company's general Test Strategy doesn't need per-project edits.",
      "ja": "スケジュール/範囲の変更はプロジェクトレベルであり、具体的なテスト計画の調整が必要ですが、会社の一般的なテスト戦略はプロジェクトごとに修正する必要はありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao 'Test Environment Requirements' (yêu cầu môi trường kiểm thử) thường xuất hiện trong Test Plan nhưng ít khi được mô tả chi tiết trong Test Strategy?",
      "en": "Why do 'Test Environment Requirements' typically appear in a Test Plan but are rarely detailed in a Test Strategy?",
      "ja": "「テスト環境要件」がテスト計画にはよく現れるのに、テスト戦略ではあまり詳細に記述されないのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì đó là quy định pháp luật bắt buộc",
        "en": "Because it is a mandatory legal requirement",
        "ja": "それは法律で義務付けられているため"
      },
      {
        "vi": "Vì môi trường kiểm thử không quan trọng đối với chất lượng sản phẩm",
        "en": "Because the test environment is irrelevant to product quality",
        "ja": "テスト環境は製品品質に関係ないため"
      },
      {
        "vi": "Vì Test Strategy luôn được viết chi tiết hơn Test Plan",
        "en": "Because the Test Strategy is always written in more detail than the Test Plan",
        "ja": "テスト戦略は常にテスト計画より詳細に書かれるため"
      },
      {
        "vi": "Vì môi trường (server, dữ liệu, cấu hình) phụ thuộc đặc thù kỹ thuật của từng dự án cụ thể, khó khái quát hóa ở tầm chiến lược",
        "en": "Because the environment (servers, data, configuration) depends on the specific technical details of each project, hard to generalize at strategy level",
        "ja": "環境（サーバー、データ、構成）は各プロジェクトの技術的詳細に依存し、戦略レベルで一般化しにくいため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Yêu cầu môi trường phụ thuộc công nghệ, hạ tầng cụ thể của dự án nên được mô tả chi tiết trong Test Plan thay vì tài liệu chiến lược mang tính khái quát.",
      "en": "Environment requirements depend on a project's specific technology and infrastructure, so they're detailed in the Test Plan rather than the general strategy document.",
      "ja": "環境要件はプロジェクト固有の技術とインフラに依存するため、一般的な戦略文書ではなくテスト計画で詳細化されます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn nhận thấy Test Plan của dự án ghi 'Entry/Exit Criteria' khác với Test Strategy của công ty. Cách xử lý hợp lý nhất là gì?",
      "en": "You notice the project's Test Plan specifies 'Entry/Exit Criteria' different from the company's Test Strategy. What's the most reasonable approach?",
      "ja": "プロジェクトのテスト計画が会社のテスト戦略と異なる「開始/終了基準」を記載していることに気づきました。最も妥当な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Đối chiếu và điều chỉnh sao cho phù hợp bối cảnh dự án nhưng vẫn tuân thủ nguyên tắc cốt lõi của chiến lược, có thể cần phê duyệt bổ sung",
        "en": "Reconcile and adjust to fit project context while still complying with the strategy's core principles, possibly requiring extra approval",
        "ja": "プロジェクトの状況に合わせて調整しつつ、戦略の核となる原則には従い、必要に応じて追加承認を得る"
      },
      {
        "vi": "Bỏ qua Test Strategy hoàn toàn vì nó không quan trọng",
        "en": "Ignore the Test Strategy entirely since it doesn't matter",
        "ja": "重要でないためテスト戦略を完全に無視する"
      },
      {
        "vi": "Xóa hẳn Test Plan và chỉ dùng Test Strategy cho toàn bộ kiểm thử",
        "en": "Delete the Test Plan entirely and use only the Test Strategy for all testing",
        "ja": "テスト計画を完全に削除しテスト戦略のみをすべてのテストに使用する"
      },
      {
        "vi": "Không báo cáo với ai, cứ tự ý làm theo Test Plan",
        "en": "Don't report to anyone, just proceed with the Test Plan unilaterally",
        "ja": "誰にも報告せず独断でテスト計画通りに進める"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Plan có thể linh hoạt hơn theo bối cảnh dự án nhưng nên giữ nhất quán với nguyên tắc cốt lõi của chiến lược, và thay đổi lớn cần được phê duyệt.",
      "en": "The Test Plan can be more flexible per project context but should remain consistent with the strategy's core principles, and major changes need approval.",
      "ja": "テスト計画はプロジェクトの状況に応じてより柔軟であり得ますが、戦略の核となる原則とは整合性を保つべきで、大きな変更には承認が必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một buổi phỏng vấn, ứng viên nói: 'Test Plan chỉ cần viết một lần rồi dùng mãi mãi cho mọi dự án.' Nhận định này có đúng không?",
      "en": "In an interview, a candidate says: 'A Test Plan only needs to be written once and reused forever for every project.' Is this correct?",
      "ja": "面接で候補者が「テスト計画は一度書けばあらゆるプロジェクトで永遠に使い回せる」と言いました。この主張は正しいですか。"
    },
    "options": [
      {
        "vi": "Đúng, vì mọi dự án phần mềm đều giống hệt nhau",
        "en": "Correct, because all software projects are identical",
        "ja": "正しい。すべてのソフトウェアプロジェクトは全く同じであるため"
      },
      {
        "vi": "Sai, vì mỗi dự án có phạm vi, rủi ro, nguồn lực khác nhau nên Test Plan cần được lập/điều chỉnh riêng",
        "en": "Incorrect, because each project has different scope, risk, and resources, so the Test Plan needs to be created/adjusted separately",
        "ja": "誤り。各プロジェクトは範囲・リスク・リソースが異なるため、テスト計画は個別に作成/調整する必要がある"
      },
      {
        "vi": "Đúng, nhưng chỉ áp dụng cho dự án web, không áp dụng cho mobile",
        "en": "Correct, but only applies to web projects, not mobile",
        "ja": "正しいが、Webプロジェクトのみに適用されモバイルには適用されない"
      },
      {
        "vi": "Sai, nhưng lý do là vì luật pháp cấm tái sử dụng tài liệu",
        "en": "Incorrect, but the reason is that law prohibits reusing documents",
        "ja": "誤りだが、その理由は文書の再利用を法律が禁止しているためである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Plan cần được lập riêng hoặc điều chỉnh cho từng dự án vì phạm vi, rủi ro, nguồn lực, lịch trình luôn khác nhau giữa các dự án.",
      "en": "The Test Plan must be created or adjusted per project since scope, risk, resources, and schedule always differ across projects.",
      "ja": "テスト計画は、範囲・リスク・リソース・スケジュールがプロジェクトごとに常に異なるため、プロジェクトごとに作成または調整する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mục 'Test Items/Features to be tested' trong Test Plan giúp giải quyết vấn đề gì thường gặp trong dự án thực tế?",
      "en": "The 'Test Items/Features to be tested' section in a Test Plan addresses what common real-project issue?",
      "ja": "テスト計画の「テスト対象項目・機能」項目は、実際のプロジェクトでよくある何の問題を解決しますか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn tài liệu yêu cầu (requirement document)",
        "en": "Fully replacing the requirement document",
        "ja": "要件文書を完全に置き換える"
      },
      {
        "vi": "Quyết định giá bán sản phẩm cho khách hàng",
        "en": "Deciding the product's sale price for customers",
        "ja": "顧客への製品販売価格を決定する"
      },
      {
        "vi": "Tránh hiểu lầm/tranh cãi về phạm vi kiểm thử giữa các bên liên quan (dev, PM, khách hàng)",
        "en": "Avoiding misunderstandings/disputes about test scope among stakeholders (dev, PM, customer)",
        "ja": "開発者、PM、顧客などステークホルダー間でのテスト範囲に関する誤解や論争を防ぐ"
      },
      {
        "vi": "Không có tác dụng gì trong thực tế, chỉ mang tính lý thuyết",
        "en": "Has no practical use, purely theoretical",
        "ja": "実務上の効果はなく理論のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Xác định rõ tính năng nào nằm trong/ngoài phạm vi kiểm thử giúp tránh tranh cãi và hiểu lầm giữa các bên liên quan khi dự án triển khai.",
      "en": "Clearly stating which features are in/out of test scope helps avoid disputes and misunderstandings among stakeholders during project execution.",
      "ja": "どの機能がテスト範囲内/範囲外かを明確にすることで、プロジェクト実行中のステークホルダー間の論争や誤解を防げます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong dự án thực tế, khác biệt lớn nhất giữa 'Master Test Plan' và 'Level Test Plan' (ví dụ: System Test Plan) là gì?",
      "en": "In a real project, what's the biggest difference between a 'Master Test Plan' and a 'Level Test Plan' (e.g., a System Test Plan)?",
      "ja": "実際のプロジェクトにおいて、「マスターテスト計画」と「レベルテスト計画」（例：システムテスト計画）の最大の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Level Test Plan luôn được viết trước Master Test Plan",
        "en": "The Level Test Plan is always written before the Master Test Plan",
        "ja": "レベルテスト計画は常にマスターテスト計画より先に書かれる"
      },
      {
        "vi": "Hai loại tài liệu này hoàn toàn giống nhau về nội dung",
        "en": "The two document types are completely identical in content",
        "ja": "この2種類の文書は内容が完全に同一である"
      },
      {
        "vi": "Master Test Plan chỉ dùng cho kiểm thử tự động, Level Test Plan chỉ dùng cho kiểm thử thủ công",
        "en": "The Master Test Plan is only for automated testing, the Level Test Plan only for manual testing",
        "ja": "マスターテスト計画は自動テスト専用、レベルテスト計画は手動テスト専用"
      },
      {
        "vi": "Master Test Plan bao quát toàn bộ các cấp kiểm thử của dự án; Level Test Plan chỉ tập trung chi tiết cho một cấp kiểm thử cụ thể",
        "en": "The Master Test Plan covers all test levels of the project; a Level Test Plan focuses in detail on one specific test level",
        "ja": "マスターテスト計画はプロジェクトの全テストレベルを網羅し、レベルテスト計画は特定の1つのテストレベルに詳細に焦点を当てる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Master Test Plan điều phối tổng thể nhiều cấp kiểm thử (unit, integration, system, UAT...), còn Level Test Plan đi sâu vào chi tiết một cấp cụ thể.",
      "en": "The Master Test Plan coordinates the overall multiple test levels (unit, integration, system, UAT...), while a Level Test Plan goes deep into one specific level.",
      "ja": "マスターテスト計画は複数のテストレベル（単体、結合、システム、UATなど）全体を調整し、レベルテスト計画は特定の1レベルを詳細に扱います。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi dự án thay đổi công nghệ (ví dụ chuyển từ web sang mobile app), phần nào của Test Plan cần được rà soát lại NHIỀU NHẤT?",
      "en": "When a project changes technology (e.g., from web to mobile app), which part of the Test Plan needs to be reviewed the MOST?",
      "ja": "プロジェクトの技術が変わる場合（例：Webからモバイルアプリへ）、テスト計画のどの部分を最も見直す必要がありますか。"
    },
    "options": [
      {
        "vi": "Môi trường kiểm thử, công cụ, kỹ năng nhân sự cần thiết và loại kiểm thử đặc thù (ví dụ kiểm thử thiết bị, hiệu năng pin)",
        "en": "Test environment, tools, required staff skills, and technology-specific test types (e.g., device testing, battery performance)",
        "ja": "テスト環境、ツール、必要な要員スキル、および技術特有のテストタイプ（例：デバイステスト、バッテリー性能）"
      },
      {
        "vi": "Chỉ cần đổi tên file tài liệu, nội dung giữ nguyên hoàn toàn",
        "en": "Just rename the document file, keep all content exactly the same",
        "ja": "ファイル名を変更するだけで内容は完全にそのまま"
      },
      {
        "vi": "Không cần rà soát gì vì Test Plan không liên quan đến công nghệ",
        "en": "No review needed since the Test Plan is unrelated to technology",
        "ja": "テスト計画は技術と無関係なため見直し不要"
      },
      {
        "vi": "Chỉ cần thay đổi phần chữ ký phê duyệt",
        "en": "Only the approval signature section needs changing",
        "ja": "承認署名欄だけ変更すればよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thay đổi công nghệ ảnh hưởng trực tiếp đến môi trường, công cụ, kỹ năng cần có và các loại kiểm thử đặc thù, nên đây là phần cần rà soát kỹ nhất.",
      "en": "A technology change directly affects environment, tools, required skills, and specific test types, making these the parts needing the most careful review.",
      "ja": "技術変更は環境、ツール、必要スキル、特定のテストタイプに直接影響するため、これらが最も慎重に見直すべき部分です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao nhiều công ty phần mềm nhỏ ở Việt Nam thường KHÔNG có Test Strategy văn bản riêng nhưng vẫn có Test Plan cho từng dự án?",
      "en": "Why do many small software companies in Vietnam often NOT have a separate written Test Strategy but still have a Test Plan for each project?",
      "ja": "ベトナムの多くの小規模ソフトウェア企業は、独立した文書化されたテスト戦略を持たないことが多いのに、なぜ各プロジェクトのテスト計画は持っているのですか。"
    },
    "options": [
      {
        "vi": "Vì luật pháp Việt Nam cấm các công ty nhỏ viết Test Strategy",
        "en": "Because Vietnamese law prohibits small companies from writing a Test Strategy",
        "ja": "ベトナムの法律は小規模企業がテスト戦略を書くことを禁止しているため"
      },
      {
        "vi": "Vì Test Plan là yêu cầu tối thiểu để đảm bảo dự án có định hướng kiểm thử rõ ràng, trong khi Strategy tổng quát có thể ẩn trong kinh nghiệm/quy trình chung chưa văn bản hóa",
        "en": "Because a Test Plan is the minimum requirement to ensure clear test direction per project, while a general strategy may be implicit in undocumented experience/processes",
        "ja": "テスト計画は各プロジェクトに明確なテスト方向性を確保する最低限の要件であり、一般戦略は文書化されていない経験/プロセスに暗黙的に存在することがあるため"
      },
      {
        "vi": "Vì Test Plan và Test Strategy là từ đồng nghĩa nên không cần viết cả hai",
        "en": "Because Test Plan and Test Strategy are synonyms so writing both is unnecessary",
        "ja": "テスト計画とテスト戦略は同義語なので両方書く必要がないため"
      },
      {
        "vi": "Vì công ty nhỏ không cần kiểm thử phần mềm",
        "en": "Because small companies don't need to test software at all",
        "ja": "小規模企業はソフトウェアテストが不要なため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Plan cụ thể cho dự án thường được ưu tiên viết trước vì có tác dụng thực thi ngay, trong khi Strategy tổng quát có thể tồn tại ngầm trong thói quen/kinh nghiệm của đội.",
      "en": "A concrete project Test Plan is often prioritized since it has immediate practical use, while a general strategy may exist implicitly in the team's habits/experience.",
      "ja": "具体的なプロジェクトのテスト計画は即座に実用性があるため優先されることが多く、一般的な戦略はチームの習慣/経験の中に暗黙的に存在することがあります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Test Plan, mục 'Suspension Criteria and Resumption Requirements' (tiêu chí tạm dừng và điều kiện tiếp tục) dùng để làm gì?",
      "en": "In a Test Plan, what is the 'Suspension Criteria and Resumption Requirements' section used for?",
      "ja": "テスト計画の「中断基準と再開条件」項目は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Quyết định khi nào công ty đóng cửa dự án vĩnh viễn",
        "en": "Deciding when the company permanently shuts down the project",
        "ja": "会社がプロジェクトを永久に閉鎖する時期を決定する"
      },
      {
        "vi": "Quy định thời gian nghỉ trưa của tester",
        "en": "Specifying testers' lunch break time",
        "ja": "テスト担当者の昼休み時間を規定する"
      },
      {
        "vi": "Xác định khi nào nên tạm dừng kiểm thử (ví dụ build lỗi nghiêm trọng) và điều kiện để tiếp tục kiểm thử trở lại",
        "en": "Defining when testing should be suspended (e.g., critical build blocker) and the conditions to resume testing",
        "ja": "テストを中断すべき時点（例：重大なビルド障害）と、テストを再開するための条件を定義する"
      },
      {
        "vi": "Không có ứng dụng thực tế nào trong dự án phần mềm",
        "en": "Has no practical application in software projects",
        "ja": "ソフトウェアプロジェクトにおいて実務上の応用はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mục này giúp đội kiểm thử biết khi nào cần tạm dừng (ví dụ blocker nghiêm trọng chặn kiểm thử) và điều kiện cụ thể để tiếp tục công việc.",
      "en": "This section helps the test team know when to pause (e.g., a severe blocker preventing testing) and the specific conditions to resume work.",
      "ja": "この項目は、テストチームがいつ中断すべきか（例：テストを妨げる重大なブロッカー）と、作業を再開する具体的な条件を把握するのに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "So với Test Plan, Test Strategy thường KHÔNG đề cập chi tiết đến nội dung nào sau đây?",
      "en": "Compared to a Test Plan, a Test Strategy typically does NOT go into detail on which of the following?",
      "ja": "テスト計画と比較して、テスト戦略が通常詳細に触れないのは次のうちどれですか。"
    },
    "options": [
      {
        "vi": "Tiêu chuẩn chất lượng và công cụ chung áp dụng xuyên suốt các dự án",
        "en": "Common quality standards and tools applied across projects",
        "ja": "プロジェクト全体に適用される共通の品質基準とツール"
      },
      {
        "vi": "Các loại kỹ thuật kiểm thử được khuyến nghị áp dụng chung (ví dụ risk-based, black-box)",
        "en": "General recommended testing technique types (e.g., risk-based, black-box)",
        "ja": "一般的に推奨されるテスト技法の種類（例：リスクベース、ブラックボックス）"
      },
      {
        "vi": "Mức độ kiểm thử tự động hóa mong muốn ở tầm tổ chức",
        "en": "The desired level of test automation at the organizational level",
        "ja": "組織レベルで望まれるテスト自動化の水準"
      },
      {
        "vi": "Lịch trình cụ thể (ngày bắt đầu/kết thúc kiểm thử) của từng dự án",
        "en": "The specific schedule (start/end testing dates) of each individual project",
        "ja": "各プロジェクトの具体的なスケジュール（テスト開始/終了日）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lịch trình cụ thể theo ngày là chi tiết đặc thù của từng dự án, thuộc về Test Plan chứ không phải Test Strategy mang tính tổng quát.",
      "en": "A specific day-by-day schedule is project-specific detail belonging to the Test Plan, not the general Test Strategy.",
      "ja": "具体的な日程スケジュールはプロジェクト固有の詳細であり、一般的なテスト戦略ではなくテスト計画に属します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn là tester mới, được giao đọc cả Test Strategy và Test Plan của công ty trước khi bắt đầu dự án. Mục đích chính của việc này là gì?",
      "en": "As a new tester, you're asked to read both the company's Test Strategy and the project's Test Plan before starting. What's the main purpose?",
      "ja": "新人テスト担当者として、プロジェクト開始前に会社のテスト戦略とプロジェクトのテスト計画の両方を読むよう指示されました。その主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Hiểu định hướng chung của tổ chức (Strategy) và cách áp dụng cụ thể cho dự án hiện tại (Plan) để làm việc đúng quy trình",
        "en": "To understand the organization's general direction (Strategy) and its specific application to the current project (Plan) in order to work correctly",
        "ja": "組織の一般的な方向性（戦略）と、現在のプロジェクトへの具体的な適用方法（計画）を理解し、正しい手順で作業するため"
      },
      {
        "vi": "Chỉ để điền vào form nhân sự, không có mục đích công việc",
        "en": "Merely to fill out an HR form, with no work-related purpose",
        "ja": "人事フォームに記入するためだけで業務上の目的はない"
      },
      {
        "vi": "Để thi lấy chứng chỉ ISTQB ngay lập tức",
        "en": "To immediately sit the ISTQB certification exam",
        "ja": "すぐにISTQB資格試験を受けるため"
      },
      {
        "vi": "Vì quy định không liên quan gì đến công việc kiểm thử thực tế",
        "en": "Because of a regulation unrelated to actual testing work",
        "ja": "実際のテスト業務とは無関係な規則のためである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đọc cả hai giúp tester mới nắm được bức tranh tổng thể (định hướng chung) và cách áp dụng thực tế (kế hoạch cụ thể) để làm việc hiệu quả, đúng chuẩn.",
      "en": "Reading both helps a new tester grasp the big picture (general direction) and the practical application (specific plan) to work effectively and correctly.",
      "ja": "両方を読むことで、新人テスト担当者は全体像（一般的方向性）と実際の適用方法（具体的計画）を把握し、効果的かつ正しく作業できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một bug report được coi là đầy đủ tối thiểu cần có những trường thông tin nào?",
      "en": "At minimum, what fields should a complete bug report include?",
      "ja": "最低限、バグレポートにはどの項目が含まれているべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần tiêu đề và tên người báo lỗi",
        "en": "Just a title and the reporter's name",
        "ja": "タイトルと報告者名だけ"
      },
      {
        "vi": "Tiêu đề, các bước tái hiện, kết quả mong đợi, kết quả thực tế, môi trường test",
        "en": "Title, steps to reproduce, expected result, actual result, and test environment",
        "ja": "タイトル、再現手順、期待結果、実際の結果、テスト環境"
      },
      {
        "vi": "Chỉ cần ảnh chụp màn hình lỗi",
        "en": "Just a screenshot of the error",
        "ja": "エラーのスクリーンショットのみ"
      },
      {
        "vi": "Chỉ cần mô tả cảm nhận của tester về lỗi",
        "en": "Just the tester's personal impression of the bug",
        "ja": "バグに対するテスターの個人的な感想のみ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Bug report cần đủ thông tin để dev hiểu, tái hiện và khắc phục lỗi mà không cần hỏi lại nhiều lần, gồm tiêu đề rõ ràng, các bước tái hiện, kết quả mong đợi/thực tế và môi trường thực hiện.",
      "en": "A bug report needs enough information for developers to understand, reproduce, and fix the issue without repeated back-and-forth, including a clear title, reproduction steps, expected/actual results, and environment.",
      "ja": "バグレポートには、開発者が何度も聞き返さずに理解・再現・修正できるだけの情報、すなわち明確なタイトル、再現手順、期待結果と実際の結果、環境情報が必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tiêu đề (summary) của một bug report nên được viết như thế nào?",
      "en": "How should the summary/title of a bug report be written?",
      "ja": "バグレポートのタイトル（サマリー）はどのように書くべきですか。"
    },
    "options": [
      {
        "vi": "Càng ngắn càng tốt, ví dụ chỉ ghi \"Bị lỗi\"",
        "en": "As short as possible, e.g. just \"It's broken\"",
        "ja": "できるだけ短く、例えば「壊れている」とだけ書く"
      },
      {
        "vi": "Viết toàn bộ nội dung email trao đổi vào tiêu đề",
        "en": "Paste the entire email thread content into the title",
        "ja": "メールのやり取り全文をタイトルに貼り付ける"
      },
      {
        "vi": "Ngắn gọn nhưng đủ ý: mô tả vấn đề và ngữ cảnh xảy ra, giúp phân biệt với các bug khác",
        "en": "Concise yet informative: describe the problem and the context it occurs in, distinguishing it from other bugs",
        "ja": "簡潔だが要点を押さえ、問題内容と発生状況を示し、他のバグと区別できるようにする"
      },
      {
        "vi": "Dùng emoji thay cho mô tả để tiết kiệm thời gian",
        "en": "Use emojis instead of a description to save time",
        "ja": "時間節約のため説明の代わりに絵文字を使う"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tiêu đề tốt giúp người đọc (dev, PM) nắm nhanh vấn đề mà không cần mở chi tiết, đồng thời dễ tìm kiếm và tránh trùng lặp với các bug khác.",
      "en": "A good title lets readers grasp the issue quickly without opening details, and makes the ticket easy to search and distinguish from duplicates.",
      "ja": "良いタイトルは詳細を開かなくても問題をすぐ把握でき、検索もしやすく、他のバグとの重複も避けられます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi viết các bước tái hiện (steps to reproduce), nguyên tắc quan trọng nhất là gì?",
      "en": "When writing steps to reproduce, what is the most important principle?",
      "ja": "再現手順（steps to reproduce）を書く際、最も重要な原則は何ですか。"
    },
    "options": [
      {
        "vi": "Viết thật dài để chứng minh đã test kỹ",
        "en": "Write them as long as possible to prove thorough testing",
        "ja": "入念にテストしたことを示すためできるだけ長く書く"
      },
      {
        "vi": "Chỉ cần ghi bước cuối cùng dẫn đến lỗi",
        "en": "Only note the final step that triggers the bug",
        "ja": "バグにつながる最後の手順だけ書けばよい"
      },
      {
        "vi": "Không cần liệt kê bước, chỉ cần nói \"làm như bình thường sẽ ra lỗi\"",
        "en": "No need to list steps, just say \"do it normally and the bug appears\"",
        "ja": "手順を書かず「普通に操作すればバグが出る」とだけ書く"
      },
      {
        "vi": "Ghi từng bước ngắn gọn, tuần tự, cụ thể để bất kỳ ai cũng thực hiện lại được đúng như tester đã làm",
        "en": "Write short, sequential, specific steps so anyone can repeat exactly what the tester did",
        "ja": "誰でもテスターが行った操作を正確に再現できるよう、簡潔で順序立った具体的な手順にする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các bước tái hiện phải rõ ràng, cụ thể, tuần tự để người khác (dev, tester khác) thực hiện lại chính xác và xác nhận được lỗi.",
      "en": "Reproduction steps must be clear, specific, and sequential so others (developers, other testers) can replicate them precisely and confirm the bug.",
      "ja": "再現手順は明確・具体的・順序立てて記載し、他の人（開発者や他のテスター）が正確に再現してバグを確認できるようにする必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi gặp lỗi không ổn định (chỉ xảy ra thỉnh thoảng, khó tái hiện 100%), tester nên xử lý bug report thế nào?",
      "en": "When encountering a flaky bug that only occurs occasionally and can't be reproduced 100% of the time, how should a tester handle the report?",
      "ja": "時々しか発生せず100%再現できない不安定なバグに遭遇した場合、テスターはレポートをどう扱うべきですか。"
    },
    "options": [
      {
        "vi": "Ghi rõ tần suất xảy ra (ví dụ 3/10 lần), điều kiện đã thử, log/video nếu có, thay vì bỏ qua",
        "en": "Note the occurrence frequency (e.g. 3 out of 10 attempts), the conditions tried, and attach logs/video if available, rather than skipping it",
        "ja": "報告を省略せず、発生頻度（例：10回中3回）や試した条件、可能ならログや動画を記載する"
      },
      {
        "vi": "Không report vì không tái hiện được luôn",
        "en": "Don't report it since it can't always be reproduced",
        "ja": "常に再現できないので報告しない"
      },
      {
        "vi": "Ghi severity là Blocker bất kể mức độ ảnh hưởng",
        "en": "Mark severity as Blocker regardless of actual impact",
        "ja": "実際の影響度に関係なく重大度をBlockerにする"
      },
      {
        "vi": "Chờ đến khi tái hiện được 100% mới report",
        "en": "Wait until it can be reproduced 100% of the time before reporting",
        "ja": "100%再現できるようになるまで報告を待つ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Lỗi khó tái hiện vẫn cần được ghi nhận đầy đủ nhất có thể: tần suất, điều kiện, bằng chứng thu thập được, giúp dev có manh mối điều tra thay vì bỏ sót lỗi thật.",
      "en": "Hard-to-reproduce bugs still need to be documented as thoroughly as possible: frequency, conditions, and available evidence, giving developers leads to investigate instead of missing a real defect.",
      "ja": "再現しにくいバグでも、頻度・条件・入手できた証拠をできる限り記録し、開発者が調査できる手がかりを残すことで、実際の不具合を見逃さないようにします。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong bug report, mục \"Expected Result\" và \"Actual Result\" có vai trò gì?",
      "en": "In a bug report, what role do the \"Expected Result\" and \"Actual Result\" sections play?",
      "ja": "バグレポートにおける「期待結果」と「実際の結果」はどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Chỉ mang tính hình thức, không ảnh hưởng đến việc dev sửa lỗi",
        "en": "They are just formalities that don't affect how developers fix the bug",
        "ja": "形式的なもので、開発者の修正には影響しない"
      },
      {
        "vi": "Làm rõ khoảng cách giữa hành vi hệ thống nên có (theo yêu cầu) và hành vi thực tế quan sát được, giúp xác định đây có đúng là lỗi hay không",
        "en": "They clarify the gap between the behavior the system should have (per requirements) and the behavior actually observed, helping determine whether it truly is a defect",
        "ja": "仕様上あるべき挙動と実際に観察された挙動とのギャップを明確にし、それが本当に不具合かどうかを判断する助けとなる"
      },
      {
        "vi": "Chỉ cần ghi một trong hai mục là đủ",
        "en": "Only one of the two sections needs to be filled in",
        "ja": "どちらか一方だけ記入すればよい"
      },
      {
        "vi": "Dùng để thay thế cho các bước tái hiện",
        "en": "They replace the need for reproduction steps",
        "ja": "再現手順の代わりになる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "So sánh rõ ràng giữa kết quả mong đợi (theo spec/yêu cầu) và kết quả thực tế là cơ sở khách quan để khẳng định có sai lệch, tránh tranh cãi \"có phải bug không\".",
      "en": "A clear comparison between expected (per spec/requirements) and actual results is the objective basis to confirm a deviation, avoiding disputes over whether something is really a bug.",
      "ja": "仕様・要件に基づく期待結果と実際の結果を明確に比較することで、逸脱があることを客観的に示し、「本当にバグか」という議論を避けられます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi nào tester nên đính kèm screenshot/video/log vào bug report?",
      "en": "When should a tester attach a screenshot, video, or log to a bug report?",
      "ja": "テスターはどのようなときにスクリーンショットや動画、ログをバグレポートに添付すべきですか。"
    },
    "options": [
      {
        "vi": "Không bao giờ cần, vì mô tả bằng chữ luôn đủ",
        "en": "Never needed, since a text description is always enough",
        "ja": "文章の説明で常に十分なので不要"
      },
      {
        "vi": "Chỉ khi bug ảnh hưởng đến giao diện",
        "en": "Only when the bug affects the UI",
        "ja": "UIに影響するバグのときだけ"
      },
      {
        "vi": "Khi hình ảnh/video/log giúp minh chứng lỗi rõ ràng hơn chữ viết, đặc biệt với lỗi UI, lỗi khó mô tả bằng lời hoặc lỗi liên quan log hệ thống",
        "en": "When images/video/logs illustrate the bug more clearly than words alone, especially for UI issues, hard-to-describe bugs, or issues tied to system logs",
        "ja": "画像・動画・ログが文章より明確に不具合を示せる場合、特にUIの不具合や言葉で説明しにくいバグ、システムログに関連する問題のとき"
      },
      {
        "vi": "Chỉ khi dev yêu cầu, tester không cần chủ động đính kèm",
        "en": "Only when developers request it; testers shouldn't attach proactively",
        "ja": "開発者から要求されたときだけで、テスターが自発的に添付する必要はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bằng chứng trực quan giúp giảm hiểu nhầm, tăng tốc độ xác nhận và khắc phục lỗi, đặc biệt hữu ích với lỗi giao diện hoặc lỗi cần xem log kỹ thuật.",
      "en": "Visual evidence reduces misunderstanding and speeds up confirmation and fixing, especially useful for UI bugs or issues requiring technical logs.",
      "ja": "視覚的な証拠は誤解を減らし、確認や修正のスピードを上げます。特にUIの不具合や技術的なログの確認が必要な問題で有効です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao thông tin \"Test Environment\" (hệ điều hành, trình duyệt, phiên bản build...) lại quan trọng trong bug report?",
      "en": "Why is \"Test Environment\" information (OS, browser, build version, etc.) important in a bug report?",
      "ja": "バグレポートにおいて「テスト環境」（OS、ブラウザ、ビルドバージョンなど）の情報がなぜ重要なのですか。"
    },
    "options": [
      {
        "vi": "Không quan trọng, lỗi ở đâu cũng giống nhau",
        "en": "Not important, a bug behaves the same everywhere",
        "ja": "重要ではなく、バグはどこでも同じように発生する"
      },
      {
        "vi": "Chỉ để làm đẹp report, không có giá trị kỹ thuật",
        "en": "Just for making the report look nice, no technical value",
        "ja": "レポートを見栄え良くするだけで技術的価値はない"
      },
      {
        "vi": "Chỉ cần thiết với bug về bảo mật",
        "en": "Only necessary for security bugs",
        "ja": "セキュリティに関するバグにのみ必要"
      },
      {
        "vi": "Giúp dev xác định lỗi có phụ thuộc vào môi trường cụ thể hay không, tránh mất thời gian tìm sai chỗ",
        "en": "It helps developers determine whether the bug is environment-specific, avoiding wasted time investigating the wrong place",
        "ja": "バグが特定の環境に依存するかどうかを開発者が判断でき、見当違いの調査で時間を無駄にするのを防ぐ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhiều lỗi chỉ xuất hiện trên trình duyệt/hệ điều hành/phiên bản build cụ thể, nên ghi rõ môi trường giúp dev tái hiện đúng và không tốn công điều tra sai hướng.",
      "en": "Many bugs only appear on a specific browser/OS/build, so documenting the environment helps developers reproduce them correctly and avoid investigating the wrong lead.",
      "ja": "多くのバグは特定のブラウザ・OS・ビルドでのみ発生するため、環境を明記することで開発者が正しく再現でき、見当違いの調査を避けられます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mức độ Severity trong bug report chủ yếu phản ánh điều gì?",
      "en": "What does the Severity level in a bug report primarily reflect?",
      "ja": "バグレポートの重大度（Severity）は主に何を反映していますか。"
    },
    "options": [
      {
        "vi": "Mức độ ảnh hưởng kỹ thuật của lỗi đến chức năng/hệ thống, bất kể thời điểm xử lý",
        "en": "The technical impact of the bug on the function/system, regardless of when it gets fixed",
        "ja": "修正のタイミングに関わらず、機能やシステムへの技術的な影響度"
      },
      {
        "vi": "Mức độ khẩn cấp mà team cần xử lý lỗi ngay",
        "en": "How urgently the team needs to fix the bug right away",
        "ja": "チームが今すぐ修正すべき緊急度"
      },
      {
        "vi": "Số lượng người dùng đã report lỗi này",
        "en": "The number of users who reported the bug",
        "ja": "このバグを報告したユーザーの数"
      },
      {
        "vi": "Thời gian dev cần để sửa lỗi",
        "en": "How much time developers need to fix the bug",
        "ja": "開発者が修正に要する時間"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Severity thể hiện mức độ nghiêm trọng/tác động của lỗi lên hệ thống (ví dụ crash toàn bộ ứng dụng vs lỗi hiển thị nhỏ), độc lập với việc bug đó có cần fix gấp hay không.",
      "en": "Severity reflects how serious or impactful the bug is on the system (e.g. app crash vs. a minor display glitch), independent of how urgently it needs fixing.",
      "ja": "重大度は、バグがシステムに与える深刻さ・影響度（例：アプリ全体のクラッチ vs 小さな表示崩れ）を表し、修正の緊急性とは独立しています。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mức độ Priority trong bug report chủ yếu phản ánh điều gì?",
      "en": "What does the Priority level in a bug report primarily reflect?",
      "ja": "バグレポートの優先度（Priority）は主に何を反映していますか。"
    },
    "options": [
      {
        "vi": "Mức độ nghiêm trọng kỹ thuật của lỗi",
        "en": "The technical severity of the bug",
        "ja": "バグの技術的な深刻さ"
      },
      {
        "vi": "Thứ tự/mức độ khẩn cấp mà team nên xử lý lỗi này so với các lỗi khác, dựa trên yếu tố nghiệp vụ, thời điểm release",
        "en": "The order/urgency with which the team should address this bug relative to others, based on business factors and release timing",
        "ja": "リリース時期やビジネス上の要因に基づき、他のバグと比べてどれくらい急いで対応すべきかという順序・緊急度"
      },
      {
        "vi": "Số dòng code cần sửa",
        "en": "The number of lines of code that need to change",
        "ja": "修正が必要なコード行数"
      },
      {
        "vi": "Tên module chứa lỗi",
        "en": "The name of the module containing the bug",
        "ja": "バグが含まれるモジュール名"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Priority do PM/lead quyết định dựa trên yếu tố nghiệp vụ (ví dụ gần ngày demo, ảnh hưởng khách hàng lớn) để sắp xếp thứ tự xử lý, có thể khác với mức độ nghiêm trọng kỹ thuật.",
      "en": "Priority is set by the PM/lead based on business factors (e.g. close to a demo date, high customer impact) to order the work queue, and can differ from technical severity.",
      "ja": "優先度はPM・リーダーがビジネス要因（デモ直前、顧客への影響が大きいなど）に基づいて対応順序を決めるもので、技術的な重大度とは異なる場合があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ứng dụng bị crash hoàn toàn khi bấm nút thanh toán, nhưng chỉ xảy ra khi người dùng dùng một trình duyệt hiếm gặp và ít người dùng. Severity và Priority nên được đặt thế nào?",
      "en": "The app crashes completely when tapping the payment button, but only on a rarely-used browser with very few users. How should Severity and Priority be set?",
      "ja": "支払いボタンを押すとアプリが完全にクラッシュするが、ほとんど使われていない稀なブラウザでのみ発生する。重大度と優先度はどう設定すべきですか。"
    },
    "options": [
      {
        "vi": "Severity thấp, Priority thấp vì ít người gặp",
        "en": "Low Severity, Low Priority since few users are affected",
        "ja": "影響を受けるユーザーが少ないため重大度も優先度も低くする"
      },
      {
        "vi": "Severity thấp nhưng Priority cao vì cần fix ngay lập tức bất kể mức ảnh hưởng",
        "en": "Low Severity but High Priority since it must be fixed immediately regardless of impact scope",
        "ja": "重大度は低いが、影響範囲に関わらず即修正が必要なため優先度は高い"
      },
      {
        "vi": "Severity cao (crash hệ thống/chức năng thanh toán quan trọng) nhưng Priority có thể thấp hơn do phạm vi ảnh hưởng nhỏ",
        "en": "High Severity (a critical payment function crashes) but Priority can be lower given the small scope of impact",
        "ja": "重大度は高い（重要な決済機能がクラッシュする）が、影響範囲が小さいため優先度はそれより低くてよい"
      },
      {
        "vi": "Không cần ghi Severity/Priority vì lỗi hiếm gặp",
        "en": "No need to set Severity/Priority since the bug is rare",
        "ja": "稀なバグなので重大度・優先度は設定しなくてよい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Crash ở chức năng thanh toán là lỗi nghiêm trọng về mặt kỹ thuật (Severity cao), nhưng vì phạm vi người dùng bị ảnh hưởng rất nhỏ, team có thể xếp lịch xử lý sau các lỗi cấp bách hơn (Priority thấp hơn tương đối) — minh hoạ Severity và Priority là hai trục độc lập.",
      "en": "A crash in payment is technically severe (High Severity), but since very few users are affected, the team may schedule it after more urgent issues (relatively lower Priority) — illustrating Severity and Priority as independent axes.",
      "ja": "決済機能でのクラッシュは技術的に深刻（重大度は高い）ですが、影響を受けるユーザーが非常に少ないため、より緊急性の高い他の問題の後に対応することもあります（相対的に優先度は低め）。これは重大度と優先度が独立した軸であることを示しています。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trang chủ bị sai chính tả tên công ty ngay trước buổi demo quan trọng với khách hàng lớn. Severity và Priority nên được đặt thế nào?",
      "en": "There's a typo in the company name on the homepage right before an important demo with a major client. How should Severity and Priority be set?",
      "ja": "大口顧客への重要なデモ直前に、ホームページの会社名にスペルミスが見つかった。重大度と優先度はどう設定すべきですか。"
    },
    "options": [
      {
        "vi": "Severity cao, Priority cao vì đều nghiêm trọng như nhau",
        "en": "High Severity, High Priority since both are equally serious",
        "ja": "どちらも同等に重大なので重大度も優先度も高くする"
      },
      {
        "vi": "Severity cao nhưng Priority thấp, để dev xử lý sau",
        "en": "High Severity but Low Priority, to be handled later",
        "ja": "重大度は高いが優先度は低く、後で対応する"
      },
      {
        "vi": "Không cần report vì chỉ là lỗi chính tả",
        "en": "No need to report since it's just a typo",
        "ja": "単なる誤字なので報告不要"
      },
      {
        "vi": "Severity thấp (không ảnh hưởng chức năng hệ thống) nhưng Priority cao (cần sửa ngay trước khi khách hàng nhìn thấy)",
        "en": "Low Severity (doesn't affect system functionality) but High Priority (must fix before the client sees it)",
        "ja": "重大度は低い（システム機能に影響しない）が、優先度は高い（顧客に見られる前に修正が必要）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lỗi chính tả không ảnh hưởng đến chức năng nên Severity thấp, nhưng do yếu tố thời điểm (sắp demo với khách quan trọng), Priority được đẩy lên cao để xử lý gấp — ví dụ kinh điển cho thấy Severity thấp vẫn có thể đi kèm Priority cao.",
      "en": "A typo doesn't affect functionality, so Severity is low, but due to timing (an imminent demo with a key client), Priority is raised to fix it urgently — a classic example showing low Severity can still pair with high Priority.",
      "ja": "誤字は機能に影響しないため重大度は低いですが、タイミング（重要顧客へのデモ直前）という要因から優先度は高く設定され、急いで修正されます。これは低い重大度でも優先度が高くなり得る典型例です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tần suất xuất hiện của lỗi (Reproducibility/Frequency), ví dụ \"luôn xảy ra\", \"thỉnh thoảng\", \"hiếm khi\", nên được ghi ở đâu trong bug report và vì sao?",
      "en": "Where should bug frequency (Reproducibility), e.g. \"always\", \"sometimes\", \"rarely\", be recorded in a bug report, and why?",
      "ja": "バグの発生頻度（再現性）、例えば「常に発生」「時々発生」「まれに発生」は、バグレポートのどこに、なぜ記録すべきですか。"
    },
    "options": [
      {
        "vi": "Ghi thành một trường riêng (ví dụ Frequency) vì nó giúp dev ước lượng mức độ ưu tiên điều tra và biết cách thử lại nhiều lần nếu cần",
        "en": "As a dedicated field (e.g. Frequency), because it helps developers gauge investigation priority and know to retry multiple times if needed",
        "ja": "専用の項目（例：頻度）として記録する。開発者が調査の優先度を見積もったり、必要なら何度も再試行すべきと分かるため"
      },
      {
        "vi": "Không cần ghi, dev tự đoán qua mô tả",
        "en": "No need to record it; developers can infer it from the description",
        "ja": "記録不要で、開発者が説明から推測すればよい"
      },
      {
        "vi": "Chỉ ghi vào phần bình luận riêng tư, không hiển thị cho dev",
        "en": "Only in a private comment, not visible to developers",
        "ja": "開発者に見えない個人的なコメント欄にのみ記録する"
      },
      {
        "vi": "Ghi thay cho các bước tái hiện",
        "en": "In place of the reproduction steps",
        "ja": "再現手順の代わりに記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ghi rõ tần suất giúp phân biệt lỗi ổn định với lỗi ngẫu nhiên, hỗ trợ dev ưu tiên điều tra và tránh kết luận nhầm \"không tái hiện được\" chỉ vì thử một lần chưa trúng.",
      "en": "Recording frequency distinguishes stable bugs from intermittent ones, helping developers prioritize investigation and avoid wrongly concluding \"cannot reproduce\" after just one failed attempt.",
      "ja": "頻度を記録することで安定して発生するバグと不定期なバグを区別でき、開発者の調査優先度の判断を助け、一度試しただけで「再現不可」と誤って結論づけるのを防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một bug report bị đánh giá là \"mơ hồ, khó hiểu\" thường thiếu điều gì?",
      "en": "A bug report judged as \"vague and confusing\" typically lacks what?",
      "ja": "「曖昧で分かりにくい」と評価されるバグレポートには、通常何が欠けていますか。"
    },
    "options": [
      {
        "vi": "Thiếu emoji trang trí",
        "en": "Decorative emojis",
        "ja": "装飾的な絵文字"
      },
      {
        "vi": "Thiếu các bước cụ thể để tái hiện và dữ liệu/ngữ cảnh chính xác, chỉ mô tả chung chung như \"chức năng bị lỗi\"",
        "en": "Specific reproduction steps and precise data/context — it only gives a vague description like \"the feature is broken\"",
        "ja": "具体的な再現手順や正確なデータ・状況説明が欠け、「機能が壊れている」といった漠然とした記述しかない"
      },
      {
        "vi": "Thiếu chữ ký của tester",
        "en": "The tester's signature",
        "ja": "テスターの署名"
      },
      {
        "vi": "Thiếu số thứ tự bug trong hệ thống",
        "en": "A ticket number in the system",
        "ja": "システム内のチケット番号"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Report mơ hồ thường do thiếu bước tái hiện cụ thể, dữ liệu đầu vào chính xác, hoặc ngữ cảnh rõ ràng, khiến dev không biết bắt đầu điều tra từ đâu.",
      "en": "Vague reports usually lack concrete reproduction steps, precise input data, or clear context, leaving developers unsure where to start investigating.",
      "ja": "曖昧なレポートは、具体的な再現手順や正確な入力データ、明確な状況説明が欠けていることが多く、開発者はどこから調査を始めればよいか分かりません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Về mặt ngôn từ, một bug report chuyên nghiệp nên tránh điều gì?",
      "en": "In terms of tone, what should a professional bug report avoid?",
      "ja": "文体の観点から、プロフェッショナルなバグレポートは何を避けるべきですか。"
    },
    "options": [
      {
        "vi": "Tránh dùng ngôn ngữ khách quan, mô tả sự việc",
        "en": "Avoid objective, factual descriptions of what happened",
        "ja": "客観的で事実に基づいた記述を避ける"
      },
      {
        "vi": "Tránh ghi tên chức năng bị lỗi",
        "en": "Avoid naming the affected feature",
        "ja": "不具合のある機能名を書くのを避ける"
      },
      {
        "vi": "Tránh ngôn ngữ cảm tính, chỉ trích cá nhân (ví dụ \"code ẩu\", \"làm sai hết\"), thay vào đó tập trung mô tả sự việc khách quan",
        "en": "Avoid emotional or personally critical language (e.g. \"sloppy code\", \"everything is wrong\") and instead focus on objective description of the facts",
        "ja": "感情的な言葉や個人攻撃（例：「雑なコード」「全部間違っている」）を避け、事実に基づく客観的な記述に徹する"
      },
      {
        "vi": "Tránh ghi ngày giờ phát hiện lỗi",
        "en": "Avoid recording the date/time the bug was found",
        "ja": "バグ発見の日時を記録するのを避ける"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bug report nên tập trung vào sự kiện khách quan (điều gì xảy ra, khi nào, như thế nào), tránh ngôn từ cảm tính hoặc đổ lỗi cá nhân để giữ tinh thần hợp tác giữa các thành viên team.",
      "en": "Bug reports should focus on objective facts (what happened, when, how), avoiding emotional or blaming language to keep collaboration constructive among team members.",
      "ja": "バグレポートは客観的な事実（何が、いつ、どのように起きたか）に焦点を当て、感情的な言葉や個人への非難を避けることで、チーム内の協力関係を良好に保ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Nguyên tắc \"one bug per report\" (một report chỉ nên chứa một lỗi) mang lại lợi ích gì?",
      "en": "What benefit does the \"one bug per report\" principle provide?",
      "ja": "「1レポートにつき1つのバグ」という原則にはどのような利点がありますか。"
    },
    "options": [
      {
        "vi": "Giúp tester report được nhiều bug hơn để tính KPI",
        "en": "Lets testers log more bugs to boost their KPI count",
        "ja": "KPIのためにテスターがより多くのバグを報告できるようにする"
      },
      {
        "vi": "Giúp giảm số lượng report cần viết",
        "en": "Reduces the total number of reports that need to be written",
        "ja": "書く必要のあるレポート数を減らせる"
      },
      {
        "vi": "Không có lợi ích gì, chỉ là quy ước hình thức",
        "en": "No real benefit, it's just a formal convention",
        "ja": "実質的な利点はなく、単なる形式的な慣習に過ぎない"
      },
      {
        "vi": "Giúp mỗi bug được theo dõi, gán người xử lý, xác định trạng thái (fixed/reopen) độc lập, tránh nhầm lẫn khi một lỗi đã sửa nhưng lỗi khác trong cùng ticket vẫn còn",
        "en": "Each bug can be tracked, assigned, and have its status (fixed/reopened) managed independently, avoiding confusion when one issue is fixed but another in the same ticket remains",
        "ja": "各バグを独立して追跡・担当割り当て・ステータス（修正済み/再オープン）管理でき、同一チケット内の一部だけ修正されて残りが未解決というような混乱を避けられる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Gộp nhiều lỗi vào một report gây khó khăn khi theo dõi tiến độ sửa từng lỗi riêng lẻ; tách riêng giúp quản lý trạng thái và trách nhiệm rõ ràng hơn.",
      "en": "Bundling multiple bugs into one report makes it hard to track the fix progress of each individually; separating them keeps status and ownership clear.",
      "ja": "複数のバグを1つのレポートにまとめると、それぞれの修正進捗を個別に追跡しにくくなります。分けて報告することでステータスと担当がより明確になります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao cần ghi rõ số phiên bản build/version của ứng dụng khi report lỗi?",
      "en": "Why is it important to record the exact build/version number of the application when reporting a bug?",
      "ja": "バグを報告する際、アプリケーションの正確なビルド・バージョン番号を記録することがなぜ重要ですか。"
    },
    "options": [
      {
        "vi": "Giúp xác định chính xác lỗi xuất hiện từ bản nào, hỗ trợ dev khoanh vùng thay đổi code gây ra lỗi và kiểm tra xem lỗi đã được fix ở bản sau chưa",
        "en": "It helps pinpoint exactly which build introduced the bug, aids developers in narrowing down the code change that caused it, and confirms whether later builds have fixed it",
        "ja": "バグがどのビルドから発生したかを正確に特定でき、開発者が原因となったコード変更を絞り込んだり、後続ビルドで修正されたか確認したりする助けになる"
      },
      {
        "vi": "Không cần thiết vì mọi bản build đều giống nhau",
        "en": "Not necessary since every build behaves the same",
        "ja": "どのビルドも同じなので不要"
      },
      {
        "vi": "Chỉ để thống kê số lượng bug theo tháng",
        "en": "Only useful for monthly bug-count statistics",
        "ja": "月ごとのバグ件数統計のためだけに使う"
      },
      {
        "vi": "Chỉ cần thiết với ứng dụng mobile, không cần với web",
        "en": "Only necessary for mobile apps, not web apps",
        "ja": "モバイルアプリにのみ必要で、Webアプリには不要"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Version/build number giúp dev tra lại lịch sử commit/thay đổi liên quan để tìm nguyên nhân, và giúp xác nhận regression hay lỗi đã tồn tại từ trước.",
      "en": "The build/version number lets developers trace related commits/changes to find the root cause, and helps confirm whether it's a regression or a pre-existing bug.",
      "ja": "ビルド・バージョン番号があれば、開発者は関連するコミットや変更履歴を遡って原因を調査でき、リグレッションなのか以前から存在したバグなのかを確認する助けにもなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao cần ghi rõ bug được phát hiện trên môi trường nào (Dev, Staging, hay Production)?",
      "en": "Why is it important to specify which environment (Dev, Staging, or Production) a bug was found on?",
      "ja": "バグがどの環境（Dev、Staging、Productionのいずれか）で発見されたかを明記する必要があるのはなぜですか。"
    },
    "options": [
      {
        "vi": "Không quan trọng vì code ở mọi môi trường luôn giống hệt nhau",
        "en": "Not important since code is always identical across environments",
        "ja": "どの環境でもコードは常に同一なので重要ではない"
      },
      {
        "vi": "Vì cấu hình, dữ liệu, phiên bản giữa các môi trường có thể khác nhau; ghi rõ giúp tránh nhầm lẫn mức độ ảnh hưởng thực tế (ví dụ lỗi trên Production nghiêm trọng hơn trên Dev) và tránh test nhầm môi trường",
        "en": "Because configuration, data, and versions can differ across environments; specifying it prevents confusion about real-world impact (e.g. a Production bug is more critical than the same bug on Dev) and avoids testing the wrong environment",
        "ja": "環境ごとに設定・データ・バージョンが異なる場合があるため、実際の影響度の混同（例：本番環境のバグは開発環境より深刻）を避け、誤った環境でのテストを防ぐため"
      },
      {
        "vi": "Chỉ cần thiết khi lỗi liên quan đến bảo mật",
        "en": "Only necessary for security-related bugs",
        "ja": "セキュリティに関するバグのときだけ必要"
      },
      {
        "vi": "Chỉ để phân loại report cho gọn gàng, không có tác dụng kỹ thuật",
        "en": "Just for tidy categorization, with no technical purpose",
        "ja": "整理のためだけで技術的な意味はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mỗi môi trường có thể có dữ liệu, cấu hình, hoặc phiên bản khác nhau nên cùng một chức năng có thể hoạt động khác biệt; ghi rõ môi trường giúp đánh giá đúng mức độ nghiêm trọng và tránh dev sửa nhầm chỗ.",
      "en": "Each environment may have different data, config, or versions, so the same feature can behave differently; specifying the environment ensures correct severity assessment and prevents developers from fixing the wrong place.",
      "ja": "各環境ではデータ・設定・バージョンが異なることがあり、同じ機能でも挙動が変わる可能性があります。環境を明記することで重大度を正しく評価し、開発者が誤った箇所を修正するのを防げます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi dev đánh dấu bug là \"Cannot Reproduce\" (không tái hiện được) và trả lại, tester nên làm gì tiếp theo?",
      "en": "When a developer marks a bug as \"Cannot Reproduce\" and sends it back, what should the tester do next?",
      "ja": "開発者がバグを「再現不可」として差し戻した場合、テスターは次に何をすべきですか。"
    },
    "options": [
      {
        "vi": "Đóng bug ngay lập tức mà không kiểm tra lại",
        "en": "Close the bug immediately without rechecking",
        "ja": "再確認せずすぐにバグをクローズする"
      },
      {
        "vi": "Bỏ qua, chuyển sang report bug khác",
        "en": "Ignore it and move on to reporting other bugs",
        "ja": "無視して別のバグの報告に移る"
      },
      {
        "vi": "Tái kiểm tra lại theo đúng các bước đã ghi, bổ sung thêm chi tiết còn thiếu (môi trường, dữ liệu, video) rồi thử tái hiện lại trước khi phản hồi dev",
        "en": "Re-verify by following the documented steps exactly, add any missing details (environment, data, video), and attempt to reproduce it again before responding to the developer",
        "ja": "記録した手順どおりに再確認し、不足していた詳細（環境、データ、動画）を補足したうえで再度再現を試み、その結果を開発者にフィードバックする"
      },
      {
        "vi": "Tự động nâng Severity lên mức cao nhất để ép dev sửa",
        "en": "Automatically raise Severity to the highest level to force the developer to fix it",
        "ja": "開発者に修正を強制するため重大度を自動的に最高レベルに引き上げる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trước khi phản hồi, tester nên tái kiểm chứng theo đúng report, bổ sung thông tin còn thiếu (như môi trường cụ thể, dữ liệu, video) để cung cấp bằng chứng thuyết phục hơn cho dev điều tra lại.",
      "en": "Before responding, the tester should re-verify following the exact report steps and add missing information (specific environment, data, video) to give the developer more convincing evidence to investigate again.",
      "ja": "返信する前に、テスターはレポート通りに再検証し、不足している情報（具体的な環境、データ、動画など）を補足することで、開発者が再調査するための説得力のある証拠を提供すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao khi report lỗi liên quan đến dữ liệu nhập vào (input), tester cần ghi chính xác giá trị dữ liệu đã dùng thay vì chỉ mô tả chung chung?",
      "en": "When reporting a data-input-related bug, why must the tester record the exact input values used instead of a general description?",
      "ja": "入力データに関するバグを報告する際、テスターが一般的な説明ではなく正確な入力値を記録すべきなのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì dữ liệu cụ thể không quan trọng, dev có thể tự nghĩ ra dữ liệu tương tự để test",
        "en": "Because specific data doesn't matter; developers can invent similar data themselves",
        "ja": "具体的なデータは重要でなく、開発者が似たようなデータを考えて試せばよいから"
      },
      {
        "vi": "Vì dữ liệu cụ thể giúp tăng độ dài report cho chuyên nghiệp",
        "en": "Because specific data makes the report look longer and more professional",
        "ja": "具体的なデータがレポートを長くして専門的に見せるから"
      },
      {
        "vi": "Vì quy định pháp lý bắt buộc phải lưu dữ liệu test",
        "en": "Because legal regulations require storing test data",
        "ja": "法的規制でテストデータの保存が義務付けられているから"
      },
      {
        "vi": "Vì nhiều lỗi chỉ xảy ra với giá trị dữ liệu cụ thể (ví dụ ký tự đặc biệt, số âm, chuỗi dài), ghi chung chung như \"nhập số\" có thể khiến dev không tái hiện được",
        "en": "Because many bugs only occur with specific data values (e.g. special characters, negative numbers, long strings) — a vague description like \"entered a number\" may prevent the developer from reproducing it",
        "ja": "多くのバグは特殊文字、負の数、長い文字列など特定のデータ値でのみ発生するため、「数値を入力」のような曖昧な記述では開発者が再現できない可能性があるから"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nhiều lỗi (đặc biệt là validation, boundary) chỉ xảy ra với giá trị input cụ thể; nếu không ghi rõ, dev thử với dữ liệu khác có thể không thấy lỗi và kết luận sai là \"không tái hiện được\".",
      "en": "Many bugs (especially validation or boundary issues) only trigger with specific input values; without exact data, developers may test with different values, fail to see the bug, and wrongly conclude it's \"not reproducible\".",
      "ja": "多くのバグ（特にバリデーションや境界値に関するもの）は特定の入力値でのみ発生します。正確なデータを記録しないと、開発者が別の値で試してバグが再現されず、誤って「再現不可」と結論づけてしまう可能性があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "So với report \"Trang login bị lỗi\", report \"Đăng nhập với email hợp lệ và mật khẩu đúng, hệ thống hiển thị lỗi 500 thay vì chuyển đến trang chủ\" tốt hơn ở điểm nào?",
      "en": "Compared to a report saying \"Login page is broken\", why is \"Logging in with a valid email and correct password shows a 500 error instead of redirecting to the home page\" a better report?",
      "ja": "「ログインページにバグがある」というレポートに比べ、「有効なメールと正しいパスワードでログインするとホーム画面に遷移せず500エラーが表示される」というレポートが優れているのはなぜですか。"
    },
    "options": [
      {
        "vi": "Report thứ hai cụ thể hoá điều kiện đầu vào, hành vi thực tế và mã lỗi, giúp dev khoanh vùng nguyên nhân nhanh hơn nhiều so với mô tả mơ hồ",
        "en": "The second report specifies the exact input condition, actual behavior, and error code, helping developers narrow down the cause much faster than a vague description",
        "ja": "2つ目のレポートは入力条件、実際の挙動、エラーコードを具体的に示しており、曖昧な説明よりもはるかに速く原因の絞り込みができる"
      },
      {
        "vi": "Không có sự khác biệt, cả hai đều truyền đạt như nhau",
        "en": "There's no difference; both convey the same information",
        "ja": "違いはなく、どちらも同じ情報を伝えている"
      },
      {
        "vi": "Report thứ hai dài hơn nên chuyên nghiệp hơn, không liên quan đến nội dung",
        "en": "The second report is longer, which alone makes it more professional, regardless of content",
        "ja": "2つ目のレポートは長いので内容に関係なく専門的に見える"
      },
      {
        "vi": "Report đầu tiên tốt hơn vì ngắn gọn, tiết kiệm thời gian đọc",
        "en": "The first report is actually better because it's short and saves reading time",
        "ja": "1つ目のレポートの方が短くて読む時間を節約できるので優れている"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Report tốt cung cấp đủ ngữ cảnh (điều kiện đầu vào, hành vi quan sát, mã lỗi cụ thể) để dev không phải hỏi lại hoặc đoán mò, trong khi \"bị lỗi\" chung chung không giúp ích gì cho việc điều tra.",
      "en": "A good report provides enough context (input conditions, observed behavior, specific error code) that developers don't need to ask follow-up questions or guess, whereas a vague \"is broken\" offers no investigative value.",
      "ja": "良いレポートは十分な文脈（入力条件、観察された挙動、具体的なエラーコード）を提供し、開発者が聞き返したり推測したりする必要をなくします。一方「バグがある」という曖昧な記述は調査の役に立ちません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi bug report cần tham chiếu đến một ticket/bug liên quan khác (ví dụ bug này là hệ quả của bug kia), tester nên làm gì?",
      "en": "When a bug report needs to reference another related ticket/bug (e.g. this bug is caused by another one), what should the tester do?",
      "ja": "バグレポートが他の関連チケット・バグ（例：このバグは別のバグの結果である）を参照する必要がある場合、テスターは何をすべきですか。"
    },
    "options": [
      {
        "vi": "Copy toàn bộ nội dung của bug kia dán vào report mới",
        "en": "Copy the entire content of the other bug and paste it into the new report",
        "ja": "他のバグの内容全体をコピーして新しいレポートに貼り付ける"
      },
      {
        "vi": "Ghi liên kết/ID của ticket liên quan để người đọc dễ dàng tra cứu ngữ cảnh, tránh trùng lặp thông tin và giúp truy vết mối quan hệ giữa các lỗi",
        "en": "Include the link/ID of the related ticket so readers can easily trace the context, avoid duplicating information, and understand the relationship between bugs",
        "ja": "関連チケットのリンク・IDを記載し、読者が背景を簡単に追跡でき、情報の重複を避け、バグ間の関連性を把握しやすくする"
      },
      {
        "vi": "Không cần liên kết gì, để hai bug hoàn toàn độc lập",
        "en": "No linking needed; keep the two bugs completely independent",
        "ja": "リンクは不要で、2つのバグを完全に独立させておく"
      },
      {
        "vi": "Xoá bug cũ và chỉ giữ lại bug mới",
        "en": "Delete the old bug and keep only the new one",
        "ja": "古いバグを削除し、新しいバグだけを残す"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Liên kết ticket giúp mọi người theo dõi được mối quan hệ nhân quả giữa các lỗi, tránh phải viết lại thông tin đã có và hỗ trợ quản lý dependency khi lên kế hoạch fix.",
      "en": "Linking tickets lets everyone trace the causal relationship between bugs, avoids rewriting existing information, and supports dependency management when planning fixes.",
      "ja": "チケットをリンクすることで、バグ間の因果関係を誰もが追跡でき、既存情報の再記述を避け、修正計画を立てる際の依存関係管理にも役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi report một lỗi giao diện (UI bug, ví dụ layout bị vỡ), thông tin đặc thù nào nên bổ sung so với bug thông thường?",
      "en": "When reporting a UI bug (e.g. broken layout), what extra information should be added compared to a typical bug report?",
      "ja": "UIバグ（レイアウト崩れなど）を報告する際、通常のバグレポートに加えてどのような特有の情報を追加すべきですか。"
    },
    "options": [
      {
        "vi": "Không cần thêm gì, mọi UI bug đều giống bug chức năng",
        "en": "Nothing extra; UI bugs are the same as functional bugs",
        "ja": "追加は不要で、UIバグも機能バグと全く同じ"
      },
      {
        "vi": "Chỉ cần ghi tên tester đã phát hiện",
        "en": "Just the name of the tester who found it",
        "ja": "発見したテスターの名前だけ"
      },
      {
        "vi": "Độ phân giải màn hình, trình duyệt/thiết bị, tỉ lệ zoom vì lỗi UI thường phụ thuộc mạnh vào các yếu tố hiển thị này",
        "en": "Screen resolution, browser/device, and zoom level, since UI bugs are often strongly dependent on these display factors",
        "ja": "画面解像度、ブラウザ・デバイス、ズーム倍率。UIバグはこれらの表示条件に強く依存することが多いため"
      },
      {
        "vi": "Chỉ cần ghi thời gian phát hiện, không cần gì khác",
        "en": "Just the time it was found, nothing else",
        "ja": "発見時刻だけで他は不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Lỗi giao diện thường chỉ xuất hiện ở độ phân giải, trình duyệt, hoặc mức zoom cụ thể, nên các thông tin này giúp dev tái hiện đúng và xác định nguyên nhân (ví dụ CSS responsive).",
      "en": "UI bugs often only appear at specific resolutions, browsers, or zoom levels, so this information helps developers reproduce them correctly and pinpoint the cause (e.g. responsive CSS issues).",
      "ja": "UIバグは特定の解像度、ブラウザ、ズーム倍率でのみ発生することが多いため、これらの情報は開発者が正しく再現し、原因（例：レスポンシブCSSの問題）を特定するのに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi report lỗi trên ứng dụng di động (mobile app), thông tin nào là đặc biệt quan trọng cần ghi thêm?",
      "en": "When reporting a bug on a mobile app, what information is especially important to include?",
      "ja": "モバイルアプリのバグを報告する際、特に重要な追加情報は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần tên ứng dụng, không cần gì thêm",
        "en": "Just the app name, nothing more",
        "ja": "アプリ名だけで他は不要"
      },
      {
        "vi": "Không cần ghi gì khác ngoài mô tả lỗi bằng lời",
        "en": "Nothing beyond a verbal description of the bug",
        "ja": "バグの言葉による説明以外は不要"
      },
      {
        "vi": "Chỉ cần ghi màu sắc giao diện của app",
        "en": "Just the app's UI color scheme",
        "ja": "アプリのUIカラーだけ"
      },
      {
        "vi": "Dòng thiết bị (model), phiên bản hệ điều hành (iOS/Android), và phiên bản app, vì hành vi có thể khác nhau giữa các thiết bị/OS",
        "en": "Device model, OS version (iOS/Android), and app version, since behavior can vary across devices and OS versions",
        "ja": "デバイス機種、OSバージョン（iOS/Android）、アプリバージョン。デバイスやOSバージョンによって挙動が異なる場合があるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lỗi trên mobile thường phụ thuộc vào thiết bị cụ thể, phiên bản OS, hoặc phiên bản app (do phân mảnh thiết bị/OS), nên các thông tin này là chìa khoá để tái hiện chính xác.",
      "en": "Mobile bugs often depend on the specific device, OS version, or app version due to device/OS fragmentation, so this information is key to accurate reproduction.",
      "ja": "モバイルのバグは、デバイスやOSの断片化により特定の機種、OSバージョン、アプリバージョンに依存することが多いため、これらの情報は正確な再現の鍵となります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong quy trình thực tế, ai thường là người quyết định mức Priority cuối cùng của một bug?",
      "en": "In real-world practice, who typically makes the final decision on a bug's Priority level?",
      "ja": "実際の業務プロセスでは、通常誰がバグの優先度を最終決定しますか。"
    },
    "options": [
      {
        "vi": "Tester đề xuất mức ban đầu dựa trên quan sát, nhưng PM/Product Owner/lead team thường là người xác nhận hoặc điều chỉnh Priority cuối cùng dựa trên bối cảnh dự án",
        "en": "The tester proposes an initial level based on observation, but the PM/Product Owner/team lead usually confirms or adjusts the final Priority based on project context",
        "ja": "テスターは観察に基づいて初期案を提示するが、最終的な優先度の確認や調整は通常PM・プロダクトオーナー・チームリーダーがプロジェクトの状況を踏まえて行う"
      },
      {
        "vi": "Tester luôn tự quyết định một mình và không ai được thay đổi",
        "en": "The tester always decides alone and no one else can change it",
        "ja": "テスターが常に一人で決定し、誰も変更できない"
      },
      {
        "vi": "Chỉ có khách hàng mới được quyết định Priority",
        "en": "Only the client can decide Priority",
        "ja": "優先度はクライアントのみが決定できる"
      },
      {
        "vi": "Priority được hệ thống tự động tính toán, không ai can thiệp",
        "en": "Priority is automatically calculated by the system with no human input",
        "ja": "優先度はシステムが自動計算し、誰も関与しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tester là người quan sát và đề xuất mức Priority hợp lý dựa trên mức độ ảnh hưởng, nhưng quyết định cuối cùng thường thuộc về PM/Product Owner vì họ nắm rõ ưu tiên nghiệp vụ và lịch release tổng thể.",
      "en": "The tester observes and proposes a reasonable Priority based on impact, but the final call usually belongs to the PM/Product Owner since they understand overall business priorities and release schedules.",
      "ja": "テスターは影響度に基づいて妥当な優先度を提案しますが、最終決定は通常PM・プロダクトオーナーが行います。彼らは全体のビジネス優先事項やリリーススケジュールを把握しているためです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Lợi ích lớn nhất của việc viết bug report chất lượng cao đối với hiệu suất làm việc của cả team là gì?",
      "en": "What is the biggest benefit of writing high-quality bug reports for the team's overall efficiency?",
      "ja": "質の高いバグレポートを書くことがチーム全体の作業効率にもたらす最大の利点は何ですか。"
    },
    "options": [
      {
        "vi": "Giúp tester được khen thưởng nhiều hơn, không liên quan đến team",
        "en": "It gets the tester more praise, unrelated to the team",
        "ja": "テスターがより多く褒められるだけで、チームには関係ない"
      },
      {
        "vi": "Giảm thời gian trao đổi qua lại giữa tester và dev để làm rõ thông tin, giúp lỗi được xác nhận và sửa nhanh hơn, tiết kiệm thời gian cho cả team",
        "en": "It reduces back-and-forth clarification between tester and developer, allowing bugs to be confirmed and fixed faster, saving time for the whole team",
        "ja": "テスターと開発者間の確認のやり取りが減り、バグの確認・修正が速くなり、チーム全体の時間を節約できる"
      },
      {
        "vi": "Không có lợi ích rõ ràng nào, chỉ tốn thời gian viết thêm",
        "en": "No clear benefit, it just wastes time writing more",
        "ja": "明確な利点はなく、余計な時間を使うだけ"
      },
      {
        "vi": "Chỉ giúp report trông đẹp hơn khi trình bày cho khách hàng",
        "en": "It only makes the report look nicer when presented to clients",
        "ja": "クライアントへの提示時にレポートが見栄え良くなるだけ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Report rõ ràng, đầy đủ giúp dev hiểu và tái hiện lỗi ngay từ lần đọc đầu tiên, giảm số vòng hỏi đáp, rút ngắn thời gian từ phát hiện lỗi đến khi lỗi được khắc phục.",
      "en": "A clear, complete report lets developers understand and reproduce the bug on the first read, cutting down clarification rounds and shortening the time from discovery to fix.",
      "ja": "明確で十分な情報を含むレポートは、開発者が最初の一読で理解・再現でき、確認のやり取りの回数を減らし、発見から修正までの時間を短縮します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trường \"Assigned to\" (người xử lý) trong bug tracking tool dùng để làm gì?",
      "en": "What is the \"Assigned to\" field in a bug tracking tool used for?",
      "ja": "バグ管理ツールの「担当者（Assigned to）」フィールドは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Ghi tên tester đã tìm ra lỗi",
        "en": "To record the name of the tester who found the bug",
        "ja": "バグを発見したテスターの名前を記録するため"
      },
      {
        "vi": "Ghi ngày dự kiến release ứng dụng",
        "en": "To record the expected app release date",
        "ja": "アプリのリリース予定日を記録するため"
      },
      {
        "vi": "Xác định rõ cá nhân/nhóm chịu trách nhiệm xử lý bug ở bước hiện tại, giúp tránh tình trạng bug bị \"vô chủ\" không ai theo dõi",
        "en": "To clearly identify the individual/team responsible for handling the bug at the current step, avoiding an \"orphaned\" bug that no one tracks",
        "ja": "現在のステップでバグを担当する個人・チームを明確にし、誰も追跡しない「宙に浮いた」バグになるのを防ぐため"
      },
      {
        "vi": "Chỉ mang tính thống kê, không ảnh hưởng đến quy trình xử lý",
        "en": "Purely statistical, with no effect on the workflow",
        "ja": "統計目的のみで、処理フローには影響しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trường Assigned to giúp phân định rõ trách nhiệm ở từng giai đoạn (dev sửa, tester verify...), là yếu tố quan trọng để quản lý tiến độ xử lý bug trong bug tracking tool.",
      "en": "The Assigned to field clarifies responsibility at each stage (developer fixing, tester verifying, etc.), which is key to tracking bug-resolution progress in a bug tracking tool.",
      "ja": "担当者フィールドは各段階（開発者が修正、テスターが検証など）の責任を明確にし、バグ管理ツールでの処理進捗管理に重要な役割を果たします。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi một bug được dev sửa và chuyển sang trạng thái \"Resolved/Fixed\", tester cần làm gì trước khi đóng (Close) bug?",
      "en": "When a bug is fixed by a developer and moved to \"Resolved/Fixed\" status, what must the tester do before closing it?",
      "ja": "開発者がバグを修正し「解決済み（Resolved/Fixed）」ステータスにした後、テスターはクローズする前に何をすべきですか。"
    },
    "options": [
      {
        "vi": "Đóng bug ngay lập tức vì dev đã báo fix xong",
        "en": "Close it immediately since the developer reported it as fixed",
        "ja": "開発者が修正完了と報告したのですぐにクローズする"
      },
      {
        "vi": "Xoá bug report để dọn dẹp hệ thống",
        "en": "Delete the bug report to clean up the system",
        "ja": "システムを整理するためバグレポートを削除する"
      },
      {
        "vi": "Không cần kiểm tra lại, tin tưởng hoàn toàn vào commit message của dev",
        "en": "No need to recheck; fully trust the developer's commit message",
        "ja": "再確認は不要で、開発者のコミットメッセージを完全に信頼する"
      },
      {
        "vi": "Thực hiện lại đúng các bước tái hiện trên bản build mới để xác nhận lỗi đã thực sự được khắc phục và không phát sinh lỗi mới (regression) trước khi đóng",
        "en": "Re-execute the exact reproduction steps on the new build to confirm the bug is truly fixed and no new regression was introduced, before closing",
        "ja": "クローズする前に、新しいビルドで再現手順を正確に実行し、バグが本当に修正され、新たな不具合（リグレッション）が発生していないことを確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trước khi đóng bug, tester phải verify lại trên build mới theo đúng bước tái hiện ban đầu để đảm bảo lỗi thực sự hết và không gây ảnh hưởng phụ (regression) đến chức năng khác.",
      "en": "Before closing, the tester must verify on the new build using the original reproduction steps to confirm the bug is truly gone and hasn't introduced side effects (regression) elsewhere.",
      "ja": "クローズ前に、テスターは新しいビルドで元の再現手順に従って検証し、バグが本当に解消されており、他の機能に副作用（リグレッション）を与えていないことを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một ô nhập tuổi chỉ chấp nhận giá trị từ 18 đến 60. Theo kỹ thuật phân vùng tương đương, có bao nhiêu vùng tương đương cần xác định cho trường này?",
      "en": "An age input field only accepts values from 18 to 60. Using equivalence partitioning, how many equivalence classes should be identified for this field?",
      "ja": "年齢入力欄が18から60までの値のみを受け付けるとします。同値分割の手法では、この項目に対していくつの同値クラスを識別すべきですか。"
    },
    "options": [
      {
        "vi": "3 vùng: nhỏ hơn 18 (không hợp lệ), 18-60 (hợp lệ), lớn hơn 60 (không hợp lệ)",
        "en": "3 classes: below 18 (invalid), 18-60 (valid), above 60 (invalid)",
        "ja": "3つ:18未満(無効)、18〜60(有効)、60超(無効)"
      },
      {
        "vi": "1 vùng: chỉ vùng hợp lệ 18-60",
        "en": "1 class: only the valid range 18-60",
        "ja": "1つ:有効範囲18〜60のみ"
      },
      {
        "vi": "2 vùng: chẵn và lẻ trong khoảng 18-60",
        "en": "2 classes: even and odd numbers within 18-60",
        "ja": "2つ:18〜60の範囲内の偶数と奇数"
      },
      {
        "vi": "43 vùng, mỗi giá trị từ 18 đến 60 là một vùng riêng",
        "en": "43 classes, one for each value from 18 to 60",
        "ja": "18から60までの各値ごとに1つずつ、合計43クラス"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Phân vùng tương đương chia miền dữ liệu thành các vùng mà mọi giá trị trong cùng vùng được xử lý tương tự: một vùng hợp lệ (18-60) và hai vùng không hợp lệ (nhỏ hơn 18, lớn hơn 60).",
      "en": "Equivalence partitioning groups the input domain into classes where any value behaves the same: one valid class (18-60) and two invalid classes (below 18, above 60).",
      "ja": "同値分割では入力領域を同じ挙動を示すクラスに分けます。有効クラス(18〜60)1つと無効クラス(18未満、60超)2つになります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Với trường tuổi chấp nhận 18 đến 60, phân tích giá trị biên (BVA) tiêu chuẩn sẽ kiểm tra những giá trị nào quanh cận dưới?",
      "en": "For an age field accepting 18 to 60, standard boundary value analysis tests which values around the lower boundary?",
      "ja": "18〜60を受け付ける年齢欄について、標準的な境界値分析(BVA)は下限付近でどの値を検証しますか。"
    },
    "options": [
      {
        "vi": "Chỉ 18",
        "en": "Only 18",
        "ja": "18のみ"
      },
      {
        "vi": "17, 18, 19",
        "en": "17, 18, 19",
        "ja": "17、18、19"
      },
      {
        "vi": "10, 18, 25",
        "en": "10, 18, 25",
        "ja": "10、18、25"
      },
      {
        "vi": "18 và 60",
        "en": "18 and 60",
        "ja": "18と60"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "BVA kiểm tra giá trị ngay dưới, đúng tại và ngay trên cận biên vì lỗi lập trình (dùng < thay vì <=) thường xảy ra tại các điểm này.",
      "en": "BVA tests the value just below, exactly at, and just above the boundary because off-by-one coding errors typically occur at these points.",
      "ja": "BVAは境界のすぐ下、境界そのもの、すぐ上の値を検証します。境界付近では条件式の誤り(<と<=の取り違えなど)が起こりやすいためです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Chức năng đăng nhập có 2 điều kiện: username đúng/sai và password đúng/sai. Kỹ thuật nào phù hợp nhất để thiết kế test case bao phủ đầy đủ các tổ hợp điều kiện này?",
      "en": "A login feature has 2 conditions: username correct/incorrect and password correct/incorrect. Which technique best designs test cases covering all combinations of these conditions?",
      "ja": "ログイン機能にはユーザー名の正誤とパスワードの正誤という2つの条件があります。これらの組み合わせを網羅するテストケース設計に最も適した手法はどれですか。"
    },
    "options": [
      {
        "vi": "Phân vùng tương đương",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Kiểm thử thăm dò",
        "en": "Exploratory testing",
        "ja": "探索的テスト"
      },
      {
        "vi": "Bảng quyết định (decision table)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Kiểm thử chuyển trạng thái",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bảng quyết định dùng để mô hình hoá logic nghiệp vụ có nhiều điều kiện kết hợp, liệt kê đầy đủ các tổ hợp và hành động tương ứng, rất phù hợp với 2 điều kiện độc lập như username/password.",
      "en": "Decision tables model business logic with multiple combined conditions, listing every combination and its resulting action, making them ideal for two independent conditions like username/password.",
      "ja": "デシジョンテーブルは複数の条件が組み合わさる業務ロジックをモデル化し、すべての組み合わせと対応するアクションを一覧化します。ユーザー名とパスワードのような独立した2条件に最適です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một đơn hàng có các trạng thái: Mới → Đang xử lý → Đã giao → Hoàn tất, và có thể chuyển sang Đã huỷ từ Mới hoặc Đang xử lý. Kỹ thuật nào mô hình hoá tốt nhất luồng nghiệp vụ này để thiết kế test?",
      "en": "An order has states: New → Processing → Shipped → Completed, and can transition to Cancelled from New or Processing. Which technique best models this workflow for test design?",
      "ja": "注文には「新規→処理中→出荷済み→完了」という状態があり、「新規」または「処理中」から「キャンセル済み」へ遷移できます。このワークフローのテスト設計に最も適した手法はどれですか。"
    },
    "options": [
      {
        "vi": "Phân tích giá trị biên",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Phân vùng tương đương",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Bảng quyết định",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Kiểm thử chuyển trạng thái (state transition testing)",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi hệ thống có các trạng thái rõ ràng và quy tắc chuyển đổi giữa chúng, kiểm thử chuyển trạng thái là kỹ thuật phù hợp để đảm bảo mọi trạng thái và đường chuyển hợp lệ/không hợp lệ đều được kiểm tra.",
      "en": "When a system has distinct states and transition rules between them, state transition testing is the right technique to ensure all valid and invalid transitions are exercised.",
      "ja": "システムに明確な状態とその間の遷移ルールがある場合、状態遷移テストが適切な手法であり、有効・無効な遷移をすべて検証できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một trường tuổi chấp nhận 18-60. Giá trị 17 và 61 thuộc loại vùng tương đương nào?",
      "en": "An age field accepts 18-60. What kind of equivalence class do the values 17 and 61 belong to?",
      "ja": "18〜60を受け付ける年齢欄で、17と61はどの種類の同値クラスに属しますか。"
    },
    "options": [
      {
        "vi": "Vùng không hợp lệ",
        "en": "Invalid class",
        "ja": "無効クラス"
      },
      {
        "vi": "Vùng hợp lệ",
        "en": "Valid class",
        "ja": "有効クラス"
      },
      {
        "vi": "Vùng biên đặc biệt không thuộc phân loại nào",
        "en": "A special boundary class outside any partition",
        "ja": "どの分類にも属さない特別な境界クラス"
      },
      {
        "vi": "Vùng trung lập, không cần kiểm thử",
        "en": "A neutral class that doesn't need testing",
        "ja": "テスト不要な中立クラス"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "17 và 61 nằm ngoài khoảng hợp lệ 18-60 nên thuộc các vùng không hợp lệ (dưới cận dưới và trên cận trên), vẫn cần được kiểm thử để xác nhận hệ thống từ chối đúng.",
      "en": "17 and 61 fall outside the valid 18-60 range, so they belong to invalid classes (below the lower bound and above the upper bound) and must still be tested to confirm proper rejection.",
      "ja": "17と61は有効範囲18〜60の外にあるため、無効クラス(下限未満・上限超過)に属します。システムが正しく拒否することを確認するためテストが必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trường mật khẩu yêu cầu độ dài từ 6 đến 20 ký tự. Bộ giá trị nào sau đây thể hiện đúng cách áp dụng BVA cho ràng buộc này?",
      "en": "A password field requires a length between 6 and 20 characters. Which set of values correctly applies BVA to this constraint?",
      "ja": "パスワード欄は6〜20文字の長さを要求します。この制約にBVAを正しく適用した値の組み合わせはどれですか。"
    },
    "options": [
      {
        "vi": "1 ký tự và 100 ký tự",
        "en": "1 character and 100 characters",
        "ja": "1文字および100文字"
      },
      {
        "vi": "5, 6, 7 ký tự và 19, 20, 21 ký tự",
        "en": "5, 6, 7 characters and 19, 20, 21 characters",
        "ja": "5、6、7文字および19、20、21文字"
      },
      {
        "vi": "6 và 20 ký tự, không cần kiểm tra gì thêm",
        "en": "Only 6 and 20 characters, nothing else needed",
        "ja": "6文字と20文字のみで、それ以外は不要"
      },
      {
        "vi": "10 và 15 ký tự (giá trị giữa khoảng)",
        "en": "10 and 15 characters (mid-range values)",
        "ja": "10文字と15文字(範囲の中間値)"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "BVA kiểm tra ngay dưới, tại, và ngay trên mỗi cận: 5-6-7 quanh cận dưới và 19-20-21 quanh cận trên, giúp phát hiện lỗi sai lệch ranh giới.",
      "en": "BVA tests just below, at, and just above each boundary: 5-6-7 around the lower bound and 19-20-21 around the upper bound, helping catch off-by-one errors.",
      "ja": "BVAは各境界のすぐ下・境界・すぐ上を検証します。下限付近の5-6-7と上限付近の19-20-21により、境界のずれによる不具合を発見できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác biệt cốt lõi giữa phân vùng tương đương và phân tích giá trị biên là gì?",
      "en": "What is the core difference between equivalence partitioning and boundary value analysis?",
      "ja": "同値分割と境界値分析の本質的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "EP chỉ dùng cho dữ liệu số, BVA chỉ dùng cho dữ liệu chuỗi",
        "en": "EP only works on numeric data, BVA only works on string data",
        "ja": "EPは数値データにのみ、BVAは文字列データにのみ使用できる"
      },
      {
        "vi": "EP kiểm thử trạng thái hệ thống, BVA kiểm thử tổ hợp điều kiện",
        "en": "EP tests system states, BVA tests condition combinations",
        "ja": "EPはシステムの状態をテストし、BVAは条件の組み合わせをテストする"
      },
      {
        "vi": "EP chọn đại diện bất kỳ trong mỗi vùng, BVA tập trung vào các giá trị ở ranh giới của vùng vì lỗi hay xảy ra ở đó",
        "en": "EP picks any representative value from each class, while BVA focuses on values at the edges of classes where defects are more likely",
        "ja": "EPは各クラスから任意の代表値を選ぶが、BVAは不具合が発生しやすいクラスの境界付近の値に着目する"
      },
      {
        "vi": "Không có sự khác biệt, hai kỹ thuật này giống hệt nhau",
        "en": "There is no difference; the two techniques are identical",
        "ja": "両者に違いはなく、2つの手法は全く同一である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "EP giảm số test case bằng cách chọn một đại diện cho mỗi vùng, còn BVA bổ sung các giá trị tại/gần ranh giới vì thực nghiệm cho thấy lỗi thường tập trung ở đó.",
      "en": "EP reduces test cases by selecting one representative per class, while BVA adds values at or near boundaries because defects tend to cluster there.",
      "ja": "EPは各クラスから代表値を1つ選んでテストケースを削減し、BVAは不具合が集中しやすい境界付近の値を追加で検証します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một bảng quyết định, nếu một tổ hợp điều kiện không thể xảy ra trong thực tế nghiệp vụ, ta nên xử lý thế nào?",
      "en": "In a decision table, if a combination of conditions cannot occur in real business logic, how should it be handled?",
      "ja": "デシジョンテーブルにおいて、ある条件の組み合わせが業務上実際には発生し得ない場合、どう扱うべきですか。"
    },
    "options": [
      {
        "vi": "Vẫn viết test case đầy đủ cho tổ hợp đó như bình thường",
        "en": "Still write a full test case for it as normal",
        "ja": "通常どおりその組み合わせに対して完全なテストケースを作成する"
      },
      {
        "vi": "Gộp tổ hợp đó với tổ hợp hợp lệ gần nhất",
        "en": "Merge it with the nearest valid combination",
        "ja": "最も近い有効な組み合わせと統合する"
      },
      {
        "vi": "Xoá điều kiện đó khỏi bảng quyết định",
        "en": "Delete that condition from the decision table entirely",
        "ja": "デシジョンテーブルからその条件自体を削除する"
      },
      {
        "vi": "Đánh dấu là 'không thể xảy ra' (impossible/N/A) và không cần tạo test case",
        "en": "Mark it as impossible/N/A and skip creating a test case",
        "ja": "「発生し得ない(N/A)」として記録し、テストケースは作成しない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các tổ hợp không thể xảy ra trong nghiệp vụ thực tế được đánh dấu N/A hoặc 'impossible' trong bảng quyết định để tránh lãng phí công sức kiểm thử vào trường hợp vô nghĩa, nhưng vẫn được ghi nhận rõ ràng để không bỏ sót.",
      "en": "Combinations that cannot occur in real business scenarios are marked N/A or impossible in the decision table to avoid wasting testing effort, while still being documented so nothing is silently omitted.",
      "ja": "実業務で発生し得ない組み合わせはデシジョンテーブル上でN/Aまたは「発生不可」と明記し、無駄なテスト工数を避けつつも記録として残し見落としを防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Với hệ thống đèn giao thông có 3 trạng thái Đỏ → Xanh → Vàng → Đỏ, một test case chuyển trạng thái không hợp lệ hữu ích để kiểm thử là gì?",
      "en": "For a traffic light system with states Red → Green → Yellow → Red, what is a useful invalid transition test case?",
      "ja": "「赤→青→黄→赤」という状態を持つ信号機システムにおいて、有効な無効遷移のテストケースとは何ですか。"
    },
    "options": [
      {
        "vi": "Kiểm tra đèn chuyển từ Đỏ sang Vàng trực tiếp (bỏ qua Xanh), điều không được phép trong thiết kế",
        "en": "Verify the light transitions directly from Red to Yellow, skipping Green, which is not allowed by design",
        "ja": "設計上許可されていない「赤から青を飛ばして黄へ直接遷移する」ことを検証する"
      },
      {
        "vi": "Kiểm tra đèn Xanh sáng đúng màu xanh lá",
        "en": "Verify the Green light shows the correct green color",
        "ja": "青信号が正しく緑色に点灯することを確認する"
      },
      {
        "vi": "Kiểm tra thời gian đèn Đỏ sáng trong bao lâu",
        "en": "Verify how long the Red light stays on",
        "ja": "赤信号がどのくらいの時間点灯するか確認する"
      },
      {
        "vi": "Kiểm tra độ sáng của đèn LED",
        "en": "Verify the brightness of the LED",
        "ja": "LEDの明るさを確認する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử chuyển trạng thái không hợp lệ nhằm xác nhận hệ thống ngăn chặn các bước chuyển không được phép trong mô hình trạng thái, ví dụ Đỏ nhảy thẳng sang Vàng mà không qua Xanh.",
      "en": "Invalid transition testing confirms the system prevents transitions not defined in the state model, such as jumping straight from Red to Yellow without passing through Green.",
      "ja": "無効遷移のテストは、状態モデルで定義されていない遷移(例:青を経由せず赤から直接黄へ)をシステムが正しく阻止することを確認するために行います。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một hệ thống giảm giá có 2 điều kiện độc lập: khách hàng VIP (có/không) và tổng đơn hàng trên 500k (có/không), tạo ra 4 quy tắc giảm giá khác nhau. Đây là ví dụ điển hình cho việc áp dụng kỹ thuật nào?",
      "en": "A discount system has 2 independent conditions: VIP customer (yes/no) and order total over 500k (yes/no), producing 4 different discount rules. This is a typical example for applying which technique?",
      "ja": "割引システムに「VIP顧客か否か」と「注文合計が50万以上か否か」という2つの独立した条件があり、4通りの異なる割引ルールが生まれます。これはどの手法を適用する典型的な例ですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử chuyển trạng thái",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Bảng quyết định",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Kiểm thử cặp đôi (pairwise)",
        "en": "Pairwise testing only",
        "ja": "ペアワイズテストのみ"
      },
      {
        "vi": "Phân tích giá trị biên",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi có nhiều điều kiện độc lập kết hợp cho ra các kết quả nghiệp vụ khác nhau, bảng quyết định là công cụ chuẩn để liệt kê đầy đủ 2^n tổ hợp và hành động tương ứng, đảm bảo không bỏ sót quy tắc nào.",
      "en": "When multiple independent conditions combine to produce different business outcomes, a decision table is the standard tool to enumerate all 2^n combinations and their resulting actions, ensuring no rule is missed.",
      "ja": "複数の独立した条件が組み合わさって異なる業務結果を生む場合、デシジョンテーブルはすべての2のn乗通りの組み合わせと対応するアクションを網羅する標準的な手法であり、ルールの見落としを防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một ô nhập ngày sinh yêu cầu năm từ 1950 đến 2010. Cách áp dụng BVA nào dưới đây là chính xác nhất?",
      "en": "A birth-year field requires a year between 1950 and 2010. Which application of BVA below is most accurate?",
      "ja": "生年欄が1950年から2010年までを要求する場合、次のうちBVAの適用として最も正確なものはどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm tra tất cả các năm từ 1950 đến 2010",
        "en": "Test every single year from 1950 to 2010",
        "ja": "1950年から2010年までのすべての年を検証する"
      },
      {
        "vi": "Kiểm tra 1900 và 2100 để chắc chắn hệ thống không bị crash",
        "en": "Test 1900 and 2100 to make sure the system doesn't crash",
        "ja": "システムがクラッシュしないことを確認するため1900年と2100年を検証する"
      },
      {
        "vi": "Kiểm tra 1949, 1950, 1951, 2009, 2010, 2011",
        "en": "Test 1949, 1950, 1951, 2009, 2010, 2011",
        "ja": "1949、1950、1951、2009、2010、2011を検証する"
      },
      {
        "vi": "Chỉ cần kiểm tra năm 1980 làm đại diện",
        "en": "Only test 1980 as a representative value",
        "ja": "1980年のみを代表値として検証すればよい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "BVA chuẩn kiểm tra giá trị ngay dưới, tại, và ngay trên từng cận: 1949-1950-1951 ở cận dưới và 2009-2010-2011 ở cận trên.",
      "en": "Standard BVA tests the value just below, at, and just above each boundary: 1949-1950-1951 at the lower bound and 2009-2010-2011 at the upper bound.",
      "ja": "標準的なBVAでは各境界のすぐ下・境界・すぐ上を検証します。下限では1949-1950-1951、上限では2009-2010-2011です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một dropdown chọn hình thức thanh toán chỉ có 3 giá trị cố định: Tiền mặt, Chuyển khoản, Ví điện tử. Kỹ thuật phân vùng tương đương áp dụng ở đây như thế nào?",
      "en": "A payment-method dropdown has only 3 fixed values: Cash, Bank Transfer, E-wallet. How does equivalence partitioning apply here?",
      "ja": "支払い方法のドロップダウンに「現金」「銀行振込」「電子マネー」という3つの固定値しかない場合、同値分割はどう適用されますか。"
    },
    "options": [
      {
        "vi": "Không áp dụng được vì không có giá trị số",
        "en": "It doesn't apply because there are no numeric values",
        "ja": "数値がないため適用できない"
      },
      {
        "vi": "Dropdown luôn được xem là một vùng tương đương duy nhất",
        "en": "A dropdown is always treated as a single equivalence class",
        "ja": "ドロップダウンは常に単一の同値クラスとして扱われる"
      },
      {
        "vi": "Chỉ cần kiểm thử giá trị đầu tiên trong danh sách",
        "en": "Only the first value in the list needs to be tested",
        "ja": "リストの最初の値のみをテストすればよい"
      },
      {
        "vi": "Mỗi giá trị hợp lệ trong dropdown là một vùng riêng cần được kiểm thử ít nhất một lần, cộng thêm kiểm thử giá trị không hợp lệ ngoài danh sách nếu có thể truyền vào",
        "en": "Each valid dropdown value is its own class that should be tested at least once, plus testing an invalid value outside the list if it can be injected",
        "ja": "ドロップダウンの各有効値をそれぞれ独立したクラスとして少なくとも1回はテストし、加えてリスト外の無効な値を注入できる場合はそれもテストする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Với tập giá trị rời rạc và hữu hạn, mỗi lựa chọn hợp lệ được xem là một vùng tương đương riêng vì có thể có logic xử lý khác nhau; đồng thời cần thử giá trị không hợp lệ (ví dụ gửi trực tiếp qua API) để kiểm tra khả năng chống lỗi.",
      "en": "With a discrete finite set of values, each valid option is treated as its own equivalence class since business logic may differ per option; invalid values (e.g. injected via API) should also be tested to verify robustness.",
      "ja": "離散的で有限な値の集合では、選択肢ごとに処理ロジックが異なる可能性があるため各有効な値を独立した同値クラスとして扱います。また堅牢性確認のため、API経由などで無効な値を注入するテストも必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kết hợp phân vùng tương đương và phân tích giá trị biên trong cùng một bộ test case, lợi ích chính là gì?",
      "en": "When combining equivalence partitioning and boundary value analysis in the same test suite, what is the main benefit?",
      "ja": "同一のテストスイート内で同値分割と境界値分析を組み合わせる主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Đạt độ bao phủ tốt với số lượng test case hợp lý, vừa kiểm tra đại diện các vùng vừa tập trung vào nơi dễ xảy ra lỗi",
        "en": "Achieves good coverage with a reasonable number of test cases, testing representative values while focusing on error-prone boundaries",
        "ja": "各クラスの代表値をテストしつつ不具合の起こりやすい境界に重点を置くことで、妥当な数のテストケースで十分なカバレッジを達成できる"
      },
      {
        "vi": "Giảm số lượng test case xuống bằng 0",
        "en": "Reduces the number of test cases to zero",
        "ja": "テストケース数をゼロにできる"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu kiểm thử thủ công",
        "en": "Completely eliminates the need for manual testing",
        "ja": "手動テストの必要性を完全になくす"
      },
      {
        "vi": "Chỉ áp dụng được cho kiểm thử hiệu năng",
        "en": "Only applicable to performance testing",
        "ja": "パフォーマンステストにのみ適用可能"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "EP giúp giảm số test case bằng cách chọn đại diện mỗi vùng, còn BVA bổ sung các điểm biên dễ sinh lỗi; kết hợp hai kỹ thuật cho độ bao phủ tốt mà không cần kiểm thử toàn bộ miền dữ liệu.",
      "en": "EP reduces test cases via representative sampling while BVA adds error-prone boundary points; combined, they give strong coverage without exhaustively testing the entire input domain.",
      "ja": "EPは代表値によりテストケース数を削減し、BVAは不具合が起きやすい境界点を補います。両者を組み合わせることで、入力領域全体を網羅せずとも十分なカバレッジが得られます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong bảng quyết định, một 'quy tắc' (rule/cột) thể hiện điều gì?",
      "en": "In a decision table, what does a 'rule' (column) represent?",
      "ja": "デシジョンテーブルにおいて「ルール(列)」は何を表しますか。"
    },
    "options": [
      {
        "vi": "Một danh sách toàn bộ điều kiện có thể có trong hệ thống",
        "en": "A list of every possible condition in the system",
        "ja": "システム内に存在しうる全条件のリスト"
      },
      {
        "vi": "Một tổ hợp cụ thể các giá trị điều kiện cùng với hành động/kết quả tương ứng",
        "en": "A specific combination of condition values along with its corresponding action/outcome",
        "ja": "条件値の特定の組み合わせと、それに対応するアクションや結果"
      },
      {
        "vi": "Một lỗi đã được phát hiện trong quá khứ",
        "en": "A defect that was previously discovered",
        "ja": "過去に発見された不具合"
      },
      {
        "vi": "Một bước trong kịch bản kiểm thử thăm dò",
        "en": "A step in an exploratory test session",
        "ja": "探索的テストセッションの1ステップ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mỗi cột (rule) trong bảng quyết định biểu diễn một tổ hợp cụ thể của các giá trị điều kiện (True/False hoặc các giá trị rời rạc) và hành động/kết quả mong đợi tương ứng, từ đó suy ra một test case.",
      "en": "Each column (rule) in a decision table represents one specific combination of condition values (True/False or discrete values) and the corresponding expected action/outcome, from which one test case is derived.",
      "ja": "デシジョンテーブルの各列(ルール)は条件値(真/偽や離散値)の特定の組み合わせと、それに対応する期待されるアクション・結果を表し、そこから1つのテストケースが導き出されます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong mô hình chuyển trạng thái, thuật ngữ nào chỉ việc kiểm tra một cặp chuyển tiếp liên tiếp (hai bước chuyển trạng thái liền nhau) thay vì chỉ từng chuyển tiếp đơn lẻ?",
      "en": "In state transition modeling, what term refers to testing a pair of consecutive transitions (two sequential state changes) rather than just individual single transitions?",
      "ja": "状態遷移モデルにおいて、個々の単一遷移ではなく、連続する2つの遷移の組を検証することを指す用語は何ですか。"
    },
    "options": [
      {
        "vi": "0-switch coverage",
        "en": "0-switch coverage",
        "ja": "0スイッチカバレッジ"
      },
      {
        "vi": "Kiểm thử hồi quy toàn diện",
        "en": "Full regression testing",
        "ja": "完全な回帰テスト"
      },
      {
        "vi": "1-switch coverage (kiểm tra cặp chuyển tiếp liên tiếp)",
        "en": "1-switch coverage (testing sequences of two consecutive transitions)",
        "ja": "1スイッチカバレッジ(連続する2つの遷移の組を検証する)"
      },
      {
        "vi": "Kiểm thử khói (smoke testing)",
        "en": "Smoke testing",
        "ja": "スモークテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "0-switch chỉ bao phủ từng chuyển tiếp đơn lẻ; 1-switch nâng mức độ bao phủ lên bằng cách kiểm tra các chuỗi gồm 2 chuyển tiếp liên tiếp, giúp phát hiện lỗi liên quan đến trình tự trạng thái.",
      "en": "0-switch coverage only exercises single transitions; 1-switch coverage raises the bar by testing sequences of two consecutive transitions, helping catch defects related to state ordering.",
      "ja": "0スイッチは単一の遷移のみを検証しますが、1スイッチはさらに一段階進んで連続する2つの遷移の組を検証し、状態の順序に関連する不具合を発見しやすくします。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một website thương mại điện tử áp dụng ưu đãi: nếu đơn hàng trên 1 triệu VÀ khách hàng dùng mã 'SALE10' thì giảm 10%, các trường hợp khác không giảm. Vì sao đây là ví dụ phù hợp cho bảng quyết định hơn là chỉ dùng phân vùng tương đương?",
      "en": "An e-commerce site applies a promotion: if the order is over 1 million VND AND the customer uses code 'SALE10', they get 10% off; otherwise no discount. Why is this a better fit for a decision table than equivalence partitioning alone?",
      "ja": "あるECサイトで「注文金額が100万VND超 かつ 'SALE10'コード使用」の場合のみ10%割引が適用されるとします。なぜこれは同値分割だけよりもデシジョンテーブルに適した例なのですか。"
    },
    "options": [
      {
        "vi": "Vì phân vùng tương đương không thể xử lý dữ liệu số",
        "en": "Because equivalence partitioning cannot handle numeric data",
        "ja": "同値分割は数値データを扱えないため"
      },
      {
        "vi": "Vì phân vùng tương đương chỉ dùng được cho giao diện di động",
        "en": "Because equivalence partitioning only applies to mobile interfaces",
        "ja": "同値分割はモバイルインターフェースにしか使えないため"
      },
      {
        "vi": "Vì bảng quyết định nhanh hơn khi thực thi test tự động",
        "en": "Because decision tables execute faster in automated testing",
        "ja": "デシジョンテーブルの方が自動テストの実行が速いため"
      },
      {
        "vi": "Vì kết quả phụ thuộc vào sự kết hợp của nhiều điều kiện (AND logic), cần liệt kê từng tổ hợp điều kiện để không bỏ sót ca như đúng đơn hàng nhưng sai mã, hoặc ngược lại",
        "en": "Because the outcome depends on the combination of multiple conditions (AND logic), requiring each combination to be enumerated so cases like correct order but wrong code aren't missed",
        "ja": "結果が複数条件の組み合わせ(AND論理)に依存するため、正しい注文額でもコードが誤っている場合など、各組み合わせを漏れなく列挙する必要があるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi kết quả phụ thuộc vào tổ hợp AND/OR của nhiều điều kiện độc lập, bảng quyết định giúp liệt kê đầy đủ mọi tổ hợp (đơn hàng đúng+mã đúng, đơn hàng đúng+mã sai, v.v.) để đảm bảo không bỏ sót logic nghiệp vụ nào.",
      "en": "When outcomes depend on AND/OR combinations of independent conditions, a decision table enumerates every combination (correct order + correct code, correct order + wrong code, etc.) to ensure no business rule is missed.",
      "ja": "結果が独立した複数条件のAND/OR論理に依存する場合、デシジョンテーブルはすべての組み合わせ(正しい注文額+正しいコード、正しい注文額+誤ったコードなど)を列挙し、業務ルールの見落としを防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Xét trạng thái đơn hàng: sau khi đã 'Đã giao' (Delivered), hệ thống KHÔNG cho phép chuyển về 'Đã huỷ' (Cancelled). Test case nào sau đây kiểm tra đúng bất biến này?",
      "en": "Consider order states: once 'Delivered', the system does NOT allow transitioning back to 'Cancelled'. Which test case correctly checks this invariant?",
      "ja": "注文状態について、「配達済み(Delivered)」になった後は「キャンセル済み(Cancelled)」への遷移は許可されないとします。この不変条件を正しく検証するテストケースはどれですか。"
    },
    "options": [
      {
        "vi": "Thử huỷ đơn khi đơn đang ở trạng thái 'Đã giao' và xác nhận hệ thống từ chối/không cho phép",
        "en": "Attempt to cancel the order while it is in the 'Delivered' state and confirm the system rejects/disallows it",
        "ja": "注文が「配達済み」状態のときにキャンセルを試み、システムが拒否/許可しないことを確認する"
      },
      {
        "vi": "Thử huỷ đơn khi đơn đang ở trạng thái 'Mới' và xác nhận thành công",
        "en": "Attempt to cancel the order while it is 'New' and confirm success",
        "ja": "注文が「新規」状態のときにキャンセルを試み、成功することを確認する"
      },
      {
        "vi": "Kiểm tra thời gian giao hàng có đúng như cam kết không",
        "en": "Check whether delivery time meets the committed SLA",
        "ja": "配送時間がSLA通りであるか確認する"
      },
      {
        "vi": "Kiểm tra giao diện hiển thị đúng màu sắc trạng thái 'Đã giao'",
        "en": "Check that the UI displays the correct color for the 'Delivered' status",
        "ja": "「配達済み」ステータスのUI表示色が正しいか確認する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là test chuyển trạng thái không hợp lệ (negative state transition): cố tình thực hiện hành động huỷ khi đã ở trạng thái cuối 'Đã giao' để xác nhận hệ thống chặn đúng theo quy tắc nghiệp vụ.",
      "en": "This is a negative state transition test: deliberately attempting to cancel from the terminal 'Delivered' state to confirm the system correctly blocks it per business rules.",
      "ja": "これは無効な状態遷移(ネガティブテスト)であり、最終状態である「配達済み」からあえてキャンセルを試みることで、業務ルールどおりにシステムが阻止することを確認します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trường 'số lượng sản phẩm' trong giỏ hàng chấp nhận từ 1 đến 99. Nếu tester chỉ kiểm tra giá trị 1, 50 và 99 mà bỏ qua 0 và 100, họ đang thiếu kỹ thuật nào?",
      "en": "A cart 'quantity' field accepts 1 to 99. If a tester only checks 1, 50, and 99 while skipping 0 and 100, which technique are they missing?",
      "ja": "カートの「数量」欄が1〜99を受け付ける場合、テスターが1、50、99のみを検証し0と100を確認しないなら、どの手法が欠けていますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử hiệu năng",
        "en": "Performance testing",
        "ja": "パフォーマンステスト"
      },
      {
        "vi": "Phân tích giá trị biên đầy đủ cho các giá trị không hợp lệ ngay ngoài ranh giới (0 và 100)",
        "en": "Full boundary value analysis for the invalid values just outside the boundaries (0 and 100)",
        "ja": "境界のすぐ外側にある無効な値(0と100)に対する完全な境界値分析"
      },
      {
        "vi": "Kiểm thử bảo mật",
        "en": "Security testing",
        "ja": "セキュリティテスト"
      },
      {
        "vi": "Kiểm thử khả năng tương thích trình duyệt",
        "en": "Cross-browser compatibility testing",
        "ja": "クロスブラウザ互換性テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tester đã kiểm tra giá trị đại diện (EP) và cận trong (BVA một phần), nhưng bỏ sót các giá trị ngay ngoài biên (0 và 100) — phần quan trọng của BVA để xác nhận hệ thống từ chối đúng các giá trị không hợp lệ sát ranh giới.",
      "en": "The tester covered representative and inner-boundary values but missed the values just outside the boundaries (0 and 100) — a critical part of BVA to confirm the system correctly rejects near-boundary invalid inputs.",
      "ja": "テスターは代表値と境界内側の値は確認していますが、境界のすぐ外側の値(0と100)を見落としています。これはBVAの重要な部分であり、境界付近の無効な入力をシステムが正しく拒否することを確認するために必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi số lượng điều kiện trong một chức năng quá nhiều (ví dụ 6 điều kiện độc lập), việc dựng bảng quyết định đầy đủ với tất cả 2^6 = 64 tổ hợp gặp vấn đề gì trong thực tế?",
      "en": "When a feature has too many conditions (e.g. 6 independent conditions), building a full decision table with all 2^6 = 64 combinations faces what practical problem?",
      "ja": "ある機能に条件が多すぎる場合(例:独立した条件が6つ)、2の6乗=64通りすべての組み合わせを含む完全なデシジョンテーブルを作成すると、実務上どのような問題が生じますか。"
    },
    "options": [
      {
        "vi": "Không có vấn đề gì, luôn nên làm đầy đủ 100% tổ hợp",
        "en": "No problem at all; always build 100% of combinations",
        "ja": "問題はなく、常に100%の組み合わせを作成すべきである"
      },
      {
        "vi": "Bảng quyết định không áp dụng được cho hơn 2 điều kiện",
        "en": "Decision tables cannot be used for more than 2 conditions",
        "ja": "デシジョンテーブルは条件が2つを超えると使用できない"
      },
      {
        "vi": "Số lượng test case tăng theo cấp số nhân, gây tốn thời gian/chi phí; cần thu gọn bằng cách loại bỏ tổ hợp không thể xảy ra hoặc dùng kỹ thuật giảm thiểu như pairwise",
        "en": "The number of test cases grows exponentially, becoming costly and time-consuming; it should be reduced by removing impossible combinations or using reduction techniques like pairwise testing",
        "ja": "テストケース数が指数関数的に増加しコストと時間がかかるため、発生し得ない組み合わせを除外したりペアワイズ法などの削減手法を用いて絞り込む必要がある"
      },
      {
        "vi": "Phải chuyển hoàn toàn sang kiểm thử tự động, không còn cách nào khác",
        "en": "Must switch entirely to automated testing with no other option",
        "ja": "完全に自動テストへ切り替える以外に方法はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Số tổ hợp tăng theo cấp số nhân (2^n) khi số điều kiện tăng, dẫn đến bùng nổ test case. Thực tế nên loại các tổ hợp bất khả thi (impossible) và có thể kết hợp với kỹ thuật giảm thiểu như pairwise để giữ chi phí kiểm thử hợp lý mà vẫn đảm bảo bao phủ rủi ro chính.",
      "en": "The combination count grows exponentially (2^n) as conditions increase, causing test case explosion. In practice, impossible combinations should be excluded, and reduction techniques like pairwise testing can help keep testing costs reasonable while still covering key risks.",
      "ja": "条件数が増えると組み合わせ数は指数関数的(2のn乗)に増加し、テストケースの爆発的増加を招きます。実務では発生し得ない組み合わせを除外し、ペアワイズ法などの削減手法を併用することで、主要なリスクを網羅しつつテストコストを妥当な範囲に抑えます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Xét trường 'điểm thi' nhận giá trị số nguyên từ 0 đến 100, và hệ thống có quy tắc: từ 0-49 là Trượt, 50-100 là Đậu. Đâu là bộ giá trị BVA đầy đủ và chính xác nhất cho ranh giới Trượt/Đậu?",
      "en": "Consider an 'exam score' field accepting integers 0 to 100, with the rule: 0-49 is Fail, 50-100 is Pass. What is the most complete and accurate BVA set for the Fail/Pass boundary?",
      "ja": "整数0〜100を受け付ける「試験点数」欄があり、0〜49が不合格、50〜100が合格というルールがあるとします。不合格/合格の境界に対する最も完全で正確なBVAの値の組み合わせはどれですか。"
    },
    "options": [
      {
        "vi": "25 và 75 (giá trị giữa mỗi vùng)",
        "en": "25 and 75 (mid-values of each range)",
        "ja": "25と75(各範囲の中間値)"
      },
      {
        "vi": "0 và 100 mà thôi",
        "en": "Only 0 and 100",
        "ja": "0と100のみ"
      },
      {
        "vi": "49 và 50 mà thôi",
        "en": "Only 49 and 50",
        "ja": "49と50のみ"
      },
      {
        "vi": "48, 49, 50, 51",
        "en": "48, 49, 50, 51",
        "ja": "48、49、50、51"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ranh giới Trượt/Đậu nằm giữa 49 và 50, nên bộ giá trị đầy đủ theo BVA gồm giá trị ngay dưới, tại và ngay trên ranh giới của cả hai phía: 48-49 (vẫn Trượt) và 50-51 (bắt đầu Đậu), giúp phát hiện lỗi lệch ranh giới như dùng > thay vì >=.",
      "en": "The Fail/Pass boundary sits between 49 and 50, so the complete BVA set includes values just below, at, and just above on both sides: 48-49 (still Fail) and 50-51 (starts Pass), catching off-by-one errors like using > instead of >=.",
      "ja": "不合格/合格の境界は49と50の間にあるため、完全なBVAの値集合には両側のすぐ下・境界・すぐ上を含めます:48-49(不合格のまま)と50-51(合格の開始)。これにより、>と>=の取り違えのような境界のずれによる不具合を発見できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một hệ thống ATM có các trạng thái: Chờ thẻ → Nhập PIN → Chọn giao dịch → Rút tiền → Trả thẻ. Việc thiết kế test case đảm bảo MỌI trạng thái được ghé thăm ít nhất một lần gọi là gì?",
      "en": "An ATM system has states: Waiting for Card → Enter PIN → Select Transaction → Withdraw Cash → Return Card. Designing test cases ensuring EVERY state is visited at least once is called what?",
      "ja": "あるATMシステムには「カード待ち→PIN入力→取引選択→出金→カード返却」という状態があります。すべての状態を少なくとも1回は通過するようにテストケースを設計することを何と呼びますか。"
    },
    "options": [
      {
        "vi": "Bao phủ trạng thái (state coverage)",
        "en": "State coverage",
        "ja": "状態カバレッジ"
      },
      {
        "vi": "Bao phủ mã nguồn (code coverage)",
        "en": "Code coverage",
        "ja": "コードカバレッジ"
      },
      {
        "vi": "Bao phủ yêu cầu (requirement coverage)",
        "en": "Requirement coverage",
        "ja": "要件カバレッジ"
      },
      {
        "vi": "Bao phủ trình duyệt (browser coverage)",
        "en": "Browser coverage",
        "ja": "ブラウザカバレッジ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong kiểm thử chuyển trạng thái, mức bao phủ cơ bản nhất là 'state coverage' — đảm bảo mọi trạng thái trong mô hình được đi qua ít nhất một lần trong bộ test case.",
      "en": "In state transition testing, the most basic coverage level is 'state coverage' — ensuring every state in the model is visited at least once across the test suite.",
      "ja": "状態遷移テストにおける最も基本的なカバレッジレベルは「状態カバレッジ」であり、モデル内のすべての状態がテストスイート全体で少なくとも1回は通過することを保証します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Câu nào sau đây SAI về phân tích giá trị biên?",
      "en": "Which statement below is FALSE about boundary value analysis?",
      "ja": "境界値分析について次のうち誤っているものはどれですか。"
    },
    "options": [
      {
        "vi": "BVA dựa trên nguyên tắc lỗi thường xảy ra ở ranh giới của vùng dữ liệu",
        "en": "BVA is based on the principle that defects often occur at the edges of a data range",
        "ja": "境界値分析は、データ範囲の境界付近で不具合が発生しやすいという原則に基づいている"
      },
      {
        "vi": "BVA đảm bảo phát hiện 100% mọi lỗi trong hệ thống, không cần thêm kỹ thuật nào khác",
        "en": "BVA guarantees detecting 100% of all defects in a system, with no other technique needed",
        "ja": "境界値分析だけで100%の不具合を検出でき、他の手法は一切不要である"
      },
      {
        "vi": "BVA thường được dùng kết hợp với phân vùng tương đương",
        "en": "BVA is commonly used together with equivalence partitioning",
        "ja": "境界値分析は同値分割と併用されることが多い"
      },
      {
        "vi": "BVA có thể áp dụng cho cả khoảng số, độ dài chuỗi và khoảng thời gian",
        "en": "BVA can be applied to numeric ranges, string lengths, and date/time ranges",
        "ja": "境界値分析は数値範囲、文字列長、日付・時間範囲などに適用できる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Không có kỹ thuật kiểm thử nào đảm bảo phát hiện 100% lỗi. BVA là kỹ thuật hiệu quả cho lỗi liên quan đến ranh giới, nhưng cần kết hợp với các kỹ thuật khác (EP, decision table, kiểm thử thăm dò...) để bao phủ tốt hơn.",
      "en": "No single testing technique guarantees 100% defect detection. BVA is effective for boundary-related defects but should be combined with other techniques (EP, decision tables, exploratory testing, etc.) for broader coverage.",
      "ja": "100%の不具合検出を保証するテスト手法は存在しません。境界値分析は境界に関連する不具合には効果的ですが、より広いカバレッジを得るには同値分割、デシジョンテーブル、探索的テストなど他の手法と組み合わせる必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác nhau giữa BVA 'worst-case' và BVA thông thường (2-value) là gì?",
      "en": "What is the difference between 'worst-case' BVA and normal (2-value) BVA?",
      "ja": "「ワーストケース」BVAと通常の(2値)BVAの違いは何ですか。"
    },
    "options": [
      {
        "vi": "Không có khác biệt, chỉ là tên gọi khác nhau",
        "en": "There is no difference; it's just a different name",
        "ja": "違いはなく、単に呼び方が異なるだけである"
      },
      {
        "vi": "Worst-case BVA chỉ kiểm tra giá trị âm",
        "en": "Worst-case BVA only tests negative values",
        "ja": "ワーストケースBVAは負の値のみを検証する"
      },
      {
        "vi": "Worst-case BVA kết hợp giá trị biên của TẤT CẢ các biến đầu vào cùng lúc, tạo nhiều tổ hợp hơn, dùng khi các biến có tương tác với nhau",
        "en": "Worst-case BVA combines boundary values of ALL input variables simultaneously, producing more combinations, used when variables interact with each other",
        "ja": "ワーストケースBVAはすべての入力変数の境界値を同時に組み合わせ、より多くの組み合わせを生成する手法で、変数同士が相互作用する場合に用いる"
      },
      {
        "vi": "Worst-case BVA là kỹ thuật dành riêng cho kiểm thử bảo mật",
        "en": "Worst-case BVA is a technique exclusively for security testing",
        "ja": "ワーストケースBVAはセキュリティテスト専用の手法である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "BVA thông thường thay đổi biên của từng biến riêng lẻ trong khi giữ các biến khác ở giá trị bình thường. Worst-case BVA kết hợp các giá trị biên của nhiều biến cùng lúc, hữu ích khi các biến đầu vào có tương tác lẫn nhau và lỗi có thể xảy ra khi nhiều biến cùng đạt cực trị.",
      "en": "Normal BVA varies one variable's boundary at a time while keeping other variables at nominal values. Worst-case BVA combines boundary values of multiple variables simultaneously, useful when input variables interact and defects can occur when several reach extremes together.",
      "ja": "通常のBVAは1つの変数の境界値のみを変化させ、他の変数は標準値に保ちます。ワーストケースBVAは複数の変数の境界値を同時に組み合わせるもので、入力変数同士が相互作用し、複数の変数が同時に極値になったときに不具合が起こりうる場合に有用です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một biểu mẫu đăng ký có trường 'Email' và 'Xác nhận Email' phải khớp nhau. Đây là ví dụ về loại điều kiện nào khi thiết kế bảng quyết định?",
      "en": "A registration form has 'Email' and 'Confirm Email' fields that must match. This is an example of what type of condition when designing a decision table?",
      "ja": "登録フォームに「メールアドレス」と「メールアドレス確認」の項目があり、両者が一致する必要があるとします。これはデシジョンテーブル設計においてどの種類の条件の例ですか。"
    },
    "options": [
      {
        "vi": "Giá trị biên số học",
        "en": "A numeric boundary value",
        "ja": "数値の境界値"
      },
      {
        "vi": "Điều kiện độc lập hoàn toàn, không liên quan gì đến trường khác",
        "en": "A fully independent condition, unrelated to any other field",
        "ja": "他の項目とは全く無関係な独立条件"
      },
      {
        "vi": "Trạng thái hệ thống (system state)",
        "en": "A system state",
        "ja": "システムの状態"
      },
      {
        "vi": "Điều kiện phụ thuộc lẫn nhau giữa hai trường (dependency giữa các input)",
        "en": "An interdependent condition between two fields (dependency between inputs)",
        "ja": "2つの項目間に依存関係がある条件(入力間の依存)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Việc email và xác nhận email phải khớp nhau tạo ra một điều kiện phụ thuộc: kết quả (chấp nhận/từ chối) phụ thuộc vào mối quan hệ giữa hai trường, phù hợp để mô hình hoá bằng bảng quyết định với các tổ hợp khớp/không khớp.",
      "en": "The requirement that email and confirm-email must match creates a dependent condition: the outcome (accept/reject) depends on the relationship between two fields, which is well suited to modeling with a decision table covering matching/non-matching combinations.",
      "ja": "メールアドレスと確認用メールアドレスが一致しなければならないという要件は依存条件を生み出します。結果(受理/拒否)は2つの項目間の関係に依存するため、一致・不一致の組み合わせをデシジョンテーブルでモデル化するのに適しています。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ứng dụng đặt vé có logic: nếu là Thành viên VÀ đặt từ 3 vé trở lên THÌ giảm 15%; nếu là Thành viên VÀ đặt dưới 3 vé THÌ giảm 5%; nếu không phải Thành viên THÌ không giảm. Số lượng quy tắc tối thiểu cần có trong bảng quyết định là bao nhiêu?",
      "en": "A ticket-booking app has this logic: if Member AND booking 3+ tickets THEN 15% off; if Member AND booking under 3 tickets THEN 5% off; if not Member THEN no discount. What is the minimum number of rules needed in the decision table?",
      "ja": "チケット予約アプリに「会員 かつ 3枚以上予約なら15%引き」「会員 かつ 3枚未満なら5%引き」「非会員なら割引なし」というロジックがあります。デシジョンテーブルに必要な最小のルール数はいくつですか。"
    },
    "options": [
      {
        "vi": "3 quy tắc, tương ứng với 3 kết quả nghiệp vụ khác nhau đã mô tả",
        "en": "3 rules, corresponding to the 3 distinct business outcomes described",
        "ja": "3ルール。記述された3つの異なる業務結果に対応する"
      },
      {
        "vi": "2 quy tắc",
        "en": "2 rules",
        "ja": "2ルール"
      },
      {
        "vi": "1 quy tắc",
        "en": "1 rule",
        "ja": "1ルール"
      },
      {
        "vi": "8 quy tắc, bất kể logic nghiệp vụ là gì",
        "en": "8 rules, regardless of the actual business logic",
        "ja": "業務ロジックの内容に関わらず8ルール"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dù về lý thuyết 2 điều kiện (Thành viên, số vé ≥3) có thể tạo 4 tổ hợp thô, nhưng logic nghiệp vụ đã gộp trường hợp 'không phải Thành viên' thành một quy tắc chung, nên chỉ cần 3 quy tắc để bao phủ đủ 3 kết quả nghiệp vụ khác biệt.",
      "en": "Although 2 conditions (Member, tickets ≥3) could theoretically yield 4 raw combinations, the business logic collapses the 'not Member' case into a single rule regardless of ticket count, so only 3 rules are needed to cover the 3 distinct outcomes.",
      "ja": "理論上は2条件(会員、枚数3以上)で4通りの組み合わせが考えられますが、業務ロジックでは「非会員」の場合は枚数に関わらず1つのルールにまとめられるため、3つの異なる結果を網羅するには3ルールで十分です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi phỏng vấn, nhà tuyển dụng hỏi: 'Bạn sẽ dùng kỹ thuật nào để test màn hình quên mật khẩu có các bước: nhập email → nhận mã OTP → nhập OTP → đặt mật khẩu mới, với ràng buộc OTP hết hạn sau 5 phút?' Câu trả lời tốt nhất kết hợp các kỹ thuật nào?",
      "en": "In an interview, you're asked: 'What technique would you use to test a forgot-password flow with steps: enter email → receive OTP → enter OTP → set new password, where the OTP expires after 5 minutes?' What combination of techniques is the best answer?",
      "ja": "面接で「メール入力→OTP受信→OTP入力→新パスワード設定、というステップを持ち、OTPが5分で失効するパスワード再設定フローをどうテストするか」と聞かれました。最も適切な組み合わせはどれですか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng kiểm thử thăm dò, không cần kỹ thuật thiết kế nào khác",
        "en": "Only exploratory testing, no other design technique needed",
        "ja": "探索的テストのみでよく、他の設計手法は不要である"
      },
      {
        "vi": "Kiểm thử chuyển trạng thái cho luồng các bước (mỗi bước là một trạng thái) kết hợp với phân tích giá trị biên cho ràng buộc thời gian hết hạn OTP (4:59, 5:00, 5:01 phút)",
        "en": "State transition testing for the step flow (each step as a state), combined with boundary value analysis for the OTP expiry time constraint (4:59, 5:00, 5:01 minutes)",
        "ja": "各ステップを状態とみなした状態遷移テストと、OTP失効時間制約(4分59秒、5分00秒、5分01秒)に対する境界値分析を組み合わせる"
      },
      {
        "vi": "Chỉ dùng bảng quyết định vì đây là bài toán số học đơn thuần",
        "en": "Only decision tables, since this is a purely mathematical problem",
        "ja": "これは単純な数値計算問題なので、デシジョンテーブルのみを使う"
      },
      {
        "vi": "Không cần thiết kế test case, chỉ cần chạy thử thủ công một lần",
        "en": "No test design needed; just manually try it once",
        "ja": "テスト設計は不要で、一度手動で試すだけでよい"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Luồng nhiều bước với trạng thái rõ ràng phù hợp với kiểm thử chuyển trạng thái, trong khi ràng buộc thời gian hết hạn (5 phút) là một ranh giới cần BVA để kiểm tra ngay trước, tại và sau mốc hết hạn — kết hợp hai kỹ thuật cho độ bao phủ toàn diện.",
      "en": "A multi-step flow with clear states fits state transition testing, while the expiry time constraint (5 minutes) is a boundary requiring BVA to check just before, at, and after the expiry mark — combining both techniques gives comprehensive coverage.",
      "ja": "明確な状態を持つ複数ステップのフローは状態遷移テストに適しており、失効時間(5分)という制約は境界値分析が必要な境界です。失効直前・失効時点・失効直後を検証することで、両手法を組み合わせた包括的なカバレッジが得られます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Xét tình huống: form đăng ký yêu cầu tuổi >= 18 VÀ có địa chỉ tại Việt Nam mới được tạo tài khoản; nếu chỉ một trong hai điều kiện đúng, tài khoản bị tạm khoá chờ xác minh; nếu cả hai sai, từ chối đăng ký. Đây là kịch bản kết hợp kỹ thuật nào để thiết kế test đầy đủ nhất?",
      "en": "Consider: a signup form requires age >= 18 AND a Vietnam address to create an account outright; if only one condition is true, the account is held pending verification; if both are false, registration is rejected. Which combination of techniques best designs comprehensive tests for this scenario?",
      "ja": "登録フォームで、年齢18歳以上 かつ ベトナム国内住所の両方を満たせば即座にアカウント作成、どちらか一方のみ満たせば検証待ちで一時保留、両方満たさなければ登録拒否、というシナリオがあります。これを最も包括的にテスト設計するにはどの手法の組み合わせが適切ですか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng kiểm thử chuyển trạng thái vì có 3 kết quả (tạo/khoá/từ chối)",
        "en": "Only state transition testing since there are 3 outcomes (created/held/rejected)",
        "ja": "結果が3つ(作成/保留/拒否)あるため状態遷移テストのみでよい"
      },
      {
        "vi": "Chỉ dùng phân vùng tương đương cho trường địa chỉ",
        "en": "Only equivalence partitioning for the address field",
        "ja": "住所欄に対する同値分割のみ"
      },
      {
        "vi": "Bảng quyết định để bao phủ 4 tổ hợp điều kiện (đúng/sai x đúng/sai) kết hợp BVA cho ranh giới tuổi 18",
        "en": "A decision table to cover the 4 condition combinations (true/false x true/false) combined with BVA for the age-18 boundary",
        "ja": "4通りの条件組み合わせ(真偽×真偽)を網羅するデシジョンテーブルと、18歳という境界に対するBVAを組み合わせる"
      },
      {
        "vi": "Không cần kỹ thuật gì, chỉ kiểm thử thủ công ngẫu nhiên",
        "en": "No technique needed; just test randomly by hand",
        "ja": "手法は不要で、ランダムに手動テストするだけでよい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Có 2 điều kiện độc lập kết hợp cho ra 3 kết quả nghiệp vụ khác nhau — đây là bài toán kinh điển cho bảng quyết định (đủ+đủ, đủ+thiếu, thiếu+đủ, thiếu+thiếu). Đồng thời điều kiện tuổi >=18 là một ranh giới số cần thêm BVA (17,18,19) để đảm bảo không lệch logic so sánh.",
      "en": "Two independent conditions combine to produce 3 distinct business outcomes — a classic decision-table scenario (both met, one met each way, neither met). The age >= 18 condition is also a numeric boundary requiring BVA (17, 18, 19) to ensure the comparison logic isn't off by one.",
      "ja": "2つの独立した条件が組み合わさり3つの異なる業務結果を生む、これはデシジョンテーブルの典型的なシナリオです(両方満たす、片方のみ×2パターン、両方満たさない)。また年齢18歳以上という条件は数値の境界でもあるため、比較ロジックのずれを防ぐためにBVA(17、18、19)も併用する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Phân biệt mã trạng thái 401 Unauthorized và 403 Forbidden khi test API bằng Postman.",
      "en": "Distinguish between the 401 Unauthorized and 403 Forbidden status codes when testing an API with Postman.",
      "ja": "PostmanでAPIをテストする際、401 Unauthorizedと403 Forbiddenのステータスコードの違いは何ですか。"
    },
    "options": [
      {
        "vi": "401 xảy ra khi request thành công nhưng dữ liệu rỗng",
        "en": "401 occurs when the request succeeds but the returned data is empty",
        "ja": "401はリクエストが成功したがデータが空の場合に発生する"
      },
      {
        "vi": "401 và 403 đều có nghĩa giống nhau, chỉ khác tên gọi",
        "en": "401 and 403 mean exactly the same thing, only the name differs",
        "ja": "401と403は名称が違うだけで意味は全く同じである"
      },
      {
        "vi": "401 là do server lỗi, 403 là do client gửi sai dữ liệu",
        "en": "401 indicates a server error, while 403 indicates the client sent malformed data",
        "ja": "401はサーバーエラーによるもので、403はクライアントが誤ったデータを送信したことによるものである"
      },
      {
        "vi": "401 nghĩa là chưa xác thực hoặc xác thực sai, 403 nghĩa là đã xác thực nhưng không đủ quyền truy cập tài nguyên",
        "en": "401 means the request is not authenticated or the credentials are wrong, while 403 means the client is authenticated but lacks permission to access the resource",
        "ja": "401は認証がされていない、または認証情報が誤っていることを意味し、403は認証済みだがリソースへのアクセス権限がないことを意味する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "401 báo hiệu client chưa cung cấp hoặc cung cấp sai thông tin xác thực, còn 403 nghĩa là danh tính đã xác định nhưng bị từ chối quyền truy cập tài nguyên đó.",
      "en": "401 signals missing or invalid authentication, whereas 403 means identity is known but access to that resource is denied.",
      "ja": "401は認証情報が欠けているか誤っていることを示し、403は身元は特定できているがそのリソースへのアクセスが拒否されたことを示す。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Postman, script viết ở tab \"Pre-request Script\" dùng để làm gì?",
      "en": "In Postman, what is the \"Pre-request Script\" tab used for?",
      "ja": "Postmanの「Pre-request Script」タブに書くスクリプトは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Thực thi trước khi gửi request, ví dụ tạo token, set biến động, tạo timestamp",
        "en": "To run before the request is sent, e.g. generating a token, setting dynamic variables, or creating a timestamp",
        "ja": "リクエスト送信前に実行され、例えばトークン生成、動的変数の設定、タイムスタンプの作成などを行うため"
      },
      {
        "vi": "Kiểm tra và assert kết quả trả về sau khi nhận response",
        "en": "To validate and assert the returned result after receiving the response",
        "ja": "レスポンスを受け取った後に結果を検証・アサートするため"
      },
      {
        "vi": "Lưu lại lịch sử các request đã gửi",
        "en": "To store the history of previously sent requests",
        "ja": "送信済みリクエストの履歴を保存するため"
      },
      {
        "vi": "Tự động sinh tài liệu API",
        "en": "To automatically generate API documentation",
        "ja": "API文書を自動生成するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Pre-request Script chạy trước khi request được gửi đi, thường dùng để chuẩn bị dữ liệu động như token, timestamp hay chữ ký.",
      "en": "The Pre-request Script runs before the request is sent, commonly used to prepare dynamic data such as tokens, timestamps, or signatures.",
      "ja": "Pre-request Scriptはリクエスト送信前に実行され、トークンやタイムスタンプ、署名などの動的データを準備するのに使われる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Postman Collection Runner dùng để làm gì trong kiểm thử API thủ công?",
      "en": "What is the Postman Collection Runner used for in manual API testing?",
      "ja": "手動APIテストにおいて、Postman Collection Runnerは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng để chỉnh sửa giao diện Postman",
        "en": "It is only used to customize the Postman interface",
        "ja": "Postmanの画面をカスタマイズするためだけに使われる"
      },
      {
        "vi": "Chạy tuần tự nhiều request trong 1 collection, có thể lặp với data file, hữu ích cho regression testing",
        "en": "It runs multiple requests in a collection sequentially, can iterate using a data file, and is useful for regression testing",
        "ja": "コレクション内の複数のリクエストを順番に実行でき、データファイルを使って繰り返し実行することも可能で、回帰テストに役立つ"
      },
      {
        "vi": "Mã hoá dữ liệu nhạy cảm trong request",
        "en": "It encrypts sensitive data inside the request",
        "ja": "リクエスト内の機密データを暗号化する"
      },
      {
        "vi": "Tạo báo cáo lỗi tự động gửi cho dev",
        "en": "It automatically creates bug reports and sends them to developers",
        "ja": "バグレポートを自動作成して開発者に送信する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Collection Runner cho phép chạy hàng loạt request theo thứ tự, kết hợp file dữ liệu (CSV/JSON) để test nhiều bộ dữ liệu, rất hữu ích khi regression test.",
      "en": "Collection Runner executes requests in order and can combine a data file (CSV/JSON) to run multiple data sets, which is very useful for regression testing.",
      "ja": "Collection Runnerはリクエストを順番に実行し、データファイル(CSV/JSON)と組み合わせて複数のデータセットをテストでき、回帰テストに非常に役立つ。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác nhau giữa Environment variable và Global variable trong Postman là gì?",
      "en": "What is the difference between an Environment variable and a Global variable in Postman?",
      "ja": "PostmanにおけるEnvironment変数とGlobal変数の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Không có sự khác biệt, hai loại dùng thay thế nhau hoàn toàn",
        "en": "There is no difference, the two types are fully interchangeable",
        "ja": "両者に違いはなく、完全に置き換え可能である"
      },
      {
        "vi": "Environment variable chỉ dùng cho response, Global variable chỉ dùng cho request",
        "en": "Environment variables are only used in the response, Global variables only in the request",
        "ja": "Environment変数はレスポンスのみに使われ、Global変数はリクエストのみに使われる"
      },
      {
        "vi": "Environment variable áp dụng riêng cho từng môi trường (dev/staging/prod) đang chọn, Global variable áp dụng cho toàn bộ workspace bất kể môi trường nào",
        "en": "Environment variables apply only to the currently selected environment (dev/staging/prod), while Global variables apply across the entire workspace regardless of the selected environment",
        "ja": "Environment変数は選択中の環境(dev/staging/prodなど)にのみ適用され、Global変数は選択中の環境に関係なくワークスペース全体に適用される"
      },
      {
        "vi": "Global variable chỉ tồn tại trong 1 request duy nhất",
        "en": "A Global variable only exists within a single request",
        "ja": "Global変数は1つのリクエスト内でのみ存在する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Environment variable chỉ có hiệu lực khi environment tương ứng đang được chọn, còn Global variable dùng chung cho mọi environment trong workspace.",
      "en": "Environment variables only take effect when the corresponding environment is selected, while Global variables are shared across every environment in the workspace.",
      "ja": "Environment変数は対応する環境が選択されている時のみ有効で、Global変数はワークスペース内のすべての環境で共有される。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test API yêu cầu xác thực Bearer Token, tester cần đặt token ở đâu trong Postman?",
      "en": "When testing an API that requires Bearer Token authentication, where should the tester place the token in Postman?",
      "ja": "Bearer Token認証を要求するAPIをテストする場合、テスターはPostmanでトークンをどこに設定すべきですか。"
    },
    "options": [
      {
        "vi": "Trong tab Tests sau khi gửi request",
        "en": "In the Tests tab after the request has been sent",
        "ja": "リクエスト送信後のTestsタブに設定する"
      },
      {
        "vi": "Trong phần Body dạng raw text",
        "en": "In the Body as raw text",
        "ja": "Bodyのraw textの中に設定する"
      },
      {
        "vi": "Trong URL dưới dạng path parameter bắt buộc",
        "en": "In the URL as a mandatory path parameter",
        "ja": "URLの必須パスパラメータとして設定する"
      },
      {
        "vi": "Trong tab Authorization, chọn Bearer Token, hoặc header Authorization: Bearer <token>",
        "en": "In the Authorization tab, select Bearer Token, or add the header Authorization: Bearer <token>",
        "ja": "Authorizationタブで「Bearer Token」を選択するか、Authorizationヘッダーに「Bearer <token>」を設定する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Bearer Token thường được đặt qua tab Authorization của Postman hoặc trực tiếp trong header Authorization theo chuẩn \"Bearer <token>\".",
      "en": "The Bearer Token is typically set via Postman's Authorization tab or directly in the Authorization header using the \"Bearer <token>\" convention.",
      "ja": "Bearer TokenはPostmanのAuthorizationタブから設定するか、Authorizationヘッダーに「Bearer <token>」という形式で直接設定するのが一般的である。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Đoạn script `pm.test(\"Status code is 200\", function () { pm.response.to.have.status(200); });` được viết ở tab nào và có tác dụng gì?",
      "en": "The script `pm.test(\"Status code is 200\", function () { pm.response.to.have.status(200); });` is written in which tab, and what does it do?",
      "ja": "`pm.test(\"Status code is 200\", function () { pm.response.to.have.status(200); });` というスクリプトはどのタブに書き、どのような効果がありますか。"
    },
    "options": [
      {
        "vi": "Tests, dùng để tự động kiểm tra assertion sau khi nhận response, ví dụ status code có đúng 200 không",
        "en": "Tests, used to automatically run assertions after receiving the response, e.g. checking whether the status code is 200",
        "ja": "Testsタブで、レスポンス受信後に自動でアサーションを行うために使われる。例えばステータスコードが200かどうかを確認する"
      },
      {
        "vi": "Pre-request Script, dùng để tạo token trước khi gửi",
        "en": "Pre-request Script, used to generate a token before sending",
        "ja": "Pre-request Scriptで、送信前にトークンを生成するために使われる"
      },
      {
        "vi": "Headers, dùng để định nghĩa header response",
        "en": "Headers, used to define the response headers",
        "ja": "Headersタブで、レスポンスヘッダーを定義するために使われる"
      },
      {
        "vi": "Body, dùng để mô tả cấu trúc dữ liệu gửi lên",
        "en": "Body, used to describe the structure of the data being sent",
        "ja": "Bodyタブで、送信するデータの構造を記述するために使われる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "pm.test và pm.response.to.have.status được viết trong tab Tests, chạy sau khi Postman nhận response để tự động kiểm tra kết quả.",
      "en": "pm.test and pm.response.to.have.status are written in the Tests tab and run after Postman receives the response to automatically validate the result.",
      "ja": "pm.testとpm.response.to.have.statusはTestsタブに記述され、Postmanがレスポンスを受け取った後に実行されて結果を自動的に検証する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi tạo một resource mới thành công qua API (ví dụ POST /users), server nên trả về mã trạng thái nào là chuẩn REST?",
      "en": "When a new resource is successfully created via an API (e.g. POST /users), which status code is standard REST practice to return?",
      "ja": "API経由で新しいリソースを正常に作成した場合(例：POST /users)、REST標準ではサーバーはどのステータスコードを返すべきですか。"
    },
    "options": [
      {
        "vi": "200 OK",
        "en": "200 OK",
        "ja": "200 OK"
      },
      {
        "vi": "201 Created",
        "en": "201 Created",
        "ja": "201 Created"
      },
      {
        "vi": "204 No Content",
        "en": "204 No Content",
        "ja": "204 No Content"
      },
      {
        "vi": "302 Found",
        "en": "302 Found",
        "ja": "302 Found"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "201 Created biểu thị resource mới đã được tạo thành công trên server, thường kèm theo header Location trỏ tới resource đó.",
      "en": "201 Created indicates that a new resource has been successfully created on the server, often accompanied by a Location header pointing to it.",
      "ja": "201 Createdは新しいリソースがサーバー上に正常に作成されたことを示し、そのリソースを指すLocationヘッダーが付くことが多い。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Đoạn cú pháp `pm.expect(jsonData.name).to.eql(\"Test User\")` trong Postman thuộc loại kiểm tra nào?",
      "en": "In Postman, what type of check does `pm.expect(jsonData.name).to.eql(\"Test User\")` represent?",
      "ja": "Postmanにおける `pm.expect(jsonData.name).to.eql(\"Test User\")` はどのようなチェックに該当しますか。"
    },
    "options": [
      {
        "vi": "Kiểm tra performance của API",
        "en": "A check for API performance",
        "ja": "APIのパフォーマンスチェック"
      },
      {
        "vi": "Kiểm tra header Content-Type",
        "en": "A check for the Content-Type header",
        "ja": "Content-Typeヘッダーのチェック"
      },
      {
        "vi": "Assertion kiểm tra giá trị cụ thể trong response body có đúng như mong đợi không",
        "en": "An assertion that checks whether a specific value in the response body matches the expected value",
        "ja": "レスポンスボディ内の特定の値が期待通りかどうかを確認するアサーション"
      },
      {
        "vi": "Kiểm tra mã lỗi bảo mật SQL injection",
        "en": "A check for SQL injection security errors",
        "ja": "SQLインジェクションのセキュリティエラーチェック"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "pm.expect...to.eql là cú pháp assertion (Chai) dùng để so sánh giá trị thực tế trong response với giá trị mong đợi.",
      "en": "pm.expect...to.eql is a Chai assertion syntax used to compare the actual value in the response against the expected value.",
      "ja": "pm.expect...to.eqlはChaiのアサーション構文で、レスポンス内の実際の値と期待値を比較するために使われる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tại sao tester cần kiểm tra header \"Content-Type\" trong response khi test API?",
      "en": "Why should a tester check the \"Content-Type\" header in the response when testing an API?",
      "ja": "APIをテストする際、テスターがレスポンスの「Content-Type」ヘッダーを確認する必要があるのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì nó chỉ dùng cho phương thức GET, không áp dụng cho POST",
        "en": "Because it is only used for GET requests and does not apply to POST",
        "ja": "GETメソッドのみに使われ、POSTには適用されないため"
      },
      {
        "vi": "Vì nó quyết định tốc độ mạng khi gửi request",
        "en": "Because it determines the network speed when sending the request",
        "ja": "リクエスト送信時のネットワーク速度を決定するため"
      },
      {
        "vi": "Vì nó chứa mật khẩu người dùng",
        "en": "Because it contains the user's password",
        "ja": "ユーザーのパスワードが含まれているため"
      },
      {
        "vi": "Vì nó xác nhận định dạng dữ liệu trả về (application/json, text/html...) có đúng như API spec không, tránh client parse sai dữ liệu",
        "en": "Because it confirms whether the returned data format (application/json, text/html...) matches the API spec, preventing the client from parsing data incorrectly",
        "ja": "返されるデータ形式(application/json、text/htmlなど)がAPI仕様通りかを確認でき、クライアント側でのデータ解析ミスを防げるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Content-Type cho biết định dạng thực sự của dữ liệu trả về, giúp tester phát hiện lỗi khi server trả sai định dạng so với spec.",
      "en": "Content-Type indicates the actual format of the returned data, helping testers detect issues when the server returns a format that doesn't match the spec.",
      "ja": "Content-Typeは返されるデータの実際の形式を示し、サーバーが仕様と異なる形式を返した場合にテスターが問題を発見する助けとなる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tính năng Mock Server trong Postman dùng để làm gì?",
      "en": "What is the Mock Server feature in Postman used for?",
      "ja": "PostmanのMock Server機能は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Giả lập response API khi backend chưa sẵn sàng, giúp FE/tester test song song mà không cần chờ dev hoàn thành API thật",
        "en": "It simulates API responses when the backend isn't ready yet, letting frontend developers and testers work in parallel without waiting for the real API",
        "ja": "バックエンドがまだ準備できていない時にAPIレスポンスを模擬でき、フロントエンドやテスターが実際のAPI完成を待たずに並行して作業できるようにする"
      },
      {
        "vi": "Chỉ dùng để lưu trữ token vĩnh viễn",
        "en": "It is only used to permanently store a token",
        "ja": "トークンを永続的に保存するためだけに使われる"
      },
      {
        "vi": "Tự động sửa lỗi code backend",
        "en": "It automatically fixes backend code bugs",
        "ja": "バックエンドコードのバグを自動的に修正する"
      },
      {
        "vi": "Mã hoá toàn bộ traffic HTTPS",
        "en": "It encrypts all HTTPS traffic",
        "ja": "すべてのHTTPS通信を暗号化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mock Server trả về response giả lập dựa trên ví dụ đã định nghĩa, cho phép test song song trong lúc API thật đang được phát triển.",
      "en": "A Mock Server returns simulated responses based on predefined examples, enabling parallel testing while the real API is still under development.",
      "ja": "Mock Serverは事前に定義した例に基づいて模擬レスポンスを返し、実際のAPIがまだ開発中でも並行してテストできるようにする。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Phân biệt status code 404 Not Found và 400 Bad Request.",
      "en": "Distinguish between the 404 Not Found and 400 Bad Request status codes.",
      "ja": "404 Not Foundと400 Bad Requestのステータスコードの違いは何ですか。"
    },
    "options": [
      {
        "vi": "404 là do server quá tải, 400 là do mất kết nối mạng",
        "en": "404 is caused by server overload, 400 by a lost network connection",
        "ja": "404はサーバーの過負荷によるもので、400はネットワーク接続の切断によるものである"
      },
      {
        "vi": "404 là tài nguyên/endpoint không tồn tại, 400 là request gửi sai định dạng/thiếu tham số bắt buộc",
        "en": "404 means the resource/endpoint does not exist, 400 means the request was malformed or missing required parameters",
        "ja": "404はリソース・エンドポイントが存在しないことを意味し、400はリクエストの形式が誤っている、または必須パラメータが不足していることを意味する"
      },
      {
        "vi": "Cả hai đều báo lỗi xác thực thất bại",
        "en": "Both indicate an authentication failure",
        "ja": "どちらも認証失敗を示すエラーである"
      },
      {
        "vi": "404 chỉ áp dụng cho phương thức POST, 400 chỉ áp dụng cho GET",
        "en": "404 only applies to POST requests, 400 only applies to GET requests",
        "ja": "404はPOSTメソッドにのみ適用され、400はGETメソッドにのみ適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "404 nghĩa là URL/endpoint không tồn tại trên server, còn 400 nghĩa là request đã tới đúng endpoint nhưng dữ liệu gửi lên sai cú pháp hoặc thiếu tham số.",
      "en": "404 means the URL/endpoint doesn't exist on the server, while 400 means the request reached the correct endpoint but the submitted data has a syntax error or missing parameters.",
      "ja": "404はURL・エンドポイントがサーバー上に存在しないことを意味し、400はリクエストは正しいエンドポイントに届いたがデータの構文が誤っているかパラメータが不足していることを意味する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Kỹ thuật \"chaining requests\" trong Postman (dùng script lưu giá trị từ response trước để dùng cho request sau) thường áp dụng khi nào?",
      "en": "When is the \"chaining requests\" technique in Postman (using scripts to save a value from one response for use in a later request) typically applied?",
      "ja": "Postmanの「チェイニングリクエスト」(あるレスポンスの値をスクリプトで保存し、後続のリクエストで使う手法)は通常どのような場合に使われますか。"
    },
    "options": [
      {
        "vi": "Khi muốn xoá toàn bộ lịch sử test",
        "en": "When you want to delete the entire test history",
        "ja": "テスト履歴をすべて削除したい場合"
      },
      {
        "vi": "Khi chỉ test 1 request đơn lẻ không phụ thuộc dữ liệu",
        "en": "When testing a single standalone request that has no data dependency",
        "ja": "データ依存のない単一のリクエストだけをテストする場合"
      },
      {
        "vi": "Khi cần lấy ID hoặc token từ response của request trước (ví dụ login) để dùng cho request tiếp theo (ví dụ tạo đơn hàng)",
        "en": "When an ID or token from a previous request's response (e.g. login) needs to be used in a subsequent request (e.g. creating an order)",
        "ja": "前のリクエストのレスポンス(例：ログイン)から得たIDやトークンを、後続のリクエスト(例：注文作成)で使う必要がある場合"
      },
      {
        "vi": "Khi cần thay đổi giao diện Postman theo từng request",
        "en": "When the Postman interface needs to change for each request",
        "ja": "リクエストごとにPostmanの画面を変更する必要がある場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chaining requests dùng script lưu giá trị (như token, ID vừa tạo) vào biến, rồi request kế tiếp lấy biến đó để sử dụng, mô phỏng luồng nghiệp vụ thực tế.",
      "en": "Chaining requests uses scripts to save a value (such as a newly created token or ID) into a variable, which the next request then reuses — simulating a real business flow.",
      "ja": "チェイニングリクエストはスクリプトで値(生成されたトークンやIDなど)を変数に保存し、次のリクエストがその変数を利用することで実際の業務フローを再現する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Postman Tests, đoạn `pm.expect(pm.response.responseTime).to.be.below(1000)` dùng để kiểm tra điều gì?",
      "en": "In Postman Tests, what does `pm.expect(pm.response.responseTime).to.be.below(1000)` check?",
      "ja": "PostmanのTestsにおける `pm.expect(pm.response.responseTime).to.be.below(1000)` は何を確認していますか。"
    },
    "options": [
      {
        "vi": "Số lượng cookie được lưu trữ",
        "en": "The number of cookies stored",
        "ja": "保存されたクッキーの数"
      },
      {
        "vi": "Số lượng request đã gửi trong ngày",
        "en": "The number of requests sent that day",
        "ja": "その日に送信されたリクエストの数"
      },
      {
        "vi": "Dung lượng file đính kèm trong body",
        "en": "The size of the file attached in the body",
        "ja": "Body内に添付されたファイルの容量"
      },
      {
        "vi": "Thời gian phản hồi của API phải nhỏ hơn 1000ms, phục vụ kiểm thử hiệu năng cơ bản",
        "en": "That the API response time must be less than 1000ms, serving as a basic performance check",
        "ja": "APIのレスポンスタイムが1000ミリ秒未満であることを確認し、基本的なパフォーマンステストとして使われる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "pm.response.responseTime trả về thời gian phản hồi tính bằng mili giây, dùng assertion để đảm bảo API đáp ứng đủ nhanh.",
      "en": "pm.response.responseTime returns the response time in milliseconds; this assertion ensures the API responds fast enough.",
      "ja": "pm.response.responseTimeはレスポンスタイムをミリ秒で返し、このアサーションによってAPIが十分速く応答することを確認できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi sử dụng Basic Auth trong Postman để xác thực API, Postman sẽ tự động làm gì với username/password đã nhập?",
      "en": "When using Basic Auth in Postman to authenticate an API, what does Postman automatically do with the entered username/password?",
      "ja": "PostmanでBasic Authを使ってAPI認証を行う際、入力したユーザー名・パスワードに対してPostmanは自動的に何を行いますか。"
    },
    "options": [
      {
        "vi": "Mã hoá Base64 cặp username:password và gửi trong header Authorization",
        "en": "Base64-encode the username:password pair and send it in the Authorization header",
        "ja": "username:passwordのペアをBase64エンコードし、Authorizationヘッダーに乗せて送信する"
      },
      {
        "vi": "Lưu trực tiếp dạng plain text vào body request",
        "en": "Store it directly as plain text in the request body",
        "ja": "リクエストボディにそのままプレーンテキストで保存する"
      },
      {
        "vi": "Gửi qua query param dưới dạng mã hoá MD5",
        "en": "Send it as a query parameter using MD5 hashing",
        "ja": "MD5でハッシュ化してクエリパラメータとして送信する"
      },
      {
        "vi": "Không gửi kèm request, chỉ dùng để hiển thị trên giao diện",
        "en": "Not send it with the request at all, only display it in the interface",
        "ja": "リクエストには送信せず、画面上に表示するだけである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Basic Auth mã hoá Base64 chuỗi \"username:password\" rồi đưa vào header Authorization: Basic <chuỗi mã hoá>, đây không phải là mã hoá bảo mật mạnh nên thường cần dùng kèm HTTPS.",
      "en": "Basic Auth Base64-encodes the \"username:password\" string and places it in the Authorization: Basic <encoded string> header; this is not strong encryption, so it should be used together with HTTPS.",
      "ja": "Basic Authは「username:password」の文字列をBase64エンコードし、Authorization: Basic <エンコード文字列>ヘッダーに設定する。これは強固な暗号化ではないため、通常HTTPSと併用する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Phân biệt status code 500 Internal Server Error và 503 Service Unavailable.",
      "en": "Distinguish between the 500 Internal Server Error and 503 Service Unavailable status codes.",
      "ja": "500 Internal Server Errorと503 Service Unavailableの違いは何ですか。"
    },
    "options": [
      {
        "vi": "500 là do client gửi sai header, 503 là do dữ liệu body rỗng",
        "en": "500 is caused by the client sending an incorrect header, 503 by an empty request body",
        "ja": "500はクライアントが誤ったヘッダーを送信したことによるもので、503はリクエストボディが空であることによるものである"
      },
      {
        "vi": "500 là lỗi chung phía server khi xử lý request, 503 thường do server tạm thời quá tải hoặc đang bảo trì nên không thể phục vụ",
        "en": "500 is a generic server-side error while processing the request, whereas 503 usually means the server is temporarily overloaded or under maintenance and cannot serve the request",
        "ja": "500はリクエスト処理中のサーバー側の一般的なエラーであり、503は通常サーバーが一時的に過負荷になっているか、メンテナンス中でリクエストを処理できないことを意味する"
      },
      {
        "vi": "Hai mã này chỉ khác nhau ở cách viết, ý nghĩa như nhau",
        "en": "The two codes only differ in how they are written; their meaning is the same",
        "ja": "この2つのコードは表記が違うだけで意味は同じである"
      },
      {
        "vi": "500 chỉ xảy ra ở môi trường local, 503 chỉ xảy ra ở production",
        "en": "500 only occurs in local environments, 503 only occurs in production",
        "ja": "500はローカル環境でのみ発生し、503は本番環境でのみ発生する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "500 báo hiệu lỗi không xác định phía server (thường do exception trong code), còn 503 báo server không sẵn sàng phục vụ tạm thời, ví dụ đang bảo trì hoặc quá tải.",
      "en": "500 signals an unspecified server-side error (often an unhandled exception), while 503 signals the server is temporarily unavailable, e.g. during maintenance or overload.",
      "ja": "500は原因不明のサーバー側エラー(多くはコード内の未処理例外)を示し、503はメンテナンスや過負荷などによりサーバーが一時的に利用できないことを示す。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Newman trong hệ sinh thái Postman là gì?",
      "en": "What is Newman in the Postman ecosystem?",
      "ja": "PostmanエコシステムにおけるNewmanとは何ですか。"
    },
    "options": [
      {
        "vi": "Một loại header bảo mật bắt buộc trong response",
        "en": "A mandatory security header in the response",
        "ja": "レスポンスに必須のセキュリティヘッダーの一種"
      },
      {
        "vi": "Tên gọi khác của biến environment",
        "en": "Another name for an environment variable",
        "ja": "environment変数の別名"
      },
      {
        "vi": "Công cụ dòng lệnh (CLI) để chạy collection Postman tự động, thường tích hợp vào CI/CD pipeline",
        "en": "A command-line (CLI) tool for automatically running Postman collections, commonly integrated into CI/CD pipelines",
        "ja": "Postmanのコレクションを自動実行するコマンドラインツール(CLI)で、CI/CDパイプラインに組み込まれることが多い"
      },
      {
        "vi": "Công cụ vẽ sơ đồ luồng API",
        "en": "A tool for drawing API flow diagrams",
        "ja": "APIフロー図を描くツール"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Newman cho phép chạy collection Postman từ terminal mà không cần mở giao diện, rất phù hợp để tích hợp vào quy trình CI/CD tự động hoá kiểm thử.",
      "en": "Newman allows Postman collections to be run from the terminal without opening the UI, making it well-suited for integration into automated CI/CD testing pipelines.",
      "ja": "NewmanはUIを開かずにターミナルからPostmanコレクションを実行でき、自動化されたCI/CDテストパイプラインへの組み込みに適している。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác nhau giữa Request Header và Response Header khi test API là gì?",
      "en": "What is the difference between a Request Header and a Response Header when testing an API?",
      "ja": "APIをテストする際、リクエストヘッダーとレスポンスヘッダーの違いは何ですか。"
    },
    "options": [
      {
        "vi": "Hai loại header này hoàn toàn giống nhau về nội dung",
        "en": "The two header types have identical content",
        "ja": "この2種類のヘッダーは内容が完全に同じである"
      },
      {
        "vi": "Request Header chỉ có ở phương thức GET",
        "en": "Request Header only exists for GET requests",
        "ja": "リクエストヘッダーはGETメソッドにのみ存在する"
      },
      {
        "vi": "Response Header chỉ chứa mã lỗi, không chứa thông tin khác",
        "en": "Response Header only contains error codes and nothing else",
        "ja": "レスポンスヘッダーにはエラーコードしか含まれない"
      },
      {
        "vi": "Request Header là thông tin client gửi kèm request (như Authorization, Content-Type), Response Header là thông tin server trả về kèm response (như Content-Type, Set-Cookie)",
        "en": "Request Header is information the client sends along with the request (like Authorization, Content-Type), while Response Header is information the server returns with the response (like Content-Type, Set-Cookie)",
        "ja": "リクエストヘッダーはクライアントがリクエストに添付する情報(Authorization、Content-Typeなど)であり、レスポンスヘッダーはサーバーがレスポンスに添付して返す情報(Content-Type、Set-Cookieなど)である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Request Header đi kèm request client gửi lên server, Response Header đi kèm response server trả về, mỗi loại phục vụ mục đích khác nhau trong luồng giao tiếp.",
      "en": "Request Headers accompany the request sent by the client to the server, and Response Headers accompany the response returned by the server — each serving a different purpose in the communication flow.",
      "ja": "リクエストヘッダーはクライアントがサーバーへ送るリクエストに付随し、レスポンスヘッダーはサーバーが返すレスポンスに付随する。それぞれ通信の流れの中で異なる役割を果たす。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi nào tester nên chọn kiểu Body \"form-data\" thay vì \"raw JSON\" trong Postman?",
      "en": "When should a tester choose the \"form-data\" body type instead of \"raw JSON\" in Postman?",
      "ja": "Postmanでテスターが「raw JSON」ではなく「form-data」のBody形式を選ぶべきなのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi request cần gửi kèm file upload hoặc dữ liệu dạng multipart",
        "en": "When the request needs to upload a file or send multipart data",
        "ja": "リクエストでファイルのアップロードやマルチパート形式のデータを送信する必要がある場合"
      },
      {
        "vi": "Khi API luôn trả về status code 200",
        "en": "When the API always returns status code 200",
        "ja": "APIが常にステータスコード200を返す場合"
      },
      {
        "vi": "Khi muốn ẩn toàn bộ tham số khỏi log",
        "en": "When wanting to hide all parameters from the log",
        "ja": "すべてのパラメータをログから隠したい場合"
      },
      {
        "vi": "Khi API không yêu cầu xác thực",
        "en": "When the API does not require authentication",
        "ja": "APIが認証を要求しない場合"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "form-data hỗ trợ gửi file kèm dữ liệu dạng multipart/form-data, phù hợp cho các API upload ảnh, tài liệu... còn raw JSON dùng cho dữ liệu văn bản thuần.",
      "en": "form-data supports sending files along with multipart/form-data content, suitable for APIs that upload images or documents, while raw JSON is used for plain text data.",
      "ja": "form-dataはmultipart/form-data形式でファイルとデータを一緒に送信でき、画像や文書のアップロードAPIに適している。一方raw JSONは純粋なテキストデータに使われる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Status code 422 Unprocessable Entity thường xuất hiện trong trường hợp nào?",
      "en": "In which situation does the 422 Unprocessable Entity status code typically appear?",
      "ja": "422 Unprocessable Entityのステータスコードは通常どのような場合に発生しますか。"
    },
    "options": [
      {
        "vi": "Server bị crash hoàn toàn không phản hồi",
        "en": "The server has completely crashed and is not responding",
        "ja": "サーバーが完全にクラッシュして応答しない場合"
      },
      {
        "vi": "Request đúng định dạng cú pháp (JSON hợp lệ) nhưng dữ liệu vi phạm quy tắc nghiệp vụ, ví dụ email sai định dạng hoặc thiếu trường bắt buộc theo validate của API",
        "en": "The request is syntactically valid JSON but the data violates business rules, e.g. an invalid email format or a required field missing according to the API's validation",
        "ja": "リクエストの構文(有効なJSON)は正しいが、データがビジネスルールに違反している場合。例えばメール形式が不正、またはAPIのバリデーションで必須のフィールドが不足している場合"
      },
      {
        "vi": "Endpoint không tồn tại trên server",
        "en": "The endpoint does not exist on the server",
        "ja": "エンドポイントがサーバー上に存在しない場合"
      },
      {
        "vi": "Người dùng chưa đăng nhập vào hệ thống",
        "en": "The user has not logged into the system",
        "ja": "ユーザーがシステムにログインしていない場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "422 khác với 400: cú pháp JSON hợp lệ và server hiểu được request, nhưng nội dung dữ liệu không thoả điều kiện nghiệp vụ/validate của API.",
      "en": "422 differs from 400: the JSON syntax is valid and the server understands the request, but the data content fails the API's business or validation rules.",
      "ja": "422は400とは異なり、JSONの構文は正しくサーバーはリクエストを理解できるが、データの内容がAPIのビジネスルールやバリデーション条件を満たしていない場合に発生する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test API dùng cơ chế xác thực OAuth 2.0 trong Postman, tester thường cần làm gì trước khi gửi request chính?",
      "en": "When testing an API that uses OAuth 2.0 authentication in Postman, what does the tester typically need to do before sending the main request?",
      "ja": "PostmanでOAuth 2.0認証を使うAPIをテストする際、テスターはメインのリクエストを送信する前に通常何を行う必要がありますか。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ cookie trình duyệt",
        "en": "Clear all browser cookies",
        "ja": "ブラウザのクッキーをすべて削除する"
      },
      {
        "vi": "Chỉ cần nhập username/password vào body request",
        "en": "Simply enter the username/password into the request body",
        "ja": "リクエストボディにユーザー名・パスワードを入力するだけでよい"
      },
      {
        "vi": "Lấy Access Token thông qua luồng cấp quyền (authorization flow) rồi cấu hình token đó vào tab Authorization của request",
        "en": "Obtain an Access Token via the authorization flow, then configure that token in the request's Authorization tab",
        "ja": "認可フロー(authorization flow)を通じてアクセストークンを取得し、そのトークンをリクエストのAuthorizationタブに設定する"
      },
      {
        "vi": "Không cần làm gì, OAuth 2.0 luôn tự động bỏ qua bước xác thực",
        "en": "Nothing is needed, OAuth 2.0 always skips the authentication step automatically",
        "ja": "何もする必要はなく、OAuth 2.0は常に自動的に認証ステップを省略する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "OAuth 2.0 yêu cầu lấy Access Token trước (qua các luồng như Authorization Code, Client Credentials...) rồi mới gắn token đó vào request để được server chấp nhận.",
      "en": "OAuth 2.0 requires obtaining an Access Token first (via flows such as Authorization Code or Client Credentials), which is then attached to the request for the server to accept it.",
      "ja": "OAuth 2.0ではまずアクセストークンを取得する必要があり(Authorization CodeやClient Credentialsなどのフローを通じて)、そのトークンをリクエストに付与することでサーバーに受理される。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Postman, sự khác nhau giữa Collection và Folder là gì?",
      "en": "In Postman, what is the difference between a Collection and a Folder?",
      "ja": "PostmanにおけるCollectionとFolderの違いは何ですか。"
    },
    "options": [
      {
        "vi": "Hai khái niệm này không tồn tại trong Postman",
        "en": "These two concepts do not exist in Postman",
        "ja": "この2つの概念はPostmanには存在しない"
      },
      {
        "vi": "Folder chỉ dùng để lưu ảnh, không lưu được request",
        "en": "A Folder is only used to store images and cannot hold requests",
        "ja": "Folderは画像の保存にのみ使われ、リクエストは保存できない"
      },
      {
        "vi": "Collection chỉ chạy được 1 request duy nhất",
        "en": "A Collection can only run a single request",
        "ja": "Collectionは1つのリクエストしか実行できない"
      },
      {
        "vi": "Collection là tập hợp lớn chứa toàn bộ request liên quan đến 1 dự án/API, Folder là cách tổ chức, nhóm các request nhỏ hơn bên trong 1 Collection",
        "en": "A Collection is the larger container holding all requests related to a project/API, while a Folder is a way to organize and group smaller sets of requests inside a Collection",
        "ja": "Collectionは1つのプロジェクト・APIに関連するすべてのリクエストを含む大きな単位であり、FolderはCollection内でより小さいリクエスト群を整理・グループ化する仕組みである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Collection là đơn vị lưu trữ chính chứa các request của 1 dự án, Folder giúp nhóm request theo module/chức năng để dễ quản lý bên trong Collection.",
      "en": "A Collection is the primary storage unit containing a project's requests, while Folders help group requests by module/feature for easier management within the Collection.",
      "ja": "Collectionはプロジェクトのリクエストを格納する主要な単位であり、Folderはモジュールや機能ごとにリクエストをグループ化してCollection内での管理を容易にする。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mục đích của việc dùng `pm.response.to.have.jsonSchema(schema)` khi test API là gì?",
      "en": "What is the purpose of using `pm.response.to.have.jsonSchema(schema)` when testing an API?",
      "ja": "APIをテストする際に `pm.response.to.have.jsonSchema(schema)` を使う目的は何ですか。"
    },
    "options": [
      {
        "vi": "Xác thực cấu trúc dữ liệu response có tuân theo schema JSON đã định nghĩa trước (đúng kiểu dữ liệu, đủ trường bắt buộc) hay không",
        "en": "To validate whether the response data structure conforms to a predefined JSON schema (correct data types, all required fields present)",
        "ja": "レスポンスのデータ構造が事前に定義したJSONスキーマ(正しいデータ型、必須フィールドの充足)に準拠しているかを検証するため"
      },
      {
        "vi": "Kiểm tra tốc độ phản hồi của server",
        "en": "To check the server's response speed",
        "ja": "サーバーの応答速度をチェックするため"
      },
      {
        "vi": "Mã hoá dữ liệu response trước khi lưu",
        "en": "To encrypt the response data before storing it",
        "ja": "保存前にレスポンスデータを暗号化するため"
      },
      {
        "vi": "Xoá các trường không cần thiết trong response",
        "en": "To remove unnecessary fields from the response",
        "ja": "レスポンス内の不要なフィールドを削除するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "jsonSchema validation giúp đảm bảo response luôn đúng cấu trúc (kiểu dữ liệu, trường bắt buộc) theo hợp đồng API đã thống nhất, phát hiện sớm khi backend thay đổi ngoài ý muốn.",
      "en": "JSON schema validation ensures the response always matches the agreed structure (data types, required fields) of the API contract, catching unintended backend changes early.",
      "ja": "JSONスキーマ検証により、レスポンスが合意されたAPI仕様(データ型、必須フィールド)通りの構造であることを常に保証し、バックエンドの意図しない変更を早期に発見できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test API và nhận được status code 429 Too Many Requests, điều này thường có nghĩa là gì?",
      "en": "When testing an API and receiving status code 429 Too Many Requests, what does this typically mean?",
      "ja": "APIをテストしてステータスコード429 Too Many Requestsを受け取った場合、これは通常何を意味しますか。"
    },
    "options": [
      {
        "vi": "API đã bị xoá khỏi hệ thống",
        "en": "The API has been removed from the system",
        "ja": "APIがシステムから削除された"
      },
      {
        "vi": "Client đã gửi vượt quá số lượng request cho phép trong khoảng thời gian quy định (rate limiting)",
        "en": "The client has exceeded the allowed number of requests within a defined time window (rate limiting)",
        "ja": "クライアントが規定の時間内に許可された回数を超えるリクエストを送信した(レート制限)"
      },
      {
        "vi": "Dữ liệu gửi lên có định dạng JSON không hợp lệ",
        "en": "The submitted data has invalid JSON formatting",
        "ja": "送信データのJSON形式が不正である"
      },
      {
        "vi": "Server đang bảo trì định kỳ theo lịch",
        "en": "The server is undergoing scheduled routine maintenance",
        "ja": "サーバーが定期的なメンテナンス中である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "429 là kết quả của cơ chế rate limiting, cảnh báo client đã gửi request quá nhanh/quá nhiều, cần chờ hoặc giảm tần suất gọi API.",
      "en": "429 results from a rate-limiting mechanism, warning that the client is sending requests too fast/too often and should wait or reduce the call frequency.",
      "ja": "429はレート制限の仕組みによる結果であり、クライアントがリクエストを送りすぎている・頻度が高すぎることを警告し、待機するか呼び出し頻度を下げる必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi cấu hình xác thực bằng API Key trong Postman, tester có thể đặt key ở những vị trí nào?",
      "en": "When configuring API Key authentication in Postman, where can a tester place the key?",
      "ja": "PostmanでAPI Key認証を設定する際、テスターはキーをどこに配置できますか。"
    },
    "options": [
      {
        "vi": "Chỉ có thể đặt trong Body dạng raw",
        "en": "It can only be placed in the Body as raw data",
        "ja": "raw形式のBodyにのみ配置できる"
      },
      {
        "vi": "Chỉ có thể đặt trong phần Tests script",
        "en": "It can only be placed in the Tests script section",
        "ja": "Testsスクリプトの部分にのみ配置できる"
      },
      {
        "vi": "Có thể đặt trong Header hoặc trong Query Params, tuỳ theo cách API được thiết kế để nhận key",
        "en": "It can be placed either in the Header or in the Query Params, depending on how the API is designed to accept the key",
        "ja": "APIがキーを受け取るよう設計されている方法によって、HeaderまたはQuery Paramsのいずれかに配置できる"
      },
      {
        "vi": "Chỉ có thể đặt trong Pre-request Script",
        "en": "It can only be placed in the Pre-request Script",
        "ja": "Pre-request Scriptにのみ配置できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Postman hỗ trợ đặt API Key vào Header (ví dụ x-api-key) hoặc vào Query Params (ví dụ ?api_key=...), tuỳ vào thiết kế của từng API cụ thể.",
      "en": "Postman lets you place the API Key in a Header (e.g. x-api-key) or in Query Params (e.g. ?api_key=...), depending on the design of the specific API.",
      "ja": "PostmanではAPI Keyをヘッダー(例：x-api-key)またはクエリパラメータ(例：?api_key=...)のいずれかに配置でき、これは各APIの設計方法による。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi API trả về header \"Set-Cookie\" trong response, tester nên kiểm tra điều gì để đảm bảo phiên đăng nhập an toàn?",
      "en": "When an API returns a \"Set-Cookie\" header in the response, what should the tester check to ensure the login session is secure?",
      "ja": "APIのレスポンスに「Set-Cookie」ヘッダーが返された場合、テスターはログインセッションの安全性を確保するために何を確認すべきですか。"
    },
    "options": [
      {
        "vi": "Cookie chỉ cần tồn tại, không cần kiểm tra thuộc tính nào khác",
        "en": "The cookie only needs to exist; no other attributes need to be checked",
        "ja": "クッキーは存在しさえすればよく、他の属性を確認する必要はない"
      },
      {
        "vi": "Cookie có màu sắc hiển thị đẹp trên giao diện Postman không",
        "en": "Whether the cookie is displayed with nice colors in the Postman interface",
        "ja": "Postman画面上でクッキーが綺麗な色で表示されているか"
      },
      {
        "vi": "Cookie có được lưu vào Body response không",
        "en": "Whether the cookie is stored in the response Body",
        "ja": "クッキーがレスポンスBodyに保存されているか"
      },
      {
        "vi": "Cookie có thuộc tính HttpOnly, Secure và thời hạn (expiry) hợp lý hay không, tránh lộ session qua script phía client",
        "en": "Whether the cookie has the HttpOnly and Secure attributes and a reasonable expiry, to avoid session exposure via client-side scripts",
        "ja": "クッキーにHttpOnlyやSecure属性、適切な有効期限(expiry)が設定されているかを確認し、クライアント側スクリプトによるセッション漏洩を防ぐ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cookie phiên đăng nhập an toàn cần có HttpOnly (chống truy cập bằng JavaScript), Secure (chỉ gửi qua HTTPS) và thời hạn hợp lý để giảm rủi ro bị đánh cắp session.",
      "en": "A secure session cookie should have HttpOnly (prevents JavaScript access), Secure (only sent over HTTPS), and a reasonable expiry to reduce the risk of session theft.",
      "ja": "安全なセッションクッキーにはHttpOnly(JavaScriptからのアクセスを防止)、Secure(HTTPS経由でのみ送信)、そして適切な有効期限が必要で、セッション窃取のリスクを軽減する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi cùng một tên biến được định nghĩa ở nhiều cấp (Global, Collection, Environment, Local) trong Postman, Postman sẽ ưu tiên sử dụng giá trị ở cấp nào?",
      "en": "When the same variable name is defined at multiple levels (Global, Collection, Environment, Local) in Postman, which level's value does Postman prioritize?",
      "ja": "Postmanで同じ変数名がGlobal、Collection、Environment、Localなど複数のレベルで定義されている場合、Postmanはどのレベルの値を優先しますか。"
    },
    "options": [
      {
        "vi": "Ưu tiên theo thứ tự từ hẹp đến rộng: Local > Data > Environment > Collection > Global, biến ở cấp hẹp hơn sẽ ghi đè cấp rộng hơn",
        "en": "It prioritizes from narrowest to widest scope: Local > Data > Environment > Collection > Global, so a variable at a narrower scope overrides one at a broader scope",
        "ja": "狭い範囲から広い範囲の順で優先される: Local > Data > Environment > Collection > Globalとなり、より狭い範囲の変数がより広い範囲の変数を上書きする"
      },
      {
        "vi": "Luôn ưu tiên Global variable vì đây là cấp cao nhất",
        "en": "It always prioritizes the Global variable since it is the highest level",
        "ja": "Global変数は最上位レベルであるため常に優先される"
      },
      {
        "vi": "Postman sẽ báo lỗi và không cho chạy request",
        "en": "Postman will throw an error and refuse to run the request",
        "ja": "Postmanはエラーを出し、リクエストの実行を拒否する"
      },
      {
        "vi": "Luôn lấy giá trị được định nghĩa đầu tiên theo thời gian, bất kể cấp nào",
        "en": "It always uses the value that was defined first chronologically, regardless of scope",
        "ja": "スコープに関係なく、時間的に最初に定義された値を常に使用する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Postman áp dụng thứ tự ưu tiên biến từ hẹp đến rộng, nên biến Local sẽ ghi đè Data, Data ghi đè Environment, Environment ghi đè Collection, và Collection ghi đè Global.",
      "en": "Postman applies variable precedence from narrowest to widest scope, so Local overrides Data, Data overrides Environment, Environment overrides Collection, and Collection overrides Global.",
      "ja": "Postmanは狭い範囲から広い範囲へという変数の優先順位を適用するため、LocalはDataを、DataはEnvironmentを、EnvironmentはCollectionを、CollectionはGlobalを上書きする。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử backend, INNER JOIN giữa hai bảng trả về kết quả nào?",
      "en": "When testing backend data, what does an INNER JOIN between two tables return?",
      "ja": "バックエンドをテストする際、2つのテーブルのINNER JOINは何を返しますか。"
    },
    "options": [
      {
        "vi": "Tất cả các dòng ở bảng bên trái kể cả không khớp",
        "en": "All rows from the left table even without a match",
        "ja": "一致しなくても左テーブルの全行"
      },
      {
        "vi": "Chỉ các dòng có giá trị khớp ở cả hai bảng",
        "en": "Only rows that have matching values in both tables",
        "ja": "両方のテーブルで値が一致する行のみ"
      },
      {
        "vi": "Tất cả các dòng ở cả hai bảng kể cả không khớp",
        "en": "All rows from both tables regardless of match",
        "ja": "一致に関係なく両テーブルの全行"
      },
      {
        "vi": "Chỉ các dòng không khớp ở cả hai bảng",
        "en": "Only rows that do not match in either table",
        "ja": "どちらのテーブルにも一致しない行のみ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "INNER JOIN chỉ trả về những dòng mà điều kiện kết nối được thỏa mãn ở cả hai bảng, dùng để kiểm tra dữ liệu liên quan tồn tại đồng thời.",
      "en": "An INNER JOIN returns only rows where the join condition is satisfied in both tables, useful to verify related data exists in both.",
      "ja": "INNER JOINは結合条件が両テーブルで満たされる行のみを返し、関連データが両方に存在するか検証するのに使われます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tester dùng LEFT JOIN để kiểm tra đơn hàng không có khách hàng tương ứng. Kết quả mong đợi khi khách hàng không tồn tại là gì?",
      "en": "A tester uses a LEFT JOIN to check for orders without a matching customer. What should the customer columns show when no match exists?",
      "ja": "テスターがLEFT JOINを使い、対応する顧客がいない注文を確認します。一致がない場合、顧客側の列はどう表示されますか。"
    },
    "options": [
      {
        "vi": "Báo lỗi cú pháp SQL",
        "en": "A SQL syntax error",
        "ja": "SQL構文エラーが発生する"
      },
      {
        "vi": "Dòng đó bị loại bỏ khỏi kết quả",
        "en": "That row is removed from the result set",
        "ja": "その行は結果から除外される"
      },
      {
        "vi": "Giá trị NULL ở các cột thuộc bảng khách hàng",
        "en": "NULL values in the customer table's columns",
        "ja": "顧客テーブル側の列がNULLになる"
      },
      {
        "vi": "Giá trị mặc định bằng 0",
        "en": "A default value of 0",
        "ja": "デフォルト値の0になる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "LEFT JOIN giữ toàn bộ dòng bên trái, nếu không có dòng khớp ở bảng phải thì các cột bảng phải trả về NULL, giúp phát hiện dữ liệu mồ côi (orphan record).",
      "en": "LEFT JOIN keeps all left-table rows; unmatched right-table columns return NULL, which helps detect orphan records.",
      "ja": "LEFT JOINは左テーブルの全行を保持し、右テーブルに一致がない場合はその列がNULLになるため、孤立レコードの検出に役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn cần đối chiếu dữ liệu hiển thị trên UI với dữ liệu thực trong database. Câu lệnh SQL nào phù hợp nhất để đếm số bản ghi trùng lặp theo một cột?",
      "en": "You need to reconcile UI-displayed data with the actual database data. Which SQL approach best counts duplicate records by a column?",
      "ja": "UI表示データと実際のデータベースデータを照合する必要があります。ある列で重複レコードを数える最適なSQLはどれですか。"
    },
    "options": [
      {
        "vi": "SELECT * FROM table WHERE column IS NOT NULL",
        "en": "SELECT * FROM table WHERE column IS NOT NULL",
        "ja": "SELECT * FROM table WHERE column IS NOT NULL"
      },
      {
        "vi": "SELECT DISTINCT column FROM table",
        "en": "SELECT DISTINCT column FROM table",
        "ja": "SELECT DISTINCT column FROM table"
      },
      {
        "vi": "SELECT column FROM table ORDER BY column",
        "en": "SELECT column FROM table ORDER BY column",
        "ja": "SELECT column FROM table ORDER BY column"
      },
      {
        "vi": "SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1",
        "en": "SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1",
        "ja": "SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "GROUP BY kết hợp HAVING COUNT(*) > 1 giúp gom nhóm và lọc ra những giá trị xuất hiện nhiều hơn một lần, chính là cách phát hiện dữ liệu trùng lặp.",
      "en": "GROUP BY combined with HAVING COUNT(*) > 1 groups values and filters those appearing more than once, which is exactly how duplicates are detected.",
      "ja": "GROUP BYとHAVING COUNT(*) > 1を組み合わせることで、値をグループ化し2回以上出現するものを抽出でき、重複データの検出に使えます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử tính toàn vẹn dữ liệu (data integrity), việc tồn tại bản ghi ở bảng con nhưng không có bản ghi cha tương ứng gọi là gì?",
      "en": "When testing data integrity, a child-table record with no corresponding parent record is called what?",
      "ja": "データ整合性をテストする際、対応する親レコードがない子テーブルのレコードは何と呼ばれますか。"
    },
    "options": [
      {
        "vi": "Bản ghi mồ côi (orphan record)",
        "en": "An orphan record",
        "ja": "孤立レコード（オーファンレコード）"
      },
      {
        "vi": "Bản ghi trùng lặp (duplicate record)",
        "en": "A duplicate record",
        "ja": "重複レコード"
      },
      {
        "vi": "Bản ghi rỗng (null record)",
        "en": "A null record",
        "ja": "NULLレコード"
      },
      {
        "vi": "Bản ghi tạm (staging record)",
        "en": "A staging record",
        "ja": "ステージングレコード"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Bản ghi mồ côi là bản ghi con tham chiếu tới khóa ngoại không còn tồn tại ở bảng cha, thường phát hiện bằng LEFT JOIN kết hợp kiểm tra NULL.",
      "en": "An orphan record is a child row referencing a foreign key that no longer exists in the parent table, typically found via LEFT JOIN with a NULL check.",
      "ja": "孤立レコードとは、親テーブルに存在しない外部キーを参照している子レコードのことで、LEFT JOINとNULLチェックで検出できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ràng buộc nào trong database đảm bảo một cột không được chứa giá trị trùng lặp?",
      "en": "Which database constraint ensures a column cannot contain duplicate values?",
      "ja": "列に重複値が入らないことを保証するデータベース制約はどれですか。"
    },
    "options": [
      {
        "vi": "NOT NULL",
        "en": "NOT NULL",
        "ja": "NOT NULL"
      },
      {
        "vi": "UNIQUE",
        "en": "UNIQUE",
        "ja": "UNIQUE"
      },
      {
        "vi": "DEFAULT",
        "en": "DEFAULT",
        "ja": "DEFAULT"
      },
      {
        "vi": "CHECK",
        "en": "CHECK",
        "ja": "CHECK"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ràng buộc UNIQUE ngăn cột chứa giá trị trùng, tester cần kiểm tra ràng buộc này khi test dữ liệu như email, số điện thoại đăng ký.",
      "en": "The UNIQUE constraint prevents duplicate values in a column; testers verify it for fields like registered email or phone number.",
      "ja": "UNIQUE制約は列内の重複値を防ぎます。テスターは登録メールや電話番号などのフィールドでこの制約を検証します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn thực hiện xóa dữ liệu test bằng lệnh DELETE nhưng số hàng bị ảnh hưởng lớn hơn dự kiến. Nguyên nhân phổ biến nhất là gì?",
      "en": "You run a DELETE to clean up test data but more rows than expected are affected. What is the most common cause?",
      "ja": "テストデータをDELETEで削除しましたが、想定より多くの行が影響を受けました。最も一般的な原因は何ですか。"
    },
    "options": [
      {
        "vi": "Thiếu chỉ mục (index) trên bảng",
        "en": "Missing index on the table",
        "ja": "テーブルにインデックスがない"
      },
      {
        "vi": "Dùng sai kiểu dữ liệu cột",
        "en": "Using the wrong column data type",
        "ja": "列のデータ型を誤って使用した"
      },
      {
        "vi": "Thiếu hoặc sai mệnh đề WHERE",
        "en": "Missing or incorrect WHERE clause",
        "ja": "WHERE句の欠落または誤り"
      },
      {
        "vi": "Bảng có quá nhiều cột",
        "en": "The table has too many columns",
        "ja": "テーブルの列が多すぎる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Câu lệnh DELETE thiếu hoặc viết sai WHERE sẽ xóa toàn bộ hoặc nhiều hàng ngoài ý muốn; đây là lỗi rất nguy hiểm khi thao tác trực tiếp trên dữ liệu.",
      "en": "A missing or incorrect WHERE clause causes DELETE to remove all or many unintended rows — a dangerous mistake when manipulating data directly.",
      "ja": "WHERE句が欠落または誤っているとDELETEが意図しない多数の行、あるいは全行を削除してしまい、直接データ操作を行う際の危険なミスとなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test một trường ngày sinh trong database, bạn nên kiểm tra kiểu dữ liệu và định dạng nào để tránh lỗi hiển thị sai trên các múi giờ khác nhau?",
      "en": "When testing a date-of-birth field in the database, what should you verify to avoid display errors across different time zones?",
      "ja": "データベースの生年月日フィールドをテストする際、異なるタイムゾーンでの表示エラーを避けるために何を確認すべきですか。"
    },
    "options": [
      {
        "vi": "Tên cột có viết hoa hay không",
        "en": "Whether the column name is uppercase",
        "ja": "列名が大文字かどうか"
      },
      {
        "vi": "Số lượng ký tự tối đa của cột",
        "en": "The maximum character length of the column",
        "ja": "列の最大文字数"
      },
      {
        "vi": "Chỉ số của cột trong bảng",
        "en": "The column's index position in the table",
        "ja": "テーブル内の列の位置"
      },
      {
        "vi": "Kiểu dữ liệu ngày/giờ và cách lưu trữ có kèm múi giờ (timezone) hay không",
        "en": "The date/time data type and whether timezone information is stored",
        "ja": "日付/時刻のデータ型とタイムゾーン情報が保存されているか"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cần xác minh kiểu DATE/DATETIME/TIMESTAMP có lưu kèm timezone hay không để đảm bảo hiển thị đúng khi người dùng ở các múi giờ khác nhau.",
      "en": "You must confirm whether DATE/DATETIME/TIMESTAMP stores timezone info to ensure correct display for users in different time zones.",
      "ja": "DATE/DATETIME/TIMESTAMP型がタイムゾーン情報を保持しているか確認し、異なるタイムゾーンのユーザーでも正しく表示されるようにする必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong quá trình test, bạn phát hiện hai bảng Orders và Customers có quan hệ nhưng khóa ngoại (foreign key) không được thiết lập ở tầng database. Rủi ro chính là gì?",
      "en": "During testing, you find the Orders and Customers tables are related but no foreign key constraint exists at the database level. What is the main risk?",
      "ja": "テスト中、OrdersテーブルとCustomersテーブルは関連しているのに、データベース側で外部キー制約が設定されていないことを発見しました。主なリスクは何ですか。"
    },
    "options": [
      {
        "vi": "Ứng dụng có thể lưu dữ liệu tham chiếu không hợp lệ (orphan) mà không bị chặn",
        "en": "The application can insert invalid referential data (orphans) without being blocked",
        "ja": "アプリケーションが無効な参照データ（孤立データ）をブロックされずに保存できる"
      },
      {
        "vi": "Truy vấn SELECT sẽ chạy chậm hơn",
        "en": "SELECT queries will run slower",
        "ja": "SELECTクエリの実行が遅くなる"
      },
      {
        "vi": "Bảng sẽ tự động bị khóa khi ghi dữ liệu",
        "en": "The table will automatically lock during writes",
        "ja": "書き込み時にテーブルが自動的にロックされる"
      },
      {
        "vi": "Dữ liệu sẽ tự sắp xếp sai thứ tự",
        "en": "Data will automatically sort in the wrong order",
        "ja": "データの並び順が自動的に狂う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thiếu ràng buộc khóa ngoại khiến hệ thống không tự chặn việc chèn dữ liệu tham chiếu tới bản ghi không tồn tại, dẫn tới dữ liệu mồ côi và mất toàn vẹn.",
      "en": "Without a foreign key constraint, the system won't block inserting data that references a non-existent record, leading to orphan data and broken integrity.",
      "ja": "外部キー制約がないと、存在しないレコードを参照するデータの挿入をシステムが自動でブロックできず、孤立データや整合性の破綻につながります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn muốn kiểm tra xem một trường số điện thoại trong database có bản ghi nào bị để trống (rỗng) nhưng không phải NULL không. Điều kiện WHERE nào đúng?",
      "en": "You want to check if any phone number field is an empty string but not NULL. Which WHERE condition is correct?",
      "ja": "電話番号フィールドがNULLではなく空文字になっているレコードを確認したい場合、正しいWHERE条件はどれですか。"
    },
    "options": [
      {
        "vi": "WHERE phone IS NULL",
        "en": "WHERE phone IS NULL",
        "ja": "WHERE phone IS NULL"
      },
      {
        "vi": "WHERE phone = ''",
        "en": "WHERE phone = ''",
        "ja": "WHERE phone = ''"
      },
      {
        "vi": "WHERE phone = NULL",
        "en": "WHERE phone = NULL",
        "ja": "WHERE phone = NULL"
      },
      {
        "vi": "WHERE phone <> phone",
        "en": "WHERE phone <> phone",
        "ja": "WHERE phone <> phone"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chuỗi rỗng '' khác với NULL về mặt logic trong SQL; để tìm bản ghi có giá trị rỗng thực sự, cần so sánh bằng dấu = với chuỗi rỗng, không dùng IS NULL.",
      "en": "An empty string '' is logically different from NULL in SQL; to find truly empty values you compare with = '', not IS NULL.",
      "ja": "SQLでは空文字''とNULLは論理的に異なります。本当に空文字のレコードを探すにはIS NULLではなく= ''で比較します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thực hiện kiểm thử di trú dữ liệu (data migration testing) từ hệ thống cũ sang hệ thống mới, bước kiểm tra quan trọng nhất sau khi migrate là gì?",
      "en": "When performing data migration testing from a legacy system to a new one, what is the most important check after migration completes?",
      "ja": "旧システムから新システムへのデータ移行テストを行う際、移行完了後に最も重要な確認事項は何ですか。"
    },
    "options": [
      {
        "vi": "Đo tốc độ gõ phím của người dùng",
        "en": "Measure the user's typing speed",
        "ja": "ユーザーのタイピング速度を測定する"
      },
      {
        "vi": "Kiểm tra giao diện người dùng có màu sắc đẹp không",
        "en": "Check whether the UI colors look appealing",
        "ja": "UIの配色が美しいか確認する"
      },
      {
        "vi": "So sánh số lượng bản ghi và giá trị dữ liệu giữa nguồn và đích",
        "en": "Compare record counts and data values between source and target",
        "ja": "移行元と移行先のレコード数とデータ値を比較する"
      },
      {
        "vi": "Kiểm tra font chữ trên trang đăng nhập",
        "en": "Check the font on the login page",
        "ja": "ログインページのフォントを確認する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Data migration testing cần đối chiếu số bản ghi, giá trị, và tính toàn vẹn tham chiếu giữa hệ thống nguồn và đích để đảm bảo không mất hoặc sai lệch dữ liệu.",
      "en": "Data migration testing requires comparing record counts, values, and referential integrity between source and target to ensure no data loss or corruption.",
      "ja": "データ移行テストでは、データの欠落や不整合がないことを確認するため、移行元と移行先でレコード数・値・参照整合性を照合する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "FULL OUTER JOIN hữu ích nhất khi tester muốn kiểm tra điều gì giữa hai bảng?",
      "en": "A FULL OUTER JOIN is most useful when a tester wants to check what between two tables?",
      "ja": "FULL OUTER JOINは、テスターが2つのテーブル間で何を確認したいときに最も有用ですか。"
    },
    "options": [
      {
        "vi": "Chỉ những dòng khớp hoàn toàn ở cả hai bảng",
        "en": "Only rows that match perfectly in both tables",
        "ja": "両テーブルで完全に一致する行のみ"
      },
      {
        "vi": "Xóa các dòng trùng lặp tự động",
        "en": "Automatically delete duplicate rows",
        "ja": "重複行を自動的に削除する"
      },
      {
        "vi": "Chỉ số lượng dòng của bảng bên trái",
        "en": "Only the row count of the left table",
        "ja": "左テーブルの行数のみ"
      },
      {
        "vi": "Toàn bộ dữ liệu không khớp lẫn khớp ở cả hai bảng, để tìm chênh lệch hai chiều",
        "en": "All matched and unmatched data from both tables, to find two-way discrepancies",
        "ja": "両テーブルの一致・不一致すべてのデータを取得し、双方向の差異を見つける"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "FULL OUTER JOIN trả về cả dòng khớp và không khớp ở cả hai bảng, rất hữu ích khi cần đối chiếu chênh lệch dữ liệu hai chiều giữa hai nguồn.",
      "en": "FULL OUTER JOIN returns matched and unmatched rows from both tables, useful for reconciling two-way data discrepancies between two sources.",
      "ja": "FULL OUTER JOINは両テーブルの一致・不一致行をすべて返すため、2つのデータソース間の双方向の差異を照合するのに便利です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tester cần xác minh tổng số tiền hiển thị trên báo cáo UI khớp với dữ liệu database. Hàm SQL nào phù hợp để tính tổng một cột số?",
      "en": "A tester needs to verify a total amount shown on a UI report matches the database. Which SQL function is appropriate to sum a numeric column?",
      "ja": "テスターは、UIレポートに表示された合計金額がデータベースと一致するか確認する必要があります。数値列を合計する適切なSQL関数はどれですか。"
    },
    "options": [
      {
        "vi": "SUM()",
        "en": "SUM()",
        "ja": "SUM()"
      },
      {
        "vi": "COUNT()",
        "en": "COUNT()",
        "ja": "COUNT()"
      },
      {
        "vi": "LENGTH()",
        "en": "LENGTH()",
        "ja": "LENGTH()"
      },
      {
        "vi": "CONCAT()",
        "en": "CONCAT()",
        "ja": "CONCAT()"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "SUM() là hàm tổng hợp dùng để cộng dồn giá trị của một cột số, phù hợp để đối chiếu tổng tiền trên báo cáo với dữ liệu thực trong database.",
      "en": "SUM() is an aggregate function that adds up values in a numeric column, appropriate for reconciling a report total with actual database data.",
      "ja": "SUM()は数値列の値を合計する集計関数で、レポート上の合計金額と実際のデータベースデータを照合するのに適しています。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test một trường có ràng buộc CHECK (age >= 18) trong database, tester nên thử insert giá trị nào để xác minh ràng buộc hoạt động?",
      "en": "When testing a field with a CHECK (age >= 18) constraint, which value should a tester try inserting to verify the constraint works?",
      "ja": "CHECK(age >= 18)制約があるフィールドをテストする際、制約が機能するか確認するためにどの値を挿入してみるべきですか。"
    },
    "options": [
      {
        "vi": "age = 25",
        "en": "age = 25",
        "ja": "age = 25"
      },
      {
        "vi": "age = 17 để kiểm tra hệ thống có từ chối insert hay không",
        "en": "age = 17 to verify the system rejects the insert",
        "ja": "age = 17を試し、システムが挿入を拒否するか確認する"
      },
      {
        "vi": "age = NULL luôn được chấp nhận",
        "en": "age = NULL is always accepted",
        "ja": "age = NULLは常に受け入れられる"
      },
      {
        "vi": "Không cần test ràng buộc CHECK vì đã có validate ở UI",
        "en": "No need to test the CHECK constraint since UI already validates",
        "ja": "UI側で検証済みなのでCHECK制約はテストする必要がない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Để xác minh ràng buộc CHECK hoạt động đúng tại tầng database, tester cần thử giá trị vi phạm điều kiện (age=17 < 18) và kỳ vọng hệ thống từ chối, không chỉ dựa vào validate ở UI vì dữ liệu có thể chèn trực tiếp qua API/DB.",
      "en": "To verify a CHECK constraint truly works at the database layer, a tester must try a value that violates the rule (age=17 < 18) and expect rejection — relying only on UI validation is insufficient since data can be inserted directly via API/DB.",
      "ja": "CHECK制約がデータベース層で正しく機能するか検証するには、条件に違反する値（age=17 < 18）を試して拒否されることを確認する必要があります。API/DB経由で直接挿入される可能性があるため、UI側の検証だけに頼るのは不十分です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn so sánh dữ liệu giữa hai bảng Staging và Production để tìm những bản ghi chỉ tồn tại ở Staging mà không có ở Production. Kỹ thuật JOIN nào kèm điều kiện nào là phù hợp?",
      "en": "You compare a Staging and a Production table to find records that exist only in Staging but not Production. Which JOIN technique and condition fits?",
      "ja": "StagingテーブルとProductionテーブルを比較し、Stagingにのみ存在しProductionには存在しないレコードを探します。どのJOIN手法と条件が適していますか。"
    },
    "options": [
      {
        "vi": "INNER JOIN không kèm điều kiện gì thêm",
        "en": "INNER JOIN with no additional condition",
        "ja": "追加条件なしのINNER JOIN"
      },
      {
        "vi": "CROSS JOIN giữa hai bảng",
        "en": "A CROSS JOIN between the two tables",
        "ja": "2つのテーブルのCROSS JOIN"
      },
      {
        "vi": "LEFT JOIN từ Staging sang Production kèm WHERE Production.id IS NULL",
        "en": "LEFT JOIN from Staging to Production with WHERE Production.id IS NULL",
        "ja": "StagingからProductionへのLEFT JOINにWHERE Production.id IS NULLを付加"
      },
      {
        "vi": "RIGHT JOIN từ Production sang Staging",
        "en": "RIGHT JOIN from Production to Staging",
        "ja": "ProductionからStagingへのRIGHT JOIN"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "LEFT JOIN từ Staging sang Production giữ tất cả dòng Staging; lọc WHERE Production.id IS NULL sẽ chỉ ra các dòng chỉ tồn tại ở Staging, đây là kỹ thuật phổ biến để đối chiếu chênh lệch dữ liệu.",
      "en": "A LEFT JOIN from Staging to Production keeps all Staging rows; filtering WHERE Production.id IS NULL isolates rows that exist only in Staging — a common technique for data reconciliation.",
      "ja": "StagingからProductionへのLEFT JOINはStagingの全行を保持し、WHERE Production.id IS NULLでフィルタすることでStagingにのみ存在する行を抽出できます。データ照合でよく使われる手法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong database testing, thuật ngữ \"referential integrity\" (toàn vẹn tham chiếu) đề cập đến điều gì?",
      "en": "In database testing, what does the term \"referential integrity\" refer to?",
      "ja": "データベーステストにおいて、「参照整合性」という用語は何を指しますか。"
    },
    "options": [
      {
        "vi": "Tốc độ truy vấn dữ liệu nhanh hay chậm",
        "en": "Whether data queries run fast or slow",
        "ja": "データクエリの速度が速いか遅いか"
      },
      {
        "vi": "Mã hóa dữ liệu nhạy cảm trong database",
        "en": "Encrypting sensitive data in the database",
        "ja": "データベース内の機密データを暗号化すること"
      },
      {
        "vi": "Khả năng backup dữ liệu tự động mỗi ngày",
        "en": "The ability to automatically back up data daily",
        "ja": "毎日自動的にデータをバックアップする機能"
      },
      {
        "vi": "Đảm bảo mối quan hệ khóa chính - khóa ngoại giữa các bảng luôn hợp lệ, không có dữ liệu tham chiếu treo",
        "en": "Ensuring primary key–foreign key relationships between tables remain valid, with no dangling references",
        "ja": "テーブル間の主キーと外部キーの関係が常に有効で、宙に浮いた参照が存在しないことを保証すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Toàn vẹn tham chiếu đảm bảo rằng mọi khóa ngoại đều trỏ tới một bản ghi hợp lệ ở bảng cha, tránh tình trạng dữ liệu mồ côi hoặc tham chiếu treo.",
      "en": "Referential integrity ensures every foreign key points to a valid record in the parent table, preventing orphan or dangling references.",
      "ja": "参照整合性とは、すべての外部キーが親テーブルの有効なレコードを指し、孤立データや宙に浮いた参照が発生しないことを保証するものです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn phát hiện một cột \"email\" trong bảng Users cho phép lưu ký tự hoa lẫn thường khác nhau (VD: \"Test@Mail.com\" và \"test@mail.com\") và hệ thống coi đó là hai tài khoản khác nhau. Đây là loại lỗi test nào liên quan tới database?",
      "en": "You find the \"email\" column in the Users table allows mixed-case values (e.g., \"Test@Mail.com\" and \"test@mail.com\") and the system treats them as two different accounts. What kind of database-related test issue is this?",
      "ja": "Usersテーブルの「email」列が大文字小文字混在の値（例：\"Test@Mail.com\"と\"test@mail.com\"）を許可し、システムがそれらを別アカウントとして扱っていることを発見しました。これはどのようなデータベース関連のテスト課題ですか。"
    },
    "options": [
      {
        "vi": "Thiếu chuẩn hóa dữ liệu (data normalization/consistency), có thể gây trùng tài khoản logic",
        "en": "Lack of data normalization/consistency, which can cause logical duplicate accounts",
        "ja": "データの正規化・一貫性の欠如で、論理的な重複アカウントを引き起こす可能性がある"
      },
      {
        "vi": "Lỗi hiệu năng truy vấn",
        "en": "A query performance issue",
        "ja": "クエリのパフォーマンス問題"
      },
      {
        "vi": "Lỗi khóa ngoại",
        "en": "A foreign key error",
        "ja": "外部キーのエラー"
      },
      {
        "vi": "Lỗi kiểu dữ liệu ngày tháng",
        "en": "A date data type error",
        "ja": "日付データ型のエラー"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là vấn đề chuẩn hóa/nhất quán dữ liệu: email nên được lưu hoặc so sánh không phân biệt hoa thường để tránh tạo tài khoản trùng logic, tester cần kiểm tra ràng buộc hoặc logic chuẩn hóa ở tầng ứng dụng/database.",
      "en": "This is a data normalization/consistency issue: emails should be stored or compared case-insensitively to avoid logically duplicate accounts; testers should verify constraints or normalization logic at the app/DB layer.",
      "ja": "これはデータの正規化・一貫性の問題です。論理的な重複アカウントを避けるため、メールは大文字小文字を区別せずに保存または比較すべきであり、テスターはアプリ/DB層の制約や正規化ロジックを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử một transaction (giao dịch) chuyển tiền giữa hai tài khoản, tester cần xác minh điều gì nếu hệ thống bị lỗi giữa chừng (ví dụ mất kết nối)?",
      "en": "When testing a money-transfer transaction between two accounts, what should a tester verify if the system fails midway (e.g., connection drop)?",
      "ja": "2つの口座間の送金トランザクションをテストする際、途中でシステムが失敗した場合（接続断など）、テスターは何を確認すべきですか。"
    },
    "options": [
      {
        "vi": "Giao diện có hiển thị màu đỏ khi lỗi hay không",
        "en": "Whether the UI shows a red color on error",
        "ja": "エラー時にUIが赤色表示になるか"
      },
      {
        "vi": "Transaction được rollback hoàn toàn, không có trạng thái dữ liệu nửa vời (trừ tiền một bên nhưng chưa cộng bên kia)",
        "en": "The transaction fully rolls back, with no partial data state (money debited from one account but not credited to the other)",
        "ja": "トランザクションが完全にロールバックされ、データが中途半端な状態（片方から引き落とされたがもう片方に加算されていない）にならないこと"
      },
      {
        "vi": "Tốc độ xử lý transaction có nhanh hơn 1 giây không",
        "en": "Whether the transaction processes in under 1 second",
        "ja": "トランザクション処理が1秒未満か"
      },
      {
        "vi": "Log lỗi có màu chữ đúng chuẩn không",
        "en": "Whether the error log text color follows the standard",
        "ja": "エラーログの文字色が規定通りか"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Nguyên tắc ACID (Atomicity) yêu cầu transaction phải toàn vẹn: hoặc thực hiện trọn vẹn hoặc rollback hoàn toàn, tester cần kiểm tra database không rơi vào trạng thái dữ liệu không nhất quán khi có lỗi giữa chừng.",
      "en": "The ACID Atomicity principle requires a transaction to be all-or-nothing: fully applied or fully rolled back. Testers must verify the database never ends up in an inconsistent state after a mid-transaction failure.",
      "ja": "ACID原則の原子性（Atomicity）は、トランザクションが完全に実行されるか完全にロールバックされるかのどちらかであることを要求します。テスターは、途中失敗時にデータベースが不整合な状態にならないことを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn cần kiểm tra xem một chỉ số (index) có được sử dụng đúng cách hay không khi truy vấn dữ liệu lớn. Công cụ/cú pháp nào thường dùng để xem kế hoạch thực thi truy vấn?",
      "en": "You need to verify whether an index is being used correctly for a large data query. Which command is commonly used to view the query execution plan?",
      "ja": "大量データのクエリでインデックスが正しく使われているか確認する必要があります。クエリ実行計画を確認するために一般的に使われるコマンドはどれですか。"
    },
    "options": [
      {
        "vi": "TRUNCATE TABLE",
        "en": "TRUNCATE TABLE",
        "ja": "TRUNCATE TABLE"
      },
      {
        "vi": "BACKUP DATABASE",
        "en": "BACKUP DATABASE",
        "ja": "BACKUP DATABASE"
      },
      {
        "vi": "EXPLAIN (hoặc EXPLAIN PLAN)",
        "en": "EXPLAIN (or EXPLAIN PLAN)",
        "ja": "EXPLAIN（またはEXPLAIN PLAN）"
      },
      {
        "vi": "GRANT SELECT",
        "en": "GRANT SELECT",
        "ja": "GRANT SELECT"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "EXPLAIN (hoặc EXPLAIN PLAN tùy hệ quản trị) cho biết cách database thực thi truy vấn, bao gồm việc có sử dụng index hay quét toàn bảng (full table scan), hữu ích khi test hiệu năng liên quan tới dữ liệu.",
      "en": "EXPLAIN (or EXPLAIN PLAN depending on the DBMS) shows how the database executes a query, including whether an index is used or a full table scan occurs — useful for data-related performance testing.",
      "ja": "EXPLAIN（DBMSによってはEXPLAIN PLAN）は、インデックスが使われているかフルテーブルスキャンになっているかなど、データベースがクエリをどう実行するかを示し、データ関連のパフォーマンステストに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác biệt chính giữa lệnh TRUNCATE và DELETE khi dọn dữ liệu test là gì?",
      "en": "What is the key difference between TRUNCATE and DELETE when clearing test data?",
      "ja": "テストデータをクリアする際、TRUNCATEとDELETEの主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "TRUNCATE và DELETE hoàn toàn giống nhau, không có khác biệt",
        "en": "TRUNCATE and DELETE are completely identical",
        "ja": "TRUNCATEとDELETEは完全に同じで違いはない"
      },
      {
        "vi": "DELETE chỉ xóa được 100 dòng mỗi lần, TRUNCATE thì không giới hạn",
        "en": "DELETE can only remove 100 rows at a time, TRUNCATE has no limit",
        "ja": "DELETEは一度に100行しか削除できないが、TRUNCATEには制限がない"
      },
      {
        "vi": "TRUNCATE chỉ hoạt động trên view, không hoạt động trên bảng thật",
        "en": "TRUNCATE only works on views, not real tables",
        "ja": "TRUNCATEはビューにのみ機能し、実テーブルには機能しない"
      },
      {
        "vi": "TRUNCATE xóa toàn bộ dữ liệu nhanh, thường không dùng được WHERE và khó/không rollback trong một số hệ quản trị; DELETE có thể dùng WHERE và ghi log từng dòng",
        "en": "TRUNCATE quickly removes all data, usually cannot use WHERE and may be hard/impossible to roll back in some DBMS; DELETE supports WHERE and logs each row",
        "ja": "TRUNCATEは全データを高速に削除し、通常WHEREが使えず一部のDBMSではロールバックが困難/不可能。DELETEはWHEREが使え、行ごとにログを記録する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "TRUNCATE là thao tác DDL, xóa nhanh toàn bộ dữ liệu và reset auto-increment, thường không hỗ trợ WHERE; DELETE là DDL/DML có thể lọc điều kiện và ghi log giao dịch, tester cần chọn đúng lệnh khi chuẩn bị/dọn dữ liệu test.",
      "en": "TRUNCATE is a DDL operation that quickly clears all data and resets auto-increment, usually without WHERE support; DELETE is DML that can filter with conditions and logs transactions — testers must choose the right command when preparing/cleaning test data.",
      "ja": "TRUNCATEはDDL操作で全データを高速に削除しauto-incrementをリセットし、通常WHEREをサポートしません。DELETEは条件でフィルタでき、トランザクションログを残すDML操作です。テストデータの準備・クリーンアップ時には適切なコマンドを選ぶ必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test một stored procedure tính tổng doanh thu theo tháng, cách tiếp cận kiểm thử nào là ĐÚNG đắn nhất?",
      "en": "When testing a stored procedure that calculates monthly revenue, which testing approach is most correct?",
      "ja": "月次売上を計算するストアドプロシージャをテストする際、最も適切なアプローチはどれですか。"
    },
    "options": [
      {
        "vi": "Chuẩn bị dữ liệu đầu vào đã biết trước, tính tay kết quả mong đợi, rồi so sánh với kết quả procedure trả về",
        "en": "Prepare known input data, manually calculate the expected result, then compare with the procedure's output",
        "ja": "既知の入力データを用意し、期待結果を手計算した上でプロシージャの出力と比較する"
      },
      {
        "vi": "Chỉ kiểm tra procedure chạy không báo lỗi là đủ",
        "en": "Just checking the procedure runs without error is enough",
        "ja": "プロシージャがエラーなく実行されることだけを確認すれば十分"
      },
      {
        "vi": "Chỉ cần xem code của procedure, không cần chạy thử",
        "en": "Just review the procedure's code without executing it",
        "ja": "プロシージャのコードをレビューするだけで実行は不要"
      },
      {
        "vi": "Chạy procedure trên production trực tiếp để tiết kiệm thời gian",
        "en": "Run the procedure directly on production to save time",
        "ja": "時間節約のため本番環境で直接プロシージャを実行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cách kiểm thử đúng là chuẩn bị dữ liệu test có kết quả mong đợi được tính toán độc lập, sau đó đối chiếu với kết quả thực tế mà procedure trả về, đảm bảo logic tính toán chính xác.",
      "en": "The correct approach is to prepare test data with an independently calculated expected result, then compare it against the procedure's actual output to confirm the calculation logic is correct.",
      "ja": "正しいアプローチは、独立して計算した期待結果を持つテストデータを用意し、プロシージャの実際の出力と比較して計算ロジックの正確性を確認することです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tester cần kiểm tra một view (khung nhìn) trong database có phản ánh đúng dữ liệu real-time từ các bảng gốc hay không. Cách kiểm thử hợp lý là gì?",
      "en": "A tester needs to verify a database view reflects real-time data from its underlying tables correctly. What is a reasonable testing approach?",
      "ja": "テスターは、データベースのビューが元テーブルのリアルタイムデータを正しく反映しているか確認する必要があります。妥当なテスト方法は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm tra view một lần lúc tạo, không cần kiểm tra lại",
        "en": "Check the view only once at creation, no need to recheck",
        "ja": "作成時に一度確認すれば再確認は不要"
      },
      {
        "vi": "Cập nhật dữ liệu ở bảng gốc, sau đó truy vấn lại view để xác nhận thay đổi được phản ánh đúng",
        "en": "Update data in the underlying table, then query the view again to confirm the change is reflected correctly",
        "ja": "元テーブルのデータを更新し、ビューを再度クエリして変更が正しく反映されているか確認する"
      },
      {
        "vi": "Xóa view và tạo lại mỗi khi test",
        "en": "Drop and recreate the view every time you test",
        "ja": "テストのたびにビューを削除して再作成する"
      },
      {
        "vi": "So sánh tên cột của view với tên bảng gốc là đủ",
        "en": "Comparing the view's column names with the source table's names is sufficient",
        "ja": "ビューの列名と元テーブルの列名を比較すれば十分"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "View thường không lưu trữ dữ liệu riêng mà truy vấn động từ bảng gốc, nên cách kiểm thử đúng là thay đổi dữ liệu gốc rồi truy vấn lại view để xác nhận view phản ánh đúng thay đổi đó.",
      "en": "A view typically doesn't store its own data but queries the underlying tables dynamically, so the correct test is to change source data and re-query the view to confirm it reflects that change.",
      "ja": "ビューは通常、独自のデータを持たず元テーブルを動的にクエリするため、正しいテスト方法は元データを変更してからビューを再クエリし、その変更が正しく反映されているか確認することです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một bảng Products, cột \"price\" được định nghĩa kiểu INTEGER nhưng nghiệp vụ yêu cầu lưu giá có phần thập phân (VD: 19.99). Đây là loại lỗi gì cần báo cáo?",
      "en": "In a Products table, the \"price\" column is defined as INTEGER, but the business requires storing decimal prices (e.g., 19.99). What kind of defect should be reported?",
      "ja": "Productsテーブルの「price」列がINTEGER型で定義されていますが、業務要件では小数点のある価格（例：19.99）を保存する必要があります。どのような欠陥として報告すべきですか。"
    },
    "options": [
      {
        "vi": "Lỗi giao diện người dùng (UI defect)",
        "en": "A UI defect",
        "ja": "UI欠陥"
      },
      {
        "vi": "Lỗi bảo mật (security defect)",
        "en": "A security defect",
        "ja": "セキュリティ欠陥"
      },
      {
        "vi": "Lỗi thiết kế kiểu dữ liệu (schema/data type mismatch với yêu cầu nghiệp vụ)",
        "en": "A data type/schema design defect (mismatch with business requirements)",
        "ja": "データ型/スキーマ設計の欠陥（業務要件との不一致）"
      },
      {
        "vi": "Lỗi hiệu năng (performance defect)",
        "en": "A performance defect",
        "ja": "パフォーマンス欠陥"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi kiểu dữ liệu cột không phù hợp với yêu cầu nghiệp vụ (INTEGER không lưu được số thập phân), đây là lỗi thiết kế schema/kiểu dữ liệu cần báo cáo cho đội phát triển sửa thành DECIMAL/NUMERIC.",
      "en": "When a column's data type doesn't match business requirements (INTEGER cannot store decimals), this is a schema/data type design defect that should be reported to change it to DECIMAL/NUMERIC.",
      "ja": "列のデータ型が業務要件に合っていない場合（INTEGERは小数を保存できない）、これはスキーマ/データ型設計の欠陥であり、DECIMAL/NUMERICへの変更を求めて報告すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test một API tạo mới người dùng, tester nên kiểm tra điều gì ở tầng database sau khi gọi API thành công?",
      "en": "When testing a create-user API, what should a tester verify at the database level after a successful call?",
      "ja": "ユーザー作成APIをテストする際、API呼び出し成功後にデータベース層で何を確認すべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần API trả về mã 200 là đủ, không cần kiểm tra database",
        "en": "An HTTP 200 response is enough; no need to check the database",
        "ja": "HTTP 200が返れば十分でデータベースの確認は不要"
      },
      {
        "vi": "Không cần kiểm tra gì thêm vì database luôn đúng",
        "en": "No further checks needed since the database is always correct",
        "ja": "データベースは常に正しいので追加確認は不要"
      },
      {
        "vi": "Kiểm tra màu nút bấm trên giao diện tạo người dùng",
        "en": "Check the button color on the create-user screen",
        "ja": "ユーザー作成画面のボタンの色を確認する"
      },
      {
        "vi": "Bản ghi mới thực sự được insert đúng vào bảng Users với đầy đủ giá trị các cột như yêu cầu",
        "en": "The new record is actually inserted into the Users table with all column values correct as required",
        "ja": "新しいレコードが要件通りの列値を持ってUsersテーブルに実際に挿入されていること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "API trả về thành công không đảm bảo dữ liệu được lưu đúng; tester cần truy vấn trực tiếp database để xác minh bản ghi mới tồn tại và các giá trị cột khớp với dữ liệu đã gửi.",
      "en": "A successful API response doesn't guarantee correct persistence; testers should query the database directly to confirm the new record exists and column values match the submitted data.",
      "ja": "APIが成功を返しても正しく保存されたとは限らないため、テスターはデータベースを直接クエリして新レコードの存在と列値が送信データと一致することを確認すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn cần kiểm tra xem cột \"status\" trong bảng Orders có chứa giá trị nào ngoài danh sách hợp lệ (\"pending\", \"shipped\", \"cancelled\") hay không. Câu SQL nào phù hợp?",
      "en": "You need to check whether the \"status\" column in the Orders table contains any value outside the valid list (\"pending\", \"shipped\", \"cancelled\"). Which SQL is appropriate?",
      "ja": "Ordersテーブルの「status」列に有効なリスト（\"pending\", \"shipped\", \"cancelled\"）以外の値が含まれていないか確認する必要があります。適切なSQLはどれですか。"
    },
    "options": [
      {
        "vi": "SELECT * FROM Orders WHERE status NOT IN ('pending','shipped','cancelled')",
        "en": "SELECT * FROM Orders WHERE status NOT IN ('pending','shipped','cancelled')",
        "ja": "SELECT * FROM Orders WHERE status NOT IN ('pending','shipped','cancelled')"
      },
      {
        "vi": "SELECT * FROM Orders WHERE status IN ('pending','shipped','cancelled')",
        "en": "SELECT * FROM Orders WHERE status IN ('pending','shipped','cancelled')",
        "ja": "SELECT * FROM Orders WHERE status IN ('pending','shipped','cancelled')"
      },
      {
        "vi": "SELECT COUNT(*) FROM Orders",
        "en": "SELECT COUNT(*) FROM Orders",
        "ja": "SELECT COUNT(*) FROM Orders"
      },
      {
        "vi": "SELECT * FROM Orders ORDER BY status",
        "en": "SELECT * FROM Orders ORDER BY status",
        "ja": "SELECT * FROM Orders ORDER BY status"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dùng NOT IN với danh sách giá trị hợp lệ sẽ trả về những bản ghi có giá trị status nằm ngoài danh sách cho phép, giúp phát hiện dữ liệu bất thường (invalid enum/data).",
      "en": "Using NOT IN with the list of valid values returns records whose status falls outside the allowed set, helping detect invalid enum/data anomalies.",
      "ja": "有効な値のリストに対してNOT INを使うことで、許可されたセット外のstatus値を持つレコードを抽出でき、異常な列挙値/データを検出できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong kiểm thử database, việc so sánh dữ liệu snapshot trước và sau khi thực hiện một chức năng nghiệp vụ (VD: hủy đơn hàng) được gọi là kỹ thuật gì?",
      "en": "In database testing, comparing a data snapshot before and after executing a business function (e.g., cancelling an order) is called what technique?",
      "ja": "データベーステストにおいて、業務機能（例：注文キャンセル）実行前後のデータスナップショットを比較する手法は何と呼ばれますか。"
    },
    "options": [
      {
        "vi": "Load testing",
        "en": "Load testing",
        "ja": "負荷テスト"
      },
      {
        "vi": "Before/After data comparison (kiểm tra ảnh hưởng dữ liệu trước-sau)",
        "en": "Before/After data comparison (verifying data impact)",
        "ja": "前後データ比較（Before/After data comparison）"
      },
      {
        "vi": "Usability testing",
        "en": "Usability testing",
        "ja": "ユーザビリティテスト"
      },
      {
        "vi": "Compatibility testing",
        "en": "Compatibility testing",
        "ja": "互換性テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kỹ thuật so sánh dữ liệu trước và sau (before/after comparison) giúp xác minh chính xác chức năng nghiệp vụ đã thay đổi đúng những gì cần thay đổi trong database, không gây ảnh hưởng ngoài ý muốn tới dữ liệu khác.",
      "en": "Before/after data comparison verifies precisely what a business function changed in the database, ensuring no unintended side effects on other data.",
      "ja": "前後データ比較（before/after comparison）は、業務機能がデータベース内で意図した変更のみを正しく行い、他のデータに意図しない副作用を与えていないことを検証します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử phân trang (pagination) của một danh sách lấy từ database, tester nên xác minh điều gì để đảm bảo không thiếu hoặc lặp dữ liệu giữa các trang?",
      "en": "When testing pagination of a list retrieved from the database, what should a tester verify to ensure no missing or duplicate data across pages?",
      "ja": "データベースから取得するリストのページネーションをテストする際、ページ間でデータの欠落や重複がないことを確認するために何を確認すべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần kiểm tra trang đầu tiên hiển thị đúng là đủ",
        "en": "Only checking the first page displays correctly is enough",
        "ja": "最初のページが正しく表示されることだけ確認すれば十分"
      },
      {
        "vi": "Màu nền của mỗi trang có đồng nhất không",
        "en": "Whether each page's background color is consistent",
        "ja": "各ページの背景色が統一されているか"
      },
      {
        "vi": "Tổng số bản ghi qua tất cả các trang khớp với COUNT(*) thực tế trong database, và không có ID trùng lặp/thiếu giữa các trang khi dữ liệu không đổi",
        "en": "The total records across all pages match the actual COUNT(*) in the database, and there are no duplicate/missing IDs between pages when data is static",
        "ja": "全ページの合計レコード数が実際のCOUNT(*)と一致し、データが変わらない間はページ間でIDの重複・欠落がないこと"
      },
      {
        "vi": "Tốc độ tải trang có dưới 5 giây không",
        "en": "Whether the page loads in under 5 seconds",
        "ja": "ページの読み込みが5秒未満か"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tester cần đối chiếu tổng số bản ghi hiển thị qua các trang với COUNT(*) thực tế trong database, đồng thời kiểm tra không có bản ghi bị lặp hoặc bị bỏ sót giữa các trang, thường xảy ra do sắp xếp (ORDER BY) không ổn định.",
      "en": "Testers should reconcile the total records shown across pages with the actual COUNT(*) in the database, and check for no duplicated or skipped records between pages — often caused by unstable ORDER BY sorting.",
      "ja": "テスターは全ページに表示される合計レコード数を実際のCOUNT(*)と照合し、ページ間でレコードの重複や欠落がないか確認する必要があります。これは不安定なORDER BYソートが原因でよく発生します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn cần kiểm tra dữ liệu import từ file Excel vào database có đúng số lượng và không bị cắt xén ký tự (do giới hạn độ dài cột VARCHAR) hay không. Đây thuộc loại kiểm thử nào?",
      "en": "You need to verify data imported from an Excel file into the database has the correct row count and no truncated characters (due to VARCHAR length limits). What type of testing is this?",
      "ja": "Excelファイルからデータベースへインポートしたデータの件数が正しく、VARCHARの長さ制限による文字の切り捨てがないか確認する必要があります。これは何のテストに該当しますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử bảo mật (Security testing)",
        "en": "Security testing",
        "ja": "セキュリティテスト"
      },
      {
        "vi": "Kiểm thử khả năng tiếp cận (Accessibility testing)",
        "en": "Accessibility testing",
        "ja": "アクセシビリティテスト"
      },
      {
        "vi": "Kiểm thử giao diện (UI testing)",
        "en": "UI testing",
        "ja": "UIテスト"
      },
      {
        "vi": "Kiểm thử dữ liệu ETL/import (Data import/ETL validation)",
        "en": "ETL/data import validation testing",
        "ja": "ETL/データインポート検証テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm tra việc nạp dữ liệu từ nguồn ngoài (Excel, CSV) vào database, bao gồm số lượng bản ghi và tính toàn vẹn dữ liệu (không bị cắt xén, sai kiểu), thuộc phạm vi kiểm thử ETL/data import validation.",
      "en": "Verifying data loaded from an external source (Excel, CSV) into the database — including record counts and data integrity such as no truncation or type mismatch — falls under ETL/data import validation testing.",
      "ja": "Excel・CSVなどの外部ソースからデータベースへ読み込まれたデータのレコード数やデータ整合性（切り捨てや型不一致がないか）を確認することは、ETL/データインポート検証テストの範囲に含まれます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong test dữ liệu, \"data seeding\" (nạp dữ liệu mẫu) trước khi chạy test case có mục đích chính là gì?",
      "en": "In data testing, what is the primary purpose of \"data seeding\" before running test cases?",
      "ja": "データテストにおいて、テストケース実行前の「データシーディング」の主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Chuẩn bị trạng thái dữ liệu ban đầu xác định, giúp test case chạy lặp lại được và kết quả có thể dự đoán trước",
        "en": "Establish a known, deterministic initial data state so test cases are repeatable and results are predictable",
        "ja": "既知で決定的な初期データ状態を用意し、テストケースが再現可能で結果が予測できるようにする"
      },
      {
        "vi": "Tăng dung lượng ổ cứng của server test",
        "en": "Increase the test server's disk capacity",
        "ja": "テストサーバーのディスク容量を増やす"
      },
      {
        "vi": "Xóa toàn bộ dữ liệu production để tiết kiệm chi phí",
        "en": "Delete all production data to save costs",
        "ja": "コスト削減のため本番データをすべて削除する"
      },
      {
        "vi": "Mã hóa dữ liệu trước khi gửi cho khách hàng",
        "en": "Encrypt data before sending it to customers",
        "ja": "顧客に送る前にデータを暗号化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Data seeding tạo ra một trạng thái dữ liệu đầu vào cố định và đã biết trước, giúp test case chạy độc lập, lặp lại được (repeatable) và kết quả mong đợi có thể xác định rõ ràng.",
      "en": "Data seeding creates a fixed, known initial data state so test cases run independently and repeatably, with clearly determinable expected outcomes.",
      "ja": "データシーディングは既知で固定された初期データ状態を作成し、テストケースが独立して再現可能に実行でき、期待結果を明確に判断できるようにします。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi hai tester cùng chạy test song song trên cùng một database dùng chung, họ gặp hiện tượng dữ liệu của người này bị người kia ghi đè/xóa nhầm. Vấn đề này gọi là gì và cách khắc phục phổ biến?",
      "en": "Two testers running parallel tests on a shared database find one tester's data gets overwritten/deleted by the other. What is this issue called and what is a common fix?",
      "ja": "2人のテスターが共有データベースで並行してテストを実行すると、片方のデータがもう片方によって上書き/削除されてしまいます。この問題は何と呼ばれ、一般的な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Lỗi mạng; khắc phục bằng cách tăng băng thông",
        "en": "A network error; fixed by increasing bandwidth",
        "ja": "ネットワークエラーであり、帯域幅を増やして対処する"
      },
      {
        "vi": "Xung đột dữ liệu test dùng chung (test data contention); khắc phục bằng cách cô lập dữ liệu test (VD: schema/prefix riêng cho mỗi tester) hoặc dùng database riêng biệt",
        "en": "Shared test-data contention; fixed by isolating test data (e.g., separate schema/prefix per tester) or using separate databases",
        "ja": "共有テストデータの競合であり、テストデータを分離（テスターごとに別スキーマ/プレフィックスなど）するか、個別のデータベースを使うことで対処する"
      },
      {
        "vi": "Lỗi cú pháp SQL; khắc phục bằng cách viết lại câu lệnh",
        "en": "A SQL syntax error; fixed by rewriting the query",
        "ja": "SQL構文エラーであり、クエリを書き直して対処する"
      },
      {
        "vi": "Lỗi giao diện; khắc phục bằng cách refresh trình duyệt",
        "en": "A UI error; fixed by refreshing the browser",
        "ja": "UIエラーであり、ブラウザを更新して対処する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây là vấn đề xung đột dữ liệu test khi nhiều người dùng chung một database, thường khắc phục bằng cách cô lập dữ liệu (schema/prefix/tenant riêng cho mỗi tester) hoặc cấp môi trường/database riêng biệt cho từng luồng test.",
      "en": "This is test data contention when multiple testers share one database, commonly fixed by isolating data (separate schema/prefix/tenant per tester) or provisioning a separate environment/database per test stream.",
      "ja": "これは複数人が同じデータベースを共有することによるテストデータ競合であり、一般的にはデータを分離（テスターごとの別スキーマ/プレフィックス/テナント）するか、各テスト系統に個別の環境/データベースを用意することで対処します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn muốn kiểm tra một cột \"created_at\" luôn có giá trị nhỏ hơn hoặc bằng \"updated_at\" trong toàn bộ bảng. Cách tiếp cận SQL nào giúp tìm ra vi phạm?",
      "en": "You want to verify that \"created_at\" is always less than or equal to \"updated_at\" across an entire table. Which SQL approach finds violations?",
      "ja": "テーブル全体で「created_at」が常に「updated_at」以下であることを確認したいです。違反を見つけるSQLアプローチはどれですか。"
    },
    "options": [
      {
        "vi": "SELECT COUNT(*) FROM table",
        "en": "SELECT COUNT(*) FROM table",
        "ja": "SELECT COUNT(*) FROM table"
      },
      {
        "vi": "SELECT * FROM table WHERE created_at = updated_at",
        "en": "SELECT * FROM table WHERE created_at = updated_at",
        "ja": "SELECT * FROM table WHERE created_at = updated_at"
      },
      {
        "vi": "SELECT * FROM table WHERE created_at > updated_at",
        "en": "SELECT * FROM table WHERE created_at > updated_at",
        "ja": "SELECT * FROM table WHERE created_at > updated_at"
      },
      {
        "vi": "SELECT * FROM table ORDER BY created_at DESC LIMIT 1",
        "en": "SELECT * FROM table ORDER BY created_at DESC LIMIT 1",
        "ja": "SELECT * FROM table ORDER BY created_at DESC LIMIT 1"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Truy vấn lọc những dòng có created_at lớn hơn updated_at sẽ trực tiếp chỉ ra các bản ghi vi phạm logic nghiệp vụ (thời điểm tạo phải trước hoặc bằng thời điểm cập nhật), đây là kỹ thuật kiểm tra tính nhất quán dữ liệu thời gian phổ biến.",
      "en": "Filtering rows where created_at is greater than updated_at directly reveals records that violate the business rule (creation time must be before or equal to update time) — a common data time-consistency check.",
      "ja": "created_atがupdated_atより大きい行をフィルタすることで、業務ルール（作成日時は更新日時以前でなければならない）に違反するレコードを直接発見できます。これはデータの時系列整合性を確認する一般的な手法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Cross-browser testing là gì trong kiểm thử web?",
      "en": "What is cross-browser testing in web testing?",
      "ja": "ウェブテストにおけるクロスブラウザテストとは何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ kiểm tra ứng dụng trên trình duyệt được nhiều người dùng nhất để tiết kiệm thời gian",
        "en": "Testing the application only on the most popular browser to save time",
        "ja": "最も利用者の多いブラウザだけでアプリケーションをテストして時間を節約すること"
      },
      {
        "vi": "Kiểm tra khả năng chống tấn công của trình duyệt",
        "en": "Testing the browser's resistance to attacks",
        "ja": "ブラウザの攻撃耐性をテストすること"
      },
      {
        "vi": "Kiểm tra tốc độ tải trang khi mạng yếu",
        "en": "Testing page load speed under weak network conditions",
        "ja": "ネットワークが弱い状況でのページ読み込み速度をテストすること"
      },
      {
        "vi": "Kiểm tra ứng dụng web hoạt động và hiển thị đúng trên nhiều trình duyệt, hệ điều hành khác nhau",
        "en": "Verifying the web application functions and displays correctly across multiple browsers and operating systems",
        "ja": "ウェブアプリケーションが複数の異なるブラウザやOS上で正しく動作し表示されるかを検証すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mục tiêu chính là đảm bảo giao diện và chức năng nhất quán trên các trình duyệt, phiên bản và hệ điều hành khác nhau vì mỗi engine render (Blink, Gecko, WebKit) có thể xử lý CSS/JS khác nhau.",
      "en": "The main goal is ensuring consistent UI and functionality across different browsers, versions, and operating systems since each rendering engine may handle CSS/JS differently.",
      "ja": "各ブラウザのレンダリングエンジン(Blink、Gecko、WebKitなど)はCSSやJavaScriptの処理が異なるため、複数のブラウザ・バージョン・OSで表示と機能が一貫していることを確認するのが目的です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Công cụ nào sau đây thường được dùng để thực hiện cross-browser testing trên nhiều trình duyệt/thiết bị mà không cần cài đặt thật?",
      "en": "Which tool is commonly used to perform cross-browser testing across many browsers/devices without physically installing them?",
      "ja": "実機やブラウザを物理的にインストールせずに複数のブラウザ・デバイスでクロスブラウザテストを行うためによく使われるツールはどれですか?"
    },
    "options": [
      {
        "vi": "BrowserStack hoặc Sauce Labs",
        "en": "BrowserStack or Sauce Labs",
        "ja": "BrowserStackやSauce Labs"
      },
      {
        "vi": "JMeter",
        "en": "JMeter",
        "ja": "JMeter"
      },
      {
        "vi": "Postman",
        "en": "Postman",
        "ja": "Postman"
      },
      {
        "vi": "Notepad++",
        "en": "Notepad++",
        "ja": "Notepad++"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "BrowserStack, Sauce Labs, LambdaTest... cung cấp môi trường trình duyệt và thiết bị thật/ảo trên cloud, giúp tester kiểm tra đa nền tảng mà không cần sắm thiết bị vật lý.",
      "en": "BrowserStack, Sauce Labs, LambdaTest, etc. provide real/virtual browser and device environments on the cloud, letting testers check multiple platforms without owning physical devices.",
      "ja": "BrowserStackやSauce Labs、LambdaTestなどはクラウド上で実機・仮想ブラウザ環境を提供し、物理デバイスを用意せずに複数プラットフォームでの確認を可能にします。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong kiểm thử responsive, \"breakpoint\" là gì?",
      "en": "In responsive testing, what is a \"breakpoint\"?",
      "ja": "レスポンシブテストにおける「ブレークポイント」とは何ですか?"
    },
    "options": [
      {
        "vi": "Điểm dừng trong code để debug JavaScript",
        "en": "A point in the code where execution pauses for debugging JavaScript",
        "ja": "JavaScriptのデバッグ時に実行を一時停止させるコード上の地点"
      },
      {
        "vi": "Độ rộng màn hình cụ thể mà tại đó bố cục giao diện thay đổi để phù hợp kích thước thiết bị",
        "en": "A specific screen width at which the layout changes to adapt to the device size",
        "ja": "その画面幅を境にレイアウトがデバイスサイズに合わせて変化する特定の幅"
      },
      {
        "vi": "Thời điểm server bị sập khi tải cao",
        "en": "The moment the server crashes under high load",
        "ja": "高負荷時にサーバーがダウンする瞬間"
      },
      {
        "vi": "Giới hạn số request API cho phép mỗi giây",
        "en": "The limit on the number of API requests allowed per second",
        "ja": "1秒あたりに許可されるAPIリクエスト数の上限"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Breakpoint là các mốc chiều rộng màn hình (ví dụ 576px, 768px, 992px, 1200px) mà CSS responsive dùng để chuyển đổi bố cục; tester cần kiểm tra giao diện quanh các mốc này.",
      "en": "Breakpoints are screen-width thresholds (e.g. 576px, 768px, 992px, 1200px) used by responsive CSS to switch layouts; testers should check the UI around these thresholds.",
      "ja": "ブレークポイントとはレスポンシブCSSがレイアウトを切り替える画面幅の基準値(例: 576px、768px、992px、1200pxなど)で、テスターはその境界付近のUIを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử responsive, cách nào KHÔNG đủ để đảm bảo chất lượng nếu chỉ dùng một mình?",
      "en": "When testing responsiveness, which method is NOT sufficient on its own to ensure quality?",
      "ja": "レスポンシブテストにおいて、それだけでは品質を保証するのに不十分な方法はどれですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra cả hướng dọc và ngang (portrait/landscape)",
        "en": "Testing both portrait and landscape orientations",
        "ja": "縦向き・横向き両方の向きで確認する"
      },
      {
        "vi": "Kiểm tra trên nhiều thiết bị thật với kích thước màn hình khác nhau",
        "en": "Testing on multiple real devices with different screen sizes",
        "ja": "画面サイズの異なる複数の実機で確認する"
      },
      {
        "vi": "Chỉ dùng chế độ Responsive Design Mode/DevTools của trình duyệt, không kiểm tra trên thiết bị thật",
        "en": "Only using the browser's DevTools responsive/device mode without testing on real devices",
        "ja": "ブラウザのDevToolsのレスポンシブ／デバイスモードのみを使用し、実機で確認しない"
      },
      {
        "vi": "Kiểm tra ở các breakpoint quan trọng và giữa các breakpoint",
        "en": "Testing at key breakpoints and in-between them",
        "ja": "主要なブレークポイントとその間の幅で確認する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DevTools mô phỏng kích thước màn hình nhưng không phản ánh chính xác cách trình duyệt thật, độ phân giải, cảm ứng, hiệu năng thiết bị nên cần kết hợp kiểm tra trên thiết bị thật.",
      "en": "DevTools simulates screen sizes but doesn't accurately reflect real browser rendering, resolution, touch behavior, or device performance, so real-device testing should also be included.",
      "ja": "DevToolsは画面サイズをシミュレートしますが、実際のブラウザの描画や解像度、タッチ操作、端末性能を正確に反映しないため、実機での確認も併用する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Cookie trong ứng dụng web dùng để làm gì, xét từ góc độ tester khi thiết kế test case?",
      "en": "From a tester's perspective when designing test cases, what is a cookie used for in a web application?",
      "ja": "テストケース設計の観点から、ウェブアプリケーションにおけるクッキーは何のために使われますか?"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho việc kiểm thử bảo mật",
        "en": "Completely replacing the need for security testing",
        "ja": "セキュリティテストを完全に代替するため"
      },
      {
        "vi": "Mã hóa toàn bộ database của hệ thống",
        "en": "Encrypting the entire system database",
        "ja": "システムのデータベース全体を暗号化するため"
      },
      {
        "vi": "Tăng tốc độ xử lý của server backend",
        "en": "Speeding up backend server processing",
        "ja": "バックエンドサーバーの処理速度を上げるため"
      },
      {
        "vi": "Lưu trữ thông tin nhỏ phía trình duyệt để ghi nhớ trạng thái/thông tin người dùng giữa các lần truy cập",
        "en": "Storing small pieces of data on the browser side to remember user state/information across visits",
        "ja": "ブラウザ側に小さなデータを保存し、複数回のアクセス間でユーザーの状態や情報を記憶するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cookie là dữ liệu nhỏ trình duyệt lưu lại (ví dụ session id, ngôn ngữ, giỏ hàng) để server nhận diện và ghi nhớ trạng thái người dùng; tester cần kiểm tra việc tạo, hết hạn, xóa cookie ảnh hưởng ra sao đến hành vi ứng dụng.",
      "en": "Cookies are small pieces of data stored by the browser (e.g. session id, language, cart) so the server can recognize and remember user state; testers should verify how creating, expiring, and deleting cookies affects app behavior.",
      "ja": "クッキーはブラウザに保存される小さなデータ(セッションIDや言語設定、カート情報など)で、サーバーがユーザーの状態を識別・記憶するために使われます。テスターはクッキーの生成・期限切れ・削除がアプリの動作にどう影響するかを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Điểm khác biệt cơ bản giữa cookie và session là gì?",
      "en": "What is the fundamental difference between a cookie and a session?",
      "ja": "クッキーとセッションの基本的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Cookie lưu dữ liệu ở phía client (trình duyệt), còn session lưu dữ liệu ở phía server và thường chỉ dùng cookie/token để tham chiếu tới session đó",
        "en": "Cookies store data on the client (browser) side, while sessions store data on the server side, typically referenced via a cookie/token",
        "ja": "クッキーはクライアント(ブラウザ)側にデータを保存するのに対し、セッションはサーバー側にデータを保存し、通常はクッキーやトークンでそのセッションを参照する"
      },
      {
        "vi": "Cookie lưu trên server, session lưu trên trình duyệt",
        "en": "Cookies are stored on the server, sessions are stored in the browser",
        "ja": "クッキーはサーバーに保存され、セッションはブラウザに保存される"
      },
      {
        "vi": "Cookie chỉ dùng cho ứng dụng di động, session chỉ dùng cho web",
        "en": "Cookies are only used for mobile apps, sessions are only used for web",
        "ja": "クッキーはモバイルアプリのみ、セッションはウェブのみで使われる"
      },
      {
        "vi": "Cookie và session hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "Cookies and sessions are exactly the same, just different names",
        "ja": "クッキーとセッションはまったく同じもので、名前が違うだけである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cookie lưu ở client, có thể chứa session id để server tra cứu dữ liệu session tương ứng lưu ở phía server (hoặc kho lưu trữ session); tester cần phân biệt để kiểm tra đúng nơi lưu trữ, thời gian sống, và bảo mật.",
      "en": "Cookies live on the client and often carry a session id the server uses to look up server-side session data; testers need to distinguish these to verify storage location, lifetime, and security correctly.",
      "ja": "クッキーはクライアント側に保存され、多くの場合セッションIDを保持し、サーバーはそれを使ってサーバー側のセッションデータを参照します。テスターは保存場所や有効期間、セキュリティを正しく検証するためにこの違いを理解する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Để kiểm tra tính năng hết hạn phiên đăng nhập (session timeout) sau 30 phút không hoạt động, cách tiếp cận nào hợp lý nhất?",
      "en": "To test a session timeout feature that expires after 30 minutes of inactivity, which approach is most reasonable?",
      "ja": "30分間操作がないとセッションが期限切れになる機能をテストする際、最も合理的なアプローチはどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ đọc tài liệu yêu cầu rồi kết luận tính năng đúng mà không thao tác thực tế",
        "en": "Just read the requirement document and conclude the feature is correct without actually testing it",
        "ja": "要件ドキュメントを読むだけで、実際に操作せずに機能が正しいと結論づける"
      },
      {
        "vi": "Để hệ thống chạy tự nhiên đủ 30 phút không thao tác rồi kiểm tra, hoặc chỉnh thời gian hệ thống/cấu hình timeout ngắn hơn để kiểm thử nhanh, sau đó xác nhận session bị vô hiệu và người dùng bị yêu cầu đăng nhập lại",
        "en": "Let the system idle naturally for 30 minutes and verify, or adjust system clock/timeout config to a shorter value for faster testing, then confirm the session is invalidated and the user is prompted to log in again",
        "ja": "実際に30分間操作せずに待って確認するか、テストを速く行うためにシステム時刻やタイムアウト設定を短く調整し、その後セッションが無効化されて再ログインを求められることを確認する"
      },
      {
        "vi": "Xóa toàn bộ lịch sử trình duyệt và coi đó là kiểm tra session timeout",
        "en": "Clear the entire browser history and consider that as testing session timeout",
        "ja": "ブラウザの履歴をすべて消去し、それをセッションタイムアウトのテストとみなす"
      },
      {
        "vi": "Chỉ kiểm tra trên một trình duyệt duy nhất là đủ, không cần xác nhận hành vi khi hết hạn",
        "en": "Testing on a single browser only is enough, no need to confirm the expiry behavior",
        "ja": "1つのブラウザだけでテストすれば十分で、期限切れ時の挙動を確認する必要はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cần thực sự tạo điều kiện không hoạt động đủ thời gian (hoặc điều chỉnh cấu hình để rút ngắn thời gian test) rồi xác minh hệ thống thực sự vô hiệu hóa phiên và chuyển hướng/yêu cầu đăng nhập lại, đúng như đặc tả.",
      "en": "You need to actually create the idle condition for the required duration (or adjust config to shorten it for testing) and then verify the system truly invalidates the session and redirects/prompts re-login as specified.",
      "ja": "実際に必要な時間だけ操作しない状態を作る(またはテスト用に設定を短縮する)ことで、システムが本当にセッションを無効化し、仕様どおり再ログインを求めるかを検証する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử form đăng ký có trường \"Email\" bắt buộc, test case nào KHÔNG cần thiết?",
      "en": "When testing a registration form with a required \"Email\" field, which test case is unnecessary?",
      "ja": "「メールアドレス」が必須項目の登録フォームをテストする際、不要なテストケースはどれですか?"
    },
    "options": [
      {
        "vi": "Để trống trường Email và bấm Submit, kiểm tra thông báo lỗi hiển thị",
        "en": "Leave the Email field empty and click Submit, check the error message displays",
        "ja": "メールアドレスを空欄のまま送信し、エラーメッセージが表示されるか確認する"
      },
      {
        "vi": "Nhập email sai định dạng (ví dụ \"abc@\") và kiểm tra thông báo lỗi",
        "en": "Enter an invalid email format (e.g. \"abc@\") and check the error message",
        "ja": "不正な形式のメールアドレス(例: 「abc@」)を入力しエラーメッセージを確認する"
      },
      {
        "vi": "Kiểm tra màu nền của nút Submit có đúng mã màu thiết kế UI/UX theo pixel không, không liên quan chức năng",
        "en": "Check whether the Submit button background color matches the UI/UX design pixel-perfectly, unrelated to functionality",
        "ja": "機能とは無関係に、送信ボタンの背景色がUI/UXデザインのピクセル単位の色コードと一致するか確認する"
      },
      {
        "vi": "Nhập email hợp lệ và kiểm tra hệ thống chấp nhận, cho phép submit thành công",
        "en": "Enter a valid email and check the system accepts it, allowing successful submission",
        "ja": "有効なメールアドレスを入力し、システムが受け付けて送信が成功するか確認する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiểm tra pixel-perfect màu sắc thuộc phạm vi kiểm thử UI/visual testing chuyên biệt, không phải trọng tâm khi kiểm thử validate của trường bắt buộc; các test case còn lại đều trực tiếp liên quan đến logic validate.",
      "en": "Pixel-perfect color checking belongs to specialized visual/UI testing, not the focus when testing required-field validation; the other test cases directly relate to validation logic.",
      "ja": "ピクセル単位の色確認は専門的なビジュアル/UIテストの範囲であり、必須項目のバリデーションテストの焦点ではありません。他の選択肢はすべてバリデーションロジックに直接関係します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trường \"Họ tên\" giới hạn tối đa 50 ký tự. Test case nào kiểm tra giá trị biên (boundary) đúng cách nhất?",
      "en": "The \"Full name\" field has a maximum limit of 50 characters. Which test case correctly checks the boundary value?",
      "ja": "「氏名」フィールドの上限が50文字である場合、境界値を正しく検証するテストケースはどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ nhập 25 ký tự (một nửa giới hạn) và cho là đủ",
        "en": "Only enter 25 characters (half the limit) and consider it sufficient",
        "ja": "25文字(上限の半分)だけ入力し、それで十分とみなす"
      },
      {
        "vi": "Không cần kiểm tra giới hạn ký tự vì đây là lỗi hiếm gặp",
        "en": "No need to test the character limit since this is a rare bug",
        "ja": "これはまれなバグなので文字数制限のテストは不要である"
      },
      {
        "vi": "Chỉ nhập 1 ký tự và coi đó là kiểm tra biên đầy đủ",
        "en": "Only enter 1 character and consider that a full boundary test",
        "ja": "1文字だけ入力し、それを境界テストの全てとみなす"
      },
      {
        "vi": "Nhập đúng 50 ký tự (hợp lệ) và 51 ký tự (vượt giới hạn) để kiểm tra hệ thống chấp nhận/từ chối đúng như thiết kế",
        "en": "Enter exactly 50 characters (valid) and 51 characters (over the limit) to verify the system accepts/rejects correctly per design",
        "ja": "ちょうど50文字(有効)と51文字(上限超過)を入力し、設計どおりにシステムが受け入れる/拒否するかを確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kỹ thuật phân tích giá trị biên yêu cầu kiểm tra tại và ngay sát ranh giới (ở đây là 50 và 51) để phát hiện lỗi off-by-one thường gặp khi giới hạn độ dài không được xử lý đúng.",
      "en": "Boundary value analysis requires testing at and just beyond the boundary (here, 50 and 51) to catch common off-by-one errors when length limits aren't handled correctly.",
      "ja": "境界値分析では境界値およびそのすぐ外側(ここでは50と51)をテストし、文字数制限の処理が正しくない場合に起こりがちなオフバイワンエラーを検出する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử validate định dạng email, danh sách dữ liệu nào thể hiện tư duy kiểm thử tốt nhất?",
      "en": "When testing email format validation, which set of test data reflects the best testing mindset?",
      "ja": "メール形式のバリデーションをテストする際、最も優れたテスト思考を反映するテストデータの組み合わせはどれですか?"
    },
    "options": [
      {
        "vi": "Kết hợp email hợp lệ, thiếu \"@\", thiếu domain, khoảng trắng, ký tự đặc biệt không hợp lệ, và email hợp lệ có ký tự đặc biệt được phép (như dấu chấm, dấu gạch dưới)",
        "en": "Combine valid emails, missing \"@\", missing domain, whitespace, disallowed special characters, and valid emails with allowed special characters (like dots, underscores)",
        "ja": "有効なメール、「@」がないもの、ドメインがないもの、空白を含むもの、許可されない特殊文字を含むもの、そして許可された特殊文字(ピリオドやアンダースコアなど)を含む有効なメールを組み合わせる"
      },
      {
        "vi": "Chỉ test email để trống",
        "en": "Only test an empty email",
        "ja": "空のメールアドレスのみをテストする"
      },
      {
        "vi": "Chỉ test một email hợp lệ duy nhất, ví dụ \"a@b.com\"",
        "en": "Only test a single valid email, e.g. \"a@b.com\"",
        "ja": "「a@b.com」のような有効なメール1件だけをテストする"
      },
      {
        "vi": "Chỉ test bằng cách nhìn giao diện, không nhập dữ liệu thật",
        "en": "Only visually inspect the UI without entering real data",
        "ja": "実際のデータを入力せず、UIを目視するだけでテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử validate cần phủ cả trường hợp hợp lệ và không hợp lệ đa dạng (kỹ thuật phân vùng tương đương) để phát hiện lỗ hổng logic kiểm tra định dạng, không chỉ dừng ở một vài trường hợp đơn giản.",
      "en": "Validation testing should cover diverse valid and invalid cases (equivalence partitioning) to catch gaps in format-checking logic, not just a couple of simple cases.",
      "ja": "バリデーションテストは多様な有効・無効なケース(同値分割)をカバーし、形式チェックロジックの抜け漏れを検出する必要があり、単純なケースだけに留めるべきではありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trường \"Số điện thoại\" chỉ nên nhận giá trị số. Test case nào giúp phát hiện lỗi validate kiểu dữ liệu?",
      "en": "The \"Phone number\" field should only accept numeric values. Which test case helps detect data-type validation bugs?",
      "ja": "「電話番号」フィールドは数字のみを受け付けるべきです。データ型のバリデーションバグを検出するのに役立つテストケースはどれですか?"
    },
    "options": [
      {
        "vi": "Chỉ kiểm tra bằng cách đọc code frontend mà không thao tác thực tế",
        "en": "Only check by reading frontend code without actually interacting with the UI",
        "ja": "実際に操作せず、フロントエンドのコードを読むだけで確認する"
      },
      {
        "vi": "Nhập chữ cái hoặc ký tự đặc biệt (ví dụ \"abc123!@#\") và kiểm tra hệ thống có từ chối hợp lý không",
        "en": "Enter letters or special characters (e.g. \"abc123!@#\") and check whether the system rejects it appropriately",
        "ja": "文字や特殊文字(例: 「abc123!@#」)を入力し、システムが適切に拒否するか確認する"
      },
      {
        "vi": "Bỏ qua việc kiểm thử trường này vì ít quan trọng",
        "en": "Skip testing this field because it's unimportant",
        "ja": "重要ではないのでこのフィールドのテストを省略する"
      },
      {
        "vi": "Chỉ nhập toàn số hợp lệ và không thử gì khác",
        "en": "Only enter fully valid numbers and try nothing else",
        "ja": "完全に有効な数字のみを入力し、それ以外は試さない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử âm với dữ liệu sai kiểu (chữ, ký tự đặc biệt) giúp phát hiện lỗi khi validate không chặn được dữ liệu không hợp lệ, đây là một khía cạnh quan trọng khi kiểm tra trường số.",
      "en": "Negative testing with wrong-type data (letters, special characters) helps catch cases where validation fails to block invalid input, an important aspect of testing numeric fields.",
      "ja": "文字や特殊文字といった型違いのデータでネガティブテストを行うことで、バリデーションが不正な入力を防げていないケースを検出でき、数値フィールドのテストにおいて重要な観点です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tình huống nào dưới đây là ví dụ điển hình của lỗi cross-browser cần được ghi nhận?",
      "en": "Which scenario below is a typical example of a cross-browser bug that should be logged?",
      "ja": "以下のうち、記録すべき典型的なクロスブラウザバグの例はどれですか?"
    },
    "options": [
      {
        "vi": "Giao diện hiển thị đúng và giống nhau trên Chrome, Firefox, Safari",
        "en": "The UI displays correctly and identically on Chrome, Firefox, and Safari",
        "ja": "ChromeでもFirefoxでもSafariでも同じようにUIが正しく表示される"
      },
      {
        "vi": "Trang tải chậm khi mạng yếu trên mọi trình duyệt như nhau",
        "en": "The page loads slowly on weak networks equally across all browsers",
        "ja": "すべてのブラウザで、ネットワークが弱いときに同様にページの読み込みが遅い"
      },
      {
        "vi": "Nút bấm bị lệch vị trí, flexbox layout vỡ trên Safari nhưng hiển thị bình thường trên Chrome",
        "en": "A button is misaligned and the flexbox layout breaks on Safari but displays normally on Chrome",
        "ja": "SafariではボタンがずれてFlexboxレイアウトが崩れるが、Chromeでは正常に表示される"
      },
      {
        "vi": "Người dùng nhập sai mật khẩu và bị báo lỗi trên mọi trình duyệt",
        "en": "A user enters a wrong password and gets an error on every browser",
        "ja": "ユーザーが誤ったパスワードを入力すると、どのブラウザでもエラーが表示される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Lỗi cross-browser đặc trưng là hành vi/giao diện KHÁC NHAU giữa các trình duyệt do khác biệt trong engine render hoặc hỗ trợ CSS/JS, như flexbox vỡ trên Safari nhưng ổn trên Chrome.",
      "en": "A cross-browser bug is characterized by behavior/UI differing between browsers due to rendering engine or CSS/JS support differences, such as flexbox breaking on Safari but working fine on Chrome.",
      "ja": "クロスブラウザバグの特徴は、レンダリングエンジンやCSS/JSサポートの違いにより、ブラウザ間で挙動やUIが異なることです。例えばSafariではFlexboxが崩れるがChromeでは問題ない、というケースです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Thẻ meta viewport (`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`) thiếu trên trang web sẽ gây ra vấn đề gì mà tester cần phát hiện khi test responsive?",
      "en": "If a page is missing the viewport meta tag (`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`), what problem should a tester detect during responsive testing?",
      "ja": "viewportのmetaタグ(`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`)が抜けているページで、レスポンシブテスト時にテスターが検出すべき問題は何ですか?"
    },
    "options": [
      {
        "vi": "Chỉ ảnh hưởng tốc độ xử lý server, không liên quan giao diện",
        "en": "It only affects server processing speed, unrelated to the UI",
        "ja": "サーバーの処理速度にのみ影響し、UIとは無関係である"
      },
      {
        "vi": "Trang sẽ tự động hiển thị đẹp trên mọi thiết bị mà không cần thẻ này",
        "en": "The page will automatically display beautifully on all devices without this tag",
        "ja": "このタグがなくても、ページは自動的にどの端末でも美しく表示される"
      },
      {
        "vi": "Trang sẽ không load được trên bất kỳ trình duyệt nào",
        "en": "The page will fail to load on any browser",
        "ja": "どのブラウザでもページが読み込めなくなる"
      },
      {
        "vi": "Trên thiết bị di động, trang có thể hiển thị với kích thước desktop, chữ nhỏ, phải zoom/scroll ngang mới đọc được",
        "en": "On mobile devices, the page may render at desktop width, with tiny text requiring zoom/horizontal scroll to read",
        "ja": "モバイル端末では、ページがデスクトップ幅で表示され、文字が小さくなり、読むにはズームや横スクロールが必要になることがある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thiếu viewport meta khiến trình duyệt di động mặc định render theo chiều rộng desktop (thường 980px), làm giao diện thu nhỏ, chữ khó đọc và phải zoom/scroll ngang — đây là lỗi responsive phổ biến cần phát hiện.",
      "en": "Without the viewport meta tag, mobile browsers default to rendering at desktop width (often 980px), shrinking the layout, making text hard to read, and requiring zoom/horizontal scroll — a common responsive bug to catch.",
      "ja": "viewportのmetaタグがないと、モバイルブラウザはデフォルトでデスクトップ幅(多くの場合980px)でレンダリングするため、レイアウトが縮小され、文字が読みにくくなり、ズームや横スクロールが必要になります。これはよくあるレスポンシブの不具合です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Để kiểm tra tính năng \"Ghi nhớ đăng nhập\" (Remember me) hoạt động đúng, tester cần làm gì?",
      "en": "To verify the \"Remember me\" feature works correctly, what should a tester do?",
      "ja": "「ログイン情報を記憶する」(Remember me)機能が正しく動作するか検証するために、テスターは何をすべきですか?"
    },
    "options": [
      {
        "vi": "Đăng nhập, tick chọn \"Remember me\", đóng trình duyệt hoàn toàn rồi mở lại để kiểm tra người dùng vẫn còn đăng nhập",
        "en": "Log in with \"Remember me\" checked, fully close the browser, reopen it, and check the user is still logged in",
        "ja": "「Remember me」にチェックを入れてログインし、ブラウザを完全に閉じてから再度開き、ログイン状態が維持されているか確認する"
      },
      {
        "vi": "Chỉ cần kiểm tra checkbox có hiển thị đúng vị trí trên giao diện",
        "en": "Only check whether the checkbox displays in the correct UI position",
        "ja": "チェックボックスがUI上の正しい位置に表示されているかだけを確認する"
      },
      {
        "vi": "Không cần test vì đây là tính năng phụ, không ảnh hưởng nghiệp vụ",
        "en": "No need to test it since it's a minor feature with no business impact",
        "ja": "業務に影響しない補助的な機能なのでテストは不要である"
      },
      {
        "vi": "Chỉ test khi không tick chọn \"Remember me\"",
        "en": "Only test the scenario where \"Remember me\" is unchecked",
        "ja": "「Remember me」にチェックを入れない場合のみテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "\"Remember me\" thường dùng cookie có thời gian sống dài để duy trì phiên đăng nhập qua các lần đóng/mở trình duyệt, nên cần kiểm tra thực tế bằng cách đóng hẳn trình duyệt rồi mở lại để xác nhận hành vi.",
      "en": "\"Remember me\" typically uses a long-lived cookie to persist login across browser close/reopen, so the real test is closing the browser entirely and reopening it to confirm the behavior.",
      "ja": "「Remember me」は通常、有効期限の長いクッキーを使ってブラウザを閉じても再度開いてもログイン状態を維持します。そのため、実際にブラウザを完全に閉じて再度開き、挙動を確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Nếu tester xóa cookie trong khi đang đăng nhập (không dùng \"Remember me\"), kết quả mong đợi hợp lý nhất là gì?",
      "en": "If a tester deletes cookies while logged in (without \"Remember me\" enabled), what is the most reasonable expected result?",
      "ja": "「Remember me」を有効にせずログイン中にクッキーを削除した場合、最も妥当な期待結果は何ですか?"
    },
    "options": [
      {
        "vi": "Người dùng vẫn giữ nguyên phiên đăng nhập vĩnh viễn",
        "en": "The user's login session remains valid forever",
        "ja": "ユーザーのログインセッションは永久に維持される"
      },
      {
        "vi": "Phiên đăng nhập bị mất, người dùng cần đăng nhập lại vì thông tin phiên (session id) thường lưu trong cookie đã bị xóa",
        "en": "The login session is lost and the user needs to log in again, since session info (session id) typically stored in the cookie has been deleted",
        "ja": "セッション情報(セッションID)は通常クッキーに保存されているため、それが削除されるとログインセッションが失われ、再ログインが必要になる"
      },
      {
        "vi": "Ứng dụng bị crash hoàn toàn",
        "en": "The application completely crashes",
        "ja": "アプリケーションが完全にクラッシュする"
      },
      {
        "vi": "Dữ liệu trên server bị xóa theo",
        "en": "The server-side data gets deleted along with it",
        "ja": "サーバー側のデータも一緒に削除される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì session id thường được lưu trong cookie để trình duyệt gửi kèm mỗi request, xóa cookie đồng nghĩa server không còn nhận diện được phiên, buộc người dùng đăng nhập lại — đây là hành vi mong đợi và tester cần xác nhận.",
      "en": "Since the session id is typically stored in a cookie sent with each request, deleting it means the server can no longer identify the session, forcing re-login — this is the expected behavior testers should confirm.",
      "ja": "セッションIDは通常クッキーに保存され、各リクエストとともに送信されるため、それを削除するとサーバーがセッションを識別できなくなり、再ログインが必要になります。これは期待される挙動であり、テスターが確認すべき点です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Compatibility matrix\" (ma trận tương thích) trong dự án kiểm thử web thường liệt kê điều gì?",
      "en": "What does a \"compatibility matrix\" typically list in a web testing project?",
      "ja": "ウェブテストプロジェクトにおける「互換性マトリクス」には通常何が記載されますか?"
    },
    "options": [
      {
        "vi": "Sơ đồ kiến trúc hệ thống backend",
        "en": "The backend system architecture diagram",
        "ja": "バックエンドシステムのアーキテクチャ図"
      },
      {
        "vi": "Danh sách lương của các thành viên nhóm QA",
        "en": "The list of salaries of QA team members",
        "ja": "QAチームメンバーの給与一覧"
      },
      {
        "vi": "Danh sách các trình duyệt, phiên bản, hệ điều hành, độ phân giải màn hình cần kiểm thử theo yêu cầu dự án",
        "en": "The list of browsers, versions, operating systems, and screen resolutions required to be tested for the project",
        "ja": "プロジェクトの要件に基づいてテストすべきブラウザ、バージョン、OS、画面解像度の一覧"
      },
      {
        "vi": "Danh sách các bug đã đóng trong sprint trước",
        "en": "The list of bugs closed in the previous sprint",
        "ja": "前回のスプリントでクローズされたバグの一覧"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Compatibility matrix giúp nhóm xác định phạm vi kiểm thử cụ thể (trình duyệt/OS/thiết bị nào, phiên bản nào) dựa trên đối tượng người dùng mục tiêu, tránh kiểm thử tràn lan hoặc bỏ sót.",
      "en": "A compatibility matrix helps the team define the exact testing scope (which browsers/OS/devices/versions) based on the target user base, avoiding excessive or insufficient coverage.",
      "ja": "互換性マトリクスは、対象ユーザー層に基づいて具体的なテスト範囲(どのブラウザ・OS・端末・バージョン)を定め、過剰または不十分なテストを避けるのに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử form đặt hàng, tester bấm nút \"Đặt hàng\" nhiều lần liên tiếp thật nhanh. Rủi ro nào cần được kiểm tra?",
      "en": "When testing an order form, a tester rapidly clicks the \"Place Order\" button multiple times in quick succession. What risk should be checked?",
      "ja": "注文フォームをテストする際、テスターが「注文する」ボタンを短時間に連続して素早くクリックした場合、確認すべきリスクは何ですか?"
    },
    "options": [
      {
        "vi": "Không cần kiểm tra vì người dùng thực tế sẽ không bấm nhanh như vậy",
        "en": "No need to check this since real users would never click that fast",
        "ja": "実際のユーザーはそんなに素早くクリックしないので確認は不要である"
      },
      {
        "vi": "Kiểm tra màu sắc nút bấm có đổi khi hover không",
        "en": "Check whether the button color changes on hover",
        "ja": "ボタンをホバーしたときに色が変わるか確認する"
      },
      {
        "vi": "Kiểm tra font chữ trên nút có đúng thiết kế không",
        "en": "Check whether the button font matches the design",
        "ja": "ボタンのフォントがデザイン通りか確認する"
      },
      {
        "vi": "Kiểm tra xem hệ thống có tạo nhiều đơn hàng trùng lặp (duplicate submission) do thiếu cơ chế chống double-click hay không",
        "en": "Check whether the system creates duplicate orders due to a missing double-click/double-submit prevention mechanism",
        "ja": "二重クリック・二重送信防止の仕組みが欠けているために、システムが重複した注文を作成しないか確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Double submit là lỗi thường gặp khi form thiếu debounce/disable nút sau khi bấm hoặc idempotency ở backend, dẫn đến tạo trùng đơn hàng, trừ tiền nhiều lần — là rủi ro nghiệp vụ nghiêm trọng cần kiểm tra.",
      "en": "Double submission is a common bug when the form lacks button-disable/debounce or backend idempotency, leading to duplicate orders or multiple charges — a serious business risk to verify.",
      "ja": "二重送信は、フォームにボタンの無効化・デバウンス処理やバックエンドの冪等性が欠けている場合によく起こるバグで、重複注文や二重課金につながる可能性があるため、重大な業務リスクとして確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao tester nên kiểm tra một form CHỈ dùng placeholder mà không có label riêng cho từng trường?",
      "en": "Why should a tester flag a form that ONLY uses placeholders without separate labels for each field?",
      "ja": "各項目に個別のラベルがなく、プレースホルダーのみを使用しているフォームをテスターが指摘すべき理由は何ですか?"
    },
    "options": [
      {
        "vi": "Placeholder biến mất khi người dùng bắt đầu nhập, khiến người dùng dễ quên trường đó là gì, gây khó khăn về khả năng sử dụng và accessibility",
        "en": "Placeholder text disappears once the user starts typing, making it easy to forget what the field is for, which hurts usability and accessibility",
        "ja": "プレースホルダーはユーザーが入力を始めると消えてしまうため、その項目が何のためのものか忘れやすくなり、ユーザビリティとアクセシビリティに悪影響を与える"
      },
      {
        "vi": "Placeholder luôn hiển thị vĩnh viễn nên không có vấn đề gì",
        "en": "Placeholder text always displays permanently, so there is no issue",
        "ja": "プレースホルダーは常に表示され続けるので問題はない"
      },
      {
        "vi": "Placeholder làm chậm tốc độ tải trang đáng kể",
        "en": "Placeholder text significantly slows down page load",
        "ja": "プレースホルダーはページの読み込み速度を大きく低下させる"
      },
      {
        "vi": "Đây không phải là vấn đề tester cần quan tâm vì thuộc về thiết kế UI/UX",
        "en": "This is not something a tester needs to care about since it's purely a UI/UX design concern",
        "ja": "これは純粋にUI/UXデザインの問題であり、テスターが気にする必要はない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là vấn đề usability/accessibility thực tế: khi người dùng nhập dữ liệu, placeholder biến mất, họ có thể quên yêu cầu định dạng (ví dụ ngày sinh dạng dd/mm/yyyy), và trình đọc màn hình cũng khó nhận diện trường nếu thiếu label — tester nên ghi nhận là vấn đề chất lượng.",
      "en": "This is a real usability/accessibility concern: as users type, the placeholder vanishes and they may forget format requirements (e.g. dd/mm/yyyy for birthdate), and screen readers struggle to identify fields without labels — testers should flag it as a quality issue.",
      "ja": "これは実際のユーザビリティ・アクセシビリティの問題です。ユーザーが入力するとプレースホルダーが消え、フォーマット要件(例: 生年月日のdd/mm/yyyy形式)を忘れる可能性があり、ラベルがないとスクリーンリーダーもその項目を識別しにくくなります。テスターは品質上の問題として指摘すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử responsive, hình ảnh trên trang không tự co giãn mà tràn ra ngoài khung chứa trên màn hình nhỏ. Đây là lỗi thuộc loại nào?",
      "en": "When testing responsiveness, an image on the page doesn't scale down and overflows its container on small screens. What type of bug is this?",
      "ja": "レスポンシブテストにおいて、画像が縮小されず小さい画面でコンテナからはみ出す場合、これはどのような種類のバグですか?"
    },
    "options": [
      {
        "vi": "Lỗi bảo mật nghiêm trọng",
        "en": "A serious security vulnerability",
        "ja": "重大なセキュリティ脆弱性"
      },
      {
        "vi": "Lỗi giao diện responsive (thiếu max-width: 100% hoặc CSS responsive cho hình ảnh), gây trải nghiệm xấu và có thể gây scroll ngang không mong muốn",
        "en": "A responsive layout bug (missing max-width: 100% or responsive image CSS), causing a poor experience and possibly unwanted horizontal scroll",
        "ja": "レスポンシブレイアウトのバグ(max-width: 100%やレスポンシブ用CSSの欠如)で、体験が悪化し、意図しない横スクロールを引き起こす可能性がある"
      },
      {
        "vi": "Lỗi liên quan đến cơ sở dữ liệu backend",
        "en": "A backend database issue",
        "ja": "バックエンドのデータベースの問題"
      },
      {
        "vi": "Đây không phải là lỗi, chỉ là hành vi bình thường của trình duyệt",
        "en": "This is not a bug, just normal browser behavior",
        "ja": "これはバグではなく、ブラウザの通常の動作である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ảnh tràn khung là lỗi CSS responsive phổ biến (thường do thiếu `max-width: 100%; height: auto;`), gây scroll ngang và trải nghiệm kém trên thiết bị nhỏ — cần được ghi nhận trong test responsive.",
      "en": "An overflowing image is a common responsive CSS bug (often from missing `max-width: 100%; height: auto;`), causing horizontal scroll and a poor experience on small devices — it should be logged during responsive testing.",
      "ja": "画像がはみ出すのはよくあるレスポンシブCSSのバグ(多くの場合`max-width: 100%; height: auto;`の欠如が原因)で、小さい端末で横スクロールが発生し体験が悪化するため、レスポンシブテストで記録すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Từ góc độ manual tester (không chuyên sâu bảo mật), test case nào giúp phát hiện rủi ro cơ bản liên quan đến session?",
      "en": "From a manual tester's perspective (not a security specialist), which test case helps detect a basic session-related risk?",
      "ja": "セキュリティ専門家ではないマニュアルテスターの観点から、セッションに関する基本的なリスクを検出するのに役立つテストケースはどれですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra tốc độ gõ phím trên form đăng nhập",
        "en": "Check typing speed on the login form",
        "ja": "ログインフォームでのタイピング速度を確認する"
      },
      {
        "vi": "Kiểm tra font chữ trên trang đăng nhập",
        "en": "Check the font on the login page",
        "ja": "ログインページのフォントを確認する"
      },
      {
        "vi": "Đăng nhập trên trình duyệt A, sao chép session id/cookie sang trình duyệt B, kiểm tra xem có bị chiếm quyền truy cập trái phép hay không",
        "en": "Log in on Browser A, copy the session id/cookie to Browser B, and check whether unauthorized access is possible",
        "ja": "ブラウザAでログインし、セッションIDやクッキーをブラウザBにコピーして、不正にアクセスできてしまわないか確認する"
      },
      {
        "vi": "Kiểm tra logo công ty hiển thị đúng vị trí",
        "en": "Check the company logo displays in the correct position",
        "ja": "会社のロゴが正しい位置に表示されているか確認する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đây là test case cơ bản kiểm tra việc session/cookie có bị lộ và tái sử dụng trái phép hay không (một dạng session hijacking đơn giản); dù không sâu về bảo mật, tester manual vẫn nên thử để cảnh báo rủi ro sớm.",
      "en": "This is a basic test to check whether a session/cookie can be leaked and reused without authorization (a simple form of session hijacking); even without deep security expertise, manual testers should try this to flag risks early.",
      "ja": "これはセッションやクッキーが不正に流出・再利用されないかを確認する基本的なテストです(簡易的なセッションハイジャックの一種)。深いセキュリティ専門知識がなくても、マニュアルテスターは早期にリスクを指摘するためにこれを試すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ứng dụng dùng một tính năng JavaScript mới (ví dụ Optional Chaining `?.`) nhưng không hoạt động trên trình duyệt cũ như Internet Explorer 11. Đây là vấn đề gì cần được kiểm thử?",
      "en": "An application uses a modern JavaScript feature (e.g. Optional Chaining `?.`) that doesn't work on an old browser like Internet Explorer 11. What issue does this represent for testing?",
      "ja": "アプリケーションが最新のJavaScript機能(例: オプショナルチェイニング`?.`)を使用しているが、Internet Explorer 11のような古いブラウザで動作しない場合、これはテストにおいてどのような問題を表しますか?"
    },
    "options": [
      {
        "vi": "Không phải lỗi vì tất cả trình duyệt phải tự nâng cấp",
        "en": "Not a bug because all browsers must upgrade themselves",
        "ja": "すべてのブラウザが自動的にアップグレードするはずなのでバグではない"
      },
      {
        "vi": "Vấn đề về tốc độ mạng của người dùng",
        "en": "An issue with the user's network speed",
        "ja": "ユーザーのネットワーク速度の問題"
      },
      {
        "vi": "Vấn đề về cấu hình firewall server",
        "en": "An issue with the server firewall configuration",
        "ja": "サーバーのファイアウォール設定の問題"
      },
      {
        "vi": "Vấn đề tương thích trình duyệt (browser compatibility) do engine JS cũ không hỗ trợ cú pháp/API mới, cần xác định phạm vi trình duyệt hỗ trợ rõ ràng và kiểm thử tương ứng",
        "en": "A browser compatibility issue because the old JS engine doesn't support the new syntax/API, requiring a clearly defined supported-browser scope and corresponding testing",
        "ja": "古いJSエンジンが新しい構文やAPIをサポートしていないためのブラウザ互換性の問題であり、サポート対象ブラウザの範囲を明確に定義し、それに応じたテストを行う必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là lỗi tương thích trình duyệt điển hình: cú pháp/JS API mới không được các engine cũ hỗ trợ. Nhóm dự án cần thống nhất danh sách trình duyệt hỗ trợ (compatibility matrix) để tester biết phạm vi cần kiểm và báo cáo đúng mức độ nghiêm trọng.",
      "en": "This is a classic browser compatibility bug: new syntax/JS APIs aren't supported by older engines. The team needs an agreed supported-browser list (compatibility matrix) so testers know the scope to test and report severity appropriately.",
      "ja": "これは典型的なブラウザ互換性の問題です。新しい構文やJS APIが古いエンジンではサポートされていません。チームはサポート対象ブラウザの一覧(互換性マトリクス)を合意しておく必要があり、テスターはテスト範囲を把握し適切な重大度で報告できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử form đăng nhập có hỗ trợ autofill/autocomplete của trình duyệt, tester nên chú ý điều gì?",
      "en": "When testing a login form that supports browser autofill/autocomplete, what should a tester pay attention to?",
      "ja": "ブラウザのオートフィル/オートコンプリートに対応したログインフォームをテストする際、テスターは何に注意すべきですか?"
    },
    "options": [
      {
        "vi": "Kiểm tra dữ liệu được autofill có điền đúng vào đúng trường (không lẫn username vào password), form vẫn validate đúng khi dữ liệu được autofill thay vì gõ tay",
        "en": "Check that autofilled data lands in the correct fields (username not mixed into password), and the form still validates correctly when data is autofilled instead of manually typed",
        "ja": "オートフィルされたデータが正しいフィールドに入る(ユーザー名がパスワード欄に混在しないなど)こと、また手入力ではなくオートフィルされた場合でもフォームが正しくバリデーションされることを確認する"
      },
      {
        "vi": "Không cần quan tâm vì autofill là tính năng của trình duyệt, không liên quan đến ứng dụng",
        "en": "No need to care since autofill is a browser feature unrelated to the application",
        "ja": "オートフィルはブラウザの機能であり、アプリケーションとは無関係なので気にする必要はない"
      },
      {
        "vi": "Chỉ cần kiểm tra trên một trình duyệt bất kỳ",
        "en": "Only need to check on any single browser",
        "ja": "任意の1つのブラウザだけで確認すればよい"
      },
      {
        "vi": "Tắt hoàn toàn autofill trước khi test vì nó gây nhiễu kết quả",
        "en": "Completely disable autofill before testing because it interferes with results",
        "ja": "結果に影響するのでテスト前にオートフィルを完全に無効化する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Autofill có thể gây lỗi thực tế như điền sai trường, hoặc một số framework JS không nhận diện sự kiện input do trình duyệt autofill khác với gõ tay, khiến validate/submit không hoạt động đúng — đây là điều tester cần kiểm tra thực tế.",
      "en": "Autofill can cause real bugs like data landing in the wrong field, or some JS frameworks not detecting input events triggered by browser autofill (as opposed to manual typing), breaking validation/submission — this is something testers should actually verify.",
      "ja": "オートフィルはデータが誤ったフィールドに入る、あるいは一部のJSフレームワークがブラウザのオートフィルによる入力イベントを手入力と異なり検知できずバリデーションや送信が正しく動作しない、といった実際の不具合を引き起こす可能性があり、テスターが実際に確認すべき点です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trên phiên bản mobile, trang web bị scroll ngang không mong muốn dù nội dung không cần thiết phải rộng như vậy. Nguyên nhân phổ biến nhất mà tester nên nghi ngờ đầu tiên là gì?",
      "en": "On the mobile version, the page has unwanted horizontal scroll even though the content shouldn't need that much width. What is the most common cause a tester should suspect first?",
      "ja": "モバイル版で、コンテンツがそこまで幅を必要としないのに意図しない横スクロールが発生している場合、テスターが最初に疑うべき最も一般的な原因は何ですか?"
    },
    "options": [
      {
        "vi": "Do người dùng cố tình vuốt màn hình sai cách",
        "en": "The user is intentionally swiping the screen incorrectly",
        "ja": "ユーザーが意図的に画面を誤ってスワイプしているため"
      },
      {
        "vi": "Do một phần tử (bảng, hình ảnh, div cố định width lớn) rộng hơn viewport, hoặc thiếu `box-sizing`/`overflow-x: hidden` phù hợp gây tràn layout",
        "en": "An element (table, image, or fixed-width div) is wider than the viewport, or missing proper `box-sizing`/`overflow-x: hidden` causes layout overflow",
        "ja": "表や画像、固定幅の大きなdivなどの要素がビューポートより幅広であるか、適切な`box-sizing`や`overflow-x: hidden`が欠けているためにレイアウトがはみ出している"
      },
      {
        "vi": "Do server trả về dữ liệu sai định dạng JSON",
        "en": "The server returns incorrectly formatted JSON data",
        "ja": "サーバーが誤った形式のJSONデータを返しているため"
      },
      {
        "vi": "Do trình duyệt mobile không hỗ trợ HTML",
        "en": "The mobile browser doesn't support HTML",
        "ja": "モバイルブラウザがHTMLをサポートしていないため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scroll ngang ngoài ý muốn trên mobile thường xuất phát từ phần tử có chiều rộng cố định lớn hơn viewport (bảng dữ liệu, hình ảnh không responsive, padding/margin tính toán sai) — đây là điểm tester cần kiểm tra và báo cáo kèm phần tử gây lỗi.",
      "en": "Unwanted horizontal scroll on mobile usually comes from an element with a fixed width larger than the viewport (data tables, non-responsive images, miscalculated padding/margin) — testers should identify and report the offending element.",
      "ja": "モバイルでの意図しない横スクロールは、通常ビューポートより幅の大きい固定幅要素(データテーブル、レスポンシブでない画像、計算ミスのパディング/マージンなど)が原因です。テスターは原因となる要素を特定して報告する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Thuộc tính `SameSite` của cookie ảnh hưởng gì đến việc kiểm thử một tính năng gọi API sang domain khác (cross-site request)?",
      "en": "How does a cookie's `SameSite` attribute affect testing a feature that calls an API on a different domain (cross-site request)?",
      "ja": "クッキーの`SameSite`属性は、別ドメインへのAPI呼び出し(クロスサイトリクエスト)を伴う機能のテストにどう影響しますか?"
    },
    "options": [
      {
        "vi": "Không ảnh hưởng gì, cookie luôn được gửi trong mọi trường hợp",
        "en": "No effect at all; cookies are always sent in every case",
        "ja": "影響はまったくなく、クッキーは常にすべての場合に送信される"
      },
      {
        "vi": "SameSite chỉ ảnh hưởng đến tốc độ tải hình ảnh",
        "en": "SameSite only affects image loading speed",
        "ja": "SameSiteは画像の読み込み速度にのみ影響する"
      },
      {
        "vi": "Nếu SameSite được đặt là \"Strict\" hoặc \"Lax\", cookie có thể KHÔNG được gửi kèm trong request cross-site, khiến tính năng liên quan session bị lỗi khi gọi từ domain/subdomain khác — tester cần kiểm tra kịch bản này",
        "en": "If SameSite is set to \"Strict\" or \"Lax\", the cookie may NOT be sent with cross-site requests, breaking session-related functionality when called from a different domain/subdomain — testers should verify this scenario",
        "ja": "SameSiteが「Strict」や「Lax」に設定されている場合、クロスサイトリクエストにクッキーが送信されないことがあり、別ドメイン・サブドメインから呼び出した際にセッション関連の機能が壊れる可能性がある。テスターはこのシナリオを確認する必要がある"
      },
      {
        "vi": "SameSite là thuộc tính CSS, không liên quan đến cookie",
        "en": "SameSite is a CSS property unrelated to cookies",
        "ja": "SameSiteはCSSのプロパティであり、クッキーとは無関係である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "`SameSite=Strict/Lax` giới hạn việc gửi cookie trong các request khởi tạo từ domain khác nhằm chống CSRF; tester cần kiểm tra các luồng tích hợp cross-domain (ví dụ iframe, redirect thanh toán) để phát hiện trường hợp mất session ngoài ý muốn.",
      "en": "`SameSite=Strict/Lax` restricts sending cookies on requests initiated from a different domain to prevent CSRF; testers need to check cross-domain integration flows (e.g. iframes, payment redirects) to catch unintended session loss.",
      "ja": "`SameSite=Strict/Lax`はCSRF対策として、別ドメインから開始されたリクエストへのクッキー送信を制限します。テスターはクロスドメインの連携フロー(iframeや決済リダイレクトなど)を確認し、意図しないセッション喪失がないか検出する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử ứng dụng web trên điện thoại, tester xoay máy từ dọc (portrait) sang ngang (landscape). Điều gì KHÔNG nên xảy ra?",
      "en": "When testing a web app on a phone, a tester rotates the device from portrait to landscape. What should NOT happen?",
      "ja": "携帯電話でウェブアプリをテストする際、テスターが端末を縦向きから横向きに回転させました。起こってはいけないことは何ですか?"
    },
    "options": [
      {
        "vi": "Bố cục tự điều chỉnh hợp lý theo chiều ngang, không mất dữ liệu người dùng đã nhập",
        "en": "The layout reasonably adjusts to landscape and no user-entered data is lost",
        "ja": "レイアウトが横向きに適切に調整され、ユーザーが入力したデータが失われない"
      },
      {
        "vi": "Trang vẫn phản hồi tương tác của người dùng bình thường",
        "en": "The page still responds to user interactions normally",
        "ja": "ページはユーザーの操作に対して通常どおり応答する"
      },
      {
        "vi": "Nội dung vẫn đọc được, không bị chữ chồng lấn",
        "en": "Content remains readable without overlapping text",
        "ja": "コンテンツは読みやすいままで、文字が重なることはない"
      },
      {
        "vi": "Dữ liệu người dùng đang nhập dở trong form (ví dụ đang điền form dài) bị mất trắng hoặc trang bị tải lại từ đầu khi xoay màn hình",
        "en": "Data the user was entering in a form (e.g. filling a long form) is wiped out or the page fully reloads from scratch when rotating",
        "ja": "フォームに入力途中だったデータ(例: 長いフォームを入力中)が消えてしまう、または画面回転時にページが最初から再読み込みされてしまう"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Một số ứng dụng xử lý sai sự kiện orientation change bằng cách reload toàn trang, làm mất dữ liệu form đang nhập dở — đây là lỗi cần được phát hiện và báo cáo khi kiểm thử responsive/mobile.",
      "en": "Some applications mishandle the orientation change event by fully reloading the page, wiping out in-progress form data — this is a bug testers should catch and report during responsive/mobile testing.",
      "ja": "一部のアプリケーションは画面回転イベントの処理を誤り、ページ全体を再読み込みしてしまい、入力途中のフォームデータが失われることがあります。これはレスポンシブ・モバイルテストで検出し報告すべき不具合です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Người dùng để một tab trình duyệt mở nhưng không thao tác trong thời gian dài, sau đó quay lại và bấm một nút trên trang. Test case đúng đắn cần xác minh điều gì?",
      "en": "A user leaves a browser tab open without interacting for a long time, then returns and clicks a button on the page. What should the correct test case verify?",
      "ja": "ユーザーがブラウザのタブを長時間操作せずに開いたままにしておき、その後戻ってきてページ上のボタンをクリックしました。正しいテストケースは何を検証すべきですか?"
    },
    "options": [
      {
        "vi": "Nếu phiên đã hết hạn ở phía server, hệ thống cần xử lý mượt mà (ví dụ báo lỗi phiên hết hạn và điều hướng về trang đăng nhập) thay vì gây lỗi khó hiểu hoặc crash khi người dùng thao tác lại",
        "en": "If the session has expired server-side, the system should handle it gracefully (e.g. show a session-expired message and redirect to login) instead of throwing a confusing error or crashing when the user interacts again",
        "ja": "サーバー側でセッションが期限切れになっている場合、システムは(例えばセッション切れのメッセージを表示しログイン画面へ誘導するなど)適切に処理すべきであり、ユーザーが再度操作したときにわかりにくいエラーやクラッシュを起こしてはならない"
      },
      {
        "vi": "Không cần kiểm tra vì tab vẫn đang mở nên phiên chắc chắn còn hiệu lực",
        "en": "No need to test this since the tab being open guarantees the session is still valid",
        "ja": "タブが開いたままなのでセッションは必ず有効であり、テストする必要はない"
      },
      {
        "vi": "Ứng dụng nên tự động submit lại hành động trước đó mà không cần xác nhận",
        "en": "The application should automatically resubmit the previous action without confirmation",
        "ja": "アプリケーションは確認なしに前のアクションを自動的に再送信すべきである"
      },
      {
        "vi": "Ứng dụng phải tự động đóng tab trình duyệt",
        "en": "The application must automatically close the browser tab",
        "ja": "アプリケーションがブラウザのタブを自動的に閉じなければならない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tab mở không đảm bảo phiên phía server còn hiệu lực (do session timeout độc lập với trạng thái tab); tester cần kiểm tra ứng dụng xử lý tình huống phiên hết hạn một cách rõ ràng, thân thiện thay vì lỗi khó hiểu hay mất dữ liệu đột ngột.",
      "en": "An open tab doesn't guarantee the server-side session is still valid, since session timeout is independent of tab state; testers should verify the app handles expired sessions clearly and gracefully instead of confusing errors or sudden data loss.",
      "ja": "タブが開いていることはサーバー側のセッションが有効であることを保証しません。セッションタイムアウトはタブの状態とは独立しているためです。テスターは、わかりにくいエラーや突然のデータ損失ではなく、アプリがセッション切れを明確かつ適切に処理するかを確認する必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong lúc bạn đang thanh toán trên app, bất ngờ có cuộc gọi điện thoại đến làm gián đoạn thao tác. Đây là loại kiểm thử nào?",
      "en": "While you are completing a payment in an app, an incoming phone call suddenly interrupts the flow. What type of testing is this?",
      "ja": "アプリで決済処理中に、突然電話の着信があり操作が中断された。これは何というテストの種類か。"
    },
    "options": [
      {
        "vi": "Kiểm thử hồi quy (Regression testing)",
        "en": "Regression testing",
        "ja": "リグレッションテスト"
      },
      {
        "vi": "Kiểm thử gián đoạn (Interrupt testing)",
        "en": "Interrupt testing",
        "ja": "割り込みテスト（インタラプトテスト）"
      },
      {
        "vi": "Kiểm thử tải (Load testing)",
        "en": "Load testing",
        "ja": "負荷テスト"
      },
      {
        "vi": "Kiểm thử tương thích (Compatibility testing)",
        "en": "Compatibility testing",
        "ja": "互換性テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử gián đoạn kiểm tra app phản ứng ra sao khi bị ngắt bởi cuộc gọi, tin nhắn, cảnh báo pin yếu... để đảm bảo dữ liệu và trạng thái không bị mất.",
      "en": "Interrupt testing checks how the app behaves when interrupted by calls, SMS, low-battery alerts, etc., ensuring data and state are preserved.",
      "ja": "割り込みテストは、着信やSMS、バッテリー低下警告などでアプリが中断された際の挙動を確認し、データや状態が失われないことを検証するテストである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Để kiểm tra app hoạt động ra sao khi người dùng đang ở khu vực sóng yếu, tốc độ mạng chậm như 3G, tester nên áp dụng kỹ thuật nào?",
      "en": "To verify how the app behaves for a user in a weak-signal area with slow 3G speed, which technique should a tester apply?",
      "ja": "電波が弱く3G並みの低速通信環境でのアプリの挙動を確認するには、テスターはどの手法を使うべきか。"
    },
    "options": [
      {
        "vi": "Xóa cache của app trước khi test",
        "en": "Clear the app cache before testing",
        "ja": "テスト前にアプリのキャッシュを削除する"
      },
      {
        "vi": "Tăng độ phân giải màn hình thiết bị test",
        "en": "Increase the screen resolution of the test device",
        "ja": "テスト端末の画面解像度を上げる"
      },
      {
        "vi": "Giả lập điều kiện mạng chậm (network throttling) bằng công cụ như Network Link Conditioner hoặc Charles Proxy",
        "en": "Simulate slow network conditions (network throttling) using tools such as Network Link Conditioner or Charles Proxy",
        "ja": "Network Link ConditionerやCharles Proxyなどのツールでネットワーク帯域を制限（スロットリング）し、低速通信環境をシミュレートする"
      },
      {
        "vi": "Kiểm thử app trên nhiều ngôn ngữ khác nhau",
        "en": "Test the app in multiple different languages",
        "ja": "アプリを複数の言語でテストする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Network throttling cho phép giả lập chính xác các mức tốc độ mạng (2G/3G/edge...) mà không cần thực sự di chuyển tới vùng sóng yếu.",
      "en": "Network throttling accurately simulates various network speed levels (2G/3G/edge...) without actually going to a weak-signal area.",
      "ja": "ネットワークスロットリングにより、実際に電波の弱い場所へ行かなくても2G/3G/edgeなど各種の通信速度レベルを正確に再現できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Người dùng thực hiện chuyển khoản, mạng bị ngắt đột ngột ngay trước khi app nhận phản hồi từ server. Kịch bản kiểm thử quan trọng nhất cần xác minh là gì?",
      "en": "A user initiates a bank transfer, and the network drops suddenly right before the app receives a response from the server. What is the most critical test scenario to verify?",
      "ja": "ユーザーが送金を実行し、サーバーからの応答をアプリが受け取る直前に通信が突然切断された。最も重要に検証すべきテストシナリオは何か。"
    },
    "options": [
      {
        "vi": "Giao diện có bị vỡ layout khi mất mạng hay không",
        "en": "Whether the layout breaks when the network is lost",
        "ja": "通信断時にレイアウトが崩れるかどうか"
      },
      {
        "vi": "Font chữ hiển thị có đúng hay không",
        "en": "Whether the font displays correctly",
        "ja": "フォントが正しく表示されるかどうか"
      },
      {
        "vi": "Biểu tượng ứng dụng có hiển thị đúng hay không",
        "en": "Whether the app icon displays correctly",
        "ja": "アプリのアイコンが正しく表示されるかどうか"
      },
      {
        "vi": "Trạng thái giao dịch được xử lý nhất quán, không bị trừ tiền hai lần hoặc mất dữ liệu, khi kết nối mạng được khôi phục",
        "en": "Whether transaction state is handled consistently (no double-charging, no data loss) once the network connection is restored",
        "ja": "通信が復旧した際に、取引状態が一貫して処理され、二重引き落としやデータ消失が発生しないこと"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là kịch bản rủi ro cao trong tài chính: cần đảm bảo hệ thống xử lý idempotent, tránh double-charge và đồng bộ trạng thái đúng khi mạng khôi phục.",
      "en": "This is a high-risk financial scenario: the system must process idempotently, avoid double-charging, and correctly sync state once connectivity returns.",
      "ja": "金融機能では特にリスクが高いシナリオであり、冪等性を担保して二重課金を防ぎ、通信復旧時に状態を正しく同期させる必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trên ứng dụng bản đồ, cử chỉ pinch-to-zoom (chụm/mở hai ngón tay) chủ yếu dùng để kiểm tra khả năng gì của app?",
      "en": "On a map application, the pinch-to-zoom gesture is primarily used to test which capability of the app?",
      "ja": "地図アプリにおいて、ピンチイン・ピンチアウト（2本指での拡大縮小）ジェスチャーは主にアプリのどの機能を検証するために使われるか。"
    },
    "options": [
      {
        "vi": "Khả năng xử lý đa chạm (multi-touch) để phóng to/thu nhỏ nội dung mượt mà và đúng tỉ lệ",
        "en": "The multi-touch handling ability to zoom content in/out smoothly and at the correct scale",
        "ja": "コンテンツを滑らかかつ正確な比率で拡大・縮小するマルチタッチ処理能力"
      },
      {
        "vi": "Cơ chế xác thực đăng nhập bằng sinh trắc học",
        "en": "The biometric login authentication mechanism",
        "ja": "生体認証によるログイン機構"
      },
      {
        "vi": "Khả năng kết nối mạng ổn định của thiết bị",
        "en": "The device's stable network connectivity",
        "ja": "端末の安定したネットワーク接続性"
      },
      {
        "vi": "Khả năng đáp ứng của văn bản trên các ngôn ngữ",
        "en": "Text responsiveness across different languages",
        "ja": "複数言語でのテキストの表示対応"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Pinch-to-zoom kiểm tra khả năng nhận diện đa điểm chạm và xử lý scale nội dung mượt mà, không giật, đúng tỉ lệ thực tế.",
      "en": "Pinch-to-zoom tests multi-touch recognition and smooth, accurately-scaled content rendering without lag.",
      "ja": "ピンチ操作は複数点タッチの検知と、遅延なく正確な比率でコンテンツを拡大縮小する処理能力を検証する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test tính năng vuốt trái để xóa và vuốt phải để đánh dấu trên danh sách công việc, test case cần bao phủ những gì đặc biệt?",
      "en": "When testing swipe-left-to-delete and swipe-right-to-mark on a task list, what special cases must the test coverage include?",
      "ja": "タスク一覧で左スワイプで削除、右スワイプでマークする機能をテストする際、特にどのようなケースをカバーする必要があるか。"
    },
    "options": [
      {
        "vi": "Chỉ cần test vuốt trái vì đó là thao tác chính người dùng hay dùng",
        "en": "Only test swipe-left since it is the main action users typically use",
        "ja": "左スワイプのみをテストすればよい。ユーザーが最もよく使う操作だから"
      },
      {
        "vi": "Test riêng từng hướng vuốt, vuốt nhanh liên tiếp, và vuốt nửa chừng rồi hủy để đảm bảo hành vi đúng trong mọi trường hợp",
        "en": "Test each swipe direction separately, rapid successive swipes, and partial swipes followed by cancellation to ensure correct behavior in all cases",
        "ja": "各方向のスワイプを個別にテストし、連続した素早いスワイプや途中でキャンセルする操作も含めて、あらゆるケースで正しい挙動を確認する"
      },
      {
        "vi": "Chỉ cần test trên thiết bị iOS vì Android không hỗ trợ cử chỉ vuốt danh sách",
        "en": "Only test on iOS devices since Android does not support list swipe gestures",
        "ja": "iOS端末のみでテストすればよい。Androidはリストのスワイプ操作に対応していないため"
      },
      {
        "vi": "Không cần test cử chỉ vuốt vì nó không ảnh hưởng đến logic nghiệp vụ",
        "en": "Swipe gestures don't need testing since they don't affect business logic",
        "ja": "スワイプ操作はビジネスロジックに影響しないためテスト不要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cử chỉ vuốt cần được test đầy đủ theo từng hướng cũng như các thao tác biên như vuốt nhanh hoặc hủy giữa chừng, vì đây là nơi dễ phát sinh lỗi UX và trigger nhầm hành động.",
      "en": "Swipe gestures need full coverage per direction plus edge cases like rapid or cancelled swipes, since these are common sources of UX bugs and mis-triggered actions.",
      "ja": "スワイプ操作は各方向を網羅するだけでなく、素早い操作や途中キャンセルといった境界ケースも含めてテストする必要がある。これらはUXバグや誤動作の原因になりやすいためである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Người dùng đang nhập thông tin vào một biểu mẫu dài thì xoay điện thoại từ dọc sang ngang. Điều quan trọng cần kiểm tra ở đây là gì?",
      "en": "A user is filling in a long form and rotates the phone from portrait to landscape. What is the critical thing to verify here?",
      "ja": "長いフォームに入力中のユーザーが端末を縦向きから横向きに回転させた。ここで確認すべき重要な点は何か。"
    },
    "options": [
      {
        "vi": "Tốc độ tải trang tổng thể của app",
        "en": "The app's overall page load speed",
        "ja": "アプリ全体のページ読み込み速度"
      },
      {
        "vi": "Dung lượng RAM còn trống của thiết bị",
        "en": "The device's remaining free RAM",
        "ja": "端末の空きRAM容量"
      },
      {
        "vi": "Dữ liệu người dùng đã nhập trong form không bị mất, và bố cục hiển thị đúng theo hướng màn hình mới",
        "en": "That the data already entered in the form is not lost, and the layout displays correctly for the new orientation",
        "ja": "フォームに入力済みのデータが失われず、新しい画面の向きに応じてレイアウトが正しく表示されること"
      },
      {
        "vi": "Ngôn ngữ hiển thị có thay đổi theo hướng màn hình không",
        "en": "Whether the display language changes based on screen orientation",
        "ja": "画面の向きによって表示言語が変わるかどうか"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Orientation change là điểm dễ gây mất dữ liệu do Activity/View bị tái tạo; cần đảm bảo state được lưu và layout responsive đúng.",
      "en": "Orientation change is a common cause of data loss due to Activity/View recreation; state must be preserved and layout must remain responsive.",
      "ja": "画面回転はActivityやViewが再生成されることでデータ消失が起きやすい箇所であり、状態が保持され、レイアウトが正しく応答することを確認する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Người dùng chuyển sang dùng app khác rồi quay lại (resume) ứng dụng đang test. Test case chính cần kiểm tra là gì?",
      "en": "A user switches to another app and then resumes the app under test. What is the primary test case to check?",
      "ja": "ユーザーが別のアプリに切り替えた後、テスト対象アプリに戻った（レジューム）。主に確認すべきテストケースは何か。"
    },
    "options": [
      {
        "vi": "Biểu tượng ứng dụng trên màn hình chính có đúng vị trí không",
        "en": "Whether the app icon on the home screen is in the correct position",
        "ja": "ホーム画面上のアプリアイコンの位置が正しいかどうか"
      },
      {
        "vi": "Dung lượng cài đặt của ứng dụng trên thiết bị",
        "en": "The app's installed storage size on the device",
        "ja": "端末上でのアプリのインストール容量"
      },
      {
        "vi": "Tên gói (package name) của ứng dụng có đúng không",
        "en": "Whether the app's package name is correct",
        "ja": "アプリのパッケージ名が正しいかどうか"
      },
      {
        "vi": "App khôi phục đúng trạng thái và màn hình trước đó, không làm mất tiến trình mà người dùng đang thực hiện",
        "en": "The app correctly restores the previous state and screen, without losing the process the user was in the middle of",
        "ja": "アプリが以前の状態と画面を正しく復元し、ユーザーが実行中だった処理を失わないこと"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi bị đưa ra nền rồi resume, hệ điều hành có thể giải phóng tài nguyên hoặc kill tiến trình; app cần lưu và khôi phục trạng thái đúng để không mất tiến trình người dùng.",
      "en": "When backgrounded and resumed, the OS may reclaim resources or kill the process; the app must save and restore state correctly so the user's progress isn't lost.",
      "ja": "バックグラウンド化からのレジューム時、OSがリソースを解放したりプロセスを終了させたりする可能性があるため、アプリは状態を適切に保存・復元し、ユーザーの進行状況を失わないようにする必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi app đang chạy ở chế độ nền (background) và nhận được push notification, cần kiểm tra những điều gì?",
      "en": "When the app is running in the background and receives a push notification, what needs to be verified?",
      "ja": "アプリがバックグラウンドで動作している際にプッシュ通知を受信した場合、何を確認する必要があるか。"
    },
    "options": [
      {
        "vi": "Notification hiển thị đúng nội dung, khi nhấn vào điều hướng đúng màn hình đích (deep link), và số badge được cập nhật chính xác",
        "en": "That the notification displays the correct content, tapping it navigates to the correct destination screen (deep link), and the badge count updates accurately",
        "ja": "通知の内容が正しく表示され、タップすると正しい画面へ遷移（ディープリンク）し、バッジ数が正確に更新されること"
      },
      {
        "vi": "Không cần test vì hệ điều hành xử lý toàn bộ việc hiển thị push notification",
        "en": "No testing needed since the OS handles all push notification display",
        "ja": "OSがプッシュ通知の表示をすべて処理するためテスト不要である"
      },
      {
        "vi": "Chỉ cần kiểm tra nội dung thông báo hiển thị đúng",
        "en": "Only whether the notification content displays correctly",
        "ja": "通知内容が正しく表示されるかどうかのみ"
      },
      {
        "vi": "Chỉ cần kiểm tra âm thanh thông báo có phát ra hay không",
        "en": "Only whether the notification sound plays",
        "ja": "通知音が鳴るかどうかのみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Push notification liên quan tới cả nội dung hiển thị, điều hướng qua deep link và trạng thái badge — tất cả cần verify đồng bộ, không chỉ do OS tự đảm bảo.",
      "en": "Push notifications involve display content, deep-link navigation, and badge state — all of which need verification, not just OS-guaranteed behavior.",
      "ja": "プッシュ通知は表示内容、ディープリンクによる画面遷移、バッジ状態のすべてに関わるため、OS任せにせずすべてを検証する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test case điển hình khi kiểm thử tính năng deep link/universal link của app là gì?",
      "en": "What is a typical test case when testing an app's deep link/universal link feature?",
      "ja": "アプリのディープリンク／ユニバーサルリンク機能をテストする際の代表的なテストケースは何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra tốc độ tải hình ảnh trong app",
        "en": "Check the loading speed of images in the app",
        "ja": "アプリ内画像の読み込み速度を確認する"
      },
      {
        "vi": "Mở liên kết từ nguồn bên ngoài (SMS, email...) trong cả hai trường hợp app đã cài và chưa cài, kiểm tra điều hướng đúng tới màn hình đích",
        "en": "Open the link from an external source (SMS, email...) both when the app is installed and when it isn't, and verify navigation to the correct destination screen",
        "ja": "アプリがインストール済み・未インストールの両方の状態で、SMSやメールなど外部からリンクを開き、正しい画面へ遷移することを確認する"
      },
      {
        "vi": "Kiểm tra kích cỡ font chữ trên các thiết bị khác nhau",
        "en": "Check font size across different devices",
        "ja": "異なる端末でのフォントサイズを確認する"
      },
      {
        "vi": "Kiểm tra dung lượng pin tiêu thụ khi mở app",
        "en": "Check battery consumption when opening the app",
        "ja": "アプリ起動時のバッテリー消費量を確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Deep link cần được test ở cả hai trạng thái cài đặt của app, vì luồng xử lý (mở app có sẵn vs. cài rồi mở tới đúng màn hình) khác nhau đáng kể.",
      "en": "Deep links must be tested in both installation states because the handling flow (opening an existing app vs. installing then landing on the right screen) differs significantly.",
      "ja": "ディープリンクはアプリのインストール有無どちらの状態でもテストする必要がある。既存アプリを開く場合とインストール後に正しい画面へ遷移する場合とで処理フローが大きく異なるためである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao kiểm thử phân mảnh thiết bị (device fragmentation) trên Android thường đòi hỏi nhiều công sức hơn iOS?",
      "en": "Why does testing for device fragmentation on Android generally require more effort than on iOS?",
      "ja": "Androidにおけるデバイスフラグメンテーション（端末の断片化）のテストが、一般にiOSより多くの労力を要するのはなぜか。"
    },
    "options": [
      {
        "vi": "Android không hỗ trợ bất kỳ công cụ kiểm thử tự động nào",
        "en": "Android doesn't support any automated testing tools",
        "ja": "Androidは自動テストツールを一切サポートしていないため"
      },
      {
        "vi": "iOS không cần kiểm thử đa thiết bị vì chỉ tồn tại một dòng máy duy nhất",
        "en": "iOS doesn't need multi-device testing since only one device line exists",
        "ja": "iOSは単一の機種しか存在しないため複数端末でのテストが不要だから"
      },
      {
        "vi": "Android có nhiều nhà sản xuất, phiên bản hệ điều hành, độ phân giải và giao diện tùy biến (custom UI) khác nhau, gây phân mảnh thiết bị lớn",
        "en": "Android has many manufacturers, OS versions, screen resolutions, and custom UI overlays, causing significant device fragmentation",
        "ja": "Androidは多数のメーカー、OSバージョン、画面解像度、カスタムUIが存在し、端末の断片化が大きいため"
      },
      {
        "vi": "Android không hỗ trợ kiểm thử thủ công",
        "en": "Android doesn't support manual testing",
        "ja": "Androidは手動テストに対応していないため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đa dạng nhà sản xuất, phiên bản OS, kích thước màn hình và giao diện tùy biến khiến Android cần bao phủ test trên nhiều tổ hợp thiết bị hơn.",
      "en": "The diversity of manufacturers, OS versions, screen sizes, and custom UIs means Android requires coverage across many more device combinations.",
      "ja": "メーカー、OSバージョン、画面サイズ、カスタムUIの多様性により、Androidはより多くの端末組み合わせをカバーするテストが必要になる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi so sánh hành vi điều hướng lùi giữa Android và iOS, điều nào mô tả đúng nhất và là điều cần lưu ý khi test?",
      "en": "When comparing back-navigation behavior between Android and iOS, which statement is most accurate and important to note when testing?",
      "ja": "AndroidとiOSの戻る操作の挙動を比較した場合、テスト時に留意すべき最も正確な説明はどれか。"
    },
    "options": [
      {
        "vi": "Cả hai nền tảng có hành vi nút back hoàn toàn giống nhau",
        "en": "Both platforms have exactly the same back-button behavior",
        "ja": "両プラットフォームの戻るボタンの挙動は完全に同一である"
      },
      {
        "vi": "iOS có nút back vật lý còn Android thì không",
        "en": "iOS has a physical back button while Android does not",
        "ja": "iOSには物理的な戻るボタンがあるが、Androidにはない"
      },
      {
        "vi": "Android không có khái niệm điều hướng lùi trong ứng dụng",
        "en": "Android has no concept of back navigation within apps",
        "ja": "Androidにはアプリ内で戻る操作という概念が存在しない"
      },
      {
        "vi": "Android dùng nút Back vật lý/hệ thống, còn iOS dùng cử chỉ vuốt cạnh hoặc nút back trên thanh điều hướng — cần đảm bảo hành vi back nhất quán, đúng ngữ cảnh trên từng nền tảng",
        "en": "Android uses a physical/system Back button, while iOS uses an edge-swipe gesture or a navigation-bar back button — behavior must be verified as consistent and context-appropriate on each platform",
        "ja": "Androidは物理・システムの戻るボタンを使用し、iOSは画面端スワイプまたはナビゲーションバーの戻るボタンを使用する。それぞれのプラットフォームで戻る動作が一貫しており、文脈に応じて正しく機能することを確認する必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sự khác biệt cơ chế back giữa hai nền tảng thường gây lỗi khi tester chỉ quen với một nền tảng; cần verify riêng cho từng platform.",
      "en": "The differing back mechanisms often cause bugs when testers are only familiar with one platform; each platform must be verified separately.",
      "ja": "両プラットフォームの戻る操作の仕組みの違いは、片方のプラットフォームにしか慣れていないテスターがバグを見逃す原因になりやすく、それぞれ個別に検証する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Cách tiếp cận đúng khi kiểm thử tính năng chụp ảnh yêu cầu quyền truy cập camera của thiết bị là gì?",
      "en": "What is the correct approach when testing a photo-capture feature that requires the device's camera permission?",
      "ja": "端末のカメラ権限を必要とする撮影機能をテストする際の正しいアプローチは何か。"
    },
    "options": [
      {
        "vi": "Cần test cả trường hợp cấp quyền, từ chối quyền, và thu hồi quyền sau khi đã cấp trong phần Cài đặt hệ thống",
        "en": "Need to test granting permission, denying permission, and revoking a previously-granted permission from system Settings",
        "ja": "権限の許可、拒否、そしてシステム設定画面で許可後に取り消すケースをすべてテストする必要がある"
      },
      {
        "vi": "Không cần test permission vì đó hoàn toàn là trách nhiệm của hệ điều hành",
        "en": "No need to test permissions since this is entirely the OS's responsibility",
        "ja": "権限に関するテストは完全にOSの責任であるため不要である"
      },
      {
        "vi": "Chỉ cần test trên nền tảng iOS vì Android tự động cấp quyền cho mọi ứng dụng",
        "en": "Only test on iOS since Android automatically grants permissions to all apps",
        "ja": "AndroidはすべてのアプリにOSが自動で権限を付与するため、iOSのみでテストすればよい"
      },
      {
        "vi": "Chỉ cần test trường hợp người dùng đã cấp quyền camera từ trước",
        "en": "Only test the case where the user has already granted camera permission beforehand",
        "ja": "ユーザーが事前にカメラ権限を許可済みのケースのみをテストすればよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "App phải xử lý đúng cả ba trạng thái quyền để tránh crash hoặc trải nghiệm xấu khi người dùng thay đổi quyền bất kỳ lúc nào.",
      "en": "The app must handle all three permission states correctly to avoid crashes or poor UX when users change permissions at any time.",
      "ja": "アプリはユーザーがいつでも権限を変更できることを踏まえ、クラッシュや不適切なUXを避けるためにこれら3つの権限状態すべてを正しく処理する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test kịch bản gỡ cài đặt rồi cài đặt lại ứng dụng, điều gì là test case quan trọng nhất liên quan tới dữ liệu?",
      "en": "When testing the uninstall-then-reinstall scenario, what is the most important data-related test case?",
      "ja": "アプリをアンインストールしてから再インストールするシナリオをテストする際、データに関して最も重要なテストケースは何か。"
    },
    "options": [
      {
        "vi": "Chỉ cần kiểm tra biểu tượng ứng dụng hiển thị đúng sau khi cài lại",
        "en": "Only check that the app icon displays correctly after reinstalling",
        "ja": "再インストール後にアプリアイコンが正しく表示されるかのみを確認すればよい"
      },
      {
        "vi": "Sau khi gỡ cài đặt rồi cài lại, dữ liệu cục bộ (cache, database) phải được xử lý đúng theo thiết kế, không còn sót dữ liệu cũ gây lỗi",
        "en": "After uninstall-then-reinstall, local data (cache, database) must be handled as designed, with no leftover old data causing bugs",
        "ja": "アンインストール後に再インストールした際、ローカルデータ（キャッシュ、データベース）が設計通りに処理され、古いデータが残ってバグを引き起こさないこと"
      },
      {
        "vi": "Chỉ cần kiểm tra dung lượng file cài đặt (APK/IPA)",
        "en": "Only check the size of the installation file (APK/IPA)",
        "ja": "インストールファイル（APK/IPA）の容量のみを確認すればよい"
      },
      {
        "vi": "Chỉ cần kiểm tra tên gói (package name) không thay đổi",
        "en": "Only check that the package name hasn't changed",
        "ja": "パッケージ名が変わっていないかのみを確認すればよい"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Gỡ cài đặt về nguyên tắc phải xóa dữ liệu cục bộ; nếu vẫn sót lại (do backup hệ thống hoặc lưu trữ ngoài) có thể gây lỗi logic hoặc rò rỉ dữ liệu nhạy cảm.",
      "en": "Uninstalling should, in principle, clear local data; leftover data (from system backups or external storage) can cause logic errors or sensitive data leaks.",
      "ja": "アンインストール時は原則としてローカルデータが削除されるべきであり、システムバックアップや外部ストレージにデータが残ると、ロジックエラーや機密データの漏えいにつながる可能性がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test kịch bản người dùng cập nhật app từ phiên bản cũ lên mới ngay trên máy (không gỡ cài đặt), cần kiểm tra điều gì?",
      "en": "When testing the scenario where a user updates the app in-place from an old version to a new one (without uninstalling), what needs to be checked?",
      "ja": "ユーザーがアンインストールせずに古いバージョンから新しいバージョンへその場でアプリを更新するシナリオをテストする際、何を確認する必要があるか。"
    },
    "options": [
      {
        "vi": "Chỉ cần kiểm tra giao diện của phiên bản mới có đẹp hay không",
        "en": "Only whether the new version's UI looks good",
        "ja": "新バージョンのUIが美しいかどうかのみ"
      },
      {
        "vi": "Chỉ cần kiểm tra tốc độ tải xuống bản cập nhật",
        "en": "Only the download speed of the update",
        "ja": "アップデートのダウンロード速度のみ"
      },
      {
        "vi": "Việc migrate dữ liệu/schema cơ sở dữ liệu cục bộ thành công, các tính năng cũ vẫn hoạt động bình thường và không mất dữ liệu người dùng",
        "en": "That the local database data/schema migration succeeds, old features still work normally, and no user data is lost",
        "ja": "ローカルデータベースのデータ／スキーマの移行が成功し、旧機能が正常に動作し、ユーザーデータが失われないこと"
      },
      {
        "vi": "Không cần test vì App Store/Play Store tự xử lý toàn bộ việc migrate dữ liệu",
        "en": "No testing needed since the App Store/Play Store automatically handles all data migration",
        "ja": "App StoreやPlayストアがデータ移行をすべて自動で処理するためテスト不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Update in-place liên quan tới migrate schema DB cục bộ do app tự quản lý; store chỉ lo việc tải/cài file, không xử lý logic migrate dữ liệu ứng dụng.",
      "en": "In-place updates involve local DB schema migration that the app itself manages; the store only handles downloading/installing the file, not app data migration logic.",
      "ja": "インプレースアップデートはアプリ自身が管理するローカルDBスキーマの移行を伴う。ストアはファイルのダウンロードとインストールのみを担当し、アプリのデータ移行ロジックは処理しない。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Kỹ thuật giả lập vị trí GPS (location mocking) thường được dùng để làm gì khi kiểm thử thủ công?",
      "en": "What is GPS location mocking typically used for during manual testing?",
      "ja": "GPS位置情報の疑似設定（ロケーションモッキング）は、手動テストにおいて主に何のために使われるか。"
    },
    "options": [
      {
        "vi": "Kiểm tra tốc độ đường truyền mạng của thiết bị",
        "en": "Check the device's network transfer speed",
        "ja": "端末のネットワーク転送速度を確認するため"
      },
      {
        "vi": "Kiểm tra dung lượng bộ nhớ còn trống trên thiết bị",
        "en": "Check the device's remaining free storage",
        "ja": "端末の空きストレージ容量を確認するため"
      },
      {
        "vi": "Kiểm tra mức tiêu thụ pin của camera thiết bị",
        "en": "Check the device camera's battery consumption",
        "ja": "端末カメラのバッテリー消費量を確認するため"
      },
      {
        "vi": "Kiểm tra các tính năng phụ thuộc vị trí (bản đồ, giao hàng, check-in...) mà không cần tester di chuyển thực tế tới các địa điểm khác nhau",
        "en": "Test location-dependent features (maps, delivery, check-in...) without the tester physically traveling to different locations",
        "ja": "地図、配送、チェックインなど位置情報に依存する機能を、テスターが実際に別の場所へ移動しなくても検証するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Location mocking mô phỏng tọa độ GPS bất kỳ, giúp test nhanh các tình huống địa lý khác nhau (đổi khu vực, di chuyển giả lập) mà không cần đi thực tế.",
      "en": "Location mocking simulates arbitrary GPS coordinates, allowing quick testing of different geographic scenarios (region changes, simulated movement) without traveling.",
      "ja": "ロケーションモッキングは任意のGPS座標を模擬することで、実際に移動しなくても異なる地理的シナリオ（地域変更や擬似移動など）を迅速にテストできる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thiết bị của người dùng gần hết dung lượng lưu trữ, app cần được kiểm tra xử lý ra sao theo đúng chuẩn?",
      "en": "When a user's device is nearly out of storage, how should the app be verified to handle this correctly?",
      "ja": "ユーザーの端末のストレージがほぼ枯渇している場合、アプリが適切に対応することをどのように検証すべきか。"
    },
    "options": [
      {
        "vi": "App cần hiển thị thông báo lỗi phù hợp, không bị crash và không làm hỏng dữ liệu khi không đủ dung lượng để lưu file/cache",
        "en": "The app must display an appropriate error message, not crash, and not corrupt data when there isn't enough storage to save files/cache",
        "ja": "アプリはファイルやキャッシュを保存するための容量が不足している場合、適切なエラーメッセージを表示し、クラッシュせず、データを破損させないようにする必要がある"
      },
      {
        "vi": "App bị crash khi hết dung lượng được xem là hành vi chấp nhận được",
        "en": "App crashing when storage runs out is considered acceptable behavior",
        "ja": "容量不足時にアプリがクラッシュすることは許容できる挙動とみなされる"
      },
      {
        "vi": "Không cần test tình huống này vì thiết bị hiếm khi hết bộ nhớ",
        "en": "No need to test this scenario since devices rarely run out of storage",
        "ja": "端末がストレージ不足になることは稀であるためこのシナリオはテスト不要である"
      },
      {
        "vi": "App được phép tự động xóa dữ liệu của các ứng dụng khác để giải phóng bộ nhớ",
        "en": "The app is allowed to automatically delete other apps' data to free up storage",
        "ja": "アプリが空き容量確保のために他のアプリのデータを自動的に削除してもよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là một tình huống thực tế phổ biến, đặc biệt trên thiết bị Android tầm trung/thấp; app tốt phải xử lý graceful, không crash hoặc hỏng dữ liệu.",
      "en": "This is a common real-world scenario, especially on mid/low-end Android devices; a robust app must degrade gracefully without crashing or corrupting data.",
      "ja": "これは特にミドル・ローエンドのAndroid端末で頻繁に発生する現実的なシナリオであり、堅牢なアプリはクラッシュやデータ破損なく適切に対応する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử thao tác nhấn giữ (long press) trên một item trong danh sách, đâu là test case quan trọng cần lưu ý?",
      "en": "When testing a long-press action on a list item, what is an important test case to note?",
      "ja": "リスト項目に対する長押し操作をテストする際、注意すべき重要なテストケースは何か。"
    },
    "options": [
      {
        "vi": "Kích thước font chữ trên item danh sách",
        "en": "The font size on the list item",
        "ja": "リスト項目のフォントサイズ"
      },
      {
        "vi": "Menu ngữ cảnh (context menu) xuất hiện đúng vị trí và không bị kích hoạt trùng với thao tác tap thông thường",
        "en": "The context menu appears at the correct position and is not mistakenly triggered by a regular tap",
        "ja": "コンテキストメニューが正しい位置に表示され、通常のタップ操作と誤って重複発火しないこと"
      },
      {
        "vi": "Ngôn ngữ hiển thị của item trong danh sách",
        "en": "The display language of the list item",
        "ja": "リスト項目の表示言語"
      },
      {
        "vi": "Mức tiêu thụ pin khi cuộn danh sách",
        "en": "Battery consumption when scrolling the list",
        "ja": "リストをスクロールする際のバッテリー消費量"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Long press dễ bị nhầm lẫn với tap thường nếu ngưỡng thời gian không được xử lý đúng, gây trigger sai hành động ngoài ý muốn.",
      "en": "Long press can easily be confused with a regular tap if the time threshold isn't handled correctly, triggering unintended actions.",
      "ja": "時間閾値の処理が正しくないと長押しは通常のタップと混同されやすく、意図しないアクションが発火する原因になる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test tính năng đăng nhập bằng Face ID/Touch ID/vân tay, những trường hợp nào cần được bao phủ?",
      "en": "When testing biometric login (Face ID/Touch ID/fingerprint), which cases need to be covered?",
      "ja": "Face ID／Touch ID／指紋認証によるログイン機能をテストする際、どのケースをカバーする必要があるか。"
    },
    "options": [
      {
        "vi": "Chỉ cần test trường hợp xác thực sinh trắc học thành công",
        "en": "Only test the case of successful biometric authentication",
        "ja": "生体認証が成功するケースのみをテストすればよい"
      },
      {
        "vi": "Chỉ cần test trên thiết bị iOS vì Android không hỗ trợ Face ID",
        "en": "Only test on iOS since Android doesn't support Face ID",
        "ja": "AndroidはFace IDに対応していないためiOS端末のみをテストすればよい"
      },
      {
        "vi": "Cần test cả xác thực thành công, thất bại (không nhận diện được), và cơ chế dự phòng (fallback) về mật khẩu/mã PIN khi sinh trắc học không khả dụng",
        "en": "Need to test successful authentication, failed authentication (not recognized), and the fallback mechanism to password/PIN when biometrics are unavailable",
        "ja": "認証成功、認証失敗（認識できない）、そして生体認証が利用できない場合のパスワードやPINコードへのフォールバック機構まで、すべてテストする必要がある"
      },
      {
        "vi": "Không cần test vì hệ điều hành xử lý toàn bộ, không liên quan tới app",
        "en": "No testing needed since the OS handles everything, unrelated to the app",
        "ja": "OSがすべて処理するためアプリとは無関係でありテスト不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "App cần xử lý đúng luồng khi xác thực thất bại nhiều lần hoặc thiết bị không hỗ trợ/không đăng ký sinh trắc học, đảm bảo luôn có lối thoát bằng phương thức thay thế.",
      "en": "The app must correctly handle repeated authentication failures or devices without biometric support/enrollment, always providing an alternative fallback method.",
      "ja": "アプリは認証の連続失敗や、生体認証に対応していない、または未登録の端末に対しても正しく対応し、常に代替手段によるログイン経路を用意しておく必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi kiểm thử giao diện chế độ tối (dark mode) của app, điều gì cần được chú ý kỹ nhất?",
      "en": "When testing an app's dark mode UI, what needs the most careful attention?",
      "ja": "アプリのダークモードUIをテストする際、最も注意すべき点は何か。"
    },
    "options": [
      {
        "vi": "Chỉ cần đổi màu nền sang màu đen là đủ",
        "en": "Just changing the background color to black is sufficient",
        "ja": "背景色を黒に変更するだけで十分である"
      },
      {
        "vi": "Không cần test vì dark mode chỉ là yếu tố thẩm mỹ, không ảnh hưởng chức năng",
        "en": "No testing needed since dark mode is purely cosmetic and doesn't affect functionality",
        "ja": "ダークモードは見た目だけの要素であり機能には影響しないためテスト不要である"
      },
      {
        "vi": "Chỉ cần test dark mode trên nền tảng Android",
        "en": "Only test dark mode on Android",
        "ja": "Androidプラットフォームのみでダークモードをテストすればよい"
      },
      {
        "vi": "Kiểm tra độ tương phản văn bản, icon, hình ảnh không bị vỡ hoặc khó đọc khi chuyển đổi giữa chế độ sáng/tối, kể cả khi hệ thống tự đổi lúc app đang chạy",
        "en": "Check that text, icon, and image contrast doesn't break or become hard to read when toggling between light/dark, including when the system switches while the app is running",
        "ja": "アプリ実行中にシステム側で切り替わる場合も含め、ライト・ダークモード切替時にテキストやアイコン、画像のコントラストが崩れたり読みにくくなったりしないことを確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dark mode có thể gây lỗi tương phản (text tối trên nền tối), ảnh không đảo màu đúng, hoặc UI không cập nhật khi hệ thống chuyển chế độ động (dynamic switching).",
      "en": "Dark mode can cause contrast issues (dark text on dark background), incorrectly inverted images, or UI not updating on dynamic system switching.",
      "ja": "ダークモードでは、暗い背景に暗いテキストといったコントラスト問題、画像の色反転の不備、動的切替時にUIが更新されない問題などが発生しやすい。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mục tiêu chính khi kiểm thử accessibility bằng trình đọc màn hình (TalkBack trên Android, VoiceOver trên iOS) là gì?",
      "en": "What is the primary goal of accessibility testing using screen readers (TalkBack on Android, VoiceOver on iOS)?",
      "ja": "スクリーンリーダー（AndroidのTalkBack、iOSのVoiceOver）を用いたアクセシビリティテストの主な目的は何か。"
    },
    "options": [
      {
        "vi": "Đảm bảo người dùng khiếm thị có thể điều hướng và nghe mô tả chính xác các thành phần giao diện thông qua trình đọc màn hình",
        "en": "Ensure visually impaired users can navigate and hear accurate descriptions of UI elements through the screen reader",
        "ja": "視覚障がいのあるユーザーがスクリーンリーダーを通じてUI要素を正確に説明され、操作をナビゲートできることを保証すること"
      },
      {
        "vi": "Kiểm tra dung lượng file cài đặt ứng dụng",
        "en": "Check the app's installation file size",
        "ja": "アプリのインストールファイルサイズを確認すること"
      },
      {
        "vi": "Kiểm tra mức tiêu thụ pin khi bật tính năng hỗ trợ",
        "en": "Check battery consumption when accessibility features are enabled",
        "ja": "アクセシビリティ機能を有効にした際のバッテリー消費量を確認すること"
      },
      {
        "vi": "Kiểm tra tốc độ phản hồi của mạng",
        "en": "Check network response speed",
        "ja": "ネットワークの応答速度を確認すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Accessibility testing đảm bảo trải nghiệm bao trùm, kiểm tra label mô tả, thứ tự focus, và khả năng thao tác không cần nhìn màn hình.",
      "en": "Accessibility testing ensures an inclusive experience, verifying descriptive labels, focus order, and the ability to interact without viewing the screen.",
      "ja": "アクセシビリティテストは、説明ラベルやフォーカス順序、画面を見なくても操作できるかどうかを検証し、包摂的な体験を保証する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi người dùng đang tải video lên và mạng chuyển từ Wi-Fi sang mạng di động giữa chừng, test case cần verify là gì?",
      "en": "When a user is uploading a video and the network switches from Wi-Fi to mobile data mid-way, what test case needs to be verified?",
      "ja": "ユーザーが動画をアップロード中に、途中でWi-Fiからモバイルデータ通信に切り替わった場合、確認すべきテストケースは何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra tên mạng Wi-Fi hiển thị đúng",
        "en": "Check that the Wi-Fi network name displays correctly",
        "ja": "Wi-Fiネットワーク名が正しく表示されるか確認すること"
      },
      {
        "vi": "App cần duy trì phiên đăng nhập và tiếp tục tác vụ tải lên/tải xuống mà không bị gián đoạn khi chuyển mạng",
        "en": "The app should maintain the login session and continue the upload/download task without interruption when switching networks",
        "ja": "ネットワーク切替時にログインセッションを維持し、アップロード／ダウンロード処理が中断されずに継続すること"
      },
      {
        "vi": "Kiểm tra tốc độ xử lý của CPU thiết bị",
        "en": "Check the device CPU's processing speed",
        "ja": "端末CPUの処理速度を確認すること"
      },
      {
        "vi": "Kiểm tra dung lượng pin còn lại sau khi chuyển mạng",
        "en": "Check remaining battery after switching networks",
        "ja": "ネットワーク切替後の残バッテリー量を確認すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chuyển đổi mạng giữa phiên (network handoff) là điểm dễ gây lỗi treo hoặc mất tiến trình tải; app tốt cần xử lý mượt mà, giữ nguyên phiên và tác vụ.",
      "en": "Mid-session network handoff is a common source of hangs or lost upload progress; a well-built app must handle this smoothly, preserving both session and task.",
      "ja": "セッション中のネットワーク切替は、処理のフリーズやアップロード進捗の喪失を引き起こしやすい箇所であり、優れたアプリはセッションとタスクの両方を維持しつつ円滑に対応する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi người dùng tạo/sửa dữ liệu lúc thiết bị offline, sau đó mạng khôi phục, test case quan trọng nhất cần verify là gì?",
      "en": "When a user creates/edits data while offline and the network is then restored, what is the most critical test case to verify?",
      "ja": "ユーザーがオフライン中にデータを作成・編集し、その後ネットワークが復旧した場合、最も重要な確認すべきテストケースは何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra tốc độ hiển thị giao diện khi không có mạng",
        "en": "Check UI rendering speed when there is no network",
        "ja": "通信がない状態でのUI表示速度を確認すること"
      },
      {
        "vi": "Kiểm tra ngôn ngữ hiển thị khi mất mạng",
        "en": "Check the display language when the network is lost",
        "ja": "通信断時の表示言語を確認すること"
      },
      {
        "vi": "Dữ liệu được tạo hoặc chỉnh sửa lúc offline phải được đồng bộ chính xác và xử lý xung đột hợp lý khi thiết bị có mạng trở lại",
        "en": "Data created or edited while offline must sync accurately and handle conflicts sensibly once the device regains network connectivity",
        "ja": "オフライン中に作成・編集されたデータが、通信復旧後に正確に同期され、コンフリクトが適切に処理されること"
      },
      {
        "vi": "Kiểm tra biểu tượng cảnh báo mất mạng có đúng màu sắc không",
        "en": "Check whether the no-network warning icon has the correct color",
        "ja": "通信断警告アイコンの色が正しいかを確認すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Offline-to-online sync là kịch bản dễ gây mất dữ liệu hoặc xung đột (conflict) nếu cùng dữ liệu bị sửa ở nhiều nơi; cần có chiến lược xử lý conflict rõ ràng.",
      "en": "Offline-to-online sync easily causes data loss or conflicts if the same data is edited in multiple places; a clear conflict-resolution strategy is essential.",
      "ja": "オフラインからオンラインへの同期は、同じデータが複数箇所で編集された場合にデータ消失やコンフリクトを引き起こしやすく、明確なコンフリクト解決戦略が不可欠である。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi bàn phím ảo hiện lên trong lúc người dùng nhập liệu trên một form dài, test case quan trọng cần kiểm tra là gì?",
      "en": "When the on-screen keyboard appears while a user is entering data on a long form, what important test case needs to be checked?",
      "ja": "長いフォームへの入力中にソフトウェアキーボードが表示された場合、確認すべき重要なテストケースは何か。"
    },
    "options": [
      {
        "vi": "Không cần test vì hệ điều hành tự động xử lý việc che khuất bàn phím",
        "en": "No testing needed since the OS automatically handles keyboard overlap",
        "ja": "OSがキーボードの重なりを自動処理するためテスト不要である"
      },
      {
        "vi": "Kiểm tra font chữ trên bàn phím ảo có đúng không",
        "en": "Check whether the font on the on-screen keyboard is correct",
        "ja": "ソフトウェアキーボードのフォントが正しいか確認すること"
      },
      {
        "vi": "Kiểm tra ngôn ngữ gõ trên bàn phím có đổi theo hệ thống không",
        "en": "Check whether the keyboard input language changes according to system settings",
        "ja": "キーボードの入力言語がシステム設定に応じて変わるか確認すること"
      },
      {
        "vi": "Khi bàn phím ảo hiện lên, các trường nhập liệu và nút quan trọng không bị che khuất, người dùng có thể cuộn để thấy và tương tác",
        "en": "When the keyboard appears, important input fields and buttons must not be obscured, and the user can scroll to see and interact with them",
        "ja": "キーボードが表示された際、重要な入力欄やボタンが隠れず、ユーザーがスクロールして表示・操作できること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Bàn phím ảo chiếm gần nửa màn hình trên thiết bị nhỏ, dễ che khuất input hoặc nút submit nếu layout không tự điều chỉnh (resize/scroll) đúng.",
      "en": "On smaller devices, the on-screen keyboard can occupy nearly half the screen, easily hiding inputs or the submit button if the layout doesn't adjust (resize/scroll) properly.",
      "ja": "小型端末ではソフトウェアキーボードが画面のほぼ半分を占めることがあり、レイアウトが適切にリサイズ・スクロール対応していないと入力欄や送信ボタンが隠れてしまう。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test app với thiết bị bật chế độ tiết kiệm pin (power saving mode) hoặc pin yếu, cần đặc biệt quan tâm điều gì?",
      "en": "When testing an app on a device with power-saving mode enabled or low battery, what needs special attention?",
      "ja": "端末が省電力モードを有効にしている、またはバッテリー残量が少ない状態でアプリをテストする際、特に注意すべき点は何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra các tác vụ nền (đồng bộ dữ liệu, theo dõi vị trí, thông báo đẩy) có bị hệ điều hành giới hạn và app xử lý phù hợp khi chế độ tiết kiệm pin được bật",
        "en": "Check that background tasks (data sync, location tracking, push notifications) are limited by the OS and the app handles this appropriately when power-saving mode is enabled",
        "ja": "省電力モード有効時に、バックグラウンドタスク（データ同期、位置情報追跡、プッシュ通知）がOSによって制限され、アプリがそれに適切に対応することを確認すること"
      },
      {
        "vi": "Kiểm tra tốc độ mạng khi pin yếu",
        "en": "Check network speed when the battery is low",
        "ja": "バッテリー残量が少ない時のネットワーク速度を確認すること"
      },
      {
        "vi": "Kiểm tra ngôn ngữ hiển thị khi bật chế độ tiết kiệm pin",
        "en": "Check the display language when power-saving mode is on",
        "ja": "省電力モード有効時の表示言語を確認すること"
      },
      {
        "vi": "Kiểm tra màu sắc của biểu tượng pin trên thanh trạng thái",
        "en": "Check the color of the battery icon in the status bar",
        "ja": "ステータスバーのバッテリーアイコンの色を確認すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Power saving mode có thể hạn chế background sync, GPS, và push, khiến app cần fallback hợp lý (như thông báo cho user) thay vì âm thầm mất tính năng.",
      "en": "Power-saving mode can restrict background sync, GPS, and push; the app needs a sensible fallback (e.g., notifying the user) rather than silently losing functionality.",
      "ja": "省電力モードはバックグラウンド同期、GPS、プッシュ通知を制限することがあり、アプリは機能を無言で失うのではなく、ユーザーへの通知など適切なフォールバックを備える必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi test tính năng chia đôi màn hình (split-screen/multi-window) trên Android, cần kiểm tra điều gì?",
      "en": "When testing split-screen/multi-window mode on Android, what needs to be checked?",
      "ja": "Androidの分割画面（マルチウィンドウ）機能をテストする際、何を確認する必要があるか。"
    },
    "options": [
      {
        "vi": "Kiểm tra mức tiêu thụ pin khi chỉ dùng một ứng dụng",
        "en": "Check battery consumption when using only one app",
        "ja": "アプリを1つだけ使用している場合のバッテリー消費量を確認すること"
      },
      {
        "vi": "App phải hiển thị và hoạt động đúng, bố cục không bị vỡ khi chạy song song với ứng dụng khác ở chế độ chia đôi màn hình",
        "en": "The app must display and function correctly, with the layout not breaking, when running alongside another app in split-screen mode",
        "ja": "分割画面モードで他のアプリと並行して動作している際、アプリが正しく表示・動作し、レイアウトが崩れないこと"
      },
      {
        "vi": "Kiểm tra tốc độ mạng khi chỉ dùng một ứng dụng",
        "en": "Check network speed when using only one app",
        "ja": "アプリを1つだけ使用している場合のネットワーク速度を確認すること"
      },
      {
        "vi": "Không cần test vì tính năng chia đôi màn hình hiếm khi được người dùng sử dụng",
        "en": "No need to test since split-screen is rarely used by users",
        "ja": "分割画面機能はユーザーにほとんど使われないためテスト不要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ở chế độ split-screen, app phải xử lý resize động, tránh vỡ layout hoặc mất tương tác do vùng hiển thị bị thu hẹp đáng kể.",
      "en": "In split-screen mode, the app must handle dynamic resizing, avoiding broken layouts or lost interactivity due to significantly reduced display area.",
      "ja": "分割画面モードでは、アプリは動的なリサイズに対応し、表示領域が大幅に縮小してもレイアウト崩れや操作不能を起こさないようにする必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi app ở chế độ nền (background) quá thời gian quy định của chính sách bảo mật, mở lại ứng dụng cần kiểm tra hành vi nào?",
      "en": "When an app stays in the background beyond the security policy's defined timeout, what behavior needs to be checked upon reopening?",
      "ja": "アプリがセキュリティポリシーで定められた時間を超えてバックグラウンドに滞在した場合、再度開いた際にどのような挙動を確認する必要があるか。"
    },
    "options": [
      {
        "vi": "Kiểm tra màu sắc giao diện có thay đổi khi mở lại app không",
        "en": "Check whether the UI color changes when reopening the app",
        "ja": "アプリ再起動時にUIの色が変わるかどうかを確認すること"
      },
      {
        "vi": "Kiểm tra tốc độ tải hình ảnh khi mở lại app",
        "en": "Check image loading speed when reopening the app",
        "ja": "アプリ再起動時の画像読み込み速度を確認すること"
      },
      {
        "vi": "Khi app ở chế độ nền quá thời gian quy định, mở lại ứng dụng phải yêu cầu đăng nhập hoặc xác thực lại đúng theo chính sách bảo mật",
        "en": "After exceeding the background time limit, reopening the app must require re-login or re-authentication as per the security policy",
        "ja": "アプリが規定時間を超えてバックグラウンドに滞在した場合、再度開くとセキュリティポリシーに従って再ログインまたは再認証が求められること"
      },
      {
        "vi": "Kiểm tra ngôn ngữ hiển thị có bị đổi khi mở lại app không",
        "en": "Check whether the display language changes when reopening the app",
        "ja": "アプリ再起動時に表示言語が変わるかどうかを確認すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Session timeout khi background lâu là cơ chế bảo mật quan trọng, đặc biệt với app tài chính/ngân hàng; cần verify đúng ngưỡng thời gian và luồng yêu cầu xác thực lại.",
      "en": "Session timeout after prolonged backgrounding is a critical security mechanism, especially for financial/banking apps; the exact timeout threshold and re-authentication flow must be verified.",
      "ja": "長時間バックグラウンドに滞在した後のセッションタイムアウトは、特に金融・銀行系アプリにとって重要なセキュリティ機構であり、正確な時間閾値と再認証フローを検証する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sprint trong Scrum được định nghĩa như thế nào?",
      "en": "How is a Sprint defined in Scrum?",
      "ja": "スクラムにおけるスプリントはどのように定義されますか。"
    },
    "options": [
      {
        "vi": "Một cuộc họp duy nhất để lên kế hoạch cho cả dự án",
        "en": "A single meeting to plan the entire project",
        "ja": "プロジェクト全体を計画する一度きりの会議"
      },
      {
        "vi": "Thời gian không giới hạn cho đến khi sản phẩm hoàn thiện 100%",
        "en": "An unlimited period lasting until the product is 100% complete",
        "ja": "製品が100%完成するまでの無制限の期間"
      },
      {
        "vi": "Giai đoạn chỉ dành riêng cho việc kiểm thử sau khi code hoàn tất",
        "en": "A phase reserved only for testing after coding is complete",
        "ja": "コーディング完了後にテストのみを行う期間"
      },
      {
        "vi": "Một khoảng thời gian cố định (thường 1-4 tuần) trong đó team tạo ra một phần tăng trưởng sản phẩm có thể sử dụng được",
        "en": "A fixed-length timebox (usually 1-4 weeks) in which the team creates a usable product increment",
        "ja": "チームが利用可能なプロダクトインクリメントを作成する固定期間（通常1〜4週間）のタイムボックス"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sprint là một timebox cố định, lặp lại, trong đó team phát triển và kiểm thử để tạo ra increment có thể release được, không phải một pha riêng lẻ cho test.",
      "en": "A Sprint is a fixed, repeating timebox during which the team develops and tests to produce a releasable increment, not a separate test-only phase.",
      "ja": "スプリントは固定で繰り返されるタイムボックスであり、チームは開発とテストを行いリリース可能なインクリメントを作成します。テスト専用の独立フェーズではありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Definition of Done (DoD) trong Scrum có ý nghĩa gì với tester?",
      "en": "What does the Definition of Done (DoD) mean for a tester in Scrum?",
      "ja": "スクラムにおけるDefinition of Done（DoD）はテスターにとってどのような意味を持ちますか。"
    },
    "options": [
      {
        "vi": "Là bộ tiêu chí chung áp dụng cho mọi hạng mục công việc, xác định khi nào một item được coi là hoàn tất (bao gồm cả kiểm thử đạt yêu cầu)",
        "en": "A shared set of criteria applied to every work item, defining when an item is considered complete (including passing required testing)",
        "ja": "すべての作業項目に適用される共通の基準セットであり、必要なテストの合格を含め、項目がいつ完了とみなされるかを定義するもの"
      },
      {
        "vi": "Là tài liệu mô tả kiến trúc kỹ thuật của hệ thống",
        "en": "A document describing the system's technical architecture",
        "ja": "システムの技術アーキテクチャを記述した文書"
      },
      {
        "vi": "Là danh sách công việc cá nhân của Product Owner cần hoàn thành",
        "en": "A personal to-do list for the Product Owner to complete",
        "ja": "プロダクトオーナー個人のタスクリスト"
      },
      {
        "vi": "Là ước lượng thời gian hoàn thành sprint do Scrum Master đưa ra",
        "en": "A time estimate for sprint completion given by the Scrum Master",
        "ja": "スクラムマスターが示すスプリント完了の時間見積もり"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "DoD là checklist chung (build pass, test pass, code review xong, không còn defect nghiêm trọng...) giúp cả team thống nhất tiêu chuẩn hoàn tất, tránh 'done' mơ hồ.",
      "en": "The DoD is a shared checklist (build passes, tests pass, code reviewed, no critical defects, etc.) that gives the whole team a consistent standard of completeness, avoiding an ambiguous 'done'.",
      "ja": "DoDは（ビルド成功、テスト合格、コードレビュー完了、重大な欠陥がないなど）チーム全体で共有される完了基準のチェックリストであり、曖昧な「完了」を防ぎます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "User Story thường được viết theo cấu trúc nào?",
      "en": "Which structure is commonly used to write a User Story?",
      "ja": "ユーザーストーリーは一般的にどのような構造で書かれますか。"
    },
    "options": [
      {
        "vi": "\"Bước 1... Bước 2... Kết quả mong đợi...\"",
        "en": "\"Step 1... Step 2... Expected result...\"",
        "ja": "「ステップ1…ステップ2…期待結果…」"
      },
      {
        "vi": "\"Là một [vai trò], tôi muốn [chức năng], để [lợi ích/mục đích]\"",
        "en": "\"As a [role], I want [feature], so that [benefit/goal]\"",
        "ja": "「[役割]として、[機能]をしたい。それは[目的・利益]のためだ」"
      },
      {
        "vi": "\"Given... When... Then...\" chỉ dùng riêng cho user story, không dùng cho test case",
        "en": "\"Given... When... Then...\" used exclusively for user stories, never for test cases",
        "ja": "「Given…When…Then…」はユーザーストーリー専用でテストケースには使わない"
      },
      {
        "vi": "\"Mục tiêu - Rủi ro - Phạm vi - Lịch trình\" giống một test plan",
        "en": "\"Objective - Risk - Scope - Schedule\", similar to a test plan",
        "ja": "「目的・リスク・範囲・スケジュール」のようなテスト計画形式"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mẫu chuẩn 'As a... I want... so that...' giúp làm rõ ai cần chức năng, chức năng đó là gì và giá trị mang lại, hỗ trợ tester hiểu ngữ cảnh nghiệp vụ.",
      "en": "The standard 'As a... I want... so that...' template clarifies who needs the feature, what it is, and its value, helping testers understand the business context.",
      "ja": "「As a…I want…so that…」の標準テンプレートは、誰がその機能を必要とし、何であり、どんな価値をもたらすかを明確にし、テスターがビジネス文脈を理解する助けになります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Acceptance Criteria (tiêu chí chấp nhận) của một user story thường do ai xác định chính và tester dùng để làm gì?",
      "en": "Who primarily defines the Acceptance Criteria of a user story, and what do testers use it for?",
      "ja": "ユーザーストーリーの受け入れ基準（Acceptance Criteria）は主に誰が定義し、テスターは何のために使いますか。"
    },
    "options": [
      {
        "vi": "Do tester tự đặt ra sau khi code xong, dùng để viết tài liệu hướng dẫn sử dụng",
        "en": "Set solely by testers after coding is done, used to write user manuals",
        "ja": "コーディング後にテスターだけが決め、ユーザーマニュアル作成に使う"
      },
      {
        "vi": "Do bộ phận vận hành (DevOps) đặt ra, dùng để cấu hình server",
        "en": "Set by the DevOps team, used to configure servers",
        "ja": "DevOpsチームが決め、サーバー設定に使う"
      },
      {
        "vi": "Thường do Product Owner cùng team (bao gồm tester) thống nhất, mô tả điều kiện cụ thể để story được coi là chấp nhận được; tester dùng làm cơ sở thiết kế test case",
        "en": "Typically agreed between the Product Owner and the team (including testers), describing the specific conditions for the story to be accepted; testers use it as the basis for designing test cases",
        "ja": "通常プロダクトオーナーとチーム（テスターを含む）が合意して定義し、ストーリーが受け入れ可能とみなされる具体的条件を記述する。テスターはこれをテストケース設計の根拠として使う"
      },
      {
        "vi": "Do lập trình viên tự quyết định độc lập, dùng để tối ưu hiệu năng code",
        "en": "Decided independently by developers, used to optimize code performance",
        "ja": "開発者が独自に決め、コードのパフォーマンス最適化に使う"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Acceptance Criteria là điều kiện rõ ràng, kiểm chứng được, thường thống nhất trước khi vào sprint và là nguồn chính để tester xây dựng test case đảm bảo đúng phạm vi.",
      "en": "Acceptance Criteria are clear, verifiable conditions typically agreed before entering the sprint, and are the primary source testers use to build test cases that cover the correct scope.",
      "ja": "受け入れ基準は明確で検証可能な条件であり、通常スプリントに入る前に合意され、テスターが範囲を正しくカバーするテストケースを作成する主な根拠となります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Điểm khác biệt chính giữa Acceptance Criteria và Definition of Done là gì?",
      "en": "What is the key difference between Acceptance Criteria and the Definition of Done?",
      "ja": "受け入れ基準（AC）とDefinition of Done（DoD）の主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Chúng hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are exactly the same, just different names",
        "ja": "両者はまったく同じで名称が違うだけである"
      },
      {
        "vi": "AC chỉ dùng cho dự án Waterfall, DoD chỉ dùng cho dự án Agile",
        "en": "AC is used only in Waterfall projects, DoD only in Agile projects",
        "ja": "ACはウォーターフォールプロジェクト専用、DoDはアジャイルプロジェクト専用である"
      },
      {
        "vi": "DoD chỉ do khách hàng viết, AC chỉ do lập trình viên viết",
        "en": "DoD is written only by the customer, AC only by developers",
        "ja": "DoDは顧客のみが書き、ACは開発者のみが書く"
      },
      {
        "vi": "AC áp dụng riêng cho từng user story cụ thể, còn DoD là tiêu chuẩn chung áp dụng cho mọi item của team",
        "en": "AC applies specifically to each individual user story, while DoD is a general standard applied to every item the team works on",
        "ja": "ACは個々のユーザーストーリーに固有に適用され、DoDはチームが扱うすべての項目に共通して適用される基準である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "AC là điều kiện đặc thù của từng story (functional), trong khi DoD là checklist chất lượng chung (coding standard, test coverage, review...) áp dụng đồng nhất cho mọi story.",
      "en": "AC are story-specific functional conditions, whereas DoD is a common quality checklist (coding standards, test coverage, review, etc.) applied uniformly to all stories.",
      "ja": "ACは各ストーリー固有の機能的条件であり、DoDはすべてのストーリーに一律に適用される共通の品質チェックリスト（コーディング規約、テストカバレッジ、レビューなど）です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong buổi Sprint Planning, vai trò của tester nên là gì?",
      "en": "In Sprint Planning, what should the tester's role be?",
      "ja": "スプリントプランニングにおいてテスターの役割は何であるべきですか。"
    },
    "options": [
      {
        "vi": "Cùng team thảo luận để hiểu rõ yêu cầu, đặt câu hỏi làm rõ AC, ước lượng công sức kiểm thử và xác định rủi ro để đưa vào kế hoạch sprint",
        "en": "Discuss with the team to understand requirements, clarify AC, estimate testing effort, and identify risks to factor into the sprint plan",
        "ja": "チームと議論して要件を理解し、ACを明確化する質問をし、テスト工数を見積もり、リスクを特定してスプリント計画に反映する"
      },
      {
        "vi": "Chỉ đến để ghi chép biên bản cuộc họp",
        "en": "Attend only to take meeting minutes",
        "ja": "会議の議事録を取るためだけに参加する"
      },
      {
        "vi": "Ngồi im lắng nghe, không tham gia vì Sprint Planning chỉ dành cho developer",
        "en": "Sit silently and listen, since Sprint Planning is only for developers",
        "ja": "スプリントプランニングは開発者専用なので黙って聞くだけ"
      },
      {
        "vi": "Chỉ tham gia sau khi tất cả story đã được lập trình viên code xong",
        "en": "Only join after developers have finished coding all stories",
        "ja": "開発者が全ストーリーのコーディングを終えた後にのみ参加する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tester là thành viên đầy đủ của team, cần tham gia thảo luận từ đầu để phát hiện điểm chưa rõ, ước lượng effort test và đảm bảo story testable trước khi cam kết vào sprint.",
      "en": "The tester is a full team member and should join discussions early to catch ambiguities, estimate test effort, and ensure stories are testable before committing to the sprint.",
      "ja": "テスターはチームの正式なメンバーであり、早期に議論に参加して曖昧な点を見つけ、テスト工数を見積もり、スプリントにコミットする前にストーリーがテスト可能であることを確認すべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Daily Standup (họp đứng hàng ngày), tester nên báo cáo nội dung gì là phù hợp nhất?",
      "en": "In the Daily Standup, what content is most appropriate for a tester to report?",
      "ja": "デイリースタンドアップにおいてテスターが報告すべき最も適切な内容は何ですか。"
    },
    "options": [
      {
        "vi": "Trình bày chi tiết toàn bộ test case đã viết trong 15 phút",
        "en": "Present every written test case in detail for 15 minutes",
        "ja": "作成したすべてのテストケースを15分かけて詳細に説明する"
      },
      {
        "vi": "Ngắn gọn: hôm qua đã kiểm thử gì, hôm nay dự định kiểm thử gì, có trở ngại/rủi ro nào cần team hỗ trợ",
        "en": "Briefly: what was tested yesterday, what will be tested today, and any blockers or risks needing team support",
        "ja": "簡潔に：昨日何をテストしたか、今日何をテストする予定か、チームの支援が必要な障害やリスクは何か"
      },
      {
        "vi": "Đọc lại toàn bộ Acceptance Criteria của từng story",
        "en": "Read out the full Acceptance Criteria of every story",
        "ja": "すべてのストーリーの受け入れ基準を丸ごと読み上げる"
      },
      {
        "vi": "Chỉ nói về vấn đề cá nhân không liên quan đến công việc",
        "en": "Talk only about personal matters unrelated to work",
        "ja": "仕事に関係のない個人的な話だけをする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Daily Standup nhằm đồng bộ tiến độ và phát hiện sớm trở ngại, nên phần báo cáo cần ngắn gọn, tập trung vào tiến độ và rủi ro, không đi sâu chi tiết kỹ thuật.",
      "en": "The Daily Standup exists to synchronize progress and surface blockers early, so updates should be concise and focused on progress and risk, not deep technical detail.",
      "ja": "デイリースタンドアップは進捗の同期と障害の早期発見を目的とするため、報告は簡潔にし、技術的な詳細ではなく進捗とリスクに焦点を当てるべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sự khác nhau cơ bản giữa Sprint Review và Sprint Retrospective là gì?",
      "en": "What is the fundamental difference between Sprint Review and Sprint Retrospective?",
      "ja": "スプリントレビューとスプリントレトロスペクティブの基本的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Cả hai đều chỉ bàn về lỗi (bug) còn tồn đọng",
        "en": "Both only discuss remaining open bugs",
        "ja": "どちらも未解決のバグについてのみ話し合う"
      },
      {
        "vi": "Sprint Review chỉ dành cho Scrum Master, Retrospective chỉ dành cho khách hàng",
        "en": "Sprint Review is only for the Scrum Master, Retrospective is only for the customer",
        "ja": "スプリントレビューはスクラムマスター専用、レトロスペクティブは顧客専用である"
      },
      {
        "vi": "Sprint Review tập trung trình bày/kiểm tra sản phẩm tăng trưởng với các bên liên quan (thường có demo), còn Retrospective tập trung nhìn lại cách team làm việc để cải tiến quy trình",
        "en": "Sprint Review focuses on demonstrating/inspecting the product increment with stakeholders (usually a demo), while Retrospective focuses on reflecting on how the team worked to improve the process",
        "ja": "スプリントレビューはステークホルダーに対してプロダクトインクリメントをデモ・検査することに重点があり、レトロスペクティブはチームの働き方を振り返り、プロセスを改善することに重点がある"
      },
      {
        "vi": "Sprint Review là họp bàn về hạng mục kỹ thuật riêng cho developer, không có tester tham gia",
        "en": "Sprint Review is a technical meeting exclusively for developers, testers do not attend",
        "ja": "スプリントレビューは開発者だけの技術会議でテスターは参加しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Sprint Review hướng ra ngoài (sản phẩm, stakeholder), Sprint Retrospective hướng vào trong (quy trình, con người, cách làm việc của team, bao gồm cả quy trình test).",
      "en": "Sprint Review looks outward at the product and stakeholders, while Sprint Retrospective looks inward at process, people, and how the team (including testing practices) works.",
      "ja": "スプリントレビューは製品とステークホルダーという外側に目を向け、レトロスペクティブはプロセスや人、チーム（テストプロセスを含む）の働き方という内側に目を向けます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Backlog refinement (grooming) là gì và tester nên tham gia với vai trò nào?",
      "en": "What is backlog refinement (grooming) and what role should the tester play in it?",
      "ja": "バックログリファインメント（グルーミング）とは何であり、テスターはどのような役割を果たすべきですか。"
    },
    "options": [
      {
        "vi": "Là hoạt động xóa bớt các story không cần thiết khỏi backlog, tester không cần tham gia",
        "en": "An activity to delete unnecessary stories from the backlog; testers don't need to join",
        "ja": "不要なストーリーをバックログから削除する活動で、テスターの参加は不要である"
      },
      {
        "vi": "Là hoạt động do khách hàng tự thực hiện, team không tham gia",
        "en": "An activity performed solely by the customer without team involvement",
        "ja": "顧客だけが行う活動でチームは関与しない"
      },
      {
        "vi": "Là công việc chỉ diễn ra một lần duy nhất ở đầu dự án",
        "en": "A one-time activity that happens only at the start of the project",
        "ja": "プロジェクト開始時に一度だけ行われる活動である"
      },
      {
        "vi": "Là hoạt động team thường xuyên rà soát, làm rõ, ước lượng và sắp xếp thứ tự ưu tiên các item trong backlog; tester nên tham gia để đặt câu hỏi làm rõ yêu cầu và phát hiện sớm rủi ro/testability",
        "en": "An ongoing activity where the team reviews, clarifies, estimates, and prioritizes backlog items; testers should join to ask clarifying questions and spot testability/risk issues early",
        "ja": "チームが定期的にバックログ項目を見直し、明確化し、見積もり、優先順位付けする活動であり、テスターは要件を明確化する質問をし、テスト容易性やリスクを早期に発見するために参加すべきである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Refinement diễn ra liên tục trong dự án Agile, giúp backlog luôn sẵn sàng cho sprint sau; sự tham gia sớm của tester giúp phát hiện AC mơ hồ hoặc yêu cầu khó kiểm thử trước khi vào sprint.",
      "en": "Refinement happens continuously throughout an Agile project to keep the backlog ready for future sprints; early tester involvement helps catch vague AC or hard-to-test requirements before they enter a sprint.",
      "ja": "リファインメントはアジャイルプロジェクトを通じて継続的に行われ、バックログを常に次のスプリントに備えた状態に保ちます。テスターが早期に関与することで、曖昧なACやテストしにくい要件をスプリントに入る前に発見できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Definition of Ready (DoR) khác với Definition of Done (DoD) ở điểm nào?",
      "en": "How does the Definition of Ready (DoR) differ from the Definition of Done (DoD)?",
      "ja": "Definition of Ready（DoR）はDefinition of Done（DoD）とどう違いますか。"
    },
    "options": [
      {
        "vi": "DoR là tiêu chí xác định một story đã đủ thông tin/rõ ràng để có thể đưa vào sprint, còn DoD là tiêu chí xác định khi nào công việc được coi là hoàn tất",
        "en": "DoR is the criteria for whether a story has enough clarity/information to be pulled into a sprint, while DoD is the criteria for when work is considered complete",
        "ja": "DoRはストーリーがスプリントに取り込むのに十分な情報・明確さを持っているかを判断する基準であり、DoDは作業がいつ完了とみなされるかを判断する基準である"
      },
      {
        "vi": "DoR và DoD là một khái niệm giống hệt nhau, chỉ dùng ở hai team khác nhau",
        "en": "DoR and DoD are identical concepts, just used by different teams",
        "ja": "DoRとDoDは全く同じ概念でチームによって呼び方が違うだけである"
      },
      {
        "vi": "DoR chỉ áp dụng cho Product Owner, DoD chỉ áp dụng cho tester",
        "en": "DoR applies only to the Product Owner, DoD applies only to testers",
        "ja": "DoRはプロダクトオーナーのみに適用され、DoDはテスターのみに適用される"
      },
      {
        "vi": "DoR được đánh giá sau khi release sản phẩm, DoD được đánh giá trước khi bắt đầu sprint",
        "en": "DoR is assessed after product release, DoD is assessed before the sprint starts",
        "ja": "DoRは製品リリース後に評価され、DoDはスプリント開始前に評価される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "DoR là 'cổng vào' của story (đủ rõ ràng, có AC, ước lượng được), DoD là 'cổng ra' xác nhận công việc thực sự hoàn tất bao gồm cả kiểm thử.",
      "en": "DoR is the 'entry gate' for a story (clear enough, has AC, estimable), while DoD is the 'exit gate' confirming the work is truly complete, including testing.",
      "ja": "DoRはストーリーの「入口ゲート」（十分明確でACがあり見積もり可能）であり、DoDはテストを含め作業が本当に完了したことを確認する「出口ゲート」です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Theo mô hình INVEST, một user story tốt cần có tính chất gì liên quan đến khả năng kiểm thử?",
      "en": "According to the INVEST model, what quality should a good user story have related to testability?",
      "ja": "INVESTモデルによると、良いユーザーストーリーはテスト容易性に関してどのような性質を持つべきですか。"
    },
    "options": [
      {
        "vi": "Complex (phức tạp) - càng phức tạp càng dễ kiểm thử",
        "en": "Complex - the more complex, the easier to test",
        "ja": "Complex（複雑）— 複雑であるほどテストしやすい"
      },
      {
        "vi": "Testable (có thể kiểm thử được) - phải có tiêu chí rõ ràng để xác định story đúng hay sai sau khi triển khai",
        "en": "Testable - it must have clear criteria to determine whether the story is correct once implemented",
        "ja": "Testable（テスト可能）— 実装後にストーリーが正しいかどうかを判断できる明確な基準を持つべきである"
      },
      {
        "vi": "Time-boxed (giới hạn thời gian tuyệt đối) - không được thay đổi trong bất kỳ trường hợp nào",
        "en": "Time-boxed (absolutely fixed) - must never change under any circumstance",
        "ja": "Time-boxed（絶対に固定）— いかなる状況でも変更してはならない"
      },
      {
        "vi": "Technical (mang tính kỹ thuật thuần túy) - chỉ viết cho lập trình viên đọc",
        "en": "Technical (purely technical) - written only for developers to read",
        "ja": "Technical（純粋に技術的）— 開発者だけが読むために書かれるべきである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable. Chữ 'T' nhấn mạnh story cần rõ ràng để có thể viết test case và xác nhận kết quả.",
      "en": "INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable. The 'T' emphasizes that a story must be clear enough to write test cases and verify outcomes.",
      "ja": "INVESTはIndependent, Negotiable, Valuable, Estimable, Small, Testableの頭文字で、「T」はストーリーがテストケースを書き結果を検証できるほど明確であるべきことを強調します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Story point trong Scrum thể hiện điều gì?",
      "en": "What does a story point represent in Scrum?",
      "ja": "スクラムにおけるストーリーポイントは何を表しますか。"
    },
    "options": [
      {
        "vi": "Số giờ chính xác lập trình viên và tester phải bỏ ra, tính bằng đồng hồ bấm giờ",
        "en": "The exact number of hours developers and testers must spend, measured by a stopwatch",
        "ja": "開発者とテスターが費やすべき正確な時間数（ストップウォッチで計測）"
      },
      {
        "vi": "Số tiền lương được trả cho story đó",
        "en": "The salary paid for completing that story",
        "ja": "そのストーリーに支払われる給与額"
      },
      {
        "vi": "Độ lớn tương đối (bao gồm độ phức tạp, khối lượng công việc, rủi ro và cả công sức kiểm thử) so với các story khác, không phải đơn vị thời gian tuyệt đối",
        "en": "A relative measure (including complexity, effort, risk, and testing effort) compared to other stories, not an absolute unit of time",
        "ja": "（複雑さ、作業量、リスク、テスト工数を含む）他のストーリーと比較した相対的な規模を表し、絶対的な時間単位ではない"
      },
      {
        "vi": "Số lượng bug được phép tồn tại trong story",
        "en": "The number of bugs allowed to remain in the story",
        "ja": "そのストーリーに残ってよいバグの数"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Story point là đơn vị ước lượng tương đối (thường dùng Fibonacci/Planning Poker), giúp team so sánh độ khó giữa các story thay vì cam kết chính xác giờ làm.",
      "en": "Story points are a relative estimation unit (often using Fibonacci/Planning Poker) that let the team compare difficulty across stories rather than committing to exact hours.",
      "ja": "ストーリーポイントは（多くの場合フィボナッチ数列やプランニングポーカーを用いる）相対的な見積もり単位であり、正確な作業時間を約束するのではなく、ストーリー間の難易度を比較するために使われます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Velocity (vận tốc) của một Scrum team dùng để làm gì?",
      "en": "What is a Scrum team's velocity used for?",
      "ja": "スクラムチームのベロシティは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Đo tốc độ gõ code của từng lập trình viên trong ngày",
        "en": "Measure how fast each developer types code per day",
        "ja": "各開発者が1日にコードを入力する速さを測定する"
      },
      {
        "vi": "Là chỉ số dùng để so sánh và xếp hạng cá nhân giữa các tester với nhau",
        "en": "A metric to compare and rank individual testers against each other",
        "ja": "テスター同士を比較しランク付けするための指標"
      },
      {
        "vi": "Là thời gian trung bình để sửa một bug nghiêm trọng",
        "en": "The average time taken to fix a critical bug",
        "ja": "重大なバグを修正するのにかかる平均時間"
      },
      {
        "vi": "Đo lượng công việc (thường tính bằng story point) team hoàn thành trung bình mỗi sprint, giúp dự đoán khả năng hoàn thành backlog trong tương lai",
        "en": "Measures the amount of work (usually in story points) the team completes on average per sprint, helping forecast future backlog completion",
        "ja": "チームが平均して1スプリントあたりに完了する作業量（通常ストーリーポイント）を測定し、将来のバックログ完了を予測するのに役立つ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Velocity là chỉ số ở cấp team, dùng để lập kế hoạch dài hạn (release planning), không nên dùng để đánh giá năng suất cá nhân từng thành viên bao gồm tester.",
      "en": "Velocity is a team-level metric used for long-term planning (release planning); it should not be used to judge individual productivity, including that of testers.",
      "ja": "ベロシティはチームレベルの指標であり、長期計画（リリース計画）に使われます。テスターを含む個人の生産性を評価するために使うべきではありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Cuộc họp \"Three Amigos\" trong Agile thường có sự tham gia của những vai trò nào?",
      "en": "The \"Three Amigos\" meeting in Agile typically involves which roles?",
      "ja": "アジャイルにおける「スリーアミーゴス」ミーティングには通常どの役割が参加しますか。"
    },
    "options": [
      {
        "vi": "Product Owner (đại diện góc nhìn nghiệp vụ), Developer (đại diện góc nhìn kỹ thuật) và Tester (đại diện góc nhìn kiểm thử) để cùng thảo luận và làm rõ một user story trước khi phát triển",
        "en": "Product Owner (business perspective), Developer (technical perspective), and Tester (testing perspective) discussing together to clarify a user story before development",
        "ja": "プロダクトオーナー（ビジネス視点）、開発者（技術視点）、テスター（テスト視点）が共に議論し、開発前にユーザーストーリーを明確化する"
      },
      {
        "vi": "Ba lập trình viên senior, không có tester hay Product Owner",
        "en": "Three senior developers, no tester or Product Owner",
        "ja": "3人のシニア開発者のみで、テスターやプロダクトオーナーは含まれない"
      },
      {
        "vi": "Ba khách hàng khác nhau để bỏ phiếu chọn tính năng",
        "en": "Three different customers voting to choose a feature",
        "ja": "3人の異なる顧客が機能を投票で選ぶ"
      },
      {
        "vi": "Ba Scrum Master từ ba team khác nhau họp để chia sẻ kinh nghiệm quản lý",
        "en": "Three Scrum Masters from different teams sharing management experience",
        "ja": "異なる3チームのスクラムマスターがマネジメント経験を共有する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Three Amigos là kỹ thuật cộng tác sớm giữa business, dev và test nhằm thống nhất hiểu biết về yêu cầu và acceptance criteria, giảm thiểu hiểu sai trước khi code.",
      "en": "Three Amigos is an early collaboration technique among business, dev, and test to align understanding of requirements and acceptance criteria, reducing misinterpretation before coding.",
      "ja": "スリーアミーゴスは、ビジネス・開発・テストが早期に協力し、要件と受け入れ基準の理解を一致させ、コーディング前の誤解を減らす手法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong BDD (Behavior Driven Development), cấu trúc \"Given - When - Then\" dùng để làm gì?",
      "en": "In BDD (Behavior Driven Development), what is the \"Given - When - Then\" structure used for?",
      "ja": "BDD（ビヘイビア駆動開発）における「Given - When - Then」構造は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng để viết báo cáo bug cho lập trình viên",
        "en": "Only used to write bug reports for developers",
        "ja": "開発者向けのバグレポート作成にのみ使う"
      },
      {
        "vi": "Diễn đạt kịch bản kiểm thử/acceptance criteria dưới dạng ngôn ngữ tự nhiên, dễ hiểu cho cả business lẫn kỹ thuật: điều kiện ban đầu, hành động thực hiện, kết quả mong đợi",
        "en": "Express test scenarios/acceptance criteria in natural language understandable by both business and technical people: initial context, action taken, expected outcome",
        "ja": "テストシナリオ／受け入れ基準を、ビジネス側と技術側の双方に理解しやすい自然言語で表現する：前提条件、実行するアクション、期待される結果"
      },
      {
        "vi": "Là cú pháp lập trình bắt buộc phải dùng để viết code sản phẩm",
        "en": "A mandatory programming syntax required to write production code",
        "ja": "プロダクトコードを書く際に必ず使わなければならないプログラミング構文"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử hiệu năng (performance testing)",
        "en": "Applies only to performance testing",
        "ja": "パフォーマンステストにのみ適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Given-When-Then (Gherkin) giúp viết kịch bản dễ đọc, làm cầu nối giữa yêu cầu nghiệp vụ và test case tự động hoá, thường dùng trong các công cụ như Cucumber.",
      "en": "Given-When-Then (Gherkin) produces readable scenarios that bridge business requirements and automated test cases, commonly used with tools like Cucumber.",
      "ja": "Given-When-Then（Gherkin）は読みやすいシナリオを作り、ビジネス要件と自動テストケースの橋渡しをします。Cucumberのようなツールでよく使われます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Agile, Epic khác với User Story như thế nào?",
      "en": "In Agile, how does an Epic differ from a User Story?",
      "ja": "アジャイルにおいてエピックはユーザーストーリーとどう違いますか。"
    },
    "options": [
      {
        "vi": "Epic và User Story là hai tên gọi khác nhau của cùng một khái niệm, không có gì khác biệt",
        "en": "Epic and User Story are just two names for the same concept with no real difference",
        "ja": "エピックとユーザーストーリーは同じ概念の別名で、違いはない"
      },
      {
        "vi": "Epic chỉ do tester tạo ra, User Story chỉ do khách hàng tạo ra",
        "en": "Epics are created only by testers, User Stories only by customers",
        "ja": "エピックはテスターだけが作成し、ユーザーストーリーは顧客だけが作成する"
      },
      {
        "vi": "Epic là hạng mục lớn, thường cần nhiều sprint và được chia nhỏ thành nhiều User Story để dễ ước lượng, phát triển và kiểm thử",
        "en": "An Epic is a large body of work, typically spanning multiple sprints, broken down into smaller User Stories for easier estimation, development, and testing",
        "ja": "エピックは通常複数スプリントにまたがる大きな作業単位で、見積もり・開発・テストをしやすくするために複数のユーザーストーリーに分割される"
      },
      {
        "vi": "User Story luôn lớn hơn Epic về khối lượng công việc",
        "en": "A User Story is always larger than an Epic in terms of workload",
        "ja": "ユーザーストーリーは常にエピックよりも作業量が大きい"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Epic quá lớn để hoàn thành trong một sprint nên cần được chia (decompose) thành các User Story nhỏ hơn, giúp team dễ test và deliver theo từng phần.",
      "en": "An Epic is too large to complete in a single sprint, so it is decomposed into smaller User Stories, making it easier for the team to test and deliver incrementally.",
      "ja": "エピックは1スプリントで完了させるには大きすぎるため、より小さなユーザーストーリーに分割され、チームが段階的にテストし提供しやすくなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Scrum, \"Spike\" là gì?",
      "en": "In Scrum, what is a \"Spike\"?",
      "ja": "スクラムにおける「スパイク」とは何ですか。"
    },
    "options": [
      {
        "vi": "Một loại bug nghiêm trọng (critical bug) làm hệ thống sập đột ngột",
        "en": "A type of critical bug that causes the system to crash suddenly",
        "ja": "システムを突然クラッシュさせる重大なバグの一種"
      },
      {
        "vi": "Một biểu đồ thể hiện số lượng bug tăng đột biến trong sprint",
        "en": "A chart showing a sudden spike in the number of bugs during a sprint",
        "ja": "スプリント中にバグ数が急増したことを示すグラフ"
      },
      {
        "vi": "Tên gọi khác của Sprint Retrospective",
        "en": "Another name for the Sprint Retrospective",
        "ja": "スプリントレトロスペクティブの別名"
      },
      {
        "vi": "Một hoạt động nghiên cứu/khám phá có thời hạn (timeboxed) nhằm giải quyết câu hỏi kỹ thuật hoặc rủi ro chưa rõ trước khi ước lượng/triển khai story chính thức",
        "en": "A timeboxed research/exploration activity used to answer a technical question or reduce unclear risk before formally estimating/implementing a story",
        "ja": "正式にストーリーを見積もり・実装する前に、技術的な疑問や未知のリスクを解消するために行われる期限付きの調査・探索活動"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Spike thường được dùng khi team chưa đủ thông tin để ước lượng story (ví dụ công nghệ mới, tích hợp phức tạp), tester cũng có thể tham gia spike để đánh giá khả năng kiểm thử.",
      "en": "A Spike is used when the team lacks enough information to estimate a story (e.g. new technology, complex integration); testers can also join spikes to assess testability.",
      "ja": "スパイクは、チームがストーリーを見積もるための情報が不足している場合（新しい技術、複雑な統合など）に使われ、テスターもテスト容易性を評価するためにスパイクに参加できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Shift-left testing\" trong bối cảnh Agile nghĩa là gì?",
      "en": "What does \"shift-left testing\" mean in the context of Agile?",
      "ja": "アジャイルの文脈における「シフトレフトテスト」とは何を意味しますか。"
    },
    "options": [
      {
        "vi": "Đưa hoạt động kiểm thử (review yêu cầu, viết test case, kiểm thử sớm) tham gia ngay từ đầu vòng đời phát triển, thay vì chỉ đợi đến khi code hoàn tất",
        "en": "Involving testing activities (requirement review, test case writing, early testing) from the very start of the development lifecycle, rather than waiting until coding is finished",
        "ja": "コーディング完了を待つのではなく、開発ライフサイクルの初期段階から（要件レビュー、テストケース作成、早期テストなどの）テスト活動を組み込むこと"
      },
      {
        "vi": "Chuyển toàn bộ công việc kiểm thử sang giai đoạn cuối cùng của dự án",
        "en": "Moving all testing work to the very last phase of the project",
        "ja": "すべてのテスト作業をプロジェクトの最終段階に移すこと"
      },
      {
        "vi": "Chỉ áp dụng cho các dự án phát triển bằng ngôn ngữ lập trình có tên bắt đầu bằng chữ cái đứng trước L",
        "en": "Applies only to projects developed using programming languages whose names come before the letter L alphabetically",
        "ja": "アルファベット順でLより前に来る名前のプログラミング言語で開発されたプロジェクトにのみ適用される"
      },
      {
        "vi": "Là kỹ thuật chuyển toàn bộ đội test sang làm việc ở múi giờ khác (ca đêm)",
        "en": "A technique of moving the entire test team to work in a different time zone (night shift)",
        "ja": "テストチーム全体を別のタイムゾーン（夜間シフト）で働かせる手法"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Shift-left giúp phát hiện lỗi/vấn đề càng sớm càng tốt, giảm chi phí sửa lỗi, phù hợp với sprint ngắn của Agile khi test cần chạy song song với dev.",
      "en": "Shift-left helps catch defects/issues as early as possible, reducing the cost of fixing them, fitting well with Agile's short sprints where testing runs in parallel with development.",
      "ja": "シフトレフトは欠陥・問題をできるだけ早く発見し、修正コストを削減するのに役立ち、開発と並行してテストを行う必要があるアジャイルの短いスプリントに適しています。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một team Scrum thường xử lý regression testing như thế nào khi làm việc theo sprint ngắn?",
      "en": "How does a Scrum team typically handle regression testing when working in short sprints?",
      "ja": "短いスプリントで作業するスクラムチームは通常どのように回帰テストを扱いますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua hoàn toàn regression testing vì không đủ thời gian",
        "en": "Skip regression testing entirely because there isn't enough time",
        "ja": "時間が足りないため回帰テストを完全に省略する"
      },
      {
        "vi": "Tăng cường tự động hoá bộ test hồi quy để chạy thường xuyên trong mỗi sprint, đảm bảo các chức năng cũ không bị ảnh hưởng bởi thay đổi mới",
        "en": "Increase automation of the regression suite to run frequently within each sprint, ensuring existing functionality is not broken by new changes",
        "ja": "回帰テストスイートの自動化を強化し、各スプリント内で頻繁に実行し、新しい変更が既存機能に影響しないことを確認する"
      },
      {
        "vi": "Dồn toàn bộ regression testing vào cuối dự án, thực hiện một lần duy nhất trước khi release chính thức",
        "en": "Defer all regression testing to the end of the project, performed only once before the final release",
        "ja": "すべての回帰テストをプロジェクトの最後にまとめ、正式リリース前に一度だけ実施する"
      },
      {
        "vi": "Yêu cầu Product Owner tự thực hiện regression testing thay cho tester",
        "en": "Require the Product Owner to perform regression testing instead of the tester",
        "ja": "プロダクトオーナーがテスターの代わりに回帰テストを実施するよう要求する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Do sprint ngắn, regression thủ công đầy đủ mỗi lần rất tốn thời gian nên automation là giải pháp then chốt để đảm bảo chất lượng liên tục mà không làm chậm tiến độ.",
      "en": "Because sprints are short, running a full manual regression suite each time is too time-consuming, so automation is key to maintaining continuous quality without slowing the team down.",
      "ja": "スプリントが短いため、毎回手動で完全な回帰テストを実施するのは時間がかかりすぎます。そのため自動化がチームの速度を落とさずに継続的な品質を維持する鍵となります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vấn đề thường gặp khi tester phải kiểm thử \"song song\" với lập trình viên đang phát triển trong cùng một sprint là gì?",
      "en": "What is a common challenge when a tester must test \"in parallel\" with developers still building the feature in the same sprint?",
      "ja": "同じスプリント内で開発者がまだ機能を構築している中、テスターが「並行して」テストしなければならない場合によくある課題は何ですか。"
    },
    "options": [
      {
        "vi": "Không có vấn đề gì vì chức năng luôn hoàn thiện 100% ngay từ đầu sprint",
        "en": "There is no issue since features are always 100% complete from the start of the sprint",
        "ja": "機能はスプリント開始時から常に100%完成しているため問題は起きない"
      },
      {
        "vi": "Tester nên dừng hẳn công việc và đợi đến sprint sau mới bắt đầu test",
        "en": "The tester should stop all work and wait until the next sprint to begin testing",
        "ja": "テスターは作業を完全に止め、次のスプリントまでテストを開始すべきではない"
      },
      {
        "vi": "Story có thể chưa ổn định (thay đổi liên tục), tester dễ gặp tình trạng chờ đợi hoặc phải test lại nhiều lần khi code thay đổi; cần trao đổi chặt chẽ và ưu tiên kiểm thử sớm các phần đã ổn định",
        "en": "The story may be unstable (changing frequently), causing testers to wait or retest repeatedly as code changes; close communication and early testing of stable parts are needed",
        "ja": "ストーリーが不安定（頻繁に変更される）ことがあり、コードが変わるたびにテスターが待たされたり再テストを繰り返したりする。緊密なコミュニケーションと、安定した部分から早期にテストすることが必要"
      },
      {
        "vi": "Vấn đề này chỉ xảy ra ở dự án Waterfall, không xảy ra trong Agile",
        "en": "This issue only occurs in Waterfall projects, never in Agile",
        "ja": "この問題はウォーターフォールプロジェクトでのみ発生し、アジャイルでは発生しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Testing song song với dev đòi hỏi giao tiếp liên tục (ví dụ qua daily standup, pairing) để tester biết phần nào đã sẵn sàng test, tránh lãng phí công sức test trên code chưa ổn định.",
      "en": "Parallel testing requires continuous communication (e.g. via daily standups, pairing) so testers know which parts are ready to test, avoiding wasted effort on unstable code.",
      "ja": "開発と並行してテストするには継続的なコミュニケーション（デイリースタンドアップやペアリングなど）が必要で、テスターがどの部分がテスト可能かを把握し、不安定なコードへの無駄な労力を避けられます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Burndown chart trong sprint có ý nghĩa gì với tester khi theo dõi tiến độ?",
      "en": "What does the sprint burndown chart mean for a tester tracking progress?",
      "ja": "スプリントのバーンダウンチャートは進捗を追うテスターにとってどのような意味を持ちますか。"
    },
    "options": [
      {
        "vi": "Thể hiện số lượng nhân viên nghỉ việc trong công ty",
        "en": "Shows the number of employees who have quit the company",
        "ja": "会社を退職した従業員の数を示す"
      },
      {
        "vi": "Chỉ áp dụng cho dự án không dùng Scrum",
        "en": "Applies only to projects that don't use Scrum",
        "ja": "スクラムを使用しないプロジェクトにのみ適用される"
      },
      {
        "vi": "Là biểu đồ chỉ dùng để tính lương thưởng cuối tháng",
        "en": "A chart used only to calculate monthly salary bonuses",
        "ja": "月末の給与ボーナスを計算するためだけに使われるグラフ"
      },
      {
        "vi": "Thể hiện lượng công việc còn lại (thường theo story point hoặc giờ) so với thời gian còn lại của sprint, giúp tester nhận biết sớm nguy cơ dồn việc kiểm thử vào cuối sprint",
        "en": "Shows remaining work (usually in story points or hours) against the time left in the sprint, helping the tester spot early signs of testing work piling up at the end",
        "ja": "スプリントの残り時間に対する残作業量（通常ストーリーポイントや時間で表示）を示し、テスターがスプリント終盤にテスト作業が集中するリスクを早期に察知するのに役立つ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nếu burndown cho thấy công việc dev hoàn thành trễ, tester có thể chủ động cảnh báo rủi ro 'nước rút' kiểm thử cuối sprint và đề xuất điều chỉnh kịp thời.",
      "en": "If the burndown shows development finishing late, the tester can proactively flag the risk of a testing 'crunch' at the end of the sprint and suggest timely adjustments.",
      "ja": "バーンダウンが開発の遅れを示している場合、テスターはスプリント終盤のテスト「駆け込み」リスクを先んじて警告し、早めの調整を提案できます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Product Backlog và Sprint Backlog khác nhau như thế nào?",
      "en": "How does the Product Backlog differ from the Sprint Backlog?",
      "ja": "プロダクトバックログとスプリントバックログはどう違いますか。"
    },
    "options": [
      {
        "vi": "Product Backlog là danh sách toàn bộ công việc/tính năng của cả sản phẩm do Product Owner quản lý; Sprint Backlog là tập con các item được chọn để thực hiện trong sprint hiện tại",
        "en": "The Product Backlog is the full list of work/features for the whole product, managed by the Product Owner; the Sprint Backlog is a subset of items selected for the current sprint",
        "ja": "プロダクトバックログはプロダクトオーナーが管理する製品全体の作業・機能のリストであり、スプリントバックログは現在のスプリントで実施するために選ばれた項目のサブセットである"
      },
      {
        "vi": "Cả hai đều là danh sách bug do tester tạo ra, không liên quan đến Product Owner",
        "en": "Both are bug lists created by testers, unrelated to the Product Owner",
        "ja": "どちらもテスターが作成するバグリストであり、プロダクトオーナーとは無関係である"
      },
      {
        "vi": "Product Backlog chỉ tồn tại trong 1 sprint, Sprint Backlog tồn tại suốt dự án",
        "en": "The Product Backlog exists for only one sprint, while the Sprint Backlog exists for the whole project",
        "ja": "プロダクトバックログは1スプリントのみ存在し、スプリントバックログはプロジェクト全体にわたって存在する"
      },
      {
        "vi": "Sprint Backlog do khách hàng cuối (end user) trực tiếp chỉnh sửa hàng ngày",
        "en": "The Sprint Backlog is edited directly by end users on a daily basis",
        "ja": "スプリントバックログはエンドユーザーが毎日直接編集する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Product Backlog là bức tranh tổng thể, được sắp xếp ưu tiên liên tục; Sprint Backlog là cam kết cụ thể cho sprint hiện tại, bao gồm cả các task kiểm thử tương ứng.",
      "en": "The Product Backlog is the overall, continuously prioritized picture; the Sprint Backlog is the specific commitment for the current sprint, including corresponding testing tasks.",
      "ja": "プロダクトバックログは継続的に優先順位付けされる全体像であり、スプリントバックログは対応するテストタスクを含む現在のスプリントへの具体的なコミットメントです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong Agile, Scrum Master hỗ trợ tester chủ yếu ở khía cạnh nào?",
      "en": "In Agile, how does the Scrum Master primarily support the tester?",
      "ja": "アジャイルにおいて、スクラムマスターは主にどのような点でテスターを支援しますか。"
    },
    "options": [
      {
        "vi": "Trực tiếp viết test case và thực thi kiểm thử thay tester",
        "en": "Directly writing test cases and executing tests on behalf of the tester",
        "ja": "テスターの代わりに直接テストケースを書きテストを実行する"
      },
      {
        "vi": "Loại bỏ trở ngại (impediment), bảo vệ team khỏi gián đoạn và thúc đẩy quy trình Scrum vận hành trơn tru, giúp tester có môi trường làm việc hiệu quả",
        "en": "Removing impediments, shielding the team from disruption, and facilitating the Scrum process, giving the tester an effective working environment",
        "ja": "障害を取り除き、チームを混乱から守り、スクラムプロセスが円滑に機能するよう促進することで、テスターが効果的に働ける環境を作る"
      },
      {
        "vi": "Quyết định thứ tự ưu tiên của Product Backlog thay cho Product Owner",
        "en": "Deciding the priority order of the Product Backlog instead of the Product Owner",
        "ja": "プロダクトオーナーの代わりにプロダクトバックログの優先順位を決定する"
      },
      {
        "vi": "Phê duyệt ngân sách lương thưởng cho tester",
        "en": "Approving the tester's salary and bonus budget",
        "ja": "テスターの給与・ボーナス予算を承認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scrum Master là người phục vụ (servant leader), không quản lý trực tiếp công việc kỹ thuật của tester mà tập trung gỡ bỏ trở ngại và giữ quy trình lành mạnh.",
      "en": "The Scrum Master is a servant leader who doesn't directly manage the tester's technical work but focuses on removing impediments and keeping the process healthy.",
      "ja": "スクラムマスターはサーバントリーダーであり、テスターの技術的作業を直接管理するのではなく、障害を取り除きプロセスを健全に保つことに集中します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tình huống: gần cuối sprint, một story đã code xong nhưng chưa đạt Definition of Done (còn lỗi nghiêm trọng chưa fix). Team nên xử lý thế nào?",
      "en": "Scenario: near the end of the sprint, a story is coded but does not meet the Definition of Done (a critical bug remains unfixed). What should the team do?",
      "ja": "シナリオ：スプリント終盤、あるストーリーのコーディングは完了したがDefinition of Doneを満たしていない（重大なバグが未修正）。チームはどう対応すべきか。"
    },
    "options": [
      {
        "vi": "Vẫn tính story đó là 'Done' và báo cáo hoàn thành 100% sprint để đạt chỉ tiêu velocity",
        "en": "Still mark the story as 'Done' and report 100% sprint completion to hit the velocity target",
        "ja": "ベロシティ目標を達成するため、そのストーリーを『完了』として100%のスプリント完了を報告する"
      },
      {
        "vi": "Ép tester bỏ qua bug đó vì đã hết thời gian",
        "en": "Force the tester to ignore the bug because time has run out",
        "ja": "時間切れなのでテスターにそのバグを無視させる"
      },
      {
        "vi": "Không tính story là hoàn tất, đưa vào backlog để tiếp tục xử lý ở sprint sau (hoặc theo quyết định của team/PO), giữ đúng nguyên tắc DoD thay vì gian lận số liệu",
        "en": "Do not count the story as complete; carry it back into the backlog to continue in a future sprint (per team/PO decision), honoring the DoD rather than manipulating the numbers",
        "ja": "そのストーリーを完了とみなさず、バックログに戻して以降のスプリントで継続対応する（チーム／POの判断による）。数値を操作せずDoDの原則を守る"
      },
      {
        "vi": "Xoá bug khỏi hệ thống theo dõi để báo cáo trông đẹp hơn",
        "en": "Delete the bug from the tracking system to make the report look better",
        "ja": "報告を見栄え良くするためバグをトラッキングシステムから削除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DoD tồn tại chính là để tránh 'done giả', gian lận số liệu làm mất minh bạch và ảnh hưởng chất lượng thực tế; story chưa đạt phải được xử lý minh bạch, không gian lận.",
      "en": "The DoD exists precisely to prevent false 'done' status; falsifying numbers destroys transparency and harms real quality. An incomplete story must be handled transparently, not faked.",
      "ja": "DoDはまさに偽りの『完了』を防ぐために存在します。数値を偽ると透明性が失われ実際の品質に悪影響を及ぼします。未達成のストーリーは不正なく透明に扱うべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Tình huống: Acceptance Criteria của một story mơ hồ, không nói rõ hệ thống xử lý ra sao khi người dùng nhập dữ liệu trống. Tester nên làm gì trước tiên?",
      "en": "Scenario: the Acceptance Criteria of a story are vague and don't specify how the system should behave when a user submits empty input. What should the tester do first?",
      "ja": "シナリオ：あるストーリーの受け入れ基準が曖昧で、ユーザーが空のデータを入力した場合のシステムの挙動が明記されていない。テスターはまず何をすべきか。"
    },
    "options": [
      {
        "vi": "Tự ý đoán hành vi mong muốn rồi âm thầm viết test case theo suy đoán cá nhân, không hỏi ai",
        "en": "Silently guess the intended behavior and write test cases based on personal assumptions without asking anyone",
        "ja": "誰にも確認せず、個人的な推測に基づいて期待される挙動を勝手に想定しテストケースを書く"
      },
      {
        "vi": "Bỏ qua trường hợp dữ liệu trống, không kiểm thử luôn vì AC không đề cập",
        "en": "Skip the empty-input case entirely and never test it since the AC doesn't mention it",
        "ja": "ACに記載がないため空データのケースは完全にスキップしテストしない"
      },
      {
        "vi": "Yêu cầu hoãn toàn bộ sprint lại vì một chi tiết AC chưa rõ",
        "en": "Demand postponing the entire sprint because of one unclear AC detail",
        "ja": "ACの一つの詳細が不明確という理由でスプリント全体の延期を要求する"
      },
      {
        "vi": "Chủ động trao đổi với Product Owner/team (ví dụ trong buổi refinement hoặc trực tiếp) để làm rõ hành vi mong đợi trước khi thiết kế test case, tránh hiểu sai yêu cầu",
        "en": "Proactively discuss with the Product Owner/team (e.g. in refinement or directly) to clarify the expected behavior before designing test cases, avoiding misinterpretation",
        "ja": "テストケースを設計する前に、期待される挙動を明確にするためプロダクトオーナー／チームと積極的に話し合う（リファインメントの場や直接など）。要件の誤解を避ける"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây chính là giá trị của cộng tác liên tục trong Agile: thay vì tự đoán hoặc bỏ qua, tester nên chủ động làm rõ để đảm bảo test case phản ánh đúng kỳ vọng thực tế, giảm rework.",
      "en": "This is the value of continuous collaboration in Agile: rather than guessing or skipping, the tester should proactively clarify to ensure test cases reflect real expectations and reduce rework.",
      "ja": "これはアジャイルにおける継続的なコラボレーションの価値そのものです。推測したり無視したりするのではなく、テスターは積極的に明確化を図り、テストケースが実際の期待を正しく反映し手戻りを減らすようにすべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao continuous testing (kiểm thử liên tục) và test automation lại đặc biệt quan trọng trong các sprint ngắn của Agile?",
      "en": "Why are continuous testing and test automation especially important in Agile's short sprints?",
      "ja": "アジャイルの短いスプリントにおいて、継続的テストとテスト自動化がとりわけ重要な理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì thời gian mỗi sprint ngắn, cần phản hồi nhanh về chất lượng cho các thay đổi liên tục (CI/CD), giúp phát hiện sớm regression mà không làm chậm tốc độ release",
        "en": "Because sprint durations are short, fast quality feedback is needed for continuous changes (CI/CD), catching regressions early without slowing down release speed",
        "ja": "スプリット期間が短いため、継続的な変更（CI/CD）に対して迅速な品質フィードバックが必要であり、リリース速度を落とさずに回帰を早期発見できるため"
      },
      {
        "vi": "Vì automation giúp thay thế hoàn toàn tư duy kiểm thử của con người, tester không còn cần thiết",
        "en": "Because automation completely replaces human testing judgment, making testers unnecessary",
        "ja": "自動化が人間のテスト判断を完全に代替し、テスターが不要になるため"
      },
      {
        "vi": "Vì automation giúp loại bỏ hoàn toàn nhu cầu viết Acceptance Criteria",
        "en": "Because automation completely eliminates the need to write Acceptance Criteria",
        "ja": "自動化により受け入れ基準を書く必要が完全になくなるため"
      },
      {
        "vi": "Vì chỉ có automation mới được tính vào Definition of Done, kiểm thử thủ công không có giá trị",
        "en": "Because only automation counts toward the Definition of Done; manual testing has no value",
        "ja": "自動化のみがDefinition of Doneに算入され、手動テストには価値がないため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Sprint ngắn và tích hợp liên tục đòi hỏi vòng phản hồi nhanh; automation (đặc biệt là regression) giúp duy trì chất lượng mà không tốn quá nhiều thời gian thủ công lặp lại mỗi sprint.",
      "en": "Short sprints and continuous integration demand fast feedback loops; automation (especially regression) helps maintain quality without excessive repeated manual effort each sprint.",
      "ja": "短いスプリントと継続的インテグレーションは迅速なフィードバックループを必要とします。自動化（特に回帰テスト）は、毎スプリット繰り返される過度な手動作業なしに品質を維持するのに役立ちます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "STLC là gì?",
      "en": "What is STLC?",
      "ja": "STLCとは何ですか？"
    },
    "options": [
      {
        "vi": "SDLC là viết tắt khác của STLC, hai thuật ngữ dùng thay thế cho nhau",
        "en": "SDLC is just another abbreviation for STLC; the two terms are used interchangeably",
        "ja": "SDLCはSTLCの別の略語であり、両者は同じ意味で互換的に使われる"
      },
      {
        "vi": "STLC (Software Testing Life Cycle) là chuỗi các giai đoạn tuần tự mà đội kiểm thử thực hiện để đảm bảo chất lượng phần mềm, bắt đầu từ phân tích yêu cầu đến đóng test",
        "en": "STLC (Software Testing Life Cycle) is a sequence of phases executed by the testing team to ensure software quality, starting from requirement analysis through test closure",
        "ja": "STLC（ソフトウェアテストライフサイクル）は、要件分析からテストクロージャまで、テストチームがソフトウェアの品質を保証するために実施する一連の段階のことである"
      },
      {
        "vi": "STLC chỉ bao gồm giai đoạn thực thi test case, không có các bước khác",
        "en": "STLC only consists of the test case execution phase, with no other steps",
        "ja": "STLCはテストケースの実行フェーズのみで構成され、他の段階は存在しない"
      },
      {
        "vi": "STLC là quy trình quản lý dự án chung, không liên quan riêng đến kiểm thử",
        "en": "STLC is a general project management process, not specifically related to testing",
        "ja": "STLCはテストに特化したものではなく、一般的なプロジェクト管理プロセスである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "STLC là vòng đời con chuyên biệt cho hoạt động kiểm thử, gồm nhiều giai đoạn tuần tự (phân tích yêu cầu, lập kế hoạch, thiết kế test, thiết lập môi trường, thực thi, đóng test), khác với SDLC bao trùm toàn bộ dự án.",
      "en": "STLC is a dedicated sub-lifecycle for testing activities, made up of sequential phases (requirement analysis, planning, test design, environment setup, execution, closure), distinct from SDLC which covers the whole project.",
      "ja": "STLCはテスト活動専用のサブライフサイクルであり、要件分析、計画立案、テスト設計、環境構築、実行、クロージャなど順序立てられた段階から成る。プロジェクト全体を包含するSDLCとは異なる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Giai đoạn nào thường diễn ra ĐẦU TIÊN trong STLC?",
      "en": "Which phase typically comes FIRST in STLC?",
      "ja": "STLCにおいて通常最初に来る段階はどれですか？"
    },
    "options": [
      {
        "vi": "Test Execution",
        "en": "Test Execution",
        "ja": "テスト実行（Test Execution）"
      },
      {
        "vi": "Test Closure",
        "en": "Test Closure",
        "ja": "テストクロージャ（Test Closure）"
      },
      {
        "vi": "Requirement Analysis (Phân tích yêu cầu)",
        "en": "Requirement Analysis",
        "ja": "要件分析（Requirement Analysis）"
      },
      {
        "vi": "Test Environment Setup",
        "en": "Test Environment Setup",
        "ja": "テスト環境構築（Test Environment Setup）"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "STLC bắt đầu bằng việc phân tích tài liệu yêu cầu để xác định phạm vi và khả năng kiểm thử được (testability), làm nền tảng cho các giai đoạn sau như lập kế hoạch và thiết kế test.",
      "en": "STLC starts with analyzing requirement documents to determine test scope and testability, forming the foundation for later phases like planning and test design.",
      "ja": "STLCはまず要件ドキュメントを分析し、テスト範囲やテスト可能性（テスタビリティ）を明確にすることから始まり、その後の計画立案やテスト設計の基盤となる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ai chịu trách nhiệm chính trong giai đoạn Test Planning của STLC, và output chính là gì?",
      "en": "Who is primarily responsible for the Test Planning phase of STLC, and what is its main output?",
      "ja": "STLCのテストプランニング段階の主な責任者は誰で、主な成果物は何ですか？"
    },
    "options": [
      {
        "vi": "BA chịu trách nhiệm, output là tài liệu yêu cầu",
        "en": "The BA is responsible, and the output is the requirement document",
        "ja": "ビジネスアナリストが責任者であり、成果物は要件定義書である"
      },
      {
        "vi": "Lập trình viên chịu trách nhiệm, output là source code",
        "en": "The developer is responsible, and the output is source code",
        "ja": "開発者が責任者であり、成果物はソースコードである"
      },
      {
        "vi": "Khách hàng chịu trách nhiệm, output là hợp đồng",
        "en": "The customer is responsible, and the output is a contract",
        "ja": "顧客が責任者であり、成果物は契約書である"
      },
      {
        "vi": "Test Lead/Test Manager chịu trách nhiệm, output chính là Test Plan/Test Strategy xác định phạm vi, nguồn lực, lịch trình",
        "en": "The Test Lead/Test Manager is responsible, and the main output is the Test Plan/Test Strategy defining scope, resources, and schedule",
        "ja": "テストリーダー/テストマネージャーが責任者であり、主な成果物は範囲・リソース・スケジュールを定めるテスト計画書/テスト戦略である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test Planning là giai đoạn mà Test Lead/Manager xác định chiến lược, phạm vi, ước lượng nguồn lực và lịch trình test, kết quả là tài liệu Test Plan làm kim chỉ nam cho toàn bộ hoạt động kiểm thử.",
      "en": "Test Planning is where the Test Lead/Manager defines the strategy, scope, resource estimation and schedule; the result is the Test Plan document guiding all testing activities.",
      "ja": "テストプランニングは、テストリーダー/マネージャーが戦略・範囲・リソース見積もり・スケジュールを定める段階であり、成果としてテスト活動全体の指針となるテスト計画書が作成される。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong giai đoạn Test Case Development của STLC, hoạt động chính là gì?",
      "en": "In the Test Case Development phase of STLC, what is the main activity?",
      "ja": "STLCのテストケース開発段階における主な活動は何ですか？"
    },
    "options": [
      {
        "vi": "Viết test case, test script, chuẩn bị test data dựa trên yêu cầu và test plan",
        "en": "Writing test cases, test scripts, and preparing test data based on requirements and the test plan",
        "ja": "要件とテスト計画に基づいてテストケース・テストスクリプトを作成し、テストデータを準備すること"
      },
      {
        "vi": "Viết mã nguồn cho tính năng mới",
        "en": "Writing source code for a new feature",
        "ja": "新機能のソースコードを書くこと"
      },
      {
        "vi": "Đào tạo người dùng cuối",
        "en": "Training end users",
        "ja": "エンドユーザーへのトレーニング"
      },
      {
        "vi": "Cài đặt phần mềm lên server production",
        "en": "Deploying the software to the production server",
        "ja": "ソフトウェアを本番サーバーへデプロイすること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Case Development tập trung tạo ra các artefact kiểm thử cụ thể (test case, script, dữ liệu test) để chuẩn bị cho việc thực thi ở giai đoạn sau.",
      "en": "Test Case Development focuses on producing concrete testing artifacts (test cases, scripts, test data) to prepare for later execution.",
      "ja": "テストケース開発は、後の実行フェーズに備えて具体的なテスト成果物（テストケース、スクリプト、テストデータ）を作成することに重点を置く。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Giai đoạn Test Environment Setup trong STLC có đặc điểm gì đáng chú ý?",
      "en": "What notable characteristic does the Test Environment Setup phase in STLC have?",
      "ja": "STLCにおけるテスト環境構築段階の注目すべき特徴は何ですか？"
    },
    "options": [
      {
        "vi": "Luôn phải hoàn thành trước Requirement Analysis",
        "en": "It must always be completed before Requirement Analysis",
        "ja": "常に要件分析より先に完了させなければならない"
      },
      {
        "vi": "Có thể tiến hành song song với giai đoạn Test Case Development để tiết kiệm thời gian",
        "en": "It can be carried out in parallel with the Test Case Development phase to save time",
        "ja": "時間短縮のためテストケース開発段階と並行して行うことができる"
      },
      {
        "vi": "Không cần thiết nếu dự án dùng Agile",
        "en": "It is unnecessary if the project uses Agile",
        "ja": "Agileを採用しているプロジェクトでは不要である"
      },
      {
        "vi": "Chỉ team vận hành (Ops) thực hiện, tester không tham gia",
        "en": "Only the Ops team performs it; testers are not involved",
        "ja": "運用（Ops）チームのみが実施し、テスターは関与しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì không phụ thuộc trực tiếp vào việc viết test case, việc chuẩn bị môi trường test (server, dữ liệu, cấu hình) thường được thực hiện song song để rút ngắn tổng thời gian STLC.",
      "en": "Since it doesn't directly depend on test case writing, environment setup (servers, data, configuration) is often done in parallel to shorten the overall STLC timeline.",
      "ja": "テストケース作成に直接依存しないため、テスト環境（サーバー、データ、設定）の準備は並行して行われることが多く、STLC全体の期間を短縮できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Entry criteria của một giai đoạn trong STLC nghĩa là gì (khác exit criteria tổng thể của dự án)?",
      "en": "What does the entry criteria of a STLC phase mean (as distinct from the project's overall exit criteria)?",
      "ja": "STLCの各段階における「エントリー基準」とは何を意味しますか（プロジェクト全体の終了基準とは異なる）？"
    },
    "options": [
      {
        "vi": "Điều kiện để dừng toàn bộ hoạt động test của dự án",
        "en": "The condition to stop all testing activities of the project",
        "ja": "プロジェクトの全テスト活動を停止する条件"
      },
      {
        "vi": "Danh sách bug cần đóng trước khi release",
        "en": "The list of bugs that must be closed before release",
        "ja": "リリース前にクローズすべきバグの一覧"
      },
      {
        "vi": "Các điều kiện tiên quyết phải thỏa mãn trước khi một giai đoạn cụ thể (ví dụ Test Execution) có thể bắt đầu",
        "en": "The prerequisite conditions that must be satisfied before a specific phase (e.g., Test Execution) can begin",
        "ja": "特定の段階（例：テスト実行）が開始できるようになる前に満たすべき前提条件"
      },
      {
        "vi": "Chỉ số đo lường ROI của hoạt động test",
        "en": "The metric measuring the ROI of testing activities",
        "ja": "テスト活動のROIを測定する指標"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Entry criteria xác định điều kiện đầu vào bắt buộc cho từng giai đoạn STLC, ví dụ Test Execution chỉ bắt đầu khi môi trường test đã sẵn sàng và test case đã được review.",
      "en": "Entry criteria define the mandatory input conditions for each STLC phase; for example, Test Execution only starts once the test environment is ready and test cases have been reviewed.",
      "ja": "エントリー基準は各STLC段階に必要な入力条件を定める。例えば、テスト実行はテスト環境が整い、テストケースがレビュー済みになって初めて開始できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test Closure trong STLC bao gồm hoạt động nào?",
      "en": "What activities does Test Closure in STLC include?",
      "ja": "STLCにおけるテストクロージャにはどのような活動が含まれますか？"
    },
    "options": [
      {
        "vi": "Phân tích yêu cầu ban đầu của khách hàng",
        "en": "Analyzing the customer's initial requirements",
        "ja": "顧客の初期要件を分析すること"
      },
      {
        "vi": "Viết test case mới cho phiên bản tiếp theo",
        "en": "Writing new test cases for the next version",
        "ja": "次バージョン用の新しいテストケースを作成すること"
      },
      {
        "vi": "Thiết lập môi trường test",
        "en": "Setting up the test environment",
        "ja": "テスト環境を構築すること"
      },
      {
        "vi": "Tổng hợp báo cáo test, đánh giá kết quả, lưu trữ tài liệu và rút kinh nghiệm cho dự án sau",
        "en": "Compiling test reports, evaluating results, archiving documentation, and gathering lessons learned for future projects",
        "ja": "テストレポートの作成、結果の評価、ドキュメントのアーカイブ、次のプロジェクトのための教訓のまとめ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test Closure là giai đoạn cuối cùng của STLC, tổng kết toàn bộ chu trình test bằng báo cáo, số liệu, lưu trữ artefact và rút kinh nghiệm (retrospective) để cải thiện cho các dự án sau.",
      "en": "Test Closure is the final STLC phase, wrapping up the whole testing cycle with reports, metrics, archived artifacts, and a retrospective to improve future projects.",
      "ja": "テストクロージャはSTLCの最終段階であり、レポート・指標・成果物のアーカイブ、そして今後のプロジェクト改善のための振り返り（レトロスペクティブ）でテストサイクル全体を締めくくる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "SDLC khác STLC ở điểm căn bản nào?",
      "en": "What is the fundamental difference between SDLC and STLC?",
      "ja": "SDLCとSTLCの根本的な違いは何ですか？"
    },
    "options": [
      {
        "vi": "SDLC bao trùm toàn bộ vòng đời phát triển phần mềm (từ yêu cầu đến bảo trì), còn STLC là vòng đời con tập trung riêng vào hoạt động kiểm thử, thường chạy song song/lồng trong SDLC",
        "en": "SDLC covers the entire software development lifecycle (from requirements to maintenance), while STLC is a sub-lifecycle focused specifically on testing activities, usually running in parallel with or nested inside SDLC",
        "ja": "SDLCは要件定義から保守までソフトウェア開発ライフサイクル全体を包含するのに対し、STLCはテスト活動に特化したサブライフサイクルであり、通常SDLCと並行または内包される形で進行する"
      },
      {
        "vi": "SDLC do QC thực hiện, STLC do QA thực hiện",
        "en": "SDLC is performed by QC, STLC is performed by QA",
        "ja": "SDLCはQCが実施し、STLCはQAが実施する"
      },
      {
        "vi": "SDLC và STLC là một, chỉ khác tên gọi theo công ty",
        "en": "SDLC and STLC are the same thing, just named differently by each company",
        "ja": "SDLCとSTLCは同一のものであり、会社によって呼び方が異なるだけである"
      },
      {
        "vi": "SDLC chỉ áp dụng cho dự án Agile, STLC chỉ áp dụng cho Waterfall",
        "en": "SDLC only applies to Agile projects, STLC only applies to Waterfall",
        "ja": "SDLCはAgileプロジェクトのみに、STLCはWaterfallのみに適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "SDLC là bức tranh tổng thể của toàn dự án phần mềm, còn STLC chỉ tập trung vào phần kiểm thử trong bức tranh đó, được lồng ghép hoặc chạy song song với các giai đoạn của SDLC.",
      "en": "SDLC is the overall picture of the whole software project, while STLC focuses only on the testing portion within that picture, nested or run in parallel with SDLC phases.",
      "ja": "SDLCはソフトウェアプロジェクト全体を俯瞰する枠組みであり、STLCはその中のテスト部分に特化しており、SDLCの各段階と並行または内包される形で進む。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong mô hình Waterfall, kiểm thử thường bắt đầu khi nào?",
      "en": "In the Waterfall model, when does testing typically begin?",
      "ja": "ウォーターフォールモデルにおいて、テストは通常いつ開始されますか？"
    },
    "options": [
      {
        "vi": "Ngay từ khi thu thập yêu cầu, chạy song song toàn bộ dự án",
        "en": "Right from requirement gathering, running in parallel throughout the whole project",
        "ja": "要件収集の段階から、プロジェクト全体を通して並行して行われる"
      },
      {
        "vi": "Sau khi giai đoạn phát triển (coding) hoàn tất, theo trình tự tuần tự các pha",
        "en": "After the development (coding) phase is completed, following the sequential order of phases",
        "ja": "開発（コーディング）段階が完了した後、各フェーズの順序に従って開始される"
      },
      {
        "vi": "Trước khi thiết kế hệ thống",
        "en": "Before system design",
        "ja": "システム設計の前"
      },
      {
        "vi": "Chỉ sau khi sản phẩm đã release cho khách hàng",
        "en": "Only after the product has been released to the customer",
        "ja": "製品が顧客にリリースされた後にのみ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Waterfall là mô hình tuần tự nghiêm ngặt, mỗi pha phải hoàn tất trước khi bắt đầu pha sau, nên kiểm thử chỉ bắt đầu sau khi coding hoàn thành, khiến lỗi thường được phát hiện muộn.",
      "en": "Waterfall is a strictly sequential model where each phase must finish before the next begins, so testing only starts after coding is done, meaning defects are often found late.",
      "ja": "ウォーターフォールは厳格な順序型モデルであり、各フェーズは次のフェーズが始まる前に完了しなければならない。そのためテストはコーディング完了後にしか始まらず、欠陥の発見が遅れがちである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Đặc trưng nổi bật của mô hình V-Model là gì?",
      "en": "What is the standout characteristic of the V-Model?",
      "ja": "Vモデルの際立った特徴は何ですか？"
    },
    "options": [
      {
        "vi": "Không có giai đoạn kiểm thử riêng, lồng test vào code",
        "en": "There is no separate testing phase; testing is embedded within coding",
        "ja": "独立したテスト段階がなく、テストはコーディングに組み込まれている"
      },
      {
        "vi": "Chỉ áp dụng test thăm dò (exploratory), không dùng test case viết trước",
        "en": "It only uses exploratory testing, never pre-written test cases",
        "ja": "探索的テストのみを用い、事前に作成されたテストケースは使わない"
      },
      {
        "vi": "Mỗi giai đoạn phát triển tương ứng với một giai đoạn kiểm thử song song (ví dụ Requirement ↔ Acceptance Test, Design ↔ System Test), nhấn mạnh kiểm thử được lên kế hoạch sớm",
        "en": "Each development phase corresponds to a parallel testing phase (e.g., Requirement ↔ Acceptance Test, Design ↔ System Test), emphasizing that testing is planned early",
        "ja": "各開発段階が対応するテスト段階と並行して存在する（例：要件定義↔受入テスト、設計↔システムテスト）ことで、テストを早期に計画することを重視する"
      },
      {
        "vi": "Chỉ dùng cho dự án phần cứng, không dùng cho phần mềm",
        "en": "It is only used for hardware projects, not software",
        "ja": "ハードウェアプロジェクトにのみ使用され、ソフトウェアには使わない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "V-Model minh họa mối quan hệ song song giữa các giai đoạn phát triển và kiểm thử tương ứng, giúp việc thiết kế test bắt đầu ngay khi có tài liệu yêu cầu/thiết kế thay vì chờ đến cuối.",
      "en": "The V-Model illustrates the parallel relationship between each development phase and its corresponding testing phase, allowing test design to start as soon as requirement/design documents exist, rather than waiting until the end.",
      "ja": "Vモデルは各開発段階と対応するテスト段階の並行関係を示し、要件・設計文書ができた時点でテスト設計を開始できるようにする（最後まで待つ必要がない）。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong mô hình Agile, vai trò của tester thay đổi ra sao so với Waterfall?",
      "en": "How does the tester's role change in Agile compared to Waterfall?",
      "ja": "Agileにおいてテスターの役割はウォーターフォールと比べてどう変わりますか？"
    },
    "options": [
      {
        "vi": "Tester trong Agile chỉ làm test tự động, không bao giờ test thủ công",
        "en": "Testers in Agile only do automated testing, never manual testing",
        "ja": "Agileのテスターは自動テストのみを行い、手動テストは決して行わない"
      },
      {
        "vi": "Tester chỉ xuất hiện ở buổi release cuối cùng của dự án",
        "en": "The tester only shows up at the final release of the project",
        "ja": "テスターはプロジェクトの最終リリース時にのみ登場する"
      },
      {
        "vi": "Agile loại bỏ hoàn toàn vai trò tester, dev tự test 100%",
        "en": "Agile completely eliminates the tester role, with developers doing 100% of testing themselves",
        "ja": "Agileではテスターの役割は完全になくなり、開発者が100%自らテストを行う"
      },
      {
        "vi": "Tester tham gia liên tục ngay từ đầu mỗi sprint, phối hợp chặt với dev, test được thực hiện tăng dần theo từng iteration thay vì dồn vào cuối",
        "en": "The tester is continuously involved from the start of every sprint, working closely with developers, with testing done incrementally each iteration instead of being crammed at the end",
        "ja": "テスターは各スプリントの開始から継続的に関与し、開発者と密接に連携しながら、最後にまとめて行うのではなくイテレーションごとに段階的にテストを行う"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong Agile, tester là thành viên chủ động của nhóm phát triển ngay từ đầu sprint, phối hợp liên tục thay vì chỉ tham gia sau khi code hoàn tất như trong Waterfall.",
      "en": "In Agile, the tester is an active member of the development team from the start of the sprint, collaborating continuously rather than joining only after coding is finished as in Waterfall.",
      "ja": "Agileでは、テスターはスプリント開始時から開発チームの積極的なメンバーであり、ウォーターフォールのようにコーディング完了後にのみ参加するのではなく、継続的に協働する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mô hình Spiral trong SDLC có đặc điểm gì khiến nó phù hợp với dự án rủi ro cao?",
      "en": "What characteristic of the Spiral model makes it suitable for high-risk projects?",
      "ja": "スパイラルモデルがリスクの高いプロジェクトに適している特徴は何ですか？"
    },
    "options": [
      {
        "vi": "Lặp lại nhiều vòng (chu kỳ), mỗi vòng gồm xác định mục tiêu, phân tích rủi ro, phát triển và đánh giá, giúp phát hiện và xử lý rủi ro sớm",
        "en": "It repeats multiple cycles, each including objective setting, risk analysis, development, and evaluation, helping identify and address risks early",
        "ja": "目標設定・リスク分析・開発・評価を含む複数のサイクルを繰り返すことで、リスクを早期に特定し対処できる"
      },
      {
        "vi": "Chỉ có một vòng lặp duy nhất từ đầu đến cuối",
        "en": "It has only a single loop from start to finish",
        "ja": "最初から最後まで単一のループしか持たない"
      },
      {
        "vi": "Không cho phép thay đổi yêu cầu sau khi bắt đầu",
        "en": "It does not allow requirement changes once started",
        "ja": "開始後は要件変更を一切許容しない"
      },
      {
        "vi": "Bỏ qua hoàn toàn bước phân tích rủi ro để tiết kiệm thời gian",
        "en": "It completely skips risk analysis to save time",
        "ja": "時間節約のためリスク分析の工程を完全に省略する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Spiral kết hợp tính lặp của Iterative với bước phân tích rủi ro rõ ràng ở mỗi vòng, thích hợp cho dự án phức tạp, rủi ro cao vì có thể điều chỉnh sớm dựa trên đánh giá rủi ro.",
      "en": "Spiral combines iterative development with an explicit risk analysis step at each loop, making it suitable for complex, high-risk projects since adjustments can be made early based on risk assessment.",
      "ja": "スパイラルモデルは反復開発と各サイクルでの明確なリスク分析を組み合わせており、リスク評価に基づいて早期に調整できるため、複雑でリスクの高いプロジェクトに適している。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "QA (Quality Assurance) được định nghĩa đúng nhất là gì?",
      "en": "What is the best definition of QA (Quality Assurance)?",
      "ja": "QA（品質保証）の最も適切な定義は何ですか？"
    },
    "options": [
      {
        "vi": "Hoạt động chạy test case để tìm lỗi trong sản phẩm cuối",
        "en": "The activity of running test cases to find bugs in the final product",
        "ja": "最終製品のバグを見つけるためにテストケースを実行する活動"
      },
      {
        "vi": "Tập hợp các hoạt động mang tính hệ thống, hướng vào quy trình nhằm ngăn ngừa lỗi xảy ra và đảm bảo quy trình phát triển tuân thủ tiêu chuẩn chất lượng",
        "en": "A set of systematic, process-oriented activities aimed at preventing defects from occurring and ensuring the development process complies with quality standards",
        "ja": "欠陥の発生を未然に防ぎ、開発プロセスが品質基準に準拠していることを保証するための、体系的でプロセス志向の一連の活動"
      },
      {
        "vi": "Chỉ là công việc viết tài liệu, không liên quan đến chất lượng thực tế",
        "en": "Merely documentation work, unrelated to actual quality",
        "ja": "実際の品質とは無関係な、単なる文書作成業務"
      },
      {
        "vi": "Là tên gọi khác của kiểm thử hồi quy (regression testing)",
        "en": "Just another name for regression testing",
        "ja": "リグレッションテストの別名にすぎない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "QA hướng đến việc phòng ngừa lỗi bằng cách chuẩn hóa và cải tiến quy trình phát triển, chứ không phải hoạt động kiểm tra sản phẩm cụ thể như QC.",
      "en": "QA is oriented toward preventing defects by standardizing and improving the development process, unlike QC which inspects the specific product.",
      "ja": "QAは開発プロセスを標準化・改善することで欠陥を未然に防ぐことを目指しており、具体的な製品を検査するQCとは異なる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "QC (Quality Control) tập trung chủ yếu vào điều gì?",
      "en": "What does QC (Quality Control) mainly focus on?",
      "ja": "QC（品質管理）は主に何に焦点を当てていますか？"
    },
    "options": [
      {
        "vi": "Xây dựng quy trình chuẩn cho toàn công ty",
        "en": "Building standardized processes for the entire company",
        "ja": "会社全体の標準プロセスを構築すること"
      },
      {
        "vi": "Đào tạo nhân viên mới về quy định",
        "en": "Training new employees on regulations",
        "ja": "新入社員に規定を教育すること"
      },
      {
        "vi": "Kiểm tra, đánh giá sản phẩm/output cụ thể (qua test execution) để phát hiện lỗi trước khi giao cho khách hàng",
        "en": "Inspecting and evaluating specific products/outputs (via test execution) to detect defects before delivery to the customer",
        "ja": "顧客への納品前に不具合を検出するため、具体的な製品・成果物を（テスト実行を通じて）検査・評価すること"
      },
      {
        "vi": "Lập kế hoạch ngân sách dự án",
        "en": "Planning the project budget",
        "ja": "プロジェクトの予算計画を立てること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "QC là hoạt động mang tính product-oriented, thực hiện qua việc test trực tiếp sản phẩm để tìm và báo cáo lỗi cụ thể trước khi phát hành.",
      "en": "QC is a product-oriented activity, carried out by directly testing the product to find and report specific defects before release.",
      "ja": "QCは製品志向の活動であり、製品を直接テストしてリリース前に具体的な不具合を発見・報告することで実施される。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa QA và QC là gì?",
      "en": "What is the core difference between QA and QC?",
      "ja": "QAとQCの中核的な違いは何ですか？"
    },
    "options": [
      {
        "vi": "QA do khách hàng thực hiện, QC do nội bộ công ty thực hiện",
        "en": "QA is performed by the customer, QC is performed internally by the company",
        "ja": "QAは顧客が実施し、QCは社内で実施される"
      },
      {
        "vi": "QA chỉ làm ở giai đoạn cuối dự án, QC làm từ đầu",
        "en": "QA is only done at the end of the project, while QC is done from the start",
        "ja": "QAはプロジェクトの最終段階のみで行われ、QCは最初から行われる"
      },
      {
        "vi": "QA và QC là hai tên gọi khác nhau của cùng một công việc",
        "en": "QA and QC are just two different names for the same work",
        "ja": "QAとQCは同じ業務の異なる呼び方にすぎない"
      },
      {
        "vi": "QA mang tính phòng ngừa (process-oriented, ngăn lỗi xảy ra), còn QC mang tính phát hiện (product-oriented, tìm lỗi đã tồn tại)",
        "en": "QA is preventive (process-oriented, stops defects from occurring), while QC is detective (product-oriented, finds defects that already exist)",
        "ja": "QAは予防的（プロセス志向で欠陥の発生を防ぐ）であり、QCは発見的（プロダクト志向で既存の欠陥を見つける）である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "QA hướng đến ngăn ngừa lỗi thông qua cải tiến quy trình, còn QC hướng đến việc phát hiện lỗi cụ thể trong sản phẩm đã được tạo ra — đây là phân biệt kinh điển được hỏi phổ biến khi phỏng vấn.",
      "en": "QA aims to prevent defects through process improvement, while QC aims to detect specific defects in the already-built product — this is the classic distinction commonly asked in interviews.",
      "ja": "QAはプロセス改善によって欠陥を予防することを目指し、QCはすでに作られた製品の中の具体的な欠陥を発見することを目指す。これは面接で頻出する古典的な区別である。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong một công ty phần mềm, ví dụ nào sau đây thể hiện đúng hoạt động QA (không phải QC)?",
      "en": "In a software company, which of the following is an example of QA activity (not QC)?",
      "ja": "ソフトウェア企業において、次のうちQA活動（QCではない）の例はどれですか？"
    },
    "options": [
      {
        "vi": "Team thiết lập checklist code review và quy trình chuẩn hóa để giảm thiểu lỗi phát sinh ngay từ khâu phát triển",
        "en": "The team sets up a code review checklist and standardized process to minimize defects arising right from the development stage",
        "ja": "チームがコードレビューのチェックリストと標準化プロセスを整備し、開発段階から不具合の発生を最小化する"
      },
      {
        "vi": "Tester báo cáo bug tìm thấy khi test màn hình thanh toán",
        "en": "A tester reports a bug found while testing the payment screen",
        "ja": "テスターが決済画面のテスト中に見つけたバグを報告する"
      },
      {
        "vi": "Tester thực hiện regression test trước khi release",
        "en": "A tester performs regression testing before release",
        "ja": "テスターがリリース前にリグレッションテストを実施する"
      },
      {
        "vi": "Tester chạy bộ test case để kiểm tra tính năng đăng nhập mới",
        "en": "A tester runs a set of test cases to check a new login feature",
        "ja": "テスターが新しいログイン機能を確認するためテストケース一式を実行する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ba lựa chọn còn lại đều là hoạt động kiểm tra sản phẩm cụ thể (QC); chỉ việc xây dựng và áp dụng quy trình chuẩn hóa nhằm ngăn ngừa lỗi từ gốc mới thuộc bản chất QA.",
      "en": "The other three options are all activities of inspecting a specific product (QC); only building and applying a standardized process to prevent defects at the source is truly QA in nature.",
      "ja": "他の3つの選択肢はすべて具体的な製品を検査する活動（QC）であり、根本から欠陥を防ぐための標準化プロセスの構築・適用のみが本質的にQAである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong tổ chức, ai thường chịu trách nhiệm đảm bảo QA, còn ai thực hiện QC?",
      "en": "In an organization, who is typically responsible for ensuring QA, and who carries out QC?",
      "ja": "組織において、通常誰がQAの責任を担い、誰がQCを実施しますか？"
    },
    "options": [
      {
        "vi": "Cả QA và QC đều chỉ do một mình QA Manager thực hiện",
        "en": "Both QA and QC are performed solely by the QA Manager alone",
        "ja": "QAとQCはいずれもQAマネージャー一人だけが実施する"
      },
      {
        "vi": "QA là trách nhiệm chung của toàn bộ đội dự án (PM, dev, tester) trong việc tuân thủ quy trình, còn QC thường do đội test/QC thực hiện trực tiếp trên sản phẩm",
        "en": "QA is the shared responsibility of the whole project team (PM, dev, tester) in complying with the process, while QC is usually performed directly on the product by the test/QC team",
        "ja": "QAはプロセス遵守に関してプロジェクトチーム全体（PM、開発者、テスター）が共有する責任であり、QCは通常テスト/QCチームが製品に対して直接実施する"
      },
      {
        "vi": "QA do khách hàng đảm nhiệm, QC do nhà cung cấp thứ ba đảm nhiệm",
        "en": "QA is handled by the customer, QC is handled by a third-party vendor",
        "ja": "QAは顧客が担当し、QCはサードパーティベンダーが担当する"
      },
      {
        "vi": "QA chỉ tồn tại ở công ty lớn, công ty nhỏ không cần QA",
        "en": "QA only exists in large companies; small companies don't need QA",
        "ja": "QAは大企業にのみ存在し、小規模企業には不要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "QA là trách nhiệm mang tính tổ chức, liên quan đến mọi thành viên tuân thủ quy trình chất lượng chung; còn QC là hoạt động cụ thể do đội test thực hiện trực tiếp trên sản phẩm.",
      "en": "QA is an organizational responsibility involving all members complying with shared quality processes, while QC is a specific activity carried out directly on the product by the test team.",
      "ja": "QAは組織的な責任であり、全メンバーが共通の品質プロセスを遵守することに関わる。一方QCはテストチームが製品に対して直接実施する具体的な活動である。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Hoạt động review tài liệu yêu cầu, walkthrough thiết kế thuộc nhóm hoạt động nào?",
      "en": "Which category do requirement document reviews and design walkthroughs belong to?",
      "ja": "要件ドキュメントのレビューや設計のウォークスルーはどの活動カテゴリーに属しますか？"
    },
    "options": [
      {
        "vi": "QC vì đây là kiểm tra output cụ thể",
        "en": "QC, because this is inspecting a specific output",
        "ja": "QC。具体的な成果物を検査するものだから"
      },
      {
        "vi": "Không thuộc QA lẫn QC, chỉ là công việc của BA",
        "en": "Neither QA nor QC; it's purely BA's job",
        "ja": "QAでもQCでもなく、単にBAの業務である"
      },
      {
        "vi": "QA (static testing) vì mục đích là phát hiện và ngăn lỗi từ sớm trong quy trình, trước khi có code chạy được",
        "en": "QA (static testing), because the purpose is to detect and prevent defects early in the process, before there is any running code",
        "ja": "QA（静的テスト）。動くコードが存在する前の段階で、プロセス上の欠陥を早期に発見・防止することが目的だから"
      },
      {
        "vi": "Test Execution trong STLC",
        "en": "Test Execution in STLC",
        "ja": "STLCにおけるテスト実行"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Review và walkthrough là kỹ thuật static testing, không cần chạy chương trình, thuộc phạm trù QA vì mục tiêu là ngăn lỗi lan xuống các giai đoạn sau.",
      "en": "Reviews and walkthroughs are static testing techniques that don't require running the program, falling under QA since the goal is to prevent defects from propagating into later stages.",
      "ja": "レビューやウォークスルーはプログラムを実行しない静的テスト技法であり、欠陥が後の段階に波及するのを防ぐことが目的であるためQAの範疇に属する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Việc thực thi test case trên phần mềm đã build (dynamic testing) thuộc phạm trù nào?",
      "en": "Executing test cases on a built piece of software (dynamic testing) falls under which category?",
      "ja": "ビルド済みのソフトウェアに対してテストケースを実行すること（動的テスト）はどのカテゴリーに属しますか？"
    },
    "options": [
      {
        "vi": "SDLC, không liên quan đến STLC",
        "en": "SDLC, unrelated to STLC",
        "ja": "SDLCであり、STLCとは関係ない"
      },
      {
        "vi": "QA, vì liên quan đến quy trình phát triển",
        "en": "QA, because it relates to the development process",
        "ja": "QA。開発プロセスに関わるものだから"
      },
      {
        "vi": "Không thuộc QA lẫn QC, mà là một hoạt động độc lập gọi là Audit",
        "en": "Neither QA nor QC; it is an independent activity called Audit",
        "ja": "QAでもQCでもなく、Auditと呼ばれる独立した活動である"
      },
      {
        "vi": "QC, vì đây là hành động kiểm tra trực tiếp sản phẩm để tìm lỗi cụ thể",
        "en": "QC, because this is directly inspecting the product to find specific defects",
        "ja": "QC。製品を直接検査して具体的な欠陥を見つける行為だから"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dynamic testing (chạy test case trên bản build thật) là hoạt động kiểm tra sản phẩm cụ thể, đúng bản chất của QC.",
      "en": "Dynamic testing (running test cases on an actual build) is an activity of inspecting a specific product, which is the true nature of QC.",
      "ja": "動的テスト（実際のビルドに対してテストケースを実行すること）は具体的な製品を検査する活動であり、QCの本質そのものである。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "\"Shift-left testing\" nghĩa là gì trong ngữ cảnh SDLC/STLC?",
      "en": "What does \"shift-left testing\" mean in the context of SDLC/STLC?",
      "ja": "SDLC/STLCの文脈における「シフトレフトテスト」とは何を意味しますか？"
    },
    "options": [
      {
        "vi": "Dịch chuyển hoạt động kiểm thử sang sớm hơn trong vòng đời phát triển (ngay từ giai đoạn yêu cầu, thiết kế) thay vì để dồn vào cuối, nhằm phát hiện lỗi sớm và giảm chi phí sửa",
        "en": "Moving testing activities earlier in the development lifecycle (right from the requirements/design stage) instead of leaving them for the end, in order to catch defects early and reduce fixing costs",
        "ja": "テストの最後への集中を避け、要件定義や設計段階から開発ライフサイクルの早期にテスト活動を移すことで、欠陥を早期に発見し修正コストを削減すること"
      },
      {
        "vi": "Chỉ áp dụng cho các dự án dùng mô hình Waterfall",
        "en": "It only applies to projects using the Waterfall model",
        "ja": "ウォーターフォールモデルを採用するプロジェクトにのみ適用される"
      },
      {
        "vi": "Là thuật ngữ chỉ việc tester chuyển sang làm developer",
        "en": "A term referring to testers switching to become developers",
        "ja": "テスターが開発者に転向することを指す用語である"
      },
      {
        "vi": "Chuyển toàn bộ hoạt động test sang giai đoạn bảo trì sau khi release",
        "en": "Moving all testing activities to the maintenance phase after release",
        "ja": "すべてのテスト活動をリリース後の保守段階に移すこと"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Shift-left là triết lý đưa kiểm thử lên sớm trong SDLC (review yêu cầu, thiết kế test case sớm...) nhằm giảm chi phí và rủi ro so với việc chỉ test ở cuối dự án.",
      "en": "Shift-left is a philosophy of moving testing earlier in the SDLC (reviewing requirements, designing test cases early, etc.) to reduce cost and risk compared to testing only at the end.",
      "ja": "シフトレフトとは、要件レビューや早期のテストケース設計などを通じてSDLCの早い段階でテストを行う考え方であり、プロジェクト末尾のみでテストするよりコストとリスクを削減できる。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì sao SDLC và STLC nhấn mạnh việc phát hiện lỗi càng sớm càng tốt?",
      "en": "Why do SDLC and STLC emphasize finding defects as early as possible?",
      "ja": "SDLCとSTLCがなぜ欠陥をできるだけ早期に発見することを重視するのですか？"
    },
    "options": [
      {
        "vi": "Vì lỗi phát hiện muộn luôn dễ sửa hơn lỗi phát hiện sớm",
        "en": "Because defects found late are always easier to fix than those found early",
        "ja": "遅く見つかった欠陥の方が早く見つかった欠陥より常に修正しやすいから"
      },
      {
        "vi": "Vì chi phí và công sức để sửa một lỗi tăng lên đáng kể khi nó được phát hiện ở giai đoạn càng muộn của vòng đời phát triển",
        "en": "Because the cost and effort to fix a defect increase significantly the later it is found in the development lifecycle",
        "ja": "開発ライフサイクルの後の段階で発見されるほど、欠陥を修正するコストと労力が大幅に増加するから"
      },
      {
        "vi": "Vì khách hàng chỉ chấp nhận lỗi được phát hiện ở giai đoạn production",
        "en": "Because customers only accept defects found during the production stage",
        "ja": "顧客は本番段階で見つかった欠陥しか受け入れないから"
      },
      {
        "vi": "Vì phát hiện sớm không ảnh hưởng gì đến chi phí dự án",
        "en": "Because early detection has no effect on project cost at all",
        "ja": "早期発見はプロジェクトのコストに何ら影響を与えないから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây là nguyên lý cơ bản của kiểm thử: chi phí sửa lỗi tăng theo cấp số nhân khi lỗi bị phát hiện muộn (ví dụ ở production thay vì ở giai đoạn yêu cầu/thiết kế), do đó cả SDLC và STLC đều khuyến khích phát hiện sớm.",
      "en": "This is a fundamental testing principle: the cost of fixing a defect grows exponentially the later it is found (e.g., in production versus during requirements/design), so both SDLC and STLC encourage early detection.",
      "ja": "これはテストの基本原則であり、欠陥は発見が遅くなるほど（例えば要件定義・設計段階ではなく本番環境で発見された場合）修正コストが指数関数的に増加するため、SDLCもSTLCも早期発見を奨励している。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Hoạt động nào sau đây thuộc về QA ở cấp độ tổ chức (không gắn với một sản phẩm cụ thể)?",
      "en": "Which of the following activities is QA at the organizational level (not tied to a specific product)?",
      "ja": "次のうち、組織レベルのQA活動（特定の製品に紐づかないもの）はどれですか？"
    },
    "options": [
      {
        "vi": "Chạy lại bộ test case cho tính năng giỏ hàng sau khi sửa bug",
        "en": "Re-running the test case set for the shopping cart feature after a bug fix",
        "ja": "バグ修正後にショッピングカート機能のテストケース一式を再実行すること"
      },
      {
        "vi": "Viết báo cáo bug chi tiết kèm bằng chứng cho một lỗi cụ thể",
        "en": "Writing a detailed bug report with evidence for a specific defect",
        "ja": "特定の不具合について証拠付きの詳細なバグレポートを書くこと"
      },
      {
        "vi": "Đánh giá và cải tiến quy trình phát triển phần mềm của công ty (process audit, cải tiến CMMI...) áp dụng cho mọi dự án",
        "en": "Evaluating and improving the company's software development process (process audits, CMMI improvements, etc.) applied to all projects",
        "ja": "すべてのプロジェクトに適用される、会社のソフトウェア開発プロセスの評価・改善（プロセス監査、CMMI改善など）"
      },
      {
        "vi": "Kiểm tra một bản build cụ thể trước khi release cho khách hàng",
        "en": "Checking a specific build before releasing it to the customer",
        "ja": "顧客へのリリース前に特定のビルドを確認すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ba lựa chọn còn lại gắn với một sản phẩm/bản build cụ thể (QC); riêng việc cải tiến quy trình áp dụng chung cho toàn công ty mới đúng bản chất tổ chức, dài hạn của QA.",
      "en": "The other three options are tied to a specific product/build (QC); only improving processes applied company-wide reflects the organizational, long-term nature of QA.",
      "ja": "他の3つの選択肢は特定の製品・ビルドに紐づいている（QC）。全社的に適用されるプロセス改善のみが、QAの組織的・長期的な本質を反映している。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong giai đoạn Requirement Analysis của STLC, tester thường làm gì?",
      "en": "In the Requirement Analysis phase of STLC, what does the tester typically do?",
      "ja": "STLCの要件分析段階において、テスターは通常何を行いますか？"
    },
    "options": [
      {
        "vi": "Thiết lập server production",
        "en": "Setting up the production server",
        "ja": "本番サーバーを構築する"
      },
      {
        "vi": "Viết mã nguồn cho tính năng theo yêu cầu",
        "en": "Writing source code for the feature per the requirements",
        "ja": "要件に従って機能のソースコードを書く"
      },
      {
        "vi": "Ký hợp đồng với khách hàng",
        "en": "Signing the contract with the customer",
        "ja": "顧客との契約を締結する"
      },
      {
        "vi": "Phân tích tài liệu yêu cầu để xác định phạm vi test, đặt câu hỏi làm rõ yêu cầu chưa rõ ràng, xác định testability",
        "en": "Analyzing requirement documents to determine test scope, asking clarifying questions about unclear requirements, and assessing testability",
        "ja": "要件ドキュメントを分析してテスト範囲を定め、不明確な要件について質問して明確化し、テスタビリティを評価する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ở giai đoạn này tester nghiên cứu tài liệu yêu cầu để xác định cái gì cần test được, đưa ra câu hỏi làm rõ với BA/khách hàng, làm cơ sở cho việc lập kế hoạch test sau đó.",
      "en": "At this phase, testers study the requirement documents to determine what is testable, raise clarifying questions with the BA/customer, forming the basis for subsequent test planning.",
      "ja": "この段階でテスターは要件ドキュメントを精査してテスト可能な範囲を明確にし、BAや顧客に確認質問を行い、その後のテスト計画の基礎とする。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Test Design (thiết kế test) trong STLC khác Test Planning ở điểm nào?",
      "en": "How does Test Design in STLC differ from Test Planning?",
      "ja": "STLCにおけるテスト設計はテストプランニングとどう異なりますか？"
    },
    "options": [
      {
        "vi": "Test Planning xác định chiến lược, phạm vi, nguồn lực tổng thể; Test Design tập trung cụ thể vào viết test case, xác định test data và kỹ thuật thiết kế test",
        "en": "Test Planning defines the overall strategy, scope, and resources; Test Design focuses specifically on writing test cases, defining test data, and applying test design techniques",
        "ja": "テストプランニングは全体的な戦略・範囲・リソースを定義し、テスト設計はテストケースの作成、テストデータの決定、テスト設計技法の適用に具体的に焦点を当てる"
      },
      {
        "vi": "Test Design do PM thực hiện, Test Planning do tester thực hiện",
        "en": "Test Design is done by the PM, Test Planning is done by the tester",
        "ja": "テスト設計はPMが行い、テストプランニングはテスターが行う"
      },
      {
        "vi": "Hai giai đoạn này hoàn toàn giống nhau, chỉ khác tên",
        "en": "These two phases are entirely identical, just named differently",
        "ja": "この2つの段階は完全に同一であり、呼び方が違うだけである"
      },
      {
        "vi": "Test Design luôn diễn ra trước Test Planning",
        "en": "Test Design always occurs before Test Planning",
        "ja": "テスト設計は常にテストプランニングより先に行われる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Planning cho bức tranh tổng thể ở tầm chiến lược, trong khi Test Design đi vào chi tiết cụ thể như viết test case, áp dụng kỹ thuật phân vùng/giá trị biên, chuẩn bị test data.",
      "en": "Test Planning provides the strategic big picture, while Test Design gets into specific details such as writing test cases, applying techniques like equivalence partitioning, and preparing test data.",
      "ja": "テストプランニングは戦略的な全体像を示すのに対し、テスト設計はテストケースの作成、同値分割などの技法の適用、テストデータの準備といった具体的な詳細に踏み込む。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một công ty áp dụng mô hình Iterative (lặp) trong SDLC. Đặc điểm nào đúng với hoạt động test trong mô hình này?",
      "en": "A company applies the Iterative model in SDLC. Which characteristic is true of testing activities in this model?",
      "ja": "ある会社がSDLCにイテレーティブ（反復）モデルを採用しています。このモデルにおけるテスト活動の特徴として正しいものはどれですか？"
    },
    "options": [
      {
        "vi": "Chỉ test một lần duy nhất ở cuối dự án, giống Waterfall",
        "en": "Testing is done only once at the end of the project, similar to Waterfall",
        "ja": "ウォーターフォールと同様、プロジェクトの最後に一度だけテストが行われる"
      },
      {
        "vi": "Test được thực hiện lặp lại sau mỗi vòng lặp (iteration) khi có thêm tính năng mới, sản phẩm dần hoàn thiện qua từng vòng",
        "en": "Testing is repeated after each iteration as new features are added, with the product gradually maturing over successive iterations",
        "ja": "新機能が追加されるたびに各イテレーション後にテストが繰り返され、製品は各サイクルを経て徐々に完成度を高めていく"
      },
      {
        "vi": "Không cần viết test case vì mọi thứ đều thay đổi liên tục",
        "en": "There is no need to write test cases since everything changes continuously",
        "ja": "すべてが常に変化するためテストケースを書く必要はない"
      },
      {
        "vi": "Chỉ áp dụng cho dự án không có deadline",
        "en": "It only applies to projects without a deadline",
        "ja": "締め切りのないプロジェクトにのみ適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong mô hình Iterative, sản phẩm được xây dựng dần qua nhiều vòng lặp nhỏ, mỗi vòng bổ sung tính năng và cần test lại để đảm bảo phần mới không phá vỡ phần đã có (kèm regression).",
      "en": "In the Iterative model, the product is built incrementally through multiple small iterations, each adding features that need to be re-tested to ensure new parts don't break existing functionality (including regression).",
      "ja": "イテレーティブモデルでは、製品は複数の小さなイテレーションを通じて段階的に構築され、各イテレーションで機能が追加されるたびに、新しい部分が既存機能を壊していないか再テスト（リグレッションを含む）する必要がある。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi phỏng vấn hỏi \"Bạn hiểu thế nào là mối quan hệ giữa QA và QC trong một dự án phần mềm thực tế\", câu trả lời phù hợp nhất là gì?",
      "en": "When asked in an interview \"How do you understand the relationship between QA and QC in a real software project\", what is the most appropriate answer?",
      "ja": "面接で「実際のソフトウェアプロジェクトにおけるQAとQCの関係をどう理解していますか」と聞かれた場合、最も適切な答えは何ですか？"
    },
    "options": [
      {
        "vi": "QA và QC là hai bộ phận độc lập, không có liên hệ hay phối hợp với nhau",
        "en": "QA and QC are two independent departments with no connection or coordination with each other",
        "ja": "QAとQCは独立した2つの部門であり、互いに関係や連携は一切ない"
      },
      {
        "vi": "QC là cấp trên quản lý QA",
        "en": "QC is a higher authority that manages QA",
        "ja": "QCはQAを管理する上位の存在である"
      },
      {
        "vi": "QA thiết lập và giám sát quy trình chất lượng chung cho dự án nhằm phòng ngừa lỗi, còn QC (thường do đội test đảm nhiệm) áp dụng các hoạt động kiểm thử cụ thể để phát hiện lỗi trên sản phẩm - hai hoạt động bổ trợ lẫn nhau để đảm bảo chất lượng tổng thể",
        "en": "QA establishes and oversees the overall quality process for the project to prevent defects, while QC (usually handled by the test team) applies specific testing activities to detect defects in the product - the two complement each other to ensure overall quality",
        "ja": "QAは欠陥を未然に防ぐためプロジェクト全体の品質プロセスを確立・監督し、QC（通常テストチームが担当）は製品の欠陥を検出するための具体的なテスト活動を実施する。両者は互いに補完し合い、全体的な品質を確保する"
      },
      {
        "vi": "Trong dự án Agile không cần phân biệt QA và QC vì cả hai đều biến mất",
        "en": "In Agile projects there's no need to distinguish QA and QC because both disappear",
        "ja": "AgileプロジェクトではQAとQCの区別は不要であり、両方とも消滅する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Câu trả lời tốt nhất khi phỏng vấn thể hiện được QA và QC không đối lập mà bổ trợ nhau: QA phòng ngừa ở tầm quy trình, QC phát hiện ở tầm sản phẩm, cùng hướng tới mục tiêu chất lượng chung.",
      "en": "The best interview answer shows that QA and QC are not opposing but complementary: QA prevents at the process level, QC detects at the product level, both working toward the shared quality goal.",
      "ja": "面接での最良の回答は、QAとQCが対立するものではなく互いに補完し合うことを示すものである。QAはプロセスレベルで予防し、QCは製品レベルで発見を行い、両者は共通の品質目標に向かって協働する。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev từ chối bug với lý do \"not a bug, đây là hành vi đúng\" nhưng bạn tin chắc kết quả sai theo yêu cầu. Bước đầu tiên nên làm là gì?",
      "en": "A dev rejects your bug saying \"not a bug, this is expected behavior\" but you are confident the result violates the requirement. What should you do first?",
      "ja": "開発者が「バグではない、これは仕様通りの挙動だ」としてバグを却下しましたが、あなたは結果が要件に反していると確信しています。まず何をすべきですか。"
    },
    "options": [
      {
        "vi": "Đóng bug và không theo dõi nữa để tránh mâu thuẫn",
        "en": "Close the bug and stop tracking it to avoid conflict",
        "ja": "対立を避けるためバグをクローズしてもう追跡しない"
      },
      {
        "vi": "Im lặng chấp nhận vì dev là người hiểu code nhất",
        "en": "Silently accept it because the dev understands the code best",
        "ja": "開発者が最もコードを理解しているので黙って受け入れる"
      },
      {
        "vi": "Ngay lập tức báo cáo lên quản lý cấp cao mà không trao đổi trực tiếp với dev",
        "en": "Immediately escalate to senior management without discussing directly with the dev",
        "ja": "開発者と直接話し合わずに、すぐ上級管理者にエスカレーションする"
      },
      {
        "vi": "Tìm lại tài liệu đặc tả hoặc bằng chứng cụ thể (spec, ticket cũ, thiết kế) để đối chiếu và trình bày lại với dev",
        "en": "Look for the specification or concrete evidence (spec, old ticket, design) to cross-check and re-present it to the dev",
        "ja": "仕様書や具体的な根拠(仕様書、過去のチケット、設計書)を探して照合し、開発者に改めて提示する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tranh luận cần dựa trên bằng chứng khách quan như đặc tả, thiết kế hoặc yêu cầu đã thống nhất, thay vì cảm tính, giúp cuộc trao đổi với dev có cơ sở và chuyên nghiệp.",
      "en": "Disagreements should be grounded in objective evidence such as specs, design docs, or agreed requirements rather than opinion, making the discussion with the dev professional and fact-based.",
      "ja": "意見の相違は感情論ではなく、仕様書や設計書、合意済みの要件といった客観的根拠に基づくべきで、それにより開発者との議論が専門的かつ根拠のあるものになります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi viết bug report để giảm khả năng bị dev từ chối vì \"không đủ thông tin\", điều quan trọng nhất cần có là gì?",
      "en": "When writing a bug report to reduce the chance a dev rejects it for \"insufficient information\", what is the most important thing to include?",
      "ja": "開発者に「情報不足」として却下されないようバグレポートを書く際、最も重要な要素は何ですか。"
    },
    "options": [
      {
        "vi": "Các bước tái hiện rõ ràng, môi trường test, kết quả thực tế và kết quả mong đợi kèm bằng chứng (ảnh/log/video)",
        "en": "Clear reproduction steps, test environment, actual vs expected results, with supporting evidence (screenshots/logs/video)",
        "ja": "明確な再現手順、テスト環境、実際の結果と期待結果、そして証拠(スクリーンショット・ログ・動画)を添付すること"
      },
      {
        "vi": "Viết thật ngắn gọn, chỉ một câu mô tả chung chung",
        "en": "Write it as short as possible, just one generic sentence",
        "ja": "できるだけ短く、一般的な一文だけで書く"
      },
      {
        "vi": "Chỉ cần ghi tên tester và ngày phát hiện",
        "en": "Only the tester's name and the date found",
        "ja": "テスターの名前と発見日だけを記載する"
      },
      {
        "vi": "Chỉ cần chụp ảnh màn hình lỗi mà không cần mô tả gì thêm",
        "en": "Just a screenshot of the error with no further description",
        "ja": "エラーのスクリーンショットだけで、それ以上の説明は不要"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Bug report đầy đủ bước tái hiện, môi trường, kết quả thực tế/mong đợi và bằng chứng giúp dev tái hiện nhanh và khó bác bỏ hơn.",
      "en": "A report with full reproduction steps, environment, actual/expected results and evidence lets the dev reproduce quickly and makes rejection harder to justify.",
      "ja": "再現手順、環境、実際/期待結果、証拠が揃ったレポートは開発者が素早く再現でき、却下しにくくなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dự án thiếu tài liệu đặc tả (SRS) rõ ràng. Khi cần xác định đâu là kết quả đúng cho một chức năng, tester nên ưu tiên tham khảo nguồn nào?",
      "en": "The project lacks a clear SRS. When you need to determine the correct expected result for a feature, what source should you prioritize?",
      "ja": "プロジェクトに明確なSRS(仕様書)がありません。ある機能の正しい期待結果を判断する必要がある場合、どの情報源を優先すべきですか。"
    },
    "options": [
      {
        "vi": "Đoán theo cảm tính cá nhân của tester",
        "en": "Guess based on the tester's personal intuition",
        "ja": "テスター個人の感覚で推測する"
      },
      {
        "vi": "Trao đổi trực tiếp với BA/PO, xem thiết kế UI/UX, ticket liên quan hoặc mockup để làm rõ và ghi lại bằng văn bản",
        "en": "Confirm directly with the BA/PO, check UI/UX designs, related tickets or mockups, and document the clarification in writing",
        "ja": "BAやPOと直接確認し、UI/UXデザイン、関連チケットやモックアップを参照した上で、確認内容を文書化する"
      },
      {
        "vi": "Sao chép hành vi của ứng dụng đối thủ mà không kiểm chứng",
        "en": "Copy a competitor app's behavior without verifying it",
        "ja": "検証せずに競合アプリの挙動をそのままコピーする"
      },
      {
        "vi": "Không test chức năng đó cho tới khi có tài liệu đầy đủ",
        "en": "Skip testing that feature entirely until full documentation exists",
        "ja": "完全な文書ができるまでその機能のテストを一切行わない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi thiếu tài liệu, tester cần chủ động làm rõ với người có thẩm quyền (BA/PO) và ghi lại kết quả thống nhất để có căn cứ test và tránh tranh cãi sau này.",
      "en": "When documentation is missing, testers should proactively clarify with authoritative stakeholders (BA/PO) and record the agreement as a basis for testing and to avoid future disputes.",
      "ja": "文書が不足している場合、テスターは権限を持つ関係者(BAやPO)に積極的に確認し、その合意内容を記録してテストの根拠とし、後の論争を避けるべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Gần sát deadline release, bạn phát hiện một bug nghiêm trọng ảnh hưởng luồng thanh toán. Bạn nên hành động thế nào?",
      "en": "Right before the release deadline, you discover a critical bug affecting the payment flow. What should you do?",
      "ja": "リリース期限直前に、決済フローに影響する重大なバグを発見しました。どう行動すべきですか。"
    },
    "options": [
      {
        "vi": "Giấu bug đi vì sợ trễ deadline",
        "en": "Hide the bug because you're afraid of delaying the deadline",
        "ja": "期限遅延を恐れてバグを隠す"
      },
      {
        "vi": "Tự ý sửa code thay cho dev để kịp thời gian",
        "en": "Fix the code yourself instead of the dev to save time",
        "ja": "時間を節約するため自分でコードを修正する"
      },
      {
        "vi": "Báo cáo ngay lập tức cho team lead/PM kèm mức độ ảnh hưởng để cùng quyết định có trì hoãn release hay không",
        "en": "Immediately report it to the team lead/PM with the impact assessment so a decision on delaying release can be made together",
        "ja": "影響度とともに直ちにチームリーダーやPMに報告し、リリース延期の是非を共に判断する"
      },
      {
        "vi": "Chờ đến sau khi release rồi mới báo cáo",
        "en": "Wait until after release to report it",
        "ja": "リリース後に報告する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bug nghiêm trọng ảnh hưởng nghiệp vụ quan trọng như thanh toán cần được báo cáo ngay để các bên liên quan cùng cân nhắc rủi ro và quyết định, tránh tự ý xử lý.",
      "en": "A critical bug affecting core business flows like payment must be escalated immediately so stakeholders can jointly weigh the risk and decide, rather than being handled unilaterally.",
      "ja": "決済のような重要業務に影響する重大バグは、関係者がリスクを検討して判断できるよう直ちに報告すべきで、独断で処理してはいけません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev nói \"works on my machine\" khi bạn báo lỗi. Cách xử lý chuyên nghiệp nhất là gì?",
      "en": "The dev says \"it works on my machine\" when you report a bug. What is the most professional way to handle this?",
      "ja": "バグを報告した際、開発者が「自分の環境では動く」と言いました。最もプロフェッショナルな対応は何ですか。"
    },
    "options": [
      {
        "vi": "Tranh cãi gay gắt để chứng minh mình đúng",
        "en": "Argue heatedly to prove you are right",
        "ja": "自分が正しいと証明するために激しく議論する"
      },
      {
        "vi": "Yêu cầu dev tự tìm hiểu mà không hỗ trợ thêm",
        "en": "Ask the dev to investigate on their own without further support",
        "ja": "それ以上サポートせず、開発者に自分で調査するよう求める"
      },
      {
        "vi": "Bỏ qua bug vì dev không tái hiện được",
        "en": "Drop the bug because the dev couldn't reproduce it",
        "ja": "開発者が再現できないのでバグを取り下げる"
      },
      {
        "vi": "Cung cấp thông tin môi trường test cụ thể (OS, browser, version, dữ liệu) và đề nghị cùng kiểm tra trực tiếp hoặc qua remote để xác định khác biệt môi trường",
        "en": "Provide specific test environment details (OS, browser, version, data) and offer to check together directly or remotely to identify the environment difference",
        "ja": "具体的なテスト環境情報(OS、ブラウザ、バージョン、データ)を提供し、直接またはリモートで一緒に確認して環境の違いを特定することを提案する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sự khác biệt môi trường (OS, phiên bản, dữ liệu, cấu hình) là nguyên nhân phổ biến khiến lỗi không tái hiện được; cung cấp chi tiết và phối hợp kiểm tra giúp tìm ra gốc rễ nhanh hơn.",
      "en": "Environment differences (OS, version, data, config) are a common cause of non-reproducible bugs; sharing details and investigating together speeds up root-cause discovery.",
      "ja": "環境の違い(OS、バージョン、データ、設定)はバグが再現しない一般的な原因であり、詳細を共有して一緒に調査することで根本原因の特定が早まります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev đóng bug với lý do \"cannot reproduce\" nhưng bạn vẫn tái hiện được lỗi. Bạn nên làm gì tiếp theo?",
      "en": "A dev closes your bug as \"cannot reproduce\" but you can still reproduce it. What should you do next?",
      "ja": "開発者が「再現できない」としてバグをクローズしましたが、あなたは依然として再現できます。次に何をすべきですか。"
    },
    "options": [
      {
        "vi": "Ghi lại video/log chi tiết kèm bước tái hiện chính xác, mở lại bug và trao đổi trực tiếp hoặc ngồi cùng dev để tái hiện trực tiếp",
        "en": "Record a detailed video/log with exact reproduction steps, reopen the bug, and discuss directly or pair with the dev to reproduce it live",
        "ja": "正確な再現手順とともに詳細な動画やログを記録し、バグを再オープンして開発者と直接話し合うか、一緒に再現作業を行う"
      },
      {
        "vi": "Chấp nhận đóng bug ngay vì dev đã kiểm tra",
        "en": "Accept the closure immediately since the dev already checked",
        "ja": "開発者が確認済みなので、すぐにクローズを受け入れる"
      },
      {
        "vi": "Tạo một bug report mới hoàn toàn khác để đánh lạc hướng",
        "en": "Create a completely different new bug report to obscure the issue",
        "ja": "問題をごまかすために全く別の新しいバグレポートを作成する"
      },
      {
        "vi": "Phàn nàn với đồng nghiệp khác thay vì làm việc trực tiếp với dev",
        "en": "Complain to other colleagues instead of working directly with the dev",
        "ja": "開発者と直接話す代わりに他の同僚に不満を言う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Bằng chứng cụ thể (video, log, bước tái hiện chính xác) và làm việc trực tiếp với dev là cách hiệu quả nhất để chứng minh bug thực sự tồn tại.",
      "en": "Concrete evidence (video, logs, exact steps) plus direct collaboration with the dev is the most effective way to prove the bug genuinely exists.",
      "ja": "具体的な証拠(動画、ログ、正確な手順)と開発者との直接協力が、バグが実際に存在することを証明する最も効果的な方法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev đang bận với nhiều task, chưa ưu tiên fix bug bạn báo cáo. Cách thuyết phục hiệu quả nhất là gì?",
      "en": "The dev is busy with many tasks and hasn't prioritized your reported bug. What is the most effective way to persuade them?",
      "ja": "開発者は多くのタスクで忙しく、あなたが報告したバグの優先度を上げていません。最も効果的な説得方法は何ですか。"
    },
    "options": [
      {
        "vi": "Nhắn tin nhắc liên tục nhiều lần trong ngày gây áp lực",
        "en": "Send repeated reminder messages throughout the day to pressure them",
        "ja": "一日中何度もリマインドメッセージを送ってプレッシャーをかける"
      },
      {
        "vi": "Trình bày rõ mức độ ảnh hưởng (severity/priority) và tác động thực tế đến người dùng hoặc release, để cùng team thống nhất thứ tự ưu tiên",
        "en": "Clearly present the severity/priority and real impact on users or the release, so the team can align on prioritization together",
        "ja": "重大度・優先度と、ユーザーやリリースへの実際の影響を明確に示し、チームで優先順位を合意する"
      },
      {
        "vi": "Báo cáo vượt cấp ngay lập tức mà không trao đổi trước",
        "en": "Escalate above the dev's head immediately without prior discussion",
        "ja": "事前の話し合いなしにすぐ上位者へエスカレーションする"
      },
      {
        "vi": "Tự đánh giá bug là không quan trọng để tránh làm phiền dev",
        "en": "Decide yourself the bug isn't important to avoid bothering the dev",
        "ja": "開発者を煩わせないよう自分でバグを重要でないと判断する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Việc thuyết phục dựa trên dữ liệu về mức độ ảnh hưởng thực tế và thảo luận cùng team để thống nhất ưu tiên hiệu quả và chuyên nghiệp hơn là gây áp lực cá nhân.",
      "en": "Persuasion grounded in actual impact data, followed by team discussion to align priorities, is more effective and professional than applying personal pressure.",
      "ja": "実際の影響データに基づき説得し、チームで優先順位を合意することは、個人的な圧力をかけるより効果的でプロフェッショナルです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong lúc test, tài liệu API bị thiếu hoặc lỗi thời. Nguồn tham khảo đáng tin cậy nhất để xác định hành vi đúng của API là gì?",
      "en": "During testing, the API documentation is missing or outdated. What is the most reliable source to determine the correct API behavior?",
      "ja": "テスト中にAPI仕様書が存在しないか古くなっています。APIの正しい挙動を判断する最も信頼できる情報源は何ですか。"
    },
    "options": [
      {
        "vi": "Đoán dựa trên tên endpoint",
        "en": "Guess based on the endpoint name",
        "ja": "エンドポイント名から推測する"
      },
      {
        "vi": "Chỉ tin vào comment cũ trong code mà không xác minh lại",
        "en": "Trust only old code comments without re-verifying",
        "ja": "古いコードコメントだけを信頼し再確認しない"
      },
      {
        "vi": "Trao đổi trực tiếp với dev backend hoặc dùng công cụ như Postman/Swagger thực tế kèm xác nhận lại với BA về nghiệp vụ mong muốn",
        "en": "Confirm directly with the backend dev or use actual tools like Postman/Swagger, and re-verify with the BA regarding the intended business logic",
        "ja": "バックエンド開発者と直接確認するか、実際のPostman/Swaggerなどのツールを使い、BAと業務の意図を再確認する"
      },
      {
        "vi": "Bỏ qua việc test API cho đến khi có tài liệu mới",
        "en": "Skip testing the API until new documentation exists",
        "ja": "新しい文書ができるまでAPIのテストをスキップする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi tài liệu không đáng tin cậy, xác minh trực tiếp với người phát triển và công cụ thực tế, kết hợp xác nhận nghiệp vụ với BA, là cách đáng tin cậy nhất.",
      "en": "When documentation is unreliable, direct verification with the developer and real tools, combined with business confirmation from the BA, is the most trustworthy approach.",
      "ja": "文書が信頼できない場合、開発者や実際のツールでの直接検証とBAによる業務確認を組み合わせるのが最も信頼できる方法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một bug bị dev từ chối vì cho rằng đó là \"by design\" nhưng bạn nghĩ hành vi đó gây trải nghiệm người dùng kém. Bạn nên làm gì?",
      "en": "A bug is rejected by the dev as \"by design\" but you believe the behavior creates a poor user experience. What should you do?",
      "ja": "あるバグが開発者に「仕様通り」として却下されましたが、あなたはその挙動がユーザー体験を損なうと考えています。どうすべきですか。"
    },
    "options": [
      {
        "vi": "Chấp nhận ngay vì dev nói đó là thiết kế có chủ đích",
        "en": "Accept immediately since the dev says it is intentional design",
        "ja": "開発者が意図的な設計だと言ったので直ちに受け入れる"
      },
      {
        "vi": "Không ghi nhận gì và quên vấn đề đó đi",
        "en": "Don't record anything and forget the issue",
        "ja": "何も記録せずその問題を忘れる"
      },
      {
        "vi": "Vẫn giữ nguyên trạng thái Open để ép dev fix bằng mọi giá",
        "en": "Keep it forcibly in Open status to make the dev fix it at all costs",
        "ja": "何としても開発者に修正させるためOpen状態のまま強制的に維持する"
      },
      {
        "vi": "Ghi nhận lại thành đề xuất cải tiến UX (không phải bug lỗi chức năng), trình bày với PO/UX để họ cân nhắc đưa vào backlog",
        "en": "Log it as a UX improvement suggestion (not a functional bug) and present it to the PO/UX for consideration in the backlog",
        "ja": "機能バグではなくUX改善提案として記録し、PO/UX担当者に提示してバックログへの追加を検討してもらう"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nếu hành vi đúng theo thiết kế nhưng ảnh hưởng trải nghiệm, nên chuyển thành đề xuất cải tiến gửi đúng người có thẩm quyền quyết định (PO/UX) thay vì tranh cãi là bug.",
      "en": "If the behavior is correct by design but harms UX, it should be reframed as an improvement suggestion sent to the right decision-maker (PO/UX) rather than disputed as a bug.",
      "ja": "挙動が設計通りでもUXに悪影響がある場合、バグとして争うのではなく、適切な意思決定者(PO/UX)への改善提案として扱うべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi có tranh cãi giữa bạn và dev về mức độ severity của một bug, cách xử lý phù hợp nhất trong quy trình làm việc nhóm là gì?",
      "en": "When you and the dev disagree about a bug's severity, what is the most appropriate way to handle it within the team workflow?",
      "ja": "バグの重大度について開発者と意見が対立した場合、チームのワークフローの中で最も適切な対処法は何ですか。"
    },
    "options": [
      {
        "vi": "Đưa vấn đề ra buổi triage/daily để team lead hoặc PM cùng đánh giá dựa trên tiêu chí severity đã thống nhất",
        "en": "Bring it up in a triage/daily meeting for the team lead or PM to jointly assess based on agreed severity criteria",
        "ja": "合意済みの重大度基準に基づき、トリアージやデイリーミーティングでチームリーダーやPMが共同で評価する"
      },
      {
        "vi": "Tester tự động hạ severity xuống thấp nhất để tránh xung đột",
        "en": "The tester automatically lowers the severity to the lowest level to avoid conflict",
        "ja": "対立を避けるためテスターが自動的に重大度を最低に下げる"
      },
      {
        "vi": "Dev luôn có quyền quyết định cuối cùng vì họ hiểu code",
        "en": "The dev always has final say because they understand the code",
        "ja": "コードを理解しているという理由で常に開発者が最終決定権を持つ"
      },
      {
        "vi": "Không cần quy trình gì, ai nói to hơn thì thắng",
        "en": "No process is needed; whoever argues louder wins",
        "ja": "プロセスは不要で、より強く主張した方が勝つ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tranh cãi về severity nên được đưa ra cuộc họp triage với tiêu chí đã thống nhất để có bên trung lập (lead/PM) quyết định, tránh xung đột cá nhân giữa tester và dev.",
      "en": "Severity disputes should go to a triage meeting with agreed criteria so a neutral party (lead/PM) decides, avoiding personal conflict between tester and dev.",
      "ja": "重大度の意見対立は、合意済みの基準を用いたトリアージミーティングに持ち込み、中立な立場(リーダーやPM)が判断すべきで、テスターと開発者間の個人的対立を避けます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Deadline gấp, không đủ thời gian viết bug report đầy đủ chi tiết. Thông tin tối thiểu nào KHÔNG thể thiếu để dev vẫn xử lý được?",
      "en": "With a tight deadline, you don't have time to write a fully detailed bug report. What minimum information cannot be omitted for the dev to still act on it?",
      "ja": "締め切りが厳しく詳細なバグレポートを書く時間がありません。開発者が対応できるために省略できない最低限の情報は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần tiêu đề bug, không cần gì khác",
        "en": "Just the bug title, nothing else",
        "ja": "バグのタイトルだけで十分"
      },
      {
        "vi": "Bước tái hiện cơ bản, kết quả thực tế/mong đợi và mức độ nghiêm trọng, kèm ghi chú sẽ bổ sung chi tiết sau",
        "en": "Basic reproduction steps, actual/expected result, and severity, with a note that details will be added later",
        "ja": "基本的な再現手順、実際/期待結果、重大度を記載し、詳細は後で追記する旨を明記する"
      },
      {
        "vi": "Chỉ cần gửi screenshot qua chat mà không tạo ticket",
        "en": "Just send a screenshot via chat without creating a ticket",
        "ja": "チケットを作らずチャットでスクリーンショットを送るだけ"
      },
      {
        "vi": "Không cần report gì, chỉ nói miệng với dev",
        "en": "No report needed, just tell the dev verbally",
        "ja": "レポートは不要で、開発者に口頭で伝えるだけ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ngay cả khi gấp, bug report vẫn cần tối thiểu bước tái hiện, kết quả thực tế/mong đợi và severity để dev có thể ưu tiên và xử lý mà không mất thời gian hỏi lại.",
      "en": "Even under time pressure, a bug report needs at minimum reproduction steps, actual/expected result, and severity so the dev can prioritize and act without wasting time asking for clarification.",
      "ja": "時間がなくても、開発者が確認のやり取りに時間を取られず優先度を判断して対応できるよう、最低限の再現手順・実際/期待結果・重大度は必要です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Bạn và dev bất đồng gay gắt về việc một hành vi có phải là bug hay không, không thể tự thống nhất. Bạn nên escalate cho ai là hợp lý nhất?",
      "en": "You and the dev have a strong disagreement about whether a behavior is a bug, and cannot resolve it yourselves. Who is the most appropriate person to escalate to?",
      "ja": "ある挙動がバグかどうかで開発者と激しく意見が対立し、自分たちだけでは解決できません。誰にエスカレーションするのが最も適切ですか。"
    },
    "options": [
      {
        "vi": "Khách hàng cuối trực tiếp mà không qua quy trình nội bộ",
        "en": "The end customer directly, bypassing internal process",
        "ja": "社内プロセスを経ずに直接エンドユーザーに"
      },
      {
        "vi": "Đồng nghiệp không liên quan đến dự án",
        "en": "A colleague unrelated to the project",
        "ja": "プロジェクトに無関係な同僚"
      },
      {
        "vi": "Người có thẩm quyền nghiệp vụ hoặc quản lý dự án như PO/PM/Team Lead",
        "en": "The person with business authority or project management authority, such as PO/PM/Team Lead",
        "ja": "POやPM、チームリーダーなど業務・プロジェクトの権限を持つ人"
      },
      {
        "vi": "Không escalate, để bug tồn đọng vô thời hạn",
        "en": "Don't escalate; let the bug remain unresolved indefinitely",
        "ja": "エスカレーションせず、バグを無期限に放置する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi hai bên không thống nhất được, người có thẩm quyền quyết định nghiệp vụ (PO/PM/Team Lead) là điểm escalate đúng quy trình để đưa ra quyết định cuối cùng.",
      "en": "When the two sides can't agree, the person with business decision authority (PO/PM/Team Lead) is the correct escalation point to make the final call.",
      "ja": "両者が合意できない場合、業務上の決定権を持つ人物(PO、PM、チームリーダー)が正しいエスカレーション先であり、最終判断を下します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một bug đã bị dev từ chối nhiều lần rồi mở lại (reopen), gây căng thẳng trong giao tiếp. Kỹ năng nào quan trọng nhất giúp tester xử lý tình huống này hiệu quả?",
      "en": "A bug has been repeatedly rejected and reopened, causing communication tension. What skill is most important for a tester to handle this effectively?",
      "ja": "あるバグが何度も却下と再オープンを繰り返し、コミュニケーションに緊張が生じています。テスターがこれを効果的に処理するために最も重要なスキルは何ですか。"
    },
    "options": [
      {
        "vi": "Kỹ năng lập trình nâng cao để tự sửa bug",
        "en": "Advanced programming skills to fix the bug themselves",
        "ja": "自分でバグを修正できる高度なプログラミングスキル"
      },
      {
        "vi": "Luôn khẳng định tester luôn đúng trong mọi trường hợp",
        "en": "Always insist the tester is right in every case",
        "ja": "あらゆる場合にテスターが常に正しいと主張し続ける"
      },
      {
        "vi": "Im lặng và tránh mọi trao đổi với dev đó",
        "en": "Stay silent and avoid all communication with that dev",
        "ja": "沈黙してその開発者とのやり取りを一切避ける"
      },
      {
        "vi": "Giao tiếp khách quan, dựa trên dữ liệu/bằng chứng và giữ thái độ hợp tác thay vì đối đầu cá nhân",
        "en": "Objective, evidence-based communication and maintaining a collaborative attitude instead of personal confrontation",
        "ja": "客観的でデータや証拠に基づいたコミュニケーションを行い、個人的対立ではなく協力的な姿勢を保つこと"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong tình huống căng thẳng lặp lại, kỹ năng giao tiếp dựa trên dữ liệu khách quan và thái độ hợp tác giúp giải quyết vấn đề chuyên môn thay vì leo thang mâu thuẫn cá nhân.",
      "en": "In recurring tense situations, evidence-based communication and a collaborative attitude help resolve the technical issue rather than escalating personal conflict.",
      "ja": "緊張が繰り返される状況では、データに基づくコミュニケーションと協力的な姿勢が、個人的対立を悪化させることなく技術的な問題を解決する助けとなります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Do deadline gấp, PM yêu cầu bỏ qua một số test case ở mức ưu tiên thấp. Phản ứng phù hợp nhất của tester là gì?",
      "en": "Due to a tight deadline, the PM asks to skip some low-priority test cases. What is the tester's most appropriate response?",
      "ja": "締め切りが厳しいため、PMが優先度の低い一部のテストケースを省略するよう求めてきました。テスターの最も適切な対応は何ですか。"
    },
    "options": [
      {
        "vi": "Đồng ý nhưng ghi nhận rõ ràng phạm vi test đã bỏ qua và rủi ro liên quan vào báo cáo, để các bên cùng chịu trách nhiệm quyết định",
        "en": "Agree, but clearly document the skipped test scope and associated risks in the report so all parties share responsibility for the decision",
        "ja": "同意するが、省略したテスト範囲と関連リスクを報告書に明確に記録し、関係者全員がその決定の責任を共有できるようにする"
      },
      {
        "vi": "Tự ý bỏ test toàn bộ mà không ghi nhận lại",
        "en": "Skip all testing unilaterally without recording anything",
        "ja": "何も記録せず勝手にすべてのテストを省略する"
      },
      {
        "vi": "Từ chối thẳng thừng và không hợp tác với PM",
        "en": "Flatly refuse and refuse to cooperate with the PM",
        "ja": "きっぱり拒否しPMに協力しない"
      },
      {
        "vi": "Không nói gì và âm thầm vẫn test hết mọi trường hợp",
        "en": "Say nothing and quietly test everything anyway",
        "ja": "何も言わず黙ってすべてをテストし続ける"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi phải cắt giảm phạm vi test do áp lực thời gian, tester cần minh bạch ghi nhận rủi ro để quyết định được đưa ra có căn cứ và trách nhiệm được chia sẻ đúng người.",
      "en": "When scope must be cut due to time pressure, testers should transparently document the risk so the decision is informed and responsibility is shared with the right stakeholders.",
      "ja": "時間的制約でテスト範囲を削減せざるを得ない場合、テスターはリスクを透明に記録し、根拠のある判断が下され、責任が適切な関係者と共有されるようにすべきです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Vì deadline gấp, regression test bị rút gọn đáng kể trước khi release. Rủi ro lớn nhất tiềm ẩn là gì?",
      "en": "Because of a tight deadline, regression testing is significantly cut before release. What is the biggest potential risk?",
      "ja": "締め切りが厳しいため、リリース前の回帰テストが大幅に削減されました。最大の潜在的リスクは何ですか。"
    },
    "options": [
      {
        "vi": "Sản phẩm sẽ chạy nhanh hơn",
        "en": "The product will run faster",
        "ja": "製品の動作が速くなる"
      },
      {
        "vi": "Chức năng cũ vốn đang hoạt động tốt có thể bị lỗi ngầm do thay đổi mới mà không được phát hiện trước khi lên production",
        "en": "Existing functionality that previously worked correctly may silently break due to recent changes, going undetected before production release",
        "ja": "新しい変更により、これまで正常に動作していた既存機能が気づかれないうちに壊れ、本番リリース前に検出されない可能性がある"
      },
      {
        "vi": "Không có rủi ro gì vì regression test không quan trọng",
        "en": "There is no risk because regression testing isn't important",
        "ja": "回帰テストは重要でないためリスクはない"
      },
      {
        "vi": "Tester sẽ không còn việc gì để làm",
        "en": "Testers will have nothing left to do",
        "ja": "テスターの仕事がなくなる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Regression testing giúp phát hiện các lỗi phát sinh do thay đổi mới ảnh hưởng đến chức năng cũ; cắt giảm nó làm tăng nguy cơ lỗi ẩn lọt ra production.",
      "en": "Regression testing catches defects introduced by new changes affecting existing functionality; reducing it increases the risk of hidden defects reaching production.",
      "ja": "回帰テストは新しい変更が既存機能に与える影響で生じる欠陥を検出するもので、それを削減すると隠れた欠陥が本番環境に漏れるリスクが高まります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev nghi ngờ bug bạn báo cáo là \"false positive\" do lỗi thao tác của tester. Cách chứng minh thuyết phục nhất là gì?",
      "en": "The dev suspects the bug you reported is a \"false positive\" caused by tester error. What is the most convincing way to prove it?",
      "ja": "開発者は、あなたが報告したバグがテスターの操作ミスによる「誤検知」だと疑っています。最も説得力のある証明方法は何ですか。"
    },
    "options": [
      {
        "vi": "Khẳng định miệng rằng mình chắc chắn đúng",
        "en": "Verbally insist you are definitely correct",
        "ja": "自分が絶対正しいと口頭で主張する"
      },
      {
        "vi": "Yêu cầu người khác xác nhận thay vì tự cung cấp bằng chứng",
        "en": "Ask someone else to vouch for you instead of providing evidence yourself",
        "ja": "自分で証拠を提供する代わりに他人に確認してもらう"
      },
      {
        "vi": "Cung cấp video quay lại thao tác, log hệ thống và bước tái hiện chi tiết để dev có thể tự kiểm chứng độc lập",
        "en": "Provide a screen-recorded video of the actions, system logs, and detailed reproduction steps so the dev can independently verify",
        "ja": "操作を録画した動画、システムログ、詳細な再現手順を提供し、開発者が独自に検証できるようにする"
      },
      {
        "vi": "Bỏ qua bug để tránh mất thời gian tranh luận",
        "en": "Drop the bug to avoid wasting time arguing",
        "ja": "議論に時間を費やさないようバグを取り下げる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bằng chứng khách quan như video thao tác và log hệ thống cho phép dev tự kiểm chứng độc lập, là cách thuyết phục hiệu quả nhất khi bị nghi ngờ false positive.",
      "en": "Objective evidence like a recorded video and system logs lets the dev independently verify, making it the most effective way to counter a false-positive claim.",
      "ja": "録画動画やシステムログといった客観的証拠は開発者が独自に検証できるため、誤検知の疑いに対して最も効果的な反証方法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Requirement của dự án thay đổi liên tục nhưng tài liệu không được cập nhật kịp thời. Cách tester nên xử lý để đảm bảo test case luôn phản ánh đúng nghiệp vụ hiện tại?",
      "en": "Project requirements change frequently but documentation isn't updated in time. How should the tester handle this to ensure test cases always reflect current business logic?",
      "ja": "プロジェクトの要件は頻繁に変更されますが、文書がタイムリーに更新されません。テストケースが常に最新の業務ロジックを反映するようにテスターはどう対応すべきですか。"
    },
    "options": [
      {
        "vi": "Giữ nguyên test case cũ mãi mãi bất kể thay đổi",
        "en": "Keep the old test cases forever regardless of changes",
        "ja": "変更に関わらず古いテストケースをずっとそのまま使う"
      },
      {
        "vi": "Tự ý thay đổi nghiệp vụ theo ý mình mà không xác nhận",
        "en": "Unilaterally change the business logic as they see fit without confirming",
        "ja": "確認せずに自分の判断で業務ロジックを勝手に変更する"
      },
      {
        "vi": "Yêu cầu dừng toàn bộ dự án cho đến khi tài liệu hoàn chỉnh",
        "en": "Demand the entire project stop until documentation is complete",
        "ja": "文書が完成するまでプロジェクト全体を止めるよう要求する"
      },
      {
        "vi": "Xây dựng kênh cập nhật nhanh với BA/PO (ví dụ ghi chú trong ticket, họp ngắn) và chủ động rà soát lại test case sau mỗi thay đổi lớn",
        "en": "Establish a fast update channel with the BA/PO (e.g. ticket notes, quick syncs) and proactively review test cases after each major change",
        "ja": "BAやPOとの迅速な情報共有経路(チケットへの注記、短いミーティングなど)を確立し、大きな変更のたびに積極的にテストケースを見直す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong môi trường thay đổi nhanh, việc thiết lập kênh trao đổi nhanh và chủ động cập nhật test case theo thay đổi thực tế giúp giảm rủi ro test dựa trên thông tin lỗi thời.",
      "en": "In fast-changing environments, setting up quick communication channels and proactively updating test cases as changes happen reduces the risk of testing against outdated information.",
      "ja": "変化の速い環境では、迅速な情報共有経路を確立し変更に応じて積極的にテストケースを更新することで、古い情報に基づくテストのリスクを減らせます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev sửa xong bug nhưng không thông báo lại cho tester, khiến việc verify bị chậm trễ. Quy trình nào giúp tránh tình huống này?",
      "en": "A dev fixes a bug but doesn't notify the tester, delaying verification. What process helps avoid this situation?",
      "ja": "開発者はバグを修正しましたがテスターに通知せず、検証が遅れました。この状況を防ぐにはどのようなプロセスが役立ちますか。"
    },
    "options": [
      {
        "vi": "Thiết lập workflow rõ ràng trên công cụ quản lý bug (ví dụ Jira) với trạng thái \"Resolved/Ready for Retest\" tự động thông báo cho tester",
        "en": "Set up a clear workflow in the bug tracking tool (e.g. Jira) with a \"Resolved/Ready for Retest\" status that automatically notifies the tester",
        "ja": "バグ管理ツール(Jiraなど)に「Resolved/Ready for Retest」ステータスを設けた明確なワークフローを構築し、テスターに自動通知する"
      },
      {
        "vi": "Không cần quy trình, tester tự đoán khi nào bug được sửa",
        "en": "No process needed; the tester just guesses when the bug is fixed",
        "ja": "プロセスは不要で、テスターがバグ修正のタイミングを推測する"
      },
      {
        "vi": "Chỉ dùng trao đổi miệng không lưu lại vết tích",
        "en": "Rely only on verbal communication with no trace kept",
        "ja": "記録の残らない口頭のやり取りだけに頼る"
      },
      {
        "vi": "Tester chủ động đóng bug mà không kiểm tra lại",
        "en": "The tester closes the bug unilaterally without re-checking",
        "ja": "テスターが再確認せず一方的にバグをクローズする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Một workflow bug tracking chuẩn với trạng thái rõ ràng và thông báo tự động giúp tester biết ngay khi nào cần retest, tránh trễ tiến độ do thiếu giao tiếp.",
      "en": "A standard bug-tracking workflow with clear statuses and automatic notifications lets the tester know immediately when to retest, avoiding delays from poor communication.",
      "ja": "明確なステータスと自動通知を備えた標準的なバグ管理ワークフローにより、テスターは再テストが必要なタイミングを即座に把握でき、コミュニケーション不足による遅延を防げます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Theo bạn, kỹ năng mềm nào là quan trọng nhất giúp tester duy trì mối quan hệ hợp tác tốt với dev trong công việc hằng ngày?",
      "en": "In your view, what soft skill is most important for a tester to maintain a good collaborative relationship with devs in daily work?",
      "ja": "日々の業務で開発者と良好な協力関係を維持するために、テスターにとって最も重要なソフトスキルは何だと思いますか。"
    },
    "options": [
      {
        "vi": "Khả năng tranh luận để luôn giành phần thắng",
        "en": "The ability to argue and always win",
        "ja": "常に議論に勝つ能力"
      },
      {
        "vi": "Giao tiếp khách quan, tôn trọng lẫn nhau, tập trung vào vấn đề (chất lượng sản phẩm) thay vì cá nhân",
        "en": "Objective, mutually respectful communication that focuses on the issue (product quality) rather than the person",
        "ja": "個人ではなく問題(製品品質)に焦点を当てた、客観的で相互尊重に基づくコミュニケーション"
      },
      {
        "vi": "Luôn im lặng, không bao giờ nêu ý kiến khác biệt",
        "en": "Always staying silent and never voicing a differing opinion",
        "ja": "常に沈黙し異なる意見を決して述べない"
      },
      {
        "vi": "Tránh mọi liên hệ trực tiếp với dev, chỉ giao tiếp qua ticket",
        "en": "Avoid all direct contact with devs, communicating only via tickets",
        "ja": "開発者と直接連絡を取らず、チケットのみでやり取りする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mục tiêu chung của tester và dev là chất lượng sản phẩm; giao tiếp khách quan, tôn trọng và tập trung vào vấn đề giúp xây dựng mối quan hệ hợp tác bền vững.",
      "en": "Testers and devs share the common goal of product quality; objective, respectful, issue-focused communication builds a sustainable collaborative relationship.",
      "ja": "テスターと開発者は製品品質という共通の目標を持っており、客観的で敬意ある問題中心のコミュニケーションが持続的な協力関係を築きます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Một bug bị dev đóng vì cho là \"duplicate\" của bug khác, nhưng bạn nhận thấy nguyên nhân gốc khác nhau. Bạn nên làm gì?",
      "en": "A bug is closed by the dev as a \"duplicate\" of another one, but you notice the root causes are different. What should you do?",
      "ja": "あるバグが開発者によって別のバグの「重複」としてクローズされましたが、根本原因が異なることに気づきました。どうすべきですか。"
    },
    "options": [
      {
        "vi": "Chấp nhận đóng bug vì tin tưởng tuyệt đối vào dev",
        "en": "Accept the closure because you fully trust the dev",
        "ja": "開発者を完全に信頼してクローズを受け入れる"
      },
      {
        "vi": "Tạo thêm nhiều bug trùng lặp khác để gây chú ý",
        "en": "Create more duplicate bugs to draw attention",
        "ja": "注目を集めるためさらに多くの重複バグを作成する"
      },
      {
        "vi": "So sánh chi tiết bước tái hiện và nguyên nhân của hai bug, chỉ ra sự khác biệt cụ thể và đề nghị mở lại nếu thực sự không trùng",
        "en": "Compare the detailed reproduction steps and causes of both bugs, point out the specific differences, and request reopening if they truly aren't duplicates",
        "ja": "両方のバグの再現手順と原因を詳細に比較し、具体的な違いを示した上で、本当に重複でなければ再オープンを依頼する"
      },
      {
        "vi": "Không phản hồi gì và để nguyên trạng thái đã đóng",
        "en": "Don't respond and leave it closed",
        "ja": "何も反応せずクローズされたままにする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "So sánh cụ thể để chứng minh sự khác biệt về nguyên nhân là cách hợp lý để tránh bỏ sót lỗi thực sự bị gộp nhầm vào bug khác.",
      "en": "A concrete comparison to demonstrate the difference in root cause is the sound way to avoid a genuine defect being wrongly merged into another bug.",
      "ja": "根本原因の違いを具体的に比較して示すことは、実際の欠陥が別のバグに誤って統合されてしまうのを防ぐ合理的な方法です。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi thiếu tài liệu chính thức, cơ sở hợp lý nhất để tester tự viết test case cho một tính năng mới là gì?",
      "en": "When formal documentation is missing, what is the most reasonable basis for a tester to write test cases for a new feature?",
      "ja": "正式な文書がない場合、テスターが新機能のテストケースを作成する最も合理的な根拠は何ですか。"
    },
    "options": [
      {
        "vi": "Suy đoán hoàn toàn theo cảm tính cá nhân, không cần xác nhận với ai",
        "en": "Guess entirely based on personal intuition, without confirming with anyone",
        "ja": "誰にも確認せず完全に個人の感覚で推測する"
      },
      {
        "vi": "Không viết test case cho đến khi có SRS hoàn chỉnh 100%",
        "en": "Don't write any test cases until a 100% complete SRS exists",
        "ja": "SRSが100%完成するまでテストケースを一切書かない"
      },
      {
        "vi": "Chỉ copy nguyên test case của dự án khác không liên quan",
        "en": "Simply copy test cases from an unrelated project",
        "ja": "無関係な別プロジェクトのテストケースをそのままコピーする"
      },
      {
        "vi": "Kết hợp mockup/UI thiết kế, các cuộc thảo luận đã ghi lại (chat, meeting note), kinh nghiệm nghiệp vụ tương tự, và xác nhận lại điểm chưa rõ với BA/PO",
        "en": "Combine mockups/UI designs, documented discussions (chat logs, meeting notes), similar business experience, and reconfirm unclear points with the BA/PO",
        "ja": "モックアップ/UIデザイン、記録された議論(チャットログ、議事録)、類似業務の経験を組み合わせ、不明点はBA/POと再確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi thiếu tài liệu chính thức, kết hợp nhiều nguồn thông tin sẵn có và chủ động xác nhận điểm chưa rõ là cách tiếp cận thực tế và đáng tin cậy nhất.",
      "en": "When formal documentation is lacking, combining available information sources and proactively clarifying unclear points is the most practical and reliable approach.",
      "ja": "正式な文書がない場合、利用可能な複数の情報源を組み合わせ、不明点を積極的に確認することが最も実用的で信頼できるアプローチです。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Gần deadline, thời gian test còn rất ít so với khối lượng cần kiểm tra. Chiến lược test hợp lý nhất lúc này là gì?",
      "en": "Close to the deadline, there is very little testing time left relative to the workload. What is the most sensible testing strategy at this point?",
      "ja": "締め切りが近く、確認すべき量に対してテスト時間が非常に少ない場合、この時点で最も理にかなったテスト戦略は何ですか。"
    },
    "options": [
      {
        "vi": "Áp dụng risk-based testing: ưu tiên test các chức năng có mức ảnh hưởng và khả năng xảy ra lỗi cao nhất trước",
        "en": "Apply risk-based testing: prioritize testing the functions with the highest impact and likelihood of failure first",
        "ja": "リスクベーステストを適用し、影響度と障害発生の可能性が最も高い機能を優先的にテストする"
      },
      {
        "vi": "Test ngẫu nhiên không có kế hoạch để tiết kiệm thời gian suy nghĩ",
        "en": "Test randomly with no plan to save time thinking",
        "ja": "考える時間を節約するため計画なしにランダムにテストする"
      },
      {
        "vi": "Bỏ qua toàn bộ việc test và tin tưởng hoàn toàn vào dev",
        "en": "Skip all testing entirely and rely completely on the dev",
        "ja": "テストを一切行わず開発者を完全に信頼する"
      },
      {
        "vi": "Chỉ test những chức năng dễ nhất bất kể mức độ quan trọng",
        "en": "Only test the easiest features regardless of importance",
        "ja": "重要度に関わらず最も簡単な機能だけをテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi thời gian hạn chế, risk-based testing giúp tập trung nguồn lực vào những phần có rủi ro và tác động cao nhất, tối ưu hiệu quả kiểm thử.",
      "en": "When time is limited, risk-based testing focuses resources on the highest-risk, highest-impact areas, optimizing testing effectiveness.",
      "ja": "時間が限られている場合、リスクベーステストはリソースを最もリスクと影響度の高い部分に集中させ、テストの効果を最適化します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev cho rằng bug bạn báo là \"không quan trọng\" nhưng bạn tin nó ảnh hưởng lớn đến trải nghiệm người dùng thực tế. Cách phản hồi phù hợp nhất là gì?",
      "en": "The dev thinks the bug you reported is \"not important\" but you believe it significantly affects real user experience. What is the most appropriate response?",
      "ja": "開発者はあなたが報告したバグを「重要でない」と考えていますが、あなたは実際のユーザー体験に大きく影響すると考えています。最も適切な対応は何ですか。"
    },
    "options": [
      {
        "vi": "Ngừng tranh luận và chấp nhận quan điểm của dev ngay lập tức",
        "en": "Stop arguing and immediately accept the dev's view",
        "ja": "議論をやめて即座に開発者の見解を受け入れる"
      },
      {
        "vi": "Trình bày dữ liệu hoặc kịch bản sử dụng thực tế (ví dụ tần suất người dùng gặp phải, ảnh hưởng nghiệp vụ) để làm rõ mức độ ảnh hưởng một cách khách quan",
        "en": "Present real usage data or scenarios (e.g. frequency users encounter it, business impact) to objectively clarify the level of impact",
        "ja": "実際の使用データやシナリオ(発生頻度、業務への影響など)を提示し、影響度を客観的に明確化する"
      },
      {
        "vi": "Chỉ trích dev công khai trước cả team để gây áp lực",
        "en": "Publicly criticize the dev in front of the whole team to apply pressure",
        "ja": "チーム全体の前で公然と開発者を批判し圧力をかける"
      },
      {
        "vi": "Giữ im lặng và không bao giờ đề cập lại vấn đề này",
        "en": "Stay silent and never bring up the issue again",
        "ja": "沈黙し二度とこの問題に触れない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi có bất đồng về mức độ quan trọng, dữ liệu và kịch bản sử dụng thực tế là cơ sở khách quan giúp cả hai bên đánh giá đúng mức độ ảnh hưởng thay vì tranh cãi cảm tính.",
      "en": "When there's disagreement on importance, real usage data and scenarios provide an objective basis for both sides to correctly assess impact instead of arguing subjectively.",
      "ja": "重要度について意見が分かれる場合、実際の使用データやシナリオは、感情的な議論ではなく双方が影響度を正しく評価するための客観的根拠となります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Usability testing (kiểm thử tính khả dụng) chủ yếu đánh giá điều gì của sản phẩm?",
      "en": "What does usability testing primarily evaluate in a product?",
      "ja": "ユーザビリティテストは主に製品の何を評価しますか。"
    },
    "options": [
      {
        "vi": "Khả năng vá lỗi bảo mật của hệ thống",
        "en": "The system's ability to patch security vulnerabilities",
        "ja": "システムのセキュリティ脆弱性を修正する能力"
      },
      {
        "vi": "Tốc độ xử lý của server khi có nhiều người truy cập cùng lúc",
        "en": "The server's processing speed under many concurrent users",
        "ja": "多数のユーザーが同時アクセスした際のサーバー処理速度"
      },
      {
        "vi": "Mức độ dễ học, dễ dùng và sự hài lòng của người dùng khi thao tác",
        "en": "How easy it is to learn, use, and how satisfied users feel while interacting with it",
        "ja": "ユーザーが学びやすく使いやすいか、操作時にどれだけ満足できるか"
      },
      {
        "vi": "Độ chính xác của thuật toán tính toán nghiệp vụ",
        "en": "The accuracy of business logic calculation algorithms",
        "ja": "業務ロジックの計算アルゴリズムの正確さ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Usability testing tập trung vào trải nghiệm người dùng: dễ học, dễ thao tác, ít gây nhầm lẫn và khiến người dùng hài lòng khi sử dụng.",
      "en": "Usability testing focuses on the user experience: learnability, ease of operation, low confusion, and overall satisfaction.",
      "ja": "ユーザビリティテストは学びやすさ、操作のしやすさ、混乱の少なさ、満足度といったユーザー体験に焦点を当てます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Trong phỏng vấn, bạn được hỏi: 'Compatibility testing (kiểm thử tương thích) nghĩa là gì?' Bạn trả lời thế nào cho chính xác?",
      "en": "In an interview you're asked to define compatibility testing accurately — what's the best answer?",
      "ja": "面接で「互換性テストとは何か」と聞かれたら、最も正確な答えはどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm tra mã nguồn có tuân thủ chuẩn coding convention hay không",
        "en": "Checking whether the source code follows coding conventions",
        "ja": "ソースコードがコーディング規約に準拠しているかを確認すること"
      },
      {
        "vi": "Kiểm tra ứng dụng có tuân thủ đúng yêu cầu chức năng đã đặc tả hay không",
        "en": "Checking that the application complies with the specified functional requirements",
        "ja": "アプリが仕様書通りの機能要件に準拠しているかを確認すること"
      },
      {
        "vi": "Kiểm tra khả năng chịu tải khi số lượng người dùng tăng đột biến",
        "en": "Checking the system's capacity to handle a sudden spike in user load",
        "ja": "ユーザー数が急増した際の負荷耐性を確認すること"
      },
      {
        "vi": "Kiểm tra ứng dụng có hoạt động đúng trên nhiều môi trường khác nhau như trình duyệt, hệ điều hành, thiết bị, độ phân giải",
        "en": "Checking that the application works correctly across different environments such as browsers, operating systems, devices, and screen resolutions",
        "ja": "ブラウザ、OS、デバイス、画面解像度など異なる環境でアプリが正しく動作するかを確認すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Compatibility testing xác minh phần mềm hoạt động ổn định, hiển thị đúng trên nhiều cấu hình phần cứng, phần mềm, trình duyệt và thiết bị khác nhau.",
      "en": "Compatibility testing verifies the software behaves consistently and displays correctly across various hardware, software, browser, and device configurations.",
      "ja": "互換性テストは、さまざまなハードウェア・ソフトウェア・ブラウザ・デバイス構成でソフトウェアが安定して正しく動作するかを検証します。"
    }
  }
];
