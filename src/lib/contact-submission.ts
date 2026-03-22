import "server-only";

import { z } from "zod";

import { contactRequestSchema, referralRequestSchema } from "@/lib/marketing-forms";

function sanitizeInlineText(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeMultilineText(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function normalizeContactPayload(payload: unknown) {
  const record = (payload ?? {}) as Record<string, unknown>;

  return {
    name: sanitizeInlineText(record.name),
    email: sanitizeInlineText(record.email),
    phone: sanitizeInlineText(record.phone),
    message: sanitizeMultilineText(record.message),
  };
}

export function normalizeReferralPayload(payload: unknown) {
  const record = (payload ?? {}) as Record<string, unknown>;

  return {
    referrerName: sanitizeInlineText(record.referrerName),
    organization: sanitizeInlineText(record.organization),
    phone: sanitizeInlineText(record.phone),
    email: sanitizeInlineText(record.email),
    patientInitials: sanitizeInlineText(record.patientInitials)?.toString().toUpperCase(),
    notes: sanitizeMultilineText(record.notes),
  };
}

export function parseContactSubmission(payload: unknown) {
  return contactRequestSchema.safeParse(normalizeContactPayload(payload));
}

export function parseReferralSubmission(payload: unknown) {
  return referralRequestSchema.safeParse(normalizeReferralPayload(payload));
}

export type ContactSubmissionValues = z.infer<typeof contactRequestSchema>;
export type ReferralSubmissionValues = z.infer<typeof referralRequestSchema>;
