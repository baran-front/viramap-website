import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اخبار و مقالات | ویرامپ",
  description:
    "مقالات و اخبار تخصصی درباره مسیریابی داخلی، نقشه‌های هوشمند، تکنولوژی‌های نوین و راهکارهای ویرامپ. جدیدترین اطلاعات و تحلیل‌ها در زمینه ERP و مدیریت سازمانی.",
  keywords: [
    "مقالات مسیریابی",
    "اخبار ویرامپ",
    "مقالات تکنولوژی",
    "راهنمای مسیریابی داخلی",
    "مقالات ERP",
  ],
  openGraph: {
    title: "اخبار و مقالات | ویرامپ",
    description:
      "مقالات و اخبار تخصصی درباره مسیریابی داخلی و نقشه‌های هوشمند",
    type: "website",
    url: "/articles",
  },
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

