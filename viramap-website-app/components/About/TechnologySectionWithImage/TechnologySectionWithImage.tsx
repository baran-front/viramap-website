// components/About/TechnologySectionWithImage.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TechnologySectionWithImage() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2">
            <div className="space-y-8 text-right">
              
              {/* Title */}
              <h2 className="font-morabba font-medium text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-snug md:leading-[57px] text-white">
                تکنولوژی استفاده شده در ویرامپ
              </h2>
              
              {/* Description */}
              <p className="font-yekanbakh font-normal text-base md:text-lg leading-7 md:leading-8 text-gray-300">
                ویرامپ با استفاده از پیشرفته‌ترین تکنولوژی‌های موقعیت‌یابی داخلی، مسیریابی دقیق و کارآمدی را در فضاهای پیچیده ارائه می‌دهد. سیستم ما ترکیبی از فناوری‌های نوین برای ایجاد تجربه‌ای بی‌نظیر برای کاربران است.
              </p>

              {/* Read More Button */}
              <div className="pt-4">
                <Link 
                  href="/technology" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-full transition-all duration-300 group"
                >
                  <span className="font-yekanbakh font-medium text-white text-lg">
                    مطالعه بیشتر
                  </span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-180 transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path 
                      d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.5" 
                      strokeMiterlimit="10" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

            </div>
          </div>

          {/* Image Content - Right Side */}
          <div className="lg:w-1/2">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-black">
              {/* Real Image */}
              <Image
                src="/images/about/Leonardo_Phoenix_3D_dark_mode_image_from_the_top_view_of_a_lar_3.png"
                alt="تکنولوژی ویرامپ - نقشه سه‌بعدی هوشمند"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
              
              {/* Floating Elements Overlay */}
              <div className="absolute inset-0">
                {/* Animated Elements */}
                <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Connection Lines */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M100,200 C200,150 300,250 400,200" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="2" 
                    fill="none"
                    strokeDasharray="4,4"
                  />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}