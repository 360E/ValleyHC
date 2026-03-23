import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { ContactForm } from "@/components/sections/contact-form";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, siteConfig } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Contact Valley Health Care",
  "Call or contact Valley Health Care for mental health services, addiction treatment, primary care, case management, and medication support in Yakima.",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book an appointment or call for next-step guidance"
        description="This page is built to convert. People should be able to call now, send a general message, or understand the clinic’s hours and location without extra scrolling."
        actions={
          <>
            <TrackedLink
              href="/contact"
              eventAction="book_appointment_click"
              eventLabel="contact_page_book_appointment"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Book Appointment
            </TrackedLink>
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="contact_page_call"
              data-analytics-event="call_click"
              data-analytics-label="contact_page_call"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Call Now
            </TrackedPhoneLink>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">Office hours</p>
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
              Keep the message general and public-web safe. The form is designed for outreach, not for sending medical history or
              protected health information.
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
              <CardDescription>Simple details for patients, families, and referral partners who need to act quickly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-[var(--text-muted)]">
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Phone</p>
                <TrackedPhoneLink
                  href={siteConfig.phoneHref}
                  label="contact_info_call"
                  data-analytics-event="call_click"
                  data-analytics-label="contact_info_call"
                  className="transition hover:text-[var(--primary)]"
                >
                  {siteConfig.phoneDisplay}
                </TrackedPhoneLink>
              </div>
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Email</p>
                <a href={siteConfig.emailHref} className="transition hover:text-[var(--primary)]">
                  {siteConfig.emailDisplay}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[var(--site-foreground)]">Location</p>
                <p>{siteConfig.locationSummary}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up animate-delay-300">
            <CardHeader>
              <CardTitle>Before you submit</CardTitle>
              <CardDescription>Clear expectations help people feel safe using a healthcare contact form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <p>Do not include diagnosis details, insurance IDs, dates of birth, or other protected health information.</p>
              <p>If you are referring a patient, use the referral page or call the clinic for the fastest coordination path.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
