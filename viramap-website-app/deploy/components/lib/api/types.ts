// components/lib/api/types.ts
/**
 * انواع مشترک برای تمام API functions
 */

import { SafeFetchResult } from "../api";

/**
 * نتیجه نهایی که تمام توابع API برمی‌گردانند
 * شامل فیلد کمکی data برای دسترسی سریع به داده است
 */
export type ApiResult<T> = SafeFetchResult<T> & {
  data: T | null;
};

/**
 * ساختار رایج برای نتایج صفحه‌بندی‌شده
 */
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

/**
 * پارامترهای عمومی صفحه‌بندی
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

