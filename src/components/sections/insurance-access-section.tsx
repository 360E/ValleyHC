import { BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react";

import { TrackedLink } from "@/components/TrackedLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { insuranceHighlights } from "@/lib/marketing";

const accessCards = [
  {
    title: "Medicaid accepted",
    description: "Callouts like this help people self-qualify quickly without reading through policy language.",
    icon: BadgeCheck,
  },
  {
    title: "Clear first-step guidance",
    description: "Patients should know whether to call, book, or ask a question in seconds, especially on mobile.",
    icon: HeartHandshake,
  },
  {
    title: "Safe online outreach",
    description: "Forms stay general and public-web safe, with explicit reminders not to include protected health information.",
    icon: ShieldCheck,
  },
] as const;

export function InsuranceAccessSection() {
  return (
    <Section
      eyebrow="Insurance and access"
      title="Built to reduce friction before the first appointment"
      description="This section keeps practical questions front and center so visitors know Medicaid is accepted and understand how to get support without oversharing online."
      contentClassName="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle>What patients need to know first</CardTitle>
          <CardDescription>
            Keep the message short, clear, and useful. Healthcare trust grows when the site answers practical access questions right
            away.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insuranceHighlights.map((item) => (
            <div key={item} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[var(--site-foreground)]">
              {item}
            </div>
          ))}
          <TrackedLink
            href="/insurance"
            eventAction="cta_click"
            eventLabel="insurance_section_review_access"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] transition duration-200 hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
          >
            Review Insurance Info
          </TrackedLink>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {accessCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className={index === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
