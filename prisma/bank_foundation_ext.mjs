// ISTQB Foundation Level (CTFL v4.0) - Bo MO RONG 50 cau (ap dung/tinh huong)
// Khac va khong trung voi 100 cau da co.
export const DATA = [
  {
    "q": {
      "vi": "Mot ham nhan tuoi khach hang: tu 18 den 65 duoc phep. Ap dung phan hoach tuong duong (Equivalence Partitioning), toi thieu can bao nhieu lop tuong duong hop le va khong hop le de phu het?",
      "en": "A function accepts customer age: 18 to 65 is allowed. Using Equivalence Partitioning, what is the minimum set of valid and invalid partitions needed for full coverage?",
      "ja": "ある関数が顧客の年齢を受け付ける。18から65までが許可される。同値分割（イコイバレンス・パーティショニング）を用いる場合、網羅に必要な有効・無効パーティションの最小構成はどれか。"
    },
    "options": [
      {
        "vi": "1 lop hop le, 2 lop khong hop le (duoi 18 va tren 65)",
        "en": "1 valid partition, 2 invalid partitions (below 18 and above 65)",
        "ja": "有効1、無効2（18未満と65超）"
      },
      {
        "vi": "1 lop hop le, 1 lop khong hop le",
        "en": "1 valid partition, 1 invalid partition",
        "ja": "有効1、無効1"
      },
      {
        "vi": "2 lop hop le, 2 lop khong hop le",
        "en": "2 valid partitions, 2 invalid partitions",
        "ja": "有効2、無効2"
      },
      {
        "vi": "3 lop hop le, 3 lop khong hop le",
        "en": "3 valid partitions, 3 invalid partitions",
        "ja": "有効3、無効3"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khoang [18..65] la mot lop hop le. Co hai lop khong hop le tach biet: nho hon 18 va lon hon 65. Vay toi thieu 1 hop le va 2 khong hop le.",
      "en": "The range [18..65] is one valid partition. There are two distinct invalid partitions: below 18 and above 65. Hence 1 valid and 2 invalid.",
      "ja": "[18..65]の範囲は有効パーティション1つ。無効は18未満と65超の2つに分かれる。よって有効1、無効2が最小。"
    }
  },
  {
    "q": {
      "vi": "Voi bien co gia tri hop le tu 1 den 100, phan tich gia tri bien (2-value Boundary Value Analysis) yeu cau kiem thu nhung gia tri nao tai bien duoi va bien tren?",
      "en": "For a variable with valid values 1 to 100, which values does 2-value Boundary Value Analysis test at the lower and upper boundaries?",
      "ja": "有効値が1から100までの変数について、2値の境界値分析（バウンダリ・バリュー・アナリシス）は下限と上限でどの値を検証するか。"
    },
    "options": [
      {
        "vi": "1 va 100",
        "en": "1 and 100",
        "ja": "1と100"
      },
      {
        "vi": "0, 1 va 100, 101",
        "en": "0, 1 and 100, 101",
        "ja": "0,1と100,101"
      },
      {
        "vi": "0 va 101",
        "en": "0 and 101",
        "ja": "0と101"
      },
      {
        "vi": "1, 2 va 99, 100",
        "en": "1, 2 and 99, 100",
        "ja": "1,2と99,100"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Phan tich gia tri bien 2-value kiem thu gia tri bien va gia tri ke ben o phia doi dien. Voi bien 1: kiem 0 va 1; voi bien 100: kiem 100 va 101.",
      "en": "2-value BVA tests the boundary value and its nearest neighbour across the boundary. For boundary 1: test 0 and 1; for boundary 100: test 100 and 101.",
      "ja": "2値の境界値分析は境界値とその隣接値を検証する。境界1では0と1、境界100では100と101を検証する。"
    }
  },
  {
    "q": {
      "vi": "Mot module co 10 cau lenh (statement) va bo test hien tai thuc thi 7 cau lenh. Do phu cau lenh (statement coverage) dat bao nhieu?",
      "en": "A module has 10 statements and the current test set executes 7 of them. What is the statement coverage achieved?",
      "ja": "あるモジュールは10個のステートメントを持ち、現在のテストセットは7個を実行する。達成されたステートメントカバレッジはいくらか。"
    },
    "options": [
      {
        "vi": "50%",
        "en": "50%",
        "ja": "50%"
      },
      {
        "vi": "30%",
        "en": "30%",
        "ja": "30%"
      },
      {
        "vi": "70%",
        "en": "70%",
        "ja": "70%"
      },
      {
        "vi": "100%",
        "en": "100%",
        "ja": "100%"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Do phu cau lenh = (so cau lenh da thuc thi / tong so cau lenh) x 100 = 7/10 x 100 = 70%.",
      "en": "Statement coverage = (executed statements / total statements) x 100 = 7/10 x 100 = 70%.",
      "ja": "ステートメントカバレッジ =（実行済みステートメント/総ステートメント）×100 = 7/10×100 = 70%。"
    }
  },
  {
    "q": {
      "vi": "Doan ma co mot cau IF khong co ELSE. De dat do phu nhanh (branch coverage) 100%, can toi thieu bao nhieu truong hop kiem thu?",
      "en": "A code segment has one IF statement without an ELSE. To achieve 100% branch coverage, what is the minimum number of test cases needed?",
      "ja": "あるコードにELSEのないIF文が1つある。ブランチカバレッジ100%を達成するのに必要な最小テストケース数はいくつか。"
    },
    "options": [
      {
        "vi": "1",
        "en": "1",
        "ja": "1"
      },
      {
        "vi": "4",
        "en": "4",
        "ja": "4"
      },
      {
        "vi": "3",
        "en": "3",
        "ja": "3"
      },
      {
        "vi": "2",
        "en": "2",
        "ja": "2"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "IF khong ELSE van co hai nhanh: dieu kien dung (di vao than IF) va dieu kien sai (bo qua). Can 2 test de phu ca hai nhanh.",
      "en": "An IF without ELSE still has two branches: condition true (enter the IF body) and condition false (skip it). Two tests are needed to cover both.",
      "ja": "ELSEのないIFでも分岐は2つある。条件が真（IF本体へ）と偽（スキップ）。両分岐を網羅するに2ケース必要。"
    }
  },
  {
    "q": {
      "vi": "Doi phat trien phat hien nhieu loi tap trung o module thanh toan. Ho tang cuong kiem thu module do. Nguyen tac nao dang duoc ap dung?",
      "en": "A team finds many defects clustered in the payment module and intensifies testing there. Which principle is being applied?",
      "ja": "チームが支払いモジュールに欠陥が集中していることを発見し、そこのテストを強化した。どの原則が適用されているか。"
    },
    "options": [
      {
        "vi": "Gom cum khuyet tat (defect clustering)",
        "en": "Defect clustering",
        "ja": "欠陥の偏在（デフェクト・クラスタリング）"
      },
      {
        "vi": "Kiem thu vet can (exhaustive testing) la kha thi",
        "en": "Exhaustive testing is possible",
        "ja": "全数テストは可能"
      },
      {
        "vi": "Nghich ly thuoc tru sau (pesticide paradox)",
        "en": "Pesticide paradox",
        "ja": "殺虫剤のパラドックス"
      },
      {
        "vi": "Vang mat loi la nguy bien (absence-of-errors fallacy)",
        "en": "Absence-of-errors fallacy",
        "ja": "欠陥ゼロの落とし穴"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mot so it module thuong chua phan lon khuyet tat - do la gom cum khuyet tat. Tap trung kiem thu vao vung nhieu loi la he qua truc tiep cua nguyen tac nay.",
      "en": "A small number of modules usually contains most defects - this is defect clustering. Focusing testing on high-defect areas follows directly from this principle.",
      "ja": "少数のモジュールに大半の欠陥が集中する。これは欠陥の偏在であり、欠陥が多い領域へテストを集中させるのはこの原則に基づく。"
    }
  },
  {
    "q": {
      "vi": "Trong mot bang quyet dinh (decision table), neu co 3 dieu kien nhi phan (moi dieu kien Dung/Sai) doc lap, so cot ket hop toi da la bao nhieu?",
      "en": "In a decision table, if there are 3 independent binary conditions (each True/False), what is the maximum number of combination columns?",
      "ja": "デシジョンテーブル（決定表）で、独立した二値条件（各々真/偽）が3つある場合、組み合わせ列の最大数はいくつか。"
    },
    "options": [
      {
        "vi": "6",
        "en": "6",
        "ja": "6"
      },
      {
        "vi": "8",
        "en": "8",
        "ja": "8"
      },
      {
        "vi": "9",
        "en": "9",
        "ja": "9"
      },
      {
        "vi": "3",
        "en": "3",
        "ja": "3"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Voi n dieu kien nhi phan doc lap, so ket hop = 2 mu n. Voi 3 dieu kien: 2^3 = 8 cot.",
      "en": "With n independent binary conditions, the number of combinations is 2 to the power n. For 3 conditions: 2^3 = 8 columns.",
      "ja": "独立した二値条件がn個ある場合、組み合わせは2のn乗。3条件なら2^3=8列。"
    }
  },
  {
    "q": {
      "vi": "Ky thuat nao PHU HOP NHAT khi phan mem co logic nghiep vu voi nhieu ket hop dieu kien dan den cac hanh dong khac nhau?",
      "en": "Which technique is MOST suitable when software has business logic with many combinations of conditions leading to different actions?",
      "ja": "多くの条件の組み合わせが異なるアクションを導くビジネスロジックを持つソフトウェアに最も適した技法はどれか。"
    },
    "options": [
      {
        "vi": "Phan tich gia tri bien (Boundary Value Analysis)",
        "en": "Boundary Value Analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Kiem thu chuyen trang thai (State Transition Testing)",
        "en": "State Transition Testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Kiem thu bang quyet dinh (Decision Table Testing)",
        "en": "Decision Table Testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Doan loi (Error Guessing)",
        "en": "Error Guessing",
        "ja": "エラー推測"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiem thu bang quyet dinh chuyen cac ket hop dieu kien va hanh dong tuong ung thanh bang, rat phu hop cho logic nghiep vu nhieu quy tac.",
      "en": "Decision Table Testing maps combinations of conditions to corresponding actions in a table, ideal for business logic with many rules.",
      "ja": "デシジョンテーブルテストは条件の組み合わせと対応するアクションを表にする。多数のルールを持つビジネスロジックに最適。"
    }
  },
  {
    "q": {
      "vi": "He thong dang nhap co cac trang thai: DangXuat, DangNhap, Khoa. Ky thuat nao phu hop nhat de kiem thu cac chuyen doi giua chung theo su kien?",
      "en": "A login system has states: LoggedOut, LoggedIn, Locked. Which technique best tests transitions between them triggered by events?",
      "ja": "ログインシステムに「ログアウト」「ログイン」「ロック」の状態がある。イベントによる状態間の遷移を検証するのに最適な技法はどれか。"
    },
    "options": [
      {
        "vi": "Phan hoach tuong duong (Equivalence Partitioning)",
        "en": "Equivalence Partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Kiem thu bang quyet dinh (Decision Table Testing)",
        "en": "Decision Table Testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Kiem thu doi tac (pairwise) toan phan",
        "en": "Full pairwise testing",
        "ja": "全ペアワイズテスト"
      },
      {
        "vi": "Kiem thu chuyen trang thai (State Transition Testing)",
        "en": "State Transition Testing",
        "ja": "状態遷移テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi hanh vi phu thuoc vao trang thai hien tai va su kien dau vao, kiem thu chuyen trang thai la lua chon phu hop nhat.",
      "en": "When behaviour depends on the current state and the input event, State Transition Testing is the most suitable choice.",
      "ja": "振る舞いが現在の状態と入力イベントに依存する場合、状態遷移テストが最も適する。"
    }
  },
  {
    "q": {
      "vi": "Trong so cac hoat dong sau, hoat dong nao la kiem thu tinh (static testing)?",
      "en": "Among the following activities, which one is static testing?",
      "ja": "次の活動のうち、静的テスト（スタティックテスト）はどれか。"
    },
    "options": [
      {
        "vi": "Ra soat (review) tai lieu yeu cau",
        "en": "Reviewing the requirements document",
        "ja": "要求仕様書のレビュー"
      },
      {
        "vi": "Chay bo test hoi quy tu dong",
        "en": "Running an automated regression suite",
        "ja": "自動リグレッションスイートの実行"
      },
      {
        "vi": "Thuc hien kiem thu tai (load testing)",
        "en": "Performing load testing",
        "ja": "負荷テストの実施"
      },
      {
        "vi": "Kiem thu kham pha (exploratory testing) tren ung dung",
        "en": "Exploratory testing on the application",
        "ja": "アプリでの探索的テスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu tinh danh gia san pham lam viec ma khong thuc thi ma - vi du review tai lieu. Cac lua chon con lai deu can chay chuong trinh nen la kiem thu dong.",
      "en": "Static testing evaluates work products without executing code - e.g. reviewing documents. The other options require running the program, so they are dynamic testing.",
      "ja": "静的テストはコードを実行せずに作業成果物を評価する（例：文書レビュー）。他はプログラム実行を伴うため動的テスト。"
    }
  },
  {
    "q": {
      "vi": "Lap trinh vien viet sai cong thuc tinh lai, dan den ket qua sai hien tren man hinh. Theo thu tu, dau la loi (error), khuyet tat (defect) va that bai (failure)?",
      "en": "A developer writes an incorrect interest formula, causing a wrong result on screen. In order, which is the error, the defect and the failure?",
      "ja": "開発者が誤った利息計算式を書き、画面に誤った結果が表示された。順に、エラー・欠陥・故障はどれか。"
    },
    "options": [
      {
        "vi": "Ket qua sai la loi; cong thuc sai la khuyet tat; hanh dong viet sai la that bai",
        "en": "Wrong result is error; wrong formula is defect; writing mistake is failure",
        "ja": "誤結果=エラー、誤式=欠陥、記述ミス=故障"
      },
      {
        "vi": "Hanh dong viet sai la loi; cong thuc sai trong ma la khuyet tat; ket qua sai hien ra la that bai",
        "en": "The writing mistake is the error; the wrong formula in code is the defect; the wrong displayed result is the failure",
        "ja": "記述ミス=エラー、コード内の誤式=欠陥、表示された誤結果=故障"
      },
      {
        "vi": "Cong thuc sai la loi; ket qua sai la khuyet tat; hanh dong viet la that bai",
        "en": "Wrong formula is error; wrong result is defect; the writing is failure",
        "ja": "誤式=エラー、誤結果=欠陥、記述=故障"
      },
      {
        "vi": "Ca ba la ten goi khac nhau cua cung mot khai niem",
        "en": "All three are different names for the same concept",
        "ja": "3つとも同じ概念の別名"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Loi (error) la hanh dong sai cua con nguoi; khuyet tat (defect) la khiem khuyet trong san pham (cong thuc sai trong ma); that bai (failure) la bieu hien khi thuc thi (ket qua sai).",
      "en": "An error is the human wrong action; a defect is the flaw in the product (wrong formula in code); a failure is the manifestation on execution (wrong result).",
      "ja": "エラーは人の誤った行為、欠陥は成果物の不具合（コード内の誤式）、故障は実行時の現れ（誤結果）。"
    }
  },
  {
    "q": {
      "vi": "Mot du an theo Agile, khi nao viec kiem thu nen bat dau theo nguyen tac 「kiem thu som」 (early testing)?",
      "en": "In an Agile project, when should testing begin according to the early testing principle?",
      "ja": "アジャイルプロジェクトで「早期テスト」の原則に従うと、テストはいつ始めるべきか。"
    },
    "options": [
      {
        "vi": "Ngay sau khi trien khai len moi truong san xuat",
        "en": "Right after deployment to production",
        "ja": "本番環境へのデプロイ直後"
      },
      {
        "vi": "Chi sau khi tat ca ma da hoan thanh",
        "en": "Only after all code is completed",
        "ja": "すべてのコード完成後のみ"
      },
      {
        "vi": "Cang som cang tot trong vong doi, ke ca ra soat yeu cau",
        "en": "As early as possible in the lifecycle, including reviewing requirements",
        "ja": "ライフサイクルのできるだけ早期、要求のレビューを含む"
      },
      {
        "vi": "Chi trong giai doan kiem thu chap nhan (acceptance)",
        "en": "Only during the acceptance testing phase",
        "ja": "受け入れテスト段階のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiem thu som khuyen cao bat dau hoat dong kiem thu (bao gom kiem thu tinh nhu ra soat yeu cau) cang som cang tot de phat hien va sua loi re hon.",
      "en": "Early testing recommends starting testing activities (including static testing such as requirement reviews) as early as possible to find and fix defects cheaper.",
      "ja": "早期テストは、テスト活動（要求レビューなどの静的テストを含む）を可能な限り早く開始し、欠陥を安く発見・修正することを勧める。"
    }
  },
  {
    "q": {
      "vi": "Kiem thu hoi quy (regression testing) chu yeu nham muc dich gi?",
      "en": "What is the main purpose of regression testing?",
      "ja": "リグレッションテストの主な目的は何か。"
    },
    "options": [
      {
        "vi": "Xac nhan khuyet tat da bao cao nay da duoc sua",
        "en": "Confirm a reported defect has been fixed",
        "ja": "報告された欠陥が修正されたことの確認"
      },
      {
        "vi": "Kiem tra tinh de su dung cua giao dien",
        "en": "Check the usability of the interface",
        "ja": "インターフェースの使いやすさの確認"
      },
      {
        "vi": "Do luong hieu nang duoi tai cao",
        "en": "Measure performance under high load",
        "ja": "高負荷下での性能測定"
      },
      {
        "vi": "Phat hien tac dong phu lam hong chuc nang tung chay dung sau thay doi",
        "en": "Detect side effects that break previously working functions after a change",
        "ja": "変更後に既存機能を壊す副作用の検出"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiem thu hoi quy chay lai cac test de phat hien tac dong phu (regression) do thay doi gay ra. Xac nhan mot loi da sua la kiem thu xac nhan (re-testing/confirmation testing).",
      "en": "Regression testing re-runs tests to detect side effects caused by changes. Confirming a specific fix is confirmation (re-)testing.",
      "ja": "リグレッションテストは変更による副作用を検出するため再実行する。特定の修正の確認は確認テスト（再テスト）である。"
    }
  },
  {
    "q": {
      "vi": "Trong mo hinh V, hoat dong thiet ke kiem thu chap nhan (acceptance test) tuong ung voi tai lieu nao o phia trai?",
      "en": "In the V-model, designing acceptance tests corresponds to which document on the left side?",
      "ja": "Vモデルで、受け入れテストの設計は左側のどの文書に対応するか。"
    },
    "options": [
      {
        "vi": "Yeu cau nghiep vu / yeu cau nguoi dung",
        "en": "Business / user requirements",
        "ja": "ビジネス／ユーザー要求"
      },
      {
        "vi": "Thiet ke ky thuat chi tiet (detailed design)",
        "en": "Detailed technical design",
        "ja": "詳細設計"
      },
      {
        "vi": "Ma nguon (source code)",
        "en": "Source code",
        "ja": "ソースコード"
      },
      {
        "vi": "Thiet ke kien truc he thong",
        "en": "System architecture design",
        "ja": "システムアーキテクチャ設計"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong mo hinh V, moi muc kiem thu doi xung voi mot muc phat trien. Kiem thu chap nhan gan voi yeu cau nghiep vu/nguoi dung.",
      "en": "In the V-model each test level mirrors a development level. Acceptance testing aligns with business/user requirements.",
      "ja": "Vモデルでは各テストレベルが開発レベルと対応する。受け入れテストはビジネス／ユーザー要求と対応する。"
    }
  },
  {
    "q": {
      "vi": "Nhom kiem thu can chon test truoc voi thoi gian han che. Cach tiep can nao uu tien test dua tren muc do rui ro cua chuc nang?",
      "en": "A test team must select tests first under time constraints. Which approach prioritises tests based on the risk level of functions?",
      "ja": "時間制約下でテストを優先選択する必要がある。機能のリスクレベルに基づいてテストを優先するアプローチはどれか。"
    },
    "options": [
      {
        "vi": "Kiem thu vet can (exhaustive testing)",
        "en": "Exhaustive testing",
        "ja": "全数テスト"
      },
      {
        "vi": "Kiem thu dua tren rui ro (risk-based testing)",
        "en": "Risk-based testing",
        "ja": "リスクベースドテスト"
      },
      {
        "vi": "Kiem thu ngau nhien thuan tuy (pure random testing)",
        "en": "Pure random testing",
        "ja": "純粋なランダムテスト"
      },
      {
        "vi": "Kiem thu theo bang chu cai ten chuc nang",
        "en": "Testing in alphabetical order of function names",
        "ja": "機能名のアルファベット順テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiem thu dua tren rui ro dung muc do rui ro (kha nang xay ra x tac dong) de uu tien va phan bo cong suc kiem thu, phu hop khi thoi gian han che.",
      "en": "Risk-based testing uses risk level (likelihood x impact) to prioritise and allocate testing effort, ideal when time is limited.",
      "ja": "リスクベースドテストはリスクレベル（発生可能性×影響）で優先順位を付け工数を配分する。時間制約時に適する。"
    }
  },
  {
    "q": {
      "vi": "Doi kiem thu viet mot test case co cac phan: dieu kien tien de, buoc thuc hien, du lieu, ket qua mong doi. Theo ISTQB day la loai cong viec kiem thu nao?",
      "en": "A test team writes a test case with preconditions, steps, data, and expected results. In ISTQB terms, this is which kind of test work product?",
      "ja": "テストチームが前提条件・手順・データ・期待結果を含むテストケースを書く。ISTQBではこれはどの作業成果物か。"
    },
    "options": [
      {
        "vi": "San pham cua phan tich kiem thu (test analysis)",
        "en": "A product of test analysis",
        "ja": "テスト分析の成果物"
      },
      {
        "vi": "San pham cua lap ke hoach kiem thu (test planning)",
        "en": "A product of test planning",
        "ja": "テスト計画の成果物"
      },
      {
        "vi": "San pham cua thiet ke va cai dat kiem thu (test design and implementation)",
        "en": "A product of test design and implementation",
        "ja": "テスト設計・実装の成果物"
      },
      {
        "vi": "San pham cua hoan tat kiem thu (test completion)",
        "en": "A product of test completion",
        "ja": "テスト完了の成果物"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phan tich kiem thu tao dieu kien kiem thu; thiet ke va cai dat kiem thu tao ra cac test case cu the co buoc, du lieu va ket qua mong doi.",
      "en": "Test analysis produces test conditions; test design and implementation produces concrete test cases with steps, data and expected results.",
      "ja": "テスト分析はテスト条件を、テスト設計・実装は手順・データ・期待結果を持つ具体的テストケースを生む。"
    }
  },
  {
    "q": {
      "vi": "Trong mot phien ra soat, ai la nguoi chiu trach nhiem ve tai lieu duoc ra soat va thuong quyet dinh phien ra soat co dat khong?",
      "en": "In a review, who is responsible for the document under review and often decides whether the review passes?",
      "ja": "レビューにおいて、レビュー対象文書に責任を持ち、レビューの合否を決めることが多いのは誰か。"
    },
    "options": [
      {
        "vi": "Nguoi ghi bien ban (scribe)",
        "en": "Scribe",
        "ja": "書記（スクライブ）"
      },
      {
        "vi": "Nguoi quan ly (manager)",
        "en": "Manager",
        "ja": "マネージャー"
      },
      {
        "vi": "Nguoi dieu phoi (facilitator/moderator)",
        "en": "Facilitator/moderator",
        "ja": "ファシリテーター／モデレーター"
      },
      {
        "vi": "Tac gia (author)",
        "en": "Author",
        "ja": "作成者（オーサー）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tac gia tao va chiu trach nhiem ve tai lieu; ho sua cac van de tim thay. Nguoi dieu phoi dieu hanh phien, nguoi ghi bien ban ghi lai phat hien.",
      "en": "The author creates and is responsible for the document and fixes found issues. The facilitator runs the review; the scribe records findings.",
      "ja": "作成者は文書を作成し責任を持ち、発見された問題を修正する。ファシリテーターは進行、書記は記録を担う。"
    }
  },
  {
    "q": {
      "vi": "Loai ra soat nao thuong TRANG TRONG NHAT, tuan theo quy trinh dinh nghia va thu thap so lieu do luong?",
      "en": "Which review type is typically the MOST formal, follows a defined process and collects metrics?",
      "ja": "最も公式で、定義されたプロセスに従い、メトリクスを収集するレビュー種別はどれか。"
    },
    "options": [
      {
        "vi": "Thanh tra (inspection)",
        "en": "Inspection",
        "ja": "インスペクション"
      },
      {
        "vi": "Duyet qua (walkthrough)",
        "en": "Walkthrough",
        "ja": "ウォークスルー"
      },
      {
        "vi": "Ra soat ky thuat (technical review)",
        "en": "Technical review",
        "ja": "テクニカルレビュー"
      },
      {
        "vi": "Ra soat khong chinh thuc (informal review)",
        "en": "Informal review",
        "ja": "非公式レビュー"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thanh tra (inspection) la loai ra soat trang trong nhat: co vai tro ro rang, quy trinh chinh thuc, tieu chi vao/ra va thu thap so lieu do luong.",
      "en": "Inspection is the most formal review type: defined roles, a formal process, entry/exit criteria and metric collection.",
      "ja": "インスペクションは最も公式なレビュー：明確な役割、公式プロセス、開始／終了基準、メトリクス収集を伴う。"
    }
  },
  {
    "q": {
      "vi": "Testcase 「dang nhap sai mat khau 3 lan phai bi khoa」 lay tu tai lieu dac ta, khong xem ma nguon. Day la ky thuat nhom nao?",
      "en": "A test case 'wrong password 3 times must lock the account', derived from the specification without looking at code, belongs to which technique category?",
      "ja": "「誤ったパスワードを3回でアカウントがロックされる」というテストケースを、コードを見ずに仕様から導いた。これはどの技法カテゴリか。"
    },
    "options": [
      {
        "vi": "Ky thuat hop trang (white-box)",
        "en": "White-box techniques",
        "ja": "ホワイトボックス技法"
      },
      {
        "vi": "Ky thuat hop den (black-box)",
        "en": "Black-box techniques",
        "ja": "ブラックボックス技法"
      },
      {
        "vi": "Ky thuat dua tren kinh nghiem (experience-based)",
        "en": "Experience-based techniques",
        "ja": "経験ベース技法"
      },
      {
        "vi": "Ky thuat dua tren cau truc ma",
        "en": "Code-structure-based techniques",
        "ja": "コード構造ベース技法"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ky thuat hop den suy ra test tu dac ta/hanh vi ma khong tham chieu cau truc ben trong cua ma. Day la truong hop dien hinh.",
      "en": "Black-box techniques derive tests from the specification/behaviour without referencing internal code structure. This is a typical case.",
      "ja": "ブラックボックス技法は内部コード構造を参照せず、仕様や振る舞いからテストを導く。これはその典型例。"
    }
  },
  {
    "q": {
      "vi": "Kiem thu vien giau kinh nghiem, khong dung test case viet san, tu do kham pha va thiet ke test ngay khi chay ung dung. Day la ky thuat gi?",
      "en": "An experienced tester, without predefined test cases, freely explores and designs tests while running the application. Which technique is this?",
      "ja": "経験豊富なテスターが事前定義のテストケースなしで、アプリを操作しながら自由に探索してテストを設計する。これは何の技法か。"
    },
    "options": [
      {
        "vi": "Phan tich gia tri bien (boundary value analysis)",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Kiem thu bang quyet dinh (decision table testing)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Kiem thu kham pha (exploratory testing)",
        "en": "Exploratory testing",
        "ja": "探索的テスト"
      },
      {
        "vi": "Kiem thu chuyen trang thai (state transition testing)",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiem thu kham pha la ky thuat dua tren kinh nghiem: hoc, thiet ke va thuc thi test dong thoi, thuong theo phien co dinh huong (charter).",
      "en": "Exploratory testing is an experience-based technique: learning, designing and executing tests concurrently, often in charter-driven sessions.",
      "ja": "探索的テストは経験ベース技法で、学習・設計・実行を同時に行い、しばしばチャーター主導のセッションで行う。"
    }
  },
  {
    "q": {
      "vi": "Doi muon ngan chan khuyet tat lot vao san pham nen dat 「hang rao chat luong」 truoc khi merge ma. Cach nao thuoc kiem thu tinh giup dat muc tieu do?",
      "en": "A team wants to prevent defects from entering the product by placing a quality gate before merging code. Which static approach helps achieve this?",
      "ja": "チームはコードのマージ前に品質ゲートを設けて欠陥の混入を防ぎたい。この目的に役立つ静的アプローチはどれか。"
    },
    "options": [
      {
        "vi": "Kiem thu tai (load testing) truoc khi merge",
        "en": "Load testing before merge",
        "ja": "マージ前の負荷テスト"
      },
      {
        "vi": "Kiem thu kham pha tren ban phat hanh",
        "en": "Exploratory testing on the release",
        "ja": "リリース版での探索的テスト"
      },
      {
        "vi": "Kiem thu chap nhan cua nguoi dung (UAT)",
        "en": "User acceptance testing",
        "ja": "ユーザー受け入れテスト"
      },
      {
        "vi": "Ra soat ma (code review) va phan tich tinh (static analysis)",
        "en": "Code review and static analysis",
        "ja": "コードレビューと静的解析"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ra soat ma va phan tich tinh la ky thuat tinh, phat hien khuyet tat truoc khi thuc thi - phu hop lam hang rao chat luong khi merge.",
      "en": "Code review and static analysis are static techniques that find defects before execution - ideal as a quality gate at merge time.",
      "ja": "コードレビューと静的解析は実行前に欠陥を発見する静的技法で、マージ時の品質ゲートに適する。"
    }
  },
  {
    "q": {
      "vi": "Trong 7 nguyen tac kiem thu, cau 「kiem thu chi cho thay su hien dien cua khuyet tat, khong chung minh khong con khuyet tat」 nhac nho dieu gi?",
      "en": "Among the 7 testing principles, 'testing shows the presence, not the absence, of defects' reminds us of what?",
      "ja": "7つのテスト原則のうち「テストは欠陥の存在を示すが、欠陥がないことは証明できない」は何を思い出させるか。"
    },
    "options": [
      {
        "vi": "Kiem thu giam rui ro con lai nhung khong dam bao khong con khuyet tat",
        "en": "Testing reduces residual risk but cannot guarantee no defects remain",
        "ja": "テストは残存リスクを減らすが欠陥ゼロは保証できない"
      },
      {
        "vi": "Neu khong tim thay loi thi phan mem chac chan hoan hao",
        "en": "If no defects are found the software is certainly perfect",
        "ja": "欠陥が見つからなければソフトは確実に完璧"
      },
      {
        "vi": "Chi can chay du test la chung minh duoc phan mem dung",
        "en": "Running enough tests proves the software is correct",
        "ja": "十分なテストを実行すれば正しさを証明できる"
      },
      {
        "vi": "Kiem thu vet can luon kha thi",
        "en": "Exhaustive testing is always feasible",
        "ja": "全数テストは常に可能"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu co the tim khuyet tat va giam rui ro nhung khong the chung minh phan mem hoan toan khong con khuyet tat.",
      "en": "Testing can find defects and reduce risk but cannot prove the software is entirely free of defects.",
      "ja": "テストは欠陥を発見しリスクを減らせるが、欠陥が皆無であることは証明できない。"
    }
  },
  {
    "q": {
      "vi": "Bien tuoi hop le 18..65. Ap dung phan hoach tuong duong, gia tri nao la dai dien cho lop HOP LE?",
      "en": "Valid age variable 18..65. Using equivalence partitioning, which value represents the VALID partition?",
      "ja": "有効な年齢変数18..65。同値分割を用いる場合、有効パーティションを代表する値はどれか。"
    },
    "options": [
      {
        "vi": "17",
        "en": "17",
        "ja": "17"
      },
      {
        "vi": "40",
        "en": "40",
        "ja": "40"
      },
      {
        "vi": "66",
        "en": "66",
        "ja": "66"
      },
      {
        "vi": "-5",
        "en": "-5",
        "ja": "-5"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "40 nam trong khoang [18..65] nen la dai dien cho lop hop le. 17 va 66 thuoc lop khong hop le; -5 cung khong hop le.",
      "en": "40 lies within [18..65], representing the valid partition. 17 and 66 are invalid; -5 is also invalid.",
      "ja": "40は[18..65]内にあり有効パーティションの代表。17と66は無効、-5も無効。"
    }
  },
  {
    "q": {
      "vi": "Chuong trinh: neu diem >= 5 thi 「Dau」, nguoc lai 「Rot」. Cac gia tri bien can chon theo BVA (3-value) quanh nguong 5 la gi?",
      "en": "Program: if score >= 5 then 'Pass' else 'Fail'. Which values should 3-value BVA select around the threshold 5?",
      "ja": "プログラム：点数>=5なら「合格」、そうでなければ「不合格」。3値BVAでしきい値5の周辺に選ぶべき値は何か。"
    },
    "options": [
      {
        "vi": "3, 4, 5",
        "en": "3, 4, 5",
        "ja": "3,4,5"
      },
      {
        "vi": "5, 6, 7",
        "en": "5, 6, 7",
        "ja": "5,6,7"
      },
      {
        "vi": "4, 5, 6",
        "en": "4, 5, 6",
        "ja": "4,5,6"
      },
      {
        "vi": "1, 5, 10",
        "en": "1, 5, 10",
        "ja": "1,5,10"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "BVA 3-value kiem thu gia tri bien va hai gia tri ke ben. Nguong 5 nen kiem 4, 5, 6 de bao truong hop sat truoc, tai va sat sau bien.",
      "en": "3-value BVA tests the boundary and its two neighbours. Threshold 5 should test 4, 5, 6 to cover just-below, at, and just-above the boundary.",
      "ja": "3値BVAは境界とその両隣を検証する。しきい値5は4,5,6を検証し、境界の直前・境界・直後を網羅する。"
    }
  },
  {
    "q": {
      "vi": "Doan ma co vong lap va nhieu duong di. Bo test dat 100% do phu nhanh (branch). Dieu nao SAU DAY chac chan dung?",
      "en": "A code segment has loops and multiple paths. A test set achieves 100% branch coverage. Which of the following is certainly true?",
      "ja": "ループと複数の経路を持つコード。あるテストセットがブランチカバレッジ100%を達成した。次のうち確実に正しいのはどれか。"
    },
    "options": [
      {
        "vi": "Dat 100% do phu nhanh cung suy ra 100% do phu duong di",
        "en": "100% branch coverage also implies 100% path coverage",
        "ja": "100%ブランチカバレッジは100%パスカバレッジも意味する"
      },
      {
        "vi": "Da tim het moi khuyet tat trong doan ma",
        "en": "All defects in the segment have been found",
        "ja": "コード内の全欠陥が発見された"
      },
      {
        "vi": "Do phu nhanh khong lien quan do phu cau lenh",
        "en": "Branch coverage is unrelated to statement coverage",
        "ja": "ブランチカバレッジはステートメントカバレッジと無関係"
      },
      {
        "vi": "Dat 100% do phu nhanh thi cung dat 100% do phu cau lenh",
        "en": "100% branch coverage implies 100% statement coverage",
        "ja": "100%ブランチカバレッジは100%ステートメントカバレッジを意味する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Do phu nhanh manh hon do phu cau lenh: dat 100% nhanh keo theo 100% cau lenh, nhung khong suy ra 100% duong di, va khong dam bao het khuyet tat.",
      "en": "Branch coverage subsumes statement coverage: 100% branch implies 100% statement, but not 100% path, and does not guarantee all defects are found.",
      "ja": "ブランチカバレッジはステートメントカバレッジを包含する。100%ブランチは100%ステートメントを含意するが、パス網羅は保証せず、欠陥皆無も保証しない。"
    }
  },
  {
    "q": {
      "vi": "Nhom test can kiem thu tinh nang moi va van dam bao chuc nang cu con hoat dong sau khi build. Cap hoat dong nao dung nhat cho tinh huong nay?",
      "en": "A team must test a new feature and still ensure old functions work after a build. Which pair of activities best fits this situation?",
      "ja": "チームは新機能をテストし、ビルド後も既存機能が動くことを確認する必要がある。この状況に最も適する活動の組はどれか。"
    },
    "options": [
      {
        "vi": "Kiem thu xac nhan tinh nang moi + kiem thu hoi quy phan cu",
        "en": "Confirmation testing of the new feature + regression testing of the old parts",
        "ja": "新機能の確認テスト＋既存部分のリグレッションテスト"
      },
      {
        "vi": "Chi kiem thu tai (load) + kiem thu bao mat",
        "en": "Only load testing + security testing",
        "ja": "負荷テストのみ＋セキュリティテスト"
      },
      {
        "vi": "Chi kiem thu kham pha + kiem thu chap nhan",
        "en": "Only exploratory testing + acceptance testing",
        "ja": "探索的テストのみ＋受け入れテスト"
      },
      {
        "vi": "Chi phan tich tinh + ra soat",
        "en": "Only static analysis + review",
        "ja": "静的解析のみ＋レビュー"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu xac nhan kiem tra tinh nang moi/ban sua hoat dong; kiem thu hoi quy dam bao thay doi khong lam hong chuc nang tung chay dung.",
      "en": "Confirmation testing checks the new feature/fix works; regression testing ensures the change did not break previously working functions.",
      "ja": "確認テストは新機能／修正の動作を確認し、リグレッションテストは変更が既存機能を壊さないことを保証する。"
    }
  },
  {
    "q": {
      "vi": "Trong quy trinh kiem thu, viec danh gia tieu chi thoat (exit criteria) va viet bao cao tom tat kiem thu thuoc hoat dong nao?",
      "en": "In the test process, evaluating exit criteria and writing the test summary report belong to which activity?",
      "ja": "テストプロセスにおいて、終了基準の評価とテストサマリレポートの作成はどの活動に属するか。"
    },
    "options": [
      {
        "vi": "Giam sat va kiem soat kiem thu (monitoring and control)",
        "en": "Test monitoring and control",
        "ja": "テストのモニタリングとコントロール"
      },
      {
        "vi": "Hoan tat kiem thu (test completion)",
        "en": "Test completion",
        "ja": "テスト完了"
      },
      {
        "vi": "Thuc thi kiem thu (test execution)",
        "en": "Test execution",
        "ja": "テスト実行"
      },
      {
        "vi": "Phan tich kiem thu (test analysis)",
        "en": "Test analysis",
        "ja": "テスト分析"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Hoan tat kiem thu bao gom tong ket, kiem tra da dat tieu chi thoat, viet bao cao tom tat va luu tru tai san kiem thu.",
      "en": "Test completion includes summarising, checking exit criteria have been met, writing the summary report and archiving testware.",
      "ja": "テスト完了は総括、終了基準の充足確認、サマリレポート作成、テストウェアのアーカイブを含む。"
    }
  },
  {
    "q": {
      "vi": "Cong ty phat trand vi 「vang mat loi la nguy bien」 (absence-of-errors fallacy). Y nghia dung la gi?",
      "en": "A company cites the 'absence-of-errors fallacy'. What is its correct meaning?",
      "ja": "ある会社が「欠陥ゼロの落とし穴」を引用した。その正しい意味は何か。"
    },
    "options": [
      {
        "vi": "Phan mem khong con loi thi chac chan thanh cong tren thi truong",
        "en": "Defect-free software is certainly a market success",
        "ja": "欠陥ゼロのソフトは必ず市場で成功する"
      },
      {
        "vi": "Neu tim du loi thi phan mem se hoan hao",
        "en": "Finding enough defects makes the software perfect",
        "ja": "十分な欠陥発見でソフトは完璧になる"
      },
      {
        "vi": "Phan mem khong con loi van co the vo dung neu khong dap ung nhu cau nguoi dung",
        "en": "Defect-free software may still be useless if it does not meet user needs",
        "ja": "欠陥ゼロでもユーザーのニーズを満たさなければ役立たない場合がある"
      },
      {
        "vi": "Loi la khong the tranh khoi nen khong can sua",
        "en": "Defects are unavoidable so no need to fix them",
        "ja": "欠陥は不可避なので修正不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nguyen tac nay canh bao: dap ung dung dac ta va het loi van chua du - phan mem phai dung dan va dap ung nhu cau, ky vong thuc te cua nguoi dung.",
      "en": "The principle warns that meeting the spec and being defect-free is not enough - software must be correct and meet users' real needs and expectations.",
      "ja": "この原則は、仕様充足と欠陥ゼロでも不十分と警告する。ソフトは正しく、ユーザーの実ニーズと期待を満たす必要がある。"
    }
  },
  {
    "q": {
      "vi": "Kiem thu thanh phan (component/unit testing) thuong do ai thuc hien va tap trung vao gi?",
      "en": "Who typically performs component (unit) testing and what does it focus on?",
      "ja": "コンポーネント（ユニット）テストは通常誰が行い、何に焦点を当てるか。"
    },
    "options": [
      {
        "vi": "Khach hang; tap trung quy trinh nghiep vu dau-cuoi",
        "en": "Customers; focusing on end-to-end business processes",
        "ja": "顧客；エンドツーエンドの業務プロセスに焦点"
      },
      {
        "vi": "Doi van hanh; tap trung ha tang mang",
        "en": "Operations team; focusing on network infrastructure",
        "ja": "運用チーム；ネットワークインフラに焦点"
      },
      {
        "vi": "Nguoi dung cuoi; tap trung tinh de su dung tong the",
        "en": "End users; focusing on overall usability",
        "ja": "エンドユーザー；全体的な使いやすさに焦点"
      },
      {
        "vi": "Lap trinh vien; tap trung tung don vi ma rieng le",
        "en": "Developers; focusing on individual code units in isolation",
        "ja": "開発者；個々のコードユニットを単独で焦点"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiem thu thanh phan thuong do lap trinh vien thuc hien, kiem tra rieng le tung don vi ma (ham, lop, module) doc lap voi phan con lai.",
      "en": "Component testing is usually done by developers, verifying individual code units (functions, classes, modules) in isolation.",
      "ja": "コンポーネントテストは通常開発者が行い、個々のコードユニット（関数・クラス・モジュール）を単独で検証する。"
    }
  },
  {
    "q": {
      "vi": "Kiem thu tich hop (integration testing) tim khuyet tat chu yeu o dau?",
      "en": "Integration testing mainly looks for defects where?",
      "ja": "統合テスト（インテグレーションテスト）は主にどこの欠陥を探すか。"
    },
    "options": [
      {
        "vi": "O giao tiep va tuong tac giua cac thanh phan/he thong",
        "en": "In the interfaces and interactions between components/systems",
        "ja": "コンポーネント／システム間のインターフェースと相互作用"
      },
      {
        "vi": "Ben trong logic cua mot ham don le",
        "en": "Inside the logic of a single function",
        "ja": "単一関数のロジック内部"
      },
      {
        "vi": "O trai nghiem nguoi dung cuoi tren giao dien",
        "en": "In the end user experience of the interface",
        "ja": "エンドユーザーのUI体験"
      },
      {
        "vi": "O hop dong phap ly voi khach hang",
        "en": "In the legal contract with the customer",
        "ja": "顧客との法的契約"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu tich hop tap trung vao giao tiep va tuong tac giua cac thanh phan (integration thanh phan) hoac giua cac he thong (integration he thong).",
      "en": "Integration testing focuses on interfaces and interactions between components (component integration) or between systems (system integration).",
      "ja": "統合テストはコンポーネント間（コンポーネント統合）やシステム間（システム統合）のインターフェースと相互作用に焦点を当てる。"
    }
  },
  {
    "q": {
      "vi": "Yeu cau: 「He thong phai phan hoi trong vong 2 giay voi 1000 nguoi dung dong thoi」. Day la loai kiem thu (test type) nao?",
      "en": "Requirement: 'The system must respond within 2 seconds with 1000 concurrent users'. This is which test type?",
      "ja": "要求：「システムは1000人同時利用時に2秒以内に応答すること」。これはどのテストタイプか。"
    },
    "options": [
      {
        "vi": "Kiem thu chuc nang (functional testing)",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Kiem thu phi chuc nang - hieu nang (non-functional performance testing)",
        "en": "Non-functional performance testing",
        "ja": "非機能テスト（性能テスト）"
      },
      {
        "vi": "Kiem thu cau truc (structural/white-box testing)",
        "en": "Structural (white-box) testing",
        "ja": "構造テスト（ホワイトボックス）"
      },
      {
        "vi": "Kiem thu hoi quy (regression testing)",
        "en": "Regression testing",
        "ja": "リグレッションテスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Yeu cau ve thoi gian phan hoi va so nguoi dung dong thoi lien quan chat luong hieu nang - mot dac tinh phi chuc nang, do bang kiem thu hieu nang.",
      "en": "A requirement about response time and concurrent users concerns performance - a non-functional quality characteristic tested via performance testing.",
      "ja": "応答時間と同時ユーザー数の要求は性能に関する非機能特性であり、性能テストで検証する。"
    }
  },
  {
    "q": {
      "vi": "Doi Agile ap dung TDD. Trong TDD, thu tu dung la gi?",
      "en": "An Agile team uses TDD. In TDD, what is the correct order?",
      "ja": "アジャイルチームがTDDを用いる。TDDでの正しい順序は何か。"
    },
    "options": [
      {
        "vi": "Viet ma truoc, viet test sau, roi tai cau truc (refactor)",
        "en": "Write code first, then test, then refactor",
        "ja": "先にコード、次にテスト、その後リファクタ"
      },
      {
        "vi": "Refactor truoc, viet test, roi viet ma",
        "en": "Refactor first, then test, then code",
        "ja": "先にリファクタ、次にテスト、その後コード"
      },
      {
        "vi": "Viet test that bai truoc, viet ma cho test dat, roi tai cau truc",
        "en": "Write a failing test first, write code to pass it, then refactor",
        "ja": "先に失敗するテスト、通すコード、その後リファクタ"
      },
      {
        "vi": "Viet toan bo ma, sau do viet toan bo test cuoi cung",
        "en": "Write all code, then write all tests at the end",
        "ja": "全コードを書き、最後に全テストを書く"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "TDD theo chu ky Do-Xanh-Tai cau truc (Red-Green-Refactor): viet test that bai truoc, viet ma toi thieu de test dat, roi cai thien ma.",
      "en": "TDD follows Red-Green-Refactor: write a failing test first, write minimal code to pass it, then improve the code.",
      "ja": "TDDはレッド・グリーン・リファクタのサイクル：先に失敗するテスト、通す最小コード、その後コードを改善する。"
    }
  },
  {
    "q": {
      "vi": "Bien nhap 「so luong san pham」 hop le 1..50. Ket hop phan hoach tuong duong va gia tri bien, tap gia tri dai dien toi uu nao sau day la hop ly nhat?",
      "en": "Input 'product quantity' is valid 1..50. Combining equivalence partitioning and boundary values, which representative set is most reasonable?",
      "ja": "入力「商品数量」の有効範囲は1..50。同値分割と境界値を組み合わせる場合、最も妥当な代表値の集合はどれか。"
    },
    "options": [
      {
        "vi": "25",
        "en": "25",
        "ja": "25"
      },
      {
        "vi": "-1 va 100",
        "en": "-1 and 100",
        "ja": "-1と100"
      },
      {
        "vi": "Tat ca so tu 1 den 50",
        "en": "All numbers from 1 to 50",
        "ja": "1から50までの全数"
      },
      {
        "vi": "0, 1, 50, 51 va mot gia tri giua nhu 25",
        "en": "0, 1, 50, 51 and a middle value such as 25",
        "ja": "0,1,50,51と25のような中間値"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ket hop hai ky thuat: gia tri giua (25) dai dien lop hop le, va cac bien 0,1,50,51 kiem tra sat quanh gioi han - vua gon vua phu tot.",
      "en": "Combining both techniques: a middle value (25) represents the valid partition, and boundaries 0,1,50,51 test just around the limits - compact yet effective.",
      "ja": "両技法の組み合わせ：中間値25が有効パーティションを代表し、境界0,1,50,51が限界周辺を検証する。簡潔かつ効果的。"
    }
  },
  {
    "q": {
      "vi": "Trong bang quyet dinh, mot cot co ket hop dieu kien khong the xay ra trong thuc te (mau thuan). Nen xu ly the nao?",
      "en": "In a decision table, a column has a combination of conditions that cannot occur in reality (infeasible). How should it be handled?",
      "ja": "デシジョンテーブルで、ある列に現実に発生し得ない（実行不能な）条件の組み合わせがある。どう扱うべきか。"
    },
    "options": [
      {
        "vi": "Co the loai bo/gop cot khong kha thi de rut gon bang",
        "en": "It may be removed/collapsed as infeasible to simplify the table",
        "ja": "実行不能として削除／統合し表を簡略化してよい"
      },
      {
        "vi": "Van bat buoc viet test case cho no",
        "en": "Still mandatorily write a test case for it",
        "ja": "それでも必ずテストケースを作る"
      },
      {
        "vi": "Xoa toan bo bang quyet dinh",
        "en": "Delete the entire decision table",
        "ja": "デシジョンテーブル全体を削除する"
      },
      {
        "vi": "Bien no thanh dieu kien bat buoc dung",
        "en": "Force it to be a mandatory true condition",
        "ja": "強制的に必ず真の条件にする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Cac ket hop khong kha thi co the duoc loai bo hoac gop lai (bang thu gon) vi khong can kiem thu truong hop khong bao gio xay ra.",
      "en": "Infeasible combinations can be removed or collapsed (a collapsed table) since there is no need to test situations that never occur.",
      "ja": "実行不能な組み合わせは削除または統合できる（簡略化された表）。決して起こらない状況を検証する必要はない。"
    }
  },
  {
    "q": {
      "vi": "Cong cu tu dong hoa kiem thu mang lai loi ich chinh nao khi chay hoi quy lap di lap lai?",
      "en": "What is the main benefit of test automation tools when running repetitive regression?",
      "ja": "反復的なリグレッションを実行する際、テスト自動化ツールの主な利点は何か。"
    },
    "options": [
      {
        "vi": "Loai bo hoan toan nhu cau kiem thu vien",
        "en": "Completely eliminating the need for testers",
        "ja": "テスターの必要性を完全に排除"
      },
      {
        "vi": "Giam cong lap lai va tang tinh nhat quan khi thuc thi lai nhieu lan",
        "en": "Reducing repetitive effort and improving consistency across repeated runs",
        "ja": "反復作業を減らし、繰り返し実行時の一貫性を高める"
      },
      {
        "vi": "Dam bao tim ra 100% khuyet tat",
        "en": "Guaranteeing 100% of defects are found",
        "ja": "欠陥の100%発見を保証"
      },
      {
        "vi": "Thay the hoan toan viec thiet ke test",
        "en": "Fully replacing test design",
        "ja": "テスト設計を完全に置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tu dong hoa manh o cac test lap lai on dinh: giam cong tay, chay nhanh va nhat quan. No khong dam bao tim het loi hay thay the tu duy thiet ke test.",
      "en": "Automation excels at stable repetitive tests: less manual effort, faster and consistent runs. It does not guarantee finding all defects nor replace test design thinking.",
      "ja": "自動化は安定した反復テストに強い：手作業を減らし、速く一貫して実行できる。全欠陥発見は保証せず、テスト設計思考も置き換えない。"
    }
  },
  {
    "q": {
      "vi": "Nguyen tac 「nghich ly thuoc tru sau」 (pesticide paradox) khuyen kiem thu vien lam gi?",
      "en": "The 'pesticide paradox' principle advises testers to do what?",
      "ja": "「殺虫剤のパラドックス」の原則はテスターに何を勧めるか。"
    },
    "options": [
      {
        "vi": "Chay lai chinh xac cung mot bo test mai mai",
        "en": "Re-run exactly the same test set forever",
        "ja": "同じテストセットを永遠に再実行する"
      },
      {
        "vi": "Ngung kiem thu khi bo test cu khong con tim ra loi",
        "en": "Stop testing once old tests find no more defects",
        "ja": "既存テストが欠陥を出さなくなったらテストを止める"
      },
      {
        "vi": "Ra soat va cap nhat/bo sung test moi de tim khuyet tat khac",
        "en": "Review and update/add new tests to find different defects",
        "ja": "テストを見直し、更新／追加して別の欠陥を見つける"
      },
      {
        "vi": "Chi dung cong cu tu dong, khong dung test thu cong",
        "en": "Use only automated tools, never manual tests",
        "ja": "自動ツールのみ使い手動テストは使わない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Neu chay mai cung mot bo test, chung se khong con phat hien loi moi. Can ra soat va cap nhat/them test moi de bao vung khac.",
      "en": "If the same tests are run repeatedly, they stop finding new defects. Tests must be reviewed and updated/added to cover different areas.",
      "ja": "同じテストを繰り返すと新しい欠陥を見つけなくなる。テストを見直し、更新／追加して別の領域を網羅する必要がある。"
    }
  },
  {
    "q": {
      "vi": "Trong Agile, 「tieu chi hoan thanh」 (Definition of Done) co vai tro gi lien quan den kiem thu?",
      "en": "In Agile, what role does the 'Definition of Done' play in relation to testing?",
      "ja": "アジャイルで「完了の定義（Definition of Done）」はテストに関してどんな役割を果たすか。"
    },
    "options": [
      {
        "vi": "La danh sach uu tien tinh nang cho khach hang",
        "en": "A prioritised feature list for the customer",
        "ja": "顧客向けの優先機能リスト"
      },
      {
        "vi": "So do kien truc ky thuat",
        "en": "The technical architecture diagram",
        "ja": "技術アーキテクチャ図"
      },
      {
        "vi": "Ke hoach ngan sach cho ca du an",
        "en": "The budget plan for the whole project",
        "ja": "プロジェクト全体の予算計画"
      },
      {
        "vi": "Tap tieu chi phai thoa (gom cac hoat dong kiem thu) truoc khi hang muc duoc coi la hoan thanh",
        "en": "A set of criteria (including testing activities) that must be met before an item is considered done",
        "ja": "項目が完了とみなされる前に満たすべき基準（テスト活動を含む）の集合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Definition of Done la tap tieu chi (thuong bao gom da kiem thu, da ra soat, dat do phu...) phai dat truoc khi mot hang muc duoc coi la hoan thanh.",
      "en": "Definition of Done is a set of criteria (often including tested, reviewed, coverage met...) that must be satisfied before an item is considered complete.",
      "ja": "完了の定義は、項目が完了とみなされる前に満たすべき基準（テスト済み・レビュー済み・網羅達成など）の集合である。"
    }
  },
  {
    "q": {
      "vi": "Ky thuat kiem thu dua tren kinh nghiem nao dung mot danh sach cac loi/rui ro tung gap de kiem tra co he thong hon doan loi thuan tuy?",
      "en": "Which experience-based technique uses a list of known defects/risks to check more systematically than pure error guessing?",
      "ja": "純粋なエラー推測より体系的に検証するため、既知の欠陥／リスクのリストを用いる経験ベース技法はどれか。"
    },
    "options": [
      {
        "vi": "Kiem thu dua tren checklist (checklist-based testing)",
        "en": "Checklist-based testing",
        "ja": "チェックリストベーステスト"
      },
      {
        "vi": "Kiem thu kham pha (exploratory testing)",
        "en": "Exploratory testing",
        "ja": "探索的テスト"
      },
      {
        "vi": "Phan tich gia tri bien (boundary value analysis)",
        "en": "Boundary value analysis",
        "ja": "境界値分析"
      },
      {
        "vi": "Kiem thu bang quyet dinh (decision table testing)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu dua tren checklist dung danh sach cac muc/loai loi da biet lam co so kiem tra co he thong - la ky thuat dua tren kinh nghiem.",
      "en": "Checklist-based testing uses a list of known items/defect types as a systematic basis - an experience-based technique.",
      "ja": "チェックリストベーステストは既知の項目／欠陥タイプのリストを体系的な基盤として用いる経験ベース技法である。"
    }
  },
  {
    "q": {
      "vi": "Cac gia tri 5, 15, 25 cho 3 lop tuoi khac nhau (tre em, thanh nien, nguoi lon). Neu chon moi lop mot gia tri dai dien, day la bieu hien cua ky thuat nao?",
      "en": "Values 5, 15, 25 for three age classes (child, teen, adult). Choosing one representative per class illustrates which technique?",
      "ja": "3つの年齢区分（子供・青少年・大人）に対する値5,15,25。各区分から代表1つを選ぶのはどの技法の表れか。"
    },
    "options": [
      {
        "vi": "Kiem thu chuyen trang thai (state transition testing)",
        "en": "State transition testing",
        "ja": "状態遷移テスト"
      },
      {
        "vi": "Phan hoach tuong duong (equivalence partitioning)",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Do phu cau lenh (statement coverage)",
        "en": "Statement coverage",
        "ja": "ステートメントカバレッジ"
      },
      {
        "vi": "Kiem thu tai (load testing)",
        "en": "Load testing",
        "ja": "負荷テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chia dau vao thanh cac lop ma trong do phan mem cu the se xu ly giong nhau, roi chon dai dien moi lop - do la phan hoach tuong duong.",
      "en": "Dividing input into classes the software treats the same way, then picking a representative from each, is equivalence partitioning.",
      "ja": "入力をソフトが同様に扱う区分に分け、各区分から代表を選ぶのが同値分割である。"
    }
  },
  {
    "q": {
      "vi": "Truong hop nao sau day la vi du dien hinh cua kiem thu chap nhan van hanh (Operational Acceptance Testing)?",
      "en": "Which of the following is a typical example of Operational Acceptance Testing?",
      "ja": "次のうち、運用受け入れテスト（OAT）の典型例はどれか。"
    },
    "options": [
      {
        "vi": "Khach hang xac nhan tinh nang dap ung hop dong",
        "en": "Customer confirming features meet the contract",
        "ja": "顧客が機能が契約を満たすと確認"
      },
      {
        "vi": "Lap trinh vien kiem thu don vi ma",
        "en": "Developers unit testing the code",
        "ja": "開発者によるコードのユニットテスト"
      },
      {
        "vi": "Kiem thu sao luu-phuc hoi, cai dat, chuyen doi du lieu boi doi van hanh",
        "en": "Testing backup-restore, installation, data migration by the operations team",
        "ja": "運用チームによるバックアップ・復元、インストール、データ移行のテスト"
      },
      {
        "vi": "Kiem thu tuong tac giao dien nguoi dung",
        "en": "Testing the user interface interactions",
        "ja": "UI操作のテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiem thu chap nhan van hanh tap trung cac khia canh van hanh: sao luu-phuc hoi, cai dat, nang cap, chuyen doi du lieu, khoi phuc sau su co - do doi van hanh thuc hien.",
      "en": "Operational Acceptance Testing focuses on operational aspects: backup-restore, installation, upgrade, data migration, disaster recovery - done by operations.",
      "ja": "運用受け入れテストは運用面（バックアップ・復元、インストール、アップグレード、データ移行、災害復旧）に焦点を当て、運用チームが実施する。"
    }
  },
  {
    "q": {
      "vi": "Mot doan ma: x = a / b. Kiem thu vien co kinh nghiem quyet dinh thu voi b = 0 vi 「thuong hay loi cho nay」. Day la ky thuat gi?",
      "en": "Code: x = a / b. An experienced tester decides to try b = 0 because 'this often fails'. Which technique is this?",
      "ja": "コード：x = a / b。経験豊富なテスターが「ここはよく失敗する」と考えb = 0を試す。これは何の技法か。"
    },
    "options": [
      {
        "vi": "Phan hoach tuong duong (equivalence partitioning)",
        "en": "Equivalence partitioning",
        "ja": "同値分割"
      },
      {
        "vi": "Do phu nhanh (branch coverage)",
        "en": "Branch coverage",
        "ja": "ブランチカバレッジ"
      },
      {
        "vi": "Kiem thu bang quyet dinh (decision table testing)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      },
      {
        "vi": "Doan loi (error guessing)",
        "en": "Error guessing",
        "ja": "エラー推測"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Doan loi la ky thuat dua tren kinh nghiem: kiem thu vien du doan cac cho de loi (nhu chia cho 0) dua tren kien thuc va tung trai.",
      "en": "Error guessing is an experience-based technique: the tester anticipates error-prone spots (like division by zero) based on knowledge and past experience.",
      "ja": "エラー推測は経験ベース技法：テスターが知識と経験に基づき欠陥が起きやすい箇所（ゼロ除算など）を予測する。"
    }
  },
  {
    "q": {
      "vi": "Trong so cac muc tieu kiem thu, muc tieu nao thuoc ve 「xay dung su tu tin」 (building confidence) hon la 「tim loi」?",
      "en": "Among test objectives, which one is about 'building confidence' rather than 'finding defects'?",
      "ja": "テスト目的のうち、「欠陥発見」よりも「信頼の構築」に関わるのはどれか。"
    },
    "options": [
      {
        "vi": "Chung minh doi tuong kiem thu dat muc chat luong yeu cau, tang tin cay cho ben lien quan",
        "en": "Demonstrating the test object meets required quality, giving stakeholders confidence",
        "ja": "テスト対象が必要な品質を満たすことを示し関係者に信頼を与える"
      },
      {
        "vi": "Tim cang nhieu khuyet tat cang tot truoc phat hanh",
        "en": "Finding as many defects as possible before release",
        "ja": "リリース前にできるだけ多くの欠陥を発見"
      },
      {
        "vi": "Cach ly nguyen nhan goc cua khuyet tat",
        "en": "Isolating the root cause of a defect",
        "ja": "欠陥の根本原因の特定"
      },
      {
        "vi": "Tao them khuyet tat de kiem tra cong cu",
        "en": "Injecting more defects to test the tool",
        "ja": "ツール検証のため欠陥を注入"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiem thu vua tim loi vua xay dung su tu tin - chung minh san pham dat muc chat luong de cac ben lien quan yen tam ra quyet dinh phat hanh.",
      "en": "Testing both finds defects and builds confidence - demonstrating the product meets a quality level so stakeholders can decide on release.",
      "ja": "テストは欠陥発見と信頼構築の両方を担う。製品が品質水準を満たすことを示し、関係者がリリース判断できるようにする。"
    }
  },
  {
    "q": {
      "vi": "Trinh bien dich va cong cu phan tich tinh (static analysis) co the phat hien som loai van de nao ma khong can chay chuong trinh?",
      "en": "Compilers and static analysis tools can detect which kind of problem early without running the program?",
      "ja": "コンパイラや静的解析ツールは、プログラムを実行せずにどんな問題を早期に検出できるか。"
    },
    "options": [
      {
        "vi": "Thoi gian phan hoi duoi tai cao",
        "en": "Response time under high load",
        "ja": "高負荷下の応答時間"
      },
      {
        "vi": "Bien khong duoc khai bao, ma khong the toi (unreachable code), vi pham chuan lap trinh",
        "en": "Undeclared variables, unreachable code, coding-standard violations",
        "ja": "未宣言変数、到達不能コード、コーディング標準違反"
      },
      {
        "vi": "Su hai long thuc te cua nguoi dung",
        "en": "Actual user satisfaction",
        "ja": "実際のユーザー満足度"
      },
      {
        "vi": "Ket qua nghiep vu cuoi cung tren giao dien",
        "en": "Final business results on the interface",
        "ja": "UI上の最終業務結果"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Phan tich tinh tim cac khuyet tat nhu bien khong khai bao, ma chet/khong the toi, vi pham chuan - phat hien truoc khi chay, khong the do hieu nang hay su hai long.",
      "en": "Static analysis finds defects like undeclared variables, dead/unreachable code and standard violations - detected before execution; it cannot measure performance or satisfaction.",
      "ja": "静的解析は未宣言変数、デッド／到達不能コード、標準違反などを実行前に検出する。性能や満足度は測れない。"
    }
  },
  {
    "q": {
      "vi": "Nhom kiem thu muon uu tien test co kha nang tim loi cao va bao vung rui ro nhat trong thoi gian ngan. Nen phoi hop yeu to nao khi thiet ke?",
      "en": "A team wants to prioritise tests most likely to find defects and cover the riskiest areas in a short time. Which factors should be combined in design?",
      "ja": "チームは短時間で最も欠陥を見つけやすくリスクの高い領域を網羅するテストを優先したい。設計時にどの要素を組み合わせるべきか。"
    },
    "options": [
      {
        "vi": "Chi dung cong cu tu dong bat ke rui ro",
        "en": "Only automation tools regardless of risk",
        "ja": "リスクに関係なく自動ツールのみ"
      },
      {
        "vi": "Chi kiem thu theo thu tu ma nguon xuat hien",
        "en": "Test only in the order code appears",
        "ja": "コードの出現順にのみテスト"
      },
      {
        "vi": "Ket hop phan tich rui ro voi cac ky thuat thiet ke test phu hop (hop den, hop trang, kinh nghiem)",
        "en": "Combine risk analysis with suitable test design techniques (black-box, white-box, experience-based)",
        "ja": "リスク分析と適切なテスト設計技法（ブラックボックス・ホワイトボックス・経験ベース）を組み合わせる"
      },
      {
        "vi": "Bo qua rui ro, kiem thu ngau nhien",
        "en": "Ignore risk and test randomly",
        "ja": "リスクを無視しランダムにテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiem thu hieu qua ket hop danh gia rui ro (uu tien vung rui ro cao) voi ky thuat thiet ke test phu hop tinh huong de toi da hoa kha nang tim loi.",
      "en": "Effective testing combines risk assessment (prioritising high-risk areas) with test design techniques suited to the situation to maximise defect-finding.",
      "ja": "効果的なテストはリスク評価（高リスク領域の優先）と状況に応じたテスト設計技法を組み合わせ、欠陥発見を最大化する。"
    }
  },
  {
    "q": {
      "vi": "May quan ly kiem thu (test management tool) chu yeu ho tro cong viec gi?",
      "en": "A test management tool mainly supports which work?",
      "ja": "テスト管理ツールは主にどんな作業を支援するか。"
    },
    "options": [
      {
        "vi": "Bien dich ma nguon thanh tep chay",
        "en": "Compiling source code into executables",
        "ja": "ソースコードを実行ファイルにコンパイル"
      },
      {
        "vi": "Thay the hoan toan nguoi quan ly kiem thu",
        "en": "Fully replacing the test manager",
        "ja": "テストマネージャーを完全に代替"
      },
      {
        "vi": "Do luong nhiet do CPU cua may chu",
        "en": "Measuring server CPU temperature",
        "ja": "サーバーCPU温度の測定"
      },
      {
        "vi": "Quan ly test case, truy vet yeu cau, ghi nhan ket qua va lap bao cao tien do",
        "en": "Managing test cases, requirement traceability, recording results and progress reporting",
        "ja": "テストケース管理、要求トレーサビリティ、結果記録、進捗報告"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cong cu quan ly kiem thu ho tro to chuc va theo doi: quan ly test case, truy vet den yeu cau, ghi nhan ket qua thuc thi va bao cao tien do/do phu.",
      "en": "Test management tools support organising and tracking: managing test cases, tracing to requirements, recording execution results and reporting progress/coverage.",
      "ja": "テスト管理ツールは整理と追跡を支援する：テストケース管理、要求へのトレース、実行結果の記録、進捗／網羅の報告。"
    }
  },
  {
    "q": {
      "vi": "Trong kim tu thap kiem thu (test pyramid), tang nao thuong co so luong test nhieu nhat va chay nhanh nhat?",
      "en": "In the test pyramid, which layer typically has the most tests and runs fastest?",
      "ja": "テストピラミッドで、通常最もテスト数が多く最速で実行される層はどれか。"
    },
    "options": [
      {
        "vi": "Tang test don vi (unit) o day thap",
        "en": "The unit-test layer at the base",
        "ja": "土台のユニットテスト層"
      },
      {
        "vi": "Tang test dau-cuoi/giao dien (end-to-end/UI)",
        "en": "The end-to-end/UI layer",
        "ja": "エンドツーエンド／UI層"
      },
      {
        "vi": "Tang test tich hto (integration) o giua",
        "en": "The integration layer in the middle",
        "ja": "中間の統合層"
      },
      {
        "vi": "Cac tang deu bang nhau ve so luong",
        "en": "All layers have equal counts",
        "ja": "全層が同数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kim tu thap kiem thu khuyen nhieu test don vi (nhanh, re, on dinh) o day, it hon o tich hop, va it nhat o dau-cuoi/giao dien (cham, gion).",
      "en": "The test pyramid recommends many unit tests (fast, cheap, stable) at the base, fewer integration tests, and fewest end-to-end/UI tests (slow, brittle).",
      "ja": "テストピラミッドは土台に多数のユニットテスト（速く安く安定）、中間に少数の統合テスト、頂点に最少のE2E／UIテスト（遅く脆い）を推奨する。"
    }
  },
  {
    "q": {
      "vi": "Kiem thu vien tao ma tran truy vet (traceability matrix) giua yeu cau va test case chu yeu de lam gi?",
      "en": "A tester builds a traceability matrix between requirements and test cases mainly to do what?",
      "ja": "テスターが要求とテストケース間のトレーサビリティマトリクスを作る主な目的は何か。"
    },
    "options": [
      {
        "vi": "Tang toc bien dich ma",
        "en": "Speed up code compilation",
        "ja": "コンパイルの高速化"
      },
      {
        "vi": "Bao dam moi yeu cau deu co test bao phu va danh gia tac dong khi thay doi",
        "en": "Ensure every requirement is covered by tests and assess impact of changes",
        "ja": "各要求がテストで網羅され、変更の影響を評価できるようにする"
      },
      {
        "vi": "Loai bo hoan toan viec ra soat",
        "en": "Eliminate the need for reviews",
        "ja": "レビューの必要を完全に排除"
      },
      {
        "vi": "Do hieu nang he thong",
        "en": "Measure system performance",
        "ja": "システム性能の測定"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ma tran truy vet lien ket yeu cau voi test case, giup kiem tra do phu yeu cau va danh gia anh huong khi yeu cau thay doi (phan tich tac dong).",
      "en": "A traceability matrix links requirements to test cases, helping check requirement coverage and assess impact when requirements change (impact analysis).",
      "ja": "トレーサビリティマトリクスは要求とテストケースを結び、要求の網羅確認と要求変更時の影響評価（影響分析）に役立つ。"
    }
  },
  {
    "q": {
      "vi": "Doi phat trien tang toc do phat hanh voi CI/CD. Vai tro cua kiem thu tu dong trong duong ong (pipeline) la gi?",
      "en": "A team accelerates releases with CI/CD. What is the role of automated testing in the pipeline?",
      "ja": "チームがCI/CDでリリースを加速する。パイプラインにおける自動テストの役割は何か。"
    },
    "options": [
      {
        "vi": "Chi chay khi phat hanh chinh thuc moi nam mot lan",
        "en": "Runs only at a formal release once a year",
        "ja": "年一回の正式リリース時のみ実行"
      },
      {
        "vi": "Thay the hoan toan moi kiem thu thu cong va tham do",
        "en": "Fully replaces all manual and exploratory testing",
        "ja": "手動・探索的テストを完全に置き換える"
      },
      {
        "vi": "Chay tu dong khi co thay doi ma de phan hoi som ve chat luong (kiem thu hoi quy lien tuc)",
        "en": "Runs automatically on code changes to give early quality feedback (continuous regression)",
        "ja": "コード変更時に自動実行し早期に品質フィードバックを与える（継続的リグレッション）"
      },
      {
        "vi": "Chi de do hieu nang mang",
        "en": "Only measures network performance",
        "ja": "ネットワーク性能の測定のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong CI/CD, kiem thu tu dong chay moi khi ma thay doi, cung cap phan hoi som va lien tuc ve chat luong, ho tro kiem thu hoi quy nhanh; van can them kiem thu thu cong/tham do.",
      "en": "In CI/CD, automated tests run on each code change, providing early continuous quality feedback and fast regression; manual/exploratory testing is still needed.",
      "ja": "CI/CDでは自動テストがコード変更ごとに実行され、早期かつ継続的な品質フィードバックと高速リグレッションを提供する。手動・探索的テストも依然必要。"
    }
  },
  {
    "q": {
      "vi": "Bao cao khuyet tat (defect report) tot nen bao gom yeu to nao de lap trinh vien tai hien duoc loi?",
      "en": "A good defect report should include which element so a developer can reproduce the issue?",
      "ja": "良い欠陥レポートには、開発者が問題を再現できるようどの要素を含めるべきか。"
    },
    "options": [
      {
        "vi": "Y kien chu quan ve nang luc lap trinh vien",
        "en": "Subjective opinions about the developer's ability",
        "ja": "開発者の能力についての主観的意見"
      },
      {
        "vi": "Ngay sinh cua kiem thu vien",
        "en": "The tester's date of birth",
        "ja": "テスターの生年月日"
      },
      {
        "vi": "Chi ten cua nguoi bao loi",
        "en": "Only the name of the reporter",
        "ja": "報告者の名前のみ"
      },
      {
        "vi": "Cac buoc tai hien, ket qua thuc te va ket qua mong doi, moi truong kiem thu",
        "en": "Reproduction steps, actual vs expected results, and the test environment",
        "ja": "再現手順、実際の結果と期待結果、テスト環境"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Bao cao khuyet tat huu ich can buoc tai hien, ket qua thuc te va mong doi, moi truong/phien ban - giup phan tich va tai hien loi nhanh.",
      "en": "A useful defect report needs reproduction steps, actual and expected results, and environment/version - enabling quick analysis and reproduction.",
      "ja": "有用な欠陥レポートには再現手順、実際と期待の結果、環境／バージョンが必要で、迅速な分析と再現を可能にする。"
    }
  },
  {
    "q": {
      "vi": "Mot he thong ATM co chuyen trang thai: The-Vao roi Nhap-PIN. Neu nhap sai PIN 3 lan chuyen sang Khoa-The. Test 「nhap sai 1 lan roi nhap dung」 kiem tra dieu gi?",
      "en": "An ATM has state transitions: Card-Inserted then Enter-PIN. Three wrong PINs go to Card-Blocked. A test 'one wrong then correct PIN' checks what?",
      "ja": "ATMに状態遷移がある：カード挿入→PIN入力。誤PIN3回でカードロック。テスト「1回誤り後に正PIN」は何を確認するか。"
    },
    "options": [
      {
        "vi": "Chuyen trang thai hop le khi so lan sai chua vuot nguong (khong bi khoa, dang nhap thanh cong)",
        "en": "A valid transition when wrong attempts are below the threshold (not blocked, login succeeds)",
        "ja": "誤り回数がしきい値未満での有効遷移（ロックされず、ログイン成功）"
      },
      {
        "vi": "Hieu nang cua may ATM duoi tai cao",
        "en": "ATM performance under high load",
        "ja": "高負荷下のATM性能"
      },
      {
        "vi": "Do phu cau lenh cua ma nguon",
        "en": "Statement coverage of the source code",
        "ja": "ソースコードのステートメントカバレッジ"
      },
      {
        "vi": "Tinh de su dung cua man hinh cam ung",
        "en": "Usability of the touchscreen",
        "ja": "タッチ画面の使いやすさ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kich ban nay kiem tra chuyen trang thai hop le: sau 1 lan sai (chua toi 3), nhap dung se dang nhap thanh cong ma khong bi khoa the - dung logic dem va chuyen trang thai.",
      "en": "This scenario checks a valid transition: after 1 wrong (below 3), a correct PIN logs in without blocking - verifying the counter and transition logic.",
      "ja": "このシナリオは有効遷移を確認する：1回誤り（3未満）後に正PINでロックされずログインでき、カウンタと遷移ロジックを検証する。"
    }
  },
  {
    "q": {
      "vi": "Trong quan ly rui ro, 「rui ro san pham」 (product risk) va 「rui ro du an」 (project risk) khac nhau the nao?",
      "en": "In risk management, how do 'product risk' and 'project risk' differ?",
      "ja": "リスク管理において「プロダクトリスク」と「プロジェクトリスク」はどう異なるか。"
    },
    "options": [
      {
        "vi": "Ca hai la mot khai niem, khong khac biet",
        "en": "Both are the same concept, no difference",
        "ja": "両者は同一概念で違いはない"
      },
      {
        "vi": "Rui ro san pham lien quan chat luong doi tuong kiem thu; rui ro du an lien quan quan ly, tien do, nguon luc",
        "en": "Product risk concerns the quality of the test object; project risk concerns management, schedule, resources",
        "ja": "プロダクトリスクはテスト対象の品質、プロジェクトリスクは管理・スケジュール・リソースに関わる"
      },
      {
        "vi": "Rui ro san pham chi ve ngan sach; rui ro du an chi ve ma nguon",
        "en": "Product risk is only about budget; project risk is only about code",
        "ja": "プロダクトリスクは予算のみ、プロジェクトリスクはコードのみ"
      },
      {
        "vi": "Rui ro du an luon nghiem trong hon rui ro san pham",
        "en": "Project risk is always more severe than product risk",
        "ja": "プロジェクトリスクは常にプロダクトリスクより深刻"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Rui ro san pham anh huong chat luong san pham (loi, hieu nang kem...); rui ro du an anh huong kha nang dat muc tieu du an (tre han, thieu nguon luc, ky nang...).",
      "en": "Product risk affects product quality (defects, poor performance...); project risk affects the ability to meet project goals (delays, lack of resources, skills...).",
      "ja": "プロダクトリスクは製品品質（欠陥・低性能など）に、プロジェクトリスクはプロジェクト目標達成能力（遅延・リソース／スキル不足など）に影響する。"
    }
  }
];
