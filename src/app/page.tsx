import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ServicesPreviewSection } from "@/components/sections/services-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
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
      <ServicesPreviewSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
