// ============================================================================
// ISTQB EXT10 — Expert bổ sung (đạt 400) — 215 câu (auto-gen, đã khử trùng theo prompt.vi).
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật). answer dist: {"0":54,"1":54,"2":54,"3":53}
// ============================================================================
export const DATA = [
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh quản lý kiểm thử cấp tổ chức, 'test governance' được định nghĩa chính xác nhất là gì?",
      "en": "In the context of organizational-level test management, which is the most accurate definition of 'test governance'?",
      "ja": "組織レベルのテスト管理の文脈において、「テストガバナンス」の最も正確な定義はどれですか。"
    },
    "options": [
      {
        "vi": "Hệ thống các cơ chế chỉ đạo, kiểm soát và giám sát để đảm bảo hoạt động kiểm thử tuân thủ chính sách, mục tiêu và quy định của tổ chức",
        "en": "A system of mechanisms for directing, controlling, and monitoring to ensure testing activities comply with organizational policy, objectives, and regulations",
        "ja": "組織のポリシー、目標、規制にテスト活動が準拠することを保証するための、指示・統制・監視の仕組み体系"
      },
      {
        "vi": "Tập hợp các kỹ thuật kiểm thử kỹ thuật số dùng để tự động hóa quy trình kiểm thử hồi quy",
        "en": "A set of digital testing techniques used to automate the regression testing process",
        "ja": "回帰テストのプロセスを自動化するためのデジタルテスト技術の集合"
      },
      {
        "vi": "Quy trình lập lịch thực thi test case cho từng sprint trong dự án Agile",
        "en": "The process of scheduling test case execution for each sprint in an Agile project",
        "ja": "アジャイルプロジェクトの各スプリントでテストケースの実行スケジュールを立てるプロセス"
      },
      {
        "vi": "Bộ công cụ đo lường hiệu năng hệ thống dưới tải cao",
        "en": "A toolset for measuring system performance under high load",
        "ja": "高負荷下でのシステム性能を測定するツール群"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test governance tập trung vào cơ chế chỉ đạo/kiểm soát/giám sát để hoạt động kiểm thử phù hợp chính sách và mục tiêu tổ chức, không phải kỹ thuật cụ thể hay công cụ.",
      "en": "Test governance is centered on directing/controlling/monitoring mechanisms ensuring testing aligns with organizational policy and objectives, not on specific techniques or tools.",
      "ja": "テストガバナンスは、テスト活動が組織のポリシーと目標に沿うようにする指示・統制・監視の仕組みに焦点を当てており、特定の技術やツールを指すものではありません。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một tổ chức lớn, ai thường là người có thẩm quyền phê duyệt và ban hành 'test policy' ở cấp cao nhất?",
      "en": "In a large organization, who typically has the authority to approve and issue the top-level 'test policy'?",
      "ja": "大規模な組織において、最上位の「テストポリシー」を承認し発行する権限を持つのは通常誰ですか。"
    },
    "options": [
      {
        "vi": "Test Analyst của từng dự án",
        "en": "A project's Test Analyst",
        "ja": "各プロジェクトのテストアナリスト"
      },
      {
        "vi": "Ban lãnh đạo cấp cao (senior management) hoặc Head of Testing được ủy quyền",
        "en": "Senior management or an authorized Head of Testing",
        "ja": "経営陣、または権限を委譲されたテスト責任者(Head of Testing)"
      },
      {
        "vi": "Nhà cung cấp công cụ kiểm thử tự động",
        "en": "The test automation tool vendor",
        "ja": "テスト自動化ツールのベンダー"
      },
      {
        "vi": "Khách hàng cuối sử dụng sản phẩm",
        "en": "The end customer using the product",
        "ja": "製品を使用する最終顧客"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test policy là tài liệu cấp tổ chức nên cần được phê duyệt bởi lãnh đạo cấp cao hoặc người được ủy quyền quản lý kiểm thử toàn tổ chức.",
      "en": "Since the test policy is an organizational-level document, it must be approved by senior leadership or someone authorized to manage testing across the organization.",
      "ja": "テストポリシーは組織レベルの文書であるため、組織全体のテストを統括する経営陣または権限を委譲された責任者によって承認される必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Đặc điểm nào phân biệt rõ nhất 'analytical test strategy' với 'methodical test strategy' ở cấp tổ chức?",
      "en": "Which characteristic most clearly distinguishes an 'analytical test strategy' from a 'methodical test strategy' at the organizational level?",
      "ja": "組織レベルにおいて、「分析的テスト戦略(analytical)」と「方法論的テスト戦略(methodical)」を最も明確に区別する特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Analytical không cần tài liệu; methodical bắt buộc phải có tài liệu ISO",
        "en": "Analytical requires no documentation; methodical mandates ISO documentation",
        "ja": "分析的戦略は文書化が不要で、方法論的戦略はISO文書化が必須である"
      },
      {
        "vi": "Analytical chỉ dùng cho kiểm thử tự động; methodical chỉ dùng cho kiểm thử thủ công",
        "en": "Analytical is only for automated testing; methodical is only for manual testing",
        "ja": "分析的戦略は自動テストのみに使われ、方法論的戦略は手動テストのみに使われる"
      },
      {
        "vi": "Analytical dựa trên phân tích hình thức (vd rủi ro, yêu cầu) để xác định điều kiện kiểm thử; methodical dựa trên cách tiếp cận có cấu trúc được xác định trước (vd checklist, taxonomy lỗi chuẩn)",
        "en": "Analytical strategies use formal analysis (e.g., risk, requirements) to determine test conditions; methodical strategies rely on a predefined structured approach (e.g., checklists, standard defect taxonomies)",
        "ja": "分析的戦略はリスクや要求仕様などの形式的分析に基づいてテスト条件を決定し、方法論的戦略はチェックリストや標準的な欠陥分類など、あらかじめ定められた構造的アプローチに基づく"
      },
      {
        "vi": "Analytical áp dụng cho phần cứng; methodical áp dụng cho phần mềm",
        "en": "Analytical applies to hardware; methodical applies to software",
        "ja": "分析的戦略はハードウェアに、方法論的戦略はソフトウェアに適用される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Analytical strategy dựa trên phân tích hình thức như risk-based hay requirement-based; methodical dựa trên phương pháp có cấu trúc trước như checklist chuẩn hay quality characteristic.",
      "en": "Analytical strategies rely on formal analysis such as risk-based or requirement-based approaches; methodical strategies rely on a predefined structured method such as standard checklists or quality characteristics.",
      "ja": "分析的戦略はリスクベースや要求ベースなど形式的な分析に基づき、方法論的戦略はチェックリストや品質特性など事前に定義された構造的アプローチに基づいています。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "So với 'proactive test strategy', 'reactive test strategy' ở cấp tổ chức có đặc trưng gì?",
      "en": "Compared to a 'proactive test strategy', what characterizes a 'reactive test strategy' at the organizational level?",
      "ja": "組織レベルにおいて、「プロアクティブ(proactive)テスト戦略」と比較した場合、「リアクティブ(reactive)テスト戦略」の特徴は何ですか。"
    },
    "options": [
      {
        "vi": "Thiết kế test case được thực hiện càng sớm càng tốt ngay khi có yêu cầu",
        "en": "Test design is performed as early as possible once requirements are available",
        "ja": "要求が明らかになり次第、できるだけ早くテスト設計を行う"
      },
      {
        "vi": "Bắt buộc dùng test-driven development",
        "en": "It requires test-driven development",
        "ja": "テスト駆動開発を必須とする"
      },
      {
        "vi": "Luôn áp dụng mô hình V-model nghiêm ngặt",
        "en": "It always mandates strict adherence to the V-model",
        "ja": "常に厳格なVモデルの遵守を義務付ける"
      },
      {
        "vi": "Việc thiết kế và triển khai kiểm thử chỉ bắt đầu sau khi phần mềm hoặc bản build thực tế đã sẵn sàng, phản ứng lại với hệ thống thực tế",
        "en": "Test design and execution begin only after the actual software or build is available, reacting to the real system",
        "ja": "実際のソフトウェアやビルドが利用可能になった後で初めてテスト設計・実行を開始し、実際のシステムに反応する形で進める"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Reactive strategy phản ứng dựa trên hệ thống thực tế đã có, khác với proactive chủ động thiết kế test sớm dựa trên yêu cầu/rủi ro.",
      "en": "Reactive strategy responds based on the already-existing real system, unlike proactive strategy which actively designs tests early based on requirements/risk.",
      "ja": "リアクティブ戦略は既に存在する実際のシステムに基づいて反応的に進められる点が、要求やリスクに基づいて早期にテストを設計するプロアクティブ戦略と異なります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức bắt buộc phải tuân thủ DO-178C khi phát triển phần mềm hàng không nên áp dụng loại chiến lược kiểm thử nào?",
      "en": "An organization required to comply with DO-178C for aviation software development should adopt which type of test strategy?",
      "ja": "航空業界向けソフトウェア開発でDO-178Cへの準拠が義務付けられている組織は、どの種類のテスト戦略を採用すべきですか。"
    },
    "options": [
      {
        "vi": "Standard-compliant (hoặc process-compliant) strategy, dựa trên các quy định và tiêu chuẩn ngành bên ngoài",
        "en": "Standard-compliant (or process-compliant) strategy, based on external industry regulations and standards",
        "ja": "外部の業界規制や標準に基づく標準準拠型(standard-compliant)戦略"
      },
      {
        "vi": "Consultative strategy",
        "en": "Consultative strategy",
        "ja": "コンサルタティブ(consultative)戦略"
      },
      {
        "vi": "Regression-averse strategy",
        "en": "Regression-averse strategy",
        "ja": "リグレッション回避型(regression-averse)戦略"
      },
      {
        "vi": "Reactive strategy",
        "en": "Reactive strategy",
        "ja": "リアクティブ戦略"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khi có ràng buộc tuân thủ tiêu chuẩn ngành/luật định như DO-178C, chiến lược phù hợp là standard-compliant strategy, xây dựng dựa trên yêu cầu tiêu chuẩn đó.",
      "en": "When bound by industry/regulatory standards like DO-178C, the appropriate approach is a standard-compliant strategy, built around that standard's requirements.",
      "ja": "DO-178Cのような業界標準・法規制への準拠が求められる場合、その標準要件に基づいて構築される標準準拠型戦略が適切です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong chiến lược kiểm thử 'consultative' (hay 'directed'), nguồn định hướng chính cho hoạt động kiểm thử đến từ đâu?",
      "en": "In a 'consultative' (or 'directed') test strategy, where does the main direction for testing activities primarily come from?",
      "ja": "「コンサルタティブ(consultative)」または「ディレクティッド(directed)」テスト戦略において、テスト活動の主な方向性はどこから得られますか。"
    },
    "options": [
      {
        "vi": "Toàn bộ được tự động hóa bởi công cụ AI",
        "en": "Fully automated by AI tools",
        "ja": "AIツールによる完全自動化"
      },
      {
        "vi": "Chỉ dẫn và ý kiến từ các chuyên gia bên ngoài nhóm kiểm thử, ví dụ business stakeholder hoặc chuyên gia công nghệ",
        "en": "Guidance and opinions from experts outside the test team, such as business stakeholders or technology experts",
        "ja": "ビジネスステークホルダーや技術専門家など、テストチーム外の専門家からの助言や意見"
      },
      {
        "vi": "Chỉ dựa vào kinh nghiệm cá nhân của tester",
        "en": "Solely the personal experience of the tester",
        "ja": "テスト担当者個人の経験のみ"
      },
      {
        "vi": "Chỉ dựa vào tài liệu yêu cầu kỹ thuật",
        "en": "Solely the technical requirements documentation",
        "ja": "技術要求仕様書のみ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Consultative/directed strategy lấy định hướng test chủ yếu từ lời khuyên, ý kiến của các bên liên quan hoặc chuyên gia ngoài nhóm test.",
      "en": "Consultative/directed strategy derives its main testing direction from advice and opinions of stakeholders or experts outside the test team.",
      "ja": "コンサルタティブ/ディレクティッド戦略は、テストチーム外の専門家やステークホルダーからの助言・意見を主な方向性の源とします。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Tổ chức phát hành phần mềm ngân hàng lõi với chu kỳ release rất thường xuyên và cực kỳ sợ lỗi hồi quy nên ưu tiên chiến lược nào?",
      "en": "An organization releasing core banking software very frequently and extremely averse to regression defects should prioritize which strategy?",
      "ja": "コアバンキングソフトウェアを非常に頻繁にリリースし、リグレッション欠陥を極度に嫌う組織はどの戦略を優先すべきですか。"
    },
    "options": [
      {
        "vi": "Consultative strategy",
        "en": "Consultative strategy",
        "ja": "コンサルタティブ戦略"
      },
      {
        "vi": "Reactive strategy",
        "en": "Reactive strategy",
        "ja": "リアクティブ戦略"
      },
      {
        "vi": "Regression-averse strategy, tập trung mạnh vào tự động hóa hồi quy và khả năng lặp lại kiểm thử",
        "en": "Regression-averse strategy, with strong emphasis on regression automation and repeatable testing",
        "ja": "リグレッション自動化と再現可能なテストを重視する、リグレッション回避型戦略"
      },
      {
        "vi": "Analytical strategy thuần túy dựa trên rủi ro nghiệp vụ mới",
        "en": "Purely analytical strategy based only on new business risk",
        "ja": "新規ビジネスリスクのみに基づく純粋な分析的戦略"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Regression-averse strategy đặt trọng tâm vào việc phòng tránh lỗi hồi quy, thường thông qua tự động hóa mạnh và bộ test có thể lặp lại.",
      "en": "Regression-averse strategy focuses on preventing regression defects, typically through strong automation and a repeatable test set.",
      "ja": "リグレッション回避型戦略は、強力な自動化と再現可能なテストセットを通じてリグレッション欠陥の防止に重点を置きます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một khung (framework) test governance hoàn chỉnh ở cấp tổ chức KHÔNG nhất thiết phải bao gồm thành phần nào sau đây?",
      "en": "A complete organizational-level test governance framework does NOT necessarily need to include which of the following?",
      "ja": "組織レベルの完全なテストガバナンスフレームワークに、必ずしも含める必要がないものはどれですか。"
    },
    "options": [
      {
        "vi": "Cơ chế thiết lập mục tiêu và định hướng kiểm thử phù hợp với mục tiêu tổ chức",
        "en": "A mechanism to set testing objectives and direction aligned with organizational goals",
        "ja": "組織目標に沿ったテストの目的と方向性を設定する仕組み"
      },
      {
        "vi": "Cơ chế đo lường, giám sát và báo cáo hiệu quả kiểm thử",
        "en": "A mechanism to measure, monitor, and report testing effectiveness",
        "ja": "テストの有効性を測定・監視・報告する仕組み"
      },
      {
        "vi": "Cơ chế đảm bảo tuân thủ giữa test policy, chiến lược và thực thi",
        "en": "A mechanism to ensure compliance among test policy, strategy, and execution",
        "ja": "テストポリシー、戦略、実行の間の整合性を確保する仕組み"
      },
      {
        "vi": "Mã nguồn chi tiết của từng automation script cho tất cả dự án",
        "en": "Detailed source code of every automation script for all projects",
        "ja": "全プロジェクトの自動化スクリプトの詳細なソースコード"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Governance framework tập trung vào định hướng, giám sát, tuân thủ ở tầm tổ chức, không đi sâu vào chi tiết kỹ thuật như mã nguồn script cụ thể của từng dự án.",
      "en": "A governance framework focuses on direction, oversight, and compliance at the organizational level, not on technical details like specific project automation script source code.",
      "ja": "ガバナンスフレームワークは組織レベルでの方向付け・監視・整合性確保に焦点を当てており、各プロジェクトの自動化スクリプトのような技術的詳細までは扱いません。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Tại sao test strategy cấp tổ chức cần được xây dựng gắn kết chặt chẽ với mục tiêu kinh doanh (business objectives)?",
      "en": "Why must an organizational-level test strategy be closely aligned with business objectives?",
      "ja": "なぜ組織レベルのテスト戦略はビジネス目標と密接に整合させる必要があるのですか。"
    },
    "options": [
      {
        "vi": "Để đảm bảo nguồn lực kiểm thử được phân bổ ưu tiên đúng nơi tạo giá trị và giảm thiểu rủi ro quan trọng nhất với doanh nghiệp",
        "en": "To ensure testing resources are prioritized where they create the most value and mitigate the risks most critical to the business",
        "ja": "テストリソースが最も価値を生み、事業にとって最も重要なリスクを軽減する箇所に優先的に配分されるようにするため"
      },
      {
        "vi": "Vì luật pháp yêu cầu mọi công ty đều phải công bố test strategy công khai",
        "en": "Because the law requires every company to publicly disclose its test strategy",
        "ja": "すべての企業がテスト戦略を公開することが法律で義務付けられているため"
      },
      {
        "vi": "Vì công cụ kiểm thử tự động chỉ hoạt động khi có sự gắn kết này",
        "en": "Because automation tools only work when this alignment exists",
        "ja": "この整合性がなければ自動化ツールが機能しないため"
      },
      {
        "vi": "Để tránh phải viết test case chi tiết ở cấp dự án",
        "en": "To avoid having to write detailed test cases at the project level",
        "ja": "プロジェクトレベルで詳細なテストケースを書く必要をなくすため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Gắn kết với mục tiêu kinh doanh giúp tối ưu phân bổ nguồn lực kiểm thử vào các rủi ro và giá trị quan trọng nhất đối với tổ chức.",
      "en": "Alignment with business objectives helps optimize the allocation of testing resources toward the risks and value most important to the organization.",
      "ja": "ビジネス目標との整合により、テストリソースを組織にとって最も価値が高くリスクが重大な領域に優先配分できます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi áp dụng risk-based testing ở cấp tổ chức (không chỉ một dự án), thách thức đặc thù nào thường phát sinh?",
      "en": "When applying risk-based testing at the organizational level (not just a single project), what specific challenge typically arises?",
      "ja": "組織レベル(単一プロジェクトだけでなく)でリスクベースドテストを適用する際、特有の課題として何が生じやすいですか。"
    },
    "options": [
      {
        "vi": "Không có thách thức nào vì rủi ro dự án và rủi ro tổ chức luôn giống hệt nhau",
        "en": "No challenge arises because project risk and organizational risk are always identical",
        "ja": "プロジェクトリスクと組織リスクは常に同一なので課題は生じない"
      },
      {
        "vi": "Cần thiết lập một khung đánh giá rủi ro thống nhất, có thể so sánh được giữa nhiều dự án/sản phẩm khác nhau",
        "en": "The need to establish a unified, comparable risk assessment framework across multiple different projects/products",
        "ja": "複数の異なるプロジェクト・製品間で比較可能な、統一されたリスク評価の枠組みを確立する必要がある"
      },
      {
        "vi": "Chỉ áp dụng được cho phần mềm nhúng",
        "en": "It can only be applied to embedded software",
        "ja": "組み込みソフトウェアにしか適用できない"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu kiểm thử hồi quy",
        "en": "It completely eliminates the need for regression testing",
        "ja": "リグレッションテストの必要性が完全になくなる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ở cấp tổ chức, thách thức là cần một khung tiêu chí rủi ro nhất quán để so sánh và ưu tiên nguồn lực giữa nhiều dự án khác nhau, chứ không chỉ trong một dự án đơn lẻ.",
      "en": "At the organizational level, the challenge is needing a consistent risk criteria framework to compare and prioritize resources across multiple different projects, not just within one.",
      "ja": "組織レベルでは、複数のプロジェクト間でリソースの優先順位付けを比較できるよう、一貫したリスク評価基準の枠組みが必要になります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một cuộc audit tuân thủ (compliance audit), test governance đóng vai trò gì?",
      "en": "In a compliance audit, what role does test governance play?",
      "ja": "コンプライアンス監査において、テストガバナンスはどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Chỉ liên quan đến việc lưu trữ mã nguồn phần mềm",
        "en": "Only relates to storing software source code",
        "ja": "ソフトウェアのソースコード保管にのみ関係する"
      },
      {
        "vi": "Thay thế hoàn toàn vai trò của kiểm toán viên nội bộ",
        "en": "Completely replacing the role of internal auditors",
        "ja": "内部監査人の役割を完全に代替する"
      },
      {
        "vi": "Cung cấp bằng chứng có hệ thống rằng hoạt động kiểm thử được thực hiện nhất quán theo policy, chiến lược và quy định đã đề ra",
        "en": "Providing systematic evidence that testing activities are consistently performed according to the established policy, strategy, and regulations",
        "ja": "テスト活動が定められたポリシー、戦略、規制に一貫して従って実施されていることを体系的に証明する"
      },
      {
        "vi": "Không có vai trò gì vì audit chỉ xem xét tài chính",
        "en": "Plays no role, since audits only examine finances",
        "ja": "監査は財務のみを対象とするため役割はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test governance cung cấp cơ chế và bằng chứng chứng minh hoạt động kiểm thử tuân thủ chính sách, chiến lược, quy định — điều mà audit compliance cần kiểm tra.",
      "en": "Test governance provides mechanisms and evidence showing testing complies with policy, strategy, and regulations — exactly what a compliance audit needs to verify.",
      "ja": "テストガバナンスは、テスト活動がポリシー・戦略・規制に準拠していることを示す仕組みと証拠を提供し、これはコンプライアンス監査で必要とされるものです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "So với mô hình tổ chức kiểm thử phân tán (decentralized, tester nằm trong từng team dự án), mô hình tập trung (centralized test team/COE) có ưu điểm chiến lược nào?",
      "en": "Compared to a decentralized test organization model (testers embedded in each project team), what strategic advantage does a centralized test team/Center of Excellence have?",
      "ja": "分散型テスト組織モデル(テスターが各プロジェクトチームに所属)と比較して、集中型テストチーム/センター・オブ・エクセレンス(COE)にはどのような戦略的利点がありますか。"
    },
    "options": [
      {
        "vi": "Luôn giảm chi phí kiểm thử về 0",
        "en": "It always reduces testing costs to zero",
        "ja": "テストコストを常にゼロにできる"
      },
      {
        "vi": "Chỉ phù hợp với dự án quy mô nhỏ dưới 5 người",
        "en": "It is only suitable for projects with fewer than 5 people",
        "ja": "5人未満の小規模プロジェクトにのみ適している"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu giao tiếp với nhóm phát triển",
        "en": "It eliminates the need to communicate with development teams entirely",
        "ja": "開発チームとのコミュニケーションが完全に不要になる"
      },
      {
        "vi": "Dễ dàng chuẩn hóa quy trình, công cụ, số liệu đo lường và chia sẻ kiến thức xuyên suốt toàn tổ chức",
        "en": "It makes it easier to standardize processes, tools, metrics, and to share knowledge across the whole organization",
        "ja": "組織全体でプロセス、ツール、測定指標を標準化しやすく、知識の共有もしやすい"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mô hình tập trung (Center of Excellence) giúp chuẩn hóa quy trình, công cụ và chỉ số đo lường kiểm thử, đồng thời thuận lợi cho chia sẻ kiến thức trên toàn tổ chức.",
      "en": "A centralized model (Center of Excellence) helps standardize testing processes, tools, and metrics, while facilitating organization-wide knowledge sharing.",
      "ja": "集中型モデル(センター・オブ・エクセレンス)は、組織全体でのプロセス・ツール・測定指標の標準化と知識共有を促進します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Ở cấp tổ chức, vai trò 'Head of Testing' (hoặc Test Director) khác biệt căn bản với 'Test Manager' cấp dự án ở điểm nào?",
      "en": "At the organizational level, how does the role of 'Head of Testing' (or Test Director) fundamentally differ from a project-level 'Test Manager'?",
      "ja": "組織レベルにおいて、「テスト責任者(Head of Testing、テストディレクター)」の役割は、プロジェクトレベルの「テストマネージャー」と根本的にどう異なりますか。"
    },
    "options": [
      {
        "vi": "Head of Testing chịu trách nhiệm định hướng chiến lược, policy và governance kiểm thử cho toàn tổ chức, trong khi Test Manager tập trung điều hành kiểm thử ở phạm vi một hoặc vài dự án",
        "en": "The Head of Testing is responsible for organization-wide strategic direction, policy, and governance, while the Test Manager focuses on running testing for one or a few projects",
        "ja": "テスト責任者は組織全体の戦略的方向性、ポリシー、ガバナンスを担い、テストマネージャーは一つまたは少数のプロジェクトのテスト運営に集中する"
      },
      {
        "vi": "Head of Testing chỉ viết test case chi tiết",
        "en": "The Head of Testing only writes detailed test cases",
        "ja": "テスト責任者は詳細なテストケースの作成のみを行う"
      },
      {
        "vi": "Hai vai trò này hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "The two roles are entirely identical, differing only in title",
        "ja": "両者は名称が違うだけで全く同じ役割である"
      },
      {
        "vi": "Head of Testing không cần hiểu biết về kỹ thuật kiểm thử",
        "en": "The Head of Testing does not need any technical testing knowledge",
        "ja": "テスト責任者にはテスト技術の知識は不要である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Head of Testing/Test Director hoạt động ở tầm chiến lược tổ chức (policy, governance), còn Test Manager vận hành kiểm thử ở phạm vi dự án cụ thể.",
      "en": "The Head of Testing/Test Director operates at the organizational strategic level (policy, governance), while the Test Manager runs testing at the scope of specific projects.",
      "ja": "テスト責任者/テストディレクターは組織全体の戦略レベル(ポリシー、ガバナンス)で活動し、テストマネージャーは特定プロジェクトの範囲でテストを運営します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thiết kế bộ chỉ số đo lường (metrics/KPI) kiểm thử ở cấp tổ chức, điều gì quan trọng nhất cần đảm bảo?",
      "en": "When designing organizational-level testing metrics/KPIs, what is most important to ensure?",
      "ja": "組織レベルのテスト測定指標(メトリクス/KPI)を設計する際、最も重要なのは何を確保することですか。"
    },
    "options": [
      {
        "vi": "Số lượng chỉ số càng nhiều càng tốt, không giới hạn",
        "en": "The more metrics, the better, with no limit",
        "ja": "指標は多ければ多いほど良く、上限はない"
      },
      {
        "vi": "Các chỉ số phải nhất quán, có thể so sánh được giữa các dự án và liên kết trực tiếp với mục tiêu chất lượng/kinh doanh của tổ chức",
        "en": "Metrics must be consistent, comparable across projects, and directly linked to the organization's quality/business objectives",
        "ja": "指標がプロジェクト間で一貫性を持ち比較可能であり、組織の品質・ビジネス目標と直接結びついていること"
      },
      {
        "vi": "Chỉ đo số lượng test case đã viết, không cần đo kết quả thực thi",
        "en": "Only measure the number of test cases written, not execution results",
        "ja": "作成したテストケース数のみを測定し、実行結果は測定しない"
      },
      {
        "vi": "Mỗi dự án tự chọn chỉ số hoàn toàn khác nhau, không cần thống nhất",
        "en": "Each project chooses entirely different metrics with no need for alignment",
        "ja": "各プロジェクトが全く異なる指標を統一せずに選ぶ"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ở cấp tổ chức, bộ metrics cần chuẩn hóa và có thể so sánh xuyên dự án, đồng thời phản ánh đúng mục tiêu chất lượng/kinh doanh thay vì chỉ đếm số lượng đơn thuần.",
      "en": "At the organizational level, metrics need to be standardized and comparable across projects while accurately reflecting quality/business objectives rather than mere counts.",
      "ja": "組織レベルでは、指標がプロジェクト横断で標準化・比較可能であり、単なる数量ではなく品質・ビジネス目標を正しく反映していることが重要です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Test policy của tổ chức nên được xem xét lại (review) khi nào là hợp lý nhất?",
      "en": "When is it most reasonable to review an organization's test policy?",
      "ja": "組織のテストポリシーを見直す(レビューする)のに最も適切なタイミングはいつですか。"
    },
    "options": [
      {
        "vi": "Không bao giờ cần xem lại sau khi ban hành lần đầu",
        "en": "Never, after its initial issuance",
        "ja": "最初に発行された後は二度と見直す必要はない"
      },
      {
        "vi": "Chỉ khi có lỗi sản xuất nghiêm trọng xảy ra",
        "en": "Only when a severe production defect occurs",
        "ja": "重大な本番障害が発生した場合のみ"
      },
      {
        "vi": "Định kỳ theo chu kỳ đã hoạch định và mỗi khi có thay đổi lớn về chiến lược kinh doanh, công nghệ hoặc quy định pháp lý",
        "en": "Periodically per a planned cycle, and whenever there are major changes in business strategy, technology, or regulations",
        "ja": "計画されたサイクルで定期的に、また事業戦略・技術・法規制に大きな変化があるたびに"
      },
      {
        "vi": "Mỗi ngày, cùng với daily stand-up",
        "en": "Every day, together with the daily stand-up",
        "ja": "デイリースタンドアップと合わせて毎日"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test policy cần được xem xét định kỳ và khi có thay đổi quan trọng về kinh doanh, công nghệ hay pháp lý để đảm bảo vẫn còn phù hợp.",
      "en": "The test policy needs periodic review and review upon significant business, technology, or legal changes to ensure it remains relevant.",
      "ja": "テストポリシーは計画的な周期での定期見直しに加え、事業・技術・法規制に重要な変化があった際にも見直し、適合性を維持する必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một phần công việc kiểm thử được thuê ngoài (outsource) cho nhà cung cấp bên thứ ba, test governance cấp tổ chức cần đặc biệt chú trọng điều gì?",
      "en": "When part of testing work is outsourced to a third-party vendor, what should organizational test governance especially focus on?",
      "ja": "テスト業務の一部を第三者ベンダーにアウトソースする場合、組織のテストガバナンスは特に何に注力すべきですか。"
    },
    "options": [
      {
        "vi": "Không cần giám sát gì vì nhà cung cấp tự chịu trách nhiệm hoàn toàn",
        "en": "No oversight is needed since the vendor is fully responsible",
        "ja": "ベンダーが全責任を負うため監視は不要"
      },
      {
        "vi": "Chuyển toàn bộ trách nhiệm pháp lý sang nhà cung cấp",
        "en": "Transferring all legal responsibility to the vendor",
        "ja": "法的責任をすべてベンダーに移転する"
      },
      {
        "vi": "Chỉ cần ký hợp đồng thương mại, không cần tiêu chí kỹ thuật",
        "en": "Only signing a commercial contract, without technical criteria",
        "ja": "技術基準を設けず商業契約のみ締結する"
      },
      {
        "vi": "Thiết lập cơ chế giám sát chất lượng, tiêu chí nghiệm thu và đảm bảo nhà cung cấp tuân thủ test policy/chiến lược của tổ chức",
        "en": "Establishing quality oversight mechanisms, acceptance criteria, and ensuring the vendor complies with the organization's test policy/strategy",
        "ja": "品質監視の仕組みと受け入れ基準を確立し、ベンダーが組織のテストポリシー・戦略に準拠することを保証する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Governance cần đảm bảo nhà cung cấp bên ngoài vẫn tuân thủ policy/chiến lược kiểm thử của tổ chức, có cơ chế giám sát chất lượng và tiêu chí nghiệm thu rõ ràng.",
      "en": "Governance must ensure the external vendor still complies with the organization's test policy/strategy, with clear quality oversight mechanisms and acceptance criteria.",
      "ja": "ガバナンスは、外部ベンダーが組織のポリシー・戦略に準拠するよう品質監視の仕組みと明確な受け入れ基準を確立する必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh áp dụng Agile ở quy mô lớn (scaled agile) trên nhiều đội nhóm, thách thức chính đối với test strategy cấp tổ chức là gì?",
      "en": "In the context of scaled agile across many teams, what is the main challenge for organizational-level test strategy?",
      "ja": "複数チームにまたがる大規模アジャイル(scaled agile)の文脈において、組織レベルのテスト戦略における主な課題は何ですか。"
    },
    "options": [
      {
        "vi": "Cân bằng giữa tính tự chủ của từng team (để linh hoạt) và sự nhất quán cần thiết ở cấp tổ chức (công cụ, tiêu chuẩn chất lượng, tích hợp kiểm thử liên đội)",
        "en": "Balancing each team's autonomy (for flexibility) with the consistency needed at the organizational level (tools, quality standards, cross-team test integration)",
        "ja": "各チームの自律性(柔軟性のため)と、組織レベルで必要な一貫性(ツール、品質基準、チーム横断のテスト統合)とのバランスを取ること"
      },
      {
        "vi": "Không còn cần test strategy vì Agile không cần tài liệu",
        "en": "There is no longer a need for test strategy since Agile does not require documentation",
        "ja": "アジャイルは文書化を必要としないためテスト戦略はもはや不要"
      },
      {
        "vi": "Chỉ cần một test case duy nhất cho toàn bộ hệ thống",
        "en": "Only one single test case is needed for the entire system",
        "ja": "システム全体に対してただ一つのテストケースがあれば十分"
      },
      {
        "vi": "Loại bỏ hoàn toàn kiểm thử thủ công trên mọi team",
        "en": "Eliminating manual testing entirely across all teams",
        "ja": "すべてのチームで手動テストを完全に廃止すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thách thức lớn nhất là dung hòa quyền tự chủ của từng nhóm Agile với nhu cầu nhất quán về tiêu chuẩn, công cụ và tích hợp kiểm thử xuyên suốt tổ chức.",
      "en": "The biggest challenge is reconciling each Agile team's autonomy with the need for consistent standards, tools, and testing integration across the organization.",
      "ja": "最大の課題は、各アジャイルチームの自律性と、組織全体で必要とされるツール・品質基準・テスト統合の一貫性とを両立させることです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Bước nào sau đây là quan trọng nhất khi xây dựng test strategy cấp tổ chức để đảm bảo tính khả thi và được chấp nhận rộng rãi?",
      "en": "Which step is most critical when building an organizational test strategy to ensure feasibility and broad acceptance?",
      "ja": "組織レベルのテスト戦略を、実現可能性と広範な受容性を確保して構築する際、最も重要なステップはどれですか。"
    },
    "options": [
      {
        "vi": "Chỉ nhóm kiểm thử tự soạn thảo mà không tham khảo ai khác",
        "en": "Only the test team drafts it without consulting anyone else",
        "ja": "テストチームのみが誰にも相談せず起草する"
      },
      {
        "vi": "Tham vấn và đạt được sự đồng thuận từ các bên liên quan chính (lãnh đạo, phát triển, vận hành, kinh doanh) trước khi ban hành",
        "en": "Consulting and gaining consensus from key stakeholders (leadership, development, operations, business) before issuance",
        "ja": "発行前に主要なステークホルダー(経営層、開発、運用、事業部門)と協議し合意を得る"
      },
      {
        "vi": "Sao chép nguyên văn chiến lược của một công ty khác trong ngành",
        "en": "Copying another company's strategy in the industry verbatim",
        "ja": "業界内の他社の戦略をそのままコピーする"
      },
      {
        "vi": "Ban hành ngay lập tức không cần thời gian góp ý",
        "en": "Issuing it immediately without any time for feedback",
        "ja": "フィードバックの時間を設けずに即座に発行する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Để chiến lược khả thi và được chấp nhận, cần tham vấn và đạt đồng thuận với các bên liên quan chủ chốt trước khi chính thức ban hành.",
      "en": "For the strategy to be feasible and accepted, consultation and consensus with key stakeholders is needed before formal issuance.",
      "ja": "戦略の実現可能性と受容性を確保するには、正式発行前に主要ステークホルダーと協議し合意を得ることが不可欠です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Test governance khác với project governance (quản trị dự án) tổng thể ở điểm nào?",
      "en": "How does test governance differ from overall project governance?",
      "ja": "テストガバナンスは、全体的なプロジェクトガバナンスとどのように異なりますか。"
    },
    "options": [
      {
        "vi": "Test governance rộng hơn và bao trùm toàn bộ hoạt động quản trị dự án",
        "en": "Test governance is broader and encompasses the entirety of project governance",
        "ja": "テストガバナンスの方が広範であり、プロジェクトガバナンス全体を包含する"
      },
      {
        "vi": "Hai khái niệm hoàn toàn giống nhau, dùng thay thế cho nhau tự do",
        "en": "The two concepts are completely identical and freely interchangeable",
        "ja": "両者は完全に同一であり、自由に置き換え可能な概念である"
      },
      {
        "vi": "Test governance là một thành phần chuyên biệt tập trung vào định hướng và kiểm soát hoạt động đảm bảo chất lượng/kiểm thử, nằm trong hoặc liên kết chặt với project/organizational governance rộng hơn",
        "en": "Test governance is a specialized component focused on directing and controlling testing/quality assurance activities, nested within or closely linked to broader project/organizational governance",
        "ja": "テストガバナンスは、テスト・品質保証活動の方向付けと統制に特化した構成要素であり、より広範なプロジェクト/組織ガバナンスの中に含まれる、または密接に結びついている"
      },
      {
        "vi": "Test governance chỉ áp dụng cho dự án waterfall, không áp dụng Agile",
        "en": "Test governance only applies to waterfall projects, not Agile",
        "ja": "テストガバナンスはウォーターフォールプロジェクトにのみ適用され、アジャイルには適用されない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test governance là một phần chuyên biệt, tập trung vào kiểm thử/chất lượng, thường lồng trong khung quản trị dự án hoặc tổ chức rộng hơn chứ không đồng nhất hay bao trùm nó.",
      "en": "Test governance is a specialized subset focused on testing/quality, typically nested within broader project or organizational governance rather than being identical to or encompassing it.",
      "ja": "テストガバナンスはテスト・品質に特化した専門領域であり、より広いプロジェクト・組織ガバナンスの枠内、または密接な連携の中に位置づけられます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Ở cấp tổ chức, việc lựa chọn và quản lý công cụ kiểm thử (test tool strategy) nên được thực hiện như thế nào để hiệu quả?",
      "en": "At the organizational level, how should the selection and management of testing tools (test tool strategy) be handled effectively?",
      "ja": "組織レベルにおいて、テストツールの選定・管理(テストツール戦略)を効果的に行うにはどうすべきですか。"
    },
    "options": [
      {
        "vi": "Mỗi dự án tự do mua bất kỳ công cụ nào mà không cần đánh giá tổng thể",
        "en": "Each project freely purchases any tool without overall evaluation",
        "ja": "各プロジェクトが全体的な評価なしに自由に任意のツールを購入する"
      },
      {
        "vi": "Thay đổi công cụ chính mỗi tháng một lần để thử nghiệm",
        "en": "Changing the primary tool every month for experimentation",
        "ja": "実験のため主要ツールを毎月変更する"
      },
      {
        "vi": "Không bao giờ sử dụng công cụ thương mại, chỉ dùng công cụ tự viết",
        "en": "Never using commercial tools, only self-developed ones",
        "ja": "商用ツールを一切使わず、自社開発ツールのみを使用する"
      },
      {
        "vi": "Đánh giá, chuẩn hóa và quản lý danh mục công cụ ở cấp tổ chức nhằm tối ưu chi phí, khả năng tích hợp và chia sẻ kỹ năng giữa các dự án",
        "en": "Evaluating, standardizing, and managing the tool portfolio at the organizational level to optimize cost, integration capability, and skill sharing across projects",
        "ja": "組織レベルでツールポートフォリオを評価・標準化・管理し、コスト最適化、統合性、プロジェクト間のスキル共有を図る"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Quản lý công cụ ở cấp tổ chức giúp tối ưu chi phí license, khả năng tích hợp dữ liệu và tái sử dụng kỹ năng nhân sự giữa nhiều dự án.",
      "en": "Managing tools at the organizational level optimizes license costs, data integration capability, and reuse of personnel skills across projects.",
      "ja": "組織レベルでのツール管理により、ライセンスコストの最適化、データ統合性の向上、プロジェクト間での人材スキルの再利用が可能になります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Thành phần 'mission statement' (tuyên bố sứ mệnh) trong một test policy thường thể hiện nội dung gì?",
      "en": "What content does the 'mission statement' component of a test policy typically express?",
      "ja": "テストポリシーにおける「ミッションステートメント」という構成要素は、通常どのような内容を表しますか。"
    },
    "options": [
      {
        "vi": "Mô tả giá trị và mục đích cốt lõi mà chức năng kiểm thử mang lại cho tổ chức",
        "en": "A description of the core value and purpose that the testing function brings to the organization",
        "ja": "テスト機能が組織にもたらす中核的な価値と目的の説明"
      },
      {
        "vi": "Danh sách chi tiết các test case cụ thể sẽ chạy trong quý tới",
        "en": "A detailed list of specific test cases to run next quarter",
        "ja": "来四半期に実行する具体的なテストケースの詳細リスト"
      },
      {
        "vi": "Bảng lương của đội ngũ kiểm thử",
        "en": "The salary structure of the test team",
        "ja": "テストチームの給与体系"
      },
      {
        "vi": "Lịch trình release chi tiết của từng sản phẩm",
        "en": "The detailed release schedule of each product",
        "ja": "各製品の詳細なリリーススケジュール"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mission statement trong test policy nêu rõ mục đích và giá trị cốt lõi mà hoạt động kiểm thử đóng góp cho tổ chức, mang tính định hướng chứ không phải chi tiết vận hành.",
      "en": "The mission statement in a test policy states the purpose and core value that testing contributes to the organization, being directional rather than operational detail.",
      "ja": "ミッションステートメントは、テスト活動が組織にもたらす目的と中核的価値を示すものであり、運用上の詳細ではなく方向性を表します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong khung test governance, 'escalation path' (đường leo thang) được thiết lập nhằm mục đích gì?",
      "en": "In a test governance framework, what is the purpose of establishing an 'escalation path'?",
      "ja": "テストガバナンスフレームワークにおいて、「エスカレーションパス(escalation path)」を設ける目的は何ですか。"
    },
    "options": [
      {
        "vi": "Tăng lương cho tester theo cấp bậc kinh nghiệm",
        "en": "To increase testers' salaries based on seniority",
        "ja": "経験年数に応じてテスト担当者の給与を上げるため"
      },
      {
        "vi": "Xác định rõ cách thức và cấp bậc mà các vấn đề, xung đột hoặc rủi ro kiểm thử nghiêm trọng được báo cáo lên cấp quản lý phù hợp để ra quyết định kịp thời",
        "en": "To clearly define how and to which management level serious testing issues, conflicts, or risks are reported for timely decision-making",
        "ja": "重大なテスト上の問題、対立、リスクを、適切な管理層にタイムリーな意思決定のために報告する方法と経路を明確に定めるため"
      },
      {
        "vi": "Lên lịch chạy test tự động vào ban đêm",
        "en": "To schedule automated test runs at night",
        "ja": "夜間の自動テスト実行をスケジューリングするため"
      },
      {
        "vi": "Quản lý version control của mã nguồn kiểm thử",
        "en": "To manage version control of test source code",
        "ja": "テストソースコードのバージョン管理を行うため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Escalation path xác định cơ chế và cấp độ báo cáo để các vấn đề/rủi ro nghiêm trọng được đưa lên đúng người có thẩm quyền quyết định kịp thời.",
      "en": "The escalation path defines the mechanism and reporting level so that serious issues/risks are timely raised to the appropriate decision-making authority.",
      "ja": "エスカレーションパスは、重大な問題やリスクが適切な意思決定権限を持つ層にタイムリーに報告される仕組みと経路を明確にするものです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong cấu trúc phân cấp tài liệu kiểm thử, mối quan hệ đúng giữa test policy, (organizational) test strategy và test plan cấp dự án là gì?",
      "en": "In the hierarchy of testing documentation, what is the correct relationship among test policy, (organizational) test strategy, and project-level test plan?",
      "ja": "テスト文書の階層構造において、テストポリシー、(組織の)テスト戦略、プロジェクトレベルのテスト計画の正しい関係はどれですか。"
    },
    "options": [
      {
        "vi": "Test plan quyết định nội dung test policy",
        "en": "The test plan determines the content of the test policy",
        "ja": "テスト計画がテストポリシーの内容を決定する"
      },
      {
        "vi": "Cả ba tài liệu độc lập, không liên quan đến nhau",
        "en": "All three documents are independent and unrelated to each other",
        "ja": "三つの文書は互いに独立しており無関係である"
      },
      {
        "vi": "Test policy nêu định hướng và nguyên tắc chung nhất ở tổ chức; test strategy cụ thể hóa cách tiếp cận chung; test plan cấp dự án áp dụng và điều chỉnh chiến lược đó cho bối cảnh dự án cụ thể",
        "en": "The test policy states the organization's most general direction and principles; the test strategy elaborates the general approach; the project test plan applies and adapts that strategy to a specific project context",
        "ja": "テストポリシーは組織の最も一般的な方向性と原則を示し、テスト戦略はその一般的アプローチを具体化し、プロジェクトのテスト計画はその戦略を特定プロジェクトの状況に適用・調整する"
      },
      {
        "vi": "Test strategy chỉ được viết sau khi dự án đã kết thúc",
        "en": "The test strategy is only written after the project has ended",
        "ja": "テスト戦略はプロジェクト終了後にのみ作成される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Cấu trúc phân cấp chuẩn: test policy (định hướng chung nhất) → test strategy (cụ thể hóa cách tiếp cận) → test plan dự án (áp dụng thực tế cho từng dự án).",
      "en": "The standard hierarchy is: test policy (most general direction) → test strategy (elaborated approach) → project test plan (practical application per project).",
      "ja": "標準的な階層は、テストポリシー(最も一般的な方向性)→テスト戦略(アプローチの具体化)→プロジェクトのテスト計画(各プロジェクトへの実践的適用)という順序です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tổ chức muốn thay đổi đáng kể test policy hiện hành, hoạt động quản lý thay đổi (change management) nào là cần thiết?",
      "en": "When an organization wants to significantly change its existing test policy, what change management activity is necessary?",
      "ja": "組織が既存のテストポリシーを大幅に変更したい場合、どのような変更管理(change management)活動が必要ですか。"
    },
    "options": [
      {
        "vi": "Thay đổi ngay lập tức mà không thông báo cho ai",
        "en": "Change it immediately without notifying anyone",
        "ja": "誰にも通知せず即座に変更する"
      },
      {
        "vi": "Không cần thay đổi test strategy đi kèm dù policy đã đổi",
        "en": "No need to change the accompanying test strategy even though the policy has changed",
        "ja": "ポリシーが変わってもそれに伴うテスト戦略を変更する必要はない"
      },
      {
        "vi": "Chỉ cần gửi email thông báo sau khi đã áp dụng xong ba tháng",
        "en": "Just send an email notification three months after it has already been applied",
        "ja": "すでに適用してから3か月後にメールで通知するだけでよい"
      },
      {
        "vi": "Đánh giá tác động, truyền thông rõ ràng đến các bên liên quan, và có kế hoạch chuyển đổi/đào tạo phù hợp trước khi áp dụng chính thức",
        "en": "Assess the impact, communicate clearly to stakeholders, and have an appropriate transition/training plan before formal adoption",
        "ja": "影響を評価し、ステークホルダーに明確に伝達し、正式適用前に適切な移行・トレーニング計画を用意する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thay đổi policy cấp tổ chức cần đánh giá tác động, truyền thông và kế hoạch chuyển đổi/đào tạo bài bản để đảm bảo áp dụng hiệu quả và nhất quán.",
      "en": "Organizational-level policy changes need impact assessment, clear communication, and a proper transition/training plan for effective and consistent adoption.",
      "ja": "組織レベルのポリシー変更には、影響評価、明確なステークホルダーへの伝達、適切な移行・トレーニング計画が、効果的かつ一貫した適用のために必要です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nhận định nào sau đây về test governance là ĐÚNG?",
      "en": "Which of the following statements about test governance is TRUE?",
      "ja": "テストガバナンスに関する次の記述のうち、正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Test governance hiệu quả đòi hỏi sự cam kết và tham gia liên tục của lãnh đạo cấp cao, không chỉ của nhóm kiểm thử",
        "en": "Effective test governance requires continuous commitment and involvement from senior leadership, not just the test team",
        "ja": "効果的なテストガバナンスには、テストチームだけでなく経営陣の継続的なコミットメントと関与が必要である"
      },
      {
        "vi": "Test governance chỉ cần thiết lập một lần và không bao giờ cần điều chỉnh",
        "en": "Test governance only needs to be established once and never needs adjustment",
        "ja": "テストガバナンスは一度確立すれば二度と調整する必要がない"
      },
      {
        "vi": "Test governance là trách nhiệm duy nhất của một cá nhân tester và không liên quan đến lãnh đạo tổ chức",
        "en": "Test governance is the sole responsibility of an individual tester and is unrelated to organizational leadership",
        "ja": "テストガバナンスは一人のテスト担当者だけの責任であり、組織の経営層とは無関係である"
      },
      {
        "vi": "Test governance chỉ áp dụng cho các tổ chức có chứng nhận CMMI",
        "en": "Test governance only applies to organizations with CMMI certification",
        "ja": "テストガバナンスはCMMI認証を持つ組織にのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test governance hiệu quả cần sự cam kết liên tục từ lãnh đạo cấp cao bên cạnh nhóm kiểm thử, không phải trách nhiệm của riêng một cá nhân hay chỉ thiết lập một lần.",
      "en": "Effective test governance requires ongoing commitment from senior leadership alongside the test team, not the responsibility of one individual or a one-time setup.",
      "ja": "効果的なテストガバナンスには、テストチームに加えて経営陣の継続的な関与が必要であり、一人の責任や一度きりの設定で完結するものではありません。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nhận định nào sau đây về việc lựa chọn test strategy cấp tổ chức là ĐÚNG?",
      "en": "Which of the following statements about selecting an organizational-level test strategy is TRUE?",
      "ja": "組織レベルのテスト戦略の選択に関する次の記述のうち、正しいものはどれですか。"
    },
    "options": [
      {
        "vi": "Một chiến lược kiểm thử duy nhất luôn phù hợp với mọi tổ chức bất kể ngành nghề hay mức độ rủi ro",
        "en": "A single test strategy is always suitable for every organization regardless of industry or risk level",
        "ja": "業界やリスクレベルにかかわらず、単一のテスト戦略が常にすべての組織に適している"
      },
      {
        "vi": "Việc lựa chọn hoặc kết hợp các loại chiến lược (risk-based, standard-compliant, regression-averse...) cần dựa trên bối cảnh cụ thể của tổ chức như ngành nghề, quy định, khẩu vị rủi ro và văn hóa",
        "en": "Selecting or combining strategy types (risk-based, standard-compliant, regression-averse, etc.) must be based on the organization's specific context, such as industry, regulations, risk appetite, and culture",
        "ja": "戦略の種類(リスクベース、標準準拠、リグレッション回避型など)の選択や組み合わせは、業界、規制、リスク許容度、文化といった組織固有の状況に基づいて決定すべきである"
      },
      {
        "vi": "Chiến lược kiểm thử không cần xem xét đến quy định pháp luật của ngành",
        "en": "Test strategy does not need to consider industry regulations",
        "ja": "テスト戦略は業界規制を考慮する必要がない"
      },
      {
        "vi": "Chiến lược kiểm thử chỉ nên được chọn bởi nhà cung cấp công cụ tự động hóa",
        "en": "Test strategy should only be chosen by the test automation tool vendor",
        "ja": "テスト戦略は自動化ツールのベンダーのみが選ぶべきである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Không có một chiến lược 'một cỡ vừa cho tất cả'; việc lựa chọn hoặc phối hợp các loại chiến lược cần dựa trên bối cảnh riêng của từng tổ chức (ngành, quy định, khẩu vị rủi ro, văn hóa).",
      "en": "There is no one-size-fits-all strategy; selecting or combining strategy types must be based on each organization's specific context (industry, regulations, risk appetite, culture).",
      "ja": "万能な戦略は存在せず、戦略の種類の選択や組み合わせは、業界、規制、リスク許容度、文化といった各組織固有の状況に基づいて決定する必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Chỉ số Tỷ lệ Phát hiện Lỗi (Defect Detection Percentage - DDP) trong một giai đoạn kiểm thử cụ thể được định nghĩa như thế nào và có ý nghĩa gì khi theo dõi theo thời gian?",
      "en": "How is the Defect Detection Percentage (DDP) for a specific test stage defined, and what does it signify when tracked over time?",
      "ja": "特定のテスト段階における欠陥検出率(Defect Detection Percentage, DDP)はどのように定義され、時系列で追跡した場合どのような意味を持つか。"
    },
    "options": [
      {
        "vi": "Tỷ lệ số lỗi được lập trình viên sửa đúng hạn cam kết",
        "en": "The ratio of defects fixed by developers within the committed deadline",
        "ja": "開発者が約束期限内に修正した欠陥の割合"
      },
      {
        "vi": "Tỷ lệ ca kiểm thử pass trên tổng số ca kiểm thử đã thực thi trong giai đoạn đó",
        "en": "The ratio of passed test cases to total executed test cases in that stage",
        "ja": "その段階で実行されたテストケースのうち合格した割合"
      },
      {
        "vi": "Tỷ lệ giữa số lỗi phát hiện được ở giai đoạn đó trên tổng số lỗi thực sự tồn tại (kể cả lỗi phát hiện sau này, bao gồm cả sau phát hành); theo dõi theo thời gian giúp đánh giá hiệu quả của giai đoạn kiểm thử đó có đang cải thiện hay suy giảm",
        "en": "The ratio of defects found at that stage to the total number of defects that actually exist (including those found later, even post-release); tracking it over time reveals whether that test stage's effectiveness is improving or degrading",
        "ja": "その段階で検出された欠陥数を、実際に存在する欠陥総数(リリース後に発見されたものも含む)で割った比率であり、時系列で追跡することでその段階の有効性が改善しているか低下しているかを評価できる"
      },
      {
        "vi": "Tỷ lệ phần trăm mã nguồn được bao phủ bởi kịch bản kiểm thử tự động",
        "en": "The percentage of source code covered by automated test scripts",
        "ja": "自動テストスクリプトによってカバーされたソースコードの割合"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DDP so sánh số lỗi tìm được ở một giai đoạn với tổng số lỗi thực sự tồn tại; xu hướng DDP giảm dần qua các release là dấu hiệu cảnh báo cần cải tiến quy trình kiểm thử ở giai đoạn đó.",
      "en": "DDP compares defects found at a stage against the total defects that actually exist; a declining DDP trend across releases is a warning sign that the test process at that stage needs improvement.",
      "ja": "DDPはある段階で検出された欠陥数と実際に存在する欠陥総数を比較する指標であり、リリースを重ねるごとにDDPが低下傾向にある場合は、その段階のテストプロセス改善が必要な警告サインとなる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong hệ thống đo lường kiểm thử, chỉ số nào dưới đây đóng vai trò là \"leading indicator\" (chỉ báo sớm) giúp cảnh báo rủi ro chất lượng trước khi hậu quả xảy ra, thay vì chỉ ghi nhận hậu quả đã xảy ra?",
      "en": "In a test measurement system, which of the following acts as a leading indicator that warns of quality risk before consequences occur, rather than merely recording consequences that already happened?",
      "ja": "テスト測定システムにおいて、結果がすでに発生した後にそれを記録するのではなく、品質リスクを事前に警告する「先行指標(leading indicator)」として機能するのは次のうちどれか。"
    },
    "options": [
      {
        "vi": "Số lượng lỗi nghiêm trọng do khách hàng báo cáo sau khi phát hành",
        "en": "The number of critical defects reported by customers after release",
        "ja": "リリース後に顧客から報告された重大欠陥の件数"
      },
      {
        "vi": "Số lượng đánh giá tiêu cực của người dùng trên cửa hàng ứng dụng",
        "en": "The number of negative user reviews on the app store",
        "ja": "アプリストアにおけるユーザーの否定的レビュー件数"
      },
      {
        "vi": "Tổng chi phí hỗ trợ kỹ thuật phát sinh sau khi phát hành sản phẩm",
        "en": "The total technical support cost incurred after the product is released",
        "ja": "製品リリース後に発生した技術サポートの総コスト"
      },
      {
        "vi": "Tốc độ giảm dần rõ rệt của số lỗi mới phát hiện qua các vòng kiểm thử hồi quy liên tiếp trước khi phát hành, cho thấy sản phẩm đang ổn định dần",
        "en": "The clearly declining trend in newly found defects across successive regression test cycles before release, indicating the product is stabilizing",
        "ja": "リリース前の連続する回帰テストサイクルにおいて新規欠陥数が明確に減少していく傾向であり、製品が徐々に安定していることを示す"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Leading indicator dự báo rủi ro trước khi nó biểu hiện thành hậu quả; xu hướng số lỗi mới phát hiện giảm dần qua các vòng hồi quy là dấu hiệu sớm về mức độ ổn định, trong khi các lựa chọn còn lại là lagging indicator ghi nhận hậu quả đã xảy ra.",
      "en": "A leading indicator forecasts risk before it manifests as a consequence; a declining trend of newly found defects across regression cycles is an early stability signal, whereas the other options are lagging indicators recording consequences that already occurred.",
      "ja": "先行指標はリスクが結果として現れる前にそれを予測するものであり、回帰サイクルを通じた新規欠陥数の減少傾向は安定性の早期兆候である。一方、他の選択肢はすでに発生した結果を記録する遅行指標である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi áp dụng biểu đồ kiểm soát (control chart) thống kê để theo dõi tỷ lệ phát sinh lỗi theo từng build hàng ngày, một điểm dữ liệu vượt ra ngoài giới hạn kiểm soát (control limit) nên được diễn giải như thế nào?",
      "en": "When applying a statistical control chart to monitor the daily defect arrival rate per build, how should a data point falling outside the control limits be interpreted?",
      "ja": "日次ビルドごとの欠陥発生率を統計的管理図(コントロールチャート)で監視する際、管理限界線の外側に出たデータ点はどのように解釈すべきか。"
    },
    "options": [
      {
        "vi": "Cho thấy có khả năng tồn tại một nguyên nhân đặc biệt (special cause), ví dụ thay đổi lớn về mã nguồn hoặc môi trường, cần được điều tra vì quy trình đang mất ổn định thống kê",
        "en": "It indicates a likely special cause, such as a major code or environment change, that requires investigation because the process has become statistically unstable",
        "ja": "コードや環境の大幅な変更など、特別原因の存在を示唆しており、プロセスが統計的に不安定になっているため調査が必要である"
      },
      {
        "vi": "Chỉ là biến động ngẫu nhiên bình thường (common cause) trong phạm vi kỳ vọng, không cần điều tra thêm",
        "en": "It merely reflects normal random common-cause variation within the expected range and requires no further investigation",
        "ja": "予想範囲内の通常のランダムな共通原因のばらつきに過ぎず、それ以上の調査は不要である"
      },
      {
        "vi": "Luôn là dấu hiệu tích cực cho thấy đội kiểm thử đang làm việc hiệu quả hơn bình thường",
        "en": "It is always a positive sign that the test team is performing better than usual",
        "ja": "常にテストチームが通常より効率的に作業していることを示す肯定的なサインである"
      },
      {
        "vi": "Là căn cứ đủ để lập tức dừng toàn bộ dự án và sa thải đội phát triển",
        "en": "It is sufficient grounds to immediately halt the entire project and dismiss the development team",
        "ja": "プロジェクト全体を直ちに中止し、開発チームを解雇するのに十分な根拠である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Điểm vượt giới hạn kiểm soát báo hiệu nguyên nhân đặc biệt (special cause variation) chứ không phải biến động ngẫu nhiên thông thường, cần được điều tra nguyên nhân gốc rễ trước khi kết luận, không phải phản ứng thái quá.",
      "en": "A point outside the control limits signals special-cause variation rather than ordinary random variation, and calls for root-cause investigation rather than an overreaction.",
      "ja": "管理限界を超える点は通常のランダムなばらつきではなく特別原因によるばらつきを示しており、過剰反応ではなく根本原因の調査が必要である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Mô hình Tăng trưởng Độ tin cậy Phần mềm (Software Reliability Growth Model - SRGM) chủ yếu được sử dụng để làm gì trong giai đoạn kiểm thử cuối trước khi phát hành?",
      "en": "What is a Software Reliability Growth Model (SRGM) primarily used for during the final test phase before release?",
      "ja": "リリース前の最終テスト段階において、ソフトウェア信頼性成長モデル(SRGM)は主に何のために使用されるか。"
    },
    "options": [
      {
        "vi": "Đếm tổng số ca kiểm thử đã được viết và thực thi trong dự án",
        "en": "To count the total number of test cases written and executed in the project",
        "ja": "プロジェクトで作成・実行されたテストケースの総数を数えるため"
      },
      {
        "vi": "Dựa trên dữ liệu lịch sử về tần suất và thời điểm phát hiện lỗi để ước lượng số lỗi còn tồn đọng và dự báo thời điểm đạt độ tin cậy mục tiêu, hỗ trợ ra quyết định phát hành",
        "en": "To use historical data on defect discovery frequency and timing to estimate remaining latent defects and forecast when a target reliability level will be reached, supporting the release decision",
        "ja": "欠陥発見の頻度とタイミングに関する過去データを用いて残存欠陥数を推定し、目標信頼性レベルに到達する時期を予測することで、リリース判断を支援するため"
      },
      {
        "vi": "Tính toán chi phí nhân sự cần thiết cho các đợt kiểm thử tiếp theo",
        "en": "To calculate the staffing cost required for subsequent test cycles",
        "ja": "今後のテストサイクルに必要な人員コストを算出するため"
      },
      {
        "vi": "Xếp hạng mức độ ưu tiên của các yêu cầu nghiệp vụ chưa được kiểm thử",
        "en": "To rank the priority of business requirements that have not yet been tested",
        "ja": "まだテストされていないビジネス要件の優先順位を決めるため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "SRGM khớp đường cong toán học (ví dụ Goel-Okumoto) vào dữ liệu phát hiện lỗi theo thời gian để dự báo xu hướng lỗi còn lại và MTBF kỳ vọng, phục vụ quyết định go/no-go phát hành ở cấp quản lý.",
      "en": "An SRGM fits a mathematical curve (e.g., Goel-Okumoto) to defect-discovery-over-time data to forecast the remaining defect trend and expected MTBF, informing the go/no-go release decision at management level.",
      "ja": "SRGMは時間経過に伴う欠陥発見データに数学的曲線(例:Goel-Okumotoモデル)を当てはめ、残存欠陥の傾向と期待MTBFを予測し、マネジメントレベルでのリリース可否判断を支援する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Hiệu suất Loại bỏ Lỗi (Defect Removal Efficiency - DRE) của toàn bộ quy trình phát triển được tính như thế nào và nó phản ánh điều gì ở cấp độ tổ chức?",
      "en": "How is the organization-wide Defect Removal Efficiency (DRE) calculated, and what does it reflect at the organizational level?",
      "ja": "組織全体の欠陥除去効率(Defect Removal Efficiency, DRE)はどのように算出され、組織レベルで何を反映するか。"
    },
    "options": [
      {
        "vi": "Bằng số giờ làm thêm của đội kiểm thử chia cho tổng số giờ làm việc chuẩn",
        "en": "It equals the overtime hours of the test team divided by total standard working hours",
        "ja": "テストチームの残業時間を標準労働時間の総数で割った値である"
      },
      {
        "vi": "Bằng số ca kiểm thử tự động hóa chia cho tổng số ca kiểm thử thủ công",
        "en": "It equals the number of automated test cases divided by the total number of manual test cases",
        "ja": "自動化テストケース数を手動テストケースの総数で割った値である"
      },
      {
        "vi": "Bằng số lỗi nội bộ phát hiện trước khi bàn giao chia cho tổng số lỗi (nội bộ cộng với lỗi khách hàng phát hiện sau khi bàn giao), phản ánh hiệu quả tổng thể của toàn bộ quy trình đảm bảo chất lượng trước khi sản phẩm đến tay khách hàng",
        "en": "It equals internal defects found before delivery divided by the total defects (internal plus customer-found defects after delivery), reflecting the overall effectiveness of the entire quality assurance process before the product reaches customers",
        "ja": "納品前に発見された社内欠陥数を、欠陥総数(社内欠陥に納品後の顧客発見欠陥を加えたもの)で割った値であり、製品が顧客に届く前の品質保証プロセス全体の有効性を反映する"
      },
      {
        "vi": "Bằng số lượng công cụ kiểm thử được sử dụng trong dự án chia cho ngân sách dự án",
        "en": "It equals the number of testing tools used in the project divided by the project budget",
        "ja": "プロジェクトで使用されたテストツールの数をプロジェクト予算で割った値である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DRE là chỉ số cấp tổ chức đo lường khả năng của toàn bộ quy trình (không chỉ riêng kiểm thử) trong việc chặn lỗi trước khi đến tay khách hàng; DRE thấp và có xu hướng giảm là tín hiệu cần cải tiến quy trình theo mô hình như TMMi.",
      "en": "DRE is an organization-level metric measuring the entire process's (not just testing's) ability to intercept defects before they reach customers; a low or declining DRE trend signals a need for process improvement, e.g., via a TMMi-style initiative.",
      "ja": "DREはテストだけでなくプロセス全体が欠陥を顧客に届く前に阻止する能力を測定する組織レベルの指標であり、DREが低い、あるいは低下傾向にある場合はTMMiのような枠組みによるプロセス改善が必要であることを示す。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Chỉ số \"lỗi lọt ra ngoài sản xuất\" (escaped defects/defect leakage) khi được phân tích theo xu hướng qua nhiều phiên bản phát hành có giá trị quản lý gì?",
      "en": "When analyzed as a trend across multiple releases, what management value does the escaped defects (defect leakage) metric provide?",
      "ja": "複数のリリースにわたる傾向として分析した場合、「本番環境への欠陥漏出(escaped defects/defect leakage)」指標はどのような管理上の価値を持つか。"
    },
    "options": [
      {
        "vi": "Cho biết chính xác số giờ công đội kiểm thử đã bỏ ra trong sprint gần nhất",
        "en": "It shows exactly how many staff-hours the test team spent in the most recent sprint",
        "ja": "直近のスプリントでテストチームが費やした正確な工数(人時)を示す"
      },
      {
        "vi": "Không có giá trị dự báo, chỉ mang tính lịch sử thuần túy",
        "en": "It has no predictive value and is purely historical",
        "ja": "予測的な価値はなく、単なる過去の記録にすぎない"
      },
      {
        "vi": "Chỉ dùng để tính lương thưởng cho các lập trình viên viết mã ít lỗi nhất",
        "en": "It is used solely to calculate bonuses for developers with the fewest defects",
        "ja": "欠陥数が最も少ない開発者への賞与算定のみに使用される"
      },
      {
        "vi": "Giúp phát hiện điểm mù có hệ thống trong chiến lược kiểm thử (ví dụ loại lỗi/mô-đun nào liên tục lọt qua), từ đó điều chỉnh phạm vi và kỹ thuật kiểm thử một cách có mục tiêu thay vì tăng khối lượng kiểm thử tràn lan",
        "en": "It helps uncover systematic blind spots in the test strategy (e.g., which defect types or modules keep slipping through), enabling targeted adjustment of test scope and techniques rather than blanket increases in test volume",
        "ja": "テスト戦略における体系的な盲点(例えばどの種類の欠陥やモジュールが継続的に漏出しているか)を発見するのに役立ち、テスト量をやみくもに増やすのではなく、対象を絞ってテスト範囲や技法を調整できるようにする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Phân tích xu hướng defect leakage theo mô-đun/loại lỗi giúp nhận diện điểm yếu hệ thống trong chiến lược kiểm thử, cho phép chuyên gia CTEL điều chỉnh phân bổ nguồn lực và kỹ thuật kiểm thử dựa trên bằng chứng thay vì cảm tính.",
      "en": "Trend analysis of defect leakage by module or defect type reveals systemic weaknesses in the test strategy, allowing a CTEL-level expert to adjust resource allocation and test techniques based on evidence rather than intuition.",
      "ja": "モジュールや欠陥種類別に欠陥漏出の傾向を分析することで、テスト戦略上の体系的な弱点を特定でき、CTELレベルの専門家は直感ではなく根拠に基づいてリソース配分やテスト技法を調整できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong ngữ cảnh kiểm thử Agile, \"tốc độ kiểm thử\" (test velocity) khi được theo dõi qua nhiều sprint liên tiếp nên được sử dụng chủ yếu như thế nào ở cấp quản lý cấp cao?",
      "en": "In an Agile context, when test velocity is tracked across successive sprints, how should it primarily be used at senior management level?",
      "ja": "アジャイルの文脈において、複数のスプリントにわたり追跡される「テストベロシティ」は、上級管理職レベルで主にどのように活用すべきか。"
    },
    "options": [
      {
        "vi": "Như căn cứ duy nhất để quyết định có nên phát hành sản phẩm ra thị trường hay không",
        "en": "As the sole basis for deciding whether to release the product to market",
        "ja": "製品を市場にリリースするかどうかを決定する唯一の根拠として"
      },
      {
        "vi": "Như một chỉ báo tương đối, mang tính nội bộ của từng đội, dùng để nhận diện xu hướng bất thường (tăng/giảm đột ngột) cần điều tra nguyên nhân, chứ không nên dùng để so sánh tuyệt đối giữa các đội có ngữ cảnh khác nhau",
        "en": "As a relative, team-internal indicator used to spot abnormal trends (sudden increases/decreases) that warrant root-cause investigation, rather than for absolute cross-team comparison in differing contexts",
        "ja": "チーム内部における相対的な指標として、異常な傾向(急激な増減)を察知し原因調査のきっかけとするために用いるべきであり、文脈の異なるチーム間の絶対的な比較には用いるべきではない"
      },
      {
        "vi": "Như một con số cố định dùng để so sánh trực tiếp năng suất giữa các đội khác nhau nhằm xếp hạng và thưởng phạt",
        "en": "As a fixed number used to directly compare productivity across different teams for ranking and rewards/penalties",
        "ja": "異なるチーム間で生産性を直接比較し、順位付けや賞罰を行うための固定的な数値として"
      },
      {
        "vi": "Như một chỉ số thay thế hoàn toàn cho việc đo lường chất lượng sản phẩm",
        "en": "As a complete substitute for measuring product quality",
        "ja": "製品品質を測定する完全な代替指標として"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test velocity chịu ảnh hưởng nhiều bởi ngữ cảnh riêng của từng đội (độ phức tạp, kinh nghiệm, công cụ), nên đúng cách dùng theo ISTQB Expert là theo dõi xu hướng nội bộ để cảnh báo bất thường, tránh so sánh tuyệt đối giữa các đội gây phản tác dụng và hành vi thao túng số liệu.",
      "en": "Test velocity is heavily influenced by each team's specific context (complexity, experience, tooling), so the correct CTEL-level use is to track internal trends to flag anomalies, avoiding absolute cross-team comparisons that backfire and invite metric gaming.",
      "ja": "テストベロシティは各チーム固有の状況(複雑さ、経験、ツール)に大きく左右されるため、CTELレベルでの正しい活用法はチーム内部の傾向を追跡し異常を検知することであり、逆効果や指標操作を招く絶対的なチーム間比較は避けるべきである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Chi phí Chất lượng (Cost of Quality - COQ) trong đo lường kiểm thử nâng cao được phân tách thành các nhóm nào, và phân tích xu hướng của chúng theo thời gian mang lại lợi ích chiến lược gì?",
      "en": "Into which categories is Cost of Quality (COQ) broken down in advanced test measurement, and what strategic benefit comes from analyzing their trends over time?",
      "ja": "高度なテスト測定における品質コスト(Cost of Quality, COQ)はどのカテゴリーに分類され、その傾向を時系列で分析することにどのような戦略的利点があるか。"
    },
    "options": [
      {
        "vi": "Chỉ có một nhóm duy nhất là chi phí lương của đội kiểm thử, không cần phân tích thêm",
        "en": "Only a single category—test team salaries—which requires no further analysis",
        "ja": "テストチームの給与という単一のカテゴリーのみであり、それ以上の分析は不要である"
      },
      {
        "vi": "Chi phí phòng ngừa và thẩm định (chi phí phù hợp) so với chi phí lỗi nội bộ và lỗi ngoại bộ (chi phí không phù hợp); theo dõi xu hướng dịch chuyển tỷ trọng giữa hai nhóm giúp chứng minh bằng số liệu tài chính rằng đầu tư sớm vào phòng ngừa làm giảm chi phí lỗi ngoại bộ đắt đỏ hơn nhiều về sau",
        "en": "Prevention and appraisal costs (cost of conformance) versus internal and external failure costs (cost of non-conformance); tracking the shift in proportion between the two groups provides financial evidence that early investment in prevention reduces the much costlier external failure costs later",
        "ja": "予防コストと評価コスト(適合コスト)対内部欠陥コストと外部欠陥コスト(不適合コスト)であり、この二つのグループ間の比重の変化を追跡することで、予防への早期投資がより高額な外部欠陥コストを後で削減することを財務データで裏付けられる"
      },
      {
        "vi": "Chi phí phần cứng và chi phí phần mềm dùng cho môi trường kiểm thử",
        "en": "Hardware costs and software costs used for the test environment",
        "ja": "テスト環境に使用されるハードウェアコストとソフトウェアコスト"
      },
      {
        "vi": "Chi phí đào tạo nhân viên mới và chi phí tuyển dụng",
        "en": "New employee training costs and recruitment costs",
        "ja": "新入社員の研修コストと採用コスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mô hình COQ kinh điển (Juran/Crosby) chia thành phòng ngừa, thẩm định (chi phí phù hợp) và lỗi nội bộ, lỗi ngoại bộ (chi phí không phù hợp); ở cấp CTEL, xu hướng dịch chuyển từ chi phí lỗi ngoại bộ sang chi phí phòng ngừa là bằng chứng thuyết phục lãnh đạo đầu tư cải tiến quy trình.",
      "en": "The classic COQ model (Juran/Crosby) splits costs into prevention and appraisal (conformance) versus internal and external failure (non-conformance); at CTEL level, a trend shifting spend from external failure toward prevention is compelling evidence to persuade leadership to invest in process improvement.",
      "ja": "古典的なCOQモデル(ジュラン/クロスビー)は、予防・評価コスト(適合コスト)と内部・外部欠陥コスト(不適合コスト)に分類される。CTELレベルでは、外部欠陥コストから予防コストへの支出シフト傾向が、経営陣にプロセス改善への投資を説得する強力な根拠となる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi sử dụng phân tích hồi quy tuyến tính (regression analysis) trên dữ liệu lịch sử để dự báo nỗ lực kiểm thử cho dự án mới, rủi ro phương pháp luận nào cần được chuyên gia CTEL đặc biệt lưu ý?",
      "en": "When using linear regression analysis on historical data to forecast test effort for a new project, what methodological risk should a CTEL-level expert be particularly wary of?",
      "ja": "過去データに対する線形回帰分析を用いて新規プロジェクトのテスト工数を予測する際、CTELレベルの専門家が特に注意すべき方法論上のリスクは何か。"
    },
    "options": [
      {
        "vi": "Phân tích hồi quy chỉ có thể áp dụng cho dữ liệu tài chính, không áp dụng được cho dữ liệu kiểm thử",
        "en": "Regression analysis can only be applied to financial data, not test data",
        "ja": "回帰分析は財務データにのみ適用可能であり、テストデータには適用できない"
      },
      {
        "vi": "Hồi quy tuyến tính luôn cho kết quả chính xác 100% bất kể dữ liệu đầu vào như thế nào",
        "en": "Linear regression always produces 100% accurate results regardless of input data",
        "ja": "線形回帰は入力データに関わらず常に100%正確な結果をもたらす"
      },
      {
        "vi": "Mô hình được xây dựng từ dữ liệu của các dự án cũ có thể ngoại suy sai khi dự án mới có đặc điểm khác biệt đáng kể (công nghệ mới, độ phức tạp khác, đội ngũ khác), nên cần kiểm tra tính tương đồng ngữ cảnh trước khi tin tưởng dự báo",
        "en": "A model built from older project data can extrapolate incorrectly when the new project differs significantly (new technology, different complexity, different team), so contextual similarity must be validated before trusting the forecast",
        "ja": "過去のプロジェクトデータから構築されたモデルは、新規プロジェクトが大きく異なる特性(新技術、異なる複雑さ、異なるチーム)を持つ場合、誤った外挿を行う可能性があるため、予測を信頼する前に文脈の類似性を検証する必要がある"
      },
      {
        "vi": "Không cần thu thập đủ số lượng điểm dữ liệu lịch sử vì một dự án cũng đủ để xây dựng mô hình đáng tin cậy",
        "en": "There is no need to collect a sufficient number of historical data points since a single past project is enough to build a reliable model",
        "ja": "信頼できるモデルを構築するには過去プロジェクト1件分のデータで十分であり、十分な数の履歴データ点を集める必要はない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Rủi ro cốt lõi của mô hình dự báo dựa trên dữ liệu lịch sử là ngoại suy ngoài phạm vi dữ liệu huấn luyện (extrapolation) khi ngữ cảnh dự án mới khác biệt; chuyên gia CTEL cần đánh giá tính tương đồng và điều chỉnh mô hình, không áp dụng máy móc.",
      "en": "The core risk of a historically trained forecasting model is extrapolating beyond the training data's context when the new project differs; a CTEL expert must assess similarity and calibrate the model rather than applying it mechanically.",
      "ja": "過去データに基づく予測モデルの本質的リスクは、新規プロジェクトの文脈が異なる場合に学習データの範囲を超えて外挿してしまうことであり、CTEL専門家は類似性を評価しモデルを機械的に適用せず調整する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Thời gian trung bình giữa các lỗi (Mean Time Between Failures - MTBF) khi được tính toán và ngoại suy từ dữ liệu kiểm thử ở giai đoạn cuối có hạn chế quan trọng nào mà chuyên gia quản lý kiểm thử cần cảnh báo cho ban lãnh đạo?",
      "en": "When Mean Time Between Failures (MTBF) is calculated and extrapolated from late-stage test data, what important limitation should a test management expert flag to leadership?",
      "ja": "最終段階のテストデータから平均故障間隔(MTBF)を算出・外挿する際、テストマネジメント専門家が経営陣に警告すべき重要な限界は何か。"
    },
    "options": [
      {
        "vi": "MTBF không cần dữ liệu lịch sử, có thể tính chính xác chỉ từ một lần chạy kiểm thử duy nhất",
        "en": "MTBF requires no historical data and can be calculated accurately from a single test run",
        "ja": "MTBFは過去データを必要とせず、1回のテスト実行のみで正確に算出できる"
      },
      {
        "vi": "MTBF luôn tăng tuyến tính vô hạn theo thời gian kiểm thử, không có giới hạn thực tế nào",
        "en": "MTBF always increases linearly and infinitely with test time, with no practical limit",
        "ja": "MTBFはテスト時間とともに無限に線形増加し、実際的な限界は存在しない"
      },
      {
        "vi": "MTBF chỉ áp dụng được cho phần cứng, hoàn toàn không có ý nghĩa với phần mềm",
        "en": "MTBF is applicable only to hardware and has no meaning for software",
        "ja": "MTBFはハードウェアにのみ適用可能であり、ソフトウェアには全く意味を持たない"
      },
      {
        "vi": "MTBF tính từ môi trường kiểm thử có thể không phản ánh đúng điều kiện vận hành thực tế (tải, cấu hình, hành vi người dùng), nên cần thận trọng khi dùng làm cam kết SLA tuyệt đối với khách hàng",
        "en": "MTBF calculated from the test environment may not accurately reflect real production conditions (load, configuration, user behavior), so it should be used cautiously as an absolute SLA commitment to customers",
        "ja": "テスト環境から算出されたMTBFは実際の本番環境の条件(負荷、構成、ユーザー行動)を正確に反映していない可能性があるため、顧客への絶対的なSLA保証として用いる際は慎重を要する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "MTBF ước lượng trong môi trường kiểm thử có kiểm soát thường khác biệt với môi trường sản xuất thực tế; chuyên gia CTEL cần truyền đạt rõ độ bất định này khi báo cáo lên lãnh đạo để tránh cam kết SLA phi thực tế.",
      "en": "MTBF estimated in a controlled test environment often diverges from real production conditions; a CTEL expert must clearly communicate this uncertainty when reporting to leadership to avoid unrealistic SLA commitments.",
      "ja": "管理されたテスト環境で推定されたMTBFは実際の本番環境としばしば乖離するため、CTEL専門家は経営陣への報告時にこの不確実性を明確に伝え、非現実的なSLA保証を避ける必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một bảng điểm cân bằng (balanced scorecard) cho hoạt động kiểm thử ở cấp tổ chức nên tránh sai lầm phổ biến nào khi thiết kế bộ chỉ số?",
      "en": "When designing a balanced scorecard for testing activities at the organizational level, what common mistake should be avoided?",
      "ja": "組織レベルでのテスト活動に関するバランススコアカードを設計する際、避けるべき一般的な誤りは何か。"
    },
    "options": [
      {
        "vi": "Chỉ đưa vào các chỉ số dễ đo lường về mặt kỹ thuật (như số ca kiểm thử, số lỗi) mà bỏ qua các khía cạnh chiến lược như mức độ hài lòng của khách hàng, rủi ro kinh doanh và năng lực tổ chức, dẫn đến bức tranh phiến diện không phục vụ ra quyết định cấp cao",
        "en": "Including only technically easy-to-measure metrics (like test case counts, defect counts) while ignoring strategic dimensions such as customer satisfaction, business risk, and organizational capability, resulting in a one-sided picture that fails to support senior decision-making",
        "ja": "テストケース数や欠陥数など技術的に測定しやすい指標のみを採用し、顧客満足度、ビジネスリスク、組織能力といった戦略的側面を無視することで、上級意思決定を支援できない偏った全体像になってしまうこと"
      },
      {
        "vi": "Sử dụng quá nhiều màu sắc trong biểu đồ khiến báo cáo trông đẹp mắt hơn",
        "en": "Using too many colors in charts, making the report look more attractive",
        "ja": "チャートに色を使いすぎて報告書を見栄えよくすること"
      },
      {
        "vi": "Cập nhật bảng điểm quá thường xuyên, mỗi giờ một lần",
        "en": "Updating the scorecard too frequently, every hour",
        "ja": "スコアカードを1時間ごとと頻繁に更新しすぎること"
      },
      {
        "vi": "Chỉ trình bày bảng điểm bằng một ngôn ngữ duy nhất cho toàn bộ tổ chức đa quốc gia",
        "en": "Presenting the scorecard in only one language for the entire multinational organization",
        "ja": "多国籍組織全体に対してスコアカードを単一言語のみで提示すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Balanced scorecard đúng nghĩa phải cân bằng nhiều khía cạnh (tài chính, khách hàng, quy trình nội bộ, học hỏi/tăng trưởng); sai lầm phổ biến ở cấp chiến lược là chỉ tập trung vào chỉ số kỹ thuật dễ thu thập, bỏ qua bức tranh kinh doanh tổng thể mà lãnh đạo cần.",
      "en": "A true balanced scorecard must weigh multiple perspectives (financial, customer, internal process, learning/growth); a common strategic-level mistake is focusing only on easily collected technical metrics while ignoring the overall business picture leadership needs.",
      "ja": "真のバランススコアカードは複数の視点(財務、顧客、内部プロセス、学習・成長)を均衡させる必要があり、戦略レベルでよくある誤りは収集しやすい技術指標だけに注目し、経営陣が必要とする全体的なビジネス像を無視することである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Điểm số kiểm thử đột biến (mutation testing score/mutation adequacy) khi được đưa vào bộ KPI kiểm thử nâng cao có ý nghĩa gì mà độ bao phủ mã nguồn (code coverage) thông thường không thể hiện được?",
      "en": "When incorporated into an advanced test KPI set, what does the mutation testing score reveal that ordinary code coverage cannot?",
      "ja": "高度なテストKPIセットにミューテーションテストスコア(mutation adequacy)を組み込んだ場合、通常のコードカバレッジでは把握できない何を示すことができるか。"
    },
    "options": [
      {
        "vi": "Tốc độ thực thi bộ kiểm thử tự động trên môi trường CI/CD",
        "en": "The execution speed of the automated test suite on the CI/CD environment",
        "ja": "CI/CD環境における自動テストスイートの実行速度"
      },
      {
        "vi": "Chất lượng thực sự của các assertion trong bộ kiểm thử, tức là bộ kiểm thử có thực sự phát hiện được lỗi (mutant) khi mã nguồn bị thay đổi có chủ đích hay không, thay vì chỉ đo phần trăm mã được chạy qua mà không kiểm tra kết quả có đúng không",
        "en": "The true quality of the test suite's assertions—i.e., whether the tests actually detect faults (mutants) when the source code is deliberately altered—rather than merely measuring what percentage of code was executed without checking whether the outcome was verified as correct",
        "ja": "ソースコードが意図的に変更された際にテストスイートが実際に欠陥(ミュータント)を検出できるかどうか、すなわちアサーションの真の品質を示すものであり、単に結果が正しいか検証せずに実行されたコードの割合を測定するものではない"
      },
      {
        "vi": "Chi phí hạ tầng cần thiết để chạy bộ kiểm thử",
        "en": "The infrastructure cost required to run the test suite",
        "ja": "テストスイートを実行するために必要なインフラコスト"
      },
      {
        "vi": "Số lượng tuyệt đối dòng mã nguồn của toàn bộ hệ thống",
        "en": "The absolute number of lines of source code in the entire system",
        "ja": "システム全体のソースコード行数の絶対値"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Code coverage chỉ đo mã có được thực thi hay không, không đảm bảo test có assertion phát hiện lỗi; mutation score đo khả năng thực sự \"bắt lỗi\" của bộ test bằng cách gieo lỗi giả (mutant) và kiểm tra tỷ lệ bị phát hiện, phù hợp cho đánh giá chất lượng testware cấp chuyên gia.",
      "en": "Code coverage only measures whether code was executed, not whether tests have assertions that catch faults; mutation score measures the test suite's actual fault-detection capability by seeding artificial faults (mutants) and checking the kill rate, suitable for expert-level testware quality evaluation.",
      "ja": "コードカバレッジはコードが実行されたかどうかのみを測定し、テストに欠陥を検出するアサーションがあるかは保証しない。ミューテーションスコアは人工的な欠陥(ミュータント)を注入し、その検出率(キル率)を確認することでテストスイートの実際の欠陥検出能力を測定し、エキスパートレベルのテストウェア品質評価に適している。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi áp dụng phân tích Pareto (nguyên tắc 80/20) vào dữ liệu phân loại nguyên nhân gốc rễ (root cause) của lỗi tích lũy qua nhiều dự án, mục tiêu chiến lược chính là gì?",
      "en": "When applying Pareto analysis (the 80/20 rule) to root-cause classification data for defects accumulated across many projects, what is the primary strategic goal?",
      "ja": "複数プロジェクトにわたって蓄積された欠陥の根本原因分類データにパレート分析(80/20の法則)を適用する主な戦略目標は何か。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn khái niệm mức độ nghiêm trọng của lỗi khỏi quá trình phân tích",
        "en": "To completely remove the concept of defect severity from the analysis process",
        "ja": "分析プロセスから欠陥の深刻度という概念を完全に排除するため"
      },
      {
        "vi": "Đảm bảo mọi nguyên nhân gốc rễ, dù nhỏ hay lớn, đều nhận được đúng 20% ngân sách cải tiến như nhau",
        "en": "To ensure every root cause, whether small or large, receives exactly the same 20% of the improvement budget",
        "ja": "すべての根本原因が、大小に関わらず改善予算の20%を均等に受け取ることを保証するため"
      },
      {
        "vi": "Xác định một số ít nguyên nhân gốc rễ chiếm phần lớn số lỗi phát sinh, để tập trung nguồn lực cải tiến quy trình vào đúng những điểm mang lại hiệu quả đầu tư cao nhất, thay vì dàn trải nỗ lực đều cho mọi nguyên nhân",
        "en": "To identify the small number of root causes responsible for the majority of defects, so process-improvement resources can be focused on the points that yield the highest return on investment, rather than spreading effort evenly across every cause",
        "ja": "欠陥の大部分を占める少数の根本原因を特定し、あらゆる原因に均等に労力を分散させるのではなく、最も投資対効果の高いポイントにプロセス改善のリソースを集中させるため"
      },
      {
        "vi": "Thay thế hoàn toàn nhu cầu thực hiện phân tích nguyên nhân gốc rễ chi tiết cho từng lỗi riêng lẻ",
        "en": "To completely eliminate the need for detailed root-cause analysis of each individual defect",
        "ja": "個々の欠陥に対する詳細な根本原因分析の必要性を完全になくすため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phân tích Pareto giúp nhà quản lý kiểm thử cấp cao ưu tiên hóa: khoảng 20% nguyên nhân gốc rễ thường gây ra khoảng 80% số lỗi, do đó cải tiến quy trình nên tập trung vào nhóm nguyên nhân trọng yếu này để tối ưu hóa tỷ suất đầu tư cải tiến.",
      "en": "Pareto analysis helps senior test managers prioritize: roughly 20% of root causes typically account for about 80% of defects, so process improvement should focus on this vital-few group to optimize the return on improvement investment.",
      "ja": "パレート分析は上級テストマネージャーの優先順位付けを助ける。典型的には根本原因の約20%が欠陥全体の約80%を占めるため、プロセス改善はこの重要な少数の原因群に集中させることで改善投資の効果を最適化できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Chỉ số Biến động Yêu cầu (Requirements Volatility Index) khi được phân tích xu hướng theo từng sprint/giai đoạn có mối liên hệ chiến lược nào với hoạt động lập kế hoạch kiểm thử ở cấp quản lý?",
      "en": "When the Requirements Volatility Index is trend-analyzed per sprint or phase, what strategic relationship does it have with test planning at management level?",
      "ja": "要求変動指数(Requirements Volatility Index)をスプリントやフェーズごとに傾向分析した場合、マネジメントレベルのテスト計画活動とどのような戦略的関係があるか。"
    },
    "options": [
      {
        "vi": "Không có mối liên hệ nào vì yêu cầu và kế hoạch kiểm thử là hai lĩnh vực hoàn toàn độc lập",
        "en": "There is no relationship at all, since requirements and test planning are entirely independent domains",
        "ja": "要求とテスト計画は全く独立した領域であるため、何の関係もない"
      },
      {
        "vi": "Chỉ có ý nghĩa với đội phát triển, không liên quan đến kiểm thử",
        "en": "It is only meaningful to the development team and irrelevant to testing",
        "ja": "開発チームにのみ意味があり、テストとは無関係である"
      },
      {
        "vi": "Luôn dẫn đến kết luận duy nhất là phải sa thải nhóm phân tích nghiệp vụ",
        "en": "It always leads to the sole conclusion that the business analysis team must be dismissed",
        "ja": "常にビジネス分析チームを解雇すべきという唯一の結論に至る"
      },
      {
        "vi": "Xu hướng biến động yêu cầu tăng cao dự báo nguy cơ testware (kịch bản, dữ liệu, môi trường kiểm thử) phải được thiết kế lại nhiều lần, từ đó giúp nhà quản lý dự trù thêm ngân sách bảo trì testware và cân nhắc chiến lược kiểm thử linh hoạt hơn (ví dụ kiểm thử dựa trên mô hình) thay vì kịch bản cố định chi tiết",
        "en": "A rising volatility trend predicts that testware (scripts, data, test environments) will likely need frequent rework, allowing managers to budget additional testware maintenance and consider more adaptive test strategies (e.g., model-based testing) instead of rigidly detailed scripts",
        "ja": "要求変動の上昇傾向は、テストウェア(スクリプト、データ、テスト環境)が頻繁に再設計される必要があることを予測させ、マネージャーがテストウェア保守のための追加予算を計画し、詳細で固定的なスクリプトの代わりにモデルベーステストのような、より適応性の高いテスト戦略を検討する助けとなる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Requirements volatility cao tương quan với chi phí bảo trì testware cao; ở cấp CTEL, dự báo xu hướng này cho phép điều chỉnh chiến lược kiểm thử (ví dụ chuyển sang kiểm thử dựa trên mô hình, kiểm thử thăm dò linh hoạt) và dự trù ngân sách hợp lý thay vì bị động.",
      "en": "High requirements volatility correlates with high testware maintenance cost; at CTEL level, forecasting this trend allows adjusting the test strategy (e.g., shifting toward model-based or exploratory testing) and budgeting proactively rather than reactively.",
      "ja": "高い要求変動性はテストウェア保守コストの増大と相関する。CTELレベルでは、この傾向を予測することでテスト戦略を調整(例:モデルベーステストや探索的テストへの移行)し、受動的にではなく事前に予算を計画できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tính toán chỉ số Lợi tức Đầu tư (ROI) cho việc triển khai kiểm thử tự động hóa trên toàn tổ chức, sai lầm phổ biến nào cần tránh khi thu thập dữ liệu đầu vào?",
      "en": "When calculating the Return on Investment (ROI) for organization-wide test automation adoption, what common mistake should be avoided when gathering input data?",
      "ja": "組織全体でのテスト自動化導入に対する投資収益率(ROI)を算出する際、入力データ収集で避けるべきよくある誤りは何か。"
    },
    "options": [
      {
        "vi": "Chỉ tính chi phí công cụ mua ban đầu mà bỏ qua chi phí bảo trì kịch bản tự động dài hạn, chi phí đào tạo và chi phí hạ tầng CI/CD, dẫn đến ROI bị thổi phồng và kỳ vọng phi thực tế từ lãnh đạo",
        "en": "Counting only the initial tool purchase cost while ignoring long-term script maintenance cost, training cost, and CI/CD infrastructure cost, leading to an inflated ROI and unrealistic leadership expectations",
        "ja": "初期のツール購入コストのみを計上し、長期的なスクリプト保守コスト、研修コスト、CI/CDインフラコストを無視することで、ROIが過大評価され、経営陣に非現実的な期待を抱かせること"
      },
      {
        "vi": "Tính toán quá kỹ lưỡng mọi chi phí liên quan trong suốt vòng đời của giải pháp tự động hóa",
        "en": "Calculating every related cost too thoroughly across the automation solution's entire lifecycle",
        "ja": "自動化ソリューションのライフサイクル全体にわたるあらゆる関連コストを徹底的に計算しすぎること"
      },
      {
        "vi": "So sánh chi phí tự động hóa với chi phí kiểm thử thủ công tương đương trong cùng khoảng thời gian",
        "en": "Comparing automation cost with the cost of equivalent manual testing over the same time period",
        "ja": "自動化コストを同期間の同等の手動テストコストと比較すること"
      },
      {
        "vi": "Cập nhật lại số liệu ROI định kỳ khi có dữ liệu thực tế mới từ vận hành",
        "en": "Periodically updating the ROI figures as new actual operational data becomes available",
        "ja": "運用から得られる新たな実績データに基づき定期的にROI数値を更新すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Sai lầm kinh điển khi tính ROI tự động hóa là chỉ nhìn chi phí đầu tư ban đầu, bỏ quên chi phí bảo trì kịch bản (thường tăng theo thời gian do thay đổi giao diện/nghiệp vụ), khiến ROI bị đánh giá quá lạc quan và gây thất vọng về sau; các phương án còn lại là thực hành tốt.",
      "en": "The classic mistake in automation ROI is looking only at initial investment cost while forgetting ongoing script maintenance cost (which tends to grow as the UI/business changes), causing an overly optimistic ROI and later disappointment; the other options describe good practices.",
      "ja": "自動化ROI算出における典型的な誤りは、初期投資コストのみに注目し、(UIやビジネスの変化に伴い増大しがちな)継続的なスクリプト保守コストを見落とすことであり、これによりROIが過度に楽観的に評価され、後に失望を招く。他の選択肢は良い実践である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi phát hiện mối tương quan thống kê mạnh giữa số lượng giờ làm thêm của đội kiểm thử và số lỗi nghiêm trọng bị bỏ sót, một chuyên gia CTEL nên diễn giải phát hiện này như thế nào trước khi đề xuất hành động?",
      "en": "Upon discovering a strong statistical correlation between the test team's overtime hours and the number of critical defects missed, how should a CTEL expert interpret this finding before proposing action?",
      "ja": "テストチームの残業時間数と見逃された重大欠陥数の間に強い統計的相関が見つかった場合、CTELの専門家はアクションを提案する前にこの発見をどのように解釈すべきか。"
    },
    "options": [
      {
        "vi": "Kết luận ngay lập tức rằng làm thêm giờ là nguyên nhân trực tiếp duy nhất gây ra lỗi bị bỏ sót và cấm hoàn toàn làm thêm giờ",
        "en": "Immediately conclude that overtime is the sole direct cause of missed defects and completely ban overtime",
        "ja": "残業が見逃し欠陥の唯一の直接原因であると即座に結論づけ、残業を全面的に禁止する"
      },
      {
        "vi": "Nhận thức rằng tương quan không đồng nghĩa với quan hệ nhân quả; cần điều tra thêm các biến gây nhiễu tiềm ẩn (ví dụ áp lực deadline, độ phức tạp dự án tăng) có thể đồng thời gây ra cả làm thêm giờ và lỗi bỏ sót, trước khi đưa ra kết luận nhân quả và hành động can thiệp",
        "en": "Recognize that correlation does not imply causation; further investigate potential confounding variables (e.g., deadline pressure, increased project complexity) that may simultaneously cause both overtime and missed defects, before drawing causal conclusions and taking intervention action",
        "ja": "相関は因果関係を意味しないことを認識し、残業と見逃し欠陥の両方を同時に引き起こしている可能性のある潜在的な交絡変数(例:締め切りのプレッシャー、プロジェクトの複雑性の増加)をさらに調査してから、因果的な結論や介入行動を取るべきである"
      },
      {
        "vi": "Bỏ qua hoàn toàn phát hiện này vì tương quan thống kê không bao giờ có giá trị tham khảo",
        "en": "Completely disregard the finding, since statistical correlation is never of any reference value",
        "ja": "統計的相関には参照価値が全くないため、この発見を完全に無視する"
      },
      {
        "vi": "Công bố ngay kết quả này ra bên ngoài tổ chức như một phát hiện khoa học đã được kiểm chứng đầy đủ",
        "en": "Immediately publish this finding externally as a fully validated scientific discovery",
        "ja": "この結果を十分に検証された科学的発見として直ちに組織外に公表する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Nguyên tắc nền tảng trong phân tích dữ liệu là tương quan không chứng minh nhân quả; chuyên gia CTEL cần tìm kiếm biến gây nhiễu và có thể cần thiết kế thực nghiệm hoặc phân tích sâu hơn trước khi đưa ra quyết định quản lý dựa trên quan hệ nhân quả giả định.",
      "en": "A foundational principle in data analysis is that correlation does not prove causation; a CTEL expert must search for confounding variables and may need a controlled experiment or deeper analysis before making management decisions based on an assumed causal relationship.",
      "ja": "データ分析における基本原則は、相関が因果関係を証明しないということである。CTEL専門家は交絡変数を探し、仮定された因果関係に基づく経営判断を下す前に、対照実験やより深い分析が必要な場合がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Định luật Goodhart (Goodhart's Law) áp dụng vào hệ thống KPI kiểm thử cảnh báo điều gì mà chuyên gia quản lý kiểm thử cấp cao cần đặc biệt cẩn trọng khi thiết kế chỉ số?",
      "en": "Applied to a test KPI system, what does Goodhart's Law warn senior test management experts to be especially cautious about when designing metrics?",
      "ja": "テストKPIシステムに適用した場合、グッドハートの法則(Goodhart's Law)は、上級テストマネジメント専門家が指標設計において特に注意すべき何を警告しているか。"
    },
    "options": [
      {
        "vi": "Số lượng KPI càng nhiều thì hệ thống đo lường càng đáng tin cậy hơn, không giới hạn",
        "en": "The more KPIs there are, the more reliable the measurement system becomes, without limit",
        "ja": "KPIの数が多ければ多いほど測定システムの信頼性は際限なく高まる"
      },
      {
        "vi": "Mọi chỉ số kiểm thử một khi đã được thiết lập sẽ luôn chính xác vĩnh viễn, không bao giờ cần xem xét lại",
        "en": "Once established, every test metric remains permanently accurate and never needs to be reviewed again",
        "ja": "一度設定されたすべてのテスト指標は永久に正確であり、二度と見直す必要はない"
      },
      {
        "vi": "Khi một chỉ số đo lường bị biến thành mục tiêu để thưởng/phạt trực tiếp, con người có xu hướng tối ưu hóa để đạt được con số đó (ví dụ viết nhiều ca kiểm thử vụn vặt để tăng số lượng) mà không thực sự cải thiện chất lượng, khiến chỉ số mất đi giá trị đo lường ban đầu",
        "en": "When a measure becomes a target directly tied to reward or punishment, people tend to optimize for hitting that number (e.g., writing many trivial test cases just to inflate the count) without genuinely improving quality, causing the metric to lose its original measurement value",
        "ja": "ある測定指標が報酬や罰と直結する目標に変わると、人々は実際に品質を改善することなくその数値を達成することだけを最適化する傾向がある(例えば数を水増しするために些細なテストケースを大量に作成する)ため、指標が本来の測定価値を失ってしまう"
      },
      {
        "vi": "Chỉ số kiểm thử không bao giờ nên được chia sẻ với đội ngũ thực hiện công việc",
        "en": "Test metrics should never be shared with the team performing the work",
        "ja": "テスト指標は作業を行うチームと決して共有すべきではない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Goodhart's Law (\"khi một thước đo trở thành mục tiêu, nó không còn là thước đo tốt nữa\") cảnh báo về hành vi thao túng số liệu (metrics gaming) khi KPI gắn liền với đánh giá hiệu suất cá nhân; ở cấp CTEL cần thiết kế bộ chỉ số cân bằng, khó bị đánh lừa và luôn kết hợp đánh giá định tính.",
      "en": "Goodhart's Law (\"when a measure becomes a target, it ceases to be a good measure\") warns of metrics gaming when a KPI is tied to individual performance evaluation; at CTEL level, one must design a balanced, gaming-resistant metric set always paired with qualitative review.",
      "ja": "グッドハートの法則(「測定指標が目標になると、それは良い指標ではなくなる」)は、KPIが個人の業績評価と結びついた場合の指標操作(メトリクスゲーミング)を警告している。CTELレベルでは、操作されにくいバランスの取れた指標セットを設計し、常に定性的な評価と組み合わせる必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi trình bày một dự báo về số lỗi còn tồn đọng dựa trên mô hình thống kê cho ban lãnh đạo, việc kèm theo khoảng tin cậy (confidence interval) thay vì chỉ một con số điểm duy nhất mang lại giá trị quản lý gì?",
      "en": "When presenting a statistical forecast of remaining defects to leadership, what management value does including a confidence interval, rather than a single point estimate, provide?",
      "ja": "統計モデルに基づく残存欠陥数の予測を経営陣に提示する際、単一の点推定値ではなく信頼区間を併記することにはどのような管理上の価値があるか。"
    },
    "options": [
      {
        "vi": "Không có giá trị gì thêm, vì con số điểm duy nhất luôn đủ chính xác cho mọi quyết định",
        "en": "No additional value, since a single point estimate is always accurate enough for every decision",
        "ja": "単一の点推定値はあらゆる意思決定に対して常に十分正確であるため、追加の価値はない"
      },
      {
        "vi": "Giúp thay thế hoàn toàn nhu cầu thực hiện thêm bất kỳ vòng kiểm thử nào trong tương lai",
        "en": "It completely eliminates the need for any further rounds of testing in the future",
        "ja": "将来的なテストの追加実施の必要性を完全になくす"
      },
      {
        "vi": "Chỉ nhằm mục đích làm cho báo cáo trông phức tạp và chuyên nghiệp hơn về mặt hình thức",
        "en": "It merely serves to make the report look more complex and professional in appearance",
        "ja": "報告書を見た目だけより複雑で専門的に見せることだけを目的とする"
      },
      {
        "vi": "Truyền đạt trung thực mức độ bất định vốn có trong dự báo, giúp lãnh đạo hiểu được biên độ rủi ro (ví dụ số lỗi tồn đọng có thể dao động trong khoảng nào với độ tin cậy nhất định) để ra quyết định phát hành thận trọng và có kế hoạch dự phòng, thay vì tin tưởng mù quáng vào một con số đơn lẻ",
        "en": "Honestly conveys the inherent uncertainty in the forecast, helping leadership understand the risk margin (e.g., the range within which remaining defects likely fall at a given confidence level) to make cautious release decisions with contingency plans, rather than blindly trusting a single number",
        "ja": "予測に内在する不確実性を誠実に伝え、経営陣がリスクの幅(例えば、一定の信頼度で残存欠陥数がどの範囲に収まる可能性が高いか)を理解し、単一の数値を盲目的に信頼するのではなく、慎重なリリース判断と予備計画の策定を可能にする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khoảng tin cậy phản ánh trung thực độ bất định thống kê của dự báo, giúp lãnh đạo đưa ra quyết định go/no-go dựa trên đánh giá rủi ro định lượng thay vì ảo tưởng về độ chính xác tuyệt đối của một con số điểm duy nhất — đây là kỹ năng giao tiếp số liệu quan trọng ở cấp chuyên gia.",
      "en": "A confidence interval honestly reflects the statistical uncertainty of a forecast, helping leadership make go/no-go decisions based on quantified risk assessment rather than a false sense of absolute precision from a single point estimate—an essential data-communication skill at expert level.",
      "ja": "信頼区間は予測の統計的不確実性を誠実に反映し、単一の点推定値がもたらす絶対的な精度という誤った安心感ではなく、定量化されたリスク評価に基づいてリリース可否を判断する助けとなる。これはエキスパートレベルにおける重要なデータコミュニケーションスキルである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi sử dụng phương pháp trung bình động (moving average) để làm mượt dữ liệu tiến độ thực thi ca kiểm thử theo tuần nhằm dự báo ngày hoàn thành, hạn chế cố hữu nào của kỹ thuật này cần được lưu ý?",
      "en": "When using a moving average to smooth weekly test execution progress data in order to forecast the completion date, what inherent limitation of this technique should be noted?",
      "ja": "完了日を予測するために週次のテスト実行進捗データを移動平均で平滑化する際、この手法に内在する限界として留意すべき点は何か。"
    },
    "options": [
      {
        "vi": "Trung bình động phản ứng chậm với các thay đổi đột ngột gần đây (ví dụ một sự kiện làm giảm mạnh tốc độ thực thi tuần cuối), có thể khiến dự báo bị trễ so với thực tế và cần kết hợp với đánh giá định tính về nguyên nhân biến động thay vì chỉ dựa hoàn toàn vào con số làm mượt",
        "en": "A moving average reacts slowly to sudden recent changes (e.g., an event sharply reducing the latest week's execution rate), which can make the forecast lag behind reality and requires combining it with qualitative assessment of the cause of variation rather than relying solely on the smoothed figure",
        "ja": "移動平均は直近の急激な変化(例えば直近週の実行速度を大きく低下させる事象)への反応が遅く、予測が実態から遅れる可能性があるため、平滑化された数値だけに頼るのではなく、変動の原因に関する定性的評価と組み合わせる必要がある"
      },
      {
        "vi": "Trung bình động luôn cho kết quả dự báo chính xác tuyệt đối trong mọi tình huống, không có sai số",
        "en": "A moving average always yields an absolutely accurate forecast in every situation, with no error",
        "ja": "移動平均はあらゆる状況において常に絶対的に正確な予測結果をもたらし、誤差は一切ない"
      },
      {
        "vi": "Trung bình động không thể áp dụng cho bất kỳ loại dữ liệu tiến độ kiểm thử nào",
        "en": "A moving average cannot be applied to any type of test progress data",
        "ja": "移動平均はいかなる種類のテスト進捗データにも適用できない"
      },
      {
        "vi": "Trung bình động chỉ có thể tính toán bằng tay, không thể tự động hóa trong công cụ báo cáo",
        "en": "A moving average can only be calculated by hand and cannot be automated in reporting tools",
        "ja": "移動平均は手作業でのみ計算可能であり、報告ツールで自動化することはできない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Đặc tính cố hữu của trung bình động là độ trễ (lag) do làm mượt dữ liệu bằng cách lấy trung bình các kỳ trước, nên phản ứng chậm với thay đổi đột ngột; chuyên gia CTEL cần bổ sung phân tích nguyên nhân định tính khi dự báo tiến độ, không nên chỉ máy móc theo con số làm mượt.",
      "en": "An inherent property of the moving average is lag, caused by smoothing via averaging prior periods, making it slow to react to sudden change; a CTEL expert should supplement it with qualitative root-cause analysis when forecasting progress, rather than mechanically following the smoothed figure alone.",
      "ja": "移動平均に内在する特性は、過去期間の平均によって平滑化することで生じる遅れ(ラグ)であり、急激な変化への反応が遅い。CTEL専門家は進捗予測において、平滑化された数値だけを機械的に追うのではなく、定性的な根本原因分析を補完する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi lựa chọn bộ chỉ số KPI cho hoạt động kiểm thử ở cấp tổ chức, tiêu chí SMART (Specific, Measurable, Achievable, Relevant, Time-bound) áp dụng như thế nào để tránh việc đo lường trở nên vô nghĩa?",
      "en": "When selecting a KPI set for organization-level testing, how should the SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound) be applied to avoid measurement becoming meaningless?",
      "ja": "組織レベルのテスト活動向けKPIセットを選定する際、測定が無意味にならないようにSMART基準(具体的、測定可能、達成可能、関連性、期限)をどのように適用すべきか。"
    },
    "options": [
      {
        "vi": "Chọn càng nhiều chỉ số càng tốt, không cần ràng buộc bởi bất kỳ tiêu chí nào",
        "en": "Select as many metrics as possible, without being constrained by any criteria",
        "ja": "何らかの基準に制約されることなく、できるだけ多くの指標を選ぶ"
      },
      {
        "vi": "Mỗi chỉ số phải gắn với mục tiêu cụ thể của tổ chức (Relevant), có thể đo lường khách quan (Measurable), khả thi trong nguồn lực hiện có (Achievable), và có mốc thời gian rõ ràng để đánh giá xu hướng cải thiện (Time-bound), tránh thu thập chỉ số chỉ vì \"dễ lấy\" nhưng không phục vụ mục tiêu chiến lược nào",
        "en": "Each metric must tie to a specific organizational goal (Relevant), be objectively measurable (Measurable), feasible with available resources (Achievable), and have a clear timeframe for evaluating improvement trends (Time-bound), avoiding metrics collected merely because they are \"easy to get\" but serve no strategic goal",
        "ja": "各指標は組織の具体的な目標に結びつき(Relevant)、客観的に測定可能で(Measurable)、利用可能なリソースの範囲で実現可能であり(Achievable)、改善傾向を評価するための明確な期間を持つべき(Time-bound)であり、単に「取得しやすい」という理由だけで戦略目標に資さない指標を収集することは避けるべきである"
      },
      {
        "vi": "Sao chép nguyên bộ KPI của một tổ chức khác nổi tiếng mà không điều chỉnh theo bối cảnh riêng",
        "en": "Copy the exact KPI set of another well-known organization without adapting it to the local context",
        "ja": "独自の状況に合わせて調整することなく、他の有名な組織のKPIセットをそのままコピーする"
      },
      {
        "vi": "Chỉ cần chỉ số đo lường được (measurable) là đủ, các khía cạnh còn lại không quan trọng",
        "en": "It is enough for a metric to just be measurable; the other aspects do not matter",
        "ja": "指標が測定可能であればそれで十分であり、他の側面は重要ではない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Áp dụng SMART giúp bộ KPI kiểm thử luôn gắn kết với mục tiêu kinh doanh, tránh hiện tượng đo lường vì đo lường (vanity metrics) — vấn đề phổ biến khi tổ chức thu thập số liệu dễ lấy nhưng không phục vụ quyết định chiến lược nào.",
      "en": "Applying SMART ensures the test KPI set stays tied to business goals and avoids vanity metrics — a common problem when an organization collects easily obtained figures that serve no strategic decision.",
      "ja": "SMART基準を適用することで、テストKPIセットは常にビジネス目標と結びつき、バニティメトリクス(見かけだけの指標)の問題を回避できる。これは、組織が取得しやすいが戦略的意思決定に資さない数値を収集してしまう際によく見られる問題である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Phân bố Weibull được ứng dụng trong phân tích độ tin cậy phần mềm nâng cao chủ yếu để mô hình hóa điều gì mà các mô hình đơn giản hơn (như phân bố mũ với tỷ lệ lỗi không đổi) không thể hiện được?",
      "en": "The Weibull distribution, used in advanced software reliability analysis, primarily models what phenomenon that simpler models (such as the exponential distribution with a constant failure rate) cannot capture?",
      "ja": "高度なソフトウェア信頼性分析で使用されるワイブル分布は、より単純なモデル(一定の故障率を仮定する指数分布など)では表現できない、主に何を モデル化するために用いられるか。"
    },
    "options": [
      {
        "vi": "Số lượng tuyệt đối các ca kiểm thử cần thực hiện để đạt độ bao phủ 100%",
        "en": "The absolute number of test cases needed to achieve 100% coverage",
        "ja": "100%のカバレッジを達成するために必要なテストケースの絶対数"
      },
      {
        "vi": "Tỷ lệ lỗi luôn không đổi tuyệt đối trong suốt vòng đời sản phẩm",
        "en": "An absolutely constant failure rate throughout the product's entire lifecycle",
        "ja": "製品ライフサイクル全体を通じて絶対的に一定の故障率"
      },
      {
        "vi": "Tỷ lệ lỗi thay đổi theo thời gian (tăng, giảm hoặc theo hình \"bồn tắm\"), cho phép phản ánh thực tế rằng lỗi có thể giảm dần khi hệ thống ổn định (giai đoạn hao mòn ban đầu) rồi lại tăng khi hệ thống lão hóa hoặc thay đổi tích lũy",
        "en": "A failure rate that changes over time (increasing, decreasing, or bathtub-shaped), reflecting the reality that failures may decrease as the system stabilizes (early wear-in) and later increase as the system ages or accumulates change",
        "ja": "時間とともに変化する故障率(増加、減少、あるいはバスタブ型)であり、システムが安定するにつれて故障が減少し(初期摩耗期)、その後システムが老朽化または変更が蓄積するにつれて再び増加するという現実を反映できる"
      },
      {
        "vi": "Chi phí nhân sự cần thiết cho từng giai đoạn của dự án",
        "en": "The staffing cost required for each phase of the project",
        "ja": "プロジェクトの各段階に必要な人員コスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Phân bố Weibull linh hoạt hơn phân bố mũ nhờ tham số hình dạng (shape parameter) cho phép mô hình hóa tỷ lệ lỗi tăng, giảm hoặc theo đường cong bồn tắm, phù hợp để dự báo độ tin cậy thực tế của hệ thống phần mềm phức tạp qua các giai đoạn vòng đời khác nhau.",
      "en": "The Weibull distribution is more flexible than the exponential thanks to its shape parameter, allowing modeling of increasing, decreasing, or bathtub-curve failure rates, making it suitable for forecasting the real reliability of complex software systems across different lifecycle stages.",
      "ja": "ワイブル分布は形状パラメータのおかげで指数分布より柔軟であり、増加、減少、あるいはバスタブ曲線型の故障率をモデル化できるため、複雑なソフトウェアシステムのライフサイクルの異なる段階における実際の信頼性を予測するのに適している。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thực hiện đối chuẩn (benchmarking) chỉ số mật độ lỗi (defect density) giữa dự án của tổ chức mình với số liệu ngành công bố công khai, chuyên gia CTEL cần thận trọng với yếu tố nào để tránh so sánh sai lệch?",
      "en": "When benchmarking defect density between one's own organization's project and publicly published industry figures, what factor should a CTEL expert be cautious of to avoid a misleading comparison?",
      "ja": "自組織のプロジェクトの欠陥密度を公開されている業界データとベンチマーキングする際、CTEL専門家が誤った比較を避けるために注意すべき要素は何か。"
    },
    "options": [
      {
        "vi": "Không cần thận trọng gì cả vì mọi số liệu mật độ lỗi trên toàn ngành đều được đo bằng phương pháp hoàn toàn giống nhau",
        "en": "No caution is needed at all, since every industry defect density figure is measured using an identical methodology",
        "ja": "業界全体のあらゆる欠陥密度データは完全に同一の方法論で測定されているため、注意は不要である"
      },
      {
        "vi": "Đối chuẩn chỉ có ý nghĩa khi so sánh với chính đối thủ cạnh tranh trực tiếp, không bao giờ nên dùng số liệu ngành chung",
        "en": "Benchmarking is only meaningful when compared against a direct competitor, and general industry figures should never be used",
        "ja": "ベンチマーキングは直接の競合他社と比較する場合にのみ意味があり、業界全体のデータは決して使うべきではない"
      },
      {
        "vi": "Chỉ cần lấy số liệu từ một bài báo duy nhất là đủ độ tin cậy để đưa ra kết luận cho toàn tổ chức",
        "en": "Data from a single article alone is sufficiently reliable to draw conclusions for the entire organization",
        "ja": "1本の記事から得たデータだけで組織全体の結論を出すのに十分な信頼性がある"
      },
      {
        "vi": "Sự khác biệt về định nghĩa \"lỗi\" (mức độ nghiêm trọng nào được tính), đơn vị kích thước (dòng mã, điểm chức năng), giai đoạn thu thập dữ liệu, và bối cảnh miền ứng dụng (an toàn tính mạng vs. nội bộ) giữa các nguồn số liệu có thể khiến việc so sánh trực tiếp trở nên vô nghĩa hoặc gây hiểu lầm nếu không chuẩn hóa trước",
        "en": "Differences in the definition of \"defect\" (which severity levels are counted), size unit (lines of code vs. function points), data collection stage, and application domain context (safety-critical vs. internal) across data sources can make a direct comparison meaningless or misleading unless normalized first",
        "ja": "「欠陥」の定義(どの深刻度レベルを含めるか)、サイズ単位(コード行数か機能点数か)、データ収集段階、アプリケーションドメインの文脈(安全性が重要なシステムか社内システムか)などがデータソース間で異なることがあり、事前に正規化しない限り直接比較は無意味または誤解を招く可能性がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đối chuẩn có giá trị chỉ khi số liệu được chuẩn hóa về cùng định nghĩa và đơn vị đo; bỏ qua sự khác biệt về ngữ cảnh, định nghĩa lỗi và giai đoạn thu thập là sai lầm phổ biến khiến kết luận đối chuẩn gây hiểu lầm cho ban lãnh đạo.",
      "en": "Benchmarking is valuable only when figures are normalized to the same definitions and units; ignoring differences in context, defect definition, and collection stage is a common mistake that leads to misleading conclusions for leadership.",
      "ja": "ベンチマーキングは、数値が同じ定義と単位に正規化されている場合にのみ価値がある。文脈、欠陥の定義、収集段階の違いを無視することはよくある誤りであり、経営陣に誤解を招く結論をもたらす。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Biểu đồ burn-down/burn-up dùng để theo dõi tiến độ kiểm thử trong sprint có hạn chế cố hữu nào mà nhà quản lý kiểm thử cấp cao cần nhận diện khi diễn giải cho lãnh đạo?",
      "en": "What inherent limitation of burn-down/burn-up charts used to track test progress in a sprint should a senior test manager recognize when interpreting them for leadership?",
      "ja": "スプリント内のテスト進捗を追跡するために使用されるバーンダウン/バーンアップチャートには、上級テストマネージャーが経営陣への説明において認識すべきどのような内在的限界があるか。"
    },
    "options": [
      {
        "vi": "Biểu đồ thể hiện số lượng công việc còn lại (ví dụ số ca kiểm thử) nhưng không tự động phản ánh chất lượng hay độ khó thực sự của phần việc còn lại, nên đường biểu đồ \"đẹp\" có thể che giấu rủi ro nếu các ca kiểm thử phức tạp nhất bị dồn lại cuối sprint",
        "en": "The chart shows the quantity of remaining work (e.g., number of test cases) but does not automatically reflect the quality or true difficulty of what remains, so a chart that \"looks good\" can mask risk if the most complex test cases are left until the end of the sprint",
        "ja": "チャートは残作業の量(例:残りのテストケース数)を示すが、残作業の実際の質や難易度を自動的には反映しないため、最も複雑なテストケースがスプリント終盤に先送りされている場合、「見た目の良い」チャートがリスクを隠してしまう可能性がある"
      },
      {
        "vi": "Biểu đồ burn-down luôn phản ánh chính xác 100% chất lượng sản phẩm cuối cùng",
        "en": "A burn-down chart always accurately reflects 100% of the final product's quality",
        "ja": "バーンダウンチャートは常に最終製品の品質を100%正確に反映する"
      },
      {
        "vi": "Biểu đồ burn-down chỉ có thể vẽ được bằng tay, không thể tích hợp vào công cụ quản lý dự án Agile",
        "en": "A burn-down chart can only be drawn by hand and cannot be integrated into Agile project management tools",
        "ja": "バーンダウンチャートは手作業でしか作成できず、アジャイルプロジェクト管理ツールに統合できない"
      },
      {
        "vi": "Biểu đồ burn-down không bao giờ được sử dụng trong các dự án Agile thực tế",
        "en": "Burn-down charts are never used in real-world Agile projects",
        "ja": "バーンダウンチャートは実際のアジャイルプロジェクトでは決して使用されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Burn-down/burn-up đo số lượng, không đo độ phức tạp hay rủi ro của công việc còn lại; chuyên gia CTEL cần bổ sung phân tích định tính (ví dụ mức độ rủi ro của các ca kiểm thử còn lại) để tránh báo cáo lạc quan giả tạo lên lãnh đạo.",
      "en": "Burn-down/burn-up charts measure quantity, not the complexity or risk of the remaining work; a CTEL expert must supplement them with qualitative analysis (e.g., the risk level of remaining test cases) to avoid presenting false optimism to leadership.",
      "ja": "バーンダウン/バーンアップチャートは量を測定するものであり、残作業の複雑さやリスクを測定するものではない。CTEL専門家は、経営陣への誤った楽観的報告を避けるため、定性的分析(例えば残りのテストケースのリスクレベル)で補完する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi theo dõi xu hướng \"mức độ phơi nhiễm rủi ro\" (risk exposure = xác suất x mức độ ảnh hưởng) của các hạng mục kiểm thử theo thời gian trong một chương trình kiểm thử dựa trên rủi ro (risk-based testing), giá trị quản lý chiến lược của việc này là gì?",
      "en": "When tracking the trend of risk exposure (probability × impact) for test items over time within a risk-based testing program, what strategic management value does this provide?",
      "ja": "リスクベースドテストプログラムにおいて、テスト項目のリスクエクスポージャー(確率×影響度)の傾向を時系列で追跡することには、どのような戦略的管理価値があるか。"
    },
    "options": [
      {
        "vi": "Không có giá trị quản lý nào vì rủi ro không thể thay đổi theo thời gian một khi đã được xác định ban đầu",
        "en": "No management value at all, since risk cannot change over time once initially identified",
        "ja": "リスクは初期に特定された後は時間とともに変化しないため、管理上の価値はない"
      },
      {
        "vi": "Cho phép nhà quản lý thấy được rủi ro nào đang giảm nhờ hoạt động giảm thiểu (ví dụ đã kiểm thử kỹ) và rủi ro nào đang gia tăng (ví dụ do thay đổi mã nguồn gần đây), từ đó tái phân bổ nguồn lực kiểm thử linh hoạt theo thời gian thực thay vì giữ nguyên kế hoạch ban đầu đã lỗi thời",
        "en": "It lets managers see which risks are decreasing due to mitigation activity (e.g., thoroughly tested) and which are increasing (e.g., due to recent code churn), enabling dynamic real-time reallocation of test resources rather than sticking to an outdated initial plan",
        "ja": "軽減活動(十分にテスト済みなど)によって低下しているリスクと、(最近のコード変更などにより)増加しているリスクをマネージャーが把握できるようにし、時代遅れとなった当初の計画に固執するのではなく、テストリソースをリアルタイムで動的に再配分できるようにする"
      },
      {
        "vi": "Chỉ có giá trị về mặt tài liệu lưu trữ, không phục vụ quyết định gì trong thực tế",
        "en": "It has only archival documentation value and serves no real decision-making purpose",
        "ja": "文書保存としての価値しかなく、実際の意思決定には役立たない"
      },
      {
        "vi": "Chỉ áp dụng được cho dự án có ngân sách không giới hạn",
        "en": "It is applicable only to projects with an unlimited budget",
        "ja": "予算が無制限のプロジェクトにのみ適用可能である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Risk exposure là đại lượng động, thay đổi theo thời gian khi mã nguồn thay đổi và hoạt động kiểm thử tiến triển; theo dõi xu hướng cho phép nhà quản lý kiểm thử cấp chuyên gia tái ưu tiên hóa và tái phân bổ nguồn lực một cách thích ứng, đúng tinh thần kiểm thử dựa trên rủi ro.",
      "en": "Risk exposure is a dynamic quantity that changes over time as code changes and testing progresses; trend tracking lets an expert-level test manager re-prioritize and reallocate resources adaptively, in keeping with the spirit of risk-based testing.",
      "ja": "リスクエクスポージャーは、コードの変更やテストの進行に伴い時間とともに変化する動的な量である。傾向を追跡することで、エキスパートレベルのテストマネージャーはリスクベースドテストの精神に沿って、適応的に優先順位とリソース配分を見直すことができる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi ứng dụng phân tích dự đoán dựa trên dữ liệu lịch sử (bao gồm cả các kỹ thuật học máy đơn giản) để xác định các mô-đun có khả năng cao chứa nhiều lỗi (defect-prone modules) trong bản phát hành tiếp theo, hạn chế quan trọng nào cần được nêu rõ khi trình bày kết quả?",
      "en": "When applying predictive analytics based on historical data (including simple machine learning techniques) to identify defect-prone modules likely to appear in the next release, what important limitation must be clearly stated when presenting results?",
      "ja": "過去データに基づく予測分析(単純な機械学習技術を含む)を用いて次期リリースで欠陥が多く発生しそうなモジュール(defect-prone modules)を特定する際、結果を提示する際に明示すべき重要な限界は何か。"
    },
    "options": [
      {
        "vi": "Mô hình dự đoán không cần dữ liệu lịch sử, chỉ cần trực giác của một chuyên gia duy nhất",
        "en": "The predictive model requires no historical data, only the intuition of a single expert",
        "ja": "予測モデルは過去データを必要とせず、一人の専門家の直感のみで十分である"
      },
      {
        "vi": "Mô hình dự đoán luôn đúng 100% và có thể thay thế hoàn toàn việc kiểm thử các mô-đun không được gắn cờ",
        "en": "The predictive model is always 100% correct and can completely replace testing of modules not flagged",
        "ja": "予測モデルは常に100%正しく、フラグが立てられなかったモジュールのテストを完全に代替できる"
      },
      {
        "vi": "Mô hình dự đoán dựa trên các đặc trưng lịch sử (ví dụ độ phức tạp mã, tần suất thay đổi, lịch sử lỗi) chỉ đưa ra xác suất/ưu tiên tương đối để tập trung kiểm thử, không phải là khẳng định chắc chắn mô-đun đó chắc chắn có lỗi hay module khác chắc chắn không có lỗi, nên vẫn cần chiến lược kiểm thử bao phủ hợp lý cho toàn hệ thống",
        "en": "A model based on historical features (e.g., code complexity, churn rate, defect history) only provides a relative probability/priority for focusing test effort, not a certainty that a flagged module definitely contains defects or that other modules are defect-free, so a reasonably broad test coverage strategy for the whole system is still needed",
        "ja": "過去の特徴量(コードの複雑さ、変更頻度、欠陥履歴など)に基づくモデルは、テスト労力を集中させるための相対的な確率・優先順位を示すに過ぎず、指摘されたモジュールに必ず欠陥があること、あるいは他のモジュールに欠陥がないことを保証するものではないため、システム全体に対する合理的なカバレッジ戦略は依然として必要である"
      },
      {
        "vi": "Mô hình dự đoán chỉ hoạt động với phần mềm viết bằng một ngôn ngữ lập trình duy nhất trên toàn thế giới",
        "en": "The predictive model works only with software written in a single programming language worldwide",
        "ja": "予測モデルは世界中で単一のプログラミング言語で書かれたソフトウェアにのみ機能する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mô hình dự đoán defect-prone module cung cấp thông tin xác suất để ưu tiên hóa nguồn lực kiểm thử một cách có mục tiêu, không phải chân lý tuyệt đối; chuyên gia CTEL cần truyền đạt rõ giới hạn này để tránh bỏ sót kiểm thử ở các mô-đun \"có vẻ an toàn\" nhưng thực chất vẫn có rủi ro.",
      "en": "A defect-prone module prediction model provides probabilistic information to target test resource prioritization, not absolute truth; a CTEL expert must clearly communicate this limitation to avoid under-testing modules that \"appear safe\" but still carry risk.",
      "ja": "欠陥多発モジュール予測モデルは、テストリソースの優先順位付けを目的的に行うための確率的情報を提供するものであり、絶対的な真実ではない。CTEL専門家は、「安全に見える」が実際にはリスクを抱えるモジュールのテスト不足を避けるため、この限界を明確に伝える必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đo lường kiểm thử nâng cao, \"hiệu quả kiểm thử\" (test effectiveness — khả năng tìm ra lỗi thực sự tồn tại) khác với \"hiệu suất kiểm thử\" (test efficiency — nguồn lực tiêu tốn để tìm ra lỗi) như thế nào, và tại sao việc phân biệt này quan trọng khi báo cáo lên ban lãnh đạo?",
      "en": "In advanced test measurement, how does test effectiveness (the ability to find defects that actually exist) differ from test efficiency (the resources spent to find them), and why does this distinction matter when reporting to leadership?",
      "ja": "高度なテスト測定において、テスト有効性(test effectiveness、実際に存在する欠陥を発見する能力)とテスト効率性(test efficiency、欠陥発見に費やされたリソース)はどう異なり、経営陣への報告においてこの区別がなぜ重要なのか。"
    },
    "options": [
      {
        "vi": "Hai khái niệm hoàn toàn giống nhau và có thể dùng thay thế cho nhau trong mọi báo cáo",
        "en": "The two concepts are entirely identical and can be used interchangeably in every report",
        "ja": "両概念は完全に同一であり、あらゆる報告書で互換的に使用できる"
      },
      {
        "vi": "Chỉ cần đo hiệu suất là đủ vì hiệu suất cao chắc chắn kéo theo hiệu quả cao",
        "en": "It is sufficient to measure efficiency alone, since high efficiency always guarantees high effectiveness",
        "ja": "効率性を測定するだけで十分であり、高い効率性は必ず高い有効性を伴う"
      },
      {
        "vi": "Hiệu quả kiểm thử chỉ áp dụng cho kiểm thử thủ công, còn hiệu suất chỉ áp dụng cho kiểm thử tự động",
        "en": "Test effectiveness applies only to manual testing, while efficiency applies only to automated testing",
        "ja": "テスト有効性は手動テストにのみ適用され、効率性は自動テストにのみ適用される"
      },
      {
        "vi": "Một đội có thể đạt hiệu suất cao (tìm được nhiều lỗi với ít chi phí/thời gian) nhưng hiệu quả thấp (bỏ sót nhiều lỗi nghiêm trọng) hoặc ngược lại; do đó cần báo cáo cả hai chỉ số song song để lãnh đạo không hiểu lầm rằng \"kiểm thử nhanh, rẻ\" đồng nghĩa với \"kiểm thử tốt, đủ tin cậy\"",
        "en": "A team can have high efficiency (finding many defects with little cost/time) yet low effectiveness (missing many critical defects), or vice versa; therefore both metrics must be reported together so leadership does not mistake \"fast, cheap testing\" for \"good, sufficiently reliable testing\"",
        "ja": "あるチームは高い効率性(少ないコスト・時間で多くの欠陥を発見)を持ちながら、低い有効性(重大な欠陥を多く見逃す)である場合、あるいはその逆もあり得る。したがって、経営陣が「速く安価なテスト」を「良い、十分に信頼できるテスト」と誤解しないよう、両方の指標を並行して報告する必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Effectiveness (đạt mục tiêu — tìm đúng lỗi quan trọng) và efficiency (tối ưu nguồn lực) là hai chiều đo độc lập; một chương trình kiểm thử \"rẻ và nhanh\" chưa chắc \"tốt\", nên chuyên gia CTEL cần trình bày cả hai để tránh đánh giá sai lệch về chất lượng thực sự khi ra quyết định chiến lược.",
      "en": "Effectiveness (achieving the goal—finding the truly important defects) and efficiency (optimizing resource use) are independent dimensions; a \"cheap and fast\" test program is not necessarily \"good,\" so a CTEL expert must present both to avoid a skewed assessment of true quality when making strategic decisions.",
      "ja": "有効性(目標達成、すなわち本当に重要な欠陥を発見すること)と効率性(リソース使用の最適化)は独立した次元である。「安く速い」テストプログラムが必ずしも「良い」とは限らないため、CTEL専門家は戦略的意思決定における真の品質評価の歪みを避けるため、両方を提示する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong mô hình TMMi, đơn vị mức 2 (Managed) gồm những Process Area nào?",
      "en": "In the TMMi model, which Process Areas belong to Maturity Level 2 (Managed)?",
      "ja": "TMMiモデルにおいて、成熟度レベル2(Managed)に属するプロセスエリアはどれか。"
    },
    "options": [
      {
        "vi": "Test Policy and Strategy, Test Planning, Test Monitoring and Control, Test Design and Execution, Test Environment",
        "en": "Test Policy and Strategy, Test Planning, Test Monitoring and Control, Test Design and Execution, Test Environment",
        "ja": "テストポリシーと戦略、テスト計画、テストの監視と制御、テスト設計と実行、テスト環境"
      },
      {
        "vi": "Test Organization, Test Training Program, Test Lifecycle and Integration, Non-functional Testing, Peer Reviews",
        "en": "Test Organization, Test Training Program, Test Lifecycle and Integration, Non-functional Testing, Peer Reviews",
        "ja": "テスト組織、テストトレーニングプログラム、テストライフサイクルと統合、非機能テスト、ピアレビュー"
      },
      {
        "vi": "Test Measurement, Product Quality Evaluation, Advanced Reviews",
        "en": "Test Measurement, Product Quality Evaluation, Advanced Reviews",
        "ja": "テスト測定、製品品質評価、高度レビュー"
      },
      {
        "vi": "Defect Prevention, Quality Control, Test Process Optimization",
        "en": "Defect Prevention, Quality Control, Test Process Optimization",
        "ja": "欠陥予防、品質コントロール、テストプロセス最適化"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mức 2 (Managed) của TMMi thiết lập nền tảng quản lý kiểm thử ở cấp dự án gồm 5 process area nêu trên; các process area còn lại thuộc mức 3, 4, 5.",
      "en": "TMMi Level 2 (Managed) establishes project-level test management foundations with these five process areas; the others belong to Levels 3, 4 and 5.",
      "ja": "TMMiレベル2(Managed)は、上記5つのプロセスエリアによりプロジェクトレベルのテスト管理基盤を確立する。他の選択肢はレベル3、4、5に属する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Process Area nào ở TMMi mức 3 chịu trách nhiệm thiết lập cấu trúc tổ chức kiểm thử độc lập, vai trò và trách nhiệm test manager/tester trên toàn tổ chức?",
      "en": "Which TMMi Level 3 Process Area is responsible for establishing an independent test organization structure and organization-wide test manager/tester roles?",
      "ja": "独立したテスト組織構造と組織全体でのテストマネージャー/テスターの役割を確立する責任を持つTMMiレベル3のプロセスエリアはどれか。"
    },
    "options": [
      {
        "vi": "Test Training Program",
        "en": "Test Training Program",
        "ja": "テストトレーニングプログラム"
      },
      {
        "vi": "Test Organization",
        "en": "Test Organization",
        "ja": "テスト組織(Test Organization)"
      },
      {
        "vi": "Test Lifecycle and Integration",
        "en": "Test Lifecycle and Integration",
        "ja": "テストライフサイクルと統合"
      },
      {
        "vi": "Peer Reviews",
        "en": "Peer Reviews",
        "ja": "ピアレビュー"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Organization thuộc mức 3 tập trung xây dựng chức năng kiểm thử độc lập cấp tổ chức, xác định vai trò, trách nhiệm và con đường nghề nghiệp cho tester.",
      "en": "Test Organization at Level 3 focuses on establishing an organization-wide independent test function, defining roles, responsibilities and career paths for testers.",
      "ja": "レベル3のTest Organizationは組織全体で独立したテスト機能を確立し、テスターの役割・責任・キャリアパスを定義することに焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Tại sao TMMi mức 3 yêu cầu tích hợp quy trình kiểm thử (Test Lifecycle and Integration) với vòng đời phát triển phần mềm, thay vì để kiểm thử là hoạt động tách biệt?",
      "en": "Why does TMMi Level 3 require integrating the test process (Test Lifecycle and Integration) with the software development lifecycle rather than treating testing as an isolated activity?",
      "ja": "なぜTMMiレベル3では、テストを独立した活動として扱うのではなく、テストプロセス(Test Lifecycle and Integration)をソフトウェア開発ライフサイクルに統合することを要求するのか。"
    },
    "options": [
      {
        "vi": "Để loại bỏ hoàn toàn nhu cầu viết test plan riêng cho từng dự án",
        "en": "To completely eliminate the need for project-specific test plans",
        "ja": "プロジェクトごとのテスト計画書作成を完全に不要にするため"
      },
      {
        "vi": "Để cho phép test manager toàn quyền quyết định release mà không cần phối hợp với dev",
        "en": "To let the test manager decide releases unilaterally without coordinating with dev",
        "ja": "テストマネージャーが開発チームと調整せずにリリースを独断で決定できるようにするため"
      },
      {
        "vi": "Để đảm bảo kiểm thử được lập kế hoạch và thực hiện song song với các giai đoạn phát triển, phát hiện lỗi sớm và giảm chi phí sửa lỗi",
        "en": "To ensure testing is planned and executed in parallel with development phases, catching defects earlier and reducing fix costs",
        "ja": "テストを開発フェーズと並行して計画・実施し、欠陥を早期に検出して修正コストを削減するため"
      },
      {
        "vi": "Để chuyển toàn bộ trách nhiệm kiểm thử sang bộ phận QA độc lập không liên quan dự án",
        "en": "To shift all testing responsibility to an independent QA unit unrelated to the project",
        "ja": "テストの全責任をプロジェクトと無関係な独立QA部門に移すため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tích hợp kiểm thử vào vòng đời phát triển giúp phát hiện lỗi sớm, giảm chi phí sửa và tránh kiểm thử trở thành nút thắt cuối dự án.",
      "en": "Integrating testing into the development lifecycle enables early defect detection, lowers fix costs, and avoids testing becoming a late-stage bottleneck.",
      "ja": "テストを開発ライフサイクルに統合することで欠陥を早期に発見でき、修正コストを下げ、テストがプロジェクト終盤のボトルネックになることを防ぐ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức đạt TMMi mức 3 nhưng vẫn chưa có non-functional testing (kiểm thử hiệu năng, bảo mật, khả dụng) được đưa vào chiến lược kiểm thử chuẩn. Điều này vi phạm process area nào?",
      "en": "An organization at TMMi Level 3 still lacks non-functional testing (performance, security, usability) in its standard test strategy. Which process area is being violated?",
      "ja": "TMMiレベル3に到達した組織が、標準テスト戦略に非機能テスト(性能、セキュリティ、ユーザビリティ)をまだ組み込んでいない場合、どのプロセスエリアに違反しているか。"
    },
    "options": [
      {
        "vi": "Product Quality Evaluation",
        "en": "Product Quality Evaluation",
        "ja": "製品品質評価"
      },
      {
        "vi": "Test Environment",
        "en": "Test Environment",
        "ja": "テスト環境"
      },
      {
        "vi": "Test Monitoring and Control",
        "en": "Test Monitoring and Control",
        "ja": "テストの監視と制御"
      },
      {
        "vi": "Non-functional Testing",
        "en": "Non-functional Testing",
        "ja": "非機能テスト(Non-functional Testing)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Non-functional Testing là process area mức 3 yêu cầu tổ chức mở rộng phạm vi kiểm thử sang các thuộc tính chất lượng phi chức năng như hiệu năng, bảo mật, khả dụng.",
      "en": "Non-functional Testing is the Level 3 process area requiring organizations to expand test scope to quality attributes such as performance, security, and usability.",
      "ja": "非機能テストはレベル3のプロセスエリアで、組織がテスト範囲を性能・セキュリティ・ユーザビリティなどの非機能品質特性に拡大することを要求する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Peer Reviews ở TMMi mức 3 khác biệt cơ bản với hoạt động review không chính thức ở mức 1 như thế nào?",
      "en": "How does the Peer Reviews process area at TMMi Level 3 fundamentally differ from informal review activities at Level 1?",
      "ja": "TMMiレベル3のPeer Reviewsプロセスエリアは、レベル1における非公式なレビュー活動と根本的にどう異なるか。"
    },
    "options": [
      {
        "vi": "Peer Reviews được chuẩn hoá thành quy trình có định nghĩa, vai trò, tiêu chí vào/ra và được tích hợp có hệ thống vào vòng đời dự án",
        "en": "Peer Reviews are standardized into a defined process with roles, entry/exit criteria, and are systematically integrated into the project lifecycle",
        "ja": "ピアレビューが定義された役割・エントリ/エグジット基準を持つプロセスとして標準化され、プロジェクトライフサイクルに体系的に組み込まれる"
      },
      {
        "vi": "Peer Reviews chỉ được thực hiện bởi một cá nhân duy nhất là trưởng nhóm dự án",
        "en": "Peer Reviews are performed solely by a single individual, the project lead",
        "ja": "ピアレビューはプロジェクトリーダー一人だけによって実施される"
      },
      {
        "vi": "Peer Reviews thay thế hoàn toàn việc kiểm thử động (dynamic testing)",
        "en": "Peer Reviews completely replace dynamic testing",
        "ja": "ピアレビューは動的テストを完全に置き換える"
      },
      {
        "vi": "Peer Reviews chỉ áp dụng cho mã nguồn, không áp dụng cho tài liệu yêu cầu hay thiết kế",
        "en": "Peer Reviews apply only to source code, not to requirements or design documents",
        "ja": "ピアレビューはソースコードのみに適用され、要件や設計ドキュメントには適用されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ở mức 3, review trở thành quy trình chuẩn hoá tổ chức với vai trò, tiêu chí, checklist rõ ràng, thay vì tự phát tuỳ ý như mức 1.",
      "en": "At Level 3, reviews become an organization-standardized process with defined roles, criteria, and checklists, rather than ad-hoc as at Level 1.",
      "ja": "レベル3ではレビューは組織として標準化されたプロセスとなり、明確な役割・基準・チェックリストを持つ。レベル1のような場当たり的な実施ではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "TMMi mức 4 (Measured) giới thiệu process area Test Measurement với mục tiêu chính là gì?",
      "en": "What is the primary goal of the Test Measurement process area introduced at TMMi Level 4 (Measured)?",
      "ja": "TMMiレベル4(Measured)で導入されるTest Measurementプロセスエリアの主な目的は何か。"
    },
    "options": [
      {
        "vi": "Viết test case đầu tiên cho dự án",
        "en": "Write the project's first test case",
        "ja": "プロジェクトの最初のテストケースを作成すること"
      },
      {
        "vi": "Thiết lập chương trình đo lường định lượng cho quy trình và sản phẩm kiểm thử để hỗ trợ ra quyết định dựa trên dữ liệu",
        "en": "Establish a quantitative measurement program for the test process and product to support data-driven decision making",
        "ja": "データに基づく意思決定を支援するため、テストプロセスと製品の定量的測定プログラムを確立すること"
      },
      {
        "vi": "Thiết lập test policy ban đầu cho tổ chức",
        "en": "Establish the organization's initial test policy",
        "ja": "組織の初期テストポリシーを確立すること"
      },
      {
        "vi": "Đào tạo tester mới vào nghề",
        "en": "Train new testers entering the profession",
        "ja": "新人テスターを育成すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Measurement ở mức 4 tập trung xây dựng chương trình đo lường định lượng, thu thập số liệu có hệ thống để hỗ trợ quản lý dựa trên dữ kiện.",
      "en": "Test Measurement at Level 4 focuses on building a quantitative measurement program that systematically collects data to support fact-based management.",
      "ja": "レベル4のTest Measurementは、定量的測定プログラムを構築し、事実に基づく管理を支援するためにデータを体系的に収集することに焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Ở TMMi mức 4, process area Product Quality Evaluation yêu cầu điều gì mà mức 3 chưa có?",
      "en": "At TMMi Level 4, what does the Product Quality Evaluation process area require that Level 3 does not yet have?",
      "ja": "TMMiレベル4のProduct Quality Evaluationプロセスエリアは、レベル3にはまだ存在しない何を要求するか。"
    },
    "options": [
      {
        "vi": "Thiết lập môi trường kiểm thử cơ bản",
        "en": "Setting up a basic test environment",
        "ja": "基本的なテスト環境を構築すること"
      },
      {
        "vi": "Viết test case đầu tiên cho hệ thống",
        "en": "Writing the system's first test case",
        "ja": "システムの最初のテストケースを作成すること"
      },
      {
        "vi": "Định nghĩa mục tiêu chất lượng sản phẩm định lượng và đánh giá chất lượng dựa trên số liệu đo được trong suốt vòng đời",
        "en": "Defining quantitative product quality goals and evaluating quality based on measured data throughout the lifecycle",
        "ja": "定量的な製品品質目標を定義し、ライフサイクル全体で測定データに基づいて品質を評価すること"
      },
      {
        "vi": "Tạo checklist review đầu tiên cho tổ chức",
        "en": "Creating the organization's first review checklist",
        "ja": "組織初のレビューチェックリストを作成すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Product Quality Evaluation yêu cầu định nghĩa mục tiêu chất lượng định lượng và dùng số liệu đo lường để đánh giá khách quan chất lượng sản phẩm trong toàn vòng đời, đây là năng lực chỉ có từ mức 4.",
      "en": "Product Quality Evaluation requires defining quantitative quality goals and using measured data to objectively evaluate product quality throughout the lifecycle — a capability only present from Level 4 onward.",
      "ja": "Product Quality Evaluationは定量的な品質目標を定義し、測定データを用いてライフサイクル全体で製品品質を客観的に評価することを要求する。これはレベル4から初めて備わる能力である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Advanced Reviews (mức 4) khác Peer Reviews (mức 3) chủ yếu ở điểm nào?",
      "en": "How do Advanced Reviews (Level 4) mainly differ from Peer Reviews (Level 3)?",
      "ja": "Advanced Reviews(レベル4)はPeer Reviews(レベル3)と主にどう異なるか。"
    },
    "options": [
      {
        "vi": "Advanced Reviews loại bỏ hoàn toàn nhu cầu kiểm thử động sau đó",
        "en": "Advanced Reviews completely eliminate the need for subsequent dynamic testing",
        "ja": "Advanced Reviewsによりその後の動的テストは完全に不要になる"
      },
      {
        "vi": "Advanced Reviews không cần có moderator điều phối buổi review",
        "en": "Advanced Reviews do not require a moderator to facilitate the review session",
        "ja": "Advanced Reviewsではレビューを進行するモデレーターが不要である"
      },
      {
        "vi": "Advanced Reviews chỉ áp dụng cho tài liệu marketing, không áp dụng cho code",
        "en": "Advanced Reviews only apply to marketing documents, not code",
        "ja": "Advanced Reviewsはマーケティング文書のみに適用され、コードには適用されない"
      },
      {
        "vi": "Advanced Reviews sử dụng dữ liệu đo lường định lượng và kỹ thuật như reading technique để phát hiện lỗi sớm dựa trên số liệu lịch sử",
        "en": "Advanced Reviews use quantitative measurement data and techniques such as reading techniques to detect defects earlier based on historical data",
        "ja": "Advanced Reviewsは、過去の履歴データに基づき欠陥をより早期に検出するため、定量的測定データやリーディング技法などを活用する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Advanced Reviews ở mức 4 áp dụng số liệu đo lường và kỹ thuật đọc nâng cao (ví dụ perspective-based reading) để tối ưu hiệu quả phát hiện lỗi sớm, dựa trên nền tảng đo lường đã có ở mức 4.",
      "en": "Advanced Reviews at Level 4 apply measurement data and advanced reading techniques (e.g. perspective-based reading) to optimize early defect detection, building on the measurement foundation established at Level 4.",
      "ja": "レベル4のAdvanced Reviewsは、レベル4で確立された測定基盤を活かし、測定データや高度なリーディング技法(例:視点ベースリーディング)を用いて早期欠陥検出を最適化する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "TMMi mức 5 (Optimization) gồm những process area nào?",
      "en": "Which process areas make up TMMi Level 5 (Optimization)?",
      "ja": "TMMiレベル5(Optimization)を構成するプロセスエリアはどれか。"
    },
    "options": [
      {
        "vi": "Defect Prevention, Quality Control, Test Process Optimization",
        "en": "Defect Prevention, Quality Control, Test Process Optimization",
        "ja": "欠陥予防、品質コントロール、テストプロセス最適化"
      },
      {
        "vi": "Test Organization, Test Training Program, Peer Reviews",
        "en": "Test Organization, Test Training Program, Peer Reviews",
        "ja": "テスト組織、テストトレーニングプログラム、ピアレビュー"
      },
      {
        "vi": "Test Policy and Strategy, Test Planning, Test Environment",
        "en": "Test Policy and Strategy, Test Planning, Test Environment",
        "ja": "テストポリシーと戦略、テスト計画、テスト環境"
      },
      {
        "vi": "Test Measurement, Product Quality Evaluation",
        "en": "Test Measurement, Product Quality Evaluation",
        "ja": "テスト測定、製品品質評価"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mức 5 tập trung liên tục cải tiến và tối ưu quy trình dựa trên số liệu, gồm 3 process area: Defect Prevention, Quality Control, Test Process Optimization.",
      "en": "Level 5 focuses on continuous, data-driven process improvement through three process areas: Defect Prevention, Quality Control, and Test Process Optimization.",
      "ja": "レベル5はデータに基づく継続的なプロセス改善に焦点を当て、欠陥予防・品質コントロール・テストプロセス最適化の3プロセスエリアから構成される。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Defect Prevention ở TMMi mức 5 nhấn mạnh hoạt động nào là trọng tâm?",
      "en": "What activity does the Defect Prevention process area at TMMi Level 5 emphasize as its core focus?",
      "ja": "TMMiレベル5のDefect Preventionプロセスエリアが中心として重視する活動は何か。"
    },
    "options": [
      {
        "vi": "Viết nhiều test case hơn để tăng số lượng lỗi phát hiện",
        "en": "Writing more test cases simply to increase the number of defects found",
        "ja": "検出欠陥数を増やすためにテストケースを多く書くこと"
      },
      {
        "vi": "Phân tích nguyên nhân gốc rễ (root cause analysis) của lỗi đã phát hiện để ngăn ngừa tái diễn trong tương lai",
        "en": "Performing root cause analysis of detected defects to prevent recurrence in the future",
        "ja": "検出された欠陥の根本原因分析を行い、将来の再発を防止すること"
      },
      {
        "vi": "Tăng số lượng tester trong nhóm dự án",
        "en": "Increasing the number of testers on the project team",
        "ja": "プロジェクトチームのテスター人数を増やすこと"
      },
      {
        "vi": "Thiết lập test policy đầu tiên cho tổ chức",
        "en": "Establishing the organization's first test policy",
        "ja": "組織初のテストポリシーを確立すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Defect Prevention tập trung phân tích nguyên nhân gốc rễ để loại bỏ nguồn gốc sinh lỗi trong quy trình, thay vì chỉ phát hiện và sửa lỗi.",
      "en": "Defect Prevention focuses on root cause analysis to eliminate the sources of defects in the process, rather than merely finding and fixing them.",
      "ja": "欠陥予防は、単に欠陥を発見・修正するのではなく、根本原因分析によりプロセス上の欠陥発生源を排除することに焦点を当てる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Quality Control ở TMMi mức 5 sử dụng kỹ thuật thống kê nào để dự đoán và kiểm soát chất lượng sản phẩm?",
      "en": "Which statistical techniques does Quality Control at TMMi Level 5 use to predict and control product quality?",
      "ja": "TMMiレベル5のQuality Controlは、製品品質を予測・管理するためにどのような統計的手法を用いるか。"
    },
    "options": [
      {
        "vi": "Đếm số lượng tester tham gia dự án",
        "en": "Counting the number of testers assigned to the project",
        "ja": "プロジェクトに参加するテスター数を数える"
      },
      {
        "vi": "Chỉ dựa vào cảm nhận chủ quan của test manager",
        "en": "Relying solely on the test manager's subjective feeling",
        "ja": "テストマネージャーの主観的な感覚のみに頼る"
      },
      {
        "vi": "Kỹ thuật thống kê như biểu đồ kiểm soát và phân tích xu hướng dựa trên dữ liệu lịch sử để thiết lập giới hạn chất lượng và dự đoán chất lượng còn lại",
        "en": "Statistical techniques such as control charts and trend analysis based on historical data to set quality limits and predict remaining quality",
        "ja": "過去の履歴データに基づく管理図や傾向分析などの統計的手法により、品質限界を設定し残存品質を予測する"
      },
      {
        "vi": "Chỉ dùng báo cáo lỗi thủ công không có phân tích số liệu",
        "en": "Using only manual defect reports without any data analysis",
        "ja": "データ分析を伴わない手動の欠陥報告のみを使用する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Quality Control ở mức 5 áp dụng kỹ thuật thống kê định lượng như control chart, phân tích xu hướng để dự đoán chất lượng sản phẩm còn lại và ra quyết định release dựa trên số liệu khách quan.",
      "en": "Quality Control at Level 5 applies quantitative statistical techniques such as control charts and trend analysis to predict remaining product quality and support release decisions based on objective data.",
      "ja": "レベル5のQuality Controlは、管理図や傾向分析といった定量的統計手法を適用し、残存製品品質を予測し、客観的データに基づいてリリース判断を支援する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Test Process Optimization ở TMMi mức 5 khác Test Process Improvement chung chung ở điểm nào?",
      "en": "How does Test Process Optimization at TMMi Level 5 differ from generic test process improvement?",
      "ja": "TMMiレベル5のTest Process Optimizationは、一般的なテストプロセス改善とどう異なるか。"
    },
    "options": [
      {
        "vi": "Nó chỉ tập trung vào công cụ kiểm thử tự động, bỏ qua con người và quy trình",
        "en": "It focuses solely on test automation tools, ignoring people and process",
        "ja": "テスト自動化ツールのみに焦点を当て、人とプロセスを無視する"
      },
      {
        "vi": "Nó chỉ áp dụng một lần duy nhất khi tổ chức mới thành lập",
        "en": "It is applied only once, when the organization is first founded",
        "ja": "組織設立時に一度だけ適用される"
      },
      {
        "vi": "Nó thay thế hoàn toàn vai trò của test manager",
        "en": "It completely replaces the role of the test manager",
        "ja": "テストマネージャーの役割を完全に置き換える"
      },
      {
        "vi": "Nó thiết lập cơ chế liên tục, chính thức để thu thập bài học kinh nghiệm, xác định nguyên nhân gốc rễ vấn đề quy trình và thử nghiệm cải tiến có kiểm soát trước khi triển khai rộng",
        "en": "It establishes a continuous, formalized mechanism for capturing lessons learned, identifying root causes of process issues, and piloting improvements before broad rollout",
        "ja": "教訓を継続的かつ正式に収集し、プロセス上の問題の根本原因を特定し、広範な展開前に改善策を統制された形で試行するメカニズムを確立する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test Process Optimization thiết lập cơ chế cải tiến liên tục, có kiểm soát, dựa trên dữ liệu định lượng thu được từ các process area mức 4 và 5, khác với cải tiến chung chung, không hệ thống.",
      "en": "Test Process Optimization establishes a continuous, controlled improvement mechanism driven by quantitative data from Level 4 and 5 process areas, unlike ad-hoc, unsystematic improvement.",
      "ja": "Test Process Optimizationは、レベル4・5のプロセスエリアから得られる定量データに基づき、継続的かつ統制された改善メカニズムを確立する点で、体系性のない一般的な改善とは異なる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong mô hình staged (theo giai đoạn) của TMMi, một tổ chức muốn được chứng nhận mức 4 thì bắt buộc phải đạt điều gì trước?",
      "en": "In the staged TMMi model, what must an organization achieve first before being certified at Level 4?",
      "ja": "段階表現(staged)のTMMiモデルにおいて、組織がレベル4の認定を受けるためには、まず何を達成しなければならないか。"
    },
    "options": [
      {
        "vi": "Đạt đầy đủ tất cả process area của mức 2 và mức 3 trước đó",
        "en": "Fully achieve all process areas of the preceding Levels 2 and 3",
        "ja": "それ以前のレベル2とレベル3のすべてのプロセスエリアを完全に達成すること"
      },
      {
        "vi": "Chỉ cần có công cụ kiểm thử tự động hiện đại",
        "en": "Only need modern test automation tools",
        "ja": "最新のテスト自動化ツールを持っていればよい"
      },
      {
        "vi": "Chỉ cần có test policy bằng văn bản",
        "en": "Only need a written test policy",
        "ja": "文書化されたテストポリシーがあればよい"
      },
      {
        "vi": "Không cần tuân theo thứ tự, có thể đạt mức 4 trước mức 2",
        "en": "No order is required; Level 4 can be achieved before Level 2",
        "ja": "順序は不要で、レベル2より先にレベル4を達成できる"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Mô hình staged của TMMi yêu cầu tổ chức đạt tuần tự từng mức, mức sau kế thừa và mở rộng năng lực của mức trước, không thể bỏ qua mức 2, 3 để đạt thẳng mức 4.",
      "en": "The staged TMMi model requires sequential achievement of levels; each level builds on the previous one, so Levels 2 and 3 cannot be skipped to reach Level 4 directly.",
      "ja": "段階表現のTMMiモデルは各レベルを順番に達成することを要求し、上位レベルは下位レベルの能力を継承・拡張するため、レベル2・3を飛ばして直接レベル4に到達することはできない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Generic Goals (mục tiêu chung) trong TMMi có vai trò gì khác biệt so với Specific Goals của từng process area?",
      "en": "What distinct role do Generic Goals play in TMMi compared to the Specific Goals of each process area?",
      "ja": "TMMiにおけるGeneric Goals(共通目標)は、各プロセスエリアのSpecific Goals(固有目標)と比べてどのような異なる役割を果たすか。"
    },
    "options": [
      {
        "vi": "Generic Goals chỉ áp dụng riêng cho process area Test Planning",
        "en": "Generic Goals apply only to the Test Planning process area",
        "ja": "Generic GoalsはTest Planningプロセスエリアにのみ適用される"
      },
      {
        "vi": "Generic Goals mô tả năng lực về thể chế hoá (institutionalization) áp dụng chung cho mọi process area, đảm bảo quy trình được duy trì bền vững chứ không chỉ thực hiện một lần",
        "en": "Generic Goals describe institutionalization capabilities applicable across all process areas, ensuring the process is sustained rather than performed only once",
        "ja": "Generic Goalsは、プロセスが一度きりでなく持続的に維持されることを保証する、すべてのプロセスエリアに共通する制度化(institutionalization)の能力を記述する"
      },
      {
        "vi": "Generic Goals thay thế hoàn toàn Specific Goals và không cần Specific Practices",
        "en": "Generic Goals completely replace Specific Goals and no Specific Practices are needed",
        "ja": "Generic GoalsはSpecific Goalsを完全に置き換え、Specific Practicesは不要になる"
      },
      {
        "vi": "Generic Goals chỉ dùng để đo lường chi phí dự án",
        "en": "Generic Goals are used only to measure project cost",
        "ja": "Generic Goalsはプロジェクトコストの測定にのみ使用される"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Generic Goals liên quan đến việc thể chế hoá quy trình (chính sách, nguồn lực, giám sát) áp dụng xuyên suốt mọi process area, đảm bảo tính bền vững và lặp lại được của quy trình.",
      "en": "Generic Goals relate to institutionalizing processes (policy, resources, oversight) across every process area, ensuring the process is sustainable and repeatable.",
      "ja": "Generic Goalsはすべてのプロセスエリアに横断的に適用されるプロセスの制度化(方針、リソース、監督)に関わり、プロセスの持続可能性と反復可能性を保証する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức áp dụng continuous representation (biểu diễn liên tục) thay vì staged khi đánh giá TMMi thì có đặc điểm gì?",
      "en": "What characterizes an organization using continuous representation instead of staged representation when applying TMMi assessment?",
      "ja": "TMMi評価において段階表現(staged)ではなく連続表現(continuous)を採用する組織には、どのような特徴があるか。"
    },
    "options": [
      {
        "vi": "Tổ chức không cần đánh giá bất kỳ process area nào",
        "en": "The organization need not assess any process area",
        "ja": "組織はいかなるプロセスエリアも評価する必要がない"
      },
      {
        "vi": "Tổ chức bắt buộc phải đạt mức 5 ngay lập tức",
        "en": "The organization must achieve Level 5 immediately",
        "ja": "組織は直ちにレベル5を達成しなければならない"
      },
      {
        "vi": "Tổ chức có thể chọn cải tiến các process area theo thứ tự ưu tiên riêng phù hợp mục tiêu kinh doanh, thay vì bắt buộc theo trình tự mức cố định",
        "en": "The organization can choose to improve process areas in a custom priority order aligned with business goals, instead of a fixed level sequence",
        "ja": "組織は固定されたレベル順序に従うのではなく、事業目標に合わせて独自の優先順位でプロセスエリアを改善できる"
      },
      {
        "vi": "Tổ chức chỉ được áp dụng continuous representation cho dự án nhỏ dưới 5 người",
        "en": "Continuous representation can only be applied to projects with fewer than 5 people",
        "ja": "連続表現は5人未満の小規模プロジェクトにのみ適用できる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Continuous representation cho phép tổ chức linh hoạt chọn process area cần cải tiến trước theo nhu cầu kinh doanh, khác với staged buộc tuân theo trình tự mức cố định.",
      "en": "Continuous representation allows an organization flexibility to prioritize which process areas to improve first based on business needs, unlike staged representation which enforces a fixed level order.",
      "ja": "連続表現は、固定されたレベル順序を強制する段階表現とは異なり、事業ニーズに応じて改善するプロセスエリアを柔軟に優先順位付けできる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "TMMi khác CMMI ở điểm cốt lõi nào?",
      "en": "What is the core distinction between TMMi and CMMI?",
      "ja": "TMMiとCMMIの核心的な違いは何か。"
    },
    "options": [
      {
        "vi": "TMMi và CMMI hoàn toàn giống nhau về nội dung, chỉ khác tên gọi",
        "en": "TMMi and CMMI are identical in content, differing only in name",
        "ja": "TMMiとCMMIは内容が完全に同一で、名称のみが異なる"
      },
      {
        "vi": "TMMi chỉ áp dụng cho kiểm thử thủ công, CMMI chỉ áp dụng cho kiểm thử tự động",
        "en": "TMMi applies only to manual testing, CMMI applies only to automated testing",
        "ja": "TMMiは手動テストのみ、CMMIは自動テストのみに適用される"
      },
      {
        "vi": "TMMi không có khái niệm mức trưởng thành, CMMI có",
        "en": "TMMi has no maturity level concept while CMMI does",
        "ja": "TMMiには成熟度レベルの概念がなく、CMMIにはある"
      },
      {
        "vi": "TMMi tập trung chuyên sâu vào cải tiến quy trình kiểm thử, trong khi CMMI bao quát cải tiến quy trình phát triển phần mềm/kỹ thuật nói chung",
        "en": "TMMi focuses specifically on test process improvement, while CMMI addresses broader software/systems development process improvement",
        "ja": "TMMiはテストプロセス改善に特化しているのに対し、CMMIはソフトウェア/システム開発プロセス全般の改善を対象とする"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "TMMi được xây dựng bổ trợ CMMI, chuyên sâu về kiểm thử, trong khi CMMI có phạm vi rộng hơn bao quát toàn bộ quy trình phát triển kỹ thuật.",
      "en": "TMMi was designed as a complement to CMMI, focused specifically on testing, while CMMI has a broader scope covering the entire engineering development process.",
      "ja": "TMMiはCMMIを補完するものとして設計され、テストに特化している一方、CMMIはエンジニアリング開発プロセス全体を対象とするより広い範囲を持つ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức đạt TMMi mức 3 nhưng khi phỏng vấn, tester không thể mô tả rõ tiêu chí vào/ra của các giai đoạn test level (unit, integration, system, acceptance) khớp với vòng đời phát triển. Đây là dấu hiệu thiếu hụt của process area nào?",
      "en": "An organization is certified TMMi Level 3, but during interviews testers cannot clearly describe entry/exit criteria for test levels (unit, integration, system, acceptance) aligned with the development lifecycle. This signals a gap in which process area?",
      "ja": "TMMiレベル3に認定された組織で、インタビュー時にテスターが開発ライフサイクルに対応するテストレベル(単体、統合、システム、受け入れ)のエントリ/エグジット基準を明確に説明できない場合、これはどのプロセスエリアの不足を示すか。"
    },
    "options": [
      {
        "vi": "Test Lifecycle and Integration",
        "en": "Test Lifecycle and Integration",
        "ja": "テストライフサイクルと統合"
      },
      {
        "vi": "Test Training Program",
        "en": "Test Training Program",
        "ja": "テストトレーニングプログラム"
      },
      {
        "vi": "Defect Prevention",
        "en": "Defect Prevention",
        "ja": "欠陥予防"
      },
      {
        "vi": "Quality Control",
        "en": "Quality Control",
        "ja": "品質コントロール"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Lifecycle and Integration định nghĩa các test level, tiêu chí vào/ra và tích hợp chúng với vòng đời phát triển; thiếu rõ ràng ở đây là dấu hiệu process area này chưa thực thi tốt.",
      "en": "Test Lifecycle and Integration defines test levels, entry/exit criteria, and integrates them with the development lifecycle; lack of clarity here signals this process area is not well implemented.",
      "ja": "Test Lifecycle and Integrationはテストレベルとエントリ/エグジット基準を定義し、開発ライフサイクルと統合する。ここでの不明確さは、このプロセスエリアがうまく実装されていないことを示す。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "TMMi mức 2 process area Test Monitoring and Control cung cấp năng lực gì cho test manager?",
      "en": "What capability does the Test Monitoring and Control process area at TMMi Level 2 provide test managers?",
      "ja": "TMMiレベル2のTest Monitoring and Controlプロセスエリアは、テストマネージャーにどのような能力を提供するか。"
    },
    "options": [
      {
        "vi": "Tự động sinh mã nguồn cho tính năng mới",
        "en": "Automatically generating source code for new features",
        "ja": "新機能のソースコードを自動生成すること"
      },
      {
        "vi": "Theo dõi tiến độ kiểm thử so với kế hoạch và thực hiện hành động khắc phục khi có sai lệch đáng kể",
        "en": "Tracking test progress against the plan and taking corrective action when significant deviations occur",
        "ja": "計画に対するテスト進捗を追跡し、大きな乖離が生じた場合に是正措置を講じること"
      },
      {
        "vi": "Thiết kế kiến trúc hệ thống phần mềm",
        "en": "Designing the software system architecture",
        "ja": "ソフトウェアシステムのアーキテクチャを設計すること"
      },
      {
        "vi": "Xây dựng chương trình đào tạo nhân viên toàn công ty",
        "en": "Building a company-wide employee training program",
        "ja": "全社的な従業員研修プログラムを構築すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Monitoring and Control ở mức 2 cung cấp cơ chế theo dõi tiến độ thực tế so với kế hoạch kiểm thử và điều chỉnh kịp thời khi phát hiện lệch hướng.",
      "en": "Test Monitoring and Control at Level 2 provides mechanisms to track actual progress against the test plan and adjust promptly when deviations are detected.",
      "ja": "レベル2のTest Monitoring and Controlは、テスト計画に対する実際の進捗を追跡し、逸脱が検出された場合に迅速に調整する仕組みを提供する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Test Training Program ở TMMi mức 3 giải quyết rủi ro tổ chức nào rõ nhất?",
      "en": "Which organizational risk does the Test Training Program at TMMi Level 3 most directly address?",
      "ja": "TMMiレベル3のTest Training Programは、どの組織的リスクに最も直接的に対処するか。"
    },
    "options": [
      {
        "vi": "Máy chủ môi trường kiểm thử bị quá tải",
        "en": "Test environment servers being overloaded",
        "ja": "テスト環境サーバーの過負荷リスク"
      },
      {
        "vi": "Chi phí license công cụ kiểm thử tự động quá cao",
        "en": "Excessively high licensing costs for test automation tools",
        "ja": "テスト自動化ツールのライセンス費用が高すぎるリスク"
      },
      {
        "vi": "Thiếu kỹ năng và năng lực kiểm thử đồng bộ trong toàn tổ chức, dẫn đến chất lượng kiểm thử không nhất quán giữa các dự án",
        "en": "Lack of consistent testing skills and competence across the organization, leading to inconsistent test quality between projects",
        "ja": "組織全体で一貫したテストスキルと能力が不足し、プロジェクト間でテスト品質にばらつきが生じるリスク"
      },
      {
        "vi": "Thiếu tài liệu marketing sản phẩm",
        "en": "Lack of product marketing materials",
        "ja": "製品マーケティング資料の不足リスク"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test Training Program đảm bảo tester có kỹ năng đồng nhất trên toàn tổ chức thông qua chương trình đào tạo chính thức, giảm rủi ro chất lượng không đồng đều.",
      "en": "Test Training Program ensures testers have consistent skills organization-wide through a formal training program, reducing the risk of uneven quality.",
      "ja": "Test Training Programは正式な研修プログラムを通じて組織全体でテスターのスキルの一貫性を確保し、品質のばらつきリスクを低減する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một tổ chức TMMi mức 4 quyết định release sản phẩm dựa trên biểu đồ độ tin cậy phần mềm (reliability growth model) và ngưỡng mật độ lỗi còn lại dự đoán, đây là ứng dụng của process area nào?",
      "en": "When a TMMi Level 4 organization decides to release a product based on a software reliability growth model and predicted residual defect density thresholds, this is an application of which process area?",
      "ja": "TMMiレベル4の組織が、ソフトウェア信頼度成長モデルと予測残存欠陥密度の閾値に基づいてリリース判断を行う場合、これはどのプロセスエリアの適用例か。"
    },
    "options": [
      {
        "vi": "Test Organization",
        "en": "Test Organization",
        "ja": "テスト組織"
      },
      {
        "vi": "Test Training Program",
        "en": "Test Training Program",
        "ja": "テストトレーニングプログラム"
      },
      {
        "vi": "Test Environment",
        "en": "Test Environment",
        "ja": "テスト環境"
      },
      {
        "vi": "Product Quality Evaluation",
        "en": "Product Quality Evaluation",
        "ja": "製品品質評価(Product Quality Evaluation)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Product Quality Evaluation dùng mô hình đo lường định lượng như reliability growth model để đánh giá và dự đoán chất lượng sản phẩm nhằm hỗ trợ quyết định release.",
      "en": "Product Quality Evaluation uses quantitative measurement models such as reliability growth models to assess and predict product quality to support release decisions.",
      "ja": "Product Quality Evaluationは、信頼度成長モデルなどの定量的測定モデルを用いて製品品質を評価・予測し、リリース判断を支援する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong TMMi, khái niệm 'institutionalization' (thể chế hoá) của một quy trình có nghĩa là gì?",
      "en": "In TMMi, what does the concept of 'institutionalization' of a process mean?",
      "ja": "TMMiにおける「制度化(institutionalization)」という概念は何を意味するか。"
    },
    "options": [
      {
        "vi": "Quy trình được nhúng vào văn hoá tổ chức, được thực hiện nhất quán, có chính sách, nguồn lực và giám sát hỗ trợ, không phụ thuộc vào cá nhân cụ thể",
        "en": "The process is embedded in the organizational culture, executed consistently, and supported by policy, resources, and oversight, independent of specific individuals",
        "ja": "プロセスが組織文化に組み込まれ、方針・リソース・監督に支えられて一貫して実行され、特定の個人に依存しないこと"
      },
      {
        "vi": "Quy trình chỉ được ghi trong tài liệu nhưng không cần thực hiện thực tế",
        "en": "The process is only documented but need not be actually performed",
        "ja": "プロセスが文書化されているだけで実際に実施される必要はないこと"
      },
      {
        "vi": "Quy trình phụ thuộc hoàn toàn vào kinh nghiệm cá nhân của một tester giỏi nhất",
        "en": "The process depends entirely on the personal experience of the single best tester",
        "ja": "プロセスが最も優秀な一人のテスターの個人的経験に完全に依存すること"
      },
      {
        "vi": "Quy trình chỉ áp dụng tạm thời cho một dự án rồi bị bỏ đi",
        "en": "The process is applied temporarily for one project and then discarded",
        "ja": "プロセスが一つのプロジェクトにのみ一時的に適用され、その後廃棄されること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Thể chế hoá nghĩa là quy trình trở thành cách làm việc chuẩn, bền vững của tổ chức, được duy trì dù nhân sự thay đổi, nhờ chính sách, đào tạo và giám sát.",
      "en": "Institutionalization means the process becomes the organization's standard, durable way of working, sustained despite staff turnover through policy, training, and oversight.",
      "ja": "制度化とは、プロセスが方針・研修・監督によって支えられ、人員が変わっても維持される組織の標準的かつ持続的な働き方となることを意味する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức bỏ qua Generic Practices liên quan đến 'commitment to perform' (cam kết thực hiện) khi triển khai một process area TMMi. Hậu quả thường thấy là gì?",
      "en": "An organization skips Generic Practices related to 'commitment to perform' when implementing a TMMi process area. What is the typical consequence?",
      "ja": "組織がTMMiのプロセスエリア導入時に「実施へのコミットメント(commitment to perform)」に関するGeneric Practicesを省略した場合、典型的にどのような結果が生じるか。"
    },
    "options": [
      {
        "vi": "Tốc độ release sản phẩm tăng gấp đôi ngay lập tức",
        "en": "Product release speed immediately doubles",
        "ja": "製品リリース速度が即座に2倍になる"
      },
      {
        "vi": "Thiếu sự ủng hộ và cấp nguồn lực từ ban lãnh đạo, dẫn đến quy trình chỉ tồn tại trên giấy và không được duy trì lâu dài",
        "en": "Lack of management sponsorship and resource allocation, causing the process to exist only on paper and not be sustained long-term",
        "ja": "経営陣の支援やリソース割り当てが不足し、プロセスが書面上だけの存在となり長期的に維持されない"
      },
      {
        "vi": "Không có ảnh hưởng gì vì Generic Practices chỉ mang tính tham khảo",
        "en": "No impact, since Generic Practices are merely advisory",
        "ja": "Generic Practicesは単なる参考情報にすぎないため、何の影響もない"
      },
      {
        "vi": "Chi phí công cụ tự động hoá kiểm thử giảm xuống bằng 0",
        "en": "Test automation tooling costs drop to zero",
        "ja": "テスト自動化ツールのコストがゼロになる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Generic Practice về cam kết thực hiện đảm bảo có chính sách và sự hậu thuẫn của lãnh đạo; thiếu nó khiến quy trình dễ bị bỏ rơi khi gặp áp lực tiến độ.",
      "en": "The Generic Practice on commitment to perform ensures policy and leadership sponsorship exist; without it, the process is easily abandoned under schedule pressure.",
      "ja": "実施へのコミットメントに関するGeneric Practiceは、方針と経営陣の支援を確保する。これがなければ、プロセスは進捗プレッシャーの下で容易に放棄される。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quá trình đánh giá TMMi chính thức (formal assessment), vai trò của Lead Assessor được TMMi Foundation chứng nhận là gì?",
      "en": "In a formal TMMi assessment, what is the role of a TMMi Foundation-certified Lead Assessor?",
      "ja": "正式なTMMi評価において、TMMi Foundation認定のリードアセッサーの役割は何か。"
    },
    "options": [
      {
        "vi": "Thay thế test manager điều hành dự án trong suốt quá trình đánh giá",
        "en": "Replacing the test manager to run the project throughout the assessment",
        "ja": "評価期間中、テストマネージャーに代わりプロジェクトを運営すること"
      },
      {
        "vi": "Viết toàn bộ test case cho dự án được đánh giá",
        "en": "Writing all test cases for the project being assessed",
        "ja": "評価対象プロジェクトのすべてのテストケースを作成すること"
      },
      {
        "vi": "Điều hành và đảm bảo tính khách quan, nhất quán của quá trình đánh giá, thu thập bằng chứng khách quan và đưa ra kết luận về mức trưởng thành đạt được",
        "en": "Leading and ensuring the objectivity and consistency of the assessment process, gathering objective evidence, and rendering conclusions on the maturity level achieved",
        "ja": "評価プロセスの客観性と一貫性を確保して主導し、客観的証拠を収集して達成された成熟度レベルについて結論を下すこと"
      },
      {
        "vi": "Chỉ chịu trách nhiệm mua sắm công cụ kiểm thử tự động cho tổ chức",
        "en": "Being responsible only for procuring test automation tools for the organization",
        "ja": "組織のテスト自動化ツール調達のみを担当すること"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Lead Assessor được chứng nhận có trách nhiệm đảm bảo tính khách quan, thu thập bằng chứng (phỏng vấn, tài liệu) và đưa ra kết luận chính thức về mức trưởng thành tổ chức đạt được.",
      "en": "A certified Lead Assessor is responsible for ensuring objectivity, gathering evidence (interviews, documents), and issuing formal conclusions on the maturity level achieved.",
      "ja": "認定リードアセッサーは、客観性を確保し、証拠(インタビュー、文書)を収集し、組織が達成した成熟度レベルについて正式な結論を出す責任を負う。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vì sao TMMi khuyến nghị không nên 'nhảy cóc' bỏ qua mức 2 để triển khai trực tiếp các thực hành mức 4 (đo lường định lượng)?",
      "en": "Why does TMMi recommend against 'skipping' Level 2 to directly implement Level 4 practices (quantitative measurement)?",
      "ja": "TMMiが、レベル2を飛ばして直接レベル4の実践(定量的測定)を導入することを推奨しない理由は何か。"
    },
    "options": [
      {
        "vi": "Vì đo lường định lượng không liên quan gì đến quy trình kiểm thử",
        "en": "Because quantitative measurement is unrelated to the test process",
        "ja": "定量的測定はテストプロセスと無関係であるため"
      },
      {
        "vi": "Vì luật pháp quốc tế cấm điều đó",
        "en": "Because international law prohibits it",
        "ja": "国際法で禁止されているため"
      },
      {
        "vi": "Vì mức 4 không tồn tại trong mô hình TMMi",
        "en": "Because Level 4 does not exist in the TMMi model",
        "ja": "レベル4はTMMiモデルに存在しないため"
      },
      {
        "vi": "Vì đo lường định lượng đáng tin cậy đòi hỏi quy trình đã ổn định và có thể lặp lại từ mức 2, nếu không dữ liệu đo được sẽ không có ý nghĩa thống kê",
        "en": "Because reliable quantitative measurement requires a stable, repeatable process foundation from Level 2; otherwise, measured data lacks statistical validity",
        "ja": "信頼できる定量的測定にはレベル2で確立された安定的かつ反復可能なプロセス基盤が必要であり、それがなければ測定データは統計的に意味を持たないため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Đo lường định lượng có ý nghĩa chỉ khi quy trình đã ổn định, có thể lặp lại (đạt được từ mức 2, 3); nếu chưa ổn định, số liệu thu thập sẽ nhiễu và không đáng tin cậy để phân tích thống kê.",
      "en": "Quantitative measurement is meaningful only when the underlying process is stable and repeatable (achieved at Levels 2-3); otherwise collected data is noisy and unreliable for statistical analysis.",
      "ja": "定量的測定は、基盤となるプロセスが安定し反復可能である(レベル2・3で達成される)場合にのみ意味を持つ。そうでなければ収集データはノイズが多く統計分析に信頼できない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức TMMi mức 3 muốn tiến lên mức 4 nhưng chưa có cơ sở dữ liệu lỗi lịch sử (historical defect database) đầy đủ trên nhiều dự án. Điều này ảnh hưởng trực tiếp đến khả năng triển khai process area nào?",
      "en": "A TMMi Level 3 organization wants to advance to Level 4 but lacks a comprehensive historical defect database across projects. This directly hinders implementation of which process area?",
      "ja": "TMMiレベル3の組織がレベル4への移行を目指しているが、複数プロジェクトにわたる包括的な過去欠陥データベースが不足している。これはどのプロセスエリアの実装に直接影響するか。"
    },
    "options": [
      {
        "vi": "Test Measurement",
        "en": "Test Measurement",
        "ja": "テスト測定(Test Measurement)"
      },
      {
        "vi": "Test Environment",
        "en": "Test Environment",
        "ja": "テスト環境"
      },
      {
        "vi": "Test Training Program",
        "en": "Test Training Program",
        "ja": "テストトレーニングプログラム"
      },
      {
        "vi": "Test Organization",
        "en": "Test Organization",
        "ja": "テスト組織"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Measurement đòi hỏi dữ liệu lịch sử đáng tin cậy để thiết lập baseline và mô hình dự đoán; thiếu dữ liệu này khiến việc triển khai process area mức 4 gặp khó khăn.",
      "en": "Test Measurement requires reliable historical data to establish baselines and predictive models; lacking this data makes implementing the Level 4 process area difficult.",
      "ja": "Test Measurementはベースラインと予測モデルを確立するために信頼できる履歴データを必要とする。このデータが不足すると、レベル4プロセスエリアの実装が困難になる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "So với Test Planning ở mức 2 (lập kế hoạch theo từng dự án), điều gì KHÔNG phải là mục tiêu của Test Organization ở mức 3?",
      "en": "Compared to project-level Test Planning at Level 2, which of the following is NOT a goal of Test Organization at Level 3?",
      "ja": "レベル2のプロジェクトレベルのTest Planningと比較して、レベル3のTest Organizationの目標に該当しないものはどれか。"
    },
    "options": [
      {
        "vi": "Xây dựng chức năng kiểm thử độc lập cấp tổ chức",
        "en": "Building an organization-wide independent test function",
        "ja": "組織横断的な独立したテスト機能を構築すること"
      },
      {
        "vi": "Viết test case chi tiết cho một tính năng cụ thể của một dự án đơn lẻ",
        "en": "Writing detailed test cases for a specific feature of a single project",
        "ja": "単一プロジェクトの特定機能の詳細なテストケースを作成すること"
      },
      {
        "vi": "Xác định con đường nghề nghiệp và năng lực chuẩn cho tester trên toàn công ty",
        "en": "Defining standard career paths and competencies for testers company-wide",
        "ja": "全社的なテスター標準キャリアパスと能力を定義すること"
      },
      {
        "vi": "Thiết lập chương trình đo lường hiệu quả kiểm thử cấp tổ chức làm cơ sở so sánh giữa các dự án",
        "en": "Establishing an organization-level test effectiveness measurement program as a basis for cross-project comparison",
        "ja": "プロジェクト間比較の基盤となる組織レベルのテスト効果測定プログラムを確立すること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Viết test case chi tiết cho một tính năng của một dự án là hoạt động thực thi cụ thể ở cấp dự án (gắn với mức 2 Test Design and Execution), không phải mục tiêu tổ chức cấp mức 3.",
      "en": "Writing detailed test cases for a single project's feature is a project-level execution activity (tied to Level 2 Test Design and Execution), not an organizational-level Level 3 goal.",
      "ja": "単一プロジェクトの機能に対する詳細なテストケース作成は、プロジェクトレベルの実行活動(レベル2のTest Design and Executionに関連)であり、レベル3の組織レベルの目標ではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Điểm khác biệt then chốt giữa Test Design and Execution (mức 2) và Non-functional Testing (mức 3) là gì?",
      "en": "What is the key difference between Test Design and Execution (Level 2) and Non-functional Testing (Level 3)?",
      "ja": "Test Design and Execution(レベル2)とNon-functional Testing(レベル3)の主な違いは何か。"
    },
    "options": [
      {
        "vi": "Non-functional Testing xuất hiện ở mức 2 còn Test Design and Execution ở mức 3",
        "en": "Non-functional Testing appears at Level 2 while Test Design and Execution is at Level 3",
        "ja": "Non-functional TestingはレベルNon-functional Testingはレベル2に、Test Design and Executionはレベル3に現れる"
      },
      {
        "vi": "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi",
        "en": "They are entirely identical, differing only in name",
        "ja": "両者は名称が異なるだけで完全に同一である"
      },
      {
        "vi": "Test Design and Execution thiết lập kỹ thuật thiết kế và thực thi ca kiểm thử chức năng cơ bản, trong khi Non-functional Testing mở rộng năng lực này sang các thuộc tính chất lượng phi chức năng như hiệu năng, bảo mật",
        "en": "Test Design and Execution establishes basic functional test design/execution techniques, while Non-functional Testing extends this capability to non-functional quality attributes like performance and security",
        "ja": "Test Design and Executionは基本的な機能テストの設計・実行技法を確立し、Non-functional Testingはこの能力を性能やセキュリティなどの非機能品質特性に拡張する"
      },
      {
        "vi": "Test Design and Execution chỉ áp dụng cho kiểm thử bảo mật",
        "en": "Test Design and Execution applies only to security testing",
        "ja": "Test Design and Executionはセキュリティテストにのみ適用される"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Test Design and Execution ở mức 2 xây dựng nền tảng kỹ thuật kiểm thử chức năng cơ bản; Non-functional Testing ở mức 3 mở rộng phạm vi sang chất lượng phi chức năng, một bước trưởng thành cao hơn.",
      "en": "Test Design and Execution at Level 2 builds the foundation for basic functional testing techniques; Non-functional Testing at Level 3 extends scope to non-functional quality, a higher maturity step.",
      "ja": "レベル2のTest Design and Executionは基本的な機能テスト技法の基盤を構築し、レベル3のNon-functional Testingはより高い成熟度段階として範囲を非機能品質に拡張する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nhận định nào sau đây về TMMi là SAI?",
      "en": "Which of the following statements about TMMi is FALSE?",
      "ja": "TMMiに関する次の記述のうち誤っているものはどれか。"
    },
    "options": [
      {
        "vi": "TMMi mô tả 5 mức trưởng thành từ Initial đến Optimization",
        "en": "TMMi describes five maturity levels from Initial to Optimization",
        "ja": "TMMiはInitialからOptimizationまでの5つの成熟度レベルを記述する"
      },
      {
        "vi": "TMMi được phát triển bởi TMMi Foundation, bổ trợ cho CMMI",
        "en": "TMMi was developed by the TMMi Foundation as a complement to CMMI",
        "ja": "TMMiはTMMi Foundationによって開発され、CMMIを補完するものである"
      },
      {
        "vi": "Mỗi process area trong TMMi có Specific Goals và Specific Practices riêng",
        "en": "Each process area in TMMi has its own Specific Goals and Specific Practices",
        "ja": "TMMiの各プロセスエリアには固有のSpecific GoalsとSpecific Practicesがある"
      },
      {
        "vi": "TMMi cho phép tổ chức bỏ qua bất kỳ process area nào ở mức thấp miễn là có đủ ngân sách",
        "en": "TMMi allows an organization to skip any process area at a lower level as long as sufficient budget is available",
        "ja": "TMMiでは、予算が十分であれば下位レベルの任意のプロセスエリアを省略できる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "TMMi (mô hình staged) không cho phép bỏ qua process area của mức thấp bất kể ngân sách; mọi process area của mức thấp hơn phải đạt được trước khi tiến lên mức cao hơn.",
      "en": "TMMi (staged model) does not allow skipping lower-level process areas regardless of budget; all lower-level process areas must be achieved before advancing.",
      "ja": "TMMi(段階モデル)は、予算に関わらず下位レベルのプロセスエリアを省略することを許可しない。上位レベルに進む前に、下位レベルのすべてのプロセスエリアを達成する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một tổ chức TMMi mức 4 phát hiện qua Test Measurement rằng độ bao phủ review giảm dần qua các quý, họ nên áp dụng process area nào ở mức 5 để xử lý triệt để nguyên nhân?",
      "en": "When a TMMi Level 4 organization discovers through Test Measurement that review coverage is steadily declining across quarters, which Level 5 process area should they apply to thoroughly address the root cause?",
      "ja": "TMMiレベル4の組織がTest Measurementを通じてレビューカバレッジが四半期ごとに低下していることを発見した場合、根本原因に徹底的に対処するためにどのレベル5プロセスエリアを適用すべきか。"
    },
    "options": [
      {
        "vi": "Defect Prevention",
        "en": "Defect Prevention",
        "ja": "欠陥予防(Defect Prevention)"
      },
      {
        "vi": "Test Environment",
        "en": "Test Environment",
        "ja": "テスト環境"
      },
      {
        "vi": "Test Planning",
        "en": "Test Planning",
        "ja": "テスト計画"
      },
      {
        "vi": "Test Organization",
        "en": "Test Organization",
        "ja": "テスト組織"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Defect Prevention áp dụng phân tích nguyên nhân gốc rễ có hệ thống dựa trên dữ liệu xu hướng đo được để tìm và loại bỏ nguyên nhân sâu xa của vấn đề quy trình như suy giảm độ bao phủ review.",
      "en": "Defect Prevention applies systematic root cause analysis based on measured trend data to find and eliminate the underlying causes of process issues such as declining review coverage.",
      "ja": "欠陥予防は、測定された傾向データに基づいて体系的な根本原因分析を適用し、レビューカバレッジの低下のようなプロセス上の問題の根本原因を発見・排除する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong mô hình TPI Next, khái niệm \"vùng năng lực\" (key area) dùng để chỉ điều gì?",
      "en": "In the TPI Next model, what does the concept of \"key area\" refer to?",
      "ja": "TPI Nextモデルにおいて「キーエリア(重要領域)」という概念は何を指すか。"
    },
    "options": [
      {
        "vi": "Một loại lỗi phần mềm nghiêm trọng cần ưu tiên xử lý trước",
        "en": "A severe software defect type that must be prioritized for handling first",
        "ja": "最優先で対応すべき重大なソフトウェア欠陥の種類"
      },
      {
        "vi": "Một cụm chức năng liên quan chặt chẽ trong tổ chức kiểm thử mà mức độ trưởng thành có thể được đánh giá và cải tiến riêng biệt",
        "en": "A tightly related cluster of functions in the test organization whose maturity level can be assessed and improved separately",
        "ja": "テスト組織内で密接に関連する機能のクラスターであり、成熟度を個別に評価・改善できる領域"
      },
      {
        "vi": "Một công cụ tự động hoá kiểm thử được khuyến nghị sử dụng",
        "en": "An automated testing tool that is recommended for use",
        "ja": "使用を推奨される自動テストツール"
      },
      {
        "vi": "Một chỉ số đo lường số lượng ca kiểm thử đã thực thi",
        "en": "A metric measuring the number of test cases executed",
        "ja": "実行されたテストケース数を測定する指標"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "TPI Next chia tổ chức kiểm thử thành 16 vùng năng lực (key area), mỗi vùng đại diện cho một cụm hoạt động/chức năng liên quan chặt chẽ, cho phép đánh giá và cải tiến mức độ trưởng thành theo từng vùng độc lập.",
      "en": "TPI Next divides the test organization into 16 key areas, each representing a tightly related cluster of activities/functions, allowing maturity to be assessed and improved per area independently.",
      "ja": "TPI Nextはテスト組織を16のキーエリアに分割し、各エリアは密接に関連する活動・機能のクラスターを表し、各領域ごとに独立して成熟度を評価・改善できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong TPI Next, \"Business Drivers\" (yếu tố thúc đẩy kinh doanh) đóng vai trò gì đối với việc cải tiến quy trình kiểm thử?",
      "en": "In TPI Next, what role do \"Business Drivers\" play in test process improvement?",
      "ja": "TPI Nextにおいて「ビジネスドライバー」はテストプロセス改善においてどのような役割を果たすか。"
    },
    "options": [
      {
        "vi": "Chúng chỉ dùng để lập lịch nghỉ phép cho nhóm kiểm thử",
        "en": "They are only used to schedule leave for the test team",
        "ja": "テストチームの休暇スケジュールを決めるためだけに使われる"
      },
      {
        "vi": "Chúng là danh sách công cụ kiểm thử miễn phí có thể sử dụng",
        "en": "They are a list of free testing tools that can be used",
        "ja": "使用可能な無料テストツールの一覧である"
      },
      {
        "vi": "Chúng xác định mức độ ưu tiên và định hướng đầu tư cải tiến sao cho phù hợp với mục tiêu chiến lược của tổ chức",
        "en": "They determine priorities and direct improvement investment to align with the organization's strategic goals",
        "ja": "組織の戦略目標に沿うよう改善投資の優先順位と方向性を決定する"
      },
      {
        "vi": "Chúng thay thế hoàn toàn vai trò của quản lý kiểm thử",
        "en": "They completely replace the role of the test manager",
        "ja": "テストマネージャーの役割を完全に置き換える"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Business Drivers là những yếu tố xuất phát từ mục tiêu kinh doanh của tổ chức, dùng làm nền tảng để xác định vùng năng lực nào cần ưu tiên cải tiến trước, đảm bảo lộ trình cải tiến gắn với giá trị kinh doanh thực sự.",
      "en": "Business Drivers stem from the organization's business goals and serve as the basis for prioritizing which key areas to improve first, ensuring the improvement roadmap ties to real business value.",
      "ja": "ビジネスドライバーは組織の事業目標に由来し、どのキーエリアを優先的に改善すべきかを決定する基盤となり、改善ロードマップが実際のビジネス価値と結びつくことを保証する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức kiểm thử đang ở mức trưởng thành cao nhất trong TPI Next đối với vùng năng lực \"Estimating and Planning\". Đặc điểm nào sau đây MÔ TẢ ĐÚNG NHẤT trạng thái này?",
      "en": "A test organization is at the highest maturity level in TPI Next for the \"Estimating and Planning\" key area. Which characteristic BEST describes this state?",
      "ja": "あるテスト組織がTPI Nextの「見積りと計画」キーエリアで最高成熟度にある場合、次のうちこの状態を最もよく表すものはどれか。"
    },
    "options": [
      {
        "vi": "Ước lượng và lập kế hoạch được thực hiện hoàn toàn ngẫu hứng, không dựa trên dữ liệu lịch sử",
        "en": "Estimation and planning are done purely ad hoc, without reliance on historical data",
        "ja": "見積りと計画は完全に場当たり的で、過去データに基づかない"
      },
      {
        "vi": "Lập kế hoạch bị bỏ qua hoàn toàn vì dự án luôn theo phương pháp linh hoạt",
        "en": "Planning is entirely skipped because the project always follows an agile approach",
        "ja": "プロジェクトが常にアジャイル手法であるため計画は完全に省略される"
      },
      {
        "vi": "Ước lượng chỉ được thực hiện bởi một cá nhân duy nhất và không chia sẻ với người khác",
        "en": "Estimation is performed only by a single individual and not shared with others",
        "ja": "見積りは一人の担当者のみが行い、他者と共有されない"
      },
      {
        "vi": "Ước lượng và lập kế hoạch được tối ưu hoá liên tục dựa trên dữ liệu đo lường tổ chức và được điều chỉnh linh hoạt theo thay đổi kinh doanh",
        "en": "Estimation and planning are continuously optimized based on organization-wide measurement data and flexibly adjusted to business changes",
        "ja": "見積りと計画は組織全体の測定データに基づき継続的に最適化され、ビジネスの変化に柔軟に対応して調整される"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ở mức trưởng thành cao (Optimizing) trong TPI Next, các vùng năng lực như Estimating and Planning được vận hành dựa trên dữ liệu đo lường tổ chức, liên tục tối ưu hoá và thích ứng linh hoạt với thay đổi kinh doanh, chứ không còn mang tính cá nhân hay ngẫu hứng.",
      "en": "At the high (Optimizing) maturity level in TPI Next, key areas such as Estimating and Planning operate based on organization-wide measurement data, are continuously optimized, and adapt flexibly to business changes rather than being individual or ad hoc.",
      "ja": "TPI Nextの高成熟度(最適化)レベルでは、見積りと計画のようなキーエリアは組織全体の測定データに基づいて運用され、継続的に最適化され、ビジネスの変化に柔軟に適応する。個人依存や場当たり的ではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khái niệm \"cluster\" trong TPI Next có ý nghĩa gì?",
      "en": "What does the concept of \"cluster\" mean in TPI Next?",
      "ja": "TPI Nextにおける「クラスター」という概念はどのような意味を持つか。"
    },
    "options": [
      {
        "vi": "Một tập hợp các checkpoint từ nhiều vùng năng lực khác nhau, khi đạt được cùng lúc sẽ tạo ra một bước cải tiến có ý nghĩa thực tiễn",
        "en": "A set of checkpoints from different key areas that, when achieved together, create a practically meaningful improvement step",
        "ja": "異なるキーエリアのチェックポイントの集合であり、同時に達成することで実務上意味のある改善ステップとなるもの"
      },
      {
        "vi": "Một nhóm phần cứng máy chủ dùng để chạy kiểm thử tải",
        "en": "A group of server hardware used to run load tests",
        "ja": "負荷テストを実行するために使用されるサーバーハードウェアの集合"
      },
      {
        "vi": "Một loại báo cáo lỗi được nhóm theo mức độ nghiêm trọng",
        "en": "A type of defect report grouped by severity level",
        "ja": "重大度別にグループ化された欠陥レポートの一種"
      },
      {
        "vi": "Một kỹ thuật thiết kế ca kiểm thử dựa trên phân vùng tương đương",
        "en": "A test case design technique based on equivalence partitioning",
        "ja": "同値分割に基づくテストケース設計技法"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trong TPI Next, cluster là nhóm các checkpoint liên quan từ nhiều vùng năng lực khác nhau; việc đạt đồng thời các checkpoint trong một cluster tạo ra một bước cải tiến thực tiễn, tránh cải tiến rời rạc không mang lại giá trị.",
      "en": "In TPI Next, a cluster is a group of related checkpoints from various key areas; achieving all checkpoints in a cluster simultaneously creates a practical improvement step, avoiding fragmented improvements that add little value.",
      "ja": "TPI Nextにおけるクラスターとは、複数のキーエリアにまたがる関連チェックポイントの集合であり、クラスター内のすべてのチェックポイントを同時に達成することで実務的な改善ステップが生まれ、価値の乏しい断片的な改善を避けられる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vì sao TPI Next khuyến nghị không nên cải tiến một vùng năng lực đơn lẻ lên mức quá cao trong khi các vùng khác vẫn còn ở mức thấp?",
      "en": "Why does TPI Next recommend against improving a single key area too far while other areas remain at low levels?",
      "ja": "TPI Nextはなぜ他のエリアが低いレベルにとどまっている間に単一のキーエリアだけを過度に改善することを推奨しないのか。"
    },
    "options": [
      {
        "vi": "Vì điều đó vi phạm bản quyền của mô hình TPI Next",
        "en": "Because it violates the copyright of the TPI Next model",
        "ja": "TPI Nextモデルの著作権に違反するため"
      },
      {
        "vi": "Vì các vùng năng lực có sự phụ thuộc lẫn nhau, cải tiến mất cân đối có thể không mang lại hiệu quả tương xứng và lãng phí nguồn lực",
        "en": "Because key areas are interdependent, and unbalanced improvement may not yield proportional benefit and can waste resources",
        "ja": "キーエリアは相互に依存しており、不均衡な改善は見合った効果を生まず資源の無駄となる可能性があるため"
      },
      {
        "vi": "Vì công cụ TPI Next chỉ hỗ trợ cải tiến tối đa 2 vùng cùng lúc",
        "en": "Because the TPI Next tool only supports improving 2 areas at once",
        "ja": "TPI Nextツールは同時に2エリアまでしか改善をサポートしないため"
      },
      {
        "vi": "Vì tiêu chuẩn ISO yêu cầu mọi vùng phải cải tiến với tốc độ giống hệt nhau",
        "en": "Because ISO standards require all areas to improve at an identical pace",
        "ja": "ISO標準ではすべてのエリアが同一の速度で改善されることを要求しているため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Các vùng năng lực trong TPI Next có mối liên hệ và phụ thuộc lẫn nhau (thể hiện qua cluster); nếu chỉ tập trung nâng cao một vùng mà bỏ qua các vùng liên quan, hiệu quả cải tiến tổng thể sẽ hạn chế và nguồn lực có thể bị lãng phí.",
      "en": "Key areas in TPI Next are interrelated and dependent on each other (reflected through clusters); focusing on raising only one area while neglecting related areas limits overall improvement effectiveness and can waste resources.",
      "ja": "TPI Nextのキーエリアは互いに関連し依存している(クラスターに反映される)。関連エリアを無視して一つのエリアだけを高めても、全体的な改善効果は限定的で資源の無駄になりうる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Test Environment\" trong TPI Next chủ yếu đánh giá điều gì?",
      "en": "What does the \"Test Environment\" key area in TPI Next mainly assess?",
      "ja": "TPI Nextの「テスト環境」キーエリアは主に何を評価するか。"
    },
    "options": [
      {
        "vi": "Mức độ hài lòng của khách hàng cuối đối với sản phẩm",
        "en": "The satisfaction level of end customers with the product",
        "ja": "製品に対するエンドカスタマーの満足度"
      },
      {
        "vi": "Số lượng nhân viên trong bộ phận kiểm thử",
        "en": "The number of staff in the testing department",
        "ja": "テスト部門の人員数"
      },
      {
        "vi": "Khả năng quản lý, cung cấp và bảo trì môi trường kiểm thử (phần cứng, phần mềm, dữ liệu, mạng) phục vụ hoạt động kiểm thử",
        "en": "The ability to manage, provision and maintain test environments (hardware, software, data, network) supporting testing activities",
        "ja": "テスト活動を支える環境(ハードウェア、ソフトウェア、データ、ネットワーク)を管理・準備・保守する能力"
      },
      {
        "vi": "Ngân sách marketing dành cho sản phẩm phần mềm",
        "en": "The marketing budget allocated to the software product",
        "ja": "ソフトウェア製品に割り当てられたマーケティング予算"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vùng năng lực Test Environment tập trung đánh giá khả năng tổ chức trong việc thiết lập, cung cấp, quản lý và bảo trì các môi trường kiểm thử đại diện, sẵn sàng và ổn định để hỗ trợ hoạt động kiểm thử hiệu quả.",
      "en": "The Test Environment key area assesses the organization's ability to set up, provision, manage and maintain representative, available and stable test environments to effectively support testing activities.",
      "ja": "テスト環境キーエリアは、テスト活動を効果的に支援するために、代表的で利用可能かつ安定したテスト環境を構築・準備・管理・保守する組織の能力を評価する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong TPI Next, \"enabler\" có vai trò gì so với \"checkpoint\"?",
      "en": "In TPI Next, what role does an \"enabler\" play compared to a \"checkpoint\"?",
      "ja": "TPI Nextにおいて「イネーブラー」は「チェックポイント」と比べてどのような役割を持つか。"
    },
    "options": [
      {
        "vi": "Enabler là điều kiện bắt buộc phải đạt để lên mức, giống hệt checkpoint về bản chất",
        "en": "An enabler is a mandatory condition to reach a level, identical in nature to a checkpoint",
        "ja": "イネーブラーはレベル到達に必須の条件であり、本質的にチェックポイントと同一である"
      },
      {
        "vi": "Enabler chỉ áp dụng cho kiểm thử tự động, không áp dụng cho kiểm thử thủ công",
        "en": "An enabler applies only to automated testing, not to manual testing",
        "ja": "イネーブラーは自動テストにのみ適用され、手動テストには適用されない"
      },
      {
        "vi": "Enabler là công cụ đo tốc độ mạng của môi trường kiểm thử",
        "en": "An enabler is a tool measuring the network speed of the test environment",
        "ja": "イネーブラーはテスト環境のネットワーク速度を測定するツールである"
      },
      {
        "vi": "Enabler là gợi ý, thực hành hỗ trợ từ các lĩnh vực khác (ví dụ mô hình phát triển, quản lý dự án) giúp đạt checkpoint dễ dàng hơn nhưng không bắt buộc",
        "en": "An enabler is a suggested supporting practice from other disciplines (e.g. development model, project management) that helps achieve a checkpoint but is not mandatory",
        "ja": "イネーブラーは他分野(開発モデルやプロジェクト管理など)からの支援的な実践の提案であり、チェックポイント達成を助けるが必須ではない"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Enabler trong TPI Next là các gợi ý mang tính hỗ trợ, không bắt buộc, thường đến từ các lĩnh vực liên quan (phát triển, quản lý dự án, tổ chức) giúp tổ chức đạt được checkpoint thuận lợi hơn, khác với checkpoint là điều kiện đánh giá mức độ trưởng thành.",
      "en": "Enablers in TPI Next are non-mandatory supporting suggestions, typically from related disciplines (development, project management, organization), that make it easier to achieve checkpoints, unlike checkpoints which are the actual maturity assessment criteria.",
      "ja": "TPI Nextのイネーブラーは、開発、プロジェクト管理、組織など関連分野からの、必須ではない支援的な提案であり、チェックポイント達成を容易にする。これは実際の成熟度評価基準であるチェックポイントとは異なる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tư vấn cải tiến quy trình kiểm thử theo TPI Next cho một tổ chức lớn, chuyên gia CTEL nên bắt đầu bước đầu tiên nào?",
      "en": "When consulting on test process improvement using TPI Next for a large organization, what should a CTEL expert start with first?",
      "ja": "大規模組織に対しTPI Nextを用いたテストプロセス改善を助言する際、CTEL専門家がまず着手すべきステップは何か。"
    },
    "options": [
      {
        "vi": "Thực hiện đánh giá hiện trạng (assessment) các vùng năng lực dựa trên checkpoint để xác định mức trưởng thành hiện tại, làm cơ sở xây dựng lộ trình cải tiến",
        "en": "Conduct an assessment of key areas based on checkpoints to determine the current maturity level as the basis for building the improvement roadmap",
        "ja": "チェックポイントに基づき各キーエリアの現状評価を行い現在の成熟度を把握し、それを改善ロードマップ構築の基盤とする"
      },
      {
        "vi": "Mua ngay công cụ kiểm thử tự động đắt tiền nhất trên thị trường",
        "en": "Immediately purchase the most expensive automated testing tool on the market",
        "ja": "市場で最も高価な自動テストツールを即座に購入する"
      },
      {
        "vi": "Sa thải toàn bộ nhân sự kiểm thử hiện tại và tuyển mới",
        "en": "Dismiss the entire current test staff and hire new ones",
        "ja": "現在のテスト要員全員を解雇し新規採用する"
      },
      {
        "vi": "Áp dụng ngay mức cao nhất (Optimizing) cho tất cả các vùng năng lực mà không đánh giá",
        "en": "Immediately apply the highest level (Optimizing) to all key areas without assessment",
        "ja": "評価を行わずすべてのキーエリアに最高レベル(最適化)を即座に適用する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Quy trình chuẩn của TPI Next bắt đầu bằng bước đánh giá (assessment) dựa trên checkpoint để xác định mức trưởng thành hiện tại của từng vùng năng lực, từ đó mới có cơ sở xây dựng lộ trình cải tiến phù hợp với business driver của tổ chức.",
      "en": "The standard TPI Next process starts with an assessment based on checkpoints to determine the current maturity level of each key area, forming the basis for building an improvement roadmap aligned with the organization's business drivers.",
      "ja": "TPI Nextの標準プロセスは、チェックポイントに基づく評価から始まり、各キーエリアの現在の成熟度を把握する。これが組織のビジネスドライバーに沿った改善ロードマップ構築の基盤となる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Defect Management\" trong TPI Next tập trung vào khía cạnh nào?",
      "en": "What aspect does the \"Defect Management\" key area in TPI Next focus on?",
      "ja": "TPI Nextの「欠陥管理」キーエリアはどの側面に焦点を当てるか。"
    },
    "options": [
      {
        "vi": "Chỉ tập trung vào việc thiết kế giao diện người dùng đẹp mắt",
        "en": "Focuses only on designing an attractive user interface",
        "ja": "魅力的なユーザーインターフェースの設計にのみ焦点を当てる"
      },
      {
        "vi": "Quy trình phát hiện, ghi nhận, phân loại, theo dõi và xử lý lỗi trong suốt vòng đời phần mềm một cách nhất quán và hiệu quả",
        "en": "The process of detecting, recording, classifying, tracking and resolving defects consistently and effectively throughout the software lifecycle",
        "ja": "ソフトウェアライフサイクル全体を通じて欠陥を一貫して効果的に検出・記録・分類・追跡・解決するプロセス"
      },
      {
        "vi": "Chỉ liên quan đến việc lựa chọn ngôn ngữ lập trình phù hợp",
        "en": "Relates only to selecting the appropriate programming language",
        "ja": "適切なプログラミング言語の選択にのみ関連する"
      },
      {
        "vi": "Chỉ đo lường tốc độ tuyển dụng nhân sự kiểm thử mới",
        "en": "Only measures the speed of hiring new test staff",
        "ja": "新規テスト要員の採用速度のみを測定する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Defect Management là vùng năng lực đánh giá mức độ trưởng thành của quy trình quản lý lỗi: từ phát hiện, ghi nhận, phân loại mức độ ưu tiên/nghiêm trọng, theo dõi trạng thái đến khi lỗi được xử lý và đóng, đảm bảo tính nhất quán trong toàn tổ chức.",
      "en": "Defect Management is the key area assessing the maturity of the defect handling process: detection, recording, priority/severity classification, status tracking, through to resolution and closure, ensuring consistency across the organization.",
      "ja": "欠陥管理は、検出、記録、優先度・重大度の分類、状態追跡から解決・クローズまでの欠陥処理プロセスの成熟度を評価するキーエリアであり、組織全体での一貫性を確保する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức áp dụng TPI Next nhận thấy vùng năng lực \"Commitment and Motivation\" luôn ở mức thấp dù các vùng kỹ thuật khác đã cải tiến tốt. Hệ quả có khả năng xảy ra nhất là gì?",
      "en": "An organization applying TPI Next finds that \"Commitment and Motivation\" remains at a low level even though other technical areas have improved well. What is the most likely consequence?",
      "ja": "TPI Nextを適用する組織で、他の技術的エリアは良く改善されているにもかかわらず「コミットメントとモチベーション」が常に低いレベルにとどまっている場合、最も起こりうる結果は何か。"
    },
    "options": [
      {
        "vi": "Không có ảnh hưởng gì vì vùng này chỉ mang tính hình thức, không tác động thực tế",
        "en": "No impact at all, since this area is purely formal and has no real effect",
        "ja": "このエリアは形式的なものにすぎず実際の影響はない"
      },
      {
        "vi": "Chi phí phần cứng máy chủ kiểm thử sẽ tự động giảm",
        "en": "The cost of test server hardware will automatically decrease",
        "ja": "テストサーバーのハードウェアコストが自動的に減少する"
      },
      {
        "vi": "Các cải tiến quy trình khó được duy trì bền vững vì thiếu sự ủng hộ, tham gia thực chất của ban lãnh đạo và đội ngũ kiểm thử",
        "en": "Process improvements are unlikely to be sustained because they lack genuine support and engagement from management and the test team",
        "ja": "経営陣とテストチームからの実質的な支持・関与が不足するため、プロセス改善が持続しにくくなる"
      },
      {
        "vi": "Toàn bộ ca kiểm thử tự động sẽ ngừng hoạt động ngay lập tức",
        "en": "All automated test cases will immediately stop functioning",
        "ja": "すべての自動テストケースが即座に動作を停止する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Commitment and Motivation là vùng năng lực \"con người\" quan trọng trong TPI Next; nếu thiếu sự cam kết và động lực từ lãnh đạo lẫn đội ngũ, các cải tiến kỹ thuật dù tốt đến đâu cũng khó bền vững vì không được duy trì, ủng hộ lâu dài.",
      "en": "Commitment and Motivation is a crucial \"people\" key area in TPI Next; without genuine commitment and motivation from both leadership and the team, technical improvements—however good—are unlikely to be sustained long-term.",
      "ja": "コミットメントとモチベーションはTPI Nextにおける重要な「人」に関するキーエリアである。経営陣とチーム双方からの真のコミットメントとモチベーションがなければ、どれほど優れた技術的改善であっても長期的に持続されにくい。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong TPI Next, sự khác biệt cốt lõi giữa mô hình \"matrix\" (ma trận trưởng thành) so với mô hình staged (theo giai đoạn) như CMMI là gì?",
      "en": "In TPI Next, what is the core difference between the \"matrix\" maturity model versus a staged model like CMMI?",
      "ja": "TPI Nextにおいて、「マトリックス」成熟度モデルとCMMIのようなステージ型モデルとの本質的な違いは何か。"
    },
    "options": [
      {
        "vi": "Mô hình matrix chỉ dùng để đánh giá kiểm thử tự động, không đánh giá kiểm thử thủ công",
        "en": "The matrix model is used only to assess automated testing, not manual testing",
        "ja": "マトリックスモデルは自動テストの評価にのみ使用され、手動テストは評価しない"
      },
      {
        "vi": "Mô hình matrix chỉ áp dụng được cho dự án Agile, còn staged chỉ áp dụng cho Waterfall",
        "en": "The matrix model applies only to Agile projects while staged models apply only to Waterfall",
        "ja": "マトリックスモデルはアジャイルプロジェクトにのみ適用でき、ステージ型はウォーターフォールにのみ適用できる"
      },
      {
        "vi": "Mô hình matrix không có khái niệm mức độ trưởng thành nào cả",
        "en": "The matrix model has no concept of maturity levels at all",
        "ja": "マトリックスモデルには成熟度レベルという概念が全く存在しない"
      },
      {
        "vi": "Mô hình matrix cho phép từng vùng năng lực đạt mức trưởng thành khác nhau độc lập, thay vì bắt buộc toàn bộ tổ chức phải cùng đạt một mức cố định trước khi lên mức tiếp theo",
        "en": "The matrix model allows each key area to reach different maturity levels independently, instead of requiring the entire organization to reach one fixed level before moving to the next",
        "ja": "マトリックスモデルでは各キーエリアが独立して異なる成熟度レベルに到達できるのに対し、ステージ型では組織全体が次のレベルに進む前に一つの固定レベルに到達する必要がある"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "TPI Next dùng cấu trúc ma trận cho phép mỗi vùng năng lực có mức trưởng thành riêng, linh hoạt hơn so với mô hình staged truyền thống vốn yêu cầu đạt đồng loạt một mức cố định trước khi tiến lên giai đoạn kế tiếp.",
      "en": "TPI Next uses a matrix structure allowing each key area to have its own maturity level, offering more flexibility than traditional staged models which require reaching a fixed level uniformly before advancing to the next stage.",
      "ja": "TPI Nextはマトリックス構造を用いており、各キーエリアが独自の成熟度レベルを持つことを可能にし、次の段階に進む前に均一に固定レベルへ到達することを要求する従来のステージ型モデルよりも柔軟性が高い。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một quản lý kiểm thử muốn dùng TPI Next để thuyết phục ban giám đốc đầu tư ngân sách cải tiến. Cách tiếp cận phù hợp nhất là gì?",
      "en": "A test manager wants to use TPI Next to convince the board to invest budget in improvement. What is the most appropriate approach?",
      "ja": "テストマネージャーがTPI Nextを用いて取締役会に改善予算への投資を説得したい場合、最も適切なアプローチは何か。"
    },
    "options": [
      {
        "vi": "Trình bày kết quả đánh giá theo checkpoint dưới dạng ma trận trực quan, gắn với business driver và lợi ích kinh doanh cụ thể của việc nâng mức từng vùng năng lực",
        "en": "Present the checkpoint assessment results as a visual matrix, linked to business drivers and the concrete business benefits of raising each key area's level",
        "ja": "チェックポイント評価結果をビジュアルなマトリックスとして提示し、ビジネスドライバーと各キーエリアのレベル向上による具体的なビジネス上の利益に結びつける"
      },
      {
        "vi": "Chỉ trình bày số lượng dòng code đã viết trong tháng",
        "en": "Present only the number of lines of code written in the month",
        "ja": "その月に書かれたコード行数のみを提示する"
      },
      {
        "vi": "Yêu cầu ngân sách mà không cung cấp bất kỳ dữ liệu đánh giá nào",
        "en": "Request budget without providing any assessment data",
        "ja": "いかなる評価データも提示せず予算を要求する"
      },
      {
        "vi": "Đề nghị dừng toàn bộ hoạt động kiểm thử để tiết kiệm chi phí",
        "en": "Suggest halting all testing activities to save costs",
        "ja": "コスト削減のためテスト活動全体を停止することを提案する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "TPI Next cung cấp bản đồ trưởng thành (maturity matrix) trực quan cùng liên kết rõ ràng tới business driver, giúp quản lý kiểm thử trình bày thuyết phục lợi ích kinh doanh cụ thể khi kêu gọi đầu tư cải tiến từ ban lãnh đạo.",
      "en": "TPI Next provides a visual maturity matrix with clear links to business drivers, helping test managers persuasively present concrete business benefits when requesting improvement investment from leadership.",
      "ja": "TPI Nextはビジネスドライバーと明確に結びついたビジュアルな成熟度マトリックスを提供し、テストマネージャーが経営陣に改善投資を求める際、具体的なビジネス上の利益を説得力を持って提示するのに役立つ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong TPI Next, khi một vùng năng lực đã đạt tất cả checkpoint của một mức nhất định nhưng chưa đạt bất kỳ checkpoint nào của mức tiếp theo, tổ chức nên hiểu điều này như thế nào?",
      "en": "In TPI Next, when a key area has met all checkpoints of a certain level but none of the next level's checkpoints, how should the organization interpret this?",
      "ja": "TPI Nextにおいて、あるキーエリアが特定レベルのすべてのチェックポイントを満たしているが次のレベルのチェックポイントを一つも満たしていない場合、組織はこれをどう解釈すべきか。"
    },
    "options": [
      {
        "vi": "Tổ chức phải bắt đầu lại toàn bộ quy trình đánh giá từ đầu vì kết quả không hợp lệ",
        "en": "The organization must restart the entire assessment process from scratch because the result is invalid",
        "ja": "結果が無効であるため組織は評価プロセス全体を最初からやり直さなければならない"
      },
      {
        "vi": "Tổ chức đã đạt mức trưởng thành ổn định ở mức đó cho vùng năng lực này và có thể lập kế hoạch cải tiến tiếp theo dựa trên checkpoint chưa đạt của mức kế tiếp",
        "en": "The organization has achieved a stable maturity level for that key area and can plan further improvement based on the unmet checkpoints of the next level",
        "ja": "組織はそのキーエリアについて当該レベルの安定した成熟度を達成しており、次レベルの未達成チェックポイントに基づいてさらなる改善を計画できる"
      },
      {
        "vi": "Điều này chứng tỏ mô hình TPI Next không phù hợp với tổ chức đó",
        "en": "This proves the TPI Next model is not suitable for that organization",
        "ja": "これはTPI Nextモデルがその組織に適していないことを証明する"
      },
      {
        "vi": "Tổ chức nên bỏ qua vùng năng lực này vĩnh viễn vì đã đủ tốt",
        "en": "The organization should permanently ignore this key area since it is already good enough",
        "ja": "すでに十分良いため組織はこのキーエリアを永久に無視すべきである"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Checkpoint trong TPI Next được sắp xếp theo thứ tự tăng dần trong từng vùng năng lực; đạt trọn vẹn các checkpoint của một mức nghĩa là tổ chức đã ổn định ở mức đó, và các checkpoint chưa đạt của mức kế tiếp chính là mục tiêu cho lộ trình cải tiến tiếp theo.",
      "en": "Checkpoints in TPI Next are ordered progressively within each key area; fully meeting a level's checkpoints means the organization is stable at that level, and the unmet checkpoints of the next level become the targets for the next improvement roadmap.",
      "ja": "TPI Nextのチェックポイントは各キーエリア内で段階的に順序付けられている。あるレベルのチェックポイントをすべて満たすことは、組織がそのレベルで安定していることを意味し、次レベルの未達成チェックポイントが次の改善ロードマップの目標となる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Methodology Practice\" trong TPI Next liên quan chủ yếu đến điều gì?",
      "en": "What does the \"Methodology Practice\" key area in TPI Next mainly relate to?",
      "ja": "TPI Nextの「方法論の実践」キーエリアは主に何に関連するか。"
    },
    "options": [
      {
        "vi": "Việc lựa chọn văn phòng phẩm cho đội kiểm thử",
        "en": "The choice of office supplies for the test team",
        "ja": "テストチームのための事務用品の選定"
      },
      {
        "vi": "Số lượng tài liệu quảng cáo sản phẩm được phát hành",
        "en": "The number of product marketing brochures published",
        "ja": "発行された製品マーケティング資料の数"
      },
      {
        "vi": "Mức độ áp dụng nhất quán, thực tế và phù hợp của phương pháp/quy trình kiểm thử đã được định nghĩa vào công việc hằng ngày",
        "en": "The extent to which the defined test methodology/process is consistently, practically and appropriately applied in day-to-day work",
        "ja": "定義されたテスト方法論・プロセスが日常業務において一貫して実用的かつ適切に適用されている程度"
      },
      {
        "vi": "Mức lương thưởng của đội ngũ kiểm thử",
        "en": "The salary and bonus level of the test team",
        "ja": "テストチームの給与・賞与水準"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Methodology Practice đánh giá mức độ phương pháp luận kiểm thử được định nghĩa có thực sự được áp dụng nhất quán, phù hợp với ngữ cảnh dự án trong thực tế hằng ngày, chứ không chỉ tồn tại trên giấy tờ.",
      "en": "Methodology Practice assesses how well the defined test methodology is actually applied consistently and appropriately to the project context in daily practice, rather than merely existing on paper.",
      "ja": "方法論の実践は、定義されたテスト方法論が単に文書上に存在するだけでなく、日常業務においてプロジェクトの文脈に適した形で実際に一貫して適用されているかを評価する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "So với TMap, một điểm mạnh nổi bật của TPI Next khi ứng dụng cho tổ chức đa dự án, đa quốc gia là gì?",
      "en": "Compared to TMap, what is a notable strength of TPI Next when applied to a multi-project, multinational organization?",
      "ja": "TMapと比較して、多プロジェクト・多国籍組織に適用する場合のTPI Nextの顕著な強みは何か。"
    },
    "options": [
      {
        "vi": "TPI Next chỉ hoạt động khi tổ chức có dưới 5 nhân viên kiểm thử",
        "en": "TPI Next only works when the organization has fewer than 5 test staff",
        "ja": "TPI Nextは組織のテスト要員が5人未満の場合にのみ機能する"
      },
      {
        "vi": "TPI Next yêu cầu tất cả dự án phải dùng chung một ngôn ngữ lập trình duy nhất",
        "en": "TPI Next requires all projects to use a single common programming language",
        "ja": "TPI Nextはすべてのプロジェクトが単一の共通プログラミング言語を使用することを要求する"
      },
      {
        "vi": "TPI Next loại bỏ hoàn toàn nhu cầu về quản lý dự án",
        "en": "TPI Next completely eliminates the need for project management",
        "ja": "TPI Nextはプロジェクト管理の必要性を完全に排除する"
      },
      {
        "vi": "TPI Next tách biệt rõ 16 vùng năng lực với cluster liên kết, cho phép so sánh và đồng bộ mức trưởng thành giữa nhiều đơn vị/dự án theo cùng một khung tham chiếu",
        "en": "TPI Next clearly separates 16 key areas with linked clusters, enabling comparison and synchronization of maturity levels across multiple units/projects using a common reference framework",
        "ja": "TPI Nextは16のキーエリアを明確に分離しクラスターで連携させており、共通の参照フレームワークを用いて複数の部門・プロジェクト間で成熟度レベルを比較・同期させることができる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Cấu trúc ma trận với 16 vùng năng lực và các cluster liên kết của TPI Next cung cấp một khung tham chiếu chung, giúp tổ chức đa dự án/đa quốc gia dễ dàng so sánh, đối chiếu và đồng bộ hoá mức trưởng thành kiểm thử giữa các đơn vị khác nhau.",
      "en": "The matrix structure with 16 key areas and linked clusters of TPI Next provides a common reference framework, helping multi-project/multinational organizations easily compare and synchronize test maturity levels across different units.",
      "ja": "16のキーエリアと連携するクラスターを持つTPI Nextのマトリックス構造は共通の参照フレームワークを提供し、多プロジェクト・多国籍組織が異なる部門間でテスト成熟度レベルを容易に比較・同期させることを可能にする。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nhận định nào sau đây về mối quan hệ giữa \"Test Strategy\" và các vùng năng lực khác trong TPI Next là ĐÚNG?",
      "en": "Which statement about the relationship between \"Test Strategy\" and other key areas in TPI Next is CORRECT?",
      "ja": "TPI Nextにおける「テスト戦略」と他のキーエリアとの関係について正しい記述はどれか。"
    },
    "options": [
      {
        "vi": "Test Strategy thường là vùng năng lực nền tảng, ảnh hưởng đến việc định hướng các vùng như Estimating and Planning, Test Organization và Reporting",
        "en": "Test Strategy is typically a foundational key area, influencing areas such as Estimating and Planning, Test Organization and Reporting",
        "ja": "テスト戦略は通常、基盤となるキーエリアであり、見積りと計画、テスト組織、レポーティングなどの領域の方向性に影響を与える"
      },
      {
        "vi": "Test Strategy hoàn toàn độc lập, không ảnh hưởng đến bất kỳ vùng năng lực nào khác",
        "en": "Test Strategy is completely independent and has no influence on any other key area",
        "ja": "テスト戦略は完全に独立しており他のキーエリアに一切影響を与えない"
      },
      {
        "vi": "Test Strategy chỉ liên quan đến việc chọn màu sắc giao diện phần mềm",
        "en": "Test Strategy relates only to choosing the software UI color scheme",
        "ja": "テスト戦略はソフトウェアUIの配色を選ぶことにのみ関連する"
      },
      {
        "vi": "Test Strategy chỉ áp dụng cho kiểm thử bảo mật",
        "en": "Test Strategy applies only to security testing",
        "ja": "テスト戦略はセキュリティテストにのみ適用される"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Test Strategy trong TPI Next là vùng năng lực có tính nền tảng, định hướng dựa trên rủi ro và ưu tiên kiểm thử, từ đó ảnh hưởng lan toả đến các vùng liên quan như ước lượng/lập kế hoạch, tổ chức đội kiểm thử và báo cáo.",
      "en": "Test Strategy in TPI Next is a foundational key area, providing risk-based direction and testing priorities, which cascades influence to related areas such as estimating/planning, test organization and reporting.",
      "ja": "TPI Nextにおけるテスト戦略は基盤となるキーエリアであり、リスクベースの方向性とテストの優先順位を提供し、見積り・計画、テスト組織、レポーティングなど関連エリアに影響を波及させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Câu nào sau đây SAI về mô hình TPI Next?",
      "en": "Which of the following statements is INCORRECT about the TPI Next model?",
      "ja": "TPI Nextモデルについて誤っている記述はどれか。"
    },
    "options": [
      {
        "vi": "TPI Next đánh giá tổ chức kiểm thử dựa trên nhiều vùng năng lực chứ không chỉ một chỉ số duy nhất",
        "en": "TPI Next assesses the test organization based on multiple key areas rather than a single metric",
        "ja": "TPI Nextは単一の指標ではなく複数のキーエリアに基づいてテスト組織を評価する"
      },
      {
        "vi": "TPI Next bắt buộc mọi tổ chức phải đạt mức Optimizing ở tất cả vùng năng lực trong vòng 6 tháng",
        "en": "TPI Next mandates that every organization must reach the Optimizing level in all key areas within 6 months",
        "ja": "TPI Nextはすべての組織が6か月以内にすべてのキーエリアで最適化レベルに到達することを義務付けている"
      },
      {
        "vi": "Checkpoint trong TPI Next là các tiêu chí cụ thể, có thể quan sát để xác định mức trưởng thành của một vùng năng lực",
        "en": "Checkpoints in TPI Next are specific, observable criteria used to determine a key area's maturity level",
        "ja": "TPI Nextのチェックポイントは、キーエリアの成熟度レベルを決定するための具体的で観察可能な基準である"
      },
      {
        "vi": "TPI Next cho phép tổ chức lựa chọn mục tiêu cải tiến phù hợp với business driver thay vì áp dụng cứng nhắc",
        "en": "TPI Next allows organizations to select improvement goals aligned with business drivers rather than applying rigidly",
        "ja": "TPI Nextは組織がビジネスドライバーに沿った改善目標を選択できるようにし、硬直的に適用することを求めない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "TPI Next không áp đặt thời hạn hay yêu cầu bắt buộc mọi vùng năng lực đạt mức cao nhất; ngược lại, mô hình linh hoạt, cho phép tổ chức tự chọn mục tiêu cải tiến phù hợp business driver và tiến độ thực tế của mình.",
      "en": "TPI Next does not impose deadlines or require every key area to reach the highest level; instead it is a flexible model allowing organizations to choose improvement goals aligned with their business drivers and actual pace.",
      "ja": "TPI Nextは期限を課したり、すべてのキーエリアが最高レベルに到達することを要求したりしない。むしろ組織が自身のビジネスドライバーと実際の進捗に沿った改善目標を選択できる柔軟なモデルである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quá trình phỏng vấn đánh giá TPI Next, chuyên gia phát hiện nhóm kiểm thử trả lời checkpoint theo cách khác nhau tuỳ người được hỏi. Hành động phù hợp nhất là gì?",
      "en": "During a TPI Next assessment interview, the expert notices the test team answers checkpoint questions inconsistently depending on who is asked. What is the most appropriate action?",
      "ja": "TPI Next評価インタビュー中に、専門家はテストチームのチェックポイントに対する回答が質問相手によって異なることに気づいた。最も適切な行動は何か。"
    },
    "options": [
      {
        "vi": "Bỏ qua sự khác biệt và chọn ngẫu nhiên một câu trả lời để ghi nhận",
        "en": "Ignore the discrepancy and randomly pick one answer to record",
        "ja": "食い違いを無視し、記録する回答をランダムに選ぶ"
      },
      {
        "vi": "Kết luận ngay rằng tổ chức không đạt bất kỳ checkpoint nào",
        "en": "Immediately conclude that the organization meets no checkpoints at all",
        "ja": "組織がいかなるチェックポイントも満たしていないと即座に結論づける"
      },
      {
        "vi": "Thu thập thêm bằng chứng khách quan (tài liệu, số liệu, quan sát thực tế) để đối chiếu và xác nhận trạng thái thực sự trước khi kết luận checkpoint đạt hay chưa",
        "en": "Gather further objective evidence (documents, data, real-world observation) to cross-check and confirm the actual state before concluding whether the checkpoint is met",
        "ja": "チェックポイントが満たされているかを結論づける前に、追加の客観的証拠(文書、データ、実際の観察)を収集して照合・確認する"
      },
      {
        "vi": "Huỷ toàn bộ cuộc đánh giá và không báo cáo kết quả gì",
        "en": "Cancel the entire assessment and report no results at all",
        "ja": "評価全体を中止し何の結果も報告しない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Đánh giá TPI Next cần dựa trên bằng chứng khách quan, không chỉ lời khai chủ quan; khi có mâu thuẫn giữa các nguồn, chuyên gia đánh giá phải thu thập thêm tài liệu, số liệu, quan sát thực tế để xác nhận chính xác trạng thái checkpoint trước khi kết luận.",
      "en": "TPI Next assessment must rely on objective evidence, not just subjective statements; when sources conflict, the assessor must gather additional documents, data and real-world observations to accurately confirm the checkpoint status before concluding.",
      "ja": "TPI Nextの評価は主観的な発言だけでなく客観的な証拠に基づく必要がある。情報源に矛盾がある場合、評価者は結論を出す前に追加の文書、データ、実際の観察を収集し、チェックポイントの状態を正確に確認しなければならない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Reporting\" trong TPI Next tập trung đánh giá điều gì, khác với vùng \"Metrics\"?",
      "en": "What does the \"Reporting\" key area in TPI Next focus on assessing, as distinct from the \"Metrics\" key area?",
      "ja": "TPI Nextの「レポーティング」キーエリアは「メトリクス」キーエリアと異なり何を評価することに焦点を当てるか。"
    },
    "options": [
      {
        "vi": "Reporting không có mối liên hệ nào với việc ra quyết định của lãnh đạo",
        "en": "Reporting has no relation whatsoever to leadership decision-making",
        "ja": "レポーティングは経営陣の意思決定とは一切関連がない"
      },
      {
        "vi": "Reporting và Metrics là hai tên gọi khác nhau của cùng một vùng năng lực duy nhất",
        "en": "Reporting and Metrics are simply two different names for the exact same single key area",
        "ja": "レポーティングとメトリクスは単一の同じキーエリアの異なる呼称にすぎない"
      },
      {
        "vi": "Reporting chỉ liên quan đến việc in báo cáo trên giấy A4",
        "en": "Reporting relates only to printing reports on A4 paper",
        "ja": "レポーティングはA4用紙に報告書を印刷することにのみ関連する"
      },
      {
        "vi": "Reporting đánh giá cách thông tin kiểm thử được tổng hợp, truyền đạt đúng đối tượng, đúng thời điểm để hỗ trợ ra quyết định; còn Metrics tập trung vào việc thu thập, chuẩn hoá dữ liệu đo lường",
        "en": "Reporting assesses how test information is compiled and communicated to the right audience at the right time to support decision-making; Metrics focuses on collecting and standardizing measurement data",
        "ja": "レポーティングは、テスト情報が適切な対象者に適切なタイミングで意思決定を支援するようまとめられ伝達されるかを評価し、メトリクスは測定データの収集と標準化に焦点を当てる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Trong TPI Next, Reporting và Metrics là hai vùng năng lực riêng biệt: Metrics liên quan đến việc thu thập/chuẩn hoá dữ liệu đo lường, còn Reporting liên quan đến việc tổng hợp và truyền đạt thông tin đó đúng đối tượng, đúng lúc để hỗ trợ ra quyết định hiệu quả.",
      "en": "In TPI Next, Reporting and Metrics are separate key areas: Metrics concerns collecting/standardizing measurement data, while Reporting concerns compiling and communicating that information to the right audience at the right time to support effective decisions.",
      "ja": "TPI Nextにおいて、レポーティングとメトリクスは別個のキーエリアである。メトリクスは測定データの収集・標準化に関わり、レポーティングはその情報を適切な対象者に適切なタイミングでまとめて伝達し、効果的な意思決定を支援することに関わる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một tổ chức chuyển từ mô hình phát triển tuần tự sang Agile/DevOps, TPI Next khuyến nghị điều gì đối với các checkpoint truyền thống không còn phù hợp?",
      "en": "When an organization transitions from sequential development to Agile/DevOps, what does TPI Next recommend regarding traditional checkpoints that no longer fit?",
      "ja": "組織がシーケンシャル開発からアジャイル/DevOpsへ移行する際、もはや適合しない従来のチェックポイントについてTPI Nextは何を推奨するか。"
    },
    "options": [
      {
        "vi": "Diễn giải và điều chỉnh checkpoint cho phù hợp với ngữ cảnh Agile/DevOps trong khi vẫn giữ mục tiêu cốt lõi của vùng năng lực đó",
        "en": "Interpret and adapt checkpoints to fit the Agile/DevOps context while retaining the core intent of that key area",
        "ja": "当該キーエリアの本質的な目的を維持しながら、アジャイル/DevOpsの文脈に合わせてチェックポイントを解釈・調整する"
      },
      {
        "vi": "Loại bỏ hoàn toàn khái niệm vùng năng lực và không đánh giá kiểm thử nữa",
        "en": "Completely abandon the key area concept and stop assessing testing altogether",
        "ja": "キーエリアの概念を完全に放棄しテストの評価自体をやめる"
      },
      {
        "vi": "Giữ nguyên tuyệt đối mọi checkpoint gốc, không được điều chỉnh trong bất kỳ trường hợp nào",
        "en": "Keep every original checkpoint absolutely unchanged under any circumstance",
        "ja": "いかなる状況でも元のチェックポイントを一切変更せず絶対にそのまま維持する"
      },
      {
        "vi": "Chuyển toàn bộ trách nhiệm đánh giá cho bộ phận nhân sự thay vì đội kiểm thử",
        "en": "Transfer all assessment responsibility to the HR department instead of the test team",
        "ja": "評価の責任をすべてテストチームではなく人事部門に移す"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "TPI Next là mô hình linh hoạt, không mang tính giáo điều; khi ngữ cảnh phát triển thay đổi (như sang Agile/DevOps), tổ chức nên diễn giải lại checkpoint sao cho phù hợp thực tiễn mới nhưng vẫn giữ được mục tiêu và tinh thần cốt lõi của vùng năng lực.",
      "en": "TPI Next is a flexible, non-dogmatic model; when the development context changes (e.g. to Agile/DevOps), organizations should reinterpret checkpoints to fit the new reality while preserving the core intent and spirit of the key area.",
      "ja": "TPI Nextは柔軟で教条的でないモデルである。開発の文脈が変化した場合(例:アジャイル/DevOpsへ)、組織は新しい実態に合わせてチェックポイントを再解釈すべきだが、そのキーエリアの本質的な目的と精神は維持すべきである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Test Organization\" trong TPI Next đánh giá chủ yếu điều gì?",
      "en": "What does the \"Test Organization\" key area in TPI Next mainly assess?",
      "ja": "TPI Nextの「テスト組織」キーエリアは主に何を評価するか。"
    },
    "options": [
      {
        "vi": "Chỉ đánh giá diện tích văn phòng làm việc của nhóm kiểm thử",
        "en": "Only assesses the office floor area of the test team",
        "ja": "テストチームのオフィス面積のみを評価する"
      },
      {
        "vi": "Cấu trúc, vai trò, trách nhiệm và vị trí của chức năng kiểm thử trong tổ chức tổng thể, cũng như mức độ độc lập và ảnh hưởng của nó",
        "en": "The structure, roles, responsibilities and positioning of the test function within the overall organization, as well as its degree of independence and influence",
        "ja": "組織全体におけるテスト機能の構造、役割、責任、位置づけ、およびその独立性と影響力の程度"
      },
      {
        "vi": "Chỉ đánh giá màu sắc trang phục đồng phục nhân viên",
        "en": "Only assesses the color of employee uniform attire",
        "ja": "従業員の制服の色のみを評価する"
      },
      {
        "vi": "Chỉ đánh giá tốc độ mạng nội bộ công ty",
        "en": "Only assesses the company's internal network speed",
        "ja": "社内ネットワークの速度のみを評価する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Test Organization xem xét cách chức năng kiểm thử được cấu trúc, vai trò/trách nhiệm được phân định, mức độ độc lập so với đội phát triển, và vị thế/ảnh hưởng của kiểm thử trong tổ chức — yếu tố then chốt cho quyết định chiến lược ở mức Expert.",
      "en": "Test Organization examines how the test function is structured, how roles/responsibilities are defined, its degree of independence from development, and its standing/influence in the organization — a key factor for strategic decisions at Expert level.",
      "ja": "テスト組織は、テスト機能がどのように構成されているか、役割・責任がどのように定義されているか、開発チームからの独立性の程度、組織内での地位・影響力を検討する。これはExpertレベルでの戦略的意思決定における重要な要素である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh CTEL, một chuyên gia cải tiến quy trình cần trình bày mối liên hệ giữa TPI Next và ROI (Return on Investment) đầu tư cải tiến. Cách lập luận nào PHÙ HỢP nhất?",
      "en": "In a CTEL context, a process improvement expert must present the link between TPI Next and the ROI of improvement investment. Which line of reasoning is MOST appropriate?",
      "ja": "CTELの文脈で、プロセス改善専門家がTPI Nextと改善投資のROI(投資収益率)との関連を提示する必要がある場合、最も適切な論拠はどれか。"
    },
    "options": [
      {
        "vi": "ROI không bao giờ có thể liên hệ với cải tiến quy trình kiểm thử nên không cần đề cập",
        "en": "ROI can never be linked to test process improvement, so it need not be mentioned",
        "ja": "ROIはテストプロセス改善と決して結びつけられないため言及する必要はない"
      },
      {
        "vi": "ROI chỉ tính được khi tổ chức đạt mức Optimizing ở tất cả 16 vùng năng lực cùng lúc",
        "en": "ROI can only be calculated once the organization reaches Optimizing in all 16 key areas simultaneously",
        "ja": "ROIは組織が16のキーエリアすべてで同時に最適化レベルに到達した場合にのみ算出できる"
      },
      {
        "vi": "Nâng mức trưởng thành các vùng năng lực liên quan đến business driver cụ thể (ví dụ giảm chi phí sửa lỗi trễ, tăng tốc time-to-market) giúp lượng hoá lợi ích và tính toán ROI thuyết phục hơn",
        "en": "Raising the maturity of key areas tied to specific business drivers (e.g. reducing late-defect cost, accelerating time-to-market) helps quantify benefits and build a more persuasive ROI case",
        "ja": "特定のビジネスドライバー(例:後工程での欠陥修正コスト削減、市場投入までの時間短縮)に関連するキーエリアの成熟度を高めることは、利益の定量化とより説得力のあるROI算出に役立つ"
      },
      {
        "vi": "ROI hoàn toàn không liên quan đến business driver hay vùng năng lực nào",
        "en": "ROI is completely unrelated to any business driver or key area",
        "ja": "ROIはいかなるビジネスドライバーやキーエリアとも一切関連がない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ở tầm chuyên gia CTEL, việc gắn kết cải tiến vùng năng lực cụ thể với business driver (giảm chi phí, tăng tốc phát hành...) giúp lượng hoá được lợi ích tài chính/kinh doanh, từ đó xây dựng luận điểm ROI thuyết phục cho lãnh đạo khi đầu tư cải tiến.",
      "en": "At the CTEL expert level, tying improvement of specific key areas to business drivers (cost reduction, faster releases, etc.) enables quantifying financial/business benefits, building a persuasive ROI case for leadership when investing in improvement.",
      "ja": "CTEL専門家レベルでは、特定のキーエリアの改善を(コスト削減、リリース高速化などの)ビジネスドライバーに結びつけることで財務的・事業的利益を定量化でき、改善投資に関する経営陣への説得力あるROI論拠を構築できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vùng năng lực \"Involvement of Stakeholders\" trong TPI Next đề cập đến điều gì?",
      "en": "What does the \"Involvement of Stakeholders\" key area in TPI Next refer to?",
      "ja": "TPI Nextの「ステークホルダーの関与」キーエリアは何を指すか。"
    },
    "options": [
      {
        "vi": "Chỉ đo lường số giờ làm thêm của đội kiểm thử",
        "en": "Only measures the number of overtime hours worked by the test team",
        "ja": "テストチームの残業時間数のみを測定する"
      },
      {
        "vi": "Số lượng người theo dõi trang mạng xã hội chính thức của công ty",
        "en": "The number of followers on the company's official social media page",
        "ja": "会社の公式ソーシャルメディアページのフォロワー数"
      },
      {
        "vi": "Chỉ liên quan đến việc tổ chức tiệc cuối năm cho nhân viên",
        "en": "Relates only to organizing the company's year-end party for employees",
        "ja": "従業員のための忘年会の開催にのみ関連する"
      },
      {
        "vi": "Mức độ và cách thức các bên liên quan (khách hàng, người dùng, đội phát triển, quản lý) tham gia thực chất vào các hoạt động và quyết định kiểm thử",
        "en": "The extent and manner in which stakeholders (customers, users, development team, management) genuinely participate in testing activities and decisions",
        "ja": "ステークホルダー(顧客、ユーザー、開発チーム、経営陣)がテスト活動や意思決定に実質的に参加する程度と方法"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Involvement of Stakeholders đánh giá mức độ các bên liên quan thực sự tham gia (không chỉ mang tính hình thức) vào việc xác định phạm vi, chiến lược, đánh giá rủi ro và ra quyết định kiểm thử, ảnh hưởng trực tiếp đến chất lượng và sự phù hợp của kết quả kiểm thử.",
      "en": "Involvement of Stakeholders assesses how genuinely (not just formally) stakeholders participate in defining scope, strategy, risk assessment and testing decisions, directly affecting the quality and relevance of test outcomes.",
      "ja": "ステークホルダーの関与は、ステークホルダーが(形式的にではなく)実質的にスコープ定義、戦略、リスク評価、テストの意思決定にどの程度参加しているかを評価し、テスト成果の質と妥当性に直接影響する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Điểm khác biệt then chốt giữa vùng năng lực \"Testware Management\" và \"Test Tools\" trong TPI Next là gì?",
      "en": "What is the key difference between the \"Testware Management\" and \"Test Tools\" key areas in TPI Next?",
      "ja": "TPI Nextにおける「テストウェア管理」と「テストツール」キーエリアの主な違いは何か。"
    },
    "options": [
      {
        "vi": "Testware Management tập trung vào việc quản lý, tái sử dụng và bảo trì các sản phẩm kiểm thử (ca kiểm thử, kịch bản, dữ liệu); Test Tools tập trung vào việc lựa chọn, triển khai và sử dụng công cụ hỗ trợ kiểm thử",
        "en": "Testware Management focuses on managing, reusing and maintaining test work products (test cases, scripts, data); Test Tools focuses on selecting, implementing and using tools supporting testing",
        "ja": "テストウェア管理はテスト成果物(テストケース、スクリプト、データ)の管理・再利用・保守に焦点を当て、テストツールはテストを支援するツールの選定・導入・使用に焦点を当てる"
      },
      {
        "vi": "Cả hai vùng năng lực hoàn toàn giống nhau và có thể dùng thay thế cho nhau",
        "en": "Both key areas are entirely identical and can be used interchangeably",
        "ja": "両方のキーエリアは完全に同一であり相互に置き換え可能である"
      },
      {
        "vi": "Testware Management chỉ áp dụng khi dùng công cụ kiểm thử miễn phí",
        "en": "Testware Management applies only when free testing tools are used",
        "ja": "テストウェア管理は無料のテストツールを使用する場合にのみ適用される"
      },
      {
        "vi": "Test Tools chỉ áp dụng cho kiểm thử hiệu năng, không áp dụng cho kiểm thử chức năng",
        "en": "Test Tools applies only to performance testing, not functional testing",
        "ja": "テストツールはパフォーマンステストにのみ適用され、機能テストには適用されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Testware Management liên quan đến quản lý vòng đời, khả năng tái sử dụng và bảo trì các sản phẩm kiểm thử; trong khi Test Tools liên quan đến việc chọn lựa, triển khai, tích hợp và khai thác công cụ phục vụ hoạt động kiểm thử — hai vùng năng lực bổ trợ nhưng khác trọng tâm.",
      "en": "Testware Management concerns the lifecycle management, reusability and maintenance of test work products, while Test Tools concerns selecting, implementing, integrating and leveraging tools to support testing activities — complementary but distinct focuses.",
      "ja": "テストウェア管理はテスト成果物のライフサイクル管理、再利用性、保守に関わる一方、テストツールはテスト活動を支援するツールの選定・導入・統合・活用に関わる。両者は補完的だが焦点が異なるキーエリアである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thực hiện TPI Next assessment, việc sử dụng nhiều nguồn bằng chứng (phỏng vấn, tài liệu, quan sát trực tiếp) thay vì chỉ một nguồn nhằm mục đích gì?",
      "en": "When conducting a TPI Next assessment, why use multiple evidence sources (interviews, documents, direct observation) instead of just one?",
      "ja": "TPI Next評価を実施する際、単一の情報源ではなく複数の証拠源(インタビュー、文書、直接観察)を使用する目的は何か。"
    },
    "options": [
      {
        "vi": "Để kéo dài thời gian đánh giá càng lâu càng tốt nhằm tăng chi phí tư vấn",
        "en": "To prolong the assessment as long as possible in order to increase consulting fees",
        "ja": "コンサルティング費用を増やすため評価をできるだけ長引かせるため"
      },
      {
        "vi": "Để tam giác hoá (triangulate) thông tin, giảm sai lệch chủ quan và tăng độ tin cậy khi kết luận mức trưởng thành của mỗi checkpoint",
        "en": "To triangulate information, reduce subjective bias and increase reliability when concluding the maturity status of each checkpoint",
        "ja": "情報をトライアンギュレーション(三角測量)し、主観的バイアスを減らし、各チェックポイントの成熟度判定の信頼性を高めるため"
      },
      {
        "vi": "Vì quy định pháp luật bắt buộc phải phỏng vấn tối thiểu 10 người",
        "en": "Because regulations legally require interviewing at least 10 people",
        "ja": "法律で最低10人へのインタビューが義務付けられているため"
      },
      {
        "vi": "Để tránh phải viết báo cáo đánh giá cuối cùng",
        "en": "To avoid having to write the final assessment report",
        "ja": "最終評価報告書を書かずに済ませるため"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Sử dụng nhiều nguồn bằng chứng độc lập giúp chuyên gia đánh giá tam giác hoá thông tin, đối chiếu chéo, giảm thiểu sai lệch do nhận thức chủ quan của một cá nhân, từ đó đưa ra kết luận đáng tin cậy hơn về mức trưởng thành thực sự của từng checkpoint.",
      "en": "Using multiple independent evidence sources allows the assessor to triangulate information, cross-verify, and reduce bias from any single individual's subjective perception, leading to more reliable conclusions about the true maturity of each checkpoint.",
      "ja": "複数の独立した証拠源を使用することで、評価者は情報をトライアンギュレーションし、相互検証を行い、単一個人の主観的認識によるバイアスを低減できる。これにより各チェックポイントの真の成熟度についてより信頼性の高い結論を導ける。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi xây dựng ma trận kỹ năng (skills matrix) cho đội test, mục đích chính là gì?",
      "en": "When building a skills matrix for a test team, what is the primary purpose?",
      "ja": "テストチームのスキルマトリクスを作成する主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn quy trình đánh giá hiệu suất hàng năm",
        "en": "Completely replace the annual performance review process",
        "ja": "年次人事評価プロセスを完全に置き換えるため"
      },
      {
        "vi": "Chỉ để xếp hạng và sa thải nhân viên yếu nhất",
        "en": "Only to rank and dismiss the weakest employees",
        "ja": "最も能力の低い従業員を格付けし解雇するためだけのもの"
      },
      {
        "vi": "Định vị khoảng trống kỹ năng của từng thành viên để lập kế hoạch đào tạo và phân công công việc phù hợp",
        "en": "Identify each member's skill gaps to plan training and assign work appropriately",
        "ja": "各メンバーのスキルギャップを特定し、教育計画と適切な業務割り当てに活用するため"
      },
      {
        "vi": "Dùng riêng để tính thưởng cuối năm",
        "en": "Used solely to calculate year-end bonuses",
        "ja": "年末ボーナスの計算だけに使うため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ma trận kỹ năng giúp test manager nhìn rõ năng lực hiện có và khoảng trống của đội, từ đó lập kế hoạch đào tạo, tuyển dụng và phân công công việc phù hợp với chiến lược kiểm thử.",
      "en": "A skills matrix gives the test manager visibility into current capabilities and gaps, enabling targeted training, hiring, and work allocation aligned with the test strategy.",
      "ja": "スキルマトリクスにより、テストマネージャーはチームの現有能力と不足点を把握でき、テスト戦略に沿った教育計画・採用・業務割り当てが可能になります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một đội test chỉ gồm toàn 'generalist' đa năng, không có chuyên gia sâu về bảo mật hay hiệu năng - nhược điểm chính khi làm dự án phức tạp là gì?",
      "en": "A test team composed entirely of multi-skilled generalists, with no security or performance specialists, faces what main drawback on a complex project?",
      "ja": "セキュリティや性能テストの専門家を持たず、多能型ジェネラリストのみで構成されたテストチームは、複雑なプロジェクトでどんな主な弱点を抱えますか。"
    },
    "options": [
      {
        "vi": "Chi phí tuyển dụng luôn thấp hơn đội có chuyên gia",
        "en": "Recruitment cost is always lower than a team with specialists",
        "ja": "専門家を持つチームより採用コストが常に低い"
      },
      {
        "vi": "Luôn gây xung đột nội bộ nhiều hơn đội chuyên sâu",
        "en": "Always causes more internal conflict than a specialist team",
        "ja": "専門型チームより常に内部対立が多い"
      },
      {
        "vi": "Không thể áp dụng được trong mô hình Agile",
        "en": "Cannot be applied in an Agile model",
        "ja": "アジャイルモデルには適用できない"
      },
      {
        "vi": "Thiếu chiều sâu chuyên môn cần thiết cho các loại kiểm thử đặc thù như bảo mật, hiệu năng",
        "en": "Lacks the deep expertise required for specialized testing such as security and performance",
        "ja": "セキュリティや性能テストなど専門性の高いテストに必要な深い知識が不足する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Với hệ thống phức tạp, các loại kiểm thử đặc thù (bảo mật, hiệu năng, khả năng dùng...) đòi hỏi kiến thức và công cụ chuyên sâu mà generalist khó đạt được đầy đủ, dẫn đến rủi ro bỏ sót lỗ hổng nghiêm trọng.",
      "en": "Complex systems require specialized testing (security, performance, usability) that demands deep expertise generalists rarely possess, risking undetected critical defects.",
      "ja": "複雑なシステムでは、セキュリティ・性能・ユーザビリティなど専門性の高いテストに深い知識と専用ツールが必要で、ジェネラリストだけでは重大な欠陥を見逃すリスクがあります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nếu đánh giá hiệu suất tester chỉ dựa trên số lượng defect tìm được, rủi ro lớn nhất về mặt quản lý con người là gì?",
      "en": "If tester performance is evaluated solely by the number of defects found, what is the biggest people-management risk?",
      "ja": "テスターの人事評価を発見した欠陥数だけで行う場合、人材マネジメント上の最大のリスクは何ですか。"
    },
    "options": [
      {
        "vi": "Khuyến khích hành vi lệch lạc như báo cáo defect vụn vặt, bỏ qua công việc phòng ngừa và hợp tác nhóm",
        "en": "Encourages dysfunctional behavior such as reporting trivial defects and neglecting preventive work and teamwork",
        "ja": "些末な欠陥報告や予防的な作業・チーム協力の軽視といった歪んだ行動を助長する"
      },
      {
        "vi": "Giúp tăng chất lượng sản phẩm một cách tự động mà không cần biện pháp khác",
        "en": "Automatically improves product quality without any other measures",
        "ja": "他の施策なしに製品品質を自動的に高める"
      },
      {
        "vi": "Không có rủi ro nào, đây là chỉ số chuẩn duy nhất cần dùng",
        "en": "No risk at all; it is the only standard metric needed",
        "ja": "リスクはなく、これが唯一使うべき標準指標である"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu review test case",
        "en": "Completely eliminates the need for test case reviews",
        "ja": "テストケースレビューの必要性を完全になくす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Chỉ số đơn lẻ như số lượng defect dễ bị 'game hoá', khiến tester ưu tiên số lượng thay vì chất lượng phân tích rủi ro, phòng ngừa lỗi và hợp tác với dev - trái với tư duy quản lý hiệu suất toàn diện.",
      "en": "A single metric like defect count can be gamed, causing testers to chase quantity instead of risk analysis quality, defect prevention, and collaboration with developers - undermining holistic performance management.",
      "ja": "欠陥数のような単一指標は容易に操作され、テスターがリスク分析の質・欠陥予防・開発者との協働よりも数量を優先してしまい、包括的な業績管理の観点から望ましくありません。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Lộ trình phát triển năng lực (career path) cho tester ở cấp độ chiến lược nên được xây dựng dựa trên yếu tố nào?",
      "en": "At a strategic level, what should a tester's career development path be built upon?",
      "ja": "戦略レベルにおいて、テスターのキャリア開発パスは何に基づいて設計すべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ dựa vào thâm niên làm việc",
        "en": "Only based on years of tenure",
        "ja": "勤続年数のみに基づく"
      },
      {
        "vi": "Kết hợp năng lực kỹ thuật, kỹ năng mềm, mức độ đóng góp và mục tiêu nghề nghiệp cá nhân",
        "en": "A combination of technical competence, soft skills, contribution level, and individual career goals",
        "ja": "技術力・ソフトスキル・貢献度・個人のキャリア目標を組み合わせたもの"
      },
      {
        "vi": "Chỉ dựa vào đánh giá chủ quan của quản lý trực tiếp",
        "en": "Only based on the subjective judgment of the direct manager",
        "ja": "直属の上司の主観的評価のみに基づく"
      },
      {
        "vi": "Chỉ dựa vào số lượng chứng chỉ ISTQB đã có",
        "en": "Only based on the number of ISTQB certifications held",
        "ja": "保有するISTQB資格の数のみに基づく"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Một lộ trình phát triển bền vững cần đa chiều, cân bằng giữa năng lực chuyên môn, kỹ năng mềm, đóng góp thực tế và nguyện vọng cá nhân, thay vì dựa vào một tiêu chí đơn lẻ.",
      "en": "A sustainable development path must be multidimensional, balancing technical ability, soft skills, real contribution, and personal aspirations rather than relying on a single criterion.",
      "ja": "持続可能な育成計画は、単一基準に頼るのではなく、専門能力・ソフトスキル・実際の貢献・個人の希望を多面的にバランスさせる必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "So với mô hình đội test 'embedded' (nhúng vào từng nhóm Agile), ưu điểm chính của mô hình 'centralized' (tập trung) là gì?",
      "en": "Compared to an 'embedded' test team model (integrated into each Agile team), what is the main advantage of a 'centralized' test team model?",
      "ja": "アジャイルチームに組み込まれた「エンベデッド型」テストチームと比較して、「集中型」テストチームの主な利点は何ですか。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu giao tiếp với đội phát triển",
        "en": "Completely eliminates the need to communicate with the development team",
        "ja": "開発チームとのコミュニケーションの必要性を完全になくす"
      },
      {
        "vi": "Tester luôn hiểu sâu domain nghiệp vụ của một nhóm duy nhất",
        "en": "Testers always gain deep domain knowledge of a single team",
        "ja": "テスターが常に単一チームの業務ドメインを深く理解できる"
      },
      {
        "vi": "Dễ chuẩn hoá quy trình, chia sẻ nguồn lực và điều phối chuyên gia giữa các dự án",
        "en": "Easier to standardize processes, share resources, and coordinate specialists across projects",
        "ja": "プロセスの標準化、リソース共有、複数プロジェクト間での専門家の調整がしやすい"
      },
      {
        "vi": "Giảm thời gian phản hồi trong sprint xuống bằng 0",
        "en": "Reduces feedback time within a sprint to zero",
        "ja": "スプリント内のフィードバック時間をゼロにする"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Mô hình tập trung cho phép chuẩn hoá quy trình, công cụ, chia sẻ chuyên gia (bảo mật, hiệu năng) linh hoạt giữa nhiều dự án - điều mà mô hình nhúng khó đạt được do mỗi tester gắn chặt vào một nhóm.",
      "en": "Centralization enables process/tool standardization and flexible sharing of specialists (security, performance) across projects, which embedded models struggle with since each tester is tied to one team.",
      "ja": "集中型はプロセス・ツールの標準化と、セキュリティや性能などの専門家を複数プロジェクト間で柔軟に共有できる点が強みで、各テスターが1チームに固定されるエンベデッド型では難しい利点です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi coaching một tester mới vào nghề, test manager cấp chuyên gia nên ưu tiên cách tiếp cận nào?",
      "en": "When coaching a newly hired tester, what approach should an expert-level test manager prioritize?",
      "ja": "新人テスターを指導する際、エキスパートレベルのテストマネージャーはどのアプローチを優先すべきですか。"
    },
    "options": [
      {
        "vi": "Giao ngay các ca kiểm thử phức tạp nhất để thử thách năng lực",
        "en": "Immediately assign the most complex test cases to challenge their ability",
        "ja": "能力を試すためにいきなり最も複雑なテストケースを割り当てる"
      },
      {
        "vi": "Chỉ tập trung đào tạo công cụ tự động hoá, bỏ qua tư duy kiểm thử",
        "en": "Focus only on automation tool training, ignoring testing mindset",
        "ja": "テストの思考法を無視し、自動化ツールの教育だけに集中する"
      },
      {
        "vi": "Yêu cầu tự học hoàn toàn, không cần bất kỳ hỗ trợ nào",
        "en": "Require fully independent self-study with no support at all",
        "ja": "一切のサポートなしで完全な自習を求める"
      },
      {
        "vi": "Xây dựng lộ trình học tập có giám sát, phản hồi thường xuyên và tăng dần độ khó",
        "en": "Build a supervised learning path with regular feedback and gradually increasing difficulty",
        "ja": "監督付きの学習パスを構築し、定期的なフィードバックと段階的な難易度上昇を行う"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Coaching hiệu quả theo nguyên lý học tập tăng dần (scaffolding): giám sát chặt, phản hồi kịp thời, tăng độ khó từng bước giúp tester mới xây dựng năng lực bền vững thay vì bị 'ném vào' áp lực quá sớm.",
      "en": "Effective coaching follows a scaffolded learning approach: close supervision, timely feedback, and incrementally increasing difficulty build sustainable competence rather than overwhelming a newcomer.",
      "ja": "効果的な指導は段階的な学習(スキャフォールディング)に基づき、密な監督・タイムリーなフィードバック・段階的な難易度上昇によって、新人を早期に過度なプレッシャーにさらすことなく持続的な能力を育てます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Hai tester bất đồng về cách tiếp cận độ bao phủ kiểm thử (test coverage) cho một tính năng quan trọng - cách xử lý đúng của test manager là gì?",
      "en": "Two testers disagree on the test coverage approach for a critical feature - what is the correct way for the test manager to handle this?",
      "ja": "重要機能のテストカバレッジの進め方について2人のテスターが対立しています。テストマネージャーとして正しい対応は何ですか。"
    },
    "options": [
      {
        "vi": "Tạo không gian trao đổi cởi mở, dựa trên dữ liệu và phân tích rủi ro để đạt đồng thuận",
        "en": "Create an open discussion space and use data and risk analysis to reach consensus",
        "ja": "オープンな議論の場を設け、データとリスク分析に基づき合意形成を図る"
      },
      {
        "vi": "Tránh né hoàn toàn, để hai bên tự giải quyết mà không can thiệp",
        "en": "Completely avoid involvement, letting both parties resolve it without any intervention",
        "ja": "一切関与せず、両者に自己解決を任せる"
      },
      {
        "vi": "Tự ý ra quyết định ngay lập tức mà không giải thích lý do",
        "en": "Immediately make a unilateral decision without explaining the reasoning",
        "ja": "理由を説明せずに即座に一方的な決定を下す"
      },
      {
        "vi": "Loại một trong hai người khỏi dự án ngay lập tức để tránh xung đột kéo dài",
        "en": "Immediately remove one of the two testers from the project to avoid prolonged conflict",
        "ja": "対立の長期化を避けるため、どちらか一方を即座にプロジェクトから外す"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Xử lý xung đột chuyên môn hiệu quả cần dựa trên dữ liệu khách quan (rủi ro, mức độ ảnh hưởng) và tạo điều kiện đối thoại, thay vì áp đặt hoặc né tránh - đây là kỹ năng lãnh đạo cốt lõi của test manager cấp chuyên gia.",
      "en": "Resolving technical conflicts effectively requires objective data (risk, impact) and facilitated dialogue rather than imposing decisions or avoidance - a core leadership skill for an expert-level test manager.",
      "ja": "技術的対立の効果的な解決には、決定の押し付けや回避ではなく、客観的データ(リスク・影響度)に基づく対話の促進が必要であり、これはエキスパートレベルのテストマネージャーに不可欠なリーダーシップスキルです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Theo lý thuyết hai yếu tố của Herzberg áp dụng vào quản lý đội test, 'yếu tố duy trì' (hygiene) khác 'yếu tố tạo động lực' (motivator) như thế nào?",
      "en": "Applying Herzberg's two-factor theory to test team management, how do 'hygiene factors' differ from 'motivator factors'?",
      "ja": "ハーズバーグの二要因理論をテストチーム管理に適用した場合、「衛生要因」と「動機付け要因」はどう異なりますか。"
    },
    "options": [
      {
        "vi": "Cả hai đều tạo động lực làm việc như nhau, không có sự khác biệt",
        "en": "Both create the same level of work motivation; there is no difference",
        "ja": "両者は同じように労働意欲を生み、違いはない"
      },
      {
        "vi": "Yếu tố duy trì (lương, điều kiện) ngăn bất mãn nhưng không tự tạo động lực; yếu tố tạo động lực (thành tựu, công nhận) mới thúc đẩy hiệu suất",
        "en": "Hygiene factors (salary, conditions) prevent dissatisfaction but don't themselves motivate; motivator factors (achievement, recognition) actually drive performance",
        "ja": "衛生要因(給与・環境)は不満を防ぐだけで意欲を生まないが、動機付け要因(達成感・承認)こそが業績を高める"
      },
      {
        "vi": "Yếu tố tạo động lực chính là mức lương và điều kiện làm việc vật chất",
        "en": "Motivator factors are salary and physical working conditions",
        "ja": "動機付け要因とは給与や物理的な労働条件のことである"
      },
      {
        "vi": "Yếu tố duy trì luôn quan trọng hơn yếu tố tạo động lực trong mọi trường hợp",
        "en": "Hygiene factors are always more important than motivators in every case",
        "ja": "衛生要因は常に動機付け要因より重要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Herzberg phân biệt rõ: yếu tố duy trì chỉ ngăn bất mãn (điều kiện cần), còn yếu tố tạo động lực như sự công nhận, cơ hội phát triển mới thực sự thúc đẩy tester nỗ lực và gắn bó lâu dài.",
      "en": "Herzberg clearly distinguishes: hygiene factors merely prevent dissatisfaction (a necessary condition), while motivators such as recognition and growth opportunities genuinely drive tester effort and long-term engagement.",
      "ja": "ハーズバーグの理論では、衛生要因は不満を防ぐ必要条件に過ぎず、承認や成長機会といった動機付け要因こそがテスターの努力と長期的な定着を実際に促すとされています。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi quản lý đội test offshore/outsource ở nhiều quốc gia, thách thức đặc thù nào cần được ưu tiên giải quyết đầu tiên?",
      "en": "When managing an offshore/outsourced test team across multiple countries, what specific challenge should be prioritized first?",
      "ja": "複数の国にまたがるオフショア・アウトソーステストチームを管理する際、最初に優先して解決すべき固有の課題は何ですか。"
    },
    "options": [
      {
        "vi": "Không cần thiết lập quy trình bàn giao vì công việc đã tự động hoá hoàn toàn",
        "en": "No handover process is needed since work is fully automated",
        "ja": "業務は完全に自動化されているため引き継ぎプロセスは不要"
      },
      {
        "vi": "Chi phí nhân sự offshore luôn cao hơn đội in-house",
        "en": "Offshore staffing costs are always higher than an in-house team",
        "ja": "オフショア人件費は常に社内チームより高い"
      },
      {
        "vi": "Chênh lệch múi giờ, rào cản ngôn ngữ và khác biệt văn hoá ảnh hưởng đến giao tiếp và chuyển giao tri thức",
        "en": "Time zone gaps, language barriers, and cultural differences affecting communication and knowledge transfer",
        "ja": "タイムゾーンの差、言語の壁、文化的違いがコミュニケーションと知識移転に与える影響"
      },
      {
        "vi": "Không cần đánh giá hiệu suất định kỳ đối với đội offshore",
        "en": "Periodic performance evaluation is not needed for offshore teams",
        "ja": "オフショアチームに対する定期的な業績評価は不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Rào cản giao tiếp do múi giờ, ngôn ngữ và văn hoá là thách thức cốt lõi trong quản lý đội phân tán quốc tế, ảnh hưởng trực tiếp đến hiệu quả chuyển giao tri thức và phối hợp công việc.",
      "en": "Communication barriers from time zones, language, and culture are core challenges in managing internationally distributed teams, directly affecting knowledge transfer and work coordination effectiveness.",
      "ja": "タイムゾーン・言語・文化によるコミュニケーションの壁は、国際的に分散したチームを管理する上で中核的な課題であり、知識移転や作業連携の効果に直接影響します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Kế hoạch kế nhiệm (succession planning) cho vị trí test lead trong tổ chức nhằm mục đích chính gì?",
      "en": "What is the main purpose of succession planning for a test lead position within an organization?",
      "ja": "組織内のテストリード職に対するサクセッションプランニング(後継者育成計画)の主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Giảm mức lương của test lead hiện tại",
        "en": "Reduce the salary of the current test lead",
        "ja": "現任テストリードの給与を減らす"
      },
      {
        "vi": "Chỉ áp dụng khi công ty có trên 1000 nhân viên",
        "en": "Only applies when the company has more than 1000 employees",
        "ja": "従業員数1000人超の企業にのみ適用される"
      },
      {
        "vi": "Sa thải test lead hiện tại càng sớm càng tốt",
        "en": "Dismiss the current test lead as soon as possible",
        "ja": "現任テストリードを可能な限り早く解雇する"
      },
      {
        "vi": "Đảm bảo tính liên tục của tổ chức bằng cách chuẩn bị người kế nhiệm đủ năng lực khi có biến động nhân sự",
        "en": "Ensure organizational continuity by preparing a competent successor for personnel changes",
        "ja": "人事異動に備えて能力ある後継者を育成し、組織の継続性を確保する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Succession planning là công cụ quản trị rủi ro nhân sự chiến lược, giúp tổ chức không bị gián đoạn khi test lead nghỉ việc, thăng chức hay chuyển bộ phận, bất kể quy mô công ty.",
      "en": "Succession planning is a strategic HR risk-management tool that prevents organizational disruption when a test lead leaves, is promoted, or transfers, regardless of company size.",
      "ja": "サクセッションプランニングは戦略的な人材リスク管理の手段であり、企業規模に関わらず、テストリードの退職・昇進・異動時に組織が機能停止しないようにするものです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Phản hồi 360 độ (360-degree feedback) trong đánh giá tester mang lại giá trị gì mà đánh giá một chiều từ quản lý trực tiếp không có?",
      "en": "What value does 360-degree feedback bring to tester evaluation that one-way feedback from a direct manager lacks?",
      "ja": "テスター評価における360度フィードバックは、直属上司からの一方向的な評価にはない、どのような価値をもたらしますか。"
    },
    "options": [
      {
        "vi": "Thu thập góc nhìn đa chiều từ đồng nghiệp, dev, khách hàng nội bộ giúp phát hiện điểm mù của cả tester và quản lý",
        "en": "Gathers multi-perspective input from peers, developers, and internal stakeholders, revealing blind spots for both tester and manager",
        "ja": "同僚・開発者・社内関係者から多角的な視点を集め、テスターと管理者双方の盲点を明らかにする"
      },
      {
        "vi": "Giảm thời gian đánh giá xuống mức tối thiểu",
        "en": "Minimizes the time required for evaluation",
        "ja": "評価にかかる時間を最小限にする"
      },
      {
        "vi": "Luôn cho kết quả khách quan tuyệt đối, không cần diễn giải thêm",
        "en": "Always produces absolutely objective results requiring no further interpretation",
        "ja": "常に絶対的に客観的な結果を出し、追加の解釈が不要である"
      },
      {
        "vi": "Thay thế hoàn toàn các chỉ số KPI định lượng",
        "en": "Completely replaces quantitative KPIs",
        "ja": "定量的なKPIを完全に置き換える"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Giá trị cốt lõi của 360-degree feedback là tổng hợp nhiều góc nhìn khách quan hơn một đánh giá đơn tuyến, giúp phát hiện điểm mù mà chỉ quản lý trực tiếp khó nhận ra hết.",
      "en": "The core value of 360-degree feedback is synthesizing multiple perspectives for greater objectivity than single-source review, surfacing blind spots a direct manager alone might miss.",
      "ja": "360度フィードバックの本質的価値は、単一評価者よりも多角的な視点を統合することで、直属上司だけでは気づきにくい盲点を明らかにできる点にあります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi lập ngân sách đào tạo hàng năm cho đội test, tiêu chí ưu tiên nào phản ánh tư duy chiến lược của test manager cấp chuyên gia?",
      "en": "When planning the annual training budget for a test team, which prioritization criterion reflects an expert-level test manager's strategic thinking?",
      "ja": "テストチームの年間教育予算を策定する際、エキスパートレベルのテストマネージャーの戦略的思考を反映する優先基準は何ですか。"
    },
    "options": [
      {
        "vi": "Chia đều ngân sách cho tất cả nhân viên bất kể nhu cầu",
        "en": "Split the budget equally among all staff regardless of need",
        "ja": "必要性に関わらず全員に予算を均等配分する"
      },
      {
        "vi": "Gắn với khoảng trống kỹ năng đã xác định, mục tiêu chiến lược tổ chức và lộ trình phát triển cá nhân",
        "en": "Align it with identified skill gaps, organizational strategic goals, and individual development paths",
        "ja": "特定されたスキルギャップ、組織の戦略目標、個人の育成計画に結びつける"
      },
      {
        "vi": "Ưu tiên tuyệt đối cho chứng chỉ có học phí đắt tiền nhất",
        "en": "Give absolute priority to the most expensive certifications",
        "ja": "最も受講料の高い資格取得を絶対的に優先する"
      },
      {
        "vi": "Chỉ đầu tư cho nhân viên có thâm niên cao nhất",
        "en": "Invest only in the most senior employees",
        "ja": "最も勤続年数の長い従業員にのみ投資する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ngân sách đào tạo hiệu quả cần được đầu tư có mục tiêu, gắn với khoảng trống năng lực thực tế và chiến lược tổ chức, tối ưu hoá ROI về con người thay vì phân bổ dàn trải hoặc cảm tính.",
      "en": "An effective training budget should be targeted, linked to actual capability gaps and organizational strategy, optimizing people ROI rather than being spread evenly or spent subjectively.",
      "ja": "効果的な教育予算は、実際の能力ギャップと組織戦略に結びついた目的志向の投資であるべきで、均等配分や主観的な支出ではなく人材投資対効果を最適化するものです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "'Tâm lý an toàn' (psychological safety) trong đội test có vai trò gì đối với chất lượng kiểm thử tổng thể?",
      "en": "What role does 'psychological safety' in a test team play in overall test quality?",
      "ja": "テストチームにおける「心理的安全性」は、全体的なテスト品質にどのような役割を果たしますか。"
    },
    "options": [
      {
        "vi": "Chỉ quan trọng đối với đội phát triển, không áp dụng cho đội test",
        "en": "Only important for the development team, not applicable to the test team",
        "ja": "開発チームにのみ重要で、テストチームには当てはまらない"
      },
      {
        "vi": "Không liên quan gì đến chất lượng kiểm thử",
        "en": "Has no relation to test quality",
        "ja": "テスト品質とは無関係である"
      },
      {
        "vi": "Khuyến khích thành viên báo cáo rủi ro, sai sót và bất đồng ý kiến mà không sợ bị trừng phạt, giúp phát hiện vấn đề sớm",
        "en": "Encourages members to report risks, mistakes, and dissenting opinions without fear of punishment, enabling early problem detection",
        "ja": "処罰を恐れずにリスク・過ち・異なる意見を報告できるようメンバーを促し、問題の早期発見につながる"
      },
      {
        "vi": "Làm giảm tính kỷ luật của quy trình kiểm thử",
        "en": "Reduces the discipline of the testing process",
        "ja": "テストプロセスの規律を低下させる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tâm lý an toàn giúp tester dám nêu rủi ro, thừa nhận sai sót và tranh luận cởi mở, từ đó phát hiện vấn đề sớm hơn thay vì che giấu - yếu tố then chốt trong văn hoá kiểm thử trưởng thành.",
      "en": "Psychological safety enables testers to raise risks, admit mistakes, and debate openly, leading to earlier problem detection rather than concealment - a key element of a mature testing culture.",
      "ja": "心理的安全性は、テスターがリスクを表明し、過ちを認め、率直に議論することを可能にし、隠蔽ではなく問題の早期発見につながる、成熟したテスト文化の重要な要素です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Xây dựng đội test đa dạng về kỹ năng (kỹ thuật, domain nghiệp vụ, kỹ năng mềm) mang lại lợi ích chiến lược lớn nhất là gì?",
      "en": "Building a test team with diverse skills (technical, domain, soft skills) delivers what greatest strategic benefit?",
      "ja": "技術・業務ドメイン・ソフトスキルの多様なスキルを持つテストチームを構築することの最大の戦略的利点は何ですか。"
    },
    "options": [
      {
        "vi": "Giảm số lượng tester cần tuyển",
        "en": "Reduces the number of testers needed to hire",
        "ja": "採用すべきテスター数を減らせる"
      },
      {
        "vi": "Đảm bảo mọi tester đều làm được mọi việc như nhau",
        "en": "Ensures every tester can do every task equally well",
        "ja": "すべてのテスターが同じようにどの業務もこなせることを保証する"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu đào tạo liên tục",
        "en": "Completely eliminates the need for continuous training",
        "ja": "継続的な教育の必要性を完全になくす"
      },
      {
        "vi": "Tăng khả năng bao phủ rủi ro toàn diện từ nhiều góc nhìn khác nhau, giảm điểm mù kiểm thử",
        "en": "Increases comprehensive risk coverage from multiple perspectives, reducing testing blind spots",
        "ja": "多角的な視点からの包括的なリスクカバレッジを高め、テストの盲点を減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Sự đa dạng kỹ năng giúp đội test tiếp cận rủi ro từ nhiều góc độ (kỹ thuật, nghiệp vụ, người dùng), giảm điểm mù mà một đội đồng nhất dễ mắc phải.",
      "en": "Skill diversity lets the team approach risk from multiple angles (technical, business, user), reducing blind spots that a homogeneous team is prone to.",
      "ja": "スキルの多様性により、チームは技術・業務・ユーザーなど複数の視点からリスクにアプローチでき、均質なチームが陥りやすい盲点を減らせます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Chiến lược giữ chân (retention) tester giỏi hiệu quả nhất theo góc độ quản lý cấp chuyên gia là gì?",
      "en": "From an expert management perspective, what is the most effective retention strategy for skilled testers?",
      "ja": "エキスパートレベルの管理視点から見て、優秀なテスターを引き留める最も効果的な戦略は何ですか。"
    },
    "options": [
      {
        "vi": "Kết hợp lộ trình phát triển nghề nghiệp rõ ràng, công việc thách thức, công nhận thành tích và môi trường làm việc tốt",
        "en": "Combine a clear career path, challenging work, recognition of achievements, and a good working environment",
        "ja": "明確なキャリアパス、やりがいのある仕事、成果の承認、良好な職場環境を組み合わせる"
      },
      {
        "vi": "Giao toàn bộ công việc lặp lại để đảm bảo ổn định",
        "en": "Assign only repetitive work to ensure stability",
        "ja": "安定のため反復的な業務のみを与える"
      },
      {
        "vi": "Chỉ tăng lương định kỳ, không cần yếu tố khác",
        "en": "Only periodic salary increases, no other factors needed",
        "ja": "定期昇給のみで他の要素は不要"
      },
      {
        "vi": "Hạn chế đào tạo để tránh nhân viên rời đi tìm việc khác",
        "en": "Limit training to prevent employees from leaving for other jobs",
        "ja": "転職を防ぐため教育を制限する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nghiên cứu về giữ chân nhân tài cho thấy lương chỉ là một phần; sự kết hợp giữa cơ hội phát triển, thách thức nghề nghiệp, công nhận và môi trường làm việc mới tạo động lực gắn bó lâu dài.",
      "en": "Retention research shows salary is only one part; combining growth opportunities, meaningful challenges, recognition, and a supportive environment is what drives long-term engagement.",
      "ja": "人材定着に関する研究では、給与は一要素に過ぎず、成長機会・やりがいのある挑戦・承認・良好な環境の組み合わせこそが長期的な定着意欲を生むとされています。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Quy trình onboarding tester mới hiệu quả ở cấp độ tổ chức cần bao gồm yếu tố quan trọng nào?",
      "en": "An effective onboarding process for new testers at the organizational level should include what important element?",
      "ja": "組織レベルで効果的な新人テスターのオンボーディングプロセスには、どのような重要な要素を含むべきですか。"
    },
    "options": [
      {
        "vi": "Chỉ cần tài liệu kỹ thuật, không cần người hướng dẫn",
        "en": "Only technical documentation, no mentor needed",
        "ja": "技術資料だけで十分で、指導者は不要"
      },
      {
        "vi": "Kết hợp giới thiệu quy trình/công cụ, gán mentor và lộ trình làm quen dần với domain nghiệp vụ",
        "en": "Combine process/tool introduction, mentor assignment, and a gradual ramp-up into the business domain",
        "ja": "プロセス・ツールの紹介、メンター配置、業務ドメインへの段階的な慣熟計画を組み合わせる"
      },
      {
        "vi": "Bỏ qua văn hoá tổ chức, chỉ tập trung vào công cụ",
        "en": "Skip organizational culture, focus only on tools",
        "ja": "組織文化を無視し、ツールのみに焦点を当てる"
      },
      {
        "vi": "Giao dự án khó nhất ngay tuần đầu để đánh giá năng lực",
        "en": "Assign the hardest project in the first week to assess ability",
        "ja": "能力評価のため初週に最も難しいプロジェクトを割り当てる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Onboarding hiệu quả cần đa chiều: kiến thức quy trình/công cụ, hỗ trợ cá nhân (mentor) và lộ trình làm quen dần với nghiệp vụ, giúp tester mới hoà nhập nhanh mà vẫn bền vững.",
      "en": "Effective onboarding must be multidimensional: process/tool knowledge, personal support (mentoring), and a gradual domain ramp-up, helping new testers integrate quickly yet sustainably.",
      "ja": "効果的なオンボーディングは多面的であるべきで、プロセス・ツールの知識、個別支援(メンタリング)、業務への段階的な慣熟によって、新人テスターが早く、かつ持続的に組織に溶け込めるようにします。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đội Agile với tester nhúng (embedded) vào từng squad, test manager cấp tổ chức vẫn cần duy trì vai trò gì?",
      "en": "In Agile squads with embedded testers, what role must an organization-level test manager still maintain?",
      "ja": "テスターが各スクワッドに組み込まれたアジャイル体制において、組織レベルのテストマネージャーが依然として維持すべき役割は何ですか。"
    },
    "options": [
      {
        "vi": "Không còn vai trò gì vì mọi việc do Scrum Master quyết định",
        "en": "No role remains since Scrum Masters decide everything",
        "ja": "すべてスクラムマスターが決定するため、もはや何の役割もない"
      },
      {
        "vi": "Kiểm soát chi tiết từng test case hàng ngày của mọi squad",
        "en": "Control every test case in detail daily across all squads",
        "ja": "すべてのスクワッドの各テストケースを日々細かく管理する"
      },
      {
        "vi": "Đảm bảo tính nhất quán về chuẩn chất lượng, chia sẻ tri thức và phát triển năng lực xuyên suốt các squad",
        "en": "Ensure consistency in quality standards, knowledge sharing, and capability development across squads",
        "ja": "品質基準の一貫性、知識共有、能力開発をスクワッド横断で確保する"
      },
      {
        "vi": "Chỉ đóng vai trò hành chính, ký duyệt nghỉ phép",
        "en": "Only an administrative role, approving leave requests",
        "ja": "休暇承認などの事務的役割のみを担う"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Ngay cả khi tester nhúng vào từng squad, test manager cấp chuyên gia vẫn cần đảm bảo chuẩn chất lượng chung, thúc đẩy chia sẻ tri thức và phát triển năng lực xuyên tổ chức để tránh phân mảnh.",
      "en": "Even with embedded testers, an expert test manager must still ensure common quality standards, foster cross-squad knowledge sharing, and drive organization-wide capability development to avoid fragmentation.",
      "ja": "テスターが各スクワッドに組み込まれていても、エキスパートテストマネージャーは共通の品質基準の維持、スクワッド横断の知識共有、組織全体の能力開発を推進し、分断を防ぐ必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Phân biệt vai trò 'quản lý con người' và 'quản lý/lãnh đạo kỹ thuật' của một test manager cấp chuyên gia như thế nào là đúng?",
      "en": "How should the roles of 'people management' and 'technical leadership' of an expert test manager be correctly distinguished?",
      "ja": "エキスパートテストマネージャーの「人材マネジメント」と「技術リーダーシップ」の役割は、正しくはどのように区別されますか。"
    },
    "options": [
      {
        "vi": "Hai vai trò hoàn toàn giống nhau, không cần phân biệt",
        "en": "The two roles are entirely the same and need no distinction",
        "ja": "両者の役割は全く同一であり、区別する必要はない"
      },
      {
        "vi": "Quản lý con người chỉ liên quan đến việc chấm công",
        "en": "People management only concerns attendance tracking",
        "ja": "人材マネジメントは出勤管理だけに関わる"
      },
      {
        "vi": "Quản lý kỹ thuật chỉ dành cho lập trình viên, không áp dụng cho tester",
        "en": "Technical leadership is only for developers, not applicable to testers",
        "ja": "技術リーダーシップは開発者専用でテスターには適用されない"
      },
      {
        "vi": "Quản lý con người tập trung phát triển năng lực, động lực, sự nghiệp của từng cá nhân; quản lý kỹ thuật tập trung định hướng phương pháp và chất lượng kiểm thử",
        "en": "People management focuses on developing individuals' capability, motivation, and career; technical leadership focuses on directing methodology and test quality",
        "ja": "人材マネジメントは各個人の能力・意欲・キャリアの育成に焦点を当て、技術リーダーシップは手法とテスト品質の方向付けに焦点を当てる"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Test manager cấp chuyên gia cần cân bằng hai vai trò bổ trợ nhau: phát triển con người (năng lực, động lực, sự nghiệp) và định hướng kỹ thuật (phương pháp, chuẩn chất lượng) - thiếu một trong hai đều làm giảm hiệu quả tổ chức.",
      "en": "An expert test manager must balance two complementary roles: developing people (capability, motivation, career) and directing technical methodology/quality standards - lacking either weakens organizational effectiveness.",
      "ja": "エキスパートテストマネージャーは、人材育成(能力・意欲・キャリア)と技術的方向付け(手法・品質基準)という互いに補完する2つの役割をバランスさせる必要があり、どちらかが欠けると組織の効果性が低下します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi phát hiện một tester liên tục không đạt hiệu suất kỳ vọng, bước tiếp cận đúng trước khi xử lý kỷ luật chính thức là gì?",
      "en": "When a tester consistently underperforms, what is the correct first step before taking formal disciplinary action?",
      "ja": "あるテスターが継続的に期待水準に達していない場合、正式な懲戒処分を取る前に正しい最初のステップは何ですか。"
    },
    "options": [
      {
        "vi": "Tìm hiểu nguyên nhân gốc rễ (kỹ năng, động lực, khối lượng công việc, vấn đề cá nhân) rồi lập kế hoạch cải thiện có theo dõi",
        "en": "Investigate the root cause (skills, motivation, workload, personal issues) then create a tracked improvement plan",
        "ja": "根本原因(スキル・意欲・業務量・個人的事情)を調査し、追跡可能な改善計画を策定する"
      },
      {
        "vi": "Công khai phê bình trước toàn đội trong buổi họp",
        "en": "Publicly criticize them in front of the whole team during a meeting",
        "ja": "会議でチーム全員の前で公然と批判する"
      },
      {
        "vi": "Sa thải ngay để làm gương cho cả đội",
        "en": "Dismiss immediately to set an example for the team",
        "ja": "チームへの見せしめとして即座に解雇する"
      },
      {
        "vi": "Giao thêm việc để thử thách áp lực",
        "en": "Assign more work to test them under pressure",
        "ja": "プレッシャーを試すためさらに業務を増やす"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trước khi xử lý kỷ luật, quản lý có trách nhiệm tìm hiểu nguyên nhân gốc rễ và xây dựng kế hoạch cải thiện hiệu suất (PIP) có mục tiêu rõ ràng, theo dõi và hỗ trợ - đây là thực hành quản lý con người chuẩn mực.",
      "en": "Before disciplinary action, a manager must diagnose root causes and build a performance improvement plan with clear goals, tracking, and support - standard good practice in people management.",
      "ja": "懲戒処分の前に、管理者は根本原因を突き止め、明確な目標・追跡・支援を伴う業績改善計画(PIP)を策定する責任があり、これは人材マネジメントの標準的な模範実践です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khen thưởng cá nhân xuất sắc trong đội test cần cân nhắc rủi ro gì để tránh phản tác dụng?",
      "en": "Rewarding individual excellence in a test team should consider what risk to avoid backfiring?",
      "ja": "テストチームで個人の優秀な成果を表彰する際、逆効果を避けるためにどんなリスクを考慮すべきですか。"
    },
    "options": [
      {
        "vi": "Không có rủi ro nào cần cân nhắc",
        "en": "There is no risk to consider at all",
        "ja": "考慮すべきリスクは全くない"
      },
      {
        "vi": "Có thể tạo cạnh tranh không lành mạnh hoặc làm suy yếu tinh thần hợp tác nếu không cân bằng với ghi nhận đóng góp tập thể",
        "en": "May create unhealthy competition or undermine collaboration if not balanced with recognizing team contributions",
        "ja": "チーム貢献の評価とバランスを取らないと、不健全な競争を生んだり協力精神を損なう可能性がある"
      },
      {
        "vi": "Chỉ nên khen thưởng bằng tiền, không cần công nhận công khai",
        "en": "Should only reward with money, no public recognition needed",
        "ja": "金銭のみで報いるべきで公開の承認は不要"
      },
      {
        "vi": "Khen thưởng luôn làm giảm động lực của chính người được khen",
        "en": "Rewards always reduce the motivation of the recipient themselves",
        "ja": "表彰は受賞者本人の意欲を常に低下させる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Khen thưởng cá nhân đơn thuần dễ tạo tâm lý 'mạnh ai nấy làm', làm suy yếu hợp tác - test manager cần kết hợp công nhận cá nhân với ghi nhận đóng góp tập thể để duy trì tinh thần đồng đội.",
      "en": "Purely individual rewards can foster a 'every person for themselves' mindset that undermines collaboration - the test manager should combine individual recognition with team-level acknowledgment to sustain team spirit.",
      "ja": "個人表彰のみでは「各自が自分のことだけを考える」風潮を助長し協力関係を損ないかねないため、テストマネージャーはチーム精神を維持するため個人表彰とチーム貢献の承認を組み合わせるべきです。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Quản lý đội test phân tán (virtual/distributed) ở nhiều địa điểm, yếu tố nào quan trọng nhất để duy trì hiệu suất và gắn kết?",
      "en": "For managing a virtual/distributed test team across multiple locations, what factor is most important for sustaining performance and cohesion?",
      "ja": "複数拠点にまたがるバーチャル・分散型テストチームを管理する上で、パフォーマンスと結束力を維持するために最も重要な要素は何ですか。"
    },
    "options": [
      {
        "vi": "Giảm tần suất giao tiếp để tiết kiệm thời gian",
        "en": "Reduce communication frequency to save time",
        "ja": "時間節約のためコミュニケーション頻度を減らす"
      },
      {
        "vi": "Yêu cầu tất cả thành viên làm việc cùng một múi giờ bất kể vị trí địa lý",
        "en": "Require all members to work the same time zone regardless of location",
        "ja": "所在地に関わらず全メンバーに同一タイムゾーンでの勤務を要求する"
      },
      {
        "vi": "Thiết lập kênh giao tiếp rõ ràng, công cụ cộng tác phù hợp và các nghi thức đồng bộ định kỳ",
        "en": "Establish clear communication channels, suitable collaboration tools, and regular synchronization rituals",
        "ja": "明確なコミュニケーションチャネル、適切な協働ツール、定期的な同期の儀式を確立する"
      },
      {
        "vi": "Không cần công cụ quản lý tri thức chung",
        "en": "No need for a shared knowledge management tool",
        "ja": "共有の知識管理ツールは不要"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Với đội phân tán, thành công phụ thuộc vào việc thiết lập kênh giao tiếp rõ ràng, công cụ cộng tác đồng bộ/không đồng bộ phù hợp và nghi thức định kỳ (standup, retro) để duy trì gắn kết dù khác múi giờ.",
      "en": "For distributed teams, success depends on clear communication channels, appropriate sync/async collaboration tools, and regular rituals (standups, retros) to maintain cohesion despite time zone differences.",
      "ja": "分散型チームの成功は、明確なコミュニケーションチャネル、同期・非同期の適切な協働ツール、そしてタイムゾーンの違いにもかかわらず結束を維持するための定期的な儀式(スタンドアップ、振り返り)にかかっています。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vai trò của chứng chỉ ISTQB trong kế hoạch phát triển kỹ năng đội test nên được nhìn nhận như thế nào ở cấp độ chiến lược?",
      "en": "How should the role of ISTQB certification in a test team's skill development plan be viewed at a strategic level?",
      "ja": "戦略レベルにおいて、テストチームのスキル開発計画におけるISTQB資格の役割はどう捉えるべきですか。"
    },
    "options": [
      {
        "vi": "Là điều kiện duy nhất và đủ để đánh giá năng lực thực tế của tester",
        "en": "The sole and sufficient criterion for evaluating a tester's actual competence",
        "ja": "テスターの実際の能力を評価する唯一かつ十分な条件である"
      },
      {
        "vi": "Chỉ nên áp dụng cho vị trí quản lý, không cần cho tester thường",
        "en": "Should only apply to managerial positions, not regular testers",
        "ja": "管理職のみに適用すべきで一般テスターには不要"
      },
      {
        "vi": "Không có giá trị gì trong tổ chức hiện đại",
        "en": "Has no value in a modern organization",
        "ja": "現代の組織では全く価値がない"
      },
      {
        "vi": "Là một công cụ chuẩn hoá kiến thức nền tảng, cần kết hợp với kinh nghiệm thực chiến và đánh giá năng lực thực tế",
        "en": "A tool to standardize foundational knowledge, which should be combined with hands-on experience and real competence assessment",
        "ja": "基礎知識を標準化するツールであり、実務経験と実際の能力評価と組み合わせるべきもの"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chứng chỉ ISTQB có giá trị chuẩn hoá kiến thức lý thuyết và ngôn ngữ chung trong ngành, nhưng cần kết hợp với đánh giá năng lực thực chiến để phản ánh đúng khả năng làm việc thực tế.",
      "en": "ISTQB certification standardizes theoretical knowledge and shared industry terminology, but must be combined with practical competence assessment to accurately reflect real-world ability.",
      "ja": "ISTQB資格は理論知識と業界共通用語の標準化に価値がありますが、実際の業務遂行能力を正しく反映するには実務能力の評価と組み合わせる必要があります。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Luân chuyển công việc (job rotation) giữa các dự án/loại kiểm thử khác nhau mang lại lợi ích chiến lược gì cho phát triển đội ngũ?",
      "en": "What strategic benefit does job rotation across different projects/test types bring to team development?",
      "ja": "異なるプロジェクトやテスト種別間でのジョブローテーションは、チーム育成にどのような戦略的利点をもたらしますか。"
    },
    "options": [
      {
        "vi": "Mở rộng phạm vi kỹ năng, giảm rủi ro phụ thuộc vào một cá nhân duy nhất (bus factor) và tăng khả năng thích ứng",
        "en": "Broadens skill range, reduces reliance on a single individual (bus factor), and increases adaptability",
        "ja": "スキルの幅を広げ、特定個人への依存(バスファクター)リスクを減らし、適応力を高める"
      },
      {
        "vi": "Chỉ có lợi cho quản lý, không có lợi cho tester",
        "en": "Only benefits management, not testers",
        "ja": "管理者にのみ利益があり、テスターには利益がない"
      },
      {
        "vi": "Làm giảm hiệu suất ngắn hạn nên không nên áp dụng",
        "en": "Reduces short-term performance, so it should not be applied",
        "ja": "短期的な生産性を下げるため適用すべきでない"
      },
      {
        "vi": "Không ảnh hưởng đến khả năng bao phủ rủi ro của tổ chức",
        "en": "Has no effect on the organization's risk coverage capability",
        "ja": "組織のリスクカバレッジ能力には影響しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Luân chuyển công việc giúp tester tích luỹ đa kỹ năng, giảm rủi ro 'bus factor' (phụ thuộc vào một người duy nhất nắm giữ tri thức) và tăng khả năng linh hoạt bố trí nguồn lực của tổ chức.",
      "en": "Job rotation helps testers build cross-functional skills, reduces the 'bus factor' risk of knowledge concentrated in one person, and increases the organization's staffing flexibility.",
      "ja": "ジョブローテーションはテスターの多能化を促し、知識が一人に集中する「バスファクター」リスクを減らし、組織の人員配置の柔軟性を高めます。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi đội test cần mở rộng quy mô nhanh cho một dự án lớn, thách thức quản lý con người chính mà test manager cấp chuyên gia phải giải quyết là gì?",
      "en": "When a test team must scale rapidly for a large project, what is the main people-management challenge an expert test manager must solve?",
      "ja": "大規模プロジェクトのためにテストチームを急速に拡大する必要がある場合、エキスパートテストマネージャーが解決すべき主な人材マネジメント上の課題は何ですか。"
    },
    "options": [
      {
        "vi": "Không có thách thức gì đặc biệt so với đội nhỏ",
        "en": "No special challenge compared to a small team",
        "ja": "小規模チームと比べて特別な課題はない"
      },
      {
        "vi": "Cân bằng giữa tốc độ tuyển dụng/onboarding với duy trì chất lượng, văn hoá đội và cơ cấu giám sát phù hợp",
        "en": "Balance recruitment/onboarding speed with maintaining quality, team culture, and an appropriate supervisory structure",
        "ja": "採用・オンボーディングの速度と、品質・チーム文化・適切な監督体制の維持とのバランスを取る"
      },
      {
        "vi": "Giảm tiêu chuẩn tuyển dụng để tuyển nhanh hơn",
        "en": "Lower hiring standards to recruit faster",
        "ja": "採用を早めるため採用基準を下げる"
      },
      {
        "vi": "Chỉ cần tuyển thêm người, không cần thay đổi quy trình",
        "en": "Just hire more people, no process changes needed",
        "ja": "人員を増やすだけでよく、プロセスの変更は不要"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Mở rộng quy mô nhanh dễ làm loãng chất lượng và văn hoá đội nếu không có cơ cấu giám sát và onboarding phù hợp - đây là bài toán cân bằng chiến lược mà test manager cấp chuyên gia phải chủ động giải quyết.",
      "en": "Rapid scaling risks diluting quality and team culture without an appropriate supervisory and onboarding structure - a strategic balancing act an expert test manager must proactively address.",
      "ja": "急速な拡大は、適切な監督体制とオンボーディングがなければ品質やチーム文化の希薄化を招きかねず、エキスパートテストマネージャーが主体的に取り組むべき戦略的なバランス調整課題です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Đánh giá kỹ năng mềm như khả năng giao tiếp, thuyết trình kết quả test cho stakeholder nên được thực hiện qua phương pháp nào là phù hợp nhất?",
      "en": "What is the most appropriate method for evaluating soft skills such as communication and presenting test results to stakeholders?",
      "ja": "コミュニケーション能力やステークホルダーへのテスト結果報告といったソフトスキルの評価は、どの方法で行うのが最も適切ですか。"
    },
    "options": [
      {
        "vi": "Không thể đánh giá được nên bỏ qua hoàn toàn",
        "en": "Cannot be evaluated at all so it should be skipped entirely",
        "ja": "評価不可能なので完全に省略すべき"
      },
      {
        "vi": "Chỉ dựa vào bài kiểm tra trắc nghiệm lý thuyết",
        "en": "Only rely on a theoretical multiple-choice test",
        "ja": "理論的な選択式試験のみに頼る"
      },
      {
        "vi": "Quan sát thực tế qua các buổi báo cáo, phản hồi từ đồng nghiệp/stakeholder và tự đánh giá có cấu trúc",
        "en": "Real-world observation during reporting sessions, feedback from peers/stakeholders, and structured self-assessment",
        "ja": "報告の場での実際の観察、同僚・ステークホルダーからのフィードバック、構造化された自己評価を組み合わせる"
      },
      {
        "vi": "Chỉ đánh giá một lần duy nhất khi tuyển dụng",
        "en": "Only evaluate once at the time of hiring",
        "ja": "採用時に一度だけ評価する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kỹ năng mềm khó đo bằng bài kiểm tra lý thuyết; cần quan sát hành vi thực tế trong công việc, kết hợp phản hồi đa chiều và tự đánh giá có cấu trúc theo thời gian để có bức tranh chính xác.",
      "en": "Soft skills are hard to measure via theoretical tests; they require observing real workplace behavior, combined with multi-source feedback and structured self-assessment over time for an accurate picture.",
      "ja": "ソフトスキルは理論試験では測りにくく、実際の職場での行動観察、多方面からのフィードバック、時間をかけた構造化された自己評価を組み合わせてこそ正確な把握が可能です。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Xây dựng cộng đồng thực hành (community of practice) cho tester trong tổ chức lớn nhằm mục đích chính gì?",
      "en": "What is the main purpose of building a community of practice for testers in a large organization?",
      "ja": "大規模組織においてテスターのための実践コミュニティ(コミュニティ・オブ・プラクティス)を構築する主な目的は何ですか。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cơ cấu quản lý trực tiếp",
        "en": "Completely replace the direct management structure",
        "ja": "直属の管理構造を完全に置き換える"
      },
      {
        "vi": "Giảm nhu cầu đào tạo chính thức xuống bằng 0",
        "en": "Reduce the need for formal training to zero",
        "ja": "正式な教育の必要性をゼロにする"
      },
      {
        "vi": "Chỉ nhằm mục đích tổ chức tiệc công ty",
        "en": "Only intended for organizing company parties",
        "ja": "社内パーティーの開催だけを目的とする"
      },
      {
        "vi": "Tạo không gian chia sẻ tri thức, chuẩn hoá thực hành tốt và kết nối tester giữa các dự án/phòng ban",
        "en": "Create a space for knowledge sharing, standardizing best practices, and connecting testers across projects/departments",
        "ja": "知識共有の場を作り、ベストプラクティスを標準化し、プロジェクト・部署をまたいでテスターをつなぐ"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Community of practice là kênh phi chính thức nhưng chiến lược giúp tester trao đổi kinh nghiệm, chuẩn hoá thực hành tốt và duy trì mạng lưới tri thức xuyên suốt tổ chức, bổ trợ cho cơ cấu quản lý chính thức.",
      "en": "A community of practice is an informal but strategic channel for testers to exchange experience, standardize best practices, and maintain a knowledge network across the organization, complementing the formal management structure.",
      "ja": "コミュニティ・オブ・プラクティスは非公式ながら戦略的なチャネルであり、テスターが経験を交換し、ベストプラクティスを標準化し、組織全体にわたる知識ネットワークを維持することで、正式な管理構造を補完します。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong DO-178C (phần mềm hàng không), mức DAL A yêu cầu độ bao phủ mã nguồn nào để chứng minh không có luồng thực thi ẩn?",
      "en": "In DO-178C (avionics software), which code coverage criterion does DAL A require to demonstrate no unintended code paths exist?",
      "ja": "DO-178C(航空機ソフトウェア)において、意図しないコードパスが存在しないことを示すためDALレベルAで要求されるカバレッジ基準はどれか。"
    },
    "options": [
      {
        "vi": "Bao phủ điều kiện/quyết định sửa đổi (MC/DC)",
        "en": "Modified Condition/Decision Coverage (MC/DC)",
        "ja": "変更条件判定カバレッジ(MC/DC)"
      },
      {
        "vi": "Bao phủ nhánh (decision coverage)",
        "en": "Decision coverage",
        "ja": "デシジョンカバレッジ"
      },
      {
        "vi": "Bao phủ câu lệnh (statement coverage)",
        "en": "Statement coverage",
        "ja": "ステートメントカバレッジ"
      },
      {
        "vi": "Bao phủ đường dẫn (path coverage)",
        "en": "Path coverage",
        "ja": "パスカバレッジ"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "MC/DC chứng minh mỗi điều kiện tác động độc lập tới kết quả quyết định, phát hiện logic thừa/ẩn — bắt buộc cho DAL A vì hậu quả lỗi là thảm hoạ.",
      "en": "MC/DC proves each condition independently affects the decision outcome, exposing dead or masked logic — mandated for DAL A due to catastrophic failure consequences.",
      "ja": "MC/DCは各条件が判定結果に独立して影響することを証明し、隠れたロジックを検出できるため、破局的な影響を持つDALレベルAで必須とされる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Theo ISO 26262 (ô tô), khi một yêu cầu an toàn có ASIL D, tổ chức thường áp dụng biện pháp nào để giảm thiểu lỗi hệ thống trong thiết kế?",
      "en": "Under ISO 26262 (automotive), for a safety requirement with ASIL D, which measure is typically applied to reduce systematic faults in design?",
      "ja": "ISO 26262(自動車)において、ASIL Dの安全要求に対し設計上の系統的故障を低減するために一般的に適用される手法はどれか。"
    },
    "options": [
      {
        "vi": "Chỉ review nội bộ bởi một kỹ sư",
        "en": "Only an internal review by a single engineer",
        "ja": "一人のエンジニアによる内部レビューのみ"
      },
      {
        "vi": "Đa dạng hoá kiến trúc (redundancy có tính đa dạng, ví dụ khác nhóm thiết kế/công nghệ)",
        "en": "Diverse redundancy (architectural diversity, e.g. different design teams/technologies)",
        "ja": "多様性を持つ冗長構成(異なる設計チームや技術による冗長化)"
      },
      {
        "vi": "Bỏ qua kiểm thử tích hợp để tiết kiệm thời gian",
        "en": "Skipping integration testing to save time",
        "ja": "時間節約のため結合テストを省略する"
      },
      {
        "vi": "Chỉ dựa vào kiểm thử hộp đen ở mức hệ thống",
        "en": "Relying solely on system-level black-box testing",
        "ja": "システムレベルのブラックボックステストのみに依存する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ASIL D đòi hỏi biện pháp nghiêm ngặt nhất; đa dạng hoá kiến trúc giúp tránh lỗi chung (common cause failure) giữa các kênh dự phòng.",
      "en": "ASIL D demands the most rigorous measures; architectural diversity helps avoid common-cause failures between redundant channels.",
      "ja": "ASIL Dは最も厳格な対策を要求し、アーキテクチャの多様性は冗長チャネル間の共通原因故障を回避するのに役立つ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong IEC 62304 (phần mềm thiết bị y tế), phân loại an toàn Class C áp dụng cho phần mềm có khả năng gây ra hậu quả gì nếu lỗi?",
      "en": "In IEC 62304 (medical device software), Safety Class C applies to software whose failure could result in what consequence?",
      "ja": "IEC 62304(医療機器ソフトウェア)において、安全クラスCは故障時にどのような結果をもたらす可能性があるソフトウェアに適用されるか。"
    },
    "options": [
      {
        "vi": "Không có khả năng gây thương tích",
        "en": "No possibility of injury",
        "ja": "傷害の可能性がない"
      },
      {
        "vi": "Chỉ gây thương tích nhẹ, có thể phục hồi",
        "en": "Only minor, reversible injury",
        "ja": "軽微で回復可能な傷害のみ"
      },
      {
        "vi": "Tử vong hoặc thương tích nghiêm trọng",
        "en": "Death or serious injury",
        "ja": "死亡または重篤な傷害"
      },
      {
        "vi": "Chỉ ảnh hưởng tới hiệu năng, không liên quan an toàn",
        "en": "Only affects performance, unrelated to safety",
        "ja": "性能にのみ影響し安全性には無関係"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Class C là mức cao nhất trong IEC 62304, đòi hỏi tài liệu và kiểm soát rủi ro nghiêm ngặt nhất vì hậu quả có thể là tử vong hoặc thương tích nghiêm trọng.",
      "en": "Class C is the highest level in IEC 62304, demanding the strictest documentation and risk control because failure could cause death or serious injury.",
      "ja": "クラスCはIEC 62304における最高レベルであり、死亡または重篤な傷害につながる可能性があるため、最も厳格な文書化とリスク管理が求められる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh an toàn trọng yếu, 'safety case' (hồ sơ luận cứ an toàn) chủ yếu dùng để làm gì?",
      "en": "In a safety-critical context, what is the primary purpose of a 'safety case'?",
      "ja": "セーフティクリティカルな文脈において、「セーフティケース(安全性論証)」の主な目的は何か。"
    },
    "options": [
      {
        "vi": "Thay thế hoàn toàn cho việc kiểm thử hệ thống",
        "en": "Fully replace system testing",
        "ja": "システムテストを完全に置き換えること"
      },
      {
        "vi": "Liệt kê toàn bộ mã nguồn để kiểm toán",
        "en": "List all source code for auditing",
        "ja": "監査のためにすべてのソースコードを列挙すること"
      },
      {
        "vi": "Ghi lại lịch sử commit của nhóm phát triển",
        "en": "Record the development team's commit history",
        "ja": "開発チームのコミット履歴を記録すること"
      },
      {
        "vi": "Trình bày lập luận có cấu trúc, kèm bằng chứng, chứng minh hệ thống đủ an toàn để vận hành trong bối cảnh cụ thể",
        "en": "Present a structured argument, supported by evidence, that a system is acceptably safe for a specific operating context",
        "ja": "特定の運用状況においてシステムが十分安全であることを、証拠に裏付けられた構造的な論証として示すこと"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Safety case (thường theo mô hình GSN) kết nối mục tiêu an toàn, lập luận và bằng chứng (bao gồm kết quả kiểm thử) thành một luận cứ thuyết phục cho cơ quan chứng nhận.",
      "en": "A safety case (often using GSN) links safety goals, arguments, and evidence (including test results) into a convincing case for certification authorities.",
      "ja": "セーフティケース(多くはGSNを用いる)は、安全目標、論証、証拠(テスト結果を含む)を結び付け、認証機関に対する説得力ある論証を構築する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thực hiện Failure Mode and Effects Analysis (FMEA) cho một hệ thống an toàn trọng yếu, mục tiêu chính của phân tích này trong lập kế hoạch kiểm thử là gì?",
      "en": "When performing Failure Mode and Effects Analysis (FMEA) for a safety-critical system, what is its main contribution to test planning?",
      "ja": "セーフティクリティカルシステムに対してFMEA(故障モード影響解析)を実施する際、テスト計画への主な貢献は何か。"
    },
    "options": [
      {
        "vi": "Xác định các chế độ hỏng hóc tiềm ẩn và mức độ nghiêm trọng để ưu tiên kiểm thử vào các rủi ro cao nhất",
        "en": "Identify potential failure modes and severity to prioritize testing toward the highest risks",
        "ja": "潜在的な故障モードと重大度を特定し、最もリスクの高い箇所へテストを優先させること"
      },
      {
        "vi": "Tính toán chi phí phát triển phần mềm",
        "en": "Calculate software development cost",
        "ja": "ソフトウェア開発コストを算出すること"
      },
      {
        "vi": "Thay thế cho review mã nguồn",
        "en": "Replace code review",
        "ja": "コードレビューを代替すること"
      },
      {
        "vi": "Xác định lịch trình release cho khách hàng",
        "en": "Determine the customer release schedule",
        "ja": "顧客向けリリーススケジュールを決定すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "FMEA cung cấp đầu vào phân tích rủi ro (kết hợp mức nghiêm trọng và khả năng xảy ra) để hướng nguồn lực kiểm thử vào các chế độ hỏng hóc nguy hiểm nhất.",
      "en": "FMEA feeds risk analysis (severity x likelihood) that directs test resources toward the most dangerous failure modes.",
      "ja": "FMEAは重大度と発生可能性を組み合わせたリスク分析を提供し、最も危険な故障モードへテストリソースを振り向ける根拠となる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong các chuẩn an toàn như IEC 61508, khái niệm 'độc lập' (independence) của người kiểm thử ở mức SIL cao nhất thường được yêu cầu như thế nào?",
      "en": "In safety standards like IEC 61508, how is tester 'independence' typically mandated at the highest SIL levels?",
      "ja": "IEC 61508のような安全規格において、最高SILレベルではテスターの「独立性」は通常どのように要求されるか。"
    },
    "options": [
      {
        "vi": "Không cần độc lập, lập trình viên tự kiểm thử là đủ",
        "en": "No independence needed; developer self-testing is sufficient",
        "ja": "独立性は不要で、開発者による自己テストで十分である"
      },
      {
        "vi": "Độc lập tổ chức hoàn toàn — nhóm/đơn vị kiểm thử tách biệt khỏi nhóm phát triển",
        "en": "Full organizational independence — a testing group/entity separate from the development team",
        "ja": "完全な組織的独立性 — 開発チームとは別のテスト組織・部門による実施"
      },
      {
        "vi": "Chỉ cần một người khác review code, không cần kiểm thử độc lập",
        "en": "Only a different person reviewing code, no independent testing needed",
        "ja": "別の人物によるコードレビューのみで、独立したテストは不要である"
      },
      {
        "vi": "Độc lập chỉ áp dụng cho tài liệu, không áp dụng cho hoạt động kiểm thử",
        "en": "Independence applies only to documentation, not to testing activities",
        "ja": "独立性は文書のみに適用され、テスト活動には適用されない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Ở SIL 3/4, IEC 61508 khuyến nghị độc lập tổ chức mạnh nhất để tránh thiên kiến xác nhận và tăng khả năng phát hiện lỗi hệ thống nghiêm trọng.",
      "en": "At SIL 3/4, IEC 61508 recommends the strongest organizational independence to avoid confirmation bias and increase detection of systematic faults.",
      "ja": "SIL3/4では、確証バイアスを避け系統的故障の検出力を高めるため、IEC 61508は最も強い組織的独立性を推奨する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một cơ quan chứng nhận yêu cầu ma trận truy vết (traceability matrix) đầy đủ giữa yêu cầu an toàn, thiết kế, mã nguồn và test case. Lý do chính là gì?",
      "en": "A certification authority requires a complete traceability matrix linking safety requirements, design, code, and test cases. What is the primary reason?",
      "ja": "認証機関が安全要求・設計・コード・テストケース間の完全なトレーサビリティマトリクスを要求する主な理由は何か。"
    },
    "options": [
      {
        "vi": "Để giảm số lượng tài liệu cần nộp",
        "en": "To reduce the number of documents to submit",
        "ja": "提出する文書数を減らすため"
      },
      {
        "vi": "Để tăng tốc độ build phần mềm",
        "en": "To speed up the software build process",
        "ja": "ソフトウェアのビルド速度を向上させるため"
      },
      {
        "vi": "Để chứng minh mọi yêu cầu an toàn đều được thiết kế, hiện thực và kiểm thử đầy đủ, không sót hoặc thừa",
        "en": "To demonstrate every safety requirement is designed, implemented, and tested completely, with no gaps or unjustified extras",
        "ja": "すべての安全要求が漏れなく設計・実装・検証され、余分な機能もないことを証明するため"
      },
      {
        "vi": "Để thay thế hoàn toàn quy trình quản lý cấu hình",
        "en": "To fully replace configuration management processes",
        "ja": "構成管理プロセスを完全に代替するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Truy vết đầy đủ là bằng chứng cốt lõi cho chứng nhận, đảm bảo bao phủ yêu cầu và phát hiện chức năng không mong muốn (unintended functionality).",
      "en": "Full traceability is core certification evidence, ensuring requirement coverage and detecting unintended functionality.",
      "ja": "完全なトレーサビリティは認証の中核的証拠であり、要求のカバレッジを保証し、意図しない機能の存在を検出する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong kiểm thử hệ thống an toàn trọng yếu, khi công cụ kiểm thử tự động (test tool) được dùng để thay thế một hoạt động kiểm thử thủ công có ảnh hưởng tới chứng nhận, cần thực hiện bước nào trước?",
      "en": "In safety-critical testing, when an automated test tool replaces a manual activity that affects certification, what must be done first?",
      "ja": "セーフティクリティカルなテストにおいて、自動化テストツールが認証に影響する手作業を代替する場合、まず何を行う必要があるか。"
    },
    "options": [
      {
        "vi": "Triển khai công cụ ngay lập tức để tiết kiệm thời gian",
        "en": "Deploy the tool immediately to save time",
        "ja": "時間節約のため直ちにツールを導入する"
      },
      {
        "vi": "Bỏ qua bước này nếu công cụ đã nổi tiếng trên thị trường",
        "en": "Skip this step if the tool is well-known in the market",
        "ja": "市場で有名なツールであればこの手順は省略してよい"
      },
      {
        "vi": "Chỉ cần thông báo cho khách hàng, không cần bằng chứng",
        "en": "Just notify the customer, no evidence needed",
        "ja": "顧客に通知するだけで証拠は不要である"
      },
      {
        "vi": "Thẩm định/đánh giá công cụ (tool qualification) theo mức tin cậy yêu cầu của chuẩn áp dụng",
        "en": "Perform tool qualification against the confidence level required by the applicable standard",
        "ja": "適用規格が求める信頼レベルに従いツール適格性評価(ツールクオリフィケーション)を実施する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Các chuẩn như DO-178C/DO-330 yêu cầu tool qualification khi lỗi công cụ có thể che giấu lỗi hoặc chèn lỗi vào sản phẩm mà không bị phát hiện.",
      "en": "Standards like DO-178C/DO-330 require tool qualification when a tool error could mask or insert an undetected error in the product.",
      "ja": "DO-178C/DO-330などの規格は、ツールの誤りが製品に検出されない誤りを隠す、あるいは挿入する可能性がある場合、ツール適格性評価を要求する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong dự án phần mềm hệ thống an toàn, khi phát hiện một sai lệch (anomaly) nhỏ không ảnh hưởng an toàn ngay lập tức nhưng nằm ngoài yêu cầu, quy trình chuẩn quy định gì?",
      "en": "In a safety-critical software project, when a minor anomaly is found that does not immediately affect safety but deviates from requirements, what does standard process mandate?",
      "ja": "セーフティクリティカルなソフトウェアプロジェクトにおいて、直ちに安全性に影響しないが要求から逸脱する軽微な異常が発見された場合、標準プロセスは何を義務付けるか。"
    },
    "options": [
      {
        "vi": "Ghi nhận, phân loại và đánh giá tác động chính thức trong hệ thống quản lý anomaly, dù chưa cần sửa ngay",
        "en": "Formally record, classify, and assess the impact in an anomaly management system, even if a fix is not immediately required",
        "ja": "即座に修正が不要であっても、異常管理システムに正式に記録・分類し影響を評価する"
      },
      {
        "vi": "Bỏ qua vì không ảnh hưởng an toàn",
        "en": "Ignore it since it does not affect safety",
        "ja": "安全性に影響しないため無視する"
      },
      {
        "vi": "Xoá bug report để tránh làm phức tạp hồ sơ chứng nhận",
        "en": "Delete the bug report to avoid complicating the certification record",
        "ja": "認証記録を複雑にしないためバグ報告を削除する"
      },
      {
        "vi": "Chỉ ghi chú miệng cho nhóm, không cần văn bản",
        "en": "Only mention it verbally to the team, no written record needed",
        "ja": "チームへ口頭で伝えるだけで文書化は不要である"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Các chuẩn an toàn (DO-178C, IEC 62304...) yêu cầu mọi anomaly, kể cả nhỏ, phải được ghi nhận và đánh giá tác động chính thức để duy trì tính toàn vẹn hồ sơ chứng nhận.",
      "en": "Safety standards (DO-178C, IEC 62304, etc.) require every anomaly, however minor, to be formally recorded and impact-assessed to preserve certification record integrity.",
      "ja": "DO-178CやIEC 62304などの安全規格は、軽微であってもすべての異常を正式に記録し影響評価することを要求し、認証記録の完全性を維持する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một hệ thống điều khiển tàu hoả sử dụng kiến trúc 2-out-of-3 (2oo3) để ra quyết định phanh khẩn cấp. Kiểm thử viên chuyên gia cần tập trung vào khía cạnh nào để xác nhận tính an toàn của kiến trúc này?",
      "en": "A train control system uses a 2-out-of-3 (2oo3) voting architecture for emergency braking decisions. What aspect should an expert tester focus on to validate this architecture's safety?",
      "ja": "列車制御システムが緊急ブレーキ判断に2oo3(3系統中2系統一致)投票アーキテクチャを使用している。エキスパートテスターがこのアーキテクチャの安全性を検証する際、何に注目すべきか。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm thử từng kênh riêng lẻ, bỏ qua tương tác giữa các kênh",
        "en": "Test each channel individually only, ignoring inter-channel interaction",
        "ja": "チャネル間の相互作用を無視し、各チャネルを個別にテストするのみ"
      },
      {
        "vi": "Kiểm thử các kịch bản lỗi đồng thời/lỗi chung (common-cause failure) và cách bộ phiếu quyết (voter) xử lý bất đồng giữa các kênh",
        "en": "Test concurrent/common-cause failure scenarios and how the voter logic handles disagreement between channels",
        "ja": "同時故障・共通原因故障のシナリオと、チャネル間の不一致を投票ロジックがどう処理するかを検証する"
      },
      {
        "vi": "Chỉ cần kiểm thử hiệu năng xử lý (performance) của hệ thống",
        "en": "Only test the system's processing performance",
        "ja": "システムの処理性能のみをテストする"
      },
      {
        "vi": "Không cần kiểm thử vì kiến trúc dự phòng đã tự đảm bảo an toàn",
        "en": "No testing needed since redundant architecture already guarantees safety",
        "ja": "冗長アーキテクチャが安全性を自動的に保証するためテストは不要である"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Điểm yếu thực sự của kiến trúc bỏ phiếu là lỗi chung ảnh hưởng đồng thời nhiều kênh và logic voter xử lý sai lệch — đây là trọng tâm kiểm thử chuyên gia.",
      "en": "The real vulnerability of voting architectures lies in common-cause failures affecting multiple channels simultaneously and voter logic handling disagreement — this is the expert testing focus.",
      "ja": "投票アーキテクチャの真の弱点は複数チャネルに同時に影響する共通原因故障と、不一致を処理する投票ロジックにあり、これがエキスパートテストの焦点となる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quy trình chứng nhận phần mềm an toàn, 'gap analysis' được thực hiện trước khi nộp hồ sơ nhằm mục đích gì?",
      "en": "In safety software certification, why is a 'gap analysis' performed before submitting the certification package?",
      "ja": "安全ソフトウェアの認証プロセスにおいて、認証パッケージ提出前に「ギャップ分析」を行う目的は何か。"
    },
    "options": [
      {
        "vi": "Để thay thế hoàn toàn audit của cơ quan chứng nhận",
        "en": "To fully replace the certification authority's audit",
        "ja": "認証機関による監査を完全に代替するため"
      },
      {
        "vi": "Để giảm số lượng test case cần chạy",
        "en": "To reduce the number of test cases to run",
        "ja": "実行すべきテストケースの数を減らすため"
      },
      {
        "vi": "So sánh trạng thái thực tế của bằng chứng/quy trình với yêu cầu chuẩn để phát hiện thiếu sót cần khắc phục sớm",
        "en": "Compare the actual state of evidence/processes against standard requirements to identify shortfalls needing early remediation",
        "ja": "証拠やプロセスの現状を規格要求と比較し、早期に是正すべき不足を特定するため"
      },
      {
        "vi": "Để tính lương thưởng cho nhóm phát triển",
        "en": "To calculate the development team's bonuses",
        "ja": "開発チームの報酬を計算するため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Gap analysis giúp tổ chức chủ động phát hiện và khắc phục thiếu sót tuân thủ trước khi cơ quan chứng nhận đánh giá, tránh trì hoãn tốn kém.",
      "en": "Gap analysis lets an organization proactively find and fix compliance shortfalls before authority assessment, avoiding costly delays.",
      "ja": "ギャップ分析により、組織は認証機関の評価前にコンプライアンス上の不足を主体的に発見・是正し、コストのかかる遅延を回避できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một thay đổi nhỏ được thực hiện trên một cấu phần đã được chứng nhận an toàn (ví dụ sửa một dòng mã), nguyên tắc 'change impact analysis' yêu cầu điều gì?",
      "en": "When a small change is made to a previously certified safety component (e.g. a one-line code fix), what does 'change impact analysis' require?",
      "ja": "すでに安全認証を受けたコンポーネントに小さな変更(例:1行のコード修正)が加えられた場合、「変更影響分析」は何を要求するか。"
    },
    "options": [
      {
        "vi": "Bỏ qua vì thay đổi quá nhỏ để cần phân tích",
        "en": "Skip it since the change is too small to warrant analysis",
        "ja": "変更が小さすぎるため分析は不要として省略する"
      },
      {
        "vi": "Chỉ thông báo qua email cho quản lý dự án",
        "en": "Just email the project manager",
        "ja": "プロジェクトマネージャーへメールで通知するだけでよい"
      },
      {
        "vi": "Chỉ cần chạy lại toàn bộ test suite mà không cần phân tích gì thêm",
        "en": "Simply rerun the entire test suite with no further analysis",
        "ja": "追加の分析なしにテストスイート全体を再実行するだけでよい"
      },
      {
        "vi": "Đánh giá phạm vi ảnh hưởng thực sự (bao gồm các phần liên quan gián tiếp) để xác định lại đúng phạm vi cần kiểm thử hồi quy và bằng chứng cần cập nhật",
        "en": "Assess the true impact scope (including indirectly related areas) to correctly determine required regression testing and evidence to update",
        "ja": "間接的に関連する部分を含めた真の影響範囲を評価し、必要な回帰テストと更新すべき証拠を正しく特定する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ngay cả thay đổi nhỏ có thể ảnh hưởng đến các phần phụ thuộc không rõ ràng; phân tích tác động đúng đắn giúp tránh cả thiếu sót lẫn lãng phí kiểm thử lại toàn bộ.",
      "en": "Even small changes can affect non-obvious dependencies; proper impact analysis avoids both missed regressions and wasteful full re-testing.",
      "ja": "小さな変更でも明白でない依存関係に影響する可能性があり、適切な影響分析は見落としと無駄な全面再テストの両方を防ぐ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh hệ thống an toàn trọng yếu, thuật ngữ 'defensive programming' liên quan trực tiếp nhất tới hoạt động kiểm thử nào?",
      "en": "In a safety-critical context, the term 'defensive programming' most directly relates to which testing activity?",
      "ja": "セーフティクリティカルな文脈において、「防御的プログラミング」という用語が最も直接関連するテスト活動はどれか。"
    },
    "options": [
      {
        "vi": "Kiểm thử các trường hợp đầu vào bất thường/ngoài phạm vi để xác nhận hệ thống xử lý an toàn thay vì sụp đổ hoặc hành vi không xác định",
        "en": "Testing abnormal/out-of-range inputs to confirm the system fails safely rather than crashing or behaving unpredictably",
        "ja": "異常または範囲外の入力をテストし、システムがクラッシュや未定義動作ではなく安全に処理することを確認する"
      },
      {
        "vi": "Kiểm thử hiệu năng giao diện người dùng",
        "en": "Testing UI performance",
        "ja": "UIの性能をテストする"
      },
      {
        "vi": "Kiểm thử khả năng tương thích trình duyệt",
        "en": "Testing browser compatibility",
        "ja": "ブラウザ互換性をテストする"
      },
      {
        "vi": "Kiểm thử tốc độ build của hệ thống CI/CD",
        "en": "Testing CI/CD build speed",
        "ja": "CI/CDのビルド速度をテストする"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Defensive programming (kiểm tra giới hạn, xử lý ngoại lệ, giá trị mặc định an toàn) được xác nhận qua kiểm thử biên và giá trị bất thường để đảm bảo hệ thống chuyển sang trạng thái an toàn khi gặp lỗi.",
      "en": "Defensive programming (bounds checks, exception handling, safe defaults) is validated through boundary and anomalous-value testing to ensure fail-safe transitions.",
      "ja": "防御的プログラミング(境界チェック、例外処理、安全なデフォルト値)は、境界値や異常値のテストによって検証され、故障時にフェイルセーフ状態へ移行することを保証する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Cơ quan quản lý y tế (ví dụ FDA) yêu cầu 'design history file' cho thiết bị y tế phần mềm. Vai trò của kiểm thử viên chuyên gia trong việc duy trì hồ sơ này là gì?",
      "en": "Regulatory bodies (e.g. FDA) require a 'design history file' for software medical devices. What is the expert tester's role in maintaining it?",
      "ja": "規制当局(FDAなど)はソフトウェア医療機器に対し「デザイン履歴ファイル」を要求する。この文書維持におけるエキスパートテスターの役割は何か。"
    },
    "options": [
      {
        "vi": "Không liên quan tới kiểm thử, chỉ do bộ phận pháp lý xử lý",
        "en": "Unrelated to testing; handled solely by the legal department",
        "ja": "テストとは無関係で、法務部門のみが対応する"
      },
      {
        "vi": "Đảm bảo mọi kế hoạch, kết quả và bằng chứng kiểm thử được lưu trữ đầy đủ, có thể truy vết, làm bằng chứng tuân thủ trong hồ sơ",
        "en": "Ensure all test plans, results, and evidence are fully documented and traceable as compliance evidence within the file",
        "ja": "すべてのテスト計画、結果、証拠が完全に文書化されトレース可能であり、ファイル内でコンプライアンス証拠として機能することを確実にする"
      },
      {
        "vi": "Chỉ cần lưu log lỗi, không cần lưu test case đã pass",
        "en": "Only store error logs, no need to store passing test cases",
        "ja": "エラーログのみ保存すればよく、合格したテストケースは不要である"
      },
      {
        "vi": "Xoá các test case thất bại trước khi nộp hồ sơ",
        "en": "Delete failed test cases before submission",
        "ja": "提出前に失敗したテストケースを削除する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Design history file cần bằng chứng kiểm thử đầy đủ (pass lẫn fail đã khắc phục) để chứng minh quy trình kiểm soát chất lượng tuân thủ quy định.",
      "en": "The design history file requires complete test evidence (both pass and resolved fail records) to demonstrate a compliant quality control process.",
      "ja": "デザイン履歴ファイルには、規制に準拠した品質管理プロセスを証明するため、合格・是正済み不合格を含む完全なテスト証拠が必要である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đánh giá an toàn chức năng (functional safety assessment) độc lập, người đánh giá bên ngoài (assessor) khác với kiểm thử viên nội bộ chủ yếu ở điểm nào?",
      "en": "In an independent functional safety assessment, how does an external assessor primarily differ from an internal tester?",
      "ja": "独立した機能安全アセスメントにおいて、外部アセッサーが社内テスターと主に異なる点は何か。"
    },
    "options": [
      {
        "vi": "Assessor chỉ làm việc sau khi sản phẩm đã bán ra thị trường",
        "en": "The assessor only works after the product has shipped to market",
        "ja": "アセッサーは製品が市場に出荷された後にのみ活動する"
      },
      {
        "vi": "Assessor không cần hiểu về chuẩn an toàn áp dụng",
        "en": "The assessor does not need to understand the applicable safety standard",
        "ja": "アセッサーは適用される安全規格を理解する必要がない"
      },
      {
        "vi": "Assessor đánh giá tính đầy đủ và phù hợp của toàn bộ quy trình an toàn (bao gồm kiểm thử), không chỉ thực hiện các test case cụ thể",
        "en": "The assessor evaluates the adequacy and suitability of the entire safety process (including testing), not just executing specific test cases",
        "ja": "アセッサーは特定のテストケースを実行するだけでなく、テストを含む安全プロセス全体の妥当性・適切性を評価する"
      },
      {
        "vi": "Assessor và kiểm thử viên nội bộ có vai trò hoàn toàn giống nhau",
        "en": "The assessor and internal tester have identical roles",
        "ja": "アセッサーと社内テスターの役割は完全に同一である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Assessor độc lập đánh giá toàn bộ vòng đời an toàn (quy trình, tài liệu, năng lực, bằng chứng) để xác nhận tính đầy đủ theo chuẩn, vượt ra ngoài việc chạy test case đơn lẻ.",
      "en": "An independent assessor evaluates the whole safety lifecycle (process, documentation, competence, evidence) for standard compliance, beyond running individual test cases.",
      "ja": "独立アセッサーは、個々のテストケース実行にとどまらず、規格適合性を確認するため安全ライフサイクル全体(プロセス、文書、力量、証拠)を評価する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một hệ thống điều khiển công nghiệp phải tuân thủ IEC 61511 (an toàn quá trình). Khi thiết kế test case cho SIS (Safety Instrumented System), điều quan trọng nhất cần xác nhận là gì?",
      "en": "An industrial control system must comply with IEC 61511 (process safety). When designing test cases for a SIS (Safety Instrumented System), what is most critical to validate?",
      "ja": "産業用制御システムがIEC 61511(プロセス安全)に準拠する必要がある場合、SIS(安全計装システム)のテストケース設計で最も検証すべき重要な点は何か。"
    },
    "options": [
      {
        "vi": "Giao diện người dùng có thân thiện hay không",
        "en": "Whether the user interface is friendly",
        "ja": "ユーザーインターフェースが使いやすいかどうか"
      },
      {
        "vi": "Màu sắc cảnh báo trên bảng điều khiển",
        "en": "The color scheme of alarms on the control panel",
        "ja": "制御パネルの警告表示の色"
      },
      {
        "vi": "Tốc độ phản hồi của báo cáo thống kê hàng tháng",
        "en": "The response speed of monthly statistical reports",
        "ja": "月次統計レポートの応答速度"
      },
      {
        "vi": "SIS thực hiện đúng safety instrumented function (SIF) để đưa quá trình về trạng thái an toàn khi vượt ngưỡng nguy hiểm",
        "en": "That the SIS correctly executes the safety instrumented function (SIF) to bring the process to a safe state when a hazardous threshold is exceeded",
        "ja": "危険なしきい値を超えた際にSISが安全計装機能(SIF)を正しく実行し、プロセスを安全な状態にすることができるか"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mục tiêu cốt lõi của SIS là thực hiện SIF đúng và kịp thời để đưa quá trình về trạng thái an toàn — đây là trọng tâm kiểm thử theo IEC 61511.",
      "en": "The core purpose of a SIS is to correctly and timely execute the SIF to bring the process to a safe state — this is the central testing focus under IEC 61511.",
      "ja": "SISの中核的目的は、SIFを正確かつ適時に実行しプロセスを安全状態にすることであり、これがIEC 61511におけるテストの中心である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quản lý kiểm thử hệ thống an toàn trọng yếu, 'proof test' (kiểm thử chứng minh) định kỳ trên thiết bị đã triển khai nhằm mục đích gì?",
      "en": "In safety-critical test management, what is the purpose of a periodic 'proof test' on deployed equipment?",
      "ja": "セーフティクリティカルなテスト管理において、稼働中の設備に対する定期的な「プルーフテスト」の目的は何か。"
    },
    "options": [
      {
        "vi": "Phát hiện các lỗi ẩn (dangerous undetected failures) tích luỹ theo thời gian mà cơ chế tự chẩn đoán không phát hiện được",
        "en": "Detect dangerous undetected failures that accumulate over time and are not caught by automatic diagnostics",
        "ja": "時間経過とともに蓄積し自動診断では検出できない危険な未検出故障を発見すること"
      },
      {
        "vi": "Chỉ để kiểm tra giao diện người dùng mới",
        "en": "Only to check new UI features",
        "ja": "新しいUI機能を確認するためだけ"
      },
      {
        "vi": "Để thay thế hoàn toàn commissioning test ban đầu",
        "en": "To fully replace the initial commissioning test",
        "ja": "初期のコミッショニングテストを完全に置き換えるため"
      },
      {
        "vi": "Không có giá trị kỹ thuật, chỉ mang tính thủ tục hành chính",
        "en": "Has no technical value, purely an administrative formality",
        "ja": "技術的価値はなく単なる事務手続きに過ぎない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Proof test định kỳ là cơ chế duy nhất phát hiện lỗi nguy hiểm không tự bộc lộ (dangerous undetected failure), duy trì mức toàn vẹn an toàn (SIL) theo thời gian vận hành.",
      "en": "Periodic proof testing is the only mechanism to detect dangerous undetected failures, maintaining the safety integrity level (SIL) over the operational lifetime.",
      "ja": "定期的なプルーフテストは、自動診断で捕捉されない危険な未検出故障を発見する唯一の手段であり、運用期間中の安全度水準(SIL)を維持する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một dự án hệ thống an toàn trọng yếu áp dụng phương pháp hình thức (formal methods, ví dụ model checking) thay cho một phần kiểm thử động, chuyên gia quản lý kiểm thử cần cân nhắc điều gì trước khi chấp nhận thay thế?",
      "en": "When a safety-critical project uses formal methods (e.g. model checking) to substitute for part of dynamic testing, what should an expert test manager consider before accepting the substitution?",
      "ja": "セーフティクリティカルなプロジェクトが動的テストの一部を形式手法(モデル検査など)で代替する場合、テストマネージャーが代替を承認する前に何を検討すべきか。"
    },
    "options": [
      {
        "vi": "Chỉ cần phương pháp hình thức nhanh hơn kiểm thử động",
        "en": "Only whether formal methods are faster than dynamic testing",
        "ja": "形式手法が動的テストより速いかどうかだけ"
      },
      {
        "vi": "Chuẩn áp dụng có công nhận phương pháp hình thức là bằng chứng hợp lệ hay không, và phạm vi mô hình có phản ánh đúng hành vi thực tế của hệ thống",
        "en": "Whether the applicable standard recognizes formal methods as valid evidence, and whether the model scope accurately reflects real system behavior",
        "ja": "適用規格が形式手法を有効な証拠として認めているか、そしてモデルの範囲が実際のシステム挙動を正確に反映しているか"
      },
      {
        "vi": "Không cần cân nhắc gì, phương pháp hình thức luôn thay thế hoàn toàn kiểm thử",
        "en": "No consideration needed; formal methods always fully replace testing",
        "ja": "検討は不要で、形式手法は常にテストを完全に代替する"
      },
      {
        "vi": "Chỉ cần khách hàng đồng ý bằng miệng",
        "en": "Only verbal customer agreement is needed",
        "ja": "顧客の口頭での同意だけでよい"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Formal methods chỉ là bằng chứng hợp lệ nếu chuẩn công nhận và mô hình phản ánh đúng hệ thống thực; nếu không, khoảng cách mô hình-thực tế có thể che giấu lỗi.",
      "en": "Formal methods are valid evidence only if the standard recognizes them and the model faithfully represents the real system; otherwise a model-reality gap can hide defects.",
      "ja": "形式手法が有効な証拠となるのは、規格がそれを認め、モデルが実システムを忠実に表現している場合に限られる。そうでなければモデルと実際のギャップが欠陥を隠す可能性がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một hệ thống an toàn trọng yếu, khi hai đường (channel) xử lý cùng dữ liệu và so sánh kết quả (comparator), kiểm thử viên chuyên gia cần đặc biệt kiểm tra tình huống nào để đánh giá tính hiệu quả của cơ chế này?",
      "en": "In a safety-critical system where two channels process the same data and compare results (a comparator), what scenario should an expert tester specifically probe to assess the mechanism's effectiveness?",
      "ja": "2つのチャネルが同一データを処理し結果を比較する(コンパレータ)セーフティクリティカルシステムにおいて、この仕組みの有効性を評価するためエキスパートテスターが特に検証すべきシナリオは何か。"
    },
    "options": [
      {
        "vi": "Chỉ kiểm thử tốc độ xử lý của một kênh",
        "en": "Only testing the processing speed of one channel",
        "ja": "片方のチャネルの処理速度のみをテストする"
      },
      {
        "vi": "Chỉ kiểm thử khi cả hai kênh hoạt động hoàn toàn bình thường",
        "en": "Only testing when both channels operate perfectly normally",
        "ja": "両チャネルが正常に動作している場合のみテストする"
      },
      {
        "vi": "Cả hai kênh cùng gặp lỗi giống hệt nhau do nguyên nhân chung (ví dụ cùng lỗi thiết kế), khiến comparator không phát hiện được sai lệch",
        "en": "Both channels experiencing an identical error from a common cause (e.g. shared design fault), so the comparator fails to detect any disagreement",
        "ja": "両チャネルが共通原因(例:共有された設計上の欠陥)により同一の誤りを起こし、コンパレータが不一致を検出できない状況"
      },
      {
        "vi": "Không cần kiểm thử comparator vì nó luôn hoạt động đúng",
        "en": "No need to test the comparator since it always works correctly",
        "ja": "コンパレータは常に正しく動作するためテストは不要である"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Điểm mù nguy hiểm nhất của kiến trúc comparator là lỗi chung (common-cause failure) khiến cả hai kênh sai giống nhau — đây là trọng tâm kiểm thử chuyên gia để tránh cảm giác an toàn giả.",
      "en": "The most dangerous blind spot of comparator architectures is common-cause failure making both channels err identically — this is the expert focus to avoid a false sense of safety.",
      "ja": "コンパレータアーキテクチャの最も危険な盲点は、両チャネルが同一に誤る共通原因故障であり、誤った安全感を避けるためエキスパートが焦点を当てるべき点である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một quy định pháp lý mới (ví dụ EU AI Act) áp đặt yêu cầu bổ sung lên phần mềm an toàn trọng yếu dùng AI, vai trò của test manager cấp chuyên gia trong việc thích ứng chiến lược kiểm thử là gì?",
      "en": "When new regulation (e.g. the EU AI Act) imposes additional requirements on AI-based safety-critical software, what is the expert-level test manager's role in adapting the test strategy?",
      "ja": "新しい規制(例:EU AI法)がAIを用いたセーフティクリティカルソフトウェアに追加要求を課す場合、テスト戦略を適応させる上でエキスパートレベルのテストマネージャーの役割は何か。"
    },
    "options": [
      {
        "vi": "Chờ tới khi kiểm toán chính thức phát hiện thiếu sót rồi mới hành động",
        "en": "Wait until a formal audit finds shortfalls before acting",
        "ja": "正式な監査で不備が指摘されるまで行動を待つ"
      },
      {
        "vi": "Giao toàn bộ trách nhiệm cho bộ phận pháp lý mà không có sự tham gia của kiểm thử",
        "en": "Delegate everything entirely to the legal department without test involvement",
        "ja": "テスト部門を関与させず、すべてを法務部門に一任する"
      },
      {
        "vi": "Bỏ qua vì quy định không liên quan tới kiểm thử",
        "en": "Ignore it since regulation is unrelated to testing",
        "ja": "規制はテストと無関係であるため無視する"
      },
      {
        "vi": "Chủ động phân tích tác động của quy định lên phạm vi, tiêu chí chấp nhận và bằng chứng kiểm thử, cập nhật chiến lược và kế hoạch trước khi bị bắt buộc",
        "en": "Proactively analyze the regulation's impact on scope, acceptance criteria, and test evidence, updating strategy and plans ahead of enforcement",
        "ja": "規制が及ぼす範囲・受け入れ基準・テスト証拠への影響を先んじて分析し、義務化される前に戦略と計画を更新する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Ở cấp chuyên gia, quản lý kiểm thử phải theo dõi thay đổi quy định và chủ động điều chỉnh chiến lược/kế hoạch để tránh rủi ro chứng nhận và trì hoãn ra mắt.",
      "en": "At the expert level, test management must track regulatory change and proactively adjust strategy/plans to avoid certification risk and launch delays.",
      "ja": "エキスパートレベルでは、テストマネジメントは規制変更を追跡し、認証リスクやリリース遅延を避けるため戦略・計画を先んじて調整する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đánh giá 'human factors' (yếu tố con người) cho hệ thống an toàn trọng yếu (ví dụ buồng lái máy bay), kiểm thử viên chuyên gia cần đưa yếu tố nào vào thiết kế test case ngoài chức năng đúng/sai?",
      "en": "In human factors evaluation for safety-critical systems (e.g. an aircraft cockpit), what factor should an expert tester build into test case design beyond correct/incorrect functionality?",
      "ja": "セーフティクリティカルシステム(例:航空機のコックピット)におけるヒューマンファクター評価において、エキスパートテスターは機能の正誤以外にテストケース設計へ何を組み込むべきか。"
    },
    "options": [
      {
        "vi": "Khả năng con người phản ứng đúng dưới áp lực/căng thẳng, khả năng nhận diện cảnh báo và tránh sai sót do thiết kế giao diện gây nhầm lẫn",
        "en": "Whether operators can respond correctly under stress, correctly perceive alerts, and avoid errors induced by confusing interface design",
        "ja": "ストレス下でオペレーターが正しく対応できるか、警告を正しく認識できるか、紛らわしいインターフェース設計による誤りを回避できるか"
      },
      {
        "vi": "Chỉ cần kiểm tra tốc độ xử lý CPU",
        "en": "Only checking CPU processing speed",
        "ja": "CPUの処理速度のみを確認する"
      },
      {
        "vi": "Chỉ cần kiểm thử màu sắc theo sở thích cá nhân của nhà thiết kế",
        "en": "Only testing colors based on the designer's personal preference",
        "ja": "デザイナー個人の好みに基づく色のみをテストする"
      },
      {
        "vi": "Không cần xem xét yếu tố con người trong hệ thống tự động hoá cao",
        "en": "Human factors need not be considered in highly automated systems",
        "ja": "高度に自動化されたシステムでは人的要因を考慮する必要はない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Nhiều tai nạn an toàn trọng yếu bắt nguồn từ lỗi con người do thiết kế giao diện/cảnh báo kém; test case chuyên gia phải mô phỏng áp lực thực tế và khả năng nhận thức của người vận hành.",
      "en": "Many safety-critical accidents stem from human error caused by poor interface/alerting design; expert test cases must simulate real operational stress and operator cognition.",
      "ja": "多くのセーフティクリティカルな事故は、不十分なインターフェースや警告設計による人的誤りに起因する。エキスパートのテストケースは実際の運用ストレスとオペレーターの認知を再現する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một sản phẩm phần mềm an toàn trọng yếu đã ngừng phát triển tích cực (legacy system) nhưng vẫn vận hành, chiến lược kiểm thử cấp chuyên gia cho việc bảo trì cần ưu tiên điều gì?",
      "en": "For a legacy safety-critical software product no longer under active development but still operational, what should an expert-level maintenance test strategy prioritize?",
      "ja": "積極的な開発が終了しているが依然運用中のレガシーなセーフティクリティカルソフトウェアについて、エキスパートレベルの保守テスト戦略は何を優先すべきか。"
    },
    "options": [
      {
        "vi": "Ngừng mọi hoạt động kiểm thử vì sản phẩm đã ổn định lâu năm",
        "en": "Halt all testing since the product has been stable for years",
        "ja": "長年安定しているためすべてのテスト活動を停止する"
      },
      {
        "vi": "Duy trì bằng chứng an toàn hiện có, đánh giá tác động của môi trường thay đổi (phần cứng, hệ điều hành, tiêu chuẩn cập nhật) và kiểm thử hồi quy có trọng tâm khi có thay đổi bắt buộc",
        "en": "Maintain existing safety evidence, assess impact from changing environments (hardware, OS, updated standards), and perform targeted regression testing when mandatory changes occur",
        "ja": "既存の安全証拠を維持し、環境変化(ハードウェア、OS、更新された規格)の影響を評価し、必須の変更が発生した際には的を絞った回帰テストを実施する"
      },
      {
        "vi": "Viết lại toàn bộ hệ thống ngay lập tức bất kể chi phí",
        "en": "Rewrite the entire system immediately regardless of cost",
        "ja": "コストを度外視して直ちにシステム全体を書き直す"
      },
      {
        "vi": "Chỉ kiểm thử khi có báo cáo sự cố nghiêm trọng từ khách hàng",
        "en": "Only test when a critical incident report comes from customers",
        "ja": "顧客から重大インシデントの報告があった場合のみテストする"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Hệ thống legacy an toàn vẫn phải duy trì tính hợp lệ của chứng nhận trước thay đổi môi trường/quy định; kiểm thử có trọng tâm giúp cân bằng chi phí và rủi ro.",
      "en": "Legacy safety systems must still maintain certification validity against environmental/regulatory change; targeted testing balances cost and risk.",
      "ja": "レガシーな安全システムも環境や規制の変化に対して認証の有効性を維持し続けなければならず、的を絞ったテストがコストとリスクのバランスを取る。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh quản lý rủi ro cho hệ thống an toàn trọng yếu, khi mức rủi ro tồn dư (residual risk) sau kiểm thử vẫn cao hơn ngưỡng chấp nhận (ALARP), quản lý kiểm thử chuyên gia nên hành động thế nào?",
      "en": "In risk management for safety-critical systems, when residual risk after testing remains above the acceptable threshold (ALARP), how should an expert test manager act?",
      "ja": "セーフティクリティカルシステムのリスク管理において、テスト後の残留リスクが許容しきい値(ALARP)を上回る場合、エキスパートのテストマネージャーはどう行動すべきか。"
    },
    "options": [
      {
        "vi": "Che giấu thông tin để tránh làm chậm dự án",
        "en": "Conceal the information to avoid delaying the project",
        "ja": "プロジェクト遅延を避けるため情報を隠す"
      },
      {
        "vi": "Tự ý hạ thấp tiêu chí chấp nhận để dự án qua được cửa kiểm thử",
        "en": "Unilaterally lower the acceptance criteria so the project passes testing",
        "ja": "プロジェクトがテストを通過できるよう独断で受け入れ基準を下げる"
      },
      {
        "vi": "Báo cáo minh bạch tới các bên liên quan/cơ quan có thẩm quyền, đề xuất biện pháp giảm thiểu bổ sung hoặc từ chối phát hành cho tới khi rủi ro đạt mức chấp nhận được",
        "en": "Transparently report to stakeholders/authorities, propose additional mitigation, or withhold release approval until risk reaches an acceptable level",
        "ja": "利害関係者・当局へ透明に報告し、追加の低減策を提案するか、リスクが許容水準に達するまでリリース承認を保留する"
      },
      {
        "vi": "Bỏ qua vì đây không phải trách nhiệm của kiểm thử",
        "en": "Ignore it since this is not testing's responsibility",
        "ja": "これはテストの責任ではないため無視する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Nguyên tắc ALARP đòi hỏi minh bạch và trách nhiệm giải trình; test manager chuyên gia phải báo cáo trung thực và thúc đẩy giảm thiểu rủi ro thay vì che giấu hay tự ý hạ chuẩn.",
      "en": "ALARP demands transparency and accountability; an expert test manager must report honestly and drive further mitigation rather than concealing or unilaterally lowering standards.",
      "ja": "ALARPの原則は透明性と説明責任を要求する。エキスパートのテストマネージャーは、隠蔽したり基準を独断で下げたりするのではなく、誠実に報告しさらなるリスク低減を推進しなければならない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quy trình phát triển theo V-model cho hệ thống an toàn trọng yếu, việc kiểm thử acceptance thường yêu cầu sự tham gia chính thức của bên nào để đáp ứng yêu cầu quy định?",
      "en": "In a V-model development process for safety-critical systems, acceptance testing typically requires formal involvement of which party to satisfy regulatory requirements?",
      "ja": "セーフティクリティカルシステムのV字モデル開発プロセスにおいて、受け入れテストは規制要求を満たすため通常どの関係者の正式な関与を必要とするか。"
    },
    "options": [
      {
        "vi": "Chỉ nhóm phát triển nội bộ, không cần bên thứ ba",
        "en": "Only the internal development team, no third party needed",
        "ja": "社内開発チームのみで第三者は不要である"
      },
      {
        "vi": "Không cần bên nào tham gia chính thức",
        "en": "No formal party involvement is needed",
        "ja": "正式な関与者は不要である"
      },
      {
        "vi": "Chỉ bộ phận marketing của công ty",
        "en": "Only the company's marketing department",
        "ja": "自社のマーケティング部門のみ"
      },
      {
        "vi": "Khách hàng cuối, và trong nhiều trường hợp cơ quan chứng nhận/đánh giá độc lập được uỷ quyền theo chuẩn áp dụng",
        "en": "The end customer, and in many cases an independent certification/assessment body authorized under the applicable standard",
        "ja": "最終顧客、および多くの場合は適用規格に基づき権限を与えられた独立した認証・評価機関"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Acceptance testing cho hệ thống an toàn trọng yếu thường cần xác nhận từ khách hàng và, tuỳ chuẩn (DO-178C, ISO 26262...), sự chứng nhận/đánh giá độc lập của cơ quan có thẩm quyền.",
      "en": "Acceptance testing for safety-critical systems typically needs customer sign-off and, depending on the standard (DO-178C, ISO 26262, etc.), independent certification/assessment by an authorized body.",
      "ja": "セーフティクリティカルシステムの受け入れテストは通常、顧客の承認と、規格(DO-178C、ISO 26262など)によっては権限を持つ機関による独立した認証・評価を必要とする。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi một tổ chức triển khai DevOps/CI-CD cho phần mềm an toàn trọng yếu, thách thức lớn nhất về tuân thủ quy định mà chuyên gia quản lý kiểm thử phải giải quyết là gì?",
      "en": "When an organization adopts DevOps/CI-CD for safety-critical software, what is the biggest regulatory compliance challenge the expert test manager must address?",
      "ja": "組織がセーフティクリティカルソフトウェアにDevOps/CI-CDを導入する場合、エキスパートのテストマネージャーが対処すべき最大の規制順守上の課題は何か。"
    },
    "options": [
      {
        "vi": "Cân bằng giữa tốc độ triển khai liên tục với yêu cầu về bằng chứng đầy đủ, truy vết, độc lập kiểm thử và kiểm soát thay đổi mà chuẩn an toàn đòi hỏi cho mỗi lần release",
        "en": "Balancing continuous deployment speed with the need for complete evidence, traceability, test independence, and change control mandated by the safety standard for every release",
        "ja": "継続的デプロイの速度と、安全規格が各リリースごとに要求する完全な証拠・トレーサビリティ・テスト独立性・変更管理とのバランスを取ること"
      },
      {
        "vi": "Chỉ cần tăng tốc độ release, các yêu cầu chứng nhận sẽ tự động được đáp ứng",
        "en": "Simply increasing release speed will automatically satisfy certification requirements",
        "ja": "リリース速度を上げるだけで認証要求は自動的に満たされる"
      },
      {
        "vi": "Không có thách thức nào vì CI/CD luôn tương thích với mọi chuẩn an toàn",
        "en": "There is no challenge since CI/CD is always compatible with all safety standards",
        "ja": "CI/CDはすべての安全規格と常に互換性があるため課題はない"
      },
      {
        "vi": "Loại bỏ hoàn toàn quy trình review vì CI/CD đã tự động hoá mọi thứ",
        "en": "Eliminate all review processes since CI/CD automates everything",
        "ja": "CI/CDがすべてを自動化するためレビュープロセスを完全に排除する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Tốc độ CI/CD mâu thuẫn với yêu cầu bằng chứng/độc lập/kiểm soát thay đổi nghiêm ngặt của chuẩn an toàn; chuyên gia phải thiết kế pipeline vẫn tạo đủ bằng chứng chứng nhận mà không làm mất tốc độ quá mức.",
      "en": "CI/CD speed conflicts with the rigorous evidence/independence/change-control requirements of safety standards; the expert must design pipelines that still generate adequate certification evidence without excessive speed loss.",
      "ja": "CI/CDの速度は安全規格が求める厳格な証拠・独立性・変更管理の要件と相反する。エキスパートは、速度を過度に犠牲にすることなく十分な認証証拠を生成できるパイプラインを設計する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một hệ thống điều khiển hạt nhân, chuẩn IEC 60880 yêu cầu bằng chứng đặc biệt nào cho phần mềm được phân loại 'Category A' (quan trọng nhất đối với an toàn)?",
      "en": "For a nuclear control system, IEC 60880 requires what special evidence for software classified 'Category A' (most safety-significant)?",
      "ja": "原子力制御システムにおいて、IEC 60880は「カテゴリーA」(最も安全上重要)に分類されたソフトウェアに対しどのような特別な証拠を要求するか。"
    },
    "options": [
      {
        "vi": "Không yêu cầu gì đặc biệt, xử lý như phần mềm thông thường",
        "en": "No special requirement; treated like ordinary software",
        "ja": "特別な要求はなく、通常のソフトウェアと同様に扱う"
      },
      {
        "vi": "Bằng chứng nghiêm ngặt về tính xác định (determinism), phân tích toàn diện và kiểm thử độc lập ở mức cao nhất, bao gồm cả xem xét mã nguồn chi tiết",
        "en": "Rigorous evidence of determinism, comprehensive analysis, and independent testing at the highest level, including detailed code review",
        "ja": "決定性(デターミニズム)に関する厳格な証拠、包括的な分析、そして詳細なコードレビューを含む最高レベルの独立したテスト"
      },
      {
        "vi": "Chỉ cần bản demo cho khách hàng",
        "en": "Only a customer demo is needed",
        "ja": "顧客向けデモのみでよい"
      },
      {
        "vi": "Chỉ cần kiểm thử hiệu năng tải cao",
        "en": "Only high-load performance testing is needed",
        "ja": "高負荷性能テストのみでよい"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Category A trong IEC 60880 áp dụng mức nghiêm ngặt tối đa của vòng đời an toàn hạt nhân — đòi hỏi bằng chứng toàn diện nhất về phân tích, tính xác định và kiểm thử độc lập.",
      "en": "Category A under IEC 60880 applies the maximum rigor of the nuclear safety lifecycle, requiring the most comprehensive evidence of analysis, determinism, and independent testing.",
      "ja": "IEC 60880のカテゴリーAは原子力安全ライフサイクルの最高水準の厳格さを適用し、分析、決定性、独立したテストに関する最も包括的な証拠を要求する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức muốn tái sử dụng một cấu phần phần mềm (SOUP - Software of Unknown Provenance) trong hệ thống an toàn trọng yếu. Chiến lược kiểm thử chuyên gia cần bổ sung gì so với cấu phần tự phát triển?",
      "en": "An organization wants to reuse a Software of Unknown Provenance (SOUP) component in a safety-critical system. What must the expert test strategy add compared to in-house developed components?",
      "ja": "組織が出所不明のソフトウェア(SOUP)をセーフティクリティカルシステムで再利用したい場合、自社開発コンポーネントと比べエキスパートのテスト戦略には何を追加する必要があるか。"
    },
    "options": [
      {
        "vi": "Không cần bổ sung gì vì SOUP luôn đáng tin cậy hơn mã tự viết",
        "en": "No addition needed since SOUP is always more reliable than in-house code",
        "ja": "SOUPは自社コードより常に信頼できるため追加は不要である"
      },
      {
        "vi": "Chỉ cần đọc mô tả sản phẩm từ nhà cung cấp là đủ",
        "en": "Reading the vendor's product description is sufficient",
        "ja": "ベンダーの製品説明を読むだけで十分である"
      },
      {
        "vi": "Đánh giá rủi ro riêng cho SOUP (thiếu tài liệu thiết kế/kiểm thử gốc), bổ sung kiểm thử bao phủ và phân tích lỗi ở mức hộp đen sâu hơn, cùng biện pháp giảm thiểu (wrapper, giám sát runtime)",
        "en": "Perform a dedicated SOUP risk assessment (lack of original design/test documentation), add deeper black-box coverage testing and failure analysis, plus mitigations (wrappers, runtime monitoring)",
        "ja": "SOUP専用のリスク評価(元の設計・テスト文書の欠如)を行い、より深いブラックボックスカバレッジテストと故障分析を追加し、ラッパーやランタイム監視などの緩和策を講じる"
      },
      {
        "vi": "Loại bỏ hoàn toàn yêu cầu truy vết cho phần SOUP",
        "en": "Completely drop traceability requirements for the SOUP part",
        "ja": "SOUP部分についてはトレーサビリティ要求を完全に免除する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Vì thiếu bằng chứng vòng đời phát triển gốc, các chuẩn (IEC 62304, ISO 26262...) yêu cầu đánh giá rủi ro và kiểm thử bổ sung, cùng cơ chế giảm thiểu như wrapper/giám sát để bù đắp thiếu chứng cứ.",
      "en": "Lacking original development lifecycle evidence, standards (IEC 62304, ISO 26262, etc.) require additional risk assessment and testing plus mitigations like wrappers/monitoring to compensate.",
      "ja": "元の開発ライフサイクルの証拠が欠けているため、規格(IEC 62304、ISO 26262など)は追加のリスク評価とテスト、およびラッパーや監視などの緩和策を要求し証拠不足を補う。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong việc lập kế hoạch kiểm thử cho hệ thống an toàn trọng yếu đa quốc gia, khi các quy định của hai khu vực (ví dụ FAA và EASA) có yêu cầu khác nhau về cùng một hạng mục, chiến lược chuyên gia nên áp dụng nguyên tắc nào?",
      "en": "When planning tests for a multinational safety-critical system, if two regional regulations (e.g. FAA and EASA) impose different requirements on the same item, what principle should the expert strategy apply?",
      "ja": "多国籍のセーフティクリティカルシステムのテスト計画において、2つの地域規制(例:FAAとEASA)が同一項目に異なる要求を課す場合、エキスパート戦略はどの原則を適用すべきか。"
    },
    "options": [
      {
        "vi": "Chỉ tuân thủ quy định của thị trường lớn nhất, bỏ qua các thị trường khác",
        "en": "Comply only with the largest market's regulation, ignoring others",
        "ja": "最大市場の規制のみに従い、他は無視する"
      },
      {
        "vi": "Không cần chiến lược gì, quy định ở đâu cũng giống nhau",
        "en": "No strategy needed since regulations are the same everywhere",
        "ja": "規制はどこでも同じであるため戦略は不要である"
      },
      {
        "vi": "Bỏ qua tất cả quy định và chỉ tuân theo tiêu chuẩn nội bộ công ty",
        "en": "Ignore all regulations and follow only internal company standards",
        "ja": "すべての規制を無視し社内基準のみに従う"
      },
      {
        "vi": "Xác định tập yêu cầu nghiêm ngặt nhất (superset) trong các khu vực áp dụng, hoặc thiết kế biến thể kiểm thử riêng cho từng khu vực nếu yêu cầu xung đột không thể hợp nhất",
        "en": "Identify the strictest superset of requirements across applicable regions, or design region-specific test variants when conflicting requirements cannot be merged",
        "ja": "適用される各地域の要求のうち最も厳格な要求の上位集合(スーパーセット)を特定するか、要求が矛盾し統合できない場合は地域ごとに異なるテストバリアントを設計する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chiến lược chuyên gia cần đảm bảo tuân thủ đồng thời nhiều khu vực pháp lý — dùng tập yêu cầu nghiêm ngặt nhất khi có thể hợp nhất, hoặc phân nhánh kiểm thử khi có xung đột thực sự.",
      "en": "Expert strategy must ensure simultaneous compliance across jurisdictions — using the strictest merged requirement set where possible, or branching test variants when true conflicts exist.",
      "ja": "エキスパート戦略は複数の管轄区域への同時準拠を確保しなければならない。可能な場合は最も厳格な要求の統合セットを用い、真の矛盾がある場合はテストを地域ごとに分岐させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi đánh giá năng lực (competence) của đội ngũ kiểm thử cho hệ thống an toàn trọng yếu theo yêu cầu chuẩn (ví dụ IEC 61508 yêu cầu 'competence management'), tổ chức cần chứng minh điều gì ngoài kỹ năng kiểm thử tổng quát?",
      "en": "When assessing test team competence for safety-critical systems per standard requirements (e.g. IEC 61508's 'competence management'), what must the organization demonstrate beyond general testing skills?",
      "ja": "規格要求(例:IEC 61508の「力量管理」)に従いセーフティクリティカルシステムのテストチームの力量を評価する際、組織は一般的なテストスキール以外に何を示す必要があるか。"
    },
    "options": [
      {
        "vi": "Kiến thức chuyên sâu về chuẩn an toàn áp dụng, hiểu biết về hậu quả của lỗi trong lĩnh vực cụ thể (ví dụ hàng không, y tế), và kinh nghiệm được ghi nhận chính thức phù hợp với mức SIL/DAL của hệ thống",
        "en": "In-depth knowledge of the applicable safety standard, understanding of failure consequences in the specific domain (e.g. aviation, medical), and formally recorded experience matching the system's SIL/DAL level",
        "ja": "適用される安全規格に関する深い知識、対象分野(航空・医療など)における故障の結果への理解、そしてシステムのSIL/DALレベルに見合った公式に記録された経験"
      },
      {
        "vi": "Chỉ cần bằng cấp đại học, không cần kinh nghiệm thực tế",
        "en": "Only a university degree is needed, no practical experience required",
        "ja": "大学の学位のみで実務経験は不要である"
      },
      {
        "vi": "Không cần chứng minh gì thêm, kỹ năng kiểm thử phần mềm thông thường là đủ",
        "en": "Nothing additional is needed; general software testing skill suffices",
        "ja": "通常のソフトウェアテストスキルで十分であり追加の証明は不要である"
      },
      {
        "vi": "Chỉ cần biết sử dụng công cụ tự động hoá kiểm thử phổ biến",
        "en": "Only knowledge of popular test automation tools is needed",
        "ja": "一般的なテスト自動化ツールの使用方法を知っていればよい"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Competence management theo IEC 61508 đòi hỏi năng lực chuyên biệt về chuẩn, lĩnh vực và hậu quả an toàn, được ghi nhận chính thức tương xứng với mức nghiêm trọng của hệ thống — không chỉ kỹ năng kiểm thử chung.",
      "en": "Competence management per IEC 61508 requires specialized, formally recorded competence in the standard, domain, and safety consequences matching system criticality — beyond generic testing skill.",
      "ja": "IEC 61508に基づく力量管理は、システムの重大度に見合った規格・領域・安全上の結果に関する専門的かつ公式に記録された力量を要求し、一般的なテストスキルにとどまらない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong kiến trúc tự động hoá kiểm thử tổng quát (gTAA), lớp nào chịu trách nhiệm chuyển đổi các lệnh gọi kiểm thử trừu tượng thành thao tác cụ thể trên hệ thống dưới kiểm thử (SUT)?",
      "en": "In the Generic Test Automation Architecture (gTAA), which layer is responsible for translating abstract test calls into concrete actions on the system under test (SUT)?",
      "ja": "汎用テスト自動化アーキテクチャ(gTAA)において、抽象的なテスト呼び出しをテスト対象システム(SUT)に対する具体的な操作に変換する責任を持つ層はどれか。"
    },
    "options": [
      {
        "vi": "Lớp Định nghĩa kiểm thử (Test Definition)",
        "en": "Test Definition layer",
        "ja": "テスト定義層(Test Definition)"
      },
      {
        "vi": "Lớp Thích ứng kiểm thử (Test Adaptation)",
        "en": "Test Adaptation layer",
        "ja": "テストアダプテーション層(Test Adaptation)"
      },
      {
        "vi": "Lớp Sinh kiểm thử (Test Generation)",
        "en": "Test Generation layer",
        "ja": "テスト生成層(Test Generation)"
      },
      {
        "vi": "Lớp Quản lý kiểm thử (Test Management)",
        "en": "Test Management layer",
        "ja": "テストマネジメント層(Test Management)"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Lớp thích ứng (adaptation) đóng vai trò cầu nối, chuyển các lệnh trừu tượng thành lệnh kỹ thuật cụ thể (ví dụ driver/API) tác động lên SUT, giúp phần trên của kiến trúc độc lập với công nghệ SUT.",
      "en": "The adaptation layer acts as the bridge that maps abstract commands into concrete technical calls (e.g., drivers/APIs) against the SUT, keeping upper layers technology-independent.",
      "ja": "アダプテーション層は橋渡し役として、抽象コマンドを具体的な技術呼び出し(ドライバやAPIなど)に変換してSUTに作用させ、上位層をSUT技術から独立させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức có hàng trăm kịch bản kiểm thử tự động UI bị hỏng mỗi khi giao diện thay đổi nhẹ. Giải pháp kiến trúc nào giúp giảm chi phí bảo trì hiệu quả nhất?",
      "en": "An organization has hundreds of UI automated scripts that break whenever the interface changes slightly. Which architectural solution most effectively reduces maintenance cost?",
      "ja": "ある組織では、UIが少し変更されるたびに何百ものUI自動化スクリプトが壊れている。保守コストを最も効果的に削減するアーキテクチャ上の解決策はどれか。"
    },
    "options": [
      {
        "vi": "Viết thêm nhiều bước chờ (wait) cứng trong từng kịch bản",
        "en": "Add more hard-coded waits into each script",
        "ja": "各スクリプトに固定のwait処理を追加する"
      },
      {
        "vi": "Chuyển toàn bộ kiểm thử sang chạy thủ công",
        "en": "Move all testing back to manual execution",
        "ja": "すべてのテストを手動実行に戻す"
      },
      {
        "vi": "Áp dụng mẫu thiết kế Page Object/Screenplay để tách biệt logic nghiệp vụ khỏi chi tiết giao diện",
        "en": "Apply the Page Object/Screenplay design pattern to separate business logic from UI details",
        "ja": "Page Object/Screenplayデザインパターンを適用し、ビジネスロジックをUI詳細から分離する"
      },
      {
        "vi": "Tăng số lượng máy chủ chạy song song",
        "en": "Increase the number of parallel execution servers",
        "ja": "並列実行サーバーの台数を増やす"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Page Object/Screenplay cô lập thông tin định vị và thao tác giao diện vào một nơi duy nhất, khi UI thay đổi chỉ cần sửa một chỗ thay vì hàng trăm kịch bản.",
      "en": "Page Object/Screenplay encapsulates locators and UI actions in one place, so a UI change requires editing a single component instead of hundreds of scripts.",
      "ja": "Page Object/Screenplayはロケーターとui操作を一箇所にカプセル化するため、UI変更時は数百のスクリプトではなく一箇所を修正するだけで済む。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thiết kế framework kiểm thử tự động theo hướng dữ liệu (data-driven), yếu tố nào KHÔNG phải là lợi ích chính?",
      "en": "When designing a data-driven test automation framework, which of the following is NOT a primary benefit?",
      "ja": "データ駆動型テスト自動化フレームワークを設計する際、主な利点でないものはどれか。"
    },
    "options": [
      {
        "vi": "Tách biệt dữ liệu kiểm thử khỏi logic kịch bản",
        "en": "Separation of test data from script logic",
        "ja": "テストデータとスクリプトロジックの分離"
      },
      {
        "vi": "Tăng số lượng biến thể kiểm thử mà không cần viết thêm mã",
        "en": "Increasing test coverage variants without additional coding",
        "ja": "追加コーディングなしにテストバリエーションを増やせる"
      },
      {
        "vi": "Cho phép người không rành kỹ thuật cập nhật dữ liệu kiểm thử",
        "en": "Allowing non-technical staff to update test data",
        "ja": "技術に詳しくない担当者でもテストデータを更新できる"
      },
      {
        "vi": "Tự động phát hiện và sửa lỗi logic nghiệp vụ trong ứng dụng",
        "en": "Automatically detecting and fixing business-logic defects in the application",
        "ja": "アプリケーションのビジネスロジック欠陥を自動的に検出・修正する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Data-driven giúp tách dữ liệu khỏi logic để mở rộng ca kiểm thử dễ dàng, nhưng bản thân nó không có khả năng tự sửa lỗi ứng dụng.",
      "en": "Data-driven design separates data from logic to scale test cases easily, but it has no capability to auto-fix application defects.",
      "ja": "データ駆動設計はデータをロジックから分離してテストケースを容易に拡張できるが、アプリケーションの欠陥を自動修正する能力自体はない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một chuyên gia CTEL cần đánh giá 'khả năng bảo trì' (maintainability) của một bộ tự động hoá kiểm thử hiện có. Chỉ số nào phù hợp nhất để đo lường?",
      "en": "A CTEL expert needs to assess the maintainability of an existing test automation suite. Which metric is most appropriate?",
      "ja": "CTEL専門家が既存のテスト自動化スイートの保守性を評価する必要がある。最も適切な指標はどれか。"
    },
    "options": [
      {
        "vi": "Tỷ lệ và thời gian trung bình cần sửa kịch bản sau mỗi lần thay đổi ứng dụng",
        "en": "The rate and average effort required to update scripts after each application change",
        "ja": "アプリケーション変更ごとにスクリプト修正が必要となる割合と平均所要時間"
      },
      {
        "vi": "Tổng số ca kiểm thử tự động hiện có",
        "en": "The total number of existing automated test cases",
        "ja": "既存の自動テストケースの総数"
      },
      {
        "vi": "Tốc độ thực thi toàn bộ bộ kiểm thử",
        "en": "The execution speed of the entire test suite",
        "ja": "テストスイート全体の実行速度"
      },
      {
        "vi": "Số lượng công cụ tự động hoá đang được sử dụng",
        "en": "The number of automation tools currently in use",
        "ja": "使用中の自動化ツールの数"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khả năng bảo trì liên quan trực tiếp đến mức độ dễ/khó và chi phí cập nhật kịch bản khi hệ thống thay đổi, không phải số lượng hay tốc độ.",
      "en": "Maintainability directly relates to how easily and cheaply scripts can be updated when the system changes, not to quantity or speed.",
      "ja": "保守性はシステム変更時にスクリプトをどれだけ容易かつ低コストで更新できるかに直結するものであり、数量や速度ではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong kiến trúc tự động hoá cấp doanh nghiệp, 'lớp trừu tượng hoá SUT' (SUT abstraction layer) mang lại lợi ích chính nào?",
      "en": "In enterprise-level automation architecture, what is the primary benefit of an SUT abstraction layer?",
      "ja": "エンタープライズレベルの自動化アーキテクチャにおいて、SUT抽象化層がもたらす主な利点は何か。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu bảo trì kịch bản",
        "en": "Eliminating the need for any script maintenance",
        "ja": "スクリプト保守の必要性を完全になくす"
      },
      {
        "vi": "Cách ly kịch bản kiểm thử khỏi chi tiết triển khai kỹ thuật của SUT, cho phép thay đổi công nghệ mà ít ảnh hưởng đến kịch bản",
        "en": "Isolating test scripts from technical implementation details of the SUT, allowing technology changes with minimal script impact",
        "ja": "テストスクリプトをSUTの技術的実装詳細から隔離し、技術変更があってもスクリプトへの影響を最小化する"
      },
      {
        "vi": "Tăng tốc độ chạy kiểm thử lên gấp nhiều lần",
        "en": "Multiplying test execution speed several times over",
        "ja": "テスト実行速度を数倍に高速化する"
      },
      {
        "vi": "Tự động tạo báo cáo kiểm thử cho ban lãnh đạo",
        "en": "Automatically generating executive test reports",
        "ja": "経営層向けのテストレポートを自動生成する"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Lớp trừu tượng hoá SUT tách biệt 'cái gì cần kiểm thử' khỏi 'cách thực hiện kỹ thuật', giúp kịch bản ổn định hơn khi SUT thay đổi công nghệ nền.",
      "en": "The SUT abstraction layer separates 'what to test' from 'how it is technically implemented', keeping scripts stable when underlying SUT technology changes.",
      "ja": "SUT抽象化層は「何をテストするか」と「どのように技術的に実装するか」を分離し、SUTの基盤技術が変わってもスクリプトを安定させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Nhóm tự động hoá quyết định gộp kiểm thử API và UI trong cùng một framework thống nhất cho toàn doanh nghiệp. Rủi ro kiến trúc lớn nhất cần cân nhắc là gì?",
      "en": "An automation team decides to combine API and UI testing into one unified enterprise framework. What is the biggest architectural risk to consider?",
      "ja": "自動化チームが企業全体でAPIテストとUIテストを一つの統合フレームワークにまとめることを決定した。考慮すべき最大のアーキテクチャ上のリスクは何か。"
    },
    "options": [
      {
        "vi": "Chi phí bản quyền công cụ giảm xuống bằng 0",
        "en": "Tool licensing cost drops to zero",
        "ja": "ツールのライセンス費用がゼロになる"
      },
      {
        "vi": "Không thể chạy kiểm thử API nữa",
        "en": "API testing can no longer be executed",
        "ja": "APIテストが実行できなくなる"
      },
      {
        "vi": "Framework trở nên quá phức tạp, khó bảo trì nếu không thiết kế module hoá rõ ràng theo từng lớp trách nhiệm",
        "en": "The framework becomes overly complex and hard to maintain if not modularized clearly by layer of responsibility",
        "ja": "責任ごとの層で明確にモジュール化されていないと、フレームワークが過度に複雑化し保守困難になる"
      },
      {
        "vi": "Đội kiểm thử không còn cần viết mã nữa",
        "en": "The test team no longer needs to write any code",
        "ja": "テストチームはコードを書く必要がなくなる"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Gộp nhiều loại kiểm thử vào một framework có thể tạo lợi ích tái sử dụng nhưng nếu thiếu phân lớp module hoá rõ ràng sẽ tạo ra một khối mã cồng kềnh, khó bảo trì và mở rộng.",
      "en": "Combining test types can bring reuse benefits but without clear modular layering it risks a bloated, hard-to-maintain monolithic codebase.",
      "ja": "複数のテスト種別を統合すると再利用の利点があるが、明確なモジュール層分けがないと肥大化し保守・拡張が困難なモノリシックなコードになるリスクがある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Từ góc độ chuyên gia CTEL, ai nên là người chịu trách nhiệm chính về việc thiết kế và quản trị kiến trúc tự động hoá kiểm thử ở cấp doanh nghiệp?",
      "en": "From a CTEL expert perspective, who should be primarily responsible for designing and governing the enterprise test automation architecture?",
      "ja": "CTEL専門家の視点から、エンタープライズレベルのテスト自動化アーキテクチャの設計とガバナンスの主な責任者は誰であるべきか。"
    },
    "options": [
      {
        "vi": "Từng tester riêng lẻ tự quyết định theo sở thích cá nhân",
        "en": "Each individual tester deciding based on personal preference",
        "ja": "各テスターが個人の好みで判断する"
      },
      {
        "vi": "Không cần vai trò chuyên trách, để tự phát triển tự nhiên",
        "en": "No dedicated role is needed; let it evolve organically",
        "ja": "専任の役割は不要で、自然発生的に任せる"
      },
      {
        "vi": "Chỉ bộ phận mua sắm công cụ (procurement)",
        "en": "Only the tool procurement department",
        "ja": "ツール調達部門のみ"
      },
      {
        "vi": "Kiến trúc sư/quản lý tự động hoá kiểm thử phối hợp cùng các bên liên quan (phát triển, DevOps, quản lý kiểm thử)",
        "en": "A test automation architect/manager collaborating with stakeholders (development, DevOps, test management)",
        "ja": "開発、DevOps、テストマネジメントなどの関係者と協力するテスト自動化アーキテクト/マネージャー"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Kiến trúc tự động hoá cấp doanh nghiệp cần một vai trò chuyên trách (kiến trúc sư/quản lý) để đảm bảo tính nhất quán, khả năng mở rộng và phối hợp liên phòng ban, tránh manh mún cục bộ.",
      "en": "Enterprise-level automation architecture requires a dedicated role to ensure consistency, scalability, and cross-team alignment, avoiding fragmented local solutions.",
      "ja": "エンタープライズレベルの自動化アーキテクチャには、一貫性・拡張性・部門横断の連携を確保する専任役割が必要であり、局所的な分断化を避けられる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khái niệm 'kiểm thử tự khôi phục' (self-healing test automation) đề cập đến điều gì?",
      "en": "What does the concept of 'self-healing test automation' refer to?",
      "ja": "「自己修復型テスト自動化(self-healing test automation)」という概念は何を指すか。"
    },
    "options": [
      {
        "vi": "Cơ chế tự động phát hiện và điều chỉnh bộ định vị phần tử (locator) khi giao diện thay đổi nhỏ, giảm hỏng kịch bản",
        "en": "A mechanism that automatically detects and adjusts element locators when the UI changes slightly, reducing script breakage",
        "ja": "UIの小さな変更時に要素ロケーターを自動検出・調整し、スクリプトの破損を減らす仕組み"
      },
      {
        "vi": "Công cụ tự khôi phục lại toàn bộ mã nguồn ứng dụng khi bị lỗi biên dịch",
        "en": "Tools automatically restoring the entire application source code after a compile error",
        "ja": "コンパイルエラー時にアプリケーションのソースコード全体を自動復元するツール"
      },
      {
        "vi": "Kịch bản tự động sửa lỗi logic nghiệp vụ của ứng dụng",
        "en": "Scripts automatically fixing the application's business logic defects",
        "ja": "スクリプトがアプリケーションのビジネスロジック欠陥を自動修正すること"
      },
      {
        "vi": "Quy trình con người tự sửa tay tất cả kịch bản hỏng hằng ngày",
        "en": "A manual process where staff fix all broken scripts daily",
        "ja": "担当者が毎日すべての壊れたスクリプトを手動修正するプロセス"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Self-healing automation dùng thuật toán (thường có AI/heuristic) để nhận diện phần tử giao diện đã thay đổi và tự động cập nhật locator, giảm gánh nặng bảo trì.",
      "en": "Self-healing automation uses algorithms (often AI/heuristics) to recognize changed UI elements and auto-update locators, reducing maintenance burden.",
      "ja": "自己修復型自動化はアルゴリズム(多くはAI/ヒューリスティック)を用いて変更されたUI要素を認識しロケーターを自動更新することで、保守負担を軽減する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong quản lý test automation ở doanh nghiệp lớn, 'nợ kỹ thuật tự động hoá' (automation technical debt) thường phát sinh chủ yếu do đâu?",
      "en": "In large-enterprise test automation management, 'automation technical debt' typically arises mainly from what?",
      "ja": "大企業のテスト自動化マネジメントにおいて、「自動化における技術的負債」は主に何から生じるか。"
    },
    "options": [
      {
        "vi": "Sử dụng quá nhiều máy chủ chạy song song",
        "en": "Using too many parallel execution servers",
        "ja": "並列実行サーバーを使いすぎること"
      },
      {
        "vi": "Ưu tiên tốc độ viết kịch bản nhanh mà bỏ qua thiết kế module hoá, chuẩn hoá và tái cấu trúc định kỳ",
        "en": "Prioritizing fast script creation while neglecting modular design, standardization, and periodic refactoring",
        "ja": "モジュール設計、標準化、定期的なリファクタリングを軽視し、スクリプト作成の速さを優先すること"
      },
      {
        "vi": "Viết quá nhiều tài liệu chiến lược kiểm thử",
        "en": "Writing too much test strategy documentation",
        "ja": "テスト戦略ドキュメントを書きすぎること"
      },
      {
        "vi": "Đội ngũ tester có quá nhiều kinh nghiệm chuyên môn",
        "en": "The test team having too much domain expertise",
        "ja": "テストチームが専門知識を持ちすぎていること"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Nợ kỹ thuật tích luỹ khi tổ chức chạy theo tiến độ ngắn hạn, bỏ qua tái cấu trúc và chuẩn hoá kiến trúc, dẫn đến mã trùng lặp và khó bảo trì về sau.",
      "en": "Technical debt accumulates when short-term delivery pressure leads to skipping refactoring and architectural standardization, causing duplicated, hard-to-maintain code later.",
      "ja": "短期的な納期優先によりリファクタリングやアーキテクチャの標準化が省略されると技術的負債が蓄積し、後にコードの重複や保守困難を招く。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi thiết kế thư viện dùng chung (shared library) cho nhiều đội tự động hoá trong doanh nghiệp, nguyên tắc nào quan trọng nhất để đảm bảo khả năng bảo trì lâu dài?",
      "en": "When designing a shared automation library used by multiple teams across an enterprise, which principle is most important for long-term maintainability?",
      "ja": "企業内の複数チームが利用する共有自動化ライブラリを設計する際、長期的な保守性を確保するために最も重要な原則は何か。"
    },
    "options": [
      {
        "vi": "Mỗi đội tự do sao chép và chỉnh sửa thư viện theo ý riêng",
        "en": "Each team is free to copy and modify the library independently",
        "ja": "各チームが自由にライブラリをコピーして独自に変更する"
      },
      {
        "vi": "Không cần tài liệu vì mã tự giải thích",
        "en": "No documentation needed since code is self-explanatory",
        "ja": "コードは自明であるためドキュメントは不要"
      },
      {
        "vi": "Đóng gói (encapsulation) rõ ràng, phiên bản hoá (versioning) và giao diện API ổn định, có kiểm soát thay đổi tập trung",
        "en": "Clear encapsulation, versioning, and stable APIs with centralized change control",
        "ja": "明確なカプセル化、バージョン管理、安定したAPIと集中的な変更管理"
      },
      {
        "vi": "Viết lại thư viện hoàn toàn mỗi 6 tháng",
        "en": "Completely rewrite the library every 6 months",
        "ja": "6か月ごとにライブラリを完全に書き直す"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Thư viện dùng chung cần đóng gói rõ, có kiểm soát phiên bản và API ổn định để nhiều đội có thể phụ thuộc vào nó mà không gây phá vỡ (breaking change) lan rộng.",
      "en": "A shared library needs clear encapsulation, version control, and stable APIs so multiple teams can depend on it without widespread breaking changes.",
      "ja": "共有ライブラリは明確なカプセル化とバージョン管理、安定したAPIを持つ必要があり、複数チームが依存しても広範な破壊的変更を招かない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một hệ thống tự động hoá kiểm thử có tỷ lệ 'flaky test' (kiểm thử không ổn định, kết quả thay đổi ngẫu nhiên) cao. Đâu là nguyên nhân kiến trúc phổ biến nhất?",
      "en": "A test automation system has a high rate of flaky tests (unstable, randomly changing results). What is the most common architectural cause?",
      "ja": "あるテスト自動化システムでフレーキーテスト(結果が不安定でランダムに変わるテスト)の割合が高い。最も一般的なアーキテクチャ上の原因は何か。"
    },
    "options": [
      {
        "vi": "Viết quá nhiều tài liệu đặc tả kiểm thử",
        "en": "Writing too much test specification documentation",
        "ja": "テスト仕様書を書きすぎていること"
      },
      {
        "vi": "Sử dụng ngôn ngữ lập trình quá hiện đại",
        "en": "Using a programming language that is too modern",
        "ja": "あまりにも最新のプログラミング言語を使用していること"
      },
      {
        "vi": "Đội ngũ có quá nhiều tester giỏi",
        "en": "The team has too many highly skilled testers",
        "ja": "チームに熟練テスターが多すぎること"
      },
      {
        "vi": "Kịch bản phụ thuộc vào trạng thái/thời điểm không được đồng bộ hoá đúng cách (thiếu quản lý đồng bộ, dữ liệu, môi trường)",
        "en": "Scripts depending on state/timing that is not properly synchronized (poor synchronization, data, or environment management)",
        "ja": "適切に同期されていない状態やタイミングにスクリプトが依存していること(同期・データ・環境管理の不備)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Flaky test thường bắt nguồn từ vấn đề kiến trúc: thiếu cơ chế đồng bộ hoá, quản lý dữ liệu kiểm thử và môi trường không cô lập, dẫn tới kết quả không ổn định.",
      "en": "Flaky tests typically stem from architectural gaps: missing synchronization mechanisms, poor test data management, and non-isolated environments, causing inconsistent results.",
      "ja": "フレーキーテストは通常、同期メカニズムの欠如、テストデータ管理の不備、環境が分離されていないなどのアーキテクチャ上の問題に起因し、結果が不安定になる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh CI/CD doanh nghiệp, tại sao kiến trúc tự động hoá kiểm thử nên hỗ trợ chạy song song và cô lập môi trường (test environment isolation)?",
      "en": "In an enterprise CI/CD context, why should test automation architecture support parallel execution and environment isolation?",
      "ja": "企業のCI/CDの文脈において、テスト自動化アーキテクチャが並列実行とテスト環境の分離をサポートすべき理由は何か。"
    },
    "options": [
      {
        "vi": "Để rút ngắn thời gian phản hồi (feedback loop) và tránh xung đột dữ liệu/trạng thái giữa các lần chạy đồng thời",
        "en": "To shorten the feedback loop and avoid data/state conflicts between concurrent runs",
        "ja": "フィードバックループを短縮し、同時実行間のデータ・状態の競合を避けるため"
      },
      {
        "vi": "Để giảm chi phí bản quyền công cụ kiểm thử",
        "en": "To reduce test tool licensing costs",
        "ja": "テストツールのライセンス費用を削減するため"
      },
      {
        "vi": "Để loại bỏ hoàn toàn nhu cầu kiểm thử hồi quy",
        "en": "To completely eliminate the need for regression testing",
        "ja": "回帰テストの必要性を完全になくすため"
      },
      {
        "vi": "Để đội phát triển không cần viết unit test nữa",
        "en": "So the development team no longer needs to write unit tests",
        "ja": "開発チームがユニットテストを書く必要がなくなるため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "CI/CD đòi hỏi phản hồi nhanh; chạy song song rút ngắn thời gian, còn cô lập môi trường ngăn các luồng kiểm thử can thiệp lẫn nhau về dữ liệu và trạng thái.",
      "en": "CI/CD demands fast feedback; parallel execution shortens cycle time, while environment isolation prevents concurrent test runs from interfering with each other's data and state.",
      "ja": "CI/CDは迅速なフィードバックを要求する。並列実行はサイクルタイムを短縮し、環境分離は同時実行されるテスト間でデータや状態が干渉するのを防ぐ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi chọn giữa kiến trúc tự động hoá 'keyword-driven' và 'behavior-driven' (BDD) cho một doanh nghiệp có nhiều bên liên quan phi kỹ thuật, yếu tố quyết định chính nên là gì?",
      "en": "When choosing between 'keyword-driven' and 'behavior-driven' (BDD) automation architecture for an enterprise with many non-technical stakeholders, what should be the key deciding factor?",
      "ja": "技術者以外の関係者が多い企業でキーワード駆動とビヘイビア駆動(BDD)の自動化アーキテクチャを選択する際、最も重要な判断基準は何であるべきか。"
    },
    "options": [
      {
        "vi": "Ngôn ngữ lập trình nào phổ biến nhất trên thị trường tuyển dụng",
        "en": "Which programming language is most popular in the job market",
        "ja": "求人市場で最も人気のあるプログラミング言語はどれか"
      },
      {
        "vi": "Mức độ dễ đọc/cộng tác của đặc tả với các bên liên quan phi kỹ thuật và khả năng ánh xạ sang kịch bản thực thi được",
        "en": "How readable/collaborative the specification is for non-technical stakeholders and how well it maps to executable scripts",
        "ja": "非技術系関係者にとっての仕様の可読性・協業のしやすさと、実行可能なスクリプトへのマッピングのしやすさ"
      },
      {
        "vi": "Công cụ nào có logo đẹp hơn",
        "en": "Which tool has a nicer logo",
        "ja": "どちらのツールのロゴがより魅力的か"
      },
      {
        "vi": "Số dòng mã ít nhất có thể viết được",
        "en": "Which requires the fewest lines of code possible",
        "ja": "できるだけコード行数が少ないものはどちらか"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Với nhiều bên liên quan phi kỹ thuật, tiêu chí then chốt là khả năng đọc hiểu, cộng tác trên đặc tả (như Gherkin trong BDD) và ánh xạ rõ ràng sang thực thi tự động.",
      "en": "With many non-technical stakeholders, the key criterion is specification readability/collaboration (e.g., Gherkin in BDD) and clear mapping to automated execution.",
      "ja": "非技術系関係者が多い場合、鍵となる基準は仕様(BDDにおけるGherkinなど)の可読性・協業性と、自動実行への明確なマッピングである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Phát biểu nào sau đây về kiến trúc tự động hoá kiểm thử cấp doanh nghiệp là ĐÚNG?",
      "en": "Which of the following statements about enterprise-level test automation architecture is TRUE?",
      "ja": "エンタープライズレベルのテスト自動化アーキテクチャに関する次の記述のうち、正しいものはどれか。"
    },
    "options": [
      {
        "vi": "Một kiến trúc tốt loại bỏ hoàn toàn nhu cầu quản trị (governance) vì mọi thứ đã tự động",
        "en": "A good architecture eliminates the need for governance entirely since everything is automated",
        "ja": "優れたアーキテクチャはすべてが自動化されているためガバナンスを完全に不要にする"
      },
      {
        "vi": "Kiến trúc tốt luôn yêu cầu dùng đúng một công cụ duy nhất cho toàn bộ doanh nghiệp, không có ngoại lệ",
        "en": "A good architecture always requires exactly one single tool across the entire enterprise, with no exceptions",
        "ja": "優れたアーキテクチャは常に企業全体でただ一つのツールのみを例外なく使用することを要求する"
      },
      {
        "vi": "Kiến trúc tốt cân bằng giữa khả năng tái sử dụng, mở rộng và bảo trì, đồng thời có cơ chế quản trị thay đổi rõ ràng",
        "en": "A good architecture balances reusability, scalability, and maintainability while having clear change-governance mechanisms",
        "ja": "優れたアーキテクチャは再利用性・拡張性・保守性のバランスを取りつつ、明確な変更管理の仕組みを持つ"
      },
      {
        "vi": "Kiến trúc tốt được thiết kế một lần và không bao giờ cần đánh giá lại",
        "en": "A good architecture is designed once and never needs to be reassessed",
        "ja": "優れたアーキテクチャは一度設計されたら二度と見直す必要がない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Kiến trúc tốt ở tầm doanh nghiệp phải cân bằng nhiều thuộc tính chất lượng (tái sử dụng, mở rộng, bảo trì) và có quản trị thay đổi, không phải cứng nhắc hay tĩnh mãi mãi.",
      "en": "A good enterprise architecture balances multiple quality attributes (reuse, scalability, maintainability) with change governance—not rigid or static forever.",
      "ja": "優れたエンタープライズアーキテクチャは複数の品質特性(再利用性、拡張性、保守性)のバランスを取り、変更管理を備えるべきであり、硬直的・永久不変であるべきではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Đội tự động hoá muốn giảm sự phụ thuộc trực tiếp giữa kịch bản kiểm thử và công cụ thực thi cụ thể (ví dụ Selenium, Playwright). Kỹ thuật kiến trúc nào phù hợp?",
      "en": "An automation team wants to reduce direct coupling between test scripts and a specific execution tool (e.g., Selenium, Playwright). Which architectural technique fits?",
      "ja": "自動化チームがテストスクリプトと特定の実行ツール(Selenium、Playwrightなど)との直接的な結合を減らしたいと考えている。どのアーキテクチャ手法が適切か。"
    },
    "options": [
      {
        "vi": "Gọi trực tiếp API của công cụ thực thi trong mọi kịch bản kiểm thử",
        "en": "Call the execution tool's API directly in every test script",
        "ja": "すべてのテストスクリプトで実行ツールのAPIを直接呼び出す"
      },
      {
        "vi": "Không dùng bất kỳ công cụ tự động hoá nào",
        "en": "Avoid using any automation tool at all",
        "ja": "自動化ツールを一切使用しない"
      },
      {
        "vi": "Viết lại toàn bộ kịch bản mỗi khi đổi công cụ",
        "en": "Rewrite all scripts every time the tool changes",
        "ja": "ツールを変更するたびにすべてのスクリプトを書き直す"
      },
      {
        "vi": "Sử dụng lớp trừu tượng hoá driver/wrapper để kịch bản chỉ giao tiếp qua giao diện chung, độc lập với công cụ cụ thể",
        "en": "Use a driver/wrapper abstraction layer so scripts interact only through a common interface, independent of the specific tool",
        "ja": "スクリプトが特定ツールに依存せず共通インターフェースのみを介して操作するよう、ドライバ/ラッパー抽象化層を使用する"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lớp wrapper/driver trừu tượng hoá công cụ thực thi giúp thay đổi hoặc nâng cấp công cụ mà không phải viết lại toàn bộ kịch bản kiểm thử.",
      "en": "A wrapper/driver abstraction layer decouples scripts from the underlying tool, allowing tool changes or upgrades without rewriting all test scripts.",
      "ja": "ラッパー/ドライバの抽象化層はスクリプトを基盤ツールから分離し、ツールの変更やアップグレード時にすべてのテストスクリプトを書き直す必要をなくす。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vì sao việc quản lý dữ liệu kiểm thử (test data management) là một thành phần kiến trúc quan trọng trong tự động hoá kiểm thử cấp doanh nghiệp?",
      "en": "Why is test data management a critical architectural component in enterprise-level test automation?",
      "ja": "なぜテストデータ管理はエンタープライズレベルのテスト自動化における重要なアーキテクチャ要素なのか。"
    },
    "options": [
      {
        "vi": "Vì dữ liệu kiểm thử không ổn định/không cô lập là nguyên nhân phổ biến gây kết quả sai lệch và khó tái lập lỗi",
        "en": "Because unstable/non-isolated test data is a common cause of misleading results and hard-to-reproduce defects",
        "ja": "不安定または分離されていないテストデータは誤った結果や再現困難な欠陥の一般的な原因であるため"
      },
      {
        "vi": "Vì dữ liệu kiểm thử luôn phải được xoá sau mỗi lần chạy để tiết kiệm ổ đĩa",
        "en": "Because test data must always be deleted after each run to save disk space",
        "ja": "ディスク容量節約のためテストデータは実行ごとに常に削除しなければならないため"
      },
      {
        "vi": "Vì công cụ tự động hoá không thể chạy nếu không có dữ liệu thật từ production",
        "en": "Because automation tools cannot run without real production data",
        "ja": "自動化ツールは本番データがなければ実行できないため"
      },
      {
        "vi": "Vì dữ liệu kiểm thử quyết định giao diện người dùng của ứng dụng",
        "en": "Because test data determines the application's user interface",
        "ja": "テストデータがアプリケーションのユーザーインターフェースを決定するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Dữ liệu kiểm thử không được quản lý tốt (chia sẻ, không cô lập, không nhất quán) dẫn đến kết quả không đáng tin cậy và khó điều tra nguyên nhân lỗi.",
      "en": "Poorly managed test data (shared, non-isolated, inconsistent) leads to unreliable results and makes root-cause investigation difficult.",
      "ja": "適切に管理されていないテストデータ(共有・非分離・不整合)は信頼性の低い結果を招き、根本原因の調査を困難にする。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đánh giá ROI của một kiến trúc tự động hoá kiểm thử doanh nghiệp, chi phí bảo trì dài hạn nên được xem xét như thế nào?",
      "en": "When evaluating the ROI of an enterprise test automation architecture, how should long-term maintenance cost be considered?",
      "ja": "エンタープライズテスト自動化アーキテクチャのROI評価において、長期的な保守コストはどのように考慮すべきか。"
    },
    "options": [
      {
        "vi": "Bỏ qua vì chỉ chi phí xây dựng ban đầu mới quan trọng",
        "en": "Ignored, since only the initial build cost matters",
        "ja": "最初の構築コストのみが重要なので無視する"
      },
      {
        "vi": "Là một cấu phần chi phí liên tục cần đưa vào tính toán tổng chi phí sở hữu (TCO) cùng với lợi ích tiết kiệm thời gian kiểm thử",
        "en": "Treated as an ongoing cost component included in total cost of ownership (TCO) alongside time-saving benefits",
        "ja": "テスト時間短縮による利益とともに、総所有コスト(TCO)に含める継続的なコスト要素として扱う"
      },
      {
        "vi": "Chỉ tính khi có sự cố sản xuất (production incident) xảy ra",
        "en": "Only counted when a production incident occurs",
        "ja": "本番障害が発生したときのみカウントする"
      },
      {
        "vi": "Luôn bằng 0 nếu dùng công cụ mã nguồn mở",
        "en": "Always zero if open-source tools are used",
        "ja": "オープンソースツールを使えば常にゼロになる"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ROI thực tế phải tính cả chi phí bảo trì liên tục (TCO) so với lợi ích (thời gian, độ tin cậy) chứ không chỉ chi phí xây dựng ban đầu.",
      "en": "Realistic ROI must weigh ongoing maintenance cost (TCO) against benefits (time savings, reliability), not just the initial build cost.",
      "ja": "現実的なROIは初期構築コストだけでなく、継続的な保守コスト(TCO)と利益(時間節約、信頼性)を比較検討する必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một doanh nghiệp có nhiều đội sản phẩm dùng chung một nền tảng tự động hoá kiểm thử trung tâm. Rủi ro tổ chức lớn nhất khi không có mô hình quản trị (governance model) rõ ràng là gì?",
      "en": "An enterprise has multiple product teams sharing a central test automation platform. What is the biggest organizational risk without a clear governance model?",
      "ja": "複数の製品チームが中央テスト自動化プラットフォームを共有している企業において、明確なガバナンスモデルがない場合の最大の組織的リスクは何か。"
    },
    "options": [
      {
        "vi": "Tốc độ mạng nội bộ chậm hơn",
        "en": "Slower internal network speeds",
        "ja": "社内ネットワーク速度の低下"
      },
      {
        "vi": "Chi phí điện năng tăng cao",
        "en": "Higher electricity costs",
        "ja": "電力コストの上昇"
      },
      {
        "vi": "Xung đột thay đổi, phân mảnh chuẩn mực và trách nhiệm không rõ ràng dẫn đến nền tảng suy thoái theo thời gian",
        "en": "Conflicting changes, fragmented standards, and unclear ownership causing the platform to degrade over time",
        "ja": "変更の競合、標準の分断化、責任の不明確化により、プラットフォームが時間とともに劣化すること"
      },
      {
        "vi": "Số lượng tester giảm xuống",
        "en": "A reduction in the number of testers",
        "ja": "テスター数の減少"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Không có quản trị rõ ràng, nhiều đội chỉnh sửa nền tảng chung theo cách không nhất quán, gây xung đột, phá vỡ chuẩn và làm nền tảng suy thoái chất lượng.",
      "en": "Without clear governance, multiple teams modify the shared platform inconsistently, causing conflicts, broken standards, and quality degradation over time.",
      "ja": "明確なガバナンスがないと、複数チームが共有プラットフォームを一貫性なく変更し、競合や標準の崩壊、品質劣化を招く。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tách kiểm thử tự động thành nhiều tầng (API, service, UI) trong kim tự tháp kiểm thử ở doanh nghiệp, lý do kiến trúc chính là gì?",
      "en": "When splitting automated tests into multiple layers (API, service, UI) per the test pyramid at an enterprise, what is the main architectural rationale?",
      "ja": "企業のテストピラミッドに従いテストをAPI・サービス・UIなど複数層に分ける際、主要なアーキテクチャ上の理由は何か。"
    },
    "options": [
      {
        "vi": "Để giảm số lượng tester cần tuyển",
        "en": "To reduce the number of testers needed to hire",
        "ja": "採用すべきテスターの数を減らすため"
      },
      {
        "vi": "Để tăng số lượng công cụ cần mua",
        "en": "To increase the number of tools that must be purchased",
        "ja": "購入すべきツールの数を増やすため"
      },
      {
        "vi": "Để loại bỏ hoàn toàn kiểm thử UI",
        "en": "To eliminate UI testing entirely",
        "ja": "UIテストを完全になくすため"
      },
      {
        "vi": "Để mỗi tầng chạy nhanh, ổn định và dễ chẩn đoán lỗi hơn, giảm phụ thuộc vào các kiểm thử UI chậm và dễ hỏng",
        "en": "So each layer runs faster, more stably, and is easier to diagnose, reducing reliance on slow, fragile UI tests",
        "ja": "各層をより高速・安定・診断しやすくし、遅く壊れやすいUIテストへの依存を減らすため"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Phân tầng kiểm thử tự động phản ánh nguyên lý kim tự tháp: nhiều kiểm thử nhanh/ổn định ở tầng thấp, ít kiểm thử UI chậm/dễ hỏng ở tầng cao, cải thiện tốc độ phản hồi và độ tin cậy.",
      "en": "Layering reflects the test pyramid principle: many fast/stable low-level tests, fewer slow/fragile UI tests at the top, improving feedback speed and reliability.",
      "ja": "層分けはテストピラミッドの原則を反映しており、下位層に高速・安定したテストを多く、上位層に遅く壊れやすいUIテストを少なくすることで、フィードバック速度と信頼性を向上させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một cuộc đánh giá kiến trúc tự động hoá, chuyên gia CTEL phát hiện các kịch bản kiểm thử chứa cả logic xác minh và mã điều khiển trình duyệt lẫn lộn trong cùng một tệp. Đây là dấu hiệu của vấn đề nào?",
      "en": "During an automation architecture review, a CTEL expert finds test scripts mixing verification logic and browser control code in the same file. This is a sign of what problem?",
      "ja": "自動化アーキテクチャレビューにおいて、CTEL専門家が検証ロジックとブラウザ制御コードが同一ファイルに混在しているテストスクリプトを発見した。これは何の問題の兆候か。"
    },
    "options": [
      {
        "vi": "Thiếu tách biệt mối quan tâm (separation of concerns), làm giảm khả năng bảo trì và tái sử dụng",
        "en": "Lack of separation of concerns, reducing maintainability and reusability",
        "ja": "関心の分離(separation of concerns)の欠如であり、保守性と再利用性を低下させる"
      },
      {
        "vi": "Tốc độ chạy kiểm thử quá nhanh",
        "en": "Test execution being too fast",
        "ja": "テスト実行が速すぎること"
      },
      {
        "vi": "Đội ngũ có quá nhiều tài liệu đặc tả",
        "en": "The team having too much specification documentation",
        "ja": "チームが仕様書を持ちすぎていること"
      },
      {
        "vi": "Sử dụng quá nhiều môi trường kiểm thử song song",
        "en": "Using too many parallel test environments",
        "ja": "並列テスト環境を使いすぎていること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Trộn lẫn logic xác minh và điều khiển kỹ thuật vi phạm nguyên tắc tách biệt mối quan tâm, khiến kịch bản khó đọc, khó tái sử dụng và khó bảo trì khi có thay đổi.",
      "en": "Mixing verification and technical control logic violates separation of concerns, making scripts hard to read, reuse, and maintain when changes occur.",
      "ja": "検証ロジックと技術的制御ロジックの混在は関心の分離の原則に反し、変更発生時にスクリプトの可読性・再利用性・保守性を損なう。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Doanh nghiệp muốn mở rộng tự động hoá kiểm thử sang môi trường container hoá (Docker/Kubernetes) để chạy song song quy mô lớn. Yêu cầu kiến trúc nào là tiên quyết?",
      "en": "An enterprise wants to scale test automation into a containerized environment (Docker/Kubernetes) for large-scale parallel execution. Which architectural requirement is a prerequisite?",
      "ja": "企業がテスト自動化を大規模並列実行のためコンテナ化環境(Docker/Kubernetes)に拡張したいと考えている。前提となるアーキテクチャ要件は何か。"
    },
    "options": [
      {
        "vi": "Tất cả kịch bản phải chạy tuần tự trên một máy duy nhất",
        "en": "All scripts must run sequentially on a single machine",
        "ja": "すべてのスクリプトは単一マシン上で順次実行しなければならない"
      },
      {
        "vi": "Kịch bản kiểm thử phải không trạng thái hoặc quản lý trạng thái/dữ liệu độc lập, không phụ thuộc máy chủ cố định",
        "en": "Test scripts must be stateless or manage state/data independently, without depending on a fixed host machine",
        "ja": "テストスクリプトはステートレスであるか、固定ホストマシンに依存せず状態・データを独立して管理する必要がある"
      },
      {
        "vi": "Không được sử dụng bất kỳ biến môi trường nào",
        "en": "No environment variables may be used at all",
        "ja": "環境変数を一切使用してはならない"
      },
      {
        "vi": "Phải viết lại toàn bộ kiểm thử bằng ngôn ngữ script shell",
        "en": "All tests must be rewritten entirely in shell script",
        "ja": "すべてのテストをシェルスクリプトで書き直す必要がある"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Để chạy song song quy mô lớn trên container, kịch bản cần độc lập trạng thái/dữ liệu, tránh xung đột tài nguyên dùng chung giữa các instance chạy đồng thời.",
      "en": "For large-scale parallel execution in containers, scripts must be state/data-independent to avoid shared-resource conflicts between concurrently running instances.",
      "ja": "コンテナでの大規模並列実行のためには、スクリプトが状態・データにおいて独立しており、同時実行インスタンス間の共有リソース競合を避ける必要がある。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Vì sao chuyên gia CTEL khuyến nghị áp dụng nguyên tắc 'DRY' (Don't Repeat Yourself) trong thiết kế kiến trúc tự động hoá kiểm thử?",
      "en": "Why does a CTEL expert recommend applying the 'DRY' (Don't Repeat Yourself) principle in test automation architecture design?",
      "ja": "CTEL専門家がテスト自動化アーキテクチャ設計に「DRY(Don't Repeat Yourself)」原則の適用を推奨する理由は何か。"
    },
    "options": [
      {
        "vi": "Để mỗi kịch bản kiểm thử độc lập hoàn toàn, không chia sẻ bất kỳ thành phần nào",
        "en": "So each test script is completely independent, sharing no components at all",
        "ja": "各テストスクリプトが完全に独立し、いかなるコンポーネントも共有しないようにするため"
      },
      {
        "vi": "Để tăng số dòng mã nhằm trông chuyên nghiệp hơn",
        "en": "To increase the line count so the codebase looks more professional",
        "ja": "コード行数を増やしてより専門的に見せるため"
      },
      {
        "vi": "Để giảm trùng lặp mã, khi logic thay đổi chỉ cần cập nhật một nơi thay vì nhiều bản sao rải rác",
        "en": "To reduce code duplication, so logic changes require updating one place instead of many scattered copies",
        "ja": "コード重複を減らし、ロジック変更時に散在する多数のコピーではなく一箇所を更新すれば済むようにするため"
      },
      {
        "vi": "Để đảm bảo mọi kịch bản đều chạy trên cùng một trình duyệt",
        "en": "To ensure all scripts run on the same browser",
        "ja": "すべてのスクリプトが同じブラウザ上で実行されるようにするため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "DRY giảm trùng lặp logic, tập trung thay đổi vào một điểm duy nhất, giảm đáng kể rủi ro và công sức bảo trì khi ứng dụng hoặc quy trình nghiệp vụ thay đổi.",
      "en": "DRY reduces duplicated logic, centralizing changes to a single point and significantly reducing maintenance risk and effort when the application or business process changes.",
      "ja": "DRYはロジックの重複を減らし、変更を一箇所に集中させることで、アプリケーションや業務プロセスの変更時の保守リスクと工数を大幅に削減する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một tổ chức lớn, đội tự động hoá cân nhắc giữa mô hình 'framework tập trung do đội chuyên trách phát triển' và 'mỗi đội sản phẩm tự xây framework riêng'. Ưu điểm chính của mô hình tập trung là gì?",
      "en": "In a large organization, an automation team weighs a 'centralized framework built by a dedicated team' versus 'each product team builds its own framework'. What is the main advantage of the centralized model?",
      "ja": "大規模組織において自動化チームが「専任チームが構築する集中型フレームワーク」と「各製品チームが独自にフレームワークを構築する」モデルを比較検討している。集中型モデルの主な利点は何か。"
    },
    "options": [
      {
        "vi": "Giảm nhu cầu bảo trì xuống bằng 0",
        "en": "Reduces maintenance needs to zero",
        "ja": "保守の必要性をゼロにする"
      },
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu giao tiếp giữa các đội",
        "en": "Eliminates any need for communication between teams",
        "ja": "チーム間のコミュニケーションを完全に不要にする"
      },
      {
        "vi": "Cho phép mỗi đội hoàn toàn không phải tuân theo bất kỳ chuẩn chung nào",
        "en": "Allows each team to ignore any common standard entirely",
        "ja": "各チームが共通標準に一切従わなくてよくなる"
      },
      {
        "vi": "Đảm bảo tính nhất quán, chuẩn hoá và tái sử dụng cao hơn giữa các đội, giảm chi phí trùng lặp công sức phát triển",
        "en": "Ensures higher consistency, standardization, and reuse across teams, reducing duplicated development effort",
        "ja": "チーム間での一貫性・標準化・再利用性を高め、開発工数の重複を減らす"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Mô hình tập trung tận dụng chuyên môn của đội chuyên trách để chuẩn hoá kiến trúc, tránh mỗi đội tự phát triển lại từ đầu, tăng khả năng tái sử dụng và nhất quán trên toàn doanh nghiệp.",
      "en": "The centralized model leverages a dedicated team's expertise to standardize architecture, avoiding redundant reinvention across teams and increasing enterprise-wide reuse and consistency.",
      "ja": "集中型モデルは専任チームの専門知識を活用してアーキテクチャを標準化し、各チームが一から再構築する無駄を避け、企業全体での再利用性と一貫性を高める。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Đâu là ví dụ thực tế về việc áp dụng nguyên tắc 'khả năng cấu hình' (configurability) trong kiến trúc tự động hoá kiểm thử doanh nghiệp?",
      "en": "Which is a real-world example of applying the 'configurability' principle in enterprise test automation architecture?",
      "ja": "エンタープライズテスト自動化アーキテクチャにおける「設定可能性(configurability)」原則の適用例として適切な実例はどれか。"
    },
    "options": [
      {
        "vi": "Đưa các tham số như môi trường, trình duyệt, dữ liệu vào tệp cấu hình bên ngoài để dễ thay đổi mà không sửa mã",
        "en": "Externalizing parameters such as environment, browser, and data into configuration files so they can change without modifying code",
        "ja": "環境、ブラウザ、データなどのパラメータを外部設定ファイルに切り出し、コードを変更せずに変更できるようにする"
      },
      {
        "vi": "Ghi cứng (hard-code) URL môi trường, tài khoản đăng nhập trực tiếp trong từng kịch bản",
        "en": "Hard-coding environment URLs and login credentials directly inside every script",
        "ja": "環境URLやログイン認証情報を各スクリプトに直接ハードコーディングする"
      },
      {
        "vi": "Viết một kịch bản riêng cho mỗi môi trường (dev, staging, production)",
        "en": "Writing a separate script for each environment (dev, staging, production)",
        "ja": "環境(dev、staging、production)ごとに個別のスクリプトを書く"
      },
      {
        "vi": "Không cho phép thay đổi bất kỳ tham số nào sau khi triển khai",
        "en": "Disallowing any parameter changes after deployment",
        "ja": "デプロイ後はいかなるパラメータ変更も許可しない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Khả năng cấu hình nghĩa là tách tham số biến đổi (môi trường, dữ liệu, trình duyệt) ra khỏi mã nguồn, cho phép điều chỉnh linh hoạt mà không cần sửa hay nhân bản kịch bản.",
      "en": "Configurability means externalizing variable parameters (environment, data, browser) from source code, allowing flexible adjustment without modifying or duplicating scripts.",
      "ja": "設定可能性とは、可変パラメータ(環境、データ、ブラウザ)をソースコードから切り離し、スクリプトを変更・複製することなく柔軟に調整できるようにすることを意味する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một chuyên gia CTEL đang chọn giữa kiến trúc tự động hoá 'lớp mỏng' (thin layer trực tiếp gọi tool) và 'kiến trúc phân lớp đầy đủ' (full layered gTAA-style) cho một dự án nhỏ, ngắn hạn. Quyết định hợp lý là gì?",
      "en": "A CTEL expert is choosing between a 'thin layer' automation architecture (directly calling the tool) and a 'fully layered' gTAA-style architecture for a small, short-term project. What is the reasonable decision?",
      "ja": "CTEL専門家が小規模・短期プロジェクト向けに「シンレイヤー」自動化アーキテクチャ(ツールを直接呼び出す)と「フル階層型」gTAAスタイルアーキテクチャのどちらを選ぶか検討している。合理的な判断はどれか。"
    },
    "options": [
      {
        "vi": "Luôn chọn kiến trúc phân lớp đầy đủ bất kể quy mô dự án vì đó là 'best practice' tuyệt đối",
        "en": "Always choose the fully layered architecture regardless of project size because it is an absolute 'best practice'",
        "ja": "プロジェクト規模に関係なく、絶対的な『ベストプラクティス』であるという理由で常にフル階層型アーキテクチャを選ぶ"
      },
      {
        "vi": "Cân nhắc chi phí đầu tư kiến trúc so với tuổi thọ và quy mô dự kiến của dự án; dự án nhỏ ngắn hạn có thể chấp nhận kiến trúc đơn giản hơn",
        "en": "Weigh the architectural investment cost against the expected lifespan and scale of the project; a small short-term project may reasonably accept a simpler architecture",
        "ja": "アーキテクチャへの投資コストをプロジェクトの想定寿命と規模と比較検討する。小規模・短期プロジェクトではよりシンプルなアーキテクチャでも妥当な場合がある"
      },
      {
        "vi": "Không cần bất kỳ kiến trúc nào, viết mã tuỳ hứng",
        "en": "No architecture is needed at all; code can be written arbitrarily",
        "ja": "アーキテクチャは一切不要であり、思いつくままにコードを書けばよい"
      },
      {
        "vi": "Chọn ngẫu nhiên vì kết quả không ảnh hưởng đến chi phí bảo trì",
        "en": "Choose randomly since it has no effect on maintenance cost",
        "ja": "保守コストに影響しないためランダムに選べばよい"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Quyết định kiến trúc cần dựa trên phân tích chi phí-lợi ích thực tế: đầu tư kiến trúc phức tạp chỉ hợp lý khi tương xứng với quy mô, tuổi thọ và giá trị lâu dài của dự án.",
      "en": "Architectural decisions should be based on real cost-benefit analysis: investing in a complex architecture is justified only when proportional to the project's scale, lifespan, and long-term value.",
      "ja": "アーキテクチャの意思決定は実際の費用対効果分析に基づくべきであり、複雑なアーキテクチャへの投資はプロジェクトの規模・寿命・長期的価値に見合う場合にのみ正当化される。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh quản trị tự động hoá kiểm thử doanh nghiệp, việc thiết lập 'tiêu chuẩn coding convention' và 'quy trình review mã tự động hoá' nhằm mục đích chính nào?",
      "en": "In enterprise test automation governance, establishing 'coding conventions' and an 'automation code review process' primarily serves what purpose?",
      "ja": "エンタープライズテスト自動化のガバナンスにおいて、「コーディング規約」と「自動化コードレビュープロセス」を確立する主な目的は何か。"
    },
    "options": [
      {
        "vi": "Làm chậm tiến độ dự án một cách có chủ đích",
        "en": "To intentionally slow down project progress",
        "ja": "意図的にプロジェクトの進行を遅らせるため"
      },
      {
        "vi": "Giảm số lượng tester cần thiết xuống bằng 0",
        "en": "Reducing the number of testers needed to zero",
        "ja": "必要なテスター数をゼロに減らすため"
      },
      {
        "vi": "Đảm bảo chất lượng, nhất quán và khả năng bảo trì của mã tự động hoá trên nhiều đội/dự án, phát hiện sớm vấn đề thiết kế",
        "en": "Ensuring quality, consistency, and maintainability of automation code across teams/projects, catching design issues early",
        "ja": "チームやプロジェクトを横断して自動化コードの品質・一貫性・保守性を確保し、設計上の問題を早期に発見するため"
      },
      {
        "vi": "Ngăn không cho bất kỳ ai đóng góp mã tự động hoá",
        "en": "Preventing anyone from contributing automation code",
        "ja": "誰も自動化コードに貢献できないようにするため"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Coding convention và review giúp phát hiện sớm vấn đề thiết kế/chất lượng, duy trì tính nhất quán và khả năng bảo trì khi nhiều người/đội cùng đóng góp vào codebase tự động hoá chung.",
      "en": "Coding conventions and reviews catch design/quality issues early and maintain consistency and maintainability when multiple people/teams contribute to a shared automation codebase.",
      "ja": "コーディング規約とレビューは設計・品質上の問題を早期に発見し、複数の人・チームが共有自動化コードベースに貢献する際の一貫性と保守性を維持する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Đâu là mô tả ĐÚNG nhất về vai trò của 'lớp Test Definition' trong kiến trúc gTAA?",
      "en": "Which is the MOST accurate description of the role of the 'Test Definition' layer in gTAA?",
      "ja": "gTAAにおける「テスト定義(Test Definition)」層の役割として最も正確な説明はどれか。"
    },
    "options": [
      {
        "vi": "Nơi thực thi trực tiếp lệnh gọi tới trình duyệt hoặc hệ điều hành",
        "en": "Where commands are directly executed against the browser or operating system",
        "ja": "ブラウザやOSに対してコマンドを直接実行する場所"
      },
      {
        "vi": "Nơi quản lý cấp phép truy cập của người dùng cuối",
        "en": "Where end-user access permissions are managed",
        "ja": "エンドユーザーのアクセス権限を管理する場所"
      },
      {
        "vi": "Nơi lưu trữ log lỗi hệ thống sản xuất",
        "en": "Where production system error logs are stored",
        "ja": "本番システムのエラーログを保存する場所"
      },
      {
        "vi": "Nơi biểu diễn các ca kiểm thử/kịch bản ở mức trừu tượng nghiệp vụ, độc lập với công nghệ thực thi bên dưới",
        "en": "Where test cases/scripts are represented at a business-level abstraction, independent of the underlying execution technology",
        "ja": "基盤の実行技術から独立した、ビジネスレベルの抽象度でテストケース/スクリプトを表現する場所"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Lớp Test Definition biểu diễn kiểm thử ở mức trừu tượng (ví dụ bước nghiệp vụ, từ khoá), tách biệt khỏi chi tiết kỹ thuật thực thi, giúp kịch bản dễ đọc và bảo trì hơn.",
      "en": "The Test Definition layer represents tests at an abstract level (e.g., business steps, keywords), separate from execution technicalities, making scripts more readable and maintainable.",
      "ja": "テスト定義層はテストを抽象レベル(ビジネスステップやキーワードなど)で表現し、実行の技術的詳細から分離することで、スクリプトの可読性と保守性を高める。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tích hợp tự động hoá kiểm thử vào pipeline CI/CD doanh nghiệp, tại sao cần cơ chế 'gắn thẻ' (tagging) hoặc phân loại kiểm thử theo cấp độ (smoke, regression, full)?",
      "en": "When integrating test automation into an enterprise CI/CD pipeline, why is a 'tagging' or test-tier classification (smoke, regression, full) mechanism needed?",
      "ja": "エンタープライズCI/CDパイプラインにテスト自動化を統合する際、なぜ「タグ付け」やテストの階層分類(スモーク、リグレッション、フル)の仕組みが必要なのか。"
    },
    "options": [
      {
        "vi": "Để có thể chọn chạy tập con kiểm thử phù hợp theo giai đoạn pipeline, cân bằng tốc độ phản hồi và mức độ bao phủ",
        "en": "To selectively run the appropriate subset of tests per pipeline stage, balancing feedback speed and coverage",
        "ja": "パイプラインの段階ごとに適切なテストサブセットを選択実行し、フィードバック速度とカバレッジのバランスを取るため"
      },
      {
        "vi": "Để tăng tổng thời gian chạy toàn bộ pipeline lên tối đa",
        "en": "To maximize the total pipeline execution time",
        "ja": "パイプライン全体の実行時間を最大化するため"
      },
      {
        "vi": "Vì công cụ CI/CD yêu cầu bắt buộc phải có nhãn màu sắc",
        "en": "Because CI/CD tools mandatorily require color labels",
        "ja": "CI/CDツールが色付きラベルを必須で要求するため"
      },
      {
        "vi": "Để loại bỏ hoàn toàn kiểm thử hồi quy khỏi pipeline",
        "en": "To completely remove regression tests from the pipeline",
        "ja": "パイプラインから回帰テストを完全に排除するため"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Gắn thẻ/phân loại cho phép chạy nhóm kiểm thử nhanh (smoke) ở giai đoạn commit và nhóm đầy đủ hơn ở giai đoạn sau, tối ưu giữa tốc độ phản hồi và độ bao phủ rủi ro.",
      "en": "Tagging/classification allows running fast smoke tests at commit stage and fuller suites later, optimizing between feedback speed and risk coverage.",
      "ja": "タグ付け・分類により、コミット段階では高速なスモークテストを、後の段階ではより網羅的なスイートを実行でき、フィードバック速度とリスクカバレッジの最適化ができる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong mô hình Chi phí Chất lượng (Cost of Quality - COQ), chi phí đào tạo kiểm thử viên, xây dựng quy trình review yêu cầu và thiết lập tiêu chuẩn coding thuộc nhóm chi phí nào?",
      "en": "In the Cost of Quality (COQ) model, costs for training testers, establishing requirement review processes, and setting coding standards belong to which cost category?",
      "ja": "品質コスト(COQ)モデルにおいて、テスターの教育、要件レビュープロセスの構築、コーディング標準の制定にかかる費用はどのコスト区分に属するか。"
    },
    "options": [
      {
        "vi": "Chi phí thẩm định (appraisal cost)",
        "en": "Appraisal cost",
        "ja": "評価コスト"
      },
      {
        "vi": "Chi phí ngăn ngừa (prevention cost)",
        "en": "Prevention cost",
        "ja": "予防コスト"
      },
      {
        "vi": "Chi phí lỗi nội bộ (internal failure cost)",
        "en": "Internal failure cost",
        "ja": "内部失敗コスト"
      },
      {
        "vi": "Chi phí lỗi bên ngoài (external failure cost)",
        "en": "External failure cost",
        "ja": "外部失敗コスト"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chi phí ngăn ngừa là các khoản đầu tư nhằm ngăn lỗi phát sinh ngay từ đầu, như đào tạo, xây dựng quy trình review và tiêu chuẩn — khác với chi phí thẩm định (phát hiện lỗi) hay chi phí lỗi (khắc phục lỗi đã xảy ra).",
      "en": "Prevention costs are investments aimed at stopping defects from occurring in the first place, such as training, review process setup, and standards — distinct from appraisal (detection) or failure (correction) costs.",
      "ja": "予防コストは、教育、レビュープロセスの構築、標準の制定など、そもそも欠陥の発生を防ぐための投資であり、評価コスト(検出)や失敗コスト(修正)とは異なる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức đang cân nhắc đầu tư công cụ tự động hoá kiểm thử trị giá 500 triệu đồng, dự kiến tiết kiệm 150 triệu đồng/quý chi phí kiểm thử thủ công. Chỉ số nào phù hợp nhất để xác định thời điểm khoản đầu tư bắt đầu sinh lời?",
      "en": "An organization is considering a 500-million-VND investment in a test automation tool, expected to save 150 million VND per quarter in manual testing costs. Which metric is most appropriate to determine when the investment starts generating positive returns?",
      "ja": "ある組織が5億ドン相当のテスト自動化ツールへの投資を検討しており、四半期あたり1億5千万ドンの手動テストコスト削減が見込まれる。この投資がプラスの収益を生み始める時点を判断するのに最も適した指標はどれか。"
    },
    "options": [
      {
        "vi": "Mật độ khiếm khuyết (defect density)",
        "en": "Defect density",
        "ja": "欠陥密度"
      },
      {
        "vi": "Tỷ lệ bao phủ mã nguồn (code coverage)",
        "en": "Code coverage ratio",
        "ja": "コードカバレッジ率"
      },
      {
        "vi": "Điểm hoà vốn (break-even point)",
        "en": "Break-even point",
        "ja": "損益分岐点"
      },
      {
        "vi": "Thời gian trung bình phát hiện lỗi (MTTD)",
        "en": "Mean time to detect (MTTD)",
        "ja": "平均検出時間(MTTD)"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Điểm hoà vốn xác định thời điểm tổng lợi ích tích luỹ bằng tổng chi phí đầu tư ban đầu, là chỉ số cốt lõi để đánh giá thời gian thu hồi vốn của khoản đầu tư tự động hoá.",
      "en": "Break-even point identifies when cumulative benefits equal the initial investment cost, making it the core metric for evaluating payback timing of an automation investment.",
      "ja": "損益分岐点は、累積利益が初期投資コストと等しくなる時点を示すため、自動化投資の回収時期を評価する中心的な指標である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi tính ROI cho tự động hoá kiểm thử hồi quy, yếu tố nào thường bị đánh giá THẤP nhất trong các tổ chức thiếu kinh nghiệm, dẫn đến ROI thực tế thấp hơn dự kiến?",
      "en": "When calculating ROI for regression test automation, which factor is most commonly underestimated by inexperienced organizations, leading to actual ROI falling short of projections?",
      "ja": "回帰テスト自動化のROIを計算する際、経験の浅い組織が最も過小評価しがちで、結果として実際のROIが予測を下回る要因はどれか。"
    },
    "options": [
      {
        "vi": "Chi phí đào tạo ban đầu cho đội ngũ",
        "en": "The initial training cost for the team",
        "ja": "チームの初期トレーニングコスト"
      },
      {
        "vi": "Chi phí bản quyền công cụ tự động hoá",
        "en": "The licensing cost of the automation tool",
        "ja": "自動化ツールのライセンス費用"
      },
      {
        "vi": "Chi phí mua thêm máy chủ CI/CD",
        "en": "The cost of additional CI/CD server hardware",
        "ja": "追加のCI/CDサーバーハードウェアのコスト"
      },
      {
        "vi": "Chi phí bảo trì kịch bản kiểm thử tự động khi ứng dụng thay đổi",
        "en": "The ongoing maintenance cost of automated test scripts as the application evolves",
        "ja": "アプリケーションの変更に伴う自動テストスクリプトの継続的な保守コスト"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chi phí bảo trì (cập nhật kịch bản khi UI/logic thay đổi, xử lý test không ổn định) thường bị bỏ qua khi lập kế hoạch ban đầu nhưng lại là chi phí vận hành lớn nhất và lặp lại theo thời gian, làm giảm ROI thực tế.",
      "en": "Maintenance cost (updating scripts for UI/logic changes, handling flaky tests) is frequently overlooked in initial planning but becomes the largest, recurring operational cost over time, eroding actual ROI.",
      "ja": "保守コスト(UIやロジックの変更に伴うスクリプト更新、不安定なテストへの対応)は初期計画で見落とされがちだが、時間とともに最大かつ継続的な運用コストとなり、実際のROIを低下させる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Định luật Boehm về chi phí sửa lỗi cho biết chi phí khắc phục một khiếm khuyết tăng theo cấp số nhân qua các giai đoạn phát triển. Ý nghĩa thực tiễn quan trọng nhất của quy luật này đối với việc lập ngân sách kiểm thử là gì?",
      "en": "Boehm's defect cost escalation curve shows that the cost of fixing a defect grows exponentially across development phases. What is the most important practical implication of this for test budget planning?",
      "ja": "Boehmの欠陥コスト上昇曲線は、開発フェーズが進むにつれて欠陥修正コストが指数関数的に増加することを示している。この法則がテスト予算計画にとって最も重要な実践的意味は何か。"
    },
    "options": [
      {
        "vi": "Nên đầu tư sớm vào kiểm thử/review trong giai đoạn yêu cầu và thiết kế để giảm chi phí tổng thể",
        "en": "Investment should shift earlier into requirements and design-phase testing/reviews to reduce overall cost",
        "ja": "要件・設計段階でのテスト/レビューへの投資を早期に行い、全体コストを削減すべきである"
      },
      {
        "vi": "Nên tập trung toàn bộ ngân sách vào kiểm thử chấp nhận trước khi phát hành",
        "en": "The entire budget should be concentrated on acceptance testing right before release",
        "ja": "予算全体をリリース直前の受け入れテストに集中させるべきである"
      },
      {
        "vi": "Nên cắt giảm kiểm thử đơn vị vì chi phí thấp không đáng đầu tư nhiều",
        "en": "Unit testing should be reduced since its low cost makes it not worth heavy investment",
        "ja": "単体テストは低コストであるため、多くの投資をする価値はなく削減すべきである"
      },
      {
        "vi": "Chi phí sửa lỗi là như nhau ở mọi giai đoạn nên không cần ưu tiên thời điểm kiểm thử",
        "en": "Fix costs are the same across all phases, so testing timing does not need to be prioritized",
        "ja": "修正コストはどの段階でも同じであるため、テストのタイミングを優先する必要はない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Vì chi phí sửa lỗi tăng mạnh khi phát hiện muộn, chiến lược tối ưu chi phí là dịch chuyển kiểm thử sang trái (shift-left), đầu tư sớm vào review yêu cầu/thiết kế và kiểm thử đơn vị để phát hiện lỗi khi chi phí sửa còn thấp.",
      "en": "Because fix costs escalate sharply with late detection, the cost-optimal strategy is to shift testing left, investing early in requirement/design reviews and unit testing to catch defects while fix costs remain low.",
      "ja": "欠陥の発見が遅れるほど修正コストが急激に増加するため、コスト最適化の戦略はテストを左方向にシフトさせ、要件・設計レビューや単体テストに早期投資して修正コストが低いうちに欠陥を検出することである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong phân tích lợi ích của tự động hoá kiểm thử, lợi ích nào sau đây được coi là lợi ích VÔ HÌNH (intangible), khó quy đổi trực tiếp thành số tiền tiết kiệm?",
      "en": "In analyzing the benefits of test automation, which of the following is considered an intangible benefit that is difficult to directly convert into monetary savings?",
      "ja": "テスト自動化の効果を分析する際、以下のうち金銭的節約に直接換算しにくい無形の効果とされるものはどれか。"
    },
    "options": [
      {
        "vi": "Số giờ nhân công tiết kiệm được mỗi chu kỳ hồi quy",
        "en": "The number of labor-hours saved per regression cycle",
        "ja": "回帰サイクルごとに節約される人時数"
      },
      {
        "vi": "Tinh thần và sự hài lòng của kiểm thử viên khi giảm công việc lặp lại nhàm chán",
        "en": "Tester morale and job satisfaction from reduced repetitive, tedious manual work",
        "ja": "退屈な反復作業の削減によるテスターの士気と満足度の向上"
      },
      {
        "vi": "Chi phí bản quyền công cụ hàng năm",
        "en": "Annual tool licensing cost",
        "ja": "年間ツールライセンス費用"
      },
      {
        "vi": "Số lượng test case thực thi thêm được trong cùng thời gian",
        "en": "The number of additional test cases executable in the same timeframe",
        "ja": "同じ時間内で追加実行できるテストケース数"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Tinh thần nhân viên là lợi ích định tính, ảnh hưởng gián tiếp đến năng suất và tỷ lệ nghỉ việc nhưng không thể quy đổi trực tiếp thành con số tiền tệ như các lợi ích định lượng khác.",
      "en": "Employee morale is a qualitative benefit that indirectly affects productivity and turnover but cannot be directly converted into a monetary figure like the other quantifiable benefits.",
      "ja": "従業員の士気は定性的な効果であり、生産性や離職率に間接的に影響するが、他の定量的な効果のように金額へ直接換算することはできない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một quản lý kiểm thử muốn thuyết phục ban lãnh đạo phê duyệt ngân sách cho tự động hoá bằng cách trình bày Net Present Value (NPV) của dự án qua 3 năm. Việc sử dụng NPV thay vì chỉ so sánh tổng chi phí và tổng lợi ích có ưu điểm chính nào?",
      "en": "A test manager wants to convince leadership to approve an automation budget by presenting the Net Present Value (NPV) of the project over 3 years. What is the main advantage of using NPV instead of simply comparing total cost and total benefit?",
      "ja": "テストマネージャーは、3年間にわたるプロジェクトの正味現在価値(NPV)を提示することで、経営陣に自動化予算の承認を説得しようとしている。総コストと総便益を単純比較するのではなくNPVを使う主な利点は何か。"
    },
    "options": [
      {
        "vi": "NPV luôn cho kết quả dương với mọi dự án tự động hoá",
        "en": "NPV always yields a positive result for any automation project",
        "ja": "NPVはどの自動化プロジェクトでも常にプラスの結果を示す"
      },
      {
        "vi": "NPV loại bỏ hoàn toàn nhu cầu ước lượng chi phí bảo trì",
        "en": "NPV completely eliminates the need to estimate maintenance costs",
        "ja": "NPVは保守コストの見積もりを完全に不要にする"
      },
      {
        "vi": "NPV tính đến giá trị thời gian của tiền tệ, phản ánh chính xác hơn giá trị thực của dòng tiền tương lai",
        "en": "NPV accounts for the time value of money, more accurately reflecting the real value of future cash flows",
        "ja": "NPVは貨幣の時間的価値を考慮するため、将来のキャッシュフローの実質的価値をより正確に反映する"
      },
      {
        "vi": "NPV không cần dữ liệu lịch sử về chi phí kiểm thử thủ công",
        "en": "NPV requires no historical data on manual testing costs",
        "ja": "NPVは手動テストコストの過去データを必要としない"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "NPV chiết khấu các dòng tiền tương lai về giá trị hiện tại, giúp so sánh công bằng giữa khoản đầu tư ban đầu và lợi ích thu được trong tương lai — điều mà phép so sánh tổng đơn thuần không thể hiện được.",
      "en": "NPV discounts future cash flows to present value, enabling a fair comparison between upfront investment and future benefits — something a simple total comparison cannot capture.",
      "ja": "NPVは将来のキャッシュフローを現在価値に割り引くため、初期投資と将来得られる便益とを公平に比較できる。これは単純な合計比較では表現できない点である。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi lựa chọn test case nào nên tự động hoá dựa trên tiêu chí chi phí-lợi ích, đặc điểm nào của một test case khiến nó trở thành ứng viên KÉM phù hợp cho tự động hoá?",
      "en": "When selecting which test cases to automate based on cost-benefit criteria, which characteristic makes a test case a POOR candidate for automation?",
      "ja": "費用対効果の基準に基づいて自動化すべきテストケースを選定する際、あるテストケースを自動化の候補として不適切にする特徴はどれか。"
    },
    "options": [
      {
        "vi": "Test case kiểm tra chức năng cốt lõi có nguy cơ hồi quy cao",
        "en": "A test case verifying core functionality with high regression risk",
        "ja": "回帰リスクが高いコア機能を検証するテストケース"
      },
      {
        "vi": "Test case được thực thi lặp lại ở mọi bản phát hành",
        "en": "A test case executed repeatedly in every release",
        "ja": "すべてのリリースで繰り返し実行されるテストケース"
      },
      {
        "vi": "Test case có bước thực hiện ổn định, dữ liệu đầu vào rõ ràng",
        "en": "A test case with stable steps and clear input data",
        "ja": "手順が安定しており、入力データが明確なテストケース"
      },
      {
        "vi": "Test case chỉ chạy một lần duy nhất cho một tính năng sắp bị loại bỏ",
        "en": "A test case that runs only once for a feature about to be deprecated",
        "ja": "廃止予定の機能に対して一度だけ実行されるテストケース"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Chi phí xây dựng và bảo trì script tự động chỉ hợp lý khi test case được tái sử dụng nhiều lần; test chạy một lần cho tính năng sắp bị loại bỏ không thể thu hồi vốn đầu tư nên không đáng tự động hoá.",
      "en": "The cost of building and maintaining an automated script is only justified when the test is reused many times; a one-off test for a soon-to-be-deprecated feature cannot recoup that investment, making automation not worthwhile.",
      "ja": "自動スクリプトの構築・保守コストは、そのテストが何度も再利用される場合にのみ正当化される。廃止予定機能に対する一度限りのテストは投資を回収できないため、自動化する価値がない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức phát hiện chi phí sửa lỗi tại môi trường production cao gấp 30 lần so với phát hiện tại giai đoạn kiểm thử đơn vị. Số liệu này thường được dùng trong phân tích chi phí-lợi ích để biện minh cho điều gì?",
      "en": "An organization finds that the cost of fixing a defect in production is 30 times higher than fixing it during unit testing. This figure is typically used in cost-benefit analysis to justify what?",
      "ja": "ある組織は、本番環境での欠陥修正コストが単体テスト段階での修正コストの30倍であることを発見した。この数値は費用対効果分析において通常何を正当化するために使われるか。"
    },
    "options": [
      {
        "vi": "Đầu tư vào phát hiện lỗi sớm và kiểm thử liên tục trong vòng đời phát triển",
        "en": "Investment in early defect detection and continuous testing throughout the development lifecycle",
        "ja": "開発ライフサイクル全体を通じた早期欠陥検出と継続的テストへの投資"
      },
      {
        "vi": "Cắt giảm hoàn toàn kiểm thử production để tiết kiệm chi phí",
        "en": "Completely eliminating production testing to save costs",
        "ja": "コスト削減のために本番環境でのテストを完全に排除すること"
      },
      {
        "vi": "Chuyển toàn bộ ngân sách kiểm thử sang giai đoạn kiểm thử chấp nhận",
        "en": "Shifting the entire test budget into the acceptance testing phase",
        "ja": "テスト予算全体を受け入れテスト段階に移すこと"
      },
      {
        "vi": "Loại bỏ kiểm thử đơn vị vì chi phí sửa lỗi ở đó là thấp nhất",
        "en": "Eliminating unit testing since its fix cost is already the lowest",
        "ja": "修正コストが最も低いため単体テストを廃止すること"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Số liệu chênh lệch chi phí lớn theo giai đoạn phát hiện lỗi là bằng chứng kinh tế mạnh mẽ để thuyết phục lãnh đạo đầu tư vào các hoạt động phát hiện sớm (review, kiểm thử đơn vị, tích hợp liên tục) nhằm tránh chi phí khổng lồ khi lỗi lọt ra production.",
      "en": "The large cost differential by detection phase serves as strong economic evidence to persuade leadership to invest in early detection activities (reviews, unit testing, continuous integration) to avoid the enormous cost of defects escaping to production.",
      "ja": "発見段階による大きなコスト差は、早期検出活動(レビュー、単体テスト、継続的インテグレーション)への投資を経営陣に納得させるための強力な経済的根拠となり、本番環境への欠陥流出による莫大なコストを回避する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong bối cảnh CTEL, khái niệm \"cost avoidance\" (tránh chi phí) khác với \"cost reduction\" (giảm chi phí) như thế nào khi đánh giá giá trị của một chiến lược kiểm thử dựa trên rủi ro?",
      "en": "In a CTEL context, how does the concept of \"cost avoidance\" differ from \"cost reduction\" when evaluating the value of a risk-based test strategy?",
      "ja": "CTELの文脈において、リスクベースのテスト戦略の価値を評価する際、「コスト回避」の概念は「コスト削減」とどう異なるか。"
    },
    "options": [
      {
        "vi": "Hai khái niệm này hoàn toàn đồng nghĩa và có thể dùng thay thế nhau trong mọi báo cáo",
        "en": "The two concepts are entirely synonymous and interchangeable in any report",
        "ja": "この2つの概念は完全に同義であり、あらゆる報告書で置き換え可能である"
      },
      {
        "vi": "Cost avoidance ngăn chặn chi phí tiềm ẩn trong tương lai chưa từng phát sinh, còn cost reduction cắt giảm chi phí hiện đang tồn tại",
        "en": "Cost avoidance prevents a potential future cost that has never yet occurred, while cost reduction cuts an existing, currently incurred cost",
        "ja": "コスト回避は将来発生し得る潜在的コストを未然に防ぐことであり、コスト削減は現在発生している既存コストを削減することである"
      },
      {
        "vi": "Cost avoidance chỉ áp dụng cho chi phí nhân sự, cost reduction chỉ áp dụng cho chi phí công cụ",
        "en": "Cost avoidance applies only to personnel costs, while cost reduction applies only to tool costs",
        "ja": "コスト回避は人件費にのみ適用され、コスト削減はツールコストにのみ適用される"
      },
      {
        "vi": "Cost reduction luôn có giá trị lớn hơn cost avoidance trong mọi trường hợp",
        "en": "Cost reduction always has greater value than cost avoidance in every case",
        "ja": "コスト削減はあらゆる場合においてコスト回避より常に価値が高い"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Cost avoidance liên quan đến việc ngăn ngừa một chi phí giả định trong tương lai (ví dụ tránh sự cố production nhờ phát hiện sớm rủi ro cao), trong khi cost reduction là cắt giảm một khoản chi đang thực sự tồn tại — cả hai đều là giá trị hợp lệ nhưng khó chứng minh và đo lường khác nhau.",
      "en": "Cost avoidance concerns preventing a hypothetical future cost (e.g., avoiding a production incident by detecting high-risk areas early), whereas cost reduction cuts an expense that is actually currently being incurred — both are valid value types but differ in how difficult they are to prove and measure.",
      "ja": "コスト回避は将来発生しうる仮定的コスト(例:高リスク領域を早期検出して本番障害を防ぐ)を防ぐことに関わるのに対し、コスト削減は実際に現在発生している支出を削減することである。両者とも有効な価値だが、証明・測定の難しさが異なる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi so sánh phương án thuê ngoài (outsourcing) toàn bộ kiểm thử với duy trì đội ngũ nội bộ, phân tích chi phí-lợi ích nên bao gồm chi phí ẩn nào mà nhiều tổ chức thường bỏ sót?",
      "en": "When comparing fully outsourcing testing versus maintaining an in-house team, the cost-benefit analysis should include which hidden cost that many organizations often overlook?",
      "ja": "テストを完全に外部委託する場合と社内チームを維持する場合を比較する際、多くの組織が見落としがちな、費用対効果分析に含めるべき隠れコストは何か。"
    },
    "options": [
      {
        "vi": "Chi phí in ấn báo cáo kiểm thử hàng tuần",
        "en": "The cost of printing weekly test reports",
        "ja": "週次テストレポートの印刷費用"
      },
      {
        "vi": "Chi phí mua giấy phép hệ điều hành cho máy chủ CI",
        "en": "The cost of purchasing operating system licenses for the CI server",
        "ja": "CIサーバー用オペレーティングシステムのライセンス購入費用"
      },
      {
        "vi": "Chi phí giao tiếp, chuyển giao kiến thức và quản lý nhà cung cấp",
        "en": "Communication overhead, knowledge transfer, and vendor management costs",
        "ja": "コミュニケーションのオーバーヘッド、知識移転、ベンダー管理コスト"
      },
      {
        "vi": "Chi phí điện năng tiêu thụ của máy tính kiểm thử viên",
        "en": "The electricity consumption cost of testers' computers",
        "ja": "テスターのコンピューターの電力消費コスト"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Khi thuê ngoài, các chi phí gián tiếp như thời gian giao tiếp qua múi giờ khác nhau, chuyển giao kiến thức nghiệp vụ và công sức quản lý hợp đồng/nhà cung cấp thường bị đánh giá thấp nhưng ảnh hưởng đáng kể đến tổng chi phí thực tế (TCO).",
      "en": "When outsourcing, indirect costs such as cross-timezone communication overhead, domain knowledge transfer, and contract/vendor management effort are frequently underestimated yet significantly affect the true total cost of ownership (TCO).",
      "ja": "外部委託の場合、タイムゾーンをまたぐコミュニケーションのオーバーヘッド、業務知識の移転、契約・ベンダー管理の労力といった間接コストは過小評価されがちだが、実際の総所有コスト(TCO)に大きく影響する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một đội ngũ kiểm thử tự động hoá báo cáo rằng số lượng test case tự động tăng liên tục nhưng thời gian phản hồi lỗi (feedback time) trong pipeline CI ngày càng chậm hơn. Từ góc độ chi phí-lợi ích, đây là dấu hiệu của vấn đề gì?",
      "en": "An automation team reports that the number of automated test cases keeps increasing, but feedback time in the CI pipeline keeps getting slower. From a cost-benefit perspective, what problem does this signal?",
      "ja": "ある自動化チームは、自動テストケース数は増え続けているものの、CIパイプラインのフィードバック時間はますます遅くなっていると報告している。費用対効果の観点から、これは何の問題の兆候か。"
    },
    "options": [
      {
        "vi": "Đây là dấu hiệu tích cực cho thấy ROI tự động hoá đang tối đa",
        "en": "This is a positive sign that automation ROI is being maximized",
        "ja": "これは自動化ROIが最大化されている良い兆候である"
      },
      {
        "vi": "Đội ngũ đang đầu tư quá nhiều vào kiểm thử thăm dò (exploratory testing)",
        "en": "The team is investing too heavily in exploratory testing",
        "ja": "チームが探索的テストに過度に投資している"
      },
      {
        "vi": "Chi phí bản quyền công cụ CI đang tăng theo cấp số nhân",
        "en": "The CI tool's licensing cost is increasing exponentially",
        "ja": "CIツールのライセンス費用が指数関数的に増加している"
      },
      {
        "vi": "Bộ test tự động không được tối ưu (song song hoá, loại bỏ trùng lặp), làm tăng chi phí cơ hội do phản hồi chậm",
        "en": "The automated suite is not optimized (parallelization, deduplication), increasing opportunity cost from slower feedback",
        "ja": "自動テストスイートが最適化(並列化、重複排除)されておらず、フィードバック遅延による機会費用が増大している"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Khi bộ test tự động phình to nhưng không được tối ưu hoá (chạy tuần tự, có test trùng lặp/không cần thiết), thời gian phản hồi cho lập trình viên chậm lại làm tăng chi phí cơ hội — lợi ích tốc độ vốn là giá trị cốt lõi của tự động hoá bị suy giảm, kéo ROI thực tế xuống thấp.",
      "en": "When an automated suite grows without optimization (sequential execution, redundant/unnecessary tests), developer feedback time slows, increasing opportunity cost — the speed benefit that is a core value proposition of automation erodes, dragging down actual ROI.",
      "ja": "自動テストスイートが最適化(並列化なし、重複・不要なテストの存在)されないまま肥大化すると、開発者へのフィードバック時間が遅くなり機会費用が増加する。自動化の中核的価値であるスピードのメリットが損なわれ、実際のROIを押し下げる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong xây dựng business case cho đầu tư công cụ kiểm thử mới, mô hình Total Cost of Ownership (TCO) khác biệt với chi phí mua ban đầu (purchase price) như thế nào?",
      "en": "When building a business case for a new test tool investment, how does the Total Cost of Ownership (TCO) model differ from the initial purchase price?",
      "ja": "新しいテストツール投資のビジネスケースを構築する際、総所有コスト(TCO)モデルは初期購入価格とどう異なるか。"
    },
    "options": [
      {
        "vi": "TCO bao gồm cả chi phí triển khai, đào tạo, bảo trì, hỗ trợ và ngừng sử dụng trong suốt vòng đời công cụ",
        "en": "TCO includes deployment, training, maintenance, support, and retirement costs across the tool's entire lifecycle",
        "ja": "TCOはツールのライフサイクル全体にわたる導入、トレーニング、保守、サポート、廃止コストを含む"
      },
      {
        "vi": "TCO chỉ tính chi phí bản quyền hàng năm, không tính chi phí đào tạo",
        "en": "TCO only accounts for annual licensing fees, excluding training costs",
        "ja": "TCOは年間ライセンス費用のみを計算し、トレーニングコストは含まない"
      },
      {
        "vi": "TCO và giá mua ban đầu luôn bằng nhau đối với công cụ mã nguồn mở",
        "en": "TCO and initial purchase price are always equal for open-source tools",
        "ja": "TCOと初期購入価格はオープンソースツールでは常に等しい"
      },
      {
        "vi": "TCO chỉ áp dụng cho công cụ thương mại, không áp dụng cho công cụ nội bộ tự phát triển",
        "en": "TCO applies only to commercial tools, not to internally developed tools",
        "ja": "TCOは商用ツールにのみ適用され、社内開発ツールには適用されない"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "TCO nhìn xa hơn giá mua ban đầu, tính toàn bộ chi phí trong suốt vòng đời sử dụng — kể cả với công cụ mã nguồn mở \"miễn phí\" vẫn phát sinh chi phí triển khai, tuỳ biến, đào tạo và hỗ trợ đáng kể.",
      "en": "TCO looks beyond the sticker price to capture all lifecycle costs — even a \"free\" open-source tool incurs significant deployment, customization, training, and support costs.",
      "ja": "TCOは初期購入価格を超えて、ライフサイクル全体のすべてのコストを捉える。「無料」のオープンソースツールであっても、導入、カスタマイズ、トレーニング、サポートに相当なコストが発生する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một chuyên gia CTEL đang xây dựng mô hình ROI cho tự động hoá và cần chọn công thức cơ bản để trình bày cho ban giám đốc tài chính. Công thức nào phản ánh đúng bản chất ROI trong ngữ cảnh này?",
      "en": "A CTEL expert is building an ROI model for automation and needs a basic formula to present to the finance board. Which formula correctly captures ROI in this context?",
      "ja": "CTELの専門家が自動化のROIモデルを構築し、財務担当役員に説明する基本公式を選ぶ必要がある。この文脈でROIの本質を正しく表す公式はどれか。"
    },
    "options": [
      {
        "vi": "Tổng số test case tự động / Tổng số test case thủ công",
        "en": "Total automated test cases / Total manual test cases",
        "ja": "自動テストケース総数 / 手動テストケース総数"
      },
      {
        "vi": "(Lợi ích tích luỹ − Chi phí đầu tư) / Chi phí đầu tư",
        "en": "(Cumulative benefit − Investment cost) / Investment cost",
        "ja": "(累積便益 − 投資コスト) / 投資コスト"
      },
      {
        "vi": "Thời gian thực thi thủ công − Thời gian thực thi tự động",
        "en": "Manual execution time − Automated execution time",
        "ja": "手動実行時間 − 自動実行時間"
      },
      {
        "vi": "Số lỗi tìm được bằng tự động hoá / Tổng số lỗi trong hệ thống",
        "en": "Defects found by automation / Total defects in the system",
        "ja": "自動化で発見された欠陥数 / システム内の総欠陥数"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "ROI theo định nghĩa tài chính chuẩn là tỷ lệ giữa lợi ích ròng (lợi ích trừ chi phí) trên chi phí đầu tư, biểu diễn dưới dạng phần trăm; các lựa chọn khác chỉ là các chỉ số hiệu năng bổ trợ, không phải ROI đúng nghĩa.",
      "en": "ROI, per standard financial definition, is the ratio of net benefit (benefit minus cost) to investment cost, expressed as a percentage; the other options are merely supporting performance metrics, not true ROI.",
      "ja": "標準的な財務定義におけるROIは、純利益(便益からコストを引いたもの)を投資コストで割った比率(パーセンテージ表示)である。他の選択肢は補助的なパフォーマンス指標に過ぎず、真のROIではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong phân tích chi phí-lợi ích để lựa chọn công cụ tự động hoá open-source thay vì thương mại, rủi ro chi phí ẩn nào cần được đánh giá kỹ nhất?",
      "en": "In a cost-benefit analysis choosing an open-source automation tool over a commercial one, which hidden cost risk needs the most careful evaluation?",
      "ja": "商用ツールではなくオープンソースの自動化ツールを選択する費用対効果分析において、最も慎重に評価すべき隠れコストリスクは何か。"
    },
    "options": [
      {
        "vi": "Chi phí gia hạn hợp đồng SLA với nhà cung cấp",
        "en": "The cost of renewing an SLA contract with the vendor",
        "ja": "ベンダーとのSLA契約更新費用"
      },
      {
        "vi": "Chi phí bản quyền hàng năm cố định",
        "en": "A fixed annual licensing fee",
        "ja": "固定の年間ライセンス費用"
      },
      {
        "vi": "Chi phí nội bộ để tự hỗ trợ, khắc phục sự cố và duy trì khi thiếu hỗ trợ nhà cung cấp chính thức",
        "en": "The internal cost of self-support, troubleshooting, and maintenance in the absence of official vendor support",
        "ja": "公式なベンダーサポートがない場合の、自己サポート、トラブルシューティング、保守にかかる社内コスト"
      },
      {
        "vi": "Chi phí kiểm toán bản quyền phần mềm định kỳ",
        "en": "The cost of periodic software license audits",
        "ja": "定期的なソフトウェアライセンス監査費用"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Công cụ open-source không tốn phí bản quyền nhưng thiếu hỗ trợ chính thức từ nhà cung cấp, buộc tổ chức phải gánh chi phí nội bộ đáng kể để tự giải quyết sự cố, tuỳ biến và bảo trì — đây là rủi ro chi phí ẩn dễ bị bỏ sót nhất.",
      "en": "Open-source tools avoid licensing fees but lack official vendor support, forcing the organization to bear significant internal costs for troubleshooting, customization, and maintenance — this is the most easily overlooked hidden cost risk.",
      "ja": "オープンソースツールはライセンス費用がかからないが、公式なベンダーサポートがないため、組織はトラブルシューティング、カスタマイズ、保守に大きな社内コストを負担せざるを得ない。これが最も見落とされやすい隠れコストリスクである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Xét câu sau: \"ROI của tự động hoá kiểm thử luôn dương ngay từ chu kỳ phát hành đầu tiên vì công cụ tự động hoá thay thế hoàn toàn kiểm thử viên thủ công.\" Nhận định này ĐÚNG hay SAI, và vì sao?",
      "en": "Consider the statement: \"Test automation ROI is always positive from the very first release cycle because automation tools completely replace manual testers.\" Is this statement TRUE or FALSE, and why?",
      "ja": "次の主張を検討せよ。「テスト自動化のROIは、自動化ツールが手動テスターを完全に置き換えるため、最初のリリースサイクルから常にプラスになる。」この主張は正しいか、誤りか、その理由は何か。"
    },
    "options": [
      {
        "vi": "Sai, vì tự động hoá không bao giờ mang lại lợi ích tài chính trong bất kỳ trường hợp nào",
        "en": "False, because automation never yields any financial benefit under any circumstances",
        "ja": "誤り。自動化はいかなる状況でも金銭的便益をもたらすことは決してない"
      },
      {
        "vi": "Đúng, vì mọi công cụ tự động hoá đều có ROI dương ngay lập tức theo định nghĩa",
        "en": "True, because by definition every automation tool yields immediate positive ROI",
        "ja": "正しい。定義上、あらゆる自動化ツールは即座にプラスのROIを生む"
      },
      {
        "vi": "Đúng, vì tự động hoá luôn loại bỏ hoàn toàn nhu cầu kiểm thử thủ công ngay khi triển khai",
        "en": "True, because automation always fully eliminates the need for manual testing immediately upon deployment",
        "ja": "正しい。自動化は導入と同時に手動テストの必要性を完全に排除する"
      },
      {
        "vi": "Sai, vì chi phí đầu tư ban đầu (kịch bản, hạ tầng, đào tạo) thường vượt lợi ích trong các chu kỳ đầu; ROI dương thường đạt được sau nhiều chu kỳ tái sử dụng",
        "en": "False, because upfront investment (scripting, infrastructure, training) typically exceeds benefits in early cycles; positive ROI is usually achieved only after multiple reuse cycles",
        "ja": "誤り。初期投資(スクリプト作成、インフラ、トレーニング)は初期サイクルでは便益を上回ることが多く、プラスのROIは通常、複数回の再利用サイクルを経て達成される"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thực tế, tự động hoá đòi hỏi đầu tư ban đầu lớn (viết kịch bản, xây hạ tầng CI, đào tạo) nên các chu kỳ đầu thường có ROI âm hoặc thấp; giá trị tích luỹ dần khi kịch bản được tái sử dụng nhiều lần qua các bản phát hành, và tự động hoá cũng không thay thế hoàn toàn kiểm thử thủ công (ví dụ kiểm thử thăm dò).",
      "en": "In reality, automation requires substantial upfront investment (scripting, CI infrastructure, training), so early cycles often show negative or low ROI; value accrues over time as scripts are reused across multiple releases, and automation never fully replaces manual testing (e.g., exploratory testing).",
      "ja": "実際には、自動化には多大な初期投資(スクリプト作成、CIインフラ、トレーニング)が必要であり、初期サイクルではROIがマイナスまたは低いことが多い。価値はスクリプトが複数のリリースで再利用されるにつれて徐々に蓄積される。また自動化が手動テスト(探索的テストなど)を完全に置き換えることもない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi trình bày phân tích chi phí-lợi ích của một chiến lược kiểm thử dựa trên rủi ro cho ban giám đốc không chuyên kỹ thuật, cách tiếp cận hiệu quả nhất để liên kết chi phí kiểm thử với giá trị kinh doanh là gì?",
      "en": "When presenting the cost-benefit analysis of a risk-based test strategy to a non-technical executive board, what is the most effective approach for linking test cost to business value?",
      "ja": "リスクベースのテスト戦略の費用対効果分析を、技術的知識のない経営陣に説明する際、テストコストをビジネス価値に結び付ける最も効果的なアプローチは何か。"
    },
    "options": [
      {
        "vi": "Quy đổi rủi ro kỹ thuật thành tác động tài chính/kinh doanh tiềm tàng (ví dụ doanh thu mất, chi phí pháp lý) mà kiểm thử giúp giảm thiểu",
        "en": "Translate technical risks into potential financial/business impact (e.g., lost revenue, legal cost) that testing helps mitigate",
        "ja": "技術的リスクを、テストが軽減に役立つ潜在的な財務・ビジネスへの影響(例:収益損失、法的コスト)に変換する"
      },
      {
        "vi": "Trình bày chi tiết số lượng test case theo từng module kỹ thuật",
        "en": "Present a detailed breakdown of test case counts by technical module",
        "ja": "技術モジュールごとの詳細なテストケース数を提示する"
      },
      {
        "vi": "Liệt kê toàn bộ log lỗi kỹ thuật thu thập được trong sprint gần nhất",
        "en": "List all technical error logs collected in the most recent sprint",
        "ja": "直近のスプリントで収集されたすべての技術エラーログを列挙する"
      },
      {
        "vi": "Trình bày cấu trúc mã nguồn và độ phức tạp cyclomatic của hệ thống",
        "en": "Present the codebase structure and cyclomatic complexity of the system",
        "ja": "システムのコード構造とサイクロマティック複雑度を提示する"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Ban giám đốc không chuyên kỹ thuật ra quyết định dựa trên giá trị kinh doanh; do đó cách hiệu quả nhất là dịch rủi ro kỹ thuật (lỗi tiềm ẩn) sang ngôn ngữ tài chính/kinh doanh mà kiểm thử giúp phòng tránh, giúp họ thấy rõ mối liên hệ giữa chi phí kiểm thử và giá trị bảo vệ được.",
      "en": "Non-technical executives make decisions based on business value; therefore the most effective approach is to translate technical risk (potential defects) into financial/business terms that testing helps avoid, making the link between test cost and protected value clear.",
      "ja": "技術的知識のない経営陣はビジネス価値に基づいて意思決定を行う。そのため最も効果的なアプローチは、技術的リスク(潜在的欠陥)をテストが回避に役立つ財務・ビジネス用語に変換し、テストコストと保護される価値との関連を明確にすることである。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức tính ROI tự động hoá chỉ dựa trên số giờ nhân công tiết kiệm được, bỏ qua các yếu tố chất lượng như tăng độ phủ kiểm thử hoặc phát hiện lỗi sớm hơn. Hạn chế lớn nhất của cách tiếp cận này là gì?",
      "en": "An organization calculates automation ROI based solely on labor-hours saved, ignoring quality factors such as increased test coverage or earlier defect detection. What is the biggest limitation of this approach?",
      "ja": "ある組織が、テストカバレッジの向上や欠陥の早期発見といった品質要因を無視し、節約された人時数のみに基づいて自動化ROIを計算している。このアプローチの最大の限界は何か。"
    },
    "options": [
      {
        "vi": "ROI bị đánh giá quá cao vì chi phí nhân công luôn bị tính trùng lặp",
        "en": "ROI is overvalued because labor costs are always double-counted",
        "ja": "人件費が常に二重計上されるため、ROIは過大評価される"
      },
      {
        "vi": "ROI bị đánh giá thấp vì bỏ sót các lợi ích chất lượng có giá trị kinh doanh gián tiếp nhưng thực chất và đáng kể",
        "en": "ROI is undervalued because it omits quality benefits that carry indirect but substantial business value",
        "ja": "ROIは間接的ながら実質的で相当なビジネス価値を持つ品質面の便益を除外しているため、過小評価される"
      },
      {
        "vi": "Cách tính này hoàn toàn chính xác vì chi phí nhân công là yếu tố duy nhất liên quan đến ROI",
        "en": "This approach is entirely accurate since labor cost is the only factor relevant to ROI",
        "ja": "人件費のみがROIに関連する要因であるため、このアプローチは完全に正確である"
      },
      {
        "vi": "Cách tính này không liên quan đến kiểm thử nên không ảnh hưởng đến ROI thực tế",
        "en": "This approach is unrelated to testing and therefore does not affect actual ROI",
        "ja": "このアプローチはテストと無関係であるため、実際のROIには影響しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Chỉ tính chi phí nhân công bỏ qua các lợi ích quan trọng như giảm rủi ro sản xuất, phát hiện lỗi sớm và tăng độ phủ kiểm thử — những yếu tố này có giá trị kinh doanh thực sự (tránh chi phí lỗi production) nhưng khó quy đổi trực tiếp, dẫn đến ROI được báo cáo thấp hơn giá trị thực.",
      "en": "Counting only labor cost ignores critical benefits such as reduced production risk, earlier defect detection, and increased test coverage — factors with real business value (avoiding production failure costs) that are harder to quantify directly, causing reported ROI to understate true value.",
      "ja": "人件費のみを計算すると、本番リスクの低減、欠陥の早期発見、テストカバレッジの向上といった重要な便益を無視することになる。これらは(本番障害コストの回避という)実質的なビジネス価値を持つが直接数値化しにくいため、報告されるROIは実際の価値より低く見積もられる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong đánh giá chi phí-lợi ích, chi phí cơ hội (opportunity cost) của việc trì hoãn đầu tư vào tự động hoá kiểm thử được hiểu chính xác nhất là gì?",
      "en": "In cost-benefit evaluation, the opportunity cost of delaying investment in test automation is most accurately understood as what?",
      "ja": "費用対効果評価において、テスト自動化への投資を遅らせることの機会費用とは、最も正確にはどのように理解されるか。"
    },
    "options": [
      {
        "vi": "Số tiền hoàn lại nếu công cụ tự động hoá bị huỷ hợp đồng",
        "en": "The refund amount if the automation tool contract is cancelled",
        "ja": "自動化ツールの契約を解約した場合の返金額"
      },
      {
        "vi": "Tổng chi phí bản quyền công cụ tự động hoá đã trả trong quá khứ",
        "en": "The total automation tool licensing fees already paid in the past",
        "ja": "過去に支払われた自動化ツールのライセンス費用の総額"
      },
      {
        "vi": "Giá trị của các lợi ích (tốc độ, độ phủ, giảm rủi ro) mà tổ chức bỏ lỡ trong khoảng thời gian chưa triển khai tự động hoá",
        "en": "The value of benefits (speed, coverage, risk reduction) the organization forgoes during the period automation is not yet in place",
        "ja": "自動化が未導入の期間に組織が失う便益(速度、カバレッジ、リスク低減)の価値"
      },
      {
        "vi": "Chi phí khấu hao tài sản cố định của máy chủ kiểm thử",
        "en": "The depreciation cost of fixed assets for the test servers",
        "ja": "テストサーバーの固定資産減価償却費"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Chi phí cơ hội phản ánh giá trị bị mất đi do KHÔNG hành động — trong trường hợp này là các lợi ích mà tự động hoá lẽ ra mang lại (phản hồi nhanh hơn, độ phủ rộng hơn, giảm rủi ro lỗi lọt) trong thời gian tổ chức tiếp tục kiểm thử thủ công.",
      "en": "Opportunity cost reflects the value lost from NOT acting — in this case, the benefits automation would have delivered (faster feedback, broader coverage, reduced escape-defect risk) during the period the organization continues manual testing.",
      "ja": "機会費用は、行動しないことによって失われる価値を反映する。この場合、組織が手動テストを続けている間に自動化がもたらしたであろう便益(より速いフィードバック、より広いカバレッジ、欠陥流出リスクの低減)がそれに当たる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một đội ngũ đã đầu tư 2 năm và một khoản ngân sách lớn vào một framework tự động hoá nội bộ nhưng framework này ngày càng khó bảo trì và không còn phù hợp với công nghệ mới. Ban lãnh đạo vẫn tiếp tục cấp ngân sách chỉ vì \"đã đầu tư quá nhiều rồi\". Đây là biểu hiện của thiên kiến quyết định nào?",
      "en": "A team invested two years and a large budget into an in-house automation framework, but it has become increasingly hard to maintain and no longer fits new technologies. Leadership keeps funding it only because \"we've already invested so much.\" What decision bias does this represent?",
      "ja": "あるチームは社内自動化フレームワークに2年と多額の予算を投じたが、そのフレームワークは保守が年々困難になり、新技術にも適合しなくなっている。それでも経営陣は「すでに多くを投資したから」という理由だけで予算を出し続けている。これはどの意思決定バイアスを表しているか。"
    },
    "options": [
      {
        "vi": "Hiệu ứng bầy đàn (bandwagon effect)",
        "en": "Bandwagon effect",
        "ja": "バンドワゴン効果"
      },
      {
        "vi": "Hiệu ứng mỏ neo (anchoring bias)",
        "en": "Anchoring bias",
        "ja": "アンカリングバイアス"
      },
      {
        "vi": "Thiên kiến xác nhận (confirmation bias)",
        "en": "Confirmation bias",
        "ja": "確証バイアス"
      },
      {
        "vi": "Nguỵ biện chi phí chìm (sunk cost fallacy)",
        "en": "Sunk cost fallacy",
        "ja": "サンクコストの誤謬"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Nguỵ biện chi phí chìm xảy ra khi tổ chức tiếp tục đầu tư vào một dự án vì đã bỏ ra chi phí trước đó, thay vì đánh giá khách quan giá trị tương lai — chi phí đã chi không nên ảnh hưởng đến quyết định đầu tư tiếp theo, vốn cần dựa trên lợi ích/chi phí kỳ vọng trong tương lai.",
      "en": "Sunk cost fallacy occurs when an organization continues investing in a project because of past spending rather than objectively evaluating future value — money already spent should not influence forward-looking investment decisions, which should be based on expected future benefit/cost.",
      "ja": "サンクコストの誤謬とは、組織が将来価値を客観的に評価するのではなく、過去の支出を理由にプロジェクトへの投資を続けてしまうことを指す。すでに支出した資金は、将来の期待便益・コストに基づくべき今後の投資判断に影響を与えるべきではない。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong một dự án so sánh chi phí giữa kiểm thử thăm dò (exploratory testing) và kiểm thử theo kịch bản (scripted testing) cho một tính năng có yêu cầu thay đổi liên tục, yếu tố chi phí nào thường khiến kiểm thử theo kịch bản trở nên kém hiệu quả về kinh tế?",
      "en": "When comparing costs between exploratory testing and scripted testing for a feature with continuously changing requirements, which cost factor typically makes scripted testing economically less efficient?",
      "ja": "要件が絶えず変化する機能について探索的テストとスクリプトテストのコストを比較する場合、通常スクリプトテストの経済効率を悪化させるコスト要因は何か。"
    },
    "options": [
      {
        "vi": "Chi phí viết lại và cập nhật kịch bản test mỗi khi yêu cầu thay đổi",
        "en": "The cost of rewriting and updating test scripts every time requirements change",
        "ja": "要件が変わるたびにテストスクリプトを書き直し更新するコスト"
      },
      {
        "vi": "Chi phí đào tạo kiểm thử viên về tư duy phân tích rủi ro",
        "en": "The cost of training testers in risk-analysis thinking",
        "ja": "リスク分析の思考法についてテスターを教育するコスト"
      },
      {
        "vi": "Chi phí ghi chép biên bản phiên kiểm thử thăm dò",
        "en": "The cost of documenting exploratory testing session notes",
        "ja": "探索的テストセッションの記録を作成するコスト"
      },
      {
        "vi": "Chi phí cấp phép sử dụng bảng tính quản lý test case",
        "en": "The cost of licensing a spreadsheet for test case management",
        "ja": "テストケース管理用スプレッドシートのライセンス費用"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Với yêu cầu thay đổi liên tục, kịch bản test chi tiết phải được viết lại/bảo trì thường xuyên, làm tăng chi phí đáng kể; trong khi kiểm thử thăm dò linh hoạt thích ứng ngay lập tức với thay đổi mà không tốn chi phí duy trì tài liệu chi tiết.",
      "en": "With continuously changing requirements, detailed scripted tests must be frequently rewritten/maintained, substantially raising cost; whereas exploratory testing adapts flexibly and immediately to change without the overhead of maintaining detailed documentation.",
      "ja": "要件が絶えず変化する場合、詳細なスクリプトテストは頻繁に書き直し・保守する必要があり、コストが大幅に増加する。一方、探索的テストは詳細な文書保守の負担なく、変化に柔軟かつ即座に適応できる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi đo lường ROI của tự động hoá theo thời gian, biểu đồ đường cong chi phí-lợi ích tích luỹ thường cho thấy điều gì về mối quan hệ giữa số chu kỳ phát hành và giá trị tích luỹ?",
      "en": "When measuring automation ROI over time, the cumulative cost-benefit curve typically shows what relationship between the number of release cycles and accumulated value?",
      "ja": "時間の経過とともに自動化ROIを測定する際、累積費用対効果曲線は、リリースサイクル数と累積価値との間にどのような関係を示すことが多いか。"
    },
    "options": [
      {
        "vi": "Giá trị tích luỹ luôn là một đường thẳng không đổi bất kể số chu kỳ",
        "en": "Accumulated value is always a flat, unchanging line regardless of cycle count",
        "ja": "累積価値はサイクル数にかかわらず常に一定の直線である"
      },
      {
        "vi": "Giá trị tích luỹ âm ở các chu kỳ đầu do chi phí thiết lập, sau đó tăng dần và vượt điểm hoà vốn khi kịch bản được tái sử dụng nhiều lần",
        "en": "Accumulated value is negative in early cycles due to setup costs, then gradually rises and crosses break-even as scripts are reused across many cycles",
        "ja": "初期サイクルではセットアップコストのため累積価値はマイナスだが、スクリプトが多くのサイクルで再利用されるにつれて徐々に上昇し、損益分岐点を超える"
      },
      {
        "vi": "Giá trị tích luỹ giảm dần liên tục theo mỗi chu kỳ phát hành",
        "en": "Accumulated value continuously decreases with each subsequent release cycle",
        "ja": "累積価値はリリースサイクルごとに継続的に減少する"
      },
      {
        "vi": "Giá trị tích luỹ đạt cực đại ngay ở chu kỳ đầu tiên rồi không thay đổi",
        "en": "Accumulated value peaks immediately at the first cycle and never changes",
        "ja": "累積価値は最初のサイクルで即座に最大となり、その後変化しない"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Đường cong ROI tự động hoá điển hình có dạng chữ J: âm ở giai đoạn đầu do chi phí thiết lập lớn, sau đó dốc lên khi lợi ích tích luỹ vượt chi phí bảo trì qua nhiều chu kỳ tái sử dụng kịch bản.",
      "en": "A typical automation ROI curve resembles a J-shape: negative in the early phase due to high setup cost, then rising as accumulated benefit exceeds maintenance cost across many reuse cycles.",
      "ja": "典型的な自動化ROI曲線はJ字型を描く。初期段階ではセットアップコストが高いためマイナスとなり、その後スクリプトの再利用サイクルを重ねるにつれ累積便益が保守コストを上回り上昇する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức muốn thiết lập ngưỡng ROI tối thiểu (hurdle rate) trước khi phê duyệt bất kỳ dự án tự động hoá nào. Mục đích chính của việc thiết lập hurdle rate trong quản lý danh mục đầu tư kiểm thử là gì?",
      "en": "An organization wants to set a minimum ROI threshold (hurdle rate) before approving any automation project. What is the main purpose of setting a hurdle rate in test investment portfolio management?",
      "ja": "ある組織が、いかなる自動化プロジェクトも承認する前に最低ROIしきい値(ハードルレート)を設定したいと考えている。テスト投資ポートフォリオ管理においてハードルレートを設定する主な目的は何か。"
    },
    "options": [
      {
        "vi": "Loại bỏ hoàn toàn nhu cầu tính toán chi phí đầu tư ban đầu",
        "en": "Eliminate the need to calculate initial investment cost entirely",
        "ja": "初期投資コストの計算を完全に不要にする"
      },
      {
        "vi": "Đảm bảo tất cả dự án tự động hoá đều được phê duyệt bất kể ROI",
        "en": "Ensure all automation projects are approved regardless of ROI",
        "ja": "ROIにかかわらず、すべての自動化プロジェクトを承認する"
      },
      {
        "vi": "Lọc và ưu tiên các dự án có tiềm năng sinh lời đủ hấp dẫn so với chi phí vốn/rủi ro, tránh phân bổ nguồn lực cho dự án kém hiệu quả",
        "en": "Filter and prioritize projects with sufficiently attractive returns relative to cost of capital/risk, avoiding resource allocation to underperforming projects",
        "ja": "資本コスト・リスクに対して十分に魅力的なリターンを持つプロジェクトを選別・優先し、非効率なプロジェクトへの資源配分を避ける"
      },
      {
        "vi": "Quy định số lượng kiểm thử viên tối thiểu trong mỗi dự án",
        "en": "Mandate a minimum number of testers on each project",
        "ja": "各プロジェクトに配置する最低テスター数を規定する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Hurdle rate là ngưỡng lợi nhuận tối thiểu để một khoản đầu tư được coi là đáng giá, giúp ban quản lý so sánh và ưu tiên các sáng kiến tự động hoá cạnh tranh nguồn lực, tránh đầu tư dàn trải vào các dự án có lợi ích thấp hơn chi phí/rủi ro cơ hội.",
      "en": "A hurdle rate is the minimum acceptable return for an investment to be considered worthwhile, helping management compare and prioritize competing automation initiatives and avoid spreading resources thin on projects whose benefit is lower than their opportunity cost/risk.",
      "ja": "ハードルレートとは、投資が価値ありと見なされるための最低許容リターンであり、経営陣が資源を競合する自動化施策を比較・優先付けし、便益が機会費用・リスクを下回るプロジェクトへの資源分散を避けるのに役立つ。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Khi đánh giá lợi ích của việc đầu tư nâng cấp môi trường kiểm thử (test environment) tự động hoá provisioning, chỉ số chi phí nào phản ánh trực tiếp nhất khoản tiết kiệm nhờ giảm thời gian chờ đợi?",
      "en": "When evaluating the benefit of investing in automated test environment provisioning, which cost metric most directly reflects savings from reduced wait time?",
      "ja": "テスト環境の自動プロビジョニングへの投資効果を評価する際、待機時間短縮による節約を最も直接的に反映するコスト指標はどれか。"
    },
    "options": [
      {
        "vi": "Chi phí marketing cho sản phẩm sắp ra mắt",
        "en": "The marketing cost for the upcoming product launch",
        "ja": "発売予定製品のマーケティングコスト"
      },
      {
        "vi": "Chi phí bản quyền hệ điều hành máy chủ",
        "en": "The server operating system licensing cost",
        "ja": "サーバーOSのライセンス費用"
      },
      {
        "vi": "Chi phí thiết kế giao diện người dùng của ứng dụng",
        "en": "The UI design cost of the application",
        "ja": "アプリケーションのUIデザインコスト"
      },
      {
        "vi": "Chi phí nhân công của kiểm thử viên nhàn rỗi trong thời gian chờ môi trường sẵn sàng",
        "en": "The idle labor cost of testers while waiting for the environment to become ready",
        "ja": "環境が準備できるまで待機しているテスターの人件費(遊休コスト)"
      }
    ],
    "answer": 3,
    "exp": {
      "vi": "Thời gian kiểm thử viên phải chờ môi trường được cấp phát thủ công là chi phí nhân công lãng phí trực tiếp; tự động hoá provisioning giảm thời gian chờ này, quy đổi trực tiếp thành tiết kiệm chi phí nhân công nhàn rỗi.",
      "en": "The time testers spend waiting for manual environment provisioning is directly wasted labor cost; automating provisioning reduces this wait, translating directly into idle-labor cost savings.",
      "ja": "テスターが手動での環境プロビジョニングを待つ時間は、直接的に無駄になる人件費である。プロビジョニングの自動化はこの待機時間を減らし、遊休人件費の節約に直接つながる。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một tổ chức đang cân nhắc giữa hai chiến lược: (A) đầu tư mạnh vào tự động hoá kiểm thử API ở tầng dịch vụ, (B) đầu tư mạnh vào tự động hoá kiểm thử giao diện UI end-to-end. Xét về chi phí-lợi ích dài hạn, vì sao chiến lược (A) thường được khuyến nghị ưu tiên hơn theo mô hình kim tự tháp kiểm thử?",
      "en": "An organization is weighing two strategies: (A) heavy investment in service-layer API test automation, (B) heavy investment in end-to-end UI test automation. From a long-term cost-benefit perspective, why is strategy (A) typically recommended as the priority under the test pyramid model?",
      "ja": "ある組織が2つの戦略、(A)サービス層のAPIテスト自動化への重点投資、(B)エンドツーエンドUIテスト自動化への重点投資、を比較検討している。長期的な費用対効果の観点から、テストピラミッドモデルにおいて戦略(A)が優先的に推奨される理由は何か。"
    },
    "options": [
      {
        "vi": "Test API thực thi nhanh hơn, ổn định hơn và có chi phí bảo trì thấp hơn đáng kể so với test UI vốn dễ vỡ (flaky) và chậm",
        "en": "API tests execute faster, are more stable, and have significantly lower maintenance cost than UI tests, which tend to be flaky and slow",
        "ja": "APIテストは実行が速く安定しており、不安定(フレーキー)で低速になりがちなUIテストに比べて保守コストが大幅に低い"
      },
      {
        "vi": "Test UI luôn rẻ hơn test API vì không cần viết mã",
        "en": "UI tests are always cheaper than API tests because they require no code",
        "ja": "UIテストはコード記述が不要なため、常にAPIテストより安価である"
      },
      {
        "vi": "Test API không bao giờ cần bảo trì sau khi viết lần đầu",
        "en": "API tests never require maintenance after being written once",
        "ja": "APIテストは一度作成すれば保守が一切不要である"
      },
      {
        "vi": "Kim tự tháp kiểm thử khuyến nghị bỏ hoàn toàn kiểm thử UI",
        "en": "The test pyramid recommends eliminating UI testing entirely",
        "ja": "テストピラミッドはUIテストを完全に排除することを推奨している"
      }
    ],
    "answer": 0,
    "exp": {
      "vi": "Theo mô hình kim tự tháp kiểm thử, test ở tầng thấp hơn (API/service) có tốc độ thực thi nhanh, ít phụ thuộc vào giao diện dễ thay đổi nên ổn định hơn, giúp giảm đáng kể chi phí bảo trì và tăng lợi ích ròng so với đầu tư nặng vào test UI end-to-end vốn tốn kém và dễ vỡ.",
      "en": "Per the test pyramid, lower-layer (API/service) tests execute faster and are less dependent on the frequently changing UI, making them more stable — substantially reducing maintenance cost and increasing net benefit compared to heavy investment in expensive, flaky end-to-end UI tests.",
      "ja": "テストピラミッドによれば、下位層(API/サービス)のテストは実行が速く、頻繁に変化するUIへの依存が少ないため安定性が高い。これにより保守コストが大幅に削減され、高価で不安定になりがちなエンドツーエンドUIテストへの重点投資に比べて純便益が向上する。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Trong phân tích chi phí-lợi ích, \"payback period\" (thời gian hoàn vốn) của một khoản đầu tư tự động hoá được định nghĩa chính xác nhất là gì?",
      "en": "In cost-benefit analysis, the \"payback period\" of an automation investment is most accurately defined as what?",
      "ja": "費用対効果分析において、自動化投資の「回収期間(payback period)」は最も正確にはどのように定義されるか。"
    },
    "options": [
      {
        "vi": "Tổng thời gian cần để viết tất cả kịch bản kiểm thử tự động",
        "en": "The total time needed to write all automated test scripts",
        "ja": "すべての自動テストスクリプトを作成するのに必要な合計時間"
      },
      {
        "vi": "Khoảng thời gian cần thiết để tổng lợi ích tích luỹ bù đắp đủ chi phí đầu tư ban đầu",
        "en": "The length of time required for cumulative benefits to fully offset the initial investment cost",
        "ja": "累積便益が初期投資コストを完全に相殺するまでに必要な期間"
      },
      {
        "vi": "Thời gian trung bình để một lỗi được phát hiện và sửa chữa",
        "en": "The average time for a defect to be detected and fixed",
        "ja": "欠陥が検出され修正されるまでの平均時間"
      },
      {
        "vi": "Thời gian gia hạn hợp đồng bản quyền công cụ hàng năm",
        "en": "The annual renewal period for the tool's licensing contract",
        "ja": "ツールのライセンス契約の年間更新期間"
      }
    ],
    "answer": 1,
    "exp": {
      "vi": "Payback period là chỉ số thời gian, đo lường bao lâu thì khoản đầu tư được thu hồi hoàn toàn từ lợi ích tích luỹ — càng ngắn thì rủi ro đầu tư càng thấp và tính hấp dẫn tài chính càng cao.",
      "en": "Payback period is a time metric measuring how long until the investment is fully recovered from accumulated benefits — the shorter it is, the lower the investment risk and the more financially attractive the project.",
      "ja": "回収期間とは、累積便益によって投資が完全に回収されるまでの期間を測る時間指標である。短いほど投資リスクは低く、財務的な魅力は高い。"
    }
  },
  {
    "lvl": "istqb-expert",
    "q": {
      "vi": "Một CTEL cần thuyết phục CFO rằng đầu tư vào cải tiến quy trình kiểm thử mang lại giá trị kinh doanh, không chỉ là chi phí kỹ thuật. Cách tiếp cận nào thể hiện tư duy chiến lược đúng đắn nhất khi trình bày case này?",
      "en": "A CTEL professional needs to convince the CFO that investing in test process improvement delivers business value, not just a technical cost. Which approach reflects the most sound strategic thinking when presenting this case?",
      "ja": "あるCTEL担当者は、テストプロセス改善への投資が単なる技術的コストではなくビジネス価値をもたらすことをCFOに納得させる必要がある。このケースを提示する際、最も健全な戦略的思考を反映するアプローチはどれか。"
    },
    "options": [
      {
        "vi": "Yêu cầu CFO tin tưởng vào chuyên môn kỹ thuật mà không cần số liệu cụ thể",
        "en": "Ask the CFO to simply trust the technical expertise without providing concrete figures",
        "ja": "具体的な数値を示さず、技術的専門性を信頼するようCFOに求める"
      },
      {
        "vi": "Chỉ trình bày số lượng test case đã thực thi trong quý gần nhất",
        "en": "Present only the number of test cases executed in the most recent quarter",
        "ja": "直近四半期に実行されたテストケース数のみを提示する"
      },
      {
        "vi": "Liên kết cải tiến quy trình với các chỉ số kinh doanh như giảm thời gian ra thị trường, giảm chi phí sự cố sản xuất và tăng sự hài lòng khách hàng",
        "en": "Link process improvement to business metrics such as reduced time-to-market, lower production incident costs, and increased customer satisfaction",
        "ja": "プロセス改善を、市場投入時間の短縮、本番障害コストの削減、顧客満足度の向上といったビジネス指標に結び付ける"
      },
      {
        "vi": "So sánh số lượng công cụ kiểm thử đang sử dụng với đối thủ cạnh tranh",
        "en": "Compare the number of testing tools in use against competitors",
        "ja": "使用中のテストツール数を競合他社と比較する"
      }
    ],
    "answer": 2,
    "exp": {
      "vi": "Tư duy chiến lược ở cấp CTEL đòi hỏi liên kết trực tiếp hoạt động kiểm thử với các chỉ số kinh doanh mà CFO quan tâm (doanh thu, chi phí, sự hài lòng khách hàng), biến kiểm thử từ \"chi phí kỹ thuật\" thành \"khoản đầu tư tạo giá trị\" có thể đo lường được.",
      "en": "Strategic thinking at the CTEL level requires directly linking test activities to business metrics the CFO cares about (revenue, cost, customer satisfaction), reframing testing from a \"technical cost\" into a measurable \"value-creating investment.\"",
      "ja": "CTELレベルの戦略的思考には、テスト活動をCFOが関心を持つビジネス指標(収益、コスト、顧客満足度)に直接結び付け、テストを「技術的コスト」から測定可能な「価値創出への投資」へと再定義することが求められる。"
    }
  }
];
