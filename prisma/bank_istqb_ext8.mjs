// ============================================================================
// ISTQB EXT8 — Foundation bổ sung (đạt 400) — 216 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":54,"1":54,"2":54,"3":54}
// ============================================================================
export const DATA = [
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình phát triển tuần tự (Waterfall), hoạt động kiểm thử thường được thực hiện như thế nào?",
      "en": "In the sequential (Waterfall) development model, how is testing typically carried out?",
      "ja": "順次開発モデル(ウォーターフォール)では、テスト活動は通常どのように行われますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử là một giai đoạn riêng biệt, thực hiện sau khi toàn bộ quá trình phát triển đã hoàn tất",
        "en": "Testing is a distinct phase carried out after the entire development process has been completed",
        "ja": "テストは独立したフェーズであり、開発プロセス全体が完了した後に実施される"
      },
      {
        "vi": "Kiểm thử diễn ra song song với từng dòng code ngay khi vừa viết xong",
        "en": "Testing occurs in parallel with each line of code as soon as it is written",
        "ja": "コードが1行書かれるたびに並行してテストが行われる"
      },
      {
        "vi": "Kiểm thử chỉ được thực hiện bởi khách hàng sau khi bàn giao sản phẩm",
        "en": "Testing is performed only by the customer after the product is delivered",
        "ja": "テストは製品納品後に顧客によってのみ実施される"
      },
      {
        "vi": "Kiểm thử được chia đều thành nhiều vòng lặp ngắn xen kẽ với phát triển",
        "en": "Testing is split evenly into many short iterations interleaved with development",
        "ja": "テストは開発と交互に行われる多数の短いイテレーションに均等に分割される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Waterfall là mô hình tuần tự theo từng giai đoạn nối tiếp nhau; kiểm thử là một giai đoạn riêng, chỉ bắt đầu sau khi giai đoạn phát triển (coding) đã kết thúc.",
      "en": "Waterfall is a sequential, phase-by-phase model; testing is a separate phase that only begins after the development (coding) phase has finished.",
      "ja": "ウォーターフォールは段階が順に続く逐次モデルであり、テストは独立したフェーズで、開発(コーディング)フェーズが終了してから開始される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đặc điểm nổi bật của mô hình phát triển lặp (iterative) đối với hoạt động kiểm thử là gì?",
      "en": "What is a key characteristic of testing activities in an iterative development model?",
      "ja": "反復型(イテレーティブ)開発モデルにおけるテスト活動の主な特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Toàn bộ hệ thống chỉ được kiểm thử một lần duy nhất ở cuối dự án",
        "en": "The entire system is tested only once at the very end of the project",
        "ja": "システム全体はプロジェクトの最後に一度だけテストされる"
      },
      {
        "vi": "Kiểm thử được lặp lại cho từng phần chức năng nhỏ được xây dựng và hoàn thiện dần qua nhiều chu kỳ",
        "en": "Testing is repeated for each small piece of functionality that is built and refined incrementally across multiple cycles",
        "ja": "テストは、複数のサイクルを通じて段階的に構築・改善される小さな機能単位ごとに繰り返される"
      },
      {
        "vi": "Không cần lập kế hoạch kiểm thử vì mọi thứ đều thay đổi liên tục",
        "en": "No test planning is needed because everything changes constantly",
        "ja": "すべてが常に変化するためテスト計画は不要である"
      },
      {
        "vi": "Chỉ có kiểm thử viên độc lập bên ngoài mới được phép tham gia",
        "en": "Only external independent testers are allowed to participate",
        "ja": "外部の独立したテスト担当者のみが参加を許される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong mô hình lặp, sản phẩm được xây dựng theo từng chu kỳ nhỏ (iteration), mỗi chu kỳ đều bao gồm phát triển và kiểm thử cho phần chức năng tương ứng, giúp phát hiện lỗi sớm và liên tục.",
      "en": "In an iterative model, the product is built in small cycles (iterations), each including development and testing of the corresponding functionality, enabling early and continuous defect detection.",
      "ja": "反復型モデルでは、製品は小さなサイクル(イテレーション)ごとに構築され、各サイクルには対応する機能の開発とテストが含まれ、早期かつ継続的な欠陥検出が可能になる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Theo tiếp cận \"cả đội cùng chịu trách nhiệm\" (whole-team approach) phổ biến trong Agile, ai tham gia vào hoạt động kiểm thử?",
      "en": "According to the \"whole-team approach\" common in Agile, who participates in testing activities?",
      "ja": "アジャイルで一般的な「チーム全体アプローチ(whole-team approach)」によれば、誰がテスト活動に参加しますか。"
    },
    "options": [
      {
        "vi": "Chỉ những người mang chức danh tester chuyên trách",
        "en": "Only people with a dedicated tester job title",
        "ja": "専任のテスター職位を持つ人だけ"
      },
      {
        "vi": "Chỉ Product Owner vì họ hiểu yêu cầu nghiệp vụ nhất",
        "en": "Only the Product Owner because they understand business requirements best",
        "ja": "ビジネス要件を最も理解しているプロダクトオーナーだけ"
      },
      {
        "vi": "Mọi thành viên trong nhóm phát triển, bao gồm lập trình viên, tester và các vai trò khác, cùng chia sẻ trách nhiệm về chất lượng",
        "en": "All members of the development team, including developers, testers and other roles, share responsibility for quality together",
        "ja": "開発者、テスター、その他の役割を含む開発チームの全メンバーが品質に対する責任を共有する"
      },
      {
        "vi": "Chỉ bộ phận QA độc lập nằm ngoài nhóm phát triển",
        "en": "Only an independent QA department outside the development team",
        "ja": "開発チーム外の独立したQA部門だけ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong Agile, chất lượng là trách nhiệm chung của cả nhóm chứ không chỉ riêng tester; các kỹ năng kiểm thử được chia sẻ và tích hợp xuyên suốt quá trình phát triển.",
      "en": "In Agile, quality is a shared responsibility of the whole team rather than testers alone; testing skills are shared and integrated throughout development.",
      "ja": "アジャイルでは、品質はテスターだけでなくチーム全体の共有責任であり、テストスキルは開発全体を通じて共有・統合される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong kim tự tháp kiểm thử (test pyramid) thường được nhắc đến khi bàn về kiểm thử trong Agile, loại kiểm thử nào nên chiếm số lượng nhiều nhất?",
      "en": "In the test pyramid often discussed in the context of Agile testing, which type of test should be the most numerous?",
      "ja": "アジャイルテストの文脈でよく言及されるテストピラミッドにおいて、最も数が多いべきテストの種類はどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử giao diện người dùng (UI) đầu cuối",
        "en": "End-to-end UI tests",
        "ja": "エンドツーエンドのUIテスト"
      },
      {
        "vi": "Kiểm thử chấp nhận của khách hàng (user acceptance testing)",
        "en": "User acceptance testing",
        "ja": "ユーザー受け入れテスト"
      },
      {
        "vi": "Kiểm thử thăm dò thủ công (manual exploratory testing)",
        "en": "Manual exploratory testing",
        "ja": "手動の探索的テスト"
      },
      {
        "vi": "Kiểm thử đơn vị (unit test) ở tầng thấp nhất",
        "en": "Unit tests at the lowest level",
        "ja": "最下層のユニットテスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test pyramid khuyến nghị nền tảng là số lượng lớn các unit test chạy nhanh, chi phí thấp; các lớp phía trên (integration, UI) giảm dần về số lượng vì chạy chậm và chi phí bảo trì cao hơn.",
      "en": "The test pyramid recommends a broad base of fast, low-cost unit tests, with fewer tests at higher layers (integration, UI) since they run slower and cost more to maintain.",
      "ja": "テストピラミッドは、高速で低コストなユニットテストを土台として大量に持ち、上位層(統合、UI)は実行が遅くメンテナンスコストが高いため数を減らすことを推奨する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Scrum, \"Definition of Done\" (định nghĩa hoàn thành) liên quan đến kiểm thử ở điểm nào?",
      "en": "In Scrum, how does the \"Definition of Done\" relate to testing?",
      "ja": "スクラムにおいて「完成の定義(Definition of Done)」はテストとどう関係しますか。"
    },
    "options": [
      {
        "vi": "Nó là danh sách các tiêu chí, trong đó thường bao gồm các mức kiểm thử cần đạt, để xác nhận một hạng mục công việc thực sự hoàn tất",
        "en": "It is a checklist of criteria, typically including required levels of testing, used to confirm that a work item is truly complete",
        "ja": "通常必要なテストレベルを含む基準のチェックリストであり、作業項目が本当に完了したことを確認するために使われる"
      },
      {
        "vi": "Nó quy định số lượng dòng code tối đa cho mỗi sprint",
        "en": "It specifies the maximum number of lines of code per sprint",
        "ja": "スプリントごとのコード行数の上限を規定する"
      },
      {
        "vi": "Nó chỉ áp dụng cho giai đoạn triển khai sản phẩm ra production",
        "en": "It applies only to the production deployment phase",
        "ja": "本番環境へのデプロイフェーズにのみ適用される"
      },
      {
        "vi": "Nó thay thế hoàn toàn cho việc viết test case chi tiết",
        "en": "It completely replaces the need to write detailed test cases",
        "ja": "詳細なテストケースの作成を完全に置き換えるものである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Definition of Done là bộ tiêu chí chung của đội để xác định một sản phẩm tăng trưởng (increment) đã hoàn thành, thường bao gồm yêu cầu về kiểm thử (unit test pass, không còn defect nghiêm trọng...).",
      "en": "Definition of Done is the team's shared set of criteria to determine that a product increment is complete, typically including testing requirements (unit tests passing, no critical defects, etc.).",
      "ja": "完成の定義とは、プロダクトインクリメントが完了したことを判断するためのチーム共通の基準であり、通常はテスト要件(ユニットテストの合格、重大な欠陥がないことなど)を含む。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong quy trình tích hợp liên tục (Continuous Integration - CI), kiểm thử đóng vai trò gì?",
      "en": "In a Continuous Integration (CI) process, what role does testing play?",
      "ja": "継続的インテグレーション(CI)プロセスにおいて、テストはどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử chỉ được thực hiện thủ công bởi một nhóm riêng biệt vào cuối mỗi quý",
        "en": "Testing is performed manually by a separate team only at the end of each quarter",
        "ja": "テストは四半期末に別チームによって手動でのみ実施される"
      },
      {
        "vi": "Bộ kiểm thử tự động được kích hoạt chạy mỗi khi có thay đổi mã nguồn được tích hợp, giúp phát hiện sớm lỗi hồi quy",
        "en": "An automated test suite is triggered to run whenever source code changes are integrated, helping detect regression defects early",
        "ja": "ソースコードの変更が統合されるたびに自動テストスイートが実行され、リグレッション欠陥を早期に検出する"
      },
      {
        "vi": "CI loại bỏ hoàn toàn nhu cầu kiểm thử vì công cụ build đã tự đảm bảo chất lượng",
        "en": "CI eliminates the need for testing entirely because the build tool guarantees quality",
        "ja": "ビルドツールが品質を保証するためCIではテストが完全に不要になる"
      },
      {
        "vi": "Kiểm thử trong CI chỉ áp dụng cho kiểm thử hiệu năng, không áp dụng cho chức năng",
        "en": "Testing in CI applies only to performance testing, not functional testing",
        "ja": "CIにおけるテストはパフォーマンステストのみに適用され、機能テストには適用されない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "CI dựa vào việc tự động hóa build và test: mỗi lần tích hợp code mới, bộ test tự động (thường gồm unit và integration test) chạy ngay để phát hiện lỗi càng sớm càng tốt.",
      "en": "CI relies on automated build and test: each time new code is integrated, an automated test suite (typically unit and integration tests) runs immediately to detect defects as early as possible.",
      "ja": "CIは自動化されたビルドとテストに依存する。新しいコードが統合されるたびに自動テストスイート(通常はユニットテストと統合テスト)が直ちに実行され、できるだけ早く欠陥を検出する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "So với mô hình tuần tự truyền thống, thời gian của một chu kỳ lặp (sprint/iteration) ngắn trong Agile mang lại lợi ích gì cho kiểm thử?",
      "en": "Compared to the traditional sequential model, what benefit does a short iteration/sprint length in Agile bring to testing?",
      "ja": "従来の順次モデルと比較して、アジャイルにおける短いイテレーション/スプリント期間はテストにどのような利点をもたらしますか。"
    },
    "options": [
      {
        "vi": "Giúp trì hoãn toàn bộ hoạt động kiểm thử đến cuối dự án để tiết kiệm chi phí",
        "en": "It helps postpone all testing activities until the end of the project to save cost",
        "ja": "コスト削減のためすべてのテスト活動をプロジェクトの最後まで先送りできる"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu viết tài liệu test case",
        "en": "It completely eliminates the need to write test case documentation",
        "ja": "テストケース文書の作成が完全に不要になる"
      },
      {
        "vi": "Cho phép phản hồi nhanh về chất lượng và phát hiện lỗi sớm hơn nhờ kiểm thử liên tục theo từng phần nhỏ",
        "en": "It allows faster feedback on quality and earlier defect detection thanks to continuous testing of small increments",
        "ja": "小さな増分ごとの継続的なテストにより、品質に関する迅速なフィードバックと早期の欠陥検出が可能になる"
      },
      {
        "vi": "Đảm bảo không bao giờ cần thực hiện kiểm thử hồi quy",
        "en": "It guarantees that regression testing is never needed",
        "ja": "リグレッションテストが二度と必要なくなることを保証する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chu kỳ lặp ngắn giúp nhóm kiểm thử từng phần nhỏ ngay khi vừa hoàn thành, mang lại phản hồi nhanh cho các bên liên quan và phát hiện, xử lý lỗi sớm hơn so với việc dồn toàn bộ kiểm thử vào cuối dự án.",
      "en": "Short iterations let the team test small pieces as soon as they are finished, giving stakeholders faster feedback and enabling earlier defect detection and resolution than testing everything at the end.",
      "ja": "短いイテレーションにより、チームは完成した小さな部分をすぐにテストでき、関係者への迅速なフィードバックと、すべてを最後にまとめてテストするよりも早い欠陥検出・対応が可能になる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình phát triển tăng dần (incremental), sản phẩm được bàn giao như thế nào và điều này ảnh hưởng gì tới kiểm thử?",
      "en": "In an incremental development model, how is the product delivered, and how does this affect testing?",
      "ja": "インクリメンタル(段階的)開発モデルにおいて、製品はどのように提供され、それがテストにどう影響しますか。"
    },
    "options": [
      {
        "vi": "Việc kiểm thử chỉ diễn ra một lần ở increment cuối cùng",
        "en": "Testing is performed only once, on the final increment",
        "ja": "テストは最終インクリメントでのみ一度だけ実施される"
      },
      {
        "vi": "Toàn bộ sản phẩm được bàn giao một lần duy nhất sau khi hoàn tất tất cả các chức năng",
        "en": "The entire product is delivered only once after all functionality is complete",
        "ja": "すべての機能が完成した後に製品全体が一度だけ提供される"
      },
      {
        "vi": "Sản phẩm không bao giờ được kiểm thử tích hợp vì mỗi phần hoạt động hoàn toàn độc lập",
        "en": "The product is never integration tested because each part operates completely independently",
        "ja": "各部分が完全に独立して動作するため統合テストは一切行われない"
      },
      {
        "vi": "Sản phẩm được xây dựng và bàn giao từng phần chức năng tăng dần, mỗi phần cần được kiểm thử riêng và kiểm thử tích hợp với các phần đã có trước đó",
        "en": "The product is built and delivered in successive functional increments, each of which must be tested individually and also tested for integration with previously delivered increments",
        "ja": "製品は機能を段階的に増やしながら構築・提供され、各増分は個別にテストされるとともに、既存の増分との統合テストも必要になる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mô hình tăng dần chia sản phẩm thành nhiều phần (increment) được phát triển và bàn giao nối tiếp; mỗi increment cần kiểm thử độc lập lẫn kiểm thử tích hợp với các phần trước để đảm bảo hệ thống vẫn hoạt động đúng khi ghép lại.",
      "en": "The incremental model splits the product into increments developed and delivered sequentially; each increment needs both standalone testing and integration testing with prior increments to ensure the combined system still works correctly.",
      "ja": "インクリメンタルモデルは製品を複数のインクリメントに分割し、順次開発・提供する。各インクリメントは単独でのテストに加え、既存部分との統合テストも必要であり、組み合わせたシステムが正しく動作することを保証する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Scrum, buổi họp \"sprint retrospective\" có ý nghĩa gì đối với việc cải tiến hoạt động kiểm thử?",
      "en": "In Scrum, what significance does the \"sprint retrospective\" meeting have for improving testing activities?",
      "ja": "スクラムにおける「スプリントレトロスペクティブ」は、テスト活動の改善にとってどのような意義がありますか。"
    },
    "options": [
      {
        "vi": "Đây là dịp để nhóm nhìn lại cách làm việc trong sprint vừa qua, bao gồm cả quy trình kiểm thử, và đề xuất cải tiến cho sprint tiếp theo",
        "en": "It is an opportunity for the team to reflect on how they worked in the past sprint, including the testing process, and propose improvements for the next sprint",
        "ja": "チームが直前のスプリントでの働き方(テストプロセスを含む)を振り返り、次のスプリントに向けた改善を提案する機会である"
      },
      {
        "vi": "Đây là buổi trình diễn sản phẩm cho khách hàng xem để họ chấp nhận kết quả kiểm thử",
        "en": "It is a demo session where the product is shown to customers so they accept the test results",
        "ja": "顧客に製品を見せてテスト結果を承認してもらうデモセッションである"
      },
      {
        "vi": "Đây là hoạt động lập kế hoạch chi tiết cho từng test case sẽ chạy trong sprint kế tiếp",
        "en": "It is an activity for planning in detail every test case to run in the next sprint",
        "ja": "次のスプリントで実行するすべてのテストケースを詳細に計画する活動である"
      },
      {
        "vi": "Đây là bước ký duyệt chính thức exit criteria trước khi release",
        "en": "It is the formal sign-off step for exit criteria before release",
        "ja": "リリース前の終了基準の正式な承認ステップである"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Retrospective là sự kiện cải tiến liên tục của Scrum, nơi nhóm đánh giá quy trình làm việc (bao gồm kiểm thử) để tìm cách làm tốt hơn ở sprint sau, không phải để trình diễn sản phẩm hay ký duyệt chính thức.",
      "en": "The retrospective is Scrum's continuous-improvement event, where the team evaluates its working process (including testing) to find ways to work better next sprint, not to demo the product or formally sign off.",
      "ja": "レトロスペクティブはスクラムの継続的改善イベントであり、チームは(テストを含む)作業プロセスを評価し、次のスプリントでより良く働く方法を見つける。製品のデモや正式な承認のためのものではない。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử thăm dò (exploratory testing) thường phù hợp và được sử dụng phổ biến trong mô hình phát triển nào?",
      "en": "Exploratory testing is typically well-suited and commonly used in which type of development model?",
      "ja": "探索的テストは、一般的にどの種類の開発モデルに適しており、よく使われますか。"
    },
    "options": [
      {
        "vi": "Chỉ trong mô hình Waterfall, ở giai đoạn kiểm thử chấp nhận cuối cùng",
        "en": "Only in the Waterfall model, during the final acceptance testing phase",
        "ja": "ウォーターフォールモデルの最終受け入れテスト段階のみ"
      },
      {
        "vi": "Trong các mô hình lặp và Agile, nơi các chu kỳ ngắn và thay đổi thường xuyên khiến việc thiết kế test case chi tiết trước không hiệu quả bằng khám phá linh hoạt",
        "en": "In iterative and Agile models, where short cycles and frequent change make detailed upfront test-case design less effective than flexible, adaptive investigation",
        "ja": "短いサイクルと頻繁な変更により、事前の詳細なテストケース設計より柔軟な探索の方が効果的な反復型・アジャイルモデル"
      },
      {
        "vi": "Chỉ khi có tài liệu đặc tả yêu cầu hoàn chỉnh và không thay đổi",
        "en": "Only when a complete and unchanging requirements specification exists",
        "ja": "完全で変更のない要件仕様書がある場合のみ"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử hiệu năng hệ thống lớn",
        "en": "It applies only to performance testing of large systems",
        "ja": "大規模システムのパフォーマンステストにのみ適用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong môi trường lặp/Agile với yêu cầu thay đổi liên tục và chu kỳ ngắn, kiểm thử thăm dò cho phép tester vừa học vừa thiết kế và thực thi kiểm thử song song, thích ứng nhanh hơn so với chuẩn bị test case chi tiết từ trước.",
      "en": "In an iterative/Agile environment with constantly changing requirements and short cycles, exploratory testing lets testers learn while simultaneously designing and executing tests, adapting faster than preparing detailed test cases in advance.",
      "ja": "要件が常に変化し、サイクルが短い反復型・アジャイル環境では、探索的テストによりテスターは学習しながら同時にテストの設計と実行を行うことができ、事前に詳細なテストケースを準備するよりも迅速に適応できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong bối cảnh DevOps với pipeline triển khai tự động (CI/CD), điều gì thể hiện đúng ảnh hưởng của mô hình này tới kiểm thử?",
      "en": "In a DevOps context with an automated CI/CD deployment pipeline, which statement correctly reflects its impact on testing?",
      "ja": "自動デプロイパイプライン(CI/CD)を伴うDevOpsの文脈において、テストへの影響を正しく示すのはどれですか。"
    },
    "options": [
      {
        "vi": "Pipeline CI/CD chỉ chạy sau khi sản phẩm đã được release cho người dùng cuối",
        "en": "The CI/CD pipeline only runs after the product has been released to end users",
        "ja": "CI/CDパイプラインは製品がエンドユーザーにリリースされた後にのみ実行される"
      },
      {
        "vi": "DevOps yêu cầu toàn bộ kiểm thử phải được thực hiện thủ công để đảm bảo độ tin cậy",
        "en": "DevOps requires all testing to be done manually to ensure reliability",
        "ja": "DevOpsでは信頼性確保のためすべてのテストを手動で行う必要がある"
      },
      {
        "vi": "Kiểm thử tự động được tích hợp vào các bước của pipeline để mỗi thay đổi được kiểm tra nhanh chóng trước khi triển khai tiếp",
        "en": "Automated tests are integrated into pipeline stages so each change is quickly verified before proceeding to deployment",
        "ja": "各変更がデプロイに進む前に迅速に検証されるよう、自動テストがパイプラインの各段階に組み込まれる"
      },
      {
        "vi": "DevOps loại bỏ hoàn toàn vai trò của kiểm thử hồi quy",
        "en": "DevOps completely removes the role of regression testing",
        "ja": "DevOpsではリグレッションテストの役割が完全になくなる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DevOps thúc đẩy tự động hóa kiểm thử như một phần không thể tách rời của pipeline CI/CD, giúp mỗi thay đổi mã nguồn được kiểm tra nhanh và thường xuyên trước khi triển khai tới môi trường tiếp theo.",
      "en": "DevOps promotes test automation as an inseparable part of the CI/CD pipeline, ensuring each code change is verified quickly and frequently before moving to the next environment.",
      "ja": "DevOpsはテスト自動化をCI/CDパイプラインの不可分な一部として推進し、各コード変更が次の環境に進む前に迅速かつ頻繁に検証されることを保証する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi so sánh tài liệu kiểm thử giữa mô hình tuần tự truyền thống và Agile, phát biểu nào đúng nhất?",
      "en": "When comparing test documentation between the traditional sequential model and Agile, which statement is most accurate?",
      "ja": "従来の順次モデルとアジャイルにおけるテスト文書を比較する場合、最も正確な記述はどれですか。"
    },
    "options": [
      {
        "vi": "Agile hoàn toàn không cần bất kỳ tài liệu kiểm thử nào",
        "en": "Agile requires absolutely no test documentation at all",
        "ja": "アジャイルではテスト文書が一切不要である"
      },
      {
        "vi": "Mô hình tuần tự không bao giờ có tài liệu test, chỉ Agile mới có",
        "en": "The sequential model never has test documentation; only Agile does",
        "ja": "順次モデルにはテスト文書が一切なく、アジャイルのみが文書を持つ"
      },
      {
        "vi": "Cả hai mô hình luôn yêu cầu khối lượng tài liệu kiểm thử giống hệt nhau",
        "en": "Both models always require an identical volume of test documentation",
        "ja": "両モデルは常に全く同じ量のテスト文書を必要とする"
      },
      {
        "vi": "Mô hình tuần tự thường có tài liệu test chi tiết được chuẩn bị trước; Agile có xu hướng dùng tài liệu gọn nhẹ, cập nhật liên tục và tập trung vào giá trị cần thiết cho từng vòng lặp",
        "en": "The sequential model typically has detailed test documentation prepared upfront; Agile tends to use lightweight, continuously updated documentation focused on what adds value for each iteration",
        "ja": "順次モデルでは通常、詳細なテスト文書が事前に準備される。一方アジャイルでは、各イテレーションに必要な価値に焦点を当てた、継続的に更新される軽量な文書を使う傾向がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mô hình tuần tự nhấn mạnh lập kế hoạch và tài liệu chi tiết từ đầu; Agile ưu tiên phần mềm chạy được hơn tài liệu đồ sộ nhưng vẫn duy trì tài liệu vừa đủ, linh hoạt cập nhật theo từng sprint.",
      "en": "The sequential model emphasizes detailed upfront planning and documentation; Agile values working software over comprehensive documentation but still maintains just enough documentation, flexibly updated each sprint.",
      "ja": "順次モデルは事前の詳細な計画と文書化を重視する。アジャイルは網羅的な文書よりも動くソフトウェアを重視するが、各スプリントで柔軟に更新される必要十分な文書は維持する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Agile, \"tiêu chí chấp nhận\" (acceptance criteria) của một user story có vai trò gì đối với kiểm thử?",
      "en": "In Agile, what role does the \"acceptance criteria\" of a user story play in testing?",
      "ja": "アジャイルにおいて、ユーザーストーリーの「受け入れ基準(acceptance criteria)」はテストにおいてどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Chúng là cơ sở để xác định story đã được hiện thực đúng hay chưa, thường được dùng làm điều kiện để thiết kế và đánh giá test",
        "en": "They serve as the basis for determining whether the story has been correctly implemented, commonly used as the basis for designing and evaluating tests",
        "ja": "ストーリーが正しく実装されたかどうかを判断する根拠であり、通常はテストの設計・評価の基準として使われる"
      },
      {
        "vi": "Chúng chỉ dùng để ước lượng story point, không liên quan tới kiểm thử",
        "en": "They are used only to estimate story points and are unrelated to testing",
        "ja": "ストーリーポイントの見積もりにのみ使われ、テストとは無関係である"
      },
      {
        "vi": "Chúng thay thế hoàn toàn vai trò của Product Owner trong việc chấp nhận sản phẩm",
        "en": "They completely replace the Product Owner's role in accepting the product",
        "ja": "プロダクトオーナーによる製品受け入れの役割を完全に置き換える"
      },
      {
        "vi": "Chúng chỉ được viết sau khi sprint đã kết thúc để ghi nhận kết quả",
        "en": "They are written only after the sprint ends to record the outcome",
        "ja": "スプリント終了後に結果を記録するためだけに書かれる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tiêu chí chấp nhận mô tả các điều kiện cần đáp ứng để user story được coi là hoàn thành đúng, và tester/nhóm dùng chúng làm căn cứ thiết kế test case cũng như xác nhận kết quả kiểm thử.",
      "en": "Acceptance criteria describe the conditions a user story must meet to be considered correctly done, and testers/the team use them as the basis for designing test cases and confirming test outcomes.",
      "ja": "受け入れ基準は、ユーザーストーリーが正しく完了したとみなされるために満たすべき条件を記述するものであり、テスター/チームはこれを基にテストケースを設計し、テスト結果を確認する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong các mô hình Agile, các mức kiểm thử (test level) như unit, integration, system thường có xu hướng như thế nào so với mô hình chữ V truyền thống?",
      "en": "In Agile models, how do test levels such as unit, integration, and system testing typically behave compared to the traditional V-model?",
      "ja": "アジャイルモデルにおいて、ユニット・統合・システムといったテストレベルは、従来のVモデルと比較してどのような傾向を持つ傾向がありますか。"
    },
    "options": [
      {
        "vi": "Các mức kiểm thử biến mất hoàn toàn, chỉ còn lại kiểm thử chấp nhận",
        "en": "The test levels disappear entirely, leaving only acceptance testing",
        "ja": "テストレベルは完全になくなり、受け入れテストのみが残る"
      },
      {
        "vi": "Các mức kiểm thử vẫn tồn tại nhưng thường được thực hiện chồng lấn, đan xen và lặp lại liên tục trong mỗi vòng lặp thay vì tách biệt theo giai đoạn tuần tự cố định",
        "en": "The test levels still exist but tend to be performed in an overlapping, interleaved and continuously repeated manner within each iteration, rather than as strictly separate sequential phases",
        "ja": "テストレベルは依然として存在するが、厳密に分離された順次フェーズとしてではなく、各イテレーション内で重なり合い、交錯し、継続的に繰り返される形で実施される傾向がある"
      },
      {
        "vi": "Các mức kiểm thử phải được thực hiện theo đúng thứ tự cố định và không được lặp lại trong cùng một sprint",
        "en": "The test levels must be performed in a fixed strict order and never repeated within the same sprint",
        "ja": "テストレベルは厳密に固定された順序で実施され、同一スプリント内で繰り返してはならない"
      },
      {
        "vi": "Chỉ có kiểm thử hệ thống được thực hiện, không cần unit test hay integration test",
        "en": "Only system testing is performed; unit and integration testing are unnecessary",
        "ja": "システムテストのみが実施され、ユニットテストや統合テストは不要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong Agile, các mức kiểm thử không biến mất nhưng ranh giới giữa chúng trở nên linh hoạt hơn: unit, integration, system test có thể diễn ra đan xen nhiều lần trong cùng một iteration ngắn, khác với trình tự tuần tự cứng nhắc của V-model.",
      "en": "In Agile, test levels don't disappear, but the boundaries between them become more fluid: unit, integration and system testing can occur interleaved multiple times within the same short iteration, unlike the rigid sequential order of the V-model.",
      "ja": "アジャイルではテストレベルはなくならないが、その境界はより柔軟になる。ユニット・統合・システムテストは、Vモデルの厳格な順序とは異なり、同じ短いイテレーション内で何度も交錯して行われることがある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình Spiral (xoắn ốc), yếu tố nào là trọng tâm chi phối cách thức và mức độ kiểm thử được thực hiện ở mỗi vòng lặp?",
      "en": "In the Spiral model, what is the central factor that drives how and to what extent testing is performed in each iteration?",
      "ja": "スパイラルモデルにおいて、各イテレーションでテストがどのように、どの程度実施されるかを左右する中心的な要素は何ですか。"
    },
    "options": [
      {
        "vi": "Ngân sách marketing được phân bổ cho sản phẩm",
        "en": "The marketing budget allocated to the product",
        "ja": "製品に割り当てられたマーケティング予算"
      },
      {
        "vi": "Số lượng nhân sự tester có sẵn trong công ty tại thời điểm đó",
        "en": "The number of testers currently available at the company",
        "ja": "その時点で社内に確保できるテスターの人数"
      },
      {
        "vi": "Đánh giá và phân tích rủi ro của dự án ở từng vòng lặp, từ đó quyết định trọng tâm kiểm thử",
        "en": "Project risk assessment and analysis at each iteration, which determines the focus of testing",
        "ja": "各イテレーションにおけるプロジェクトのリスク評価・分析であり、これがテストの重点を決定する"
      },
      {
        "vi": "Sở thích cá nhân của trưởng nhóm phát triển",
        "en": "The personal preference of the development team lead",
        "ja": "開発チームリーダーの個人的な好み"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mô hình Spiral lặp lại các vòng gồm xác định mục tiêu, phân tích rủi ro, phát triển và đánh giá; kiểm thử trong mỗi vòng được định hướng để giảm thiểu rủi ro đã xác định, khác với các mô hình chỉ dựa vào tiến độ hoặc yêu cầu.",
      "en": "The Spiral model repeats cycles of defining objectives, risk analysis, development, and evaluation; testing in each cycle is oriented toward mitigating identified risks, unlike models based purely on schedule or requirements.",
      "ja": "スパイラルモデルは、目標の定義、リスク分析、開発、評価というサイクルを繰り返す。各サイクルのテストは、特定されたリスクを軽減する方向に向けられており、スケジュールや要件のみに基づく他のモデルとは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Agile, kiểm thử chấp nhận (acceptance testing) thường được tổ chức khác với mô hình tuần tự truyền thống ở điểm nào?",
      "en": "In Agile, how is acceptance testing typically organized differently compared to the traditional sequential model?",
      "ja": "アジャイルにおいて、受け入れテストは従来の順次モデルと比較して、どのように異なる形で行われる傾向がありますか。"
    },
    "options": [
      {
        "vi": "Chỉ thực hiện một lần duy nhất, ngay trước khi bàn giao toàn bộ dự án cho khách hàng",
        "en": "It is performed only once, right before the entire project is handed over to the customer",
        "ja": "プロジェクト全体を顧客に引き渡す直前に一度だけ実施される"
      },
      {
        "vi": "Chỉ do bộ phận pháp lý của công ty thực hiện",
        "en": "It is performed only by the company's legal department",
        "ja": "会社の法務部門のみによって実施される"
      },
      {
        "vi": "Không bao giờ được thực hiện trong Agile vì thiếu tài liệu đặc tả",
        "en": "It is never performed in Agile due to lack of specification documentation",
        "ja": "仕様書がないためアジャイルでは決して実施されない"
      },
      {
        "vi": "Được thực hiện liên tục, thường vào cuối mỗi sprint đối với các user story đã hoàn thành, thay vì dồn vào một giai đoạn cuối duy nhất",
        "en": "It is performed continuously, typically at the end of each sprint for completed user stories, instead of being concentrated in a single final phase",
        "ja": "単一の最終フェーズに集中させるのではなく、完了したユーザーストーリーに対して各スプリントの終わりに継続的に実施される"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong Agile, mỗi sprint thường tạo ra các increment có thể release được, nên kiểm thử chấp nhận (thường thông qua sprint review) diễn ra liên tục theo từng chu kỳ ngắn thay vì chỉ một lần ở cuối dự án như mô hình tuần tự.",
      "en": "In Agile, each sprint typically produces releasable increments, so acceptance testing (often via sprint review) happens continuously in short cycles instead of only once at project end as in the sequential model.",
      "ja": "アジャイルでは各スプリントが通常リリース可能なインクリメントを生み出すため、受け入れテスト(多くはスプリントレビューを通じて)は順次モデルのようにプロジェクト末に一度だけではなく、短いサイクルごとに継続的に行われる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Behavior Driven Development (BDD) với cấu trúc \"Given-When-Then\" ảnh hưởng như thế nào tới cách kiểm thử trong các dự án Agile?",
      "en": "How does Behavior Driven Development (BDD) with the \"Given-When-Then\" structure influence how testing is approached in Agile projects?",
      "ja": "「Given-When-Then」構造を持つビヘイビア駆動開発(BDD)は、アジャイルプロジェクトにおけるテストの進め方にどのような影響を与えますか。"
    },
    "options": [
      {
        "vi": "Nó giúp diễn đạt hành vi mong đợi của hệ thống bằng ngôn ngữ dễ hiểu chung cho cả nghiệp vụ và kỹ thuật, làm cơ sở cho việc thiết kế và tự động hóa test",
        "en": "It helps express the expected behavior of the system in language understandable to both business and technical stakeholders, serving as a basis for designing and automating tests",
        "ja": "ビジネス側と技術側の双方が理解できる言葉でシステムの期待される振る舞いを表現でき、テストの設計と自動化の基盤となる"
      },
      {
        "vi": "Nó chỉ dùng để viết tài liệu marketing sản phẩm",
        "en": "It is used only for writing product marketing documentation",
        "ja": "製品のマーケティング文書を書くためだけに使われる"
      },
      {
        "vi": "Nó thay thế hoàn toàn nhu cầu thực hiện kiểm thử hồi quy",
        "en": "It completely eliminates the need for regression testing",
        "ja": "リグレッションテストの必要性を完全になくす"
      },
      {
        "vi": "Nó chỉ áp dụng được cho kiểm thử hiệu năng hệ thống",
        "en": "It can only be applied to system performance testing",
        "ja": "システムのパフォーマンステストにのみ適用できる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "BDD dùng cú pháp Given-When-Then để mô tả kịch bản hành vi theo ngôn ngữ gần gũi với nghiệp vụ, giúp các bên liên quan cùng hiểu yêu cầu và làm nền tảng để viết test case, kể cả test tự động, một cách nhất quán.",
      "en": "BDD uses the Given-When-Then syntax to describe behavior scenarios in business-friendly language, helping stakeholders share a common understanding of requirements and providing a consistent basis for writing test cases, including automated ones.",
      "ja": "BDDはGiven-When-Then構文を用いて、ビジネスに近い言葉で振る舞いのシナリオを記述する。これにより関係者が要件を共通理解でき、自動テストを含むテストケース作成の一貫した基盤となる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong cách tiếp cận Test-Driven Development (TDD), thứ tự thực hiện các bước là gì và điều này ảnh hưởng thế nào tới kiểm thử?",
      "en": "In the Test-Driven Development (TDD) approach, what is the order of steps, and how does this affect testing?",
      "ja": "テスト駆動開発(TDD)のアプローチにおいて、各ステップの順序はどうなっており、それがテストにどう影響しますか。"
    },
    "options": [
      {
        "vi": "Viết toàn bộ code trước, sau đó thuê một đội kiểm thử độc lập viết test ở giai đoạn cuối dự án",
        "en": "Write all the code first, then hire an independent test team to write tests at the end of the project",
        "ja": "すべてのコードを先に書き、プロジェクトの最後に独立したテストチームを雇ってテストを書かせる"
      },
      {
        "vi": "Viết test thất bại trước, sau đó viết đoạn code tối thiểu để test đó pass, rồi tái cấu trúc code — giúp kiểm thử được tích hợp ngay từ đầu quá trình phát triển",
        "en": "Write a failing test first, then write the minimal code to make it pass, then refactor — integrating testing into development from the very start",
        "ja": "まず失敗するテストを書き、それを通す最小限のコードを書き、その後リファクタリングする。これによりテストが開発の最初から組み込まれる"
      },
      {
        "vi": "Chỉ viết test sau khi sản phẩm đã được release ra thị trường để thu thập phản hồi người dùng",
        "en": "Write tests only after the product has been released to the market to gather user feedback",
        "ja": "ユーザーからのフィードバックを集めるため、製品が市場にリリースされた後にのみテストを書く"
      },
      {
        "vi": "Bỏ qua hoàn toàn việc viết test, chỉ dựa vào review code thủ công",
        "en": "Skip writing tests entirely and rely solely on manual code review",
        "ja": "テストの作成を完全に省略し、手動のコードレビューのみに頼る"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "TDD tuân theo chu kỳ Red-Green-Refactor: viết test trước (thất bại), viết code tối thiểu để test pass, rồi tái cấu trúc. Cách này khiến kiểm thử trở thành công cụ định hướng thiết kế, gắn liền ngay từ đầu chứ không phải hoạt động sau cùng.",
      "en": "TDD follows the Red-Green-Refactor cycle: write a failing test first, write minimal code to pass it, then refactor. This makes testing a design-driving activity integrated from the outset, not an afterthought.",
      "ja": "TDDはRed-Green-Refactorのサイクルに従う。まず失敗するテストを書き、それを通す最小限のコードを書き、その後リファクタリングする。これによりテストは事後の活動ではなく、最初から統合された設計を導く活動となる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Điểm khác biệt cốt lõi giữa mô hình phát triển theo kiểu \"dự đoán\" (predictive/plan-driven) và mô hình \"thích ứng\" (adaptive) như Agile là gì?",
      "en": "What is the core difference between \"predictive\" (plan-driven) development models and \"adaptive\" models such as Agile?",
      "ja": "「予測型(plan-driven)」開発モデルとアジャイルのような「適応型(adaptive)」モデルの本質的な違いは何ですか。"
    },
    "options": [
      {
        "vi": "Mô hình thích ứng luôn yêu cầu tài liệu đặc tả hoàn chỉnh trước khi bắt đầu code, giống mô hình dự đoán",
        "en": "Adaptive models always require a complete specification before coding begins, just like predictive models",
        "ja": "適応型モデルも予測型モデルと同様、コーディング開始前に完全な仕様書を常に必要とする"
      },
      {
        "vi": "Cả hai mô hình đều không bao giờ thay đổi kế hoạch sau khi dự án bắt đầu",
        "en": "Both models never change their plans once the project has started",
        "ja": "両モデルともプロジェクト開始後は計画を一切変更しない"
      },
      {
        "vi": "Mô hình dự đoán lập kế hoạch chi tiết và cố định phạm vi ngay từ đầu; mô hình thích ứng chấp nhận thay đổi liên tục và điều chỉnh kế hoạch, bao gồm cả kế hoạch kiểm thử, theo từng chu kỳ",
        "en": "Predictive models plan in detail and fix scope upfront; adaptive models embrace ongoing change and adjust plans, including test plans, cycle by cycle",
        "ja": "予測型モデルは詳細な計画を立て、最初にスコープを固定する。適応型モデルは継続的な変化を受け入れ、テスト計画を含む計画をサイクルごとに調整する"
      },
      {
        "vi": "Mô hình dự đoán không bao giờ có giai đoạn kiểm thử, chỉ mô hình thích ứng mới có",
        "en": "Predictive models never include a testing phase; only adaptive models do",
        "ja": "予測型モデルにはテストフェーズが一切なく、適応型モデルのみにある"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mô hình dự đoán (như Waterfall) cố gắng xác định đầy đủ phạm vi, kế hoạch, tài liệu ngay từ đầu; mô hình thích ứng (như Agile) chấp nhận yêu cầu thay đổi và điều chỉnh kế hoạch làm việc, bao gồm chiến lược kiểm thử, một cách linh hoạt theo từng chu kỳ.",
      "en": "Predictive models (like Waterfall) try to fully define scope, plans, and documentation upfront; adaptive models (like Agile) embrace changing requirements and flexibly adjust the working plan, including test strategy, cycle by cycle.",
      "ja": "予測型モデル(ウォーターフォールなど)は、スコープ・計画・文書を最初に完全に定義しようとする。適応型モデル(アジャイルなど)は変化する要件を受け入れ、テスト戦略を含む作業計画をサイクルごとに柔軟に調整する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình lặp và tăng dần, việc phát hiện lỗi sớm hơn so với mô hình tuần tự chủ yếu là nhờ đâu?",
      "en": "In iterative and incremental models, earlier defect detection compared to sequential models is mainly due to what factor?",
      "ja": "反復型・インクリメンタル型モデルにおいて、順次モデルよりも欠陥を早期に検出できる主な理由は何ですか。"
    },
    "options": [
      {
        "vi": "Vì khách hàng tự kiểm thử toàn bộ sản phẩm thay cho đội dự án",
        "en": "Because the customer tests the entire product themselves instead of the project team",
        "ja": "プロジェクトチームの代わりに顧客が製品全体を自らテストするため"
      },
      {
        "vi": "Vì số lượng tester được tăng gấp đôi so với mô hình tuần tự",
        "en": "Because the number of testers is doubled compared to the sequential model",
        "ja": "順次モデルに比べてテスターの人数が倍増されるため"
      },
      {
        "vi": "Vì mô hình lặp không cần viết bất kỳ test case nào",
        "en": "Because iterative models require no test cases to be written at all",
        "ja": "反復型モデルではテストケースを一切書く必要がないため"
      },
      {
        "vi": "Vì có nhiều phần mềm chức năng hoàn chỉnh, dù nhỏ, được xây dựng và có thể kiểm thử sớm trong quá trình phát triển thay vì chờ đến khi toàn bộ hệ thống hoàn tất",
        "en": "Because small but complete pieces of functioning software are built and can be tested early in development, rather than waiting until the entire system is complete",
        "ja": "システム全体が完成するのを待つのではなく、小さくても完全に機能するソフトウェアが開発中に早期に構築され、テスト可能になるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong mô hình lặp/tăng dần, mỗi chu kỳ tạo ra phần mềm có thể chạy và kiểm thử được ngay, nên các vấn đề được phát hiện gần thời điểm chúng được đưa vào, sớm hơn nhiều so với việc phải chờ hoàn tất toàn bộ hệ thống như mô hình tuần tự.",
      "en": "In iterative/incremental models, each cycle produces runnable, testable software, so issues are found close to when they were introduced — much earlier than having to wait for the entire system to be complete as in sequential models.",
      "ja": "反復型・インクリメンタル型モデルでは、各サイクルで実行可能でテスト可能なソフトウェアが生成されるため、問題は発生した時点に近いタイミングで発見される。これは、システム全体の完成を待たなければならない順次モデルよりもはるかに早い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Agile, tần suất và tự động hóa kiểm thử hồi quy (regression testing) thường thay đổi như thế nào so với dự án theo mô hình tuần tự?",
      "en": "In Agile, how do the frequency and automation of regression testing typically change compared to a project following a sequential model?",
      "ja": "アジャイルにおいて、リグレッションテストの頻度と自動化は、順次モデルに従うプロジェクトと比較して通常どのように変化しますか。"
    },
    "options": [
      {
        "vi": "Do code thay đổi liên tục qua nhiều sprint, regression testing cần chạy thường xuyên hơn nhiều, và mức độ tự động hóa cao trở nên đặc biệt quan trọng để kiểm thử kịp tiến độ",
        "en": "Because code changes continuously across many sprints, regression testing needs to run much more frequently, and a high level of automation becomes especially important to keep testing pace with development",
        "ja": "コードが多くのスプリントにわたって継続的に変化するため、リグレッションテストははるかに頻繁に実行される必要があり、開発のペースにテストを追いつかせるために高度な自動化が特に重要になる"
      },
      {
        "vi": "Regression testing hầu như không cần thiết trong Agile vì code hiếm khi thay đổi",
        "en": "Regression testing is almost unnecessary in Agile because code rarely changes",
        "ja": "アジャイルではコードがほとんど変化しないためリグレッションテストはほぼ不要である"
      },
      {
        "vi": "Regression testing chỉ được thực hiện một lần duy nhất trước khi release phiên bản đầu tiên",
        "en": "Regression testing is performed only once, before the very first release",
        "ja": "リグレッションテストは最初のリリース前に一度だけ実施される"
      },
      {
        "vi": "Tự động hóa kiểm thử hồi quy bị cấm sử dụng trong các dự án Agile",
        "en": "Automating regression testing is prohibited in Agile projects",
        "ja": "アジャイルプロジェクトではリグレッションテストの自動化は禁止されている"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì Agile thay đổi code liên tục qua từng sprint ngắn, nhu cầu chạy lại kiểm thử hồi quy tăng lên đáng kể; để đáp ứng tốc độ này mà không làm chậm tiến độ, tự động hóa kiểm thử hồi quy trở thành yếu tố then chốt.",
      "en": "Because Agile changes code continuously across short sprints, the need to re-run regression tests increases significantly; to keep up with this pace without slowing progress, regression test automation becomes a key enabler.",
      "ja": "アジャイルは短いスプリントを通じてコードを継続的に変更するため、リグレッションテストを再実行する必要性が大幅に高まる。進捗を遅らせることなくこのペースに対応するため、リグレッションテストの自動化が重要な鍵となる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong Agile, tester thường tham gia từ giai đoạn nào của quá trình phát triển một tính năng, khác biệt gì so với mô hình tuần tự truyền thống?",
      "en": "In Agile, at what stage of feature development do testers typically get involved, and how does this differ from the traditional sequential model?",
      "ja": "アジャイルにおいて、テスターは機能開発のどの段階から関与し始めるのが一般的で、それは従来の順次モデルとどう異なりますか。"
    },
    "options": [
      {
        "vi": "Tester chỉ tham gia sau khi toàn bộ code đã được viết xong và bàn giao chính thức, giống hệt mô hình tuần tự",
        "en": "Testers only get involved after all the code has been written and formally handed over, exactly like the sequential model",
        "ja": "すべてのコードが書き終わり正式に引き渡された後にのみテスターが関与する点で、順次モデルと全く同じである"
      },
      {
        "vi": "Tester tham gia ngay từ khi thảo luận yêu cầu/user story (ví dụ: refinement, planning), giúp phát hiện vấn đề tiềm ẩn sớm hơn so với việc chỉ tham gia ở cuối như mô hình tuần tự",
        "en": "Testers get involved right from requirement/user story discussions (e.g., refinement, planning), helping surface potential issues earlier than only joining at the end as in the sequential model",
        "ja": "要件・ユーザーストーリーの議論(リファインメントやプランニングなど)の段階からテスターが関与し、順次モデルのように最後にのみ参加する場合より潜在的な問題を早期に発見できる"
      },
      {
        "vi": "Tester không bao giờ được mời tham gia bất kỳ cuộc họp nào của nhóm phát triển",
        "en": "Testers are never invited to any development team meetings",
        "ja": "テスターは開発チームのいかなる会議にも招待されない"
      },
      {
        "vi": "Tester chỉ tham gia vào việc viết tài liệu hướng dẫn sử dụng cuối cùng",
        "en": "Testers only participate in writing the final user manual",
        "ja": "テスターは最終的なユーザーマニュアルの作成にのみ関与する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong Agile, tester tham gia sớm vào các hoạt động như refinement/backlog grooming và sprint planning để cùng làm rõ yêu cầu, phát hiện mơ hồ hoặc rủi ro trước khi code được viết, khác với việc chỉ tham gia ở cuối chu trình như mô hình tuần tự.",
      "en": "In Agile, testers get involved early in activities like backlog refinement and sprint planning to clarify requirements and surface ambiguities or risks before code is written, unlike only joining at the end of the cycle as in the sequential model.",
      "ja": "アジャイルでは、テスターはバックログリファインメントやスプリントプランニングなどの活動に早期から関与し、コードが書かれる前に要件を明確化し、曖昧さやリスクを発見する。これは、順次モデルのようにサイクルの最後にのみ関与するのとは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phát biểu nào SAI khi nói về ảnh hưởng của mô hình vòng đời phát triển tới cách tổ chức kiểm thử?",
      "en": "Which statement is INCORRECT regarding how the software development lifecycle model influences the way testing is organized?",
      "ja": "ソフトウェア開発ライフサイクルモデルがテストの組織方法に与える影響について、誤っている記述はどれですか。"
    },
    "options": [
      {
        "vi": "Mô hình vòng đời ảnh hưởng đến thời điểm, tần suất và mức độ chi tiết của các hoạt động kiểm thử",
        "en": "The lifecycle model influences the timing, frequency, and level of detail of testing activities",
        "ja": "ライフサイクルモデルはテスト活動のタイミング、頻度、詳細度に影響を与える"
      },
      {
        "vi": "Mô hình vòng đời có thể ảnh hưởng đến việc tài liệu kiểm thử được viết chi tiết hay gọn nhẹ",
        "en": "The lifecycle model can influence whether test documentation is written in detail or kept lightweight",
        "ja": "ライフサイクルモデルは、テスト文書を詳細に書くか軽量に保つかに影響を与えることがある"
      },
      {
        "vi": "Mô hình vòng đời hoàn toàn không có bất kỳ ảnh hưởng nào tới kiểm thử, kiểm thử luôn được thực hiện theo đúng một cách duy nhất trong mọi dự án",
        "en": "The lifecycle model has absolutely no influence on testing whatsoever; testing is always carried out in exactly the same single way in every project",
        "ja": "ライフサイクルモデルはテストに一切影響を与えず、テストはあらゆるプロジェクトにおいて常にただ一つの同じ方法で行われる"
      },
      {
        "vi": "Bất kể mô hình vòng đời nào được áp dụng, nguyên tắc kiểm thử cơ bản (như kiểm thử sớm, phát hiện dồn cụm khiếm khuyết) vẫn có giá trị áp dụng, chỉ khác cách triển khai cụ thể",
        "en": "Regardless of the lifecycle model applied, fundamental testing principles (such as early testing) still apply in value, only differing in how they are concretely implemented",
        "ja": "どのライフサイクルモデルが採用されるかに関係なく、基本的なテスト原則(早期テストなど)は価値として適用され続け、具体的な実装方法のみが異なる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trên thực tế, mô hình vòng đời có ảnh hưởng rõ rệt tới thời điểm, tần suất, mức độ tài liệu hóa và cách tổ chức kiểm thử; phát biểu cho rằng nó không có ảnh hưởng gì là sai với kiến thức nền tảng của syllabus.",
      "en": "In reality, the lifecycle model clearly influences the timing, frequency, documentation level, and organization of testing; the statement claiming it has no influence at all contradicts foundational syllabus knowledge.",
      "ja": "実際には、ライフサイクルモデルはテストのタイミング、頻度、文書化のレベル、組織方法に明確な影響を与える。まったく影響がないとする記述は、シラバスの基礎知識と矛盾している。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong một dự án áp dụng mô hình lai (hybrid) kết hợp giữa V-model và Agile (ví dụ: Water-Scrum-Fall), điều gì thường xảy ra với hoạt động kiểm thử?",
      "en": "In a project using a hybrid model combining the V-model and Agile (e.g., Water-Scrum-Fall), what typically happens with testing activities?",
      "ja": "Vモデルとアジャイルを組み合わせたハイブリッドモデル(例:ウォーター・スクラム・フォール)を採用するプロジェクトでは、テスト活動に通常何が起こりますか。"
    },
    "options": [
      {
        "vi": "Toàn bộ kiểm thử bị loại bỏ vì hai mô hình xung đột nhau hoàn toàn",
        "en": "All testing is eliminated because the two models completely conflict with each other",
        "ja": "2つのモデルが完全に矛盾するためテストがすべて廃止される"
      },
      {
        "vi": "Không cần lập bất kỳ kế hoạch kiểm thử nào trong mô hình lai",
        "en": "No test planning whatsoever is needed in a hybrid model",
        "ja": "ハイブリッドモデルではテスト計画は一切不要である"
      },
      {
        "vi": "Kiểm thử chỉ được phép thực hiện bởi khách hàng cuối cùng, không có nhóm kiểm thử nội bộ",
        "en": "Testing is allowed to be performed only by the end customer, with no internal test team",
        "ja": "テストはエンドカスタマーのみによって実施され、社内テストチームは存在しない"
      },
      {
        "vi": "Một số giai đoạn (như thu thập yêu cầu, triển khai) vẫn theo cách tuần tự, trong khi phần phát triển và kiểm thử ở giữa được thực hiện theo các sprint lặp, đòi hỏi nhóm kiểm thử phải linh hoạt thích nghi với cả hai cách tổ chức",
        "en": "Some phases (such as requirements gathering and deployment) remain sequential, while the development and testing in between are carried out in iterative sprints, requiring the test team to flexibly adapt to both organizational styles",
        "ja": "要件収集やデプロイなど一部のフェーズは順次的なままである一方、その間の開発とテストは反復的なスプリントで行われ、テストチームは両方の組織形態に柔軟に適応する必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mô hình lai như Water-Scrum-Fall thường giữ các đầu và cuối dự án (yêu cầu, triển khai) theo cách tuần tự truyền thống, còn phần giữa (phát triển/kiểm thử) tổ chức theo sprint Agile; điều này đòi hỏi đội kiểm thử phải phối hợp linh hoạt giữa hai phong cách làm việc.",
      "en": "Hybrid models like Water-Scrum-Fall often keep the project's beginning and end (requirements, deployment) in a traditional sequential style, while the middle (development/testing) is organized into Agile sprints; this requires the test team to flexibly coordinate between the two working styles.",
      "ja": "ウォーター・スクラム・フォールのようなハイブリッドモデルでは、プロジェクトの始めと終わり(要件、デプロイ)は従来の順次スタイルのままであることが多く、中間部分(開発・テスト)はアジャイルのスプリントとして組織される。これにより、テストチームは2つの働き方の間で柔軟に調整する必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình phát triển tuần tự, nếu một lỗi nghiêm trọng trong đặc tả yêu cầu chỉ được phát hiện ở giai đoạn kiểm thử hệ thống, điều gì thường xảy ra?",
      "en": "In the sequential development model, if a serious defect in the requirements specification is only discovered during the system testing phase, what typically happens?",
      "ja": "順次開発モデルにおいて、要件仕様書の重大な欠陥がシステムテスト段階になって初めて発見された場合、通常何が起こりますか。"
    },
    "options": [
      {
        "vi": "Chi phí và thời gian sửa lỗi thường cao hơn nhiều so với việc phát hiện ngay ở giai đoạn thu thập yêu cầu, vì nhiều công đoạn phát triển đã được xây dựng dựa trên yêu cầu sai",
        "en": "The cost and time to fix it are typically much higher than if it had been caught during requirements gathering, because much of the development has already been built on the flawed requirement",
        "ja": "すでに多くの開発工程が誤った要件を基に構築されているため、要件収集段階で発見した場合に比べて修正のコストと時間ははるかに高くなる傾向がある"
      },
      {
        "vi": "Không có ảnh hưởng gì vì mô hình tuần tự cho phép sửa lỗi miễn phí ở bất kỳ giai đoạn nào",
        "en": "There is no impact because the sequential model allows free fixes at any stage",
        "ja": "順次モデルはどの段階でも無償で修正できるため影響はない"
      },
      {
        "vi": "Dự án sẽ tự động chuyển sang mô hình Agile để xử lý lỗi",
        "en": "The project automatically switches to an Agile model to handle the defect",
        "ja": "プロジェクトは自動的にアジャイルモデルに切り替えて欠陥に対応する"
      },
      {
        "vi": "Lỗi này sẽ bị bỏ qua hoàn toàn vì đã quá muộn để sửa trong mô hình tuần tự",
        "en": "The defect is simply ignored entirely because it is too late to fix in the sequential model",
        "ja": "順次モデルでは修正するには手遅れであるため、その欠陥は完全に無視される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đặc trưng của mô hình tuần tự là các giai đoạn phụ thuộc nối tiếp nhau; lỗi trong yêu cầu phát hiện muộn (ở giai đoạn kiểm thử) đòi hỏi phải quay lại sửa nhiều công đoạn thiết kế, code đã hoàn thành dựa trên yêu cầu sai, khiến chi phí và thời gian sửa tăng đáng kể.",
      "en": "A defining trait of the sequential model is that phases depend on one another sequentially; a requirement defect discovered late (during testing) requires reworking design and code already completed based on the flawed requirement, significantly increasing cost and time to fix.",
      "ja": "順次モデルの特徴は、各フェーズが連続して依存し合っていることである。要件の欠陥が(テスト段階で)遅く発見されると、誤った要件に基づいてすでに完成した設計やコードを手直しする必要があり、修正のコストと時間が大幅に増加する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử thành phần (component testing) tập trung kiểm tra đối tượng nào?",
      "en": "What is the primary test object of component testing?",
      "ja": "コンポーネントテストの主なテスト対象は何ですか。"
    },
    "options": [
      {
        "vi": "Toàn bộ hệ thống đã tích hợp hoàn chỉnh",
        "en": "The entire fully integrated system",
        "ja": "完全に統合されたシステム全体"
      },
      {
        "vi": "Từng module, lớp hoặc hàm riêng lẻ, tách biệt với phần còn lại của hệ thống",
        "en": "Individual modules, classes, or functions in isolation from the rest of the system",
        "ja": "システムの他部分から切り離された個々のモジュール、クラス、関数"
      },
      {
        "vi": "Sự tương tác giữa nhiều hệ thống bên ngoài",
        "en": "Interactions between multiple external systems",
        "ja": "複数の外部システム間の相互作用"
      },
      {
        "vi": "Quy trình nghiệp vụ của người dùng cuối",
        "en": "End-user business processes",
        "ja": "エンドユーザーの業務プロセス"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử thành phần kiểm tra từng đơn vị nhỏ nhất của phần mềm (hàm, lớp, module) một cách riêng lẻ, thường dùng stub/driver để giả lập các phần chưa sẵn sàng.",
      "en": "Component testing verifies the smallest testable units of software in isolation, often using stubs/drivers to simulate parts not yet available.",
      "ja": "コンポーネントテストはソフトウェアの最小単位を個別に検証し、未完成の部分をスタブやドライバでシミュレートすることが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ai thường chịu trách nhiệm thực hiện kiểm thử thành phần trong nhiều tổ chức phát triển phần mềm?",
      "en": "Who typically performs component testing in many software development organizations?",
      "ja": "多くのソフトウェア開発組織で、コンポーネントテストを実施するのは通常誰ですか。"
    },
    "options": [
      {
        "vi": "Khách hàng sử dụng sản phẩm cuối cùng",
        "en": "The end customers using the final product",
        "ja": "最終製品を使用する顧客"
      },
      {
        "vi": "Ban quản lý dự án",
        "en": "Project management board",
        "ja": "プロジェクト管理委員会"
      },
      {
        "vi": "Lập trình viên viết ra đoạn code đó",
        "en": "The developer who wrote the code",
        "ja": "そのコードを書いた開発者"
      },
      {
        "vi": "Bộ phận pháp chế của công ty",
        "en": "The company's legal department",
        "ja": "会社の法務部門"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì cần hiểu chi tiết mã nguồn, kiểm thử thành phần thường do chính lập trình viên thực hiện, đôi khi có sự hỗ trợ của tester.",
      "en": "Because deep code knowledge is needed, component testing is usually performed by the developer who wrote the code, sometimes with tester support.",
      "ja": "コードの詳細な理解が必要なため、コンポーネントテストは通常そのコードを書いた開発者自身が行い、時にテスターの支援を受ける。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục tiêu chính của kiểm thử tích hợp (integration testing) là gì?",
      "en": "What is the main objective of integration testing?",
      "ja": "統合テストの主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Xác nhận hợp đồng pháp lý giữa nhà cung cấp và khách hàng",
        "en": "To confirm the legal contract between vendor and customer",
        "ja": "ベンダーと顧客間の法的契約を確認すること"
      },
      {
        "vi": "Đánh giá xem tài liệu yêu cầu có đầy đủ hay không",
        "en": "To assess whether the requirements documentation is complete",
        "ja": "要件ドキュメントが完全かどうかを評価すること"
      },
      {
        "vi": "Kiểm tra cú pháp của từng dòng lệnh trong mã nguồn",
        "en": "To check the syntax of every line of source code",
        "ja": "ソースコードの各行の構文をチェックすること"
      },
      {
        "vi": "Phát hiện lỗi trong giao diện và tương tác giữa các thành phần hoặc hệ thống đã tích hợp",
        "en": "To find defects in the interfaces and interactions between integrated components or systems",
        "ja": "統合されたコンポーネントやシステム間のインターフェースや相互作用の欠陥を発見すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử tích hợp tập trung vào lỗi xảy ra khi các thành phần hoặc hệ thống được ghép nối với nhau, đặc biệt là ở giao diện giữa chúng.",
      "en": "Integration testing focuses on defects that arise when components or systems are combined, especially at their interfaces.",
      "ja": "統合テストはコンポーネントやシステムが結合される際に生じる欠陥、特にインターフェース部分の欠陥に焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong chiến lược tích hợp \"big bang\", các thành phần được ghép nối như thế nào?",
      "en": "In the \"big bang\" integration strategy, how are components combined?",
      "ja": "「ビッグバン」統合戦略では、コンポーネントはどのように結合されますか。"
    },
    "options": [
      {
        "vi": "Tất cả thành phần được tích hợp cùng một lúc rồi kiểm thử toàn bộ hệ thống",
        "en": "All components are integrated simultaneously and then tested as a whole",
        "ja": "すべてのコンポーネントが同時に統合され、まとめてテストされる"
      },
      {
        "vi": "Từng thành phần được thêm vào theo thứ tự từ dưới lên trên",
        "en": "Components are added one at a time in a bottom-up order",
        "ja": "コンポーネントはボトムアップの順序で1つずつ追加される"
      },
      {
        "vi": "Từng thành phần được thêm vào theo thứ tự từ trên xuống dưới",
        "en": "Components are added one at a time in a top-down order",
        "ja": "コンポーネントはトップダウンの順序で1つずつ追加される"
      },
      {
        "vi": "Chỉ tích hợp các thành phần có mức độ rủi ro thấp trước",
        "en": "Only low-risk components are integrated first",
        "ja": "リスクの低いコンポーネントのみ先に統合される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Big bang integration là cách tích hợp tất cả thành phần cùng lúc, khác với các cách tăng dần như top-down hay bottom-up; nhược điểm là khó xác định vị trí lỗi.",
      "en": "Big bang integration combines all components at once, unlike incremental approaches like top-down or bottom-up; a drawback is difficulty locating defects.",
      "ja": "ビッグバン統合はすべてのコンポーネントを一度に結合する方式で、トップダウンやボトムアップのような段階的手法とは異なり、欠陥の特定が難しいという欠点がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử hệ thống (system testing) chủ yếu quan tâm đến điều gì?",
      "en": "What is system testing primarily concerned with?",
      "ja": "システムテストは主に何に関心を持ちますか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm tra một hàm đơn lẻ trong mã nguồn",
        "en": "Only checking a single function within the source code",
        "ja": "ソースコード内の単一の関数のみをチェックすること"
      },
      {
        "vi": "Hành vi và khả năng tổng thể của toàn bộ hệ thống tích hợp hoàn chỉnh",
        "en": "The overall behavior and capabilities of the entire, complete, integrated system",
        "ja": "完全に統合されたシステム全体の動作と機能性"
      },
      {
        "vi": "Chỉ kiểm tra giao diện giữa hai module liền kề",
        "en": "Only checking the interface between two adjacent modules",
        "ja": "隣接する2つのモジュール間のインターフェースのみをチェックすること"
      },
      {
        "vi": "Chỉ đánh giá hợp đồng bảo trì sau bàn giao",
        "en": "Only evaluating the maintenance contract after handover",
        "ja": "引き渡し後の保守契約のみを評価すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử hệ thống đánh giá hệ thống hoàn chỉnh trong môi trường gần giống thực tế, bao gồm cả chức năng lẫn phi chức năng theo yêu cầu.",
      "en": "System testing evaluates the complete system in an environment resembling production, covering both functional and non-functional requirements.",
      "ja": "システムテストは本番に近い環境で完全なシステムを評価し、機能要件と非機能要件の両方を対象とする。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đội ngũ nào thường thực hiện kiểm thử hệ thống một cách độc lập với đội phát triển?",
      "en": "Which team typically performs system testing independently from the development team?",
      "ja": "開発チームから独立してシステムテストを実施することが多いのはどのチームですか。"
    },
    "options": [
      {
        "vi": "Người dùng cuối chưa từng biết đến sản phẩm",
        "en": "End users who have never known the product",
        "ja": "製品を全く知らないエンドユーザー"
      },
      {
        "vi": "Bộ phận kế toán của công ty",
        "en": "The company's accounting department",
        "ja": "会社の経理部門"
      },
      {
        "vi": "Đội kiểm thử độc lập hoặc nhóm QA chuyên trách",
        "en": "An independent test team or dedicated QA group",
        "ja": "独立したテストチームまたは専任のQAグループ"
      },
      {
        "vi": "Nhà cung cấp phần cứng bên thứ ba",
        "en": "A third-party hardware vendor",
        "ja": "第三者のハードウェアベンダー"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Để đảm bảo tính khách quan, kiểm thử hệ thống thường do đội kiểm thử độc lập hoặc nhóm QA thực hiện, tách biệt với những người viết code.",
      "en": "To ensure objectivity, system testing is usually carried out by an independent test team or QA group, separate from those who wrote the code.",
      "ja": "客観性を確保するため、システムテストはコードを書いた人とは別の独立したテストチームやQAグループが実施することが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chấp nhận (acceptance testing) thường được thực hiện với mục tiêu gì?",
      "en": "What is the typical goal of acceptance testing?",
      "ja": "受け入れテストの一般的な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho kiểm thử hệ thống",
        "en": "To completely replace system testing",
        "ja": "システムテストを完全に置き換えること"
      },
      {
        "vi": "Tìm lỗi cú pháp trong mã nguồn ở mức đơn vị",
        "en": "To find syntax errors in source code at the unit level",
        "ja": "単体レベルのソースコード構文エラーを見つけること"
      },
      {
        "vi": "Kiểm tra giao diện giữa hai lớp (class) nội bộ",
        "en": "To check the interface between two internal classes",
        "ja": "2つの内部クラス間のインターフェースをチェックすること"
      },
      {
        "vi": "Xác lập sự tin tưởng rằng hệ thống đáp ứng nhu cầu người dùng, quy trình nghiệp vụ và sẵn sàng bàn giao",
        "en": "To establish confidence that the system meets user needs, business processes, and is ready for delivery",
        "ja": "システムがユーザーのニーズや業務プロセスを満たし、引き渡し準備が整っていることへの信頼を確立すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử chấp nhận là bước cuối nhằm xác nhận hệ thống đủ điều kiện để khách hàng/người dùng chấp nhận và đưa vào sử dụng.",
      "en": "Acceptance testing is the final stage confirming the system is fit for the customer/user to accept and put into use.",
      "ja": "受け入れテストは、顧客・ユーザーがシステムを受け入れて使用可能とする最終段階の確認である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong bối cảnh phát triển nội bộ (custom development), ai thường là người thực hiện kiểm thử chấp nhận?",
      "en": "In a custom (bespoke) development context, who typically performs acceptance testing?",
      "ja": "カスタム(受注)開発の文脈では、通常誰が受け入れテストを実施しますか。"
    },
    "options": [
      {
        "vi": "Khách hàng hoặc đại diện người dùng nghiệp vụ",
        "en": "The customer or representative business users",
        "ja": "顧客または業務ユーザーの代表者"
      },
      {
        "vi": "Chỉ có lập trình viên tự kiểm tra mã của mình",
        "en": "Only the developer testing their own code",
        "ja": "自分のコードを自分でテストする開発者のみ"
      },
      {
        "vi": "Chỉ bộ phận marketing của công ty phát triển",
        "en": "Only the marketing department of the developing company",
        "ja": "開発会社のマーケティング部門のみ"
      },
      {
        "vi": "Chỉ đội DevOps phụ trách hạ tầng server",
        "en": "Only the DevOps team responsible for server infrastructure",
        "ja": "サーバーインフラを担当するDevOpsチームのみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Với phần mềm đặt hàng riêng, khách hàng hoặc người dùng nghiệp vụ đại diện thường thực hiện kiểm thử chấp nhận để xác nhận hệ thống đáp ứng nhu cầu thực tế.",
      "en": "For custom-developed software, the customer or representative business users typically perform acceptance testing to confirm the system meets real needs.",
      "ja": "受注開発ソフトウェアでは、顧客または業務ユーザーの代表者が実際のニーズを満たしているか確認するために受け入れテストを実施することが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Alpha testing được thực hiện ở đâu và bởi ai theo mô tả điển hình trong ISTQB?",
      "en": "According to a typical ISTQB description, where and by whom is alpha testing performed?",
      "ja": "ISTQBの典型的な説明によると、アルファテストはどこで誰によって実施されますか。"
    },
    "options": [
      {
        "vi": "Tại môi trường sản xuất thực tế, bởi khách hàng cuối bên ngoài công ty",
        "en": "In the live production environment, by external end customers",
        "ja": "実際の本番環境で、社外のエンドユーザーによって"
      },
      {
        "vi": "Tại cơ sở của nhà phát triển, thường bởi người dùng nội bộ tiềm năng hoặc nhóm độc lập nội bộ",
        "en": "At the developer's site, typically by potential internal users or an independent internal team",
        "ja": "開発者の拠点で、通常は潜在的な社内ユーザーや社内の独立チームによって"
      },
      {
        "vi": "Chỉ do máy chủ CI/CD tự động thực hiện không cần con người",
        "en": "Only automatically by a CI/CD server without any human involvement",
        "ja": "人の関与なくCI/CDサーバーによって自動的にのみ"
      },
      {
        "vi": "Tại tòa án, bởi luật sư của hai bên hợp đồng",
        "en": "In a courtroom, by lawyers of both contracting parties",
        "ja": "法廷で、契約両当事者の弁護士によって"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Alpha testing thường diễn ra tại cơ sở của nhà phát triển, do người dùng tiềm năng hoặc nhóm kiểm thử độc lập nội bộ thực hiện, trước khi phần mềm ra ngoài công ty.",
      "en": "Alpha testing typically takes place at the developer's site, performed by potential users or an independent internal test team, before the software goes external.",
      "ja": "アルファテストは通常、開発者の拠点で、潜在的なユーザーや社内の独立したテストチームによって、ソフトウェアが社外に出る前に実施される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Beta testing (hay field testing) khác Alpha testing chủ yếu ở điểm nào?",
      "en": "How does beta testing (or field testing) primarily differ from alpha testing?",
      "ja": "ベータテスト(フィールドテスト)はアルファテストと主にどう違いますか。"
    },
    "options": [
      {
        "vi": "Beta testing luôn diễn ra trước khi có bản build đầu tiên",
        "en": "Beta testing always happens before the first build exists",
        "ja": "ベータテストは常に最初のビルドが存在する前に行われる"
      },
      {
        "vi": "Beta testing chỉ kiểm tra một hàm đơn lẻ trong mã nguồn",
        "en": "Beta testing only checks a single function in the source code",
        "ja": "ベータテストはソースコード内の単一の関数のみをチェックする"
      },
      {
        "vi": "Beta testing được thực hiện tại môi trường của khách hàng/người dùng thực bên ngoài công ty phát triển",
        "en": "Beta testing is performed in the environment of real customers/users outside the developing company",
        "ja": "ベータテストは開発会社の外にいる実際の顧客・ユーザーの環境で実施される"
      },
      {
        "vi": "Beta testing không bao giờ liên quan đến người dùng thực",
        "en": "Beta testing never involves real users",
        "ja": "ベータテストは実際のユーザーを決して関与させない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khác với alpha testing diễn ra nội bộ, beta testing được thực hiện bởi khách hàng/người dùng tiềm năng tại địa điểm của họ, thường trước khi phát hành chính thức.",
      "en": "Unlike alpha testing which happens internally, beta testing is conducted by potential customers/users at their own sites, usually before official release.",
      "ja": "社内で行われるアルファテストと異なり、ベータテストは潜在顧客・ユーザーが自分たちの場所で、通常は正式リリース前に実施する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chấp nhận vận hành (operational acceptance testing) tập trung đánh giá điều gì?",
      "en": "What does operational acceptance testing primarily evaluate?",
      "ja": "運用受け入れテストは主に何を評価しますか。"
    },
    "options": [
      {
        "vi": "Chỉ đo thời gian biên dịch mã nguồn",
        "en": "Only measuring source code compile time",
        "ja": "ソースコードのコンパイル時間のみを測定すること"
      },
      {
        "vi": "Chỉ kiểm tra tính đúng đắn của một thuật toán sắp xếp",
        "en": "Only checking the correctness of a sorting algorithm",
        "ja": "ソートアルゴリズムの正しさのみをチェックすること"
      },
      {
        "vi": "Chỉ kiểm tra giao diện lập trình ứng dụng (API) nội bộ",
        "en": "Only checking an internal application programming interface (API)",
        "ja": "内部のアプリケーションプログラミングインターフェース(API)のみをチェックすること"
      },
      {
        "vi": "Các khía cạnh vận hành như sao lưu/khôi phục, khả năng bảo trì, đào tạo, và quy trình vận hành hệ thống",
        "en": "Operational aspects such as backup/restore, maintainability, training, and operational procedures",
        "ja": "バックアップ/リストア、保守性、トレーニング、運用手順などの運用面"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử chấp nhận vận hành (còn gọi là kiểm thử sẵn sàng sản xuất) đánh giá khả năng đội vận hành có thể duy trì hệ thống trong môi trường thực tế.",
      "en": "Operational acceptance testing (also called production readiness testing) evaluates whether operations staff can maintain the system in a real environment.",
      "ja": "運用受け入れテスト(本番準備テストとも呼ばれる)は、運用担当者が実環境でシステムを維持できるかを評価する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chấp nhận theo hợp đồng (contractual acceptance testing) được thực hiện dựa trên cơ sở nào?",
      "en": "Contractual acceptance testing is performed against what basis?",
      "ja": "契約受け入れテストは何に基づいて実施されますか。"
    },
    "options": [
      {
        "vi": "Các tiêu chí chấp nhận đã được thỏa thuận và ghi trong hợp đồng giữa các bên",
        "en": "Acceptance criteria agreed upon and documented in a contract between parties",
        "ja": "当事者間の契約に合意・記載された受け入れ基準"
      },
      {
        "vi": "Sở thích cá nhân của một lập trình viên bất kỳ",
        "en": "The personal preference of any individual developer",
        "ja": "任意の開発者個人の好み"
      },
      {
        "vi": "Kết quả kiểm thử thành phần duy nhất",
        "en": "The results of component testing alone",
        "ja": "コンポーネントテストの結果のみ"
      },
      {
        "vi": "Số lượng dòng code đã viết",
        "en": "The number of lines of code written",
        "ja": "記述されたコード行数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Contractual acceptance testing kiểm tra hệ thống dựa trên các tiêu chí chấp nhận đã thống nhất trong hợp đồng, thường áp dụng cho phần mềm gia công.",
      "en": "Contractual acceptance testing checks the system against acceptance criteria agreed in a contract, typically for custom-developed software.",
      "ja": "契約受け入れテストは契約で合意された受け入れ基準に基づいてシステムを検証し、主に受注開発ソフトウェアに適用される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chấp nhận theo quy định (regulatory acceptance testing) nhằm mục đích gì?",
      "en": "What is the purpose of regulatory acceptance testing?",
      "ja": "規制受け入れテストの目的は何ですか。"
    },
    "options": [
      {
        "vi": "Kiểm tra tốc độ tải trang chủ của website",
        "en": "To check the loading speed of a website homepage",
        "ja": "ウェブサイトのホームページの読み込み速度をチェックすること"
      },
      {
        "vi": "Xác nhận phần mềm tuân thủ các quy định pháp lý hoặc an toàn liên quan (ví dụ: y tế, tài chính)",
        "en": "To confirm the software complies with relevant legal or safety regulations (e.g., medical, financial)",
        "ja": "ソフトウェアが関連する法規制や安全規制(医療、金融など)に準拠していることを確認すること"
      },
      {
        "vi": "Đánh giá năng suất làm việc của lập trình viên",
        "en": "To assess the productivity of developers",
        "ja": "開発者の生産性を評価すること"
      },
      {
        "vi": "Thay thế kiểm thử hệ thống trong mọi trường hợp",
        "en": "To replace system testing in all cases",
        "ja": "あらゆる場合にシステムテストを置き換えること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Regulatory acceptance testing kiểm tra sự tuân thủ với luật pháp, quy định của chính phủ hoặc ngành, thường bắt buộc trong lĩnh vực y tế, hàng không, tài chính.",
      "en": "Regulatory acceptance testing checks conformance with government or industry regulations, often mandatory in sectors like healthcare, aviation, or finance.",
      "ja": "規制受け入れテストは、政府や業界の規制への準拠を確認するもので、医療・航空・金融などの分野でしばしば義務付けられる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình chữ V, kiểm thử thành phần thường tương ứng với hoạt động phát triển nào?",
      "en": "In the V-model, component testing typically corresponds to which development activity?",
      "ja": "V字モデルにおいて、コンポーネントテストは通常どの開発活動に対応しますか。"
    },
    "options": [
      {
        "vi": "Thiết kế kiến trúc hệ thống tổng thể",
        "en": "Overall system architecture design",
        "ja": "システム全体のアーキテクチャ設計"
      },
      {
        "vi": "Phân tích yêu cầu nghiệp vụ",
        "en": "Business requirements analysis",
        "ja": "業務要件分析"
      },
      {
        "vi": "Thiết kế thành phần (component/detailed design)",
        "en": "Component (detailed) design",
        "ja": "コンポーネント(詳細)設計"
      },
      {
        "vi": "Ký kết hợp đồng với khách hàng",
        "en": "Signing the contract with the customer",
        "ja": "顧客との契約締結"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong mô hình chữ V, mỗi mức kiểm thử tương ứng với một mức thiết kế/phát triển: kiểm thử thành phần đối chiếu với thiết kế chi tiết của từng thành phần.",
      "en": "In the V-model, each test level maps to a corresponding development level: component testing maps to detailed design of each component.",
      "ja": "V字モデルでは各テストレベルが対応する開発レベルに対応しており、コンポーネントテストは各コンポーネントの詳細設計に対応する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong mô hình chữ V, kiểm thử chấp nhận thường tương ứng với giai đoạn nào ở nhánh trái?",
      "en": "In the V-model, acceptance testing typically corresponds to which stage on the left branch?",
      "ja": "V字モデルにおいて、受け入れテストは左側のどの段階に対応しますか。"
    },
    "options": [
      {
        "vi": "Đặt tên biến trong mã nguồn",
        "en": "Naming variables in the source code",
        "ja": "ソースコード内の変数命名"
      },
      {
        "vi": "Viết mã nguồn chi tiết cho từng hàm",
        "en": "Writing detailed source code for each function",
        "ja": "各関数の詳細なソースコード記述"
      },
      {
        "vi": "Thiết kế cơ sở dữ liệu mức thấp",
        "en": "Low-level database design",
        "ja": "低レベルのデータベース設計"
      },
      {
        "vi": "Phân tích yêu cầu nghiệp vụ và người dùng",
        "en": "Business and user requirements analysis",
        "ja": "業務・ユーザー要件分析"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử chấp nhận đối chiếu với giai đoạn phân tích yêu cầu nghiệp vụ/người dùng, vì mục tiêu là xác nhận hệ thống đáp ứng đúng những yêu cầu đó.",
      "en": "Acceptance testing corresponds to the business/user requirements analysis stage, since its goal is to confirm the system meets those requirements.",
      "ja": "受け入れテストは業務・ユーザー要件分析段階に対応し、その目的はシステムがそれらの要件を満たしていることを確認することである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong tích hợp kiểu top-down, các thành phần cấp thấp chưa sẵn sàng thường được thay thế bằng gì?",
      "en": "In top-down integration, unavailable lower-level components are typically replaced with what?",
      "ja": "トップダウン統合では、未完成の下位レベルコンポーネントは通常何で代替されますか。"
    },
    "options": [
      {
        "vi": "Stub (mã giả lập tạm thời cho thành phần chưa hoàn thiện)",
        "en": "Stubs (temporary code simulating an unfinished component)",
        "ja": "スタブ(未完成のコンポーネントを模擬する一時的なコード)"
      },
      {
        "vi": "Driver (mã điều khiển gọi tới thành phần đang kiểm thử)",
        "en": "Drivers (code that calls the component under test)",
        "ja": "ドライバ(テスト対象コンポーネントを呼び出すコード)"
      },
      {
        "vi": "Tài liệu yêu cầu người dùng",
        "en": "User requirement documents",
        "ja": "ユーザー要件ドキュメント"
      },
      {
        "vi": "Bản hợp đồng bảo mật thông tin",
        "en": "A non-disclosure agreement",
        "ja": "秘密保持契約"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong tích hợp top-down, kiểm thử bắt đầu từ thành phần cấp cao, các thành phần cấp thấp chưa có sẽ được giả lập bằng stub.",
      "en": "In top-down integration, testing starts from high-level components; missing lower-level components are simulated using stubs.",
      "ja": "トップダウン統合では上位コンポーネントからテストを開始し、未完成の下位コンポーネントはスタブで模擬される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong tích hợp kiểu bottom-up, cần sử dụng gì để mô phỏng các thành phần cấp cao chưa tồn tại?",
      "en": "In bottom-up integration, what is used to simulate not-yet-existing higher-level components?",
      "ja": "ボトムアップ統合では、まだ存在しない上位コンポーネントを模擬するために何が使われますか。"
    },
    "options": [
      {
        "vi": "Stub (mã giả lập thành phần cấp thấp)",
        "en": "Stubs (code simulating a lower-level component)",
        "ja": "スタブ(下位コンポーネントを模擬するコード)"
      },
      {
        "vi": "Driver (mã điều khiển gọi thành phần cấp thấp đang kiểm thử)",
        "en": "Drivers (code that calls the lower-level component under test)",
        "ja": "ドライバ(テスト対象の下位コンポーネントを呼び出すコード)"
      },
      {
        "vi": "Test plan tổng thể của dự án",
        "en": "The project's overall test plan",
        "ja": "プロジェクト全体のテスト計画"
      },
      {
        "vi": "Bảng lương của đội phát triển",
        "en": "The development team's payroll",
        "ja": "開発チームの給与台帳"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong tích hợp bottom-up, kiểm thử bắt đầu từ thành phần cấp thấp, cần driver để giả lập lời gọi từ thành phần cấp cao chưa sẵn sàng.",
      "en": "In bottom-up integration, testing starts from low-level components, requiring drivers to simulate calls from unavailable higher-level components.",
      "ja": "ボトムアップ統合では下位コンポーネントからテストを開始し、未完成の上位コンポーネントからの呼び出しを模擬するためにドライバが必要となる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Nhận định nào sau đây về kiểm thử hệ thống là ĐÚNG?",
      "en": "Which of the following statements about system testing is CORRECT?",
      "ja": "システムテストに関する次の記述のうち正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử hệ thống không bao giờ xem xét các yêu cầu phi chức năng",
        "en": "System testing never considers non-functional requirements",
        "ja": "システムテストは非機能要件を考慮することは決してない"
      },
      {
        "vi": "Kiểm thử hệ thống chỉ cần thực hiện trên máy phát triển cục bộ của một lập trình viên",
        "en": "System testing only needs to be done on a single developer's local machine",
        "ja": "システムテストは一人の開発者のローカルマシンで行えば十分である"
      },
      {
        "vi": "Kiểm thử hệ thống nên được thực hiện trong môi trường mô phỏng gần giống môi trường sản xuất nhất có thể",
        "en": "System testing should be conducted in an environment that resembles the production environment as closely as possible",
        "ja": "システムテストは可能な限り本番環境に近い環境で実施すべきである"
      },
      {
        "vi": "Kiểm thử hệ thống luôn được thực hiện trước kiểm thử thành phần",
        "en": "System testing is always performed before component testing",
        "ja": "システムテストは常にコンポーネントテストより先に実施される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Để kết quả kiểm thử hệ thống phản ánh đúng thực tế vận hành, môi trường kiểm thử cần mô phỏng sát môi trường sản xuất về cấu hình, dữ liệu, tích hợp bên ngoài.",
      "en": "For system testing results to reflect real operation, the test environment should closely mirror production in configuration, data, and external integrations.",
      "ja": "システムテストの結果が実際の運用を正しく反映するには、テスト環境が構成・データ・外部連携の面で本番環境に近い必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một công ty phần mềm bán sản phẩm đóng gói hàng loạt (không phải phần mềm đặt hàng riêng) thường thực hiện kiểm thử chấp nhận bằng cách nào?",
      "en": "For mass-market off-the-shelf software (not bespoke), how is acceptance testing typically performed?",
      "ja": "受注開発ではなく大量販売用の既製ソフトウェアの場合、受け入れテストは通常どのように行われますか。"
    },
    "options": [
      {
        "vi": "Chỉ dựa vào kết quả kiểm thử tích hợp nội bộ",
        "en": "Relying solely on internal integration testing results",
        "ja": "社内の統合テスト結果のみに依存する"
      },
      {
        "vi": "Ký một hợp đồng riêng với từng khách hàng cá nhân trước khi phát hành",
        "en": "By signing an individual contract with every single customer before release",
        "ja": "リリース前に個々の顧客ごとに個別契約を締結することで"
      },
      {
        "vi": "Không bao giờ cần kiểm thử chấp nhận vì đã có kiểm thử thành phần",
        "en": "Never needed since component testing already covers it",
        "ja": "コンポーネントテストで十分なため決して必要ない"
      },
      {
        "vi": "Thông qua alpha và beta testing với nhóm người dùng tiềm năng đại diện cho thị trường",
        "en": "Through alpha and beta testing with groups of potential users representing the market",
        "ja": "市場を代表する潜在ユーザーグループによるアルファ・ベータテストを通じて"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì không có một khách hàng cụ thể để ký hợp đồng chấp nhận, phần mềm đóng gói thường dùng alpha/beta testing với người dùng tiềm năng để xác nhận mức độ sẵn sàng.",
      "en": "Since there is no single customer to sign an acceptance contract with, packaged software often uses alpha/beta testing with potential users to confirm readiness.",
      "ja": "受け入れ契約を結ぶ特定の顧客がいないため、パッケージソフトウェアは潜在ユーザーによるアルファ・ベータテストで準備状況を確認することが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phát biểu nào sau đây là SAI khi so sánh các cấp độ kiểm thử?",
      "en": "Which statement is INCORRECT when comparing test levels?",
      "ja": "テストレベルを比較する際、次のうち誤っている記述はどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử thành phần và kiểm thử chấp nhận luôn có cùng đối tượng kiểm thử và cùng người thực hiện",
        "en": "Component testing and acceptance testing always have identical test objects and identical testers",
        "ja": "コンポーネントテストと受け入れテストは常に同じテスト対象、同じ実施者を持つ"
      },
      {
        "vi": "Mỗi cấp độ kiểm thử có mục tiêu, đối tượng kiểm thử và người thực hiện riêng, có thể chồng lấn nhưng không hoàn toàn giống nhau",
        "en": "Each test level has its own objectives, test basis, and testers, which may overlap but are not entirely identical",
        "ja": "各テストレベルには独自の目的、テストベース、実施者があり、重複することはあるが完全に同一ではない"
      },
      {
        "vi": "Kiểm thử tích hợp có thể diễn ra giữa các thành phần hoặc giữa các hệ thống",
        "en": "Integration testing can occur between components or between systems",
        "ja": "統合テストはコンポーネント間またはシステム間で行われうる"
      },
      {
        "vi": "Các cấp độ kiểm thử có thể được tổ chức lại tùy theo ngữ cảnh và mô hình phát triển của dự án",
        "en": "Test levels may be organized differently depending on the project's context and development model",
        "ja": "テストレベルはプロジェクトのコンテキストや開発モデルに応じて異なる形で編成されることがある"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử thành phần (do lập trình viên, tập trung vào mã nguồn) và kiểm thử chấp nhận (do khách hàng/người dùng, tập trung vào nhu cầu nghiệp vụ) khác nhau rõ rệt về đối tượng và người thực hiện.",
      "en": "Component testing (by developers, focused on code) and acceptance testing (by customers/users, focused on business needs) clearly differ in test object and testers.",
      "ja": "コンポーネントテスト(開発者が実施しコードに焦点)と受け入れテスト(顧客・ユーザーが実施し業務ニーズに焦点)は、テスト対象と実施者が明確に異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi một nhóm tính năng mới được tích hợp vào hệ thống hiện có, loại kiểm thử nào thường được thực hiện để kiểm tra sự tương tác giữa tính năng mới và các module đã có?",
      "en": "When a new set of features is integrated into an existing system, which type of testing is typically performed to check interactions between the new feature and existing modules?",
      "ja": "新しい機能セットが既存システムに統合される際、新機能と既存モジュール間の相互作用をチェックするために通常実施されるテストの種類はどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử thành phần đơn lẻ trước khi ghép nối",
        "en": "Isolated component testing before any combination",
        "ja": "結合前の単独コンポーネントテスト"
      },
      {
        "vi": "Kiểm thử tích hợp",
        "en": "Integration testing",
        "ja": "統合テスト"
      },
      {
        "vi": "Kiểm thử chấp nhận theo hợp đồng",
        "en": "Contractual acceptance testing",
        "ja": "契約受け入れテスト"
      },
      {
        "vi": "Kiểm thử vận hành sau khi hệ thống đã lên production nhiều năm",
        "en": "Operational testing years after the system is already in production",
        "ja": "システムが本番稼働して何年も経った後の運用テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử tích hợp là cấp độ phù hợp để kiểm tra sự tương tác và giao diện khi các thành phần/tính năng mới được ghép nối với hệ thống hiện có.",
      "en": "Integration testing is the appropriate level to verify interactions and interfaces when new components/features are combined with an existing system.",
      "ja": "統合テストは、新しいコンポーネントや機能を既存システムと結合する際の相互作用やインターフェースを検証するのに適したレベルである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong dự án phát triển Agile, các cấp độ kiểm thử thành phần, tích hợp và hệ thống thường được tổ chức như thế nào?",
      "en": "In an Agile development project, how are component, integration, and system test levels typically organized?",
      "ja": "アジャイル開発プロジェクトでは、コンポーネント・統合・システムの各テストレベルは通常どのように編成されますか。"
    },
    "options": [
      {
        "vi": "Không bao giờ có kiểm thử tích hợp trong Agile",
        "en": "Integration testing never occurs in Agile",
        "ja": "アジャイルでは統合テストは決して行われない"
      },
      {
        "vi": "Luôn phải hoàn thành 100% kiểm thử hệ thống trước khi viết bất kỳ dòng code nào",
        "en": "System testing must always be 100% complete before a single line of code is written",
        "ja": "1行のコードを書く前にシステムテストを100%完了させなければならない"
      },
      {
        "vi": "Có thể được thực hiện lồng ghép, lặp lại liên tục trong từng sprint thay vì tách biệt tuần tự như mô hình thác nước",
        "en": "They may be interleaved and repeated continuously within each sprint rather than strictly sequential as in a waterfall model",
        "ja": "ウォーターフォールのように厳密に順序立てるのではなく、各スプリント内で重ね合わせながら継続的に繰り返されることがある"
      },
      {
        "vi": "Chỉ thực hiện kiểm thử chấp nhận, bỏ qua hoàn toàn các cấp độ khác",
        "en": "Only acceptance testing is performed, completely skipping other levels",
        "ja": "受け入れテストのみを実施し、他のレベルは完全に省略する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Trong các mô hình lặp/Agile, các cấp độ kiểm thử vẫn tồn tại nhưng được thực hiện đan xen, lặp lại liên tục qua các sprint thay vì theo trình tự cứng nhắc.",
      "en": "In iterative/Agile models, test levels still exist but are performed in an interleaved, continuously repeating manner across sprints rather than a rigid sequence.",
      "ja": "反復型・アジャイルモデルでもテストレベル自体は存在するが、厳密な順序ではなく各スプリントにわたって重ね合わさりながら継続的に繰り返される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục tiêu chính của kiểm thử người dùng (user acceptance testing - UAT) là gì?",
      "en": "What is the primary objective of user acceptance testing (UAT)?",
      "ja": "ユーザー受け入れテスト(UAT)の主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn kiểm thử thành phần và kiểm thử tích hợp",
        "en": "To completely replace component and integration testing",
        "ja": "コンポーネントテストと統合テストを完全に置き換えること"
      },
      {
        "vi": "Kiểm tra hiệu năng biên dịch của trình biên dịch",
        "en": "To check the performance of a compiler",
        "ja": "コンパイラの性能をチェックすること"
      },
      {
        "vi": "Đo tốc độ ghi log của hệ điều hành",
        "en": "To measure the operating system's log-writing speed",
        "ja": "OSのログ書き込み速度を測定すること"
      },
      {
        "vi": "Xác nhận hệ thống hỗ trợ công việc hàng ngày và quy trình nghiệp vụ của người dùng nghiệp vụ trong môi trường thực tế hoặc mô phỏng thực tế",
        "en": "To confirm the system supports business users' daily work and business processes in a real or realistic environment",
        "ja": "実際または実際に近い環境で、システムが業務ユーザーの日常業務や業務プロセスを支援できることを確認すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "UAT tập trung xác nhận rằng hệ thống thực sự đáp ứng nhu cầu công việc của người dùng nghiệp vụ, thường do chính người dùng thực hiện.",
      "en": "UAT focuses on confirming the system genuinely meets business users' work needs, typically performed by the business users themselves.",
      "ja": "UATは、システムが業務ユーザーの業務ニーズを実際に満たしているかを確認することに重点を置き、通常は業務ユーザー自身が実施する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chức năng (functional testing) tập trung kiểm tra điều gì của hệ thống?",
      "en": "What does functional testing primarily focus on evaluating in a system?",
      "ja": "機能テスト(functional testing)は主にシステムの何を検証することに重点を置いていますか?"
    },
    "options": [
      {
        "vi": "Hệ thống thực hiện đúng các chức năng theo yêu cầu đã đặc tả",
        "en": "Whether the system correctly performs the functions specified in the requirements",
        "ja": "システムが仕様に定められた機能を正しく実行するかどうか"
      },
      {
        "vi": "Hệ thống chạy nhanh dưới tải cao",
        "en": "Whether the system runs fast under heavy load",
        "ja": "高負荷時にシステムが高速に動作するかどうか"
      },
      {
        "vi": "Cấu trúc mã nguồn bên trong",
        "en": "The internal structure of the source code",
        "ja": "ソースコードの内部構造"
      },
      {
        "vi": "Giao diện có dễ dùng hay không",
        "en": "Whether the interface is easy to use",
        "ja": "インターフェースが使いやすいかどうか"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử chức năng kiểm tra \"hệ thống làm gì\" - có thực hiện đúng các chức năng đã yêu cầu hay không, khác với kiểm thử phi chức năng đánh giá \"hệ thống làm tốt đến đâu\".",
      "en": "Functional testing checks \"what the system does\" - whether it correctly performs the required functions, as opposed to non-functional testing which evaluates \"how well the system performs\".",
      "ja": "機能テストは「システムが何をするか」、つまり要求された機能を正しく実行するかどうかを検証します。一方、非機能テストは「システムがどれだけうまく動作するか」を評価する点で異なります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong các loại kiểm thử phi chức năng, loại nào đánh giá khả năng hệ thống hoạt động cùng với các hệ thống hoặc thành phần khác?",
      "en": "Among non-functional testing types, which one evaluates a system's ability to work together with other systems or components?",
      "ja": "非機能テストの種類の中で、システムが他のシステムやコンポーネントと連携して動作できるかを評価するのはどれですか?"
    },
    "options": [
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Kiểm thử khả năng tương tác (interoperability testing)",
        "en": "Interoperability testing",
        "ja": "相互運用性テスト(インターオペラビリティテスト)"
      },
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト(コンファメーションテスト)"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト(リグレッションテスト)"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Interoperability (khả năng tương tác) là thuộc tính phi chức năng đánh giá hệ thống có thể trao đổi và sử dụng thông tin với các hệ thống, thành phần khác hay không.",
      "en": "Interoperability is a non-functional quality attribute that evaluates whether a system can exchange and use information with other systems or components.",
      "ja": "相互運用性(インターオペラビリティ)は、システムが他のシステムやコンポーネントと情報を交換・利用できるかを評価する非機能特性です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử cấu trúc (structural testing / white-box testing) dựa trên yếu tố nào để thiết kế test case?",
      "en": "What does structural testing (white-box testing) base its test case design on?",
      "ja": "構造テスト(ホワイトボックステスト)はテストケース設計の際、何を基準にしますか?"
    },
    "options": [
      {
        "vi": "Yêu cầu nghiệp vụ của khách hàng",
        "en": "The customer's business requirements",
        "ja": "顧客の業務要件"
      },
      {
        "vi": "Trải nghiệm người dùng cuối",
        "en": "The end user's experience",
        "ja": "エンドユーザーの体験"
      },
      {
        "vi": "Cấu trúc bên trong của mã nguồn/kiến trúc hệ thống",
        "en": "The internal structure of the source code/system architecture",
        "ja": "ソースコードの内部構造やシステムアーキテクチャ"
      },
      {
        "vi": "Tài liệu đặc tả yêu cầu chức năng",
        "en": "The functional requirements specification document",
        "ja": "機能要求仕様書"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiểm thử cấu trúc dựa trên cấu trúc nội bộ như luồng điều khiển, mã nguồn, kiến trúc để thiết kế test case, khác với kiểm thử hộp đen dựa trên yêu cầu bên ngoài.",
      "en": "Structural testing designs test cases based on internal structures such as control flow, source code, and architecture, unlike black-box testing which is based on external requirements.",
      "ja": "構造テストは制御フロー、ソースコード、アーキテクチャといった内部構造に基づいてテストケースを設計します。外部の要求に基づくブラックボックステストとは異なります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục tiêu chính khi áp dụng kỹ thuật kiểm thử cấu trúc là gì?",
      "en": "What is the main goal of applying structural testing techniques?",
      "ja": "構造テスト技法を適用する主な目的は何ですか?"
    },
    "options": [
      {
        "vi": "Đảm bảo giao diện thân thiện",
        "en": "Ensuring a user-friendly interface",
        "ja": "ユーザーフレンドリーなインターフェースを確保すること"
      },
      {
        "vi": "Kiểm tra tốc độ phản hồi",
        "en": "Checking response speed",
        "ja": "応答速度を確認すること"
      },
      {
        "vi": "Xác nhận lỗi đã sửa đúng",
        "en": "Confirming a defect was fixed correctly",
        "ja": "欠陥が正しく修正されたことを確認すること"
      },
      {
        "vi": "Tăng độ phủ (coverage) đối với các phần tử cấu trúc như câu lệnh, nhánh trong mã nguồn",
        "en": "Increasing coverage of structural elements such as statements and branches in the source code",
        "ja": "ソースコード内のステートメントや分岐といった構造要素のカバレッジを高めること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử cấu trúc nhằm tăng mức độ bao phủ các phần tử cấu trúc mã nguồn (statement, branch...) để phát hiện lỗi logic trong luồng thực thi.",
      "en": "Structural testing aims to increase coverage of structural elements in the code (statements, branches, etc.) in order to detect logic errors in the execution flow.",
      "ja": "構造テストは、実行フローにおける論理的な誤りを検出するために、ステートメントや分岐などのコード構造要素のカバレッジを高めることを目的とします。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Điểm khác biệt cơ bản giữa kiểm thử hộp đen (black-box) và kiểm thử cấu trúc (white-box) là gì?",
      "en": "What is the fundamental difference between black-box testing and structural (white-box) testing?",
      "ja": "ブラックボックステストと構造(ホワイトボックス)テストの根本的な違いは何ですか?"
    },
    "options": [
      {
        "vi": "Black-box thiết kế test dựa trên đặc tả bên ngoài, white-box dựa trên cấu trúc nội bộ",
        "en": "Black-box designs tests based on external specifications, while white-box is based on internal structure",
        "ja": "ブラックボックスは外部仕様に基づいてテストを設計し、ホワイトボックスは内部構造に基づいて設計する"
      },
      {
        "vi": "Black-box chỉ dùng cho unit test, white-box chỉ dùng cho system test",
        "en": "Black-box is only used for unit testing, white-box only for system testing",
        "ja": "ブラックボックスは単体テストのみに使用され、ホワイトボックスはシステムテストのみに使用される"
      },
      {
        "vi": "Black-box không cần tester có kỹ năng",
        "en": "Black-box does not require skilled testers",
        "ja": "ブラックボックスはスキルを持つテスターを必要としない"
      },
      {
        "vi": "White-box không thể tự động hóa",
        "en": "White-box cannot be automated",
        "ja": "ホワイトボックスは自動化できない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Black-box xem hệ thống như hộp đen, kiểm tra đầu vào/đầu ra theo đặc tả; white-box nhìn vào cấu trúc, mã nguồn bên trong để thiết kế test.",
      "en": "Black-box testing treats the system as a black box, checking inputs/outputs against specifications; white-box testing looks at the internal structure and source code to design tests.",
      "ja": "ブラックボックステストはシステムをブラックボックスとして扱い、仕様に基づいて入出力を検証します。一方、ホワイトボックステストは内部構造やソースコードを見てテストを設計します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Confirmation testing (kiểm thử xác nhận) được thực hiện khi nào?",
      "en": "When is confirmation testing performed?",
      "ja": "確認テスト(コンファメーションテスト)はいつ実施されますか?"
    },
    "options": [
      {
        "vi": "Sau khi một defect được báo cáo lần đầu",
        "en": "After a defect is first reported",
        "ja": "欠陥が最初に報告された直後"
      },
      {
        "vi": "Sau khi lập trình viên sửa một defect, để xác nhận defect đó đã được khắc phục",
        "en": "After a developer fixes a defect, to confirm that the defect has been resolved",
        "ja": "開発者が欠陥を修正した後、その欠陥が解消されたことを確認するために実施する"
      },
      {
        "vi": "Trước khi bắt đầu dự án",
        "en": "Before the project begins",
        "ja": "プロジェクト開始前"
      },
      {
        "vi": "Trước khi viết test case",
        "en": "Before writing test cases",
        "ja": "テストケースを作成する前"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Confirmation testing chạy lại đúng test case đã phát hiện lỗi trước đó, nhằm xác nhận defect đã được sửa thành công.",
      "en": "Confirmation testing reruns the exact test case that previously found the defect, to confirm the defect has been successfully fixed.",
      "ja": "確認テストは、以前に欠陥を発見した際と同じテストケースを再実行し、その欠陥が正しく修正されたことを確認します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phát biểu nào phân biệt ĐÚNG giữa confirmation testing và regression testing?",
      "en": "Which statement CORRECTLY distinguishes confirmation testing from regression testing?",
      "ja": "確認テストと回帰テストの違いを正しく説明しているのはどれですか?"
    },
    "options": [
      {
        "vi": "Cả hai đều test lại chính xác defect đã sửa",
        "en": "Both retest exactly the same defect that was fixed",
        "ja": "どちらも修正された欠陥をそのまま再テストする"
      },
      {
        "vi": "Regression testing chỉ chạy một lần duy nhất",
        "en": "Regression testing is only ever run once",
        "ja": "回帰テストは一度だけ実施される"
      },
      {
        "vi": "Confirmation testing xác nhận defect cụ thể đã sửa; regression testing kiểm tra ảnh hưởng phụ lên các chức năng khác",
        "en": "Confirmation testing confirms a specific fixed defect; regression testing checks for side effects on other functionality",
        "ja": "確認テストは特定の修正済み欠陥を確認するもので、回帰テストは他の機能への副作用を検証するものである"
      },
      {
        "vi": "Confirmation testing luôn bao phủ toàn bộ hệ thống",
        "en": "Confirmation testing always covers the entire system",
        "ja": "確認テストは常にシステム全体をカバーする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Confirmation test tập trung vào đúng lỗi đã sửa; regression test có phạm vi rộng hơn, kiểm tra các chức năng liên quan có bị ảnh hưởng bởi thay đổi hay không.",
      "en": "Confirmation testing focuses specifically on the fixed defect, while regression testing has a broader scope, checking whether related functionality was affected by the change.",
      "ja": "確認テストは修正された欠陥そのものに焦点を当てますが、回帰テストはより広い範囲を対象とし、変更によって関連機能が影響を受けていないかを検証します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một team vừa thêm tính năng thanh toán mới vào ứng dụng. Ngoài kiểm thử tính năng mới, đội QA nên làm gì để đảm bảo các chức năng cũ như giỏ hàng, đăng nhập không bị ảnh hưởng?",
      "en": "A team just added a new payment feature to an app. Besides testing the new feature, what should QA do to ensure existing functionality like the cart and login isn't affected?",
      "ja": "あるチームがアプリに新しい決済機能を追加しました。新機能のテストに加え、QAチームはカートやログインなどの既存機能に影響がないことを確認するために何をすべきですか?"
    },
    "options": [
      {
        "vi": "Chờ người dùng phản hồi lỗi rồi mới kiểm tra",
        "en": "Wait for users to report bugs before checking",
        "ja": "ユーザーからのバグ報告を待ってから確認する"
      },
      {
        "vi": "Bỏ qua vì tính năng cũ đã test trước đó",
        "en": "Skip it since the old features were already tested before",
        "ja": "既存機能は以前にテスト済みなので省略する"
      },
      {
        "vi": "Chỉ test lại confirmation cho tính năng mới",
        "en": "Only run confirmation testing on the new feature",
        "ja": "新機能に対する確認テストのみを実施する"
      },
      {
        "vi": "Thực hiện regression testing trên các chức năng liên quan đã có",
        "en": "Perform regression testing on the existing related functionality",
        "ja": "既存の関連機能に対して回帰テストを実施する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi có thay đổi trong hệ thống, cần chạy regression testing để đảm bảo các chức năng hiện có không bị tác động tiêu cực bởi thay đổi mới.",
      "en": "Whenever there is a change in the system, regression testing should be run to ensure existing functionality is not negatively impacted by the new change.",
      "ja": "システムに変更が加わった場合、既存機能が新しい変更によって悪影響を受けていないことを確認するために回帰テストを実施する必要があります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Regression test suite thường được thiết kế để có thể làm gì, giúp tiết kiệm thời gian khi phải chạy lặp lại nhiều lần?",
      "en": "What is a regression test suite typically designed to support, in order to save time when it must be run repeatedly?",
      "ja": "回帰テストスイートは、何度も繰り返し実行する必要がある際に時間を節約するため、通常どのように設計されますか?"
    },
    "options": [
      {
        "vi": "Tự động hóa (automation)",
        "en": "Automation",
        "ja": "自動化(オートメーション)"
      },
      {
        "vi": "Chỉ chạy thủ công một lần rồi bỏ",
        "en": "Being run manually once and then discarded",
        "ja": "一度だけ手動で実行して破棄される"
      },
      {
        "vi": "Xóa sau mỗi lần release",
        "en": "Being deleted after every release",
        "ja": "リリースごとに削除される"
      },
      {
        "vi": "Chỉ áp dụng cho kiểm thử phi chức năng",
        "en": "Only applying to non-functional testing",
        "ja": "非機能テストにのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì phải chạy lại nhiều lần sau mỗi thay đổi, bộ test hồi quy là ứng viên lý tưởng để tự động hóa nhằm tiết kiệm công sức và thời gian.",
      "en": "Because it must be rerun many times after each change, the regression test suite is an ideal candidate for automation to save effort and time.",
      "ja": "変更のたびに何度も再実行する必要があるため、回帰テストスイートは労力と時間を節約するための自動化の理想的な対象です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi kiểm thử tính năng đăng nhập bằng cách nhập đúng/sai tài khoản-mật khẩu và kiểm tra kết quả trả về, đây là ví dụ của loại kiểm thử nào?",
      "en": "Testing the login feature by entering correct/incorrect account-password combinations and checking the returned result is an example of which type of testing?",
      "ja": "正しい/誤ったアカウント・パスワードを入力してその結果を確認するログイン機能のテストは、どのテストの例ですか?"
    },
    "options": [
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Kiểm thử khả năng tương thích",
        "en": "Compatibility testing",
        "ja": "互換性テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm tra hệ thống có thực hiện đúng chức năng đăng nhập theo yêu cầu (chấp nhận đúng, từ chối sai) là kiểm thử chức năng.",
      "en": "Checking whether the system correctly performs the login function as required (accepting valid credentials, rejecting invalid ones) is functional testing.",
      "ja": "システムが要求どおりにログイン機能を正しく実行するか(正しい情報を受け入れ、誤った情報を拒否するか)を確認するのは機能テストです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đo thời gian phản hồi của hệ thống khi có 1000 người dùng truy cập đồng thời thuộc loại kiểm thử nào?",
      "en": "Measuring a system's response time when 1000 users access it simultaneously falls under which type of testing?",
      "ja": "1000人のユーザーが同時にアクセスした際のシステムの応答時間を測定するのは、どのテストに該当しますか?"
    },
    "options": [
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Kiểm thử hiệu năng (performance testing) - một dạng kiểm thử phi chức năng",
        "en": "Performance testing - a type of non-functional testing",
        "ja": "性能テスト(パフォーマンステスト)- 非機能テストの一種"
      },
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đo thời gian phản hồi dưới tải là kiểm thử hiệu năng, một thuộc tính phi chức năng, đánh giá \"hệ thống hoạt động tốt như thế nào\" chứ không phải \"làm gì\".",
      "en": "Measuring response time under load is performance testing, a non-functional attribute that evaluates \"how well the system performs\" rather than \"what it does\".",
      "ja": "負荷時の応答時間測定は性能テストであり、「システムが何をするか」ではなく「どれだけうまく動作するか」を評価する非機能特性です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khảo sát mức độ dễ học, dễ sử dụng của giao diện phần mềm đối với người dùng mới là hoạt động của loại kiểm thử nào?",
      "en": "Surveying how easy a software interface is to learn and use for new users is an activity of which type of testing?",
      "ja": "新規ユーザーにとってソフトウェアのインターフェースがどれだけ学びやすく使いやすいかを調査するのは、どのテストの活動ですか?"
    },
    "options": [
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      },
      {
        "vi": "Usability testing (một dạng phi chức năng)",
        "en": "Usability testing (a type of non-functional testing)",
        "ja": "ユーザビリティテスト(非機能テストの一種)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Usability testing đánh giá tính dễ sử dụng, dễ học của giao diện - thuộc nhóm kiểm thử phi chức năng.",
      "en": "Usability testing evaluates how easy an interface is to use and learn - it belongs to the non-functional testing group.",
      "ja": "ユーザビリティテストはインターフェースの使いやすさ・学びやすさを評価するもので、非機能テストのグループに属します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm tra hệ thống có chống được tấn công SQL injection hay không là ví dụ của loại kiểm thử phi chức năng nào?",
      "en": "Checking whether a system can withstand SQL injection attacks is an example of which non-functional testing type?",
      "ja": "システムがSQLインジェクション攻撃を防げるかどうかを確認するのは、どの非機能テストの例ですか?"
    },
    "options": [
      {
        "vi": "Security testing",
        "en": "Security testing",
        "ja": "セキュリティテスト"
      },
      {
        "vi": "Portability testing",
        "en": "Portability testing",
        "ja": "移植性テスト(ポータビリティテスト)"
      },
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Security testing đánh giá khả năng bảo mật của hệ thống trước các mối đe dọa, tấn công như SQL injection.",
      "en": "Security testing evaluates a system's security against threats and attacks such as SQL injection.",
      "ja": "セキュリティテストは、SQLインジェクションのような脅威や攻撃に対するシステムの安全性を評価します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vì sao kiểm thử cấu trúc thường yêu cầu tester phải có kiến thức về lập trình?",
      "en": "Why does structural testing typically require testers to have programming knowledge?",
      "ja": "構造テストでは、なぜテスターにプログラミングの知識が求められることが多いのですか?"
    },
    "options": [
      {
        "vi": "Vì phải viết tài liệu yêu cầu",
        "en": "Because they must write requirements documents",
        "ja": "要求仕様書を作成する必要があるから"
      },
      {
        "vi": "Vì cần thiết kế test case dựa trên hiểu biết về mã nguồn, luồng điều khiển bên trong",
        "en": "Because test cases must be designed based on an understanding of the source code and internal control flow",
        "ja": "ソースコードや内部の制御フローに対する理解に基づいてテストケースを設計する必要があるから"
      },
      {
        "vi": "Vì cần đo thời gian phản hồi hệ thống",
        "en": "Because they need to measure system response time",
        "ja": "システムの応答時間を測定する必要があるから"
      },
      {
        "vi": "Vì cần phỏng vấn người dùng cuối",
        "en": "Because they need to interview end users",
        "ja": "エンドユーザーにインタビューする必要があるから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử cấu trúc đòi hỏi hiểu cấu trúc nội bộ (mã nguồn, luồng điều khiển) để thiết kế các trường hợp kiểm thử bao phủ các phần tử cấu trúc, nên cần kỹ năng lập trình.",
      "en": "Structural testing requires understanding the internal structure (source code, control flow) to design test cases that cover structural elements, hence the need for programming skills.",
      "ja": "構造テストは、構造要素を網羅するテストケースを設計するために内部構造(ソースコード、制御フロー)の理解が必要であり、そのためプログラミングスキルが求められます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ở cấp độ kiểm thử nào, kỹ thuật kiểm thử cấu trúc (white-box) thường được áp dụng phổ biến nhất?",
      "en": "At which test level is structural (white-box) testing most commonly applied?",
      "ja": "構造(ホワイトボックス)テスト技法が最も一般的に適用されるのは、どのテストレベルですか?"
    },
    "options": [
      {
        "vi": "Acceptance testing",
        "en": "Acceptance testing",
        "ja": "受け入れテスト"
      },
      {
        "vi": "Kiểm thử chấp nhận của khách hàng",
        "en": "Customer acceptance testing",
        "ja": "顧客受け入れテスト"
      },
      {
        "vi": "Unit testing (kiểm thử đơn vị)",
        "en": "Unit testing",
        "ja": "単体テスト(ユニットテスト)"
      },
      {
        "vi": "Kiểm thử alpha",
        "en": "Alpha testing",
        "ja": "アルファテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ở mức unit testing, lập trình viên có quyền truy cập trực tiếp mã nguồn nên kỹ thuật white-box (kiểm tra câu lệnh, nhánh) được áp dụng phổ biến nhất.",
      "en": "At the unit testing level, developers have direct access to the source code, so white-box techniques (checking statements, branches) are most commonly applied.",
      "ja": "単体テストのレベルでは開発者がソースコードに直接アクセスできるため、ホワイトボックス技法(ステートメントや分岐の検証)が最も一般的に適用されます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kỹ thuật hộp đen thường được áp dụng chủ yếu để thực hiện loại kiểm thử nào?",
      "en": "Black-box techniques are mainly applied to perform which type of testing?",
      "ja": "ブラックボックス技法は主にどのテストを実施するために用いられますか?"
    },
    "options": [
      {
        "vi": "Đo hiệu năng bộ nhớ",
        "en": "Measuring memory performance",
        "ja": "メモリ性能の測定"
      },
      {
        "vi": "Kiểm thử cấu trúc mã nguồn",
        "en": "Structural code testing",
        "ja": "ソースコードの構造テスト"
      },
      {
        "vi": "Kiểm thử độ phủ nhánh",
        "en": "Branch coverage testing",
        "ja": "分岐カバレッジテスト"
      },
      {
        "vi": "Kiểm thử chức năng, dựa trên đặc tả yêu cầu",
        "en": "Functional testing, based on requirements specifications",
        "ja": "要求仕様に基づく機能テスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kỹ thuật hộp đen thiết kế test case từ đặc tả yêu cầu/hành vi bên ngoài, nên thường dùng để kiểm thử chức năng.",
      "en": "Black-box techniques design test cases from external requirements/behavior specifications, so they are commonly used for functional testing.",
      "ja": "ブラックボックス技法は外部の要求・振る舞い仕様からテストケースを設計するため、機能テストに広く用いられます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sau khi lập trình viên báo đã sửa xong lỗi \"nút Thanh toán không hoạt động\", tester chạy lại đúng bước tái hiện lỗi trước đó để kiểm tra. Đây là hoạt động gì?",
      "en": "After a developer reports fixing the \"Checkout button not working\" bug, the tester reruns the exact steps that originally reproduced it. What activity is this?",
      "ja": "開発者が「決済ボタンが動作しない」というバグを修正したと報告した後、テスターが以前バグを再現した手順をそのまま再実行して確認しました。これはどの活動ですか?"
    },
    "options": [
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      },
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Kiểm thử khả năng cài đặt",
        "en": "Installability testing",
        "ja": "インストール性テスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Việc chạy lại chính xác test case đã từng phát hiện defect để xác nhận defect đã hết là confirmation testing.",
      "en": "Rerunning exactly the test case that previously detected the defect to confirm it has been resolved is confirmation testing.",
      "ja": "以前欠陥を発見した際と同じテストケースを再実行して、その欠陥が解消されたことを確認するのは確認テストです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một ứng dụng vừa nâng cấp thư viện xử lý ảnh. Đội QA chạy lại toàn bộ bộ test đã có của các module không liên quan (giỏ hàng, thanh toán) để đảm bảo không phát sinh lỗi mới. Đây là loại kiểm thử gì?",
      "en": "An app just upgraded its image-processing library. QA reruns the existing test suite for unrelated modules (cart, checkout) to ensure no new defects appeared. What type of testing is this?",
      "ja": "あるアプリが画像処理ライブラリをアップグレードしました。QAチームは関係のないモジュール(カート、決済)の既存テストスイートを再実行し、新しい欠陥が発生していないことを確認しました。これはどのテストですか?"
    },
    "options": [
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      },
      {
        "vi": "Kiểm thử phi chức năng",
        "en": "Non-functional testing",
        "ja": "非機能テスト"
      },
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chạy lại các test đã có ở những phần không thay đổi để phát hiện tác động phụ ngoài ý muốn là mục tiêu của regression testing.",
      "en": "Rerunning existing tests on unchanged parts to detect unintended side effects is exactly the goal of regression testing.",
      "ja": "変更されていない部分の既存テストを再実行し、意図しない副作用を検出することが回帰テストの目的です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sửa lỗi ở module xử lý giỏ hàng vô tình làm hỏng chức năng tính tổng đơn hàng - đây là ví dụ minh họa cho rủi ro mà loại kiểm thử nào cố gắng phát hiện?",
      "en": "Fixing a bug in the cart module accidentally breaks the order-total calculation feature - this illustrates the risk that which type of testing tries to detect?",
      "ja": "カートモジュールのバグ修正が、誤って注文合計の計算機能を壊してしまった - これはどのテストが検出しようとするリスクを示す例ですか?"
    },
    "options": [
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      },
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      },
      {
        "vi": "Kiểm thử khả năng tương thích",
        "en": "Compatibility testing",
        "ja": "互換性テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Rủi ro thay đổi ở một chỗ gây lỗi ở chỗ khác (tác dụng phụ) chính là điều regression testing được thiết kế để phát hiện.",
      "en": "The risk that a change in one place causes a defect elsewhere (a side effect) is exactly what regression testing is designed to detect.",
      "ja": "ある箇所の変更が別の箇所で欠陥(副作用)を引き起こすリスクこそ、回帰テストが検出するために設計されたものです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm tra hệ thống có tiếp tục hoạt động ổn định trong thời gian dài, không bị treo hay giảm hiệu suất, là kiểm tra thuộc tính phi chức năng nào?",
      "en": "Checking whether a system continues to operate stably over a long period, without hanging or performance degradation, tests which non-functional attribute?",
      "ja": "システムが長時間にわたり安定して動作し続け、フリーズや性能低下が起きないことを確認するのは、どの非機能特性のテストですか?"
    },
    "options": [
      {
        "vi": "Kiểm thử cấu trúc",
        "en": "Structural testing",
        "ja": "構造テスト"
      },
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      },
      {
        "vi": "Reliability testing (độ tin cậy)",
        "en": "Reliability testing",
        "ja": "信頼性テスト(リライアビリティテスト)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Reliability testing đánh giá khả năng hệ thống duy trì hoạt động ổn định theo thời gian mà không gặp sự cố.",
      "en": "Reliability testing evaluates a system's ability to maintain stable operation over time without failures.",
      "ja": "信頼性テストは、システムが時間の経過とともに障害なく安定して動作し続けられるかを評価します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm tra phần mềm có thể cài đặt và chạy được trên nhiều hệ điều hành khác nhau (Windows, macOS, Linux) là kiểm tra thuộc tính phi chức năng nào?",
      "en": "Checking whether software can be installed and run on multiple different operating systems (Windows, macOS, Linux) tests which non-functional attribute?",
      "ja": "ソフトウェアが複数の異なるOS(Windows、macOS、Linux)にインストールして動作できるかを確認するのは、どの非機能特性のテストですか?"
    },
    "options": [
      {
        "vi": "Portability testing (khả năng di động)",
        "en": "Portability testing",
        "ja": "移植性テスト(ポータビリティテスト)"
      },
      {
        "vi": "Security testing",
        "en": "Security testing",
        "ja": "セキュリティテスト"
      },
      {
        "vi": "Kiểm thử chức năng",
        "en": "Functional testing",
        "ja": "機能テスト"
      },
      {
        "vi": "Regression testing",
        "en": "Regression testing",
        "ja": "回帰テスト"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Portability testing đánh giá khả năng phần mềm hoạt động được trên các môi trường, nền tảng khác nhau.",
      "en": "Portability testing evaluates a software's ability to operate across different environments and platforms.",
      "ja": "移植性テストは、ソフトウェアが異なる環境やプラットフォームで動作できる能力を評価します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử chức năng thường được thiết kế test case dựa trực tiếp trên tài liệu nào?",
      "en": "Functional testing typically designs test cases based directly on which document?",
      "ja": "機能テストは通常、どの文書に直接基づいてテストケースを設計しますか?"
    },
    "options": [
      {
        "vi": "Mã nguồn chi tiết",
        "en": "Detailed source code",
        "ja": "詳細なソースコード"
      },
      {
        "vi": "Tài liệu đặc tả yêu cầu (requirements specification)",
        "en": "The requirements specification document",
        "ja": "要求仕様書(requirements specification)"
      },
      {
        "vi": "Sơ đồ luồng điều khiển",
        "en": "Control flow diagrams",
        "ja": "制御フロー図"
      },
      {
        "vi": "Báo cáo hiệu năng hệ thống",
        "en": "System performance reports",
        "ja": "システム性能レポート"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kiểm thử chức năng (requirements-based) thiết kế test case dựa trên các yêu cầu chức năng đã được đặc tả, kiểm tra hệ thống có làm đúng như yêu cầu hay không.",
      "en": "Functional (requirements-based) testing designs test cases based on specified functional requirements, checking whether the system behaves as required.",
      "ja": "機能テスト(要求ベース)は、仕様化された機能要求に基づいてテストケースを設計し、システムが要求どおりに動作するかを検証します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm tra ứng dụng có tự động chuyển đổi đúng định dạng ngày tháng, tiền tệ khi đổi ngôn ngữ hiển thị sang tiếng Nhật là kiểm tra thuộc tính phi chức năng nào?",
      "en": "Checking whether an app correctly converts date and currency formats when the display language is switched to Japanese tests which non-functional attribute?",
      "ja": "表示言語を日本語に切り替えた際、アプリが日付や通貨の形式を正しく変換するかを確認するのは、どの非機能特性のテストですか?"
    },
    "options": [
      {
        "vi": "Kiểm thử chức năng đăng nhập",
        "en": "Login functional testing",
        "ja": "ログイン機能テスト"
      },
      {
        "vi": "Confirmation testing",
        "en": "Confirmation testing",
        "ja": "確認テスト"
      },
      {
        "vi": "Portability testing (khả năng thích nghi, localization)",
        "en": "Portability testing (adaptability, localization)",
        "ja": "移植性テスト(適応性・ローカライゼーション)"
      },
      {
        "vi": "Kiểm thử cấu trúc mã nguồn",
        "en": "Source code structural testing",
        "ja": "ソースコード構造テスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khả năng thích nghi với ngôn ngữ/định dạng địa phương (localization) là một khía cạnh của portability - thuộc tính phi chức năng.",
      "en": "The ability to adapt to local language/format conventions (localization) is an aspect of portability - a non-functional attribute.",
      "ja": "言語や地域の形式(ローカライゼーション)への適応能力は、非機能特性である移植性の一側面です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử bảo trì (maintenance testing) được thực hiện khi nào?",
      "en": "When is maintenance testing performed?",
      "ja": "保守テスト（メンテナンステスト）はいつ実施されますか。"
    },
    "options": [
      {
        "vi": "Chỉ khi lập kế hoạch kiểm thử tổng thể trước khi phát triển",
        "en": "Only when creating the overall test plan before development starts",
        "ja": "開発開始前に全体テスト計画を作成するときのみ"
      },
      {
        "vi": "Chỉ khi viết mã lần đầu tiên cho một hệ thống mới",
        "en": "Only when writing code for the first time on a brand-new system",
        "ja": "新規システムのコードを初めて書くときのみ"
      },
      {
        "vi": "Chỉ trong giai đoạn thu thập yêu cầu của dự án",
        "en": "Only during the requirements-gathering phase of a project",
        "ja": "プロジェクトの要件収集フェーズのみ"
      },
      {
        "vi": "Khi phần mềm đã vận hành được sửa lỗi, nâng cấp hoặc di chuyển sang môi trường khác",
        "en": "When operational software is modified for corrections, enhancements, or migration to another environment",
        "ja": "稼働中のソフトウェアが修正、機能強化、または別環境への移行のために変更されるとき"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiểm thử bảo trì diễn ra trên hệ thống đang vận hành, sau khi có thay đổi do sửa lỗi, nâng cấp chức năng, hoặc di chuyển nền tảng/môi trường.",
      "en": "Maintenance testing occurs on a live system after changes such as defect fixes, enhancements, or platform/environment migration.",
      "ja": "保守テストは、稼働中のシステムに対して欠陥修正、機能強化、プラットフォームや環境の移行などの変更が加えられた後に実施されます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong ba loại thay đổi thường dẫn đến bảo trì phần mềm, đâu là ví dụ của \"sửa chữa\" (correction)?",
      "en": "Among the typical triggers for software maintenance, which is an example of a \"correction\"?",
      "ja": "ソフトウェア保守の典型的な要因のうち、「修正（correction）」の例はどれですか。"
    },
    "options": [
      {
        "vi": "Vá lỗi bảo mật vừa được phát hiện trong hệ thống",
        "en": "Patching a security vulnerability just discovered in the system",
        "ja": "システムで発見されたばかりのセキュリティ脆弱性を修正すること"
      },
      {
        "vi": "Thêm một tính năng mới theo yêu cầu khách hàng",
        "en": "Adding a new feature requested by the customer",
        "ja": "顧客から要望された新機能を追加すること"
      },
      {
        "vi": "Nâng cấp hệ điều hành máy chủ lên phiên bản mới",
        "en": "Upgrading the server operating system to a newer version",
        "ja": "サーバーのOSを新しいバージョンにアップグレードすること"
      },
      {
        "vi": "Ngừng vận hành một mô-đun không còn dùng nữa",
        "en": "Retiring a module that is no longer used",
        "ja": "使用されなくなったモジュールを廃止すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Sửa chữa (correction) là bảo trì nhằm khắc phục lỗi/khiếm khuyết đã phát hiện, ví dụ vá lỗi bảo mật; thêm tính năng là nâng cấp, còn nâng cấp môi trường và ngừng vận hành là các loại kích hoạt khác.",
      "en": "Correction is maintenance to fix a discovered defect, such as patching a security flaw; adding features is enhancement, environment upgrade and retirement are other trigger types.",
      "ja": "修正（correction）は発見された欠陥、例えばセキュリティの欠陥を修正する保守です。機能追加は機能強化、環境のアップグレードや廃止は別の種類のトリガーです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phân tích tác động (impact analysis) trong bảo trì phần mềm có mục đích chính là gì?",
      "en": "What is the main purpose of impact analysis in software maintenance?",
      "ja": "ソフトウェア保守における影響分析（impact analysis）の主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Viết tài liệu đặc tả yêu cầu cho hệ thống mới",
        "en": "Writing requirement specifications for a new system",
        "ja": "新システムの要件仕様書を作成すること"
      },
      {
        "vi": "Đánh giá phần nào của hệ thống hiện có có thể bị ảnh hưởng bởi một thay đổi dự kiến",
        "en": "Assessing which parts of the existing system may be affected by an intended change",
        "ja": "予定されている変更によって既存システムのどの部分が影響を受ける可能性があるかを評価すること"
      },
      {
        "vi": "Tính toán chi phí thuê nhân sự phát triển",
        "en": "Calculating the cost of hiring development staff",
        "ja": "開発要員の雇用コストを計算すること"
      },
      {
        "vi": "Thiết kế giao diện người dùng cho phiên bản đầu tiên",
        "en": "Designing the user interface for the first release",
        "ja": "最初のリリースのユーザーインターフェースを設計すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Phân tích tác động giúp xác định phạm vi ảnh hưởng của một thay đổi lên hệ thống hiện có, từ đó xác định phạm vi kiểm thử bảo trì cần thiết.",
      "en": "Impact analysis identifies the scope of effect a change has on the existing system, which then guides the scope of required maintenance testing.",
      "ja": "影響分析は、変更が既存システムに与える影響範囲を特定し、それによって必要な保守テストの範囲を決定します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kết quả của phân tích tác động thường được dùng để làm gì trong kiểm thử bảo trì?",
      "en": "What is the result of impact analysis typically used for in maintenance testing?",
      "ja": "保守テストにおいて、影響分析の結果は通常何のために使われますか。"
    },
    "options": [
      {
        "vi": "Loại bỏ nhu cầu kiểm thử phần thay đổi",
        "en": "Eliminating the need to test the changed part itself",
        "ja": "変更された部分自体のテストの必要性をなくすこと"
      },
      {
        "vi": "Thay thế hoàn toàn việc kiểm thử chấp nhận người dùng",
        "en": "Completely replacing user acceptance testing",
        "ja": "ユーザー受け入れテストを完全に置き換えること"
      },
      {
        "vi": "Xác định phạm vi kiểm thử hồi quy cần thực hiện",
        "en": "Determining the scope of regression testing needed",
        "ja": "必要な回帰テストの範囲を決定すること"
      },
      {
        "vi": "Quyết định giá bán sản phẩm phần mềm",
        "en": "Deciding the sale price of the software product",
        "ja": "ソフトウェア製品の販売価格を決定すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Xác định các vùng bị ảnh hưởng giúp tester khoanh vùng phạm vi kiểm thử hồi quy hợp lý, tránh bỏ sót hoặc kiểm thử tràn lan không cần thiết.",
      "en": "Identifying affected areas helps testers scope regression testing appropriately, avoiding both missed areas and unnecessary over-testing.",
      "ja": "影響を受ける領域を特定することで、テスターは回帰テストの範囲を適切に絞り込み、見落としや不要な過剰テストを避けることができます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong bối cảnh bảo trì phần mềm, \"planned enhancement\" (nâng cấp có kế hoạch) khác với \"hotfix\" (bản vá khẩn cấp) chủ yếu ở điểm nào?",
      "en": "In software maintenance, how does a planned enhancement mainly differ from a hotfix?",
      "ja": "ソフトウェア保守において、計画的な機能強化（planned enhancement）は緊急パッチ（hotfix）と主にどう異なりますか。"
    },
    "options": [
      {
        "vi": "Cả hai đều không cần phân tích tác động",
        "en": "Neither requires impact analysis",
        "ja": "どちらも影響分析を必要としない"
      },
      {
        "vi": "Nâng cấp có kế hoạch không bao giờ cần kiểm thử hồi quy",
        "en": "A planned enhancement never needs regression testing",
        "ja": "計画的な機能強化は回帰テストを一切必要としない"
      },
      {
        "vi": "Hotfix luôn được kiểm thử kỹ lưỡng hơn nâng cấp có kế hoạch",
        "en": "A hotfix is always tested more thoroughly than a planned enhancement",
        "ja": "緊急パッチは常に計画的な機能強化よりも入念にテストされる"
      },
      {
        "vi": "Nâng cấp có kế hoạch thường có đủ thời gian phân tích tác động và kiểm thử kỹ; hotfix phải triển khai gấp với thời gian kiểm thử hạn chế",
        "en": "A planned enhancement usually allows time for thorough impact analysis and testing, while a hotfix must be deployed urgently with limited testing time",
        "ja": "計画的な機能強化は通常、十分な影響分析とテストの時間があるが、緊急パッチは限られたテスト時間で急いで展開しなければならない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Do áp lực thời gian, hotfix thường chỉ kiểm thử tối thiểu vùng bị ảnh hưởng trực tiếp, trong khi nâng cấp có kế hoạch cho phép phân tích tác động và kiểm thử đầy đủ hơn.",
      "en": "Due to time pressure, hotfixes typically receive only minimal testing of the directly affected area, whereas planned enhancements allow for fuller impact analysis and testing.",
      "ja": "時間的な制約のため、緊急パッチは直接影響を受ける部分の最小限のテストにとどまることが多いのに対し、計画的な機能強化ではより十分な影響分析とテストが可能です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi một hệ thống được di chuyển (migration) sang cơ sở dữ liệu mới, kiểm thử bảo trì cần đặc biệt chú ý điều gì?",
      "en": "When a system undergoes migration to a new database, what should maintenance testing especially focus on?",
      "ja": "システムが新しいデータベースへ移行（マイグレーション）される際、保守テストは特に何に注目すべきですか。"
    },
    "options": [
      {
        "vi": "Tính toàn vẹn và chính xác của dữ liệu sau khi chuyển đổi",
        "en": "The integrity and correctness of data after conversion",
        "ja": "変換後のデータの整合性と正確性"
      },
      {
        "vi": "Màu sắc giao diện của trang đăng nhập",
        "en": "The color scheme of the login page",
        "ja": "ログインページの配色"
      },
      {
        "vi": "Số lượng nhân viên tham gia dự án",
        "en": "The number of staff assigned to the project",
        "ja": "プロジェクトに割り当てられた要員数"
      },
      {
        "vi": "Tên miền được sử dụng cho website",
        "en": "The domain name used for the website",
        "ja": "ウェブサイトで使用されるドメイン名"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong kiểm thử di chuyển dữ liệu, trọng tâm là đảm bảo dữ liệu không bị mất, sai lệch hay hỏng định dạng khi chuyển từ hệ thống cũ sang hệ thống mới.",
      "en": "In migration testing, the focus is ensuring data is not lost, corrupted, or misformatted when moved from the old system to the new one.",
      "ja": "移行テストでは、旧システムから新システムへデータを移す際にデータが失われたり、破損したり、形式が誤ったりしないことを確認することが重点です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đâu là phát biểu ĐÚNG về kiểm thử bảo trì đối với việc ngừng vận hành (retirement/decommissioning) một hệ thống?",
      "en": "Which statement is CORRECT about maintenance testing for system retirement/decommissioning?",
      "ja": "システムの廃止（retirement/decommissioning）に関する保守テストについて正しい記述はどれですか。"
    },
    "options": [
      {
        "vi": "Không cần kiểm thử gì vì hệ thống sắp bị loại bỏ hoàn toàn",
        "en": "No testing is needed since the system is about to be fully discarded",
        "ja": "システムは完全に廃止されるためテストは一切不要である"
      },
      {
        "vi": "Có thể cần kiểm thử việc lưu trữ (archiving) dữ liệu để đảm bảo dữ liệu vẫn truy xuất được sau khi hệ thống ngừng hoạt động",
        "en": "Testing may be needed for data archiving to ensure data remains accessible after the system stops running",
        "ja": "システム停止後もデータにアクセスできることを確認するため、データアーカイブのテストが必要な場合がある"
      },
      {
        "vi": "Chỉ cần kiểm thử hiệu năng (performance testing) mà không cần gì khác",
        "en": "Only performance testing is needed and nothing else",
        "ja": "パフォーマンステストのみが必要でそれ以外は不要である"
      },
      {
        "vi": "Chỉ áp dụng cho hệ thống mới phát triển, không áp dụng cho hệ thống cũ",
        "en": "It only applies to newly developed systems, not legacy ones",
        "ja": "新規開発システムにのみ適用され、既存システムには適用されない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khi ngừng vận hành một hệ thống, thường cần kiểm thử quy trình lưu trữ dữ liệu dài hạn để đảm bảo dữ liệu lịch sử vẫn có thể truy xuất/khôi phục đúng khi cần, đồng thời đáp ứng yêu cầu tuân thủ.",
      "en": "When retiring a system, testing of long-term data archiving is often needed to ensure historical data remains retrievable and compliant with retention requirements.",
      "ja": "システムを廃止する際、履歴データが後で正しく取得・復元でき、保持要件にも準拠できるよう、長期データアーカイブのテストがしばしば必要です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Yếu tố nào sau đây KHÔNG phải là yếu tố ảnh hưởng đến quy mô (scope) của kiểm thử bảo trì?",
      "en": "Which of the following is NOT a factor affecting the scope of maintenance testing?",
      "ja": "次のうち、保守テストの範囲に影響を与える要因ではないものはどれですか。"
    },
    "options": [
      {
        "vi": "Mức độ rủi ro của thay đổi",
        "en": "The risk level of the change",
        "ja": "変更のリスクレベル"
      },
      {
        "vi": "Kích thước của hệ thống hiện có",
        "en": "The size of the existing system",
        "ja": "既存システムの規模"
      },
      {
        "vi": "Font chữ được dùng trong tài liệu thiết kế nội bộ",
        "en": "The font used in internal design documents",
        "ja": "社内設計文書で使用されているフォント"
      },
      {
        "vi": "Kết quả phân tích tác động của thay đổi",
        "en": "The results of the impact analysis for the change",
        "ja": "変更に対する影響分析の結果"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Quy mô kiểm thử bảo trì phụ thuộc vào rủi ro, kích thước/độ phức tạp của hệ thống và kết quả phân tích tác động; font chữ tài liệu không liên quan đến việc xác định phạm vi kiểm thử.",
      "en": "Maintenance testing scope depends on risk, system size/complexity, and impact analysis results; document font style is irrelevant to determining test scope.",
      "ja": "保守テストの範囲はリスク、システムの規模・複雑さ、影響分析の結果に左右されますが、文書のフォントはテスト範囲の決定には関係ありません。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong phân tích tác động, ai thường là người có thể cung cấp thông tin hữu ích nhất về các vùng bị ảnh hưởng bởi thay đổi?",
      "en": "In impact analysis, who is typically most useful for providing information about the areas affected by a change?",
      "ja": "影響分析において、変更の影響を受ける領域に関する情報を提供するのに最も役立つのは通常誰ですか。"
    },
    "options": [
      {
        "vi": "Bộ phận kế toán không tham gia dự án",
        "en": "The accounting department, uninvolved in the project",
        "ja": "プロジェクトに関与していない経理部門"
      },
      {
        "vi": "Nhân viên lễ tân của công ty",
        "en": "The company's receptionist",
        "ja": "会社の受付担当者"
      },
      {
        "vi": "Khách hàng chưa từng dùng hệ thống",
        "en": "A customer who has never used the system",
        "ja": "システムを一度も使ったことがない顧客"
      },
      {
        "vi": "Người am hiểu sâu về hệ thống, chẳng hạn kiến trúc sư hoặc lập trình viên kỳ cựu",
        "en": "Someone with deep system knowledge, such as an architect or experienced developer",
        "ja": "アーキテクトや経験豊富な開発者など、システムに深い知識を持つ人物"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Người có kiến thức sâu về kiến trúc và mã nguồn hệ thống, như kiến trúc sư hoặc lập trình viên kỳ cựu, thường đưa ra đánh giá tác động chính xác nhất nhờ hiểu rõ các mối liên hệ giữa các thành phần.",
      "en": "People with deep architectural and code knowledge, such as architects or senior developers, typically provide the most accurate impact assessments due to their understanding of component dependencies.",
      "ja": "アーキテクトやシニア開発者のようにシステムのアーキテクチャやコードに深い知識を持つ人物は、コンポーネント間の依存関係を理解しているため、通常最も正確な影響評価を提供できます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vì sao tài liệu hệ thống (documentation) không đầy đủ hoặc lỗi thời lại gây khó khăn cho phân tích tác động?",
      "en": "Why does incomplete or outdated system documentation make impact analysis difficult?",
      "ja": "不完全または古いシステム文書が影響分析を困難にするのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì tài liệu không chính xác khiến khó xác định đúng các thành phần và mối liên hệ thực sự bị ảnh hưởng bởi thay đổi",
        "en": "Because inaccurate documentation makes it hard to correctly identify the components and relationships truly affected by a change",
        "ja": "不正確な文書があると、変更によって実際に影響を受けるコンポーネントや関係性を正しく特定することが難しくなるから"
      },
      {
        "vi": "Vì nó khiến giao diện người dùng trông xấu hơn",
        "en": "Because it makes the user interface look worse",
        "ja": "ユーザーインターフェースの見た目が悪くなるから"
      },
      {
        "vi": "Vì nó làm tăng chi phí bản quyền phần mềm",
        "en": "Because it increases software licensing costs",
        "ja": "ソフトウェアのライセンス費用が増加するから"
      },
      {
        "vi": "Vì nó không liên quan gì đến kiểm thử bảo trì",
        "en": "Because it is unrelated to maintenance testing",
        "ja": "保守テストとは無関係だから"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Phân tích tác động dựa nhiều vào tài liệu thiết kế, mã nguồn và mô tả phụ thuộc; nếu tài liệu lỗi thời, người phân tích dễ bỏ sót các vùng thực sự bị ảnh hưởng.",
      "en": "Impact analysis relies heavily on design documents, source code, and dependency descriptions; outdated documentation increases the risk of missing genuinely affected areas.",
      "ja": "影響分析は設計文書、ソースコード、依存関係の記述に大きく依存するため、文書が古いと実際に影響を受ける領域を見落とすリスクが高まります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một công ty thay đổi quy tắc tính thuế trong hệ thống bán hàng đang vận hành. Bước nào nên thực hiện TRƯỚC khi bắt đầu viết test case bảo trì?",
      "en": "A company changes the tax calculation rule in a live sales system. Which step should be done BEFORE writing maintenance test cases?",
      "ja": "ある会社が稼働中の販売システムの税計算ルールを変更しました。保守テストケースを書き始める前に行うべきステップはどれですか。"
    },
    "options": [
      {
        "vi": "Xóa toàn bộ dữ liệu khách hàng hiện có",
        "en": "Delete all existing customer data",
        "ja": "既存の顧客データをすべて削除する"
      },
      {
        "vi": "Phân tích tác động để xác định các mô-đun liên quan như hóa đơn, báo cáo, tích hợp kế toán",
        "en": "Perform impact analysis to identify related modules such as invoicing, reporting, and accounting integration",
        "ja": "請求書、レポート、会計連携など関連するモジュールを特定するため影響分析を行う"
      },
      {
        "vi": "Ngừng vận hành hệ thống vĩnh viễn",
        "en": "Permanently decommission the system",
        "ja": "システムを永久に廃止する"
      },
      {
        "vi": "Bỏ qua kiểm thử vì thay đổi nhỏ",
        "en": "Skip testing because the change is small",
        "ja": "変更が小さいのでテストを省略する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trước khi thiết kế test case bảo trì, cần phân tích tác động để biết những mô-đun nào (hóa đơn, báo cáo, tích hợp...) có thể bị ảnh hưởng bởi thay đổi quy tắc thuế, từ đó xác định phạm vi kiểm thử phù hợp.",
      "en": "Before designing maintenance test cases, impact analysis is needed to identify which modules (invoicing, reporting, integrations, etc.) may be affected by the tax rule change, guiding an appropriate test scope.",
      "ja": "保守テストケースを設計する前に、税ルールの変更によって影響を受ける可能性のあるモジュール（請求書、レポート、連携など）を特定するために影響分析が必要であり、それによって適切なテスト範囲が決まります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử bảo trì và kiểm thử hồi quy (regression testing) liên hệ với nhau như thế nào?",
      "en": "How are maintenance testing and regression testing related?",
      "ja": "保守テストと回帰テストはどのように関連していますか。"
    },
    "options": [
      {
        "vi": "Chúng hoàn toàn độc lập, không liên quan gì đến nhau",
        "en": "They are completely independent and unrelated",
        "ja": "両者は完全に独立しており無関係である"
      },
      {
        "vi": "Kiểm thử bảo trì luôn thay thế hoàn toàn kiểm thử hồi quy",
        "en": "Maintenance testing always fully replaces regression testing",
        "ja": "保守テストは常に回帰テストを完全に置き換える"
      },
      {
        "vi": "Kiểm thử hồi quy thường là một phần của kiểm thử bảo trì, nhằm đảm bảo các chức năng không bị ảnh hưởng vẫn hoạt động đúng",
        "en": "Regression testing is typically part of maintenance testing, ensuring unaffected functionality still works correctly",
        "ja": "回帰テストは通常保守テストの一部であり、影響を受けていない機能が引き続き正しく動作することを確認する"
      },
      {
        "vi": "Kiểm thử hồi quy chỉ áp dụng cho phần mềm mới, không áp dụng khi bảo trì",
        "en": "Regression testing only applies to new software, not during maintenance",
        "ja": "回帰テストは新規ソフトウェアにのみ適用され、保守時には適用されない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiểm thử bảo trì bao gồm kiểm thử phần thay đổi và kiểm thử hồi quy các vùng bị ảnh hưởng gián tiếp để đảm bảo phần chức năng không thay đổi vẫn hoạt động bình thường.",
      "en": "Maintenance testing includes testing the changed part plus regression testing of indirectly affected areas to confirm unchanged functionality still behaves correctly.",
      "ja": "保守テストには、変更された部分のテストに加え、間接的に影響を受ける領域の回帰テストが含まれ、変更されていない機能が正しく動作し続けることを確認します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong ISTQB, \"triggers for maintenance\" (yếu tố kích hoạt bảo trì) KHÔNG bao gồm loại nào sau đây?",
      "en": "In ISTQB terms, \"triggers for maintenance\" do NOT include which of the following?",
      "ja": "ISTQBの用語で、「保守のトリガー（triggers for maintenance）」に含まれないものはどれですか。"
    },
    "options": [
      {
        "vi": "Sửa lỗi (correction)",
        "en": "Correction",
        "ja": "修正（correction）"
      },
      {
        "vi": "Nâng cấp/cải tiến (enhancement)",
        "en": "Enhancement",
        "ja": "機能強化（enhancement）"
      },
      {
        "vi": "Di chuyển sang môi trường mới (migration)",
        "en": "Migration to a new environment",
        "ja": "新しい環境への移行（migration）"
      },
      {
        "vi": "Việc phỏng vấn tuyển dụng nhân sự kiểm thử mới",
        "en": "Interviewing candidates for a new tester position",
        "ja": "新しいテスト担当者の採用面接"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các yếu tố kích hoạt bảo trì điển hình theo ISTQB gồm sửa lỗi, nâng cấp, di chuyển và ngừng vận hành; việc tuyển dụng nhân sự không phải là một trigger bảo trì phần mềm.",
      "en": "Typical ISTQB maintenance triggers are correction, enhancement, migration, and retirement; recruiting staff is not a software maintenance trigger.",
      "ja": "ISTQBにおける典型的な保守のトリガーは、修正、機能強化、移行、廃止であり、要員の採用は保守のトリガーではありません。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một hệ thống ngân hàng được nâng cấp để tuân thủ quy định pháp lý mới. Đây là ví dụ của loại bảo trì nào?",
      "en": "A banking system is upgraded to comply with a new legal regulation. This is an example of which type of maintenance?",
      "ja": "銀行システムが新しい法規制に準拠するためにアップグレードされました。これはどのタイプの保守の例ですか。"
    },
    "options": [
      {
        "vi": "Bảo trì thích ứng/nâng cấp theo yêu cầu môi trường hoặc pháp lý bên ngoài",
        "en": "Adaptive/enhancement maintenance driven by external environmental or regulatory requirements",
        "ja": "外部の環境要件や法規制要件による適応的・機能強化保守"
      },
      {
        "vi": "Bảo trì sửa lỗi thuần túy do khiếm khuyết nội bộ",
        "en": "Pure corrective maintenance due to an internal defect",
        "ja": "内部の欠陥による純粋な是正保守"
      },
      {
        "vi": "Ngừng vận hành hệ thống hoàn toàn",
        "en": "Complete system retirement",
        "ja": "システムの完全廃止"
      },
      {
        "vi": "Không được xem là bảo trì vì không liên quan phần mềm",
        "en": "Not considered maintenance since it is unrelated to software",
        "ja": "ソフトウェアに関係しないため保守とはみなされない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thay đổi để đáp ứng yêu cầu pháp lý/môi trường bên ngoài (không phải do lỗi nội tại) được xem là bảo trì thích ứng hoặc nâng cấp, khác với sửa lỗi thuần túy.",
      "en": "Changes made to meet external legal or environmental requirements (not due to an internal fault) are considered adaptive or enhancement maintenance, distinct from pure correction.",
      "ja": "内部の不具合ではなく外部の法規制や環境要件に対応するための変更は、純粋な修正とは異なり、適応的保守または機能強化保守とみなされます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vì sao kiểm thử bảo trì thường khó khăn hơn kiểm thử ban đầu của một dự án mới?",
      "en": "Why is maintenance testing often more challenging than testing a brand-new project?",
      "ja": "保守テストが新規プロジェクトの初期テストよりも困難になることが多いのはなぜですか。"
    },
    "options": [
      {
        "vi": "Vì hệ thống mới không có bất kỳ yêu cầu nào",
        "en": "Because a new system has no requirements at all",
        "ja": "新規システムには要件が一切ないから"
      },
      {
        "vi": "Vì hệ thống đang vận hành có ràng buộc về thời gian, dữ liệu thật và cần tránh gây gián đoạn dịch vụ",
        "en": "Because the live system has time constraints, real data, and the need to avoid service disruption",
        "ja": "稼働中のシステムには時間的制約、実データがあり、サービス中断を避ける必要があるから"
      },
      {
        "vi": "Vì bảo trì không cần môi trường kiểm thử riêng biệt",
        "en": "Because maintenance never needs a separate test environment",
        "ja": "保守は別のテスト環境を必要としないから"
      },
      {
        "vi": "Vì bảo trì luôn có nhiều thời gian hơn dự án mới",
        "en": "Because maintenance always has more time than a new project",
        "ja": "保守は常に新規プロジェクトより時間に余裕があるから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Hệ thống đang phục vụ người dùng thật, dữ liệu thật, nên kiểm thử bảo trì phải cẩn trọng hơn để không gây gián đoạn dịch vụ, đồng thời thường bị áp lực thời gian và thiếu tài liệu cập nhật.",
      "en": "Because the system serves real users and real data, maintenance testing must be more careful to avoid service disruption, while often facing time pressure and outdated documentation.",
      "ja": "システムは実際のユーザーと実データを扱っているため、保守テストはサービス中断を避けるためより慎重に行う必要があり、時間的な制約や古い文書という課題もしばしば伴います。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phát biểu nào sau đây là SAI về kiểm thử bảo trì?",
      "en": "Which of the following statements is INCORRECT about maintenance testing?",
      "ja": "保守テストに関する次の記述のうち、誤っているものはどれですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử bảo trì có thể được kích hoạt bởi việc sửa lỗi",
        "en": "Maintenance testing can be triggered by a defect correction",
        "ja": "保守テストは欠陥修正によって引き起こされることがある"
      },
      {
        "vi": "Kiểm thử bảo trì có thể bao gồm cả kiểm thử phần thay đổi và kiểm thử hồi quy",
        "en": "Maintenance testing can include both testing the change and regression testing",
        "ja": "保守テストには変更部分のテストと回帰テストの両方が含まれることがある"
      },
      {
        "vi": "Phạm vi kiểm thử bảo trì luôn giống hệt nhau cho mọi loại thay đổi, bất kể rủi ro hay quy mô",
        "en": "The scope of maintenance testing is always identical for every type of change, regardless of risk or size",
        "ja": "保守テストの範囲は、リスクや規模に関わらずどの種類の変更でも常に同一である"
      },
      {
        "vi": "Kiểm thử bảo trì có thể áp dụng cho việc di chuyển dữ liệu sang hệ thống mới",
        "en": "Maintenance testing can apply to data migration to a new system",
        "ja": "保守テストは新システムへのデータ移行にも適用され得る"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phạm vi kiểm thử bảo trì phải được điều chỉnh dựa trên kết quả phân tích tác động, mức độ rủi ro và quy mô thay đổi, không phải cố định giống nhau cho mọi thay đổi.",
      "en": "The scope of maintenance testing must be adjusted based on impact analysis results, risk level, and change size — it is not fixed identically for every change.",
      "ja": "保守テストの範囲は、影響分析の結果、リスクレベル、変更規模に基づいて調整されるべきであり、すべての変更に対して固定的に同一というわけではありません。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một điều chỉnh nhỏ trong logic tính điểm của module A vô tình làm sai kết quả hiển thị ở module B không liên quan trực tiếp. Đây là ví dụ minh họa cho điều gì trong bảo trì?",
      "en": "A small change to the scoring logic in Module A unexpectedly breaks the display results in unrelated Module B. What does this illustrate in maintenance?",
      "ja": "モジュールAの採点ロジックへの小さな変更が、直接関係のないモジュールBの表示結果を予期せず壊してしまいました。これは保守において何を示す例ですか。"
    },
    "options": [
      {
        "vi": "Một yêu cầu phi chức năng về hiệu năng",
        "en": "A non-functional performance requirement",
        "ja": "パフォーマンスに関する非機能要件"
      },
      {
        "vi": "Một lỗi cú pháp đơn giản không liên quan đến bảo trì",
        "en": "A simple syntax error unrelated to maintenance",
        "ja": "保守とは無関係な単純な構文エラー"
      },
      {
        "vi": "Kết quả của việc kiểm thử chấp nhận người dùng",
        "en": "The result of user acceptance testing",
        "ja": "ユーザー受け入れテストの結果"
      },
      {
        "vi": "Hiệu ứng lan truyền (ripple effect) của thay đổi mà phân tích tác động cần phát hiện trước",
        "en": "The ripple effect of a change, which impact analysis should identify beforehand",
        "ja": "影響分析が事前に特定すべき、変更の波及効果（リップルエフェクト）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây chính là hiệu ứng lan truyền — thay đổi ở một phần gây ảnh hưởng ngoài dự kiến đến phần khác có liên hệ ngầm; phân tích tác động tốt giúp phát hiện các mối liên hệ này trước khi triển khai.",
      "en": "This is a ripple effect — a change in one part unexpectedly affects another part due to hidden dependencies; good impact analysis helps uncover such links before deployment.",
      "ja": "これはまさに波及効果です。ある部分への変更が、隠れた依存関係により予期せず別の部分に影響を与えます。優れた影響分析は、展開前にこうしたつながりを発見するのに役立ちます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi thiếu thời gian để kiểm thử hồi quy toàn diện sau một thay đổi bảo trì, nhóm kiểm thử nên ưu tiên dựa trên điều gì?",
      "en": "When there is insufficient time for full regression testing after a maintenance change, what should the test team prioritize based on?",
      "ja": "保守による変更後に完全な回帰テストを行う時間が不足している場合、テストチームは何に基づいて優先順位を決めるべきですか。"
    },
    "options": [
      {
        "vi": "Kết quả phân tích tác động và mức độ rủi ro của các vùng bị ảnh hưởng",
        "en": "The results of impact analysis and the risk level of affected areas",
        "ja": "影響分析の結果と影響を受ける領域のリスクレベル"
      },
      {
        "vi": "Thứ tự bảng chữ cái của tên chức năng",
        "en": "The alphabetical order of feature names",
        "ja": "機能名のアルファベット順"
      },
      {
        "vi": "Sở thích cá nhân của một tester bất kỳ",
        "en": "The personal preference of any random tester",
        "ja": "任意のテスターの個人的な好み"
      },
      {
        "vi": "Số lượng dòng code không liên quan đến thay đổi",
        "en": "The number of lines of code unrelated to the change",
        "ja": "変更と無関係なコード行数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi thời gian hạn chế, cần ưu tiên kiểm thử các vùng có rủi ro cao và được xác định là bị ảnh hưởng qua phân tích tác động, để tối ưu hiệu quả kiểm thử trong giới hạn thời gian.",
      "en": "With limited time, testing should prioritize high-risk, impact-analysis-identified affected areas to maximize test effectiveness within the time constraint.",
      "ja": "時間が限られている場合は、影響分析で特定された高リスクの影響領域を優先してテストし、限られた時間内でテストの効果を最大化すべきです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Điều nào sau đây thể hiện đúng nhất mối quan hệ giữa phân tích tác động và quản lý rủi ro trong bảo trì?",
      "en": "Which best represents the relationship between impact analysis and risk management in maintenance?",
      "ja": "保守における影響分析とリスク管理の関係を最もよく表しているのはどれですか。"
    },
    "options": [
      {
        "vi": "Phân tích tác động và quản lý rủi ro là hai khái niệm giống hệt nhau, không có khác biệt",
        "en": "Impact analysis and risk management are identical concepts with no differences",
        "ja": "影響分析とリスク管理は全く同一の概念であり違いはない"
      },
      {
        "vi": "Phân tích tác động giúp nhận diện các vùng rủi ro cao, từ đó hỗ trợ ra quyết định về mức độ kiểm thử cần thiết",
        "en": "Impact analysis helps identify high-risk areas, which then informs decisions about the necessary level of testing",
        "ja": "影響分析は高リスク領域を特定するのに役立ち、それが必要なテストレベルに関する意思決定を支援する"
      },
      {
        "vi": "Phân tích tác động chỉ dùng cho kiểm thử hiệu năng",
        "en": "Impact analysis is used only for performance testing",
        "ja": "影響分析はパフォーマンステストにのみ使用される"
      },
      {
        "vi": "Quản lý rủi ro không liên quan gì đến bảo trì phần mềm",
        "en": "Risk management has no relation to software maintenance",
        "ja": "リスク管理はソフトウェア保守とは無関係である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Phân tích tác động cung cấp thông tin đầu vào quan trọng để đánh giá rủi ro của từng vùng bị ảnh hưởng, giúp nhóm dự án quyết định mức độ và ưu tiên kiểm thử bảo trì hợp lý.",
      "en": "Impact analysis provides key input for assessing the risk of each affected area, helping the team decide an appropriate level and priority for maintenance testing.",
      "ja": "影響分析は、影響を受ける各領域のリスクを評価するための重要な情報を提供し、チームが保守テストの適切なレベルと優先順位を決定するのに役立ちます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong một dự án bảo trì, việc kiểm thử lại các chức năng KHÔNG bị thay đổi trực tiếp nhưng có khả năng bị ảnh hưởng gián tiếp gọi là gì?",
      "en": "In a maintenance project, retesting functions that were NOT directly changed but may be indirectly affected is called what?",
      "ja": "保守プロジェクトにおいて、直接変更されていないが間接的に影響を受ける可能性がある機能を再テストすることを何と呼びますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử đơn vị (unit testing) duy nhất",
        "en": "Unit testing only",
        "ja": "ユニットテストのみ"
      },
      {
        "vi": "Kiểm thử khói (smoke testing) duy nhất",
        "en": "Smoke testing only",
        "ja": "スモークテストのみ"
      },
      {
        "vi": "Kiểm thử hồi quy (regression testing)",
        "en": "Regression testing",
        "ja": "回帰テスト（regression testing）"
      },
      {
        "vi": "Kiểm thử khả năng sử dụng (usability testing) duy nhất",
        "en": "Usability testing only",
        "ja": "ユーザビリティテストのみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiểm thử hồi quy tập trung xác nhận rằng các chức năng không thay đổi trực tiếp vẫn hoạt động đúng sau khi hệ thống bị chỉnh sửa ở phần khác.",
      "en": "Regression testing focuses on confirming that functions not directly changed still work correctly after modifications elsewhere in the system.",
      "ja": "回帰テストは、システムの他の部分に変更が加えられた後も、直接変更されていない機能が引き続き正しく動作することを確認することに重点を置きます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một tổ chức không có bộ hồi quy tự động và tài liệu thiết kế lỗi thời. Điều này ảnh hưởng thế nào đến phân tích tác động khi bảo trì?",
      "en": "An organization lacks an automated regression suite and has outdated design documentation. How does this affect impact analysis during maintenance?",
      "ja": "ある組織は自動回帰テストスイートを持たず、設計文書も古くなっています。これは保守時の影響分析にどう影響しますか。"
    },
    "options": [
      {
        "vi": "Không ảnh hưởng gì vì phân tích tác động không liên quan đến tài liệu hay công cụ tự động hóa",
        "en": "No effect at all, since impact analysis is unrelated to documentation or automation tools",
        "ja": "影響分析は文書や自動化ツールと無関係なので全く影響はない"
      },
      {
        "vi": "Giúp giảm hoàn toàn nhu cầu kiểm thử bảo trì",
        "en": "It completely eliminates the need for maintenance testing",
        "ja": "保守テストの必要性が完全になくなる"
      },
      {
        "vi": "Tự động biến mọi thay đổi thành hotfix khẩn cấp",
        "en": "It automatically turns every change into an emergency hotfix",
        "ja": "すべての変更が自動的に緊急パッチになる"
      },
      {
        "vi": "Việc xác định chính xác phạm vi ảnh hưởng trở nên khó khăn hơn, làm tăng rủi ro bỏ sót vùng cần kiểm thử",
        "en": "Accurately determining the affected scope becomes harder, increasing the risk of missing areas that need testing",
        "ja": "影響範囲を正確に特定することがより困難になり、テストが必要な領域を見落とすリスクが高まる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thiếu tài liệu cập nhật và công cụ hỗ trợ khiến việc xác định chính xác các vùng bị ảnh hưởng khó khăn hơn, dẫn đến nguy cơ bỏ sót phạm vi kiểm thử cần thiết, tăng rủi ro cho hệ thống.",
      "en": "Lacking updated documentation and tooling makes it harder to accurately determine affected areas, increasing the risk of missing necessary test scope and raising overall system risk.",
      "ja": "最新の文書やツールがないと、影響を受ける領域を正確に特定することが難しくなり、必要なテスト範囲を見落とすリスクが高まり、システム全体のリスクも増加します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi lập kế hoạch kiểm thử bảo trì cho một thay đổi lớn, đâu là thực hành TỐT?",
      "en": "When planning maintenance testing for a major change, what is a GOOD practice?",
      "ja": "大規模な変更に対する保守テストを計画する際、良いプラクティスはどれですか。"
    },
    "options": [
      {
        "vi": "Thực hiện phân tích tác động trước, sau đó xác định phạm vi kiểm thử phù hợp với rủi ro đã xác định",
        "en": "Perform impact analysis first, then define a test scope aligned with the identified risks",
        "ja": "まず影響分析を行い、その後特定されたリスクに応じたテスト範囲を定義する"
      },
      {
        "vi": "Bỏ qua phân tích tác động để tiết kiệm thời gian",
        "en": "Skip impact analysis to save time",
        "ja": "時間を節約するために影響分析を省略する"
      },
      {
        "vi": "Chỉ kiểm thử phần mã nguồn được thay đổi, không quan tâm các phần liên quan",
        "en": "Test only the changed source code, ignoring related areas",
        "ja": "変更されたソースコードのみをテストし、関連部分は無視する"
      },
      {
        "vi": "Triển khai thẳng lên production mà không kiểm thử vì đây chỉ là bảo trì",
        "en": "Deploy directly to production without testing since it is just maintenance",
        "ja": "これは単なる保守なのでテストなしで直接本番環境にデプロイする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thực hành tốt là luôn thực hiện phân tích tác động trước để xác định đúng phạm vi kiểm thử, đảm bảo cả phần thay đổi lẫn các vùng bị ảnh hưởng gián tiếp đều được kiểm tra đầy đủ.",
      "en": "Good practice is always performing impact analysis first to properly define the test scope, ensuring both the change itself and indirectly affected areas are adequately tested.",
      "ja": "良いプラクティスは、常に最初に影響分析を行ってテスト範囲を適切に定義し、変更自体と間接的に影響を受ける領域の両方が十分にテストされるようにすることです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Tại sao việc bỏ qua phân tích tác động trước khi triển khai một bản vá khẩn cấp (hotfix) có thể gây rủi ro cao?",
      "en": "Why can skipping impact analysis before deploying an urgent hotfix be highly risky?",
      "ja": "緊急パッチ（hotfix）を展開する前に影響分析を省略することがなぜ高いリスクを伴うのですか。"
    },
    "options": [
      {
        "vi": "Vì hotfix không bao giờ ảnh hưởng đến bất kỳ phần nào khác của hệ thống",
        "en": "Because a hotfix never affects any other part of the system",
        "ja": "緊急パッチはシステムの他の部分に一切影響を与えないから"
      },
      {
        "vi": "Vì có thể vô tình phá vỡ các chức năng liên quan mà không ai kịp phát hiện trước khi phát hành",
        "en": "Because it may unintentionally break related functionality that no one catches before release",
        "ja": "関連する機能を意図せず壊してしまい、リリース前に誰も気づかない可能性があるから"
      },
      {
        "vi": "Vì phân tích tác động chỉ có ý nghĩa với dự án phát triển mới",
        "en": "Because impact analysis only matters for new development projects",
        "ja": "影響分析は新規開発プロジェクトにのみ意味があるから"
      },
      {
        "vi": "Vì phân tích tác động luôn làm chậm quá trình phát hành mà không mang lại lợi ích",
        "en": "Because impact analysis always slows down release without providing any benefit",
        "ja": "影響分析は常にリリースを遅らせるだけで利益をもたらさないから"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Do áp lực thời gian, hotfix dễ bị triển khai vội mà không đánh giá đầy đủ các vùng liên quan, dẫn đến nguy cơ gây lỗi mới ở những chức năng tưởng chừng không liên quan.",
      "en": "Due to time pressure, hotfixes risk being deployed without fully assessing related areas, potentially introducing new defects in seemingly unrelated functionality.",
      "ja": "時間的な制約から、緊急パッチは関連領域を十分に評価しないまま展開されるリスクがあり、一見無関係に見える機能に新たな欠陥を引き起こす可能性があります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong kiểm thử bảo trì, khái niệm \"phạm vi kiểm thử phù hợp\" (appropriate test scope) được xác định dựa trên yếu tố nào là chính?",
      "en": "In maintenance testing, the concept of an \"appropriate test scope\" is mainly determined based on what?",
      "ja": "保守テストにおいて、「適切なテスト範囲」という概念は主に何に基づいて決定されますか。"
    },
    "options": [
      {
        "vi": "Ngày trong tuần mà thay đổi được triển khai",
        "en": "The day of the week the change is deployed",
        "ja": "変更が展開される曜日"
      },
      {
        "vi": "Sở thích cá nhân của quản lý dự án về màu sắc báo cáo",
        "en": "The project manager's personal preference for report colors",
        "ja": "プロジェクトマネージャーのレポート色に対する個人的な好み"
      },
      {
        "vi": "Mức độ, loại và rủi ro của thay đổi, dựa trên kết quả phân tích tác động",
        "en": "The extent, type, and risk of the change, based on impact analysis results",
        "ja": "影響分析の結果に基づく、変更の規模・種類・リスク"
      },
      {
        "vi": "Số lượng email được gửi trong dự án",
        "en": "The number of emails sent during the project",
        "ja": "プロジェクト中に送信されたメールの数"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phạm vi kiểm thử bảo trì phù hợp cần dựa trên mức độ và loại thay đổi cũng như rủi ro liên quan, được xác định thông qua phân tích tác động một cách có hệ thống.",
      "en": "An appropriate maintenance test scope should be based on the extent and type of change and its associated risk, systematically determined through impact analysis.",
      "ja": "適切な保守テスト範囲は、変更の規模や種類、それに伴うリスクに基づくべきであり、これは影響分析を通じて体系的に決定されます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đặc điểm nào sau đây MÔ TẢ ĐÚNG NHẤT một buổi \"informal review\" (đánh giá không chính thức)?",
      "en": "Which statement BEST describes an \"informal review\"?",
      "ja": "「インフォーマルレビュー(informal review)」を最も正確に説明しているのはどれか。"
    },
    "options": [
      {
        "vi": "Luôn thu thập số liệu (metrics) để cải tiến quy trình review trong tương lai",
        "en": "It always collects metrics to improve the review process in the future",
        "ja": "将来のレビュープロセス改善のため常に指標(メトリクス)を収集する"
      },
      {
        "vi": "Bắt buộc phải có moderator điều phối và biên bản họp được lưu trữ theo mẫu chuẩn",
        "en": "It must have a moderator coordinating and meeting minutes stored using a standard template",
        "ja": "必ずモデレーターが進行し、標準テンプレートで議事録を保存しなければならない"
      },
      {
        "vi": "Chỉ được thực hiện bởi kiểm toán viên chất lượng độc lập với dự án",
        "en": "It can only be conducted by a quality auditor independent of the project",
        "ja": "プロジェクトから独立した品質監査人だけが実施できる"
      },
      {
        "vi": "Không có quy trình chính thức được ghi chép lại, có thể chỉ là một đồng nghiệp đọc qua tài liệu và góp ý",
        "en": "There is no documented formal process; it may just be a colleague reading through the document and giving feedback",
        "ja": "文書化された正式な手順がなく、同僚が資料に目を通してフィードバックするだけの場合もある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Informal review là hình thức ít chính thức nhất trong các loại review tĩnh: không yêu cầu quy trình xác định, không nhất thiết có tài liệu hay biên bản, có thể chỉ là một cuộc trao đổi ngắn hoặc pair programming.",
      "en": "Informal review is the least formal type of static review: it does not require a defined process, documentation is optional, and it can be as simple as a short discussion or pair programming.",
      "ja": "インフォーマルレビューは静的レビューの中で最も形式度が低い種類であり、定められた手順を必要とせず、文書化も必須ではない。短い話し合いやペアプログラミングだけの場合もある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong một buổi \"walkthrough\", ai thường là người dẫn dắt và trình bày nội dung tài liệu?",
      "en": "In a \"walkthrough\", who typically leads and presents the document?",
      "ja": "「ウォークスルー(walkthrough)」において、通常誰が資料を主導し説明するか。"
    },
    "options": [
      {
        "vi": "Tác giả (author) của tài liệu đang được xem xét",
        "en": "The author of the document being reviewed",
        "ja": "レビュー対象文書の作成者(オーサー)"
      },
      {
        "vi": "Người quản lý dự án cấp cao",
        "en": "The senior project manager",
        "ja": "上級プロジェクトマネージャー"
      },
      {
        "vi": "Một kiểm toán viên bên ngoài tổ chức",
        "en": "An external auditor outside the organization",
        "ja": "組織外の外部監査人"
      },
      {
        "vi": "Người kiểm thử độc lập chưa từng đọc tài liệu trước đó",
        "en": "An independent tester who has never seen the document before",
        "ja": "事前に資料を見たことのない独立したテスター"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Walkthrough là buổi họp do chính tác giả chủ trì, trình bày tài liệu từng bước cho nhóm để thu thập phản hồi, phát hiện vấn đề và thống nhất cách hiểu chung.",
      "en": "A walkthrough is a session led by the document's author, who presents the material step by step to the group to gather feedback, find issues, and build shared understanding.",
      "ja": "ウォークスルーは文書の作成者自身が主導し、資料を段階的にグループへ説明してフィードバックを集め、問題点を見つけ、共通理解を築くための会議である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục tiêu chính của \"technical review\" (đánh giá kỹ thuật) là gì?",
      "en": "What is the primary goal of a \"technical review\"?",
      "ja": "「テクニカルレビュー(technical review)」の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Kiểm tra tiến độ dự án so với kế hoạch ngân sách",
        "en": "Checking project progress against the budget plan",
        "ja": "プロジェクトの進捗を予算計画と照合すること"
      },
      {
        "vi": "Thảo luận và đánh giá các quyết định thiết kế/kỹ thuật để tìm sự bất nhất, lỗi kỹ thuật hoặc sai lệch chuẩn",
        "en": "Discussing and evaluating technical/design decisions to find inconsistencies, technical defects, or deviations from standards",
        "ja": "技術的・設計上の判断を議論・評価し、不整合や技術的欠陥、標準からの逸脱を見つけること"
      },
      {
        "vi": "Ký duyệt hợp đồng với khách hàng trước khi bàn giao",
        "en": "Signing off the contract with the customer before delivery",
        "ja": "納品前に顧客との契約に署名すること"
      },
      {
        "vi": "Thay thế hoàn toàn cho kiểm thử động ở giai đoạn cuối dự án",
        "en": "Completely replacing dynamic testing at the end of the project",
        "ja": "プロジェクト終盤で動的テストを完全に置き換えること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Technical review tập trung vào nội dung kỹ thuật của tài liệu (thiết kế, mã nguồn...), do các đồng nghiệp có chuyên môn kỹ thuật thực hiện, nhằm phát hiện bất nhất, vi phạm chuẩn kỹ thuật hoặc lỗi thiết kế.",
      "en": "A technical review focuses on the technical content of a document (design, code, etc.), conducted by technically qualified peers to find inconsistencies, standard violations, or design defects.",
      "ja": "テクニカルレビューは文書(設計、ソースコードなど)の技術的内容に焦点を当て、技術的知見を持つ同僚が実施し、不整合や技術標準違反、設計上の欠陥を見つけることを目的とする。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "\"Inspection\" (kiểm tra chính thức) khác biệt gì so với các loại review khác về mặt hình thức?",
      "en": "How does \"inspection\" differ from other review types in terms of formality?",
      "ja": "「インスペクション(inspection)」が形式度の点で他のレビュー種類と異なる点は何か。"
    },
    "options": [
      {
        "vi": "Là loại review kém chính thức nhất, không cần chuẩn bị trước",
        "en": "It is the least formal review type, requiring no preparation",
        "ja": "最も形式度が低いレビュー種類であり、事前準備を必要としない"
      },
      {
        "vi": "Chỉ áp dụng cho mã nguồn, không áp dụng cho tài liệu yêu cầu",
        "en": "It only applies to source code, not to requirements documents",
        "ja": "ソースコードにのみ適用され、要件文書には適用されない"
      },
      {
        "vi": "Là loại review có mức độ hình thức cao nhất, tuân theo quy trình xác định, sử dụng checklist và thu thập số liệu",
        "en": "It is the most formal review type, following a defined process, using checklists, and collecting metrics",
        "ja": "最も形式度の高いレビュー種類であり、定められた手順に従い、チェックリストを使用し、指標を収集する"
      },
      {
        "vi": "Không cần vai trò moderator vì tác giả tự điều phối cuộc họp",
        "en": "It does not need a moderator role because the author self-facilitates the meeting",
        "ja": "作成者自身が会議を進行するためモデレーターの役割は不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Inspection là hình thức review chính thức nhất trong CTFL, tuân theo quy trình định nghĩa rõ ràng (kick-off, chuẩn bị, họp, rework, follow-up), có checklist, đo lường metrics, và tiêu chí đầu vào/đầu ra rõ ràng.",
      "en": "Inspection is the most formal review type in CTFL, following a clearly defined process (kick-off, preparation, meeting, rework, follow-up), using checklists, collecting metrics, and having clear entry/exit criteria.",
      "ja": "インスペクションはCTFLにおける最も形式度の高いレビュー種類であり、明確に定義された手順(キックオフ、準備、会議、修正、フォローアップ)に従い、チェックリストを使い、指標を収集し、明確な開始・終了基準を持つ。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Lợi ích quan trọng của kiểm thử tĩnh (bao gồm review và phân tích tĩnh) là gì so với kiểm thử động?",
      "en": "What is a key benefit of static testing (reviews and static analysis) compared to dynamic testing?",
      "ja": "静的テスト(レビューと静的解析を含む)が動的テストと比較して持つ重要な利点は何か。"
    },
    "options": [
      {
        "vi": "Chỉ có giá trị đối với mã nguồn đã được triển khai lên production",
        "en": "It only has value for code already deployed to production",
        "ja": "本番環境にデプロイされたコードに対してのみ価値がある"
      },
      {
        "vi": "Chỉ có thể phát hiện lỗi hiệu năng khi hệ thống chạy dưới tải cao",
        "en": "It can only find performance defects when the system runs under heavy load",
        "ja": "高負荷下でシステムを実行している時のみパフォーマンス欠陥を発見できる"
      },
      {
        "vi": "Yêu cầu môi trường kiểm thử giống hệt môi trường production",
        "en": "It requires a test environment identical to the production environment",
        "ja": "本番環境と全く同じテスト環境を必要とする"
      },
      {
        "vi": "Có thể phát hiện khiếm khuyết sớm, trước khi phần mềm có thể thực thi được",
        "en": "It can find defects early, before the software is even executable",
        "ja": "ソフトウェアが実行可能になる前の早い段階で欠陥を発見できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì không cần thực thi code, kiểm thử tĩnh có thể áp dụng ngay từ giai đoạn yêu cầu, thiết kế, giúp phát hiện khiếm khuyết rất sớm, giảm chi phí sửa lỗi so với việc chờ đến khi kiểm thử động.",
      "en": "Because it does not require code execution, static testing can be applied as early as the requirements and design stages, allowing defects to be found very early and reducing the cost of fixing them compared to waiting for dynamic testing.",
      "ja": "コードの実行を必要としないため、静的テストは要件定義や設計の段階から適用でき、欠陥を非常に早期に発見でき、動的テストを待つ場合に比べて修正コストを削減できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phân tích tĩnh (static analysis) khác biệt căn bản gì so với việc con người review tài liệu?",
      "en": "What is the fundamental difference between static analysis and a human document review?",
      "ja": "静的解析(static analysis)が人によるドキュメントレビューと根本的に異なる点は何か。"
    },
    "options": [
      {
        "vi": "Static analysis được thực hiện bằng công cụ tự động phân tích mã nguồn/mô hình mà không cần thực thi chương trình",
        "en": "Static analysis is performed by automated tools that examine source code/models without executing the program",
        "ja": "静的解析はプログラムを実行せずにソースコードやモデルを解析する自動化ツールによって行われる"
      },
      {
        "vi": "Static analysis luôn cần một môi trường thực thi đầy đủ giống production",
        "en": "Static analysis always requires a full production-like execution environment",
        "ja": "静的解析は常に本番環境に近い完全な実行環境を必要とする"
      },
      {
        "vi": "Static analysis chỉ có thể thực hiện sau khi hệ thống đã bàn giao cho khách hàng",
        "en": "Static analysis can only be performed after the system has been delivered to the customer",
        "ja": "静的解析はシステムが顧客に納品された後でしか行えない"
      },
      {
        "vi": "Static analysis thay thế hoàn toàn vai trò của reviewer con người trong mọi dự án",
        "en": "Static analysis completely replaces the role of human reviewers in every project",
        "ja": "静的解析はあらゆるプロジェクトで人によるレビュアーの役割を完全に置き換える"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Static analysis dùng công cụ tự động để kiểm tra mã nguồn hoặc mô hình phần mềm mà không cần chạy chương trình, khác với review là hoạt động do con người thực hiện thủ công.",
      "en": "Static analysis uses automated tools to examine source code or software models without running the program, unlike a review which is a manual activity performed by people.",
      "ja": "静的解析はプログラムを実行することなく、自動化ツールを用いてソースコードやソフトウェアモデルを検査するものであり、人が手動で行うレビューとは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Công cụ phân tích tĩnh (static analysis tool) thường phát hiện được loại vấn đề nào sau đây trong mã nguồn?",
      "en": "Which of the following issues can a static analysis tool typically detect in source code?",
      "ja": "静的解析ツールがソースコード中で通常検出できる問題は次のうちどれか。"
    },
    "options": [
      {
        "vi": "Người dùng có hài lòng với giao diện hay không",
        "en": "Whether users are satisfied with the user interface",
        "ja": "ユーザーがUIに満足しているかどうか"
      },
      {
        "vi": "Biến được khai báo nhưng không bao giờ được sử dụng (unused variable)",
        "en": "A variable that is declared but never used (unused variable)",
        "ja": "宣言されているが一度も使用されない変数(未使用変数)"
      },
      {
        "vi": "Thời gian phản hồi thực tế của hệ thống khi có 1000 người dùng đồng thời",
        "en": "The system's actual response time with 1000 concurrent users",
        "ja": "1000人の同時ユーザーがいる場合のシステムの実際の応答時間"
      },
      {
        "vi": "Chi phí vận hành hạ tầng cloud hàng tháng",
        "en": "The monthly cloud infrastructure operating cost",
        "ja": "クラウドインフラの月間運用コスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Static analysis tool kiểm tra cấu trúc mã nguồn mà không thực thi nó, có thể phát hiện biến không sử dụng, code không thể truy cập, vi phạm chuẩn coding... còn các vấn đề như hiệu năng thực tế hay sự hài lòng người dùng cần kiểm thử động hoặc khảo sát.",
      "en": "A static analysis tool examines code structure without executing it and can detect unused variables, unreachable code, or coding standard violations; issues like actual performance or user satisfaction require dynamic testing or surveys.",
      "ja": "静的解析ツールはコードを実行せずに構造を検査するため、未使用変数や到達不能コード、コーディング規約違反などを検出できる。実際のパフォーマンスやユーザー満足度のような問題は動的テストや調査が必要である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Độ phức tạp cyclomatic complexity của một hàm thường được đo bằng cách nào?",
      "en": "How is the cyclomatic complexity of a function typically measured?",
      "ja": "関数のサイクロマティック複雑度(cyclomatic complexity)は通常どのように測定されるか。"
    },
    "options": [
      {
        "vi": "Bằng cách chạy chương trình nhiều lần và đếm số lỗi phát sinh",
        "en": "By running the program many times and counting the errors that occur",
        "ja": "プログラムを何度も実行してエラー発生数を数える"
      },
      {
        "vi": "Bằng cách khảo sát ý kiến người dùng cuối về độ khó sử dụng",
        "en": "By surveying end users about how difficult the software is to use",
        "ja": "エンドユーザーに使いにくさについてアンケートを取ることによる"
      },
      {
        "vi": "Bằng công cụ phân tích tĩnh xem xét cấu trúc luồng điều khiển của mã nguồn mà không cần thực thi",
        "en": "By a static analysis tool examining the control flow structure of the source code without executing it",
        "ja": "静的解析ツールがソースコードを実行せずに制御フロー構造を調べることによる"
      },
      {
        "vi": "Bằng cách đo thời gian build của dự án trên máy chủ CI",
        "en": "By measuring the project's build time on a CI server",
        "ja": "CIサーバー上でのプロジェクトのビルド時間を測定することによる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cyclomatic complexity là một chỉ số cấu trúc mã nguồn (số đường đi độc lập trong luồng điều khiển), được tính toán bởi công cụ phân tích tĩnh mà không cần chạy chương trình.",
      "en": "Cyclomatic complexity is a code structure metric (number of independent paths in the control flow) computed by a static analysis tool without running the program.",
      "ja": "サイクロマティック複雑度は制御フロー中の独立した経路数を示すコード構造の指標であり、プログラムを実行せずに静的解析ツールによって計算される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Checklist được sử dụng trong một buổi review chính thức nhằm mục đích gì?",
      "en": "What is the purpose of using a checklist in a formal review?",
      "ja": "正式なレビューにおいてチェックリストを使用する目的は何か。"
    },
    "options": [
      {
        "vi": "Chỉ áp dụng cho kiểm thử động, không liên quan đến review tài liệu",
        "en": "It only applies to dynamic testing and is unrelated to document reviews",
        "ja": "動的テストにのみ適用され、文書レビューとは無関係である"
      },
      {
        "vi": "Thay thế hoàn toàn nhu cầu đọc tài liệu trước khi họp review",
        "en": "It completely replaces the need to read the document before the review meeting",
        "ja": "レビュー会議前に資料を読む必要性を完全になくす"
      },
      {
        "vi": "Dùng để tính lương thưởng cho tác giả tài liệu dựa trên số lỗi tìm được",
        "en": "It is used to calculate the author's bonus based on the number of defects found",
        "ja": "発見された欠陥数に基づいて作成者の賞与を計算するために使う"
      },
      {
        "vi": "Giúp reviewer nhớ các loại lỗi phổ biến cần tìm, tăng tính nhất quán và hiệu quả phát hiện khiếm khuyết",
        "en": "It helps reviewers remember common defect types to look for, improving consistency and defect-finding effectiveness",
        "ja": "レビュアーが探すべき典型的な欠陥の種類を思い出す助けとなり、一貫性と欠陥発見の効果を高める"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Checklist trong review liệt kê các loại lỗi thường gặp (ví dụ: thiếu điều kiện biên, mâu thuẫn yêu cầu) giúp reviewer tập trung, nhất quán và không bỏ sót các vấn đề quan trọng.",
      "en": "A review checklist lists common defect types (e.g., missing boundary conditions, conflicting requirements) to help reviewers stay focused, consistent, and avoid missing important issues.",
      "ja": "レビューチェックリストには、境界条件の欠落や要件の矛盾といった典型的な欠陥の種類が列挙されており、レビュアーが集中し、一貫性を保ち、重要な問題を見逃さないようにする助けとなる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong quy trình review chính thức, vai trò \"author\" (tác giả) chịu trách nhiệm chính là gì?",
      "en": "In a formal review process, what is the \"author\" role primarily responsible for?",
      "ja": "正式なレビュープロセスにおいて、「作成者(author)」の役割が主に担う責任は何か。"
    },
    "options": [
      {
        "vi": "Người tạo ra tài liệu/sản phẩm công việc đang được review và thực hiện sửa chữa (rework) các khiếm khuyết được tìm thấy",
        "en": "The person who created the work product being reviewed, and who performs rework to fix the defects found",
        "ja": "レビュー対象の作業成果物を作成した人物であり、発見された欠陥の修正(リワーク)を行う"
      },
      {
        "vi": "Điều phối lịch họp và đảm bảo mọi người tuân thủ quy trình review",
        "en": "Scheduling meetings and ensuring everyone follows the review process",
        "ja": "会議の日程調整と、全員がレビュー手順を遵守するようにすること"
      },
      {
        "vi": "Ghi chép biên bản họp và các vấn đề được nêu ra trong buổi review",
        "en": "Recording meeting minutes and issues raised during the review",
        "ja": "会議の議事録とレビュー中に提起された問題を記録する"
      },
      {
        "vi": "Đại diện quản lý quyết định có nên đầu tư thêm ngân sách cho dự án hay không",
        "en": "A management representative deciding whether to invest more budget in the project",
        "ja": "プロジェクトに追加予算を投じるか決定する経営側の代表者"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Author là người viết ra tài liệu/sản phẩm công việc được review; sau buổi review, author chịu trách nhiệm thực hiện các sửa chữa cần thiết dựa trên khiếm khuyết được ghi nhận.",
      "en": "The author is the creator of the document/work product under review; after the review, the author is responsible for performing the necessary rework based on the recorded defects.",
      "ja": "作成者はレビュー対象の文書・作業成果物を作った人物であり、レビュー後は記録された欠陥に基づいて必要な修正(リワーク)を行う責任を負う。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vai trò \"scribe\" (người ghi chép) trong một buổi inspection có nhiệm vụ gì?",
      "en": "What is the responsibility of the \"scribe\" role in an inspection?",
      "ja": "インスペクションにおける「記録係(scribe)」の役割の責務は何か。"
    },
    "options": [
      {
        "vi": "Viết lại toàn bộ mã nguồn theo chuẩn coding mới sau buổi review",
        "en": "Rewriting all the source code according to a new coding standard after the review",
        "ja": "レビュー後、新しいコーディング規約に従って全ソースコードを書き直すこと"
      },
      {
        "vi": "Ghi lại tất cả các vấn đề, khiếm khuyết và quyết định được nêu ra trong buổi họp review",
        "en": "Recording all issues, defects, and decisions raised during the review meeting",
        "ja": "レビュー会議中に提起された全ての問題、欠陥、決定事項を記録すること"
      },
      {
        "vi": "Quyết định cuối cùng liệu sản phẩm có đạt tiêu chí phát hành hay không",
        "en": "Making the final decision on whether the product meets release criteria",
        "ja": "製品がリリース基準を満たすかどうかの最終決定を下すこと"
      },
      {
        "vi": "Đào tạo các thành viên mới về công cụ quản lý mã nguồn",
        "en": "Training new team members on source code management tools",
        "ja": "新しいチームメンバーにソースコード管理ツールを教育すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Scribe (hay recorder) là người ghi lại các vấn đề, khiếm khuyết, câu hỏi và quyết định phát sinh trong buổi họp review để làm cơ sở cho báo cáo và giai đoạn rework sau đó.",
      "en": "The scribe (or recorder) documents the issues, defects, questions, and decisions that arise during the review meeting, forming the basis for the report and subsequent rework.",
      "ja": "記録係(スクライブ)はレビュー会議中に生じた問題、欠陥、質問、決定事項を記録し、その後の報告書や修正(リワーク)段階の基礎とする。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Xét về mức độ hình thức, thứ tự nào sau đây sắp xếp ĐÚNG các loại review từ ít chính thức nhất đến chính thức nhất?",
      "en": "In terms of formality, which order correctly ranks the review types from least to most formal?",
      "ja": "形式度の観点で、レビュー種類を非公式なものから公式なものへ正しく並べたのはどれか。"
    },
    "options": [
      {
        "vi": "Inspection → technical review → walkthrough → informal review",
        "en": "Inspection → technical review → walkthrough → informal review",
        "ja": "インスペクション → テクニカルレビュー → ウォークスルー → インフォーマルレビュー"
      },
      {
        "vi": "Walkthrough → informal review → inspection → technical review",
        "en": "Walkthrough → informal review → inspection → technical review",
        "ja": "ウォークスルー → インフォーマルレビュー → インスペクション → テクニカルレビュー"
      },
      {
        "vi": "Informal review → walkthrough → technical review → inspection",
        "en": "Informal review → walkthrough → technical review → inspection",
        "ja": "インフォーマルレビュー → ウォークスルー → テクニカルレビュー → インスペクション"
      },
      {
        "vi": "Technical review → inspection → informal review → walkthrough",
        "en": "Technical review → inspection → informal review → walkthrough",
        "ja": "テクニカルレビュー → インスペクション → インフォーマルレビュー → ウォークスルー"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Theo CTFL, mức độ hình thức tăng dần theo thứ tự: informal review (ít nhất) → walkthrough → technical review → inspection (chính thức nhất, có quy trình, checklist, số liệu rõ ràng).",
      "en": "According to CTFL, formality increases in the order: informal review (least) → walkthrough → technical review → inspection (most formal, with defined process, checklists, and metrics).",
      "ja": "CTFLによると、形式度はインフォーマルレビュー(最も低い)→ウォークスルー→テクニカルレビュー→インスペクション(手順・チェックリスト・指標が明確で最も形式度が高い)の順で高くなる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Hoạt động \"pair programming\" (hai lập trình viên cùng viết code trên một máy) thường được xem là dạng review nào?",
      "en": "\"Pair programming\" (two developers writing code together on one machine) is typically considered which type of review?",
      "ja": "「ペアプログラミング(pair programming)」(2人の開発者が1台のマシンで一緒にコードを書く)は通常どの種類のレビューと見なされるか。"
    },
    "options": [
      {
        "vi": "Một dạng review chính thức bắt buộc phải có moderator và checklist",
        "en": "A formal review that must have a moderator and checklist",
        "ja": "モデレーターとチェックリストを必ず伴う正式なレビュー"
      },
      {
        "vi": "Không được xem là bất kỳ hình thức kiểm thử tĩnh nào",
        "en": "Not considered any form of static testing",
        "ja": "いかなる静的テストの形態とも見なされない"
      },
      {
        "vi": "Một dạng inspection thu nhỏ với số liệu được báo cáo cho quản lý hàng tuần",
        "en": "A miniature inspection with metrics reported to management weekly",
        "ja": "毎週管理職に指標を報告する小規模なインスペクション"
      },
      {
        "vi": "Một dạng informal review vì không có quy trình xác định và diễn ra liên tục trong lúc viết code",
        "en": "A form of informal review, since there is no defined process and it happens continuously while coding",
        "ja": "定められた手順がなくコーディング中に継続的に行われるため、インフォーマルレビューの一種"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Pair programming là ví dụ điển hình của informal review: diễn ra liên tục, không cần quy trình chính thức, tài liệu hay checklist, nhưng vẫn giúp phát hiện khiếm khuyết sớm nhờ có người thứ hai quan sát code.",
      "en": "Pair programming is a classic example of informal review: it happens continuously, requires no formal process, documentation, or checklist, yet still helps catch defects early because a second person is observing the code.",
      "ja": "ペアプログラミングはインフォーマルレビューの典型例であり、継続的に行われ、正式な手順や文書、チェックリストを必要としないが、もう一人が常にコードを見ていることで早期の欠陥発見に役立つ。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử tĩnh (bao gồm review) có thể áp dụng cho những đối tượng nào?",
      "en": "What kinds of work products can static testing (including reviews) be applied to?",
      "ja": "静的テスト(レビューを含む)はどのような作業成果物に適用できるか。"
    },
    "options": [
      {
        "vi": "Có thể áp dụng cho nhiều loại work product như tài liệu yêu cầu, thiết kế, test case, mã nguồn — không chỉ code chạy được",
        "en": "It can be applied to many types of work products such as requirements documents, designs, test cases, and source code — not just executable code",
        "ja": "要件文書、設計、テストケース、ソースコードなど多くの種類の作業成果物に適用でき、実行可能なコードだけに限らない"
      },
      {
        "vi": "Chỉ áp dụng được cho mã nguồn đã hoàn thiện và có thể biên dịch chạy được",
        "en": "It can only be applied to finished, compilable, executable source code",
        "ja": "完成しコンパイル・実行可能なソースコードにのみ適用できる"
      },
      {
        "vi": "Chỉ áp dụng cho các tài liệu marketing của sản phẩm",
        "en": "It only applies to the product's marketing documents",
        "ja": "製品のマーケティング資料にのみ適用される"
      },
      {
        "vi": "Chỉ áp dụng sau khi sản phẩm đã được release cho khách hàng",
        "en": "It only applies after the product has been released to customers",
        "ja": "製品が顧客にリリースされた後にのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Một ưu điểm lớn của kiểm thử tĩnh là có thể áp dụng cho hầu hết các work product trong vòng đời phần mềm, kể cả tài liệu yêu cầu và thiết kế chưa thể thực thi, không giới hạn ở mã nguồn.",
      "en": "A major advantage of static testing is that it can be applied to almost any work product across the software lifecycle, including requirements and design documents that cannot yet be executed, not just source code.",
      "ja": "静的テストの大きな利点は、実行できない要件文書や設計文書を含め、ソフトウェアライフサイクルのほぼ全ての作業成果物に適用できることであり、ソースコードだけに限られない。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ngoài việc tìm khiếm khuyết, review còn mang lại lợi ích gì cho nhóm dự án?",
      "en": "Besides finding defects, what other benefit does a review bring to the project team?",
      "ja": "欠陥発見の他に、レビューがプロジェクトチームにもたらす利点は何か。"
    },
    "options": [
      {
        "vi": "Đảm bảo tự động triển khai code lên môi trường production",
        "en": "Ensuring automatic deployment of code to the production environment",
        "ja": "本番環境へのコードの自動デプロイを保証する"
      },
      {
        "vi": "Cải thiện giao tiếp và chia sẻ kiến thức giữa các thành viên, giúp nhiều người hiểu rõ hơn về hệ thống",
        "en": "Improving communication and knowledge sharing among team members, helping more people understand the system",
        "ja": "チームメンバー間のコミュニケーションと知識共有を改善し、より多くの人がシステムをよく理解できるようにする"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu viết test case cho tính năng đã review",
        "en": "Completely eliminating the need to write test cases for the reviewed feature",
        "ja": "レビュー済みの機能に対するテストケース作成の必要性を完全になくす"
      },
      {
        "vi": "Thay thế vai trò của quản lý dự án trong việc lập kế hoạch release",
        "en": "Replacing the project manager's role in release planning",
        "ja": "リリース計画立案におけるプロジェクトマネージャーの役割を置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Bên cạnh phát hiện khiếm khuyết, review còn giúp các thành viên trao đổi kiến thức, hiểu rõ hơn về sản phẩm và cách tiếp cận của nhau, nâng cao chất lượng chung của nhóm.",
      "en": "Besides finding defects, reviews help team members exchange knowledge, better understand the product and each other's approaches, and raise the overall quality of the team's work.",
      "ja": "欠陥発見に加えて、レビューはチームメンバーが知識を交換し、製品やお互いのアプローチについての理解を深め、チーム全体の作業品質を高める助けとなる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "\"Entry criteria\" (tiêu chí đầu vào) của một buổi review chính thức thường quy định điều gì?",
      "en": "What does the \"entry criteria\" of a formal review typically specify?",
      "ja": "正式なレビューの「入場基準(entry criteria)」は通常何を規定するか。"
    },
    "options": [
      {
        "vi": "Ngân sách tối đa được chi cho việc tổ chức buổi review",
        "en": "The maximum budget allowed for organizing the review",
        "ja": "レビューを実施するための最大予算"
      },
      {
        "vi": "Số lượng người tham dự buổi họp review tối đa được phép",
        "en": "The maximum number of participants allowed to attend the review meeting",
        "ja": "レビュー会議への参加が許される最大人数"
      },
      {
        "vi": "Điều kiện cần thoả mãn trước khi review bắt đầu, ví dụ tài liệu đã đạt độ hoàn thiện tối thiểu và không còn lỗi chính tả rõ ràng",
        "en": "Conditions that must be met before the review can start, e.g., the document has reached a minimum level of completeness and has no obvious typos",
        "ja": "レビューを開始する前に満たすべき条件、例えば文書が最低限の完成度に達し、明らかな誤字がないこと"
      },
      {
        "vi": "Danh sách khách hàng sẽ được mời tham dự buổi review",
        "en": "The list of customers who will be invited to attend the review",
        "ja": "レビューに招待される顧客のリスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Entry criteria là các điều kiện tối thiểu tài liệu/sản phẩm phải đạt được trước khi đưa vào review chính thức, tránh lãng phí thời gian review một tài liệu chưa sẵn sàng.",
      "en": "Entry criteria are the minimum conditions a document/product must meet before entering formal review, to avoid wasting time reviewing something that is not ready.",
      "ja": "入場基準とは、正式なレビューに入る前に文書・成果物が満たすべき最低条件であり、準備が整っていない文書をレビューして時間を無駄にすることを防ぐ。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "\"Exit criteria\" của một buổi inspection dùng để xác định điều gì?",
      "en": "What does the \"exit criteria\" of an inspection determine?",
      "ja": "インスペクションの「終了基準(exit criteria)」は何を判定するために使われるか。"
    },
    "options": [
      {
        "vi": "Xác định thời điểm dự án chính thức kết thúc hoàn toàn",
        "en": "It determines when the entire project officially ends",
        "ja": "プロジェクト全体が正式に終了する時期を判定する"
      },
      {
        "vi": "Xác định danh sách nhân viên sẽ bị sa thải nếu tìm ra quá nhiều lỗi",
        "en": "It determines the list of staff to be dismissed if too many defects are found",
        "ja": "欠陥が多すぎる場合に解雇される従業員のリストを判定する"
      },
      {
        "vi": "Xác định mức lương thưởng cho author dựa trên số khiếm khuyết tìm được",
        "en": "It determines the author's bonus based on the number of defects found",
        "ja": "発見された欠陥数に基づいて作成者の賞与を判定する"
      },
      {
        "vi": "Xác định khi nào buổi review được coi là hoàn tất và sản phẩm được chấp nhận tiến sang bước tiếp theo",
        "en": "It determines when the review is considered complete and the product can move to the next step",
        "ja": "レビューがいつ完了したと見なされ、成果物が次のステップへ進めるかを判定する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Exit criteria xác định khi nào review được coi là hoàn thành, ví dụ tất cả khiếm khuyết đã được ghi nhận, phân loại và có kế hoạch xử lý, để sản phẩm có thể chuyển sang giai đoạn tiếp theo.",
      "en": "Exit criteria define when a review is considered complete, e.g., all defects have been logged, classified, and have a resolution plan, so the product can move to the next stage.",
      "ja": "終了基準は、全ての欠陥が記録・分類され対応計画があるなど、レビューがいつ完了と見なされ、成果物が次の段階へ進めるかを定義する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong quy trình formal review, mục đích của cuộc họp \"kick-off\" là gì?",
      "en": "In the formal review process, what is the purpose of the \"kick-off\" meeting?",
      "ja": "正式なレビュープロセスにおいて、「キックオフ(kick-off)」会議の目的は何か。"
    },
    "options": [
      {
        "vi": "Thông báo mục tiêu review, phân phát tài liệu và giải thích quy trình cho các reviewer trước khi họ tự chuẩn bị",
        "en": "Communicating the review objectives, distributing documents, and explaining the process to reviewers before their individual preparation",
        "ja": "個々の準備を始める前に、レビュアーへレビューの目的を伝え、資料を配布し、手順を説明すること"
      },
      {
        "vi": "Công bố kết quả cuối cùng của review và ký biên bản nghiệm thu",
        "en": "Announcing the final review results and signing the acceptance record",
        "ja": "レビューの最終結果を発表し、検収記録に署名すること"
      },
      {
        "vi": "Đào tạo toàn bộ nhóm về ngôn ngữ lập trình mới sẽ sử dụng trong dự án",
        "en": "Training the whole team on a new programming language to be used in the project",
        "ja": "プロジェクトで使用する新しいプログラミング言語についてチーム全体を教育すること"
      },
      {
        "vi": "Tổng kết chi phí dự án sau khi hoàn tất tất cả các buổi review",
        "en": "Summarizing project costs after all review sessions are complete",
        "ja": "全レビューセッション完了後のプロジェクトコストをまとめること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kick-off meeting là bước mở đầu quy trình review chính thức, giúp thống nhất mục tiêu, phân phát tài liệu và hướng dẫn cách thực hiện trước khi reviewer bước vào giai đoạn chuẩn bị cá nhân.",
      "en": "The kick-off meeting starts the formal review process, aligning objectives, distributing documents, and explaining the approach before reviewers move into individual preparation.",
      "ja": "キックオフ会議は正式なレビュープロセスの開始段階であり、目的をすり合わせ、資料を配布し、レビュアーが個別準備に入る前にやり方を説明する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Giai đoạn \"individual preparation\" (chuẩn bị cá nhân) trong quy trình review chính thức có ý nghĩa gì?",
      "en": "What is the significance of the \"individual preparation\" phase in the formal review process?",
      "ja": "正式なレビュープロセスにおける「個別準備(individual preparation)」段階の意義は何か。"
    },
    "options": [
      {
        "vi": "Chỉ dành riêng cho tác giả để tự sửa lỗi trước khi mời người khác tham gia",
        "en": "It is reserved only for the author to fix issues before inviting others to participate",
        "ja": "他者を招く前に作成者だけが問題を修正するための段階である"
      },
      {
        "vi": "Mỗi reviewer tự đọc và ghi chú các vấn đề tiềm ẩn trước khi tham gia họp, giúp buổi họp hiệu quả hơn",
        "en": "Each reviewer reads the material and notes potential issues before the meeting, making the meeting more effective",
        "ja": "各レビュアーが会議前に資料を読んで潜在的な問題をメモしておくことで、会議をより効果的にする"
      },
      {
        "vi": "Là giai đoạn không bắt buộc và thường bị bỏ qua trong inspection",
        "en": "It is an optional phase that is usually skipped in an inspection",
        "ja": "インスペクションでは通常省略される任意の段階である"
      },
      {
        "vi": "Diễn ra sau khi buổi họp review kết thúc để tổng hợp báo cáo",
        "en": "It occurs after the review meeting ends, to compile the report",
        "ja": "レビュー会議終了後、報告書をまとめるために行われる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Trong giai đoạn chuẩn bị cá nhân, mỗi reviewer đọc tài liệu, dùng checklist để tự tìm khiếm khuyết trước khi vào họp, giúp buổi họp tập trung thảo luận thay vì mất thời gian đọc lại từ đầu.",
      "en": "During individual preparation, each reviewer reads the document and uses a checklist to independently identify defects before the meeting, so the meeting can focus on discussion rather than reading from scratch.",
      "ja": "個別準備段階では、各レビュアーが資料を読み、チェックリストを用いて会議前に独自に欠陥を洗い出す。これにより会議は最初から読み直す時間を省き、議論に集中できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Điều nào sau đây là ĐÚNG khi so sánh giữa \"static analysis\" và các loại review có sự tham gia của con người?",
      "en": "Which of the following is TRUE when comparing \"static analysis\" with review types involving human participants?",
      "ja": "「静的解析」と人が参加するレビュー種類を比較したとき、正しいのはどれか。"
    },
    "options": [
      {
        "vi": "Static analysis chỉ có thể được thực hiện bởi moderator có chứng chỉ",
        "en": "Static analysis can only be performed by a certified moderator",
        "ja": "静的解析は認定を受けたモデレーターしか実施できない"
      },
      {
        "vi": "Static analysis luôn tốn nhiều thời gian và nhân lực hơn inspection",
        "en": "Static analysis always takes more time and manpower than an inspection",
        "ja": "静的解析は常にインスペクションよりも多くの時間と人員を要する"
      },
      {
        "vi": "Static analysis chạy tự động bằng công cụ, còn review dựa trên nhận xét thủ công của con người",
        "en": "Static analysis runs automatically via tools, while reviews rely on manual human commentary",
        "ja": "静的解析はツールにより自動で実行され、レビューは人による手動のコメントに依存する"
      },
      {
        "vi": "Static analysis có thể phát hiện lỗi logic nghiệp vụ phức tạp mà con người không bao giờ tìm thấy được",
        "en": "Static analysis can find complex business logic errors that humans could never find",
        "ja": "静的解析は人間が決して見つけられない複雑な業務ロジックの誤りを発見できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Static analysis là công cụ tự động phân tích cấu trúc mã nguồn theo quy tắc lập trình đã định nghĩa sẵn, trong khi review dựa vào khả năng phán đoán và nhận xét của con người, hai cách này bổ trợ cho nhau.",
      "en": "Static analysis is an automated tool-driven analysis of code structure against predefined rules, while reviews rely on human judgment and commentary; the two approaches complement each other.",
      "ja": "静的解析は事前に定義されたルールに基づきコード構造を自動的に解析するツールであるのに対し、レビューは人間の判断とコメントに依存しており、両者は互いに補完し合う。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vì sao kiểm thử tĩnh thường được xem là hiệu quả về chi phí (cost-effective) hơn so với chỉ dựa vào kiểm thử động?",
      "en": "Why is static testing often considered more cost-effective than relying on dynamic testing alone?",
      "ja": "静的テストが動的テストのみに頼るより費用対効果が高いとされる理由は何か。"
    },
    "options": [
      {
        "vi": "Vì static testing loại bỏ hoàn toàn nhu cầu viết tài liệu yêu cầu",
        "en": "Because static testing completely eliminates the need to write requirements documents",
        "ja": "静的テストは要件文書を書く必要性を完全になくすため"
      },
      {
        "vi": "Vì static testing không bao giờ cần đến nhân lực có kỹ năng chuyên môn",
        "en": "Because static testing never requires personnel with technical skills",
        "ja": "静的テストは専門技術を持つ人材を全く必要としないため"
      },
      {
        "vi": "Vì static testing tự động khắc phục tất cả các lỗi được tìm thấy",
        "en": "Because static testing automatically fixes all defects it finds",
        "ja": "静的テストは発見した全ての欠陥を自動的に修正するため"
      },
      {
        "vi": "Vì phát hiện khiếm khuyết càng sớm thì chi phí sửa chữa càng thấp, và static testing có thể thực hiện rất sớm trong vòng đời phát triển",
        "en": "Because the earlier a defect is found, the cheaper it is to fix, and static testing can be performed very early in the development lifecycle",
        "ja": "欠陥は早く発見するほど修正コストが低く、静的テストは開発ライフサイクルの非常に早い段階で実施できるため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chi phí sửa lỗi tăng dần theo giai đoạn phát hiện; vì static testing có thể áp dụng ngay từ giai đoạn yêu cầu/thiết kế, nó giúp phát hiện khiếm khuyết trước khi chúng lan sang các giai đoạn tốn kém hơn.",
      "en": "Defect-fixing cost rises the later a defect is found; since static testing can be applied as early as the requirements/design stage, it catches defects before they propagate into more expensive stages.",
      "ja": "欠陥の修正コストは発見が遅れるほど高くなる。静的テストは要件・設計段階から適用できるため、欠陥がより高コストな段階に伝播する前に発見できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Loại khiếm khuyết nào sau đây thường được phát hiện tốt hơn bằng kiểm thử tĩnh (review/phân tích tĩnh) so với kiểm thử động?",
      "en": "Which type of defect is typically found more effectively by static testing (review/static analysis) than by dynamic testing?",
      "ja": "次のうち、動的テストよりも静的テスト(レビュー・静的解析)の方がより効果的に発見できる欠陥の種類はどれか。"
    },
    "options": [
      {
        "vi": "Yêu cầu mâu thuẫn nhau hoặc thiết kế chưa nhất quán giữa các tài liệu",
        "en": "Conflicting requirements or design inconsistencies between documents",
        "ja": "文書間で矛盾する要件や設計の不整合"
      },
      {
        "vi": "Hành vi hệ thống dưới điều kiện tải cực đại trong môi trường thật",
        "en": "System behavior under extreme load conditions in a real environment",
        "ja": "実環境における極限的な負荷条件下でのシステムの挙動"
      },
      {
        "vi": "Trải nghiệm người dùng thực tế khi thao tác trên thiết bị di động",
        "en": "Actual user experience when operating on a mobile device",
        "ja": "モバイル端末を操作する際の実際のユーザー体験"
      },
      {
        "vi": "Thời gian phản hồi của API khi có 10.000 request đồng thời",
        "en": "API response time when there are 10,000 concurrent requests",
        "ja": "1万件の同時リクエストがある場合のAPI応答時間"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Kiểm thử tĩnh rất hiệu quả trong việc phát hiện mâu thuẫn, thiếu sót logic trong tài liệu yêu cầu/thiết kế trước khi code được viết, còn các vấn đề về hiệu năng, tải hệ thống thường cần kiểm thử động thực tế.",
      "en": "Static testing is very effective at catching contradictions and logical gaps in requirements/design documents before code is written, while performance and load issues usually require actual dynamic testing.",
      "ja": "静的テストは、コードが書かれる前の要件・設計文書における矛盾や論理的な欠落を発見するのに非常に効果的である一方、パフォーマンスや負荷の問題は通常、実際の動的テストが必要となる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ai thường có thể tham gia một buổi \"technical review\" bên cạnh tác giả tài liệu?",
      "en": "Besides the document's author, who can typically participate in a \"technical review\"?",
      "ja": "文書の作成者に加えて、「テクニカルレビュー」に通常参加できるのは誰か。"
    },
    "options": [
      {
        "vi": "Chỉ duy nhất giám đốc điều hành (CEO) của công ty",
        "en": "Only the company's CEO",
        "ja": "会社のCEOのみ"
      },
      {
        "vi": "Các đồng nghiệp có chuyên môn kỹ thuật liên quan như kiến trúc sư, lập trình viên khác, tester",
        "en": "Technically qualified peers such as architects, other developers, and testers",
        "ja": "アーキテクトや他の開発者、テスターなど関連する専門技術を持つ同僚"
      },
      {
        "vi": "Chỉ khách hàng bên ngoài chưa từng làm việc với đội dự án",
        "en": "Only external customers who have never worked with the project team",
        "ja": "プロジェクトチームと一度も仕事をしたことのない外部顧客のみ"
      },
      {
        "vi": "Không ai khác ngoài chính tác giả, vì đây là hoạt động tự đánh giá",
        "en": "No one besides the author, since it is a self-assessment activity",
        "ja": "これは自己評価活動であるため、作成者以外は誰も参加しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Technical review thường có sự tham gia của các đồng nghiệp kỹ thuật (kiến trúc sư, lập trình viên, tester...) nhằm đánh giá nội dung kỹ thuật một cách khách quan, thường không cần sự tham gia của quản lý.",
      "en": "A technical review typically involves technically qualified peers (architects, developers, testers, etc.) to objectively evaluate the technical content, and usually does not require management involvement.",
      "ja": "テクニカルレビューには通常、技術的内容を客観的に評価するためアーキテクトや開発者、テスターなど専門技術を持つ同僚が参加し、通常は経営層の関与を必要としない。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong quy trình formal review, giai đoạn \"rework\" và \"follow-up\" diễn ra nhằm mục đích gì?",
      "en": "In the formal review process, what is the purpose of the \"rework\" and \"follow-up\" phases?",
      "ja": "正式なレビュープロセスにおいて、「修正(rework)」と「フォローアップ(follow-up)」段階の目的は何か。"
    },
    "options": [
      {
        "vi": "Đào tạo lại toàn bộ nhóm kiểm thử về quy trình automation testing",
        "en": "Retraining the entire test team on automation testing processes",
        "ja": "テストチーム全体に自動化テストのプロセスを再教育する"
      },
      {
        "vi": "Lên kế hoạch tổ chức buổi họp kick-off tiếp theo cho dự án khác",
        "en": "Planning the next kick-off meeting for a different project",
        "ja": "別プロジェクトの次回キックオフ会議を計画する"
      },
      {
        "vi": "Author sửa các khiếm khuyết đã ghi nhận, sau đó kiểm tra lại xem việc sửa có đạt yêu cầu (đạt exit criteria) hay chưa",
        "en": "The author fixes the logged defects, and then it is verified whether the fixes meet the required exit criteria",
        "ja": "作成者が記録された欠陥を修正し、その修正が終了基準を満たしているかを検証する"
      },
      {
        "vi": "Xoá bỏ toàn bộ dữ liệu review trước đó để bắt đầu lại từ đầu",
        "en": "Deleting all previous review data to start over from scratch",
        "ja": "以前のレビューデータを全て削除して最初からやり直す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Sau buổi họp review, author thực hiện rework để sửa các khiếm khuyết đã ghi nhận; giai đoạn follow-up kiểm tra lại các sửa đổi đó có đáp ứng exit criteria hay chưa trước khi kết thúc quy trình review.",
      "en": "After the review meeting, the author performs rework to fix the logged defects; the follow-up phase checks whether those fixes meet the exit criteria before the review process is closed.",
      "ja": "レビュー会議後、作成者は記録された欠陥を修正するリワークを行い、フォローアップ段階でその修正が終了基準を満たしているかを確認してからレビュープロセスを終える。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Use case testing được định nghĩa như thế nào trong ISTQB Foundation?",
      "en": "How is use case testing defined in ISTQB Foundation?",
      "ja": "ISTQB Foundationにおいて、ユースケーステストはどのように定義されますか。"
    },
    "options": [
      {
        "vi": "Kỹ thuật kiểm thử dựa trên cấu trúc bảng cơ sở dữ liệu",
        "en": "A technique based on the structure of database tables",
        "ja": "データベーステーブルの構造に基づく技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử dựa trên việc phân tích mã nguồn nội bộ",
        "en": "A technique based on analyzing the internal source code",
        "ja": "内部のソースコードを分析することに基づく技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử chỉ áp dụng cho kiểm thử hiệu năng hệ thống",
        "en": "A technique used only for system performance testing",
        "ja": "システムの性能テストにのみ用いられる技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử hộp đen dựa trên các kịch bản tương tác giữa actor và hệ thống để mô tả hành vi nghiệp vụ",
        "en": "A black-box technique based on interaction scenarios between an actor and the system to describe business behavior",
        "ja": "アクターとシステムとの相互作用シナリオに基づき、業務上の振る舞いを記述するブラックボックステスト技法"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Use case testing là kỹ thuật hộp đen mô tả các bước tương tác giữa actor và hệ thống theo kịch bản nghiệp vụ thực tế, giúp thiết kế ca kiểm thử sát với cách người dùng sử dụng hệ thống.",
      "en": "Use case testing is a black-box technique describing the interaction steps between an actor and the system based on real business scenarios, helping design test cases close to actual usage.",
      "ja": "ユースケーステストは、実際の業務シナリオに基づきアクターとシステムの相互作用の手順を記述するブラックボックス技法であり、実際の利用方法に近いテストケースの設計に役立つ。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong use case, actor là gì?",
      "en": "In a use case, what is an actor?",
      "ja": "ユースケースにおける「アクター」とは何ですか。"
    },
    "options": [
      {
        "vi": "Người dùng hoặc hệ thống bên ngoài tương tác trực tiếp với hệ thống đang được kiểm thử",
        "en": "A user or external system that interacts directly with the system under test",
        "ja": "テスト対象システムと直接やり取りするユーザーまたは外部システム"
      },
      {
        "vi": "Một biến trong mã nguồn của hệ thống",
        "en": "A variable in the system's source code",
        "ja": "システムのソースコード内の変数"
      },
      {
        "vi": "Một trường dữ liệu đầu vào trên giao diện",
        "en": "An input field on the user interface",
        "ja": "画面上の入力フィールド"
      },
      {
        "vi": "Một thành phần trong bảng quyết định",
        "en": "A component of a decision table",
        "ja": "決定表を構成する要素"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Actor đại diện cho vai trò bên ngoài (người dùng, hệ thống khác) khởi tạo hoặc tham gia vào tương tác với hệ thống theo use case.",
      "en": "An actor represents an external role (a user or another system) that initiates or participates in interactions with the system according to the use case.",
      "ja": "アクターはユースケースに従いシステムとの相互作用を開始または参加する外部の役割(ユーザーや他システム)を表す。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Luồng cơ bản (basic flow) của một use case mô tả điều gì?",
      "en": "What does the basic flow of a use case describe?",
      "ja": "ユースケースの「基本フロー」は何を記述しますか。"
    },
    "options": [
      {
        "vi": "Các bước xử lý lỗi khi hệ thống gặp sự cố",
        "en": "The error-handling steps when the system encounters a failure",
        "ja": "システムに障害が発生した際のエラー処理手順"
      },
      {
        "vi": "Kịch bản chính, phổ biến nhất khi actor tương tác thành công với hệ thống",
        "en": "The main, most common scenario in which the actor successfully interacts with the system",
        "ja": "アクターがシステムと正常にやり取りする、最も一般的な主要シナリオ"
      },
      {
        "vi": "Điều kiện cần thỏa mãn trước khi use case bắt đầu",
        "en": "The conditions that must be met before the use case starts",
        "ja": "ユースケースが開始する前に満たすべき条件"
      },
      {
        "vi": "Cấu trúc bảng dữ liệu được sử dụng trong hệ thống",
        "en": "The structure of the data tables used in the system",
        "ja": "システムで使用されるデータテーブルの構造"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Basic flow là chuỗi bước mô tả kịch bản thành công điển hình nhất, thường được dùng để xây dựng test case chính trong use case testing.",
      "en": "The basic flow is the sequence of steps describing the most typical successful scenario, usually used to build the main test case in use case testing.",
      "ja": "基本フローは最も典型的な成功シナリオを表す一連の手順であり、通常ユースケーステストにおける主要なテストケース作成に用いられる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Alternative flow trong use case khác với exception flow ở điểm nào?",
      "en": "How does an alternative flow in a use case differ from an exception flow?",
      "ja": "ユースケースにおける「代替フロー」は「例外フロー」とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Alternative flow luôn gây crash hệ thống, exception flow thì không",
        "en": "An alternative flow always crashes the system, while an exception flow does not",
        "ja": "代替フローは必ずシステムをクラッシュさせるが、例外フローはそうならない"
      },
      {
        "vi": "Alternative flow không cần actor tham gia",
        "en": "An alternative flow does not require an actor's involvement",
        "ja": "代替フローはアクターの関与を必要としない"
      },
      {
        "vi": "Alternative flow là nhánh rẽ hợp lệ vẫn dẫn tới kết quả thành công, trong khi exception flow thường dẫn tới việc use case không hoàn tất hoặc báo lỗi",
        "en": "An alternative flow is a valid branch that still leads to a successful outcome, while an exception flow usually results in the use case not completing or an error being raised",
        "ja": "代替フローは正常な結果に至る有効な分岐であるのに対し、例外フローは通常ユースケースが完了しない、またはエラーが発生する結果となる"
      },
      {
        "vi": "Alternative flow chỉ xảy ra khi kiểm thử hiệu năng",
        "en": "An alternative flow only occurs during performance testing",
        "ja": "代替フローは性能テストの際にのみ発生する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Alternative flow vẫn dẫn đến mục tiêu thành công theo cách khác basic flow, còn exception flow phản ánh tình huống bất thường khiến use case không hoàn tất như mong đợi.",
      "en": "An alternative flow still achieves the goal successfully via a different path than the basic flow, whereas an exception flow reflects an abnormal situation preventing the use case from completing as expected.",
      "ja": "代替フローは基本フローとは異なる経路で目標を達成するが、例外フローは異常な状況を反映し、ユースケースが期待通りに完了しないことを示す。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Precondition của một use case có vai trò gì?",
      "en": "What is the role of a use case's precondition?",
      "ja": "ユースケースの「事前条件」はどのような役割を持ちますか。"
    },
    "options": [
      {
        "vi": "Là số lượng bước trong luồng cơ bản",
        "en": "It is the number of steps in the basic flow",
        "ja": "基本フローのステップ数である"
      },
      {
        "vi": "Là kết quả cuối cùng sau khi use case hoàn tất",
        "en": "It is the final result after the use case has completed",
        "ja": "ユースケースが完了した後の最終結果である"
      },
      {
        "vi": "Là danh sách các actor tham gia vào use case",
        "en": "It is the list of actors participating in the use case",
        "ja": "ユースケースに参加するアクターの一覧である"
      },
      {
        "vi": "Là điều kiện phải đúng trước khi use case có thể bắt đầu thực hiện",
        "en": "It is the condition that must hold true before the use case can begin execution",
        "ja": "ユースケースが実行を開始する前に成立していなければならない条件である"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Precondition xác định trạng thái/điều kiện hệ thống hoặc dữ liệu phải sẵn sàng trước khi thực hiện use case, ví dụ người dùng đã đăng nhập.",
      "en": "A precondition specifies the state or data condition the system must satisfy before the use case executes, e.g., the user is already logged in.",
      "ja": "事前条件は、ユースケース実行前にシステムまたはデータが満たすべき状態・条件を規定する。例えばユーザーが既にログイン済みであることなど。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Postcondition của use case dùng để làm gì?",
      "en": "What is a use case's postcondition used for?",
      "ja": "ユースケースの「事後条件」は何のために使われますか。"
    },
    "options": [
      {
        "vi": "Mô tả trạng thái hệ thống hoặc dữ liệu sau khi use case thực hiện xong, dùng để kiểm tra kết quả mong đợi",
        "en": "To describe the state of the system or data after the use case has finished, used to verify the expected outcome",
        "ja": "ユースケース実行後のシステムまたはデータの状態を記述し、期待される結果の検証に用いるため"
      },
      {
        "vi": "Xác định actor nào sẽ khởi động use case",
        "en": "To determine which actor will initiate the use case",
        "ja": "どのアクターがユースケースを開始するかを決定するため"
      },
      {
        "vi": "Liệt kê các bước xử lý lỗi khi actor nhập sai dữ liệu",
        "en": "To list the error-handling steps when the actor enters invalid data",
        "ja": "アクターが不正なデータを入力した際のエラー処理手順を列挙するため"
      },
      {
        "vi": "Xác định thời gian phản hồi tối đa của hệ thống",
        "en": "To define the maximum response time of the system",
        "ja": "システムの最大応答時間を定義するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Postcondition mô tả trạng thái mong đợi của hệ thống/dữ liệu sau khi use case hoàn tất thành công, giúp tester xác nhận kết quả kiểm thử đúng.",
      "en": "A postcondition describes the expected state of the system/data after the use case successfully completes, helping testers confirm correct test results.",
      "ja": "事後条件はユースケースが正常に完了した後のシステム・データの期待状態を記述し、テスターが正しい結果を確認するのに役立つ。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Use case testing đặc biệt hữu ích khi kiểm thử ở mức độ nào?",
      "en": "Use case testing is especially useful at which level of testing?",
      "ja": "ユースケーステストは特にどのレベルのテストで有用ですか。"
    },
    "options": [
      {
        "vi": "Kiểm thử đơn vị (unit testing) trong mã nguồn",
        "en": "Unit testing within the source code",
        "ja": "ソースコード内の単体テスト"
      },
      {
        "vi": "Kiểm thử hệ thống và kiểm thử chấp nhận, khi cần xác nhận quy trình nghiệp vụ end-to-end hoạt động đúng",
        "en": "System testing and acceptance testing, when it is necessary to confirm end-to-end business processes work correctly",
        "ja": "エンドツーエンドの業務プロセスが正しく動作することを確認する必要があるシステムテストおよび受け入れテスト"
      },
      {
        "vi": "Kiểm thử tích hợp giữa hai hàm nội bộ",
        "en": "Integration testing between two internal functions",
        "ja": "内部関数同士の統合テスト"
      },
      {
        "vi": "Kiểm thử bảo mật mã hóa dữ liệu",
        "en": "Security testing of data encryption",
        "ja": "データ暗号化のセキュリティテスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì use case mô tả quy trình tương tác thực tế giữa người dùng và hệ thống, kỹ thuật này thường được áp dụng ở mức kiểm thử hệ thống/chấp nhận để đảm bảo nghiệp vụ end-to-end hoạt động đúng.",
      "en": "Since use cases describe realistic interaction processes between users and the system, this technique is typically applied at the system/acceptance testing level to ensure end-to-end business processes work correctly.",
      "ja": "ユースケースはユーザーとシステムの実際の相互作用プロセスを記述するため、この技法はエンドツーエンドの業務が正しく動作することを保証するシステムテスト・受け入れテストレベルで適用されることが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một trường 'Tuổi' hợp lệ từ 18 đến 60 tuổi. Khi kết hợp phân vùng tương đương với phân tích giá trị biên, bộ giá trị nào nên được chọn để kiểm thử?",
      "en": "An 'Age' field is valid from 18 to 60. When combining equivalence partitioning with boundary value analysis, which set of values should be chosen for testing?",
      "ja": "「年齢」フィールドの有効範囲は18から60です。同値分割と境界値分析を組み合わせる場合、どの値の組み合わせをテストに選ぶべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ 18 và 60",
        "en": "Only 18 and 60",
        "ja": "18と60のみ"
      },
      {
        "vi": "Chỉ các giá trị âm như -5, -10",
        "en": "Only negative values such as -5, -10",
        "ja": "-5、-10のような負の値のみ"
      },
      {
        "vi": "17, 18, 19 và 59, 60, 61 (các giá trị biên) kết hợp cùng một giá trị đại diện vùng hợp lệ như 30 và một giá trị đại diện vùng không hợp lệ như 10 hoặc 90",
        "en": "17, 18, 19 and 59, 60, 61 (boundary values) combined with a representative valid value like 30 and a representative invalid value like 10 or 90",
        "ja": "17、18、19および59、60、61(境界値)に加え、有効域の代表値(例:30)と無効域の代表値(例:10や90)を組み合わせる"
      },
      {
        "vi": "Chỉ giá trị 1000 để kiểm thử hiệu năng",
        "en": "Only the value 1000, to test performance",
        "ja": "性能テストのために1000という値のみ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "EP xác định vùng hợp lệ (18-60) và các vùng không hợp lệ (<18, >60), còn BVA tập trung vào các giá trị sát biên (17,18,19,59,60,61) nơi dễ xảy ra lỗi so sánh (off-by-one).",
      "en": "EP identifies the valid partition (18-60) and invalid partitions (<18, >60), while BVA focuses on the values right at the boundaries (17,18,19,59,60,61) where off-by-one comparison errors commonly occur.",
      "ja": "同値分割は有効域(18〜60)と無効域(18未満、60超)を特定し、境界値分析は比較誤り(オフバイワン)が起きやすい境界付近の値(17,18,19,59,60,61)に焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Vì sao nên kết hợp phân vùng tương đương (EP) với phân tích giá trị biên (BVA) thay vì chỉ dùng một kỹ thuật riêng lẻ?",
      "en": "Why should equivalence partitioning (EP) be combined with boundary value analysis (BVA) rather than using either technique alone?",
      "ja": "なぜ同値分割(EP)と境界値分析(BVA)を単独ではなく組み合わせて使うべきなのですか。"
    },
    "options": [
      {
        "vi": "Vì kết hợp giúp giảm số ca kiểm thử xuống bằng 0",
        "en": "Because combining them reduces the number of test cases to zero",
        "ja": "組み合わせるとテストケース数がゼロになるから"
      },
      {
        "vi": "Vì EP chỉ áp dụng được cho kiểm thử phi chức năng",
        "en": "Because EP can only be applied to non-functional testing",
        "ja": "同値分割は非機能テストにしか適用できないから"
      },
      {
        "vi": "Vì hai kỹ thuật này không thể áp dụng cùng lúc trên cùng một trường dữ liệu",
        "en": "Because these two techniques cannot be applied simultaneously to the same data field",
        "ja": "この2つの技法は同じデータフィールドに同時に適用できないから"
      },
      {
        "vi": "Vì EP giúp xác định các vùng dữ liệu đại diện để giảm số ca kiểm thử, còn BVA bổ sung kiểm tra các giá trị ranh giới dễ sinh lỗi mà một giá trị đại diện giữa vùng có thể bỏ sót",
        "en": "Because EP identifies representative data partitions to reduce test cases, while BVA adds checks at error-prone boundary values that a mid-partition representative value might miss",
        "ja": "同値分割は代表的なデータ領域を特定してテストケース数を減らし、境界値分析はエラーが起きやすい境界値を追加で確認するため。領域中央の代表値だけでは見逃す可能性がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "EP giảm số lượng ca kiểm thử cần thiết bằng cách chọn đại diện cho mỗi vùng, còn BVA bổ sung các giá trị ở ranh giới — nơi lỗi lập trình (như <= thay vì <) thường xảy ra — giúp tăng khả năng phát hiện lỗi.",
      "en": "EP reduces the number of needed test cases by picking a representative for each partition, while BVA adds boundary values — where coding errors like <= instead of < often occur — increasing defect detection.",
      "ja": "同値分割は各領域から代表値を選ぶことで必要なテストケース数を減らし、境界値分析は(<=を<の代わりに使うなどの)プログラミングエラーが起こりやすい境界値を追加することで欠陥検出率を高める。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trường mật khẩu yêu cầu độ dài hợp lệ từ 8 đến 20 ký tự. Bộ test case nào thể hiện đúng việc kết hợp EP và BVA?",
      "en": "A password field requires a valid length between 8 and 20 characters. Which set of test cases correctly demonstrates combining EP and BVA?",
      "ja": "パスワードフィールドの有効な長さは8〜20文字です。EPとBVAの組み合わせを正しく示すテストケースの組はどれですか。"
    },
    "options": [
      {
        "vi": "Độ dài 7, 8, 9 (biên dưới); 14 (đại diện vùng hợp lệ); 19, 20, 21 (biên trên)",
        "en": "Lengths 7, 8, 9 (lower boundary); 14 (valid partition representative); 19, 20, 21 (upper boundary)",
        "ja": "長さ7、8、9(下限境界)、14(有効域の代表値)、19、20、21(上限境界)"
      },
      {
        "vi": "Chỉ kiểm thử với độ dài đúng 8 ký tự",
        "en": "Testing only with exactly 8 characters",
        "ja": "ちょうど8文字のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử với chuỗi rỗng",
        "en": "Testing only with an empty string",
        "ja": "空文字列のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử với ký tự đặc biệt như @, #, $",
        "en": "Testing only with special characters such as @, #, $",
        "ja": "@、#、$のような特殊文字のみをテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đây là bộ giá trị điển hình kết hợp EP (giá trị đại diện 14 cho vùng hợp lệ) với BVA (các giá trị sát hai biên 8 và 20), bao phủ cả vùng hợp lệ lẫn không hợp lệ liền kề biên.",
      "en": "This is a typical set combining EP (representative value 14 for the valid partition) with BVA (values right around the two boundaries 8 and 20), covering both the valid partition and the invalid partitions adjacent to the boundaries.",
      "ja": "これはEP(有効域の代表値14)とBVA(2つの境界8と20周辺の値)を組み合わせた典型的な組であり、有効域と境界に隣接する無効域の両方をカバーする。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Hạn chế của use case testing khi so với các kỹ thuật như EP/BVA là gì?",
      "en": "What is a limitation of use case testing compared to techniques such as EP/BVA?",
      "ja": "EP/BVAのような技法と比較した場合のユースケーステストの限界は何ですか。"
    },
    "options": [
      {
        "vi": "Use case testing không thể mô tả tương tác giữa actor và hệ thống",
        "en": "Use case testing cannot describe interactions between an actor and the system",
        "ja": "ユースケーステストはアクターとシステムの相互作用を記述できない"
      },
      {
        "vi": "Use case testing tập trung vào luồng nghiệp vụ nên không đi sâu kiểm tra chi tiết từng trường dữ liệu đầu vào, dễ bỏ sót lỗi ở giá trị biên nếu không kết hợp thêm kỹ thuật khác",
        "en": "Use case testing focuses on business flows, so it does not deeply examine each input field in detail, and boundary-related defects may be missed without combining other techniques",
        "ja": "ユースケーステストは業務フローに重点を置くため、各入力フィールドの詳細な検証は行わず、他の技法と組み合わせないと境界値の欠陥を見逃しやすい"
      },
      {
        "vi": "Use case testing chỉ dùng được ở mức kiểm thử đơn vị",
        "en": "Use case testing can only be used at the unit testing level",
        "ja": "ユースケーステストは単体テストレベルでしか使えない"
      },
      {
        "vi": "Use case testing không bao giờ được viết thành kịch bản kiểm thử cụ thể",
        "en": "Use case testing can never be written as specific test scenarios",
        "ja": "ユースケーステストは具体的なテストシナリオとして記述することができない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Use case testing mô tả tốt luồng nghiệp vụ nhưng thường không kiểm tra sâu từng trường dữ liệu; kết hợp với EP/BVA giúp bổ sung độ bao phủ chi tiết cho dữ liệu đầu vào trong từng bước của use case.",
      "en": "Use case testing describes business flows well but usually does not deeply test each data field; combining it with EP/BVA adds detailed input coverage within each use case step.",
      "ja": "ユースケーステストは業務フローをよく記述するが、通常各データフィールドの詳細な検証は行わない。EP/BVAと組み合わせることで、各ステップの入力データに対する詳細なカバレッジを補完できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong use case 'Rút tiền tại ATM', tình huống nào là ví dụ của một exception flow?",
      "en": "In the 'Withdraw cash at ATM' use case, which situation is an example of an exception flow?",
      "ja": "「ATMでの現金引き出し」ユースケースにおいて、例外フローの例はどれですか。"
    },
    "options": [
      {
        "vi": "Khách hàng chọn số tiền rút và nhận tiền thành công",
        "en": "The customer selects a withdrawal amount and successfully receives the cash",
        "ja": "顧客が引き出し金額を選択し、正常に現金を受け取る"
      },
      {
        "vi": "Khách hàng chọn ngôn ngữ hiển thị trước khi giao dịch",
        "en": "The customer selects the display language before the transaction",
        "ja": "顧客が取引前に表示言語を選択する"
      },
      {
        "vi": "Khách hàng nhập số tiền rút vượt quá số dư khả dụng, giao dịch bị từ chối và ATM thông báo lỗi",
        "en": "The customer enters a withdrawal amount exceeding the available balance, the transaction is rejected, and the ATM displays an error",
        "ja": "顧客が利用可能残高を超える金額を入力し、取引が拒否されATMがエラーを表示する"
      },
      {
        "vi": "Khách hàng in biên lai sau khi rút tiền thành công",
        "en": "The customer prints a receipt after a successful withdrawal",
        "ja": "顧客が引き出し成功後にレシートを印刷する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Exception flow phản ánh tình huống bất thường khiến use case không thể hoàn tất theo mục tiêu chính, như giao dịch bị từ chối do số dư không đủ.",
      "en": "An exception flow reflects an abnormal situation preventing the use case from completing its main goal, such as a transaction being rejected due to insufficient balance.",
      "ja": "例外フローは、残高不足により取引が拒否されるなど、ユースケースが主目的を達成できない異常な状況を反映する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ô nhập 'Số lượng sản phẩm' trong giỏ hàng hợp lệ từ 1 đến 10. Cách kết hợp EP và BVA hợp lý nhất để thiết kế test case là gì?",
      "en": "A 'Product quantity' field in a shopping cart is valid from 1 to 10. What is the most reasonable way to combine EP and BVA to design test cases?",
      "ja": "ショッピングカートの「商品数量」フィールドの有効範囲は1〜10です。EPとBVAを組み合わせてテストケースを設計する最も合理的な方法は何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm thử với số lượng 5",
        "en": "Testing only with quantity 5",
        "ja": "数量5のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử với ký tự chữ cái thay vì số",
        "en": "Testing only with letters instead of numbers",
        "ja": "数字ではなく文字のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử với số âm",
        "en": "Testing only with negative numbers",
        "ja": "負の数のみをテストする"
      },
      {
        "vi": "Kiểm thử 0, 1, 2 (biên dưới và vùng không hợp lệ), 5 (đại diện vùng hợp lệ), 9, 10, 11 (biên trên và vùng không hợp lệ)",
        "en": "Testing 0, 1, 2 (lower boundary and invalid partition), 5 (valid partition representative), 9, 10, 11 (upper boundary and invalid partition)",
        "ja": "0、1、2(下限境界と無効域)、5(有効域の代表値)、9、10、11(上限境界と無効域)をテストする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Bộ giá trị này bao phủ vùng không hợp lệ dưới biên (0), giá trị biên dưới (1,2), giá trị đại diện vùng hợp lệ (5), giá trị biên trên (9,10) và vùng không hợp lệ trên biên (11) — đúng nguyên tắc kết hợp EP với BVA.",
      "en": "This set covers the invalid partition below the boundary (0), the lower boundary values (1,2), the valid partition representative (5), the upper boundary values (9,10), and the invalid partition above the boundary (11) — correctly following the principle of combining EP with BVA.",
      "ja": "この組は境界下の無効域(0)、下限境界値(1,2)、有効域の代表値(5)、上限境界値(9,10)、境界上の無効域(11)をカバーしており、EPとBVAを組み合わせる原則に正しく従っている。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong quá trình thiết kế test acceptance, use case testing giúp xác định điều gì tốt nhất?",
      "en": "When designing acceptance tests, what does use case testing best help identify?",
      "ja": "受け入れテストを設計する際、ユースケーステストは何を特定するのに最も役立ちますか。"
    },
    "options": [
      {
        "vi": "Các trường hợp sử dụng thực tế mà người dùng cuối sẽ thực hiện, giúp xác nhận hệ thống đáp ứng đúng nhu cầu nghiệp vụ",
        "en": "Realistic scenarios that end users will actually perform, helping confirm the system meets business needs correctly",
        "ja": "エンドユーザーが実際に行う現実的なシナリオであり、システムが業務ニーズを正しく満たしているかを確認するのに役立つ"
      },
      {
        "vi": "Các câu lệnh chưa được thực thi trong mã nguồn",
        "en": "Statements in the source code that have not been executed",
        "ja": "ソースコード内で未実行のステートメント"
      },
      {
        "vi": "Số lượng nhánh điều kiện trong một hàm",
        "en": "The number of conditional branches in a function",
        "ja": "関数内の条件分岐の数"
      },
      {
        "vi": "Thời gian phản hồi trung bình của API",
        "en": "The average response time of an API",
        "ja": "APIの平均応答時間"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì use case mô phỏng cách người dùng thực sự tương tác với hệ thống, kỹ thuật này rất phù hợp để xây dựng test case chấp nhận xác nhận hệ thống hoạt động đúng theo nghiệp vụ mong đợi.",
      "en": "Since a use case simulates how users actually interact with the system, this technique is well suited for building acceptance test cases confirming the system behaves as expected by the business.",
      "ja": "ユースケースはユーザーが実際にシステムとやり取りする方法を模擬するため、期待される業務通りにシステムが動作することを確認する受け入れテストケースの構築に適している。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong use case 'Đăng nhập hệ thống', tình huống nào là ví dụ đúng của alternative flow?",
      "en": "In the 'System login' use case, which situation is a correct example of an alternative flow?",
      "ja": "「システムログイン」ユースケースにおいて、代替フローの正しい例はどれですか。"
    },
    "options": [
      {
        "vi": "Người dùng nhập đúng tài khoản và mật khẩu ngay lần đầu, đăng nhập thành công",
        "en": "The user enters the correct account and password on the first attempt and logs in successfully",
        "ja": "ユーザーが最初の試行で正しいアカウントとパスワードを入力し、ログインに成功する"
      },
      {
        "vi": "Người dùng nhập sai mật khẩu nhưng chọn 'Đăng nhập bằng mã OTP' thay thế và vẫn đăng nhập thành công",
        "en": "The user enters the wrong password but instead chooses 'Log in with OTP code' and still logs in successfully",
        "ja": "ユーザーがパスワードを間違えたが、代わりに「OTPコードでログイン」を選択し、それでもログインに成功する"
      },
      {
        "vi": "Người dùng nhập sai mật khẩu quá 5 lần và tài khoản bị khóa vĩnh viễn",
        "en": "The user enters the wrong password more than 5 times and the account is permanently locked",
        "ja": "ユーザーが5回以上パスワードを間違え、アカウントが永久にロックされる"
      },
      {
        "vi": "Hệ thống gặp lỗi kết nối cơ sở dữ liệu và không thể xác thực",
        "en": "The system encounters a database connection error and cannot authenticate",
        "ja": "システムがデータベース接続エラーに遭遇し、認証できない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Alternative flow là nhánh khác với luồng chính nhưng vẫn dẫn tới mục tiêu thành công (đăng nhập được) bằng phương thức thay thế như OTP, khác với exception flow (lỗi/khóa tài khoản/lỗi hệ thống).",
      "en": "An alternative flow is a branch different from the main flow that still achieves the successful goal (logging in) through an alternate method such as OTP, unlike an exception flow (errors/account lockout/system failure).",
      "ja": "代替フローは主要フローとは異なる分岐でありながら、OTPのような代替手段によりログイン成功という目標を達成する。これはエラー・アカウントロック・システム障害といった例外フローとは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Chức năng chấm điểm bài thi cho ra kết quả hợp lệ từ 0 đến 100. Áp dụng EP kết hợp BVA, cặp giá trị nào KHÔNG phù hợp để đưa vào bộ test?",
      "en": "An exam scoring function produces valid results from 0 to 100. Applying EP combined with BVA, which pair of values is NOT appropriate to include in the test set?",
      "ja": "試験の採点機能は0から100までの有効な結果を出力します。EPとBVAを組み合わせる場合、テストセットに含めるべきでない値の組はどれですか。"
    },
    "options": [
      {
        "vi": "-1 và 0 (kiểm tra biên dưới, gồm giá trị không hợp lệ và hợp lệ)",
        "en": "-1 and 0 (checking the lower boundary, including an invalid and a valid value)",
        "ja": "-1と0(下限境界の確認、無効値と有効値を含む)"
      },
      {
        "vi": "100 và 101 (kiểm tra biên trên, gồm giá trị hợp lệ và không hợp lệ)",
        "en": "100 and 101 (checking the upper boundary, including a valid and an invalid value)",
        "ja": "100と101(上限境界の確認、有効値と無効値を含む)"
      },
      {
        "vi": "999999 dùng riêng để đo thời gian phản hồi máy chủ dưới tải cao",
        "en": "999999 used solely to measure server response time under heavy load",
        "ja": "サーバーの高負荷時の応答時間測定のみに使う999999"
      },
      {
        "vi": "50 (giá trị đại diện vùng hợp lệ ở giữa)",
        "en": "50 (a representative value in the middle of the valid partition)",
        "ja": "50(有効域中央の代表値)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Giá trị 999999 nhằm đo hiệu năng dưới tải không liên quan tới việc kiểm tra tính đúng đắn của vùng giá trị đầu vào hợp lệ/không hợp lệ — đây là mục tiêu của kiểm thử hiệu năng, không phải EP/BVA cho chức năng chấm điểm.",
      "en": "The value 999999 aims to measure performance under load, unrelated to verifying the correctness of the valid/invalid input partitions — that is a performance testing goal, not EP/BVA for the scoring function.",
      "ja": "999999という値は負荷時の性能測定を目的としており、有効/無効な入力領域の正しさを検証することとは関係がない。これは採点機能に対するEP/BVAではなく、性能テストの目的である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong use case 'Thanh toán đơn hàng', bước 'Cổng thanh toán từ chối giao dịch do thẻ hết hạn' thuộc loại luồng nào?",
      "en": "In the 'Order payment' use case, the step 'Payment gateway rejects the transaction because the card has expired' belongs to which type of flow?",
      "ja": "「注文の支払い」ユースケースにおいて、「カードの有効期限切れにより決済ゲートウェイが取引を拒否する」というステップはどのフローに該当しますか。"
    },
    "options": [
      {
        "vi": "Basic flow",
        "en": "Basic flow",
        "ja": "基本フロー"
      },
      {
        "vi": "Postcondition",
        "en": "Postcondition",
        "ja": "事後条件"
      },
      {
        "vi": "Precondition",
        "en": "Precondition",
        "ja": "事前条件"
      },
      {
        "vi": "Exception flow",
        "en": "Exception flow",
        "ja": "例外フロー"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đây là tình huống bất thường khiến use case không hoàn tất mục tiêu chính (thanh toán thành công), phù hợp định nghĩa của exception flow.",
      "en": "This is an abnormal situation preventing the use case from achieving its main goal (a successful payment), matching the definition of an exception flow.",
      "ja": "これはユースケースの主目的(決済成功)を達成できなくする異常な状況であり、例外フローの定義に合致する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sơ đồ use case (use case diagram) khác với kỹ thuật use case testing như thế nào?",
      "en": "How does a use case diagram differ from the use case testing technique?",
      "ja": "ユースケース図はユースケーステスト技法とどう異なりますか。"
    },
    "options": [
      {
        "vi": "Sơ đồ use case chỉ thể hiện tổng quan actor và các use case liên quan bằng hình vẽ, không mô tả chi tiết các bước/luồng; còn use case testing dựa trên đặc tả chi tiết luồng để thiết kế ca kiểm thử",
        "en": "A use case diagram only shows an overview of actors and related use cases graphically, without detailing steps/flows; use case testing relies on detailed flow specifications to design test cases",
        "ja": "ユースケース図はアクターと関連するユースケースの概要を図として示すのみで、手順・フローの詳細は記述しない。一方ユースケーステストは詳細なフロー仕様に基づきテストケースを設計する"
      },
      {
        "vi": "Sơ đồ use case và use case testing là một khái niệm giống hệt nhau, không có khác biệt",
        "en": "A use case diagram and use case testing are identical concepts with no difference",
        "ja": "ユースケース図とユースケーステストは全く同一の概念であり、違いはない"
      },
      {
        "vi": "Sơ đồ use case chỉ dùng để kiểm thử hiệu năng hệ thống",
        "en": "A use case diagram is only used for system performance testing",
        "ja": "ユースケース図はシステムの性能テストにのみ使用される"
      },
      {
        "vi": "Use case testing không liên quan gì đến use case, chỉ liên quan đến bảng quyết định",
        "en": "Use case testing has nothing to do with use cases; it is only related to decision tables",
        "ja": "ユースケーステストはユースケースとは無関係で、決定表にのみ関連する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Sơ đồ use case là công cụ mô hình hóa (UML) thể hiện quan hệ actor-use case ở mức tổng quan, trong khi use case testing là kỹ thuật kiểm thử dựa trên đặc tả chi tiết các luồng (basic/alternative/exception) để sinh ca kiểm thử.",
      "en": "A use case diagram is a modeling tool (UML) showing actor-use case relationships at a high level, whereas use case testing is a testing technique based on detailed flow specifications (basic/alternative/exception) used to generate test cases.",
      "ja": "ユースケース図はアクターとユースケースの関係を概要レベルで示すモデリングツール(UML)であるのに対し、ユースケーステストは詳細なフロー仕様(基本/代替/例外)に基づいてテストケースを生成するテスト技法である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Chương trình khuyến mãi áp dụng giảm giá theo bậc: dưới 500.000đ không giảm, từ 500.000đ đến dưới 2.000.000đ giảm 5%, từ 2.000.000đ trở lên giảm 10%. Khi kết hợp EP và BVA, đâu là bộ giá trị kiểm thử hợp lý nhất?",
      "en": "A promotion applies tiered discounts: below 500,000 VND no discount, from 500,000 to just under 2,000,000 VND a 5% discount, from 2,000,000 VND and above a 10% discount. When combining EP and BVA, which set of test values is most appropriate?",
      "ja": "あるプロモーションは段階的な割引を適用します。50万VND未満は割引なし、50万VND以上200万VND未満は5%割引、200万VND以上は10%割引です。EPとBVAを組み合わせる場合、最も適切なテスト値の組み合わせはどれですか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm thử với giá trị 1.000.000",
        "en": "Testing only with the value 1,000,000",
        "ja": "1,000,000という値のみをテストする"
      },
      {
        "vi": "499.999, 500.000, 500.001 (biên đầu); 1.000.000 (đại diện vùng 5%); 1.999.999, 2.000.000, 2.000.001 (biên thứ hai)",
        "en": "499,999, 500,000, 500,001 (first boundary); 1,000,000 (representative of the 5% partition); 1,999,999, 2,000,000, 2,000,001 (second boundary)",
        "ja": "499,999、500,000、500,001(最初の境界)、1,000,000(5%領域の代表値)、1,999,999、2,000,000、2,000,001(2番目の境界)"
      },
      {
        "vi": "Chỉ kiểm thử với giá trị âm",
        "en": "Testing only with negative values",
        "ja": "負の値のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử với giá trị 0",
        "en": "Testing only with the value 0",
        "ja": "0という値のみをテストする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với nhiều bậc giá trị, mỗi ranh giới giữa các vùng cần được kiểm tra bằng BVA (giá trị ngay dưới, đúng biên, ngay trên), kết hợp với một giá trị đại diện EP cho vùng giữa để đảm bảo mọi mức giảm giá được áp dụng đúng.",
      "en": "With multiple tiers, each boundary between partitions needs BVA checks (value just below, exactly at, and just above the boundary), combined with an EP representative for the middle partition to ensure every discount level is applied correctly.",
      "ja": "複数の段階がある場合、各領域間の境界はBVAで(境界直前・境界・境界直後の値を)確認し、中間領域のEP代表値と組み合わせることで、すべての割引レベルが正しく適用されることを保証する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi nào nên ưu tiên chọn use case testing hơn EP hoặc BVA đơn thuần?",
      "en": "When should use case testing be preferred over EP or BVA alone?",
      "ja": "単独のEPやBVAよりもユースケーステストを優先すべきなのはどのような場合ですか。"
    },
    "options": [
      {
        "vi": "Khi cần kiểm tra một trường số duy nhất có giá trị biên rõ ràng",
        "en": "When only a single numeric field with clear boundary values needs to be checked",
        "ja": "明確な境界値を持つ単一の数値フィールドのみを検証する必要がある場合"
      },
      {
        "vi": "Khi chỉ cần kiểm tra một điều kiện logic đơn giản dạng AND/OR",
        "en": "When only a simple AND/OR logical condition needs to be checked",
        "ja": "単純なAND/OR論理条件のみを検証する必要がある場合"
      },
      {
        "vi": "Khi mục tiêu là xác nhận toàn bộ quy trình nghiệp vụ nhiều bước, có sự tương tác qua lại giữa người dùng và hệ thống, cần bao phủ cả luồng chính lẫn các nhánh rẽ thực tế",
        "en": "When the goal is to confirm an entire multi-step business process involving back-and-forth interaction between the user and the system, requiring coverage of both the main flow and realistic branching paths",
        "ja": "ユーザーとシステムの相互のやり取りを伴う複数ステップの業務プロセス全体を確認し、主要フローと現実的な分岐経路の両方をカバーする必要がある場合"
      },
      {
        "vi": "Khi mục tiêu duy nhất là đo tốc độ xử lý của một hàm nội bộ",
        "en": "When the sole goal is to measure the processing speed of an internal function",
        "ja": "唯一の目的が内部関数の処理速度を測定することである場合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Use case testing phát huy giá trị nhất khi kiểm tra các quy trình nghiệp vụ nhiều bước có tương tác thực tế giữa actor và hệ thống, còn EP/BVA phù hợp hơn cho việc kiểm tra chi tiết từng trường dữ liệu đơn lẻ.",
      "en": "Use case testing is most valuable when verifying multi-step business processes with realistic actor-system interaction, whereas EP/BVA are better suited for detailed checks of individual data fields.",
      "ja": "ユースケーステストは、アクターとシステムの現実的な相互作用を伴う複数ステップの業務プロセスを検証する際に最も価値を発揮する一方、EP/BVAは個々のデータフィールドの詳細な検証により適している。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Hệ thống cảnh báo nhiệt độ có 3 vùng: 'An toàn' (0-40 độ), 'Cảnh báo' (41-70 độ), 'Nguy hiểm' (71-100 độ). Khi kết hợp EP và BVA, những giá trị nào cần kiểm tra tại ranh giới giữa vùng 'An toàn' và 'Cảnh báo'?",
      "en": "A temperature alert system has 3 zones: 'Safe' (0-40 degrees), 'Warning' (41-70 degrees), 'Danger' (71-100 degrees). When combining EP and BVA, which values need to be checked at the boundary between the 'Safe' and 'Warning' zones?",
      "ja": "温度警告システムには3つのゾーンがあります。「安全」(0〜40度)、「警告」(41〜70度)、「危険」(71〜100度)です。EPとBVAを組み合わせる場合、「安全」と「警告」の境界でどの値を確認する必要がありますか。"
    },
    "options": [
      {
        "vi": "Chỉ giá trị 100",
        "en": "Only the value 100",
        "ja": "100という値のみ"
      },
      {
        "vi": "Chỉ giá trị 0",
        "en": "Only the value 0",
        "ja": "0という値のみ"
      },
      {
        "vi": "Chỉ giá trị 71",
        "en": "Only the value 71",
        "ja": "71という値のみ"
      },
      {
        "vi": "39, 40 và 41 — hai giá trị cuối vùng 'An toàn' và giá trị đầu vùng 'Cảnh báo'",
        "en": "39, 40, and 41 — the last two values of the 'Safe' zone and the first value of the 'Warning' zone",
        "ja": "39、40、41 — 「安全」ゾーンの最後の2つの値と「警告」ゾーンの最初の値"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ranh giới giữa hai vùng liền kề cần kiểm tra giá trị ngay trước, đúng tại và ngay sau điểm chuyển vùng (39, 40, 41) để phát hiện lỗi so sánh sai điều kiện chuyển đổi trạng thái cảnh báo.",
      "en": "The boundary between two adjacent zones requires checking the value just before, exactly at, and just after the transition point (39, 40, 41) to detect incorrect comparison logic in the zone-transition condition.",
      "ja": "隣接する2つのゾーンの境界では、ゾーン切り替え条件の比較ロジックの誤りを検出するため、切り替え地点の直前・ちょうど・直後の値(39、40、41)を確認する必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Use case testing đặc biệt hiệu quả trong việc phát hiện loại lỗi nào?",
      "en": "Use case testing is especially effective at detecting which type of defect?",
      "ja": "ユースケーステストは特にどの種類の欠陥の検出に効果的ですか。"
    },
    "options": [
      {
        "vi": "Lỗi trong quy trình nghiệp vụ, sự phối hợp giữa các thành phần hệ thống hoặc luồng xử lý bị thiếu/sai khi các actor tương tác thực tế",
        "en": "Defects in the business process, coordination between system components, or missing/incorrect processing flows during realistic actor interactions",
        "ja": "業務プロセスにおける欠陥、システムコンポーネント間の連携の不備、または実際のアクターとの相互作用時に発生する処理フローの欠落・誤り"
      },
      {
        "vi": "Lỗi tràn bộ nhớ (memory leak) trong mã nguồn",
        "en": "Memory leak defects in the source code",
        "ja": "ソースコード内のメモリリーク欠陥"
      },
      {
        "vi": "Lỗi cú pháp trong câu lệnh SQL",
        "en": "Syntax errors in SQL statements",
        "ja": "SQL文の構文エラー"
      },
      {
        "vi": "Lỗi định dạng font chữ trên giao diện",
        "en": "Font formatting defects on the user interface",
        "ja": "画面上のフォントフォーマットの欠陥"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì use case testing mô phỏng quy trình tương tác thực tế nhiều bước, nó giỏi phát hiện các lỗi liên quan đến luồng nghiệp vụ, sự phối hợp giữa các module, và các bước bị thiếu mà kiểm thử đơn lẻ từng trường khó phát hiện.",
      "en": "Because use case testing simulates realistic multi-step interaction processes, it is good at detecting defects related to business flow, coordination between modules, and missing steps that testing individual fields alone would struggle to catch.",
      "ja": "ユースケーステストは現実的な複数ステップの相互作用プロセスを模擬するため、業務フローに関する欠陥、モジュール間の連携の問題、単一フィールドのテストだけでは検出しにくい欠落したステップの検出に優れている。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trường 'Tên đăng nhập' yêu cầu từ 5 đến 15 ký tự, kết hợp với trường 'Mật khẩu' yêu cầu từ 8 đến 16 ký tự trong cùng một use case đăng ký tài khoản. Cách tiếp cận hợp lý để thiết kế test case là gì?",
      "en": "A 'Username' field requires 5 to 15 characters, combined with a 'Password' field requiring 8 to 16 characters within the same account registration use case. What is a reasonable approach to design test cases?",
      "ja": "アカウント登録の同一ユースケース内で、「ユーザー名」フィールドは5〜15文字、「パスワード」フィールドは8〜16文字が要求されます。テストケースを設計する合理的なアプローチは何ですか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm thử một trường bất kỳ, bỏ qua trường còn lại",
        "en": "Testing only one field arbitrarily, ignoring the other",
        "ja": "どちらか一方のフィールドのみを任意にテストし、もう一方は無視する"
      },
      {
        "vi": "Dùng use case để xác định luồng đăng ký (basic/alternative/exception), đồng thời áp dụng EP+BVA riêng cho từng trường (username, password) để đảm bảo cả luồng nghiệp vụ lẫn dữ liệu biên đều được kiểm thử đầy đủ",
        "en": "Use the use case to define the registration flow (basic/alternative/exception), while separately applying EP+BVA to each field (username, password) to ensure both the business flow and boundary data are fully tested",
        "ja": "ユースケースを用いて登録フロー(基本/代替/例外)を定義しつつ、各フィールド(ユーザー名、パスワード)に個別にEP+BVAを適用し、業務フローと境界データの両方を十分にテストする"
      },
      {
        "vi": "Chỉ kiểm thử với dữ liệu ngẫu nhiên không có kế hoạch",
        "en": "Testing only with random, unplanned data",
        "ja": "計画のないランダムなデータのみでテストする"
      },
      {
        "vi": "Bỏ qua việc kiểm thử biên vì use case đã đủ bao phủ",
        "en": "Skipping boundary testing because the use case already provides sufficient coverage",
        "ja": "ユースケースだけで十分なカバレッジがあるため境界テストを省略する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Kết hợp use case testing (bao phủ luồng đăng ký, gồm cả lỗi khi một trong hai trường không hợp lệ) với EP+BVA cho từng trường riêng biệt giúp vừa đảm bảo đúng quy trình nghiệp vụ vừa phát hiện lỗi ở giá trị biên của từng trường.",
      "en": "Combining use case testing (covering the registration flow, including failures when either field is invalid) with EP+BVA applied separately to each field ensures both correct business process coverage and detection of boundary defects in each field.",
      "ja": "ユースケーステスト(いずれかのフィールドが無効な場合の失敗を含む登録フローをカバー)と、各フィールドに個別に適用するEP+BVAを組み合わせることで、正しい業務プロセスのカバレッジと各フィールドの境界欠陥の検出の両方を確保できる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kỹ thuật đoán lỗi (error guessing) dựa chủ yếu vào điều gì để xác định các trường hợp kiểm thử?",
      "en": "What does the error guessing technique primarily rely on to identify test cases?",
      "ja": "エラー推測（error guessing）技法は、テストケースを特定する際に主に何に基づいていますか。"
    },
    "options": [
      {
        "vi": "Sơ đồ chuyển trạng thái của hệ thống",
        "en": "The system's state transition diagram",
        "ja": "システムの状態遷移図"
      },
      {
        "vi": "Bảng quyết định được xây dựng từ yêu cầu nghiệp vụ",
        "en": "A decision table built from business requirements",
        "ja": "業務要件から作成されたデシジョンテーブル"
      },
      {
        "vi": "Kinh nghiệm và trực giác của tester để dự đoán các lỗi có thể xảy ra",
        "en": "The tester's experience and intuition to anticipate likely errors",
        "ja": "起こりうるエラーを予測するためのテスターの経験と直感"
      },
      {
        "vi": "Độ phủ nhánh đo được từ công cụ coverage",
        "en": "The branch coverage measured by a coverage tool",
        "ja": "カバレッジツールで測定されたブランチカバレッジ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đoán lỗi là kỹ thuật dựa trên kinh nghiệm, tester dùng kiến thức về các lỗi thường gặp và trực giác cá nhân để suy đoán những tình huống có khả năng gây lỗi, không dựa trên tài liệu đặc tả hình thức.",
      "en": "Error guessing is an experience-based technique where testers use knowledge of common errors and personal intuition to anticipate fault-prone situations, rather than relying on formal specification documents.",
      "ja": "エラー推測は経験ベースの技法であり、テスターはよくあるエラーに関する知識と個人の直感を用いて、不具合が起こりやすい状況を推測します。形式的な仕様書には依拠しません。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong kiểm thử dựa trên kinh nghiệm, \"danh mục các loại lỗi và thất bại điển hình\" mà tester tham khảo để hỗ trợ đoán lỗi được gọi là gì?",
      "en": "In experience-based testing, what is the \"catalog of typical error and failure types\" that testers reference to support error guessing called?",
      "ja": "経験ベースドテストにおいて、テスターがエラー推測を支援するために参照する「典型的なエラー・故障の種類の一覧」は何と呼ばれますか。"
    },
    "options": [
      {
        "vi": "Ma trận truy vết yêu cầu (traceability matrix)",
        "en": "Requirements traceability matrix",
        "ja": "要件トレーサビリティマトリクス"
      },
      {
        "vi": "Sơ đồ luồng dữ liệu",
        "en": "Data flow diagram",
        "ja": "データフロー図"
      },
      {
        "vi": "Bảng quyết định",
        "en": "Decision table",
        "ja": "デシジョンテーブル"
      },
      {
        "vi": "Danh mục lỗi và thất bại điển hình (error and failure taxonomy)",
        "en": "Error and failure taxonomy",
        "ja": "エラー・故障の分類体系（タクソノミー）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Taxonomy tổng hợp các loại lỗi và thất bại điển hình được đúc kết từ kinh nghiệm nhiều dự án, giúp tester hệ thống hoá quá trình đoán lỗi thay vì chỉ dựa vào cảm tính rời rạc.",
      "en": "A taxonomy summarizing typical error and failure types, compiled from experience across many projects, helps testers systematize error guessing rather than relying purely on ad hoc intuition.",
      "ja": "典型的なエラー・故障の種類をまとめた分類体系は、多くのプロジェクトの経験から作られ、テスターが場当たり的な直感だけに頼らずエラー推測を体系的に行う助けとなります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Checklist-based testing là gì?",
      "en": "What is checklist-based testing?",
      "ja": "チェックリストベーステスト（checklist-based testing）とは何ですか。"
    },
    "options": [
      {
        "vi": "Tester thiết kế và thực hiện kiểm thử dựa trên danh sách các hạng mục, quy tắc hoặc tiêu chí cần kiểm tra",
        "en": "Testing designed and executed based on a list of items, rules, or criteria to be checked",
        "ja": "確認すべき項目・ルール・基準のリストに基づいてテストを設計・実施すること"
      },
      {
        "vi": "Tester tự động sinh test case từ mã nguồn",
        "en": "Automatically generating test cases from source code",
        "ja": "ソースコードからテストケースを自動生成すること"
      },
      {
        "vi": "Tester đo độ phủ câu lệnh bằng công cụ",
        "en": "Measuring statement coverage using a tool",
        "ja": "ツールでステートメントカバレッジを測定すること"
      },
      {
        "vi": "Tester xây dựng bảng quyết định từ yêu cầu",
        "en": "Building a decision table from requirements",
        "ja": "要件からデシジョンテーブルを作成すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Checklist-based testing dựa vào một danh sách các hạng mục đã được chuẩn bị (checklist) để hướng dẫn tester kiểm tra, thay vì test case chi tiết từng bước.",
      "en": "Checklist-based testing relies on a prepared list of items (a checklist) to guide the tester's checks, rather than detailed step-by-step test cases.",
      "ja": "チェックリストベーステストは、詳細な手順付きテストケースではなく、あらかじめ用意された確認項目リスト（チェックリスト）に基づいてテスターの確認作業を導きます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Nội dung của một checklist trong checklist-based testing thường được xây dựng dựa trên đâu?",
      "en": "What is the content of a checklist in checklist-based testing typically built upon?",
      "ja": "チェックリストベーステストにおけるチェックリストの内容は、通常何に基づいて作成されますか。"
    },
    "options": [
      {
        "vi": "Chỉ dựa trên mã nguồn của hệ thống",
        "en": "Solely based on the system's source code",
        "ja": "システムのソースコードのみに基づく"
      },
      {
        "vi": "Kinh nghiệm, kiến thức nghiệp vụ, tiêu chuẩn/quy định và các lỗi từng xảy ra trước đó",
        "en": "Experience, domain knowledge, standards/regulations, and previously occurring defects",
        "ja": "経験、業務知識、標準・規制、過去に発生した不具合"
      },
      {
        "vi": "Duy nhất tài liệu đặc tả yêu cầu hình thức",
        "en": "Only formal requirements specification documents",
        "ja": "形式的な要件仕様書のみ"
      },
      {
        "vi": "Kết quả kiểm thử hồi quy tự động",
        "en": "Automated regression test results",
        "ja": "自動化された回帰テストの結果"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Checklist thường được tích luỹ từ kinh nghiệm thực tế, kiến thức nghiệp vụ, các chuẩn/quy định cần tuân thủ và những lỗi đã từng gặp, giúp checklist ngày càng đầy đủ và hữu ích qua thời gian.",
      "en": "Checklists are typically accumulated from real-world experience, domain knowledge, standards/regulations to comply with, and previously encountered defects, making them increasingly comprehensive and useful over time.",
      "ja": "チェックリストは通常、実務経験、業務知識、遵守すべき標準・規制、過去に発見された不具合の蓄積によって作られ、時間とともにより網羅的で有用なものになります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Nhược điểm chính của checklist-based testing so với kỹ thuật kiểm thử dựa trên đặc tả là gì?",
      "en": "What is the main drawback of checklist-based testing compared to specification-based testing techniques?",
      "ja": "チェックリストベーステストが仕様ベースのテスト技法と比べて主に劣る点は何ですか。"
    },
    "options": [
      {
        "vi": "Không thể thực hiện thủ công",
        "en": "It cannot be performed manually",
        "ja": "手動で実施できないこと"
      },
      {
        "vi": "Không bao giờ phát hiện được lỗi",
        "en": "It never finds any defects",
        "ja": "決して不具合を発見できないこと"
      },
      {
        "vi": "Các hạng mục checklist thường ở mức khái quát, dễ thiếu chi tiết và phụ thuộc nhiều vào kỹ năng, kiến thức của người tạo/thực hiện",
        "en": "Checklist items are often high-level, can lack detail, and depend heavily on the skill and knowledge of the person creating/executing them",
        "ja": "チェックリストの項目は概括的になりがちで詳細さに欠け、作成者・実施者のスキルや知識に大きく依存すること"
      },
      {
        "vi": "Chỉ áp dụng được cho kiểm thử tự động",
        "en": "It can only be applied to automated testing",
        "ja": "自動テストにしか適用できないこと"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì checklist thường chỉ liệt kê các hạng mục ở mức khái quát, hiệu quả phát hiện lỗi phụ thuộc lớn vào kinh nghiệm và sự diễn giải của tester khi thực hiện, dễ bỏ sót chi tiết so với test case được thiết kế bài bản.",
      "en": "Because checklists typically list items at a high level, their defect-finding effectiveness depends heavily on the tester's experience and interpretation during execution, making it easier to miss details compared to well-designed test cases.",
      "ja": "チェックリストは概括的な項目の列挙にとどまることが多いため、不具合発見の効果は実施するテスターの経験や解釈に大きく左右され、綿密に設計されたテストケースに比べて詳細を見落としやすくなります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử thăm dò (exploratory testing) được định nghĩa như thế nào theo ISTQB?",
      "en": "How is exploratory testing defined according to ISTQB?",
      "ja": "ISTQBによると、探索的テスト（exploratory testing）はどのように定義されますか。"
    },
    "options": [
      {
        "vi": "Kiểm thử chỉ áp dụng ở giai đoạn unit testing",
        "en": "Testing that only applies during the unit testing stage",
        "ja": "単体テスト段階にのみ適用されるテスト"
      },
      {
        "vi": "Kiểm thử hoàn toàn tự động không cần con người can thiệp",
        "en": "Fully automated testing that requires no human intervention",
        "ja": "人間の介入を必要としない完全自動テスト"
      },
      {
        "vi": "Kiểm thử chỉ thực hiện sau khi đã viết đầy đủ test case chi tiết",
        "en": "Testing performed only after fully detailed test cases have been written",
        "ja": "詳細なテストケースをすべて作成した後にのみ実施するテスト"
      },
      {
        "vi": "Kiểm thử mà việc học, thiết kế và thực hiện test được thực hiện đồng thời trong cùng một khoảng thời gian, không có kịch bản chi tiết chuẩn bị trước",
        "en": "Testing in which learning, test design, and test execution occur simultaneously within the same time frame, without detailed scripts prepared in advance",
        "ja": "学習、テスト設計、テスト実行が同じ時間枠の中で同時に行われ、事前に詳細なスクリプトを用意しないテスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đặc trưng cốt lõi của exploratory testing là ba hoạt động học, thiết kế và thực hiện test diễn ra song song, liên tục ảnh hưởng lẫn nhau, khác với cách tách biệt các giai đoạn trong kiểm thử theo kịch bản truyền thống.",
      "en": "The core characteristic of exploratory testing is that learning, test design, and execution happen concurrently and continuously influence one another, unlike the separated phases of traditional scripted testing.",
      "ja": "探索的テストの核心的な特徴は、学習・テスト設計・テスト実行という3つの活動が並行して行われ、互いに継続的に影響し合う点にあり、フェーズが分離された従来のスクリプトベーステストとは異なります。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đặc điểm nổi bật giúp phân biệt exploratory testing với kiểm thử theo kịch bản (scripted testing) là gì?",
      "en": "What key characteristic distinguishes exploratory testing from scripted testing?",
      "ja": "探索的テストとスクリプトベーステストを区別する重要な特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Test case trong exploratory testing được thiết kế và điều chỉnh linh hoạt ngay trong lúc thực hiện, dựa trên kết quả quan sát được",
        "en": "Test ideas in exploratory testing are designed and adjusted flexibly during execution, based on observed results",
        "ja": "探索的テストではテストのアイデアが実行中の観察結果に基づいて柔軟に設計・調整される"
      },
      {
        "vi": "Exploratory testing luôn tốn nhiều thời gian chuẩn bị tài liệu hơn",
        "en": "Exploratory testing always takes more time to prepare documentation",
        "ja": "探索的テストは常に文書準備により多くの時間がかかる"
      },
      {
        "vi": "Exploratory testing chỉ dùng công cụ tự động hoá",
        "en": "Exploratory testing only uses automation tools",
        "ja": "探索的テストは自動化ツールのみを使用する"
      },
      {
        "vi": "Exploratory testing không cần tester có kiến thức về hệ thống",
        "en": "Exploratory testing does not require testers to have knowledge of the system",
        "ja": "探索的テストではテスターにシステムの知識は不要である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong exploratory testing, kết quả của một bước kiểm thử ngay lập tức được dùng để định hướng cho bước tiếp theo, tạo ra một vòng lặp học-thiết kế-thực hiện liên tục thay vì tuân theo kịch bản cố định từ trước.",
      "en": "In exploratory testing, the result of one test step immediately informs the direction of the next, creating a continuous learn-design-execute loop instead of following a fixed pre-written script.",
      "ja": "探索的テストでは、あるテストステップの結果が直ちに次のステップの方向性に反映され、あらかじめ固定されたスクリプトに従うのではなく、学習・設計・実行の継続的なループが生まれます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Session-based test management (SBTM) là gì?",
      "en": "What is session-based test management (SBTM)?",
      "ja": "セッションベーステストマネジメント（SBTM）とは何ですか。"
    },
    "options": [
      {
        "vi": "Một kỹ thuật viết test case dựa trên bảng quyết định",
        "en": "A technique for writing test cases based on decision tables",
        "ja": "デシジョンテーブルに基づいてテストケースを作成する技法"
      },
      {
        "vi": "Một cách tổ chức, cấu trúc hoạt động exploratory testing thành các phiên (session) có mục tiêu và giới hạn thời gian rõ ràng",
        "en": "A way of organizing and structuring exploratory testing into sessions with clear objectives and time limits",
        "ja": "明確な目標と時間制限を持つセッションへと探索的テスト活動を組織化・構造化する手法"
      },
      {
        "vi": "Một công cụ đo độ phủ mã nguồn tự động",
        "en": "A tool for automatically measuring code coverage",
        "ja": "ソースコードカバレッジを自動測定するツール"
      },
      {
        "vi": "Một quy trình review tài liệu yêu cầu chính thức",
        "en": "A formal requirements document review process",
        "ja": "要件文書の正式なレビュープロセス"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "SBTM đưa cấu trúc và khả năng quản lý vào exploratory testing bằng cách chia công việc thành các phiên có charter, thời lượng giới hạn và báo cáo sau mỗi phiên, giúp dễ theo dõi tiến độ hơn.",
      "en": "SBTM introduces structure and manageability into exploratory testing by dividing work into sessions with a charter, a bounded duration, and a report after each session, making progress easier to track.",
      "ja": "SBTMは、作業をチャーター（目的）付きで時間の区切られたセッションに分割し、各セッション後に報告を行うことで探索的テストに構造と管理可能性をもたらし、進捗を追跡しやすくします。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong session-based test management, \"charter\" (định hướng phiên) có vai trò gì?",
      "en": "In session-based test management, what role does the \"charter\" play?",
      "ja": "セッションベーステストマネジメントにおいて、「チャーター」はどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Ghi lại số lượng lỗi đã sửa trong sprint",
        "en": "Recording the number of defects fixed during a sprint",
        "ja": "スプリント中に修正された不具合数を記録する"
      },
      {
        "vi": "Liệt kê toàn bộ test case chi tiết cần thực hiện từng bước",
        "en": "Listing all the detailed step-by-step test cases to be executed",
        "ja": "実行すべき詳細な手順付きテストケースをすべて列挙する"
      },
      {
        "vi": "Xác định mục tiêu, phạm vi và nguồn tài liệu tham khảo cho một phiên kiểm thử thăm dò",
        "en": "Defining the objective, scope, and reference resources for an exploratory test session",
        "ja": "探索的テストセッションの目的、範囲、参照資料を定義する"
      },
      {
        "vi": "Thay thế hoàn toàn cho kế hoạch kiểm thử (test plan)",
        "en": "Fully replacing the test plan",
        "ja": "テスト計画を完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Charter là bản định hướng ngắn gọn nêu rõ tester sẽ tập trung kiểm thử gì, dùng nguồn tài liệu/công cụ nào trong phiên, chứ không phải danh sách test case chi tiết từng bước.",
      "en": "A charter is a brief mission statement specifying what the tester will focus on testing and which resources/tools to use during the session, rather than a detailed step-by-step test case list.",
      "ja": "チャーターは、テスターがそのセッションで何に焦点を当ててテストするか、どの資料・ツールを使うかを示す簡潔な指針であり、詳細な手順付きテストケースの一覧ではありません。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một phiên (session) trong session-based test management thường có đặc điểm gì về thời gian?",
      "en": "What is a typical time-related characteristic of a session in session-based test management?",
      "ja": "セッションベーステストマネジメントにおけるセッションは、時間についてどのような特徴を持つのが一般的ですか。"
    },
    "options": [
      {
        "vi": "Không giới hạn thời gian, kéo dài đến khi hết lỗi",
        "en": "Unlimited duration, continuing until no more defects are found",
        "ja": "時間制限がなく、不具合がなくなるまで続く"
      },
      {
        "vi": "Luôn kéo dài trọn một ngày làm việc",
        "en": "Always lasting an entire workday",
        "ja": "常に丸一日続く"
      },
      {
        "vi": "Chỉ kéo dài vài phút cho mỗi lần thực hiện",
        "en": "Lasting only a few minutes each time",
        "ja": "毎回数分しか続かない"
      },
      {
        "vi": "Được giới hạn trong một khoảng thời gian xác định (time-boxed), ví dụ 60-120 phút",
        "en": "Time-boxed within a defined duration, e.g., 60–120 minutes",
        "ja": "例えば60〜120分など、決められた時間内に区切られる（タイムボックス化される）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Time-boxing giúp tester tập trung, dễ lên kế hoạch và so sánh hiệu suất giữa các phiên, đây là một trong những đặc trưng quan trọng của SBTM so với exploratory testing tự do không giới hạn.",
      "en": "Time-boxing helps testers stay focused, makes planning easier, and allows comparison of productivity across sessions — one of the key features distinguishing SBTM from unbounded free-form exploratory testing.",
      "ja": "タイムボックス化はテスターの集中を助け、計画を立てやすくし、セッション間の生産性比較を可能にします。これは、無制限の自由な探索的テストとSBTMを区別する重要な特徴の一つです。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sau khi kết thúc một phiên kiểm thử thăm dò trong SBTM, hoạt động \"debrief\" nhằm mục đích gì?",
      "en": "After completing an exploratory test session in SBTM, what is the purpose of the \"debrief\" activity?",
      "ja": "SBTMにおいて探索的テストセッションが終了した後、「デブリーフ」活動の目的は何ですか。"
    },
    "options": [
      {
        "vi": "Trao đổi giữa tester và người quản lý/leader để đánh giá kết quả phiên, những gì đã kiểm thử và phát hiện được",
        "en": "A discussion between the tester and the manager/lead to review session results, what was tested, and what was found",
        "ja": "テスターとマネージャー・リーダーとの間で、セッションの結果、テストした内容、発見事項を振り返るための話し合い"
      },
      {
        "vi": "Xóa toàn bộ ghi chú của tester để tiết kiệm dung lượng lưu trữ",
        "en": "Deleting all of the tester's notes to save storage space",
        "ja": "保存容量を節約するためテスターのメモをすべて削除する"
      },
      {
        "vi": "Tự động sinh báo cáo độ phủ mã nguồn",
        "en": "Automatically generating a code coverage report",
        "ja": "ソースコードカバレッジレポートを自動生成する"
      },
      {
        "vi": "Lên lịch cho sprint kế tiếp",
        "en": "Scheduling the next sprint",
        "ja": "次のスプリントをスケジュールする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Debrief là bước trao đổi sau phiên giúp đánh giá chất lượng kiểm thử, rút kinh nghiệm, xác định hướng đi cho các phiên tiếp theo và đảm bảo thông tin không bị mất do thiếu kịch bản chi tiết ghi lại từ trước.",
      "en": "The debrief is a post-session discussion that evaluates testing quality, captures lessons learned, guides direction for future sessions, and ensures information is not lost due to the absence of a pre-written detailed script.",
      "ja": "デブリーフはセッション後の話し合いであり、テストの質を評価し、教訓を得て、今後のセッションの方向性を定め、事前に詳細なスクリプトがないために情報が失われることを防ぎます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ghi chú (note-taking) trong quá trình thực hiện exploratory testing có vai trò gì?",
      "en": "What role does note-taking play during exploratory testing execution?",
      "ja": "探索的テスト実施中のメモ取り（ノートテイキング）はどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Không cần thiết vì mọi thao tác được công cụ tự động ghi lại đầy đủ",
        "en": "It is unnecessary because tools automatically record every action in full",
        "ja": "すべての操作はツールが自動的に完全に記録するため不要である"
      },
      {
        "vi": "Giúp tester ghi lại đường đi kiểm thử, ý tưởng phát sinh và kết quả quan sát để hỗ trợ tái hiện lỗi và báo cáo sau này",
        "en": "It helps testers record the testing path taken, ideas that arise, and observed results, supporting later defect reproduction and reporting",
        "ja": "テストした経路、生まれたアイデア、観察結果を記録し、後の不具合再現や報告を助ける"
      },
      {
        "vi": "Chỉ dùng để tính lương theo giờ làm việc",
        "en": "It is only used to calculate hourly wages",
        "ja": "時間給の計算にのみ使用される"
      },
      {
        "vi": "Thay thế hoàn toàn cho báo cáo lỗi (defect report)",
        "en": "It fully replaces the defect report",
        "ja": "不具合報告書を完全に置き換える"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Vì exploratory testing không có kịch bản chi tiết ghi sẵn từng bước, ghi chú trong lúc thực hiện là nguồn thông tin quan trọng để tái hiện lỗi, giải thích lý do thực hiện các bước và làm cơ sở cho báo cáo phiên.",
      "en": "Since exploratory testing has no pre-written step-by-step script, notes taken during execution are a critical source of information for reproducing defects, explaining why certain steps were taken, and forming the basis of the session report.",
      "ja": "探索的テストには事前に用意された手順付きスクリプトがないため、実施中のメモは不具合の再現、各手順を実行した理由の説明、セッション報告の根拠となる重要な情報源です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Thách thức lớn nhất khi muốn đo lường độ phủ (coverage) của exploratory testing là gì?",
      "en": "What is the biggest challenge in measuring the coverage of exploratory testing?",
      "ja": "探索的テストのカバレッジを測定する際の最大の課題は何ですか。"
    },
    "options": [
      {
        "vi": "Exploratory testing không thể thực hiện trên phần mềm có giao diện đồ hoạ",
        "en": "Exploratory testing cannot be performed on software with a graphical interface",
        "ja": "探索的テストはグラフィカルインターフェースを持つソフトウェアでは実施できない"
      },
      {
        "vi": "Exploratory testing luôn đạt 100% độ phủ câu lệnh",
        "en": "Exploratory testing always achieves 100% statement coverage",
        "ja": "探索的テストは常に100%のステートメントカバレッジを達成する"
      },
      {
        "vi": "Vì không có kịch bản test case cố định định trước, việc xác định đã kiểm thử được bao nhiêu phần hệ thống một cách chính xác là khó khăn",
        "en": "Because there are no fixed, pre-defined test case scripts, it is difficult to precisely determine how much of the system has been tested",
        "ja": "固定された事前定義のテストケーススクリプトがないため、システムのどれだけの部分をテストしたか正確に把握することが難しい"
      },
      {
        "vi": "Độ phủ của exploratory testing luôn thấp hơn kiểm thử tĩnh",
        "en": "Exploratory testing coverage is always lower than static testing coverage",
        "ja": "探索的テストのカバレッジは常に静的テストより低い"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Không có bộ test case cố định để đối chiếu, việc theo dõi/đo lường độ phủ đầy đủ, khách quan của exploratory testing khó hơn nhiều so với kiểm thử theo kịch bản, dù ghi chú và session charter phần nào hỗ trợ việc này.",
      "en": "Without a fixed set of test cases to reference, objectively tracking and measuring the full coverage of exploratory testing is much harder than with scripted testing, even though notes and session charters partly help mitigate this.",
      "ja": "参照できる固定のテストケース群がないため、探索的テストの網羅的かつ客観的なカバレッジを追跡・測定することは、スクリプトベーステストに比べてはるかに困難です。メモやセッションチャーターがある程度これを補いますが。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử thăm dò (exploratory testing) phù hợp nhất trong tình huống nào sau đây?",
      "en": "In which of the following situations is exploratory testing most appropriate?",
      "ja": "次のうち、探索的テストが最も適しているのはどのような状況ですか。"
    },
    "options": [
      {
        "vi": "Khi tài liệu đặc tả đầy đủ, chi tiết và không có sức ép về thời gian",
        "en": "When the specification is complete, detailed, and there is no time pressure",
        "ja": "仕様が完全かつ詳細で、時間的な制約がない場合"
      },
      {
        "vi": "Khi hệ thống chỉ cần kiểm thử hồi quy tự động lặp lại",
        "en": "When the system only requires repeated automated regression testing",
        "ja": "システムが繰り返しの自動回帰テストのみを必要とする場合"
      },
      {
        "vi": "Khi cần đo độ phủ nhánh chính xác tuyệt đối",
        "en": "When absolute precision in branch coverage measurement is required",
        "ja": "ブランチカバレッジを絶対的に正確に測定する必要がある場合"
      },
      {
        "vi": "Khi tài liệu đặc tả thiếu, không rõ ràng hoặc cần phát hiện nhanh các vấn đề mà kịch bản kiểm thử có sẵn chưa lường trước",
        "en": "When specifications are incomplete, unclear, or there is a need to quickly uncover issues that existing test scripts did not anticipate",
        "ja": "仕様が不足・不明瞭である場合、または既存のテストスクリプトが想定していなかった問題を素早く発見する必要がある場合"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Exploratory testing đặc biệt hữu ích khi tài liệu đặc tả không đầy đủ hoặc cần nhanh chóng khám phá các vấn đề tiềm ẩn mà các kỹ thuật dựa trên đặc tả có sẵn chưa bao quát được.",
      "en": "Exploratory testing is especially valuable when specifications are incomplete or when there's a need to quickly discover latent issues that existing specification-based techniques have not covered.",
      "ja": "探索的テストは、仕様が不完全な場合や、既存の仕様ベース技法がカバーしていない潜在的な問題を素早く発見する必要がある場合に特に有用です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Error guessing thường được thực hiện hiệu quả nhất bởi ai?",
      "en": "Who typically performs error guessing most effectively?",
      "ja": "エラー推測を最も効果的に行えるのは通常誰ですか。"
    },
    "options": [
      {
        "vi": "Tester có kinh nghiệm, hiểu biết về các lỗi thường gặp trong loại hệ thống hoặc công nghệ tương tự",
        "en": "An experienced tester who understands common defects in similar systems or technologies",
        "ja": "類似のシステムや技術でよく見られる不具合を理解している経験豊富なテスター"
      },
      {
        "vi": "Người hoàn toàn chưa từng biết gì về phần mềm để đảm bảo khách quan",
        "en": "Someone with absolutely no knowledge of the software, to ensure objectivity",
        "ja": "客観性を確保するためにソフトウェアについて全く知識のない人"
      },
      {
        "vi": "Chỉ lập trình viên viết ra module đó",
        "en": "Only the developer who wrote that module",
        "ja": "そのモジュールを書いた開発者のみ"
      },
      {
        "vi": "Chỉ khách hàng cuối sử dụng sản phẩm",
        "en": "Only the end customer using the product",
        "ja": "製品を使用する最終顧客のみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì error guessing dựa trên khả năng dự đoán tình huống dễ gây lỗi, tester càng có nhiều kinh nghiệm và hiểu biết về các lỗi điển hình của loại hệ thống/công nghệ tương tự thì càng đoán lỗi hiệu quả.",
      "en": "Since error guessing relies on the ability to anticipate fault-prone situations, testers with more experience and knowledge of typical defects in similar systems/technologies guess errors more effectively.",
      "ja": "エラー推測は不具合が起こりやすい状況を予測する能力に依拠するため、類似システム・技術で典型的な不具合についての経験と知識が豊富なテスターほど、より効果的にエラーを推測できます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ví dụ nào sau đây là một trường hợp áp dụng điển hình của error guessing khi kiểm thử một biểu mẫu nhập liệu?",
      "en": "Which of the following is a typical example of applying error guessing when testing an input form?",
      "ja": "入力フォームをテストする際のエラー推測の適用例として典型的なものは次のうちどれですか。"
    },
    "options": [
      {
        "vi": "Xây dựng bảng quyết định đầy đủ các tổ hợp điều kiện",
        "en": "Building a complete decision table of all condition combinations",
        "ja": "すべての条件の組み合わせを網羅したデシジョンテーブルを作成する"
      },
      {
        "vi": "Thử để trống trường bắt buộc, nhập ký tự đặc biệt, hoặc nhập giá trị vượt giới hạn thường gây lỗi",
        "en": "Trying to leave a required field blank, entering special characters, or entering out-of-range values that commonly cause errors",
        "ja": "必須項目を空欄にする、特殊文字を入力する、よくエラーを引き起こす範囲外の値を入力してみる"
      },
      {
        "vi": "Đo thời gian phản hồi của server bằng công cụ hiệu năng",
        "en": "Measuring server response time using a performance tool",
        "ja": "性能ツールでサーバーの応答時間を測定する"
      },
      {
        "vi": "Kiểm tra độ phủ câu lệnh của mã xử lý biểu mẫu",
        "en": "Checking statement coverage of the form-processing code",
        "ja": "フォーム処理コードのステートメントカバレッジを確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đây là những thao tác điển hình dựa trên kinh nghiệm về các lỗi thường gặp ở biểu mẫu nhập liệu, đúng bản chất của error guessing — không dựa trên mô hình hoá điều kiện hình thức.",
      "en": "These are typical actions based on experience with common input-form errors, reflecting the essence of error guessing — not derived from formal condition modeling.",
      "ja": "これらは入力フォームでよく見られる不具合に関する経験に基づく典型的な操作であり、形式的な条件モデリングではなく、エラー推測の本質を反映しています。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong phân loại các kỹ thuật kiểm thử theo ISTQB, error guessing, checklist-based testing và exploratory testing thuộc nhóm nào?",
      "en": "In the ISTQB classification of test techniques, which category do error guessing, checklist-based testing, and exploratory testing belong to?",
      "ja": "ISTQBのテスト技法分類において、エラー推測、チェックリストベーステスト、探索的テストはどのカテゴリーに属しますか。"
    },
    "options": [
      {
        "vi": "Kỹ thuật kiểm thử dựa trên cấu trúc (structure-based)",
        "en": "Structure-based test techniques",
        "ja": "構造ベース技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử dựa trên đặc tả (specification-based)",
        "en": "Specification-based test techniques",
        "ja": "仕様ベース技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử dựa trên kinh nghiệm (experience-based)",
        "en": "Experience-based test techniques",
        "ja": "経験ベース技法"
      },
      {
        "vi": "Kỹ thuật kiểm thử tĩnh (static testing)",
        "en": "Static testing techniques",
        "ja": "静的テスト技法"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cả ba kỹ thuật này đều dựa chủ yếu vào kiến thức, kinh nghiệm và trực giác của tester để thiết kế/thực hiện kiểm thử, nên được xếp vào nhóm kỹ thuật dựa trên kinh nghiệm, khác với nhóm dựa trên đặc tả hay cấu trúc mã nguồn.",
      "en": "All three techniques primarily rely on the tester's knowledge, experience, and intuition to design/execute testing, placing them in the experience-based category, distinct from specification-based or structure-based techniques.",
      "ja": "この3つの技法はいずれも、テストの設計・実施においてテスターの知識・経験・直感に主に依拠しているため、仕様ベースや構造ベースとは異なる経験ベース技法に分類されます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong thực tế dự án, exploratory testing thường được kết hợp với kiểm thử theo kịch bản như thế nào?",
      "en": "In real project practice, how is exploratory testing typically combined with scripted testing?",
      "ja": "実際のプロジェクトにおいて、探索的テストは通常どのようにスクリプトベーステストと組み合わされますか。"
    },
    "options": [
      {
        "vi": "Hai kỹ thuật loại trừ lẫn nhau, không bao giờ dùng chung",
        "en": "The two techniques are mutually exclusive and never used together",
        "ja": "2つの技法は互いに排他的であり、決して併用されない"
      },
      {
        "vi": "Exploratory testing chỉ được dùng ở giai đoạn UAT",
        "en": "Exploratory testing is only used during the UAT phase",
        "ja": "探索的テストはUAT段階でのみ使用される"
      },
      {
        "vi": "Exploratory testing luôn thay thế hoàn toàn kiểm thử theo kịch bản trong mọi dự án",
        "en": "Exploratory testing always fully replaces scripted testing in every project",
        "ja": "探索的テストはあらゆるプロジェクトで常にスクリプトベーステストを完全に置き換える"
      },
      {
        "vi": "Exploratory testing thường bổ sung cho kiểm thử theo kịch bản, giúp phát hiện những vấn đề mà test case chuẩn bị trước chưa lường tới",
        "en": "Exploratory testing typically complements scripted testing, helping uncover issues that pre-prepared test cases did not anticipate",
        "ja": "探索的テストは通常スクリプトベーステストを補完し、あらかじめ用意されたテストケースが想定していなかった問題を発見する助けとなる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong thực tế, hai kỹ thuật thường bổ trợ nhau: kịch bản đảm bảo độ phủ có kế hoạch, còn exploratory testing giúp phát hiện thêm các vấn đề bất ngờ mà kịch bản chưa lường tới.",
      "en": "In practice, the two techniques typically complement each other: scripts ensure planned coverage, while exploratory testing helps uncover additional unexpected issues that scripts did not anticipate.",
      "ja": "実務では、この2つの技法は互いに補完し合うのが一般的です。スクリプトは計画されたカバレッジを保証し、探索的テストはスクリプトが想定していなかった予期せぬ問題の発見に役立ちます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Session-based test management giúp khắc phục hạn chế nào của exploratory testing tự do, không có cấu trúc?",
      "en": "What limitation of unstructured, free-form exploratory testing does session-based test management help address?",
      "ja": "セッションベーステストマネジメントは、構造化されていない自由形式の探索的テストのどのような限界を克服する助けとなりますか。"
    },
    "options": [
      {
        "vi": "Giúp quản lý, theo dõi và báo cáo được tiến độ cũng như kết quả kiểm thử thăm dò một cách có tổ chức hơn",
        "en": "Making it possible to manage, track, and report exploratory testing progress and results in a more organized way",
        "ja": "探索的テストの進捗と結果をより組織的に管理・追跡・報告できるようにする"
      },
      {
        "vi": "Giúp tăng tốc độ viết mã nguồn của lập trình viên",
        "en": "Speeding up developers' code writing",
        "ja": "開発者のコード記述速度を上げる"
      },
      {
        "vi": "Giúp tự động hoá hoàn toàn việc phát hiện lỗi",
        "en": "Fully automating defect detection",
        "ja": "不具合検出を完全に自動化する"
      },
      {
        "vi": "Giúp loại bỏ hoàn toàn nhu cầu review tài liệu yêu cầu",
        "en": "Completely eliminating the need for requirements document review",
        "ja": "要件文書レビューの必要性を完全になくす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Exploratory testing tự do dễ khó theo dõi tiến độ, khó biết đã kiểm thử gì; SBTM giải quyết vấn đề này bằng cấu trúc phiên có charter, giới hạn thời gian và báo cáo/debrief sau mỗi phiên.",
      "en": "Free-form exploratory testing makes progress hard to track and unclear what has been tested; SBTM addresses this with session structure — a charter, time limit, and report/debrief after each session.",
      "ja": "自由形式の探索的テストは進捗が追跡しにくく、何をテストしたかが不明瞭になりがちです。SBTMは、チャーター、時間制限、各セッション後の報告・デブリーフというセッション構造でこの問題に対処します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Checklist-based testing thường được ưu tiên sử dụng trong tình huống nào?",
      "en": "In what situation is checklist-based testing typically preferred?",
      "ja": "チェックリストベーステストが通常優先的に用いられるのはどのような状況ですか。"
    },
    "options": [
      {
        "vi": "Khi cần thiết kế test case chi tiết từ bảng quyết định phức tạp",
        "en": "When detailed test cases need to be designed from a complex decision table",
        "ja": "複雑なデシジョンテーブルから詳細なテストケースを設計する必要がある場合"
      },
      {
        "vi": "Khi cần kiểm thử hồi quy nhanh hoặc xác nhận tuân thủ các tiêu chí, quy định đã biết trước",
        "en": "When quick regression checks are needed, or compliance with known criteria/regulations must be confirmed",
        "ja": "迅速な回帰確認が必要な場合、または既知の基準・規制への準拠を確認する必要がある場合"
      },
      {
        "vi": "Khi cần đo độ phủ điều kiện trong mã nguồn",
        "en": "When condition coverage in the source code needs to be measured",
        "ja": "ソースコード内の条件カバレッジを測定する必要がある場合"
      },
      {
        "vi": "Khi cần xây dựng mô hình chuyển trạng thái đầy đủ",
        "en": "When a full state transition model needs to be built",
        "ja": "完全な状態遷移モデルを構築する必要がある場合"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Checklist đặc biệt hữu ích để kiểm tra nhanh, gọn các hạng mục tiêu chuẩn/quy định đã biết trước hoặc thực hiện các đợt kiểm thử hồi quy nhanh mà không cần bộ test case chi tiết.",
      "en": "Checklists are especially useful for quickly and concisely checking known standard/regulatory items or performing rapid regression checks without needing a detailed test case suite.",
      "ja": "チェックリストは、既知の標準・規制項目を素早く簡潔に確認したり、詳細なテストケース群を必要とせずに迅速な回帰確認を行ったりする際に特に有用です。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một checklist dùng để kiểm thử tính khả dụng (usability) của giao diện web có thể bao gồm hạng mục nào?",
      "en": "What item might a checklist for testing the usability of a web interface include?",
      "ja": "ウェブインターフェースのユーザビリティをテストするためのチェックリストには、どのような項目が含まれる可能性がありますか。"
    },
    "options": [
      {
        "vi": "Số lượng dòng lệnh trong mã nguồn",
        "en": "The number of lines of code in the source",
        "ja": "ソースコードの行数"
      },
      {
        "vi": "Độ phủ nhánh của module xử lý đăng nhập",
        "en": "Branch coverage of the login-processing module",
        "ja": "ログイン処理モジュールのブランチカバレッジ"
      },
      {
        "vi": "Kiểm tra các nút bấm có nhãn rõ ràng, thông báo lỗi dễ hiểu, điều hướng nhất quán",
        "en": "Checking that buttons have clear labels, error messages are understandable, and navigation is consistent",
        "ja": "ボタンのラベルが明確であること、エラーメッセージが分かりやすいこと、ナビゲーションが一貫していることを確認する"
      },
      {
        "vi": "Danh sách tất cả biến toàn cục trong chương trình",
        "en": "A list of all global variables in the program",
        "ja": "プログラム内のすべてのグローバル変数の一覧"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Checklist tính khả dụng tập trung vào trải nghiệm người dùng như tính rõ ràng, dễ hiểu, nhất quán của giao diện — hạng mục này phản ánh đúng bản chất kiểm thử usability, không liên quan tới cấu trúc mã nguồn.",
      "en": "A usability checklist focuses on user experience aspects such as clarity, understandability, and consistency of the interface — this item accurately reflects the nature of usability testing, unrelated to source code structure.",
      "ja": "ユーザビリティチェックリストは、インターフェースの明確さ、分かりやすさ、一貫性といったユーザー体験の側面に焦点を当てます。この項目はソースコードの構造とは無関係な、ユーザビリティテストの本質を正しく反映しています。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kết quả của exploratory testing phụ thuộc nhiều vào yếu tố nào của người thực hiện?",
      "en": "What factor of the person performing exploratory testing does its outcome largely depend on?",
      "ja": "探索的テストの成果は、実施者のどのような要素に大きく依存しますか。"
    },
    "options": [
      {
        "vi": "Chỉ phụ thuộc vào tốc độ gõ phím",
        "en": "Solely on typing speed",
        "ja": "タイピング速度のみ"
      },
      {
        "vi": "Chỉ phụ thuộc vào số lượng test case đã viết sẵn",
        "en": "Solely on the number of pre-written test cases",
        "ja": "事前に作成されたテストケースの数のみ"
      },
      {
        "vi": "Chỉ phụ thuộc vào số lượng công cụ tự động hoá đang có",
        "en": "Solely on the number of automation tools available",
        "ja": "利用可能な自動化ツールの数のみ"
      },
      {
        "vi": "Kỹ năng, kinh nghiệm, khả năng phân tích và trực giác của tester",
        "en": "The tester's skill, experience, analytical ability, and intuition",
        "ja": "テスターのスキル、経験、分析力、直感"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì không có kịch bản chi tiết hướng dẫn, chất lượng và hiệu quả của exploratory testing gắn chặt với năng lực cá nhân của tester — kỹ năng, kinh nghiệm, khả năng phân tích và trực giác.",
      "en": "Since there is no detailed script to follow, the quality and effectiveness of exploratory testing are closely tied to the tester's individual capabilities — skill, experience, analytical ability, and intuition.",
      "ja": "従うべき詳細なスクリプトがないため、探索的テストの質と効果は、スキル・経験・分析力・直感といったテスター個人の能力と密接に結びついています。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi báo cáo kết quả một phiên kiểm thử thăm dò theo mô hình session-based, tài liệu thường ghi lại những gì?",
      "en": "When reporting the results of an exploratory test session under the session-based model, what does the documentation typically record?",
      "ja": "セッションベースモデルによる探索的テストセッションの結果を報告する際、文書には通常何が記録されますか。"
    },
    "options": [
      {
        "vi": "Mục tiêu phiên (charter), thời gian thực hiện, khu vực đã kiểm thử, vấn đề/lỗi phát hiện và ý tưởng cho các phiên tiếp theo",
        "en": "The session objective (charter), time spent, areas tested, issues/defects found, and ideas for follow-up sessions",
        "ja": "セッションの目的（チャーター）、実施時間、テストした領域、発見した問題・不具合、および今後のセッションのためのアイデア"
      },
      {
        "vi": "Chỉ ghi lại tổng số dòng mã đã kiểm tra",
        "en": "Only the total number of code lines checked",
        "ja": "確認したコード行の総数のみ"
      },
      {
        "vi": "Chỉ ghi lại tên của khách hàng yêu cầu tính năng",
        "en": "Only the name of the customer who requested the feature",
        "ja": "機能を要求した顧客の名前のみ"
      },
      {
        "vi": "Chỉ ghi lại phiên bản trình duyệt được dùng để test",
        "en": "Only the browser version used for testing",
        "ja": "テストに使用したブラウザのバージョンのみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Báo cáo phiên trong SBTM thường bao gồm charter, thời lượng, phạm vi đã bao phủ, kết quả/vấn đề tìm thấy và các hướng khám phá tiếp theo — cung cấp đủ thông tin để đánh giá và theo dõi tiến độ kiểm thử thăm dò.",
      "en": "A session report in SBTM typically includes the charter, duration, coverage achieved, results/issues found, and directions for further exploration — providing enough information to evaluate and track exploratory testing progress.",
      "ja": "SBTMのセッション報告には通常、チャーター、所要時間、達成したカバレッジ、発見した結果・問題、さらなる探索の方向性が含まれ、探索的テストの進捗を評価・追跡するのに十分な情報を提供します。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Nhận định nào sau đây về error guessing là ĐÚNG?",
      "en": "Which of the following statements about error guessing is TRUE?",
      "ja": "エラー推測に関する次の記述のうち、正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Error guessing luôn cho ra bộ test case có độ phủ được đo lường chính xác như kiểm thử dựa trên cấu trúc",
        "en": "Error guessing always produces a test case set with coverage measured as precisely as structure-based testing",
        "ja": "エラー推測は常に構造ベーステストと同じ精度でカバレッジを測定できるテストケース群を生み出す"
      },
      {
        "vi": "Error guessing bổ sung tốt cho các kỹ thuật kiểm thử hình thức khác vì có thể phát hiện lỗi mà các kỹ thuật đó không dự đoán trước được",
        "en": "Error guessing complements other formal test techniques well because it can uncover defects those techniques did not anticipate",
        "ja": "エラー推測は、他の形式的なテスト技法が想定していなかった不具合を発見できるため、それらの技法をうまく補完する"
      },
      {
        "vi": "Error guessing chỉ áp dụng được cho kiểm thử tự động",
        "en": "Error guessing can only be applied to automated testing",
        "ja": "エラー推測は自動テストにしか適用できない"
      },
      {
        "vi": "Error guessing yêu cầu phải có đặc tả yêu cầu chi tiết mới thực hiện được",
        "en": "Error guessing requires detailed requirements specifications in order to be performed",
        "ja": "エラー推測を実施するには詳細な要件仕様が必要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Error guessing không đo lường được độ phủ hình thức như các kỹ thuật dựa trên cấu trúc/đặc tả, nhưng lại giá trị vì phát hiện được các lỗi bất ngờ mà những kỹ thuật hình thức khác dễ bỏ sót, nên thường dùng bổ sung song song.",
      "en": "Error guessing does not offer formal coverage measurement like structure-/specification-based techniques, but it is valuable for catching unexpected defects those formal techniques tend to miss, so it is typically used as a complementary addition.",
      "ja": "エラー推測は構造ベース・仕様ベース技法のような形式的なカバレッジ測定はできませんが、それらの形式的な技法が見落としがちな予期せぬ不具合を発見できる点で価値があり、通常は補完的に併用されます。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Theo ISO 25010, đặc tính chất lượng nào đánh giá mức độ hệ thống có thể được sử dụng bởi những người dùng cụ thể để đạt mục tiêu với tính hiệu quả, hiệu suất và sự hài lòng trong một bối cảnh sử dụng cụ thể?",
      "en": "According to ISO 25010, which quality characteristic assesses the degree to which a system can be used by specified users to achieve goals with effectiveness, efficiency and satisfaction in a specified context of use?",
      "ja": "ISO 25010によれば、特定の利用状況において、特定の利用者が有効性・効率性・満足度を持って目標を達成できる度合いを評価する品質特性はどれか。"
    },
    "options": [
      {
        "vi": "Tính hiệu năng (performance efficiency)",
        "en": "Performance efficiency",
        "ja": "性能効率性(パフォーマンス効率性)"
      },
      {
        "vi": "Tính tin cậy (reliability)",
        "en": "Reliability",
        "ja": "信頼性"
      },
      {
        "vi": "Tính khả dụng (usability)",
        "en": "Usability",
        "ja": "使用性(ユーザビリティ)"
      },
      {
        "vi": "Tính bảo trì (maintainability)",
        "en": "Maintainability",
        "ja": "保守性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Định nghĩa này chính là tính khả dụng — tập trung vào trải nghiệm của người dùng cụ thể trong bối cảnh sử dụng cụ thể.",
      "en": "This is the definition of usability, which centers on how effectively, efficiently and satisfyingly specified users can achieve their goals.",
      "ja": "この定義はまさに使用性(ユーザビリティ)であり、特定の利用者が特定の状況下で目標を達成できるかに焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một ứng dụng ngân hàng xử lý giao dịch chuyển tiền trong 200ms khi có 10.000 người dùng truy cập đồng thời. Đây là ví dụ kiểm thử đặc tính chất lượng nào?",
      "en": "A banking application processes a money transfer in 200ms while 10,000 users access it concurrently. This is an example of testing which quality characteristic?",
      "ja": "銀行アプリが1万人の同時アクセス下で送金処理を200ミリ秒で完了する。これはどの品質特性のテスト例か。"
    },
    "options": [
      {
        "vi": "Tính tương thích (compatibility)",
        "en": "Compatibility",
        "ja": "互換性"
      },
      {
        "vi": "Tính di động (portability)",
        "en": "Portability",
        "ja": "移植性"
      },
      {
        "vi": "Tính bảo mật (security)",
        "en": "Security",
        "ja": "セキュリティ"
      },
      {
        "vi": "Tính hiệu năng (performance efficiency)",
        "en": "Performance efficiency",
        "ja": "性能効率性"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thời gian phản hồi và khả năng chịu tải đồng thời thuộc về tính hiệu năng, cụ thể là thời gian đáp ứng (time behaviour) và khả năng chịu tải (capacity).",
      "en": "Response time and concurrent load handling belong to performance efficiency, specifically time behaviour and capacity.",
      "ja": "応答時間と同時負荷への対応は性能効率性(特に時間効率性とキャパシティ)に属する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sub-characteristic nào của tính bảo mật (security) đảm bảo rằng hành động của một thực thể có thể được truy vết duy nhất về chính thực thể đó?",
      "en": "Which security sub-characteristic ensures that the actions of an entity can be traced uniquely to that entity?",
      "ja": "あるエンティティの行動が、そのエンティティに一意に追跡できることを保証するセキュリティのサブ特性はどれか。"
    },
    "options": [
      {
        "vi": "Tính trách nhiệm giải trình (accountability)",
        "en": "Accountability",
        "ja": "責任追跡性"
      },
      {
        "vi": "Tính không thể chối bỏ (non-repudiation)",
        "en": "Non-repudiation",
        "ja": "否認防止性"
      },
      {
        "vi": "Tính xác thực (authenticity)",
        "en": "Authenticity",
        "ja": "真正性"
      },
      {
        "vi": "Tính bảo mật thông tin (confidentiality)",
        "en": "Confidentiality",
        "ja": "機密性"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Accountability là khả năng truy vết hành động của một thực thể duy nhất về chính thực thể đó, khác với non-repudiation vốn liên quan tới bằng chứng không thể chối bỏ đã thực hiện hành động.",
      "en": "Accountability is the ability to trace an entity's actions uniquely to that entity, whereas non-repudiation concerns proof that an action cannot be denied.",
      "ja": "責任追跡性(アカウンタビリティ)はエンティティの行動をそのエンティティに一意に追跡できる能力であり、否認防止性(行動を否定できない証拠)とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phát biểu nào sau đây về tính tương thích (compatibility) trong ISO 25010 là ĐÚNG?",
      "en": "Which of the following statements about compatibility in ISO 25010 is CORRECT?",
      "ja": "ISO 25010における互換性についての記述として正しいものはどれか。"
    },
    "options": [
      {
        "vi": "Tính tương thích chỉ liên quan tới việc phần mềm chạy được trên nhiều hệ điều hành khác nhau.",
        "en": "Compatibility only concerns whether software can run on multiple different operating systems.",
        "ja": "互換性はソフトウェアが複数の異なるOS上で動作するかどうかにのみ関係する。"
      },
      {
        "vi": "Tính tương thích gồm hai sub-characteristic là co-existence và interoperability.",
        "en": "Compatibility comprises two sub-characteristics: co-existence and interoperability.",
        "ja": "互換性は共存性と相互運用性という2つのサブ特性から成る。"
      },
      {
        "vi": "Tính tương thích đồng nghĩa với tính di động (portability).",
        "en": "Compatibility is synonymous with portability.",
        "ja": "互換性は移植性と同義である。"
      },
      {
        "vi": "Tính tương thích chỉ đo bằng thời gian cài đặt phần mềm trên môi trường mới.",
        "en": "Compatibility is measured only by the time needed to install software on a new environment.",
        "ja": "互換性はソフトウェアを新しい環境にインストールする時間だけで測定される。"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ISO 25010 chia tính tương thích thành co-existence (cùng tồn tại, chia sẻ môi trường mà không ảnh hưởng phần mềm khác) và interoperability (khả năng trao đổi và sử dụng thông tin với hệ thống khác).",
      "en": "ISO 25010 splits compatibility into co-existence (sharing an environment without adversely impacting other software) and interoperability (exchanging and using information with other systems).",
      "ja": "ISO 25010では互換性を共存性(他のソフトウェアに悪影響を与えずに環境を共有できる)と相互運用性(他システムと情報を交換・利用できる)に分けている。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một hệ thống có thể tiếp tục hoạt động đúng ngay cả khi một thành phần phần cứng bị lỗi, nhờ có cơ chế dự phòng (redundancy). Đây minh họa cho sub-characteristic nào của tính tin cậy (reliability)?",
      "en": "A system continues to operate correctly even when a hardware component fails, thanks to redundancy mechanisms. This illustrates which reliability sub-characteristic?",
      "ja": "冗長化の仕組みにより、あるハードウェア部品が故障しても正しく動作し続けるシステム。これは信頼性のどのサブ特性を示しているか。"
    },
    "options": [
      {
        "vi": "Tính trưởng thành (maturity)",
        "en": "Maturity",
        "ja": "成熟性"
      },
      {
        "vi": "Tính sẵn sàng (availability)",
        "en": "Availability",
        "ja": "可用性"
      },
      {
        "vi": "Khả năng chịu lỗi (fault tolerance)",
        "en": "Fault tolerance",
        "ja": "耐故障性(フォールトトレランス)"
      },
      {
        "vi": "Khả năng phục hồi (recoverability)",
        "en": "Recoverability",
        "ja": "回復性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Fault tolerance là khả năng hệ thống duy trì hoạt động đúng dù có lỗi phần cứng hoặc phần mềm, thường đạt được nhờ cơ chế dự phòng.",
      "en": "Fault tolerance is the ability of a system to keep operating correctly despite hardware or software faults, typically achieved through redundancy.",
      "ja": "耐故障性は、ハードウェアやソフトウェアの障害があっても正しい動作を維持する能力であり、通常は冗長化によって実現される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong ISO 25010, sub-characteristic \"modularity\" của tính bảo trì (maintainability) mô tả điều gì?",
      "en": "In ISO 25010, what does the \"modularity\" sub-characteristic of maintainability describe?",
      "ja": "ISO 25010において、保守性のサブ特性である「モジュール性」は何を表すか。"
    },
    "options": [
      {
        "vi": "Mức độ sản phẩm tuân thủ tiêu chuẩn liên quan tới bảo trì.",
        "en": "The degree of compliance with maintainability-related standards.",
        "ja": "保守性に関連する規格への準拠度合い。"
      },
      {
        "vi": "Mức độ mã nguồn có thể được tái sử dụng ở sản phẩm khác.",
        "en": "The degree to which source code can be reused in another product.",
        "ja": "ソースコードが別の製品で再利用できる度合い。"
      },
      {
        "vi": "Mức độ dễ dàng phân tích để chẩn đoán nguyên nhân lỗi.",
        "en": "The degree of ease with which the causes of failures can be diagnosed.",
        "ja": "障害の原因を診断する際の容易さの度合い。"
      },
      {
        "vi": "Mức độ hệ thống được cấu thành từ các thành phần riêng biệt sao cho thay đổi một thành phần ít ảnh hưởng tới các thành phần khác.",
        "en": "The degree to which a system is composed of discrete components such that a change to one has minimal impact on others.",
        "ja": "あるコンポーネントへの変更が他のコンポーネントに与える影響を最小限にするよう、システムが独立したコンポーネントで構成されている度合い。"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Modularity đề cập tới việc chia hệ thống thành các module độc lập, giảm ảnh hưởng dây chuyền khi sửa đổi — khác với reusability (đáp án B) hay analysability (đáp án C).",
      "en": "Modularity concerns dividing a system into independent components to minimize cascading impact, distinct from reusability (option B) or analysability (option C).",
      "ja": "モジュール性は、システムを独立したコンポーネントに分割し、修正時の連鎖的影響を最小化することを指し、再利用性(選択肢B)や解析性(選択肢C)とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đội kiểm thử cài đặt cùng một ứng dụng trên Windows, macOS và Linux để kiểm tra phần mềm chạy đúng trên cả ba nền tảng. Hoạt động này chủ yếu kiểm tra đặc tính chất lượng nào?",
      "en": "A test team installs the same application on Windows, macOS and Linux to verify it runs correctly on all three platforms. This activity mainly tests which quality characteristic?",
      "ja": "テストチームが同一アプリケーションをWindows、macOS、Linuxにインストールし、3つのプラットフォームすべてで正しく動作するか確認する。この作業は主にどの品質特性を検証しているか。"
    },
    "options": [
      {
        "vi": "Tính di động (portability), cụ thể là khả năng thích ứng (adaptability)",
        "en": "Portability, specifically adaptability",
        "ja": "移植性、特に順応性"
      },
      {
        "vi": "Tính tương thích (compatibility), cụ thể là co-existence",
        "en": "Compatibility, specifically co-existence",
        "ja": "互換性、特に共存性"
      },
      {
        "vi": "Tính khả dụng (usability), cụ thể là learnability",
        "en": "Usability, specifically learnability",
        "ja": "使用性、特に学習性"
      },
      {
        "vi": "Tính bảo mật (security), cụ thể là integrity",
        "en": "Security, specifically integrity",
        "ja": "セキュリティ、特に完全性"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khả năng phần mềm hoạt động đúng trên các môi trường phần cứng, hệ điều hành khác nhau thuộc adaptability — một sub-characteristic của portability.",
      "en": "The ability of software to operate correctly across different hardware/OS environments falls under adaptability, a sub-characteristic of portability.",
      "ja": "異なるハードウェアやOS環境で正しく動作する能力は、移植性のサブ特性である順応性に該当する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Phân biệt nào sau đây giữa tính khả dụng (usability) và tính hiệu năng (performance efficiency) trong ISO 25010 là ĐÚNG?",
      "en": "Which of the following correctly distinguishes usability from performance efficiency in ISO 25010?",
      "ja": "ISO 25010における使用性と性能効率性の区別として正しいものはどれか。"
    },
    "options": [
      {
        "vi": "Usability và performance efficiency là hai tên gọi khác nhau của cùng một đặc tính.",
        "en": "Usability and performance efficiency are two names for the same characteristic.",
        "ja": "使用性と性能効率性は同じ特性の別名である。"
      },
      {
        "vi": "Usability đo trải nghiệm và sự hài lòng của người dùng, còn performance efficiency đo nguồn lực hệ thống sử dụng so với mức thực hiện đạt được.",
        "en": "Usability measures user experience and satisfaction, while performance efficiency measures resources used relative to the level of performance achieved.",
        "ja": "使用性はユーザー体験と満足度を測るのに対し、性能効率性は達成した性能水準に対して使用される資源を測る。"
      },
      {
        "vi": "Usability chỉ áp dụng cho phần mềm desktop, còn performance efficiency chỉ áp dụng cho hệ thống web.",
        "en": "Usability applies only to desktop software, while performance efficiency applies only to web systems.",
        "ja": "使用性はデスクトップソフトウェアにのみ適用され、性能効率性はWebシステムにのみ適用される。"
      },
      {
        "vi": "Usability được đo bằng số CPU sử dụng, còn performance efficiency được đo bằng khảo sát người dùng.",
        "en": "Usability is measured by CPU usage, while performance efficiency is measured by user surveys.",
        "ja": "使用性はCPU使用量で測定され、性能効率性はユーザー調査で測定される。"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Usability tập trung vào trải nghiệm/sự hài lòng của người dùng cụ thể, còn performance efficiency tập trung vào tài nguyên (thời gian, bộ nhớ, CPU...) so với mức hiệu năng đạt được.",
      "en": "Usability focuses on the experience/satisfaction of specified users, while performance efficiency focuses on resources (time, memory, CPU) relative to performance achieved.",
      "ja": "使用性は特定の利用者の体験・満足度に焦点を当て、性能効率性は達成される性能水準に対する資源(時間、メモリ、CPU等)に焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong bối cảnh kiểm thử phần mềm, \"testability\" (khả năng kiểm thử) được xếp vào đặc tính chất lượng nào theo ISO 25010?",
      "en": "In the context of software testing, where does \"testability\" fit within ISO 25010 quality characteristics?",
      "ja": "ソフトウェアテストの文脈において、「試験性(テスト容易性)」はISO 25010のどの品質特性に位置づけられるか。"
    },
    "options": [
      {
        "vi": "Là một đặc tính chất lượng độc lập, ngang hàng với tám đặc tính chính",
        "en": "An independent top-level characteristic, on par with the eight main characteristics",
        "ja": "8つの主要特性と同列の独立した品質特性である"
      },
      {
        "vi": "Là sub-characteristic của tính hiệu năng (performance efficiency)",
        "en": "A sub-characteristic of performance efficiency",
        "ja": "性能効率性のサブ特性である"
      },
      {
        "vi": "Là sub-characteristic của tính bảo trì (maintainability)",
        "en": "A sub-characteristic of maintainability",
        "ja": "保守性のサブ特性である"
      },
      {
        "vi": "Không được ISO 25010 đề cập tới",
        "en": "Not addressed by ISO 25010 at all",
        "ja": "ISO 25010ではまったく言及されていない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Testability là sub-characteristic của maintainability, phản ánh mức độ dễ dàng thiết lập các tiêu chí kiểm thử và thực hiện kiểm thử để xác định chúng có đạt hay không.",
      "en": "Testability is a sub-characteristic of maintainability, reflecting how easily test criteria can be established and tests performed to determine whether they are met.",
      "ja": "試験性は保守性のサブ特性であり、テスト基準を設定し、それが満たされているかを判定するテストをどれだけ容易に実施できるかを表す。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một website thương mại điện tử vẫn có thể khôi phục lại toàn bộ dữ liệu giỏ hàng của người dùng sau khi máy chủ gặp sự cố mất điện đột ngột. Đây là ví dụ của sub-characteristic nào?",
      "en": "An e-commerce website can fully restore a user's shopping cart data after a sudden server power outage. This is an example of which sub-characteristic?",
      "ja": "ECサイトが突然のサーバー停電後も、ユーザーのカートデータを完全に復元できる。これはどのサブ特性の例か。"
    },
    "options": [
      {
        "vi": "Khả năng phân tích (analysability) thuộc tính bảo trì (maintainability)",
        "en": "Analysability under maintainability",
        "ja": "保守性における解析性"
      },
      {
        "vi": "Khả năng thay thế (replaceability) thuộc tính di động (portability)",
        "en": "Replaceability under portability",
        "ja": "移植性における置換性"
      },
      {
        "vi": "Tính toàn vẹn (integrity) thuộc tính bảo mật (security)",
        "en": "Integrity under security",
        "ja": "セキュリティにおける完全性"
      },
      {
        "vi": "Khả năng phục hồi (recoverability) thuộc tính tin cậy (reliability)",
        "en": "Recoverability under reliability",
        "ja": "信頼性における回復性"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Recoverability là khả năng hệ thống khôi phục dữ liệu và trạng thái trực tiếp bị ảnh hưởng sau một sự cố gián đoạn hoặc lỗi, thuộc reliability.",
      "en": "Recoverability is the ability to recover directly affected data and system state after an interruption or failure, part of reliability.",
      "ja": "回復性は、中断や障害の後に直接影響を受けたデータやシステム状態を回復する能力であり、信頼性に属する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sub-characteristic \"learnability\" của tính khả dụng (usability) đo lường điều gì?",
      "en": "What does the \"learnability\" sub-characteristic of usability measure?",
      "ja": "使用性のサブ特性である「学習性」は何を測定するか。"
    },
    "options": [
      {
        "vi": "Mức độ dễ dàng người dùng học cách sử dụng sản phẩm để đạt mục tiêu cụ thể một cách hiệu quả",
        "en": "The ease with which users can learn to use the product to achieve specified goals effectively",
        "ja": "ユーザーが特定の目標を効果的に達成するために製品の使い方をどれだけ容易に学習できるか"
      },
      {
        "vi": "Mức độ hệ thống bảo vệ người dùng khỏi thao tác sai",
        "en": "The degree to which the system protects users against making errors",
        "ja": "システムがユーザーの誤操作を防ぐ度合い"
      },
      {
        "vi": "Mức độ giao diện có tính thẩm mỹ, gây hài lòng cho người dùng",
        "en": "The degree to which the interface is aesthetically pleasing to users",
        "ja": "インターフェースがユーザーにとって美的に満足できる度合い"
      },
      {
        "vi": "Mức độ sản phẩm phù hợp với người dùng khuyết tật",
        "en": "The degree to which the product is suitable for users with disabilities",
        "ja": "製品が障害のあるユーザーに適している度合い"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Learnability liên quan tới việc người dùng học cách sử dụng sản phẩm nhanh, hiệu quả; các đáp án còn lại tương ứng lần lượt với user error protection, user interface aesthetics, và accessibility.",
      "en": "Learnability concerns how quickly and effectively users learn to use the product; the other options correspond to user error protection, user interface aesthetics, and accessibility.",
      "ja": "学習性はユーザーが製品の使い方をどれだけ迅速かつ効果的に学べるかに関するもので、他の選択肢はそれぞれユーザーエラー防止性、UIの美しさ、アクセシビリティに対応する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một hệ thống mã hóa dữ liệu nhạy cảm để chỉ những người dùng được cấp quyền mới đọc được nội dung. Đây minh họa sub-characteristic nào của security?",
      "en": "A system encrypts sensitive data so that only authorized users can read the content. This illustrates which security sub-characteristic?",
      "ja": "システムが機密データを暗号化し、認可されたユーザーのみが内容を読めるようにする。これはセキュリティのどのサブ特性を示すか。"
    },
    "options": [
      {
        "vi": "Tính sẵn sàng (availability)",
        "en": "Availability",
        "ja": "可用性"
      },
      {
        "vi": "Tính bảo mật thông tin (confidentiality)",
        "en": "Confidentiality",
        "ja": "機密性"
      },
      {
        "vi": "Tính toàn vẹn (integrity)",
        "en": "Integrity",
        "ja": "完全性"
      },
      {
        "vi": "Tính xác thực (authenticity)",
        "en": "Authenticity",
        "ja": "真正性"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Confidentiality đảm bảo dữ liệu chỉ có thể truy cập bởi những người/hệ thống được cấp quyền, thường đạt được thông qua mã hóa và kiểm soát truy cập.",
      "en": "Confidentiality ensures data is accessible only to those authorized, commonly achieved through encryption and access control.",
      "ja": "機密性はデータが認可された者/システムのみアクセスできることを保証し、暗号化やアクセス制御によって実現されることが多い。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi kiểm thử phi chức năng cho một hệ thống, kiểm thử viên phát hiện rằng dữ liệu bị thay đổi trái phép trong quá trình truyền mà không bị hệ thống phát hiện. Đây là lỗ hổng liên quan tới sub-characteristic nào?",
      "en": "During non-functional testing, a tester discovers that data can be tampered with in transit without the system detecting it. This vulnerability relates to which sub-characteristic?",
      "ja": "非機能テスト中、テスターはデータが転送中に不正に改ざんされてもシステムが検知しないことを発見した。この脆弱性はどのサブ特性に関係するか。"
    },
    "options": [
      {
        "vi": "Khả năng cài đặt (installability)",
        "en": "Installability",
        "ja": "設置性"
      },
      {
        "vi": "Khả năng phục hồi (recoverability)",
        "en": "Recoverability",
        "ja": "回復性"
      },
      {
        "vi": "Tính toàn vẹn (integrity)",
        "en": "Integrity",
        "ja": "完全性"
      },
      {
        "vi": "Khả năng thay thế (replaceability)",
        "en": "Replaceability",
        "ja": "置換性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Integrity là khả năng hệ thống ngăn chặn truy cập hoặc sửa đổi trái phép dữ liệu/chương trình; việc không phát hiện thay đổi trái phép là lỗ hổng về integrity.",
      "en": "Integrity is the ability to prevent unauthorized access to or modification of data/programs; failing to detect unauthorized tampering is an integrity flaw.",
      "ja": "完全性はデータやプログラムへの不正なアクセスや変更を防ぐ能力であり、不正な改ざんを検知できないことは完全性の欠陥である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đâu là phát biểu SAI về mối quan hệ giữa các đặc tính chất lượng trong ISO 25010?",
      "en": "Which of the following is an INCORRECT statement about the relationships between quality characteristics in ISO 25010?",
      "ja": "ISO 25010における品質特性間の関係についての記述として誤っているものはどれか。"
    },
    "options": [
      {
        "vi": "Cải thiện tính bảo mật đôi khi có thể làm giảm tính hiệu năng do thêm bước mã hóa/xác thực.",
        "en": "Improving security can sometimes reduce performance efficiency due to added encryption/authentication steps.",
        "ja": "セキュリティを改善すると、暗号化や認証の追加処理により性能効率性が低下することがある。"
      },
      {
        "vi": "Việc thêm nhiều cơ chế kiểm tra để tăng tính tin cậy có thể làm tăng độ phức tạp, ảnh hưởng tới tính bảo trì.",
        "en": "Adding many checks to improve reliability can increase complexity, impacting maintainability.",
        "ja": "信頼性を高めるために多くのチェック機構を追加すると複雑性が増し、保守性に影響することがある。"
      },
      {
        "vi": "Tính bảo trì tốt có thể gián tiếp hỗ trợ tính tin cậy vì lỗi được phát hiện và sửa nhanh hơn.",
        "en": "Good maintainability can indirectly support reliability since defects are found and fixed faster.",
        "ja": "優れた保守性は、欠陥がより速く発見・修正されるため、間接的に信頼性を支えることがある。"
      },
      {
        "vi": "Các đặc tính chất lượng luôn độc lập hoàn toàn với nhau, cải thiện một đặc tính không bao giờ ảnh hưởng tới đặc tính khác.",
        "en": "Quality characteristics are always completely independent; improving one never affects another.",
        "ja": "品質特性は常に完全に独立しており、1つを改善しても他に影響を与えることは決してない。"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong thực tế các đặc tính chất lượng thường đánh đổi lẫn nhau (trade-off), không hoàn toàn độc lập; kiểm thử viên cần cân nhắc các đánh đổi này khi thiết kế kiểm thử phi chức năng.",
      "en": "In practice, quality characteristics often trade off against each other and are not fully independent; testers must consider such trade-offs when designing non-functional tests.",
      "ja": "実際には品質特性同士はしばしばトレードオフの関係にあり、完全に独立しているわけではない。テスト担当者は非機能テスト設計時にこれを考慮する必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sub-characteristic \"capacity\" của tính hiệu năng (performance efficiency) mô tả điều gì?",
      "en": "What does the \"capacity\" sub-characteristic of performance efficiency describe?",
      "ja": "性能効率性のサブ特性である「キャパシティ(容量)」は何を表すか。"
    },
    "options": [
      {
        "vi": "Giới hạn tối đa của một tham số hệ thống, ví dụ số lượng người dùng đồng thời tối đa mà hệ thống đáp ứng được",
        "en": "The maximum limit of a system parameter, e.g. the maximum number of concurrent users the system can support",
        "ja": "システムパラメータの最大限度、例えばシステムが対応できる最大同時ユーザー数"
      },
      {
        "vi": "Thời gian phản hồi và thời gian xử lý của một chức năng khi thực thi",
        "en": "The response time and processing time of a function when it is executed",
        "ja": "機能が実行される際の応答時間と処理時間"
      },
      {
        "vi": "Lượng tài nguyên CPU và bộ nhớ tiêu thụ trung bình trong điều kiện tải bình thường",
        "en": "The average CPU and memory resource consumption under normal load conditions",
        "ja": "通常負荷条件下での平均CPUおよびメモリ消費量"
      },
      {
        "vi": "Mức độ giao diện phản hồi trực quan cho người dùng",
        "en": "The degree to which the interface responds intuitively to users",
        "ja": "インターフェースがユーザーに直感的に応答する度合い"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Capacity đề cập tới giới hạn tối đa của một tham số (ví dụ số người dùng, dung lượng lưu trữ) mà sản phẩm/hệ thống có thể đáp ứng, khác với time behaviour (đáp án A) hay resource utilization (đáp án C).",
      "en": "Capacity refers to the maximum limits of a parameter (e.g. number of users, storage) that the product can meet, distinct from time behaviour (A) or resource utilization (C).",
      "ja": "キャパシティは製品が満たせるパラメータ(例:ユーザー数、ストレージ)の最大限度を指し、時間効率性(A)や資源効率性(C)とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một ứng dụng di động cho phép người khiếm thị sử dụng trình đọc màn hình (screen reader) để thao tác đầy đủ các chức năng chính. Điều này liên quan tới sub-characteristic nào của usability?",
      "en": "A mobile app allows visually impaired users to fully operate its main features using a screen reader. This relates to which usability sub-characteristic?",
      "ja": "モバイルアプリが視覚障害のあるユーザーにスクリーンリーダーで主要機能をすべて操作できるようにする。これは使用性のどのサブ特性に関係するか。"
    },
    "options": [
      {
        "vi": "Khả năng vận hành (operability)",
        "en": "Operability",
        "ja": "操作性"
      },
      {
        "vi": "Khả năng tiếp cận (accessibility)",
        "en": "Accessibility",
        "ja": "アクセシビリティ"
      },
      {
        "vi": "Khả năng nhận biết mức độ phù hợp (appropriateness recognizability)",
        "en": "Appropriateness recognizability",
        "ja": "適切度認識性"
      },
      {
        "vi": "Tính thẩm mỹ giao diện người dùng (user interface aesthetics)",
        "en": "User interface aesthetics",
        "ja": "UIの美しさ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Accessibility là mức độ sản phẩm có thể được sử dụng bởi những người có nhiều đặc điểm và khả năng khác nhau, bao gồm người khuyết tật, để đạt mục tiêu cụ thể.",
      "en": "Accessibility is the degree to which a product can be used by people with the widest range of characteristics and capabilities, including disabilities, to achieve specified goals.",
      "ja": "アクセシビリティは、障害を含む幅広い特性や能力を持つ人々が特定の目標を達成するために製品を使用できる度合いである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong ISTQB Foundation, kiểm thử phi chức năng cho tính hiệu năng thường bao gồm những loại kiểm thử nào?",
      "en": "In ISTQB Foundation, non-functional testing for performance efficiency typically includes which types of testing?",
      "ja": "ISTQB Foundationにおいて、性能効率性の非機能テストには通常どのようなテストが含まれるか。"
    },
    "options": [
      {
        "vi": "Kiểm thử hồi quy (regression testing) và kiểm thử khói (smoke testing)",
        "en": "Regression testing and smoke testing",
        "ja": "回帰テストとスモークテスト"
      },
      {
        "vi": "Kiểm thử hộp trắng (white-box testing) và kiểm thử đường dẫn (path testing)",
        "en": "White-box testing and path testing",
        "ja": "ホワイトボックステストとパステスト"
      },
      {
        "vi": "Kiểm thử load, stress, endurance/soak testing",
        "en": "Load testing, stress testing, endurance/soak testing",
        "ja": "負荷テスト、ストレステスト、耐久性(ソーク)テスト"
      },
      {
        "vi": "Kiểm thử bảng quyết định (decision table testing)",
        "en": "Decision table testing",
        "ja": "デシジョンテーブルテスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Load, stress, và endurance/soak testing là các kỹ thuật kiểm thử phi chức năng đặc trưng để đánh giá tính hiệu năng của hệ thống dưới các điều kiện tải khác nhau.",
      "en": "Load, stress and endurance/soak testing are typical non-functional testing techniques used to evaluate a system's performance efficiency under various load conditions.",
      "ja": "負荷テスト、ストレステスト、耐久性(ソーク)テストは、さまざまな負荷条件下でシステムの性能効率性を評価する典型的な非機能テスト技法である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Sub-characteristic \"installability\" thuộc tính di động (portability) đánh giá điều gì?",
      "en": "What does the \"installability\" sub-characteristic of portability evaluate?",
      "ja": "移植性のサブ特性である「設置性(インストール容易性)」は何を評価するか。"
    },
    "options": [
      {
        "vi": "Mức độ chương trình được thiết kế tuân theo tiêu chuẩn liên quan tới di động",
        "en": "The degree to which the program conforms to standards relating to portability",
        "ja": "プログラムが移植性に関する規格にどれだけ準拠しているか"
      },
      {
        "vi": "Mức độ sản phẩm có thể thay thế một sản phẩm khác có cùng mục đích trong cùng môi trường",
        "en": "The degree to which a product can replace another product for the same purpose in the same environment",
        "ja": "同一環境において同じ目的の別の製品を置き換えられる度合い"
      },
      {
        "vi": "Mức độ hiệu quả hệ thống thích ứng khi thay đổi phần cứng hoặc phần mềm môi trường",
        "en": "How efficiently a system adapts when hardware or software environment changes",
        "ja": "ハードウェアやソフトウェア環境が変化した際にシステムが適応する効率性"
      },
      {
        "vi": "Mức độ dễ dàng và thành công của việc cài đặt hoặc gỡ cài đặt phần mềm trong một môi trường xác định",
        "en": "How easily and successfully software can be installed or uninstalled in a specified environment",
        "ja": "ソフトウェアが特定の環境において、どれだけ容易かつ確実にインストールまたはアンインストールできるか"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Installability là mức độ dễ dàng cài đặt/gỡ bỏ thành công phần mềm trong môi trường xác định, khác với replaceability (đáp án B) hay adaptability (đáp án C).",
      "en": "Installability concerns how easily and successfully the software can be installed/uninstalled in a specified environment, distinct from replaceability (B) or adaptability (C).",
      "ja": "設置性は特定の環境でソフトウェアをどれだけ容易かつ確実にインストール・アンインストールできるかに関するもので、置換性(B)や順応性(C)とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một hệ thống ERP cũ cần được nâng cấp lên hệ điều hành mới. Đội phát triển đánh giá công sức cần thiết để chuyển đổi hệ thống sang môi trường mới. Hoạt động này liên quan chủ yếu tới sub-characteristic nào?",
      "en": "A legacy ERP system needs to be upgraded to a new operating system. The team assesses the effort required to transfer the system to the new environment. This mainly relates to which sub-characteristic?",
      "ja": "レガシーERPシステムを新しいOSにアップグレードする必要がある。チームは新環境への移行に必要な作業量を評価する。これは主にどのサブ特性に関係するか。"
    },
    "options": [
      {
        "vi": "Khả năng thích ứng (adaptability) thuộc tính di động",
        "en": "Adaptability under portability",
        "ja": "移植性における順応性"
      },
      {
        "vi": "Khả năng sửa đổi (modifiability) thuộc tính bảo trì",
        "en": "Modifiability under maintainability",
        "ja": "保守性における修正性"
      },
      {
        "vi": "Khả năng cùng tồn tại (co-existence) thuộc tính tương thích",
        "en": "Co-existence under compatibility",
        "ja": "互換性における共存性"
      },
      {
        "vi": "Khả năng nhận biết mức độ phù hợp (appropriateness recognizability) thuộc tính khả dụng",
        "en": "Appropriateness recognizability under usability",
        "ja": "使用性における適切度認識性"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Adaptability là mức độ sản phẩm có thể chuyển đổi hiệu quả sang môi trường phần cứng, phần mềm hoặc vận hành khác — đúng với việc nâng cấp hệ điều hành.",
      "en": "Adaptability is the degree to which a product can be effectively adapted for different hardware, software or operational environments — matching an OS upgrade scenario.",
      "ja": "順応性は製品が異なるハードウェア、ソフトウェア、運用環境に効果的に適応できる度合いであり、OSアップグレードの状況に合致する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đâu là ví dụ về kiểm thử tính khả dụng (usability testing) mà không phải là kiểm thử tính hiệu năng?",
      "en": "Which of the following is an example of usability testing rather than performance testing?",
      "ja": "性能テストではなく使用性テストの例はどれか。"
    },
    "options": [
      {
        "vi": "Đo thời gian phản hồi của server khi có 5.000 request/giây",
        "en": "Measuring server response time under 5,000 requests per second",
        "ja": "1秒あたり5,000リクエストの負荷時にサーバーの応答時間を測定する"
      },
      {
        "vi": "Quan sát người dùng thực hiện một nhiệm vụ trên giao diện mới và ghi nhận số lần họ bị nhầm lẫn thao tác",
        "en": "Observing users performing a task on a new interface and recording how often they get confused",
        "ja": "新しいUIでユーザーがタスクを実行する様子を観察し、操作に迷った回数を記録する"
      },
      {
        "vi": "Đo lượng bộ nhớ RAM tiêu thụ khi ứng dụng chạy nền",
        "en": "Measuring RAM consumption while the app runs in the background",
        "ja": "アプリがバックグラウンドで動作している際のRAM消費量を測定する"
      },
      {
        "vi": "Kiểm tra dung lượng lưu trữ tối đa mà cơ sở dữ liệu có thể chịu tải",
        "en": "Checking the maximum storage capacity the database can handle",
        "ja": "データベースが処理できる最大ストレージ容量を確認する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Quan sát người dùng thực hiện nhiệm vụ và ghi nhận mức độ nhầm lẫn là kỹ thuật kiểm thử tính khả dụng điển hình (usability testing/user observation), khác với các phép đo tài nguyên/hiệu năng ở các đáp án còn lại.",
      "en": "Observing users performing tasks and recording confusion is a typical usability testing technique (user observation), unlike the resource/performance measurements in the other options.",
      "ja": "ユーザーがタスクを実行する様子を観察し、混乱の度合いを記録することは典型的な使用性テスト技法(ユーザー観察)であり、他の選択肢のリソース・性能測定とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong đánh giá bảo mật, việc xác minh rằng người dùng đăng nhập đúng là chủ tài khoản họ tuyên bố (ví dụ qua xác thực đa yếu tố) thuộc sub-characteristic nào?",
      "en": "In a security assessment, verifying that a logging-in user really is the account owner they claim to be (e.g. via multi-factor authentication) belongs to which sub-characteristic?",
      "ja": "セキュリティ評価において、ログインするユーザーが本人が主張する通りのアカウント所有者であることを(多要素認証などで)検証することは、どのサブ特性に該当するか。"
    },
    "options": [
      {
        "vi": "Tính sẵn sàng (availability)",
        "en": "Availability",
        "ja": "可用性"
      },
      {
        "vi": "Tính toàn vẹn (integrity)",
        "en": "Integrity",
        "ja": "完全性"
      },
      {
        "vi": "Tính xác thực (authenticity)",
        "en": "Authenticity",
        "ja": "真正性"
      },
      {
        "vi": "Khả năng phục hồi (recoverability)",
        "en": "Recoverability",
        "ja": "回復性"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Authenticity là khả năng chứng minh danh tính của một chủ thể hoặc tài nguyên đúng như những gì được tuyên bố; xác thực đa yếu tố là cơ chế điển hình để đạt được điều này.",
      "en": "Authenticity is the ability to prove that the identity of a subject or resource is as claimed; multi-factor authentication is a typical mechanism for achieving this.",
      "ja": "真正性は、主体やリソースの識別情報が主張通りであることを証明できる能力であり、多要素認証はこれを実現する典型的な仕組みである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một công ty phát hiện rằng module thanh toán của phần mềm rất khó chỉnh sửa vì mã nguồn có sự phụ thuộc chằng chịt giữa các thành phần không liên quan. Vấn đề này ảnh hưởng trực tiếp tới đặc tính chất lượng nào?",
      "en": "A company finds that a software's payment module is very hard to modify because the source code has tangled dependencies between unrelated components. This issue directly affects which quality characteristic?",
      "ja": "ある企業は、無関係なコンポーネント間の依存関係が絡み合っているため、決済モジュールの修正が非常に困難であることに気づいた。この問題は主にどの品質特性に影響するか。"
    },
    "options": [
      {
        "vi": "Tính hiệu năng (performance efficiency)",
        "en": "Performance efficiency",
        "ja": "性能効率性"
      },
      {
        "vi": "Tính tương thích (compatibility)",
        "en": "Compatibility",
        "ja": "互換性"
      },
      {
        "vi": "Tính di động (portability)",
        "en": "Portability",
        "ja": "移植性"
      },
      {
        "vi": "Tính bảo trì (maintainability)",
        "en": "Maintainability",
        "ja": "保守性"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sự phụ thuộc chằng chịt giữa các thành phần làm giảm modularity, ảnh hưởng trực tiếp tới maintainability — mức độ dễ dàng sửa đổi, chỉnh sửa hệ thống.",
      "en": "Tangled dependencies reduce modularity, directly affecting maintainability — the ease with which the system can be modified.",
      "ja": "依存関係の絡み合いはモジュール性を低下させ、システムを修正する容易さである保守性に直接影響する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi hai hệ thống khác nhau (ví dụ hệ thống kế toán và hệ thống bán hàng) có thể trao đổi dữ liệu và sử dụng thông tin của nhau một cách chính xác, đây là biểu hiện của sub-characteristic nào?",
      "en": "When two different systems (e.g. an accounting system and a sales system) can exchange data and correctly use each other's information, this demonstrates which sub-characteristic?",
      "ja": "2つの異なるシステム(例:会計システムと販売システム)が正しくデータを交換し、互いの情報を利用できる場合、これはどのサブ特性を示すか。"
    },
    "options": [
      {
        "vi": "Khả năng vận hành liên thông (interoperability)",
        "en": "Interoperability",
        "ja": "相互運用性"
      },
      {
        "vi": "Khả năng cùng tồn tại (co-existence)",
        "en": "Co-existence",
        "ja": "共存性"
      },
      {
        "vi": "Khả năng thích ứng (adaptability)",
        "en": "Adaptability",
        "ja": "順応性"
      },
      {
        "vi": "Khả năng phân tích (analysability)",
        "en": "Analysability",
        "ja": "解析性"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Interoperability là mức độ hai hoặc nhiều hệ thống, sản phẩm có thể trao đổi thông tin và sử dụng thông tin đã trao đổi một cách chính xác.",
      "en": "Interoperability is the degree to which two or more systems/products can exchange information and correctly use the exchanged information.",
      "ja": "相互運用性は、2つ以上のシステムや製品が情報を交換し、交換した情報を正しく利用できる度合いである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Đâu KHÔNG phải là một trong tám đặc tính chất lượng chính của ISO 25010?",
      "en": "Which of the following is NOT one of the eight main quality characteristics of ISO 25010?",
      "ja": "次のうち、ISO 25010の8つの主要品質特性に含まれないものはどれか。"
    },
    "options": [
      {
        "vi": "Tính phù hợp chức năng (functional suitability)",
        "en": "Functional suitability",
        "ja": "機能適合性"
      },
      {
        "vi": "Độ phủ kiểm thử (test coverage)",
        "en": "Test coverage",
        "ja": "テストカバレッジ"
      },
      {
        "vi": "Tính hiệu năng (performance efficiency)",
        "en": "Performance efficiency",
        "ja": "性能効率性"
      },
      {
        "vi": "Tính bảo mật (security)",
        "en": "Security",
        "ja": "セキュリティ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test coverage là một khái niệm đo lường trong kiểm thử, không phải là một đặc tính chất lượng sản phẩm theo ISO 25010; tám đặc tính chính gồm functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability và portability.",
      "en": "Test coverage is a testing measurement concept, not one of the ISO 25010 product quality characteristics; the eight main ones are functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability and portability.",
      "ja": "テストカバレッジはテストにおける測定概念であり、ISO 25010の製品品質特性ではない。8つの主要特性は機能適合性、性能効率性、互換性、使用性、信頼性、セキュリティ、保守性、移植性である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong một dự án kiểm thử tính bảo mật, kiểm thử viên cố gắng gửi yêu cầu giả mạo tới hệ thống để kiểm tra xem hệ thống có phát hiện và ngăn chặn được truy cập trái phép hay không. Đây là kỹ thuật kiểm thử điển hình cho đặc tính nào?",
      "en": "In a security testing project, a tester attempts to send forged requests to check whether the system detects and blocks unauthorized access. This is a typical testing technique for which characteristic?",
      "ja": "セキュリティテストプロジェクトにおいて、テスターは偽造リクエストを送信し、システムが不正アクセスを検知・阻止できるかを確認する。これはどの特性の典型的なテスト技法か。"
    },
    "options": [
      {
        "vi": "Tính tin cậy (reliability), thông qua soak testing",
        "en": "Reliability, via soak testing",
        "ja": "信頼性(ソークテストを通じて)"
      },
      {
        "vi": "Tính hiệu năng (performance efficiency), thông qua stress testing",
        "en": "Performance efficiency, via stress testing",
        "ja": "性能効率性(ストレステストを通じて)"
      },
      {
        "vi": "Tính bảo mật (security), thông qua kiểm thử thâm nhập (penetration testing)",
        "en": "Security, via penetration testing",
        "ja": "セキュリティ(ペネトレーションテストを通じて)"
      },
      {
        "vi": "Tính khả dụng (usability), thông qua kiểm thử heuristic",
        "en": "Usability, via heuristic evaluation",
        "ja": "使用性(ヒューリスティック評価を通じて)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Gửi yêu cầu giả mạo để kiểm tra khả năng phát hiện/ngăn chặn truy cập trái phép là đặc trưng của kiểm thử thâm nhập (penetration testing), một kỹ thuật kiểm thử security điển hình.",
      "en": "Sending forged requests to test detection/prevention of unauthorized access is characteristic of penetration testing, a typical security testing technique.",
      "ja": "偽造リクエストを送信して不正アクセスの検知・阻止能力を確認することは、典型的なセキュリティテスト技法であるペネトレーションテストの特徴である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Rủi ro dự án (project risk) được hiểu là gì trong kiểm thử phần mềm?",
      "en": "What is a project risk in software testing?",
      "ja": "ソフトウェアテストにおける「プロジェクトリスク」とは何か。"
    },
    "options": [
      {
        "vi": "Rủi ro liên quan trực tiếp đến chất lượng của sản phẩm phần mềm đang được kiểm thử",
        "en": "A risk directly related to the quality of the software product under test",
        "ja": "テスト対象のソフトウェア製品の品質に直接関わるリスク"
      },
      {
        "vi": "Rủi ro do phần mềm chứa lỗi khiến người dùng không thể hoàn thành nghiệp vụ",
        "en": "A risk that the software contains defects preventing users from completing their tasks",
        "ja": "ソフトウェアに欠陥があり、ユーザーが業務を完了できなくなるリスク"
      },
      {
        "vi": "Rủi ro chỉ xảy ra sau khi phần mềm được đưa vào vận hành thực tế",
        "en": "A risk that only occurs after the software goes into real operation",
        "ja": "ソフトウェアが実運用に入った後にのみ発生するリスク"
      },
      {
        "vi": "Rủi ro liên quan đến khả năng quản lý và kiểm soát dự án, ví dụ chậm tiến độ, thiếu nguồn lực",
        "en": "A risk related to the management and control of the project, e.g. schedule delays, lack of resources",
        "ja": "進捗の遅延やリソース不足など、プロジェクトの管理・統制に関わるリスク"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Rủi ro dự án là những yếu tố có thể ảnh hưởng đến khả năng đạt mục tiêu của dự án về tiến độ, chi phí, nguồn lực, tổ chức... chứ không phải chất lượng sản phẩm.",
      "en": "Project risks are factors that can affect the project's ability to meet its objectives regarding schedule, cost, resources, organization, etc., not the quality of the product itself.",
      "ja": "プロジェクトリスクとは、スケジュール、コスト、リソース、組織体制など、プロジェクトが目標を達成する能力に影響を与える可能性のある要因であり、製品自体の品質とは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Rủi ro sản phẩm (product risk) khác với rủi ro dự án ở điểm nào?",
      "en": "How does a product risk differ from a project risk?",
      "ja": "「プロダクトリスク」は「プロジェクトリスク」とどのように異なるか。"
    },
    "options": [
      {
        "vi": "Rủi ro sản phẩm liên quan đến khả năng phần mềm không đáp ứng đúng nhu cầu người dùng hoặc yêu cầu chất lượng",
        "en": "Product risk relates to the possibility that the software fails to meet user needs or quality requirements",
        "ja": "プロダクトリスクは、ソフトウェアがユーザーのニーズや品質要件を満たさない可能性に関わる"
      },
      {
        "vi": "Rủi ro sản phẩm liên quan đến khả năng quản lý con người trong dự án",
        "en": "Product risk relates to the ability to manage people within the project",
        "ja": "プロダクトリスクはプロジェクト内の人材管理能力に関わる"
      },
      {
        "vi": "Rủi ro sản phẩm chỉ xuất hiện khi ngân sách dự án bị cắt giảm",
        "en": "Product risk only appears when the project budget is cut",
        "ja": "プロダクトリスクはプロジェクト予算が削減された場合にのみ発生する"
      },
      {
        "vi": "Rủi ro sản phẩm và rủi ro dự án là hai tên gọi khác nhau của cùng một khái niệm",
        "en": "Product risk and project risk are just two different names for the same concept",
        "ja": "プロダクトリスクとプロジェクトリスクは同じ概念の異なる呼び方に過ぎない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rủi ro sản phẩm liên quan trực tiếp đến chất lượng, hiệu năng, chức năng của sản phẩm được kiểm thử, khác với rủi ro dự án tập trung vào quản lý tiến độ, nguồn lực.",
      "en": "Product risk is directly related to the quality, performance, and functionality of the product under test, unlike project risk which focuses on schedule and resource management.",
      "ja": "プロダクトリスクはテスト対象製品の品質、性能、機能に直接関わり、スケジュールやリソース管理に焦点を当てるプロジェクトリスクとは異なる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Tình huống nào sau đây là ví dụ điển hình của rủi ro dự án?",
      "en": "Which of the following is a typical example of a project risk?",
      "ja": "次のうち、プロジェクトリスクの典型的な例はどれか。"
    },
    "options": [
      {
        "vi": "Chức năng thanh toán tính sai số tiền trong một số trường hợp đặc biệt",
        "en": "The payment function calculates the wrong amount in certain special cases",
        "ja": "支払い機能が特定の特殊なケースで金額を誤って計算する"
      },
      {
        "vi": "Nhóm dự án thiếu nhân sự có kỹ năng kiểm thử tự động cần thiết cho hệ thống",
        "en": "The project team lacks staff with the automation testing skills required for the system",
        "ja": "プロジェクトチームに、システムに必要な自動テストのスキルを持つ人材が不足している"
      },
      {
        "vi": "Ứng dụng phản hồi chậm khi có nhiều người dùng truy cập cùng lúc",
        "en": "The application responds slowly when many users access it simultaneously",
        "ja": "多数のユーザーが同時にアクセスするとアプリケーションの応答が遅くなる"
      },
      {
        "vi": "Giao diện người dùng không thân thiện, gây khó khăn cho người dùng cuối",
        "en": "The user interface is not user-friendly, causing difficulty for end users",
        "ja": "ユーザーインターフェースが使いにくく、エンドユーザーに支障をきたす"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thiếu nhân sự có kỹ năng là vấn đề về nguồn lực và tổ chức của dự án, thuộc rủi ro dự án; ba phương án còn lại đều liên quan trực tiếp đến chất lượng sản phẩm.",
      "en": "Lack of skilled staff is a resource and organizational issue of the project, i.e. a project risk; the other three options relate directly to product quality.",
      "ja": "スキルを持つ人材の不足はプロジェクトのリソース・組織上の問題であり、プロジェクトリスクに該当する。他の3つはいずれも製品品質に直接関わる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trường hợp nào dưới đây được xem là rủi ro sản phẩm?",
      "en": "Which of the following is considered a product risk?",
      "ja": "次のうち、プロダクトリスクとみなされるのはどれか。"
    },
    "options": [
      {
        "vi": "Nhà tài trợ dự án thay đổi ưu tiên kinh doanh giữa chừng",
        "en": "The project sponsor changes business priorities midway through",
        "ja": "プロジェクトのスポンサーが途中でビジネス上の優先順位を変更する"
      },
      {
        "vi": "Công cụ quản lý cấu hình gặp sự cố khiến mất mã nguồn tạm thời",
        "en": "The configuration management tool has an issue causing temporary source code loss",
        "ja": "構成管理ツールに不具合が発生し、一時的にソースコードが失われる"
      },
      {
        "vi": "Module tính toán thuế cho ra kết quả sai lệch với quy định pháp luật hiện hành",
        "en": "The tax calculation module produces results that deviate from current legal regulations",
        "ja": "税金計算モジュールが現行の法規制と異なる結果を出す"
      },
      {
        "vi": "Nhà cung cấp phần cứng giao thiết bị kiểm thử trễ hơn dự kiến",
        "en": "The hardware vendor delivers testing equipment later than planned",
        "ja": "ハードウェアベンダーがテスト機器の納品を予定より遅らせる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kết quả tính toán sai so với quy định là lỗi ảnh hưởng trực tiếp đến chất lượng và độ tin cậy của sản phẩm, thuộc rủi ro sản phẩm; các phương án còn lại là vấn đề tổ chức, quản lý dự án.",
      "en": "Calculation results that violate regulations directly affect product quality and reliability, making it a product risk; the other options are organizational or project management issues.",
      "ja": "規制に反する計算結果は製品の品質と信頼性に直接影響するためプロダクトリスクに該当する。他の選択肢は組織やプロジェクト管理上の問題である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục đích chính của kiểm thử dựa trên rủi ro (risk-based testing) là gì?",
      "en": "What is the main purpose of risk-based testing?",
      "ja": "リスクベーステスト（risk-based testing）の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Đảm bảo mọi chức năng của hệ thống được kiểm thử với cùng mức độ chi tiết",
        "en": "Ensure every function of the system is tested with the same level of detail",
        "ja": "システムのすべての機能を同じ詳細度でテストすること"
      },
      {
        "vi": "Thay thế hoàn toàn việc kiểm thử hồi quy bằng kiểm thử thăm dò",
        "en": "Fully replace regression testing with exploratory testing",
        "ja": "回帰テストを探索的テストで完全に置き換えること"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu lập kế hoạch kiểm thử",
        "en": "Completely eliminate the need for test planning",
        "ja": "テスト計画の必要性を完全になくすこと"
      },
      {
        "vi": "Tập trung nỗ lực và ưu tiên kiểm thử vào những vùng có rủi ro cao nhất để giảm thiểu rủi ro tồn dư",
        "en": "Focus effort and prioritize testing on the areas with the highest risk to reduce residual risk",
        "ja": "最もリスクの高い領域にテストの労力と優先順位を集中させ、残存リスクを低減すること"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Risk-based testing sử dụng rủi ro để định hướng, phân bổ effort và mức độ nghiêm ngặt của kiểm thử, ưu tiên các khu vực rủi ro cao nhằm giảm rủi ro tồn dư khi phát hành.",
      "en": "Risk-based testing uses risk to guide the allocation of effort and rigor of testing, prioritizing high-risk areas to reduce residual risk at release.",
      "ja": "リスクベーステストはリスクを指標としてテストの労力と厳密さの配分を決め、リリース時の残存リスクを減らすために高リスク領域を優先する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong đánh giá rủi ro, mức độ rủi ro (risk level) thường được xác định dựa trên hai yếu tố nào?",
      "en": "In risk assessment, the risk level is typically determined based on which two factors?",
      "ja": "リスク評価において、リスクレベルは通常どの2つの要因に基づいて決定されるか。"
    },
    "options": [
      {
        "vi": "Khả năng xảy ra (likelihood) của vấn đề và mức độ ảnh hưởng (impact) nếu vấn đề đó xảy ra",
        "en": "The likelihood of the problem occurring and the impact if it does occur",
        "ja": "問題が発生する可能性（likelihood）と、発生した場合の影響度（impact）"
      },
      {
        "vi": "Số lượng tester tham gia và số lượng ca kiểm thử đã viết",
        "en": "The number of testers involved and the number of test cases written",
        "ja": "参加するテスターの人数と作成されたテストケースの数"
      },
      {
        "vi": "Ngân sách dự án và thời gian còn lại đến hạn phát hành",
        "en": "The project budget and the time remaining until release",
        "ja": "プロジェクト予算とリリースまでの残り時間"
      },
      {
        "vi": "Số lượng defect đã phát hiện trong giai đoạn phát triển trước đó",
        "en": "The number of defects found in the previous development stage",
        "ja": "前段階の開発で発見された欠陥の数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mức độ rủi ro thường được xác định là sự kết hợp giữa khả năng xảy ra (likelihood) và mức độ ảnh hưởng/hậu quả (impact) nếu rủi ro đó xảy ra.",
      "en": "Risk level is typically determined as a combination of the likelihood of occurrence and the impact/consequence if the risk materializes.",
      "ja": "リスクレベルは通常、発生の可能性（likelihood）とそのリスクが顕在化した場合の影響・結果（impact）の組み合わせとして決定される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Yếu tố nào sau đây thường được dùng để đánh giá khả năng xảy ra (likelihood) của một rủi ro sản phẩm?",
      "en": "Which factor is typically used to assess the likelihood of a product risk?",
      "ja": "プロダクトリスクの発生可能性（likelihood）を評価するために一般的に用いられる要因はどれか。"
    },
    "options": [
      {
        "vi": "Mức độ hài lòng của khách hàng với sản phẩm trước đó",
        "en": "Customer satisfaction with a previous product",
        "ja": "以前の製品に対する顧客満足度"
      },
      {
        "vi": "Độ phức tạp kỹ thuật của thành phần và kinh nghiệm của đội phát triển với công nghệ đó",
        "en": "The technical complexity of the component and the development team's experience with that technology",
        "ja": "コンポーネントの技術的複雑さと、その技術に対する開発チームの経験"
      },
      {
        "vi": "Số lượng ngôn ngữ mà ứng dụng hỗ trợ",
        "en": "The number of languages the application supports",
        "ja": "アプリケーションがサポートする言語数"
      },
      {
        "vi": "Màu sắc giao diện được lựa chọn cho sản phẩm",
        "en": "The color scheme chosen for the product's interface",
        "ja": "製品インターフェースに選ばれた配色"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Độ phức tạp kỹ thuật, sự thay đổi công nghệ, kinh nghiệm của đội ngũ... là các yếu tố ảnh hưởng trực tiếp đến khả năng một lỗi xảy ra (likelihood).",
      "en": "Technical complexity, technology change, and team experience are factors that directly influence the likelihood of a defect occurring.",
      "ja": "技術的複雑さ、技術の変化、チームの経験などは、欠陥が発生する可能性（likelihood）に直接影響する要因である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Yếu tố nào sau đây thường dùng để đánh giá mức độ ảnh hưởng (impact) của một rủi ro sản phẩm?",
      "en": "Which factor is typically used to assess the impact of a product risk?",
      "ja": "プロダクトリスクの影響度（impact）を評価するために一般的に用いられる要因はどれか。"
    },
    "options": [
      {
        "vi": "Số dòng code của module liên quan",
        "en": "The number of lines of code in the related module",
        "ja": "関連するモジュールのコード行数"
      },
      {
        "vi": "Ngôn ngữ lập trình được sử dụng để viết module đó",
        "en": "The programming language used to write that module",
        "ja": "そのモジュールを記述するために使用されたプログラミング言語"
      },
      {
        "vi": "Tầm quan trọng nghiệp vụ của chức năng và thiệt hại tài chính, uy tín nếu xảy ra lỗi",
        "en": "The business criticality of the function and the financial or reputational damage if a failure occurs",
        "ja": "その機能のビジネス上の重要性と、障害発生時の金銭的・信用上の損害"
      },
      {
        "vi": "Thời gian buổi họp daily standup của nhóm phát triển",
        "en": "The duration of the development team's daily standup meeting",
        "ja": "開発チームのデイリースタンドアップ会議の所要時間"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Impact được đánh giá qua hậu quả nếu lỗi xảy ra: mức độ quan trọng nghiệp vụ, thiệt hại tài chính, an toàn, uy tín thương hiệu, số người dùng bị ảnh hưởng.",
      "en": "Impact is assessed by the consequences if a defect occurs: business criticality, financial loss, safety, reputational damage, and the number of users affected.",
      "ja": "影響度（impact）は、欠陥が発生した場合の結果、すなわちビジネス上の重要性、金銭的損失、安全性、ブランドの信用、影響を受けるユーザー数によって評価される。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trong cách tiếp cận kiểm thử dựa trên rủi ro, các tính năng có mức rủi ro cao thường được xử lý như thế nào?",
      "en": "In a risk-based testing approach, how are high-risk features typically handled?",
      "ja": "リスクベーステストのアプローチにおいて、リスクの高い機能は通常どのように扱われるか。"
    },
    "options": [
      {
        "vi": "Được kiểm thử sau cùng, sau khi hoàn tất các tính năng rủi ro thấp",
        "en": "Tested last, after all low-risk features have been completed",
        "ja": "低リスクの機能をすべてテストし終えた後、最後にテストされる"
      },
      {
        "vi": "Chỉ được kiểm thử bằng kiểm thử thủ công, không dùng tự động hóa",
        "en": "Only tested manually, without any automation",
        "ja": "自動化を使わず手動テストのみで検証される"
      },
      {
        "vi": "Được loại khỏi phạm vi kiểm thử để tiết kiệm thời gian",
        "en": "Excluded from the test scope to save time",
        "ja": "時間節約のためテスト範囲から除外される"
      },
      {
        "vi": "Được kiểm thử sớm hơn và kỹ lưỡng hơn so với các tính năng rủi ro thấp",
        "en": "Tested earlier and more thoroughly than low-risk features",
        "ja": "低リスクの機能よりも早く、より徹底的にテストされる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nguyên tắc của risk-based testing là ưu tiên kiểm thử sớm và kỹ hơn cho các khu vực rủi ro cao nhằm phát hiện lỗi nghiêm trọng sớm nhất có thể.",
      "en": "The principle of risk-based testing is to prioritize earlier and more thorough testing of high-risk areas to detect severe defects as early as possible.",
      "ja": "リスクベーステストの原則は、深刻な欠陥をできるだけ早期に発見するため、高リスク領域のテストを優先的に早く、より徹底的に行うことである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Ai thường tham gia vào việc xác định và đánh giá rủi ro trong dự án phần mềm?",
      "en": "Who typically participates in identifying and assessing risks in a software project?",
      "ja": "ソフトウェアプロジェクトにおいてリスクの識別・評価に一般的に関与するのは誰か。"
    },
    "options": [
      {
        "vi": "Đa dạng các bên liên quan: business analyst, developer, tester, product owner, khách hàng...",
        "en": "A diverse set of stakeholders: business analysts, developers, testers, product owners, customers, etc.",
        "ja": "ビジネスアナリスト、開発者、テスター、プロダクトオーナー、顧客など、多様な関係者"
      },
      {
        "vi": "Chỉ khách hàng cuối, vì họ là người sử dụng sản phẩm",
        "en": "Only the end customer, since they are the ones using the product",
        "ja": "最終顧客のみ、製品を使用するのは彼らだから"
      },
      {
        "vi": "Chỉ riêng test manager, không cần ý kiến của các bên khác",
        "en": "Only the test manager, without input from other stakeholders",
        "ja": "テストマネージャーのみで、他の関係者の意見は不要"
      },
      {
        "vi": "Chỉ ban giám đốc công ty vì họ chịu trách nhiệm về ngân sách",
        "en": "Only company executives, since they are responsible for the budget",
        "ja": "予算に責任を持つ会社の経営陣のみ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Việc xác định rủi ro nên có sự tham gia của nhiều bên liên quan khác nhau (đa góc nhìn) để phát hiện đầy đủ và chính xác các rủi ro dự án lẫn rủi ro sản phẩm.",
      "en": "Risk identification should involve various stakeholders (multiple perspectives) to thoroughly and accurately uncover both project and product risks.",
      "ja": "リスクの識別には、プロジェクトリスクとプロダクトリスクの両方を漏れなく正確に洗い出すため、多様な関係者（多角的な視点）が関与すべきである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kỹ thuật nào sau đây thường được dùng để thu thập và phân tích rủi ro trong nhóm dự án?",
      "en": "Which technique is commonly used to gather and analyze risks within a project team?",
      "ja": "プロジェクトチーム内でリスクを収集・分析するために一般的に使われる手法はどれか。"
    },
    "options": [
      {
        "vi": "Chạy lại toàn bộ bộ kiểm thử hồi quy nhiều lần",
        "en": "Re-running the entire regression test suite multiple times",
        "ja": "回帰テストスイート全体を何度も再実行すること"
      },
      {
        "vi": "Buổi họp brainstorming hoặc workshop đánh giá rủi ro với các bên liên quan",
        "en": "A brainstorming session or risk assessment workshop with stakeholders",
        "ja": "関係者とともに行うブレインストーミングやリスク評価ワークショップ"
      },
      {
        "vi": "Chỉ dựa vào tài liệu đặc tả kỹ thuật mà không cần thảo luận",
        "en": "Relying solely on the technical specification document without discussion",
        "ja": "議論せず技術仕様書のみに頼ること"
      },
      {
        "vi": "Đợi đến khi hệ thống được đưa vào sản xuất rồi mới xem xét rủi ro",
        "en": "Waiting until the system goes into production before considering risks",
        "ja": "システムが本番稼働するまでリスクを検討しないこと"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Các kỹ thuật thu thập rủi ro phổ biến gồm brainstorming, workshop, phỏng vấn chuyên gia, checklist kinh nghiệm từ dự án trước.",
      "en": "Common risk identification techniques include brainstorming, workshops, expert interviews, and checklists based on experience from previous projects.",
      "ja": "一般的なリスク識別手法には、ブレインストーミング、ワークショップ、専門家へのインタビュー、過去プロジェクトの経験に基づくチェックリストなどがある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Việc thực hiện kiểm thử có vai trò gì đối với rủi ro sản phẩm?",
      "en": "What role does performing testing play with respect to product risk?",
      "ja": "テストを実施することはプロダクトリスクに対してどのような役割を果たすか。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn mọi rủi ro sản phẩm, đảm bảo phần mềm không còn lỗi",
        "en": "It completely eliminates all product risks, guaranteeing the software is defect-free",
        "ja": "すべてのプロダクトリスクを完全に排除し、ソフトウェアに欠陥がないことを保証する"
      },
      {
        "vi": "Không liên quan gì đến việc quản lý rủi ro sản phẩm",
        "en": "It has no relation to product risk management",
        "ja": "プロダクトリスク管理とは全く関係がない"
      },
      {
        "vi": "Là một hành động giảm thiểu (mitigation) rủi ro sản phẩm bằng cách phát hiện lỗi trước khi phát hành",
        "en": "It is a mitigation action for product risk by finding defects before release",
        "ja": "リリース前に欠陥を発見することでプロダクトリスクを軽減（mitigation）する行為である"
      },
      {
        "vi": "Chỉ có tác dụng giảm rủi ro dự án, không ảnh hưởng đến rủi ro sản phẩm",
        "en": "It only reduces project risk and has no effect on product risk",
        "ja": "プロジェクトリスクの低減にのみ効果があり、プロダクトリスクには影響しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiểm thử là biện pháp giảm thiểu rủi ro sản phẩm bằng cách phát hiện lỗi sớm; tuy nhiên không thể loại bỏ hoàn toàn rủi ro do kiểm thử toàn diện là bất khả thi.",
      "en": "Testing is a mitigation activity for product risk by finding defects early; however, it cannot eliminate risk entirely since exhaustive testing is impossible.",
      "ja": "テストは早期に欠陥を発見することでプロダクトリスクを軽減する活動であるが、網羅的テストは不可能であるためリスクを完全になくすことはできない。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Khi không thể loại bỏ hoàn toàn một rủi ro cao, nhóm dự án nên chuẩn bị hành động nào?",
      "en": "When a high risk cannot be fully eliminated, what should the project team prepare?",
      "ja": "高いリスクを完全に排除できない場合、プロジェクトチームは何を準備すべきか。"
    },
    "options": [
      {
        "vi": "Bỏ qua rủi ro đó vì đã cố gắng hết sức",
        "en": "Ignore that risk since they already tried their best",
        "ja": "最善を尽くしたのだからそのリスクは無視する"
      },
      {
        "vi": "Giảm số lượng người dùng được phép sử dụng hệ thống",
        "en": "Reduce the number of users allowed to use the system",
        "ja": "システムを利用できるユーザー数を減らす"
      },
      {
        "vi": "Hủy toàn bộ dự án ngay lập tức",
        "en": "Cancel the entire project immediately",
        "ja": "直ちにプロジェクト全体を中止する"
      },
      {
        "vi": "Kế hoạch dự phòng (contingency plan) để giảm hậu quả nếu rủi ro xảy ra",
        "en": "A contingency plan to reduce the consequences if the risk materializes",
        "ja": "リスクが顕在化した場合の影響を軽減するためのコンティンジェンシープラン（緊急対応計画）"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi rủi ro không thể tránh hoặc giảm hoàn toàn, nhóm cần có kế hoạch dự phòng (contingency) để ứng phó và giảm thiểu hậu quả nếu rủi ro xảy ra thực tế.",
      "en": "When a risk cannot be fully avoided or reduced, the team needs a contingency plan to respond and minimize consequences if the risk actually occurs.",
      "ja": "リスクを完全に回避または低減できない場合、実際にリスクが発生した際の影響を最小化するため、チームはコンティンジェンシープランを用意する必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Tình huống nào sau đây thể hiện rủi ro dự án liên quan đến yếu tố tổ chức?",
      "en": "Which situation illustrates a project risk related to organizational factors?",
      "ja": "組織的要因に関連するプロジェクトリスクを示す状況はどれか。"
    },
    "options": [
      {
        "vi": "Giao tiếp kém giữa nhóm phát triển ở nhiều địa điểm khác nhau dẫn đến hiểu sai yêu cầu",
        "en": "Poor communication between distributed development teams leads to misunderstood requirements",
        "ja": "複数拠点の開発チーム間のコミュニケーション不足により要件の誤解が生じる"
      },
      {
        "vi": "Trang chủ ứng dụng hiển thị sai định dạng ngày tháng cho người dùng Nhật Bản",
        "en": "The homepage displays the wrong date format for Japanese users",
        "ja": "ホームページが日本のユーザーに対して誤った日付形式を表示する"
      },
      {
        "vi": "API thanh toán trả về mã lỗi không đúng chuẩn khi giao dịch thất bại",
        "en": "The payment API returns an incorrect error code when a transaction fails",
        "ja": "決済APIが取引失敗時に不正なエラーコードを返す"
      },
      {
        "vi": "Hệ thống không đáp ứng yêu cầu bảo mật dữ liệu cá nhân của khách hàng",
        "en": "The system fails to meet personal data protection requirements",
        "ja": "システムが顧客の個人データ保護要件を満たさない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Giao tiếp kém giữa các nhóm ở nhiều địa điểm là vấn đề tổ chức, thuộc rủi ro dự án; các phương án còn lại đều là lỗi ảnh hưởng trực tiếp đến chất lượng sản phẩm.",
      "en": "Poor communication between distributed teams is an organizational issue and therefore a project risk; the other options are defects directly affecting product quality.",
      "ja": "複数拠点チーム間のコミュニケーション不足は組織上の問題でありプロジェクトリスクに該当する。他の選択肢はいずれも製品品質に直接影響する欠陥である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Trường hợp nào sau đây là ví dụ về rủi ro sản phẩm liên quan đến bảo mật?",
      "en": "Which of the following is an example of a product risk related to security?",
      "ja": "セキュリティに関するプロダクトリスクの例として適切なのはどれか。"
    },
    "options": [
      {
        "vi": "Đội bảo mật của công ty nghỉ việc đồng loạt trước khi dự án kết thúc",
        "en": "The company's security team all resigns before the project ends",
        "ja": "プロジェクト終了前に会社のセキュリティチームが一斉に退職する"
      },
      {
        "vi": "Hệ thống lưu trữ mật khẩu người dùng ở dạng văn bản thuần, không mã hóa",
        "en": "The system stores user passwords in plain text without encryption",
        "ja": "システムがユーザーのパスワードを暗号化せず平文で保存する"
      },
      {
        "vi": "Ngân sách dành cho kiểm thử bảo mật bị cắt giảm giữa kỳ",
        "en": "The budget allocated for security testing is cut mid-project",
        "ja": "セキュリティテストのための予算がプロジェクト途中で削減される"
      },
      {
        "vi": "Công ty chưa ký hợp đồng chính thức với đơn vị kiểm thử bảo mật thuê ngoài",
        "en": "The company has not yet signed a formal contract with the outsourced security testing vendor",
        "ja": "会社が外部委託のセキュリティテスト業者と正式契約をまだ結んでいない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Lưu mật khẩu không mã hóa là lỗ hổng bảo mật thực tế trong sản phẩm, ảnh hưởng trực tiếp đến chất lượng và an toàn của hệ thống, thuộc rủi ro sản phẩm.",
      "en": "Storing passwords unencrypted is an actual security flaw in the product, directly affecting system quality and safety, making it a product risk.",
      "ja": "パスワードを暗号化せずに保存することは製品自体の実際のセキュリティ上の欠陥であり、システムの品質と安全性に直接影響するためプロダクトリスクに該当する。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Theo nguyên tắc kiểm thử dựa trên rủi ro, việc phân tích rủi ro nên được thực hiện vào thời điểm nào?",
      "en": "According to risk-based testing principles, when should risk analysis be performed?",
      "ja": "リスクベーステストの原則によれば、リスク分析はいつ実施すべきか。"
    },
    "options": [
      {
        "vi": "Chỉ khi khách hàng yêu cầu, không cần chủ động thực hiện",
        "en": "Only when the customer requests it, no need to do it proactively",
        "ja": "顧客から要求があった場合のみ、能動的に行う必要はない"
      },
      {
        "vi": "Chỉ sau khi toàn bộ giai đoạn kiểm thử hoàn tất",
        "en": "Only after the entire testing phase is complete",
        "ja": "テストフェーズ全体が完了した後にのみ"
      },
      {
        "vi": "Càng sớm càng tốt trong dự án, và cập nhật liên tục khi có thông tin mới",
        "en": "As early as possible in the project, and continuously updated as new information emerges",
        "ja": "プロジェクトのできるだけ早い段階で、かつ新しい情報が得られるたびに継続的に更新する"
      },
      {
        "vi": "Chỉ một lần duy nhất ngay khi ký hợp đồng dự án",
        "en": "Only once, right when the project contract is signed",
        "ja": "プロジェクト契約締結時に一度だけ"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phân tích rủi ro cần bắt đầu càng sớm càng tốt để định hướng chiến lược kiểm thử ngay từ đầu, và cần cập nhật liên tục vì rủi ro có thể thay đổi theo thời gian.",
      "en": "Risk analysis should start as early as possible to shape the test strategy from the outset, and must be continuously updated since risks can change over time.",
      "ja": "リスク分析はテスト戦略を早期から方向づけるためできるだけ早く開始すべきであり、リスクは時間とともに変化しうるため継続的な更新が必要である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Thuật ngữ \"rủi ro tồn dư\" (residual risk) trong bối cảnh kiểm thử dùng để chỉ điều gì?",
      "en": "In a testing context, what does the term \"residual risk\" refer to?",
      "ja": "テストの文脈における「残存リスク」（residual risk）とは何を指すか。"
    },
    "options": [
      {
        "vi": "Rủi ro đã được loại bỏ hoàn toàn nhờ kiểm thử",
        "en": "A risk that has been fully eliminated through testing",
        "ja": "テストによって完全に排除されたリスク"
      },
      {
        "vi": "Rủi ro chỉ tồn tại trong giai đoạn lập kế hoạch dự án",
        "en": "A risk that only exists during the project planning stage",
        "ja": "プロジェクトの計画段階にのみ存在するリスク"
      },
      {
        "vi": "Rủi ro phát sinh do thay đổi nhân sự trong nhóm phát triển",
        "en": "A risk arising from staff turnover within the development team",
        "ja": "開発チームの人員変更によって生じるリスク"
      },
      {
        "vi": "Phần rủi ro còn lại chưa được xử lý hết sau khi đã kiểm thử và triển khai các biện pháp giảm thiểu",
        "en": "The remaining portion of risk that has not been fully addressed after testing and mitigation actions",
        "ja": "テストや軽減策を実施した後もなお完全には対処されていない、残ったリスクの部分"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Vì kiểm thử toàn diện là bất khả thi, luôn tồn tại một phần rủi ro chưa được phát hiện/xử lý hết gọi là rủi ro tồn dư, cần được thông báo cho các bên liên quan trước khi phát hành.",
      "en": "Since exhaustive testing is impossible, there is always some portion of risk left unaddressed, called residual risk, which should be communicated to stakeholders before release.",
      "ja": "網羅的テストは不可能であるため、常に完全には対処しきれないリスクの一部、すなわち残存リスクが存在し、リリース前に関係者へ報告する必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Tài liệu/công cụ nào thường được sử dụng để ghi lại, theo dõi và cập nhật các rủi ro đã được xác định trong dự án?",
      "en": "Which document/tool is typically used to record, track, and update identified risks in a project?",
      "ja": "プロジェクトで識別されたリスクを記録・追跡・更新するために一般的に使用される文書/ツールはどれか。"
    },
    "options": [
      {
        "vi": "Sổ đăng ký rủi ro (risk register)",
        "en": "The risk register",
        "ja": "リスク登録簿（risk register）"
      },
      {
        "vi": "Bảng quyết định (decision table)",
        "en": "The decision table",
        "ja": "デシジョンテーブル（decision table）"
      },
      {
        "vi": "Sơ đồ chuyển trạng thái (state transition diagram)",
        "en": "The state transition diagram",
        "ja": "状態遷移図（state transition diagram）"
      },
      {
        "vi": "Bảng phân vùng tương đương (equivalence partitioning table)",
        "en": "The equivalence partitioning table",
        "ja": "同値分割表（equivalence partitioning table）"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Risk register là tài liệu ghi lại các rủi ro đã xác định cùng với mức độ, chủ sở hữu, biện pháp xử lý và tình trạng, được cập nhật xuyên suốt dự án; các phương án còn lại là kỹ thuật thiết kế test case.",
      "en": "The risk register documents identified risks along with their level, owner, mitigation actions, and status, updated throughout the project; the other options are test design techniques.",
      "ja": "リスク登録簿は、識別されたリスクをそのレベル、担当者、対応策、状況とともに記録し、プロジェクト全体を通じて更新される文書である。他の選択肢はテスト設計技法である。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Kiểm thử dựa trên rủi ro giúp trả lời câu hỏi nào sau đây một cách trực tiếp nhất?",
      "en": "Risk-based testing most directly helps answer which of the following questions?",
      "ja": "リスクベーステストが最も直接的に答えるのに役立つ問いは次のうちどれか。"
    },
    "options": [
      {
        "vi": "Nên viết tài liệu đặc tả yêu cầu theo định dạng nào?",
        "en": "What format should the requirements specification document use?",
        "ja": "要件仕様書はどの形式で書くべきか"
      },
      {
        "vi": "Nên dành bao nhiêu effort và mức độ kỹ lưỡng cho việc kiểm thử từng khu vực chức năng?",
        "en": "How much effort and rigor should be devoted to testing each functional area?",
        "ja": "各機能領域のテストにどれだけの労力と厳密さを割くべきか"
      },
      {
        "vi": "Nên chọn ngôn ngữ lập trình nào cho dự án?",
        "en": "Which programming language should be chosen for the project?",
        "ja": "プロジェクトにどのプログラミング言語を選ぶべきか"
      },
      {
        "vi": "Nên tổ chức buổi họp retrospective vào ngày nào trong tuần?",
        "en": "On which day of the week should the retrospective meeting be held?",
        "ja": "レトロスペクティブ会議を週の何曜日に開催すべきか"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Risk-based testing là cơ sở để phân bổ nguồn lực và độ kỹ lưỡng kiểm thử: khu vực rủi ro càng cao thì càng cần đầu tư nhiều effort kiểm thử hơn.",
      "en": "Risk-based testing serves as the basis for allocating resources and test rigor: the higher the risk of an area, the more testing effort it warrants.",
      "ja": "リスクベーステストはリソース配分とテストの厳密さを決める基盤となる。リスクが高い領域ほど、より多くのテスト労力を投じる必要がある。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Nhận định nào sau đây về sự phối hợp giữa rủi ro dự án và rủi ro sản phẩm là ĐÚNG?",
      "en": "Which of the following statements about the relationship between project risk and product risk is TRUE?",
      "ja": "プロジェクトリスクとプロダクトリスクの関係について正しい記述はどれか。"
    },
    "options": [
      {
        "vi": "Rủi ro sản phẩm luôn nghiêm trọng hơn rủi ro dự án trong mọi trường hợp",
        "en": "Product risk is always more severe than project risk in every case",
        "ja": "プロダクトリスクは常にあらゆる場合においてプロジェクトリスクより深刻である"
      },
      {
        "vi": "Rủi ro dự án và rủi ro sản phẩm hoàn toàn độc lập, không có mối liên hệ nào",
        "en": "Project risk and product risk are completely independent, with no relationship at all",
        "ja": "プロジェクトリスクとプロダクトリスクは完全に独立しており、何の関連もない"
      },
      {
        "vi": "Rủi ro dự án nếu không được kiểm soát tốt có thể gián tiếp làm tăng rủi ro sản phẩm, ví dụ do thiếu thời gian kiểm thử",
        "en": "If not well controlled, project risk can indirectly increase product risk, e.g. due to insufficient testing time",
        "ja": "プロジェクトリスクがうまく制御されないと、テスト時間の不足などにより間接的にプロダクトリスクを増大させうる"
      },
      {
        "vi": "Chỉ cần quản lý rủi ro dự án là đủ để đảm bảo chất lượng sản phẩm",
        "en": "Managing project risk alone is sufficient to ensure product quality",
        "ja": "プロジェクトリスクを管理するだけで製品品質を確保するには十分である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hai loại rủi ro có mối liên hệ với nhau: ví dụ rủi ro dự án như chậm tiến độ có thể dẫn đến cắt giảm thời gian kiểm thử, làm tăng khả năng lỗi sản phẩm không được phát hiện, tức tăng rủi ro sản phẩm.",
      "en": "The two risk types are related: for example, a project risk like schedule delay can lead to reduced testing time, increasing the chance undetected defects remain, i.e. raising product risk.",
      "ja": "この2種類のリスクは互いに関連している。例えば進捗遅延というプロジェクトリスクはテスト時間の削減につながり、未検出の欠陥が残る可能性、すなわちプロダクトリスクを高める。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một tính năng phụ, ít được người dùng sử dụng và không ảnh hưởng nghiệp vụ cốt lõi thường được xếp vào mức rủi ro nào và xử lý ra sao?",
      "en": "A minor feature that is rarely used and does not affect core business operations is typically assigned what risk level and handled how?",
      "ja": "あまり使われず中核業務に影響しない補助的な機能は、通常どのリスクレベルに分類され、どのように扱われるか。"
    },
    "options": [
      {
        "vi": "Rủi ro cao, cần kiểm thử với mức độ kỹ lưỡng tối đa như tính năng lõi",
        "en": "High risk, requiring the same maximum testing rigor as core features",
        "ja": "高リスクとされ、中核機能と同じ最大限の厳密さでテストする必要がある"
      },
      {
        "vi": "Luôn được loại bỏ hoàn toàn khỏi phạm vi kiểm thử của dự án",
        "en": "Always completely removed from the project's testing scope",
        "ja": "常にプロジェクトのテスト範囲から完全に除外される"
      },
      {
        "vi": "Không cần đưa vào phân tích rủi ro vì không thuộc phạm vi dự án",
        "en": "It should not be included in risk analysis since it is out of the project scope",
        "ja": "プロジェクト範囲外であるためリスク分析に含める必要はない"
      },
      {
        "vi": "Rủi ro thấp, thường được kiểm thử với mức độ ít kỹ lưỡng hơn hoặc ưu tiên thấp hơn",
        "en": "Low risk, typically tested with less rigor or lower priority",
        "ja": "低リスクとされ、通常はより低い厳密さや優先度でテストされる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Tính năng ít quan trọng, ít sử dụng thường có impact và/hoặc likelihood thấp nên được xếp mức rủi ro thấp, kiểm thử với effort ít hơn để dành nguồn lực cho khu vực rủi ro cao.",
      "en": "A less important, rarely used feature usually has low impact and/or likelihood, so it is assigned a lower risk level and tested with less effort, freeing resources for higher-risk areas.",
      "ja": "重要度が低く使用頻度も低い機能は影響度・発生可能性のいずれか、あるいは両方が低いため低リスクに分類され、より高リスクな領域にリソースを回すためテスト労力は少なめになる。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Theo khái niệm chung trong quản lý rủi ro, \"rủi ro\" (risk) được định nghĩa gần đúng nhất là gì?",
      "en": "According to the general concept in risk management, \"risk\" is best defined as what?",
      "ja": "リスク管理における一般的な概念として、「リスク」は最も適切には何と定義されるか。"
    },
    "options": [
      {
        "vi": "Khả năng xảy ra một sự kiện trong tương lai có hậu quả tiêu cực, kết hợp giữa xác suất và mức độ ảnh hưởng",
        "en": "The possibility of a future event having a negative consequence, combining probability and impact",
        "ja": "将来において否定的な結果をもたらす出来事が起こる可能性であり、確率と影響度の組み合わせ"
      },
      {
        "vi": "Một sự kiện tiêu cực chắc chắn sẽ xảy ra trong tương lai gần",
        "en": "A negative event that is certain to occur in the near future",
        "ja": "近い将来に必ず発生する否定的な出来事"
      },
      {
        "vi": "Một defect đã được xác nhận tồn tại trong mã nguồn",
        "en": "A defect that has already been confirmed to exist in the source code",
        "ja": "すでにソースコード内に存在することが確認された欠陥"
      },
      {
        "vi": "Một yêu cầu chức năng chưa được lập tài liệu đầy đủ",
        "en": "A functional requirement that has not been fully documented",
        "ja": "十分に文書化されていない機能要件"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Rủi ro là một sự kiện tiềm ẩn có thể xảy ra trong tương lai và gây hậu quả tiêu cực; mức độ rủi ro là sự kết hợp giữa xác suất xảy ra và mức độ ảnh hưởng, chưa chắc chắn xảy ra.",
      "en": "Risk is a potential future event that could have a negative consequence; its level is a combination of probability of occurrence and impact, and it is not certain to happen.",
      "ja": "リスクとは将来起こりうる潜在的な出来事で否定的な結果をもたらす可能性があるものであり、そのレベルは発生確率と影響度の組み合わせであって、必ず発生するとは限らない。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Việc yêu cầu dự án thay đổi liên tục trong quá trình phát triển, chưa được kiểm soát chặt chẽ, là ví dụ của loại rủi ro nào?",
      "en": "Requirements that keep changing frequently during development without tight control are an example of which type of risk?",
      "ja": "開発中に要件が厳格な管理なしで頻繁に変更され続けることは、どの種類のリスクの例か。"
    },
    "options": [
      {
        "vi": "Rủi ro sản phẩm, vì liên quan trực tiếp đến chất lượng phần mềm",
        "en": "Product risk, since it directly relates to software quality",
        "ja": "ソフトウェアの品質に直接関わるためプロダクトリスク"
      },
      {
        "vi": "Rủi ro dự án, vì liên quan đến quản lý phạm vi và tiến độ dự án",
        "en": "Project risk, since it relates to managing project scope and schedule",
        "ja": "プロジェクトの範囲やスケジュール管理に関わるためプロジェクトリスク"
      },
      {
        "vi": "Không phải là rủi ro vì thay đổi yêu cầu là chuyện bình thường",
        "en": "Not a risk at all, since requirement changes are normal",
        "ja": "要件変更は普通のことなのでリスクではない"
      },
      {
        "vi": "Chỉ là vấn đề kỹ thuật của lập trình viên, không liên quan đến kiểm thử",
        "en": "Purely a technical issue for developers, unrelated to testing",
        "ja": "開発者の技術的な問題に過ぎず、テストとは無関係"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Thay đổi yêu cầu liên tục, thiếu kiểm soát scope là vấn đề quản lý dự án (scope creep), ảnh hưởng đến tiến độ và kế hoạch, thuộc rủi ro dự án; nó có thể gián tiếp gây ra rủi ro sản phẩm nhưng bản chất là rủi ro dự án.",
      "en": "Frequent, uncontrolled requirement changes reflect a project management issue (scope creep) affecting schedule and planning, making it a project risk; it may indirectly cause product risk, but is inherently a project risk.",
      "ja": "頻繁で管理されない要件変更はスコープの肥大化というプロジェクト管理上の問題であり、スケジュールや計画に影響するためプロジェクトリスクに該当する。間接的にプロダクトリスクを招くこともあるが、本質的にはプロジェクトリスクである。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Mục tiêu tổng thể mà kiểm thử dựa trên rủi ro hướng tới khi hệ thống được phát hành là gì?",
      "en": "What overall goal does risk-based testing aim for by the time the system is released?",
      "ja": "システムがリリースされる時点で、リスクベーステストが目指す全体的な目標は何か。"
    },
    "options": [
      {
        "vi": "Đảm bảo 100% mã nguồn được thực thi qua kiểm thử tự động",
        "en": "Ensure 100% of the source code is executed through automated testing",
        "ja": "ソースコードの100%が自動テストによって実行されることを保証する"
      },
      {
        "vi": "Đảm bảo tất cả các bên liên quan đồng ý với mọi quyết định thiết kế",
        "en": "Ensure all stakeholders agree with every design decision",
        "ja": "すべての関係者があらゆる設計上の意思決定に同意することを保証する"
      },
      {
        "vi": "Giảm mức rủi ro sản phẩm tồn dư xuống mức có thể chấp nhận được trước khi phát hành",
        "en": "Reduce the residual product risk to an acceptable level before release",
        "ja": "リリース前に残存するプロダクトリスクを許容できるレベルまで低減する"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu viết tài liệu kiểm thử",
        "en": "Completely eliminate the need to write test documentation",
        "ja": "テスト文書を作成する必要性を完全になくす"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Risk-based testing hướng tới việc tối ưu hóa nguồn lực kiểm thử để giảm rủi ro sản phẩm tồn dư xuống mức các bên liên quan chấp nhận được khi hệ thống được phát hành.",
      "en": "Risk-based testing aims to optimize testing resources to bring residual product risk down to a level acceptable to stakeholders by the time the system is released.",
      "ja": "リスクベーステストは、システムがリリースされる時点で残存するプロダクトリスクを関係者が受け入れられるレベルまで下げるために、テストリソースを最適化することを目指す。"
    }
  },
  {
    "lvl": "istqb-foundation",
    "q": {
      "vi": "Một defect report chất lượng cao BẮT BUỘC phải có yếu tố nào sau đây để người khác có thể tái hiện lỗi?",
      "en": "Which element must a high-quality defect report include so others can reproduce the bug?",
      "ja": "高品質な不具合報告書には、他者が不具合を再現できるようにするために必ず何を含める必要があるか。"
    },
    "options": [
      {
        "vi": "Tên của lập trình viên mà tester nghi ngờ gây ra lỗi",
        "en": "The name of the developer the tester suspects caused the bug",
        "ja": "不具合を起こしたとテスターが疑う開発者の氏名"
      },
      {
        "vi": "Cảm nhận cá nhân của tester về chất lượng sản phẩm",
        "en": "The tester's personal opinion about product quality",
        "ja": "製品品質に対するテスターの個人的な感想"
      },
      {
        "vi": "Danh sách toàn bộ test case đã thực hiện trong dự án",
        "en": "A list of every test case executed in the project",
        "ja": "プロジェクトで実行した全テストケースの一覧"
      },
      {
        "vi": "Các bước thực hiện chi tiết theo thứ tự (steps to reproduce)",
        "en": "Detailed, ordered steps to reproduce",
        "ja": "順序立てた詳細な再現手順"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các bước tái hiện rõ ràng, cụ thể giúp người nhận (lập trình viên) thực hiện lại được lỗi để xác nhận và sửa; đây là thành phần cốt lõi của một báo cáo lỗi tốt.",
      "en": "Clear, specific reproduction steps let the recipient (developer) reliably reproduce the issue to confirm and fix it, making them a core part of a good defect report.",
      "ja": "明確で具体的な再現手順があれば、受け取った開発者が不具合を確実に再現し確認・修正できるため、これは良い不具合報告書の中核要素である。"
    }
  }
];
