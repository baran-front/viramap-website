//app/articles/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DotIcon, SearchIcon, StarIcon } from "lucide-react";
import ArticleCard from "@/components/modules/articleCard";

// کامپوننت فرم نظرات
function ArticleCommentForm({ blogId }: { blogId: number }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // شبیه‌سازی ارسال نظر
    setTimeout(() => {
      console.log("نظر ارسال شد:", { blogId, comment, rating });
      setComment("");
      setRating(0);
      setIsSubmitting(false);
      alert("نظر شما با موفقیت ثبت شد!");
    }, 1000);
  };

  return (
    <div className="card bordered-glassy-card">
      <p className="heading max-lg:text-center">ثبت نظر</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">امتیاز شما</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <StarIcon
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting || !comment.trim()}
          className="w-full"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت نظر"}
        </Button>
      </form>
    </div>
  );
}

// داده‌های نمونه برای مقاله
const mockArticle = {
  id: 1,
  title: "نقش هوش مصنوعی در تحول کسب‌وکارهای نوین",
  summery: "هوش مصنوعی چگونه می‌تواند فرآیندهای کسب‌وکار را متحول کند و به رشد اقتصادی کمک نماید؟ در این مقاله به بررسی کاربردهای عملی AI در صنایع مختلف می‌پردازیم.",
  content: `
    <h2>مقدمه</h2>
    <p>هوش مصنوعی (AI) یکی از انقلابی‌ترین فناوری‌های قرن بیست و یکم است که در حال تغییر شکل صنایع و کسب‌وکارها در سراسر جهان می‌باشد. از اتوماسیون فرآیندهای ساده تا تحلیل‌های پیچیده داده‌ها، AI ظرفیت بی‌نظیری برای بهبود کارایی و ایجاد ارزش افزوده دارد.</p>
    
    <h2>کاربردهای هوش مصنوعی در صنایع</h2>
    <p>در بخش خدمات مالی، الگوریتم‌های هوش مصنوعی می‌توانند الگوهای تراکنش‌ها را تحلیل کرده و تقلب را شناسایی کنند. در صنعت سلامت، سیستم‌های تشخیص تصویر مبتنی بر AI می‌توانند بیماری‌ها را با دقتی بالاتر از متخصصان انسانی تشخیص دهند.</p>
    
    <h2>چالش‌ها و فرصت‌ها</h2>
    <p>اگرچه هوش مصنوعی فرصت‌های بی‌شماری ایجاد کرده است، اما چالش‌هایی مانند نگرانی‌های اخلاقی، حریم خصوصی و تأثیر بر اشتغال نیز به همراه دارد. شرکتها باید راهبردهای مسئولانه‌ای برای بکارگیری این فناوری تدوین کنند.</p>
    
    <h2>نتیجه‌گیری</h2>
    <p>هوش مصنوعی نه یک انتخاب، بلکه یک ضرورت برای کسب‌وکارهای آینده است. سازمان‌هایی که زودتر این فناوری را بپذیرند و یکپارچه کنند، مزیت رقابتی قابل توجهی به دست خواهند آورد.</p>
  `,
  published: "2024-12-15T10:30:00.000Z",
  authorName: "دکتر علی محمدی",
  authorImage: "/images/avatar-placeholder.png",
  imageUrl: "/images/article-sample.jpg",
  categories: "فناوری, کسب‌وکار"
};

// داده‌های نمونه برای مقالات مرتبط
const mockArticles = [
  {
    id: 1,
    title: "تحول دیجیتال در صنعت بانکداری",
    summery: "نقش فناوری در تغییر صنعت مالی و بانکداری",
    imageUrl: "/images/article1.jpg",
    published: "2024-12-10T08:15:00.000Z",
    authorName: "محمد رضایی"
  },
  {
    id: 2,
    title: "بلاکچین و آینده تراکنش‌ها",
    summery: "تأثیر فناوری بلاکچین بر سیستم‌های مالی",
    imageUrl: "/images/article2.jpg",
    published: "2024-12-05T14:20:00.000Z",
    authorName: "سارا کریمی"
  },
  {
    id: 3,
    title: "اینترنت اشیاء در زندگی روزمره",
    summery: "کاربردهای عملی IoT در خانه‌های هوشمند",
    imageUrl: "/images/article3.jpg",
    published: "2024-12-01T11:45:00.000Z",
    authorName: "رضا احمدی"
  }
];

