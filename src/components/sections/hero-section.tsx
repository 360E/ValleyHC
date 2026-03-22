import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { siteConfig } from "@/lib/marketing";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1f2a] to-[#153e75] px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-slate-950/10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[60fr_40fr] lg:items-center">
        <div className="order-1 space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">YAKIMA BEHAVIORAL HEALTH</p>

          <div className="space-y-6">
            <h1 className="max-w-[600px] text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Real Support for Mental Health and Addiction &mdash; When You Need It
            </h1>
            <p className="max-w-[500px] text-base leading-8 text-white/80 md:text-lg">
              Talk to someone who understands. We&rsquo;ll help you take the next step, at your pace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="call_click"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-[#0b1f2a] transition-colors hover:bg-slate-100"
            >
              Call Now
            </TrackedPhoneLink>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/8"
            >
              Start Request
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-white/70">
            <span className="font-medium">Same-week response</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden="true" />
            <span className="font-medium">Confidential</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden="true" />
            <span className="font-medium">Local providers</span>
          </div>
        </div>

        <div className="order-2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[400px]">
            <svg
              viewBox="0 0 420 300"
              aria-hidden="true"
              className="h-auto w-full object-contain opacity-85 [filter:blur(0.2px)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 244L138 92L192 146L226 104L396 244"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M116 244L220 82L292 154L354 244"
                stroke="rgba(181, 233, 229, 0.86)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M194 244L266 120L314 180L350 244"
                stroke="rgba(66, 197, 185, 0.72)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
