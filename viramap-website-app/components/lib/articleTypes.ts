// Types مطابق contract

export type ArticleCategoryT = {
  id: number;
  title: string;
  locale: string | null;
  image: string | null;
  slug: string | null;
  content: string | null;
};

export type ArticleT = {
  id: number;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  title: string;
  slug: string | null;
  summery: string;
  imageUrl: string | null;
  thumbnail: string | null;
  published: string;
  seoJson: string | null;
  locale: string | null;
  type: number | null;
  tags: string | null;
  categories: string | null;
  content: string;
  commentsCount: number;
  rate: number;
  r1: number | null;
  r2: number | null;
  r3: number | null;
  r4: number | null;
  r5: number | null;
};

export type ArticleCommentT = {
  id: number;
  parentId: number | null;
  children: ArticleCommentT[];
  userId: string;
  userFullName: string | null;
  userThumbnail: string | null;
  title: string | null;
  rate: number | null;
  text: string | null;
  isAccepted: boolean;
  createdOn: string;
};

// API Params Types
export type GetArticlesParamsT = {
  blogPostCategoryId: number | null;
  keyword: string | null;
  pageNumber: number;
  pageSize: number;
  orderBy: string[];
};

export type GetArticleCommentsParamsT = {
  blogId: number;
  pageNumber: number;
  pageSize: number;
  orderBy: string[];
};

export type PostArticleCommentParamsT = {
  blogId: number;
  title: string;
  rate: number;
};
