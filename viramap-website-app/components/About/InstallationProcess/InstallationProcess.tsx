"use client";

/**
 * InstallationProcess Component - Explains how to install indoor mapping
 * Displays text on the LEFT and image on the RIGHT with a button
 */
export default function InstallationProcess() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-0 gap-8 sm:gap-12 lg:gap-20 w-full max-w-[1280px] mx-auto mt-12 sm:mt-16 lg:mt-20 relative">
      {/* Left Side: Text Content Container */}
      <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 w-full lg:w-[616px]">
        {/* Title Section */}
        <div className="flex flex-col items-start w-full gap-1">
          {/* Title Text */}
          <h2 className="w-full font-morabba font-medium text-2xl sm:text-3xl lg:text-[32px] leading-[1.5] lg:leading-[57px] text-right text-white m-0">
            نصب و راه‌اندازی ایندور مپ‌ها چگونه است؟
          </h2>
        </div>

        {/* Description Text */}
        <div
          className="w-full font-yekanbakh font-normal text-sm sm:text-base leading-7 sm:leading-8 text-justify text-gray-300"
          style={{
            textAlignLast: "right",
            direction: "rtl",
          }}
        >
          پیاده‌سازی ایندور مپ برای کسب‌وکارها بسیار ساده‌تر از آن است که ممکن
          است تصور شود.{" "}
          <a
            href="/about-viramp"
            className="text-[#FB6514] no-underline font-semibold"
          >
            ویرامپ
          </a>{" "}
          به عنوان یک ایندور مپ به راحتی با زیرساخت‌های موجود در ساختمان‌ها
          مانند وای‌فای و بلوتوث کار می‌کنند، و برای نصب آن نیاز به تجهیزات خاص
          یا بازسازی فیزیکی فضا نیست. برای شروع، تیم‌های فنی از طریق نصب بیکن‌ها
          یا استفاده از روترهای موجود می‌توانند نقاط مرجع در فضای داخلی را تعیین
          کنند. این نقاط به عنوان راهنمایی برای دستگاه‌های کاربران عمل می‌کنند،
          و به کاربران اجازه می‌دهند تا با کمک{" "}
          <a
            href="/products/viramp-app"
            className="text-[#FB6514] no-underline font-semibold"
          >
            اپلیکیشن ویرامپ
          </a>{" "}
          موقعیت خود را به‌طور دقیق در محیط پیدا کنند.
        </div>

        {/* Button */}
        {/* Button Container با justify-content: flex-end */}
        <div className="flex justify-end w-full mt-2">
          {/* Button */}
          <button className="flex flex-row items-center justify-end gap-2 w-[195px] h-6 font-yekanbakh font-semibold text-sm leading-[26px] text-[#FB6514] bg-transparent border-none cursor-pointer p-0 transition-all duration-300">
            <span className="flex items-center">درباره ویرامپ</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008"
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

      {/* Right Side: Image Container */}
      <div className="relative w-full lg:w-[480px] h-[300px] sm:h-[400px] lg:h-[480px] flex-none order-1 lg:order-1">
        {/* Main Image */}
        <div
          className="w-full h-full bg-cover bg-center rounded-xl"
          style={{
            background: "url(/images/About/about3.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
