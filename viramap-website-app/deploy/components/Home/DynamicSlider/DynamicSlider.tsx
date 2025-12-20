// components/home/DynamicSlider/DynamicSlider.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Slide } from "./types";
import SlideItem from "./SlideItem";
import SliderControls from "./SliderControls";
import { DEFAULT_SLIDES } from "@/components/lib/constants/fallbackData";
import "./DynamicSlider.css";

// تبدیل داده‌های پیش‌فرض به نوع Slide
const sampleSlides: Slide[] = DEFAULT_SLIDES as Slide[];

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
