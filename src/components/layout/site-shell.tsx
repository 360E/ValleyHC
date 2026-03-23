"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteFooter } from "./site-footer";
import { StickyMobileCTA } from "./sticky-mobile-cta";
import { SiteNav } from "./site-nav";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/set-password") || pathname.startsWith("/analytics");

  if (isDashboardRoute || isAuthRoute) {
    return <main>{children}</main>;
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pb-28 md:pb-0">{children}</main>
      <SiteFooter />
      <StickyMobileCTA />
    </div>
  );
}
