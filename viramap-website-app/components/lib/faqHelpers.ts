// components/lib/faqHelpers.ts
/**
 * توابع و انواع کمکی مربوط به FAQ برای استفاده مجدد در کامپوننت‌ها
 * بدون هیچ وابستگی به UI
 */

import type { FAQResponse, FAQCategory, FAQItem } from "./fetchs";

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

// ==================== Type Guards ====================

/**
 * Type guard: بررسی اینکه آیا یک مقدار یک FAQItem معتبر است
 */
function isValidFAQItem(item: unknown): item is FAQItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    typeof (item as { id: unknown }).id === "number" &&
    "title" in item &&
    typeof (item as { title: unknown }).title === "string" &&
    "description" in item &&
    typeof (item as { description: unknown }).description === "string"
  );
}

/**
 * Type guard: بررسی اینکه آیا یک مقدار یک FAQCategory معتبر است
 */
function isValidFAQCategory(category: unknown): category is FAQCategory {
  return (
    typeof category === "object" &&
    category !== null &&
    "categoryId" in category &&
    typeof (category as { categoryId: unknown }).categoryId === "number" &&
    "categoryName" in category &&
    typeof (category as { categoryName: unknown }).categoryName === "string" &&
    "faqs" in category &&
    Array.isArray((category as { faqs: unknown }).faqs) &&
    (category as { faqs: unknown[] }).faqs.every(isValidFAQItem)
  );
}

/**
 * Type guard: بررسی اینکه آیا یک مقدار یک FAQResponse معتبر است
 */
function isValidFAQResponse(response: unknown): response is FAQResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    Array.isArray((response as { data: unknown }).data) &&
    (response as { data: unknown[] }).data.every(isValidFAQCategory) &&
    "succeeded" in response &&
    typeof (response as { succeeded: unknown }).succeeded === "boolean"
  );
}

// ==================== Normalization Functions ====================

/**
 * استخراج و نرمال‌سازی FAQResponse از پاسخ API
 * این تابع ساختارهای مختلف API را به یک ساختار واحد تبدیل می‌کند
 *
 * API ممکن است یکی از این ساختارها را برگرداند:
 * 1. مستقیماً FAQResponse: { data: FAQCategory[], succeeded: boolean, messages: unknown[] }
 * 2. wrapped در data: { data: FAQResponse }
 * 3. result خودش FAQResponse است (بدون wrapper)
 *
 * @param result نتیجه از safeFetch (ممکن است { data?: T } یا T مستقیم باشد)
 * @returns FAQResponse نرمال‌سازی شده یا null در صورت نامعتبر بودن
 */
export function normalizeFAQResponse(
  result: { data?: unknown } | unknown | null
): FAQResponse | null {
  if (!result) {
    return null;
  }

  // حالت 1: اگر result خودش یک FAQResponse است (بدون wrapper)
  if (isValidFAQResponse(result)) {
    return result;
  }

  // حالت 2: اگر result یک object با فیلد data است
  if (typeof result === "object" && result !== null && "data" in result) {
    const data = (result as { data: unknown }).data;

    // حالت 2a: اگر data خودش یک FAQResponse است
    if (isValidFAQResponse(data)) {
      return data;
    }

    // حالت 2b: اگر data یک object است که دارای فیلد data است (double wrapped)
    if (
      typeof data === "object" &&
      data !== null &&
      "data" in data &&
      isValidFAQResponse((data as { data: unknown }).data)
    ) {
      return (data as { data: FAQResponse }).data;
    }

    // حالت 2c: اگر data یک object است که مستقیماً FAQCategory[] دارد
    // (برای سازگاری با ساختارهای قدیمی)
    if (
      typeof data === "object" &&
      data !== null &&
      "data" in data &&
      Array.isArray((data as { data: unknown }).data) &&
      (data as { data: unknown[] }).data.every(isValidFAQCategory)
    ) {
      return {
        data: (data as { data: FAQCategory[] }).data,
        succeeded: true,
        messages: [],
      };
    }

    // حالت 2d: اگر data مستقیماً یک آرایه FAQCategory است
    if (Array.isArray(data) && data.every(isValidFAQCategory)) {
      return {
        data: data as FAQCategory[],
        succeeded: true,
        messages: [],
      };
    }
  }

  // حالت 3: اگر result یک آرایه مستقیم FAQCategory است (بدون هیچ wrapper)
  if (Array.isArray(result) && result.every(isValidFAQCategory)) {
    return {
      data: result as FAQCategory[],
      succeeded: true,
      messages: [],
    };
  }

  // حالت 4: تلاش برای استخراج دستی در صورت عدم تطابق با ساختارهای شناخته شده
  // این حالت برای سازگاری با ساختارهای غیرمنتظره API استفاده می‌شود
  if (typeof result === "object" && result !== null) {
    // تلاش برای یافتن آرایه categories در هر سطحی از object
    const findCategories = (obj: unknown): FAQCategory[] | null => {
      if (Array.isArray(obj)) {
        const validCategories = obj.filter(isValidFAQCategory);
        return validCategories.length > 0 ? validCategories : null;
      }
      if (typeof obj === "object" && obj !== null) {
        for (const key in obj) {
          if (
            key.toLowerCase().includes("data") ||
            key.toLowerCase().includes("category")
          ) {
            const found = findCategories((obj as Record<string, unknown>)[key]);
            if (found) return found;
          }
        }
      }
      return null;
    };

    const foundCategories = findCategories(result);
    if (foundCategories && foundCategories.length > 0) {
      return {
        data: foundCategories,
        succeeded: true,
        messages: [],
      };
    }
  }

  return null;
}

/**
 * استخراج لیست FAQCategory از FAQResponse
 * @param response FAQResponse نرمال‌سازی شده
 * @returns آرایه FAQCategory یا آرایه خالی
 */
export function extractFAQCategories(
  response: FAQResponse | null
): FAQCategory[] {
  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  // فیلتر کردن دسته‌بندی‌های معتبر
  return response.data.filter(isValidFAQCategory);
}

/**
 * تبدیل FAQCategory[] به لیست تخت FAQItem
 * @param categories آرایه دسته‌بندی‌ها
 * @returns آرایه تخت FAQItem
 */
export function flattenFAQItems(categories: FAQCategory[]): FAQItem[] {
  const items: FAQItem[] = [];

  for (const category of categories) {
    if (Array.isArray(category.faqs)) {
      for (const faq of category.faqs) {
        if (isValidFAQItem(faq)) {
          items.push(faq);
        }
      }
    }
  }

  return items;
}
