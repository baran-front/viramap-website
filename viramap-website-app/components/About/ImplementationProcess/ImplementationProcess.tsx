// components/About/SimpleImplementationProcess.tsx
"use client";

import Image from "next/image";

export default function SimpleImplementationProcess() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      {/* Ellipse 54 Gradient Effect green*/}
      <div
        className="absolute hidden lg:block w-[511px] h-[511px] lg:left-[calc(50%-511px/2-526.5px)]"
        style={{
          top: "-100px",
          background: "rgba(17, 147, 137, 0.3)",
          filter: "blur(250px)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />
      {/* Ellipse 47 - purple */}
      <div
        className="absolute hidden lg:block"
        style={{
          width: "583px",
          height: "583px",
          left: "calc(50% - 583px/2 + 655.5px)",
          top: "281px",
          background: "rgba(142, 101, 255, 0.1)",
          filter: "blur(250px)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <div className="mb-6">
            <div className="inline-flex justify-end items-center px-4 py-1 bg-gradient-to-r from-white/5 to-transparent rounded-lg border border-[#334054]">
              <span className="font-yekanbakh text-xs text-white">مشاوره</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-morabba text-2xl md:text-4xl text-center text-white mb-30 font-bold">
            چگونه ویرامپ در ساختمان‌ها پیاده‌سازی می‌شود
          </h2>

          {/* Image with Steps */}
          <div className="relative w-full rounded-2xl ">
            <div className="relative h-64 md:h-80 lg:h-96">
              <Image
                src="/images/About/implementation.png"
                alt="پیاده‌سازی ویرامپ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1062px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
