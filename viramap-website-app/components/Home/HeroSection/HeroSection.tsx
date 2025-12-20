"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formMessage } from "@/components/lib/form-message-hook";
import { submitDemoRequest, isSuccess } from "@/components/lib/apiFunctions";
import type { DemoRequestFormData } from "@/components/lib/apiFunctions";
import { logger } from "@/components/lib/logger";
import "./HeroSectionOverrides.css";

// نسخه تصویر - در صورت تغییر تصویر این عدد را افزایش دهید
const BACKGROUND_IMAGE_VERSION = "1.0";

const HeroSection = () => {
  const router = useRouter();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DemoRequestFormData>({
    defaultValues: {
      fullname: "",
      contact_channel: "",
    },
  });

  // پیش‌بارگذاری صفحه «تماس با ما» برای سریع‌تر شدن کلیک روی «مشاوره رایگان»
  useEffect(() => {
    router.prefetch("/about-us?free=1");
  }, [router]);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    reset();
  };

  const onSubmitDemo = async (data: DemoRequestFormData) => {
    try {
      const result = await submitDemoRequest(data);

      if (isSuccess(result) && result.data) {
        formMessage.success("درخواست دمو شما با موفقیت ارسال شد", {
          title: "ارسال موفق",
        });
        closeDemoModal();
      } else {
        const errorMessage =
          result.error?.message ||
          "خطا در ارسال درخواست. لطفا دوباره تلاش کنید.";
        formMessage.error(errorMessage, {
          title: "خطا در ارسال",
        });
        logger.error("خطا در ارسال درخواست دمو:", result);
      }
    } catch (err) {
      formMessage.error("خطا در ارسال درخواست", {
        title: "خطای غیرمنتظره",
      });
      logger.error("خطای غیرمنتظره در ارسال درخواست دمو:", err);
    }
  };

  const backgroundImageUrl = `/images/hero/background.svg?v=${BACKGROUND_IMAGE_VERSION}`;

  return (
    <section className="relative w-full min-h-screen bg-[#141414]/70 backdrop-blur-md text-white overflow-hidden flex flex-col items-center justify-center pt-12 pb-1 md:py-20 lg:py-0 hero-section-1280">
      {/* Blurred Glowing Circles - Responsive Positioning */}
      <div className="hidden md:block absolute w-[663px] h-[663px] -left-[500px] top-[180px] rounded-full bg-[#067871]/20 blur-[250px] z-[-1]" />
      <div className="hidden md:block absolute w-[800px] h-[800px] -left-[200px] -top-[200px] rounded-full bg-[#FE8B20]/10 blur-[200px] z-[-1]" />
      <div className="hidden lg:block absolute w-[500px] h-[500px] -right-[150px] -top-[100px] rounded-full bg-[#FB6514]/10 blur-[150px] z-[-1]" />
      <div className="hidden lg:block absolute w-[600px] h-[600px] -right-[200px] -bottom-[200px] rounded-full bg-[#FE8B20]/8 blur-[180px] z-[-1]" />

      {/* Left SVG Technical Drawing Background */}
      <div className="hidden md:block absolute left-0 top-0 w-1/2 h-full z-0 opacity-70">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1050 1716"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <g filter="url(#filter0_f_4001_16732)">
            <circle
              cx="218.5"
              cy="151.5"
              r="331.5"
              fill="#067871"
              fillOpacity="0.24"
            />
          </g>
          <g filter="url(#filter1_f_4001_16732)">
            <circle
              cx="89.5"
              cy="1326.5"
              r="189.5"
              fill="#FE8B20"
              fillOpacity="0.05"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_4001_16732"
              x="-613"
              y="-680"
              width="1663"
              height="1663"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="250"
                result="effect1_foregroundBlur_4001_16732"
              />
            </filter>
            <filter
              id="filter1_f_4001_16732"
              x="-300"
              y="937"
              width="779"
              height="779"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_4001_16732"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Right-Side Hero Background Image */}
      <div
        className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-contain bg-no-repeat bg-right pointer-events-none z-10 hero-image-1280"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1200px] w-full text-center">
        {/* Subtitle - Above Main Title */}
        <h3 className="font-ravi font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-[#E4E4E7] mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-full">
          اپلیکیشن مسیریابی هوشمند ویرامپ
        </h3>

        {/* Main Headline */}
        <h1 className="font-ravi font-bold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.45] xl:leading-normal text-[#E4E4E7] max-w-[965px] mx-auto mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 px-2">
          مسیر‌ها و امکانات هر مکان را کشف کن!
        </h1>

        {/* Subtitle, Arrow, and Badge Container - Horizontal Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3 mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-2 sm:px-4 w-full max-w-[965px]">
          {/* Gradient Subtitle (Right side in RTL - First) */}
          <p className="font-ravi font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] lg:leading-loose bg-linear-to-r from-[#FE8B20] via-[#AECE3B] to-[#119389] bg-clip-text text-transparent flex-1 text-center sm:text-right order-1">
            از مسیریابی داخلی تا رزرو سریع خدمات و اطلاعات بروز، همه در یک
            اپلیکیشن
          </p>

          {/* Arrow SVG - Connecting subtitle to badge (Middle) */}
          <svg
            width="122"
            height="46"
            viewBox="0 0 122 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden sm:block w-[60px] sm:w-[80px] md:w-[100px] lg:w-[122px] h-auto shrink-0 order-2 mt-[30px]"
          >
            <path
              d="M120.433 1.90512C70.1609 -4.96894 95.7887 78.5992 3.46289 28.3135"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.49585 26.5059L12.0098 25.0588"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.49585 26.5059L5.81222 36.7958"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Badge - ساده و کاربردی (Left side in RTL - Last) */}
          <div className="flex items-center justify-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[rgba(42,153,255,0.1)] backdrop-blur-sm shadow-[0px_4px_15px_rgba(42,153,255,0.1)] rounded-3xl shrink-0 order-3 mt-[30px]">
            <span className="font-ravi font-semibold text-[13px] sm:text-[14px] md:text-[15px] lg:text-base leading-normal sm:leading-[1.6] md:leading-[1.75] text-[#E4E4E7] whitespace-nowrap">
              ساده و کاربردی
            </span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto px-4 sm:px-0">
          {/* Primary Button - درخواست دمو */}
          <button
            onClick={openDemoModal}
            className="flex flex-row justify-center items-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 gap-2 w-full sm:w-[135px] md:w-[145px] lg:w-[155px] h-12 sm:h-[48px] bg-[#FB6514] rounded-xl border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#e55a12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FB6514]/30 active:scale-[0.98] active:translate-y-0"
          >
            <span className="font-ravi font-semibold text-[14px] sm:text-[15px] md:text-base text-white whitespace-nowrap">
              درخواست دمو
            </span>
          </button>

          {/* Secondary Button - مشاوره رایگان */}
          <button
            onClick={() => {
              router.push("/about-us?free=1#free-consultation");
              // بعد از نویگیت، به المنت با id="free-consultation" اسکرول می‌کنیم
              // استفاده از چند لایه تاخیر برای اطمینان از رندر شدن کامل صفحه
              const scrollToTarget = () => {
                const element = document.getElementById("free-consultation");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  return true;
                }
                return false;
              };

              // تلاش اولیه بعد از تاخیر کوتاه
              setTimeout(() => {
                if (!scrollToTarget()) {
                  // اگر المنت هنوز رندر نشده، چند بار دیگر تلاش می‌کنیم
                  let attempts = 0;
                  const maxAttempts = 30;
                  const interval = setInterval(() => {
                    attempts++;
                    if (scrollToTarget() || attempts >= maxAttempts) {
                      clearInterval(interval);
                    }
                  }, 100);
                }
              }, 600);
            }}
            className="flex flex-row justify-center items-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 w-full sm:w-[167px] md:w-[177px] lg:w-[187px] h-12 sm:h-[48px] bg-transparent rounded-lg text-[#FB6514] font-ravi font-semibold text-[14px] sm:text-[15px] md:text-base gap-2 transition-all duration-300 ease-in-out hover:bg-[#FB6514]/10 hover:border-[#FB6514]/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#FB6514]/20 active:scale-[0.98] active:translate-y-0"
          >
            <span className="whitespace-nowrap">مشاوره رایگان</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180 w-5 h-5 sm:w-6 sm:h-6 shrink-0"
            >
              <path
                d="M9 5L16 12L9 19"
                stroke="#FB6514"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Demo Request Modal */}
      {isDemoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={closeDemoModal}
        >
          <div
            dir="rtl"
            className="relative w-full max-w-[520px] rounded-[32px] bg-[#05040A]/95 border border-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.75)] px-6 sm:px-8 py-7 sm:py-8 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Description */}
            <div className="mb-6 sm:mb-7">
              <h2 className="font-ravi font-semibold text-[18px] sm:text-[20px] md:text-[22px] text-[#F4F4F5] mb-2">
                درخواست دمو
              </h2>
              <p className="font-ravi text-[13px] sm:text-[14px] text-[#A1A1AA] leading-relaxed">
                لطفا اطلاعات خود را وارد کنید تا با شما تماس بگیریم.
              </p>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit(onSubmitDemo)}
              className="space-y-4 sm:space-y-5"
            >
              <div className="space-y-2">
                <label className="block font-ravi text-[13px] sm:text-[14px] text-[#E4E4E7]">
                  نام و نام خانوادگی
                </label>
                <input
                  {...register("fullname", {
                    required: "نام و نام خانوادگی الزامی است",
                    minLength: {
                      value: 2,
                      message: "نام باید حداقل ۲ کاراکتر باشد",
                    },
                  })}
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="w-full h-12 sm:h-13 rounded-2xl bg-[#05040A] border border-[#27272A] px-4 sm:px-5 text-[13px] sm:text-[14px] text-[#E4E4E7] placeholder:text-[#71717A] focus:outline-none focus:border-[#2A99FF] focus:ring-2 focus:ring-[#2A99FF]/30 transition-all"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1 text-right">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-ravi text-[13px] sm:text-[14px] text-[#E4E4E7]">
                  شماره موبایل
                </label>
                <input
                  {...register("contact_channel", {
                    required: "شماره موبایل الزامی است",
                    pattern: {
                      value: /^09\d{9}$/,
                      message:
                        "لطفا یک شماره موبایل معتبر وارد کنید (شکل: 09123456789)",
                    },
                    minLength: {
                      value: 11,
                      message: "شماره موبایل باید ۱۱ رقم باشد",
                    },
                    maxLength: {
                      value: 11,
                      message: "شماره موبایل باید ۱۱ رقم باشد",
                    },
                  })}
                  type="tel"
                  placeholder="09*********"
                  className="w-full h-12 sm:h-13 rounded-2xl bg-[#05040A] border border-[#27272A] px-4 sm:px-5 text-[13px] sm:text-[14px] text-[#E4E4E7] placeholder:text-[#71717A] focus:outline-none focus:border-[#2A99FF] focus:ring-2 focus:ring-[#2A99FF]/30 transition-all"
                />
                {errors.contact_channel && (
                  <p className="text-red-500 text-xs mt-1 text-right">
                    {errors.contact_channel.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 sm:mt-7 flex flex-row-reverse items-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-11 sm:h-12 rounded-2xl bg-[#FB6514] text-white font-ravi text-[13px] sm:text-[14px] font-semibold shadow-[0_10px_30px_rgba(42,153,255,0.35)] hover:bg-[#e55a12] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
                </button>
                <button
                  type="button"
                  onClick={closeDemoModal}
                  className="flex-1 h-11 sm:h-12 rounded-2xl bg-[#FB6514] text-[#E4E4E7] font-ravi text-[13px] sm:text-[14px] font-medium border border-[#27272A] hover:bg-[#27272A] transition-all"
                >
                  بستن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
