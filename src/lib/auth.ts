import crypto from "crypto";
import type { NextRequest } from "next/server";

// Secure JWT Secret loaded strictly from environment variable
export const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "pudo-academy-dev-secret-key-2026");

const getSecretKey = (): string => {
  if (!JWT_SECRET) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing JWT_SECRET environment variable in production.");
    }
    return "pudo-academy-dev-secret-key-2026";
  }
  return JWT_SECRET;
};

const SECRET_SALT = process.env.AUTH_SECRET || "pudo-academy-auth-secret-salt-2026";

export const AUTH_COOKIE_NAME = "pudo_auth_token";

export const AUTH_COOKIE_OPTIONS = {
  name: AUTH_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

export interface JwtSessionPayload {
  sub: string;
  email: string;
  name?: string;
  studentId: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign standard RFC 7519 JSON Web Token with HMAC SHA-256 (HS256)
 */
export function signJwt(
  payload: { sub: string; email: string; name?: string },
  expiresInSeconds = 7 * 24 * 60 * 60
): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    ...payload,
    studentId: payload.sub,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const headerB64 = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
  const dataToSign = `${headerB64}.${payloadB64}`;

  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(dataToSign)
    .digest("base64url");

  return `${dataToSign}.${signature}`;
}

/**
 * Verify and decode standard RFC 7519 JWT
 */
export function verifyJwt(token: string): JwtSessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const dataToSign = `${headerB64}.${payloadB64}`;

    const primarySecret = getSecretKey();
    let isSigValid = false;

    const expectedSignature = crypto
      .createHmac("sha256", primarySecret)
      .update(dataToSign)
      .digest("base64url");

    if (
      signature.length === expectedSignature.length &&
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      isSigValid = true;
    }

    // Support fallback secret during key rotation
    const fallbackSecret = process.env.JWT_FALLBACK_SECRET;
    if (!isSigValid && fallbackSecret) {
      const fallbackSig = crypto
        .createHmac("sha256", fallbackSecret)
        .update(dataToSign)
        .digest("base64url");
      if (
        signature.length === fallbackSig.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(fallbackSig))
      ) {
        isSigValid = true;
      }
    }

    if (!isSigValid) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && now > payload.exp) {
      return null; // Expired
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      studentId: payload.sub || payload.studentId,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

/**
 * Hash password securely with PBKDF2
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt + SECRET_SALT, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto
      .pbkdf2Sync(password, salt + SECRET_SALT, 1000, 64, "sha512")
      .toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Legacy session token generator (kept for backward compatibility)
 */
export function createSessionToken(studentId: string, email: string): string {
  return signJwt({ sub: studentId, email });
}

/**
 * Legacy session token verifier fallback
 */
export function verifySessionToken(token: string): { studentId: string; email: string } | null {
  const jwt = verifyJwt(token);
  if (jwt) {
    return {
      studentId: jwt.studentId,
      email: jwt.email,
    };
  }

  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_SALT)
      .update(payload)
      .digest("base64url");
    if (signature !== expectedSignature) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data;
  } catch {
    return null;
  }
}

/**
 * Verify either JWT or legacy session token
 */
export function verifyAuthToken(token: string): { studentId: string; email: string; name?: string } | null {
  const jwt = verifyJwt(token);
  if (jwt) {
    return {
      studentId: jwt.studentId,
      email: jwt.email,
      name: jwt.name,
    };
  }
  return verifySessionToken(token);
}

/**
 * Extract auth token from request - checks HTTPOnly cookie first, then Bearer header
 */
export function extractTokenFromRequest(req: NextRequest): string | null {
  // 1. HTTPOnly cookie (highest security against XSS)
  const cookieToken = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieToken) return cookieToken;

  // 2. Authorization Bearer header fallback
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}

/**
 * Get authenticated student session from request
 */
export function getStudentSession(req: NextRequest): { studentId: string; email: string; name?: string } | null {
  const token = extractTokenFromRequest(req);
  if (!token) return null;
  return verifyAuthToken(token);
}
