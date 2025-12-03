'use client';

import { SolutionItem } from './types';

interface SliderControlsProps {
  items: SolutionItem[];
  currentSlide: number;
  isAutoPlaying: boolean;
  onNext: (e?: React.MouseEvent) => void;
  onPrev: (e?: React.MouseEvent) => void;
  onGoToSlide: (index: number, e?: React.MouseEvent) => void;
  onToggleAutoPlay: (e?: React.MouseEvent) => void;
}

const SliderControls = ({
  items,
  currentSlide,
  isAutoPlaying,
  onNext,
  onPrev,
  onGoToSlide,
  onToggleAutoPlay
}: SliderControlsProps) => {
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    onNext(e);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    onPrev(e);
  };

  const handleGoToSlide = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onGoToSlide(index, e);
  };

  const handleToggleAutoPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleAutoPlay(e);
  };

  return (
    <>
      {/* Arrow Controls - وسط سمت چپ و راست */}
      <div className="slider-arrow-controls">
        <button
          className="arrow-control left-arrow"
          onClick={handlePrev}
          aria-label="اسلاید قبلی"
          type="button" // اضافه کردن type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="rgba(250, 250, 250, 0.1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          className="arrow-control right-arrow"
          onClick={handleNext}
          aria-label="اسلاید بعدی"
          type="button" // اضافه کردن type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="rgba(250, 250, 250, 0.1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
        </button>
      </div>

      
      {/* <div className="solutions-controls">

        <div className="slider-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={handleGoToSlide(index)}
              aria-label={`برو به اسلاید ${index + 1}`}
              type="button" 
            />
          ))}
        </div>

        
        <button
          className="play-pause-btn"
          onClick={handleToggleAutoPlay}
          aria-label={isAutoPlaying ? "توقف پخش خودکار" : "شروع پخش خودکار"}
          type="button" 
        >
          {isAutoPlaying ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="6" y="4" width="3" height="12" fill="currentColor"/>
              <rect x="11" y="4" width="3" height="12" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 4L16 10L6 16V4Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </div> */}

    </>
  );
};

export default SliderControls;