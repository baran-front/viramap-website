// components/About/TechnologySectionWithImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function TechnologySectionWithImage() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-8 text-right">
              {/* Title - سایز کمی کوچکتر */}
              <h2 className="font-morabba font-medium text-2xl sm:text-3xl md:text-4xl leading-tight sm:leading-snug md:leading-[48px] text-white">
                تکنولوژی استفاده شده در ویرامپ
              </h2>

              {/* Description */}
              <p className="font-yekanbakh font-normal text-base md:text-lg leading-7 md:leading-8 text-gray-300 text-justify">
                ویرامپ با استفاده از پیشرفته‌ترین تکنولوژی‌های موقعیت‌یابی
                داخلی، مسیریابی دقیق و کارآمدی را در فضاهای پیچیده ارائه می‌دهد.
                سیستم ما ترکیبی از فناوری‌های نوین برای ایجاد تجربه‌ای بی‌نظیر
                برای کاربران است.
              </p>

              {/* Read More Button */}
              {/* Button Container با justify-content: flex-end */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  flex: "none",
                  order: 2,
                  flexGrow: 0,
                  marginTop: "8px",
                }}
              >
                {/* Button */}
                <button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "8px",
                    width: "195px",
                    height: "24px",
                    fontFamily: "'Yekan Bakh', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "26px",
                    color: "#FB6514",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    درباره ویرامپ
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008"
                      stroke="#FB6514"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Image Content - Right Side */}
          <div className="lg:w-1/2">
            {/* Container اصلی تصویر */}
            <div className="relative w-full h-[350px] lg:h-[400px]">
              {/* تصویر اصلی با سایه روی خود عکس */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/About/Technology.png"
                  alt="تکنولوژی پیشرفته ویرامپ"
                  fill
                  className="object-contain drop-shadow-[0_25px_60px_rgba(248,248,248,0.4)]"
                  sizes="(max-width: 800px) 100vw, 50vw"
                  priority
                  quality={90}
                  onError={(e) => {
                    console.error("خطا در بارگذاری تصویر:", e);
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center rounded-3xl bg-gradient-to-br from-gray-900 to-black">
                          <div class="text-center p-8">
                            <div class="text-4xl mb-4">📡</div>
                            <div class="text-gray-300 text-lg mb-2">تکنولوژی ویرامپ</div>
                            <div class="text-gray-500 text-sm">تصویر در حال بارگذاری...</div>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
