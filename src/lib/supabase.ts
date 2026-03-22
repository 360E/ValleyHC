import "server-only";

import { createClient } from "@supabase/supabase-js";

export function hasSupabaseConfiguration() {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_ANON_KEY?.trim());
}

export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  return {
    url,
    anonKey,
  };
}

export function getSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing Supabase client configuration.");
  }

  return createClient(config.url, config.anonKey);
}
