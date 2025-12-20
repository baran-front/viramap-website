#!/usr/bin/env node

/**
 * اسکریپت بستن پروسه‌های Next.js در ویندوز
 * این اسکریپت به صورت خودکار تمام پروسه‌های node.exe که مربوط به Next.js هستند را می‌بندد
 */

const { execSync } = require("child_process");
const os = require("os");
const path = require("path");

const isWindows = process.platform === "win32";

console.log("🔍 جستجوی پروسه‌های Next.js...\n");

if (!isWindows) {
  console.log("⚠️  این اسکریپت فقط برای ویندوز طراحی شده است.");
  console.log("💡 برای Linux/Mac از دستور زیر استفاده کنید:");
  console.log("   pkill -f 'next dev'");
  console.log("   یا");
  console.log("   killall node");
  process.exit(1);
}

try {
  // دریافت لیست پروسه‌های node.exe
  const taskListOutput = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', {
    encoding: "utf8",
    stdio: "pipe",
  });

  if (!taskListOutput || taskListOutput.trim().length === 0 || taskListOutput.includes("INFO: No tasks")) {
    console.log("✅ هیچ پروسه Node.js در حال اجرا نیست.");
    process.exit(0);
  }

  // پارس کردن خروجی tasklist
  const lines = taskListOutput.split("\n").filter((line) => line.trim() && !line.startsWith("Image Name"));
  
  if (lines.length === 0) {
    console.log("✅ هیچ پروسه Node.js در حال اجرا نیست.");
    process.exit(0);
  }

  console.log(`📋 پیدا شد ${lines.length} پروسه Node.js:\n`);

  const currentDir = process.cwd();
  let killedCount = 0;

  lines.forEach((line) => {
    if (!line.trim()) return;

    try {
      // پارس کردن CSV
      const parts = line.match(/(?:^|,)(?:"([^"]*)"|([^,]*))/g);
      if (!parts || parts.length < 2) return;

      const pid = parts[1].replace(/"/g, "").trim();
      const imageName = parts[0].replace(/"/g, "").replace(/,/g, "").trim();

      if (!pid || pid === "PID") return;

      // بررسی اینکه آیا این پروسه مربوط به Next.js است
      try {
        // دریافت command line پروسه
        const wmicOutput = execSync(
          `wmic process where "ProcessId=${pid}" get CommandLine /format:csv`,
          { encoding: "utf8", stdio: "pipe" }
        );

        if (
          wmicOutput &&
          (wmicOutput.includes("next") ||
            wmicOutput.includes("next dev") ||
            wmicOutput.includes("next build") ||
            wmicOutput.includes(currentDir))
        ) {
          console.log(`  🔴 بستن پروسه: PID ${pid}`);
          try {
            execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
            console.log(`     ✅ پروسه ${pid} بسته شد`);
            killedCount++;
          } catch (killErr) {
            console.log(`     ⚠️  نتوانست پروسه ${pid} را ببندد: ${killErr.message}`);
          }
        }
      } catch (wmicErr) {
        // اگر wmic کار نکرد، سعی می‌کنیم همه پروسه‌های node را ببندیم (با احتیاط)
        console.log(`  ⚠️  نتوانست اطلاعات پروسه ${pid} را دریافت کند`);
      }
    } catch (parseErr) {
      // خطا در پارس کردن، ادامه می‌دهیم
    }
  });

  if (killedCount === 0) {
    console.log("\n💡 هیچ پروسه Next.js پیدا نشد.");
    console.log("   اگر هنوز خطای EPERM دارید:");
    console.log("   1. تمام terminal های باز را ببندید");
    console.log("   2. Task Manager را باز کنید و پروسه‌های node.exe را دستی ببندید");
    console.log("   3. فایل .next/dev/lock را دستی حذف کنید");
  } else {
    console.log(`\n✅ ${killedCount} پروسه Next.js بسته شد.`);
    console.log("💡 حالا می‌توانید دستور pnpm clean-cache را اجرا کنید.");
  }
} catch (error) {
  console.error("❌ خطا در اجرای اسکریپت:", error.message);
  console.log("\n💡 راه‌حل دستی:");
  console.log("   1. Task Manager را باز کنید (Ctrl+Shift+Esc)");
  console.log("   2. در تب 'Details'، پروسه‌های 'node.exe' را پیدا کنید");
  console.log("   3. پروسه‌هایی که مربوط به Next.js هستند را ببندید");
  console.log("   4. یا از دستور زیر استفاده کنید:");
  console.log("      taskkill /F /IM node.exe");
  process.exit(1);
}

