import { ArrowRight } from "lucide-react";

import { TrackedLink } from "@/components/TrackedLink";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { servicePreviewItems } from "@/lib/marketing";

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Care options built around clarity, access, and follow-through"
      description="Each service line is designed to be understandable on first read so people can move toward care instead of getting stuck in the intake process."
      contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-5"
    >
      {servicePreviewItems.map((service, index) => {
        const Icon = service.icon;

        return (
          <Card
            key={service.title}
            className={index % 2 === 0 ? "animate-fade-up" : "animate-fade-up animate-delay-150"}
          >
            <CardHeader className="flex h-full flex-col space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
              <TrackedLink
                href={service.href}
                eventAction="service_card_click"
                eventLabel={service.title}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--primary)] transition duration-200 hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </CardHeader>
          </Card>
        );
      })}
    </Section>
  );
}
