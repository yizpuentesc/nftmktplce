import { Hero } from '@/components/Hero';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CtaSection } from '@/components/CtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="border-border max-w-content-wide mx-auto" aria-hidden />
      <FeaturesSection />
      <CtaSection />
    </>
  );
}
