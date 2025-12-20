// API Functions مطابق contract برای مقالات

import { safeFetch } from "./api";
import { API_CONFIG } from "./constants";
import { logger } from "./logger";
import { ARTICLE_ENDPOINTS } from "./api/endpoints";
import type {
  ArticleCategoryT,
  ArticleT,
  ArticleCommentT,
  GetArticlesParamsT,
  GetArticleCommentsParamsT,
  PostArticleCommentParamsT,
} from "./articleTypes";

/**
 * دریافت دسته‌بندی‌های مقالات
 * GET /v1/blogcategories/client/categories/zerocounter/5
 */
export async function getArticleCategories(): Promise<ArticleCategoryT[]> {
  try {
    // ساختار پاسخ API: { data: ArticleCategoryT[], messages: [], succeeded: boolean }
    const response = await safeFetch<{ 
      data?: ArticleCategoryT[];
      messages?: unknown[];
      succeeded?: boolean;
    }>(
      ARTICLE_ENDPOINTS.categories,
      {
        method: "GET",
        headers: {
          Tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
          "Accept-Language": "fa",
        },
      },
      {
        tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
        locale: "fa",
        skipAuth: true,
      }
    );

    // بررسی ساختار پاسخ
    if (response.ok && response.result) {
      // اگر response.result.data وجود دارد
      if (response.result.data && Array.isArray(response.result.data)) {
        return response.result.data;
      }
      // اگر response.result خودش array است
      if (Array.isArray(response.result)) {
        return response.result;
      }
      // اگر response.result یک object با فیلد data است
      const apiResponse = response.result as { data?: ArticleCategoryT[] };
      if (apiResponse.data && Array.isArray(apiResponse.data)) {
        return apiResponse.data;
      }
    }

    return [];
  } catch (error) {
    logger.error("خطا در دریافت دسته‌بندی‌های مقالات:", error);
    return [];
  }
}

/**
 * دریافت لیست مقالات
 * POST /blogposts/client/searchsp
 */
export async function getArticles(
  params: GetArticlesParamsT
): Promise<ArticleT[]> {
  try {
    const response = await safeFetch<{ data?: ArticleT[] }>(
      ARTICLE_ENDPOINTS.search,
      {
        method: "POST",
        headers: {
          Tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
          "Accept-Language": "fa",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      },
      {
        tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
        locale: "fa",
        skipAuth: true,
      }
    );

    if (response.ok && response.result?.data?.data) {
      return Array.isArray(response.result.data.data) ? response.result.data.data : [];
    }

    return [];
  } catch (error) {
    logger.error("خطا در دریافت مقالات:", error);
    return [];
  }
}

/**
 * دریافت جزئیات یک مقاله
 * GET /blogposts/{id}
 */
export async function getArticleDetail(id: number): Promise<ArticleT | null> {
  try {
    const response = await safeFetch<{ data?: ArticleT }>(
      ARTICLE_ENDPOINTS.detail(id),
      {
        method: "GET",
        headers: {
          Tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
          "Accept-Language": "fa",
        },
      },
      {
        tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
        locale: "fa",
        skipAuth: true,
      }
    );

    if (response.ok && response.result?.data?.data) {
      return response.result.data.data;
    }

    return null;
  } catch (error) {
    logger.error(`خطا در دریافت جزئیات مقاله ${id}:`, error);
    return null;
  }
}

/**
 * دریافت نظرات یک مقاله
 * POST /comments/client/search
 */
export async function getArticleComments(
  params: GetArticleCommentsParamsT
): Promise<ArticleCommentT[]> {
  try {
    const response = await safeFetch<{ data?: ArticleCommentT[] }>(
      ARTICLE_ENDPOINTS.commentsSearch,
      {
        method: "POST",
        headers: {
          Tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
          "Accept-Language": "fa",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      },
      {
        tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
        locale: "fa",
        skipAuth: true,
      }
    );

    if (response.ok && response.result?.data?.data) {
      return Array.isArray(response.result.data.data) ? response.result.data.data : [];
    }

    return [];
  } catch (error) {
    logger.error("خطا در دریافت نظرات مقاله:", error);
    return [];
  }
}

/**
 * ارسال نظر برای یک مقاله
 * POST /comments
 */
export async function postArticleComment(
  params: PostArticleCommentParamsT
): Promise<number> {
  try {
    const response = await safeFetch<{ data?: number }>(
      ARTICLE_ENDPOINTS.commentCreate,
      {
        method: "POST",
        headers: {
          Tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
          "Accept-Language": "fa",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ""}`,
        },
        body: JSON.stringify(params),
      },
      {
        tenant: process.env.NEXT_PUBLIC_API_TENANT || API_CONFIG.DEFAULT_TENANT,
        locale: "fa",
        skipAuth: false,
      }
    );

    if (response.ok && response.result?.data?.data) {
      return typeof response.result.data.data === 'number' ? response.result.data.data : 0;
    }

    return 0;
  } catch (error) {
    logger.error("خطا در ارسال نظر:", error);
    return 0;
  }
}

