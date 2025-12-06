// app/platform/page.tsx
'use client';

import { useEffect, useState } from 'react';
import PlatformHero from '@/components/platform/PlatformHero';
import PlatformSection2 from '@/components/platform/PlatformSection2';
import PlatformSection3 from '@/components/platform/PlatformSection3';
import PlatformSection4 from '@/components/platform/PlatformSection4';

export default function PlatformPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const heroBoxes = [
    {
      id: 1,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" fill="#E4E4E7"/>
          <rect x="15" y="15" width="26" height="26" fill="#3F3F46"/>
        </svg>
      ),
      title: "موقعیت‌یابی دقیق",
      description: "دقت بالا در محیط‌های داخلی و خارجی"
    },
    {
      id: 2,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 14L42 28L28 42L14 28L28 14Z" stroke="#E4E4E7" strokeWidth="2"/>
          <path d="M28 28L42 42" stroke="#E4E4E7" strokeWidth="2"/>
          <path d="M14 14L28 28" stroke="#E4E4E7" strokeWidth="2"/>
        </svg>
      ),
      title: "نقشه‌های تعاملی",
      description: "نقشه‌های سه‌بعدی و پویا"
    },
    {
      id: 3,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="20" stroke="#E4E4E7" strokeWidth="2"/>
          <path d="M28 8V28" stroke="#E4E4E7" strokeWidth="2"/>
          <path d="M28 28L48 28" stroke="#E4E4E7" strokeWidth="2"/>
        </svg>
      ),
      title: "ناوبری بلادرنگ",
      description: "هدایت لحظه‌ای به مقصد"
    },
    {
      id: 4,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="40" height="40" stroke="#E4E4E7" strokeWidth="2"/>
          <rect x="18" y="18" width="20" height="20" stroke="#E4E4E7" strokeWidth="2"/>
        </svg>
      ),
      title: "تحلیل داده",
      description: "آنالیز رفت‌وآمد و بهینه‌سازی"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#141414]">
        <div className="text-white text-lg">در حال بارگذاری پلتفرم...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen">
      {/* Hero Section */}
      <div className="pt-32">
        <PlatformHero 
          title="پلتفرم ویرامپ"
          description="سیستم جامع موقعیت‌یابی داخلی برای راهکارهای ناوبری و ردیابی هوشمند"
          boxes={heroBoxes}
        />
      </div>

      {/* Section 2 */}
      <div className="pt-32 py-132 px-4">
        <div className="max-w-[1480px] mx-auto">
          <PlatformSection2 />
        </div>
      </div>

      {/* Section 3 */}
      <div className="py-132 px-4">
        <div className="max-w-[1480px] mx-auto">
          <PlatformSection3 />
        </div>
      </div>

      {/* Section 4 */}
      <div className="pt-16 py-132 px-4 pb-32">
        <div className="max-w-[1480px] mx-auto">
          <PlatformSection4 />
        </div>
      </div>
    </div>
  );
}