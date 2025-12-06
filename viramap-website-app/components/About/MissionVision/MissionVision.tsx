'use client';

/**
 * MissionVision Component - Explains why indoor mapping is important
 * Displays an image on the RIGHT and text content on the LEFT
 */
export default function MissionVision() {
  return (
    <div className="flex flex-row justify-between items-center w-[1280px] h-[480px] mx-auto my-0 gap-20">
      
      {/* Left Side: Text Content Container */}
      <div className="flex flex-col justify-center items-start w-[616px] h-[241px] flex-none order-0 gap-6">
        
        {/* Title Section */}
        <div className="flex flex-col items-start w-full gap-1">
          <h2 className="w-full font-morabba font-medium text-3xl leading-[57px] text-white text-right m-0">
            چرا باید از ایندور مپ استفاده کنیم؟
          </h2>
        </div>
        
        {/* Description Text */}
        <p className="w-full font-yekanbakh font-normal text-base leading-8 text-gray-300 text-right">
          نقشه‌های خارجی توانایی پوشش فضای داخلی ساختمان‌ها، به ویژه مکان‌های چندطبقه یا پیچیده را ندارند؛ اما ایندور مپ با بهره‌گیری از تکنولوژی‌های مختلف (مثل وای‌فای، بلوتوث، یا بیکن‌ها)، موقعیت دقیق کاربران را در محیط‌های داخلی مشخص می‌کند و آن‌ها را به مقصد هدایت می‌کند.
          ایندور مپ‌ها مزیت‌های ویژه‌ای دارند، از جمله کمک به کاربران برای پیدا کردن سریع‌تر مکان‌ها، کاهش نیاز به راهنمایی حضوری، و دسترسی به اطلاعات کاربردی درباره‌ی امکانات و خدمات داخلی که در دسترس آن‌هاست.
        </p>
        
      </div>

       {/* Right Side: Image Container */}
      <div className="relative w-[480px] h-[480px] flex-none order-1">
        <div className="relative w-full h-full">
          {/* فقط تصویر با سایه - بدون بلور پشت */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/About/about1.png)',
              filter: 'drop-shadow(10px 15px 20px rgba(248, 248, 248, 0.24))',
            }}
          />
        </div>
      </div>
    </div>
  );
}