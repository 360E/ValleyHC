import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/marketing";

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const contactEmail = process.env.CONTACT_EMAIL?.trim();

// Resend setup notes:
// 1. Go to resend.com
// 2. Create an API key
// 3. Verify your sending domain, or use Resend's test sender while setting up
// 4. Add RESEND_API_KEY and CONTACT_EMAIL to Vercel environment variables

function getResendClient() {
  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(resendApiKey);
}

export function getContactEmailAddress() {
  if (!contactEmail) {
    throw new Error("Missing CONTACT_EMAIL environment variable.");
  }

  return contactEmail;
}

export function getSenderAddress() {
  return `${siteConfig.shortName} Website <onboarding@resend.dev>`;
}

export async function sendContactEmail({
  subject,
  lines,
  replyTo,
}: {
  subject: string;
  lines: string[];
  replyTo?: string;
}) {
  const resend = getResendClient();

  return resend.emails.send({
    from: getSenderAddress(),
    to: getContactEmailAddress(),
    replyTo,
    subject,
    text: lines.join("\n"),
  });
}
