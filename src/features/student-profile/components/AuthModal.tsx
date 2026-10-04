"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  CloseCircle,
  Lock,
  Sms,
  Profile as ProfileIcon,
  ArrowRight,
} from "reicon-react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const REMEMBER_KEY = "pudo_remember_login";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "LOGIN" | "REGISTER";
  onSuccess: () => void;
  onGuestPreview?: () => void;
  onRegisterWithNeon: (
    email: string,
    password: string,
    name: string,
    targetCollege?: string,
    academicYear?: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; message?: string }>;
  onLoginWithNeon: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; message?: string }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = "LOGIN",
  onSuccess,
  onGuestPreview,
  onRegisterWithNeon,
  onLoginWithNeon,
}) => {
  const [activeTab, setActiveTab] = useState<"LOGIN" | "REGISTER">(initialTab);

  // Form fields with lazy initializers
  const [email, setEmail] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) return parsed.email;
      }
    } catch {}
    return "";
  });
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Official React 19 pattern: Adjust state when props change during render
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setActiveTab(initialTab);
      setErrorMessage(null);
      setSuccessMessage(null);
      setShowPassword(false);
    }
  }

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const res = await onLoginWithNeon(email, password, rememberMe);
    setIsLoading(false);

    if (res.success) {
      // Save or remove remembered email
      try {
        if (rememberMe && email.trim()) {
          localStorage.setItem(
            REMEMBER_KEY,
            JSON.stringify({ email: email.trim(), remember: true })
          );
        } else {
          localStorage.removeItem(REMEMBER_KEY);
        }
      } catch {}

      setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng vào Dashboard...");
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 700);
    } else {
      setErrorMessage(res.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const res = await onRegisterWithNeon(
      email,
      password,
      fullName || "Học viên Pudo",
      undefined,
      undefined,
      rememberMe
    );
    setIsLoading(false);

    if (res.success) {
      try {
        if (rememberMe && email.trim()) {
          localStorage.setItem(
            REMEMBER_KEY,
            JSON.stringify({ email: email.trim(), remember: true })
          );
        } else {
          localStorage.removeItem(REMEMBER_KEY);
        }
      } catch {}

      setSuccessMessage("Tạo tài khoản học viên thành công! Đang mở Dashboard...");
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 700);
    } else {
      setErrorMessage(res.message || "Đăng ký không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-neutral-900/60 backdrop-blur-xs select-none">
      <div className="bg-white border-2 border-neutral-900 max-w-md w-full p-5 sm:p-6 space-y-5 shadow-none font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5 uppercase">
                PUDO ACADEMY
              </span>
              <span className="font-mono text-[10px] bg-neutral-100 text-neutral-800 border border-neutral-300 px-1.5 py-0.2 font-bold">
                CỔNG HỌC VIÊN
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
              {activeTab === "LOGIN" ? "Đăng Nhập Tài Khoản" : "Đăng Ký Học Viên Mới"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-600 cursor-pointer"
            title="Đóng cửa sổ"
          >
            <CloseCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Only 2 tabs (ĐĂNG NHẬP & ĐĂNG KÝ) */}
        <div className="flex border-b border-neutral-300 gap-1 bg-neutral-100 p-1 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("LOGIN");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={cn(
              "flex-1 py-1.5 px-3 text-center transition-none border",
              activeTab === "LOGIN"
                ? "bg-white text-neutral-950 border-neutral-400 font-black shadow-xs"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            )}
          >
            1. ĐĂNG NHẬP
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("REGISTER");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={cn(
              "flex-1 py-1.5 px-3 text-center transition-none border",
              activeTab === "REGISTER"
                ? "bg-white text-neutral-950 border-neutral-400 font-black shadow-xs"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            )}
          >
            2. ĐĂNG KÝ
          </button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-300 text-red-900 text-xs font-mono">
            ⚠️ {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono">
            ✅ {successMessage}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: ĐĂNG NHẬP                                              */}
        {/* ============================================================== */}
        {activeTab === "LOGIN" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Đăng nhập để vào ngay <strong>Dashboard Học Viên</strong>, khôi phục điểm thi và lịch sử rèn luyện cá nhân trên hệ thống học viện.
            </p>

            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <Sms className="w-3.5 h-3.5" />
                <span>EMAIL HỌC VIÊN:</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 text-xs"
                placeholder="hocvien@pudo.edu.vn"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>MẬT KHẨU:</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="font-mono text-[11px] text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer focus:outline-none"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-blue-900" />
                      <span>Ẩn mật khẩu</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Hiện mật khẩu</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-9 text-xs pr-10 font-mono"
                  placeholder="Nhập mật khẩu..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-0.5 cursor-pointer focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-blue-950" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-700 hover:text-neutral-950 font-mono text-[11px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-none border border-neutral-400 text-blue-950 focus:ring-0 cursor-pointer accent-blue-950"
                />
                <span>Ghi nhớ đăng nhập trên thiết bị này</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">
                Cookie HTTPOnly
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading}
                className="w-full font-mono text-xs font-bold bg-blue-950 hover:bg-neutral-900 text-white flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP VÀO DASHBOARD"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("REGISTER");
                  setErrorMessage(null);
                }}
                className="text-center font-mono text-xs text-blue-900 underline hover:text-blue-950 mt-1"
              >
                Chưa có tài khoản? Bấm vào đây để đăng ký ➔
              </button>
            </div>
          </form>
        ) : (
          /* ============================================================== */
          /* TAB 2: ĐĂNG KÝ HỌC VIÊN                                         */
          /* ============================================================== */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tạo tài khoản để sở hữu <strong>Dashboard Cá Nhân</strong>. Thông tin hồ sơ chi tiết (trường mục tiêu, ghi chú rèn luyện) có thể cập nhật bất kỳ lúc nào bên trong Dashboard.
            </p>

            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <ProfileIcon className="w-3.5 h-3.5" />
                <span>HỌ VÀ TÊN HỌC VIÊN:</span>
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-9 text-xs"
                placeholder="Ví dụ: Hoàng Minh Đức"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <Sms className="w-3.5 h-3.5" />
                <span>EMAIL:</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 text-xs"
                placeholder="duc.hm@gmail.com"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>MẬT KHẨU (TỐI THIỂU 6 KÝ TỰ):</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="font-mono text-[11px] text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer focus:outline-none"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-blue-900" />
                      <span>Ẩn mật khẩu</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Hiện mật khẩu</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-9 text-xs pr-10 font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-0.5 cursor-pointer focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-blue-950" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-700 hover:text-neutral-950 font-mono text-[11px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-none border border-neutral-400 text-blue-950 focus:ring-0 cursor-pointer accent-blue-950"
                />
                <span>Ghi nhớ đăng nhập trên thiết bị này</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">
                Cookie HTTPOnly
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading}
                className="w-full font-mono text-xs font-bold bg-blue-950 hover:bg-neutral-900 text-white flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "ĐANG TẠO TÀI KHOẢN..." : "TẠO TÀI KHOẢN & VÀO HỌC NGAY"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("LOGIN");
                  setErrorMessage(null);
                }}
                className="text-center font-mono text-xs text-blue-900 underline hover:text-blue-950 mt-1"
              >
                Đã có tài khoản? Bấm vào đây để đăng nhập ➔
              </button>
            </div>
          </form>
        )}

        {onGuestPreview && (
          <div className="border-t border-neutral-200 pt-3 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                onGuestPreview();
              }}
              className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
            >
              Hoặc xem thử nội dung với tư cách khách (không lưu điểm) ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
