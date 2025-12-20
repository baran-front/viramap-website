//app/about/page.tsx
import type { Metadata } from "next";
import { AboutContent } from '@/components';

export const metadata: Metadata = {
  title: "درباره ویرامپ | معرفی شرکت و تیم",
  description:
    "آشنایی با ویرامپ، ارائه‌دهنده راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند. ماموریت، چشم‌انداز و تکنولوژی‌های ما در خدمت بهبود تجربه کاربری.",
  keywords: [
    "درباره ویرامپ",
    "معرفی شرکت",
    "تیم ویرامپ",
    "ماموریت ویرامپ",
  ],
  openGraph: {
    title: "درباره ویرامپ | معرفی شرکت و تیم",
    description: "آشنایی با ویرامپ و راهکارهای مسیریابی داخلی",
    type: "website",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}