'use client';

/**
 * InstallationProcess Component - Explains how to install indoor mapping
 * Displays text on the LEFT and image on the RIGHT with a button
 */
export default function InstallationProcess() {
  return (
    <div style={{
      // Main Container - تنظیم برای نمایش متن در چپ و عکس در راست
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px',
      gap: '80px',
      width: '1280px',
      height: 'auto',
      margin: '80px auto 0 auto',
      flex: 'none',
      order: 0,
      alignSelf: 'stretch',
      flexGrow: 0,
      position: 'relative'
    }}>
      
      {/* Left Side: Text Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start', // چپ‌چین کردن محتوا
        padding: '0px',
        gap: '24px',
        width: '616px',
        height: 'auto',
        flex: 'none',
        order: 0,
        flexGrow: 0
      }}>
        
        {/* Title Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start', // چپ‌چین کردن عنوان
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
            textAlign: 'right', // چپ‌چین
            color: '#FAFAFA',
            margin: 0,
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}>
            نصب و راه‌اندازی ایندور مپ‌ها چگونه است؟
          </h2>
        </div>
        
        {/* Description Text */}
        <div style={{
          width: '616px',
          height: '192px',
          fontFamily: "'Yekan Bakh', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'right', // چپ‌چین
          color: '#E4E4E7',
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 0
        }}>
          پیاده‌سازی ایندور مپ برای کسب‌وکارها بسیار ساده‌تر از آن است که ممکن است تصور شود. ویرامپ به عنوان یک ایندور مپ به راحتی با زیرساخت‌های موجود در ساختمان‌ها مانند وای‌فای و بلوتوث کار می‌کنند، و برای نصب آن نیاز به تجهیزات خاص یا بازسازی فیزیکی فضا نیست. برای شروع، تیم‌های فنی از طریق نصب بیکن‌ها یا استفاده از روترهای موجود می‌توانند نقاط مرجع در فضای داخلی را تعیین کنند. این نقاط به عنوان راهنمایی برای دستگاه‌های کاربران عمل می‌کنند، و به کاربران اجازه می‌دهند تا با کمک اپلیکیشن ویرامپ موقعیت خود را به‌طور دقیق در محیط پیدا کنند.
        </div>
        
        {/* Button */}
        <button style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          width: '95px',
          height: '24px',
          fontFamily: "'Yekan Bakh', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '26px',
          color: '#FB6514',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          flex: 'none',
          order: 2,
          flexGrow: 0,
          transition: 'all 0.3s ease'
        }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            درباره ویرامپ
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008" stroke="#FB6514" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Right Side: Image Container */}
      <div style={{
        position: 'relative',
        width: '480px',
        height: '480px',
        flex: 'none',
        order: 1,
        flexGrow: 0
      }}>
        {/* Main Image */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'url(/images/About/about3.png)', // مسیر تصویر جدید
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '12px'
        }} />
      </div>
    </div>
  );
}