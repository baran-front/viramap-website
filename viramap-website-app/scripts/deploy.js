// scripts/deploy.js
// اسکریپت جامع و ایمن برای آماده‌سازی پروژه Next.js برای deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createHash } = require('crypto');

// رنگ‌های کنسول برای خروجی بهتر
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step} ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// بررسی وجود فایل یا پوشه
function exists(filePath) {
  return fs.existsSync(filePath);
}

// حذف پوشه یا فایل (با handle کردن خطاها)
function remove(filePath) {
  if (exists(filePath)) {
    try {
      const stat = fs.lstatSync(filePath);
      if (stat.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      } else {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      // اگر فایل در حال استفاده است، فقط warning می‌دهیم و ادامه می‌دهیم
      if (error.code === 'EPERM' || error.code === 'EBUSY' || error.code === 'ENOTEMPTY') {
        logWarning(`نمی‌توان ${path.basename(filePath)} را حذف کرد (احتمالاً در حال استفاده است). ادامه می‌دهیم...`);
        return false;
      }
      throw error;
    }
  }
  return true;
}

// لیست پوشه‌ها و فایل‌هایی که نباید کپی شوند
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.next/cache',
  '.turbo',
  'coverage',
  '.DS_Store',
  '*.log',
  '.env*.local',
  '.vercel',
  'dist',
  'build',
];

// بررسی اینکه آیا باید ignore شود
function shouldIgnore(filePath, fileName) {
  const relativePath = path.relative(process.cwd(), filePath);
  return IGNORE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(fileName) || regex.test(relativePath);
    }
    return fileName === pattern || relativePath.includes(pattern);
  });
}

