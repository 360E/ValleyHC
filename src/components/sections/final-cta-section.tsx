import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

type FinalCtaSectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function FinalCtaSection({
  title = "Ready to take the next step toward care?",
  description = "Reach out for a simple intake conversation, benefits guidance, or a referral-friendly handoff.",
  primaryHref = "/contact",
  primaryLabel = "Get Help Today",
  secondaryHref = "/referrals",
  secondaryLabel = "Refer a Patient",
}: FinalCtaSectionProps) {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:pb-20 lg:pt-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(21,62,117,0.98),rgba(15,138,122,0.92))] px-6 py-10 text-white shadow-[0_30px_70px_-40px_rgba(15,47,89,0.95)] md:px-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Start the conversation</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            <p className="max-w-2xl text-base leading-7 text-white/80">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href={primaryHref} className={buttonVariants({ variant: "secondary", size: "lg" })}>
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className={buttonVariants({ variant: "ghost", size: "lg" }) + " border border-white/25 bg-white/8 text-white hover:bg-white/14"}
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
