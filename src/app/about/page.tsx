import Image from "next/image";
import Link from "next/link";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, teamPlaceholders } from "@/lib/marketing";

export const metadata = buildPageMetadata(
  "About ValleyHC",
  "Learn about Valley Health and Counseling, our mission, and our commitment to whole-person behavioral health care in Yakima.",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A behavioral health partner focused on compassionate, community-centered care"
        description="ValleyHC is designed to feel approachable from the first click, with a modern intake experience that supports patients, families, and referral partners."
        actions={
          <>
            <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Get Help Today
            </Link>
            <Link href="/referrals" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Refer a Patient
            </Link>
          </>
        }
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Mission</p>
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              Deliver accessible behavioral health care that honors dignity, supports recovery, and strengthens the Yakima community.
            </p>
          </div>
        }
      />

      <Section
        eyebrow="Who we are"
        title="A modern clinic story with room to grow"
        description="This production-ready marketing foundation keeps content trustworthy today while remaining flexible for future VEHR-powered intake and engagement."
        contentClassName="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle>Whole-person behavioral health care</CardTitle>
            <CardDescription>
              ValleyHC supports people navigating mental health needs, substance use treatment, and recovery maintenance with a coordinated, compassionate approach.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[var(--text-muted)]">
            <p>Our clinic story centers on removing friction from first contact, supporting families and referral partners, and helping patients feel welcome from day one.</p>
            <p>That means clear expectations, responsive follow-up, and care experiences that feel professional without losing warmth.</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-up animate-delay-150 overflow-hidden">
          <div className="rounded-[1.5rem] bg-brand-mesh p-4">
            <Image
              src="/valleyhc-hero.svg"
              alt="Abstract illustration representing compassionate behavioral health support."
              width={960}
              height={720}
              className="h-auto w-full rounded-[1.25rem]"
            />
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Team"
        title="Team section ready for real clinician profiles"
        description="These placeholders keep the page launch-ready now while making it easy to add bios, credentials, and headshots later."
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

      <FinalCtaSection
        title="Ready to connect with our team?"
        description="Whether you are seeking care or looking to refer, we can help you identify the right next step."
        primaryHref="/contact"
        primaryLabel="Contact ValleyHC"
        secondaryHref="/referrals"
        secondaryLabel="Send a Referral"
      />
    </>
  );
}
