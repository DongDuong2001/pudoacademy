import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTablesExist } from "@/lib/db";
import { hashPassword, signJwt, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, sanitizeString, verifySameOrigin, getSafeErrorMessage } from "@/lib/security";

const NEON_AUTH_URL = process.env.NEON_AUTH_BASE_URL || "";

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Origin Verification
    if (!verifySameOrigin(req)) {
      return NextResponse.json(
        { error: "Nguồn yêu cầu không hợp lệ (Origin mismatch)." },
        { status: 403 }
      );
    }

    // 2. Anti-Spam Rate Limiting (3 accounts / 60 seconds per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`register:${clientIp}`, 3, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Bạn đã tạo tài khoản quá nhiều lần trong thời gian ngắn. Vui lòng thử lại sau ${rateLimit.retryAfter} giây.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        }
      );
    }

    const body = await req.json();
    const { email, password, name, targetCollege, academicYear, rememberMe } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ họ tên, email và mật khẩu." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Địa chỉ email không đúng định dạng." },
        { status: 400 }
      );
    }

    const trimmedName = sanitizeString(name, 80);
    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Họ và tên tối thiểu 2 ký tự hợp lệ." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu tối thiểu 6 ký tự." },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: "Mật khẩu không được dài quá 128 ký tự." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || req.nextUrl.origin || "http://localhost:3000";
    let authProviderUserId: string | null = null;

    // 3. Register with auth provider if configured
    if (NEON_AUTH_URL) {
      try {
        const authRes = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
          },
          body: JSON.stringify({
            email: trimmedEmail,
            password,
            name: trimmedName,
          }),
        });

        const authData = await authRes.json();
        if (authRes.ok && authData?.user?.id) {
          authProviderUserId = authData.user.id;
        } else if (authData?.message?.includes("already") || authData?.code === "USER_ALREADY_EXISTS") {
          return NextResponse.json(
            { error: "Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng Nhập." },
            { status: 409 }
          );
        }
      } catch (authErr) {
        console.warn("Auth provider registration warning (falling back to direct DB):", authErr);
      }
    }

    // 4. Ensure students table in database is updated
    await ensureTablesExist();
    const sql = getDb();

    const studentId = authProviderUserId || `STD-${Date.now().toString(36).toUpperCase()}`;
    const passwordHash = hashPassword(password);
    const collegeName = sanitizeString(targetCollege || "Trường Cao đẳng Kỹ thuật Công nghệ", 100);
    const yearName = sanitizeString(academicYear || "K2026 - K2029 (Hệ chính quy 3 năm)", 100);

    await sql`
      INSERT INTO students (id, email, password_hash, name, target_college, academic_year)
      VALUES (${studentId}, ${trimmedEmail}, ${passwordHash}, ${trimmedName}, ${collegeName}, ${yearName})
      ON CONFLICT (email) DO UPDATE SET
        name = ${trimmedName},
        updated_at = NOW();
    `;

    // Sign standard JWT
    const jwtToken = signJwt({
      sub: studentId,
      email: trimmedEmail,
      name: trimmedName,
    });

    const response = NextResponse.json({
      success: true,
      message: "Đăng ký tài khoản học viên thành công!",
      token: jwtToken,
      student: {
        id: studentId,
        email: trimmedEmail,
        name: trimmedName,
        targetCollege: collegeName,
        academicYear: yearName,
        notes: "",
      },
    });

    // Set secure HTTPOnly cookie (30 days if rememberMe, otherwise 1 day)
    const maxAge = rememberMe !== false ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    response.cookies.set({
      ...AUTH_COOKIE_OPTIONS,
      maxAge,
      name: AUTH_COOKIE_NAME,
      value: jwtToken,
    });

    return response;
  } catch (error: unknown) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error, "Lỗi xử lý đăng ký tài khoản. Vui lòng thử lại sau.") },
      { status: 500 }
    );
  }
}
