// components/lib/fetches/common.ts
/**
 * ماژول توابع سطح بالاتر برای دریافت داده از API
 * این ماژول شامل توابع آماده برای دریافت داده‌های مختلف از بک‌اند است
 * تمام توابع از async/await استفاده می‌کنند و خطاها را به خوبی مدیریت می‌کنند
 */

import { safeFetch } from "./api";
import { API_CONFIG } from "./constants";
import type { ApiResult } from "./api/types";
import { logger } from "./logger";
import {
  SLIDER_ENDPOINTS,
  SOLUTION_ENDPOINTS,
  FAQ_ENDPOINTS,
  MENU_ENDPOINTS,
  CMS_ENDPOINTS,
} from "./api/endpoints";
import { normalizeFAQResponse } from "./faqHelpers";

// ==================== انواع داده ====================

/**
 * آیتم اسلایدر
 */
export type SliderItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
};

/**
 * شناسه دسته‌بندی راهکارها
 */
export type SolutionCategoryId =
  | "healthcare"
  | "airports"
  | "exhibitions"
  | "pilgrimage"
  | "universities"
  | "malls"
  | "stadiums"
  | "industrial";

/**
 * داده‌های یک راهکار
 */
export type SolutionData = {
  id: SolutionCategoryId;
  title: string;
  description: string;
  features: string[];
  images: string[];
};

/**
 * آیتم سوال متداول
 */
export type FAQItem = {
  id: number;
  title: string;
  description: string;
};

/**
 * دسته‌بندی سوالات متداول
 */
export type FAQCategory = {
  categoryId: number;
  categoryName: string;
  faqs: FAQItem[];
};

/**
 * پاسخ API برای سوالات متداول
 */
export type FAQResponse = {
  data: FAQCategory[];
  messages: unknown[];
  succeeded: boolean;
};

// ==================== توابع دریافت داده ====================

/**
 * دریافت لیست اسلایدها از API
 * این تابع تمام اسلایدهای فعال را از سرور دریافت می‌کند
 * @returns لیست اسلایدها یا null در صورت بروز خطا
 */
export async function fetchSliderItems(): Promise<ApiResult<SliderItem[]>> {
  try {
    const response = await safeFetch<SliderItem[]>(SLIDER_ENDPOINTS.list, {
      method: "GET",
    });

    return {
      ...response,
      data: response.result?.data ?? null,
    };
  } catch (error) {
    logger.error("Error fetching slider items:", error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching slider items",
        statusCode: 500,
      },
    };
  }
}

/**
 * دریافت تمام راهکارها از API
 * این تابع لیست کامل تمام راهکارهای موجود را از API داخلی Next می‌گیرد
 * @returns لیست تمام راهکارها یا null در صورت بروز خطا
 */
export async function fetchAllSolutions(): Promise<ApiResult<SolutionData[]>> {
  try {
    const response = await safeFetch<SolutionData[]>(SOLUTION_ENDPOINTS.list, {
      method: "GET",
    });

    return {
      ...response,
      data: response.result?.data ?? null,
    };
  } catch (error) {
    logger.error("Error fetching solutions:", error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching solutions",
        statusCode: 500,
      },
    };
  }
}

/**
 * دریافت یک راهکار خاص س 
    دسته‌بندی
 *تا
   بع اطلاعات یک راهکار خاص را بر اساس category دریافت می‌

   * @param category شناسه دسته‌بندی راهکار
 * @returns داده‌های راهکار یا null در صورت بروز خطا
 */
export async function fetchSolutionByCategory(
  category: SolutionCategoryId
): Promise<ApiResult<SolutionData>> {
  try {
    // اعتبارسنجی ورودی
    if (!category || typeof category !== "string") {
      return {
        status: 400,
        result: null,
        ok: false,
        data: null,
        error: {
          message: "شناسه دسته‌بندی معتبر نیست",
          statusCode: 400,
        },
      };
    }

    // ساخت URL با query parameter
    const searchParams = new URLSearchParams({ category });
    const response = await safeFetch<SolutionData>(
      SOLUTION_ENDPOINTS.byCategory(category),
      {
        method: "GET",
      }
    );

    return {
      ...response,
      data: response.result?.data ?? null,
    };
  } catch (error) {
    logger.error(`Error fetching solution for category ${category}:`, error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching solution",
        statusCode: 500,
      },
    };
  }
}

