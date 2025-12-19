// components/lib/api/endpoints.ts
/**
 * تمام endpoint های API در یک مکان مرکزی
 * این فایل منبع واحد حقیقت برای تمام مسیرهای API است
 */

/**
 * Endpoints مربوط به CMS و Hero
 */
export const CMS_ENDPOINTS = {
  heroByGroupName: (groupName: string) => `/v1/cms/client/by-group-name/${groupName}`,
  cmsByGroupName: "/v1/cms/client/by-group-name",
} as const;

/**
 * Endpoints مربوط به مقالات
 */
export const ARTICLE_ENDPOINTS = {
  search: "/v1/blogs/client/search",
  categories: "/v1/blogcategories/client/categories/zerocounter/5",
  detail: (id: number) => `/v1/blogs/client/${id}`,
  commentsSearch: "/v1/blog-comments/client/search",
  commentCreate: "/v1/blog-comments/client/create",
} as const;

/**
 * Endpoints مربوط به منوها
 */
export const MENU_ENDPOINTS = {
  byGroup: "/v1/menulinks/client/groupnames",
} as const;

/**
 * Endpoints مربوط به فرم تماس
 */
export const CONTACT_ENDPOINTS = {
  create: "/v1/contactus/client/create",
} as const;

/**
 * Endpoints مربوط به FAQ
 */
export const FAQ_ENDPOINTS = {
  search: "/v1/faqs/client/search",
} as const;

/**
 * Endpoints مربوط به اسلایدر
 */
export const SLIDER_ENDPOINTS = {
  list: "/slider",
} as const;

/**
 * Endpoints مربوط به راهکارها
 */
export const SOLUTION_ENDPOINTS = {
  list: "/api/solutions-data",
  byCategory: (category: string) => `/solutions-data?category=${category}`,
} as const;

/**
 * تمام endpoints در یک object
 */
export const ENDPOINTS = {
  cms: CMS_ENDPOINTS,
  articles: ARTICLE_ENDPOINTS,
  menus: MENU_ENDPOINTS,
  contact: CONTACT_ENDPOINTS,
  faq: FAQ_ENDPOINTS,
  slider: SLIDER_ENDPOINTS,
  solutions: SOLUTION_ENDPOINTS,
} as const;

