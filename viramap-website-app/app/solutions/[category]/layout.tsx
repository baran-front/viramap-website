import type { Metadata } from "next";

const categoryNames: Record<string, { title: string; description: string }> = {
  healthcare: {
    title: "راهکار مسیریابی برای مراکز بهداشتی و درمانی | ویرامپ",
    description:
      "راهکار تخصصی مسیریابی داخلی ویرامپ برای بیمارستان‌ها و مراکز درمانی. بهبود تجربه بیماران و بهینه‌سازی مسیرهای داخلی.",
  },
  airports: {
    title: "راهکار مسیریابی برای فرودگاه‌ها | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای فرودگاه‌ها. راهنمای مسافران به گیت‌ها، سالن‌ها و امکانات فرودگاه.",
  },
  exhibitions: {
    title: "راهکار مسیریابی برای نمایشگاه‌ها | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای نمایشگاه‌ها و سالن‌های نمایش. راهنمای بازدیدکنندگان به غرفه‌ها و بخش‌های مختلف.",
  },
  pilgrimage: {
    title: "راهکار مسیریابی برای اماکن زیارتی | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای اماکن زیارتی. راهنمای زائران به بخش‌های مختلف و امکانات.",
  },
  universities: {
    title: "راهکار مسیریابی برای دانشگاه‌ها و مراکز آموزشی | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای دانشگاه‌ها و مراکز آموزشی. راهنمای دانشجویان به کلاس‌ها، کتابخانه و امکانات.",
  },
  malls: {
    title: "راهکار مسیریابی برای مجتمع‌های تجاری و مال‌ها | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای مراکز خرید و مال‌ها. افزایش فروش و بهبود تجربه خرید مشتریان.",
  },
  stadiums: {
    title: "راهکار مسیریابی برای ورزشگاه‌ها و استادیوم‌ها | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای ورزشگاه‌ها و استادیوم‌ها. راهنمای تماشاگران به جایگاه‌ها و امکانات.",
  },
  industrial: {
    title: "راهکار مسیریابی برای واحد‌های صنعتی و تولیدی | ویرامپ",
    description:
      "راهکار مسیریابی داخلی ویرامپ برای واحدهای صنعتی و تولیدی. بهینه‌سازی مسیرهای داخلی و افزایش کارایی.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo =
    categoryNames[category] ||
    categoryNames["healthcare"]; // fallback

  return {
    title: categoryInfo.title,
    description: categoryInfo.description,
    keywords: [
      "راهکار مسیریابی",
      category,
      "ویرامپ",
      "مسیریابی داخلی",
    ],
    openGraph: {
      title: categoryInfo.title,
      description: categoryInfo.description,
      type: "website",
      url: `/solutions/${category}`,
    },
    alternates: {
      canonical: `/solutions/${category}`,
    },
  };
}

export default function SolutionCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

