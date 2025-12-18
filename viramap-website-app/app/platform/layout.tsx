import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پلتفرم ویرامپ | سیستم مدیریت مسیریابی داخلی",
  description:
    "پلتفرم جامع ویرامپ برای مدیریت و کنترل سیستم‌های مسیریابی داخلی. داشبورد مدیریتی پیشرفته با قابلیت‌های تحلیلی و گزارش‌گیری کامل.",
  keywords: [
    "پلتفرم ویرامپ",
    "داشبورد مدیریتی",
    "سیستم مسیریابی",
    "مدیریت نقشه هوشمند",
  ],
  openGraph: {
    title: "پلتفرم ویرامپ | سیستم مدیریت مسیریابی داخلی",
    description: "پلتفرم جامع ویرامپ برای مدیریت سیستم‌های مسیریابی داخلی",
    type: "website",
    url: "/platform",
  },
  alternates: {
    canonical: "/platform",
  },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

