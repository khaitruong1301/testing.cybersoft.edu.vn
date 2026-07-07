// ISTQB Advanced Level (CTAL) practice bank — Test Analyst (TA), Technical Test Analyst (TTA), Test Manager (TM).
// 100 multiple-choice questions, trilingual (vi / en / ja).
export const DATA = [
  {
    q: { vi: "Kỹ thuật pairwise (all-pairs) nhằm mục đích gì?", en: "What is the purpose of the pairwise (all-pairs) technique?", ja: "ペアワイズ（オールペア）技法の目的は何ですか？" },
    options: [
      { vi: "Bao phủ mọi cặp giá trị của các tham số với số ca test tối thiểu", en: "Cover every pair of parameter values with a minimal set of tests", ja: "最小限のテストで各パラメータ値のすべてのペアを網羅する" },
      { vi: "Kiểm thử mọi tổ hợp đầy đủ của các tham số", en: "Test every full combination of parameters", ja: "パラメータの全組み合わせを網羅的にテストする" },
      { vi: "Chỉ kiểm thử giá trị mặc định", en: "Test only default values", ja: "デフォルト値のみをテストする" },
      { vi: "Chỉ kiểm thử biên trên và biên dưới", en: "Test only the upper and lower bounds", ja: "上限と下限のみをテストする" }
    ],
    answer: 0,
    exp: { vi: "Pairwise giảm mạnh số ca test nhưng vẫn phủ mọi cặp giá trị.", en: "Pairwise greatly reduces test count while still covering all value pairs.", ja: "ペアワイズはテスト数を大幅に減らしつつ、すべての値のペアを網羅します。" }
  },
  {
    q: { vi: "Combinatorial testing bậc cao hơn pairwise (ví dụ 3-wise) khác biệt ở điểm nào?", en: "How does higher-strength combinatorial testing (e.g. 3-wise) differ from pairwise?", ja: "より高強度の組み合わせテスト（例: 3-wise）はペアワイズとどう異なりますか？" },
    options: [
      { vi: "Luôn ít ca test hơn pairwise", en: "Always yields fewer tests than pairwise", ja: "常にペアワイズより少ないテスト数になる" },
      { vi: "Bao phủ mọi bộ ba giá trị thay vì chỉ mọi cặp", en: "Covers every triple of values instead of only every pair", ja: "各ペアだけでなく、値の各3つ組を網羅する" },
      { vi: "Không cần công cụ hỗ trợ", en: "Requires no tool support", ja: "ツールのサポートを必要としない" },
      { vi: "Chỉ áp dụng cho một tham số", en: "Applies to a single parameter only", ja: "単一パラメータにのみ適用される" }
    ],
    answer: 1,
    exp: { vi: "Bậc t cao hơn phủ mọi tổ hợp của t tham số, tăng độ phủ nhưng tăng số ca test.", en: "Higher strength t covers all combinations of t parameters, increasing coverage but test count.", ja: "強度tが高いほどt個のパラメータの全組み合わせを網羅し、カバレッジは上がるがテスト数も増えます。" }
  },
  {
    q: { vi: "Classification tree (cây phân loại) hỗ trợ điều gì?", en: "What does a classification tree support?", ja: "クラシフィケーションツリー（分類木）は何を支援しますか？" },
    options: [
      { vi: "Đo độ phủ nhánh của mã nguồn", en: "Measuring branch coverage of source code", ja: "ソースコードの分岐カバレッジを測定する" },
      { vi: "Xác định thời gian phản hồi hệ thống", en: "Determining system response time", ja: "システムの応答時間を判定する" },
      { vi: "Trực quan hoá phân vùng đầu vào và tổ hợp các lớp để tạo ca test", en: "Visualizing input partitions and combining classes to derive test cases", ja: "入力の分割を可視化し、クラスを組み合わせてテストケースを導出する" },
      { vi: "Quản lý cấu hình test", en: "Managing test configuration", ja: "テスト構成を管理する" }
    ],
    answer: 2,
    exp: { vi: "Cây phân loại chia đầu vào thành các lớp và tổ hợp có hệ thống thành ca test.", en: "The classification tree splits inputs into classes and systematically combines them into tests.", ja: "分類木は入力をクラスに分け、体系的に組み合わせてテストにします。" }
  },
  {
    q: { vi: "Cause-effect graphing (đồ thị nhân-quả) chủ yếu dùng để làm gì?", en: "What is cause-effect graphing primarily used for?", ja: "原因結果グラフ法は主に何のために使われますか？" },
    options: [
      { vi: "Đo mức độ phức tạp chu trình", en: "Measuring cyclomatic complexity", ja: "循環的複雑度を測定する" },
      { vi: "Ước lượng chi phí test", en: "Estimating test cost", ja: "テストコストを見積もる" },
      { vi: "Tạo dữ liệu hiệu năng", en: "Generating performance data", ja: "パフォーマンスデータを生成する" },
      { vi: "Mô hình hoá quan hệ logic giữa điều kiện (nhân) và hành động (quả)", en: "Modeling logical relationships between conditions (causes) and actions (effects)", ja: "条件（原因）とアクション（結果）の論理関係をモデル化する" }
    ],
    answer: 3,
    exp: { vi: "Đồ thị nhân-quả biến đặc tả logic thành ca test, thường qua bảng quyết định.", en: "Cause-effect graphing turns logical specifications into tests, often via a decision table.", ja: "原因結果グラフは論理仕様をテストに変換し、しばしば決定表を介します。" }
  },
  {
    q: { vi: "Trong domain analysis, chiến lược '1x1' thường được diễn đạt là gì?", en: "In domain analysis, how is the '1x1' strategy typically expressed?", ja: "ドメイン分析における「1x1」戦略は通常どう表現されますか？" },
    options: [
      { vi: "Với mỗi biên, chọn 1 giá trị on-point và 1 giá trị off-point", en: "For each boundary, pick one on-point and one off-point value", ja: "各境界について、オンポイント1点とオフポイント1点を選ぶ" },
      { vi: "Chỉ chọn 1 giá trị ở giữa vùng", en: "Pick a single mid-range value only", ja: "範囲の中央値を1つだけ選ぶ" },
      { vi: "Test tất cả giá trị trong vùng", en: "Test every value in the domain", ja: "ドメイン内のすべての値をテストする" },
      { vi: "Bỏ qua các giá trị biên", en: "Ignore boundary values", ja: "境界値を無視する" }
    ],
    answer: 0,
    exp: { vi: "On/off point kiểm tra chính xác vị trí biên và điều kiện quan hệ.", en: "On/off points precisely verify the boundary location and the relational condition.", ja: "オン/オフポイントは境界の位置と関係条件を正確に検証します。" }
  },
  {
    q: { vi: "Điểm 'off-point' trong domain analysis được định nghĩa thế nào?", en: "How is an 'off-point' defined in domain analysis?", ja: "ドメイン分析における「オフポイント」はどう定義されますか？" },
    options: [
      { vi: "Giá trị trung tâm của vùng", en: "The centre value of the domain", ja: "ドメインの中心値" },
      { vi: "Giá trị ngay bên ngoài biên, không thoả điều kiện của vùng", en: "A value just outside the boundary that does not satisfy the domain condition", ja: "境界のすぐ外側にあり、ドメイン条件を満たさない値" },
      { vi: "Giá trị nằm trên biên", en: "A value on the boundary", ja: "境界上の値" },
      { vi: "Bất kỳ giá trị hợp lệ nào", en: "Any valid value", ja: "任意の有効な値" }
    ],
    answer: 1,
    exp: { vi: "Off-point nằm ngoài vùng; on-point nằm trên/thuộc biên tuỳ loại điều kiện.", en: "The off-point lies outside the domain; the on-point is on/in the boundary depending on the condition.", ja: "オフポイントはドメイン外にあり、オンポイントは条件により境界上/内にあります。" }
  },
  {
    q: { vi: "State transition testing với '0-switch coverage' bao phủ điều gì?", en: "What does state transition testing with '0-switch coverage' cover?", ja: "「0スイッチカバレッジ」の状態遷移テストは何を網羅しますか？" },
    options: [
      { vi: "Mọi cặp chuyển trạng thái liên tiếp", en: "All pairs of consecutive transitions", ja: "連続する遷移のすべてのペア" },
      { vi: "Mọi đường đi dài nhất", en: "All longest paths", ja: "すべての最長パス" },
      { vi: "Mọi chuyển trạng thái đơn (single transitions)", en: "All single transitions", ja: "すべての単一遷移" },
      { vi: "Mọi trạng thái không hợp lệ", en: "All invalid states", ja: "すべての無効な状態" }
    ],
    answer: 2,
    exp: { vi: "0-switch = phủ mỗi transition đơn; N-switch phủ chuỗi N+1 transition liên tiếp.", en: "0-switch covers each single transition; N-switch covers sequences of N+1 consecutive transitions.", ja: "0スイッチは各単一遷移を、Nスイッチは連続するN+1個の遷移列を網羅します。" }
  },
  {
    q: { vi: "'1-switch coverage' (N=1) trong kiểm thử chuyển trạng thái yêu cầu gì?", en: "What does '1-switch coverage' (N=1) require in state transition testing?", ja: "状態遷移テストにおける「1スイッチカバレッジ」（N=1）は何を要求しますか？" },
    options: [
      { vi: "Chỉ bao phủ trạng thái khởi tạo", en: "Cover the initial state only", ja: "初期状態のみを網羅する" },
      { vi: "Bao phủ mọi transition đơn một lần", en: "Cover every single transition once", ja: "すべての単一遷移を一度網羅する" },
      { vi: "Bao phủ mọi transition không hợp lệ", en: "Cover every invalid transition", ja: "すべての無効な遷移を網羅する" },
      { vi: "Bao phủ mọi cặp chuyển trạng thái liên tiếp", en: "Cover every pair of consecutive transitions", ja: "連続する遷移のすべてのペアを網羅する" }
    ],
    answer: 3,
    exp: { vi: "N-switch phủ chuỗi N+1 chuyển; với N=1 là các cặp chuyển liên tiếp.", en: "N-switch covers sequences of N+1 transitions; for N=1 that is pairs of consecutive transitions.", ja: "NスイッチはN+1個の遷移列を網羅し、N=1では連続する遷移のペアです。" }
  },
  {
    q: { vi: "Bảng quyết định (decision table) đặc biệt hữu ích khi nào?", en: "When is a decision table especially useful?", ja: "決定表が特に有用なのはどのような場合ですか？" },
    options: [
      { vi: "Khi hành vi phụ thuộc vào tổ hợp nhiều điều kiện logic", en: "When behaviour depends on combinations of several logical conditions", ja: "動作が複数の論理条件の組み合わせに依存する場合" },
      { vi: "Khi chỉ có một đầu vào duy nhất", en: "When there is only a single input", ja: "入力が1つしかない場合" },
      { vi: "Khi đo hiệu năng hệ thống", en: "When measuring system performance", ja: "システムのパフォーマンスを測定する場合" },
      { vi: "Khi không có quy tắc nghiệp vụ", en: "When there are no business rules", ja: "業務ルールが存在しない場合" }
    ],
    answer: 0,
    exp: { vi: "Bảng quyết định liệt kê tổ hợp điều kiện và hành động tương ứng.", en: "A decision table enumerates condition combinations and their resulting actions.", ja: "決定表は条件の組み合わせと対応するアクションを列挙します。" }
  },
  {
    q: { vi: "Trong bảng quyết định 'collapsed', các cột được rút gọn bằng cách nào?", en: "In a 'collapsed' decision table, how are columns reduced?", ja: "「圧縮された」決定表では列はどのように削減されますか？" },
    options: [
      { vi: "Xoá ngẫu nhiên các cột", en: "Randomly deleting columns", ja: "列をランダムに削除する" },
      { vi: "Gộp các cột có cùng hành động bằng điều kiện 'không quan tâm' (dash)", en: "Merging columns with the same actions using 'don't care' (dash) conditions", ja: "同じアクションを持つ列を「不問（ダッシュ）」条件で統合する" },
      { vi: "Thêm cột trùng lặp", en: "Adding duplicate columns", ja: "重複する列を追加する" },
      { vi: "Bỏ toàn bộ điều kiện", en: "Removing all conditions", ja: "すべての条件を削除する" }
    ],
    answer: 1,
    exp: { vi: "Cột có kết quả giống nhau, khác nhau ở điều kiện không ảnh hưởng, được gộp lại.", en: "Columns with identical outcomes that differ only in irrelevant conditions are merged.", ja: "結果が同じで無関係な条件のみが異なる列は統合されます。" }
  },
  {
    q: { vi: "Use case testing tập trung vào điều gì?", en: "What does use case testing focus on?", ja: "ユースケーステストは何に焦点を当てますか？" },
    options: [
      { vi: "Độ phủ câu lệnh của mã", en: "Statement coverage of code", ja: "コードの命令網羅" },
      { vi: "Cấu hình phần cứng", en: "Hardware configuration", ja: "ハードウェア構成" },
      { vi: "Các luồng chính và luồng thay thế/ngoại lệ của tương tác giữa tác nhân và hệ thống", en: "Main and alternative/exception flows of actor-system interactions", ja: "アクターとシステムの相互作用における基本フローと代替/例外フロー" },
      { vi: "Chỉ dữ liệu biên", en: "Boundary data only", ja: "境界データのみ" }
    ],
    answer: 2,
    exp: { vi: "Use case testing kiểm tra các kịch bản người dùng thực tế theo luồng chính và thay thế.", en: "Use case testing exercises realistic user scenarios via main and alternative flows.", ja: "ユースケーステストは基本フローと代替フローで現実的な利用シナリオを検証します。" }
  },
  {
    q: { vi: "Equivalence partitioning (phân vùng tương đương) dựa trên giả định nào?", en: "What assumption underlies equivalence partitioning?", ja: "同値分割はどの前提に基づいていますか？" },
    options: [
      { vi: "Mọi giá trị đầu vào đều gây lỗi", en: "Every input value causes a defect", ja: "すべての入力値が欠陥を引き起こす" },
      { vi: "Chỉ giá trị biên là quan trọng", en: "Only boundary values matter", ja: "境界値のみが重要である" },
      { vi: "Không cần chọn đại diện", en: "No representative needs to be chosen", ja: "代表値を選ぶ必要はない" },
      { vi: "Các giá trị trong cùng một phân vùng được hệ thống xử lý giống nhau", en: "Values in the same partition are processed the same way by the system", ja: "同じ区画内の値はシステムで同じように処理される" }
    ],
    answer: 3,
    exp: { vi: "Chọn một đại diện cho mỗi phân vùng vì chúng được xử lý tương đương.", en: "One representative per partition suffices because they are treated equivalently.", ja: "各区画は同等に扱われるため、代表を1つ選べば十分です。" }
  },
  {
    q: { vi: "Boundary value analysis 3 điểm cho biên xét những giá trị nào?", en: "Which values does 3-point boundary value analysis consider for a boundary?", ja: "3点境界値分析は境界に対しどの値を考慮しますか？" },
    options: [
      { vi: "Giá trị ngay trước biên, tại biên và ngay sau biên", en: "The value just below, at, and just above the boundary", ja: "境界の直前・境界上・直後の値" },
      { vi: "Chỉ giá trị tại biên", en: "Only the value at the boundary", ja: "境界上の値のみ" },
      { vi: "Chỉ giá trị trung tâm vùng", en: "Only the mid-range value", ja: "範囲の中央値のみ" },
      { vi: "Tất cả giá trị trong vùng", en: "Every value in the range", ja: "範囲内のすべての値" }
    ],
    answer: 0,
    exp: { vi: "BVA 3 điểm bắt lỗi lệch một đơn vị (off-by-one) ở cả hai phía biên.", en: "3-point BVA catches off-by-one errors on both sides of the boundary.", ja: "3点BVAは境界の両側でオフバイワンエラーを検出します。" }
  },
  {
    q: { vi: "Kỹ thuật dựa trên kinh nghiệm nào phù hợp khi đặc tả thiếu hoặc thời gian eo hẹp?", en: "Which experience-based technique suits missing specs or limited time?", ja: "仕様が不足している、または時間が限られる場合に適した経験ベース技法はどれですか？" },
    options: [
      { vi: "MC/DC coverage", en: "MC/DC coverage", ja: "MC/DCカバレッジ" },
      { vi: "Exploratory testing (kiểm thử khám phá)", en: "Exploratory testing", ja: "探索的テスト" },
      { vi: "Bảng quyết định đầy đủ", en: "A full decision table", ja: "完全な決定表" },
      { vi: "Data flow testing", en: "Data flow testing", ja: "データフローテスト" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử khám phá kết hợp thiết kế, thực thi và học hỏi đồng thời.", en: "Exploratory testing combines simultaneous test design, execution and learning.", ja: "探索的テストはテスト設計・実行・学習を同時に行います。" }
  },
  {
    q: { vi: "Checklist-based testing khác exploratory testing chủ yếu ở điểm nào?", en: "How does checklist-based testing mainly differ from exploratory testing?", ja: "チェックリストベーステストは探索的テストと主にどう異なりますか？" },
    options: [
      { vi: "Không cần bất kỳ kiến thức nào", en: "It requires no knowledge at all", ja: "いかなる知識も必要としない" },
      { vi: "Luôn tự động hoàn toàn", en: "It is always fully automated", ja: "常に完全に自動化されている" },
      { vi: "Dựa trên danh sách các mục cần kiểm tra đã chuẩn bị trước", en: "It relies on a pre-prepared list of items to check", ja: "事前に準備した確認項目のリストに基づく" },
      { vi: "Bỏ qua mọi rủi ro", en: "It ignores all risks", ja: "すべてのリスクを無視する" }
    ],
    answer: 2,
    exp: { vi: "Checklist cung cấp hướng dẫn có cấu trúc từ kinh nghiệm và tiêu chuẩn.", en: "A checklist provides structured guidance from experience and standards.", ja: "チェックリストは経験や標準から構造化された指針を提供します。" }
  },
  {
    q: { vi: "Error guessing dựa trên yếu tố nào của người kiểm thử?", en: "What tester factor does error guessing rely on?", ja: "エラー推測はテスターのどの要素に依存しますか？" },
    options: [
      { vi: "Số lượng ca test tự động", en: "The number of automated tests", ja: "自動化テストの数" },
      { vi: "Độ phủ MC/DC", en: "MC/DC coverage", ja: "MC/DCカバレッジ" },
      { vi: "Kích thước tài liệu yêu cầu", en: "The size of the requirements document", ja: "要件文書の大きさ" },
      { vi: "Kinh nghiệm về các lỗi thường gặp và điểm yếu của hệ thống", en: "Experience of common defects and system weaknesses", ja: "よくある欠陥やシステムの弱点に関する経験" }
    ],
    answer: 3,
    exp: { vi: "Người kiểm thử đoán các vùng dễ lỗi dựa trên kinh nghiệm và fault attack.", en: "The tester anticipates fault-prone areas based on experience and fault attacks.", ja: "テスターは経験とフォールトアタックに基づき障害が起きやすい領域を予測します。" }
  },
  {
    q: { vi: "Trong classification tree, một 'test case' hợp lệ tương ứng với điều gì?", en: "In a classification tree, a valid 'test case' corresponds to what?", ja: "分類木において有効な「テストケース」は何に対応しますか？" },
    options: [
      { vi: "Một tổ hợp gồm đúng một lớp từ mỗi phân loại liên quan", en: "A combination of exactly one class from each relevant classification", ja: "関連する各分類からちょうど1つのクラスを取る組み合わせ" },
      { vi: "Toàn bộ các lớp cùng lúc", en: "All classes simultaneously", ja: "すべてのクラスを同時に" },
      { vi: "Chỉ một phân loại duy nhất", en: "A single classification only", ja: "単一の分類のみ" },
      { vi: "Bất kỳ tập lớp ngẫu nhiên nào", en: "Any random set of classes", ja: "任意のランダムなクラスの集合" }
    ],
    answer: 0,
    exp: { vi: "Mỗi ca test chọn một lớp trên mỗi nhánh phân loại của cây.", en: "Each test selects one class per classification branch of the tree.", ja: "各テストは木の各分類枝から1つのクラスを選びます。" }
  },
  {
    q: { vi: "Ưu điểm chính của pairwise so với kiểm thử tổ hợp đầy đủ là gì?", en: "What is the main advantage of pairwise over exhaustive combinatorial testing?", ja: "全組み合わせテストに対するペアワイズの主な利点は何ですか？" },
    options: [
      { vi: "Đảm bảo tìm 100% mọi lỗi", en: "Guarantees finding 100% of all defects", ja: "すべての欠陥を100%検出することを保証する" },
      { vi: "Giảm mạnh số ca test trong khi vẫn tìm được phần lớn lỗi tương tác cặp", en: "Drastically fewer tests while still finding most pairwise interaction defects", ja: "テスト数を大幅に減らしつつ、ほとんどのペア相互作用欠陥を検出できる" },
      { vi: "Không cần xác định giá trị tham số", en: "Requires no parameter values", ja: "パラメータ値を特定する必要がない" },
      { vi: "Chỉ dùng cho một tham số", en: "Only works for one parameter", ja: "1つのパラメータにのみ有効" }
    ],
    answer: 1,
    exp: { vi: "Nhiều lỗi do tương tác của hai tham số; pairwise phủ hết cặp với chi phí thấp.", en: "Many defects stem from two-parameter interactions; pairwise covers all pairs cheaply.", ja: "多くの欠陥は2パラメータの相互作用に起因し、ペアワイズは低コストで全ペアを網羅します。" }
  },
  {
    q: { vi: "Khi dùng đồ thị nhân-quả, bước tạo ca test cuối cùng thường là gì?", en: "When using cause-effect graphing, what is usually the final step to derive tests?", ja: "原因結果グラフ法を用いる際、テスト導出の最終ステップは通常何ですか？" },
    options: [
      { vi: "Đo độ phủ path của mã", en: "Measure code path coverage", ja: "コードのパスカバレッジを測定する" },
      { vi: "Chạy kiểm thử tải", en: "Run a load test", ja: "負荷テストを実行する" },
      { vi: "Chuyển đồ thị thành bảng quyết định rồi sinh ca test từ mỗi quy tắc", en: "Convert the graph to a decision table and derive tests from each rule", ja: "グラフを決定表に変換し、各ルールからテストを導出する" },
      { vi: "Bỏ qua các ràng buộc logic", en: "Ignore logical constraints", ja: "論理制約を無視する" }
    ],
    answer: 2,
    exp: { vi: "Mỗi cột (quy tắc) của bảng quyết định trở thành một ca test.", en: "Each column (rule) of the decision table becomes a test case.", ja: "決定表の各列（ルール）が1つのテストケースになります。" }
  },
  {
    q: { vi: "State transition testing hữu ích nhất cho loại hệ thống nào?", en: "For which kind of system is state transition testing most useful?", ja: "状態遷移テストが最も有用なのはどのようなシステムですか？" },
    options: [
      { vi: "Hệ thống hoàn toàn không có trạng thái", en: "Completely stateless systems", ja: "完全にステートレスなシステム" },
      { vi: "Chỉ hệ thống tính toán số học thuần", en: "Only pure arithmetic systems", ja: "純粋な算術システムのみ" },
      { vi: "Hệ thống không có sự kiện đầu vào", en: "Systems with no input events", ja: "入力イベントのないシステム" },
      { vi: "Hệ thống mà đầu ra phụ thuộc vào lịch sử trạng thái hiện tại", en: "Systems whose output depends on the current state history", ja: "出力が現在の状態履歴に依存するシステム" }
    ],
    answer: 3,
    exp: { vi: "Các hệ thống có trạng thái (workflow, giao thức) phù hợp với kỹ thuật này.", en: "Stateful systems (workflows, protocols) fit this technique well.", ja: "状態を持つシステム（ワークフロー、プロトコル）にこの技法が適します。" }
  },
  {
    q: { vi: "Statement coverage 100% có đảm bảo decision coverage 100% không?", en: "Does 100% statement coverage guarantee 100% decision coverage?", ja: "命令網羅100%は分岐網羅100%を保証しますか？" },
    options: [
      { vi: "Không; decision coverage mạnh hơn và bao hàm statement coverage", en: "No; decision coverage is stronger and subsumes statement coverage", ja: "いいえ。分岐網羅の方が強く、命令網羅を包含する" },
      { vi: "Có, luôn tương đương", en: "Yes, they are always equivalent", ja: "はい、常に同等である" },
      { vi: "Có, nhưng chỉ với vòng lặp", en: "Yes, but only for loops", ja: "はい、ただしループの場合のみ" },
      { vi: "Không liên quan gì đến nhau", en: "They are entirely unrelated", ja: "両者は全く無関係である" }
    ],
    answer: 0,
    exp: { vi: "Decision coverage bao hàm statement coverage nhưng không ngược lại.", en: "Decision coverage subsumes statement coverage but not vice versa.", ja: "分岐網羅は命令網羅を包含しますが、その逆は成り立ちません。" }
  },
  {
    q: { vi: "Condition coverage yêu cầu điều gì?", en: "What does condition coverage require?", ja: "条件網羅は何を要求しますか？" },
    options: [
      { vi: "Mỗi câu lệnh chạy ít nhất một lần", en: "Each statement runs at least once", ja: "各命令が少なくとも一度実行されること" },
      { vi: "Mỗi điều kiện con (atomic) phải nhận cả giá trị true và false", en: "Each atomic condition must take both true and false", ja: "各アトミック条件がtrueとfalseの両方を取ること" },
      { vi: "Mỗi hàm được gọi một lần", en: "Each function is called once", ja: "各関数が一度呼ばれること" },
      { vi: "Mỗi vòng lặp chạy 0 lần", en: "Each loop runs zero times", ja: "各ループが0回実行されること" }
    ],
    answer: 1,
    exp: { vi: "Condition coverage tác động từng điều kiện con true/false độc lập.", en: "Condition coverage exercises each atomic condition true and false independently.", ja: "条件網羅は各アトミック条件を独立にtrue/falseにします。" }
  },
  {
    q: { vi: "Decision/condition coverage kết hợp những gì?", en: "What does decision/condition coverage combine?", ja: "分岐条件網羅は何を組み合わせますか？" },
    options: [
      { vi: "Chỉ statement và path coverage", en: "Only statement and path coverage", ja: "命令網羅とパス網羅のみ" },
      { vi: "Chỉ path coverage", en: "Path coverage only", ja: "パス網羅のみ" },
      { vi: "Cả decision coverage lẫn condition coverage cùng lúc", en: "Both decision coverage and condition coverage together", ja: "分岐網羅と条件網羅の両方を同時に満たす" },
      { vi: "Không kết hợp gì", en: "Nothing is combined", ja: "何も組み合わせない" }
    ],
    answer: 2,
    exp: { vi: "Vừa mỗi quyết định true/false, vừa mỗi điều kiện con true/false.", en: "Each decision takes true/false and each atomic condition takes true/false.", ja: "各分岐がtrue/false、かつ各アトミック条件がtrue/falseを取ります。" }
  },
  {
    q: { vi: "MC/DC (Modified Condition/Decision Coverage) yêu cầu chứng minh điều gì?", en: "What must MC/DC (Modified Condition/Decision Coverage) demonstrate?", ja: "MC/DC（改良条件分岐網羅）は何を示す必要がありますか？" },
    options: [
      { vi: "Mọi tổ hợp điều kiện đều được thử", en: "Every combination of conditions is tried", ja: "条件のすべての組み合わせを試すこと" },
      { vi: "Chỉ cần độ phủ câu lệnh", en: "Only statement coverage is needed", ja: "命令網羅だけで十分であること" },
      { vi: "Chỉ quyết định ngoài cùng true/false", en: "Only the outermost decision is true/false", ja: "最も外側の分岐のみtrue/false" },
      { vi: "Mỗi điều kiện con độc lập tác động lên kết quả của quyết định", en: "Each condition independently affects the decision outcome", ja: "各条件が独立して分岐の結果に影響を与えること" }
    ],
    answer: 3,
    exp: { vi: "MC/DC cần cho mỗi điều kiện con một cặp test chứng minh ảnh hưởng độc lập.", en: "MC/DC needs, per condition, a test pair showing its independent effect.", ja: "MC/DCは各条件について独立した影響を示すテストのペアを必要とします。" }
  },
  {
    q: { vi: "Với biểu thức có N điều kiện con, MC/DC thường cần tối thiểu bao nhiêu ca test?", en: "For an expression with N atomic conditions, how many tests does MC/DC typically require at minimum?", ja: "N個のアトミック条件を持つ式に対し、MC/DCは通常最低いくつのテストを必要としますか？" },
    options: [
      { vi: "Khoảng N+1", en: "About N+1", ja: "約N+1" },
      { vi: "2 mũ N", en: "2 to the power of N", ja: "2のN乗" },
      { vi: "Đúng N/2", en: "Exactly N/2", ja: "ちょうどN/2" },
      { vi: "Luôn đúng 2", en: "Always exactly 2", ja: "常にちょうど2" }
    ],
    answer: 0,
    exp: { vi: "MC/DC thường đạt được với khoảng N+1 ca test, ít hơn 2^N của multiple condition.", en: "MC/DC is usually achievable with about N+1 tests, far fewer than 2^N of multiple condition.", ja: "MC/DCは通常約N+1テストで達成でき、複数条件網羅の2^Nよりはるかに少ないです。" }
  },
  {
    q: { vi: "Multiple condition coverage yêu cầu gì?", en: "What does multiple condition coverage require?", ja: "複数条件網羅は何を要求しますか？" },
    options: [
      { vi: "Chỉ mỗi điều kiện con true một lần", en: "Each atomic condition true just once", ja: "各アトミック条件を一度trueにするだけ" },
      { vi: "Mọi tổ hợp có thể của các điều kiện con trong một quyết định", en: "Every possible combination of atomic conditions in a decision", ja: "分岐内のアトミック条件のあらゆる可能な組み合わせ" },
      { vi: "Chỉ đường đi ngắn nhất", en: "Only the shortest path", ja: "最短パスのみ" },
      { vi: "Chỉ mỗi câu lệnh một lần", en: "Only each statement once", ja: "各命令を一度だけ" }
    ],
    answer: 1,
    exp: { vi: "Cần 2^N tổ hợp nên tốn kém; MC/DC là phương án tối ưu thực dụng.", en: "It needs 2^N combinations, so it is costly; MC/DC is the pragmatic optimization.", ja: "2^Nの組み合わせが必要で高コストのため、MC/DCが実用的な最適化となります。" }
  },
  {
    q: { vi: "Path coverage khó đạt 100% chủ yếu vì lý do gì?", en: "Why is 100% path coverage usually infeasible?", ja: "パス網羅100%が通常実現困難なのはなぜですか？" },
    options: [
      { vi: "Vì mã không có nhánh", en: "Because code has no branches", ja: "コードに分岐がないため" },
      { vi: "Vì không có công cụ đo", en: "Because no measurement tools exist", ja: "測定ツールが存在しないため" },
      { vi: "Vòng lặp làm số đường đi tăng vô hạn hoặc rất lớn", en: "Loops make the number of paths infinite or explode", ja: "ループによりパス数が無限または爆発的に増大する" },
      { vi: "Vì statement coverage đã đủ", en: "Because statement coverage already suffices", ja: "命令網羅で既に十分なため" }
    ],
    answer: 2,
    exp: { vi: "Với vòng lặp, tổng số đường đi có thể vô hạn; thực tế dùng phủ đường đi giới hạn.", en: "With loops, the total number of paths can be infinite; in practice bounded path coverage is used.", ja: "ループがあるとパス総数は無限になり得るため、実際には制限付きパス網羅を用います。" }
  },
  {
    q: { vi: "Data flow testing tập trung vào cặp nào?", en: "What pair does data flow testing focus on?", ja: "データフローテストはどのペアに焦点を当てますか？" },
    options: [
      { vi: "Cặp hàm gọi nhau", en: "Pairs of calling functions", ja: "互いに呼び出す関数のペア" },
      { vi: "Cặp biên trên và biên dưới", en: "Upper and lower boundary pairs", ja: "上限と下限のペア" },
      { vi: "Cặp lớp tương đương", en: "Pairs of equivalence classes", ja: "同値クラスのペア" },
      { vi: "Cặp định nghĩa (definition) và sử dụng (use) của một biến", en: "The definition and use of a variable (def-use pairs)", ja: "変数の定義（definition）と使用（use）のペア" }
    ],
    answer: 3,
    exp: { vi: "Data flow theo dấu đường đi từ nơi gán giá trị (def) tới nơi dùng (use).", en: "Data flow traces paths from where a value is assigned (def) to where it is used (use).", ja: "データフローは値が代入される箇所（def）から使用される箇所（use）へのパスを追跡します。" }
  },
  {
    q: { vi: "Trong data flow, một 'du-path' bất thường là gì?", en: "In data flow, what is an anomalous 'du-path'?", ja: "データフローにおける異常な「du-path」とは何ですか？" },
    options: [
      { vi: "Biến được dùng trước khi định nghĩa, hoặc định nghĩa rồi không dùng", en: "A variable used before definition, or defined but never used", ja: "定義前に使用される、または定義後に使用されない変数" },
      { vi: "Biến được gán đúng một lần", en: "A variable assigned exactly once", ja: "ちょうど一度代入される変数" },
      { vi: "Một vòng lặp chạy đủ số lần", en: "A loop running the correct number of times", ja: "正しい回数だけ実行されるループ" },
      { vi: "Một hàm được kiểm thử đầy đủ", en: "A fully tested function", ja: "完全にテストされた関数" }
    ],
    answer: 0,
    exp: { vi: "Các bất thường điển hình: du (dùng chưa gán), dd (gán liên tiếp), dk (gán rồi huỷ).", en: "Typical anomalies: use-before-define, redefinition without use, define-then-kill.", ja: "典型的異常: 未定義使用、未使用の再定義、定義後の破棄。" }
  },
  {
    q: { vi: "'All-defs' coverage trong data flow testing yêu cầu gì?", en: "What does 'all-defs' coverage require in data flow testing?", ja: "データフローテストの「all-defs」網羅は何を要求しますか？" },
    options: [
      { vi: "Mọi đường đi trong mã đều được chạy", en: "Every path in the code is executed", ja: "コード内のすべてのパスを実行する" },
      { vi: "Với mỗi định nghĩa, ít nhất một đường def-use không bị định nghĩa lại được thực thi", en: "For each definition, at least one def-clear path to some use is exercised", ja: "各定義について、少なくとも1つの使用への定義破棄なしパスを実行する" },
      { vi: "Mọi câu lệnh gán được xoá", en: "Every assignment statement is deleted", ja: "すべての代入文を削除する" },
      { vi: "Không cần chạy use nào", en: "No use needs to be reached", ja: "いかなる使用にも到達する必要がない" }
    ],
    answer: 1,
    exp: { vi: "All-defs chỉ yêu cầu mỗi def đến được ít nhất một use; all-uses mạnh hơn.", en: "All-defs only requires each def to reach some use; all-uses is stronger.", ja: "all-defsは各定義が何らかの使用に到達すればよく、all-usesはより強力です。" }
  },
  {
    q: { vi: "Vì sao MC/DC được yêu cầu trong tiêu chuẩn an toàn hàng không (DO-178C mức A)?", en: "Why is MC/DC required in aviation safety standards (DO-178C level A)?", ja: "航空安全規格（DO-178CレベルA）でMC/DCが要求されるのはなぜですか？" },
    options: [
      { vi: "Vì nó rẻ hơn statement coverage", en: "Because it is cheaper than statement coverage", ja: "命令網羅より安価だから" },
      { vi: "Vì nó bỏ qua điều kiện logic", en: "Because it ignores logical conditions", ja: "論理条件を無視するから" },
      { vi: "Cân bằng giữa độ nghiêm ngặt cao và số ca test khả thi cho phần mềm nguy hiểm tính mạng", en: "It balances high rigour with a feasible test count for safety-critical software", ja: "生命に関わるソフトウェアで高い厳密さと実行可能なテスト数を両立するため" },
      { vi: "Vì nó không cần công cụ", en: "Because it needs no tooling", ja: "ツールを必要としないから" }
    ],
    answer: 2,
    exp: { vi: "MC/DC chặt hơn decision coverage nhưng khả thi hơn multiple condition (2^N).", en: "MC/DC is stricter than decision coverage yet more feasible than multiple condition (2^N).", ja: "MC/DCは分岐網羅より厳密で、複数条件網羅（2^N）より実行可能です。" }
  },
  {
    q: { vi: "Cyclomatic complexity liên quan đến độ phủ nào?", en: "Cyclomatic complexity relates to which coverage?", ja: "循環的複雑度はどのカバレッジに関連しますか？" },
    options: [
      { vi: "Số dòng bình luận trong mã", en: "The number of comment lines in code", ja: "コード内のコメント行数" },
      { vi: "Số biến toàn cục", en: "The number of global variables", ja: "グローバル変数の数" },
      { vi: "Số ca kiểm thử tự động", en: "The number of automated tests", ja: "自動化テストの数" },
      { vi: "Số đường đi độc lập cần cho basis path testing", en: "The number of independent paths for basis path testing", ja: "基本パステストに必要な独立パスの数" }
    ],
    answer: 3,
    exp: { vi: "Cyclomatic complexity cho cận trên số đường đi độc lập tuyến tính cần bao phủ.", en: "Cyclomatic complexity gives an upper bound on the linearly independent paths to cover.", ja: "循環的複雑度は網羅すべき線形独立パス数の上限を与えます。" }
  },
  {
    q: { vi: "Trong ISO/IEC 25010, 'reliability' (độ tin cậy) KHÔNG bao gồm đặc tính con nào sau đây?", en: "In ISO/IEC 25010, which sub-characteristic is NOT part of 'reliability'?", ja: "ISO/IEC 25010において、「信頼性」に含まれないサブ特性はどれですか？" },
    options: [
      { vi: "Time behaviour (hành vi thời gian)", en: "Time behaviour", ja: "時間効率性" },
      { vi: "Maturity (độ trưởng thành)", en: "Maturity", ja: "成熟性" },
      { vi: "Fault tolerance (chịu lỗi)", en: "Fault tolerance", ja: "障害許容性" },
      { vi: "Recoverability (khả năng phục hồi)", en: "Recoverability", ja: "回復性" }
    ],
    answer: 0,
    exp: { vi: "Time behaviour thuộc performance efficiency, không thuộc reliability.", en: "Time behaviour belongs to performance efficiency, not reliability.", ja: "時間効率性は性能効率性に属し、信頼性ではありません。" }
  },
  {
    q: { vi: "Load testing đo lường điều gì?", en: "What does load testing measure?", ja: "負荷テストは何を測定しますか？" },
    options: [
      { vi: "Hành vi vượt xa giới hạn thiết kế để tìm điểm gãy", en: "Behaviour far beyond design limits to find the breaking point", ja: "設計限界を大きく超えた破綻点を探る動作" },
      { vi: "Hành vi hệ thống dưới mức tải dự kiến (thực tế)", en: "System behaviour under expected (realistic) load", ja: "予想される（現実的な）負荷下でのシステム動作" },
      { vi: "Mức độ dễ đọc của mã nguồn", en: "The readability of source code", ja: "ソースコードの可読性" },
      { vi: "Độ phủ nhánh của test", en: "Branch coverage of tests", ja: "テストの分岐網羅" }
    ],
    answer: 1,
    exp: { vi: "Load testing dùng khối lượng công việc kỳ vọng; stress testing vượt giới hạn.", en: "Load testing uses expected workloads; stress testing goes beyond limits.", ja: "負荷テストは予想されるワークロードを用い、ストレステストは限界を超えます。" }
  },
  {
    q: { vi: "Stress testing tập trung vào điều gì?", en: "What does stress testing focus on?", ja: "ストレステストは何に焦点を当てますか？" },
    options: [
      { vi: "Độ dễ bảo trì của mã", en: "Code maintainability", ja: "コードの保守性" },
      { vi: "Tính đúng đắn của tính toán", en: "Correctness of calculations", ja: "計算の正しさ" },
      { vi: "Hành vi khi vượt quá tải/giới hạn tài nguyên và cách hệ thống suy giảm/phục hồi", en: "Behaviour beyond capacity/resource limits and how the system degrades/recovers", ja: "容量・リソース限界超過時の動作と、システムの劣化・回復の仕方" },
      { vi: "Bố cục giao diện", en: "UI layout", ja: "UIレイアウト" }
    ],
    answer: 2,
    exp: { vi: "Stress testing đẩy hệ thống quá giới hạn để quan sát suy giảm nhẹ nhàng và phục hồi.", en: "Stress testing pushes past limits to observe graceful degradation and recovery.", ja: "ストレステストは限界を超えて優雅な劣化と回復を観察します。" }
  },
  {
    q: { vi: "Soak testing (endurance) nhằm phát hiện vấn đề gì?", en: "What problem does soak (endurance) testing aim to detect?", ja: "耐久テスト（ソークテスト）はどのような問題の検出を目的としますか？" },
    options: [
      { vi: "Lỗi cú pháp trong mã", en: "Syntax errors in code", ja: "コード内の構文エラー" },
      { vi: "Sai bố cục màn hình", en: "Incorrect screen layout", ja: "画面レイアウトの誤り" },
      { vi: "Thiếu bình luận trong mã", en: "Missing code comments", ja: "コードコメントの欠如" },
      { vi: "Rò rỉ bộ nhớ và suy giảm hiệu năng theo thời gian chạy dài", en: "Memory leaks and performance degradation over long run time", ja: "長時間稼働によるメモリリークや性能劣化" }
    ],
    answer: 3,
    exp: { vi: "Soak test chạy tải bền trong thời gian dài để lộ rò rỉ tài nguyên.", en: "Soak testing applies sustained load over long periods to expose resource leaks.", ja: "ソークテストは長時間持続的な負荷をかけ、リソースリークを明らかにします。" }
  },
  {
    q: { vi: "Spike testing kiểm tra điều gì?", en: "What does spike testing check?", ja: "スパイクテストは何を検証しますか？" },
    options: [
      { vi: "Phản ứng của hệ thống với tăng/giảm tải đột ngột và lớn", en: "System reaction to sudden, large increases/decreases in load", ja: "急激で大きな負荷の増減に対するシステムの反応" },
      { vi: "Tính bảo mật của mật khẩu", en: "Password security", ja: "パスワードのセキュリティ" },
      { vi: "Độ dễ học của giao diện", en: "Learnability of the UI", ja: "UIの習得性" },
      { vi: "Độ phủ câu lệnh", en: "Statement coverage", ja: "命令網羅" }
    ],
    answer: 0,
    exp: { vi: "Spike test kiểm tra khả năng co giãn khi tải thay đổi đột ngột.", en: "Spike testing checks elasticity under abrupt load changes.", ja: "スパイクテストは急激な負荷変動時の伸縮性を検証します。" }
  },
  {
    q: { vi: "Trong kiểm thử bảo mật, 'penetration testing' nhằm mục đích gì?", en: "In security testing, what is the goal of penetration testing?", ja: "セキュリティテストにおいて、ペネトレーションテストの目的は何ですか？" },
    options: [
      { vi: "Đo thời gian phản hồi trung bình", en: "Measure average response time", ja: "平均応答時間を測定する" },
      { vi: "Chủ động khai thác lỗ hổng như kẻ tấn công để đánh giá rủi ro thực tế", en: "Actively exploit vulnerabilities like an attacker to assess real risk", ja: "攻撃者のように脆弱性を能動的に悪用し、実際のリスクを評価する" },
      { vi: "Kiểm tra chính tả tài liệu", en: "Check spelling in documentation", ja: "文書のスペルを確認する" },
      { vi: "Tối ưu độ phủ nhánh", en: "Optimize branch coverage", ja: "分岐網羅を最適化する" }
    ],
    answer: 1,
    exp: { vi: "Pen test mô phỏng tấn công thực để tìm và khai thác lỗ hổng bảo mật.", en: "Pen testing simulates real attacks to find and exploit security weaknesses.", ja: "ペンテストは実際の攻撃を模倣して脆弱性を発見・悪用します。" }
  },
  {
    q: { vi: "Đặc tính 'security' trong ISO/IEC 25010 bao gồm đặc tính con nào?", en: "Which sub-characteristic belongs to 'security' in ISO/IEC 25010?", ja: "ISO/IEC 25010の「セキュリティ」に属するサブ特性はどれですか？" },
    options: [
      { vi: "Learnability (dễ học)", en: "Learnability", ja: "習得性" },
      { vi: "Modularity (mô-đun hoá)", en: "Modularity", ja: "モジュール性" },
      { vi: "Confidentiality (bí mật)", en: "Confidentiality", ja: "機密性" },
      { vi: "Time behaviour (hành vi thời gian)", en: "Time behaviour", ja: "時間効率性" }
    ],
    answer: 2,
    exp: { vi: "Security gồm confidentiality, integrity, non-repudiation, accountability, authenticity.", en: "Security comprises confidentiality, integrity, non-repudiation, accountability, authenticity.", ja: "セキュリティは機密性・完全性・否認防止性・責任追跡性・真正性を含みます。" }
  },
  {
    q: { vi: "Usability testing đánh giá chủ yếu điều gì?", en: "What does usability testing mainly evaluate?", ja: "ユーザビリティテストは主に何を評価しますか？" },
    options: [
      { vi: "Số dòng mã nguồn", en: "The number of lines of code", ja: "ソースコードの行数" },
      { vi: "Độ phủ MC/DC", en: "MC/DC coverage", ja: "MC/DCカバレッジ" },
      { vi: "Tốc độ mạng nội bộ", en: "Internal network speed", ja: "内部ネットワーク速度" },
      { vi: "Mức độ hiệu quả, hiệu suất và hài lòng của người dùng khi hoàn thành tác vụ", en: "How effectively, efficiently and satisfyingly users complete tasks", ja: "ユーザーがタスクをどれだけ効果的・効率的・満足に完了できるか" }
    ],
    answer: 3,
    exp: { vi: "Usability đo effectiveness, efficiency và satisfaction của người dùng thực.", en: "Usability measures effectiveness, efficiency and satisfaction for real users.", ja: "ユーザビリティは実ユーザーの有効性・効率性・満足度を測定します。" }
  },
  {
    q: { vi: "Accessibility testing (khả năng tiếp cận) thường dựa trên tiêu chuẩn nào?", en: "Accessibility testing typically relies on which standard?", ja: "アクセシビリティテストは通常どの標準に基づきますか？" },
    options: [
      { vi: "WCAG (Web Content Accessibility Guidelines)", en: "WCAG (Web Content Accessibility Guidelines)", ja: "WCAG（ウェブコンテンツアクセシビリティガイドライン）" },
      { vi: "ISO 9001 quản lý chất lượng", en: "ISO 9001 quality management", ja: "ISO 9001品質マネジメント" },
      { vi: "IEEE 829 riêng lẻ", en: "IEEE 829 alone", ja: "IEEE 829単独" },
      { vi: "SQL-92", en: "SQL-92", ja: "SQL-92" }
    ],
    answer: 0,
    exp: { vi: "WCAG cung cấp tiêu chí A/AA/AAA cho khả năng tiếp cận, thuộc usability.", en: "WCAG provides A/AA/AAA criteria for accessibility, part of usability.", ja: "WCAGはアクセシビリティのA/AA/AAA基準を提供し、ユーザビリティの一部です。" }
  },
  {
    q: { vi: "'Maintainability' trong ISO/IEC 25010 gồm đặc tính con nào?", en: "Which sub-characteristic belongs to 'maintainability' in ISO/IEC 25010?", ja: "ISO/IEC 25010の「保守性」に属するサブ特性はどれですか？" },
    options: [
      { vi: "Fault tolerance (chịu lỗi)", en: "Fault tolerance", ja: "障害許容性" },
      { vi: "Testability (khả năng kiểm thử)", en: "Testability", ja: "テスト容易性" },
      { vi: "Capacity (dung lượng)", en: "Capacity", ja: "容量" },
      { vi: "Confidentiality (bí mật)", en: "Confidentiality", ja: "機密性" }
    ],
    answer: 1,
    exp: { vi: "Maintainability gồm modularity, reusability, analysability, modifiability, testability.", en: "Maintainability includes modularity, reusability, analysability, modifiability, testability.", ja: "保守性はモジュール性・再利用性・解析性・修正性・テスト容易性を含みます。" }
  },
  {
    q: { vi: "Portability testing đánh giá điều gì?", en: "What does portability testing evaluate?", ja: "移植性テストは何を評価しますか？" },
    options: [
      { vi: "Tốc độ xử lý giao dịch", en: "Transaction processing speed", ja: "トランザクション処理速度" },
      { vi: "Số lượng người dùng đồng thời", en: "The number of concurrent users", ja: "同時ユーザー数" },
      { vi: "Mức độ dễ chuyển phần mềm sang môi trường phần cứng/phần mềm khác", en: "How easily software can be transferred to another hardware/software environment", ja: "ソフトウェアを別のハードウェア/ソフトウェア環境へ移す容易さ" },
      { vi: "Chất lượng tài liệu yêu cầu", en: "Requirements document quality", ja: "要件文書の品質" }
    ],
    answer: 2,
    exp: { vi: "Portability gồm adaptability, installability, replaceability.", en: "Portability comprises adaptability, installability, replaceability.", ja: "移植性は適応性・設置性・置換性を含みます。" }
  },
  {
    q: { vi: "'Compatibility' trong ISO/IEC 25010 bao gồm đặc tính con nào?", en: "Which sub-characteristic belongs to 'compatibility' in ISO/IEC 25010?", ja: "ISO/IEC 25010の「互換性」に属するサブ特性はどれですか？" },
    options: [
      { vi: "Recoverability (khả năng phục hồi)", en: "Recoverability", ja: "回復性" },
      { vi: "Learnability (dễ học)", en: "Learnability", ja: "習得性" },
      { vi: "Time behaviour (hành vi thời gian)", en: "Time behaviour", ja: "時間効率性" },
      { vi: "Interoperability (khả năng liên tác)", en: "Interoperability", ja: "相互運用性" }
    ],
    answer: 3,
    exp: { vi: "Compatibility gồm co-existence và interoperability.", en: "Compatibility comprises co-existence and interoperability.", ja: "互換性は共存性と相互運用性を含みます。" }
  },
  {
    q: { vi: "Reliability growth model (mô hình tăng trưởng độ tin cậy) dùng để làm gì?", en: "What is a reliability growth model used for?", ja: "信頼度成長モデルは何のために使われますか？" },
    options: [
      { vi: "Dự báo mức độ tin cậy tương lai dựa trên xu hướng lỗi được phát hiện và sửa", en: "Predict future reliability from the trend of found and fixed defects", ja: "検出・修正された欠陥の傾向から将来の信頼性を予測する" },
      { vi: "Đo độ phủ điều kiện", en: "Measure condition coverage", ja: "条件網羅を測定する" },
      { vi: "Tối ưu bố cục giao diện", en: "Optimize UI layout", ja: "UIレイアウトを最適化する" },
      { vi: "Lập lịch phỏng vấn người dùng", en: "Schedule user interviews", ja: "ユーザーインタビューを計画する" }
    ],
    answer: 0,
    exp: { vi: "Mô hình dùng dữ liệu lỗi theo thời gian để ước lượng MTBF/độ tin cậy còn lại.", en: "The model uses defect data over time to estimate MTBF/remaining reliability.", ja: "モデルは時間経過の欠陥データからMTBFや残存信頼性を推定します。" }
  },
  {
    q: { vi: "Đặc tính chất lượng nào phù hợp nhất để đánh giá bằng SQL injection test?", en: "Which quality characteristic is best assessed by an SQL injection test?", ja: "SQLインジェクションテストで最もよく評価される品質特性はどれですか？" },
    options: [
      { vi: "Usability (khả dụng)", en: "Usability", ja: "ユーザビリティ" },
      { vi: "Security (bảo mật)", en: "Security", ja: "セキュリティ" },
      { vi: "Performance efficiency (hiệu năng)", en: "Performance efficiency", ja: "性能効率性" },
      { vi: "Portability (khả chuyển)", en: "Portability", ja: "移植性" }
    ],
    answer: 1,
    exp: { vi: "SQL injection tấn công tính toàn vẹn/bí mật dữ liệu — thuộc security.", en: "SQL injection attacks data integrity/confidentiality — part of security.", ja: "SQLインジェクションはデータの完全性・機密性を攻撃し、セキュリティに属します。" }
  },
  {
    q: { vi: "Operational profile (hồ sơ vận hành) hỗ trợ kiểm thử phi chức năng nào nhất?", en: "An operational profile most supports which non-functional testing?", ja: "運用プロファイルはどの非機能テストを最も支援しますか？" },
    options: [
      { vi: "Kiểm thử chính tả tài liệu", en: "Documentation spell-checking", ja: "文書のスペルチェック" },
      { vi: "Độ phủ MC/DC", en: "MC/DC coverage", ja: "MC/DCカバレッジ" },
      { vi: "Reliability và performance dựa trên tần suất sử dụng thực tế", en: "Reliability and performance based on real usage frequencies", ja: "実際の使用頻度に基づく信頼性と性能" },
      { vi: "Static analysis mã nguồn", en: "Static analysis of source code", ja: "ソースコードの静的解析" }
    ],
    answer: 2,
    exp: { vi: "Operational profile mô tả tần suất các chức năng, dùng để test tin cậy/hiệu năng thực tế.", en: "An operational profile describes feature usage frequencies to test realistic reliability/performance.", ja: "運用プロファイルは機能の使用頻度を記述し、現実的な信頼性・性能テストに使います。" }
  },
  {
    q: { vi: "Loại review nào chính thức nhất và tuân theo quy trình có vai trò được định nghĩa rõ?", en: "Which review type is the most formal with well-defined roles and process?", ja: "最も形式的で、役割とプロセスが明確に定義されたレビュータイプはどれですか？" },
    options: [
      { vi: "Informal review", en: "Informal review", ja: "非公式レビュー" },
      { vi: "Walkthrough", en: "Walkthrough", ja: "ウォークスルー" },
      { vi: "Ad-hoc review", en: "Ad-hoc review", ja: "アドホックレビュー" },
      { vi: "Inspection", en: "Inspection", ja: "インスペクション" }
    ],
    answer: 3,
    exp: { vi: "Inspection có kiểm duyệt viên (moderator), quy tắc, số liệu và quy trình chính thức nhất.", en: "Inspection has a moderator, rules, metrics and the most formal process.", ja: "インスペクションはモデレーター、ルール、メトリクスを持つ最も形式的なプロセスです。" }
  },
  {
    q: { vi: "Vai trò 'moderator' trong inspection chịu trách nhiệm gì?", en: "What is the 'moderator' responsible for in an inspection?", ja: "インスペクションにおける「モデレーター」の責任は何ですか？" },
    options: [
      { vi: "Lập kế hoạch, dẫn dắt cuộc họp và đảm bảo quy trình review được tuân thủ", en: "Planning, leading the meeting and ensuring the review process is followed", ja: "計画立案、会議の進行、レビュープロセスの遵守を保証する" },
      { vi: "Viết mã đang được review", en: "Writing the code under review", ja: "レビュー対象のコードを書く" },
      { vi: "Sửa mọi lỗi phát hiện được", en: "Fixing all defects found", ja: "発見されたすべての欠陥を修正する" },
      { vi: "Quyết định ngân sách dự án", en: "Deciding the project budget", ja: "プロジェクト予算を決定する" }
    ],
    answer: 0,
    exp: { vi: "Moderator điều phối review, giữ trung lập và bảo đảm hiệu quả.", en: "The moderator coordinates the review, stays neutral and ensures effectiveness.", ja: "モデレーターはレビューを調整し、中立を保ち、有効性を確保します。" }
  },
  {
    q: { vi: "Walkthrough thường được dẫn dắt bởi ai?", en: "Who typically leads a walkthrough?", ja: "ウォークスルーは通常誰が主導しますか？" },
    options: [
      { vi: "Một kiểm toán viên độc lập bên ngoài", en: "An independent external auditor", ja: "独立した外部監査人" },
      { vi: "Tác giả của sản phẩm công việc", en: "The author of the work product", ja: "作業成果物の作成者" },
      { vi: "Khách hàng cuối", en: "The end customer", ja: "エンドカスタマー" },
      { vi: "Giám đốc điều hành", en: "The CEO", ja: "最高経営責任者" }
    ],
    answer: 1,
    exp: { vi: "Trong walkthrough, tác giả trình bày và dẫn người tham dự qua sản phẩm.", en: "In a walkthrough the author presents and guides participants through the product.", ja: "ウォークスルーでは作成者が成果物を提示し、参加者を導きます。" }
  },
  {
    q: { vi: "Static analysis (phân tích tĩnh) bằng công cụ KHÔNG thể tự tìm ra loại vấn đề nào?", en: "Which problem can tool-based static analysis NOT reliably find on its own?", ja: "ツールベースの静的解析が単独で確実に検出できない問題はどれですか？" },
    options: [
      { vi: "Biến chưa khởi tạo", en: "Uninitialized variables", ja: "初期化されていない変数" },
      { vi: "Mã không thể tới được (dead code)", en: "Unreachable (dead) code", ja: "到達不能（デッド）コード" },
      { vi: "Yêu cầu nghiệp vụ bị hiểu sai (lỗi logic ý định)", en: "Misunderstood business requirements (intent/logic errors)", ja: "誤解された業務要件（意図・ロジックの誤り）" },
      { vi: "Vi phạm quy tắc lập trình", en: "Coding standard violations", ja: "コーディング規約違反" }
    ],
    answer: 2,
    exp: { vi: "Công cụ tĩnh phát hiện mẫu mã nhưng không hiểu ý định nghiệp vụ; cần review con người.", en: "Static tools find code patterns but not business intent; human review is needed.", ja: "静的ツールはコードパターンを検出しますが業務意図は理解できず、人手のレビューが必要です。" }
  },
  {
    q: { vi: "Ưu điểm chính của review sớm (trong pha yêu cầu/thiết kế) là gì?", en: "What is the main benefit of early reviews (in requirements/design)?", ja: "早期レビュー（要件・設計段階）の主な利点は何ですか？" },
    options: [
      { vi: "Loại bỏ hoàn toàn nhu cầu kiểm thử động", en: "It fully removes the need for dynamic testing", ja: "動的テストの必要性を完全に排除する" },
      { vi: "Đảm bảo không còn lỗi nào", en: "It guarantees zero remaining defects", ja: "欠陥ゼロを保証する" },
      { vi: "Tăng cyclomatic complexity", en: "It increases cyclomatic complexity", ja: "循環的複雑度を高める" },
      { vi: "Phát hiện lỗi sớm giúp giảm mạnh chi phí sửa chữa", en: "Finding defects early greatly reduces the cost of fixing them", ja: "早期に欠陥を発見することで修正コストを大幅に削減できる" }
    ],
    answer: 3,
    exp: { vi: "Chi phí sửa lỗi tăng theo pha; review sớm bắt lỗi khi còn rẻ.", en: "Fix cost rises with each phase; early reviews catch defects while cheap.", ja: "修正コストは工程ごとに増大するため、早期レビューは安価なうちに欠陥を捉えます。" }
  },
  {
    q: { vi: "Trong review, 'reviewer' được phân công theo perspective/vai trò nhằm mục đích gì?", en: "Assigning reviewers by perspective/role in a review aims to do what?", ja: "レビューでレビュアーを観点・役割ごとに割り当てる目的は何ですか？" },
    options: [
      { vi: "Tăng độ phủ và hiệu quả phát hiện lỗi bằng cách nhìn từ nhiều góc độ", en: "Increase coverage and defect-finding effectiveness via multiple viewpoints", ja: "複数の視点でカバレッジと欠陥検出の有効性を高める" },
      { vi: "Giảm số người tham gia xuống một", en: "Reduce participants to a single person", ja: "参加者を1人に減らす" },
      { vi: "Bỏ qua checklist", en: "Skip the checklist", ja: "チェックリストを省く" },
      { vi: "Chỉ tập trung vào định dạng tài liệu", en: "Focus only on document formatting", ja: "文書の書式のみに集中する" }
    ],
    answer: 0,
    exp: { vi: "Role/perspective-based reading giúp mỗi reviewer tìm lớp lỗi khác nhau.", en: "Role/perspective-based reading lets each reviewer find different defect classes.", ja: "役割・観点ベースの読解により各レビュアーが異なる欠陥種別を発見できます。" }
  },
  {
    q: { vi: "Số liệu nào thường dùng để đánh giá hiệu quả của một inspection?", en: "Which metric is commonly used to assess an inspection's effectiveness?", ja: "インスペクションの有効性評価によく用いられるメトリクスはどれですか？" },
    options: [
      { vi: "Số dòng bình luận", en: "Number of comment lines", ja: "コメント行数" },
      { vi: "Số lỗi phát hiện trên mỗi trang/giờ và tỷ lệ loại bỏ lỗi", en: "Defects found per page/hour and defect removal rate", ja: "ページ/時間あたりの検出欠陥数と欠陥除去率" },
      { vi: "Tốc độ CPU", en: "CPU speed", ja: "CPU速度" },
      { vi: "Kích thước ổ đĩa", en: "Disk size", ja: "ディスクサイズ" }
    ],
    answer: 1,
    exp: { vi: "Mật độ lỗi, tốc độ review và defect removal effectiveness đo hiệu quả inspection.", en: "Defect density, review rate and defect removal effectiveness gauge inspection value.", ja: "欠陥密度、レビュー速度、欠陥除去効果でインスペクションの価値を測ります。" }
  },
  {
    q: { vi: "Data flow analysis là một dạng của kỹ thuật nào?", en: "Data flow analysis is a form of which technique?", ja: "データフロー解析はどの技法の一形態ですか？" },
    options: [
      { vi: "Kiểm thử tải (load testing)", en: "Load testing", ja: "負荷テスト" },
      { vi: "Kiểm thử khám phá (exploratory)", en: "Exploratory testing", ja: "探索的テスト" },
      { vi: "Phân tích tĩnh (static analysis)", en: "Static analysis", ja: "静的解析" },
      { vi: "Kiểm thử chấp nhận người dùng (UAT)", en: "User acceptance testing", ja: "ユーザー受け入れテスト" }
    ],
    answer: 2,
    exp: { vi: "Data flow analysis xét def/use của biến mà không chạy chương trình — phân tích tĩnh.", en: "Data flow analysis examines variable def/use without executing — static analysis.", ja: "データフロー解析はプログラムを実行せず変数のdef/useを調べる静的解析です。" }
  },
  {
    q: { vi: "'Product risk' (rủi ro sản phẩm) đề cập đến điều gì?", en: "What does 'product risk' refer to?", ja: "「プロダクトリスク」とは何を指しますか？" },
    options: [
      { vi: "Rủi ro về ngân sách và tiến độ dự án", en: "Risks to project budget and schedule", ja: "プロジェクトの予算とスケジュールのリスク" },
      { vi: "Rủi ro nhân sự nghỉ việc", en: "Risk of staff leaving", ja: "スタッフの離職リスク" },
      { vi: "Rủi ro nhà cung cấp phá sản", en: "Risk of a supplier going bankrupt", ja: "サプライヤーの倒産リスク" },
      { vi: "Khả năng sản phẩm không đáp ứng nhu cầu hợp lý của các bên liên quan", en: "The chance the product fails to meet stakeholders' legitimate needs", ja: "製品がステークホルダーの正当なニーズを満たさない可能性" }
    ],
    answer: 3,
    exp: { vi: "Product risk gắn với chất lượng sản phẩm; project risk gắn với quản lý dự án.", en: "Product risk relates to product quality; project risk relates to project management.", ja: "プロダクトリスクは製品品質に、プロジェクトリスクはプロジェクト管理に関係します。" }
  },
  {
    q: { vi: "Mức độ rủi ro (risk level) thường được tính từ hai yếu tố nào?", en: "The risk level is usually derived from which two factors?", ja: "リスクレベルは通常どの2つの要素から導かれますか？" },
    options: [
      { vi: "Khả năng xảy ra (likelihood) và mức tác động (impact)", en: "Likelihood and impact", ja: "発生可能性（likelihood）と影響度（impact）" },
      { vi: "Số dòng mã và số nhà phát triển", en: "Lines of code and number of developers", ja: "コード行数と開発者数" },
      { vi: "Chi phí phần cứng và giấy phép", en: "Hardware and licence cost", ja: "ハードウェアとライセンスのコスト" },
      { vi: "Số ca test và số môi trường", en: "Number of tests and environments", ja: "テスト数と環境数" }
    ],
    answer: 0,
    exp: { vi: "Risk level = likelihood x impact; dùng để ưu tiên nỗ lực test.", en: "Risk level = likelihood x impact; used to prioritize test effort.", ja: "リスクレベル = 発生可能性 x 影響度で、テスト工数の優先順位付けに使います。" }
  },
  {
    q: { vi: "Trong risk-based testing, các mục có rủi ro cao được xử lý thế nào?", en: "In risk-based testing, how are high-risk items handled?", ja: "リスクベーステストにおいて、高リスク項目はどう扱われますか？" },
    options: [
      { vi: "Được bỏ qua để tiết kiệm thời gian", en: "Skipped to save time", ja: "時間節約のためにスキップされる" },
      { vi: "Được test sớm hơn và sâu hơn (kỹ thuật chặt chẽ, độ phủ cao)", en: "Tested earlier and more thoroughly (rigorous techniques, higher coverage)", ja: "より早く、より徹底的にテストされる（厳密な技法、高いカバレッジ）" },
      { vi: "Test cuối cùng nếu còn thời gian", en: "Tested last if time remains", ja: "時間が残れば最後にテストされる" },
      { vi: "Chỉ test bằng static analysis", en: "Tested only with static analysis", ja: "静的解析のみでテストされる" }
    ],
    answer: 1,
    exp: { vi: "Rủi ro cao được ưu tiên nguồn lực để giảm rủi ro nhanh nhất.", en: "High risk gets prioritized resources to reduce risk fastest.", ja: "高リスクにはリスクを最速で減らすためリソースが優先されます。" }
  },
  {
    q: { vi: "Risk identification (nhận diện rủi ro) tốt nhất nên có sự tham gia của ai?", en: "Risk identification is best done with whose involvement?", ja: "リスク識別は誰の関与を得て行うのが最善ですか？" },
    options: [
      { vi: "Chỉ một mình test manager", en: "The test manager alone", ja: "テストマネージャー1人のみ" },
      { vi: "Chỉ nhóm marketing", en: "Only the marketing team", ja: "マーケティングチームのみ" },
      { vi: "Nhiều bên liên quan đa dạng (kinh doanh, kỹ thuật, người dùng)", en: "A diverse set of stakeholders (business, technical, users)", ja: "多様なステークホルダー（ビジネス・技術・ユーザー）" },
      { vi: "Không cần ai, dùng công cụ tự động", en: "Nobody; use an automated tool", ja: "誰も不要で、自動ツールを使う" }
    ],
    answer: 2,
    exp: { vi: "Nhiều góc nhìn giúp phát hiện đủ loại rủi ro sản phẩm và dự án.", en: "Multiple perspectives surface a fuller set of product and project risks.", ja: "多様な視点がプロダクトとプロジェクトのリスクをより網羅的に洗い出します。" }
  },
  {
    q: { vi: "Kỹ thuật phân tích rủi ro nào có cấu trúc bảng gồm severity, occurrence, detection?", en: "Which risk analysis technique uses a table of severity, occurrence and detection?", ja: "重大度・発生度・検出度の表を用いるリスク分析技法はどれですか？" },
    options: [
      { vi: "MC/DC", en: "MC/DC", ja: "MC/DC" },
      { vi: "Boundary value analysis", en: "Boundary value analysis", ja: "境界値分析" },
      { vi: "Pairwise", en: "Pairwise", ja: "ペアワイズ" },
      { vi: "FMEA (Failure Mode and Effects Analysis)", en: "FMEA (Failure Mode and Effects Analysis)", ja: "FMEA（故障モード影響解析）" }
    ],
    answer: 3,
    exp: { vi: "FMEA tính Risk Priority Number = severity x occurrence x detection.", en: "FMEA computes Risk Priority Number = severity x occurrence x detection.", ja: "FMEAはリスク優先度数 = 重大度 x 発生度 x 検出度を算出します。" }
  },
  {
    q: { vi: "'Risk mitigation' thông qua kiểm thử thực chất là gì?", en: "What does 'risk mitigation' through testing essentially mean?", ja: "テストによる「リスク軽減」とは本質的に何ですか？" },
    options: [
      { vi: "Giảm mức rủi ro bằng cách tìm và loại bỏ lỗi ở các vùng rủi ro cao", en: "Reducing risk level by finding and removing defects in high-risk areas", ja: "高リスク領域の欠陥を発見・除去してリスクレベルを下げること" },
      { vi: "Chuyển toàn bộ rủi ro sang khách hàng", en: "Transferring all risk to the customer", ja: "すべてのリスクを顧客へ転嫁すること" },
      { vi: "Phớt lờ rủi ro", en: "Ignoring the risk", ja: "リスクを無視すること" },
      { vi: "Tăng ngân sách phần cứng", en: "Increasing the hardware budget", ja: "ハードウェア予算を増やすこと" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử giảm rủi ro sản phẩm bằng cách cung cấp thông tin và loại bỏ lỗi.", en: "Testing mitigates product risk by providing information and removing defects.", ja: "テストは情報提供と欠陥除去によりプロダクトリスクを軽減します。" }
  },
  {
    q: { vi: "Khi rủi ro thay đổi trong dự án, phân tích rủi ro nên được xử lý ra sao?", en: "As risks change during a project, how should risk analysis be handled?", ja: "プロジェクト中にリスクが変化する場合、リスク分析はどう扱うべきですか？" },
    options: [
      { vi: "Chỉ làm một lần khi bắt đầu và không đổi", en: "Done once at the start and never changed", ja: "開始時に一度だけ行い、変更しない" },
      { vi: "Được xem xét và cập nhật định kỳ trong suốt vòng đời", en: "Reviewed and updated periodically throughout the lifecycle", ja: "ライフサイクル全体を通じて定期的に見直し・更新する" },
      { vi: "Chỉ làm khi dự án kết thúc", en: "Done only at project end", ja: "プロジェクト終了時にのみ行う" },
      { vi: "Không cần thiết trong Agile", en: "Not needed in Agile", ja: "アジャイルでは不要" }
    ],
    answer: 1,
    exp: { vi: "Risk-based testing là quá trình lặp; rủi ro cần được đánh giá lại liên tục.", en: "Risk-based testing is iterative; risks must be re-assessed continually.", ja: "リスクベーステストは反復的で、リスクは継続的に再評価する必要があります。" }
  },
  {
    q: { vi: "Rủi ro sản phẩm cao nhưng khả năng xảy ra thấp thường được xử lý thế nào?", en: "How is a high-impact but low-likelihood product risk usually handled?", ja: "影響度は高いが発生可能性が低いプロダクトリスクは通常どう扱われますか？" },
    options: [
      { vi: "Luôn bỏ qua hoàn toàn", en: "Always ignored entirely", ja: "常に完全に無視する" },
      { vi: "Luôn test đầy đủ như rủi ro cao nhất", en: "Always tested as much as the highest risk", ja: "常に最高リスクと同等に完全テストする" },
      { vi: "Cân nhắc test có mục tiêu, có thể kèm biện pháp giảm nhẹ khác ngoài test", en: "Considered for targeted testing, possibly with non-test mitigations too", ja: "対象を絞ったテストを検討し、テスト以外の軽減策も併用し得る" },
      { vi: "Chuyển sang project risk", en: "Reclassified as project risk", ja: "プロジェクトリスクに分類し直す" }
    ],
    answer: 2,
    exp: { vi: "Impact cao vẫn cần chú ý; cân nhắc test và biện pháp giảm nhẹ phù hợp.", en: "High impact still warrants attention; weigh targeted tests and other mitigations.", ja: "影響度が高い場合は注意が必要で、対象テストや他の軽減策を検討します。" }
  },
  {
    q: { vi: "Trong risk-based testing, tiêu chí kết thúc (exit criteria) nên liên kết với gì?", en: "In risk-based testing, exit criteria should be linked to what?", ja: "リスクベーステストにおいて、終了基準は何に結び付けるべきですか？" },
    options: [
      { vi: "Số lượng ca test tuyệt đối bất kể rủi ro", en: "An absolute number of tests regardless of risk", ja: "リスクに関係なく絶対的なテスト数" },
      { vi: "Số dòng mã đã viết", en: "The number of lines of code written", ja: "書かれたコード行数" },
      { vi: "Số cuộc họp đã tổ chức", en: "The number of meetings held", ja: "開催された会議の数" },
      { vi: "Mức độ rủi ro còn lại đã được giảm tới ngưỡng chấp nhận được", en: "Residual risk reduced to an acceptable threshold", ja: "残存リスクが許容水準まで低減されたこと" }
    ],
    answer: 3,
    exp: { vi: "Kết thúc test khi rủi ro sản phẩm còn lại đủ thấp cho các bên chấp nhận.", en: "Testing ends when residual product risk is low enough to be acceptable.", ja: "残存プロダクトリスクが受容可能なほど低くなればテストを終了します。" }
  },
  {
    q: { vi: "Thông tin từ kiểm thử giúp các bên liên quan làm gì tốt hơn?", en: "Information from testing helps stakeholders do what better?", ja: "テストから得られる情報はステークホルダーが何をより良く行うのに役立ちますか？" },
    options: [
      { vi: "Ra quyết định dựa trên rủi ro về việc phát hành sản phẩm", en: "Make risk-informed decisions about releasing the product", ja: "製品リリースについてリスクに基づく意思決定を行う" },
      { vi: "Chọn màu sắc giao diện", en: "Choose the UI colours", ja: "UIの色を選ぶ" },
      { vi: "Đặt tên biến trong mã", en: "Name variables in the code", ja: "コード内の変数に名前を付ける" },
      { vi: "Lên lịch nghỉ phép nhân viên", en: "Schedule staff holidays", ja: "スタッフの休暇を計画する" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử cung cấp thông tin rủi ro để hỗ trợ quyết định phát hành.", en: "Testing supplies risk information to support release decisions.", ja: "テストはリリース判断を支援するリスク情報を提供します。" }
  },
  {
    q: { vi: "Sự khác biệt cốt lõi giữa 'risk' và 'defect' là gì?", en: "What is the core difference between a 'risk' and a 'defect'?", ja: "「リスク」と「欠陥」の本質的な違いは何ですか？" },
    options: [
      { vi: "Cả hai hoàn toàn giống nhau", en: "They are exactly the same", ja: "両者は完全に同じである" },
      { vi: "Risk là điều có thể xảy ra trong tương lai; defect là vấn đề đã tồn tại", en: "A risk is a possible future problem; a defect is an existing one", ja: "リスクは将来起こり得る問題、欠陥は既に存在する問題である" },
      { vi: "Defect chỉ xảy ra ở phần cứng", en: "Defects only occur in hardware", ja: "欠陥はハードウェアでのみ発生する" },
      { vi: "Risk chỉ liên quan đến chi phí", en: "Risk only concerns cost", ja: "リスクはコストのみに関係する" }
    ],
    answer: 1,
    exp: { vi: "Risk là khả năng/tương lai; defect là khiếm khuyết thực tế đã có trong sản phẩm.", en: "Risk is a probability/future event; a defect is an actual flaw already present.", ja: "リスクは確率・将来の事象、欠陥は既に存在する実際の不具合です。" }
  },
  {
    q: { vi: "Ai thường chịu trách nhiệm điều phối phân tích rủi ro sản phẩm ở cấp dự án?", en: "Who typically coordinates product risk analysis at project level?", ja: "プロジェクトレベルでプロダクトリスク分析を調整するのは通常誰ですか？" },
    options: [
      { vi: "Người dùng cuối", en: "The end user", ja: "エンドユーザー" },
      { vi: "Nhà cung cấp phần cứng", en: "The hardware vendor", ja: "ハードウェアベンダー" },
      { vi: "Test Manager", en: "The Test Manager", ja: "テストマネージャー" },
      { vi: "Kế toán", en: "The accountant", ja: "会計担当者" }
    ],
    answer: 2,
    exp: { vi: "Test Manager điều phối phân tích rủi ro và định hình chiến lược test dựa trên rủi ro.", en: "The Test Manager coordinates risk analysis and shapes the risk-based test strategy.", ja: "テストマネージャーがリスク分析を調整し、リスクベースのテスト戦略を形作ります。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng nào dựa trên ý kiến chuyên gia đồng thuận qua nhiều vòng ẩn danh?", en: "Which estimation technique uses anonymous, multi-round expert consensus?", ja: "匿名で複数ラウンドの専門家合意を用いる見積技法はどれですか？" },
    options: [
      { vi: "Boundary value analysis", en: "Boundary value analysis", ja: "境界値分析" },
      { vi: "MC/DC", en: "MC/DC", ja: "MC/DC" },
      { vi: "Pairwise", en: "Pairwise", ja: "ペアワイズ" },
      { vi: "Wideband Delphi", en: "Wideband Delphi", ja: "ワイドバンドデルファイ" }
    ],
    answer: 3,
    exp: { vi: "Wideband Delphi lặp lại ước lượng ẩn danh của chuyên gia tới khi hội tụ.", en: "Wideband Delphi iterates anonymous expert estimates until they converge.", ja: "ワイドバンドデルファイは匿名の専門家見積を収束するまで反復します。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng dựa trên số liệu lịch sử của dự án tương tự gọi là gì?", en: "Estimation based on historical data from similar past projects is called what?", ja: "類似する過去プロジェクトの実績データに基づく見積は何と呼ばれますか？" },
    options: [
      { vi: "Ước lượng dựa trên số liệu/tỷ lệ (metrics-based / analogy)", en: "Metrics-based / analogy-based estimation", ja: "メトリクスベース／類推見積" },
      { vi: "Ước lượng ngẫu nhiên", en: "Random estimation", ja: "ランダム見積" },
      { vi: "Không ước lượng", en: "No estimation", ja: "見積しない" },
      { vi: "Ước lượng theo cảm tính duy nhất một người", en: "A single gut-feel guess", ja: "一人の直感による見積" }
    ],
    answer: 0,
    exp: { vi: "Metrics-based dùng dữ liệu quá khứ (năng suất, tỷ lệ lỗi) để dự báo nỗ lực.", en: "Metrics-based uses past data (productivity, defect rates) to forecast effort.", ja: "メトリクスベースは過去データ（生産性、欠陥率）で工数を予測します。" }
  },
  {
    q: { vi: "Ước lượng ba điểm (three-point) tính giá trị kỳ vọng thế nào?", en: "How does three-point estimation compute the expected value?", ja: "3点見積は期待値をどのように計算しますか？" },
    options: [
      { vi: "(lạc quan + bi quan) / 2", en: "(optimistic + pessimistic) / 2", ja: "（楽観値 + 悲観値）/ 2" },
      { vi: "(lạc quan + 4 x khả dĩ nhất + bi quan) / 6", en: "(optimistic + 4 x most likely + pessimistic) / 6", ja: "（楽観値 + 4 x 最可能値 + 悲観値）/ 6" },
      { vi: "Chỉ lấy giá trị bi quan", en: "Just the pessimistic value", ja: "悲観値のみ" },
      { vi: "Chỉ lấy giá trị lạc quan", en: "Just the optimistic value", ja: "楽観値のみ" }
    ],
    answer: 1,
    exp: { vi: "Công thức PERT: E = (a + 4m + b) / 6 giảm thiên lệch của ước lượng.", en: "The PERT formula E = (a + 4m + b) / 6 reduces estimation bias.", ja: "PERT式 E = (a + 4m + b) / 6 は見積の偏りを軽減します。" }
  },
  {
    q: { vi: "Chỉ số 'defect detection percentage' (DDP) đo lường điều gì?", en: "What does 'defect detection percentage' (DDP) measure?", ja: "「欠陥検出率」（DDP）は何を測定しますか？" },
    options: [
      { vi: "Số dòng mã trên mỗi lập trình viên", en: "Lines of code per developer", ja: "開発者ごとのコード行数" },
      { vi: "Thời gian phản hồi trung bình", en: "Average response time", ja: "平均応答時間" },
      { vi: "Tỷ lệ lỗi tìm được trước phát hành trên tổng lỗi (kể cả lỗi tìm sau phát hành)", en: "Defects found before release as a share of total (including post-release)", ja: "リリース前に検出した欠陥の総欠陥（リリース後含む）に対する割合" },
      { vi: "Số môi trường test", en: "Number of test environments", ja: "テスト環境の数" }
    ],
    answer: 2,
    exp: { vi: "DDP = lỗi phát hiện trong pha / (lỗi trong pha + lỗi lọt ra sau) — đo hiệu quả test.", en: "DDP = defects found in phase / (in-phase + escaped defects) — measures test effectiveness.", ja: "DDP = 工程内検出欠陥 / (工程内 + 流出欠陥) でテストの有効性を測ります。" }
  },
  {
    q: { vi: "Đồ thị 'defect burndown/trend' hỗ trợ test manager làm gì?", en: "How does a defect burndown/trend chart help a test manager?", ja: "欠陥バーンダウン／トレンド図はテストマネージャーをどう支援しますか？" },
    options: [
      { vi: "Đo độ phủ MC/DC", en: "Measure MC/DC coverage", ja: "MC/DCカバレッジを測定する" },
      { vi: "Xác định bố cục giao diện", en: "Determine UI layout", ja: "UIレイアウトを決定する" },
      { vi: "Tính cyclomatic complexity", en: "Compute cyclomatic complexity", ja: "循環的複雑度を計算する" },
      { vi: "Theo dõi xu hướng phát hiện/đóng lỗi để đánh giá tiến độ và độ ổn định", en: "Track defect find/close trends to judge progress and stability", ja: "欠陥の検出・クローズ傾向を追い、進捗と安定性を判断する" }
    ],
    answer: 3,
    exp: { vi: "Xu hướng lỗi mở/đóng giúp phán đoán mức sẵn sàng phát hành.", en: "Open/closed defect trends help gauge release readiness.", ja: "未解決／解決済み欠陥の傾向はリリース準備状況の判断に役立ちます。" }
  },
  {
    q: { vi: "'Test monitoring' và 'test control' khác nhau ở điểm cốt lõi nào?", en: "What is the core difference between 'test monitoring' and 'test control'?", ja: "「テスト監視」と「テストコントロール」の本質的な違いは何ですか？" },
    options: [
      { vi: "Monitoring là thu thập/so sánh thông tin; control là hành động điều chỉnh dựa trên đó", en: "Monitoring gathers/compares information; control takes corrective action from it", ja: "監視は情報の収集・比較、コントロールはそれに基づく是正措置である" },
      { vi: "Cả hai hoàn toàn giống nhau", en: "They are identical", ja: "両者は完全に同じである" },
      { vi: "Control chỉ áp dụng cho phần cứng", en: "Control applies only to hardware", ja: "コントロールはハードウェアにのみ適用される" },
      { vi: "Monitoring chỉ dùng trong Agile", en: "Monitoring is used only in Agile", ja: "監視はアジャイルでのみ使われる" }
    ],
    answer: 0,
    exp: { vi: "Monitor để biết tình trạng; control để đưa dự án về đúng kế hoạch.", en: "Monitor to know the status; control to steer back to plan.", ja: "監視で状況を把握し、コントロールで計画へ引き戻します。" }
  },
  {
    q: { vi: "Trong quản lý lỗi, trạng thái 'deferred' (hoãn) nghĩa là gì?", en: "In defect management, what does the 'deferred' status mean?", ja: "欠陥管理において「deferred（延期）」ステータスは何を意味しますか？" },
    options: [
      { vi: "Lỗi đã được sửa và xác nhận", en: "The defect is fixed and verified", ja: "欠陥が修正・検証済みである" },
      { vi: "Lỗi được ghi nhận nhưng quyết định hoãn sửa sang phiên bản/thời điểm sau", en: "The defect is acknowledged but its fix is postponed to a later release/time", ja: "欠陥は認識されているが、修正が後のリリース／時期に延期される" },
      { vi: "Lỗi không thể tái hiện", en: "The defect cannot be reproduced", ja: "欠陥が再現できない" },
      { vi: "Lỗi bị trùng lặp", en: "The defect is a duplicate", ja: "欠陥が重複している" }
    ],
    answer: 1,
    exp: { vi: "Deferred: lỗi hợp lệ nhưng ưu tiên thấp, để sửa sau.", en: "Deferred: a valid but low-priority defect to be fixed later.", ja: "Deferredは有効だが優先度が低く、後で修正する欠陥です。" }
  },
  {
    q: { vi: "Một báo cáo lỗi tốt theo IEEE 1044 nên tối thiểu chứa gì?", en: "A good defect report (per IEEE 1044) should minimally contain what?", ja: "良い欠陥報告（IEEE 1044準拠）は最低限何を含むべきですか？" },
    options: [
      { vi: "Chỉ tên người báo cáo", en: "Only the reporter's name", ja: "報告者の氏名のみ" },
      { vi: "Chỉ ảnh chụp màn hình không chú thích", en: "Only an uncaptioned screenshot", ja: "説明のないスクリーンショットのみ" },
      { vi: "Bước tái hiện, kết quả mong đợi và thực tế, mức độ nghiêm trọng/ưu tiên", en: "Reproduction steps, expected vs actual result, severity/priority", ja: "再現手順、期待結果と実際結果、重大度／優先度" },
      { vi: "Chỉ ngày phát hiện", en: "Only the date found", ja: "検出日のみ" }
    ],
    answer: 2,
    exp: { vi: "Báo cáo cần đủ thông tin để tái hiện, đánh giá tác động và ưu tiên xử lý.", en: "A report needs enough to reproduce, assess impact, and prioritize handling.", ja: "報告には再現、影響評価、優先付けに十分な情報が必要です。" }
  },
  {
    q: { vi: "Phân biệt 'severity' và 'priority' của một lỗi thế nào?", en: "How do a defect's 'severity' and 'priority' differ?", ja: "欠陥の「重大度」と「優先度」はどう異なりますか？" },
    options: [
      { vi: "Cả hai luôn bằng nhau", en: "They are always equal", ja: "両者は常に等しい" },
      { vi: "Priority chỉ do lập trình viên quyết định", en: "Priority is decided only by developers", ja: "優先度は開発者のみが決める" },
      { vi: "Severity chỉ áp dụng cho lỗi giao diện", en: "Severity applies only to UI defects", ja: "重大度はUI欠陥にのみ適用される" },
      { vi: "Severity là mức tác động kỹ thuật; priority là thứ tự cần sửa theo nghiệp vụ", en: "Severity is the technical impact; priority is the business order of fixing", ja: "重大度は技術的影響、優先度は業務上の修正順序である" }
    ],
    answer: 3,
    exp: { vi: "Lỗi có thể severity cao nhưng priority thấp (hiếm gặp) và ngược lại.", en: "A defect can be high severity yet low priority (rare) and vice versa.", ja: "欠陥は重大度が高くても優先度が低い（稀）ことがあり、その逆もあります。" }
  },
  {
    q: { vi: "'Test progress report' chủ yếu phục vụ ai và mục đích gì?", en: "Who is a 'test progress report' mainly for, and why?", ja: "「テスト進捗報告」は主に誰のためで、目的は何ですか？" },
    options: [
      { vi: "Các bên liên quan, để cập nhật tình trạng test so với kế hoạch và rủi ro", en: "Stakeholders, to update on test status against plan and risks", ja: "ステークホルダーへ、計画とリスクに対するテスト状況を更新するため" },
      { vi: "Chỉ đội DevOps, để cấu hình server", en: "Only DevOps, to configure servers", ja: "サーバー構成のためのDevOpsのみ" },
      { vi: "Chỉ khách hàng, để tính hoá đơn", en: "Only the customer, for invoicing", ja: "請求のための顧客のみ" },
      { vi: "Không ai, chỉ lưu trữ", en: "No one; for archiving only", ja: "誰でもなく、保管のみ" }
    ],
    answer: 0,
    exp: { vi: "Báo cáo tiến độ truyền đạt trạng thái, xu hướng và rủi ro cho việc ra quyết định.", en: "The progress report communicates status, trends and risks for decision-making.", ja: "進捗報告は意思決定のため状況・傾向・リスクを伝えます。" }
  },
  {
    q: { vi: "Test manager nên phản ứng thế nào khi entry criteria của một cấp test chưa đạt?", en: "How should a test manager react when a test level's entry criteria are not met?", ja: "あるテストレベルの開始基準が満たされない場合、テストマネージャーはどう対応すべきですか？" },
    options: [
      { vi: "Luôn bắt đầu test ngay bất kể gì", en: "Always start testing immediately regardless", ja: "何があっても常に即座にテストを開始する" },
      { vi: "Đánh giá rủi ro và quyết định hoãn, giảm phạm vi, hoặc chấp nhận có điều kiện", en: "Assess risk and decide to delay, reduce scope, or accept conditionally", ja: "リスクを評価し、延期・範囲縮小・条件付き受け入れを判断する" },
      { vi: "Huỷ toàn bộ dự án", en: "Cancel the whole project", ja: "プロジェクト全体を中止する" },
      { vi: "Bỏ qua entry criteria mãi mãi", en: "Ignore entry criteria permanently", ja: "開始基準を永久に無視する" }
    ],
    answer: 1,
    exp: { vi: "Đó là hành động test control dựa trên đánh giá rủi ro, có thông tin cho stakeholder.", en: "This is a risk-informed test control action, communicated to stakeholders.", ja: "これはリスクに基づくテストコントロール行動で、ステークホルダーに伝えます。" }
  },
  {
    q: { vi: "Chỉ số nào phù hợp để đo 'test execution progress'?", en: "Which metric best measures 'test execution progress'?", ja: "「テスト実行進捗」を測るのに最適なメトリクスはどれですか？" },
    options: [
      { vi: "Số dòng bình luận trong mã", en: "Comment lines in code", ja: "コード内のコメント行数" },
      { vi: "Số cuộc họp trong tuần", en: "Meetings held this week", ja: "今週の会議数" },
      { vi: "Số ca test đã chạy (pass/fail/blocked) so với tổng đã lập kế hoạch", en: "Tests run (passed/failed/blocked) versus total planned", ja: "実行済みテスト数（合格／不合格／ブロック）対計画総数" },
      { vi: "Dung lượng ổ cứng còn trống", en: "Free disk space", ja: "空きディスク容量" }
    ],
    answer: 2,
    exp: { vi: "Tỷ lệ ca test đã chạy và kết quả phản ánh trực tiếp tiến độ thực thi.", en: "The proportion of tests run and their outcomes directly reflect execution progress.", ja: "実行済みテストの割合と結果が実行進捗を直接反映します。" }
  },
  {
    q: { vi: "Khi ước lượng test, tại sao nên bổ sung buffer cho rủi ro và bất định?", en: "When estimating tests, why add a buffer for risk and uncertainty?", ja: "テスト見積時、リスクと不確実性のためバッファを加えるのはなぜですか？" },
    options: [
      { vi: "Để cố tình làm dự án chậm", en: "To deliberately slow the project", ja: "意図的にプロジェクトを遅らせるため" },
      { vi: "Vì buffer luôn bị bỏ qua", en: "Because buffers are always ignored", ja: "バッファは常に無視されるため" },
      { vi: "Vì luật yêu cầu", en: "Because the law requires it", ja: "法律で義務付けられているため" },
      { vi: "Vì có yếu tố không lường trước như môi trường trục trặc, lỗi retest, phụ thuộc", en: "Because of unforeseen factors like environment issues, retests, dependencies", ja: "環境の不具合、再テスト、依存関係など予見できない要因があるため" }
    ],
    answer: 3,
    exp: { vi: "Buffer hợp lý bao phủ biến động thực tế, tăng tính khả thi của kế hoạch.", en: "A sensible buffer absorbs real-world variability and makes the plan feasible.", ja: "妥当なバッファは現実の変動を吸収し、計画を実現可能にします。" }
  },
  {
    q: { vi: "'Convergence metric' (số liệu hội tụ) như tỷ lệ open/closed defects giúp đánh giá gì?", en: "A convergence metric like open/closed defect ratio helps assess what?", ja: "未解決／解決済み欠陥比のような収束メトリクスは何の評価に役立ちますか？" },
    options: [
      { vi: "Mức độ ổn định và sẵn sàng phát hành của sản phẩm", en: "Product stability and readiness for release", ja: "製品の安定性とリリース準備状況" },
      { vi: "Tốc độ gõ phím của tester", en: "The tester's typing speed", ja: "テスターのタイピング速度" },
      { vi: "Nhiệt độ phòng server", en: "Server room temperature", ja: "サーバールームの温度" },
      { vi: "Kích thước phông chữ tài liệu", en: "Font size in documents", ja: "文書のフォントサイズ" }
    ],
    answer: 0,
    exp: { vi: "Khi lỗi mới giảm và lỗi đóng tăng, sản phẩm hội tụ về trạng thái ổn định.", en: "As new defects drop and closures rise, the product converges toward stability.", ja: "新規欠陥が減り解決が増えると、製品は安定へ収束します。" }
  },
  {
    q: { vi: "Trong test plan theo IEEE 829/ISO 29119, mục 'test items' mô tả gì?", en: "In a test plan (IEEE 829/ISO 29119), what do 'test items' describe?", ja: "テスト計画（IEEE 829/ISO 29119）における「テストアイテム」は何を記述しますか？" },
    options: [
      { vi: "Danh sách nhân viên nghỉ phép", en: "The list of staff on leave", ja: "休暇中のスタッフ一覧" },
      { vi: "Các phần/phiên bản của sản phẩm sẽ được kiểm thử", en: "The product parts/versions to be tested", ja: "テスト対象となる製品の部分／バージョン" },
      { vi: "Giá cổ phiếu công ty", en: "The company's stock price", ja: "会社の株価" },
      { vi: "Thực đơn căng tin", en: "The cafeteria menu", ja: "社員食堂のメニュー" }
    ],
    answer: 1,
    exp: { vi: "Test items xác định phạm vi đối tượng kiểm thử (build, phiên bản, module).", en: "Test items define the scope of what is tested (builds, versions, modules).", ja: "テストアイテムはテスト対象範囲（ビルド、バージョン、モジュール）を定義します。" }
  },
  {
    q: { vi: "Tại sao test manager cần theo dõi 'coverage metrics' theo nhiều chiều?", en: "Why should a test manager track coverage metrics along several dimensions?", ja: "テストマネージャーが複数の観点でカバレッジメトリクスを追うべきなのはなぜですか？" },
    options: [
      { vi: "Vì chỉ có một loại coverage duy nhất", en: "Because there is only one kind of coverage", ja: "カバレッジの種類は1つしかないため" },
      { vi: "Vì coverage không liên quan đến chất lượng", en: "Because coverage is unrelated to quality", ja: "カバレッジは品質と無関係だから" },
      { vi: "Vì phủ yêu cầu, phủ rủi ro và phủ mã cho các góc nhìn bổ sung về mức độ đầy đủ", en: "Requirements, risk and code coverage give complementary views of thoroughness", ja: "要件・リスク・コードのカバレッジは網羅度に対する補完的な視点を与えるため" },
      { vi: "Để tăng số cuộc họp", en: "To increase the number of meetings", ja: "会議数を増やすため" }
    ],
    answer: 2,
    exp: { vi: "Không loại coverage đơn lẻ nào đủ; kết hợp cho bức tranh toàn diện.", en: "No single coverage type is sufficient; combining them gives the full picture.", ja: "単一のカバレッジでは不十分で、組み合わせが全体像を与えます。" }
  },
  {
    q: { vi: "Khi lỗi lọt ra production tăng đột biến, root cause analysis giúp gì cho quy trình?", en: "When production defect escapes spike, how does root cause analysis help the process?", ja: "本番への欠陥流出が急増したとき、根本原因分析はプロセスにどう役立ちますか？" },
    options: [
      { vi: "Chỉ để đổ lỗi cho một cá nhân", en: "Merely to blame one individual", ja: "単に個人を非難するため" },
      { vi: "Để xoá toàn bộ báo cáo lỗi", en: "To delete all defect reports", ja: "すべての欠陥報告を削除するため" },
      { vi: "Không có tác dụng gì", en: "It has no effect", ja: "何の効果もない" },
      { vi: "Xác định nguyên nhân hệ thống để cải tiến quy trình và ngăn tái diễn", en: "Identify systemic causes to improve the process and prevent recurrence", ja: "システム的な原因を特定してプロセスを改善し、再発を防ぐ" }
    ],
    answer: 3,
    exp: { vi: "RCA hướng tới cải tiến phòng ngừa, không phải quy trách nhiệm cá nhân.", en: "RCA aims at preventive improvement, not personal blame.", ja: "RCAは個人の責任追及でなく予防的改善を目指します。" }
  },
  {
    q: { vi: "'Test estimation' bằng phương pháp phân rã công việc (work breakdown) hoạt động thế nào?", en: "How does test estimation via work breakdown structure work?", ja: "作業分解構成（WBS）によるテスト見積はどのように機能しますか？" },
    options: [
      { vi: "Chia công việc thành các nhiệm vụ nhỏ, ước lượng từng phần rồi cộng lại", en: "Break work into small tasks, estimate each, then sum them", ja: "作業を小タスクに分割し、各々を見積もって合算する" },
      { vi: "Đoán một con số tổng duy nhất không phân tích", en: "Guess a single total without analysis", ja: "分析せず単一の合計を推測する" },
      { vi: "Chỉ hỏi khách hàng con số", en: "Just ask the customer for a number", ja: "顧客に数値を尋ねるだけ" },
      { vi: "Dùng số ngẫu nhiên", en: "Use a random number", ja: "ランダムな数値を使う" }
    ],
    answer: 0,
    exp: { vi: "Bottom-up: ước lượng chi tiết từng nhiệm vụ cho kết quả minh bạch, dễ theo dõi.", en: "Bottom-up: detailed per-task estimates give a transparent, traceable total.", ja: "ボトムアップは各タスクの詳細見積で透明かつ追跡可能な合計を得ます。" }
  },
  {
    q: { vi: "gTAA (generic Test Automation Architecture) gồm những tầng chính nào?", en: "What are the main layers of the gTAA (generic Test Automation Architecture)?", ja: "gTAA（汎用テスト自動化アーキテクチャ）の主要な層は何ですか？" },
    options: [
      { vi: "UI, business, database, network", en: "UI, business, database, network", ja: "UI・ビジネス・データベース・ネットワーク" },
      { vi: "Test generation, test definition, test execution, test adaptation", en: "Test generation, test definition, test execution, test adaptation", ja: "テスト生成層、テスト定義層、テスト実行層、テスト適応層" },
      { vi: "Load, stress, spike, soak", en: "Load, stress, spike, soak", ja: "負荷・ストレス・スパイク・ソーク" },
      { vi: "Alpha, beta, gamma, delta", en: "Alpha, beta, gamma, delta", ja: "アルファ・ベータ・ガンマ・デルタ" }
    ],
    answer: 1,
    exp: { vi: "gTAA phân lớp để tách biệt mối quan tâm và tăng khả năng bảo trì/tái sử dụng.", en: "The gTAA layers separate concerns and improve maintainability/reusability.", ja: "gTAAは層で関心事を分離し、保守性・再利用性を高めます。" }
  },
  {
    q: { vi: "Vai trò của 'test adaptation layer' trong gTAA là gì?", en: "What is the role of the 'test adaptation layer' in the gTAA?", ja: "gTAAにおける「テスト適応層」の役割は何ですか？" },
    options: [
      { vi: "Định nghĩa các ca test ở mức trừu tượng", en: "Define test cases at an abstract level", ja: "テストケースを抽象レベルで定義する" },
      { vi: "Sinh ca test tự động từ mô hình", en: "Generate tests automatically from models", ja: "モデルからテストを自動生成する" },
      { vi: "Kết nối bộ automation với SUT qua các giao diện/adapter cụ thể", en: "Connect the automation to the SUT via specific interfaces/adapters", ja: "特定のインターフェース／アダプター経由で自動化とSUTを接続する" },
      { vi: "Báo cáo kết quả cho quản lý", en: "Report results to management", ja: "結果を管理者へ報告する" }
    ],
    answer: 2,
    exp: { vi: "Adaptation layer tách logic test khỏi chi tiết kỹ thuật của SUT/công cụ.", en: "The adaptation layer isolates test logic from SUT/tool technical details.", ja: "適応層はテストロジックをSUT／ツールの技術詳細から切り離します。" }
  },
  {
    q: { vi: "Ưu điểm chính của keyword-driven testing là gì?", en: "What is the main advantage of keyword-driven testing?", ja: "キーワード駆動テストの主な利点は何ですか？" },
    options: [
      { vi: "Loại bỏ nhu cầu bảo trì test", en: "Removes the need to maintain tests", ja: "テストの保守を不要にする" },
      { vi: "Chỉ chạy được trên một trình duyệt", en: "Runs on only one browser", ja: "1つのブラウザでのみ動作する" },
      { vi: "Không cần công cụ", en: "Requires no tooling", ja: "ツールを必要としない" },
      { vi: "Tách logic test khỏi mã tự động, cho phép người không lập trình viết test", en: "Separates test logic from automation code, letting non-programmers write tests", ja: "テストロジックを自動化コードから分離し、非プログラマーもテスト作成可能にする" }
    ],
    answer: 3,
    exp: { vi: "Keyword-driven dùng từ khoá cấp nghiệp vụ, dễ đọc và tái sử dụng.", en: "Keyword-driven uses business-level keywords, readable and reusable.", ja: "キーワード駆動は業務レベルのキーワードを用い、可読で再利用可能です。" }
  },
  {
    q: { vi: "Data-driven testing khác keyword-driven testing chủ yếu ở điểm nào?", en: "How does data-driven testing mainly differ from keyword-driven testing?", ja: "データ駆動テストはキーワード駆動テストと主にどう異なりますか？" },
    options: [
      { vi: "Data-driven tách dữ liệu test khỏi script; keyword-driven tách cả hành động/logic", en: "Data-driven separates test data from scripts; keyword-driven separates actions/logic too", ja: "データ駆動はデータをスクリプトから分離し、キーワード駆動は動作／ロジックも分離する" },
      { vi: "Cả hai hoàn toàn giống nhau", en: "They are identical", ja: "両者は完全に同じである" },
      { vi: "Data-driven không dùng dữ liệu", en: "Data-driven uses no data", ja: "データ駆動はデータを使わない" },
      { vi: "Keyword-driven không dùng từ khoá", en: "Keyword-driven uses no keywords", ja: "キーワード駆動はキーワードを使わない" }
    ],
    answer: 0,
    exp: { vi: "Data-driven chạy cùng script với nhiều bộ dữ liệu; keyword-driven trừu tượng hoá hành động.", en: "Data-driven runs one script over many datasets; keyword-driven abstracts actions.", ja: "データ駆動は1つのスクリプトを多数のデータで実行し、キーワード駆動は動作を抽象化します。" }
  },
  {
    q: { vi: "Vì sao 'flaky test' (test không ổn định) gây hại cho bộ automation?", en: "Why are flaky tests harmful to an automation suite?", ja: "「フレーキーテスト」（不安定なテスト）が自動化スイートに有害なのはなぜですか？" },
    options: [
      { vi: "Chúng luôn chạy nhanh hơn", en: "They always run faster", ja: "常に高速に動作する" },
      { vi: "Kết quả không nhất quán làm giảm niềm tin và che giấu lỗi thật", en: "Inconsistent results erode trust and can mask real defects", ja: "一貫しない結果が信頼を損ない、本物の欠陥を隠す恐れがある" },
      { vi: "Chúng làm tăng độ phủ MC/DC", en: "They increase MC/DC coverage", ja: "MC/DCカバレッジを高める" },
      { vi: "Chúng không cần môi trường", en: "They need no environment", ja: "環境を必要としない" }
    ],
    answer: 1,
    exp: { vi: "Test chập chờn (do timing, dữ liệu, môi trường) làm mất giá trị của kết quả pass/fail.", en: "Flakiness (timing, data, environment) undermines the value of pass/fail results.", ja: "フレーキーさ（タイミング・データ・環境）は合否結果の価値を損ないます。" }
  },
  {
    q: { vi: "Với TTA, kiểm thử API (dịch vụ) thường có ưu điểm gì so với kiểm thử qua GUI?", en: "For a TTA, what advantage does API/service testing usually have over GUI testing?", ja: "TTAにとって、API／サービステストはGUIテストと比べ通常どんな利点がありますか？" },
    options: [
      { vi: "Luôn tìm được mọi lỗi giao diện", en: "Always finds every UI defect", ja: "すべてのUI欠陥を常に検出する" },
      { vi: "Không cần bất kỳ khẳng định (assertion) nào", en: "Needs no assertions at all", ja: "アサーションを一切必要としない" },
      { vi: "Nhanh hơn, ổn định hơn và ít phụ thuộc vào thay đổi giao diện", en: "Faster, more stable, and less coupled to UI changes", ja: "より高速・安定で、UI変更への依存が少ない" },
      { vi: "Chỉ chạy thủ công", en: "Runs only manually", ja: "手動でのみ実行される" }
    ],
    answer: 2,
    exp: { vi: "Test API ở dưới GUI: bền hơn và cho phản hồi nhanh trong pipeline.", en: "API tests sit below the GUI: more robust and give fast pipeline feedback.", ja: "APIテストはGUIの下層で、より堅牢かつパイプラインで迅速なフィードバックを与えます。" }
  },
  {
    q: { vi: "'Test automation ROI' được cải thiện tốt nhất khi nào?", en: "When is 'test automation ROI' best improved?", ja: "「テスト自動化ROI」が最も改善されるのはどのような場合ですか？" },
    options: [
      { vi: "Khi mỗi test chỉ chạy đúng một lần", en: "When each test runs exactly once", ja: "各テストがちょうど一度だけ実行される場合" },
      { vi: "Khi test thay đổi mỗi lần chạy", en: "When tests change every run", ja: "実行のたびにテストが変わる場合" },
      { vi: "Khi bỏ qua bảo trì hoàn toàn", en: "When maintenance is skipped entirely", ja: "保守を完全に省略する場合" },
      { vi: "Khi test ổn định được chạy lặp nhiều lần (regression) với chi phí bảo trì thấp", en: "When stable tests are run repeatedly (regression) with low maintenance cost", ja: "安定したテストを低い保守コストで繰り返し実行する（回帰）場合" }
    ],
    answer: 3,
    exp: { vi: "Automation trả cổ tức khi tái sử dụng nhiều lần và bảo trì rẻ.", en: "Automation pays off when reused many times and cheap to maintain.", ja: "自動化は多数回再利用され保守が安価なとき効果を発揮します。" }
  },
  {
    q: { vi: "Nhiệm vụ kỹ thuật nào sau đây thuộc về Technical Test Analyst?", en: "Which technical task belongs to the Technical Test Analyst?", ja: "次の技術タスクのうち、テクニカルテストアナリストに属するのはどれですか？" },
    options: [
      { vi: "Thiết kế test cấu trúc (white-box) và test đặc tính kỹ thuật như hiệu năng, bảo mật", en: "Designing structural (white-box) tests and technical quality tests like performance, security", ja: "構造テスト（ホワイトボックス）や性能・セキュリティなど技術的品質テストの設計" },
      { vi: "Phê duyệt ngân sách toàn công ty", en: "Approving the company-wide budget", ja: "全社予算の承認" },
      { vi: "Thiết kế logo sản phẩm", en: "Designing the product logo", ja: "製品ロゴのデザイン" },
      { vi: "Tuyển dụng nhân sự marketing", en: "Recruiting marketing staff", ja: "マーケティング人材の採用" }
    ],
    answer: 0,
    exp: { vi: "TTA tập trung khía cạnh kỹ thuật: cấu trúc mã, hiệu năng, bảo mật, độ tin cậy.", en: "The TTA focuses on technical aspects: code structure, performance, security, reliability.", ja: "TTAはコード構造・性能・セキュリティ・信頼性など技術的側面に注力します。" }
  },
  {
    q: { vi: "Kỹ thuật nào TTA dùng để phân tích khả năng bảo trì mà không chạy chương trình?", en: "Which technique does a TTA use to analyze maintainability without executing the program?", ja: "TTAがプログラムを実行せず保守性を分析するのに用いる技法はどれですか？" },
    options: [
      { vi: "Load testing", en: "Load testing", ja: "負荷テスト" },
      { vi: "Static analysis (đo cyclomatic complexity, coupling, cohesion)", en: "Static analysis (measuring cyclomatic complexity, coupling, cohesion)", ja: "静的解析（循環的複雑度・結合度・凝集度の測定）" },
      { vi: "Usability testing", en: "Usability testing", ja: "ユーザビリティテスト" },
      { vi: "Boundary value analysis", en: "Boundary value analysis", ja: "境界値分析" }
    ],
    answer: 1,
    exp: { vi: "Phân tích tĩnh về độ phức tạp và cấu trúc giúp dự báo khó khăn bảo trì.", en: "Static analysis of complexity and structure predicts maintenance difficulty.", ja: "複雑度と構造の静的解析は保守の困難さを予測します。" }
  },
  {
    q: { vi: "Trong kiến trúc automation, vì sao nên áp dụng Page Object Model (POM)?", en: "In automation architecture, why apply the Page Object Model (POM)?", ja: "自動化アーキテクチャでページオブジェクトモデル（POM）を採用するのはなぜですか？" },
    options: [
      { vi: "Để loại bỏ mọi assertion", en: "To remove all assertions", ja: "すべてのアサーションを排除するため" },
      { vi: "Để test chạy chậm hơn", en: "To make tests run slower", ja: "テストを遅く実行するため" },
      { vi: "Đóng gói chi tiết giao diện để test dễ bảo trì khi UI thay đổi", en: "Encapsulate UI details so tests stay maintainable when the UI changes", ja: "UIの詳細をカプセル化し、UI変更時もテストの保守性を保つため" },
      { vi: "Để tránh dùng locator", en: "To avoid using locators", ja: "ロケーターの使用を避けるため" }
    ],
    answer: 2,
    exp: { vi: "POM tập trung locator/hành động của một trang vào một nơi, giảm trùng lặp.", en: "POM centralizes a page's locators/actions in one place, reducing duplication.", ja: "POMはページのロケーター／動作を一箇所に集約し、重複を減らします。" }
  },
  {
    q: { vi: "Khi nào KHÔNG nên tự động hoá một test?", en: "When should a test NOT be automated?", ja: "テストを自動化すべきでないのはどのような場合ですか？" },
    options: [
      { vi: "Khi test là regression ổn định chạy hằng ngày", en: "When it is a stable regression run daily", ja: "毎日実行される安定した回帰テストの場合" },
      { vi: "Khi test có dữ liệu rõ ràng và kết quả xác định", en: "When it has clear data and deterministic outcomes", ja: "明確なデータと決定的な結果を持つ場合" },
      { vi: "Khi test cần chạy trên nhiều cấu hình", en: "When it must run across many configurations", ja: "多数の構成で実行する必要がある場合" },
      { vi: "Khi test chạy một lần, yêu cầu đánh giá con người, hoặc thay đổi liên tục", en: "When it runs once, needs human judgement, or changes constantly", ja: "一度しか実行しない、人間の判断が必要、または頻繁に変わる場合" }
    ],
    answer: 3,
    exp: { vi: "Automation kém giá trị cho test một lần, dựa trên cảm quan, hoặc quá biến động.", en: "Automation adds little value for one-off, judgement-based, or highly volatile tests.", ja: "一度きり、判断依存、変動が激しいテストでは自動化の価値は低いです。" }
  },
  {
    q: { vi: "'Test hook' hoặc điểm mở rộng trong SUT giúp automation thế nào?", en: "How do test hooks or extension points in the SUT help automation?", ja: "SUT内のテストフックや拡張点は自動化をどう助けますか？" },
    options: [
      { vi: "Tăng khả năng kiểm soát và quan sát để dễ tự động hoá và ổn định hơn", en: "Improve controllability and observability, making automation easier and more stable", ja: "制御性と観測性を高め、自動化を容易かつ安定させる" },
      { vi: "Làm SUT chậm hơn có chủ đích", en: "Deliberately slow the SUT", ja: "SUTを意図的に遅くする" },
      { vi: "Xoá dữ liệu người dùng", en: "Delete user data", ja: "ユーザーデータを削除する" },
      { vi: "Loại bỏ nhu cầu môi trường test", en: "Remove the need for a test environment", ja: "テスト環境の必要性をなくす" }
    ],
    answer: 0,
    exp: { vi: "Testability (controllability + observability) là yếu tố then chốt cho automation bền.", en: "Testability (controllability + observability) is key to robust automation.", ja: "テスト容易性（制御性＋観測性）は堅牢な自動化の鍵です。" }
  },
  {
    q: { vi: "Trong CI/CD, bộ test tự động nên được thiết kế thế nào để hữu ích nhất?", en: "In CI/CD, how should the automated test suite be designed to be most useful?", ja: "CI/CDにおいて、自動テストスイートが最も有用となるにはどう設計すべきですか？" },
    options: [
      { vi: "Chậm và phụ thuộc lẫn nhau nhiều nhất có thể", en: "As slow and interdependent as possible", ja: "できる限り遅く相互依存させる" },
      { vi: "Nhanh, đáng tin cậy, độc lập và cho phản hồi rõ ràng khi thất bại", en: "Fast, reliable, independent, with clear failure feedback", ja: "高速・信頼性が高く・独立し、失敗時に明確なフィードバックを返す" },
      { vi: "Chỉ chạy khi phát hành cuối", en: "Run only at final release", ja: "最終リリース時にのみ実行する" },
      { vi: "Không có báo cáo kết quả", en: "With no result reporting", ja: "結果報告を一切行わない" }
    ],
    answer: 1,
    exp: { vi: "Phản hồi nhanh, ổn định giúp phát hiện hồi quy sớm trong pipeline.", en: "Fast, stable feedback catches regressions early in the pipeline.", ja: "高速で安定したフィードバックはパイプライン早期に回帰を捉えます。" }
  },
  {
    q: { vi: "Ai chịu trách nhiệm chính về thiết kế kiến trúc automation theo gTAA?", en: "Who is primarily responsible for automation architecture design per the gTAA role model?", ja: "gTAAの役割モデルにおいて、自動化アーキテクチャ設計を主に担当するのは誰ですか？" },
    options: [
      { vi: "Người dùng cuối", en: "The end user", ja: "エンドユーザー" },
      { vi: "Kế toán trưởng", en: "The chief accountant", ja: "経理部長" },
      { vi: "Test Automation Engineer/Architect (thường là TTA)", en: "The Test Automation Engineer/Architect (often the TTA)", ja: "テスト自動化エンジニア／アーキテクト（多くはTTA）" },
      { vi: "Nhân viên lễ tân", en: "The receptionist", ja: "受付担当者" }
    ],
    answer: 2,
    exp: { vi: "TAE/TAA thiết kế và duy trì TAS; TTA thường đảm nhiệm vai trò kỹ thuật này.", en: "The TAE/TAA designs and maintains the TAS; the TTA often fills this technical role.", ja: "TAE/TAAがTASを設計・維持し、TTAがこの技術的役割を担うことが多いです。" }
  },
  {
    q: { vi: "Chỉ số 'lead' (dẫn báo) khác chỉ số 'lag' (trễ) trong quản lý test thế nào?", en: "How does a 'lead' metric differ from a 'lag' metric in test management?", ja: "テスト管理における「先行（lead）」指標は「遅行（lag）」指標とどう異なりますか？" },
    options: [
      { vi: "Cả hai luôn giống hệt nhau", en: "They are always identical", ja: "両者は常に同一である" },
      { vi: "Lead chỉ dùng cho phần cứng", en: "Lead applies only to hardware", ja: "先行指標はハードウェアにのみ適用される" },
      { vi: "Lag chỉ dùng trong Agile", en: "Lag is used only in Agile", ja: "遅行指標はアジャイルでのみ使われる" },
      { vi: "Lead dự báo kết quả tương lai; lag phản ánh kết quả đã xảy ra", en: "Lead predicts future outcomes; lag reflects outcomes that already happened", ja: "先行指標は将来の結果を予測し、遅行指標は既に起きた結果を反映する" }
    ],
    answer: 3,
    exp: { vi: "Lead giúp can thiệp sớm; lag đánh giá kết quả cuối, cần cân bằng cả hai.", en: "Lead enables early intervention; lag evaluates final outcomes — balance both.", ja: "先行指標は早期介入を可能にし、遅行指標は最終結果を評価する。両者のバランスが重要。" }
  }
];
