"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur-xl">
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
                      ? "bg-slate-100 text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--primary)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <TrackedPhoneLink
              href={callHref}
              label="call_click"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)]"
            >
              <span className="hidden sm:inline">{callLabel}</span>
              <span className="sm:hidden">Call Now</span>
            </TrackedPhoneLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--primary)] lg:hidden"
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
                        ? "bg-slate-100 text-[var(--primary)]"
                        : "text-[var(--site-foreground)] hover:bg-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export { Header as SiteNav };
