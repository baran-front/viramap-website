// scripts/clean-cache.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 شروع پاکسازی کش‌ها...');

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

pathsToClean.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`🧹 پاک کردن: ${dir}`);
    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    } catch (err) {
      console.warn(`⚠️  خطا در پاک کردن ${dir}:`, err.message);
    }
  }
});

console.log('✅ پاکسازی کامل شد.');

