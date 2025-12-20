// components/lib/apiFunctions.ts
/**
 * ماژول توابع سطح بالاتر برای کار با API
 * شامل توابع فرم تماس، منوها، مقالات و نظرات
 */

import { safeFetch, CommonHeaders, authenticate } from "./api";
import { API_CONFIG } from "./constants";
import { logger } from "./logger";
import type { MenuItem, MenuApiResponse } from "./footerData";
import type { ApiResult, PagedResult, PaginationParams } from "./api/types";
import { buildErrorResult, toApiResult } from "./api/utils";
import {
  ARTICLE_ENDPOINTS,
  MENU_ENDPOINTS,
  CONTACT_ENDPOINTS,
} from "./api/endpoints";
import { getToken } from "./tokenManager";

// Re-export types for backward compatibility
export type { ApiResult, PagedResult, PaginationParams };

// ==================== 1. فرم تماس (Contact Us) ====================

export interface ContactUsFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  jsonExt?: string;
  type?: number;
  responseStatus?: number;
}

export interface ContactUsResponse {
  data: {
    id: number;
  };
}

export interface PostContactUsParams {
  form: ContactUsFormPayload;
  tenant?: string;
  locale?: string;
}

// ==================== 1.1. Demo Request ====================

export interface DemoRequestFormData {
  fullname: string;
  contact_channel: string; // mobile number
}

export interface DemoRequestResponse {
  status: number;
  result: {
    data: number; // message id
  } | null;
}

/**
 * ارسال درخواست دمو
 * Field mapping:
 * - firstName = fullname
 * - lastName = fullname
 * - email = contact_channel (mobile number)
 * - message = ""
 */
export async function submitDemoRequest(
  data: DemoRequestFormData,
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<DemoRequestResponse>> {
  const payload: ContactUsFormPayload = {
    firstName: data.fullname.trim(),
    lastName: data.fullname.trim(),
    email: data.contact_channel.trim(),
    message: "",
    jsonExt: "",
    type: 0,
    responseStatus: 0,
  };

  try {
    const systemToken = await getSystemToken(tenant);

    const response = await safeFetch<{ data: number }>(
      CONTACT_ENDPOINTS.create,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
          ...(systemToken && { Authorization: `Bearer ${systemToken}` }),
        },
        body: JSON.stringify(payload),
      },
      {
        tenant,
        locale,
        skipAuth: !!systemToken,
      }
    );

    // تبدیل به فرمت مورد انتظار
    const result: DemoRequestResponse = {
      status: response.status,
      result: response.result?.data ?? null,
    };

    return {
      status: response.status,
      ok: response.ok,
      error: response.error,
      result: result ? { data: result } : null,
      data: result,
    };
  } catch (error) {
    logger.error("خطا در ارسال درخواست دمو:", error);
    return buildErrorResult<DemoRequestResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در ارسال درخواست دمو"
    );
  }
}

// ==================== 1.2. Free Consultation Request ====================

export interface FreeConsultationFormData {
  firstName: string;
  lastName: string;
  contact_channel_1: string; // mobile
  contact_channel_2: string; // email
  calling_time: "7-to-13" | "13-to-19" | "19-to-22";
}

export interface FreeConsultationResponse {
  status: number;
  result: {
    data: number; // message id
  } | null;
}

/**
 * ارسال درخواست مشاوره رایگان
 * Field mapping:
 * - firstName = firstName
 * - lastName = lastName
 * - email = "<mobile> & <email>"
 * - message = "Calling time: <calling_time>"
 */
export async function submitFreeConsultation(
  data: FreeConsultationFormData,
  tenant: string = API_CONFIG.DEFAULT_TENANT,
  locale: string = API_CONFIG.DEFAULT_LOCALE
): Promise<ApiResult<FreeConsultationResponse>> {
  const payload: ContactUsFormPayload = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: `${data.contact_channel_1.trim()} & ${data.contact_channel_2.trim()}`,
    message: `Calling time: ${data.calling_time}`,
    jsonExt: "",
    type: 0,
    responseStatus: 0,
  };

  try {
    const systemToken = await getSystemToken(tenant);

    const response = await safeFetch<{ data: number }>(
      CONTACT_ENDPOINTS.create,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
          ...(systemToken && { Authorization: `Bearer ${systemToken}` }),
        },
        body: JSON.stringify(payload),
      },
      {
        tenant,
        locale,
        skipAuth: !!systemToken,
      }
    );

    // تبدیل به فرمت مورد انتظار
    const result: FreeConsultationResponse = {
      status: response.status,
      result: response.result?.data ?? null,
    };

    return {
      status: response.status,
      ok: response.ok,
      error: response.error,
      result: result ? { data: result } : null,
      data: result,
    };
  } catch (error) {
    logger.error("خطا در ارسال درخواست مشاوره رایگان:", error);
    return buildErrorResult<FreeConsultationResponse>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در ارسال درخواست مشاوره رایگان"
    );
  }
}

