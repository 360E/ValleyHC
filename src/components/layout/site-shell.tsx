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

  if (isDashboardRoute) {
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
