import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { valueProps } from "@/lib/marketing";

export function WhyChooseUsSection() {
  return (
    <Section
      eyebrow="Why choose us"
      title="Professional care that still feels human"
      description="The design language stays clean and healthcare-credible while the content reinforces speed, trust, and community connection."
      contentClassName="grid gap-6 md:grid-cols-2"
    >
      {valueProps.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className={index % 2 === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
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
