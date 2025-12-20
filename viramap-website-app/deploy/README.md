# راهنمای Deployment

این پوشه شامل فایل‌های آماده برای deployment روی سرور است.

## مراحل نصب و اجرا:

### 1. آپلود فایل‌ها
فایل‌های این پوشه را روی سرور آپلود کنید.

### 2. نصب Dependencies
```bash
# با pnpm (پیشنهادی)
pnpm install --production

# یا با npm
npm install --production

# یا با yarn
yarn install --production
```

### 3. تنظیم متغیرهای محیطی
فایل `.env.example` را کپی کرده و به `.env.local` تبدیل کنید و مقادیر را تنظیم کنید:
```bash
cp .env.example .env.local
# سپس فایل .env.local را ویرایش کنید
```

### 4. بیلد پروژه (در صورت نیاز)
```bash
# با pnpm
pnpm build

# یا با npm
npm run build
```

### 5. اجرای پروژه
```bash
# با pnpm
pnpm start

# یا با npm
npm start
```

## نکات مهم:

- پورت پیش‌فرض: 3000
- برای تغییر پورت: `PORT=3001 pnpm start` یا `PORT=3001 npm start`
- برای production، از PM2 یا systemd استفاده کنید
- مطمئن شوید Node.js نسخه 18 یا بالاتر نصب است
- اگر از pnpm استفاده می‌کنید، مطمئن شوید pnpm نسخه 8 یا بالاتر نصب است

## بررسی نسخه‌ها:
```bash
node --version   # باید 18+ باشد
pnpm --version   # باید 8+ باشد (اگر از pnpm استفاده می‌کنید)
```

## استفاده با PM2:
```bash
# نصب PM2
npm install -g pm2

# اجرا با pnpm
pm2 start pnpm --name "viramap-website" -- start

# یا با npm
pm2 start npm --name "viramap-website" -- start

pm2 save
pm2 startup
```
