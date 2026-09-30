import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureTablesExist } from "@/lib/db";
import { getStudentSession } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeString, getSafeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`exam:${clientIp}`, 30, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Thao tác quá thường xuyên. Vui lòng thử lại sau giây lát." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const session = getStudentSession(req);
    const studentId = session ? session.studentId : null;

    const body = await req.json();
    const { examId, subjectCode, subjectTitle, score, maxScore } = body;

    if (!examId || !subjectCode || score === undefined || maxScore === undefined) {
      return NextResponse.json({ error: "Dữ liệu kết quả thi không hợp lệ." }, { status: 400 });
    }

    const cleanExamId = sanitizeString(examId, 50);
    const cleanSubjectCode = sanitizeString(subjectCode, 30);
    const cleanSubjectTitle = sanitizeString(subjectTitle, 100);
    const numScore = Number(score);
    const numMaxScore = Number(maxScore);

    if (isNaN(numScore) || isNaN(numMaxScore) || numScore < 0 || numMaxScore <= 0 || numScore > numMaxScore) {
      return NextResponse.json({ error: "Điểm số không hợp lệ." }, { status: 400 });
    }

    // If no logged in student, still acknowledge so client can store locally
    if (!studentId) {
      return NextResponse.json({
        success: true,
        syncedToCloud: false,
        message: "Kết quả được lưu trên máy học viên (Đăng nhập để đồng bộ lên hệ thống học viện).",
      });
    }

    await ensureTablesExist();
    const sql = getDb();

    const recordId = `EXAM-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    await sql`
      INSERT INTO student_exam_records (id, student_id, exam_id, subject_code, subject_title, score, max_score)
      VALUES (${recordId}, ${studentId}, ${cleanExamId}, ${cleanSubjectCode}, ${cleanSubjectTitle}, ${numScore}, ${numMaxScore});
    `;

    return NextResponse.json({
      success: true,
      syncedToCloud: true,
      recordId,
      message: "Kết quả thi đã được đồng bộ an toàn lên hệ thống học viện!",
    });
  } catch (error: unknown) {
    console.error("Save exam error:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error, "Lỗi lưu điểm thi.") },
      { status: 500 }
    );
  }
}
