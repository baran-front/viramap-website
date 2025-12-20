// components/lib/api/index.ts
/**
 * Export مرکزی برای تمام ماژول‌های API
 * این فایل نقطه دسترسی واحد برای تمام توابع و انواع API است
 */

// Core API functions
export { safeFetch, authenticate, refreshAccessToken } from "../api";
export type {
  SafeFetchResult,
  SafeFetchOptions,
  AuthResult,
  ApiError,
  TokenResponse,
  CommonHeaders,
} from "../api";

// Shared types
export type {
  ApiResult,
  PagedResult,
  PaginationParams,
} from "./types";

// Shared utilities
export { buildErrorResult, toApiResult } from "./utils";

// Endpoints
export { ENDPOINTS, CMS_ENDPOINTS, ARTICLE_ENDPOINTS, MENU_ENDPOINTS, CONTACT_ENDPOINTS, FAQ_ENDPOINTS, SLIDER_ENDPOINTS, SOLUTION_ENDPOINTS } from "./endpoints";

