import Link from "next/link";

import { footerLinks, siteConfig } from "@/lib/marketing";

import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-5">
          <SiteLogo />
          <p className="max-w-md text-sm leading-6 text-[var(--text-muted)]">
            ValleyHC is a behavioral health marketing site designed for simple outreach, referrals, and future VEHR-connected
            growth without collecting protected health information online.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Quick links</h2>
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

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Contact</h2>
          <div className="space-y-2 text-sm text-[var(--text-muted)]">
            <p>{siteConfig.phoneDisplay}</p>
            <p>{siteConfig.emailDisplay}</p>
            <p>{siteConfig.location}</p>
          </div>
          <p className="text-xs leading-6 text-[var(--text-muted)]">
            Disclaimer: Contact requests should not include protected health information. If you are experiencing a medical or
            mental health emergency, call 911 or go to the nearest emergency department.
          </p>
        </div>
      </div>
    </footer>
  );
}
