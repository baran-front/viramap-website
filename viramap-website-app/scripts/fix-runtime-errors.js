#!/usr/bin/env node

/**
 * اسکریپت رفع خطاهای Runtime
 * این اسکریپت به صورت خودکار تمام مراحل لازم برای رفع خطاها را انجام می‌دهد
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔧 شروع رفع خطاهای Runtime...\n");

// رنگ‌ها برای console
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, description) {
  try {
    log(`⏳ ${description}...`, "blue");
    execSync(command, { stdio: "inherit" });
    log(`✅ ${description} - موفق`, "green");
    return true;
  } catch (error) {
    log(`❌ ${description} - خطا: ${error.message}`, "red");
    return false;
  }
}

// بررسی وجود package.json
if (!fs.existsSync("package.json")) {
  log("❌ فایل package.json یافت نشد!", "red");
  process.exit(1);
}

// مرحله 1: حذف node_modules
log("\n📦 مرحله 1: حذف node_modules و cache...", "yellow");
if (fs.existsSync("node_modules")) {
  exec("rm -rf node_modules", "حذف node_modules");
} else {
  log("ℹ️  node_modules وجود ندارد", "blue");
}

// حذف .next
if (fs.existsSync(".next")) {
  exec("rm -rf .next", "حذف .next cache");
} else {
  log("ℹ️  .next وجود ندارد", "blue");
}

// حذف lock files
const lockFiles = ["pnpm-lock.yaml", "package-lock.json", "yarn.lock"];
lockFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    log(`✅ حذف ${file}`, "green");
  }
});

// مرحله 2: نصب dependencies
log("\n📥 مرحله 2: نصب dependencies...", "yellow");

// تشخیص package manager
let packageManager = "npm";
if (fs.existsSync("pnpm-lock.yaml")) {
  packageManager = "pnpm";
} else if (fs.existsSync("yarn.lock")) {
  packageManager = "yarn";
}

log(`📦 استفاده از ${packageManager}`, "blue");

if (packageManager === "pnpm") {
  exec("pnpm install", "نصب dependencies با pnpm");
} else if (packageManager === "yarn") {
  exec("yarn install", "نصب dependencies با yarn");
} else {
  exec("npm install", "نصب dependencies با npm");
}

// مرحله 3: بررسی نسخه‌ها
log("\n🔍 مرحله 3: بررسی نسخه‌های نصب شده...", "yellow");

try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const deps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};

  log("\n📋 نسخه‌های نصب شده:", "blue");
  
  if (deps.react) {
    const version = deps.react.replace("^", "").replace("~", "");
    if (version.startsWith("18")) {
      log(`  ✅ React: ${deps.react}`, "green");
    } else {
      log(`  ⚠️  React: ${deps.react} (باید 18.x باشد)`, "yellow");
    }
  }

  if (deps.zod) {
    const version = deps.zod.replace("^", "").replace("~", "");
    if (version.startsWith("3")) {
      log(`  ✅ Zod: ${deps.zod}`, "green");
    } else {
      log(`  ⚠️  Zod: ${deps.zod} (باید 3.x باشد)`, "yellow");
    }
  }

  if (deps.next) {
    log(`  ✅ Next.js: ${deps.next}`, "green");
  }
} catch (error) {
  log(`  ⚠️  خطا در خواندن package.json: ${error.message}`, "yellow");
}

// مرحله 4: تست build
log("\n🏗️  مرحله 4: تست build...", "yellow");
const buildSuccess = exec("npm run build", "تست build");

if (buildSuccess) {
  log("\n✅ تمام مراحل با موفقیت انجام شد!", "green");
  log("\n📝 مراحل بعدی:", "blue");
  log("  1. اجرای پروژه: npm run dev", "blue");
  log("  2. بررسی خطاها در console", "blue");
  log("  3. در صورت نیاز، فایل RUNTIME_ERRORS_FIX.md را مطالعه کنید", "blue");
} else {
  log("\n⚠️  Build با خطا مواجه شد. لطفاً خطاها را بررسی کنید.", "yellow");
  log("  برای اطلاعات بیشتر، فایل RUNTIME_ERRORS_FIX.md را مطالعه کنید.", "blue");
}

log("\n✨ تمام!", "green");

