import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTablesExist } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeString, getSafeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`lesson:${clientIp}`, 60, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Thao tác quá thường xuyên. Vui lòng thử lại sau giây lát." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const session = getStudentSession(req);
    const studentId = session ? session.studentId : null;

    const body = await req.json();
    const { lessonSlug, isCompleted } = body;

    if (!lessonSlug || typeof lessonSlug !== "string") {
      return NextResponse.json({ error: "Thiếu mã định danh bài học (lessonSlug)." }, { status: 400 });
    }

    const cleanLessonSlug = sanitizeString(lessonSlug, 120);

    if (!studentId) {
      return NextResponse.json({
        success: true,
        syncedToCloud: false,
        lessonSlug: cleanLessonSlug,
        isCompleted: Boolean(isCompleted),
        message: "Lưu cục bộ trên trình duyệt (Đăng nhập để đồng bộ lên máy chủ học viện).",
      });
    }

    await ensureTablesExist();
    const sql = getDb();

    if (isCompleted) {
      await sql`
        INSERT INTO student_completed_lessons (student_id, lesson_slug)
        VALUES (${studentId}, ${cleanLessonSlug})
        ON CONFLICT (student_id, lesson_slug) DO NOTHING;
      `;
    } else {
      await sql`
        DELETE FROM student_completed_lessons
        WHERE student_id = ${studentId} AND lesson_slug = ${cleanLessonSlug};
      `;
    }

    return NextResponse.json({
      success: true,
      syncedToCloud: true,
      lessonSlug: cleanLessonSlug,
      isCompleted: Boolean(isCompleted),
      message: "Tiến độ bài học đã đồng bộ với hệ thống học viện.",
    });
  } catch (error: unknown) {
    console.error("Save lesson progress error:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error, "Lỗi lưu tiến độ bài học.") },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = getStudentSession(req);
    if (!session) {
      return NextResponse.json({ success: true, completedSlugs: [] });
    }

    await ensureTablesExist();
    const sql = getDb();
    const rows = await sql`
      SELECT lesson_slug
      FROM student_completed_lessons
      WHERE student_id = ${session.studentId}
      ORDER BY completed_at ASC;
    `;

    const completedSlugs = rows.map((r: Record<string, unknown>) => String(r.lesson_slug));

    return NextResponse.json({
      success: true,
      completedSlugs,
    });
  } catch (error: unknown) {
    console.error("Get lesson progress error:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error, "Lỗi tải tiến độ bài học.") },
      { status: 500 }
    );
  }
}
