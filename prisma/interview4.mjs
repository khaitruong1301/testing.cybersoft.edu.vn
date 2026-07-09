// Interview MCQ - Bo bo sung 40 cau (4 nhom x 10 cau)
// cat: iv-manual | iv-automation | iv-playwright | iv-ai
export const DATA = [
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Sprint sap ket thuc, con nhieu test case chua chay xong. Ban nen uu tien theo cach nao?",
      "en": "The sprint is about to end and many test cases are still unexecuted. How should you prioritize?",
      "ja": "スプリントが終わりに近づき、未実行のテストケースが多く残っています。どう優先順位を付けますべきですか？"
    },
    "options": [
      {
        "vi": "Uu tien kiem thu dua tren rui ro va tac dong nghiep vu (risk-based)",
        "en": "Prioritize by risk and business impact (risk-based)",
        "ja": "リスクと業務への影響（リスクベース）で優先する"
      },
      {
        "vi": "Chay theo thu tu tu tren xuong duoi trong bo test case",
        "en": "Run them top to bottom in the test case list",
        "ja": "テストケース一覧を上から順に実行する"
      },
      {
        "vi": "Chi chay cac case da tung pass o sprint truoc",
        "en": "Only run cases that passed in previous sprints",
        "ja": "前スプリントで合格したケースだけを実行する"
      },
      {
        "vi": "Bo qua kiem thu va de dev tu kiem tra",
        "en": "Skip testing and let developers verify themselves",
        "ja": "テストを省略して開発者に確認を任せる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi thoi gian han che, kiem thu dua tren rui ro giup tap trung vao chuc nang co xac suat loi cao va tac dong nghiep vu lon nhat, bao ve gia tri cot loi cua san pham.",
      "en": "With limited time, risk-based testing focuses on features with the highest failure likelihood and business impact, protecting the product's core value.",
      "ja": "時間が限られる場合、リスクベーステストは障害の可能性が高く業務影響が大きい機能に集中し、製品の中核的価値を守ります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev bao khong tai hien duoc bug ban da bao cao. Ban nen lam gi truoc tien?",
      "en": "A developer says they cannot reproduce the bug you reported. What should you do first?",
      "ja": "報告したバグを開発者が再現できないと言っています。まず何をすべきですか？"
    },
    "options": [
      {
        "vi": "Dong bug lai vi co le no khong ton tai",
        "en": "Close the bug since it probably does not exist",
        "ja": "存在しないだろうとしてバグをクローズする"
      },
      {
        "vi": "Cung cap cac buoc tai hien chi tiet, moi truong, du lieu, log va anh/video",
        "en": "Provide detailed repro steps, environment, data, logs and screenshots/video",
        "ja": "詳細な再現手順・環境・データ・ログ・スクリーンショット/動画を提供する"
      },
      {
        "vi": "Yeu cau dev tu tim cach tai hien",
        "en": "Ask the developer to figure out reproduction themselves",
        "ja": "開発者に自力で再現方法を探させる"
      },
      {
        "vi": "Bao cao len quan ly rang dev khong hop tac",
        "en": "Report to management that the developer is uncooperative",
        "ja": "開発者が非協力的だと管理者に報告する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Bug khong tai hien thuong do thieu thong tin ve moi truong hoac du lieu. Cung cap buoc tai hien ro rang, cau hinh moi truong, log va bang chung truc quan giup dev thu hep nguyen nhan.",
      "en": "Non-reproducible bugs often stem from missing environment or data context. Clear steps, environment config, logs and visual evidence help the developer narrow the cause.",
      "ja": "再現できないバグは環境やデータの情報不足が原因のことが多いです。明確な手順・環境設定・ログ・視覚的証拠が原因の絞り込みを助けます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Ban nhan mot yeu cau mo ho: 'He thong phai phan hoi nhanh'. Cach xu ly dung dan la gi?",
      "en": "You receive a vague requirement: 'The system must respond quickly.' What is the right way to handle it?",
      "ja": "「システムは速く応答すること」という曖昧な要件を受け取りました。正しい対処は何ですか？"
    },
    "options": [
      {
        "vi": "Tu quyet dinh mot con so va kiem thu theo do",
        "en": "Decide a number yourself and test against it",
        "ja": "自分で数値を決めてそれでテストする"
      },
      {
        "vi": "Bo qua vi khong the kiem thu duoc",
        "en": "Skip it because it cannot be tested",
        "ja": "テストできないので無視する"
      },
      {
        "vi": "Lam ro voi BA/PO de co tieu chi do luong cu the (vi du thoi gian phan hoi)",
        "en": "Clarify with BA/PO to get measurable criteria (e.g., response time)",
        "ja": "BA/POと確認し、測定可能な基準（応答時間など）を得る"
      },
      {
        "vi": "Cho den khi khach hang phan nan roi moi test",
        "en": "Wait until the customer complains before testing",
        "ja": "顧客が苦情を言うまでテストを待つ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Yeu cau khong do luong duoc khong the kiem thu. Tester can lam ro de bien 'nhanh' thanh tieu chi cu the nhu 'phan hoi duoi 2 giay o 95% request'.",
      "en": "An unmeasurable requirement cannot be tested. The tester must clarify to turn 'quick' into concrete criteria like 'response under 2s for 95% of requests'.",
      "ja": "測定できない要件はテストできません。「速い」を「95%のリクエストで2秒以内」のような具体的基準に変える必要があります。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Mot loi khien nut 'Thanh toan' bi lech vai pixel tren mot trinh duyet hiem dung. Cach danh gia dung?",
      "en": "A defect shifts the 'Pay' button a few pixels on a rarely used browser. How to assess it correctly?",
      "ja": "ほとんど使われないブラウザで「支払う」ボタンが数ピクセルずれる不具合。正しい評価は？"
    },
    "options": [
      {
        "vi": "Severity cao va Priority cao vi lien quan thanh toan",
        "en": "High severity and high priority because it involves payment",
        "ja": "支払い関連なので重大度も優先度も高い"
      },
      {
        "vi": "Khong can ghi nhan vi khong phai loi chuc nang",
        "en": "No need to log it since it is not a functional bug",
        "ja": "機能バグではないので記録不要"
      },
      {
        "vi": "Severity cao nhung Priority thap vi mat du lieu",
        "en": "High severity but low priority due to data loss",
        "ja": "データ損失のため重大度高・優先度低"
      },
      {
        "vi": "Severity thap, Priority thap vi hien thi nho tren trinh duyet it dung",
        "en": "Low severity, low priority: minor cosmetic issue on a rare browser",
        "ja": "重大度低・優先度低：まれなブラウザの軽微な表示問題"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Severity phan anh muc do nghiem trong ky thuat; loi hien thi nho khong anh huong chuc nang nen severity thap. Priority phan anh do gap sua; tren trinh duyet hiem dung nen priority cung thap.",
      "en": "Severity reflects technical seriousness; a minor cosmetic glitch not affecting function is low. Priority reflects fix urgency; on a rare browser it is also low.",
      "ja": "重大度は技術的深刻さを表し、機能に影響しない軽微な表示は低い。優先度は修正の緊急度で、まれなブラウザなら低い。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Chi con nua ngay de regression truoc release lon. Chien luoc hop ly nhat?",
      "en": "Only half a day remains for regression before a major release. Most reasonable strategy?",
      "ja": "大型リリース前のリグレッションに半日しか残っていません。最も妥当な戦略は？"
    },
    "options": [
      {
        "vi": "Chay lai toan bo test case du khong kip",
        "en": "Re-run every test case even if it does not fit",
        "ja": "間に合わなくても全テストケースを再実行する"
      },
      {
        "vi": "Chi test lai vung vua sua ma bo qua vung lien quan",
        "en": "Only retest the changed area and ignore related areas",
        "ja": "変更箇所だけ再テストし関連箇所は無視する"
      },
      {
        "vi": "Khong regression, tin tuong build moi khong pha vo chuc nang cu",
        "en": "Skip regression, trust the new build did not break old features",
        "ja": "リグレッションを省き、新ビルドが既存機能を壊していないと信じる"
      },
      {
        "vi": "Chon tap test case cot loi va cac vung bi tac dong boi thay doi gan day",
        "en": "Select core test cases plus areas impacted by recent changes",
        "ja": "中核テストケースと最近の変更で影響を受ける領域を選ぶ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi thoi gian eo hep, chon loc regression (core flow + impact analysis cua thay doi) can bang do bao phu va rui ro tot hon la chay tat ca hoac chi test vung sua.",
      "en": "Under time pressure, selective regression (core flows + impact analysis of changes) balances coverage and risk better than running everything or only the fixed area.",
      "ja": "時間が限られる場合、選択的リグレッション（中核フロー＋変更の影響分析）が全実行や修正箇所のみより網羅とリスクのバランスに優れます。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Voi o nhap tuoi chap nhan 18 den 60, gia tri bien nao NEN duoc kiem thu?",
      "en": "For an age field accepting 18 to 60, which boundary values SHOULD be tested?",
      "ja": "18〜60を受け付ける年齢欄で、テストすべき境界値はどれですか？"
    },
    "options": [
      {
        "vi": "Chi 18 va 60",
        "en": "Only 18 and 60",
        "ja": "18と60のみ"
      },
      {
        "vi": "Chi 30 vi la gia tri trung binh",
        "en": "Only 30 as the average value",
        "ja": "平均値の30のみ"
      },
      {
        "vi": "17, 18, 60, 61 (ngay trong va ngoai bien)",
        "en": "17, 18, 60, 61 (just inside and outside the boundaries)",
        "ja": "17, 18, 60, 61（境界の内外）"
      },
      {
        "vi": "Chi cac so am de kiem tra loi",
        "en": "Only negative numbers to test errors",
        "ja": "エラー確認のため負の数のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phan tich gia tri bien kiem thu ngay trong va ngoai gioi han (17, 18, 60, 61) vi loi thuong xuat hien tai bien. Ket hop them lop tuong duong de bao phu day du.",
      "en": "Boundary value analysis tests just inside and outside the limits (17, 18, 60, 61) because defects cluster at boundaries. Combine with equivalence classes for full coverage.",
      "ja": "境界値分析は限界の内外（17, 18, 60, 61）をテストします。欠陥は境界に集中するためです。同値クラスと組み合わせて網羅します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Khi nao kiem thu tham do (exploratory testing) phat huy gia tri nhat?",
      "en": "When does exploratory testing add the most value?",
      "ja": "探索的テスト（エクスプロラトリーテスト）が最も価値を発揮するのはいつですか？"
    },
    "options": [
      {
        "vi": "Khi can bang chung tuan thu voi kich ban co dinh chi tiet",
        "en": "When strict, documented scripted evidence is required",
        "ja": "厳密で文書化された台本証拠が必要なとき"
      },
      {
        "vi": "Khi tinh nang moi, tai lieu it, can hoc nhanh va phat hien loi bat ngo",
        "en": "For new features with sparse docs, to learn fast and find unexpected defects",
        "ja": "新機能で文書が乏しく、速く学び予期せぬ欠陥を見つけたいとき"
      },
      {
        "vi": "Khi chi can chay lai chinh xac cac buoc cu",
        "en": "When only exact replay of old steps is needed",
        "ja": "古い手順を正確に再実行するだけでよいとき"
      },
      {
        "vi": "Khi hoan toan thay the cho tat ca kiem thu co ke hoach",
        "en": "As a full replacement for all planned testing",
        "ja": "計画的テストのすべてを完全に置き換えるとき"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiem thu tham do manh khi vua hoc vua thiet ke va thuc thi test song song, phu hop tinh nang moi hoac vung it tai lieu. No bo sung chu khong thay the kiem thu co ke hoach.",
      "en": "Exploratory testing shines when learning, designing and executing tests simultaneously, ideal for new or under-documented features. It complements, not replaces, scripted testing.",
      "ja": "探索的テストは学習・設計・実行を同時に行うときに強く、新機能や文書不足の領域に適します。台本テストを補完するもので置き換えではありません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Dev dong bug voi ly do 'khong phai loi, hoat dong dung thiet ke' nhung ban van nghi la loi. Nen lam gi?",
      "en": "A dev closes your bug as 'not a bug, works as designed' but you still think it is a defect. What to do?",
      "ja": "開発者が「バグではなく設計通り」としてクローズしたが、あなたは欠陥だと思う。どうすべきか？"
    },
    "options": [
      {
        "vi": "Doi chieu voi yeu cau/acceptance criteria, neu lech thi trao doi voi BA/PO de thong nhat",
        "en": "Check against requirements/acceptance criteria; if it deviates, align with BA/PO",
        "ja": "要件/受け入れ基準と照合し、逸脱があればBA/POと合意する"
      },
      {
        "vi": "Chap nhan dong vinh vien vi dev luon dung",
        "en": "Accept the closure permanently since devs are always right",
        "ja": "開発者は常に正しいので永久にクローズを受け入れる"
      },
      {
        "vi": "Mo lai bug ngay lap tuc va tranh cai tren ticket",
        "en": "Immediately reopen and argue on the ticket",
        "ja": "すぐに再オープンしてチケットで議論する"
      },
      {
        "vi": "Bao cao dev len cap tren",
        "en": "Escalate the developer to management",
        "ja": "開発者を上司に報告する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tranh chap 'la loi hay khong' can duoc giai quyet dua tren nguon su that: yeu cau va acceptance criteria. Neu mo ho, dua ba ben (Tester, Dev, BA/PO) thong nhat mong doi dung.",
      "en": "The 'is it a bug' dispute should be resolved against the source of truth: requirements and acceptance criteria. If ambiguous, bring Tester, Dev and BA/PO together to agree expected behavior.",
      "ja": "「バグか否か」の争いは真実の源である要件と受け入れ基準で解決すべきです。曖昧なら、テスター・開発・BA/POで期待動作を合意します。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Chi so nao phan anh TOT NHAT chat luong noi bo cua qua trinh kiem thu?",
      "en": "Which metric BEST reflects the internal quality of the testing process?",
      "ja": "テストプロセスの内部品質を最もよく表す指標はどれですか？"
    },
    "options": [
      {
        "vi": "Tong so test case da viet, bat ke ket qua",
        "en": "Total test cases written, regardless of outcome",
        "ja": "結果に関わらず書いたテストケース総数"
      },
      {
        "vi": "So gio tester ngoi tai ban lam viec",
        "en": "Hours testers sit at their desk",
        "ja": "テスターが机に座っている時間"
      },
      {
        "vi": "Defect leakage / ty le loi lot ra production sau khi da test",
        "en": "Defect leakage: bugs escaping to production after testing",
        "ja": "欠陥漏れ：テスト後に本番へ流出したバグ"
      },
      {
        "vi": "So luong email trao doi trong du an",
        "en": "Number of emails exchanged in the project",
        "ja": "プロジェクトで交わされたメール数"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Defect leakage (loi lot ra ngoai sau khi kiem thu) do luong truc tiep hieu qua phat hien loi cua qua trinh. So test case hay gio lam viec khong noi len chat luong that su.",
      "en": "Defect leakage directly measures how effectively the process catches bugs. Raw test case counts or hours worked do not indicate real quality.",
      "ja": "欠陥漏れはプロセスがバグを検出する有効性を直接測ります。テストケース数や作業時間は真の品質を示しません。"
    }
  },
  {
    "cat": "iv-manual",
    "q": {
      "vi": "Loi chi xuat hien tren production ma moi truong test khong tai hien duoc. Buoc dieu tra hop ly dau tien?",
      "en": "A bug only appears in production and cannot be reproduced in test. Reasonable first investigation step?",
      "ja": "本番のみで発生しテスト環境では再現できないバグ。最初の妥当な調査手順は？"
    },
    "options": [
      {
        "vi": "Ket luan la loi ao va bo qua",
        "en": "Conclude it is a phantom bug and ignore it",
        "ja": "幻のバグと結論し無視する"
      },
      {
        "vi": "Yeu cau nguoi dung ngung dung tinh nang do",
        "en": "Ask users to stop using that feature",
        "ja": "ユーザーにその機能の使用をやめるよう頼む"
      },
      {
        "vi": "Deploy thang ban va len production de test",
        "en": "Deploy your fix straight to production to test",
        "ja": "修正を直接本番へデプロイしてテストする"
      },
      {
        "vi": "So sanh cau hinh, du lieu va phien ban giua production va test",
        "en": "Compare config, data and versions between production and test",
        "ja": "本番とテストの設定・データ・バージョンを比較する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chenh lech giua production va test (du lieu that, cau hinh, phien ban, tai) thuong la nguyen nhan. So sanh cac yeu to nay giup thu hep va tai hien loi mot cach an toan.",
      "en": "Differences between production and test (real data, config, version, load) are common root causes. Comparing them helps narrow down and safely reproduce the bug.",
      "ja": "本番とテストの違い（実データ・設定・バージョン・負荷）が主因になりがちです。これらを比較すると原因を絞り安全に再現できます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Truong hop nao la ung vien TOT NHAT de tu dong hoa kiem thu?",
      "en": "Which case is the BEST candidate for test automation?",
      "ja": "テスト自動化に最も適した候補はどれですか？"
    },
    "options": [
      {
        "vi": "Test on dinh, lap lai nhieu lan, du lieu ro rang nhu smoke/regression",
        "en": "Stable, frequently repeated, deterministic tests like smoke/regression",
        "ja": "安定して頻繁に繰り返す決定的なテスト（スモーク/リグレッション）"
      },
      {
        "vi": "Kiem thu can danh gia tham my va cam quan chu quan",
        "en": "Tests needing subjective aesthetic judgment",
        "ja": "主観的な美的判断を要するテスト"
      },
      {
        "vi": "Test chi chay mot lan cho tinh nang sap bi loai bo",
        "en": "A one-off test for a feature about to be deprecated",
        "ja": "廃止予定機能の一度きりのテスト"
      },
      {
        "vi": "Tinh nang UI thay doi hang ngay",
        "en": "A UI feature changing every day",
        "ja": "毎日変わるUI機能"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tu dong hoa cho ROI cao nhat voi cac test on dinh, lap lai thuong xuyen, ket qua xac dinh (smoke, regression). Test chay mot lan hoac giao dien bien dong lien tuc kho duy tri va it loi.",
      "en": "Automation gives the best ROI on stable, frequently repeated, deterministic tests (smoke, regression). One-off tests or constantly shifting UIs are hard to maintain and low value.",
      "ja": "自動化は安定・高頻度・決定的なテスト（スモーク、リグレッション）で最良のROIを生みます。一度きりや頻繁に変わるUIは保守が難しく価値が低いです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Mot test tu dong khi pass khi fail du khong doi code. Nguyen nhan pho bien nhat va cach goi?",
      "en": "An automated test passes sometimes and fails other times with no code change. Most common cause and its name?",
      "ja": "コードを変えないのに合格したり失敗したりする自動テスト。最も一般的な原因とその呼び名は？"
    },
    "options": [
      {
        "vi": "Test hoan hao, khong can quan tam",
        "en": "A perfect test needing no attention",
        "ja": "完璧なテストで注意不要"
      },
      {
        "vi": "Test flaky, thuong do van de thoi gian cho/dong bo hoa hoac phu thuoc trang thai",
        "en": "A flaky test, usually from timing/sync or state dependency",
        "ja": "フレーキーテスト、通常はタイミング/同期や状態依存が原因"
      },
      {
        "vi": "Loi phan cung may chay test",
        "en": "A hardware fault on the runner",
        "ja": "実行機のハードウェア障害"
      },
      {
        "vi": "Loi cua nguoi viet requirement",
        "en": "A fault of the requirement author",
        "ja": "要件作成者の過失"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test cho ket qua khong on dinh goi la flaky, thuong do cho tinh (hard-coded sleep), dua tren du lieu chia se, hoac phu thuoc thu tu chay. Nen dung wait tuong minh va cach ly du lieu.",
      "en": "Inconsistent tests are called flaky, usually from fixed timing (hard-coded sleep), shared data, or run-order dependence. Use explicit waits and isolate test data.",
      "ja": "不安定なテストはフレーキーと呼ばれ、固定待機（ハードコードのsleep）、共有データ、実行順依存が原因です。明示的待機とデータ分離を使います。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Loi ich chinh cua mau Page Object Model (POM) la gi?",
      "en": "What is the main benefit of the Page Object Model (POM) pattern?",
      "ja": "ページオブジェクトモデル（POM）パターンの主な利点は何ですか？"
    },
    "options": [
      {
        "vi": "Lam test chay nhanh hon vai lan",
        "en": "Makes tests run several times faster",
        "ja": "テストを数倍速く実行する"
      },
      {
        "vi": "Loai bo hoan toan nhu cau viet assertion",
        "en": "Eliminates the need to write assertions",
        "ja": "アサーションを書く必要をなくす"
      },
      {
        "vi": "Tach locator va thao tac trang khoi kich ban test, giam trung lap va de bao tri",
        "en": "Separates locators and page actions from test logic, reducing duplication and easing maintenance",
        "ja": "ロケータとページ操作をテストロジックから分離し、重複を減らし保守を容易にする"
      },
      {
        "vi": "Tu dong sinh test case tu yeu cau",
        "en": "Auto-generates test cases from requirements",
        "ja": "要件からテストケースを自動生成する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "POM dong goi locator va hanh vi cua tung trang vao mot lop rieng. Khi UI thay doi, chi sua o mot noi thay vi nhieu test, giam trung lap va tang kha nang bao tri.",
      "en": "POM encapsulates each page's locators and behaviors in one class. When the UI changes, you fix one place instead of many tests, cutting duplication and boosting maintainability.",
      "ja": "POMは各ページのロケータと動作を1クラスにまとめます。UI変更時は多数のテストではなく1箇所を直せばよく、重複を減らし保守性を高めます。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Su khac biet cot loi giua explicit wait va implicit wait la gi?",
      "en": "What is the core difference between explicit and implicit waits?",
      "ja": "明示的待機と暗黙的待機の核心的な違いは何ですか？"
    },
    "options": [
      {
        "vi": "Explicit wait chi dung cho API testing",
        "en": "Explicit waits only work for API testing",
        "ja": "明示的待機はAPIテストにのみ使える"
      },
      {
        "vi": "Chung hoan toan giong nhau",
        "en": "They are identical",
        "ja": "両者は完全に同じ"
      },
      {
        "vi": "Implicit wait luon nhanh hon explicit wait",
        "en": "Implicit waits are always faster",
        "ja": "暗黙的待機は常に速い"
      },
      {
        "vi": "Explicit wait cho mot dieu kien cu the; implicit wait ap dung chung cho moi tim phan tu",
        "en": "Explicit waits for a specific condition; implicit applies globally to all element lookups",
        "ja": "明示的待機は特定条件を待ち、暗黙的待機は全要素検索に一律適用される"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Explicit wait cho den khi mot dieu kien cu the thoa (vi du phan tu click duoc), linh hoat va ro rang. Implicit wait dat mot thoi gian cho chung cho moi lan tim phan tu, kem chinh xac va co the che giau van de.",
      "en": "Explicit waits pause until a specific condition holds (e.g., element clickable), being precise. Implicit waits set a global timeout for every lookup, less precise and can mask problems.",
      "ja": "明示的待機は特定条件（要素がクリック可能など）まで待ち精密です。暗黙的待機は全検索に一律のタイムアウトを設定し、精度が低く問題を隠すことがあります。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Cach quan ly du lieu kiem thu nao giup bo test tu dong dang tin cay nhat?",
      "en": "Which test data approach makes an automated suite most reliable?",
      "ja": "自動テストスイートを最も信頼できるものにするテストデータ手法は？"
    },
    "options": [
      {
        "vi": "Dung chung mot ban ghi cho tat ca test",
        "en": "Share one record across all tests",
        "ja": "全テストで1つのレコードを共有する"
      },
      {
        "vi": "Hard-code ID co dinh vao moi test",
        "en": "Hard-code fixed IDs into every test",
        "ja": "各テストに固定IDをハードコードする"
      },
      {
        "vi": "Sua truc tiep tren du lieu production",
        "en": "Edit production data directly",
        "ja": "本番データを直接編集する"
      },
      {
        "vi": "Moi test tu tao va don dep du lieu rieng (data isolation, setup/teardown)",
        "en": "Each test creates and cleans its own data (isolation, setup/teardown)",
        "ja": "各テストが自分のデータを生成・後始末する（分離、setup/teardown）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cach ly du lieu (moi test tu setup va teardown du lieu can thiet) tranh phu thuoc lan nhau va side effect, giup test chay doc lap, on dinh va co the chay song song.",
      "en": "Data isolation (each test sets up and tears down its own data) avoids inter-test dependency and side effects, keeping tests independent, stable and parallelizable.",
      "ja": "データ分離（各テストが必要データをsetup/teardown）はテスト間依存や副作用を避け、独立・安定・並列実行可能にします。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Theo kim tu thap kiem thu (test pyramid), nen dau tu tu dong hoa nhieu nhat o dau?",
      "en": "According to the test pyramid, where should you invest most automation?",
      "ja": "テストピラミッドによれば、自動化に最も投資すべきはどこですか？"
    },
    "options": [
      {
        "vi": "Nhieu test UI end-to-end nhat",
        "en": "Mostly end-to-end UI tests",
        "ja": "大半をE2E UIテストに"
      },
      {
        "vi": "Chi test thu cong, khong tu dong",
        "en": "Only manual, no automation",
        "ja": "手動のみで自動化なし"
      },
      {
        "vi": "Nhieu unit test o day, it hon la integration/API, it nhat la UI E2E",
        "en": "Many unit tests at the base, fewer integration/API, fewest UI E2E",
        "ja": "土台に多くの単体テスト、中間に統合/API、頂点に少数のUI E2E"
      },
      {
        "vi": "Bang nhau o ca ba tang",
        "en": "Equal amounts across all three layers",
        "ja": "3層を均等に"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kim tu thap khuyen nhieu unit test (nhanh, re, on dinh) lam nen, it hon la API/integration, va rat it UI E2E (cham, de flaky). Cach nay toi uu toc do phan hoi va chi phi bao tri.",
      "en": "The pyramid favors many unit tests (fast, cheap, stable) at the base, fewer API/integration, and very few UI E2E (slow, flaky). This optimizes feedback speed and maintenance cost.",
      "ja": "ピラミッドは土台に多くの単体テスト（速く安価で安定）、中間にAPI/統合、頂点に少数のUI E2E（遅く不安定）を推奨します。フィードバック速度と保守コストを最適化します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Loai selector nao thuong BEN VUNG nhat truoc thay doi giao dien?",
      "en": "Which selector type is usually MOST resilient to UI changes?",
      "ja": "UI変更に対して通常最も堅牢なセレクタはどれですか？"
    },
    "options": [
      {
        "vi": "Duong XPath tuyet doi dai theo cau truc DOM",
        "en": "A long absolute XPath following the DOM structure",
        "ja": "DOM構造に沿った長い絶対XPath"
      },
      {
        "vi": "Thuoc tinh danh rieng cho test nhu data-testid",
        "en": "A dedicated test attribute like data-testid",
        "ja": "data-testidのようなテスト専用属性"
      },
      {
        "vi": "Chi so vi tri (phan tu thu 3)",
        "en": "A positional index (the 3rd element)",
        "ja": "位置インデックス（3番目の要素）"
      },
      {
        "vi": "Ten lop CSS tao ngau nhien khi build",
        "en": "Auto-generated CSS class hashes from the build",
        "ja": "ビルドで自動生成されるCSSクラスのハッシュ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thuoc tinh danh rieng cho test (data-testid) khong bi anh huong boi thay doi bo cuc, style hay noi dung, nen ben vung nhat. XPath tuyet doi, chi so vi tri va class hash rat de vo khi UI thay doi.",
      "en": "A dedicated test attribute (data-testid) is unaffected by layout, style or content changes, making it the most stable. Absolute XPath, positional indexes and hashed classes break easily.",
      "ja": "テスト専用属性（data-testid）はレイアウト・スタイル・内容の変更に影響されず最も安定します。絶対XPath・位置インデックス・ハッシュクラスは壊れやすいです。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Test B luon fail khi chay rieng nhung pass khi chay sau test A. Van de la gi?",
      "en": "Test B always fails alone but passes when run after test A. What is the problem?",
      "ja": "テストBは単独では失敗するが、テストAの後に実行すると合格する。問題は何ですか？"
    },
    "options": [
      {
        "vi": "Test B phu thuoc trang thai/du lieu do test A tao ra, vi pham tinh doc lap",
        "en": "Test B depends on state/data created by A, violating independence",
        "ja": "テストBはAが作った状態/データに依存し、独立性を破っている"
      },
      {
        "vi": "Test A dang lam hong test B mot cach co chu dich",
        "en": "Test A intentionally sabotages test B",
        "ja": "テストAが意図的にBを妨害している"
      },
      {
        "vi": "Day la hanh vi ly tuong nen giu nguyen",
        "en": "This is ideal behavior; keep it",
        "ja": "これは理想的な動作なので維持する"
      },
      {
        "vi": "Framework bi loi, doi framework khac",
        "en": "The framework is broken; switch frameworks",
        "ja": "フレームワークが壊れているので別のに変える"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test can doc lap. Neu B chi pass khi chay sau A, nghia la B phu thuoc du lieu/trang thai A tao ra. Sua bang cach cho B tu setup dieu kien tien de cua no.",
      "en": "Tests must be independent. If B only passes after A, B relies on state/data A produced. Fix it by having B set up its own preconditions.",
      "ja": "テストは独立すべきです。BがAの後だけ合格するなら、BはAが作った状態/データに依存しています。Bが自分の前提条件をsetupして修正します。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Mot kich ban tu dong hoa tot nen co dac diem nao sau day?",
      "en": "Which characteristic should a good automated test have?",
      "ja": "良い自動テストが持つべき特徴は次のうちどれですか？"
    },
    "options": [
      {
        "vi": "Phu thuoc thu tu chay va du lieu tu test khac",
        "en": "Depend on run order and data from other tests",
        "ja": "実行順や他テストのデータに依存する"
      },
      {
        "vi": "Chi in log ma khong co assertion nao",
        "en": "Only print logs with no assertions",
        "ja": "アサーションなしでログを出力するだけ"
      },
      {
        "vi": "Doc lap, lap lai duoc, co assertion ro rang va tu don dep sau khi chay",
        "en": "Independent, repeatable, with clear assertions and self-cleanup",
        "ja": "独立・再現可能で、明確なアサーションを持ち、実行後に自己クリーンアップする"
      },
      {
        "vi": "Cang dai va bao gom cang nhieu kich ban trong mot test cang tot",
        "en": "As long as possible, covering many scenarios in one test",
        "ja": "できるだけ長く、多くのシナリオを1つのテストに含める"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test tu dong tot phai doc lap (khong phu thuoc test khac), lap lai duoc, co assertion ro rang de biet pass/fail, va tu don dep du lieu. Test qua dai gom nhieu kich ban kho debug khi that bai.",
      "en": "A good automated test is independent (no reliance on other tests), repeatable, has clear assertions to define pass/fail, and cleans up its data. Overly long multi-scenario tests are hard to debug on failure.",
      "ja": "良い自動テストは独立（他テスト非依存）・再現可能で、合否を定める明確なアサーションを持ち、データを後始末します。多シナリオの長すぎるテストは失敗時のデバッグが困難です。"
    }
  },
  {
    "cat": "iv-automation",
    "q": {
      "vi": "Khi trinh bay ROI cua tu dong hoa cho quan ly, yeu to nao QUAN TRONG nhat can ke den?",
      "en": "When presenting automation ROI to management, which factor is MOST important to account for?",
      "ja": "自動化のROIを管理者に説明する際、最も考慮すべき要素は？"
    },
    "options": [
      {
        "vi": "Chi phi viet ban dau, bo qua chi phi bao tri",
        "en": "Only initial authoring cost, ignoring maintenance",
        "ja": "初期作成コストのみで保守を無視"
      },
      {
        "vi": "So framework tu dong hoa da dung",
        "en": "Number of automation frameworks used",
        "ja": "使った自動化フレームワークの数"
      },
      {
        "vi": "So dong code test da viet",
        "en": "Number of lines of test code written",
        "ja": "書いたテストコードの行数"
      },
      {
        "vi": "Ca chi phi xay dung, bao tri lien tuc va gia tri tu tan suat chay lai",
        "en": "Both build cost, ongoing maintenance and value from repeated execution",
        "ja": "構築コスト・継続的保守・繰り返し実行の価値の両方"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "ROI that su can can nhac ca chi phi xay dung, chi phi bao tri dai han (test hay thay doi) va loi ich tu viec chay lai nhieu lan. Bo qua bao tri se danh gia ROI qua lac quan.",
      "en": "True ROI weighs build cost, long-term maintenance (tests change often) and the value of running many times. Ignoring maintenance overstates the ROI.",
      "ja": "真のROIは構築コスト・長期保守（テストは頻繁に変わる）・多数回実行の価値を比較します。保守を無視するとROIを過大評価します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Co che 'auto-waiting' cua Playwright giup giai quyet van de gi?",
      "en": "What problem does Playwright's auto-waiting mechanism solve?",
      "ja": "Playwrightの自動待機（オートウェイティング）機構はどんな問題を解決しますか？"
    },
    "options": [
      {
        "vi": "Tu dong cho phan tu san sang (hien thi, on dinh, thao tac duoc) truoc khi hanh dong, giam flaky",
        "en": "Waits for elements to be ready (visible, stable, actionable) before acting, reducing flakiness",
        "ja": "操作前に要素が準備完了（表示・安定・操作可能）になるのを待ち、不安定さを減らす"
      },
      {
        "vi": "Tang toc do chay bang cach bo qua render",
        "en": "Speeds up runs by skipping rendering",
        "ja": "レンダリングを飛ばして実行を高速化する"
      },
      {
        "vi": "Tu dong sua loi trong code ung dung",
        "en": "Automatically fixes bugs in application code",
        "ja": "アプリのコードのバグを自動修正する"
      },
      {
        "vi": "Loai bo hoan toan nhu cau viet assertion",
        "en": "Removes the need for assertions entirely",
        "ja": "アサーションの必要を完全になくす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Truoc moi hanh dong, Playwright tu kiem tra phan tu da actionable (hien thi, on dinh, khong bi che, nhan duoc su kien). Nho do giam manh test flaky do timing ma khong can sleep thu cong.",
      "en": "Before each action Playwright checks the element is actionable (visible, stable, unobscured, receiving events). This sharply reduces timing-based flakiness without manual sleeps.",
      "ja": "各操作前にPlaywrightは要素が操作可能（表示・安定・非遮蔽・イベント受信可）か確認します。手動sleepなしでタイミング由来の不安定さを大きく減らします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Tai sao nen dung page.locator() thay vi cach lay phan tu tra ve ngay lap tuc?",
      "en": "Why prefer page.locator() over methods that return an element handle immediately?",
      "ja": "要素ハンドルを即返すメソッドより page.locator() を好むのはなぜですか？"
    },
    "options": [
      {
        "vi": "Locator lam trang tai nhanh hon",
        "en": "Locators load the page faster",
        "ja": "ロケータはページ読み込みを速くする"
      },
      {
        "vi": "Locator lazy, tim lai phan tu moi lan dung nen chiu duoc DOM thay doi",
        "en": "Locators are lazy, re-resolving on each use so they tolerate DOM changes",
        "ja": "ロケータは遅延評価で使うたびに再解決し、DOM変化に強い"
      },
      {
        "vi": "Locator khong can selector",
        "en": "Locators need no selector",
        "ja": "ロケータはセレクタ不要"
      },
      {
        "vi": "Locator chay khong can trinh duyet",
        "en": "Locators run without a browser",
        "ja": "ロケータはブラウザなしで動く"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Locator la mo ta lazy: no giai quyet phan tu tai thoi diem hanh dong/assertion, ket hop auto-wait. Nho vay khong bi stale reference khi DOM re-render, on dinh hon element handle bat ngay.",
      "en": "A locator is a lazy description resolved at the moment of action/assertion, combined with auto-wait. It avoids stale references when the DOM re-renders, more robust than an immediately captured handle.",
      "ja": "ロケータは遅延記述で、操作/アサーション時に解決され自動待機と結合します。DOM再描画時の陳腐化参照を避け、即取得ハンドルより堅牢です。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Trace Viewer cua Playwright huu ich nhat trong tinh huong nao?",
      "en": "In which situation is Playwright's Trace Viewer most useful?",
      "ja": "PlaywrightのTrace Viewerが最も役立つのはどんな場面ですか？"
    },
    "options": [
      {
        "vi": "Viet requirement cho tinh nang moi",
        "en": "Writing requirements for a new feature",
        "ja": "新機能の要件を書くとき"
      },
      {
        "vi": "Tang so worker chay song song",
        "en": "Increasing the number of parallel workers",
        "ja": "並列ワーカー数を増やすとき"
      },
      {
        "vi": "Dieu tra test that bai trong CI bang timeline, snapshot DOM, network va log",
        "en": "Investigating a CI test failure via timeline, DOM snapshots, network and logs",
        "ja": "CIでの失敗をタイムライン・DOMスナップショット・ネットワーク・ログで調査するとき"
      },
      {
        "vi": "Tu dong viet locator moi",
        "en": "Auto-writing new locators",
        "ja": "新しいロケータを自動作成するとき"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trace Viewer ghi lai timeline hanh dong, anh chup DOM truoc/sau, request mang, console va source. Rat manh de debug loi CI khong tai hien duoc cuc bo (thu bang cach bat trace on-first-retry).",
      "en": "Trace Viewer captures an action timeline, before/after DOM snapshots, network, console and source. It is ideal for debugging CI failures that do not reproduce locally (enable trace on-first-retry).",
      "ja": "Trace Viewerは操作タイムライン、前後のDOMスナップショット、ネットワーク、コンソール、ソースを記録します。ローカルで再現しないCI失敗のデバッグに最適です（on-first-retryで有効化）。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Playwright chay song song mac dinh o cap do nao?",
      "en": "At what level does Playwright parallelize by default?",
      "ja": "Playwrightはデフォルトでどの単位で並列化しますか？"
    },
    "options": [
      {
        "vi": "Song song o cap tung cau assertion",
        "en": "Parallel per individual assertion",
        "ja": "アサーション単位で並列"
      },
      {
        "vi": "Song song moi dong log",
        "en": "Parallel per log line",
        "ja": "ログ行単位で並列"
      },
      {
        "vi": "Khong bao gio chay song song",
        "en": "It never runs in parallel",
        "ja": "決して並列実行しない"
      },
      {
        "vi": "Song song giua cac tep test qua nhieu worker; trong mot tep chay tuan tu",
        "en": "Parallel across test files via workers; sequential within a file",
        "ja": "ワーカーによるテストファイル間の並列。ファイル内は逐次"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mac dinh Playwright chia cac tep test cho nhieu worker process chay song song, con cac test trong cung mot tep chay tuan tu (tru khi bat fullyParallel). Vi vay can giu cac tep doc lap nhau.",
      "en": "By default Playwright distributes test files across worker processes running in parallel, while tests within a file run sequentially (unless fullyParallel is set). So keep files independent.",
      "ja": "デフォルトでPlaywrightはテストファイルを並列実行するワーカープロセスに分配し、同一ファイル内は逐次実行します（fullyParallel設定時を除く）。ファイル同士は独立に保ちます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Fixtures trong Playwright Test duoc dung chinh de lam gi?",
      "en": "What are fixtures in Playwright Test primarily used for?",
      "ja": "Playwright Testのフィクスチャは主に何に使いますか？"
    },
    "options": [
      {
        "vi": "Chi de tang toc do trinh duyet",
        "en": "Only to speed up the browser",
        "ja": "ブラウザを速くするためだけ"
      },
      {
        "vi": "Bien test thanh khong can trinh duyet",
        "en": "Make tests run without a browser",
        "ja": "テストをブラウザなしで動かす"
      },
      {
        "vi": "Thay the hoan toan assertion",
        "en": "Fully replace assertions",
        "ja": "アサーションを完全に置き換える"
      },
      {
        "vi": "Cung cap va cach ly moi truong/tai nguyen cho test (page, context, du lieu dang nhap...) voi setup/teardown",
        "en": "Provide and isolate per-test environment/resources (page, context, login data...) with setup/teardown",
        "ja": "テストごとの環境/リソース（page, context, ログイン情報…）をsetup/teardown付きで提供・分離する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Fixtures cung cap tai nguyen da thiet lap san (page, context, du lieu, trang thai dang nhap) cho tung test mot cach cach ly, kem setup/teardown tu dong. Chung giup test gon, doc lap va tai su dung logic chuan bi.",
      "en": "Fixtures supply pre-set resources (page, context, data, auth state) to each test in isolation with automatic setup/teardown. They keep tests concise, independent and reuse preparation logic.",
      "ja": "フィクスチャは各テストに準備済みリソース（page, context, データ, 認証状態）を分離して提供し、自動でsetup/teardownします。テストを簡潔・独立にし準備ロジックを再利用します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Vi sao expect(locator).toBeVisible() duoc goi la web-first assertion?",
      "en": "Why is expect(locator).toBeVisible() called a web-first assertion?",
      "ja": "expect(locator).toBeVisible() が「ウェブファーストアサーション」と呼ばれるのはなぜですか？"
    },
    "options": [
      {
        "vi": "Vi no chi chay tren trang chu web",
        "en": "Because it only runs on a website homepage",
        "ja": "ウェブのトップページでしか動かないから"
      },
      {
        "vi": "Vi no khong can locator",
        "en": "Because it needs no locator",
        "ja": "ロケータが不要だから"
      },
      {
        "vi": "Vi no tu dong thu lai (retry) den khi dieu kien dung hoac het timeout, phu hop UI bat dong bo",
        "en": "Because it auto-retries until the condition holds or times out, fitting async UIs",
        "ja": "条件が満たされるかタイムアウトまで自動リトライし、非同期UIに適するから"
      },
      {
        "vi": "Vi no chi kiem tra mot lan roi that bai ngay",
        "en": "Because it checks once then fails immediately",
        "ja": "一度だけ確認してすぐ失敗するから"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Web-first assertion tu dong poll lai dieu kien trong khoang timeout, chho UI cap nhat bat dong bo (goi API, animation). Nho vay tranh phai them wait thu cong va giam flaky.",
      "en": "A web-first assertion auto-polls the condition within a timeout, waiting for async UI updates (API calls, animations). This avoids manual waits and reduces flakiness.",
      "ja": "ウェブファーストアサーションはタイムアウト内で条件を自動ポーリングし、非同期UI更新（API呼び出し、アニメ）を待ちます。手動待機を避け不安定さを減らします。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Buoc nao THUONG can thiet de Playwright chay duoc tren mot CI runner sach?",
      "en": "Which step is TYPICALLY required to run Playwright on a clean CI runner?",
      "ja": "クリーンなCIランナーでPlaywrightを動かすため通常必要な手順は？"
    },
    "options": [
      {
        "vi": "Tat che do headless de xem giao dien",
        "en": "Disable headless mode to view the UI",
        "ja": "UIを見るためヘッドレスを無効にする"
      },
      {
        "vi": "Cai trinh duyet va cac phu thuoc he thong, vi du npx playwright install --with-deps",
        "en": "Install browsers and system dependencies, e.g. npx playwright install --with-deps",
        "ja": "ブラウザとシステム依存をインストール、例：npx playwright install --with-deps"
      },
      {
        "vi": "Chay tren may that co man hinh vat ly",
        "en": "Run on a physical machine with a real monitor",
        "ja": "実モニタ付きの物理マシンで実行する"
      },
      {
        "vi": "Vo hieu hoa toan bo retry",
        "en": "Disable all retries",
        "ja": "すべてのリトライを無効にする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tren CI runner sach chua co san binary trinh duyet, can cai bang npx playwright install (them --with-deps de cai thu vien he thong). Che do headless la mac dinh va phu hop CI.",
      "en": "A clean CI runner lacks browser binaries, so install them with npx playwright install (add --with-deps for system libraries). Headless mode is the default and suits CI.",
      "ja": "クリーンなCIランナーにはブラウザバイナリがないため、npx playwright install（システムライブラリ用に --with-deps）でインストールします。ヘッドレスが既定でCIに適します。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "test.step() duoc dung de lam gi trong Playwright?",
      "en": "What is test.step() used for in Playwright?",
      "ja": "Playwrightの test.step() は何に使いますか？"
    },
    "options": [
      {
        "vi": "Nhom cac hanh dong thanh buoc co ten de bao cao va trace ro rang hon",
        "en": "Group actions into named steps for clearer reporting and traces",
        "ja": "操作を名前付きステップにまとめ、レポートとトレースを見やすくする"
      },
      {
        "vi": "Chay test o buoc rieng biet tren nhieu may",
        "en": "Run the test as a separate step on many machines",
        "ja": "テストを複数マシンで別ステップとして実行する"
      },
      {
        "vi": "Tang timeout cho toan bo test",
        "en": "Increase the timeout for the whole test",
        "ja": "テスト全体のタイムアウトを増やす"
      },
      {
        "vi": "Bo qua mot buoc khong can thiet",
        "en": "Skip an unnecessary step",
        "ja": "不要なステップを飛ばす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "test.step() gom mot chuoi hanh dong vao mot buoc co ten, hien thi ro rang trong bao cao va Trace Viewer. Dieu nay giup doc ket qua va debug de hon, dac biet voi kich ban dai.",
      "en": "test.step() bundles a series of actions into a named step, shown clearly in reports and Trace Viewer. This makes results easier to read and debug, especially for long scenarios.",
      "ja": "test.step() は一連の操作を名前付きステップにまとめ、レポートとTrace Viewerで明確に表示します。長いシナリオの結果確認やデバッグが容易になります。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cach hieu qua de tranh dang nhap lai qua UI trong moi test la gi?",
      "en": "What is an efficient way to avoid logging in through the UI in every test?",
      "ja": "各テストでUIから毎回ログインするのを避ける効率的な方法は？"
    },
    "options": [
      {
        "vi": "Dang nhap thu cong truoc moi lan chay",
        "en": "Log in manually before each run",
        "ja": "各実行前に手動でログインする"
      },
      {
        "vi": "Tat xac thuc tren production",
        "en": "Disable authentication on production",
        "ja": "本番の認証を無効にする"
      },
      {
        "vi": "Luu storageState sau khi dang nhap mot lan roi tai lai cho cac test khac",
        "en": "Save storageState after logging in once and reuse it for other tests",
        "ja": "一度ログイン後にstorageStateを保存し他テストで再利用する"
      },
      {
        "vi": "Hard-code cookie phien vao tung test",
        "en": "Hard-code the session cookie into each test",
        "ja": "各テストにセッションクッキーをハードコードする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Playwright cho phep luu trang thai dang nhap (cookie, localStorage) vao storageState sau mot lan setup, roi nap lai cho cac test khac. Cach nay nhanh, on dinh va tranh lap lai flow dang nhap qua UI.",
      "en": "Playwright can save login state (cookies, localStorage) to storageState after one setup, then load it for other tests. This is fast, stable and avoids repeating the UI login flow.",
      "ja": "Playwrightは一度のsetup後にログイン状態（クッキー、localStorage）をstorageStateに保存し、他テストで読み込めます。速く安定し、UIログインの繰り返しを避けます。"
    }
  },
  {
    "cat": "iv-playwright",
    "q": {
      "vi": "Cau hinh retries tren CI nen duoc nhin nhan the nao cho dung?",
      "en": "How should the retries config on CI be viewed correctly?",
      "ja": "CIでのretries設定はどう正しく捉えるべきですか？"
    },
    "options": [
      {
        "vi": "La cach hoan hao de che moi loi that su cua san pham",
        "en": "A perfect way to hide all real product bugs",
        "ja": "製品の本当のバグをすべて隠す完璧な方法"
      },
      {
        "vi": "Khong bao gio nen dung tren CI",
        "en": "Should never be used on CI",
        "ja": "CIでは決して使うべきでない"
      },
      {
        "vi": "Nen dat retries cang cao cang tot",
        "en": "Set retries as high as possible",
        "ja": "retriesはできるだけ高く設定すべき"
      },
      {
        "vi": "Giup giam nhieu do flaky nhung khong nen dung de che giau test flaky can sua tan goc",
        "en": "Helps reduce flaky noise but should not mask flaky tests that need real fixing",
        "ja": "フレーキーなノイズを減らすが、根本修正が必要な不安定テストを隠すべきではない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Retries tren CI giam nhieu tam thoi tu su co ha tang, nhung neu lam la vinh vien che giau test flaky se tich luy no ky thuat. Ket hop retry voi trace/report de tim va sua nguyen nhan goc.",
      "en": "CI retries reduce transient infra noise, but if used permanently to hide flaky tests they accumulate technical debt. Pair retries with trace/reports to find and fix root causes.",
      "ja": "CIのretriesは一時的なインフラノイズを減らしますが、不安定テストを恒久的に隠すと技術的負債が溜まります。retriesはトレース/レポートと併用し根本原因を特定・修正します。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Rui ro chinh khi dung AI de sinh test case tu yeu cau la gi?",
      "en": "What is the main risk of using AI to generate test cases from requirements?",
      "ja": "要件からテストケースをAIで生成する際の主なリスクは何ですか？"
    },
    "options": [
      {
        "vi": "AI co the bia dieu kien khong co that (hallucination) hoac bo sot ca bien nghiep vu, can nguoi ra soat",
        "en": "AI may hallucinate non-existent conditions or miss business edge cases, requiring human review",
        "ja": "AIは存在しない条件を捏造（ハルシネーション）したり業務エッジケースを見落とすことがあり、人のレビューが必要"
      },
      {
        "vi": "AI luon sinh test case hoan hao khong can kiem tra",
        "en": "AI always produces flawless test cases needing no review",
        "ja": "AIは常に完璧なテストケースを生成し確認不要"
      },
      {
        "vi": "AI khong the doc duoc van ban yeu cau",
        "en": "AI cannot read requirement text at all",
        "ja": "AIは要件テキストを全く読めない"
      },
      {
        "vi": "AI chi sinh duoc mot test case duy nhat",
        "en": "AI can only generate a single test case",
        "ja": "AIは1つのテストケースしか生成できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "AI co the tao ra dieu kien khong ton tai (hallucination) hoac bo qua ngu canh nghiep vu dac thu. Vi vay dau ra can duoc tester co kien thuc mien tham dinh truoc khi dua vao su dung.",
      "en": "AI can invent non-existent conditions (hallucination) or miss domain-specific business context. So its output must be validated by a tester with domain knowledge before use.",
      "ja": "AIは存在しない条件を作り出したり（ハルシネーション）、固有の業務文脈を見落とすことがあります。出力はドメイン知識を持つテスターの検証が必要です。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Self-healing locator do AI ho tro hoat dong theo nguyen ly nao?",
      "en": "How do AI-assisted self-healing locators work in principle?",
      "ja": "AI支援のセルフヒーリングロケータは原理的にどう動きますか？"
    },
    "options": [
      {
        "vi": "Tu viet lai toan bo ma nguon ung dung",
        "en": "They rewrite the entire application source",
        "ja": "アプリのソース全体を書き換える"
      },
      {
        "vi": "Khi locator cu hong, dung nhieu thuoc tinh/ngu canh de suy ra phan tu dung thay the",
        "en": "When an old locator breaks, they use multiple attributes/context to infer the correct element",
        "ja": "旧ロケータが壊れると、複数の属性/文脈から正しい要素を推測する"
      },
      {
        "vi": "Chung ngan chan moi thay doi UI",
        "en": "They prevent any UI change from happening",
        "ja": "あらゆるUI変更を防ぐ"
      },
      {
        "vi": "Chung xoa cac test bi hong",
        "en": "They delete broken tests",
        "ja": "壊れたテストを削除する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Self-healing locator luu nhieu dac trung cua phan tu (thuoc tinh, van ban, vi tri, ngu canh). Khi selector chinh hong, no dung cac dac trung con lai de tim phan tu tuong dong nhat va tu sua tham chieu.",
      "en": "Self-healing locators store multiple element features (attributes, text, position, context). When the primary selector breaks, they use the remaining features to find the closest match and repair the reference.",
      "ja": "セルフヒーリングロケータは要素の複数特徴（属性・テキスト・位置・文脈）を保持します。主セレクタが壊れると残る特徴で最も近い要素を見つけ参照を自己修復します。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Loi ich chinh khi dung AI de sinh du lieu kiem thu la gi?",
      "en": "What is the main benefit of using AI to generate test data?",
      "ja": "テストデータ生成にAIを使う主な利点は何ですか？"
    },
    "options": [
      {
        "vi": "Loai bo nhu cau co moi truong test",
        "en": "Removes the need for any test environment",
        "ja": "テスト環境の必要をなくす"
      },
      {
        "vi": "Bao dam du lieu luon dung 100% ma khong can kiem tra",
        "en": "Guarantees data is always 100% correct without checking",
        "ja": "確認なしでデータが常に100%正しいと保証する"
      },
      {
        "vi": "Nhanh tao khoi luong lon du lieu da dang, hop le va cac truong hop bien phong phu",
        "en": "Quickly produces large, varied, realistic data and rich edge cases",
        "ja": "大量で多様かつ現実的なデータと豊富なエッジケースを素早く生成する"
      },
      {
        "vi": "Thay the hoan toan viec thiet ke test",
        "en": "Fully replaces test design",
        "ja": "テスト設計を完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "AI giup sinh nhanh du lieu da dang, sat thuc te va nhieu truong hop bien kho nghi ra thu cong. Tuy vay van can kiem tra tinh hop le va tuan thu quy dinh (vi du du lieu ca nhan).",
      "en": "AI rapidly generates varied, realistic data and many edge cases hard to think of manually. Still, validity and compliance (e.g., personal data) must be verified.",
      "ja": "AIは多様で現実的なデータや手動では思いつきにくいエッジケースを素早く生成します。ただし妥当性やコンプライアンス（個人データなど）の検証は必要です。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Vi sao ket qua AI trong kiem thu van can con nguoi ra soat?",
      "en": "Why do AI outputs in testing still need human review?",
      "ja": "テストにおけるAIの出力に人のレビューがなお必要なのはなぜですか？"
    },
    "options": [
      {
        "vi": "Vi AI khong the tao ra bat ky noi dung nao",
        "en": "Because AI cannot produce any content",
        "ja": "AIは何のコンテンツも生成できないから"
      },
      {
        "vi": "Vi AI khong duoc phep truy cap internet",
        "en": "Because AI is never allowed internet access",
        "ja": "AIはインターネットに接続できないから"
      },
      {
        "vi": "Vi AI chay qua cham",
        "en": "Because AI runs too slowly",
        "ja": "AIの実行が遅すぎるから"
      },
      {
        "vi": "Vi AI co the sai, thieu ngu canh nghiep vu va khong chiu trach nhiem cuoi cung ve chat luong",
        "en": "Because AI can be wrong, lack business context, and is not accountable for final quality",
        "ja": "AIは誤り得て業務文脈を欠き、品質の最終責任を負わないから"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "AI la cong cu ho tro: no co the sinh noi dung sai, thieu hieu biet mien va khong chiu trach nhiem phap ly/chat luong. Con nguoi giu vai tro tham dinh, phe duyet va chiu trach nhiem cuoi cung.",
      "en": "AI is an assistant: it can output errors, lack domain understanding and bears no legal/quality accountability. Humans remain responsible for validating, approving and owning final quality.",
      "ja": "AIは補助ツールで、誤出力し得てドメイン理解を欠き、法的/品質責任を負いません。人が検証・承認し最終品質の責任を持ちます。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "AI trong kiem thu truc quan (visual testing) giup ich the nao so voi so sanh pixel thuan tuy?",
      "en": "How does AI in visual testing help compared to pure pixel comparison?",
      "ja": "ビジュアルテストのAIは純粋なピクセル比較と比べどう役立ちます？"
    },
    "options": [
      {
        "vi": "Bao moi khac biet du chi mot pixel de tester tu quyet",
        "en": "Flags every single-pixel diff for the tester to judge",
        "ja": "1ピクセルの差も全て報告してテスターに判断させる"
      },
      {
        "vi": "Xoa moi khac biet khoi bao cao",
        "en": "Removes all differences from the report",
        "ja": "レポートから全ての差を削除する"
      },
      {
        "vi": "Lam cho anh chup man hinh net hon",
        "en": "Makes screenshots sharper",
        "ja": "スクリーンショットを鮮明にする"
      },
      {
        "vi": "Phan biet thay doi co nghia voi khac biet vo hai (anti-aliasing, render nho), giam bao dong gia",
        "en": "Distinguishes meaningful changes from harmless diffs (anti-aliasing, minor rendering), cutting false positives",
        "ja": "意味ある変化と無害な差（アンチエイリアス、微細な描画）を区別し誤検知を減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "So sanh pixel thuan tuy bao ca nhung khac biet vo hai (anti-aliasing, dich chuyen nho) gay nhieu bao dong gia. AI/visual thong minh nhan biet thay doi co y nghia voi con nguoi, giam nhieu va tang do tin cay.",
      "en": "Pure pixel comparison flags harmless diffs (anti-aliasing, small shifts), causing false positives. Smart AI/visual detection recognizes changes meaningful to humans, reducing noise and raising reliability.",
      "ja": "純粋なピクセル比較は無害な差（アンチエイリアス、微小なずれ）も報告し誤検知を生みます。賢いAI/ビジュアル検出は人にとって意味ある変化を認識し、ノイズを減らし信頼性を高めます。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "De AI sinh test case huu ich, prompt nen nhu the nao?",
      "en": "To get useful test cases from AI, how should the prompt be?",
      "ja": "AIから有用なテストケースを得るには、プロンプトはどうあるべきですか？"
    },
    "options": [
      {
        "vi": "Cang mo ho va ngan cang tot",
        "en": "As vague and short as possible",
        "ja": "できるだけ曖昧で短い方がよい"
      },
      {
        "vi": "Chi ghi mot tu khoa duy nhat",
        "en": "Just a single keyword",
        "ja": "単一のキーワードだけ"
      },
      {
        "vi": "Cu the ve chuc nang, quy tac nghiep vu, du lieu, dieu kien bien va dinh dang mong muon",
        "en": "Specific about the feature, business rules, data, boundary conditions and desired format",
        "ja": "機能・業務ルール・データ・境界条件・希望フォーマットを具体的に"
      },
      {
        "vi": "Yeu cau AI tu doan het moi thu ma khong cung cap ngu canh",
        "en": "Ask AI to guess everything with no context",
        "ja": "文脈なしで全てをAIに推測させる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Prompt cang cu the (mo ta chuc nang, quy tac nghiep vu, kieu du lieu, dieu kien bien, dinh dang dau ra) thi AI cang sinh test case sat va it hallucination. Ngu canh ro rang la chia khoa.",
      "en": "The more specific the prompt (feature, business rules, data types, boundary conditions, output format), the more relevant AI's test cases and the less it hallucinates. Clear context is key.",
      "ja": "プロンプトが具体的（機能・業務ルール・データ型・境界条件・出力形式）なほど、AIのテストケースは的確でハルシネーションが減ります。明確な文脈が鍵です。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "AI co the ho tro xu ly test flaky bang cach nao?",
      "en": "How can AI help deal with flaky tests?",
      "ja": "AIはフレーキーテストの対処をどう支援できますか？"
    },
    "options": [
      {
        "vi": "Bang cach xoa het test flaky ngay",
        "en": "By deleting all flaky tests immediately",
        "ja": "フレーキーテストを即座に全削除する"
      },
      {
        "vi": "Phan tich lich su chay de phat hien mau bat on dinh va goi y nguyen nhan can dieu tra",
        "en": "Analyzing run history to detect instability patterns and suggest causes to investigate",
        "ja": "実行履歴を分析して不安定パターンを検出し、調査すべき原因を示唆する"
      },
      {
        "vi": "Bang cach lam test luon pass",
        "en": "By forcing tests to always pass",
        "ja": "テストを常に合格させる"
      },
      {
        "vi": "Bang cach tat toan bo CI",
        "en": "By turning off the entire CI",
        "ja": "CI全体を無効にする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "AI co the doc lich su ket qua chay, nhan dien test hay dao ket qua va goi y nguyen nhan (timing, du lieu, phu thuoc). Day la ho tro chan doan, quyet dinh sua tan goc van thuoc ve con nguoi.",
      "en": "AI can read run-result history, spot tests that flip results, and suggest causes (timing, data, dependencies). It aids diagnosis; the decision to fix root causes still belongs to humans.",
      "ja": "AIは実行結果の履歴を読み、結果が揺れるテストを特定し原因（タイミング・データ・依存）を示唆できます。診断支援であり、根本修正の判断は人が担います。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Han che nao ro rang khi AI kiem thu he thong co logic nghiep vu dac thu?",
      "en": "What clear limitation does AI have when testing systems with specialized business logic?",
      "ja": "特殊な業務ロジックを持つシステムをAIがテストする際の明確な限界は？"
    },
    "options": [
      {
        "vi": "AI thieu tri thuc mien va ngu canh dac thu doanh nghiep khong co trong du lieu huan luyen",
        "en": "AI lacks domain knowledge and enterprise-specific context absent from its training data",
        "ja": "AIは学習データにない業務知識や企業固有の文脈を欠く"
      },
      {
        "vi": "AI hieu moi quy tac noi bo doc quyen ma khong can cung cap",
        "en": "AI understands every proprietary internal rule without being told",
        "ja": "AIは伝えずとも独自の内部ルールを全て理解する"
      },
      {
        "vi": "AI khong the tao ra van ban",
        "en": "AI cannot produce text",
        "ja": "AIはテキストを生成できない"
      },
      {
        "vi": "AI chi lam viec bang mot ngon ngu",
        "en": "AI works in only one language",
        "ja": "AIは1言語でしか動かない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Quy tac nghiep vu dac thu (chinh sach gia, quy dinh nganh, luong phe duyet noi bo) thuong khong co trong du lieu huan luyen. AI se doan sai neu khong duoc cung cap ro. Tester mien phai bo sung ngu canh nay.",
      "en": "Specialized business rules (pricing policy, industry regulations, internal approval flows) are usually absent from training data. AI will guess wrong unless given them explicitly. Domain testers must supply this context.",
      "ja": "特殊な業務ルール（価格ポリシー、業界規制、内部承認フロー）は通常学習データにありません。明示しなければAIは誤推測します。ドメインテスターがこの文脈を補う必要があります。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "AI ho tro bao tri bo test tu dong theo cach nao la thuc te nhat?",
      "en": "In what way does AI most realistically help maintain automated test suites?",
      "ja": "AIが自動テストスイートの保守を最も現実的に支援するのはどんな方法ですか？"
    },
    "options": [
      {
        "vi": "Loai bo hoan toan nhu cau bao tri mai mai",
        "en": "Eliminates the need for maintenance forever",
        "ja": "保守の必要を永久になくす"
      },
      {
        "vi": "Tu dong xoa moi test that bai",
        "en": "Automatically deletes every failing test",
        "ja": "失敗するテストを全て自動削除する"
      },
      {
        "vi": "Goi y cap nhat locator, phat hien test lac hau va de xuat cai thien de con nguoi duyet",
        "en": "Suggests locator updates, detects outdated tests and proposes improvements for humans to approve",
        "ja": "ロケータ更新を提案し、古いテストを検出し、人が承認する改善案を出す"
      },
      {
        "vi": "Ngan UI khong bao gio thay doi",
        "en": "Prevents the UI from ever changing",
        "ja": "UIが決して変わらないようにする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "AI giup bao tri bang cach de xuat cap nhat locator khi UI doi, phat hien test loi thoi va goi y refactor. Day la de xuat can con nguoi duyet, khong phai thay the hoan toan cong viec bao tri.",
      "en": "AI aids maintenance by suggesting locator updates when the UI changes, flagging obsolete tests and proposing refactors. These are suggestions needing human approval, not a full replacement for maintenance work.",
      "ja": "AIはUI変更時のロケータ更新提案、陳腐化したテストの検出、リファクタ提案で保守を支援します。人の承認が必要な提案であり、保守作業の完全な代替ではありません。"
    }
  },
  {
    "cat": "iv-ai",
    "q": {
      "vi": "Khi dua du lieu du an vao mot cong cu AI ben ngoai, dieu gi can can nhac dau tien?",
      "en": "When feeding project data into an external AI tool, what must be considered first?",
      "ja": "プロジェクトデータを外部AIツールに入力する際、まず考慮すべきことは？"
    },
    "options": [
      {
        "vi": "Mau giao dien cua cong cu AI",
        "en": "The AI tool's colour theme",
        "ja": "AIツールの配色テーマ"
      },
      {
        "vi": "Font chu hien thi ket qua",
        "en": "The font of the output text",
        "ja": "出力テキストのフォント"
      },
      {
        "vi": "So luong emoji trong prompt",
        "en": "The number of emojis in the prompt",
        "ja": "プロンプト内の絵文字の数"
      },
      {
        "vi": "Bao mat va tuan thu: du lieu nhay cam/ca nhan co the bi luu, ro ri hoac vi pham quy dinh",
        "en": "Security and compliance: sensitive/personal data may be stored, leaked or breach regulations",
        "ja": "セキュリティとコンプライアンス：機微/個人データが保存・漏洩・規制違反となり得る"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Du lieu nhay cam (thong tin ca nhan, bi mat kinh doanh, du lieu san xuat) co the bi luu tru hoac ro ri khi gui len dich vu AI ben ngoai, vi pham GDPR/quy dinh noi bo. Phai lam sach/ an danh du lieu va tuan thu chinh sach truoc.",
      "en": "Sensitive data (personal info, trade secrets, production data) can be stored or leaked when sent to external AI services, breaching GDPR/internal policy. It must be sanitized/anonymized and comply with policy first.",
      "ja": "機微データ（個人情報、企業秘密、本番データ）は外部AIサービス送信時に保存・漏洩し、GDPRや社内規定に違反し得ます。事前に匿名化/浄化しポリシーを順守する必要があります。"
    }
  }
];