// ==================== 1.3. Success Helper ====================

/**
 * بررسی موفقیت بودن پاسخ API
 * @param response پاسخ API
 * @returns true اگر status === 200 و result.data وجود داشته باشد
 */
export function isSuccess<
  T extends { status: number; result: { data?: unknown } | null }
>(response: T): boolean {
  return response.status === 200 && response.result?.data != null;
}

/**
 * ارسال فرم تماس با ما
 */
/**
 * دریافت توکن سیستم برای استفاده در API
 * ابتدا از env variable یا localStorage استفاده می‌کند
 * اگر موجود نبود، از API دریافت می‌کند
 */
async function getSystemToken(
  tenant: string = API_CONFIG.DEFAULT_TENANT
): Promise<string | null> {
  // 1. بررسی env variable
  if (process.env.NEXT_PUBLIC_API_TOKEN) {
    return process.env.NEXT_PUBLIC_API_TOKEN;
  }

  // 2. بررسی localStorage (client-side)
  if (typeof window !== "undefined") {
    const token = await getToken();
    if (token) {
      return token;
    }
  }

  // 3. دریافت توکن از API با اطلاعات سیستم
  const systemEmail = process.env.NEXT_PUBLIC_SYSTEM_EMAIL || "admin@map.com";
  const systemPassword =
    process.env.NEXT_PUBLIC_SYSTEM_PASSWORD || "123Pa$$word!";

  try {
    logger.log("🔄 در حال دریافت توکن از API...", {
      email: systemEmail,
      tenant,
    });
    const authResult = await authenticate(systemEmail, systemPassword, tenant);
    if (authResult.success && authResult.token) {
      logger.log("✅ توکن از API دریافت شد");
      return authResult.token;
    } else {
      logger.error(
        "❌ خطا در دریافت توکن:",
        authResult.error,
        authResult.errorCode
      );
      // اگر خطای 404 بود، شاید endpoint اشتباه است
      if (authResult.errorCode === "HTTP_404") {
        logger.log(
          "⚠️ Endpoint برای دریافت توکن پیدا نشد. لطفا endpoint را بررسی کنید."
        );
      }
    }
  } catch (error) {
    console.error("❌ خطا در دریافت توکن سیستم:", error);
  }

  return null;
}

export async function postContactUs(
  params: PostContactUsParams
): Promise<ApiResult<ContactUsResponse>> {
  const {
    form,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  // Prepare payload with defaults
  const payload: ContactUsFormPayload = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    message: form.message,
    jsonExt: form.jsonExt || "",
    type: form.type ?? 0,
    responseStatus: form.responseStatus ?? 0,
  };

  try {
    // دریافت توکن سیستم
    const systemToken = await getSystemToken(tenant);

    if (systemToken) {
      console.log(
        "✅ توکن سیستم دریافت شد:",
        systemToken.substring(0, 20) + "..."
      );
    } else {
      console.warn(
        "⚠️ توکن سیستم موجود نیست - درخواست بدون Authorization header ارسال می‌شود"
      );
    }

    // ارسال درخواست با توکن
    // اگر توکن سیستم موجود است، آن را مستقیماً در header اضافه می‌کنیم
    // در غیر این صورت، safeFetch خودش توکن را از localStorage یا env variable می‌گیرد
    const response = await safeFetch<ContactUsResponse>(
      CONTACT_ENDPOINTS.create,
      {
        method: "POST",
        headers: {
          ...CommonHeaders.jsonApplicationType,
          // اگر توکن سیستم موجود است، آن را مستقیماً اضافه می‌کنیم
          ...(systemToken && { Authorization: `Bearer ${systemToken}` }),
        },
        body: JSON.stringify(payload),
      },
      {
        tenant,
        locale,
        // اگر توکن را خودمان در header اضافه کردیم، skipAuth را true می‌کنیم
        // در غیر این صورت، safeFetch خودش توکن را می‌گیرد
        skipAuth: !!systemToken,
      }
    );

    // لاگ برای دیباگ
    console.log("📤 درخواست ارسال شد:", {
      endpoint: CONTACT_ENDPOINTS.create,
      hasToken: !!systemToken,
      tokenPreview: systemToken ? systemToken.substring(0, 20) + "..." : "none",
      payload: payload,
    });

    if (!response.ok) {
      console.error("❌ خطا در ارسال فرم تماس - Response:", {
        status: response.status,
        ok: response.ok,
        error: response.error,
        result: response.result,
        hasToken: !!systemToken,
        errorDetails: JSON.stringify(response.error, null, 2),
      });
    } else {
      console.log("✅ فرم تماس با موفقیت ارسال شد");
    }

    return toApiResult(response);
  } catch (error) {
    console.error("خطا در ارسال فرم تماس - Exception:", error);
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
      error instanceof Error ? error.message : "خطای ناشناخته در دریافت منوها"
    );
  }
}

