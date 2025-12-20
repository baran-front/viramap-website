"use client";

import Link from "next/link";

/**
 * InstallationProcess Component - Explains how to install indoor mapping
 * Displays text on the LEFT and image on the RIGHT with a button
 */
export default function InstallationProcess() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-5 sm:px-6 lg:px-0 gap-8 sm:gap-12 lg:gap-16 installation-process-container w-full max-w-[1280px] mx-auto mt-8 sm:mt-12 lg:mt-16 relative">
      {/* Left Side: Text Content Container */}
      <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 lg:gap-8 w-full lg:w-[616px] lg:shrink-0">
        {/* Title Section */}
        <div className="flex flex-col items-start w-full gap-1">
          {/* Title Text */}
          <h2 className="w-full font-ravi font-medium text-2xl sm:text-3xl lg:text-[32px] leading-normal lg:leading-[57px] text-right text-white m-0">
            نصب و راه‌اندازی ایندور مپ‌ها چگونه است؟
          </h2>
        </div>

        {/* Description Text */}
        <div
          className="w-full font-ravi font-normal text-sm sm:text-base leading-7 sm:leading-8 text-justify text-gray-300 text-right rtl"
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
        <div className="flex justify-end w-full mt-4 sm:mt-6 lg:mt-8">
          {/* Button */}
          <Link
            href="/read-more/3"
            className="flex flex-row items-center justify-end gap-2 w-[195px] h-6 font-ravi font-semibold text-sm leading-[26px] text-[#FB6514] bg-transparent border-none cursor-pointer p-0 transition-all duration-300"
          >
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
          </Link>
        </div>
      </div>

      {/* Right Side: Image Container - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block relative w-[480px] h-[480px] shrink-0">
        {/* Main Image */}
        <div
          className="w-full h-full bg-[url('/images/About/about3.png')] bg-cover bg-center bg-no-repeat rounded-xl drop-shadow-[10px_15px_20px_rgba(248,248,248,0.24)]"
        />
      </div>
      <style jsx>{`
        .installation-process-container {
          width: calc(100% - 160px);
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        /* iPad and 1280x800 adjustments */
        @media (max-width: 1280px) and (max-height: 800px) {
          .installation-process-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 24px;
            gap: 24px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .installation-process-container {
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
          .installation-process-container {
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
