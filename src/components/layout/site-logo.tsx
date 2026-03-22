import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  inverted?: boolean;
};

export function SiteLogo({ className, inverted = false }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black",
          inverted ? "bg-white/10 text-white" : "bg-[var(--primary)] text-white",
        )}
      >
        V
      </span>
      <span className="hidden sm:block">
        <span className={cn("block text-xs font-semibold uppercase tracking-[0.28em]", inverted ? "text-white/66" : "text-[var(--accent)]")}>
          ValleyHC
        </span>
        <span className={cn("block text-sm font-semibold", inverted ? "text-white" : "text-[var(--site-foreground)]")}>
          Valley Health and Counseling
        </span>
      </span>
    </Link>
  );
}
