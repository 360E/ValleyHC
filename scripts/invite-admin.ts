import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const ADMIN_EMAIL = "T.Rapp@valleyhc.org";
const SENDER_EMAIL = "noreply@360-encompass.com";

function readRequiredEnv(
  name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY" | "RESEND_API_KEY" | "SITE_URL" | "SET_PASSWORD_URL",
) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function getSetPasswordUrl() {
  return process.env.SET_PASSWORD_URL?.trim() || new URL("/set-password", readRequiredEnv("SITE_URL")).toString();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function createInviteLink() {
  const supabaseAdmin = createClient(
    readRequiredEnv("SUPABASE_URL"),
    readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const inviteResult = await supabaseAdmin.auth.admin.generateLink({
    type: "invite",
    email: ADMIN_EMAIL,
    options: {
      redirectTo: getSetPasswordUrl(),
    },
  });

  if (inviteResult.error) {
    const shouldFallbackToRecovery = inviteResult.error.message.toLowerCase().includes("already");

    if (!shouldFallbackToRecovery) {
      throw inviteResult.error;
    }

    const recoveryResult = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: ADMIN_EMAIL,
      options: {
        redirectTo: getSetPasswordUrl(),
      },
    });

    if (recoveryResult.error) {
      throw recoveryResult.error;
    }

    const actionLink = recoveryResult.data.properties?.action_link;

    if (!actionLink) {
      throw new Error("Supabase did not return a recovery link.");
    }

    return {
      email: recoveryResult.data.user?.email ?? ADMIN_EMAIL,
      actionLink,
    };
  }

  const actionLink = inviteResult.data.properties?.action_link;

  if (!actionLink) {
    throw new Error("Supabase did not return an invite link.");
  }

  return {
    email: inviteResult.data.user?.email ?? ADMIN_EMAIL,
    actionLink,
  };
}

async function sendInviteEmail(link: string) {
  const resend = new Resend(readRequiredEnv("RESEND_API_KEY"));

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

async function run() {
  const invite = await createInviteLink();
  await sendInviteEmail(invite.actionLink);

  console.log("Admin invited:", invite.email);
}

run().catch((error) => {
  console.error("Admin invite failed:", error);
  process.exit(1);
});
