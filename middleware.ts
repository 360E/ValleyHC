import { NextResponse, type NextRequest } from "next/server";

function createUnauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ValleyHC Dashboard", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function decodeBasicAuthHeader(value: string) {
  try {
    const decoded = atob(value);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const username = process.env.DASHBOARD_USERNAME;
  const password = process.env.DASHBOARD_PASSWORD;

  if (!username || !password) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next();
    }

    return new NextResponse("Dashboard authentication is not configured.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return createUnauthorizedResponse();
  }

  const credentials = decodeBasicAuthHeader(authorization.slice(6));

  if (!credentials || credentials.username !== username || credentials.password !== password) {
    return createUnauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
