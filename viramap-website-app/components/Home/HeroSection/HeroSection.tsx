// components/home/HeroSection/HeroSection.tsx
'use client';

const HeroSection = () => {
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      backgroundColor: '#141414',
      color: 'white',
      display: 'flex',
      fontFamily: 'Vazirmatn, system-ui',
      overflow: 'hidden'
    }}>
      {/* Ellipse 52 - اصلی بالا سمت چپ */}
      <div style={{
        position: 'absolute',
        width: '663px',
        height: '663px',
        left: 'calc(50% - 331.5px - 501.5px)', // 663px/2 = 331.5px
        top: '180px',
        filter: 'blur(250px)',
        zIndex: 0,
      }}></div>

      {/* Ellipse اضافی برای عمق بیشتر */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        left: '-200px',
        top: '-200px',
        filter: 'blur(200px)',
        zIndex: 0,
      }}></div>

      {/* Ellipse سمت راست بالا */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        right: '-150px',
        top: '-100px',
        background: 'rgba(251, 101, 20, 0.1)',
        filter: 'blur(150px)',
        zIndex: 0,
      }}></div>

      {/* Ellipse پایین سمت راست */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        right: '-200px',
        bottom: '-200px',
        background: 'rgba(254, 139, 32, 0.08)',
        filter: 'blur(180px)',
        zIndex: 0,
      }}></div>

      {/* Background SVG for left side */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '50%',
        height: '100%',
        zIndex: 1,
        opacity: 0.7
      }}>
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

      {/* Left Side - Content (50%) */}
      <div style={{
        width: '100%',
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Title 1 */}
        <div style={{
          fontFamily: "'Morabba', sans-serif",
          fontWeight: 600,
          fontSize: '22px',
          lineHeight: '40px',
          color: '#E4E4E7',
          marginBottom: '32px',
          textAlign: 'center',
          justifyContent:'center'
        }}>
          اپلیکیشن مسیریابی هوشمند ویرامپ
        </div>

        {/* Title 2 */}
        <div style={{
          fontFamily: "'Morabba', sans-serif",
          fontWeight: 'bold',
          fontSize: '60px',
          lineHeight: '92px',
          color: '#E4E4E7',
          marginBottom: '0px',
          textAlign: 'center',
          maxWidth: '965px',
          display:'grid',
          justifyContent:'center'
        }}>
          مسیر‌ها و امکانات هر مکان را کشف کن!
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '48px',
          justifyContent:'center',
          position:'relative',
          right:'100px'
        }}>
          {/* Gradient Text */}
          <div style={{
            fontFamily: "'Yekan Bakh', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '40px',
            background: 'linear-gradient(269.96deg, #FE8B20 29.13%, #AECE3B 47.88%, #119389 65.19%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0px',
            textAlign: 'center',
            maxWidth: '965px'
          }}>
            از مسیریابی داخلی تا رزرو سریع خدمات و اطلاعات بروز، همه در یک اپلیکیشن
          </div>

          {/* Arrow SVG with Text Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0px',
            top:'23px',
            position: 'relative'
          }}>
            {/* SVG Arrow */}
            <svg width="122" height="46" viewBox="0 0 122 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M120.433 1.90512C70.1609 -4.96894 95.7887 78.5992 3.46289 28.3135" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.49585 26.5059L12.0098 25.0588" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.49585 26.5059L5.81222 36.7958" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Label */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px 24px',
              gap: '10px',
              width: '152px',
              height: '36px',
              background: 'rgba(251, 101, 20, 0.1)',
              boxShadow: '0px 4px 15px rgba(42, 153, 255, 0.1)',
              borderRadius: '24px',
              marginLeft: '16px',
              position:'relative',
              left:'10px',
              top:'-5px'
            }}>
              <span style={{
                fontFamily: "'Yekan Bakh', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '32px',
                color: '#E4E4E7'
              }}>
                ساده و کاربردی
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '48px',
          justifyContent:'center'
        }}>
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 20px',
            gap: '8px',
            width: '135px',
            height: '48px',
            backgroundColor: '#FB6514',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e55a12';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FB6514';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{
              fontFamily: "'Yekan Bakh', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '26px',
              color: 'white'
            }}>
              درخواست دمو
            </span>
          </button>
          
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 20px',
            gap: '8px',
            width: '167px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(251, 101, 20, 0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{
              fontFamily: "'Yekan Bakh', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '26px',
              color: '#FB6514'
            }}>
              مشاوره رایگان
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
              <path d="M9 5L16 12L9 19" stroke="#FB6514" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Side background as overlay */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: 0,
        width: '50%',
        height: '100%',
        backgroundImage: 'url(/images/hero/background.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        pointerEvents: 'none', // تا کلیک روی محتوای سمت چپ امکان‌پذیر باشه
        zIndex: 0
      }}></div>

    </section>
  );
};

export default HeroSection;