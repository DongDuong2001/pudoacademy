import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Common exploit scanner patterns to block immediately
const BLOCKED_PATTERNS = [
  /\.env(\.|$)/i,
  /\.git(\/|$)/i,
  /\.svn/i,
  /wp-admin/i,
  /wp-login/i,
  /phpmyadmin/i,
  /xmlrpc\.php/i,
  /\.php$/i,
  /actuator/i,
  /\.aws/i,
  /\.config$/i,
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Block common malicious scanning probes
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Access Denied: Malicious Request Pattern Detected", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // 2. Allow request to proceed and append security headers
  const response = NextResponse.next();

  // Basic defense headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static assets)
     * - _next/image (image optimization)
     * - favicon.ico, logo, icons, manifest.json, sw.js
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|logo/|icon.png).*)",
  ],
};