// داده‌های نمونه برای دسته‌بندی‌ها
const mockCategories = [
  { id: 1, title: "فناوری" },
  { id: 2, title: "برنامه‌نویسی" },
  { id: 3, title: "دیجیتال مارکتینگ" },
  { id: 4, title: "طراحی UI/UX" },
  { id: 5, title: "کسب‌وکار" },
  { id: 6, title: "استارتاپ" }
];

// داده‌های نمونه برای نظرات
const mockComments = [
  {
    id: 1,
    userFullName: "احمد محمودی",
    userThumbnail: "/images/avatar-placeholder.png",
    createdOn: "2024-12-14T16:30:00.000Z",
    rate: 5,
    title: "مقاله بسیار عالی",
    text: "تحلیل بسیار جامع و کاربردی بود. مخصوصاً بخش مربوط به کاربردهای عملی خیلی مفید بود.",
    children: []
  },
  {
    id: 2,
    userFullName: "فاطمه کریمی",
    userThumbnail: "/images/avatar-placeholder.png",
    createdOn: "2024-12-13T09:15:00.000Z",
    rate: 4,
    title: "مفید اما نیاز به جزئیات بیشتر",
    text: "مقاله خوبی بود اما در بخش چالش‌ها می‌توانست عمیق‌تر باشد.",
    children: [
      {
        id: 21,
        userFullName: "مدیر ویرامپ",
        userThumbnail: "/images/avatar-placeholder.png",
        createdOn: "2024-12-13T11:20:00.000Z",
        rate: 0,
        title: "پاسخ",
        text: "سپاس از نظر شما. در مقالات آتی به تفصیل بیشتری به این موضوع خواهیم پرداخت.",
        children: []
      }
    ]
  },
  {
    id: 3,
    userFullName: "مهران نظری",
    userThumbnail: "/images/avatar-placeholder.png",
    createdOn: "2024-12-12T14:45:00.000Z",
    rate: 5,
    title: "کاربردی و به روز",
    text: "دقیقاً با چالش‌هایی که در شرکت ما وجود داشت تطابق داشت. منتظر مقالات بعدی هستیم.",
    children: []
  }
];

