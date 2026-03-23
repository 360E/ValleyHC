import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone } from "lucide-react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { heroHighlights, siteConfig } from "@/lib/marketing";

const intakePoints = [
  "Same-week intake when clinically appropriate",
  "Clear next steps for patients, families, and referral partners",
  "Coordinated outpatient behavioral health and recovery support",
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f6faf7_0%,#edf4f0_100%)] px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(24,59,99,0.18),transparent_40%)]" aria-hidden="true" />
      <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(22,129,110,0.14),transparent_65%)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
            Yakima Behavioral Health and Addiction Treatment
          </div>

          <div className="space-y-5">
            <h1 className="display-title max-w-[780px] text-5xl text-[var(--primary-strong)] md:text-[4.4rem]">
              Calm, credible care for mental health, addiction, and recovery.
            </h1>
            <p className="max-w-[650px] text-lg leading-8 text-[var(--text-muted)] md:text-xl">
              Valley Health and Counseling helps people get connected to treatment without confusion, cold handoffs, or
              overwhelming intake steps.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="call_click"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)]"
            >
              <Phone className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </TrackedPhoneLink>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-6 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-slate-50"
            >
              Request an appointment <ArrowRight className="h-4 w-4" />
            </Link>
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

        <div className="surface-panel rounded-[2rem] p-7 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="eyebrow text-xs font-semibold text-[var(--text-muted)]">Why Patients Choose ValleyHC</p>
              <h2 className="display-title text-3xl text-[var(--primary-strong)]">Professional care, presented clearly.</h2>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                This should feel like a trusted medical practice: restrained, confident, and easy to understand.
              </p>
            </div>

            <div className="grid gap-3">
              {intakePoints.map((point, index) => (
                <div key={point} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-sm font-semibold text-[var(--primary)]">
                      0{index + 1}
                    </span>
                    <p className="pt-1 text-base leading-7 text-[var(--site-foreground)]">{point}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[var(--primary)] px-5 py-5 text-white">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-white/86">
                  <MapPin className="h-4 w-4 text-[#8fe1d1]" />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/86">
                  <Clock3 className="h-4 w-4 text-[#8fe1d1]" />
                  <span>{siteConfig.hours[0]?.label}</span>
                </div>
              </div>
              <p className="mt-4 text-xl font-semibold">{siteConfig.hours[0]?.value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
