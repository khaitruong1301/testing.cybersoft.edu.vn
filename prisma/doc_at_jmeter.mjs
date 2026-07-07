// ============================================================================
// AT_JMETER — 2 bài SÂU về Apache JMeter (load testing), trilingual VI/EN/JA.
// A: at-jmeter-load-foundation (congnghe · telecom) — dựng test plan từ đầu.
// B: at-jmeter-distributed-advanced (nangcao · banking) — scale phân tán, tuning.
// JA thật, khác EN. Block types khớp ArticleViewer & verify.mjs.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// SVG helpers (hand-drawn, viewBox 0 0 720 220, dark bg #0f172a)
// ---------------------------------------------------------------------------
const SVG_TESTPLAN_TREE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Cây Test Plan JMeter · thứ tự thực thi từ trên xuống</text>
<rect x="30" y="42" width="170" height="30" rx="6" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="115" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="#e0f2fe">Test Plan</text>
<rect x="70" y="82" width="220" height="28" rx="6" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="180" y="101" text-anchor="middle" font-size="11.5" fill="#ccfbf1">Thread Group (users · ramp-up · loops)</text>
<rect x="110" y="120" width="240" height="24" rx="5" fill="#1e293b" stroke="#64748b"/>
<text x="230" y="137" text-anchor="middle" font-size="10.5" fill="#cbd5e1">HTTP Request Defaults · CSV Data Set Config</text>
<rect x="110" y="150" width="240" height="24" rx="5" fill="#1e293b" stroke="#64748b"/>
<text x="230" y="167" text-anchor="middle" font-size="10.5" fill="#cbd5e1">HTTP Request Sampler → /login /balance</text>
<rect x="110" y="180" width="240" height="24" rx="5" fill="#1e293b" stroke="#64748b"/>
<text x="230" y="197" text-anchor="middle" font-size="10.5" fill="#cbd5e1">Timer · Response Assertion · Listener</text>
<g stroke="#94a3b8" stroke-width="1.6" fill="none"><path d="M115 72 v10 h65"/><path d="M180 110 v10 h-70"/></g>
<rect x="410" y="60" width="280" height="140" rx="10" fill="#0b1220" stroke="#334155"/>
<text x="550" y="84" text-anchor="middle" font-size="12" font-weight="800" fill="#fbbf24">Config → Sampler → Timer → Assertion → Listener</text>
<text x="550" y="108" text-anchor="middle" font-size="10.5" fill="#7dd3fc">Config Elements áp trước khi Sampler chạy</text>
<text x="550" y="128" text-anchor="middle" font-size="10.5" fill="#5eead4">Timer chèn think-time giữa các request</text>
<text x="550" y="148" text-anchor="middle" font-size="10.5" fill="#a5b4fc">Assertion quyết định pass/fail</text>
<text x="550" y="168" text-anchor="middle" font-size="10.5" fill="#fca5a5">Listener thu kết quả (.jtl) — tắt trong load thật</text>
<text x="550" y="188" text-anchor="middle" font-size="10" fill="#64748b">1 JVM = 1 tiến trình, mỗi thread = 1 user ảo</text>
</svg>`;

const SVG_PERCENTILE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Vì sao đọc p90/p95/p99 thay vì trung bình</text>
<line x1="60" y1="170" x2="680" y2="170" stroke="#475569" stroke-width="1.5"/>
<line x1="60" y1="60" x2="60" y2="170" stroke="#475569" stroke-width="1.5"/>
<path d="M60 168 C160 165 240 150 320 120 C380 96 430 90 470 130 C510 168 540 168 560 168 C600 168 640 168 680 168" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
<line x1="300" y1="60" x2="300" y2="170" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="300" y="52" text-anchor="middle" font-size="10.5" fill="#6ee7b7">avg 120ms</text>
<line x1="470" y1="60" x2="470" y2="170" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="470" y="52" text-anchor="middle" font-size="10.5" fill="#fde68a">p95 480ms</text>
<line x1="600" y1="60" x2="600" y2="170" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="600" y="52" text-anchor="middle" font-size="10.5" fill="#fca5a5">p99 1.8s</text>
<text x="360" y="196" text-anchor="middle" font-size="11" fill="#cbd5e1">Trung bình che đuôi chậm; SLA cam kết theo p95/p99 mới phản ánh trải nghiệm thật</text>
</svg>`;

const SVG_DISTRIBUTED = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Distributed testing · master (client) điều phối slaves (servers)</text>
<rect x="290" y="44" width="150" height="52" rx="9" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="365" y="66" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Master</text>
<text x="365" y="84" text-anchor="middle" font-size="10" fill="#7dd3fc">-r · phát .jmx · gom kết quả</text>
<rect x="60" y="140" width="150" height="52" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="135" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">Slave 1 (jmeter-server)</text>
<text x="135" y="180" text-anchor="middle" font-size="10" fill="#5eead4">1000 threads</text>
<rect x="285" y="140" width="150" height="52" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="360" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">Slave 2</text>
<text x="360" y="180" text-anchor="middle" font-size="10" fill="#5eead4">1000 threads</text>
<rect x="510" y="140" width="150" height="52" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="585" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">Slave 3</text>
<text x="585" y="180" text-anchor="middle" font-size="10" fill="#5eead4">1000 threads</text>
<g stroke="#fbbf24" stroke-width="2" fill="none" stroke-dasharray="5 4"><path d="M330 96 L135 140"/><path d="M365 96 L360 140"/><path d="M400 96 L585 140"/></g>
<text x="360" y="126" text-anchor="middle" font-size="10.5" fill="#fde68a">RMI port 1099/1098 · mỗi thread nhân theo số slave = 3000 users ảo</text>
</svg>`;

const SVG_CORRELATION = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Correlation · bắt token động rồi tái sử dụng</text>
<rect x="40" y="50" width="200" height="60" rx="9" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="140" y="74" text-anchor="middle" font-size="12" font-weight="700" fill="#e0f2fe">POST /login</text>
<text x="140" y="94" text-anchor="middle" font-size="10" fill="#7dd3fc">response: {"token":"eyJ..."}</text>
<rect x="270" y="50" width="200" height="60" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="370" y="74" text-anchor="middle" font-size="12" font-weight="700" fill="#e0e7ff">JSON Extractor</text>
<text x="370" y="94" text-anchor="middle" font-size="10" fill="#a5b4fc">$.token → \${authToken}</text>
<rect x="500" y="50" width="200" height="60" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="600" y="74" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">GET /account/balance</text>
<text x="600" y="94" text-anchor="middle" font-size="10" fill="#5eead4">Header: Bearer \${authToken}</text>
<g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arc)"><path d="M240 80 h30"/><path d="M470 80 h30"/></g>
<defs><marker id="arc" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="120" y="140" width="480" height="56" rx="9" fill="#0b1220" stroke="#f59e0b" stroke-width="1.6"/>
<text x="360" y="164" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fbbf24">Hard-code token = 401 khi token hết hạn → phải trích xuất động mỗi phiên</text>
<text x="360" y="184" text-anchor="middle" font-size="10.5" fill="#94a3b8">Biến JMeter (\${var}) là scope-per-thread: mỗi user ảo giữ token riêng</text>
</svg>`;

