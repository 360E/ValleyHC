import Link from "next/link";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, serviceDetails } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "Services",
  "Explore mental health services, addiction treatment, primary care, case management, and psychiatric medication management from Valley Health Care.",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five core care lines designed to feel clear and approachable"
        description="The services page should help patients and referral partners understand what Valley Health Care does in one quick read, then move directly into contact or a service detail page."
        actions={
          <>
            <TrackedLink
              href="/contact"
              eventAction="book_appointment_click"
              eventLabel="services_page_book_appointment"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Book Appointment
            </TrackedLink>
            <Link href="/locations" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              View Location
            </Link>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">Access and fit</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              <li>Use the site to understand the care mix quickly.</li>
              <li>Move to booking, calling, or referrals without extra friction.</li>
              <li>Keep all service descriptions plain, direct, and easy to scan on mobile.</li>
            </ul>
          </div>
        }
      />

      <Section
        eyebrow="Service lines"
        title="What Valley Health Care offers"
        description="Each service card links into a detail page and also keeps the key promise visible right away: clear care, practical support, and a path forward."
        contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {serviceDetails.map((service, index) => {
          const Icon = service.icon;

          return (
            <Card key={service.id} className={index === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={`/services/${service.slug}`}
                  eventAction="service_card_click"
                  eventLabel={`services_page_${service.slug}`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  View Service Details
                </TrackedLink>
              </CardContent>
            </Card>
          );
        })}
      </Section>

      <FinalCtaSection />
    </>
  );
}
