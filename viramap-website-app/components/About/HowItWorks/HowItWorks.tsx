"use client";

export default function HowItWorks() {
  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center px-5 sm:px-6 lg:px-5 gap-8 sm:gap-12 lg:gap-16 how-it-works-container w-full max-w-[1280px] h-auto mt-8 sm:mt-12 lg:mt-16 mx-auto">
      {/* Left Side: Image Container */}
      <div className="hidden lg:block relative w-full sm:w-4/5 lg:w-[40%] max-w-[480px] lg:max-w-[480px] h-auto aspect-square z-[2]">
        {/* Main Image */}
        <div
          className="w-full h-full bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: "url(/images/About/about2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />
      </div>

      {/* Right Side: Text Content Container */}
      <div className="flex flex-col justify-center items-end lg:items-end gap-4 sm:gap-6 lg:gap-8 w-full lg:w-[55%] lg:max-w-[616px] z-[2] lg:shrink-0">
        <h2 className="w-full font-ravi font-medium text-2xl sm:text-3xl lg:text-[32px] leading-[1.5] text-right lg:text-right text-white m-0">
          ایندور مپ چگونه کار می‌کند؟
        </h2>

        <div
          className="w-full font-ravi font-normal text-sm sm:text-base leading-7 sm:leading-8 text-justify text-gray-300"
          style={{
            textAlignLast: "right",
          }}
        >
          ایندور مپ (Indoor Map) با استفاده از فناوری‌های پیشرفته‌ای مانند
          سیستم‌های مکان‌یابی داخلی (IPS) کار می‌کند که به کاربران کمک می‌کند
          مسیرها و موقعیت‌های دقیق در فضاهای داخلی را پیدا کنند. برخلاف نقشه‌های
          خارجی که از GPS برای شناسایی موقعیت استفاده می‌کنند، ایندور مپ‌ها به
          دلیل محدودیت‌های سیگنال GPS در فضاهای بسته، از سیگنال‌های وای‌فای،
          بلوتوث و بیکن‌ها برای شناسایی موقعیت کاربران بهره می‌برند. این
          فناوری‌ها به دستگاه کاربر اجازه می‌دهند تا به نقاط اتصال (نظیر روترهای
          وای‌فای یا بیکن‌ها) وصل شده و موقعیت نسبی خود را در فضای داخلی تعیین
          کند. این روش‌ها به کاربر کمک می‌کنند تا به‌دقت مسیرهایی مثل راهروها،
          طبقات مختلف و حتی جزئیاتی مثل مکان فروشگاه‌ها یا اتاق‌های خاص را پیدا
          کند.
        </div>
      </div>
      <style jsx>{`
        .how-it-works-container {
          width: calc(100% - 160px);
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        /* iPad and 1280x800 adjustments */
        @media (max-width: 1280px) and (max-height: 800px) {
          .how-it-works-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 24px;
            gap: 24px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .how-it-works-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 24px;
            padding-right: 24px;
            margin-top: 32px;
            gap: 32px;
          }
        }

        /* Mobile adjustments - keep original width behavior */
        @media (max-width: 900px) {
          .how-it-works-container {
            width: 100%;
            max-width: 1280px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
}
