//app/articles/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { ArticleStructuredData } from "@/components/lib/ArticleStructuredData";
import { BreadcrumbStructuredData } from "@/components/lib/BreadcrumbStructuredData";
import { getArticleDetail, getArticleComments, postArticleComment } from "@/components/lib/articleApi";
import type { ArticleT, ArticleCommentT } from "@/components/lib/articleTypes";
import { getArticleImageUrl, formatArticleDate } from "@/components/lib/articleHelpers";
import ArticleCommentForm from "@/components/templates/articleCommentForm";
import "./ArticleDetail.css";

// کامپوننت نمایش نظرات
function ArticleCommentsList({ comments }: { comments: ArticleCommentT[] }) {
  const renderComment = (comment: ArticleCommentT) => (
    <div key={comment.id} className="user-comment-card">
      <div className="user-comment-header">
        <div className="user-comment-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`user-comment-star ${
                comment.rate && star <= comment.rate ? "filled" : "empty"
              }`}
            />
          ))}
        </div>
        <div className="user-comment-info">
          <div className="user-comment-avatar">
            <Image
              src={comment.userThumbnail || "/images/article/kitten.png"}
              alt={comment.userFullName || "کاربر"}
              fill
              className="object-cover"
            />
          </div>
          <div className="user-comment-details">
            <p className="user-comment-name">{comment.userFullName || "کاربر"}</p>
            <p className="user-comment-date">
              {formatArticleDate(comment.createdOn)}
            </p>
          </div>
        </div>
      </div>
      {comment.title && (
        <p className="user-comment-text">{comment.title}</p>
      )}
      {comment.text && (
        <p className="user-comment-text">{comment.text}</p>
      )}
      {comment.children && comment.children.length > 0 && (
        <div className="user-comment-reply">
          <div className="user-comment-reply-line"></div>
          {comment.children.map((child) => (
            <div key={child.id} className="user-comment-card user-comment-reply-card">
              <div className="user-comment-header">
                <div className="user-comment-info">
                  <div className="user-comment-avatar">
                    <Image
                      src={child.userThumbnail || "/images/article/kitten.png"}
                      alt={child.userFullName || "کاربر"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="user-comment-details">
                    <p className="user-comment-name">{child.userFullName || "کاربر"}</p>
                    <p className="user-comment-date">
                      {formatArticleDate(child.createdOn)}
                    </p>
                  </div>
                </div>
              </div>
              {child.text && (
                <p className="user-comment-text">{child.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="user-comments-section">
      <h2 className="user-comments-title">نظرات کاربران</h2>
      <div className="user-comments-list">
        {comments.length > 0 ? (
          comments.map(renderComment)
        ) : (
          <p className="text-gray-400 text-center py-4">هنوز نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = parseInt(params.id as string, 10);
  
  const [article, setArticle] = useState<ArticleT | null>(null);
  const [articleLoading, setArticleLoading] = useState(true);
  const [comments, setComments] = useState<ArticleCommentT[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // دریافت جزئیات مقاله
  useEffect(() => {
    async function fetchArticle() {
      if (!articleId || isNaN(articleId)) {
        setArticleLoading(false);
        return;
      }

      setArticleLoading(true);
      try {
        const result = await getArticleDetail(articleId);
        setArticle(result);
      } catch (error) {
        console.error("خطا در دریافت مقاله:", error);
      } finally {
        setArticleLoading(false);
      }
    }

    fetchArticle();
  }, [articleId]);

  // دریافت نظرات مقاله
  useEffect(() => {
    async function fetchComments() {
      if (!articleId || isNaN(articleId)) {
        setCommentsLoading(false);
        return;
      }

      setCommentsLoading(true);
      try {
        const result = await getArticleComments({
          blogId: articleId,
          pageNumber: 1,
          pageSize: 50,
          orderBy: ["createdOn"],
        });
        setComments(result);
      } catch (error) {
        console.error("خطا در دریافت نظرات:", error);
      } finally {
        setCommentsLoading(false);
      }
    }

    fetchComments();
  }, [articleId]);

  if (articleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        در حال بارگذاری...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        مقاله یافت نشد
      </div>
    );
  }

  return (
    <>
      {/* Structured Data */}
      <ArticleStructuredData
        title={article.title}
        description={article.summery}
        image={getArticleImageUrl(article.imageUrl)}
        datePublished={article.published}
        authorName={article.authorName}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "خانه", url: "/" },
          { name: "مقالات", url: "/articles" },
          { name: article.title },
        ]}
      />

      {/* Header افکت */}
      <div className="article-detail-page overflow-hidden">
        {/* Hero Section - تصویر مقاله در بالای صفحه */}
        <div className="article-hero-section">
          <Image
            src={getArticleImageUrl(article.imageUrl)}
            alt={article.title}
            width={1480}
            height={616}
            className="article-hero-background"
            priority
          />
          <div className="article-hero-overlay" />
          <div className="article-hero-content">
            <h1 className="article-hero-title">{article.title}</h1>
            <div className="article-hero-divider"></div>
            <div className="article-hero-meta">
              {article.categories
                ? article.categories.split(", ").map((category, index, array) => (
                    <span key={index}>
                      {category}
                      {index < array.length - 1 && (
                        <span className="article-hero-meta-separator" />
                      )}
                    </span>
                  ))
                : null}
              <span className="article-hero-meta-separator" />
              <span>{article.authorName}</span>
              <span className="article-hero-meta-separator" />
              <span>
                {formatArticleDate(article.published)}
              </span>
            </div>
          </div>
        </div>

        {/* محتوا و جزئیات */}
        <div className="article-main-wrapper relative z-10">
          <div className="article-main-content">
            {/* محتوای اصلی مقاله */}
            <div className="article-content-wrapper">
              <h2 className="article-content-title">{article.title}</h2>
              <div
                className="article-content-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              {article.imageUrl && (
                <Image
                  src={getArticleImageUrl(article.imageUrl)}
                  alt={article.title}
                  width={1200}
                  height={600}
                  className="article-content-image"
                />
              )}

              {/* بخش مقالات مرتبط - حذف شده تا از API دریافت شود */}

              {/* بخش نظرات کاربران */}
              {commentsLoading ? (
                <div className="text-center text-gray-300 py-4">در حال بارگذاری نظرات...</div>
              ) : (
                <ArticleCommentsList comments={comments} />
              )}

              {/* فرم ثبت نظر */}
              <ArticleCommentForm blogId={article.id} />
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

              {/* مقالات جدید - حذف شده تا از API دریافت شود */}
            </div>
          </div>
        </div>

        {/* مقالات محبوب - حذف شده تا از API دریافت شود */}
      </div>
    </>
  );
}
