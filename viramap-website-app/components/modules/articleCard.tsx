//components/modules/articleCard.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    summery: string;
    imageUrl: string;
    authorName: string;
    authorImage?: string;
    published: string;
    categories?: string;
  };
}

function ArticleCard({ article }: ArticleCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // تاریخ فارسی
  const persianDate = new Date(article.published).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // fallback برای تصویر
  const imageSrc = article.imageUrl || "/images/article-placeholder.jpg";
  const authorImageSrc =
    article.authorImage || "/images/avatar-placeholder.png";

  // خلاصه کوتاه شده - در حالت موبایل کامل نمایش داده می‌شود
  const shortSummary = isMobile
    ? article.summery
    : article.summery.length > 100
    ? article.summery.substring(0, 100) + "..."
    : article.summery;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group block overflow-hidden transition-all duration-300 hover:opacity-90"
      style={{
        backgroundColor: "#52525B1A",
        borderRadius: "12px",
        border: "1px solid #52525B1A",
      }}
    >
      {/* تصویر */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "200px",
          borderRadius: "8px",
          margin: "8px",
        }}
      >
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* محتوا */}
      <div className="px-5 pb-5 pt-0">
        {/* عنوان */}
        <h3
          className="font-ravi font-medium text-white mb-3 leading-relaxed"
          style={{ fontSize: "18px", fontWeight: 500, lineHeight: "1.8" }}
        >
          {article.title}
        </h3>

        {/* خلاصه */}
        <p
          className="font-ravi text-gray-300 leading-relaxed mb-5"
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {shortSummary}
        </p>

        {/* اطلاعات نویسنده و تاریخ */}
        <div className="flex items-center gap-3" style={{ direction: "rtl" }}>
          {/* آواتار نویسنده */}
          <div
            className="relative rounded-full overflow-hidden shrink-0"
            style={{ width: "40px", height: "40px" }}
          >
            <Image
              src={authorImageSrc}
              alt={article.authorName || "نویسنده"}
              fill
              className="object-cover"
            />
          </div>

          {/* نام و تاریخ نویسنده */}
          <div className="flex-1">
            <p
              className="font-ravi text-white"
              style={{ fontSize: "14px", marginBottom: "2px", fontWeight: 400 }}
            >
              {article.authorName || "ویرامپ"}
            </p>
            <p
              className="font-ravi"
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}
            >
              {persianDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
