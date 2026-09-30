import type { NextRequest } from "next/server";

/**
 * Basic input sanitization to strip dangerous tags and control characters
 */
export function sanitizeString(input: unknown, maxLength = 255): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML tags brackets to prevent XSS
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate standard email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 100) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Verify request origin/referer for mutating requests (CSRF protection)
 */
export function verifySameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (!origin || !host) {
    return true; // Fallback for clients without origin
  }

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

/**
 * Return production-safe error message preventing technical information disclosure
 */
export function getSafeErrorMessage(error: unknown, fallback = "Lỗi xử lý hệ thống. Vui lòng thử lại sau."): string {
  if (process.env.NODE_ENV !== "production") {
    return error instanceof Error ? error.message : String(error);
  }
  return fallback;
}
