// components/home/SolutionsSlider/types.ts
export interface SolutionItem {
  id: number;
  category: string;
  title: string;
  description: string;
  features: string[];
  featurePositions?: { top: number; left: number }[];
  buttonText: string;
  imageUrl: string;
  order: number;
}
