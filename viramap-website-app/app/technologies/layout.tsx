import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تکنولوژی‌های ویرامپ | سیستم موقعیت‌یابی داخلی (IPS)",
  description:
    "آشنایی با تکنولوژی‌های پیشرفته ویرامپ در زمینه مسیریابی و موقعیت‌یابی داخلی. سیستم IPS با دقت کمتر از 5 متر بدون نیاز به سخت‌افزار اضافی.",
  keywords: [
    "تکنولوژی مسیریابی",
    "IPS",
    "موقعیت‌یابی داخلی",
    "سیستم ناوبری",
    "تکنولوژی ویرامپ",
  ],
  openGraph: {
    title: "تکنولوژی‌های ویرامپ | سیستم موقعیت‌یابی داخلی",
    description:
      "تکنولوژی‌های پیشرفته ویرامپ در زمینه مسیریابی و موقعیت‌یابی داخلی",
    type: "website",
    url: "/technologies",
  },
  alternates: {
    canonical: "/technologies",
  },
};

export default function TechnologiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

