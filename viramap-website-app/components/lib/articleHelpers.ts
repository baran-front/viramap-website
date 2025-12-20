// Helper functions برای مقالات

/**
 * فرمت کردن تاریخ مقاله
 */
export function formatArticleDate(date: string, locale = "fa"): string {
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return date;
    }
    return dateObj.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

/**
 * دریافت URL کامل تصویر مقاله
 */
export function getArticleImageUrl(
  imageUrl: string | null,
  baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
): string {
  if (!imageUrl) {
    return "/images/article/header.png";
  }
  
  // اگر URL کامل است (شروع با http یا https)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  
  // اگر با / شروع می‌شود، از baseUrl استفاده می‌کنیم
  if (imageUrl.startsWith("/")) {
    return baseUrl ? `${baseUrl}${imageUrl}` : imageUrl;
  }
  
  // در غیر این صورت، baseUrl + / + imageUrl
  return baseUrl ? `${baseUrl}/${imageUrl}` : `/${imageUrl}`;
}

/**
 * دریافت URL کامل مقاله
 */
export function getArticleUrl(
  articleId: number,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL
): string {
  const base = siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/articles/${articleId}`;
}

/**
 * محاسبه میانگین امتیاز مقاله از r1 تا r5
 */
export function calculateArticleRating(article: {
  r1: number | null
  r2: number | null
  r3: number | null
  r4: number | null
  r5: number | null
}): number {
  const ratings: number[] = [];
  
  if (article.r1 !== null && !isNaN(article.r1)) {
    ratings.push(article.r1);
  }
  if (article.r2 !== null && !isNaN(article.r2)) {
    ratings.push(article.r2);
  }
  if (article.r3 !== null && !isNaN(article.r3)) {
    ratings.push(article.r3);
  }
  if (article.r4 !== null && !isNaN(article.r4)) {
    ratings.push(article.r4);
  }
  if (article.r5 !== null && !isNaN(article.r5)) {
    ratings.push(article.r5);
  }
  
  if (ratings.length === 0) {
    return 0;
  }
  
  const sum = ratings.reduce((acc, val) => acc + val, 0);
  return sum / ratings.length;
}

