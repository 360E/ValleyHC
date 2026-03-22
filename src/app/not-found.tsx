import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/marketing";

export default function NotFound() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[800px] rounded-2xl border border-[var(--border)] bg-white px-8 py-12 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto max-w-xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Page not found</p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="text-base leading-8 text-[var(--text-muted)] md:text-lg">
            Return to the homepage or contact Valley Health and Counseling for help getting to the right place.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Contact ValleyHC
            </Link>
            <Link href="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Go Home
            </Link>
          </div>

          <p className="text-sm leading-6 text-[var(--text-muted)]">
            Need immediate assistance?{" "}
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="call_click"
              className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-strong)]"
            >
              Call {siteConfig.phoneDisplay}
            </TrackedPhoneLink>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
