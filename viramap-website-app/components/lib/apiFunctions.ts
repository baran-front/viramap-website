// components/lib/apiFunctions.ts
/**
 * ماژول توابع سطح بالاتر برای کار با API
 * شامل توابع فرم تماس، منوها، مقالات و نظرات
 */

import { safeFetch, CommonHeaders } from "./api";
import { API_CONFIG } from "./constants";
import type { MenuItem, MenuApiResponse } from "./footerData";
import type { ApiResult, PagedResult, PaginationParams } from "./api/types";
import { buildErrorResult, toApiResult } from "./api/utils";
import { ARTICLE_ENDPOINTS, MENU_ENDPOINTS, CONTACT_ENDPOINTS } from "./api/endpoints";

// Re-export types for backward compatibility
export type { ApiResult, PagedResult, PaginationParams };

// ==================== 1. فرم تماس (Contact Us) ====================

export interface ContactUsFormPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactUsResponse {
  id: number;
  createdOn: string;
}

export interface PostContactUsParams {
  form: ContactUsFormPayload;
  tenant?: string;
  locale?: string;
}

/**
 * ارسال فرم تماس با ما
 */
export async function postContactUs(
  params: PostContactUsParams
): Promise<ApiResult<ContactUsResponse>> {
  const { form, tenant = API_CONFIG.DEFAULT_TENANT, locale = API_CONFIG.DEFAULT_LOCALE } = params;

  try {
    const response = await safeFetch<ContactUsResponse>(
      CONTACT_ENDPOINTS.create,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
        },
        body: JSON.stringify(form),
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error("خطا در ارسال فرم تماس:", error);
    return buildErrorResult<ContactUsResponse>(
      error instanceof Error ? error.message : "خطای ناشناخته در ارسال فرم تماس"
    );
  }
}

// ==================== 2. منوها بر اساس groupName ====================

export interface GetMenuLinksByGroupParams {
  groupName: string;
  tenant?: string;
  locale?: string;
}

export type MenuLinksByGroupData = MenuApiResponse | MenuItem[];

/**
 * دریافت منوها از API بر اساس نام گروه
 * این تابع یک لایه نازک روی endpoint منوها است.
 */
export async function getMenuLinksByGroup(
  params: GetMenuLinksByGroupParams
): Promise<ApiResult<MenuLinksByGroupData>> {
  const {
    groupName,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  if (!groupName || typeof groupName !== "string") {
    return buildErrorResult<MenuLinksByGroupData>(
      "نام گروه منو معتبر نیست",
      400
    );
  }

  try {
    const response = await safeFetch<MenuLinksByGroupData>(
      MENU_ENDPOINTS.byGroup,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
        },
        body: JSON.stringify({
          groupnames: groupName,
        }),
      },
      {
        tenant,
        locale,
        // بسته به تنظیمات بک‌اند ممکن است نیاز به احراز هویت باشد
        // اگر لازم بود، skipAuth را حذف کنید تا توکن اضافه شود
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error(`خطا در دریافت منو برای گروه ${groupName}:`, error);
    return buildErrorResult<MenuLinksByGroupData>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت منوها"
    );
  }
}

// ==================== 3. مقالات با صفحه‌بندی و فیلتر ====================

