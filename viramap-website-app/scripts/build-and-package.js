// scripts/build-and-package.js
// اسکریپت کامل برای پاک کردن کش، بیلد گرفتن و بسته‌بندی پروژه Next.js
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
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

function logStep(message) {
  log(`\n📌 ${message}`, 'blue');
}

// تابع برای حذف ایمن فایل/پوشه با retry
function removeWithRetry(filePath, maxRetries = 3, delay = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      if (!fs.existsSync(filePath)) {
        return true;
      }

      const stats = fs.lstatSync(filePath);
      if (stats.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      } else {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (err) {
      if (err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'ENOTEMPTY') {
        if (i < maxRetries - 1) {
          logInfo(`تلاش مجدد برای حذف ${path.relative(process.cwd(), filePath)}... (${i + 1}/${maxRetries})`);
          const start = Date.now();
          while (Date.now() - start < delay) {
            // busy wait
          }
          continue;
        } else {
          logError(`نتوانست فایل/پوشه حذف شود: ${path.relative(process.cwd(), filePath)}`);
          return false;
        }
      } else {
        throw err;
      }
    }
  }
  return false;
}

// مرحله 1: پاک کردن کش‌ها
function cleanCaches() {
  logStep('مرحله 1: پاک کردن کش‌های Next.js');
  
  const pathsToClean = [
    '.next',
    '.turbo',
    'node_modules/.cache',
    'node_modules/.vite',
    'out',
    'dist',
    'build',
  ];

  let successCount = 0;
  let failCount = 0;

  pathsToClean.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      logInfo(`پاک کردن: ${dir}`);
      if (removeWithRetry(fullPath)) {
        successCount++;
        logSuccess(`${dir} با موفقیت حذف شد`);
      } else {
        failCount++;
      }
    }
  });

  if (failCount > 0) {
    logInfo(`⚠️  ${failCount} فایل/پوشه نتوانست حذف شود (ادامه می‌دهیم...)`);
    logInfo('اگر خطای EPERM دارید، لطفاً تمام terminal های باز را ببندید');
    logInfo('بیلد با فایل‌های قبلی ادامه می‌یابد...');
  } else {
    logSuccess('تمام کش‌ها با موفقیت پاک شدند');
  }
}

