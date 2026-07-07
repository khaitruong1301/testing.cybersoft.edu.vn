# Chuẩn biên soạn bài "NGƯỜI MỚI" (foundation · practice-first · SEO)

Đối tượng: người **mới học** kiểm thử/lập trình, chưa có nền. Mục tiêu: đọc xong LÀM ĐƯỢC NGAY, hiểu
nền tảng lý thuyết vừa đủ, và tự kiểm tra bằng trắc nghiệm. Đồng thời bài vẫn **chuẩn SEO** để lên top
và điều hướng về khóa học CyberSoft (kế thừa `references/seo-standard.md`).

## A. Triết lý (khác bài chuyên sâu)
1. **Thực hành tối đa** — mỗi khái niệm đi kèm 1 việc người học tự làm (dùng `TRY()`), có các BƯỚC rõ
   ràng (`STEP()`), và code ngắn chạy được. Tỉ lệ "làm : đọc lý thuyết" ≈ 60:40.
2. **Hình ảnh tối đa** — MỖI khái niệm chính có ≥1 hình minh hoạ SVG tự vẽ (sơ đồ, luồng, ảnh chụp mô
   phỏng giao diện công cụ). Mục tiêu **≥5 hình/bài**. Hình có `cap` mô tả (kiêm alt SEO).
3. **Tình huống → giải NGAY** — mỗi bài có ≥2 tình huống cụ thể (`SITUATION()`), giải liền phía dưới
   (`SOLVE()` + STEP/CODE). Không để lý thuyết trôi nổi không gắn ví dụ.
4. **Nền tảng lý thuyết vừa đủ** — giải thích "cái gì / vì sao" bằng ngôn ngữ đơn giản, có `DEF()` định
   nghĩa 1 câu cho mỗi thuật ngữ; tránh hàn lâm, tránh nhồi thuật ngữ chưa giải thích.
5. **Tự kiểm tra** — MỖI bài kết bằng 1 chương **Trắc nghiệm 4–5 câu** (`QUIZ([mcq...])`), mỗi câu có
   4–5 lựa chọn + đáp án + **giải thích tại sao đúng/sai**.

## B. Cấu trúc mặc định (8–12 chương ngắn, dễ tiêu hoá)
1. **Tóm tắt nhanh (TL;DR) + bài này giúp bạn làm được gì** — `TLDR()`, đặt primary keyword câu đầu.
2. **Khái niệm nền tảng** — `DEF()` cho từng thuật ngữ + 1 hình + ví dụ đời thường (ẩn dụ).
3. **Vì sao quan trọng / dùng khi nào** — gắn với công việc Tester thực tế.
4. **Chuẩn bị (cài đặt/công cụ)** — các BƯỚC `STEP()` + ảnh giao diện + `PITFALL()` lỗi hay gặp.
5. **Làm theo từng bước (hands-on)** — STEP + CODE ngắn + `TRY()`. Đây là phần dày nhất.
6. **Tình huống 1 → giải ngay** — `SITUATION()` + `SOLVE()` + STEP/CODE.
7. **Tình huống 2 → giải ngay** — tương tự, khó hơn 1 chút.
8. **Lỗi thường gặp & mẹo** — `PITFALL()` + `TIP()`; recap `RECAP()`.
9. **Câu hỏi thường gặp (FAQ)** — ≥3 `FAQ()` (dựng FAQPage schema) + internal link.
10. **Trắc nghiệm củng cố** — `QUIZ([...])` 4–5 câu.
11. **Học tiếp tại CyberSoft & tổng kết** — recap + `CTA()` khóa học.

> Có thể gộp/tách chương tùy chủ đề, nhưng GIỮ đủ: TL;DR, ≥5 hình, ≥2 tình huống, hands-on nhiều bước,
> FAQ, và đúng 1 chương trắc nghiệm 4–5 câu.

## C. Độ dài & giọng văn
- **Chương ngắn, câu ngắn** — mỗi đoạn `p` 2–4 câu, từ ngữ đơn giản, giải thích trước khi dùng thuật ngữ.
- Tổng văn xuôi **≥ ~1000 từ/ngôn ngữ** (ít hơn bài chuyên sâu vì bù bằng hình + bước + code + quiz).
- **vi**: ấm áp, khích lệ, "bạn" — như kèm 1 người mới. **en**: song song, đơn giản. **ja**: dịch thật,
  giọng です・ます, thuật ngữ QA chuẩn (テストケース, ロケーター, アサーション…). KHÔNG copy en→ja.

## D. Quy tắc TRẮC NGHIỆM (quan trọng)
- Mỗi bài **đúng 1 chương** trắc nghiệm, **4–5 câu** (`_mcq` = true).
- Mỗi câu **4–5 lựa chọn**, chỉ 1 đúng; các phương án nhiễu (distractor) hợp lý, không "bẫy" vô nghĩa.
- **Bám nội dung trong bài** — chỉ hỏi điều đã dạy. Có giải thích ngắn vì sao đáp án đúng (và gợi vì sao
  đáp án kia sai khi cần).
- Xen mức độ: 2–3 câu nhớ/hiểu, 1–2 câu vận dụng (đọc 1 đoạn code nhỏ rồi chọn).

## E. SEO cho bài người mới (kế thừa + lưu ý)
- Keyword người mới thường là truy vấn học nghề: "X là gì", "cách học X", "X cho người mới", "tự học X từ
  con số 0". Chọn 1 primary + LSI theo đó (xem `seo-standard.md`).
- Bài dạng "các bước" → thêm **HowTo schema** qua `buildSeo({ howTo:{name, steps:[...]} })`.
- Vẫn cần: metaTitle ≤60, metaDescription 140–160, TL;DR, DEF, ≥3 FAQ (FAQPage), ≥1 CTA, ≥2 internal
  link, JSON-LD (Article + FAQPage + Course). Đây là "cửa ngõ" đưa người mới vào khóa CyberSoft.

## F. Checklist "đạt/không đạt" (chạy trong đầu trước verify-newbie.mjs)
- [ ] 8–12 chương, mỗi chương heading rõ (mục lục đẹp).
- [ ] ≥5 hình; mỗi khái niệm chính có ≥1 hình.
- [ ] Hands-on nhiều `STEP()` + code ngắn + ≥2 `TRY()`.
- [ ] ≥2 `SITUATION()` có lời giải ngay bên dưới.
- [ ] `DEF()` cho mỗi thuật ngữ mới; giọng đơn giản, khích lệ.
- [ ] Đúng 1 chương trắc nghiệm 4–5 câu (`QUIZ`), mỗi câu 4–5 lựa chọn + giải thích.
- [ ] Đủ SEO: TL;DR, ≥3 FAQ, ≥1 CTA, ≥2 internal link, seo/JSON-LD hợp lệ.
- [ ] 3 ngôn ngữ; ja≠en. `node scripts/verify-newbie.mjs <file>` PASS.

## G. Bẫy (tránh)
- Sa đà lý thuyết hàn lâm, thiếu việc để làm.
- Ít hình / hình không có chú thích.
- Thuật ngữ chưa giải thích đã dùng.
- Trắc nghiệm hỏi ngoài bài, hoặc thiếu giải thích.
- Quên CTA/internal link → bài hay nhưng không dẫn người mới vào khóa CyberSoft.