// کپی فایل یا پوشه (با ignore کردن node_modules و فایل‌های غیرضروری)
function copy(src, dest) {
  // بررسی ignore
  const fileName = path.basename(src);
  if (shouldIgnore(src, fileName)) {
    return; // ignore کردن
  }

  const stat = fs.lstatSync(src);
  if (stat.isDirectory()) {
    if (!exists(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      // بررسی مجدد برای ignore
      if (!shouldIgnore(srcPath, file)) {
        copy(srcPath, destPath);
      }
    });
  } else {
    const destDir = path.dirname(dest);
    if (!exists(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// اجرای دستور و بررسی خطا
function exec(command, options = {}) {
  try {
    const output = execSync(command, {
      stdio: 'inherit',
      encoding: 'utf-8',
      ...options,
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// بررسی وجود package manager
function getPackageManager() {
  if (exists('pnpm-lock.yaml')) return 'pnpm';
  if (exists('yarn.lock')) return 'yarn';
  if (exists('package-lock.json')) return 'npm';
  return 'npm'; // پیش‌فرض
}

// ایجاد hash برای فایل
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return createHash('md5').update(content).digest('hex').substring(0, 8);
}

// ایجاد فایل .env.example از .env.local (اگر وجود دارد)
function createEnvExample() {
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), 'deploy', '.env.example');
  
  if (exists(envLocalPath)) {
    logInfo('ایجاد فایل .env.example از .env.local');
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    // حذف مقادیر حساس
    const sanitized = content
      .split('\n')
      .map(line => {
        if (line.trim().startsWith('#') || !line.includes('=')) {
          return line;
        }
        const [key] = line.split('=');
        return `${key}=YOUR_VALUE_HERE`;
      })
      .join('\n');
    
    const deployDir = path.dirname(envExamplePath);
    if (!exists(deployDir)) {
      fs.mkdirSync(deployDir, { recursive: true });
    }
    fs.writeFileSync(envExamplePath, sanitized);
    logSuccess('فایل .env.example ایجاد شد');
  }
}

// تابع اصلی deployment
async function deploy() {
  const startTime = Date.now();
  
  log('\n' + '='.repeat(60), 'bright');
  log('🚀 شروع فرآیند Deployment', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  const rootDir = process.cwd();
  const deployDir = path.join(rootDir, 'deploy');
  const packageManager = getPackageManager();

  try {
    // مرحله 1: بررسی پیش‌نیازها
    logStep('📋', 'مرحله 1: بررسی پیش‌نیازها');
    
    if (!exists('package.json')) {
      logError('فایل package.json یافت نشد!');
      process.exit(1);
    }

    if (!exists('next.config.ts') && !exists('next.config.js')) {
      logWarning('فایل next.config یافت نشد. از تنظیمات پیش‌فرض استفاده می‌شود.');
    }

    logSuccess('پیش‌نیازها بررسی شدند');

    // مرحله 2: پاکسازی پوشه deploy قبلی
    logStep('🧹', 'مرحله 2: پاکسازی پوشه deploy قبلی');
    if (exists(deployDir)) {
      logInfo('حذف پوشه deploy قبلی...');
      remove(deployDir);
    }
    logSuccess('پاکسازی انجام شد');

    // مرحله 3: پاکسازی کش‌ها
    logStep('🧹', 'مرحله 3: پاکسازی کش‌های بیلد');
    const cachePaths = ['.next', '.turbo', 'out'];
    let cacheCleaned = true;
    cachePaths.forEach(cachePath => {
      const fullPath = path.join(rootDir, cachePath);
      if (exists(fullPath)) {
        logInfo(`حذف ${cachePath}...`);
        const removed = remove(fullPath);
        if (!removed) {
          cacheCleaned = false;
        }
      }
    });
    if (cacheCleaned) {
      logSuccess('کش‌ها پاک شدند');
    } else {
      logWarning('برخی کش‌ها پاک نشدند (احتمالاً dev server در حال اجرا است). ادامه می‌دهیم...');
    }

    // مرحله 4: نصب dependencies
    logStep('📦', 'مرحله 4: نصب dependencies');
    logInfo(`استفاده از ${packageManager}...`);
    
    const installCommand = packageManager === 'pnpm' 
      ? 'pnpm install --frozen-lockfile'
      : packageManager === 'yarn'
      ? 'yarn install --frozen-lockfile'
      : 'npm ci';
    
    const installResult = exec(installCommand);
    if (!installResult.success) {
      logError('خطا در نصب dependencies!');
      process.exit(1);
    }
    logSuccess('Dependencies نصب شدند');

    // مرحله 5: اجرای lint (اختیاری)
    logStep('🔍', 'مرحله 5: بررسی کد (Lint)');
    const lintResult = exec(`${packageManager} run lint`, { stdio: 'pipe' });
    if (lintResult.success) {
      logSuccess('کد بدون خطا است');
    } else {
      logWarning('خطاهای lint یافت شد (این مرحله اختیاری است)');
    }

    // مرحله 6: بیلد پروژه
    logStep('🔨', 'مرحله 6: بیلد پروژه Next.js');
    logInfo('اجرای next build...');
    
    // تنظیم متغیرهای محیطی برای production
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    
    const buildResult = exec(`${packageManager} run build`);
    if (!buildResult.success) {
      logError('خطا در بیلد پروژه!');
      logError('لطفاً خطاهای بیلد را برطرف کنید و دوباره تلاش کنید.');
      process.exit(1);
    }

    // بررسی وجود پوشه .next
    if (!exists('.next')) {
      logError('پوشه .next پس از بیلد ایجاد نشد!');
      process.exit(1);
    }

    logSuccess('بیلد با موفقیت انجام شد');

    // مرحله 7: ایجاد ساختار پوشه deploy
    logStep('📁', 'مرحله 7: ایجاد ساختار پوشه deploy');
    
    const deployStructure = [
      'deploy',
      'deploy/.next',
      'deploy/public',
      'deploy/app',
      'deploy/components',
      'deploy/services',
      'deploy/scripts',
    ];

    deployStructure.forEach(dir => {
      const fullPath = path.join(rootDir, dir);
      if (!exists(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });

    logSuccess('ساختار پوشه deploy ایجاد شد');

    // مرحله 8: کپی فایل‌های ضروری
    logStep('📋', 'مرحله 8: کپی فایل‌های ضروری');

    const essentialFiles = [
      'package.json',
      'next.config.ts',
      'next.config.js',
      'tsconfig.json',
      'postcss.config.mjs',
      'tailwind.config.ts',
      'tailwind.config.js',
      '.eslintrc.json',
      'eslint.config.mjs',
    ];

    const essentialDirs = [
      { src: '.next', dest: 'deploy/.next' },
      { src: 'public', dest: 'deploy/public' },
      { src: 'app', dest: 'deploy/app' },
      { src: 'components', dest: 'deploy/components' },
      { src: 'services', dest: 'deploy/services' },
    ];

    // کپی فایل‌های ضروری
    essentialFiles.forEach(file => {
      const srcPath = path.join(rootDir, file);
      if (exists(srcPath)) {
        const destPath = path.join(deployDir, file);
        copy(srcPath, destPath);
        logInfo(`کپی شد: ${file}`);
      }
    });

    // کپی پوشه‌های ضروری
    essentialDirs.forEach(({ src, dest }) => {
      const srcPath = path.join(rootDir, src);
      if (exists(srcPath)) {
        const destPath = path.join(rootDir, dest);
        logInfo(`کپی پوشه: ${src} -> ${dest}`);
        copy(srcPath, destPath);
      }
    });

    // کپی فایل‌های اضافی در root (اگر وجود دارند)
    const additionalFiles = [
      'README.md',
      'robots.txt',
      '.gitignore',
    ];

    additionalFiles.forEach(file => {
      const srcPath = path.join(rootDir, file);
      if (exists(srcPath)) {
        const destPath = path.join(deployDir, file);
        copy(srcPath, destPath);
      }
    });

    logSuccess('فایل‌های ضروری کپی شدند');

    // مرحله 9: ایجاد فایل .env.example
    logStep('🔐', 'مرحله 9: ایجاد فایل .env.example');
    createEnvExample();

    // مرحله 10: ایجاد فایل package.json بهینه برای production
    logStep('📦', 'مرحله 10: بهینه‌سازی package.json برای production');
    const packageJsonPath = path.join(deployDir, 'package.json');
    if (exists(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      // حذف devDependencies (اختیاری - می‌توانید نگه دارید)
      // delete packageJson.devDependencies;
      
      // اطمینان از وجود script های ضروری
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      packageJson.scripts.start = packageJson.scripts.start || 'next start';
      packageJson.scripts.build = packageJson.scripts.build || 'next build';
      
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf-8'
      );
      logSuccess('package.json بهینه شد');
    }

    // مرحله 11: ایجاد فایل .npmrc (برای pnpm)
    if (packageManager === 'pnpm') {
      const npmrcPath = path.join(deployDir, '.npmrc');
      if (!exists(npmrcPath)) {
        fs.writeFileSync(npmrcPath, 'shamefully-hoist=true\n', 'utf-8');
        logInfo('فایل .npmrc ایجاد شد');
      }
    }

    // مرحله 12: ایجاد فایل .gitignore برای deploy
    logStep('📝', 'مرحله 12: ایجاد فایل .gitignore');
    const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`;
    fs.writeFileSync(path.join(deployDir, '.gitignore'), gitignoreContent);
    logSuccess('فایل .gitignore ایجاد شد');

    // مرحله 13: ایجاد فایل README برای deployment
    logStep('📚', 'مرحله 13: ایجاد مستندات deployment');
    const deployReadme = `# راهنمای Deployment

این پوشه شامل فایل‌های آماده برای deployment روی سرور است.

## مراحل نصب و اجرا:

### 1. آپلود فایل‌ها
فایل‌های این پوشه را روی سرور آپلود کنید.

### 2. نصب Dependencies
\`\`\`bash
# با pnpm (پیشنهادی)
pnpm install --production

# یا با npm
npm install --production

# یا با yarn
yarn install --production
\`\`\`

### 3. تنظیم متغیرهای محیطی
فایل \`.env.example\` را کپی کرده و به \`.env.local\` تبدیل کنید و مقادیر را تنظیم کنید:
\`\`\`bash
cp .env.example .env.local
# سپس فایل .env.local را ویرایش کنید
\`\`\`

### 4. بیلد پروژه (در صورت نیاز)
\`\`\`bash
# با pnpm
pnpm build

# یا با npm
npm run build
\`\`\`

### 5. اجرای پروژه
\`\`\`bash
# با pnpm
pnpm start

# یا با npm
npm start
\`\`\`

## نکات مهم:

- پورت پیش‌فرض: 3000
- برای تغییر پورت: \`PORT=3001 pnpm start\` یا \`PORT=3001 npm start\`
- برای production، از PM2 یا systemd استفاده کنید
- مطمئن شوید Node.js نسخه 18 یا بالاتر نصب است
- اگر از pnpm استفاده می‌کنید، مطمئن شوید pnpm نسخه 8 یا بالاتر نصب است

## بررسی نسخه‌ها:
\`\`\`bash
node --version   # باید 18+ باشد
pnpm --version   # باید 8+ باشد (اگر از pnpm استفاده می‌کنید)
\`\`\`

## استفاده با PM2:
\`\`\`bash
# نصب PM2
npm install -g pm2

# اجرا با pnpm
pm2 start pnpm --name "viramap-website" -- start

# یا با npm
pm2 start npm --name "viramap-website" -- start

pm2 save
pm2 startup
\`\`\`
`;
    fs.writeFileSync(path.join(deployDir, 'README.md'), deployReadme);
    logSuccess('مستندات deployment ایجاد شد');

    // مرحله 14: ایجاد فایل .dockerignore (اختیاری)
    logStep('🐳', 'مرحله 14: ایجاد فایل .dockerignore');
    const dockerignoreContent = `node_modules
.next
.git
.env*.local
*.log
.DS_Store
coverage
.vercel
`;
    fs.writeFileSync(path.join(deployDir, '.dockerignore'), dockerignoreContent);
    logInfo('فایل .dockerignore ایجاد شد');

    // مرحله 15: محاسبه حجم پوشه deploy
    logStep('📊', 'مرحله 15: محاسبه حجم پوشه deploy');
    function getDirSize(dirPath) {
      let size = 0;
      if (!exists(dirPath)) return 0;
      
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
          size += getDirSize(filePath);
        } else {
          size += stat.size;
        }
      });
      return size;
    }

    const deploySize = getDirSize(deployDir);
    const deploySizeMB = (deploySize / (1024 * 1024)).toFixed(2);
    logInfo(`حجم پوشه deploy: ${deploySizeMB} MB`);

    // مرحله 16: ایجاد فایل ZIP (اختیاری - نیاز به نصب archiver دارد)
    logStep('📦', 'مرحله 16: آماده‌سازی برای ایجاد فایل ZIP');
    logInfo('برای ایجاد فایل ZIP، می‌توانید از دستور زیر استفاده کنید:');
    logInfo(`  cd deploy && tar -czf ../deploy-${Date.now()}.tar.gz .`, 'yellow');
    logInfo('یا از ابزارهای ZIP استاندارد سیستم عامل خود استفاده کنید.', 'yellow');

    // خلاصه
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log('\n' + '='.repeat(60), 'bright');
    log('✅ Deployment با موفقیت انجام شد!', 'green');
    log('='.repeat(60), 'bright');
    log(`\n⏱️  زمان اجرا: ${duration} ثانیه`, 'cyan');
    log(`📁 پوشه deploy: ${deployDir}`, 'cyan');
    log(`📊 حجم: ${deploySizeMB} MB`, 'cyan');
    log('\n📝 مراحل بعدی:', 'yellow');
    log('  1. پوشه deploy را بررسی کنید', 'yellow');
    log('  2. فایل .env.local را تنظیم کنید', 'yellow');
    log('  3. فایل‌ها را روی سرور آپلود کنید', 'yellow');
    log('  4. دستورات نصب و اجرا را از README.md دنبال کنید', 'yellow');
    log('\n');

  } catch (error) {
    logError(`خطای غیرمنتظره: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// اجرای اسکریپت
if (require.main === module) {
  deploy().catch(error => {
    logError(`خطا: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { deploy };

