"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// تایپ‌های فرم
interface ContactFormValues {
  fullname: string;
  email: string;
  message: string;
}

// آدرس شرکت
const COMPANY_ADDRESS = "تهران، خیابان ولیعصر، تقاطع طالقانی";
const COMPANY_LAT = 35.6892;
const COMPANY_LNG = 51.3890;

// Google Maps URL
const getGoogleMapsUrl = () => {
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8632027321075!2d${COMPANY_LNG}!3d${COMPANY_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2s${encodeURIComponent(COMPANY_ADDRESS)}!5e0!3m2!1sen!2s!4v1695553456789!5m2!1sen!2s`;
};

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      console.log("داده‌های فرم تماس:", data);
      toast.success("پیام شما با موفقیت ارسال شد");
      setIsOpen(true);
      reset();
    } catch (err) {
      toast.error("خطا در ارسال پیام");
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen py-32 relative overflow-hidden">
        {/* افکت Ellipse 47 */}
        <div 
          className="absolute w-[623px] h-[623px] left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: "calc(50% - 311.5px - 725.5px)", // محاسبه position مشابه CSS
            top: "328px",
            background: "#52525B1A",
            filter: "blur(250px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        
        <div className="relative z-10 w-[1480px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12  backdrop-blur-sm border border-gray-800 rounded-3xl p-8 shadow-2xl">
            {/* بخش فرم در سمت چپ */}
            <div className="flex-1 mt-16">
              <div className="w-full">
                {/* هدر فرم */}
                <div className="text-right mb-8">
                  <h2 className="font-morabba text-3xl font-medium text-white mb-4">
                    در انتظار شنیدن نظرات ارزشمند شما هستیم!
                  </h2>
                  <p className="font-yekan-bakh text-gray-300 leading-7">
                    سوالات، پیشنهادات یا انتقادات خود را با ما در میان بگذارید. تیم ما آماده پاسخگویی به نیازهای شماست.
                  </p>
                </div>

                {/* فرم */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* فیلد نام */}
                    <div>
                      <div className="relative">
                        <Input
                          {...register("fullname", {
                            required: "نام و نام خانوادگی الزامی است",
                            minLength: {
                              value: 3,
                              message: "نام باید حداقل ۳ کاراکتر باشد"
                            }
                          })}
                          className="w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 text-right rounded-xl py-3 px-4 focus:border-orange-500 focus:ring-orange-500/20"
                          placeholder="نام و نام خانوادگی"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      {errors.fullname && (
                        <p className="text-red-500 text-sm mt-2 text-right">
                          {errors.fullname.message}
                        </p>
                      )}
                    </div>

                    {/* فیلد ایمیل */}
                    <div>
                      <div className="relative">
                        <Input
                          {...register("email", {
                            required: "ایمیل الزامی است",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "ایمیل معتبر نیست"
                            }
                          })}
                          type="email"
                          className="w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 text-right rounded-xl py-3 px-4 focus:border-orange-500 focus:ring-orange-500/20"
                          placeholder="آدرس ایمیل"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 text-right">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* فیلد پیام */}
                  <div>
                    <div className="relative">
                      <Textarea
                        {...register("message", {
                          required: "پیام الزامی است",
                          minLength: {
                            value: 10,
                            message: "پیام باید حداقل ۱۰ کاراکتر باشد"
                          }
                        })}
                        className="w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 text-right rounded-xl py-3 px-4 focus:border-orange-500 focus:ring-orange-500/20 min-h-[150px] resize-none"
                        placeholder="پیام خود را بنویسید..."
                        rows={5}
                      />
                      <div className="absolute left-3 top-3 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-2 text-right">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* دکمه ارسال */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 text-white font-yekan-bakh font-semibold text-base px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          در حال ارسال...
                        </span>
                      ) : (
                        "ارسال پیام"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* بخش Google Maps در سمت راست */}
            <div className="flex-1">
              <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden">
                {/* Google Maps */}
                <iframe
                  src={getGoogleMapsUrl()}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    filter: "grayscale(30%) contrast(1.1) brightness(0.9)"
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title={`موقعیت ${COMPANY_ADDRESS} در Google Maps`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog موفقیت */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="font-yekan-bakh bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">پیام شما با موفقیت ارسال شد</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              پیام شما با موفقیت ارسال شد و ما در اسرع وقت با شما تماس خواهیم گرفت.
              <br />
              <span className="text-orange-400 font-semibold mt-2 block">
                آدرس ما: {COMPANY_ADDRESS}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700">
              بستن
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href="/" className="bg-orange-600 hover:bg-orange-700 text-white">
                بازگشت به خانه
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}