// components/technologies/TechnologiesSection3.tsx
"use client";

import "./TechnologiesSection3.css";

interface TechnologiesSection3Props {
  title?: string;
  imageSrc?: string;
}

export default function TechnologiesSection3({
  title = "Visual Mobile SDK ",
  imageSrc = "/images/technologies/benefits-diagram.png",
}: TechnologiesSection3Props) {
  return (
    <div className="tech-section3-container flex flex-col items-center p-0 gap-12 w-full max-w-[1480px] mx-auto py-20 relative overflow-hidden">
      {/* Ellipse Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="tech-section3-ellipse absolute rounded-full transform-gpu hidden lg:block"
          style={{
            width: "511px",
            height: "511px",
            left: "calc(50% - 255.5px - 526.5px)",
            top: "calc(2108px - 1700px)", // Adjusting for position
            background: "rgba(17, 147, 137, 0.3)",
            filter: "blur(250px)",
          }}
        />
      </div>

      {/* Title Section */}
      <div className="flex flex-col justify-center items-center p-0 gap-1 w-full relative z-10">
        {/* Main Title */}
        <div
          className="tech-section3-title flex items-center justify-center text-center w-full"
          style={{
            height: "57px",
            fontFamily: "'Morabba'",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "32px",
            lineHeight: "57px",
            color: "#FAFAFA",
          }}
        >
          {title}
        </div>
      </div>

      {/* Image Section - کوچک و وسط صفحه */}
      <div className="tech-section3-image-container w-full flex justify-center relative z-10">
        <div className="relative flex justify-center items-center">
          <img
            src={imageSrc}
            alt="دیاگرام تکنولوژی‌های ویرامپ"
            className="tech-section3-image max-w-[900px] w-full h-auto object-contain"
            style={{
              maxWidth: "900px",
              width: "100%",
              height: "auto",
            }}
            onError={(e) => {
              // اگر تصویر لود نشد
              e.currentTarget.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.className =
                "w-full max-w-[900px] h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg";
              placeholder.innerHTML = `
                <div class="text-center p-6">
                  <div class="text-gray-300 text-xl mb-4">تصویر تکنولوژی‌ها</div>
                  <div class="text-gray-400 text-sm">
                    مسیر تصویر: public${imageSrc}
                  </div>
                </div>
              `;
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
          />
        </div>
      </div>
    </div>
  );
}
