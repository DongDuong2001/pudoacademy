"use client";

import React from "react";
import { StudentProfile } from "@/types/student";
import { cn } from "@/lib/utils";

interface StudentHeaderBadgeProps {
  profile: StudentProfile;
  readinessPercent: number;
  onOpenModal: () => void;
  className?: string;
}

export const StudentHeaderBadge: React.FC<StudentHeaderBadgeProps> = ({
  profile,
  readinessPercent,
  onOpenModal,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onOpenModal}
      className={cn(
        "flex items-center gap-2 border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 p-1 sm:px-2.5 sm:py-1 transition-none font-mono text-left shrink-0",
        className
      )}
      title="Bấm để xem và chỉnh sửa thông tin hành trang học tập"
    >
      <div className="relative">
        <div className="w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        {profile.isCloudSynced && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white"
            title="Dữ liệu học tập đã đồng bộ"
          />
        )}
      </div>

      <div className="hidden sm:flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-bold text-[11px] text-neutral-900 truncate max-w-[110px]">
            {profile.name}
          </span>
          <span className="text-[9px] px-1 py-0.2 bg-emerald-100 text-emerald-800 font-bold leading-none">
            {readinessPercent}%
          </span>
        </div>
        <span className="text-[9px] text-neutral-500 truncate leading-none mt-0.5">
          {profile.isCloudSynced ? "Đã đồng bộ" : "Hành trang tiền đề"}
        </span>
      </div>
    </button>
  );
};
