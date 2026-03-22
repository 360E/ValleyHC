import {
  createNoStoreJsonResponse,
  createValidationErrorResponse,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { parseContactSubmission } from "@/lib/contact-submission";
import { submitContactRequest } from "@/lib/api";

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

  const result = await submitContactRequest(parsedPayload.data);

  if (!result.success) {
    return createNoStoreJsonResponse(
      {
        error: result.error,
      },
      { status: 500 },
    );
  }

  return createNoStoreJsonResponse({
    success: true,
    message: result.message,
  });
}
