//app/articles/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ArticlesCategoryTabs from "@/components/templates/articlesCategoryTabs";
import Link from "next/link";
import ArticleCard from "@/components/modules/articleCard";
import { getArticleCategories, type ArticleCategory } from "@/components/lib/apiFunctions";
import { getHeroByGroupName } from "@/components/lib/fetches/hero";
import { GlassSection } from "@/components/ui/glass-section";

const mockArticles = [
  {
    id: 1,
    title: "۲۰ راه حل ساده برای کاهش هزینه های سازمان",
    summery:
      "در این بخش ۲۰ روش ساده و کار آمد برای کاهش هزینه های سازمان که توسط موفق ترین کمپانی های دنیا اجرا شده اند را بررسی می‌کنیم. این راهکارها شامل بهینه‌سازی فرآیندها، استفاده از فناوری‌های نوین و مدیریت منابع می‌باشد.",
    imageUrl: "/images/article/header.png",
    authorName: "سمانه جوادی",
    authorImage: "/images/article/kitten.png",
    published: "2022-12-05T10:30:00.000Z",
    categories: "کسب‌وکار, مدیریت",
  },
  {
    id: 2,
    title: "نقش هوش مصنوعی در تحول کسب‌وکارهای نوین",
    summery:
      "هوش مصنوعی چگونه می‌تواند فرآیندهای کسب‌وکار را متحول کند و به رشد اقتصادی کمک نماید؟ در این مقاله به بررسی کاربردهای عملی AI در صنایع مختلف می‌پردازیم و راهکارهای پیاده‌سازی آن را بررسی می‌کنیم.",
    imageUrl: "/images/article/header.png",
    authorName: "دکتر علی محمدی",
    authorImage: "/images/article/kitten.png",
    published: "2024-12-15T10:30:00.000Z",
    categories: "فناوری, کسب‌وکار",
  },
  {
    id: 3,
    title: "تحول دیجیتال در صنعت بانکداری",
    summery:
      "نقش فناوری در تغییر صنعت مالی و بانکداری. بررسی چالش‌ها و فرصت‌های پیش روی بانک‌ها در عصر دیجیتال و راهکارهای نوین برای ارائه خدمات بهتر به مشتریان.",
    imageUrl: "/images/article/header.png",
    authorName: "محمد رضایی",
    authorImage: "/images/article/kitten.png",
    published: "2024-12-10T08:15:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 4,
    title: "بلاکچین و آینده تراکنش‌ها",
    summery:
      "تأثیر فناوری بلاکچین بر سیستم‌های مالی و تراکنش‌های آینده. بررسی کاربردهای عملی این فناوری در صنایع مختلف و مزایای آن برای امنیت و شفافیت تراکنش‌ها.",
    imageUrl: "/images/article/header.png",
    authorName: "سارا کریمی",
    authorImage: "/images/article/kitten.png",
    published: "2024-12-05T14:20:00.000Z",
    categories: "فناوری",
  },
  {
    id: 5,
    title: "اینترنت اشیاء در زندگی روزمره",
    summery:
      "کاربردهای عملی IoT در خانه‌های هوشمند و زندگی روزمره. بررسی دستگاه‌های هوشمند و تأثیر آن‌ها بر بهبود کیفیت زندگی و بهینه‌سازی مصرف انرژی.",
    imageUrl: "/images/article/header.png",
    authorName: "رضا احمدی",
    authorImage: "/images/article/kitten.png",
    published: "2024-12-01T11:45:00.000Z",
    categories: "فناوری",
  },
  {
    id: 6,
    title: "راهکارهای افزایش بهره‌وری تیم‌های دورکار",
    summery:
      "ابزارها و روش‌های مدیریت تیم‌های دورکار برای افزایش بهره‌وری. بررسی بهترین شیوه‌های ارتباط، هماهنگی و مدیریت پروژه‌ها در محیط کار از راه دور.",
    imageUrl: "/images/article/header.png",
    authorName: "فاطمه غفاری",
    authorImage: "/images/article/kitten.png",
    published: "2024-11-28T09:30:00.000Z",
    categories: "کسب‌وکار",
  },
  {
    id: 7,
    title: "نقش ERP در بهینه‌سازی فرآیندهای سازمانی",
    summery:
      "سیستم‌های ERP چگونه می‌توانند فرآیندهای کسب‌وکار را یکپارچه کرده و کارایی سازمان را افزایش دهند. بررسی مزایای پیاده‌سازی ERP و چالش‌های پیش رو در این مسیر.",
    imageUrl: "/images/article/header.png",
    authorName: "امیرحسین نوری",
    authorImage: "/images/article/kitten.png",
    published: "2024-11-25T10:15:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 8,
    title: "راهنمای جامع انتخاب سیستم مدیریت مشتریان (CRM)",
    summery:
      "انتخاب سیستم CRM مناسب برای کسب‌وکار شما. بررسی معیارهای مهم در انتخاب CRM، مقایسه پلتفرم‌های مختلف و راهکارهای پیاده‌سازی موفق این سیستم‌ها.",
    imageUrl: "/images/article/header.png",
    authorName: "زهرا موسوی",
    authorImage: "/images/article/kitten.png",
    published: "2024-11-22T14:00:00.000Z",
    categories: "کسب‌وکار, دیجیتال مارکتینگ",
  },
  {
    id: 9,
    title: "تحلیل داده‌ها و هوش تجاری در تصمیم‌گیری‌های استراتژیک",
    summery:
      "چگونه تحلیل داده‌ها و ابزارهای هوش تجاری می‌توانند به تصمیم‌گیری‌های بهتر در سازمان کمک کنند. بررسی تکنیک‌های تحلیل داده و کاربرد آن‌ها در مدیریت استراتژیک.",
    imageUrl: "/images/article/header.png",
    authorName: "حسین رضوانی",
    authorImage: "/images/article/kitten.png",
    published: "2024-11-20T11:30:00.000Z",
    categories: "کسب‌وکار, فناوری",
  },
];

