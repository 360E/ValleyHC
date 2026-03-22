"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { referralRequestSchema, type ReferralRequestValues } from "@/lib/marketing-forms";

type SubmissionResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export function ReferralForm() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralRequestValues>({
    resolver: zodResolver(referralRequestSchema),
    defaultValues: {
      referrerName: "",
      organization: "",
      phone: "",
      email: "",
      patientInitials: "",
      notes: "",
    },
  });

  async function onSubmit(values: ReferralRequestValues) {
    setSubmissionMessage(null);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as SubmissionResponse | null;

      if (!response.ok) {
        setSubmissionError(payload?.error ?? "We could not send the referral right now. Please call the clinic instead.");
        return;
      }

      setSubmissionMessage(payload?.message ?? "Your request has been received. Our team will contact you shortly.");
      reset();
    } catch {
      setSubmissionError("We could not send the referral right now. Please call the clinic instead.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">
        Do not include protected health information. Use patient initials only and keep notes general and non-sensitive.
      </div>

      {submissionMessage ? (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-900">
          {submissionMessage}
        </div>
      ) : null}

      {submissionError ? (
        <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm leading-6 text-rose-900">
          {submissionError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField htmlFor="referral-name" label="Referrer name" error={errors.referrerName?.message} required>
            <Input id="referral-name" autoComplete="name" placeholder="Referrer name" aria-invalid={Boolean(errors.referrerName)} {...register("referrerName")} />
          </FormField>

          <FormField htmlFor="referral-organization" label="Organization" error={errors.organization?.message} required>
            <Input
              id="referral-organization"
              autoComplete="organization"
              placeholder="Clinic or organization"
              aria-invalid={Boolean(errors.organization)}
              {...register("organization")}
            />
          </FormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField htmlFor="referral-phone" label="Phone" error={errors.phone?.message} required>
            <Input
              id="referral-phone"
              type="tel"
              autoComplete="tel"
              placeholder="(509) 555-0148"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
          </FormField>

          <FormField htmlFor="referral-email" label="Email" error={errors.email?.message} required>
            <Input
              id="referral-email"
              type="email"
              autoComplete="email"
              placeholder="referrals@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>
        </div>

        <FormField
          htmlFor="referral-initials"
          label="Patient initials"
          description="Initials only, for example J.D."
          error={errors.patientInitials?.message}
          required
        >
          <Input
            id="referral-initials"
            placeholder="J.D."
            aria-invalid={Boolean(errors.patientInitials)}
            className="uppercase tracking-[0.22em]"
            {...register("patientInitials")}
          />
        </FormField>

        <FormField
          htmlFor="referral-notes"
          label="Notes"
          description="Use only non-sensitive notes, such as preferred callback timing or general service request."
          error={errors.notes?.message}
        >
          <Textarea
            id="referral-notes"
            placeholder="Brief non-sensitive notes"
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
        </FormField>

        <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Referral Request"}
        </Button>
      </form>
    </div>
  );
}
