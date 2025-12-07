// components/home/CTASection/CTASection.tsx
"use client";

const CTASection = () => {
  return (
    <section className="bg-[#141414] text-white flex flex-col items-center justify-center py-12 md:py-20 lg:py-30 px-4 sm:px-6 md:px-10 lg:px-20 font-[family-name:Vazirmatn,system-ui] text-center">
      {/* Main Container */}
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-[800px] w-full">
        {/* Badge - مشاوره رایگان */}
        <div className="flex flex-row justify-end items-start px-4 py-1.5 gap-6 w-auto min-w-[110px] h-[35px] bg-gradient-to-l from-[rgba(255,255,255,0.05)] to-transparent rounded-lg border border-[#344054]">
          <span className="font-yekan font-normal text-[12px] leading-[22px] text-white text-right">
            مشاوره رایگان
          </span>
        </div>

        {/* عنوان اصلی */}
        <h2 className="font-morabba font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-[36px] sm:leading-[42px] md:leading-[48px] lg:leading-[57px] text-[#FAFAFA] text-center m-0">
          با ویرامپ، مسیر ها را روشن کنید...
        </h2>

        {/* توضیحات */}
        <p className="font-yekan font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[28px] md:leading-[32px] text-[#E4E4E7] text-center max-w-[796px] w-full m-0">
          با کمک مسیریابی هوشمند، تجربه‌ای خودکفا و لذت‌بخش برای بازدیدکنندگان
          فراهم کنید.
        </p>

        {/* دکمه تماس با ما */}
        <button className="flex flex-row justify-center items-center px-5 py-3 gap-2 w-full sm:w-[135px] h-12 bg-[#FB6514] rounded-lg border-none cursor-pointer mt-4 transition-all hover:bg-[#e55a12] hover:-translate-y-1 active:scale-95">
          <span className="font-yekan font-semibold text-[14px] leading-[26px] text-[#E4E4E7] text-center">
            تماس با ما
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTASection;
