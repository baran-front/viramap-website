# 🔧 راهنمای جامع رفع خطاهای Runtime - Next.js 16.0.5 با Turbopack

این سند شامل تمام تغییرات و اصلاحات انجام شده برای رفع خطاهای Runtime در پروژه Next.js 16.0.5 با Turbopack است.

---

## 📑 فهرست مطالب

1. [اصلاح وابستگی‌های ناسازگار](#1-اصلاح-وابستگی‌های-ناسازگار)
2. [پیکربندی Turbopack](#2-پیکربندی-turbopack)
3. [اصلاح مرزهای Server/Client Components](#3-اصلاح-مرزهای-serverclient-components)
4. [رفع خطاهای Source Map](#4-رفع-خطاهای-source-map)
5. [مراحل نصب و راه‌اندازی مجدد](#مراحل-نصب-و-راه‌اندازی-مجدد)

---

## ✅ تغییرات اعمال شده

### 1. **اصلاح وابستگی‌های ناسازگار**

#### مشکل: React 19 با Next.js 16.0.5
- **مشکل:** Next.js 16.0.5 به صورت رسمی از React 18 پشتیبانی می‌کند، نه React 19
- **راه‌حل:** نزول به React 18.3.1

```json
// قبل
"react": "19.2.0",
"react-dom": "19.2.0",
"@types/react": "^19",
"@types/react-dom": "^19"

// بعد
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@types/react": "^18.3.18",
"@types/react-dom": "^18.3.5"
```

#### مشکل: Zod نسخه 4.1.13
- **مشکل:** نسخه 4.1.13 وجود ندارد. آخرین نسخه پایدار Zod 3.x است
- **راه‌حل:** استفاده از نسخه پایدار 3.24.1

```json
// قبل
"zod": "^4.1.13"

// بعد
"zod": "^3.24.1"
```

#### مشکل: @hookform/resolvers نسخه 5
- **مشکل:** نسخه 5 با Zod 3 ناسازگار است
- **راه‌حل:** استفاده از نسخه 3.9.1

```json
// قبل
"@hookform/resolvers": "^5.2.2"

// بعد
"@hookform/resolvers": "^3.9.1"
```

---

### 2. **پیکربندی Turbopack**

#### تغییر در package.json
```json
// قبل
"dev": "next dev --webpack"

// بعد
"dev": "next dev --turbopack",
"dev:webpack": "next dev --webpack"  // برای fallback
```

#### تغییر در next.config.ts
```typescript
experimental: {
  optimizeCss: true,
  // پشتیبانی از Turbopack
  turbo: {
    resolveAlias: {
      // در صورت نیاز می‌توانید alias اضافه کنید
    },
  },
}
```

---

### 3. **اصلاح مرزهای Server/Client Components**

#### اضافه کردن "use client" به Hook Files
```typescript
// components/lib/hooks/useArticles.ts
"use client";  // اضافه شد

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
```

**نکته:** تمام کامپوننت‌هایی که از hooks استفاده می‌کنند باید `"use client"` داشته باشند.

---

### 4. **رفع خطاهای Source Map**

#### مشکل: Invalid source map و sourceMapURL parsing errors
- **مشکل:** خطاهای Source Map در development با Turbopack
- **راه‌حل:** تنظیمات webpack برای نادیده گرفتن خطاهای Source Map

```typescript
// در next.config.ts
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

**نکات مهم:**
- این تنظیمات فقط برای Webpack اعمال می‌شود
- برای Turbopack، از `pnpm dev:webpack` استفاده کنید
- خطاهای Source Map معمولاً فقط در development رخ می‌دهند

برای اطلاعات بیشتر، فایل `SOURCE_MAP_FIX.md` را مطالعه کنید.

---

### 5. **رفع خطاهای Permission در ویندوز**

#### مشکل: EPERM: operation not permitted, lstat '.next\dev\lock'
- **مشکل:** فایل lock توسط پروسه Next.js قفل شده است
- **راه‌حل:** بهبود اسکریپت clean-cache و ایجاد اسکریپت kill-next

**اسکریپت‌های جدید:**
```bash
# بستن پروسه‌های Next.js
pnpm kill-next

# پاک کردن cache (با مدیریت خطاهای Permission)
pnpm clean-cache
```

**ویژگی‌های بهبود یافته:**
- ✅ Retry mechanism برای حذف فایل‌های قفل شده
- ✅ حذف خودکار فایل‌های lock
- ✅ تشخیص و بستن پروسه‌های Next.js
- ✅ استفاده از دستورات سیستم عامل در صورت نیاز

**نکات مهم:**
- همیشه قبل از پاک کردن cache، پروسه‌های Next.js را ببندید
- در ویندوز، از `pnpm kill-next` استفاده کنید
- اگر مشکل ادامه داشت، Command Prompt را با Run as Administrator اجرا کنید

برای اطلاعات بیشتر، فایل `WINDOWS_PERMISSION_FIX.md` را مطالعه کنید.

---

## 📋 مراحل نصب و راه‌اندازی مجدد

### مرحله 1: حذف node_modules و lock files
```bash
# حذف node_modules
rm -rf node_modules

# حذف lock files
rm -f pnpm-lock.yaml
# یا اگر از npm استفاده می‌کنید:
rm -f package-lock.json
```

### مرحله 2: نصب مجدد dependencies
```bash
# با pnpm
pnpm install

# یا با npm
npm install
```

### مرحله 3: پاک کردن cache
```bash
# پاک کردن cache Next.js
pnpm clean-cache

# یا دستی
rm -rf .next
```

### مرحله 4: اجرای پروژه
```bash
# با Turbopack (پیشنهادی)
pnpm dev

# یا با Webpack (fallback)
pnpm dev:webpack
```

---

## 🐛 مشکلات رایج و راه‌حل‌ها

### مشکل 1: خطای "Cannot find module 'react'"
**راه‌حل:**
```bash
pnpm install react react-dom
```

### مشکل 2: خطای "Invalid hook call"
**علت:** استفاده از hooks در Server Components
**راه‌حل:** اضافه کردن `"use client"` به ابتدای فایل

### مشکل 3: خطای Zod validation
**علت:** تغییرات API در Zod 3
**راه‌حل:** بررسی schema های Zod و به‌روزرسانی آن‌ها

### مشکل 4: خطای Turbopack در Windows
**راه‌حل:**
```bash
# استفاده از Webpack به عنوان fallback
pnpm dev:webpack
```

### مشکل 5: خطای TypeScript با React 18
**راه‌حل:**
```bash
# نصب مجدد types
pnpm install -D @types/react@^18.3.18 @types/react-dom@^18.3.5
```

### مشکل 6: خطاهای Source Map (Invalid source map, sourceMapURL could not be parsed)
**علت:** Source Maps ناسازگار در node_modules یا مشکلات Turbopack
**راه‌حل:**
```bash
# پاک کردن cache
pnpm clean-cache

# استفاده از Webpack به جای Turbopack (پیشنهادی)
pnpm dev:webpack
```

یا بررسی کنید که تنظیمات `webpack` در `next.config.ts` اعمال شده است. برای اطلاعات بیشتر، فایل `SOURCE_MAP_FIX.md` را مطالعه کنید.

### مشکل 7: خطای Permission در ویندوز (EPERM: operation not permitted)
**علت:** فایل `.next\dev\lock` توسط پروسه Next.js قفل شده است
**راه‌حل:**
```bash
# بستن پروسه‌های Next.js
pnpm kill-next

# پاک کردن cache
pnpm clean-cache
```

یا به صورت دستی:
```cmd
# بستن تمام پروسه‌های node
taskkill /F /IM node.exe

# حذف پوشه .next
rmdir /S /Q ".next"
```

برای اطلاعات بیشتر، فایل `WINDOWS_PERMISSION_FIX.md` را مطالعه کنید.

---

## 🔍 بررسی صحت نصب

### 1. بررسی نسخه‌ها
```bash
# بررسی نسخه React
pnpm list react react-dom

# باید نمایش دهد:
# react@18.3.1
# react-dom@18.3.1
```

### 2. بررسی Zod
```bash
pnpm list zod

# باید نمایش دهد:
# zod@3.24.1
```

### 3. تست Build
```bash
pnpm build
```

اگر build موفق بود، تمام مشکلات برطرف شده‌اند.

---

## 📝 چک‌لیست نهایی

قبل از شروع کار، مطمئن شوید:

- [ ] `node_modules` حذف و نصب مجدد شده است
- [ ] نسخه React 18.3.1 است (نه 19)
- [ ] نسخه Zod 3.24.1 است (نه 4)
- [ ] `"use client"` به تمام فایل‌های hook اضافه شده است
- [ ] `next.config.ts` به‌روزرسانی شده است
- [ ] `package.json` به‌روزرسانی شده است
- [ ] Cache پاک شده است (`.next` حذف شده)
- [ ] Build موفق است (`pnpm build`)

---

## 🚀 بهینه‌سازی‌های اضافی

### 1. استفاده از Dynamic Imports
برای کامپوننت‌های بزرگ:
```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("@/components/HeavyComponent"),
  {
    loading: () => <div>در حال بارگذاری...</div>,
    ssr: false, // اگر نیاز به SSR ندارید
  }
);
```

### 2. بهینه‌سازی Images
همیشه از `next/image` استفاده کنید:
```typescript
import Image from "next/image";

<Image
  src="/images/example.png"
  alt="توضیحات"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 3. استفاده از React.memo
برای کامپوننت‌های پر استفاده:
```typescript
export default React.memo(MyComponent);
```

---

## 📞 پشتیبانی

اگر پس از اعمال این تغییرات هنوز خطا دارید:

1. **بررسی لاگ‌ها:** خطاهای دقیق را در console بررسی کنید
2. **بررسی مستندات:** [Next.js 16 Docs](https://nextjs.org/docs)
3. **بررسی Issues:** [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

---

## 📅 تاریخ به‌روزرسانی

**آخرین به‌روزرسانی:** $(date)
**نسخه Next.js:** 16.0.5
**نسخه React:** 18.3.1
**نسخه Zod:** 3.24.1

---

## ✅ خلاصه تغییرات

| آیتم | قبل | بعد | وضعیت |
|------|-----|-----|-------|
| React | 19.2.0 | 18.3.1 | ✅ |
| React DOM | 19.2.0 | 18.3.1 | ✅ |
| Zod | 4.1.13 | 3.24.1 | ✅ |
| @hookform/resolvers | 5.2.2 | 3.9.1 | ✅ |
| @types/react | ^19 | ^18.3.18 | ✅ |
| @types/react-dom | ^19 | ^18.3.5 | ✅ |
| Dev Script | --webpack | --turbopack | ✅ |
| useArticles Hook | بدون "use client" | با "use client" | ✅ |
| Source Map Errors | بدون راه‌حل | ignoreWarnings + eval-source-map | ✅ |

---

**نکته مهم:** پس از اعمال این تغییرات، حتماً تمام تست‌ها را اجرا کنید و مطمئن شوید که همه چیز به درستی کار می‌کند.

