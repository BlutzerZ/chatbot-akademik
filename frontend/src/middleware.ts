import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  function parseJwt(token: string) {
    if (!token) {
      throw new Error("Token is undefined");
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token is not properly formatted");
    }

    const base64URL = parts[1];
    if (!base64URL) {
      throw new Error("Token is not properly formatted");
    }
    const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");

    return JSON.parse(jsonPayload);
  }

  const parseResult = token ? parseJwt(token) : null;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (parseResult.role === "USER") {
    return NextResponse.next();
  } else if (parseResult.role === "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: "/chat/:path*",
};
