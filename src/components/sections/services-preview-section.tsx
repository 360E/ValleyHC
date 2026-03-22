import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const services = [
  {
    title: "Mental Health Care",
    text: "Counseling and support for anxiety, depression, and life challenges.",
  },
  {
    title: "Addiction Treatment",
    text: "Structured support for substance use and recovery.",
  },
  {
    title: "Primary Care",
    text: "Integrated care supporting both physical and behavioral health.",
  },
] as const;

export function ServicesSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">SERVICES</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">
            Support for Mental Health, Addiction, and Primary Care
          </h2>
          <p className="text-base leading-7 text-[var(--text-muted)] md:text-lg">
            Simple access to care. Local providers. Clear next steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--site-foreground)]">{service.title}</h3>
                <p className="text-sm leading-6 text-[var(--text-muted)]">{service.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Start Request
          </Link>
          <Link href="/services" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
