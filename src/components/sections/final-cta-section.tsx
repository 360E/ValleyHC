import type { ReactNode } from "react";
import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { buttonVariants } from "@/components/ui/button";

type FinalCtaSectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

function isProtocolHref(href: string) {
  return href.startsWith("tel:") || href.startsWith("mailto:");
}

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ActionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (href.startsWith("tel:")) {
    return (
      <TrackedPhoneLink href={href} label="call_click" className={className}>
        {children}
      </TrackedPhoneLink>
    );
  }

  if (isProtocolHref(href) || isExternalUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target={isExternalUrl(href) ? "_blank" : undefined}
        rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function FinalCtaSection({
  title = "Ready to take the next step toward care?",
  description = "Reach out for a simple intake conversation and clear next steps.",
  primaryHref = "/contact",
  primaryLabel = "Get Help Today",
  secondaryHref = "/referrals",
  secondaryLabel = "Refer a Patient",
}: FinalCtaSectionProps) {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] rounded-2xl border border-[var(--border)] bg-white px-8 py-12 shadow-[var(--shadow-soft)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Start the conversation</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">{title}</h2>
            <p className="max-w-xl text-base leading-8 text-[var(--text-muted)]">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ActionLink href={primaryHref} className={buttonVariants({ variant: "primary", size: "lg" })}>
              {primaryLabel}
            </ActionLink>
            <ActionLink href={secondaryHref} className={buttonVariants({ variant: "secondary", size: "lg" })}>
              {secondaryLabel}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
