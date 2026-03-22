"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SetPasswordFormProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function SetPasswordForm({ supabaseUrl, supabaseAnonKey }: SetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteEmail, setInviteEmail] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const supabase = useMemo(() => createBrowserClient(supabaseUrl, supabaseAnonKey), [supabaseAnonKey, supabaseUrl]);

  useEffect(() => {
    let isMounted = true;

    async function exchangeInviteSession() {
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          throw error;
        }

        return;
      }

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as "invite" | "recovery",
        });

        if (error) {
          throw error;
        }
      }
    }

    async function loadInviteSession() {
      try {
        await exchangeInviteSession();

        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            throw error;
          }

          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!isMounted) {
          return;
        }

        if (error || !user) {
          setErrorMessage("This invite link is invalid or expired. Request a new invite and try again.");
          return;
        }

        setInviteEmail(user.email ?? null);
      } catch (error) {
        console.error("Supabase invite session lookup failed:", error);
        if (isMounted) {
          setErrorMessage("This invite link is invalid or expired. Request a new invite and try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingSession(false);
        }
      }
    }

    void loadInviteSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      setInviteEmail(session?.user.email ?? null);

      if (session?.user) {
        setErrorMessage(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [searchParams, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoadingSession) {
      return;
    }

    if (!password || !confirmPassword) {
      setErrorMessage("Enter and confirm your password to continue.");
      return;
    }

    if (password.length < 12) {
      setErrorMessage("Use a password with at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSuccessMessage("Password updated. Redirecting to the dashboard...");
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Supabase password setup failed:", error);
      setErrorMessage("Unable to set your password right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {inviteEmail ? (
        <p className="rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Setting password for <span className="font-semibold text-slate-900">{inviteEmail}</span>
        </p>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="set-password">
          Password
        </label>
        <Input
          id="set-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="set-password-confirm">
          Confirm password
        </label>
        <Input
          id="set-password-confirm"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <Button className="w-full" size="lg" type="submit" disabled={isLoadingSession || isSubmitting}>
        {isLoadingSession ? "Checking invite..." : isSubmitting ? "Saving password..." : "Set password"}
      </Button>
    </form>
  );
}
