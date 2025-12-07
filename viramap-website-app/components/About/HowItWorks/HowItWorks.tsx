"use client";

export default function HowItWorks() {
  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-5 gap-8 sm:gap-12 lg:gap-20 w-full max-w-[1280px] h-auto mt-12 sm:mt-16 lg:mt-20 mx-auto overflow-hidden">
      {/* Container برای Ellipse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ellipse 53 - نسخه قابل مشاهده */}
        <div
          className="absolute hidden lg:block"
          style={{
            width: "400px",
            height: "400px",
            left: "-200px",
            top: "70%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(251, 101, 20, 0.18) 0%, rgba(251, 101, 20, 0.1) 50%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.9,
            zIndex: 1,
          }}
        />
      </div>

      {/* Left Side: Image Container */}
      <div className="relative w-full sm:w-4/5 lg:w-[40%] max-w-[480px] lg:max-w-[480px] h-auto aspect-square z-[2]">
        {/* Main Image */}
        <div
          className="w-full h-full bg-cover bg-center rounded-xl"
          style={{
            background: "url(/images/About/about2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        />
      </div>

      {/* Right Side: Text Content Container */}
      <div className="flex flex-col justify-center items-end lg:items-end gap-4 sm:gap-6 w-full lg:w-[55%] lg:max-w-[616px] z-[2]">
        <h2 className="w-full font-morabba font-medium text-2xl sm:text-3xl lg:text-[32px] leading-[1.5] text-right lg:text-right text-white m-0">
          ایندور مپ چگونه کار می‌کند؟
        </h2>

        <div
          className="w-full font-yekanbakh font-normal text-sm sm:text-base leading-7 sm:leading-8 text-justify text-gray-300"
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
    </div>
  );
}
