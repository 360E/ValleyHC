import "server-only";

import { createClient } from "@supabase/supabase-js";

function readRequiredSupabaseEnv(name: "SUPABASE_URL" | "SUPABASE_ANON_KEY") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export function hasSupabaseConfiguration() {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_ANON_KEY?.trim());
}

export function getSupabaseClient() {
  return createClient(
    readRequiredSupabaseEnv("SUPABASE_URL"),
    readRequiredSupabaseEnv("SUPABASE_ANON_KEY"),
  );
}
