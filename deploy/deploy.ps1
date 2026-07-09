# deploy.ps1 - goi boi self-hosted runner o moi lan push vao main.
# Chay tai thu muc checkout cua runner (repo root la thu muc cha cua \deploy).
# Dong bo source vao C:\apps\testing, build Next.js, roi restart service + health check.
# GIU LAI .env production + DB (SQLite o C:\ProgramData\testing, ngoai thu muc deploy).
# LUU Y: file nay phai thuan ASCII (Windows PowerShell 5.1 doc .ps1 khong-BOM theo cp1252).

# KHONG dung ErrorActionPreference=Stop: native command (npm/npx/next/prisma) hay in canh bao
# ra stderr, voi Stop se bi coi la loi terminating du lenh THANH CONG. Thay vao do kiem
# $LASTEXITCODE tuong minh sau moi lenh (throw se van dung du preference la Continue).
$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:CHECKPOINT_DISABLE = "1"
$env:PRISMA_HIDE_UPDATE_MESSAGE = "1"

$repo = Split-Path -Parent $PSScriptRoot        # repo root (runner checkout)
$dest = "C:\apps\testing"
$nssm = "$dest\_bin\nssm.exe"
$port = 3210

Write-Host "==> Deploy from '$repo' -> '$dest'"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# --- 1) Sync source -> dest ---
# /MIR mirror; loai (khoi copy VA khoi purge): node_modules/.next/.git (build/git),
# _bin (nssm.exe) + logs (runtime tren server). Giu .env + SECRETS.local.md tren server.
robocopy $repo $dest /MIR /XD node_modules .next .git _bin logs /XF .env SECRETS.local.md /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed (code $LASTEXITCODE)" }
$global:LASTEXITCODE = 0

if (-not (Test-Path "$dest\.env")) {
  throw "Thieu $dest\.env - tao file .env production tren server truoc (xem .env.example)."
}

# --- 1b) Cap nhat web.config cua site IIS (reverse proxy + ep HTTPS + X-Forwarded-Proto) ---
# Site IIS o thu muc RIENG (C:\apps\testing-site), khong nam trong deploy tree -> copy tu repo sang.
$siteDir = "C:\apps\testing-site"
if (Test-Path "$dest\deploy\web.config") {
  New-Item -ItemType Directory -Force -Path $siteDir | Out-Null
  Copy-Item "$dest\deploy\web.config" "$siteDir\web.config" -Force
  Write-Host "==> Da cap nhat $siteDir\web.config (ep HTTPS)"
}

# --- 2) DUNG service truoc khi dung toi node_modules/.next (tranh loi EPERM do file bi khoa) ---
Write-Host "==> Stop service 'testing' (giai phong lock)"
& $nssm stop testing
Start-Sleep -Seconds 3

# --- 3) Cai dat + build trong dest (dung .env cua server) ---
# QUAN TRONG: moi buoc nang nam trong try/catch. Du buoc nao that bai, khoi 'finally'
# VAN start lai service => site khong bao gio nam down vo thoi han (quay ve ban build cu).
$deployError = $null
$lockStamp = "$dest\_bin\package-lock.sha"
Push-Location $dest
try {
  # Chi chay 'npm ci' khi package-lock.json thuc su doi. Deploy chi doi noi dung
  # (prisma/*.mjs) se bo qua buoc nay -> khong xoa node_modules, nhanh & an toan hon.
  $lockHash = (Get-FileHash "$dest\package-lock.json" -Algorithm SHA256).Hash
  $prevHash = ""
  if (Test-Path $lockStamp) { $prevHash = (Get-Content $lockStamp -Raw).Trim() }
  if ($lockHash -ne $prevHash) {
    Write-Host "==> npm ci (package-lock thay doi)"
    npm ci
    if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }
  } else {
    Write-Host "==> Bo qua npm ci (package-lock khong doi)"
  }

  Write-Host "==> prisma generate + db push"
  npx prisma generate
  if ($LASTEXITCODE -ne 0) { throw "prisma generate failed" }
  npx prisma db push --skip-generate
  if ($LASTEXITCODE -ne 0) { throw "prisma db push failed" }

  Write-Host "==> db seed (upsert noi dung, an toan)"
  npm run db:seed
  if ($LASTEXITCODE -ne 0) { throw "db seed failed" }

  Write-Host "==> next build"
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "next build failed" }

  New-Item -ItemType Directory -Force -Path "$dest\_bin" | Out-Null
  Set-Content -Path $lockStamp -Value $lockHash -Encoding ascii
}
catch {
  $deployError = $_
  Write-Host "!!! DEPLOY THAT BAI: $($_.Exception.Message)"
}
finally {
  Pop-Location
  # LUON start lai service, ke ca khi deploy that bai.
  Write-Host "==> Start service 'testing' (luon chay, ke ca khi deploy loi)"
  & $nssm start testing
  Start-Sleep -Seconds 8
}

if ($deployError) {
  throw "Deploy that bai (service da duoc start lai bang ban build cu): $($deployError.Exception.Message)"
}

# --- 4) Health check ---

Write-Host "==> Health check http://127.0.0.1:$port/"
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 30
} catch {
  throw "Health check FAIL (khong ket noi): $($_.Exception.Message)"
}
if ($r.StatusCode -ne 200) { throw "Health check FAIL: HTTP $($r.StatusCode)" }
Write-Host "==> OK - / returned $($r.StatusCode). Deploy done."