export interface ArticleSummary {
  id: number;
  title: string;
  summery: string;
  imageUrl: string;
  published: string;
  authorName: string;
  authorImage?: string | null;
  categories?: string;
  slug?: string;
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface ArticleFilterParams {
  categoryId?: number;
  search?: string;
  tagIds?: number[];
}

export interface GetArticlesParams extends PaginationParams, ArticleFilterParams {
  tenant?: string;
  locale?: string;
}

export type GetArticlesResponse = PagedResult<ArticleSummary>;

/**
 * دریافت لیست مقالات با صفحه‌بندی و فیلتر
 */
export async function getArticles(
  params: GetArticlesParams
): Promise<ApiResult<GetArticlesResponse>> {
  const {
    page,
    pageSize,
    categoryId,
    search,
    tagIds,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  if (page <= 0 || pageSize <= 0) {
    return buildErrorResult<GetArticlesResponse>(
      "مقادیر صفحه‌بندی معتبر نیست",
      400
    );
  }

  const body: Record<string, unknown> = {
    pageIndex: page,
    pageSize,
  };

  if (typeof categoryId === "number") {
    body.categoryId = categoryId;
  }
  if (search && search.trim()) {
    body.search = search.trim();
  }
  if (Array.isArray(tagIds) && tagIds.length > 0) {
    body.tagIds = tagIds;
  }

  try {
    const response = await safeFetch<GetArticlesResponse>(
      ARTICLE_ENDPOINTS.search,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
        },
        body: JSON.stringify(body),
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error("خطا در دریافت لیست مقالات:", error);
    return buildErrorResult<GetArticlesResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت لیست مقالات"
    );
  }
}

// ==================== 4. دسته‌بندی‌های مقالات ====================

export interface ArticleCategory {
  id: number;
  title: string;
  counter: number;
  slug?: string;
}

/**
 * ساختار پاسخ API برای دسته‌بندی‌های مقالات
 */
export interface ArticleCategoriesApiResponse {
  data: ArticleCategory[];
  messages: unknown[];
  succeeded: boolean;
}

export type GetArticleCategoriesResponse = ArticleCategory[];

/**
 * دریافت لیست دسته‌بندی‌های مقالات
 */
export async function getArticleCategories(
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<GetArticleCategoriesResponse>> {
  try {
    const response = await safeFetch<ArticleCategoriesApiResponse>(
      ARTICLE_ENDPOINTS.categories,
      {
        method: "GET",
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    // اگر درخواست موفق نبود یا ساختار پاسخ معتبر نبود، نتیجه خالی برمی‌گردانیم
    if (!response.ok || !response.result) {
      return {
        status: response.status,
        ok: response.ok,
        error: response.error,
        result: response.result as { data?: GetArticleCategoriesResponse } | null,
        data: null,
      };
    }

    const apiResponse = response.result as unknown as ArticleCategoriesApiResponse;

    if (!apiResponse || !Array.isArray(apiResponse.data)) {
      return {
        status: response.status,
        ok: false,
        error: response.error,
        result: { data: undefined },
        data: null,
      };
    }

    const categories: GetArticleCategoriesResponse = apiResponse.data;

    return {
      status: response.status,
      ok: true,
      error: response.error,
      result: { data: categories },
      data: categories,
    };
  } catch (error) {
    console.error("خطا در دریافت دسته‌بندی‌های مقالات:", error);
    return buildErrorResult<GetArticleCategoriesResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت دسته‌بندی‌ها"
    );
  }
}

// ==================== 5. جزئیات یک مقاله ====================

export type GetArticleDetailResponse = ArticleDetail;

/**
 * دریافت جزئیات یک مقاله بر اساس شناسه
 */
export async function getArticleDetail(
  articleId: number,
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<GetArticleDetailResponse>> {
  if (!articleId || articleId <= 0) {
    return buildErrorResult<GetArticleDetailResponse>(
      "شناسه مقاله معتبر نیست",
      400
    );
  }

  try {
    const response = await safeFetch<GetArticleDetailResponse>(
      ARTICLE_ENDPOINTS.detail(articleId),
      {
        method: "GET",
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error(`خطا در دریافت جزئیات مقاله ${articleId}:`, error);
    return buildErrorResult<GetArticleDetailResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت جزئیات مقاله"
    );
  }
}

// ==================== 6. نظرات مقاله ====================

export interface ArticleComment {
  id: number;
  blogId: number;
  parentId?: number | null;
  userFullName: string;
  userThumbnail?: string | null;
  createdOn: string;
  rate: number;
  title: string;
  text: string;
  children: ArticleComment[];
}

export interface GetArticleCommentsParams extends PaginationParams {
  articleId: number;
  tenant?: string;
  locale?: string;
}

export type GetArticleCommentsResponse = PagedResult<ArticleComment>;

/**
 * دریافت نظرات یک مقاله با صفحه‌بندی
 */
export async function getArticleComments(
  params: GetArticleCommentsParams
): Promise<ApiResult<GetArticleCommentsResponse>> {
  const {
    articleId,
    page,
    pageSize,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  if (!articleId || articleId <= 0) {
    return buildErrorResult<GetArticleCommentsResponse>(
      "شناسه مقاله برای نظرات معتبر نیست",
      400
    );
  }

  if (page <= 0 || pageSize <= 0) {
    return buildErrorResult<GetArticleCommentsResponse>(
      "مقادیر صفحه‌بندی نظرات معتبر نیست",
      400
    );
  }

  const body = {
    blogId: articleId,
    pageIndex: page,
    pageSize,
  };

  try {
    const response = await safeFetch<GetArticleCommentsResponse>(
      ARTICLE_ENDPOINTS.commentsSearch,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
        },
        body: JSON.stringify(body),
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error(`خطا در دریافت نظرات مقاله ${articleId}:`, error);
    return buildErrorResult<GetArticleCommentsResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت نظرات مقاله"
    );
  }
}

// ==================== 7. ارسال نظر مقاله ====================

export interface PostCommentPayload {
  articleId: number;
  fullName: string;
  rate: number;
  title: string;
  text: string;
  parentId?: number | null;
}

export type PostCommentResponse = ArticleComment;

/**
 * ارسال نظر جدید برای یک مقاله
 */
export async function postComment(
  payload: PostCommentPayload,
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<PostCommentResponse>> {
  const { articleId, fullName, rate, title, text, parentId } = payload;

  if (!articleId || articleId <= 0) {
    return buildErrorResult<PostCommentResponse>(
      "شناسه مقاله برای ثبت نظر معتبر نیست",
      400
    );
  }

  if (!fullName.trim() || !title.trim() || !text.trim()) {
    return buildErrorResult<PostCommentResponse>(
      "نام، عنوان و متن نظر الزامی است",
      400
    );
  }

  const body: Record<string, unknown> = {
    blogId: articleId,
    fullName: fullName.trim(),
    rate,
    title: title.trim(),
    text: text.trim(),
  };

  if (typeof parentId === "number") {
    body.parentId = parentId;
  }

  try {
    const response = await safeFetch<PostCommentResponse>(
      ARTICLE_ENDPOINTS.commentCreate,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
        },
        body: JSON.stringify(body),
      },
      {
        tenant,
        locale,
        skipAuth: true,
      }
    );

    return toApiResult(response);
  } catch (error) {
    console.error("خطا در ارسال نظر مقاله:", error);
    return buildErrorResult<PostCommentResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در ارسال نظر"
    );
  }
}


