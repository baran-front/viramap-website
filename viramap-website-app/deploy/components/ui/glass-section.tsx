import * as React from "react";

import { cn } from "@/components/lib/utils";

interface GlassSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /**
   * HTML tag for the title. Default: h1
   */
  titleAs?: keyof React.JSX.IntrinsicElements;
  /**
   * Text alignment style for description.
   * - "center": centered text
   * - "justify": justified RTL text (for long Persian paragraphs)
   */
  descriptionAlign?: "center" | "justify";
  /**
   * Extra classes for the outer glass card container.
   */
  className?: string;
  /**
   * Extra classes for the title element.
   */
  titleClassName?: string;
  /**
   * Extra classes for the description element.
   */
  descriptionClassName?: string;
}

function GlassSection({
  title,
  description,
  titleAs = "h1",
  descriptionAlign = "center",
  className,
  titleClassName,
  descriptionClassName,
}: GlassSectionProps) {
  const TitleTag = titleAs;

  return (
    <div
      data-slot="glass-section"
      className={cn(
        "relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 gap-4 sm:gap-6 md:gap-8 z-10",
        "border border-zinc-700/80 rounded-3xl box-border bg-white/10 backdrop-blur-[10px]",
        "w-[min(1480px,95vw)] min-h-[clamp(400px,50vh,504px)]",
        className
      )}
    >
      <TitleTag
        className={cn(
          "font-ravi font-medium text-white text-center w-full whitespace-pre-line",
          "mx-auto",
          "text-[clamp(24px,3.5vw,60px)] leading-[clamp(36px,4.5vw,92px)]",
          "pb-[clamp(16px,2.5vw,50px)]",
          titleClassName
        )}
      >
        {title}
      </TitleTag>

      {description && (
        <p
          className={cn(
            "font-ravi font-normal text-gray-300 w-full mx-auto",
            "text-[clamp(13px,1.4vw,16px)] leading-[clamp(22px,2.4vw,32px)]",
            descriptionAlign === "center"
              ? "text-center"
              : "text-justify rtl text-right",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { GlassSection };
