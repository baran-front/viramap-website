// components/platform/PlatformSection3.tsx
"use client";

interface SectionItem {
  title: string;
  caption?: string;
  image: string;
  alt: string;
  items: string[];
}

export default function PlatformSection3() {
  const sections: SectionItem[] = [
    {
      title: "مشاهده‌گر نقشه",
      caption: "راهنمای بصری یکپارچه برای فضای باز و داخلی",
      image: "/images/platform/p2.png",
      alt: "نمایشگر نقشه",
      items: [
        "راهنمایی در فضای باز و داخلی را با نقشه های گام به گام ارائه دهید.",
        "مسیرهای مختلف را برای کاربران مختلف ایجاد کنید.",
        "نقشه های خود را در لحظه و با سرعت به روز کنید، آن را در سطح درب، مسیرهای هدایت به فروشگاه ها و کدهای هوشمند ارائه کنید.",
      ],
    },
    {
      title: "ابزار نقشه برداری ویرامپ",
      caption: "جعبه ابزار کامل برای ساخت و آزمون نقشه ها",
      image: "/images/platform/p3.png",
      alt: "اپلیکیشن موبایل",
      items: [
        "برنامه اندروید برای پیمایش و آزمایش نقشه ویرامپ ارائه می دهد.",
        "شناسه‌های مورد استفاده برای ایجاد سیگنال های BLE/WiFi و بررسی پوشش.",
        "تشخیص موقعیت کاربران، مسیرهای داخلی و بررسی دقت.",
        "اعمال تراکنش‌ها، حافظه مورد علاقه و بروزدهی موقعیت جغرافیایی.",
      ],
    },
  ];

  const renderImage = (
    image: string,
    alt: string,
    isLarge: boolean = false
  ) => (
    <div
      className="relative overflow-hidden shadow-2xl"
      style={{
        width: isLarge ? "min(700px, 90vw)" : "min(560px, 90vw)",
        borderRadius: "40px",
      }}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-auto object-contain"
        style={{
          borderRadius: "40px",
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const src = target.src;
          const extensions = [".jpg", ".jpeg", ".webp", ".svg"];
          const basePath = src.replace(/\.(png|jpg|jpeg|webp|svg)$/i, "");
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
                '<div class="w-full h-full flex items-center justify-center text-gray-400" style="font-family: \'Yekan Bakh\'">Image</div>';
            }
          }
        }}
      />
    </div>
  );

  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-[1480px] mx-auto px-8">
        <div className="flex flex-col gap-12">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16"
            >
              {/*
                Swap image/text order for the first section to create variety while
                keeping the default layout for the rest.
              */}
              {(() => {
                const isFirst = index === 0;
                const isSecond = index === 1;
                // Second section: swap image/text positions only on desktop
                const imageOrder = isFirst
                  ? "order-2 lg:order-1"
                  : isSecond
                  ? "order-2 lg:order-2"
                  : "order-1 lg:order-2";
                const textOrder = isFirst
                  ? "order-1 lg:order-2"
                  : isSecond
                  ? "order-1 lg:order-1"
                  : "order-2 lg:order-1";

                return (
                  <>
                    <div
                      className={`w-full lg:w-1/2 flex justify-center lg:justify-start ${imageOrder}`}
                    >
                      {renderImage(section.image, section.alt, isSecond)}
                    </div>

                    <div
                      className={`w-full lg:w-1/2 space-y-8 flex flex-col justify-center ${textOrder}`}
                    >
                      <h3
                        className="text-right text-[28px] lg:text-[24px]"
                        style={{
                          fontFamily: "'Ravi'",
                          fontWeight: "600",
                          paddingTop: index === 1 ? "60px" : undefined,
                        }}
                      >
                        {section.title}
                      </h3>

                      {section.caption && (
                        <p
                          className="text-right text-[16px] lg:text-[14px]"
                          style={{
                            fontFamily: "'Ravi'",
                            fontWeight: "400",
                            color: "#FAFAFA",
                          }}
                        >
                          {section.caption}
                        </p>
                      )}

                      <div className="space-y-6 relative">
                        <div
                          className={`absolute right-[13px] w-[2px] bg-[#4B4B4B] z-0 ${
                            index === 0 ? "" : "top-5 -bottom-3"
                          }`}
                          style={
                            index === 0
                              ? {
                                  top: "28px",
                                  bottom: "28px",
                                }
                              : undefined
                          }
                          aria-hidden="true"
                        ></div>
                        {section.items.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-4 pr-2 relative z-10"
                          >
                            <div className="w-3 h-3 rounded-full mt-2 shrink-0 border-2 border-[#9CA3AF] bg-[#FB6514]"></div>
                            <div
                              className="text-right flex-1 text-[16px] lg:text-[14px] leading-[28px] lg:leading-[24px]"
                              style={{
                                fontFamily: "'Ravi'",
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
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
