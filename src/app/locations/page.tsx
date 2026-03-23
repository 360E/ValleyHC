import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, locationHighlights, siteConfig } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Yakima Location",
  "Find Valley Health Care in Yakima, WA and get contact, map, and scheduling information for mobile-first access.",
);

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Yakima, WA"
        description="This page is designed to help mobile visitors confirm where the clinic is, when to call, and how to book an appointment without searching through multiple screens."
        actions={
          <>
            <TrackedLink
              href="/contact"
              eventAction="book_appointment_click"
              eventLabel="locations_page_book_appointment"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Book Appointment
            </TrackedLink>
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="locations_page_call"
              data-analytics-event="call_click"
              data-analytics-label="locations_page_call"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Call Now
            </TrackedPhoneLink>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">At a glance</p>
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              Serving Yakima and surrounding communities with mental health services, addiction treatment, primary care, case
              management, and medication support.
            </p>
          </div>
        }
      />

      <Section contentClassName="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>Clinic details</CardTitle>
            <CardDescription>Keep location information short, visible, and easy to use from a phone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4 rounded-2xl bg-[var(--surface-muted)] px-5 py-5">
              <div>
                <p className="text-sm font-semibold text-[var(--primary)]">Service area</p>
                <p className="mt-1 text-base text-[var(--site-foreground)]">{siteConfig.locationSummary}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--primary)]">Phone</p>
                <TrackedPhoneLink
                  href={siteConfig.phoneHref}
                  label="locations_detail_call"
                  data-analytics-event="call_click"
                  data-analytics-label="locations_detail_call"
                  className="mt-1 inline-block text-base font-semibold text-[var(--site-foreground)]"
                >
                  {siteConfig.phoneDisplay}
                </TrackedPhoneLink>
              </div>
            </div>

            <div className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {locationHighlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="space-y-3 rounded-2xl border border-[var(--border)] px-5 py-5">
              {siteConfig.hours.map((hour) => (
                <div key={hour.label} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-[var(--text-muted)]">{hour.label}</span>
                  <span className="font-semibold text-[var(--site-foreground)]">{hour.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-150 overflow-hidden p-0">
          <div className="flex min-h-[26rem] flex-col justify-between bg-[linear-gradient(180deg,rgba(15,76,92,0.06),rgba(56,178,172,0.12))] p-8">
            <div className="space-y-4">
              <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">Map placeholder</p>
              <h2 className="font-display text-[2rem] text-[var(--site-foreground)]">Ready for final static map or embed</h2>
              <p className="max-w-lg text-base leading-7 text-[var(--text-muted)]">
                This reserved area supports a future embed or branded map graphic while keeping the page layout complete today.
              </p>
            </div>
            <div className="grid gap-4 rounded-[1.5rem] border border-dashed border-[var(--border-strong)] bg-white/84 p-6">
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Suggested final content: map image or embed, parking notes if needed, and any arrival instructions that help reduce
                uncertainty before a visit.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <FinalCtaSection />
    </>
  );
}
