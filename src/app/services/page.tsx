import Link from "next/link";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, serviceDetails } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Behavioral Health Services",
  "Explore substance use treatment, mental health counseling, intensive outpatient care, and medication support from ValleyHC.",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Behavioral health services built around recovery, stability, and access"
        description="ValleyHC combines evidence-based treatment with compassionate support so patients and referral partners always know the next step."
        actions={
          <>
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Get Help Today
            </Link>
            <Link href="/insurance" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Verify Benefits
            </Link>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">What patients can expect</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <li>Care planning based on clinical need, goals, and practical scheduling.</li>
              <li>Clear communication for patients, families, and referral partners.</li>
              <li>Flexible support across mental health, substance use, and recovery stabilization.</li>
            </ul>
          </div>
        }
      />

      <Section
        eyebrow="Care options"
        title="Service lines designed for continuity and whole-person support"
        description="Each program area is built to coordinate care, reduce friction at intake, and help patients stay engaged."
        contentClassName="grid gap-6 lg:grid-cols-2"
      >
        {serviceDetails.map((service, index) => {
          const Icon = service.icon;

          return (
            <Card
              key={service.id}
              id={service.id}
              className={index % 2 === 0 ? "animate-fade-up" : "animate-fade-up animate-delay-150"}
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
                  Request an intake conversation
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </Section>

      <Section
        eyebrow="Support model"
        title="Built for prompt access and coordinated follow-through"
        description="We keep outreach simple so patients and referral sources can move quickly from first contact to the right care plan."
        contentClassName="grid gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Intake that moves quickly</CardTitle>
            <CardDescription>
              The admissions path is designed to reduce friction, clarify eligibility, and keep people connected to care.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            <p>Simple contact requests and referral forms make it easy to start the conversation without collecting sensitive details online.</p>
            <p>Our team can then coordinate directly by phone or secure follow-up for scheduling, level-of-care review, and benefit verification.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Care that stays connected</CardTitle>
            <CardDescription>
              Treatment planning works best when communication stays clear across counseling, medication support, and recovery services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            <p>ValleyHC is structured to support referring providers, patients, and families with predictable updates and next steps.</p>
            <p>That makes the site scalable now while keeping space for future VEHR-connected workflows later.</p>
          </CardContent>
        </Card>
      </Section>

      <FinalCtaSection
        title="Questions about services or fit?"
        description="Our team can help clarify levels of care, scheduling, and next steps before a patient begins treatment."
        primaryHref="/contact"
        primaryLabel="Talk with Admissions"
        secondaryHref="/referrals"
        secondaryLabel="Refer a Patient"
      />
    </>
  );
}
