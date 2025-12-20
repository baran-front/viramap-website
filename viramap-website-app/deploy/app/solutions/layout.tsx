import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "راهکارهای ویرامپ | مسیریابی داخلی برای صنایع مختلف",
  description:
    "راهکارهای تخصصی مسیریابی داخلی ویرامپ برای مراکز بهداشتی و درمانی، فرودگاه‌ها، نمایشگاه‌ها، اماکن زیارتی، دانشگاه‌ها، مجتمع‌های تجاری، ورزشگاه‌ها و واحدهای صنعتی.",
  keywords: [
    "راهکار مسیریابی",
    "مسیریابی بیمارستان",
    "راهنمای فرودگاه",
    "نقشه مراکز خرید",
    "مسیریابی دانشگاه",
    "راهکار ویرامپ",
  ],
  openGraph: {
    title: "راهکارهای ویرامپ | مسیریابی داخلی برای صنایع مختلف",
    description:
      "راهکارهای تخصصی مسیریابی داخلی برای صنایع و مکان‌های مختلف",
    type: "website",
    url: "/solutions",
  },
  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
