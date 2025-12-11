"use client";

import "./AboutHero.css";

export default function AboutHero() {
  return (
    <section className="about-hero-section relative w-full flex justify-center items-center min-h-[400px] px-5 sm:px-6 lg:px-8 overflow-hidden py-4 lg:py-8">
      {/* Main Content Box */}
      <div
        className="about-hero-container relative flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 lg:p-20 gap-4 sm:gap-6 z-10 transform-gpu"
        style={{
          width: "min(1480px, 90vw)",
          height: "auto",
          minHeight: "504px",
          border: "1px solid rgba(63, 63, 70, 0.6)",
          borderRadius: "24px",
          boxSizing: "border-box",
          background: "#FAFAFA1A",
          backdropFilter: "blur(10px)",
          marginTop: "90px",
        }}
      >
        <h1
          className="about-hero-title font-ravi font-medium text-white text-center"
          style={{
            width: "min(900px, 100%)",
            fontSize: "clamp(32px, 4vw, 60px)",
            lineHeight: "clamp(48px, 5vw, 92px)",
            paddingBottom: "clamp(20px, 3vw, 50px)",
          }}
        >
          ایندور مپ چیست و چرا اهمیت دارد؟
        </h1>

        <p
          className="about-hero-description font-ravi font-normal text-gray-300 text-center"
          style={{
            width: "min(800px, 100%)",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: "clamp(24px, 2.5vw, 32px)",
          }}
        >
          ایندور مپ یا نقشه‌ی داخلی، یک تکنولوژی جدید و پیشرفته است که امکان
          مسیریابی و هدایت کاربران در فضاهای داخلی را فراهم می‌کند. برخلاف
          نقشه‌های معمول (مانند گوگل مپ یا نقشه‌های GPS)، که برای محیط‌های
          بیرونی طراحی شده‌اند و از ماهواره‌ها و GPS برای موقعیت‌یابی استفاده
          می‌کنند، ایندور مپ به طور خاص برای مسیریابی در مکان‌های بسته مانند
          بیمارستان‌ها، مراکز خرید، فرودگاه‌ها، دانشگاه‌ها و نمایشگاه‌ها ساخته
          شده است.
        </p>
      </div>
    </section>
  );
}
