//components/About/AboutContent.tsx
"use client";

import { useEffect, useState } from "react";
import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import HowItWorks from "./HowItWorks";
import InstallationProcess from "./InstallationProcess";
import AboutIntro from "./AboutIntro";
import DifferenceSection from "./DifferenceSection";
import WhyViramap from "./WhyViramap";
import TechnologySection from "@/components/About/TechnologySectionWithImage";
import ImplementationProcess from "./ImplementationProcess";
import { getHeroByGroupName } from "@/components/lib/fetches/hero";

export default function AboutContent() {
  const [heroTitle, setHeroTitle] = useState<string | undefined>(undefined);
  const [heroDescription, setHeroDescription] = useState<string | undefined>(undefined);
  const [introTitle, setIntroTitle] = useState<string | undefined>(undefined);
  const [introDescription, setIntroDescription] = useState<string | undefined>(undefined);

  // تابع برای استخراج متن از HTML
  const extractTextFromHTML = (html: string): string => {
    let text = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    return text;
  };

  // دریافت داده‌های Hero از API
  useEffect(() => {
    async function fetchHero() {
      try {
        const result = await getHeroByGroupName({ groupName: "hero-about" });
        if (result.ok && result.data) {
          setHeroTitle(result.data.name);
          const descriptionText = extractTextFromHTML(result.data.content);
          setHeroDescription(descriptionText);
        }
      } catch (error) {
        console.error("خطا در دریافت Hero:", error);
      }
    }

    fetchHero();
  }, []);

  // دریافت داده‌های Intro از API
  useEffect(() => {
    async function fetchIntro() {
      try {
        const result = await getHeroByGroupName({ groupName: "about-intro" });
        if (result.ok && result.data) {
          setIntroTitle(result.data.name);
          const descriptionText = extractTextFromHTML(result.data.content);
          setIntroDescription(descriptionText);
        }
      } catch (error) {
        console.error("خطا در دریافت Intro:", error);
      }
    }

    fetchIntro();
  }, []);

  return (
    <div className="min-h-screen text-[#FAFAFA] font-ravi">
      <div>
        <AboutHero title={heroTitle} description={heroDescription} />
        <MissionVision />
        <HowItWorks />
        <InstallationProcess />
        <AboutIntro title={introTitle} description={introDescription} />
        <DifferenceSection />
        <WhyViramap />
        <TechnologySection />
        <ImplementationProcess />
      </div>
    </div>
  );
}
