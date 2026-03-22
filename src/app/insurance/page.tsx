import Link from "next/link";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, insuranceHighlights } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Insurance and Benefits",
  "Review insurance guidance and benefits verification support for behavioral health services at ValleyHC.",
);

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance"
        title="Insurance guidance that helps patients start care with confidence"
        description="ValleyHC keeps benefits conversations straightforward so patients and referral partners know what to expect before the first appointment."
        actions={
          <>
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Verify Benefits
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              View Services
            </Link>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Coverage support</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {insuranceHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        }
      />

      <Section
        eyebrow="Benefits"
        title="We accept most major insurance"
        description="Coverage and authorization requirements vary, so we encourage a quick benefits check before scheduling."
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>Plans we commonly support</CardTitle>
            <CardDescription>Examples for launch messaging while payer-specific details are finalized.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            <p>Commercial employer plans</p>
            <p>Managed Medicaid options</p>
            <p>Behavioral health carve-outs and delegated networks</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-150">
          <CardHeader>
            <CardTitle>How verification works</CardTitle>
            <CardDescription>We confirm basic eligibility and help clarify referrals or prior authorization when needed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            <p>Submit a simple contact request with your preferred callback details.</p>
            <p>Our team follows up to review benefits, scheduling, and the next administrative step.</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-300">
          <CardHeader>
            <CardTitle>Need help now?</CardTitle>
            <CardDescription>We can walk through service fit, referral needs, and benefit questions directly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-[var(--text-muted)]">
            <p>Use the contact request page for a quick, non-sensitive benefits conversation.</p>
            <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
              Request a callback
            </Link>
          </CardContent>
        </Card>
      </Section>

      <FinalCtaSection
        title="Ready to confirm coverage or next steps?"
        description="Reach out for a quick insurance conversation or connect with our team about available services."
        primaryHref="/contact"
        primaryLabel="Verify Benefits"
        secondaryHref="/referrals"
        secondaryLabel="Refer a Patient"
      />
    </>
  );
}
