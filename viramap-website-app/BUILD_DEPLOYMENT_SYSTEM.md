# 🚀 سیستم جامع Build و Deployment

این سند راهنمای استفاده از سیستم جامع Build و Deployment است که شامل تمام فازهای مورد نیاز می‌شود.

---

## 📋 فهرست مطالب

1. [فاز 1: تشخیص و آنالیز](#فاز-1-تشخیص-و-آنالیز)
2. [فاز 2: پاکسازی ایمن](#فاز-2-پاکسازی-ایمن)
3. [فاز 3: ترمیم پروژه](#فاز-3-ترمیم-پروژه)
4. [فاز 4: Build بهینه‌شده](#فاز-4-build-بهینه‌شده)
5. [فاز 5: Deployment امن](#فاز-5-deployment-امن)
6. [فاز 6: Monitoring و Logging](#فاز-6-monitoring-و-logging)

---

## 🔍 فاز 1: تشخیص و آنالیز

### استفاده از سیستم تشخیصی

```bash
# اجرای سیستم تشخیصی جامع
pnpm diagnostics
```

این دستور بررسی می‌کند:
- ✅ وضعیت سیستم (OS, Node.js, npm/pnpm/yarn)
- ✅ وضعیت پروژه (package.json, config files)
- ✅ پروسه‌های در حال اجرا
- ✅ فایل‌های قفل شده
- ✅ فضای دیسک و Memory
- ✅ لاگ‌های اخیر

**خروجی:**
- گزارش در console
- فایل `.diagnostics-report.json` با جزئیات کامل

---

## 🧹 فاز 2: پاکسازی ایمن

### استفاده از سیستم پاکسازی چندلایه

```bash
# پاکسازی پیش‌فرض (.next, .turbo, node_modules/.cache, out)
pnpm safe-cleanup

# پاکسازی فایل‌های خاص
pnpm safe-cleanup .next .turbo custom-folder

# با ایجاد backup
CLEANUP_BACKUP=true pnpm safe-cleanup

# با فعال‌سازی rollback
CLEANUP_ROLLBACK=true CLEANUP_BACKUP=true pnpm safe-cleanup
```

### لایه‌های پاکسازی

1. **لایه 1: Graceful Shutdown**
   - توقف graceful پروسه‌های Next.js
   - انتظار 3 ثانیه برای shutdown

2. **لایه 2: Retry با Exponential Backoff**
   - تلاش برای حذف با retry (5 بار)
   - Exponential backoff: 100ms, 200ms, 400ms, 800ms, 1600ms

3. **لایه 3: دستورات سیستمی**
   - Windows: `rmdir /s /q`
   - Linux/Mac: `rm -rf`

4. **لایه 4: Manual Intervention**
   - گزارش دقیق فایل‌های ناموفق
   - راه‌حل‌های پیشنهادی
   - ذخیره در `.cleanup-failed.json`

5. **لایه 5: Rollback**
   - بازگردانی از backup (در صورت نیاز)

---

## 🔧 فاز 3: ترمیم پروژه

### استفاده از سیستم ترمیم

```bash
# اجرای سیستم ترمیم
pnpm repair
```

این دستور انجام می‌دهد:
- ✅ تعمیر dependencies شکسته (React 19→18, Zod 4→3, etc.)
- ✅ Fix کردن configuration files
- ✅ ایجاد backup قبل از هر تغییر
- ✅ اعتبارسنجی بعد از هر مرحله

**ویژگی‌ها:**
- ایجاد backup خودکار
- بازگردانی در صورت خطا
- اعتبارسنجی کامل

---

## 🏗️ فاز 4: Build بهینه‌شده

### Build با تنظیمات بهینه

```bash
# Build عادی
pnpm build

# Build با memory management
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Build با parallel processing
NEXT_BUILD_PARALLEL=4 pnpm build
```

### تنظیمات Build در next.config.ts

```typescript
// تنظیمات بهینه برای Build
const nextConfig = {
  // فشرده‌سازی
  compress: true,
  
  // غیرفعال کردن source maps در production
  productionBrowserSourceMaps: false,
  
  // بهینه‌سازی CSS
  experimental: {
    optimizeCss: true,
  },
  
  // Memory management
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // محدود کردن memory در production build
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }
    return config;
  },
};
```

---

## 📦 فاز 5: Deployment امن

### استفاده از سیستم Deployment

```bash
# Deployment عادی
pnpm deploy

# Deployment با ZIP
pnpm deploy:zip

# Deployment ایمن (با checksum و validation)
pnpm deploy:safe
```

### ویژگی‌های Deployment

1. **ایجاد فایل ZIP با Checksum**
   - MD5 checksum برای فایل ZIP
   - SHA256 برای امنیت بیشتر

2. **Exclude فایل‌های حساس**
   - `.env*.local`
   - `node_modules`
   - `.git`
   - فایل‌های cache

3. **Documentation برای سرور**
   - `README.md` در پوشه deploy
   - `.env.example`
   - دستورات نصب و اجرا

4. **Health Check Scripts**
   - بررسی وجود فایل‌های ضروری
   - بررسی version ها
   - تست build

---

## 📊 فاز 6: Monitoring و Logging

### سیستم لاگ‌گیری

```bash
# مشاهده لاگ‌های اخیر
cat .next/trace

# مشاهده لاگ‌های build
cat turbo-build.log

# مشاهده لاگ‌های deployment
cat .deploy.log
```

### گزارش HTML

پس از اجرای `pnpm deploy:safe`، یک گزارش HTML در `.deploy-report.html` ایجاد می‌شود که شامل:
- ✅ وضعیت Build
- ✅ فایل‌های ایجاد شده
- ✅ Checksum ها
- ✅ حجم فایل‌ها
- ✅ خطاها و هشدارها

---

## 🚀 Workflow کامل

### Workflow پیشنهادی برای Build و Deployment

```bash
# 1. تشخیص مشکلات
pnpm diagnostics

# 2. پاکسازی ایمن
pnpm safe-cleanup

# 3. ترمیم پروژه
pnpm repair

# 4. Build
pnpm build

# 5. Deployment
pnpm deploy:safe
```

### Workflow سریع

```bash
# همه چیز در یک دستور (در حال توسعه)
pnpm deploy:full
```

---

## 🐛 عیب‌یابی

### مشکل: Build شکست می‌خورد

```bash
# 1. بررسی مشکلات
pnpm diagnostics

# 2. پاکسازی
pnpm safe-cleanup

# 3. ترمیم
pnpm repair

# 4. Build مجدد
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

### مشکل: فایل ZIP ایجاد نمی‌شود

```bash
# 1. بررسی فضای دیسک
pnpm diagnostics

# 2. بررسی فایل‌های قفل شده
pnpm diagnostics | grep "locked"

# 3. پاکسازی
pnpm safe-cleanup

# 4. ایجاد مجدد ZIP
pnpm deploy:zip
```

### مشکل: Cache های قدیمی

```bash
# پاکسازی کامل cache
pnpm safe-cleanup .next .turbo node_modules/.cache

# یا استفاده از clean-cache
pnpm clean-cache
```

---

## 📝 فایل‌های ایجاد شده

### فایل‌های گزارش

- `.diagnostics-report.json` - گزارش تشخیصی
- `.cleanup-failed.json` - فایل‌های ناموفق در پاکسازی
- `.deploy-report.html` - گزارش HTML deployment
- `.deploy.log` - لاگ deployment

### فایل‌های Backup

- `.backup/` - پوشه backup ها
- `.backup/*.bak` - فایل‌های backup

---

## ✅ چک‌لیست Deployment

قبل از Deployment:

- [ ] `pnpm diagnostics` بدون خطای بحرانی
- [ ] `pnpm safe-cleanup` موفق
- [ ] `pnpm repair` موفق
- [ ] `pnpm build` موفق
- [ ] فایل ZIP ایجاد شده
- [ ] Checksum بررسی شده
- [ ] Documentation موجود است

---

## 🔒 امنیت

### فایل‌های Exclude شده

- `.env*.local` - متغیرهای محیطی حساس
- `node_modules` - dependencies (باید در سرور نصب شوند)
- `.git` - تاریخچه Git
- `.next/cache` - cache files
- فایل‌های `.log`

### Checksum

هر فایل ZIP شامل:
- MD5 checksum
- SHA256 checksum
- حجم فایل
- تاریخ ایجاد

---

## 📞 پشتیبانی

اگر مشکلی دارید:

1. **اجرای diagnostics**: `pnpm diagnostics`
2. **بررسی لاگ‌ها**: فایل‌های `.log` و `.json`
3. **بررسی گزارش HTML**: `.deploy-report.html`

---

**نکته مهم:** این سیستم به صورت تدریجی در حال توسعه است. برای استفاده از تمام ویژگی‌ها، مطمئن شوید که تمام اسکریپت‌ها به‌روز هستند.

