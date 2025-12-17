/**
 * مدیریت توکن دسترسی به API
 * این ماژول مسئولیت ذخیره، بازیابی و مدیریت توکن‌های احراز هویت را بر عهده دارد
 * از localStorage برای ذخیره توکن در سمت کلاینت استفاده می‌کند
 */

// کلیدهای ذخیره‌سازی در localStorage
const TOKEN_STORAGE_KEY = "arvinvira_api_token";
const TOKEN_EXPIRY_KEY = "arvinvira_api_token_expiry";
const REFRESH_TOKEN_STORAGE_KEY = "arvinvira_api_refresh_token";

/**
 * بررسی اینکه آیا در محیط مرورگر هستیم یا نه
 * @returns true اگر در مرورگر باشیم، false در غیر این صورت
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * ذخیره توکن دسترسی در localStorage
 * این تابع فقط در محیط مرورگر کار می‌کند
 * @param token توکن دسترسی که باید ذخیره شود
 * @param expiresIn زمان انقضای توکن به ثانیه (اختیاری)
 * @param refreshToken توکن تازه‌سازی (اختیاری)
 * @throws Error در صورت بروز خطا در ذخیره‌سازی
 */
export async function setToken(
  token: string,
  expiresIn?: number,
  refreshToken?: string
): Promise<void> {
  try {
    // بررسی اینکه در محیط مرورگر هستیم
    if (!isBrowser()) {
      console.warn("ذخیره توکن فقط در محیط مرورگر امکان‌پذیر است");
      return;
    }

    // اعتبارسنجی توکن
    if (!token || typeof token !== "string" || token.trim().length === 0) {
      throw new Error("توکن معتبر نیست");
    }

    // ذخیره توکن اصلی
    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    // ذخیره زمان انقضای توکن
    if (expiresIn && expiresIn > 0) {
      const expiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    // ذخیره توکن تازه‌سازی در صورت وجود
    if (refreshToken && typeof refreshToken === "string") {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    }
  } catch (error) {
    console.error("خطا در ذخیره توکن:", error);
    throw error instanceof Error
      ? error
      : new Error("خطای ناشناخته در ذخیره توکن");
  }
}

/**
 * دریافت توکن دسترسی از localStorage
 * این تابع به صورت خودکار انقضای توکن را بررسی می‌کند
 * @returns توکن دسترسی یا null در صورت عدم وجود یا انقضا
 */
export async function getToken(): Promise<string | null> {
  try {
    // بررسی اینکه در محیط مرورگر هستیم
    if (!isBrowser()) {
      return null;
    }

    // دریافت توکن از localStorage
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    // اگر توکن وجود ندارد
    if (!token) {
      return null;
    }

    // بررسی انقضای توکن
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);

      // بررسی اینکه expiryTime یک عدد معتبر است
      if (isNaN(expiryTime)) {
        console.warn("زمان انقضای توکن معتبر نیست، توکن پاک می‌شود");
        await clearToken();
        return null;
      }

      // بررسی اینکه آیا توکن منقضی شده است
      // 5 دقیقه قبل از انقضا به عنوان buffer در نظر گرفته می‌شود
      const bufferTime = 5 * 60 * 1000; // 5 دقیقه به میلی‌ثانیه
      if (Date.now() >= expiryTime - bufferTime) {
        console.warn("توکن منقضی شده یا در آستانه انقضا است");
        await clearToken();
        return null;
      }
    }

    return token;
  } catch (error) {
    console.error("خطا در دریافت توکن:", error);
    return null;
  }
}

/**
 * دریافت توکن تازه‌سازی از localStorage
 * @returns توکن تازه‌سازی یا null در صورت عدم وجود
 */
export async function getRefreshToken(): Promise<string | null> {
  try {
    if (!isBrowser()) {
      return null;
    }

    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("خطا در دریافت توکن تازه‌سازی:", error);
    return null;
  }
}

/**
 * پاک کردن تمام توکن‌های ذخیره شده از localStorage
 * این تابع تمام اطلاعات مربوط به احراز هویت را پاک می‌کند
 */
export async function clearToken(): Promise<void> {
  try {
    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("خطا در پاک کردن توکن:", error);
    // حتی در صورت بروز خطا، تلاش می‌کنیم توکن‌ها را پاک کنیم
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      // اگر باز هم خطا داد، فقط لاگ می‌کنیم
      console.error("نمی‌توان توکن‌ها را پاک کرد");
    }
  }
}

/**
 * بررسی وجود توکن معتبر
 * این تابع بررسی می‌کند که آیا توکن معتبری در localStorage وجود دارد یا نه
 * @returns true اگر توکن معتبر وجود داشته باشد، false در غیر این صورت
 */
export async function hasValidToken(): Promise<boolean> {
  try {
    const token = await getToken();
    return token !== null && token.trim().length > 0;
  } catch (error) {
    console.error("خطا در بررسی اعتبار توکن:", error);
    return false;
  }
}

/**
 * بررسی اینکه آیا توکن در آستانه انقضا است یا نه
 * @param bufferMinutes تعداد دقیقه‌های buffer قبل از انقضا (پیش‌فرض: 5 دقیقه)
 * @returns true اگر توکن در آستانه انقضا باشد، false در غیر این صورت
 */
export async function isTokenExpiringSoon(
  bufferMinutes: number = 5
): Promise<boolean> {
  try {
    if (!isBrowser()) {
      return false;
    }

    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) {
      return false;
    }

    const expiryTime = parseInt(expiry, 10);
    if (isNaN(expiryTime)) {
      return true; // اگر expiryTime معتبر نیست، فرض می‌کنیم منقضی شده
    }

    const bufferTime = bufferMinutes * 60 * 1000;
    return Date.now() >= expiryTime - bufferTime;
  } catch (error) {
    console.error("خطا در بررسی انقضای توکن:", error);
    return true; // در صورت بروز خطا، فرض می‌کنیم توکن منقضی شده
  }
}

