// ============================================================================
// ISTQB EXT6 — Bổ sung đợt 6: 5 câu / cấp độ = 15 câu. Mỗi phần tử gắn sẵn `lvl`.
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật, katakana cho thuật ngữ).
// ============================================================================
export const DATA = [
  // ===================== istqb-foundation (5) — answers: 0,1,2,3,0 =====================
  { lvl: "istqb-foundation",
    q: { vi: "Hoạt động nào KHÔNG thuộc quy trình kiểm thử cơ bản theo ISTQB?",
        en: "Which activity is NOT part of the fundamental ISTQB test process?",
        ja: "ISTQBの基本的なテストプロセスに含まれない活動はどれですか。" },
    options: [
      { vi: "Viết mã sản phẩm (coding tính năng nghiệp vụ)", en: "Writing product code (coding business features)", ja: "製品コードの記述(業務機能の実装)" },
      { vi: "Lập kế hoạch và giám sát kiểm thử", en: "Test planning and monitoring", ja: "テスト計画とモニタリング" },
      { vi: "Phân tích và thiết kế kiểm thử", en: "Test analysis and design", ja: "テスト分析と設計" },
      { vi: "Thực thi và hoàn tất kiểm thử", en: "Test execution and completion", ja: "テスト実行と完了" }
    ],
    answer: 0,
    exp: { vi: "Quy trình kiểm thử gồm: lập kế hoạch, giám sát/kiểm soát, phân tích, thiết kế, hiện thực, thực thi, hoàn tất. Viết mã sản phẩm là việc của lập trình viên, không nằm trong quy trình kiểm thử.", en: "The test process covers planning, monitoring/control, analysis, design, implementation, execution and completion. Writing product code is a developer activity, not part of the test process.", ja: "テストプロセスは計画・監視/制御・分析・設計・実装・実行・完了から成る。製品コードの記述は開発者の作業であり、テストプロセスには含まれない。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Kiểm thử phi chức năng (non-functional testing) đánh giá điều gì?",
        en: "What does non-functional testing evaluate?",
        ja: "非機能テストは何を評価しますか。" },
    options: [
      { vi: "Hệ thống làm ĐÚNG chức năng gì (đầu vào → đầu ra mong đợi)", en: "WHAT functions the system performs (input → expected output)", ja: "システムがどの機能を行うか(入力→期待出力)" },
      { vi: "Hệ thống hoạt động TỐT ra sao: hiệu năng, bảo mật, khả dụng, độ tin cậy...", en: "HOW WELL the system behaves: performance, security, usability, reliability...", ja: "システムがどれだけ良く振る舞うか: 性能・セキュリティ・使いやすさ・信頼性…" },
      { vi: "Cấu trúc mã nguồn bên trong (độ phủ câu lệnh/nhánh)", en: "The internal code structure (statement/branch coverage)", ja: "内部のコード構造(命令/分岐カバレッジ)" },
      { vi: "Chỉ kiểm tra lỗi chính tả trên giao diện", en: "Only checking spelling on the UI", ja: "UIの誤字だけを確認する" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử chức năng xét 「làm gì」; phi chức năng xét 「làm tốt ra sao」 — các thuộc tính chất lượng như hiệu năng, bảo mật, khả dụng, tương thích, độ tin cậy. Xét cấu trúc mã là kiểm thử cấu trúc (white-box).", en: "Functional testing checks 'what' it does; non-functional checks 'how well' — quality attributes like performance, security, usability, compatibility, reliability. Examining code structure is structural (white-box) testing.", ja: "機能テストは「何をするか」、非機能テストは「どれだけ良く動くか」(性能・セキュリティ・使いやすさ・互換性・信頼性などの品質特性)を見る。コード構造を見るのは構造(ホワイトボックス)テストである。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Kỹ thuật kiểm thử hộp đen (black-box) dựa trên cơ sở nào để thiết kế ca kiểm thử?",
        en: "On what basis do black-box techniques design test cases?",
        ja: "ブラックボックス技法は何に基づいてテストケースを設計しますか。" },
    options: [
      { vi: "Dựa trên cấu trúc mã nguồn và luồng điều khiển bên trong", en: "On the source code structure and internal control flow", ja: "ソースコード構造と内部の制御フローに基づく" },
      { vi: "Dựa trên số lượng commit của lập trình viên", en: "On the number of developer commits", ja: "開発者のコミット数に基づく" },
      { vi: "Dựa trên đặc tả/hành vi bên ngoài (yêu cầu, use case) mà không cần biết mã bên trong", en: "On the external specification/behavior (requirements, use cases) without knowing the internal code", ja: "内部コードを知らずに外部仕様/振る舞い(要件・ユースケース)に基づく" },
      { vi: "Dựa trên màu sắc và bố cục giao diện", en: "On UI colors and layout", ja: "UIの色とレイアウトに基づく" }
    ],
    answer: 2,
    exp: { vi: "Hộp đen (specification-based) thiết kế ca kiểm thử từ yêu cầu/hành vi bên ngoài (phân vùng tương đương, giá trị biên, bảng quyết định...) mà không xét mã. Ngược lại hộp trắng dựa trên cấu trúc mã.", en: "Black-box (specification-based) derives tests from external requirements/behavior (equivalence partitioning, boundary values, decision tables...) without looking at code. White-box, by contrast, is based on code structure.", ja: "ブラックボックス(仕様ベース)はコードを見ず、外部要件/振る舞い(同値分割・境界値・デシジョンテーブルなど)からテストを導く。対してホワイトボックスはコード構造に基づく。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Vì sao mức độ độc lập của người kiểm thử (test independence) lại quan trọng?",
        en: "Why does tester independence matter?",
        ja: "テスターの独立性はなぜ重要ですか。" },
    options: [
      { vi: "Vì người độc lập luôn tìm được 100% số lỗi", en: "Because an independent person always finds 100% of defects", ja: "独立した人は常に欠陥の100%を見つけるから" },
      { vi: "Vì nó giúp tránh phải viết tài liệu kiểm thử", en: "Because it avoids writing test documentation", ja: "テスト文書を書かずに済むから" },
      { vi: "Vì độc lập làm chậm dự án nên buộc kiểm kỹ hơn", en: "Because independence slows the project, forcing more checks", ja: "独立性はプロジェクトを遅らせ、より多くの確認を強いるから" },
      { vi: "Vì người kiểm thử độc lập ít bị 「thiên kiến tác giả」, dễ nhìn ra giả định sai mà người viết code bỏ sót", en: "Because an independent tester is less affected by author bias and spots wrong assumptions the author missed", ja: "独立したテスターは作者バイアスの影響が少なく、作者が見落とした誤った前提に気づきやすいから" }
    ],
    answer: 3,
    exp: { vi: "Người viết code thường bị 「thiên kiến tác giả」: khó thấy lỗi trong giả định của chính mình. Người kiểm thử độc lập mang góc nhìn khác, phát hiện thêm lỗi. Nhưng độc lập không đảm bảo tìm hết lỗi và cần cân bằng với hiểu biết ngữ cảnh.", en: "Authors suffer author bias: they struggle to see faults in their own assumptions. An independent tester brings a different perspective and finds additional defects. Independence does not guarantee finding all defects and must be balanced with context knowledge.", ja: "作者は作者バイアスを受け、自らの前提の欠陥に気づきにくい。独立したテスターは異なる視点を持ち、追加の欠陥を見つける。ただし独立性は全欠陥の発見を保証せず、文脈知識とのバランスが必要である。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Phát biểu nào đúng về mối quan hệ giữa kiểm thử và chất lượng?",
        en: "Which statement about testing and quality is correct?",
        ja: "テストと品質の関係について正しい記述はどれですか。" },
    options: [
      { vi: "Kiểm thử cung cấp thông tin về chất lượng, giúp giảm rủi ro, nhưng bản thân việc kiểm thử không trực tiếp 「tạo ra」 chất lượng", en: "Testing provides information about quality and reduces risk, but testing itself does not directly 'create' quality", ja: "テストは品質に関する情報を提供しリスクを下げるが、テスト自体が直接品質を「作る」わけではない" },
      { vi: "Chỉ cần kiểm thử nhiều là phần mềm tự động có chất lượng cao", en: "Simply testing a lot automatically makes software high quality", ja: "多くテストするだけで自動的に高品質になる" },
      { vi: "Kiểm thử thay thế hoàn toàn cho thiết kế và lập trình tốt", en: "Testing fully replaces good design and programming", ja: "テストは良い設計とプログラミングを完全に置き換える" },
      { vi: "Kiểm thử chỉ có ích sau khi sản phẩm đã phát hành", en: "Testing is only useful after the product is released", ja: "テストはリリース後にのみ有用である" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử đo lường và cung cấp thông tin về chất lượng, giúp ra quyết định và giảm rủi ro; chất lượng được 「xây」 bởi thiết kế, lập trình và quy trình tốt. Kiểm thử sớm còn giúp ngăn lỗi, nhưng không thay thế việc làm đúng ngay từ đầu.", en: "Testing measures and informs about quality, supporting decisions and reducing risk; quality is 'built' by good design, coding and process. Early testing also helps prevent defects, but it does not replace doing things right from the start.", ja: "テストは品質を測定し情報を提供して意思決定を支援しリスクを下げる。品質は良い設計・実装・プロセスによって「作られる」。早期テストは欠陥予防にも役立つが、初めから正しく作ることの代わりにはならない。" } },

  // ===================== istqb-advanced (5) — answers: 1,2,3,0,1 =====================
  { lvl: "istqb-advanced",
    q: { vi: "Kỹ thuật 「đoán lỗi」 (error guessing) thuộc nhóm kỹ thuật nào và dựa vào đâu?",
        en: "Error guessing belongs to which technique group and relies on what?",
        ja: "「エラー推測」はどの技法グループに属し、何に依存しますか。" },
    options: [
      { vi: "Kỹ thuật hộp trắng, dựa trên độ phủ nhánh", en: "White-box, based on branch coverage", ja: "ホワイトボックス、分岐カバレッジに基づく" },
      { vi: "Kỹ thuật dựa trên kinh nghiệm, dựa vào hiểu biết/kinh nghiệm của tester về nơi lỗi hay xảy ra", en: "Experience-based, relying on the tester's knowledge/experience of where defects tend to occur", ja: "経験ベースで、欠陥が起きやすい箇所についてのテスターの知識/経験に依存する" },
      { vi: "Kỹ thuật dựa trên đặc tả, dùng bảng quyết định", en: "Specification-based, using decision tables", ja: "仕様ベースで、デシジョンテーブルを使う" },
      { vi: "Kỹ thuật tự động sinh test từ mã", en: "Automatic test generation from code", ja: "コードからのテスト自動生成" }
    ],
    answer: 1,
    exp: { vi: "Đoán lỗi là kỹ thuật dựa trên kinh nghiệm: tester dùng hiểu biết về lỗi thường gặp, điểm yếu quá khứ để tạo ca kiểm thử nhắm vào chỗ dễ hỏng. Nó bổ sung cho các kỹ thuật hộp đen/hộp trắng có hệ thống.", en: "Error guessing is an experience-based technique: the tester uses knowledge of common failures and past weak spots to craft tests targeting likely defects. It complements systematic black-box/white-box techniques.", ja: "エラー推測は経験ベースの技法で、よくある故障や過去の弱点の知識を使って欠陥が起きそうな箇所を狙うテストを作る。体系的なブラック/ホワイトボックス技法を補完する。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Kiểm thử dựa trên use case (use case testing) mạnh nhất trong việc phát hiện loại lỗi nào?",
        en: "Use case testing is strongest at finding which kind of defect?",
        ja: "ユースケーステストはどの種類の欠陥の発見に最も強いですか。" },
    options: [
      { vi: "Lỗi tràn bộ đệm ở tầng mã máy", en: "Buffer overflows at machine-code level", ja: "機械語レベルのバッファオーバーフロー" },
      { vi: "Lỗi định dạng font chữ", en: "Font formatting defects", ja: "フォント書式の欠陥" },
      { vi: "Lỗi trong luồng nghiệp vụ end-to-end và tương tác giữa người dùng với hệ thống (gồm luồng thay thế/ngoại lệ)", en: "Defects in end-to-end business flows and user–system interactions (including alternate/exception flows)", ja: "エンドツーエンドの業務フローと利用者・システム間のやり取り(代替/例外フローを含む)の欠陥" },
      { vi: "Lỗi cú pháp khi biên dịch", en: "Compilation syntax errors", ja: "コンパイル時の構文エラー" }
    ],
    answer: 2,
    exp: { vi: "Use case mô tả tương tác giữa tác nhân và hệ thống theo luồng chính, luồng thay thế và ngoại lệ; kiểm thử use case rất hợp để tìm lỗi tích hợp trong quy trình nghiệp vụ thực tế mà người dùng sẽ đi qua.", en: "A use case describes actor–system interactions via main, alternate and exception flows; use case testing is well suited to finding integration defects in the real business processes users will traverse.", ja: "ユースケースはアクターとシステムの相互作用を主フロー・代替フロー・例外フローで記述する。ユースケーステストは利用者が通る実際の業務プロセスの統合欠陥の発見に適する。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Vì sao 「quản lý dữ liệu kiểm thử」 (test data management) là thách thức lớn khi kiểm thử hệ thống doanh nghiệp?",
        en: "Why is test data management a major challenge when testing enterprise systems?",
        ja: "企業システムのテストで「テストデータ管理」が大きな課題となるのはなぜですか。" },
    options: [
      { vi: "Vì dữ liệu test luôn nhỏ và không quan trọng", en: "Because test data is always small and unimportant", ja: "テストデータは常に小さく重要でないから" },
      { vi: "Vì chỉ cần một bản ghi là đủ cho mọi ca kiểm thử", en: "Because a single record suffices for all test cases", ja: "1件のレコードで全テストケースに十分だから" },
      { vi: "Vì dữ liệu không bao giờ ảnh hưởng kết quả kiểm thử", en: "Because data never affects test results", ja: "データがテスト結果に影響しないから" },
      { vi: "Vì cần dữ liệu đủ đa dạng và nhất quán, ổn định giữa các lần chạy, đồng thời tuân thủ bảo mật/PII (ẩn danh dữ liệu thật)", en: "Because you need data that is diverse, consistent and stable across runs while complying with privacy/PII (anonymizing real data)", ja: "実行ごとに多様・一貫・安定したデータが必要で、同時にプライバシー/PII(実データの匿名化)を順守する必要があるから" }
    ],
    answer: 3,
    exp: { vi: "Hệ thống doanh nghiệp cần bộ dữ liệu bao phủ nhiều tình huống, ổn định để tái lập kết quả, và tuân thủ quy định bảo mật (không dùng PII thật). Chuẩn bị, làm mới và ẩn danh dữ liệu là công việc phức tạp, ảnh hưởng lớn tới độ tin cậy của kiểm thử.", en: "Enterprise systems need datasets that cover many scenarios, stay stable for reproducibility, and comply with privacy rules (no real PII). Provisioning, refreshing and anonymizing data is complex and heavily affects test reliability.", ja: "企業システムは多様なシナリオを網羅し、再現のため安定し、プライバシー規則(実PIIを使わない)を順守するデータセットを必要とする。データの準備・更新・匿名化は複雑で、テストの信頼性に大きく影響する。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Trong vòng đời khiếm khuyết (defect lifecycle), trạng thái 「Rejected」 (bị từ chối) thường có nghĩa là gì?",
        en: "In the defect lifecycle, what does the 'Rejected' state usually mean?",
        ja: "欠陥ライフサイクルで「Rejected(却下)」状態は通常何を意味しますか。" },
    options: [
      { vi: "Nhóm phát triển cho rằng đó không phải lỗi (ví dụ đúng đặc tả, không tái hiện được, hoặc trùng lặp)", en: "The dev team considers it not a defect (e.g. works as specified, not reproducible, or duplicate)", ja: "開発チームが欠陥ではないと判断(例: 仕様通り・再現不可・重複)" },
      { vi: "Lỗi đã được sửa và kiểm thử lại đạt", en: "The defect is fixed and passed retesting", ja: "欠陥は修正され再テストに合格した" },
      { vi: "Lỗi đang chờ lập trình viên sửa", en: "The defect is waiting for a developer to fix", ja: "欠陥は開発者の修正待ちである" },
      { vi: "Lỗi có độ nghiêm trọng cao nhất", en: "The defect has the highest severity", ja: "欠陥は最高の重大度を持つ" }
    ],
    answer: 0,
    exp: { vi: "「Rejected」 nghĩa là bug được đánh giá không hợp lệ: hành vi đúng đặc tả, không tái hiện được, trùng với bug khác, hoặc thiếu thông tin. Tester nên xem lại chứng cứ; nếu vẫn tin là lỗi thật thì bổ sung bằng chứng và mở lại.", en: "'Rejected' means the bug was judged invalid: behaves as specified, not reproducible, duplicate, or lacking information. The tester should review the evidence and, if still convinced it is real, add proof and reopen.", ja: "「Rejected」はバグが無効と判断されたこと(仕様通り・再現不可・重複・情報不足)を意味する。テスターは証跡を見直し、なお本物と考えるなら証拠を追加して再オープンすべきである。" } },

  { lvl: "istqb-advanced",
    q: { vi: "「Tiêu chí vào」 (entry criteria) và 「tiêu chí ra」 (exit criteria) của một cấp kiểm thử dùng để làm gì?",
        en: "What are entry criteria and exit criteria of a test level used for?",
        ja: "テストレベルの「開始基準(entry)」と「終了基準(exit)」は何のために使われますか。" },
    options: [
      { vi: "Để chọn màu cho báo cáo kiểm thử", en: "To choose colors for the test report", ja: "テストレポートの色を選ぶため" },
      { vi: "Entry: điều kiện cần có để BẮT ĐẦU kiểm thử; Exit: điều kiện cần đạt để coi là ĐÃ XONG/dừng kiểm thử một cách có kiểm soát", en: "Entry: conditions needed to START testing; Exit: conditions to be met to consider testing DONE/stopped in a controlled way", ja: "Entry: テストを開始するのに必要な条件、Exit: テストを完了/管理された形で停止したとみなすために満たすべき条件" },
      { vi: "Để tính lương cho tester", en: "To calculate testers' salaries", ja: "テスターの給与を計算するため" },
      { vi: "Để thay thế cho kế hoạch kiểm thử", en: "To replace the test plan", ja: "テスト計画を置き換えるため" }
    ],
    answer: 1,
    exp: { vi: "Entry criteria xác định điều kiện tiên quyết để bắt đầu (môi trường sẵn sàng, build ổn định, dữ liệu, tài liệu). Exit criteria xác định khi nào được coi là hoàn tất (độ phủ, tỷ lệ pass, mật độ lỗi còn lại, rủi ro chấp nhận được), giúp quyết định dừng khách quan.", en: "Entry criteria define prerequisites to begin (environment ready, stable build, data, docs). Exit criteria define when testing is considered complete (coverage, pass rate, remaining defect density, acceptable risk), enabling an objective stop decision.", ja: "開始基準は開始の前提条件(環境・安定ビルド・データ・文書)を定める。終了基準は完了とみなす条件(カバレッジ・合格率・残存欠陥密度・許容リスク)を定め、客観的な停止判断を可能にする。" } },

  // ===================== istqb-expert (5) — answers: 2,3,0,1,2 =====================
  { lvl: "istqb-expert",
    q: { vi: "Chỉ số 「độ phủ yêu cầu」 (requirements coverage) đo lường điều gì?",
        en: "What does the 'requirements coverage' metric measure?",
        ja: "「要件カバレッジ」指標は何を測定しますか。" },
    options: [
      { vi: "Số dòng mã đã được thực thi khi chạy test", en: "Lines of code executed during testing", ja: "テスト実行中に実行されたコード行数" },
      { vi: "Tốc độ chạy của bộ test tự động", en: "The run speed of the automated suite", ja: "自動テストスイートの実行速度" },
      { vi: "Tỷ lệ yêu cầu đã có ít nhất một ca kiểm thử truy vết tới, phản ánh mức độ kiểm thử bám theo yêu cầu", en: "The proportion of requirements traced to at least one test case, reflecting how well testing follows requirements", ja: "少なくとも1つのテストケースに追跡できる要件の割合で、テストが要件にどれだけ沿っているかを反映する" },
      { vi: "Số lỗi tìm thấy mỗi giờ", en: "Defects found per hour", ja: "1時間あたりに発見した欠陥数" }
    ],
    answer: 2,
    exp: { vi: "Độ phủ yêu cầu = tỷ lệ yêu cầu được ánh xạ tới ít nhất một ca kiểm thử (qua ma trận truy vết). Nó cho biết còn yêu cầu nào chưa được kiểm thử; khác với độ phủ mã (đo phần mã được thực thi).", en: "Requirements coverage = proportion of requirements mapped to at least one test case (via a traceability matrix). It shows which requirements remain untested; distinct from code coverage (which measures executed code).", ja: "要件カバレッジ = 少なくとも1つのテストケースに(追跡マトリクスで)対応づけられた要件の割合。未テストの要件を示し、実行コードを測るコードカバレッジとは異なる。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khái niệm 「chi phí chất lượng」 (Cost of Quality) thường được chia thành các nhóm nào?",
        en: "The 'Cost of Quality' is typically broken down into which groups?",
        ja: "「品質コスト(Cost of Quality)」は通常どのグループに分けられますか。" },
    options: [
      { vi: "Chỉ gồm chi phí mua license công cụ test", en: "Only the cost of buying test tool licenses", ja: "テストツールのライセンス購入費のみ" },
      { vi: "Chỉ gồm lương của đội kiểm thử", en: "Only the test team's salaries", ja: "テストチームの給与のみ" },
      { vi: "Chi phí quảng cáo sản phẩm", en: "Product advertising costs", ja: "製品の広告費" },
      { vi: "Chi phí phòng ngừa, chi phí thẩm định (đánh giá), và chi phí thất bại nội bộ + thất bại bên ngoài", en: "Prevention, appraisal, and internal + external failure costs", ja: "予防コスト・評価コスト・内部失敗+外部失敗コスト" }
    ],
    answer: 3,
    exp: { vi: "Cost of Quality gồm: phòng ngừa (đào tạo, review, chuẩn), thẩm định (kiểm thử, đánh giá), thất bại nội bộ (sửa lỗi trước phát hành) và thất bại bên ngoài (lỗi tới tay khách hàng — đắt nhất). Đầu tư phòng ngừa/thẩm định sớm giúp giảm chi phí thất bại.", en: "Cost of Quality includes: prevention (training, reviews, standards), appraisal (testing, evaluation), internal failure (fixing before release) and external failure (defects reaching customers — the costliest). Investing early in prevention/appraisal reduces failure costs.", ja: "品質コストは予防(教育・レビュー・標準)、評価(テスト・評価)、内部失敗(リリース前の修正)、外部失敗(顧客に届いた欠陥—最も高価)から成る。予防/評価への早期投資が失敗コストを下げる。" } },

  { lvl: "istqb-expert",
    q: { vi: "Ước lượng kiểm thử dựa trên số liệu (metrics-based estimation) khác với dựa trên chuyên gia (expert-based) ở điểm nào?",
        en: "How does metrics-based test estimation differ from expert-based estimation?",
        ja: "メトリクスベースのテスト見積りは、専門家ベースの見積りとどう異なりますか。" },
    options: [
      { vi: "Metrics-based dùng dữ liệu lịch sử/năng suất từ các dự án trước để suy ra nỗ lực; expert-based dựa vào phán đoán của người có kinh nghiệm", en: "Metrics-based uses historical/productivity data from past projects to derive effort; expert-based relies on experienced people's judgment", ja: "メトリクスベースは過去プロジェクトの履歴/生産性データから工数を導き、専門家ベースは経験者の判断に依存する" },
      { vi: "Metrics-based chỉ đoán ngẫu nhiên, expert-based dùng máy học", en: "Metrics-based just guesses randomly; expert-based uses machine learning", ja: "メトリクスベースはランダムに推測し、専門家ベースは機械学習を使う" },
      { vi: "Hai cách này hoàn toàn giống nhau", en: "The two are entirely identical", ja: "両者は完全に同一である" },
      { vi: "Metrics-based không cần dữ liệu nào", en: "Metrics-based needs no data at all", ja: "メトリクスベースはデータを一切必要としない" }
    ],
    answer: 0,
    exp: { vi: "Metrics-based dùng số liệu quá khứ (năng suất, mật độ lỗi, tỷ lệ nỗ lực) để ngoại suy cho dự án hiện tại; expert-based (như Wideband Delphi, three-point) dựa vào kinh nghiệm chuyên gia. Thực tế thường kết hợp cả hai để tăng độ tin cậy.", en: "Metrics-based uses past data (productivity, defect density, effort ratios) to extrapolate to the current project; expert-based (e.g. Wideband Delphi, three-point) relies on expert experience. In practice both are combined for reliability.", ja: "メトリクスベースは過去データ(生産性・欠陥密度・工数比)を現行プロジェクトに外挿し、専門家ベース(ワイドバンド・デルファイや三点見積り)は専門家の経験に依存する。実務では信頼性のため両者を組み合わせる。" } },

  { lvl: "istqb-expert",
    q: { vi: "Trong quản lý kiểm thử, vì sao 「giao tiếp với các bên liên quan」 (stakeholder communication) về kết quả kiểm thử lại quan trọng?",
        en: "In test management, why is stakeholder communication about test results important?",
        ja: "テストマネジメントで、テスト結果に関する「ステークホルダーとのコミュニケーション」はなぜ重要ですか。" },
    options: [
      { vi: "Để kéo dài dự án càng lâu càng tốt", en: "To prolong the project as long as possible", ja: "プロジェクトを可能な限り長引かせるため" },
      { vi: "Để truyền đạt rủi ro và tình trạng chất lượng một cách minh bạch, giúp bên ra quyết định chọn go/no-go dựa trên thông tin đúng", en: "To transparently convey risk and quality status so decision-makers can make an informed go/no-go", ja: "リスクと品質状況を透明に伝え、意思決定者が正しい情報でgo/no-goを判断できるようにするため" },
      { vi: "Để giấu bớt lỗi cho đẹp báo cáo", en: "To hide some defects to make the report look good", ja: "レポートを良く見せるため欠陥を隠すため" },
      { vi: "Vì stakeholder phải tự viết ca kiểm thử", en: "Because stakeholders must write the test cases themselves", ja: "ステークホルダーが自らテストケースを書かねばならないから" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử tạo ra thông tin về rủi ro và chất lượng; giá trị của nó chỉ phát huy khi được truyền đạt rõ ràng, trung thực tới người ra quyết định (báo cáo tiến độ, rủi ro còn lại, khuyến nghị) để họ chọn phát hành hay không dựa trên dữ liệu, không phải cảm tính.", en: "Testing produces information about risk and quality; its value is realized only when communicated clearly and honestly to decision-makers (progress, residual risk, recommendations) so they can decide to release or not based on data, not gut feeling.", ja: "テストはリスクと品質の情報を生む。その価値は、意思決定者へ明確かつ誠実に伝えられて(進捗・残存リスク・提言)初めて発揮され、勘ではなくデータでリリース可否を判断できる。" } },

  { lvl: "istqb-expert",
    q: { vi: "Mô hình cải tiến 「IDEAL」 (Initiating–Diagnosing–Establishing–Acting–Learning) dùng để làm gì?",
        en: "What is the IDEAL model (Initiating–Diagnosing–Establishing–Acting–Learning) used for?",
        ja: "IDEALモデル(Initiating–Diagnosing–Establishing–Acting–Learning)は何に使われますか。" },
    options: [
      { vi: "Là một ngôn ngữ lập trình để viết test", en: "A programming language for writing tests", ja: "テストを書くためのプログラミング言語" },
      { vi: "Là công cụ quản lý lỗi", en: "A defect-tracking tool", ja: "欠陥管理ツール" },
      { vi: "Là khung tổ chức các bước cải tiến quy trình (gồm cả cải tiến quy trình kiểm thử) theo chu trình liên tục", en: "A framework organizing process-improvement steps (including test process improvement) as a continuous cycle", ja: "プロセス改善(テストプロセス改善を含む)の手順を継続的サイクルとして整理するフレームワーク" },
      { vi: "Là một chuẩn nén ảnh", en: "An image compression standard", ja: "画像圧縮の標準" }
    ],
    answer: 2,
    exp: { vi: "IDEAL là mô hình cải tiến theo chu trình: Khởi động (thiết lập bối cảnh), Chẩn đoán (đánh giá hiện trạng), Thiết lập (lập kế hoạch), Hành động (triển khai thí điểm và mở rộng), Học hỏi (rút kinh nghiệm cho vòng sau). Nó áp dụng được cho cải tiến quy trình kiểm thử ở cấp tổ chức.", en: "IDEAL is a cyclic improvement model: Initiating (set context), Diagnosing (assess current state), Establishing (plan), Acting (pilot and roll out), Learning (capture lessons for the next cycle). It applies to organization-level test process improvement.", ja: "IDEALは循環的な改善モデルで、Initiating(文脈設定)、Diagnosing(現状評価)、Establishing(計画)、Acting(試行と展開)、Learning(次サイクルへの学び)から成る。組織レベルのテストプロセス改善に適用できる。" } },
];
