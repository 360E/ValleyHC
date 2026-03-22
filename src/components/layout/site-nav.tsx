"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { navigationItems, siteConfig } from "@/lib/marketing";
import { cn } from "@/lib/utils";

import { SiteLogo } from "./site-logo";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <SiteLogo />

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
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
                      : "text-[var(--text-muted)] hover:bg-white hover:text-[var(--primary)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition hover:border-[var(--primary)] hover:bg-white"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "default" })}>
              Get Help Today
            </Link>
          </div>

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
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[var(--surface-muted)] text-[var(--primary)]"
                        : "text-[var(--site-foreground)] hover:bg-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="grid gap-3 pt-2">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={buttonVariants({ variant: "accent" })}>
                Get Help Today
              </Link>
              <Link
                href={siteConfig.phoneHref}
                onClick={() => setIsMenuOpen(false)}
                className={buttonVariants({ variant: "secondary" })}
              >
                Call {siteConfig.phoneDisplay}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
