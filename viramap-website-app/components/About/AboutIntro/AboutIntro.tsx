"use client";

export default function AboutIntro() {
  return (
    <section className="relative w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ellipse های مشابه AboutHero */}
        <div
          className="absolute rounded-full hidden lg:block"
          style={{
            width: "484px",
            height: "484px",
            left: "calc(50% - 484px/2 - 495px)",
            top: "64px",
            background: "rgba(251, 101, 20, 0.1)",
            filter: "blur(50px)",
            opacity: "0.8",
          }}
        />

        <div
          className="absolute rounded-full hidden lg:block"
          style={{
            width: "663px",
            height: "663px",
            left: "calc(50% - 663px/2 - 501.5px)",
            top: "-180px",
            background: "rgba(6, 120, 113, 0.24)",
            filter: "blur(250px)",
            opacity: "0.85",
          }}
        />

        <div
          className="absolute rounded-full hidden lg:block"
          style={{
            width: "511px",
            height: "511px",
            left: "calc(50% - 511px/2 - 599.5px)",
            top: "2912px",
            background: "rgba(6, 120, 113, 0.15)",
            filter: "blur(250px)",
            opacity: "0.7",
          }}
        />

        <div
          className="absolute hidden lg:block"
          style={{
            width: "814px",
            height: "1155px",
            left: "875px",
            top: "-481px",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              width: "794px",
              height: "794px",
              left: "calc(50% - 794px/2 + 572px)",
              top: "-481px",
              background: "rgba(254, 139, 32, 0.2)",
              filter: "blur(250px)",
              opacity: "0.9",
            }}
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
          style={{
            width: "502px",
            height: "502px",
            left: "calc(50% - 502px/2 + 406px)",
            top: "172px",
            background: "rgba(6, 120, 113, 0.24)",
            filter: "blur(250px)",
            opacity: "0.8",
          }}
        />

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
          style={{
            width: "794px",
            height: "794px",
            left: "-30%",
            top: "-30%",
            background: "rgba(254, 139, 32, 0.25)",
            filter: "blur(250px)",
            opacity: "0.8",
          }}
        />

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
          style={{
            width: "663px",
            height: "663px",
            right: "-25%",
            top: "-15%",
            background: "rgba(6, 120, 112, 0.35)",
            filter: "blur(250px)",
            opacity: "0.8",
          }}
        />
      </div>

      {/* Main Box - کاملاً مشابه AboutHero */}
      <div
        className="relative flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 lg:p-20 gap-4 sm:gap-6 z-10"
        style={{
          width: "min(1480px, 90vw)",
          height: "auto",
          minHeight: "504px",
          background: "rgba(250, 250, 250, 0.1)",
          border: "1px solid #3F3F46",
          borderRadius: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <h1
          className="font-morabba font-medium text-white text-center"
          style={{
            width: "min(900px, 100%)",
            height: "auto",
            fontSize: "clamp(28px, 4vw, 60px)",
            lineHeight: "clamp(42px, 5vw, 92px)",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "clamp(20px, 3vw, 100px)",
          }}
        >
          ویرا مپ؛
          <br /> اولین نقشه هوشمند داخلی در ایران
        </h1>

        {/* Description */}
        <p
          className="font-yekanbakh font-normal text-gray-300 text-center"
          style={{
            width: "min(800px, 100%)",
            height: "auto",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: "clamp(24px, 2.5vw, 32px)",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          ویرا مپ، یک راهکار نوین و بومی‌سازی‌شده برای مسیریابی داخلی است که
          دسترسی آسان و دقیق را در محیط‌های پیچیده‌ای مانند بیمارستان‌ها، مراکز
          خرید، استادیوم‌ها، و نمایشگاه‌ها فراهم می‌کند. این فناوری با استفاده
          از تکنولوژی‌های پیشرفته‌ای مانند بلوتوث، وای‌فای و بیکن‌ها، به کاربران
          امکان می‌دهد موقعیت خود را در فضاهای داخلی با دقت بالا شناسایی کنند و
          بدون نیاز به راهنمایی حضوری، به مقصد مورد نظر خود برسند. ویرا مپ با
          توجه به نیازهای متنوع کاربران ایرانی، تجربه‌ای سریع، امن و کارآمد در
          مسیریابی داخلی را ارائه می‌دهد.
        </p>
      </div>
    </section>
  );
}
