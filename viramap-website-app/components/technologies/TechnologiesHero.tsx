// components/technologies/TechnologiesHero.tsx
"use client";
import "./TechnologiesHero.css";

interface TechnologiesHeroProps {
  title: string;
  description: string;
}

export default function TechnologiesHero({
  title,
  description,
}: TechnologiesHeroProps) {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[372px] px-4 py-20 overflow-x-hidden">
      {/* Main Content Box */}
      <div
        className="tech-hero-container relative flex flex-col justify-center items-center z-10 transform-gpu"
        style={{
          width: "1480px",
          maxWidth: "90vw",
          height: "372px",
          padding: "80px 0px",
          gap: "24px",
          background: "rgba(250, 250, 250, 0.1)",
          border: "1px solid #3F3F46",
          borderRadius: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <div
          className="tech-hero-title morabba-text flex items-center justify-center text-right"
          style={{
            width: "90%",
            height: "92px",
            fontSize: "60px",
            lineHeight: "92px",
            color: "#FAFAFA",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <p
          className="yekanbakh-text text-center"
          style={{
            width: "720px",
            maxWidth: "90%",
            height: "96px",
            fontSize: "16px",
            lineHeight: "32px",
            color: "#E4E4E7",
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
