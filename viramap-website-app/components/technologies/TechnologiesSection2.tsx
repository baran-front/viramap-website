// components/technologies/TechnologiesSection2.tsx
"use client";

import Image from "next/image";

interface TechnologiesSection2Props {
  badgeText?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
}

export default function TechnologiesSection2({
  badgeText = "تکنولوژی ها",
  title = "تکنولوژی‌های پیشرفته مسیریابی",
  description = "ویرامپ از ترکیبی از تکنولوژی‌های نوین برای ارائه دقیق‌ترین و سریع‌ترین سیستم‌های مسیریابی داخلی استفاده می‌کند.",
  imageSrc = "/images/technologies/tech-diagram.png",
}: TechnologiesSection2Props) {
  return (
    <div className="flex flex-col items-center p-0 gap-4 md:gap-6 lg:gap-8 xl:gap-6 w-full max-w-[1480px] xl:max-w-[1200px] mx-auto py-4 md:py-6 lg:py-8 xl:py-6 px-5 md:px-6 lg:px-8 xl:px-6 relative overflow-hidden">
      {/* Title Section */}
      <div className="flex flex-col justify-center items-center p-0 gap-2 md:gap-3 lg:gap-4 w-full relative z-10">
        {/* Feature Badge */}
        <div
          className="box-border flex flex-row justify-end items-start px-3 md:px-4 py-1 gap-6"
          style={{
            width: "auto",
            minWidth: "100px",
            height: "28px",
            borderRadius: "8px",
            border: "1px solid #344054",
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          <div
            className="flex items-center text-right px-2"
            style={{
              fontFamily: "'Ravi'",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "11px",
              lineHeight: "22px",
              color: "#FFFFFF",
            }}
          >
            {badgeText}
          </div>
        </div>

        {/* Main Title */}
        <div
          className="flex items-center justify-center text-center w-full px-4 mt-1 md:mt-2 lg:mt-3 mb-1 md:mb-2 lg:mb-3"
          style={{
            fontFamily: "'Ravi'",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "clamp(22px, 4vw, 42px)",
            lineHeight: "1.2",
            color: "#FAFAFA",
          }}
        >
          {title}
        </div>

        {/* Description - محدود شده */}
        <div
          className="flex justify-center items-center w-full max-w-[700px] md:max-w-[800px] lg:max-w-[900px] px-4 md:px-6"
          style={{
            fontFamily: "'Ravi'",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "clamp(12px, 1.5vw, 16px)",
            lineHeight: "1.8",
            color: "#E4E4E7",
            textAlign: "justify",
            textAlignLast: "right",
            direction: "rtl",
            marginTop: "8px",
          }}
        >
          <div
            className="text-justify leading-8 rtl w-full"
            style={{ textAlign: "justify", textAlignLast: "right" }}
          >
            {description}
          </div>
        </div>
      </div>

      {/* Image Section - بزرگتر و مرکز */}
      <div className="w-full flex justify-center relative z-10 -mt-20 md:-mt-24 lg:-mt-28 xl:-mt-20">
        <div className="relative flex justify-center items-center w-full max-w-[1200px] xl:max-w-[1080px]">
          <div className="relative w-full max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[980px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[520px] xl:h-[430px] rounded-2xl overflow-hidden">
            <Image
              src={imageSrc}
              alt="تکنولوژی‌های ویرامپ"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 1100px"
              priority
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";

                const placeholder = document.createElement("div");
                placeholder.className =
                  "absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center";
                placeholder.innerHTML = `
                  <div class="text-center p-4">
                    <div class="text-gray-400 text-lg mb-2">تصویر تکنولوژی‌ها</div>
                    <div class="text-gray-500 text-sm mb-4">فایل تصویر در مسیر مورد نظر یافت نشد</div>
                    <div class="text-gray-600 text-xs">
                      لطفاً فایل تصویر را در مسیر زیر قرار دهید:<br/>
                      <code class="bg-gray-900 px-2 py-1 rounded">public${imageSrc}</code>
                    </div>
                  </div>
                `;

                if (target.parentElement) {
                  target.parentElement.appendChild(placeholder);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
