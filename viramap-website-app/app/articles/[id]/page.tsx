//app/articles/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DotIcon,
  StarIcon,
  ThumbsUp,
  ThumbsDown,
  User,
  Pencil,
} from "lucide-react";
import ArticleCard from "@/components/modules/articleCard";
import "./ArticleDetail.css";

// کامپوننت فرم نظرات
function ArticleCommentForm({ blogId }: { blogId: number }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // شبیه‌سازی ارسال نظر
    setTimeout(() => {
      console.log("نظر ارسال شد:", { blogId, name, rating, comment });
      setName("");
      setRating(5);
      setComment("");
      setIsSubmitting(false);
      alert("نظر شما با موفقیت ثبت شد!");
    }, 1000);
  };

  return (
    <div className="article-comment-form-container">
      <h2 className="article-comment-form-title">ثبت نظر</h2>
      <form onSubmit={handleSubmit} className="article-comment-form">
        <div className="article-comment-form-row">
          <div className="article-comment-form-input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              className="article-comment-form-input"
              required
            />
            <User className="article-comment-form-icon" />
          </div>
          <div className="article-comment-form-rating-wrapper">
            <label className="article-comment-form-rating-label">
              به مقاله چه امتیازی می‌دهید؟
            </label>
            <div className="article-comment-form-rating">
              <div className="article-comment-form-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="article-comment-form-star-btn"
                  >
                    <StarIcon
                      className={`article-comment-form-star ${
                        star <= rating ? "filled" : "empty"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="article-comment-form-rating-value">
                {rating}/5
              </span>
            </div>
          </div>
        </div>
        <div className="article-comment-form-textarea-wrapper">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="ثبت نظر"
            className="article-comment-form-textarea"
            required
          />
          <Pencil className="article-comment-form-icon" />
        </div>
        <button
          type="submit"
          disabled={
            isSubmitting || !comment.trim() || !name.trim() || rating === 0
          }
          className="article-comment-form-submit"
        >
          {isSubmitting ? "در حال ثبت..." : "ارسال"}
        </button>
      </form>
    </div>
  );
}

// داده‌های نمونه برای مقاله
const mockArticle = {
  id: 1,
  title: "نقش هوش مصنوعی در تحول کسب‌وکارهای نوین",
  summery:
    "هوش مصنوعی چگونه می‌تواند فرآیندهای کسب‌وکار را متحول کند و به رشد اقتصادی کمک نماید؟ در این مقاله به بررسی کاربردهای عملی AI در صنایع مختلف می‌پردازیم.",
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
  authorImage: "/images/article/kitten.png",
  imageUrl: "/images/article/header.png",
  categories: "فناوری, کسب‌وکار",
};

// داده‌های نمونه برای مقالات مرتبط
const mockArticles = [
  {
    id: 1,
    title: "تحول دیجیتال در صنعت بانکداری",
    summery:
      "نقش فناوری در تغییر صنعت مالی و بانکداری. بررسی چالش‌ها و فرصت‌های پیش روی بانک‌ها در عصر دیجیتال و راهکارهای نوین برای ارائه خدمات بهتر به مشتریان.",
    imageUrl: "/images/article/header.png",
    published: "2024-12-10T08:15:00.000Z",
    authorName: "محمد رضایی",
    authorImage: "/images/article/kitten.png",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 2,
    title: "بلاکچین و آینده تراکنش‌ها",
    summery:
      "تأثیر فناوری بلاکچین بر سیستم‌های مالی و تراکنش‌های آینده. بررسی کاربردهای عملی این فناوری در صنایع مختلف و مزایای آن برای امنیت و شفافیت تراکنش‌ها.",
    imageUrl: "/images/article/header.png",
    published: "2024-12-05T14:20:00.000Z",
    authorName: "سارا کریمی",
    authorImage: "/images/article/kitten.png",
    categories: "فناوری",
  },
  {
    id: 3,
    title: "اینترنت اشیاء در زندگی روزمره",
    summery:
      "کاربردهای عملی IoT در خانه‌های هوشمند و زندگی روزمره. بررسی دستگاه‌های هوشمند و تأثیر آن‌ها بر بهبود کیفیت زندگی و بهینه‌سازی مصرف انرژی.",
    imageUrl: "/images/article/header.png",
    published: "2024-12-01T11:45:00.000Z",
    authorName: "رضا احمدی",
    authorImage: "/images/article/kitten.png",
    categories: "فناوری",
  },
  {
    id: 4,
    title: "راهکارهای افزایش بهره‌وری تیم‌های دورکار",
    summery:
      "ابزارها و روش‌های مدیریت تیم‌های دورکار برای افزایش بهره‌وری. بررسی بهترین شیوه‌های ارتباط، هماهنگی و مدیریت پروژه‌ها در محیط کار از راه دور.",
    imageUrl: "/images/article/header.png",
    published: "2024-11-28T09:30:00.000Z",
    authorName: "فاطمه غفاری",
    authorImage: "/images/article/kitten.png",
    categories: "کسب‌وکار",
  },
  {
    id: 5,
    title: "نقش ERP در بهینه‌سازی فرآیندهای سازمانی",
    summery:
      "سیستم‌های ERP چگونه می‌توانند فرآیندهای کسب‌وکار را یکپارچه کرده و کارایی سازمان را افزایش دهند. بررسی مزایای پیاده‌سازی ERP و چالش‌های پیش رو در این مسیر.",
    imageUrl: "/images/article/header.png",
    published: "2024-11-25T10:15:00.000Z",
    authorName: "امیرحسین نوری",
    authorImage: "/images/article/kitten.png",
    categories: "کسب‌وکار, فناوری",
  },
  {
    id: 6,
    title: "راهنمای جامع انتخاب سیستم مدیریت مشتریان (CRM)",
    summery:
      "انتخاب سیستم CRM مناسب برای کسب‌وکار شما. بررسی معیارهای مهم در انتخاب CRM، مقایسه پلتفرم‌های مختلف و راهکارهای پیاده‌سازی موفق این سیستم‌ها.",
    imageUrl: "/images/article/header.png",
    published: "2024-11-22T14:00:00.000Z",
    authorName: "زهرا موسوی",
    authorImage: "/images/article/kitten.png",
    categories: "کسب‌وکار, دیجیتال مارکتینگ",
  },
];

// داده‌های نمونه برای دسته‌بندی‌ها
const mockCategories = [
  { id: 1, title: "فناوری" },
  { id: 2, title: "برنامه‌نویسی" },
  { id: 3, title: "دیجیتال مارکتینگ" },
  { id: 4, title: "طراحی UI/UX" },
  { id: 5, title: "کسب‌وکار" },
  { id: 6, title: "استارتاپ" },
];

// داده‌های نمونه برای نظرات
const mockComments = [
  {
    id: 1,
    userFullName: "احمد محمودی",
    userThumbnail: "/images/article/kitten.png",
    createdOn: "2024-12-14T16:30:00.000Z",
    rate: 5,
    title: "مقاله بسیار عالی",
    text: "تحلیل بسیار جامع و کاربردی بود. مخصوصاً بخش مربوط به کاربردهای عملی خیلی مفید بود.",
    children: [],
  },
  {
    id: 2,
    userFullName: "فاطمه کریمی",
    userThumbnail: "/images/article/kitten.png",
    createdOn: "2024-12-13T09:15:00.000Z",
    rate: 4,
    title: "مفید اما نیاز به جزئیات بیشتر",
    text: "مقاله خوبی بود اما در بخش چالش‌ها می‌توانست عمیق‌تر باشد.",
    children: [
      {
        id: 21,
        userFullName: "مدیر ویرامپ",
        userThumbnail: "/images/article/kitten.png",
        createdOn: "2024-12-13T11:20:00.000Z",
        rate: 0,
        title: "پاسخ",
        text: "سپاس از نظر شما. در مقالات آتی به تفصیل بیشتری به این موضوع خواهیم پرداخت.",
        children: [],
      },
    ],
  },
  {
    id: 3,
    userFullName: "مهران نظری",
    userThumbnail: "/images/article/kitten.png",
    createdOn: "2024-12-12T14:45:00.000Z",
    rate: 5,
    title: "کاربردی و به روز",
    text: "دقیقاً با چالش‌هایی که در شرکت ما وجود داشت تطابق داشت. منتظر مقالات بعدی هستیم.",
    children: [],
  },
];

export default function ArticleDetailPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // فیلتر مقالات بر اساس جستجو
  const filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summery.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header افکت */}
      <div className="article-detail-page overflow-hidden">
        {/* Hero Section - تصویر مقاله در بالای صفحه */}
        <div className="article-hero-section">
          <Image
            src={mockArticle.imageUrl}
            alt={mockArticle.title}
            width={1480}
            height={616}
            className="article-hero-background"
            priority
          />
          <div className="article-hero-overlay" />
          <div className="article-hero-content">
            <h1 className="article-hero-title">{mockArticle.title}</h1>
            <div className="article-hero-divider"></div>
            <div className="article-hero-meta">
              {mockArticle.categories
                .split(", ")
                .map((category, index, array) => (
                  <span key={index}>
                    {category}
                    {index < array.length - 1 && (
                      <span className="article-hero-meta-separator" />
                    )}
                  </span>
                ))}
              <span className="article-hero-meta-separator" />
              <span>{mockArticle.authorName}</span>
              <span className="article-hero-meta-separator" />
              <span>
                {new Date(mockArticle.published).toLocaleDateString("fa-IR")}
              </span>
            </div>
          </div>
        </div>

        {/* محتوا و جزئیات */}
        <div className="article-main-wrapper relative z-10">
          <div className="article-main-content">
            {/* محتوای اصلی مقاله */}
            <div className="article-content-wrapper">
              <h2 className="article-content-title">تایتل بلاگ</h2>
              <div
                className="article-content-body"
                dangerouslySetInnerHTML={{ __html: mockArticle.content }}
              />
              <Image
                src={mockArticle.imageUrl}
                alt={mockArticle.title}
                width={1200}
                height={600}
                className="article-content-image"
              />

              {/* بخش مقالات مرتبط */}
              <div className="related-articles-in-content">
                <div className="related-articles-in-content-header">
                  <h2 className="related-articles-in-content-title">
                    مقالات مرتبط
                  </h2>
                  <Link
                    href="/articles"
                    className="related-articles-in-content-view-all"
                  >
                    <svg
                      className="related-articles-in-content-view-all-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    مشاهده همه
                  </Link>
                </div>
                <div className="related-articles-in-content-container">
                  {mockArticles.slice(0, 2).map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.id}`}
                      className="related-article-in-content-card"
                    >
                      {/* تصویر */}
                      <div className="related-article-in-content-image">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* محتوا */}
                      <div className="related-article-in-content-content">
                        {/* عنوان */}
                        <h3 className="related-article-in-content-title">
                          {article.title}
                        </h3>

                        {/* خلاصه */}
                        <p className="related-article-in-content-description">
                          {article.summery}
                        </p>

                        {/* اطلاعات نویسنده و تاریخ */}
                        <div className="related-article-in-content-author">
                          <div className="related-article-in-content-avatar">
                            <Image
                              src={
                                article.authorImage ||
                                "/images/article/kitten.png"
                              }
                              alt={article.authorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="related-article-in-content-author-info">
                            <p className="related-article-in-content-author-name">
                              {article.authorName}
                            </p>
                            <p className="related-article-in-content-date">
                              {new Date(article.published).toLocaleDateString(
                                "fa-IR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* بخش نظرات کاربران */}
              <div className="user-comments-section">
                <h2 className="user-comments-title">نظرات کاربران</h2>
                <div className="user-comments-list">
                  {/* نظر اول با پاسخ */}
                  <div className="user-comment-card">
                    <div className="user-comment-header">
                      <div className="user-comment-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`user-comment-star ${
                              star <= 5 ? "filled" : "empty"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="user-comment-info">
                        <div className="user-comment-avatar">
                          <Image
                            src="/images/article/kitten.png"
                            alt="شهرام طالبی"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="user-comment-details">
                          <p className="user-comment-name">شهرام طالبی</p>
                          <p className="user-comment-date">۱۴۰۳/۰۹/۰۱</p>
                        </div>
                      </div>
                    </div>
                    <p className="user-comment-text">بسیار عالی و مفید</p>
                    <div className="user-comment-actions">
                      <button className="user-comment-action-btn">
                        <ThumbsDown className="user-comment-action-icon" />
                      </button>
                      <button className="user-comment-action-btn">
                        <ThumbsUp className="user-comment-action-icon" />
                      </button>
                    </div>

                    {/* پاسخ به نظر */}
                    <div className="user-comment-reply">
                      <div className="user-comment-reply-line"></div>
                      <div className="user-comment-card user-comment-reply-card">
                        <div className="user-comment-header">
                          <div className="user-comment-info">
                            <div className="user-comment-avatar">
                              <Image
                                src="/images/article/kitten.png"
                                alt="سمانه جوادی"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="user-comment-details">
                              <p className="user-comment-name">سمانه جوادی</p>
                              <p className="user-comment-date">۱۴۰۳/۰۹/۰۱</p>
                            </div>
                          </div>
                        </div>
                        <p className="user-comment-text">
                          ممنون از بازخورد شما دوست عزیز
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* نظر دوم */}
                  <div className="user-comment-card">
                    <div className="user-comment-header">
                      <div className="user-comment-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`user-comment-star ${
                              star <= 5 ? "filled" : "empty"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="user-comment-info">
                        <div className="user-comment-avatar">
                          <Image
                            src="/images/article/kitten.png"
                            alt="شهرام طالبی"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="user-comment-details">
                          <p className="user-comment-name">شهرام طالبی</p>
                          <p className="user-comment-date">۱۴۰۳/۰۹/۰۱</p>
                        </div>
                      </div>
                    </div>
                    <p className="user-comment-text">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>

                  {/* نظر سوم */}
                  <div className="user-comment-card">
                    <div className="user-comment-header">
                      <div className="user-comment-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`user-comment-star ${
                              star <= 5 ? "filled" : "empty"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="user-comment-info">
                        <div className="user-comment-avatar">
                          <Image
                            src="/images/article/kitten.png"
                            alt="شهرام طالبی"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="user-comment-details">
                          <p className="user-comment-name">شهرام طالبی</p>
                          <p className="user-comment-date">۱۴۰۳/۰۹/۰۱</p>
                        </div>
                      </div>
                    </div>
                    <p className="user-comment-text">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </div>
              </div>

              {/* فرم ثبت نظر */}
              <ArticleCommentForm blogId={mockArticle.id} />
            </div>

            {/* سایدبار */}
            <div className="article-sidebar">
              {/* جستجو */}
              <div className="article-search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی مقاله"
                  className="article-search-input"
                />
                <button className="article-search-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="article-search-icon"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* دسته‌بندی‌ها */}
              <div className="article-sidebar-section">
                <h3 className="article-sidebar-title">دسته بندی ها</h3>
                <div className="article-sidebar-divider"></div>
                <div className="article-sidebar-list">
                  {mockCategories.slice(0, 3).map((category) => (
                    <Link
                      key={category.id}
                      href={`/articles?category=${category.id}`}
                      className="article-sidebar-item"
                    >
                      <span className="article-sidebar-bullet" />
                      <span className="article-sidebar-item-text">
                        {category.title}
                      </span>
                      <span className="article-sidebar-item-count">
                        ۲۳ بلاگ
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* مقالات جدید */}
              <div className="article-sidebar-section">
                <h3 className="article-sidebar-title">مقالات جديد</h3>
                <div className="article-sidebar-divider"></div>
                <div className="article-sidebar-list">
                  {filteredArticles.slice(0, 6).map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.id}`}
                      className="article-sidebar-item"
                    >
                      <span className="article-sidebar-bullet" />
                      <span className="article-sidebar-item-text">
                        {article.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* مقالات محبوب */}
        <div className="container mt-12">
          <h2 className="font-ravi text-2xl font-medium text-white mb-6 text-center">
            مقالات محبوب
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
