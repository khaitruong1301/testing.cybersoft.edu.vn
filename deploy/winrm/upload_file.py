#!/usr/bin/env python3
"""Upload 1 file local len Windows qua WinRM (chunk base64, 1 shell ben vung).
Dung: upload_file.py <local> <remote_windows_path> [chunk_chars]
Creds: WINRM_HOST/USER/PASS env.
"""
import os, sys, base64
from winrm.protocol import Protocol

local, remote = sys.argv[1], sys.argv[2]
chunk = int(sys.argv[3]) if len(sys.argv) > 3 else 2500

with open(local, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("ascii")
b64file = remote + ".b64"

p = Protocol(
    endpoint=f"http://{os.environ['WINRM_HOST']}:{os.environ.get('WINRM_PORT','5985')}/wsman",
    transport="ntlm", username=os.environ["WINRM_USER"], password=os.environ["WINRM_PASS"],
    read_timeout_sec=600, operation_timeout_sec=500,
)
shell_id = p.open_shell()

def run_ps(script):
    enc = base64.b64encode(script.encode("utf-16-le")).decode("ascii")
    cid = p.run_command(shell_id, "powershell", ["-NoProfile", "-EncodedCommand", enc])
    out, err, code = p.get_command_output(shell_id, cid)
    p.cleanup_command(shell_id, cid)
    return out.decode("utf-8","replace"), err.decode("utf-8","replace"), code

try:
    parts = [b64[i:i+chunk] for i in range(0, len(b64), chunk)]
    print(f"{local}: {len(b64)} b64 chars -> {len(parts)} chunk (moi chunk {chunk})", flush=True)
    for i, part in enumerate(parts):
        if i == 0:
            ps = (f"$d=Split-Path -Parent '{remote}';"
                  f"if(-not(Test-Path $d)){{New-Item -ItemType Directory -Force -Path $d|Out-Null}};"
                  f"Set-Content -LiteralPath '{b64file}' -Value '{part}' -NoNewline -Encoding ascii")
        else:
            ps = f"Add-Content -LiteralPath '{b64file}' -Value '{part}' -NoNewline -Encoding ascii"
        out, err, code = run_ps(ps)
        if code != 0:
            sys.stderr.write(f"Chunk {i} loi (code {code}):\n{err}\n"); sys.exit(1)
        if (i+1) % 20 == 0 or i+1 == len(parts):
            print(f"  {i+1}/{len(parts)}", flush=True)

    out, err, code = run_ps(
        f"$b=[Convert]::FromBase64String((Get-Content -LiteralPath '{b64file}' -Raw));"
        f"[IO.File]::WriteAllBytes('{remote}',$b);Remove-Item -LiteralPath '{b64file}' -Force;"
        f"'WROTE '+(Get-Item '{remote}').Length+' bytes -> {remote}'")
    print(out.strip())
    if code != 0:
        sys.stderr.write(err); sys.exit(1)
finally:
    p.close_shell(shell_id)
