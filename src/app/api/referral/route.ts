import {
  createNoStoreJsonResponse,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { parseReferralSubmission } from "@/lib/contact-submission";
import { submitReferralRequest } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Do not include protected health information.
    const rateLimit = enforceRateLimit(getRateLimitKey(request, "referral"));

    if (!rateLimit.allowed) {
      logSafeSubmissionEvent("referral submission rate limited", {
        route: "referral",
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
    const parsedPayload = parseReferralSubmission(payload);

    if (!parsedPayload.success) {
      logSafeSubmissionEvent("referral submission validation failed", {
        route: "referral",
      });

      return createValidationErrorResponse(parsedPayload.error);
    }

    const result = await submitReferralRequest(parsedPayload.data);

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
    logSafeSubmissionEvent("referral route failed", {
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
}