/**
 * دریافت سوالات متداول از API
 * این تابع تمام سوالات متداول را مستقیماً از سرور بک‌اند دریافت می‌کند
 * @param tenant نام تِنَنت (پیش‌فرض: از API_CONFIG)
 * @param locale زبان (پیش‌فرض: از API_CONFIG)
 * @returns پاسخ API شامل دسته‌بندی‌های سوالات متداول یا null در صورت بروز خطا
 */
export async function fetchFAQs(
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<FAQResponse>> {
  try {
    // توجه: safeFetch همیشه endPoint را به BASE_URL اضافه می‌کند
    // با توجه به اینکه BASE_URL شامل `/api` است (مثل: https://api.arvinvira.com/api)
    // endPoint باید بدون `/api` و از `/v1/...` شروع شود تا آدرس کامل زیر ساخته شود:
    // `${API_CONFIG.BASE_URL}/v1/faqs/client/search`
    const response = await safeFetch<FAQResponse>(
      "/v1/faqs/client/search",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      {
        tenant,
        locale,
        skipAuth: true, // طبق نمونه‌ای که دادی، این endpoint بدون توکن هم جواب می‌دهد
      }
    );

    // استفاده از تابع نرمال‌سازی برای استخراج FAQResponse
    // این تابع تمام ساختارهای ممکن API را به یک ساختار واحد تبدیل می‌کند
    const faqData = normalizeFAQResponse(response.result);

    // لاگ برای دیباگ (فقط در محیط توسعه)
    if (process.env.NODE_ENV === "development") {
      const resultType = response.result ? typeof response.result : "null";
      const resultKeys =
        response.result && typeof response.result === "object"
          ? Object.keys(response.result)
          : [];
      const hasDataField =
        response.result &&
        typeof response.result === "object" &&
        "data" in response.result;
      const dataType =
        response.result &&
        typeof response.result === "object" &&
        "data" in response.result
          ? typeof (response.result as { data: unknown }).data
          : null;

      logger.log("FAQ API Response Debug:", {
        ok: response.ok,
        hasResult: !!response.result,
        resultType,
        resultKeys,
        hasDataField,
        dataType,
        hasNormalizedData: !!faqData,
        categoriesCount: faqData?.data?.length ?? 0,
        error: response.error,
      });
    }

    return {
      ...response,
      data: faqData,
    };
  } catch (error) {
    logger.error("خطا در دریافت سوالات متداول:", error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "خطای ناشناخته در دریافت سوالات متداول",
        statusCode: 500,
      },
    };
  }
}

// ==================== منوهای هدر ====================

/**
 * آیتم منوی هدر
 */
export type HeaderMenuItem = {
  id: number;
  name: string;
  linkUrl: string | null;
  imageUrl: string | null;
  thumbnail: string | null;
  locale: string | null;
  parentId: number | null;
  sortId: number | null;
  groupName: string;
  description: string | null;
  children: HeaderMenuItem[];
};

/**
 * پاسخ API برای منوهای هدر
 */
export type HeaderMenuResponse = {
  data: HeaderMenuItem[];
  messages: unknown[];
  succeeded: boolean;
};

// مقادیر پیش‌فرض
const DEFAULT_TENANT = "map";
const DEFAULT_LOCALE = "fa";

/**
 * دریافت منوهای هدر برای یک گروه خاص
 * این تابع منوهای هدر را از API بک‌اند دریافت می‌کند
 * توکن به صورت خودکار از tokenManager دریافت می‌شود
 * @param groupName نام گروه منو (پیش‌فرض: "header")
 * @param tenant نام تِنَنت (پیش‌فرض: "map")
 * @param locale زبان (پیش‌فرض: "fa")
 * @returns لیست منوهای هدر یا null در صورت بروز خطا
 */
