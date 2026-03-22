import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth/auth-panel";
import { SetPasswordForm } from "@/components/auth/set-password-form";
import { getSupabasePublicConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Set Password",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function HiddenSetPasswordPage() {
  const config = getSupabasePublicConfig();

  return (
    <AuthPanel
      eyebrow="Valley Health CRM"
      title="Set your password"
      description="Complete your account setup to access the ValleyHC operations dashboard."
    >
      {config ? (
        <SetPasswordForm supabaseUrl={config.url} supabaseAnonKey={config.anonKey} />
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Supabase authentication is not configured yet. Add the required environment variables to continue.
        </p>
      )}
    </AuthPanel>
  );
}
