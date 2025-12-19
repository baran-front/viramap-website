import type { Metadata } from "next";
import {
  ContactUsForm,
  ContactInfoSection,
  FreeConsultationSection,
} from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "تماس با ما | ویرامپ",
  description:
    "تماس با تیم ویرامپ برای دریافت مشاوره رایگان و اطلاعات بیشتر درباره راهکارهای مسیریابی داخلی. فرم تماس و اطلاعات تماس ما.",
  keywords: [
    "تماس با ویرامپ",
    "فرم تماس",
    "مشاوره رایگان",
    "پشتیبانی ویرامپ",
  ],
  openGraph: {
    title: "تماس با ما | ویرامپ",
    description:
      "تماس با تیم ویرامپ برای دریافت مشاوره رایگان و اطلاعات بیشتر",
    type: "website",
    url: "/about-us",
  },
  alternates: {
    canonical: "/about-us",
  },
};

type AboutUsPageSearchParams = {
  [key: string]: string | string[] | undefined;
};

type AboutUsPageProps = {
  searchParams?: AboutUsPageSearchParams;
};

export default function AboutUsPage({ searchParams }: AboutUsPageProps) {
  const params = searchParams ?? {};
  const showFreeConsultation = params.free === "1";

  return (
    <main>
      {showFreeConsultation && <FreeConsultationSection autoScroll={true} />}
      <ContactUsForm />
      <ContactInfoSection />
    </main>
  );
}
