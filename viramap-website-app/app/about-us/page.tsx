import type { Metadata } from "next";
import {
  ContactUsForm,
  ContactInfoSection,
  FreeConsultationSection,
} from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "درباره ما | ویرامپ",
  description: "صفحه درباره ما و فرم تماس با ما",
};

type AboutUsPageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function AboutUsPage({ searchParams }: AboutUsPageProps) {
  // پشتیبانی از هر دو حالت sync و async برای searchParams
  const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};
  const showFreeConsultation = params.free === "1";

  return (
    <main>
      {showFreeConsultation && <FreeConsultationSection autoScroll={true} />}
      <ContactUsForm />
      <ContactInfoSection />
    </main>
  );
}

