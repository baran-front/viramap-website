// app/page.tsx
import dynamic from "next/dynamic";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import IndoorMap from "../components/Home/IndoorMap/IndoorMap";

// Dynamic imports برای کاهش حجم bundle اولیه
const DynamicSlider = dynamic(
  () => import("../components/Home/DynamicSlider/DynamicSlider"),
  {
    loading: () => (
      <div className="flex justify-center items-center py-20">
        <div className="text-[#FAFAFA] font-ravi">در حال بارگذاری...</div>
      </div>
    ),
  }
);

const SolutionsSlider = dynamic(
  () => import("@/components/Home/SolutionsSlider/SolutionsSlider"),
  {
    loading: () => (
      <div className="flex justify-center items-center py-20">
        <div className="text-[#FAFAFA] font-ravi">در حال بارگذاری...</div>
      </div>
    ),
  }
);

const CEOQuote = dynamic(() => import("../components/Home/CEOQuote/CEOQuote"), {
  loading: () => null, // بدون loading state برای این کامپوننت
});

const FAQSection = dynamic(
  () => import("@/components/Home/FAQSection/FAQSection"),
  {
    loading: () => (
      <div className="flex justify-center items-center py-12">
        <div className="text-[#FAFAFA] font-ravi">در حال بارگذاری...</div>
      </div>
    ),
    // این کامپوننت client-side است
  }
);

const CTASection = dynamic(
  () => import("../components/Home/CTASection/CTASection"),
  {
    loading: () => null,
  }
);

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <IndoorMap />
      <DynamicSlider />
      <SolutionsSlider />
      <CEOQuote />
      <FAQSection />
      <CTASection />
    </div>
  );
}
