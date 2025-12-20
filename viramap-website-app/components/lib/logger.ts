/**
 * Logger utility که در production غیرفعال می‌شود
 * برای کاهش حجم bundle و بهبود عملکرد
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Safely stringify error objects to avoid source map parsing issues
 */
function safeStringifyError(error: unknown): string {
  if (error instanceof Error) {
    return JSON.stringify(
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      null,
      2
    );
  }
  if (typeof error === "object" && error !== null) {
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    // خطاها همیشه لاگ می‌شوند (حتی در production)
    // اما می‌توانید این را هم شرطی کنید
    // استفاده از safe stringify برای جلوگیری از مشکلات source map
    try {
      const safeArgs = args.map((arg) => {
        if (arg instanceof Error || (typeof arg === "object" && arg !== null)) {
          return safeStringifyError(arg);
        }
        return arg;
      });
      console.error(...safeArgs);
    } catch {
      // Fallback: اگر حتی stringify هم خطا داد، فقط message را چاپ می‌کنیم
      console.error(
        "Error occurred:",
        args
          .map((arg) => (arg instanceof Error ? arg.message : String(arg)))
          .join(" ")
      );
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};
