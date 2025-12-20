# 🗺️ Viramap Website

وب‌سایت رسمی Viramap - پلتفرم پیشرفته نقشه‌برداری داخلی و راه‌یابی در محیط‌های بسته

[![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

## 📋 فهرست مطالب

- [معرفی](#معرفی)
- [ویژگی‌ها](#ویژگی‌ها)
- [تکنولوژی‌های استفاده شده](#تکنولوژیهای-استفاده-شده)
- [پیش‌نیازها](#پیشنیازها)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [ساختار پروژه](#ساختار-پروژه)
- [اسکریپت‌ها](#اسکریپتها)
- [توسعه](#توسعه)
- [Deployment](#deployment)
- [مشارکت](#مشارکت)
- [لایسنس](#لایسنس)

---

## 🎯 معرفی

Viramap یک پلتفرم جامع برای نقشه‌برداری داخلی و راه‌یابی در محیط‌های بسته مانند مراکز خرید، بیمارستان‌ها، فرودگاه‌ها و ساختمان‌های بزرگ است. این وب‌سایت به عنوان رابط کاربری اصلی برای معرفی محصولات، راه‌حل‌ها و خدمات Viramap طراحی شده است.

### صفحات اصلی:

- 🏠 **صفحه اصلی**: معرفی محصول و ویژگی‌های کلیدی
- 📖 **درباره ما**: اطلاعات شرکت و تیم
- 💼 **راه‌حل‌ها**: راه‌حل‌های مختلف برای صنایع مختلف
- 🛠️ **پلتفرم**: معرفی پلتفرم و قابلیت‌های فنی
- 🔬 **تکنولوژی‌ها**: تکنولوژی‌های استفاده شده
- 📰 **مقالات**: مقالات و اخبار
- 📞 **تماس با ما**: فرم تماس و اطلاعات ارتباطی

---

## ✨ ویژگی‌ها

### 🎨 رابط کاربری
- ✅ طراحی مدرن و واکنش‌گرا (Responsive)
- ✅ پشتیبانی از Dark Mode
- ✅ انیمیشن‌های روان با Framer Motion
- ✅ بهینه‌سازی تصاویر با Next.js Image
- ✅ UI Components با Radix UI

### ⚡ عملکرد
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ بهینه‌سازی خودکار Bundle
- ✅ Code Splitting خودکار
- ✅ فشرده‌سازی و بهینه‌سازی CSS

### 🔍 SEO
- ✅ Meta Tags بهینه
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap.xml خودکار
- ✅ Robots.txt
- ✅ بهینه‌سازی برای موتورهای جستجو

### 🛡️ امنیت
- ✅ TypeScript برای Type Safety
- ✅ Validation با Zod
- ✅ محافظت از فایل‌های حساس
- ✅ Headers امنیتی

---

## 🛠️ تکنولوژی‌های استفاده شده

### Core
- **[Next.js 16.0.5](https://nextjs.org/)** - فریمورک React برای Production
- **[React 19.2.0](https://react.dev/)** - کتابخانه UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type Safety

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS Framework
- **[PostCSS](https://postcss.org/)** - پردازش CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - افزودن Vendor Prefixes

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - کامپوننت‌های دسترسی‌پذیر
- **[Lucide React](https://lucide.dev/)** - آیکون‌ها
- **[Swiper](https://swiperjs.com/)** - Slider/Carousel

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - مدیریت فرم‌ها
- **[Zod](https://zod.dev/)** - Schema Validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers

### Animation
- **[Framer Motion](https://www.framer.com/motion/)** - انیمیشن‌های پیشرفته

### Data Fetching
- **[SWR](https://swr.vercel.app/)** - Data Fetching و Caching

### Other
- **[next-themes](https://github.com/pacocoursey/next-themes)** - مدیریت Theme
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast Notifications
- **[Class Variance Authority](https://cva.style/)** - مدیریت Variants

---

## 📦 پیش‌نیازها

قبل از شروع، مطمئن شوید که نرم‌افزارهای زیر نصب شده‌اند:

- **Node.js**: نسخه 18 یا بالاتر
- **Package Manager**: یکی از موارد زیر
  - [pnpm](https://pnpm.io/) (پیشنهادی)
  - [npm](https://www.npmjs.com/)
  - [yarn](https://yarnpkg.com/)

### بررسی نسخه‌ها:

```bash
node --version  # باید 18.x.x یا بالاتر باشد
pnpm --version  # یا npm --version
```

---

## 🚀 نصب و راه‌اندازی

### 1. کلون کردن پروژه

```bash
git clone https://github.com/your-username/viramap-website-app.git
cd viramap-website-app
```

### 2. نصب Dependencies

```bash
# با pnpm (پیشنهادی)
pnpm install

# یا با npm
npm install

# یا با yarn
yarn install
```

### 3. تنظیم متغیرهای محیطی

فایل `.env.local` را در ریشه پروژه ایجاد کنید:

```bash
cp .env.example .env.local
```

سپس مقادیر مورد نیاز را در `.env.local` تنظیم کنید.

> **نکته**: فایل `.env.local` در `.gitignore` قرار دارد و commit نمی‌شود.

### 4. اجرای پروژه در حالت Development

```bash
# با pnpm
pnpm dev

# یا با npm
npm run dev

# یا با yarn
yarn dev
```

پروژه در آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

---

## 📁 ساختار پروژه

```
viramap-website-app/
├── app/                    # صفحات و Route های Next.js (App Router)
│   ├── about/             # صفحه درباره ما
│   ├── about-us/          # صفحه تماس با ما
│   ├── articles/          # مقالات
│   ├── platform/          # صفحه پلتفرم
│   ├── solutions/         # راه‌حل‌ها
│   ├── technologies/      # تکنولوژی‌ها
│   ├── api/               # API Routes
│   └── page.tsx           # صفحه اصلی
│
├── components/            # کامپوننت‌های React
│   ├── About/            # کامپوننت‌های صفحه درباره ما
│   ├── ContactUs/        # کامپوننت‌های تماس با ما
│   ├── Home/             # کامپوننت‌های صفحه اصلی
│   ├── layout/           # Header و Footer
│   ├── lib/              # توابع و utilities
│   ├── platform/         # کامپوننت‌های پلتفرم
│   ├── solutions/        # کامپوننت‌های راه‌حل‌ها
│   ├── technologies/     # کامپوننت‌های تکنولوژی‌ها
│   └── ui/               # کامپوننت‌های UI پایه
│
├── public/                # فایل‌های استاتیک
│   ├── images/          # تصاویر
│   ├── fonts/           # فونت‌ها
│   └── robots.txt        # فایل robots.txt
│
├── scripts/              # اسکریپت‌های کاربردی
│   ├── deploy.js        # اسکریپت deployment
│   ├── create-zip.js    # اسکریپت ایجاد ZIP
│   └── clean-cache.js   # اسکریپت پاکسازی کش
│
├── services/             # سرویس‌های API
│
├── next.config.ts        # تنظیمات Next.js
├── tsconfig.json         # تنظیمات TypeScript
├── tailwind.config.ts    # تنظیمات Tailwind CSS
├── postcss.config.mjs    # تنظیمات PostCSS
└── package.json         # وابستگی‌های پروژه
```

---

## 📜 اسکریپت‌ها

### Development

```bash
# اجرای پروژه در حالت Development
pnpm dev

# بیلد پروژه برای Production
pnpm build

# اجرای پروژه بیلد شده
pnpm start

# بررسی کد با ESLint
pnpm lint
```

### Maintenance

```bash
# پاکسازی کش‌های بیلد
pnpm clean-cache
```

### Deployment

```bash
# آماده‌سازی برای Deployment
pnpm deploy

# آماده‌سازی و ایجاد فایل ZIP
pnpm deploy:zip
```

برای اطلاعات بیشتر درباره deployment، فایل [DEPLOYMENT.md](./DEPLOYMENT.md) را مطالعه کنید.

---

## 💻 توسعه

### قوانین کدنویسی

- از **TypeScript** برای تمام فایل‌های جدید استفاده کنید
- از **ESLint** برای بررسی کد استفاده کنید
- کامپوننت‌ها را در پوشه `components` قرار دهید
- صفحات را در پوشه `app` قرار دهید (App Router)
- از **Tailwind CSS** برای استایل‌دهی استفاده کنید

### ساخت کامپوننت جدید

```typescript
// components/MyComponent/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-4">
      <h1>{title}</h1>
    </div>
  );
}
```

### ساخت صفحه جدید

```typescript
// app/my-page/page.tsx
import MyComponent from '@/components/MyComponent/MyComponent';

export default function MyPage() {
  return (
    <div>
      <MyComponent title="صفحه جدید" />
    </div>
  );
}
```

### استفاده از API Routes

```typescript
// app/api/my-api/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
```

---

## 🚀 Deployment

### روش سریع

```bash
# آماده‌سازی برای deployment
pnpm deploy
```

این دستور:
- ✅ پروژه را بیلد می‌کند
- ✅ فایل‌های ضروری را جمع‌آوری می‌کند
- ✅ پوشه `deploy` را ایجاد می‌کند
- ✅ مستندات deployment را ایجاد می‌کند

### مستندات کامل

برای راهنمای کامل deployment، فایل‌های زیر را مطالعه کنید:

- 📖 [DEPLOYMENT.md](./DEPLOYMENT.md) - راهنمای جامع
- ⚡ [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) - راهنمای سریع
- 📋 [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - خلاصه

### پلتفرم‌های پیشنهادی

- **[Vercel](https://vercel.com/)** - پیشنهادی برای Next.js
- **[Netlify](https://www.netlify.com/)** - جایگزین خوب
- **سرور شخصی** - با استفاده از اسکریپت‌های deployment

---

## 🤝 مشارکت

مشارکت شما در بهبود این پروژه بسیار ارزشمند است! برای مشارکت:

1. پروژه را Fork کنید
2. یک Branch جدید ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Branch را Push کنید (`git push origin feature/AmazingFeature`)
5. یک Pull Request باز کنید

### دستورالعمل‌های مشارکت

- کد را با ESLint بررسی کنید
- از TypeScript استفاده کنید
- کامنت‌های واضح بنویسید
- تست کنید که همه چیز کار می‌کند

---

## 📄 لایسنس

این پروژه تحت لایسنس [MIT](LICENSE) منتشر شده است.

---

## 📞 تماس با ما

- **وب‌سایت**: [https://viramap.com](https://viramap.com)
- **ایمیل**: info@viramap.com
- **گیت‌هاب**: [@viramap](https://github.com/viramap)

---

## 🙏 تشکر

از تمام کسانی که در ساخت این پروژه مشارکت کرده‌اند، صمیمانه تشکر می‌کنیم.

---

## 📚 منابع مفید

- [مستندات Next.js](https://nextjs.org/docs)
- [مستندات React](https://react.dev/)
- [مستندات TypeScript](https://www.typescriptlang.org/docs/)
- [مستندات Tailwind CSS](https://tailwindcss.com/docs)

---

<div align="center">

**ساخته شده با ❤️ توسط تیم Viramap**

[⬆ بازگشت به بالا](#-viramap-website)

</div>
