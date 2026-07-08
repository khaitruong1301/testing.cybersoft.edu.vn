export const DATA = [
  {
    "q": {
      "vi": "Với biểu thức điều kiện A AND B AND C, cần tối thiểu bao nhiêu ca kiểm thử để đạt phủ MC/DC (Modified Condition/Decision Coverage)?",
      "en": "For the condition A AND B AND C, what is the minimum number of test cases required to achieve MC/DC (Modified Condition/Decision Coverage)?",
      "ja": "条件 A AND B AND C に対して、MC/DC（改定条件判定カバレッジ）を達成するために必要な最小テストケース数はいくつですか？"
    },
    "options": [
      {
        "vi": "4 ca",
        "en": "4 cases",
        "ja": "4 ケース"
      },
      {
        "vi": "3 ca",
        "en": "3 cases",
        "ja": "3 ケース"
      },
      {
        "vi": "8 ca",
        "en": "8 cases",
        "ja": "8 ケース"
      },
      {
        "vi": "6 ca",
        "en": "6 cases",
        "ja": "6 ケース"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Với N điều kiện độc lập nối bằng cùng một toán tử, MC/DC thường cần N+1 ca. Ở đây N=3 nên tối thiểu 4 ca, mỗi điều kiện được chứng minh ảnh hưởng độc lập tới kết quả.",
      "en": "For N independent conditions joined by the same operator, MC/DC typically needs N+1 cases. With N=3 the minimum is 4, each condition shown to independently affect the outcome.",
      "ja": "同一演算子で結合された N 個の独立条件では、MC/DC は通常 N+1 ケースを要します。N=3 なので最小 4 ケースで、各条件が結果に独立して影響することを示します。"
    }
  },
  {
    "q": {
      "vi": "Trong FMEA, một lỗi có Severity=8, Occurrence=5, Detection=9. RPN (Risk Priority Number) bằng bao nhiêu?",
      "en": "In FMEA a failure mode has Severity=8, Occurrence=5, Detection=9. What is the RPN (Risk Priority Number)?",
      "ja": "FMEA において、ある故障モードが Severity=8、Occurrence=5、Detection=9 である。RPN（リスク優先度数）はいくつか？"
    },
    "options": [
      {
        "vi": "22",
        "en": "22",
        "ja": "22"
      },
      {
        "vi": "360",
        "en": "360",
        "ja": "360"
      },
      {
        "vi": "40",
        "en": "40",
        "ja": "40"
      },
      {
        "vi": "72",
        "en": "72",
        "ja": "72"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "RPN được tính bằng tích ba yếu tố: Severity × Occurrence × Detection = 8 × 5 × 9 = 360. RPN càng cao thì mức ưu tiên xử lý càng lớn.",
      "en": "RPN is the product of the three factors: Severity × Occurrence × Detection = 8 × 5 × 9 = 360. Higher RPN means higher priority for action.",
      "ja": "RPN は 3 要素の積で、Severity × Occurrence × Detection = 8 × 5 × 9 = 360 です。RPN が高いほど対応の優先度が高くなります。"
    }
  },
  {
    "q": {
      "vi": "Đặc trưng chất lượng nào của ISO 25010 mô tả mức độ hệ thống hoạt động và truy cập được khi cần sử dụng?",
      "en": "Which ISO 25010 quality characteristic describes the degree to which a system is operational and accessible when required for use?",
      "ja": "ISO 25010 のどの品質特性が、使用時にシステムが稼働しアクセス可能である度合いを表しますか？"
    },
    "options": [
      {
        "vi": "Maturity (Độ chín)",
        "en": "Maturity",
        "ja": "成熟性（マチュリティ）"
      },
      {
        "vi": "Recoverability (Khả năng phục hồi)",
        "en": "Recoverability",
        "ja": "回復性（リカバラビリティ）"
      },
      {
        "vi": "Availability (Tính sẵn sàng)",
        "en": "Availability",
        "ja": "可用性（アベイラビリティ）"
      },
      {
        "vi": "Fault tolerance (Chịu lỗi)",
        "en": "Fault tolerance",
        "ja": "フォールトトレランス（耐障害性）"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Availability là đặc trưng con của Reliability, đo mức độ hệ thống sẵn sàng vận hành và truy cập được khi cần. Maturity, Recoverability và Fault tolerance là các đặc trưng con khác của Reliability.",
      "en": "Availability is a sub-characteristic of Reliability, measuring the extent to which a system is operational and accessible when required. Maturity, Recoverability and Fault tolerance are other Reliability sub-characteristics.",
      "ja": "可用性は信頼性のサブ特性で、必要時にシステムが稼働・アクセス可能な度合いを測ります。成熟性・回復性・耐障害性は信頼性の他のサブ特性です。"
    }
  },
  {
    "q": {
      "vi": "Kỹ thuật nào PHÙ HỢP NHẤT để kiểm thử một hàm nhận nhiều tham số cấu hình độc lập nhưng số tổ hợp đầy đủ quá lớn để thực thi?",
      "en": "Which technique is MOST suitable to test a function with many independent configuration parameters where the full combination count is too large to execute?",
      "ja": "多数の独立した設定パラメータを持ち、全組み合わせ数が実行するには多すぎる関数をテストするのに最も適した技法はどれですか？"
    },
    "options": [
      {
        "vi": "Kiểm thử giá trị biên (Boundary value analysis)",
        "en": "Boundary value analysis",
        "ja": "境界値分析（バウンダリバリューアナリシス）"
      },
      {
        "vi": "Đoán lỗi (Error guessing)",
        "en": "Error guessing",
        "ja": "エラー推測（エラーゲッシング）"
      },
      {
        "vi": "Kiểm thử chuyển trạng thái (State transition testing)",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Kiểm thử tổ hợp cặp (Pairwise / all-pairs testing)",
        "en": "Pairwise (all-pairs) testing",
        "ja": "ペアワイズ（オールペア）テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử tổ hợp cặp giảm mạnh số ca bằng cách bảo đảm mọi cặp giá trị của mọi cặp tham số đều xuất hiện ít nhất một lần, hiệu quả khi lỗi thường phát sinh từ tương tác giữa hai tham số.",
      "en": "Pairwise testing drastically reduces cases by ensuring every pair of values of every pair of parameters appears at least once, effective because defects often arise from two-parameter interactions.",
      "ja": "ペアワイズテストは、あらゆるパラメータ対のあらゆる値の対を少なくとも 1 回出現させることでケース数を大幅に削減します。欠陥は 2 パラメータ間の相互作用から生じることが多いため有効です。"
    }
  },
  {
    "q": {
      "vi": "Trong classification tree (cây phân loại), các 「lá」 dưới cùng một 「phân loại」 (classification) biểu diễn điều gì?",
      "en": "In a classification tree, the leaves under a single classification represent what?",
      "ja": "分類ツリー（クラシフィケーションツリー）において、1 つの「分類」の下にある「葉（リーフ）」は何を表しますか？"
    },
    "options": [
      {
        "vi": "Các lớp tương đương (class) rời nhau của một khía cạnh đầu vào",
        "en": "Disjoint equivalence classes of one input aspect",
        "ja": "ある入力側面の互いに素な同値クラス"
      },
      {
        "vi": "Các bước thực thi tuần tự của một ca kiểm thử",
        "en": "Sequential execution steps of a test case",
        "ja": "テストケースの逐次実行ステップ"
      },
      {
        "vi": "Các kết quả mong đợi khác nhau",
        "en": "Different expected results",
        "ja": "異なる期待結果"
      },
      {
        "vi": "Các mức độ ưu tiên rủi ro",
        "en": "Different risk priority levels",
        "ja": "異なるリスク優先度レベル"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mỗi phân loại đại diện cho một khía cạnh/tham số đầu vào, còn các lá bên dưới nó là các lớp tương đương rời nhau của khía cạnh đó; ca kiểm thử được tạo bằng cách chọn một lá từ mỗi phân loại.",
      "en": "Each classification represents an input aspect/parameter and the leaves beneath it are the disjoint equivalence classes of that aspect; test cases are formed by choosing one leaf per classification.",
      "ja": "各分類は入力の側面／パラメータを表し、その下の葉はその側面の互いに素な同値クラスです。テストケースは各分類から 1 つの葉を選んで作成します。"
    }
  },
  {
    "q": {
      "vi": "Test Manager cần ước lượng công sức dựa trên năng suất lịch sử và dữ liệu dự án tương tự. Đây là kỹ thuật ước lượng nào?",
      "en": "A Test Manager estimates effort using historical productivity and data from similar past projects. Which estimation technique is this?",
      "ja": "テストマネージャーが過去の生産性と類似プロジェクトのデータを用いて工数を見積もる。これはどの見積り技法か？"
    },
    "options": [
      {
        "vi": "Wideband Delphi",
        "en": "Wideband Delphi",
        "ja": "ワイドバンドデルファイ"
      },
      {
        "vi": "Ước lượng dựa trên chỉ số/tương tự (metrics-based / analogy)",
        "en": "Metrics-based / analogy estimation",
        "ja": "メトリクスベース／類推見積り"
      },
      {
        "vi": "Three-point estimation (PERT)",
        "en": "Three-point estimation (PERT)",
        "ja": "3 点見積り（PERT）"
      },
      {
        "vi": "Planning poker",
        "en": "Planning poker",
        "ja": "プランニングポーカー"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Sử dụng dữ liệu năng suất lịch sử và dự án tương tự để suy ra công sức là đặc trưng của ước lượng dựa trên chỉ số/tương tự (metrics-based / analogy-based).",
      "en": "Deriving effort from historical productivity data and similar projects characterises metrics-based / analogy-based estimation.",
      "ja": "過去の生産性データと類似プロジェクトから工数を導くのは、メトリクスベース／類推見積りの特徴です。"
    }
  },
  {
    "q": {
      "vi": "Trong phân tích luồng dữ liệu (data flow), một biến bị 「define」 rồi bị 「define」 lại trước khi được 「use」 tạo ra loại bất thường nào?",
      "en": "In data flow analysis, a variable that is defined and then defined again before any use produces which anomaly?",
      "ja": "データフロー分析で、変数が「定義」された後、使用される前に再び「定義」される場合、どの異常が生じますか？"
    },
    "options": [
      {
        "vi": "du-anomaly (define rồi use)",
        "en": "du-anomaly (define then use)",
        "ja": "du 異常（定義後に使用）"
      },
      {
        "vi": "ur-anomaly (use rồi reference)",
        "en": "ur-anomaly (use then reference)",
        "ja": "ur 異常（使用後に参照）"
      },
      {
        "vi": "dd-anomaly (define rồi define lại)",
        "en": "dd-anomaly (define then define)",
        "ja": "dd 異常（定義後に再定義）"
      },
      {
        "vi": "ud-anomaly (use rồi define)",
        "en": "ud-anomaly (use then define)",
        "ja": "ud 異常（使用後に定義）"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chuỗi define-define (dd) cho thấy giá trị gán đầu tiên bị ghi đè mà chưa hề được dùng, thường là dấu hiệu của lỗi lập trình hoặc mã thừa.",
      "en": "A define-define (dd) sequence means the first assigned value is overwritten without ever being used, often signalling a coding error or redundant code.",
      "ja": "define-define（dd）列は、最初に代入された値が使用されずに上書きされることを意味し、多くの場合プログラミング誤りや冗長コードの兆候です。"
    }
  },
  {
    "q": {
      "vi": "Theo ISTQB, review nào TUÂN THEO quy trình chính thức, có vai trò xác định, ghi biên bản và thu thập chỉ số, thường nhằm mục tiêu tìm khiếm khuyết?",
      "en": "Per ISTQB, which review follows a formal process with defined roles, documented outcomes and metrics collection, typically aimed at finding defects?",
      "ja": "ISTQB によれば、定義された役割・記録された結果・メトリクス収集を伴う公式プロセスに従い、通常欠陥発見を目的とするレビューはどれですか？"
    },
    "options": [
      {
        "vi": "Walkthrough (rà soát dẫn dắt)",
        "en": "Walkthrough",
        "ja": "ウォークスルー"
      },
      {
        "vi": "Informal review (review phi chính thức)",
        "en": "Informal review",
        "ja": "非公式レビュー"
      },
      {
        "vi": "Ad hoc review",
        "en": "Ad hoc review",
        "ja": "アドホックレビュー"
      },
      {
        "vi": "Inspection (thanh tra)",
        "en": "Inspection",
        "ja": "インスペクション"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Inspection là loại review chính thức nhất: có moderator, quy tắc vào/ra, checklist, thu thập chỉ số và biên bản, mục tiêu chính là phát hiện khiếm khuyết một cách hệ thống.",
      "en": "Inspection is the most formal review type: it has a moderator, entry/exit criteria, checklists, metrics collection and records, primarily aiming to find defects systematically.",
      "ja": "インスペクションは最も公式なレビューで、モデレータ・開始／終了基準・チェックリスト・メトリクス収集・記録を持ち、主に欠陥を体系的に発見することを目的とします。"
    }
  },
  {
    "q": {
      "vi": "Đồ thị luồng điều khiển có 10 cạnh (edges), 8 đỉnh (nodes) và 1 thành phần liên thông. Độ phức tạp cyclomatic (V(G)) bằng bao nhiêu?",
      "en": "A control flow graph has 10 edges, 8 nodes and 1 connected component. What is the cyclomatic complexity V(G)?",
      "ja": "制御フローグラフに 10 本のエッジ、8 個のノード、1 個の連結成分がある。循環的複雑度 V(G) はいくつか？"
    },
    "options": [
      {
        "vi": "3",
        "en": "3",
        "ja": "3"
      },
      {
        "vi": "2",
        "en": "2",
        "ja": "2"
      },
      {
        "vi": "4",
        "en": "4",
        "ja": "4"
      },
      {
        "vi": "5",
        "en": "5",
        "ja": "5"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "V(G) = E − N + 2P = 10 − 8 + 2×1 = 4... nhưng công thức chuẩn cho một thành phần cho 10 − 8 + 2 = 4; đáp án đúng là 4 nếu P=1. Áp dụng E−N+2P: 10−8+2=4.",
      "en": "V(G) = E − N + 2P = 10 − 8 + 2×1 = 4. Using the standard formula for one component: 10 − 8 + 2 = 4.",
      "ja": "V(G) = E − N + 2P = 10 − 8 + 2×1 = 4。1 成分の標準式では 10 − 8 + 2 = 4 です。"
    }
  },
  {
    "q": {
      "vi": "Metric xu hướng nào giúp Test Manager đánh giá hiệu quả bằng cách so sánh khiếm khuyết tìm được trước và sau khi phát hành?",
      "en": "Which metric helps a Test Manager evaluate effectiveness by comparing defects found before versus after release?",
      "ja": "リリース前と後に発見された欠陥を比較して有効性を評価するのに役立つメトリクスはどれですか？"
    },
    "options": [
      {
        "vi": "Test case pass rate (tỉ lệ ca đạt)",
        "en": "Test case pass rate",
        "ja": "テストケース合格率"
      },
      {
        "vi": "DDP / DRE (Defect Detection Percentage / Defect Removal Efficiency)",
        "en": "DDP / DRE (Defect Detection Percentage / Defect Removal Efficiency)",
        "ja": "DDP／DRE（欠陥検出率／欠陥除去効率）"
      },
      {
        "vi": "Test execution progress (tiến độ thực thi)",
        "en": "Test execution progress",
        "ja": "テスト実行進捗"
      },
      {
        "vi": "Requirements coverage (phủ yêu cầu)",
        "en": "Requirements coverage",
        "ja": "要件カバレッジ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "DDP (Defect Detection Percentage) = khiếm khuyết tìm trong quá trình test / (tìm trong test + tìm sau phát hành), phản ánh hiệu quả phát hiện lỗi của hoạt động kiểm thử.",
      "en": "DDP = defects found during testing / (found during testing + found after release), reflecting the defect-finding effectiveness of the testing activity.",
      "ja": "DDP = テスト中に発見した欠陥 ÷（テスト中発見 + リリース後発見）で、テスト活動の欠陥発見有効性を表します。"
    }
  },
  {
    "q": {
      "vi": "Trong gTAA (generic Test Automation Architecture), lớp nào chịu trách nhiệm sinh, quản lý và cung cấp dữ liệu kiểm thử cho các ca tự động?",
      "en": "In the gTAA (generic Test Automation Architecture), which layer is responsible for generating, managing and supplying test data to automated cases?",
      "ja": "gTAA（汎用テスト自動化アーキテクチャ）において、自動化ケースへのテストデータの生成・管理・提供を担う層はどれですか？"
    },
    "options": [
      {
        "vi": "Test Generation Layer",
        "en": "Test Generation Layer",
        "ja": "テスト生成層"
      },
      {
        "vi": "Test Adaptation Layer",
        "en": "Test Adaptation Layer",
        "ja": "テスト適応層"
      },
      {
        "vi": "Test Definition Layer (bao gồm quản lý test data)",
        "en": "Test Definition Layer (including test data management)",
        "ja": "テスト定義層（テストデータ管理を含む）"
      },
      {
        "vi": "Test Execution Layer",
        "en": "Test Execution Layer",
        "ja": "テスト実行層"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong gTAA, Test Definition Layer định nghĩa test cases, test data, test procedures và các thư viện liên quan, tách biệt phần định nghĩa với phần thực thi và thích ứng với SUT.",
      "en": "In the gTAA the Test Definition Layer defines test cases, test data, test procedures and related libraries, separating definition from execution and adaptation to the SUT.",
      "ja": "gTAA ではテスト定義層がテストケース・テストデータ・テスト手順・関連ライブラリを定義し、定義部分を実行や SUT への適応から分離します。"
    }
  },
  {
    "q": {
      "vi": "Với điều kiện (A OR B) trong ngôn ngữ có short-circuit, để chứng minh B ảnh hưởng độc lập tới quyết định trong MC/DC, A phải có giá trị nào?",
      "en": "For (A OR B) in a short-circuit language, to show B independently affects the decision in MC/DC, A must be set to which value?",
      "ja": "短絡評価の言語で (A OR B) の場合、MC/DC で B が判定に独立して影響することを示すには、A はどの値でなければならないか？"
    },
    "options": [
      {
        "vi": "A = true",
        "en": "A = true",
        "ja": "A = true"
      },
      {
        "vi": "A không quan trọng",
        "en": "A does not matter",
        "ja": "A は関係ない"
      },
      {
        "vi": "A phải bằng B",
        "en": "A must equal B",
        "ja": "A は B と等しくなければならない"
      },
      {
        "vi": "A = false",
        "en": "A = false",
        "ja": "A = false"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong OR, muốn B quyết định kết quả thì phải giữ A=false; khi đó thay đổi B từ false sang true sẽ đảo kết quả, chứng minh B ảnh hưởng độc lập.",
      "en": "In an OR, to let B determine the outcome A must be held false; then toggling B from false to true flips the result, proving B's independent effect.",
      "ja": "OR では B に結果を決めさせるには A を false に固定します。すると B を false から true に切り替えると結果が反転し、B の独立した影響が証明されます。"
    }
  },
  {
    "q": {
      "vi": "Kỹ thuật kiểm thử dựa trên trải nghiệm nào dùng checklist các loại lỗi phổ biến để hướng dẫn thiết kế ca kiểm thử?",
      "en": "Which experience-based technique uses a checklist of common defect types to guide test case design?",
      "ja": "一般的な欠陥タイプのチェックリストを用いてテストケース設計を導く、経験ベースの技法はどれですか？"
    },
    "options": [
      {
        "vi": "Defect-based / checklist-based testing",
        "en": "Defect-based / checklist-based testing",
        "ja": "欠陥ベース／チェックリストベーステスト"
      },
      {
        "vi": "Exploratory testing (kiểm thử thăm dò)",
        "en": "Exploratory testing",
        "ja": "探索的テスト"
      },
      {
        "vi": "Boundary value analysis",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Decision table testing",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử dựa trên khiếm khuyết (defect-based) dùng danh mục/taxonomy hoặc checklist các loại lỗi đã biết làm cơ sở suy ra ca kiểm thử nhắm vào những loại lỗi đó.",
      "en": "Defect-based testing uses a taxonomy or checklist of known defect types as the basis to derive test cases targeting those defect categories.",
      "ja": "欠陥ベーステストは、既知の欠陥タイプの分類やチェックリストを基にして、それらの欠陥カテゴリを狙うテストケースを導出します。"
    }
  },
  {
    "q": {
      "vi": "Trong phân tích rủi ro dựa trên rủi ro (risk-based testing), 「mức độ rủi ro」 (risk level) thường được xác định bằng tổ hợp của hai yếu tố nào?",
      "en": "In risk-based testing, the risk level is typically determined by the combination of which two factors?",
      "ja": "リスクベーステストにおいて、リスクレベルは通常どの 2 要素の組み合わせで決定されますか？"
    },
    "options": [
      {
        "vi": "Chi phí và thời gian",
        "en": "Cost and time",
        "ja": "コストと時間"
      },
      {
        "vi": "Xác suất (likelihood) và tác động (impact)",
        "en": "Likelihood and impact",
        "ja": "発生可能性（尤度）と影響度"
      },
      {
        "vi": "Số ca kiểm thử và độ phủ",
        "en": "Number of test cases and coverage",
        "ja": "テストケース数とカバレッジ"
      },
      {
        "vi": "Kinh nghiệm nhóm và công cụ",
        "en": "Team experience and tooling",
        "ja": "チーム経験とツール"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Risk level = likelihood (khả năng rủi ro xảy ra, thường liên quan yếu tố kỹ thuật) × impact (mức thiệt hại nếu xảy ra, thường liên quan yếu tố nghiệp vụ).",
      "en": "Risk level = likelihood (probability the risk occurs, often technical) combined with impact (harm if it occurs, often business-related).",
      "ja": "リスクレベル＝発生可能性（リスクが起こる確率、多くは技術的要因）と影響度（起きた場合の損害、多くは業務的要因）の組み合わせです。"
    }
  },
  {
    "q": {
      "vi": "Một ca kiểm thử hiệu năng cần xác định điểm mà hệ thống bắt đầu suy giảm khi tải tăng dần vượt quá công suất kỳ vọng. Đây là loại kiểm thử nào?",
      "en": "A performance test aims to find the point where the system starts to degrade as load gradually increases beyond expected capacity. Which test type is this?",
      "ja": "負荷を期待容量を超えて徐々に増やしたときにシステムが劣化し始める点を見つける性能テスト。これはどのテストタイプか？"
    },
    "options": [
      {
        "vi": "Load testing (kiểm thử tải)",
        "en": "Load testing",
        "ja": "負荷テスト"
      },
      {
        "vi": "Spike testing (kiểm thử đột biến)",
        "en": "Spike testing",
        "ja": "スパイクテスト"
      },
      {
        "vi": "Stress testing (kiểm thử ứng suất)",
        "en": "Stress testing",
        "ja": "ストレステスト"
      },
      {
        "vi": "Endurance / soak testing (kiểm thử bền)",
        "en": "Endurance / soak testing",
        "ja": "耐久（ソーク）テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Stress testing đẩy tải vượt công suất kỳ vọng để xác định giới hạn và điểm suy giảm/gãy của hệ thống, khác load testing (chỉ trong công suất kỳ vọng) và endurance (kéo dài thời gian).",
      "en": "Stress testing pushes load beyond expected capacity to find the system's limits and degradation/breaking point, unlike load testing (within expected capacity) or endurance (over long duration).",
      "ja": "ストレステストは負荷を期待容量を超えて押し上げ、限界や劣化／破綻点を見つけます。負荷テスト（期待容量内）や耐久テスト（長時間）とは異なります。"
    }
  },
  {
    "q": {
      "vi": "Trong kiểm thử chuyển trạng thái, phủ 「0-switch」 tương đương với việc phủ toàn bộ điều gì?",
      "en": "In state transition testing, 0-switch coverage is equivalent to covering all of what?",
      "ja": "状態遷移テストにおいて、0 スイッチカバレッジはすべての何をカバーすることに相当しますか？"
    },
    "options": [
      {
        "vi": "Tất cả các trạng thái",
        "en": "All states",
        "ja": "すべての状態"
      },
      {
        "vi": "Tất cả các cặp chuyển tiếp liên tiếp",
        "en": "All pairs of consecutive transitions",
        "ja": "すべての連続遷移の対"
      },
      {
        "vi": "Tất cả các chuyển tiếp không hợp lệ",
        "en": "All invalid transitions",
        "ja": "すべての無効遷移"
      },
      {
        "vi": "Tất cả các chuyển tiếp đơn hợp lệ (single transitions)",
        "en": "All valid single transitions",
        "ja": "すべての有効な単一遷移"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "0-switch coverage yêu cầu thực thi mỗi chuyển tiếp đơn hợp lệ một lần. 1-switch coverage mới bao phủ mọi chuỗi hai chuyển tiếp liên tiếp.",
      "en": "0-switch coverage requires exercising each valid single transition once. 1-switch coverage covers every sequence of two consecutive transitions.",
      "ja": "0 スイッチカバレッジは各有効な単一遷移を 1 回実行することを要します。1 スイッチカバレッジは連続する 2 遷移のすべての列をカバーします。"
    }
  },
  {
    "q": {
      "vi": "Điều kiện D = (A AND B) OR C. Ca có A=true, B=true, C=false cho D=true. Để chứng minh C ảnh hưởng độc lập tới D trong MC/DC, cần cặp ca nào?",
      "en": "Given D = (A AND B) OR C. A case A=true, B=true, C=false yields D=true. To show C independently affects D in MC/DC, which pair is needed?",
      "ja": "D = (A AND B) OR C とする。A=true, B=true, C=false で D=true。MC/DC で C が D に独立して影響することを示すには、どの対が必要か？"
    },
    "options": [
      {
        "vi": "A=false, C=false (D=false) và A=false, C=true (D=true)",
        "en": "A=false, C=false (D=false) and A=false, C=true (D=true)",
        "ja": "A=false, C=false (D=false) と A=false, C=true (D=true)"
      },
      {
        "vi": "A=true, B=true và thay đổi C — nhưng khi (A AND B)=true thì C không ảnh hưởng",
        "en": "A=true, B=true and toggle C — but when (A AND B)=true, C has no effect",
        "ja": "A=true, B=true で C を切替 — ただし (A AND B)=true のとき C は影響しない"
      },
      {
        "vi": "A=true, C=true và A=true, C=false",
        "en": "A=true, C=true and A=true, C=false",
        "ja": "A=true, C=true と A=true, C=false"
      },
      {
        "vi": "B=true, C=true và B=false, C=true",
        "en": "B=true, C=true and B=false, C=true",
        "ja": "B=true, C=true と B=false, C=true"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Để C ảnh hưởng độc lập tới D=(AND)OR C, phải làm cho (A AND B)=false (ví dụ A=false), rồi đảo C: C=false cho D=false, C=true cho D=true, chứng minh C quyết định kết quả.",
      "en": "For C to independently affect D=(A AND B) OR C, force (A AND B)=false (e.g. A=false), then toggle C: C=false gives D=false, C=true gives D=true, proving C determines the outcome.",
      "ja": "C が D=(A AND B) OR C に独立して影響するには (A AND B)=false（例: A=false）にし、C を切り替える。C=false で D=false、C=true で D=true となり、C が結果を決めることを示します。"
    }
  },
  {
    "q": {
      "vi": "Kỹ thuật kiểm thử tĩnh nào phù hợp NHẤT để phát hiện sớm mâu thuẫn và mơ hồ trong một tài liệu đặc tả yêu cầu chưa có mã nguồn?",
      "en": "Which static technique is BEST to detect contradictions and ambiguities early in a requirements specification with no code yet?",
      "ja": "コードがまだない要件仕様書で、矛盾や曖昧さを早期に検出するのに最も適した静的技法はどれですか？"
    },
    "options": [
      {
        "vi": "Phân tích luồng dữ liệu tự động",
        "en": "Automated data flow analysis",
        "ja": "自動データフロー分析"
      },
      {
        "vi": "Review (đặc biệt inspection) tài liệu yêu cầu",
        "en": "Review (especially inspection) of the requirements",
        "ja": "要件のレビュー（特にインスペクション）"
      },
      {
        "vi": "Phân tích độ phức tạp cyclomatic",
        "en": "Cyclomatic complexity analysis",
        "ja": "循環的複雑度分析"
      },
      {
        "vi": "Kiểm thử hộp trắng",
        "en": "White-box testing",
        "ja": "ホワイトボックステスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với tài liệu yêu cầu chưa có mã, review (nhất là inspection có checklist) là phương pháp tĩnh hiệu quả nhất để phát hiện mâu thuẫn, mơ hồ, thiếu sót sớm; các kỹ thuật kia cần mã nguồn.",
      "en": "For a requirements document with no code, review (especially checklist-driven inspection) is the most effective static method to find contradictions, ambiguities and omissions early; the others need source code.",
      "ja": "コードのない要件文書では、レビュー（特にチェックリスト付きインスペクション）が矛盾・曖昧さ・欠落を早期に発見する最も効果的な静的手法です。他はソースコードを必要とします。"
    }
  },
  {
    "q": {
      "vi": "Trong một đợt kiểm thử, 200 ca lập kế hoạch, 150 đã chạy, 120 đạt. 「Test case pass rate」 (trên số đã chạy) là bao nhiêu?",
      "en": "In a test run, 200 cases planned, 150 executed, 120 passed. What is the test case pass rate (of those executed)?",
      "ja": "あるテスト実行で計画 200 ケース、実行 150、合格 120。実行済みに対するテストケース合格率はいくつか？"
    },
    "options": [
      {
        "vi": "60%",
        "en": "60%",
        "ja": "60%"
      },
      {
        "vi": "75%",
        "en": "75%",
        "ja": "75%"
      },
      {
        "vi": "80%",
        "en": "80%",
        "ja": "80%"
      },
      {
        "vi": "40%",
        "en": "40%",
        "ja": "40%"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Pass rate trên số đã chạy = passed / executed = 120 / 150 = 0.8 = 80%. Nếu tính trên số kế hoạch sẽ là 120/200 = 60%, nhưng câu hỏi nêu rõ trên số đã chạy.",
      "en": "Pass rate of executed = passed / executed = 120 / 150 = 0.8 = 80%. Against planned it would be 120/200 = 60%, but the question specifies executed.",
      "ja": "実行済みに対する合格率＝合格÷実行＝120÷150＝0.8＝80%。計画に対してなら 120÷200＝60% ですが、設問は実行済みを指定しています。"
    }
  },
  {
    "q": {
      "vi": "Đặc trưng nào của Maintainability (ISO 25010) đo mức độ dễ dàng đánh giá tác động của một thay đổi dự kiến lên hệ thống?",
      "en": "Which Maintainability sub-characteristic (ISO 25010) measures how easy it is to assess the impact of an intended change on the system?",
      "ja": "ISO 25010 の保守性のどのサブ特性が、意図した変更がシステムに与える影響を評価する容易さを測りますか？"
    },
    "options": [
      {
        "vi": "Modularity (Tính mô-đun)",
        "en": "Modularity",
        "ja": "モジュール性"
      },
      {
        "vi": "Testability (Khả năng kiểm thử)",
        "en": "Testability",
        "ja": "テスト容易性"
      },
      {
        "vi": "Reusability (Khả năng tái sử dụng)",
        "en": "Reusability",
        "ja": "再利用性"
      },
      {
        "vi": "Analysability (Khả năng phân tích)",
        "en": "Analysability",
        "ja": "解析性（アナライザビリティ）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Analysability đo mức độ dễ đánh giá tác động của thay đổi, chẩn đoán nguyên nhân lỗi hay xác định phần cần sửa. Modularity, Testability, Reusability là các đặc trưng con khác của Maintainability.",
      "en": "Analysability measures how easily one can assess the impact of a change, diagnose failures or identify parts to modify. Modularity, Testability and Reusability are other Maintainability sub-characteristics.",
      "ja": "解析性は変更の影響評価・故障診断・修正箇所特定の容易さを測ります。モジュール性・テスト容易性・再利用性は保守性の他のサブ特性です。"
    }
  },
  {
    "q": {
      "vi": "Test Analyst muốn phủ hết các quy tắc nghiệp vụ với nhiều điều kiện kết hợp và hành động tương ứng. Kỹ thuật nào phù hợp nhất?",
      "en": "A Test Analyst wants to cover business rules with multiple combined conditions and corresponding actions. Which technique fits best?",
      "ja": "テストアナリストが、複数の条件の組み合わせと対応するアクションを持つ業務ルールを網羅したい。最も適した技法はどれか？"
    },
    "options": [
      {
        "vi": "Decision table testing (bảng quyết định)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "State transition testing",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Boundary value analysis",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Use case testing",
        "en": "Use case testing",
        "ja": "ユースケーステスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Bảng quyết định mô hình hóa các tổ hợp điều kiện (rules) và hành động đầu ra tương ứng, lý tưởng để kiểm thử logic nghiệp vụ có nhiều điều kiện kết hợp.",
      "en": "A decision table models combinations of conditions (rules) and their corresponding output actions, ideal for testing business logic with multiple combined conditions.",
      "ja": "デシジョンテーブルは条件の組み合わせ（ルール）と対応する出力アクションをモデル化し、複数条件が組み合わさる業務ロジックのテストに最適です。"
    }
  },
  {
    "q": {
      "vi": "Trong path testing, số đường đi độc tuyến tính (linearly independent paths) cần kiểm thử tối thiểu bằng đại lượng nào?",
      "en": "In path testing, the minimum number of linearly independent paths to test equals which quantity?",
      "ja": "パステストにおいて、テストすべき線形独立パスの最小数はどの量に等しいか？"
    },
    "options": [
      {
        "vi": "Số câu lệnh (statements)",
        "en": "Number of statements",
        "ja": "文の数"
      },
      {
        "vi": "Độ phức tạp cyclomatic V(G)",
        "en": "Cyclomatic complexity V(G)",
        "ja": "循環的複雑度 V(G)"
      },
      {
        "vi": "Số biến trong hàm",
        "en": "Number of variables",
        "ja": "変数の数"
      },
      {
        "vi": "Số đỉnh trong đồ thị",
        "en": "Number of nodes in the graph",
        "ja": "グラフのノード数"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Độ phức tạp cyclomatic V(G) chính là số đường đi độc tuyến tính trong đồ thị luồng điều khiển, đồng thời là cận trên hữu ích cho số ca kiểm thử basis path.",
      "en": "Cyclomatic complexity V(G) is exactly the number of linearly independent paths in the control flow graph and serves as a useful bound for basis path test cases.",
      "ja": "循環的複雑度 V(G) は制御フローグラフ内の線形独立パス数そのものであり、基本パステストケース数の有用な目安になります。"
    }
  },
  {
    "q": {
      "vi": "Trong quản lý kiểm thử, biểu đồ 「burn-down」 của khiếm khuyết còn mở (open defects) đột ngột đi ngang trong khi vẫn tìm thấy lỗi mới gợi ý điều gì?",
      "en": "In test management, an open-defect burn-down chart that suddenly flattens while new defects are still found suggests what?",
      "ja": "テスト管理で、新しい欠陥がまだ見つかっているのに未解決欠陥のバーンダウンが突然横ばいになるのは何を示唆するか？"
    },
    "options": [
      {
        "vi": "Chất lượng sản phẩm đã ổn định hoàn toàn",
        "en": "Product quality has fully stabilised",
        "ja": "製品品質が完全に安定した"
      },
      {
        "vi": "Không cần thêm hồi quy",
        "en": "No further regression is needed",
        "ja": "追加の回帰は不要"
      },
      {
        "vi": "Tốc độ sửa lỗi không theo kịp tốc độ phát hiện, có thể ảnh hưởng tiêu chí kết thúc",
        "en": "Fix rate is not keeping up with discovery, possibly threatening exit criteria",
        "ja": "修正速度が発見速度に追いつかず、終了基準を脅かす可能性がある"
      },
      {
        "vi": "Độ phủ yêu cầu đã đạt 100%",
        "en": "Requirements coverage has reached 100%",
        "ja": "要件カバレッジが 100% に達した"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Số open defect đi ngang trong khi vẫn phát sinh lỗi mới cho thấy tốc độ đóng lỗi ngang bằng hoặc thấp hơn tốc độ mở, rủi ro không đạt tiêu chí kết thúc đúng hạn.",
      "en": "Flat open-defect count while new defects keep appearing shows the closure rate matches or trails the discovery rate, risking the exit criteria and schedule.",
      "ja": "新規欠陥が発生し続ける中で未解決数が横ばいなのは、クローズ速度が発見速度に追いつかないことを示し、終了基準や納期のリスクとなります。"
    }
  },
  {
    "q": {
      "vi": "Trong gTAA, việc thay đổi giao diện của SUT (System Under Test) lý tưởng chỉ nên ảnh hưởng đến lớp nào để bảo vệ testware phía trên?",
      "en": "In the gTAA, a change to the SUT interface should ideally affect only which layer to protect higher-level testware?",
      "ja": "gTAA において、SUT（テスト対象システム）のインタフェース変更は、上位のテストウェアを守るために理想的にはどの層だけに影響すべきか？"
    },
    "options": [
      {
        "vi": "Test Definition Layer",
        "en": "Test Definition Layer",
        "ja": "テスト定義層"
      },
      {
        "vi": "Test Generation Layer",
        "en": "Test Generation Layer",
        "ja": "テスト生成層"
      },
      {
        "vi": "Toàn bộ các lớp cùng lúc",
        "en": "All layers at once",
        "ja": "全層同時"
      },
      {
        "vi": "Test Adaptation Layer",
        "en": "Test Adaptation Layer",
        "ja": "テスト適応層"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test Adaptation Layer đóng vai trò cách ly, kết nối testware với SUT qua adapter; khi giao diện SUT đổi, chỉ cần cập nhật lớp này, giữ Definition và Generation Layer ổn định.",
      "en": "The Test Adaptation Layer isolates and connects testware to the SUT via adapters; when the SUT interface changes, only this layer needs updating, keeping the Definition and Generation layers stable.",
      "ja": "テスト適応層はアダプタを介してテストウェアと SUT を接続・隔離します。SUT インタフェースが変わってもこの層のみ更新すればよく、定義層や生成層は安定を保てます。"
    }
  },
  {
    "q": {
      "vi": "Kỹ thuật nào KHÔNG cần kiến thức về cấu trúc mã nguồn nội bộ để thiết kế ca kiểm thử?",
      "en": "Which technique does NOT require knowledge of internal code structure to design test cases?",
      "ja": "テストケース設計に内部コード構造の知識を必要としない技法はどれか？"
    },
    "options": [
      {
        "vi": "Equivalence partitioning (phân hoạch tương đương)",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Statement coverage (phủ câu lệnh)",
        "en": "Statement coverage",
        "ja": "文カバレッジ"
      },
      {
        "vi": "Branch/decision coverage",
        "en": "Branch/decision coverage",
        "ja": "分岐／判定カバレッジ"
      },
      {
        "vi": "MC/DC",
        "en": "MC/DC",
        "ja": "MC/DC"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Equivalence partitioning là kỹ thuật hộp đen, chỉ dựa trên đặc tả/đầu vào-đầu ra mà không cần biết cấu trúc mã. Các kỹ thuật còn lại là hộp trắng, dựa trên cấu trúc mã.",
      "en": "Equivalence partitioning is a black-box technique based only on specifications/inputs-outputs, needing no code structure. The others are white-box, based on code structure.",
      "ja": "同値分割は仕様や入出力のみに基づくブラックボックス技法で、コード構造は不要です。他はコード構造に基づくホワイトボックス技法です。"
    }
  },
  {
    "q": {
      "vi": "Trong FMEA, hai lỗi có RPN bằng nhau (ví dụ 200) nhưng một lỗi có Severity=10, lỗi kia Severity=4. Test Manager nên ưu tiên xử lý lỗi nào trước và vì sao?",
      "en": "In FMEA two failures have equal RPN (e.g. 200) but one has Severity=10 and the other Severity=4. Which should the Test Manager prioritise and why?",
      "ja": "FMEA で 2 つの故障が同じ RPN（例: 200）だが、一方は Severity=10、他方は Severity=4。テストマネージャーはどちらを優先すべきか、なぜか？"
    },
    "options": [
      {
        "vi": "Lỗi Severity=4 vì dễ sửa hơn",
        "en": "The Severity=4 one because it is easier to fix",
        "ja": "修正が容易なので Severity=4 の方"
      },
      {
        "vi": "Lỗi Severity=10 vì hậu quả nghiêm trọng hơn dù RPN bằng nhau",
        "en": "The Severity=10 one because its consequences are more serious despite equal RPN",
        "ja": "RPN が同じでも結果がより深刻なので Severity=10 の方"
      },
      {
        "vi": "Cả hai đều như nhau, xử lý ngẫu nhiên",
        "en": "Both are equal, handle randomly",
        "ja": "両者は同等でランダムに対応"
      },
      {
        "vi": "Lỗi có Detection cao hơn trước",
        "en": "The one with higher Detection first",
        "ja": "Detection が高い方を先に"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "RPN bằng nhau không đồng nghĩa mức nguy hiểm như nhau; khi Severity rất cao (10), hậu quả tiềm tàng nghiêm trọng nên thường được ưu tiên vượt trên RPN đơn thuần.",
      "en": "Equal RPN does not mean equal danger; when Severity is very high (10) the potential consequences are more serious, so it is usually prioritised beyond raw RPN.",
      "ja": "RPN が同じでも危険度が同じとは限りません。Severity が非常に高い（10）と潜在的な結果が深刻なため、単なる RPN を超えて優先されるのが通常です。"
    }
  },
  {
    "q": {
      "vi": "Đặc trưng chất lượng nào của Security (ISO 25010) bảo đảm hành động của một thực thể có thể truy vết duy nhất về thực thể đó?",
      "en": "Which Security sub-characteristic (ISO 25010) ensures an entity's actions can be traced uniquely to it?",
      "ja": "ISO 25010 のセキュリティのどのサブ特性が、あるエンティティの行為をそのエンティティに一意に追跡できることを保証するか？"
    },
    "options": [
      {
        "vi": "Confidentiality (Tính bảo mật)",
        "en": "Confidentiality",
        "ja": "機密性"
      },
      {
        "vi": "Integrity (Tính toàn vẹn)",
        "en": "Integrity",
        "ja": "完全性"
      },
      {
        "vi": "Accountability (Tính quy trách nhiệm)",
        "en": "Accountability",
        "ja": "責任追跡性（アカウンタビリティ）"
      },
      {
        "vi": "Availability (Tính sẵn sàng)",
        "en": "Availability",
        "ja": "可用性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Accountability là đặc trưng con của Security, đảm bảo mọi hành động có thể truy vết duy nhất về thực thể thực hiện; khác Non-repudiation (không thể chối bỏ) và Integrity.",
      "en": "Accountability is a Security sub-characteristic ensuring actions can be traced uniquely to the acting entity; distinct from Non-repudiation and Integrity.",
      "ja": "責任追跡性はセキュリティのサブ特性で、行為を実行したエンティティに一意に追跡できることを保証します。否認防止性や完全性とは異なります。"
    }
  },
  {
    "q": {
      "vi": "Trong review, vai trò 「moderator」 (điều phối viên) chịu trách nhiệm chính về việc gì?",
      "en": "In a review, the moderator role is primarily responsible for what?",
      "ja": "レビューにおいて、モデレータの役割は主に何に責任を負うか？"
    },
    "options": [
      {
        "vi": "Viết mã sửa lỗi được tìm thấy",
        "en": "Writing the code to fix defects found",
        "ja": "発見された欠陥を修正するコードを書く"
      },
      {
        "vi": "Phê duyệt ngân sách dự án",
        "en": "Approving the project budget",
        "ja": "プロジェクト予算の承認"
      },
      {
        "vi": "Quyết định phát hành sản phẩm cuối",
        "en": "Deciding the final product release",
        "ja": "最終製品リリースの決定"
      },
      {
        "vi": "Lập kế hoạch, dẫn dắt cuộc họp và bảo đảm quy trình review diễn ra hiệu quả",
        "en": "Planning, running the meeting and ensuring the review process runs effectively",
        "ja": "計画立案・会議進行・レビュープロセスの効果的な実施を保証する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Moderator (thường trong inspection) lập kế hoạch, điều phối cuộc họp, đảm bảo tuân thủ quy trình, trung lập và giữ trọng tâm vào việc tìm khiếm khuyết chứ không tranh cãi giải pháp.",
      "en": "The moderator (typically in inspections) plans, leads the meeting, ensures the process is followed, stays neutral and keeps focus on finding defects rather than debating solutions.",
      "ja": "モデレータ（主にインスペクション）は計画・会議進行・プロセス遵守を担い、中立を保ち、解決策の議論ではなく欠陥発見に集中させます。"
    }
  },
  {
    "q": {
      "vi": "Với hàm có điều kiện lồng nhau, đạt 100% branch coverage có bảo đảm đạt 100% MC/DC không?",
      "en": "For a function with nested conditions, does achieving 100% branch coverage guarantee 100% MC/DC?",
      "ja": "入れ子の条件を持つ関数で、100% の分岐カバレッジを達成すれば 100% の MC/DC も保証されるか？"
    },
    "options": [
      {
        "vi": "Không, MC/DC mạnh hơn và đòi hỏi chứng minh từng điều kiện ảnh hưởng độc lập",
        "en": "No, MC/DC is stronger and requires showing each condition affects the decision independently",
        "ja": "いいえ、MC/DC はより強く、各条件が判定に独立して影響することを示す必要がある"
      },
      {
        "vi": "Có, chúng luôn tương đương",
        "en": "Yes, they are always equivalent",
        "ja": "はい、常に同等である"
      },
      {
        "vi": "Không, vì branch coverage mạnh hơn MC/DC",
        "en": "No, because branch coverage is stronger than MC/DC",
        "ja": "いいえ、分岐カバレッジの方が MC/DC より強いから"
      },
      {
        "vi": "Chỉ khi không có toán tử logic",
        "en": "Only when there are no logical operators",
        "ja": "論理演算子がない場合のみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "MC/DC mạnh hơn branch/decision coverage: ngoài việc phủ mỗi nhánh, còn phải chứng minh mỗi điều kiện con ảnh hưởng độc lập tới kết quả quyết định, nên 100% branch không suy ra 100% MC/DC.",
      "en": "MC/DC is stronger than branch/decision coverage: beyond covering each branch it requires showing each sub-condition independently affects the decision, so 100% branch does not imply 100% MC/DC.",
      "ja": "MC/DC は分岐／判定カバレッジより強く、各分岐を網羅するだけでなく各サブ条件が判定に独立して影響することも示す必要があるため、100% 分岐は 100% MC/DC を意味しません。"
    }
  },
  {
    "q": {
      "vi": "Test Analyst dùng classification tree cho 3 phân loại có lần lượt 3, 2 và 4 lớp. Số ca tối thiểu để phủ 「minimum coverage」 (mỗi lá ít nhất một lần) là bao nhiêu?",
      "en": "A Test Analyst uses a classification tree with 3 classifications having 3, 2 and 4 classes. What is the minimum number of cases for minimum coverage (each leaf at least once)?",
      "ja": "テストアナリストが 3・2・4 個のクラスを持つ 3 分類の分類ツリーを使う。最小カバレッジ（各葉を少なくとも 1 回）に必要な最小ケース数はいくつか？"
    },
    "options": [
      {
        "vi": "24 ca (tích các lớp)",
        "en": "24 cases (product of classes)",
        "ja": "24 ケース（クラスの積）"
      },
      {
        "vi": "4 ca (bằng số lớp lớn nhất)",
        "en": "4 cases (equal to the largest class count)",
        "ja": "4 ケース（最大クラス数に等しい）"
      },
      {
        "vi": "9 ca (tổng các lớp)",
        "en": "9 cases (sum of classes)",
        "ja": "9 ケース（クラスの合計）"
      },
      {
        "vi": "3 ca (số phân loại)",
        "en": "3 cases (number of classifications)",
        "ja": "3 ケース（分類の数）"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Minimum coverage yêu cầu mỗi lá được chọn ít nhất một lần; số ca tối thiểu bằng số lớp lớn nhất trong các phân loại, ở đây là 4, vì mỗi ca chọn một lá từ mỗi phân loại.",
      "en": "Minimum coverage requires each leaf selected at least once; the minimum number of cases equals the largest class count among classifications, here 4, since each case picks one leaf per classification.",
      "ja": "最小カバレッジは各葉を少なくとも 1 回選ぶことを要し、最小ケース数は分類中の最大クラス数に等しく、ここでは 4 です。各ケースが分類ごとに 1 葉を選ぶためです。"
    }
  },
  {
    "q": {
      "vi": "Metric nào phản ánh 「mật độ khiếm khuyết」 (defect density) của một module?",
      "en": "Which metric reflects the defect density of a module?",
      "ja": "モジュールの欠陥密度を表すメトリクスはどれか？"
    },
    "options": [
      {
        "vi": "Số ca kiểm thử đã chạy trên module",
        "en": "Number of test cases executed on the module",
        "ja": "モジュールで実行したテストケース数"
      },
      {
        "vi": "Thời gian trung bình sửa một lỗi",
        "en": "Average time to fix a defect",
        "ja": "欠陥修正の平均時間"
      },
      {
        "vi": "Số khiếm khuyết trên đơn vị kích thước (ví dụ mỗi KLOC hoặc function point)",
        "en": "Number of defects per size unit (e.g. per KLOC or function point)",
        "ja": "サイズ単位あたりの欠陥数（例: KLOC あたりまたはファンクションポイントあたり）"
      },
      {
        "vi": "Tỉ lệ ca kiểm thử tự động",
        "en": "Percentage of automated test cases",
        "ja": "自動化テストケースの割合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Defect density = số khiếm khuyết chia cho kích thước module (KLOC, function point...), giúp so sánh chất lượng tương đối giữa các module có kích thước khác nhau.",
      "en": "Defect density = number of defects divided by module size (KLOC, function points, etc.), enabling relative quality comparison across modules of different sizes.",
      "ja": "欠陥密度＝欠陥数÷モジュールサイズ（KLOC やファンクションポイントなど）で、サイズの異なるモジュール間で相対的な品質を比較できます。"
    }
  },
  {
    "q": {
      "vi": "Trong kiểm thử phi chức năng, kỹ thuật 「operational profile」 (hồ sơ vận hành) chủ yếu hỗ trợ loại kiểm thử nào?",
      "en": "In non-functional testing, an operational profile primarily supports which type of testing?",
      "ja": "非機能テストにおいて、運用プロファイル（オペレーショナルプロファイル）は主にどのタイプのテストを支援するか？"
    },
    "options": [
      {
        "vi": "Kiểm thử khả năng bảo trì",
        "en": "Maintainability testing",
        "ja": "保守性テスト"
      },
      {
        "vi": "Kiểm thử khả năng chuyển đổi (portability)",
        "en": "Portability testing",
        "ja": "移植性テスト"
      },
      {
        "vi": "Kiểm thử khả năng truy cập (accessibility)",
        "en": "Accessibility testing",
        "ja": "アクセシビリティテスト"
      },
      {
        "vi": "Kiểm thử độ tin cậy/hiệu năng dựa trên tần suất sử dụng thực tế",
        "en": "Reliability/performance testing based on realistic usage frequency",
        "ja": "実際の使用頻度に基づく信頼性／性能テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Operational profile mô tả tần suất và phân bố các thao tác của người dùng thực, dùng để thiết kế tải và kịch bản phản ánh sử dụng thực tế, phục vụ kiểm thử độ tin cậy và hiệu năng.",
      "en": "An operational profile describes the frequency and distribution of real users' operations, used to design loads and scenarios reflecting real usage for reliability and performance testing.",
      "ja": "運用プロファイルは実ユーザー操作の頻度と分布を記述し、実使用を反映した負荷やシナリオ設計に用いられ、信頼性・性能テストに役立ちます。"
    }
  },
  {
    "q": {
      "vi": "Test Manager quyết định dừng test khi 「độ hội tụ lỗi」 (defect arrival rate) giảm dưới ngưỡng và độ phủ rủi ro đạt mục tiêu. Đây là ví dụ của gì?",
      "en": "A Test Manager stops testing when the defect arrival rate drops below a threshold and risk coverage meets the target. This is an example of what?",
      "ja": "テストマネージャーが欠陥到着率が閾値を下回りリスクカバレッジが目標に達したときにテストを止める。これは何の例か？"
    },
    "options": [
      {
        "vi": "Exit criteria / definition of done (tiêu chí kết thúc)",
        "en": "Exit criteria / definition of done",
        "ja": "終了基準／完了の定義"
      },
      {
        "vi": "Entry criteria (tiêu chí vào)",
        "en": "Entry criteria",
        "ja": "開始基準"
      },
      {
        "vi": "Test oracle",
        "en": "Test oracle",
        "ja": "テストオラクル"
      },
      {
        "vi": "Test charter",
        "en": "Test charter",
        "ja": "テストチャーター"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ngưỡng về tốc độ phát sinh lỗi và mức phủ rủi ro dùng để quyết định khi nào kết thúc kiểm thử chính là tiêu chí kết thúc (exit criteria).",
      "en": "Thresholds on defect arrival rate and risk coverage used to decide when to stop testing constitute exit criteria.",
      "ja": "欠陥到着率やリスクカバレッジの閾値でテスト終了を判断するのは、まさに終了基準です。"
    }
  },
  {
    "q": {
      "vi": "Điều kiện (A AND B) OR (C AND D). Để đạt MC/DC cho biểu thức có 4 điều kiện độc lập này, số ca tối thiểu KHẢ THI thường là bao nhiêu?",
      "en": "For (A AND B) OR (C AND D) with 4 independent conditions, the minimum feasible number of cases for MC/DC is typically what?",
      "ja": "4 個の独立条件を持つ (A AND B) OR (C AND D) に対して、MC/DC の実現可能な最小ケース数は通常いくつか？"
    },
    "options": [
      {
        "vi": "16 (tất cả tổ hợp)",
        "en": "16 (all combinations)",
        "ja": "16（全組み合わせ）"
      },
      {
        "vi": "5 (N+1 với N=4 điều kiện)",
        "en": "5 (N+1 with N=4 conditions)",
        "ja": "5（条件数 N=4 で N+1）"
      },
      {
        "vi": "4",
        "en": "4",
        "ja": "4"
      },
      {
        "vi": "8",
        "en": "8",
        "ja": "8"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với N điều kiện độc lập, MC/DC thường đạt được với N+1 ca; ở đây N=4 nên mục tiêu tối thiểu khả thi là 5 ca, mỗi điều kiện được chứng minh ảnh hưởng độc lập.",
      "en": "For N independent conditions MC/DC is usually achievable with N+1 cases; with N=4 the feasible minimum is 5 cases, each condition shown to affect the outcome independently.",
      "ja": "N 個の独立条件では MC/DC は通常 N+1 ケースで達成でき、N=4 なら実現可能な最小は 5 ケースで、各条件が独立して結果に影響することを示します。"
    }
  },
  {
    "q": {
      "vi": "Trong kiểm thử bảo mật, kỹ thuật 「fuzzing」 chủ yếu nhằm phát hiện điều gì?",
      "en": "In security testing, fuzzing primarily aims to detect what?",
      "ja": "セキュリティテストにおいて、ファジング（ファズテスト）は主に何を検出することを目的とするか？"
    },
    "options": [
      {
        "vi": "Lỗi chính tả trong giao diện",
        "en": "Spelling errors in the UI",
        "ja": "UI のスペルミス"
      },
      {
        "vi": "Độ phủ câu lệnh của mã nguồn",
        "en": "Statement coverage of source code",
        "ja": "ソースコードの文カバレッジ"
      },
      {
        "vi": "Lỗi xử lý đầu vào bất thường/không hợp lệ gây crash hoặc lỗ hổng",
        "en": "Failures handling malformed/invalid inputs causing crashes or vulnerabilities",
        "ja": "不正／無効な入力の処理失敗によるクラッシュや脆弱性"
      },
      {
        "vi": "Tính nhất quán màu sắc thương hiệu",
        "en": "Brand colour consistency",
        "ja": "ブランドカラーの一貫性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Fuzzing bơm hàng loạt đầu vào ngẫu nhiên/không hợp lệ để phát hiện cách hệ thống xử lý sai, gây crash, tràn bộ đệm hay lộ lỗ hổng bảo mật.",
      "en": "Fuzzing injects large volumes of random/invalid inputs to reveal mishandling that causes crashes, buffer overflows or security vulnerabilities.",
      "ja": "ファジングは大量のランダム／無効入力を注入し、クラッシュ・バッファオーバーフロー・セキュリティ脆弱性を引き起こす不適切な処理を明らかにします。"
    }
  },
  {
    "q": {
      "vi": "Khi lựa chọn công cụ tự động hóa cho gTAA, yếu tố nào giúp giảm chi phí bảo trì testware khi UI thay đổi thường xuyên?",
      "en": "When selecting an automation tool for a gTAA, which factor most reduces testware maintenance cost when the UI changes frequently?",
      "ja": "gTAA 用の自動化ツール選定時、UI が頻繁に変わる場合にテストウェア保守コストを最も削減する要因はどれか？"
    },
    "options": [
      {
        "vi": "Ghi/phát lại (record & playback) thuần túy dựa trên tọa độ",
        "en": "Pure record & playback based on coordinates",
        "ja": "座標ベースの純粋なレコード＆プレイバック"
      },
      {
        "vi": "Hard-code toàn bộ dữ liệu trong script",
        "en": "Hard-coding all data in the scripts",
        "ja": "全データをスクリプトにハードコード"
      },
      {
        "vi": "Không dùng cấu trúc lớp nào",
        "en": "Using no layered structure",
        "ja": "階層構造を使わない"
      },
      {
        "vi": "Trừu tượng hóa qua page objects / keyword-driven tách locator khỏi kịch bản",
        "en": "Abstraction via page objects / keyword-driven separating locators from scripts",
        "ja": "ページオブジェクト／キーワード駆動によりロケータをスクリプトから分離する抽象化"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trừu tượng hóa (page object, keyword-driven) tách định danh phần tử và logic khỏi kịch bản, nên khi UI đổi chỉ cần cập nhật một nơi, giảm mạnh chi phí bảo trì. Record/playback thuần rất giòn.",
      "en": "Abstraction (page objects, keyword-driven) separates element locators and logic from scripts, so a UI change is updated in one place, greatly cutting maintenance. Pure record/playback is brittle.",
      "ja": "抽象化（ページオブジェクト・キーワード駆動）は要素ロケータやロジックをスクリプトから分離し、UI 変更を一箇所で更新でき保守コストを大幅に削減します。純粋なレコード／プレイバックは脆弱です。"
    }
  },
  {
    "q": {
      "vi": "Test Manager nhận thấy nhiều lỗi 「rò rỉ」 (defect leakage) từ giai đoạn integration xuống system test. Hành động cải tiến quy trình phù hợp nhất là gì?",
      "en": "A Test Manager sees many defects leaking from integration to system test. What is the most appropriate process improvement?",
      "ja": "テストマネージャーが結合テストからシステムテストへ多くの欠陥漏れを認めた。最も適切なプロセス改善は何か？"
    },
    "options": [
      {
        "vi": "Rà soát và tăng cường tiêu chí kết thúc/độ phủ ở integration test",
        "en": "Review and strengthen integration test exit criteria/coverage",
        "ja": "結合テストの終了基準／カバレッジを見直し強化する"
      },
      {
        "vi": "Bỏ hẳn integration test để tiết kiệm thời gian",
        "en": "Remove integration testing entirely to save time",
        "ja": "時間節約のため結合テストを完全に廃止する"
      },
      {
        "vi": "Chuyển toàn bộ lỗi sang cho khách hàng phát hiện",
        "en": "Let customers find all the defects",
        "ja": "全欠陥を顧客に発見させる"
      },
      {
        "vi": "Giảm số ca ở system test",
        "en": "Reduce the number of system test cases",
        "ja": "システムテストのケース数を減らす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rò rỉ lỗi từ integration cho thấy tầng đó chưa đủ hiệu quả; tăng cường tiêu chí kết thúc, độ phủ và chất lượng ca ở integration giúp bắt lỗi sớm hơn, giảm chi phí sửa về sau.",
      "en": "Leakage from integration signals that level is not effective enough; strengthening its exit criteria, coverage and case quality catches defects earlier and lowers later fix cost.",
      "ja": "結合からの漏れはその段階の有効性不足を示します。終了基準・カバレッジ・ケース品質を強化すれば欠陥を早期に捕捉でき、後工程の修正コストを下げられます。"
    }
  },
  {
    "q": {
      "vi": "Trong data flow testing, chiến lược 「all-uses」 yêu cầu phủ điều gì?",
      "en": "In data flow testing, the all-uses strategy requires covering what?",
      "ja": "データフローテストにおいて、all-uses 戦略は何をカバーすることを要するか？"
    },
    "options": [
      {
        "vi": "Chỉ mọi định nghĩa (all-defs) của biến",
        "en": "Only every definition (all-defs) of a variable",
        "ja": "変数のすべての定義（all-defs）のみ"
      },
      {
        "vi": "Ít nhất một đường def-use cho mọi cặp (định nghĩa, mọi lần sử dụng) của biến",
        "en": "At least one def-use path for every (definition, each use) pair of a variable",
        "ja": "変数の（定義, 各使用）の各対に対して少なくとも 1 本の def-use パス"
      },
      {
        "vi": "Mọi câu lệnh trong hàm",
        "en": "Every statement in the function",
        "ja": "関数内のすべての文"
      },
      {
        "vi": "Mọi đường đi độc tuyến tính",
        "en": "Every linearly independent path",
        "ja": "すべての線形独立パス"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "All-uses yêu cầu, với mỗi định nghĩa của một biến, phủ ít nhất một đường không có định nghĩa lại tới mỗi lần sử dụng (cả p-use và c-use) của định nghĩa đó, mạnh hơn all-defs.",
      "en": "All-uses requires, for each definition of a variable, at least one definition-clear path to each use (both p-use and c-use) of that definition, stronger than all-defs.",
      "ja": "all-uses は変数の各定義について、その定義の各使用（p-use と c-use）まで定義クリアなパスを少なくとも 1 本カバーすることを要し、all-defs より強い。"
    }
  },
  {
    "q": {
      "vi": "Đặc trưng nào của Usability (ISO 25010) đo mức độ người dùng có thể bảo vệ mình khỏi lỗi thao tác gây hậu quả?",
      "en": "Which Usability sub-characteristic (ISO 25010) measures how well users are protected from operational errors with consequences?",
      "ja": "ISO 25010 の使用性のどのサブ特性が、結果を伴う操作ミスからユーザーがどれだけ守られるかを測るか？"
    },
    "options": [
      {
        "vi": "Learnability (Khả năng học)",
        "en": "Learnability",
        "ja": "習得性（ラーナビリティ）"
      },
      {
        "vi": "Operability (Khả năng vận hành)",
        "en": "Operability",
        "ja": "操作性（オペラビリティ）"
      },
      {
        "vi": "User error protection (Bảo vệ khỏi lỗi người dùng)",
        "en": "User error protection",
        "ja": "ユーザーエラー防止（ユーザーエラープロテクション）"
      },
      {
        "vi": "Aesthetics (Tính thẩm mỹ)",
        "en": "User interface aesthetics",
        "ja": "UI の美しさ（エステティクス）"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "User error protection là đặc trưng con của Usability, đo mức hệ thống ngăn người dùng mắc lỗi hoặc giảm nhẹ hậu quả của lỗi thao tác. Learnability và Operability là đặc trưng con khác.",
      "en": "User error protection is a Usability sub-characteristic measuring how the system prevents users from making errors or mitigates their consequences. Learnability and Operability are other sub-characteristics.",
      "ja": "ユーザーエラー防止は使用性のサブ特性で、システムがユーザーのミスを防ぎ、その結果を軽減する度合いを測ります。習得性や操作性は他のサブ特性です。"
    }
  },
  {
    "q": {
      "vi": "Trong Wideband Delphi để ước lượng, đặc điểm cốt lõi phân biệt nó với ước lượng cá nhân là gì?",
      "en": "In Wideband Delphi estimation, what core feature distinguishes it from single-person estimation?",
      "ja": "ワイドバンドデルファイ見積りにおいて、個人見積りと区別する中核的特徴は何か？"
    },
    "options": [
      {
        "vi": "Chỉ dùng công thức toán học cố định",
        "en": "Uses only a fixed mathematical formula",
        "ja": "固定の数式のみを使用する"
      },
      {
        "vi": "Dựa hoàn toàn vào một chuyên gia duy nhất",
        "en": "Relies entirely on a single expert",
        "ja": "単一の専門家に完全に依存する"
      },
      {
        "vi": "Không cần dữ liệu hay thảo luận",
        "en": "Needs no data or discussion",
        "ja": "データも議論も不要"
      },
      {
        "vi": "Nhiều chuyên gia ước lượng độc lập rồi hội tụ qua nhiều vòng thảo luận ẩn danh",
        "en": "Multiple experts estimate independently then converge over several anonymous discussion rounds",
        "ja": "複数の専門家が独立に見積り、匿名の議論を数回重ねて収束させる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Wideband Delphi tập hợp nhiều chuyên gia ước lượng độc lập, sau đó thảo luận về khác biệt và lặp lại nhiều vòng để hội tụ, tận dụng trí tuệ tập thể và giảm thiên lệch cá nhân.",
      "en": "Wideband Delphi gathers several experts who estimate independently, then discuss divergences and iterate over rounds to converge, leveraging collective wisdom and reducing individual bias.",
      "ja": "ワイドバンドデルファイは複数の専門家が独立に見積り、相違点を議論し複数ラウンドで収束させ、集合知を活用し個人バイアスを低減します。"
    }
  },
  {
    "q": {
      "vi": "Một hàm có 4 điều kiện độc lập. Full 「multiple condition coverage」 (phủ mọi tổ hợp điều kiện) đòi hỏi bao nhiêu ca tối đa?",
      "en": "A function has 4 independent conditions. Full multiple condition coverage requires how many cases at most?",
      "ja": "関数に 4 個の独立条件がある。完全な複数条件カバレッジ（全条件組み合わせ）は最大いくつのケースを要するか？"
    },
    "options": [
      {
        "vi": "16",
        "en": "16",
        "ja": "16"
      },
      {
        "vi": "5",
        "en": "5",
        "ja": "5"
      },
      {
        "vi": "8",
        "en": "8",
        "ja": "8"
      },
      {
        "vi": "4",
        "en": "4",
        "ja": "4"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Multiple condition coverage phủ mọi tổ hợp giá trị true/false của các điều kiện, tức 2^N ca; với N=4 là 2^4 = 16 (tối đa, trước khi loại các tổ hợp bất khả thi).",
      "en": "Multiple condition coverage covers all true/false combinations of conditions, i.e. 2^N cases; for N=4 that is 2^4 = 16 (maximum, before removing infeasible combinations).",
      "ja": "複数条件カバレッジは条件の true/false の全組み合わせ、すなわち 2^N ケースをカバーし、N=4 では 2^4=16（実行不能な組み合わせ除外前の最大）です。"
    }
  },
  {
    "q": {
      "vi": "Trong risk-based testing, việc phân bổ nhiều công sức kiểm thử hơn cho vùng có mức rủi ro cao được gọi là gì?",
      "en": "In risk-based testing, allocating more test effort to higher-risk areas is called what?",
      "ja": "リスクベーステストにおいて、リスクの高い領域により多くのテスト工数を割り当てることを何と呼ぶか？"
    },
    "options": [
      {
        "vi": "Test oracle assignment",
        "en": "Test oracle assignment",
        "ja": "テストオラクル割り当て"
      },
      {
        "vi": "Risk-based test prioritisation / depth allocation",
        "en": "Risk-based test prioritisation / depth allocation",
        "ja": "リスクベースのテスト優先順位付け／深さ配分"
      },
      {
        "vi": "Configuration management",
        "en": "Configuration management",
        "ja": "構成管理"
      },
      {
        "vi": "Defect triage",
        "en": "Defect triage",
        "ja": "欠陥トリアージ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong kiểm thử dựa trên rủi ro, mức rủi ro quyết định thứ tự ưu tiên và độ sâu/công sức kiểm thử: vùng rủi ro cao được kiểm thử sâu và sớm hơn.",
      "en": "In risk-based testing the risk level drives prioritisation and the depth/effort of testing: higher-risk areas are tested more deeply and earlier.",
      "ja": "リスクベーステストでは、リスクレベルが優先順位とテストの深さ／工数を決め、リスクの高い領域はより深く早くテストされます。"
    }
  },
  {
    "q": {
      "vi": "Test Analyst cần thiết kế ca cho một trường nhập tuổi hợp lệ 18–65. Áp dụng phân tích giá trị biên hai điểm, các giá trị biên nào nên chọn?",
      "en": "A Test Analyst designs cases for an age field valid 18–65. Using two-point boundary value analysis, which boundary values should be chosen?",
      "ja": "テストアナリストが有効範囲 18〜65 の年齢欄のケースを設計する。2 点境界値分析では、どの境界値を選ぶべきか？"
    },
    "options": [
      {
        "vi": "Chỉ 18 và 65",
        "en": "Only 18 and 65",
        "ja": "18 と 65 のみ"
      },
      {
        "vi": "0, 18, 65, 100",
        "en": "0, 18, 65, 100",
        "ja": "0, 18, 65, 100"
      },
      {
        "vi": "17, 18, 65, 66 (ngay trong và ngay ngoài mỗi biên)",
        "en": "17, 18, 65, 66 (just inside and just outside each boundary)",
        "ja": "17, 18, 65, 66（各境界の内側直近と外側直近）"
      },
      {
        "vi": "Chỉ 17 và 66",
        "en": "Only 17 and 66",
        "ja": "17 と 66 のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phân tích biên hai điểm kiểm thử giá trị ngay trong và ngay ngoài mỗi biên: tại biên dưới là 17 (không hợp lệ) và 18 (hợp lệ), tại biên trên là 65 (hợp lệ) và 66 (không hợp lệ).",
      "en": "Two-point boundary analysis tests values just inside and just outside each boundary: at the lower boundary 17 (invalid) and 18 (valid), at the upper 65 (valid) and 66 (invalid).",
      "ja": "2 点境界値分析は各境界の内側直近と外側直近を検証します。下限では 17（無効）と 18（有効）、上限では 65（有効）と 66（無効）です。"
    }
  },
  {
    "q": {
      "vi": "Trong quản lý cấu hình cho kiểm thử, việc bảo đảm testware (ca, dữ liệu, script) được phiên bản hóa và truy vết tới yêu cầu chủ yếu hỗ trợ điều gì?",
      "en": "In configuration management for testing, versioning and tracing testware (cases, data, scripts) to requirements primarily supports what?",
      "ja": "テストの構成管理において、テストウェア（ケース・データ・スクリプト）をバージョン管理し要件へトレースすることは主に何を支援するか？"
    },
    "options": [
      {
        "vi": "Tăng tốc độ CPU khi chạy test",
        "en": "Increasing CPU speed during test runs",
        "ja": "テスト実行時の CPU 速度向上"
      },
      {
        "vi": "Giảm số lượng yêu cầu",
        "en": "Reducing the number of requirements",
        "ja": "要件数の削減"
      },
      {
        "vi": "Loại bỏ nhu cầu hồi quy",
        "en": "Eliminating the need for regression",
        "ja": "回帰の必要性の排除"
      },
      {
        "vi": "Khả năng tái lập, kiểm soát thay đổi và phân tích tác động khi yêu cầu thay đổi",
        "en": "Reproducibility, change control and impact analysis when requirements change",
        "ja": "再現性・変更管理・要件変更時の影響分析"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Phiên bản hóa và truy vết testware giúp tái lập kết quả, kiểm soát thay đổi và phân tích tác động khi yêu cầu hay sản phẩm thay đổi, nền tảng cho hồi quy và kiểm toán hiệu quả.",
      "en": "Versioning and traceability of testware enable reproducing results, controlling changes and analysing impact when requirements or the product change, underpinning effective regression and audits.",
      "ja": "テストウェアのバージョン管理とトレーサビリティは、結果の再現・変更管理・要件や製品変更時の影響分析を可能にし、効果的な回帰や監査の基盤となります。"
    }
  },
  {
    "q": {
      "vi": "Kỹ thuật kiểm thử nào phù hợp NHẤT để kiểm tra một quy trình có chuỗi màn hình và điều kiện chuyển tiếp phụ thuộc trạng thái trước đó, ví dụ máy ATM?",
      "en": "Which technique best suits testing a process with a sequence of screens and transitions depending on prior state, e.g. an ATM?",
      "ja": "直前の状態に依存する画面列や遷移を持つプロセス（例: ATM）のテストに最も適した技法はどれか？"
    },
    "options": [
      {
        "vi": "State transition testing",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Equivalence partitioning",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Pairwise testing",
        "en": "Pairwise testing",
        "ja": "ペアワイズテスト"
      },
      {
        "vi": "Statement coverage",
        "en": "Statement coverage",
        "ja": "文カバレッジ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "State transition testing mô hình hóa các trạng thái, sự kiện và chuyển tiếp phụ thuộc lịch sử, lý tưởng cho hệ thống như ATM nơi hành vi phụ thuộc trạng thái hiện tại.",
      "en": "State transition testing models states, events and history-dependent transitions, ideal for systems like an ATM where behaviour depends on the current state.",
      "ja": "状態遷移テストは状態・イベント・履歴依存の遷移をモデル化し、現在の状態に振る舞いが依存する ATM のようなシステムに最適です。"
    }
  },
  {
    "q": {
      "vi": "Trong review, chỉ số 「defect density found per page reviewed」 giảm dần theo thời gian trong khi cùng tài liệu chất lượng tương đương gợi ý điều gì cần chú ý?",
      "en": "In reviews, a declining defects-found-per-page metric over time on documents of similar quality suggests what to watch for?",
      "ja": "レビューで、同等品質の文書に対し 1 ページあたり発見欠陥数が時間とともに低下する場合、何に注意すべきか？"
    },
    "options": [
      {
        "vi": "Người review đang làm việc hiệu quả hơn nên không cần quan tâm",
        "en": "Reviewers are simply more effective, so no concern",
        "ja": "レビュアーが単に有能になっただけで懸念なし"
      },
      {
        "vi": "Có thể do mệt mỏi, thiếu chuẩn bị hoặc quy trình review suy giảm — cần điều tra",
        "en": "Possibly reviewer fatigue, poor preparation or process decay — needs investigation",
        "ja": "レビュアーの疲労・準備不足・プロセス劣化の可能性 — 調査が必要"
      },
      {
        "vi": "Tài liệu chắc chắn không còn lỗi",
        "en": "Documents certainly have no more defects",
        "ja": "文書には確実にもう欠陥がない"
      },
      {
        "vi": "Không cần theo dõi chỉ số này",
        "en": "This metric need not be tracked",
        "ja": "このメトリクスは追跡不要"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với tài liệu chất lượng tương đương, tỉ lệ lỗi tìm được giảm có thể phản ánh vấn đề trong quá trình review (mệt mỏi, chuẩn bị kém, thiếu tuân thủ) chứ không hẳn chất lượng tăng, nên cần điều tra.",
      "en": "For documents of comparable quality, a falling find rate may reflect problems in the review process (fatigue, poor preparation, non-compliance) rather than genuinely better quality, so it warrants investigation.",
      "ja": "同等品質の文書で発見率が低下するのは、品質向上ではなくレビュープロセスの問題（疲労・準備不足・不遵守）を反映する可能性があり、調査が必要です。"
    }
  },
  {
    "q": {
      "vi": "Trong gTAA, việc tổ chức test cases dưới dạng 「keyword-driven」 mang lại lợi ích chính nào cho người không lập trình?",
      "en": "In a gTAA, organising test cases as keyword-driven gives which key benefit to non-programmers?",
      "ja": "gTAA において、テストケースをキーワード駆動で構成することは、非プログラマーにどの主要な利点をもたらすか？"
    },
    "options": [
      {
        "vi": "Buộc mọi người phải viết mã cấp thấp",
        "en": "Forces everyone to write low-level code",
        "ja": "全員が低レベルコードを書くことを強制する"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu bảo trì",
        "en": "Eliminates all maintenance needs",
        "ja": "保守の必要を完全に排除する"
      },
      {
        "vi": "Cho phép mô tả ca kiểm thử bằng từ khóa nghiệp vụ, tách khỏi mã thực thi",
        "en": "Lets cases be described in business keywords, decoupled from implementation code",
        "ja": "業務キーワードでケースを記述でき、実装コードから分離できる"
      },
      {
        "vi": "Chỉ chạy được trên một trình duyệt",
        "en": "Runs on only one browser",
        "ja": "1 つのブラウザでしか動かない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Keyword-driven cho phép chuyên gia nghiệp vụ định nghĩa ca kiểm thử bằng các từ khóa cấp cao, còn phần cài đặt từ khóa do người tự động hóa quản lý, tách bạch thiết kế và thực thi.",
      "en": "Keyword-driven lets business experts define cases with high-level keywords while automation engineers maintain the keyword implementations, separating design from implementation.",
      "ja": "キーワード駆動は業務専門家が高レベルキーワードでケースを定義でき、キーワードの実装は自動化エンジニアが保守し、設計と実装を分離します。"
    }
  },
  {
    "q": {
      "vi": "Điều kiện IF (x > 0 AND y > 0). Bộ ca {(x=1,y=1),(x=-1,y=1),(x=1,y=-1)} đạt được mức phủ nào cao nhất cho quyết định này?",
      "en": "For IF (x > 0 AND y > 0), the set {(x=1,y=1),(x=-1,y=1),(x=1,y=-1)} achieves which highest coverage for this decision?",
      "ja": "IF (x > 0 AND y > 0) に対し、{(x=1,y=1),(x=-1,y=1),(x=1,y=-1)} はこの判定で最も高いどのカバレッジを達成するか？"
    },
    "options": [
      {
        "vi": "Chỉ statement coverage",
        "en": "Statement coverage only",
        "ja": "文カバレッジのみ"
      },
      {
        "vi": "Không đạt decision coverage",
        "en": "Does not reach decision coverage",
        "ja": "判定カバレッジに達しない"
      },
      {
        "vi": "Chỉ multiple condition coverage đầy đủ",
        "en": "Full multiple condition coverage only",
        "ja": "完全な複数条件カバレッジのみ"
      },
      {
        "vi": "MC/DC (mỗi điều kiện chứng minh ảnh hưởng độc lập)",
        "en": "MC/DC (each condition shown to affect the decision independently)",
        "ja": "MC/DC（各条件が判定に独立して影響することを示す）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ca (1,1) cho true; (−1,1) đảo x giữ y, đổi kết quả → chứng minh x độc lập; (1,−1) đảo y giữ x, đổi kết quả → chứng minh y độc lập. Đủ cặp cho MC/DC với N+1=3 ca.",
      "en": "(1,1) gives true; (−1,1) toggles x holding y and flips the result, proving x's independence; (1,−1) toggles y holding x, proving y's independence. This satisfies MC/DC with N+1=3 cases.",
      "ja": "(1,1) は true。(−1,1) は y を保ち x を反転し結果が変わるので x の独立性を示す。(1,−1) は x を保ち y を反転し y の独立性を示す。N+1=3 ケースで MC/DC を満たします。"
    }
  },
  {
    "q": {
      "vi": "Test Manager cần chọn giữa hai chiến lược: tự động hóa hồi quy toàn bộ hay ưu tiên tự động các ca ổn định, chạy nhiều lần. Nguyên tắc ROI tự động hóa gợi ý điều gì?",
      "en": "A Test Manager chooses between automating all regression versus prioritising stable, frequently run cases. What does automation ROI reasoning suggest?",
      "ja": "テストマネージャーが全回帰の自動化と、安定で頻繁に実行されるケースを優先自動化するかで迷う。自動化 ROI の観点は何を示唆するか？"
    },
    "options": [
      {
        "vi": "Ưu tiên tự động ca ổn định, chạy lặp nhiều lần để thu hồi chi phí phát triển và bảo trì",
        "en": "Prioritise stable, frequently repeated cases so development and maintenance cost is recouped",
        "ja": "開発・保守コストを回収できるよう、安定して頻繁に繰り返すケースを優先自動化する"
      },
      {
        "vi": "Luôn tự động hóa mọi ca bất kể tần suất chạy",
        "en": "Always automate every case regardless of run frequency",
        "ja": "実行頻度に関係なく常に全ケースを自動化する"
      },
      {
        "vi": "Chỉ tự động hóa ca chạy một lần duy nhất",
        "en": "Only automate cases run exactly once",
        "ja": "一度だけ実行するケースのみ自動化する"
      },
      {
        "vi": "Không bao giờ tự động hóa hồi quy",
        "en": "Never automate regression",
        "ja": "回帰を決して自動化しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "ROI tự động hóa cao nhất khi ca kiểm thử ổn định (ít thay đổi, ít bảo trì) và được chạy lặp lại nhiều lần, giúp thu hồi chi phí đầu tư ban đầu; ca không ổn định hoặc chạy một lần thường không đáng tự động.",
      "en": "Automation ROI is highest for cases that are stable (low change/maintenance) and run repeatedly, recouping the initial investment; unstable or one-off cases rarely justify automation.",
      "ja": "自動化 ROI は、安定（変更・保守が少ない）で繰り返し実行されるケースで最も高く、初期投資を回収できます。不安定または一度きりのケースは通常自動化に値しません。"
    }
  },
  {
    "q": {
      "vi": "Đặc trưng nào của Performance Efficiency (ISO 25010) đo mức tiêu thụ tài nguyên (CPU, bộ nhớ) khi thực hiện chức năng?",
      "en": "Which Performance Efficiency sub-characteristic (ISO 25010) measures resource consumption (CPU, memory) while performing functions?",
      "ja": "ISO 25010 の性能効率のどのサブ特性が、機能実行時の資源消費（CPU・メモリ）を測るか？"
    },
    "options": [
      {
        "vi": "Time behaviour (Hành vi thời gian)",
        "en": "Time behaviour",
        "ja": "時間効率性（タイムビヘイビア）"
      },
      {
        "vi": "Resource utilisation (Sử dụng tài nguyên)",
        "en": "Resource utilisation",
        "ja": "資源効率性（リソースユーティライゼーション）"
      },
      {
        "vi": "Capacity (Sức chứa)",
        "en": "Capacity",
        "ja": "容量（キャパシティ）"
      },
      {
        "vi": "Co-existence (Tính đồng tồn tại)",
        "en": "Co-existence",
        "ja": "共存性（コイグジスタンス）"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Resource utilisation là đặc trưng con của Performance Efficiency, đo lượng và loại tài nguyên (CPU, bộ nhớ, băng thông) mà hệ thống dùng khi vận hành. Time behaviour đo thời gian đáp ứng, Capacity đo giới hạn.",
      "en": "Resource utilisation is a Performance Efficiency sub-characteristic measuring the amounts and types of resources (CPU, memory, bandwidth) used. Time behaviour measures response times, Capacity measures limits.",
      "ja": "資源効率性は性能効率のサブ特性で、システムが使用する資源（CPU・メモリ・帯域）の量と種類を測ります。時間効率性は応答時間、容量は限界を測ります。"
    }
  }
];
