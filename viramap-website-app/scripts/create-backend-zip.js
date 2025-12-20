// scripts/create-backend-zip.js
// اسکریپت ایجاد فایل ZIP برای ارسال به بک‌اند
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "cyan");
}

function createBackendZip() {
  const rootDir = process.cwd();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const zipFileName = `viramap-backend-${timestamp}.zip`;
  const zipFilePath = path.join(rootDir, zipFileName);

  log("\n" + "=".repeat(60), "cyan");
  log("📦 ایجاد فایل ZIP برای بک‌اند", "cyan");
  log("=".repeat(60) + "\n", "cyan");

  // بررسی وجود پوشه .next (بیلد شده)
  const nextDir = path.join(rootDir, ".next");
  if (!fs.existsSync(nextDir)) {
    logError(
      "پوشه .next یافت نشد! لطفاً ابتدا بیلد بگیرید: pnpm build:webpack"
    );
    process.exit(1);
  }

  try {
    const isWindows = process.platform === "win32";

    if (isWindows) {
      // استفاده از PowerShell Compress-Archive
      logInfo("ایجاد فایل ZIP با PowerShell...");

      // لیست فایل‌ها و پوشه‌هایی که باید شامل شوند
      const includeItems = [
        ".next",
        "public",
        "app",
        "components",
        "services",
        "package.json",
        "pnpm-lock.yaml",
        "next.config.ts",
        "tsconfig.json",
        "postcss.config.mjs",
        "next-env.d.ts",
        "eslint.config.mjs",
      ];

      // بررسی وجود فایل‌ها
      const existingItems = includeItems.filter((item) => {
        const itemPath = path.join(rootDir, item);
        return fs.existsSync(itemPath);
      });

      if (existingItems.length === 0) {
        logError("هیچ فایلی برای ZIP کردن یافت نشد!");
        process.exit(1);
      }

      logInfo(`فایل‌های شامل شده: ${existingItems.join(", ")}`);

      // ساخت دستور PowerShell با استفاده از روش ساده‌تر
      const escapedZip = zipFilePath.replace(/\\/g, "\\\\").replace(/'/g, "''");

      // ساخت آرایه مسیرها برای PowerShell
      const itemsArray = existingItems.map((item) => {
        const itemPath = path
          .join(rootDir, item)
          .replace(/\\/g, "\\\\")
          .replace(/'/g, "''");
        return `'${itemPath}'`;
      });

      // حذف پوشه‌های cache و dev از لیست (اگر .next در لیست است)
      const filteredItems = existingItems.filter((item) => {
        return item !== ".next/cache" && item !== ".next/dev";
      });

      // اگر .next در لیست است، فقط پوشه‌های خاص را اضافه می‌کنیم
      const finalItems = [];
      filteredItems.forEach((item) => {
        if (item === ".next") {
          // برای .next، فقط پوشه‌های production را اضافه می‌کنیم
          const nextStandalone = path.join(rootDir, ".next", "standalone");
          const nextStatic = path.join(rootDir, ".next", "static");
          const nextServer = path.join(rootDir, ".next", "server");
          if (fs.existsSync(nextStandalone))
            finalItems.push(".next/standalone");
          if (fs.existsSync(nextStatic)) finalItems.push(".next/static");
          if (fs.existsSync(nextServer)) finalItems.push(".next/server");
          // فایل‌های root .next
          const nextFiles = [
            "BUILD_ID",
            "package.json",
            "required-server-files.json",
          ];
          nextFiles.forEach((file) => {
            const filePath = path.join(rootDir, ".next", file);
            if (fs.existsSync(filePath)) finalItems.push(`.next/${file}`);
          });
        } else {
          finalItems.push(item);
        }
      });

      const finalItemsArray = finalItems.map((item) => {
        const itemPath = path
          .join(rootDir, item)
          .replace(/\\/g, "\\\\")
          .replace(/'/g, "''");
        return `'${itemPath}'`;
      });

      const psScript = `
$ErrorActionPreference = 'Stop'
$rootDir = '${rootDir.replace(/\\/g, "\\\\").replace(/'/g, "''")}'
$zipPath = '${escapedZip}'

# حذف فایل ZIP قبلی
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

# تغییر به دایرکتوری root
Set-Location $rootDir

# ایجاد ZIP از فایل‌ها
$items = @(
${finalItemsArray.map((item) => `  ${item}`).join(",\n")}
)

Compress-Archive -Path $items -DestinationPath $zipPath -Force -ErrorAction SilentlyContinue

if (Test-Path $zipPath) {
  $size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
  Write-Host "ZIP created successfully. Size: $size MB"
} else {
  Write-Error "Failed to create ZIP file"
  exit 1
}
      `.trim();

      try {
        // نوشتن اسکریپت در فایل موقت برای اجرا
        const tempScriptPath = path.join(rootDir, "temp-zip-script.ps1");
        fs.writeFileSync(tempScriptPath, psScript, "utf8");

        execSync(
          `powershell -NoProfile -ExecutionPolicy Bypass -File "${tempScriptPath}"`,
          { stdio: "inherit", shell: true, cwd: rootDir }
        );

        // حذف فایل موقت
        if (fs.existsSync(tempScriptPath)) {
          fs.unlinkSync(tempScriptPath);
        }

        // بررسی وجود فایل ZIP
        if (fs.existsSync(zipFilePath)) {
          const stats = fs.statSync(zipFilePath);
          const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          logSuccess(`فایل ZIP ایجاد شد: ${zipFileName} (${sizeMB} MB)`);
        } else {
          throw new Error("فایل ZIP ایجاد نشد");
        }
      } catch (error) {
        logError(`خطا در ایجاد فایل ZIP: ${error.message}`);
        logInfo("💡 می‌توانید به صورت دستی فایل‌ها را ZIP کنید");
        throw error;
      }
    } else {
      // استفاده از zip command برای Linux/Mac
      logInfo("استفاده از دستور zip...");

      const includeItems = [
        ".next",
        "public",
        "app",
        "components",
        "services",
        "package.json",
        "pnpm-lock.yaml",
        "next.config.ts",
        "tsconfig.json",
        "postcss.config.mjs",
        "next-env.d.ts",
        "eslint.config.mjs",
      ];

      const existingItems = includeItems.filter((item) => {
        return fs.existsSync(path.join(rootDir, item));
      });

      if (existingItems.length === 0) {
        logError("هیچ فایلی برای ZIP کردن یافت نشد!");
        process.exit(1);
      }

      // حذف فایل ZIP قبلی
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath);
      }

      // ایجاد ZIP
      const excludePatterns = [
        "node_modules",
        ".git",
        ".next/cache",
        "*.log",
        ".env*.local",
        ".DS_Store",
      ];

      const excludeArgs = excludePatterns
        .map((pattern) => `-x "${pattern}"`)
        .join(" ");

      process.chdir(rootDir);
      execSync(
        `zip -r "${zipFileName}" ${existingItems.join(" ")} ${excludeArgs}`,
        { stdio: "inherit" }
      );

      logSuccess(`فایل ZIP ایجاد شد: ${zipFileName}`);
    }

    // محاسبه حجم فایل
    if (fs.existsSync(zipFilePath)) {
      const stats = fs.statSync(zipFilePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      logInfo(`حجم فایل: ${sizeMB} MB`);
    }

    log("\n" + "=".repeat(60), "cyan");
    logSuccess("فایل ZIP با موفقیت ایجاد شد!");
    log("=".repeat(60), "cyan");
    log(`\n📁 مسیر فایل: ${zipFilePath}`, "cyan");
    log("\n📋 فایل‌های شامل شده:", "yellow");
    log("   - .next (build output)", "yellow");
    log("   - public (static files)", "yellow");
    log("   - app (source code)", "yellow");
    log("   - components (source code)", "yellow");
    log("   - services (source code)", "yellow");
    log("   - package.json & pnpm-lock.yaml", "yellow");
    log("   - config files (next.config.ts, tsconfig.json, etc.)", "yellow");
    log("\n💡 این فایل را برای بک‌اند ارسال کنید.\n", "yellow");
  } catch (error) {
    logError(`خطا: ${error.message}`);
    process.exit(1);
  }
}

// اجرای اسکریپت
if (require.main === module) {
  createBackendZip();
}

module.exports = { createBackendZip };
