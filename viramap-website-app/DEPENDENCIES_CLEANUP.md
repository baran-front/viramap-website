# حذف Dependencies غیرضروری

## Dependencies شناسایی شده برای حذف

### 1. `openai` (^6.14.0)
- **وضعیت:** استفاده نمی‌شود
- **حجم:** ~500KB
- **دستور حذف:**
  ```bash
  pnpm remove openai
  ```

### 2. `framer-motion` (^12.23.25)
- **وضعیت:** استفاده نمی‌شود (بررسی شده)
- **حجم:** ~200KB
- **دستور حذف:**
  ```bash
  pnpm remove framer-motion
  ```

### 3. `swiper` (^12.0.3)
- **وضعیت:** استفاده نمی‌شود (بررسی شده)
- **حجم:** ~150KB
- **دستور حذف:**
  ```bash
  pnpm remove swiper
  ```

## دستور کامل برای حذف همه:

```bash
pnpm remove openai framer-motion swiper
```

## تأثیر:
- کاهش ~850KB از حجم node_modules
- کاهش حجم bundle (اگر در production استفاده می‌شدند)
- بهبود سرعت نصب dependencies

## ⚠️ نکته مهم:
قبل از حذف، مطمئن شوید که این dependencies در هیچ جایی استفاده نمی‌شوند:
- بررسی import statements
- بررسی dynamic imports
- بررسی string-based imports

