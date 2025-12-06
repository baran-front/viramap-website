// components/About/WhyViramap.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function WhyViramap() {
  const [imageError, setImageError] = useState(false);
  
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-24 min-h-[800px] overflow-visible">
      {/* Background container for ellipses */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        
        {/* Ellipse 52 - Orange (Exact CSS) */}
        <div 
          className="absolute rounded-full opacity-70"
          style={{
            width: '519px',
            height: '519px',
            right: '335px',
            top: '52px',
            background: 'rgba(254, 139, 32, 0.3)',
            filter: 'blur(150px)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />

        {/* Ellipse 47 - Purple (Exact CSS) */}
        <div 
          className="absolute rounded-full opacity-70 hidden lg:block"
          style={{
            width: '337px',
            height: '349px',
            left: 'calc(50% - 337px/2 + 575.5px)',
            top: '1199px',
            background: 'rgba(143, 101, 255, 0.1)',
            filter: 'blur(100px)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />

        {/* Group 57 (Alternative positioning) */}
        <div 
          className="absolute rounded-full opacity-70 hidden lg:block"
          style={{
            width: '337px',
            height: '349px',
            left: '1127px',
            top: '1199px',
            background: 'rgba(143, 101, 255, 0.1)',
            filter: 'blur(100px)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />

      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
          
          {/* Image Content - Left Side */}
          <div className="lg:w-1/2">
            <div className="relative w-full max-w-[500px] lg:max-w-[621px] mx-auto">
              {/* Device Image Container */}
              <div 
                className="relative w-full"
                style={{
                  height: '476px',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/about/two-phones.png"
                    alt="ویژگی‌های ویرامپ در موبایل"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onError={() => setImageError(true)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl">
                      <p className="text-white text-lg">تصویر ویرامپ در موبایل</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="lg:w-1/2">
            <div className="space-y-6 text-right">
              {/* Title Frame */}
              <div 
                className="space-y-2"
                style={{
                  width: '100%',
                  maxWidth: '616px',
                }}
              >
                <h2 
                  className="font-morabba font-medium text-2xl sm:text-3xl md:text-4xl text-white"
                  style={{
                    lineHeight: '57px',
                  }}
                >
                  چرا استفاده از ویرامپ رضایت بازدیدکنندگان را افزایش می‌دهد؟
                </h2>
              </div>

              {/* Description */}
              <p 
                className="font-yekanbakh font-normal text-base text-gray-300"
                style={{
                  lineHeight: '32px',
                }}
              >
                مراجعه‌کنندگان در فضاهای بزرگ و پیچیده مثل بیمارستان‌ها، مراکز تجاری و نمایشگاه‌ها، اغلب به کمک نیاز دارند تا سریع‌تر به مقصدشان برسند. با ویرا مپ، این مشکل به‌سادگی حل می‌شود. نقشه‌های هوشمند داخلی ما با مسیریابی دقیق، کاهش نیاز به راهنمایی حضوری و ارائه اطلاعات کلیدی، تجربه مراجعه‌کنندگان شما را بهبود می‌بخشد و رضایت آن‌ها را افزایش می‌دهد.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}