interface ArticlesHeroProps {
  title?: string;
  description?: string;
}

function ArticlesHero({ title, description }: ArticlesHeroProps) {
  const titleText = title ?? "اخبار و مقالات";
  const descriptionText =
    description ??
    "در بخش اخبار و مقالات، جدید ترین اطلاعات و تحلیل ها درباره ERP و مدیریت سازمانی را مطالعه کنید. این محتوا شامل مقالات تخصصی و اخبار به روز است تا شما را در بهبود کسب و کارتان یاری دهد.";

  return (
    <div
      className="relative w-full articles-hero-container min-h-[427px]"
    >
      {/* Union - Header Background */}
      <div
        className="absolute box-border articles-hero-bg h-[304px] top-[123px] rounded-[32px]"
      />

      {/* Ellipse - Hidden */}
      <div
        className="absolute w-[384px] h-[116px] left-[528px] top-[386px] invisible"
      />

      {/* Content - positioned inside the box */}
      <div
        className="absolute z-10 articles-hero-content h-[304px] top-[123px] flex items-center justify-center"
      >
        <GlassSection
          title={titleText}
          description={descriptionText}
          className="w-full h-full px-8 md:px-12 md:py-12 border-0 bg-transparent backdrop-blur-none rounded-none min-h-0"
          titleClassName="font-ravi text-4xl md:text-5xl font-medium text-white mb-4 pb-0 text-center"
          descriptionClassName="font-ravi text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto px-4 text-center"
        />
      </div>
    </div>
  );
}

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [heroTitle, setHeroTitle] = useState<string | undefined>(undefined);
  const [heroDescription, setHeroDescription] = useState<string | undefined>(undefined);
  const [heroLoading, setHeroLoading] = useState(true);

  // تابع برای استخراج متن از HTML
  const extractTextFromHTML = (html: string): string => {
    // حذف تگ‌های HTML و تبدیل entity ها
    let text = html
      .replace(/<[^>]*>/g, "") // حذف تمام تگ‌های HTML
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/\s+/g, " ") // تبدیل فضاهای متعدد به یک فضا
      .trim();
    return text;
  };

  // دریافت داده‌های Hero از API
  useEffect(() => {
    async function fetchHero() {
      setHeroLoading(true);
      try {
        const result = await getHeroByGroupName({ groupName: "hero-articles" });
        console.log("نتیجه دریافت Hero:", {
          ok: result.ok,
          hasData: !!result.data,
          error: result.error,
          status: result.status,
        });

        if (result.ok && result.data) {
          // استفاده از name به عنوان title
          setHeroTitle(result.data.name);
          
          // استخراج متن از content HTML
          const descriptionText = extractTextFromHTML(result.data.content);
          setHeroDescription(descriptionText);
        } else {
          console.error(
            "خطا در دریافت Hero:",
            result.error || result.status || "خطای نامشخص"
          );
        }
      } catch (error) {
        console.error("خطا در دریافت Hero:", error);
      } finally {
        setHeroLoading(false);
      }
    }

    fetchHero();
  }, []);

  // دریافت دسته‌بندی‌ها از API
  useEffect(() => {
    async function fetchCategories() {
      setCategoriesLoading(true);
      try {
        const result = await getArticleCategories();
        console.log("نتیجه دریافت دسته‌بندی‌ها:", {
          ok: result.ok,
          hasData: !!result.data,
          error: result.error,
          status: result.status,
        });

        if (result.ok && result.data) {
          setCategories(result.data);
        } else {
          console.error(
            "خطا در دریافت دسته‌بندی‌ها:",
            result.error || result.status || "خطای نامشخص"
          );
        }
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

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
      <ArticlesHero title={heroTitle} description={heroDescription} />

      <div className="w-full">
        <div className="container mt-12 mx-auto">
          {/* دسته‌بندی‌ها */}
          <div className="mb-6 w-full">
            {!categoriesLoading && (
              <ArticlesCategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}
          </div>

          {/* جستجو */}
          <div className="flex gap-3 mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی مقاله"
              className="flex-1 border border-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-orange-500 bg-[#52525B1A]"
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
