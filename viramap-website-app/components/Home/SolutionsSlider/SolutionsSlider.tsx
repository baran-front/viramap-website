"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { SolutionItem } from "./types";
import SolutionSlide from "./SolutionSlide";
import SliderControls from "./SliderControls";
import "./SolutionsSlider.css";

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds

const SolutionsSlider = () => {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // موقعیت‌های ثابت برای همه اسلایدها
  const staticFeaturePositions = useMemo(
    () => [
      { top: 360, left: 210 },
      { top: 430, left: 160 },
      { top: 500, left: 110 },
      { top: 570, left: 60 },
    ],
    []
  );

  // داده‌های نمونه با موقعیت‌های ثابت
  const sampleSolutions: SolutionItem[] = useMemo(
    () => [
      {
        id: 1,
        category: "بیمارستان‌ها",
        title: "راهکارهای تخصصی ویرامپ برای بیمارستان‌ها",
        description:
          "دسترسی سریع و بدون سردرگمی به بخش‌های مختلف بیمارستان می‌تواند تجربه بیماران و مراجعین را بهبود بخشد و وقت باارزش کادر درمان را نیز حفظ کند. ویرامپ با ارائه مسیرهای دقیق و اطلاعات به‌روز، کمک می‌کند همه به‌آسانی بخش‌های مورد نظر را پیدا کنند.",
        features: [
          "راهنمایی دقیق و دسترسی‌پذیری",
          "پشتیبانی از کاربران با نیازهای خاص",
          "نقشه‌برداری سه‌بعدی از تمام طبقات",
          "اتصال به سیستم‌های بیمارستانی",
        ],
        featurePositions: staticFeaturePositions,
        buttonText: "مطالعه بیشتر",
        imageUrl: "/images/solutions/hospital.png",
        order: 1,
      },
      {
        id: 2,
        category: "مراکز خرید",
        title: "راهکارهای تخصصی ویرامپ برای مراکز خرید",
        description:
          "تجربه خرید لذت‌بخش با مسیریابی هوشمند در مال‌ها و مراکز خرید بزرگ. پیدا کردن فروشگاه‌ها، رستوران‌ها و امکانات تفریحی را برای مشتریان آسان کنید.",
        features: [
          "مسیریابی هوشمند به فروشگاه‌ها",
          "اطلاعات واقع‌زمان واحدها",
          "پیشنهاد مسیرهای بهینه",
          "رزرو آنلاین خدمات",
        ],
        featurePositions: staticFeaturePositions,
        buttonText: "مطالعه بیشتر",
        imageUrl: "/images/solutions/mall.jpg",
        order: 2,
      },
      {
        id: 3,
        category: "فرودگاه‌ها",
        title: "راهکارهای تخصصی ویرامپ برای فرودگاه‌ها",
        description:
          "کاهش استرس مسافران با مسیریابی دقیق در ترمینال‌های بزرگ فرودگاهی. از گیت پرواز تا مراکز امنیتی و خدمات مسافری.",
        features: [
          "مسیریابی به گیت‌های پرواز",
          "اطلاعات پروازها واقع‌زمان",
          "راهنمای خدمات فرودگاهی",
          "پشتیبانی چندزبانه",
        ],
        featurePositions: staticFeaturePositions,
        buttonText: "مطالعه بیشتر",
        imageUrl: "/images/solutions/airport.jpg",
        order: 3,
      },
    ],
    [staticFeaturePositions]
  );

  // دریافت داده از API یا استفاده از داده‌های استاتیک
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call when available
        // const response = await fetch('/api/solutions');
        // const data = await response.json();
        // setSolutions(data);
        setSolutions(sampleSolutions);
      } catch (error) {
        console.error("Error fetching solutions:", error);
        // Fallback to sample data on error
        setSolutions(sampleSolutions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, [sampleSolutions]);

  // Auto-slide functionality
  useEffect(() => {
    if (solutions.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % solutions.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [solutions.length, isAutoPlaying]);

  const nextSlide = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setCurrentSlide((prev) => (prev + 1) % solutions.length);
      setIsAutoPlaying(false);
    },
    [solutions.length]
  );

  const prevSlide = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setCurrentSlide(
        (prev) => (prev - 1 + solutions.length) % solutions.length
      );
      setIsAutoPlaying(false);
    },
    [solutions.length]
  );

  const goToSlide = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (index >= 0 && index < solutions.length) {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
      }
    },
    [solutions.length]
  );

  const toggleAutoPlay = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsAutoPlaying((prev) => !prev);
  }, []);

  if (isLoading) {
    return <div className="solutions-loading">در حال بارگذاری...</div>;
  }

  if (solutions.length === 0) {
    return <div className="solutions-empty">راهکاری برای نمایش وجود ندارد</div>;
  }

  return (
    <section className="solutions-slider-section">
      <div className="solutions-container">
        {/* Slides Container */}
        <div className="slides-main-wrapper">
          {solutions.map((solution, index) => (
            <SolutionSlide
              key={solution.id}
              solution={solution}
              isActive={index === currentSlide}
              index={index}
            />
          ))}
        </div>

        {/* Controls */}
        <SliderControls
          items={solutions}
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

export default SolutionsSlider;
