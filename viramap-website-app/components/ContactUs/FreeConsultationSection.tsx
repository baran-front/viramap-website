// components/ContactUs/FreeConsultationSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formMessage } from "@/components/lib/form-message-hook";
import { submitFreeConsultation, isSuccess } from "@/components/lib/apiFunctions";
import type { FreeConsultationFormData } from "@/components/lib/apiFunctions";
import { logger } from "@/components/lib/logger";

interface FreeConsultationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callTime: "7-to-13" | "13-to-19" | "19-to-22" | "";
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
    formState: { isSubmitting, errors },
    watch,
    reset,
  } = useForm<FreeConsultationFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      callTime: "7-to-13",
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

  const onSubmit = async (data: FreeConsultationFormValues) => {
    try {
      // تبدیل فرمت callTime از "7-13" به "7-to-13" اگر لازم باشد
      const callTime = data.callTime || "7-to-13";
      
      const formData: FreeConsultationFormData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        contact_channel_1: data.phone.trim(), // mobile
        contact_channel_2: data.email.trim(), // email
        calling_time: callTime as "7-to-13" | "13-to-19" | "19-to-22",
      };

      const result = await submitFreeConsultation(formData);

      if (isSuccess(result) && result.data) {
        formMessage.success("درخواست مشاوره رایگان شما با موفقیت ارسال شد", {
          title: "ارسال موفق",
        });
        reset();
      } else {
        const errorMessage =
          result.error?.message ||
          "خطا در ارسال درخواست. لطفا دوباره تلاش کنید.";
        formMessage.error(errorMessage, {
          title: "خطا در ارسال",
        });
        logger.error("خطا در ارسال درخواست مشاوره رایگان:", result);
      }
    } catch (err) {
      formMessage.error("خطا در ارسال درخواست", {
        title: "خطای غیرمنتظره",
      });
      logger.error("خطای غیرمنتظره در ارسال درخواست مشاوره رایگان:", err);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="free-consultation"
      className="w-full flex justify-center items-center pt-32 pb-0 px-4 sm:px-6 lg:px-10 bg-transparent scroll-mt-20"
    >
      <div
        className="relative w-full max-w-[1480px] rounded-2xl md:rounded-[24px] lg:rounded-[28px] overflow-hidden min-h-[72px] shadow-2xl"
        style={{
          background: "rgba(82, 82, 91, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        {/* محتوای اصلی */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-6 px-6 sm:px-10 lg:px-14 pt-6 lg:pt-8 pb-2">
          {/* متن + فرم */}
          <div className="flex-1 flex flex-col justify-center gap-8" dir="rtl">
            {/* تیتر و توضیح */}
            <div className="space-y-4 text-right max-w-xl">
              <h2 className="font-ravi font-bold text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] leading-[1.4] text-white">
                {title}
              </h2>
              <p className="font-ravi text-[14px] sm:text-[15px] md:text-[16px] leading-loose text-[#E4E4E7]">
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
                    {...register("firstName", {
                      required: "نام الزامی است",
                      minLength: {
                        value: 2,
                        message: "نام باید حداقل ۲ کاراکتر باشد",
                      },
                    })}
                    placeholder="نام"
                    className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 text-right">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    {...register("lastName", {
                      required: "نام خانوادگی الزامی است",
                      minLength: {
                        value: 2,
                        message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد",
                      },
                    })}
                    placeholder="نام خانوادگی"
                    className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 text-right">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ردیف دوم: ایمیل / موبایل */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <Input
                    {...register("email", {
                      required: "ایمیل الزامی است",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "ایمیل معتبر نیست",
                      },
                    })}
                    type="email"
                    placeholder="آدرس Email"
                    className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 text-right">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    {...register("phone", {
                      required: "شماره موبایل الزامی است",
                      pattern: {
                        value: /^(\+98|0)?9\d{9}$/,
                        message: "لطفا یک شماره موبایل معتبر وارد کنید",
                      },
                    })}
                    type="tel"
                    placeholder="09*********"
                    className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 text-right">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* انتخاب زمان تماس */}
              <div className="space-y-3">
                <div
                  className="flex items-start justify-between gap-4"
                  dir="rtl"
                >
                  <p className="font-ravi text-sm sm:text-[15px] text-right text-[#E4E4E7]">
                    چه ساعتی با شما تماس بگیریم؟
                  </p>
                  {/* دکمه ارسال */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-2xl bg-[#FB6514] hover:bg-[#e55a12] text-white font-ravi font-semibold text-sm sm:text-[15px] px-8 sm:px-10 py-3 shadow-[0_18px_40px_rgba(251,101,20,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "در حال ارسال..." : "ثبت درخواست"}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4" dir="rtl">
                  {[
                    { id: "7-to-13", label: "۷ الی ۱۳" },
                    { id: "13-to-19", label: "۱۳ الی ۱۹" },
                    { id: "19-to-22", label: "۱۹ الی ۲۲" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`relative flex items-center gap-2 cursor-pointer text-sm sm:text-[15px] font-ravi transition-colors pb-16 ${
                        selectedCallTime === option.id
                          ? "text-white"
                          : "text-[#9CA3AF]"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.id}
                        {...register("callTime", {
                          required: "لطفا زمان تماس را انتخاب کنید",
                        })}
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
                {errors.callTime && (
                  <p className="text-red-500 text-xs mt-1 text-right">
                    {errors.callTime.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* ستون تصویر / آیکون در سمت چپ برای دسکتاپ */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
              <img
                src="/images/free/free-call.png"
                alt="مشاوره رایگان"
                width={360}
                height={360}
                className="object-contain w-full h-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultationSection;
