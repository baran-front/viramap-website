// components/home/DynamicSlider/types.ts
export interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

export type SlideDirection = 'next' | 'prev';

export interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
  index: number;
  direction?: SlideDirection;
}

export interface SliderControlsProps {
  slides: Slide[];
  currentSlide: number;
  isAutoPlaying?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (index: number) => void;
  onToggleAutoPlay?: () => void;
}