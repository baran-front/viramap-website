// components/solutions/MallLowerSection.tsx
'use client';

interface BenefitItem {
  title: string;
  items: string[];
}

interface MallLowerSectionProps {
  title: string;
  benefits: BenefitItem[];
}

export default function MallLowerSection({ title, benefits }: MallLowerSectionProps) {
  return (
    <div className="flex flex-col items-center p-0 gap-12 w-full max-w-[1480px] mx-auto">
      {/* Title Section */}
      <div className="flex flex-col justify-center items-center p-0 gap-1 w-full">
        {/* Feature Badge */}
        <div 
          className="box-border flex flex-row justify-end items-start px-4 py-1 gap-6"
          style={{
            width: '69px',
            height: '30px',
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            borderRadius: '8px',
          }}
        >
          <div 
            className="flex items-center text-right"
            style={{
              width: '37px',
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

      {/* Benefits Grid */}
      <div className="flex flex-col lg:flex-row items-center p-0 gap-2 w-full">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="box-border flex flex-col items-end p-12 lg:p-6 gap-3 relative w-full lg:w-[352px] h-[308px]"
            style={{
              background: 'rgba(82, 82, 91, 0.1)',
              border: '1px solid #3F3F46',
              borderRadius: '16px',
            }}
          >
            {/* Benefit Title */}
            <div 
              className="text-right w-full"
              style={{
                height: '32px',
                fontFamily: "'Morabba'",
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '32px',
                color: '#FAFAFA',
              }}
            >
              {benefit.title}
            </div>

            {/* Benefit Items */}
            <div className="flex flex-col items-end p-0 w-full">
              {benefit.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col items-end w-full">
                  {/* Item Row */}
                  <div className="flex flex-row justify-end items-center p-0 gap-1.5 w-full h-8 mb-3">
                    {/* Item Text */}
                    <div 
                      className="text-center lg:text-right"
                      style={{
                        fontFamily: "'Yekan Bakh'",
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '32px',
                        color: '#FAFAFA',
                      }}
                    >
                      {item}
                    </div>
                    
                    {/* Orange Dot */}
                    <div 
                      className="w-[18px] h-[18px] rounded-full"
                      style={{
                        background: '#FB6514',
                        border: '3px solid #3F3F46',
                      }}
                    />
                  </div>
                  
                  {/* Vertical Line */}
                  {itemIndex < benefit.items.length - 1 && (
                    <div className="flex justify-center w-[18px] h-12 mb-3">
                      <div 
                        className="w-px h-full"
                        style={{
                          border: '2px solid #3F3F46',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Icon Container */}
            <div 
              className="box-border flex flex-row justify-center items-center p-3 gap-2.5 absolute left-[280px] lg:left-auto lg:right-6 -top-6"
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(250, 250, 250, 0.1)',
                border: '1px solid #FAFAFA',
                backdropFilter: 'blur(12px)',
                borderRadius: '8px',
              }}
            >
              <div 
                className="text-center"
                style={{
                  fontFamily: "'Morabba'",
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '42px',
                  color: '#FAFAFA',
                }}
              >
                {index + 1}
              </div>
            </div>

            {/* Dashed Line */}
            <div 
              className="absolute -right-24 top-1/2 transform -translate-y-1/2 hidden lg:block"
              style={{
                width: '95px',
                height: '0px',
                border: '2px dashed #FAFAFA',
                transform: 'rotate(-180deg)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}