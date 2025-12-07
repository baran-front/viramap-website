//app/articles/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ArticlesCategoryTabs from "@/components/templates/articlesCategoryTabs";
import Link from "next/link";
import PageHero from "@/components/modules/pageHero";
import ArticleCard from "@/components/modules/articleCard";

// داده‌های نمونه
const mockCategories = [
  { id: 1, title: "فناوری" },
  { id: 2, title: "برنامه‌نویسی" },
  { id: 3, title: "دیجیتال مارکتینگ" },
  { id: 4, title: "طراحی UI/UX" },
  { id: 5, title: "کسب‌وکار" },
  { id: 6, title: "استارتاپ" }
];

const mockArticles = [
  {
    id: 1,
    title: "نقش هوش مصنوعی در تحول کسب‌وکارهای نوین",
    summery: "هوش مصنوعی چگونه می‌تواند فرآیندهای کسب‌وکار را متحول کند و به رشد اقتصادی کمک نماید؟",
    imageUrl: "/images/article1.jpg",
    authorName: "دکتر علی محمدی",
    published: "2024-12-15T10:30:00.000Z",
    categories: "فناوری, کسب‌وکار"
  },
  {
    id: 2,
    title: "تحول دیجیتال در صنعت بانکداری",
    summery: "نقش فناوری در تغییر صنعت مالی و بانکداری",
    imageUrl: "/images/article2.jpg",
    authorName: "محمد رضایی",
    published: "2024-12-10T08:15:00.000Z",
    categories: "کسب‌وکار, فناوری"
  },
  {
    id: 3,
    title: "بلاکچین و آینده تراکنش‌ها",
    summery: "تأثیر فناوری بلاکچین بر سیستم‌های مالی",
    imageUrl: "/images/article3.jpg",
    authorName: "سارا کریمی",
    published: "2024-12-05T14:20:00.000Z",
    categories: "فناوری"
  },
  {
    id: 4,
    title: "اینترنت اشیاء در زندگی روزمره",
    summery: "کاربردهای عملی IoT در خانه‌های هوشمند",
    imageUrl: "/images/article4.jpg",
    authorName: "رضا احمدی",
    published: "2024-12-01T11:45:00.000Z",
    categories: "فناوری"
  },
  {
    id: 5,
    title: "راهکارهای افزایش بهره‌وری تیم‌های دورکار",
    summery: "ابزارها و روش‌های مدیریت تیم‌های دورکار برای افزایش بهره‌وری",
    imageUrl: "/images/article5.jpg",
    authorName: "فاطمه غفاری",
    published: "2024-11-28T09:30:00.000Z",
    categories: "کسب‌وکار"
  },
  {
    id: 6,
    title: "تأثیر شبکه‌های اجتماعی بر برندسازی",
    summery: "چگونه از شبکه‌های اجتماعی برای ساخت برند قوی استفاده کنیم؟",
    imageUrl: "/images/article6.jpg",
    authorName: "حسن محمودی",
    published: "2024-11-25T16:45:00.000Z",
    categories: "دیجیتال مارکتینگ"
  }
];

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // فیلتر مقالات بر اساس دسته‌بندی و جستجو
  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = !selectedCategory || 
      (article.categories && article.categories.includes(selectedCategory));
    
    const matchesSearch = !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summery.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Page Hero */}
      <div className="container mt-24">
        <div className="text-center">
          <h1 className="font-morabba text-4xl md:text-5xl font-medium text-white mb-4">
            اخبار و مقالات ویرامپ
          </h1>
          <p className="font-yekan-bakh text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            جدیدترین مطالب و مقالات درباره راهکارهای نوآورانه و تکنولوژی‌های روز دنیا
            در این بخش می‌توانید با فناوری‌های مدرن، نکات کاربردی و اخبار ویرامپ آشنا شوید
          </p>
        </div>
      </div>

      <div className="container mt-12">
        <h2 className="font-morabba text-2xl font-medium text-white text-center mb-8">
          محبوب ترین مقالات
        </h2>

        {/* دسته‌بندی‌ها */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-8">
          <ArticlesCategoryTabs 
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {/* جستجو */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات..."
              className="w-full lg:w-64 bg-gray-900/50 border border-gray-700 text-white rounded-full py-3 px-4 pr-10 focus:outline-none focus:border-orange-500"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* لیست مقالات */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <Alert className="mt-6 bg-gray-900/50 border-gray-700">
            <InfoIcon className="text-orange-500" />
            <AlertDescription className="text-gray-300">
              مقاله‌ای برای نمایش پیدا نشد
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}

export default ArticlesPage;