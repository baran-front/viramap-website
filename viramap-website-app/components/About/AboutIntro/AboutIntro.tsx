'use client';

export default function AboutIntro() {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Background Ellipses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full blur-[250px] opacity-60"
          style={{
            width: 'min(794px, 90vw)',
            height: 'min(794px, 90vw)',
            right: '-30%',
            top: '-30%',
            background: 'rgba(254, 139, 32, 0.06)',
          }}
        />
        <div
          className="absolute rounded-full blur-[250px] opacity-60"
          style={{
            width: 'min(663px, 80vw)',
            height: 'min(663px, 80vw)',
            left: '-25%',
            top: '-15%',
            background: 'rgba(6, 120, 112, 0.08)',
          }}
        />
      </div>
      
      {/* Main Container */}
      <div className="relative w-full max-w-4xl mx-auto my-16 p-6 sm:p-8 md:p-12 lg:p-16 gap-6 z-10 bg-white/10 border border-gray-700 rounded-3xl">
        {/* Title */}
        <h1 className="font-morabba font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-tight sm:leading-snug md:leading-[80px] lg:leading-[92px] text-white text-center">
          ویرا مپ؛ اولین نقشه هوشمند داخلی در ایران
        </h1>
        
        {/* Description */}
        <p className="mt-6 font-yekanbakh font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-gray-300 text-center">
          ویرا مپ، یک راهکار نوین و بومی‌سازی‌شده برای مسیریابی داخلی است که دسترسی آسان و دقیق را در محیط‌های پیچیده‌ای مانند بیمارستان‌ها، مراکز خرید، استادیوم‌ها، و نمایشگاه‌ها فراهم می‌کند. این فناوری با استفاده از تکنولوژی‌های پیشرفته‌ای مانند بلوتوث، وای‌فای و بیکن‌ها، به کاربران امکان می‌دهد موقعیت خود را در فضاهای داخلی با دقت بالا شناسایی کنند و بدون نیاز به راهنمایی حضوری، به مقصد مورد نظر خود برسند. ویرا مپ با توجه به نیازهای متنوع کاربران ایرانی، تجربه‌ای سریع، امن و کارآمد در مسیریابی داخلی را ارائه می‌دهد.
        </p>
      </div>
    </div>
  );
}