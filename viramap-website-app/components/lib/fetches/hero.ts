// components/lib/fetches/hero.ts
/**
 * ماژول توابع دریافت داده‌های Hero از API
 * شامل توابع دریافت محتوای Hero بر اساس نام گروه
 */

import { safeFetch } from "../api";
import { API_CONFIG } from "../constants";
import type { ApiResult } from "../api/types";
import { buildErrorResult } from "../api/utils";
import { CMS_ENDPOINTS } from "../api/endpoints";

// ==================== انواع داده ====================

/**
 * داده‌های Hero
 */
export interface HeroData {
  id: number;
  version: number;
  name: string;
  content: string;
  groupName: string;
  locale: string;
}

/**
 * پاسخ API برای Hero
 */
export interface HeroApiResponse {
  data: HeroData[];
  messages: unknown[];
  succeeded: boolean;
}

/**
 * پارامترهای دریافت Hero بر اساس نام گروه
 */
export interface GetHeroByGroupNameParams {
  groupName: string;
  tenant?: string;
  locale?: string;
}

/**
 * نتیجه دریافت Hero
 */
export type GetHeroByGroupNameResponse = HeroData | null;

// ==================== توابع دریافت داده ====================

/**
 * دریافت محتوای Hero بر اساس نام گروه
 * @param params پارامترهای دریافت Hero شامل groupName، tenant و locale
 * @returns داده‌های Hero یا null در صورت بروز خطا
 */
export async function getHeroByGroupName(
  params: GetHeroByGroupNameParams
): Promise<ApiResult<GetHeroByGroupNameResponse>> {
  const {
    groupName,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  if (!groupName || typeof groupName !== "string") {
    return buildErrorResult<GetHeroByGroupNameResponse>(
      "نام گروه Hero معتبر نیست",
      400
    );
  }

  try {
    const response = await safeFetch<HeroApiResponse>(
      CMS_ENDPOINTS.heroByGroupName(groupName),
      {
        method: "GET",
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    if (!response.ok || !response.result) {
      return {
        status: response.status,
        ok: response.ok,
        error: response.error,
        result: response.result as { data?: GetHeroByGroupNameResponse } | null,
        data: null,
      };
    }

    const apiResponse = response.result as unknown as HeroApiResponse;

    if (
      !apiResponse ||
      !apiResponse.succeeded ||
      !Array.isArray(apiResponse.data) ||
      apiResponse.data.length === 0
    ) {
      return {
        status: response.status,
        ok: false,
        error: response.error,
        result: { data: null },
        data: null,
      };
    }

    // اولین آیتم را برمی‌گردانیم (معمولاً فقط یک Hero برای هر groupName وجود دارد)
    const heroData: GetHeroByGroupNameResponse = apiResponse.data[0];

    return {
      status: response.status,
      ok: true,
      error: response.error,
      result: { data: heroData },
      data: heroData,
    };
  } catch (error) {
    console.error(`خطا در دریافت Hero برای گروه ${groupName}:`, error);
    return buildErrorResult<GetHeroByGroupNameResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت Hero"
    );
  }
}

