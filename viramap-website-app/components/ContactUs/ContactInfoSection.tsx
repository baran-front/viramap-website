"use client";

const ContactInfoSection = () => {
  const contactInfo = {
    title: "ارتباط با ما، تضمین آینده کسب و کار شماست.",
    description: "اجازه دهید با راهکارهای تخصصی و پشتیبانی دلسوزانه، مسیر موفقیت شما را هموار کنیم",
    
    features: [
      {
        id: 1,
        title: "وبسایت",
        value: "www.arvinvira.com",
        icon: (
          <div className="relative w-12 h-12">
            {/* Globe SVG */}
            <svg className="absolute inset-0" viewBox="0 0 48 48" fill="none">
              {/* 8 dots around center */}
              <rect x="6" y="34" width="4" height="4" fill="#FB6514" fillOpacity="0.4" />
              <rect x="38" y="34" width="4" height="4" fill="#FB6514" fillOpacity="0.4" />
              <rect x="38" y="6" width="4" height="4" fill="#FB6514" fillOpacity="0.4" />
              <rect x="6" y="6" width="4" height="4" fill="#FB6514" fillOpacity="0.4" />
              <rect x="22" y="4" width="4" height="4" fill="#FB6514" />
              <rect x="4" y="22" width="4" height="4" fill="#FB6514" />
              <rect x="40" y="22" width="4" height="4" fill="#FB6514" />
              <rect x="22" y="40" width="4" height="4" fill="#FB6514" />
              {/* Center dot */}
              <rect x="22" y="22" width="4" height="4" fill="#FB6514" />
            </svg>
          </div>
        )
      },
      {
        id: 2,
        title: "ایمیل",
        value: "Info@arvinvira.com",
        icon: (
          <div className="relative w-12 h-12">
            {/* Email SVG */}
            <svg className="absolute inset-0" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="7" width="40" height="34" rx="2" fill="#FB6514" fillOpacity="0.4" stroke="#FB6514" strokeWidth="1.5" />
              <path d="M8 14L24 26L40 14" stroke="#FB6514" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      },
      {
        id: 3,
        title: "تماس",
        value: "۰۹۱۲۵۶۷۸۹۸۷",
        value2: "۰۹۱۲۳۴۵۶۷۸۹",
        icon: (
          <div className="relative w-12 h-12">
            {/* Phone SVG */}
            <svg className="absolute inset-0" viewBox="0 0 48 48" fill="none">
              <rect x="10" y="4" width="28" height="40" rx="4" fill="#FB6514" fillOpacity="0.4" stroke="#FB6514" strokeWidth="1.5" />
              <rect x="22" y="36" width="4" height="4" rx="1" fill="#FB6514" stroke="#FB6514" strokeWidth="1.5" />
            </svg>
          </div>
        )
      },
      {
        id: 4,
        title: "آدرس",
        value: "خراسان رضوی، مشهد، بلوار خیام، خیام جنوبی ۲۶ پلاک ۱۰، طبقه ۵",
        icon: (
          <div className="relative w-12 h-12">
            {/* Location SVG */}
            <svg className="absolute inset-0" viewBox="0 0 48 48" fill="none">
              <path d="M24 44C24 44 40 30 40 18C40 10 34 4 24 4C14 4 8 10 8 18C8 30 24 44 24 44Z" fill="#FB6514" fillOpacity="0.4" stroke="#FB6514" strokeWidth="1.5" />
              <circle cx="24" cy="18" r="4" fill="#FB6514" stroke="#FB6514" strokeWidth="1.5" />
            </svg>
          </div>
        )
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-12 mb-16">
        <div className="flex flex-col justify-center items-center gap-1">
          <h2 className="font-morabba text-4xl md:text-[42px] font-medium text-white text-center leading-tight md:leading-[1.3] mb-4">
            {contactInfo.title}
          </h2>
          <p className="font-yekan-bakh text-lg md:text-xl font-normal text-gray-300 text-center leading-8 max-w-3xl">
            {contactInfo.description}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
        {contactInfo.features.map((feature) => (
          <div 
            key={feature.id}
            className="group relative border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
            style={{
              backdropFilter: 'blur(10px)',
              minHeight: '172px'
            }}
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="font-yekan-bakh text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                
                <div className="space-y-1">
                  <p className="font-yekan-bakh text-sm text-gray-400 leading-relaxed">
                    {feature.value}
                  </p>
                  {feature.value2 && (
                    <p className="font-yekan-bakh text-sm text-gray-400 leading-relaxed">
                      {feature.value2}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-500/30 rounded-tl-lg group-hover:border-orange-500/70 transition-colors" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-500/30 rounded-tr-lg group-hover:border-orange-500/70 transition-colors" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-orange-500/30 rounded-bl-lg group-hover:border-orange-500/70 transition-colors" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-500/30 rounded-br-lg group-hover:border-orange-500/70 transition-colors" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ContactInfoSection;