"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteFooter } from "./site-footer";
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
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
