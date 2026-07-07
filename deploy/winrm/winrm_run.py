#!/usr/bin/env python3
"""Chạy một khối PowerShell trên Windows server qua WinRM (NTLM).
Đọc PowerShell từ stdin hoặc từ file (arg 1). Creds lấy từ biến môi trường:
  WINRM_HOST, WINRM_USER, WINRM_PASS  (tùy chọn WINRM_PORT, mặc định 5985)
In stdout của lệnh, stderr nếu có, thoát với status_code của PowerShell.
"""
import os, sys, winrm

host = os.environ["WINRM_HOST"]
user = os.environ["WINRM_USER"]
pw   = os.environ["WINRM_PASS"]
port = os.environ.get("WINRM_PORT", "5985")

if len(sys.argv) > 1:
    with open(sys.argv[1], encoding="utf-8") as f:
        ps = f.read()
else:
    ps = sys.stdin.read()

s = winrm.Session(
    f"http://{host}:{port}/wsman",
    auth=(user, pw),
    transport="ntlm",
    read_timeout_sec=900,
    operation_timeout_sec=800,
)
r = s.run_ps(ps)
sys.stdout.write(r.std_out.decode("utf-8", "replace"))
err = r.std_err.decode("utf-8", "replace")
if err.strip():
    sys.stderr.write("\n--- STDERR ---\n" + err)
sys.exit(r.status_code)