// کامپوننت ArticleCard نمونه
function MockArticleCard({ article }: { article: any }) {
  return (
    <div className="card bordered-glassy-card hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl || "/images/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-yekan-bakh-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.summery}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">{article.authorName}</span>
          <span className="text-gray-400">
            {new Date(article.published).toLocaleDateString('fa-IR')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ArticleDetailPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // فیلتر مقالات بر اساس جستجو
  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summery.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header افکت */}
      <div className=" overflow-hidden">
        {/* افکت Ellipse */}
        <div 
          className="absolute w-[623px] h-[623px]"
          style={{
            left: "calc(50% - 311.5px - 725.5px)",
            top: "328px",
            background: "rgba(251, 101, 20, 0.1)",
            filter: "blur(250px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* محتوای اصلی مقاله */}
          <div className="lg:col-span-2">
            {/* کارت مقاله */}
            <div className="card bordered-glassy-card">
              <h1 className="font-morabba text-3xl md:text-4xl font-medium text-white mb-6">
                {mockArticle.title}
              </h1>
              
              {/* اطلاعات نویسنده */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={mockArticle.authorImage}
                    alt={mockArticle.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <span>{mockArticle.authorName}</span>
                  <DotIcon className="w-5 h-5 text-primary" />
                  <span>
                    {new Date(mockArticle.published).toLocaleDateString('fa-IR')}
                  </span>
                  <DotIcon className="w-5 h-5 text-primary" />
                  <span>{mockArticle.categories}</span>
                </div>
              </div>

              {/* تصویر اصلی مقاله */}
              <div className="relative w-full h-[400px] md:h-[438px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={mockArticle.imageUrl}
                  alt={mockArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* خلاصه مقاله */}
              <div className="prose prose-invert max-w-none mb-6">
                <p className="font-yekan-bakh text-lg text-gray-300 leading-relaxed">
                  {mockArticle.summery}
                </p>
              </div>

              {/* محتوای کامل مقاله */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: mockArticle.content }}
              />
            </div>
          </div>

          {/* سایدبار */}
          <div className="card bordered-glassy-card lg:h-max lg:sticky lg:top-29">
            {/* جستجو */}
            <div className="flex gap-3 mb-6">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در مقالات..."
                className="flex-1"
              />
              <Button size="icon">
                <SearchIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* مقالات مشابه */}
            <div className="mb-6">
              <h3 className="font-morabba-medium text-xl mb-3">مقالات مشابه</h3>
              <div className="space-y-2">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="block"
                  >
                    <Button className="w-full justify-start" variant="ghost">
                      <DotIcon className="w-4 h-4 ml-2" />
                      <span className="truncate">{article.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* دسته‌بندی‌ها */}
            <div>
              <h3 className="font-morabba-medium text-xl mb-3">دسته‌بندی‌ها</h3>
              <div className="space-y-2">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/articles?category=${category.id}`}
                    className="block"
                  >
                    <Button className="w-full justify-start" variant="ghost">
                      <DotIcon className="w-4 h-4 ml-2" />
                      <span>{category.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* بخش نظرات */}
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* فرم ثبت نظر */}
          <ArticleCommentForm blogId={mockArticle.id} />

          {/* لیست نظرات */}
          <div className="lg:col-span-2">
            <h2 className="font-morabba text-2xl font-medium text-white mb-6">
              نظرات ({mockComments.length})
            </h2>
            
            {mockComments.length > 0 ? (
              <div className="space-y-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="card bordered-glassy-card">
                    {/* نظر اصلی */}
                    <div className="flex items-start gap-3">
                      {/* آواتار کاربر */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={comment.userThumbnail}
                          alt={comment.userFullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* اطلاعات کاربر و نظر */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-yekan-bakh-bold text-white">
                              {comment.userFullName}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {new Date(comment.createdOn).toLocaleDateString('fa-IR')}
                            </p>
                          </div>
                          
                          {/* امتیاز */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= comment.rate
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* متن نظر */}
                        <div className="mt-3">
                          {comment.title && (
                            <h5 className="font-medium text-white mb-2">
                              {comment.title}
                            </h5>
                          )}
                          <p className="text-gray-300 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* پاسخ‌ها */}
                    {comment.children && comment.children.length > 0 && (
                      <div className="mt-4 pr-6 mr-6 border-r-2 border-gray-800 space-y-4">
                        {comment.children.map((child) => (
                          <div key={child.id} className="flex items-start gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={child.userThumbnail}
                                alt={child.userFullName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h5 className="font-yekan-bakh-bold text-white">
                                  {child.userFullName}
                                </h5>
                                <p className="text-sm text-gray-400">
                                  {new Date(child.createdOn).toLocaleDateString('fa-IR')}
                                </p>
                              </div>
                              <p className="text-gray-300 mt-2">
                                {child.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bordered-glassy-card text-center py-8">
                <p className="text-gray-400">هیچ نظری ثبت نشده است</p>
              </div>
            )}
          </div>
        </div>

        {/* مقالات محبوب */}
        <div className="container mt-12">
          <h2 className="font-morabba text-2xl font-medium text-white mb-6 text-center">
            مقالات محبوب
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map((article) => (
              <MockArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}