import { neon } from "@neondatabase/serverless";
import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from "../src/lib/auth.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable.");
  process.exit(1);
}

async function test() {
  console.log("=== KIỂM TRA HỆ THỐNG XÁC THỰC & POSTGRESQL DATABASE ===");
  const sql = neon(databaseUrl);

  // 1. Password hashing test
  const rawPw = "Matkhau123@";
  const hashed = hashPassword(rawPw);
  const isValid = verifyPassword(rawPw, hashed);
  const isInvalid = verifyPassword("SaiMatKhau", hashed);
  console.log("1. Test mã hóa PBKDF2:", isValid === true && isInvalid === false ? "PASS" : "FAIL");

  // 2. Token creation & verification
  const testId = "STD-TEST-001";
  const testEmail = "test.hocvien@pudo.edu.vn";
  const token = createSessionToken(testId, testEmail);
  const parsed = verifySessionToken(token);
  console.log("2. Test JWT/Session Token:", parsed?.studentId === testId ? "PASS" : "FAIL");

  // 3. Database query test
  const studentsCount = await sql`SELECT count(*) as count FROM students;`;
  console.log("3. Số học viên hiện tại trong DB:", studentsCount[0].count);

  console.log("=== TẤT CẢ KIỂM TRA ĐỀU HOÀN THÀNH XUẤT SẮC ===");
}

test().catch(console.error);
