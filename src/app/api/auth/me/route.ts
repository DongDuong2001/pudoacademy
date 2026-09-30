import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getStudentSession, extractTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = getStudentSession(req);

    if (!session) {
      return NextResponse.json({ error: "Chưa đăng nhập hoặc phiên đã hết hạn." }, { status: 401 });
    }

    const sql = getDb();
    const users = await sql`
      SELECT id, email, name, target_college, academic_year, notes
      FROM students
      WHERE id = ${session.studentId} OR LOWER(email) = ${session.email.toLowerCase()}
      LIMIT 1;
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "Học viên không tồn tại." }, { status: 404 });
    }

    const student = users[0];
    const examRecords = await sql`
      SELECT exam_id, subject_code, subject_title, score, max_score, completed_at
      FROM student_exam_records
      WHERE student_id = ${student.id} OR student_id = ${student.email}
      ORDER BY completed_at DESC;
    `;

    const token = extractTokenFromRequest(req);

    return NextResponse.json({
      success: true,
      token: token || undefined,
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Lỗi máy chủ";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
