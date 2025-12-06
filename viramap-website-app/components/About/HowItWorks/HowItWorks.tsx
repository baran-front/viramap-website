'use client';

export default function HowItWorks() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      gap: '80px',
      width: '100%',
      maxWidth: '1280px',
      height: 'auto',
      margin: '80px auto 0 auto',
      boxSizing: 'border-box'
    }}>
      
      {/* Container برای Ellipse */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'visible',
        pointerEvents: 'none'
      }}>
        {/* Ellipse 53 - نسخه قابل مشاهده */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          left: '-200px',
          top: '70%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(251, 101, 20, 0.18) 0%, rgba(251, 101, 20, 0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.9,
          zIndex: 1
        }} />
      </div>
      
      {/* Left Side: Image Container */}
      <div style={{
        position: 'relative',
        width: '40%',
        maxWidth: '480px',
        minWidth: '300px',
        height: 'auto',
        aspectRatio: '1/1',
        zIndex: 2
      }}>
        {/* Main Image */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'url(/images/About/about2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
        }} />
      </div>
      
      {/* Right Side: Text Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '24px',
        width: '55%',
        maxWidth: '616px',
        height: 'auto',
        zIndex: 2
      }}>
        
        <h2 style={{
          width: '100%',
          fontFamily: "'Morabba', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(24px, 3vw, 32px)',
          lineHeight: '1.5',
          textAlign: 'right',
          color: '#FAFAFA',
          margin: 0
        }}>
          ایندور مپ چگونه کار می‌کند؟
        </h2>
        
        <div style={{
          width: '100%',
          fontFamily: "'Yekan Bakh', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: '1.8',
          textAlign: 'right',
          color: '#E4E4E7'
        }}>
          ایندور مپ (Indoor Map) با استفاده از فناوری‌های پیشرفته‌ای مانند سیستم‌های مکان‌یابی داخلی (IPS) کار می‌کند که به کاربران کمک می‌کند مسیرها و موقعیت‌های دقیق در فضاهای داخلی را پیدا کنند. برخلاف نقشه‌های خارجی که از GPS برای شناسایی موقعیت استفاده می‌کنند، ایندور مپ‌ها به دلیل محدودیت‌های سیگنال GPS در فضاهای بسته، از سیگنال‌های وای‌فای، بلوتوث و بیکن‌ها برای شناسایی موقعیت کاربران بهره می‌برند.
          این فناوری‌ها به دستگاه کاربر اجازه می‌دهند تا به نقاط اتصال (نظیر روترهای وای‌فای یا بیکن‌ها) وصل شده و موقعیت نسبی خود را در فضای داخلی تعیین کند. این روش‌ها به کاربر کمک می‌کنند تا به‌دقت مسیرهایی مثل راهروها، طبقات مختلف و حتی جزئیاتی مثل مکان فروشگاه‌ها یا اتاق‌های خاص را پیدا کند.
        </div>
        
      </div>

      {/* Media Query برای موبایل */}
      <style jsx>{`
        @media (max-width: 1024px) {
          div {
            flex-direction: column;
            gap: 40px;
            padding: 0 16px;
            margin: 60px auto 0 auto;
          }
          div > div:first-of-type {
            width: 80%;
            max-width: 400px;
          }
          div > div:last-of-type {
            width: 100%;
            max-width: 100%;
            align-items: center;
          }
          h2 {
            text-align: center;
          }
          div > div:last-of-type > div {
            text-align: justify;
            text-align-last: right;
          }
        }
        
        @media (max-width: 768px) {
          div {
            gap: 32px;
            margin: 40px auto 0 auto;
          }
          div > div:first-of-type {
            width: 90%;
            max-width: 350px;
          }
          h2 {
            font-size: 28px;
          }
        }
        
        @media (max-width: 480px) {
          div {
            gap: 24px;
            padding: 0 12px;
          }
          div > div:first-of-type {
            width: 100%;
            max-width: 320px;
          }
          h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}