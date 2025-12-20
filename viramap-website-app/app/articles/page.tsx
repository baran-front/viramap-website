//app/articles/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ArticlesCategoryTabs from "@/components/templates/articlesCategoryTabs";
import Link from "next/link";
import ArticleCard from "@/components/modules/articleCard";
import { getArticleCategories } from "@/components/lib/articleApi";
import type { ArticleT, ArticleCategoryT } from "@/components/lib/articleTypes";
import { getArticles } from "@/components/lib/articleApi";
import { getHeroByGroupName } from "@/components/lib/fetches/hero";
import { GlassSection } from "@/components/ui/glass-section";
import { getArticleImageUrl } from "@/components/lib/articleHelpers";

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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<ArticleCategoryT[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleT[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
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
        console.log("نتیجه دریافت دسته‌بندی‌ها:", result);
        setCategories(result);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // دریافت مقالات از API
  useEffect(() => {
    async function fetchArticles() {
      setArticlesLoading(true);
      try {
        const result = await getArticles({
          blogPostCategoryId: selectedCategory,
          keyword: searchQuery || null,
          pageNumber: 1,
          pageSize: 50,
          orderBy: ["published"],
        });
        console.log("نتیجه دریافت مقالات:", result);
        setArticles(result);
      } catch (error) {
        console.error("خطا در دریافت مقالات:", error);
      } finally {
        setArticlesLoading(false);
      }
    }

    fetchArticles();
  }, [selectedCategory, searchQuery]);

  // تبدیل ArticleT به فرمت مورد نیاز ArticleCard
  const articlesForCard = articles.map((article) => ({
    id: article.id,
    title: article.title,
    summery: article.summery,
    imageUrl: getArticleImageUrl(article.imageUrl),
    authorName: article.authorName,
    authorImage: article.authorImage || "/images/article/kitten.png",
    published: article.published,
    categories: article.categories || "",
  }));

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
                categories={categories.map((cat) => ({
                  id: cat.id,
                  title: cat.title,
                }))}
                selectedCategory={selectedCategory ? categories.find(c => c.id === selectedCategory)?.title || null : null}
                onCategoryChange={(title) => {
                  if (!title) {
                    setSelectedCategory(null);
                  } else {
                    const cat = categories.find(c => c.title === title);
                    setSelectedCategory(cat ? cat.id : null);
                  }
                }}
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
          {articlesLoading ? (
            <div className="mt-6 text-center text-gray-300">در حال بارگذاری...</div>
          ) : articlesForCard.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12">
                {articlesForCard.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* بخش جدیدترین مقالات */}
              {articlesForCard.length > 3 && (
                <>
                  <div className="mb-8">
                    <h2 className="font-ravi text-2xl md:text-3xl font-medium text-white text-right mb-4">
                      جدیدترین مقالات
                    </h2>
                  </div>

                  {/* لیست مقالات جدید (6 مقاله - دو سطر) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {articlesForCard.slice(3, 9).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <Alert className="mt-6 bg-gray-900/50 border-gray-700">
              <InfoIcon className="text-orange-500" />
              <AlertDescription className="text-gray-300">
                مقاله‌ای برای نمایش پیدا نشد
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticlesPage;
