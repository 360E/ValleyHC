"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { navigationItems, siteConfig } from "@/lib/marketing";
import { cn } from "@/lib/utils";

import { SiteLogo } from "./site-logo";

const callHref = siteConfig.phoneHref;
const callLabel = `Call ${siteConfig.phoneDisplay}`;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-4">
          <SiteLogo />

          <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigationItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-[var(--surface-muted)] text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <TrackedLink
              href={siteConfig.appointmentHref}
              eventAction="book_appointment_click"
              eventLabel="header_book_appointment"
              className="hidden min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)] md:inline-flex"
            >
              Book Appointment
            </TrackedLink>
            <TrackedPhoneLink
              href={callHref}
              label="header_call"
              data-analytics-event="call_click"
              data-analytics-label="header_call"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
            >
              <span className="hidden sm:inline">{callLabel}</span>
              <span className="sm:hidden">Call Now</span>
            </TrackedPhoneLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--primary)] lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="animate-fade-up space-y-3 border-t border-[var(--border)] py-4 lg:hidden">
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {navigationItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[var(--surface-muted)] text-[var(--primary)]"
                        : "text-[var(--site-foreground)] hover:bg-[var(--surface-muted)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <TrackedLink
              href={siteConfig.appointmentHref}
              eventAction="book_appointment_click"
              eventLabel="mobile_menu_book_appointment"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)]"
            >
              Book Appointment
            </TrackedLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export { Header as SiteNav };
