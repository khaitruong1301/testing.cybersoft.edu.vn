# WinRM tooling — quản trị Windows Server từ xa (không cần RDP)

Bộ script Python dùng để chạy PowerShell / upload file lên server Windows qua **WinRM (cổng 5985)**.
Đây chính là công cụ đã dùng để cài đặt toàn bộ production. **Không chứa secret** — thông tin đăng
nhập truyền qua biến môi trường (xem `SECRETS.local.md`).

## Cài đặt (một lần, trên máy quản trị)

```bash
python3 -m venv winrm-venv
./winrm-venv/bin/pip install -r requirements.txt
```

## Thông tin đăng nhập (từ SECRETS.local.md)

```bash
export WINRM_HOST="157.245.63.139"
export WINRM_USER="administrator"
export WINRM_PASS='...'          # mật khẩu trong SECRETS.local.md (dùng nháy đơn vì có ký tự đặc biệt)
```

## Dùng

```bash
# Chạy một khối PowerShell (từ stdin):
echo 'Get-Service entrance | Format-List Name,Status' | ./winrm-venv/bin/python winrm_run.py

# Chạy một file .ps1:
./winrm-venv/bin/python winrm_run.py ../provision.ps1

# Restart app:
echo 'C:\apps\entrance\_bin\nssm.exe restart entrance; (Get-Service entrance).Status' \
  | ./winrm-venv/bin/python winrm_run.py

# Upload 1 file local -> đường dẫn Windows (chunk base64, tự tạo thư mục):
./winrm-venv/bin/python upload_file.py ./server.py 'C:\apps\entrance\server.py'
```

## Lưu ý
- `winrm_run.py` truyền script dạng UTF-16 nên **không** dính lỗi encoding của file .ps1 khi chạy
  trực tiếp (khác với việc runner checkout rồi chạy file — file đó phải thuần ASCII).
- WinRM 5985 là HTTP nhưng NTLM mã hoá payload. Vẫn nên hạn chế IP truy cập nếu có thể.
- Ưu tiên dùng **CI/CD (git push)** cho việc deploy thường ngày; WinRM để thao tác hạ tầng/khẩn cấp.