export async function fetchHeaderMenu(
  groupName: string = "header",
  tenant: string = DEFAULT_TENANT,
  locale: string = DEFAULT_LOCALE
): Promise<ApiResult<HeaderMenuResponse>> {
  try {
    // اعتبارسنجی ورودی‌ها
    if (!groupName || typeof groupName !== "string") {
      return {
        status: 400,
        result: null,
        ok: false,
        data: null,
        error: {
          message: "نام گروه منو معتبر نیست",
          statusCode: 400,
        },
      };
    }

    // ارسال درخواست به API
    // توجه: BASE_URL شامل `/api` است، بنابراین endPoint باید از `/v1/...` شروع شود
    const response = await safeFetch<HeaderMenuResponse>(
      MENU_ENDPOINTS.byGroup,
      {
        method: "POST",
        body: JSON.stringify({
          groupnames: groupName,
        }),
      },
      {
        tenant,
        locale,
      }
    );

    return {
      ...response,
      data: response.result?.data ?? null,
    };
  } catch (error) {
    logger.error(`Error fetching header menu for group ${groupName}:`, error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching header menu",
        statusCode: 500,
      },
    };
  }
}

/**
 * دریافت آیتم خاص Viramap (با id = 5) از منوهای هدر
 * این تابع فقط آیتم مورد نظر را از لیست منوها استخراج می‌کند
 * @param tenant نام تِنَنت (اختیاری)
 * @param locale زبان (اختیاری)
 * @returns آیتم منوی Viramap یا null در صورت عدم وجود یا بروز خطا
 */
export async function fetchHeaderViramapItem(
  tenant?: string,
  locale?: string
): Promise<ApiResult<HeaderMenuItem>> {
  try {
    // دریافت تمام منوهای هدر
    const result = await fetchHeaderMenu("header", tenant, locale);

    // بررسی اینکه آیا داده معتبر است
    if (!result.ok || !result.data) {
      return {
        status: result.status,
        result: null,
        ok: false,
        data: null,
        error: result.error,
      };
    }

    // بررسی ساختار داده
    const menuResponse = result.data as HeaderMenuResponse;

    if (
      !menuResponse ||
      !Array.isArray(menuResponse.data) ||
      menuResponse.data.length === 0
    ) {
      return {
        status: result.status,
        result: null,
        ok: false,
        data: null,
        error: {
          message: "داده منو خالی است یا ساختار معتبری ندارد",
          statusCode: result.status,
        },
      };
    }

    // جستجوی آیتم با id = 5
    const viramapItem = menuResponse.data.find((item) => item.id === 5) ?? null;

    return {
      status: result.status,
      result: { data: viramapItem ?? undefined },
      ok: result.ok,
      data: viramapItem,
      error: result.error,
    };
  } catch (error) {
    logger.error("Error fetching Viramap item from menu:", error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching Viramap item",
        statusCode: 500,
      },
    };
  }
}

/**
 * آیتم محتوای CMS (برای متن‌های مدیریت محتوا مثل فوتر و ...)
 */
export type CmsContentItem = {
  id: number;
  version: number;
  name: string;
  content: string;
  groupName: string;
  locale: string;
};

/**
 * ساختار پاسخ API برای محتوای CMS
 */
export type CmsContentResponse = {
  data: CmsContentItem[];
  messages: unknown[];
  succeeded: boolean;
};

/**
 * دریافت متن معرفی فوتر از CMS
 * این تابع محتوای گروه "footer-about" را از بک‌اند دریافت می‌کند
 */
export async function fetchFooterAboutContent(
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<CmsContentResponse>> {
  try {
    // توجه: footer-about نام گروه است، نه بخشی از خود آدرس API
    // endpoint صحیح فقط /v1/cms/client/by-group-name است
    const response = await safeFetch<CmsContentResponse>(
      CMS_ENDPOINTS.cmsByGroupName,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // اینجا group name را می‌فرستیم
          groupnames: "footer-about",
        }),
      },
      {
        tenant,
        locale,
        // برای این endpoint باید از توکن احراز هویت استفاده شود
        // در نتیجه skipAuth را تنظیم نمی‌کنیم تا safeFetch خودش Authorization را اضافه کند
      }
    );

    return {
      ...response,
      data: response.result?.data ?? null,
    };
  } catch (error) {
    logger.error("Error fetching footer content (footer-about):", error);
    return {
      status: 500,
      result: null,
      ok: false,
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error fetching footer content",
        statusCode: 500,
      },
    };
  }
}

export async function fetchFooterMenus() {
  const groups = [
    "footer-quick",
    "footer-products",
    "footer-solutions",
    "footer-contact",
  ];

  const results = await Promise.all(
    groups.map((group) => fetchHeaderMenu(group))
  );

  return groups.reduce((acc, group, index) => {
    acc[group] = results[index];
    return acc;
  }, {} as Record<string, any>);
}
