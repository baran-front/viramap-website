"use client";

/**
 * MissionVision Component - Explains why indoor mapping is important
 * Displays an image on the RIGHT and text content on the LEFT
 */
export default function MissionVision() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-0 w-full max-w-[1280px] h-auto lg:h-[480px] mx-auto my-0 gap-8 sm:gap-12 lg:gap-20">
      {/* Left Side: Text Content Container */}
      <div className="flex flex-col justify-center items-start w-full lg:w-[616px] h-auto lg:h-[241px] flex-none order-0 gap-4 sm:gap-6">
        {/* Title Section */}
        <div className="flex flex-col items-start w-full gap-1">
          <h2 className="w-full font-morabba font-medium text-2xl sm:text-3xl leading-[1.5] lg:leading-[57px] text-white text-right m-0">
            چرا باید از ایندور مپ استفاده کنیم؟
          </h2>
        </div>

        {/* Description Text */}
        <p className="w-full font-yekanbakh font-normal text-sm sm:text-base leading-7 sm:leading-8 text-gray-300 text-justify">
          نقشه‌های خارجی توانایی پوشش فضای داخلی ساختمان‌ها، به ویژه مکان‌های
          چندطبقه یا پیچیده را ندارند؛ اما ایندور مپ با بهره‌گیری از
          تکنولوژی‌های مختلف (مثل وای‌فای، بلوتوث، یا بیکن‌ها)، موقعیت دقیق
          کاربران را در محیط‌های داخلی مشخص می‌کند و آن‌ها را به مقصد هدایت
          می‌کند. ایندور مپ‌ها مزیت‌های ویژه‌ای دارند، از جمله کمک به کاربران
          برای پیدا کردن سریع‌تر مکان‌ها، کاهش نیاز به راهنمایی حضوری، و دسترسی
          به اطلاعات کاربردی درباره‌ی امکانات و خدمات داخلی که در دسترس آن‌هاست.
        </p>
      </div>

      {/* Right Side: Image Container */}
      <div className="relative w-full lg:w-[480px] h-[300px] sm:h-[400px] lg:h-[480px] flex-none order-1">
        <div className="relative w-full h-full">
          {/* فقط تصویر با سایه - بدون بلور پشت */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/About/about1.png)",
              filter: "drop-shadow(10px 15px 20px rgba(248, 248, 248, 0.24))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
