#!/usr/bin/env node

/**
 * سیستم Deployment ایمن و جامع
 * شامل: diagnostics, cleanup, repair, build, deploy, checksum, monitoring
 */

const { runDiagnostics } = require("./diagnostics");
const { safeCleanup } = require("./safe-cleanup");
const { repairDependencies, repairConfigFiles, validateProject } = require("./project-repair");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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

function logStep(step, message) {
  log(`\n[${step}] ${message}`, "cyan");
}

// ==================== Main Deployment Flow ====================

async function deploySafe(options = {}) {
  const {
    skipDiagnostics = false,
    skipCleanup = false,
    skipRepair = false,
    skipBuild = false,
    createZip = true,
    createReport = true,
  } = options;

  log("\n" + "=".repeat(60), "magenta");
  log("🚀 سیستم Deployment ایمن و جامع", "magenta");
  log("=".repeat(60) + "\n", "magenta");

  const report = {
    startTime: new Date().toISOString(),
    steps: [],
    errors: [],
    warnings: [],
    files: [],
    checksums: {},
    endTime: null,
    success: false,
  };

  try {
    // Step 1: Diagnostics
    if (!skipDiagnostics) {
      logStep("1/6", "تشخیص و آنالیز");
      try {
        const diagnostics = await runDiagnostics();
        report.steps.push({ name: "diagnostics", success: true, data: diagnostics });
        logSuccess("تشخیص کامل شد");
      } catch (err) {
        logError(`خطا در تشخیص: ${err.message}`);
        report.errors.push(`Diagnostics: ${err.message}`);
        report.steps.push({ name: "diagnostics", success: false, error: err.message });
      }
    }

    // Step 2: Safe Cleanup
    if (!skipCleanup) {
      logStep("2/6", "پاکسازی ایمن");
      try {
        const cleanupResult = await safeCleanup([".next", ".turbo", "node_modules/.cache", "out"], {
          createBackup: true,
          maxRetries: 5,
        });
        report.steps.push({ name: "cleanup", success: cleanupResult.summary.failed === 0, data: cleanupResult });
        if (cleanupResult.summary.failed === 0) {
          logSuccess("پاکسازی کامل شد");
        } else {
          logWarning(`${cleanupResult.summary.failed} فایل نتوانست حذف شود`);
        }
      } catch (err) {
        logError(`خطا در پاکسازی: ${err.message}`);
        report.errors.push(`Cleanup: ${err.message}`);
        report.steps.push({ name: "cleanup", success: false, error: err.message });
      }
    }

    // Step 3: Repair
    if (!skipRepair) {
      logStep("3/6", "ترمیم پروژه");
      try {
        const repairDeps = await repairDependencies();
        const repairConfig = repairConfigFiles();
        const validation = validateProject();

        report.steps.push({
          name: "repair",
          success: repairDeps.success && validation.success,
          data: { repairDeps, repairConfig, validation },
        });

        if (repairDeps.success && validation.success) {
          logSuccess("ترمیم کامل شد");
        } else {
          logWarning("برخی مشکلات در ترمیم باقی مانده است");
        }
      } catch (err) {
        logError(`خطا در ترمیم: ${err.message}`);
        report.errors.push(`Repair: ${err.message}`);
        report.steps.push({ name: "repair", success: false, error: err.message });
      }
    }

    // Step 4: Build
    if (!skipBuild) {
      logStep("4/6", "Build پروژه");
      try {
        logInfo("اجرای next build...");
        execSync("next build", { stdio: "inherit", env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" } });
        report.steps.push({ name: "build", success: true });
        logSuccess("Build موفق بود");
      } catch (err) {
        logError(`خطا در Build: ${err.message}`);
        report.errors.push(`Build: ${err.message}`);
        report.steps.push({ name: "build", success: false, error: err.message });
        throw err; // Build failure is critical
      }
    }

    // Step 5: Deploy
    logStep("5/6", "Deployment");
    try {
      logInfo("اجرای deploy script...");
      execSync("node scripts/deploy.js", { stdio: "inherit" });
      report.steps.push({ name: "deploy", success: true });
      logSuccess("Deployment موفق بود");
    } catch (err) {
      logError(`خطا در Deployment: ${err.message}`);
      report.errors.push(`Deploy: ${err.message}`);
      report.steps.push({ name: "deploy", success: false, error: err.message });
      throw err;
    }

    // Step 6: Create ZIP and Checksum
    if (createZip) {
      logStep("6/6", "ایجاد ZIP و Checksum");
      try {
        execSync("node scripts/create-zip.js", { stdio: "inherit" });

        // پیدا کردن فایل ZIP ایجاد شده
        const deployDir = path.join(process.cwd(), "deploy");
        const zipFiles = fs
          .readdirSync(process.cwd())
          .filter((file) => file.startsWith("deploy-") && file.endsWith(".zip"));

        if (zipFiles.length > 0) {
          const zipFile = zipFiles[zipFiles.length - 1]; // آخرین فایل
          const zipPath = path.join(process.cwd(), zipFile);

          // محاسبه checksum
          const fileBuffer = fs.readFileSync(zipPath);
          const md5 = crypto.createHash("md5").update(fileBuffer).digest("hex");
          const sha256 = crypto.createHash("sha256").update(fileBuffer).digest("hex");
          const stats = fs.statSync(zipPath);

          report.checksums[zipFile] = {
            md5,
            sha256,
            size: stats.size,
            sizeMB: (stats.size / 1024 / 1024).toFixed(2),
          };

          report.files.push({
            name: zipFile,
            path: zipPath,
            size: stats.size,
            checksum: { md5, sha256 },
          });

          logSuccess(`ZIP ایجاد شد: ${zipFile}`);
          logInfo(`  حجم: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
          logInfo(`  MD5: ${md5}`);
          logInfo(`  SHA256: ${sha256.substring(0, 32)}...`);
        }

        report.steps.push({ name: "zip", success: true });
      } catch (err) {
        logError(`خطا در ایجاد ZIP: ${err.message}`);
        report.errors.push(`ZIP: ${err.message}`);
        report.steps.push({ name: "zip", success: false, error: err.message });
      }
    }

    report.endTime = new Date().toISOString();
    report.success = report.errors.length === 0;

    // ایجاد گزارش HTML
    if (createReport) {
      generateHTMLReport(report);
    }

    // ذخیره گزارش JSON
    const reportPath = path.join(process.cwd(), ".deploy-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
    logSuccess(`گزارش در ${reportPath} ذخیره شد`);

    if (report.success) {
      logSuccess("\n✅ Deployment با موفقیت انجام شد!");
    } else {
      logWarning(`\n⚠️  Deployment با ${report.errors.length} خطا انجام شد`);
    }

    return report;
  } catch (err) {
    report.endTime = new Date().toISOString();
    report.success = false;
    report.errors.push(`Fatal: ${err.message}`);

    if (createReport) {
      generateHTMLReport(report);
    }

    const reportPath = path.join(process.cwd(), ".deploy-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");

    logError(`\n❌ Deployment شکست خورد: ${err.message}`);
    throw err;
  }
}

// ==================== Generate HTML Report ====================

function generateHTMLReport(report) {
  const html = `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>گزارش Deployment</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 10px;
        }
        .status {
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: right;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: bold;
        }
        .step {
            margin: 15px 0;
            padding: 10px;
            border-right: 4px solid #4CAF50;
            background: #f8f9fa;
        }
        .step.failed {
            border-right-color: #dc3545;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 گزارش Deployment</h1>
        
        <div class="status ${report.success ? 'success' : 'error'}">
            <strong>وضعیت:</strong> ${report.success ? "✅ موفق" : "❌ ناموفق"}
        </div>

        <h2>📋 اطلاعات کلی</h2>
        <table>
            <tr>
                <th>شروع</th>
                <td>${new Date(report.startTime).toLocaleString("fa-IR")}</td>
            </tr>
            <tr>
                <th>پایان</th>
                <td>${report.endTime ? new Date(report.endTime).toLocaleString("fa-IR") : "در حال انجام"}</td>
            </tr>
            <tr>
                <th>مدت زمان</th>
                <td>${report.endTime ? calculateDuration(report.startTime, report.endTime) : "محاسبه نشده"}</td>
            </tr>
        </table>

        <h2>📝 مراحل</h2>
        ${report.steps
          .map(
            (step) => `
        <div class="step ${step.success ? "" : "failed"}">
            <strong>${step.name}:</strong> ${step.success ? "✅ موفق" : "❌ ناموفق"}
            ${step.error ? `<br><code>${step.error}</code>` : ""}
        </div>
        `
          )
          .join("")}

        ${report.errors.length > 0 ? `<h2>❌ خطاها</h2><ul>${report.errors.map((e) => `<li>${e}</li>`).join("")}</ul>` : ""}

        ${report.files.length > 0 ? `
        <h2>📦 فایل‌های ایجاد شده</h2>
        <table>
            <tr>
                <th>نام فایل</th>
                <th>حجم</th>
                <th>MD5</th>
            </tr>
            ${report.files
              .map(
                (file) => `
            <tr>
                <td>${file.name}</td>
                <td>${file.sizeMB || (file.size / 1024 / 1024).toFixed(2)} MB</td>
                <td><code>${file.checksum?.md5 || "N/A"}</code></td>
            </tr>
            `
              )
              .join("")}
        </table>
        ` : ""}
    </div>
</body>
</html>
  `;

  const reportPath = path.join(process.cwd(), ".deploy-report.html");
  fs.writeFileSync(reportPath, html, "utf8");
  logSuccess(`گزارش HTML در ${reportPath} ایجاد شد`);
}

function calculateDuration(start, end) {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diff = endTime - startTime;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes} دقیقه و ${seconds} ثانیه`;
}

// ==================== Main ====================

async function main() {
  const args = process.argv.slice(2);
  const options = {
    skipDiagnostics: args.includes("--skip-diagnostics"),
    skipCleanup: args.includes("--skip-cleanup"),
    skipRepair: args.includes("--skip-repair"),
    skipBuild: args.includes("--skip-build"),
    createZip: !args.includes("--no-zip"),
    createReport: !args.includes("--no-report"),
  };

  try {
    await deploySafe(options);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { deploySafe, generateHTMLReport };

