"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./not-found.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="not-found-container">
          <div className="not-found-content">
            <Image
              src="/images/error/error.png"
              alt="خطا"
              width={500}
              height={500}
              className="not-found-image"
              priority
            />
            <h2 className="not-found-subtitle">خطای سیستمی رخ داد</h2>
            <p className="not-found-description">
              متأسفانه مشکلی در سیستم پیش آمده است. لطفاً صفحه را رفرش کنید یا
              دوباره تلاش کنید.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                onClick={reset}
                className="not-found-link"
                style={{ cursor: "pointer", border: "none" }}
              >
                تلاش مجدد
              </button>
              <Link href="/" className="not-found-link">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