// ============================================================================
// BÀI 1 — at-jmeter-load-foundation
// ============================================================================
const pages1 = [
  {
    heading: {
      vi: "1. JMeter là gì và khi nào cần load testing",
      en: "1. What JMeter is and when you need load testing",
      ja: "1. JMeterとは何か、いつ負荷テストが必要か",
    },
    blocks: [
      P(
        "Apache JMeter là công cụ mã nguồn mở của Apache Software Foundation, viết bằng Java, dùng để đo hiệu năng và độ chịu tải của ứng dụng. Ban đầu JMeter sinh ra để kiểm thử web nhưng nay hỗ trợ HTTP/HTTPS, REST/SOAP, JDBC (cơ sở dữ liệu), JMS, FTP, gRPC qua plugin và nhiều giao thức khác. Với một nhà mạng viễn thông, khi hàng triệu thuê bao đồng loạt tra cứu cước hay nạp thẻ vào đầu tháng, câu hỏi không phải 'chức năng có chạy không' mà là 'hệ thống chịu được bao nhiêu người cùng lúc trước khi chậm hoặc sập'. Đó chính là bài toán load testing mà JMeter giải quyết.",
        "Apache JMeter is an open-source tool from the Apache Software Foundation, written in Java, used to measure the performance and load capacity of applications. JMeter was born to test the web but now supports HTTP/HTTPS, REST/SOAP, JDBC (databases), JMS, FTP, gRPC via plugins and many other protocols. For a telecom carrier, when millions of subscribers simultaneously check charges or top up at the start of the month, the question is not 'does the feature work' but 'how many concurrent users can the system withstand before it slows or crashes'. That is exactly the load-testing problem JMeter solves.",
        "Apache JMeterはApache Software Foundationが提供するオープンソースツールで、Javaで書かれ、アプリケーションの性能と負荷耐性を測定します。当初はWebテスト用でしたが、現在はHTTP/HTTPS、REST/SOAP、JDBC（データベース）、JMS、FTP、プラグイン経由のgRPCなど多くのプロトコルに対応します。通信キャリアでは、月初に数百万人の加入者が同時に料金照会やチャージを行うとき、問われるのは「機能が動くか」ではなく「システムが遅延やダウンする前に何人の同時利用に耐えられるか」です。これこそJMeterが解決する負荷テストの課題です。",
      ),
      P(
        "Cần phân biệt các loại kiểm thử hiệu năng: load test đo hành vi ở tải kỳ vọng; stress test đẩy quá giới hạn để tìm điểm gãy; spike test mô phỏng tăng đột ngột; soak (endurance) test chạy dài để phát hiện rò rỉ bộ nhớ. JMeter làm được cả bốn nhờ điều chỉnh số luồng, thời gian ramp-up và độ dài phiên. Người mới hay nhầm 'chạy 100 request' với 'load test', nhưng load test thật cần mô phỏng người dùng đồng thời (concurrency) kèm think-time thực tế, dữ liệu đa dạng và tiêu chí pass/fail rõ ràng theo SLA.",
        "It is important to distinguish performance test types: a load test measures behaviour at expected load; a stress test pushes past limits to find the breaking point; a spike test simulates sudden surges; a soak (endurance) test runs long to reveal memory leaks. JMeter does all four by tuning thread count, ramp-up time and session length. Beginners confuse 'fire 100 requests' with a 'load test', but a real load test needs to simulate concurrent users with realistic think-time, varied data and clear pass/fail criteria per the SLA.",
        "性能テストの種類を区別することが重要です。負荷テストは期待負荷での挙動を測り、ストレステストは限界を超えて破綻点を探し、スパイクテストは急増を模擬し、ソーク（耐久）テストは長時間実行してメモリリークを発見します。JMeterはスレッド数、ランプアップ時間、セッション長を調整することで四つすべてを実現します。初心者は「100リクエストを送る」ことを「負荷テスト」と混同しますが、本物の負荷テストは現実的なシンクタイム、多様なデータ、SLAに沿った明確な合否基準を伴う同時ユーザーの模擬が必要です。",
      ),
      NOTE(
        "JMeter là công cụ tạo tải phía client. Nó không thay thế APM (Application Performance Monitoring) phía server — bạn vẫn cần Grafana/Prometheus, log server để biết CPU, heap, số kết nối DB khi tải cao.",
        "JMeter is a client-side load generator. It does not replace server-side APM (Application Performance Monitoring) — you still need Grafana/Prometheus and server logs to see CPU, heap and DB connections under load.",
        "JMeterはクライアント側の負荷生成ツールです。サーバー側のAPM（アプリケーション性能監視）を代替しません。高負荷時のCPU、ヒープ、DB接続数を知るにはGrafana/Prometheusやサーバーログが依然必要です。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Giải phẫu một Test Plan",
      en: "2. Anatomy of a Test Plan",
      ja: "2. テストプランの構造",
    },
    blocks: [
      P(
        "Mọi kịch bản JMeter đều nằm trong một Test Plan — nút gốc của cây (file .jmx dạng XML). Dưới Test Plan là các thành phần được thực thi theo thứ tự và phạm vi (scope) nhất định: Thread Group chứa người dùng ảo; bên trong là Config Elements (áp cấu hình chung), Samplers (gửi request thật), Timers (chèn thời gian chờ), Assertions (kiểm tra kết quả) và Listeners (thu thập số liệu). Hiểu thứ tự này là chìa khóa: Config Element luôn được áp trước khi Sampler chạy dù nằm ở đâu trong cùng scope; còn Sampler chạy tuần tự từ trên xuống.",
        "Every JMeter scenario lives inside a Test Plan — the root node of the tree (a .jmx XML file). Under the Test Plan are components executed in a defined order and scope: a Thread Group holds virtual users; inside it are Config Elements (shared configuration), Samplers (send real requests), Timers (insert waits), Assertions (validate results) and Listeners (collect metrics). Understanding this order is key: a Config Element is always applied before Samplers run regardless of position within the same scope, while Samplers execute top to bottom.",
        "すべてのJMeterシナリオはテストプラン、すなわちツリーのルートノード（.jmx XMLファイル）に存在します。テストプランの下には、定められた順序とスコープで実行される要素があります。スレッドグループが仮想ユーザーを保持し、その中に設定エレメント（共通設定）、サンプラー（実リクエスト送信）、タイマー（待機挿入）、アサーション（結果検証）、リスナー（指標収集）があります。この順序の理解が鍵です。設定エレメントは同一スコープ内の位置に関わらずサンプラー実行前に適用され、サンプラーは上から下へ順次実行されます。",
      ),
      IMG(
        SVG_TESTPLAN_TREE,
        "Cây Test Plan: Config → Sampler → Timer → Assertion → Listener theo scope.",
        "Test Plan tree: Config → Sampler → Timer → Assertion → Listener by scope.",
        "テストプランのツリー：スコープ順にConfig→Sampler→Timer→Assertion→Listener。",
      ),
      P(
        "File .jmx là XML nên có thể đọc và version-control bằng Git. Tuy nhiên bạn nên chỉnh sửa qua GUI cho các thay đổi lớn để tránh làm hỏng cấu trúc; chỉ sửa tay những giá trị đơn giản như số threads được tham số hóa. Dưới đây là một đoạn .jmx rút gọn cho ThreadGroup — chú ý các thuộc tính ramp-up, số luồng và vòng lặp được lưu dưới dạng thẻ stringProp.",
        "The .jmx file is XML, so it can be read and version-controlled with Git. However you should edit large changes through the GUI to avoid corrupting the structure; hand-edit only simple parameterised values such as thread count. Below is a trimmed .jmx snippet for a ThreadGroup — note that ramp-up, thread count and loops are stored as stringProp tags.",
        ".jmxファイルはXMLなので、Gitで読み取りバージョン管理できます。ただし構造を壊さないよう、大きな変更はGUIで行い、スレッド数などパラメータ化された単純な値のみ手動編集してください。以下はThreadGroupの短縮された.jmxスニペットです。ランプアップ、スレッド数、ループがstringPropタグとして保存されている点に注目してください。",
      ),
      CODE(
        "xml",
        `<ThreadGroup guiclass="ThreadGroupGui" testname="Subscribers - Balance Check" enabled="true">
  <intProp name="ThreadGroup.num_threads">200</intProp>
  <intProp name="ThreadGroup.ramp_time">60</intProp>
  <boolProp name="ThreadGroup.scheduler">true</boolProp>
  <stringProp name="ThreadGroup.duration">600</stringProp>
  <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <intProp name="LoopController.loops">-1</intProp>  <!-- -1 = lặp mãi tới khi hết duration -->
  </elementProp>
</ThreadGroup>`,
      ),
    ],
  },
  {
    heading: {
      vi: "3. Thread Group: users, ramp-up, loops",
      en: "3. Thread Group: users, ramp-up, loops",
      ja: "3. スレッドグループ：ユーザー・ランプアップ・ループ",
    },
    blocks: [
      P(
        "Thread Group là trái tim của mọi kịch bản: mỗi thread mô phỏng một người dùng ảo độc lập, có bộ biến riêng và duyệt qua các Sampler tuần tự. Ba tham số cốt lõi là Number of Threads (số user ảo), Ramp-Up Period (thời gian tính bằng giây để khởi động dần đủ số thread) và Loop Count (số lần lặp kịch bản mỗi thread). Ví dụ 200 threads với ramp-up 60 giây nghĩa là cứ mỗi 0,3 giây thêm một user vào — cách này tránh 'thundering herd' làm sai lệch kết quả vì mọi user ập vào cùng khoảnh khắc.",
        "The Thread Group is the heart of every scenario: each thread simulates an independent virtual user with its own variable set, walking through Samplers sequentially. The three core parameters are Number of Threads (virtual users), Ramp-Up Period (seconds to gradually start all threads) and Loop Count (iterations per thread). For example 200 threads with a 60-second ramp-up means one new user roughly every 0.3 seconds — this avoids a 'thundering herd' that skews results when all users hit at the same instant.",
        "スレッドグループはあらゆるシナリオの心臓です。各スレッドは独自の変数セットを持つ独立した仮想ユーザーを模擬し、サンプラーを順に辿ります。三つの中核パラメータは、スレッド数（仮想ユーザー数）、ランプアップ期間（全スレッドを徐々に起動する秒数）、ループ回数（スレッドごとの反復回数）です。例えば200スレッドで60秒のランプアップは、およそ0.3秒ごとに1ユーザーずつ追加することを意味し、全ユーザーが同時に殺到して結果を歪める「サンダリングハード」を回避します。",
      ),
      UL(
        [
          "Number of Threads = số người dùng ảo đồng thời (tối đa), không phải tổng số request.",
          "Ramp-Up quá ngắn tạo spike giả; quá dài thì không bao giờ đạt tải đích. Quy tắc thường dùng: ramp-up ≈ số thread để lên 1 user/giây.",
          "Loop Count = -1 hoặc dùng Scheduler + Duration để chạy theo thời gian thay vì theo số vòng.",
          "Tổng request ≈ threads × loops × số sampler; hãy tính trước để khỏi bất ngờ về lưu lượng.",
        ],
        [
          "Number of Threads = concurrent virtual users (peak), not total requests.",
          "Too short a ramp-up makes a fake spike; too long never reaches target load. Common rule: ramp-up ≈ thread count for 1 user/second.",
          "Loop Count = -1 or use Scheduler + Duration to run by time instead of by iterations.",
          "Total requests ≈ threads × loops × samplers; compute it up front to avoid traffic surprises.",
        ],
        [
          "スレッド数＝同時仮想ユーザー数（ピーク）であり、総リクエスト数ではありません。",
          "ランプアップが短すぎると偽のスパイクになり、長すぎると目標負荷に到達しません。一般則：毎秒1ユーザーにするにはランプアップ≒スレッド数。",
          "ループ回数＝-1、またはスケジューラ＋デュレーションで反復数でなく時間で実行します。",
          "総リクエスト≒スレッド数×ループ×サンプラー数。想定外のトラフィックを避けるため事前に計算します。",
        ],
      ),
      TIP(
        "Với kịch bản dài, dùng Scheduler + Duration thay Loop Count để test luôn dừng đúng giờ dù response chậm. Đây cũng là điều kiện cần cho soak test chạy vài giờ.",
        "For long scenarios, use Scheduler + Duration instead of Loop Count so the test always stops on time even when responses are slow. This is also required for a soak test running several hours.",
        "長いシナリオでは、応答が遅くてもテストが時間通りに停止するよう、ループ回数ではなくスケジューラ＋デュレーションを使います。数時間のソークテストにも必須です。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Samplers: HTTP Request",
      en: "4. Samplers: HTTP Request",
      ja: "4. サンプラー：HTTPリクエスト",
    },
    blocks: [
      P(
        "Sampler là thành phần thực sự gửi request tới hệ thống. Loại phổ biến nhất là HTTP Request Sampler: bạn khai báo phương thức (GET/POST/PUT/DELETE), đường dẫn (path), tham số query hoặc body (JSON, form-data), và header. Trong hệ thống viễn thông, một kịch bản điển hình gồm POST /login để đăng nhập thuê bao, GET /account/balance để tra cước, POST /topup để nạp thẻ. Mỗi Sampler đo được thời gian phản hồi (elapsed), latency (thời gian tới byte đầu), connect time và kích thước phản hồi.",
        "A Sampler is the component that actually sends a request to the system. The most common is the HTTP Request Sampler: you declare the method (GET/POST/PUT/DELETE), the path, query parameters or body (JSON, form-data) and headers. In a telecom system, a typical scenario is POST /login to authenticate a subscriber, GET /account/balance to check charges, POST /topup to recharge. Each Sampler measures response time (elapsed), latency (time to first byte), connect time and response size.",
        "サンプラーはシステムへ実際にリクエストを送る要素です。最も一般的なのはHTTPリクエストサンプラーで、メソッド（GET/POST/PUT/DELETE）、パス、クエリパラメータまたはボディ（JSON、form-data）、ヘッダーを宣言します。通信システムでは、加入者認証のPOST /login、料金照会のGET /account/balance、チャージのPOST /topupが典型的なシナリオです。各サンプラーは応答時間（elapsed）、レイテンシ（最初のバイトまでの時間）、接続時間、応答サイズを測定します。",
      ),
      P(
        "Để tránh lặp lại host, port, protocol ở mọi Sampler, ta đặt chúng vào HTTP Request Defaults (một Config Element). Khi đó mỗi Sampler chỉ cần khai path. Header chung như Content-Type hay Authorization đặt trong HTTP Header Manager. Dưới đây là body JSON của Sampler POST /login viết dưới dạng tham số hóa với biến CSV — chúng ta sẽ nạp dữ liệu ở chương sau.",
        "To avoid repeating host, port and protocol in every Sampler, put them in HTTP Request Defaults (a Config Element). Then each Sampler only needs the path. Shared headers like Content-Type or Authorization go in an HTTP Header Manager. Below is the JSON body of the POST /login Sampler, parameterised with CSV variables — we will feed the data in the next chapter.",
        "すべてのサンプラーでホスト・ポート・プロトコルを繰り返さないよう、HTTPリクエストデフォルト（設定エレメント）に入れます。するとサンプラーはパスだけで済みます。Content-TypeやAuthorizationなど共通ヘッダーはHTTPヘッダーマネージャに置きます。以下はPOST /loginサンプラーのJSONボディで、CSV変数でパラメータ化されています。データは次章で投入します。",
      ),
      CODE(
        "json",
        `{
  "msisdn": "\${msisdn}",
  "pin": "\${pin}",
  "channel": "USSD",
  "requestId": "\${__UUID()}"
}`,
      ),
      NOTE(
        "\${__UUID()} là một hàm (function) dựng sẵn của JMeter, sinh mã duy nhất mỗi request — hữu ích cho requestId hoặc idempotency-key mà backend viễn thông thường yêu cầu.",
        "\${__UUID()} is a built-in JMeter function that generates a unique id per request — useful for a requestId or idempotency-key that telecom backends often require.",
        "\${__UUID()}はJMeter組み込み関数で、リクエストごとに一意なIDを生成します。通信バックエンドが要求するrequestIdや冪等性キーに便利です。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Config Elements & CSV Data Set",
      en: "5. Config Elements & CSV Data Set",
      ja: "5. 設定エレメントとCSVデータセット",
    },
    blocks: [
      P(
        "Config Elements cấu hình môi trường cho các Sampler cùng scope. Ba loại thường dùng: HTTP Request Defaults (host/port/protocol chung), HTTP Header Manager (header chung), và CSV Data Set Config — nạp dữ liệu từ file .csv để mỗi user ảo dùng một bộ dữ liệu khác nhau. Nếu 200 thread cùng đăng nhập bằng một số điện thoại, bạn không test thật vì cache và khóa phiên sẽ che giấu vấn đề. CSV Data Set Config giải quyết việc này: mỗi lần một thread cần giá trị, JMeter đọc dòng tiếp theo của file.",
        "Config Elements set up the environment for Samplers in the same scope. Three common types: HTTP Request Defaults (shared host/port/protocol), HTTP Header Manager (shared headers) and CSV Data Set Config — feeding data from a .csv file so each virtual user uses a different data set. If 200 threads all log in with one phone number you are not testing realistically, because caching and session locks hide problems. CSV Data Set Config fixes this: each time a thread needs a value, JMeter reads the next line of the file.",
        "設定エレメントは同一スコープのサンプラーの環境を整えます。よく使う三種類は、HTTPリクエストデフォルト（共通ホスト/ポート/プロトコル）、HTTPヘッダーマネージャ（共通ヘッダー）、そしてCSVデータセット設定です。後者は.csvファイルからデータを投入し、各仮想ユーザーが異なるデータセットを使えるようにします。200スレッドが1つの電話番号でログインすると、キャッシュやセッションロックが問題を隠すため現実的なテストになりません。CSVデータセット設定がこれを解決し、スレッドが値を必要とするたびにJMeterがファイルの次の行を読みます。",
      ),
      CODE(
        "text",
        `# subscribers.csv — mỗi dòng một thuê bao
msisdn,pin
84901000001,3812
84901000002,7745
84901000003,9910
84901000004,2038`,
      ),
      P(
        "Trong cấu hình CSV Data Set Config, ba lựa chọn quan trọng: Recycle on EOF (đọc lại từ đầu khi hết file) — bật nếu số vòng vượt số dòng; Stop thread on EOF — dừng khi hết dữ liệu để mỗi tài khoản chỉ dùng một lần; và Sharing mode (All threads / Current thread group / Current thread) quyết định các thread có dùng chung con trỏ file hay không. Với dữ liệu tài khoản duy nhất, dùng Sharing mode = All threads để không hai user trùng số.",
        "In the CSV Data Set Config, three options matter: Recycle on EOF (re-read from the top when the file ends) — enable if iterations exceed rows; Stop thread on EOF — stop when data runs out so each account is used once; and Sharing mode (All threads / Current thread group / Current thread) which decides whether threads share the file cursor. For unique account data, use Sharing mode = All threads so no two users get the same number.",
        "CSVデータセット設定では三つのオプションが重要です。Recycle on EOF（ファイル末尾で先頭から再読）は反復が行数を超える場合に有効化します。Stop thread on EOF（データ切れで停止）は各アカウントを一度だけ使うためです。Sharing mode（全スレッド／現スレッドグループ／現スレッド）はスレッドがファイルカーソルを共有するかを決めます。一意なアカウントデータには、二人のユーザーが同じ番号を得ないようSharing mode＝全スレッドを使います。",
      ),
      WARN(
        "Đặt file CSV bằng đường dẫn tương đối tới file .jmx, nếu không khi chạy trên máy khác (hay slave phân tán) sẽ báo lỗi không tìm thấy file. Với distributed testing, file CSV phải tồn tại trên MỖI slave hoặc dùng chế độ phân phối dữ liệu.",
        "Reference the CSV file with a path relative to the .jmx, otherwise running on another machine (or a distributed slave) throws a file-not-found error. For distributed testing the CSV must exist on EACH slave, or use a data-distribution approach.",
        "CSVファイルは.jmxからの相対パスで参照してください。さもないと別マシン（や分散スレーブ）で実行するとファイル未検出エラーになります。分散実行では各スレーブにCSVが存在するか、データ分配方式を使う必要があります。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Assertions: kiểm tra đúng/sai",
      en: "6. Assertions: pass/fail checks",
      ja: "6. アサーション：合否判定",
    },
    blocks: [
      P(
        "Một request trả HTTP 200 chưa chắc là thành công về nghiệp vụ: server có thể trả 200 kèm body '{\"error\":\"insufficient balance\"}'. Nếu không có Assertion, JMeter coi mọi phản hồi 2xx là pass và bạn nhận kết quả hiệu năng đẹp nhưng sai. Response Assertion là Assertion quan trọng nhất: nó kiểm tra mã phản hồi, hoặc chuỗi/biểu thức chính quy xuất hiện trong body. Ngoài ra có JSON Assertion (kiểm giá trị theo JSONPath), Duration Assertion (fail nếu chậm hơn ngưỡng), và Size Assertion.",
        "A request returning HTTP 200 is not necessarily a business success: the server may return 200 with body '{\"error\":\"insufficient balance\"}'. Without an Assertion, JMeter treats every 2xx as pass and you get pretty but wrong performance numbers. The Response Assertion is the most important: it checks the response code, or a string/regular expression appearing in the body. There are also JSON Assertion (check a value by JSONPath), Duration Assertion (fail if slower than a threshold) and Size Assertion.",
        "HTTP 200を返すリクエストが必ずしも業務的成功とは限りません。サーバーがボディ'{\"error\":\"insufficient balance\"}'付きで200を返すこともあります。アサーションがないとJMeterはすべての2xxを合格とみなし、綺麗だが誤った性能値が得られます。レスポンスアサーションが最も重要で、応答コードやボディに現れる文字列／正規表現を検証します。ほかにJSONアサーション（JSONPathで値検証）、デュレーションアサーション（閾値より遅ければ失敗）、サイズアサーションがあります。",
      ),
      CODE(
        "text",
        `# Response Assertion cho GET /account/balance
Field to Test : Response Code   → Pattern: 200
Field to Test : Text Response   → Contains: "balanceVnd"
Field to Test : Text Response   → Not Contains: "error"
# Duration Assertion: fail nếu > 800ms (SLA p95)`,
      ),
      P(
        "Assertion đặt ở scope nào thì áp cho các Sampler trong scope đó. Một Assertion ở cấp Thread Group áp cho MỌI Sampler; đặt trực tiếp dưới một Sampler thì chỉ áp riêng nó. Assertion fail được tính vào tỉ lệ lỗi (error %) — chỉ số bạn phải theo dõi sát vì hệ thống có thể 'nhanh nhưng sai'. Đừng lạm dụng quá nhiều Assertion nặng (regex phức tạp) vì chúng chạy trên máy tạo tải và ngốn CPU, làm giảm khả năng sinh tải.",
        "An Assertion applies to Samplers in the scope where it sits. An Assertion at Thread Group level applies to ALL Samplers; placed directly under one Sampler it applies only to that one. Failed assertions count towards the error rate (error %) — a metric to watch closely because a system can be 'fast but wrong'. Do not overuse heavy assertions (complex regex) since they run on the load-generating machine and burn CPU, reducing load capacity.",
        "アサーションは配置されたスコープのサンプラーに適用されます。スレッドグループ階層のアサーションは全サンプラーに適用され、1つのサンプラー直下ならそのサンプラーのみに適用されます。失敗したアサーションはエラー率（error %）に計上されます。システムが「速いが誤り」であり得るため注視すべき指標です。重いアサーション（複雑な正規表現）は負荷生成マシンで動きCPUを消費し負荷能力を下げるので多用しないでください。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Timers & mô phỏng tải thực tế",
      en: "7. Timers & realistic load modelling",
      ja: "7. タイマーと現実的な負荷モデリング",
    },
    blocks: [
      P(
        "Người dùng thật không bắn request liên tục không nghỉ; họ đọc màn hình, suy nghĩ, gõ phím — gọi là think-time. Nếu bỏ think-time, 200 thread của bạn tạo tải gấp nhiều lần thực tế và cho kết quả bi quan sai lệch. Timer chèn khoảng chờ giữa các Sampler. Constant Timer thêm khoảng cố định; Uniform Random Timer thêm ngẫu nhiên đều để tránh các user đồng bộ nhịp; Gaussian Random Timer mô phỏng phân bố tự nhiên hơn. Ngoài ra Constant Throughput Timer giữ tổng số request/phút ổn định theo mục tiêu.",
        "Real users do not fire requests non-stop; they read the screen, think and type — this is think-time. Omitting think-time makes your 200 threads generate many times the real load and yields pessimistically wrong results. A Timer inserts a wait between Samplers. Constant Timer adds a fixed delay; Uniform Random Timer adds an even random delay to desynchronise users; Gaussian Random Timer models a more natural distribution. Additionally, Constant Throughput Timer holds total requests/minute steady towards a target.",
        "実ユーザーはリクエストを絶え間なく送りません。画面を読み、考え、入力します。これがシンクタイムです。シンクタイムを省くと200スレッドが実負荷の何倍もの負荷を生み、悲観的に誤った結果になります。タイマーはサンプラー間に待機を挿入します。コンスタントタイマーは固定遅延を、ユニフォームランダムタイマーはユーザーの同期を崩す均等な乱数遅延を、ガウシアンランダムタイマーはより自然な分布を模擬します。さらにコンスタントスループットタイマーは目標に向け毎分の総リクエストを安定させます。",
      ),
      P(
        "Có hai cách mô hình tải: theo số user đồng thời (thread-based) hoặc theo throughput mục tiêu (request/giây). Nhà mạng thường cam kết SLA theo throughput ('hệ thống phải xử lý 500 TPS tra cứu cước'), nên Constant Throughput Timer hoặc plugin Throughput Shaping Timer rất hữu ích để giữ đúng nhịp. Lưu ý Constant Throughput Timer tính theo phút và trên mỗi thread, nên cần bật chế độ 'all active threads' và tính toán cẩn thận.",
        "There are two ways to model load: by concurrent users (thread-based) or by target throughput (requests/second). Carriers usually commit SLAs by throughput ('the system must handle 500 TPS of charge lookups'), so Constant Throughput Timer or the Throughput Shaping Timer plugin is very useful to hold the pace. Note that Constant Throughput Timer counts per minute and per thread, so you must set 'all active threads' mode and compute carefully.",
        "負荷モデル化には二通りあります。同時ユーザー数（スレッドベース）か、目標スループット（毎秒リクエスト）です。キャリアは通常スループットでSLAを約束するため（「システムは料金照会を500 TPS処理すべき」）、コンスタントスループットタイマーやThroughput Shaping Timerプラグインがペース維持に有用です。コンスタントスループットタイマーは毎分かつスレッドごとに計算するため、「全アクティブスレッド」モードを設定し慎重に計算する必要があります。",
      ),
      TIP(
        "Think-time thực tế lấy từ analytics/log sản xuất (ví dụ trung bình 4-8 giây giữa hai thao tác). Đừng đoán bừa; sai think-time làm sai toàn bộ mô hình tải.",
        "Derive realistic think-time from production analytics/logs (e.g. an average of 4-8 seconds between actions). Do not guess; a wrong think-time invalidates the whole load model.",
        "現実的なシンクタイムは本番の分析／ログから導きます（例：操作間平均4〜8秒）。当て推量は禁物で、誤ったシンクタイムは負荷モデル全体を無効にします。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Listeners & chạy chế độ non-GUI",
      en: "8. Listeners & running in non-GUI mode",
      ja: "8. リスナーと非GUIモード実行",
    },
    blocks: [
      P(
        "Listeners thu thập và hiển thị kết quả: View Results Tree (xem từng request — chỉ dùng khi debug), Summary Report và Aggregate Report (tổng hợp số liệu). Nhưng đây là quy tắc vàng: KHÔNG chạy load test thật trong GUI. Giao diện đồ họa và các Listener nặng như View Results Tree ngốn rất nhiều bộ nhớ và CPU của chính máy tạo tải, khiến JMeter trở thành nút thắt cổ chai — bạn đo hiệu năng của JMeter chứ không phải của server. GUI chỉ dùng để xây và gỡ lỗi kịch bản.",
        "Listeners collect and display results: View Results Tree (per-request inspection — debug only), Summary Report and Aggregate Report (aggregated metrics). But here is the golden rule: do NOT run a real load test in the GUI. The graphical interface and heavy listeners like View Results Tree consume huge memory and CPU on the load-generating machine, turning JMeter into the bottleneck — you measure JMeter's performance, not the server's. The GUI is only for building and debugging scenarios.",
        "リスナーは結果を収集し表示します。View Results Tree（リクエストごとの確認、デバッグのみ）、Summary Report、Aggregate Report（集計指標）です。ただし黄金律があります。本物の負荷テストをGUIで実行してはいけません。GUIやView Results Treeのような重いリスナーは負荷生成マシンの大量のメモリとCPUを消費し、JMeter自体がボトルネックになります。サーバーではなくJMeterの性能を測ることになります。GUIはシナリオの構築とデバッグ専用です。",
      ),
      P(
        "Cách đúng là chạy chế độ non-GUI (còn gọi command-line / CLI mode). Bạn khởi động kịch bản bằng lệnh, JMeter ghi kết quả thô vào file .jtl (CSV hoặc XML) để phân tích sau. Đây là chế độ dùng trong mọi lần chạy chính thức, trên CI, và bắt buộc cho distributed testing.",
        "The correct way is non-GUI mode (also called command-line / CLI mode). You start the scenario with a command; JMeter writes raw results to a .jtl file (CSV or XML) for later analysis. This is the mode for every official run, on CI, and mandatory for distributed testing.",
        "正しい方法は非GUIモード（コマンドライン／CLIモードとも呼ばれます）です。コマンドでシナリオを起動し、JMeterは生結果を.jtlファイル（CSVまたはXML）に書き込み後で分析します。これが公式実行、CI、そして分散実行に必須のモードです。",
      ),
      CODE(
        "bash",
        `# Chạy non-GUI: -n = non-GUI, -t = test plan, -l = log kết quả
jmeter -n -t balance-check.jmx -l results.jtl

# Ghi đè biến từ dòng lệnh (-J) để chỉnh threads/duration không cần mở GUI
jmeter -n -t balance-check.jmx -l results.jtl \\
       -Jthreads=500 -Jrampup=120 -Jduration=900

# Sinh báo cáo HTML dashboard ngay sau khi chạy xong (-e -o)
jmeter -n -t balance-check.jmx -l results.jtl -e -o report/`,
      ),
      NOTE(
        "Trong .jmx dùng \${__P(threads,200)} để đọc property 'threads', mặc định 200 — nhờ vậy một kịch bản chạy được nhiều mức tải qua cờ -J mà không sửa file.",
        "In the .jmx use \${__P(threads,200)} to read property 'threads', defaulting to 200 — so one scenario runs many load levels via -J flags without editing the file.",
        "\.jmx内で\${__P(threads,200)}を使いプロパティ'threads'を読み、既定値200とします。これにより1つのシナリオがファイルを編集せず-Jフラグで多段階の負荷を実行できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Đọc kết quả: throughput, latency, percentiles",
      en: "9. Reading results: throughput, latency, percentiles",
      ja: "9. 結果の読み方：スループット・レイテンシ・パーセンタイル",
    },
    blocks: [
      P(
        "Sau khi chạy, bạn có bảng Aggregate Report. Các cột cần đọc: Samples (số request), Average (thời gian trung bình), Median (p50), 90% Line (p90), 95% Line (p95), 99% Line (p99), Min/Max, Error %, và Throughput (request/giây hoặc phút). Sai lầm phổ biến nhất của người mới là chỉ nhìn Average. Trung bình bị 'kéo' bởi các giá trị nhỏ và che giấu đuôi chậm; một hệ thống có trung bình 120ms nhưng p99 tới 1,8 giây nghĩa là 1% người dùng — có thể hàng chục nghìn thuê bao — chịu trải nghiệm rất tệ.",
        "After the run you get the Aggregate Report table. Columns to read: Samples (request count), Average, Median (p50), 90% Line (p90), 95% Line (p95), 99% Line (p99), Min/Max, Error % and Throughput (requests/second or minute). The most common beginner mistake is looking only at Average. The mean is pulled by small values and hides the slow tail; a system with a 120ms average but p99 of 1.8 seconds means 1% of users — possibly tens of thousands of subscribers — suffer a terrible experience.",
        "実行後、Aggregate Reportの表が得られます。読むべき列は、Samples（リクエスト数）、Average、Median（p50）、90% Line（p90）、95% Line（p95）、99% Line（p99）、Min/Max、Error %、Throughput（毎秒または毎分リクエスト）です。初心者の最も一般的な誤りはAverageだけを見ることです。平均は小さい値に引っ張られ遅い裾を隠します。平均120msでもp99が1.8秒のシステムは、1%のユーザー（数万の加入者かもしれません）がひどい体験をすることを意味します。",
      ),
      IMG(
        SVG_PERCENTILE,
        "Percentile phơi bày đuôi chậm mà trung bình che giấu.",
        "Percentiles expose the slow tail that the average hides.",
        "パーセンタイルは平均が隠す遅い裾を明らかにします。",
      ),
      P(
        "Percentile (phân vị) trả lời câu hỏi 'X% request nhanh hơn bao nhiêu ms'. p95 = 480ms nghĩa là 95% request hoàn tất dưới 480ms, 5% chậm hơn. SLA hiện đại luôn viết theo percentile, ví dụ 'p95 < 500ms, p99 < 1s, error < 0,1%'. Throughput (thông lượng) cho biết hệ thống thực xử lý bao nhiêu request mỗi giây — nếu throughput ngừng tăng khi bạn thêm thread trong khi latency tăng vọt, bạn đã tìm thấy điểm bão hòa (saturation point).",
        "A percentile answers 'how many ms are X% of requests faster than'. p95 = 480ms means 95% of requests finish under 480ms and 5% are slower. Modern SLAs are always written by percentile, e.g. 'p95 < 500ms, p99 < 1s, error < 0.1%'. Throughput tells how many requests per second the system actually handles — if throughput stops rising as you add threads while latency spikes, you have found the saturation point.",
        "パーセンタイルは「X%のリクエストが何ms未満か」に答えます。p95＝480msは95%のリクエストが480ms未満で完了し5%が遅いことを意味します。現代のSLAは常にパーセンタイルで書かれ、例えば「p95<500ms、p99<1s、error<0.1%」です。スループットはシステムが実際に毎秒何リクエスト処理するかを示します。スレッドを増やしてもスループットが上がらずレイテンシが急増するなら、飽和点を見つけたことになります。",
      ),
      CODE(
        "bash",
        `# .jtl là CSV: cột 1=timeStamp, 2=elapsed(ms), 4=responseCode, 8=success
head -1 results.jtl
# timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,...

# Đếm nhanh tỉ lệ lỗi (cột success = false)
awk -F, 'NR>1{n++; if($8=="false") e++} END{printf "error %.2f%%\\n", 100*e/n}' results.jtl

# Sinh HTML dashboard từ .jtl để đọc p90/p95/p99 trực quan
jmeter -g results.jtl -o report/`,
      ),
      WARN(
        "Không tính percentile bằng cách lấy trung bình percentile của nhiều lần chạy — điều đó sai về toán học. Hãy gộp dữ liệu thô (.jtl) rồi tính lại percentile trên toàn bộ mẫu.",
        "Do not compute a percentile by averaging percentiles across runs — that is mathematically wrong. Merge the raw data (.jtl) and recompute the percentile over the whole sample.",
        "複数回の実行のパーセンタイルを平均してパーセンタイルを求めてはいけません。数学的に誤りです。生データ（.jtl）を統合し、全サンプルでパーセンタイルを再計算してください。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Cạm bẫy thường gặp",
      en: "10. Common pitfalls",
      ja: "10. よくある落とし穴",
    },
    blocks: [
      P(
        "Load testing dễ cho kết quả sai nếu vô tình mắc bẫy. Bẫy lớn nhất đã nói: chạy trong GUI. Kế đến là dùng chung một tài khoản cho mọi thread khiến cache che giấu tải DB. Một bẫy tinh vi là quên bật Cookie Manager hoặc Cache Manager: nếu bỏ, các phiên không giữ session, mọi request bị coi như user mới, backend làm việc nặng hơn thực tế. Ngược lại, để Cache Manager cache quá mức lại làm nhẹ giả tạo. Cần mô phỏng đúng hành vi trình duyệt của người dùng thật.",
        "Load testing easily yields wrong results if you fall into traps. The biggest, already mentioned: running in the GUI. Next is sharing one account across all threads so caching hides DB load. A subtle trap is forgetting to enable the Cookie Manager or Cache Manager: without them sessions are not kept and every request looks like a new user, so the backend works harder than reality. Conversely, letting the Cache Manager over-cache makes it artificially light. You must mirror real browser behaviour.",
        "負荷テストは罠にはまると容易に誤った結果を生みます。最大のものは既述のGUI実行です。次は全スレッドで1つのアカウントを共有し、キャッシュがDB負荷を隠すことです。巧妙な罠はクッキーマネージャやキャッシュマネージャの有効化忘れです。これらがないとセッションが保持されず全リクエストが新規ユーザーに見え、バックエンドが実際より重く働きます。逆にキャッシュマネージャが過剰にキャッシュすると不自然に軽くなります。実ブラウザの挙動を正しく模擬する必要があります。",
      ),
      UL(
        [
          "Chạy load test trên máy dev cùng lúc mở IDE, trình duyệt — CPU máy tạo tải bị tranh chấp, số liệu sai.",
          "Bỏ qua warm-up/JIT: JVM server cần vài phút để 'nóng máy', nên bỏ giai đoạn đầu khi phân tích.",
          "Không kiểm chứng máy tạo tải có đủ băng thông mạng — network của client trở thành nút thắt.",
          "Đo trên môi trường khác hẳn production (ít node, DB nhỏ) rồi ngoại suy — kết quả vô nghĩa.",
        ],
        [
          "Running a load test on a dev machine while the IDE and browser are open — the generator's CPU is contended and metrics are wrong.",
          "Ignoring warm-up/JIT: the server JVM needs a few minutes to warm up, so discard the initial phase in analysis.",
          "Not verifying the load generator has enough network bandwidth — the client network becomes the bottleneck.",
          "Measuring on an environment unlike production (fewer nodes, small DB) then extrapolating — meaningless results.",
        ],
        [
          "IDEやブラウザを開いたままdevマシンで負荷テストを実行すると、生成側のCPUが競合し指標が狂います。",
          "ウォームアップ／JITの無視：サーバーのJVMは数分の暖機が必要なので、分析では初期フェーズを除外します。",
          "負荷生成側に十分なネットワーク帯域があるか検証しないと、クライアントのネットワークがボトルネックになります。",
          "本番と大きく異なる環境（少ないノード、小さいDB）で測定し外挿すると、無意味な結果になります。",
        ],
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản thực chiến: đầu tháng nạp cước",
      en: "11. Real scenario: month-start top-up surge",
      ja: "11. 実戦シナリオ：月初のチャージ集中",
    },
    blocks: [
      SCEN(
        "Bão nạp thẻ đầu tháng",
        "Month-start recharge storm",
        "Nhà mạng dự báo đầu tháng lượng nạp cước tăng gấp 6 lần. Đội QA phải chứng minh cụm dịch vụ topup chịu được 500 TPS với p95 dưới 800ms trước khi bật khuyến mãi. Họ dựng Test Plan: Thread Group 600 user, ramp-up 120s, Scheduler duration 30 phút; CSV Data Set 600 nghìn số thuê bao unique; Sampler POST /login → JSON Extractor lấy token → POST /topup; Response Assertion mã 200 và body chứa 'topupId'; Uniform Random Timer 3-7s think-time; chạy non-GUI, xuất HTML report.",
        "A carrier forecasts a 6x surge in recharges at month start. The QA team must prove the top-up service cluster sustains 500 TPS with p95 under 800ms before enabling the promotion. They build a Test Plan: Thread Group of 600 users, 120s ramp-up, Scheduler duration 30 minutes; CSV Data Set of 600k unique subscriber numbers; Sampler POST /login → JSON Extractor for the token → POST /topup; Response Assertion for code 200 and body containing 'topupId'; Uniform Random Timer 3-7s think-time; run non-GUI, export HTML report.",
        "月初チャージの嵐",
        "キャリアは月初のチャージが6倍に急増すると予測します。QAチームはプロモーション開始前に、チャージサービスクラスタがp95を800ms未満で500 TPSを維持することを証明せねばなりません。彼らはテストプランを構築します。600ユーザーのスレッドグループ、120秒のランプアップ、スケジューラのデュレーション30分、60万件の一意な加入者番号のCSVデータセット、POST /login→トークンをJSONエクストラクタで取得→POST /topupのサンプラー、コード200とボディに'topupId'を含むレスポンスアサーション、3〜7秒のユニフォームランダムタイマー、非GUI実行、HTMLレポート出力です。",
      ),
      P(
        "Lần chạy đầu đạt 320 TPS thì error % vọt lên 4% và p99 lên 3,2 giây. Log server cho thấy pool kết nối DB cạn ở 200 kết nối. Đội hạ tầng tăng pool và thêm cache Redis cho bước xác thực. Lần chạy thứ hai đạt 540 TPS, p95 = 610ms, p99 = 1,1 giây, error 0,05% — vượt SLA. Bài học: JMeter chỉ ra điểm gãy, nhưng phải kết hợp APM phía server mới tìm ra nguyên nhân gốc và khắc phục.",
        "The first run reached 320 TPS before error % jumped to 4% and p99 to 3.2 seconds. Server logs showed the DB connection pool exhausted at 200 connections. The infra team increased the pool and added a Redis cache for the auth step. The second run hit 540 TPS, p95 = 610ms, p99 = 1.1 seconds, error 0.05% — beating the SLA. Lesson: JMeter reveals the breaking point, but you must combine server-side APM to find and fix the root cause.",
        "初回実行は320 TPSに達したところでerror %が4%に、p99が3.2秒に跳ね上がりました。サーバーログはDB接続プールが200接続で枯渇したことを示しました。インフラチームはプールを増やし認証ステップにRedisキャッシュを追加しました。二回目の実行は540 TPS、p95＝610ms、p99＝1.1秒、error 0.05%でSLAを上回りました。教訓：JMeterは破綻点を明らかにしますが、根本原因の発見と修正にはサーバー側APMの併用が必要です。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Hỏi đáp phỏng vấn",
      en: "12. Interview Q&A",
      ja: "12. 面接Q&A",
    },
    blocks: [
      QA(
        "Sự khác nhau giữa số thread và throughput trong JMeter?",
        "What is the difference between threads and throughput in JMeter?",
        "Số thread là số người dùng ảo đồng thời (đầu vào bạn điều khiển); throughput là số request/giây hệ thống thực xử lý (đầu ra đo được). Thêm thread không luôn tăng throughput — khi hệ thống bão hòa, thêm thread chỉ làm tăng latency. Mối quan hệ này giúp xác định điểm bão hòa.",
        "Threads are concurrent virtual users (an input you control); throughput is requests/second the system actually processes (a measured output). Adding threads does not always raise throughput — once saturated, more threads only increase latency. This relationship locates the saturation point.",
        "JMeterのスレッド数とスループットの違いは何ですか。",
        "スレッド数は同時仮想ユーザー数（あなたが制御する入力）で、スループットはシステムが実際に処理する毎秒リクエスト数（測定される出力）です。スレッドを増やしても必ずしもスループットは上がりません。飽和すると、追加スレッドはレイテンシを増やすだけです。この関係が飽和点を特定します。",
      ),
      QA(
        "Vì sao không nên chạy load test ở chế độ GUI?",
        "Why should you not run a load test in GUI mode?",
        "GUI và các Listener nặng (đặc biệt View Results Tree) tiêu tốn nhiều RAM/CPU trên máy tạo tải, biến JMeter thành nút thắt cổ chai và làm sai số liệu. Chế độ non-GUI (jmeter -n -t plan.jmx -l results.jtl) nhẹ hơn nhiều và là cách duy nhất đúng cho mọi lần chạy chính thức.",
        "The GUI and heavy listeners (especially View Results Tree) consume much RAM/CPU on the load generator, turning JMeter into the bottleneck and skewing metrics. Non-GUI mode (jmeter -n -t plan.jmx -l results.jtl) is far lighter and the only correct way for any official run.",
        "なぜGUIモードで負荷テストを実行すべきでないのですか。",
        "GUIや重いリスナー（特にView Results Tree）は負荷生成マシンで多くのRAM/CPUを消費し、JMeterをボトルネックにして指標を歪めます。非GUIモード（jmeter -n -t plan.jmx -l results.jtl）ははるかに軽く、あらゆる公式実行で唯一正しい方法です。",
      ),
      QA(
        "Percentile p95 nghĩa là gì và vì sao quan trọng hơn trung bình?",
        "What does p95 mean and why is it more important than the average?",
        "p95 = 480ms nghĩa là 95% request hoàn tất dưới 480ms. Quan trọng hơn trung bình vì trung bình che giấu đuôi chậm; nếu chỉ nhìn trung bình bạn bỏ sót nhóm người dùng chịu độ trễ cao. SLA hiện đại đều viết theo percentile chứ không theo trung bình.",
        "p95 = 480ms means 95% of requests finish under 480ms. It matters more than the average because the mean hides the slow tail; looking only at the average misses the group of users suffering high latency. Modern SLAs are written by percentile, not by average.",
        "p95パーセンタイルとは何を意味し、なぜ平均より重要ですか。",
        "p95＝480msは95%のリクエストが480ms未満で完了することを意味します。平均は遅い裾を隠すため平均より重要です。平均だけを見ると高遅延に苦しむユーザー層を見逃します。現代のSLAは平均でなくパーセンタイルで書かれます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist",
      en: "13. Summary & checklist",
      ja: "13. まとめとチェックリスト",
    },
    blocks: [
      P(
        "Dựng một load test JMeter đáng tin cậy là chuỗi quyết định có kỷ luật: mô hình tải đúng thực tế, dữ liệu đa dạng qua CSV, tương quan token động, assertion nghiệp vụ, think-time hợp lý, chạy non-GUI, và đọc kết quả theo percentile chứ không theo trung bình. JMeter mạnh nhưng dễ cho số liệu đẹp mà sai nếu bỏ qua các nguyên tắc này. Hãy luôn kết hợp với quan sát phía server để biết vì sao hệ thống chậm, không chỉ biết nó chậm.",
        "Building a trustworthy JMeter load test is a disciplined chain of decisions: a realistic load model, varied data via CSV, dynamic-token correlation, business assertions, sensible think-time, non-GUI runs, and reading results by percentile not average. JMeter is powerful but easily yields pretty-but-wrong numbers if you skip these principles. Always pair it with server-side observation to know why the system is slow, not just that it is.",
        "信頼できるJMeter負荷テストの構築は、規律ある一連の判断です。現実的な負荷モデル、CSVによる多様なデータ、動的トークンの相関、業務アサーション、妥当なシンクタイム、非GUI実行、そして平均でなくパーセンタイルでの結果読解です。JMeterは強力ですが、これらの原則を省くと綺麗だが誤った値を容易に出します。システムが遅いことだけでなく、なぜ遅いかを知るため常にサーバー側の観測と組み合わせてください。",
      ),
      UL(
        [
          "Test Plan → Thread Group với users/ramp-up/loops mô phỏng đúng tải kỳ vọng.",
          "HTTP Request Defaults + Header Manager + CSV Data Set Config cho dữ liệu unique.",
          "Response Assertion kiểm nghiệp vụ, không chỉ mã 200.",
          "Timer chèn think-time thực tế; cân nhắc Constant Throughput Timer cho SLA theo TPS.",
          "Chạy non-GUI (jmeter -n -t plan.jmx -l results.jtl -e -o report/), tắt Listener nặng.",
          "Đọc p90/p95/p99, error %, throughput; đối chiếu APM server để tìm nguyên nhân gốc.",
        ],
        [
          "Test Plan → Thread Group with users/ramp-up/loops modelling the expected load.",
          "HTTP Request Defaults + Header Manager + CSV Data Set Config for unique data.",
          "Response Assertion validating business logic, not just code 200.",
          "Timers for realistic think-time; consider Constant Throughput Timer for TPS-based SLAs.",
          "Run non-GUI (jmeter -n -t plan.jmx -l results.jtl -e -o report/), disable heavy listeners.",
          "Read p90/p95/p99, error %, throughput; correlate server APM to find the root cause.",
        ],
        [
          "テストプラン→期待負荷を模擬するusers/ramp-up/loopsのスレッドグループ。",
          "一意なデータのためのHTTPリクエストデフォルト＋ヘッダーマネージャ＋CSVデータセット設定。",
          "コード200だけでなく業務ロジックを検証するレスポンスアサーション。",
          "現実的なシンクタイムのタイマー、TPSベースSLAにはコンスタントスループットタイマーを検討。",
          "非GUI実行（jmeter -n -t plan.jmx -l results.jtl -e -o report/）、重いリスナーを無効化。",
          "p90/p95/p99・error %・スループットを読み、サーバーAPMと照合して根本原因を探す。",
        ],
      ),
    ],
  },
];

// ============================================================================
// BÀI 2 — at-jmeter-distributed-advanced
// ============================================================================
const pages2 = [
  {
    heading: {
      vi: "1. Vì sao một máy JMeter là không đủ",
      en: "1. Why one JMeter machine is not enough",
      ja: "1. なぜJMeter1台では足りないのか",
    },
    blocks: [
      P(
        "Một tiến trình JMeter chạy trên một máy có giới hạn: JVM chỉ cấp phát được bấy nhiêu heap, một CPU chỉ tạo được vài nghìn thread trước khi context-switch làm chậm chính máy tạo tải. Với ngân hàng cần mô phỏng hàng chục nghìn giao dịch đồng thời trong ngày lương, một máy sẽ bão hòa ở phía client trước cả server đích — bạn đo giới hạn của JMeter chứ không phải của hệ thống. Đây là lúc cần distributed testing (kiểm thử phân tán): một máy master điều phối nhiều máy slave cùng sinh tải.",
        "One JMeter process on one machine has limits: the JVM can allocate only so much heap, and a CPU can only spawn a few thousand threads before context-switching slows the generator itself. For a bank simulating tens of thousands of concurrent transactions on payday, a single machine saturates on the client side before the target server — you measure JMeter's limit, not the system's. This is where distributed testing is needed: one master machine coordinates several slave machines all generating load.",
        "1台のマシンで動く1つのJMeterプロセスには限界があります。JVMが割り当てられるヒープには限りがあり、CPUはコンテキストスイッチが生成側自体を遅くする前に数千スレッドしか生成できません。給料日に数万件の同時取引を模擬する銀行では、1台のマシンが対象サーバーより先にクライアント側で飽和します。JMeterの限界を測ることになるのです。ここで分散実行が必要になります。1台のマスターが複数のスレーブを調整し、全員で負荷を生成します。",
      ),
      P(
        "Trước khi phân tán, luôn tối ưu trên một máy đã: mô hình tải hợp lý, tắt Listener nặng, tăng heap, tối ưu Assertion. Chỉ khi một máy đã cạn CPU/băng thông mà chưa đủ tải mới scale ngang. Phân tán không phải viên đạn bạc — nó thêm độ phức tạp về mạng (RMI), đồng bộ dữ liệu và thu thập kết quả. Bài này đi sâu: kiến trúc master-slave, correlation cho token động, JSR223/Groovy, tuning JVM, tránh bẫy GUI, sinh HTML dashboard, và tích hợp CI.",
        "Before distributing, always optimise on one machine first: a sound load model, disabled heavy listeners, increased heap, optimised assertions. Only when one machine has exhausted CPU/bandwidth without enough load should you scale out. Distribution is no silver bullet — it adds complexity in networking (RMI), data synchronisation and result collection. This article goes deep: master-slave architecture, correlation for dynamic tokens, JSR223/Groovy, JVM tuning, avoiding GUI traps, generating an HTML dashboard, and CI integration.",
        "分散化の前に、必ずまず1台で最適化します。健全な負荷モデル、重いリスナーの無効化、ヒープ増加、アサーション最適化です。1台がCPU/帯域を使い切っても負荷が足りない場合のみ水平スケールします。分散は銀の弾丸ではありません。ネットワーク（RMI）、データ同期、結果収集の複雑さを増します。本記事は深掘りします。マスタースレーブ構成、動的トークンの相関、JSR223/Groovy、JVMチューニング、GUIの罠回避、HTMLダッシュボード生成、CI統合です。",
      ),
      NOTE(
        "Nguyên tắc: scale dọc (heap, tối ưu) trước, scale ngang (thêm slave) sau. Mỗi slave nên là một máy tách biệt, cùng phiên bản JMeter và Java với master.",
        "Principle: scale up (heap, optimisation) first, scale out (more slaves) later. Each slave should be a separate machine on the same JMeter and Java version as the master.",
        "原則：まず垂直スケール（ヒープ、最適化）、次に水平スケール（スレーブ追加）です。各スレーブはマスターと同じJMeterおよびJavaバージョンの別マシンであるべきです。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc master-slave (remote testing)",
      en: "2. Master-slave architecture (remote testing)",
      ja: "2. マスタースレーブ構成（リモートテスト）",
    },
    blocks: [
      P(
        "Trong distributed testing, máy master (còn gọi client/controller) giữ file .jmx và điều khiển; các máy slave (còn gọi server/remote host) chạy tiến trình jmeter-server và thực sự sinh tải tới hệ thống đích. Master không tự sinh tải mà phát kịch bản qua RMI (Remote Method Invocation) tới từng slave, ra lệnh bắt đầu đồng thời, rồi gom kết quả về. Điểm mấu chốt: số thread khai trong Thread Group được nhân lên theo số slave. 1000 thread × 3 slave = 3000 user ảo đồng thời.",
        "In distributed testing, the master (also called client/controller) holds the .jmx and controls; the slaves (also called servers/remote hosts) run the jmeter-server process and actually generate load to the target. The master does not generate load itself but distributes the scenario over RMI (Remote Method Invocation) to each slave, commands a simultaneous start, then gathers results back. The key point: the thread count declared in the Thread Group is multiplied by the number of slaves. 1000 threads × 3 slaves = 3000 concurrent virtual users.",
        "分散実行では、マスター（クライアント／コントローラとも）が.jmxを保持し制御し、スレーブ（サーバー／リモートホストとも）がjmeter-serverプロセスを実行して実際に対象へ負荷を生成します。マスターは自ら負荷を生成せず、RMI（リモートメソッド呼び出し）でシナリオを各スレーブへ配布し、同時開始を命じ、結果を集めます。要点：スレッドグループで宣言したスレッド数はスレーブ数で乗算されます。1000スレッド×3スレーブ＝3000同時仮想ユーザーです。",
      ),
      IMG(
        SVG_DISTRIBUTED,
        "Master điều phối 3 slave qua RMI; mỗi slave chạy đủ số thread.",
        "The master coordinates 3 slaves over RMI; each slave runs the full thread count.",
        "マスターがRMIで3スレーブを調整し、各スレーブが全スレッド数を実行します。",
      ),
      CODE(
        "bash",
        `# Trên MỖI slave: khởi động jmeter-server (mở RMI port 1099/1098)
# Chỉ định IP để master gọi lại đúng interface
jmeter-server -Djava.rmi.server.hostname=10.0.1.21

# Trên master: chạy non-GUI, chỉ định các slave qua -R
jmeter -n -t payday-load.jmx -l results.jtl -e -o report/ \\
       -R 10.0.1.21,10.0.1.22,10.0.1.23

# Hoặc liệt kê remote_hosts trong jmeter.properties rồi dùng -r
jmeter -n -t payday-load.jmx -l results.jtl -r`,
      ),
      WARN(
        "RMI dùng nhiều cổng động — trong VPC/firewall phải mở đúng port hoặc ghim server.rmi.localport. Master và slave phải cùng phiên bản JMeter/Java, nếu lệch sẽ lỗi deserialization khó chẩn đoán.",
        "RMI uses many dynamic ports — in a VPC/firewall you must open the right ports or pin server.rmi.localport. Master and slaves must share the same JMeter/Java version; a mismatch causes hard-to-diagnose deserialization errors.",
        "RMIは多くの動的ポートを使います。VPC/ファイアウォールでは正しいポートを開くかserver.rmi.localportを固定する必要があります。マスターとスレーブは同じJMeter/Javaバージョンでなければならず、不一致は診断困難なデシリアライズエラーを起こします。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Correlation: bắt token động",
      en: "3. Correlation: capturing dynamic tokens",
      ja: "3. 相関：動的トークンの取得",
    },
    blocks: [
      P(
        "Ứng dụng ngân hàng thật không bao giờ cho hard-code token. Sau khi đăng nhập, server trả về một token phiên (JWT, CSRF token, hoặc session id) mà mọi request sau phải kèm theo. Nếu bạn ghi cứng token đã copy tay, nó hết hạn sau vài phút và toàn bộ request trả 401. Correlation là kỹ thuật trích xuất giá trị động từ phản hồi rồi đưa vào request tiếp theo qua biến JMeter. Hai công cụ chính: JSON Extractor (theo JSONPath cho API JSON) và Regular Expression Extractor (cho HTML/text).",
        "A real banking app never allows a hard-coded token. After login the server returns a session token (JWT, CSRF token or session id) that every subsequent request must carry. If you hard-code a manually copied token, it expires within minutes and all requests return 401. Correlation is the technique of extracting a dynamic value from a response and feeding it into the next request via a JMeter variable. Two main tools: JSON Extractor (by JSONPath for JSON APIs) and Regular Expression Extractor (for HTML/text).",
        "実際の銀行アプリは決してトークンのハードコードを許しません。ログイン後、サーバーはセッショントークン（JWT、CSRFトークン、セッションID）を返し、以降の全リクエストがそれを携えねばなりません。手動でコピーしたトークンをハードコードすると数分で失効し全リクエストが401を返します。相関とは、応答から動的な値を抽出し、JMeter変数を介して次のリクエストに投入する技術です。主なツールはJSONエクストラクタ（JSON APIにはJSONPath）と正規表現エクストラクタ（HTML/text）です。",
      ),
      IMG(
        SVG_CORRELATION,
        "Trích token từ /login rồi gắn Bearer vào /balance qua biến.",
        "Extract the token from /login then attach Bearer to /balance via a variable.",
        "/loginからトークンを抽出し変数経由で/balanceにBearerを付与します。",
      ),
      CODE(
        "text",
        `# JSON Extractor (đặt DƯỚI Sampler POST /login)
Names of created variables : authToken
JSON Path expressions       : $.data.accessToken
Match No. (0=random,-1=all) : 1
Default Values              : NOT_FOUND

# Regular Expression Extractor (khi response là HTML)
Reference Name  : csrf
Regular Expr.   : name="_csrf" value="([^"]+)"
Template        : $1$
Match No.       : 1`,
      ),
      P(
        "Sau khi trích, dùng biến \${authToken} trong Header Manager của Sampler kế tiếp: Authorization: Bearer \${authToken}. Vì mỗi thread có bộ biến riêng, mỗi user ảo giữ token riêng — đúng như thực tế nhiều người dùng đồng thời. Nếu Default Value là NOT_FOUND xuất hiện trong request, nghĩa là extractor không khớp: hãy soi lại đường JSONPath hoặc regex. Correlation sai là nguyên nhân số một khiến kịch bản load 'chạy được' nhưng error % cao ngất.",
        "After extraction, use the variable \${authToken} in the next Sampler's Header Manager: Authorization: Bearer \${authToken}. Because each thread has its own variable set, each virtual user keeps its own token — exactly like many real concurrent users. If the Default Value NOT_FOUND appears in a request, the extractor did not match: re-check the JSONPath or regex. Faulty correlation is the number-one reason a load scenario 'runs' but has a sky-high error %.",
        "抽出後、次のサンプラーのヘッダーマネージャで変数\${authToken}を使います。Authorization: Bearer \${authToken}です。各スレッドは独自の変数セットを持つため、各仮想ユーザーが独自のトークンを保持します。多数の実同時ユーザーと同じです。既定値NOT_FOUNDがリクエストに現れたら、エクストラクタが一致しなかったので、JSONPathや正規表現を再確認します。誤った相関は、負荷シナリオが「動く」のにerror %が極めて高い一番の原因です。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. JSR223 & Groovy",
      en: "4. JSR223 & Groovy",
      ja: "4. JSR223とGroovy",
    },
    blocks: [
      P(
        "Khi cần logic tùy biến — tính chữ ký HMAC, sinh dữ liệu động, xử lý response phức tạp — bạn dùng scripting. JMeter hỗ trợ BeanShell nhưng nay khuyến nghị mạnh JSR223 Sampler / PreProcessor / PostProcessor với ngôn ngữ Groovy. Lý do: BeanShell diễn giải lại mọi lần chạy nên chậm và ngốn CPU dưới tải cao, trong khi Groovy được biên dịch và cache (khi bật Compilation Caching), nhanh hơn nhiều lần. Với ngân hàng, JSR223 hay dùng để ký request bằng khóa bí mật hoặc mã hóa số tài khoản trước khi gửi.",
        "When you need custom logic — computing an HMAC signature, generating dynamic data, processing complex responses — you use scripting. JMeter supports BeanShell but now strongly recommends the JSR223 Sampler / PreProcessor / PostProcessor with the Groovy language. Reason: BeanShell re-interprets on every run so it is slow and CPU-heavy under high load, while Groovy is compiled and cached (with Compilation Caching on), many times faster. In banking, JSR223 is often used to sign a request with a secret key or encrypt an account number before sending.",
        "カスタムロジックが必要なとき（HMAC署名の計算、動的データ生成、複雑な応答処理）にはスクリプティングを使います。JMeterはBeanShellをサポートしますが、現在はGroovy言語のJSR223サンプラー／プリプロセッサ／ポストプロセッサを強く推奨します。理由：BeanShellは毎回再解釈するため高負荷で遅くCPUを消費しますが、Groovyはコンパイルされキャッシュされ（コンパイルキャッシュ有効時）、何倍も高速です。銀行ではJSR223は秘密鍵でリクエストに署名したり送信前に口座番号を暗号化するのによく使われます。",
      ),
      CODE(
        "groovy",
        `// JSR223 PreProcessor (language = groovy): ký HMAC-SHA256 cho request
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

def secret  = vars.get("apiSecret")
def payload = vars.get("txnPayload")
def mac = Mac.getInstance("HmacSHA256")
mac.init(new SecretKeySpec(secret.bytes, "HmacSHA256"))
def sig = mac.doFinal(payload.bytes).encodeHex().toString()

// Đưa chữ ký vào biến để Header Manager dùng: X-Signature: \${signature}
vars.put("signature", sig)
log.info("Signed txn for thread " + ctx.getThreadNum())`,
      ),
      TIP(
        "Trong JSR223, dùng đối tượng dựng sẵn: vars (biến JMeter), props (property), ctx (context), prev (SampleResult trước), log. Luôn chọn 'Cache compiled script if available' để Groovy không biên dịch lại mỗi vòng lặp.",
        "In JSR223, use the built-in objects: vars (JMeter variables), props (properties), ctx (context), prev (previous SampleResult), log. Always tick 'Cache compiled script if available' so Groovy does not recompile every iteration.",
        "JSR223では組み込みオブジェクトを使います。vars（JMeter変数）、props（プロパティ）、ctx（コンテキスト）、prev（前のSampleResult）、logです。Groovyが反復ごとに再コンパイルしないよう常に「Cache compiled script if available」を選びます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Tuning JVM & heap",
      en: "5. Tuning JVM & heap",
      ja: "5. JVMとヒープのチューニング",
    },
    blocks: [
      P(
        "JMeter là ứng dụng Java nên chịu chi phối của JVM và bộ dọn rác (Garbage Collector). Mặc định heap chỉ đặt khiêm tốn (thường 1GB), không đủ khi chạy hàng nghìn thread. Nếu heap cạn, JMeter ném OutOfMemoryError giữa chừng và kết quả vô dụng. Bạn chỉnh heap trong file khởi động (jmeter hoặc jmeter.bat) hoặc qua biến môi trường HEAP. Quy tắc: đặt -Xms bằng -Xmx để tránh JVM co giãn heap gây GC pause, và chừa RAM cho hệ điều hành.",
        "JMeter is a Java application, so it is governed by the JVM and the Garbage Collector. The default heap is modest (often 1GB), not enough for thousands of threads. If the heap runs out, JMeter throws OutOfMemoryError mid-run and results are useless. You tune the heap in the launch script (jmeter or jmeter.bat) or via the HEAP environment variable. Rule: set -Xms equal to -Xmx to avoid the JVM resizing the heap and causing GC pauses, and leave RAM for the OS.",
        "JMeterはJavaアプリケーションなのでJVMとガベージコレクタに支配されます。既定のヒープは控えめ（多くは1GB）で数千スレッドには不足します。ヒープが尽きるとJMeterは実行中にOutOfMemoryErrorを投げ結果は無価値になります。ヒープは起動スクリプト（jmeterまたはjmeter.bat）またはHEAP環境変数で調整します。原則：JVMのヒープ伸縮によるGCポーズを避けるため-Xmsを-Xmxと等しくし、OS用にRAMを残します。",
      ),
      CODE(
        "bash",
        `# Đặt heap trước khi chạy (Linux/macOS). 4GB ổn cho ~2000-3000 thread/máy
export HEAP="-Xms4g -Xmx4g -XX:MaxMetaspaceSize=256m"

# GC hiện đại (G1) giảm pause khi tải cao
export HEAP="$HEAP -XX:+UseG1GC -XX:MaxGCPauseMillis=100"

jmeter -n -t payday-load.jmx -l results.jtl -e -o report/`,
      ),
      UL(
        [
          "-Xms = -Xmx để heap cố định, tránh GC do resize.",
          "Dùng G1GC cho tải lớn; theo dõi GC log để phát hiện pause dài làm sai latency đo được.",
          "Tắt View Results Tree và các Listener nặng — chúng giữ mọi mẫu trong RAM và gây OOM.",
          "Ghi .jtl ở định dạng CSV (nhẹ hơn XML) và chỉ lưu trường cần thiết để giảm áp lực bộ nhớ/đĩa.",
        ],
        [
          "-Xms = -Xmx for a fixed heap, avoiding GC from resizing.",
          "Use G1GC for large load; watch GC logs for long pauses that skew measured latency.",
          "Disable View Results Tree and heavy listeners — they keep every sample in RAM and cause OOM.",
          "Write .jtl as CSV (lighter than XML) and save only needed fields to reduce memory/disk pressure.",
        ],
        [
          "ヒープ固定のため-Xms＝-XmxとしリサイズによるGCを避けます。",
          "大負荷にはG1GCを使い、測定レイテンシを歪める長いポーズをGCログで監視します。",
          "View Results Treeや重いリスナーを無効化します。全サンプルをRAMに保持しOOMを起こします。",
          ".jtlはCSV形式（XMLより軽い）で書き、必要な項目のみ保存してメモリ/ディスク負担を減らします。",
        ],
      ),
    ],
  },
  {
    heading: {
      vi: "6. Tránh bẫy GUI-mode",
      en: "6. Avoiding GUI-mode pitfalls",
      ja: "6. GUIモードの落とし穴回避",
    },
    blocks: [
      P(
        "Ở bài nền tảng ta đã nêu: không chạy load trong GUI. Ở quy mô phân tán, hậu quả còn nặng hơn. GUI mở trên master không chỉ tốn tài nguyên mà còn khiến master không kịp gom kết quả từ nhiều slave, gây nghẽn và mất mẫu. Quy tắc cứng: GUI chỉ để soạn thảo và gỡ lỗi; mọi lần chạy tải đều non-GUI. Ngay cả khi debug, hãy giới hạn 1-2 thread và ít vòng lặp, dùng View Results Tree tạm thời rồi TẮT trước khi chạy thật.",
        "In the foundation article we stated: do not run load in the GUI. At distributed scale the consequence is worse. A GUI open on the master not only wastes resources but also prevents the master from collecting results from many slaves in time, causing congestion and lost samples. Hard rule: the GUI is only for authoring and debugging; every load run is non-GUI. Even when debugging, limit to 1-2 threads and few loops, use View Results Tree temporarily then DISABLE it before the real run.",
        "基礎記事で述べた通り、GUIで負荷を実行しません。分散規模では結果はさらに深刻です。マスターで開いたGUIは資源を浪費するだけでなく、多数のスレーブからの結果収集をマスターが間に合わせられず、輻輳とサンプル喪失を招きます。厳格な規則：GUIは作成とデバッグ専用で、すべての負荷実行は非GUIです。デバッグ時でも1〜2スレッドと少数のループに制限し、View Results Treeを一時的に使い、本番実行前に無効化します。",
      ),
      WARN(
        "JMeter còn cảnh báo ngay trong GUI: 'Don't use GUI mode for load testing!'. Đó không phải lời khuyên tùy chọn — bỏ qua nó là lỗi nghề nghiệp phổ biến khiến báo cáo hiệu năng mất giá trị.",
        "JMeter even warns inside the GUI: 'Don't use GUI mode for load testing!'. That is not optional advice — ignoring it is a common professional mistake that voids the performance report.",
        "JMeterはGUI内でも警告します。「負荷テストにGUIモードを使わないでください！」これは任意の助言ではなく、無視は性能レポートを無効にするよくある職業的ミスです。",
      ),
      P(
        "Một mẹo tách bạch: giữ file .jmx sạch, không nhúng Listener kết quả trong đó. Thay vào đó cấu hình đầu ra .jtl qua dòng lệnh và sinh dashboard sau. Như vậy cùng một .jmx chạy nhất quán trên máy dev (debug GUI), CI runner (non-GUI) và cụm slave (phân tán) mà không phải sửa lại.",
        "A clean-separation tip: keep the .jmx tidy, do not embed result listeners in it. Instead configure .jtl output via the command line and generate the dashboard afterwards. Then the same .jmx runs consistently on a dev machine (GUI debug), a CI runner (non-GUI) and a slave cluster (distributed) without edits.",
        "分離のコツ：.jmxを整理し結果リスナーを埋め込まないことです。代わりに.jtl出力をコマンドラインで設定し、後でダッシュボードを生成します。すると同じ.jmxがdevマシン（GUIデバッグ）、CIランナー（非GUI）、スレーブクラスタ（分散）で編集なしに一貫して実行されます。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Báo cáo HTML dashboard",
      en: "7. HTML dashboard reports",
      ja: "7. HTMLダッシュボードレポート",
    },
    blocks: [
      P(
        "File .jtl là dữ liệu thô khó đọc bằng mắt. JMeter có sẵn tính năng sinh HTML Dashboard Report — một trang web tĩnh với biểu đồ throughput theo thời gian, phân bố response time, percentile, tỉ lệ lỗi, và bảng thống kê APDEX. Bạn tạo nó ngay khi chạy bằng cờ -e -o, hoặc sinh sau từ file .jtl đã có. Đây là tài liệu bạn gửi cho stakeholder: trực quan, có ngữ cảnh, và tự động.",
        "The .jtl file is raw data, hard to read by eye. JMeter includes an HTML Dashboard Report generator — a static web page with charts of throughput over time, response-time distribution, percentiles, error rates and an APDEX statistics table. You create it during the run with the -e -o flags, or generate it later from an existing .jtl. This is the artefact you send to stakeholders: visual, contextual and automatic.",
        ".jtlファイルは生データで目視は困難です。JMeterにはHTMLダッシュボードレポート生成機能があります。時系列スループット、応答時間分布、パーセンタイル、エラー率、APDEX統計表を備えた静的Webページです。実行中に-e -oフラグで作成するか、既存の.jtlから後で生成します。これはステークホルダーに送る成果物で、視覚的、文脈的、自動です。",
      ),
      CODE(
        "bash",
        `# Cách 1: sinh dashboard ngay trong lần chạy
jmeter -n -t payday-load.jmx -l results.jtl -e -o report/

# Cách 2: sinh dashboard SAU từ file .jtl đã có (-g)
jmeter -g results.jtl -o report/

# Tùy chỉnh percentile hiển thị trong reportgenerator.properties, ví dụ:
# jmeter.reportgenerator.graph.responseTimePercentiles.property.set_granularity=1000`,
      ),
      P(
        "Trong dashboard, các chỉ số then chốt để duyệt SLA: Response Times Percentiles (đọc p90/p95/p99), Transactions Per Second (throughput theo thời gian — nhìn plateau để thấy điểm bão hòa), Error rate over time (lỗi có tăng theo tải không), và Active Threads Over Time (kiểm chứng ramp-up đúng như thiết kế). APDEX cho một điểm số hài lòng tổng hợp dựa trên ngưỡng bạn đặt. Lưu report cùng .jmx trong Git hoặc artifact CI để có lịch sử so sánh giữa các lần release.",
        "In the dashboard, the key metrics to approve an SLA: Response Times Percentiles (read p90/p95/p99), Transactions Per Second (throughput over time — look at the plateau for the saturation point), Error rate over time (does error rise with load), and Active Threads Over Time (verify ramp-up matches the design). APDEX gives an aggregate satisfaction score based on your thresholds. Store the report alongside the .jmx in Git or a CI artifact for a comparison history across releases.",
        "ダッシュボードでSLAを承認する主要指標は、応答時間パーセンタイル（p90/p95/p99を読む）、毎秒トランザクション（時系列スループット、飽和点をプラトーで見る）、時系列エラー率（負荷で誤りが増えるか）、時系列アクティブスレッド（ランプアップが設計通りか検証）です。APDEXは設定閾値に基づく総合満足度スコアを与えます。リリース間の比較履歴のため、レポートを.jmxとともにGitやCIアーティファクトに保存します。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Tích hợp CI/CD",
      en: "8. CI/CD integration",
      ja: "8. CI/CD統合",
    },
    blocks: [
      P(
        "Performance test có giá trị nhất khi chạy tự động trong pipeline, không chỉ một lần trước release. Vì .jmx là file phẳng và chế độ non-GUI thân thiện dòng lệnh, JMeter tích hợp dễ vào Jenkins, GitLab CI hay GitHub Actions. Mẫu chung: checkout code → chạy JMeter non-GUI với ngưỡng tải nhẹ (smoke perf) mỗi PR, và ngưỡng đầy đủ theo lịch đêm. Quan trọng nhất là thiết lập quality gate: pipeline fail nếu p95 vượt ngưỡng hoặc error % quá cao, để hồi quy hiệu năng bị chặn sớm.",
        "Performance tests are most valuable when run automatically in a pipeline, not just once before release. Because the .jmx is a flat file and non-GUI mode is command-line friendly, JMeter integrates easily into Jenkins, GitLab CI or GitHub Actions. Common pattern: checkout code → run JMeter non-GUI with a light load threshold (smoke perf) on every PR, and a full threshold on a nightly schedule. Most important is a quality gate: fail the pipeline if p95 exceeds a threshold or error % is too high, so performance regressions are blocked early.",
        "性能テストはリリース前の一度きりでなく、パイプラインで自動実行されるときに最も価値があります。.jmxはフラットファイルで非GUIモードはコマンドラインに親和的なため、JMeterはJenkins、GitLab CI、GitHub Actionsに容易に統合します。一般的パターン：コードをチェックアウト→各PRで軽い負荷閾値（スモーク性能）の非GUI実行、夜次スケジュールで完全な閾値です。最も重要なのは品質ゲートで、p95が閾値を超えるかerror %が高すぎればパイプラインを失敗させ、性能回帰を早期に阻止します。",
      ),
      CODE(
        "yaml",
        `# GitHub Actions: chạy perf smoke mỗi PR, fail nếu vượt ngưỡng
jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run JMeter (non-GUI)
        run: |
          jmeter -n -t tests/payday-load.jmx -l out/results.jtl \\
                 -e -o out/report -Jthreads=50 -Jduration=120
      - name: Assert SLA (p95 < 800ms, error < 1%)
        run: python ci/check_sla.py out/results.jtl --p95 800 --err 1
      - uses: actions/upload-artifact@v4
        with: { name: jmeter-report, path: out/report }`,
      ),
      NOTE(
        "Trong CI, đặt ngưỡng tải phù hợp môi trường runner (thường yếu hơn production). Coi perf-in-CI là chốt hồi quy tương đối (so với baseline), không phải con số tuyệt đối; benchmark tải đầy đủ chạy trên hạ tầng giống production.",
        "In CI, set a load threshold suited to the runner environment (usually weaker than production). Treat perf-in-CI as a relative regression gate (versus a baseline), not an absolute number; run full-load benchmarks on production-like infrastructure.",
        "CIではランナー環境（通常本番より非力）に合った負荷閾値を設定します。CI内性能はベースラインに対する相対的回帰ゲートとして扱い絶対値としません。完全な負荷ベンチマークは本番同等インフラで実行します。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Cạm bẫy khi scale phân tán",
      en: "9. Pitfalls when scaling out",
      ja: "9. 水平スケール時の落とし穴",
    },
    blocks: [
      P(
        "Distributed testing thêm nhiều lớp có thể sai. Thường gặp nhất là đồng hồ các slave lệch nhau khiến timestamp trong .jtl không khớp — hãy đồng bộ NTP mọi máy. Kế đến, mỗi slave đọc CSV độc lập, nên nếu bạn cần dữ liệu unique toàn cụm, không thể chỉ copy cùng một file cho mọi slave (sẽ trùng). Giải pháp là chia file theo slave, hoặc sinh dữ liệu bằng hàm/JSR223 dựa trên chỉ số máy. Ngoài ra bản thân slave cũng có giới hạn tài nguyên — theo dõi CPU của chính slave để chắc chúng không bão hòa.",
        "Distributed testing adds layers that can go wrong. Most common: slave clocks drift so .jtl timestamps do not align — synchronise NTP on every machine. Next, each slave reads CSV independently, so if you need cluster-wide unique data you cannot just copy one file to every slave (duplicates). The fix is to split the file per slave, or generate data with functions/JSR223 based on a machine index. Also, slaves themselves have resource limits — monitor each slave's CPU to ensure they are not saturated.",
        "分散実行は誤り得る層を追加します。最も一般的なのはスレーブの時計のずれで.jtlのタイムスタンプが揃わないことです。全マシンでNTP同期します。次に各スレーブはCSVを独立に読むため、クラスタ全体で一意なデータが必要なら1ファイルを全スレーブにコピーするだけでは重複します。修正はファイルをスレーブごとに分割するか、マシン番号に基づき関数/JSR223でデータ生成します。さらにスレーブ自身にも資源限界があり、飽和しないよう各スレーブのCPUを監視します。",
      ),
      UL(
        [
          "Đồng bộ NTP mọi master/slave để timestamp .jtl hợp lệ.",
          "Chia CSV theo slave hoặc dùng __machineName()/index để tránh trùng dữ liệu.",
          "Giám sát CPU/mạng của chính slave — nếu slave bão hòa, số liệu server bị nhiễu.",
          "Mở đúng cổng RMI trong firewall/VPC; ghim server.rmi.localport để dự đoán được.",
          "Đồng bộ đúng phiên bản JMeter/Java và plugin trên tất cả các máy.",
        ],
        [
          "Synchronise NTP on all master/slaves so .jtl timestamps are valid.",
          "Split the CSV per slave or use __machineName()/index to avoid duplicate data.",
          "Monitor each slave's CPU/network — if a slave saturates, server metrics are contaminated.",
          "Open the right RMI ports in firewall/VPC; pin server.rmi.localport for predictability.",
          "Keep the same JMeter/Java version and plugins on all machines.",
        ],
        [
          ".jtlタイムスタンプを有効にするため全マスター/スレーブでNTP同期します。",
          "重複データを避けるためCSVをスレーブごとに分割するか__machineName()/indexを使います。",
          "各スレーブのCPU/ネットワークを監視します。スレーブが飽和するとサーバー指標が汚染されます。",
          "ファイアウォール/VPCで正しいRMIポートを開き、予測可能にするためserver.rmi.localportを固定します。",
          "全マシンで同じJMeter/Javaバージョンとプラグインを維持します。",
        ],
      ),
    ],
  },
  {
    heading: {
      vi: "10. Kịch bản thực chiến: ngày lương",
      en: "10. Real scenario: payday load",
      ja: "10. 実戦シナリオ：給料日の負荷",
    },
    blocks: [
      SCEN(
        "Cao điểm giao dịch ngày lương",
        "Payday transaction peak",
        "Ngân hàng dự kiến ngày lương 25 hằng tháng lượng chuyển khoản đạt đỉnh 8000 TPS. SLA: p95 < 900ms, p99 < 2s, error < 0,1%. Một máy tạo tải chỉ đạt 2500 TPS đã cạn CPU, nên đội dựng cụm 4 slave × mỗi slave 1000 thread = 4000 user ảo, ramp-up 180s. Kịch bản: POST /auth → JSON Extractor lấy accessToken → JSR223 ký HMAC cho payload chuyển khoản → POST /transfer với Header Bearer + X-Signature; Response Assertion 200 và JSON Assertion status='COMPLETED'; think-time Uniform 2-5s.",
        "A bank expects payday on the 25th of each month to peak at 8000 TPS of transfers. SLA: p95 < 900ms, p99 < 2s, error < 0.1%. One generator only reached 2500 TPS before exhausting CPU, so the team builds a cluster of 4 slaves × 1000 threads each = 4000 virtual users, 180s ramp-up. Scenario: POST /auth → JSON Extractor for accessToken → JSR223 signs HMAC for the transfer payload → POST /transfer with Bearer + X-Signature headers; Response Assertion 200 and JSON Assertion status='COMPLETED'; Uniform 2-5s think-time.",
        "給料日取引のピーク",
        "銀行は毎月25日の給料日に送金が8000 TPSでピークになると予想します。SLA：p95<900ms、p99<2s、error<0.1%。1台の生成機はCPUを使い切って2500 TPSしか達しなかったため、チームは4スレーブ×各1000スレッド＝4000仮想ユーザー、ランプアップ180sのクラスタを構築します。シナリオ：POST /auth→accessTokenをJSONエクストラクタで取得→JSR223が送金ペイロードにHMAC署名→BearerとX-Signatureヘッダー付きPOST /transfer、レスポンスアサーション200とstatus='COMPLETED'のJSONアサーション、ユニフォーム2〜5秒のシンクタイムです。",
      ),
      P(
        "Lần chạy phân tán đầu đạt 6200 TPS thì error tăng và HTML dashboard cho thấy throughput chững lại (plateau) trong khi Active Threads vẫn tăng — dấu hiệu bão hòa. APM server chỉ ra hàng đợi Kafka giữa dịch vụ transfer và ledger bị dồn. Sau khi tăng partition Kafka và consumer, lần chạy thứ hai đạt 8400 TPS, p95 = 720ms, p99 = 1,6s, error 0,03%. Toàn bộ chạy trong pipeline đêm với quality gate; report HTML lưu làm artifact để so sánh mỗi release. Đây là minh họa trọn vẹn: phân tán để đủ tải, correlation + JSR223 cho request thật, đọc dashboard theo percentile, và tìm nguyên nhân gốc qua APM.",
        "The first distributed run reached 6200 TPS before error rose and the HTML dashboard showed throughput plateauing while Active Threads kept climbing — a saturation sign. Server APM pointed to a Kafka queue between the transfer service and the ledger backing up. After increasing Kafka partitions and consumers, the second run hit 8400 TPS, p95 = 720ms, p99 = 1.6s, error 0.03%. The whole thing ran in a nightly pipeline with a quality gate; the HTML report is stored as an artifact to compare each release. This is a complete illustration: distribute for enough load, correlation + JSR223 for real requests, read the dashboard by percentile, and find the root cause via APM.",
        "最初の分散実行は6200 TPSに達したところでエラーが増え、HTMLダッシュボードはActive Threadsが上昇し続ける中スループットが横ばい（プラトー）になったことを示しました。飽和の兆候です。サーバーAPMは送金サービスと元帳の間のKafkaキューが滞留していることを指摘しました。Kafkaパーティションとコンシューマを増やした後、二回目の実行は8400 TPS、p95＝720ms、p99＝1.6s、error 0.03%に達しました。全体は品質ゲート付きの夜次パイプラインで実行され、HTMLレポートは各リリース比較のためアーティファクトとして保存されます。これは完全な例示です。十分な負荷のための分散、実リクエストのための相関＋JSR223、パーセンタイルでのダッシュボード読解、そしてAPMによる根本原因の発見です。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Hỏi đáp phỏng vấn nâng cao",
      en: "11. Advanced interview Q&A",
      ja: "11. 上級面接Q&A",
    },
    blocks: [
      QA(
        "Distributed testing hoạt động thế nào và số thread được nhân ra sao?",
        "How does distributed testing work and how are threads multiplied?",
        "Máy master phát .jmx qua RMI tới các slave chạy jmeter-server; mỗi slave thực thi ĐẦY ĐỦ số thread khai trong Thread Group. Vì vậy tổng user ảo = số thread × số slave. Master không sinh tải, chỉ điều phối và gom kết quả. Lệnh: jmeter -n -t plan.jmx -l r.jtl -R host1,host2,host3.",
        "The master distributes the .jmx over RMI to slaves running jmeter-server; each slave executes the FULL thread count declared in the Thread Group. So total virtual users = threads × slaves. The master does not generate load, only coordinates and collects results. Command: jmeter -n -t plan.jmx -l r.jtl -R host1,host2,host3.",
        "分散実行はどう動作し、スレッドはどう乗算されますか。",
        "マスターがRMIで.jmxをjmeter-serverを実行するスレーブへ配布し、各スレーブがスレッドグループで宣言した全スレッド数を実行します。よって総仮想ユーザー＝スレッド数×スレーブ数です。マスターは負荷を生成せず調整と結果収集のみ行います。コマンド：jmeter -n -t plan.jmx -l r.jtl -R host1,host2,host3。",
      ),
      QA(
        "Vì sao nên dùng JSR223/Groovy thay vì BeanShell?",
        "Why prefer JSR223/Groovy over BeanShell?",
        "BeanShell diễn giải lại mã mỗi lần chạy nên chậm và ngốn CPU dưới tải cao, làm giảm khả năng sinh tải và nhiễu số liệu. Groovy trong JSR223 được biên dịch và cache (bật Compilation Caching) nên nhanh hơn nhiều lần. Với hàng nghìn thread, chi phí này quyết định máy tạo tải có phải là nút thắt hay không.",
        "BeanShell re-interprets code on each run, so it is slow and CPU-heavy under high load, reducing load capacity and contaminating metrics. Groovy in JSR223 is compiled and cached (with Compilation Caching on), many times faster. With thousands of threads this cost decides whether the load generator becomes the bottleneck.",
        "なぜBeanShellよりJSR223/Groovyを好むのですか。",
        "BeanShellは毎回コードを再解釈するため高負荷で遅くCPUを消費し、負荷能力を下げ指標を汚染します。JSR223のGroovyはコンパイルされキャッシュされ（コンパイルキャッシュ有効時）何倍も高速です。数千スレッドでは、このコストが負荷生成機がボトルネックになるか否かを決めます。",
      ),
      QA(
        "Bạn xử lý correlation cho token động như thế nào?",
        "How do you handle correlation for dynamic tokens?",
        "Sau login, dùng JSON Extractor (JSONPath $.data.accessToken) hoặc Regular Expression Extractor để trích token vào biến, rồi gắn Authorization: Bearer \${token} trong Header Manager của các request sau. Mỗi thread giữ biến riêng nên mô phỏng đúng nhiều phiên. Nếu thấy giá trị Default (NOT_FOUND) nghĩa là extractor không khớp và cần sửa biểu thức.",
        "After login, use a JSON Extractor (JSONPath $.data.accessToken) or Regular Expression Extractor to extract the token into a variable, then set Authorization: Bearer \${token} in subsequent requests' Header Manager. Each thread keeps its own variable, correctly simulating many sessions. Seeing the Default value (NOT_FOUND) means the extractor did not match and the expression needs fixing.",
        "動的トークンの相関をどう扱いますか。",
        "ログイン後、JSONエクストラクタ（JSONPath $.data.accessToken）または正規表現エクストラクタでトークンを変数に抽出し、以降のリクエストのヘッダーマネージャでAuthorization: Bearer \${token}を設定します。各スレッドが独自の変数を保持し多数のセッションを正しく模擬します。既定値（NOT_FOUND）が見えたらエクストラクタが一致せず式の修正が必要です。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Tổng kết & checklist nâng cao",
      en: "12. Summary & advanced checklist",
      ja: "12. まとめと上級チェックリスト",
    },
    blocks: [
      P(
        "Scale JMeter cho tải cao là bài toán kiến trúc, không chỉ tăng số thread. Bạn tối ưu một máy trước (heap, GC, Listener), rồi phân tán master-slave qua RMI khi cần, dùng correlation để request phản ánh phiên thật, JSR223/Groovy cho logic ký và dữ liệu, sinh HTML dashboard để đọc percentile trực quan, cắm vào CI với quality gate, và luôn đối chiếu APM server để tìm nguyên nhân gốc. Làm đủ chuỗi này, báo cáo hiệu năng của bạn đủ độ tin cậy để một ngân hàng dựa vào đó quyết định phát hành.",
        "Scaling JMeter for high load is an architecture problem, not just raising thread count. You optimise one machine first (heap, GC, listeners), then distribute master-slave over RMI when needed, use correlation so requests reflect real sessions, JSR223/Groovy for signing logic and data, generate an HTML dashboard to read percentiles visually, plug into CI with a quality gate, and always correlate server APM to find the root cause. Do this whole chain and your performance report is trustworthy enough for a bank to base a release decision on.",
        "高負荷向けのJMeterスケールは、スレッド数を増やすだけでなく設計の課題です。まず1台を最適化し（ヒープ、GC、リスナー）、必要時にRMIでマスタースレーブを分散し、実セッションを反映するよう相関を使い、署名ロジックとデータにJSR223/Groovyを用い、パーセンタイルを視覚的に読むHTMLダッシュボードを生成し、品質ゲート付きでCIに組み込み、常にサーバーAPMと照合して根本原因を探します。この一連を行えば、性能レポートは銀行がリリース判断の根拠にできるほど信頼できます。",
      ),
      UL(
        [
          "Tối ưu 1 máy trước: -Xms=-Xmx, G1GC, tắt Listener nặng, .jtl CSV gọn.",
          "Phân tán master-slave qua RMI (-R hoặc -r); đồng bộ phiên bản & NTP mọi máy.",
          "Correlation bằng JSON/Regex Extractor; kiểm giá trị Default để phát hiện lỗi trích xuất.",
          "JSR223/Groovy có cache biên dịch cho logic ký/mã hóa; tránh BeanShell trong hot path.",
          "Sinh HTML dashboard (-e -o hoặc -g); đọc percentile, TPS plateau, error theo thời gian.",
          "Cắm CI với quality gate (fail nếu p95/error vượt ngưỡng); lưu report làm artifact.",
        ],
        [
          "Optimise one machine first: -Xms=-Xmx, G1GC, disable heavy listeners, compact CSV .jtl.",
          "Distribute master-slave over RMI (-R or -r); sync versions & NTP on all machines.",
          "Correlate with JSON/Regex Extractor; check the Default value to detect extraction failure.",
          "JSR223/Groovy with compilation caching for signing/encryption logic; avoid BeanShell in the hot path.",
          "Generate an HTML dashboard (-e -o or -g); read percentiles, TPS plateau, error over time.",
          "Plug into CI with a quality gate (fail if p95/error exceeds thresholds); store the report as an artifact.",
        ],
        [
          "まず1台を最適化：-Xms=-Xmx、G1GC、重いリスナー無効、コンパクトなCSV .jtl。",
          "RMIでマスタースレーブを分散（-Rまたは-r）、全マシンでバージョンとNTPを同期。",
          "JSON/正規表現エクストラクタで相関、既定値を確認して抽出失敗を検出。",
          "署名/暗号化ロジックにコンパイルキャッシュ付きJSR223/Groovy、ホットパスでBeanShellを回避。",
          "HTMLダッシュボード生成（-e -oまたは-g）、パーセンタイル・TPSプラトー・時系列エラーを読む。",
          "品質ゲート付きでCIに組込（p95/errorが閾値超で失敗）、レポートをアーティファクト保存。",
        ],
      ),
    ],
  },
];

// ============================================================================
// EXPORT
// ============================================================================
export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-jmeter-load-foundation",
    cover: makeThumb({ id: "atjm1", domain: "telecom", kind: "congnghe", label: "JMETER · LOAD" }),
    tags: tags("congnghe", "jmeter", "foundation"),
    title: {
      vi: "JMeter nền tảng: dựng test plan tải từ số 0",
      en: "JMeter foundation: building a load test plan from zero",
      ja: "JMeter基礎：ゼロから負荷テストプランを構築する",
    },
    summary: {
      vi: "Dựng Test Plan JMeter từ đầu cho hệ viễn thông: Thread Group, HTTP Sampler, Config Elements, CSV Data Set, Assertion, Timer, Listener; chạy non-GUI và đọc throughput/latency/percentile.",
      en: "Build a JMeter Test Plan from scratch for a telecom system: Thread Group, HTTP Sampler, Config Elements, CSV Data Set, Assertions, Timers, Listeners; run non-GUI and read throughput/latency/percentiles.",
      ja: "通信システム向けにJMeterテストプランをゼロから構築します。スレッドグループ、HTTPサンプラー、設定エレメント、CSVデータセット、アサーション、タイマー、リスナー、非GUI実行、スループット/レイテンシ/パーセンタイルの読解です。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-jmeter-distributed-advanced",
    cover: makeThumb({ id: "atjm2", domain: "banking", kind: "nangcao", label: "JMETER · SCALE" }),
    tags: tags("nangcao", "jmeter", "advanced"),
    title: {
      vi: "JMeter nâng cao: phân tán, correlation & tuning",
      en: "Advanced JMeter: distribution, correlation & tuning",
      ja: "JMeter応用：分散実行・相関・チューニング",
    },
    summary: {
      vi: "Scale JMeter cho tải ngân hàng cao: kiểm thử phân tán master-slave, correlation token động, JSR223/Groovy, tuning JVM/heap, tránh bẫy GUI, sinh HTML dashboard và tích hợp CI với quality gate.",
      en: "Scale JMeter for high banking load: master-slave distributed testing, dynamic-token correlation, JSR223/Groovy, JVM/heap tuning, avoiding GUI pitfalls, HTML dashboards and CI integration with quality gates.",
      ja: "高負荷の銀行向けにJMeterをスケールします。マスタースレーブ分散実行、動的トークン相関、JSR223/Groovy、JVM/ヒープチューニング、GUIの罠回避、HTMLダッシュボード、品質ゲート付きCI統合です。",
    },
    pages: buildDoc(pages2),
  },
];
