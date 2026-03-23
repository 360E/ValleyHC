import type { ReactNode } from "react";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/marketing";

type FinalCtaSectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ActionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (href.startsWith("tel:")) {
    return (
      <TrackedPhoneLink
        href={href}
        label="final_cta_call"
        data-analytics-event="call_click"
        data-analytics-label="final_cta_call"
        className={className}
      >
        {children}
      </TrackedPhoneLink>
    );
  }

  return (
    <TrackedLink
      href={href}
      eventAction={href === siteConfig.appointmentHref ? "book_appointment_click" : "cta_click"}
      eventLabel={href === siteConfig.appointmentHref ? "final_cta_book_appointment" : `final_cta_${href}`}
      className={className}
      target={isExternalUrl(href) ? "_blank" : undefined}
      rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
    >
      {children}
    </TrackedLink>
  );
}

export function FinalCtaSection({
  title = "You don’t have to figure this out alone.",
  description = "Call the clinic or book an appointment online to get clear next steps from a team that keeps healthcare easier to navigate.",
  primaryHref = siteConfig.appointmentHref,
  primaryLabel = "Book Appointment",
  secondaryHref = siteConfig.phoneHref,
  secondaryLabel = "Call Now",
}: FinalCtaSectionProps) {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(15,76,92,0.98),rgba(44,122,123,0.96))] px-8 py-12 text-white shadow-[var(--shadow-soft)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-white/72">Start the conversation</p>
            <h2 className="display-title text-balance text-4xl text-white md:text-[3.4rem]">{title}</h2>
            <p className="max-w-xl text-base leading-8 text-white/84">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ActionLink href={primaryHref} className={buttonVariants({ variant: "accent", size: "lg" })}>
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
