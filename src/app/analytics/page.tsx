import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthPanel } from "@/components/auth/auth-panel";
import { LoginForm } from "@/components/auth/login-form";
import { getAuthenticatedUser } from "@/lib/supabase-auth";
import { getSupabasePublicConfig } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function HiddenLoginPage() {
  const config = getSupabasePublicConfig();

  if (config) {
    const { user } = await getAuthenticatedUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <AuthPanel
      eyebrow="Valley Health CRM"
      title="Admin sign in"
      description="Use your ValleyHC admin credentials to access the operations dashboard."
    >
      {config ? (
        <LoginForm supabaseUrl={config.url} supabaseAnonKey={config.anonKey} />
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Supabase authentication is not configured yet. Add the required environment variables to continue.
        </p>
      )}
    </AuthPanel>
  );
}
