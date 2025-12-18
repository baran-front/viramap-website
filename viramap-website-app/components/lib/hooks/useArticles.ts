import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getArticles,
  type ApiResult,
  type GetArticlesParams,
  type GetArticlesResponse,
  type ArticleSummary,
} from "@/components/lib/apiFunctions";

// ==================== Types ====================

export type ArticlesSortField = "published" | "title" | "authorName";
export type SortDirection = "asc" | "desc";

export interface ArticlesSortState {
  field: ArticlesSortField;
  direction: SortDirection;
}

export interface UseArticlesFilters {
  categoryId?: number;
  search?: string;
  tagIds?: number[];
  sort?: ArticlesSortState;
}

export interface UseArticlesOptions {
  /** Initial page index (1-based). Default: 1 */
  initialPage?: number;
  /** Page size sent to the API. Default: 9 */
  pageSize?: number;
  /** Debounce delay for search, in milliseconds. Default: 400 */
  searchDebounceMs?: number;
  /** Automatically refetch when filters, page or sort change. Default: true */
  autoRefetch?: boolean;
  /** Use infinite scroll mode (append pages). Default: false */
  infiniteScroll?: boolean;
  /** Enable simple in-memory cache by query key. Default: true */
  useCache?: boolean;
  /** Initial filters */
  initialFilters?: UseArticlesFilters;
}

export interface UseArticlesState {
  articles: ArticleSummary[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
  filters: UseArticlesFilters;
  /** Last successful raw response (paged) */
  lastResult: GetArticlesResponse | null;
}

export interface UseArticlesActions {
  /** Manually trigger fetch with optional overrides */
  fetchArticles: (overrides?: Partial<GetArticlesParams>) => Promise<void>;
  /** Change current page (paginated mode) */
  setPage: (page: number) => void;
  /** Navigate to the next / previous page (paginated mode) */
  nextPage: () => void;
  prevPage: () => void;
  /** Update search term (debounced refetch) */
  setSearch: (search: string) => void;
  /** Filter by category id */
  setCategory: (categoryId: number | undefined) => void;
  /** Update tag filters */
  setTagIds: (tagIds: number[] | undefined) => void;
  /** Update sorting */
  setSort: (sort: ArticlesSortState | undefined) => void;
  /** Reset all filters and page to initial values */
  resetFilters: () => void;
  /** Retry last failed request, if any */
  retry: () => Promise<void>;
  /** Infinite scroll: load next page and append results */
  loadMore: () => Promise<void>;
}

export interface UseArticlesReturn extends UseArticlesState, UseArticlesActions {}

// ==================== Helpers ====================

type ArticlesQueryKey = {
  page: number;
  pageSize: number;
  filters: UseArticlesFilters;
};

function buildQueryKey(key: ArticlesQueryKey): string {
  return JSON.stringify({
    p: key.page,
    s: key.pageSize,
    c: key.filters.categoryId ?? null,
    q: key.filters.search ?? "",
    t: key.filters.tagIds ?? [],
    sf: key.filters.sort?.field ?? null,
    sd: key.filters.sort?.direction ?? null,
  });
}

function sortClientSide(
  items: ArticleSummary[],
  sort?: ArticlesSortState
): ArticleSummary[] {
  if (!sort) return items;

  const { field, direction } = sort;
  const factor = direction === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    let av: string | number | Date | undefined;
    let bv: string | number | Date | undefined;

    switch (field) {
      case "published":
        av = new Date(a.published);
        bv = new Date(b.published);
        break;
      case "title":
        av = a.title;
        bv = b.title;
        break;
      case "authorName":
        av = a.authorName;
        bv = b.authorName;
        break;
      default:
        return 0;
    }

    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;

    if (av instanceof Date && bv instanceof Date) {
      return (av.getTime() - bv.getTime()) * factor;
    }

    const as = String(av).toLocaleLowerCase();
    const bs = String(bv).toLocaleLowerCase();
    if (as < bs) return -1 * factor;
    if (as > bs) return 1 * factor;
    return 0;
  });
}

// ==================== Main Hook ====================

