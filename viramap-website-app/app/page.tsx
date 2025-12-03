// app/page.tsx
import HeroSection from '../components/Home/HeroSection/HeroSection';
import IndoorMap from '../components/Home/IndoorMap/IndoorMap';
import CEOQuote from '../components/Home/CEOQuote/CEOQuote';
import CTASection from '../components/Home/CTASection/CTASection';
import DynamicSlider from '../components/Home/DynamicSlider/DynamicSlider';
import FAQSection from '@/components/Home/FAQSection/FAQSection';
import SolutionsSlider from '@/components/Home/SolutionsSlider/SolutionsSlider';

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Vazirmatn, system-ui' }}>
      <HeroSection />
      <IndoorMap />
      <DynamicSlider />
      <SolutionsSlider />
      <CEOQuote />
      <FAQSection/>
    </div>
  );
}
