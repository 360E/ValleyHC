import { z } from "zod";

function hasEnoughPhoneDigits(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required.")
  .refine(hasEnoughPhoneDigits, "Enter a valid phone number.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.");

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(80, "Name is too long."),
  phone: phoneSchema,
  email: emailSchema,
  message: z
    .string()
    .trim()
    .min(10, "Share a brief message so we can route your request.")
    .max(600, "Keep your message under 600 characters."),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;

export const referralRequestSchema = z.object({
  referrerName: z.string().trim().min(2, "Enter the referrer name.").max(80, "Name is too long."),
  organization: z.string().trim().min(2, "Enter the organization name.").max(120, "Organization is too long."),
  phone: phoneSchema,
  email: emailSchema,
  patientInitials: z
    .string()
    .trim()
    .min(1, "Patient initials are required.")
    .max(10, "Use initials only.")
    .regex(/^[A-Za-z]{1,2}(?:[.\s-]?[A-Za-z]{1,2}){0,2}$/, "Use initials only, such as J.D."),
  notes: z
    .string()
    .trim()
    .max(600, "Keep notes under 600 characters.")
    .refine((value) => value.length === 0 || value.length >= 10, {
      message: "Add a short non-sensitive note or leave the field blank.",
    }),
});

export type ReferralRequestValues = z.infer<typeof referralRequestSchema>;
