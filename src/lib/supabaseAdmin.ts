import "server-only";

import { createClient } from "@supabase/supabase-js";

function readRequiredAdminEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export const supabaseAdmin = createClient(
  readRequiredAdminEnv("SUPABASE_URL"),
  readRequiredAdminEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
