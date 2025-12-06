// components/technologies/TechnologiesSection2.tsx
'use client';

import Image from 'next/image';

interface TechnologiesSection2Props {
  badgeText?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
}

export default function TechnologiesSection2({ 
  badgeText = "تکنولوژی ها",
  title = "تکنولوژی‌های پیشرفته مسیریابی",
  description = "ویرامپ از ترکیبی از تکنولوژی‌های نوین برای ارائه دقیق‌ترین و سریع‌ترین سیستم‌های مسیریابی داخلی استفاده می‌کند.",
  imageSrc = "/images/technologies/tech-diagram.png"
}: TechnologiesSection2Props) {
  return (
    <div className="flex flex-col items-center p-0 gap-12 w-full max-w-[1480px] mx-auto py-20 relative">
      
      {/* Ellipse Backgrounds */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* Ellipse 47 */}
        <div 
          className="absolute rounded-full transform-gpu hidden lg:block"
          style={{
            width: '676px',
            height: '676px',
            left: 'calc(50% - 338px + 694px)',
            top: 'calc(813px - 600px)', // Adjusted position
            background: 'rgba(254, 139, 32, 0.2)',
            filter: 'blur(250px)',
          }}
        />
        
        {/* Ellipse 53 */}
        <div 
          className="absolute rounded-full transform-gpu hidden lg:block"
          style={{
            width: '548px',
            height: '548px',
            left: 'calc(50% - 274px - 536px)',
            top: 'calc(877px - 600px)', // Adjusted position
            background: 'rgba(6, 120, 113, 0.1)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Title Section */}
      <div className="flex flex-col justify-center items-center p-0 gap-1 w-full relative z-10">
        {/* Feature Badge */}
        <div 
          className="box-border flex flex-row justify-end items-start px-4 py-1 gap-6"
          style={{
            width: '120px',
            height: '30px',
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            borderRadius: '8px',
            border:'1px solid #3F3F46'
          }}
        >
          <div 
            className="flex items-center text-right"
            style={{
              width: '100px',
              height: '22px',
              fontFamily: "'Yekan Bakh'",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: '22px',
              color: '#FFFFFF',
            }}
          >
            {badgeText}
          </div>
        </div>

        {/* Main Title */}
        <div 
          className="flex items-center justify-center text-center w-full"
          style={{
            height: '57px',
            fontFamily: "'Morabba'",
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '32px',
            lineHeight: '57px',
            color: '#FAFAFA',
          }}
        >
          {title}
        </div>

        {/* Description - محدود شده */}
        <div 
          className="flex justify-center items-center w-full max-w-[600px] px-4"
          style={{
            fontFamily: "'Yekan Bakh'",
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '32px',
            color: '#E4E4E7',
            textAlign: 'justify',
            textAlignLast: 'right',
            direction: 'rtl',
            minHeight: '96px',
          }}
        >
          <div className="text-justify text-right leading-8 rtl max-w-[600px]">
            {description}
          </div>
        </div>
      </div>

      {/* Image Section - کوچک‌تر و مرکز */}
      <div className="w-full flex justify-center relative z-10">
        <div className="relative flex justify-center items-center w-full max-w-[900px]">
          <div className="relative w-full max-w-[700px] h-[350px] rounded-2xl overflow-hidden">
            <Image
              src={imageSrc}
              alt="تکنولوژی‌های ویرامپ"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center';
                placeholder.innerHTML = `
                  <div class="text-center p-4">
                    <div class="text-gray-400 text-lg mb-2">تصویر تکنولوژی‌ها</div>
                    <div class="text-gray-500 text-sm mb-4">فایل تصویر در مسیر مورد نظر یافت نشد</div>
                    <div class="text-gray-600 text-xs">
                      لطفاً فایل تصویر را در مسیر زیر قرار دهید:<br/>
                      <code class="bg-gray-900 px-2 py-1 rounded">public${imageSrc}</code>
                    </div>
                  </div>
                `;
                
                if (target.parentElement) {
                  target.parentElement.appendChild(placeholder);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}