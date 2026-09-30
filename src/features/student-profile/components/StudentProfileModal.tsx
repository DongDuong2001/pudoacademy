"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/types/student";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  CloseCircle,
  CheckCircle,
  GraduationCap,
  Profile as ProfileIcon,
  Sms,
} from "reicon-react";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  readinessPercent: number;
  isLoggedIn?: boolean;
  onUpdateProfile: (name: string, targetSchool: string, notes?: string, academicYear?: string) => void;
  onResetProgress: () => void;
  onLogout?: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  readinessPercent,
  isLoggedIn = false,
  onUpdateProfile,
  onResetProgress,
  onLogout,
}) => {
  // Form states initialized directly from current profile
  const [name, setName] = useState(profile.name);
  const [targetSchool, setTargetSchool] = useState(profile.targetSchool);
  const [notes, setNotes] = useState(profile.notes);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, targetSchool, notes, profile.academicYear);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-neutral-900/60 backdrop-blur-xs select-none">
      <div className="bg-white border-2 border-neutral-900 max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-5 shadow-none font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5 uppercase">
                GÓC HỌC TẬP CÁ NHÂN
              </span>
              {isLoggedIn ? (
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-700" />
                  TÀI KHOẢN ĐÃ ĐỒNG BỘ
                </span>
              ) : (
                <Badge variant="warning" size="sm">
                  DỮ LIỆU MÁY CỤC BỘ
                </Badge>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
              Hồ Sơ Học Viên & Hành Trang Nhập Học
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

        {/* Readiness Progress Bar */}
        <div className="p-4 bg-neutral-100 border border-neutral-300 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-neutral-900 uppercase">
              MỨC ĐỘ SẴN SÀNG NHẬP HỌC CHÍNH QUY:
            </span>
            <span className="font-black text-blue-950 text-sm">
              {readinessPercent}% HOÀN THÀNH
            </span>
          </div>

          <div className="w-full h-3 bg-neutral-200 border border-neutral-400 overflow-hidden">
            <div
              className="h-full bg-blue-950 transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="p-2 bg-neutral-100 border border-neutral-200">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">BÀI GIẢNG ĐÃ TÍCH</span>
              <strong className="text-sm font-mono text-blue-950 font-black">
                {profile.completedLessons.length} / 18
              </strong>
            </div>
            <div className="p-2 bg-neutral-100 border border-neutral-200">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">THẺ PHẢN XẠ THUỘC</span>
              <strong className="text-sm font-mono text-amber-700 font-black">
                {profile.masteredFlashcards.length} THẺ
              </strong>
            </div>
            <div className="p-2 bg-neutral-100 border border-neutral-200">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">ĐỀ THI ĐÃ QUA</span>
              <strong className="text-sm font-mono text-emerald-700 font-black">
                {profile.examRecords.filter((r) => r.score / r.maxScore >= 0.6).length} MÔN
              </strong>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <ProfileIcon className="w-3.5 h-3.5" />
                <span>HỌ VÀ TÊN HỌC VIÊN:</span>
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-9 text-xs"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>TRƯỜNG MỤC TIÊU NHẬP HỌC:</span>
              </label>
              <Input
                type="text"
                value={targetSchool}
                onChange={(e) => setTargetSchool(e.target.value)}
                required
                className="h-9 text-xs"
                placeholder="Trường Cao đẳng Kỹ thuật Công nghệ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <Sms className="w-3.5 h-3.5" />
                <span>EMAIL HỌC VIÊN:</span>
              </label>
              <Input
                type="email"
                value={profile.email || "Tài khoản học tập cục bộ"}
                disabled
                className="h-9 text-xs bg-neutral-100 text-neutral-600 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs font-bold text-neutral-700 block flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>CHƯƠNG TRÌNH HUẤN LUYỆN:</span>
              </label>
              <Input
                type="text"
                value="Kỹ Thuật Nhiệt - Điện Lạnh (Hệ 3 Năm)"
                disabled
                className="h-9 text-xs bg-neutral-100 text-neutral-600 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs font-bold text-neutral-700 block">
              MỤC TIÊU & GHI CHÚ RÈN LUYỆN:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 font-sans text-xs border border-neutral-300 focus:border-neutral-900 outline-none leading-relaxed"
              placeholder="Ghi lại mục tiêu học tập..."
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="font-mono text-xs"
              >
                LƯU THAY ĐỔI
              </Button>
              {isSaved && (
                <span className="font-mono text-xs text-emerald-700 flex items-center gap-1 font-bold">
                  <CheckCircle className="w-4 h-4" /> ĐÃ LƯU!
                </span>
              )}
            </div>

            {isLoggedIn && onLogout && (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="font-mono text-xs text-red-700 hover:text-red-900 underline"
              >
                Đăng xuất tài khoản
              </button>
            )}
          </div>
        </form>

        {/* Exam Records History */}
        <div className="space-y-2 border-t border-neutral-200 pt-3">
          <span className="font-mono font-bold text-xs text-neutral-900 uppercase block">
            LỊCH SỬ KẾT QUẢ CÁC ĐỀ THI HẾT MÔN:
          </span>

          {profile.examRecords.length === 0 ? (
            <div className="p-3 bg-neutral-50 border border-neutral-200 text-neutral-500 text-xs text-center font-mono">
              Chưa có bài thi nào được ghi nhận. Hãy vào mục &quot;Thi hết môn&quot; để làm đề kiểm tra.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {profile.examRecords.map((r, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-neutral-50 border border-neutral-300 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-950">{r.subjectCode}</span>
                      <span className="text-neutral-800 font-sans font-semibold">
                        {r.subjectTitle}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      Hoàn thành: {new Date(r.completedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm text-neutral-950">
                      {r.score} / {r.maxScore}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-bold">
                      {Math.round((r.score / r.maxScore) * 100)}% ĐIỂM
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone: Reset */}
        <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-xs">
          <span className="text-neutral-500 font-mono text-[11px]">
            Xóa toàn bộ tiến độ và điểm số trên máy
          </span>
          <button
            type="button"
            onClick={() => {
              if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ ôn tập và điểm thi không?")) {
                onResetProgress();
                onClose();
              }
            }}
            className="text-red-700 hover:text-red-900 font-mono text-[11px] underline"
          >
            ĐẶT LẠI TIẾN ĐỘ
          </button>
        </div>
      </div>
    </div>
  );
};
