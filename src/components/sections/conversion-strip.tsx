import Link from "next/link";

export function ConversionStrip() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-gradient-to-r from-[#153e75] to-[#0f8a7a] px-8 py-12 text-white shadow-[0_24px_60px_-28px_rgba(15,47,89,0.85)]">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="max-w-[500px] space-y-4 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">GET STARTED</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get Help Without the Confusion or Delays</h2>
            <p className="text-base leading-7 text-white/85">
              We&apos;ll help you understand your options, verify insurance, and get you connected quickly.
            </p>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Fast intake process</li>
              <li>Insurance guidance available</li>
              <li>Local Yakima care team</li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <Link
              href="tel:+15094521000"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#153e75] shadow-sm transition hover:bg-slate-100"
            >
              Call (509) 452-1000
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request Help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
