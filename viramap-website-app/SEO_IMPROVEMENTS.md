# بهبودهای سئو انجام شده

## ✅ تغییرات اعمال شده

### 1. بهبود Metadata در Layout اصلی (`app/layout.tsx`)
- ✅ اضافه شدن metadata کامل شامل title، description، keywords
- ✅ اضافه شدن Open Graph tags برای شبکه‌های اجتماعی
- ✅ اضافه شدن Twitter Card tags
- ✅ اضافه شدن robots meta tags
- ✅ اضافه شدن canonical URLs
- ✅ اضافه شدن Structured Data (JSON-LD) برای Organization

### 2. ایجاد فایل‌های سئو
- ✅ `public/robots.txt` - راهنمای خزنده‌های موتورهای جستجو
- ✅ `app/sitemap.ts` - نقشه سایت خودکار Next.js

### 3. اضافه شدن Metadata به صفحات
- ✅ `app/articles/layout.tsx` - Metadata برای صفحه مقالات
- ✅ `app/solutions/layout.tsx` - Metadata برای صفحه راهکارها
- ✅ `app/technologies/layout.tsx` - Metadata برای صفحه تکنولوژی‌ها
- ✅ `app/platform/page.tsx` - Metadata برای صفحه پلتفرم
- ✅ `app/about/page.tsx` - Metadata برای صفحه درباره ما
- ✅ `app/articles/[id]/layout.tsx` - Metadata داینامیک برای مقالات

### 4. Structured Data (Schema.org)
- ✅ ایجاد کامپوننت `components/lib/structured-data.tsx`
- ✅ اضافه شدن Organization Schema به layout اصلی
- ✅ آماده برای اضافه شدن Article Schema و Breadcrumb Schema

## ⚠️ نکات مهم برای تکمیل

### 1. متغیر محیطی
در فایل `.env.local` یا `.env` متغیر زیر را اضافه کنید:
```env
NEXT_PUBLIC_SITE_URL=https://viramaps.ir
```

### 2. کدهای تأیید موتورهای جستجو
در `app/layout.tsx` بخش `verification` را با کدهای واقعی پر کنید:
```typescript
verification: {
  google: "your-google-verification-code",
  yandex: "your-yandex-verification-code",
  // ...
}
```

### 3. صفحات Client-Side
صفحات زیر هنوز Client-Side هستند و برای سئو بهتر است Server-Side شوند:
- `app/articles/page.tsx` - می‌توانید بخش‌هایی را Server-Side کنید
- `app/articles/[id]/page.tsx` - می‌توانید metadata را از API دریافت کنید
- `app/solutions/[category]/page.tsx` - نیاز به metadata داینامیک دارد

### 4. Structured Data برای مقالات
برای صفحات مقالات، می‌توانید Article Schema را اضافه کنید:
```typescript
import { generateArticleSchema, StructuredData } from "@/components/lib/structured-data";

// در صفحه مقاله
const articleSchema = generateArticleSchema({
  headline: article.title,
  description: article.description,
  image: article.imageUrl,
  datePublished: article.published,
  authorName: article.authorName,
});

<StructuredData data={articleSchema} />
```

### 5. Breadcrumb Schema
برای صفحات داخلی، Breadcrumb Schema اضافه کنید:
```typescript
import { generateBreadcrumbSchema, StructuredData } from "@/components/lib/structured-data";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "خانه", url: "/" },
  { name: "مقالات", url: "/articles" },
  { name: article.title },
]);

<StructuredData data={breadcrumbSchema} />
```

### 6. بهینه‌سازی تصاویر
- ✅ اکثر تصاویر alt text دارند
- ⚠️ بررسی کنید که همه تصاویر مهم alt text مناسب داشته باشند
- ⚠️ از Next.js Image component استفاده می‌شود (خوب است)

### 7. بررسی Heading Hierarchy
- ⚠️ بررسی کنید که در هر صفحه فقط یک `<h1>` وجود داشته باشد
- ⚠️ سلسله‌مراتب heading ها را رعایت کنید (h1 → h2 → h3)

### 8. لینک‌های داخلی
- ✅ از Next.js Link استفاده می‌شود (خوب است)
- ⚠️ اطمینان حاصل کنید که لینک‌های مهم با `<a>` tag هستند نه فقط `<button>`

### 9. سرعت صفحه
- ✅ تصاویر بهینه شده با Next.js Image
- ✅ فشرده‌سازی فعال است
- ⚠️ بررسی کنید که فونت‌ها بهینه شده باشند

### 10. Mobile-First
- ✅ سایت responsive است
- ✅ از Tailwind CSS استفاده می‌شود

## 📊 چک‌لیست نهایی

- [x] Metadata کامل در تمام صفحات
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] robots.txt
- [x] sitemap.xml
- [x] Structured Data (Organization)
- [ ] Structured Data (Article) - برای مقالات
- [ ] Structured Data (Breadcrumb) - برای صفحات داخلی
- [ ] کدهای تأیید موتورهای جستجو
- [ ] متغیر محیطی NEXT_PUBLIC_SITE_URL
- [ ] بررسی Heading Hierarchy
- [ ] بهینه‌سازی بیشتر صفحات Client-Side

## 🔍 ابزارهای تست سئو

پس از اعمال تغییرات، از این ابزارها استفاده کنید:
1. **Google Search Console** - برای بررسی ایندکس شدن
2. **Google Rich Results Test** - برای تست Structured Data
3. **PageSpeed Insights** - برای بررسی سرعت
4. **Lighthouse** - برای بررسی کلی سئو
5. **Schema Markup Validator** - برای تست Schema.org

## 📝 نکات اضافی

1. **محتوا**: اطمینان حاصل کنید که محتوای صفحات کافی و مرتبط است
2. **کلمات کلیدی**: از کلمات کلیدی به صورت طبیعی در محتوا استفاده کنید
3. **لینک‌سازی داخلی**: بین صفحات مرتبط لینک ایجاد کنید
4. **به‌روزرسانی**: محتوا را به‌طور منظم به‌روزرسانی کنید
5. **بک‌لینک**: از سایت‌های معتبر بک‌لینک دریافت کنید

