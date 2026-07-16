import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedFleet } from "@/components/home/featured-fleet";
import { WhyDriveNow } from "@/components/home/why-drivenow";
import { PromoBanner } from "@/components/home/promo-banner";
import { Testimonials } from "@/components/home/testimonials";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedFleet />
      <WhyDriveNow />
      <PromoBanner />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
