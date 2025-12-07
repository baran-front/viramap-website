"use client";

import { memo } from "react";
import { SolutionItem } from "./types";

interface SolutionSlideProps {
  solution: SolutionItem;
  isActive: boolean;
  index: number;
  direction?: "next" | "prev";
}

const SolutionSlide = memo(
  ({ solution, isActive }: SolutionSlideProps) => {
    if (!isActive) return null;

    return (
      <div className={`solution-slide ${isActive ? "active" : ""}`}>
        {/* بکگراند تصویر اصلی */}
        <div
          className="solution-bg-image"
          style={{ backgroundImage: `url(${solution.imageUrl})` }}
        />

        {/* Content Overlay */}
        <div className="solution-content">
          {/* Header Section */}
          <div className="solutions-header">
            {/* Badge */}
            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                padding: "5px 16px",
                gap: "24px",
                width: "70px",
                height: "35px",
                background:
                  "linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
                borderRadius: "8px",
                border: "1px solid #344054",
              }}
            >
              <span
                style={{
                  fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "22px",
                  color: "#FFFFFF",
                  textAlign: "right",
                }}
              >
                راهکارها
              </span>
            </div>
          </div>
          {/* Top Section - Title and Description */}
          <div className="slide-top-section">
            <h2 className="solution-title">
              راهکارهای تخصصی ویـــرامپ برای{" "}
              <span className="category-highlight">{solution.category}</span>
            </h2>

            <p className="solution-description">{solution.description}</p>

            {/* Button */}
            <button className="read-more-btn">
              <span>{solution.buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99998 13.2802L5.65331 8.93355C5.13998 8.42021 5.13998 7.58022 5.65331 7.06688L9.99998 2.72021"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Features با موقعیت‌های معکوس شده */}
          <div className="features-vertical-container">
            {solution.features.map((feature, index) => (
              <div
                key={index}
                className="feature-box"
                style={{
                  position: "absolute",
                  top: `${solution.featurePositions?.[index]?.top || 0}px`,
                  left: `${solution.featurePositions?.[index]?.left || 0}px`,
                }}
              >
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // فقط اگر isActive یا solution تغییر کرد، re-render کن
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.solution.id === nextProps.solution.id
    );
  }
);

SolutionSlide.displayName = "SolutionSlide";

export default SolutionSlide;
