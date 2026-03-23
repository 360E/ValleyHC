import Link from "next/link";
import { ArrowRight, BrainCircuit, Cross, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const services = [
  {
    title: "Mental Health Care",
    text: "Counseling and ongoing support for anxiety, depression, trauma, stress, and life transitions.",
    icon: BrainCircuit,
  },
  {
    title: "Addiction Treatment",
    text: "Structured outpatient support for substance use, relapse prevention, and long-term recovery.",
    icon: ShieldCheck,
  },
  {
    title: "Integrated Medical Support",
    text: "Behavioral health care coordinated with medical needs when treatment requires a broader plan.",
    icon: Cross,
  },
] as const;

export function ServicesSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--accent)]">Services</p>
            <h2 className="display-title text-4xl text-[var(--primary-strong)] md:text-[3.4rem]">
              Thoughtful support across behavioral health and recovery.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] md:text-lg lg:justify-self-end">
            The page should explain care simply and credibly. Patients should understand what you do within seconds, without
            feeling like they landed on a generic startup homepage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)]"
              >
                <div className="space-y-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-[var(--site-foreground)]">{service.title}</h3>
                    <p className="text-base leading-7 text-[var(--text-muted)]">{service.text}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
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
