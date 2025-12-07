// components/technologies/TechnologiesHero.tsx
"use client";

interface TechnologiesHeroProps {
  title: string;
  description: string;
}

export default function TechnologiesHero({
  title,
  description,
}: TechnologiesHeroProps) {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[372px] px-4 py-20 overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* مجموعه Ellipse ها */}
        <div className="absolute inset-0">
          {/* Ellipse 50 - نارنجی کوچک */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: "484px",
              height: "484px",
              left: "calc(50% - 242px - 495px)",
              top: "64px",
              background: "rgba(251, 101, 20, 0.12)",
              filter: "blur(50px)",
              opacity: "0.9",
            }}
          />

          {/* Ellipse 52 جدید - سبز بزرگ */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: "663px",
              height: "663px",
              left: "calc(50% - 331.5px - 501.5px)",
              top: "-180px",
              background: "rgba(6, 120, 113, 0.28)",
              filter: "blur(220px)",
              opacity: "0.9",
            }}
          />

          {/* Ellipse 51 - سبز سمت راست */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: "502px",
              height: "502px",
              left: "calc(50% - 251px + 406px)",
              top: "172px",
              background: "rgba(6, 120, 113, 0.28)",
              filter: "blur(200px)",
              opacity: "0.85",
            }}
          />

          {/* Ellipse 47 - نارنجی بزرگ */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: "794px",
              height: "794px",
              left: "calc(50% - 397px + 572px)",
              top: "-481px",
              background: "rgba(254, 139, 32, 0.25)",
              filter: "blur(220px)",
              opacity: "0.9",
            }}
          />

          {/* Ellipse های اضافی */}
          <div
            className="absolute rounded-full transform-gpu hidden lg:block"
            style={{
              width: "600px",
              height: "600px",
              right: "-20%",
              bottom: "-10%",
              background: "rgba(143, 101, 255, 0.15)",
              filter: "blur(180px)",
              opacity: "0.7",
            }}
          />
        </div>
      </div>

      {/* Main Content Box */}
      <div
        className="relative flex flex-col justify-center items-center z-10 transform-gpu"
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
          className="morabba-text flex items-center justify-center text-right"
          style={{
            width: "90%",
            height: "92px",
            fontSize: "60px",
            lineHeight: "92px",
            color: "#FAFAFA",
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
