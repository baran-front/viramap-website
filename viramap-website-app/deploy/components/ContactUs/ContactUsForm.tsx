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
const COMPANY_LNG = 51.389;

// Google Maps URL
const getGoogleMapsUrl = () => {
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8632027321075!2d${COMPANY_LNG}!3d${COMPANY_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2s${encodeURIComponent(
    COMPANY_ADDRESS
  )}!5e0!3m2!1sen!2s!4v1695553456789!5m2!1sen!2s`;
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
      <div className="w-full flex justify-center items-start lg:items-center min-h-screen pt-32 sm:pt-36 pb-16 lg:pb-24 px-5 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* افکت Ellipse 47 */}
        <div
          className="absolute w-[623px] h-[623px] left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{
            left: "calc(50% - 311.5px - 725.5px)", // محاسبه position مشابه CSS
            top: "328px",
            filter: "blur(250px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 w-full max-w-[1480px]">
          <div
            className="w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            style={{
              background: "rgba(82, 82, 91, 0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            {/* بخش فرم در سمت چپ */}
            <div className="flex-1 pt-4 lg:pt-12">
              <div className="w-full">
                {/* هدر فرم */}
                <div className="text-right mb-8">
                  <h2 className="font-ravi text-3xl font-medium text-white mb-4">
                    در انتظار شنیدن نظرات ارزشمند شما هستیم!
                  </h2>
                  <p className="font-ravi text-gray-300 leading-7">
                    سوالات، پیشنهادات یا انتقادات خود را با ما در میان بگذارید.
                    تیم ما آماده پاسخگویی به نیازهای شماست.
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
                              message: "نام باید حداقل ۳ کاراکتر باشد",
                            },
                          })}
                          className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                          placeholder="نام و نام خانوادگی"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.99967 10.0003C12.3009 10.0003 14.1663 8.13485 14.1663 5.83366C14.1663 3.53247 12.3009 1.66699 9.99967 1.66699C7.69849 1.66699 5.83301 3.53247 5.83301 5.83366C5.83301 8.13485 7.69849 10.0003 9.99967 10.0003Z"
                              stroke="#E4E4E7"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333"
                              stroke="#E4E4E7"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
                              message: "ایمیل معتبر نیست",
                            },
                          })}
                          type="email"
                          className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20"
                          placeholder="آدرس ایمیل"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.167 17.0837H5.83366C3.33366 17.0837 1.66699 15.8337 1.66699 12.917V7.08366C1.66699 4.16699 3.33366 2.91699 5.83366 2.91699H14.167C16.667 2.91699 18.3337 4.16699 18.3337 7.08366V12.917C18.3337 15.8337 16.667 17.0837 14.167 17.0837Z"
                              stroke="#E4E4E7"
                              strokeWidth="1.25"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.1663 7.5L11.558 9.58333C10.6997 10.2667 9.29134 10.2667 8.433 9.58333L5.83301 7.5"
                              stroke="#E4E4E7"
                              strokeWidth="1.25"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
                            message: "پیام باید حداقل ۱۰ کاراکتر باشد",
                          },
                        })}
                        className="w-full bg-[#52525B1A] border-[#3F3F46] text-white placeholder-gray-500 text-right rounded-xl py-3 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500/20 min-h-[150px] resize-none"
                        placeholder="ثبت نظر"
                        rows={5}
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.0504 3.00002L4.20878 10.2417C3.95045 10.5167 3.70045 11.0584 3.65045 11.4334L3.34211 14.1333C3.23378 15.1083 3.93378 15.775 4.90045 15.6084L7.58378 15.15C7.95878 15.0834 8.48378 14.8084 8.74211 14.525L15.5838 7.28335C16.7671 6.03335 17.3004 4.60835 15.4588 2.86668C13.6254 1.14168 12.2338 1.75002 11.0504 3.00002Z"
                            stroke="#E4E4E7"
                            strokeWidth="1.25"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.9082 4.20801C10.2665 6.50801 12.1332 8.26634 14.4499 8.49967"
                            stroke="#E4E4E7"
                            strokeWidth="1.25"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 18.333H17.5"
                            stroke="#858D9D"
                            strokeWidth="1.25"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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
                      className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 text-white font-ravi font-semibold text-base px-8 py-3 rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          در حال ارسال...
                        </span>
                      ) : (
                        "ارسال"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* بخش Google Maps در سمت راست */}
            <div className="flex-1 w-full">
              <div className="relative h-[280px] sm:h-[360px] lg:h-full min-h-[320px] lg:min-h-[500px] rounded-3xl overflow-hidden">
                {/* Google Maps */}
                <iframe
                  src={getGoogleMapsUrl()}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(30%) contrast(1.1) brightness(0.9)",
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
        <AlertDialogContent className="font-ravi bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              پیام شما با موفقیت ارسال شد
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              پیام شما با موفقیت ارسال شد و ما در اسرع وقت با شما تماس خواهیم
              گرفت.
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
              <Link
                href="/"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                بازگشت به خانه
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
