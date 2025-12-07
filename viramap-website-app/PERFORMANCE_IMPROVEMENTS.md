# راهنمای بهبود عملکرد پروژه ویرامپ

این سند شامل نکات و توصیه‌های مهم برای بهبود عملکرد وب‌سایت ویرامپ است.

## 🔴 مشکلات بحرانی (اولویت بالا)

### 1. بهینه‌سازی تصاویر

#### مشکل:

- استفاده از `<img>` به‌جای `next/image` در `IndoorMap.tsx` و `TechnologiesSection3.tsx`
- استفاده از `backgroundImage` در CSS به‌جای `next/image` در اسلایدرها
- عدم استفاده از `loading="lazy"` برای تصاویر غیرضروری

#### راه‌حل:

```tsx
// ❌ بد
<img src="/images/technologies/benefits-diagram.png" />;

// ✅ خوب
import Image from "next/image";
<Image
  src="/images/technologies/benefits-diagram.png"
  alt="..."
  width={900}
  height={400}
  loading="lazy"
  placeholder="blur"
/>;
```

**تأثیر:** کاهش 30-50% حجم بارگذاری اولیه

---

### 2. Dynamic Imports برای کامپوننت‌های بزرگ

#### مشکل:

کامپوننت‌های بزرگ مثل `DynamicSlider` و `SolutionsSlider` همیشه لود می‌شوند.

#### راه‌حل:

```tsx
// ❌ بد
import DynamicSlider from "@/components/Home/DynamicSlider/DynamicSlider";

// ✅ خوب
import dynamic from "next/dynamic";
const DynamicSlider = dynamic(
  () => import("@/components/Home/DynamicSlider/DynamicSlider"),
  {
    loading: () => <div>در حال بارگذاری...</div>,
    ssr: false, // اگر نیاز به SSR ندارید
  }
);
```

**تأثیر:** کاهش 20-40% حجم bundle اولیه

---

### 3. حذف تاخیرهای غیرضروری

#### مشکل:

در `DynamicSlider.tsx` و `SolutionsSlider.tsx` یک `setTimeout` 500ms وجود دارد که فقط برای شبیه‌سازی است.

#### راه‌حل:

```tsx
// ❌ بد
await new Promise((resolve) => setTimeout(resolve, 500));
setSlides(sampleSlides);

// ✅ خوب
// اگر داده‌ها استاتیک هستند، مستقیماً set کنید
setSlides(sampleSlides);

// یا اگر از API می‌آید:
const response = await fetch("/api/slider");
const data = await response.json();
setSlides(data);
```

**تأثیر:** بهبود 500ms در زمان بارگذاری اولیه

---

### 4. استفاده از React.memo

#### مشکل:

کامپوننت‌های `SlideItem` و `SolutionSlide` در هر تغییر state دوباره render می‌شوند.

#### راه‌حل:

```tsx
// ✅ خوب
import { memo } from "react";

const SlideItem = memo(
  ({ slide, isActive }: SlideItemProps) => {
    // ...
  },
  (prevProps, nextProps) => {
    // فقط اگر isActive تغییر کرد، re-render کن
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.slide.id === nextProps.slide.id
    );
  }
);
```

**تأثیر:** کاهش 50-70% re-renders غیرضروری

---

## 🟡 مشکلات متوسط (اولویت متوسط)

### 5. بهینه‌سازی Next.js Config

#### مشکل:

`next.config.ts` خالی است و تنظیمات بهینه‌سازی ندارد.

#### راه‌حل:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  // بهینه‌سازی تصاویر
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // فشرده‌سازی
  compress: true,

  // بهینه‌سازی تولید
  swcMinify: true,

  // بهینه‌سازی bundle
  experimental: {
    optimizeCss: true,
  },
};
```

---

### 6. حذف State غیرضروری

#### مشکل:

در `SolutionsSlider.tsx` متغیر `slideDirection` تعریف شده اما استفاده نمی‌شود.

#### راه‌حل:

```tsx
// ❌ بد
const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

// ✅ خوب
// حذف کنید یا فقط زمانی که نیاز دارید استفاده کنید
```

---

### 7. بهینه‌سازی Font Loading

#### مشکل:

فونت‌های سفارشی (Ravi, Vazirmatn) به صورت کامل لود می‌شوند.

#### راه‌حل:

```tsx
// در layout.tsx
import localFont from "next/font/local";

const vazirmatn = localFont({
  src: [
    {
      path: "/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-vazirmatn",
});
```

---

### 8. استفاده از useMemo و useCallback

#### مشکل:

در `DynamicSlider` و `SolutionsSlider`، توابع و آرایه‌ها در هر render دوباره ساخته می‌شوند.

#### راه‌حل:

```tsx
// ✅ خوب
const sampleSlides = useMemo(() => [
  { id: 1, title: "...", ... },
  // ...
], []);

const nextSlide = useCallback(() => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
}, [slides.length]);
```

---

## 🟢 بهبودهای پیشنهادی (اولویت پایین)

### 9. Code Splitting بهتر

کامپوننت‌های صفحه اصلی را به صورت lazy load کنید:

```tsx
const HeroSection = dynamic(
  () => import("@/components/Home/HeroSection/HeroSection")
);
const IndoorMap = dynamic(
  () => import("@/components/Home/IndoorMap/IndoorMap")
);
```

---

### 10. بهینه‌سازی CSS

- استفاده از CSS Modules به‌جای inline styles در جاهای ممکن
- حذف CSS های غیرضروری
- استفاده از `@layer` در Tailwind برای بهینه‌سازی

---

### 11. استفاده از Service Worker

برای cache کردن assets استاتیک:

```ts
// public/sw.js
self.addEventListener("fetch", (event) => {
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

---

### 12. بهینه‌سازی API Routes

اگر از API routes استفاده می‌کنید:

```ts
// app/api/slider/route.ts
export const revalidate = 3600; // ISR: هر ساعت یکبار

export async function GET() {
  // ...
}
```

---

## 📊 معیارهای عملکرد هدف

پس از اعمال این بهبودها، باید به این اهداف برسید:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s
- **Bundle Size:** کاهش 30-40%

---

## 🛠️ ابزارهای بررسی عملکرد

1. **Lighthouse** (Chrome DevTools)
2. **WebPageTest**
3. **Next.js Bundle Analyzer:**
   ```bash
   npm install @next/bundle-analyzer
   ```

---

## 📝 چک‌لیست بهبود عملکرد

- [ ] تبدیل تمام `<img>` به `next/image`
- [ ] اضافه کردن Dynamic Imports برای کامپوننت‌های بزرگ
- [ ] حذف تاخیرهای غیرضروری
- [ ] استفاده از React.memo برای کامپوننت‌های child
- [ ] بهینه‌سازی next.config.ts
- [ ] حذف state و متغیرهای غیرضروری
- [ ] بهینه‌سازی font loading
- [ ] استفاده از useMemo و useCallback
- [ ] بررسی و بهینه‌سازی bundle size
- [ ] تست عملکرد با Lighthouse

---

**نکته:** این بهبودها را به تدریج اعمال کنید و بعد از هر تغییر، عملکرد را تست کنید.
