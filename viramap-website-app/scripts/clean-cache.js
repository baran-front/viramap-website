// scripts/clean-cache.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const isWindows = process.platform === 'win32';

console.log('🚀 شروع پاکسازی کش‌ها...');

// تابع برای حذف ایمن فایل/پوشه با retry
function removeWithRetry(filePath, maxRetries = 3, delay = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const stats = fs.lstatSync(filePath);
      if (stats.isDirectory()) {
        // در ویندوز، ابتدا سعی می‌کنیم فایل‌های lock را حذف کنیم
        if (isWindows) {
          try {
            // حذف فایل‌های lock در .next/dev
            const lockPath = path.join(filePath, 'dev', 'lock');
            if (fs.existsSync(lockPath)) {
              fs.chmodSync(lockPath, 0o666); // تغییر permission
              fs.unlinkSync(lockPath);
              console.log(`  ✅ فایل lock حذف شد: ${path.relative(process.cwd(), lockPath)}`);
            }
          } catch (lockErr) {
            // اگر نتوانستیم lock را حذف کنیم، ادامه می‌دهیم
          }
        }
        
        fs.rmSync(filePath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      } else {
        // برای فایل‌ها، ابتدا permission را تغییر می‌دهیم (ویندوز)
        if (isWindows) {
          try {
            fs.chmodSync(filePath, 0o666);
          } catch (chmodErr) {
            // اگر نتوانستیم permission را تغییر دهیم، ادامه می‌دهیم
          }
        }
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (err) {
      if (err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'ENOTEMPTY') {
        if (i < maxRetries - 1) {
          console.log(`  ⏳ تلاش مجدد برای حذف ${path.relative(process.cwd(), filePath)}... (${i + 1}/${maxRetries})`);
          // انتظار قبل از retry
          const start = Date.now();
          while (Date.now() - start < delay) {
            // busy wait
          }
          continue;
        } else {
          // آخرین تلاش: استفاده از دستور سیستم عامل
          if (isWindows) {
            try {
              const relativePath = path.relative(process.cwd(), filePath).replace(/\//g, '\\');
              execSync(`if exist "${relativePath}" rmdir /s /q "${relativePath}"`, { 
                stdio: 'ignore',
                shell: true 
              });
              return true;
            } catch (cmdErr) {
              console.warn(`  ⚠️  نتوانست فایل/پوشه حذف شود: ${path.relative(process.cwd(), filePath)}`);
              console.warn(`     خطا: ${err.message}`);
              console.warn(`     راه‌حل: لطفاً پروسه‌های Next.js را ببندید و دوباره تلاش کنید`);
              return false;
            }
          } else {
            try {
              execSync(`rm -rf "${filePath}"`, { stdio: 'ignore' });
              return true;
            } catch (cmdErr) {
              console.warn(`  ⚠️  نتوانست فایل/پوشه حذف شود: ${path.relative(process.cwd(), filePath)}`);
              return false;
            }
          }
        }
      } else {
        throw err;
      }
    }
  }
  return false;
}

const pathsToClean = [
  '.next',
  '.turbo',
  'node_modules/.cache',
  'node_modules/.vite',
  'out',
  '.next/cache',
  'turbo-build.log',
  'turbo-dev.log',
];

// در ویندوز، ابتدا سعی می‌کنیم پروسه‌های Next.js را ببندیم
if (isWindows) {
  console.log('🔍 بررسی پروسه‌های در حال اجرای Next.js...');
  try {
    // بررسی وجود پروسه‌های node که ممکن است Next.js باشند
    const processes = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', { 
      encoding: 'utf8',
      stdio: 'pipe' 
    });
    
    if (processes.includes('node.exe')) {
      console.log('  ⚠️  پروسه‌های Node.js در حال اجرا هستند.');
      console.log('  💡 پیشنهاد: قبل از پاک کردن cache، پروسه‌های Next.js را ببندید:');
      console.log('     - بستن terminal که Next.js در آن اجرا می‌شود');
      console.log('     - یا استفاده از: pnpm kill-next');
    }
  } catch (err) {
    // اگر tasklist کار نکرد، ادامه می‌دهیم
  }
}

let successCount = 0;
let failCount = 0;

pathsToClean.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`🧹 پاک کردن: ${dir}`);
    if (removeWithRetry(fullPath)) {
      successCount++;
    } else {
      failCount++;
    }
  }
});

console.log('\n✅ پاکسازی کامل شد.');
if (failCount > 0) {
  console.log(`⚠️  ${failCount} فایل/پوشه نتوانست حذف شود.`);
  console.log('💡 اگر خطای EPERM دارید:');
  console.log('   1. تمام terminal های باز را ببندید');
  console.log('   2. Task Manager را باز کنید و پروسه‌های node.exe را ببندید');
  console.log('   3. یا از دستور pnpm kill-next استفاده کنید');
}


