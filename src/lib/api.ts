import "server-only";

import { createSubmissionId, logSafeSubmissionEvent } from "@/lib/submission-helpers";
import type { ContactSubmissionValues, ReferralSubmissionValues } from "@/lib/contact-submission";
import { buildEmailHtml, sendContactEmail } from "@/lib/resend-email";

type SubmissionSuccessResult = {
  success: true;
  message: string;
};

type SubmissionFailureResult = {
  success: false;
  error: string;
};

export type SubmissionResult = SubmissionSuccessResult | SubmissionFailureResult;

async function deliverSubmission(options: {
  route: "contact" | "referral";
  subject: string;
  replyTo: string;
  intro: string;
  fields: Array<{ label: string; value: string }>;
  lines: string[];
  successMessage: string;
}) {
  const submissionId = createSubmissionId(options.route);

  try {
    await sendContactEmail({
      subject: options.subject,
      replyTo: options.replyTo,
      html: buildEmailHtml({
        intro: options.intro,
        fields: [{ label: "Submission ID", value: submissionId }, ...options.fields],
      }),
      lines: [`Submission ID: ${submissionId}`, "", ...options.lines],
    });
  } catch (error) {
    logSafeSubmissionEvent(`${options.route} submission delivery failed`, {
      submissionId,
      route: options.route,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return {
      success: false,
      error:
        options.route === "contact"
          ? "We could not send your request right now. Please try again shortly."
          : "We could not send the referral right now. Please try again shortly.",
    } satisfies SubmissionFailureResult;
  }

  logSafeSubmissionEvent(`${options.route} submission delivered`, {
    submissionId,
    route: options.route,
  });

  return {
    success: true,
    message: options.successMessage,
  } satisfies SubmissionSuccessResult;
}

export async function submitContactRequest(values: ContactSubmissionValues): Promise<SubmissionResult> {
  return deliverSubmission({
    route: "contact",
    subject: `New ValleyHC contact request: ${values.name}`,
    replyTo: values.email,
    intro: "A new contact request was submitted through the Valley Health and Counseling website.",
    fields: [
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone },
      { label: "Message", value: values.message },
    ],
    lines: [
      "New contact request received from the ValleyHC website.",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      "",
      "Message:",
      values.message,
    ],
    successMessage: "Message sent successfully",
  });
}

export async function submitReferralRequest(values: ReferralSubmissionValues): Promise<SubmissionResult> {
  return deliverSubmission({
    route: "referral",
    subject: `New ValleyHC referral request: ${values.referrerName}`,
    replyTo: values.email,
    intro: "A new referral request was submitted through the Valley Health and Counseling website. Do not include protected health information.",
    fields: [
      { label: "Referrer Name", value: values.referrerName },
      { label: "Organization", value: values.organization },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone },
      { label: "Patient Initials", value: values.patientInitials },
      { label: "Notes", value: values.notes || "(none provided)" },
    ],
    lines: [
      "New referral request received from the ValleyHC website.",
      "",
      "Do not include protected health information.",
      "",
      `Referrer Name: ${values.referrerName}`,
      `Organization: ${values.organization}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Patient Initials: ${values.patientInitials}`,
      "",
      "Notes:",
      values.notes || "(none provided)",
    ],
    successMessage: "Your request has been received. Our team will contact you shortly.",
  });
}
