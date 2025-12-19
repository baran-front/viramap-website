// components/solutions/SolutionHero.tsx
"use client";
import { GlassSection } from "@/components/ui/glass-section";

interface SolutionHeroProps {
  title: string;
  description: string;
}

export default function SolutionHero({
  title,
  description,
}: SolutionHeroProps) {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[380px] md:min-h-[340px] lg:min-h-[352px] px-5 md:px-6 lg:px-10 pt-0 md:pt-1 lg:pt-2 pb-6 md:pb-8 lg:pb-10 solution-hero-section">
      <GlassSection
        title={title}
        description={description}
        className="solution-hero-content px-6 md:px-10 lg:px-14 py-12 md:py-14 lg:py-16 gap-5 md:gap-6 rounded-2xl md:rounded-3xl"
        titleAs="div"
        titleClassName="morabba-text flex items-center justify-center text-right w-[90%] min-h-[72px] text-[36px] leading-[54px] text-[#FAFAFA] md:min-h-[80px] md:text-[48px] md:leading-[64px] lg:min-h-[92px] lg:text-[60px] lg:leading-[92px] solution-hero-title pb-0"
        descriptionClassName="yekanbakh-text text-center solution-hero-description w-[720px] max-w-[90%] min-h-[96px] text-base leading-8 text-[#E4E4E7]"
      />
    </section>
  );
}
