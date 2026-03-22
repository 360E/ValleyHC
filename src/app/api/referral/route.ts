import {
  createNoStoreJsonResponse,
  createSubmissionId,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { parseReferralSubmission } from "@/lib/contact-submission";
import { buildEmailHtml, sendContactEmail } from "@/lib/resend-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Do not include protected health information.
  const rateLimit = enforceRateLimit(getRateLimitKey(request, "referral"));

  if (!rateLimit.allowed) {
    return createNoStoreJsonResponse(
      {
        error: "Too many requests. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsedPayload = parseReferralSubmission(payload);

  if (!parsedPayload.success) {
    return createValidationErrorResponse(parsedPayload.error);
  }

  const submissionId = createSubmissionId("referral");
  const values = parsedPayload.data;

  try {
    await sendContactEmail({
      subject: `New ValleyHC referral request: ${values.referrerName}`,
      replyTo: values.email,
      html: buildEmailHtml({
        intro: "A new referral request was submitted through the Valley Health and Counseling website. Do not include protected health information.",
        fields: [
          { label: "Submission ID", value: submissionId },
          { label: "Referrer Name", value: values.referrerName },
          { label: "Organization", value: values.organization },
          { label: "Email", value: values.email },
          { label: "Phone", value: values.phone },
          { label: "Patient Initials", value: values.patientInitials },
          { label: "Notes", value: values.notes || "(none provided)" },
        ],
      }),
      lines: [
        "New referral request received from the ValleyHC website.",
        "",
        "Do not include protected health information.",
        "",
        `Submission ID: ${submissionId}`,
        `Referrer Name: ${values.referrerName}`,
        `Organization: ${values.organization}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Patient Initials: ${values.patientInitials}`,
        "",
        "Notes:",
        values.notes || "(none provided)",
      ],
    });
  } catch (error) {
    logSafeSubmissionEvent("Referral request email failed", {
      submissionId,
      route: "referral",
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return createNoStoreJsonResponse(
      {
        error: "We could not send the referral right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }

  logSafeSubmissionEvent("Referral request email sent", {
    submissionId,
    route: "referral",
  });

  return createNoStoreJsonResponse({
    success: true,
    message: "Your request has been received. Our team will contact you shortly.",
  });
}
