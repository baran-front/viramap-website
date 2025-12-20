"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ContactUsForm,
  ContactInfoSection,
  FreeConsultationSection,
} from "@/components/ContactUs";

export default function AboutUsContent() {
  const searchParams = useSearchParams();
  const showFreeConsultation = searchParams.get("free") === "1";

  // اسکرول به hash اگر در URL وجود داشته باشد
  useEffect(() => {
    if (window.location.hash === "#free-consultation") {
      const timer = setTimeout(() => {
        const element = document.getElementById("free-consultation");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main>
      {showFreeConsultation && <FreeConsultationSection autoScroll={true} />}
      <ContactUsForm />
      <ContactInfoSection />
    </main>
  );
}

