"use client";

export default function DifferenceSection() {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-between items-center px-4 sm:px-6 lg:px-0 gap-6 sm:gap-8 lg:gap-10 w-full max-w-[1280px] mx-auto my-16 sm:my-20 lg:my-[80px] mb-24 sm:mb-32 lg:mb-[150px]">
      {/* Right Side: Image Container - 50% */}
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[476px]">
        {/* Ellipse Background */}
        <div
          className="absolute hidden lg:block"
          style={{
            position: "absolute",
            width: "519px",
            height: "519px",
            left: "calc(50% - 259.5px)",
            top: "-52px",
            background: "rgba(254, 139, 32, 0.3)",
            filter: "blur(150px)",
            borderRadius: "50%",
          }}
        />

        {/* Image */}
        <div
          className="absolute w-full h-full"
          style={{
            background: "url(/images/About/three-phones.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Left Side: Text Content - 50% */}
      <div className="flex flex-col justify-center items-end lg:items-end gap-4 sm:gap-6 w-full lg:w-1/2">
        <h2 className="w-full font-morabba font-medium text-2xl sm:text-3xl lg:text-[32px] leading-[1.5] lg:leading-[57px] text-right text-white m-0">
          تفاوت ویرا مپ با گوگل مپ و سایر مپ‌ها چیست؟
        </h2>

        <p
          className="w-full font-yekanbakh font-normal text-sm sm:text-base leading-7 sm:leading-8 text-justify text-gray-300"
          style={{
            textAlignLast: "right",
          }}
        >
          ویرا مپ، به‌عنوان اولین مسیریاب داخلی ایران، با ارائه نقشه‌های دقیق
          برای فضاهای بسته، مانند بیمارستان‌ها، فرودگاه‌ها، مراکز خرید و
          نمایشگاه‌ها، تجربه‌ای جدید از مسیریابی هوشمند داخلی را به ارمغان آورده
          است. با کمک تکنولوژی‌های پیشرفته و پشتیبانی از محیط‌های چندطبقه، ویرا
          مپ به کاربران این امکان را می‌دهد که به‌آسانی مسیر خود را در محیط‌های
          داخلی پیچیده پیدا کنند و به خدمات موردنیاز دسترسی داشته باشند.
        </p>
      </div>
    </div>
  );
}
