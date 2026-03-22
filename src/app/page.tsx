import { ConversionStrip } from "@/components/sections/conversion-strip";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ServicesSection } from "@/components/sections/services-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { buildPageMetadata } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Compassionate Behavioral Health Care in Yakima",
  "Valley Health and Counseling offers compassionate addiction treatment, mental health counseling, and recovery support in Yakima.",
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ConversionStrip />
      <TrustSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
