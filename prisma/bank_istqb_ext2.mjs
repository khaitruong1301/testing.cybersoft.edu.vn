// ISTQB question bank — supplementary set 2 (ext2)
// 30 NEW questions: 10 Foundation (CTFL), 10 Advanced (CTAL), 10 Expert (CTEL)
// Each question is fully trilingual: vi / en / ja

export const DATA = [
  // ================= FOUNDATION (10) =================
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Một mô-đun có 8 câu lệnh và 3 nhánh quyết định. Cần tối thiểu bao nhiêu ca kiểm thử để đạt 100% phủ câu lệnh (statement coverage) trong tình huống lý tưởng nhất?",
      en: "A module has 8 statements and 3 decision branches. In the best case, what is the minimum number of test cases needed to reach 100% statement coverage?",
      ja: "あるモジュールには8つのステートメントと3つの判定分岐があります。最良のケースで100%のステートメントカバレッジ（ステートメントカバレッジ）を達成するために必要な最小テストケース数はいくつですか。"
    },
    options: [
      { vi: "Đúng 8 ca, mỗi câu lệnh một ca", en: "Exactly 8 cases, one per statement", ja: "ちょうど8ケース、ステートメントごとに1つ" },
      { vi: "3 ca, bằng số nhánh quyết định", en: "3 cases, equal to the number of decision branches", ja: "3ケース、判定分岐の数と同じ" },
      { vi: "1 ca, nếu một đường đi duy nhất chạy qua tất cả câu lệnh", en: "1 case, if a single path executes every statement", ja: "1ケース、単一のパスがすべてのステートメントを実行する場合" },
      { vi: "Luôn cần 11 ca (8 + 3)", en: "Always 11 cases (8 + 3)", ja: "常に11ケース（8＋3）" }
    ],
    answer: 2,
    exp: {
      vi: "Phủ câu lệnh chỉ yêu cầu mỗi dòng lệnh được thực thi ít nhất một lần. Nếu tồn tại một đường đi chạy qua toàn bộ câu lệnh thì về lý thuyết một ca kiểm thử là đủ; số câu lệnh không quyết định số ca tối thiểu.",
      en: "Statement coverage only requires each executable line to run at least once. If one path traverses all statements, a single test case is theoretically enough; the statement count does not fix the minimum.",
      ja: "ステートメントカバレッジは各実行行が少なくとも1回実行されることのみを要求します。すべてのステートメントを通る1つのパスがあれば理論上1ケースで十分であり、ステートメント数が最小ケース数を決めるわけではありません。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Nhóm phát triển nói: 「Chúng tôi đã sửa lỗi nhưng không có thời gian chạy lại toàn bộ, chỉ chạy các test quanh vùng vừa sửa」. Đây là ví dụ điển hình của loại kiểm thử nào?",
      en: "A dev team says: 'We fixed the defect but had no time to rerun everything, we only ran tests around the changed area.' This is a classic example of which test type?",
      ja: "開発チームが「欠陥を修正したが全部を再実行する時間がなく、変更箇所の周辺のテストだけを実行した」と言っています。これはどのテストタイプの典型例ですか。"
    },
    options: [
      { vi: "Kiểm thử xác nhận (confirmation testing) đầy đủ", en: "Full confirmation testing", ja: "完全な確認テスト" },
      { vi: "Kiểm thử khói (smoke testing)", en: "Smoke testing", ja: "スモークテスト" },
      { vi: "Kiểm thử chấp nhận (acceptance testing)", en: "Acceptance testing", ja: "受け入れテスト" },
      { vi: "Kiểm thử hồi quy có chọn lọc (regression test selection)", en: "Selective regression test selection", ja: "選択的リグレッションテスト選択" }
    ],
    answer: 3,
    exp: {
      vi: "Chạy lại một tập con các test liên quan đến vùng đã thay đổi để phát hiện tác dụng phụ chính là kỹ thuật chọn lọc test hồi quy dựa trên phân tích ảnh hưởng, thay vì chạy lại toàn bộ bộ kiểm thử.",
      en: "Rerunning a subset of tests related to the changed area to detect side effects is exactly regression test selection based on impact analysis, rather than running the whole suite.",
      ja: "変更箇所に関連するテストのサブセットを再実行して副作用を検出することは、全スイートを実行するのではなく、影響分析に基づくリグレッションテスト選択そのものです。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Trường 「Tuổi」 hợp lệ khi từ 18 đến 65. Áp dụng phân tích giá trị biên (boundary value analysis) hai giá trị, tập biên cần kiểm thử là gì?",
      en: "The 'Age' field is valid from 18 to 65. Using two-value boundary value analysis, which set of boundary values should be tested?",
      ja: "「年齢」フィールドは18から65まで有効です。2値の境界値分析（バウンダリバリューアナリシス）を用いる場合、テストすべき境界値の集合はどれですか。"
    },
    options: [
      { vi: "17, 18, 65, 66", en: "17, 18, 65, 66", ja: "17、18、65、66" },
      { vi: "18 và 65", en: "18 and 65", ja: "18と65" },
      { vi: "0, 18, 65, 100", en: "0, 18, 65, 100", ja: "0、18、65、100" },
      { vi: "18, 19, 64, 65", en: "18, 19, 64, 65", ja: "18、19、64、65" }
    ],
    answer: 0,
    exp: {
      vi: "Phân tích giá trị biên hai giá trị kiểm thử ngay tại biên và giá trị liền kề bên ngoài: với biên dưới 18 là 17 và 18, với biên trên 65 là 65 và 66.",
      en: "Two-value boundary value analysis tests the boundary itself and the adjacent value just outside: for the lower bound 18 that is 17 and 18, for the upper bound 65 that is 65 and 66.",
      ja: "2値の境界値分析は境界そのものとその外側の隣接値をテストします。下限18では17と18、上限65では65と66となります。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Phát biểu nào phân biệt ĐÚNG giữa lỗi sai (error), khiếm khuyết (defect) và hỏng hóc (failure)?",
      en: "Which statement CORRECTLY distinguishes error, defect and failure?",
      ja: "エラー、欠陥、故障を正しく区別している記述はどれですか。"
    },
    options: [
      { vi: "Failure là hành động sai của con người dẫn tới defect trong mã", en: "A failure is a human wrong action leading to a defect in code", ja: "故障はコード内の欠陥につながる人間の誤った行為である" },
      { vi: "Defect luôn dẫn tới failure trong mọi lần chạy", en: "A defect always leads to a failure in every run", ja: "欠陥は毎回の実行で必ず故障につながる" },
      { vi: "Error là hành động sai của con người, có thể tạo ra defect, và defect khi thực thi có thể gây failure", en: "An error is a human wrong action that may create a defect, and a defect when executed may cause a failure", ja: "エラーは人間の誤った行為で欠陥を生み得て、欠陥が実行されると故障を引き起こし得る" },
      { vi: "Error và failure là hai tên gọi của cùng một khái niệm", en: "Error and failure are two names for the same concept", ja: "エラーと故障は同じ概念の2つの呼び名である" }
    ],
    answer: 2,
    exp: {
      vi: "Chuỗi nhân quả là: con người mắc error (sai sót) khi làm việc, tạo ra defect (khiếm khuyết) trong sản phẩm; khi defect được thực thi trong điều kiện phù hợp mới sinh ra failure (hỏng hóc quan sát được). Không phải defect nào cũng gây failure.",
      en: "The causal chain is: a human makes an error, which may introduce a defect in the product; when that defect is executed under suitable conditions it may produce an observable failure. Not every defect causes a failure.",
      ja: "因果連鎖は、人間がエラーを犯し製品に欠陥を作り込み、その欠陥が適切な条件下で実行されると観測可能な故障を生じる、というものです。すべての欠陥が故障を引き起こすわけではありません。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Theo bảy nguyên lý kiểm thử, câu nói 「Kiểm thử càng nhiều thì cuối cùng sẽ chứng minh phần mềm không còn lỗi」 sai vì?",
      en: "According to the seven testing principles, the claim 'Enough testing will eventually prove the software has no defects' is wrong because?",
      ja: "テストの7原則によれば、「十分にテストすればソフトウェアに欠陥がないことを最終的に証明できる」という主張が誤っている理由は何ですか。"
    },
    options: [
      { vi: "Kiểm thử vét cạn luôn khả thi nếu có đủ ngân sách", en: "Exhaustive testing is always feasible with enough budget", ja: "十分な予算があれば網羅的テストは常に実現可能である" },
      { vi: "Lỗi luôn phân bố đều nên kiểm thử nhiều là đủ", en: "Defects are always evenly distributed so more testing suffices", ja: "欠陥は常に均等に分布するため多くテストすれば十分である" },
      { vi: "Chỉ kiểm thử tự động mới chứng minh được không còn lỗi", en: "Only automated testing can prove no defects remain", ja: "自動テストのみが欠陥が残っていないことを証明できる" },
      { vi: "Kiểm thử chỉ có thể cho thấy sự hiện diện của lỗi, không thể chứng minh sự vắng mặt của lỗi", en: "Testing can show the presence of defects but cannot prove their absence", ja: "テストは欠陥の存在を示せるが不在を証明することはできない" }
    ],
    answer: 3,
    exp: {
      vi: "Nguyên lý 「kiểm thử cho thấy sự hiện diện của khiếm khuyết」 khẳng định kiểm thử có thể tìm ra lỗi nhưng không bao giờ chứng minh được phần mềm hoàn toàn không còn lỗi, dù kiểm thử nhiều đến đâu.",
      en: "The principle 'testing shows the presence of defects' states that testing can find defects but can never prove the software is completely defect-free, no matter how much testing is done.",
      ja: "「テストは欠陥の存在を示す」原則は、テストは欠陥を見つけられるが、どれだけテストしてもソフトウェアが完全に欠陥ゼロであることは証明できないことを述べています。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Trong quy trình quản lý khiếm khuyết, một bug được chuyển sang trạng thái 「Rejected - Not a bug」. Vai trò nào thường ra quyết định cuối cùng về việc bug có được sửa hay không?",
      en: "In the defect management process a bug is moved to 'Rejected - Not a bug'. Which role typically makes the final decision on whether a bug will be fixed?",
      ja: "欠陥管理プロセスで、あるバグが「却下-バグではない」状態に移されました。バグを修正するかどうかの最終決定を通常行う役割はどれですか。"
    },
    options: [
      { vi: "Hội đồng kiểm soát thay đổi hoặc quản lý sản phẩm (change control board / product owner)", en: "The change control board or product owner", ja: "変更管理委員会またはプロダクトオーナー" },
      { vi: "Người kiểm thử phát hiện ra bug", en: "The tester who found the bug", ja: "バグを発見したテスター" },
      { vi: "Bất kỳ lập trình viên nào trong nhóm", en: "Any developer in the team", ja: "チーム内の任意の開発者" },
      { vi: "Người dùng cuối", en: "The end user", ja: "エンドユーザー" }
    ],
    answer: 0,
    exp: {
      vi: "Quyết định xử lý hay bác bỏ một khiếm khuyết dựa trên rủi ro, ưu tiên và phạm vi thường do một hội đồng kiểm soát thay đổi hoặc chủ sản phẩm quyết định, không phải cá nhân tester hay dev riêng lẻ.",
      en: "The decision to fix or reject a defect based on risk, priority and scope is usually made by a change control board or the product owner, not by an individual tester or developer.",
      ja: "リスク、優先度、スコープに基づいて欠陥を修正するか却下するかの決定は、通常、個々のテスターや開発者ではなく、変更管理委員会またはプロダクトオーナーが行います。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Bảng quyết định (decision table) có 3 điều kiện nhị phân độc lập. Số quy tắc (cột) tối đa trước khi rút gọn là bao nhiêu?",
      en: "A decision table has 3 independent binary conditions. What is the maximum number of rules (columns) before any simplification?",
      ja: "ある決定表（デシジョンテーブル）には独立した二値条件が3つあります。簡略化前のルール（列）の最大数はいくつですか。"
    },
    options: [
      { vi: "6", en: "6", ja: "6" },
      { vi: "9", en: "9", ja: "9" },
      { vi: "8", en: "8", ja: "8" },
      { vi: "3", en: "3", ja: "3" }
    ],
    answer: 2,
    exp: {
      vi: "Mỗi điều kiện nhị phân có 2 khả năng, nên với 3 điều kiện độc lập số tổ hợp tối đa là 2 mũ 3 bằng 8 quy tắc; sau đó có thể rút gọn nếu tồn tại điều kiện không quan trọng.",
      en: "Each binary condition has 2 possibilities, so with 3 independent conditions the maximum number of combinations is 2 to the power 3, which equals 8 rules; it can later be collapsed if some conditions are irrelevant.",
      ja: "各二値条件には2つの可能性があるため、独立した3条件では組み合わせの最大数は2の3乗で8ルールとなります。その後、無関係な条件があれば簡略化できます。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Hoạt động nào thuộc giai đoạn 「phân tích kiểm thử」 (test analysis) chứ KHÔNG phải 「thiết kế kiểm thử」 (test design)?",
      en: "Which activity belongs to the 'test analysis' phase and NOT to 'test design'?",
      ja: "「テスト分析」フェーズに属し、「テスト設計」には属さない活動はどれですか。"
    },
    options: [
      { vi: "Xác định các điều kiện kiểm thử (test conditions) từ cơ sở kiểm thử", en: "Identifying test conditions from the test basis", ja: "テストベースからテスト条件を特定する" },
      { vi: "Viết các ca kiểm thử cụ thể với dữ liệu đầu vào", en: "Writing concrete test cases with input data", ja: "入力データを伴う具体的なテストケースを書く" },
      { vi: "Chuẩn bị dữ liệu kiểm thử và môi trường", en: "Preparing test data and environment", ja: "テストデータと環境を準備する" },
      { vi: "Thực thi ca kiểm thử và ghi nhận kết quả", en: "Executing test cases and recording results", ja: "テストケースを実行し結果を記録する" }
    ],
    answer: 0,
    exp: {
      vi: "Phân tích kiểm thử trả lời câu hỏi 「kiểm thử cái gì」 bằng cách xác định các điều kiện kiểm thử từ cơ sở kiểm thử; còn thiết kế kiểm thử trả lời 「kiểm thử như thế nào」 bằng việc tạo ca kiểm thử cụ thể.",
      en: "Test analysis answers 'what to test' by identifying test conditions from the test basis; test design answers 'how to test' by creating concrete test cases.",
      ja: "テスト分析はテストベースからテスト条件を特定して「何をテストするか」に答え、テスト設計は具体的なテストケースを作成して「どうテストするか」に答えます。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Trong mô hình chữ V, mức kiểm thử nào có cơ sở kiểm thử chủ yếu là 「đặc tả yêu cầu nghiệp vụ và tình huống người dùng」?",
      en: "In the V-model, which test level uses 'business requirements and user scenarios' as its primary test basis?",
      ja: "Vモデルにおいて、「業務要件とユーザーシナリオ」を主なテストベースとするテストレベルはどれですか。"
    },
    options: [
      { vi: "Kiểm thử đơn vị (component testing)", en: "Component testing", ja: "コンポーネントテスト" },
      { vi: "Kiểm thử tích hợp (integration testing)", en: "Integration testing", ja: "統合テスト" },
      { vi: "Kiểm thử hệ thống (system testing)", en: "System testing", ja: "システムテスト" },
      { vi: "Kiểm thử chấp nhận (acceptance testing)", en: "Acceptance testing", ja: "受け入れテスト" }
    ],
    answer: 3,
    exp: {
      vi: "Kiểm thử chấp nhận đối chiếu hệ thống với nhu cầu nghiệp vụ và tình huống sử dụng thực tế của người dùng, do đó cơ sở kiểm thử là yêu cầu nghiệp vụ, quy trình và kịch bản người dùng.",
      en: "Acceptance testing validates the system against business needs and real user scenarios, so its test basis is business requirements, processes and user scenarios.",
      ja: "受け入れテストはシステムを業務ニーズと実際のユーザーシナリオに照らして検証するため、そのテストベースは業務要件、プロセス、ユーザーシナリオです。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Một dự án Agile áp dụng 「kiểm thử thăm dò」 (exploratory testing) theo phiên (session-based). Đặc điểm KHÁC BIỆT so với kiểm thử theo kịch bản (scripted) là gì?",
      en: "An Agile project uses session-based exploratory testing. What is its KEY difference from scripted testing?",
      ja: "あるアジャイルプロジェクトがセッションベースの探索的テストを用いています。スクリプトテストとの主な違いは何ですか。"
    },
    options: [
      { vi: "Thiết kế, thực thi và học hỏi diễn ra đồng thời trong phiên có mục tiêu (charter)", en: "Design, execution and learning happen concurrently within a chartered session", ja: "設計、実行、学習がチャーター付きセッション内で同時に行われる" },
      { vi: "Mọi bước kiểm thử phải được viết chi tiết trước khi chạy", en: "Every test step must be written in detail before execution", ja: "すべてのテスト手順は実行前に詳細に記述されなければならない" },
      { vi: "Không cần bất kỳ mục tiêu hay ghi chép nào", en: "It needs no objective or notes at all", ja: "目的や記録は一切不要である" },
      { vi: "Chỉ được thực hiện bởi công cụ tự động", en: "It can only be performed by automation tools", ja: "自動化ツールのみで実行できる" }
    ],
    answer: 0,
    exp: {
      vi: "Kiểm thử thăm dò theo phiên gắn với một charter (mục tiêu) và tester đồng thời thiết kế, thực thi và học hỏi rồi điều chỉnh hướng đi; khác với kịch bản được viết đầy đủ trước khi thực thi.",
      en: "Session-based exploratory testing is bound to a charter, and the tester simultaneously designs, executes and learns, then adapts the approach; unlike scripted tests fully written before execution.",
      ja: "セッションベースの探索的テストはチャーターに紐づき、テスターが設計、実行、学習を同時に行い方針を調整します。実行前に完全に記述されるスクリプトテストとは異なります。"
    }
  },

  // ================= ADVANCED (10) =================
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Đoạn mã có cấu trúc: IF (A AND B) THEN ... Để đạt phủ điều kiện/quyết định thay đổi (Modified Condition/Decision Coverage - MC/DC) cho biểu thức này, cần tối thiểu bao nhiêu ca kiểm thử?",
      en: "Code contains: IF (A AND B) THEN ... To achieve Modified Condition/Decision Coverage (MC/DC) for this expression, what is the minimum number of test cases required?",
      ja: "コードに IF (A AND B) THEN ... があります。この式に対して改良条件判定カバレッジ（MC/DC）を達成するために必要な最小テストケース数はいくつですか。"
    },
    options: [
      { vi: "2", en: "2", ja: "2" },
      { vi: "3", en: "3", ja: "3" },
      { vi: "4", en: "4", ja: "4" },
      { vi: "1", en: "1", ja: "1" }
    ],
    answer: 1,
    exp: {
      vi: "Với N điều kiện độc lập, MC/DC thường cần N+1 ca. Biểu thức A AND B có 2 điều kiện, cần 3 ca: (A=T,B=T) cho kết quả T, (A=F,B=T) và (A=T,B=F) mỗi cái cho thấy một điều kiện độc lập tác động lên quyết định.",
      en: "For N independent conditions, MC/DC typically needs N+1 cases. The expression A AND B has 2 conditions, needing 3 cases: (A=T,B=T) giving T, plus (A=F,B=T) and (A=T,B=F) each showing one condition independently affects the decision.",
      ja: "N個の独立条件に対しMC/DCは通常N+1ケースを必要とします。式A AND Bは2条件なので3ケースが必要です。(A=T,B=T)がT、(A=F,B=T)と(A=T,B=F)がそれぞれ1条件が独立して判定に影響することを示します。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Nhóm dùng phân tích rủi ro dựa trên khả năng xảy ra và mức tác động. Một tính năng có khả năng lỗi thấp nhưng tác động cực cao (ví dụ tính lãi ngân hàng). Chiến lược kiểm thử dựa rủi ro (risk-based testing) nên?",
      en: "A team uses risk analysis based on likelihood and impact. A feature has low likelihood of failure but extremely high impact (e.g. bank interest calculation). Risk-based testing should?",
      ja: "チームは発生可能性と影響度に基づくリスク分析を用います。ある機能は故障の可能性は低いが影響が極めて大きい（例：銀行の利息計算）。リスクベーステストはどうすべきですか。"
    },
    options: [
      { vi: "Vẫn ưu tiên kiểm thử kỹ vì mức rủi ro là tích hợp của khả năng và tác động, tác động cao đủ đẩy rủi ro lên cao", en: "Still prioritize thorough testing because risk combines likelihood and impact, and high impact raises overall risk", ja: "リスクは可能性と影響の合成であり高影響が全体リスクを高めるため、依然として入念にテストを優先する" },
      { vi: "Bỏ qua vì khả năng xảy ra thấp", en: "Skip it because likelihood is low", ja: "可能性が低いためスキップする" },
      { vi: "Chỉ chạy kiểm thử khói một lần", en: "Only run smoke testing once", ja: "スモークテストを1回だけ実行する" },
      { vi: "Giao hoàn toàn cho kiểm thử tự động không giám sát", en: "Delegate entirely to unattended automation", ja: "完全に無人自動化に委ねる" }
    ],
    answer: 0,
    exp: {
      vi: "Mức rủi ro là kết hợp của khả năng xảy ra và mức tác động. Tác động thảm khốc như tính sai lãi có thể nâng rủi ro tổng thể lên cao dù khả năng thấp, nên vẫn cần ưu tiên kiểm thử sâu.",
      en: "Risk level combines likelihood and impact. A catastrophic impact such as wrong interest calculation can push overall risk high even when likelihood is low, so deep testing must still be prioritized.",
      ja: "リスクレベルは可能性と影響の組み合わせです。誤った利息計算のような壊滅的な影響は、可能性が低くても全体リスクを高め得るため、依然として深いテストを優先すべきです。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Trong kiểm thử chuyển trạng thái (state transition testing), khái niệm 「chuyển trạng thái không hợp lệ」 (invalid transition) được kiểm thử tốt nhất bằng?",
      en: "In state transition testing, 'invalid transitions' are best tested using?",
      ja: "状態遷移テストにおいて、「無効な遷移」を最もよくテストする方法はどれですか。"
    },
    options: [
      { vi: "Bảng chuyển trạng thái (state table) liệt kê mọi cặp trạng thái - sự kiện kể cả cặp không được phép", en: "A state table listing every state-event pair including disallowed ones", ja: "許可されない組を含むすべての状態-イベントの組を列挙した状態表" },
      { vi: "Sơ đồ chuyển trạng thái chỉ vẽ các mũi tên hợp lệ", en: "A state diagram drawing only valid arrows", ja: "有効な矢印のみを描いた状態図" },
      { vi: "Chỉ kiểm thử đường đi 0-switch", en: "Testing only 0-switch paths", ja: "0スイッチのパスのみをテストする" },
      { vi: "Phân vùng tương đương trên biến đầu vào", en: "Equivalence partitioning on input variables", ja: "入力変数に対する同値分割" }
    ],
    answer: 0,
    exp: {
      vi: "Sơ đồ chỉ vẽ các chuyển hợp lệ, còn bảng trạng thái liệt kê tất cả tổ hợp trạng thái - sự kiện, giúp phát hiện và kiểm thử những chuyển không được phép (ô trống trong sơ đồ) để đảm bảo hệ thống từ chối đúng cách.",
      en: "A diagram shows only valid transitions, while a state table enumerates all state-event combinations, exposing and enabling testing of disallowed transitions (the blank cells) to ensure the system rejects them correctly.",
      ja: "図は有効な遷移のみを示しますが、状態表はすべての状態-イベントの組み合わせを列挙し、許可されない遷移（図の空白セル）を明らかにしてテストでき、システムが正しく拒否することを保証します。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Test Analyst đo được: chạy 200 test, 30 test thất bại, trong đó 12 test thất bại do cùng một khiếm khuyết môi trường. Chỉ số nào phản ánh SAI chất lượng sản phẩm nếu không phân tích nguyên nhân gốc?",
      en: "A Test Analyst measures: 200 tests run, 30 failed, of which 12 failed due to the same environment defect. Which metric MISREPRESENTS product quality if root cause is not analyzed?",
      ja: "テストアナリストが計測しました：200テスト実行、30テスト失敗、うち12テストは同一の環境欠陥が原因でした。根本原因を分析しない場合、製品品質を誤って表す指標はどれですか。"
    },
    options: [
      { vi: "Mật độ khiếm khuyết theo module sau khi phân loại nguyên nhân", en: "Defect density per module after cause classification", ja: "原因分類後のモジュール別欠陥密度" },
      { vi: "Số khiếm khuyết sản phẩm thực sự đã xác nhận", en: "The count of confirmed genuine product defects", ja: "確認された真の製品欠陥数" },
      { vi: "Xu hướng khiếm khuyết theo thời gian sau khi loại trừ lỗi hạ tầng", en: "Defect trend over time after excluding infrastructure issues", ja: "インフラ問題を除外した後の時間経過による欠陥傾向" },
      { vi: "Tỷ lệ test thất bại thô (fail rate) tính gộp cả lỗi môi trường", en: "The raw test fail rate that lumps in environment failures", ja: "環境故障を含めた素のテスト失敗率" }
    ],
    answer: 3,
    exp: {
      vi: "Tỷ lệ thất bại thô 30/200 gộp cả 12 lần thất bại do một lỗi môi trường sẽ thổi phồng cảm nhận về chất lượng kém của sản phẩm; cần phân tích nguyên nhân gốc và tách lỗi môi trường khỏi khiếm khuyết sản phẩm.",
      en: "The raw fail rate 30/200 that includes 12 failures from a single environment defect overstates poor product quality; root cause analysis is needed to separate environment issues from product defects.",
      ja: "単一の環境欠陥による12件の失敗を含む素の失敗率30/200は、製品品質の悪さを誇張します。環境問題を製品欠陥から分離するために根本原因分析が必要です。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Một Technical Test Analyst thực hiện kiểm thử hiệu năng. Hệ thống chịu tải ổn định ở 500 người dùng đồng thời, nhưng thời gian phản hồi tăng vọt ở 520. Loại kiểm thử hiệu năng nào giúp xác định chính xác điểm gãy này?",
      en: "A Technical Test Analyst runs performance testing. The system is stable at 500 concurrent users but response time spikes at 520. Which performance test type pinpoints this breaking point?",
      ja: "テクニカルテストアナリストが性能テストを実施します。システムは同時500ユーザーで安定していますが、520で応答時間が急上昇します。この破綻点を特定する性能テストタイプはどれですか。"
    },
    options: [
      { vi: "Kiểm thử tải (load testing) ở một mức cố định", en: "Load testing at one fixed level", ja: "固定レベルでの負荷テスト" },
      { vi: "Kiểm thử khả năng chịu đựng (soak/endurance testing)", en: "Soak/endurance testing", ja: "ソーク/耐久テスト" },
      { vi: "Kiểm thử nâng dần đến giới hạn (stress/scalability testing) để tìm điểm bão hòa", en: "Stress/scalability testing ramping up to find the saturation point", ja: "飽和点を見つけるために増加させるストレス/スケーラビリティテスト" },
      { vi: "Kiểm thử khả dụng (usability testing)", en: "Usability testing", ja: "ユーザビリティテスト" }
    ],
    answer: 2,
    exp: {
      vi: "Để xác định điểm hệ thống bắt đầu suy giảm khi vượt ngưỡng, cần tăng tải dần vượt mức bình thường; đó là kiểm thử stress/khả năng mở rộng nhằm tìm điểm bão hòa hoặc điểm gãy.",
      en: "To find where a system degrades once it exceeds capacity, load must be ramped beyond normal levels; that is stress/scalability testing aimed at locating the saturation or breaking point.",
      ja: "システムが容量を超えて劣化し始める点を見つけるには、通常レベルを超えて負荷を徐々に増やす必要があります。それが飽和点や破綻点を特定するストレス/スケーラビリティテストです。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Khi thiết kế bộ kiểm thử tổ hợp (combinatorial), kỹ thuật 「kiểm thử cặp đôi」 (pairwise testing) giả định điều gì về khiếm khuyết?",
      en: "When designing a combinatorial test suite, what does the 'pairwise testing' technique assume about defects?",
      ja: "組み合わせテストスイートを設計する際、「ペアワイズテスト」技法は欠陥について何を仮定していますか。"
    },
    options: [
      { vi: "Mọi khiếm khuyết chỉ do một tham số duy nhất gây ra", en: "Every defect is caused by a single parameter only", ja: "すべての欠陥は単一のパラメータのみで生じる" },
      { vi: "Phần lớn khiếm khuyết phát sinh từ tương tác của tối đa hai tham số", en: "Most defects arise from interactions of at most two parameters", ja: "ほとんどの欠陥は最大2つのパラメータの相互作用から生じる" },
      { vi: "Khiếm khuyết chỉ xuất hiện khi tất cả tham số cùng đạt giá trị biên", en: "Defects appear only when all parameters hit boundary values together", ja: "欠陥はすべてのパラメータが同時に境界値になるときのみ現れる" },
      { vi: "Không có mối liên hệ nào giữa tham số và khiếm khuyết", en: "There is no relationship between parameters and defects", ja: "パラメータと欠陥の間に関係はない" }
    ],
    answer: 1,
    exp: {
      vi: "Kiểm thử cặp đôi dựa trên quan sát thực nghiệm rằng nhiều khiếm khuyết đến từ tương tác giữa hai tham số, nên chỉ cần bao phủ mọi cặp giá trị là bắt được phần lớn lỗi mà không cần vét cạn mọi tổ hợp.",
      en: "Pairwise testing rests on the empirical observation that many defects stem from interactions between two parameters, so covering every pair of values catches most defects without exhaustively testing all combinations.",
      ja: "ペアワイズテストは、多くの欠陥が2つのパラメータ間の相互作用から生じるという経験的観察に基づき、すべての値のペアを網羅すればすべての組み合わせを網羅せずとも大半の欠陥を捉えられます。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Test Manager cần ước lượng công sức kiểm thử. Kỹ thuật nào dựa trên việc chia nhỏ công việc rồi cộng dồn ước lượng chi tiết từ dưới lên?",
      en: "A Test Manager needs to estimate test effort. Which technique breaks work into pieces and sums detailed bottom-up estimates?",
      ja: "テストマネージャーがテスト工数を見積もる必要があります。作業を分割し、詳細なボトムアップ見積もりを合計する技法はどれですか。"
    },
    options: [
      { vi: "Ước lượng dựa trên chuyên gia (Delphi rộng - wideband Delphi) đơn thuần", en: "Pure expert-based estimation (wideband Delphi)", ja: "純粋な専門家ベース見積もり（ワイドバンドデルファイ）" },
      { vi: "Ước lượng dựa trên tỷ lệ so với phát triển", en: "Ratio-based estimation relative to development", ja: "開発に対する比率ベース見積もり" },
      { vi: "Ước lượng dựa trên cấu trúc phân rã công việc (work breakdown structure - WBS)", en: "Work breakdown structure (WBS) based estimation", ja: "作業分解構成（WBS）に基づく見積もり" },
      { vi: "Đoán nhanh theo trực giác không phân rã", en: "Quick intuition guessing without decomposition", ja: "分解なしの素早い直感的推測" }
    ],
    answer: 2,
    exp: {
      vi: "Ước lượng theo cấu trúc phân rã công việc chia toàn bộ hoạt động kiểm thử thành các nhiệm vụ nhỏ có thể ước lượng riêng, rồi tổng hợp từ dưới lên để ra tổng công sức, đó là cách tiếp cận bottom-up dựa trên WBS.",
      en: "WBS-based estimation splits the whole testing activity into small individually estimable tasks and aggregates them bottom-up into total effort, which is the bottom-up approach built on the work breakdown structure.",
      ja: "WBSベースの見積もりは、テスト活動全体を個別に見積もり可能な小タスクに分割し、ボトムアップで総工数に集約します。これが作業分解構成に基づくボトムアップ手法です。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Trong kiểm thử bảo mật ứng dụng web, một Test Analyst cần kiểm tra việc lọc đầu vào chống chèn mã. Kỹ thuật đầu vào nào phù hợp nhất để phát hiện lỗ hổng SQL injection?",
      en: "In web application security testing, a Test Analyst must check input filtering against code injection. Which input technique best detects SQL injection vulnerabilities?",
      ja: "Webアプリケーションのセキュリティテストで、テストアナリストがコードインジェクション対策の入力フィルタリングを確認する必要があります。SQLインジェクションの脆弱性を検出するのに最適な入力技法はどれですか。"
    },
    options: [
      { vi: "Chỉ nhập dữ liệu hợp lệ đúng định dạng", en: "Only entering valid, well-formatted data", ja: "正しい形式の有効なデータのみを入力する" },
      { vi: "Chèn các chuỗi ký tự đặc biệt và cú pháp SQL độc hại vào trường nhập để xem hệ thống có xử lý an toàn không", en: "Injecting special characters and malicious SQL syntax into fields to see if the system handles them safely", ja: "特殊文字や悪意あるSQL構文をフィールドに挿入し、システムが安全に処理するか確認する" },
      { vi: "Chỉ đo thời gian phản hồi của trang", en: "Only measuring page response time", ja: "ページの応答時間のみを計測する" },
      { vi: "Kiểm tra bố cục giao diện trên nhiều trình duyệt", en: "Checking UI layout across browsers", ja: "複数ブラウザでUIレイアウトを確認する" }
    ],
    answer: 1,
    exp: {
      vi: "Để phát hiện SQL injection, tester chủ động đưa vào các ký tự đặc biệt và mảnh cú pháp SQL độc hại nhằm xem ứng dụng có làm sạch/tham số hóa đầu vào hay để lộ truy vấn; đây là kiểm thử tiêu cực có chủ đích.",
      en: "To detect SQL injection, the tester deliberately supplies special characters and malicious SQL fragments to see whether the application sanitizes/parameterizes input or exposes the query; this is intentional negative testing.",
      ja: "SQLインジェクションを検出するため、テスターは意図的に特殊文字や悪意あるSQL断片を入力し、アプリが入力をサニタイズ/パラメータ化するかクエリを露出するかを確認します。これは意図的なネガティブテストです。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Một tổ chức muốn cải tiến quy trình kiểm thử theo mô hình TMMi. Đặc điểm nào phân biệt mô hình cải tiến 「dựa trên mô hình」 (model-based) như TMMi với 「dựa trên phân tích」 (analytical) như phân tích nguyên nhân gốc?",
      en: "An organization wants to improve its test process using TMMi. What distinguishes a 'model-based' improvement model like TMMi from an 'analytical' one such as root cause analysis?",
      ja: "ある組織がTMMiを用いてテストプロセスを改善したいと考えています。TMMiのような「モデルベース」改善モデルと、根本原因分析のような「分析ベース」改善を区別するものは何ですか。"
    },
    options: [
      { vi: "Model-based so sánh quy trình hiện tại với một khung tham chiếu chuẩn hóa nhiều cấp độ trưởng thành", en: "Model-based compares the current process against a standardized reference framework of maturity levels", ja: "モデルベースは現行プロセスを成熟度レベルの標準化された参照フレームワークと比較する" },
      { vi: "Model-based chỉ dùng dữ liệu khiếm khuyết cụ thể của một dự án", en: "Model-based uses only specific defect data from one project", ja: "モデルベースは1プロジェクトの特定欠陥データのみを使う" },
      { vi: "Analytical luôn cần chứng nhận bên thứ ba", en: "Analytical always needs third-party certification", ja: "分析ベースは常に第三者認証を必要とする" },
      { vi: "Hai cách tiếp cận hoàn toàn giống nhau", en: "The two approaches are identical", ja: "2つのアプローチは完全に同一である" }
    ],
    answer: 0,
    exp: {
      vi: "Cải tiến dựa trên mô hình như TMMi đối chiếu quy trình với một khung chuẩn gồm nhiều mức trưởng thành để xác định khoảng cách; còn cách phân tích như phân tích nguyên nhân gốc xuất phát từ dữ liệu và vấn đề thực tế của tổ chức.",
      en: "Model-based improvement such as TMMi benchmarks the process against a standardized maturity framework to find gaps; analytical approaches like root cause analysis start from the organization's actual data and problems.",
      ja: "TMMiのようなモデルベース改善は、プロセスを標準化された成熟度フレームワークと照合してギャップを見つけます。根本原因分析のような分析ベース手法は、組織の実際のデータと問題から出発します。"
    }
  },

  {
    lvl: "istqb-advanced",
    q: {
      vi: "Test Analyst dùng kỹ thuật đoán lỗi (error guessing). Nền tảng nào giúp kỹ thuật này hiệu quả hơn là đoán ngẫu nhiên?",
      en: "A Test Analyst uses error guessing. What makes this technique more effective than random guessing?",
      ja: "テストアナリストがエラー推測（エラーゲッシング）を用います。この技法がランダムな推測より効果的になる基盤は何ですか。"
    },
    options: [
      { vi: "May mắn cá nhân của người kiểm thử", en: "The tester's personal luck", ja: "テスターの個人的な運" },
      { vi: "Kinh nghiệm, danh sách kiểm tra lỗi (defect/fault taxonomy) và hiểu biết về lỗi thường gặp trong quá khứ", en: "Experience, a defect/fault taxonomy checklist and knowledge of common past failures", ja: "経験、欠陥/障害タクソノミーのチェックリスト、過去のよくある故障の知識" },
      { vi: "Bỏ qua hoàn toàn đặc tả yêu cầu", en: "Completely ignoring the specification", ja: "仕様を完全に無視すること" },
      { vi: "Chỉ chạy lại các ca kiểm thử tự động cũ", en: "Only rerunning old automated tests", ja: "古い自動テストを再実行するだけ" }
    ],
    answer: 1,
    exp: {
      vi: "Đoán lỗi hiệu quả khi dựa trên kinh nghiệm, danh sách phân loại lỗi và lịch sử khiếm khuyết đã gặp, giúp tester nhắm vào những khu vực dễ sai; đó là kỹ thuật dựa trên kinh nghiệm chứ không phải may rủi.",
      en: "Error guessing is effective when grounded in experience, a fault taxonomy and a history of past defects, letting the tester target error-prone areas; it is an experience-based technique, not luck.",
      ja: "エラー推測は、経験、障害タクソノミー、過去の欠陥履歴に基づくと効果的で、テスターが誤りやすい領域を狙えます。これは運ではなく経験ベースの技法です。"
    }
  },
  // ================= EXPERT (10) =================
  {
    lvl: "istqb-expert",
    q: {
      vi: "Là Test Improvement Lead, bạn triển khai IDEAL để cải tiến quy trình. Trong pha 「Establishing」 (Thiết lập), hoạt động trọng tâm là gì?",
      en: "As a Test Improvement Lead you apply the IDEAL model. In the 'Establishing' phase, what is the central activity?",
      ja: "テスト改善リードとしてIDEALモデルを適用します。「Establishing（確立）」フェーズの中心的な活動は何ですか。"
    },
    options: [
      { vi: "Ưu tiên hóa vấn đề, đặt mục tiêu đo được và lập kế hoạch hành động cải tiến", en: "Prioritizing issues, setting measurable goals and planning improvement actions", ja: "課題の優先順位付け、測定可能な目標設定、改善アクションの計画" },
      { vi: "Thực thi các thay đổi và thu thập bài học", en: "Executing changes and collecting lessons learned", ja: "変更を実行し教訓を収集する" },
      { vi: "Xây dựng cam kết ban đầu và nhận diện nhu cầu cải tiến", en: "Building initial commitment and identifying the need to improve", ja: "初期のコミットメント構築と改善ニーズの特定" },
      { vi: "Phân tích hiện trạng và xác định khoảng cách", en: "Diagnosing the current state and identifying gaps", ja: "現状を診断しギャップを特定する" }
    ],
    answer: 0,
    exp: {
      vi: "IDEAL gồm Initiating, Diagnosing, Establishing, Acting, Learning. Pha Establishing tập trung ưu tiên hóa các phát hiện, thiết lập mục tiêu đo lường được và xây dựng kế hoạch hành động cụ thể trước khi chuyển sang Acting.",
      en: "IDEAL comprises Initiating, Diagnosing, Establishing, Acting, Learning. The Establishing phase focuses on prioritizing findings, setting measurable goals and building a concrete action plan before moving to Acting.",
      ja: "IDEALはInitiating、Diagnosing、Establishing、Acting、Learningから成ります。Establishingフェーズは、Actingに移る前に発見事項の優先順位付け、測定可能な目標設定、具体的なアクション計画の構築に焦点を当てます。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Bạn quản lý kiểm thử cho hệ thống liên ngân hàng gồm nhiều nhà cung cấp. Rủi ro lớn nhất về chiến lược kiểm thử tích hợp trên quy mô lớn (large-scale integration) thường là?",
      en: "You manage testing for an inter-bank system spanning multiple vendors. The biggest large-scale integration test strategy risk is usually?",
      ja: "複数ベンダーにまたがる銀行間システムのテストを管理しています。大規模統合テスト戦略における最大のリスクは通常何ですか。"
    },
    options: [
      { vi: "Thiếu công cụ ghi lại kết quả test", en: "Lack of a tool to log test results", ja: "テスト結果を記録するツールの欠如" },
      { vi: "Sự mơ hồ về ranh giới trách nhiệm, hợp đồng giao diện (interface contracts) và dữ liệu kiểm thử dùng chung giữa các bên", en: "Ambiguity over responsibility boundaries, interface contracts and shared test data between parties", ja: "各者間の責任境界、インターフェース契約、共有テストデータに関する曖昧さ" },
      { vi: "Không đủ số lượng ca kiểm thử đơn vị", en: "Not enough unit test cases", ja: "ユニットテストケースの数が不足していること" },
      { vi: "Màu sắc giao diện không đồng nhất", en: "Inconsistent UI colors", ja: "UIの色の不整合" }
    ],
    answer: 1,
    exp: {
      vi: "Tích hợp quy mô lớn với nhiều nhà cung cấp thất bại chủ yếu do ranh giới trách nhiệm không rõ, hợp đồng giao diện không thống nhất và tranh chấp về dữ liệu/môi trường kiểm thử chung; đây là rủi ro chiến lược quan trọng cần quản trị tổ chức.",
      en: "Large-scale multi-vendor integration mainly fails due to unclear responsibility boundaries, inconsistent interface contracts and disputes over shared test data/environments; this is the key strategic risk requiring organizational governance.",
      ja: "大規模なマルチベンダー統合は主に、不明確な責任境界、不整合なインターフェース契約、共有テストデータ/環境をめぐる争いによって失敗します。これは組織的ガバナンスを要する重要な戦略的リスクです。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Khi xây dựng chiến lược tự động hóa kiểm thử ở cấp doanh nghiệp, mô hình 「kim tự tháp kiểm thử」 (test pyramid) khuyến nghị điều gì để tối ưu chi phí bảo trì?",
      en: "When building an enterprise test automation strategy, what does the 'test pyramid' recommend to optimize maintenance cost?",
      ja: "エンタープライズ規模のテスト自動化戦略を構築する際、保守コストを最適化するために「テストピラミッド」は何を推奨しますか。"
    },
    options: [
      { vi: "Nhiều test giao diện người dùng (UI/end-to-end) nhất, ít test đơn vị nhất", en: "The most UI/end-to-end tests and the fewest unit tests", ja: "UI/エンドツーエンドテストを最も多く、ユニットテストを最も少なく" },
      { vi: "Chỉ dùng test thủ công cho mọi cấp", en: "Use only manual tests at every level", ja: "すべてのレベルで手動テストのみを使う" },
      { vi: "Nền là nhiều test đơn vị nhanh và rẻ, ở giữa là test tích hợp/API, đỉnh là ít test UI end-to-end", en: "A base of many fast cheap unit tests, integration/API tests in the middle, and few end-to-end UI tests at the top", ja: "土台に多数の高速で安価なユニットテスト、中間に統合/APIテスト、頂点に少数のエンドツーエンドUIテスト" },
      { vi: "Phân bổ số lượng test bằng nhau ở mọi tầng", en: "Allocate equal numbers of tests at every layer", ja: "すべての層に等しい数のテストを割り当てる" }
    ],
    answer: 2,
    exp: {
      vi: "Kim tự tháp kiểm thử đề xuất nền rộng gồm nhiều test đơn vị nhanh, ổn định và rẻ bảo trì; tầng giữa là test tích hợp/API; đỉnh nhỏ là test UI end-to-end vốn chậm, dễ vỡ và tốn bảo trì, giúp tối ưu chi phí tổng thể.",
      en: "The test pyramid advocates a broad base of many fast, stable, cheap-to-maintain unit tests, a middle layer of integration/API tests, and a small top of slow, brittle, costly end-to-end UI tests, optimizing overall cost.",
      ja: "テストピラミッドは、高速で安定し保守が安価な多数のユニットテストの広い土台、統合/APIテストの中間層、そして遅く壊れやすく保守コストの高いエンドツーエンドUIテストの小さな頂点を推奨し、全体コストを最適化します。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Bạn cần thuyết phục ban lãnh đạo đầu tư vào kiểm thử. Chỉ số nào thể hiện rõ nhất giá trị kinh tế của việc phát hiện lỗi sớm theo nguyên tắc 「chi phí sửa lỗi tăng theo giai đoạn」?",
      en: "You must convince executives to invest in testing. Which metric best shows the economic value of early defect detection under the 'cost of fixing rises by phase' principle?",
      ja: "経営陣にテスト投資を説得する必要があります。「修正コストはフェーズごとに増大する」原則の下で、早期欠陥検出の経済的価値を最もよく示す指標はどれですか。"
    },
    options: [
      { vi: "Tổng số ca kiểm thử đã viết", en: "Total number of test cases written", ja: "作成したテストケースの総数" },
      { vi: "Chi phí khắc phục khiếm khuyết trung bình theo giai đoạn phát hiện (defect removal cost by phase)", en: "Average defect removal cost by detection phase", ja: "検出フェーズ別の平均欠陥除去コスト" },
      { vi: "Số dòng mã nguồn của sản phẩm", en: "Number of source lines of code", ja: "製品のソースコード行数" },
      { vi: "Số lượng người trong nhóm kiểm thử", en: "Number of people in the test team", ja: "テストチームの人数" }
    ],
    answer: 1,
    exp: {
      vi: "Chi phí loại bỏ khiếm khuyết theo giai đoạn phát hiện cho thấy lỗi tìm ở giai đoạn muộn (vận hành) tốn kém gấp nhiều lần so với tìm sớm (yêu cầu/thiết kế), đây là bằng chứng kinh tế thuyết phục cho đầu tư kiểm thử sớm.",
      en: "Defect removal cost by detection phase shows that defects found late (in operation) cost many times more than those found early (requirements/design), providing compelling economic evidence for investing in early testing.",
      ja: "検出フェーズ別の欠陥除去コストは、後期（運用）で見つかる欠陥が早期（要件/設計）で見つかる欠陥の何倍もコストがかかることを示し、早期テスト投資の説得力ある経済的証拠となります。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Trong vai trò lãnh đạo kiểm thử, bạn nhận thấy nhóm liên tục bỏ sót lỗi cùng loại. Áp dụng 「phân tích nguyên nhân gốc」 (root cause analysis) ở cấp tổ chức nên hướng tới kết quả nào?",
      en: "As a test leader you notice the team keeps missing the same class of defects. Applying organizational root cause analysis should aim at which outcome?",
      ja: "テストリーダーとして、チームが同種の欠陥を繰り返し見逃していることに気づきました。組織レベルの根本原因分析を適用する際、目指すべき成果はどれですか。"
    },
    options: [
      { vi: "Khiển trách cá nhân đã để lọt lỗi", en: "Blaming the individual who let the defect slip", ja: "欠陥を見逃した個人を叱責する" },
      { vi: "Tăng số lượng ca kiểm thử một cách ngẫu nhiên", en: "Randomly increasing the number of test cases", ja: "テストケース数をランダムに増やす" },
      { vi: "Chỉ ghi nhận lỗi rồi tiếp tục như cũ", en: "Just logging the defects and continuing as before", ja: "欠陥を記録するだけで従来通り続ける" },
      { vi: "Thay đổi quy trình, đào tạo hoặc kỹ thuật để ngăn cả lớp lỗi tái diễn trong tương lai", en: "Changing process, training or techniques to prevent the whole class of defects recurring", ja: "プロセス、教育、技法を変更してそのクラスの欠陥の再発を防ぐ" }
    ],
    answer: 3,
    exp: {
      vi: "Phân tích nguyên nhân gốc cấp tổ chức nhằm loại bỏ nguyên nhân hệ thống của cả một lớp khiếm khuyết thông qua cải tiến quy trình, đào tạo hoặc kỹ thuật kiểm thử, thay vì đổ lỗi cá nhân hay xử lý triệu chứng.",
      en: "Organizational root cause analysis aims to eliminate the systemic cause of an entire class of defects through process, training or technique improvements, rather than blaming individuals or treating symptoms.",
      ja: "組織レベルの根本原因分析は、個人を責めたり症状を扱ったりするのではなく、プロセス、教育、技法の改善を通じて欠陥のクラス全体の体系的原因を除去することを目指します。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Xây dựng test policy và test strategy cấp tổ chức. Phát biểu nào phân biệt ĐÚNG hai tài liệu này?",
      en: "You are drafting an organization-level test policy and test strategy. Which statement CORRECTLY distinguishes the two documents?",
      ja: "組織レベルのテストポリシーとテスト戦略を作成しています。この2つの文書を正しく区別する記述はどれですか。"
    },
    options: [
      { vi: "Test policy mô tả chi tiết ca kiểm thử, test strategy nêu triết lý chung", en: "The test policy details test cases while the strategy states general philosophy", ja: "テストポリシーがテストケースを詳述し、戦略が一般的な理念を述べる" },
      { vi: "Test policy nêu mục tiêu và nguyên tắc kiểm thử ở mức cao của tổ chức; test strategy mô tả cách tiếp cận chung áp dụng cho các loại/mức kiểm thử", en: "The test policy states high-level organizational objectives and principles; the strategy describes the generic approach applied across test types/levels", ja: "テストポリシーは組織の高レベルな目的と原則を述べ、戦略はテストタイプ/レベル全体に適用される汎用的アプローチを記述する" },
      { vi: "Hai tài liệu này giống hệt nhau, chỉ khác tên gọi", en: "The two documents are identical, differing only in name", ja: "2つの文書は名称が異なるだけで同一である" },
      { vi: "Test strategy chỉ dành cho một dự án đơn lẻ và không tái sử dụng", en: "The test strategy is for a single project only and is not reusable", ja: "テスト戦略は単一プロジェクト専用で再利用できない" }
    ],
    answer: 1,
    exp: {
      vi: "Test policy là tuyên bố cấp cao về mục tiêu, giá trị và nguyên tắc kiểm thử của tổ chức; test strategy là cách tiếp cận tổng quát, tương đối ổn định, mô tả cách thực hiện kiểm thử qua các mức và loại, làm cầu nối tới kế hoạch kiểm thử từng dự án.",
      en: "The test policy is a high-level statement of the organization's testing objectives, values and principles; the test strategy is a generic, relatively stable approach describing how testing is carried out across levels and types, bridging to project test plans.",
      ja: "テストポリシーは組織のテスト目的、価値、原則の高レベルな声明であり、テスト戦略はレベルとタイプ全体でテストをどう実施するかを記述する汎用的で比較的安定したアプローチで、プロジェクトのテスト計画への橋渡しとなります。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Bạn lãnh đạo chuyển đổi sang kiểm thử liên tục trong DevOps. Yếu tố nào là điều kiện tiên quyết quan trọng NHẤT để 「dịch chuyển sang trái」 (shift-left) thành công?",
      en: "You lead a shift to continuous testing in DevOps. Which factor is the MOST important prerequisite for a successful 'shift-left'?",
      ja: "DevOpsにおける継続的テストへの移行を主導しています。「シフトレフト」を成功させる最も重要な前提条件はどれですか。"
    },
    options: [
      { vi: "Chỉ mua thêm nhiều máy chủ kiểm thử", en: "Simply buying more test servers", ja: "テストサーバーを追加購入するだけ" },
      { vi: "Trì hoãn mọi kiểm thử đến sau khi triển khai production", en: "Delaying all testing until after production deployment", ja: "すべてのテストを本番デプロイ後まで遅らせる" },
      { vi: "Kiểm thử tham gia sớm từ giai đoạn yêu cầu/thiết kế cùng tiêu chí kiểm thử được tự động hóa và tích hợp vào pipeline CI/CD", en: "Involving testing early from requirements/design with automated, pipeline-integrated test criteria in CI/CD", ja: "要件/設計段階からテストが早期参画し、自動化されCI/CDパイプラインに統合されたテスト基準を持つこと" },
      { vi: "Loại bỏ hoàn toàn vai trò của người kiểm thử", en: "Eliminating the tester role entirely", ja: "テスターの役割を完全に排除する" }
    ],
    answer: 2,
    exp: {
      vi: "Dịch chuyển sang trái thành công đòi hỏi kiểm thử tham gia từ sớm ở giai đoạn yêu cầu và thiết kế, với các tiêu chí kiểm thử được tự động hóa và tích hợp vào pipeline CI/CD để phản hồi liên tục, không phải chỉ đầu tư hạ tầng.",
      en: "A successful shift-left requires testing to engage early at requirements and design, with automated test criteria integrated into the CI/CD pipeline for continuous feedback, not merely infrastructure investment.",
      ja: "シフトレフトの成功には、要件・設計段階でテストが早期に関与し、継続的フィードバックのために自動化されたテスト基準がCI/CDパイプラインに統合されることが必要で、単なるインフラ投資ではありません。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Là chuyên gia, bạn đánh giá năng lực nhân sự kiểm thử. Mô hình phát triển kỹ năng nào nhấn mạnh cả kỹ năng cứng (kỹ thuật) lẫn kỹ năng mềm (giao tiếp, tư duy phản biện) cho tester chuyên nghiệp?",
      en: "As an expert you assess tester competencies. Which skill development view emphasizes both hard (technical) and soft (communication, critical thinking) skills for professional testers?",
      ja: "専門家として、テスターの能力を評価します。プロのテスターに対し、ハードスキル（技術）とソフトスキル（コミュニケーション、批判的思考）の両方を強調するスキル育成の考え方はどれですか。"
    },
    options: [
      { vi: "Chỉ kỹ năng lập trình mới quan trọng, kỹ năng mềm không cần thiết", en: "Only programming skills matter, soft skills are unnecessary", ja: "プログラミングスキルのみが重要でソフトスキルは不要である" },
      { vi: "Chỉ cần kỹ năng giao tiếp, không cần kiến thức kỹ thuật", en: "Only communication skills are needed, no technical knowledge", ja: "コミュニケーションスキルのみで技術知識は不要である" },
      { vi: "Năng lực tester không thể đánh giá hay phát triển", en: "Tester competency cannot be assessed or developed", ja: "テスターの能力は評価も育成もできない" },
      { vi: "Phát triển năng lực toàn diện: kỹ thuật vững kết hợp giao tiếp, tư duy phản biện và hiểu nghiệp vụ", en: "Holistic competency: strong technical skills combined with communication, critical thinking and business understanding", ja: "包括的能力：強固な技術力とコミュニケーション、批判的思考、業務理解の組み合わせ" }
    ],
    answer: 3,
    exp: {
      vi: "Tester chuyên nghiệp cần năng lực toàn diện: nền tảng kỹ thuật vững kết hợp kỹ năng mềm như giao tiếp, thương lượng, tư duy phản biện và hiểu biết nghiệp vụ để cộng tác hiệu quả và đánh giá rủi ro đúng.",
      en: "A professional tester needs holistic competency: a strong technical foundation combined with soft skills such as communication, negotiation, critical thinking and business understanding to collaborate effectively and judge risk well.",
      ja: "プロのテスターには包括的能力が必要です。強固な技術基盤と、コミュニケーション、交渉、批判的思考、業務理解といったソフトスキルを組み合わせ、効果的に協働しリスクを正しく判断します。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Bạn định nghĩa tiêu chí thành công cho một chương trình cải tiến kiểm thử kéo dài 12 tháng. Cách thiết lập mục tiêu nào giúp đo lường được tiến bộ một cách khách quan?",
      en: "You define success criteria for a 12-month test improvement program. Which way of setting goals allows objective progress measurement?",
      ja: "12か月のテスト改善プログラムの成功基準を定義します。進捗を客観的に測定できる目標設定の方法はどれですか。"
    },
    options: [
      { vi: "Mục tiêu mơ hồ kiểu 「cải thiện chất lượng nói chung」", en: "Vague goals like 'improve quality in general'", ja: "「全体的に品質を改善する」のような曖昧な目標" },
      { vi: "Không đặt mục tiêu để tránh áp lực cho nhóm", en: "Setting no goals to avoid pressuring the team", ja: "チームへの圧力を避けるため目標を設定しない" },
      { vi: "Chỉ dựa vào cảm nhận chủ quan của quản lý mỗi tháng", en: "Relying only on management's monthly subjective feeling", ja: "毎月の管理者の主観的な感覚のみに依存する" },
      { vi: "Mục tiêu SMART, gắn với chỉ số cơ sở (baseline) và mục tiêu định lượng có thời hạn", en: "SMART goals tied to a baseline and time-bound quantitative targets", ja: "ベースラインに紐づき期限付きの定量目標を持つSMARTな目標" }
    ],
    answer: 3,
    exp: {
      vi: "Để đo tiến bộ khách quan, mục tiêu cải tiến nên theo tiêu chí SMART: cụ thể, đo được, khả thi, thực tế và có thời hạn, đồng thời so với một baseline định lượng ban đầu để đánh giá mức thay đổi thực sự.",
      en: "For objective progress measurement, improvement goals should be SMART, specific, measurable, achievable, realistic and time-bound, and compared against an initial quantitative baseline to gauge real change.",
      ja: "客観的な進捗測定のため、改善目標はSMART（具体的、測定可能、達成可能、現実的、期限付き）であるべきで、実際の変化を測るために初期の定量的ベースラインと比較すべきです。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Với vai trò chuyên gia, khi lựa chọn và triển khai công cụ kiểm thử cấp doanh nghiệp, sai lầm chiến lược phổ biến nhất dẫn tới thất bại là gì?",
      en: "As an expert, when selecting and rolling out an enterprise test tool, what is the most common strategic mistake leading to failure?",
      ja: "専門家として、エンタープライズ向けテストツールを選定・展開する際、失敗につながる最も一般的な戦略的過ちは何ですか。"
    },
    options: [
      { vi: "Chạy dự án thử nghiệm (pilot) trước khi triển khai rộng", en: "Running a pilot project before wide rollout", ja: "広範な展開前にパイロットプロジェクトを実施すること" },
      { vi: "Kỳ vọng công cụ tự tạo lợi ích ngay mà bỏ qua đào tạo, thay đổi quy trình và chi phí sở hữu dài hạn", en: "Expecting the tool to deliver benefits instantly while ignoring training, process change and long-term ownership cost", ja: "教育、プロセス変更、長期的な所有コストを無視し、ツールが即座に利益をもたらすと期待すること" },
      { vi: "Đánh giá công cụ theo nhu cầu và ràng buộc kỹ thuật cụ thể", en: "Evaluating tools against concrete needs and technical constraints", ja: "具体的なニーズと技術的制約に照らしてツールを評価すること" },
      { vi: "Xác định người vô địch công cụ (tool champion) nội bộ", en: "Identifying an internal tool champion", ja: "社内のツールチャンピオンを特定すること" }
    ],
    answer: 1,
    exp: {
      vi: "Thất bại triển khai công cụ thường bắt nguồn từ kỳ vọng phi thực tế rằng công cụ tự mang lại giá trị, trong khi bỏ qua đào tạo, điều chỉnh quy trình, hỗ trợ và tổng chi phí sở hữu; các yếu tố thành công là pilot, tool champion và đánh giá theo nhu cầu thực.",
      en: "Tool rollout failures usually stem from the unrealistic expectation that a tool delivers value by itself, while neglecting training, process adaptation, support and total cost of ownership; the success factors are piloting, a tool champion and needs-based evaluation.",
      ja: "ツール展開の失敗は通常、ツール自体が価値をもたらすという非現実的な期待から生じ、教育、プロセス適応、サポート、総所有コストを軽視します。成功要因はパイロット、ツールチャンピオン、ニーズベースの評価です。"
    }
  }
];
