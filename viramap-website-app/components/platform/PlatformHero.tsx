// components/platform/PlatformHero.tsx
'use client';

interface BoxItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PlatformHeroProps {
  title: string;
  description: string;
  boxes: BoxItem[];
}

export default function PlatformHero({ 
  title, 
  description,
  boxes 
}: PlatformHeroProps) {
  return (
    <section className="relative w-full flex flex-col items-center px-4 pt-20">
      
      {/* Background Container */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* Ellipse ها */}
        <div className="absolute inset-0">
          {/* Ellipse 50 - نارنجی کوچک */}
          <div
            className="absolute rounded-full transform-gpu"
            style={{
              width: '484px',
              height: '484px',
              left: 'calc(50% - 242px - 495px)',
              top: '64px',
              background: 'rgba(251, 101, 20, 0.12)',
              filter: 'blur(50px)',
              opacity: '0.9'
            }}
          />
          
          {/* Ellipse های اضافی */}
          <div
            className="absolute rounded-full transform-gpu"
            style={{
              width: '600px',
              height: '600px',
              right: '-20%',
              bottom: '-10%',
              background: 'rgba(143, 101, 255, 0.15)',
              filter: 'blur(180px)',
              opacity: '0.7'
            }}
          />
        </div>
      </div>

      {/* Main Content Box */}
      <div 
        className="relative flex flex-col justify-center items-center z-10 transform-gpu"
        style={{
          width: '1480px',
          maxWidth: '90vw',
          height: '372px',
          padding: '80px 0px',
          gap: '24px',
          background: 'rgba(250, 250, 250, 0.1)',
          border: '1px solid #3F3F46',
          borderRadius: '24px',
          boxSizing: 'border-box',
          marginBottom: '40px', // فاصله با باکس‌های پایین
        }}
      >
        
        {/* Title */}
        <div 
          className="morabba-text flex items-center justify-center text-right"
          style={{
            width: '90%',
            height: '92px',
            fontSize: '60px',
            lineHeight: '92px',
            color: '#FAFAFA',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <p 
          className="yekanbakh-text text-center"
          style={{
            width: '720px',
            maxWidth: '90%',
            height: '96px',
            fontSize: '16px',
            lineHeight: '32px',
            color: '#E4E4E7',
          }}
        >
          {description}
        </p>
      </div>

      {/* 4 Boxes Section - در یک ردیف زیر باکس بزرگ */}
      <div className="relative w-full max-w-[1480px] ">
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {boxes.map((box) => (
            <div 
              key={box.id}
              className="box-border flex flex-col items-center p-6 gap-2 w-full sm:w-[45%] lg:w-[23%] h-auto min-h-[212px]"
              style={{
                background: 'rgba(250, 250, 250, 0.1)',
                border: '1px solid #FAFAFA',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-2 w-14 h-14">
                {box.icon}
              </div>

              {/* Title */}
              <div 
                className="text-center mb-1"
                style={{
                  fontFamily: "'Morabba'",
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '32px',
                  color: '#FAFAFA',
                }}
              >
                {box.title}
              </div>

              {/* Description */}
              <div 
                className="text-center"
                style={{
                  fontFamily: "'Yekan Bakh'",
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '19px',
                  color: '#FAFAFA',
                  textAlign: 'center',
                }}
              >
                {box.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}