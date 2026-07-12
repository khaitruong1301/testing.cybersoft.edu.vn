// ============================================================================
// ISTQB EXT9 — Advanced bổ sung (đạt 400) — 215 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":54,"1":54,"2":54,"3":53}
// ============================================================================
export const DATA = [
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Phương pháp Classification Tree Method (CTM) trong kiểm thử hộp đen chủ yếu dùng để làm gì?",
      "en": "What is the Classification Tree Method (CTM) primarily used for in black-box testing?",
      "ja": "ブラックボックステストにおいて、クラシフィケーションツリー法(CTM)は主に何のために使われますか。"
    },
    "options": [
      {
        "vi": "Mô hình hóa các điều kiện đầu vào thành lớp (class) rồi tổ hợp chúng thành các trường hợp kiểm thử qua bảng kết hợp",
        "en": "Model input conditions as classes, then combine them into test cases via a combination table",
        "ja": "入力条件をクラス(分類項目)としてモデル化し、組み合わせ表を通じてテストケースへと組み合わせるため"
      },
      {
        "vi": "Đo độ phủ nhánh của mã nguồn bằng cây quyết định",
        "en": "Measure source code branch coverage using a decision tree",
        "ja": "決定木を用いてソースコードの分岐網羅率を測定するため"
      },
      {
        "vi": "Tính toán độ phức tạp cyclomatic của chương trình",
        "en": "Calculate the cyclomatic complexity of the program",
        "ja": "プログラムのサイクロマティック複雑度を計算するため"
      },
      {
        "vi": "Xác định số lượng lỗi tồn đọng dựa trên mật độ khiếm khuyết",
        "en": "Estimate the number of remaining defects based on defect density",
        "ja": "欠陥密度に基づいて残存する欠陥数を見積もるため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "CTM tổ chức các khía cạnh đầu vào (classification) và giá trị của chúng (class) thành cây, sau đó dùng bảng kết hợp để chọn tổ hợp thành test case, giúp phủ có hệ thống các tổ hợp điều kiện đầu vào.",
      "en": "CTM organizes input aspects (classifications) and their values (classes) into a tree, then uses a combination table to select combinations for test cases, enabling systematic coverage of input condition combinations.",
      "ja": "CTMは入力の側面(分類項目)とその値(クラス)を木構造に整理し、組み合わせ表を用いてテストケースとなる組み合わせを選択することで、入力条件の組み合わせを体系的に網羅する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong Classification Tree Method, 'classification' và 'class' tương ứng với khái niệm gì trong equivalence partitioning?",
      "en": "In the Classification Tree Method, what do \"classification\" and \"class\" correspond to in equivalence partitioning?",
      "ja": "クラシフィケーションツリー法における「classification(分類項目)」と「class(クラス)」は、同値分割におけるどの概念に対応しますか。"
    },
    "options": [
      {
        "vi": "Class tương ứng với toàn bộ hệ thống, classification tương ứng với một test case",
        "en": "A class corresponds to the whole system, and a classification corresponds to one test case",
        "ja": "クラスはシステム全体に対応し、分類項目は1つのテストケースに対応する"
      },
      {
        "vi": "Classification tương ứng với một khía cạnh/tham số đầu vào cần phân loại, còn class tương ứng với một phân vùng tương đương của khía cạnh đó",
        "en": "A classification corresponds to an input aspect/parameter to be classified, while a class corresponds to an equivalence partition of that aspect",
        "ja": "分類項目(classification)は分類すべき入力側面/パラメータに対応し、クラス(class)はその側面の同値パーティションに対応する"
      },
      {
        "vi": "Class là thứ tự thực thi test case, classification là số lượng test case",
        "en": "A class is the execution order of a test case, and a classification is the number of test cases",
        "ja": "クラスはテストケースの実行順序であり、分類項目はテストケースの数である"
      },
      {
        "vi": "Classification và class là hai tên gọi khác nhau của cùng một khái niệm, không phân biệt",
        "en": "Classification and class are just two different names for the same concept, with no distinction",
        "ja": "分類項目とクラスは同一概念の異なる呼び方に過ぎず、区別はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Classification tương ứng với một tham số/khía cạnh đầu vào (ví dụ \"loại tài khoản\"), còn class là các phân vùng tương đương của tham số đó (ví dụ \"cá nhân\", \"doanh nghiệp\") — CTM về bản chất trực quan hóa equivalence partitioning cho nhiều tham số cùng lúc.",
      "en": "A classification corresponds to an input parameter/aspect (e.g., \"account type\"), while a class represents the equivalence partitions of that parameter (e.g., \"individual\", \"business\") — CTM essentially visualizes equivalence partitioning across multiple parameters at once.",
      "ja": "分類項目は入力パラメータ/側面(例:「アカウント種別」)に対応し、クラスはそのパラメータの同値パーティション(例:「個人」「法人」)である。CTMは本質的に複数パラメータの同値分割を同時に可視化する手法である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong Classification Tree Method, bảng kết hợp (combination table) ở phần dưới cây phân loại có vai trò gì?",
      "en": "In the Classification Tree Method, what is the role of the combination table below the classification tree?",
      "ja": "クラシフィケーションツリー法において、ツリーの下部にある組み合わせ表(combination table)はどのような役割を持ちますか。"
    },
    "options": [
      {
        "vi": "Liệt kê các lỗi đã phát hiện trong quá trình test",
        "en": "List the defects found during testing",
        "ja": "テスト中に発見された欠陥を一覧化する"
      },
      {
        "vi": "Ghi lại thời gian thực thi của từng test case",
        "en": "Record the execution time of each test case",
        "ja": "各テストケースの実行時間を記録する"
      },
      {
        "vi": "Đánh dấu (thường bằng dấu chấm nối các ô) tổ hợp các lớp được chọn cho từng test case, thể hiện đường đi qua cây phân loại",
        "en": "Mark (typically with connected dots) the combination of classes selected for each test case, representing a path through the classification tree",
        "ja": "各テストケースに選ばれたクラスの組み合わせを(通常、セルをつなぐ点で)示し、分類木を通る経路を表す"
      },
      {
        "vi": "Thống kê số lượng requirement được truy vết",
        "en": "Count the number of requirements that have been traced",
        "ja": "トレースされた要件の数を集計する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bảng kết hợp nằm dưới cây, mỗi hàng là một test case; các ô được đánh dấu (dot) tại lớp được chọn cho mỗi classification, nối lại thành đường thể hiện tổ hợp cụ thể của test case đó.",
      "en": "The combination table sits below the tree; each row is a test case, and marked cells (dots) at the selected class for each classification are connected to show that test case's specific combination.",
      "ja": "組み合わせ表はツリーの下に配置され、各行が1つのテストケースを表す。各分類項目で選ばれたクラスのセルに印(ドット)を付け、それらをつないでそのテストケース固有の組み合わせを示す。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Công cụ Classification Tree Editor (CTE) hỗ trợ tester chủ yếu ở công đoạn nào?",
      "en": "Which task does the Classification Tree Editor (CTE) tool mainly support for testers?",
      "ja": "クラシフィケーションツリーエディタ(CTE)ツールは、テスターの主にどの作業を支援しますか。"
    },
    "options": [
      {
        "vi": "Sinh mã nguồn tự động từ test case",
        "en": "Automatically generate source code from test cases",
        "ja": "テストケースからソースコードを自動生成する"
      },
      {
        "vi": "Phân tích log server để tìm nguyên nhân gốc rễ lỗi",
        "en": "Analyze server logs to find the root cause of defects",
        "ja": "サーバーログを解析して欠陥の根本原因を特定する"
      },
      {
        "vi": "Chạy test tự động trên trình duyệt",
        "en": "Automatically execute tests in a browser",
        "ja": "ブラウザ上でテストを自動実行する"
      },
      {
        "vi": "Vẽ cây phân loại, quản lý các lớp và tạo/quản lý bảng kết hợp test case một cách trực quan",
        "en": "Draw the classification tree, manage classes, and visually create/manage the test case combination table",
        "ja": "分類木を描画し、クラスを管理し、テストケースの組み合わせ表を視覚的に作成・管理する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "CTE là công cụ đồ họa chuyên dụng giúp xây dựng cây phân loại, thêm/sửa lớp và trực quan hóa việc chọn tổ hợp cho test case trong bảng kết hợp, chứ không thực thi test hay sinh mã.",
      "en": "CTE is a specialized graphical tool for building the classification tree, adding/editing classes, and visualizing combination selections in the combination table — it does not execute tests or generate code.",
      "ja": "CTEは分類木の構築、クラスの追加・編集、組み合わせ表におけるテストケースの組み合わせ選択の可視化を支援する専用グラフィカルツールであり、テストの実行やコード生成は行わない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mảng trực giao (orthogonal array) trong thiết kế test tổ hợp có đặc điểm gì?",
      "en": "What characterizes an orthogonal array in combinatorial test design?",
      "ja": "組み合わせテスト設計における直交表(orthogonal array)の特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Mọi cặp giá trị của hai yếu tố bất kỳ xuất hiện cùng số lần như nhau trong tập các hàng (test case)",
        "en": "Every pair of values from any two factors appears an equal number of times across the set of rows (test cases)",
        "ja": "任意の2つの因子の値の組がすべて、行(テストケース)の集合の中で同じ回数だけ出現する"
      },
      {
        "vi": "Chỉ chứa các giá trị biên của từng tham số",
        "en": "It contains only the boundary values of each parameter",
        "ja": "各パラメータの境界値のみを含む"
      },
      {
        "vi": "Là một bảng quyết định được rút gọn bằng cách loại bỏ luật dư thừa",
        "en": "It is a decision table reduced by removing redundant rules",
        "ja": "冗長なルールを取り除いて縮約した決定表である"
      },
      {
        "vi": "Là danh sách toàn bộ tổ hợp có thể có của các tham số",
        "en": "It is a list of all possible combinations of the parameters",
        "ja": "パラメータのすべての可能な組み合わせを列挙したものである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tính \"trực giao\" nghĩa là các cặp giá trị giữa hai yếu tố bất kỳ được phân bố cân bằng (số lần xuất hiện bằng nhau), đây là nền tảng toán học để đạt độ phủ pairwise (hoặc cao hơn) với số test case tối thiểu.",
      "en": "\"Orthogonality\" means value pairs between any two factors are evenly distributed (equal occurrence counts) — this is the mathematical basis for achieving pairwise (or higher) coverage with a minimal number of test cases.",
      "ja": "「直交性」とは、任意の2因子間の値の組が均等に分布(出現回数が等しい)していることを意味し、最小のテストケース数でペアワイズ(またはそれ以上)の網羅率を達成するための数学的基盤となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một mảng trực giao có 'strength' (bậc) bằng 3 khác gì so với mảng có strength bằng 2?",
      "en": "How does an orthogonal array with strength 3 differ from one with strength 2?",
      "ja": "強度(strength)が3の直交表は、強度が2の直交表とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Strength 3 chỉ áp dụng được cho tối đa 3 tham số đầu vào",
        "en": "Strength 3 can only be applied to at most 3 input parameters",
        "ja": "強度3は最大3個の入力パラメータにしか適用できない"
      },
      {
        "vi": "Strength 3 đảm bảo phủ mọi tổ hợp giá trị của bất kỳ 3 yếu tố nào cùng lúc, mạnh hơn việc chỉ phủ mọi cặp (2 yếu tố) như strength 2",
        "en": "Strength 3 guarantees coverage of every value combination of any 3 factors at once, which is stronger than covering only every pair (2 factors) as strength 2 does",
        "ja": "強度3は任意の3因子の値の組み合わせをすべて同時に網羅することを保証し、強度2(2因子のペアのみを網羅)より強力である"
      },
      {
        "vi": "Strength 3 nghĩa là mỗi test case chạy 3 lần để tăng độ tin cậy",
        "en": "Strength 3 means each test case is run 3 times to increase reliability",
        "ja": "強度3とは、信頼性を高めるために各テストケースを3回実行することを意味する"
      },
      {
        "vi": "Strength càng cao thì số test case càng giảm",
        "en": "The higher the strength, the fewer the test cases required",
        "ja": "強度が高いほどテストケース数は減少する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Strength (bậc t) của mảng trực giao xác định số yếu tố được phủ đồng thời: t=2 là pairwise, t=3 phủ mọi tổ hợp 3 yếu tố — độ phủ mạnh hơn nhưng đòi hỏi nhiều test case hơn strength 2.",
      "en": "The strength (t) of an orthogonal array defines how many factors are covered simultaneously: t=2 is pairwise, t=3 covers every 3-factor combination — stronger coverage but requiring more test cases than strength 2.",
      "ja": "直交表の強度(t)は同時に網羅する因子数を定める。t=2はペアワイズ、t=3は3因子のすべての組み合わせを網羅する。網羅は強くなるが、強度2より多くのテストケースが必要となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Kỹ thuật n-wise testing (ví dụ 3-wise) khác pairwise testing như thế nào?",
      "en": "How does n-wise testing (e.g., 3-wise) differ from pairwise testing?",
      "ja": "n-wiseテスト(例:3-wise)はペアワイズテストとどう異なりますか。"
    },
    "options": [
      {
        "vi": "N-wise chỉ kiểm tra giá trị hợp lệ, pairwise kiểm tra cả giá trị không hợp lệ",
        "en": "N-wise only tests valid values, while pairwise also tests invalid values",
        "ja": "n-wiseは有効値のみをテストし、ペアワイズは無効値もテストする"
      },
      {
        "vi": "N-wise là tên gọi khác của kiểm thử toàn tổ hợp (exhaustive)",
        "en": "N-wise is just another name for exhaustive (full combination) testing",
        "ja": "n-wiseは全数(網羅的)テストの別名にすぎない"
      },
      {
        "vi": "N-wise testing yêu cầu mọi tổ hợp của n tham số (n>2) cùng xuất hiện ít nhất một lần, giúp phát hiện lỗi tương tác phức tạp hơn nhưng số test case tăng đáng kể so với pairwise",
        "en": "N-wise testing requires every combination of n parameters (n>2) to appear together at least once, catching more complex interaction defects but significantly increasing the number of test cases compared to pairwise",
        "ja": "n-wiseテストはn個(n>2)のパラメータのすべての組み合わせが少なくとも1回同時に出現することを要求し、より複雑な相互作用による欠陥を検出できるが、ペアワイズに比べテストケース数が大幅に増加する"
      },
      {
        "vi": "N-wise chỉ dùng được khi tất cả tham số có cùng số giá trị",
        "en": "N-wise can only be used when all parameters have the same number of values",
        "ja": "n-wiseはすべてのパラメータが同じ数の値を持つ場合にしか使用できない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "N-wise mở rộng pairwise (2-wise) lên n tham số cùng lúc, tăng khả năng phát hiện lỗi tương tác đa biến nhưng đánh đổi bằng số lượng test case lớn hơn nhiều.",
      "en": "N-wise extends pairwise (2-wise) to n parameters simultaneously, increasing the ability to detect multi-variable interaction defects at the cost of a much larger number of test cases.",
      "ja": "n-wiseはペアワイズ(2-wise)をn個のパラメータへ同時に拡張するもので、多変数相互作用の欠陥検出力を高める一方、テストケース数が大幅に増えるというトレードオフがある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Thuật toán IPOG (In-Parameter-Order-General) được dùng để làm gì trong kiểm thử tổ hợp?",
      "en": "What is the IPOG (In-Parameter-Order-General) algorithm used for in combinatorial testing?",
      "ja": "組み合わせテストにおいて、IPOG(In-Parameter-Order-General)アルゴリズムは何のために使われますか。"
    },
    "options": [
      {
        "vi": "Tính độ phức tạp cyclomatic của một hàm",
        "en": "Calculate the cyclomatic complexity of a function",
        "ja": "関数のサイクロマティック複雑度を計算するため"
      },
      {
        "vi": "Sắp xếp thứ tự ưu tiên các yêu cầu (requirement) theo rủi ro",
        "en": "Prioritize requirements based on risk",
        "ja": "リスクに基づいて要件の優先順位を決めるため"
      },
      {
        "vi": "Chuyển đổi bảng quyết định sang cây phân loại",
        "en": "Convert a decision table into a classification tree",
        "ja": "決定表を分類木に変換するため"
      },
      {
        "vi": "Sinh tự động một tập test case nhỏ đạt độ phủ t-wise (ví dụ pairwise) bằng cách thêm dần từng tham số vào tập test hiện có",
        "en": "Automatically generate a small test case set achieving t-wise coverage (e.g., pairwise) by incrementally adding one parameter at a time to the existing test set",
        "ja": "既存のテストセットに1つずつパラメータを追加していくことで、t-wise網羅(例:ペアワイズ)を達成する小さなテストケース集合を自動生成するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "IPOG là một thuật toán phổ biến trong các công cụ sinh test tổ hợp (như ACTS, PICT dùng biến thể tương tự): xây tập test cho vài tham số đầu, sau đó lần lượt mở rộng thêm từng tham số mới trong khi vẫn giữ độ phủ t-wise với số test case gần tối thiểu.",
      "en": "IPOG is a common algorithm in combinatorial test generation tools (such as ACTS, with PICT using a similar approach): it builds a test set for the first few parameters, then incrementally extends it with each new parameter while maintaining t-wise coverage with a near-minimal number of test cases.",
      "ja": "IPOGは組み合わせテスト生成ツール(ACTSなど、PICTも類似の手法を用いる)で一般的なアルゴリズムであり、最初の数パラメータに対するテストセットを構築した後、新しいパラメータを1つずつ追加しながらt-wise網羅をほぼ最小のテストケース数で維持する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thiết kế pairwise, một số tổ hợp giá trị giữa hai tham số là không thể xảy ra trong thực tế (ví dụ hệ điều hành iOS không đi cùng trình duyệt Internet Explorer). Cần xử lý điều này thế nào?",
      "en": "When designing pairwise tests, some value combinations between two parameters cannot occur in reality (e.g., the iOS operating system never pairs with the Internet Explorer browser). How should this be handled?",
      "ja": "ペアワイズ設計において、2つのパラメータ間の一部の値の組み合わせは現実には起こり得ない(例:iOS OSとInternet Explorerブラウザの組み合わせ)。これはどのように扱うべきですか。"
    },
    "options": [
      {
        "vi": "Khai báo các ràng buộc (constraints) loại trừ tổ hợp đó khỏi công cụ sinh test, tránh tạo test case vô nghĩa",
        "en": "Declare constraints that exclude that combination from the test generation tool, avoiding meaningless test cases",
        "ja": "そのテスト生成ツールに制約(constraints)を宣言してその組み合わせを除外し、無意味なテストケースの生成を避ける"
      },
      {
        "vi": "Bỏ qua, vì pairwise luôn sinh test case hợp lệ",
        "en": "Ignore it, since pairwise always generates valid test cases",
        "ja": "無視してよい。ペアワイズは常に有効なテストケースを生成するため"
      },
      {
        "vi": "Thêm tham số mới để che giấu tổ hợp không hợp lệ",
        "en": "Add a new parameter to hide the invalid combination",
        "ja": "無効な組み合わせを隠すために新しいパラメータを追加する"
      },
      {
        "vi": "Chuyển toàn bộ sang kiểm thử toàn tổ hợp để không cần quan tâm ràng buộc",
        "en": "Switch entirely to full combination testing so constraints no longer matter",
        "ja": "制約を気にしなくて済むよう、全数組み合わせテストに完全に切り替える"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Hầu hết công cụ sinh pairwise (PICT, ACTS...) hỗ trợ khai báo constraint để loại các tổ hợp bất khả thi, đảm bảo tập test sinh ra chỉ gồm các tổ hợp có ý nghĩa thực tế.",
      "en": "Most pairwise generation tools (PICT, ACTS, etc.) support declaring constraints to exclude infeasible combinations, ensuring the generated test set contains only realistically meaningful combinations.",
      "ja": "ほとんどのペアワイズ生成ツール(PICT、ACTSなど)は、実現不可能な組み合わせを除外するための制約宣言をサポートしており、生成されるテストセットが現実的に意味のある組み合わせのみで構成されるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Kỹ thuật 'seeding' khi sinh test pairwise nghĩa là gì?",
      "en": "What does the \"seeding\" technique mean when generating pairwise tests?",
      "ja": "ペアワイズテスト生成における「シーディング(seeding)」技法とは何を意味しますか。"
    },
    "options": [
      {
        "vi": "Xóa ngẫu nhiên một số test case để giảm chi phí",
        "en": "Randomly deleting some test cases to reduce cost",
        "ja": "コスト削減のためにテストケースをランダムに削除すること"
      },
      {
        "vi": "Chỉ định trước một số tổ hợp/test case bắt buộc phải có (ví dụ theo kinh nghiệm hoặc rủi ro cao) để công cụ sinh test bổ sung phần còn lại xung quanh chúng",
        "en": "Pre-specifying certain combinations/test cases that must be included (e.g., based on experience or high risk), so the generation tool builds the rest of the test set around them",
        "ja": "(経験やリスクの高さに基づいて)必ず含めるべき組み合わせ/テストケースを事前に指定し、テスト生成ツールがそれらを中心に残りのテストセットを補完すること"
      },
      {
        "vi": "Gán trọng số ngẫu nhiên cho từng giá trị tham số",
        "en": "Assigning random weights to each parameter value",
        "ja": "各パラメータ値にランダムな重みを割り当てること"
      },
      {
        "vi": "Chạy thử nghiệm với dữ liệu giả (seed data) trên môi trường staging",
        "en": "Running trials with seed data on a staging environment",
        "ja": "ステージング環境でシードデータを用いて試験を実行すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Seeding cho phép tester ép buộc một số tổ hợp quan trọng (ví dụ test case đã biết dễ gây lỗi) luôn có mặt trong bộ test, còn công cụ chỉ cần tối ưu sinh thêm test case để đạt độ phủ pairwise cho phần còn lại.",
      "en": "Seeding lets testers force certain important combinations (e.g., known error-prone test cases) to always be included in the test set, while the tool only needs to optimize generation of additional cases to reach pairwise coverage for the rest.",
      "ja": "シーディングにより、テスターは重要な組み合わせ(例:既知の欠陥が起きやすいテストケース)を必ずテストセットに含めることができ、ツールは残りの部分についてペアワイズ網羅を達成するための追加テストケース生成のみを最適化すればよい。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một bảng quyết định lớn, khi nhiều luật cho cùng một kết quả và một số điều kiện không ảnh hưởng đến kết quả đó, kỹ thuật nào giúp thu gọn bảng?",
      "en": "In a large decision table, when several rules produce the same outcome and some conditions do not affect that outcome, which technique helps collapse the table?",
      "ja": "大規模な決定表において、複数のルールが同じ結果をもたらし、一部の条件がその結果に影響しない場合、表を縮約するのに役立つ技法は何ですか。"
    },
    "options": [
      {
        "vi": "Xóa bớt hàng ngẫu nhiên để giảm kích thước bảng",
        "en": "Randomly delete rows to reduce the table's size",
        "ja": "表のサイズを減らすため、行をランダムに削除する"
      },
      {
        "vi": "Chuyển toàn bộ bảng quyết định sang cây phân loại",
        "en": "Convert the entire decision table into a classification tree",
        "ja": "決定表全体を分類木に変換する"
      },
      {
        "vi": "Thêm luật ELSE/default và dùng ký hiệu 'không quan tâm' (don't care) để gộp các luật tương đương thành một luật rút gọn",
        "en": "Add an ELSE/default rule and use \"don't care\" markers to merge equivalent rules into a single collapsed rule",
        "ja": "ELSE/デフォルトルールを追加し、「ドントケア(don't care)」記号を使って同等のルールを1つの縮約ルールにまとめる"
      },
      {
        "vi": "Tăng số điều kiện để bảng chi tiết hơn",
        "en": "Increase the number of conditions to make the table more detailed",
        "ja": "表をより詳細にするため条件の数を増やす"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi một điều kiện không ảnh hưởng đến kết quả trong một nhóm luật, có thể đánh dấu 'không quan tâm' (-) cho điều kiện đó và gộp các luật lại thành một luật thu gọn (collapsed rule), giúp bảng quyết định gọn hơn mà vẫn giữ đầy đủ ngữ nghĩa.",
      "en": "When a condition does not affect the outcome within a group of rules, it can be marked as \"don't care\" (-) and the rules merged into one collapsed rule, making the decision table more compact while preserving its full semantics.",
      "ja": "あるグループのルールにおいて、ある条件が結果に影響を与えない場合、その条件を「ドントケア」(-)として印を付け、ルールを1つの縮約ルールにまとめることができる。これにより、意味を完全に保ちながら決定表をより簡潔にできる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Hai luật trong bảng quyết định được coi là dư thừa (redundant) khi nào?",
      "en": "When are two rules in a decision table considered redundant?",
      "ja": "決定表における2つのルールが冗長(redundant)であるとみなされるのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi chúng có điều kiện khác nhau nhưng cùng hành động",
        "en": "When they have different conditions but the same action",
        "ja": "条件が異なるが行動(アクション)が同じである場合"
      },
      {
        "vi": "Khi chúng có cùng tổ hợp điều kiện nhưng hành động khác nhau",
        "en": "When they have the same condition combination but different actions",
        "ja": "条件の組み合わせは同じだが行動が異なる場合"
      },
      {
        "vi": "Khi số lượng điều kiện nhiều hơn số hành động",
        "en": "When the number of conditions exceeds the number of actions",
        "ja": "条件の数が行動の数より多い場合"
      },
      {
        "vi": "Khi một luật là tổ hợp con của luật khác và cả hai luôn dẫn đến cùng một hành động, khiến một luật trở nên không cần thiết",
        "en": "When one rule is a sub-combination of another and both always lead to the same action, making one rule unnecessary",
        "ja": "あるルールが別のルールの部分的な組み合わせであり、両方が常に同じ行動に至る場合、一方のルールが不要になる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Redundancy xảy ra khi một luật bị 'bao phủ' hoàn toàn về mặt logic bởi luật khác (cùng dẫn đến cùng hành động), nên có thể loại bỏ mà không mất thông tin — khác với inconsistency (cùng điều kiện nhưng khác hành động, là lỗi cần sửa).",
      "en": "Redundancy occurs when one rule is logically fully \"covered\" by another (both leading to the same action), so it can be removed without losing information — unlike inconsistency (same conditions but different actions, which is a defect to fix).",
      "ja": "冗長性は、あるルールが別のルールによって論理的に完全に「包含」されている(両方が同じ行動に至る)場合に生じ、情報を失わずに削除できる。これは非一貫性(同じ条件で異なる行動、修正すべき欠陥)とは異なる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Bảng quyết định bị coi là không nhất quán (inconsistent) khi nào?",
      "en": "When is a decision table considered inconsistent?",
      "ja": "決定表が非一貫的(inconsistent)であるとみなされるのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi cùng một tổ hợp điều kiện lại dẫn tới hai hành động khác nhau ở hai luật khác nhau",
        "en": "When the same condition combination leads to two different actions in two different rules",
        "ja": "同じ条件の組み合わせが、異なる2つのルールにおいて2つの異なる行動に至る場合"
      },
      {
        "vi": "Khi số cột nhiều hơn số hàng",
        "en": "When there are more columns than rows",
        "ja": "列の数が行の数より多い場合"
      },
      {
        "vi": "Khi có luật ELSE ở cuối bảng",
        "en": "When there is an ELSE rule at the end of the table",
        "ja": "表の末尾にELSEルールがある場合"
      },
      {
        "vi": "Khi các điều kiện được sắp xếp không theo thứ tự bảng chữ cái",
        "en": "When the conditions are not sorted alphabetically",
        "ja": "条件がアルファベット順に並んでいない場合"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Inconsistency là lỗi logic nghiêm trọng: cùng một tình huống đầu vào nhưng bảng lại quy định hai kết quả khác nhau, cần được phát hiện và sửa trong quá trình review bảng quyết định.",
      "en": "Inconsistency is a serious logic defect: the same input situation is specified to produce two different outcomes, and must be detected and fixed during decision table review.",
      "ja": "非一貫性は深刻な論理上の欠陥であり、同じ入力状況に対して表が2つの異なる結果を規定していることを意味する。決定表のレビュー過程で検出し修正する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong Classification Tree Method, một test case cụ thể được biểu diễn như thế nào trên cây phân loại?",
      "en": "In the Classification Tree Method, how is a specific test case represented on the classification tree?",
      "ja": "クラシフィケーションツリー法において、特定のテストケースは分類木上でどのように表現されますか。"
    },
    "options": [
      {
        "vi": "Là một nút lá duy nhất của cây",
        "en": "As a single leaf node of the tree",
        "ja": "木の単一の葉ノードとして"
      },
      {
        "vi": "Là việc chọn đúng một lớp (class) cho mỗi classification, thể hiện bằng một đường/tổ hợp đánh dấu trong bảng kết hợp bên dưới cây",
        "en": "As the selection of exactly one class for each classification, shown as a marked path/combination in the combination table below the tree",
        "ja": "各分類項目に対してちょうど1つのクラスを選択することとして表現され、木の下にある組み合わせ表に印付けられた経路/組み合わせとして示される"
      },
      {
        "vi": "Là toàn bộ các nhánh của cây gộp lại",
        "en": "As the entirety of all branches of the tree combined",
        "ja": "木のすべての枝をまとめたものとして"
      },
      {
        "vi": "Là số thứ tự của classification trong cây",
        "en": "As the sequential index number of a classification in the tree",
        "ja": "木における分類項目の連番として"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mỗi test case chọn đúng một class cho mỗi classification (khía cạnh đầu vào); tổ hợp các lựa chọn đó được đánh dấu thành một đường trong bảng kết hợp, không phải một nút đơn lẻ.",
      "en": "Each test case selects exactly one class for each classification (input aspect); this combination of selections is marked as a path in the combination table, not a single node.",
      "ja": "各テストケースは各分類項目(入力側面)に対してちょうど1つのクラスを選択する。この選択の組み合わせは、単一のノードではなく、組み合わせ表内の経路として印付けられる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Điểm khác biệt chính giữa Classification Tree Method và kỹ thuật phân vùng tương đương (equivalence partitioning) đơn lẻ là gì?",
      "en": "What is the key difference between the Classification Tree Method and standalone equivalence partitioning?",
      "ja": "クラシフィケーションツリー法と単独の同値分割技法との主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "CTM không dùng khái niệm lớp tương đương",
        "en": "CTM does not use the concept of equivalence classes",
        "ja": "CTMは同値クラスという概念を使用しない"
      },
      {
        "vi": "CTM chỉ áp dụng cho kiểm thử hiệu năng",
        "en": "CTM is only applicable to performance testing",
        "ja": "CTMは性能テストにのみ適用できる"
      },
      {
        "vi": "CTM mở rộng equivalence partitioning bằng cách tổ chức các lớp của nhiều khía cạnh đầu vào thành cấu trúc cây và tường minh hóa việc tổ hợp chúng thành test case",
        "en": "CTM extends equivalence partitioning by organizing classes from multiple input aspects into a tree structure and explicitly making their combination into test cases visible",
        "ja": "CTMは複数の入力側面のクラスを木構造に整理し、それらをテストケースへ組み合わせる過程を明示化することで、同値分割を拡張したものである"
      },
      {
        "vi": "CTM yêu cầu bắt buộc phải có mã nguồn để phân tích",
        "en": "CTM mandatorily requires source code for analysis",
        "ja": "CTMは分析にソースコードを必須とする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Equivalence partitioning thường chỉ xử lý từng tham số riêng lẻ; CTM đưa các lớp tương đương của nhiều tham số vào một cây và tường minh hóa việc chọn tổ hợp qua bảng kết hợp, giúp quản lý tổ hợp có hệ thống hơn.",
      "en": "Equivalence partitioning typically handles parameters individually; CTM brings equivalence classes from multiple parameters into a single tree and makes combination selection explicit via the combination table, enabling more systematic combination management.",
      "ja": "同値分割は通常、パラメータを個別に扱う。CTMは複数パラメータの同値クラスを1つの木にまとめ、組み合わせ表を通じて組み合わせの選択を明示化することで、より体系的な組み合わせ管理を可能にする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Với một hệ thống có 5 tham số, mỗi tham số 4 giá trị, kiểm thử toàn tổ hợp cần 4^5 = 1024 test case. Pairwise testing giải quyết vấn đề bùng nổ tổ hợp này bằng cách nào?",
      "en": "For a system with 5 parameters, each having 4 values, full combination testing requires 4^5 = 1024 test cases. How does pairwise testing address this combinatorial explosion?",
      "ja": "5個のパラメータがあり、それぞれ4つの値を持つシステムでは、全数組み合わせテストには4^5=1024個のテストケースが必要です。ペアワイズテストはこの組み合わせ爆発の問題をどのように解決しますか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm tra tham số quan trọng nhất, bỏ qua các tham số còn lại",
        "en": "By testing only the most important parameter and ignoring the rest",
        "ja": "最も重要なパラメータのみをテストし、残りを無視することによって"
      },
      {
        "vi": "Chạy test song song trên nhiều máy để giảm thời gian",
        "en": "By running tests in parallel across multiple machines to reduce execution time",
        "ja": "複数のマシンでテストを並列実行して時間を短縮することによって"
      },
      {
        "vi": "Loại bỏ các tham số có ít giá trị nhất",
        "en": "By eliminating the parameters with the fewest values",
        "ja": "値の数が最も少ないパラメータを排除することによって"
      },
      {
        "vi": "Sinh tập test case nhỏ hơn nhiều sao cho mọi cặp giá trị giữa hai tham số bất kỳ đều xuất hiện ít nhất một lần, dựa trên giả định phần lớn lỗi phát sinh từ tương tác giữa 2 tham số",
        "en": "By generating a much smaller test set such that every pair of values between any two parameters appears at least once, based on the assumption that most defects arise from two-parameter interactions",
        "ja": "任意の2つのパラメータ間のすべての値の組が少なくとも1回出現するような、はるかに小さいテストセットを生成することによって。これは、ほとんどの欠陥が2パラメータ間の相互作用から生じるという前提に基づく"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Pairwise không kiểm tra mọi tổ hợp mà chỉ đảm bảo mọi cặp giá trị giữa hai tham số bất kỳ được phủ ít nhất một lần, thường giảm số test case xuống còn vài chục thay vì hàng nghìn, nhờ giả định phần lớn lỗi liên quan đến tương tác cặp đôi.",
      "en": "Pairwise does not test every combination but only ensures that every pair of values between any two parameters is covered at least once, typically reducing the test count to a few dozen instead of thousands, based on the assumption that most defects stem from pairwise interactions.",
      "ja": "ペアワイズはすべての組み合わせをテストするのではなく、任意の2つのパラメータ間のすべての値の組が少なくとも1回網羅されることのみを保証する。ほとんどの欠陥がペア間の相互作用に起因するという前提により、テストケース数を通常、数千から数十程度にまで削減できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong tình huống nào, chỉ áp dụng pairwise testing có thể KHÔNG đủ để đảm bảo chất lượng?",
      "en": "In which situation might applying only pairwise testing be INSUFFICIENT to ensure quality?",
      "ja": "どのような状況では、ペアワイズテストのみの適用では品質を保証するのに不十分な可能性がありますか。"
    },
    "options": [
      {
        "vi": "Khi có bằng chứng hoặc rủi ro cao rằng lỗi phát sinh từ tương tác đồng thời giữa ba tham số trở lên, lúc đó cần n-wise (n≥3) hoặc kiểm thử theo kịch bản bổ sung",
        "en": "When there is evidence or high risk that defects arise from the simultaneous interaction of three or more parameters, requiring n-wise (n≥3) or additional scenario-based testing",
        "ja": "3つ以上のパラメータの同時相互作用から欠陥が生じるという証拠または高いリスクがある場合。この場合、n-wise(n≥3)または追加のシナリオベーステストが必要となる"
      },
      {
        "vi": "Khi hệ thống có nhiều tham số nhưng tương tác đơn giản",
        "en": "When the system has many parameters but simple interactions",
        "ja": "システムに多くのパラメータがあるが、相互作用が単純な場合"
      },
      {
        "vi": "Khi số lượng tham số nhỏ hơn 3",
        "en": "When the number of parameters is fewer than 3",
        "ja": "パラメータ数が3未満の場合"
      },
      {
        "vi": "Khi tất cả tham số chỉ có 2 giá trị (boolean)",
        "en": "When all parameters have only 2 values (boolean)",
        "ja": "すべてのパラメータが2つの値(ブール値)しか持たない場合"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Pairwise dựa trên giả định lỗi chủ yếu từ tương tác cặp; nếu có rủi ro/bằng chứng về tương tác bậc cao hơn (3 tham số trở lên), cần bổ sung n-wise hoặc kiểm thử theo kịch bản để không bỏ sót lỗi.",
      "en": "Pairwise relies on the assumption that defects mainly arise from pairwise interactions; if there is risk/evidence of higher-order interactions (3+ parameters), n-wise or scenario-based testing must be added to avoid missing defects.",
      "ja": "ペアワイズは欠陥が主にペア間の相互作用から生じるという前提に基づく。3つ以上のパラメータによる高次の相互作用のリスクや証拠がある場合は、欠陥の見逃しを防ぐためにn-wiseまたはシナリオベースのテストを追加する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "So với thuật toán AllPairs (thường dùng heuristic), mảng trực giao (orthogonal array) có đặc điểm gì khác biệt?",
      "en": "Compared to the AllPairs algorithm (typically heuristic-based), what distinguishes an orthogonal array?",
      "ja": "(通常ヒューリスティックを用いる)AllPairsアルゴリズムと比較して、直交表(orthogonal array)にはどのような違いがありますか。"
    },
    "options": [
      {
        "vi": "Mảng trực giao luôn cho ra số test case ít hơn AllPairs trong mọi trường hợp",
        "en": "An orthogonal array always produces fewer test cases than AllPairs in every case",
        "ja": "直交表は常にあらゆる場合においてAllPairsよりも少ないテストケース数を生み出す"
      },
      {
        "vi": "Mảng trực giao là cấu trúc toán học có tính cân bằng nghiêm ngặt (mỗi cặp giá trị xuất hiện đúng số lần bằng nhau), trong khi AllPairs chỉ đảm bảo mỗi cặp xuất hiện ít nhất một lần mà không nhất thiết cân bằng",
        "en": "An orthogonal array is a strictly balanced mathematical structure (every value pair appears exactly the same number of times), while AllPairs only guarantees each pair appears at least once, without necessarily being balanced",
        "ja": "直交表は厳密に均衡のとれた数学的構造(すべての値の組が正確に同じ回数出現する)であるのに対し、AllPairsは各組が少なくとも1回出現することのみを保証し、必ずしも均衡がとれているわけではない"
      },
      {
        "vi": "AllPairs chỉ dùng được cho dữ liệu số, mảng trực giao dùng cho dữ liệu chuỗi",
        "en": "AllPairs can only be used for numeric data, while orthogonal arrays are used for string data",
        "ja": "AllPairsは数値データにしか使用できず、直交表は文字列データに使用される"
      },
      {
        "vi": "Hai kỹ thuật hoàn toàn giống nhau về bản chất toán học",
        "en": "The two techniques are essentially identical in their mathematical nature",
        "ja": "この2つの技法は数学的本質において完全に同一である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mảng trực giao đòi hỏi cấu trúc toán học nghiêm ngặt (cân bằng tuyệt đối) và thường chỉ tồn tại cho một số cấu hình tham số/giá trị nhất định, còn AllPairs là thuật toán heuristic linh hoạt hơn, áp dụng được cho hầu hết cấu hình dù không đảm bảo cân bằng tuyệt đối.",
      "en": "Orthogonal arrays require strict mathematical structure (perfect balance) and typically only exist for certain parameter/value configurations, whereas AllPairs is a more flexible heuristic algorithm applicable to nearly any configuration, though without guaranteeing perfect balance.",
      "ja": "直交表は厳密な数学的構造(完全な均衡)を要求し、通常は特定のパラメータ/値の構成に対してのみ存在する。一方AllPairsはより柔軟なヒューリスティックアルゴリズムであり、完全な均衡は保証しないもののほぼあらゆる構成に適用できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mảng trực giao hỗn hợp mức (mixed-level orthogonal array) được dùng khi nào?",
      "en": "When is a mixed-level orthogonal array used?",
      "ja": "混合水準直交表(mixed-level orthogonal array)はどのような場合に使用されますか。"
    },
    "options": [
      {
        "vi": "Khi tất cả tham số có cùng một số lượng giá trị",
        "en": "When all parameters have the same number of values",
        "ja": "すべてのパラメータが同じ数の値を持つ場合"
      },
      {
        "vi": "Khi hệ thống chỉ có một tham số duy nhất",
        "en": "When the system has only a single parameter",
        "ja": "システムに単一のパラメータしかない場合"
      },
      {
        "vi": "Khi các tham số đầu vào có số lượng giá trị (mức) khác nhau, ví dụ tham số A có 2 giá trị còn tham số B có 4 giá trị",
        "en": "When input parameters have different numbers of values (levels), e.g., parameter A has 2 values while parameter B has 4 values",
        "ja": "入力パラメータの値(水準)の数が異なる場合。例えば、パラメータAは2つの値、パラメータBは4つの値を持つ"
      },
      {
        "vi": "Khi cần kiểm thử bảo mật thay vì kiểm thử chức năng",
        "en": "When security testing is needed instead of functional testing",
        "ja": "機能テストではなくセキュリティテストが必要な場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mảng trực giao thuần túy (fixed-level) giả định mọi tham số có cùng số mức; trong thực tế các tham số thường có số giá trị khác nhau, nên cần mảng hỗn hợp mức để vẫn giữ tính cân bằng tổ hợp.",
      "en": "A pure (fixed-level) orthogonal array assumes all parameters have the same number of levels; in practice, parameters often have differing numbers of values, so a mixed-level array is needed to maintain combinatorial balance.",
      "ja": "純粋な(固定水準)直交表はすべてのパラメータが同じ水準数を持つことを前提とする。実際にはパラメータの値の数が異なることが多いため、組み合わせの均衡を維持するために混合水準直交表が必要となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi số lượng tổ hợp có thể có trong bảng kết hợp của cây phân loại quá lớn để test hết, Test Analyst nên làm gì?",
      "en": "When the number of possible combinations in a classification tree's combination table is too large to test exhaustively, what should a Test Analyst do?",
      "ja": "分類木の組み合わせ表における可能な組み合わせの数が多すぎてすべてをテストできない場合、テストアナリストは何をすべきですか。"
    },
    "options": [
      {
        "vi": "Chọn ngẫu nhiên hoàn toàn các tổ hợp mà không cần tiêu chí",
        "en": "Select combinations completely at random without any criteria",
        "ja": "基準を設けずに完全にランダムに組み合わせを選択する"
      },
      {
        "vi": "Chỉ test tổ hợp đầu tiên và tổ hợp cuối cùng trong bảng",
        "en": "Test only the first and last combinations in the table",
        "ja": "表の最初と最後の組み合わせのみをテストする"
      },
      {
        "vi": "Hủy bỏ classification tree và quay lại kiểm thử thăm dò hoàn toàn",
        "en": "Abandon the classification tree entirely and revert to purely exploratory testing",
        "ja": "分類木を完全に放棄し、純粋な探索的テストに戻る"
      },
      {
        "vi": "Áp dụng phân tích rủi ro để ưu tiên các tổ hợp có khả năng gây lỗi cao hoặc tác động nghiệp vụ lớn, kết hợp với tiêu chí phủ (ví dụ mỗi lớp xuất hiện ít nhất một lần, hoặc pairwise giữa các classification)",
        "en": "Apply risk analysis to prioritize combinations with high defect likelihood or major business impact, combined with coverage criteria (e.g., each class appears at least once, or pairwise among classifications)",
        "ja": "リスク分析を適用し、欠陥発生の可能性が高い、またはビジネスへの影響が大きい組み合わせを優先し、網羅基準(各クラスが少なくとも1回出現する、または分類項目間のペアワイズなど)と組み合わせる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi không thể test hết tổ hợp, Test Analyst kết hợp phân tích rủi ro (ưu tiên tổ hợp quan trọng/nguy hiểm) với tiêu chí phủ có hệ thống (each-class hoặc pairwise) để chọn tập con test case đại diện và hiệu quả.",
      "en": "When exhaustive testing of all combinations is not feasible, a Test Analyst combines risk analysis (prioritizing important/dangerous combinations) with systematic coverage criteria (each-class or pairwise) to select a representative, efficient subset of test cases.",
      "ja": "すべての組み合わせを網羅的にテストできない場合、テストアナリストはリスク分析(重要または危険な組み合わせを優先する)と体系的な網羅基準(each-classまたはペアワイズ)を組み合わせて、代表的で効率的なテストケースのサブセットを選択する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Classification Tree Method đặc biệt phù hợp với loại hệ thống nào?",
      "en": "What type of system is the Classification Tree Method especially well-suited for?",
      "ja": "クラシフィケーションツリー法は特にどのようなシステムに適していますか。"
    },
    "options": [
      {
        "vi": "Hệ thống có nhiều tham số/khía cạnh đầu vào cần tổ hợp với nhau, ví dụ biểu mẫu cấu hình với nhiều trường lựa chọn",
        "en": "Systems with many input parameters/aspects that need to be combined, such as configuration forms with many selectable fields",
        "ja": "多くの入力パラメータ/側面を組み合わせる必要があるシステム、例えば多数の選択項目を持つ設定フォーム"
      },
      {
        "vi": "Hệ thống chỉ có một luồng xử lý tuyến tính, không có tham số đầu vào",
        "en": "Systems with only a single linear processing flow and no input parameters",
        "ja": "単一の線形処理フローのみを持ち、入力パラメータがないシステム"
      },
      {
        "vi": "Hệ thống chỉ kiểm thử hiệu năng chịu tải",
        "en": "Systems tested only for load/performance",
        "ja": "負荷/性能テストのみを行うシステム"
      },
      {
        "vi": "Hệ thống không có giao diện người dùng",
        "en": "Systems without any user interface",
        "ja": "ユーザーインターフェースを持たないシステム"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "CTM phát huy giá trị cao nhất khi cần tổ hợp có hệ thống nhiều khía cạnh đầu vào (nhiều tham số/tùy chọn cấu hình), giúp tránh bỏ sót hoặc trùng lặp tổ hợp so với việc liệt kê thủ công.",
      "en": "CTM delivers the most value when systematic combination of many input aspects (multiple parameters/configuration options) is needed, helping avoid missed or duplicated combinations compared to manual enumeration.",
      "ja": "CTMは、多くの入力側面(複数のパラメータ/設定オプション)を体系的に組み合わせる必要がある場合に最も価値を発揮し、手動での列挙に比べて組み合わせの見落としや重複を防ぐ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Phân biệt các tiêu chí phủ tổ hợp: 'each choice coverage', 'pairwise coverage' và 'full combination coverage' khác nhau chủ yếu ở điểm nào?",
      "en": "Distinguish the combination coverage criteria \"each choice coverage\", \"pairwise coverage\", and \"full combination coverage\" — what is their key difference?",
      "ja": "組み合わせ網羅基準である「each choice coverage(各選択網羅)」「pairwise coverage(ペアワイズ網羅)」「full combination coverage(全数組み合わせ網羅)」を区別する主な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Cả ba tiêu chí đều yêu cầu số lượng test case bằng nhau",
        "en": "All three criteria require the same number of test cases",
        "ja": "3つの基準はすべて同じ数のテストケースを要求する"
      },
      {
        "vi": "Each choice chỉ yêu cầu mỗi giá trị của mỗi tham số xuất hiện ít nhất một lần; pairwise yêu cầu mọi cặp giá trị giữa hai tham số bất kỳ xuất hiện ít nhất một lần; full combination yêu cầu mọi tổ hợp có thể có của tất cả tham số đều được test",
        "en": "Each choice only requires every value of every parameter to appear at least once; pairwise requires every value pair between any two parameters to appear at least once; full combination requires every possible combination of all parameters to be tested",
        "ja": "each choiceは各パラメータの各値が少なくとも1回出現することのみを要求する。pairwiseは任意の2パラメータ間のすべての値の組が少なくとも1回出現することを要求する。full combinationはすべてのパラメータのすべての可能な組み合わせをテストすることを要求する"
      },
      {
        "vi": "Each choice là tiêu chí mạnh nhất, full combination là yếu nhất",
        "en": "Each choice is the strongest criterion, and full combination is the weakest",
        "ja": "each choiceが最も強力な基準であり、full combinationが最も弱い"
      },
      {
        "vi": "Pairwise chỉ áp dụng được khi có đúng hai tham số trong hệ thống",
        "en": "Pairwise can only be applied when the system has exactly two parameters",
        "ja": "pairwiseはシステムにパラメータがちょうど2つある場合にしか適用できない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ba tiêu chí này tạo thành một thang độ mạnh tăng dần: each choice (yếu nhất, ít test case nhất) → pairwise (trung bình) → full combination (mạnh nhất nhưng bùng nổ tổ hợp), tester chọn tiêu chí phù hợp theo rủi ro và nguồn lực.",
      "en": "These three criteria form an increasing strength scale: each choice (weakest, fewest test cases) → pairwise (moderate) → full combination (strongest but combinatorially explosive); testers select the appropriate criterion based on risk and resources.",
      "ja": "この3つの基準は強度が段階的に増す尺度を形成する:each choice(最弱、テストケース最少)→pairwise(中程度)→full combination(最強だが組み合わせ爆発を招く)。テスターはリスクとリソースに応じて適切な基準を選択する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Rủi ro lớn nhất khi cố gắng áp dụng full combination testing (kiểm thử toàn tổ hợp) cho một hệ thống có nhiều tham số là gì?",
      "en": "What is the biggest risk of attempting full combination testing on a system with many parameters?",
      "ja": "多くのパラメータを持つシステムに対して全数組み合わせテストを適用しようとする際の最大のリスクは何ですか。"
    },
    "options": [
      {
        "vi": "Không phát hiện được lỗi giao diện người dùng",
        "en": "Failing to detect user interface defects",
        "ja": "ユーザーインターフェースの欠陥を検出できないこと"
      },
      {
        "vi": "Chỉ phát hiện được lỗi ở mức đơn vị (unit), không phát hiện lỗi tích hợp",
        "en": "Only detecting unit-level defects, not integration defects",
        "ja": "単体レベルの欠陥のみを検出し、結合レベルの欠陥を検出できないこと"
      },
      {
        "vi": "Số lượng test case tăng theo cấp số nhân (combinatorial explosion), khiến việc thiết kế, thực thi và bảo trì trở nên bất khả thi về thời gian và chi phí",
        "en": "The number of test cases grows exponentially (combinatorial explosion), making design, execution, and maintenance infeasible in terms of time and cost",
        "ja": "テストケース数が指数関数的に増加(組み合わせ爆発)し、設計・実行・保守が時間とコストの面で実行不可能になること"
      },
      {
        "vi": "Không thể tự động hóa được loại test này",
        "en": "This type of testing cannot be automated",
        "ja": "この種のテストは自動化できないこと"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Full combination đảm bảo phủ tuyệt đối nhưng số test case tăng theo hàm mũ với số tham số/giá trị, nhanh chóng vượt quá khả năng thực thi/bảo trì thực tế — đây là lý do pairwise/n-wise ra đời như giải pháp thực dụng hơn.",
      "en": "Full combination guarantees absolute coverage, but the number of test cases grows exponentially with the number of parameters/values, quickly exceeding practical execution/maintenance capacity — this is why pairwise/n-wise emerged as a more pragmatic solution.",
      "ja": "全数組み合わせは絶対的な網羅を保証するが、テストケース数はパラメータ/値の数に対して指数関数的に増加し、実行・保守の実用的な能力をすぐに超えてしまう。これが、ペアワイズ/n-wiseがより実用的な解決策として生まれた理由である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quy trình phân tích test (test analysis) của Test Analyst theo ISTQB Advanced, Classification Tree Method thường được sử dụng ở giai đoạn nào và với mục đích gì?",
      "en": "In the Test Analyst's test analysis process per ISTQB Advanced, at which stage and for what purpose is the Classification Tree Method typically used?",
      "ja": "ISTQB Advancedにおけるテストアナリストのテスト分析プロセスにおいて、クラシフィケーションツリー法は通常どの段階でどのような目的で使用されますか。"
    },
    "options": [
      {
        "vi": "Ở giai đoạn báo cáo lỗi, để phân loại mức độ nghiêm trọng của defect",
        "en": "At the defect reporting stage, to classify defect severity",
        "ja": "欠陥報告段階で、欠陥の重大度を分類するために"
      },
      {
        "vi": "Ở giai đoạn triển khai (deployment), để cấu hình môi trường production",
        "en": "At the deployment stage, to configure the production environment",
        "ja": "展開(デプロイメント)段階で、本番環境を構成するために"
      },
      {
        "vi": "Ở giai đoạn bảo trì, để lập kế hoạch hồi quy hàng năm",
        "en": "At the maintenance stage, to plan annual regression testing",
        "ja": "保守段階で、年次回帰テストを計画するために"
      },
      {
        "vi": "Ở giai đoạn thiết kế test, để hệ thống hóa việc xác định và tổ hợp các điều kiện đầu vào liên quan thành các test case có mục tiêu rõ ràng, tránh bỏ sót hoặc trùng lặp tổ hợp",
        "en": "At the test design stage, to systematically identify and combine relevant input conditions into well-targeted test cases, avoiding missed or duplicated combinations",
        "ja": "テスト設計段階で、関連する入力条件を体系的に特定し組み合わせ、明確な目的を持つテストケースへとまとめることで、組み合わせの見落としや重複を避けるために"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "CTM là một kỹ thuật thiết kế test (test design technique), thuộc giai đoạn test design trong quy trình test analysis/design của Test Analyst, giúp hệ thống hóa việc chọn tổ hợp điều kiện đầu vào thành test case.",
      "en": "CTM is a test design technique that belongs to the test design stage in the Test Analyst's test analysis/design process, helping to systematize the selection of input condition combinations into test cases.",
      "ja": "CTMはテスト設計技法であり、テストアナリストのテスト分析・設計プロセスにおけるテスト設計段階に属し、入力条件の組み合わせをテストケースとして選定する作業を体系化するのに役立つ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi một hệ thống vừa có logic nghiệp vụ phức tạp theo điều kiện (nhiều quy tắc rẽ nhánh) vừa có nhiều tham số cấu hình đầu vào, cách tiếp cận thiết kế test hợp lý là gì?",
      "en": "When a system has both complex condition-based business logic (many branching rules) and many input configuration parameters, what is a sound test design approach?",
      "ja": "システムが条件に基づく複雑なビジネスロジック(多数の分岐ルール)と多数の入力設定パラメータの両方を持つ場合、妥当なテスト設計アプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Dùng bảng quyết định để mô hình hóa các quy tắc nghiệp vụ theo điều kiện, đồng thời dùng classification tree hoặc pairwise để tổ hợp các tham số cấu hình, rồi kết hợp kết quả của cả hai để có bộ test toàn diện hơn",
        "en": "Use a decision table to model the condition-based business rules, and use a classification tree or pairwise technique to combine the configuration parameters, then combine the results of both for a more comprehensive test set",
        "ja": "条件に基づくビジネスルールをモデル化するために決定表を使用し、同時に設定パラメータを組み合わせるために分類木またはペアワイズ技法を使用し、両者の結果を組み合わせてより包括的なテストセットを作成する"
      },
      {
        "vi": "Chỉ dùng một kỹ thuật duy nhất cho toàn bộ hệ thống để tránh nhầm lẫn",
        "en": "Use only a single technique for the entire system to avoid confusion",
        "ja": "混乱を避けるためにシステム全体に単一の技法のみを使用する"
      },
      {
        "vi": "Bỏ qua bảng quyết định vì classification tree đã bao hàm toàn bộ logic nghiệp vụ",
        "en": "Skip the decision table since the classification tree already covers all business logic",
        "ja": "分類木がすべてのビジネスロジックを包含しているため決定表を省略する"
      },
      {
        "vi": "Chỉ kiểm thử thủ công theo kinh nghiệm, không cần kỹ thuật thiết kế test nào",
        "en": "Rely solely on experience-based manual testing without any test design technique",
        "ja": "経験に基づく手動テストのみに頼り、テスト設計技法を一切使用しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Các kỹ thuật thiết kế test không loại trừ lẫn nhau: bảng quyết định phù hợp mô hình hóa logic rẽ nhánh theo điều kiện, còn classification tree/pairwise phù hợp tổ hợp tham số cấu hình; kết hợp cả hai giúp phủ toàn diện các khía cạnh khác nhau của hệ thống.",
      "en": "Test design techniques are not mutually exclusive: decision tables are well-suited for modeling condition-based branching logic, while classification tree/pairwise techniques suit combining configuration parameters; combining both provides comprehensive coverage of the system's different aspects.",
      "ja": "テスト設計技法は互いに排他的ではない。決定表は条件に基づく分岐ロジックのモデル化に適しており、分類木/ペアワイズ技法は設定パラメータの組み合わせに適している。両方を組み合わせることで、システムの異なる側面を包括的に網羅できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Giả định nền tảng khiến pairwise testing được chấp nhận rộng rãi trong thực tế là gì?",
      "en": "What is the foundational assumption that makes pairwise testing widely accepted in practice?",
      "ja": "ペアワイズテストが実務で広く受け入れられている根本的な前提は何ですか。"
    },
    "options": [
      {
        "vi": "Tất cả lỗi phần mềm chỉ phụ thuộc vào một tham số duy nhất",
        "en": "All software defects depend on only a single parameter",
        "ja": "すべてのソフトウェア欠陥は単一のパラメータのみに依存する"
      },
      {
        "vi": "Phần lớn các lỗi phần mềm trong thực tế được kích hoạt bởi tương tác giữa nhiều nhất hai tham số, nên phủ mọi cặp giá trị đã đủ phát hiện phần lớn lỗi tương tác với chi phí thấp hơn nhiều so với toàn tổ hợp",
        "en": "Most real-world software defects are triggered by interactions between at most two parameters, so covering every value pair is enough to catch most interaction defects at a much lower cost than full combination testing",
        "ja": "実際のソフトウェア欠陥の大部分は最大2つのパラメータ間の相互作用によって引き起こされるため、すべての値の組を網羅すれば、全数組み合わせテストよりもはるかに低いコストでほとんどの相互作用欠陥を検出できる"
      },
      {
        "vi": "Người dùng cuối chỉ sử dụng tối đa hai tính năng cùng lúc",
        "en": "End users only use at most two features at the same time",
        "ja": "エンドユーザーは同時に最大2つの機能しか使用しない"
      },
      {
        "vi": "Pairwise testing đảm bảo phát hiện 100% lỗi trong hệ thống",
        "en": "Pairwise testing guarantees detection of 100% of defects in the system",
        "ja": "ペアワイズテストはシステム内の欠陥を100%検出することを保証する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Nhiều nghiên cứu thực nghiệm (ví dụ của NIST) cho thấy đa số lỗi phần mềm liên quan đến tương tác của 1-2 tham số, đây là cơ sở thực chứng khiến pairwise trở thành kỹ thuật hiệu quả về chi phí được dùng phổ biến, dù không đảm bảo phát hiện mọi lỗi.",
      "en": "Numerous empirical studies (e.g., by NIST) show that most software defects involve interactions of 1-2 parameters, providing the empirical basis that makes pairwise a widely used, cost-effective technique, though it does not guarantee catching every defect.",
      "ja": "NISTなどによる多くの実証研究により、ほとんどのソフトウェア欠陥が1~2個のパラメータの相互作用に関係することが示されている。これが、あらゆる欠陥の検出を保証するものではないものの、ペアワイズが広く使われる費用対効果の高い技法となっている実証的根拠である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "MC/DC (Modified Condition/Decision Coverage) yêu cầu mỗi điều kiện trong một quyết định phải chứng minh điều gì để được xem là đã phủ đầy đủ?",
      "en": "MC/DC (Modified Condition/Decision Coverage) requires that each condition in a decision demonstrate what in order to be considered fully covered?",
      "ja": "MC/DC(改良条件/判定カバレッジ)では、判定内の各条件が十分にカバーされたと見なされるために何を示す必要がありますか。"
    },
    "options": [
      {
        "vi": "Điều kiện đó xuất hiện ít nhất một lần với giá trị đúng và một lần với giá trị sai trong toàn bộ chương trình",
        "en": "The condition appears at least once true and once false anywhere in the program",
        "ja": "その条件がプログラム全体のどこかで少なくとも1回真、1回偽になること"
      },
      {
        "vi": "Điều kiện đó được đánh giá đúng trong ít nhất 50% số ca kiểm thử",
        "en": "The condition evaluates to true in at least 50% of test cases",
        "ja": "その条件が全テストケースの少なくとも50%で真と評価されること"
      },
      {
        "vi": "Điều kiện đó độc lập ảnh hưởng đến kết quả của quyết định, tức là khi giữ nguyên các điều kiện khác, việc thay đổi giá trị điều kiện này làm thay đổi kết quả quyết định",
        "en": "The condition independently affects the decision outcome, meaning that holding other conditions fixed, toggling this condition's value changes the decision's result",
        "ja": "その条件が判定結果に独立して影響を与えること、すなわち他の条件を固定した状態でこの条件の値を反転させると判定結果が変わること"
      },
      {
        "vi": "Điều kiện đó xuất hiện trong ít nhất một đường đi độc lập theo độ phức tạp cyclomatic",
        "en": "The condition appears in at least one independent path per cyclomatic complexity",
        "ja": "その条件がサイクロマティック複雑度に基づく少なくとも1つの独立パスに現れること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Bản chất của MC/DC là mỗi điều kiện phải được chứng minh có ảnh hưởng độc lập đến kết quả quyết định, bằng cách thay đổi riêng điều kiện đó trong khi giữ nguyên các điều kiện còn lại và quan sát kết quả quyết định thay đổi.",
      "en": "MC/DC's core requirement is that each condition must be shown to independently affect the decision outcome, by varying only that condition while others stay fixed and observing the decision result change.",
      "ja": "MC/DCの本質は、各条件が判定結果に独立して影響を与えることを、その条件だけを変化させ他を固定して判定結果の変化を観察することで示す点にある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Với một quyết định có n điều kiện độc lập (không có short-circuit), số ca kiểm thử tối thiểu theo lý thuyết để đạt MC/DC là bao nhiêu?",
      "en": "For a decision with n independent conditions (no short-circuiting), what is the theoretical minimum number of test cases to achieve MC/DC?",
      "ja": "n個の独立した条件を持つ判定(ショートサーキットなし)において、理論上MC/DCを達成するために最低限必要なテストケース数はいくつですか。"
    },
    "options": [
      {
        "vi": "2^n",
        "en": "2^n",
        "ja": "2のn乗"
      },
      {
        "vi": "n",
        "en": "n",
        "ja": "n"
      },
      {
        "vi": "2n",
        "en": "2n",
        "ja": "2n"
      },
      {
        "vi": "n + 1",
        "en": "n + 1",
        "ja": "n + 1"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "MC/DC nổi tiếng vì đạt độ phủ mạnh với số ca kiểm thử tuyến tính theo số điều kiện: tối thiểu n+1 ca, trong khi độ phủ điều kiện đa (multiple condition coverage) cần tới 2^n ca.",
      "en": "MC/DC is notable for achieving strong coverage with a linear number of test cases relative to the number of conditions: a minimum of n+1 cases, whereas multiple condition coverage requires up to 2^n cases.",
      "ja": "MC/DCは条件数に対して線形のテストケース数(最低n+1件)で強いカバレッジを達成できる点が特徴で、複数条件カバレッジ(2のn乗件必要)とは対照的である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bài toán so sánh giữa Condition Coverage (CC) và Condition/Decision Coverage (C/DC), phát biểu nào sau đây là đúng?",
      "en": "When comparing Condition Coverage (CC) and Condition/Decision Coverage (C/DC), which statement is correct?",
      "ja": "条件カバレッジ(CC)と条件/判定カバレッジ(C/DC)を比較した場合、次のうち正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "C/DC yêu cầu cả mỗi điều kiện nhận giá trị đúng/sai VÀ toàn bộ quyết định nhận giá trị đúng/sai, nhưng vẫn có thể bỏ sót các tổ hợp điều kiện gây thay đổi kết quả quyết định",
        "en": "C/DC requires both each condition to take true/false and the overall decision to take true/false, but it can still miss condition combinations that would change the decision outcome",
        "ja": "C/DCは各条件が真偽を取ることと判定全体が真偽を取ることの両方を要求するが、それでも判定結果を変化させる条件の組み合わせを見逃す可能性がある"
      },
      {
        "vi": "CC luôn bao hàm C/DC vì CC kiểm tra từng điều kiện độc lập, chi tiết hơn",
        "en": "CC always subsumes C/DC because CC checks each condition independently, which is more detailed",
        "ja": "CCは各条件を個別に検証するためより詳細であり、常にC/DCを包含する"
      },
      {
        "vi": "CC và C/DC là hai tên gọi khác nhau của cùng một tiêu chí độ phủ",
        "en": "CC and C/DC are just two different names for the same coverage criterion",
        "ja": "CCとC/DCは同一のカバレッジ基準の異なる呼称に過ぎない"
      },
      {
        "vi": "C/DC luôn yêu cầu nhiều ca kiểm thử hơn MC/DC vì phủ toàn bộ tổ hợp",
        "en": "C/DC always requires more test cases than MC/DC because it covers all combinations",
        "ja": "C/DCはすべての組み合わせをカバーするため常にMC/DCより多くのテストケースを必要とする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "C/DC kết hợp condition coverage và decision coverage nhưng chưa đảm bảo mỗi điều kiện độc lập quyết định kết quả — đây chính là lỗ hổng mà MC/DC được thiết kế để khắc phục.",
      "en": "C/DC combines condition coverage and decision coverage but does not guarantee that each condition independently determines the outcome — this is precisely the gap MC/DC was designed to close.",
      "ja": "C/DCは条件カバレッジと判定カバレッジを組み合わせるが、各条件が結果を独立して決定することまでは保証しない。これこそがMC/DCが埋めるために設計された欠陥である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi ngôn ngữ lập trình sử dụng đánh giá ngắn mạch (short-circuit evaluation) cho toán tử logic AND/OR, điều này ảnh hưởng thế nào đến việc thiết kế ca kiểm thử MC/DC?",
      "en": "When a programming language uses short-circuit evaluation for logical AND/OR operators, how does this affect designing MC/DC test cases?",
      "ja": "プログラミング言語が論理AND/OR演算子に短絡評価(ショートサーキット評価)を使用する場合、MC/DCテストケースの設計にどう影響しますか。"
    },
    "options": [
      {
        "vi": "Không ảnh hưởng gì vì MC/DC chỉ quan tâm đến giá trị cuối cùng của quyết định",
        "en": "It has no effect since MC/DC only cares about the decision's final value",
        "ja": "MC/DCは判定の最終値のみを気にするため、まったく影響しない"
      },
      {
        "vi": "Một số tổ hợp giá trị điều kiện trở nên không thể thực thi được (infeasible) vì các điều kiện phía sau không được đánh giá, nên bộ ca kiểm thử phải tính đến masking MC/DC hoặc unique-cause MC/DC",
        "en": "Some condition combinations become infeasible because later conditions are not evaluated, so the test set must account for masking MC/DC or unique-cause MC/DC",
        "ja": "後続の条件が評価されないため一部の条件値の組み合わせが実行不可能になり、テストセットはマスキングMC/DCまたはユニークコーズMC/DCを考慮する必要がある"
      },
      {
        "vi": "Short-circuit làm tăng gấp đôi số ca kiểm thử cần thiết cho MC/DC",
        "en": "Short-circuiting doubles the number of test cases needed for MC/DC",
        "ja": "短絡評価はMC/DCに必要なテストケース数を2倍にする"
      },
      {
        "vi": "Short-circuit chỉ ảnh hưởng đến branch coverage, không liên quan đến MC/DC",
        "en": "Short-circuiting only affects branch coverage and is unrelated to MC/DC",
        "ja": "短絡評価はブランチカバレッジのみに影響し、MC/DCとは無関係である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với ngôn ngữ short-circuit, một điều kiện phía sau có thể không được đánh giá khi điều kiện phía trước đã quyết định kết quả, dẫn đến hai biến thể MC/DC (masking và unique-cause) để xử lý tính khả thi của tổ hợp.",
      "en": "In short-circuit languages, a later condition may never be evaluated once an earlier condition determines the outcome, leading to two MC/DC variants (masking and unique-cause) to handle combination feasibility.",
      "ja": "短絡評価を行う言語では、前の条件で結果が決まると後続の条件が評価されないことがあり、これが組み合わせの実行可能性を扱うための2つのMC/DC変種(マスキング型とユニークコーズ型)につながる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong ngành hàng không (theo tiêu chuẩn DO-178C), MC/DC được yêu cầu bắt buộc ở mức đảm bảo phần mềm nào?",
      "en": "In the aviation industry (per DO-178C), MC/DC is mandatory at which software assurance level?",
      "ja": "航空業界(DO-178C準拠)において、MC/DCが必須とされるのはどのソフトウェア保証レベルですか。"
    },
    "options": [
      {
        "vi": "Level E — phần mềm không ảnh hưởng đến an toàn",
        "en": "Level E — software with no safety impact",
        "ja": "レベルE — 安全性に影響しないソフトウェア"
      },
      {
        "vi": "Level D — phần mềm có ảnh hưởng nhỏ đến an toàn bay",
        "en": "Level D — software with minor impact on flight safety",
        "ja": "レベルD — 飛行安全への影響が軽微なソフトウェア"
      },
      {
        "vi": "Level A — phần mềm mà lỗi có thể gây hậu quả thảm khốc (catastrophic)",
        "en": "Level A — software whose failure could cause catastrophic consequences",
        "ja": "レベルA — 故障すると壊滅的な結果を招く可能性のあるソフトウェア"
      },
      {
        "vi": "Tất cả các mức đều yêu cầu MC/DC như nhau",
        "en": "All levels require MC/DC equally",
        "ja": "すべてのレベルで同等にMC/DCが要求される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DO-178C phân loại phần mềm hàng không theo mức nghiêm trọng hậu quả lỗi; MC/DC là yêu cầu độ phủ mã nguồn nghiêm ngặt nhất, chỉ bắt buộc ở Level A — nơi lỗi có thể gây thảm họa.",
      "en": "DO-178C classifies aviation software by failure severity; MC/DC is the strictest structural coverage requirement, mandated only at Level A, where failures could be catastrophic.",
      "ja": "DO-178Cは故障の重大性に応じて航空ソフトウェアを分類し、MC/DCは最も厳格な構造カバレッジ要件であり、壊滅的な結果を招きうるレベルAでのみ必須とされる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Path coverage (độ phủ đường) trong kiểm thử white-box được định nghĩa là gì?",
      "en": "What is path coverage in white-box testing defined as?",
      "ja": "ホワイトボックステストにおけるパスカバレッジ(経路網羅)とは何と定義されますか。"
    },
    "options": [
      {
        "vi": "Tỷ lệ phần trăm các câu lệnh trong mã nguồn được thực thi ít nhất một lần",
        "en": "The percentage of source code statements executed at least once",
        "ja": "ソースコードの文が少なくとも1回実行された割合"
      },
      {
        "vi": "Tỷ lệ phần trăm các nhánh quyết định (true/false) đã được thực thi",
        "en": "The percentage of decision branches (true/false) that have been executed",
        "ja": "判定分岐(真/偽)が実行された割合"
      },
      {
        "vi": "Tỷ lệ phần trăm các biến toàn cục được ghi và đọc đúng thứ tự",
        "en": "The percentage of global variables read and written in the correct order",
        "ja": "グローバル変数が正しい順序で読み書きされた割合"
      },
      {
        "vi": "Tỷ lệ phần trăm các đường đi thực thi khả dĩ, độc lập tuyến tính (hoặc toàn bộ) qua mã nguồn đã được thực hiện bởi bộ ca kiểm thử",
        "en": "The percentage of feasible, linearly independent (or all possible) execution paths through the code that have been exercised by the test suite",
        "ja": "テストスイートによって実行された、実行可能かつ線形独立(あるいはすべて)な経路の割合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Path coverage đo lường số đường đi thực thi riêng biệt qua đồ thị luồng điều khiển đã được kiểm thử, là tiêu chí độ phủ mạnh hơn statement và branch coverage nhưng thường không khả thi đầy đủ với mã có vòng lặp.",
      "en": "Path coverage measures the number of distinct execution paths through the control flow graph that have been tested, a stronger criterion than statement and branch coverage but often infeasible to achieve fully in looping code.",
      "ja": "パスカバレッジは制御フローグラフを通る個別の実行経路がテストされた数を測るもので、文カバレッジやブランチカバレッジより強力な基準だが、ループのあるコードでは完全な達成が困難なことが多い。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Vì sao đạt 100% path coverage thường KHÔNG khả thi trong thực tế đối với chương trình có vòng lặp?",
      "en": "Why is achieving 100% path coverage typically infeasible in practice for programs containing loops?",
      "ja": "ループを含むプログラムでは、実際には100%のパスカバレッジを達成することが一般に不可能なのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì số lượng đường đi khả dĩ có thể tăng theo cấp số nhân hoặc vô hạn do số lần lặp của vòng lặp thay đổi",
        "en": "Because the number of possible paths can grow exponentially or become infinite due to varying loop iteration counts",
        "ja": "ループの反復回数が変化するため、可能な経路の数が指数的、あるいは無限に増加しうるため"
      },
      {
        "vi": "Vì trình biên dịch tối ưu hóa loại bỏ hết các vòng lặp trước khi kiểm thử",
        "en": "Because compilers optimize away all loops before testing",
        "ja": "コンパイラがテスト前にすべてのループを最適化して除去するため"
      },
      {
        "vi": "Vì công cụ đo độ phủ hiện nay không hỗ trợ đo path coverage",
        "en": "Because current coverage tools do not support measuring path coverage",
        "ja": "現在のカバレッジツールがパスカバレッジの測定をサポートしていないため"
      },
      {
        "vi": "Vì path coverage chỉ áp dụng được cho mã không có điều kiện rẽ nhánh",
        "en": "Because path coverage only applies to code without branching conditions",
        "ja": "パスカバレッジは分岐条件のないコードにしか適用できないため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mỗi lần lặp khác nhau của vòng lặp tạo ra một đường đi riêng biệt qua đồ thị luồng điều khiển, khiến tổng số đường đi có thể là vô hạn hoặc quá lớn để kiểm thử hết trong thực tế.",
      "en": "Each different number of loop iterations creates a distinct path through the control flow graph, so the total number of paths can be infinite or far too large to test exhaustively in practice.",
      "ja": "ループの反復回数が異なるたびに制御フローグラフ上の異なる経路が生成されるため、経路の総数が無限、あるいは実際にはすべてテストするには多すぎる数になり得る。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Basis path testing (kiểm thử đường cơ sở) do McCabe đề xuất sử dụng chỉ số nào để xác định số lượng đường đi độc lập tuyến tính tối thiểu cần kiểm thử?",
      "en": "McCabe's basis path testing uses which metric to determine the minimum number of linearly independent paths that must be tested?",
      "ja": "McCabeの基底パステストは、テストすべき線形独立経路の最小数を決定するために何の指標を使用しますか。"
    },
    "options": [
      {
        "vi": "Độ phủ dòng lệnh (statement coverage percentage)",
        "en": "Statement coverage percentage",
        "ja": "文カバレッジの割合"
      },
      {
        "vi": "Độ phức tạp Cyclomatic Complexity (V(G) = E - N + 2)",
        "en": "Cyclomatic Complexity (V(G) = E - N + 2)",
        "ja": "サイクロマティック複雑度(V(G) = E - N + 2)"
      },
      {
        "vi": "Số lượng biến toàn cục trong module",
        "en": "The number of global variables in the module",
        "ja": "モジュール内のグローバル変数の数"
      },
      {
        "vi": "Số dòng mã nguồn (Lines of Code)",
        "en": "Lines of Code (LOC)",
        "ja": "ソースコード行数(LOC)"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cyclomatic Complexity, tính từ đồ thị luồng điều khiển (cạnh, nút, thành phần liên thông), chính là số lượng đường đi độc lập tuyến tính tối thiểu tạo thành tập cơ sở để bao phủ mọi quyết định.",
      "en": "Cyclomatic Complexity, computed from the control flow graph (edges, nodes, connected components), equals the minimum number of linearly independent paths forming the basis set that covers every decision.",
      "ja": "制御フローグラフ(辺、ノード、連結成分)から算出されるサイクロマティック複雑度は、すべての判定をカバーする基底集合を構成する線形独立経路の最小数に等しい。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một đường đi (path) trong đồ thị luồng điều khiển được xem là 'infeasible' (không khả thi) khi nào?",
      "en": "When is a path in a control flow graph considered 'infeasible'?",
      "ja": "制御フローグラフにおいてパスが「実行不可能(infeasible)」と見なされるのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi đường đi đó có độ dài lớn hơn 10 câu lệnh",
        "en": "When the path has more than 10 statements",
        "ja": "そのパスの文数が10を超える場合"
      },
      {
        "vi": "Khi đường đi đó chứa một vòng lặp",
        "en": "When the path contains a loop",
        "ja": "そのパスにループが含まれる場合"
      },
      {
        "vi": "Khi không tồn tại dữ liệu đầu vào nào khiến chương trình thực thi theo đúng trình tự các nút của đường đi đó, do các ràng buộc logic mâu thuẫn giữa các điều kiện",
        "en": "When no input data exists that would cause the program to execute the exact node sequence of that path, due to logically contradictory constraints between conditions",
        "ja": "条件同士の論理的な矛盾により、そのパスのノード列どおりにプログラムを実行させる入力データが存在しない場合"
      },
      {
        "vi": "Khi đường đi đó không đi qua điểm bắt đầu của chương trình",
        "en": "When the path does not pass through the program's entry point",
        "ja": "そのパスがプログラムの開始点を通らない場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đường đi infeasible xuất hiện khi các ràng buộc logic của các điều kiện dọc đường đi loại trừ lẫn nhau, khiến không có bộ dữ liệu đầu vào nào thỏa mãn được toàn bộ trình tự nhánh — đây là thách thức thực tế lớn của path testing.",
      "en": "An infeasible path arises when the logical constraints of conditions along the path contradict one another, so no input data can satisfy the entire branch sequence — a major practical challenge in path testing.",
      "ja": "実行不可能パスは、パス上の条件の論理的制約が互いに矛盾し、その分岐列全体を満たす入力データが存在しない場合に生じる。これはパステストにおける大きな実務上の課題である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "So sánh Branch Coverage và MC/DC, phát biểu nào đúng nhất khi phân tích quyết định phức hợp gồm nhiều điều kiện AND/OR?",
      "en": "Comparing Branch Coverage and MC/DC, which statement is most accurate when analyzing a compound decision with multiple AND/OR conditions?",
      "ja": "複数のAND/OR条件から成る複合判定を分析する際、ブランチカバレッジとMC/DCを比較して最も正確な記述はどれですか。"
    },
    "options": [
      {
        "vi": "Branch coverage không thể áp dụng cho quyết định có toán tử logic",
        "en": "Branch coverage cannot be applied to decisions with logical operators",
        "ja": "ブランチカバレッジは論理演算子を含む判定には適用できない"
      },
      {
        "vi": "Branch coverage và MC/DC luôn cần cùng số ca kiểm thử với mọi quyết định",
        "en": "Branch coverage and MC/DC always require the same number of test cases for any decision",
        "ja": "ブランチカバレッジとMC/DCは、どの判定に対しても常に同数のテストケースを必要とする"
      },
      {
        "vi": "MC/DC yếu hơn branch coverage vì chỉ xét từng điều kiện đơn lẻ",
        "en": "MC/DC is weaker than branch coverage because it only examines single conditions in isolation",
        "ja": "MC/DCは単一の条件しか見ないため、ブランチカバレッジより弱い"
      },
      {
        "vi": "Branch coverage chỉ cần quyết định tổng thể đạt cả true và false ít nhất một lần, có thể đạt được mà không cần thay đổi từng điều kiện riêng lẻ; MC/DC bao hàm Branch coverage vì mạnh hơn",
        "en": "Branch coverage only requires the overall decision to be true and false at least once, achievable without varying each individual condition; MC/DC subsumes branch coverage because it is stronger",
        "ja": "ブランチカバレッジは判定全体が少なくとも1回ずつ真・偽になればよく、個々の条件を変化させなくても達成できる。MC/DCはより強力なため、ブランチカバレッジを包含する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Branch coverage chỉ quan tâm kết quả tổng thể của quyết định (true/false), có thể bỏ sót việc từng điều kiện con có thực sự ảnh hưởng độc lập hay không; MC/DC khắt khe hơn và bao hàm branch coverage.",
      "en": "Branch coverage cares only about the decision's overall outcome (true/false) and can miss whether each sub-condition truly has an independent effect; MC/DC is stricter and subsumes branch coverage.",
      "ja": "ブランチカバレッジは判定全体の結果(真/偽)のみを見るため、各サブ条件が本当に独立して影響するかを見逃す可能性がある。MC/DCはより厳格でブランチカバレッジを包含する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "LCSAJ (Linear Code Sequence And Jump) là một kỹ thuật độ phủ white-box liên quan chặt chẽ nhất đến khái niệm nào?",
      "en": "LCSAJ (Linear Code Sequence And Jump) is a white-box coverage technique most closely related to which concept?",
      "ja": "LCSAJ(線形コード列とジャンプ)は、どの概念に最も密接に関連するホワイトボックスカバレッジ技法ですか。"
    },
    "options": [
      {
        "vi": "Độ phủ đường đi từng phần, đo các chuỗi lệnh tuần tự kết thúc bằng một bước nhảy (jump), là bước trung gian tiến gần tới path coverage đầy đủ",
        "en": "Partial path coverage that measures sequential instruction sequences ending in a jump, serving as an intermediate step toward full path coverage",
        "ja": "ジャンプで終わる連続命令列を測定する部分的なパスカバレッジであり、完全なパスカバレッジに近づく中間段階の指標"
      },
      {
        "vi": "Độ phủ dữ liệu (data flow coverage) giữa định nghĩa và sử dụng biến",
        "en": "Data flow coverage between variable definitions and uses",
        "ja": "変数の定義と使用の間のデータフローカバレッジ"
      },
      {
        "vi": "Độ phủ giao diện người dùng qua các màn hình",
        "en": "UI coverage across application screens",
        "ja": "アプリケーション画面間のUIカバレッジ"
      },
      {
        "vi": "Độ phủ yêu cầu nghiệp vụ (requirements coverage)",
        "en": "Business requirements coverage",
        "ja": "業務要件カバレッジ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "LCSAJ chia mã nguồn thành các đoạn lệnh tuyến tính kết thúc bằng lệnh nhảy, và độ phủ LCSAJ đo tỷ lệ các chuỗi này (và cặp nối tiếp) đã thực thi — mạnh hơn branch coverage, gần với path coverage nhưng khả thi hơn.",
      "en": "LCSAJ divides source code into linear instruction sequences ending in a jump, and LCSAJ coverage measures the proportion of such sequences (and their pairings) exercised — stronger than branch coverage and a more feasible approximation of path coverage.",
      "ja": "LCSAJはソースコードをジャンプで終わる線形命令列に分割し、LCSAJカバレッジはそれらの列(および連結)がどれだけ実行されたかを測定する。ブランチカバレッジより強力で、パスカバレッジのより実現可能な近似となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một quyết định `if (A OR B) AND C`, để đạt MC/DC, kỹ thuật viên kiểm thử cần đảm bảo điều gì đối với điều kiện C?",
      "en": "For a decision `if (A OR B) AND C`, to achieve MC/DC, the test engineer must ensure what regarding condition C?",
      "ja": "判定`if (A OR B) AND C`において、MC/DCを達成するためにテスト担当者は条件Cについて何を保証する必要がありますか。"
    },
    "options": [
      {
        "vi": "C không cần kiểm thử vì nó luôn được đánh giá sau cùng",
        "en": "C does not need testing because it is always evaluated last",
        "ja": "Cは常に最後に評価されるためテスト不要である"
      },
      {
        "vi": "Có ít nhất một cặp ca kiểm thử trong đó (A OR B) giữ nguyên giá trị, chỉ C thay đổi giữa true/false, và kết quả quyết định tổng thể thay đổi theo",
        "en": "There must be at least one pair of test cases where (A OR B) stays fixed, only C toggles between true/false, and the overall decision outcome changes accordingly",
        "ja": "(A OR B)の値を固定したまま、Cのみを真偽で切り替え、その結果として判定全体の結果が変化するテストケースの組が少なくとも1組必要である"
      },
      {
        "vi": "C phải luôn được kiểm thử là true trong mọi ca kiểm thử",
        "en": "C must always be tested as true in every test case",
        "ja": "Cはすべてのテストケースで常に真としてテストされなければならない"
      },
      {
        "vi": "Chỉ cần kiểm thử A và B, C sẽ tự động được phủ",
        "en": "Only A and B need testing; C will be automatically covered",
        "ja": "AとBだけをテストすればCは自動的にカバーされる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "MC/DC yêu cầu mỗi điều kiện — kể cả C trong biểu thức lồng ghép — phải chứng minh ảnh hưởng độc lập lên quyết định tổng thể bằng cách giữ các điều kiện khác cố định và chỉ thay đổi điều kiện đang xét.",
      "en": "MC/DC requires every condition — including C in the nested expression — to demonstrate independent influence on the overall decision by holding other conditions constant while varying only the condition under test.",
      "ja": "MC/DCは、入れ子式の中のCを含むすべての条件が、他の条件を固定してその条件だけを変化させることで、判定全体への独立した影響を示すことを要求する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Multiple Condition Coverage (MCC), còn gọi là độ phủ điều kiện đa/toàn tổ hợp, khác với MC/DC ở điểm cốt lõi nào?",
      "en": "Multiple Condition Coverage (MCC), also known as exhaustive combination coverage, differs from MC/DC in what core aspect?",
      "ja": "複数条件カバレッジ(MCC、全組み合わせカバレッジとも呼ばれる)は、MC/DCとどの点で本質的に異なりますか。"
    },
    "options": [
      {
        "vi": "MCC chỉ áp dụng cho vòng lặp, MC/DC chỉ áp dụng cho điều kiện đơn",
        "en": "MCC only applies to loops, while MC/DC only applies to single conditions",
        "ja": "MCCはループにのみ適用され、MC/DCは単一条件にのみ適用される"
      },
      {
        "vi": "MCC là tiêu chí yếu hơn statement coverage",
        "en": "MCC is a weaker criterion than statement coverage",
        "ja": "MCCは文カバレッジより弱い基準である"
      },
      {
        "vi": "MCC yêu cầu kiểm thử toàn bộ 2^n tổ hợp giá trị true/false có thể có của n điều kiện, trong khi MC/DC chỉ cần n+1 ca đủ để chứng minh ảnh hưởng độc lập",
        "en": "MCC requires testing all 2^n possible true/false combinations of n conditions, whereas MC/DC only needs about n+1 cases sufficient to demonstrate independent influence",
        "ja": "MCCはn個の条件についてあり得る2のn乗通りの真偽の組み合わせすべてをテストする必要があるのに対し、MC/DCは独立した影響を示すのに十分な約n+1件のケースで済む"
      },
      {
        "vi": "Không có khác biệt, đây là hai tên gọi của cùng một kỹ thuật",
        "en": "There is no difference; they are two names for the same technique",
        "ja": "違いはなく、両者は同一技法の異なる名称に過ぎない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "MCC đòi hỏi phủ mọi tổ hợp có thể (2^n ca), rất tốn kém khi n lớn, trong khi MC/DC là giải pháp thực tế hơn đạt độ phủ mạnh với chi phí tuyến tính (n+1 ca).",
      "en": "MCC demands covering every possible combination (2^n cases), which becomes prohibitively expensive as n grows, while MC/DC is a more practical solution achieving strong coverage at linear cost (n+1 cases).",
      "ja": "MCCはあり得るすべての組み合わせ(2のn乗件)をカバーする必要があり、nが大きくなると非常にコストがかかる。一方MC/DCは線形コスト(n+1件)で強力なカバレッジを達成できる、より実用的な解決策である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Technical Test Analyst đang thiết kế ca kiểm thử cho module xử lý an toàn hàng không. Vì sao họ chọn MC/DC thay vì chỉ Decision Coverage, dù MC/DC tốn nhiều công sức thiết kế hơn?",
      "en": "A Technical Test Analyst is designing test cases for a flight-safety processing module. Why would they choose MC/DC over plain Decision Coverage, despite MC/DC requiring more design effort?",
      "ja": "あるテクニカルテストアナリストが飛行安全処理モジュールのテストケースを設計しています。MC/DCの方が設計に手間がかかるにもかかわらず、単純な判定カバレッジではなくMC/DCを選ぶのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì MC/DC luôn nhanh hơn để thực thi trên máy chủ CI",
        "en": "Because MC/DC always executes faster on CI servers",
        "ja": "MC/DCは常にCIサーバー上での実行が速いため"
      },
      {
        "vi": "Vì Decision Coverage chỉ áp dụng được cho mã viết bằng ngôn ngữ hướng đối tượng",
        "en": "Because Decision Coverage only applies to code written in object-oriented languages",
        "ja": "判定カバレッジはオブジェクト指向言語で書かれたコードにしか適用できないため"
      },
      {
        "vi": "Vì MC/DC không yêu cầu phân tích đồ thị luồng điều khiển",
        "en": "Because MC/DC does not require control flow graph analysis",
        "ja": "MC/DCは制御フローグラフの分析を必要としないため"
      },
      {
        "vi": "Vì Decision Coverage có thể bỏ sót lỗi logic trong các điều kiện con của một quyết định phức hợp, còn MC/DC phát hiện được các lỗi đó nhờ chứng minh ảnh hưởng độc lập của từng điều kiện — quan trọng với phần mềm mà lỗi có thể gây hậu quả nghiêm trọng",
        "en": "Because Decision Coverage can miss logical defects in sub-conditions of a compound decision, while MC/DC catches them by proving each condition's independent influence — critical for software where failures could have severe consequences",
        "ja": "判定カバレッジは複合判定内のサブ条件の論理的欠陥を見逃す可能性があるが、MC/DCは各条件の独立した影響を証明することでそれらを検出できるため。故障が深刻な結果を招きうるソフトウェアでは重要である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong hệ thống an toàn nghiêm ngặt, lỗi ẩn trong logic điều kiện con (ví dụ nhầm AND thành OR) có thể không bị Decision Coverage phát hiện vì kết quả tổng thể vẫn có thể đúng ngẫu nhiên; MC/DC buộc chứng minh từng điều kiện thực sự quan trọng.",
      "en": "In safety-critical systems, a defect hidden in sub-condition logic (e.g., AND mistakenly written as OR) may go undetected by Decision Coverage because the overall outcome can coincidentally still be correct; MC/DC forces proof that each condition genuinely matters.",
      "ja": "安全性が重要なシステムでは、サブ条件のロジックに潜む欠陥(例:ANDを誤ってORと記述)が、全体の結果が偶然正しくなるため判定カバレッジでは検出されないことがある。MC/DCは各条件が本当に重要であることを証明させる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bối cảnh ISTQB Advanced, ai chịu trách nhiệm chính quyết định mức độ phủ cấu trúc (structural coverage) như MC/DC hay path coverage cần đạt được cho một dự án, dựa trên mức độ rủi ro?",
      "en": "In the ISTQB Advanced context, who is primarily responsible for deciding the level of structural coverage (such as MC/DC or path coverage) required for a project, based on risk level?",
      "ja": "ISTQB Advancedの文脈において、リスクレベルに基づいてMC/DCやパスカバレッジなどの構造カバレッジのレベルをプロジェクトに対してどの程度必要とするかを主に決定する責任者は誰ですか。"
    },
    "options": [
      {
        "vi": "Test Manager, phối hợp với các bên liên quan, dựa trên phân tích rủi ro, tiêu chuẩn ngành (như DO-178C) và test policy/strategy của tổ chức",
        "en": "The Test Manager, in coordination with stakeholders, based on risk analysis, industry standards (such as DO-178C), and the organization's test policy/strategy",
        "ja": "テストマネージャーが、リスク分析、業界標準(DO-178Cなど)、組織のテストポリシー/戦略に基づき、関係者と協力して決定する"
      },
      {
        "vi": "Nhà phát triển viết mã tự quyết định mà không cần tham khảo ai",
        "en": "The developer writing the code, deciding unilaterally without consultation",
        "ja": "コードを書く開発者が誰にも相談せず単独で決定する"
      },
      {
        "vi": "Khách hàng cuối luôn tự chọn tiêu chí độ phủ kỹ thuật",
        "en": "The end customer always personally chooses the technical coverage criterion",
        "ja": "エンドユーザーが常に自ら技術的カバレッジ基準を選ぶ"
      },
      {
        "vi": "Công cụ đo độ phủ tự động đề xuất và quyết định mà không cần con người can thiệp",
        "en": "The automated coverage tool proposes and decides without any human involvement",
        "ja": "自動化されたカバレッジツールが人間の関与なしに提案し決定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Việc lựa chọn mức độ phủ cấu trúc là quyết định kiểm thử mang tính chiến lược, liên quan đến rủi ro và tuân thủ, thuộc trách nhiệm của Test Manager phối hợp cùng các bên liên quan kỹ thuật và quy định ngành.",
      "en": "Choosing the structural coverage level is a strategic testing decision tied to risk and compliance, falling under the Test Manager's responsibility in coordination with technical stakeholders and industry regulations.",
      "ja": "構造カバレッジのレベルを選択することはリスクとコンプライアンスに関わる戦略的なテスト判断であり、技術的関係者や業界規制と連携するテストマネージャーの責任範囲である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Test Analyst nhận thấy một quyết định phức hợp `(X > 0 AND Y < 10) OR Z == true` đã đạt 100% Decision Coverage nhưng nghi ngờ vẫn còn lỗi logic trong X hoặc Y. Kỹ thuật nào phù hợp nhất để họ áp dụng tiếp?",
      "en": "A Test Analyst notices a compound decision `(X > 0 AND Y < 10) OR Z == true` has achieved 100% Decision Coverage but suspects there may still be logic defects in X or Y. Which technique is most appropriate to apply next?",
      "ja": "テストアナリストは複合判定`(X > 0 AND Y < 10) OR Z == true`が判定カバレッジ100%を達成しているが、XまたはYにまだ論理的欠陥が潜んでいる可能性を疑っています。次にどの技法を適用するのが最も適切ですか。"
    },
    "options": [
      {
        "vi": "Tăng thêm ca kiểm thử ngẫu nhiên (random testing) không phân tích điều kiện",
        "en": "Add more random test cases without analyzing the conditions",
        "ja": "条件を分析せずランダムテストのケースを追加する"
      },
      {
        "vi": "Áp dụng MC/DC để thiết kế thêm ca kiểm thử chứng minh mỗi điều kiện con (X>0, Y<10, Z==true) độc lập ảnh hưởng đến kết quả quyết định tổng thể",
        "en": "Apply MC/DC to design additional test cases proving each sub-condition (X>0, Y<10, Z==true) independently affects the overall decision outcome",
        "ja": "MC/DCを適用し、各サブ条件(X>0、Y<10、Z==true)が判定全体の結果に独立して影響を与えることを証明する追加のテストケースを設計する"
      },
      {
        "vi": "Chỉ chạy lại các ca kiểm thử hiện có nhiều lần để tăng độ tin cậy",
        "en": "Simply re-run the existing test cases multiple times to increase confidence",
        "ja": "既存のテストケースを何度も再実行して信頼性を高めるだけにする"
      },
      {
        "vi": "Chuyển sang kiểm thử hiệu năng (performance testing) cho module đó",
        "en": "Switch to performance testing for that module",
        "ja": "そのモジュールに対してパフォーマンステストに切り替える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi nghi ngờ Decision Coverage bỏ sót lỗi trong logic điều kiện con, MC/DC là kỹ thuật thích hợp vì buộc từng điều kiện con phải thể hiện ảnh hưởng độc lập, phát hiện các lỗi ẩn mà Decision Coverage không thấy.",
      "en": "When Decision Coverage is suspected to miss defects in sub-condition logic, MC/DC is the appropriate technique since it forces each sub-condition to demonstrate independent influence, revealing hidden defects that Decision Coverage cannot catch.",
      "ja": "判定カバレッジがサブ条件のロジックの欠陥を見逃していると疑われる場合、MC/DCは各サブ条件に独立した影響を示すことを強制するため適切な技法であり、判定カバレッジでは発見できない潜在的欠陥を明らかにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong đồ thị luồng điều khiển (Control Flow Graph - CFG), 'đường đi độc lập tuyến tính' (linearly independent path) được sử dụng trong basis path testing có nghĩa là gì?",
      "en": "In a Control Flow Graph (CFG), what does a 'linearly independent path' used in basis path testing mean?",
      "ja": "制御フローグラフ(CFG)において、基底パステストで使われる「線形独立パス」とは何を意味しますか。"
    },
    "options": [
      {
        "vi": "Đường đi không đi qua bất kỳ vòng lặp nào",
        "en": "A path that does not pass through any loop",
        "ja": "いかなるループも通らないパス"
      },
      {
        "vi": "Đường đi có độ dài ngắn nhất trong toàn bộ đồ thị",
        "en": "The shortest possible path in the entire graph",
        "ja": "グラフ全体の中で最短のパス"
      },
      {
        "vi": "Đường đi giới thiệu ít nhất một cạnh (edge) mới chưa từng xuất hiện trong các đường đi trước đó của tập cơ sở",
        "en": "A path that introduces at least one new edge not already covered by previously selected paths in the basis set",
        "ja": "基底集合の中で既に選ばれた他のパスにはまだ現れていない、少なくとも1つの新しい辺を含むパス"
      },
      {
        "vi": "Đường đi chỉ chứa các câu lệnh gán biến, không chứa điều kiện",
        "en": "A path containing only variable assignment statements, with no conditions",
        "ja": "変数代入文のみを含み、条件を含まないパス"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong đại số đồ thị, các đường đi độc lập tuyến tính là những đường đi mà mỗi đường bổ sung ít nhất một cạnh mới vào tập đã kiểm thử, đảm bảo tập cơ sở (kích thước bằng Cyclomatic Complexity) bao phủ mọi quyết định hiệu quả.",
      "en": "In graph algebra, linearly independent paths are ones where each path adds at least one new edge to the already-tested set, ensuring the basis set (sized by Cyclomatic Complexity) efficiently covers every decision.",
      "ja": "グラフ代数において、線形独立パスとは、それぞれが既にテスト済みの集合に少なくとも1つの新しい辺を追加するパスであり、これにより(サイクロマティック複雑度のサイズを持つ)基底集合がすべての判定を効率的にカバーすることが保証される。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi so sánh chi phí thiết kế và bảo trì giữa MC/DC và Path Coverage cho cùng một module có vòng lặp phức tạp, nhận định nào chính xác nhất?",
      "en": "When comparing the design and maintenance cost between MC/DC and Path Coverage for the same module with complex loops, which statement is most accurate?",
      "ja": "複雑なループを含む同一モジュールに対してMC/DCとパスカバレッジの設計・保守コストを比較した場合、最も正確な記述はどれですか。"
    },
    "options": [
      {
        "vi": "Path coverage luôn rẻ hơn vì chỉ cần một ca kiểm thử duy nhất",
        "en": "Path coverage is always cheaper because it requires only a single test case",
        "ja": "パスカバレッジは常に1つのテストケースだけで済むため安価である"
      },
      {
        "vi": "MC/DC và Path coverage có chi phí hoàn toàn giống nhau trong mọi trường hợp",
        "en": "MC/DC and Path coverage always have exactly the same cost in every case",
        "ja": "MC/DCとパスカバレッジのコストはあらゆる場合において完全に同一である"
      },
      {
        "vi": "Cả hai kỹ thuật đều không liên quan gì đến số lượng điều kiện hay vòng lặp",
        "en": "Neither technique has any relation to the number of conditions or loops",
        "ja": "どちらの技法も条件数やループの数とは一切関係がない"
      },
      {
        "vi": "Path coverage đầy đủ thường tốn kém và có thể không khả thi do số đường đi tăng theo cấp số nhân với vòng lặp, trong khi MC/DC có chi phí tuyến tính hơn theo số điều kiện nên thực tế hơn cho quyết định phức hợp",
        "en": "Full path coverage is often expensive and can be infeasible since path counts grow exponentially with loops, whereas MC/DC scales more linearly with the number of conditions, making it more practical for compound decisions",
        "ja": "完全なパスカバレッジはループにより経路数が指数的に増加するためしばしば高コストで実行不可能になりうるが、MC/DCは条件数に対してより線形にスケールするため複合判定に対してより実用的である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là lý do thực tế MC/DC được ưa chuộng cho các quyết định logic phức hợp trong khi path coverage đầy đủ thường chỉ áp dụng từng phần (ví dụ qua basis path testing) do bùng nổ tổ hợp từ vòng lặp.",
      "en": "This is why MC/DC is favored for complex compound logic decisions while full path coverage is usually applied only partially (e.g., via basis path testing) due to combinatorial explosion from loops.",
      "ja": "これが複雑な複合論理判定にMC/DCが好まれる理由であり、ループによる組み合わせ爆発のため完全なパスカバレッジは通常部分的にしか適用されない(例:基底パステストを介して)。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong ma trận độ phủ (coverage hierarchy) của white-box testing, thứ tự nào sau đây phản ánh đúng mức độ mạnh dần từ yếu đến mạnh (mỗi mức bao hàm mức trước)?",
      "en": "In the white-box testing coverage hierarchy, which ordering correctly reflects increasing strength from weakest to strongest (each level subsumes the prior)?",
      "ja": "ホワイトボックステストのカバレッジ階層において、弱いものから強いものへの順序(各レベルが前のレベルを包含する)を正しく反映しているのはどれですか。"
    },
    "options": [
      {
        "vi": "Statement Coverage → Decision Coverage → Condition/Decision Coverage → MC/DC → Multiple Condition Coverage",
        "en": "Statement Coverage → Decision Coverage → Condition/Decision Coverage → MC/DC → Multiple Condition Coverage",
        "ja": "文カバレッジ → 判定カバレッジ → 条件/判定カバレッジ → MC/DC → 複数条件カバレッジ"
      },
      {
        "vi": "MC/DC → Statement Coverage → Decision Coverage → Multiple Condition Coverage",
        "en": "MC/DC → Statement Coverage → Decision Coverage → Multiple Condition Coverage",
        "ja": "MC/DC → 文カバレッジ → 判定カバレッジ → 複数条件カバレッジ"
      },
      {
        "vi": "Multiple Condition Coverage → MC/DC → Decision Coverage → Statement Coverage",
        "en": "Multiple Condition Coverage → MC/DC → Decision Coverage → Statement Coverage",
        "ja": "複数条件カバレッジ → MC/DC → 判定カバレッジ → 文カバレッジ"
      },
      {
        "vi": "Decision Coverage → Statement Coverage → MC/DC → Condition/Decision Coverage",
        "en": "Decision Coverage → Statement Coverage → MC/DC → Condition/Decision Coverage",
        "ja": "判定カバレッジ → 文カバレッジ → MC/DC → 条件/判定カバレッジ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thứ tự chuẩn từ yếu đến mạnh là: Statement → Decision (bao hàm Statement) → Condition/Decision → MC/DC (bao hàm Condition/Decision) → Multiple Condition Coverage (mạnh nhất, đòi hỏi mọi tổ hợp).",
      "en": "The standard order from weakest to strongest is: Statement → Decision (subsumes Statement) → Condition/Decision → MC/DC (subsumes Condition/Decision) → Multiple Condition Coverage (strongest, requiring all combinations).",
      "ja": "弱いものから強いものへの標準的な順序は、文 → 判定(文を包含) → 条件/判定 → MC/DC(条件/判定を包含) → 複数条件カバレッジ(すべての組み合わせを要求する最強のもの)である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một điều kiện luôn được đánh giá cùng giá trị với một điều kiện khác trong mọi ca kiểm thử khả thi (do ràng buộc logic của chương trình) được gọi là gì, và nó ảnh hưởng thế nào đến MC/DC?",
      "en": "A condition that always evaluates to the same value as another condition in every feasible test case (due to the program's logical constraints) is called what, and how does it affect MC/DC?",
      "ja": "プログラムの論理的制約により、実行可能なすべてのテストケースで常に別の条件と同じ値になる条件は何と呼ばれ、それはMC/DCにどう影響しますか。"
    },
    "options": [
      {
        "vi": "Điều kiện chính (dominant condition) — luôn được ưu tiên kiểm thử trước tiên",
        "en": "A dominant condition — always prioritized for testing first",
        "ja": "優勢条件と呼ばれ、常に最初にテストされる"
      },
      {
        "vi": "Điều kiện dư thừa (redundant/coupled condition) — có thể khiến việc đạt MC/DC 'thuần túy' trở nên bất khả thi, cần áp dụng 'unique-cause MC/DC' có ngoại lệ hoặc chuyển sang 'masking MC/DC'",
        "en": "A redundant/coupled condition — it may make achieving 'pure' MC/DC infeasible, requiring an exception under 'unique-cause MC/DC' or a shift to 'masking MC/DC'",
        "ja": "冗長(結合)条件と呼ばれ、これにより「純粋な」MC/DCの達成が不可能になることがあり、「ユニークコーズMC/DC」での例外扱いや「マスキングMC/DC」への切り替えが必要になる"
      },
      {
        "vi": "Không có tên gọi đặc biệt và không ảnh hưởng gì đến việc thiết kế ca kiểm thử",
        "en": "It has no special name and has no effect on test case design",
        "ja": "特別な名称はなく、テストケース設計にも影響しない"
      },
      {
        "vi": "Điều kiện thừa số hóa (factored condition) — giúp giảm số ca kiểm thử MC/DC xuống còn 1",
        "en": "A factored condition — it reduces the number of required MC/DC test cases to exactly 1",
        "ja": "因数分解条件と呼ばれ、必要なMC/DCテストケース数を厳密に1に減らす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Các điều kiện coupled (liên kết logic với nhau) là thách thức nâng cao trong MC/DC vì không thể thay đổi độc lập; tài liệu ISTQB Advanced và các chuẩn công nghiệp công nhận đây là trường hợp đặc biệt cần xử lý bằng biến thể MC/DC phù hợp.",
      "en": "Coupled conditions (logically linked to one another) are an advanced MC/DC challenge because they cannot be varied independently; ISTQB Advanced material and industry standards recognize this as a special case requiring an appropriate MC/DC variant.",
      "ja": "結合条件(論理的に互いに連動している条件)は、独立して変化させることができないためMC/DCにおける高度な課題であり、ISTQB Advancedの資料や業界標準は、これを適切なMC/DCの変種で対処すべき特殊ケースとして認識している。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Test Manager cần báo cáo độ phủ mã nguồn cho hội đồng đánh giá an toàn. Nếu công cụ đo cho biết 'Condition Coverage đạt 100% nhưng MC/DC chỉ đạt 70%', điều gì có khả năng đúng nhất?",
      "en": "A Test Manager needs to report code coverage to a safety review board. If the tool reports 'Condition Coverage at 100% but MC/DC at only 70%', what is most likely true?",
      "ja": "テストマネージャーが安全性レビュー委員会にコードカバレッジを報告する必要があります。ツールが「条件カバレッジ100%だがMC/DCは70%のみ」と報告した場合、最も可能性が高いのはどれですか。"
    },
    "options": [
      {
        "vi": "Đây là lỗi công cụ vì MC/DC không thể thấp hơn Condition Coverage",
        "en": "This is a tool bug since MC/DC cannot be lower than Condition Coverage",
        "ja": "MC/DCが条件カバレッジより低くなることはあり得ないため、これはツールのバグである"
      },
      {
        "vi": "MC/DC luôn thấp hơn Condition Coverage một cách cố định 30% với mọi hệ thống",
        "en": "MC/DC is always fixed at exactly 30% lower than Condition Coverage in every system",
        "ja": "MC/DCはあらゆるシステムで常に条件カバレッジより厳密に30%低くなる"
      },
      {
        "vi": "Nhiều điều kiện đã từng nhận cả giá trị đúng và sai (thỏa Condition Coverage), nhưng chưa chứng minh được ảnh hưởng độc lập lên quyết định — vẫn còn thiếu ca kiểm thử để hoàn thiện MC/DC",
        "en": "Many conditions have taken both true and false values (satisfying Condition Coverage), but their independent effect on the decision has not yet been demonstrated — additional test cases are still needed to complete MC/DC",
        "ja": "多くの条件は真偽の両方の値を取っており(条件カバレッジを満たしている)、しかし判定への独立した影響がまだ証明されていない。MC/DCを完成させるにはさらにテストケースが必要である"
      },
      {
        "vi": "Kết quả này chứng tỏ mã nguồn không có bất kỳ điều kiện phức hợp nào",
        "en": "This result proves the source code has no compound conditions at all",
        "ja": "この結果はソースコードに複合条件が一切存在しないことを証明している"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì Condition Coverage chỉ yêu cầu mỗi điều kiện nhận true/false ít nhất một lần mà không cần chứng minh ảnh hưởng độc lập, một hệ thống hoàn toàn có thể đạt 100% CC nhưng còn thiếu nhiều ca để đạt MC/DC đầy đủ.",
      "en": "Since Condition Coverage only requires each condition to take true/false at least once without proving independent influence, a system can fully achieve 100% CC while still lacking many cases needed for full MC/DC.",
      "ja": "条件カバレッジは各条件が少なくとも1回真偽の値を取ればよく独立した影響を証明する必要がないため、システムは条件カバレッジ100%を達成していても完全なMC/DCに必要な多くのケースがまだ不足している可能性がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi phân tích một hàm có cấu trúc `switch-case` với 6 nhánh case cộng thêm default, Cyclomatic Complexity của hàm này (không tính các nhánh bên trong từng case) là bao nhiêu theo công thức đếm quyết định (số quyết định + 1)?",
      "en": "When analyzing a function with a `switch-case` structure having 6 case branches plus a default (not counting branches inside each case body), what is the Cyclomatic Complexity using the decision-count formula (number of decisions + 1)?",
      "ja": "6個のcase分岐とdefaultを持つswitch-case構造の関数を分析する場合(各caseの内部の分岐は数えない)、判定数+1の公式によるサイクロマティック複雑度はいくつですか。"
    },
    "options": [
      {
        "vi": "6",
        "en": "6",
        "ja": "6"
      },
      {
        "vi": "1",
        "en": "1",
        "ja": "1"
      },
      {
        "vi": "8",
        "en": "8",
        "ja": "8"
      },
      {
        "vi": "7",
        "en": "7",
        "ja": "7"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Switch với 6 case (không tính default là một nhánh quyết định riêng theo cách đếm phổ biến, default là lối thoát mặc định) tạo ra 6 điểm rẽ nhánh; áp dụng công thức số quyết định + 1 = 6 + 1 = 7.",
      "en": "A switch with 6 case branches (default typically treated as the fall-through default exit rather than a separate decision point) creates 6 branch points; applying decisions + 1 = 6 + 1 = 7.",
      "ja": "6個のcase分岐を持つswitch(defaultは別個の判定点ではなく既定の出口として扱うのが一般的)は6つの分岐点を作る。判定数+1の公式を適用すると6+1=7となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Đâu là điểm khác biệt quan trọng nhất giữa 'masking MC/DC' và 'unique-cause MC/DC'?",
      "en": "What is the most important difference between 'masking MC/DC' and 'unique-cause MC/DC'?",
      "ja": "「マスキングMC/DC」と「ユニークコーズMC/DC」の最も重要な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Unique-cause MC/DC yêu cầu mỗi điều kiện là NGUYÊN NHÂN DUY NHẤT thay đổi kết quả quyết định (nghiêm ngặt hơn, có thể bất khả thi với điều kiện coupled), trong khi masking MC/DC cho phép các điều kiện khác cũng thay đổi miễn là ảnh hưởng của chúng bị 'che' (masked) và chỉ điều kiện đang xét thực sự quyết định kết quả",
        "en": "Unique-cause MC/DC requires each condition to be the SOLE cause of the decision outcome change (stricter, can be infeasible with coupled conditions), while masking MC/DC allows other conditions to also vary as long as their effect is masked and only the condition under test truly determines the outcome",
        "ja": "ユニークコーズMC/DCは各条件が判定結果の変化の唯一の原因であることを要求する(より厳格で、結合条件がある場合は実行不可能になりうる)のに対し、マスキングMC/DCは他の条件の値も変化してよいが、その影響がマスクされ実際にテスト対象の条件のみが結果を決定していればよいとする"
      },
      {
        "vi": "Masking MC/DC chỉ áp dụng cho quyết định có duy nhất một điều kiện",
        "en": "Masking MC/DC only applies to decisions with a single condition",
        "ja": "マスキングMC/DCは条件が1つしかない判定にのみ適用される"
      },
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi theo từng công ty",
        "en": "Both are entirely identical, differing only in naming by company convention",
        "ja": "両者はまったく同一であり、企業ごとの命名の違いにすぎない"
      },
      {
        "vi": "Masking MC/DC không thể áp dụng cho ngôn ngữ có short-circuit evaluation",
        "en": "Masking MC/DC cannot be applied to languages with short-circuit evaluation",
        "ja": "マスキングMC/DCは短絡評価を行う言語には適用できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Unique-cause MC/DC là định nghĩa gốc nghiêm ngặt hơn, đôi khi không khả thi với biểu thức có điều kiện coupled hoặc short-circuit phức tạp; masking MC/DC là biến thể thực tế hơn, phù hợp với ngôn ngữ lập trình hiện đại có short-circuit evaluation.",
      "en": "Unique-cause MC/DC is the original, stricter definition, sometimes infeasible with coupled conditions or complex short-circuit expressions; masking MC/DC is the more practical variant suited to modern short-circuiting languages.",
      "ja": "ユニークコーズMC/DCは元来のより厳格な定義であり、結合条件や複雑な短絡評価式では実行不可能になることがある。マスキングMC/DCは、短絡評価を行う現代のプログラミング言語に適したより実用的な変種である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong đồ thị luồng điều khiển, công thức Cyclomatic Complexity V(G) = E - N + 2P (E: số cạnh, N: số nút, P: số thành phần liên thông) dùng để làm gì trong basis path testing?",
      "en": "In a control flow graph, the Cyclomatic Complexity formula V(G) = E - N + 2P (E: edges, N: nodes, P: connected components) is used for what purpose in basis path testing?",
      "ja": "制御フローグラフにおいて、サイクロマティック複雑度の公式V(G) = E - N + 2P(E:辺の数、N:ノード数、P:連結成分数)は、基底パステストにおいてどのような目的で使用されますか。"
    },
    "options": [
      {
        "vi": "Để tính tổng số dòng mã nguồn cần viết",
        "en": "To calculate the total number of source code lines to write",
        "ja": "記述すべきソースコードの総行数を計算するため"
      },
      {
        "vi": "Để xác định số lượng đường đi độc lập tuyến tính tối thiểu tạo thành tập cơ sở cần kiểm thử, từ đó suy ra số ca kiểm thử tối thiểu cho basis path testing",
        "en": "To determine the minimum number of linearly independent paths forming the basis set to be tested, thereby deriving the minimum number of test cases for basis path testing",
        "ja": "テストすべき基底集合を構成する線形独立パスの最小数を決定し、それにより基底パステストに必要な最小テストケース数を導き出すため"
      },
      {
        "vi": "Để tính thời gian thực thi trung bình của chương trình",
        "en": "To calculate the average execution time of the program",
        "ja": "プログラムの平均実行時間を計算するため"
      },
      {
        "vi": "Để đo mức độ trùng lặp mã nguồn (code duplication)",
        "en": "To measure the level of source code duplication",
        "ja": "ソースコードの重複度を測定するため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cyclomatic Complexity định lượng số đường đi độc lập tuyến tính cần thiết để bao phủ đầy đủ mọi quyết định trong đồ thị, trực tiếp xác định kích thước tập cơ sở cho basis path testing.",
      "en": "Cyclomatic Complexity quantifies the number of linearly independent paths needed to fully cover every decision in the graph, directly determining the size of the basis set for basis path testing.",
      "ja": "サイクロマティック複雑度は、グラフ内のすべての判定を完全にカバーするために必要な線形独立パスの数を定量化し、基底パステストの基底集合のサイズを直接決定する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Analyst viết một quyết định `A AND (B OR C)` và tạo 4 ca kiểm thử. Làm thế nào để xác minh nhanh bộ ca kiểm thử này có đạt MC/DC hay chỉ đạt Condition/Decision Coverage?",
      "en": "A Test Analyst writes a decision `A AND (B OR C)` and creates 4 test cases. How can they quickly verify whether this test set achieves MC/DC versus only Condition/Decision Coverage?",
      "ja": "あるテストアナリストが判定`A AND (B OR C)`を作成し、4件のテストケースを用意しました。このテストセットがMC/DCを達成しているか、単に条件/判定カバレッジにとどまっているかを迅速に検証するにはどうすればよいですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần kiểm tra tổng số ca kiểm thử có bằng 4 hay không, vì số lượng luôn quyết định độ phủ",
        "en": "Just check whether the total number of test cases equals 4, since the count alone always determines coverage",
        "ja": "テストケースの総数が4かどうかだけを確認すればよい。数だけが常にカバレッジを決定するため"
      },
      {
        "vi": "Kiểm tra xem mỗi điều kiện (A, B, C) đã từng nhận true/false hay chưa, nếu có thì mặc nhiên đạt MC/DC",
        "en": "Check only whether each condition (A, B, C) has taken both true and false; if so, MC/DC is automatically achieved",
        "ja": "各条件(A、B、C)が真偽の両方を取ったかどうかだけを確認すればよく、そうであれば自動的にMC/DCが達成される"
      },
      {
        "vi": "Với từng điều kiện, tìm một cặp ca kiểm thử mà chỉ điều kiện đó thay đổi giá trị (các điều kiện khác giữ nguyên hoặc kết quả của chúng không ảnh hưởng do short-circuit) và quan sát kết quả quyết định tổng thể có đổi theo hay không; nếu thiếu cặp nào cho điều kiện nào, bộ ca đó chưa đạt MC/DC cho điều kiện đó",
        "en": "For each condition, look for a pair of test cases where only that condition's value changes (others held fixed, or their effect nullified by short-circuiting) and check whether the overall decision outcome changes accordingly; if no such pair exists for a condition, the test set has not achieved MC/DC for that condition",
        "ja": "各条件について、その条件の値だけが変化し(他は固定、あるいは短絡評価によりその影響が無効化された)テストケースの組を探し、判定全体の結果がそれに応じて変化するかを確認する。ある条件についてそのような組が存在しなければ、そのテストセットはその条件に関してMC/DCを達成していない"
      },
      {
        "vi": "Không thể xác minh bằng phân tích thủ công, bắt buộc phải dùng công cụ đo động (dynamic coverage tool) duy nhất",
        "en": "It cannot be verified manually at all; only a dynamic coverage tool can determine this",
        "ja": "手動分析では一切検証できず、動的カバレッジツールのみが判定できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Xác minh MC/DC đòi hỏi kiểm tra từng điều kiện có cặp ca kiểm thử chứng minh ảnh hưởng độc lập lên kết quả quyết định — đây là bản chất khác biệt so với chỉ đếm true/false của Condition Coverage.",
      "en": "Verifying MC/DC requires checking, per condition, whether a pair of test cases proves its independent influence on the decision outcome — this is the essential distinction from merely counting true/false occurrences under Condition Coverage.",
      "ja": "MC/DCの検証には、各条件について判定結果への独立した影響を証明するテストケースの組が存在するかを確認する必要があり、これは単に真偽の出現を数える条件カバレッジとの本質的な違いである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi một tổ chức chuyển từ yêu cầu Branch Coverage sang MC/DC cho hệ thống điều khiển thiết bị y tế, điều gì thường xảy ra với số lượng ca kiểm thử và nỗ lực bảo trì bộ kiểm thử?",
      "en": "When an organization moves from requiring Branch Coverage to MC/DC for a medical device control system, what typically happens to the number of test cases and test suite maintenance effort?",
      "ja": "組織が医療機器制御システムに対する要求をブランチカバレッジからMC/DCに変更した場合、テストケース数とテストスイートの保守労力には通常何が起こりますか。"
    },
    "options": [
      {
        "vi": "Số ca kiểm thử và nỗ lực bảo trì thường giảm mạnh vì MC/DC đơn giản hơn",
        "en": "Test case count and maintenance effort typically decrease sharply because MC/DC is simpler",
        "ja": "MC/DCの方が単純であるため、テストケース数と保守労力は通常大きく減少する"
      },
      {
        "vi": "Số ca kiểm thử giảm nhưng nỗ lực bảo trì tăng gấp đôi không liên quan gì đến nhau",
        "en": "Test case count decreases while maintenance effort doubles, unrelated to each other",
        "ja": "テストケース数は減少するが保守労力は無関係に2倍になる"
      },
      {
        "vi": "Không có thay đổi nào vì MC/DC và Branch Coverage luôn tương đương",
        "en": "There is no change at all, since MC/DC and Branch Coverage are always equivalent",
        "ja": "MC/DCとブランチカバレッジは常に等価であるため、変化は一切ない"
      },
      {
        "vi": "Số ca kiểm thử và nỗ lực bảo trì thường tăng lên do phải thiết kế thêm ca chứng minh ảnh hưởng độc lập của từng điều kiện, đặc biệt khi mã nguồn thay đổi cấu trúc điều kiện",
        "en": "Test case count and maintenance effort typically increase, since additional cases must be designed to demonstrate each condition's independent influence, especially when the code's condition structure changes",
        "ja": "各条件の独立した影響を証明する追加のテストケースを設計する必要があり、特にコードの条件構造が変わる場合、テストケース数と保守労力は通常増加する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "MC/DC là tiêu chí mạnh hơn Branch Coverage, đòi hỏi thêm ca kiểm thử để chứng minh ảnh hưởng độc lập của mỗi điều kiện; khi cấu trúc điều kiện thay đổi, các ca này cũng cần rà soát và cập nhật, tăng chi phí bảo trì.",
      "en": "MC/DC is a stronger criterion than Branch Coverage, requiring additional test cases to demonstrate each condition's independent influence; when condition structure changes, these cases must be reviewed and updated, raising maintenance cost.",
      "ja": "MC/DCはブランチカバレッジより強力な基準であり、各条件の独立した影響を証明する追加のテストケースが必要となる。条件構造が変わると、これらのケースも見直しと更新が必要になり、保守コストが増加する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Phát biểu nào sau đây về mối quan hệ giữa MC/DC và độ phủ đường (path coverage) là ĐÚNG?",
      "en": "Which of the following statements about the relationship between MC/DC and path coverage is CORRECT?",
      "ja": "MC/DCとパスカバレッジの関係についての次の記述のうち、正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "MC/DC tập trung vào việc mỗi điều kiện ảnh hưởng độc lập đến quyết định cục bộ, trong khi path coverage quan tâm đến toàn bộ trình tự thực thi từ đầu đến cuối chương trình; đạt MC/DC không đảm bảo đạt path coverage và ngược lại",
        "en": "MC/DC focuses on each condition independently affecting a local decision, while path coverage concerns the entire end-to-end execution sequence of the program; achieving MC/DC does not guarantee path coverage and vice versa",
        "ja": "MC/DCは各条件が局所的な判定に独立して影響を与えることに焦点を当てるのに対し、パスカバレッジはプログラムの開始から終了までの実行順序全体に関心がある。MC/DCを達成してもパスカバレッジが保証されるわけではなく、その逆もまた同様である"
      },
      {
        "vi": "MC/DC luôn tương đương với 100% path coverage vì cả hai đều xét mọi tổ hợp điều kiện",
        "en": "MC/DC is always equivalent to 100% path coverage because both examine every condition combination",
        "ja": "どちらもすべての条件の組み合わせを検討するため、MC/DCは常に100%のパスカバレッジと等価である"
      },
      {
        "vi": "Path coverage là tập con của MC/DC nên đạt MC/DC tự động đạt path coverage",
        "en": "Path coverage is a subset of MC/DC, so achieving MC/DC automatically achieves path coverage",
        "ja": "パスカバレッジはMC/DCの部分集合であるため、MC/DCを達成すれば自動的にパスカバレッジも達成される"
      },
      {
        "vi": "Hai kỹ thuật này không thể áp dụng cùng lúc trong một dự án",
        "en": "These two techniques cannot be applied together in the same project",
        "ja": "これら2つの技法は同一プロジェクトで同時に適用することはできない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "MC/DC là tiêu chí độ phủ điều kiện cục bộ trong từng quyết định riêng lẻ, còn path coverage xét toàn bộ chuỗi thực thi qua nhiều quyết định liên tiếp; hai tiêu chí bổ trợ nhau nhưng không bao hàm lẫn nhau.",
      "en": "MC/DC is a local condition-coverage criterion within individual decisions, while path coverage examines the entire execution sequence across multiple consecutive decisions; the two criteria complement but do not subsume each other.",
      "ja": "MC/DCは個々の判定内における局所的な条件カバレッジ基準であり、パスカバレッジは複数の連続した判定にわたる実行順序全体を検討する。両者は互いに補完し合うが、一方が他方を包含するわけではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử dựa trên trải nghiệm nâng cao, mục đích chính của việc xây dựng một defect taxonomy (bảng phân loại lỗi) là gì?",
      "en": "In advanced experience-based testing, what is the main purpose of building a defect taxonomy?",
      "ja": "経験ベースの高度なテストにおいて、欠陥分類体系(ディフェクト・タキソノミー)を構築する主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn các kỹ thuật kiểm thử dựa trên đặc tả",
        "en": "To completely replace specification-based testing techniques",
        "ja": "仕様ベースのテスト技法を完全に置き換えるため"
      },
      {
        "vi": "Cung cấp danh mục có cấu trúc các dạng lỗi thường gặp để tester dựa vào đó gợi nhớ và thiết kế test case dựa trên kinh nghiệm",
        "en": "To provide a structured catalog of common defect types that testers use to recall patterns and design experience-based test cases",
        "ja": "よくある欠陥のパターンを体系的にまとめ、テスターが経験に基づいてテストケースを設計する際の想起材料として提供するため"
      },
      {
        "vi": "Tự động sinh test case mà không cần sự tham gia của con người",
        "en": "To auto-generate test cases without any human involvement",
        "ja": "人の関与なしにテストケースを自動生成するため"
      },
      {
        "vi": "Chỉ để phục vụ báo cáo lỗi gửi cho khách hàng cuối",
        "en": "Only to serve defect reports sent to end customers",
        "ja": "エンドユーザー向けの障害報告書のためだけに使うため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Defect taxonomy hệ thống hóa các dạng lỗi lịch sử/điển hình, giúp tester kỳ cựu áp dụng kinh nghiệm một cách có cấu trúc khi kiểm thử dựa trên trải nghiệm, thay vì chỉ dựa vào trực giác không kiểm soát được.",
      "en": "A defect taxonomy systematizes historical/typical defect patterns so experienced testers can apply their knowledge in a structured way during experience-based testing, rather than relying on uncontrolled intuition.",
      "ja": "欠陥分類体系は過去の典型的な欠陥パターンを体系化し、経験豊富なテスターが無秩序な直感だけに頼るのではなく、構造的に知見を活用して経験ベースのテストを行えるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Orthogonal Defect Classification (ODC) khác với việc chỉ ghi nhận mức độ nghiêm trọng của lỗi ở điểm nào?",
      "en": "How does Orthogonal Defect Classification (ODC) differ from simply recording defect severity?",
      "ja": "直交欠陥分類法(ODC)は、単に欠陥の重大度を記録するだけの方法と何が異なりますか。"
    },
    "options": [
      {
        "vi": "ODC chỉ dùng để đếm số lỗi theo module",
        "en": "ODC is only used to count defects per module",
        "ja": "ODCはモジュールごとの欠陥数を数えるためだけに使われる"
      },
      {
        "vi": "ODC dựa hoàn toàn vào cảm tính của người báo lỗi",
        "en": "ODC relies entirely on the reporter's subjective feeling",
        "ja": "ODCは報告者の主観的な感覚のみに基づく"
      },
      {
        "vi": "ODC phân loại lỗi theo nhiều thuộc tính trực giao như loại lỗi, tác nhân kích hoạt (trigger), giai đoạn phát hiện... để phân tích xu hướng và nguyên nhân hệ thống",
        "en": "ODC classifies defects along multiple orthogonal attributes such as defect type, trigger, and detection phase to analyze trends and systemic causes",
        "ja": "ODCは欠陥の種類、トリガー、検出フェーズなど複数の直交する属性で欠陥を分類し、傾向や体系的な原因を分析するために用いる"
      },
      {
        "vi": "ODC chỉ áp dụng được cho lỗi giao diện người dùng",
        "en": "ODC can only be applied to user interface defects",
        "ja": "ODCはユーザーインターフェースの欠陥にしか適用できない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "ODC là kỹ thuật phân loại lỗi theo nhiều chiều thuộc tính độc lập (trực giao), cho phép phân tích định lượng để tìm ra xu hướng và nguyên nhân hệ thống, sâu hơn nhiều so với chỉ ghi mức độ nghiêm trọng.",
      "en": "ODC classifies defects along multiple independent (orthogonal) attribute dimensions, enabling quantitative trend and root-cause analysis, far beyond just recording severity.",
      "ja": "ODCは互いに独立した(直交する)複数の属性軸で欠陥を分類し、重大度の記録だけでは得られない定量的な傾向分析や根本原因分析を可能にする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Sơ đồ xương cá (Ishikawa/fishbone diagram) được dùng trong phân tích lỗi để cải tiến quy trình nhằm mục đích gì?",
      "en": "What is an Ishikawa (fishbone) diagram used for in defect analysis for process improvement?",
      "ja": "プロセス改善のための欠陥分析において、石川ダイアグラム(特性要因図/フィッシュボーン図)は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Đo độ bao phủ mã nguồn của bộ test",
        "en": "To measure the code coverage of a test suite",
        "ja": "テストスイートのコードカバレッジを測定するため"
      },
      {
        "vi": "Ước lượng thời gian và công sức kiểm thử",
        "en": "To estimate testing time and effort",
        "ja": "テストの工数と期間を見積もるため"
      },
      {
        "vi": "Thiết kế bảng quyết định (decision table) cho test case",
        "en": "To design a decision table for test cases",
        "ja": "テストケース用のデシジョンテーブルを設計するため"
      },
      {
        "vi": "Trực quan hóa và phân nhóm các nguyên nhân tiềm ẩn (con người, quy trình, công cụ, môi trường...) dẫn tới một lỗi hoặc nhóm lỗi",
        "en": "To visualize and group potential root causes (people, process, tools, environment, etc.) behind a defect or defect cluster",
        "ja": "欠陥や欠陥群の背後にある潜在的な原因(人、プロセス、ツール、環境など)を可視化しグループ化するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sơ đồ xương cá là công cụ phân tích nguyên nhân gốc rễ, giúp nhóm các nguyên nhân tiềm ẩn theo danh mục để tìm ra gốc rễ thực sự, phục vụ cải tiến quy trình lâu dài thay vì chỉ vá lỗi bề mặt.",
      "en": "The fishbone diagram is a root-cause-analysis tool that groups potential causes into categories to find the true root cause, supporting long-term process improvement rather than surface-level fixes.",
      "ja": "特性要因図は根本原因分析のツールであり、潜在的な原因をカテゴリ別にグループ化して真の根本原因を見つけ出し、表面的な修正ではなく長期的なプロセス改善を支援する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi áp dụng phân tích Pareto (nguyên tắc 80/20) lên dữ liệu lỗi tích lũy qua nhiều release, kết luận thường rút ra là gì?",
      "en": "When applying Pareto analysis (the 80/20 rule) to accumulated defect data across releases, what conclusion is typically drawn?",
      "ja": "複数リリースにわたって蓄積された欠陥データにパレート分析(80/20の法則)を適用した場合、一般的にどのような結論が導かれますか。"
    },
    "options": [
      {
        "vi": "Phần lớn lỗi (khoảng 80%) thường xuất phát từ một số ít module hoặc nguyên nhân gốc (khoảng 20%), nên nên tập trung nguồn lực cải tiến vào nhóm này",
        "en": "A large share of defects (about 80%) typically originates from a small number of modules or root causes (about 20%), so improvement resources should focus there",
        "ja": "欠陥の大部分(約80%)は少数のモジュールや根本原因(約20%)に由来することが多く、改善リソースはそこに集中すべきである"
      },
      {
        "vi": "80% test case phải pass thì mới được release",
        "en": "80% of test cases must pass before release",
        "ja": "リリース前に80%のテストケースが合格しなければならない"
      },
      {
        "vi": "20% tester chịu trách nhiệm viết 80% tài liệu test",
        "en": "20% of testers are responsible for writing 80% of the test documentation",
        "ja": "20%のテスターがテスト文書の80%を作成する責任を負う"
      },
      {
        "vi": "Phân tích Pareto không liên quan gì tới cải tiến quy trình kiểm thử",
        "en": "Pareto analysis has no relevance to test process improvement",
        "ja": "パレート分析はテストプロセス改善とは無関係である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nguyên tắc Pareto giúp xác định số ít nguyên nhân/module gây ra phần lớn lỗi, từ đó ưu tiên nguồn lực cải tiến quy trình vào đúng chỗ có tác động lớn nhất.",
      "en": "The Pareto principle identifies the small number of causes/modules generating the majority of defects, allowing improvement resources to be prioritized where they have the greatest impact.",
      "ja": "パレートの法則は、欠陥の大部分を引き起こす少数の原因やモジュールを特定し、最も効果の大きい箇所に改善リソースを優先的に投入することを可能にする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Kỹ thuật '5 Whys' trong phân tích nguyên nhân gốc rễ của lỗi hoạt động như thế nào?",
      "en": "How does the '5 Whys' technique work in root-cause analysis of defects?",
      "ja": "欠陥の根本原因分析における「なぜなぜ分析(5回のなぜ)」はどのように機能しますか。"
    },
    "options": [
      {
        "vi": "Đặt 5 câu hỏi khảo sát ngẫu nhiên cho khách hàng cuối về mức độ hài lòng",
        "en": "Ask five random survey questions to end customers about satisfaction",
        "ja": "エンドユーザーに満足度に関する5つのランダムなアンケートを行う"
      },
      {
        "vi": "Liên tục hỏi 'tại sao' cho mỗi câu trả lời trước đó, thường khoảng 5 lần, để đi từ triệu chứng bề mặt tới nguyên nhân gốc rễ thực sự",
        "en": "Repeatedly ask 'why' about each preceding answer, typically about five times, to move from a surface symptom to the true root cause",
        "ja": "直前の回答に対して繰り返し「なぜ」を問い、通常5回程度掘り下げることで表面的な症状から真の根本原因にたどり着く"
      },
      {
        "vi": "Chia lỗi thành đúng 5 mức độ nghiêm trọng để ưu tiên xử lý",
        "en": "Divide defects into exactly five severity levels for prioritization",
        "ja": "欠陥を優先順位付けのためにちょうど5段階の重大度に分ける"
      },
      {
        "vi": "Yêu cầu 5 tester khác nhau độc lập review cùng một lỗi trước khi đóng",
        "en": "Require five different testers to independently review the same defect before closing it",
        "ja": "欠陥をクローズする前に5人の異なるテスターが独立してレビューすることを求める"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "5 Whys là kỹ thuật đơn giản nhưng hiệu quả: mỗi lần hỏi 'tại sao' sẽ đào sâu thêm một lớp nguyên nhân, giúp tránh dừng lại ở nguyên nhân bề mặt và tìm ra gốc rễ thực sự cần khắc phục để cải tiến quy trình.",
      "en": "5 Whys is a simple yet effective technique: each 'why' digs one layer deeper into causation, preventing the analysis from stopping at a surface cause and helping find the true root cause to fix for process improvement.",
      "ja": "なぜなぜ分析はシンプルだが効果的な手法であり、「なぜ」を問うたびに原因を一段深く掘り下げ、表面的な原因で止まらずプロセス改善のために修正すべき真の根本原因を見つけ出す。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Nguyên lý 'defect clustering' (lỗi tập trung theo cụm) được vận dụng như thế nào khi thiết kế charter cho exploratory testing?",
      "en": "How is the 'defect clustering' principle applied when designing charters for exploratory testing?",
      "ja": "「欠陥のクラスタリング(集中)」の原則は、探索的テストのチャーターを設計する際にどのように活用されますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua hoàn toàn các module đã từng có lỗi vì cho rằng đã được sửa triệt để",
        "en": "Completely skip modules that had defects before, assuming they were fully fixed",
        "ja": "以前欠陥があったモジュールは完全に修正済みとみなし、完全にスキップする"
      },
      {
        "vi": "Chia đều thời gian kiểm thử cho tất cả module bất kể lịch sử lỗi",
        "en": "Split testing time equally across all modules regardless of defect history",
        "ja": "欠陥履歴に関係なくすべてのモジュールにテスト時間を均等に配分する"
      },
      {
        "vi": "Ưu tiên phân bổ thời gian kiểm thử thăm dò nhiều hơn vào các module có lịch sử phát hiện nhiều lỗi trước đây",
        "en": "Allocate more exploratory testing time to modules with a history of high defect density",
        "ja": "過去に欠陥密度が高かったモジュールに探索的テストの時間をより多く割り当てる"
      },
      {
        "vi": "Chỉ kiểm thử các module mới hoàn toàn chưa từng được test",
        "en": "Only test brand-new modules that have never been tested before",
        "ja": "これまで一度もテストされていない完全に新しいモジュールのみをテストする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nguyên lý defect clustering cho thấy phần lớn lỗi thường tập trung ở một số ít module; tận dụng dữ liệu lịch sử này để định hướng charter thăm dò giúp tăng hiệu quả phát hiện lỗi.",
      "en": "The defect clustering principle shows that most defects tend to concentrate in a small number of modules; leveraging this historical data to guide exploratory charters increases defect-detection efficiency.",
      "ja": "欠陥クラスタリングの原則は、欠陥の大部分が少数のモジュールに集中する傾向があることを示しており、この履歴データを活用して探索的テストのチャーターを方向付けることで欠陥検出の効率が高まる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Chuẩn IEEE 1044 liên quan tới lĩnh vực nào trong phân tích lỗi?",
      "en": "What area of defect analysis does the IEEE 1044 standard relate to?",
      "ja": "IEEE 1044規格は欠陥分析のどの分野に関連していますか。"
    },
    "options": [
      {
        "vi": "Quy định định dạng file cấu hình CI/CD",
        "en": "Defining the format of CI/CD configuration files",
        "ja": "CI/CD設定ファイルの形式を規定すること"
      },
      {
        "vi": "Quy định cú pháp ngôn ngữ lập trình Java",
        "en": "Defining the syntax of the Java programming language",
        "ja": "Javaプログラミング言語の構文を規定すること"
      },
      {
        "vi": "Chuẩn hóa giao thức mạng TCP/IP",
        "en": "Standardizing the TCP/IP network protocol",
        "ja": "TCP/IPネットワークプロトコルを標準化すること"
      },
      {
        "vi": "Chuẩn hóa quy trình phân loại (classification) sự cố/lỗi phần mềm để có dữ liệu nhất quán phục vụ phân tích và cải tiến",
        "en": "Standardizing the classification process for software anomalies/defects to enable consistent data for analysis and improvement",
        "ja": "分析と改善のために一貫したデータを得られるよう、ソフトウェアの異常・欠陥の分類プロセスを標準化すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "IEEE 1044 là chuẩn quốc tế về phân loại sự cố phần mềm (anomaly classification), cung cấp khung thuộc tính chung để tổ chức dữ liệu lỗi nhất quán, làm nền cho phân tích nguyên nhân và cải tiến quy trình.",
      "en": "IEEE 1044 is an international standard for software anomaly classification, providing a common attribute framework to organize defect data consistently as a foundation for root-cause analysis and process improvement.",
      "ja": "IEEE 1044はソフトウェアの異常分類に関する国際規格であり、欠陥データを一貫して整理するための共通の属性フレームワークを提供し、根本原因分析やプロセス改善の基盤となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "'Defect age' (tuổi của lỗi) trong phân tích cải tiến quy trình thường được hiểu là gì?",
      "en": "In process-improvement defect analysis, what does 'defect age' typically refer to?",
      "ja": "プロセス改善のための欠陥分析において、「欠陥の年齢(ディフェクト・エイジ)」とは一般的に何を指しますか。"
    },
    "options": [
      {
        "vi": "Khoảng thời gian (hoặc số giai đoạn/pha) từ lúc lỗi bị đưa vào (injection) tới lúc lỗi được phát hiện (detection)",
        "en": "The time span (or number of phases) between when a defect was injected and when it was detected",
        "ja": "欠陥が混入されてから検出されるまでの期間(またはフェーズ数)"
      },
      {
        "vi": "Số năm sản phẩm đã tồn tại trên thị trường",
        "en": "The number of years the product has existed on the market",
        "ja": "製品が市場に存在してきた年数"
      },
      {
        "vi": "Tuổi nghề của tester phát hiện ra lỗi",
        "en": "The years of experience of the tester who found the defect",
        "ja": "欠陥を発見したテスターの経験年数"
      },
      {
        "vi": "Thời gian lỗi được để mở trước khi bị đóng do trùng lặp",
        "en": "The time a defect remains open before being closed as a duplicate",
        "ja": "重複としてクローズされるまで欠陥がオープンのままだった期間"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Defect age đo khoảng cách giữa giai đoạn lỗi phát sinh và giai đoạn phát hiện; lỗi 'già' (phát hiện muộn) thường tốn kém hơn để sửa và là chỉ dấu quan trọng cho việc cải tiến khả năng phát hiện sớm trong quy trình.",
      "en": "Defect age measures the gap between the phase a defect was introduced and the phase it was found; 'older' defects (found later) are typically costlier to fix and are a key indicator for improving early-detection capability in the process.",
      "ja": "欠陥の年齢は、欠陥が混入されたフェーズと検出されたフェーズの間の距離を測るものであり、「古い」(遅く発見された)欠陥は修正コストが高くなる傾向があり、プロセスにおける早期検出能力を改善するための重要な指標となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Chỉ số 'defect leakage' giữa các cấp độ kiểm thử (ví dụ từ System Test sang UAT) phản ánh điều gì?",
      "en": "What does the 'defect leakage' metric between test levels (e.g., from System Test to UAT) reflect?",
      "ja": "テストレベル間(例えばシステムテストからUATへ)の「欠陥流出(ディフェクト・リーケージ)」指標は何を表しますか。"
    },
    "options": [
      {
        "vi": "Tổng số lỗi được sửa thành công trong một release",
        "en": "The total number of defects successfully fixed in a release",
        "ja": "リリースで正常に修正された欠陥の総数"
      },
      {
        "vi": "Số lượng lỗi đáng lẽ phải bị phát hiện ở cấp độ kiểm thử trước đó nhưng lại 'lọt' sang cấp độ sau, cho thấy khoảng trống trong hiệu quả kiểm thử ở cấp trước",
        "en": "The number of defects that should have been caught at an earlier test level but instead 'leaked' into a later level, indicating gaps in effectiveness at the earlier level",
        "ja": "本来は前段階のテストレベルで検出されるべきだったのに後段のレベルへ「流出」してしまった欠陥の数であり、前段階のテストの有効性における弱点を示す"
      },
      {
        "vi": "Số lỗi bị hủy vì trùng lặp báo cáo",
        "en": "The number of defects rejected as duplicate reports",
        "ja": "重複報告として却下された欠陥の数"
      },
      {
        "vi": "Tỷ lệ test case tự động hóa thành công",
        "en": "The success rate of automated test cases",
        "ja": "自動化テストケースの成功率"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Defect leakage đo lượng lỗi 'trốn' được qua một cấp kiểm thử và bị bắt ở cấp sau; xu hướng leakage tăng theo thời gian là tín hiệu để cải tiến kỹ thuật/quy trình kiểm thử tại cấp bị lọt.",
      "en": "Defect leakage measures the volume of defects that escape one test level and are caught at a later one; a rising leakage trend over time signals the need to improve testing techniques/process at the leaking level.",
      "ja": "欠陥流出は、あるテストレベルをすり抜けて後のレベルで捕捉された欠陥の量を測定するものであり、時間の経過とともに流出傾向が増加している場合は、流出元のレベルにおけるテスト技法・プロセスの改善が必要であることを示す。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bộ phân loại lỗi kinh điển của Boris Beizer, các nhóm lỗi thường được chia theo tiêu chí nào?",
      "en": "In Boris Beizer's classic bug taxonomy, defects are typically grouped according to which criterion?",
      "ja": "ボリス・バイザーの古典的なバグ分類法では、欠陥は一般的にどのような基準で分類されますか。"
    },
    "options": [
      {
        "vi": "Theo tên khách hàng báo lỗi",
        "en": "By the name of the customer who reported the bug",
        "ja": "バグを報告した顧客名によって"
      },
      {
        "vi": "Theo số dòng code bị ảnh hưởng",
        "en": "By the number of code lines affected",
        "ja": "影響を受けたコード行数によって"
      },
      {
        "vi": "Theo nguồn gốc chức năng/kỹ thuật của lỗi (ví dụ: chức năng, cấu trúc dữ liệu, logic điều khiển, giao diện, kiểm tra, tài liệu...)",
        "en": "By the functional/technical origin of the defect (e.g., functionality, data structures, control logic, interfaces, checking, documentation, etc.)",
        "ja": "欠陥の機能的・技術的な発生源(例:機能、データ構造、制御ロジック、インターフェース、検査、文書化など)によって"
      },
      {
        "vi": "Theo màu sắc ưu tiên trên bảng Kanban",
        "en": "By the priority color used on a Kanban board",
        "ja": "かんばんボードの優先度を表す色によって"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Beizer phân loại lỗi theo nguồn gốc kỹ thuật/chức năng phát sinh (function, structure, data, coding, interface, system, test...), giúp tester dùng làm checklist khi thiết kế test dựa trên kinh nghiệm.",
      "en": "Beizer classifies bugs by their functional/technical origin (function, structure, data, coding, interface, system, test, etc.), which testers can use as a checklist when designing experience-based tests.",
      "ja": "バイザーはバグを機能・構造・データ・コーディング・インターフェース・システム・テストなど、発生源となる機能的・技術的な観点で分類しており、テスターが経験ベースのテスト設計を行う際のチェックリストとして活用できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Checklist-based testing khai thác defect taxonomy như thế nào?",
      "en": "How does checklist-based testing leverage a defect taxonomy?",
      "ja": "チェックリストベーステストは欠陥分類体系をどのように活用しますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua hoàn toàn dữ liệu lỗi lịch sử, chỉ dựa vào đặc tả yêu cầu",
        "en": "It ignores historical defect data entirely and relies only on requirement specifications",
        "ja": "過去の欠陥データを完全に無視し、要求仕様のみに基づく"
      },
      {
        "vi": "Tự động tạo script kiểm thử mà không cần checklist",
        "en": "It automatically generates test scripts without needing a checklist",
        "ja": "チェックリストなしでテストスクリプトを自動生成する"
      },
      {
        "vi": "Chỉ áp dụng được cho kiểm thử hiệu năng",
        "en": "It can only be applied to performance testing",
        "ja": "パフォーマンステストにのみ適用できる"
      },
      {
        "vi": "Chuyển các dạng lỗi/vấn đề thường gặp trong taxonomy thành các mục kiểm tra ('items to check') để tester rà soát có hệ thống",
        "en": "It turns common defect/issue patterns from the taxonomy into checklist items for testers to systematically verify",
        "ja": "分類体系に含まれるよくある欠陥・問題のパターンを「確認項目」に変換し、テスターが体系的に確認できるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Checklist-based testing sử dụng các dạng lỗi/tình huống điển hình rút ra từ taxonomy (và kinh nghiệm) làm danh sách nhắc nhở, giúp tester không bỏ sót các vấn đề đã từng xảy ra trong quá khứ.",
      "en": "Checklist-based testing uses typical defect patterns/situations drawn from a taxonomy (and experience) as reminder lists, helping testers avoid missing issues that have occurred before.",
      "ja": "チェックリストベーステストは、分類体系(および経験)から導き出された典型的な欠陥パターンや状況をリマインダーリストとして使用し、テスターが過去に発生した問題を見落とさないようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Error guessing (đoán lỗi) khác gì so với việc chỉ áp dụng máy móc một defect taxonomy có sẵn?",
      "en": "How does error guessing differ from mechanically applying a pre-built defect taxonomy?",
      "ja": "エラー推測法は、既製の欠陥分類体系を機械的に適用するのとどう異なりますか。"
    },
    "options": [
      {
        "vi": "Error guessing dựa trên kinh nghiệm, trực giác và kiến thức về hệ thống/domain cụ thể của tester, có thể vượt ra ngoài danh mục taxonomy đã liệt kê để phát hiện lỗi bất ngờ",
        "en": "Error guessing draws on the tester's experience, intuition, and specific system/domain knowledge, and can go beyond a listed taxonomy to uncover unexpected defects",
        "ja": "エラー推測法はテスターの経験、直感、対象システム・ドメインの知識に基づくものであり、既存の分類体系に列挙された項目を超えて予期しない欠陥を発見できる"
      },
      {
        "vi": "Error guessing không cần bất kỳ kinh nghiệm nào của tester",
        "en": "Error guessing requires no tester experience at all",
        "ja": "エラー推測法はテスターの経験を一切必要としない"
      },
      {
        "vi": "Error guessing chỉ dùng được trong kiểm thử tự động",
        "en": "Error guessing can only be used in automated testing",
        "ja": "エラー推測法は自動テストでしか使用できない"
      },
      {
        "vi": "Error guessing luôn cho kết quả giống hệt taxonomy chuẩn",
        "en": "Error guessing always produces results identical to a standard taxonomy",
        "ja": "エラー推測法は常に標準的な分類体系と全く同じ結果を生む"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Taxonomy cung cấp khung tham chiếu có cấu trúc, còn error guessing tận dụng trực giác và kinh nghiệm cá nhân/domain để tìm ra các lỗi mà danh mục sẵn có chưa liệt kê, hai kỹ thuật bổ trợ lẫn nhau.",
      "en": "A taxonomy provides a structured reference frame, while error guessing leverages personal/domain intuition and experience to find defects not listed in the existing catalog; the two techniques complement each other.",
      "ja": "分類体系は構造化された参照枠組みを提供する一方、エラー推測法は個人的・ドメイン的な直感と経験を活用して既存のカタログに載っていない欠陥を見つけ出すものであり、両技法は互いに補完し合う。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Session-based test management (SBTM) hỗ trợ phân tích lỗi để cải tiến quy trình bằng cách nào?",
      "en": "How does session-based test management (SBTM) support defect analysis for process improvement?",
      "ja": "セッションベーステスト管理(SBTM)は、プロセス改善のための欠陥分析をどのように支援しますか。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu ghi log trong exploratory testing",
        "en": "It completely eliminates the need to log anything during exploratory testing",
        "ja": "探索的テスト中に何も記録する必要をなくす"
      },
      {
        "vi": "Ghi lại có cấu trúc mục tiêu, phạm vi, thời gian và kết quả của mỗi phiên thăm dò (bao gồm lỗi tìm được), tạo dữ liệu để đánh giá hiệu quả và định hướng cải tiến",
        "en": "It structurally records the charter, scope, duration, and outcome of each exploratory session (including defects found), creating data to evaluate effectiveness and guide improvement",
        "ja": "各探索セッションのチャーター、範囲、所要時間、結果(発見された欠陥を含む)を構造的に記録し、有効性の評価と改善の方向付けに使えるデータを生み出す"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử hồi quy tự động",
        "en": "It only applies to automated regression testing",
        "ja": "自動化された回帰テストにのみ適用される"
      },
      {
        "vi": "Thay thế hoàn toàn việc quản lý test case truyền thống trong mọi dự án",
        "en": "It fully replaces traditional test case management in every project",
        "ja": "あらゆるプロジェクトで従来のテストケース管理を完全に置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "SBTM chia exploratory testing thành các phiên có mục tiêu (charter) rõ ràng và ghi nhận kết quả (bao gồm lỗi), giúp có dữ liệu định lượng để phân tích hiệu quả kiểm thử và định hướng cải tiến quy trình.",
      "en": "SBTM breaks exploratory testing into sessions with clear charters and recorded outcomes (including defects), yielding quantitative data to analyze test effectiveness and guide process improvement.",
      "ja": "SBTMは探索的テストを明確なチャーターを持つセッションに分割し、結果(欠陥を含む)を記録することで、テストの有効性を分析しプロセス改善の方向性を示すための定量的データを提供する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Thời điểm tổ chức buổi phân tích nguyên nhân (causal analysis meeting) hiệu quả nhất thường là khi nào?",
      "en": "When is a causal analysis meeting typically most effective to hold?",
      "ja": "原因分析(コーザル・アナリシス)ミーティングを実施するのに最も効果的なタイミングは通常いつですか。"
    },
    "options": [
      {
        "vi": "Ngay khi tester vừa gõ xong mô tả lỗi, trước khi lỗi được xác nhận",
        "en": "Immediately after a tester types up a defect description, before it is confirmed",
        "ja": "欠陥がまだ確認されていない、テスターが記述を書き終えた直後"
      },
      {
        "vi": "Chỉ khi có yêu cầu pháp lý bắt buộc",
        "en": "Only when legally mandated",
        "ja": "法的要件がある場合のみ"
      },
      {
        "vi": "Sau khi kết thúc một giai đoạn/release, dựa trên tập hợp dữ liệu lỗi đã được phân loại và xác nhận, để tìm ra xu hướng và nguyên nhân hệ thống",
        "en": "After a phase/release ends, based on a set of classified and confirmed defect data, to identify trends and systemic causes",
        "ja": "フェーズやリリースが終了した後、分類・確認済みの欠陥データ一式に基づき、傾向と体系的な原因を見出すために実施する"
      },
      {
        "vi": "Trước khi bắt đầu dự án, khi chưa có dữ liệu lỗi nào",
        "en": "Before the project starts, when no defect data exists yet",
        "ja": "欠陥データが全く存在しないプロジェクト開始前"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phân tích nguyên nhân cần dựa trên một tập dữ liệu lỗi đủ lớn, đã được xác nhận và phân loại, thường thực hiện sau mỗi giai đoạn/release trong khuôn khổ retrospective để rút ra xu hướng và hành động cải tiến quy trình.",
      "en": "Root-cause analysis needs a sufficiently large set of confirmed, classified defect data, typically performed after each phase/release as part of a retrospective to surface trends and process-improvement actions.",
      "ja": "根本原因分析には、確認・分類済みの欠陥データが十分な量そろっている必要があり、通常は各フェーズ・リリースの終了後にレトロスペクティブの一環として実施し、傾向とプロセス改善のアクションを導き出す。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Việc phân biệt 'giai đoạn lỗi được đưa vào (injection phase)' và 'giai đoạn lỗi được phát hiện (detection phase)' mang lại giá trị gì cho cải tiến quy trình?",
      "en": "What value does distinguishing between a defect's 'injection phase' and 'detection phase' bring to process improvement?",
      "ja": "欠陥の「混入フェーズ」と「検出フェーズ」を区別することは、プロセス改善にどのような価値をもたらしますか。"
    },
    "options": [
      {
        "vi": "Không có giá trị thực tế, chỉ là thủ tục hành chính",
        "en": "No real value; it is just administrative procedure",
        "ja": "実際的な価値はなく、単なる事務手続きに過ぎない"
      },
      {
        "vi": "Chỉ áp dụng được với dự án theo mô hình Waterfall",
        "en": "It only applies to projects using the Waterfall model",
        "ja": "ウォーターフォールモデルのプロジェクトにしか適用できない"
      },
      {
        "vi": "Chỉ dùng để tính lương thưởng cho developer",
        "en": "It is only used to calculate developer bonuses",
        "ja": "開発者のボーナス計算にのみ使用される"
      },
      {
        "vi": "Giúp xác định các giai đoạn phát triển nào đang tạo ra nhiều lỗi và giai đoạn kiểm thử nào đang bỏ sót chúng, từ đó nhắm cải tiến đúng chỗ (ví dụ tăng cường review thiết kế nếu lỗi chủ yếu sinh ra ở đó)",
        "en": "It helps identify which development phases generate the most defects and which test phases miss them, allowing improvement to target the right place (e.g., strengthening design reviews if most defects originate there)",
        "ja": "どの開発フェーズで多くの欠陥が生まれ、どのテストフェーズでそれらが見逃されているかを特定するのに役立ち、改善を正しい箇所(例えば欠陥の多くが発生している場合は設計レビューの強化)に的確に向けられる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Phân tích injection vs detection phase cho thấy khoảng cách giữa nơi lỗi sinh ra và nơi lỗi bị bắt, giúp tổ chức đầu tư cải tiến đúng vào hoạt động phòng ngừa (review, phân tích yêu cầu...) hoặc phát hiện sớm phù hợp.",
      "en": "Comparing injection vs detection phase reveals the gap between where a defect originates and where it is caught, allowing an organization to invest improvement effort correctly in prevention (reviews, requirements analysis, etc.) or earlier detection.",
      "ja": "混入フェーズと検出フェーズを比較することで、欠陥が発生した場所と捕捉された場所とのギャップが明らかになり、組織はレビューや要件分析といった予防活動や、より早期の検出活動に適切に改善投資を行うことができる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Nhóm bảo mật (security) trong một dự án muốn xây dựng test charter dựa trên taxonomy chuyên biệt cho lỗ hổng bảo mật. Nguồn taxonomy nào phù hợp nhất để tham khảo?",
      "en": "A security team wants to build test charters based on a specialized taxonomy of security vulnerabilities. Which taxonomy source is most appropriate to reference?",
      "ja": "あるプロジェクトのセキュリティチームが、セキュリティ脆弱性に特化した分類体系に基づいてテストチャーターを作成したいと考えています。参照すべき最も適切な分類体系の出典はどれですか。"
    },
    "options": [
      {
        "vi": "Danh mục lỗi phổ biến của OWASP (ví dụ OWASP Top 10) như một dạng taxonomy chuyên biệt cho bảo mật",
        "en": "The OWASP catalog of common vulnerabilities (e.g., OWASP Top 10) as a security-specific taxonomy",
        "ja": "セキュリティ特化の分類体系として、OWASPのよくある脆弱性カタログ(例:OWASP Top 10)"
      },
      {
        "vi": "Bảng quy đổi tiền tệ quốc tế",
        "en": "An international currency conversion table",
        "ja": "国際通貨換算表"
      },
      {
        "vi": "Sổ tay phong cách viết tài liệu kỹ thuật",
        "en": "A technical writing style guide",
        "ja": "技術文書のスタイルガイド"
      },
      {
        "vi": "Danh sách mã màu thương hiệu của công ty",
        "en": "The company's brand color code list",
        "ja": "自社のブランドカラーコード一覧"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Defect taxonomy nên được tùy biến theo domain; với bảo mật, OWASP Top 10 và các danh mục lỗ hổng liên quan là taxonomy chuyên biệt phù hợp để định hướng charter kiểm thử bảo mật dựa trên kinh nghiệm.",
      "en": "Defect taxonomies should be tailored to the domain; for security, OWASP Top 10 and related vulnerability catalogs are the appropriate specialized taxonomy to guide experience-based security test charters.",
      "ja": "欠陥分類体系はドメインに合わせて調整すべきであり、セキュリティ分野ではOWASP Top 10や関連する脆弱性カタログが、経験ベースのセキュリティテストチャーターを方向付けるのに適した専門分類体系となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một taxonomy phân loại lỗi, 'defect type' (loại lỗi, ví dụ: logic, giao diện, dữ liệu) khác với 'severity' (mức độ nghiêm trọng) như thế nào?",
      "en": "In a defect taxonomy, how does 'defect type' (e.g., logic, interface, data) differ from 'severity'?",
      "ja": "欠陥分類体系において、「欠陥タイプ」(例:ロジック、インターフェース、データ)は「重大度(severity)」とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Hai khái niệm này hoàn toàn giống nhau và có thể dùng thay thế cho nhau",
        "en": "The two concepts are identical and interchangeable",
        "ja": "この2つの概念は全く同じであり、互いに置き換え可能である"
      },
      {
        "vi": "Defect type mô tả bản chất/nguồn gốc kỹ thuật của lỗi, còn severity đo mức độ tác động của lỗi lên hệ thống/người dùng — hai chiều thông tin độc lập, một lỗi loại 'logic' có thể vừa nhẹ vừa nghiêm trọng tùy ngữ cảnh",
        "en": "Defect type describes the technical nature/origin of the defect, while severity measures its impact on the system/user — two independent dimensions; a 'logic' defect can be minor or critical depending on context",
        "ja": "欠陥タイプは欠陥の技術的な性質・発生源を表し、重大度はシステムやユーザーへの影響度を測る、互いに独立した2つの情報軸である。「ロジック」タイプの欠陥は文脈によって軽微にも重大にもなり得る"
      },
      {
        "vi": "Severity chỉ áp dụng cho lỗi bảo mật, còn defect type chỉ áp dụng cho lỗi giao diện",
        "en": "Severity only applies to security defects, while defect type only applies to UI defects",
        "ja": "重大度はセキュリティ欠陥にのみ適用され、欠陥タイプはUI欠陥にのみ適用される"
      },
      {
        "vi": "Defect type do khách hàng quyết định, severity do tester quyết định, không liên quan gì đến nhau",
        "en": "Defect type is decided by the customer and severity by the tester, with no relation between them",
        "ja": "欠陥タイプは顧客が決定し、重大度はテスターが決定するもので、両者に関連はない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong các mô hình phân loại lỗi trưởng thành (như ODC), type và severity là hai thuộc tính trực giao khác nhau: một đo bản chất kỹ thuật, một đo tác động; cần phân tích cả hai để hiểu đầy đủ bức tranh chất lượng.",
      "en": "In mature defect classification models (like ODC), type and severity are two distinct orthogonal attributes: one measures technical nature, the other measures impact; both need to be analyzed to understand the full quality picture.",
      "ja": "ODCのような成熟した欠陥分類モデルでは、タイプと重大度は互いに独立した異なる属性であり、一方は技術的な性質を、もう一方は影響度を測るものである。品質の全体像を理解するには両方を分析する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "'Attack-based testing' (kiểm thử theo tấn công) khác với error guessing thông thường ở điểm nào?",
      "en": "How does 'attack-based testing' differ from ordinary error guessing?",
      "ja": "「アタックベーステスト」は通常のエラー推測法とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Attack-based testing không cần bất kỳ hiểu biết nào về lỗi trong quá khứ",
        "en": "Attack-based testing requires no knowledge of past defects at all",
        "ja": "アタックベーステストは過去の欠陥に関する知識を一切必要としない"
      },
      {
        "vi": "Attack-based testing chỉ dùng cho kiểm thử tải (load testing)",
        "en": "Attack-based testing is only used for load testing",
        "ja": "アタックベーステストは負荷テストにのみ使用される"
      },
      {
        "vi": "Attack-based testing sử dụng các 'software attack' — kịch bản cụ thể, có cấu trúc, được xây dựng từ các dạng lỗi đã biết trước, thay vì chỉ dựa vào trực giác tự do như error guessing thuần túy",
        "en": "Attack-based testing uses 'software attacks' — specific, structured scenarios built from known failure patterns — rather than relying purely on free-form intuition as in plain error guessing",
        "ja": "アタックベーステストは、単なる自由な直感に頼るエラー推測法とは異なり、既知の故障パターンから構築された具体的で構造化されたシナリオである「ソフトウェアアタック」を用いる"
      },
      {
        "vi": "Attack-based testing hoàn toàn giống error guessing, chỉ khác tên gọi",
        "en": "Attack-based testing is identical to error guessing, just with a different name",
        "ja": "アタックベーステストはエラー推測法と全く同じで、名称が違うだけである"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Attack là kịch bản kiểm thử được thiết kế có chủ đích, cụ thể hóa từ các dạng lỗi/điều kiện thất bại đã biết (ví dụ boundary, input không hợp lệ...), có tính lặp lại và hệ thống hơn so với đoán lỗi tự do.",
      "en": "An attack is a deliberately designed test scenario, made concrete from known failure patterns/conditions (e.g., boundaries, invalid input), making it more repeatable and systematic than free-form error guessing.",
      "ja": "アタックとは、既知の故障パターン・条件(境界値、不正な入力など)から具体化された、意図的に設計されたテストシナリオであり、自由なエラー推測よりも再現性が高く体系的である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Với hệ thống an toàn tính mạng (safety-critical), defect taxonomy chuyên biệt thường bổ sung thêm khía cạnh nào so với taxonomy thông thường?",
      "en": "For safety-critical systems, what aspect does a specialized defect taxonomy typically add compared to a generic taxonomy?",
      "ja": "安全性が重要な(セーフティクリティカル)システムでは、一般的な分類体系と比べて専門化された欠陥分類体系にどのような側面が追加されることが多いですか。"
    },
    "options": [
      {
        "vi": "Chỉ phân loại theo tên nhà cung cấp phần cứng",
        "en": "Classification only by hardware vendor name",
        "ja": "ハードウェアベンダー名による分類のみ"
      },
      {
        "vi": "Chỉ tập trung phân loại theo màu giao diện",
        "en": "Focusing solely on classification by UI color scheme",
        "ja": "UIの配色による分類のみに焦点を当てる"
      },
      {
        "vi": "Loại bỏ hoàn toàn severity vì mọi lỗi đều coi là như nhau",
        "en": "Eliminating severity entirely because all defects are treated equally",
        "ja": "すべての欠陥を同等とみなし、重大度の概念を完全に排除する"
      },
      {
        "vi": "Phân loại theo mức độ nguy hại tiềm tàng (hazard severity) và mối liên hệ với các yêu cầu an toàn/tiêu chuẩn liên quan (ví dụ IEC 61508, ISO 26262)",
        "en": "Classification by potential hazard severity and traceability to safety requirements/relevant standards (e.g., IEC 61508, ISO 26262)",
        "ja": "潜在的な危害の重大度(ハザード重大度)による分類、および関連する安全要件・規格(IEC 61508、ISO 26262など)とのトレーサビリティ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong lĩnh vực safety-critical, taxonomy cần gắn lỗi với mức độ nguy hại có thể gây ra và với các yêu cầu/tiêu chuẩn an toàn liên quan, để đảm bảo phân tích và ưu tiên xử lý phù hợp với rủi ro thực tế đối với con người/tài sản.",
      "en": "In safety-critical domains, the taxonomy must link defects to the potential hazard severity and to relevant safety requirements/standards, ensuring analysis and prioritization align with real risk to people/assets.",
      "ja": "セーフティクリティカルな領域では、分類体系は欠陥を潜在的なハザードの重大度や関連する安全要件・規格に結び付ける必要があり、これにより人や資産に対する実際のリスクに即した分析と優先順位付けが可能になる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi quan sát xu hướng dữ liệu lỗi cho thấy số lỗi liên quan đến 'thiếu sót trong đặc tả yêu cầu' tăng đều qua 3 release liên tiếp, hành động cải tiến quy trình phù hợp nhất là gì?",
      "en": "If defect trend data shows a steady increase in defects tied to 'requirements specification gaps' over three consecutive releases, what is the most appropriate process-improvement action?",
      "ja": "欠陥トレンドデータが、3回連続のリリースにわたって「要求仕様の不備」に起因する欠陥が着実に増加していることを示している場合、最も適切なプロセス改善アクションは何ですか。"
    },
    "options": [
      {
        "vi": "Xem xét cải tiến quy trình đặc tả và review yêu cầu (ví dụ áp dụng kỹ thuật review chính thức hơn, tiêu chí hoàn thành rõ ràng hơn cho đặc tả) vì gốc rễ nằm ở giai đoạn thượng nguồn",
        "en": "Review and improve the requirements specification and review process (e.g., more formal reviews, clearer definition-of-done for specs) since the root cause lies upstream",
        "ja": "根本原因は上流工程にあるため、要求仕様の作成・レビュープロセスの改善(より正式なレビュー手法の導入、仕様の完了基準の明確化など)を検討する"
      },
      {
        "vi": "Tăng số lượng tester thực thi test case mà không thay đổi gì ở giai đoạn phân tích yêu cầu",
        "en": "Increase the number of testers executing test cases without changing anything in requirements analysis",
        "ja": "要件分析フェーズを何も変えずに、テストケースを実行するテスターの人数を増やす"
      },
      {
        "vi": "Bỏ qua xu hướng này vì lỗi yêu cầu không thể phòng ngừa được",
        "en": "Ignore the trend, since requirements defects cannot be prevented",
        "ja": "要件に起因する欠陥は予防不可能なので、この傾向を無視する"
      },
      {
        "vi": "Chỉ cần viết thêm nhiều test case tự động hóa cho UI",
        "en": "Simply write more automated UI test cases",
        "ja": "UIの自動化テストケースを増やすだけでよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi phân tích lỗi cho thấy nguyên nhân gốc tập trung ở giai đoạn đặc tả/yêu cầu, cải tiến hiệu quả nhất là tác động vào chính giai đoạn đó (phòng ngừa) thay vì chỉ tăng cường phát hiện ở các giai đoạn sau.",
      "en": "When defect analysis shows the root cause concentrated in the specification/requirements phase, the most effective improvement targets that very phase (prevention) rather than merely strengthening detection downstream.",
      "ja": "欠陥分析によって根本原因が仕様・要件フェーズに集中していることが分かった場合、最も効果的な改善策は下流での検出強化ではなく、その工程自体(予防)に働きかけることである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Việc phân biệt nguyên nhân gốc rễ theo nhóm 'con người', 'quy trình', 'công cụ' và 'môi trường' khi phân tích lỗi mang lại lợi ích gì?",
      "en": "What benefit comes from categorizing root causes into 'people', 'process', 'tools', and 'environment' groups during defect analysis?",
      "ja": "欠陥分析において根本原因を「人」「プロセス」「ツール」「環境」というグループに分類することにはどのような利点がありますか。"
    },
    "options": [
      {
        "vi": "Giúp né tránh trách nhiệm cá nhân hoàn toàn",
        "en": "It helps completely avoid individual accountability",
        "ja": "個人の責任を完全に回避できる"
      },
      {
        "vi": "Giúp xác định hành động khắc phục phù hợp với từng nhóm nguyên nhân (ví dụ đào tạo cho nhóm con người, chuẩn hóa checklist cho nhóm quy trình, nâng cấp cho nhóm công cụ), tránh áp dụng giải pháp chung chung không đúng gốc rễ",
        "en": "It helps determine corrective actions appropriate to each cause category (e.g., training for people, standardized checklists for process, upgrades for tools), avoiding generic fixes that miss the real root cause",
        "ja": "各原因カテゴリに応じた適切な是正措置(人に対するトレーニング、プロセスに対するチェックリストの標準化、ツールに対するアップグレードなど)を決定するのに役立ち、真の根本原因を外した画一的な対策を避けられる"
      },
      {
        "vi": "Chỉ có giá trị thống kê, không ảnh hưởng đến hành động cải tiến",
        "en": "It only has statistical value and does not influence improvement actions",
        "ja": "統計的な価値しかなく、改善アクションには影響しない"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu ghi nhận severity của lỗi",
        "en": "It eliminates the need to record defect severity entirely",
        "ja": "欠陥の重大度を記録する必要性を完全になくす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Phân loại nguyên nhân theo các nhóm khác nhau giúp gắn đúng hành động cải tiến (đào tạo, chuẩn hóa quy trình, nâng cấp công cụ, cải thiện môi trường) với đúng loại nguyên nhân, tăng hiệu quả cải tiến bền vững.",
      "en": "Grouping causes into categories allows matching the right improvement action (training, process standardization, tool upgrades, environment fixes) to the right type of cause, increasing the effectiveness of sustainable improvement.",
      "ja": "原因をカテゴリ別に分類することで、原因の種類に応じた適切な改善アクション(トレーニング、プロセスの標準化、ツールのアップグレード、環境の改善)を対応付けることができ、持続的な改善の効果を高められる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Việc dùng defect taxonomy như một công cụ đào tạo cho tester mới mang lại lợi ích chính nào?",
      "en": "What is the main benefit of using a defect taxonomy as a training tool for new testers?",
      "ja": "新人テスターの育成ツールとして欠陥分類体系を活用することの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu viết test case chi tiết",
        "en": "It completely eliminates the need to write detailed test cases",
        "ja": "詳細なテストケースを書く必要性を完全になくす"
      },
      {
        "vi": "Đảm bảo tester mới không bao giờ cần review code",
        "en": "It ensures new testers never need to review code",
        "ja": "新人テスターがコードレビューを一切行う必要がなくなる"
      },
      {
        "vi": "Giúp tester mới rút ngắn thời gian tích lũy kinh nghiệm bằng cách học nhanh các dạng lỗi điển hình mà đồng nghiệp đi trước đã tổng kết, thay vì phải tự trải nghiệm từ đầu",
        "en": "It shortens the time needed for new testers to gain experience by quickly learning typical defect patterns that predecessors have already synthesized, rather than experiencing everything from scratch",
        "ja": "先輩たちがまとめた典型的な欠陥パターンを素早く学べるため、新人テスターがゼロから自ら経験を積む必要がなく、経験蓄積にかかる時間を短縮できる"
      },
      {
        "vi": "Thay thế hoàn toàn vai trò của mentor/tester kỳ cựu",
        "en": "It fully replaces the role of a mentor/senior tester",
        "ja": "メンターやベテランテスターの役割を完全に代替する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Taxonomy đóng gói kinh nghiệm tập thể thành tri thức có thể truyền đạt, giúp tester mới nhanh chóng nắm được các dạng lỗi thường gặp mà không cần mất nhiều năm tự trải nghiệm mới rút ra được.",
      "en": "A taxonomy packages collective experience into transferable knowledge, helping new testers quickly grasp common defect patterns without needing years of personal trial and error to discover them.",
      "ja": "分類体系は集団の経験を伝達可能な知識としてまとめたものであり、新人テスターが何年もの自己経験を経ずとも、よくある欠陥パターンを素早く把握できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi phân tích dữ liệu lỗi để cải tiến quy trình, các lỗi bị đóng với trạng thái 'not a bug' hoặc 'duplicate' nên được xử lý ra sao trong tập dữ liệu phân tích?",
      "en": "When analyzing defect data for process improvement, how should defects closed as 'not a bug' or 'duplicate' be handled in the analysis dataset?",
      "ja": "プロセス改善のために欠陥データを分析する際、「バグではない」や「重複」としてクローズされた欠陥は分析データセットにおいてどのように扱うべきですか。"
    },
    "options": [
      {
        "vi": "Giữ nguyên và tính như lỗi thật để tăng số liệu báo cáo",
        "en": "Keep them and count them as real defects to inflate reporting numbers",
        "ja": "報告数値を水増しするため、実際の欠陥としてそのままカウントする"
      },
      {
        "vi": "Xóa vĩnh viễn khỏi hệ thống theo dõi lỗi ngay lập tức",
        "en": "Immediately and permanently delete them from the defect tracking system",
        "ja": "ただちに欠陥追跡システムから完全に削除する"
      },
      {
        "vi": "Luôn quy trách nhiệm cho tester đã báo cáo lỗi sai",
        "en": "Always assign blame to the tester who reported the invalid defect",
        "ja": "誤った欠陥を報告したテスターに常に責任を負わせる"
      },
      {
        "vi": "Loại khỏi (hoặc tách riêng) tập số liệu phân tích nguyên nhân gốc/xu hướng lỗi thực, vì chúng không phản ánh lỗi sản phẩm thật, nhưng có thể phân tích riêng để cải tiến quy trình báo cáo/giao tiếp",
        "en": "Exclude (or segregate) them from root-cause/trend analysis of real defects, since they do not reflect actual product defects, though they can be analyzed separately to improve reporting/communication processes",
        "ja": "実際の製品欠陥を反映していないため、根本原因分析・欠陥トレンド分析の対象から除外(または別集計)するが、報告・コミュニケーションプロセス改善のために別途分析することは可能"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "'Not a bug' hay 'duplicate' không phản ánh lỗi thực của sản phẩm nên cần loại khỏi phân tích nguyên nhân/xu hướng lỗi sản phẩm để tránh sai lệch kết luận, dù có thể được phân tích riêng nếu tỷ lệ cao (ví dụ để cải thiện quy trình viết báo cáo lỗi).",
      "en": "'Not a bug' or 'duplicate' entries do not reflect real product defects, so they should be excluded from product defect root-cause/trend analysis to avoid skewed conclusions, though they can be analyzed separately if their rate is high (e.g., to improve defect-reporting practices).",
      "ja": "「バグではない」や「重複」は実際の製品欠陥を反映していないため、結論の歪みを避けるために製品欠陥の根本原因・トレンド分析からは除外すべきである。ただし、その割合が高い場合は(欠陥報告プロセスの改善などのために)別途分析する価値がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong buổi retrospective cuối release, nhóm dự án kết hợp defect taxonomy với dữ liệu lỗi thực tế để làm gì hiệu quả nhất?",
      "en": "In an end-of-release retrospective, what is the most effective use of combining a defect taxonomy with actual defect data?",
      "ja": "リリース終了時のレトロスペクティブにおいて、欠陥分類体系と実際の欠陥データを組み合わせる最も効果的な使い方は何ですか。"
    },
    "options": [
      {
        "vi": "Xác định các nhóm lỗi phổ biến nhất trong release, đối chiếu với chiến lược kiểm thử hiện tại để cập nhật test strategy/charter cho các release sau, nhắm đúng vào những điểm yếu đã bộc lộ",
        "en": "Identify the most common defect categories in the release, compare them against the current test strategy, and update the test strategy/charters for future releases to target the weaknesses that were exposed",
        "ja": "リリース中に最も多かった欠陥カテゴリを特定し、現行のテスト戦略と照らし合わせて、明らかになった弱点を的確に狙えるよう次回以降のテスト戦略・チャーターを更新する"
      },
      {
        "vi": "Chỉ để trang trí báo cáo cho đẹp mắt",
        "en": "Only to make the report look visually appealing",
        "ja": "報告書を見栄えよくするためだけに使う"
      },
      {
        "vi": "Xóa toàn bộ lịch sử lỗi để bắt đầu lại từ đầu mỗi release",
        "en": "Erase the entire defect history to start fresh each release",
        "ja": "リリースごとに欠陥履歴をすべて消去してゼロから始める"
      },
      {
        "vi": "Chỉ dùng để xếp hạng thi đua giữa các tester",
        "en": "Only to rank testers competitively against each other",
        "ja": "テスター同士の競争ランキング付けにのみ使う"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kết hợp taxonomy với dữ liệu lỗi thực trong retrospective giúp nhóm nhận diện điểm yếu có tính hệ thống trong chiến lược kiểm thử hiện tại, từ đó điều chỉnh test strategy và charter cho các chu kỳ tiếp theo một cách có căn cứ.",
      "en": "Combining a taxonomy with real defect data in a retrospective helps the team identify systemic weaknesses in the current test strategy, enabling evidence-based adjustments to the test strategy and charters for upcoming cycles.",
      "ja": "レトロスペクティブにおいて分類体系と実際の欠陥データを組み合わせることで、チームは現行のテスト戦略における体系的な弱点を特定でき、それに基づいて次のサイクルのテスト戦略・チャーターを根拠あるかたちで調整できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mục tiêu chính của load testing là gì?",
      "en": "What is the primary goal of load testing?",
      "ja": "ロードテスト（負荷テスト）の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Xác định điểm hệ thống bắt đầu sụp đổ hoàn toàn",
        "en": "Determine the point at which the system completely collapses",
        "ja": "システムが完全に崩壊する限界点を特定すること"
      },
      {
        "vi": "Đánh giá hành vi và hiệu năng hệ thống dưới mức tải kỳ vọng (bình thường và cao điểm) trong thực tế",
        "en": "Evaluate system behavior and performance under expected (normal and peak) real-world load levels",
        "ja": "実際に想定される（通常時およびピーク時の）負荷レベルにおけるシステムの挙動と性能を評価すること"
      },
      {
        "vi": "Kiểm tra khả năng phục hồi sau khi bị tấn công từ chối dịch vụ",
        "en": "Verify recovery ability after a denial-of-service attack",
        "ja": "サービス拒否攻撃を受けた後の回復能力を検証すること"
      },
      {
        "vi": "Phát hiện rò rỉ bộ nhớ khi hệ thống chạy liên tục trong nhiều ngày",
        "en": "Detect memory leaks when the system runs continuously for several days",
        "ja": "システムを数日間連続稼働させてメモリリークを検出すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Load testing mô phỏng mức tải thực tế (bình thường và cao điểm) mà hệ thống dự kiến phải chịu trong vận hành, nhằm đo thời gian đáp ứng, thông lượng và mức sử dụng tài nguyên ở các mức tải đó.",
      "en": "Load testing simulates realistic load levels (normal and peak) the system is expected to handle in production, measuring response time, throughput, and resource usage at those levels.",
      "ja": "ロードテストは、本番運用で想定される実際の負荷レベル（通常時・ピーク時）をシミュレートし、その負荷下での応答時間、スループット、リソース使用率を測定する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một chiến dịch stress testing, kỹ sư kiểm thử tăng dần số lượng người dùng ảo cho đến khi hệ thống bắt đầu trả lỗi hoặc treo. Mục đích chính của kỹ thuật này là gì?",
      "en": "During a stress testing campaign, the tester gradually increases the number of virtual users until the system starts returning errors or hanging. What is the main purpose of this technique?",
      "ja": "ストレステストのキャンペーンで、テスト担当者は仮想ユーザー数を徐々に増やし、システムがエラーを返すかフリーズするまで負荷をかけた。この手法の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Đo thời gian phản hồi trung bình dưới tải sản xuất thông thường",
        "en": "Measure average response time under typical production load",
        "ja": "通常の本番負荷下での平均応答時間を測定すること"
      },
      {
        "vi": "Xác nhận hệ thống đáp ứng SLA đã cam kết với khách hàng",
        "en": "Confirm the system meets the SLA committed to customers",
        "ja": "顧客と合意したSLAをシステムが満たしているか確認すること"
      },
      {
        "vi": "Xác định điểm giới hạn (breaking point) và cách hệ thống suy thoái/thất bại khi vượt quá năng lực xử lý",
        "en": "Determine the breaking point and how the system degrades or fails when capacity is exceeded",
        "ja": "処理能力を超えたときにシステムがどのように劣化・破綻するか、限界点（ブレークポイント）を特定すること"
      },
      {
        "vi": "Kiểm tra khả năng mở rộng theo chiều ngang khi thêm máy chủ mới",
        "en": "Test horizontal scalability when adding new servers",
        "ja": "新しいサーバーを追加した際の水平スケーラビリティをテストすること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Stress testing đẩy hệ thống vượt quá năng lực thiết kế để tìm điểm giới hạn và quan sát cách hệ thống suy thoái (graceful degradation) hay sụp đổ hoàn toàn, cung cấp thông tin cho kế hoạch dự phòng.",
      "en": "Stress testing pushes the system beyond its designed capacity to find the breaking point and observe whether it degrades gracefully or fails catastrophically, informing contingency planning.",
      "ja": "ストレステストはシステムを設計上の許容量を超える負荷にさらし、限界点を見つけるとともに、緩やかに劣化するか完全に破綻するかを観察し、対応計画に役立てる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Soak testing (endurance testing) đặc biệt hữu ích để phát hiện loại lỗi nào sau đây?",
      "en": "Soak testing (endurance testing) is particularly useful for detecting which type of defect?",
      "ja": "ソークテスト（エンデュランステスト）は特にどの種類の欠陥の検出に有効か。"
    },
    "options": [
      {
        "vi": "Lỗi tràn bộ đệm xảy ra ngay lập tức khi nhận dữ liệu quá lớn",
        "en": "Buffer overflow errors that occur immediately upon receiving oversized data",
        "ja": "過大なデータを受信した瞬間に発生するバッファオーバーフローエラー"
      },
      {
        "vi": "Lỗi cú pháp trong mã nguồn chưa được biên dịch",
        "en": "Syntax errors in uncompiled source code",
        "ja": "コンパイルされていないソースコードの構文エラー"
      },
      {
        "vi": "Lỗi giao diện người dùng khi thay đổi độ phân giải màn hình",
        "en": "UI errors when changing screen resolution",
        "ja": "画面解像度を変更した際のUIエラー"
      },
      {
        "vi": "Rò rỉ bộ nhớ, cạn kết nối cơ sở dữ liệu và suy thoái hiệu năng tích lũy theo thời gian dài",
        "en": "Memory leaks, database connection exhaustion, and cumulative performance degradation over an extended period",
        "ja": "メモリリーク、データベース接続の枯渇、長期間にわたる累積的な性能劣化"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Soak testing chạy hệ thống ở mức tải bình thường trong thời gian dài (nhiều giờ đến nhiều ngày) để phát hiện các vấn đề tích lũy dần như rò rỉ bộ nhớ, cạn tài nguyên và suy giảm hiệu năng theo thời gian mà kiểm thử ngắn hạn không phát hiện được.",
      "en": "Soak testing runs the system at sustained normal load over a long duration (hours to days) to reveal gradually accumulating issues such as memory leaks, resource exhaustion, and performance degradation that short-duration tests cannot expose.",
      "ja": "ソークテストは通常負荷でシステムを長時間（数時間〜数日）稼働させ、短時間のテストでは発見できないメモリリークやリソース枯渇、時間経過による性能劣化といった累積的な問題を検出する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Đâu là đặc điểm phân biệt spike testing với các loại kiểm thử hiệu năng khác?",
      "en": "What distinguishes spike testing from other performance testing types?",
      "ja": "スパイクテストが他の性能テストの種類と区別される特徴は何か。"
    },
    "options": [
      {
        "vi": "Tăng đột ngột số lượng người dùng/giao dịch trong thời gian rất ngắn rồi có thể giảm xuống, kiểm tra khả năng phục hồi",
        "en": "Suddenly increases users/transactions in a very short time and may drop back down, testing recovery ability",
        "ja": "非常に短時間でユーザー数・トランザクション数を急激に増加させ、その後急減させることもあり、回復能力を検証する"
      },
      {
        "vi": "Tăng tải từ từ và duy trì ổn định trong nhiều ngày",
        "en": "Gradually increases load and sustains it stably for several days",
        "ja": "負荷を徐々に増加させ、数日間安定して維持する"
      },
      {
        "vi": "Chỉ tập trung vào dung lượng dữ liệu lưu trữ tối đa",
        "en": "Focuses solely on the maximum storage data volume",
        "ja": "最大データ保存容量にのみ焦点を当てる"
      },
      {
        "vi": "Chạy với một người dùng duy nhất để đo thời gian phản hồi cơ bản",
        "en": "Runs with a single user to measure baseline response time",
        "ja": "単一ユーザーでベースライン応答時間を測定する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Spike testing mô phỏng sự tăng vọt tải đột ngột (ví dụ flash sale, sự kiện viral) trong thời gian ngắn để kiểm tra khả năng xử lý và phục hồi của hệ thống sau khi tải giảm trở lại bình thường.",
      "en": "Spike testing simulates a sudden, sharp increase in load (e.g., flash sale, viral event) over a short period to verify the system's ability to handle it and recover once load returns to normal.",
      "ja": "スパイクテストは、短時間での急激な負荷の増加（例：フラッシュセール、バイラルイベント）をシミュレートし、システムの処理能力と負荷が通常に戻った後の回復能力を検証する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong scalability testing, sự khác biệt giữa mở rộng theo chiều dọc (vertical scaling) và chiều ngang (horizontal scaling) là gì?",
      "en": "In scalability testing, what is the difference between vertical scaling and horizontal scaling?",
      "ja": "スケーラビリティテストにおいて、垂直スケーリングと水平スケーリングの違いは何か。"
    },
    "options": [
      {
        "vi": "Vertical scaling chỉ áp dụng cho cơ sở dữ liệu, horizontal scaling chỉ áp dụng cho giao diện người dùng",
        "en": "Vertical scaling only applies to databases; horizontal scaling only applies to user interfaces",
        "ja": "垂直スケーリングはデータベースにのみ適用され、水平スケーリングはユーザーインターフェースにのみ適用される"
      },
      {
        "vi": "Vertical scaling tăng tài nguyên (CPU, RAM) của một máy chủ hiện có; horizontal scaling thêm nhiều máy chủ/instance song song",
        "en": "Vertical scaling increases resources (CPU, RAM) of an existing server; horizontal scaling adds more servers/instances running in parallel",
        "ja": "垂直スケーリングは既存サーバーのリソース（CPU、RAM）を増強すること、水平スケーリングは並列に動作するサーバー・インスタンスを追加することである"
      },
      {
        "vi": "Cả hai đều đề cập đến việc tăng số lượng người dùng ảo trong kịch bản kiểm thử",
        "en": "Both refer to increasing the number of virtual users in a test scenario",
        "ja": "両方ともテストシナリオにおける仮想ユーザー数の増加を指す"
      },
      {
        "vi": "Vertical scaling là giảm tải, horizontal scaling là tăng tải",
        "en": "Vertical scaling means reducing load; horizontal scaling means increasing load",
        "ja": "垂直スケーリングは負荷を減らすこと、水平スケーリングは負荷を増やすことである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scalability testing đánh giá khả năng hệ thống mở rộng hiệu quả: vertical scaling nâng cấp năng lực phần cứng của một node, còn horizontal scaling bổ sung thêm node để chia sẻ tải, mỗi cách có đặc điểm và giới hạn riêng cần kiểm thử.",
      "en": "Scalability testing evaluates how effectively a system scales: vertical scaling upgrades a single node's hardware capacity, while horizontal scaling adds nodes to distribute load, each with its own characteristics and limits to be tested.",
      "ja": "スケーラビリティテストはシステムが効果的に拡張できるかを評価する。垂直スケーリングは単一ノードのハードウェア能力を強化し、水平スケーリングは負荷を分散するためにノードを追加する。それぞれ検証すべき特性と限界が異なる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thiết kế kịch bản tải (workload model) cho performance testing, nguồn dữ liệu đáng tin cậy nhất để xác định tỉ lệ giao dịch và hành vi người dùng là gì?",
      "en": "When designing a workload model for performance testing, what is the most reliable data source for determining transaction mix and user behavior?",
      "ja": "性能テストのワークロードモデルを設計する際、トランザクション比率とユーザー行動を決定するために最も信頼できるデータソースは何か。"
    },
    "options": [
      {
        "vi": "Ước lượng chủ quan của kỹ sư kiểm thử dựa trên kinh nghiệm cá nhân",
        "en": "The tester's subjective estimate based on personal experience",
        "ja": "テスト担当者の個人的な経験に基づく主観的な見積もり"
      },
      {
        "vi": "Sao chép nguyên bản kịch bản tải từ dự án khác không liên quan",
        "en": "Copying the workload model verbatim from an unrelated project",
        "ja": "無関係な別プロジェクトのワークロードモデルをそのまま流用する"
      },
      {
        "vi": "Phân tích log truy cập và số liệu sử dụng thực tế trong sản xuất (production analytics)",
        "en": "Analysis of production access logs and real usage analytics",
        "ja": "実際の本番アクセスログおよび利用状況の分析（プロダクションアナリティクス）"
      },
      {
        "vi": "Chạy thử một người dùng duy nhất và nhân số liệu lên theo cấp số nhân bất kỳ",
        "en": "Running a single user and arbitrarily multiplying the numbers",
        "ja": "単一ユーザーでテストを実行し、任意の倍率で数値を掛け合わせる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kịch bản tải chính xác nhất được xây dựng từ dữ liệu thực (log server, công cụ phân tích, số liệu kinh doanh) phản ánh đúng tỉ lệ các loại giao dịch, thời điểm cao điểm và hành vi người dùng thực tế, thay vì phỏng đoán chủ quan.",
      "en": "The most accurate workload model is built from real data (server logs, analytics tools, business metrics) that reflects the actual mix of transaction types, peak times, and genuine user behavior, rather than subjective guesses.",
      "ja": "最も正確なワークロードモデルは、実際のトランザクション種別の比率、ピーク時間帯、実際のユーザー行動を反映する実データ（サーバーログ、分析ツール、ビジネス指標）から構築されるべきであり、主観的な推測に頼るべきではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "\"Think time\" trong kịch bản tải có ý nghĩa gì và tại sao bỏ qua nó có thể làm sai lệch kết quả kiểm thử?",
      "en": "What is \"think time\" in a workload script, and why can omitting it distort test results?",
      "ja": "ワークロードスクリプトにおける「シンクタイム（考慮時間）」とは何か、それを省略するとテスト結果がなぜ歪む可能性があるのか。"
    },
    "options": [
      {
        "vi": "Là thời gian máy chủ xử lý truy vấn cơ sở dữ liệu; bỏ qua sẽ làm giảm độ chính xác của log lỗi",
        "en": "It is the time the server spends processing database queries; omitting it reduces error-log accuracy",
        "ja": "サーバーがデータベースクエリを処理する時間であり、省略するとエラーログの精度が下がる"
      },
      {
        "vi": "Là thời gian mạng truyền dữ liệu vật lý, luôn cố định và không cần cấu hình",
        "en": "It is the physical network transmission time, always fixed and not configurable",
        "ja": "物理的なネットワーク伝送時間であり、常に固定で設定不要である"
      },
      {
        "vi": "Là thời gian chờ để công cụ kiểm thử khởi động, không ảnh hưởng đến tải thực tế",
        "en": "It is the startup time of the testing tool and has no effect on actual load",
        "ja": "テストツールの起動時間であり、実際の負荷には影響しない"
      },
      {
        "vi": "Là khoảng thời gian người dùng thực dừng lại để đọc/nhập liệu giữa các thao tác; bỏ qua khiến hệ thống bị dội tải không thực tế, cao hơn nhiều so với hành vi thực tế",
        "en": "It is the pause real users take to read or enter data between actions; omitting it causes an unrealistically aggressive load, far higher than actual user behavior",
        "ja": "実際のユーザーが操作の合間にデータを読んだり入力したりするために取る一時停止時間であり、これを省略すると実際のユーザー行動よりもはるかに高い、非現実的な負荷がかかる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Think time mô phỏng khoảng dừng tự nhiên của người dùng thật giữa các hành động (đọc màn hình, nhập liệu). Nếu bỏ qua, kịch bản sẽ gửi yêu cầu liên tục không nghỉ, tạo ra mức tải cao giả tạo, dẫn đến kết luận sai về khả năng chịu tải thực sự.",
      "en": "Think time simulates the natural pauses real users take between actions (reading a screen, entering data). Omitting it causes the script to fire requests back-to-back without breaks, generating an artificially high load and leading to incorrect conclusions about real capacity.",
      "ja": "シンクタイムは、実際のユーザーが操作間に取る自然な一時停止（画面を読む、データを入力する）をシミュレートする。これを省略するとスクリプトが休みなく連続してリクエストを送信し、人為的に高い負荷が発生し、実際のキャパシティに関する誤った結論につながる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ramp-up period trong một kịch bản load testing được thiết kế để làm gì?",
      "en": "What is the purpose of the ramp-up period in a load testing script?",
      "ja": "ロードテストスクリプトにおける「ランプアップ期間」の目的は何か。"
    },
    "options": [
      {
        "vi": "Tăng dần số lượng người dùng ảo theo thời gian để tránh khởi động đồng loạt gây sai lệch, đồng thời mô phỏng thực tế người dùng truy cập rải rác",
        "en": "Gradually increases the number of virtual users over time to avoid a distorting simultaneous startup surge, while simulating real users arriving at different times",
        "ja": "仮想ユーザー数を時間をかけて徐々に増やすことで、一斉起動による歪みを避けつつ、実際のユーザーが時間差でアクセスする状況を模倣する"
      },
      {
        "vi": "Giảm số lượng người dùng ảo xuống 0 để kết thúc bài kiểm thử an toàn",
        "en": "Reduces the number of virtual users to zero to safely end the test",
        "ja": "仮想ユーザー数をゼロまで減らし、テストを安全に終了させる"
      },
      {
        "vi": "Xóa toàn bộ dữ liệu kiểm thử trước khi bắt đầu chạy",
        "en": "Deletes all test data before the run begins",
        "ja": "実行開始前にすべてのテストデータを削除する"
      },
      {
        "vi": "Ghi lại kịch bản kiểm thử từ hành động thao tác thủ công trên trình duyệt",
        "en": "Records the test script from manual browser actions",
        "ja": "ブラウザ上の手動操作からテストスクリプトを記録する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ramp-up giúp tăng người dùng ảo theo từng bước/độ dốc thay vì khởi động cùng lúc, tránh gây ra một cú sốc tải nhân tạo không phản ánh đúng cách người dùng thực sự truy cập hệ thống theo thời gian.",
      "en": "Ramp-up increases virtual users incrementally rather than all at once, avoiding an artificial load shock and better reflecting how real users arrive over time.",
      "ja": "ランプアップは仮想ユーザーを一度に起動するのではなく段階的に増加させることで、人為的な負荷ショックを避け、実際のユーザーが時間の経過とともにアクセスする様子をより正確に反映する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Vì sao chỉ báo cáo thời gian phản hồi trung bình (average) có thể gây hiểu lầm khi phân tích kết quả performance testing?",
      "en": "Why can reporting only the average response time be misleading when analyzing performance testing results?",
      "ja": "性能テストの結果を分析する際、平均応答時間のみを報告することがなぜ誤解を招く可能性があるのか。"
    },
    "options": [
      {
        "vi": "Trung bình luôn thấp hơn giá trị thực tế do lỗi làm tròn số học",
        "en": "The average is always lower than the actual value due to arithmetic rounding errors",
        "ja": "平均値は算術上の丸め誤差により常に実際の値より低くなるから"
      },
      {
        "vi": "Trung bình có thể bị che khuất bởi các giá trị ngoại lai (outlier), không phản ánh trải nghiệm của phần lớn người dùng bằng các chỉ số phân vị như 90th/95th percentile",
        "en": "The average can be skewed by outliers and fails to reflect the experience of the majority of users as well as percentile metrics such as the 90th/95th percentile do",
        "ja": "平均値は外れ値の影響を受けやすく、90パーセンタイルや95パーセンタイルといった指標ほど大多数のユーザーの実際の体験を反映しない"
      },
      {
        "vi": "Trung bình chỉ áp dụng cho kiểm thử chức năng, không dùng cho kiểm thử hiệu năng",
        "en": "The average only applies to functional testing, not performance testing",
        "ja": "平均値は機能テストにのみ適用され、性能テストには使用できないから"
      },
      {
        "vi": "Trung bình không thể tính toán được khi có nhiều hơn 100 người dùng ảo",
        "en": "The average cannot be calculated when there are more than 100 virtual users",
        "ja": "仮想ユーザーが100人を超えると平均値は計算不可能になるから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Giá trị trung bình dễ bị kéo lệch bởi một số ít giao dịch phản hồi rất chậm hoặc rất nhanh, che giấu thực tế trải nghiệm của đa số người dùng. Percentile (ví dụ 95th) cho biết ngưỡng mà phần lớn yêu cầu đạt được, hữu ích hơn để đánh giá SLA.",
      "en": "Averages are easily distorted by a small number of very slow or very fast transactions, masking the actual experience of the majority of users. Percentiles (e.g., the 95th) show the threshold most requests meet, which is more useful for SLA evaluation.",
      "ja": "平均値は少数の非常に遅い、または非常に速いトランザクションによって歪められやすく、大多数のユーザーの実際の体験を隠してしまう。パーセンタイル（例：95パーセンタイル）はほとんどのリクエストが達成する基準を示し、SLA評価においてより有用である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mối quan hệ giữa throughput và response time thường thể hiện như thế nào khi tải hệ thống tiến gần đến giới hạn năng lực?",
      "en": "How does the relationship between throughput and response time typically behave as system load approaches its capacity limit?",
      "ja": "システム負荷が処理能力の限界に近づくにつれ、スループットと応答時間の関係は一般的にどのように変化するか。"
    },
    "options": [
      {
        "vi": "Cả hai luôn tăng tuyến tính và tỉ lệ thuận với nhau mãi mãi",
        "en": "Both always increase linearly and proportionally forever",
        "ja": "両方とも常に直線的に比例して永久に増加する"
      },
      {
        "vi": "Response time luôn không đổi bất kể mức tải vì hệ thống có bộ nhớ đệm vô hạn",
        "en": "Response time always remains constant regardless of load because the system has infinite caching",
        "ja": "システムは無限のキャッシュを持つため、負荷に関係なく応答時間は常に一定である"
      },
      {
        "vi": "Throughput tăng dần rồi đạt đỉnh (hoặc giảm), trong khi response time tăng nhanh (thường theo hàm mũ) khi tài nguyên trở nên bão hòa",
        "en": "Throughput rises then plateaus or drops, while response time rises sharply (often exponentially) as resources become saturated",
        "ja": "スループットは上昇した後、頭打ちになるか低下するが、リソースが飽和するにつれて応答時間は急激に（多くの場合指数関数的に）上昇する"
      },
      {
        "vi": "Throughput giảm tuyến tính ngay từ mức tải thấp nhất",
        "en": "Throughput decreases linearly starting from the lowest load level",
        "ja": "スループットは最も低い負荷レベルから直線的に低下する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi tải tăng, throughput tăng đến một điểm bão hòa tài nguyên rồi chững lại hoặc giảm, trong khi response time bắt đầu tăng nhanh (curve dạng hàm mũ) do hàng đợi và tranh chấp tài nguyên — đây là dấu hiệu điển hình của điểm nghẽn hiệu năng.",
      "en": "As load increases, throughput rises until resources saturate, then plateaus or declines, while response time begins climbing sharply (an exponential-like curve) due to queuing and resource contention — a classic sign of a performance bottleneck.",
      "ja": "負荷が増加すると、スループットはリソースが飽和する点まで上昇した後、頭打ちになるか低下する。一方、応答時間はキューイングとリソース競合により急激に（指数関数的に）上昇し始める。これは性能ボトルネックの典型的な兆候である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi phân tích nghẽn cổ chai (bottleneck) trong performance testing, Technical Test Analyst nên ưu tiên thu thập loại dữ liệu nào?",
      "en": "When analyzing a bottleneck in performance testing, what type of data should a Technical Test Analyst prioritize collecting?",
      "ja": "性能テストにおけるボトルネック分析において、テクニカルテストアナリストが優先して収集すべきデータの種類は何か。"
    },
    "options": [
      {
        "vi": "Ý kiến chủ quan của khách hàng về giao diện",
        "en": "Customers' subjective opinions about the interface",
        "ja": "インターフェースに対する顧客の主観的な意見"
      },
      {
        "vi": "Màu sắc và bố cục của giao diện người dùng",
        "en": "The color scheme and layout of the user interface",
        "ja": "ユーザーインターフェースの配色とレイアウト"
      },
      {
        "vi": "Số lượng dòng mã nguồn của ứng dụng",
        "en": "The number of lines of source code in the application",
        "ja": "アプリケーションのソースコードの行数"
      },
      {
        "vi": "Chỉ số sử dụng tài nguyên hệ thống (CPU, bộ nhớ, I/O đĩa, băng thông mạng, số kết nối cơ sở dữ liệu) theo thời gian thực trong lúc kiểm thử",
        "en": "Real-time system resource utilization metrics (CPU, memory, disk I/O, network bandwidth, database connections) during the test",
        "ja": "テスト実行中のリアルタイムのシステムリソース使用率（CPU、メモリ、ディスクI/O、ネットワーク帯域幅、データベース接続数）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Việc kết hợp số liệu hiệu năng ứng dụng (response time, throughput) với chỉ số hạ tầng (CPU, RAM, I/O, network, connection pool) theo thời gian thực giúp xác định chính xác tài nguyên nào bị bão hòa và gây nghẽn.",
      "en": "Correlating application performance metrics (response time, throughput) with real-time infrastructure metrics (CPU, RAM, I/O, network, connection pool) helps pinpoint exactly which resource is saturated and causing the bottleneck.",
      "ja": "アプリケーションの性能指標（応答時間、スループット）とリアルタイムのインフラ指標（CPU、RAM、I/O、ネットワーク、コネクションプール）を相関させることで、どのリソースが飽和しボトルネックを引き起こしているかを正確に特定できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Little's Law (L = λW) được áp dụng như thế nào trong thiết kế và phân tích kịch bản tải?",
      "en": "How is Little's Law (L = λW) applied in designing and analyzing load testing scenarios?",
      "ja": "リトルの法則（L = λW）は負荷テストシナリオの設計・分析においてどのように適用されるか。"
    },
    "options": [
      {
        "vi": "Liên hệ số lượng người dùng đồng thời (L) với tốc độ đến của giao dịch (λ) và thời gian trung bình một giao dịch tồn tại trong hệ thống (W), giúp tính toán số người dùng ảo cần thiết để đạt throughput mục tiêu",
        "en": "Relates the number of concurrent users (L) to transaction arrival rate (λ) and average time a transaction spends in the system (W), helping calculate the virtual users needed to achieve a target throughput",
        "ja": "同時ユーザー数（L）とトランザクション到着率（λ）、トランザクションがシステム内に滞在する平均時間（W）を関連付け、目標スループットを達成するために必要な仮想ユーザー数の算出に役立てる"
      },
      {
        "vi": "Dùng để mã hóa dữ liệu nhạy cảm trong kịch bản kiểm thử",
        "en": "Used to encrypt sensitive data in the test script",
        "ja": "テストスクリプト内の機密データを暗号化するために使用される"
      },
      {
        "vi": "Xác định số lượng test case tự luận cần thiết cho một chức năng",
        "en": "Determines the number of essay-type test cases needed for a feature",
        "ja": "ある機能に必要な記述式テストケースの数を決定する"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử bảo mật, không liên quan đến hiệu năng",
        "en": "Only applies to security testing and is unrelated to performance",
        "ja": "セキュリティテストにのみ適用され、性能とは無関係である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Little's Law là công thức hàng đợi cơ bản dùng để ước tính mối quan hệ giữa số người dùng đồng thời, tốc độ giao dịch và thời gian phản hồi, hỗ trợ thiết kế kịch bản tải hợp lý và diễn giải kết quả đo được.",
      "en": "Little's Law is a fundamental queuing formula used to estimate the relationship between concurrent users, transaction rate, and response time, supporting sound workload design and interpretation of measured results.",
      "ja": "リトルの法則は同時ユーザー数、トランザクション率、応答時間の関係を推定するための基本的な待ち行列理論の公式であり、妥当なワークロード設計と測定結果の解釈を支援する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Vì sao môi trường kiểm thử hiệu năng cần càng giống môi trường sản xuất (production-like) càng tốt?",
      "en": "Why should the performance test environment be as production-like as possible?",
      "ja": "性能テスト環境はなぜできるだけ本番環境に近い（production-like）ことが望ましいのか。"
    },
    "options": [
      {
        "vi": "Vì quy định pháp lý bắt buộc mọi môi trường kiểm thử phải giống hệt sản xuất",
        "en": "Because regulations legally require every test environment to be identical to production",
        "ja": "すべてのテスト環境が本番環境と完全に同一であることが法律で義務付けられているから"
      },
      {
        "vi": "Vì kết quả đo (response time, throughput, khả năng chịu tải) chỉ có giá trị dự đoán đáng tin cậy khi cấu hình phần cứng, mạng và dữ liệu tương đồng với thực tế vận hành",
        "en": "Because measured results (response time, throughput, capacity) are only reliably predictive when hardware, network, and data configurations resemble actual production operation",
        "ja": "測定結果（応答時間、スループット、キャパシティ）は、ハードウェア、ネットワーク、データの構成が実際の本番運用に近い場合にのみ信頼できる予測価値を持つから"
      },
      {
        "vi": "Vì môi trường kiểm thử luôn phải đắt hơn môi trường sản xuất",
        "en": "Because the test environment must always cost more than production",
        "ja": "テスト環境は常に本番環境よりコストが高くなければならないから"
      },
      {
        "vi": "Vì công cụ kiểm thử tự động chỉ hoạt động trên môi trường giống sản xuất",
        "en": "Because automated testing tools only function on production-identical environments",
        "ja": "自動テストツールは本番環境と同一の環境でしか動作しないから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Sự khác biệt về cấu hình phần cứng, cấu hình mạng, dung lượng dữ liệu giữa môi trường kiểm thử và sản xuất làm sai lệch kết quả đo, dẫn đến dự đoán sai về khả năng chịu tải thực tế khi triển khai.",
      "en": "Differences in hardware configuration, network setup, or data volume between the test and production environments distort measured results, leading to inaccurate predictions of real-world capacity once deployed.",
      "ja": "テスト環境と本番環境の間でハードウェア構成、ネットワーク設定、データ量が異なると測定結果が歪み、実際に展開した際のキャパシティに関する予測が不正確になる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong công cụ kiểm thử hiệu năng dùng cơ chế record & replay, \"correlation\" (tương quan hóa) được thực hiện để giải quyết vấn đề gì?",
      "en": "In performance testing tools using record & replay, what problem does \"correlation\" address?",
      "ja": "記録・再生（レコード＆リプレイ）方式を用いる性能テストツールにおいて、「コリレーション（相関付け）」はどのような問題を解決するために行われるか。"
    },
    "options": [
      {
        "vi": "Chuyển đổi ngôn ngữ giao diện của kịch bản kiểm thử sang tiếng Anh",
        "en": "Converts the test script's UI language to English",
        "ja": "テストスクリプトのUI言語を英語に変換する"
      },
      {
        "vi": "Tính toán chi phí phần cứng cần thiết để chạy công cụ kiểm thử",
        "en": "Calculates the hardware cost required to run the testing tool",
        "ja": "テストツールの実行に必要なハードウェアコストを計算する"
      },
      {
        "vi": "Xử lý các giá trị động (session ID, token, viewstate) do máy chủ sinh ra khác nhau mỗi lần thực thi, cần được trích xuất và thay thế động khi phát lại",
        "en": "Handles dynamic values (session IDs, tokens, viewstate) generated differently by the server each run, which must be dynamically extracted and substituted during replay",
        "ja": "サーバーが実行のたびに異なる方法で生成する動的な値（セッションID、トークン、ビューステートなど）を扱うもので、再生時に動的に抽出し置き換える必要がある"
      },
      {
        "vi": "So sánh màu sắc pixel giữa hai lần chụp màn hình",
        "en": "Compares pixel colors between two screenshots",
        "ja": "2つのスクリーンショット間のピクセルの色を比較する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi ghi kịch bản, các giá trị động sinh ra bởi máy chủ (session, token bảo mật, ID giao dịch...) khác nhau mỗi lần chạy. Nếu không tương quan hóa, kịch bản phát lại sẽ dùng giá trị cũ đã hết hạn/không hợp lệ, gây lỗi giả (false failure).",
      "en": "During recording, server-generated dynamic values (sessions, security tokens, transaction IDs) differ on every run. Without correlation, the replayed script would reuse stale/invalid values, causing false failures.",
      "ja": "記録時に、サーバーが生成する動的な値（セッション、セキュリティトークン、トランザクションIDなど）は実行ごとに異なる。相関付けを行わないと、再生スクリプトは古い、または無効な値を使い続け、誤った失敗（フォールスフェイラー）を引き起こす。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Tại sao cần tham số hóa (parameterization) dữ liệu đầu vào trong kịch bản load testing thay vì dùng một bộ dữ liệu cố định cho tất cả người dùng ảo?",
      "en": "Why should input data in a load testing script be parameterized rather than using one fixed data set for all virtual users?",
      "ja": "なぜロードテストスクリプトの入力データは、すべての仮想ユーザーに固定のデータセットを使うのではなく、パラメータ化する必要があるのか。"
    },
    "options": [
      {
        "vi": "Để giảm dung lượng lưu trữ của kịch bản kiểm thử xuống mức tối thiểu",
        "en": "To minimize the storage size of the test script",
        "ja": "テストスクリプトの保存容量を最小限に抑えるため"
      },
      {
        "vi": "Để mã hóa toàn bộ kịch bản kiểm thử theo chuẩn bảo mật quốc tế",
        "en": "To encrypt the entire test script according to an international security standard",
        "ja": "国際的なセキュリティ標準に従ってテストスクリプト全体を暗号化するため"
      },
      {
        "vi": "Vì công cụ kiểm thử yêu cầu bắt buộc mỗi kịch bản phải có ít nhất 100 biến",
        "en": "Because the testing tool mandates that every script must contain at least 100 variables",
        "ja": "テストツールがすべてのスクリプトに最低100個の変数を含むことを義務付けているため"
      },
      {
        "vi": "Để tránh hiện tượng cache phía server/DB làm sai lệch kết quả và tránh xung đột khóa/khóa duy nhất khi nhiều người dùng ảo gửi cùng một dữ liệu đồng thời",
        "en": "To avoid server/DB-side caching that skews results, and to avoid lock/unique-key conflicts when many virtual users submit identical data concurrently",
        "ja": "サーバー・DB側のキャッシュにより結果が歪められることを避け、多数の仮想ユーザーが同一データを同時に送信することによるロック・一意キーの競合を避けるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dùng cùng một dữ liệu cho mọi người dùng ảo có thể khiến kết quả bị cache (không phản ánh tải thực đến cơ sở dữ liệu) và gây lỗi do vi phạm ràng buộc duy nhất/khóa khi nhiều giao dịch cùng thao tác trên một bản ghi, làm sai lệch nghiêm trọng kết quả kiểm thử.",
      "en": "Using identical data for all virtual users can trigger caching (masking real database load) and cause errors from unique-constraint/lock violations when many transactions act on the same record, severely distorting test results.",
      "ja": "すべての仮想ユーザーに同一のデータを使用すると、キャッシュが働いて実際のデータベース負荷が隠される可能性があるほか、多数のトランザクションが同一レコードを操作することで一意制約違反やロック競合によるエラーが発生し、テスト結果が大きく歪められる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Đội kiểm thử phát hiện thời gian phản hồi của hệ thống tăng dần đều đặn trong suốt 48 giờ chạy soak test, dù mức tải giữ nguyên không đổi. Đây là dấu hiệu điển hình của vấn đề gì?",
      "en": "The test team observes response time steadily increasing throughout a 48-hour soak test run, even though the load level stays constant. What issue does this typically indicate?",
      "ja": "テストチームは、48時間のソークテスト実行中、負荷レベルは一定に保たれているにもかかわらず、応答時間が着実に増加していることを確認した。これは通常どのような問題を示す典型的な兆候か。"
    },
    "options": [
      {
        "vi": "Rò rỉ tài nguyên (bộ nhớ, kết nối, handle) tích lũy dần theo thời gian mà không được giải phóng đúng cách",
        "en": "Resource leakage (memory, connections, handles) accumulating over time without being properly released",
        "ja": "メモリ、接続、ハンドルなどのリソースが時間の経過とともに蓄積し、適切に解放されないリソースリーク"
      },
      {
        "vi": "Lỗi cấu hình mạng chỉ xảy ra ở giây đầu tiên của bài kiểm thử",
        "en": "A network configuration error that only occurs in the first second of the test",
        "ja": "テストの最初の1秒間にのみ発生するネットワーク設定エラー"
      },
      {
        "vi": "Người dùng ảo đã ngừng gửi yêu cầu từ giờ thứ hai",
        "en": "Virtual users stopped sending requests after hour two",
        "ja": "仮想ユーザーが2時間目以降リクエストの送信を停止した"
      },
      {
        "vi": "Hệ thống hoạt động hoàn toàn bình thường và không cần điều tra thêm",
        "en": "The system is operating completely normally and requires no further investigation",
        "ja": "システムは完全に正常に動作しており、それ以上の調査は不要である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tải không đổi nhưng thời gian phản hồi tăng dần theo thời gian là dấu hiệu kinh điển của rò rỉ tài nguyên (memory leak, connection leak, file handle leak) — chính là vấn đề mà soak testing được thiết kế để phát hiện.",
      "en": "A constant load but steadily rising response time over time is a classic sign of resource leakage (memory, connection, or file-handle leaks) — exactly the issue soak testing is designed to uncover.",
      "ja": "負荷が一定であるにもかかわらず応答時間が時間とともに着実に増加するのは、メモリリーク、接続リーク、ファイルハンドルリークといったリソースリークの典型的な兆候であり、まさにソークテストが検出するために設計された問題である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "So với stress testing, spike testing khác biệt chủ yếu ở khía cạnh nào?",
      "en": "Compared to stress testing, spike testing primarily differs in which aspect?",
      "ja": "ストレステストと比較して、スパイクテストは主にどの点で異なるか。"
    },
    "options": [
      {
        "vi": "Spike testing không bao giờ liên quan đến số lượng người dùng",
        "en": "Spike testing never involves the number of users",
        "ja": "スパイクテストはユーザー数と一切関係がない"
      },
      {
        "vi": "Spike testing tập trung vào tốc độ thay đổi tải đột ngột trong thời gian ngắn, còn stress testing tăng tải dần dần đến khi vượt ngưỡng năng lực",
        "en": "Spike testing focuses on the abruptness of load change over a short time, whereas stress testing gradually increases load until capacity is exceeded",
        "ja": "スパイクテストは短時間での急激な負荷変化に焦点を当てるのに対し、ストレステストは容量を超えるまで負荷を徐々に増加させる"
      },
      {
        "vi": "Stress testing chỉ thực hiện trên môi trường phát triển, spike testing chỉ trên môi trường sản xuất",
        "en": "Stress testing is only performed in a development environment; spike testing only in production",
        "ja": "ストレステストは開発環境でのみ実施され、スパイクテストは本番環境でのみ実施される"
      },
      {
        "vi": "Hai kỹ thuật này hoàn toàn giống nhau và có thể thay thế cho nhau",
        "en": "The two techniques are entirely identical and interchangeable",
        "ja": "この2つの技術は完全に同一であり、互いに置き換え可能である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Stress testing tăng tải dần dần đến khi hệ thống vượt quá năng lực để tìm điểm giới hạn, trong khi spike testing tập trung vào tính đột ngột — mô phỏng cú tăng/giảm tải cực nhanh để đánh giá khả năng ứng phó và phục hồi tức thời.",
      "en": "Stress testing gradually ramps up load until capacity is exceeded to find the breaking point, while spike testing focuses on suddenness — simulating rapid surges and drops in load to assess immediate responsiveness and recovery.",
      "ja": "ストレステストは限界点を見つけるために容量を超えるまで徐々に負荷を増加させるのに対し、スパイクテストは急激さに焦点を当て、負荷の急速な増減をシミュレートして即時の対応力と回復力を評価する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Capacity testing (kiểm thử dung lượng/năng lực) trả lời cho câu hỏi kinh doanh nào sau đây?",
      "en": "Capacity testing addresses which of the following business questions?",
      "ja": "キャパシティテストは次のどのビジネス上の問いに答えるものか。"
    },
    "options": [
      {
        "vi": "Giao diện người dùng có thân thiện với người khuyết tật hay không?",
        "en": "Is the user interface accessible to people with disabilities?",
        "ja": "ユーザーインターフェースは障がい者にとってアクセスしやすいか？"
      },
      {
        "vi": "Mã nguồn có tuân thủ quy tắc đặt tên biến hay không?",
        "en": "Does the source code comply with variable naming conventions?",
        "ja": "ソースコードは変数命名規則に準拠しているか？"
      },
      {
        "vi": "Hệ thống hiện tại có thể xử lý tối đa bao nhiêu người dùng/giao dịch đồng thời trước khi cần nâng cấp hạ tầng để đáp ứng tăng trưởng kinh doanh dự kiến?",
        "en": "What is the maximum number of concurrent users/transactions the current system can handle before infrastructure upgrades are needed to support projected business growth?",
        "ja": "予測されるビジネス成長に対応するためにインフラのアップグレードが必要になる前に、現行システムが処理できる最大の同時ユーザー数・トランザクション数はいくつか？"
      },
      {
        "vi": "Người dùng có hài lòng với màu sắc giao diện hay không?",
        "en": "Are users satisfied with the interface color scheme?",
        "ja": "ユーザーはインターフェースの配色に満足しているか？"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Capacity testing xác định giới hạn năng lực xử lý hiện tại của hệ thống, giúp tổ chức lập kế hoạch nâng cấp hạ tầng đúng thời điểm trước khi lượng người dùng/giao dịch thực tế vượt quá khả năng đáp ứng.",
      "en": "Capacity testing determines the current maximum processing capability of the system, helping the organization plan infrastructure upgrades in time before actual users/transactions exceed what it can handle.",
      "ja": "キャパシティテストは現行システムの最大処理能力を明らかにし、実際のユーザー数・トランザクション数が処理能力を超える前に、組織が適切なタイミングでインフラのアップグレードを計画できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một yêu cầu phi chức năng được viết là \"hệ thống phải phản hồi nhanh\" mà không có con số cụ thể. Rủi ro chính đối với kiểm thử hiệu năng là gì?",
      "en": "A non-functional requirement states \"the system must respond quickly\" without any specific figures. What is the main risk to performance testing?",
      "ja": "「システムは迅速に応答しなければならない」という非機能要件が具体的な数値なしに記述されている場合、性能テストにおける主なリスクは何か。"
    },
    "options": [
      {
        "vi": "Yêu cầu này tự động được coi là hợp lệ và không cần xem xét lại",
        "en": "The requirement is automatically considered valid and needs no review",
        "ja": "この要件は自動的に有効とみなされ、見直す必要はない"
      },
      {
        "vi": "Hệ thống chắc chắn sẽ không bao giờ hoạt động đúng chức năng",
        "en": "The system is guaranteed to never function correctly",
        "ja": "システムは機能面で決して正しく動作しないことが確実である"
      },
      {
        "vi": "Kiểm thử viên không cần viết bất kỳ kịch bản kiểm thử hiệu năng nào",
        "en": "Testers do not need to write any performance test scripts at all",
        "ja": "テスト担当者は性能テストスクリプトを一切作成する必要がない"
      },
      {
        "vi": "Không có tiêu chí đo lường khách quan (SLA cụ thể) khiến không thể xác định rõ ràng kết quả kiểm thử là đạt hay không đạt",
        "en": "There is no objective, measurable criterion (a concrete SLA), making it impossible to clearly determine pass/fail for test results",
        "ja": "客観的で測定可能な基準（具体的なSLA）が存在しないため、テスト結果の合否を明確に判定できない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Yêu cầu phi chức năng mơ hồ, thiếu ngưỡng đo lường cụ thể (ví dụ thời gian phản hồi ≤ 2 giây với 500 người dùng đồng thời) khiến kiểm thử viên không có tiêu chí khách quan để đánh giá đạt/không đạt, cần làm rõ với các bên liên quan trước khi thiết kế kịch bản.",
      "en": "A vague non-functional requirement lacking measurable thresholds (e.g., response time ≤ 2 seconds with 500 concurrent users) leaves testers without an objective pass/fail criterion, requiring clarification with stakeholders before designing test scenarios.",
      "ja": "測定可能な基準値（例：同時ユーザー500人で応答時間2秒以内）を欠いた曖昧な非機能要件では、テスト担当者は合否を判断する客観的な基準を持てず、テストシナリオを設計する前に関係者との明確化が必要となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thiết lập tiêu chí chấp nhận (acceptance criteria) cho performance testing dựa trên SLA, cách tiếp cận đúng đắn nhất là gì?",
      "en": "When defining acceptance criteria for performance testing based on an SLA, what is the most appropriate approach?",
      "ja": "SLAに基づいて性能テストの合格基準を定める際、最も適切なアプローチは何か。"
    },
    "options": [
      {
        "vi": "Thiết lập ngưỡng định lượng cụ thể (ví dụ: 95th percentile response time ≤ 3s tại 1000 người dùng đồng thời, tỉ lệ lỗi < 1%) được thống nhất trước với các bên liên quan",
        "en": "Establish specific quantitative thresholds (e.g., 95th-percentile response time ≤ 3s at 1000 concurrent users, error rate < 1%) agreed upon with stakeholders beforehand",
        "ja": "関係者と事前に合意した具体的な定量的しきい値（例：同時ユーザー1000人で95パーセンタイル応答時間3秒以内、エラー率1%未満）を設定する"
      },
      {
        "vi": "Chỉ dựa trên cảm nhận chủ quan của người kiểm thử sau khi chạy xong",
        "en": "Rely solely on the tester's subjective impression after the run completes",
        "ja": "実行終了後のテスト担当者の主観的な印象のみに基づく"
      },
      {
        "vi": "Không cần tiêu chí, chỉ cần hệ thống không bị crash là đạt",
        "en": "No criteria are needed; passing simply means the system does not crash",
        "ja": "基準は不要で、システムがクラッシュしなければ合格とみなす"
      },
      {
        "vi": "Lấy tiêu chí từ một sản phẩm cạnh tranh không liên quan mà không điều chỉnh",
        "en": "Adopt criteria from an unrelated competitor product without adjustment",
        "ja": "無関係な競合製品の基準をそのまま調整せずに採用する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tiêu chí chấp nhận hiệu năng cần cụ thể, đo lường được và thống nhất trước với bên liên quan (dựa trên percentile response time, throughput, tỉ lệ lỗi ở mức tải xác định) để có căn cứ khách quan đánh giá đạt/không đạt.",
      "en": "Performance acceptance criteria must be specific, measurable, and agreed with stakeholders in advance (based on percentile response time, throughput, error rate at a defined load), providing an objective basis for pass/fail evaluation.",
      "ja": "性能の合格基準は具体的かつ測定可能であり、事前に関係者と合意しておく必要がある（定義された負荷におけるパーセンタイル応答時間、スループット、エラー率に基づく）。これにより合否評価の客観的根拠が得られる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong volume testing (kiểm thử khối lượng dữ liệu), điều gì thường được kiểm tra mà load testing thông thường có thể bỏ sót?",
      "en": "In volume testing, what is typically examined that ordinary load testing might miss?",
      "ja": "ボリュームテスト（データ量テスト）では、通常のロードテストでは見落とされがちな何が典型的に検証されるか。"
    },
    "options": [
      {
        "vi": "Màu sắc phông chữ trên giao diện đăng nhập",
        "en": "The font color on the login interface",
        "ja": "ログイン画面のフォントの色"
      },
      {
        "vi": "Hành vi và hiệu năng hệ thống khi cơ sở dữ liệu chứa khối lượng dữ liệu lớn (ví dụ hàng triệu bản ghi), như tốc độ truy vấn, chỉ mục và không gian lưu trữ",
        "en": "System behavior and performance when the database holds a large volume of data (e.g., millions of records), such as query speed, indexing, and storage space",
        "ja": "データベースに大量のデータ（例：数百万件のレコード）が格納されている場合のシステムの挙動と性能、例えばクエリ速度、インデックス、ストレージ容量"
      },
      {
        "vi": "Số lượng nhân viên kiểm thử tham gia dự án",
        "en": "The number of testers assigned to the project",
        "ja": "プロジェクトに参加するテスト担当者の人数"
      },
      {
        "vi": "Chỉ kiểm tra một người dùng duy nhất truy cập hệ thống",
        "en": "Testing with only a single user accessing the system",
        "ja": "単一ユーザーのみがシステムにアクセスする場合をテストする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Volume testing tập trung vào tác động của khối lượng dữ liệu lớn (không nhất thiết nhiều người dùng đồng thời) lên hiệu năng hệ thống — ví dụ truy vấn chậm dần khi bảng có hàng triệu bản ghi, chỉ mục không hiệu quả, hoặc hết dung lượng lưu trữ.",
      "en": "Volume testing focuses on the impact of large data volumes (not necessarily many concurrent users) on system performance — for example, queries slowing down as tables grow to millions of rows, inefficient indexing, or storage exhaustion.",
      "ja": "ボリュームテストは、必ずしも多数の同時ユーザーではなく、大量のデータがシステム性能に与える影響に焦点を当てる。例えば、テーブルが数百万行に成長するにつれてクエリが遅くなる、インデックスが非効率になる、ストレージが枯渇するなどである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Vì sao dữ liệu kiểm thử với khối lượng thực tế (giống production về quy mô) lại quan trọng đối với độ tin cậy của performance testing?",
      "en": "Why is test data with realistic (production-like) volume important for the reliability of performance testing?",
      "ja": "性能テストの信頼性にとって、実際の（本番同等規模の）データ量を持つテストデータが重要なのはなぜか。"
    },
    "options": [
      {
        "vi": "Vì luật pháp yêu cầu mọi cơ sở dữ liệu kiểm thử phải có đúng số bản ghi như sản xuất",
        "en": "Because regulations legally require test databases to have exactly the same record count as production",
        "ja": "法律により、テストデータベースは本番と全く同じレコード数を持つことが義務付けられているから"
      },
      {
        "vi": "Vì công cụ kiểm thử tự động không thể chạy nếu dữ liệu ít hơn 10 bản ghi",
        "en": "Because automated testing tools cannot run with fewer than 10 records",
        "ja": "テストツールはレコード数が10件未満だと実行できないから"
      },
      {
        "vi": "Vì dữ liệu ít sẽ khiến truy vấn chạy nhanh giả tạo do chỉ mục/cache hoạt động hiệu quả hơn thực tế, che giấu vấn đề hiệu năng sẽ xuất hiện khi dữ liệu tăng trưởng",
        "en": "Because a small dataset makes queries run artificially fast, as indexing/caching perform better than in reality, hiding performance issues that will surface as data grows",
        "ja": "データ量が少ないと、インデックスやキャッシュが実際より効果的に機能するため、クエリが人為的に高速に実行され、データが増加した際に顕在化する性能問題が隠されてしまうから"
      },
      {
        "vi": "Vì dữ liệu lớn giúp giảm chi phí lưu trữ trên môi trường kiểm thử",
        "en": "Because a large dataset reduces storage costs in the test environment",
        "ja": "大量のデータはテスト環境のストレージコストを削減するから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cơ sở dữ liệu nhỏ thường có hiệu năng truy vấn cao giả tạo (bảng nhỏ, không đủ để phát hiện vấn đề chỉ mục kém hoặc query plan không tối ưu). Chỉ khi dữ liệu đạt quy mô gần giống sản xuất mới bộc lộ đúng các vấn đề hiệu năng thực tế.",
      "en": "Small databases often exhibit artificially high query performance (tables too small to expose poor indexing or suboptimal query plans). Only data volumes close to production scale reveal genuine performance issues.",
      "ja": "小規模なデータベースはしばしば人為的に高いクエリ性能を示す（テーブルが小さすぎて、貧弱なインデックス設計や最適でないクエリプランの問題を露呈しない）。本番規模に近いデータ量になって初めて、本当の性能問題が明らかになる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử hiệu năng ở quy mô lớn, tại sao thường cần sử dụng nhiều bộ sinh tải phân tán (distributed load generators/injectors) thay vì một máy đơn lẻ?",
      "en": "In large-scale performance testing, why is it often necessary to use multiple distributed load generators/injectors rather than a single machine?",
      "ja": "大規模な性能テストにおいて、なぜ単一のマシンではなく複数の分散型ロードジェネレーター（インジェクター）を使用する必要があることが多いのか。"
    },
    "options": [
      {
        "vi": "Vì công cụ kiểm thử chỉ hỗ trợ chạy trên hệ điều hành khác nhau đồng thời",
        "en": "Because the testing tool only supports running on multiple different operating systems simultaneously",
        "ja": "テストツールは異なるOSを同時に実行することしかサポートしていないため"
      },
      {
        "vi": "Vì luật pháp quy định phải dùng tối thiểu 5 máy chủ khi kiểm thử hiệu năng",
        "en": "Because regulations require a minimum of five servers for performance testing",
        "ja": "性能テストには最低5台のサーバーを使用することが法律で定められているため"
      },
      {
        "vi": "Để giảm chi phí bản quyền phần mềm kiểm thử xuống mức thấp nhất",
        "en": "To minimize the licensing cost of the testing software",
        "ja": "テストソフトウェアのライセンス費用を最小限に抑えるため"
      },
      {
        "vi": "Để tạo ra hàng chục nghìn người dùng ảo đồng thời mà một máy đơn không đủ tài nguyên CPU/băng thông để mô phỏng chính xác, đồng thời mô phỏng tải đến từ nhiều vị trí địa lý",
        "en": "To generate tens of thousands of concurrent virtual users that a single machine lacks sufficient CPU/bandwidth to accurately simulate, and to simulate load arriving from multiple geographic locations",
        "ja": "単一マシンではCPUや帯域幅が不足し正確にシミュレートできない数万規模の同時仮想ユーザーを生成するため、また複数の地理的拠点から到達する負荷をシミュレートするため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Một máy sinh tải đơn lẻ bị giới hạn bởi tài nguyên CPU, bộ nhớ và băng thông mạng, không thể tạo ra hàng nghìn/chục nghìn kết nối đồng thời một cách chính xác. Phân tán bộ sinh tải trên nhiều máy/nhiều vùng địa lý còn giúp mô phỏng độ trễ mạng thực tế của người dùng ở các khu vực khác nhau.",
      "en": "A single load generator is limited by CPU, memory, and network bandwidth, and cannot accurately create thousands or tens of thousands of concurrent connections. Distributing generators across multiple machines and geographic regions also helps simulate realistic network latency for users in different locations.",
      "ja": "単一のロードジェネレーターはCPU、メモリ、ネットワーク帯域幅に制限があり、数千から数万の同時接続を正確に生成することはできない。ジェネレーターを複数のマシンや地理的リージョンに分散させることは、異なる地域のユーザーが経験する実際のネットワーク遅延をシミュレートするのにも役立つ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong lúc thực hiện performance testing, việc theo dõi (monitoring) đồng thời cả phía client và phía server bằng công cụ APM (Application Performance Monitoring) mang lại lợi ích nào?",
      "en": "During performance testing, what benefit does simultaneously monitoring both the client side and server side using APM (Application Performance Monitoring) tools provide?",
      "ja": "性能テスト実施中に、APM（アプリケーションパフォーマンス監視）ツールを使用してクライアント側とサーバー側を同時に監視することにはどのような利点があるか。"
    },
    "options": [
      {
        "vi": "Cho phép truy vết giao dịch xuyên suốt (end-to-end) từ yêu cầu của người dùng qua các tầng (web, application, database) để định vị chính xác thành phần gây chậm",
        "en": "Allows end-to-end transaction tracing from the user's request through each tier (web, application, database) to precisely locate the component causing slowness",
        "ja": "ユーザーのリクエストから各層（Web層、アプリケーション層、データベース層）を通るエンドツーエンドのトランザクション追跡を可能にし、遅延の原因となっているコンポーネントを正確に特定できる"
      },
      {
        "vi": "Chỉ giúp thay đổi giao diện người dùng theo yêu cầu khách hàng",
        "en": "Only helps modify the UI according to customer requests",
        "ja": "顧客の要望に応じてUIを変更するのに役立つだけである"
      },
      {
        "vi": "Thay thế hoàn toàn nhu cầu viết kịch bản kiểm thử tự động",
        "en": "Completely eliminates the need to write automated test scripts",
        "ja": "自動テストスクリプトを作成する必要性を完全になくす"
      },
      {
        "vi": "Chỉ có tác dụng với kiểm thử chức năng, không liên quan hiệu năng",
        "en": "Is only useful for functional testing and unrelated to performance",
        "ja": "機能テストにのみ有用で、性能とは関係がない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "APM cho phép truy vết một giao dịch xuyên suốt nhiều tầng hệ thống, kết hợp dữ liệu phía client (thời gian tải) với dữ liệu phía server (thời gian xử lý từng thành phần), giúp xác định chính xác tầng nào là nguyên nhân gây chậm thay vì chỉ biết tổng thời gian phản hồi.",
      "en": "APM enables tracing a single transaction across multiple system tiers, correlating client-side data (load time) with server-side data (per-component processing time), pinpointing exactly which tier causes slowness rather than only knowing the total response time.",
      "ja": "APMは1つのトランザクションを複数のシステム層にわたって追跡することを可能にし、クライアント側のデータ（読み込み時間）とサーバー側のデータ（各コンポーネントの処理時間）を関連付けることで、単に合計応答時間を知るだけでなく、どの層が遅延の原因であるかを正確に特定できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Manager cần lập kế hoạch kiểm thử hiệu năng cho hệ thống thương mại điện tử trước mùa mua sắm cao điểm (ví dụ Black Friday). Kịch bản kiểm thử nào KHÔNG phù hợp để ưu tiên trong bối cảnh này?",
      "en": "A Test Manager must plan performance testing for an e-commerce system ahead of peak shopping season (e.g., Black Friday). Which test scenario is NOT appropriate to prioritize in this context?",
      "ja": "あるテストマネージャーが、ピークショッピングシーズン（例：ブラックフライデー）を前に、eコマースシステムの性能テストを計画する必要がある。この状況で優先すべきでないテストシナリオはどれか。"
    },
    "options": [
      {
        "vi": "Spike testing mô phỏng lượng truy cập đột biến khi chương trình khuyến mãi mở bán",
        "en": "Spike testing simulating a sudden traffic surge when a promotion goes live",
        "ja": "プロモーションが開始された際のアクセス数の急増をシミュレートするスパイクテスト"
      },
      {
        "vi": "Kiểm thử usability về màu sắc nút bấm trên trang chủ với 5 người dùng nội bộ",
        "en": "Usability testing of homepage button colors with 5 internal users",
        "ja": "社内ユーザー5名によるホームページのボタンの色に関するユーザビリティテスト"
      },
      {
        "vi": "Kiểm thử khả năng phục hồi (failover) của hệ thống khi một node trong cụm gặp sự cố dưới tải cao",
        "en": "Failover testing of the system when a node in the cluster fails under high load",
        "ja": "高負荷下でクラスタ内の1ノードが障害を起こした場合のフェイルオーバーテスト"
      },
      {
        "vi": "Stress testing để xác định điểm giới hạn và hành vi hệ thống khi vượt quá năng lực dự kiến",
        "en": "Stress testing to determine the breaking point and system behavior beyond expected capacity",
        "ja": "想定を超える容量に達した際の限界点とシステムの挙動を特定するストレステスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trước mùa cao điểm, ưu tiên hàng đầu là các kiểm thử phi chức năng liên quan đến khả năng chịu tải, độ đột biến và khả năng phục hồi của hệ thống. Kiểm thử usability về màu sắc giao diện không liên quan đến rủi ro hiệu năng trong bối cảnh này nên không nên được ưu tiên.",
      "en": "Ahead of peak season, top priority goes to non-functional tests related to load capacity, traffic spikes, and system resilience. Usability testing of button colors is unrelated to performance risk in this context and should not be prioritized.",
      "ja": "ピークシーズンを前にしては、負荷容量、トラフィックの急増、システムの回復力に関する非機能テストが最優先される。ボタンの色に関するユーザビリティテストは、この文脈における性能リスクとは無関係であり、優先すべきではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thiết kế kịch bản kiểm thử tải cho một hệ thống có nhiều luồng nghiệp vụ khác nhau (tìm kiếm, thêm giỏ hàng, thanh toán), cách tiếp cận đúng đắn để phân bổ tỉ lệ giao dịch (transaction mix) trong kịch bản là gì?",
      "en": "When designing a load test scenario for a system with multiple distinct business flows (search, add to cart, checkout), what is the correct approach for allocating the transaction mix in the scenario?",
      "ja": "複数の異なる業務フロー（検索、カート追加、決済）を持つシステムの負荷テストシナリオを設計する際、シナリオ内のトランザクション比率を割り当てる正しいアプローチは何か。"
    },
    "options": [
      {
        "vi": "Gán tỉ lệ bằng nhau cho tất cả các luồng nghiệp vụ bất kể tần suất sử dụng thực tế",
        "en": "Assign equal weight to all business flows regardless of actual usage frequency",
        "ja": "実際の利用頻度に関係なく、すべての業務フローに等しい比率を割り当てる"
      },
      {
        "vi": "Chỉ kiểm thử luồng thanh toán vì đây là luồng quan trọng nhất về doanh thu, bỏ qua các luồng khác",
        "en": "Test only the checkout flow since it is the most revenue-critical, ignoring the others",
        "ja": "収益上最も重要である決済フローのみをテストし、他のフローは無視する"
      },
      {
        "vi": "Phân bổ tỉ lệ giao dịch phản ánh đúng tần suất sử dụng thực tế trong sản xuất (ví dụ tìm kiếm chiếm tỉ lệ cao hơn thanh toán) dựa trên phân tích dữ liệu thực",
        "en": "Allocate transaction proportions that reflect actual real-world usage frequency in production (e.g., search occurring far more often than checkout), based on real usage data analysis",
        "ja": "実際の利用データ分析に基づき、本番環境における実際の利用頻度を正確に反映したトランザクション比率を割り当てる（例：検索は決済よりもはるかに高い頻度で発生する）"
      },
      {
        "vi": "Chọn tỉ lệ ngẫu nhiên do công cụ kiểm thử tự động sinh ra mà không cần xác minh",
        "en": "Choose random proportions auto-generated by the tool without verification",
        "ja": "検証を行わずにツールが自動生成したランダムな比率を選択する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Một kịch bản tải thực tế phải phản ánh đúng tỉ lệ các luồng nghiệp vụ như trong sản xuất thực tế (thường lấy từ phân tích log/analytics), vì các luồng khác nhau có mức tiêu tốn tài nguyên khác nhau (ví dụ thanh toán tương tác nhiều với DB hơn tìm kiếm), ảnh hưởng đến kết quả tổng thể.",
      "en": "A realistic workload must reflect the actual proportion of business flows as seen in production (typically derived from log/analytics analysis), since different flows consume resources differently (e.g., checkout is more DB-intensive than search), affecting overall results.",
      "ja": "現実的なワークロードは、本番環境で実際に見られる業務フローの比率（通常はログ・アナリティクス分析から導かれる）を反映する必要がある。異なるフローはリソース消費量が異なるため（例：決済は検索よりデータベース処理が重い）、全体の結果に影響を与える。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong đánh giá rủi ro hiệu năng (risk-based approach) cho một dự án ngân hàng trực tuyến, luồng nghiệp vụ nào thường được ưu tiên kiểm thử hiệu năng cao nhất?",
      "en": "In a risk-based approach to performance testing for an online banking project, which business flow is typically prioritized highest for performance testing?",
      "ja": "オンラインバンキングプロジェクトのリスクベースアプローチによる性能テストにおいて、通常最も優先度高くテストされるべき業務フローはどれか。"
    },
    "options": [
      {
        "vi": "Trang trợ giúp hiển thị câu hỏi thường gặp (FAQ), truy cập rất ít",
        "en": "The FAQ help page, which receives very little traffic",
        "ja": "アクセス数が非常に少ないFAQヘルプページ"
      },
      {
        "vi": "Chức năng đổi ngôn ngữ hiển thị giao diện",
        "en": "The interface display-language switcher",
        "ja": "表示言語切り替え機能"
      },
      {
        "vi": "Trang thông tin liên hệ với công ty, ít thay đổi",
        "en": "The company contact information page, which rarely changes",
        "ja": "ほとんど変更のない会社概要・連絡先ページ"
      },
      {
        "vi": "Luồng chuyển khoản/giao dịch tài chính với tần suất sử dụng cao và tác động nghiêm trọng đến kinh doanh nếu chậm hoặc lỗi",
        "en": "The funds transfer/financial transaction flow, with high usage frequency and severe business impact if slow or erroneous",
        "ja": "利用頻度が高く、遅延やエラーが発生した場合にビジネスへの影響が深刻な送金・金融取引フロー"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Risk-based performance testing ưu tiên các luồng nghiệp vụ có xác suất xảy ra vấn đề hiệu năng cao (tần suất sử dụng lớn) kết hợp với tác động kinh doanh nghiêm trọng nếu thất bại (giao dịch tài chính chậm/lỗi gây thiệt hại tài chính và uy tín).",
      "en": "Risk-based performance testing prioritizes business flows with a high probability of performance issues (high usage frequency) combined with severe business impact if they fail (slow/erroneous financial transactions causing financial and reputational damage).",
      "ja": "リスクベースの性能テストは、性能問題が発生する可能性が高い（利用頻度が高い）業務フローと、失敗した場合のビジネスへの深刻な影響（遅延・エラーのある金融取引が財務的・評判上の損害をもたらす）を組み合わせて優先順位を付ける。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Sau khi hệ thống được nâng cấp hạ tầng (thêm CPU, RAM), đội kiểm thử chạy lại đúng kịch bản tải trước đó và so sánh kết quả với lần đo trước để đánh giá cải thiện. Kỹ thuật này được gọi là gì?",
      "en": "After the system's infrastructure is upgraded (added CPU, RAM), the test team reruns the exact same load scenario and compares results with the previous measurement to evaluate improvement. What is this technique called?",
      "ja": "システムのインフラがアップグレードされた（CPU、RAMを追加した）後、テストチームは以前とまったく同じ負荷シナリオを再実行し、以前の測定結果と比較して改善を評価する。この手法は何と呼ばれるか。"
    },
    "options": [
      {
        "vi": "So sánh với baseline (baseline/benchmark comparison) để đo lường cải thiện hiệu năng một cách khách quan qua thời gian",
        "en": "Baseline/benchmark comparison to objectively measure performance improvement over time",
        "ja": "時間経過に伴う性能改善を客観的に測定するためのベースライン／ベンチマーク比較"
      },
      {
        "vi": "Spike testing",
        "en": "Spike testing",
        "ja": "スパイクテスト"
      },
      {
        "vi": "Exploratory testing",
        "en": "Exploratory testing",
        "ja": "探索的テスト"
      },
      {
        "vi": "Smoke testing",
        "en": "Smoke testing",
        "ja": "スモークテスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Việc thiết lập một mốc đo (baseline) và lặp lại đúng kịch bản đó sau mỗi thay đổi hạ tầng/mã nguồn cho phép so sánh khách quan, định lượng mức độ cải thiện hoặc suy giảm hiệu năng, tránh nhận định cảm tính.",
      "en": "Establishing a baseline and repeating the exact same scenario after each infrastructure/code change enables an objective, quantitative comparison of performance improvement or regression, avoiding subjective judgment.",
      "ja": "ベースラインを確立し、インフラやコードの変更ごとに全く同じシナリオを繰り返すことで、性能の改善または低下を客観的かつ定量的に比較でき、主観的な判断を避けられる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong ISTQB Advanced, khi Test Manager lập kế hoạch kiểm thử hiệu năng, tại sao việc xác định rõ mục tiêu kiểm thử cụ thể (load, stress, soak, spike, scalability...) ngay từ đầu lại quan trọng?",
      "en": "In ISTQB Advanced, when a Test Manager plans performance testing, why is it important to clearly define specific test objectives (load, stress, soak, spike, scalability, etc.) from the start?",
      "ja": "ISTQBアドバンストレベルにおいて、テストマネージャーが性能テストを計画する際、最初から具体的なテスト目的（ロード、ストレス、ソーク、スパイク、スケーラビリティなど）を明確に定義することがなぜ重要なのか。"
    },
    "options": [
      {
        "vi": "Vì tất cả các loại kiểm thử hiệu năng đều dùng chung một kịch bản, cấu hình môi trường và tiêu chí đánh giá giống hệt nhau",
        "en": "Because all performance testing types share the exact same scenario, environment configuration, and evaluation criteria",
        "ja": "すべての種類の性能テストは、全く同一のシナリオ、環境構成、評価基準を共有するから"
      },
      {
        "vi": "Vì mỗi loại kiểm thử có mục đích, kịch bản tải, thời lượng chạy và tiêu chí đánh giá khác nhau; xác định sai mục tiêu dẫn đến thiết kế kịch bản không phù hợp và lãng phí nguồn lực",
        "en": "Because each type has a different purpose, load pattern, duration, and evaluation criteria; misidentifying the objective leads to an inappropriate test design and wasted resources",
        "ja": "それぞれの種類には異なる目的、負荷パターン、実行時間、評価基準があり、目的を誤って特定すると不適切なテスト設計となり、リソースの浪費につながるから"
      },
      {
        "vi": "Vì kiểm thử hiệu năng không cần lập kế hoạch, chỉ cần chạy ngẫu nhiên là đủ",
        "en": "Because performance testing does not require planning; running it randomly is sufficient",
        "ja": "性能テストには計画は不要で、ランダムに実行するだけで十分だから"
      },
      {
        "vi": "Vì ISTQB quy định chỉ được chọn duy nhất một loại kiểm thử hiệu năng cho mỗi dự án",
        "en": "Because ISTQB mandates that only one type of performance test may be selected per project",
        "ja": "ISTQBはプロジェクトごとに1種類の性能テストしか選択できないと規定しているから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Load, stress, soak, spike và scalability testing có mục tiêu, mô hình tải, thời lượng và tiêu chí thành công khác nhau. Xác định rõ mục tiêu ngay từ đầu giúp thiết kế kịch bản, chọn công cụ và phân bổ nguồn lực (thời gian, môi trường, nhân sự) phù hợp, tránh kiểm thử sai trọng tâm.",
      "en": "Load, stress, soak, spike, and scalability testing each have distinct objectives, load patterns, durations, and success criteria. Clearly defining the objective upfront ensures the right scenario design, tool choice, and resource allocation (time, environment, staff), avoiding misdirected testing effort.",
      "ja": "ロード、ストレス、ソーク、スパイク、スケーラビリティの各テストは、それぞれ異なる目的、負荷パターン、実行時間、成功基準を持つ。目的を最初に明確化することで、適切なシナリオ設計、ツール選定、リソース（時間、環境、人員）の配分が可能になり、的外れなテスト活動を避けられる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong phân loại lỗ hổng bảo mật theo CWE (Common Weakness Enumeration), mục đích chính của việc gán mã CWE cho một lỗ hổng là gì?",
      "en": "In vulnerability classification using CWE (Common Weakness Enumeration), what is the main purpose of assigning a CWE ID to a vulnerability?",
      "ja": "CWE(共通脆弱性タイプ一覧)による脆弱性分類において、脆弱性にCWE IDを割り当てる主な目的は何か。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho điểm CVSS trong việc đánh giá mức độ nghiêm trọng",
        "en": "To completely replace the CVSS score when assessing severity",
        "ja": "深刻度評価においてCVSSスコアを完全に置き換えるため"
      },
      {
        "vi": "Tự động vá lỗ hổng ngay khi phát hiện mà không cần con người can thiệp",
        "en": "To automatically patch the vulnerability upon detection without human intervention",
        "ja": "検出時に人手を介さず自動的に脆弱性を修正するため"
      },
      {
        "vi": "Cung cấp một danh mục chuẩn hóa để phân loại loại điểm yếu, giúp so sánh, thống kê và ưu tiên khắc phục nhất quán giữa các dự án",
        "en": "To provide a standardized taxonomy of weakness types, enabling consistent comparison, statistics, and remediation prioritization across projects",
        "ja": "弱点の種類を標準化された分類体系で提供し、プロジェクト間で一貫した比較・統計・修正優先順位付けを可能にするため"
      },
      {
        "vi": "Xác định chính xác tác giả đoạn mã gây ra lỗ hổng để quy trách nhiệm",
        "en": "To precisely identify the author of the vulnerable code for accountability purposes",
        "ja": "脆弱性を引き起こしたコードの作成者を特定し責任を追及するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "CWE là một danh mục cộng đồng dùng để đặt tên và phân loại các loại điểm yếu phần mềm một cách nhất quán, phục vụ so sánh, thống kê xu hướng và ưu tiên khắc phục; nó không tự vá lỗi, không thay thế CVSS (đo mức độ nghiêm trọng) và không dùng để quy trách nhiệm cá nhân.",
      "en": "CWE is a community taxonomy used to name and categorize software weakness types consistently, supporting comparison, trend statistics, and remediation prioritization; it does not auto-patch, does not replace CVSS (which measures severity), and is not for individual blame.",
      "ja": "CWEはソフトウェアの弱点の種類を一貫して命名・分類するためのコミュニティによる分類体系であり、比較・傾向統計・修正優先順位付けを支援する。自動修正はせず、深刻度を測るCVSSの代替でもなく、個人の責任追及のためのものでもない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Theo OWASP Top 10 (phiên bản gần đây), hạng mục 'Broken Access Control' mô tả điều gì?",
      "en": "According to the recent OWASP Top 10, what does the 'Broken Access Control' category describe?",
      "ja": "最新のOWASP Top 10において、「アクセス制御の不備(Broken Access Control)」カテゴリは何を表すか。"
    },
    "options": [
      {
        "vi": "Ứng dụng sử dụng thuật toán mã hóa yếu để lưu trữ mật khẩu người dùng",
        "en": "The application uses weak cryptographic algorithms to store user passwords",
        "ja": "アプリケーションがユーザーパスワードの保存に弱い暗号アルゴリズムを使用していること"
      },
      {
        "vi": "Máy chủ web trả về thông tin cấu hình chi tiết trong thông báo lỗi",
        "en": "The web server returns detailed configuration information in error messages",
        "ja": "Webサーバーがエラーメッセージ内に詳細な設定情報を返してしまうこと"
      },
      {
        "vi": "Hệ thống ghi log không đầy đủ khiến không thể phát hiện tấn công sau sự cố",
        "en": "The system logs insufficiently, making post-incident attack detection impossible",
        "ja": "システムのログが不十分でインシデント後の攻撃検知ができないこと"
      },
      {
        "vi": "Người dùng có thể thực hiện hành động hoặc truy cập tài nguyên vượt quá quyền hạn được cấp phép, ví dụ sửa đổi URL để xem dữ liệu của người khác",
        "en": "Users can perform actions or access resources beyond their granted permissions, e.g. modifying a URL to view another user's data",
        "ja": "ユーザーが許可された権限を超えて操作や資源へのアクセスを行えること。例えばURLを改変して他ユーザーのデータを閲覧できる場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Broken Access Control xảy ra khi cơ chế kiểm soát quyền truy cập bị lỗi hoặc thiếu, cho phép người dùng vượt quyền hạn của mình (ví dụ IDOR - Insecure Direct Object Reference), khác với các hạng mục về mã hóa yếu, thiếu logging hay lộ thông tin cấu hình.",
      "en": "Broken Access Control occurs when access control enforcement is flawed or missing, allowing users to act beyond their authorized privileges (e.g. IDOR), distinct from weak cryptography, insufficient logging, or configuration disclosure categories.",
      "ja": "アクセス制御の不備は、権限管理の実装に欠陥や欠如があり、ユーザーが許可された権限を超えて操作できる状態(例:IDOR)を指す。暗号の弱さ、ログ不足、設定情報の漏えいとは異なるカテゴリである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một buổi kiểm thử thâm nhập (penetration testing), 'Rules of Engagement' (quy tắc giao ước) có vai trò gì quan trọng nhất?",
      "en": "In a penetration testing engagement, what is the most critical role of the 'Rules of Engagement'?",
      "ja": "侵入テスト(ペネトレーションテスト)において「Rules of Engagement(実施規定)」の最も重要な役割は何か。"
    },
    "options": [
      {
        "vi": "Xác định phạm vi, thời gian, phương pháp được phép, giới hạn kỹ thuật và quy trình xử lý sự cố nhằm đảm bảo kiểm thử hợp pháp và an toàn cho hệ thống",
        "en": "Define scope, timing, permitted methods, technical limits, and incident-handling procedures to ensure the test is legal and safe for the system",
        "ja": "範囲、実施時期、許可された手法、技術的制限、インシデント対応手順を定め、テストの合法性とシステムへの安全性を確保すること"
      },
      {
        "vi": "Liệt kê danh sách công cụ tự động cần dùng trong quá trình kiểm thử",
        "en": "List the automated tools that must be used during testing",
        "ja": "テスト中に使用すべき自動化ツールの一覧を示すこと"
      },
      {
        "vi": "Đảm bảo mọi lỗ hổng tìm thấy sẽ được công bố công khai ngay lập tức",
        "en": "Ensure that every vulnerability found is immediately disclosed publicly",
        "ja": "発見されたすべての脆弱性を直ちに公開すること"
      },
      {
        "vi": "Thay thế hợp đồng pháp lý giữa bên kiểm thử và khách hàng",
        "en": "Replace the legal contract between the testing party and the client",
        "ja": "テスト実施者と顧客との間の法的契約に代わるもの"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rules of Engagement thiết lập ranh giới rõ ràng (phạm vi, thời gian, kỹ thuật được phép/cấm, cách xử lý khi phát hiện sự cố nghiêm trọng) để bảo vệ cả bên kiểm thử và hệ thống mục tiêu, không phải danh sách công cụ, không tự động công khai lỗ hổng, và không thay thế hợp đồng pháp lý mà thường đi kèm với nó.",
      "en": "Rules of Engagement establish clear boundaries (scope, timing, permitted/prohibited techniques, incident escalation) to protect both the tester and target system; it is not a tool list, does not mandate public disclosure, and does not replace the accompanying legal contract.",
      "ja": "Rules of Engagementは範囲、実施時期、許可・禁止される技術、重大インシデント発生時の対応手順など明確な境界を定め、テスト実施者と対象システム双方を保護する。ツール一覧ではなく、脆弱性の自動公開を意味せず、付随する法的契約に代わるものでもない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi Test Analyst thiết kế test case cho lỗ hổng SQL Injection, kỹ thuật nào sau đây thể hiện đúng cách tiếp cận kiểm thử bảo mật có hệ thống?",
      "en": "When a Test Analyst designs test cases for SQL Injection vulnerabilities, which technique reflects a systematic security testing approach?",
      "ja": "テストアナリストがSQLインジェクション脆弱性のテストケースを設計する際、体系的なセキュリティテストアプローチを表す手法はどれか。"
    },
    "options": [
      {
        "vi": "Chỉ nhập một ký tự nháy đơn (') vào một trường bất kỳ rồi kết luận ứng dụng an toàn nếu không có lỗi hiển thị",
        "en": "Only input a single quote (') into one arbitrary field and conclude the app is safe if no error is displayed",
        "ja": "任意の1つのフィールドにシングルクォート(')を入力し、エラーが表示されなければ安全と結論づける"
      },
      {
        "vi": "Kết hợp phân tích luồng dữ liệu để xác định mọi điểm nhập liệu chạm tới truy vấn cơ sở dữ liệu, sau đó áp dụng các payload đa dạng (boolean-based, time-based, union-based) trên từng điểm đó",
        "en": "Combine data-flow analysis to identify every input point that reaches a database query, then apply diverse payloads (boolean-based, time-based, union-based) at each point",
        "ja": "データフロー分析を組み合わせてデータベースクエリに到達するすべての入力箇所を特定し、各箇所にboolean-based、time-based、union-basedなど多様なペイロードを適用する"
      },
      {
        "vi": "Dựa hoàn toàn vào công cụ quét tự động và bỏ qua việc xác minh thủ công các cảnh báo dương tính giả",
        "en": "Rely entirely on automated scanning tools and skip manual verification of false-positive alerts",
        "ja": "自動スキャンツールに完全に依存し、誤検知アラートの手動検証を省略する"
      },
      {
        "vi": "Chỉ kiểm thử trên môi trường production để đảm bảo kết quả phản ánh đúng thực tế",
        "en": "Test only on the production environment to ensure results reflect real conditions",
        "ja": "実際の状況を反映させるため本番環境のみでテストを行う"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cách tiếp cận có hệ thống đòi hỏi phân tích luồng dữ liệu để tìm mọi điểm nhập chạm database, rồi thử nhiều loại payload để phát hiện các dạng SQLi khác nhau (error-based, blind boolean, blind time, union); thử một ký tự trên một trường, phụ thuộc hoàn toàn công cụ tự động không xác minh, hay kiểm thử trực tiếp trên production đều là thực hành thiếu chuyên nghiệp và rủi ro cao.",
      "en": "A systematic approach requires data-flow analysis to find all inputs reaching the database, then applying varied payloads to detect different SQLi variants (error-based, blind boolean, blind time, union-based); testing one character on one field, relying solely on unverified automated scans, or testing directly in production are unprofessional and risky practices.",
      "ja": "体系的アプローチでは、データベースに到達するすべての入力箇所をデータフロー分析で特定し、多様なペイロード(error-based、blind boolean、blind time、union-basedなど)を適用してSQLiの各種形態を検出する必要がある。1フィールドへの1文字入力、検証なしの自動スキャンへの完全依存、本番環境のみでのテストはいずれも専門性に欠け高リスクな手法である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bối cảnh kiểm thử bảo mật, sự khác biệt cốt lõi giữa 'Vulnerability Assessment' (đánh giá lỗ hổng) và 'Penetration Testing' (kiểm thử thâm nhập) là gì?",
      "en": "In security testing, what is the core difference between 'Vulnerability Assessment' and 'Penetration Testing'?",
      "ja": "セキュリティテストにおいて、「脆弱性評価(Vulnerability Assessment)」と「侵入テスト(Penetration Testing)」の本質的な違いは何か。"
    },
    "options": [
      {
        "vi": "Vulnerability Assessment luôn tốn nhiều thời gian và chi phí hơn Penetration Testing",
        "en": "Vulnerability Assessment always takes more time and costs more than Penetration Testing",
        "ja": "脆弱性評価は常に侵入テストよりも時間とコストがかかる"
      },
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi tùy theo nhà cung cấp dịch vụ",
        "en": "Both are entirely identical, differing only in naming depending on the service vendor",
        "ja": "両者は完全に同一であり、サービス提供者によって呼称が異なるだけである"
      },
      {
        "vi": "Vulnerability Assessment tập trung phát hiện và liệt kê các lỗ hổng tiềm ẩn trên diện rộng, trong khi Penetration Testing chủ động khai thác lỗ hổng để chứng minh tác động thực tế và khả năng xâm nhập sâu hơn",
        "en": "Vulnerability Assessment focuses on broadly discovering and listing potential weaknesses, while Penetration Testing actively exploits vulnerabilities to prove real-world impact and further intrusion capability",
        "ja": "脆弱性評価は潜在的な弱点を広範囲に発見・列挙することに重点を置き、侵入テストは脆弱性を積極的に悪用して実際の影響とさらなる侵入可能性を証明する"
      },
      {
        "vi": "Penetration Testing chỉ được thực hiện bằng công cụ tự động, không cần chuyên gia con người",
        "en": "Penetration Testing is only performed using automated tools without any human expert involvement",
        "ja": "侵入テストは自動ツールのみで実施され、人間の専門家は関与しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vulnerability Assessment thường là quét diện rộng để liệt kê lỗ hổng có thể có (nhiều dương tính giả), còn Penetration Testing đi sâu hơn: khai thác thực tế để chứng minh mức độ nghiêm trọng, khả năng leo thang đặc quyền và tác động kinh doanh thực sự; đây là hai hoạt động bổ trợ nhau chứ không đồng nhất.",
      "en": "Vulnerability Assessment is typically broad scanning to list possible weaknesses (with many false positives), while Penetration Testing goes deeper by actually exploiting flaws to demonstrate severity, privilege escalation potential, and real business impact; they are complementary, not identical, activities.",
      "ja": "脆弱性評価は通常、潜在的な弱点を列挙する広範なスキャンであり(誤検知も多い)、侵入テストはさらに踏み込み、実際に脆弱性を悪用して深刻度・権限昇格の可能性・実際のビジネス影響を証明する。両者は補完関係にあり同一のものではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Technical Test Analyst phát hiện ứng dụng web trả về stack trace chi tiết khi xảy ra lỗi 500. Rủi ro bảo mật chính từ hiện tượng này là gì?",
      "en": "A Technical Test Analyst discovers that a web application returns a detailed stack trace when a 500 error occurs. What is the primary security risk from this behavior?",
      "ja": "テクニカルテストアナリストが、Webアプリケーションが500エラー発生時に詳細なスタックトレースを返すことを発見した。この挙動から生じる主なセキュリティリスクは何か。"
    },
    "options": [
      {
        "vi": "Làm giảm hiệu năng phản hồi của máy chủ do phải tạo báo cáo lỗi dài",
        "en": "It degrades server response performance due to generating long error reports",
        "ja": "長いエラーレポートを生成するためサーバーの応答性能が低下する"
      },
      {
        "vi": "Làm tăng dung lượng log lưu trữ trên máy chủ, gây tốn chi phí lưu trữ",
        "en": "It increases stored log volume on the server, raising storage costs",
        "ja": "サーバー上のログ保存容量が増加し保存コストが増える"
      },
      {
        "vi": "Gây lỗi cú pháp HTML khiến giao diện hiển thị sai trên một số trình duyệt",
        "en": "It causes HTML syntax errors leading to incorrect rendering on some browsers",
        "ja": "HTML構文エラーを引き起こし一部ブラウザで表示が崩れる"
      },
      {
        "vi": "Kẻ tấn công có thể thu thập thông tin nhạy cảm về framework, phiên bản thư viện, đường dẫn hệ thống để lên kế hoạch khai thác lỗ hổng phù hợp (security misconfiguration / information disclosure)",
        "en": "An attacker can gather sensitive information about the framework, library versions, and system paths to plan targeted exploits (security misconfiguration / information disclosure)",
        "ja": "攻撃者がフレームワーク、ライブラリのバージョン、システムパスなどの機密情報を収集し、標的を絞った攻撃を計画できてしまう(セキュリティ設定ミス/情報漏えい)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Stack trace chi tiết lộ ra công nghệ nền, phiên bản, đường dẫn nội bộ — đây là dạng 'information disclosure' thuộc nhóm Security Misconfiguration trong OWASP Top 10, giúp kẻ tấn công thu thập thông tin trinh sát (reconnaissance) để chọn kỹ thuật khai thác phù hợp; các phương án khác chỉ là vấn đề hiệu năng/hiển thị không liên quan trực tiếp đến bảo mật.",
      "en": "A detailed stack trace exposes underlying technology, versions, and internal paths — a form of information disclosure under the Security Misconfiguration category of OWASP Top 10, aiding attacker reconnaissance to select suitable exploits; the other options are performance/display concerns unrelated to the core security risk.",
      "ja": "詳細なスタックトレースは基盤技術、バージョン、内部パスを漏えいさせる。これはOWASP Top 10の「セキュリティ設定ミス」カテゴリに属する情報漏えいの一種であり、攻撃者の偵察活動を助け適切な攻撃手法の選定を可能にする。他の選択肢はセキュリティの本質的リスクとは無関係な性能・表示上の問題である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử bảo mật theo mô hình STRIDE, chữ 'T' đại diện cho loại đe dọa nào?",
      "en": "In STRIDE-based security threat modeling, what does the letter 'T' represent?",
      "ja": "STRIDE脅威モデリングにおいて、文字「T」はどの脅威の種類を表すか。"
    },
    "options": [
      {
        "vi": "Tampering — giả mạo/sửa đổi trái phép dữ liệu hoặc mã nguồn",
        "en": "Tampering — unauthorized modification of data or code",
        "ja": "Tampering(改ざん)— データやコードの不正な変更"
      },
      {
        "vi": "Transmission — truyền dữ liệu qua mạng không mã hóa",
        "en": "Transmission — transmitting data over the network unencrypted",
        "ja": "Transmission(伝送)— ネットワーク上でのデータの非暗号化伝送"
      },
      {
        "vi": "Timeout — hệ thống bị treo do hết thời gian chờ phản hồi",
        "en": "Timeout — the system hangs due to response timeout",
        "ja": "Timeout(タイムアウト)— 応答待ち時間切れによるシステムハング"
      },
      {
        "vi": "Trust — mức độ tin cậy giữa các thành phần hệ thống",
        "en": "Trust — the level of trust between system components",
        "ja": "Trust(信頼)— システムコンポーネント間の信頼レベル"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "STRIDE là mô hình phân loại đe dọa của Microsoft gồm Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege; 'T' là Tampering — hành vi sửa đổi trái phép dữ liệu, thông điệp hoặc mã nguồn khi đang lưu trữ hoặc truyền tải.",
      "en": "STRIDE is Microsoft's threat classification model comprising Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege; 'T' stands for Tampering — unauthorized alteration of data, messages, or code at rest or in transit.",
      "ja": "STRIDEはMicrosoftによる脅威分類モデルで、Spoofing、Tampering、Repudiation、Information Disclosure、Denial of Service、Elevation of Privilegeから成る。「T」はTampering(改ざん)を表し、保存中または伝送中のデータ・メッセージ・コードへの不正な変更を指す。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Manager cần lập kế hoạch kiểm thử bảo mật cho hệ thống thanh toán trực tuyến. Yếu tố nào sau đây QUAN TRỌNG NHẤT cần xác định trước khi bắt đầu penetration testing trên môi trường thật?",
      "en": "A Test Manager plans security testing for an online payment system. Which factor is MOST critical to determine before starting penetration testing on a live environment?",
      "ja": "テストマネージャーがオンライン決済システムのセキュリティテストを計画している。実環境で侵入テストを開始する前に確認すべき最も重要な要素はどれか。"
    },
    "options": [
      {
        "vi": "Số lượng công cụ quét tự động có thể chạy song song để rút ngắn thời gian",
        "en": "The number of automated scanning tools that can run in parallel to shorten duration",
        "ja": "期間短縮のため並行実行可能な自動スキャンツールの数"
      },
      {
        "vi": "Sự cho phép bằng văn bản (authorization) từ chủ sở hữu hệ thống và các bên liên quan, cùng phạm vi/thời gian được phép, để đảm bảo hoạt động hợp pháp và tránh gián đoạn dịch vụ thật",
        "en": "Written authorization from the system owner and relevant stakeholders, along with agreed scope/timing, to ensure the activity is legal and avoid disrupting the live service",
        "ja": "システム所有者および関係者からの書面による許可、および合意された範囲・実施時期。これにより活動の合法性を確保し実サービスの中断を回避する"
      },
      {
        "vi": "Màu sắc và bố cục giao diện người dùng của hệ thống thanh toán",
        "en": "The color scheme and UI layout of the payment system",
        "ja": "決済システムのUIの配色とレイアウト"
      },
      {
        "vi": "Số lượng nhân viên kỹ thuật đang online trong giờ hành chính",
        "en": "The number of technical staff online during business hours",
        "ja": "営業時間中にオンラインである技術スタッフの人数"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử thâm nhập trên hệ thống thật, đặc biệt hệ thống thanh toán có dữ liệu nhạy cảm, bắt buộc phải có sự cho phép rõ ràng bằng văn bản, xác định phạm vi và thời gian, nếu không có thể vi phạm pháp luật (truy cập trái phép) và gây gián đoạn dịch vụ nghiêm trọng; đây là yếu tố tiên quyết trên cả khía cạnh đạo đức, pháp lý và kỹ thuật.",
      "en": "Penetration testing on a live system, especially a payment system handling sensitive data, mandates explicit written authorization with defined scope and timing; without it, testing may constitute unauthorized access (illegal) and risks severe service disruption — this is the ethical, legal, and technical prerequisite above all else.",
      "ja": "特に機密データを扱う決済システムなど実環境での侵入テストには、範囲と実施時期を明確にした書面による明示的な許可が不可欠である。これがなければ不正アクセスとして法律違反となり得るほか、深刻なサービス中断を招く恐れがある。これは倫理的・法的・技術的に最優先すべき前提条件である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Xét lỗ hổng 'Cross-Site Scripting' (XSS) dạng Stored (lưu trữ). Điều gì phân biệt nó rõ rệt nhất so với Reflected XSS?",
      "en": "Regarding Stored Cross-Site Scripting (XSS), what most clearly distinguishes it from Reflected XSS?",
      "ja": "格納型(Stored)クロスサイトスクリプティング(XSS)について、反射型(Reflected)XSSと最も明確に区別される点は何か。"
    },
    "options": [
      {
        "vi": "Stored XSS chỉ ảnh hưởng đến trình duyệt Internet Explorer, còn Reflected XSS ảnh hưởng mọi trình duyệt",
        "en": "Stored XSS only affects Internet Explorer, whereas Reflected XSS affects all browsers",
        "ja": "格納型XSSはInternet Explorerのみに影響し、反射型XSSはすべてのブラウザに影響する"
      },
      {
        "vi": "Reflected XSS chỉ xảy ra trên ứng dụng di động, không xảy ra trên web",
        "en": "Reflected XSS only occurs in mobile applications, not on the web",
        "ja": "反射型XSSはモバイルアプリでのみ発生し、Webでは発生しない"
      },
      {
        "vi": "Mã độc trong Stored XSS được lưu trữ vĩnh viễn trên máy chủ (ví dụ trong bình luận, hồ sơ người dùng) và tự động thực thi với MỌI người dùng xem trang đó, không cần dụ nạn nhân click liên kết độc hại như Reflected XSS",
        "en": "Malicious code in Stored XSS is persistently saved on the server (e.g. in comments, user profiles) and automatically executes for EVERY user viewing that page, without needing to lure a victim into clicking a malicious link as in Reflected XSS",
        "ja": "格納型XSSの悪意あるコードはサーバー上に永続的に保存され(例:コメントやユーザープロフィール内)、そのページを閲覧する全ユーザーに対して自動的に実行される。反射型XSSのように被害者を悪意あるリンクのクリックへ誘導する必要がない"
      },
      {
        "vi": "Stored XSS không thể bị ngăn chặn bằng bất kỳ biện pháp nào, kể cả output encoding",
        "en": "Stored XSS cannot be prevented by any measure, including output encoding",
        "ja": "格納型XSSはoutput encodingを含めいかなる対策でも防げない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Điểm khác biệt then chốt là tính bền vững và phạm vi tác động: Stored XSS lưu payload trong dữ liệu máy chủ (DB, file) nên ảnh hưởng mọi người dùng truy cập nội dung đó mà không cần tương tác đặc biệt, trong khi Reflected XSS chỉ thực thi khi nạn nhân bị lừa click một liên kết chứa payload trong tham số request; các phương án khác đều sai về mặt kỹ thuật.",
      "en": "The key distinction is persistence and blast radius: Stored XSS embeds the payload in server-side data (DB, files), affecting every user who views that content without special interaction, while Reflected XSS only executes when a victim is tricked into clicking a link containing the payload in request parameters; the other options are technically incorrect.",
      "ja": "重要な違いは永続性と影響範囲である。格納型XSSはペイロードをサーバー側データ(DB、ファイル)に埋め込むため、特別な操作なしにそのコンテンツを閲覧する全ユーザーに影響する。一方、反射型XSSはリクエストパラメータ内のペイロードを含むリンクを被害者がクリックした場合にのみ実行される。他の選択肢は技術的に誤りである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một dự án Agile, Test Analyst muốn tích hợp kiểm thử bảo mật vào từng sprint thay vì chỉ thực hiện một lần trước khi phát hành. Cách tiếp cận nào phù hợp nhất với triết lý 'Shift Left Security'?",
      "en": "In an Agile project, a Test Analyst wants to integrate security testing into every sprint rather than a single pass before release. Which approach best fits the 'Shift Left Security' philosophy?",
      "ja": "アジャイルプロジェクトにおいて、テストアナリストがリリース前の一括実施ではなく各スプリントにセキュリティテストを組み込みたいと考えている。「Shift Left Security」の理念に最も適したアプローチはどれか。"
    },
    "options": [
      {
        "vi": "Chỉ chạy quét bảo mật tự động (SAST/DAST) một lần duy nhất ở giai đoạn UAT trước khi go-live",
        "en": "Only run automated security scans (SAST/DAST) once during UAT right before go-live",
        "ja": "リリース直前のUATフェーズで自動セキュリティスキャン(SAST/DAST)を一度だけ実施する"
      },
      {
        "vi": "Bỏ qua kiểm thử bảo mật ở cấp độ đơn vị vì cho rằng lập trình viên tự chịu trách nhiệm hoàn toàn",
        "en": "Skip security testing at the unit level, assuming developers are fully responsible on their own",
        "ja": "開発者が全責任を負うものとしてユニットレベルのセキュリティテストを省略する"
      },
      {
        "vi": "Thuê một công ty bên ngoài kiểm thử thâm nhập toàn diện sau khi sản phẩm đã phát hành ra thị trường",
        "en": "Hire an external firm to conduct a full penetration test only after the product has already launched to market",
        "ja": "製品が市場にリリースされた後に外部企業へ全面的な侵入テストを依頼する"
      },
      {
        "vi": "Tích hợp quét mã tĩnh (SAST) vào pipeline CI của mỗi sprint, kết hợp threat modeling ngay từ giai đoạn thiết kế user story và review bảo mật trong Definition of Done",
        "en": "Integrate static code analysis (SAST) into the CI pipeline of every sprint, combine it with threat modeling during user story design, and include security review in the Definition of Done",
        "ja": "各スプリントのCIパイプラインに静的コード解析(SAST)を組み込み、ユーザーストーリー設計段階からの脅威モデリングを併用し、Definition of Doneにセキュリティレビューを含める"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Shift Left Security nghĩa là đưa hoạt động bảo mật vào sớm và liên tục trong vòng đời phát triển: threat modeling từ khi thiết kế story, SAST tự động trong CI mỗi sprint, và tiêu chí bảo mật trong Definition of Done giúp phát hiện sớm, giảm chi phí sửa lỗi; các phương án còn lại đều là kiểm thử muộn (shift right) hoặc bỏ sót trách nhiệm.",
      "en": "Shift Left Security means embedding security activities early and continuously across the development lifecycle: threat modeling at story design, automated SAST in each sprint's CI, and security criteria in the Definition of Done enable early detection and lower fix costs; the other options represent late-stage testing (shift right) or neglected responsibility.",
      "ja": "Shift Left Securityとは、開発ライフサイクルの早期から継続的にセキュリティ活動を組み込むことを意味する。ストーリー設計時の脅威モデリング、各スプリントのCIにおける自動SAST、Definition of Doneへのセキュリティ基準の組み込みにより早期発見と修正コスト削減が可能になる。他の選択肢はいずれも後工程での実施(shift right)や責任の放棄に相当する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi phân tích lỗ hổng theo mức độ nghiêm trọng bằng CVSS (Common Vulnerability Scoring System), yếu tố nào KHÔNG thuộc nhóm 'Base Metrics'?",
      "en": "When analyzing vulnerability severity using CVSS (Common Vulnerability Scoring System), which factor does NOT belong to the 'Base Metrics' group?",
      "ja": "CVSS(共通脆弱性評価システム)を用いて脆弱性の深刻度を分析する際、「Base Metrics(基本評価基準)」グループに属さない要素はどれか。"
    },
    "options": [
      {
        "vi": "Report Confidence — mức độ tin cậy của báo cáo do bên thứ ba cung cấp về lỗ hổng",
        "en": "Report Confidence — the confidence level of a third-party report about the vulnerability",
        "ja": "Report Confidence — 第三者による脆弱性報告の信頼度"
      },
      {
        "vi": "Privileges Required — mức đặc quyền cần có để khai thác",
        "en": "Privileges Required to exploit the vulnerability",
        "ja": "Privileges Required(攻撃に必要な権限レベル)"
      },
      {
        "vi": "Attack Vector — vector tấn công (Network, Adjacent, Local, Physical)",
        "en": "Attack Vector (Network, Adjacent, Local, Physical)",
        "ja": "Attack Vector(攻撃元区分:Network、Adjacent、Local、Physical)"
      },
      {
        "vi": "Impact trên tính bí mật, toàn vẹn, sẵn sàng (Confidentiality, Integrity, Availability)",
        "en": "Impact on Confidentiality, Integrity, and Availability",
        "ja": "機密性・完全性・可用性(Confidentiality、Integrity、Availability)への影響"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Base Metrics của CVSS gồm Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope và các Impact Metrics (C/I/A); 'Report Confidence' không thuộc nhóm Base mà là khái niệm liên quan đến độ tin cậy nguồn tin trong các hệ thống chấm điểm rủi ro khác (như một số mô hình threat intelligence), không nằm trong khung CVSS chuẩn.",
      "en": "CVSS Base Metrics include Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, and Impact Metrics (C/I/A); 'Report Confidence' is not part of the Base group — it relates to source reliability in other risk-scoring or threat-intelligence contexts, not the standard CVSS framework.",
      "ja": "CVSSのBase MetricsにはAttack Vector、Attack Complexity、Privileges Required、User Interaction、Scope、および影響指標(C/I/A)が含まれる。「Report Confidence」はBaseグループに属さず、他のリスク評価や脅威インテリジェンスの文脈における情報源の信頼性に関する概念であり、標準的なCVSSフレームワークには含まれない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một pentester thực hiện kỹ thuật 'Privilege Escalation' sau khi đã có quyền truy cập ban đầu vào hệ thống. Mục tiêu của giai đoạn này trong chuỗi tấn công (kill chain) là gì?",
      "en": "A pentester performs 'Privilege Escalation' after gaining initial system access. What is the goal of this stage in the attack kill chain?",
      "ja": "ペネトレーションテスターがシステムへの初期アクセスを取得した後に「権限昇格(Privilege Escalation)」を実行する。攻撃のキルチェーンにおけるこの段階の目的は何か。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ log truy cập ngay lập tức để tránh bị phát hiện",
        "en": "Immediately delete all access logs to avoid detection",
        "ja": "検知を回避するためアクセスログを直ちに全て削除する"
      },
      {
        "vi": "Tăng mức quyền hạn hiện có (ví dụ từ user thường lên admin/root) để mở rộng khả năng truy cập, kiểm soát hệ thống sâu hơn và tiếp cận tài nguyên nhạy cảm hơn",
        "en": "Increase current privilege level (e.g. from a regular user to admin/root) to expand access, gain deeper system control, and reach more sensitive resources",
        "ja": "現在の権限レベルを引き上げ(例:一般ユーザーからadmin/rootへ)、アクセス範囲の拡大、より深いシステム制御、より機密性の高いリソースへの到達を可能にする"
      },
      {
        "vi": "Gửi báo cáo kết quả kiểm thử cuối cùng cho khách hàng",
        "en": "Send the final test report to the client",
        "ja": "最終的なテスト結果報告書を顧客へ送付する"
      },
      {
        "vi": "Cài đặt bản vá bảo mật mới nhất cho hệ điều hành mục tiêu",
        "en": "Install the latest security patch for the target operating system",
        "ja": "対象OSに最新のセキュリティパッチを適用する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Privilege Escalation là giai đoạn kẻ tấn công (hoặc pentester mô phỏng) khai thác lỗ hổng cấu hình/hệ điều hành để nâng quyền, từ đó chứng minh mức độ nghiêm trọng thực sự khi kẻ xấu có thể kiểm soát sâu hệ thống; xóa log là giai đoạn 'covering tracks' khác, báo cáo là giai đoạn kết thúc dự án, còn vá lỗi là hành động phòng thủ không thuộc vai trò tấn công.",
      "en": "Privilege Escalation is the stage where an attacker (or simulating pentester) exploits configuration/OS flaws to raise privileges, demonstrating the real severity of deeper system compromise; log deletion belongs to the 'covering tracks' stage, reporting is the project closure phase, and patching is a defensive action unrelated to the attacker role.",
      "ja": "権限昇格は、攻撃者(またはそれを模擬するペネトレーションテスター)が設定やOSの欠陥を悪用して権限を引き上げる段階であり、システムがより深く侵害された場合の実際の深刻度を示す。ログ削除は別の「痕跡消去」段階であり、報告書送付はプロジェクト終了フェーズ、パッチ適用は攻撃者の役割とは無関係な防御行動である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Test Analyst đang kiểm thử API REST và phát hiện endpoint `/api/users/{id}` cho phép bất kỳ người dùng đăng nhập nào truy vấn dữ liệu của user_id khác chỉ bằng cách đổi số ID trên URL. Đây là ví dụ điển hình của lỗ hổng nào?",
      "en": "A Test Analyst testing a REST API finds that the endpoint `/api/users/{id}` allows any logged-in user to query another user's data simply by changing the ID in the URL. This is a classic example of which vulnerability?",
      "ja": "テストアナリストがREST APIをテスト中、`/api/users/{id}`エンドポイントがログイン済みの任意のユーザーに対し、URL内のIDを変更するだけで他ユーザーのデータを取得できることを発見した。これは典型的にどの脆弱性の例か。"
    },
    "options": [
      {
        "vi": "SQL Injection — chèn câu lệnh SQL độc hại qua tham số đầu vào",
        "en": "SQL Injection — injecting malicious SQL statements through input parameters",
        "ja": "SQLインジェクション — 入力パラメータを通じた悪意あるSQL文の挿入"
      },
      {
        "vi": "Cross-Site Request Forgery (CSRF) — giả mạo yêu cầu từ một trang web khác",
        "en": "Cross-Site Request Forgery (CSRF) — forging requests from another website",
        "ja": "Cross-Site Request Forgery(CSRF)— 別のWebサイトからのリクエスト偽造"
      },
      {
        "vi": "Insecure Direct Object Reference (IDOR) — thiếu kiểm tra quyền sở hữu đối tượng khi truy cập trực tiếp bằng ID",
        "en": "Insecure Direct Object Reference (IDOR) — missing ownership check when directly accessing an object by ID",
        "ja": "Insecure Direct Object Reference(IDOR)— IDによる直接アクセス時にオブジェクトの所有権チェックが欠如している"
      },
      {
        "vi": "Clickjacking — lừa người dùng click vào phần tử ẩn trên trang web",
        "en": "Clickjacking — tricking users into clicking hidden page elements",
        "ja": "クリックジャッキング — ユーザーを騙して隠れたページ要素をクリックさせる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đây chính xác là IDOR: hệ thống dùng ID do người dùng kiểm soát để truy xuất đối tượng nhưng không kiểm tra xem người dùng hiện tại có quyền sở hữu/truy cập đối tượng đó hay không, thuộc nhóm Broken Access Control; không liên quan đến giả mạo request từ site khác (CSRF), chèn SQL, hay lừa click giao diện (Clickjacking).",
      "en": "This is precisely IDOR: the system uses a user-controlled ID to retrieve an object without verifying the current user's ownership/authorization for that object, falling under Broken Access Control; it is unrelated to cross-site request forgery, SQL injection, or UI-based click deception.",
      "ja": "これはまさにIDORである。システムはユーザーが制御可能なIDを用いてオブジェクトを取得するが、現在のユーザーがそのオブジェクトの所有権・アクセス権を持つかを検証していない。これはBroken Access Controlに分類され、CSRF、SQLインジェクション、クリックジャッキングとは無関係である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử bảo mật 'Black-box Penetration Testing', tester bắt đầu với thông tin gì về hệ thống mục tiêu?",
      "en": "In Black-box Penetration Testing, what information does the tester start with about the target system?",
      "ja": "ブラックボックス侵入テストにおいて、テスターは対象システムについてどのような情報から開始するか。"
    },
    "options": [
      {
        "vi": "Có đầy đủ mã nguồn, tài liệu kiến trúc và thông tin cấu hình nội bộ trước khi bắt đầu",
        "en": "Full source code, architecture documentation, and internal configuration details before starting",
        "ja": "開始前にソースコード全体、アーキテクチャ文書、内部設定情報の完全な提供を受ける"
      },
      {
        "vi": "Chỉ được cung cấp danh sách các đoạn mã nghi ngờ có lỗi từ đội phát triển",
        "en": "Only a list of code segments suspected of bugs, provided by the development team",
        "ja": "開発チームからバグの疑いがあるコード断片のリストのみ提供される"
      },
      {
        "vi": "Có tài khoản quản trị viên cấp cao được cấp sẵn để kiểm tra toàn bộ chức năng quản trị",
        "en": "A pre-granted high-level administrator account to test all administrative functions",
        "ja": "すべての管理機能をテストするため事前に高権限の管理者アカウントを付与される"
      },
      {
        "vi": "Gần như không có thông tin nội bộ, mô phỏng góc nhìn của kẻ tấn công bên ngoài, chỉ dựa vào thông tin công khai và những gì có thể khám phá được",
        "en": "Almost no internal information, simulating an external attacker's perspective, relying only on publicly available information and what can be discovered",
        "ja": "内部情報をほとんど持たず、外部攻撃者の視点を模擬し、公開情報と自ら発見できる情報のみに基づいて実施する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Black-box testing mô phỏng góc nhìn kẻ tấn công không có kiến thức nội bộ, phải tự trinh sát (reconnaissance) và khám phá hệ thống; điều này khác với White-box (có mã nguồn/tài liệu đầy đủ) và Grey-box (có một phần thông tin như tài khoản hạn chế); phương án về tài khoản admin cấp sẵn hay danh sách mã lỗi mâu thuẫn với bản chất 'không biết trước' của black-box.",
      "en": "Black-box testing simulates an attacker with no internal knowledge, requiring the tester to perform reconnaissance and discovery independently; this differs from White-box (full source/documentation access) and Grey-box (partial information, e.g. a limited account) testing; pre-granted admin accounts or a list of buggy code contradicts the 'no prior knowledge' nature of black-box testing.",
      "ja": "ブラックボックステストは内部知識を持たない攻撃者の視点を模擬し、テスターは自ら偵察と発見を行う必要がある。これはホワイトボックス(ソースコード・文書への完全アクセス)やグレーボックス(限定アカウントなど部分的情報)とは異なる。事前付与された管理者アカウントやバグコードリストは、ブラックボックスの「事前知識なし」という本質と矛盾する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Xét phát biểu: 'Việc quét lỗ hổng bằng công cụ tự động (như Nessus, OpenVAS) là đủ để coi hệ thống đã được kiểm thử bảo mật toàn diện.' Nhận định nào sau đây phản biện phát biểu này chính xác nhất?",
      "en": "Consider the statement: 'Automated vulnerability scanning (e.g. Nessus, OpenVAS) is sufficient to consider a system comprehensively security-tested.' Which rebuttal is most accurate?",
      "ja": "「Nessus、OpenVASなどの自動脆弱性スキャンで十分にシステムのセキュリティテストが網羅的に完了したと言える」という主張について、最も正確な反論はどれか。"
    },
    "options": [
      {
        "vi": "Sai, vì công cụ tự động chủ yếu phát hiện lỗ hổng đã biết theo signature/pattern, không phát hiện được lỗ hổng logic nghiệp vụ, lỗ hổng zero-day, hay các chuỗi khai thác kết hợp nhiều điểm yếu nhỏ — cần bổ sung kiểm thử thủ công và tư duy của con người",
        "en": "Incorrect, because automated tools mainly detect known vulnerabilities via signatures/patterns, missing business logic flaws, zero-day vulnerabilities, or exploit chains combining multiple minor weaknesses — manual testing and human analysis are needed to complement them",
        "ja": "誤りである。自動ツールは主にシグネチャ/パターンに基づく既知の脆弱性を検出するが、ビジネスロジックの欠陥、ゼロデイ脆弱性、複数の小さな弱点を組み合わせた攻撃連鎖は検出できない。手動テストと人間による分析での補完が必要である"
      },
      {
        "vi": "Phát biểu đúng hoàn toàn vì các công cụ này có cơ sở dữ liệu lỗ hổng luôn cập nhật đầy đủ mọi rủi ro",
        "en": "The statement is entirely correct because these tools have vulnerability databases that are always fully up to date with every risk",
        "ja": "これらのツールは常にすべてのリスクを網羅した脆弱性データベースを持つため、この主張は完全に正しい"
      },
      {
        "vi": "Sai, vì công cụ tự động chỉ hoạt động được trên hệ điều hành Linux, không hỗ trợ Windows",
        "en": "Incorrect, because automated tools only work on Linux and do not support Windows",
        "ja": "誤りである。自動ツールはLinux上でのみ動作しWindowsをサポートしないため"
      },
      {
        "vi": "Đúng, miễn là công cụ được chạy với quyền root/administrator trên máy quét",
        "en": "Correct, as long as the tool runs with root/administrator privileges on the scanning machine",
        "ja": "スキャンを行うマシン上でroot/管理者権限で実行される限り正しい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Công cụ quét tự động rất hữu ích để phát hiện nhanh các lỗ hổng đã biết (CVE có signature) nhưng có giới hạn: không hiểu ngữ cảnh nghiệp vụ nên bỏ sót business logic flaws (ví dụ bỏ qua bước thanh toán), không phát hiện zero-day, và khó nhận ra chuỗi khai thác kết hợp nhiều lỗ hổng nhỏ; do đó kiểm thử bảo mật toàn diện luôn cần kết hợp thủ công và tư duy phân tích của con người (ISTQB nhấn mạnh vai trò của test analyst có kỹ năng bảo mật).",
      "en": "Automated scanners are valuable for quickly finding known signature-based vulnerabilities but have limits: they lack business context so miss business logic flaws (e.g. bypassing a payment step), cannot detect zero-days, and struggle to identify exploit chains combining minor weaknesses; comprehensive security testing therefore always requires manual testing and human analytical thinking (ISTQB emphasizes the role of security-skilled test analysts).",
      "ja": "自動スキャンツールは既知のシグネチャベースの脆弱性を素早く検出するのに有用だが限界がある。ビジネス上の文脈を理解できないためビジネスロジックの欠陥(例:決済ステップの回避)を見逃し、ゼロデイ脆弱性を検出できず、複数の小さな弱点を組み合わせた攻撃連鎖の特定も困難である。したがって網羅的なセキュリティテストには常に手動テストと人間による分析的思考の組み合わせが必要である(ISTQBはセキュリティスキルを持つテストアナリストの役割を重視している)。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quá trình đánh giá lỗ hổng 'Insecure Deserialization' (giải chuỗi hóa không an toàn), rủi ro nghiêm trọng nhất mà kẻ tấn công có thể khai thác là gì?",
      "en": "When assessing 'Insecure Deserialization' vulnerabilities, what is the most severe risk an attacker could exploit?",
      "ja": "「安全でないデシリアライゼーション(Insecure Deserialization)」の脆弱性を評価する際、攻撃者が悪用しうる最も深刻なリスクは何か。"
    },
    "options": [
      {
        "vi": "Làm chậm tốc độ tải trang do dữ liệu JSON quá lớn",
        "en": "Slower page load speed due to overly large JSON data",
        "ja": "JSONデータが大きすぎることによるページ読み込み速度の低下"
      },
      {
        "vi": "Kẻ tấn công có thể chèn đối tượng độc hại vào luồng dữ liệu tuần tự hóa, khi được giải chuỗi hóa phía server có thể dẫn tới thực thi mã tùy ý (Remote Code Execution) hoặc leo thang đặc quyền",
        "en": "An attacker can inject a malicious serialized object that, when deserialized server-side, may lead to arbitrary code execution (Remote Code Execution) or privilege escalation",
        "ja": "攻撃者が悪意あるシリアライズオブジェクトを注入し、サーバー側でデシリアライズされる際に任意コード実行(リモートコード実行)や権限昇格を引き起こす可能性がある"
      },
      {
        "vi": "Gây lỗi định dạng ngày tháng hiển thị sai múi giờ",
        "en": "Causes date formatting errors displaying the wrong timezone",
        "ja": "日付フォーマットのエラーにより誤ったタイムゾーンが表示される"
      },
      {
        "vi": "Làm tăng kích thước cookie phiên đăng nhập vượt giới hạn trình duyệt",
        "en": "Increases the session cookie size beyond the browser limit",
        "ja": "セッションクッキーのサイズがブラウザの上限を超えて増大する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Insecure Deserialization là lỗ hổng nghiêm trọng vì dữ liệu tuần tự hóa (serialized) có thể chứa mã hoặc đối tượng độc hại được server tin tưởng và thực thi khi giải chuỗi hóa, dẫn tới RCE, DoS hoặc bypass logic xác thực — đây là rủi ro về tính toàn vẹn và bảo mật hệ thống, không phải vấn đề hiệu năng hiển thị hay định dạng.",
      "en": "Insecure Deserialization is severe because serialized data can carry malicious objects/code that the server trusts and executes upon deserialization, leading to RCE, DoS, or authentication logic bypass — a genuine system integrity and security risk, not a display or performance formatting issue.",
      "ja": "安全でないデシリアライゼーションが深刻な理由は、シリアライズされたデータに悪意あるオブジェクト/コードが含まれ、サーバーがそれを信頼してデシリアライズ時に実行してしまい、リモートコード実行、DoS、認証ロジックの回避につながりうるためである。これは表示や性能の問題ではなく、システムの完全性とセキュリティに関わる本質的なリスクである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thực hiện 'Fuzz Testing' (kiểm thử mờ) như một kỹ thuật kiểm thử bảo mật, mục tiêu chính là gì?",
      "en": "When performing Fuzz Testing as a security testing technique, what is the primary goal?",
      "ja": "セキュリティテスト手法としてファジングテスト(Fuzz Testing)を実施する際、主な目的は何か。"
    },
    "options": [
      {
        "vi": "Xác nhận rằng giao diện người dùng hiển thị đúng trên các độ phân giải màn hình khác nhau",
        "en": "Verify that the UI displays correctly across different screen resolutions",
        "ja": "異なる画面解像度でUIが正しく表示されることを確認すること"
      },
      {
        "vi": "Đo thời gian phản hồi trung bình của hệ thống dưới tải bình thường",
        "en": "Measure the average system response time under normal load",
        "ja": "通常負荷時のシステムの平均応答時間を測定すること"
      },
      {
        "vi": "Cung cấp một lượng lớn dữ liệu đầu vào ngẫu nhiên, dị dạng hoặc bất thường vào hệ thống để phát hiện lỗi xử lý ngoại lệ, crash, hoặc hành vi không mong muốn có thể bị khai thác",
        "en": "Feed the system a large volume of random, malformed, or unexpected input to uncover exception-handling flaws, crashes, or unintended behavior that could be exploited",
        "ja": "大量のランダムで不正または予期しない入力をシステムに与え、例外処理の欠陥、クラッシュ、悪用可能な予期しない挙動を発見すること"
      },
      {
        "vi": "So sánh tốc độ tải trang giữa các phiên bản trình duyệt khác nhau",
        "en": "Compare page load speed across different browser versions",
        "ja": "異なるブラウザバージョン間でのページ読み込み速度を比較すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Fuzz Testing gửi hàng loạt input ngẫu nhiên, biến dạng hoặc biên (oversized, ký tự đặc biệt, dữ liệu nhị phân bất thường...) nhằm phát hiện các lỗi xử lý không mong muốn như buffer overflow, crash, hoặc hành vi bất định có thể trở thành lỗ hổng khai thác được — hoàn toàn khác với đo hiệu năng tải trang hay kiểm thử responsive UI.",
      "en": "Fuzz Testing sends massive volumes of random, malformed, or boundary input (oversized data, special characters, unusual binary payloads) to uncover unexpected processing errors such as buffer overflows, crashes, or undefined behavior that could become exploitable vulnerabilities — entirely different from load performance measurement or responsive UI testing.",
      "ja": "ファジングテストは、大量のランダム、不正、または境界値の入力(過大なデータ、特殊文字、異常なバイナリペイロードなど)を送信し、バッファオーバーフロー、クラッシュ、未定義の挙動など悪用可能な脆弱性となりうる予期しない処理エラーを発見する。これは負荷性能測定やレスポンシブUIテストとは全く異なるものである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một tổ chức muốn tuân thủ tiêu chuẩn PCI DSS cho hệ thống xử lý thẻ thanh toán. Yêu cầu nào sau đây liên quan trực tiếp đến kiểm thử bảo mật định kỳ?",
      "en": "An organization wants to comply with PCI DSS for its card payment processing system. Which requirement directly relates to periodic security testing?",
      "ja": "カード決済処理システムでPCI DSS準拠を目指す組織がある。定期的なセキュリティテストに直接関連する要件はどれか。"
    },
    "options": [
      {
        "vi": "Tăng tốc độ đường truyền mạng để giảm độ trễ giao dịch thẻ",
        "en": "Increase network bandwidth to reduce card transaction latency",
        "ja": "カード取引の遅延を減らすためネットワーク帯域を増強する"
      },
      {
        "vi": "Thay đổi logo công ty mỗi năm một lần để tránh bị nhận diện bởi tin tặc",
        "en": "Change the company logo once a year to avoid recognition by hackers",
        "ja": "ハッカーに識別されないよう毎年会社ロゴを変更する"
      },
      {
        "vi": "Giảm số lượng nhân viên IT xuống mức tối thiểu để giảm bề mặt tấn công nội bộ",
        "en": "Reduce IT staff to a minimum to lower the internal attack surface",
        "ja": "内部の攻撃対象領域を減らすためIT人員を最小限に削減する"
      },
      {
        "vi": "Thực hiện kiểm thử thâm nhập và quét lỗ hổng định kỳ (ít nhất hằng năm và sau mỗi thay đổi hạ tầng đáng kể) để xác minh hiệu quả các biện pháp kiểm soát bảo mật",
        "en": "Perform periodic penetration testing and vulnerability scanning (at least annually and after significant infrastructure changes) to verify the effectiveness of security controls",
        "ja": "セキュリティ管理策の有効性を検証するため、定期的な侵入テストと脆弱性スキャンを(少なくとも年1回、および重大なインフラ変更後に)実施する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "PCI DSS (Requirement 11) yêu cầu kiểm thử bảo mật định kỳ gồm quét lỗ hổng và penetration testing (network-layer và application-layer) tối thiểu hằng năm hoặc sau thay đổi hạ tầng lớn, nhằm xác minh các biện pháp kiểm soát vẫn hiệu quả trước các mối đe dọa mới; các phương án còn lại không liên quan đến yêu cầu tuân thủ bảo mật của chuẩn này.",
      "en": "PCI DSS (Requirement 11) mandates periodic security testing including vulnerability scanning and penetration testing (network-layer and application-layer) at least annually or after major infrastructure changes, to verify controls remain effective against emerging threats; the other options are unrelated to this standard's compliance requirements.",
      "ja": "PCI DSS(要件11)は、新たな脅威に対して管理策が引き続き有効であることを検証するため、脆弱性スキャンと侵入テスト(ネットワーク層およびアプリケーション層)を含む定期的なセキュリティテストを、少なくとも年1回または重大なインフラ変更後に実施することを義務付けている。他の選択肢はこの規格のコンプライアンス要件とは無関係である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử bảo mật cho cơ chế xác thực (authentication), kỹ thuật 'Session Fixation' hoạt động dựa trên nguyên tắc nào?",
      "en": "When security-testing an authentication mechanism, on what principle does the 'Session Fixation' attack technique operate?",
      "ja": "認証メカニズムのセキュリティテストにおいて、「セッション固定化(Session Fixation)」攻撃はどのような原理で動作するか。"
    },
    "options": [
      {
        "vi": "Kẻ tấn công thiết lập trước một session ID cho nạn nhân (ví dụ qua liên kết), sau đó khi nạn nhân đăng nhập thành công mà server không cấp session ID mới, kẻ tấn công dùng session ID đã biết đó để chiếm quyền phiên đăng nhập",
        "en": "The attacker pre-establishes a session ID for the victim (e.g. via a link); when the victim logs in successfully and the server fails to issue a new session ID, the attacker uses the known session ID to hijack the authenticated session",
        "ja": "攻撃者があらかじめ被害者のセッションIDを設定し(例:リンク経由)、被害者がログインに成功してもサーバーが新しいセッションIDを発行しない場合、攻撃者はその既知のセッションIDを使って認証済みセッションを乗っ取る"
      },
      {
        "vi": "Kẻ tấn công đoán mật khẩu người dùng bằng phương pháp brute-force",
        "en": "The attacker guesses the user's password using brute-force methods",
        "ja": "攻撃者がブルートフォース手法でユーザーのパスワードを推測する"
      },
      {
        "vi": "Kẻ tấn công chèn mã JavaScript vào trường bình luận để đánh cắp cookie",
        "en": "The attacker injects JavaScript into a comment field to steal cookies",
        "ja": "攻撃者がコメント欄にJavaScriptを注入しクッキーを窃取する"
      },
      {
        "vi": "Kẻ tấn công gửi hàng loạt request để làm quá tải server đăng nhập",
        "en": "The attacker floods the login server with a massive number of requests",
        "ja": "攻撃者がログインサーバーに大量のリクエストを送りつけ過負荷にする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Session Fixation khai thác việc server KHÔNG tái tạo (regenerate) session ID sau khi xác thực thành công: kẻ tấn công ép nạn nhân dùng một session ID đã biết trước, rồi khi nạn nhân đăng nhập, session đó trở nên hợp lệ và kẻ tấn công có thể dùng chính ID đó để truy cập trái phép; đây khác với brute-force mật khẩu, XSS đánh cắp cookie, hay tấn công từ chối dịch vụ.",
      "en": "Session Fixation exploits a server's failure to regenerate the session ID after successful authentication: the attacker forces the victim to use a pre-known session ID, and once the victim logs in, that session becomes authenticated, allowing the attacker to reuse the same ID for unauthorized access; this differs from password brute-forcing, cookie-stealing XSS, or denial-of-service flooding.",
      "ja": "セッション固定化は、認証成功後にサーバーがセッションIDを再生成しないことを悪用する攻撃である。攻撃者は被害者に既知のセッションIDを使わせ、被害者がログインするとそのセッションが認証済みとなり、攻撃者は同じIDを再利用して不正アクセスできる。これはパスワードのブルートフォース、クッキーを狙うXSS、サービス拒否攻撃とは異なる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Xét tình huống: ứng dụng ngân hàng cho phép người dùng chuyển tiền qua form không có token CSRF, và trạng thái đăng nhập được duy trì bằng cookie session mặc định gửi kèm mọi request cùng domain. Đây là điều kiện thuận lợi cho cuộc tấn công nào?",
      "en": "Scenario: a banking app allows fund transfers via a form lacking a CSRF token, and login state is maintained by a session cookie automatically sent with every same-domain request. This is a favorable condition for which attack?",
      "ja": "ある銀行アプリが、CSRFトークンのないフォームで送金を許可しており、ログイン状態は同一ドメインへの全リクエストに自動的に付与されるセッションクッキーによって維持されている。これはどの攻撃にとって有利な条件か。"
    },
    "options": [
      {
        "vi": "Tấn công DNS Cache Poisoning làm sai lệch bản ghi phân giải tên miền",
        "en": "DNS Cache Poisoning attack corrupting domain name resolution records",
        "ja": "DNSキャッシュポイズニング攻撃によりドメイン名解決レコードが改ざんされる"
      },
      {
        "vi": "Tấn công Cross-Site Request Forgery (CSRF), trong đó trang độc hại lừa trình duyệt nạn nhân (đã đăng nhập) gửi yêu cầu chuyển tiền mà nạn nhân không hề hay biết",
        "en": "Cross-Site Request Forgery (CSRF), where a malicious page tricks the victim's (logged-in) browser into submitting a transfer request without the victim's knowledge",
        "ja": "Cross-Site Request Forgery(CSRF)攻撃。悪意あるページが(ログイン済みの)被害者のブラウザを騙し、被害者の知らぬ間に送金リクエストを送信させる"
      },
      {
        "vi": "Tấn công Buffer Overflow trên bộ nhớ máy chủ ứng dụng",
        "en": "Buffer Overflow attack on the application server's memory",
        "ja": "アプリケーションサーバーのメモリに対するバッファオーバーフロー攻撃"
      },
      {
        "vi": "Tấn công ARP Spoofing trong mạng nội bộ của ngân hàng",
        "en": "ARP Spoofing attack within the bank's internal network",
        "ja": "銀行の内部ネットワークにおけるARPスプーフィング攻撃"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thiếu token CSRF kết hợp với cookie session tự động gửi kèm mọi request là điều kiện kinh điển cho CSRF: kẻ tấn công có thể tạo trang/form ẩn kích hoạt request chuyển tiền tới ngân hàng, trình duyệt nạn nhân tự động đính kèm cookie hợp lệ khiến server tin đây là yêu cầu chính chủ; các phương án còn lại là tấn công ở tầng mạng/bộ nhớ không liên quan đến kịch bản thiếu CSRF token này.",
      "en": "Missing CSRF tokens combined with session cookies auto-attached to every request is the textbook condition for CSRF: an attacker can craft a hidden page/form triggering a transfer request to the bank, and the victim's browser automatically attaches the valid cookie, making the server believe it's a legitimate request; the other options are network/memory-layer attacks unrelated to this missing-CSRF-token scenario.",
      "ja": "CSRFトークンの欠如と、全リクエストに自動付与されるセッションクッキーの組み合わせは、CSRFの典型的な条件である。攻撃者は隠しページ/フォームを作成して銀行への送金リクエストを発生させ、被害者のブラウザが有効なクッキーを自動的に付与することでサーバーは正規のリクエストだと誤認する。他の選択肢はネットワーク層/メモリ層の攻撃であり、このCSRFトークン欠如のシナリオとは無関係である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi viết test case cho lỗ hổng 'Security Misconfiguration' liên quan đến máy chủ web, hạng mục nào sau đây KHÔNG thuộc phạm vi kiểm tra này?",
      "en": "When writing test cases for 'Security Misconfiguration' related to a web server, which item is NOT within scope of this check?",
      "ja": "Webサーバーに関する「セキュリティ設定ミス(Security Misconfiguration)」のテストケースを作成する際、この検証範囲に含まれない項目はどれか。"
    },
    "options": [
      {
        "vi": "Kiểm tra các thư mục/tài khoản mặc định (default admin console, sample apps) chưa được vô hiệu hóa hoặc đổi mật khẩu",
        "en": "Checking for default directories/accounts (default admin console, sample apps) that have not been disabled or had passwords changed",
        "ja": "無効化またはパスワード変更されていないデフォルトのディレクトリ/アカウント(デフォルト管理コンソール、サンプルアプリ)の確認"
      },
      {
        "vi": "Kiểm tra các HTTP header bảo mật thiếu (như X-Frame-Options, Content-Security-Policy) hoặc dịch vụ không cần thiết vẫn đang chạy",
        "en": "Checking for missing security HTTP headers (like X-Frame-Options, Content-Security-Policy) or unnecessary services still running",
        "ja": "不足しているセキュリティHTTPヘッダー(X-Frame-Options、Content-Security-Policyなど)や不要なサービスが稼働していないかの確認"
      },
      {
        "vi": "Đo lường mức độ hài lòng của người dùng cuối về giao diện qua khảo sát UX",
        "en": "Measuring end-user satisfaction with the UI through UX surveys",
        "ja": "UX調査によるUIに対するエンドユーザーの満足度の測定"
      },
      {
        "vi": "Kiểm tra thông báo lỗi có tiết lộ thông tin phiên bản phần mềm/framework hay không",
        "en": "Checking whether error messages disclose software/framework version information",
        "ja": "エラーメッセージがソフトウェア/フレームワークのバージョン情報を漏らしていないかの確認"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Security Misconfiguration bao gồm tài khoản/thư mục mặc định chưa khóa, thiếu header bảo mật, dịch vụ thừa đang chạy, thông báo lỗi lộ thông tin hệ thống — tất cả đều là các điểm kiểm tra kỹ thuật cụ thể; khảo sát mức độ hài lòng UX là hoạt động thuộc usability testing, hoàn toàn không liên quan đến kiểm thử bảo mật.",
      "en": "Security Misconfiguration covers unlocked default accounts/directories, missing security headers, unnecessary running services, and error messages disclosing system info — all concrete technical checkpoints; UX satisfaction surveys belong to usability testing and are entirely unrelated to security testing.",
      "ja": "セキュリティ設定ミスには、ロックされていないデフォルトアカウント/ディレクトリ、不足しているセキュリティヘッダー、不要な稼働サービス、システム情報を漏らすエラーメッセージなどが含まれ、いずれも具体的な技術的検証項目である。UX満足度調査はユーザビリティテストに属し、セキュリティテストとは全く無関係である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Xét về nguyên tắc đạo đức trong kiểm thử thâm nhập, khái niệm 'Minimizing Impact' (giảm thiểu tác động) đòi hỏi pentester phải làm gì trong quá trình khai thác lỗ hổng?",
      "en": "Regarding ethical principles in penetration testing, what does 'Minimizing Impact' require a pentester to do while exploiting a vulnerability?",
      "ja": "侵入テストにおける倫理原則に関して、「影響の最小化(Minimizing Impact)」はペネトレーションテスターに脆弱性悪用時にどのような行動を求めるか。"
    },
    "options": [
      {
        "vi": "Công khai chi tiết lỗ hổng lên mạng xã hội ngay sau khi phát hiện để cảnh báo cộng đồng",
        "en": "Publicly disclose vulnerability details on social media immediately upon discovery to warn the community",
        "ja": "発見後直ちに脆弱性の詳細をSNSで公開しコミュニティに警告する"
      },
      {
        "vi": "Khai thác triệt để mọi lỗ hổng tìm được đến mức tối đa để chứng minh năng lực chuyên môn",
        "en": "Fully exploit every discovered vulnerability to the maximum extent to demonstrate technical prowess",
        "ja": "技術力を証明するため発見したすべての脆弱性を最大限まで悪用する"
      },
      {
        "vi": "Xóa dữ liệu thử nghiệm sau khi hoàn tất để không ai biết đã có kiểm thử xảy ra",
        "en": "Delete all test data afterward so that no one knows testing ever occurred",
        "ja": "テストが行われたことを誰にも知られないよう、事後にすべてのテストデータを削除する"
      },
      {
        "vi": "Khai thác lỗ hổng ở mức độ vừa đủ để chứng minh khả năng tồn tại và tác động (proof of concept), tránh gây gián đoạn dịch vụ, mất dữ liệu hoặc phá hủy hệ thống không cần thiết",
        "en": "Exploit the vulnerability just enough to demonstrate its existence and impact (proof of concept), avoiding unnecessary service disruption, data loss, or system destruction",
        "ja": "脆弱性の存在と影響を証明するのに必要な最小限の悪用(概念実証)にとどめ、不必要なサービス中断・データ損失・システム破壊を避ける"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nguyên tắc Minimizing Impact yêu cầu pentester chỉ khai thác đủ để chứng minh (proof of concept) rằng lỗ hổng có thật và có tác động, tránh làm quá tay gây sập hệ thống, mất dữ liệu thật hay ảnh hưởng người dùng thật; khai thác tối đa, xóa dấu vết để giấu hoạt động, hay công khai lỗ hổng trước khi khách hàng vá đều vi phạm đạo đức nghề nghiệp và Rules of Engagement.",
      "en": "The Minimizing Impact principle requires a pentester to exploit only enough for proof of concept, demonstrating the vulnerability's reality and impact without crashing systems, losing real data, or affecting real users; fully exploiting, hiding traces, or publicly disclosing before the client patches all violate professional ethics and the Rules of Engagement.",
      "ja": "影響の最小化の原則は、テスターがシステムのクラッシュ、実データの損失、実ユーザーへの影響を招くことなく、脆弱性の実在性と影響を証明するための最小限の概念実証にとどめることを求める。最大限の悪用、活動を隠すための痕跡消去、顧客のパッチ適用前の脆弱性公開はいずれも職業倫理およびRules of Engagementに違反する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong phân loại lỗ hổng, 'Business Logic Vulnerability' (lỗ hổng logic nghiệp vụ) khác biệt như thế nào so với lỗ hổng kỹ thuật thông thường (như SQL Injection)?",
      "en": "In vulnerability classification, how does a 'Business Logic Vulnerability' differ from a typical technical vulnerability (like SQL Injection)?",
      "ja": "脆弱性分類において、「ビジネスロジック脆弱性」は一般的な技術的脆弱性(SQLインジェクションなど)とどう異なるか。"
    },
    "options": [
      {
        "vi": "Business Logic Vulnerability lạm dụng quy trình nghiệp vụ hợp lệ theo cách nhà phát triển không lường trước (ví dụ: áp mã giảm giá nhiều lần, đặt hàng số lượng âm), thường không bị công cụ quét tự động phát hiện vì luồng xử lý về mặt kỹ thuật vẫn 'đúng cú pháp'",
        "en": "Business Logic Vulnerabilities abuse legitimate business workflows in ways developers didn't anticipate (e.g. applying a discount code multiple times, ordering a negative quantity), and are often missed by automated scanners because the technical flow is syntactically 'valid'",
        "ja": "ビジネスロジック脆弱性は、開発者が想定していなかった方法で正規のビジネスワークフローを悪用する(例:割引コードの複数回適用、負の数量での注文)。技術的な処理フローは構文上「正しい」ため、自動スキャナーでは見逃されることが多い"
      },
      {
        "vi": "Business Logic Vulnerability luôn có mã CVE công khai giống các lỗ hổng kỹ thuật khác",
        "en": "Business Logic Vulnerabilities always have a public CVE ID like other technical vulnerabilities",
        "ja": "ビジネスロジック脆弱性は他の技術的脆弱性と同様に常に公開のCVE IDを持つ"
      },
      {
        "vi": "Business Logic Vulnerability chỉ xảy ra trên ứng dụng desktop, không xảy ra trên web hoặc API",
        "en": "Business Logic Vulnerabilities only occur in desktop applications, never on web or API",
        "ja": "ビジネスロジック脆弱性はデスクトップアプリでのみ発生し、Webやモバイルアプリでは発生しない"
      },
      {
        "vi": "Business Logic Vulnerability luôn yêu cầu quyền truy cập vật lý vào máy chủ để khai thác",
        "en": "Business Logic Vulnerabilities always require physical access to the server to be exploited",
        "ja": "ビジネスロジック脆弱性は悪用に常にサーバーへの物理的アクセスを必要とする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Lỗ hổng logic nghiệp vụ không phải lỗi kỹ thuật (như injection hay memory corruption) mà là lạm dụng quy trình hợp lệ theo cách không được thiết kế lường trước (ví dụ: request/response về mặt kỹ thuật đều hợp lệ nhưng gây hậu quả tài chính); vì input vẫn 'sạch' về cú pháp nên công cụ quét signature-based không phát hiện được, đòi hỏi tư duy phân tích của con người — đây là lý do ISTQB Advanced nhấn mạnh kỹ năng phân tích của Test Analyst trong bảo mật.",
      "en": "A business logic vulnerability is not a technical flaw (like injection or memory corruption) but the abuse of a legitimate workflow in an unanticipated way (e.g. syntactically valid requests/responses causing financial harm); since the input remains syntactically 'clean', signature-based scanners cannot detect it, requiring human analytical thinking — this is why ISTQB Advanced emphasizes the Test Analyst's analytical skill in security testing.",
      "ja": "ビジネスロジック脆弱性は(インジェクションやメモリ破損のような)技術的な欠陥ではなく、想定されていなかった方法で正規のワークフローを悪用するものである(例:リクエスト/レスポンスは技術的には有効だが金銭的損害を引き起こす)。入力が構文上「クリーン」なままであるため、シグネチャベースのスキャナーでは検出できず、人間による分析的思考が必要となる。これがISTQB Advancedがセキュリティにおけるテストアナリストの分析スキルを重視する理由である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Manager cần báo cáo kết quả kiểm thử bảo mật cho ban lãnh đạo không có nền tảng kỹ thuật sâu. Cách trình bày nào phù hợp nhất theo thông lệ ISTQB Advanced về giao tiếp rủi ro?",
      "en": "A Test Manager needs to report security testing results to leadership without deep technical background. Which presentation approach best fits ISTQB Advanced risk-communication practice?",
      "ja": "テストマネージャーが、深い技術的背景を持たない経営陣にセキュリティテスト結果を報告する必要がある。ISTQB Advancedのリスクコミュニケーションの慣行に最も適した提示方法はどれか。"
    },
    "options": [
      {
        "vi": "Trình bày nguyên văn log kỹ thuật chi tiết và mã payload khai thác để đảm bảo tính minh bạch tuyệt đối",
        "en": "Present raw detailed technical logs and exploit payload code verbatim to ensure absolute transparency",
        "ja": "完全な透明性を確保するため、詳細な技術ログと悪用ペイロードのコードをそのまま提示する"
      },
      {
        "vi": "Tóm tắt lỗ hổng theo mức độ rủi ro kinh doanh (tác động tài chính, uy tín, pháp lý), kèm mức độ nghiêm trọng kỹ thuật, khuyến nghị ưu tiên khắc phục và biểu đồ trực quan dễ hiểu",
        "en": "Summarize vulnerabilities by business risk level (financial, reputational, legal impact), paired with technical severity, remediation priority recommendations, and easy-to-understand visual charts",
        "ja": "脆弱性をビジネスリスクレベル(財務・評判・法的影響)で要約し、技術的深刻度、修正優先順位の推奨、分かりやすい視覚的チャートを添えて提示する"
      },
      {
        "vi": "Không báo cáo gì cho ban lãnh đạo vì họ không hiểu kỹ thuật, chỉ gửi cho đội phát triển",
        "en": "Do not report anything to leadership since they won't understand the technical details; only send it to the development team",
        "ja": "経営陣は技術を理解できないため何も報告せず、開発チームにのみ送付する"
      },
      {
        "vi": "Chỉ báo cáo tổng số lỗ hổng tìm thấy mà không phân loại mức độ nghiêm trọng hay tác động",
        "en": "Only report the total number of vulnerabilities found, without categorizing severity or impact",
        "ja": "深刻度や影響を分類せず、発見した脆弱性の総数のみを報告する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ISTQB Advanced (Test Manager) nhấn mạnh việc chuyển hóa kết quả kỹ thuật thành ngôn ngữ rủi ro kinh doanh cho các bên liên quan không chuyên kỹ thuật: mức độ nghiêm trọng, tác động tài chính/uy tín/pháp lý, và khuyến nghị ưu tiên giúp lãnh đạo ra quyết định đầu tư khắc phục đúng đắn; log kỹ thuật thô, im lặng không báo cáo, hay chỉ đưa con số tổng không phân loại đều không đáp ứng nhu cầu ra quyết định của lãnh đạo.",
      "en": "ISTQB Advanced (Test Manager) emphasizes translating technical results into business-risk language for non-technical stakeholders: severity, financial/reputational/legal impact, and prioritized recommendations enable leadership to make sound remediation investment decisions; raw technical logs, silence, or an uncategorized total count all fail to meet leadership's decision-making needs.",
      "ja": "ISTQB Advanced(テストマネージャー)は、技術的な結果を非技術系ステークホルダー向けにビジネスリスクの言葉へ変換することを重視する。深刻度、財務・評判・法的影響、優先順位付けされた推奨事項により、経営陣は適切な修正投資の意思決定を行える。生の技術ログ、報告の省略、分類なしの総数のみの提示はいずれも経営陣の意思決定ニーズを満たさない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kỹ thuật kiểm thử bảo mật cho cơ chế xác thực đa yếu tố (MFA), tình huống nào sau đây thể hiện một điểm yếu thiết kế nghiêm trọng cần được kiểm thử kỹ?",
      "en": "In security testing multi-factor authentication (MFA), which scenario represents a serious design weakness that must be thoroughly tested?",
      "ja": "多要素認証(MFA)のセキュリティテストにおいて、入念にテストすべき重大な設計上の弱点を示すシナリオはどれか。"
    },
    "options": [
      {
        "vi": "Hệ thống cho phép người dùng chọn giữa mã OTP qua SMS hoặc ứng dụng authenticator",
        "en": "The system allows users to choose between SMS OTP or an authenticator app",
        "ja": "システムがユーザーにSMS OTPまたは認証アプリアプリのいずれかを選択させる"
      },
      {
        "vi": "Mã OTP có hiệu lực trong 5 phút trước khi hết hạn",
        "en": "The OTP code is valid for 5 minutes before expiring",
        "ja": "OTPコードが失効前5分間有効である"
      },
      {
        "vi": "Sau khi nhập sai mật khẩu bước 1, hệ thống vẫn cho phép người dùng bỏ qua bước xác thực yếu tố thứ hai (MFA) bằng cách chỉnh sửa trực tiếp tham số ẩn trong request (ví dụ `mfa_verified=true`)",
        "en": "After entering the wrong password at step 1, the system still allows the user to bypass the second-factor (MFA) verification by directly modifying a hidden request parameter (e.g. `mfa_verified=true`)",
        "ja": "ステップ1でパスワードを誤入力した後でも、隠しリクエストパラメータ(例:`mfa_verified=true`)を直接改変することで第2要素(MFA)の検証を回避できてしまう"
      },
      {
        "vi": "Hệ thống gửi email thông báo mỗi khi có đăng nhập từ thiết bị lạ",
        "en": "The system sends an email notification whenever a login occurs from an unfamiliar device",
        "ja": "未知のデバイスからログインがあるたびにシステムがメール通知を送信する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đây là lỗ hổng nghiêm trọng vì logic xác thực dựa vào tham số client-side có thể bị người dùng thao túng (client-controlled trust) để bỏ qua hoàn toàn bước MFA, biến cơ chế bảo mật đa lớp thành vô nghĩa; các phương án còn lại (tùy chọn phương thức OTP, thời gian hết hạn hợp lý, thông báo đăng nhập lạ) đều là các đặc điểm thiết kế lành mạnh, không phải điểm yếu.",
      "en": "This is a critical flaw because the authentication logic trusts a client-controllable parameter to bypass MFA entirely, rendering the multi-layer security mechanism meaningless; the other options (choice of OTP method, reasonable expiry, unfamiliar-device notifications) are healthy design features, not weaknesses.",
      "ja": "これは重大な欠陥である。認証ロジックがクライアント側で操作可能なパラメータを信頼してMFAを完全に回避できてしまうため、多層防御のセキュリティ機構が無意味になる。他の選択肢(OTP方式の選択、妥当な有効期限、未知デバイスの通知)はいずれも健全な設計上の特徴であり弱点ではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi kiểm thử API cho lỗ hổng 'Mass Assignment' (gán hàng loạt thuộc tính), điều gì Test Analyst cần đặc biệt chú ý?",
      "en": "When testing an API for 'Mass Assignment' vulnerabilities, what should a Test Analyst pay special attention to?",
      "ja": "APIの「マスアサインメント(Mass Assignment)」脆弱性をテストする際、テストアナリストが特に注意すべき点は何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra API có hỗ trợ định dạng phản hồi XML ngoài JSON hay không",
        "en": "Check whether the API supports XML response format in addition to JSON",
        "ja": "APIがJSON以外にXMLレスポンス形式もサポートしているかを確認する"
      },
      {
        "vi": "Kiểm tra thời gian phản hồi trung bình của API khi có 1000 request đồng thời",
        "en": "Check the API's average response time under 1000 concurrent requests",
        "ja": "1000件の同時リクエスト下でのAPIの平均応答時間を確認する"
      },
      {
        "vi": "Kiểm tra font chữ hiển thị trong tài liệu API Swagger có đúng chuẩn thiết kế hay không",
        "en": "Check whether the font displayed in the Swagger API documentation matches the design standard",
        "ja": "Swagger API文書内で表示されるフォントがデザイン基準に合致しているかを確認する"
      },
      {
        "vi": "Kiểm tra xem client có thể gửi thêm các trường không được phép trong body request (ví dụ `\"role\": \"admin\"` hoặc `\"isVerified\": true`) và server có vô tình gán giá trị đó vào đối tượng nội bộ hay không, thay vì chỉ nhận các trường được whitelist",
        "en": "Check whether the client can inject extra unauthorized fields in the request body (e.g. `\"role\": \"admin\"` or `\"isVerified\": true`) and whether the server inadvertently binds those values to the internal object, instead of only accepting whitelisted fields",
        "ja": "クライアントがリクエストボディに許可されていない追加フィールド(例:`\"role\": \"admin\"`や`\"isVerified\": true`)を注入でき、サーバーがホワイトリストされたフィールドのみを受け付けるのではなく、それらの値を誤って内部オブジェクトに結合してしまわないかを確認する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mass Assignment xảy ra khi framework tự động ánh xạ toàn bộ trường trong request body vào model/entity mà không giới hạn whitelist, cho phép kẻ tấn công gửi thêm trường nhạy cảm (như role, isAdmin, price) để thao túng dữ liệu vượt quyền; đây là lỗ hổng logic gán dữ liệu, không liên quan đến hiệu năng, giao diện tài liệu hay định dạng phản hồi.",
      "en": "Mass Assignment occurs when a framework automatically binds every field in the request body to a model/entity without a whitelist restriction, letting attackers inject sensitive fields (like role, isAdmin, price) to manipulate data beyond their privilege; this is a data-binding logic flaw, unrelated to performance, documentation UI, or response format.",
      "ja": "マスアサインメントは、フレームワークがホワイトリストによる制限なしにリクエストボディ内のすべてのフィールドをモデル/エンティティへ自動的にバインドしてしまう際に発生し、攻撃者がrole、isAdmin、priceなどの機密フィールドを注入して権限を超えたデータ操作を行うことを可能にする。これはデータバインディングのロジック欠陥であり、性能、文書UI、レスポンス形式とは無関係である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Theo ISO/IEC 25010 và tài liệu ISTQB, tính khả dụng (usability) được định nghĩa dựa trên ba thuộc tính cốt lõi nào khi người dùng cụ thể sử dụng sản phẩm trong ngữ cảnh cụ thể?",
      "en": "According to ISO/IEC 25010 and ISTQB material, usability is defined based on which three core attributes when specific users use a product in a specific context?",
      "ja": "ISO/IEC 25010およびISTQBの資料によれば、特定のユーザーが特定の状況で製品を使用する際、ユーザビリティはどの3つの中核属性に基づいて定義されるか。"
    },
    "options": [
      {
        "vi": "Hiệu quả (effectiveness), hiệu suất (efficiency) và sự hài lòng (satisfaction)",
        "en": "Effectiveness, efficiency and satisfaction",
        "ja": "有効性（effectiveness）、効率性（efficiency）、満足度（satisfaction）"
      },
      {
        "vi": "Độ tin cậy, khả năng bảo trì và tính di động",
        "en": "Reliability, maintainability and portability",
        "ja": "信頼性、保守性、移植性"
      },
      {
        "vi": "Tính bảo mật, tính toàn vẹn và khả năng chống chịu lỗi",
        "en": "Security, integrity and fault tolerance",
        "ja": "セキュリティ、完全性、耐障害性"
      },
      {
        "vi": "Khả năng mở rộng, khả năng tương thích và độ chính xác",
        "en": "Scalability, compatibility and accuracy",
        "ja": "拡張性、互換性、正確性"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "ISO 9241-11 và ISO 25010 xác định khả dụng qua mức độ người dùng đạt mục tiêu chính xác/đầy đủ (hiệu quả), lượng nguồn lực bỏ ra (hiệu suất) và mức độ thoải mái/chấp nhận (sự hài lòng).",
      "en": "ISO 9241-11 and ISO 25010 define usability through the extent users achieve goals accurately/completely (effectiveness), resources expended (efficiency), and comfort/acceptance (satisfaction).",
      "ja": "ISO 9241-11およびISO 25010では、ユーザーが目標を正確かつ完全に達成する度合い（有効性）、費やす資源の量（効率性）、快適さや受容度（満足度）でユーザビリティを定義している。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Analyst muốn đánh giá nhanh giao diện mới bằng cách so sánh với một tập nguyên tắc thiết kế đã được công nhận (ví dụ 10 nguyên tắc của Nielsen) mà không cần người dùng thật tham gia. Kỹ thuật này gọi là gì?",
      "en": "A Test Analyst wants to quickly evaluate a new interface by comparing it against a recognized set of design principles (e.g. Nielsen's 10 heuristics) without involving real users. What is this technique called?",
      "ja": "あるテストアナリストが、実際のユーザーを関与させずに、認知された設計原則（例：ニールセンの10のヒューリスティック）と比較して新しいインターフェースを迅速に評価したいと考えている。この技法は何と呼ばれるか。"
    },
    "options": [
      {
        "vi": "Kiểm thử thăm dò (exploratory testing)",
        "en": "Exploratory testing",
        "ja": "探索的テスト（exploratory testing）"
      },
      {
        "vi": "Đánh giá theo nguyên tắc (heuristic evaluation)",
        "en": "Heuristic evaluation",
        "ja": "ヒューリスティック評価（heuristic evaluation）"
      },
      {
        "vi": "Kiểm thử A/B",
        "en": "A/B testing",
        "ja": "A/Bテスト"
      },
      {
        "vi": "Phân tích tác vụ (task analysis)",
        "en": "Task analysis",
        "ja": "タスク分析（task analysis）"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đánh giá theo nguyên tắc là phương pháp chuyên gia kiểm tra giao diện dựa trên một tập nguyên tắc/heuristic đã biết, không cần người dùng thật, phù hợp để phát hiện sớm vấn đề khả dụng với chi phí thấp.",
      "en": "Heuristic evaluation is an expert-based method where evaluators inspect an interface against a known set of heuristics, without real users, suitable for low-cost early detection of usability issues.",
      "ja": "ヒューリスティック評価は、既知のヒューリスティック集合に基づいて専門家がインターフェースを検査する手法であり、実際のユーザーを必要とせず、低コストでユーザビリティ問題を早期に発見するのに適している。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong WCAG 2.1, bốn nguyên tắc nền tảng thường được viết tắt là POUR bao gồm những gì?",
      "en": "In WCAG 2.1, the four foundational principles commonly abbreviated as POUR are:",
      "ja": "WCAG 2.1において、一般にPOURと略される4つの基本原則とは何か。"
    },
    "options": [
      {
        "vi": "Predictable, Observable, Unified, Reusable",
        "en": "Predictable, Observable, Unified, Reusable",
        "ja": "Predictable, Observable, Unified, Reusable"
      },
      {
        "vi": "Portable, Optimized, Usable, Reliable",
        "en": "Portable, Optimized, Usable, Reliable",
        "ja": "Portable, Optimized, Usable, Reliable"
      },
      {
        "vi": "Có thể cảm nhận, có thể vận hành, có thể hiểu, mạnh mẽ (Perceivable, Operable, Understandable, Robust)",
        "en": "Perceivable, Operable, Understandable, Robust",
        "ja": "知覚可能、操作可能、理解可能、堅牢（Perceivable, Operable, Understandable, Robust）"
      },
      {
        "vi": "Performant, Organized, Universal, Responsive",
        "en": "Performant, Organized, Universal, Responsive",
        "ja": "Performant, Organized, Universal, Responsive"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "WCAG 2.1 tổ chức các tiêu chí thành công quanh bốn nguyên tắc POUR: nội dung phải cảm nhận được, thành phần giao diện phải vận hành được, thông tin phải hiểu được, và nội dung phải đủ mạnh mẽ để tương thích công nghệ hỗ trợ.",
      "en": "WCAG 2.1 organizes success criteria around four POUR principles: content must be perceivable, interface components operable, information understandable, and content robust enough for assistive technology compatibility.",
      "ja": "WCAG 2.1は成功基準をPOURという4原則に基づいて整理している。すなわちコンテンツは知覚可能であり、インターフェース要素は操作可能であり、情報は理解可能であり、コンテンツは支援技術との互換性を保てるほど堅牢でなければならない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một website đạt mức tuân thủ WCAG 2.1 AA nhưng chưa đạt AAA. Phát biểu nào sau đây mô tả đúng mối quan hệ giữa các mức A, AA, AAA?",
      "en": "A website conforms to WCAG 2.1 level AA but not AAA. Which statement correctly describes the relationship between levels A, AA, AAA?",
      "ja": "あるウェブサイトがWCAG 2.1のAAレベルには準拠しているがAAAレベルには準拠していない。A、AA、AAAの各レベルの関係を正しく説明しているのはどれか。"
    },
    "options": [
      {
        "vi": "AAA là mức thấp nhất, A là mức cao nhất, không liên quan lẫn nhau",
        "en": "AAA is the lowest level, A is the highest, they are unrelated",
        "ja": "AAAが最低レベルでAが最高レベルであり、互いに無関係である"
      },
      {
        "vi": "Mỗi mức độc lập hoàn toàn, đạt AA không đòi hỏi đạt A trước đó",
        "en": "Each level is fully independent; achieving AA does not require meeting A first",
        "ja": "各レベルは完全に独立しており、AAを達成するのにAを先に満たす必要はない"
      },
      {
        "vi": "AAA chỉ áp dụng cho ứng dụng di động, không áp dụng cho web",
        "en": "AAA applies only to mobile applications, not to the web",
        "ja": "AAAはモバイルアプリケーションにのみ適用され、ウェブには適用されない"
      },
      {
        "vi": "Các mức có tính lũy tiến: đạt AA nghĩa là đã thỏa mãn toàn bộ tiêu chí mức A và mức AA, nhưng chưa chắc thỏa toàn bộ tiêu chí khắt khe hơn của AAA",
        "en": "Levels are cumulative: conforming to AA means all A and AA criteria are met, but not necessarily the stricter AAA criteria",
        "ja": "レベルは累積的であり、AA準拠とはAとAAの基準すべてを満たすことを意味するが、より厳格なAAAの基準すべてを満たすとは限らない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "WCAG có ba mức tuân thủ lũy tiến A (tối thiểu), AA (tiêu chuẩn phổ biến, thường là yêu cầu pháp lý) và AAA (cao nhất, khắt khe, không bắt buộc cho toàn bộ nội dung). Đạt AA yêu cầu đã đạt A trước đó.",
      "en": "WCAG has three cumulative conformance levels: A (minimum), AA (common standard, often a legal requirement), and AAA (highest, strict, not required for all content). Meeting AA requires meeting A first.",
      "ja": "WCAGにはA（最低限）、AA（一般的な基準であり、しばしば法的要件となる）、AAA（最高水準で厳格、すべてのコンテンツに必須ではない）という累積的な3つの準拠レベルがある。AAを満たすには先にAを満たしている必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Theo WCAG 2.1, tỷ lệ tương phản tối thiểu giữa văn bản thông thường và nền để đạt mức AA là bao nhiêu?",
      "en": "According to WCAG 2.1, what is the minimum contrast ratio between normal text and its background required for level AA conformance?",
      "ja": "WCAG 2.1によれば、AAレベル準拠に必要な通常テキストと背景色との最小コントラスト比はいくつか。"
    },
    "options": [
      {
        "vi": "4.5:1",
        "en": "4.5:1",
        "ja": "4.5:1"
      },
      {
        "vi": "3:1",
        "en": "3:1",
        "ja": "3:1"
      },
      {
        "vi": "1.5:1",
        "en": "1.5:1",
        "ja": "1.5:1"
      },
      {
        "vi": "7:1",
        "en": "7:1",
        "ja": "7:1"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tiêu chí thành công 1.4.3 của WCAG 2.1 yêu cầu tỷ lệ tương phản tối thiểu 4.5:1 cho văn bản thường ở mức AA (3:1 cho văn bản lớn, 7:1 là yêu cầu AAA).",
      "en": "WCAG 2.1 success criterion 1.4.3 requires a minimum contrast ratio of 4.5:1 for normal text at AA level (3:1 for large text, 7:1 is the AAA requirement).",
      "ja": "WCAG 2.1の達成基準1.4.3では、AAレベルにおいて通常テキストの最小コントラスト比は4.5:1と定められている（大きいテキストは3:1、AAAでは7:1が要求される）。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Technical Test Analyst kiểm tra một biểu mẫu web bằng cách chỉ dùng bàn phím, không dùng chuột. Mục tiêu chính của kỹ thuật kiểm thử này là gì?",
      "en": "A Technical Test Analyst tests a web form using only the keyboard, without a mouse. What is the primary goal of this testing technique?",
      "ja": "あるテクニカルテストアナリストが、マウスを使わずキーボードのみでウェブフォームをテストしている。この試験技法の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra hiệu năng tải trang khi mạng chậm",
        "en": "Check page load performance on slow networks",
        "ja": "低速ネットワークでのページ読み込み性能を確認すること"
      },
      {
        "vi": "Xác minh mọi chức năng và thứ tự tab đều truy cập được không cần chuột, phục vụ người dùng khuyết tật vận động hoặc thị giác",
        "en": "Verify all functions and tab order are accessible without a mouse, serving users with motor or visual disabilities",
        "ja": "マウスなしですべての機能とタブ順序にアクセスできることを確認し、運動障害や視覚障害を持つユーザーに対応すること"
      },
      {
        "vi": "Kiểm tra khả năng chịu tải đồng thời của server",
        "en": "Check server concurrent load capacity",
        "ja": "サーバーの同時負荷耐性を確認すること"
      },
      {
        "vi": "Xác minh dữ liệu được mã hóa đúng khi truyền qua mạng",
        "en": "Verify data is correctly encrypted in transit",
        "ja": "データがネットワーク経由で正しく暗号化されて送信されることを確認すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử điều hướng bằng bàn phím là kỹ thuật kiểm thử khả năng truy cập cốt lõi, đảm bảo người dùng không thể hoặc không tiện dùng chuột (khuyết tật vận động, dùng trình đọc màn hình) vẫn thao tác được đầy đủ, theo thứ tự tab logic.",
      "en": "Keyboard navigation testing is a core accessibility testing technique, ensuring users who cannot or prefer not to use a mouse (motor disabilities, screen reader users) can fully operate the interface in a logical tab order.",
      "ja": "キーボードナビゲーションテストは、アクセシビリティテストの中核的な技法であり、マウスを使用できない、または使用しないユーザー（運動障害者やスクリーンリーダー利用者）が論理的なタブ順序で完全に操作できることを保証する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong đánh giá khả dụng, phương pháp think-aloud protocol (nói to suy nghĩ) yêu cầu người tham gia làm gì?",
      "en": "In usability evaluation, the think-aloud protocol requires participants to do what?",
      "ja": "ユーザビリティ評価において、シンキングアラウド法（think-aloud protocol）は参加者に何を求めるか。"
    },
    "options": [
      {
        "vi": "Điền bảng khảo sát sau khi hoàn thành tất cả tác vụ",
        "en": "Fill out a survey after completing all tasks",
        "ja": "すべてのタスク完了後にアンケートに回答する"
      },
      {
        "vi": "Chỉ quan sát người khác sử dụng sản phẩm mà không thao tác",
        "en": "Only observe others use the product without interacting",
        "ja": "自分は操作せず、他者が製品を使う様子を観察するだけ"
      },
      {
        "vi": "Nói to những gì họ đang nghĩ, cảm nhận và lý do hành động trong lúc thực hiện tác vụ",
        "en": "Verbalize what they are thinking, feeling and their reasoning while performing tasks",
        "ja": "タスクを実行している最中に、考えていること、感じていること、行動の理由を声に出して述べる"
      },
      {
        "vi": "Trả lời phỏng vấn cấu trúc trước khi bắt đầu tác vụ",
        "en": "Answer a structured interview before starting the task",
        "ja": "タスク開始前に構造化インタビューに答える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Think-aloud protocol yêu cầu người dùng liên tục nói ra suy nghĩ, kỳ vọng và khó khăn khi thao tác thời gian thực, giúp người quan sát hiểu mô hình tư duy và phát hiện vấn đề khả dụng ngay tại thời điểm xảy ra.",
      "en": "The think-aloud protocol requires users to continuously verbalize their thoughts, expectations and difficulties in real time while interacting, helping observers understand the mental model and catch usability issues as they occur.",
      "ja": "シンキングアラウド法では、ユーザーが操作している最中に、考え・期待・困難点をリアルタイムで継続的に声に出すことが求められる。これにより観察者はユーザーのメンタルモデルを理解し、問題発生の瞬間にユーザビリティ課題を捉えることができる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "System Usability Scale (SUS) là công cụ được dùng phổ biến trong kiểm thử khả dụng để làm gì?",
      "en": "The System Usability Scale (SUS) is a widely used tool in usability testing for what purpose?",
      "ja": "System Usability Scale（SUS）はユーザビリティテストで広く使われるツールであり、何のために用いられるか。"
    },
    "options": [
      {
        "vi": "Đo thời gian phản hồi API của hệ thống",
        "en": "Measure the system's API response time",
        "ja": "システムのAPI応答時間を測定するため"
      },
      {
        "vi": "Đo độ phủ mã (code coverage) của bộ kiểm thử tự động",
        "en": "Measure code coverage of the automated test suite",
        "ja": "自動テストスイートのコードカバレッジを測定するため"
      },
      {
        "vi": "Tự động phát hiện lỗi mã nguồn liên quan đến accessibility",
        "en": "Automatically detect accessibility-related source code defects",
        "ja": "アクセシビリティに関するソースコードの欠陥を自動検出するため"
      },
      {
        "vi": "Cung cấp bảng câu hỏi 10 mục chuẩn hóa để tính điểm cảm nhận tổng thể về khả dụng của người dùng sau khi trải nghiệm hệ thống",
        "en": "Provide a standardized 10-item questionnaire to score users' overall perceived usability after experiencing the system",
        "ja": "システムを体験した後のユーザーが感じる全体的なユーザビリティを、標準化された10項目の質問票でスコア化するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "SUS là bảng câu hỏi chuẩn hóa gồm 10 phát biểu, người dùng chấm theo thang Likert 5 điểm sau khi trải nghiệm, cho ra một điểm số tổng hợp (0-100) phản ánh nhận thức chủ quan về khả dụng, được dùng rộng rãi vì đơn giản, đáng tin cậy và có thể so sánh.",
      "en": "SUS is a standardized 10-statement questionnaire rated on a 5-point Likert scale after use, producing a composite score (0-100) reflecting subjective perceived usability; widely used for its simplicity, reliability and comparability.",
      "ja": "SUSは体験後に5段階リッカート尺度で評価する10項目の標準化された質問票であり、主観的に知覚されたユーザビリティを反映する総合スコア（0〜100）を算出する。シンプルさ、信頼性、比較可能性から広く用いられている。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bối cảnh accessibility testing, thuộc tính ARIA (Accessible Rich Internet Applications) chủ yếu được dùng để làm gì?",
      "en": "In the context of accessibility testing, ARIA (Accessible Rich Internet Applications) attributes are primarily used for what?",
      "ja": "アクセシビリティテストの文脈において、ARIA（Accessible Rich Internet Applications）属性は主に何のために使用されるか。"
    },
    "options": [
      {
        "vi": "Bổ sung ngữ nghĩa và trạng thái cho các thành phần giao diện động để công nghệ hỗ trợ (như trình đọc màn hình) có thể diễn giải đúng",
        "en": "Add semantics and state to dynamic UI components so assistive technologies (like screen readers) can interpret them correctly",
        "ja": "動的なUI要素に意味や状態を付与し、スクリーンリーダーなどの支援技術が正しく解釈できるようにするため"
      },
      {
        "vi": "Tăng tốc độ tải trang bằng cách nén tài nguyên tĩnh",
        "en": "Speed up page load by compressing static assets",
        "ja": "静的リソースを圧縮してページ読み込みを高速化するため"
      },
      {
        "vi": "Mã hóa dữ liệu nhạy cảm trước khi gửi lên server",
        "en": "Encrypt sensitive data before sending to the server",
        "ja": "サーバーへ送信する前に機密データを暗号化するため"
      },
      {
        "vi": "Tối ưu SEO cho công cụ tìm kiếm",
        "en": "Optimize SEO for search engines",
        "ja": "検索エンジン向けにSEOを最適化するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "ARIA cung cấp roles, states và properties (ví dụ aria-label, aria-expanded) để bổ sung thông tin ngữ nghĩa cho các thành phần HTML động/tùy biến, giúp trình đọc màn hình và công nghệ hỗ trợ khác hiểu và tương tác đúng với chúng.",
      "en": "ARIA provides roles, states and properties (e.g. aria-label, aria-expanded) to add semantic information to dynamic/custom HTML components, helping screen readers and other assistive technologies interpret and interact with them correctly.",
      "ja": "ARIAはロール・状態・プロパティ（例：aria-label、aria-expanded）を提供し、動的またはカスタムのHTML要素に意味情報を付与することで、スクリーンリーダーなどの支援技術がそれらを正しく解釈し操作できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi thiết kế test case kiểm tra hình ảnh trên một trang thương mại điện tử theo WCAG, tiêu chí nào KHÔNG được xem là kiểm tra accessibility hợp lệ?",
      "en": "When designing test cases for images on an e-commerce page per WCAG, which of the following is NOT considered a valid accessibility check?",
      "ja": "WCAGに基づいてeコマースページの画像をチェックするテストケースを設計する際、次のうちアクセシビリティチェックとして妥当でないものはどれか。"
    },
    "options": [
      {
        "vi": "Kiểm tra mọi ảnh có ý nghĩa đều có thuộc tính alt mô tả nội dung",
        "en": "Check that all meaningful images have an alt attribute describing their content",
        "ja": "意味のあるすべての画像に内容を説明するalt属性があることを確認する"
      },
      {
        "vi": "Kiểm tra ảnh có kích thước file càng nhỏ càng tốt để tăng tốc tải trang",
        "en": "Check images have the smallest possible file size to speed up page load",
        "ja": "ページ読み込みを速くするため画像ファイルサイズができるだけ小さいことを確認する"
      },
      {
        "vi": "Kiểm tra ảnh trang trí thuần túy có alt=\"\" để trình đọc màn hình bỏ qua",
        "en": "Check purely decorative images have alt=\"\" so screen readers skip them",
        "ja": "純粋に装飾目的の画像にはalt=\"\"が設定され、スクリーンリーダーが読み飛ばすことを確認する"
      },
      {
        "vi": "Kiểm tra văn bản thay thế mô tả đúng chức năng khi ảnh là một liên kết hoặc nút bấm",
        "en": "Check alternative text correctly describes the function when the image is a link or button",
        "ja": "画像がリンクやボタンである場合、代替テキストがその機能を正しく説明していることを確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kích thước file ảnh liên quan đến hiệu năng, không phải khả năng truy cập theo WCAG. Các tiêu chí accessibility về ảnh tập trung vào văn bản thay thế (1.1.1 Non-text Content) phù hợp với vai trò của ảnh (trang trí, thông tin, chức năng).",
      "en": "Image file size relates to performance, not WCAG accessibility. Accessibility criteria for images focus on alternative text (1.1.1 Non-text Content) appropriate to the image's role (decorative, informative, functional).",
      "ja": "画像ファイルサイズはパフォーマンスに関わる事項であり、WCAGのアクセシビリティには該当しない。画像に関するアクセシビリティ基準は、画像の役割（装飾的、情報的、機能的）に応じた代替テキスト（1.1.1 非テキストコンテンツ）に焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Manager cần chọn kỹ thuật thu thập yêu cầu khả dụng ở giai đoạn đầu dự án, trong đó người dùng sắp xếp các thẻ nội dung thành nhóm theo cách hiểu của họ để thiết kế cấu trúc thông tin (information architecture). Đây là kỹ thuật gì?",
      "en": "A Test Manager needs a technique for gathering usability requirements early in the project, where users organize content cards into groups reflecting their own mental model to design the information architecture. What technique is this?",
      "ja": "テストマネージャーが、プロジェクトの初期段階でユーザビリティ要件を収集する技法を選定する必要がある。ユーザーが自分の理解に基づいてコンテンツカードをグループ分けし、情報アーキテクチャを設計する技法とは何か。"
    },
    "options": [
      {
        "vi": "Kiểm thử hồi quy tự động",
        "en": "Automated regression testing",
        "ja": "自動化された回帰テスト"
      },
      {
        "vi": "Cognitive walkthrough",
        "en": "Cognitive walkthrough",
        "ja": "認知的ウォークスルー（cognitive walkthrough）"
      },
      {
        "vi": "Card sorting (sắp xếp thẻ)",
        "en": "Card sorting",
        "ja": "カードソーティング（card sorting）"
      },
      {
        "vi": "Kiểm thử đột biến (mutation testing)",
        "en": "Mutation testing",
        "ja": "ミューテーションテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Card sorting là kỹ thuật nghiên cứu người dùng trong đó người tham gia nhóm và gắn nhãn các thẻ nội dung theo cách họ hiểu, giúp đội thiết kế xây dựng cấu trúc điều hướng/thông tin phù hợp với mô hình tư duy người dùng.",
      "en": "Card sorting is a user research technique where participants group and label content cards according to their own understanding, helping the design team build navigation/information structures that match users' mental models.",
      "ja": "カードソーティングは、参加者が自身の理解に基づいてコンテンツカードをグループ化しラベル付けするユーザーリサーチ技法であり、デザインチームがユーザーのメンタルモデルに合致したナビゲーション・情報構造を構築するのに役立つ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Cognitive walkthrough khác với heuristic evaluation ở điểm nào?",
      "en": "How does cognitive walkthrough differ from heuristic evaluation?",
      "ja": "認知的ウォークスルーはヒューリスティック評価とどのように異なるか。"
    },
    "options": [
      {
        "vi": "Cognitive walkthrough chỉ áp dụng cho phần cứng, không áp dụng cho phần mềm",
        "en": "Cognitive walkthrough applies only to hardware, not software",
        "ja": "認知的ウォークスルーはハードウェアにのみ適用され、ソフトウェアには適用されない"
      },
      {
        "vi": "Cognitive walkthrough luôn cần hàng trăm người dùng thật, heuristic evaluation không cần ai cả",
        "en": "Cognitive walkthrough always requires hundreds of real users, heuristic evaluation needs none",
        "ja": "認知的ウォークスルーは常に数百人の実ユーザーを必要とし、ヒューリスティック評価は誰も必要としない"
      },
      {
        "vi": "Hai kỹ thuật hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "The two techniques are entirely identical, only the names differ",
        "ja": "2つの技法はまったく同一で、名前だけが異なる"
      },
      {
        "vi": "Cognitive walkthrough tập trung mô phỏng quá trình nhận thức của người dùng khi thực hiện từng bước cụ thể của một tác vụ, còn heuristic evaluation so sánh giao diện với danh sách nguyên tắc tổng quát",
        "en": "Cognitive walkthrough focuses on simulating a user's cognitive process while performing specific task steps, while heuristic evaluation compares the interface against a general list of principles",
        "ja": "認知的ウォークスルーは特定のタスクの各ステップを実行する際のユーザーの認知プロセスをシミュレートすることに焦点を当てるのに対し、ヒューリスティック評価は一般原則のリストとインターフェースを比較する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cognitive walkthrough là phương pháp chuyên gia đi qua từng bước của một tác vụ cụ thể, tự đặt câu hỏi liệu người dùng mới có biết phải làm gì, có nhận ra hành động đúng và có hiểu phản hồi hay không; khác với heuristic evaluation vốn đánh giá tổng thể giao diện theo bộ nguyên tắc chung.",
      "en": "Cognitive walkthrough is an expert method that walks through each step of a specific task, asking whether a new user would know what to do, recognize the correct action, and understand feedback; unlike heuristic evaluation, which evaluates the overall interface against general principles.",
      "ja": "認知的ウォークスルーは、特定のタスクの各ステップを専門家がたどり、新規ユーザーが何をすべきか分かるか、正しい操作を認識できるか、フィードバックを理解できるかを自問する手法である。これに対しヒューリスティック評価は、一般的な原則集合に基づいてインターフェース全体を評価する点で異なる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Đối với người dùng khiếm thị hoàn toàn sử dụng trình đọc màn hình, thuộc tính HTML nào sau đây quan trọng nhất để đảm bảo họ hiểu mục đích của một nút bấm chỉ chứa biểu tượng (icon) mà không có văn bản hiển thị?",
      "en": "For a fully blind user using a screen reader, which HTML attribute is most important to ensure they understand the purpose of a button that contains only an icon with no visible text?",
      "ja": "完全に視覚障害のあるユーザーがスクリーンリーダーを使用する場合、可視テキストがなくアイコンのみを含むボタンの目的を理解させるために最も重要なHTML属性は次のうちどれか。"
    },
    "options": [
      {
        "vi": "aria-label hoặc văn bản ẩn tương đương mô tả chức năng của nút",
        "en": "aria-label or an equivalent hidden text describing the button's function",
        "ja": "ボタンの機能を説明するaria-labelまたは同等の非表示テキスト"
      },
      {
        "vi": "class dùng để định kiểu CSS",
        "en": "class used for CSS styling",
        "ja": "CSSスタイリング用のclass"
      },
      {
        "vi": "data-testid dùng cho kiểm thử tự động",
        "en": "data-testid used for test automation",
        "ja": "テスト自動化用のdata-testid"
      },
      {
        "vi": "tabindex đặt giá trị âm để loại khỏi luồng tab",
        "en": "tabindex set to a negative value to remove it from the tab flow",
        "ja": "タブフローから除外するための負の値のtabindex"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi nút chỉ có icon, cần aria-label (hoặc kỹ thuật văn bản ẩn tương đương) để cung cấp tên có thể truy cập (accessible name) cho trình đọc màn hình công bố, đáp ứng tiêu chí 4.1.2 Name, Role, Value của WCAG.",
      "en": "When a button contains only an icon, aria-label (or an equivalent visually-hidden text technique) is needed to provide an accessible name that screen readers can announce, satisfying WCAG 4.1.2 Name, Role, Value.",
      "ja": "ボタンがアイコンのみの場合、スクリーンリーダーが読み上げ可能なアクセシブルネームを提供するためにaria-label（または同等の視覚的に隠されたテキスト技法）が必要であり、WCAGの達成基準4.1.2「名前、役割、値」を満たす。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi lập kế hoạch kiểm thử khả dụng chính thức (formal usability testing) theo hướng dẫn ISTQB Advanced, nhóm kiểm thử nên xác định trước điều gì để có thể đo lường thành công một cách khách quan?",
      "en": "When planning formal usability testing per ISTQB Advanced guidance, the test team should predefine what to measure success objectively?",
      "ja": "ISTQB Advancedのガイダンスに従って正式なユーザビリティテストを計画する際、テストチームは成功を客観的に測定するために事前に何を定義すべきか。"
    },
    "options": [
      {
        "vi": "Chỉ cần cảm nhận cá nhân của tester sau khi dùng thử sản phẩm",
        "en": "Just the tester's personal impression after trying the product",
        "ja": "製品を試した後のテスターの個人的な印象だけ"
      },
      {
        "vi": "Tiêu chí thành công định lượng và định tính (ví dụ tỷ lệ hoàn thành tác vụ, thời gian, số lỗi thao tác, điểm hài lòng) được xác định trước khi kiểm thử",
        "en": "Quantitative and qualitative success criteria (e.g. task completion rate, time on task, error count, satisfaction score) defined before testing",
        "ja": "タスク完了率、所要時間、操作エラー数、満足度スコアなどの定量的・定性的な成功基準をテスト実施前に定義しておくこと"
      },
      {
        "vi": "Số dòng code được viết cho tính năng đó",
        "en": "The number of lines of code written for the feature",
        "ja": "その機能のために書かれたコードの行数"
      },
      {
        "vi": "Số lượng trình duyệt được hỗ trợ chính thức",
        "en": "The number of officially supported browsers",
        "ja": "公式にサポートされているブラウザの数"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử khả dụng chính thức cần tiêu chí thành công được định nghĩa trước (tỷ lệ hoàn thành, thời gian tác vụ, số lỗi, điểm SUS...) để so sánh kết quả khách quan giữa các phiên và giữa các phiên bản sản phẩm, tránh đánh giá cảm tính.",
      "en": "Formal usability testing requires predefined success criteria (completion rate, task time, error count, SUS score, etc.) to objectively compare results across sessions and product versions, avoiding subjective judgment.",
      "ja": "正式なユーザビリティテストでは、セッション間や製品バージョン間で結果を客観的に比較し主観的な判断を避けるために、完了率、タスク時間、エラー数、SUSスコアなどの成功基準を事前に定義しておく必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong WCAG, tiêu chí \"Focus Visible\" (2.4.7) yêu cầu điều gì đối với các thành phần tương tác trên trang?",
      "en": "In WCAG, the \"Focus Visible\" success criterion (2.4.7) requires what for interactive components on a page?",
      "ja": "WCAGの「フォーカスの可視化」（2.4.7）達成基準は、ページ上のインタラクティブな要素について何を要求しているか。"
    },
    "options": [
      {
        "vi": "Mọi thành phần tương tác phải có màu nền giống nhau",
        "en": "All interactive components must have the same background color",
        "ja": "すべてのインタラクティブ要素が同じ背景色を持つこと"
      },
      {
        "vi": "Trang web không được sử dụng CSS animation",
        "en": "The website must not use CSS animation",
        "ja": "ウェブサイトはCSSアニメーションを使用してはならない"
      },
      {
        "vi": "Khi một thành phần nhận focus bàn phím, phải có chỉ báo trực quan rõ ràng cho biết thành phần đó đang được focus",
        "en": "When a component receives keyboard focus, there must be a visible indicator clearly showing it is focused",
        "ja": "要素がキーボードフォーカスを受け取ったとき、その要素がフォーカスされていることを明確に示す視覚的なインジケーターがなければならない"
      },
      {
        "vi": "Mọi liên kết phải được gạch chân bằng màu đỏ",
        "en": "All links must be underlined in red",
        "ja": "すべてのリンクは赤色で下線を引かなければならない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tiêu chí 2.4.7 Focus Visible yêu cầu bất kỳ giao diện nào có thể thao tác bằng bàn phím phải hiển thị chỉ báo focus rõ ràng, giúp người dùng chỉ dùng bàn phím biết mình đang ở đâu trên trang.",
      "en": "Success criterion 2.4.7 Focus Visible requires any keyboard-operable interface to display a clear focus indicator, helping keyboard-only users know their current position on the page.",
      "ja": "達成基準2.4.7「フォーカスの可視化」は、キーボードで操作可能なあらゆるインターフェースに明確なフォーカスインジケーターを表示することを求めており、キーボードのみを使用するユーザーがページ上の現在位置を把握できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một Test Analyst phát hiện video hướng dẫn trên trang không có phụ đề (captions) cho lời thoại. Đây là vi phạm nhóm nguyên tắc nào trong WCAG?",
      "en": "A Test Analyst finds a tutorial video on the page has no captions for the dialogue. This is a violation of which WCAG principle group?",
      "ja": "あるテストアナリストは、ページ上のチュートリアル動画にセリフのキャプションがないことを発見した。これはWCAGのどの原則グループの違反にあたるか。"
    },
    "options": [
      {
        "vi": "Không liên quan đến WCAG vì video là nội dung đa phương tiện",
        "en": "Not related to WCAG because video is multimedia content",
        "ja": "動画はマルチメディアコンテンツであるためWCAGとは無関係である"
      },
      {
        "vi": "Có thể vận hành (Operable) — vì video không thể điều khiển bằng bàn phím",
        "en": "Operable — because the video cannot be controlled by keyboard",
        "ja": "操作可能（Operable）— 動画がキーボードで操作できないため"
      },
      {
        "vi": "Mạnh mẽ (Robust) — vì video không tương thích với công nghệ hỗ trợ",
        "en": "Robust — because the video is incompatible with assistive technology",
        "ja": "堅牢（Robust）— 動画が支援技術と互換性がないため"
      },
      {
        "vi": "Có thể cảm nhận (Perceivable) — nội dung âm thanh phải có phương án thay thế tương đương cho người khiếm thính",
        "en": "Perceivable — audio content must have an equivalent alternative for users who are deaf or hard of hearing",
        "ja": "知覚可能（Perceivable）— 音声コンテンツは聴覚障害のあるユーザーのために同等の代替手段を持たなければならない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thiếu phụ đề vi phạm tiêu chí 1.2.2 Captions thuộc nguyên tắc Perceivable, vì người khiếm thính không thể cảm nhận được nội dung âm thanh nếu không có phương án thay thế dạng văn bản đồng bộ.",
      "en": "Missing captions violates success criterion 1.2.2 Captions under the Perceivable principle, since deaf or hard-of-hearing users cannot perceive audio content without a synchronized text alternative.",
      "ja": "キャプションの欠如は、知覚可能原則に属する達成基準1.2.2「キャプション」の違反である。聴覚障害のあるユーザーは同期したテキスト代替がなければ音声コンテンツを知覚できないためである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quy trình kiểm thử accessibility, công cụ quét tự động (ví dụ axe, WAVE) có hạn chế chính nào so với đánh giá thủ công?",
      "en": "In accessibility testing, automated scanning tools (e.g. axe, WAVE) have what main limitation compared to manual evaluation?",
      "ja": "アクセシビリティテストにおいて、自動スキャンツール（axe、WAVEなど）は手動評価と比較してどのような主な限界があるか。"
    },
    "options": [
      {
        "vi": "Chúng chỉ phát hiện được một phần vấn đề (thường 30-50%) — các vấn đề đòi hỏi phán đoán ngữ cảnh như chất lượng văn bản thay thế hay trải nghiệm điều hướng logic vẫn cần con người đánh giá",
        "en": "They only detect a subset of issues (often 30-50%) — issues requiring contextual judgment such as the quality of alt text or logical navigation flow still require human evaluation",
        "ja": "問題の一部（多くの場合30〜50%）しか検出できない — 代替テキストの質や論理的なナビゲーションの流れなど、文脈的な判断を要する問題は依然として人による評価が必要である"
      },
      {
        "vi": "Chúng chạy quá chậm nên không thể tích hợp vào CI/CD",
        "en": "They run too slowly to integrate into CI/CD",
        "ja": "実行が遅すぎてCI/CDに統合できない"
      },
      {
        "vi": "Chúng không thể chạy trên trình duyệt hiện đại",
        "en": "They cannot run on modern browsers",
        "ja": "最新のブラウザでは実行できない"
      },
      {
        "vi": "Chúng chỉ hoạt động với ứng dụng di động native, không hoạt động với web",
        "en": "They only work with native mobile apps, not the web",
        "ja": "ネイティブモバイルアプリでのみ動作し、ウェブでは動作しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Công cụ tự động tốt trong phát hiện vi phạm có thể kiểm chứng bằng mã (thiếu alt, tương phản màu, thiếu label form) nhưng không đánh giá được chất lượng ngữ nghĩa, trải nghiệm thực tế với trình đọc màn hình, hay tính logic của luồng điều hướng — cần kiểm thử thủ công/người dùng thật bổ sung.",
      "en": "Automated tools are good at detecting code-verifiable violations (missing alt, color contrast, missing form labels) but cannot assess semantic quality, real screen-reader experience, or logical navigation flow — manual/real-user testing is needed to complement them.",
      "ja": "自動ツールはコードで検証可能な違反（alt属性の欠如、色コントラスト、フォームラベルの欠如）の検出には優れているが、意味的な質、実際のスクリーンリーダー体験、ナビゲーションの論理性は評価できない。これらを補うには手動テストや実ユーザーによるテストが必要である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một trang đăng nhập tự động chuyển hướng và đóng phiên sau 60 giây không hoạt động mà không có cảnh báo trước. Đối với người dùng có khuyết tật vận động cần thời gian nhập liệu lâu hơn, đây là vấn đề liên quan đến tiêu chí WCAG nào?",
      "en": "A login page automatically redirects and closes the session after 60 seconds of inactivity without warning. For users with motor disabilities who need more time to enter data, this relates to which WCAG criterion?",
      "ja": "ログインページが警告なしに60秒間操作がないと自動的にリダイレクトしセッションを終了する。入力に時間がかかる運動障害のあるユーザーにとって、これはWCAGのどの基準に関連する問題か。"
    },
    "options": [
      {
        "vi": "1.1.1 Non-text Content",
        "en": "1.1.1 Non-text Content",
        "ja": "1.1.1 非テキストコンテンツ"
      },
      {
        "vi": "2.2.1 Timing Adjustable — người dùng cần được cảnh báo và có khả năng gia hạn thời gian giới hạn",
        "en": "2.2.1 Timing Adjustable — users must be warned and able to extend time limits",
        "ja": "2.2.1 タイミング調整可能 — ユーザーには警告があり、時間制限を延長できる必要がある"
      },
      {
        "vi": "3.1.1 Language of Page",
        "en": "3.1.1 Language of Page",
        "ja": "3.1.1 ページの言語"
      },
      {
        "vi": "4.1.1 Parsing",
        "en": "4.1.1 Parsing",
        "ja": "4.1.1 構文解析"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tiêu chí 2.2.1 Timing Adjustable yêu cầu nếu có giới hạn thời gian do nội dung đặt ra, người dùng phải được phép tắt, điều chỉnh hoặc gia hạn — hỗ trợ người khuyết tật vận động hoặc nhận thức cần nhiều thời gian hơn để hoàn thành tác vụ.",
      "en": "Success criterion 2.2.1 Timing Adjustable requires that when content imposes a time limit, users must be able to turn it off, adjust it, or extend it — supporting users with motor or cognitive disabilities who need more time to complete tasks.",
      "ja": "達成基準2.2.1「タイミング調整可能」は、コンテンツが時間制限を課す場合、ユーザーがそれを解除、調整、または延長できることを要求しており、タスク完了に時間がかかる運動障害や認知障害のあるユーザーを支援する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong dự án Agile, khi nào là thời điểm hợp lý nhất để bắt đầu tích hợp kiểm thử khả dụng và accessibility vào quy trình, theo khuyến nghị ISTQB Advanced?",
      "en": "In an Agile project, when is the most appropriate time to start integrating usability and accessibility testing into the process, per ISTQB Advanced recommendations?",
      "ja": "アジャイルプロジェクトにおいて、ISTQB Advancedの推奨によれば、ユーザビリティおよびアクセシビリティテストをプロセスに組み込み始める最も適切な時期はいつか。"
    },
    "options": [
      {
        "vi": "Chỉ sau khi toàn bộ sản phẩm hoàn thiện, trước khi release cuối cùng",
        "en": "Only after the entire product is complete, right before final release",
        "ja": "製品全体が完成した後、最終リリース直前のみ"
      },
      {
        "vi": "Chỉ khi khách hàng khiếu nại về accessibility",
        "en": "Only when customers complain about accessibility",
        "ja": "顧客からアクセシビリティに関する苦情があったときのみ"
      },
      {
        "vi": "Ngay từ giai đoạn thiết kế/wireframe sớm và liên tục qua từng sprint, không chỉ ở giai đoạn kiểm thử cuối",
        "en": "As early as the design/wireframe stage and continuously throughout each sprint, not only at the final testing phase",
        "ja": "デザイン・ワイヤーフレームの初期段階から始め、最終テスト段階だけでなく各スプリントを通じて継続的に行う"
      },
      {
        "vi": "Không cần tích hợp vào Agile vì tốn quá nhiều thời gian",
        "en": "No need to integrate into Agile since it takes too much time",
        "ja": "時間がかかりすぎるためアジャイルに組み込む必要はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phát hiện vấn đề khả dụng/accessibility càng sớm càng rẻ để sửa. ISTQB khuyến nghị đưa đánh giá heuristic, kiểm tra accessibility tự động và thử nghiệm người dùng nhẹ vào ngay từ thiết kế và lặp lại mỗi sprint, thay vì dồn vào cuối dự án.",
      "en": "The earlier usability/accessibility issues are found, the cheaper they are to fix. ISTQB recommends embedding heuristic evaluation, automated accessibility checks and lightweight user testing from the design stage onward, repeated each sprint, rather than deferring to the end of the project.",
      "ja": "ユーザビリティ・アクセシビリティの問題は早期に発見するほど修正コストが低い。ISTQBは、ヒューリスティック評価、自動アクセシビリティチェック、軽量なユーザーテストを設計段階から組み込み、プロジェクトの最後にまとめるのではなく各スプリントで繰り返すことを推奨している。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa \"usability testing\" và \"accessibility testing\" là gì, dù chúng có liên quan chặt chẽ?",
      "en": "What is the core difference between usability testing and accessibility testing, even though they are closely related?",
      "ja": "両者は密接に関連しているが、「ユーザビリティテスト」と「アクセシビリティテスト」の核心的な違いは何か。"
    },
    "options": [
      {
        "vi": "Accessibility testing là một bước thực hiện sau khi usability testing thất bại hoàn toàn",
        "en": "Accessibility testing is a step performed only after usability testing has completely failed",
        "ja": "アクセシビリティテストは、ユーザビリティテストが完全に失敗した後にのみ実施される工程である"
      },
      {
        "vi": "Hai thuật ngữ hoàn toàn đồng nghĩa, có thể dùng thay thế nhau trong mọi ngữ cảnh",
        "en": "The two terms are fully synonymous and interchangeable in every context",
        "ja": "両者は完全に同義であり、あらゆる文脈で互換的に使用できる"
      },
      {
        "vi": "Usability testing chỉ áp dụng cho mobile, accessibility testing chỉ áp dụng cho web",
        "en": "Usability testing applies only to mobile, accessibility testing applies only to web",
        "ja": "ユーザビリティテストはモバイルにのみ、アクセシビリティテストはウェブにのみ適用される"
      },
      {
        "vi": "Usability testing đánh giá mức độ dễ dùng, hiệu quả, hài lòng của người dùng nói chung; accessibility testing đánh giá cụ thể liệu người khuyết tật có thể sử dụng sản phẩm hay không, thường đối chiếu chuẩn WCAG",
        "en": "Usability testing evaluates ease of use, efficiency and satisfaction for users generally; accessibility testing specifically evaluates whether people with disabilities can use the product, usually against WCAG standards",
        "ja": "ユーザビリティテストは一般のユーザーにとっての使いやすさ、効率性、満足度を評価するのに対し、アクセシビリティテストは障害のある人が製品を使用できるかどうかを、通常WCAG基準に照らして具体的に評価する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Usability tập trung vào trải nghiệm hiệu quả, hiệu suất, hài lòng cho người dùng nói chung; accessibility tập trung cụ thể vào khả năng sử dụng của người khuyết tật (thị giác, thính giác, vận động, nhận thức), thường được đánh giá theo tiêu chuẩn WCAG — dù cả hai bổ trợ và chồng lấn nhau.",
      "en": "Usability focuses on effective, efficient, satisfying experiences for users in general; accessibility focuses specifically on usability for people with disabilities (visual, auditory, motor, cognitive), typically evaluated against WCAG standards — though the two overlap and complement each other.",
      "ja": "ユーザビリティは一般ユーザーにとっての効果的・効率的で満足度の高い体験に焦点を当てるのに対し、アクセシビリティは障害（視覚、聴覚、運動、認知）のある人々にとっての使用可能性に具体的に焦点を当て、通常WCAG基準に照らして評価される。両者は重なり合いながらも補完し合う関係にある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một tổ chức tại một số quốc gia bị ràng buộc pháp lý phải đảm bảo phần mềm công cộng đáp ứng chuẩn accessibility (ví dụ Section 508 tại Mỹ, EN 301 549 tại EU). Điều này ảnh hưởng thế nào đến vai trò của Test Manager?",
      "en": "An organization in certain jurisdictions is legally required to ensure public-facing software meets accessibility standards (e.g. Section 508 in the US, EN 301 549 in the EU). How does this affect the Test Manager's role?",
      "ja": "一部の法域では、組織は公開ソフトウェアがアクセシビリティ基準（米国のSection 508、EUのEN 301 549など）を満たすことを法的に義務付けられている。これはテストマネージャーの役割にどのように影響するか。"
    },
    "options": [
      {
        "vi": "Test Manager cần đưa yêu cầu tuân thủ pháp lý accessibility vào chiến lược kiểm thử, phân bổ nguồn lực đánh giá WCAG và coi vi phạm nghiêm trọng như rủi ro pháp lý/kinh doanh cần báo cáo",
        "en": "The Test Manager must incorporate legal accessibility compliance requirements into the test strategy, allocate resources for WCAG evaluation, and treat serious violations as legal/business risks requiring escalation",
        "ja": "テストマネージャーはアクセシビリティの法的遵守要件をテスト戦略に組み込み、WCAG評価のためのリソースを割り当て、重大な違反を報告すべき法的・ビジネス上のリスクとして扱う必要がある"
      },
      {
        "vi": "Không ảnh hưởng gì vì accessibility chỉ là tùy chọn thẩm mỹ",
        "en": "No effect, since accessibility is merely an aesthetic option",
        "ja": "アクセシビリティは単なる美的な選択肢にすぎないため、何の影響もない"
      },
      {
        "vi": "Chỉ bộ phận pháp lý cần quan tâm, đội kiểm thử không liên quan",
        "en": "Only the legal department needs to care, the test team is not involved",
        "ja": "法務部門のみが関心を持てばよく、テストチームは関与しない"
      },
      {
        "vi": "Test Manager chỉ cần kiểm tra accessibility một lần duy nhất khi ra mắt sản phẩm",
        "en": "The Test Manager only needs to check accessibility once, at product launch",
        "ja": "テストマネージャーは製品ローンチ時に一度だけアクセシビリティを確認すればよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi có ràng buộc pháp lý, accessibility trở thành yêu cầu không thể thương lượng (non-negotiable). Test Manager phải đưa nó vào chiến lược/kế hoạch kiểm thử, phân bổ đủ nguồn lực, kỹ năng và công cụ, đồng thời báo cáo rủi ro tuân thủ lên các bên liên quan như một rủi ro dự án nghiêm trọng.",
      "en": "With legal obligations, accessibility becomes a non-negotiable requirement. The Test Manager must embed it in the test strategy/plan, allocate sufficient resources, skills and tools, and report compliance risk to stakeholders as a serious project risk.",
      "ja": "法的義務がある場合、アクセシビリティは交渉の余地のない要件となる。テストマネージャーはこれをテスト戦略・計画に組み込み、十分なリソース、スキル、ツールを割り当て、遵守リスクを重大なプロジェクトリスクとしてステークホルダーに報告する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong nghiên cứu người dùng cho kiểm thử khả dụng, \"persona\" được dùng để làm gì?",
      "en": "In user research for usability testing, what is a \"persona\" used for?",
      "ja": "ユーザビリティテストのユーザーリサーチにおいて、「ペルソナ」は何のために使われるか。"
    },
    "options": [
      {
        "vi": "Là tài khoản test admin dùng để đăng nhập hệ thống",
        "en": "A test admin account used to log into the system",
        "ja": "システムにログインするためのテスト用管理者アカウント"
      },
      {
        "vi": "Là bản mô tả hư cấu tổng hợp đại diện cho nhóm người dùng mục tiêu, giúp đội phát triển/kiểm thử thiết kế và đánh giá theo góc nhìn của người dùng thực tế",
        "en": "A fictional but composite profile representing a target user segment, helping the dev/test team design and evaluate from a realistic user perspective",
        "ja": "ターゲットとなるユーザー層を代表する架空ながら複合的なプロフィールであり、開発・テストチームが実際のユーザー視点から設計・評価するのを助ける"
      },
      {
        "vi": "Là kịch bản kiểm thử tự động chạy trên CI",
        "en": "An automated test scenario run on CI",
        "ja": "CI上で実行される自動テストシナリオ"
      },
      {
        "vi": "Là chứng chỉ bảo mật dùng để mã hóa phiên làm việc",
        "en": "A security certificate used to encrypt sessions",
        "ja": "セッションを暗号化するためのセキュリティ証明書"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Persona là hồ sơ hư cấu nhưng dựa trên nghiên cứu thực tế (mục tiêu, hành vi, khó khăn, ngữ cảnh sử dụng), giúp đội dự án đồng cảm và ra quyết định thiết kế/kiểm thử phù hợp với người dùng thật thay vì giả định chủ quan.",
      "en": "A persona is a fictional but research-based profile (goals, behaviors, pain points, context of use) that helps the project team empathize and make design/testing decisions aligned with real users rather than subjective assumptions.",
      "ja": "ペルソナは架空ではあるが実際のリサーチ（目標、行動、課題、利用状況）に基づくプロフィールであり、プロジェクトチームが共感を持ち、主観的な仮定ではなく実際のユーザーに沿った設計・テストの意思決定を行うのに役立つ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi đánh giá một mẫu thử nghiệm khả dụng (usability test), số lượng người tham dự thường được Jakob Nielsen khuyến nghị là bao nhiêu để phát hiện phần lớn (~85%) vấn đề khả dụng với chi phí hợp lý?",
      "en": "When conducting a usability test, how many participants does Jakob Nielsen commonly recommend to uncover most (~85%) usability problems cost-effectively?",
      "ja": "ユーザビリティテストを実施する際、コスト効率よくユーザビリティ問題の大部分（約85%）を発見するために、ヤコブ・ニールセンが一般的に推奨する参加者数はいくつか。"
    },
    "options": [
      {
        "vi": "1 người",
        "en": "1 participant",
        "ja": "1人"
      },
      {
        "vi": "Ít nhất 100 người",
        "en": "At least 100 participants",
        "ja": "少なくとも100人"
      },
      {
        "vi": "Khoảng 5 người",
        "en": "About 5 participants",
        "ja": "約5人"
      },
      {
        "vi": "Toàn bộ người dùng thực tế của hệ thống",
        "en": "The entire actual user base of the system",
        "ja": "システムの実際のユーザー全員"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nielsen chỉ ra rằng kiểm thử với khoảng 5 người dùng đã có thể phát hiện được phần lớn vấn đề khả dụng (~85%), và việc thêm nhiều người tham gia mang lại lợi ích giảm dần trong khi chi phí tăng, nên khuyến nghị nhiều vòng kiểm thử nhỏ thay vì một vòng lớn.",
      "en": "Nielsen showed that testing with about 5 users can reveal most usability problems (~85%), while adding more participants yields diminishing returns as cost increases, hence recommending multiple small rounds over one large round.",
      "ja": "ニールセンは、約5人のユーザーでテストすることでユーザビリティ問題の大部分（約85%）を発見できることを示した。参加者を増やすほどコストは増える一方で得られる効果は逓減するため、1回の大規模なテストよりも複数回の小規模なテストが推奨される。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong test plan cho một ứng dụng ngân hàng di động, đội kiểm thử cần đánh giá xem người dùng lớn tuổi có gặp khó khăn khi thao tác không. Kỹ thuật nào phù hợp NHẤT để thu thập dữ liệu định tính sâu về trải nghiệm của nhóm này?",
      "en": "In the test plan for a mobile banking app, the team needs to evaluate whether older users struggle with the interface. Which technique is BEST suited to gather deep qualitative data on this group's experience?",
      "ja": "モバイルバンキングアプリのテスト計画において、チームは高齢ユーザーが操作に苦労していないかを評価する必要がある。この層の体験について深い定性データを収集するのに最も適した技法はどれか。"
    },
    "options": [
      {
        "vi": "Chỉ phân tích log server để đếm số request lỗi",
        "en": "Only analyze server logs to count error requests",
        "ja": "サーバーログを分析してエラーリクエスト数を数えるだけ"
      },
      {
        "vi": "Chạy kiểm thử tải để đo thời gian phản hồi server",
        "en": "Run load testing to measure server response time",
        "ja": "サーバーの応答時間を測るために負荷テストを実行する"
      },
      {
        "vi": "Chỉ dựa vào đánh giá heuristic của chuyên gia UX nội bộ, không cần người dùng thật",
        "en": "Rely solely on internal UX experts' heuristic evaluation, no real users needed",
        "ja": "社内UX専門家によるヒューリスティック評価のみに依存し、実ユーザーは不要とする"
      },
      {
        "vi": "Phiên kiểm thử khả dụng có điều tiết (moderated usability session) với người tham gia thuộc đúng nhóm nhân khẩu học mục tiêu, kết hợp quan sát và phỏng vấn theo dõi",
        "en": "A moderated usability session with participants from the target demographic, combined with observation and follow-up interview questions",
        "ja": "対象となる人口統計層の参加者による司会付きユーザビリティセッションを実施し、観察とフォローアップインタビューを組み合わせる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Để hiểu sâu trải nghiệm chủ quan, khó khăn và nguyên nhân của một nhóm nhân khẩu học cụ thể, phiên kiểm thử có điều tiết với người tham gia đại diện đúng nhóm, kết hợp quan sát hành vi và phỏng vấn, cung cấp dữ liệu định tính phong phú mà log hệ thống hay đánh giá chuyên gia đơn thuần không thể thay thế.",
      "en": "To deeply understand the subjective experience, difficulties and root causes for a specific demographic, a moderated session with representative participants, combined with behavioral observation and interviews, provides rich qualitative data that system logs or expert-only evaluation cannot replace.",
      "ja": "特定の人口統計層における主観的な体験、困難、根本原因を深く理解するには、代表的な参加者による司会付きセッションと行動観察・インタビューを組み合わせることが、システムログや専門家のみの評価では代替できない豊富な定性データを提供する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong kiểm thử dựa trên rủi ro (risk-based testing), mục tiêu chính khi phân bổ nguồn lực kiểm thử là gì?",
      "en": "In risk-based testing, what is the primary goal when allocating test effort?",
      "ja": "リスクベースドテスト(RBT)において、テスト工数を配分する主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Phân bổ nỗ lực kiểm thử tương ứng với mức độ rủi ro của từng hạng mục, nhằm giảm rủi ro tồn đọng xuống mức chấp nhận được",
        "en": "Allocate test effort in proportion to the risk level of each item, so that residual risk is reduced to an acceptable level",
        "ja": "各項目のリスクレベルに応じてテスト工数を配分し、残存リスクを許容可能なレベルまで低減すること"
      },
      {
        "vi": "Kiểm thử tất cả các chức năng với cùng mức độ chi tiết bất kể rủi ro",
        "en": "Test all functions with the same level of depth regardless of risk",
        "ja": "リスクに関係なくすべての機能を同じ深さでテストすること"
      },
      {
        "vi": "Chỉ kiểm thử các chức năng mới được phát triển trong sprint hiện tại",
        "en": "Only test functions newly developed in the current sprint",
        "ja": "現在のスプリントで新規開発された機能のみをテストすること"
      },
      {
        "vi": "Loại bỏ hoàn toàn mọi rủi ro trước khi phát hành sản phẩm",
        "en": "Completely eliminate all risk before releasing the product",
        "ja": "リリース前にすべてのリスクを完全に排除すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "RBT ưu tiên effort theo mức rủi ro (likelihood x impact) để tối ưu hoá việc phát hiện lỗi quan trọng trong giới hạn thời gian/ngân sách, không nhằm test đều hay loại bỏ hết rủi ro (điều không khả thi).",
      "en": "RBT prioritizes effort by risk (likelihood x impact) to maximize defect detection within time/budget constraints, not to test everything equally or eliminate all risk, which is not feasible.",
      "ja": "RBTはリスク(発生可能性×影響度)に応じて工数を優先配分し、限られた時間と予算の中で重要な欠陥の検出を最大化することを目指す。均一なテストや全リスクの排除を目的とはしない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong phân tích rủi ro sản phẩm, likelihood và impact khác nhau như thế nào?",
      "en": "In product risk analysis, how do likelihood and impact differ?",
      "ja": "プロダクトリスク分析において、発生可能性(likelihood)と影響度(impact)はどう異なりますか。"
    },
    "options": [
      {
        "vi": "Likelihood đo mức độ nghiêm trọng hậu quả, impact đo khả năng xảy ra lỗi",
        "en": "Likelihood measures the severity of consequences, impact measures the probability of failure",
        "ja": "発生可能性は結果の深刻さを測り、影響度は故障の発生確率を測る"
      },
      {
        "vi": "Likelihood là khả năng xảy ra sự cố/lỗi, impact là mức độ nghiêm trọng của hậu quả nếu sự cố đó xảy ra",
        "en": "Likelihood is the probability that a failure occurs, impact is the severity of consequences if it does occur",
        "ja": "発生可能性は故障が発生する確率であり、影響度はその故障が発生した場合の結果の深刻さである"
      },
      {
        "vi": "Cả hai đo cùng một khái niệm và có thể dùng thay thế cho nhau",
        "en": "Both measure the same concept and can be used interchangeably",
        "ja": "両者は同じ概念を測るため互換的に使用できる"
      },
      {
        "vi": "Likelihood chỉ dùng cho rủi ro dự án, impact chỉ dùng cho rủi ro sản phẩm",
        "en": "Likelihood applies only to project risk, impact applies only to product risk",
        "ja": "発生可能性はプロジェクトリスクのみに、影響度はプロダクトリスクのみに適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Likelihood (khả năng xảy ra) và impact (hậu quả) là hai chiều độc lập tạo nên risk exposure; nhầm lẫn hai khái niệm dẫn đến ưu tiên sai.",
      "en": "Likelihood (probability of occurrence) and impact (severity of consequence) are two independent dimensions that together determine risk exposure; confusing them leads to incorrect prioritization.",
      "ja": "発生可能性(発生確率)と影響度(結果の深刻さ)はリスクエクスポージャーを構成する独立した2つの軸であり、両者を混同すると優先順位付けを誤る。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ma trận khả năng-tác động (probability-impact matrix) được sử dụng để làm gì trong risk-based testing?",
      "en": "What is a probability-impact matrix used for in risk-based testing?",
      "ja": "リスクベースドテストにおいて、確率・影響度マトリクス(probability-impact matrix)は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Đo thời gian thực thi thực tế của từng test case",
        "en": "To measure the actual execution time of each test case",
        "ja": "各テストケースの実際の実行時間を測定するため"
      },
      {
        "vi": "Ghi nhận số lượng defect được phát hiện sau khi test",
        "en": "To record the number of defects found after testing",
        "ja": "テスト後に発見された欠陥の数を記録するため"
      },
      {
        "vi": "Kết hợp likelihood và impact của từng rủi ro để xác định mức độ ưu tiên kiểm thử",
        "en": "To combine the likelihood and impact of each risk to determine testing priority",
        "ja": "各リスクの発生可能性と影響度を組み合わせてテストの優先順位を決定するため"
      },
      {
        "vi": "Thay thế hoàn toàn cho việc thiết kế test case chi tiết",
        "en": "To completely replace detailed test case design",
        "ja": "詳細なテストケース設計を完全に置き換えるため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ma trận này trực quan hoá risk exposure bằng cách kết hợp hai trục, giúp nhóm test biết nên đầu tư effort vào đâu trước.",
      "en": "The matrix visualizes risk exposure by combining the two axes, helping the test team decide where to invest effort first.",
      "ja": "このマトリクスは2つの軸を組み合わせてリスクエクスポージャーを可視化し、テストチームがどこに工数を優先投入すべきかを判断する助けとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Risk exposure của một hạng mục rủi ro thường được xác định như thế nào?",
      "en": "How is the risk exposure of a risk item typically determined?",
      "ja": "リスク項目のリスクエクスポージャーは通常どのように決定されますか。"
    },
    "options": [
      {
        "vi": "Bằng tổng số test case đã viết cho hạng mục đó",
        "en": "By the total number of test cases written for that item",
        "ja": "その項目に対して作成されたテストケースの総数によって"
      },
      {
        "vi": "Bằng số lượng người tham gia đánh giá rủi ro",
        "en": "By the number of people involved in the risk assessment",
        "ja": "リスク評価に参加した人数によって"
      },
      {
        "vi": "Bằng thời gian còn lại trước khi release",
        "en": "By the time remaining before release",
        "ja": "リリースまでの残り時間によって"
      },
      {
        "vi": "Bằng sự kết hợp (thường là tích) giữa likelihood và impact của rủi ro đó",
        "en": "By combining (typically multiplying) the likelihood and impact of that risk",
        "ja": "そのリスクの発生可能性と影響度を組み合わせる(通常は乗算する)ことによって"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Risk exposure = likelihood x impact (hoặc kết hợp tương đương), là cơ sở để xếp hạng và ưu tiên rủi ro.",
      "en": "Risk exposure = likelihood x impact (or an equivalent combination), forming the basis for ranking and prioritizing risks.",
      "ja": "リスクエクスポージャー=発生可能性×影響度(またはそれに相当する組み合わせ)であり、リスクの順位付けと優先順位付けの基礎となる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Rủi ro dự án (project risk) khác với rủi ro sản phẩm (product risk) ở điểm nào?",
      "en": "How does project risk differ from product risk?",
      "ja": "プロジェクトリスクとプロダクトリスクはどのように異なりますか。"
    },
    "options": [
      {
        "vi": "Rủi ro dự án liên quan đến khả năng quản lý dự án đạt mục tiêu (nhân sự, lịch trình, ngân sách...), còn rủi ro sản phẩm liên quan đến khả năng sản phẩm gây thất bại khi sử dụng",
        "en": "Project risk relates to the project's ability to meet its objectives (staffing, schedule, budget...), while product risk relates to the possibility that the product will fail in use",
        "ja": "プロジェクトリスクはプロジェクトが目標(要員、スケジュール、予算など)を達成できるかに関わり、プロダクトリスクは製品が使用時に不具合を起こす可能性に関わる"
      },
      {
        "vi": "Rủi ro dự án chỉ do Test Manager quản lý, rủi ro sản phẩm chỉ do lập trình viên quản lý",
        "en": "Project risk is managed only by the Test Manager, product risk only by developers",
        "ja": "プロジェクトリスクはテストマネージャーのみが管理し、プロダクトリスクは開発者のみが管理する"
      },
      {
        "vi": "Hai loại rủi ro này hoàn toàn giống nhau và không cần phân biệt",
        "en": "The two types of risk are identical and need not be distinguished",
        "ja": "この2種類のリスクは全く同一であり、区別する必要はない"
      },
      {
        "vi": "Rủi ro sản phẩm chỉ xuất hiện sau khi release, rủi ro dự án chỉ xuất hiện trước khi bắt đầu dự án",
        "en": "Product risk only occurs after release, project risk only occurs before the project starts",
        "ja": "プロダクトリスクはリリース後にのみ発生し、プロジェクトリスクはプロジェクト開始前にのみ発生する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Project risk (VD: thiếu nhân lực, trễ lịch) ảnh hưởng đến việc quản lý dự án; product risk (VD: lỗi chức năng, hiệu năng kém) ảnh hưởng trực tiếp đến chất lượng sản phẩm.",
      "en": "Project risk (e.g., understaffing, schedule slippage) affects project management, while product risk (e.g., functional defects, poor performance) directly affects product quality.",
      "ja": "プロジェクトリスク(例:要員不足、スケジュール遅延)はプロジェクト管理に影響し、プロダクトリスク(例:機能欠陥、性能不足)は製品品質に直接影響する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi kiểm thử được dùng như một biện pháp giảm thiểu rủi ro sản phẩm, điều đó có nghĩa là gì?",
      "en": "When testing is used as a product risk mitigation measure, what does this mean?",
      "ja": "テストがプロダクトリスクの低減策として用いられる場合、それはどのような意味ですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử loại bỏ hoàn toàn khả năng xảy ra rủi ro đã xác định",
        "en": "Testing completely eliminates the possibility of the identified risk occurring",
        "ja": "テストは特定されたリスクの発生可能性を完全に排除する"
      },
      {
        "vi": "Kiểm thử giúp phát hiện sớm các lỗi liên quan đến rủi ro đã xác định, cung cấp thông tin để giảm khả năng hoặc hậu quả của rủi ro đó trước khi release",
        "en": "Testing helps detect defects related to the identified risk early, providing information to reduce its likelihood or impact before release",
        "ja": "テストは特定されたリスクに関連する欠陥を早期に検出し、リリース前にそのリスクの発生可能性または影響度を低減するための情報を提供する"
      },
      {
        "vi": "Kiểm thử chỉ có tác dụng giảm rủi ro dự án, không ảnh hưởng đến rủi ro sản phẩm",
        "en": "Testing only reduces project risk, not product risk",
        "ja": "テストはプロジェクトリスクのみを低減し、プロダクトリスクには影響しない"
      },
      {
        "vi": "Kiểm thử làm tăng rủi ro vì phát hiện thêm defect",
        "en": "Testing increases risk because it uncovers more defects",
        "ja": "テストはより多くの欠陥を発見するためリスクを増加させる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test là một mitigation action: phát hiện defect sớm giúp sửa trước khi ảnh hưởng người dùng, giảm risk exposure còn lại, chứ không loại bỏ hoàn toàn rủi ro.",
      "en": "Testing is a mitigation action: detecting defects early allows fixing before impacting users, reducing residual risk exposure, but it does not eliminate risk entirely.",
      "ja": "テストは低減策の一つであり、欠陥を早期に検出することでユーザーへの影響前に修正でき、残存リスクエクスポージャーを低減する。ただしリスクを完全に排除するものではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "FMEA (Failure Mode and Effect Analysis) là kỹ thuật dùng để làm gì trong quản lý rủi ro?",
      "en": "What is FMEA (Failure Mode and Effect Analysis) used for in risk management?",
      "ja": "リスク管理においてFMEA(故障モード影響解析)は何のために用いられますか。"
    },
    "options": [
      {
        "vi": "Tự động sinh test case từ mã nguồn",
        "en": "To automatically generate test cases from source code",
        "ja": "ソースコードから自動的にテストケースを生成するため"
      },
      {
        "vi": "Đo lường coverage của bộ test hiện tại",
        "en": "To measure the coverage of the current test suite",
        "ja": "現在のテストスイートのカバレッジを測定するため"
      },
      {
        "vi": "Phân tích có hệ thống các chế độ lỗi tiềm ẩn, hậu quả và mức độ nghiêm trọng của chúng để ưu tiên xử lý rủi ro",
        "en": "To systematically analyze potential failure modes, their effects, and severity to prioritize risk handling",
        "ja": "潜在的な故障モードとその影響、深刻度を体系的に分析し、リスク対応の優先順位を付けるため"
      },
      {
        "vi": "Tính toán chi phí nhân sự cho dự án kiểm thử",
        "en": "To calculate staffing costs for a testing project",
        "ja": "テストプロジェクトの人件費を計算するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "FMEA liệt kê các failure mode có thể xảy ra, đánh giá hậu quả, khả năng xảy ra và khả năng phát hiện để tính risk priority number (RPN), hỗ trợ ưu tiên giảm thiểu.",
      "en": "FMEA lists potential failure modes, assesses their severity, occurrence probability, and detectability to compute a risk priority number (RPN), supporting mitigation prioritization.",
      "ja": "FMEAは潜在的な故障モードを列挙し、深刻度・発生確率・検出可能性を評価してリスク優先度数(RPN)を算出し、低減策の優先順位付けを支援する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một buổi risk workshop (hội thảo đánh giá rủi ro) đa chức năng, vai trò điển hình của Test Manager là gì?",
      "en": "In a cross-functional risk workshop, what is the typical role of the Test Manager?",
      "ja": "部門横断的なリスクワークショップにおいて、テストマネージャーの典型的な役割は何ですか。"
    },
    "options": [
      {
        "vi": "Tự mình quyết định toàn bộ mức độ rủi ro mà không cần tham khảo ý kiến bên khác",
        "en": "Deciding all risk levels alone without consulting other parties",
        "ja": "他の関係者に相談せず、すべてのリスクレベルを一人で決定すること"
      },
      {
        "vi": "Chỉ ghi biên bản cuộc họp mà không đóng góp chuyên môn",
        "en": "Only taking meeting minutes without contributing expertise",
        "ja": "専門知識を提供せず、議事録を取るだけであること"
      },
      {
        "vi": "Từ chối tham gia vì đánh giá rủi ro là trách nhiệm của Product Owner",
        "en": "Declining to participate because risk assessment is the Product Owner's sole responsibility",
        "ja": "リスク評価はプロダクトオーナーのみの責任であるとして参加を拒否すること"
      },
      {
        "vi": "Điều phối/facilitate buổi thảo luận, thu thập ý kiến từ nhiều bên liên quan (dev, BA, khách hàng...) để xác định và thống nhất mức độ rủi ro",
        "en": "Facilitating the discussion and gathering input from multiple stakeholders (developers, BAs, customers...) to identify and agree on risk levels",
        "ja": "議論をファシリテートし、開発者・BA・顧客など複数の関係者から意見を集めてリスクレベルを特定・合意すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đánh giá rủi ro hiệu quả cần góc nhìn đa chức năng; Test Manager thường đóng vai trò điều phối để tổng hợp ý kiến khách quan, không tự quyết một mình.",
      "en": "Effective risk assessment requires cross-functional perspectives; the Test Manager typically facilitates to gather objective input rather than deciding alone.",
      "ja": "効果的なリスク評価には部門横断的な視点が必要であり、テストマネージャーは一人で決定するのではなく、客観的な意見を集めるためにファシリテーターの役割を担うことが多い。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Kỹ thuật nào sau đây thường được dùng để NHẬN DIỆN (identify) rủi ro sản phẩm trong giai đoạn đầu dự án?",
      "en": "Which technique is commonly used to IDENTIFY product risks early in a project?",
      "ja": "プロジェクトの初期段階でプロダクトリスクを特定するために一般的に使われる手法はどれですか。"
    },
    "options": [
      {
        "vi": "Brainstorming, phỏng vấn chuyên gia, checklist dựa trên kinh nghiệm dự án trước, và phân tích tài liệu yêu cầu",
        "en": "Brainstorming, expert interviews, checklists based on past project experience, and requirements document analysis",
        "ja": "ブレインストーミング、専門家へのインタビュー、過去のプロジェクト経験に基づくチェックリスト、要件文書の分析"
      },
      {
        "vi": "Chạy test hồi quy tự động trên toàn bộ hệ thống",
        "en": "Running automated regression tests across the whole system",
        "ja": "システム全体で自動回帰テストを実行すること"
      },
      {
        "vi": "Đo thời gian phản hồi của server dưới tải cao",
        "en": "Measuring server response time under high load",
        "ja": "高負荷時のサーバー応答時間を測定すること"
      },
      {
        "vi": "Đếm số dòng code đã viết trong sprint",
        "en": "Counting the number of lines of code written in a sprint",
        "ja": "スプリントで書かれたコード行数を数えること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nhận diện rủi ro là hoạt động định tính, thường thực hiện sớm bằng brainstorming, phỏng vấn, checklist, review tài liệu — trước khi có sản phẩm để đo hiệu năng.",
      "en": "Risk identification is a qualitative activity typically done early via brainstorming, interviews, checklists, and document review — before a working product exists for performance measurement.",
      "ja": "リスク特定は定性的な活動であり、性能測定が可能な稼働製品が存在する前の初期段階で、ブレインストーミング・インタビュー・チェックリスト・文書レビューによって行われることが多い。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi mức độ rủi ro của một hạng mục được đánh giá là RẤT CAO, phương pháp risk-based testing khuyến nghị điều gì?",
      "en": "When an item's risk level is assessed as VERY HIGH, what does risk-based testing recommend?",
      "ja": "ある項目のリスクレベルが「非常に高い」と評価された場合、リスクベースドテストは何を推奨しますか。"
    },
    "options": [
      {
        "vi": "Bỏ qua hạng mục đó vì quá phức tạp để test",
        "en": "Skip that item because it is too complex to test",
        "ja": "テストが複雑すぎるとしてその項目をスキップすること"
      },
      {
        "vi": "Áp dụng kỹ thuật test kỹ lưỡng hơn (nhiều kỹ thuật, độ bao phủ cao hơn) và thực hiện test sớm hơn trong lịch trình",
        "en": "Apply more rigorous test techniques (more techniques, higher coverage) and execute tests earlier in the schedule",
        "ja": "より厳密なテスト技法(より多くの技法、より高いカバレッジ)を適用し、スケジュールの早い段階でテストを実行すること"
      },
      {
        "vi": "Test hạng mục đó với cùng mức độ chi tiết như các hạng mục rủi ro thấp",
        "en": "Test the item with the same level of depth as low-risk items",
        "ja": "その項目を低リスク項目と同じ深さでテストすること"
      },
      {
        "vi": "Chuyển toàn bộ trách nhiệm test cho khách hàng thực hiện UAT",
        "en": "Transfer all testing responsibility to the customer to perform UAT",
        "ja": "テストの責任をすべて顧客のUATに移すこと"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "RBT khuyến nghị đầu tư effort/độ sâu test tỉ lệ thuận với mức rủi ro — rủi ro cao cần nhiều kỹ thuật, coverage cao và ưu tiên thực hiện sớm.",
      "en": "RBT recommends allocating test effort/depth proportional to risk level — high risk requires more techniques, higher coverage, and earlier execution priority.",
      "ja": "RBTはリスクレベルに比例してテスト工数・深さを配分することを推奨する。高リスク項目にはより多くの技法、高いカバレッジ、早期実行の優先度が必要である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Thuật ngữ 'residual risk' (rủi ro tồn đọng) trong risk-based testing đề cập đến điều gì?",
      "en": "What does the term 'residual risk' refer to in risk-based testing?",
      "ja": "リスクベースドテストにおける「残存リスク(residual risk)」という用語は何を指しますか。"
    },
    "options": [
      {
        "vi": "Rủi ro đã được xác định nhưng chưa từng được đánh giá",
        "en": "A risk that has been identified but never assessed",
        "ja": "特定されたが一度も評価されたことのないリスク"
      },
      {
        "vi": "Tổng số defect đã được sửa trong dự án",
        "en": "The total number of defects fixed in the project",
        "ja": "プロジェクトで修正された欠陥の総数"
      },
      {
        "vi": "Mức độ rủi ro còn lại sau khi đã áp dụng các biện pháp giảm thiểu (bao gồm testing), tại thời điểm ra quyết định release",
        "en": "The level of risk remaining after mitigation measures (including testing) have been applied, at the time of the release decision",
        "ja": "低減策(テストを含む)を適用した後、リリース判断の時点で残っているリスクのレベル"
      },
      {
        "vi": "Rủi ro chỉ xuất hiện sau khi sản phẩm đã ngừng vận hành",
        "en": "A risk that only appears after a product has been decommissioned",
        "ja": "製品の運用終了後にのみ現れるリスク"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Không thể loại bỏ hoàn toàn rủi ro; residual risk là phần còn lại sau mitigation, cần được truyền đạt rõ cho stakeholder khi quyết định release.",
      "en": "Risk can never be fully eliminated; residual risk is what remains after mitigation and must be clearly communicated to stakeholders when making the release decision.",
      "ja": "リスクを完全に排除することはできない。残存リスクは低減策適用後に残る部分であり、リリース判断の際にステークホルダーへ明確に伝える必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quản lý rủi ro dự án, 'risk owner' (chủ sở hữu rủi ro) chịu trách nhiệm chính về điều gì?",
      "en": "In project risk management, what is a 'risk owner' primarily responsible for?",
      "ja": "プロジェクトリスク管理において、「リスクオーナー」は主に何に責任を負いますか。"
    },
    "options": [
      {
        "vi": "Viết toàn bộ test case liên quan đến rủi ro đó",
        "en": "Writing all test cases related to that risk",
        "ja": "そのリスクに関連するすべてのテストケースを作成すること"
      },
      {
        "vi": "Chỉ ghi nhận rủi ro vào sổ theo dõi mà không cần hành động gì thêm",
        "en": "Only recording the risk in a log with no further action required",
        "ja": "リスクを台帳に記録するだけで、それ以上の行動は不要であること"
      },
      {
        "vi": "Phê duyệt ngân sách chung của toàn dự án",
        "en": "Approving the overall project budget",
        "ja": "プロジェクト全体の予算を承認すること"
      },
      {
        "vi": "Theo dõi tình trạng rủi ro và đảm bảo các hành động giảm thiểu/ứng phó được thực hiện đúng hạn",
        "en": "Monitoring the risk's status and ensuring mitigation/response actions are carried out on time",
        "ja": "リスクの状況を監視し、低減・対応策が期限通りに実行されることを確実にすること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Risk owner là người được giao trách nhiệm quản lý một rủi ro cụ thể xuyên suốt vòng đời — theo dõi, cập nhật, đảm bảo mitigation action được thực hiện, không nhất thiết tự viết test case.",
      "en": "The risk owner is assigned to manage a specific risk throughout its lifecycle — tracking, updating, and ensuring mitigation actions are executed, not necessarily writing test cases themselves.",
      "ja": "リスクオーナーは特定のリスクをライフサイクル全体にわたって管理する責任者であり、追跡・更新・低減策の実行確認を行う。必ずしも自らテストケースを作成するわけではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong dự án Agile/lặp, khi nào nhóm nên đánh giá lại (re-assess) mức độ rủi ro sản phẩm?",
      "en": "In an Agile/iterative project, when should the team re-assess product risk levels?",
      "ja": "アジャイル/反復型プロジェクトにおいて、チームはいつプロダクトリスクレベルを再評価すべきですか。"
    },
    "options": [
      {
        "vi": "Định kỳ và liên tục trong suốt dự án, đặc biệt khi có thông tin mới (yêu cầu thay đổi, defect nghiêm trọng phát sinh, thay đổi kiến trúc...)",
        "en": "Continuously and periodically throughout the project, especially when new information emerges (changed requirements, severe defects, architecture changes...)",
        "ja": "プロジェクト全体を通じて継続的・定期的に、特に新しい情報(要件変更、重大な欠陥、アーキテクチャの変更など)が得られた際に"
      },
      {
        "vi": "Chỉ một lần duy nhất vào đầu dự án và không bao giờ thay đổi",
        "en": "Only once at the very start of the project, never to be changed again",
        "ja": "プロジェクト開始時に一度だけ行い、その後は変更しない"
      },
      {
        "vi": "Chỉ khi khách hàng yêu cầu bằng văn bản chính thức",
        "en": "Only when the customer submits a formal written request",
        "ja": "顧客から正式な書面の要求があった場合のみ"
      },
      {
        "vi": "Chỉ sau khi sản phẩm đã được release ra thị trường",
        "en": "Only after the product has already been released to the market",
        "ja": "製品が市場にリリースされた後にのみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rủi ro là động, thay đổi theo thời gian; best practice là re-assess liên tục/định kỳ (VD mỗi sprint) khi có thông tin mới để cập nhật ưu tiên test.",
      "en": "Risk is dynamic and changes over time; best practice is to re-assess continuously/periodically (e.g., each sprint) as new information arrives, updating test priorities.",
      "ja": "リスクは時間とともに変化する動的なものであり、新しい情報が得られるたびに(例:各スプリントごとに)継続的・定期的に再評価し、テストの優先順位を更新することがベストプラクティスである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ví dụ nào sau đây là một RỦI RO SẢN PHẨM (product risk) điển hình, không phải rủi ro dự án?",
      "en": "Which of the following is a typical PRODUCT risk, not a project risk?",
      "ja": "次のうち、プロジェクトリスクではなく典型的な「プロダクトリスク」はどれですか。"
    },
    "options": [
      {
        "vi": "Nhà tài trợ dự án cắt giảm ngân sách giữa chừng",
        "en": "The project sponsor cuts the budget midway through the project",
        "ja": "プロジェクトスポンサーが途中で予算を削減する"
      },
      {
        "vi": "Module tính toán lãi suất có thể trả về kết quả sai trong một số trường hợp biên do thuật toán làm tròn phức tạp",
        "en": "The interest calculation module may return incorrect results in certain edge cases due to complex rounding logic",
        "ja": "複雑な丸め処理のロジックにより、利息計算モジュールが一部の境界ケースで誤った結果を返す可能性がある"
      },
      {
        "vi": "Thành viên chủ chốt của team nghỉ việc giữa dự án",
        "en": "A key team member leaves the project midway",
        "ja": "チームの主要メンバーがプロジェクト途中で離脱する"
      },
      {
        "vi": "Lịch trình dự án bị trễ do thay đổi phạm vi liên tục",
        "en": "The project schedule slips due to continuous scope changes",
        "ja": "継続的なスコープ変更によりプロジェクトスケジュールが遅延する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Product risk liên quan trực tiếp đến chất lượng/hành vi của sản phẩm (VD: lỗi tính toán); các lựa chọn còn lại là project risk (nhân sự, ngân sách, lịch trình).",
      "en": "Product risk relates directly to the product's quality/behavior (e.g., calculation defects); the other options are project risks (staffing, budget, schedule).",
      "ja": "プロダクトリスクは製品の品質・動作に直接関わる(例:計算の欠陥)。他の選択肢はプロジェクトリスク(要員、予算、スケジュール)である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ví dụ nào sau đây thể hiện một RỦI RO DỰ ÁN (project risk) mang tính tổ chức/con người?",
      "en": "Which example illustrates an organizational/human PROJECT risk?",
      "ja": "次のうち、組織的・人的な「プロジェクトリスク」を示す例はどれですか。"
    },
    "options": [
      {
        "vi": "Giao diện người dùng khó sử dụng đối với người cao tuổi",
        "en": "The user interface is difficult for elderly users",
        "ja": "ユーザーインターフェースが高齢者にとって使いにくい"
      },
      {
        "vi": "Hệ thống không đáp ứng được yêu cầu bảo mật dữ liệu khách hàng",
        "en": "The system fails to meet customer data security requirements",
        "ja": "システムが顧客データのセキュリティ要件を満たしていない"
      },
      {
        "vi": "Nhóm phát triển và nhóm test ở hai múi giờ khác nhau khiến việc phối hợp và trao đổi thông tin bị chậm trễ",
        "en": "The development team and test team are in different time zones, causing delays in coordination and communication",
        "ja": "開発チームとテストチームが異なるタイムゾーンにいるため、連携と情報共有が遅延する"
      },
      {
        "vi": "Chức năng tìm kiếm trả về kết quả không chính xác khi dữ liệu lớn",
        "en": "The search function returns inaccurate results with large data volumes",
        "ja": "検索機能が大量データの場合に不正確な結果を返す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Rủi ro tổ chức/con người (giao tiếp, múi giờ, kỹ năng, nhân sự) là project risk vì ảnh hưởng đến khả năng dự án hoàn thành đúng kế hoạch, khác với product risk liên quan chất lượng sản phẩm.",
      "en": "Organizational/human risks (communication, time zones, skills, staffing) are project risks because they affect the project's ability to complete on plan, unlike product risk which concerns product quality.",
      "ja": "組織的・人的リスク(コミュニケーション、タイムゾーン、スキル、要員)は、計画通りにプロジェクトを完了する能力に影響するためプロジェクトリスクである。一方、プロダクトリスクは製品品質に関するものである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Sự khác biệt giữa 'mitigation plan' (kế hoạch giảm thiểu) và 'contingency plan' (kế hoạch dự phòng) trong quản lý rủi ro là gì?",
      "en": "What is the difference between a 'mitigation plan' and a 'contingency plan' in risk management?",
      "ja": "リスク管理における「低減計画(mitigation plan)」と「コンティンジェンシープラン(contingency plan)」の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Hai thuật ngữ này hoàn toàn đồng nghĩa và có thể dùng thay thế nhau trong mọi ngữ cảnh",
        "en": "The two terms are completely synonymous and interchangeable in every context",
        "ja": "この2つの用語は完全に同義であり、あらゆる文脈で互換的に使用できる"
      },
      {
        "vi": "Mitigation plan chỉ áp dụng cho rủi ro dự án, contingency plan chỉ áp dụng cho rủi ro sản phẩm",
        "en": "Mitigation plans apply only to project risk, contingency plans only to product risk",
        "ja": "低減計画はプロジェクトリスクのみに適用され、コンティンジェンシープランはプロダクトリスクのみに適用される"
      },
      {
        "vi": "Contingency plan được thực hiện trước khi rủi ro xảy ra để phòng ngừa, còn mitigation plan chỉ thực hiện sau khi rủi ro đã xảy ra",
        "en": "Contingency plans are executed before the risk occurs to prevent it, while mitigation plans are only executed after the risk has occurred",
        "ja": "コンティンジェンシープランはリスク発生前に予防のために実行され、低減計画はリスク発生後にのみ実行される"
      },
      {
        "vi": "Mitigation plan là hành động chủ động nhằm giảm khả năng hoặc hậu quả của rủi ro trước khi nó xảy ra; contingency plan là hành động dự phòng được kích hoạt SAU KHI rủi ro đã thực sự xảy ra",
        "en": "A mitigation plan is a proactive action taken to reduce the likelihood or impact of a risk before it occurs; a contingency plan is a fallback action triggered AFTER the risk has actually occurred",
        "ja": "低減計画はリスクが発生する前にその発生可能性や影響度を減らすための能動的な対策であり、コンティンジェンシープランはリスクが実際に発生した「後」に発動される対応策である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mitigation = phòng ngừa trước (proactive); contingency = kế hoạch 'nếu rủi ro xảy ra thì làm gì' (reactive), được kích hoạt khi rủi ro trở thành hiện thực.",
      "en": "Mitigation = proactive prevention beforehand; contingency = a reactive 'what to do if the risk occurs' plan, triggered once the risk materializes.",
      "ja": "低減策は事前の能動的な予防であり、コンティンジェンシープランはリスクが実際に発生した際に発動される「発生したらどうするか」の対応計画である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi báo cáo tiến độ kiểm thử dựa trên rủi ro cho stakeholder, thông tin nào là quan trọng nhất cần truyền đạt?",
      "en": "When reporting risk-based testing progress to stakeholders, what information is most important to convey?",
      "ja": "リスクベースドテストの進捗をステークホルダーに報告する際、最も重要に伝えるべき情報は何ですか。"
    },
    "options": [
      {
        "vi": "Mức độ rủi ro đã được giảm thiểu ở mỗi hạng mục, cùng với rủi ro còn tồn đọng chưa được test đầy đủ",
        "en": "The level of risk that has been reduced for each item, along with residual risk that has not been fully tested",
        "ja": "各項目で低減されたリスクのレベルと、十分にテストされていない残存リスク"
      },
      {
        "vi": "Số lượng dòng code mà lập trình viên đã viết trong sprint",
        "en": "The number of lines of code written by developers in the sprint",
        "ja": "スプリントで開発者が書いたコード行数"
      },
      {
        "vi": "Danh sách tên tất cả tester tham gia dự án",
        "en": "The list of names of all testers involved in the project",
        "ja": "プロジェクトに関わったすべてのテスターの氏名リスト"
      },
      {
        "vi": "Chi phí mua bản quyền công cụ test",
        "en": "The cost of purchasing test tool licenses",
        "ja": "テストツールのライセンス購入費用"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Báo cáo dựa trên rủi ro giúp stakeholder ra quyết định release dựa trên hiểu biết về mức rủi ro đã giảm và rủi ro còn lại — đây là giá trị cốt lõi của RBT reporting.",
      "en": "Risk-based reporting helps stakeholders make release decisions based on understanding of reduced risk versus residual risk — the core value of RBT reporting.",
      "ja": "リスクベースの報告は、低減されたリスクと残存リスクの理解に基づいてステークホルダーがリリース判断を行うのに役立つ。これがRBT報告の中心的な価値である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong risk-based testing, tiêu chí kết thúc kiểm thử (exit criteria) thường được xác định dựa trên điều gì?",
      "en": "In risk-based testing, exit criteria are typically defined based on what?",
      "ja": "リスクベースドテストにおいて、終了基準(exit criteria)は通常何に基づいて定義されますか。"
    },
    "options": [
      {
        "vi": "Số giờ làm việc mà tester đã đăng ký trong timesheet",
        "en": "The number of hours a tester has logged in their timesheet",
        "ja": "テスターがタイムシートに記録した作業時間数"
      },
      {
        "vi": "Mức độ rủi ro còn lại (residual risk) đã đạt đến ngưỡng có thể chấp nhận được đối với các hạng mục ưu tiên cao",
        "en": "Whether residual risk has been reduced to an acceptable threshold for high-priority items",
        "ja": "優先度の高い項目について、残存リスクが許容可能な閾値まで低減されたかどうか"
      },
      {
        "vi": "Số lượng test case đã viết, bất kể đã thực thi hay chưa",
        "en": "The number of test cases written, regardless of whether they were executed",
        "ja": "実行の有無に関わらず、作成されたテストケースの数"
      },
      {
        "vi": "Ý kiến cá nhân của một tester bất kỳ trong nhóm",
        "en": "The personal opinion of any one tester on the team",
        "ja": "チーム内の特定のテスター一人の個人的な意見"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Exit criteria trong RBT thường gắn với mức rủi ro chấp nhận được đã giảm xuống đủ thấp cho các hạng mục rủi ro cao, chứ không chỉ dựa trên số liệu hành chính.",
      "en": "RBT exit criteria are tied to residual risk being reduced to an acceptable level for high-risk items, not merely administrative metrics.",
      "ja": "RBTの終了基準は、高リスク項目について残存リスクが許容可能なレベルまで低減されたかどうかに結び付けられ、単なる管理指標ではない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi đánh giá 'impact' (mức độ tác động) của một rủi ro sản phẩm, tiêu chí nào sau đây thường được xem xét?",
      "en": "When assessing the 'impact' of a product risk, which criteria are typically considered?",
      "ja": "プロダクトリスクの「影響度(impact)」を評価する際、通常どのような基準が考慮されますか。"
    },
    "options": [
      {
        "vi": "Số dòng code của module tương ứng",
        "en": "The number of lines of code in the corresponding module",
        "ja": "該当モジュールのコード行数"
      },
      {
        "vi": "Tên của lập trình viên viết module đó",
        "en": "The name of the developer who wrote that module",
        "ja": "そのモジュールを書いた開発者の氏名"
      },
      {
        "vi": "Mức độ quan trọng đối với nghiệp vụ (business criticality), tần suất sử dụng chức năng, và mức độ hiển thị/ảnh hưởng đến khách hàng",
        "en": "Business criticality, frequency of use of the function, and visibility/impact on customers",
        "ja": "業務上の重要性、機能の使用頻度、および顧客への可視性・影響度"
      },
      {
        "vi": "Ngày mà module được commit lần đầu tiên vào source control",
        "en": "The date the module was first committed to source control",
        "ja": "モジュールが最初にソース管理にコミットされた日付"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Impact thường được đánh giá qua các heuristic như tầm quan trọng nghiệp vụ, tần suất sử dụng, mức độ ảnh hưởng thương hiệu/khách hàng — không liên quan đến các yếu tố kỹ thuật hành chính như số dòng code.",
      "en": "Impact is typically assessed via heuristics like business criticality, usage frequency, and brand/customer impact — not administrative technical factors like line count.",
      "ja": "影響度は通常、業務上の重要性、使用頻度、ブランド・顧客への影響といったヒューリスティックで評価され、コード行数のような管理的・技術的要素には基づかない。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Dữ liệu nào có thể hỗ trợ đánh giá 'likelihood' (khả năng xảy ra) của một rủi ro sản phẩm một cách khách quan hơn?",
      "en": "What data can help assess the 'likelihood' of a product risk more objectively?",
      "ja": "プロダクトリスクの「発生可能性(likelihood)」をより客観的に評価するのに役立つデータはどれですか。"
    },
    "options": [
      {
        "vi": "Sở thích cá nhân của Product Owner",
        "en": "The personal preferences of the Product Owner",
        "ja": "プロダクトオーナーの個人的な好み"
      },
      {
        "vi": "Màu sắc giao diện được thiết kế cho module đó",
        "en": "The interface color scheme designed for that module",
        "ja": "そのモジュール用に設計されたインターフェースの配色"
      },
      {
        "vi": "Số lượng cuộc họp đã tổ chức về module đó",
        "en": "The number of meetings held about that module",
        "ja": "そのモジュールについて開催された会議の回数"
      },
      {
        "vi": "Lịch sử defect trong các phiên bản trước, độ phức tạp kỹ thuật của module, và số lần thay đổi mã nguồn (code churn)",
        "en": "Defect history from previous releases, the technical complexity of the module, and the frequency of code changes (code churn)",
        "ja": "過去のリリースにおける欠陥履歴、モジュールの技術的複雑度、およびコード変更の頻度(コードチャーン)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Dữ liệu định lượng như lịch sử defect, độ phức tạp code, tần suất thay đổi giúp ước lượng likelihood khách quan hơn so với cảm tính chủ quan.",
      "en": "Quantitative data like defect history, code complexity, and change frequency provide a more objective likelihood estimate than subjective feeling.",
      "ja": "欠陥履歴、コードの複雑度、変更頻度といった定量的データは、主観的な感覚よりも客観的な発生可能性の見積もりを可能にする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi nào nhóm dự án nên cân nhắc dùng ma trận rủi ro chi tiết hơn (VD: thang 5x5) thay vì thang đơn giản (VD: 3x3 Cao/Trung bình/Thấp)?",
      "en": "When should a project team consider using a more granular risk matrix (e.g., a 5x5 scale) instead of a simple scale (e.g., 3x3 High/Medium/Low)?",
      "ja": "プロジェクトチームは、単純な尺度(例:3×3の高/中/低)ではなく、より詳細なリスクマトリクス(例:5×5尺度)の使用をいつ検討すべきですか。"
    },
    "options": [
      {
        "vi": "Khi dự án có nhiều hạng mục rủi ro cần phân biệt mức ưu tiên chi tiết hơn để phân bổ nguồn lực chính xác hơn",
        "en": "When the project has many risk items that need finer-grained prioritization for more accurate resource allocation",
        "ja": "プロジェクトに多数のリスク項目があり、より正確な資源配分のためにきめ細かい優先順位付けが必要な場合"
      },
      {
        "vi": "Khi nhóm muốn giảm thời gian họp đánh giá rủi ro xuống mức tối thiểu",
        "en": "When the team wants to minimize the time spent in risk assessment meetings",
        "ja": "リスク評価会議に費やす時間を最小限にしたい場合"
      },
      {
        "vi": "Khi dự án chỉ có một hạng mục rủi ro duy nhất cần đánh giá",
        "en": "When the project has only a single risk item to assess",
        "ja": "プロジェクトに評価すべきリスク項目が一つしかない場合"
      },
      {
        "vi": "Khi không có đủ dữ liệu lịch sử để đánh giá rủi ro",
        "en": "When there is not enough historical data to assess risk",
        "ja": "リスクを評価するための十分な過去データがない場合"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thang chi tiết hơn (5x5) hữu ích khi cần phân giải rủi ro tinh hơn giữa nhiều hạng mục; với dự án nhỏ/ít hạng mục hoặc thiếu dữ liệu, thang đơn giản 3x3 thường phù hợp và dễ áp dụng hơn.",
      "en": "A finer scale (5x5) helps distinguish risk levels among many items more precisely; for small projects or with limited data, a simple 3x3 scale is usually more practical.",
      "ja": "より詳細な尺度(5×5)は多数の項目間でリスクレベルをより精密に区別するのに役立つ。小規模プロジェクトやデータが限られている場合は、単純な3×3尺度の方が通常実用的である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Hoạt động phân tích rủi ro sản phẩm (Product Risk Analysis - PRA) nên được thực hiện vào thời điểm nào trong vòng đời phát triển?",
      "en": "At what point in the development lifecycle should Product Risk Analysis (PRA) be performed?",
      "ja": "プロダクトリスク分析(PRA)は開発ライフサイクルのどの時点で実施すべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ sau khi toàn bộ hệ thống đã được release ra production",
        "en": "Only after the entire system has been released to production",
        "ja": "システム全体が本番環境にリリースされた後にのみ"
      },
      {
        "vi": "Càng sớm càng tốt, ngay khi có tài liệu yêu cầu/thiết kế sơ bộ, và được cập nhật liên tục xuyên suốt dự án",
        "en": "As early as possible, as soon as requirements/preliminary design documents exist, and updated continuously throughout the project",
        "ja": "できるだけ早く、要件・予備設計文書が存在する時点で行い、プロジェクト全体を通じて継続的に更新する"
      },
      {
        "vi": "Chỉ trong giai đoạn UAT ngay trước khi release",
        "en": "Only during the UAT phase right before release",
        "ja": "リリース直前のUAT段階でのみ"
      },
      {
        "vi": "Chỉ khi có yêu cầu bắt buộc từ cơ quan kiểm toán bên ngoài",
        "en": "Only when required by an external audit body",
        "ja": "外部監査機関からの義務的な要求があった場合のみ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "PRA cần thực hiện sớm để định hướng chiến lược test và phân bổ nguồn lực ngay từ đầu, đồng thời liên tục cập nhật khi có thông tin mới trong suốt dự án.",
      "en": "PRA should be done early to guide test strategy and resource allocation from the outset, and continuously updated as new information emerges.",
      "ja": "PRAは初期段階からテスト戦略と資源配分の方向性を定めるために早期に実施し、新しい情報が得られるたびに継続的に更新すべきである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ngoài kiểm thử động (dynamic testing), biện pháp nào sau đây cũng giúp giảm thiểu rủi ro sản phẩm?",
      "en": "Besides dynamic testing, which of the following also helps mitigate product risk?",
      "ja": "動的テスト以外に、次のうちプロダクトリスクの低減にも役立つものはどれですか。"
    },
    "options": [
      {
        "vi": "Tăng số lượng cuộc họp trạng thái dự án hàng tuần",
        "en": "Increasing the number of weekly project status meetings",
        "ja": "週次のプロジェクト状況報告会議の回数を増やすこと"
      },
      {
        "vi": "Thuê thêm nhân sự bán hàng cho sản phẩm",
        "en": "Hiring additional sales staff for the product",
        "ja": "製品のために追加の営業担当者を雇用すること"
      },
      {
        "vi": "Thực hiện review tài liệu, static analysis mã nguồn, và walkthrough thiết kế để phát hiện sớm khiếm khuyết",
        "en": "Performing document reviews, static code analysis, and design walkthroughs to detect defects early",
        "ja": "文書レビュー、ソースコードの静的解析、設計ウォークスルーを実施して欠陥を早期に検出すること"
      },
      {
        "vi": "Trì hoãn ngày release cho đến khi không còn rủi ro nào",
        "en": "Delaying the release date until no risk remains",
        "ja": "リスクが完全になくなるまでリリース日を延期すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Các hoạt động tĩnh (static testing) như review, static analysis, walkthrough cũng là biện pháp giảm thiểu rủi ro hiệu quả, bổ sung cho dynamic testing, giúp phát hiện lỗi sớm hơn với chi phí thấp hơn.",
      "en": "Static activities like reviews, static analysis, and walkthroughs are also effective risk mitigation measures, complementing dynamic testing by finding defects earlier at lower cost.",
      "ja": "レビュー、静的解析、ウォークスルーといった静的活動も効果的なリスク低減策であり、動的テストを補完し、より低コストで欠陥を早期に発見できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Sau khi một defect nghiêm trọng được sửa gấp gần ngày release, rủi ro nào cần đặc biệt lưu ý và cách xử lý phù hợp là gì?",
      "en": "After a critical defect is urgently fixed close to the release date, which risk needs special attention and what is the appropriate response?",
      "ja": "リリース日直前に緊急で重大な欠陥が修正された後、特に注意すべきリスクと適切な対応は何ですか。"
    },
    "options": [
      {
        "vi": "Không cần lo lắng vì defect đã được xác nhận đã sửa bởi lập trình viên",
        "en": "No concern is needed since the developer confirmed the fix",
        "ja": "開発者が修正を確認したため、心配は不要である"
      },
      {
        "vi": "Rủi ro chỉ liên quan đến hiệu năng nên chỉ cần test hiệu năng",
        "en": "The risk is purely performance-related, so only performance testing is needed",
        "ja": "リスクは純粋に性能に関するものなので、性能テストのみが必要である"
      },
      {
        "vi": "Bỏ qua kiểm tra thêm vì đã gần deadline, ưu tiên release đúng hạn",
        "en": "Skip further checks since the deadline is near, prioritizing an on-time release",
        "ja": "締め切りが近いため追加の確認をスキップし、期限通りのリリースを優先する"
      },
      {
        "vi": "Rủi ro hồi quy (regression risk) do thay đổi có thể ảnh hưởng đến các chức năng liên quan khác; cần thực hiện kiểm thử hồi quy có mục tiêu (targeted regression) tương xứng với mức rủi ro của thay đổi",
        "en": "Regression risk — the change may affect other related functions; targeted regression testing proportional to the risk of the change should be performed",
        "ja": "リグレッションリスク——変更が他の関連機能に影響を及ぼす可能性があるため、変更のリスクに見合った的を絞ったリグレッションテストを実施すべきである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sửa lỗi gấp gần ngày release tiềm ẩn rủi ro hồi quy cao; RBT khuyến nghị đánh giá lại rủi ro của thay đổi và thực hiện regression testing có mục tiêu vào các vùng liên quan thay vì bỏ qua hoặc test tràn lan không định hướng.",
      "en": "Urgent fixes close to release carry high regression risk; RBT recommends re-assessing the change's risk and performing targeted regression testing on related areas rather than skipping checks or testing indiscriminately.",
      "ja": "リリース直前の緊急修正はリグレッションリスクが高い。RBTでは変更のリスクを再評価し、確認を省略したり無差別にテストしたりするのではなく、関連領域に的を絞ったリグレッションテストを実施することを推奨する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong risk-based testing, thứ tự thực hiện test case thường được sắp xếp như thế nào?",
      "en": "In risk-based testing, how is the execution order of test cases typically determined?",
      "ja": "リスクベースドテストにおいて、テストケースの実行順序は通常どのように決定されますか。"
    },
    "options": [
      {
        "vi": "Các test case liên quan đến hạng mục có risk exposure cao nhất được ưu tiên thực hiện trước",
        "en": "Test cases related to items with the highest risk exposure are prioritized for execution first",
        "ja": "リスクエクスポージャーが最も高い項目に関連するテストケースが最優先で実行される"
      },
      {
        "vi": "Test case được thực hiện theo thứ tự bảng chữ cái tên chức năng",
        "en": "Test cases are executed in alphabetical order of function names",
        "ja": "機能名のアルファベット順にテストケースが実行される"
      },
      {
        "vi": "Test case được thực hiện theo thứ tự ngẫu nhiên để đảm bảo tính khách quan",
        "en": "Test cases are executed in random order to ensure objectivity",
        "ja": "客観性を確保するため、テストケースはランダムな順序で実行される"
      },
      {
        "vi": "Test case dễ viết nhất luôn được ưu tiên thực hiện trước, bất kể mức độ rủi ro",
        "en": "The easiest test cases to write are always prioritized first, regardless of risk level",
        "ja": "リスクレベルに関係なく、書くのが最も簡単なテストケースが常に最優先される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "RBT sắp xếp thứ tự thực thi test theo mức risk exposure giảm dần, đảm bảo nếu thời gian bị cắt giảm, các rủi ro quan trọng nhất vẫn đã được kiểm tra.",
      "en": "RBT orders test execution by descending risk exposure so that if time is cut short, the most critical risks have already been checked.",
      "ja": "RBTはリスクエクスポージャーの高い順にテスト実行を並べるため、時間が不足した場合でも最も重要なリスクは既に確認済みとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi đưa ra quyết định release (go/no-go), điều gì Test Manager nên trình bày rõ ràng cho ban lãnh đạo về mặt rủi ro?",
      "en": "When making a go/no-go release decision, what should the Test Manager clearly present to leadership regarding risk?",
      "ja": "リリース可否(go/no-go)の判断を行う際、テストマネージャーはリスクに関して経営陣に何を明確に提示すべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ số hài lòng của tester đối với công cụ quản lý test",
        "en": "Tester satisfaction ratings for the test management tool",
        "ja": "テスト管理ツールに対するテスターの満足度評価"
      },
      {
        "vi": "Danh sách các rủi ro còn tồn đọng (chưa được giảm thiểu đầy đủ), mức độ nghiêm trọng của chúng, và khuyến nghị dựa trên bằng chứng test",
        "en": "A list of remaining residual risks (not yet fully mitigated), their severity, and evidence-based recommendations",
        "ja": "残存する(十分に低減されていない)リスクの一覧、その深刻度、および根拠に基づく推奨事項"
      },
      {
        "vi": "Toàn bộ mã nguồn chi tiết của các module đã test",
        "en": "The full detailed source code of the tested modules",
        "ja": "テスト済みモジュールの詳細なソースコード全体"
      },
      {
        "vi": "Lịch nghỉ phép của các thành viên trong nhóm test",
        "en": "The vacation schedule of the test team members",
        "ja": "テストチームメンバーの休暇スケジュール"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Quyết định go/no-go cần thông tin minh bạch về residual risk để lãnh đạo cân nhắc đánh đổi giữa thời gian ra mắt và rủi ro chấp nhận — đây là trách nhiệm giao tiếp quan trọng của Test Manager.",
      "en": "Go/no-go decisions require transparent information about residual risk so leadership can weigh time-to-market against acceptable risk — a key communication responsibility of the Test Manager.",
      "ja": "go/no-go判断には残存リスクに関する透明な情報が必要であり、経営陣が市場投入までの時間と許容可能なリスクを比較検討できるようにする。これはテストマネージャーの重要なコミュニケーション責任である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mục đích cốt lõi của việc thực hiện phân tích nguyên nhân gốc (root cause analysis) đối với các defect nghiêm trọng là gì?",
      "en": "What is the core purpose of performing root cause analysis (RCA) on severe defects?",
      "ja": "重大な欠陥に対して根本原因分析(RCA)を行う本来の目的は何ですか。"
    },
    "options": [
      {
        "vi": "Xác định ai chịu trách nhiệm để xử lý kỷ luật",
        "en": "Identify who is responsible in order to apply disciplinary action",
        "ja": "懲戒処分のために責任者を特定すること"
      },
      {
        "vi": "Tăng số lượng defect được ghi nhận để báo cáo tiến độ",
        "en": "Increase the number of logged defects to report progress",
        "ja": "進捗報告のために記録される欠陥数を増やすこと"
      },
      {
        "vi": "Tìm ra nguyên nhân sâu xa gây ra lỗi để ngăn ngừa lỗi tương tự tái diễn trong tương lai",
        "en": "Find the underlying cause of the defect in order to prevent similar defects from recurring in the future",
        "ja": "将来同様の欠陥が再発しないよう、欠陥を引き起こした根本的な原因を突き止めること"
      },
      {
        "vi": "Thay thế hoàn toàn việc kiểm thử xác nhận (confirmation testing)",
        "en": "Completely replace the need for confirmation testing",
        "ja": "確認テストを完全に不要にすること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "RCA hướng tới việc tìm nguyên nhân gốc rễ (không chỉ triệu chứng) để có hành động phòng ngừa, giảm defect tái diễn trong các dự án/giai đoạn tiếp theo, đây là hoạt động cải tiến quy trình chứ không phải quy trách nhiệm cá nhân.",
      "en": "RCA aims to find the true underlying cause (not just the symptom) so preventive actions can reduce recurrence in future projects/phases; it is a process improvement activity, not a blame exercise.",
      "ja": "RCAは症状ではなく真の根本原因を突き止め、今後のプロジェクトや工程での再発を防ぐ予防措置につなげることを目的とする。個人の責任追及ではなくプロセス改善活動である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Kỹ thuật '5 Whys' (5 lần hỏi Tại sao) phù hợp nhất trong tình huống nào khi phân tích nguyên nhân defect?",
      "en": "The '5 Whys' technique is most appropriate in which situation when analyzing a defect's root cause?",
      "ja": "欠陥の根本原因分析において「5つのなぜ(5 Whys)」手法が最も適しているのはどの状況ですか。"
    },
    "options": [
      {
        "vi": "Khi cần thiết kế test case theo kỹ thuật bảng quyết định",
        "en": "When needing to design test cases using the decision table technique",
        "ja": "デシジョンテーブル技法でテストケースを設計したい場合"
      },
      {
        "vi": "Khi cần phân loại hàng trăm defect theo nhiều chiều thuộc tính khác nhau cùng lúc",
        "en": "When needing to classify hundreds of defects along many attribute dimensions simultaneously",
        "ja": "数百件の欠陥を同時に複数の属性軸で分類したい場合"
      },
      {
        "vi": "Khi cần ước lượng effort kiểm thử còn lại của dự án",
        "en": "When needing to estimate the remaining test effort of a project",
        "ja": "プロジェクトの残りテスト工数を見積もりたい場合"
      },
      {
        "vi": "Khi cần đi sâu từng bước từ triệu chứng bề mặt đến nguyên nhân gốc cho một sự cố đơn lẻ, cụ thể",
        "en": "When needing to drill down step by step from a surface symptom to the root cause for a single, specific incident",
        "ja": "1つの具体的な事象について、表面的な症状から根本原因まで段階的に掘り下げたい場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "5 Whys là kỹ thuật hỏi lặp lại 'tại sao' để lần theo chuỗi nhân quả của một sự cố cụ thể, phù hợp phân tích sâu một trường hợp đơn lẻ hơn là xử lý dữ liệu lớn nhiều chiều.",
      "en": "5 Whys repeatedly asks 'why' to trace the causal chain of one specific incident, making it well suited for deep analysis of a single case rather than multi-dimensional large-scale data.",
      "ja": "5 Whysは「なぜ」を繰り返し問うことで、特定の1件の事象の因果連鎖をたどる手法であり、大量の多次元データ処理よりも単一事例の深掘り分析に適している。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một buổi họp phân tích nguyên nhân gốc, biểu đồ xương cá (Ishikawa/fishbone diagram) được sử dụng chủ yếu để làm gì?",
      "en": "In a root cause analysis session, what is the fishbone (Ishikawa) diagram primarily used for?",
      "ja": "根本原因分析のセッションにおいて、特性要因図(石川ダイアグラム/フィッシュボーン図)は主に何のために使われますか。"
    },
    "options": [
      {
        "vi": "Tổ chức và trực quan hóa các nhóm nguyên nhân tiềm năng (con người, quy trình, công cụ, môi trường...) dẫn đến một vấn đề cụ thể",
        "en": "Organize and visualize categories of potential causes (people, process, tools, environment, etc.) contributing to a specific problem",
        "ja": "特定の問題に寄与する潜在的な原因のカテゴリ(人、プロセス、ツール、環境など)を整理・可視化するため"
      },
      {
        "vi": "Đo lường thời gian trung bình để đóng một defect",
        "en": "Measure the average time to close a defect",
        "ja": "欠陥のクローズにかかる平均時間を測定するため"
      },
      {
        "vi": "Tính điểm rủi ro cho từng test case trong risk-based testing",
        "en": "Calculate a risk score for each test case in risk-based testing",
        "ja": "リスクベースドテストにおける各テストケースのリスクスコアを算出するため"
      },
      {
        "vi": "Vẽ luồng trạng thái vòng đời của defect từ New đến Closed",
        "en": "Draw the defect lifecycle state flow from New to Closed",
        "ja": "欠陥のライフサイクル状態をNewからClosedまで図示するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Fishbone diagram phân nhánh nguyên nhân theo các nhóm (ví dụ 6M: Man, Machine, Method, Material, Measurement, Environment) giúp nhóm brainstorm và không bỏ sót nguyên nhân tiềm ẩn.",
      "en": "The fishbone diagram branches causes into categories (e.g. the 6M's: Man, Machine, Method, Material, Measurement, Environment), helping teams brainstorm without missing potential causes.",
      "ja": "フィッシュボーン図は原因をカテゴリ(例:6M — 人、機械、方法、材料、測定、環境)ごとに枝分かれさせ、チームが潜在的な原因を漏れなくブレインストーミングするのに役立つ。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Chỉ số Defect Removal Efficiency (DRE) thể hiện điều gì?",
      "en": "What does the Defect Removal Efficiency (DRE) metric represent?",
      "ja": "欠陥除去効率(Defect Removal Efficiency, DRE)指標は何を表しますか。"
    },
    "options": [
      {
        "vi": "Tổng số defect được ghi nhận trong toàn bộ vòng đời sản phẩm",
        "en": "The total number of defects logged across the entire product lifecycle",
        "ja": "製品ライフサイクル全体で記録された欠陥の総数"
      },
      {
        "vi": "Tỷ lệ phần trăm defect được phát hiện và xử lý trước khi bàn giao so với tổng số defect (bao gồm cả defect bị escape ra production)",
        "en": "The percentage of defects found and resolved before release, out of the total defects (including those that escaped to production)",
        "ja": "リリース前に発見・対応された欠陥の割合を、本番環境へ流出した欠陥も含めた総欠陥数に対して算出したもの"
      },
      {
        "vi": "Tỷ lệ số test case được thực thi trên tổng số test case đã thiết kế",
        "en": "The ratio of executed test cases to total designed test cases",
        "ja": "設計済みテストケースに対する実行済みテストケースの割合"
      },
      {
        "vi": "Thời gian trung bình một tester dành ra để ghi nhận một defect",
        "en": "The average time a tester spends logging a single defect",
        "ja": "テスターが1件の欠陥を記録するのにかける平均時間"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "DRE = (defect tìm thấy trước release) / (defect trước release + defect escape sau release) x 100%. Chỉ số này đánh giá hiệu quả của quá trình kiểm thử trong việc chặn defect trước khi đến tay người dùng.",
      "en": "DRE = (defects found before release) / (defects found before release + defects escaped after release) x 100%. It evaluates how effectively testing catches defects before they reach users.",
      "ja": "DRE = (リリース前に発見された欠陥数) / (リリース前発見数 + リリース後流出数) × 100%。この指標はテストプロセスがユーザーに届く前に欠陥をどれだけ効果的に捕捉できたかを評価する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Defect density thường được tính bằng công thức nào?",
      "en": "Defect density is typically calculated using which formula?",
      "ja": "欠陥密度は通常どのような式で計算されますか。"
    },
    "options": [
      {
        "vi": "Tổng thời gian kiểm thử chia cho số lượng defect tìm thấy",
        "en": "Total testing time divided by the number of defects found",
        "ja": "総テスト時間を発見された欠陥数で割ったもの"
      },
      {
        "vi": "Số defect được tìm thấy chia cho số lượng tester tham gia dự án",
        "en": "Number of defects found divided by the number of testers on the project",
        "ja": "発見された欠陥数をプロジェクトのテスター数で割ったもの"
      },
      {
        "vi": "Số defect được tìm thấy chia cho kích thước sản phẩm (ví dụ: số dòng code, số function point, hoặc số requirement)",
        "en": "Number of defects found divided by the size of the product (e.g. lines of code, function points, or number of requirements)",
        "ja": "発見された欠陥数を製品の規模(コード行数、ファンクションポイント、要件数など)で割ったもの"
      },
      {
        "vi": "Số defect được đóng chia cho số defect được mở lại (re-open)",
        "en": "Number of closed defects divided by the number of reopened defects",
        "ja": "クローズされた欠陥数を再オープンされた欠陥数で割ったもの"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Defect density chuẩn hóa số lượng defect theo kích thước sản phẩm, giúp so sánh chất lượng giữa các module/release có quy mô khác nhau một cách công bằng hơn.",
      "en": "Defect density normalizes the defect count by product size, allowing a fairer quality comparison across modules or releases of different sizes.",
      "ja": "欠陥密度は欠陥数を製品規模で正規化するため、規模の異なるモジュールやリリース間で品質をより公平に比較できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Chỉ số 'defect leakage' (defect escape) đo lường điều gì trong quản lý chất lượng?",
      "en": "What does the 'defect leakage' (defect escape) metric measure in quality management?",
      "ja": "品質管理における「欠陥流出(defect leakage)」指標は何を測定しますか。"
    },
    "options": [
      {
        "vi": "Số defect được phát hiện trong giai đoạn unit test",
        "en": "The number of defects found during unit testing",
        "ja": "ユニットテストで発見された欠陥数"
      },
      {
        "vi": "Tốc độ log defect trung bình mỗi ngày của nhóm kiểm thử",
        "en": "The average daily rate at which the test team logs defects",
        "ja": "テストチームが1日あたりに欠陥を記録する平均速度"
      },
      {
        "vi": "Tổng số test case bị fail trong lần chạy regression cuối cùng",
        "en": "The total number of failed test cases in the final regression run",
        "ja": "最終リグレッション実行で失敗したテストケースの総数"
      },
      {
        "vi": "Số defect vượt qua một giai đoạn/mức kiểm thử mà lẽ ra phải được phát hiện ở giai đoạn đó, và bị phát hiện ở giai đoạn sau (kể cả production)",
        "en": "The number of defects that slip past a test phase/level where they should have been caught, and are instead found in a later phase (including production)",
        "ja": "本来その段階で発見されるべきだった欠陥が見逃され、後の段階(本番環境を含む)で発見された欠陥の数"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Defect leakage cho biết hiệu quả 'chặn lỗi' của một giai đoạn kiểm thử; tỷ lệ leakage cao cho thấy giai đoạn đó cần cải tiến kỹ thuật kiểm thử hoặc phạm vi coverage.",
      "en": "Defect leakage indicates how well a test phase 'contains' defects; a high leakage rate signals that the phase needs improved test techniques or coverage.",
      "ja": "欠陥流出は各テスト段階がどれだけ欠陥を「せき止め」られているかを示し、流出率が高い場合はそのテスト段階の技法やカバレッジの改善が必要であることを意味する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quản lý defect, 'defect age' khác với 'defect turnaround time' như thế nào?",
      "en": "In defect management, how does 'defect age' differ from 'defect turnaround time'?",
      "ja": "欠陥管理において「defect age(欠陥の経過日数)」は「defect turnaround time(欠陥対応時間)」とどう違いますか。"
    },
    "options": [
      {
        "vi": "Defect age là khoảng thời gian defect còn ở trạng thái mở (open) tính đến hiện tại, còn defect turnaround time là khoảng thời gian từ lúc phát hiện đến lúc đóng defect hoàn toàn",
        "en": "Defect age is the length of time a defect has remained open up to the present, whereas defect turnaround time is the duration from when a defect is found to when it is fully closed",
        "ja": "defect ageは欠陥が現時点までオープン状態のままである期間を指し、defect turnaround timeは欠陥が発見されてから完全にクローズされるまでの期間を指す"
      },
      {
        "vi": "Hai chỉ số này hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are exactly the same metric, just with different names",
        "ja": "両者は全く同じ指標であり、名称が異なるだけである"
      },
      {
        "vi": "Defect age chỉ áp dụng cho defect nghiêm trọng (critical), turnaround time áp dụng cho mọi mức độ",
        "en": "Defect age only applies to critical severity defects, while turnaround time applies to all severities",
        "ja": "defect ageは致命的(critical)な欠陥にのみ適用され、turnaround timeは全ての重大度に適用される"
      },
      {
        "vi": "Defect age đo bằng số lượng test case, turnaround time đo bằng số lượng người tham gia",
        "en": "Defect age is measured in number of test cases, while turnaround time is measured in number of people involved",
        "ja": "defect ageはテストケース数で測定され、turnaround timeは関与した人数で測定される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Defect age là chỉ số theo dõi defect còn tồn đọng (open) — càng lâu càng đáng lo ngại; turnaround time là chỉ số đo hiệu suất xử lý từ đầu đến cuối của một defect đã hoàn tất vòng đời.",
      "en": "Defect age tracks how long a defect has remained unresolved (open) — the longer, the more concerning; turnaround time measures the end-to-end processing performance of a defect that has completed its lifecycle.",
      "ja": "defect ageは未解決(オープン)のまま経過した期間を追跡する指標であり、長いほど懸念が大きい。turnaround timeはライフサイクルを完了した欠陥の発見からクローズまでの処理性能を測る指標である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Áp dụng nguyên tắc Pareto (80/20) vào phân tích dữ liệu defect thường dẫn đến kết luận nào sau đây?",
      "en": "Applying the Pareto principle (80/20) to defect data analysis typically leads to which conclusion?",
      "ja": "パレートの法則(80/20)を欠陥データ分析に適用すると、通常どのような結論に至りますか。"
    },
    "options": [
      {
        "vi": "Mọi module trong hệ thống đều có số lượng defect gần bằng nhau",
        "en": "Every module in the system has roughly the same number of defects",
        "ja": "システム内のすべてのモジュールがほぼ同数の欠陥を持つ"
      },
      {
        "vi": "Phần lớn defect (khoảng 80%) thường tập trung ở một số ít module hoặc nguyên nhân gốc (khoảng 20%), giúp ưu tiên nguồn lực khắc phục vào đúng chỗ",
        "en": "The majority of defects (roughly 80%) tend to concentrate in a small number of modules or root causes (roughly 20%), helping prioritize remediation resources effectively",
        "ja": "欠陥の大部分(約80%)は少数のモジュールや根本原因(約20%)に集中する傾向があり、これにより是正リソースを適切な箇所に優先配分できる"
      },
      {
        "vi": "Chi phí sửa defect luôn giống nhau ở mọi giai đoạn phát triển",
        "en": "The cost of fixing a defect is always the same regardless of the development phase",
        "ja": "欠陥修正のコストは開発のどの段階でも常に同じである"
      },
      {
        "vi": "Số lượng defect luôn tỷ lệ thuận với số dòng code của module",
        "en": "The number of defects is always directly proportional to the module's lines of code",
        "ja": "欠陥数は常にモジュールのコード行数に正比例する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây chính là nguyên tắc defect clustering kết hợp Pareto: tập trung phân tích và cải tiến vào số ít nguyên nhân/module gây ra phần lớn defect sẽ mang lại hiệu quả cao nhất.",
      "en": "This reflects the defect clustering principle combined with Pareto: focusing analysis and improvement on the small number of causes/modules responsible for most defects yields the highest return.",
      "ja": "これは欠陥の集中(クラスタリング)原則とパレートの法則を組み合わせたものであり、大部分の欠陥を引き起こす少数の原因・モジュールに分析と改善を集中させることが最も効果的である。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Nguyên tắc kiểm thử 'defect clustering' có liên hệ như thế nào với việc lập kế hoạch phân tích nguyên nhân gốc?",
      "en": "How does the 'defect clustering' testing principle relate to planning root cause analysis?",
      "ja": "テストの原則である「欠陥の集中(defect clustering)」は、根本原因分析の計画立案とどのように関連しますか。"
    },
    "options": [
      {
        "vi": "Nó yêu cầu tất cả module phải được test với cùng một số lượng test case bất kể mức độ rủi ro",
        "en": "It requires that all modules be tested with the same number of test cases regardless of risk",
        "ja": "リスクにかかわらず全モジュールを同数のテストケースでテストすることを求める"
      },
      {
        "vi": "Nó khẳng định rằng defect luôn phân bố đều trên toàn bộ hệ thống nên không cần ưu tiên",
        "en": "It states that defects are always evenly distributed across the system, so no prioritization is needed",
        "ja": "欠陥は常にシステム全体に均等に分布するため、優先順位付けは不要であることを示す"
      },
      {
        "vi": "Nó gợi ý rằng nhóm nên tập trung điều tra sâu các module có mật độ defect cao bất thường, vì đó thường là dấu hiệu của vấn đề quy trình/thiết kế cục bộ cần được phân tích kỹ",
        "en": "It suggests the team should investigate modules with unusually high defect density more deeply, as this often signals a localized process/design issue worth analyzing",
        "ja": "異常に欠陥密度が高いモジュールを深く調査すべきことを示唆する。それはしばしば局所的なプロセスや設計上の問題を示すサインであり、詳細な分析に値する"
      },
      {
        "vi": "Nó thay thế hoàn toàn nhu cầu sử dụng kỹ thuật risk-based testing",
        "en": "It completely replaces the need for risk-based testing techniques",
        "ja": "リスクベースドテスト技法の必要性を完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Defect clustering (một trong 7 nguyên tắc kiểm thử) chỉ ra rằng phần lớn defect thường tập trung ở một số ít module; đây là gợi ý quan trọng để ưu tiên RCA và phân bổ nguồn lực kiểm thử.",
      "en": "Defect clustering (one of the seven testing principles) states that most defects tend to concentrate in a small number of modules; this is a key signal for prioritizing RCA and allocating test resources.",
      "ja": "欠陥の集中(7つのテスト原則の1つ)は、大部分の欠陥が少数のモジュールに集中する傾向があることを示す。これはRCAの優先順位付けやテストリソース配分における重要な手がかりとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Orthogonal Defect Classification (ODC) là gì?",
      "en": "What is Orthogonal Defect Classification (ODC)?",
      "ja": "直交欠陥分類(Orthogonal Defect Classification, ODC)とは何ですか。"
    },
    "options": [
      {
        "vi": "Một công cụ tự động hóa việc chạy lại test case khi có defect được sửa",
        "en": "A tool that automates re-running test cases when a defect is fixed",
        "ja": "欠陥修正時にテストケースを自動的に再実行するツール"
      },
      {
        "vi": "Một thuật toán tính điểm ưu tiên defect dựa trên severity nhân priority",
        "en": "An algorithm that calculates a defect priority score by multiplying severity and priority",
        "ja": "重大度と優先度を乗算して欠陥の優先度スコアを算出するアルゴリズム"
      },
      {
        "vi": "Một kỹ thuật thiết kế test case dựa trên cặp giá trị đầu vào trực giao (orthogonal array)",
        "en": "A test case design technique based on orthogonal arrays of input value pairs",
        "ja": "入力値の直交配列に基づくテストケース設計技法"
      },
      {
        "vi": "Một phương pháp phân loại defect theo các thuộc tính độc lập (trực giao) như loại lỗi, giai đoạn phát hiện, hoạt động gây lỗi... nhằm suy ra xu hướng và định hướng cải tiến quy trình từ dữ liệu tổng hợp",
        "en": "A method of classifying defects by independent (orthogonal) attributes such as defect type, phase found, triggering activity, etc., to infer trends and guide process improvement from aggregated data",
        "ja": "欠陥の種類、発見工程、誘発要因などの独立した(直交する)属性で欠陥を分類し、集計データから傾向を推測してプロセス改善の方向性を導く手法"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "ODC (do IBM phát triển) gán cho mỗi defect các thuộc tính độc lập nhau, cho phép phân tích thống kê trên tập dữ liệu lớn để phát hiện xu hướng quy trình mà không cần đọc chi tiết từng defect.",
      "en": "ODC (developed by IBM) tags each defect with mutually independent attributes, enabling statistical analysis over large defect sets to reveal process trends without reading every defect in detail.",
      "ja": "ODC(IBMが開発)は各欠陥に互いに独立した属性を付与し、個々の欠陥を詳細に読まなくても大量のデータセットから統計的にプロセス上の傾向を分析できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong bối cảnh nguồn lực RCA hạn chế, tiêu chí nào sau đây là hợp lý NHẤT để chọn defect cần phân tích nguyên nhân gốc?",
      "en": "With limited RCA resources, which criterion below is MOST reasonable for selecting which defects to root-cause?",
      "ja": "RCAのリソースが限られている場合、根本原因分析を行う欠陥を選定する基準として最も妥当なのは次のうちどれですか。"
    },
    "options": [
      {
        "vi": "Ưu tiên các defect có tác động nghiêm trọng, lặp lại nhiều lần, hoặc thuộc các cụm (cluster) chiếm tỷ trọng lớn theo phân tích Pareto",
        "en": "Prioritize defects with severe impact, recurring patterns, or belonging to clusters representing a large share per Pareto analysis",
        "ja": "影響が深刻な欠陥、繰り返し発生する欠陥、またはパレート分析で大きな割合を占めるクラスタに属する欠陥を優先する"
      },
      {
        "vi": "Chọn ngẫu nhiên defect để đảm bảo tính khách quan",
        "en": "Select defects randomly to ensure objectivity",
        "ja": "客観性を確保するため無作為に欠陥を選ぶ"
      },
      {
        "vi": "Chỉ chọn các defect được tìm thấy bởi tester cấp cao nhất trong nhóm",
        "en": "Only select defects found by the most senior tester on the team",
        "ja": "チーム内で最も上級のテスターが発見した欠陥のみを選ぶ"
      },
      {
        "vi": "Chọn các defect có ID nhỏ nhất trong hệ thống theo dõi",
        "en": "Select the defects with the lowest ID numbers in the tracking system",
        "ja": "追跡システムでID番号が最も小さい欠陥を選ぶ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "RCA nên tập trung vào những defect có giá trị phân tích cao nhất: tác động lớn, lặp lại, hoặc đại diện cho một cụm nguyên nhân phổ biến — tối ưu hóa hiệu quả sử dụng nguồn lực hạn chế.",
      "en": "RCA should target the defects with the highest analytical value: high impact, recurring, or representative of a common cluster — optimizing the use of limited resources.",
      "ja": "RCAは分析価値の高い欠陥、すなわち影響が大きい、繰り返し発生する、あるいは共通のクラスタを代表する欠陥に集中すべきであり、限られたリソースの活用を最適化できる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Khi phân tích dữ liệu defect, việc nhầm lẫn giữa 'correlation' (tương quan) và 'causation' (nhân quả) có thể dẫn đến hậu quả gì?",
      "en": "When analyzing defect data, confusing 'correlation' with 'causation' can lead to what consequence?",
      "ja": "欠陥データを分析する際、「相関(correlation)」と「因果関係(causation)」を混同すると、どのような結果につながる可能性がありますか。"
    },
    "options": [
      {
        "vi": "Không có hậu quả gì vì hai khái niệm này thực chất là một",
        "en": "No consequence, since the two concepts are actually identical",
        "ja": "両者は実質的に同一の概念であるため、結果には影響しない"
      },
      {
        "vi": "Có thể khiến nhóm áp dụng hành động khắc phục sai mục tiêu — xử lý yếu tố chỉ đi kèm với vấn đề chứ không thực sự gây ra vấn đề, khiến defect tương tự vẫn tiếp tục xảy ra",
        "en": "It can lead the team to apply corrective action against the wrong target — addressing a factor that merely coincides with the problem rather than causing it, so similar defects continue to occur",
        "ja": "チームが誤った対象に是正措置を講じる可能性がある。問題を実際に引き起こしているのではなく単に伴って現れているだけの要因に対処してしまい、同様の欠陥が発生し続けることになる"
      },
      {
        "vi": "Giúp tăng độ chính xác của việc ước lượng effort kiểm thử",
        "en": "It improves the accuracy of test effort estimation",
        "ja": "テスト工数見積もりの精度が向上する"
      },
      {
        "vi": "Chỉ ảnh hưởng đến tốc độ chạy test tự động, không ảnh hưởng đến RCA",
        "en": "It only affects automated test execution speed, not RCA",
        "ja": "自動テストの実行速度にのみ影響し、RCAには影響しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Hai biến có thể cùng biến thiên (tương quan) mà không có quan hệ nhân quả trực tiếp; RCA cần kiểm chứng nguyên nhân thật (ví dụ qua thực nghiệm, loại trừ biến gây nhiễu) trước khi hành động khắc phục.",
      "en": "Two variables can move together (correlation) without a direct causal link; RCA must validate the true cause (e.g. via experimentation, ruling out confounders) before applying corrective action.",
      "ja": "2つの変数は直接的な因果関係がなくても同時に変動する(相関)ことがある。RCAでは是正措置を講じる前に、実験や交絡因子の除外などにより真の原因を検証する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Tỷ lệ 'defect re-open rate' (defect bị mở lại) cao bất thường thường là dấu hiệu cảnh báo điều gì?",
      "en": "An unusually high 'defect re-open rate' is typically a warning sign of what?",
      "ja": "異常に高い「欠陥再オープン率(defect re-open rate)」は通常、何を警告するサインですか。"
    },
    "options": [
      {
        "vi": "Số lượng test case tự động hóa đang tăng nhanh",
        "en": "The number of automated test cases is rapidly increasing",
        "ja": "自動化されたテストケースの数が急速に増加していること"
      },
      {
        "vi": "Đội ngũ kiểm thử đang test quá kỹ so với yêu cầu",
        "en": "The test team is testing more thoroughly than required",
        "ja": "テストチームが要求以上に徹底的にテストしていること"
      },
      {
        "vi": "Bản sửa lỗi (fix) không giải quyết triệt để nguyên nhân gốc, môi trường test không ổn định, hoặc quy trình xác nhận sửa lỗi (confirmation testing) chưa đầy đủ",
        "en": "The fix is not addressing the true root cause, the test environment is unstable, or the confirmation testing process is inadequate",
        "ja": "修正が真の根本原因に対処できていないこと、テスト環境が不安定であること、または確認テストのプロセスが不十分であること"
      },
      {
        "vi": "Chỉ số defect density của dự án đang được cải thiện",
        "en": "The project's defect density metric is improving",
        "ja": "プロジェクトの欠陥密度指標が改善していること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Re-open rate cao thường phản ánh chất lượng fix kém (chưa giải quyết đúng root cause), môi trường test thiếu ổn định, hoặc quy trình xác nhận sửa lỗi lỏng lẻo — cần được đưa vào phạm vi RCA.",
      "en": "A high reopen rate usually reflects poor fix quality (root cause not truly addressed), unstable test environments, or a weak confirmation testing process — it should be brought into RCA scope.",
      "ja": "再オープン率が高いことは通常、修正の質が低い(根本原因が正しく解決されていない)こと、テスト環境が不安定であること、または確認テストのプロセスが甘いことを反映しており、RCAの対象に含めるべきである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong một buổi họp causal analysis (phân tích nguyên nhân) sau retrospective, vai trò chính của người điều phối (facilitator) là gì?",
      "en": "In a causal analysis meeting held after a retrospective, what is the primary role of the facilitator?",
      "ja": "レトロスペクティブ後に行われる原因分析(causal analysis)のミーティングにおいて、ファシリテーターの主な役割は何ですか。"
    },
    "options": [
      {
        "vi": "Tự quyết định nguyên nhân gốc mà không cần tham khảo ý kiến nhóm",
        "en": "Unilaterally decide the root cause without consulting the team",
        "ja": "チームに相談することなく、単独で根本原因を決定すること"
      },
      {
        "vi": "Chỉ ghi chép số liệu defect mà không tham gia thảo luận",
        "en": "Only record defect statistics without participating in the discussion",
        "ja": "議論には参加せず欠陥の統計値のみを記録すること"
      },
      {
        "vi": "Thay mặt nhóm phát triển viết lại toàn bộ code có lỗi",
        "en": "Rewrite all defective code on behalf of the development team",
        "ja": "開発チームに代わって欠陥のあるコードをすべて書き直すこと"
      },
      {
        "vi": "Dẫn dắt nhóm tập trung vào dữ liệu và sự kiện khách quan, tránh đổ lỗi cá nhân, và hướng cuộc thảo luận đến việc xác định nguyên nhân hệ thống cùng hành động cải tiến khả thi",
        "en": "Guide the team to focus on objective data and facts, avoid personal blame, and steer the discussion toward identifying systemic causes and actionable improvements",
        "ja": "チームが客観的なデータと事実に集中し、個人への非難を避け、システム的な原因の特定と実行可能な改善策の議論に導くこと"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Facilitator giữ cuộc họp tập trung, khách quan, tâm lý an toàn (không đổ lỗi cá nhân) để nhóm cùng khám phá nguyên nhân hệ thống và đề xuất hành động cải tiến quy trình khả thi.",
      "en": "The facilitator keeps the meeting focused, objective, and psychologically safe (no personal blame) so the team can jointly uncover systemic causes and propose actionable process improvements.",
      "ja": "ファシリテーターは会議を集中的かつ客観的、心理的に安全な状態(個人への非難をしない)に保ち、チームがシステム的な原因を共同で発見し、実行可能なプロセス改善策を提案できるようにする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong hệ thống theo dõi defect, thuộc tính 'phase injected' (giai đoạn tạo ra lỗi) khác với 'phase detected' (giai đoạn phát hiện lỗi) như thế nào, và vì sao sự khác biệt này quan trọng với RCA?",
      "en": "In a defect tracking system, how does the 'phase injected' attribute differ from 'phase detected', and why does this distinction matter for RCA?",
      "ja": "欠陥追跡システムにおいて、「フェーズ注入(phase injected、欠陥が作り込まれた工程)」属性は「フェーズ検出(phase detected、欠陥が発見された工程)」とどう違い、なぜこの違いがRCAにとって重要なのですか。"
    },
    "options": [
      {
        "vi": "Phase injected cho biết giai đoạn lỗi được đưa vào sản phẩm (vd: requirement, design, coding), còn phase detected là giai đoạn phát hiện; khoảng cách giữa hai giai đoạn này giúp đo 'độ trễ phát hiện' và định hướng cải tiến review/kiểm thử sớm",
        "en": "Phase injected indicates the phase where the defect was introduced (e.g. requirements, design, coding), while phase detected indicates when it was found; the gap between the two measures 'detection latency' and guides improvements to earlier review/testing",
        "ja": "フェーズ注入は欠陥が製品に作り込まれた工程(要件定義、設計、コーディングなど)を示し、フェーズ検出は発見された工程を示す。両者の差は「検出の遅れ」を測る指標となり、早期レビューやテストの改善方針を導く"
      },
      {
        "vi": "Chúng là một thuộc tính duy nhất, hệ thống chỉ cần lưu một trong hai",
        "en": "They are a single attribute; a system only needs to store one of the two",
        "ja": "両者は単一の属性であり、システムはどちらか一方だけを保存すればよい"
      },
      {
        "vi": "Phase injected chỉ áp dụng cho lỗi UI, phase detected chỉ áp dụng cho lỗi backend",
        "en": "Phase injected only applies to UI bugs, while phase detected only applies to backend bugs",
        "ja": "フェーズ注入はUIのバグにのみ適用され、フェーズ検出はバックエンドのバグにのみ適用される"
      },
      {
        "vi": "Cả hai thuộc tính đều do khách hàng tự khai báo khi báo lỗi",
        "en": "Both attributes are self-declared by the customer when reporting an issue",
        "ja": "両方の属性は顧客が問題を報告する際に自己申告するものである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "So sánh phase injected và phase detected là kỹ thuật cốt lõi của RCA/ODC: nếu khoảng cách quá lớn (ví dụ lỗi được đưa vào từ requirement nhưng mãi đến UAT mới phát hiện), đó là dấu hiệu cần tăng cường review/kiểm thử ở giai đoạn sớm.",
      "en": "Comparing phase injected vs. phase detected is a core RCA/ODC technique: a large gap (e.g. a defect injected at requirements but not found until UAT) signals a need for stronger reviews/testing earlier in the lifecycle.",
      "ja": "フェーズ注入とフェーズ検出を比較することはRCA/ODCの中核的な技法である。ギャップが大きい場合(例:要件定義で作り込まれた欠陥がUATまで発見されない)、より早い工程でのレビューやテストの強化が必要であることを示すサインとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Nguyên tắc 'chi phí sửa lỗi tăng theo giai đoạn phát hiện' (cost of defect increases over time) có ý nghĩa gì đối với việc lập kế hoạch RCA và phòng ngừa defect?",
      "en": "What does the principle 'the cost of a defect increases over time' imply for planning RCA and defect prevention?",
      "ja": "「欠陥修正コストは時間の経過とともに増大する」という原則は、RCAの計画立案や欠陥予防にとってどのような意味を持ちますか。"
    },
    "options": [
      {
        "vi": "Nó khẳng định rằng defect luôn nên được sửa ở giai đoạn production để tiết kiệm chi phí",
        "en": "It states that defects should always be fixed in production to save cost",
        "ja": "欠陥は常に本番環境で修正すべきであり、それによりコストを削減できることを示す"
      },
      {
        "vi": "Nó cho thấy defect được phát hiện càng muộn thì chi phí khắc phục (bao gồm rework, retest, ảnh hưởng khách hàng) càng lớn, do đó nên ưu tiên đầu tư vào các hoạt động phát hiện sớm như review, phân tích tĩnh và RCA chủ động",
        "en": "It shows that the later a defect is found, the higher the cost to fix it (including rework, retest, and customer impact), so investment should be prioritized in early-detection activities such as reviews, static analysis, and proactive RCA",
        "ja": "欠陥の発見が遅れるほど、修正コスト(手戻り、再テスト、顧客への影響を含む)が大きくなることを示しており、そのためレビュー、静的解析、積極的なRCAといった早期発見活動への投資を優先すべきである"
      },
      {
        "vi": "Nó không liên quan gì đến quyết định đầu tư vào review sớm hay kiểm thử tĩnh",
        "en": "It has no bearing on decisions to invest in early reviews or static testing",
        "ja": "早期レビューや静的テストへの投資判断とは無関係である"
      },
      {
        "vi": "Nó chỉ áp dụng cho dự án phát triển theo mô hình Waterfall, không áp dụng cho Agile",
        "en": "It only applies to Waterfall-model projects, not Agile",
        "ja": "ウォーターフォールモデルのプロジェクトにのみ適用され、アジャイルには適用されない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây là lập luận kinh tế cốt lõi cho đầu tư 'shift-left': phát hiện lỗi sớm (review, phân tích tĩnh) rẻ hơn nhiều so với sửa lỗi sau khi release; RCA chủ động giúp ngăn defect tái diễn thay vì chỉ chữa triệu chứng.",
      "en": "This is the core economic argument for 'shift-left' investment: catching defects early (reviews, static analysis) is far cheaper than fixing them after release; proactive RCA prevents recurrence rather than just treating symptoms.",
      "ja": "これは「シフトレフト」への投資を正当化する中核的な経済的論拠である。早期に欠陥を発見すること(レビューや静的解析)は、リリース後に修正するよりもはるかに安価である。積極的なRCAは症状への対処だけでなく再発防止にもつながる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Biểu đồ xu hướng defect (defect trend chart) theo thời gian mang lại giá trị gì cho việc ra quyết định của Test Manager?",
      "en": "What value does a defect trend chart over time provide for a Test Manager's decision-making?",
      "ja": "時間経過に伴う欠陥トレンドチャートは、テストマネージャーの意思決定にどのような価値をもたらしますか。"
    },
    "options": [
      {
        "vi": "Nó chỉ dùng để tính lương thưởng cho từng tester",
        "en": "It is only used to calculate individual tester bonuses",
        "ja": "個々のテスターの賞与を算出するためだけに使われる"
      },
      {
        "vi": "Nó thay thế hoàn toàn nhu cầu kiểm thử hồi quy trước khi release",
        "en": "It completely replaces the need for regression testing before release",
        "ja": "リリース前のリグレッションテストの必要性を完全になくす"
      },
      {
        "vi": "Giúp quan sát tốc độ phát hiện và đóng defect theo thời gian, từ đó nhận biết xu hướng hội tụ (dấu hiệu sẵn sàng release) hay bất thường (đột biến defect cần điều tra) để hỗ trợ quyết định go/no-go",
        "en": "It allows observation of defect discovery and closure rates over time, revealing convergence trends (a readiness signal for release) or anomalies (defect spikes needing investigation) to support go/no-go decisions",
        "ja": "時間経過に伴う欠陥の発見率とクローズ率を観察でき、収束傾向(リリース準備完了のサイン)や異常(調査が必要な欠陥の急増)を把握し、go/no-go判断を支援する"
      },
      {
        "vi": "Nó chỉ áp dụng cho dự án không có version control",
        "en": "It only applies to projects without version control",
        "ja": "バージョン管理を使用していないプロジェクトにのみ適用される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đường cong 'open vs closed defects' theo thời gian là công cụ kinh điển giúp Test Manager đánh giá độ ổn định của sản phẩm và hỗ trợ ra quyết định release dựa trên bằng chứng thay vì cảm tính.",
      "en": "The 'open vs. closed defects' curve over time is a classic tool that helps the Test Manager assess product stability and support evidence-based release decisions rather than gut feeling.",
      "ja": "時間経過に伴う「オープン欠陥数対クローズ欠陥数」の曲線は、テストマネージャーが製品の安定性を評価し、勘ではなくエビデンスに基づいたリリース判断を下すための古典的なツールである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Confirmation testing sau khi một defect được sửa khác gì so với regression testing liên quan đến defect đó?",
      "en": "How does confirmation testing after a defect fix differ from regression testing related to that defect?",
      "ja": "欠陥修正後の確認テストは、その欠陥に関連するリグレッションテストとどう違いますか。"
    },
    "options": [
      {
        "vi": "Hai loại kiểm thử này hoàn toàn giống nhau và luôn dùng chung một bộ test case",
        "en": "They are exactly the same and always use the same set of test cases",
        "ja": "両者は全く同じものであり、常に同じテストケースの集合を使用する"
      },
      {
        "vi": "Regression testing chỉ thực hiện thủ công, confirmation testing chỉ thực hiện tự động",
        "en": "Regression testing is always manual, while confirmation testing is always automated",
        "ja": "リグレッションテストは常に手動で行い、確認テストは常に自動で行う"
      },
      {
        "vi": "Confirmation testing chỉ áp dụng ở cấp độ unit test, không áp dụng ở cấp hệ thống",
        "en": "Confirmation testing only applies at the unit test level, not at the system level",
        "ja": "確認テストはユニットテストレベルにのみ適用され、システムレベルには適用されない"
      },
      {
        "vi": "Confirmation testing kiểm tra lại chính xác defect đã báo cáo để xác nhận nó đã được sửa đúng, trong khi regression testing kiểm tra xem việc sửa lỗi đó có gây ảnh hưởng ngoài ý muốn đến các chức năng khác không",
        "en": "Confirmation testing re-executes the exact scenario of the reported defect to confirm it has been correctly fixed, while regression testing checks whether the fix has caused unintended side effects on other functionality",
        "ja": "確認テストは報告された欠陥のシナリオを再実行し、正しく修正されたことを確認するものであり、リグレッションテストはその修正が他の機能に意図しない副作用を及ぼしていないかを確認するものである"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là hai hoạt động bổ sung cho nhau sau khi fix: confirmation (re-test) xác nhận đúng lỗi đã hết, regression đảm bảo fix không phá vỡ chức năng khác — cả hai đều là dữ liệu đầu vào quan trọng cho phân tích chất lượng fix trong RCA.",
      "en": "These are two complementary activities after a fix: confirmation (re-test) verifies the specific bug is gone, regression ensures the fix did not break other functionality — both feed important data into RCA's analysis of fix quality.",
      "ja": "この2つは修正後に互いを補完する活動である。確認テストは特定のバグが解消されたことを検証し、リグレッションテストは修正が他の機能を壊していないことを保証する。どちらもRCAにおける修正品質の分析にとって重要なデータとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Rủi ro lớn nhất khi sử dụng defect metrics (như số lượng defect log được) để đánh giá hiệu suất cá nhân của tester là gì?",
      "en": "What is the biggest risk of using defect metrics (such as the number of defects logged) to evaluate individual tester performance?",
      "ja": "欠陥指標(記録された欠陥数など)を個々のテスターの業績評価に使用することの最大のリスクは何ですか。"
    },
    "options": [
      {
        "vi": "Có thể tạo động cơ 'chơi hệ thống' (gaming the metric) — ví dụ tester log nhiều defect nhỏ, trùng lặp hoặc không quan trọng để tăng số liệu, làm sai lệch dữ liệu dùng cho RCA và cải tiến quy trình thực sự",
        "en": "It can create an incentive to 'game the metric' — e.g. testers logging many trivial, duplicate, or low-value defects to inflate numbers, which distorts the data used for genuine RCA and process improvement",
        "ja": "「指標をだます(gaming)」動機を生み出す可能性がある。例えばテスターが数値を水増しするために些細な欠陥や重複した欠陥、価値の低い欠陥を多く記録し、その結果、本来のRCAやプロセス改善に使われるべきデータが歪められてしまう"
      },
      {
        "vi": "Metrics sẽ trở nên quá phức tạp để tính toán bằng tay",
        "en": "The metrics become too complex to calculate manually",
        "ja": "指標が手作業で計算するには複雑すぎるものになる"
      },
      {
        "vi": "Metrics sẽ tự động sửa lỗi mà không cần developer",
        "en": "The metrics will automatically fix bugs without developer involvement",
        "ja": "指標が開発者の関与なしに自動的にバグを修正してしまう"
      },
      {
        "vi": "Không có rủi ro nào vì defect count luôn phản ánh chính xác chất lượng công việc",
        "en": "There is no risk, since defect count always accurately reflects work quality",
        "ja": "欠陥数は常に作業品質を正確に反映するため、リスクは存在しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là nguyên lý Goodhart's Law áp dụng vào QA: khi một chỉ số trở thành mục tiêu đánh giá cá nhân, nó dễ bị thao túng và mất giá trị làm tín hiệu khách quan cho phân tích quy trình/RCA.",
      "en": "This reflects Goodhart's Law applied to QA: when a metric becomes a target for individual evaluation, it becomes prone to manipulation and loses its value as an objective signal for process/RCA analysis.",
      "ja": "これはQAに適用されたグッドハートの法則である。ある指標が個人評価の目標となると、その指標は操作されやすくなり、プロセス分析やRCAのための客観的なシグナルとしての価値を失う。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Control chart (biểu đồ kiểm soát) trong thống kê quá trình (SPC) có thể được áp dụng như thế nào cho defect metrics theo thời gian?",
      "en": "How can a control chart from statistical process control (SPC) be applied to defect metrics over time?",
      "ja": "統計的工程管理(SPC)における管理図は、時系列の欠陥指標にどのように適用できますか。"
    },
    "options": [
      {
        "vi": "Chỉ dùng để vẽ biểu đồ hình tròn thể hiện tỷ lệ severity",
        "en": "It is only used to draw pie charts of severity proportions",
        "ja": "重大度の割合を示す円グラフを描くためだけに使われる"
      },
      {
        "vi": "Thiết lập giới hạn kiểm soát trên/dưới cho chỉ số defect (vd: defect density theo release) để phát hiện các điểm dữ liệu vượt ngưỡng bất thường (special cause) cần điều tra, khác với biến động thông thường (common cause)",
        "en": "It sets upper/lower control limits for a defect metric (e.g. defect density per release) to flag data points that fall outside normal variation (special cause) needing investigation, as distinct from ordinary fluctuation (common cause)",
        "ja": "欠陥指標(例:リリースごとの欠陥密度)に対して管理上限・下限を設定し、通常の変動(コモンコーズ)とは異なる、調査が必要な異常値(スペシャルコーズ)を検出するために用いる"
      },
      {
        "vi": "Thay thế hoàn toàn việc viết test case cho các release tiếp theo",
        "en": "It completely replaces the need to write test cases for future releases",
        "ja": "今後のリリースに向けたテストケース作成を完全に不要にする"
      },
      {
        "vi": "Chỉ áp dụng được cho dữ liệu hiệu năng (performance), không áp dụng cho dữ liệu defect",
        "en": "It can only be applied to performance data, not defect data",
        "ja": "パフォーマンスデータにのみ適用可能であり、欠陥データには適用できない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Control chart giúp phân biệt biến động ngẫu nhiên bình thường của quy trình (common cause) với các bất thường đáng ngờ (special cause) — chỉ những điểm special cause mới cần đưa vào RCA sâu.",
      "en": "A control chart distinguishes normal random process variation (common cause) from suspicious anomalies (special cause) — only special-cause points warrant deep RCA investigation.",
      "ja": "管理図はプロセスの通常のランダムな変動(コモンコーズ)と疑わしい異常(スペシャルコーズ)を区別するのに役立つ。深いRCA調査が必要となるのはスペシャルコーズの点のみである。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Một báo cáo defect chất lượng cao, hữu ích cho cả xử lý sửa lỗi lẫn RCA sau này, cần bao gồm tối thiểu những thông tin nào?",
      "en": "A high-quality defect report, useful both for fixing and for later RCA, should minimally include which information?",
      "ja": "修正対応と後のRCAの両方に役立つ質の高い欠陥レポートには、最低限どのような情報が含まれるべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần tiêu đề ngắn gọn và tên người báo lỗi",
        "en": "Only a brief title and the name of the reporter",
        "ja": "簡潔なタイトルと報告者の氏名だけで十分である"
      },
      {
        "vi": "Chỉ cần ảnh chụp màn hình, không cần mô tả bằng chữ",
        "en": "Only a screenshot, without any written description",
        "ja": "スクリーンショットのみで、文章による説明は不要である"
      },
      {
        "vi": "Bước tái hiện rõ ràng, kết quả mong đợi và kết quả thực tế, môi trường/phiên bản, mức độ ảnh hưởng (severity/priority), và bối cảnh phát hiện — đầy đủ để cả developer sửa lỗi lẫn nhóm RCA sau này truy vết nguyên nhân",
        "en": "Clear reproduction steps, expected vs. actual results, environment/version, impact level (severity/priority), and the context of discovery — sufficient for both the developer to fix it and a later RCA team to trace the cause",
        "ja": "明確な再現手順、期待結果と実際の結果、環境・バージョン情報、影響度(重大度・優先度)、発見時の状況といった情報であり、開発者による修正と後のRCAチームによる原因追跡の両方に十分な内容であること"
      },
      {
        "vi": "Chỉ cần severity, không cần các bước tái hiện",
        "en": "Only the severity level, without reproduction steps",
        "ja": "重大度のみで再現手順は不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Báo cáo defect thiếu thông tin (chỉ có tiêu đề hoặc screenshot) không đủ để tái hiện lỗi, càng không đủ dữ liệu định lượng/định tính cho RCA về sau — dữ liệu đầu vào kém sẽ dẫn đến RCA thiếu chính xác.",
      "en": "An incomplete defect report (just a title or screenshot) is insufficient to reproduce the bug and even less sufficient as data for later RCA — poor input data leads to inaccurate RCA.",
      "ja": "情報が不十分な欠陥レポート(タイトルやスクリーンショットのみ)ではバグの再現すら難しく、後のRCAのためのデータとしてはなおさら不十分である。入力データの質が低いと、RCAの精度も低下する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mục đích chính của cuộc họp 'defect triage' trong dự án là gì?",
      "en": "What is the main purpose of a 'defect triage' meeting in a project?",
      "ja": "プロジェクトにおける「欠陥トリアージ」ミーティングの主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Để developer và tester tranh luận xem ai viết code lỗi",
        "en": "For developers and testers to argue over who wrote the buggy code",
        "ja": "開発者とテスターが誰がバグのあるコードを書いたか議論するため"
      },
      {
        "vi": "Để xóa bớt các defect nhằm làm đẹp báo cáo trước khi release",
        "en": "To delete defects to make the report look better before release",
        "ja": "リリース前にレポートを見栄えよくするため欠陥を削除する"
      },
      {
        "vi": "Để chỉ định người chịu trách nhiệm bồi thường thiệt hại cho khách hàng",
        "en": "To designate who is responsible for compensating customer damages",
        "ja": "顧客への損害賠償責任者を指定するため"
      },
      {
        "vi": "Để nhóm liên chức năng cùng đánh giá, xác nhận mức độ nghiêm trọng/ưu tiên và quyết định hướng xử lý (fix ngay, hoãn, hoặc từ chối) cho các defect mới, dựa trên tác động nghiệp vụ và rủi ro",
        "en": "For a cross-functional team to jointly assess, confirm severity/priority, and decide the disposition (fix now, defer, or reject) of new defects, based on business impact and risk",
        "ja": "クロスファンクショナルなチームが新規の欠陥について重大度・優先度を確認・評価し、ビジネスへの影響とリスクに基づいて対応方針(即時修正、延期、却下)を決定するため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Triage là hoạt động quản lý defect có tính hệ thống, giúp thống nhất đánh giá mức độ ưu tiên xử lý dựa trên dữ liệu khách quan (tác động, rủi ro, chi phí) — cũng là nguồn dữ liệu quan trọng cho RCA và defect metrics.",
      "en": "Triage is a systematic defect management activity that aligns the team on prioritization based on objective data (impact, risk, cost) — it is also an important data source for RCA and defect metrics.",
      "ja": "トリアージは体系的な欠陥管理活動であり、影響、リスク、コストといった客観的なデータに基づいて対応の優先順位についてチームの認識を統一する。またRCAや欠陥指標にとっても重要なデータソースとなる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong quản lý defect nâng cao, sự khác biệt giữa 'severity' và 'priority' được hiểu chính xác nhất như thế nào?",
      "en": "In advanced defect management, what is the most accurate way to distinguish 'severity' from 'priority'?",
      "ja": "高度な欠陥管理において、「重大度(severity)」と「優先度(priority)」の違いを最も正確に説明するとどうなりますか。"
    },
    "options": [
      {
        "vi": "Severity phản ánh mức độ tác động kỹ thuật/nghiệp vụ khách quan của defect đối với hệ thống, còn priority phản ánh thứ tự khẩn cấp cần xử lý, do đó một defect severity thấp vẫn có thể có priority cao (ví dụ lỗi chính tả trên trang chủ trước sự kiện ra mắt) và ngược lại",
        "en": "Severity reflects the objective technical/business impact of the defect on the system, while priority reflects the urgency of fixing it, so a low-severity defect can still have high priority (e.g. a typo on the homepage right before a launch event) and vice versa",
        "ja": "重大度はシステムに対する客観的な技術的・ビジネス的影響を表し、優先度は修正の緊急度を表す。そのため、重大度が低くても優先度が高い欠陥(例:ローンチイベント直前のホームページの誤字)や、その逆もあり得る"
      },
      {
        "vi": "Severity và priority luôn có giá trị giống nhau cho mọi defect",
        "en": "Severity and priority always have identical values for every defect",
        "ja": "重大度と優先度は常にすべての欠陥について同じ値を持つ"
      },
      {
        "vi": "Priority chỉ do developer quyết định, severity chỉ do khách hàng quyết định",
        "en": "Priority is decided only by developers, severity only by customers",
        "ja": "優先度は開発者のみが決定し、重大度は顧客のみが決定する"
      },
      {
        "vi": "Severity chỉ áp dụng cho lỗi hiệu năng, priority chỉ áp dụng cho lỗi giao diện",
        "en": "Severity only applies to performance bugs, priority only applies to UI bugs",
        "ja": "重大度はパフォーマンスのバグにのみ適用され、優先度はUIのバグにのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là ví dụ kinh điển ở trình độ Advanced: severity đo tác động kỹ thuật/khách quan, priority đo mức độ khẩn cấp về nghiệp vụ; hai chiều này độc lập và cần được đánh giá riêng biệt trong quy trình triage.",
      "en": "This is the classic Advanced-level example: severity measures objective technical/business impact, priority measures business urgency; the two dimensions are independent and must be assessed separately during triage.",
      "ja": "これはAdvancedレベルにおける古典的な例である。重大度は客観的な技術的・ビジネス的影響を測り、優先度はビジネス上の緊急度を測る。この2つの軸は独立しており、トリアージのプロセスで別々に評価する必要がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Tình huống: số lượng defect mới log giảm dần vào cuối dự án, nhưng defect density (theo kích thước module mới thêm) lại tăng ở các module gần đây nhất. Diễn giải hợp lý nhất là gì?",
      "en": "Scenario: the number of newly logged defects decreases toward the end of the project, but defect density (relative to the size of newly added modules) is rising in the most recent modules. What is the most reasonable interpretation?",
      "ja": "シナリオ:プロジェクト終盤に向けて新規に記録される欠陥数は減少しているが、最近追加されたモジュールでは(新規追加モジュールの規模に対する)欠陥密度が上昇している。最も妥当な解釈は何ですか。"
    },
    "options": [
      {
        "vi": "Dự án chắc chắn đã sẵn sàng release vì tổng số defect giảm",
        "en": "The project is definitely ready for release since the total defect count is decreasing",
        "ja": "欠陥の総数が減少しているため、プロジェクトは確実にリリース準備が整っている"
      },
      {
        "vi": "Số liệu tổng thể giảm có thể do phạm vi kiểm thử đang thu hẹp lại (ít module được test kỹ), trong khi mật độ tăng ở module mới cho thấy các module đó có vấn đề chất lượng cục bộ cần được RCA riêng, không nên chỉ nhìn xu hướng tổng để kết luận sẵn sàng release",
        "en": "The declining overall count may simply reflect a shrinking test scope (fewer modules being thoroughly tested), while rising density in new modules signals a localized quality issue warranting separate RCA — release readiness should not be concluded from the overall trend alone",
        "ja": "全体の件数減少は単にテスト範囲が縮小している(徹底的にテストされるモジュールが減っている)ことを反映している可能性があり、一方で新しいモジュールでの密度上昇は個別のRCAが必要な局所的な品質問題を示している。全体の傾向だけでリリース準備完了と判断すべきではない"
      },
      {
        "vi": "Defect density không liên quan gì đến chất lượng của các module mới",
        "en": "Defect density has no relation to the quality of the new modules",
        "ja": "欠陥密度は新しいモジュールの品質とは無関係である"
      },
      {
        "vi": "Đây là bằng chứng chắc chắn rằng developer đang cố tình che giấu lỗi",
        "en": "This is definitive proof that developers are intentionally hiding bugs",
        "ja": "これは開発者が意図的にバグを隠していることの決定的な証拠である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đọc metrics đơn lẻ (tổng số defect) mà không đối chiếu với ngữ cảnh (phạm vi test, kích thước module) dễ dẫn đến kết luận sai; cần phân tích đa chiều và có thể cần RCA riêng cho các module có density tăng bất thường.",
      "en": "Reading a single metric (total defect count) without cross-checking context (test scope, module size) can lead to wrong conclusions; multi-dimensional analysis is needed, and a separate RCA may be warranted for modules with abnormally rising density.",
      "ja": "文脈(テスト範囲、モジュール規模)と照らし合わせずに単一の指標(欠陥総数)だけを見ると誤った結論に陥りやすい。多角的な分析が必要であり、密度が異常に上昇しているモジュールについては個別のRCAが必要になる場合がある。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "RCA thực hiện ở cấp độ dự án/retrospective (phân tích tổng hợp nhiều defect) khác gì so với RCA thực hiện cho một defect riêng lẻ?",
      "en": "How does project-level/retrospective RCA (aggregating many defects) differ from RCA performed for a single individual defect?",
      "ja": "プロジェクトレベル/レトロスペクティブでのRCA(多数の欠陥を集約した分析)は、個々の単一欠陥に対して行うRCAとどう異なりますか。"
    },
    "options": [
      {
        "vi": "Không có sự khác biệt, hai cách tiếp cận hoàn toàn giống nhau về phạm vi và mục tiêu",
        "en": "There is no difference; the two approaches are identical in scope and goal",
        "ja": "両者に違いはなく、範囲と目的は完全に同一である"
      },
      {
        "vi": "RCA cấp dự án chỉ áp dụng cho dự án Agile, RCA đơn lẻ chỉ áp dụng cho Waterfall",
        "en": "Project-level RCA only applies to Agile projects, single-defect RCA only to Waterfall projects",
        "ja": "プロジェクトレベルのRCAはアジャイルプロジェクトにのみ適用され、単一欠陥のRCAはウォーターフォールにのみ適用される"
      },
      {
        "vi": "RCA đơn lẻ tập trung tìm nguyên nhân kỹ thuật cụ thể của một sự cố; RCA cấp dự án dùng dữ liệu tổng hợp (xu hướng, phân loại, cụm) để tìm ra các vấn đề hệ thống/quy trình lặp lại, từ đó đề xuất cải tiến ở tầm tổ chức",
        "en": "Single-defect RCA focuses on finding the specific technical cause of one incident; project-level RCA uses aggregated data (trends, classifications, clusters) to identify recurring systemic/process issues and propose organization-level improvements",
        "ja": "単一欠陥のRCAは1件の事象について具体的な技術的原因を突き止めることに焦点を当てる。一方プロジェクトレベルのRCAは集約データ(傾向、分類、クラスタ)を用いて繰り返し発生するシステム的・プロセス的な問題を特定し、組織レベルの改善策を提案する"
      },
      {
        "vi": "RCA cấp dự án luôn nhanh hơn và ít tốn nguồn lực hơn RCA đơn lẻ",
        "en": "Project-level RCA is always faster and less resource-intensive than single-defect RCA",
        "ja": "プロジェクトレベルのRCAは常に単一欠陥のRCAより速く、リソースも少なくて済む"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hai cấp độ RCA bổ sung cho nhau: cấp đơn lẻ giải quyết triệu chứng cụ thể, cấp tổng hợp (thường trong project retrospective) phát hiện pattern quy trình lặp lại để cải tiến ở tầm rộng hơn, ví dụ điều chỉnh quy trình review hay đào tạo.",
      "en": "The two RCA levels complement each other: single-case RCA addresses a specific symptom, while aggregate RCA (often in a project retrospective) reveals recurring process patterns for broader improvement, e.g. adjusting the review process or training.",
      "ja": "この2つのレベルのRCAは互いに補完し合う。個別のRCAは具体的な症状に対処し、集約的なRCA(多くの場合プロジェクトレトロスペクティブで実施)は繰り返し発生するプロセスパターンを明らかにし、レビュープロセスの調整やトレーニングといったより広範な改善につなげる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Việc phân loại nguyên nhân gốc theo nhóm (ví dụ: requirement, design, coding, test environment, communication) trong dữ liệu defect mang lại lợi ích gì lớn nhất cho tổ chức?",
      "en": "What is the greatest organizational benefit of classifying root causes into categories (e.g. requirements, design, coding, test environment, communication) within defect data?",
      "ja": "欠陥データにおいて根本原因をカテゴリ(要件、設計、コーディング、テスト環境、コミュニケーションなど)ごとに分類することは、組織にとってどのような最大の利点をもたらしますか。"
    },
    "options": [
      {
        "vi": "Giúp tính lương thưởng cho từng cá nhân dựa trên số lỗi họ gây ra",
        "en": "It helps calculate individual bonuses based on the number of defects each person caused",
        "ja": "各個人が引き起こした欠陥数に基づいて賞与を計算するのに役立つ"
      },
      {
        "vi": "Không có lợi ích thực tế, chỉ là hình thức báo cáo cho đẹp",
        "en": "There is no real benefit; it is purely cosmetic reporting",
        "ja": "実質的な利益はなく、単なる体裁上の報告に過ぎない"
      },
      {
        "vi": "Chỉ hữu ích khi dự án đã kết thúc và không còn ai làm việc trên sản phẩm",
        "en": "It is only useful after the project has ended and no one is working on the product anymore",
        "ja": "プロジェクトが終了し、もはや誰も製品に取り組んでいない場合にのみ有用である"
      },
      {
        "vi": "Giúp tổ chức nhận diện được nguyên nhân hệ thống phổ biến nhất (ví dụ phần lớn lỗi xuất phát từ requirement không rõ ràng), từ đó đầu tư cải tiến đúng trọng tâm — như cải thiện quy trình elicit requirement — thay vì chỉ tăng cường kiểm thử ở cuối vòng đời",
        "en": "It helps the organization identify the most common systemic cause (e.g. most defects stem from unclear requirements), enabling targeted improvement investment — such as improving requirements elicitation — rather than simply adding more testing at the end of the lifecycle",
        "ja": "組織が最も一般的なシステム的原因(例:欠陥の大部分が不明確な要件に起因している)を特定できるようになり、ライフサイクル終盤でテストを増やすだけでなく、要件定義プロセスの改善など的を絞った改善投資が可能になる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây chính là giá trị cốt lõi của phân loại nguyên nhân gốc trong RCA: chuyển từ 'chữa cháy' từng lỗi sang đầu tư phòng ngừa có định hướng dựa trên bằng chứng thống kê về nguồn gốc lỗi phổ biến nhất trong tổ chức.",
      "en": "This is the core value of root-cause categorization in RCA: shifting from firefighting individual defects to targeted preventive investment based on statistical evidence of the organization's most common defect sources.",
      "ja": "これはRCAにおける根本原因分類の中核的な価値である。個々の欠陥への場当たり的な対応から、組織で最も一般的な欠陥発生源に関する統計的な根拠に基づいた、的を絞った予防投資へと転換することができる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong mô hình TMMi, mục tiêu cốt lõi của cấp độ 2 (Managed) là gì?",
      "en": "In the TMMi model, what is the core goal of Maturity Level 2 (Managed)?",
      "ja": "TMMiモデルにおいて、成熟度レベル2(Managed)の中心的な目標は何ですか。"
    },
    "options": [
      {
        "vi": "Thiết lập kiểm thử như một quy trình được quản lý, tách biệt khỏi phát triển, với chính sách và chiến lược kiểm thử cơ bản",
        "en": "Establish testing as a managed process, separated from debugging, with basic test policy and strategy",
        "ja": "テストをデバッグから切り離し、基本的なテストポリシーと戦略を持つ管理されたプロセスとして確立する"
      },
      {
        "vi": "Tối ưu hóa liên tục quy trình kiểm thử dựa trên số liệu định lượng",
        "en": "Continuously optimize the test process based on quantitative metrics",
        "ja": "定量的な指標に基づいてテストプロセスを継続的に最適化する"
      },
      {
        "vi": "Tích hợp kiểm thử vào toàn bộ vòng đời phần mềm với chương trình đào tạo tổ chức",
        "en": "Integrate testing into the entire software lifecycle with an organization-wide training program",
        "ja": "組織全体のトレーニングプログラムとともにテストをソフトウェアライフサイクル全体に統合する"
      },
      {
        "vi": "Thiết lập kiểm soát chất lượng sản phẩm định lượng dựa trên đo lường quy trình",
        "en": "Establish quantitative product quality control based on process measurement",
        "ja": "プロセス測定に基づく定量的な製品品質管理を確立する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cấp độ 2 của TMMi tập trung chuyển kiểm thử từ hoạt động lẫn lộn với gỡ lỗi sang một quy trình được quản lý, có chính sách, mục tiêu, kế hoạch kiểm thử và giám sát cơ bản.",
      "en": "TMMi Level 2 focuses on moving testing from being confused with debugging into a managed process with basic policy, goals, test plans and monitoring.",
      "ja": "TMMiレベル2は、デバッグと混同されがちなテストを、基本的なポリシー・目標・テスト計画・モニタリングを備えた管理プロセスへと移行させることに重点を置く。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Ở cấp độ 3 (Defined) của TMMi, đặc điểm khác biệt lớn nhất so với cấp độ 2 là gì?",
      "en": "At TMMi Level 3 (Defined), what is the biggest differentiator compared to Level 2?",
      "ja": "TMMiレベル3(Defined)がレベル2と比べて最も大きく異なる特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử lần đầu tiên được lập kế hoạch cho từng dự án riêng lẻ",
        "en": "Testing is planned for individual projects for the first time",
        "ja": "個々のプロジェクトごとにテストが初めて計画される"
      },
      {
        "vi": "Kiểm thử được định nghĩa thành quy trình chuẩn của tổ chức, có thể tùy biến theo từng dự án, tích hợp với vòng đời phát triển",
        "en": "Testing is defined as a standard organizational process, tailorable per project, and integrated with the development lifecycle",
        "ja": "テストが組織標準プロセスとして定義され、プロジェクトごとにテーラリング可能で、開発ライフサイクルと統合される"
      },
      {
        "vi": "Chỉ số DDP (Defect Detection Percentage) lần đầu được thu thập",
        "en": "Defect Detection Percentage is collected for the first time",
        "ja": "欠陥検出率(DDP)が初めて収集される"
      },
      {
        "vi": "Toàn bộ kiểm thử được tự động hóa hoàn toàn",
        "en": "Testing is fully automated across the organization",
        "ja": "テストが組織全体で完全に自動化される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cấp độ 3 chuyển từ các quy trình được quản lý riêng lẻ theo dự án (cấp 2) sang một quy trình kiểm thử chuẩn hóa toàn tổ chức, tích hợp chặt với vòng đời phát triển và có thể tùy biến.",
      "en": "Level 3 moves from project-specific managed processes (Level 2) to an organization-wide standardized, tailorable test process fully integrated with the development lifecycle.",
      "ja": "レベル3では、プロジェクトごとの管理プロセス(レベル2)から、開発ライフサイクルに完全統合され、テーラリング可能な組織標準のテストプロセスへと移行する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "TMMi cấp độ 4 (Measured) đưa thêm yếu tố nào mà các cấp thấp hơn chưa có?",
      "en": "What does TMMi Level 4 (Measured) add that lower levels lack?",
      "ja": "TMMiレベル4(Measured)が下位レベルにない要素として追加するものは何ですか。"
    },
    "options": [
      {
        "vi": "Chương trình đào tạo kiểm thử viên cơ bản",
        "en": "A basic tester training program",
        "ja": "基本的なテスト担当者向けトレーニングプログラム"
      },
      {
        "vi": "Việc tách biệt kiểm thử khỏi hoạt động gỡ lỗi",
        "en": "Separation of testing from debugging activities",
        "ja": "テストとデバッグ活動の分離"
      },
      {
        "vi": "Quản lý kiểm thử định lượng dựa trên số liệu quy trình và đánh giá chất lượng sản phẩm bằng đo lường",
        "en": "Quantitative test process management driven by process metrics and product quality evaluation based on measurement",
        "ja": "プロセス指標に基づく定量的なテスト管理と、測定に基づく製品品質評価"
      },
      {
        "vi": "Việc xây dựng chính sách kiểm thử đầu tiên của tổ chức",
        "en": "Creation of the organization's first test policy",
        "ja": "組織初のテストポリシー策定"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cấp độ 4 giới thiệu quản lý kiểm thử định lượng (Test Measurement) và đánh giá chất lượng sản phẩm dựa trên số liệu, cho phép dự đoán và kiểm soát quy trình bằng dữ liệu thay vì kinh nghiệm.",
      "en": "Level 4 introduces quantitative test measurement and product quality evaluation, enabling data-driven prediction and control rather than relying on experience alone.",
      "ja": "レベル4では定量的なテスト測定と製品品質評価が導入され、経験則ではなくデータに基づく予測と制御が可能になる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Mục tiêu chính của TMMi cấp độ 5 (Optimization) là gì?",
      "en": "What is the primary focus of TMMi Level 5 (Optimization)?",
      "ja": "TMMiレベル5(Optimization)の主な焦点は何ですか。"
    },
    "options": [
      {
        "vi": "Thiết lập môi trường kiểm thử chuẩn cho toàn tổ chức",
        "en": "Establishing a standard test environment for the whole organization",
        "ja": "組織全体の標準テスト環境の確立"
      },
      {
        "vi": "Đào tạo nhân viên về khái niệm kiểm thử cơ bản",
        "en": "Training staff on basic testing concepts",
        "ja": "基本的なテスト概念に関するスタッフ教育"
      },
      {
        "vi": "Xây dựng kế hoạch kiểm thử cho từng dự án lần đầu tiên",
        "en": "Creating test plans for individual projects for the first time",
        "ja": "個々のプロジェクトのテスト計画を初めて作成すること"
      },
      {
        "vi": "Áp dụng phương pháp phòng ngừa lỗi, tối ưu hóa quy trình liên tục và áp dụng công nghệ kiểm thử mới một cách có kiểm soát",
        "en": "Applying defect prevention, continuous process optimization, and controlled adoption of new test technologies",
        "ja": "欠陥予防の適用、継続的なプロセス最適化、新しいテスト技術の管理された導入"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cấp độ 5 tập trung phòng ngừa lỗi (Defect Prevention), tối ưu hóa quy trình kiểm thử liên tục và kiểm soát việc đưa công nghệ/kỹ thuật kiểm thử mới vào áp dụng dựa trên dữ liệu ở cấp 4.",
      "en": "Level 5 focuses on defect prevention, continuous test process optimization, and controlled introduction of new test technology, building on the quantitative data from Level 4.",
      "ja": "レベル5は欠陥予防、継続的なテストプロセス最適化、そしてレベル4で得られた定量データに基づく新しいテスト技術の管理された導入に焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong TPI Next, khái niệm \"key area\" (lĩnh vực chủ chốt) dùng để làm gì?",
      "en": "In TPI Next, what is the purpose of a \"key area\"?",
      "ja": "TPI Nextにおいて「キーエリア」の目的は何ですか。"
    },
    "options": [
      {
        "vi": "Là một khía cạnh cụ thể của quy trình kiểm thử (ví dụ: chiến lược kiểm thử, quản lý thiếu sót, công cụ kiểm thử) được đánh giá độ trưởng thành riêng biệt",
        "en": "A specific dimension of the test process (e.g. test strategy, defect management, test tools) whose maturity is assessed separately",
        "ja": "テストプロセスの特定の側面(例:テスト戦略、欠陥管理、テストツールなど)であり、成熟度を個別に評価する対象"
      },
      {
        "vi": "Là một pha bắt buộc trong vòng đời kiểm thử V-model",
        "en": "A mandatory phase in the V-model test lifecycle",
        "ja": "Vモデルのテストライフサイクルにおける必須フェーズ"
      },
      {
        "vi": "Là chỉ số duy nhất đo mức độ tự động hóa kiểm thử",
        "en": "The single metric measuring test automation level",
        "ja": "テスト自動化レベルを測定する唯一の指標"
      },
      {
        "vi": "Là tên gọi khác của quy trình đánh giá formal appraisal trong TMMi",
        "en": "Another name for the formal appraisal process in TMMi",
        "ja": "TMMiにおける公式アプレイザルプロセスの別名"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "TPI Next chia quy trình kiểm thử thành 16 key area (như chiến lược kiểm thử, quản lý thiếu sót, công cụ, số liệu...), mỗi key area được đánh giá qua các mức trưởng thành riêng.",
      "en": "TPI Next decomposes the test process into 16 key areas (e.g. test strategy, defect management, tools, metrics), each assessed at its own maturity level.",
      "ja": "TPI Nextはテストプロセスを16のキーエリア(テスト戦略、欠陥管理、ツール、メトリクスなど)に分解し、それぞれを独立した成熟度レベルで評価する。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "Trong TPI Next, sự khác biệt giữa \"checkpoint\" và \"enabler\" là gì?",
      "en": "In TPI Next, what distinguishes a \"checkpoint\" from an \"enabler\"?",
      "ja": "TPI Nextにおいて「チェックポイント」と「イネーブラー」の違いは何ですか。"
    },
    "options": [
      {
        "vi": "Checkpoint là công cụ phần mềm, enabler là con người thực hiện kiểm thử",
        "en": "A checkpoint is a software tool, an enabler is the human tester performing the tests",
        "ja": "チェックポイントはソフトウェアツールであり、イネーブラーはテストを実施する担当者である"
      },
      {
        "vi": "Checkpoint là yêu cầu bắt buộc để đạt một mức trưởng thành trong key area; enabler là mối liên hệ hỗ trợ giữa các key area giúp việc cải tiến hiệu quả hơn",
        "en": "A checkpoint is a mandatory requirement to reach a maturity level within a key area; an enabler is a supportive cross-key-area relationship that boosts improvement effectiveness",
        "ja": "チェックポイントはキーエリア内である成熟度レベルに到達するための必須要件であり、イネーブラーはキーエリア間の改善効果を高める支援的な関係を指す"
      },
      {
        "vi": "Checkpoint chỉ áp dụng cho kiểm thử tự động, enabler chỉ áp dụng cho kiểm thử thủ công",
        "en": "Checkpoints only apply to automated testing, enablers only to manual testing",
        "ja": "チェックポイントは自動テストにのみ適用され、イネーブラーは手動テストにのみ適用される"
      },
      {
        "vi": "Checkpoint là tài liệu báo cáo cuối dự án, enabler là kế hoạch kiểm thử ban đầu",
        "en": "A checkpoint is the end-of-project report, an enabler is the initial test plan",
        "ja": "チェックポイントはプロジェクト終了時の報告書であり、イネーブラーは初期テスト計画である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Checkpoint là các tiêu chí phải đạt để chứng minh một mức trưởng thành trong key area; enabler mô tả mối quan hệ hỗ trợ lẫn nhau giữa các key area khác nhau, giúp lộ trình cải tiến khả thi và hiệu quả hơn.",
      "en": "Checkpoints are criteria that must be met to demonstrate a maturity level within a key area; enablers describe cross-key-area supporting relationships that make the improvement roadmap more feasible and effective.",
      "ja": "チェックポイントはキーエリア内である成熟度レベルを証明するために満たすべき基準であり、イネーブラーは異なるキーエリア間の相互支援関係を示し、改善ロードマップをより実現可能かつ効果的にする。"
    }
  },
  {
    "lvl": "istqb-advanced",
    "q": {
      "vi": "TPI Next định nghĩa bao nhiêu cụm (cluster) trưởng thành chính cho quy trình kiểm thử?",
      "en": "How many main maturity clusters does TPI Next define for the test process?",
      "ja": "TPI Nextはテストプロセスに対していくつの主要な成熟度クラスターを定義していますか。"
    },
    "options": [
      {
        "vi": "2 cụm: Thủ công và Tự động",
        "en": "Two clusters: Manual and Automated",
        "ja": "2つ:手動と自動"
      },
      {
        "vi": "5 cụm tương ứng 5 cấp độ của CMMI",
        "en": "Five clusters matching the five CMMI levels",
        "ja": "CMMIの5段階に対応する5つのクラスター"
      },
      {
        "vi": "3 cụm: Initial, Controlled, Efficient, Optimizing (4 mức trưởng thành theo cụm)",
        "en": "Four clusters: Initial, Controlled, Efficient, Optimizing",
        "ja": "4つ:Initial、Controlled、Efficient、Optimizing"
      },
      {
        "vi": "Không có khái niệm cụm, chỉ có điểm số liên tục",
        "en": "There is no cluster concept, only a continuous score",
        "ja": "クラスターの概念はなく、連続的なスコアのみが存在する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "TPI Next nhóm các key area vào 4 cụm trưởng thành: Initial, Controlled, Efficient, Optimizing, mỗi cụm đại diện một tầm nhìn kinh doanh khác nhau về kiểm thử.",
      "en": "TPI Next groups key areas into four maturity clusters: Initial, Controlled, Efficient, and Optimizing, each representing a different business perspective on testing.",
      "ja": "TPI Nextはキーエリアを4つの成熟度クラスター(Initial、Controlled、Efficient、Optimizing)にグループ化し、それぞれがテストに関する異なるビジネス視点を表す。"
    }
  }
];
