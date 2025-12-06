// components/solutions/MallTopSection.tsx
'use client';

interface MallTopSectionProps {
  title: string;
  features: string[];
}

export default function MallTopSection({ title, features }: MallTopSectionProps) {
  const icons = [
    // Icon 1 (Location)
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Icon 2 (Store)
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Icon 3 (Discount)
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 19C9 20.6569 10.3431 22 12 22C13.6569 22 15 20.6569 15 19M9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19M9 19H5C3.89543 19 3 18.1046 3 17V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V17C21 18.1046 20.1046 19 19 19H15M15 19H9" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H15M9 13H15" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // Icon 4 (Restaurant)
    <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15C19.2669 15.3032 19.1338 15.6064 19.0007 15.9095C18.395 17.1965 17.6895 18.4835 16.8841 19.6806C15.175 22.1068 12 22.1068 12 22.1068C12 22.1068 8.825 22.1068 7.1159 19.6806C6.3105 18.4835 5.605 17.1965 4.9993 15.9095C4.8662 15.6064 4.7331 15.3032 4.6 15" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.60001 9.00005C4.73311 8.69685 4.86621 8.39365 4.99931 8.09055C5.60501 6.80355 6.31051 5.51655 7.11591 4.31945C8.82501 1.89325 12 1.89325 12 1.89325C12 1.89325 15.175 1.89325 16.8841 4.31945C17.6895 5.51655 18.395 6.80355 19.0007 8.09055C19.1338 8.39365 19.2669 8.69685 19.4 9.00005" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12H4M20 12H22M12 4V2M12 22V20" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Icon 5 (ATM)
    <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V18" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10H18" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 10H8" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 14H20" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // Icon 6 (Event)
    <svg key="6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2V6" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 2V6" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 10H21" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14H16" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 18H16" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ];

  return (
    <div className="flex flex-col items-center p-0 gap-12 w-full max-w-[1480px] mx-auto">
      {/* Title Section */}
      <div className="flex flex-col justify-center items-center p-0 gap-1 w-full">
        {/* Feature Badge */}
        <div 
          className="box-border flex flex-row justify-end items-start px-4 py-1 gap-6"
          style={{
            width: '68px',
            height: '30px',
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            borderRadius: '8px',
            border: '1px solid rgb(52, 64, 84)'
          }}
        >
          <div 
            className="flex items-center text-right"
            style={{
              width: '36px',
              height: '22px',
              fontFamily: "'Yekan Bakh'",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: '22px',
              color: '#FFFFFF',
            }}
          >
            فروشگاه
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
            fontSize: '30px',
            lineHeight: '57px',
            color: '#FAFAFA',
          }}
        >
          {title}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex  lg:flex-row-reverse items-center p-0 gap-20 w-full">

        {/* Text Container */}
        <div className="flex flex-col justify-center items-start p-0 gap-3 w-full lg:w-[578px]">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="flex flex-col w-full">
              {/* Item Container - تغییر ترتیب: اول آیکون، بعد متن */}
              <div className="flex flex-row-reverse justify-start items-center p-0 gap-3 w-full h-9">
                {/* Icon Container */}
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {icons[index] || icons[0]}
                </div>
                
                {/* Feature Text */}
                <div 
                  className="text-right flex-grow"
                  style={{
                    fontFamily: "'Yekan Bakh'",
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '18px',
                    lineHeight: '36px',
                    color: '#FAFAFA',
                  }}
                >
                  {feature}
                </div>
              </div>
              
              {/* Divider Line */}
              {index < features.length - 1 && index < 5 && (
                <div 
                  className="w-full h-px my-1"
                  style={{
                    border: '1px solid #3F3F46',
                    transform: 'rotate(-180deg)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Image Placeholder */}
        <div 
          className="w-full lg:w-[622px] h-[336px] rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(63, 63, 70, 0.3) 0%, rgba(82, 82, 91, 0.3) 100%)',
          }}
        >
          {/* Placeholder for image */}
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">تصویر نمایشی مال</span>
          </div>
        </div>

      </div>
    </div>
  );
}