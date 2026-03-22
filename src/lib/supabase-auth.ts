import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicConfig } from "@/lib/supabase";

export function hasSupabaseAuthConfiguration() {
  return Boolean(getSupabasePublicConfig());
}

function requireSupabasePublicConfig() {
  const config = getSupabasePublicConfig();

  if (!config) {
    throw new Error("Missing Supabase authentication configuration.");
  }

  return config;
}

export async function createSupabaseServerAuthClient() {
  const cookieStore = cookies();
  const { url, anonKey } = requireSupabasePublicConfig();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always mutate cookies; middleware will refresh the session when needed.
        }
      },
    },
  });
}

export async function getAuthenticatedUser() {
  if (!hasSupabaseAuthConfiguration()) {
    return {
      user: null as User | null,
      error: new Error("Supabase authentication is not configured."),
    };
  }

  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Supabase auth lookup failed:", error);
  }

  return {
    user,
    error,
  };
}

export async function requireAuthenticatedUser() {
  const { user } = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function updateAuthSession(request: NextRequest) {
  if (!hasSupabaseAuthConfiguration()) {
    return {
      response: NextResponse.next({
        request,
      }),
      user: null,
    };
  }

  const { url, anonKey } = requireSupabasePublicConfig();
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    response,
    user,
  };
}
