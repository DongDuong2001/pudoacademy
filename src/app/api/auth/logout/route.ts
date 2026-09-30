import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Đăng xuất thành công khỏi hệ thống.",
  });

  // Clear HTTPOnly cookie
  response.cookies.set({
    ...AUTH_COOKIE_OPTIONS,
    name: AUTH_COOKIE_NAME,
    value: "",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
