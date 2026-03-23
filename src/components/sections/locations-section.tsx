import { Clock3, MapPin } from "lucide-react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { locationHighlights, siteConfig } from "@/lib/marketing";

export function LocationsSection() {
  return (
    <Section
      id="locations"
      eyebrow="Locations"
      title="Yakima-centered care with a location section ready for final map content"
      description="This gives patients a fast way to confirm where care happens, when to call, and how to move forward from a phone in one sitting."
      contentClassName="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <Card className="animate-fade-up">
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
            <MapPin className="h-6 w-6" />
          </div>
          <CardTitle>Yakima, WA</CardTitle>
          <CardDescription>
            A local healthcare presence matters. Patients and referral partners should know immediately that this clinic is rooted in
            the Yakima community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3 rounded-2xl bg-[var(--surface-muted)] px-5 py-5">
            {siteConfig.hours.map((hour) => (
              <div key={hour.label} className="flex items-start justify-between gap-4 text-sm">
                <span className="text-[var(--text-muted)]">{hour.label}</span>
                <span className="font-semibold text-[var(--site-foreground)]">{hour.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            {locationHighlights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href="/locations"
              eventAction="cta_click"
              eventLabel="locations_section_view_location_page"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--primary-strong)]"
            >
              View Location Details
            </TrackedLink>
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="locations_section_call"
              data-analytics-event="call_click"
              data-analytics-label="locations_section_call"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] transition duration-200 hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
            >
              Call the Clinic
            </TrackedPhoneLink>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-up animate-delay-150 overflow-hidden p-0">
        <div className="flex h-full min-h-[24rem] flex-col justify-between bg-[linear-gradient(180deg,rgba(15,76,92,0.06),rgba(56,178,172,0.12))] p-8">
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">Map placeholder</p>
            <h3 className="font-display text-[2rem] text-[var(--site-foreground)]">Static map or embed goes here</h3>
            <p className="max-w-lg text-base leading-7 text-[var(--text-muted)]">
              This placeholder keeps the layout production-ready while waiting for final map content, address details, or a preferred
              embedded map approach.
            </p>
          </div>
          <div className="grid gap-4 rounded-[1.5rem] border border-dashed border-[var(--border-strong)] bg-white/80 p-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--surface-muted)] px-5 py-5">
              <p className="text-sm font-semibold text-[var(--primary)]">Primary service area</p>
              <p className="mt-2 text-base text-[var(--site-foreground)]">{siteConfig.locationSummary}</p>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] px-5 py-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                <Clock3 className="h-4 w-4" />
                Office hours
              </div>
              <p className="mt-2 text-base text-[var(--site-foreground)]">{siteConfig.hours[0]?.value}</p>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
