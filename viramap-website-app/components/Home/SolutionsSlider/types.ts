// components/home/SolutionsSlider/types.ts
export interface SolutionItem {
  id: number;
  category: string; // داینامیک از API - مثلاً "بیمارستان‌ها"
  title: string; // "راهکارهای تخصصی ویرامپ برای ${category}"
  description: string; // توضیحات داینامیک از API
  features: string[]; // 4 ویژگی
  featurePositions?: { top: number; left: number }[]; // موقعیت‌های قابل تنظیم
  buttonText: string;
  imageUrl: string; // بکگراند از API
  order: number;
}

export type SliderDirection = 'next' | 'prev';