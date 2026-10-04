import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTablesExist } from "@/lib/db";
import { verifyPassword, signJwt, AUTH_COOKIE_OPTIONS, AUTH_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, verifySameOrigin, getSafeErrorMessage } from "@/lib/security";

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

    // 2. Anti-Brute-Force Rate Limiting (5 attempts / 60 seconds per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`login:${clientIp}`, 5, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi ${rateLimit.retryAfter} giây trước khi thử lại.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        }
      );
    }

    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Vui lòng nhập email và mật khẩu hợp lệ." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Địa chỉ email không đúng định dạng." },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: "Mật khẩu vượt quá độ dài tối đa cho phép." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || req.nextUrl.origin || "http://localhost:3000";
    let authProviderUser: { id: string; name?: string } | null = null;

    // 3. Check external auth provider if configured
    if (NEON_AUTH_URL) {
      try {
        const authRes = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const authData = await authRes.json();
      if (authRes.ok && authData?.user) {
        authProviderUser = authData.user;
      }
      } catch (authErr) {
        console.warn("Auth provider warning (falling back to direct DB):", authErr);
      }
    }

    // 4. Fetch or verify with students table
    await ensureTablesExist();
    const sql = getDb();

    const users = await sql`
      SELECT id, email, password_hash, name, target_college, academic_year, notes
      FROM students
      WHERE LOWER(email) = ${trimmedEmail}
      LIMIT 1;
    `;

    if (users.length === 0 && !authProviderUser) {
      return NextResponse.json(
        { error: "Không tìm thấy tài khoản với email này. Vui lòng đăng ký tài khoản mới." },
        { status: 404 }
      );
    }

    let student = users[0];

    // If verified via direct DB
    if (!authProviderUser && student) {
      const isPasswordValid = verifyPassword(password, student.password_hash);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Mật khẩu không chính xác. Vui lòng kiểm tra lại." },
          { status: 401 }
        );
      }
    } else if (authProviderUser && !student) {
      // Sync into students table
      const collegeName = "Trường Cao đẳng Kỹ thuật Công nghệ";
      const yearName = "K2026 - K2029 (Hệ chính quy 3 năm)";
      await sql`
        INSERT INTO students (id, email, password_hash, name, target_college, academic_year)
        VALUES (${authProviderUser.id}, ${trimmedEmail}, 'MANAGED_AUTH', ${authProviderUser.name || 'Học viên Pudo'}, ${collegeName}, ${yearName})
        ON CONFLICT (email) DO NOTHING;
      `;
      student = {
        id: authProviderUser.id,
        email: trimmedEmail,
        name: authProviderUser.name || "Học viên Pudo",
        target_college: collegeName,
        academic_year: yearName,
        notes: "",
      };
    }

    // Fetch student's past exam records
    const examRecords = await sql`
      SELECT exam_id, subject_code, subject_title, score, max_score, completed_at
      FROM student_exam_records
      WHERE student_id = ${student.id} OR student_id = ${trimmedEmail}
      ORDER BY completed_at DESC;
    `;

    // Sign standard JWT
    const jwtToken = signJwt({
      sub: student.id,
      email: student.email,
      name: student.name,
    });

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      token: jwtToken,
      student: {
        id: student.id,
        email: student.email,
        name: student.name,
        targetCollege: student.target_college,
        academicYear: student.academic_year,
        notes: student.notes || "",
        examsTaken: examRecords.map((r: Record<string, unknown>) => ({
          examId: String(r.exam_id),
          subjectCode: String(r.subject_code),
          subjectTitle: String(r.subject_title),
          score: Number(r.score),
          maxScore: Number(r.max_score),
          completedAt: String(r.completed_at),
        })),
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error, "Lỗi kết nối máy chủ hệ thống. Vui lòng thử lại sau.") },
      { status: 500 }
    );
  }
}
