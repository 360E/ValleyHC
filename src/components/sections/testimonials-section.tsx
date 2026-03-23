import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { testimonials } from "@/lib/marketing";

export function TestimonialsSection() {
  return (
    <Section
      eyebrow="Stories and trust"
      title="What people should feel from the first interaction"
      description="These mock testimonials keep the component valid and ready if you decide to reuse it elsewhere."
      contentClassName="grid gap-6 lg:grid-cols-3"
    >
      {testimonials.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <p className="font-display text-5xl leading-none text-[var(--border-strong)]">&ldquo;</p>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.role}</CardDescription>
          </CardHeader>
          <CardContent className="text-base leading-7 text-[var(--text-muted)]">{item.quote}</CardContent>
        </Card>
      ))}
    </Section>
  );
}
