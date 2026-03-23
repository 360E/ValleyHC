import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { InsuranceAccessSection } from "@/components/sections/insurance-access-section";
import { LocationsSection } from "@/components/sections/locations-section";
import { ServicesSection } from "@/components/sections/services-preview-section";
import { TrustSection } from "@/components/sections/trust-section";
import { buildPageMetadata } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Healthcare That Feels Clear and Local",
  "Valley Health Care offers mental health services, addiction treatment, primary care, case management, and medication support in Yakima.",
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TrustSection />
      <LocationsSection />
      <InsuranceAccessSection />
      <FinalCtaSection />
    </>
  );
}
