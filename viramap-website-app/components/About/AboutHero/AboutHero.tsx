'use client';

export default function AboutHero() {
  return (
    <section className="relative w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      
      {/* Background Container */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        
        {/* مجموعه Ellipse ها */}
        <div className="absolute inset-0">
          
          {/* Ellipse 50 - نارنجی کوچک */}
          <div
            className="absolute rounded-full transform-gpu"
            style={{
              width: '484px',
              height: '484px',
              left: 'calc(50% - 242px - 495px)',
              top: '64px',
              background: 'rgba(251, 101, 20, 0.12)',
              filter: 'blur(50px)',
              opacity: '0.9'
            }}
          />
          
          {/* Ellipse 52 جدید - سبز بزرگ */}
          <div
            className="absolute rounded-full transform-gpu"
            style={{
              width: '663px',
              height: '663px',
              left: 'calc(50% - 331.5px - 501.5px)',
              top: '-180px',
              background: 'rgba(6, 120, 113, 0.28)',
              filter: 'blur(220px)',
              opacity: '0.9'
            }}
          />
          
          {/* Ellipse 51 - سبز سمت راست */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: '502px',
              height: '502px',
              left: 'calc(50% - 251px + 406px)',
              top: '172px',
              background: 'rgba(6, 120, 113, 0.28)',
              filter: 'blur(200px)',
              opacity: '0.85'
            }}
          />
          
          {/* Ellipse 47 - نارنجی بزرگ */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: '794px',
              height: '794px',
              left: 'calc(50% - 397px + 572px)',
              top: '-481px',
              background: 'rgba(254, 139, 32, 0.25)',
              filter: 'blur(220px)',
              opacity: '0.9'
            }}
          />
          
          {/* Ellipse 52 قدیمی - سبز پایین */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: '511px',
              height: '511px',
              left: 'calc(50% - 255.5px - 599.5px)',
              top: '2912px',
              background: 'rgba(6, 120, 113, 0.18)',
              filter: 'blur(220px)',
              opacity: '0.8'
            }}
          />
          
          {/* Ellipse های اضافی */}
          <div
            className="absolute rounded-full transform-gpu"
            style={{
              width: '600px',
              height: '600px',
              right: '-20%',
              bottom: '-10%',
              background: 'rgba(143, 101, 255, 0.15)',
              filter: 'blur(180px)',
              opacity: '0.7'
            }}
          />
          
        </div>
        
      </div>

      {/* Main Content Box */}
      <div 
        className="relative flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 lg:p-20 gap-4 sm:gap-6 z-10 transform-gpu"
        style={{
          width: 'min(1480px, 90vw)',
          height: 'auto',
          minHeight: '504px',
          background: 'rgba(250, 250, 250, 0.12)',
          border: '1px solid rgba(63, 63, 70, 0.6)',
          borderRadius: '24px',
          boxSizing: 'border-box',
          backdropFilter: 'blur(10px)'
        }}
      >
        
        <h1 
          className="font-morabba font-medium text-white text-center"
          style={{
            width: 'min(900px, 100%)',
            fontSize: 'clamp(32px, 4vw, 60px)',
            lineHeight: 'clamp(48px, 5vw, 92px)',
            paddingBottom: 'clamp(20px, 3vw, 50px)'
          }}
        >
          ایندور مپ چیست و چرا اهمیت دارد؟
        </h1>

        <p 
          className="font-yekanbakh font-normal text-gray-300 text-center"
          style={{
            width: 'min(800px, 100%)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            lineHeight: 'clamp(24px, 2.5vw, 32px)'
          }}
        >
          ایندور مپ یا نقشه‌ی داخلی، یک تکنولوژی جدید و پیشرفته است که امکان مسیریابی و هدایت کاربران در فضاهای داخلی را فراهم می‌کند. برخلاف نقشه‌های معمول (مانند گوگل مپ یا نقشه‌های GPS)، که برای محیط‌های بیرونی طراحی شده‌اند و از ماهواره‌ها و GPS برای موقعیت‌یابی استفاده می‌کنند، ایندور مپ به طور خاص برای مسیریابی در مکان‌های بسته مانند بیمارستان‌ها، مراکز خرید، فرودگاه‌ها، دانشگاه‌ها و نمایشگاه‌ها ساخته شده است.
        </p>

      </div>
    </section>
  );
}