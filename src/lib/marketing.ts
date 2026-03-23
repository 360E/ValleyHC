import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BrainCircuit,
  Building2,
  CalendarClock,
  Clock3,
  HandHeart,
  HeartHandshake,
  Landmark,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export type NavigationItem = {
  href: string;
  label: string;
};

export type MarketingCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServicePreview = MarketingCard & {
  href: string;
};

export type ServiceDetail = ServicePreview & {
  id: string;
  slug: string;
  bullets: string[];
  supportPoints: string[];
};

export const siteConfig = {
  name: "Valley Health Care",
  shortName: "Valley Health",
  phoneDisplay: "(509) 452-1000",
  phoneHref: "tel:+15094521000",
  emailDisplay: "onboarding@resend.dev",
  emailHref: "mailto:onboarding@resend.dev",
  location: "Yakima, WA",
  locationSummary: "Serving Yakima and surrounding communities",
  appointmentHref: "/contact",
  hours: [
    { label: "Monday - Thursday", value: "8:00 AM - 6:00 PM" },
    { label: "Friday", value: "8:00 AM - 4:00 PM" },
    { label: "Weekend", value: "Call for scheduling support" },
  ],
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks: NavigationItem[] = [
  ...navigationItems,
  { href: "/referrals", label: "Referrals" },
  { href: "/insurance", label: "Insurance" },
];

export const heroHighlights = [
  "Mental health, addiction treatment, primary care, and medication support in one place",
  "Medicaid accepted with clear next-step guidance before the first visit",
  "Community-based care that feels grounded, direct, and easy to access",
  "Mobile-first contact flow built for calls, bookings, and referrals",
];

export const heroStats = [
  { label: "Care lines", value: "5" },
  { label: "Focus", value: "Yakima, WA" },
  { label: "Access", value: "Call or book online" },
];

export const servicePreviewItems: ServicePreview[] = [
  {
    title: "Mental Health Services",
    description: "Support for anxiety, depression, trauma, stress, and life transitions through practical, relationship-based care.",
    icon: BrainCircuit,
    href: "/services/mental-health-services",
  },
  {
    title: "Addiction Treatment",
    description: "Outpatient counseling and recovery support for substance use disorders with clear treatment planning.",
    icon: ShieldCheck,
    href: "/services/addiction-treatment",
  },
  {
    title: "Primary Care",
    description: "Everyday health support coordinated alongside behavioral health needs when whole-person care matters most.",
    icon: Stethoscope,
    href: "/services/primary-care",
  },
  {
    title: "Case Management",
    description: "Hands-on coordination that helps patients navigate referrals, community resources, and care logistics.",
    icon: Users,
    href: "/services/case-management",
  },
  {
    title: "Medication Management",
    description: "Psychiatric medication follow-up designed to work alongside therapy, recovery goals, and primary care.",
    icon: Pill,
    href: "/services/medication-management",
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: "mental-health-services",
    slug: "mental-health-services",
    title: "Mental Health Services",
    description: "Counseling and ongoing support for people working through depression, anxiety, trauma, grief, and daily stress.",
    icon: BrainCircuit,
    href: "/contact",
    bullets: [
      "Individual counseling with clear treatment goals",
      "Trauma-informed support that respects pace and trust",
      "Care planning focused on stability, coping, and follow-through",
    ],
    supportPoints: [
      "Plain-language intake conversations that explain what happens next",
      "Flexible coordination with families and referral partners when appropriate",
      "Support that feels clinical and caring without being hard to navigate",
    ],
  },
  {
    id: "addiction-treatment",
    slug: "addiction-treatment",
    title: "Addiction Treatment",
    description: "Substance use disorder counseling and recovery support built around accountability, dignity, and realistic next steps.",
    icon: ShieldCheck,
    href: "/contact",
    bullets: [
      "Outpatient support for alcohol, opioids, stimulants, and other substance use concerns",
      "Relapse prevention planning and recovery-focused counseling",
      "Coordination with outside providers or community supports when needed",
    ],
    supportPoints: [
      "Structured, nonjudgmental care plans built for long-term recovery",
      "Simple first contact for patients, families, and referral partners",
      "Clinical guidance that helps people move forward without extra friction",
    ],
  },
  {
    id: "primary-care",
    slug: "primary-care",
    title: "Primary Care",
    description: "Core medical care that supports overall health and works alongside behavioral health treatment when patients need both.",
    icon: Stethoscope,
    href: "/contact",
    bullets: [
      "Routine medical support with attention to whole-person care",
      "Coordination between physical health needs and mental health treatment",
      "Care planning designed to reduce fragmented follow-up",
    ],
    supportPoints: [
      "A more connected care experience for patients managing multiple needs",
      "Clear communication about appointments, follow-up, and practical next steps",
      "A grounded approach that keeps healthcare easier to understand",
    ],
  },
  {
    id: "case-management",
    slug: "case-management",
    title: "Case Management",
    description: "Support for the practical side of care, including referrals, service coordination, and access planning.",
    icon: HandHeart,
    href: "/contact",
    bullets: [
      "Help navigating referrals, paperwork, and community resources",
      "Care coordination for patients with complex support needs",
      "Follow-through that keeps people connected to the right next step",
    ],
    supportPoints: [
      "Designed for patients who need guidance beyond one appointment",
      "Community-based coordination that respects real-life barriers",
      "Strong fit for families, referral partners, and transitions in care",
    ],
  },
  {
    id: "medication-management",
    slug: "medication-management",
    title: "Psychiatric Medication Management",
    description: "Medication support that fits into a larger treatment plan, with follow-up that stays practical and consistent.",
    icon: Pill,
    href: "/contact",
    bullets: [
      "Psychiatric medication reviews and follow-up appointments",
      "Medication planning coordinated with counseling and overall care goals",
      "Ongoing monitoring that supports stability and informed decisions",
    ],
    supportPoints: [
      "Clear explanations of treatment options and next steps",
      "Built for continuity, not one-off medication visits",
      "Strong fit for patients already engaged in therapy or recovery support",
    ],
  },
];

export const valueProps: MarketingCard[] = [
  {
    title: "Community-based care",
    description: "Local healthcare should feel trustworthy, practical, and close to home for Yakima patients and families.",
    icon: Landmark,
  },
  {
    title: "Whole-person support",
    description: "Mental health, addiction, primary care, and care coordination work better when they feel connected.",
    icon: HeartHandshake,
  },
  {
    title: "Clear access",
    description: "Patients should know how to call, book, and start care without reading through long pages of jargon.",
    icon: Clock3,
  },
  {
    title: "Mobile-first experience",
    description: "The site is designed for one-thumb use so people can take action quickly from their phones.",
    icon: CalendarClock,
  },
];

export const howItWorksSteps: MarketingCard[] = [
  {
    title: "Reach out",
    description: "Call us or send a simple request online. We keep the first step clear and easy to start.",
    icon: HandHeart,
  },
  {
    title: "Talk with us",
    description: "Our team helps identify the right service, answers practical questions, and explains your next step.",
    icon: BadgeCheck,
  },
  {
    title: "Start care",
    description: "You move into care with a plan that feels organized, supportive, and grounded in real follow-through.",
    icon: Building2,
  },
];

export const testimonials = [
  {
    title: "Patient perspective",
    role: "Adult outpatient care",
    quote:
      "The process felt clear from the first phone call. I knew what to expect, and the team treated me like a person instead of a checklist.",
  },
  {
    title: "Family perspective",
    role: "Family support",
    quote:
      "We needed answers quickly, and Valley Health Care made the next step feel manageable. The communication was calm and direct.",
  },
  {
    title: "Referral partner perspective",
    role: "Community provider",
    quote:
      "Their team is easy to reach and practical to work with. Referrals feel coordinated instead of disappearing into a black hole.",
  },
];

export const teamPlaceholders = [
  {
    role: "Therapists and counselors",
    description: "Profiles for licensed counselors, therapists, and recovery-focused clinicians can be added here as launch content is finalized.",
  },
  {
    role: "Primary care and medication support",
    description: "This section can introduce the medical and psychiatric providers supporting primary care and medication management.",
  },
  {
    role: "Care coordination team",
    description: "Add the people who help with referrals, scheduling, and practical next steps so the first contact feels more human.",
  },
];

export const insuranceHighlights = [
  "Medicaid accepted",
  "Plain-language insurance and scheduling guidance",
  "Online forms built for general outreach only, with no PHI requested",
];

export const locationHighlights = [
  "Yakima-based care with a strong community focus",
  "Simple directions and contact options for mobile users",
  "Map placeholder ready for final embed or static map artwork",
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}

export function buildPageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    keywords: [
      "healthcare Yakima",
      "mental health services Yakima",
      "addiction treatment Yakima",
      "primary care Yakima",
      "case management Yakima",
      "psychiatric medication management",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
