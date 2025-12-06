// components/platform/PlatformSection2.tsx
'use client';

interface PlatformSection2Props {
  title?: string;
  description?: string;
  linkWord?: string;
}

export default function PlatformSection2({ 
  title = "یک سیستم موقعیت یابی کامل در داخل ساختمان برای راه حل های ناوبری و ردیابی داخلی شما",
  description = "سیستم موقعیت یابی داخلی {link} مجموعه ای است که شامل تمام ابزارهای لازم برای توسعه و یا ادغام انواع راه حل ها بر اساس موقعیت یابی داخلی (و همچنین در فضای باز) است: برنامه های راهنمای خارج از جعبه یا کاملاً سفارشی شده، نقشه های تعاملی با سه بعدی. عناصر، محیط های واقعیت افزوده ادغام شده با ناوبری بلادرنگ، تجزیه و تحلیل جغرافیایی برای ممیزی فرآیند و خدمات، آلارم های هوشمند… به {link} بپیوندید و از مکان داخلی بیشترین بهره را ببرید.",
  linkWord = "ویرامپ"
}: PlatformSection2Props) {
  
  const formattedDescription = description.replace(/\{link\}/g, linkWord);
  
  return (
    <div className="w-full py-40">
      {/* Main Content Container */}
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Consultation Section Container */}
        <div className="flex flex-col items-center gap-8 mb-24">
          {/* Title */}
          <div className="w-full text-center space-y-2">
            <h2 
              className="morabba-text text-white leading-[57px]"
              style={{
                fontSize: '32px',
                fontWeight: '500',
                lineHeight: '57px',
              }}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <div 
            className="text-center max-w-[796px] px-4"
            style={{
              fontFamily: "'Yekan Bakh'",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '32px',
              color: '#E4E4E7',
            }}
          >
            <div className="leading-relaxed rtl text-justify">
              {formattedDescription.split(linkWord).map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <a 
                      href="/" 
                      className="text-[#FB6514] hover:text-[#B2480E] transition-colors duration-200 inline-block mx-1"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                        fontWeight: '600',
                      }}
                    >
                      {linkWord}
                    </a>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image and Features Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side - Features */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              {[
                { text: "موقعیت‌یابی دقیق در محیط‌های داخلی", delay: "0" },
                { text: "نقشه‌های تعاملی سه‌بعدی", delay: "100" },
                { text: "راهنمای ناوبری بلادرنگ", delay: "200" },
                { text: "تجزیه و تحلیل جغرافیایی", delay: "300" },
                { text: "هشدارهای هوشمند", delay: "400" },
                { text: "ادغام با واقعیت افزوده", delay: "500" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-[-8px]"
                  style={{
                    animationDelay: `${feature.delay}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <div 
                    className="text-right flex-1 transition-all duration-300 group-hover:text-[#FB6514]"
                    style={{
                      fontFamily: "'Yekan Bakh'",
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '18px',
                      lineHeight: '32px',
                      color: '#FAFAFA',
                    }}
                  >
                    {feature.text}
                  </div>
                  <div className="w-3 h-3 bg-[#FB6514] rounded-full transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:shadow-[0_0_12px_rgba(251,101,20,0.4)]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2">
            <div 
              className="relative w-full h-[480px] rounded-3xl overflow-hidden group transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(63, 63, 70, 0.15) 0%, rgba(82, 82, 91, 0.15) 100%)',
                border: '1px solid rgba(63, 63, 70, 0.3)',
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-[rgba(251,101,20,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-4 transform transition-all duration-500 group-hover:scale-105">
                  <div className="inline-block p-4 rounded-2xl mb-2">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12">
                      <path d="M32 12L44 24L32 36L20 24L32 12Z" stroke="rgba(228,228,231,0.6)" strokeWidth="2"/>
                      <path d="M32 32L44 44" stroke="rgba(228,228,231,0.6)" strokeWidth="2"/>
                      <path d="M20 20L32 32" stroke="rgba(228,228,231,0.6)" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div 
                    className="text-gray-300 text-lg mb-2 transition-all duration-500 group-hover:text-white"
                    style={{
                      fontFamily: "'Yekan Bakh'",
                      fontWeight: '500',
                    }}
                  >
                    پلتفرم موقعیت‌یابی داخلی
                  </div>
                  <div 
                    className="text-gray-400 text-sm max-w-xs transition-all duration-500 group-hover:text-gray-300"
                    style={{
                      fontFamily: "'Yekan Bakh'",
                    }}
                  >
                    سیستم جامع برای ناوبری و ردیابی هوشمند
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[rgba(251,101,20,0.2)] rounded-tl-3xl transition-all duration-500 group-hover:border-[rgba(251,101,20,0.6)]"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[rgba(251,101,20,0.2)] rounded-br-3xl transition-all duration-500 group-hover:border-[rgba(251,101,20,0.6)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}