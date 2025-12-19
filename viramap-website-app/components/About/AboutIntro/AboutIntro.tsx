"use client";

import "./AboutIntro.css";
import { GlassSection } from "@/components/ui/glass-section";

interface AboutIntroProps {
  title?: string;
  description?: string;
}

export default function AboutIntro({ title, description }: AboutIntroProps) {
  const titleText = title ?? "ویرا مپ؛\nاولین نقشه هوشمند داخلی در ایران";
  const descriptionText =
    description ??
    "ویرا مپ، یک راهکار نوین و بومی‌سازی‌شده برای مسیریابی داخلی است که دسترسی آسان و دقیق را در محیط‌های پیچیده‌ای مانند بیمارستان‌ها، مراکز خرید، استادیوم‌ها، و نمایشگاه‌ها فراهم می‌کند. این فناوری با استفاده از تکنولوژی‌های پیشرفته‌ای مانند بلوتوث، وای‌فای و بیکن‌ها، به کاربران امکان می‌دهد موقعیت خود را در فضاهای داخلی با دقت بالا شناسایی کنند و بدون نیاز به راهنمایی حضوری، به مقصد مورد نظر خود برسند. ویرا مپ با توجه به نیازهای متنوع کاربران ایرانی، تجربه‌ای سریع، امن و کارآمد در مسیریابی داخلی را ارائه می‌دهد.";

  return (
    <section className="about-intro-section relative w-full flex justify-center items-center min-h-[400px] px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12">
      <GlassSection
        title={titleText}
        description={descriptionText}
        descriptionAlign="justify"
      />
    </section>
  );
}

