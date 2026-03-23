"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent, trackFormSubmit } from "@/lib/analytics";
import { contactRequestSchema, type ContactRequestValues } from "@/lib/marketing-forms";

type SubmissionResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export function ContactForm() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestValues>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    trackEvent("contact_page_view", "contact_page");
  }, []);

  async function onSubmit(values: ContactRequestValues) {
    setSubmissionMessage(null);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as SubmissionResponse | null;

      if (!response.ok) {
        setSubmissionError(payload?.error ?? "We could not send your request right now. Please call the clinic instead.");
        trackFormSubmit("contact_form", false);
        return;
      }

      setSubmissionMessage(payload?.message ?? "Message sent successfully");
      reset();
      trackFormSubmit("contact_form", true);
    } catch {
      setSubmissionError("We could not send your request right now. Please call the clinic instead.");
      trackFormSubmit("contact_form", false);
    }
  }

  return (
    <div className="space-y-6">
      {submissionMessage ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 text-base leading-7 text-[var(--site-foreground)]">
          {submissionMessage}
        </div>
      ) : null}

      {submissionError ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 text-base leading-7 text-[var(--site-foreground)]">
          {submissionError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate data-analytics-form="contact_form">
        <FormField htmlFor="contact-name" label="Name" error={errors.name?.message} required>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="contact-name"
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
              />
            )}
          />
        </FormField>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField htmlFor="contact-phone" label="Phone" error={errors.phone?.message} required>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(509) 555-0148"
                  aria-invalid={Boolean(errors.phone)}
                />
              )}
            />
          </FormField>

          <FormField htmlFor="contact-email" label="Email" error={errors.email?.message} required>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="hello@example.com"
                  aria-invalid={Boolean(errors.email)}
                />
              )}
            />
          </FormField>
        </div>

        <FormField
          htmlFor="contact-message"
          label="Message"
          description="Keep this message general and do not include protected health information."
          error={errors.message?.message}
          required
        >
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="contact-message"
                placeholder="Tell us how we can help."
                aria-invalid={Boolean(errors.message)}
              />
            )}
          />
        </FormField>

        <p className="rounded-xl border border-[var(--border)] bg-white p-6 text-base leading-7 text-[var(--text-muted)]">
          Please do not include sensitive personal or medical information in this form.
        </p>

        <Button type="submit" variant="accent" size="lg" disabled={isSubmitting} data-analytics-event="form_submit">
          {isSubmitting ? "Submitting..." : "Send Contact Request"}
        </Button>
      </form>
    </div>
  );
}