// ==================== 2.1. چالش‌های راهکارها ====================

export interface SolutionChallenge {
  id: number;
  name: string;
  description: string | null;
  sortId: number | null;
}

export interface GetSolutionChallengesParams {
  category: string;
  tenant?: string;
  locale?: string;
}

/**
 * نگاشت category به group name برای چالش‌های راهکارها
 */
function getChallengeGroupName(category: string): string {
  const groupNameMap: Record<string, string> = {
    healthcare: "solution-healthcare-challenges",
    airports: "solution-airports-challenges",
    exhibitions: "solution-exhibitions-challenges",
    pilgrimage: "solution-pilgrimage-challenges",
    universities: "solution-universities-challenges",
    stadiums: "solution-stadiums-challenges",
    industrial: "solution-industrial-challenges",
    malls: "solution-malls-challenges", // در صورت نیاز
  };

  return groupNameMap[category] || `solution-${category}-challenges`;
}

/**
 * دریافت چالش‌های یک راهکار از API
 * این تابع category را به group name تبدیل می‌کند و داده‌ها را از API دریافت می‌کند
 */
export async function getSolutionChallenges(
  params: GetSolutionChallengesParams
): Promise<ApiResult<SolutionChallenge[]>> {
  const {
    category,
    tenant = API_CONFIG.DEFAULT_TENANT,
    locale = API_CONFIG.DEFAULT_LOCALE,
  } = params;

  if (!category || typeof category !== "string") {
    return buildErrorResult<SolutionChallenge[]>(
      "دسته‌بندی راهکار معتبر نیست",
      400
    );
  }

  const groupName = getChallengeGroupName(category);

  try {
    const response = await getMenuLinksByGroup({
      groupName,
      tenant,
      locale,
    });

    if (!response.ok || !response.data) {
      return buildErrorResult<SolutionChallenge[]>(
        response.error?.message || "خطا در دریافت چالش‌های راهکار",
        response.status
      );
    }

    // تبدیل MenuApiResponse یا MenuItem[] به MenuItem[]
    let items: MenuItem[] = [];
    if (Array.isArray(response.data)) {
      items = response.data;
    } else if (response.data && "data" in response.data) {
      items = response.data.data;
    }

    // تبدیل MenuItem[] به SolutionChallenge[] و مرتب‌سازی بر اساس sortId
    const challenges: SolutionChallenge[] = items
      .map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        sortId: item.sortId,
      }))
      .sort((a, b) => {
        // مرتب‌سازی بر اساس sortId (اعداد کوچکتر اول)
        const sortA = a.sortId ?? 9999;
        const sortB = b.sortId ?? 9999;
        return sortA - sortB;
      });

    return {
      status: response.status,
      ok: true,
      error: undefined,
      result: { data: challenges },
      data: challenges,
    };
  } catch (error) {
    console.error(`خطا در دریافت چالش‌های راهکار ${category}:`, error);
    return buildErrorResult<SolutionChallenge[]>(
      error instanceof Error
        ? error.message
        : "خطای ناشناخته در دریافت چالش‌های راهکار"
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

export interface GetArticlesParams
  extends PaginationParams,
    ArticleFilterParams {
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
        result: response.result as {
          data?: GetArticleCategoriesResponse;
        } | null,
        data: null,
      };
    }

    const apiResponse =
      response.result as unknown as ArticleCategoriesApiResponse;

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
      error instanceof Error ? error.message : "خطای ناشناخته در ارسال نظر"
    );
  }
}
