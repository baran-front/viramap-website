// components/About/WhyViramap.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import "./WhyViramap.css";

export default function WhyViramap() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="why-viramap-section relative w-full px-5 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-hidden min-h-0">
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="why-viramap-content-wrapper flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Image Content - Left Side */}
          <div className="why-viramap-image-wrapper hidden md:block lg:w-1/2">
            <div className="relative w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[621px] mx-auto">
              {/* Device Image Container */}
              <div className="why-viramap-image-container relative w-full h-[300px] md:h-[350px] lg:h-[400px] xl:h-[476px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/about/two-phones.png"
                    alt="ویژگی‌های ویرامپ در موبایل"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 400px, 500px"
                    priority
                    onError={() => setImageError(true)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl">
                      <p className="text-white text-lg">
                        تصویر ویرامپ در موبایل
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-right">
              {/* Title Frame */}
              <div
                className="why-viramap-title-container space-y-2 mx-auto lg:mx-0 w-full max-w-[616px]"
              >
                <h2
                  className="font-ravi font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-[1.4]"
                >
                  چرا استفاده از ویرامپ رضایت بازدیدکنندگان را افزایش می‌دهد؟
                </h2>
              </div>

              {/* Description */}
              <p
                className="font-ravi font-normal text-base text-gray-300 text-justify leading-8"
              >
                مراجعه‌کنندگان در فضاهای بزرگ و پیچیده مثل بیمارستان‌ها، مراکز
                تجاری و نمایشگاه‌ها، اغلب به کمک نیاز دارند تا سریع‌تر به
                مقصدشان برسند. با ویرا مپ، این مشکل به‌سادگی حل می‌شود. نقشه‌های
                هوشمند داخلی ما با مسیریابی دقیق، کاهش نیاز به راهنمایی حضوری و
                ارائه اطلاعات کلیدی، تجربه مراجعه‌کنندگان شما را بهبود می‌بخشد و
                رضایت آن‌ها را افزایش می‌دهد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
