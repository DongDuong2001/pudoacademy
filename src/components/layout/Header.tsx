"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Printer, Sparkles, Menu, BookOpen } from "reicon-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StudentProfile } from "@/types/student";
import { StudentHeaderBadge } from "@/features/student-profile/components/StudentHeaderBadge";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearchSubmit?: (query: string) => void;
  currentSearch?: string;
  studentProfile?: StudentProfile;
  readinessPercent?: number;
  onOpenProfileModal?: () => void;
  onGoHome?: () => void;
  onExitToLanding?: () => void;
  onToggleMobileSidebar?: () => void;
  onOpenCheatsheet?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchSubmit,
  currentSearch = "",
  studentProfile,
  readinessPercent = 0,
  onOpenProfileModal,
  onGoHome,
  onExitToLanding,
  onToggleMobileSidebar,
  onOpenCheatsheet,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== "undefined" && "onLine" in navigator) {
      return navigator.onLine;
    }
    return true;
  });

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-white border-b border-neutral-300 flex items-center justify-between px-2.5 sm:px-6 gap-2 select-none">
      {/* Brand with Circular Logo & Mobile Menu Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink-0">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 shrink-0 cursor-pointer"
            title="Mở danh mục môn học"
            aria-label="Mở danh mục môn học"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div
          onClick={onGoHome}
          className={cn(
            "flex items-center gap-2 min-w-0 select-none",
            onGoHome && "cursor-pointer hover:opacity-85 transition-opacity"
          )}
          title="Trang chủ Pudo Academy"
        >
          <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-neutral-300 overflow-hidden bg-white shrink-0 flex items-center justify-center p-0.5">
            <Image
              src="/logo/pudo_academy_logo_round.png"
              alt="PUDO ACADEMY"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider text-neutral-950 uppercase leading-none truncate">
                PUDO ACADEMY
              </span>
              <span className="hidden sm:inline-block text-[9px] px-1 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold leading-none shrink-0">
                TIỀN ĐỀ CHÍNH QUY
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-mono text-neutral-500 uppercase tracking-tight leading-none mt-1 truncate">
              Hành trang nghề • Ôn luyện trước khi vào trường
            </span>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-sm sm:max-w-md mx-1 sm:mx-4 min-w-0">
        <div className="relative flex items-center w-full min-w-0">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tra mã lỗi (U4, L5, H11...) hoặc từ khóa..."
            className="h-8 pl-8 pr-2 text-xs font-mono border-neutral-400 focus:border-blue-950 w-full truncate bg-neutral-50"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-neutral-500 pointer-events-none shrink-0" />
        </div>
      </form>

      {/* Actions (Exit to Landing, Student Profile Badge & Print) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {!isOnline && (
          <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-400 px-2 py-1">
            ⚡ NGOẠI TUYẾN (CACHE)
          </span>
        )}
        {onExitToLanding && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExitToLanding}
            className="h-8 px-2 sm:px-2.5 text-[11px] font-mono flex items-center gap-1 border-neutral-400 text-neutral-800"
            title="Quay lại trang giới thiệu Landing Page"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">TRANG GIỚI THIỆU</span>
          </Button>
        )}

        {onOpenCheatsheet && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenCheatsheet}
            className="h-8 px-2 sm:px-2.5 text-[11px] font-mono flex items-center gap-1 border-neutral-400 text-neutral-900 bg-amber-50/70 hover:bg-amber-100"
            title="Mở Sổ tay tra cứu kỹ thuật nhanh Cheatsheet"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-900" />
            <span className="hidden sm:inline">CHEATSHEET</span>
          </Button>
        )}

        {studentProfile && onOpenProfileModal && (
          <StudentHeaderBadge
            profile={studentProfile}
            readinessPercent={readinessPercent}
            onOpenModal={onOpenProfileModal}
          />
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="h-8 px-2 sm:px-2.5 text-[11px] font-mono flex items-center gap-1"
          title="In tài liệu kỹ thuật"
        >
          <Printer className="w-3.5 h-3.5 text-neutral-700" />
          <span className="hidden sm:inline">IN</span>
        </Button>
      </div>
    </header>
  );
};
