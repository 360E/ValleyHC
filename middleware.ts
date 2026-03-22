import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseAuthConfiguration, updateAuthSession } from "@/lib/supabase-auth";

function createAuthConfigurationErrorResponse() {
  return new NextResponse("Supabase authentication is not configured.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function middleware(request: NextRequest) {
  if (!hasSupabaseAuthConfiguration()) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next();
    }

    return createAuthConfigurationErrorResponse();
  }

  const session = await updateAuthSession(request);

  if (!session.user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return session.response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
