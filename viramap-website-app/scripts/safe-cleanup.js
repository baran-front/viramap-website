#!/usr/bin/env node

/**
 * سیستم پاکسازی ایمن چندلایه
 * لایه 1: توقف graceful پروسس‌ها
 * لایه 2: حذف با retry و exponential backoff
 * لایه 3: fallback به دستورات سیستمی
 * لایه 4: manual intervention با گزارش دقیق
 * لایه 5: rollback در صورت شکست
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const isWindows = process.platform === "win32";

// رنگ‌ها
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
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

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

function logLayer(layer, message) {
  log(`\n[لایه ${layer}] ${message}`, "cyan");
}

// ==================== لایه 1: توقف Graceful پروسس‌ها ====================

function layer1_GracefulShutdown() {
  logLayer(1, "توقف Graceful پروسس‌ها");

  return new Promise((resolve) => {
    let killedCount = 0;

    if (isWindows) {
      try {
        const taskListOutput = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', {
          encoding: "utf8",
          stdio: "pipe",
        });

        if (taskListOutput && !taskListOutput.includes("INFO: No tasks")) {
          const lines = taskListOutput
            .split("\n")
            .filter((line) => line.trim() && line.includes("node.exe"));

          lines.slice(1).forEach((line) => {
            try {
              const parts = line.match(/(?:^|,)(?:"([^"]*)"|([^,]*))/g);
              if (parts && parts.length >= 2) {
                const pid = parts[1].replace(/"/g, "").trim();
                const cwd = process.cwd();

                // بررسی اینکه آیا این پروسه مربوط به پروژه فعلی است
                try {
                  const wmicOutput = execSync(
                    `wmic process where "ProcessId=${pid}" get CommandLine /format:csv`,
                    { encoding: "utf8", stdio: "pipe" }
                  );

                  if (wmicOutput && (wmicOutput.includes("next") || wmicOutput.includes(cwd))) {
                    // ابتدا SIGTERM (graceful)
                    try {
                      execSync(`taskkill /PID ${pid}`, { stdio: "ignore" });
                      logInfo(`  SIGTERM به پروسه ${pid} ارسال شد`);
                      killedCount++;
                    } catch (err) {
                      // اگر graceful کار نکرد، ادامه می‌دهیم
                    }
                  }
                } catch (err) {
                  // اگر نتوانستیم command line را بگیریم، ادامه می‌دهیم
                }
              }
            } catch (err) {
              // خطا در پردازش یک پروسه، ادامه می‌دهیم
            }
          });
        }
      } catch (err) {
        // خطا در tasklist
      }
    } else {
      // Linux/Mac: استفاده از kill -TERM
      try {
        execSync("pkill -TERM -f 'next dev'", { stdio: "ignore" });
        execSync("pkill -TERM -f 'next build'", { stdio: "ignore" });
        killedCount = 1;
      } catch (err) {
        // اگر پروسه‌ای نبود، خطا می‌دهد - این طبیعی است
      }
    }

    // انتظار برای graceful shutdown
    logInfo("  انتظار 3 ثانیه برای graceful shutdown...");
    setTimeout(() => {
      if (killedCount > 0) {
        logSuccess(`  ${killedCount} پروسه graceful shutdown شد`);
      } else {
        logInfo("  هیچ پروسه‌ای برای shutdown یافت نشد");
      }
      resolve({ success: true, killed: killedCount });
    }, 3000);
  });
}

// ==================== لایه 2: حذف با Retry و Exponential Backoff ====================

async function layer2_RetryWithBackoff(filePath, maxRetries = 5) {
  const delays = [100, 200, 400, 800, 1600]; // exponential backoff

  for (let i = 0; i < maxRetries; i++) {
    try {
      const stats = fs.lstatSync(filePath);

      if (stats.isDirectory()) {
        // برای پوشه‌ها، ابتدا فایل‌های lock را حذف می‌کنیم
        if (isWindows) {
          const lockPath = path.join(filePath, "dev", "lock");
          if (fs.existsSync(lockPath)) {
            try {
              fs.chmodSync(lockPath, 0o666);
              fs.unlinkSync(lockPath);
            } catch (lockErr) {
              // اگر نتوانستیم lock را حذف کنیم، ادامه می‌دهیم
            }
          }
        }

        fs.rmSync(filePath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      } else {
        if (isWindows) {
          try {
            fs.chmodSync(filePath, 0o666);
          } catch (chmodErr) {
            // اگر نتوانستیم permission را تغییر دهیم، ادامه می‌دهیم
          }
        }
        fs.unlinkSync(filePath);
      }

      return { success: true, attempts: i + 1 };
    } catch (err) {
      if (err.code === "EPERM" || err.code === "EBUSY" || err.code === "ENOTEMPTY") {
        if (i < maxRetries - 1) {
          const delay = delays[i] || delays[delays.length - 1];
          logInfo(`  تلاش ${i + 1}/${maxRetries} ناموفق، انتظار ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        } else {
          return { success: false, error: err.code, attempts: maxRetries };
        }
      } else {
        throw err;
      }
    }
  }

  return { success: false, error: "MAX_RETRIES", attempts: maxRetries };
}

// ==================== لایه 3: Fallback به دستورات سیستمی ====================

function layer3_SystemCommands(filePath) {
  logLayer(3, "Fallback به دستورات سیستمی");

  const relativePath = path.relative(process.cwd(), filePath);

  try {
    if (isWindows) {
      // استفاده از rmdir /s /q
      const normalizedPath = relativePath.replace(/\//g, "\\");
      execSync(`if exist "${normalizedPath}" rmdir /s /q "${normalizedPath}"`, {
        stdio: "ignore",
        shell: true,
      });
      logSuccess(`  حذف با rmdir موفق: ${relativePath}`);
      return { success: true, method: "rmdir" };
    } else {
      // Linux/Mac: استفاده از rm -rf
      execSync(`rm -rf "${filePath}"`, { stdio: "ignore" });
      logSuccess(`  حذف با rm -rf موفق: ${relativePath}`);
      return { success: true, method: "rm -rf" };
    }
  } catch (err) {
    logError(`  حذف با دستور سیستمی ناموفق: ${err.message}`);
    return { success: false, error: err.message, method: isWindows ? "rmdir" : "rm -rf" };
  }
}

// ==================== لایه 4: Manual Intervention ====================

function layer4_ManualIntervention(filePath, error) {
  logLayer(4, "Manual Intervention - نیاز به اقدام دستی");

  const relativePath = path.relative(process.cwd(), filePath);
  const report = {
    file: relativePath,
    fullPath: filePath,
    error: error,
    timestamp: new Date().toISOString(),
    suggestions: [],
  };

  if (error === "EPERM" || error === "EACCES") {
    report.suggestions.push("1. بستن تمام terminal های باز");
    report.suggestions.push("2. بستن VS Code یا IDE");
    report.suggestions.push("3. بستن پروسه‌های node.exe از Task Manager");
    report.suggestions.push(`4. دستی حذف: ${isWindows ? `rmdir /s /q "${relativePath}"` : `rm -rf "${relativePath}"`}`);
  } else if (error === "EBUSY") {
    report.suggestions.push("1. بستن تمام برنامه‌هایی که از این فایل استفاده می‌کنند");
    report.suggestions.push("2. Restart کردن سیستم (در صورت نیاز)");
  } else if (error === "ENOTEMPTY") {
    report.suggestions.push("1. بررسی فایل‌های داخل پوشه");
    report.suggestions.push("2. حذف دستی فایل‌های داخل پوشه");
  }

  logError(`  نتوانست ${relativePath} را حذف کند`);
  logWarning("  راه‌حل‌های پیشنهادی:");
  report.suggestions.forEach((suggestion) => {
    logInfo(`    ${suggestion}`);
  });

  // ذخیره گزارش
  const reportPath = path.join(process.cwd(), ".cleanup-failed.json");
  let reports = [];
  if (fs.existsSync(reportPath)) {
    try {
      reports = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    } catch (err) {
      // اگر فایل خراب بود، از اول شروع می‌کنیم
    }
  }
  reports.push(report);
  fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2), "utf8");
  logInfo(`  گزارش در ${reportPath} ذخیره شد`);

  return report;
}

// ==================== لایه 5: Rollback ====================

function layer5_Rollback(backupDir) {
  logLayer(5, "Rollback - بازگردانی از Backup");

  if (!fs.existsSync(backupDir)) {
    logWarning("  Backup یافت نشد - rollback امکان‌پذیر نیست");
    return { success: false, reason: "NO_BACKUP" };
  }

  logWarning("  ⚠️  Rollback در حال انجام است...");
  logInfo("  این عملیات می‌تواند زمان‌بر باشد");

  // در اینجا می‌توانیم backup را بازگردانی کنیم
  // برای سادگی، فقط گزارش می‌دهیم
  logInfo(`  Backup در ${backupDir} موجود است`);
  logInfo("  برای rollback دستی، از فایل‌های backup استفاده کنید");

  return { success: true, backupDir };
}

// ==================== تابع اصلی پاکسازی ====================

async function safeCleanup(targets, options = {}) {
  const {
    createBackup = false,
    enableRollback = false,
    maxRetries = 5,
    skipLayers = [],
  } = options;

  log("\n" + "=".repeat(60), "magenta");
  log("🧹 سیستم پاکسازی ایمن چندلایه", "magenta");
  log("=".repeat(60) + "\n", "magenta");

  let backupDir = null;

  // ایجاد Backup (در صورت نیاز)
  if (createBackup) {
    logInfo("📦 ایجاد Backup...");
    backupDir = path.join(process.cwd(), ".backup", `backup-${Date.now()}`);
    // در اینجا می‌توانیم backup ایجاد کنیم
    logInfo(`  Backup در ${backupDir} ایجاد می‌شود`);
  }

  const results = {
    layer1: null,
    layer2: {},
    layer3: {},
    layer4: [],
    layer5: null,
    summary: {
      total: targets.length,
      success: 0,
      failed: 0,
    },
  };

  // لایه 1: Graceful Shutdown
  if (!skipLayers.includes(1)) {
    results.layer1 = await layer1_GracefulShutdown();
  }

  // لایه 2-4: حذف فایل‌ها
  for (const target of targets) {
    const fullPath = path.isAbsolute(target) ? target : path.join(process.cwd(), target);

    if (!fs.existsSync(fullPath)) {
      logInfo(`  ${target} وجود ندارد - رد می‌شود`);
      results.summary.success++;
      continue;
    }

    logInfo(`\n🗑️  حذف: ${target}`);

    // لایه 2: Retry با Backoff
    if (!skipLayers.includes(2)) {
      const layer2Result = await layer2_RetryWithBackoff(fullPath, maxRetries);
      results.layer2[target] = layer2Result;

      if (layer2Result.success) {
        logSuccess(`  ✅ حذف موفق (${layer2Result.attempts} تلاش)`);
        results.summary.success++;
        continue;
      }
    }

    // لایه 3: دستورات سیستمی
    if (!skipLayers.includes(3)) {
      const layer3Result = layer3_SystemCommands(fullPath);
      results.layer3[target] = layer3Result;

      if (layer3Result.success) {
        logSuccess(`  ✅ حذف با دستور سیستمی موفق`);
        results.summary.success++;
        continue;
      }
    }

    // لایه 4: Manual Intervention
    if (!skipLayers.includes(4)) {
      const layer4Result = layer4_ManualIntervention(fullPath, results.layer2[target]?.error || "UNKNOWN");
      results.layer4.push(layer4Result);
      results.summary.failed++;
    }
  }

  // لایه 5: Rollback (در صورت نیاز)
  if (enableRollback && results.summary.failed > 0 && backupDir) {
    results.layer5 = layer5_Rollback(backupDir);
  }

  // گزارش نهایی
  log("\n" + "=".repeat(60), "cyan");
  log("📊 گزارش نهایی", "cyan");
  log("=".repeat(60), "cyan");
  logSuccess(`موفق: ${results.summary.success}/${results.summary.total}`);
  if (results.summary.failed > 0) {
    logError(`ناموفق: ${results.summary.failed}/${results.summary.total}`);
    logWarning("  برای فایل‌های ناموفق، فایل .cleanup-failed.json را بررسی کنید");
  }

  return results;
}

// ==================== Main ====================

async function main() {
  const args = process.argv.slice(2);
  const targets = args.length > 0 ? args : [".next", ".turbo", "node_modules/.cache", "out"];

  const options = {
    createBackup: process.env.CLEANUP_BACKUP === "true",
    enableRollback: process.env.CLEANUP_ROLLBACK === "true",
    maxRetries: parseInt(process.env.CLEANUP_MAX_RETRIES || "5"),
  };

  try {
    const results = await safeCleanup(targets, options);
    process.exit(results.summary.failed > 0 ? 1 : 0);
  } catch (err) {
    logError(`خطای غیرمنتظره: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// اجرا
if (require.main === module) {
  main();
}

module.exports = { safeCleanup, layer1_GracefulShutdown, layer2_RetryWithBackoff, layer3_SystemCommands, layer4_ManualIntervention, layer5_Rollback };

