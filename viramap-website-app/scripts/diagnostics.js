#!/usr/bin/env node

/**
 * سیستم تشخیصی جامع برای پروژه Next.js
 * بررسی وضعیت پروژه، نسخه‌ها، فایل‌های قفل شده، پروسه‌ها و منابع سیستم
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const isWindows = process.platform === "win32";

// رنگ‌ها
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
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

function logSection(title) {
  log(`\n${"=".repeat(60)}`, "cyan");
  log(title, "cyan");
  log("=".repeat(60), "cyan");
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

// نتایج تشخیص
const diagnostics = {
  system: {},
  project: {},
  processes: [],
  lockedFiles: [],
  diskSpace: {},
  memory: {},
  logs: [],
  errors: [],
  warnings: [],
};

// ==================== بررسی سیستم ====================

function checkSystemInfo() {
  logSection("🔍 بررسی اطلاعات سیستم");

  diagnostics.system = {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    cwd: process.cwd(),
    homeDir: os.homedir(),
    tmpDir: os.tmpdir(),
  };

  logInfo(`سیستم عامل: ${diagnostics.system.platform} (${diagnostics.system.arch})`);
  logInfo(`Node.js: ${diagnostics.system.nodeVersion}`);
  logInfo(`مسیر پروژه: ${diagnostics.system.cwd}`);

  // بررسی نسخه npm/pnpm/yarn
  try {
    const npmVersion = execSync("npm --version", { encoding: "utf8", stdio: "pipe" }).trim();
    logSuccess(`npm: ${npmVersion}`);
    diagnostics.system.npmVersion = npmVersion;
  } catch (err) {
    logWarning("npm یافت نشد");
  }

  try {
    const pnpmVersion = execSync("pnpm --version", { encoding: "utf8", stdio: "pipe" }).trim();
    logSuccess(`pnpm: ${pnpmVersion}`);
    diagnostics.system.pnpmVersion = pnpmVersion;
  } catch (err) {
    logWarning("pnpm یافت نشد");
  }

  try {
    const yarnVersion = execSync("yarn --version", { encoding: "utf8", stdio: "pipe" }).trim();
    logSuccess(`yarn: ${yarnVersion}`);
    diagnostics.system.yarnVersion = yarnVersion;
  } catch (err) {
    // yarn اختیاری است
  }
}

// ==================== بررسی پروژه ====================

function checkProject() {
  logSection("📁 بررسی پروژه");

  const packageJsonPath = path.join(process.cwd(), "package.json");
  const nextConfigPath = path.join(process.cwd(), "next.config.ts");
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

  // بررسی package.json
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      diagnostics.project.name = packageJson.name;
      diagnostics.project.version = packageJson.version;
      diagnostics.project.nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next;
      diagnostics.project.reactVersion = packageJson.dependencies?.react || packageJson.devDependencies?.react;

      logSuccess(`نام پروژه: ${diagnostics.project.name}`);
      logSuccess(`نسخه: ${diagnostics.project.version}`);
      logInfo(`Next.js: ${diagnostics.project.nextVersion}`);
      logInfo(`React: ${diagnostics.project.reactVersion}`);
    } catch (err) {
      logError(`خطا در خواندن package.json: ${err.message}`);
      diagnostics.errors.push(`package.json: ${err.message}`);
    }
  } else {
    logError("package.json یافت نشد!");
    diagnostics.errors.push("package.json یافت نشد");
  }

  // بررسی فایل‌های پیکربندی
  const configFiles = {
    "next.config.ts": nextConfigPath,
    "tsconfig.json": tsConfigPath,
  };

  for (const [name, filePath] of Object.entries(configFiles)) {
    if (fs.existsSync(filePath)) {
      logSuccess(`${name} موجود است`);
    } else {
      logWarning(`${name} یافت نشد`);
      diagnostics.warnings.push(`${name} یافت نشد`);
    }
  }

  // بررسی پوشه‌های مهم
  const importantDirs = [".next", "node_modules", "app", "components", "public"];
  for (const dir of importantDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      try {
        const stats = fs.statSync(dirPath);
        if (stats.isDirectory()) {
          const files = fs.readdirSync(dirPath);
          logInfo(`${dir}: ${files.length} آیتم`);
        }
      } catch (err) {
        logWarning(`نمی‌توان ${dir} را خواند: ${err.message}`);
      }
    } else {
      if (dir === ".next" || dir === "node_modules") {
        logInfo(`${dir} وجود ندارد (طبیعی است اگر cache پاک شده باشد)`);
      }
    }
  }
}

// ==================== بررسی پروسه‌ها ====================

function checkProcesses() {
  logSection("🔄 بررسی پروسه‌های در حال اجرا");

  if (!isWindows) {
    try {
      const processes = execSync("ps aux | grep -E 'node|next' | grep -v grep", {
        encoding: "utf8",
        stdio: "pipe",
      });

      if (processes.trim()) {
        const lines = processes.trim().split("\n");
        logWarning(`پیدا شد ${lines.length} پروسه Node.js/Next.js:`);
        lines.forEach((line) => {
          logInfo(`  ${line.substring(0, 80)}`);
          diagnostics.processes.push(line);
        });
      } else {
        logSuccess("هیچ پروسه Node.js/Next.js در حال اجرا نیست");
      }
    } catch (err) {
      // اگر grep چیزی پیدا نکرد، خطا می‌دهد - این طبیعی است
      logSuccess("هیچ پروسه Node.js/Next.js در حال اجرا نیست");
    }
  } else {
    try {
      const taskListOutput = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', {
        encoding: "utf8",
        stdio: "pipe",
      });

      if (taskListOutput && !taskListOutput.includes("INFO: No tasks")) {
        const lines = taskListOutput
          .split("\n")
          .filter((line) => line.trim() && line.includes("node.exe"));

        if (lines.length > 1) {
          // خط اول header است
          logWarning(`پیدا شد ${lines.length - 1} پروسه node.exe:`);
          lines.slice(1).forEach((line) => {
            const parts = line.match(/(?:^|,)(?:"([^"]*)"|([^,]*))/g);
            if (parts && parts.length >= 2) {
              const pid = parts[1].replace(/"/g, "").trim();
              const imageName = parts[0].replace(/"/g, "").replace(/,/g, "").trim();
              logInfo(`  PID: ${pid}, Image: ${imageName}`);
              diagnostics.processes.push({ pid, imageName });
            }
          });
        } else {
          logSuccess("هیچ پروسه node.exe در حال اجرا نیست");
        }
      } else {
        logSuccess("هیچ پروسه node.exe در حال اجرا نیست");
      }
    } catch (err) {
      logWarning(`خطا در بررسی پروسه‌ها: ${err.message}`);
    }
  }
}

// ==================== بررسی فایل‌های قفل شده ====================

function checkLockedFiles() {
  logSection("🔒 بررسی فایل‌های قفل شده");

  const lockFiles = [".next/dev/lock", ".next/cache", ".turbo"];
  const currentDir = process.cwd();

  for (const lockFile of lockFiles) {
    const fullPath = path.join(currentDir, lockFile);
    if (fs.existsSync(fullPath)) {
      try {
        // تلاش برای دسترسی به فایل
        fs.accessSync(fullPath, fs.constants.R_OK | fs.constants.W_OK);
        logSuccess(`${lockFile} قابل دسترسی است`);
      } catch (err) {
        if (err.code === "EPERM" || err.code === "EACCES") {
          logError(`${lockFile} قفل شده است (${err.code})`);
          diagnostics.lockedFiles.push({ path: lockFile, error: err.code });
        } else {
          logWarning(`${lockFile}: ${err.message}`);
        }
      }
    }
  }

  if (diagnostics.lockedFiles.length === 0) {
    logSuccess("هیچ فایل قفل شده‌ای یافت نشد");
  }
}

// ==================== بررسی فضای دیسک ====================

function checkDiskSpace() {
  logSection("💾 بررسی فضای دیسک");

  try {
    if (isWindows) {
      const drive = process.cwd().substring(0, 2); // مثلاً "C:"
      const wmicOutput = execSync(
        `wmic logicaldisk where "DeviceID='${drive}'" get FreeSpace,Size /format:csv`,
        { encoding: "utf8", stdio: "pipe" }
      );

      const lines = wmicOutput.split("\n").filter((line) => line.includes(drive));
      if (lines.length > 0) {
        const parts = lines[0].split(",");
        if (parts.length >= 3) {
          const freeSpace = parseInt(parts[parts.length - 2]) || 0;
          const totalSpace = parseInt(parts[parts.length - 1]) || 0;
          const usedSpace = totalSpace - freeSpace;
          const freePercent = ((freeSpace / totalSpace) * 100).toFixed(2);

          diagnostics.diskSpace = {
            free: freeSpace,
            total: totalSpace,
            used: usedSpace,
            freePercent: parseFloat(freePercent),
          };

          logInfo(`فضای آزاد: ${(freeSpace / 1024 / 1024 / 1024).toFixed(2)} GB (${freePercent}%)`);
          logInfo(`فضای کل: ${(totalSpace / 1024 / 1024 / 1024).toFixed(2)} GB`);

          if (freePercent < 10) {
            logError("فضای دیسک کم است! (< 10%)");
            diagnostics.errors.push("فضای دیسک کم است");
          } else if (freePercent < 20) {
            logWarning("فضای دیسک در حال اتمام است (< 20%)");
            diagnostics.warnings.push("فضای دیسک در حال اتمام است");
          } else {
            logSuccess("فضای دیسک کافی است");
          }
        }
      }
    } else {
      const dfOutput = execSync("df -h .", { encoding: "utf8", stdio: "pipe" });
      logInfo(dfOutput);
      // پارس کردن خروجی df برای Linux/Mac
    }
  } catch (err) {
    logWarning(`خطا در بررسی فضای دیسک: ${err.message}`);
  }
}

// ==================== بررسی Memory ====================

function checkMemory() {
  logSection("🧠 بررسی Memory");

  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(2);

  diagnostics.memory = {
    total: totalMemory,
    free: freeMemory,
    used: usedMemory,
    usedPercent: parseFloat(memoryPercent),
  };

  logInfo(`Memory کل: ${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
  logInfo(`Memory آزاد: ${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
  logInfo(`Memory استفاده شده: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB (${memoryPercent}%)`);

  if (memoryPercent > 90) {
    logError("Memory در حال اتمام است! (> 90%)");
    diagnostics.errors.push("Memory در حال اتمام است");
  } else if (memoryPercent > 80) {
    logWarning("Memory در حال اتمام است (> 80%)");
    diagnostics.warnings.push("Memory در حال اتمام است");
  } else {
    logSuccess("Memory کافی است");
  }
}

// ==================== بررسی لاگ‌ها ====================

function checkLogs() {
  logSection("📋 بررسی لاگ‌های اخیر");

  const logFiles = [".next/trace", "turbo-build.log", "turbo-dev.log"];
  const currentDir = process.cwd();

  for (const logFile of logFiles) {
    const fullPath = path.join(currentDir, logFile);
    if (fs.existsSync(fullPath)) {
      try {
        const stats = fs.statSync(fullPath);
        const size = (stats.size / 1024).toFixed(2);
        const modified = stats.mtime.toISOString();
        logInfo(`${logFile}: ${size} KB (آخرین تغییر: ${modified.substring(0, 19)})`);

        // خواندن آخرین خطوط لاگ
        if (stats.size < 1024 * 1024) {
          // فقط اگر فایل کوچکتر از 1MB باشد
          const content = fs.readFileSync(fullPath, "utf8");
          const lines = content.split("\n").filter((line) => line.trim());
          const lastLines = lines.slice(-5); // آخرین 5 خط
          if (lastLines.length > 0) {
            logInfo(`  آخرین خطوط:`);
            lastLines.forEach((line) => {
              if (line.toLowerCase().includes("error")) {
                logError(`    ${line.substring(0, 100)}`);
                diagnostics.logs.push({ file: logFile, type: "error", line });
              } else if (line.toLowerCase().includes("warning")) {
                logWarning(`    ${line.substring(0, 100)}`);
                diagnostics.logs.push({ file: logFile, type: "warning", line });
              }
            });
          }
        }
      } catch (err) {
        logWarning(`خطا در خواندن ${logFile}: ${err.message}`);
      }
    }
  }
}

// ==================== گزارش نهایی ====================

function generateReport() {
  logSection("📊 گزارش نهایی");

  const totalIssues = diagnostics.errors.length + diagnostics.warnings.length;
  const hasLockedFiles = diagnostics.lockedFiles.length > 0;
  const hasRunningProcesses = diagnostics.processes.length > 0;

  if (totalIssues === 0 && !hasLockedFiles && !hasRunningProcesses) {
    logSuccess("✅ وضعیت پروژه سالم است!");
    logInfo("هیچ مشکلی یافت نشد.");
  } else {
    if (diagnostics.errors.length > 0) {
      logError(`\n❌ ${diagnostics.errors.length} خطای بحرانی:`);
      diagnostics.errors.forEach((error) => {
        logError(`  - ${error}`);
      });
    }

    if (diagnostics.warnings.length > 0) {
      logWarning(`\n⚠️  ${diagnostics.warnings.length} هشدار:`);
      diagnostics.warnings.forEach((warning) => {
        logWarning(`  - ${warning}`);
      });
    }

    if (hasLockedFiles) {
      logWarning(`\n🔒 ${diagnostics.lockedFiles.length} فایل قفل شده:`);
      diagnostics.lockedFiles.forEach((file) => {
        logWarning(`  - ${file.path} (${file.error})`);
      });
      logInfo("💡 راه‌حل: pnpm kill-next && pnpm clean-cache");
    }

    if (hasRunningProcesses) {
      logWarning(`\n🔄 ${diagnostics.processes.length} پروسه در حال اجرا`);
      logInfo("💡 راه‌حل: pnpm kill-next");
    }
  }

  // ذخیره گزارش در فایل JSON
  const reportPath = path.join(process.cwd(), ".diagnostics-report.json");
  try {
    fs.writeFileSync(reportPath, JSON.stringify(diagnostics, null, 2), "utf8");
    logSuccess(`\n📄 گزارش کامل در ${reportPath} ذخیره شد`);
  } catch (err) {
    logWarning(`نمی‌توان گزارش را ذخیره کرد: ${err.message}`);
  }

  return diagnostics;
}

// ==================== Main ====================

function runDiagnostics() {
  log("\n" + "=".repeat(60), "magenta");
  log("🔍 سیستم تشخیصی جامع - Next.js Project Diagnostics", "magenta");
  log("=".repeat(60) + "\n", "magenta");

  try {
    checkSystemInfo();
    checkProject();
    checkProcesses();
    checkLockedFiles();
    checkDiskSpace();
    checkMemory();
    checkLogs();
    const report = generateReport();

    // خروجی با کد مناسب
    const exitCode = diagnostics.errors.length > 0 ? 1 : 0;
    process.exit(exitCode);
  } catch (err) {
    logError(`خطای غیرمنتظره: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// اجرا
if (require.main === module) {
  runDiagnostics();
}

module.exports = { runDiagnostics };

