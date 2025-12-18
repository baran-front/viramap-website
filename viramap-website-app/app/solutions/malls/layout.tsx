import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "راهکار مسیریابی برای مجتمع‌های تجاری و مال‌ها | ویرامپ",
  description:
    "راهکار مسیریابی داخلی ویرامپ برای مراکز خرید و مال‌ها. افزایش فروش، بهبود تجربه خرید مشتریان و مدیریت بهتر پارکینگ و مسیرهای داخلی.",
  keywords: [
    "راهکار مسیریابی مال",
    "نقشه مراکز خرید",
    "مسیریابی مجتمع تجاری",
    "ویرامپ",
    "راهنمای مال",
  ],
  openGraph: {
    title: "راهکار مسیریابی برای مجتمع‌های تجاری و مال‌ها | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای مراکز خرید و مال‌ها",
    type: "website",
    url: "/solutions/malls",
  },
  alternates: {
    canonical: "/solutions/malls",
  },
};

export default function MallsSolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

