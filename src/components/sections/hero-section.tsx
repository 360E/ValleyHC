import Image from "next/image";
import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { siteConfig } from "@/lib/marketing";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(21,62,117,0.82),rgba(11,31,42,0.98)_58%)] px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,42,0.08),rgba(11,31,42,0.24))]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="max-w-[720px] space-y-5">
          <div className="w-full max-w-[360px]">
            <Image
              src="/valleyhc-full-logo.svg"
              alt="Valley Medical Behavioral Health and Addiction Treatment"
              width={360}
              height={168}
              priority
              className="h-auto w-full object-contain opacity-95"
            />
          </div>

          <p className="text-sm font-medium tracking-[0.18em] text-white/72">
            Counseling • Medical • Addiction Treatment
          </p>

          <h1 className="max-w-[620px] text-4xl font-semibold leading-tight tracking-tight text-white md:text-[3.2rem]">
            Support for mental health and addiction care
          </h1>

          <div className="flex flex-wrap gap-3 pt-1">
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="call_click"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-[#0b1f2a] transition-colors hover:bg-slate-100"
            >
              Call Now
            </TrackedPhoneLink>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/6"
            >
              Start Request
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
