"use client";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { siteConfig } from "@/lib/marketing";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-10px_30px_-20px_rgba(17,24,39,0.35)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3">
        <TrackedPhoneLink
          href={siteConfig.phoneHref}
          label="sticky_mobile_call"
          data-analytics-event="call_click"
          data-analytics-label="sticky_mobile_call"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--primary)] bg-white px-4 py-3 text-sm font-semibold text-[var(--primary)] transition duration-200 hover:bg-[var(--surface-muted)]"
        >
          Call Now
        </TrackedPhoneLink>
        <TrackedLink
          href={siteConfig.appointmentHref}
          eventAction="book_appointment_click"
          eventLabel="sticky_mobile_book"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--primary-strong)]"
        >
          Book Appointment
        </TrackedLink>
      </div>
    </div>
  );
}
