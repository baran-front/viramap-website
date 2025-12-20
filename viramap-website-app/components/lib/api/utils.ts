// components/lib/api/utils.ts
/**
 * توابع کمکی مشترک برای API functions
 */

import type { ApiResult } from "./types";

/**
 * ساخت نتیجه خطا برای API responses
 * @param message پیام خطا
 * @param statusCode کد وضعیت HTTP (پیش‌فرض: 500)
 * @returns نتیجه خطا با ساختار ApiResult
 */
export function buildErrorResult<T>(
  message: string,
  statusCode = 500
): ApiResult<T> {
  return {
    status: statusCode,
    result: null,
    ok: false,
    data: null,
    error: {
      message,
      statusCode,
    },
  };
}

/**
 * تبدیل SafeFetchResult به ApiResult
 * @param response نتیجه از safeFetch
 * @returns ApiResult با فیلد data
 */
export function toApiResult<T>(response: {
  status: number;
  result: { data?: T } | null;
  ok: boolean;
  error?: { message: string; statusCode?: number } | null;
}): ApiResult<T> {
  // اگر response موفق نبود و error وجود ندارد، یک error پیش‌فرض می‌سازیم
  if (!response.ok && !response.error) {
    return {
      ...response,
      data: null,
      error: {
        message: `خطای ${response.status}: درخواست ناموفق بود`,
        statusCode: response.status,
      },
    };
  }

  // اگر error یک object خالی است، آن را به null تبدیل می‌کنیم
  let error = response.error;
  if (error && typeof error === "object" && Object.keys(error).length === 0) {
    error = {
      message: `خطای ${response.status}: درخواست ناموفق بود`,
      statusCode: response.status,
    };
  }

  return {
    ...response,
    data: response.result?.data ?? null,
    error: error || undefined,
  };
}

