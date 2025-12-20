//componenets/lib/api.ts
/**
 * ماژول مدیریت API
 * این ماژول مسئولیت ارتباط با API بک‌اند را بر عهده دارد
 * شامل احراز هویت، تازه‌سازی توکن و ارسال درخواست‌های HTTP
 */

import { API_CONFIG } from "./constants";
import { logger } from "./logger";
import {
  getToken,
  getRefreshToken,
  setToken,
  clearToken,
  isTokenExpiringSoon,
} from "./tokenManager";

// انواع پاسخ API
export type TokenResponse = {
  token: string;
  expiresIn?: number;
  expires_in?: number;
  refreshToken?: string;
  refresh_token?: string;
  data?: {
    token: string;
    expiresIn?: number;
    refreshToken?: string;
  };
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
};

/**
 * نتیجه احراز هویت
 */
export type AuthResult = {
  success: boolean;
  token?: string;
  error?: string;
  errorCode?: string;
};

/**
 * دریافت توکن دسترسی از API
 * این تابع با استفاده از ایمیل و رمز عبور، توکن دسترسی را دریافت می‌کند
 * @param email ایمیل کاربر
 * @param password رمز عبور
 * @param tenant نام تِنَنت (پیش‌فرض: از API_CONFIG)
 * @returns نتیجه احراز هویت شامل توکن یا خطا
 */
export async function authenticate(
  email: string,
  password: string,
  tenant: string = API_CONFIG.DEFAULT_TENANT
): Promise<AuthResult> {
  try {
    // اعتبارسنجی ورودی‌ها
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return {
        success: false,
        error: "ایمیل معتبر نیست",
        errorCode: "INVALID_EMAIL",
      };
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return {
        success: false,
        error: "رمز عبور باید حداقل ۶ کاراکتر باشد",
        errorCode: "INVALID_PASSWORD",
      };
    }

    // ساخت URL درخواست
    // Endpoint: {{baseUrl}}/tokens?tenant=map
    // BASE_URL = "https://api.arvinvira.com/api"
    // بر اساس مستندات: {{baseUrl}}/tokens
    // اگر baseUrl = "https://api.arvinvira.com/api" باشد
    // و endpoint باید "/tokens" باشد
    // پس URL نهایی: "https://api.arvinvira.com/api/tokens" ✓

    // اما شاید baseUrl فقط domain باشد: "https://api.arvinvira.com"
    // در این صورت: "https://api.arvinvira.com/tokens" ✓

    // پس باید بررسی کنیم:
    // - اگر BASE_URL با /api تمام می‌شود، /tokens را اضافه می‌کنیم
    // - اگر نه، /tokens را اضافه می‌کنیم

    const baseUrl = API_CONFIG.BASE_URL;
    // همیشه /tokens را به BASE_URL اضافه می‌کنیم
    const tokensUrl = `${baseUrl}/tokens`;

    const url = new URL(tokensUrl);
    url.searchParams.set("tenant", tenant);

    logger.log("🔗 URL دریافت توکن:", url.toString());
    logger.log("🔗 BASE_URL:", baseUrl);

    // ارسال درخواست به API
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Accept-Language": API_CONFIG.DEFAULT_LOCALE,
        "Content-Type": "application/json",
        Tenant: tenant,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // بررسی وضعیت پاسخ
    if (!response.ok) {
      let errorMessage = "خطا در دریافت توکن";

      try {
        const errorData = await response.json();
        // بررسی اینکه آیا errorData دارای message است
        if (
          errorData &&
          typeof errorData === "object" &&
          "message" in errorData &&
          typeof errorData.message === "string"
        ) {
          errorMessage = errorData.message;
        } else {
          errorMessage = `خطای ${response.status}: ${response.statusText}`;
        }
      } catch {
        // اگر پاسخ JSON نبود
        errorMessage = `خطای ${response.status}: ${response.statusText}`;
      }

      return {
        success: false,
        error: errorMessage,
        errorCode: `HTTP_${response.status}`,
      };
    }

    // خواندن پاسخ موفق
    const data: TokenResponse = await response.json();

    // استخراج توکن از پاسخ (پشتیبانی از فرمت‌های مختلف)
    const token =
      data.token ||
      data.data?.token ||
      (data as unknown as { accessToken?: string }).accessToken;

    if (!token || typeof token !== "string") {
      return {
        success: false,
        error: "توکن در پاسخ API یافت نشد",
        errorCode: "TOKEN_NOT_FOUND",
      };
    }

    // استخراج زمان انقضا
    const expiresIn = data.expiresIn || data.expires_in || data.data?.expiresIn;

    // استخراج توکن تازه‌سازی
    const refreshToken =
      data.refreshToken || data.refresh_token || data.data?.refreshToken;

    // ذخیره توکن در localStorage (فقط در مرورگر)
    if (typeof window !== "undefined") {
      await setToken(token, expiresIn, refreshToken);
    }

    return {
      success: true,
      token,
    };
  } catch (error) {
    logger.error("Error authenticating:", error);

    // مدیریت خطاهای مختلف
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error:
          "Error connecting to server. Please check your internet connection",
        errorCode: "NETWORK_ERROR",
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error during authentication",
      errorCode: "UNKNOWN_ERROR",
    };
  }
}

