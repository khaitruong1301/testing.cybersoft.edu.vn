# Bản đồ khóa học CyberSoft Academy — dùng cho CTA, internal link & Course schema

> Nguồn (kiểm tra & CẬP NHẬT URL trước khi phát hành): trang danh sách khóa học
> https://cybersoft.edu.vn/danh-sach-khoa-hoc/ . Nếu URL chi tiết thay đổi, sửa ở BẢNG này —
> mọi bài dùng chung nên chỉ sửa 1 nơi.

## 1. Nguyên tắc gắn khóa vào bài (pillar ↔ cluster)
- Mỗi bài chọn **1 khóa chính** (primary course) làm CTA + `Course` schema; có thể thêm 1–2 khóa phụ
  (cross-sell) qua internal link.
- Chọn khóa **khớp ý định người đọc**: bài Tester/QA → khóa Software Testing; bài web/JS → khóa Front-End…
- Anchor text = tên khóa mô tả đúng, KHÔNG "bấm vào đây".

## 2. Bảng khóa (COURSES) — object dùng trong `CTA()` / `buildSeo({courses})`
> Trường: `key` (khóa nội bộ) · `vi/en/ja` (tên hiển thị) · `url` · `mode` · `workload` · `desc` ·
> `keywords` (cụm pillar để rải internal link về khóa này).

### tester — Software Testing (Manual + Automation) ⭐ trọng tâm hệ thống
- url: `https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/`
- vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc"
- en: "Professional Software Testing (Manual + Automation) — Zero to hired"
- ja: "ソフトウェアテスト専門コース（手動＋自動）"
- mode: "blended" · workload: "PT200H"
- desc: "Lộ trình Tester từ con số 0: Manual, Automation (Selenium/Playwright), API, Performance, AI cho Tester; hỗ trợ việc làm trọn đời."
- keywords: khóa học tester, học kiểm thử phần mềm, tester automation, selenium, playwright, api testing, manual testing, lộ trình QA

### tester1v1 — Học lập trình / Tester 1 kèm 1
- url: `https://cybersoft.edu.vn/trainning-course-1vs1/`
- vi: "Đào tạo 1 kèm 1 (mentor riêng)" · en: "1-on-1 mentoring" · ja: "1対1指導"
- desc: "Lộ trình cá nhân hoá, học kèm mentor — phù hợp người bận rộn hoặc muốn tăng tốc."
- keywords: học lập trình 1 kèm 1, mentor tester, học kèm riêng

### enterprise — Đào tạo cho Doanh nghiệp
- url: `https://cybersoft.edu.vn/danh-cho-doanh-nghiep/`
- vi: "Đào tạo Tester/Automation cho doanh nghiệp" · en: "Corporate training" · ja: "法人研修"
- desc: "Xây đội QA/Automation theo nhu cầu doanh nghiệp; đào tạo tại chỗ."
- keywords: đào tạo doanh nghiệp, in-house QA training, upskill team tester

### backend-java — Bootcamp Back-End Java
- url: `https://cybersoft.edu.vn/danh-sach-khoa-hoc/`  (⚠️ thay bằng URL chi tiết khóa Java khi có)
- vi: "Bootcamp Lập trình Back-End Java" · en: "Back-End Java Bootcamp" · ja: "バックエンドJavaブートキャンプ"
- keywords: học java, backend java, spring boot, khóa học lập trình java

### fullstack — Bootcamp Full-Stack (Front-End + Back-End)
- url: `https://cybersoft.edu.vn/danh-sach-khoa-hoc/`  (⚠️ cập nhật URL chi tiết)
- vi: "Bootcamp Lập trình Full-Stack" · en: "Full-Stack Bootcamp" · ja: "フルスタックブートキャンプ"
- keywords: học lập trình web, front-end, react, nodejs, full-stack

### data — Data Analyst (Python/SQL)
- url: `https://cybersoft.edu.vn/danh-sach-khoa-hoc/`  (⚠️ cập nhật URL chi tiết)
- vi: "Khóa Data Analyst (Python & SQL)" · en: "Data Analyst (Python/SQL)" · ja: "データアナリスト"
- keywords: học data analyst, python sql, phân tích dữ liệu

### mobile-flutter — Mobile App (Flutter)
- url: `https://cybersoft.edu.vn/danh-sach-khoa-hoc/`  (⚠️ cập nhật URL chi tiết)
- vi: "Khóa lập trình Mobile Flutter" · en: "Flutter Mobile" · ja: "Flutterモバイル開発"
- keywords: học flutter, lập trình mobile, app di động

## 3. Snippet object mẫu (copy vào file bài)
```js
const COURSE_TESTER = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0: Manual, Automation (Selenium/Playwright), API, Performance, AI cho Tester; hỗ trợ việc làm trọn đời.",
};
```

## 4. Ma trận "bài → khóa nên gắn"
| Loại bài | Khóa chính (CTA + Course schema) | Khóa phụ (cross-link) |
|---|---|---|
| congnghe / nangcao / thucchien / tichhop / phongvan (Tester) | **tester** | tester1v1, enterprise |
| Bài người mới (beginner) | **tester** | tester1v1 |
| Bài liên quan web/JS trong ví dụ | tester | fullstack |
| Bài liên quan Java/API backend | tester | backend-java |
| Bài liên quan data/DB testing | tester | data |

> Luôn ưu tiên khóa **tester** cho hệ thống tài liệu QA; các khóa khác chỉ cross-sell khi ngữ cảnh hợp.
