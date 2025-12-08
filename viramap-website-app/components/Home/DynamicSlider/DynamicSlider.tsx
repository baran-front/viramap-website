// components/home/DynamicSlider/DynamicSlider.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Slide } from "./types";
import SlideItem from "./SlideItem";
import SliderControls from "./SliderControls";
import "./DynamicSlider.css";

// داده‌های نمونه - تعریف خارج از کامپوننت به عنوان const
const sampleSlides: Slide[] = [
  {
    id: 1,
    title: "مسیریابی هوشمند در فضای داخلی",
    description:
      "با تکنولوژی پیشرفته مسیریابی هوشمند ویرا مپ، کاربران می‌توانند با نقشه داخلی به راحتی در فضاهای بزرگ و پیچیده مانند مراکز خرید، فرودگاه‌ها و دانشگاه‌ها، مسیریابی کند. با استفاده از نقشه‌های دقیق و به‌روز، این اپلیکیشن شما را قدم‌به‌قدم هدایت می‌کند تا سریع‌تر و بدون سردرگمی به مقصد مورد نظر خود برسید.",
    imageUrl: "/images/slider/slide1.png",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "لیست پارکینگ ها و ذخیره موقعیت پارک خودرو ",
    description:
      "در فضاهای بزرگ و شلوغ مانند پارکینگ‌های طبقاتی و مجتمع‌های تجاری، ممکن است محل پارک خودرو به راحتی فراموش شود. ویرامپ امکان ذخیره پارکینگ اتومبیل را فراهم می‌کند، به طوری که با یک اسکن ساده بتوانید موقعیت خودرو را ثبت مسیر بازگشت به خودروی خود را بیابید و از نگرانی و جستجوهای زمان‌بر جلوگیری کنید.",
    imageUrl: "/images/slider/slide2.png",
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "تشخصیح خودکار مکان فعلی در بین طبقات و راهرو‌ها",
    description:
      "ویرامپ امکان رزرو بلیط برای رویدادها، سالن‌های نمایش، و امکانات خاص را به راحتی در اختیار شما می‌گذارد. این قابلیت باعث می‌شود تا کاربران در هر لحظه بدون نیاز به صف‌های طولانی، با خدمات آنلاین، دسترسی سریع‌تری به خدمات و رویدادهای داخلی داشته باشند و وقت خود را بهینه‌تر مدیریت کنند.",
    imageUrl: "/images/slider/slide3.png",
    order: 3,
    isActive: true,
  },
  {
    id: 4,
    title: "ارسال هشدار امنیتی و ایمنی در مواقع اضطراری به کاربران",
    description:
      "ویرامپ امکان رزرو بلیط برای رویدادها، سالن‌های نمایش، و امکانات خاص را به راحتی در اختیار شما می‌گذارد. این قابلیت باعث می‌شود تا کاربران در هر لحظه بدون نیاز به صف‌های طولانی، با خدمات آنلاین، دسترسی سریع‌تری به خدمات و رویدادهای داخلی داشته باشند و وقت خود را بهینه‌تر مدیریت کنند.",
    imageUrl: "/images/slider/slide4.png",
    order: 4,
    isActive: true,
  },
  {
    id: 5,
    title: "قابلبیت پشتیبانی از  چند  زبان",
    description:
      "ویرا مپ با پوشش گسترده از نقشه‌های داخلی در طیف وسیعی از مکان‌ها، مانند مراکز تجاری، بیمارستان‌ها، فرودگاه‌ها و مکان‌های پرتردد، به کاربران این اطمینان را می‌دهد که در هر زمان و هر مکانی به نقشه دقیق و به‌روز دسترسی خواهند داشت. این نقشه‌ها به صورت منظم به‌روزرسانی می‌شوند تا هرگونه تغییرات و جابجایی‌ها در فضاهای مختلف نیز لحاظ شوند.",
    imageUrl: "/images/slider/slide5.png",
    order: 5,
    isActive: true,
  },
  {
    id: 6,
    title: "قابلبیت پشتیبانی از  اندروید، IOS و وب",
    description:
      "ویرا مپ با پوشش گسترده از نقشه‌های داخلی در طیف وسیعی از مکان‌ها، مانند مراکز تجاری، بیمارستان‌ها، فرودگاه‌ها و مکان‌های پرتردد، به کاربران این اطمینان را می‌دهد که در هر زمان و هر مکانی به نقشه دقیق و به‌روز دسترسی خواهند داشت. این نقشه‌ها به صورت منظم به‌روزرسانی می‌شوند تا هرگونه تغییرات و جابجایی‌ها در فضاهای مختلف نیز لحاظ شوند.",
    imageUrl: "/images/slider/slide5.png",
    order: 6,
    isActive: true,
  },
];

const DynamicSlider = () => {
  const [slides] = useState<Slide[]>(sampleSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide with proper cleanup
  useEffect(() => {
    if (slides.length <= 1 || !isAutoPlaying) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Cleanup function to clear interval on unmount or dependency change
    return () => {
      clearInterval(intervalId);
    };
  }, [slides.length, isAutoPlaying]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  if (isLoading) {
    return <div className="slider-loading">در حال بارگذاری...</div>;
  }

  if (slides.length === 0) {
    return <div className="slider-empty">اسلایدی برای نمایش وجود ندارد</div>;
  }

  return (
    <section className="dynamic-slider">
      {/* Ellipse Background */}
      <div className="slider-ellipse"></div>
      <div className="ellipse-right"></div>

      {/* Main Container */}
      <div className="slider-main-container">
        {/* Slides Wrapper */}
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === currentSlide}
              index={index}
            />
          ))}
        </div>

        {/* Controls */}
        <SliderControls
          slides={slides}
          currentSlide={currentSlide}
          isAutoPlaying={isAutoPlaying}
          onNext={nextSlide}
          onPrev={prevSlide}
          onGoToSlide={goToSlide}
          onToggleAutoPlay={toggleAutoPlay}
        />
      </div>
    </section>
  );
};

export default DynamicSlider;
