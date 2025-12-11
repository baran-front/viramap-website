// components/platform/PlatformSection2.tsx
"use client";

interface PlatformSection2Props {
  title?: string;
  description?: string;
  linkWord?: string;
}

export default function PlatformSection2({
  title = "یک سیستم موقعیت یابی کامل در داخل ساختمان برای راه حل های ناوبری و ردیابی داخلی شما",
  description = "سیستم موقعیت یابی داخلی {link} مجموعه ای است که شامل تمام ابزارهای لازم برای توسعه و یا ادغام انواع راه حل ها بر اساس موقعیت یابی داخلی (و همچنین در فضای باز) است: برنامه های راهنمای خارج از جعبه یا کاملاً سفارشی شده، نقشه های تعاملی با سه بعدی. عناصر، محیط های واقعیت افزوده ادغام شده با ناوبری بلادرنگ، تجزیه و تحلیل جغرافیایی برای ممیزی فرآیند و خدمات، آلارم های هوشمند… به {link} بپیوندید و از مکان داخلی بیشترین بهره را ببرید.",
  linkWord = "ویرامپ",
}: PlatformSection2Props) {
  const formattedDescription = description.replace(/\{link\}/g, linkWord);

  return (
    <div className="w-full pt-10 pb-20">
      {/* Main Content Container */}
      <div className="max-w-[1480px] mx-auto px-8">
        {/* Top Section - Title and Description */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Title */}
          <div className="w-full text-center space-y-2 px-4 md:px-0">
            <h2
              className="text-white text-[28px] lg:text-[24px] leading-[50px] lg:leading-[42px]"
              style={{
                fontFamily: "'Ravi'",
                fontWeight: "600",
              }}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <div
            className="text-center max-w-[796px] px-4 text-[16px] lg:text-[14px] leading-[32px] lg:leading-[28px]"
            style={{
              fontFamily: "'Ravi'",
              fontStyle: "normal",
              fontWeight: "400",
              color: "#E4E4E7",
            }}
          >
            <div className="leading-relaxed rtl text-justify">
              {formattedDescription
                .split(linkWord)
                .map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <a
                        href="/"
                        className="text-[#FB6514] hover:text-[#B2480E] transition-colors duration-200 inline-block mx-1"
                        style={{
                          fontFamily: "'Ravi'",
                          fontWeight: "600",
                        }}
                      >
                        {linkWord}
                      </a>
                    )}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Features List and Dashboard Image */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left Side - Features List */}
          <div className="hidden lg:flex w-full lg:w-1/2 space-y-8 flex-col justify-center">
            {/* Heading */}
            <h3
              className="text-right text-[28px] lg:text-[24px]"
              style={{
                fontFamily: "'Ravi'",
                fontWeight: "600",
                paddingTop: "60px",
              }}
            >
              داشبورد
            </h3>

            {/* Sub-headline */}
            <p
              className="text-right text-[16px] lg:text-[14px]"
              style={{
                fontFamily: "'Ravi'",
                fontWeight: "400",
                color: "#FAFAFA",
              }}
            >
              ساختمانهای خود را از داشبورد ما مدیریت و تجسم کنید.
            </p>

            {/* Features List */}
            <div className="space-y-6 relative">
              <div
                className="absolute right-[13px] top-5 -bottom-3 w-[2px] bg-[#4B4B4B] z-0"
                aria-hidden="true"
              ></div>
              {[
                "مدیریت نقشه برداری ساختمانها نقاط مورد علاقه مسیرها رویدادها برای geofencing",
                "تجسم در زمان واقعی مکان کاربر و دارایی در زمان واقعی",
                "تجزیه و تحلیل نقشه های حرارتی مسیرها مدت زمان بازدید.....",
                "پیکربندی سرویس مکان یابی بلادرنگ",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pr-2 relative z-10"
                >
                  <div className="w-3 h-3 rounded-full mt-2 shrink-0 border-2 border-[#9CA3AF] bg-[#FB6514]"></div>
                  <div
                    className="text-right flex-1 text-[16px] lg:text-[14px] leading-[28px] lg:leading-[24px]"
                    style={{
                      fontFamily: "'Ravi'",
                      fontStyle: "normal",
                      fontWeight: "400",
                      color: "#FAFAFA",
                    }}
                  >
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Dashboard Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                width: "min(560px, 90vw)",
                height: "auto",
                borderRadius: "40px",
                flex: "none",
                order: 0,
                flexGrow: 0,
              }}
            >
              <img
                src="/images/platform/p1.png"
                alt="Dashboard"
                className="w-full h-auto object-contain"
                style={{
                  borderRadius: "40px",
                }}
                onError={(e) => {
                  // Fallback if image doesn't exist - try different extensions
                  const target = e.target as HTMLImageElement;
                  const src = target.src;
                  const extensions = [".jpg", ".jpeg", ".webp", ".svg"];
                  const basePath = src.replace(
                    /\.(png|jpg|jpeg|webp|svg)$/i,
                    ""
                  );
                  let currentExtIndex = extensions.findIndex((ext) =>
                    src.includes(ext)
                  );

                  if (currentExtIndex < extensions.length - 1) {
                    target.src = basePath + extensions[currentExtIndex + 1];
                  } else {
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.style.backgroundColor = "#FFFFFF";
                      target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-gray-400" style="font-family: \'Ravi\', sans-serif">Dashboard Image</div>';
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
