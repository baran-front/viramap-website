//components/About/AboutContent.tsx
"use client";

import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import HowItWorks from "./HowItWorks";
import InstallationProcess from "./InstallationProcess";
import AboutIntro from "./AboutIntro";
import DifferenceSection from "./DifferenceSection";
import WhyViramap from "./WhyViramap";
import TechnologySection from "@/components/About/TechnologySectionWithImage";
import ImplementationProcess from "./ImplementationProcess";

export default function AboutContent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#FAFAFA",
        fontFamily: "Ravi, system-ui",
      }}
    >
      <div style={{}}>
        <AboutHero />
        <MissionVision />
        <HowItWorks />
        <InstallationProcess />
        <AboutIntro />
        <DifferenceSection />
        <WhyViramap />
        <TechnologySection />
        <ImplementationProcess />
      </div>
    </div>
  );
}
