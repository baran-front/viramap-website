// services/api.ts
/**
 * لایه سرویسی مرکزی برای تمام توابع ارتباط با API
 *
 * نکته مهم:
 * - برای جلوگیری از تغییر رفتار، تمام توابع فقط از فایل‌های موجود
 *   در `components/lib` دوباره صادر (re-export) می‌شوند.
 * - هیچ منطق جدیدی اینجا نوشته نشده و فقط نقطه دسترسی واحد ایجاد شده است.
 */

// توابع سطح بالاتر مرتبط با محتوا، منوها، مقالات و نظرات
export * from "@/components/lib/apiFunctions";

// توابع کمکی دریافت داده (اسلایدر، راهکارها، FAQ، منوهای هدر، فوتر و ...)
export {
  fetchSliderItems,
  fetchAllSolutions,
  fetchSolutionByCategory,
  fetchFAQs,
  fetchHeaderMenu,
  fetchHeaderViramapItem,
  fetchFooterAboutContent,
  fetchFooterMenus,
} from "@/components/lib/fetchs";

// در صورت نیاز به استفاده مستقیم از safeFetch در لایه سرویسی
export { safeFetch } from "@/components/lib/api";


