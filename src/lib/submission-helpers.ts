import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function createSubmissionId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function createNoStoreJsonResponse(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

export function createValidationErrorResponse(error: ZodError) {
  return createNoStoreJsonResponse(
    {
      error: "Please review the highlighted fields and try again.",
      details: error.flatten(),
    },
    { status: 400 },
  );
}

export function logSafeSubmissionEvent(event: string, details: Record<string, unknown>) {
  console.info(`[ValleyHC] ${event}`, details);
}
