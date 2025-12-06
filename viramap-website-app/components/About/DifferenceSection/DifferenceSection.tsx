'use client';

export default function DifferenceSection() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row-reverse', // تغییر جهت برای راست‌چین
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px',
      gap: '40px',
      width: '1280px',
      height: 'auto',
      margin: '80px auto 150px auto'
    }}>
      
      {/* Right Side: Image Container - 50% */}
      <div style={{
        position: 'relative',
        width: '50%',
        height: '476px'
      }}>
        
        {/* Ellipse Background */}
        <div style={{
          position: 'absolute',
          width: '519px',
          height: '519px',
          left: 'calc(50% - 259.5px)',
          top: '-52px',
          background: 'rgba(254, 139, 32, 0.3)',
          filter: 'blur(150px)',
          borderRadius: '50%'
        }} />
        
        {/* Image */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'url(/images/About/three-phones.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        
      </div>

      {/* Left Side: Text Content - 50% */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end', // راست‌چین کامل
        gap: '24px',
        width: '50%',
        height: 'auto'
      }}>
        
        <h2 style={{
          width: '100%',
          fontFamily: "'Morabba', sans-serif",
          fontWeight: 500,
          fontSize: '32px',
          lineHeight: '57px',
          textAlign: 'right',
          color: '#FAFAFA',
          margin: 0
        }}>
          تفاوت ویرا مپ با گوگل مپ و سایر مپ‌ها چیست؟
        </h2>
        
        <p style={{
          width: '100%',
          fontFamily: "'Yekan Bakh', sans-serif",
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '32px',
          textAlign: 'right',
          color: '#E4E4E7'
        }}>
          ویرا مپ، به‌عنوان اولین مسیریاب داخلی ایران، با ارائه نقشه‌های دقیق برای فضاهای بسته، مانند بیمارستان‌ها، فرودگاه‌ها، مراکز خرید و نمایشگاه‌ها، تجربه‌ای جدید از مسیریابی هوشمند داخلی را به ارمغان آورده است. با کمک تکنولوژی‌های پیشرفته و پشتیبانی از محیط‌های چندطبقه، ویرا مپ به کاربران این امکان را می‌دهد که به‌آسانی مسیر خود را در محیط‌های داخلی پیچیده پیدا کنند و به خدمات موردنیاز دسترسی داشته باشند.
        </p>
        
      </div>
    </div>
  );
}