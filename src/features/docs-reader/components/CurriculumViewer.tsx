"use client";

import React, { useState } from "react";
import { COLLEGE_CURRICULUM_DATA } from "../data/collegeCurriculum";
import { SubjectDetailView } from "./SubjectDetailView";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { GraduationCap } from "reicon-react";

interface CurriculumViewerProps {
  onOpenLesson: (slug: string) => void;
  onTakeExam?: (subjectCode: string) => void;
  className?: string;
}

export const CurriculumViewer: React.FC<CurriculumViewerProps> = ({
  onOpenLesson,
  onTakeExam,
  className,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("dl-101");

  const currentSemester =
    COLLEGE_CURRICULUM_DATA.find((s) => s.semesterNumber === selectedSemester) ||
    COLLEGE_CURRICULUM_DATA[0];

  const currentSubject =
    COLLEGE_CURRICULUM_DATA.flatMap((s) => s.subjects).find(
      (sub) => sub.id === selectedSubjectId
    ) || currentSemester.subjects[0];

  return (
    <div className={cn("space-y-6 my-4 w-full min-w-0", className)}>
      {/* Overview Banner */}
      <div className="p-4 bg-neutral-100 border border-neutral-300">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-300 pb-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 bg-blue-950 text-white font-mono font-bold text-xs shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-mono font-bold text-xs sm:text-sm text-neutral-950 uppercase tracking-wider truncate">
                CHƯƠNG TRÌNH CAO ĐẲNG NGHỀ KỸ THUẬT ĐIỆN LẠNH
              </h2>
              <p className="text-[11px] text-neutral-500 truncate">
                Sơ đồ mắt xích: Môn cơ sở ➔ Thiết bị ➔ Biến tần Inverter ➔ Chẩn đoán lỗi
              </p>
            </div>
          </div>
          <Badge variant="info" size="sm" className="shrink-0">
            HỆ CAO ĐẲNG 3 NĂM
          </Badge>
        </div>

        {/* 3 Academic Years (6 Semesters) Grouping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((year) => {
            const semestersInYear = COLLEGE_CURRICULUM_DATA.filter((s) => s.yearNumber === year);
            const isYearActive = semestersInYear.some((s) => s.semesterNumber === selectedSemester);
            const yearTitle =
              year === 1
                ? "NĂM 1: ĐẶT MÓNG NỀN TẢNG"
                : year === 2
                ? "NĂM 2: DÂN DỤNG & BO BIẾN TẦN"
                : "NĂM 3: VRV, KHO LẠNH & ĐỒ ÁN";
            const yearSubtitle =
              year === 1
                ? "Vật lý nhiệt, An toàn điện & Gia công cơ khí"
                : year === 2
                ? "Tủ lạnh xả đá, Lắp đặt máy & Khối công suất IPM"
                : "Hệ trung tâm VRV/VRF, BMS & Tốt nghiệp";

            return (
              <div
                key={year}
                className={cn(
                  "border p-3 space-y-2.5 transition-none",
                  isYearActive
                    ? "border-blue-950 bg-blue-50/20"
                    : "border-neutral-300 bg-white"
                )}
              >
                <div className="border-b border-neutral-200 pb-2">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "font-mono text-xs font-black uppercase px-1.5 py-0.5",
                        isYearActive ? "bg-blue-950 text-white" : "bg-neutral-200 text-neutral-800"
                      )}
                    >
                      {yearTitle}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      6 MÔN HỌC
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-1 font-sans">
                    {yearSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {semestersInYear.map((sem) => {
                    const isSelected = selectedSemester === sem.semesterNumber;
                    return (
                      <button
                        key={sem.semesterNumber}
                        type="button"
                        onClick={() => {
                          setSelectedSemester(sem.semesterNumber);
                          setSelectedSubjectId(sem.subjects[0].id);
                        }}
                        className={cn(
                          "p-2 text-left border transition-none select-none min-w-0 flex flex-col justify-between min-h-[76px] h-auto cursor-pointer",
                          isSelected
                            ? "bg-blue-950 text-white border-blue-950 shadow-none font-bold"
                            : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                        )}
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="font-mono text-xs font-bold">KỲ {sem.semesterNumber}</span>
                          <span className="text-[9px] font-mono opacity-80 shrink-0">
                            {sem.subjects.length} MÔN
                          </span>
                        </div>
                        <div className="text-[10px] line-clamp-2 leading-tight break-words font-medium mt-1">
                          {sem.focusTheme}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Left Subjects List, Right Subject Deep-dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-w-0">
        {/* Left Column: Subjects in this semester */}
        <div className="lg:col-span-4 space-y-2 min-w-0">
          <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider px-1">
            DANH SÁCH MÔN HỌC KỲ {currentSemester.semesterNumber}:
          </div>

          <div className="space-y-2">
            {currentSemester.subjects.map((subj) => {
              const isCurrent = currentSubject.id === subj.id;
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      const detailEl = document.getElementById("subject-detail-section");
                      if (detailEl) {
                        detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className={cn(
                    "w-full text-left p-3 border transition-none select-none flex flex-col gap-1 min-w-0 overflow-hidden cursor-pointer",
                    isCurrent
                      ? "bg-white border-blue-950 border-l-4 shadow-none"
                      : "bg-neutral-50 border-neutral-300 hover:bg-neutral-100"
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono font-bold text-xs bg-neutral-200 text-neutral-800 px-1.5 py-0.5">
                      {subj.code}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 shrink-0">
                      {subj.credits} TÍN CHỈ
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-neutral-950 uppercase leading-snug break-words">
                    {subj.title}
                  </h3>
                  <p className="text-[10px] text-neutral-600 line-clamp-2 break-words">
                    {subj.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Breakdown of Selected Subject with Schematics */}
        <div id="subject-detail-section" className="lg:col-span-8 min-w-0 scroll-mt-16">
          <SubjectDetailView
            subject={currentSubject}
            onOpenLesson={onOpenLesson}
            onTakeExam={onTakeExam}
          />
        </div>
      </div>
    </div>
  );
};
