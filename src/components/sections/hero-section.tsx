import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-slate-100/70 to-white px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[60fr_40fr] lg:items-center">
        <div className="order-1 animate-fade-up space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">YAKIMA BEHAVIORAL HEALTH</p>

          <div className="space-y-4">
            <h1 className="max-w-[600px] text-4xl font-semibold leading-tight tracking-tight text-[var(--site-foreground)] md:text-5xl">
              Get Real Help for Mental Health &amp; Addiction — Starting Now
            </h1>
            <p className="max-w-[500px] text-base leading-7 text-[var(--text-muted)] md:text-lg">
              Local care. Fast intake. Confidential support for individuals and families in Yakima.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="tel:+15094521000" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Call Now
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Start Request
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--text-muted)]">
            <span className="font-medium">Same-week response</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="font-medium">Confidential</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="font-medium">Local providers</span>
          </div>
        </div>

        <div className="order-2 flex animate-fade-up animate-delay-150 justify-center lg:justify-end">
          <div className="w-full max-w-[420px]">
            <Image
              src="/valleyhc-hero.svg"
              alt="Mountain logo for Valley Health and Counseling."
              width={840}
              height={840}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
