import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone } from "lucide-react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { heroHighlights, heroStats, siteConfig } from "@/lib/marketing";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(56,178,172,0.14),transparent_34%)]" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(15,76,92,0.08),transparent_65%)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
            Community-based healthcare in Yakima
          </div>

          <div className="space-y-5">
            <h1 className="display-title max-w-[14ch] text-[3.25rem] text-[var(--site-foreground)] sm:text-[4.25rem]">
              Real care for mental health, addiction, and primary care.
            </h1>
            <p className="max-w-[38rem] text-lg leading-8 text-[var(--text-muted)] md:text-xl">
              Valley Health Care helps people get support without extra confusion. Call, book online, or reach out for clear next
              steps from a team that feels grounded and local.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={siteConfig.appointmentHref}
              eventAction="book_appointment_click"
              eventLabel="hero_book_appointment"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-[var(--primary-strong)]"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="hero_call_now"
              data-analytics-event="call_click"
              data-analytics-label="hero_call_now"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-white px-6 py-3 text-base font-semibold text-[var(--primary)] transition duration-200 hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </TrackedPhoneLink>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {heroHighlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white/88 px-4 py-4 shadow-[var(--shadow-soft)]"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <p className="text-sm leading-6 text-[var(--site-foreground)]">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel overflow-hidden rounded-[2rem] p-4 sm:p-5">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-muted)]">
              <Image
                src="/care-team-placeholder.svg"
                alt="Placeholder image of a Valley Health Care clinician speaking with a patient."
                width={1200}
                height={860}
                className="h-auto w-full"
                priority
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-[var(--site-foreground)]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 rounded-[1.5rem] bg-[var(--primary)] px-5 py-5 text-white sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-white/86">
                <MapPin className="h-4 w-4 text-[#9ce2dc]" />
                <span>{siteConfig.locationSummary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/86">
                <Clock3 className="h-4 w-4 text-[#9ce2dc]" />
                <span>{siteConfig.hours[0]?.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
