---
description: Xem tình trạng production — site live, workflow CI/CD gần nhất, và runner self-hosted
argument-hint: "(không cần tham số)"
allowed-tools: Bash
---

Kiểm tra sức khỏe hệ thống production và báo cáo gọn. Chỉ ĐỌC, không thay đổi gì.

Token GitHub lấy từ `SECRETS.local.md` (gốc repo). Nếu file không tồn tại, báo người dùng cung cấp và dừng.

1. **Site live** (public):
   - `curl -s -o /dev/null -w "%{http_code}" https://testing.cybersoft.edu.vn/` → mong đợi `200`.
   - `curl -s -o /dev/null -w "%{http_code}" https://testing.cybersoft.edu.vn/login`.
2. **CI/CD** (GitHub API, dùng token trong `SECRETS.local.md`):
   - `GET /repos/khaitruong1301/testing.cybersoft.edu.vn/actions/runs?per_page=3` → `status`/`conclusion` mỗi run.
   - `GET /repos/khaitruong1301/testing.cybersoft.edu.vn/actions/runners` → runner self-hosted có `online` không?

Ví dụ gọi API:
```bash
TOKEN=$(grep -oE 'ghp_[A-Za-z0-9]+' SECRETS.local.md | head -1)
curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/khaitruong1301/testing.cybersoft.edu.vn/actions/runs?per_page=3" \
  | python3 -c "import sys,json;[print(r['name'],r['status'],r['conclusion']) for r in json.load(sys.stdin)['workflow_runs']]"
```

Trình bày: bảng ngắn — mỗi hạng mục + trạng thái (✓/✗). Nếu runner offline hoặc run gần nhất `failure`,
nêu rõ và gợi ý xem log (workflow trong tab Actions của GitHub, hoặc log service trên server).
