// components/home/DynamicSlider/SliderControls.tsx
"use client";

import { Slide } from "./types";

interface SliderControlsProps {
  slides: Slide[];
  currentSlide: number;
  isAutoPlaying?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (index: number) => void;
  onToggleAutoPlay?: () => void;
}

const SliderControls = ({
  slides,
  currentSlide,
  onNext,
  onPrev,
  onGoToSlide,
  isAutoPlaying: _isAutoPlaying,
  onToggleAutoPlay: _onToggleAutoPlay,
}: SliderControlsProps) => {
  return (
    <div
      className="
      flex flex-row justify-center items-center
      p-0 gap-4 md:gap-6
      w-auto h-6
      absolute bottom-10 left-1/2
      -translate-x-1/2
      z-10
    "
    >
      {/* Right Arrow */}
      <button
        onClick={onNext}
        className="
          w-6 h-6
          relative
          bg-transparent
          border-none
          cursor-pointer
          p-0
          flex-none
          order-2
          grow-0
          group
          transition-all duration-500 ease-in-out
          hover:scale-110
          active:scale-95
        "
        aria-label="اسلاید بعدی"
      >
        {/* Right Arrow SVG */}
        <div
          className="
          absolute
          left-0 top-0
          w-6 h-6
          group-hover:[&_path]:fill-[#FB6514]
          group-hover:[&_path]:fill-opacity-100
          transition-all duration-500 ease-in-out
          group-hover:scale-110
          group-hover:[&_svg]:drop-shadow-[0_0_8px_rgba(251,101,20,0.9)]
        "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 ease-in-out"
          >
            <path
              d="M2.74988 12.0001C2.74988 11.8101 2.81988 11.6201 2.96988 11.4701L9.03988 5.40012C9.32988 5.11012 9.80988 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55988 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.80988 18.8901 9.32988 18.8901 9.03988 18.6001L2.96988 12.5301C2.81988 12.3801 2.74988 12.1901 2.74988 12.0001Z"
              fill="#FAFAFA"
              fillOpacity="0.5"
              className="transition-all duration-500 ease-in-out"
            />

            <path
              d="M2.92 12C2.92 11.59 3.26 11.25 3.67 11.25L20.5 11.25C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75L3.67 12.75C3.26 12.75 2.92 12.41 2.92 12Z"
              fill="#FAFAFA"
              fillOpacity="0.5"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
        </div>
      </button>

      {/* Slide Indicators */}
      <div
        className="
        flex flex-row items-center justify-center
        p-0 gap-2
        w-auto h-2
        flex-none
        order-1
        grow-0
      "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`
              transition-all duration-500 ease-in-out
              rounded-[30px]
              border-none
              cursor-pointer
              p-0
              flex-none
              grow-0
              hover:bg-[#FB6514]
              hover:scale-110
              active:scale-95
              ${
                index === currentSlide
                  ? "w-8 h-1 bg-[#FB6514] shadow-[0_0_8px_rgba(251,101,20,0.6)]"
                  : "w-4 h-1 bg-[#4A5554] hover:w-5"
              }
            `}
            aria-label={`برو به اسلاید ${index + 1}`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={onPrev}
        className="
          w-6 h-6
          relative
          bg-transparent
          border-none
          cursor-pointer
          p-0
          flex-none
          order-0
          grow-0
          group
          transition-all duration-500 ease-in-out
          hover:scale-110
          active:scale-95
        "
        aria-label="اسلاید قبلی"
      >
        {/* Left Arrow SVG */}
        <div
          className="
          absolute
          left-0 top-0
          w-6 h-6
          group-hover:[&_path]:fill-[#FB6514]
          group-hover:[&_path]:fill-opacity-100
          transition-all duration-500 ease-in-out
          group-hover:scale-110
          group-hover:[&_svg]:drop-shadow-[0_0_8px_rgba(251,101,20,0.9)]
        "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 ease-in-out"
          >
            <path
              d="M21.2501 12.0001C21.2501 11.8101 21.1801 11.6201 21.0301 11.4701L14.9601 5.40012C14.6701 5.11012 14.1901 5.11012 13.9001 5.40012C13.6101 5.69012 13.6101 6.17012 13.9001 6.46012L19.4401 12.0001L13.9001 17.5401C13.6101 17.8301 13.6101 18.3101 13.9001 18.6001C14.1901 18.8901 14.6701 18.8901 14.9601 18.6001L21.0301 12.5301C21.1801 12.3801 21.2501 12.1901 21.2501 12.0001Z"
              fill="#FAFAFA"
              fillOpacity="0.5"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d="M21.08 12C21.08 11.59 20.74 11.25 20.33 11.25L3.5 11.25C3.09 11.25 2.75 11.59 2.75 12C2.75 12.41 3.09 12.75 3.5 12.75L20.33 12.75C20.74 12.75 21.08 12.41 21.08 12Z"
              fill="#FAFAFA"
              fillOpacity="0.5"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default SliderControls;
