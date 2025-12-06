// components/platform/PlatformSection3.tsx
'use client';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

export default function PlatformSection3() {
  // ویژگی‌های بخش اول (سمت چپ)
  const leftFeatures: FeatureItem[] = [
    {
      id: 1,
      title: "موقعیت‌یابی دقیق",
      description: "دقت بالا در محیط‌های داخلی و خارجی با استفاده از فناوری پیشرفته"
    },
    {
      id: 2,
      title: "نقشه‌های تعاملی",
      description: "نقشه‌های سه‌بعدی و پویا با قابلیت زوم و چرخش ۳۶۰ درجه"
    },
    {
      id: 3,
      title: "ناوبری بلادرنگ",
      description: "هدایت لحظه‌ای به مقصد با کمترین تاخیر و بیشترین دقت"
    }
  ];

  // ویژگی‌های بخش دوم (سمت راست)
  const rightFeatures: FeatureItem[] = [
    {
      id: 4,
      title: "تحلیل داده",
      description: "آنالیز رفت‌وآمد و بهینه‌سازی مسیرها با هوش مصنوعی"
    },
    {
      id: 5,
      title: "هشدار هوشمند",
      description: "اعلان‌های لحظه‌ای بر اساس موقعیت و شرایط محیطی"
    },
    {
      id: 6,
      title: "ادغام API",
      description: "قابلیت اتصال به سیستم‌های موجود و توسعه آسان"
    }
  ];

  return (
    <div className="w-full py-40">
      <div className="max-w-[1480px] mx-auto px-8">
        
        {/* بخش اول - عکس سمت راست، ویژگی‌ها سمت چپ */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-40">

            <div className="w-full lg:w-1/2">
            <div 
              className="relative w-full h-[500px] rounded-3xl overflow-hidden group transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(63, 63, 70, 0.15) 0%, rgba(82, 82, 91, 0.15) 100%)',
                border: '1px solid rgba(63, 63, 70, 0.3)',
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[rgba(251,101,20,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6 transform transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Icon */}
                  <div className="inline-block p-5 rounded-2xl mb-4">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 101, 20, 0.15) 0%, rgba(143, 101, 255, 0.15) 100%)',
                        border: '1px solid rgba(251, 101, 20, 0.3)'
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-80">
                        <circle cx="20" cy="20" r="15" stroke="rgba(251,101,20,0.8)" strokeWidth="2"/>
                        <path d="M20 10V20" stroke="rgba(251,101,20,0.8)" strokeWidth="2"/>
                        <path d="M20 20L30 20" stroke="rgba(251,101,20,0.8)" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="space-y-3">
                    <div 
                      className="text-white text-2xl font-bold transition-all duration-500 group-hover:text-[#FB6514]"
                      style={{
                        fontFamily: "'Morabba'",
                      }}
                    >
                      سیستم موقعیت‌یابی
                    </div>
                    <div 
                      className="text-gray-400 text-sm max-w-xs mx-auto leading-6"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                      }}
                    >
                      نمایش پیشرفته قابلیت‌های ناوبری داخلی در محیط‌های پیچیده
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[rgba(251,101,20,0.2)] rounded-tl-3xl transition-all duration-500 group-hover:border-[rgba(251,101,20,0.6)]"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[rgba(251,101,20,0.2)] rounded-br-3xl transition-all duration-500 group-hover:border-[rgba(251,101,20,0.6)]"></div>
            </div>
          </div>
          
          {/* سمت چپ - ویژگی‌ها */}
          <div className="w-full lg:w-1/2 space-y-10">
            {/* تایتل بخش */}
            <div className="space-y-6">
              <h2 
                className="text-3xl lg:text-4xl font-bold text-white text-right leading-[57px]"
                style={{
                  fontFamily: "'Morabba'",
                  fontWeight: '500',
                }}
              >
                قابلیت‌های پیشرفته موقعیت‌یابی
              </h2>
              <p 
                className="text-gray-300 text-right leading-8"
                style={{
                  fontFamily: "'Yekan Bakh'",
                  fontSize: '16px',
                  lineHeight: '32px',
                }}
              >
                سیستم جامع ما با ترکیب فناوری‌های نوین، تجربه‌ای بی‌نظیر از موقعیت‌یابی داخلی ارائه می‌دهد.
              </p>
            </div>

            {/* لیست ویژگی‌ها */}
            <div className="space-y-8">
              {leftFeatures.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-[-6px]"
                >
                  {/* شماره */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 101, 20, 0.1) 0%, rgba(143, 101, 255, 0.1) 100%)',
                        border: '1px solid rgba(251, 101, 20, 0.2)'
                      }}
                    >
                      <span 
                        className="text-white text-lg font-bold"
                        style={{
                          fontFamily: "'Yekan Bakh'",
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* محتوا */}
                  <div className="flex-1 text-right">
                    <h3 
                      className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#FB6514]"
                      style={{
                        fontFamily: "'Morabba'",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-gray-400 leading-7"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                        fontSize: '15px',
                        lineHeight: '28px',
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>

        {/* بخش دوم - معکوس بخش اول */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* سمت چپ - عکس */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div 
              className="relative w-full h-[500px] rounded-3xl overflow-hidden group transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(82, 82, 91, 0.15) 0%, rgba(63, 63, 70, 0.15) 100%)',
                border: '1px solid rgba(143, 101, 255, 0.3)',
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-[rgba(143,101,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6 transform transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Icon */}
                  <div className="inline-block p-5 rounded-2xl mb-4">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[-6]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(143, 101, 255, 0.15) 0%, rgba(251, 101, 20, 0.15) 100%)',
                        border: '1px solid rgba(143, 101, 255, 0.3)'
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-80">
                        <rect x="8" y="8" width="24" height="24" stroke="rgba(143,101,255,0.8)" strokeWidth="2"/>
                        <rect x="14" y="14" width="12" height="12" stroke="rgba(143,101,255,0.8)" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="space-y-3">
                    <div 
                      className="text-white text-2xl font-bold transition-all duration-500 group-hover:text-[#8F65FF]"
                      style={{
                        fontFamily: "'Morabba'",
                      }}
                    >
                      تجزیه و تحلیل داده
                    </div>
                    <div 
                      className="text-gray-400 text-sm max-w-xs mx-auto leading-6"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                      }}
                    >
                      آنالیز پیشرفته رفتارها و بهینه‌سازی جریان‌های حرکتی
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[rgba(143,101,255,0.2)] rounded-tr-3xl transition-all duration-500 group-hover:border-[rgba(143,101,255,0.6)]"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[rgba(143,101,255,0.2)] rounded-bl-3xl transition-all duration-500 group-hover:border-[rgba(143,101,255,0.6)]"></div>
            </div>
          </div>

          {/* سمت راست - ویژگی‌ها */}
          <div className="w-full lg:w-1/2 space-y-10 order-1 lg:order-2">
            {/* تایتل بخش */}
            <div className="space-y-6">
              <h2 
                className="text-3xl lg:text-4xl font-bold text-white text-right leading-[57px]"
                style={{
                  fontFamily: "'Morabba'",
                  fontWeight: '500',
                }}
              >
                تحلیل و گزارش‌گیری هوشمند
              </h2>
              <p 
                className="text-gray-300 text-right leading-8"
                style={{
                  fontFamily: "'Yekan Bakh'",
                  fontSize: '16px',
                  lineHeight: '32px',
                }}
              >
                با ابزارهای تحلیلی قدرتمند ما، از داده‌های موقعیتی بیشترین بهره را ببرید.
              </p>
            </div>

            {/* لیست ویژگی‌ها */}
            <div className="space-y-8">
              {rightFeatures.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-[6px]"
                >
                  {/* شماره */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(143, 101, 255, 0.1) 0%, rgba(251, 101, 20, 0.1) 100%)',
                        border: '1px solid rgba(143, 101, 255, 0.2)'
                      }}
                    >
                      <span 
                        className="text-white text-lg font-bold"
                        style={{
                          fontFamily: "'Yekan Bakh'",
                        }}
                      >
                        {index + 4}
                      </span>
                    </div>
                  </div>

                  {/* محتوا */}
                  <div className="flex-1 text-right">
                    <h3 
                      className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#8F65FF]"
                      style={{
                        fontFamily: "'Morabba'",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-gray-400 leading-7"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                        fontSize: '15px',
                        lineHeight: '28px',
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}