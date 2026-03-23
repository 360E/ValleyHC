import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { howItWorksSteps } from "@/lib/marketing";

export function HowItWorksSection() {
  return (
    <Section
      eyebrow="How it works"
      title="A simple three-step path into care"
      description="The first interaction should feel direct and reassuring. These steps keep the process easy to understand on desktop and mobile."
      contentClassName="grid gap-6 lg:grid-cols-3"
    >
      {howItWorksSteps.map((step, index) => {
        const Icon = step.icon;

        return (
          <Card key={step.title}>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-display text-4xl text-[var(--border-strong)]">0{index + 1}</span>
              </div>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </Section>
  );
}
