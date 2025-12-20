// scripts/create-zip.js
// اسکریپت ایجاد فایل ZIP از پوشه deploy
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function createZip() {
  const rootDir = process.cwd();
  const deployDir = path.join(rootDir, 'deploy');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const zipFileName = `deploy-${timestamp}.zip`;
  const zipFilePath = path.join(rootDir, zipFileName);

  log('\n' + '='.repeat(60), 'cyan');
  log('📦 ایجاد فایل ZIP', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  // بررسی وجود پوشه deploy
  if (!fs.existsSync(deployDir)) {
    logError('پوشه deploy یافت نشد!');
    logInfo('لطفاً ابتدا دستور pnpm deploy را اجرا کنید.');
    process.exit(1);
  }

  try {
    // تشخیص سیستم عامل و استفاده از دستور مناسب
    const isWindows = process.platform === 'win32';
    const isLinux = process.platform === 'linux';
    const isMac = process.platform === 'darwin';

    if (isWindows) {
      // استفاده از PowerShell Compress-Archive با exclude کردن node_modules
      logInfo('استفاده از PowerShell Compress-Archive...');
      try {
        // روش مطمئن: فیلتر کردن فایل‌ها قبل از ZIP
        const psScript = `
          $deployPath = '${deployDir.replace(/\\/g, '\\\\')}'
          $zipPath = '${zipFilePath.replace(/\\/g, '\\\\')}'
          $excludeDirs = @('node_modules', '.git')
          $excludeFiles = @('*.log', '.env*.local')
          
          $files = Get-ChildItem -Path $deployPath -Recurse -File | 
            Where-Object { 
              $relativePath = $_.FullName.Replace($deployPath + '\\', '')
              $shouldExclude = $false
              
              # بررسی پوشه‌های exclude
              foreach ($excludeDir in $excludeDirs) {
                if ($relativePath -like "*\\$excludeDir\\*" -or $relativePath -like "$excludeDir\\*") {
                  $shouldExclude = $true
                  break
                }
              }
              
              # بررسی فایل‌های exclude
              if (-not $shouldExclude) {
                foreach ($excludeFile in $excludeFiles) {
                  if ($_.Name -like $excludeFile) {
                    $shouldExclude = $true
                    break
                  }
                }
              }
              
              -not $shouldExclude
            }
          
          if ($files) {
            Compress-Archive -Path $files.FullName -DestinationPath $zipPath -Force
          } else {
            Write-Error "هیچ فایلی برای ZIP کردن یافت نشد"
          }
        `;
        
        execSync(
          `powershell -Command "${psScript}"`,
          { stdio: 'inherit' }
        );
        
        logSuccess(`فایل ZIP ایجاد شد: ${zipFileName}`);
      } catch (error) {
        logError('خطا در ایجاد فایل ZIP با PowerShell');
        logInfo('لطفاً از ابزار ZIP دستی استفاده کنید یا از WSL استفاده کنید.');
        throw error;
      }
    } else if (isLinux || isMac) {
      // استفاده از zip command
      logInfo('استفاده از دستور zip...');
      try {
        // بررسی وجود دستور zip
        execSync('which zip', { stdio: 'pipe' });
        
        // رفتن به پوشه deploy و ایجاد zip
        const deployParent = path.dirname(deployDir);
        const deployFolderName = path.basename(deployDir);
        
        process.chdir(deployParent);
        execSync(`zip -r "${zipFileName}" "${deployFolderName}" -x "*.git*" "*.DS_Store" "node_modules/*" "*.log" ".env*.local"`, {
          stdio: 'inherit'
        });
        
        // بازگشت به root
        process.chdir(rootDir);
        
        // انتقال فایل zip به root (اگر در جای دیگری ایجاد شده)
        const zipInParent = path.join(deployParent, zipFileName);
        if (fs.existsSync(zipInParent) && zipInParent !== zipFilePath) {
          fs.renameSync(zipInParent, zipFilePath);
        }
        
        logSuccess(`فایل ZIP ایجاد شد: ${zipFileName}`);
      } catch (error) {
        // اگر zip نصب نیست، از tar استفاده می‌کنیم
        logInfo('دستور zip یافت نشد، استفاده از tar...');
        try {
          const tarFileName = zipFileName.replace('.zip', '.tar.gz');
          const tarFilePath = path.join(rootDir, tarFileName);
          
          process.chdir(path.dirname(deployDir));
          execSync(`tar -czf "${tarFilePath}" "${path.basename(deployDir)}"`, {
            stdio: 'inherit'
          });
          process.chdir(rootDir);
          
          logSuccess(`فایل TAR.GZ ایجاد شد: ${tarFileName}`);
          logInfo('می‌توانید از این فایل استفاده کنید یا آن را به ZIP تبدیل کنید.');
        } catch (tarError) {
          logError('خطا در ایجاد فایل فشرده');
          throw tarError;
        }
      }
    } else {
      logError('سیستم عامل پشتیبانی نشده');
      process.exit(1);
    }

    // محاسبه حجم فایل
    if (fs.existsSync(zipFilePath)) {
      const stats = fs.statSync(zipFilePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      logInfo(`حجم فایل: ${sizeMB} MB`);
    }

    log('\n' + '='.repeat(60), 'cyan');
    logSuccess('فایل فشرده با موفقیت ایجاد شد!');
    log('='.repeat(60), 'cyan');
    log(`\n📁 مسیر فایل: ${zipFilePath}`, 'cyan');
    log('\n💡 نکته: می‌توانید این فایل را روی سرور آپلود کنید و extract کنید.\n', 'yellow');

  } catch (error) {
    logError(`خطا: ${error.message}`);
    process.exit(1);
  }
}

// اجرای اسکریپت
if (require.main === module) {
  createZip();
}

module.exports = { createZip };

