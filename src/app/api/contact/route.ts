import {
  createNoStoreJsonResponse,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { parseContactSubmission } from "@/lib/contact-submission";
import { submitContactRequest } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rateLimit = enforceRateLimit(getRateLimitKey(request, "contact"));

    if (!rateLimit.allowed) {
      logSafeSubmissionEvent("contact submission rate limited", {
        route: "contact",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      });

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
      logSafeSubmissionEvent("contact submission validation failed", {
        route: "contact",
      });

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
  } catch (error) {
    logSafeSubmissionEvent("contact route failed", {
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
}
