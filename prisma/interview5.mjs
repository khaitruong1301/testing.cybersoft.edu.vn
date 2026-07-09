export const DATA = [
  // ================= iv-manual (10) — answers: 0,1,2,3,0,1,2,3,0,1 =================
  { cat: "iv-manual",
    q: { vi: "Trong buổi phỏng vấn, người hỏi bảo: 「Dự án chỉ còn 2 ngày là release nhưng bạn vừa phát hiện một bug nghiêm trọng ở luồng thanh toán. Bạn làm gì?」 Câu trả lời thể hiện tư duy QA tốt nhất là gì?",
        en: "In an interview the panel asks: With only 2 days left before release you find a critical bug in the payment flow. What do you do? Which answer best shows QA thinking?",
        ja: "面接で「リリースまで残り2日ですが、決済フローで重大なバグを見つけました。どうしますか」と聞かれました。QAとして最も良い考え方を示す回答はどれですか。" },
    options: [
      { vi: "Ghi log bug rõ ràng, đánh giá rủi ro và mức độ ảnh hưởng, báo ngay cho PM để nhóm quyết định go/no-go dựa trên dữ liệu", en: "Log the bug clearly, assess risk and impact, and report to the PM immediately so the team makes a data-driven go/no-go decision", ja: "バグを明確に記録し、リスクと影響を評価し、すぐにPMへ報告してデータに基づくgo/no-go判断をチームに委ねる" },
      { vi: "Im lặng vì sắp release, không muốn làm chậm tiến độ nhóm", en: "Stay silent because release is near and I don't want to slow the team", ja: "リリース間近なのでチームの進行を遅らせたくないから黙っておく" },
      { vi: "Tự sửa code luôn cho nhanh rồi báo sau", en: "Fix the code myself quickly and tell people later", ja: "手早く自分でコードを直してから後で報告する" },
      { vi: "Chờ tới sau release rồi mới log bug để không gây hoảng", en: "Wait until after release to log the bug to avoid panic", ja: "パニックを避けるためリリース後までバグ登録を待つ" }
    ],
    answer: 0,
    exp: { vi: "QA giỏi không giấu bug nghiêm trọng; nhiệm vụ là cung cấp thông tin rủi ro rõ ràng để người ra quyết định chọn go/no-go, không tự ý sửa code sản phẩm.", en: "A strong QA never hides a critical bug; the job is to surface clear risk information so decision-makers can choose go/no-go, not to silently patch product code.", ja: "優れたQAは重大なバグを隠さない。役割はリスク情報を明確に提示し、意思決定者がgo/no-goを判断できるようにすることで、勝手に製品コードを修正することではない。" } },

  { cat: "iv-manual",
    q: { vi: "Developer phản bác: 「Trên máy tôi chạy tốt, không phải bug」. Cách xử lý chuyên nghiệp nhất của Tester là gì?",
        en: "A developer pushes back: It works on my machine, it's not a bug. What is the most professional way for a tester to respond?",
        ja: "開発者が「私の環境では動くのでバグではない」と反論しました。テスターとして最もプロフェッショナルな対応はどれですか。" },
    options: [
      { vi: "Tranh cãi tay đôi cho tới khi dev nhận sai", en: "Argue back and forth until the dev admits fault", ja: "開発者が非を認めるまで言い争う" },
      { vi: "Cung cấp môi trường, phiên bản, dữ liệu, các bước tái hiện và bằng chứng (video/log) để bug tái hiện độc lập với máy cá nhân", en: "Provide environment, version, data, reproduction steps and evidence (video/log) so the bug reproduces independent of a personal machine", ja: "環境・バージョン・データ・再現手順・証跡(動画/ログ)を提供し、個人の端末に依存せず再現できるようにする" },
      { vi: "Đóng bug lại vì dev là người viết code nên chắc đúng", en: "Close the bug because the dev wrote the code so must be right", ja: "開発者がコードを書いたので正しいはずと考えバグをクローズする" },
      { vi: "Báo sếp rằng dev không hợp tác", en: "Report to the boss that the dev is uncooperative", ja: "開発者が非協力的だと上司に報告する" }
    ],
    answer: 1,
    exp: { vi: "Khác biệt môi trường là nguyên nhân phổ biến; cách thuyết phục là tái hiện có kiểm soát kèm chứng cứ, biến tranh luận cảm tính thành dữ liệu khách quan.", en: "Environment differences are a common cause; the way to persuade is controlled reproduction with evidence, turning an emotional debate into objective data.", ja: "環境差はよくある原因であり、説得の方法は証跡付きの制御された再現で、感情的な議論を客観的なデータに変えることである。" } },

  { cat: "iv-manual",
    q: { vi: "Bạn được giao test một tính năng nhưng KHÔNG có tài liệu đặc tả rõ ràng. Bước đầu tiên hợp lý nhất là gì?",
        en: "You must test a feature but there is NO clear specification. What is the most reasonable first step?",
        ja: "ある機能をテストする必要がありますが、明確な仕様書がありません。最も妥当な最初のステップはどれですか。" },
    options: [
      { vi: "Từ chối test cho tới khi có tài liệu đầy đủ", en: "Refuse to test until full documentation exists", ja: "完全なドキュメントが揃うまでテストを拒否する" },
      { vi: "Đoán đại yêu cầu rồi test theo cảm tính, không hỏi ai", en: "Guess the requirements and test by feel without asking anyone", ja: "要件を勝手に推測し、誰にも聞かず感覚でテストする" },
      { vi: "Trao đổi với PO/BA/dev để làm rõ kỳ vọng, dùng exploratory testing và ghi lại giả định để xác nhận", en: "Talk with PO/BA/dev to clarify expectations, use exploratory testing, and record assumptions for confirmation", ja: "PO/BA/開発者と話して期待を明確にし、探索的テストを行い、確認用に前提を記録する" },
      { vi: "Chỉ test đúng những gì màn hình hiển thị, bỏ qua nghiệp vụ", en: "Test only what the screen shows and ignore business logic", ja: "画面表示だけをテストし、業務ロジックは無視する" }
    ],
    answer: 2,
    exp: { vi: "Thiếu spec là tình huống thực tế thường gặp; tester chủ động khai thác nguồn thông tin, dùng exploratory và ghi giả định thay vì đoán mò hay từ chối.", en: "Missing specs is a real, common situation; a tester proactively gathers information, uses exploratory testing, and logs assumptions instead of guessing or refusing.", ja: "仕様不足は現実によくある状況で、テスターは能動的に情報源を集め、探索的テストを使い、推測や拒否ではなく前提を記録する。" } },

  { cat: "iv-manual",
    q: { vi: "Đâu là bẫy kinh điển khi viết steps to reproduce trong một bug report chất lượng thấp?",
        en: "Which is a classic pitfall of a low-quality bug report's steps to reproduce?",
        ja: "質の低いバグレポートの再現手順における典型的な落とし穴はどれですか。" },
    options: [
      { vi: "Ghi rõ dữ liệu đầu vào và kết quả mong đợi", en: "Stating exact input data and expected result", ja: "入力データと期待結果を明確に記載する" },
      { vi: "Đính kèm ảnh chụp màn hình và log", en: "Attaching screenshots and logs", ja: "スクリーンショットとログを添付する" },
      { vi: "Ghi phiên bản build và môi trường", en: "Noting build version and environment", ja: "ビルドバージョンと環境を記載する" },
      { vi: "Viết mơ hồ kiểu 「làm vài thao tác thì app lỗi」, thiếu bước cụ thể và điều kiện tiền đề", en: "Writing vaguely like do a few actions and the app breaks, missing concrete steps and preconditions", ja: "「いくつか操作するとアプリが壊れる」のように曖昧で、具体的な手順や前提条件が欠けている" }
    ],
    answer: 3,
    exp: { vi: "Bug report tốt phải tái hiện được; mô tả mơ hồ, thiếu điều kiện tiền đề khiến dev không lặp lại được lỗi và bug dễ bị đóng nhầm.", en: "A good report must be reproducible; vague descriptions lacking preconditions stop the dev from repeating the defect and lead to wrongful closure.", ja: "良いバグレポートは再現可能でなければならない。前提条件を欠く曖昧な記述は開発者が欠陥を再現できず、誤クローズにつながる。" } },

  { cat: "iv-manual",
    q: { vi: "Nhà tuyển dụng hỏi: 「Khi nào bạn quyết định NGỪNG testing?」 Đáp án phản ánh tư duy đúng nhất là gì?",
        en: "The interviewer asks: When do you decide to STOP testing? Which answer reflects the most correct thinking?",
        ja: "面接官が「いつテストを停止すると判断しますか」と質問します。最も正しい考え方を反映する回答はどれですか。" },
    options: [
      { vi: "Khi đạt các tiêu chí dừng đã định trước: độ phủ, tỷ lệ pass, mật độ lỗi giảm, hết thời gian/ngân sách và rủi ro chấp nhận được", en: "When predefined exit criteria are met: coverage, pass rate, declining defect density, time/budget limits and acceptable residual risk", ja: "事前定義の終了基準を満たしたとき: カバレッジ、合格率、欠陥密度の低下、時間/予算の上限、許容可能な残存リスク" },
      { vi: "Khi tester cảm thấy mệt và muốn nghỉ", en: "When the tester feels tired and wants a break", ja: "テスターが疲れて休みたくなったとき" },
      { vi: "Khi tất cả test case đã chạy một lần, bất kể còn bug hay không", en: "When every test case has run once regardless of remaining bugs", ja: "残りのバグに関係なく全テストケースを一度実行したとき" },
      { vi: "Khi không tìm thấy bug nào trong lần chạy đầu tiên", en: "When no bug is found in the first run", ja: "最初の実行でバグが1件も見つからなかったとき" }
    ],
    answer: 0,
    exp: { vi: "Testing không bao giờ 「hết」 tuyệt đối; quyết định dừng dựa trên exit criteria và đánh giá rủi ro, không phải cảm tính hay chạy một lượt là xong.", en: "Testing is never absolutely exhaustive; stopping is based on exit criteria and risk assessment, not on fatigue or a single pass.", ja: "テストが完全に尽きることはない。停止は終了基準とリスク評価に基づくもので、疲労や一巡だけで決めるものではない。" } },

  { cat: "iv-manual",
    q: { vi: "Trong review test case của đồng nghiệp, bạn thấy nhiều case trùng lặp và thiếu case biên. Cách góp ý xây dựng nhất là gì?",
        en: "Reviewing a colleague's test cases you find many duplicates and missing boundary cases. What is the most constructive way to give feedback?",
        ja: "同僚のテストケースをレビューし、多くの重複と境界値ケースの不足を見つけました。最も建設的なフィードバックはどれですか。" },
    options: [
      { vi: "Chê công khai trong nhóm chat rằng case viết kém", en: "Publicly criticize in the team chat that the cases are poorly written", ja: "チームチャットで公然と出来が悪いと批判する" },
      { vi: "Chỉ ra cụ thể case trùng, gợi ý gộp và bổ sung phân tích giá trị biên, trao đổi trực tiếp trên tinh thần cùng cải thiện", en: "Point out the specific duplicates, suggest merging and adding boundary value analysis, and discuss directly in a collaborative spirit", ja: "重複ケースを具体的に指摘し、統合と境界値分析の追加を提案し、協力的な姿勢で直接話し合う" },
      { vi: "Tự sửa hết mà không nói gì với đồng nghiệp", en: "Silently rewrite everything without telling the colleague", ja: "同僚に何も言わずすべて書き直す" },
      { vi: "Bỏ qua vì đó là việc của người viết, không phải của mình", en: "Ignore it since it's the author's job not mine", ja: "作成者の仕事で自分の仕事ではないので無視する" }
    ],
    answer: 1,
    exp: { vi: "Review là cơ hội nâng chất lượng chung; góp ý cụ thể, có giải pháp và tôn trọng người viết hiệu quả hơn chê bai công khai hay âm thầm làm lại.", en: "Reviews improve shared quality; specific, solution-oriented feedback delivered respectfully beats public criticism or silent rewrites.", ja: "レビューは全体の品質を高める機会。具体的で解決志向、かつ相手を尊重したフィードバックは、公然の批判や無言の書き直しより効果的である。" } },

  { cat: "iv-manual",
    q: { vi: "Một khách hàng báo lỗi nhưng team không tái hiện được. Hướng điều tra ưu tiên hợp lý nhất là gì?",
        en: "A customer reports a bug the team cannot reproduce. What is the most reasonable priority investigation direction?",
        ja: "顧客がバグを報告しましたが、チームは再現できません。最も妥当な優先調査の方向はどれですか。" },
    options: [
      { vi: "Kết luận ngay là khách hàng dùng sai, đóng ticket", en: "Immediately conclude the customer used it wrong and close the ticket", ja: "すぐに顧客の使い方が悪いと結論しチケットをクローズする" },
      { vi: "Chờ khách gửi thêm 5 lần nữa rồi mới xử lý", en: "Wait for the customer to report five more times before acting", ja: "顧客があと5回報告するのを待ってから対応する" },
      { vi: "Thu thập thông tin môi trường thực tế của khách (thiết bị, trình duyệt, dữ liệu, thời điểm, log) và tái dựng đúng bối cảnh đó", en: "Collect the customer's real environment (device, browser, data, timing, logs) and rebuild that exact context", ja: "顧客の実環境(端末・ブラウザ・データ・発生時刻・ログ)を収集し、その文脈を正確に再構築する" },
      { vi: "Đổ cho hạ tầng và chuyển ticket sang team khác", en: "Blame the infrastructure and pass the ticket to another team", ja: "インフラのせいにしてチケットを他チームへ回す" }
    ],
    answer: 2,
    exp: { vi: "Bug không tái hiện thường do khác biệt bối cảnh dữ liệu/môi trường; thu thập thông tin thực địa và dựng lại đúng ngữ cảnh là chìa khóa, không vội đổ lỗi.", en: "Non-reproducible bugs often stem from data/environment context differences; gathering field information and rebuilding the exact context is key rather than rushing to blame.", ja: "再現しないバグはデータ/環境の文脈差が原因のことが多い。現場情報を集め文脈を正確に再構築するのが鍵で、責任転嫁を急がない。" } },

  { cat: "iv-manual",
    q: { vi: "Đâu là khác biệt cốt lõi giữa severity và priority mà một tester thường bị hỏi trong phỏng vấn?",
        en: "What is the core difference between severity and priority a tester is often asked about in interviews?",
        ja: "面接でよく問われる、重大度(severity)と優先度(priority)の本質的な違いはどれですか。" },
    options: [
      { vi: "Severity và priority luôn giống nhau về giá trị", en: "Severity and priority always have the same value", ja: "重大度と優先度は常に同じ値になる" },
      { vi: "Priority do dev đặt, severity do khách hàng đặt bắt buộc", en: "Priority is set by devs, severity is mandatorily set by customers", ja: "優先度は開発者、重大度は必ず顧客が設定する" },
      { vi: "Severity chỉ dùng cho web, priority chỉ dùng cho mobile", en: "Severity is only for web, priority only for mobile", ja: "重大度はWeb専用、優先度はモバイル専用である" },
      { vi: "Severity là mức nghiêm trọng kỹ thuật của lỗi; priority là thứ tự cần sửa dựa trên nghiệp vụ và thời điểm", en: "Severity is the technical seriousness of the defect; priority is the fix order based on business and timing", ja: "重大度は欠陥の技術的な深刻さ、優先度は業務やタイミングに基づく修正の順序である" }
    ],
    answer: 3,
    exp: { vi: "Một lỗi hiển thị chính tả (severity thấp) trên trang chủ ngày ra mắt có thể priority cao; hai khái niệm độc lập và không nhất thiết trùng nhau.", en: "A low-severity typo on the home page at launch can be high priority; the two concepts are independent and need not match.", ja: "ローンチ日のホーム画面の誤字(重大度低)は優先度が高いことがある。両者は独立で必ずしも一致しない。" } },

  { cat: "iv-manual",
    q: { vi: "Khi nhận build mới rất gấp, kỹ thuật kiểm tra nào giúp nhanh chóng xác định build có 「đủ ổn」 để test sâu hay không?",
        en: "For an urgent new build, which technique quickly determines whether the build is stable enough for deeper testing?",
        ja: "急ぎの新規ビルドに対し、深いテストに耐えられるほど安定しているかを素早く判断する手法はどれですか。" },
    options: [
      { vi: "Smoke testing các chức năng cốt lõi trước khi đầu tư test chi tiết", en: "Smoke testing the core functions before investing in detailed testing", ja: "詳細テストに投資する前にコア機能のスモークテストを行う" },
      { vi: "Regression testing toàn bộ trong 5 phút", en: "Full regression testing in 5 minutes", ja: "5分で全回帰テスト" },
      { vi: "Load testing 10.000 người dùng đồng thời", en: "Load testing 10,000 concurrent users", ja: "1万同時ユーザーの負荷テスト" },
      { vi: "Chờ đến sprint sau mới kiểm tra", en: "Wait until next sprint to check", ja: "次のスプリントまで確認を待つ" }
    ],
    answer: 0,
    exp: { vi: "Smoke test kiểm tra nhanh các chức năng chính còn hoạt động; nếu smoke fail thì không đáng đầu tư test sâu, tiết kiệm thời gian cho cả nhóm.", en: "Smoke testing quickly checks that key functions still work; if smoke fails, deeper testing isn't worth the investment, saving the whole team time.", ja: "スモークテストは主要機能が動作するか素早く確認する。スモークが失敗すれば深いテストは投資に値せず、チーム全体の時間を節約できる。" } },

  { cat: "iv-manual",
    q: { vi: "Bạn và PO bất đồng: PO cho rằng một defect không đáng sửa, bạn cho rằng ảnh hưởng người dùng. Hướng giải quyết trưởng thành nhất là gì?",
        en: "You and the PO disagree: the PO thinks a defect isn't worth fixing, you think it harms users. What is the most mature resolution?",
        ja: "POと意見が対立します。POはある欠陥は修正に値しないと考え、あなたはユーザーに悪影響と考えます。最も成熟した解決策はどれですか。" },
    options: [
      { vi: "Ép PO nghe theo mình vì mình là người test", en: "Force the PO to follow me because I'm the tester", ja: "自分がテスターだからPOを従わせる" },
      { vi: "Trình bày dữ liệu tác động (số user ảnh hưởng, rủi ro, chi phí sửa) để PO ra quyết định có căn cứ, tôn trọng quyền quyết định cuối của PO", en: "Present impact data (affected users, risk, fix cost) so the PO decides with evidence, respecting the PO's final call", ja: "影響データ(影響ユーザー数・リスク・修正コスト)を提示してPOが根拠に基づき判断できるようにし、POの最終決定権を尊重する" },
      { vi: "Bỏ qua ý kiến của mình vì PO quyền cao hơn", en: "Drop my view because the PO outranks me", ja: "POの方が上位なので自分の意見を取り下げる" },
      { vi: "Âm thầm để bug đó trong hệ thống cho PO tự lãnh hậu quả", en: "Quietly leave the bug in so the PO faces the consequences", ja: "こっそりバグを残しPOに結果を負わせる" }
    ],
    answer: 1,
    exp: { vi: "Vai trò QA là làm rõ rủi ro bằng dữ liệu để hỗ trợ quyết định, không phải áp đặt; quyền ưu tiên cuối cùng thuộc PO nhưng phải dựa trên thông tin đầy đủ.", en: "QA's role is to clarify risk with data to support decisions, not to impose; final prioritization belongs to the PO but must rest on full information.", ja: "QAの役割はデータでリスクを明確にし意思決定を支援することで、押し付けではない。最終的な優先順位はPOに属するが、十分な情報に基づく必要がある。" } },

  // ================= iv-automation (10) — answers: 2,3,0,1,2,3,0,1,2,3 =================
  { cat: "iv-automation",
    q: { vi: "Nhà tuyển dụng hỏi: 「Test case nào KHÔNG nên tự động hóa?」 Đáp án chính xác nhất là gì?",
        en: "The interviewer asks: Which test case should NOT be automated? What is the most accurate answer?",
        ja: "面接官が「自動化すべきでないテストケースはどれか」と聞きます。最も正確な回答はどれですか。" },
    options: [
      { vi: "Case regression chạy lặp lại mỗi lần build", en: "Regression cases run repeatedly on every build", ja: "毎ビルドで繰り返す回帰テストケース" },
      { vi: "Kiểm thử API ổn định trả JSON", en: "Stable API tests returning JSON", ja: "JSONを返す安定したAPIテスト" },
      { vi: "Case dùng một lần, thay đổi liên tục hoặc phụ thuộc đánh giá cảm quan (usability, thẩm mỹ UI)", en: "One-off cases, frequently changing cases, or ones needing human judgment (usability, UI aesthetics)", ja: "使い捨てで頻繁に変わる、または人間の判断が必要なケース(ユーザビリティ、UIの美観)" },
      { vi: "Case smoke chạy hằng ngày trên CI", en: "Daily smoke cases on CI", ja: "CIで毎日走るスモークケース" }
    ],
    answer: 2,
    exp: { vi: "Tự động hóa có ROI khi case ổn định, lặp lại; case dùng một lần hay cần cảm quan con người thì chi phí bảo trì lớn hơn lợi ích.", en: "Automation pays off for stable, repeated cases; one-off or judgment-based cases cost more to maintain than they return.", ja: "自動化は安定して繰り返すケースで投資対効果がある。使い捨てや人間の判断が必要なケースは維持コストが利益を上回る。" } },

  { cat: "iv-automation",
    q: { vi: "Một test tự động 「thỉnh thoảng fail rồi lại pass」 không rõ lý do. Đây là hiện tượng gì và hướng xử lý đúng?",
        en: "An automated test sometimes fails then passes for no clear reason. What is this and the correct way to handle it?",
        ja: "ある自動テストが理由不明で時々失敗し、また成功します。これは何で、正しい対処はどれですか。" },
    options: [
      { vi: "Đây là bug sản phẩm nghiêm trọng, phải chặn release ngay", en: "It's a critical product bug that must block release immediately", ja: "これは重大な製品バグでリリースを即ブロックすべき" },
      { vi: "Bình thường, cứ retry đến khi pass là xong", en: "Normal, just retry until it passes", ja: "普通のことで、成功するまでリトライすれば済む" },
      { vi: "Xóa luôn test đó cho khỏi phiền", en: "Just delete the test to avoid hassle", ja: "面倒なのでそのテストを削除する" },
      { vi: "Đây là flaky test; cần điều tra nguyên nhân (timing, dữ liệu dùng chung, wait cứng) và khắc phục gốc thay vì rerun cho tới khi pass", en: "It's a flaky test; investigate the root cause (timing, shared data, hard waits) and fix it rather than rerunning until green", ja: "これはフレーキーテスト。根本原因(タイミング、共有データ、固定待機)を調査し、成功するまで再実行するのではなく根本修正する" }
    ],
    answer: 3,
    exp: { vi: "Flaky test làm mất niềm tin vào bộ test; retry mù hay xóa test đều nguy hiểm, phải tìm nguyên nhân bất định như race condition, wait cứng, dữ liệu dùng chung.", en: "Flaky tests erode trust in the suite; blind retries or deletion are dangerous—find the nondeterministic cause like race conditions, hard waits, or shared data.", ja: "フレーキーテストはスイートへの信頼を損なう。盲目的な再試行や削除は危険で、競合状態・固定待機・共有データなど非決定的な原因を突き止める必要がある。" } },

  { cat: "iv-automation",
    q: { vi: "Vì sao dùng XPath tuyệt đối kiểu /html/body/div[3]/div[2]/button là một anti-pattern trong automation?",
        en: "Why is using absolute XPath like /html/body/div[3]/div[2]/button an anti-pattern in automation?",
        ja: "なぜ /html/body/div[3]/div[2]/button のような絶対XPathは自動化のアンチパターンなのですか。" },
    options: [
      { vi: "Vì nó cực kỳ dễ vỡ: chỉ cần cấu trúc DOM thay đổi nhẹ là selector hỏng, gây bảo trì cao", en: "Because it is extremely brittle: a slight DOM change breaks the selector, causing high maintenance", ja: "極めて壊れやすく、DOM構造が少し変わるだけでセレクタが壊れ、保守コストが高いから" },
      { vi: "Vì XPath luôn chậm hơn CSS selector 100 lần", en: "Because XPath is always 100x slower than CSS selectors", ja: "XPathはCSSセレクタより常に100倍遅いから" },
      { vi: "Vì trình duyệt không hỗ trợ XPath", en: "Because browsers do not support XPath", ja: "ブラウザがXPathをサポートしないから" },
      { vi: "Vì XPath không tìm được button", en: "Because XPath cannot locate a button", ja: "XPathはbuttonを見つけられないから" }
    ],
    answer: 0,
    exp: { vi: "Locator nên bám vào thuộc tính ổn định (id, data-testid, role); XPath tuyệt đối phụ thuộc vị trí, dễ vỡ khi UI thay đổi và tốn công sửa liên tục.", en: "Locators should rely on stable attributes (id, data-testid, role); absolute XPath depends on position, breaks on UI change, and needs constant fixing.", ja: "ロケータは安定した属性(id、data-testid、role)に依拠すべき。絶対XPathは位置に依存しUI変更で壊れ、修正が絶えない。" } },

  { cat: "iv-automation",
    q: { vi: "Trong kim tự tháp kiểm thử (test pyramid), tầng nào NÊN có nhiều test nhất và vì sao?",
        en: "In the test pyramid, which layer SHOULD have the most tests and why?",
        ja: "テストピラミッドで、最も多くのテストを持つべき層はどれで、その理由は何ですか。" },
    options: [
      { vi: "Tầng UI/E2E, vì gần người dùng nhất nên đáng tin nhất", en: "The UI/E2E layer, because it's closest to users so most trustworthy", ja: "UI/E2E層。ユーザーに最も近く最も信頼できるから" },
      { vi: "Tầng unit test, vì nhanh, rẻ, ổn định và định vị lỗi chính xác", en: "The unit test layer, because it's fast, cheap, stable and pinpoints defects", ja: "ユニットテスト層。速く安く安定し欠陥を正確に特定できるから" },
      { vi: "Tầng manual, vì con người thông minh hơn máy", en: "The manual layer, because humans are smarter than machines", ja: "手動層。人間は機械より賢いから" },
      { vi: "Không tầng nào, nên phân bổ đều mọi tầng bằng nhau", en: "No layer, distribute equally across all layers", ja: "どの層でもなく、全層に均等に配分すべき" }
    ],
    answer: 1,
    exp: { vi: "Unit test tạo nền rộng vì nhanh và rẻ; E2E ít hơn do chậm và dễ vỡ. Đây là nguyên tắc cân bằng ROI và độ tin cậy của bộ test.", en: "Unit tests form the wide base because they're fast and cheap; E2E is fewer because it's slow and brittle. This balances suite ROI and reliability.", ja: "ユニットテストは速く安いので広い土台をなし、E2Eは遅く壊れやすいので少なくする。これはスイートのROIと信頼性のバランス原則である。" } },

  { cat: "iv-automation",
    q: { vi: "Đội của bạn muốn ép độ phủ code (code coverage) lên 100% bằng mọi giá. Nhận định đúng về trade-off này là gì?",
        en: "Your team wants to force code coverage to 100% at all costs. What is the correct take on this trade-off?",
        ja: "チームがコードカバレッジを何としても100%にしたがっています。このトレードオフに関する正しい見解はどれですか。" },
    options: [
      { vi: "100% coverage đảm bảo không còn bug nào", en: "100% coverage guarantees zero remaining bugs", ja: "100%カバレッジはバグゼロを保証する" },
      { vi: "Coverage không liên quan gì đến chất lượng test", en: "Coverage is unrelated to test quality", ja: "カバレッジはテスト品質と無関係" },
      { vi: "Coverage cao là hữu ích nhưng 100% có thể tốn kém và sinh test rác chỉ để 「chạm dòng」; nên ưu tiên phủ rủi ro cao và assertion có ý nghĩa", en: "High coverage helps but 100% can be costly and breed junk tests that just touch lines; prioritize high-risk coverage and meaningful assertions", ja: "高いカバレッジは有用だが100%は高コストで、行に触れるだけのゴミテストを生む。高リスク領域と意味のあるアサーションを優先すべき" },
      { vi: "Chỉ cần coverage 10% là đủ cho mọi dự án", en: "10% coverage is enough for any project", ja: "どのプロジェクトも10%カバレッジで十分" }
    ],
    answer: 2,
    exp: { vi: "Coverage đo dòng được chạy, không đo chất lượng assertion; ép 100% dễ sinh test hình thức. Trọng tâm là phủ vùng rủi ro cao với kiểm tra có ý nghĩa.", en: "Coverage measures executed lines, not assertion quality; forcing 100% breeds hollow tests. Focus on covering high-risk areas with meaningful checks.", ja: "カバレッジは実行行を測るがアサーションの質は測らない。100%強制は形だけのテストを生む。意味あるチェックで高リスク領域を覆うことが重要。" } },

  { cat: "iv-automation",
    q: { vi: "Vì sao đưa dữ liệu test (test data) độc lập và tự dọn dẹp (setup/teardown) là thực hành quan trọng trong automation?",
        en: "Why is using independent, self-cleaning test data (setup/teardown) an important practice in automation?",
        ja: "なぜ独立して自動クリーンアップされるテストデータ(setup/teardown)は自動化で重要な実践なのですか。" },
    options: [
      { vi: "Để tăng dung lượng database cho vui", en: "To grow the database size for fun", ja: "楽しみでデータベース容量を増やすため" },
      { vi: "Để dev không cần viết code nữa", en: "So devs no longer need to write code", ja: "開発者がもうコードを書かなくてよくするため" },
      { vi: "Để mọi test bắt buộc chạy tuần tự", en: "To force all tests to run sequentially", ja: "すべてのテストを強制的に順次実行するため" },
      { vi: "Để test chạy được song song, độc lập thứ tự và không gây flaky do dữ liệu dùng chung", en: "So tests run in parallel, are order-independent, and avoid flakiness from shared data", ja: "テストを並列実行でき、順序に依存せず、共有データによるフレーキーを避けるため" }
    ],
    answer: 3,
    exp: { vi: "Test phụ thuộc dữ liệu dùng chung dễ đổ theo dây chuyền và không chạy song song được; dữ liệu độc lập kèm dọn dẹp giúp bộ test ổn định, đáng tin.", en: "Tests sharing data fail in cascades and can't parallelize; independent data with cleanup makes the suite stable and trustworthy.", ja: "共有データに依存するテストは連鎖失敗し並列化できない。独立データとクリーンアップでスイートは安定し信頼できる。" } },

  { cat: "iv-automation",
    q: { vi: "Câu hỏi phỏng vấn: 「Page Object Model (POM) giải quyết vấn đề gì?」 Đáp án đúng nhất là gì?",
        en: "Interview question: What problem does the Page Object Model (POM) solve? What is the best answer?",
        ja: "面接質問「ページオブジェクトモデル(POM)は何の問題を解決するか」。最も適切な回答はどれですか。" },
    options: [
      { vi: "Tách locator và thao tác giao diện ra một lớp riêng, giảm trùng lặp và giúp bảo trì khi UI đổi chỉ sửa một nơi", en: "Separates locators and UI actions into a dedicated layer, reducing duplication so UI changes need fixing in one place", ja: "ロケータとUI操作を専用層に分離し重複を減らし、UI変更時に一箇所だけ修正すればよくする" },
      { vi: "Làm cho test chạy nhanh hơn 10 lần", en: "Makes tests run 10x faster", ja: "テストを10倍速く実行する" },
      { vi: "Thay thế hoàn toàn nhu cầu viết assertion", en: "Completely removes the need to write assertions", ja: "アサーションを書く必要を完全になくす" },
      { vi: "Tự động sinh test case từ tài liệu", en: "Auto-generates test cases from documents", ja: "ドキュメントからテストケースを自動生成する" }
    ],
    answer: 0,
    exp: { vi: "POM là mẫu thiết kế tách chi tiết trang khỏi logic test; khi UI thay đổi chỉ cần cập nhật page object, giảm chi phí bảo trì và trùng lặp code.", en: "POM is a design pattern separating page details from test logic; when the UI changes only the page object updates, cutting maintenance and duplication.", ja: "POMはページの詳細をテストロジックから分離する設計パターン。UI変更時はページオブジェクトだけ更新すればよく、保守と重複を削減する。" } },

  { cat: "iv-automation",
    q: { vi: "Đâu là dấu hiệu rõ ràng nhất cho thấy một bộ automation đang tạo 「false confidence」 (niềm tin sai)?",
        en: "What is the clearest sign that an automation suite is creating false confidence?",
        ja: "自動化スイートが「誤った安心感(false confidence)」を生んでいる最も明確な兆候はどれですか。" },
    options: [
      { vi: "Bộ test chạy trong 3 phút", en: "The suite runs in 3 minutes", ja: "スイートが3分で走る" },
      { vi: "Bộ test luôn xanh (all pass) nhưng vẫn để lọt nhiều bug ra production", en: "The suite is always green yet many bugs still reach production", ja: "スイートは常にグリーンなのに多くのバグが本番に流出する" },
      { vi: "Có báo cáo HTML đẹp mắt", en: "It has a nice HTML report", ja: "見栄えの良いHTMLレポートがある" },
      { vi: "Test được viết bằng TypeScript", en: "Tests are written in TypeScript", ja: "テストがTypeScriptで書かれている" }
    ],
    answer: 1,
    exp: { vi: "Test xanh mà bug vẫn lọt nghĩa là assertion yếu hoặc không phủ đúng luồng quan trọng; màu xanh khi đó gây ảo tưởng an toàn, nguy hiểm hơn cả không có test.", en: "Green tests while bugs escape mean weak assertions or missing coverage of critical flows; that green creates a dangerous illusion of safety.", ja: "グリーンなのにバグが流出するのは、アサーションが弱いか重要フローを覆えていない証拠。そのグリーンは危険な安心の錯覚を生む。" } },

  { cat: "iv-automation",
    q: { vi: "Khi tích hợp automation vào pipeline, vì sao nên tách bộ test 「nhanh」 (smoke) khỏi bộ 「chậm/đầy đủ」 (full regression)?",
        en: "When integrating automation into a pipeline, why split a fast (smoke) suite from a slow, full regression suite?",
        ja: "自動化をパイプラインに統合する際、なぜ高速(スモーク)スイートと低速の全回帰スイートを分けるべきですか。" },
    options: [
      { vi: "Để làm pipeline trông phức tạp và chuyên nghiệp hơn", en: "To make the pipeline look more complex and professional", ja: "パイプラインをより複雑で専門的に見せるため" },
      { vi: "Vì smoke test không cần assertion", en: "Because smoke tests need no assertions", ja: "スモークテストにはアサーションが不要だから" },
      { vi: "Để có phản hồi nhanh trên mỗi commit bằng smoke, còn regression đầy đủ chạy theo lịch/nightly, cân bằng tốc độ và độ phủ", en: "To get fast feedback per commit via smoke while full regression runs on schedule/nightly, balancing speed and coverage", ja: "スモークでコミットごとに素早いフィードバックを得て、全回帰は定時/夜間に走らせ、速度とカバレッジのバランスを取るため" },
      { vi: "Vì regression không bao giờ nên tự động hóa", en: "Because regression should never be automated", ja: "回帰は決して自動化すべきでないから" }
    ],
    answer: 2,
    exp: { vi: "Feedback loop nhanh giữ dev năng suất; chạy full regression mỗi commit thì quá chậm. Tách tầng giúp cân bằng giữa tốc độ phản hồi và độ phủ bảo vệ.", en: "A fast feedback loop keeps devs productive; running full regression per commit is too slow. Splitting tiers balances feedback speed with protective coverage.", ja: "速いフィードバックループは開発者の生産性を保つ。コミットごとの全回帰は遅すぎる。層を分けることで応答速度と保護カバレッジのバランスを取る。" } },

  { cat: "iv-automation",
    q: { vi: "Vì sao một test tự động chỉ kiểm tra 「không ném exception」 mà không có assertion cụ thể lại là bẫy nguy hiểm?",
        en: "Why is an automated test that only checks that no exception is thrown, without specific assertions, a dangerous trap?",
        ja: "具体的なアサーションがなく「例外が投げられない」ことだけを確認する自動テストが危険な罠なのはなぜですか。" },
    options: [
      { vi: "Vì test không có exception sẽ chạy chậm hơn", en: "Because a test without exceptions runs slower", ja: "例外のないテストは実行が遅くなるから" },
      { vi: "Vì exception luôn bị trình chạy test bỏ qua", en: "Because exceptions are always ignored by the test runner", ja: "例外は常にテストランナーに無視されるから" },
      { vi: "Vì test đó cần phải viết bằng ngôn ngữ khác", en: "Because that test must be written in another language", ja: "そのテストは別の言語で書く必要があるから" },
      { vi: "Vì nó chỉ xác nhận code chạy được, không xác minh kết quả đúng, nên vẫn pass dù logic sai hoàn toàn", en: "Because it only confirms the code runs, not that the result is correct, so it passes even when the logic is completely wrong", ja: "コードが動くことだけを確認し結果の正しさを検証しないため、ロジックが完全に誤っていても合格するから" }
    ],
    answer: 3,
    exp: { vi: "Assertion là phần xác minh kỳ vọng; thiếu nó, test biến thành 「smoke ngầm」 luôn xanh ngay cả khi đầu ra sai, tạo cảm giác an toàn giả và bỏ lọt lỗi logic.", en: "Assertions verify expectations; without them a test becomes a hidden smoke check that stays green even with wrong output, creating false safety and missing logic defects.", ja: "アサーションは期待の検証部分。それが無いとテストは隠れたスモークと化し、出力が誤っていてもグリーンのままで、偽の安心を生みロジック欠陥を見逃す。" } },

  // ================= iv-playwright (10) — answers: 0,1,2,3,0,1,2,3,0,1 =================
  { cat: "iv-playwright",
    q: { vi: "Trong Playwright, vì sao nên ưu tiên các locator như getByRole hoặc getByTestId thay vì bám CSS class do build sinh ra?",
        en: "In Playwright, why prefer locators like getByRole or getByTestId over CSS classes generated by the build?",
        ja: "Playwrightで、なぜビルドが生成するCSSクラスより getByRole や getByTestId のようなロケータを優先すべきですか。" },
    options: [
      { vi: "Vì locator dựa trên vai trò/testid ổn định và phản ánh cách người dùng nhìn, ít vỡ khi class băm (hashed) đổi giữa các build", en: "Because role/testid locators are stable and user-facing, less brittle when hashed classes change between builds", ja: "role/testidベースのロケータは安定しユーザー視点を反映し、ハッシュ化クラスがビルド間で変わっても壊れにくいから" },
      { vi: "Vì getByRole render trang nhanh hơn", en: "Because getByRole renders the page faster", ja: "getByRoleはページを速く描画するから" },
      { vi: "Vì CSS class không tồn tại trong DOM", en: "Because CSS classes don't exist in the DOM", ja: "CSSクラスはDOMに存在しないから" },
      { vi: "Vì getByTestId tự sửa bug sản phẩm", en: "Because getByTestId auto-fixes product bugs", ja: "getByTestIdは製品バグを自動修正するから" }
    ],
    answer: 0,
    exp: { vi: "Class do CSS-in-JS/bundler băm thường đổi mỗi build; locator theo role hoặc testid bền hơn, phản ánh ngữ nghĩa và khả năng tiếp cận, giảm bảo trì.", en: "Classes hashed by CSS-in-JS/bundlers change per build; role or testid locators are more durable, reflect semantics and accessibility, and cut maintenance.", ja: "CSS-in-JSやバンドラがハッシュ化するクラスはビルドごとに変わる。role や testid のロケータは頑健で、意味とアクセシビリティを反映し保守を減らす。" } },

  { cat: "iv-playwright",
    q: { vi: "Bẫy kỹ thuật: dùng page.waitForTimeout(5000) rải khắp test. Vì sao đây là thực hành xấu trong Playwright?",
        en: "Technical trap: sprinkling page.waitForTimeout(5000) across tests. Why is this bad practice in Playwright?",
        ja: "技術的な罠: テスト全体に page.waitForTimeout(5000) を散りばめる。Playwrightでなぜ悪い実践なのですか。" },
    options: [
      { vi: "Vì Playwright cấm mọi hàm wait", en: "Because Playwright forbids all wait functions", ja: "Playwrightはすべての待機関数を禁止しているから" },
      { vi: "Vì wait cứng làm test vừa chậm (chờ dư) vừa flaky (chờ thiếu khi mạng chậm); nên dùng auto-waiting và web-first assertions của Playwright", en: "Because hard waits make tests both slow (over-wait) and flaky (under-wait on slow network); use Playwright's auto-waiting and web-first assertions", ja: "固定待機はテストを遅く(待ちすぎ)かつフレーキー(遅い回線で待ち不足)にする。Playwrightの自動待機とweb-firstアサーションを使うべき" },
      { vi: "Vì 5000ms luôn quá ngắn", en: "Because 5000ms is always too short", ja: "5000msは常に短すぎるから" },
      { vi: "Vì waitForTimeout chỉ chạy trên Firefox", en: "Because waitForTimeout only runs on Firefox", ja: "waitForTimeoutはFirefoxでしか動かないから" }
    ],
    answer: 1,
    exp: { vi: "Playwright có auto-waiting: expect và các action tự chờ điều kiện; wait cứng vừa lãng phí thời gian vừa không đáng tin. Nên chờ theo trạng thái, không theo đồng hồ.", en: "Playwright auto-waits: expects and actions wait for conditions; hard waits waste time and are unreliable. Wait on state, not the clock.", ja: "Playwrightは自動待機を持ち、expectやアクションが条件を待つ。固定待機は時間を浪費し信頼できない。時計ではなく状態で待つべき。" } },

  { cat: "iv-playwright",
    q: { vi: "Cơ chế nào của Playwright giúp mỗi test độc lập, không rò rỉ cookie/localStorage giữa các test?",
        en: "Which Playwright mechanism keeps each test isolated so cookies/localStorage don't leak between tests?",
        ja: "各テストを分離し、クッキーやlocalStorageがテスト間で漏れないようにするPlaywrightの仕組みはどれですか。" },
    options: [
      { vi: "Playwright xóa toàn bộ ổ cứng sau mỗi test", en: "Playwright wipes the entire disk after each test", ja: "Playwrightは各テスト後にディスク全体を消去する" },
      { vi: "Bằng cách khởi động lại máy tính giữa các test", en: "By rebooting the computer between tests", ja: "テスト間にPCを再起動することで" },
      { vi: "Mỗi test chạy trong một browser context riêng biệt, cô lập trạng thái phiên", en: "Each test runs in a separate browser context, isolating session state", ja: "各テストは独立したブラウザコンテキストで実行され、セッション状態を分離する" },
      { vi: "Không có cơ chế nào, phải tự xóa cookie thủ công", en: "There's none, you must clear cookies manually", ja: "仕組みはなく、手動でクッキーを消す必要がある" }
    ],
    answer: 2,
    exp: { vi: "Browser context giống một phiên trình duyệt sạch, cách ly cookie, storage, cache; đây là nền tảng giúp test song song và độc lập, tránh nhiễm chéo trạng thái.", en: "A browser context is like a fresh browser session isolating cookies, storage and cache; it's the foundation for parallel, independent tests without state cross-contamination.", ja: "ブラウザコンテキストはクッキー・ストレージ・キャッシュを分離した新品のブラウザセッションのようなもの。並列で独立したテストの基盤で状態の相互汚染を防ぐ。" } },

  { cat: "iv-playwright",
    q: { vi: "Khi test đăng nhập lặp lại tốn thời gian, kỹ thuật nào của Playwright giúp tái sử dụng trạng thái đã đăng nhập cho nhiều test?",
        en: "When repeated logins waste time, which Playwright technique reuses an authenticated state across many tests?",
        ja: "繰り返しのログインが時間を浪費する場合、認証済み状態を多数のテストで再利用するPlaywrightの手法はどれですか。" },
    options: [
      { vi: "Hardcode mật khẩu vào từng file test", en: "Hardcode the password into every test file", ja: "各テストファイルにパスワードをハードコードする" },
      { vi: "Tắt xác thực trên môi trường production", en: "Disable authentication in production", ja: "本番環境で認証を無効化する" },
      { vi: "Dùng waitForTimeout để chờ đăng nhập xong", en: "Use waitForTimeout to wait for login", ja: "waitForTimeoutでログイン完了を待つ" },
      { vi: "Ghi lại và tái dùng storageState (cookie + localStorage) qua các test, thường thiết lập trong global setup", en: "Save and reuse storageState (cookies + localStorage) across tests, typically set up in a global setup", ja: "storageState(クッキー+localStorage)を保存しテスト間で再利用し、通常はグローバルセットアップで用意する" }
    ],
    answer: 3,
    exp: { vi: "storageState lưu trạng thái phiên sau khi đăng nhập một lần rồi nạp lại cho các test khác, tiết kiệm thời gian và giảm phụ thuộc vào UI login lặp lại.", en: "storageState saves the session after one login and loads it into other tests, saving time and reducing dependence on repeated login UI.", ja: "storageStateは一度ログインしたセッションを保存し他のテストへ読み込む。時間を節約し繰り返すログインUIへの依存を減らす。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong CI, test Playwright pass ở máy local nhưng fail trên pipeline. Nguyên nhân nào là hợp lý và cách chẩn đoán tốt nhất?",
        en: "In CI, a Playwright test passes locally but fails on the pipeline. What is a plausible cause and the best way to diagnose it?",
        ja: "CIで、Playwrightテストがローカルでは成功するがパイプラインで失敗します。妥当な原因と最良の診断方法はどれですか。" },
    options: [
      { vi: "Khác biệt môi trường (viewport, timezone, tốc độ máy, dữ liệu, headless); dùng trace, video, screenshot on-failure của Playwright để chẩn đoán", en: "Environment differences (viewport, timezone, machine speed, data, headless); use Playwright trace, video and screenshot-on-failure to diagnose", ja: "環境差(ビューポート、タイムゾーン、マシン速度、データ、ヘッドレス)。Playwrightのトレース・動画・失敗時スクリーンショットで診断する" },
      { vi: "CI luôn hỏng ngẫu nhiên, không cần điều tra", en: "CI just fails randomly, no need to investigate", ja: "CIはランダムに壊れるだけで調査不要" },
      { vi: "Xóa test đó khỏi CI để pipeline xanh", en: "Delete the test from CI so the pipeline goes green", ja: "パイプラインをグリーンにするためCIからそのテストを削除する" },
      { vi: "Chỉ chạy test trên máy local mãi mãi", en: "Only ever run tests locally", ja: "テストは永遠にローカルでだけ実行する" }
    ],
    answer: 0,
    exp: { vi: "Sai khác local/CI thường do môi trường; Playwright cung cấp trace viewer, video, screenshot khi fail để tái dựng chính xác điều gì đã xảy ra trên CI, không nên che giấu.", en: "Local/CI divergence is usually environmental; Playwright's trace viewer, video and failure screenshots reconstruct exactly what happened on CI—don't hide it.", ja: "ローカルとCIの差は多くが環境要因。Playwrightのトレースビューア・動画・失敗時スクショでCI上で何が起きたか正確に再構築できる。隠すべきではない。" } },

  { cat: "iv-playwright",
    q: { vi: "Vì sao web-first assertion như await expect(locator).toBeVisible() tốt hơn expect(await locator.isVisible()).toBe(true)?",
        en: "Why is a web-first assertion like await expect(locator).toBeVisible() better than expect(await locator.isVisible()).toBe(true)?",
        ja: "なぜ await expect(locator).toBeVisible() のようなweb-firstアサーションは expect(await locator.isVisible()).toBe(true) より良いのですか。" },
    options: [
      { vi: "Vì cách thứ hai không biên dịch được", en: "Because the second form won't compile", ja: "2つ目の書き方はコンパイルできないから" },
      { vi: "Vì web-first assertion tự động retry cho đến khi điều kiện đúng hoặc hết timeout, giảm flaky; cách kia chỉ chụp trạng thái một lần", en: "Because web-first assertions auto-retry until the condition holds or times out, reducing flakiness; the other captures state only once", ja: "web-firstアサーションは条件が成立するかタイムアウトするまで自動再試行しフレーキーを減らす。もう一方は状態を一度だけ取得するから" },
      { vi: "Vì toBeVisible chạy trên server", en: "Because toBeVisible runs on the server", ja: "toBeVisibleはサーバー上で動くから" },
      { vi: "Vì isVisible không tồn tại trong Playwright", en: "Because isVisible doesn't exist in Playwright", ja: "isVisibleはPlaywrightに存在しないから" }
    ],
    answer: 1,
    exp: { vi: "Web-first assertion polling lại điều kiện trong khoảng timeout nên chịu được độ trễ render/mạng; đọc isVisible một lần dễ fail nếu phần tử chưa kịp xuất hiện.", en: "Web-first assertions poll the condition within the timeout, tolerating render/network delay; reading isVisible once fails if the element hasn't appeared yet.", ja: "web-firstアサーションはタイムアウト内で条件をポーリングし描画/回線遅延に耐える。isVisibleを一度読むと要素が未表示だと失敗しやすい。" } },

  { cat: "iv-playwright",
    q: { vi: "Đội muốn test một luồng phụ thuộc API bên thứ ba hay chập chờn. Cách tiếp cận ổn định nhất trong Playwright là gì?",
        en: "The team wants to test a flow depending on a flaky third-party API. What is the most stable Playwright approach?",
        ja: "チームが不安定なサードパーティAPIに依存するフローをテストしたいです。Playwrightで最も安定した方法はどれですか。" },
    options: [
      { vi: "Gọi thẳng API thật mỗi lần chạy và hy vọng nó luôn hoạt động", en: "Always hit the real API and hope it stays up", ja: "毎回本物のAPIを叩き常に稼働していることを願う" },
      { vi: "Bỏ hoàn toàn việc test luồng đó", en: "Skip testing that flow entirely", ja: "そのフローのテストを完全に省く" },
      { vi: "Dùng page.route để mock/stub phản hồi mạng, kiểm soát dữ liệu và loại bỏ phụ thuộc bên ngoài không ổn định", en: "Use page.route to mock/stub network responses, controlling data and removing the unstable external dependency", ja: "page.route でネットワーク応答をモック/スタブし、データを制御して不安定な外部依存を排除する" },
      { vi: "Chỉ test khi API bên thứ ba đang online", en: "Only test when the third-party API is online", ja: "サードパーティAPIがオンラインのときだけテストする" }
    ],
    answer: 2,
    exp: { vi: "page.route cho phép chặn và giả lập response, giúp test luồng UI ổn định và tái hiện được cả trường hợp lỗi, không phụ thuộc dịch vụ ngoài chập chờn.", en: "page.route lets you intercept and fake responses, making the UI flow stable and letting you reproduce error cases without depending on a flaky external service.", ja: "page.route は応答を横取りして偽装でき、UIフローを安定させエラーケースも再現できる。不安定な外部サービスに依存しない。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong cấu hình CI, vì sao thường bật retries cho test nhưng đồng thời theo dõi tỷ lệ retry?",
        en: "In CI config, why is it common to enable test retries yet also monitor the retry rate?",
        ja: "CI設定で、なぜテストのリトライを有効にしつつ、同時にリトライ率を監視するのが一般的ですか。" },
    options: [
      { vi: "Retry làm test luôn pass nên không cần sửa gì", en: "Retries make tests always pass so nothing needs fixing", ja: "リトライでテストは常に成功するので何も直さなくてよい" },
      { vi: "Retry rate cao là điều tốt, càng cao càng ổn định", en: "A high retry rate is good, the higher the more stable", ja: "高いリトライ率は良いことで、高いほど安定する" },
      { vi: "Retry chỉ dùng để làm chậm pipeline có chủ đích", en: "Retries exist only to intentionally slow the pipeline", ja: "リトライは意図的にパイプラインを遅くするためだけにある" },
      { vi: "Retry giúp giảm nhiễu do sự cố hạ tầng tạm thời, nhưng retry rate cao là tín hiệu cảnh báo có flaky test cần điều tra", en: "Retries reduce noise from transient infra issues, but a high retry rate signals flaky tests that need investigation", ja: "リトライは一時的なインフラ障害のノイズを減らすが、高いリトライ率は調査すべきフレーキーテストの警告信号である" }
    ],
    answer: 3,
    exp: { vi: "Retry là lưới an toàn cho sự cố nhất thời, nhưng nếu dựa vào retry để che flaky thì nợ kỹ thuật tích tụ; theo dõi tỷ lệ retry giúp phát hiện và xử lý gốc.", en: "Retries are a safety net for transient failures, but leaning on them to mask flakiness accrues tech debt; monitoring the retry rate surfaces and drives root-cause fixes.", ja: "リトライは一時障害の安全網だが、フレーキー隠しに頼ると技術的負債が溜まる。リトライ率の監視で問題を可視化し根本対処を促す。" } },

  { cat: "iv-playwright",
    q: { vi: "Bạn cần chạy cùng một bộ test trên Chromium, Firefox và WebKit. Cách làm đúng trong Playwright là gì?",
        en: "You need to run the same suite on Chromium, Firefox and WebKit. What is the right way in Playwright?",
        ja: "同じスイートをChromium・Firefox・WebKitで実行する必要があります。Playwrightで正しい方法はどれですか。" },
    options: [
      { vi: "Khai báo nhiều projects trong playwright.config với các browser khác nhau để tái sử dụng cùng một bộ test", en: "Declare multiple projects in playwright.config with different browsers to reuse the same suite", ja: "playwright.config に異なるブラウザの複数プロジェクトを宣言し、同じスイートを再利用する" },
      { vi: "Viết lại toàn bộ test ba lần cho từng trình duyệt", en: "Rewrite the entire suite three times, one per browser", ja: "各ブラウザ用にスイート全体を3回書き直す" },
      { vi: "Chỉ chạy Chromium vì các trình duyệt khác giống hệt", en: "Only run Chromium since other browsers are identical", ja: "他ブラウザは同一なのでChromiumだけ実行する" },
      { vi: "Cài ba máy tính khác nhau cho ba trình duyệt", en: "Set up three separate computers for three browsers", ja: "3ブラウザ用に別々のPCを3台用意する" }
    ],
    answer: 0,
    exp: { vi: "Playwright hỗ trợ cấu hình projects: cùng một mã test chạy trên nhiều engine trình duyệt qua cấu hình, tránh trùng lặp và bảo đảm phủ đa trình duyệt.", en: "Playwright supports projects config: the same test code runs across multiple browser engines via configuration, avoiding duplication and ensuring cross-browser coverage.", ja: "Playwrightはprojects設定に対応。同じテストコードを設定で複数のブラウザエンジンで実行でき、重複を避けクロスブラウザのカバレッジを保証する。" } },

  { cat: "iv-playwright",
    q: { vi: "Trace viewer của Playwright chủ yếu dùng để làm gì khi một test fail?",
        en: "What is the Playwright trace viewer primarily used for when a test fails?",
        ja: "テストが失敗したとき、Playwrightのトレースビューアは主に何のために使いますか。" },
    options: [
      { vi: "Để tự động sửa mã nguồn sản phẩm cho hết lỗi", en: "To automatically fix the product source code so the bug disappears", ja: "製品のソースコードを自動修正してバグをなくすため" },
      { vi: "Để xem lại từng bước hành động, DOM snapshot, network và ảnh chụp nhằm phân tích chính xác nguyên nhân test fail sau khi chạy", en: "To replay each action step, DOM snapshots, network and screenshots to analyze exactly why the test failed after the run", ja: "実行後に各アクションのステップ、DOMスナップショット、ネットワーク、スクリーンショットを再生し、失敗の原因を正確に分析するため" },
      { vi: "Để tăng tốc độ chạy test lên gấp đôi", en: "To double the test execution speed", ja: "テスト実行速度を2倍にするため" },
      { vi: "Để viết test case mới thay cho tester", en: "To write new test cases in place of the tester", ja: "テスターの代わりに新しいテストケースを書くため" }
    ],
    answer: 1,
    exp: { vi: "Trace viewer ghi lại timeline hành động, snapshot DOM trước/sau, log mạng và console; nó là công cụ hậu kiểm mạnh để hiểu vì sao test fail, đặc biệt hữu ích với lỗi chỉ xảy ra trên CI.", en: "The trace viewer records an action timeline, before/after DOM snapshots, and network and console logs; it is a powerful post-mortem tool to understand why a test failed, especially for CI-only failures.", ja: "トレースビューアはアクションのタイムライン、前後のDOMスナップショット、ネットワークやコンソールのログを記録する。テスト失敗の原因を理解する強力な事後解析ツールで、特にCI限定の失敗に有用である。" } },

  // ================= iv-ai (10) — answers: 2,3,0,1,2,3,0,1,2,3 =================
  { cat: "iv-ai",
    q: { vi: "Khi dùng AI sinh test case, rủi ro lớn nhất mà một tester chuyên nghiệp phải luôn cảnh giác là gì?",
        en: "When using AI to generate test cases, what is the biggest risk a professional tester must always guard against?",
        ja: "AIでテストケースを生成する際、プロのテスターが常に警戒すべき最大のリスクは何ですか。" },
    options: [
      { vi: "AI viết test case quá đẹp nên nhàm chán", en: "AI writes cases too nicely, making them boring", ja: "AIがきれいに書きすぎてつまらないこと" },
      { vi: "AI làm test case chạy chậm hơn", en: "AI makes test cases run slower", ja: "AIはテストケースの実行を遅くする" },
      { vi: "AI có thể bịa (hallucinate) hành vi không có thật, bỏ sót case biên/nghiệp vụ đặc thù; con người phải review và xác thực trước khi tin", en: "AI can hallucinate nonexistent behavior and miss boundary/domain-specific cases; a human must review and validate before trusting", ja: "AIは実在しない挙動を捏造(ハルシネーション)し、境界値やドメイン固有ケースを見落とすことがある。人間が信頼前にレビューし検証する必要がある" },
      { vi: "AI chỉ viết được test bằng tiếng Anh", en: "AI can only write tests in English", ja: "AIは英語でしかテストを書けない" }
    ],
    answer: 2,
    exp: { vi: "AI tăng tốc sinh ý tưởng nhưng không hiểu ngữ cảnh nghiệp vụ thật và có thể bịa; tester phải là người kiểm chứng cuối, không giao phó phán đoán chất lượng cho AI.", en: "AI speeds idea generation but doesn't grasp real business context and can fabricate; the tester must be the final validator, not delegating quality judgment to AI.", ja: "AIはアイデア生成を加速するが実際の業務文脈を理解できず捏造しうる。テスターが最終検証者であるべきで、品質判断をAIに委ねてはならない。" } },

  { cat: "iv-ai",
    q: { vi: "Phỏng vấn hỏi: 「AI thay thế được tester không?」 Câu trả lời thể hiện hiểu biết chín chắn nhất là gì?",
        en: "Interview question: Can AI replace testers? Which answer shows the most mature understanding?",
        ja: "面接質問「AIはテスターを置き換えられるか」。最も成熟した理解を示す回答はどれですか。" },
    options: [
      { vi: "AI thay thế hoàn toàn tester ngay lập tức, không cần con người", en: "AI fully replaces testers right now, no humans needed", ja: "AIは今すぐテスターを完全に置き換え、人間は不要になる" },
      { vi: "AI hoàn toàn vô dụng trong kiểm thử", en: "AI is completely useless in testing", ja: "AIはテストで完全に役立たずである" },
      { vi: "Tester chỉ cần bấm nút AI là xong mọi việc", en: "A tester just clicks the AI button and is done", ja: "テスターはAIボタンを押すだけで全てが終わる" },
      { vi: "AI là công cụ khuếch đại năng suất (sinh case, phân tích log, tóm tắt), nhưng phán đoán rủi ro, hiểu ngữ cảnh nghiệp vụ và trách nhiệm chất lượng vẫn thuộc con người", en: "AI amplifies productivity (generating cases, analyzing logs, summarizing), but risk judgment, business context understanding and quality accountability remain human", ja: "AIは生産性を増幅する道具(ケース生成、ログ分析、要約)だが、リスク判断・業務文脈の理解・品質への責任は人間に残る" }
    ],
    answer: 3,
    exp: { vi: "Quan điểm chín chắn xem AI là trợ lực nâng cao năng suất chứ không thay thế trách nhiệm; kỹ năng phán đoán, tư duy phản biện và hiểu nghiệp vụ vẫn là giá trị cốt lõi của tester.", en: "The mature view sees AI as a productivity boost, not a replacement for accountability; judgment, critical thinking and domain understanding remain the tester's core value.", ja: "成熟した見方はAIを生産性向上の補助と捉え、責任の代替とはしない。判断力・批判的思考・業務理解がテスターの中核的価値であり続ける。" } },

  { cat: "iv-ai",
    q: { vi: "Khi dán log lỗi sản phẩm vào một công cụ AI công cộng để nhờ phân tích, mối lo ngại quan trọng nhất là gì?",
        en: "When pasting product error logs into a public AI tool for analysis, what is the most important concern?",
        ja: "製品のエラーログを分析のため公開AIツールに貼り付ける際、最も重要な懸念は何ですか。" },
    options: [
      { vi: "Rò rỉ dữ liệu nhạy cảm/PII và bí mật hệ thống; phải ẩn danh, tuân thủ chính sách bảo mật trước khi chia sẻ", en: "Leaking sensitive data/PII and system secrets; you must anonymize and comply with security policy before sharing", ja: "機微データ/PIIやシステムの機密の漏洩。共有前に匿名化しセキュリティポリシーを遵守する必要がある" },
      { vi: "AI sẽ phân tích log quá nhanh", en: "The AI will analyze the log too fast", ja: "AIがログを速く分析しすぎること" },
      { vi: "Log quá dài AI không đọc hết", en: "The log is too long for the AI to read", ja: "ログが長すぎてAIが読み切れないこと" },
      { vi: "AI sẽ tự sửa lỗi mà không hỏi", en: "The AI will fix the bug without asking", ja: "AIが確認せずにバグを直してしまうこと" }
    ],
    answer: 0,
    exp: { vi: "Log có thể chứa token, thông tin cá nhân, cấu hình nội bộ; đưa vào công cụ công cộng có rủi ro rò rỉ và vi phạm tuân thủ, cần ẩn danh và theo đúng chính sách tổ chức.", en: "Logs can contain tokens, personal data and internal config; feeding them to a public tool risks leakage and compliance violations—anonymize and follow org policy.", ja: "ログにはトークン・個人情報・内部設定が含まれうる。公開ツールへ投入すると漏洩やコンプライアンス違反のリスクがある。匿名化し組織ポリシーに従うべき。" } },

  { cat: "iv-ai",
    q: { vi: "Đâu là cách dùng AI hợp lý nhất để tăng chất lượng bug report?",
        en: "What is the most reasonable way to use AI to improve bug report quality?",
        ja: "バグレポートの品質向上にAIを使う最も妥当な方法はどれですか。" },
    options: [
      { vi: "Nhờ AI tự bịa các bước tái hiện mà không cần kiểm chứng", en: "Have AI invent reproduction steps without verification", ja: "検証なしにAIに再現手順を捏造させる" },
      { vi: "Dùng AI hỗ trợ viết lại rõ ràng, gợi ý thông tin còn thiếu và chuẩn hóa cấu trúc, nhưng tester tự xác minh các bước thực tế", en: "Use AI to help reword clearly, suggest missing info and standardize structure, while the tester verifies the actual steps", ja: "AIで明確な言い換え・不足情報の提案・構造の標準化を支援しつつ、テスターが実際の手順を検証する" },
      { vi: "Để AI tự đóng bug nếu nó nghĩ là không quan trọng", en: "Let AI auto-close bugs it deems unimportant", ja: "重要でないとAIが判断したバグを自動クローズさせる" },
      { vi: "Dùng AI thay thế hoàn toàn việc tái hiện lỗi thật", en: "Use AI to fully replace actually reproducing the bug", ja: "実際のバグ再現をAIで完全に置き換える" }
    ],
    answer: 1,
    exp: { vi: "AI giỏi diễn đạt và nhắc trường thông tin còn thiếu, giúp report rõ ràng nhất quán; nhưng độ chính xác của bước tái hiện phải do tester kiểm chứng thực tế.", en: "AI is good at wording and prompting for missing fields, making reports clear and consistent; but the accuracy of reproduction steps must be verified by the tester in reality.", ja: "AIは言い回しや不足項目の指摘が得意でレポートを明確で一貫させる。ただし再現手順の正確さはテスターが実際に検証しなければならない。" } },

  { cat: "iv-ai",
    q: { vi: "Khi kiểm thử một tính năng dùng LLM (ví dụ chatbot), vì sao oracle (tiêu chí đúng/sai) khó xác định hơn phần mềm truyền thống?",
        en: "When testing an LLM-based feature (e.g. a chatbot), why is the oracle (correctness criterion) harder than in traditional software?",
        ja: "LLMを使う機能(例: チャットボット)をテストする際、なぜオラクル(正誤の基準)が従来ソフトより難しいのですか。" },
    options: [
      { vi: "Vì LLM luôn trả về đúng một kết quả cố định", en: "Because an LLM always returns one fixed result", ja: "LLMは常に一つの固定結果を返すから" },
      { vi: "Vì LLM không có đầu ra để kiểm tra", en: "Because an LLM has no output to check", ja: "LLMには検査する出力がないから" },
      { vi: "Vì đầu ra không xác định và mở: nhiều câu trả lời khác nhau có thể cùng đúng, nên cần đánh giá theo tiêu chí (đúng sự thật, an toàn, phù hợp) thay vì so khớp chính xác", en: "Because output is nondeterministic and open-ended: many different answers can be equally valid, so evaluate by criteria (factuality, safety, relevance) rather than exact match", ja: "出力が非決定的でオープンエンドだから。異なる複数の回答が同様に正しくありうるため、完全一致ではなく基準(事実性・安全性・関連性)で評価する必要がある" },
      { vi: "Vì chatbot không cần test", en: "Because chatbots don't need testing", ja: "チャットボットはテスト不要だから" }
    ],
    answer: 2,
    exp: { vi: "Phần mềm truyền thống có đầu ra kỳ vọng cố định; LLM cho nhiều đáp án hợp lệ, nên phải kiểm theo tập tiêu chí và dùng đánh giá tập/thống kê thay vì so khớp cứng.", en: "Traditional software has fixed expected output; LLMs produce many valid answers, so testing shifts to criteria-based and statistical/set evaluation rather than exact matching.", ja: "従来ソフトは固定の期待出力を持つが、LLMは有効な回答が複数ある。よって完全一致ではなく基準ベースや統計的/集合的評価へ移る。" } },

  { cat: "iv-ai",
    q: { vi: "Đội dùng AI để tự sinh dữ liệu test hàng loạt. Bẫy nào cần đặc biệt lưu ý về chất lượng dữ liệu này?",
        en: "The team uses AI to mass-generate test data. What pitfall about the quality of this data deserves special attention?",
        ja: "チームがAIでテストデータを大量生成します。このデータの品質に関して特に注意すべき落とし穴はどれですか。" },
    options: [
      { vi: "Dữ liệu AI luôn hoàn hảo và bao phủ mọi trường hợp", en: "AI data is always perfect and covers every case", ja: "AI生成データは常に完璧で全ケースを網羅する" },
      { vi: "Dữ liệu AI quá nhỏ nên vô dụng", en: "AI data is too small to be useful", ja: "AIデータは小さすぎて役立たない" },
      { vi: "Không có bẫy nào, cứ dùng thẳng là được", en: "No pitfalls, just use it directly", ja: "落とし穴はなく、そのまま使えばよい" },
      { vi: "Dữ liệu có thể thiếu đa dạng/case biên, mang định kiến, hoặc không phản ánh phân phối thực tế; cần kiểm tra tính đại diện và bổ sung case hiểm", en: "Data may lack diversity/edge cases, carry bias, or not reflect real distributions; check representativeness and add rare cases", ja: "データは多様性/境界値を欠き、バイアスを含み、実際の分布を反映しないことがある。代表性を確認し稀なケースを補う必要がある" }
    ],
    answer: 3,
    exp: { vi: "Dữ liệu sinh bởi AI dễ 「trơn」 và thiếu case hiểm/độ đa dạng, có thể kế thừa thiên lệch của mô hình; phải đánh giá độ đại diện và chủ động bổ sung biên và ngoại lệ.", en: "AI-generated data tends to be smooth, lacking rare cases and diversity, and can inherit model bias; assess representativeness and deliberately add boundaries and outliers.", ja: "AI生成データは平坦になりがちで稀ケースや多様性を欠き、モデルのバイアスを継ぐことがある。代表性を評価し境界や外れ値を意図的に補う。" } },

  { cat: "iv-ai",
    q: { vi: "Một AI đề xuất rằng 「toàn bộ test cũ đều thừa, xóa đi để pipeline nhanh hơn」. Cách hành xử đúng của tester là gì?",
        en: "An AI suggests all your old tests are redundant, delete them to speed up the pipeline. What is the tester's correct response?",
        ja: "AIが「古いテストは全部冗長だから削除してパイプラインを速くせよ」と提案します。テスターの正しい対応はどれですか。" },
    options: [
      { vi: "Coi đề xuất là giả thuyết cần kiểm chứng: phân tích độ phủ, lịch sử phát hiện bug và rủi ro trước khi quyết định giữ hay bỏ từng test", en: "Treat the suggestion as a hypothesis to verify: analyze coverage, bug-catching history and risk before deciding to keep or drop each test", ja: "提案を検証すべき仮説とみなす。各テストのカバレッジ・バグ検出履歴・リスクを分析してから残すか外すか判断する" },
      { vi: "Xóa ngay tất cả vì AI thông minh hơn con người", en: "Delete everything immediately since AI is smarter than humans", ja: "AIは人間より賢いのですぐ全部削除する" },
      { vi: "Bỏ qua hoàn toàn mọi gợi ý của AI mãi mãi", en: "Ignore all AI suggestions forever", ja: "AIの提案を永遠に完全に無視する" },
      { vi: "Chuyển quyền xóa test cho AI tự quyết", en: "Hand the delete decision entirely to the AI", ja: "テスト削除の判断をAIに全面的に委ねる" }
    ],
    answer: 0,
    exp: { vi: "Gợi ý của AI có thể hữu ích nhưng không được thi hành mù quáng; xóa test là hành động rủi ro cao cần dựa trên bằng chứng về độ phủ và lịch sử bắt lỗi, do con người quyết định.", en: "AI suggestions can help but must not be executed blindly; deleting tests is high-risk and requires evidence on coverage and bug history, decided by a human.", ja: "AIの提案は有用でも盲目的に実行してはならない。テスト削除は高リスクで、カバレッジやバグ検出履歴の証拠に基づき人間が判断する必要がある。" } },

  { cat: "iv-ai",
    q: { vi: "Trong kiểm thử AI, 「prompt injection」 là loại lỗ hổng cần test. Mô tả đúng nhất về nó là gì?",
        en: "In AI testing, prompt injection is a vulnerability to test for. Which is the most accurate description?",
        ja: "AIのテストで、プロンプトインジェクションはテストすべき脆弱性です。最も正確な説明はどれですか。" },
    options: [
      { vi: "Là kỹ thuật giúp AI trả lời nhanh hơn", en: "A technique to make the AI answer faster", ja: "AIの応答を速くする技術" },
      { vi: "Là khi đầu vào của người dùng được thiết kế để ghi đè/lách chỉ dẫn hệ thống, khiến AI làm điều không được phép hoặc rò rỉ thông tin", en: "When user input is crafted to override or bypass system instructions, making the AI do disallowed actions or leak information", ja: "ユーザー入力が細工され、システム指示を上書き/回避してAIに許可されない動作や情報漏洩をさせること" },
      { vi: "Là lỗi chính tả trong prompt của lập trình viên", en: "A typo in the developer's prompt", ja: "開発者のプロンプトの誤字" },
      { vi: "Là việc dịch prompt sang ngôn ngữ khác", en: "Translating a prompt into another language", ja: "プロンプトを他言語へ翻訳すること" }
    ],
    answer: 1,
    exp: { vi: "Prompt injection tương tự injection kinh điển: dữ liệu người dùng bị lợi dụng để thao túng chỉ dẫn hệ thống; tester cần thiết kế case tấn công thử bỏ qua ràng buộc và rò rỉ dữ liệu.", en: "Prompt injection is akin to classic injection: user data manipulates system instructions; testers should design attack cases attempting to bypass constraints and leak data.", ja: "プロンプトインジェクションは古典的インジェクションに似て、ユーザーデータでシステム指示を操作する。テスターは制約回避やデータ漏洩を試みる攻撃ケースを設計すべき。" } },

  { cat: "iv-ai",
    q: { vi: "Khi AI hỗ trợ tự động phân loại (triage) bug, vì sao vẫn cần con người giám sát (human-in-the-loop)?",
        en: "When AI assists in automated bug triage, why is human oversight (human-in-the-loop) still needed?",
        ja: "AIがバグの自動トリアージを支援する際、なぜ依然として人間の監督(human-in-the-loop)が必要ですか。" },
    options: [
      { vi: "Vì AI không thể đọc được tiếng Việt", en: "Because AI cannot read Vietnamese", ja: "AIはベトナム語を読めないから" },
      { vi: "Vì AI phân loại quá chậm so với con người", en: "Because AI triages much slower than humans", ja: "AIは人間よりずっと遅くトリアージするから" },
      { vi: "Vì AI có thể phân loại sai mức độ ưu tiên do thiếu ngữ cảnh nghiệp vụ; con người xác nhận các quyết định rủi ro cao và chịu trách nhiệm cuối cùng", en: "Because AI can misclassify priority due to lacking business context; humans confirm high-risk decisions and hold final accountability", ja: "AIは業務文脈を欠くため優先度を誤分類しうる。人間が高リスクの判断を確認し最終責任を負うから" },
      { vi: "Vì con người thích tự làm mọi thứ bằng tay", en: "Because humans just prefer doing everything manually", ja: "人間は何でも手作業でやりたがるから" }
    ],
    answer: 2,
    exp: { vi: "AI tăng tốc phân loại nhưng thiếu hiểu biết ngữ cảnh và có thể sai ở ca hiếm; giữ con người trong vòng lặp bảo đảm các quyết định rủi ro cao được kiểm chứng và có người chịu trách nhiệm.", en: "AI speeds triage but lacks contextual understanding and can err on rare cases; keeping humans in the loop ensures high-risk decisions are verified and owned.", ja: "AIはトリアージを加速するが文脈理解を欠き稀ケースで誤りうる。人間を関与させることで高リスク判断が検証され責任の所在が保たれる。" } },

  { cat: "iv-ai",
    q: { vi: "Nhà tuyển dụng hỏi: 「Làm sao bạn đảm bảo output của AI trong test là đáng tin?」 Nguyên tắc đúng nhất là gì?",
        en: "The interviewer asks: How do you ensure AI output in testing is trustworthy? What is the soundest principle?",
        ja: "面接官が「テストにおけるAIの出力の信頼性をどう担保するか」と聞きます。最も健全な原則はどれですか。" },
    options: [
      { vi: "Tin tuyệt đối vào AI vì nó không bao giờ sai", en: "Trust AI absolutely because it never errs", ja: "AIは決して間違えないので絶対的に信頼する" },
      { vi: "Không bao giờ dùng AI trong bất kỳ hoàn cảnh nào", en: "Never use AI under any circumstance", ja: "いかなる状況でもAIを一切使わない" },
      { vi: "Giao toàn bộ quyết định chất lượng cho AI để tránh sai sót con người", en: "Delegate all quality decisions to AI to avoid human error", ja: "人的ミスを避けるため品質判断を全てAIに委ねる" },
      { vi: "Áp dụng nguyên tắc 「tin nhưng phải kiểm chứng」: đối chiếu chéo với nguồn xác thực, kiểm tra mẫu, đo lường và giữ tester chịu trách nhiệm ra quyết định", en: "Apply verify-what-you-trust: cross-check against authoritative sources, sample-review, measure, and keep the tester accountable for decisions", ja: "「信頼するが検証する」原則を適用: 権威ある情報源と突き合わせ、サンプル検査し、計測し、判断の責任はテスターが保持する" }
    ],
    answer: 3,
    exp: { vi: "Cách tiếp cận đúng đắn là dùng AI như trợ lý nhưng luôn kiểm chứng đầu ra bằng nguồn tin cậy và đánh giá mẫu; trách nhiệm cuối về chất lượng vẫn thuộc con người.", en: "The sound approach uses AI as an assistant while always validating output against trusted sources and sampling; final accountability for quality stays with the human.", ja: "健全な方法はAIを補助として使いつつ、出力を信頼できる情報源やサンプルで常に検証すること。品質の最終責任は人間に残る。" } }
];
