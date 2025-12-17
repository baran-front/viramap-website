// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { CTASection } from "@/components";
import BackgroundBlur from "../components/BackgroundBlur";

export const metadata: Metadata = {
  title: "viramap | ویرامپ",
  description: "viramapdescription ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-ravi">
        <BackgroundBlur />
        <Header />
        <main>{children}</main>
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
