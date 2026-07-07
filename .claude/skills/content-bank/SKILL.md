---
name: content-bank
description: Định dạng & quy tắc biên tập ngân hàng nội dung trong prisma/*.mjs — bài tài liệu nhiều trang, câu phỏng vấn MCQ/tự luận/tình huống, đề ISTQB, danh mục, CV. Giữ đa ngôn ngữ VI/EN/JA, chỉ số đáp án MCQ, keyword chấm tự luận, khóa slug ổn định. Dùng khi thao tác nội dung học tập/đề thi hoặc cần hiểu cách seed nạp dữ liệu.
---

# Biên tập ngân hàng nội dung (prisma/*.mjs)

Nội dung được chia thành nhiều module `prisma/*.mjs`; `prisma/seed.mjs` import và **upsert** vào DB.
File lớn → **thao tác chính xác từng phần**, đừng ghi lại cả file khi chỉ đổi một mục.

## Seed nạp thế nào
- `prisma/seed.mjs` gom các mảng (docs, interview, istqb, cv, topics…) rồi `upsert` theo **khóa ổn định**:
  `Category.slug`, `Article.slug`. Nhờ đó cập nhật tại chỗ **không mất** bookmark / lượt đọc / kết quả.
- Chạy: `npm run db:seed` (an toàn). Gộp cả push schema: `npm run setup`.
- **Đổi `slug` = tạo bản ghi mới** (mất liên kết cũ). Muốn sửa bài cũ → giữ nguyên `slug`.

## Danh mục (Category)
```js
{ tab: "DOCS"|"INTERVIEW"|"ISTQB", slug: "duy-nhat",
  title: JSON.stringify({vi:"…", en:"…", ja:"…"}),
  description: JSON.stringify({vi:"…", en:"…", ja:"…"}),
  icon: "book", order: 0 }
```

## Bài tài liệu (Article)
- Trường chính: `slug` (ổn định), `title` (JSON 3 ngôn ngữ), `categoryId`, ảnh đại diện, tóm tắt, **các trang**.
- Trang nội dung sinh qua `prisma/content.mjs` (`buildPages`) + `thumbnail.mjs` (ảnh đại diện theo motif).
- Viewer chỉ hiển thị ảnh từng trang, có watermark theo học viên — nội dung phải phù hợp để hiển thị dạng trang.

## Câu phỏng vấn (InterviewQuestion) — 3 loại `kind`
```js
// MCQ: answer là CHỈ SỐ dạng chuỗi trỏ vào options
{ kind: "MCQ", categoryId, prompt: JSON.stringify({vi,en,ja}),
  options: JSON.stringify(["A","B","C","D"]), answer: "2",
  explanation: JSON.stringify({vi,en,ja}) }

// ESSAY / SCENARIO: answer là MẢNG KEYWORD (JSON) — chấm theo tỉ lệ khớp
{ kind: "ESSAY", categoryId, prompt: JSON.stringify({vi,en,ja}),
  answer: JSON.stringify(["boundary","null","dữ liệu biên"]) }
```
Chấm ở `src/app/api/practice/grade/route.js`: MCQ so khớp chỉ số; tự luận tính `hit/keywords` (≥0.5 coi là đạt).

## ISTQB
- Danh mục `tab: "ISTQB"`, ngân hàng MCQ lớn theo level (Foundation / Advanced / Expert).
- `/api/practice/start` bốc **ngẫu nhiên** một đề con mỗi lần luyện ISTQB (theo `istqb_question_count`).

## Quy tắc vàng
1. **MCQ `answer`** = chỉ số hợp lệ (0..len-1) dạng chuỗi, trỏ đúng đáp án; đừng tự xáo trong nguồn (server tự xáo khi thi).
2. **Tự luận/tình huống**: keyword đặc trưng, hợp lý; tránh từ quá phổ biến khiến chấm sai.
3. **Đa ngôn ngữ cân bằng**: `{vi,en,ja}` đầy đủ; thiếu thì fallback VI. Tiếng Việt đủ dấu.
4. **JSON hợp lệ UTF-8**: không dấu phẩy thừa, không ký tự điều khiển. (Các trường JSON được lưu dạng chuỗi.)
5. **`slug` duy nhất & ổn định**; đúng `tab`/`categoryId`.

## Kiểm chứng sau khi sửa
- Hook `PostToolUse` tự chạy `node --check` trên `prisma/*.mjs` (bắt lỗi cú pháp) sau mỗi lần Edit/Write.
- Chạy `npm run db:seed` trên **DB tạm** để thử, rồi kiểm bằng skill `db-inspect`.
