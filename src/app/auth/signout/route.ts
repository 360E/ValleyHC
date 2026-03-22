import { NextResponse } from "next/server";

import { createSupabaseServerAuthClient } from "@/lib/supabase-auth";

export async function POST(request: Request) {
  const redirectUrl = new URL("/login", request.url);

  try {
    const supabase = await createSupabaseServerAuthClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase sign-out failed:", error);
    }
  } catch (error) {
    console.error("Supabase sign-out failed:", error);
  }

  return NextResponse.redirect(redirectUrl, {
    status: 303,
  });
}
