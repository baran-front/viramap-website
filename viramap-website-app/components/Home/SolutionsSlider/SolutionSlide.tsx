"use client";

import { memo } from "react";
import { SolutionItem } from "./types";

interface SolutionSlideProps {
  solution: SolutionItem;
  isActive: boolean;
  index: number;
}

const SolutionSlide = memo(
  ({ solution, isActive }: SolutionSlideProps) => {
    if (!isActive) return null;

    return (
      <div className={`solution-slide ${isActive ? "active" : ""}`}>
        <div className="solution-bg-wrapper">
          <div
            className="solution-bg-image"
            style={{
              backgroundImage: `url(${solution.imageUrl})`,
            }}
          />
          <div className="solution-bg-overlay" />
        </div>

        <div className="solution-content">
          <div className="solutions-header">
            <div className="solution-badge">
              <span className="solution-badge-text">راهکارها</span>
            </div>
          </div>

          <div className="slide-top-section">
            <h2 className="solution-title">
              راهکارهای تخصصی ویـــرامپ برای{" "}
              <span className="category-highlight">{solution.category}</span>
            </h2>

            <p className="solution-description">{solution.description}</p>

            <button className="read-more-btn" type="button">
              <span>{solution.buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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

          <div className="features-grid-container">
            {solution.features.map((feature, index) => {
              const position = solution.featurePositions?.[index];
              return (
                <div
                  key={`${solution.id}-${index}`}
                  className="feature-box"
                  style={{
                    top: position ? `${position.top}px` : undefined,
                    left: position ? `${position.left}px` : undefined,
                  }}
                >
                  <span className="feature-text">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.solution.id === nextProps.solution.id
    );
  }
);

SolutionSlide.displayName = "SolutionSlide";

export default SolutionSlide;
