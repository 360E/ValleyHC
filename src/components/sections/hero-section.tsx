import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { heroHighlights, heroStats } from "@/lib/marketing";

export function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-8 sm:px-6 lg:pb-12 lg:pt-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up space-y-8">
          <div className="inline-flex items-center rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)] shadow-sm">
            Compassionate, community-based care in Yakima
          </div>

          <div className="space-y-5">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-6xl">
              Compassionate Behavioral Health Care in Yakima
            </h1>
            <p className="text-pretty max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
              Support for addiction treatment, mental health counseling, and recovery-focused care with a modern intake experience
              built for patients, families, and referral partners.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Get Help Today
            </Link>
            <Link href="/referrals" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Refer a Patient
            </Link>
          </div>

          <ul className="grid gap-3 text-sm leading-6 text-[var(--text-muted)] sm:grid-cols-2">
            {heroHighlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up animate-delay-150">
          <div className="surface-panel rounded-[2rem] p-4 sm:p-6">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-brand-mesh p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">ValleyHC</p>
                    <p className="mt-2 text-lg font-semibold text-[var(--site-foreground)]">Whole-person support for recovery and wellbeing</p>
                  </div>
                  <div className="animate-soft-pulse rounded-full bg-white/80 p-3 text-[var(--primary)] shadow-sm">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <Image
                  src="/valleyhc-hero.svg"
                  alt="Abstract illustration of compassionate behavioral health care and support."
                  width={960}
                  height={720}
                  priority
                  className="h-auto w-full rounded-[1.35rem]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-[var(--border)] bg-white/90 p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{stat.label}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--site-foreground)]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
