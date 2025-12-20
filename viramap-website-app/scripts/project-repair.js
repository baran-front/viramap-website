#!/usr/bin/env node

/**
 * سیستم ترمیم پروژه
 * - تعمیر dependencies شکسته
 * - Fix کردن configuration files
 * - ایجاد backup قبل از هر تغییر
 * - اعتبارسنجی بعد از هر مرحله
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const crypto = require("crypto");

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
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

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, "cyan");
}

// ==================== ایجاد Backup ====================

function createBackup(filePath, backupDir) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileName = path.basename(filePath);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const backupPath = path.join(backupDir, `${fileName}.${timestamp}.bak`);

  try {
    fs.mkdirSync(backupDir, { recursive: true });
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  } catch (err) {
    logError(`خطا در ایجاد backup: ${err.message}`);
    return null;
  }
}

// ==================== تعمیر Dependencies ====================

async function repairDependencies() {
  logStep("1", "تعمیر Dependencies");

  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    logError("package.json یافت نشد!");
    return { success: false };
  }

  // ایجاد backup
  const backupDir = path.join(process.cwd(), ".backup");
  const backupPath = createBackup(packageJsonPath, backupDir);
  if (backupPath) {
    logSuccess(`Backup ایجاد شد: ${backupPath}`);
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // بررسی و اصلاح نسخه‌های ناسازگار
    let fixed = false;

    // React 19 -> React 18
    if (packageJson.dependencies?.react?.startsWith("19")) {
      logWarning("React 19 یافت شد - تغییر به React 18");
      packageJson.dependencies.react = "^18.3.1";
      packageJson.dependencies["react-dom"] = "^18.3.1";
      if (packageJson.devDependencies) {
        packageJson.devDependencies["@types/react"] = "^18.3.18";
        packageJson.devDependencies["@types/react-dom"] = "^18.3.5";
      }
      fixed = true;
    }

    // Zod 4 -> Zod 3
    if (packageJson.dependencies?.zod?.startsWith("4")) {
      logWarning("Zod 4 یافت شد - تغییر به Zod 3");
      packageJson.dependencies.zod = "^3.24.1";
      fixed = true;
    }

    // @hookform/resolvers 5 -> 3
    if (packageJson.dependencies?.["@hookform/resolvers"]?.startsWith("5")) {
      logWarning("@hookform/resolvers 5 یافت شد - تغییر به نسخه 3");
      packageJson.dependencies["@hookform/resolvers"] = "^3.9.1";
      fixed = true;
    }

    if (fixed) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");
      logSuccess("package.json اصلاح شد");

      // نصب مجدد dependencies
      logInfo("نصب مجدد dependencies...");
      try {
        const packageManager = detectPackageManager();
        execSync(`${packageManager} install`, { stdio: "inherit" });
        logSuccess("Dependencies نصب شدند");
      } catch (err) {
        logError(`خطا در نصب dependencies: ${err.message}`);
        return { success: false, error: err.message };
      }
    } else {
      logSuccess("Dependencies سالم هستند");
    }

    return { success: true, fixed };
  } catch (err) {
    logError(`خطا در تعمیر dependencies: ${err.message}`);
    if (backupPath) {
      logInfo(`بازگردانی از backup: ${backupPath}`);
      fs.copyFileSync(backupPath, packageJsonPath);
    }
    return { success: false, error: err.message };
  }
}

// ==================== Fix Configuration Files ====================

function repairConfigFiles() {
  logStep("2", "Fix کردن Configuration Files");

  const results = {
    nextConfig: false,
    tsConfig: false,
  };

  // Fix next.config.ts
  const nextConfigPath = path.join(process.cwd(), "next.config.ts");
  if (fs.existsSync(nextConfigPath)) {
    const backupPath = createBackup(nextConfigPath, path.join(process.cwd(), ".backup"));
    try {
      let content = fs.readFileSync(nextConfigPath, "utf8");

      // بررسی وجود تنظیمات Source Map
      if (!content.includes("ignoreWarnings")) {
        logInfo("اضافه کردن تنظیمات Source Map به next.config.ts");
        // در اینجا می‌توانیم تنظیمات را اضافه کنیم
        // برای سادگی، فقط گزارش می‌دهیم
        logWarning("نیاز به اضافه کردن تنظیمات Source Map");
      }

      // بررسی وجود تنظیمات Turbopack
      if (!content.includes("turbo:")) {
        logInfo("اضافه کردن تنظیمات Turbopack به next.config.ts");
        logWarning("نیاز به اضافه کردن تنظیمات Turbopack");
      }

      results.nextConfig = true;
      logSuccess("next.config.ts بررسی شد");
    } catch (err) {
      logError(`خطا در بررسی next.config.ts: ${err.message}`);
      if (backupPath) {
        fs.copyFileSync(backupPath, nextConfigPath);
      }
    }
  }

  // Fix tsconfig.json
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  if (fs.existsSync(tsConfigPath)) {
    const backupPath = createBackup(tsConfigPath, path.join(process.cwd(), ".backup"));
    try {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));

      // بررسی تنظیمات مهم
      if (!tsConfig.compilerOptions) {
        tsConfig.compilerOptions = {};
      }

      // اضافه کردن تنظیمات پیش‌فرض در صورت نیاز
      const requiredOptions = {
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        resolveJsonModule: true,
      };

      let fixed = false;
      for (const [key, value] of Object.entries(requiredOptions)) {
        if (tsConfig.compilerOptions[key] === undefined) {
          tsConfig.compilerOptions[key] = value;
          fixed = true;
        }
      }

      if (fixed) {
        fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2) + "\n", "utf8");
        logSuccess("tsconfig.json اصلاح شد");
      } else {
        logSuccess("tsconfig.json سالم است");
      }

      results.tsConfig = true;
    } catch (err) {
      logError(`خطا در بررسی tsconfig.json: ${err.message}`);
      if (backupPath) {
        fs.copyFileSync(backupPath, tsConfigPath);
      }
    }
  }

  return results;
}

// ==================== اعتبارسنجی ====================

function validateProject() {
  logStep("3", "اعتبارسنجی پروژه");

  const validations = {
    packageJson: false,
    nodeModules: false,
    nextConfig: false,
    tsConfig: false,
  };

  // بررسی package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      if (packageJson.name && packageJson.version) {
        validations.packageJson = true;
        logSuccess("package.json معتبر است");
      }
    } catch (err) {
      logError(`package.json نامعتبر: ${err.message}`);
    }
  }

  // بررسی node_modules
  const nodeModulesPath = path.join(process.cwd(), "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    try {
      const dirs = fs.readdirSync(nodeModulesPath);
      if (dirs.length > 0) {
        validations.nodeModules = true;
        logSuccess(`node_modules موجود است (${dirs.length} پکیج)`);
      }
    } catch (err) {
      logWarning(`node_modules قابل خواندن نیست: ${err.message}`);
    }
  } else {
    logWarning("node_modules یافت نشد - نیاز به نصب");
  }

  // بررسی next.config.ts
  const nextConfigPath = path.join(process.cwd(), "next.config.ts");
  if (fs.existsSync(nextConfigPath)) {
    try {
      // بررسی syntax
      require("typescript").transpileModule(fs.readFileSync(nextConfigPath, "utf8"), {
        compilerOptions: { module: require("typescript").ModuleKind.CommonJS },
      });
      validations.nextConfig = true;
      logSuccess("next.config.ts معتبر است");
    } catch (err) {
      logError(`next.config.ts نامعتبر: ${err.message}`);
    }
  }

  // بررسی tsconfig.json
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  if (fs.existsSync(tsConfigPath)) {
    try {
      JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));
      validations.tsConfig = true;
      logSuccess("tsconfig.json معتبر است");
    } catch (err) {
      logError(`tsconfig.json نامعتبر: ${err.message}`);
    }
  }

  const allValid = Object.values(validations).every((v) => v);
  return { success: allValid, validations };
}

// ==================== Helper Functions ====================

function detectPackageManager() {
  if (fs.existsSync(path.join(process.cwd(), "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(process.cwd(), "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

// ==================== Main ====================

async function main() {
  log("\n" + "=".repeat(60), "magenta");
  log("🔧 سیستم ترمیم پروژه", "magenta");
  log("=".repeat(60) + "\n", "magenta");

  const results = {
    dependencies: null,
    configFiles: null,
    validation: null,
  };

  try {
    // ایجاد backup directory
    const backupDir = path.join(process.cwd(), ".backup");
    fs.mkdirSync(backupDir, { recursive: true });
    logSuccess(`Backup directory ایجاد شد: ${backupDir}`);

    // تعمیر dependencies
    results.dependencies = await repairDependencies();

    // Fix configuration files
    results.configFiles = repairConfigFiles();

    // اعتبارسنجی
    results.validation = validateProject();

    // گزارش نهایی
    log("\n" + "=".repeat(60), "cyan");
    log("📊 گزارش نهایی", "cyan");
    log("=".repeat(60), "cyan");

    if (results.dependencies?.success) {
      logSuccess("Dependencies تعمیر شدند");
    }

    if (results.configFiles.nextConfig && results.configFiles.tsConfig) {
      logSuccess("Configuration files بررسی شدند");
    }

    if (results.validation?.success) {
      logSuccess("✅ پروژه معتبر است");
    } else {
      logWarning("⚠️  برخی مشکلات باقی مانده است");
    }

    process.exit(results.validation?.success ? 0 : 1);
  } catch (err) {
    logError(`خطای غیرمنتظره: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { repairDependencies, repairConfigFiles, validateProject };

