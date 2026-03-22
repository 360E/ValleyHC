"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactRequestSchema, type ContactRequestValues } from "@/lib/marketing-forms";

export function ContactForm() {
  const [submittedRequest, setSubmittedRequest] = useState<ContactRequestValues | null>(null);
  const {
    register,
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

  async function onSubmit(values: ContactRequestValues) {
    console.info("[ValleyHC] Contact request submitted", values);
    setSubmittedRequest(values);
    reset();
  }

  return (
    <div className="space-y-6">
      {submittedRequest ? (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-900">
          Thanks, we captured your request locally for now. A future VEHR-connected intake workflow can replace this console-only submission.
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField htmlFor="contact-name" label="Name" error={errors.name?.message} required>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField htmlFor="contact-phone" label="Phone" error={errors.phone?.message} required>
            <Input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              placeholder="(509) 555-0148"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
          </FormField>

          <FormField htmlFor="contact-email" label="Email" error={errors.email?.message} required>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="hello@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
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
          <Textarea
            id="contact-message"
            placeholder="Tell us how we can help."
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
        </FormField>

        <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Contact Request"}
        </Button>
      </form>
    </div>
  );
}
