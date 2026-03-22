import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { testimonialPlaceholders } from "@/lib/marketing";

export function TestimonialsSection() {
  return (
    <Section
      eyebrow="Stories and trust"
      title="Approved testimonials can be added here"
      description="This space is reserved for patient, family, or referral-partner feedback once final content is available."
      contentClassName="grid gap-6 lg:grid-cols-3"
    >
      {testimonialPlaceholders.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <p className="text-4xl font-semibold leading-none text-[var(--border-strong)]">&ldquo;</p>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>Placeholder</CardDescription>
          </CardHeader>
          <CardContent className="text-base leading-7 text-[var(--text-muted)]">{item.quote}</CardContent>
        </Card>
      ))}
    </Section>
  );
}
