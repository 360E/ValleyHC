import Image from "next/image";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, teamPlaceholders, valueProps } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "About Valley Health Care",
  "Learn how Valley Health Care approaches mental health, addiction treatment, primary care, and access-focused support in Yakima.",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A healthcare website that feels human, direct, and useful"
        description="Valley Health Care is presented as a local, grounded clinic where people can understand services quickly, reach a real team, and take action from a phone without hunting for answers."
        actions={
          <TrackedLink
            href="/contact"
            eventAction="book_appointment_click"
            eventLabel="about_page_book_appointment"
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            Book Appointment
          </TrackedLink>
        }
        aside={
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">Why this matters</p>
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              Healthcare trust comes from clarity, accessibility, and a tone that feels real. This page supports that by keeping the
              brand story practical and community-centered.
            </p>
          </div>
        }
      />

      <Section
        eyebrow="Mission"
        title="Built around access, dignity, and whole-person support"
        description="The story should feel grounded instead of polished-for-polish’s-sake. Patients, families, and referral partners need confidence that the clinic is organized and genuinely helpful."
        contentClassName="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>What Valley Health Care stands for</CardTitle>
            <CardDescription>
              A local clinic can feel professional without sounding distant. The site positions the practice as calm, trustworthy, and
              easy to navigate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-[var(--text-muted)]">
            {valueProps.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-[var(--site-foreground)]">{item.title}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-150 overflow-hidden p-0">
          <Image
            src="/care-team-placeholder.svg"
            alt="Placeholder image representing Valley Health Care clinicians and patients."
            width={1200}
            height={860}
            className="h-full w-full object-cover"
          />
        </Card>
      </Section>

      <Section
        eyebrow="Team"
        title="Ready for real clinician and staff profiles"
        description="These cards provide the structure for therapist, medical, and care-coordination bios when launch content is finalized."
        contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {teamPlaceholders.map((member, index) => (
          <Card key={member.role} className={index === 1 ? "animate-fade-up animate-delay-150" : "animate-fade-up"}>
            <CardHeader>
              <CardTitle>{member.role}</CardTitle>
              <CardDescription>{member.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Section>

      <FinalCtaSection />
    </>
  );
}
