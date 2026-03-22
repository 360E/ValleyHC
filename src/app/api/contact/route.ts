import {
  createNoStoreJsonResponse,
  createSubmissionId,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { parseContactSubmission } from "@/lib/contact-submission";
import { buildEmailHtml, sendContactEmail } from "@/lib/resend-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(getRateLimitKey(request, "contact"));

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
  const parsedPayload = parseContactSubmission(payload);

  if (!parsedPayload.success) {
    return createValidationErrorResponse(parsedPayload.error);
  }

  const submissionId = createSubmissionId("contact");
  const values = parsedPayload.data;

  try {
    await sendContactEmail({
      subject: `New ValleyHC contact request: ${values.name}`,
      replyTo: values.email,
      html: buildEmailHtml({
        intro: "A new contact request was submitted through the Valley Health and Counseling website.",
        fields: [
          { label: "Submission ID", value: submissionId },
          { label: "Name", value: values.name },
          { label: "Email", value: values.email },
          { label: "Phone", value: values.phone },
          { label: "Message", value: values.message },
        ],
      }),
      lines: [
        "New contact request received from the ValleyHC website.",
        "",
        `Submission ID: ${submissionId}`,
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        "",
        "Message:",
        values.message,
      ],
    });
  } catch (error) {
    logSafeSubmissionEvent("Contact request email failed", {
      submissionId,
      route: "contact",
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return createNoStoreJsonResponse(
      {
        error: "We could not send your request right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }

  logSafeSubmissionEvent("Contact request email sent", {
    submissionId,
    route: "contact",
  });

  return createNoStoreJsonResponse({
    success: true,
    message: "Message sent successfully",
  });
}
