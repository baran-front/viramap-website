// components/home/FAQSection/FAQSection.tsx
'use client';

import { useState } from 'react';
import FAQItem from './FAQItem';
import './FAQSection.css';

interface FAQItemData {
  id: number;
  question: string;
  answer: string;
  iconType: 'message' | 'bezier' | 'brush' | 'lock' | 'cloud' | 'headphone';
  isOpen: boolean;
}

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState<FAQItemData[]>([
    {
      id: 1,
      question: "ویرامپ چگونه به مسیریابی در فضای داخلی کمک می‌کند؟",
      answer: "ویرامپ با استفاده از تکنولوژی مسیریابی هوشمند و نقشه‌های دقیق سه‌بعدی، کاربران را در فضاهای پیچیده راهنمایی می‌کند. سیستم از ترکیب BLE، Wi-Fi RTT و سنسورهای حرکتی برای دقت بالا استفاده می‌نماید.",
      iconType: 'message',
      isOpen: false
    },
    {
      id: 2,
      question: "آیا ویرامپ در ساختمان‌های چندطبقه کار می‌کند؟",
      answer: "بله، ویرامپ به طور خاص برای ساختمان‌های چندطبقه طراحی شده است. این سیستم قادر است تمام طبقات را نقشه‌برداری کرده و مسیرهای بین طبقات را با دقت بالا نمایش دهد.",
      iconType: 'bezier',
      isOpen: false
    },
    {
      id: 3,
      question: "نصب و راه‌اندازی ویرامپ چقدر زمان می‌برد؟",
      answer: "زمان نصب بسته به متراژ و پیچیدگی فضا متفاوت است. برای یک مرکز خرید متوسط حدود 2-3 هفته و برای یک بیمارستان بزرگ 4-6 هفته زمان نیاز است. تیم ما در تمام مراحل همراه شماست.",
      iconType: 'brush',
      isOpen: false
    },
    {
      id: 4,
      question: "سیستم امنیتی ویرامپ چگونه است؟",
      answer: "ویرامپ از الگوریتم‌های رمزنگاری پیشرفته استفاده می‌کند. تمام داده‌ها به صورت رمزگذاری شده ذخیره می‌شوند و دسترسی‌ها به صورت سطح‌بندی شده مدیریت می‌شوند. ما گواهینامه‌های امنیتی بین‌المللی داریم.",
      iconType: 'lock',
      isOpen: false
    },
    {
      id: 5,
      question: "آیا ویرامپ در محیط‌های بدون اینترنت کار می‌کند؟",
      answer: "بله، ویرامپ به صورت آفلاین نیز کار می‌کند. پس از راه‌اندازی اولیه و دانلود نقشه‌ها، کاربران می‌توانند بدون نیاز به اینترنت از سیستم استفاده کنند.",
      iconType: 'cloud',
      isOpen: false
    },
    {
      id: 6,
      question: "پشتیبانی فنی ویرامپ چگونه است؟",
      answer: "ما پشتیبانی 24/7 از طریق تلفن، چت آنلاین و تیکت ارائه می‌دهیم. همچنین برای مشتریان ویژه، پشتیبانی اختصاصی و بازدیدهای دوره‌ای داریم. تیم فنی ما همیشه آماده پاسخگویی است.",
      iconType: 'headphone',
      isOpen: false
    }
  ]);

  const toggleFAQ = (id: number) => {
    setFaqItems(prevItems =>
      prevItems.map(item =>
        item.id === id 
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  return (
    <section className="bg-[#141414] py-20 px-4 sm:px-6 lg:px-8 w-full flex justify-center font-[family-name:Vazirmatn,system-ui]">
      <div className="w-full max-w-[1280px] flex flex-col items-center gap-6">
        {/* Title Container - کاملاً وسط */}
        <div className="w-full flex flex-col items-center gap-1">
          {/* Badge */}
          <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: '5px 16px',
            gap: '24px',
            width: '110px',
            height: '35px',
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            borderRadius: '8px',
            border:'1px solid #344054'
          }}
          >
            <span style={{
            fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '22px',
            color: '#FFFFFF',
            textAlign: 'right'
          }}>
              سوالات متداول
            </span>
          </div>

          {/* Subtitle */}
          <h2 className="
            w-[361px] h-[57px]
            font-['Morabba']
            font-medium text-[30px] leading-[57px]
            text-[#FAFAFA]
            mt-1
            order-1
            flex-grow-0
            text-center
          ">
            سوالات متداول کاربران
          </h2>
        </div>

        {/* FAQ Items Grid - دو ستونه */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {faqItems.slice(0, 3).map(item => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={item.isOpen}
                onToggle={() => toggleFAQ(item.id)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {faqItems.slice(3).map(item => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={item.isOpen}
                onToggle={() => toggleFAQ(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;