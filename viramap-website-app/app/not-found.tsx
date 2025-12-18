import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./not-found.css";

export const metadata: Metadata = {
  title: "404 - صفحه یافت نشد | ویرامپ",
  description: "صفحه مورد نظر یافت نشد. لطفاً به صفحه اصلی بازگردید.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - صفحه یافت نشد | ویرامپ",
    description: "صفحه مورد نظر یافت نشد",
    type: "website",
  },
  alternates: {
    canonical: "/404",
  },
};

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <Image
          src="/images/error/error.png"
          alt="404 Error"
          width={500}
          height={500}
          className="not-found-image"
          priority
        />
        <Link href="/" className="not-found-link">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
