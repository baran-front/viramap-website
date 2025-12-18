// components/ContactUs/FreeConsultationSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FreeConsultationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callTime: "7-13" | "13-19" | "19-22" | "";
}

interface FreeConsultationSectionProps {
  title?: string;
  description?: string;
  autoScroll?: boolean;
}

const FreeConsultationSection = ({
  title = "مشاوره رایگان",
  description = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  autoScroll = false,
}: FreeConsultationSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasScrolledRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<FreeConsultationFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      callTime: "7-13",
    },
  });

  const selectedCallTime = watch("callTime");

  // اسکرول اتوماتیک وقتی autoScroll فعال باشد
  useEffect(() => {
    if (autoScroll && sectionRef.current && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      
      const timer = setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoScroll]);

  const onSubmit = (data: FreeConsultationFormValues) => {
    console.log("Free consultation form submitted", data);
    // در آینده می‌توانید به API متصل کنید
  };

  return (
    <section
      ref={sectionRef}
      id="free-consultation-section"
      className="w-full flex justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-10 bg-transparent scroll-mt-20"
    >
      <div className="relative w-full max-w-[1480px] rounded-2xl md:rounded-[24px] lg:rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-[10px] shadow-[0_24px_80px_rgba(15,23,42,0.85)] overflow-hidden min-h-[72px]">
        {/* محتوای اصلی */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-6 px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
          {/* متن + فرم */}
          <div className="flex-1 flex flex-col justify-center gap-8" dir="rtl">
            {/* تیتر و توضیح */}
            <div className="space-y-4 text-right max-w-xl">
              <h2 className="font-ravi font-bold text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] leading-[1.4] text-white">
                {title}
              </h2>
              <p className="font-ravi text-[14px] sm:text-[15px] md:text-[16px] leading-[2] text-[#E4E4E7]">
                {description}
              </p>
            </div>

            {/* فرم */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 max-w-xl"
              dir="rtl"
            >
              {/* ردیف اول: نام / نام خانوادگی */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <Input
                    {...register("firstName", { required: true })}
                    placeholder="نام"
                    className="h-12 sm:h-[52px] rounded-2xl bg-[#020617]/60 border border-[#1F2937] text-right text-sm sm:text-[15px] text-white placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#FB6514]/60 focus-visible:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    {...register("lastName", { required: true })}
                    placeholder="نام خانوادگی"
                    className="h-12 sm:h-[52px] rounded-2xl bg-[#020617]/60 border border-[#1F2937] text-right text-sm sm:text-[15px] text-white placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#FB6514]/60 focus-visible:border-transparent"
                  />
                </div>
              </div>

              {/* ردیف دوم: ایمیل / موبایل */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <Input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="آدرس Email"
                    className="h-12 sm:h-[52px] rounded-2xl bg-[#020617]/60 border border-[#1F2937] text-right text-sm sm:text-[15px] text-white placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#FB6514]/60 focus-visible:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    {...register("phone", { required: true })}
                    type="tel"
                    placeholder="09*********"
                    className="h-12 sm:h-[52px] rounded-2xl bg-[#020617]/60 border border-[#1F2937] text-right text-sm sm:text-[15px] text-white placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#FB6514]/60 focus-visible:border-transparent"
                  />
                </div>
              </div>

              {/* انتخاب زمان تماس */}
              <div className="space-y-3">
                <p className="font-ravi text-sm sm:text-[15px] text-right text-[#E4E4E7]">
                  چه ساعتی با شما تماس بگیریم؟
                </p>
                <div className="flex flex-wrap gap-4" dir="rtl">
                  {[
                    { id: "7-13", label: "۷ الی ۱۳" },
                    { id: "13-19", label: "۱۳ الی ۱۹" },
                    { id: "19-22", label: "۱۹ الی ۲۲" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`relative flex items-center gap-2 cursor-pointer text-sm sm:text-[15px] font-ravi transition-colors ${
                        selectedCallTime === option.id
                          ? "text-white"
                          : "text-[#9CA3AF]"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.id}
                        {...register("callTime")}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border transition-colors ${
                          selectedCallTime === option.id
                            ? "border-[#FB6514] bg-[#FB6514]/20"
                            : "border-[#4B5563] bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-[10px] w-[10px] rounded-full transition-opacity ${
                            selectedCallTime === option.id
                              ? "bg-[#FB6514] opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </span>
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* دکمه ارسال */}
              <div className="flex justify-start mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-[#FB6514] hover:bg-[#e55a12] text-white font-ravi font-semibold text-sm sm:text-[15px] px-8 sm:px-10 py-3 shadow-[0_18px_40px_rgba(251,101,20,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  ثبت درخواست
                </Button>
              </div>
            </form>
          </div>

          {/* ستون تصویر / آیکون در سمت چپ برای دسکتاپ */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#0EA5E9]/20 via-[#6366F1]/10 to-[#F97316]/10 blur-3xl" />
              <div className="relative z-10 h-[220px] w-[220px] rounded-[40px] bg-gradient-to-br from-[#FACC15] via-[#F97316] to-[#2563EB] flex items-center justify-center shadow-[0_25px_60px_rgba(15,23,42,0.8)]">
                <div className="h-[80px] w-[80px] rounded-full bg-white flex items-center justify-center shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
                  <span className="text-2xl" aria-hidden="true">
                    📞
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultationSection;