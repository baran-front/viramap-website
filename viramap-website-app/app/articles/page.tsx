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
  { id: 6, title: "استارتاپ" },
];

const mockArticles = [
  {
    id: 1,
    title: "۲۰ راه حل ساده برای کاهش هزینه های سازمان",
    summery:
      "در این بخش ۲۰ روش ساده و کار آمد برای کاهش هزینه های سازمان که توسط موفق ترین کمپانی های دنیا اجرا شده اند را بررسی می‌کنیم. این راهکارها شامل بهینه‌سازی فرآیندها، استفاده از فناوری‌های نوین و مدیریت منابع می‌باشد.",
    imageUrl: "/images/article1.jpg",
    authorName: "سمانه جوادی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2022-12-05T10:30:00.000Z",
    categories: "کسب‌وکار, مدیریت",
  },
  {
    id: 2,
    title: "نقش هوش مصنوعی در تحول کسب‌وکارهای نوین",
    summery:
      "هوش مصنوعی چگونه می‌تواند فرآیندهای کسب‌وکار را متحول کند و به رشد اقتصادی کمک نماید؟ در این مقاله به بررسی کاربردهای عملی AI در صنایع مختلف می‌پردازیم و راهکارهای پیاده‌سازی آن را بررسی می‌کنیم.",
    imageUrl: "/images/article2.jpg",
    authorName: "دکتر علی محمدی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-12-15T10:30:00.000Z",
    categories: "فناوری, کسب‌وکار",
  },
  {
    id: 3,
    title: "تحول دیجیتال در صنعت بانکداری",
    summery:
      "نقش فناوری در تغییر صنعت مالی و بانکداری. بررسی چالش‌ها و فرصت‌های پیش روی بانک‌ها در عصر دیجیتال و راهکارهای نوین برای ارائه خدمات بهتر به مشتریان.",
    imageUrl: "/images/article3.jpg",
    authorName: "محمد رضایی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-12-10T08:15:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 4,
    title: "بلاکچین و آینده تراکنش‌ها",
    summery:
      "تأثیر فناوری بلاکچین بر سیستم‌های مالی و تراکنش‌های آینده. بررسی کاربردهای عملی این فناوری در صنایع مختلف و مزایای آن برای امنیت و شفافیت تراکنش‌ها.",
    imageUrl: "/images/article4.jpg",
    authorName: "سارا کریمی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-12-05T14:20:00.000Z",
    categories: "فناوری",
  },
  {
    id: 5,
    title: "اینترنت اشیاء در زندگی روزمره",
    summery:
      "کاربردهای عملی IoT در خانه‌های هوشمند و زندگی روزمره. بررسی دستگاه‌های هوشمند و تأثیر آن‌ها بر بهبود کیفیت زندگی و بهینه‌سازی مصرف انرژی.",
    imageUrl: "/images/article5.jpg",
    authorName: "رضا احمدی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-12-01T11:45:00.000Z",
    categories: "فناوری",
  },
  {
    id: 6,
    title: "راهکارهای افزایش بهره‌وری تیم‌های دورکار",
    summery:
      "ابزارها و روش‌های مدیریت تیم‌های دورکار برای افزایش بهره‌وری. بررسی بهترین شیوه‌های ارتباط، هماهنگی و مدیریت پروژه‌ها در محیط کار از راه دور.",
    imageUrl: "/images/article6.jpg",
    authorName: "فاطمه غفاری",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-11-28T09:30:00.000Z",
    categories: "کسب‌وکار",
  },
  {
    id: 7,
    title: "نقش ERP در بهینه‌سازی فرآیندهای سازمانی",
    summery:
      "سیستم‌های ERP چگونه می‌توانند فرآیندهای کسب‌وکار را یکپارچه کرده و کارایی سازمان را افزایش دهند. بررسی مزایای پیاده‌سازی ERP و چالش‌های پیش رو در این مسیر.",
    imageUrl: "/images/article7.jpg",
    authorName: "امیرحسین نوری",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-11-25T10:15:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 8,
    title: "راهنمای جامع انتخاب سیستم مدیریت مشتریان (CRM)",
    summery:
      "انتخاب سیستم CRM مناسب برای کسب‌وکار شما. بررسی معیارهای مهم در انتخاب CRM، مقایسه پلتفرم‌های مختلف و راهکارهای پیاده‌سازی موفق این سیستم‌ها.",
    imageUrl: "/images/article8.jpg",
    authorName: "زهرا موسوی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-11-22T14:00:00.000Z",
    categories: "کسب‌وکار, دیجیتال مارکتینگ",
  },
  {
    id: 9,
    title: "تحلیل داده‌ها و هوش تجاری در تصمیم‌گیری‌های استراتژیک",
    summery:
      "چگونه تحلیل داده‌ها و ابزارهای هوش تجاری می‌توانند به تصمیم‌گیری‌های بهتر در سازمان کمک کنند. بررسی تکنیک‌های تحلیل داده و کاربرد آن‌ها در مدیریت استراتژیک.",
    imageUrl: "/images/article9.jpg",
    authorName: "حسین رضوانی",
    authorImage: "/images/avatar-placeholder.png",
    published: "2024-11-20T11:30:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
];

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // فیلتر مقالات بر اساس دسته‌بندی و جستجو
  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory =
      !selectedCategory ||
      (article.categories && article.categories.includes(selectedCategory));

    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summery.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Page Hero */}
      <div className="relative w-full" style={{ minHeight: "427px" }}>
        {/* Union - Header Background */}
        <div
          className="absolute box-border articles-hero-bg"
          style={{
            width: "1480px",
            maxWidth: "calc(100% - 160px)",
            height: "304px",
            left: "50%",
            transform: "translateX(-50%)",
            top: "123px",
            background: "rgba(250, 250, 250, 0.1)",
            border: "1px solid #3F3F46",
            backdropFilter: "blur(12px)",
            borderRadius: "32px",
          }}
        />

        {/* Ellipse - Hidden */}
        <div
          className="absolute"
          style={{
            width: "384px",
            height: "116px",
            left: "528px",
            top: "386px",
            visibility: "hidden",
          }}
        />

        {/* Content - positioned inside the box */}
        <div
          className="absolute z-10 articles-hero-content"
          style={{
            width: "1280px",
            maxWidth: "calc(100% - 160px)",
            height: "304px",
            left: "50%",
            transform: "translateX(-50%)",
            top: "123px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="w-full px-8 md:px-12 py-8 md:py-12">
            <div className="text-center">
              <h1 className="font-ravi text-4xl md:text-5xl font-medium text-white mb-4">
                اخبار و مقالات
              </h1>
              <p className="font-ravi text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                در بخش اخبار و مقالات، جدید ترین اطلاعات و تحلیل ها درباره ERP و
                مدیریت سازمانی را مطالعه کنید. این محتوا شامل مقالات تخصصی و
                اخبار به روز است تا شما را در بهبود کسب و کارتان یاری دهد.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container mt-12 mx-auto">
          {/* دسته‌بندی‌ها */}
          <div className="mb-6 flex justify-center">
            <ArticlesCategoryTabs
              categories={mockCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* جستجو */}
          <div className="flex gap-3 mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی مقاله"
              className="flex-1 border border-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-orange-500"
              style={{ backgroundColor: "#52525B1A" }}
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 flex items-center justify-center transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* بخش محبوب ترین مقالات */}
          <div className="mb-8">
            <h2 className="font-ravi text-2xl md:text-3xl font-medium text-white text-right mb-4">
              محبوب ترین مقالات
            </h2>
            <p className="font-ravi text-base text-gray-300 text-right leading-relaxed mb-8">
              در این بخش پربازدیدترین و مفیدترین مطالب درباره ERP و مدیریت
              سازمانی را مشاهده کنید. این مقالات توسط کاربران مورد توجه قرار
              گرفته و برای بهبود عملکرد کسب و کار شما توصیه می شوند.
            </p>
          </div>

          {/* لیست مقالات محبوب (فقط 3 مقاله اول) */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12">
              {filteredArticles.slice(0, 3).map((article) => (
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

          {/* بخش جدیدترین مقالات */}
          {filteredArticles.length > 3 && (
            <>
              <div className="mb-8">
                <h2 className="font-ravi text-2xl md:text-3xl font-medium text-white text-right mb-4">
                  جدیدترین مقالات
                </h2>
              </div>

              {/* لیست مقالات جدید (6 مقاله - دو سطر) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredArticles.slice(3, 9).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticlesPage;
