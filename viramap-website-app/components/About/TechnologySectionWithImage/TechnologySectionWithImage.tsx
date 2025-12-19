// components/About/TechnologySectionWithImage.tsx
"use client";

import Image from "next/image";

export default function TechnologySectionWithImage() {
  return (
    <section className="relative w-full px-5 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 overflow-hidden lg:overflow-visible min-h-0 technology-section-container">
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-20">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 md:space-y-8 text-right">
              {/* Title - سایز کمی کوچکتر */}
              <h2 className="font-ravi font-medium text-2xl sm:text-3xl md:text-4xl leading-tight sm:leading-snug md:leading-[48px] text-white">
                تکنولوژی استفاده شده در ویرامپ
              </h2>

              {/* Description */}
              <p className="font-ravi font-normal text-base md:text-lg leading-7 md:leading-8 text-gray-300 text-justify">
                ویرامپ با استفاده از پیشرفته‌ترین تکنولوژی‌های موقعیت‌یابی
                داخلی، مسیریابی دقیق و کارآمدی را در فضاهای پیچیده ارائه می‌دهد.
                سیستم ما ترکیبی از فناوری‌های نوین برای ایجاد تجربه‌ای بی‌نظیر
                برای کاربران است.
              </p>

              {/* Read More Button */}
              {/* Button Container با justify-content: flex-end */}
              <div className="flex justify-end w-full flex-none order-2 flex-grow-0 mt-2">
                {/* Button */}
                <button className="flex flex-row items-center justify-end gap-2 w-[195px] h-6 yekanbakh-text font-semibold text-sm leading-[26px] text-[#FB6514] border-none cursor-pointer p-0 transition-all duration-300">
                  <span className="flex items-center">
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
          <div className="hidden lg:block lg:w-1/2 lg:overflow-visible">
            {/* Container اصلی تصویر با padding برای نمایش کامل سایه */}
            <div className="relative w-full h-[400px] p-10 -m-10 -ml-[120px] transform-gpu">
              {/* تصویر اصلی با سایه روی خود عکس */}
              <div className="relative w-full h-full transform-gpu">
                <Image
                  src="/images/About/Technology.png"
                  alt="تکنولوژی پیشرفته ویرامپ"
                  fill
                  className="object-contain drop-shadow-[0_25px_60px_rgba(248,248,248,0.4)]"
                  sizes="(max-width: 1024px) 0vw, 50vw"
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
      <style jsx>{`
        .technology-section-container {
          width: calc(100% - 160px);
          max-width: 1480px;
          margin-left: auto;
          margin-right: auto;
        }

        /* iPad and 1280x800 adjustments */
        @media (max-width: 1280px) and (max-height: 800px) {
          .technology-section-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 24px;
            padding-bottom: 24px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .technology-section-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 32px;
            padding-bottom: 32px;
          }
        }

        /* Mobile adjustments - keep original width behavior */
        @media (max-width: 900px) {
          .technology-section-container {
            width: 100%;
            max-width: 1480px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  );
}
