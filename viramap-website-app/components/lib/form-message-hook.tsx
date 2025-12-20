"use client";

/**
 * Hook برای نمایش پیام‌های فرم به صورت یکپارچه
 * این hook از sonner استفاده می‌کند اما با استایل سفارشی
 */

import { toast } from "sonner";
import type { FormMessageType } from "@/components/ui/form-message";

export interface ShowFormMessageOptions {
  type?: FormMessageType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * نمایش پیام فرم با استایل مینیمال و زیبا
 */
export function showFormMessage(options: ShowFormMessageOptions) {
  const { type = "info", title, message, duration = 5000, action } = options;

  const toastOptions: Parameters<typeof toast>[1] = {
    duration,
    className: "font-ravi",
    style: {
      background: "rgba(39, 39, 42, 0.95)",
      border: "1px solid rgba(63, 63, 70, 0.5)",
      borderRadius: "12px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
  };

  // تعیین رنگ و آیکون بر اساس نوع
  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-green-500"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          style: {
            borderColor: "rgba(34, 197, 94, 0.3)",
          },
        };
      case "error":
        return {
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-red-500"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          style: {
            borderColor: "rgba(239, 68, 68, 0.3)",
          },
        };
      case "warning":
        return {
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-orange-500"
            >
              <path
                d="M10 6.66667V10M10 13.3333H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39765 18.3333 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          style: {
            borderColor: "rgba(251, 101, 20, 0.3)",
          },
        };
      default:
        return {
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-blue-500"
            >
              <path
                d="M10 13.3333V10M10 6.66667H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39765 18.3333 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          style: {
            borderColor: "rgba(59, 130, 246, 0.3)",
          },
        };
    }
  };

  const config = getToastConfig();
  const finalStyle = {
    ...toastOptions.style,
    ...config.style,
  };

  // ساخت محتوای پیام
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="mb-1 text-sm font-semibold text-white leading-tight">
            {title}
          </h4>
        )}
        <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
      </div>
    </div>
  );

  // نمایش toast بر اساس نوع
  switch (type) {
    case "success":
      return toast.success(content, {
        ...toastOptions,
        style: finalStyle,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      });
    case "error":
      return toast.error(content, {
        ...toastOptions,
        style: finalStyle,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      });
    case "warning":
      return toast.warning(content, {
        ...toastOptions,
        style: finalStyle,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      });
    default:
      return toast.info(content, {
        ...toastOptions,
        style: finalStyle,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      });
  }
}

/**
 * Helper functions برای استفاده راحت‌تر
 */
export const formMessage = {
  success: (message: string, options?: Omit<ShowFormMessageOptions, "type" | "message">) =>
    showFormMessage({ type: "success", message, ...options }),
  error: (message: string, options?: Omit<ShowFormMessageOptions, "type" | "message">) =>
    showFormMessage({ type: "error", message, ...options }),
  warning: (message: string, options?: Omit<ShowFormMessageOptions, "type" | "message">) =>
    showFormMessage({ type: "warning", message, ...options }),
  info: (message: string, options?: Omit<ShowFormMessageOptions, "type" | "message">) =>
    showFormMessage({ type: "info", message, ...options }),
};

