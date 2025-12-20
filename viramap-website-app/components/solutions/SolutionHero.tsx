// components/solutions/SolutionHero.tsx
"use client";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { GlassSection } from "@/components/ui/glass-section";
import { getHeroByGroupName } from "@/components/lib/fetches/hero";
import type { HeroData } from "@/components/lib/fetches/hero";

interface SolutionHeroProps {
  category?: string;
  // برای backward compatibility - اگر title و description داده شود، از API استفاده نمی‌شود
  title?: string;
  description?: string;
}

/**
 * تبدیل category به groupName برای API
 */
function getGroupNameFromCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    malls: "solution-malls-hero",
    healthcare: "solution-healthcare-hero",
    airports: "solution-airports-hero",
    exhibitions: "solution-exhibitions-hero",
    pilgrimage: "solution-pilgrimage-hero",
    universities: "solution-universities-hero",
    stadiums: "solution-stadiums-hero",
    industrial: "solution-industrial-hero",
  };

  return categoryMap[category] || `solution-${category}-hero`;
}

// Cache ساده برای جلوگیری از درخواست‌های تکراری
const heroCache = new Map<string, { data: HeroData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 دقیقه

export default function SolutionHero({
  category,
  title: propTitle,
  description: propDescription,
}: SolutionHeroProps) {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Memoize groupName برای جلوگیری از محاسبه مجدد
  const groupName = useMemo(() => {
    if (!category) return null;
    return getGroupNameFromCategory(category);
  }, [category]);

  // بررسی cache قبل از درخواست API
  const getCachedData = useCallback((key: string): HeroData | null => {
    const cached = heroCache.get(key);
    if (cached) {
      const now = Date.now();
      if (now - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
      // Cache منقضی شده، حذف می‌کنیم
      heroCache.delete(key);
    }
    return null;
  }, []);

  // ذخیره در cache
  const setCachedData = useCallback((key: string, data: HeroData) => {
    heroCache.set(key, { data, timestamp: Date.now() });
  }, []);

  const fetchHeroData = useCallback(async () => {
    // اگر title و description به صورت props داده شده باشند، از API استفاده نمی‌کنیم
    if (propTitle && propDescription) {
      return;
    }

    // اگر category داده نشده باشد، خطا می‌دهیم
    if (!category || !groupName) {
      setError("دسته‌بندی مشخص نشده است");
      return;
    }

    // بررسی cache
    const cached = getCachedData(groupName);
    if (cached) {
      setHeroData(cached);
      setLoading(false);
      return;
    }

    // لغو درخواست قبلی اگر وجود دارد
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // ایجاد AbortController جدید
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError(null);

      const result = await getHeroByGroupName({ groupName });

      // بررسی اینکه آیا کامپوننت هنوز mount است و درخواست لغو نشده
      if (!isMountedRef.current || abortController.signal.aborted) {
        return;
      }

      if (!result.ok || !result.data) {
        const errorMessage =
          result.error?.message ||
          `اطلاعات Hero برای دسته‌بندی "${category}" یافت نشد`;
        setError(errorMessage);
        return;
      }

      // ذخیره در cache
      setCachedData(groupName, result.data);
      setHeroData(result.data);
    } catch (err) {
      // نادیده گرفتن خطای AbortError
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (!isMountedRef.current) {
        return;
      }

      const errorMessage =
        err instanceof Error
          ? err.message
          : "خطای ناشناخته در دریافت اطلاعات Hero";
      console.error("Error fetching hero data:", err);
      setError(errorMessage);
    } finally {
      if (isMountedRef.current && !abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, [
    category,
    groupName,
    propTitle,
    propDescription,
    getCachedData,
    setCachedData,
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchHeroData();

    // Cleanup: لغو درخواست در صورت unmount
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchHeroData]);

  // استفاده از props اگر داده شده باشند (backward compatibility)
  // Memoize برای جلوگیری از محاسبه مجدد
  const title = useMemo(
    () => propTitle || heroData?.name || "",
    [propTitle, heroData?.name]
  );
  const description = useMemo(
    () => propDescription || heroData?.content || "",
    [propDescription, heroData?.content]
  );

  // نمایش loading state
  if (loading) {
    return (
      <section className="relative w-full flex justify-center items-center min-h-[380px] md:min-h-[340px] lg:min-h-[352px] px-5 md:px-6 lg:px-10 pt-0 md:pt-1 lg:pt-2 pb-6 md:pb-8 lg:pb-10 solution-hero-section">
        <div className="text-white text-lg">در حال بارگذاری...</div>
      </section>
    );
  }

  // نمایش error state
  if (error && !propTitle && !propDescription) {
    return (
      <section className="relative w-full flex justify-center items-center min-h-[380px] md:min-h-[340px] lg:min-h-[352px] px-5 md:px-6 lg:px-10 pt-0 md:pt-1 lg:pt-2 pb-6 md:pb-8 lg:pb-10 solution-hero-section">
        <div className="text-red-400 text-center">
          <p className="mb-2">خطا در بارگذاری اطلاعات</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  // اگر title یا description خالی باشند، چیزی نمایش نمی‌دهیم
  if (!title || !description) {
    return null;
  }

  return (
    <section className="relative w-full flex justify-center items-center min-h-[380px] md:min-h-[340px] lg:min-h-[352px] px-5 md:px-6 lg:px-10 pt-0 md:pt-1 lg:pt-2 pb-6 md:pb-8 lg:pb-10 solution-hero-section">
      <GlassSection
        title={title}
        description={description}
        className="solution-hero-content px-6 md:px-10 lg:px-14 py-12 md:py-14 lg:py-16 gap-5 md:gap-6 rounded-2xl md:rounded-3xl"
        titleAs="div"
        titleClassName="morabba-text flex items-center justify-center text-right w-[90%] min-h-[72px] text-[36px] leading-[54px] text-[#FAFAFA] md:min-h-[80px] md:text-[48px] md:leading-[64px] lg:min-h-[92px] lg:text-[60px] lg:leading-[92px] solution-hero-title pb-0"
        descriptionClassName="yekanbakh-text text-center solution-hero-description w-[720px] max-w-[90%] min-h-[96px] text-base leading-8 text-[#E4E4E7]"
      />
    </section>
  );
}
