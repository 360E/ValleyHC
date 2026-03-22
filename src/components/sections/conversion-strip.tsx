import Link from "next/link";

import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { siteConfig } from "@/lib/marketing";

export function ConversionStrip() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] rounded-2xl border border-white/10 bg-gradient-to-r from-[#153e75] to-[#1a5b76] px-8 py-12 text-white">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="max-w-[500px] space-y-6 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">GET STARTED</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get Help Without the Confusion or Delays</h2>
            <p className="text-base leading-8 text-white/85">
              We&apos;ll help you understand your options, verify insurance, and get you connected quickly.
            </p>
            <ul className="space-y-2 text-base text-white/90">
              <li>Fast intake process</li>
              <li>Insurance guidance available</li>
              <li>Local Yakima care team</li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <TrackedPhoneLink
              href={siteConfig.phoneHref}
              label="call_click"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#153e75] transition-colors hover:bg-slate-100"
            >
              Call {siteConfig.phoneDisplay}
            </TrackedPhoneLink>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
            >
              Request Help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
