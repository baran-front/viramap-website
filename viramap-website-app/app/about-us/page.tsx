import type { Metadata } from "next";
import { ContactUsForm } from "@/components/ContactUs";
import {ContactInfoSection} from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "درباره ما | ویرامپ",
  description: "صفحه درباره ما و فرم تماس با ما",
};

export default function AboutUsPage() {
  return (
    <div >
      <ContactUsForm />
      <ContactInfoSection />
    </div>
  );
}