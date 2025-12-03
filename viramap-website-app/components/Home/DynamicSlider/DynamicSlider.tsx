// components/home/DynamicSlider/DynamicSlider.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Slide } from './types';
import SlideItem from './SlideItem';
import SliderControls from './SliderControls';
import './DynamicSlider.css';

const DynamicSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // داده‌های نمونه
  const sampleSlides: Slide[] = [
    {
      id: 1,
      title: "مسیریابی هوشمند در فضای داخلی",
      description: "با تکنولوژی پیشرفته مسیریابی هوشمند ویرا مپ، کاربران می‌توانند با نقشه داخلی به راحتی در فضاهای بزرگ و پیچیده مانند مراکز خرید، فرودگاه‌ها و دانشگاه‌ها، مسیریابی کند. با استفاده از نقشه‌های دقیق و به‌روز، این اپلیکیشن شما را قدم‌به‌قدم هدایت می‌کند تا سریع‌تر و بدون سردرگمی به مقصد مورد نظر خود برسید.",
      imageUrl: "/images/slider/slide1.png",
      order: 1,
      isActive: true,
    },
    {
      id: 2,
      title: "لیست پارکینگ ها و ذخیره موقعیت پارک خودرو ",
      description: "در فضاهای بزرگ و شلوغ مانند پارکینگ‌های طبقاتی و مجتمع‌های تجاری، ممکن است محل پارک خودرو به راحتی فراموش شود. ویرامپ امکان ذخیره پارکینگ اتومبیل را فراهم می‌کند، به طوری که با یک اسکن ساده بتوانید موقعیت خودرو را ثبت مسیر بازگشت به خودروی خود را بیابید و از نگرانی و جستجوهای زمان‌بر جلوگیری کنید.",
      imageUrl: "/images/slider/slide2.png",
      order: 2,
      isActive: true,
    },
    {
      id: 3,
      title: "تشخصیح خودکار مکان فعلی در بین طبقات و راهرو‌ها",
      description: "ویرامپ امکان رزرو بلیط برای رویدادها، سالن‌های نمایش، و امکانات خاص را به راحتی در اختیار شما می‌گذارد. این قابلیت باعث می‌شود تا کاربران در هر لحظه بدون نیاز به صف‌های طولانی، با خدمات آنلاین، دسترسی سریع‌تری به خدمات و رویدادهای داخلی داشته باشند و وقت خود را بهینه‌تر مدیریت کنند.",
      imageUrl: "/images/slider/slide3.png",
      order: 3,
      isActive: true,
    }
  ];

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setSlides(sampleSlides);
      } catch (error) {
        console.error('Error fetching slides:', error);
        setSlides(sampleSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (slides.length <= 1 || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
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
    setIsAutoPlaying(prev => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className="slider-loading">
        در حال بارگذاری...
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="slider-empty">
        اسلایدی برای نمایش وجود ندارد
      </div>
    );
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