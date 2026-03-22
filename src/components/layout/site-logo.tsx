import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-black text-white shadow-[0_16px_32px_-18px_rgba(21,62,117,0.95)]">
        V
      </span>
      <span className="hidden sm:block">
        <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">ValleyHC</span>
        <span className="block text-sm font-semibold text-[var(--site-foreground)]">Valley Health and Counseling</span>
      </span>
    </Link>
  );
}
