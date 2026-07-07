# deploy.ps1 - goi boi self-hosted runner o moi lan push vao main.
# Chay tai thu muc checkout cua runner (repo root la thu muc cha cua \deploy).
# Dong bo source vao C:\apps\testing, build Next.js, roi restart service + health check.
# GIU LAI .env production va du lieu runtime tren server (Postgres nam ngoai thu muc deploy).
# LUU Y: file nay phai thuan ASCII (Windows PowerShell 5.1 doc .ps1 khong-BOM theo cp1252).
$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $PSScriptRoot        # repo root (runner checkout)
$dest = "C:\apps\testing"
$nssm = "$dest\_bin\nssm.exe"
$port = 3210

Write-Host "==> Deploy from '$repo' -> '$dest'"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# --- 1) Sync source -> dest ---
# /MIR mirror; loai node_modules/.next/.git khoi copy VA khoi purge; giu .env + SECRETS.local.md tren server.
robocopy $repo $dest /MIR /XD node_modules .next .git /XF .env SECRETS.local.md /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed (code $LASTEXITCODE)" }
$global:LASTEXITCODE = 0

if (-not (Test-Path "$dest\.env")) {
  throw "Thieu $dest\.env - tao file .env production tren server truoc (xem .env.example)."
}

# --- 2) Cai dat + build trong dest (dung .env cua server) ---
Push-Location $dest
try {
  Write-Host "==> npm ci"
  npm ci
  if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }

  Write-Host "==> prisma generate + db push"
  npx prisma generate
  if ($LASTEXITCODE -ne 0) { throw "prisma generate failed" }
  npx prisma db push --skip-generate
  if ($LASTEXITCODE -ne 0) { throw "prisma db push failed" }

  Write-Host "==> next build"
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "next build failed" }
}
finally {
  Pop-Location
}

# --- 3) Restart service + health check ---
Write-Host "==> Restart service 'testing'"
& $nssm restart testing
Start-Sleep -Seconds 8

Write-Host "==> Health check http://127.0.0.1:$port/"
$r = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 30
if ($r.StatusCode -ne 200) { throw "Health check FAIL: HTTP $($r.StatusCode)" }
Write-Host "==> OK - / returned $($r.StatusCode). Deploy done."
