'use client';

/**
 * HowItWorks Component - Explains how indoor mapping works
 * Displays an image on the LEFT and text content on the RIGHT
 */
export default function HowItWorks() {
  return (
    <div style={{
      // Main Container - تنظیم برای نمایش عکس در چپ و متن در راست
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px',
      gap: '80px', // فاصله بین عکس و متن
      width: '1280px',
      height: 'auto', // ارتفاع خودکار برای متن بلند
      margin: '80px auto 0 auto', // فاصله از بالا
      flex: 'none',
      order: 0,
      alignSelf: 'stretch',
      flexGrow: 0,
      position: 'relative'
    }}>
      
      {/* Left Side: Image Container */}
      <div style={{
        position: 'relative',
        width: '480px',
        height: '480px',
        flex: 'none',
        order: 0,
        flexGrow: 0
      }}>
        {/* Main Image */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'url(/images/About/about2.png)', // مسیر تصویر جدید
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '12px'
        }} />
      </div>
      
      {/* Right Side: Text Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end', // راست‌چین کردن محتوا
        padding: '0px',
        gap: '24px',
        width: '616px',
        height: 'auto',
        minHeight: '256px',
        flex: 'none',
        order: 1,
        flexGrow: 0
      }}>
        
        {/* Title Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end', // راست‌چین کردن عنوان
          padding: '0px',
          gap: '4px',
          width: '100%',
          height: 'auto',
          flex: 'none',
          order: 0,
          alignSelf: 'stretch',
          flexGrow: 0
        }}>
          {/* Title Text */}
          <h2 style={{
            width: '616px',
            height: '57px',
            fontFamily: "'Morabba', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '32px',
            lineHeight: '57px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            color: '#FAFAFA',
            margin: 0,
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}>
            ایندور مپ چگونه کار می‌کند؟
          </h2>
        </div>
        
        {/* Description Text */}
        <div style={{
          width: '616px',
          height: '256px',
          fontFamily: "'Yekan Bakh', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'right',
          color: '#E4E4E7',
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 0
        }}>
          ایندور مپ (Indoor Map) با استفاده از فناوری‌های پیشرفته‌ای مانند سیستم‌های مکان‌یابی داخلی (IPS) کار می‌کند که به کاربران کمک می‌کند مسیرها و موقعیت‌های دقیق در فضاهای داخلی را پیدا کنند. برخلاف نقشه‌های خارجی که از GPS برای شناسایی موقعیت استفاده می‌کنند، ایندور مپ‌ها به دلیل محدودیت‌های سیگنال GPS در فضاهای بسته، از سیگنال‌های وای‌فای، بلوتوث و بیکن‌ها برای شناسایی موقعیت کاربران بهره می‌برند.
          این فناوری‌ها به دستگاه کاربر اجازه می‌دهند تا به نقاط اتصال (نظیر روترهای وای‌فای یا بیکن‌ها) وصل شده و موقعیت نسبی خود را در فضای داخلی تعیین کند. این روش‌ها به کاربر کمک می‌کنند تا به‌دقت مسیرهایی مثل راهروها، طبقات مختلف و حتی جزئیاتی مثل مکان فروشگاه‌ها یا اتاق‌های خاص را پیدا کند.
        </div>
        
      </div>
    </div>
  );
}