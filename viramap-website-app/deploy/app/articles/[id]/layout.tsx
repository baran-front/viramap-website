import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  // در آینده می‌توانید از API داده واقعی را دریافت کنید
  // فعلاً از metadata پیش‌فرض استفاده می‌کنیم
  const articleTitle = "مقاله ویرامپ";
  const articleDescription =
    "مقاله تخصصی درباره مسیریابی داخلی، نقشه‌های هوشمند و راهکارهای ویرامپ";

  return {
    title: `${articleTitle} | ویرامپ`,
    description: articleDescription,
    keywords: [
      "مقالات ویرامپ",
      "مقاله مسیریابی",
      "مقالات تکنولوژی",
      "راهنمای مسیریابی داخلی",
    ],
    openGraph: {
      title: articleTitle,
      description: articleDescription,
      type: "article",
      url: `/articles/${id}`,
    },
    alternates: {
      canonical: `/articles/${id}`,
    },
  };
}

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

