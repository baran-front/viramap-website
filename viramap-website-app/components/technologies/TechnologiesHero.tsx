// components/technologies/TechnologiesHero.tsx
"use client";
import "./TechnologiesHero.css";
import { GlassSection } from "@/components/ui/glass-section";

interface TechnologiesHeroProps {
  title: string;
  description: string;
}

export default function TechnologiesHero({
  title,
  description,
}: TechnologiesHeroProps) {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[372px] px-5 py-20 overflow-x-hidden">
      <GlassSection
        title={title}
        description={description}
        className="tech-hero-container transform-gpu h-[372px] py-20 gap-6"
        titleClassName="tech-hero-title morabba-text flex items-center justify-center text-right w-[90%] h-[92px] text-[60px] leading-[92px] text-[#FAFAFA] font-bold pb-0"
        descriptionClassName="yekanbakh-text text-center tech-hero-description w-[720px] max-w-[90%] h-[96px] text-base leading-8 text-[#E4E4E7]"
      />
    </section>
  );
}
