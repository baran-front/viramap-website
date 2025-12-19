// components/About/SimpleImplementationProcess.tsx
"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function SimpleImplementationProcess() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section className="relative w-full px-5 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-visible implementation-process-section">
      <div className="relative max-w-7xl mx-auto overflow-visible">
        <div className="flex flex-col items-center overflow-visible">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex justify-end items-center px-4 py-1 bg-gradient-to-r from-white/5 to-transparent rounded-lg border border-[#334054]">
              <span className="font-ravi text-xs text-white">مشاوره</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-ravi text-2xl md:text-4xl text-center text-white mb-8 sm:mb-12 lg:mb-16 font-bold">
            چگونه ویرامپ در ساختمان‌ها پیاده‌سازی می‌شود
          </h2>

          {/* Image with Steps */}
          <div className="relative w-full rounded-2xl overflow-visible">
            <div
              ref={imageContainerRef}
              className="relative h-56 sm:h-64 md:h-80 lg:h-96 max-w-[360px] sm:max-w-[420px] md:max-w-none mx-auto rounded-2xl overflow-hidden cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src="/images/About/implementation.png"
                alt="پیاده‌سازی ویرامپ"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1062px"
                priority
              />
            </div>
            {isHovering && (
              <div
                className="absolute pointer-events-none z-10 w-[200px] h-[200px] rounded-full transition-opacity duration-200 ease-in-out"
                style={{
                  left: `${mousePosition.x - 100}px`,
                  top: `${mousePosition.y - 100}px`,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .implementation-process-section {
          width: calc(100% - 160px);
          max-width: 1480px;
          margin-left: auto;
          margin-right: auto;
        }

        /* iPad and 1280x800 adjustments */
        @media (max-width: 1280px) and (max-height: 800px) {
          .implementation-process-section {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 24px;
            padding-bottom: 24px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .implementation-process-section {
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
          .implementation-process-section {
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
