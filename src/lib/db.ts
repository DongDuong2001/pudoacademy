import { neon } from "@neondatabase/serverless";

// Server-side only: never expose DATABASE_URL to client
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }
  return url;
};

export const getDb = () => {
  return neon(getDatabaseUrl());
};

// Helper to ensure database tables exist
export async function ensureTablesExist() {
  const sql = getDb();
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        target_college TEXT DEFAULT 'Trường Cao đẳng Kỹ thuật Công nghệ',
        academic_year TEXT DEFAULT 'K2026 - K2029',
        notes TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS student_exam_records (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        exam_id TEXT NOT NULL,
        subject_code TEXT NOT NULL,
        subject_title TEXT NOT NULL,
        score NUMERIC NOT NULL,
        max_score NUMERIC NOT NULL,
        completed_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS student_completed_lessons (
        student_id TEXT NOT NULL,
        lesson_slug TEXT NOT NULL,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY (student_id, lesson_slug)
      );
    `;
  } catch (error) {
    console.error("Failed to ensure tables exist in Neon:", error);
  }
}
