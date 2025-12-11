// components/platform/PlatformHero.tsx
"use client";

interface BoxItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PlatformHeroProps {
  title: string;
  description: string;
  boxes: BoxItem[];
}

// استایل‌های مشترک برای افکت شیشه‌ای
const glassEffectStyle = {
  background: "#FAFAFA1A", // 10% opacity white background
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
} as const;

export default function PlatformHero({
  title,
  description,
  boxes,
}: PlatformHeroProps) {
  return (
    <>
      <style>{`
        .platform-box:hover h3 {
          font-size: 17px !important;
        }
        .platform-box:hover p {
          font-size: 15px !important;
        }
        .platform-box:hover {
          box-shadow: 0 10px 40px rgba(251, 101, 20, 0.3), 0 0 20px rgba(143, 101, 255, 0.2) !important;
        }
        .platform-box:hover .icon-wrapper svg path,
        .platform-box:hover .icon-wrapper svg g path {
          fill: #FB6514 !important;
          stroke: #FB6514 !important;
        }
        .platform-box:hover .icon-wrapper svg {
          filter: drop-shadow(0 0 8px rgba(251, 101, 20, 0.6));
        }
        .main-content-box:hover {
          box-shadow: 0 10px 40px rgba(251, 101, 20, 0.3), 0 0 20px rgba(143, 101, 255, 0.2) !important;
        }
        /* Hide ellipses on iPad devices */
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          .platform-hero-ellipse {
            display: none !important;
          }
          .platform-box {
            height: auto !important;
            min-height: 280px !important;
            padding: 1rem !important;
          }
          .platform-box h3 {
            font-size: 15px !important;
            height: auto !important;
            min-height: 32px !important;
            margin-bottom: 4px !important;
          }
          .platform-box p {
            font-size: 13px !important;
            height: auto !important;
            min-height: 80px !important;
            line-height: 1.5 !important;
          }
        }
        /* Hide ellipses and prevent overflow on 1280x800 breakpoint */
        @media only screen and (max-width: 1280px) and (max-height: 800px) {
          .platform-hero-ellipse {
            display: none !important;
          }
          .platform-hero-section {
            overflow: hidden !important;
          }
        }
      `}</style>
      <section className="platform-hero-section relative w-full flex flex-col items-center pt-6 overflow-hidden xl:overflow-visible">
        {/* Background Container */}
        <div className="absolute inset-0 overflow-visible pointer-events-none hidden md:block">
          <div className="absolute inset-0">
            {/* Ellipse نارنجی */}
            <div
              className="platform-hero-ellipse absolute rounded-full transform-gpu"
              style={{
                width: "484px",
                height: "484px",
                left: "calc(50% - 242px - 495px)",
                top: "64px",
                filter: "blur(50px)",
                opacity: "0.9",
              }}
            />

            {/* Ellipse بنفش */}
            <div
              className="platform-hero-ellipse absolute rounded-full transform-gpu"
              style={{
                width: "600px",
                height: "600px",
                right: "-20%",
                bottom: "-10%",
                filter: "blur(180px)",
                opacity: "0.7",
              }}
            />
          </div>
        </div>

        {/* Main Content Box */}
        <div
          className="main-content-box relative flex flex-col justify-center items-center z-10 mb-6 md:mb-10 py-8 md:py-16 px-4 md:px-10 mt-[90px] gap-6 rounded-3xl box-border w-full max-w-[1480px] transition-all duration-300 ease-in-out cursor-pointer"
          style={glassEffectStyle}
        >
          {/* Title */}
          <h1
            className="w-full text-center mb-4 text-white leading-tight text-3xl md:text-[48px] px-4 md:px-0"
            style={{
              fontFamily: "'Morabba', sans-serif",
              fontWeight: "700",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="w-full max-w-[740px] text-center m-0 text-[#AAAAAA] leading-[1.8] px-4 md:px-0"
            style={{
              fontFamily: "'Yekan Bakh', sans-serif",
              fontWeight: "400",
              fontSize: "14px",
              textAlign: "justify",
              textAlignLast: "right",
            }}
          >
            {description}
          </p>
        </div>

        {/* 4 Boxes Section */}
        <div className="relative z-10 w-full max-w-[1480px]">
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 w-full relative">
            {boxes.map((box) => (
              <div
                key={box.id}
                className="platform-box group flex flex-col items-center relative w-full md:flex-1 md:max-w-[calc((100%-72px)/4)] p-4 md:p-6 gap-2 min-w-0 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 overflow-hidden"
                style={{
                  height: "232px",
                  ...glassEffectStyle,
                }}
              >
                {/* Icon */}
                <div className="icon-wrapper flex items-center justify-center w-14 h-14 flex-none order-0 grow-0 transition-all duration-300 group-hover:scale-110">
                  {box.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-center w-full h-8 flex-none order-1 self-stretch grow-0 leading-8 transition-all duration-300 group-hover:text-white"
                  style={{
                    fontFamily: "'Morabba', sans-serif",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#E4E4E7",
                  }}
                >
                  {box.title}
                </h3>

                {/* Description */}
                <p
                  className="text-center w-full h-20 flex-none order-2 self-stretch grow-0 leading-[19px] transition-all duration-300 group-hover:text-[#E4E4E7]"
                  style={{
                    fontFamily: "'Yekan Bakh', sans-serif",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#D4D4D8",
                    textAlign: "justify",
                    textAlignLast: "right",
                  }}
                >
                  {box.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
