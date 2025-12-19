// app/technologies/page.tsx
"use client";

import { useEffect, useState } from "react";
import TechnologiesHero from "@/components/technologies/TechnologiesHero";
import TechnologiesSection2 from "@/components/technologies/TechnologiesSection2";
import TechnologiesSection3 from "@/components/technologies/TechnologiesSection3";
import { getHeroByGroupName } from "@/components/lib/fetches/hero";

const technologiesData = {
  hero: {
    title: "تکنولوژی‌های ویرامپ",
    description:
      "ویرامپ با استفاده از پیشرفته‌ترین تکنولوژی‌های مسیریابی و موقعیت‌یابی داخلی، راهکارهایی دقیق و کارآمد برای محیط‌های مختلف ارائه می‌دهد.",
  },
  section2: {
    badgeText: " زیرساخت موردنیاز",
    title: "  ما روی چیزهایی کار می‌کنیم که شما از قبل دارید",
    description:
      "فناوری اصلی پشت پلتفرم ویرا مپ IPS (سیستم موقعیت‌یابی داخلی) و راه‌حل‌های ناوبری داخلی و راه‌یابی آن، الگوریتمی است که اطلاعات از قبل موجود در محیط (میدان‌های مغناطیسی، بلوتوث، وای‌فای) را با داده‌های حسگرهای اینرسی داخل گوشی‌های هوشمند (قطب‌نما، ژیروسکوپ و شتاب‌سنج) ادغام می‌کند. ) برای ارائه مکان واقعی در فضای داخلی با دقت کمتر از 5 متر بدون نیاز به موارد اضافی سخت افزار",
    features: [
      {
        id: 1,
        icon: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 16C29.5228 16 34 20.4772 34 26C34 31.5228 29.5228 36 24 36C18.4772 36 14 31.5228 14 26C14 20.4772 18.4772 16 24 16Z"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
            <path
              d="M24 8V16"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M24 36V44"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 24H16"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M32 24H40"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
        title: "موقعیت‌یابی دقیق",
      },
      {
        id: 2,
        icon: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 32L32 16"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M28 20L36 12"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 36L20 28"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
        title: "مسیریابی بهینه",
      },
      {
        id: 3,
        icon: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
            <path
              d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
          </svg>
        ),
        title: "تحلیل داده",
      },
    ],
  },
  section3: {
    title: " برای ارائه مزایای مورد نیاز...",
  },
};

export default function TechnologiesPage() {
  const [loading, setLoading] = useState(true);
  const [heroTitle, setHeroTitle] = useState<string>("تکنولوژی‌های ویرامپ");
  const [heroDescription, setHeroDescription] = useState<string>(
    "ویرامپ با استفاده از پیشرفته‌ترین تکنولوژی‌های مسیریابی و موقعیت‌یابی داخلی، راهکارهایی دقیق و کارآمد برای محیط‌های مختلف ارائه می‌دهد."
  );

  // تابع برای استخراج متن از HTML
  const extractTextFromHTML = (html: string): string => {
    let text = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    return text;
  };

  // دریافت داده‌های Hero از API
  useEffect(() => {
    async function fetchHero() {
      try {
        const result = await getHeroByGroupName({ groupName: "hero-technologies" });
        if (result.ok && result.data) {
          setHeroTitle(result.data.name);
          const descriptionText = extractTextFromHTML(result.data.content);
          setHeroDescription(descriptionText);
        }
      } catch (error) {
        console.error("خطا در دریافت Hero:", error);
      }
    }

    fetchHero();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="text-white text-lg">
          در حال بارگذاری صفحه تکنولوژی‌ها...
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="pt-8">
        <TechnologiesHero
          title={heroTitle}
          description={heroDescription}
        />
      </div>

      {/* Section 2 - Technologies Overview */}
      <div className="py-2 px-4">
        <div className="max-w-[1480px] mx-auto">
          <TechnologiesSection2
            badgeText={technologiesData.section2.badgeText}
            title={technologiesData.section2.title}
            description={technologiesData.section2.description}
          />
        </div>
      </div>

      {/* Section 3 - Benefits Image */}
      <div className="py-2 px-4 pb-8">
        <div className="max-w-[1480px] mx-auto">
          <TechnologiesSection3 title={technologiesData.section3.title} />
        </div>
      </div>
    </div>
  );
}