export function useArticles(options: UseArticlesOptions = {}): UseArticlesReturn {
  const {
    initialPage = 1,
    pageSize: initialPageSize = 9,
    searchDebounceMs = 400,
    autoRefetch = true,
    infiniteScroll = false,
    useCache = true,
    initialFilters = {},
  } = options;

  // Core state
  const [page, setPageState] = useState<number>(initialPage);
  const [pageSize] = useState<number>(initialPageSize);
  const [filters, setFilters] = useState<UseArticlesFilters>(initialFilters);
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<GetArticlesResponse | null>(null);

  // Derived state
  const totalPages = useMemo(
    () => (pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0),
    [totalCount, pageSize]
  );

  const hasMore = useMemo(
    () => (infiniteScroll ? articles.length < totalCount : page < totalPages),
    [articles.length, totalCount, page, totalPages, infiniteScroll]
  );

  // Debounced search handling
  const [searchInput, setSearchInput] = useState<string>(initialFilters.search ?? "");
  const searchDebounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cache & retry tracking
  const cacheRef = useRef<Map<string, GetArticlesResponse>>(new Map());
  const lastQueryKeyRef = useRef<string | null>(null);
  const lastQueryParamsRef = useRef<GetArticlesParams | null>(null);

  const applyResponse = useCallback(
    (response: GetArticlesResponse, mode: "replace" | "append") => {
      const items = response.items ?? [];
      setTotalCount(response.totalCount ?? items.length);
      setLastResult(response);

      const sortedItems = sortClientSide(items, filters.sort);

      if (infiniteScroll && mode === "append") {
        setArticles((prev) =>
          sortClientSide([...prev, ...sortedItems], filters.sort)
        );
      } else {
        setArticles(sortedItems);
      }
    },
    [filters.sort, infiniteScroll]
  );

  const doFetch = useCallback(
    async (
      baseParams: GetArticlesParams,
      mode: "replace" | "append"
    ): Promise<void> => {
      const queryKey = buildQueryKey({
        page: baseParams.page,
        pageSize: baseParams.pageSize,
        filters,
      });

      lastQueryKeyRef.current = queryKey;
      lastQueryParamsRef.current = baseParams;

      // Serve from cache if available
      if (useCache && cacheRef.current.has(queryKey)) {
        const cached = cacheRef.current.get(queryKey)!;
        applyResponse(cached, mode);
        return;
      }

      setLoading(true);
      setError(null);

      let result: ApiResult<GetArticlesResponse>;

      try {
        result = await getArticles(baseParams);
      } catch (err) {
        console.error("Error calling getArticles:", err);
        setError(
          err instanceof Error
            ? err.message
            : "خطای ناشناخته در ارتباط با سرور مقالات"
        );
        setLoading(false);
        return;
      }

      setLoading(false);

      if (!result.ok || !result.data) {
        const message =
          result.error?.message ||
          `خطا در دریافت مقالات (کد وضعیت: ${result.status})`;
        setError(message);
        return;
      }

      const paged = result.data;

      // Cache successful result
      if (useCache) {
        cacheRef.current.set(queryKey, paged);
      }

      applyResponse(paged, mode);
    },
    [applyResponse, filters, useCache]
  );

  const fetchArticles = useCallback(
    async (overrides?: Partial<GetArticlesParams>): Promise<void> => {
      const baseParams: GetArticlesParams = {
        page,
        pageSize,
        categoryId: filters.categoryId,
        search: filters.search,
        tagIds: filters.tagIds,
        ...overrides,
      };

      const mode: "replace" | "append" =
        infiniteScroll && overrides?.page && overrides.page > page
          ? "append"
          : "replace";

      await doFetch(baseParams, mode);
    },
    [doFetch, page, pageSize, filters, infiniteScroll]
  );

  const setPage = useCallback(
    (newPage: number) => {
      if (newPage <= 0) newPage = 1;
      setPageState(newPage);
    },
    []
  );

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const prevPage = useCallback(() => {
    setPage(page > 1 ? page - 1 : 1);
  }, [page, setPage]);

  const setSearch = useCallback(
    (search: string) => {
      setSearchInput(search);

      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current);
      }

      searchDebounceTimeout.current = setTimeout(() => {
        setFilters((prev) => ({
          ...prev,
          search: search.trim() || undefined,
        }));
        setPageState(1);
      }, searchDebounceMs);
    },
    [searchDebounceMs]
  );

  const setCategory = useCallback((categoryId: number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      categoryId,
    }));
    setPageState(1);
  }, []);

  const setTagIds = useCallback((tagIds: number[] | undefined) => {
    setFilters((prev) => ({
      ...prev,
      tagIds,
    }));
    setPageState(1);
  }, []);

  const setSort = useCallback((sort: ArticlesSortState | undefined) => {
    setFilters((prev) => ({
      ...prev,
      sort,
    }));
    setPageState(1);

    // Also sort currently loaded items immediately on client
    setArticles((prev) => sortClientSide(prev, sort));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchInput(initialFilters.search ?? "");
    setPageState(initialPage);
    setError(null);
  }, [initialFilters, initialPage]);

  const retry = useCallback(async (): Promise<void> => {
    if (!lastQueryParamsRef.current) {
      // If we never fetched before, start with current state
      await fetchArticles();
      return;
    }

    const mode: "replace" | "append" =
      infiniteScroll && lastQueryParamsRef.current.page > page
        ? "append"
        : "replace";

    await doFetch(lastQueryParamsRef.current, mode);
  }, [doFetch, fetchArticles, infiniteScroll, page]);

  const loadMore = useCallback(async (): Promise<void> => {
    if (!infiniteScroll || !hasMore) return;

    const next = page + 1;
    setPageState(next);

    const params: GetArticlesParams = {
      page: next,
      pageSize,
      categoryId: filters.categoryId,
      search: filters.search,
      tagIds: filters.tagIds,
    };

    await doFetch(params, "append");
  }, [infiniteScroll, hasMore, page, pageSize, filters, doFetch]);

  // Auto refetch when filters / page change
  useEffect(() => {
    if (!autoRefetch) return;

    fetchArticles();
  }, [
    autoRefetch,
    page,
    pageSize,
    filters.categoryId,
    filters.search,
    filters.tagIds,
    filters.sort?.field,
    filters.sort?.direction,
    fetchArticles,
  ]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current);
      }
    };
  }, []);

  return {
    // State
    articles,
    loading,
    error,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasMore,
    filters: {
      ...filters,
      search: (filters.search ?? searchInput) || undefined,
    },
    lastResult,

    // Actions
    fetchArticles,
    setPage,
    nextPage,
    prevPage,
    setSearch,
    setCategory,
    setTagIds,
    setSort,
    resetFilters,
    retry,
    loadMore,
  };
}


