import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/marketing";

// Resend setup notes:
// 1. Go to resend.com
// 2. Create an API key
// 3. Verify your sending domain, or use Resend's test sender while setting up
// 4. Add RESEND_API_KEY and CONTACT_EMAIL to your deployment environment variables

function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim() || "";
}

function getConfiguredContactEmail() {
  return process.env.CONTACT_EMAIL?.trim() || "";
}

export function hasEmailConfiguration() {
  return Boolean(getResendApiKey() && getConfiguredContactEmail());
}

function getResendClient() {
  const resendApiKey = getResendApiKey();

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(resendApiKey);
}

export function getContactEmailAddress() {
  const contactEmail = getConfiguredContactEmail();

  if (!contactEmail) {
    throw new Error("Missing CONTACT_EMAIL environment variable.");
  }

  return contactEmail;
}

export function getSenderAddress() {
  return `${siteConfig.shortName} Website <onboarding@resend.dev>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildEmailHtml({
  intro,
  fields,
}: {
  intro: string;
  fields: Array<{ label: string; value: string }>;
}) {
  const rows = fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding: 10px 12px; border: 1px solid #d7e3ec; font-weight: 600; color: #153e75; vertical-align: top;">${escapeHtml(label)}</td>
          <td style="padding: 10px 12px; border: 1px solid #d7e3ec; color: #0f1728; white-space: pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="background: #f3f7fb; padding: 24px; font-family: Inter, Arial, sans-serif; color: #0f1728;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #d7e3ec; border-radius: 20px; overflow: hidden;">
        <div style="padding: 24px 28px; background: linear-gradient(135deg, #153e75, #0f8a7a); color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px;">${escapeHtml(siteConfig.name)}</h1>
          <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Website form submission</p>
        </div>
        <div style="padding: 24px 28px;">
          <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.6;">${escapeHtml(intro)}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function sendContactEmail({
  subject,
  lines,
  html,
  replyTo,
}: {
  subject: string;
  lines: string[];
  html: string;
  replyTo?: string;
}) {
  const resend = getResendClient();

  return resend.emails.send({
    from: getSenderAddress(),
    to: getContactEmailAddress(),
    replyTo,
    subject,
    text: lines.join("\n"),
    html,
  });
}
