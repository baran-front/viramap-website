// app/solutions/[category]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionChallenges from "@/components/solutions/SolutionChallenges";
import MallTopSection from "@/components/solutions/MallTopSection";
import MallLowerSection from "@/components/solutions/MallLowerSection";
import { BreadcrumbStructuredData } from "@/components/lib/BreadcrumbStructuredData";

interface SolutionData {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  images: string[];
  isMall?: boolean;
}

const mallBenefitsData = [
  {
    title: "افزایش فروش",
    items: [
      "افزایش مدت زمان ماندگاری مشتری",
      "افزایش فروش فروشگاه‌ها",
      "تجربه خرید بهتر",
    ],
  },
  {
    title: "مدیریت بهتر",
    items: [
      "کاهش ازدحام و شلوغی",
      "بهینه‌سازی مسیرهای داخلی",
      "مدیریت پارکینگ",
    ],
  },
  {
    title: "رضایت مشتری",
    items: ["کاهش زمان جستجو", "دسترسی سریع به خدمات", "تجربه خرید لذت‌بخش"],
  },
];

export default function SolutionPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const [data, setData] = useState<SolutionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!category) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/solutions-data?category=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error(`خطا در دریافت داده‌ها: ${response.status}`);
      }

      const result: SolutionData = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطای ناشناخته در دریافت داده‌ها";
      console.error("Error fetching solution data:", err);
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    // اگر مال بود به صفحه مخصوص هدایت کن
    if (category === "malls") {
      router.push("/solutions/malls");
      return;
    }

    fetchData();
  }, [category, router, fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">در حال بارگذاری راهکار...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white">
        <h1 className="text-2xl mb-4">راهکار مورد نظر یافت نشد</h1>
        <p className="mb-6">
          {error || `متأسفیم، راهکار "${category}" وجود ندارد.`}
        </p>
        <a
          href="/solutions"
          className="bg-[#FB6514] hover:bg-[#B2480E] text-white px-6 py-3 rounded-lg transition-colors"
        >
          بازگشت به لیست راهکارها
        </a>
      </div>
    );
  }

  // اگر data.isMall داشت (برای سایر دسته‌ها)
  if (data.isMall) {
    return (
      <div className=" min-h-screen">
        <BreadcrumbStructuredData
          items={[
            { name: "خانه", url: "/" },
            { name: "راهکارها", url: "/solutions" },
            { name: data.title },
          ]}
        />
        <div className="pt-32">
          <SolutionHero category={category} />
        </div>

        <div className="py-20 px-4 solutions-section-spacing">
          <div className="max-w-[1480px] mx-auto">
            <MallTopSection
              title="ویرامپ برای مجتمع های تجاری چه امکانی فراهم می‌آورد"
              features={data.features}
            />
          </div>
        </div>

        <div className="py-16 solutions-section-spacing">
          <SolutionChallenges
            title={`چالش های پیش روی مراجعه کنندگان در ${data.title}`}
            challenges={[]}
            category={category}
          />
        </div>

        <div className="py-20 px-4 solutions-section-spacing">
          <div className="max-w-[1480px] mx-auto">
            <MallLowerSection
              title="مزایای استفاده در مراکز خرید"
              benefits={mallBenefitsData}
            />
          </div>
        </div>
      </div>
    );
  }

  // برای سایر دسته‌ها (غیر مال)
  return (
    <div className="min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "خانه", url: "/" },
          { name: "راهکارها", url: "/solutions" },
          { name: data.title },
        ]}
      />
      <div className="pt-32">
        <SolutionHero category={category} />
      </div>

      <div className="py-16 solutions-section-spacing">
        <SolutionChallenges
          title={`چالش های پیش روی مراجعه کنندگان در ${data.title}`}
          challenges={[]}
          category={category}
        />
      </div>
    </div>
  );
}
