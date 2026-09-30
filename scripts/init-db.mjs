import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable.");
  process.exit(1);
}

async function main() {
  console.log("Connecting to PostgreSQL...");
  const sql = neon(databaseUrl);
  
  // Test query
  const result = await sql`SELECT NOW() as current_time, version() as version;`;
  console.log("Successfully connected to Database!", result);

  // Initialize tables
  console.log("Creating students table if not exists...");
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

  console.log("Creating student_exam_records table if not exists...");
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

  console.log("Creating student_completed_lessons table if not exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS student_completed_lessons (
      student_id TEXT NOT NULL,
      lesson_slug TEXT NOT NULL,
      completed_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (student_id, lesson_slug)
    );
  `;

  console.log("Database tables initialized successfully!");
}

main().catch((err) => {
  console.error("Database initialization error:", err);
  process.exit(1);
});