/**
 * تازه‌سازی توکن دسترسی
 * این تابع از توکن تازه‌سازی برای دریافت توکن جدید استفاده می‌کند
 * @param tenant نام تِنَنت (پیش‌فرض: از API_CONFIG)
 * @returns نتیجه تازه‌سازی شامل توکن جدید یا خطا
 */
export async function refreshAccessToken(
  tenant: string = API_CONFIG.DEFAULT_TENANT
): Promise<AuthResult> {
  try {
    // دریافت توکن تازه‌سازی از localStorage
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      return {
        success: false,
        error: "توکن تازه‌سازی یافت نشد",
        errorCode: "REFRESH_TOKEN_NOT_FOUND",
      };
    }

    // ساخت URL درخواست تازه‌سازی
    const url = new URL(`${API_CONFIG.BASE_URL}/v1/api/tokens/refresh`);
    url.searchParams.set("tenant", tenant);

    // ارسال درخواست تازه‌سازی
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Accept-Language": API_CONFIG.DEFAULT_LOCALE,
        "Content-Type": "application/json",
        Tenant: tenant,
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // بررسی وضعیت پاسخ
    if (!response.ok) {
      // اگر توکن تازه‌سازی منقضی شده، تمام توکن‌ها را پاک می‌کنیم
      if (response.status === 401 || response.status === 403) {
        await clearToken();
        return {
          success: false,
          error: "توکن تازه‌سازی منقضی شده است. لطفا دوباره وارد شوید",
          errorCode: "REFRESH_TOKEN_EXPIRED",
        };
      }

      let errorMessage = "خطا در تازه‌سازی توکن";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `خطای ${response.status}: ${response.statusText}`;
      }

      return {
        success: false,
        error: errorMessage,
        errorCode: `HTTP_${response.status}`,
      };
    }

    // خواندن پاسخ موفق
    const data: TokenResponse = await response.json();

    // استخراج توکن جدید
    const token =
      data.token ||
      data.data?.token ||
      (data as unknown as { accessToken?: string }).accessToken;

    if (!token) {
      return {
        success: false,
        error: "توکن جدید در پاسخ API یافت نشد",
        errorCode: "TOKEN_NOT_FOUND",
      };
    }

    // استخراج زمان انقضا و توکن تازه‌سازی جدید
    const expiresIn = data.expiresIn || data.expires_in || data.data?.expiresIn;
    const newRefreshToken =
      data.refreshToken || data.refresh_token || data.data?.refreshToken;

    // ذخیره توکن جدید
    if (typeof window !== "undefined") {
      await setToken(token, expiresIn, newRefreshToken || refreshToken);
    }

    return {
      success: true,
      token,
    };
  } catch (error) {
    logger.error("Error refreshing token:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Error connecting to server",
        errorCode: "NETWORK_ERROR",
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error refreshing token",
      errorCode: "UNKNOWN_ERROR",
    };
  }
}

/**
 * نتیجه درخواست API
 */
export type SafeFetchResult<T> = {
  status: number;
  result: { data?: T } | null;
  ok: boolean;
  error?: ApiError;
};

/**
 * تنظیمات اضافی برای درخواست API
 */
export type SafeFetchOptions = {
  tenant?: string;
  locale?: string;
  skipAuth?: boolean; // برای درخواست‌هایی که نیاز به توکن ندارند
  retryOn401?: boolean; // تلاش مجدد با توکن تازه‌سازی شده در صورت 401
  maxRetries?: number; // حداکثر تعداد تلاش مجدد
  timeout?: number; // Timeout سفارشی (به میلی‌ثانیه)
};

/**
 * تابع اصلی برای ارسال درخواست به API
 * این تابع به صورت خودکار توکن را از tokenManager دریافت می‌کند
 * و در صورت منقضی شدن توکن، به صورت خودکار آن را تازه‌سازی می‌کند
 * @param endPoint آدرس endpoint (مثلاً /v1/api/...)
 * @param init تنظیمات درخواست fetch
 * @param options تنظیمات اضافی (tenant, locale, skipAuth, retryOn401)
 * @returns نتیجه درخواست شامل داده‌ها، وضعیت و خطا
 */
