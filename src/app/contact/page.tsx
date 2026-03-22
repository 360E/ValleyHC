import Link from "next/link";

import { ContactForm } from "@/components/sections/contact-form";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, siteConfig } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Contact ValleyHC",
  "Reach Valley Health and Counseling for behavioral health support, referrals, and intake questions in Yakima.",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out for support, scheduling questions, or next-step guidance"
        description="Use the contact request form for simple outreach only. Please do not send protected health information through this website."
        actions={
          <>
            <a href={siteConfig.phoneHref} className={buttonVariants({ variant: "accent", size: "lg" })}>
              Call {siteConfig.phoneDisplay}
            </a>
            <Link href="/referrals" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Refer a Patient
            </Link>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Office hours</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {siteConfig.hours.map((hour) => (
                <li key={hour.label} className="flex items-start justify-between gap-4">
                  <span>{hour.label}</span>
                  <span className="font-medium text-[var(--site-foreground)]">{hour.value}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section contentClassName="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>Contact request</CardTitle>
            <CardDescription>
              This form submits through a validated website endpoint for non-sensitive outreach only. Please do not include protected health information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="animate-fade-up animate-delay-150">
            <CardHeader>
              <CardTitle>Clinic information</CardTitle>
              <CardDescription>Simple, referral-friendly contact details for patients, families, and community partners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-[var(--text-muted)]">
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Phone</p>
                <a href={siteConfig.phoneHref} className="transition hover:text-[var(--primary)]">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Email</p>
                <a href={siteConfig.emailHref} className="transition hover:text-[var(--primary)]">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Location</p>
                <p>{siteConfig.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up animate-delay-300">
            <CardHeader>
              <CardTitle>Before you submit</CardTitle>
              <CardDescription>Keep outreach clear, brief, and safe for a public-facing website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <p>Do not include diagnosis details, dates of birth, insurance IDs, or other protected health information.</p>
              <p>If you are a provider or organization sending a patient referral, please use the dedicated referral page instead.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <FinalCtaSection
        title="Need help verifying fit or benefits?"
        description="Our team can help you understand services, intake flow, and insurance verification before scheduling."
        primaryHref="/insurance"
        primaryLabel="Review Insurance Info"
        secondaryHref="/services"
        secondaryLabel="Explore Services"
      />
    </>
  );
}
