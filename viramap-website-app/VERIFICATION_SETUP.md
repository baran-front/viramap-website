# 🔐 راهنمای تنظیم کدهای تأیید موتورهای جستجو

## ⚠️ نکته مهم

**اگر با DNS record verify کرده‌اید، نیازی به کد HTML tag در metadata نیست!**

روش DNS برای تأیید مالکیت کل دامنه و زیرمجموعه‌های آن استفاده می‌شود و پس از تأیید، دیگر نیازی به روش‌های دیگر مانند افزودن تگ HTML در کد سایت نیست.

## چرا نیاز است؟

کدهای تأیید HTML tag فقط در صورتی نیاز است که:
- از روش "URL Prefix" برای verify استفاده می‌کنید
- نمی‌توانید DNS record اضافه کنید
- می‌خواهید از روش HTML tag استفاده کنید

## روش‌های تأیید

### روش 1: DNS Record (توصیه می‌شود) ✅

**مزایا:**
- تأیید کل دامنه و زیرمجموعه‌ها
- نیازی به کد در سایت نیست
- یکبار انجام می‌شود

**مراحل:**
1. Google Search Console → Add Property → Domain
2. DNS record را اضافه کنید (TXT record)
3. Yandex Webmaster → Add site → DNS verification
4. DNS record را اضافه کنید

**نتیجه:** نیازی به کد در `app/layout.tsx` نیست!

### روش 2: HTML Tag (اگر DNS ممکن نیست)

**مراحل:**

#### Google Search Console
1. به [Google Search Console](https://search.google.com/search-console) بروید
2. روی "Add Property" کلیک کنید
3. URL سایت خود را وارد کنید (URL Prefix)
4. روش "HTML tag" را انتخاب کنید
5. کد را کپی کنید (مثلاً: `content="abc123xyz"`)
6. در `app/layout.tsx` بخش `verification` را پر کنید

#### Yandex Webmaster
1. به [Yandex Webmaster](https://webmaster.yandex.com) بروید
2. سایت خود را اضافه کنید
3. روش "HTML tag" را انتخاب کنید
4. کد را کپی کنید
5. در `app/layout.tsx` اضافه کنید

### 3. اعمال تغییرات

پس از اضافه کردن کدها:
1. فایل `app/layout.tsx` را ذخیره کنید
2. پروژه را build کنید: `pnpm build`
3. در Search Console روی "Verify" کلیک کنید

## مثال کامل

```typescript
verification: {
  google: "abc123def456ghi789",
  yandex: "xyz789uvw456rst123",
}
```

## نکات مهم

- کدها را در repository commit نکنید (اگر حساس هستند)
- می‌توانید کدها را در متغیرهای محیطی هم قرار دهید
- بعد از verify شدن، می‌توانید کدها را حذف کنید (اختیاری)

