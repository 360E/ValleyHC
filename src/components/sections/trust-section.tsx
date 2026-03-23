import { ShieldCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { testimonials, valueProps } from "@/lib/marketing";

export function TrustSection() {
  return (
    <Section
      eyebrow="Trust"
      title="Professional, community-focused care that feels real"
      description="Healthcare websites work best when they feel useful instead of overdesigned. This section reinforces local credibility, practical support, and real reasons to reach out."
      contentClassName="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]"
    >
      <Card className="animate-fade-up bg-[linear-gradient(180deg,rgba(15,76,92,0.98),rgba(44,122,123,0.96))] text-white">
        <CardHeader className="space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle className="font-display text-[2rem] text-white">Grounded care for Yakima families and providers</CardTitle>
          <CardDescription className="text-white/84">
            Valley Health Care is positioned as a calm first step for people who need support and do not want to navigate a
            confusing system alone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {valueProps.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/82">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Card key={item.title} className={index === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
            <CardHeader>
              <p className="font-display text-5xl leading-none text-[var(--border-strong)]">&ldquo;</p>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-base leading-7 text-[var(--text-muted)]">{item.quote}</CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
