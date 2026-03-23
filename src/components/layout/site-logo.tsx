import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  inverted?: boolean;
};

export function SiteLogo({ className, inverted = false }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Valley Health Care home">
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl border",
          inverted ? "border-white/16 bg-white/10" : "border-[var(--border)] bg-white",
        )}
      >
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path
            d="M5 31L18 18L24 24L30 18L43 31"
            fill="none"
            stroke={inverted ? "rgba(255,255,255,0.92)" : "#183b63"}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 31L25 20L34 29"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="hidden sm:block">
        <span
          className={cn(
            "block text-[11px] font-semibold uppercase tracking-[0.26em]",
            inverted ? "text-white/70" : "text-[var(--secondary)]",
          )}
        >
          Yakima, Washington
        </span>
        <span className={cn("block text-sm font-semibold", inverted ? "text-white" : "text-[var(--site-foreground)]")}>
          Valley Health Care
        </span>
      </span>
    </Link>
  );
}
