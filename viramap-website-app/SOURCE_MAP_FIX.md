# 🔧 راهنمای رفع خطاهای Source Map

## 🎯 مشکل

خطاهای زیر در پروژه Next.js 16.0.5 با Turbopack رخ می‌دهد:

```
Invalid source map. Only conformant source maps can be used
sourceMapURL could not be parsed
```

---

## ✅ راه‌حل‌های اعمال شده

### 1. **تنظیمات Webpack برای Source Maps**

در `next.config.ts` تنظیمات زیر اضافه شده است:

```typescript
webpack: (config, { dev, isServer }) => {
  if (dev && !isServer) {
    // استفاده از eval-source-map که سازگارتر است
    config.devtool = "eval-source-map";
    
    // نادیده گرفتن خطاهای Source Map در node_modules
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules/,
      },
      /Failed to parse source map/,
      /sourceMapURL could not be parsed/,
    ];
  }
  
  // در production، source maps را کاملاً غیرفعال می‌کنیم
  if (!dev) {
    config.devtool = false;
  }
  
  return config;
}
```

### 2. **غیرفعال کردن Source Maps در Production**

```typescript
productionBrowserSourceMaps: false,
```

---

## 🚀 مراحل رفع مشکل

### مرحله 1: پاک کردن Cache

```bash
# پاک کردن cache Next.js
rm -rf .next

# یا استفاده از اسکریپت
pnpm clean-cache
```

### مرحله 2: پاک کردن node_modules (در صورت نیاز)

```bash
rm -rf node_modules
pnpm install
```

### مرحله 3: اجرای مجدد پروژه

#### گزینه 1: استفاده از Webpack (پیشنهادی برای رفع خطا)
```bash
pnpm dev:webpack
```

#### گزینه 2: استفاده از Turbopack
```bash
pnpm dev
```

---

## 🔍 توضیحات

### چرا این خطا رخ می‌دهد؟

1. **Source Maps ناسازگار:** برخی از کتابخانه‌های `node_modules` دارای source maps ناسازگار هستند
2. **مشکلات Turbopack:** Turbopack در Next.js 16 هنوز در حال توسعه است و ممکن است با برخی source maps مشکل داشته باشد
3. **Cache قدیمی:** فایل‌های cache قدیمی ممکن است source maps خراب داشته باشند

### راه‌حل‌های اعمال شده

1. **ignoreWarnings:** خطاهای Source Map در `node_modules` نادیده گرفته می‌شوند
2. **eval-source-map:** استفاده از نوع source map سازگارتر
3. **غیرفعال در Production:** Source maps در production غیرفعال است (امنیت و عملکرد)

---

## 🐛 اگر هنوز خطا دارید

### راه‌حل 1: استفاده از Webpack به جای Turbopack

```bash
# تغییر اسکریپت dev در package.json
"dev": "next dev --webpack"
```

یا استفاده از:
```bash
pnpm dev:webpack
```

### راه‌حل 2: غیرفعال کردن کامل Source Maps در Development

اگر نیازی به source maps در development ندارید، می‌توانید آن‌ها را کاملاً غیرفعال کنید:

```typescript
// در next.config.ts
webpack: (config, { dev, isServer }) => {
  if (dev && !isServer) {
    config.devtool = false; // غیرفعال کردن کامل
  }
  return config;
}
```

### راه‌حل 3: حذف Source Maps از node_modules

اگر خطاها فقط از `node_modules` می‌آیند، می‌توانید source maps را از آن‌ها حذف کنید:

```bash
# نصب tool برای حذف source maps
npm install -g remove-source-map-url

# یا استفاده از script
find node_modules -name "*.map" -type f -delete
```

**⚠️ توجه:** این کار فقط برای development است و نباید در production انجام شود.

---

## 📋 چک‌لیست

پس از اعمال تغییرات، بررسی کنید:

- [ ] Cache پاک شده است (`.next` حذف شده)
- [ ] `next.config.ts` به‌روزرسانی شده است
- [ ] پروژه بدون خطا build می‌شود (`pnpm build`)
- [ ] پروژه بدون خطا در development اجرا می‌شود (`pnpm dev`)

---

## 🎯 خلاصه

| مشکل | راه‌حل | وضعیت |
|------|--------|-------|
| Invalid source map | ignoreWarnings در webpack | ✅ |
| sourceMapURL could not be parsed | استفاده از eval-source-map | ✅ |
| Source maps در node_modules | نادیده گرفتن خطاها | ✅ |
| Source maps در production | غیرفعال کردن | ✅ |

---

## 📞 پشتیبانی

اگر پس از اعمال این تغییرات هنوز خطا دارید:

1. **بررسی لاگ‌ها:** خطاهای دقیق را در console بررسی کنید
2. **استفاده از Webpack:** به جای Turbopack از Webpack استفاده کنید
3. **بررسی Issues:** [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

---

**نکته مهم:** این خطاها معمولاً فقط در development رخ می‌دهند و بر عملکرد production تأثیری ندارند. اگر نیازی به source maps در development ندارید، می‌توانید آن‌ها را کاملاً غیرفعال کنید.

