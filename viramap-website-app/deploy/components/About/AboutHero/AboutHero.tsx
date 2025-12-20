"use client";

import "./AboutHero.css";
import { GlassSection } from "@/components/ui/glass-section";

interface AboutHeroProps {
  title?: string;
  description?: string;
}

export default function AboutHero({ title, description }: AboutHeroProps) {
  const titleText = title ?? "ایندور مپ چیست و چرا اهمیت دارد؟";
  const descriptionText =
    description ??
    "ایندور مپ یا نقشه‌ی داخلی، یک تکنولوژی جدید و پیشرفته است که امکان مسیریابی و هدایت کاربران در فضاهای داخلی را فراهم می‌کند. برخلاف نقشه‌های معمول (مانند گوگل مپ یا نقشه‌های GPS)، که برای محیط‌های بیرونی طراحی شده‌اند و از ماهواره‌ها و GPS برای موقعیت‌یابی استفاده می‌کنند، ایندور مپ به طور خاص برای مسیریابی در مکان‌های بسته مانند بیمارستان‌ها، مراکز خرید، فرودگاه‌ها، دانشگاه‌ها و نمایشگاه‌ها ساخته شده است.";

  return (
    <section className="about-hero-section relative w-full flex justify-center items-center min-h-[400px] px-5 sm:px-6 lg:px-8 overflow-hidden py-4 lg:py-8">
      <GlassSection
        title={titleText}
        description={descriptionText}
        descriptionAlign="center"
        className="about-hero-container mt-[90px]"
      />
    </section>
  );
}

