"use client";

import { memo } from "react";
import { SolutionItem } from "./types";

interface SliderControlsProps {
  items: SolutionItem[];
  currentSlide: number;
  isAutoPlaying: boolean;
  onNext: (e?: React.MouseEvent) => void;
  onPrev: (e?: React.MouseEvent) => void;
  onGoToSlide: (index: number, e?: React.MouseEvent) => void;
  onToggleAutoPlay: (e?: React.MouseEvent) => void;
}

const SliderControls = memo(
  ({
    items,
    currentSlide,
    isAutoPlaying,
    onNext,
    onPrev,
    onGoToSlide,
    onToggleAutoPlay,
  }: SliderControlsProps) => {
    const handleNext = (e: React.MouseEvent) => {
      e.preventDefault();
      onNext(e);
    };

    const handlePrev = (e: React.MouseEvent) => {
      e.preventDefault();
      onPrev(e);
    };

    return (
      <div className="slider-arrow-controls">
        <button
          className="arrow-control left-arrow"
          onClick={handlePrev}
          aria-label="اسلاید قبلی"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="rgba(250, 250, 250, 0.1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="arrow-control right-arrow"
          onClick={handleNext}
          aria-label="اسلاید بعدی"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="rgba(250, 250, 250, 0.1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);

SliderControls.displayName = "SliderControls";

export default SliderControls;
