//components/templates/articlesCategoryTabs.tsx
"use client";

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
  onCategoryChange,
}: ArticlesCategoryTabsProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-visible">
      <div className="flex items-center gap-2 min-w-max px-2 md:min-w-0 md:justify-center md:px-0">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-ravi text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
            !selectedCategory
              ? "bg-orange-500 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          همه
        </button>
        {categories.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-gray-600">|</span>
            <button
              onClick={() => onCategoryChange(item.title)}
              className={`px-4 py-2 rounded-lg font-ravi text-sm transition-colors whitespace-nowrap ${
                selectedCategory === item.title
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesCategoryTabs;
