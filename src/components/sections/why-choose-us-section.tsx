import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { valueProps } from "@/lib/marketing";

export function WhyChooseUsSection() {
  return (
    <Section
      eyebrow="Why choose us"
      title="Professional care with clear next steps"
      description="A calm, local approach to getting connected with the support you need."
      contentClassName="grid gap-6 md:grid-cols-2"
    >
      {valueProps.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </Section>
  );
}
