// components/solutions/MallLowerSection.tsx
"use client";

interface BenefitItem {
  title: string;
  items: string[];
}

interface MallLowerSectionProps {
  title: string;
  benefits: BenefitItem[];
}

export default function MallLowerSection({
  title,
  benefits,
}: MallLowerSectionProps) {
  // تابع تبدیل اعداد انگلیسی به فارسی
  const toPersianNumber = (num: number): string => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .split("")
      .map((digit) => persianDigits[parseInt(digit)])
      .join("");
  };

  return (
    <>
      <div className="relative flex flex-col items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-[1480px] mx-auto px-5 lg:px-0 mall-lower-section">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div
            className="flex items-center justify-center px-4 py-[6px]"
            style={{
              minWidth: "88px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid #344054",
              fontFamily: "'Yekan Bakh'",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "22px",
              color: "#FFFFFF",
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            راه‌اندازی
          </div>

          <div
            className="text-center text-[20px] lg:text-[30px] leading-[36px] lg:leading-[57px] h-auto lg:h-[57px]"
            style={{
              fontFamily: "'Morabba'",
              fontWeight: 500,
              color: "#FAFAFA",
            }}
          >
            {title}
          </div>
        </div>

        {/* Benefits Grid */}
        <div
          className="relative flex flex-col-reverse lg:flex-row-reverse items-stretch justify-center gap-6 lg:gap-24 w-full"
          style={{ width: "100%", maxWidth: "1480px" }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative box-border flex flex-col items-start gap-4 lg:gap-5 w-full min-h-[280px] lg:min-h-[320px] px-6 py-8 lg:px-9 lg:py-12 lg:w-[calc((1480px-192px)/3)] lg:max-w-[calc((1480px-192px)/3)] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50 hover:border-[#FB6514] cursor-pointer"
              style={{
                border: "1px solid #3F3F46",
                borderRadius: "16px",
                backgroundColor: "rgba(82, 82, 91, 0.1)", // #52525B1A at 10%
                backdropFilter: "blur(12px)",
                flex: "none",
                flexGrow: 0,
              }}
            >
              {/* Step Badge */}
              <div
                className="absolute -top-6 lg:-top-7 right-4 lg:right-6 lg:left-auto flex items-center justify-center transition-all duration-300 ease-in-out group-hover:border-[#FB6514] group-hover:shadow-lg group-hover:shadow-orange-500/50 text-[#FAFAFA] group-hover:text-[#FB6514] w-10 h-10 lg:w-12 lg:h-12 text-[18px] lg:text-[24px] leading-[32px] lg:leading-[42px]"
                style={{
                  border: "1px solid #FAFAFA",
                  borderRadius: "10px",
                  backgroundColor: "rgba(250, 250, 250, 0.1)", // #FAFAFA at 10%
                  backdropFilter: "blur(12px)",
                  fontFamily: "'Morabba'",
                  fontWeight: 500,
                }}
              >
                {toPersianNumber(benefits.length - index)}
              </div>

              {/* Benefit Title */}
              <div
                className="w-full text-right text-[16px] lg:text-[20px] leading-[24px] lg:leading-[32px]"
                style={{
                  fontFamily: "'Morabba'",
                  fontWeight: 600,
                  color: "#FAFAFA",
                }}
              >
                {benefit.title}
              </div>

              {/* Benefit Items */}
              <div className="flex flex-col items-start w-full gap-0.5">
                {benefit.items.map((item, itemIndex) => {
                  const isLast = itemIndex === benefit.items.length - 1;
                  return (
                    <div
                      key={itemIndex}
                      className="flex flex-col items-start w-full"
                    >
                      <div
                        className="flex flex-row justify-start items-center gap-2 w-full h-auto lg:h-10 min-h-[32px] lg:min-h-0"
                        style={{
                          borderRadius: "8px",
                          padding: "4px 8px",
                        }}
                      >
                        <div
                          className="shrink-0 transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-orange-500/50 group-hover:border-[#FB6514] w-4 h-4 lg:w-[18px] lg:h-[18px]"
                          style={{
                            borderRadius: "50%",
                            border: "3px solid #3F3F46",
                            backgroundColor: "#FB6514",
                          }}
                        />

                        <div
                          className="text-left text-[14px] lg:text-[16px] leading-[24px] lg:leading-[32px]"
                          style={{
                            fontFamily: "'Yekan Bakh'",
                            fontWeight: 600,
                            color: "#FAFAFA",
                          }}
                        >
                          {item}
                        </div>
                      </div>

                      {!isLast && (
                        <div className="flex justify-center w-[18px] h-11 mb-2">
                          <div
                            style={{
                              width: "2px",
                              height: "100%",
                              backgroundColor: "#3F3F46",
                              margin: "0 auto",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dashed Arrow to next card */}
              {index < benefits.length - 1 && (
                <div
                  className="hidden lg:flex items-center gap-0 absolute top-1/2 -translate-y-1/2 z-10"
                  style={{
                    right: "-92px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      borderTop: "2px dashed #FAFAFA",
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "7px solid transparent",
                      borderBottom: "7px solid transparent",
                      borderRight: "11px solid #FAFAFA",
                      marginRight: "-1px",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
