// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { CTASection } from "@/components";
import BackgroundBlur from "../components/BackgroundBlur";
import {
  StructuredData,
  generateOrganizationSchema,
} from "@/components/lib/structured-data";
import { FormMessageProvider } from "@/components/ui/form-message-provider";

export const metadata: Metadata = {
  title: {
    default: "ویرامپ | راهکارهای مسیریابی داخلی و نقشه‌های هوشمند",
    template: "%s | ویرامپ",
  },
  description:
    "ویرامپ ارائه‌دهنده راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند برای مراکز خرید، فرودگاه‌ها، بیمارستان‌ها، دانشگاه‌ها و اماکن عمومی. تجربه کاربری بهتر با تکنولوژی‌های نوین.",
  keywords: [
    "مسیریابی داخلی",
    "نقشه هوشمند",
    "راهنمای داخلی",
    "ویرامپ",
    "Indoor Navigation",
    "نقشه مراکز خرید",
    "مسیریابی بیمارستان",
    "راهنمای فرودگاه",
  ],
  authors: [{ name: "ویرامپ" }],
  creator: "ویرامپ",
  publisher: "ویرامپ",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://viramaps.ir"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "ویرامپ",
    title: "ویرامپ | راهکارهای مسیریابی داخلی و نقشه‌های هوشمند",
    description:
      "ویرامپ ارائه‌دهنده راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند برای مراکز خرید، فرودگاه‌ها، بیمارستان‌ها و اماکن عمومی.",
    images: [
      {
        url: "/images/Logo/logo.png",
        width: 1200,
        height: 630,
        alt: "لوگوی ویرامپ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ویرامپ | راهکارهای مسیریابی داخلی",
    description:
      "راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند برای اماکن عمومی",
    images: ["/images/Logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    // verification: {
    //   // Google Search Console و Yandex Webmaster با DNS record verify شده‌اند
    //   // نیازی به کد HTML tag نیست
    // },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/Logo/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="fa" dir="rtl">
      <body className="font-ravi">
        <StructuredData data={organizationSchema} />
        <FormMessageProvider />
        <BackgroundBlur />
        <Header />
        <main>{children}</main>
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
