import type { Metadata } from "next";
import { Suspense } from "react";
import AboutUsContent from "@/components/ContactUs/AboutUsContent";

export const metadata: Metadata = {
  title: "تماس با ما | ویرامپ",
  description:
    "تماس با تیم ویرامپ برای دریافت مشاوره رایگان و اطلاعات بیشتر درباره راهکارهای مسیریابی داخلی. فرم تماس و اطلاعات تماس ما.",
  keywords: [
    "تماس با ویرامپ",
    "فرم تماس",
    "مشاوره رایگان",
    "پشتیبانی ویرامپ",
  ],
  openGraph: {
    title: "تماس با ما | ویرامپ",
    description:
      "تماس با تیم ویرامپ برای دریافت مشاوره رایگان و اطلاعات بیشتر",
    type: "website",
    url: "/about-us",
  },
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <Suspense fallback={<main>در حال بارگذاری...</main>}>
      <AboutUsContent />
    </Suspense>
  );
}
