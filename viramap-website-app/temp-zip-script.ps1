$ErrorActionPreference = 'Stop'
$rootDir = 'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app'
$zipPath = 'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\viramap-backend-2025-12-20T13-24-40.zip'

# حذف فایل ZIP قبلی
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

# تغییر به دایرکتوری root
Set-Location $rootDir

# ایجاد ZIP از فایل‌ها
$items = @(
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\.next',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\public',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\app',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\components',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\services',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\package.json',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\pnpm-lock.yaml',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\next.config.ts',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\tsconfig.json',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\postcss.config.mjs',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\next-env.d.ts',
  'C:\\Users\\Abtinmall\\Documents\\GitHub\\viramap-website\\viramap-website-app\\eslint.config.mjs'
)

Compress-Archive -Path $items -DestinationPath $zipPath -Force

if (Test-Path $zipPath) {
  $size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
  Write-Host "ZIP created successfully. Size: $size MB"
} else {
  Write-Error "Failed to create ZIP file"
  exit 1
}