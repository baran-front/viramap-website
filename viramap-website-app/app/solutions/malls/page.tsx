// app/solutions/malls/page.tsx
'use client';

import { useEffect, useState } from 'react';
import SolutionHero from '@/components/solutions/SolutionHero';
import MallTopSection from '@/components/solutions/MallTopSection';
import MallLowerSection from '@/components/solutions/MallLowerSection';

const mallData = {
  title: 'مجتمع‌های تجاری و مال‌ها',
  description: 'مراکز خرید بزرگ با ده‌ها فروشگاه و رستوران، نیازمند سیستم مسیریابی پیشرفته هستند. ویرامپ به مشتریان کمک می‌کند تا فروشگاه‌های مورد نظر خود را سریع‌تر پیدا کنند و از تخفیف‌های ویژه مطلع شوند.',
  features: [
    'مسیریابی به فروشگاه‌های مورد نظر',
    'یافتن نزدیک‌ترین پارکینگ خالی',
    'اطلاعات تخفیف‌های ویژه',
    'مسیریابی به رستوران و فودکورت',
    'یافتن ATM و خدمات بانکی',
    'اطلاعات رویدادهای ویژه مرکز خرید'
  ],
  benefits: [
    {
      title: 'افزایش فروش',
      items: [
        'افزایش مدت زمان ماندگاری مشتری',
        'افزایش فروش فروشگاه‌ها',
        'تجربه خرید بهتر'
      ]
    },
    {
      title: 'مدیریت بهتر',
      items: [
        'کاهش ازدحام و شلوغی',
        'بهینه‌سازی مسیرهای داخلی',
        'مدیریت پارکینگ'
      ]
    },
    {
      title: 'رضایت مشتری',
      items: [
        'کاهش زمان جستجو',
        'دسترسی سریع به خدمات',
        'تجربه خرید لذت‌بخش'
      ]
    }
  ]
};

export default function MallsSolutionPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی لودینگ
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#141414]">
        <div className="text-white text-lg">در حال بارگذاری راهکار مال‌ها...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen">
      {/* Hero Section */}
      <div className="pt-32">
        <SolutionHero 
          title={mallData.title} 
          description={mallData.description} 
        />
      </div>

      {/* Top Section (ویژگی‌های مخصوص مال‌ها) */}
      <div className="py-20 px-4">
        <div className="max-w-[1480px] mx-auto">
          <MallTopSection 
            title="ویژگی‌های مخصوص مراکز خرید"
            features={mallData.features}
          />
        </div>
      </div>

      {/* Lower Section (مزایای مخصوص مال‌ها) */}
      <div className="py-20 px-4">
        <div className="max-w-[1480px] mx-auto">
          <MallLowerSection 
            title="مزایای استفاده در مراکز خرید"
            benefits={mallData.benefits}
          />
        </div>
      </div>
    </div>
  );
}