"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./not-found.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
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
        <h2 className="not-found-subtitle">خطایی رخ داد</h2>
        <p className="not-found-description">
          متأسفانه مشکلی در بارگذاری صفحه پیش آمده است. لطفاً دوباره تلاش کنید.
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
  );
}
