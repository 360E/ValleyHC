import { referralRequestSchema } from "@/lib/marketing-forms";
import {
  createNoStoreJsonResponse,
  createSubmissionId,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsedPayload = referralRequestSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return createValidationErrorResponse(parsedPayload.error);
  }

  const submissionId = createSubmissionId("referral");

  logSafeSubmissionEvent("Referral request received", {
    submissionId,
    fieldCount: Object.keys(parsedPayload.data).length,
    hasNotes: parsedPayload.data.notes.length > 0,
    initialsLength: parsedPayload.data.patientInitials.length,
  });

  return createNoStoreJsonResponse({
    success: true,
    submissionId,
    message: "Thanks. The referral request was sent to ValleyHC for follow-up.",
  });
}