// تشخیص package manager
function detectPackageManager() {
  const rootDir = process.cwd();
  if (fs.existsSync(path.join(rootDir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  } else if (fs.existsSync(path.join(rootDir, 'yarn.lock'))) {
    return 'yarn';
  } else if (fs.existsSync(path.join(rootDir, 'package-lock.json'))) {
    return 'npm';
  }
  return 'npm'; // پیش‌فرض
}

// مرحله 2: بیلد گرفتن
function buildProject() {
  logStep('مرحله 2: بیلد گرفتن پروژه Next.js');
  
  try {
    const packageManager = detectPackageManager();
    const buildCommand = packageManager === 'pnpm' ? 'pnpm' : packageManager === 'yarn' ? 'yarn' : 'npm';
    
    logInfo(`استفاده از ${packageManager} برای بیلد`);
    logInfo('در حال اجرای: next build --webpack');
    
    // استفاده از --webpack flag برای سازگاری با webpack config
    // استفاده از spawn برای نمایش خروجی real-time
    return new Promise((resolve, reject) => {
      // اجرای build:webpack script که از webpack استفاده می‌کند
      const buildProcess = spawn(buildCommand, ['run', 'build:webpack'], {
        stdio: 'inherit',
        shell: true,
        cwd: process.cwd(),
      });

      buildProcess.on('close', (code) => {
        if (code === 0) {
          logSuccess('بیلد با موفقیت انجام شد');
          resolve();
        } else {
          logError(`بیلد با خطا خاتمه یافت (کد خروجی: ${code})`);
          reject(new Error(`Build failed with exit code ${code}`));
        }
      });

      buildProcess.on('error', (error) => {
        logError(`خطا در اجرای بیلد: ${error.message}`);
        reject(error);
      });
    });
  } catch (error) {
    logError(`خطا در بیلد گرفتن: ${error.message}`);
    throw error;
  }
}

// تابع کمکی برای کپی کردن فایل/پوشه
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      copyRecursive(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// مرحله 3: بسته‌بندی فایل‌های بیلد شده
function packageBuild() {
  logStep('مرحله 3: بسته‌بندی فایل‌های بیلد شده');
  
  const rootDir = process.cwd();
  const buildDir = path.join(rootDir, '.next');
  const publicDir = path.join(rootDir, 'public');
  const packageJsonPath = path.join(rootDir, 'package.json');
  const nextConfigPath = path.join(rootDir, 'next.config.ts');
  const nextConfigJsPath = path.join(rootDir, 'next.config.js');
  
  // بررسی وجود پوشه بیلد
  if (!fs.existsSync(buildDir)) {
    logError('پوشه .next یافت نشد! لطفاً ابتدا بیلد بگیرید.');
    throw new Error('Build directory not found');
  }

  // ایجاد پوشه موقت برای بسته‌بندی
  const tempPackageDir = path.join(rootDir, 'build-package-temp');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const zipFileName = `build-${timestamp}.zip`;
  const zipFilePath = path.join(rootDir, zipFileName);

  try {
    // پاک کردن پوشه موقت قبلی (اگر وجود دارد)
    if (fs.existsSync(tempPackageDir)) {
      removeWithRetry(tempPackageDir);
    }
    
    fs.mkdirSync(tempPackageDir, { recursive: true });

    logInfo('کپی کردن فایل‌های ضروری...');

    // کپی کردن پوشه .next
    const nextDest = path.join(tempPackageDir, '.next');
    logInfo('کپی کردن: .next');
    copyRecursive(buildDir, nextDest);

    // کپی کردن پوشه public
    if (fs.existsSync(publicDir)) {
      const publicDest = path.join(tempPackageDir, 'public');
      logInfo('کپی کردن: public');
      copyRecursive(publicDir, publicDest);
    }

    // کپی کردن package.json (برای نصب dependencies)
    if (fs.existsSync(packageJsonPath)) {
      logInfo('کپی کردن: package.json');
      fs.copyFileSync(packageJsonPath, path.join(tempPackageDir, 'package.json'));
    }

    // کپی کردن next.config.ts یا next.config.js
    if (fs.existsSync(nextConfigPath)) {
      logInfo('کپی کردن: next.config.ts');
      fs.copyFileSync(nextConfigPath, path.join(tempPackageDir, 'next.config.ts'));
    } else if (fs.existsSync(nextConfigJsPath)) {
      logInfo('کپی کردن: next.config.js');
      fs.copyFileSync(nextConfigJsPath, path.join(tempPackageDir, 'next.config.js'));
    }

    // کپی کردن tsconfig.json (اگر وجود دارد)
    const tsconfigPath = path.join(rootDir, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      logInfo('کپی کردن: tsconfig.json');
      fs.copyFileSync(tsconfigPath, path.join(tempPackageDir, 'tsconfig.json'));
    }

    // کپی کردن فایل‌های دیگر که ممکن است نیاز باشند
    const additionalFiles = [
      'next-env.d.ts',
      'postcss.config.mjs',
      'tailwind.config.js',
      'tailwind.config.ts',
    ];

    additionalFiles.forEach(file => {
      const filePath = path.join(rootDir, file);
      if (fs.existsSync(filePath)) {
        logInfo(`کپی کردن: ${file}`);
        fs.copyFileSync(filePath, path.join(tempPackageDir, file));
      }
    });

    logInfo('ایجاد فایل ZIP...');

    // ایجاد فایل ZIP
    const isWindows = process.platform === 'win32';
    const isLinux = process.platform === 'linux';
    const isMac = process.platform === 'darwin';

    if (isWindows) {
      // استفاده از PowerShell Compress-Archive
      try {
        // حذف فایل ZIP قبلی (اگر وجود دارد)
        if (fs.existsSync(zipFilePath)) {
          fs.unlinkSync(zipFilePath);
        }

        logInfo('ایجاد فایل ZIP با PowerShell...');
        
        // استفاده از PowerShell برای ایجاد ZIP با escape کردن مسیرها
        const escapedTempDir = tempPackageDir.replace(/\\/g, '\\\\').replace(/'/g, "''");
        const escapedZipPath = zipFilePath.replace(/\\/g, '\\\\').replace(/'/g, "''");
        
        const psScript = `$ErrorActionPreference = 'Stop'; Compress-Archive -Path '${escapedTempDir}\\*' -DestinationPath '${escapedZipPath}' -Force; if ($?) { Write-Host 'ZIP created successfully' }`;
        
        execSync(
          `powershell -NoProfile -ExecutionPolicy Bypass -Command "${psScript}"`,
          { stdio: 'inherit', shell: true, cwd: process.cwd() }
        );
        logSuccess(`فایل ZIP ایجاد شد: ${zipFileName}`);
      } catch (error) {
        logError(`خطا در ایجاد فایل ZIP: ${error.message}`);
        logInfo('💡 راهنمایی: می‌توانید به صورت دستی فایل‌ها را ZIP کنید');
        throw error;
      }
    } else if (isLinux || isMac) {
      // استفاده از zip command
      try {
        execSync('which zip', { stdio: 'pipe' });
        
        const tempParent = path.dirname(tempPackageDir);
        const tempFolderName = path.basename(tempPackageDir);
        
        process.chdir(tempParent);
        execSync(`zip -r "${zipFilePath}" "${tempFolderName}"`, {
          stdio: 'inherit'
        });
        process.chdir(rootDir);
        
        logSuccess(`فایل ZIP ایجاد شد: ${zipFileName}`);
      } catch (error) {
        // استفاده از tar به عنوان جایگزین
        logInfo('استفاده از tar به عنوان جایگزین...');
        const tarFileName = zipFileName.replace('.zip', '.tar.gz');
        const tarFilePath = path.join(rootDir, tarFileName);
        
        process.chdir(path.dirname(tempPackageDir));
        execSync(`tar -czf "${tarFilePath}" "${path.basename(tempPackageDir)}"`, {
          stdio: 'inherit'
        });
        process.chdir(rootDir);
        
        logSuccess(`فایل TAR.GZ ایجاد شد: ${tarFileName}`);
      }
    } else {
      throw new Error('سیستم عامل پشتیبانی نشده');
    }

    // محاسبه حجم فایل
    if (fs.existsSync(zipFilePath)) {
      const stats = fs.statSync(zipFilePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      logInfo(`حجم فایل ZIP: ${sizeMB} MB`);
    }

    // پاک کردن پوشه موقت
    logInfo('پاک کردن فایل‌های موقت...');
    removeWithRetry(tempPackageDir);

    logSuccess('بسته‌بندی با موفقیت انجام شد!');
    log(`\n📁 مسیر فایل: ${zipFilePath}`, 'cyan');
    log('\n💡 نکته: این فایل شامل فایل‌های بیلد شده و ضروری برای اجرای پروژه است.', 'yellow');
    log('   برای استفاده: فایل را extract کنید و npm install را اجرا کنید.\n', 'yellow');

  } catch (error) {
    // پاک کردن پوشه موقت در صورت خطا
    if (fs.existsSync(tempPackageDir)) {
      removeWithRetry(tempPackageDir);
    }
    logError(`خطا در بسته‌بندی: ${error.message}`);
    throw error;
  }
}

// تابع اصلی
async function main() {
  try {
    log('\n' + '='.repeat(60), 'cyan');
    log('🚀 شروع فرآیند بیلد و بسته‌بندی', 'cyan');
    log('='.repeat(60) + '\n', 'cyan');

    // مرحله 1: پاک کردن کش‌ها
    cleanCaches();

    // مرحله 2: بیلد گرفتن
    await buildProject();

    // مرحله 3: بسته‌بندی
    packageBuild();

    log('\n' + '='.repeat(60), 'cyan');
    logSuccess('✅ تمام مراحل با موفقیت انجام شد!');
    log('='.repeat(60) + '\n', 'cyan');

  } catch (error) {
    log('\n' + '='.repeat(60), 'red');
    logError('❌ خطا در فرآیند بیلد و بسته‌بندی');
    logError(`جزئیات: ${error.message}`);
    log('='.repeat(60) + '\n', 'red');
    process.exit(1);
  }
}

// اجرای اسکریپت
if (require.main === module) {
  main();
}

module.exports = { cleanCaches, buildProject, packageBuild };

