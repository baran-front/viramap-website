// components/home/IndoorMap/IndoorMap.tsx
"use client";
import Image from "next/image";
import "./IndoorMap.css";

const IndoorMap = () => {
  return (
    <div>
      {/* Section 1 */}
      <section className="bg-[#141414]/70 backdrop-blur-md text-white flex items-center justify-center py-8 sm:py-10 md:py-12 lg:py-16 px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-[family-name:Ravi,system-ui]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-6 lg:gap-12 xl:gap-16 max-w-[1400px] w-full">
          {/* Left Side - Content */}
          <div className="flex-1 lg:flex-[0_0_52%] flex flex-col items-start md:items-start lg:items-end w-full lg:w-auto order-1 lg:order-1">
            <div className="w-full max-w-[640px] flex flex-col items-end">
              {/* Title */}
              <h1 className="font-ravi font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[34px] leading-[1.3] text-[#E4E4E7] text-right w-full mb-4 sm:mb-5 md:mb-6">
                با دنیای مسیریابی داخلی (Indoormap) آشنا شوید
              </h1>

              {/* Description Text */}
              <p className="font-ravi font-normal text-[15px] sm:text-[16px] md:text-[16px] lg:text-[15px] leading-[28px] sm:leading-[30px] md:leading-[32px] text-[#E4E4E7] text-justify w-full mb-6 sm:mb-7 md:mb-8">
                Indoormap یک تکنولوژی نوآورانه است که برای مسیریابی و هدایت در
                محیط‌های داخلی توسعه یافته است. با این فناوری، کاربران می‌توانند
                به سادگی راه خود را در ساختمان‌های پیچیده و مکان‌های شلوغ مثل
                بیمارستان‌ها، فرودگاه‌ها و مراکز تجاری پیدا کنند. Indoomap
                راه‌حلی هوشمند برای رفع نیازهای مسیریابی داخلی شماست.
              </p>

              {/* Button */}
              <button className="flex flex-row items-center gap-2 px-0 py-0 bg-transparent border-none cursor-pointer transition-all hover:opacity-80 self-end">
                <span className="font-ravi font-semibold text-[15px] sm:text-[16px] leading-[26px] text-[#FB6514]">
                  مطالعه بیشتر
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M15.0001 19.9201L8.48009 13.4001C7.71009 12.6301 7.71009 11.3701 8.48009 10.6001L15.0001 4.08008"
                    stroke="#FB6514"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex md:hidden lg:flex flex-1 lg:flex-[0_0_48%] justify-center items-center w-full lg:w-auto order-2 lg:order-2 -my-6 sm:-my-8 md:-my-10 lg:my-0 relative z-20">
            <div className="indoormap-hero-img w-full max-w-[520px] h-[200px] sm:h-[280px] md:h-[360px] lg:h-[440px] xl:max-w-[700px] xl:h-[700px] rounded-2xl sm:rounded-3xl relative overflow-hidden">
              <Image
                src="/images/indormap/indoormap.png"
                alt="نقشه داخلی ویرامپ"
                fill
                className="object-contain sm:object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 520px, 700px"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl sm:rounded-3xl blur-xl opacity-50 z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-[#141414]/70 backdrop-blur-md text-white flex items-center justify-center py-8 sm:py-10 md:py-12 lg:pt-2 lg:pb-16 px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-[family-name:Ravi,system-ui] relative overflow-hidden">
        {/* Background Ellipses */}
        <div className="absolute inset-0 overflow-visible pointer-events-none hidden lg:block z-0">
          {/* Ellipse 47 */}
          <div
            className="absolute rounded-full bg-[#FB6514]/40"
            style={{
              width: "337px",
              height: "349px",
              left: "calc(50% - 337px/2 + 575.5px)",
              top: "1199px",
              filter: "blur(100px)",
              transform: "translateZ(0)",
              willChange: "transform",
              zIndex: -1,
            }}
          />

          {/* Ellipse 53 */}
          <div
            className="absolute rounded-full bg-[#067871]/35"
            style={{
              width: "261px",
              height: "273px",
              left: "calc(50% - 261px/2 - 719.5px)",
              top: "1413px",
              filter: "blur(50px)",
              transform: "translateZ(0)",
              willChange: "transform",
              zIndex: -1,
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-6 lg:gap-4 xl:gap-5 max-w-[1400px] w-full relative z-10">
          {/* Left Side - Image */}
          <div className="flex md:hidden lg:flex flex-1 lg:flex-[0_0_45%] justify-center items-center w-full lg:w-auto order-2 lg:order-1 -mt-8 sm:-mt-10 md:-mt-12 lg:mt-0 mb-6 sm:mb-8 md:mb-10 lg:mb-[30px] relative z-20">
            <div className="indoormap-phone-img w-full max-w-[380px] h-[180px] sm:h-[240px] md:h-[300px] lg:h-[400px] xl:max-w-[455px] xl:h-[600px] rounded-2xl sm:rounded-3xl relative overflow-hidden">
              <Image
                src="/images/indormap/phoneimg.png"
                alt="اپلیکیشن موبایل ویرامپ"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 380px, 455px"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl sm:rounded-3xl blur-xl opacity-50 z-[-1]"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 lg:flex-[0_0_55%] flex flex-col items-start md:items-start lg:items-end w-full lg:w-auto order-1 lg:order-2">
            <div className="w-full max-w-[640px] flex flex-col items-end">
              {/* Title */}
              <h1 className="font-ravi font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[34px] leading-[1.3] text-[#E4E4E7] text-right w-full mb-4 sm:mb-5 md:mb-6">
                با دنیای مسیریابی داخلی (Indoormap) آشنا شوید
              </h1>

              {/* Description Text */}
              <p className="font-ravi font-normal text-[15px] sm:text-[16px] md:text-[16px] lg:text-[15px] leading-[28px] sm:leading-[30px] md:leading-[32px] text-[#E4E4E7] text-justify w-full mb-6 sm:mb-7 md:mb-8">
                Indoormap یک تکنولوژی نوآورانه است که برای مسیریابی و هدایت در
                محیط‌های داخلی توسعه یافته است. با این فناوری، کاربران می‌توانند
                به سادگی راه خود را در ساختمان‌های پیچیده و مکان‌های شلوغ مثل
                بیمارستان‌ها، فرودگاه‌ها و مراکز تجاری پیدا کنند. Indoomap
                راه‌حلی هوشمند برای رفع نیازهای مسیریابی داخلی شماست.
              </p>

              {/* Button */}
              <button className="flex flex-row items-center gap-2 px-0 py-0 bg-transparent border-none cursor-pointer transition-all hover:opacity-80 self-end">
                <span className="font-ravi font-semibold text-[15px] sm:text-[16px] leading-[26px] text-[#FB6514]">
                  مطالعه بیشتر
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M15.0001 19.9201L8.48009 13.4001C7.71009 12.6301 7.71009 11.3701 8.48009 10.6001L15.0001 4.08008"
                    stroke="#FB6514"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndoorMap;
