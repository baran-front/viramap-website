// components/platform/PlatformSection4.tsx
"use client";

interface PlatformSection4Props {
  title?: string;
  description?: string;
}

interface SectionItem {
  title: string;
  caption?: string;
  image: string;
  alt: string;
  items: string[];
}

export default function PlatformSection4({
  title = "Visual Mobile SDK",
  description = "مجموعه ای از ابزارهای توسعه برای ادغام سرویس موقعیت مکانی ویرامپ در سایر برنامه ها یا حتی ایجاد برنامه ها از ابتدا، سازگار با Android، iOS، Cordova، React Native و Capacitor.",
}: PlatformSection4Props) {
  const firstSection: SectionItem = {
    title: "سیستم مکان یابی بلادرنگ",
    caption: "موقعیت یابی بی درنگ در فضای باز و داخلی با دقت بالا.",
    image: "/images/platform/p4.png",
    alt: "نمایشگر نقشه",
    items: [
      "الگوریتم ثبت شده ما طیف گسترده ای از سیگنال ها را محاسبه می کند.",
      "حداقل زیرساخت اختصاصی زیرا مستلزم قرار دادن چند چراغ است.",
      "تشخیص خودکار طبقات همکف و غیر همکف.",
      "محاسبات تلفن همراه بدون نیاز به اتصال مداوم.",
      "ناوبری گام به گام با محاسبه مجدد خودکار درصورت انحراف از مسیر.",
      "مسیرهای ویژه برای افراد کم تحرک (PRM).",
      "در دست و در محل جیب.",
    ],
  };

  const renderImage = (image: string, alt: string) => (
    <div
      className="relative overflow-hidden shadow-2xl"
      style={{
        width: "min(720px, 95vw)",
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
    <div className="w-full">
      <div className="w-full pt-10 pb-16">
        <div className="max-w-[1480px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
              {renderImage(firstSection.image, firstSection.alt)}
            </div>

            <div className="w-full lg:w-1/2 space-y-8 flex flex-col justify-center order-1 lg:order-2">
              <h3
                className="text-right text-[28px] lg:text-[24px]"
                style={{
                  fontFamily: "'Ravi'",
                  fontWeight: "600",
                }}
              >
                {firstSection.title}
              </h3>

              {firstSection.caption && (
                <p
                  className="text-right text-[16px] lg:text-[14px]"
                  style={{
                    fontFamily: "'Ravi'",
                    fontWeight: "400",
                    color: "#FAFAFA",
                  }}
                >
                  {firstSection.caption}
                </p>
              )}

              <div className="space-y-6 relative">
                <div
                  className="absolute right-[13px] top-5 -bottom-3 w-[2px] bg-[#4B4B4B] z-0"
                  aria-hidden="true"
                ></div>
                {firstSection.items.map((feature) => (
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
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-[1480px] mx-auto py-16 px-4">
        {/* Title and Description */}
        <div className="flex flex-col items-center gap-8 w-full">
          <h1 className=" text-[64px] text-white text-center">{title}</h1>

          <div className="font-yekanbakh text-[16px] leading-[28px] text-[#E4E4E7] text-center max-w-[480px] px-4">
            {description}
          </div>
        </div>

        {/* SDK Icons Container */}
        <div className="flex flex-row items-center justify-center gap-12 md:gap-16">
          {/* iOS SDK */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M43.9369 10.3347C46.4956 7.59541 48.2262 3.79234 47.7525 0C44.0663 0.131551 39.5987 2.16382 36.9528 4.90283C34.5809 7.32765 32.5043 11.203 33.0585 14.921C37.1718 15.1992 41.374 13.0695 43.9369 10.3347ZM51.7872 36.5247C51.7086 28.0226 58.5184 23.9392 58.82 23.7419C54.9915 17.9683 49.0291 17.1783 46.9056 17.0892C41.8285 16.5562 37.0062 20.1639 34.4286 20.1639C31.8615 20.1639 27.8907 17.1592 23.6799 17.2399C18.1443 17.3311 13.0437 20.5546 10.2007 25.6633C4.45022 35.9408 8.72678 51.1655 14.3303 59.5019C17.0695 63.583 20.331 68.1612 24.6138 67.9956C28.7481 67.83 30.3067 65.2458 35.2946 65.2458C40.2847 65.2458 41.6818 67.9956 46.0475 67.9128C50.4897 67.83 53.301 63.7531 56.0169 59.6591C59.1594 54.9261 60.4549 50.3438 60.529 50.1124C60.4336 50.0571 51.8784 46.6916 51.7872 36.5247Z"
                  fill="#CCD0D2"
                  className="group-hover:fill-white transition-colors duration-300"
                />
              </svg>
            </div>
          </div>

          {/* Android SDK */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M41.0983 67.9997C43.3719 67.9997 45.3546 66.017 45.3546 63.7433V53.8029H48.1967C49.9021 53.8029 51.0387 52.6659 51.0387 50.9609V22.5696H16.9613V50.9611C16.9613 52.6663 18.0982 53.8032 19.8033 53.8032H22.6456V63.7436C22.6456 66.0172 24.6279 68 26.902 68C29.1753 68 31.158 66.0172 31.158 63.7436V53.8032H36.8422V63.7436C36.8419 66.017 38.8247 67.9997 41.0983 67.9997ZM58.1373 50.9611C60.4109 50.9611 62.3932 48.9786 62.3932 46.7048V26.8241C62.3932 24.5625 60.411 22.5696 58.1373 22.5696C55.8634 22.5696 53.8809 24.5626 53.8809 26.8241V46.7048C53.8809 48.9784 55.8633 50.9611 58.1373 50.9611ZM9.86289 50.9611C12.1368 50.9611 14.1193 48.9786 14.1193 46.7048V26.8241C14.1193 24.5625 12.137 22.5696 9.86289 22.5696C7.58929 22.5696 5.60693 24.5626 5.60693 26.8241V46.7048C5.60707 48.9784 7.58929 50.9611 9.86289 50.9611ZM47.628 0.428817C47.0598 -0.142939 46.2139 -0.142939 45.6458 0.428817L41.8339 4.2279L41.6581 4.40348C39.3979 3.27166 36.8637 2.70641 34.0417 2.70096C34.0279 2.70096 34.0142 2.70057 34.0004 2.70057H34C33.9857 2.70057 33.9725 2.70096 33.9583 2.70096C31.1364 2.70641 28.6024 3.27166 26.3423 4.40348L26.1661 4.2279L22.3543 0.428817C21.7857 -0.142939 20.9402 -0.142939 20.372 0.428817C19.8035 0.997385 19.8035 1.84127 20.372 2.40944L24.0593 6.09736C22.8712 6.89065 21.7938 7.86137 20.8569 8.97168C18.614 11.6303 17.1832 15.0905 16.9865 18.8395C16.9847 18.8785 16.9808 18.917 16.9791 18.9561C16.9671 19.2124 16.9612 19.469 16.9614 19.7256H51.0387C51.0387 19.4681 51.0326 19.2115 51.0211 18.9561C51.0192 18.917 51.0154 18.8785 51.0131 18.8395C50.8168 15.0905 49.3857 11.6302 47.1427 8.97195C46.2062 7.86164 45.1285 6.89092 43.9403 6.09763L47.628 2.40971C48.1967 1.84127 48.1967 0.997518 47.628 0.428817ZM26.8966 14.7633C25.7208 14.7633 24.7675 13.8102 24.7675 12.6342C24.7675 11.4583 25.7206 10.5051 26.8966 10.5051C28.0723 10.5051 29.0257 11.4583 29.0257 12.6342C29.0257 13.8102 28.0723 14.7633 26.8966 14.7633ZM41.1035 14.7633C39.9277 14.7633 38.9743 13.8102 38.9743 12.6342C38.9743 11.4583 39.9275 10.5051 41.1035 10.5051C42.2792 10.5051 43.2326 11.4583 43.2326 12.6342C43.2326 13.8102 42.2794 14.7633 41.1035 14.7633Z"
                  fill="#A6D864"
                  className="group-hover:fill-white transition-colors duration-300"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
