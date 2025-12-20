"use client";

import { Toaster } from "sonner";

/**
 * Provider برای فرم‌ها که toast را با استایل سفارشی نمایش می‌دهد
 */
export function FormMessageProvider() {
  return (
    <Toaster
      position="top-center"
      richColors={false}
      closeButton
      toastOptions={{
        className: "font-ravi",
        style: {
          background: "rgba(39, 39, 42, 0.95)",
          border: "1px solid rgba(63, 63, 70, 0.5)",
          borderRadius: "12px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        },
      }}
    />
  );
}


