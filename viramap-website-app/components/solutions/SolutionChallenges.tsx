// components/solutions/SolutionChallenges.tsx
"use client";

interface ChallengeItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SolutionChallengesProps {
  title?: string;
  challenges?: ChallengeItem[];
}

// آیکون‌های پیش‌فرض با اعداد 1 تا 4
const DefaultIcons = {
  challenge1: (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="7.5"
            fill="rgba(250, 250, 250, 0.1)"
            stroke="currentColor"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            alignmentBaseline="middle"
            fill="currentColor"
            fontFamily='"Ravi FaNum", sans-serif'
            fontSize="24"
            fontWeight="600"
          >
            ۱
          </text>
        </svg>
      </div>
    </div>
  ),
  challenge2: (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="7.5"
            fill="rgba(250, 250, 250, 0.1)"
            stroke="currentColor"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            alignmentBaseline="middle"
            fill="currentColor"
            fontFamily='"Ravi FaNum", sans-serif'
            fontSize="24"
            fontWeight="600"
          >
            ۲
          </text>
        </svg>
      </div>
    </div>
  ),
  challenge3: (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="7.5"
            fill="rgba(250, 250, 250, 0.1)"
            stroke="currentColor"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            alignmentBaseline="middle"
            fill="currentColor"
            fontFamily='"Ravi FaNum", sans-serif'
            fontSize="24"
            fontWeight="600"
          >
            ۳
          </text>
        </svg>
      </div>
    </div>
  ),
  challenge4: (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="7.5"
            fill="rgba(250, 250, 250, 0.1)"
            stroke="currentColor"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            alignmentBaseline="middle"
            fill="currentColor"
            fontFamily='"Ravi FaNum", sans-serif'
            fontSize="24"
            fontWeight="600"
          >
            ۴
          </text>
        </svg>
      </div>
    </div>
  ),
};

export default function SolutionChallenges({
  title = "چالش های پیش روی مراجعات در موزه‌ها",
  challenges = [],
}: SolutionChallengesProps) {
  // اگر آرایه چالش‌ها خالی باشد، از داده‌های پیش‌فرض استفاده کن
  const defaultChallenges: ChallengeItem[] = [
    {
      id: 1,
      icon: DefaultIcons.challenge1,
      title: "راهنمایی در فضاهای وسیع و چندبخشی",
      description:
        "یافتن سالن‌ها، گالری‌ها و نمایشگاه‌های مختلف می‌تواند برای بازدیدکنندگان چالش‌برانگیز و خسته کننده باشد.",
    },
    {
      id: 2,
      icon: DefaultIcons.challenge2,
      title: "اطلاعات ناکافی درباره آثار",
      description:
        "بازدیدکنندگان اغلب اطلاعات کافی درباره تاریخچه و ارزش آثار هنری دریافت نمی‌کنند.",
    },
    {
      id: 3,
      icon: DefaultIcons.challenge3,
      title: "مدیریت زمان بازدید",
      description:
        "برنامه‌ریزی برای دیدن آثار مهم در مدت زمان محدود بازدید دشوار است.",
    },
    {
      id: 4,
      icon: DefaultIcons.challenge4,
      title: "سرویس‌های رفاهی نامشخص",
      description:
        "یافتن سرویس بهداشتی، کافه، فروشگاه و امکانات دیگر در موزه‌های بزرگ مشکل است.",
    },
  ];

  const displayChallenges =
    challenges.length > 0 ? challenges : defaultChallenges;

  return (
    <>
      <section className="pt-8 pb-20 px-5 solution-challenges-section">
        <div className="max-w-[1480px] mx-auto solution-challenges-container">
          {/* تایتل اصلی */}
          <div
            className="flex items-center justify-center text-center mb-16"
            style={{
              width: "100%",
              maxWidth: "1480px",
              height: "45px",
              fontFamily: "'Morabba', sans-serif",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "30px",
              lineHeight: "57px",
              color: "#FAFAFA",
            }}
          >
            {title}
          </div>

          {/* Grid باکس‌ها */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
            {displayChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="group flex flex-col items-center p-8 gap-4 w-full max-w-[728px] min-h-[250px] rounded-2xl bg-[rgba(250,250,250,0.1)] border border-[#d8d8d8c5] transition-all duration-300 hover:border-[#FF7A1A] hover:shadow-[0_18px_45px_rgba(255,122,26,0.35)]"
                style={{
                  boxSizing: "border-box",
                  overflow: "visible",
                }}
              >
                {/* ایکون */}
                <div
                  className="flex items-center justify-center mb-2 text-[#FAFAFA] transition-colors duration-300 group-hover:text-[#FF7A1A]"
                  style={{
                    width: "58px",
                    height: "58px",
                  }}
                >
                  {challenge.icon}
                </div>

                {/* عنوان اصلی */}
                <div
                  className="text-center mb-3"
                  style={{
                    width: "100%",
                    height: "32px",
                    fontFamily: "'Morabba', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "32px",
                    color: "#FAFAFA",
                  }}
                >
                  {challenge.title}
                </div>

                {/* توضیحات */}
                <div
                  className="text-center"
                  style={{
                    width: "100%",
                    maxWidth: "648px",
                    height: "80px",
                    fontFamily: "'Yekan Bakh', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "32px",
                    color: "#FAFAFA",
                  }}
                >
                  {challenge.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
