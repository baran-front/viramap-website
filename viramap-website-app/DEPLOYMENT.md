# 📦 راهنمای جامع Deployment پروژه Next.js

این مستند شامل تمام مراحل و نکات مهم برای deployment پروژه Next.js شما روی سرور است.

## 📋 فهرست مطالب

1. [پیش‌نیازها](#پیشنیازها)
2. [استفاده از اسکریپت Deployment](#استفاده-از-اسکریپت-deployment)
3. [مراحل دستی Deployment](#مراحل-دستی-deployment)
4. [تنظیمات سرور](#تنظیمات-سرور)
5. [بهینه‌سازی Performance](#بهینهسازی-performance)
6. [مشکلات رایج و راه‌حل‌ها](#مشکلات-رایج-و-راهحلها)
7. [نکات امنیتی](#نکات-امنیتی)

---

## 🔧 پیش‌نیازها

### نرم‌افزارهای مورد نیاز:

- **Node.js**: نسخه 18 یا بالاتر
- **Package Manager**: pnpm (پیشنهادی)، npm یا yarn
- **سیستم عامل**: Linux (پیشنهادی برای سرور)، Windows Server، یا macOS

### بررسی نسخه‌ها:

```bash
node --version  # باید 18.x.x یا بالاتر باشد
npm --version   # یا pnpm --version
```

---

## 🚀 استفاده از اسکریپت Deployment

### روش سریع (پیشنهادی):

```bash
# اجرای اسکریپت deployment
npm run deploy

# یا با pnpm
pnpm deploy

# یا با yarn
yarn deploy
```

### خروجی اسکریپت:

اسکریپت به صورت خودکار:
- ✅ پروژه را بیلد می‌کند
- ✅ فایل‌های ضروری را جمع‌آوری می‌کند
- ✅ پوشه `deploy` را ایجاد می‌کند
- ✅ فایل‌های غیرضروری را حذف می‌کند
- ✅ مستندات deployment را ایجاد می‌کند

---

## 📁 ساختار پوشه Deploy

پس از اجرای اسکریپت، ساختار زیر ایجاد می‌شود:

```
deploy/
├── .next/              # فایل‌های بیلد شده Next.js
├── app/                # صفحات و route های Next.js
├── components/         # کامپوننت‌های React
├── public/             # فایل‌های استاتیک (تصاویر، فونت‌ها و...)
├── services/           # سرویس‌های API
├── scripts/            # اسکریپت‌های کاربردی
├── package.json        # وابستگی‌های پروژه
├── next.config.ts      # تنظیمات Next.js
├── tsconfig.json       # تنظیمات TypeScript
├── .env.example        # نمونه فایل متغیرهای محیطی
├── .gitignore          # فایل‌های نادیده گرفته شده
├── .dockerignore       # فایل‌های نادیده گرفته شده برای Docker
└── README.md           # راهنمای نصب و اجرا
```

---

## 🛠️ مراحل دستی Deployment

اگر می‌خواهید به صورت دستی deploy کنید:

### 1. بیلد پروژه

```bash
# نصب dependencies
pnpm install

# بیلد پروژه
pnpm build
```

### 2. بررسی خطاهای بیلد

```bash
# بررسی lint
pnpm lint

# بررسی TypeScript
pnpm type-check  # اگر در package.json تعریف شده باشد
```

### 3. آماده‌سازی فایل‌ها

فایل‌های زیر را برای سرور آماده کنید:
- پوشه `.next`
- پوشه `public`
- پوشه `app`
- پوشه `components`
- پوشه `services`
- فایل `package.json`
- فایل `next.config.ts`
- فایل `tsconfig.json`
- فایل `postcss.config.mjs`

---

## 🖥️ تنظیمات سرور

### نصب و راه‌اندازی اولیه:

```bash
# 1. آپلود فایل‌ها به سرور
scp -r deploy/* user@server:/path/to/app

# 2. اتصال به سرور
ssh user@server

# 3. رفتن به پوشه پروژه
cd /path/to/app

# 4. نصب dependencies
pnpm install --production

# 5. تنظیم متغیرهای محیطی
cp .env.example .env.local
nano .env.local  # ویرایش مقادیر

# 6. بیلد (در صورت نیاز)
pnpm build

# 7. اجرای پروژه
pnpm start
```

### استفاده از PM2 (پیشنهادی):

PM2 یک process manager است که برای اجرای Node.js در production استفاده می‌شود.

```bash
# نصب PM2
npm install -g pm2

# اجرای پروژه با PM2
pm2 start npm --name "viramap-website" -- start

# ذخیره تنظیمات
pm2 save

# تنظیم برای اجرای خودکار پس از راه‌اندازی مجدد
pm2 startup
pm2 save

# دستورات مفید PM2
pm2 list              # لیست پروسه‌ها
pm2 logs              # مشاهده لاگ‌ها
pm2 restart all       # راه‌اندازی مجدد همه
pm2 stop all          # توقف همه
pm2 delete all        # حذف همه
```

### استفاده با Systemd (Linux):

ایجاد فایل سرویس:

```bash
sudo nano /etc/systemd/system/viramap-website.service
```

محتوای فایل:

```ini
[Unit]
Description=Viramap Website Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/app
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node /path/to/app/node_modules/.bin/next start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

فعال‌سازی سرویس:

```bash
sudo systemctl daemon-reload
sudo systemctl enable viramap-website
sudo systemctl start viramap-website
sudo systemctl status viramap-website
```

### استفاده با Nginx (Reverse Proxy):

تنظیمات Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## ⚡ بهینه‌سازی Performance

### 1. فعال‌سازی Compression:

در `next.config.ts`:
```typescript
compress: true,  // از قبل فعال است
```

### 2. بهینه‌سازی تصاویر:

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  // ...
}
```

### 3. Cache Headers:

برای فایل‌های استاتیک در `next.config.ts` تنظیم شده است.

### 4. استفاده از CDN:

برای فایل‌های استاتیک از CDN استفاده کنید:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

---

## 🐛 مشکلات رایج و راه‌حل‌ها

### مشکل 1: خطای "Module not found"

**راه‌حل:**
```bash
# حذف node_modules و نصب مجدد
rm -rf node_modules
pnpm install
```

### مشکل 2: خطای "Port already in use"

**راه‌حل:**
```bash
# تغییر پورت
PORT=3001 pnpm start

# یا پیدا کردن و بستن پروسه
lsof -ti:3000 | xargs kill -9
```

### مشکل 3: خطای Memory Limit

**راه‌حل:**
```bash
# افزایش memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

### مشکل 4: خطای "ENOENT" در بیلد

**راه‌حل:**
- بررسی وجود تمام فایل‌های ضروری
- بررسی مسیرهای نسبی در کد
- اجرای `pnpm clean-cache` و بیلد مجدد

### مشکل 5: کند بودن بیلد

**راه‌حل:**
- استفاده از `SWC` (به صورت پیش‌فرض فعال است)
- فعال‌سازی `experimental.optimizeCss`
- استفاده از `standalone` output mode (در صورت نیاز)

---

## 🔒 نکات امنیتی

### 1. متغیرهای محیطی:

- ❌ **هرگز** فایل `.env.local` را commit نکنید
- ✅ از `.env.example` برای مستندسازی استفاده کنید
- ✅ از سرویس‌های مدیریت secrets استفاده کنید (AWS Secrets Manager، HashiCorp Vault)

### 2. فایل‌های حساس:

- حذف فایل‌های `.env*.local` از پوشه deploy
- حذف فایل‌های `.git` و `.gitignore`
- بررسی فایل‌های `*.log` و `*.pem`

### 3. Headers امنیتی:

در `next.config.ts` اضافه کنید:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

### 4. HTTPS:

- استفاده از SSL/TLS certificate
- هدایت HTTP به HTTPS
- استفاده از HSTS headers

---

## 📊 مانیتورینگ

### لاگ‌ها:

```bash
# با PM2
pm2 logs viramap-website

# با Systemd
journalctl -u viramap-website -f
```

### بررسی Performance:

- استفاده از Next.js Analytics
- استفاده از Google Analytics
- مانیتورینگ با PM2 Plus یا New Relic

---

## 🔄 به‌روزرسانی

### مراحل به‌روزرسانی:

1. بکاپ از فایل‌های فعلی
2. آپلود فایل‌های جدید
3. نصب dependencies جدید
4. بیلد مجدد
5. راه‌اندازی مجدد سرویس

```bash
# با PM2
pm2 restart viramap-website

# با Systemd
sudo systemctl restart viramap-website
```

---

## 📞 پشتیبانی

در صورت بروز مشکل:
1. بررسی لاگ‌ها
2. بررسی مستندات Next.js
3. بررسی Issues در GitHub

---

## ✅ چک‌لیست نهایی

قبل از deployment نهایی، موارد زیر را بررسی کنید:

- [ ] تمام متغیرهای محیطی تنظیم شده‌اند
- [ ] فایل‌های حساس حذف شده‌اند
- [ ] بیلد بدون خطا انجام شده است
- [ ] تست‌های عملکردی انجام شده است
- [ ] SSL/TLS فعال است
- [ ] Backup گرفته شده است
- [ ] مانیتورینگ تنظیم شده است
- [ ] مستندات به‌روز است

---

**آخرین به‌روزرسانی:** $(date)

**نسخه:** 1.0.0

