// app/solutions/page.tsx
export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-32 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">راهکارهای ویرامپ</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          راهکارهای تخصصی مسیریابی داخلی برای صنایع و مکان‌های مختلف
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* لیست همه راهکارها */}
          {['healthcare', 'airports', 'exhibitions', 'pilgrimage', 'universities', 'malls', 'stadiums', 'industrial'].map((category) => (
            <a
              key={category}
              href={`/solutions/${category}`}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-[#FB6514] transition-all hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold mb-3">
                {category === 'healthcare' && 'مراکز بهداشتی و درمانی'}
                {category === 'airports' && 'فرودگاه‌ها'}
                {category === 'exhibitions' && 'نمایشگاه‌ها'}
                {category === 'pilgrimage' && 'اماکن زیارتی'}
                {category === 'universities' && 'دانشگاه‌ها و مراکز آموزشی'}
                {category === 'malls' && 'مجتمع‌های تجاری و مال‌ها'}
                {category === 'stadiums' && 'ورزشگاه‌ها و استادیوم‌ها'}
                {category === 'industrial' && 'واحد‌های صنعتی و تولیدی'}
              </h3>
              <p className="text-gray-400 text-sm">
                راهکارهای تخصصی مسیریابی برای این صنعت
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}