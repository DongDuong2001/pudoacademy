"use client";

import React from "react";
import { Subject } from "@/types/curriculum";
import { SUBJECT_KNOWLEDGE_MAP } from "../data/subjectDetailsData";
import {
  DiagramElectricalSafety,
  DiagramRefrigerationCycle,
  DiagramCopperFlaring,
  DiagramCompressorWiring,
  DiagramVacuumStation,
} from "./TechnicalDiagrams";
import { SchematicViewer } from "@/features/schematics/components/SchematicViewer";
import { SAMPLE_SCHEMATIC } from "../data/sampleDocData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Layers,
  Link as LinkIcon,
  Setting2,
  Calculator,
  ArrowRight,
  Award,
} from "reicon-react";

interface SubjectDetailViewProps {
  subject: Subject;
  onOpenLesson: (slug: string) => void;
  onTakeExam?: (subjectCode: string) => void;
  className?: string;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  onOpenLesson,
  onTakeExam,
  className,
}) => {
  const detail = SUBJECT_KNOWLEDGE_MAP[subject.id];

  const renderDiagram = () => {
    if (!detail) return null;
    switch (detail.diagramType) {
      case "ELECTRICAL_SAFETY":
        return <DiagramElectricalSafety />;
      case "REFRIGERATION_CYCLE":
        return <DiagramRefrigerationCycle />;
      case "COPPER_FLARING":
        return <DiagramCopperFlaring />;
      case "COMPRESSOR_WIRING":
        return <DiagramCompressorWiring />;
      case "VACUUM_STATION":
        return <DiagramVacuumStation />;
      case "INVERTER_PWM":
        return <SchematicViewer schematic={SAMPLE_SCHEMATIC} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-6 my-2 text-neutral-900 min-w-0 max-w-full", className)}>
      {/* 1. Subject Header */}
      <div className="p-4 bg-white border border-neutral-300 space-y-3 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-blue-950 text-white px-2 py-0.5 shrink-0">
              MÃ MÔN: {subject.code}
            </span>
            <Badge variant="neutral" size="sm">
              {subject.level}
            </Badge>
          </div>
          <span className="font-mono text-xs text-neutral-500 shrink-0">
            HỌC KỲ {subject.semester} • {subject.credits} TÍN CHỈ ({subject.lessons.length} HỌC PHẦN)
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-950 break-words">
            {subject.title}
          </h1>
          <p className="text-xs sm:text-sm text-blue-950 font-medium mt-1 break-words">
            ▶ {subject.tagline}
          </p>
        </div>

        {/* Why learn first callout */}
        <div className="p-3 bg-amber-50/80 border-l-4 border-l-amber-600 border border-amber-200 text-xs space-y-1">
          <span className="font-mono font-bold text-[11px] text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>VÌ SAO PHẢI HỌC MÔN NÀY ĐẦU TIÊN (ĐẶT MÓNG NỀN TẢNG)?</span>
          </span>
          <p className="text-neutral-900 leading-relaxed break-words">
            {subject.whyLearn}
          </p>
        </div>
      </div>

      {/* 2. SƠ ĐỒ KỸ THUẬT MINH HỌA (ANIMATED SCHEMATIC DIAGRAM) */}
      <div className="space-y-2 min-w-0">
        <div className="flex items-center justify-between gap-2 text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider border-b border-neutral-200 pb-1">
          <div className="flex items-center gap-1.5">
            <Setting2 className="w-4 h-4 text-blue-950" />
            <span>SƠ ĐỒ MINH HỌA KỸ THUẬT NGHỀ CHUYỂN ĐỘNG THỰC CHIẾN</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold hidden sm:inline">
            ● ĐANG MÔ PHỎNG DÒNG CHẢY
          </span>
        </div>

        {renderDiagram()}
      </div>

      {/* 3. CÔNG THỨC & TÍNH TOÁN HIỆN TRƯỜNG CHI TIẾT */}
      {detail && detail.formulas.length > 0 && (
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-300 pb-1">
            <Calculator className="w-4 h-4 text-blue-900" />
            <span>CÁC CÔNG THỨC TÍNH TOÁN CỐT LÕI (GIẢI THÍCH CHI TIẾT TỪNG BIẾN SỐ)</span>
          </div>

          <div className="space-y-4">
            {detail.formulas.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-neutral-300 space-y-3 min-w-0"
              >
                {/* Header formula name */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                  <span className="font-bold text-sm text-neutral-950 uppercase break-words">
                    {f.name}
                  </span>
                  <Badge variant="info" size="sm">
                    CÔNG THỨC #{idx + 1}
                  </Badge>
                </div>

                {/* Calculates what & when to use */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-blue-50/60 border border-blue-200">
                    <span className="font-bold text-blue-950 uppercase text-[10px] block mb-0.5">
                      MỤC ĐÍCH TÍNH TOÁN (TÍNH VỀ CÁI GÌ?):
                    </span>
                    <p className="text-neutral-800 leading-relaxed break-words">
                      {f.calculatesWhat}
                    </p>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 border border-amber-200">
                    <span className="font-bold text-amber-950 uppercase text-[10px] block mb-0.5">
                      KHI NÀO CẦN DÙNG NGOÀI CÔNG TRÌNH?:
                    </span>
                    <p className="text-neutral-800 leading-relaxed break-words">
                      {f.whenToUse}
                    </p>
                  </div>
                </div>

                {/* Expression banner */}
                <div className="p-2.5 bg-neutral-950 text-white font-mono font-bold text-xs sm:text-sm break-all text-center tracking-wide border border-neutral-800">
                  {f.expression}
                </div>

                {/* Variable Breakdown Table */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                      Ý NGHĨA VÀ ĐƠN VỊ CỦA TỪNG ĐẠI LƯỢNG:
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 sm:hidden">
                      ⟵ Vuốt ngang ⟶
                    </span>
                  </div>
                  <div className="overflow-x-auto border border-neutral-200 -webkit-overflow-scrolling-touch">
                    <table className="w-full text-xs text-left border-collapse min-w-[480px]">
                      <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-2 border-r border-neutral-200 w-20">KÝ HIỆU</th>
                          <th className="p-2 border-r border-neutral-200 w-1/3">TÊN ĐẠI LƯỢNG</th>
                          <th className="p-2 border-r border-neutral-200 w-24">ĐƠN VỊ</th>
                          <th className="p-2">Ý NGHĨA THỰC CHIẾN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 bg-white">
                        {f.variables.map((v, vIdx) => (
                          <tr key={vIdx} className="hover:bg-neutral-50">
                            <td className="p-2 font-mono font-bold text-blue-950 border-r border-neutral-200">
                              {v.symbol}
                            </td>
                            <td className="p-2 font-semibold text-neutral-900 border-r border-neutral-200">
                              {v.name}
                            </td>
                            <td className="p-2 font-mono text-neutral-700 border-r border-neutral-200">
                              {v.unit}
                            </td>
                            <td className="p-2 text-neutral-600">
                              {v.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Safe standard & Sample calculation */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2 bg-neutral-100 border-l-2 border-neutral-700 text-neutral-800">
                    <strong>Ngưỡng an toàn / Trị số bình thường:</strong> {f.safeStandard}
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-950 font-mono text-[11px] leading-relaxed break-words">
                    <strong>Ví dụ áp dụng thực tế:</strong> {f.sampleCalculation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. KIẾN THỨC CỐT LÕI (CORE THEORY) */}
      {detail && (
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-300 pb-1">
            <BookOpen className="w-4 h-4 text-blue-950" />
            <span>KIẾN THỨC KỸ THUẬT CHUYÊN SÂU CẦN NẮM VỮNG</span>
          </div>

          <div className="space-y-3 text-xs">
            {detail.coreTheory.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-neutral-300 space-y-2 min-w-0"
              >
                <h3 className="font-bold text-sm text-neutral-950 uppercase break-words">
                  {item.heading}
                </h3>
                {item.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-neutral-800 break-words">
                    {p}
                  </p>
                ))}
                <div className="p-2.5 bg-neutral-100 border-l-2 border-blue-900 space-y-1">
                  <span className="font-mono font-bold text-[10px] uppercase text-neutral-600 block">
                    ĐIỂM KỸ THUẬT CỐT LÕI:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-neutral-800">
                    {item.keyPoints.map((kp, kIdx) => (
                      <li key={kIdx} className="break-words">{kp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CÁC BƯỚC ĐO KIỂM THỰC HÀNH TẠI XƯỞNG */}
      {detail && detail.practicalSteps.length > 0 && (
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-300 pb-1">
            <CheckCircle className="w-4 h-4 text-blue-950" />
            <span>QUY TRÌNH THAO TÁC NGHỀ BƯỚC-THEO-BƯỚC</span>
          </div>

          <div className="space-y-2">
            {detail.practicalSteps.map((st) => (
              <div
                key={st.step}
                className="p-3 bg-white border border-neutral-300 text-xs space-y-1 min-w-0"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold bg-neutral-900 text-white px-1.5 py-0.5 text-[10px] shrink-0">
                    BƯỚC {st.step}
                  </span>
                  <span className="font-bold text-neutral-950 uppercase break-words">
                    {st.title}
                  </span>
                </div>
                <p className="text-neutral-800 break-words leading-relaxed pl-1">
                  {st.action}
                </p>
                <div className="font-mono text-[11px] text-blue-950 pl-1">
                  ➔ <strong>Kết quả tiêu chuẩn:</strong> {st.expectedResult}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAI NẠN NGHỀ NGHIỆP & LỖI THỢ MỚI THƯỜNG MẮC PHẢI */}
      {detail && detail.fieldPitfalls.length > 0 && (
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-700 uppercase tracking-wider border-b border-red-300 pb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>LỖI NGUY HIỂM THƯỜNG GẶP NGOÀI CÔNG TRÌNH & CÁCH PHÒNG TRÁNH</span>
          </div>

          <div className="space-y-2">
            {detail.fieldPitfalls.map((pf, idx) => (
              <div
                key={idx}
                className="p-3 bg-red-50/80 border-l-4 border-l-red-700 border border-red-200 text-xs space-y-1.5 min-w-0"
              >
                <div className="font-bold text-red-900 break-words">
                  ⚠️ Sai lầm: {pf.mistake}
                </div>
                <div className="text-neutral-800 break-words">
                  <strong>Hậu quả thực tế:</strong> {pf.consequence}
                </div>
                <div className="font-mono text-[11px] text-emerald-800 break-words">
                  ✓ <strong>Giải pháp chuẩn:</strong> {pf.prevention}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CHUỖI LIÊN KẾT MÔN SAU */}
      <div className="space-y-3 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-300 pb-1">
          <LinkIcon className="w-4 h-4 text-blue-950" />
          <span>MÔN HỌC NÀY MỞ KHÓA CHO CÁC MÔN TIẾP THEO NÀO?</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {subject.downstreamUnlocks.map((down, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-neutral-50 border border-neutral-300 text-xs flex items-start gap-2.5 min-w-0"
            >
              <ArrowRight className="w-4 h-4 text-blue-950 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1 break-words">
                <div className="font-mono font-bold text-neutral-950 flex flex-wrap items-center gap-1.5">
                  <span className="bg-neutral-200 px-1 text-[10px]">
                    {down.code}
                  </span>
                  <span>{down.name}</span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  ➔ <strong>Mối liên hệ thực tế:</strong> {down.relationship || down.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. DANH SÁCH BÀI HỌC CỤ THỂ */}
      <div className="space-y-3 pt-2 border-t border-neutral-300 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">
            CÁC HỌC PHẦN BÀI GIẢNG ({subject.lessons.length} BÀI):
          </span>
        </div>

        <div className="space-y-2">
          {subject.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-3 border border-neutral-300 bg-white flex flex-wrap items-center justify-between gap-2 min-w-0"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-blue-950">
                    [{lesson.code}]
                  </span>
                  <span className="text-xs font-bold text-neutral-950 break-words">
                    {lesson.title}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 break-words">
                  {lesson.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={
                    lesson.type === "WORKSHOP"
                      ? "warning"
                      : lesson.type === "PRACTICE"
                      ? "info"
                      : "neutral"
                  }
                  size="sm"
                >
                  {lesson.type} • {lesson.durationHours}H
                </Badge>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenLesson(lesson.slug)}
                  className="h-7 px-2.5 text-[10px] font-mono shrink-0"
                >
                  VÀO HỌC BÀI NÀY ➔
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. THI HẾT MÔN HỌC (COMPREHENSIVE EXAM CALLOUT) */}
      <div className="p-4 bg-blue-950 text-white space-y-3 border border-blue-900 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400">
                ĐÁNH GIÁ CHẤT LƯỢNG ĐẦU RA MÔN {subject.code}
              </span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              ĐỀ THI HẾT MÔN: {subject.title}
            </h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Bao gồm Trắc nghiệm hiện trường, Tự luận Toán kỹ thuật từng bước và Phân tích Sơ đồ mạch điện vật lý.
            </p>
          </div>

          {onTakeExam && (
            <Button
              variant="outline"
              size="md"
              onClick={() => onTakeExam(subject.code)}
              className="bg-white text-blue-950 border-white hover:bg-neutral-100 font-mono font-bold text-xs shrink-0"
            >
              LÀM ĐỀ THI HẾT MÔN ({subject.code}) ➔
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
