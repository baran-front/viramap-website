// components/home/FAQSection/FAQSection.tsx
"use client";

import { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import { fetchFAQs } from "@/components/lib/fetchs";
import { DEFAULT_FAQ_ITEMS } from "@/components/lib/constants/fallbackData";
import { logger } from "@/components/lib/logger";
import "./FAQSection.css";

interface FAQItemData {
  id: number;
  question: string;
  answer: string;
  iconType: "message" | "bezier" | "brush" | "lock" | "cloud" | "headphone";
  isOpen: boolean;
}

// لیست آیکون‌های موجود
const iconTypes: Array<
  "message" | "bezier" | "brush" | "lock" | "cloud" | "headphone"
> = ["message", "bezier", "brush", "lock", "cloud", "headphone"];

// تابع برای انتخاب آیکون بر اساس index
const getIconType = (
  index: number
): "message" | "bezier" | "brush" | "lock" | "cloud" | "headphone" => {
  return iconTypes[index % iconTypes.length];
};

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState<FAQItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchFAQs();

        if (result.ok && Array.isArray(result.data)) {
          // تبدیل داده‌های API به فرمت مورد نیاز کامپوننت
          const allFAQs: FAQItemData[] = [];

          result.data.forEach((category) => {
            category.faqs.forEach((faq: any, index: number) => {
              allFAQs.push({
                id: faq.id,
                question: faq.title,
                answer: faq.description,
                iconType: getIconType(allFAQs.length + index),
                isOpen: false,
              });
            });
          });

          setFaqItems(allFAQs);
        } else {
          setError(result.error?.message || "خطا در دریافت سوالات متداول");
          // در صورت خطا، از داده‌های پیش‌فرض استفاده می‌کنیم
          setFaqItems(DEFAULT_FAQ_ITEMS);
        }
      } catch (err) {
        logger.error("Error fetching FAQs:", err);
        setError("خطای غیرمنتظره در دریافت داده‌ها");
      } finally {
        setIsLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const toggleFAQ = (id: number) => {
    setFaqItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  return (
    <section className="bg-[#141414]/70 backdrop-blur-md py-12 md:py-16 lg:py-20 px-5 sm:px-6 lg:px-8 w-full flex justify-center font-[family-name:Ravi,system-ui]">
      <div className="w-full max-w-[1280px] flex flex-col items-center gap-4 md:gap-6">
        {/* Title Container */}
        <div className="w-full flex flex-col items-center gap-1">
          {/* Badge */}
          <div className="flex flex-row justify-end items-start px-4 py-1.5 gap-6 w-auto min-w-[110px] h-[35px] bg-gradient-to-l from-[rgba(255,255,255,0.05)] to-transparent rounded-lg border border-[#344054]">
            <span className="font-ravi font-normal text-[12px] leading-[22px] text-white text-right">
              سوالات متداول
            </span>
          </div>

          {/* Subtitle */}
          <h2 className="w-full max-w-[361px] font-ravi font-medium text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-[36px] sm:leading-[42px] md:leading-[48px] lg:leading-[57px] text-[#FAFAFA] mt-1 text-center">
            سوالات متداول کاربران
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full flex justify-center items-center py-12">
            <div className="text-[#FAFAFA] font-ravi">در حال بارگذاری...</div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="w-full flex justify-center items-center py-4">
            <div className="text-[#FF6B6B] font-ravi text-sm">{error}</div>
          </div>
        )}

        {/* FAQ Items Grid */}
        {!isLoading && faqItems.length > 0 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 md:gap-6">
              {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={item.isOpen}
                  onToggle={() => toggleFAQ(item.id)}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 md:gap-6">
              {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={item.isOpen}
                  onToggle={() => toggleFAQ(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && faqItems.length === 0 && !error && (
          <div className="w-full flex justify-center items-center py-12">
            <div className="text-[#A1A1AA] font-ravi">سوالی یافت نشد</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
