import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, getServiceBySlug, serviceDetails } from "@/lib/marketing";

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServiceDetailPageProps): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return buildPageMetadata("Service Not Found", "The requested Valley Health Care service page could not be found.");
  }

  return buildPageMetadata(service.title, service.description);
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow="Service detail"
        title={service.title}
        description={service.description}
        actions={
          <TrackedLink
            href="/contact"
            eventAction="book_appointment_click"
            eventLabel={`service_detail_${service.slug}_book`}
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            Book Appointment
          </TrackedLink>
        }
        aside={
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              Service detail pages should support both SEO and conversion by clearly explaining the offering and pointing people back
              to contact.
            </p>
          </div>
        }
      />

      <Section
        eyebrow="What this includes"
        title="Practical support patients can understand quickly"
        description="Each detail page should stay scannable on mobile and avoid long paragraphs that bury the core value."
        contentClassName="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>Included support</CardTitle>
            <CardDescription>Use short bullet points to keep the service promise specific and useful.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {service.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[var(--site-foreground)]">
                {bullet}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-150">
          <CardHeader>
            <CardTitle>Why patients choose this care line</CardTitle>
            <CardDescription>These supporting points reinforce fit, trust, and clarity before someone books or calls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {service.supportPoints.map((point) => (
              <p key={point} className="text-sm leading-7 text-[var(--text-muted)]">
                {point}
              </p>
            ))}
          </CardContent>
        </Card>
      </Section>

      <FinalCtaSection />
    </>
  );
}
