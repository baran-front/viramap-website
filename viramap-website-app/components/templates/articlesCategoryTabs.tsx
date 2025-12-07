//components/templates/articlesCategoryTabs.tsx
"use client";

import { Button } from "../ui/button";

interface ArticleCategory {
  id: number;
  title: string;
}

type ArticlesCategoryTabsProps = {
  categories: ArticleCategory[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const ArticlesCategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: ArticlesCategoryTabsProps) => {

  return (
    <div className="w-full lg:w-max lg:max-w-full flex items-center gap-2 p-2 rounded-full bg-gray-900/50 border border-gray-700 overflow-x-auto">
      <Button
        onClick={() => onCategoryChange(null)}
        variant={!selectedCategory ? "default" : "ghost"}
        className="rounded-full whitespace-nowrap"
      >
        همه مقالات
      </Button>
      {categories.map((item) => (
        <Button
          key={item.id}
          variant={selectedCategory === item.title ? "default" : "ghost"}
          onClick={() => onCategoryChange(item.title)}
          className="rounded-full whitespace-nowrap"
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
};

export default ArticlesCategoryTabs;