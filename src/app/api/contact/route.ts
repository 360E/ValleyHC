import {
  createNoStoreJsonResponse,
  createValidationErrorResponse,
  logSafeSubmissionEvent,
} from "@/lib/submission-helpers";
import { enforceRateLimit, getRateLimitKey } from "@/lib/contact-rate-limit";
import { normalizeContactPayload, parseContactSubmission } from "@/lib/contact-submission";
import { submitContactRequest } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getMissingContactFields(body: ReturnType<typeof normalizeContactPayload>) {
  return (["name", "email", "phone", "message"] as const).filter((fieldName) => {
    const value = body[fieldName];
    return typeof value !== "string" || value.length === 0;
  });
}

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

    const body = await request.json().catch(() => null);
    console.log("BODY:", body);

    const { name, email, phone, message } = (body ?? {}) as {
      name?: unknown;
      email?: unknown;
      phone?: unknown;
      message?: unknown;
    };

    void phone;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const normalizedBody = normalizeContactPayload(body);
    const missingFields = getMissingContactFields(normalizedBody);

    logSafeSubmissionEvent("contact submission body received", {
      route: "contact",
      hasName: Boolean(normalizedBody.name),
      hasEmail: Boolean(normalizedBody.email),
      hasPhone: Boolean(normalizedBody.phone),
      hasMessage: Boolean(normalizedBody.message),
    });

    if (missingFields.length > 0) {
      return createNoStoreJsonResponse(
        {
          error: `Missing required field${missingFields.length === 1 ? "" : "s"}: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const parsedPayload = parseContactSubmission(normalizedBody);

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

    return new Response(
      JSON.stringify({
        success: true,
        emailAttempted: true,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("[ValleyHC] contact route failed", error);

    logSafeSubmissionEvent("contact route failed", {
      route: "contact",
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
}
