"use client";

import React, { useState } from "react";
import { COLLEGE_CURRICULUM_DATA } from "../data/collegeCurriculum";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, GraduationCap, FileText, Search, Sparkles, CloseCircle, BookOpen, CheckCircle, Activity, Calculator } from "reicon-react";

interface SidebarProps {
  activeSlug: string;
  onSelectSlug: (slug: string) => void;
  onOpenCurriculumOverview?: () => void;
  onOpenLanding?: () => void;
  onCloseMobile?: () => void;
  isCurriculumMode?: boolean;
  isLandingMode?: boolean;
  completedLessons?: string[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSlug,
  onSelectSlug,
  onOpenCurriculumOverview,
  onOpenLanding,
  onCloseMobile,
  isCurriculumMode,
  isLandingMode,
  completedLessons = [],
  className,
}) => {
  const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  const toggleSemester = (semNum: number) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [semNum]: !prev[semNum],
    }));
  };

  const handleSelect = (slug: string) => {
    onSelectSlug(slug);
    onCloseMobile?.();
  };

  return (
    <aside
      className={cn(
        "w-64 lg:w-72 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto bg-neutral-100 border-r border-neutral-300 p-2.5 select-none",
        className
      )}
    >
      {/* Mobile Drawer Header */}
      {onCloseMobile && (
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-300 md:hidden">
          <span className="font-mono text-xs font-black uppercase text-blue-950 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-900" />
            <span>DANH MỤC GIÁO TRÌNH</span>
          </span>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 border border-neutral-300 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
            title="Đóng danh mục"
          >
            <CloseCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Actions: Landing Page & Curriculum Roadmap */}
      <div className="mb-3 space-y-1">
        {onOpenLanding && (
          <button
            type="button"
            onClick={() => {
              onOpenLanding();
              onCloseMobile?.();
            }}
            className={cn(
              "w-full text-left p-2 border font-mono text-xs font-bold transition-none flex items-center justify-between min-w-0 cursor-pointer",
              isLandingMode
                ? "bg-blue-950 text-white border-blue-950"
                : "bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-200/50"
            )}
          >
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="uppercase truncate">TRANG CHỦ GIỚI THIỆU</span>
            </div>
            <span className="text-[10px] bg-neutral-200 text-neutral-800 px-1 shrink-0 ml-1">
              HOME
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            onOpenCurriculumOverview?.();
            onCloseMobile?.();
          }}
          className={cn(
            "w-full text-left p-2 border font-mono text-xs font-bold transition-none flex items-center justify-between min-w-0 cursor-pointer",
            isCurriculumMode
              ? "bg-blue-950 text-white border-blue-950"
              : "bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-200/50"
          )}
        >
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="uppercase truncate">BẢN ĐỒ MÔN HỌC (3 NĂM)</span>
          </div>
          <span className="text-[10px] bg-neutral-200 text-neutral-800 px-1 shrink-0 ml-1">
            6 KỲ
          </span>
        </button>
      </div>

      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2 px-1 flex items-center justify-between">
        <span>GIÁO TRÌNH THEO HỌC KỲ</span>
        <span className="text-[9px] bg-neutral-200 px-1 py-0.5">3 NĂM</span>
      </div>

      {/* Semesters & Subjects Navigation */}
      <nav className="space-y-3">
        {COLLEGE_CURRICULUM_DATA.map((sem) => {
          const isOpen = openSemesters[sem.semesterNumber];
          return (
            <div key={sem.semesterNumber} className="space-y-1">
              {/* Semester header */}
              <button
                type="button"
                onClick={() => toggleSemester(sem.semesterNumber)}
                className="w-full text-left text-xs font-bold text-neutral-900 uppercase tracking-tight px-2 py-1.5 bg-neutral-200/70 border-l-2 border-neutral-400 flex items-center justify-between min-w-0"
              >
                <span className="truncate min-w-0 flex-1 pr-1">
                  KỲ {sem.semesterNumber}: {sem.focusTheme.split(":")[0]}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                )}
              </button>

              {/* Subjects in this semester */}
              {isOpen && (
                <div className="space-y-2 pl-1 mt-1">
                  {sem.subjects.map((subj) => (
                    <div key={subj.id} className="space-y-0.5 min-w-0">
                      <div className="text-[10px] font-mono font-bold text-neutral-600 px-1.5 py-0.5 flex items-center justify-between min-w-0 gap-1">
                        <span className="truncate min-w-0 flex-1">
                          {subj.code}: {subj.title.split("&")[0].trim()}
                        </span>
                        <span className="text-[9px] opacity-70 shrink-0">{subj.credits}TC</span>
                      </div>

                      {/* Lessons list */}
                      <ul className="space-y-0.5 min-w-0">
                        {subj.lessons.map((lesson) => {
                          const isActive = !isCurriculumMode && activeSlug === lesson.slug;
                          return (
                            <li key={lesson.id} className="min-w-0">
                              <button
                                type="button"
                                onClick={() => handleSelect(lesson.slug)}
                                className={cn(
                                  "w-full text-left text-xs px-2 py-1.5 flex items-center justify-between transition-none border-l-2 min-w-0 cursor-pointer",
                                  isActive
                                    ? "bg-white text-blue-950 font-bold border-blue-950 border-t border-b border-r border-neutral-300"
                                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 border-transparent"
                                )}
                              >
                                <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-1 truncate">
                                  {completedLessons.includes(lesson.slug) ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  ) : (
                                    <span className="font-mono text-[10px] opacity-70 shrink-0">
                                      {lesson.code}
                                    </span>
                                  )}
                                  <span className={cn("truncate min-w-0 flex-1", completedLessons.includes(lesson.slug) && "text-emerald-950 font-medium")}>
                                    {lesson.title}
                                  </span>
                                </div>

                                {lesson.type === "WORKSHOP" && (
                                  <Badge variant="warning" size="sm" className="text-[8px] px-1 py-0 shrink-0">
                                    XƯỞNG
                                  </Badge>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Quick Tools Section */}
        <div className="pt-2 border-t border-neutral-300 space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 px-1">
            CÔNG CỤ NGOÀI HIỆN TRƯỜNG
          </div>
          <button
            type="button"
            onClick={() => handleSelect("field-tools/cheatsheet")}
            className="w-full text-left text-xs p-1.5 bg-amber-50/70 border border-amber-300 hover:bg-amber-100 flex items-center gap-2 min-w-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="font-bold text-neutral-900 truncate">
              Sổ tay Cheatsheet Kỹ thuật
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelect("field-tools/diagnostic-wizard")}
            className="w-full text-left text-xs p-1.5 bg-neutral-50 border border-neutral-300 hover:bg-neutral-200/50 flex items-center gap-2 min-w-0 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-red-700 shrink-0" />
            <span className="font-medium text-neutral-900 truncate">
              Cây bắt bệnh không mã lỗi
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelect("field-tools/piping-sizer")}
            className="w-full text-left text-xs p-1.5 bg-neutral-50 border border-neutral-300 hover:bg-neutral-200/50 flex items-center gap-2 min-w-0 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="font-medium text-neutral-900 truncate">
              Thước tính ống đồng & Bẫy dầu
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelect("field-tools/error-lookup")}
            className="w-full text-left text-xs p-1.5 bg-neutral-50 border border-neutral-300 hover:bg-neutral-200/50 flex items-center gap-2 min-w-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="font-medium text-neutral-900 truncate">
              Tra nhanh mã lỗi Inverter
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelect("field-tools/pt-chart")}
            className="w-full text-left text-xs p-1.5 bg-neutral-50 border border-neutral-300 hover:bg-neutral-200/50 flex items-center gap-2 min-w-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <span className="font-medium text-neutral-900 truncate">
              Bảng P-T Chart Gas R32/R410A
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
