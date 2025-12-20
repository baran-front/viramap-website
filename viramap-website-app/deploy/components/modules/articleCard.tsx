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
  const imageSrc = article.imageUrl || "/images/article/header.png";
  const authorImageSrc = article.authorImage || "/images/article/kitten.png";

  // خلاصه کوتاه شده - در حالت موبایل کامل نمایش داده می‌شود
  const shortSummary = isMobile
    ? article.summery
    : article.summery.length > 100
    ? article.summery.substring(0, 100) + "..."
    : article.summery;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group overflow-hidden transition-all duration-300 hover:opacity-90 h-full flex flex-col p-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
    >
      {/* تصویر */}
      <div
        className="relative w-full overflow-hidden shrink-0 aspect-video rounded-lg"
      >
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* محتوا */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex-1 flex flex-col">
        {/* عنوان */}
        <h3
          className="font-ravi font-medium text-white mb-2 sm:mb-3 leading-[1.8] shrink-0 text-[clamp(16px,4vw,18px)]"
        >
          {article.title}
        </h3>

        {/* خلاصه */}
        <p
          className="font-ravi leading-[1.6] mb-4 sm:mb-5 flex-1 text-[clamp(13px,3.5vw,14px)] text-white/50"
        >
          {shortSummary}
        </p>

        {/* اطلاعات نویسنده و تاریخ */}
        <div
          className="flex items-center gap-3 shrink-0 rtl"
        >
          {/* آواتار نویسنده */}
          <div
            className="relative rounded-full overflow-hidden shrink-0 w-[clamp(35px,8vw,40px)] h-[clamp(35px,8vw,40px)]"
          >
            <Image
              src={authorImageSrc}
              alt={article.authorName || "نویسنده"}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>

          {/* نام و تاریخ نویسنده */}
          <div className="flex-1 min-w-0">
            <p
              className="font-ravi text-white truncate text-[clamp(13px,3.5vw,14px)] mb-0.5 font-normal"
            >
              {article.authorName || "ویرامپ"}
            </p>
            <p
              className="font-ravi truncate text-[clamp(11px,3vw,12px)] text-white/50"
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
