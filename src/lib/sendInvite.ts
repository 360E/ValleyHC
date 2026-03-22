import "server-only";

import { resend } from "./resend.ts";

const ADMIN_EMAIL = "T.Rapp@valleyhc.org";
const SENDER_EMAIL = "noreply@360.encompass.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendInviteEmail(link: string) {
  await resend.emails.send({
    from: SENDER_EMAIL,
    to: ADMIN_EMAIL,
    subject: "Set up your Valley Health CRM access",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f1728;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden;">
          <div style="padding: 24px 28px; background: linear-gradient(135deg, #0b1f2a, #153e75); color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Valley Health CRM Access</h1>
          </div>
          <div style="padding: 24px 28px;">
            <h2 style="margin: 0 0 12px; font-size: 20px;">You're invited</h2>
            <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.6;">
              Click below to set your password and access the CRM.
            </p>
            <p style="margin: 0 0 18px;">
              <a
                href="${escapeHtml(link)}"
                style="display: inline-block; padding: 12px 18px; border-radius: 9999px; background: #153e75; color: #ffffff; text-decoration: none; font-weight: 600;"
              >
                Set Password
              </a>
            </p>
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #475569;">
              If the button does not work, copy and paste this link into your browser:<br />
              ${escapeHtml(link)}
            </p>
          </div>
        </div>
      </div>
    `,
  });
}
