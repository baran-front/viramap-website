"use client";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#141414] text-white overflow-hidden flex flex-col items-center justify-center pt-12 pb-1 md:py-20 lg:py-0">
      {/* Blurred Glowing Circles - Responsive Positioning */}
      <div className="hidden md:block absolute w-[663px] h-[663px] -left-[500px] top-[180px] rounded-full bg-[#067871]/20 blur-[250px] z-0" />
      <div className="hidden md:block absolute w-[800px] h-[800px] -left-[200px] -top-[200px] rounded-full bg-[#FE8B20]/10 blur-[200px] z-0" />
      <div className="hidden lg:block absolute w-[500px] h-[500px] -right-[150px] -top-[100px] rounded-full bg-[#FB6514]/10 blur-[150px] z-0" />
      <div className="hidden lg:block absolute w-[600px] h-[600px] -right-[200px] -bottom-[200px] rounded-full bg-[#FE8B20]/8 blur-[180px] z-0" />

      {/* Left SVG Technical Drawing Background */}
      <div className="hidden md:block absolute left-0 top-0 w-1/2 h-full z-10 opacity-70">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1050 1716"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <g filter="url(#filter0_f_4001_16732)">
            <circle
              cx="218.5"
              cy="151.5"
              r="331.5"
              fill="#067871"
              fillOpacity="0.24"
            />
          </g>
          <g filter="url(#filter1_f_4001_16732)">
            <circle
              cx="89.5"
              cy="1326.5"
              r="189.5"
              fill="#FE8B20"
              fillOpacity="0.05"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_4001_16732"
              x="-613"
              y="-680"
              width="1663"
              height="1663"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="250"
                result="effect1_foregroundBlur_4001_16732"
              />
            </filter>
            <filter
              id="filter1_f_4001_16732"
              x="-300"
              y="937"
              width="779"
              height="779"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_4001_16732"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Right-Side Hero Background Image */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[url('/images/hero/background.png')] bg-contain bg-no-repeat bg-right pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1200px] w-full text-center">
        {/* Subtitle - Above Main Title */}
        <h3 className="font-morabba font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-[#E4E4E7] mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-full">
          اپلیکیشن مسیریابی هوشمند ویرامپ
        </h3>

        {/* Main Headline */}
        <h1 className="font-morabba font-bold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.45] xl:leading-normal text-[#E4E4E7] max-w-[965px] mx-auto mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 px-2">
          مسیر‌ها و امکانات هر مکان را کشف کن!
        </h1>

        {/* Subtitle, Arrow, and Badge Container - Horizontal Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3 mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-2 sm:px-4 w-full max-w-[965px]">
          {/* Gradient Subtitle (Right side in RTL - First) */}
          <p className="font-yekan font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] lg:leading-loose bg-gradient-to-r from-[#FE8B20] via-[#AECE3B] to-[#119389] bg-clip-text text-transparent flex-1 text-center sm:text-right order-1">
            از مسیریابی داخلی تا رزرو سریع خدمات و اطلاعات بروز، همه در یک
            اپلیکیشن
          </p>

          {/* Arrow SVG - Connecting subtitle to badge (Middle) */}
          <svg
            width="122"
            height="46"
            viewBox="0 0 122 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden sm:block w-[60px] sm:w-[80px] md:w-[100px] lg:w-[122px] h-auto shrink-0 order-2 mt-[30px]"
          >
            <path
              d="M120.433 1.90512C70.1609 -4.96894 95.7887 78.5992 3.46289 28.3135"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.49585 26.5059L12.0098 25.0588"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.49585 26.5059L5.81222 36.7958"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Badge - ساده و کاربردی (Left side in RTL - Last) */}
          <div className="flex items-center justify-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[rgba(42,153,255,0.1)] backdrop-blur-sm shadow-[0px_4px_15px_rgba(42,153,255,0.1)] rounded-3xl shrink-0 order-3 mt-[30px]">
            <span className="font-yekan font-semibold text-[13px] sm:text-[14px] md:text-[15px] lg:text-base leading-normal sm:leading-[1.6] md:leading-[1.75] text-[#E4E4E7] whitespace-nowrap">
              ساده و کاربردی
            </span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto px-4 sm:px-0">
          {/* Primary Button - درخواست دمو */}
          <button className="flex flex-row justify-center items-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 gap-2 w-full sm:w-[135px] md:w-[145px] lg:w-[155px] h-12 sm:h-[48px] bg-[#FB6514] rounded-xl border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#e55a12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FB6514]/30 active:scale-[0.98] active:translate-y-0">
            <span className="font-yekan font-semibold text-[14px] sm:text-[15px] md:text-base text-white whitespace-nowrap">
              درخواست دمو
            </span>
          </button>

          {/* Secondary Button - مشاوره رایگان */}
          <button className="flex flex-row justify-center items-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 w-full sm:w-[167px] md:w-[177px] lg:w-[187px] h-12 sm:h-[48px] bg-transparent rounded-lg text-[#FB6514] font-yekan font-semibold text-[14px] sm:text-[15px] md:text-base gap-2 transition-all duration-300 ease-in-out hover:bg-[#FB6514]/10 hover:border-[#FB6514]/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#FB6514]/20 active:scale-[0.98] active:translate-y-0">
            <span className="whitespace-nowrap">مشاوره رایگان</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180 w-5 h-5 sm:w-6 sm:h-6 shrink-0"
            >
              <path
                d="M9 5L16 12L9 19"
                stroke="#FB6514"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
