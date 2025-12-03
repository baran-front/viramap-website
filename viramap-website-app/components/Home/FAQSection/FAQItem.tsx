// components/home/FAQSection/FAQItem.tsx
'use client';

import { useState, useEffect } from 'react';

interface FAQItemProps {
  item: {
    id: number;
    question: string;
    answer: string;
    iconType: 'message' | 'bezier' | 'brush' | 'lock' | 'cloud' | 'headphone';
    isOpen: boolean;
  };
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ item, isOpen, onToggle }: FAQItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isOpen);

  // وقتی isOpen از parent تغییر می‌کند، isExpanded را به‌روز کن
  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  // وقتی هاور می‌شود، آیتم را باز کن
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true);
  };

  // وقتی هاور برداشته می‌شود، اگر با کلیک باز نشده بود، ببند
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  // کلیک روی کل باکس
  const handleBoxClick = () => {
    onToggle();
  };

  // کلیک روی فلش - جلوگیری از انتشار رویداد
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از انتشار رویداد به باکس والد
    onToggle();
  };

  const renderIcon = () => {
    const baseIconClasses = "w-8 h-8 flex items-center justify-center flex-none";

    switch (item.iconType) {
      case 'message':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:stroke-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 20H12L14 24L18 16L22 8L24 12H28" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="14" stroke="#A1A1AA" strokeWidth="2" strokeOpacity="0.4"/>
            </svg>
          </div>
        );
      case 'bezier':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:stroke-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 8H24" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 24H24" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 16H28" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="2" fill="#A1A1AA" fillOpacity="0.4"/>
              <circle cx="24" cy="8" r="2" fill="#A1A1AA" fillOpacity="0.4"/>
              <circle cx="8" cy="24" r="2" fill="#A1A1AA" fillOpacity="0.4"/>
              <circle cx="24" cy="24" r="2" fill="#A1A1AA" fillOpacity="0.4"/>
            </svg>
          </div>
        );
      case 'brush':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:stroke-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="#A1A1AA" strokeWidth="2" strokeOpacity="0.4"/>
              <path d="M12 20L16 12L20 20" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 20V24" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'lock':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:fill-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="14" width="16" height="10" rx="2" fill={isExpanded ? "#FB6514" : "#FB6514"} fillOpacity={isExpanded ? 1 : 0.4} className="transition-all duration-300"/>
              <rect x="12" y="6" width="8" height="8" rx="1" fill={isExpanded ? "#FB6514" : "#FB6514"} fillOpacity={isExpanded ? 1 : 0.4} className="transition-all duration-300"/>
              <circle cx="16" cy="19" r="1.5" fill="#FB6514"/>
              <path d="M16 22V19" stroke="#FB6514" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'cloud':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:stroke-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24 20C26.2091 20 28 18.2091 28 16C28 13.7909 26.2091 12 24 12C24 8.68629 21.3137 6 18 6C15.6134 6 13.5596 7.48067 12.5 9.5C10.0147 9.5 8 11.5147 8 14C8 16.2091 9.79086 18 12 18H24Z" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" strokeOpacity={isExpanded ? 1 : 0.4} className="transition-all duration-300"/>
              <path d="M18 20L14 24L18 28" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300"/>
              <path d="M22 20L26 24L22 28" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300"/>
            </svg>
          </div>
        );
      case 'headphone':
        return (
          <div className={`${baseIconClasses} ${isExpanded ? '[&_svg>*]:stroke-[#FB6514]' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10 20V16C10 11.5817 13.5817 8 18 8H22C26.4183 8 30 11.5817 30 16V20" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" strokeLinecap="round" strokeOpacity={isExpanded ? 1 : 0.4} className="transition-all duration-300"/>
              <path d="M2 20V16C2 11.5817 5.58172 8 10 8H14C18.4183 8 22 11.5817 22 16V20" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" strokeLinecap="round" strokeOpacity={isExpanded ? 1 : 0.4} className="transition-all duration-300"/>
              <circle cx="10" cy="20" r="4" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" className="transition-all duration-300"/>
              <circle cx="22" cy="20" r="4" stroke={isExpanded ? "#FB6514" : "#A1A1AA"} strokeWidth="2" className="transition-all duration-300"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container اصلی - کلیک‌پذیر */}
      <div 
        className={`
          relative
          box-border
          flex flex-row justify-center items-start
          p-4 gap-2
          w-full
          ${isExpanded ? 'min-h-[136px]' : 'min-h-[68px]'}
          ${isExpanded ? 'bg-white/10' : 'bg-[#52525B]/10'}
          ${isExpanded 
            ? 'border-t border-l border-r border-transparent' 
            : 'border border-[#3F3F46]'
          }
          ${isExpanded ? 'border-b-0' : ''}
          shadow-[0px_1px_2px_rgba(16,24,40,0.05)]
          backdrop-blur-md
          rounded-2xl
          transition-all duration-300
          ${isHovered ? 'scale-[1.02]' : ''}
        `}
        onClick={handleBoxClick} // کلیک روی کل باکس
      >
        {/* Content */}
        <div className="
          flex flex-col justify-center items-start
          p-0 gap-1
          w-full h-auto
        ">
          {/* Question Row - کاملاً مطابق استایل شما */}
          <div className="
            flex flex-row justify-between items-center
            p-0 gap-3
            w-full h-9
          ">
            {/* Icon - سمت چپ */}
            {renderIcon()}

            {/* Question Text - وسط */}
            <div className="
              flex flex-row justify-end items-center
              p-0 gap-3
              flex-1 h-9
            ">
              <span className="
                font-['Yekan_Bakh']
                font-normal text-[18px] leading-[36px]
                text-right text-[#FAFAFA]
                flex-1
                pr-2
              ">
                {item.question}
              </span>
            </div>

            {/* Arrow Button - سمت راست */}
            <button
              onClick={handleArrowClick} // فقط روی فلش
              className="
                w-6 h-6
                bg-transparent
                border-none
                cursor-pointer
                p-0
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                focus:outline-none
              "
              aria-label={isExpanded ? "بستن پاسخ" : "باز کردن پاسخ"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M6 15L12 9L18 15" 
                      stroke="#A1A1AA" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M6 9L12 15L18 9" 
                      stroke="#A1A1AA" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* Answer - وقتی expanded است */}
          {isExpanded && (
            <div className="
              w-full pt-4
              animate-fadeIn
            ">
              <p className="
                w-full
                font-['Yekan_Bakh']
                font-normal text-[16px] leading-[32px]
                flex items-center text-right
                text-[#E4E4E7]
                pr-2
              ">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;