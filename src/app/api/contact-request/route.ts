import { contactRequestSchema } from "@/lib/marketing-forms";
import {
  createNoStoreJsonResponse,
  createSubmissionId,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsedPayload = contactRequestSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return createValidationErrorResponse(parsedPayload.error);
  }

  const submissionId = createSubmissionId("contact");

  logSafeSubmissionEvent("Contact request received", {
    submissionId,
    fieldCount: Object.keys(parsedPayload.data).length,
    hasMessage: parsedPayload.data.message.length > 0,
    phoneDigits: parsedPayload.data.phone.replace(/\D/g, "").length,
  });

  return createNoStoreJsonResponse({
    success: true,
    submissionId,
    message: "Thanks. Your request was sent to ValleyHC for follow-up.",
  });
}
