// app/api/slider/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const slides = [
    {
      id: 1,
      title: "مسیریابی هوشمند در فضای داخلی",
      description: "با تکنولوژی پیشرفته مسیریابی هوشمند ویرا مپ، کاربران می‌توانند با نقشه داخلی به راحتی در فضاهای بزرگ و پیچیده مانند مراکز خرید، فرودگاه‌ها و دانشگاه‌ها، مسیریابی کند. با استفاده از نقشه‌های دقیق و به‌روز، این اپلیکیشن شما را قدم‌به‌قدم هدایت می‌کند تا سریع‌تر و بدون سردرگمی به مقصد مورد نظر خود برسید.",
      imageUrl: "/images/slider/slide1.jpg",
      order: 1,
      isActive: true
    },
    {
      id: 2,
      title: "نقشه‌برداری سه‌بعدی ساختمان",
      description: "تکنولوژی نقشه‌برداری سه‌بعدی ویرامپ امکان نمایش دقیق تمام طبقات و راهروها را فراهم می‌کند. این سیستم به کاربران کمک می‌کند تا در ساختمان‌های چندطبقه به راحتی مسیریابی کنند.",
      imageUrl: "/images/slider/slide2.jpg",
      order: 2,
      isActive: true
    },
    {
      id: 3,
      title: "هدایت در مراکز درمانی",
      description: "سیستم مسیریابی داخلی ویرامپ در بیمارستان‌ها و مراکز درمانی به بیماران و همراهان کمک می‌کند تا به سرعت بخش‌های مختلف مانند اورژانس، آزمایشگاه و اتاق پزشکان را پیدا کنند.",
      imageUrl: "/images/slider/slide3.jpg",
      order: 3,
      isActive: true
    }
  ];

  // شبیه‌سازی تاخیر شبکه
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json(slides);
}