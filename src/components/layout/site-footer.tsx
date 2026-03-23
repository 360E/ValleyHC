import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { footerLinks, siteConfig } from "@/lib/marketing";

import { SiteLogo } from "./site-logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(237,246,245,0.92))]">
      <div className="mx-auto max-w-[1100px] px-4 py-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.8fr_1fr]">
          <div className="space-y-6">
            <SiteLogo />
            <p className="max-w-md text-sm leading-6 text-[var(--text-muted)]">
              Community-based healthcare for Yakima patients and families, with support across mental health, addiction treatment,
              primary care, and medication management.
            </p>
            <TrackedLink
              href={siteConfig.appointmentHref}
              eventAction="book_appointment_click"
              eventLabel="footer_book_appointment"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)]"
            >
              Book Appointment
            </TrackedLink>
          </div>

          <div className="space-y-6">
            <h2 className="eyebrow text-xs font-semibold text-[var(--text-muted)]">Navigation</h2>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-[var(--primary)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="eyebrow text-xs font-semibold text-[var(--text-muted)]">Contact</h2>
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              <p>
                <TrackedPhoneLink
                  href={siteConfig.phoneHref}
                  label="footer_call"
                  data-analytics-event="call_click"
                  data-analytics-label="footer_call"
                  className="transition hover:text-[var(--primary)]"
                >
                  {siteConfig.phoneDisplay}
                </TrackedPhoneLink>
              </p>
              <p>
                <a href={siteConfig.emailHref} className="transition hover:text-[var(--primary)]">
                  {siteConfig.emailDisplay}
                </a>
              </p>
              <p>{siteConfig.location}</p>
            </div>
            <p className="max-w-sm text-xs leading-6 text-[var(--text-muted)]">
              Do not include protected health information in online forms. If you are experiencing an emergency, call 911.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-5">
          <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Valley Health Care</p>
            <div className="text-sm text-[var(--text-muted)]">Privacy coming soon</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer as SiteFooter };
