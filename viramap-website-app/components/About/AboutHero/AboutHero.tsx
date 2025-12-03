'use client';

export default function AboutHero() {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full blur-[250px] opacity-40"
          style={{
            width: 'min(794px, 90vw)',
            height: 'min(794px, 90vw)',
            right: '-30%',
            top: '-30%',
            background: 'rgba(254, 139, 32, 0.03)',
          }}
        />
        <div
          className="absolute rounded-full blur-[250px] opacity-40"
          style={{
            width: 'min(663px, 80vw)',
            height: 'min(663px, 80vw)',
            left: '-25%',
            top: '-15%',
            background: 'rgba(6, 120, 112, 0.11)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-4xl mx-auto my-16 p-6 sm:p-8 md:p-12 lg:p-16 gap-6 z-10 bg-white/10 border border-gray-700 rounded-3xl">
        {/* Title */}
        <h1 className="font-morabba font-bold text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-snug md:leading-[70px] lg:leading-[92px] text-white text-center">
          ایندور مپ چیست و چرا اهمیت دارد؟
        </h1>

        {/* Description */}
        <p className="mt-6 font-yekanbakh text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-gray-300 text-center">
          ایندور مپ یا نقشه‌ی داخلی، یک تکنولوژی جدید و پیشرفته است که امکان مسیریابی و هدایت کاربران در فضاهای داخلی را فراهم می‌کند. برخلاف نقشه‌های معمول (مانند گوگل مپ یا نقشه‌های GPS)، که برای محیط‌های بیرونی طراحی شده‌اند و از ماهواره‌ها و GPS برای موقعیت‌یابی استفاده می‌کنند، ایندور مپ به طور خاص برای مسیریابی در مکان‌های بسته مانند بیمارستان‌ها، مراکز خرید، فرودگاه‌ها، دانشگاه‌ها و نمایشگاه‌ها ساخته شده است.
        </p>
      </div>
    </div>
  );
}