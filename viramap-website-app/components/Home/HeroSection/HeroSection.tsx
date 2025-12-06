// components/home/HeroSection/HeroSection.tsx
'use client';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#141414] text-white overflow-hidden flex flex-col items-center justify-center">

      {/* Ellipses - vertical, blurred */}
      <div className="absolute w-[663px] h-[663px] -left-[500px] top-[180px] rounded-full bg-[#067871]/20 blur-[250px] z-0" />
      <div className="absolute w-[800px] h-[800px] -left-[200px] -top-[200px] rounded-full bg-[#FE8B20]/10 blur-[200px] z-0" />
      <div className="absolute w-[500px] h-[500px] -right-[150px] -top-[100px] rounded-full bg-[#FB6514]/10 blur-[150px] z-0" />
      <div className="absolute w-[600px] h-[600px] -right-[200px] -bottom-[200px] rounded-full bg-[#FE8B20]/8 blur-[180px] z-0" />

      {/* Background SVG for left side */}
      <div className="absolute left-0 top-0 w-1/2 h-full z-1 opacity-70">
        <svg width="100%" height="100%" viewBox="0 0 1050 1716" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g filter="url(#filter0_f_4001_16732)">
            <circle cx="218.5" cy="151.5" r="331.5" fill="#067871" fillOpacity="0.24"/>
          </g>
          <g filter="url(#filter1_f_4001_16732)">
            <circle cx="89.5" cy="1326.5" r="189.5" fill="#FE8B20" fillOpacity="0.05"/>
          </g>
          <defs>
            <filter id="filter0_f_4001_16732" x="-613" y="-680" width="1663" height="1663" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_4001_16732"/>
            </filter>
            <filter id="filter1_f_4001_16732" x="-300" y="937" width="779" height="779" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_4001_16732"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 sm:px-12 lg:px-24 max-w-[1200px] text-center">
        {/* Title 1 */}
        <h3 className="font-morabba font-semibold text-[22px] sm:text-[26px] md:text-[28px] text-[#E4E4E7] mb-8">
          اپلیکیشن مسیریابی هوشمند ویرامپ
        </h3>

        {/* Title 2 */}
        <h1 className="font-morabba font-bold text-[36px] sm:text-[48px] md:text-[60px] leading-[1.2] md:leading-[1.5] text-[#E4E4E7] max-w-[965px] mx-auto mb-12">
          مسیر‌ها و امکانات هر مکان را کشف کن!
        </h1>

        {/* Subtitle - Gradient Text */}
        <p className="font-yekan font-semibold text-[16px] sm:text-[18px] md:text-[20px] max-w-[965px] bg-gradient-to-r from-[#FE8B20] via-[#AECE3B] to-[#119389] bg-clip-text text-transparent mb-12">
          از مسیریابی داخلی تا رزرو سریع خدمات و اطلاعات بروز، همه در یک اپلیکیشن
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
          <button className="px-6 py-3 w-[135px] sm:w-auto bg-[#FB6514] rounded-lg text-white font-yekan font-semibold transition-all hover:bg-[#e55a12] hover:-translate-y-1">
            درخواست دمو
          </button>
          <button className="px-6 py-3 w-[167px] sm:w-auto bg-transparent border-none rounded-lg text-[#FB6514] font-yekan font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#FB6514]/10 hover:-translate-y-1">
            مشاوره رایگان
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
              <path d="M9 5L16 12L9 19" stroke="#FB6514" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Side Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/images/hero/background.png')] bg-contain bg-no-repeat bg-right pointer-events-none z-0" />

    </section>
  );
};

export default HeroSection;
