"use client";

export default function DifferenceSection() {
  return (
    <div className="difference-section-container flex flex-col md:flex-row-reverse justify-between items-center px-5 sm:px-6 md:px-8 lg:px-0 gap-6 sm:gap-8 md:gap-10 lg:gap-16 w-full max-w-[1280px] mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-16 mb-6 sm:mb-8 md:mb-12 lg:mb-16">
      {/* Right Side: Image Container - 50% */}
      {/* Image for mobile, iPad (md) - smaller size, for desktop (lg) - full size */}
      <div className="block relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[350px] md:h-[220px] lg:w-1/2 lg:max-w-none lg:h-[476px] mx-auto md:mx-0">
        {/* Image */}
        <div
          className="absolute w-full h-full bg-[url('/images/About/three-phones.png')] bg-contain bg-center bg-no-repeat"
        />
      </div>

      {/* Left Side: Text Content - 50% */}
      <div className="flex flex-col justify-center items-end gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full md:w-1/2">
        <h2 className="w-full font-ravi font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-[1.4] sm:leading-normal lg:leading-[57px] text-right text-white m-0">
          تفاوت ویرا مپ با گوگل مپ و سایر مپ‌ها چیست؟
        </h2>

        <p
          className="w-full font-ravi font-normal text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8 text-justify text-gray-300 text-right"
        >
          ویرا مپ، به‌عنوان اولین مسیریاب داخلی ایران، با ارائه نقشه‌های دقیق
          برای فضاهای بسته، مانند بیمارستان‌ها، فرودگاه‌ها، مراکز خرید و
          نمایشگاه‌ها، تجربه‌ای جدید از مسیریابی هوشمند داخلی را به ارمغان آورده
          است. با کمک تکنولوژی‌های پیشرفته و پشتیبانی از محیط‌های چندطبقه، ویرا
          مپ به کاربران این امکان را می‌دهد که به‌آسانی مسیر خود را در محیط‌های
          داخلی پیچیده پیدا کنند و به خدمات موردنیاز دسترسی داشته باشند.
        </p>
      </div>
      <style jsx>{`
        .difference-section-container {
          width: calc(100% - 160px);
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        /* iPad and 1280x800 adjustments */
        @media (max-width: 1280px) and (max-height: 800px) {
          .difference-section-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 24px;
            margin-bottom: 24px;
            gap: 24px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .difference-section-container {
            width: calc(100% - 80px);
            max-width: calc(100% - 80px);
            padding-left: 24px;
            padding-right: 24px;
            margin-top: 32px;
            margin-bottom: 32px;
            gap: 32px;
          }
        }

        /* Mobile adjustments - keep original width behavior */
        @media (max-width: 900px) {
          .difference-section-container {
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
