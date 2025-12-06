// app/api/solutions-data/route.ts
import { NextRequest, NextResponse } from 'next/server';

// داده فیک برای همه راهکارها
const solutionsData = {
  healthcare: {
    id: 'healthcare',
    title: 'مراکز بهداشتی و درمانی',
    description: 'راهکارهای نوین مسیریابی داخلی برای بیمارستان‌ها، کلینیک‌ها و مراکز درمانی',
    features: [
      'مسیریابی به اتاق‌های مختلف بیمارستان',
      'یافتن نزدیک‌ترین پزشک متخصص',
      'مسیریابی به آزمایشگاه و رادیولوژی',
      'نمایش زمان انتظار در اورژانس'
    ],
    images: []
  },
  airports: {
    id: 'airports',
    title: 'فرودگاه‌ها',
    description: 'سیستم مسیریابی پیشرفته برای فرودگاه‌های بزرگ',
    features: [
      'مسیریابی به گیت‌های پرواز',
      'یافتن خدمات فرودگاهی',
      'مسیریابی به پارکینگ',
      'نمایش زمان تا پرواز'
    ],
    images: []
  },
  exhibitions: {
    id: 'exhibitions',
    title: 'نمایشگاه‌ها',
    description: 'راهکارهای مسیریابی برای نمایشگاه‌های بین‌المللی',
    features: [
      'یافتن غرفه‌های مورد نظر',
      'مسیریابی به سالن‌های مختلف',
      'برنامه‌ریزی مسیر بازدید',
      'اطلاعات غرفه‌داران'
    ],
    images: []
  },
  pilgrimage: {
    id: 'pilgrimage',
    title: 'اماکن زیارتی',
    description: 'سیستم مسیریابی برای اماکن مذهبی و زیارتی',
    features: [
      'مسیریابی به صحن و حرم',
      'یافتن خدمات رفاهی',
      'مسیریابی به سرویس‌های بهداشتی',
      'اطلاعات برنامه‌های مراسم'
    ],
    images: []
  },
  universities: {
    id: 'universities',
    title: 'دانشگاه‌ها و مراکز آموزشی',
    description: 'راهکار مسیریابی برای محیط‌های آموزشی',
    features: [
      'مسیریابی به کلاس‌های درس',
      'یافتن دفاتر اساتید',
      'مسیریابی به کتابخانه و آزمایشگاه',
      'اطلاعات زمان‌بندی کلاس‌ها'
    ],
    images: []
  },
  malls: {
    id: 'malls',
    title: 'مجتمع‌های تجاری و مال‌ها',
    description: 'سیستم مسیریابی و خدمات ویژه برای مراکز خرید',
    features: [
      'مسیریابی به فروشگاه‌های مورد نظر',
      'یافتن نزدیک‌ترین پارکینگ خالی',
      'اطلاعات تخفیف‌های ویژه',
      'مسیریابی به رستوران و فودکورت'
    ],
    images: []
  },
  stadiums: {
    id: 'stadiums',
    title: 'ورزشگاه‌ها و استادیوم‌ها',
    description: 'راهکار مسیریابی برای مکان‌های ورزشی بزرگ',
    features: [
      'مسیریابی به جایگاه‌ها',
      'یافتن نزدیک‌ترین سرویس بهداشتی',
      'مسیریابی به بوفه و رستوران',
      'اطلاعات رویدادهای ورزشی'
    ],
    images: []
  },
  industrial: {
    id: 'industrial',
    title: 'واحد‌های صنعتی و تولیدی',
    description: 'سیستم مسیریابی برای کارخانه‌ها و واحدهای صنعتی',
    features: [
      'مسیریابی به خطوط تولید',
      'یافتن انبارها و مخازن',
      'مسیریابی به اتاق کنترل',
      'اطلاعات ایمنی و تخلیه'
    ],
    images: []
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  if (!category) {
    // برگرداندن همه راهکارها
    return NextResponse.json(Object.values(solutionsData));
  }
  
  const data = solutionsData[category as keyof typeof solutionsData];
  
  if (!data) {
    return NextResponse.json(
      { error: 'راهکار مورد نظر یافت نشد' }, 
      { status: 404 }
    );
  }
  
  return NextResponse.json(data);
}