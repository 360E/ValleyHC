import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { testimonialPlaceholders } from "@/lib/marketing";

export function TestimonialsSection() {
  return (
    <Section
      eyebrow="Stories and trust"
      title="Testimonial section ready for approved marketing content"
      description="The layout is production-ready now, while the copy stays transparent until real, approved stories are available."
      contentClassName="grid gap-6 lg:grid-cols-3"
    >
      {testimonialPlaceholders.map((item, index) => (
        <Card key={item.title} className={index === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
          <CardHeader>
            <p className="text-5xl font-semibold leading-none text-[var(--border-strong)]">“</p>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>Placeholder</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-[var(--text-muted)]">{item.quote}</CardContent>
        </Card>
      ))}
    </Section>
  );
}
