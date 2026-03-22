import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { servicePreviewItems } from "@/lib/marketing";

export function ServicesPreviewSection() {
  return (
    <Section
      eyebrow="Services"
      title="Behavioral health support tailored to what patients need most"
      description="Our public site is organized for quick scanning, stronger lead generation, and cleaner handoffs into future VEHR-connected workflows."
      contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      {servicePreviewItems.map((service, index) => {
        const Icon = service.icon;

        return (
          <Card key={service.title} className={index > 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--accent)]">
                Explore service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </Section>
  );
}
