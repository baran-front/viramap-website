// app/solutions/malls/page.tsx
"use client";

import { useEffect, useState } from "react";
import SolutionHero from "@/components/solutions/SolutionHero";
import MallTopSection from "@/components/solutions/MallTopSection";
import MallLowerSection from "@/components/solutions/MallLowerSection";
import { BreadcrumbStructuredData } from "@/components/lib/BreadcrumbStructuredData";

const mallData = {
  title: "مجتمع‌های تجاری و مال‌ها",
  description:
    "مراکز خرید بزرگ با ده‌ها فروشگاه و رستوران، نیازمند سیستم مسیریابی پیشرفته هستند. ویرامپ به مشتریان کمک می‌کند تا فروشگاه‌های مورد نظر خود را سریع‌تر پیدا کنند و از تخفیف‌های ویژه مطلع شوند.",
  features: [
    "نمایش لیستی کامل از  فروشگاه‌ها به همراه جزئیات و تصاویر",
    "یافتن فروشگاه های موردنظر و مسیریابی به آن‌ها",
    "اطلاع رسانی زمانبندی رویداد‌ها و پخش زنده مراسم ها  و رویداد ها",
    "ارسال  اعلانات لحظه‌ای به کاربران و هشدار‌های امنیتی در مواقع اضطراری",
    "نمایش پارکینگ‌های خالی مجتمع  و امکان ذخیره موقعیت پارک خودرو",
    "نمایش تبیلغات زمان‌بندی شده در نزدیک فروشگاه",
  ],
  benefits: [
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
  ],
};

export default function MallsSolutionPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی لودینگ
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">
          در حال بارگذاری راهکار مال‌ها...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        WebkitOverflowScrolling: "touch" as any,
        overscrollBehaviorY: "contain",
      }}
    >
      <BreadcrumbStructuredData
        items={[
          { name: "خانه", url: "/" },
          { name: "راهکارها", url: "/solutions" },
          { name: mallData.title },
        ]}
      />
      {/* Hero Section */}
      <div className="pt-32">
        <SolutionHero
          title={mallData.title}
          description={mallData.description}
        />
      </div>

      {/* Top Section (ویژگی‌های مخصوص مال‌ها) */}
      <div className="py-20 px-4 solutions-section-spacing">
        <div className="max-w-[1480px] mx-auto">
          <MallTopSection
            title="ویرامپ برای مجتمع های تجاری چه امکانی فراهم می‌آورد"
            features={mallData.features}
          />
        </div>
      </div>

      {/* Lower Section (مزایای مخصوص مال‌ها) */}
      <div className="py-20 px-4 solutions-section-spacing">
        <div className="max-w-[1480px] mx-auto">
          <MallLowerSection
            title="مزایای استفاده در مراکز خرید"
            benefits={mallData.benefits}
          />
        </div>
      </div>
    </div>
  );
}
