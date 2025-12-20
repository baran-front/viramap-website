// components/home/CEOQuote/CEOQuote.tsx
"use client";
import "./CEOQuote.css";

const CEOQuote = () => {
  return (
    <section
      className="ceo-quote-section"
      style={{
        position: "relative",
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px",
        fontFamily: "Ravi, system-ui",
        backgroundColor: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Background SVG Pattern - Clear Center */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/CEOQuote/vector.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80%",
          opacity: 0.9,
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)",
        }}
      ></div>

      {/* Background SVG Pattern - Blurred Edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/CEOQuote/vector.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "60%",
          filter: "blur(25px)",
          opacity: 0.4,
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 60%)",
        }}
      ></div>

      {/* Main Quote Box */}
      <div
        className="ceo-quote-box"
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "64px 24px 24px",
          gap: "24px",
          position: "relative",
          width: "846px",
          minHeight: "184px",
          border: "1px solid #3F3F46",
          backdropFilter: "blur(4px)",
          borderRadius: "24px",
          isolation: "isolate",
          zIndex: 10,
        }}
      >
        {/* CEO Info Section (Overlapping at top right) */}
        <div
          className="ceo-info-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: "16px",
            position: "absolute",
            left: "539px",
            top: "-32px",
            zIndex: 3,
          }}
        >
          {/* CEO Image Placeholder */}
          <div
            className="ceo-image"
            style={{
              width: "80px",
              height: "80px",
              border: "2px solid #3F3F46",
              borderRadius: "100px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)",
              backgroundImage: "url('/images/CEOQuote/mr-aslami.jpg')", // ❌ اصلاح شد
              backgroundSize: "cover", // عکس کل div رو بگیره
              backgroundPosition: "center", // وسط عکس
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#E4E4E7",
            }}
          ></div>

          {/* CEO Title */}
          <div
            className="ceo-title"
            style={{
              fontFamily: "'Morabba', 'Ravi', system-ui",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "32px",
              color: "#FAFAFA",
              textAlign: "right",
            }}
          >
            مدیرعامل آروین ویرا
          </div>
        </div>

        {/* Quote Up Icon (Top Left) */}
        <div
          className="quote-icon"
          style={{
            position: "absolute",
            left: "24px",
            width: "48px",
            height: "48px",
            zIndex: 0,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.6069 7.44141C13.8105 7.32179 14.0396 7.38334 14.1587 7.57129C14.2763 7.77511 14.2153 8.00324 14.0259 8.12109C11.186 9.80333 9.06791 11.1519 7.72217 13.374C6.37737 15.5948 5.8807 18.5496 5.80029 23.2432L5.78271 24.2598H16.1802C19.1488 24.2598 21.3572 26.4723 21.3403 29.4346V35.4395C21.3403 38.4072 19.1274 40.6201 16.1597 40.6201H10.1597C7.31 40.6199 4.97998 38.3049 4.97998 35.4395V24.6602C4.97998 18.8713 5.57469 15.5718 6.87744 13.2432C8.16932 10.934 10.232 9.43852 13.6069 7.44141Z"
              fill="#E4E4E7"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
            <path
              opacity="0.4"
              d="M35.2471 7.44141C35.4506 7.32179 35.6798 7.38334 35.7988 7.57129C35.9165 7.77511 35.8554 8.00324 35.666 8.12109C32.8262 9.80332 30.7081 11.1519 29.3623 13.374C28.0175 15.5948 27.5208 18.5496 27.4404 23.2432L27.4229 24.2598H37.8203C40.7889 24.2599 42.9973 26.4724 42.9805 29.4346V35.4395C42.9805 38.4072 40.7675 40.6201 37.7998 40.6201H31.7998C28.9501 40.6199 26.6201 38.3049 26.6201 35.4395V24.6602C26.6201 18.8713 27.2148 15.5718 28.5176 13.2432C29.8095 10.934 31.8721 9.43852 35.2471 7.44141Z"
              fill="#E4E4E7"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Main Quote Text */}
        <div
          className="ceo-quote-text"
          style={{
            width: "654px",
            fontFamily: "'Yekan Bakh', 'Ravi', system-ui",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "32px",
            color: "#E4E4E7",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
            در دنیای امروز، مدیریت کارآمد و هوشمندانه نیاز به ابزارهایی دارد که
            بتوانند تمام جوانب کسب‌وکار را پوشش دهند. با اکسیژن، ما اطمینان
            می‌دهیم که سازمان‌ها با تکیه بر داده‌های دقیق و فرآیندهای یکپارچه،
            بهره‌وری خود را به حداکثر برسانند و مسیر رشد را با سرعت و دقت طی
            کنند.
          </p>
        </div>

        {/* Quote Down Icon (Bottom Right) */}
        <div
          className="quote-icon"
          style={{
            position: "absolute",
            right: "24px",
            width: "48px",
            height: "48px",
            zIndex: 2,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.82 24.7399H41.2C41.04 34.0799 39.2 35.6199 33.46 39.0199C32.8 39.4199 32.58 40.2598 32.98 40.9398C33.38 41.5998 34.22 41.8199 34.9 41.4199C41.66 37.4199 44.02 34.9798 44.02 23.3398V12.5599C44.02 9.13994 41.24 6.37988 37.84 6.37988H31.84C28.32 6.37988 25.66 9.03994 25.66 12.5599V18.5599C25.64 22.0799 28.3 24.7399 31.82 24.7399Z"
              fill="#E4E4E7"
            />
            <path
              opacity="0.4"
              d="M10.1799 24.7399H19.5599C19.3999 34.0799 17.5599 35.6199 11.8199 39.0199C11.1599 39.4199 10.9399 40.2598 11.3399 40.9398C11.7399 41.5998 12.5799 41.8199 13.2599 41.4199C20.0199 37.4199 22.3799 34.9798 22.3799 23.3398V12.5599C22.3799 9.13994 19.5999 6.37988 16.1999 6.37988H10.1999C6.67989 6.37988 4.01989 9.03994 4.01989 12.5599V18.5599C3.99989 22.0799 6.65989 24.7399 10.1799 24.7399Z"
              fill="#E4E4E7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CEOQuote;
