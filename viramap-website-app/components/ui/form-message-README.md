# ماژول پیام‌های فرم (Form Message Module)

یک ماژول مینیمال و زیبا برای نمایش پیام‌های فرم‌ها که با طراحی پروژه هماهنگ است.

## 📦 نصب و راه‌اندازی

### 1. اضافه کردن Provider به Layout

Provider قبلاً به `app/layout.tsx` اضافه شده است. اگر نیاز به تغییر دارید:

```tsx
import { FormMessageProvider } from "@/components/ui/form-message-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FormMessageProvider />
        {/* بقیه کامپوننت‌ها */}
      </body>
    </html>
  );
}
```

## 🚀 استفاده

### روش 1: استفاده از Hook (توصیه می‌شود)

```tsx
import { formMessage } from "@/components/lib/form-message-hook";

// پیام موفقیت
formMessage.success("پیام شما با موفقیت ارسال شد", {
  title: "ارسال موفق",
  duration: 5000,
});

// پیام خطا
formMessage.error("خطا در ارسال پیام", {
  title: "خطا",
  duration: 5000,
});

// پیام هشدار
formMessage.warning("لطفا فیلدها را پر کنید", {
  title: "هشدار",
});

// پیام اطلاعاتی
formMessage.info("در حال پردازش...", {
  title: "اطلاعات",
});
```

### روش 2: استفاده از کامپوننت مستقیم

```tsx
import { FormMessage } from "@/components/ui/form-message";
import { useState } from "react";

function MyForm() {
  const [message, setMessage] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
  } | null>(null);

  return (
    <form>
      {/* فیلدهای فرم */}
      
      {message && (
        <FormMessage
          type={message.type}
          message={message.message}
          title="عنوان پیام"
          onClose={() => setMessage(null)}
          autoClose={true}
          duration={5000}
        />
      )}
    </form>
  );
}
```

## 📝 مثال کامل

### استفاده در فرم تماس

```tsx
"use client";

import { formMessage } from "@/components/lib/form-message-hook";
import { postContactUs } from "@/components/lib/apiFunctions";

export default function ContactForm() {
  const handleSubmit = async (data: FormData) => {
    try {
      const result = await postContactUs({
        form: {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          message: data.get("message"),
        },
      });

      if (result.ok) {
        formMessage.success("پیام شما با موفقیت ارسال شد", {
          title: "ارسال موفق",
        });
      } else {
        formMessage.error(
          result.error?.message || "خطا در ارسال پیام",
          {
            title: "خطا در ارسال",
          }
        );
      }
    } catch (error) {
      formMessage.error("خطای غیرمنتظره رخ داد", {
        title: "خطا",
      });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🎨 انواع پیام‌ها

### Success (موفقیت)
```tsx
formMessage.success("عملیات با موفقیت انجام شد");
```

### Error (خطا)
```tsx
formMessage.error("خطا در انجام عملیات");
```

### Warning (هشدار)
```tsx
formMessage.warning("لطفا فیلدها را پر کنید");
```

### Info (اطلاعات)
```tsx
formMessage.info("در حال پردازش...");
```

## ⚙️ گزینه‌های پیشرفته

### با Action Button

```tsx
formMessage.success("پیام ارسال شد", {
  title: "موفق",
  action: {
    label: "مشاهده",
    onClick: () => {
      // انجام عملیات
    },
  },
});
```

### با مدت زمان سفارشی

```tsx
formMessage.info("این پیام 10 ثانیه نمایش داده می‌شود", {
  duration: 10000,
});
```

### با عنوان

```tsx
formMessage.success("پیام شما ارسال شد", {
  title: "ارسال موفق",
});
```

## 🎨 استایل‌ها

ماژول به صورت خودکار با طراحی پروژه هماهنگ است:
- **پس‌زمینه**: Dark theme با شفافیت
- **Border**: با رنگ‌های متناسب با نوع پیام
- **Font**: از فونت Ravi استفاده می‌کند
- **Animation**: انیمیشن‌های نرم و زیبا

## 📦 Export ها

```tsx
// Hook و Helper functions
import { formMessage, showFormMessage } from "@/components/lib/form-message-hook";

// کامپوننت
import { FormMessage } from "@/components/ui/form-message";

// Provider
import { FormMessageProvider } from "@/components/ui/form-message-provider";

// Types
import type { FormMessageType, FormMessageProps } from "@/components/ui/form-message";
```

## 🔧 سفارشی‌سازی

اگر نیاز به تغییر استایل دارید، می‌توانید فایل‌های زیر را ویرایش کنید:
- `components/ui/form-message.tsx` - کامپوننت اصلی
- `components/lib/form-message-hook.tsx` - Hook و helper functions
- `components/ui/form-message-provider.tsx` - Provider برای toast

## 💡 نکات

1. **Provider را فقط یک بار اضافه کنید** - در `app/layout.tsx`
2. **از `formMessage` برای toast استفاده کنید** - سریع‌تر و راحت‌تر
3. **از `FormMessage` برای نمایش inline استفاده کنید** - در داخل فرم
4. **مدت زمان پیش‌فرض 5 ثانیه است** - می‌توانید تغییر دهید

