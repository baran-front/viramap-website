//components/modules/articleCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { UserIcon, CalendarIcon } from "lucide-react";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    summery: string;
    imageUrl: string;
    authorName: string;
    published: string;
    categories?: string;
  };
}

function ArticleCard({ article }: ArticleCardProps) {
  // تاریخ فارسی
  const persianDate = new Date(article.published).toLocaleDateString('fa-IR');
  
  // fallback برای تصویر
  const imageSrc = article.imageUrl || "/images/article-placeholder.jpg";

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 block"
    >
      {/* تصویر */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* گرادیانت overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* برچسب دسته‌بندی */}
        {article.categories && (
          <div className="absolute top-3 right-3 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-yekan-bakh">
            {article.categories.split(',')[0]}
          </div>
        )}
      </div>

      {/* محتوا */}
      <div className="p-5">
        {/* عنوان */}
        <h3 className="font-yekan-bakh-bold text-lg text-white mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">
          {article.title}
        </h3>
        
        {/* خلاصه */}
        <p className="font-yekan-bakh text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.summery}
        </p>
        
        {/* اطلاعات نویسنده و تاریخ */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-yekan-bakh text-sm text-white">
                {article.authorName || "ویرامپ"}
              </p>
              <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                <CalendarIcon className="w-3 h-3" />
                <span>{persianDate}</span>
              </div>
            </div>
          </div>
          
          {/* دکمه */}
          <span className="text-orange-500 text-sm font-yekan-bakh-medium">
            مطالعه
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;