import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { ReferralForm } from "@/components/sections/referral-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, siteConfig } from "@/lib/marketing";

const referralSupportPoints = [
  "Simple referral intake designed for community providers, discharge planners, and partner organizations.",
  "Fast follow-up expectations that support smoother transitions into care.",
  "PHI-safe web form that limits submissions to contact details, initials, and non-sensitive notes.",
];

export const metadata = buildPageMetadata(
  "Patient Referrals",
  "Refer a patient to Valley Health Care with a streamlined, non-sensitive web form designed for referral partners.",
);

export default function ReferralsPage() {
  return (
    <>
      <PageHero
        eyebrow="Referrals"
        title="A provider-friendly referral experience for behavioral health and recovery support"
        description="This form is built for safe, simple outreach. Please do not include protected health information or clinical records."
        actions={
          <>
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Contact Admissions
            </Link>
            <TrackedPhoneLink href={siteConfig.phoneHref} label="referrals_page_call" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Call {siteConfig.phoneDisplay}
            </TrackedPhoneLink>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Referral guidance</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {referralSupportPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        }
      />

      <Section contentClassName="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <Card className="animate-fade-up">
            <CardHeader>
              <CardTitle>Why referral partners use ValleyHC</CardTitle>
              <CardDescription>Structured for responsive coordination without making providers navigate unnecessary friction.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <p>We aim to make handoffs clear, respectful, and timely so patients feel supported from the start.</p>
              <p>Use the contact methods here to begin the conversation, then follow up securely for any protected clinical information.</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-up animate-delay-150">
            <CardHeader>
              <CardTitle>Do not include PHI</CardTitle>
              <CardDescription>Only patient initials and general, non-sensitive notes should be entered in the form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <p>Examples of information to avoid: diagnosis details, dates of birth, medication lists, treatment history, and insurance IDs.</p>
              <p>For urgent clinical coordination, call the clinic directly at {siteConfig.phoneDisplay}.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-up animate-delay-300">
          <CardHeader>
            <CardTitle>Referral request form</CardTitle>
            <CardDescription>
              This form submits through a validated website endpoint and is limited to non-sensitive referral details only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReferralForm />
          </CardContent>
        </Card>
      </Section>

      <FinalCtaSection
        title="Need to discuss the referral before submitting?"
        description="We can help you determine fit, intake timing, and the best next step for the patient."
        primaryHref="/contact"
        primaryLabel="Connect with Admissions"
        secondaryHref="/services"
        secondaryLabel="Review Services"
      />
    </>
  );
}