export async function safeFetch<T>(
  endPoint: string,
  init: RequestInit = {},
  options?: SafeFetchOptions
): Promise<SafeFetchResult<T>> {
  const tenant = options?.tenant || API_CONFIG.DEFAULT_TENANT;
  const locale = options?.locale || API_CONFIG.DEFAULT_LOCALE;
  const retryOn401 = options?.retryOn401 !== false; // پیش‌فرض: true
  const maxRetries = options?.maxRetries || 1;

  // تابع داخلی برای ارسال درخواست
  const makeRequest = async (
    token: string | null,
    isRetry: boolean = false
  ): Promise<SafeFetchResult<T>> => {
    try {
      // ساخت هدرها
      const headers: Record<string, string> = {
        "Accept-Language": locale,
        Tenant: tenant,
        ...(init.headers as Record<string, string>),
      };

      // اضافه کردن Content-Type اگر وجود ندارد و body وجود دارد
      if (init.body && !headers["Content-Type"] && !headers["content-type"]) {
        // اگر body یک FormData است، نباید Content-Type را تنظیم کنیم
        if (!(init.body instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
      }

      // اضافه کردن Authorization اگر توکن موجود است
      if (token && !options?.skipAuth) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // ساخت URL کامل
      const baseUrl = API_CONFIG.BASE_URL;
      const url = endPoint.startsWith("http") ? endPoint : baseUrl + endPoint;

      // ایجاد AbortController برای timeout
      // Timeout متفاوت بر اساس نوع درخواست: POST بیشتر از GET
      const timeout =
        options?.timeout || (init.method === "POST" ? 15000 : 8000);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // ارسال درخواست با timeout
      let response: Response;
      try {
        response = await fetch(url, {
          ...init,
          headers,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        // اگر خطا به دلیل abort بود، خطای اصلی را throw می‌کنیم
        // تا در catch block به عنوان خطای شبکه تشخیص داده شود
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          // ایجاد خطای timeout با پیام واضح
          const timeoutError = new Error(
            "Request timeout: The server did not respond in time"
          );
          timeoutError.name = "AbortError"; // حفظ نام خطا برای تشخیص بهتر
          throw timeoutError;
        }
        // در غیر این صورت خطای اصلی را پرتاب کن
        throw fetchError;
      }

      // بررسی وضعیت پاسخ
      if (!response.ok) {
        // اگر خطای 401 (Unauthorized) بود و retryOn401 فعال است
        if (
          response.status === 401 &&
          retryOn401 &&
          !options?.skipAuth &&
          !isRetry &&
          maxRetries > 0
        ) {
          // بررسی اینکه آیا توکن در آستانه انقضا است
          const isExpiring = await isTokenExpiringSoon();

          // تلاش برای تازه‌سازی توکن
          const refreshResult = await refreshAccessToken(tenant);

          if (refreshResult.success && refreshResult.token) {
            // تلاش مجدد با توکن جدید
            return makeRequest(refreshResult.token, true);
          } else {
            // اگر تازه‌سازی موفق نبود، خطا را برمی‌گردانیم
            return {
              status: response.status,
              result: null,
              ok: false,
              error: {
                message:
                  refreshResult.error ||
                  "توکن منقضی شده و امکان تازه‌سازی وجود ندارد",
                statusCode: response.status,
              },
            };
          }
        }

        // خواندن پیام خطا
        let errorData: ApiError | null = null;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json();
            // بررسی اینکه آیا jsonData یک object معتبر با message است
            if (jsonData && typeof jsonData === "object") {
              // اگر message وجود دارد، از آن استفاده می‌کنیم
              if (jsonData.message && typeof jsonData.message === "string") {
                errorData = {
                  message: jsonData.message,
                  statusCode: response.status,
                  ...(jsonData.errors && { errors: jsonData.errors }),
                };
              } else if (Object.keys(jsonData).length > 0) {
                // اگر object خالی نیست اما message ندارد، سعی می‌کنیم message را از فیلدهای دیگر پیدا کنیم
                const possibleMessageFields = [
                  "error",
                  "Error",
                  "Message",
                  "message",
                  "detail",
                  "Detail",
                ];
                let foundMessage = "";
                for (const field of possibleMessageFields) {
                  if (jsonData[field] && typeof jsonData[field] === "string") {
                    foundMessage = jsonData[field];
                    break;
                  }
                }
                errorData = {
                  message:
                    foundMessage ||
                    `خطای ${response.status}: ${response.statusText}`,
                  statusCode: response.status,
                };
              }
            }
          }
        } catch (parseError) {
          // اگر نتوانست JSON بخواند، خطای پیش‌فرض استفاده می‌شود
          logger.log(`Failed to parse error response: ${parseError}`);
        }

        // اگر errorData هنوز null است یا object خالی است، از خطای پیش‌فرض استفاده می‌کنیم
        if (
          !errorData ||
          (typeof errorData === "object" && !errorData.message)
        ) {
          errorData = {
            message: `خطای ${response.status}: ${
              response.statusText || "درخواست ناموفق بود"
            }`,
            statusCode: response.status,
          };
        }

        return {
          status: response.status,
          result: null,
          ok: false,
          error: errorData,
        };
      }

      // خواندن پاسخ موفق
      const contentType = response.headers.get("content-type");
      let result: { data?: T } | null = null;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        // اگر JSON نبود، متن خام را برمی‌گرداند
        const text = await response.text();
        result = { data: text as unknown as T };
      }

      return {
        status: response.status,
        result,
        ok: true,
      };
    } catch (error) {
      // مدیریت خطاهای مختلف شبکه
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorName = error instanceof Error ? error.name : "";

      // تشخیص خطاهای شبکه (شامل timeout، fetch failed، و خطاهای اتصال)
      const isNetworkError =
        error instanceof TypeError ||
        errorName === "AbortError" ||
        errorMessage.toLowerCase().includes("fetch") ||
        errorMessage.toLowerCase().includes("network") ||
        errorMessage.toLowerCase().includes("networkerror") ||
        errorMessage.toLowerCase().includes("failed to fetch") ||
        errorMessage.toLowerCase().includes("network request failed") ||
        errorMessage.toLowerCase().includes("err_network") ||
        errorMessage.toLowerCase().includes("err_internet_disconnected") ||
        errorMessage.toLowerCase().includes("timeout") ||
        errorMessage.toLowerCase().includes("request timeout") ||
        errorMessage.toLowerCase().includes("econnrefused") ||
        errorMessage.toLowerCase().includes("enotfound") ||
        errorMessage.toLowerCase().includes("etimedout");

      // فقط خطاهای غیر از شبکه را به صورت error لاگ می‌کنیم
      // خطاهای شبکه (شامل timeout) به صورت log لاگ می‌شوند
      if (isNetworkError) {
        logger.log(`⚠️ Network error for ${endPoint}: ${errorMessage}`);
      } else {
        logger.error(`Error sending request to ${endPoint}:`, error);
      }

      if (isNetworkError) {
        return {
          status: 0,
          result: null,
          ok: false,
          error: {
            message:
              "Error connecting to server. Please check your internet connection",
            statusCode: 0,
          },
        };
      }

      return {
        status: 520, // Unknown Error
        result: null,
        ok: false,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Unknown error sending request",
          statusCode: 520,
        },
      };
    }
  };

  try {
    // دریافت توکن (فقط در client-side و اگر skipAuth نباشد)
    let token: string | null = null;
    if (!options?.skipAuth && typeof window !== "undefined") {
      token = await getToken();
    }

    // استفاده از توکن از env variable به عنوان fallback (برای server-side)
    if (!token && !options?.skipAuth) {
      token = process.env.NEXT_PUBLIC_API_TOKEN || null;
    }

    // لاگ برای دیباگ (فقط در development)
    if (!options?.skipAuth && process.env.NODE_ENV === "development") {
      if (token) {
        logger.log(
          `✅ Token found for ${endPoint} (${token.substring(0, 20)}...)`
        );
      } else {
        logger.log(
          `⚠️ No token available for ${endPoint} - request will be sent without Authorization header`
        );
      }
    }

    // ارسال درخواست
    return await makeRequest(token);
  } catch (error) {
    // مدیریت خطاهای شبکه در سطح بالاتر
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : "";

    const isNetworkError =
      error instanceof TypeError ||
      errorName === "AbortError" ||
      errorMessage.toLowerCase().includes("fetch") ||
      errorMessage.toLowerCase().includes("network") ||
      errorMessage.toLowerCase().includes("networkerror") ||
      errorMessage.toLowerCase().includes("failed to fetch") ||
      errorMessage.toLowerCase().includes("network request failed") ||
      errorMessage.toLowerCase().includes("timeout") ||
      errorMessage.toLowerCase().includes("request timeout") ||
      errorMessage.toLowerCase().includes("econnrefused") ||
      errorMessage.toLowerCase().includes("enotfound") ||
      errorMessage.toLowerCase().includes("etimedout");

    // فقط خطاهای غیر از شبکه را به صورت error لاگ می‌کنیم
    if (isNetworkError) {
      logger.log(
        `⚠️ Network error in safeFetch for ${endPoint}: ${errorMessage}`
      );
    } else {
      logger.error(`Unexpected error in safeFetch for ${endPoint}:`, error);
    }

    if (isNetworkError) {
      return {
        status: 0,
        result: null,
        ok: false,
        error: {
          message:
            "Error connecting to server. Please check your internet connection",
          statusCode: 0,
        },
      };
    }

    return {
      status: 520,
      result: null,
      ok: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error sending request",
        statusCode: 520,
      },
    };
  }
}

export const CommonHeaders = {
  jsonApplicationType: { "Content-Type": "application/json" },
  multipartFormData: { "Content-Type": "multipart/form-data" },
};
