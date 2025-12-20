// components/lib/faqHelpers.ts
/**
 * توابع و انواع کمکی مربوط به FAQ برای استفاده مجدد در کامپوننت‌ها
 * بدون هیچ وابستگی به UI
 */

export type FAQIconType =
  | "message"
  | "bezier"
  | "brush"
  | "lock"
  | "cloud"
  | "headphone";

// لیست آیکون‌های موجود
const iconTypes: FAQIconType[] = [
  "message",
  "bezier",
  "brush",
  "lock",
  "cloud",
  "headphone",
];

/**
 * انتخاب نوع آیکون بر اساس index
 * رفتار این تابع با نسخه‌ای که قبلاً در FAQSection بود کاملاً یکسان است.
 */
export const getFAQIconType = (index: number): FAQIconType => {
  return iconTypes[index % iconTypes.length];
};


