import { Metadata } from "next";

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    "@type": string;
    telephone: string;
    contactType: string;
  };
  sameAs?: string[];
}

interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": string;
    name: string;
  };
  publisher?: {
    "@type": string;
    name: string;
    logo?: {
      "@type": string;
      url: string;
    };
  };
}

interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateOrganizationSchema(): OrganizationSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viramaps.ir";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ویرامپ",
    url: baseUrl,
    logo: `${baseUrl}/images/Logo/logo.png`,
    description:
      "ارائه‌دهنده راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-912-909-0990",
      contactType: "customer service",
    },
    sameAs: [
      // اضافه کردن لینک‌های شبکه‌های اجتماعی در صورت وجود
      // "https://www.linkedin.com/company/viramap",
      // "https://twitter.com/viramap",
    ],
  };
}

export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}): ArticleSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viramaps.ir";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ? `${baseUrl}${image}` : `${baseUrl}/images/Logo/logo.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "ویرامپ",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/Logo/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viramaps.ir";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${baseUrl}${item.url}` : undefined,
    })),
  };
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

