// components/home/CTASection/CTASection.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchHeaderMenu } from "@/components/lib/fetchs";
import type { HeaderMenuItem } from "@/components/lib/fetchs";

const CTASection = () => {
  const router = useRouter();
  const [ctaData, setCtaData] = useState<HeaderMenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCTAData = async () => {
      try {
        const result = await fetchHeaderMenu("cta-home");
        if (result.ok && result.data?.data && result.data.data.length > 0) {
          // اولین آیتم را می‌گیریم
          setCtaData(result.data.data[0]);
        }
      } catch (error) {
        console.error("Error loading CTA data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCTAData();
  }, []);

  // داده‌های پیش‌فرض در صورت عدم وجود داده از API
  const defaultData: HeaderMenuItem = {
    id: 0,
    name: "با ویرامپ، مسیر ها را روشن کنید...",
    linkUrl: null,
    imageUrl: null,
    thumbnail: null,
    locale: null,
    parentId: null,
    sortId: 0,
    groupName: "cta-home",
    description:
      "با کمک مسیریابی هوشمند، تجربه‌ای خودکفا و لذت‌بخش برای بازدیدکنندگان فراهم کنید.",
    children: [],
  };

  const displayData = ctaData || defaultData;

  if (loading) {
    return null;
  }

  const handleButtonClick = () => {
    if (displayData.linkUrl) {
      // استفاده از router برای نویگیت در Next.js
      router.push(displayData.linkUrl);
    } else {
      // هدایت به صفحه تماس با ما
      router.push("/about-us?free=1#free-consultation");
      // بعد از نویگیت، به المنت با id="free-consultation" اسکرول می‌کنیم
      setTimeout(() => {
        const element = document.getElementById("free-consultation");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 600);
    }
  };

  return (
    <section className="bg-[#141414]/70 backdrop-blur-md text-white flex flex-col items-center justify-center py-12 md:py-20 lg:py-30 px-5 sm:px-6 md:px-10 lg:px-20 font-[family-name:Ravi,system-ui] text-center">
      {/* Main Container */}
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-[800px] w-full">
        {/* Badge - مشاوره رایگان */}
        <div className="flex flex-row justify-end items-start px-4 py-1.5 gap-6 w-auto min-w-[110px] h-[35px] bg-gradient-to-l from-[rgba(255,255,255,0.05)] to-transparent rounded-lg border border-[#344054]">
          <span className="font-ravi font-normal text-[12px] leading-[22px] text-white text-right">
            مشاوره رایگان
          </span>
        </div>

        {/* عنوان اصلی */}
        {displayData.name && (
          <h2 className="font-ravi font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-[36px] sm:leading-[42px] md:leading-[48px] lg:leading-[57px] text-[#FAFAFA] text-center m-0">
            {displayData.name}
          </h2>
        )}

        {/* توضیحات */}
        {displayData.description && (
          <p className="font-ravi font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[28px] md:leading-[32px] text-[#E4E4E7] text-center max-w-[796px] w-full m-0">
            {displayData.description}
          </p>
        )}

        {/* دکمه تماس با ما */}
        <button
          onClick={handleButtonClick}
          className="flex flex-row justify-center items-center px-5 py-3 gap-2 w-full sm:w-[135px] h-12 bg-[#FB6514] rounded-lg border-none cursor-pointer mt-4 transition-all hover:bg-[#e55a12] hover:-translate-y-1 active:scale-95"
        >
          <span className="font-ravi font-semibold text-[14px] leading-[26px] text-[#E4E4E7] text-center">
            تماس با ما
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTASection;
