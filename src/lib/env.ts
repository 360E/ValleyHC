import "server-only";

function readRequiredEnv(name: "RESEND_API_KEY" | "CONTACT_EMAIL") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export function getResendApiKey() {
  return readRequiredEnv("RESEND_API_KEY");
}

export function getContactEmail() {
  return readRequiredEnv("CONTACT_EMAIL");
}

export function hasRequiredEmailEnv() {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_EMAIL?.trim());
}
