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
  MessageSquareHeart,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
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
  bullets: string[];
};

export type ServiceDetail = ServicePreview & {
  id: string;
};

export const siteConfig = {
  name: "Valley Health and Counseling",
  shortName: "ValleyHC",
  phoneDisplay: "(509) 555-0148",
  phoneHref: "tel:+15095550148",
  emailDisplay: "hello@valleyhc.example",
  emailHref: "mailto:hello@valleyhc.example",
  location: "Yakima, WA",
  hours: [
    { label: "Monday - Thursday", value: "8:00 AM - 6:00 PM" },
    { label: "Friday", value: "8:00 AM - 4:00 PM" },
    { label: "Weekend", value: "By referral coordination only" },
  ],
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/referrals", label: "Referrals" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks: NavigationItem[] = [
  ...navigationItems,
  { href: "/insurance", label: "Insurance" },
  { href: "/login", label: "Staff Portal" },
];

export const heroHighlights = [
  "Same-week intake availability when clinically appropriate",
  "Support for addiction, mental health, and recovery stabilization",
  "Referral-friendly coordination for providers and community partners",
];

export const heroStats = [
  { label: "Care Focus", value: "Mental health, SUD, and recovery support" },
  { label: "Access", value: "Fast intake and referral response" },
  { label: "Location", value: "Serving Yakima and surrounding communities" },
];

export const servicePreviewItems: ServicePreview[] = [
  {
    title: "Substance Use Treatment",
    description: "Evidence-based outpatient support for alcohol, opioids, stimulants, and co-occurring conditions.",
    icon: ShieldCheck,
    href: "/services#substance-use-treatment",
    bullets: ["Relapse prevention planning", "Recovery coaching", "Family-support coordination"],
  },
  {
    title: "Mental Health Counseling",
    description: "Compassionate therapy for anxiety, depression, trauma, life transitions, and stress-related needs.",
    icon: BrainCircuit,
    href: "/services#mental-health-counseling",
    bullets: ["Individual therapy", "Trauma-informed care", "Goal-based treatment plans"],
  },
  {
    title: "Intensive Outpatient (IOP)",
    description: "Structured programming that helps patients stabilize, build coping skills, and stay connected to life roles.",
    icon: Users,
    href: "/services#iop-op-programs",
    bullets: ["Flexible scheduling", "Group and individual support", "Step-up or step-down care"],
  },
  {
    title: "Medication Management",
    description: "Medication-assisted support and psychiatric follow-up integrated with therapy and recovery planning.",
    icon: Pill,
    href: "/services#medication-assisted-treatment",
    bullets: ["MAT coordination", "Psychiatric reviews", "Collaborative medication follow-up"],
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: "substance-use-treatment",
    title: "Substance Use Disorder Treatment",
    description: "Personalized outpatient treatment plans that balance clinical structure with real-life recovery needs.",
    icon: ShieldCheck,
    href: "/contact",
    bullets: [
      "Assessment and treatment planning",
      "Relapse prevention and recovery skill-building",
      "Coordination with probation, courts, and community supports when appropriate",
    ],
  },
  {
    id: "mental-health-counseling",
    title: "Mental Health Counseling",
    description: "Therapy services designed to support emotional stability, coping, and long-term wellbeing.",
    icon: MessageSquareHeart,
    href: "/contact",
    bullets: [
      "Support for depression, anxiety, grief, and trauma",
      "Strength-based and solution-focused counseling",
      "Care plans tailored to patient goals and pace",
    ],
  },
  {
    id: "iop-op-programs",
    title: "IOP / OP Programs",
    description: "Flexible levels of care that help patients build momentum while maintaining work, school, and family commitments.",
    icon: CalendarClock,
    href: "/contact",
    bullets: [
      "Structured groups with accountable clinical follow-up",
      "Coordination for step-down or step-up care transitions",
      "Supportive scheduling for continuity of treatment",
    ],
  },
  {
    id: "medication-assisted-treatment",
    title: "Medication-Assisted Treatment",
    description: "Integrated medication support coordinated with counseling, recovery planning, and ongoing clinical review.",
    icon: Syringe,
    href: "/contact",
    bullets: [
      "Medication monitoring and adherence support",
      "Collaborative planning with therapy and medical care",
      "Safety-focused follow-up for stabilization and recovery",
    ],
  },
];

export const valueProps: MarketingCard[] = [
  {
    title: "Experienced clinicians",
    description: "Our team pairs behavioral health expertise with compassionate, relationship-centered care.",
    icon: Stethoscope,
  },
  {
    title: "Whole-person care",
    description: "Treatment plans consider mental health, substance use, recovery goals, and community support systems.",
    icon: HeartHandshake,
  },
  {
    title: "Fast intake",
    description: "We prioritize prompt screening and clear next steps so patients can begin treatment sooner.",
    icon: Clock3,
  },
  {
    title: "Community-focused",
    description: "ValleyHC works closely with local providers, employers, and referral partners across Yakima Valley.",
    icon: Landmark,
  },
];

export const howItWorksSteps: MarketingCard[] = [
  {
    title: "Contact us",
    description: "Reach out directly or submit a simple request form so our team can connect with you quickly.",
    icon: HandHeart,
  },
  {
    title: "Assessment",
    description: "We review needs, level of care, and scheduling to match each patient with the right starting point.",
    icon: BadgeCheck,
  },
  {
    title: "Start treatment",
    description: "Patients begin care with a clear plan, supportive communication, and coordinated next steps.",
    icon: Building2,
  },
];

export const testimonialPlaceholders = [
  {
    title: "Patient story placeholder",
    quote:
      "Replace this card with an approved testimonial or recovery story once marketing approvals and consent workflows are in place.",
  },
  {
    title: "Referral partner placeholder",
    quote:
      "Use this space for provider feedback about referral responsiveness, communication, and continuity of care.",
  },
  {
    title: "Family support placeholder",
    quote:
      "Add an approved quote about compassionate care, trust, and whole-person support when ready for launch content.",
  },
];

export const teamPlaceholders = [
  {
    role: "Clinical Leadership",
    description: "Add the clinic director or lead therapist profile here with credentials, focus areas, and approach to care.",
  },
  {
    role: "Therapy Team",
    description: "Introduce counselors and behavioral health specialists with short bios once recruiting and approvals are complete.",
  },
  {
    role: "Care Coordination",
    description: "Highlight the intake or referral coordination team to reinforce a clear, responsive first-touch experience.",
  },
];

export const insuranceHighlights = [
  "We accept most major insurance plans",
  "Benefits verification support before the first appointment",
  "Clear next steps if prior authorization or referral paperwork is needed",
];

export function buildPageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    keywords: [
      "behavioral health",
      "mental health counseling",
      "substance use treatment",
      "Yakima behavioral health",
      "recovery support",
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
