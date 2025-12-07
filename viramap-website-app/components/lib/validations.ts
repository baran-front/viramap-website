import { z } from "zod";

// Article Comment Form Schema
export const articleCommentFormSchema = z.object({
  fullName: z.string().min(3, "حداقل 3 کاراکتر").max(100, "حداکثر 100 کاراکتر"),
  title: z.string().min(3, "حداقل 3 کاراکتر"),
  rating: z.number().min(1, "لطفا امتیاز دهید").max(5),
});

export type ArticleCommentFormValues = z.infer<typeof articleCommentFormSchema>;

// Demo Request Form Schema
export const demoRequestFormSchema = z.object({
  fullname: z
    .string()
    .min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام و نام خانوادگی نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
  contact_channel: z
    .string()
    .regex(
      /^09\d{9}$/,
      "لطفا یک شماره موبایل معتبر وارد کنید (شکل: 09123456789)"
    )
    .length(11, "شماره موبایل باید ۱۱ رقم باشد"),
});

export type DemoRequestFormValues = z.infer<typeof demoRequestFormSchema>;

// Contact Us Form Schema
export const contactFormSchema = z.object({
  fullname: z
    .string()
    .min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام و نام خانوادگی نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
  contact_channel: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  message: z
    .string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "پیام نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Free Consultation Form Schema
export const freeConsultationFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد"),
  lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد"),
  contact_channel_1: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, "لطفا یک شماره موبایل معتبر وارد کنید"),
  contact_channel_2: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  calling_time: z.enum(["7-to-13", "13-to-19", "19-to-22"]),
});

export type FreeConsultationFormValues = z.infer<
  typeof freeConsultationFormSchema
>;

// Cooperation Request Form Schema
export const cooperationRequestFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد"),
  lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد"),
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  phone: z
    .string()
    .regex(
      /^09\d{9}$/,
      "لطفا یک شماره موبایل معتبر وارد کنید (شکل: 09123456789)"
    )
    .length(11, "شماره موبایل باید ۱۱ رقم باشد"),
  educationLevel: z.string().min(1, "لطفا مقطع تحصیلی را وارد کنید"),
  educationField: z.string().min(1, "لطفا رشته تحصیلی را وارد کنید"),
});

export type CooperationRequestFormValues = z.infer<
  typeof cooperationRequestFormSchema
>;
