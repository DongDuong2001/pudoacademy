"use client";

import React, { useState } from "react";
import { COLLEGE_CURRICULUM_DATA } from "../data/collegeCurriculum";
import { getDetailedLessonArticle } from "../data/detailedLessonArticles";
import { CircuitDiagramRenderer } from "./CircuitDiagramRenderer";
import { SafetyCallout } from "@/features/schematics/components/SafetyCallout";
import { SchematicViewer } from "@/features/schematics/components/SchematicViewer";
import { SpecsTable } from "@/features/calculations/components/SpecsTable";
import { PTChartLookup } from "@/features/calculations/components/PTChartLookup";
import { ErrorCodeSearch } from "@/features/diagnostics/components/ErrorCodeSearch";
import { TableOfContents } from "./TableOfContents";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CheckCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Calculator,
  AlertTriangle,
  Setting2,
} from "reicon-react";
import { MathFormula, MathText } from "@/components/ui/MathFormula";
import {
  SAMPLE_EQUIPMENT_SPECS,
  SAMPLE_SCHEMATIC,
  ARTICLE_TOC,
} from "../data/sampleDocData";
import { SUBJECT_KNOWLEDGE_MAP } from "../data/subjectDetailsData";
import {
  DiagramElectricalSafety,
  DiagramRefrigerationCycle,
  DiagramCopperFlaring,
  DiagramCompressorWiring,
  DiagramVacuumStation,
} from "./TechnicalDiagrams";

interface DynamicLessonViewerProps {
  slug: string;
  onSelectLesson: (slug: string) => void;
  onTakeExam?: (subjectCode: string) => void;
  onBackToCurriculum?: () => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  className?: string;
}

export const DynamicLessonViewer: React.FC<DynamicLessonViewerProps> = ({
  slug,
  onSelectLesson,
  onTakeExam,
  onBackToCurriculum,
  isCompleted = false,
  onToggleComplete,
  className,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>("tong-quan");

  // 1. Find lesson, subject and semester metadata from curriculum
  let matchedSemester = COLLEGE_CURRICULUM_DATA[0];
  let matchedSubject = matchedSemester.subjects[0];
  let matchedLesson = matchedSubject.lessons[0];
  let found = false;

  for (const sem of COLLEGE_CURRICULUM_DATA) {
    for (const sub of sem.subjects) {
      for (const les of sub.lessons) {
        if (les.slug === slug) {
          matchedSemester = sem;
          matchedSubject = sub;
          matchedLesson = les;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }

  // 2. Find next / previous lesson in the curriculum
  const allLessons = COLLEGE_CURRICULUM_DATA.flatMap((sem) =>
    sem.subjects.flatMap((sub) =>
      sub.lessons.map((les) => ({ ...les, subjectCode: sub.code, subjectTitle: sub.title }))
    )
  );
  const currentIdx = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  // 3. Check detailed custom articles
  const customArticle = getDetailedLessonArticle(slug);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // =========================================================================
  // CASE A: The Classic Interactive U4 Inverter Lesson
  // =========================================================================
  if (slug === "inverter/communication-circuit-u4" || slug === "curriculum/dl205-testpoints-u4") {
    return (
      <div className={cn("space-y-6 min-w-0 font-sans", className)}>
        {/* Breadcrumb & Document Meta */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase flex-wrap">
          <span>HỌC KỲ 4</span>
          <ChevronRight className="w-3 h-3" />
          <span>DL-205: MẠCH GIAO TIẾP DATA</span>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold">
            BÀI L11.1: GIAO TIẾP DATA & ĐO LỖI U4
          </span>
        </div>

        {/* Document Header */}
        <header className="space-y-3 border-b border-neutral-300 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="danger" size="sm">
              MÔN HỌC: DL-205
            </Badge>
            <Badge variant="info" size="sm">
              HỌC PHẦN THỰC HÀNH XƯỞNG
            </Badge>
            <div className="ml-auto flex items-center gap-2">
              {onToggleComplete && (
                <button
                  type="button"
                  onClick={onToggleComplete}
                  className={cn(
                    "text-xs font-mono font-bold px-2.5 py-1 border flex items-center gap-1.5 transition-colors cursor-pointer",
                    isCompleted
                      ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                      : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                  )}
                >
                  <CheckCircle className={cn("w-3.5 h-3.5", isCompleted ? "text-emerald-700" : "text-neutral-400")} />
                  <span>{isCompleted ? "ĐÃ HỌC XONG" : "ĐÁNH DẤU HOÀN THÀNH"}</span>
                </button>
              )}
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                MÃ SỐ: DOC-HVAC-2026-08
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight leading-tight break-words">
            Mạch Giao Tiếp Data Dàn Nóng - Dàn Lạnh & Phương Pháp Đo Kiểm Lỗi U4
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono border-t border-neutral-200 py-2 text-neutral-600">
            <div>
              <span className="block text-[10px] text-neutral-400">MÔN TIÊN QUYẾT:</span>
              <span className="font-bold text-neutral-900">DL-101 (Điện cơ sở)</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400">DÒNG MÁY:</span>
              <span className="font-bold text-neutral-900">Daikin Inverter R32</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400">KỸ NĂNG:</span>
              <span className="font-bold text-blue-900">Đo xung Data VOM</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400">MÔN KẾ TIẾP:</span>
              <span className="font-bold text-neutral-900">DL-301 (Sửa bo)</span>
            </div>
          </div>
        </header>

        {/* In-article Table of Contents */}
        <TableOfContents
          items={ARTICLE_TOC}
          activeId={activeSectionId}
          onSelect={scrollToSection}
        />

        {/* Section 1: Tổng quan */}
        <section id="tong-quan" className="space-y-4 my-8 scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 flex items-center justify-between">
            <span>1. NGUYÊN LÝ TRUYỀN TIN DATA 3 DÂY TRÊN ĐIỀU HÒA INVERTER</span>
            <span className="font-mono text-xs text-neutral-400">#01</span>
          </h2>

          <p className="text-sm leading-relaxed text-neutral-800 break-words">
            Khác với các dòng máy lạnh thường (Mono/Non-inverter) chỉ sử dụng rơ-le để đóng ngắt điện 220V cấp cho máy nén ngoài dàn nóng, máy lạnh biến tần Inverter bắt buộc phải có kênh giao tiếp dữ liệu 2 chiều giữa vi điều khiển (MCU) dàn lạnh và vi điều khiển dàn nóng thông qua <strong>dây số 3 (dây Data)</strong>.
          </p>

          <div className="p-3 bg-neutral-100 border border-neutral-300 text-xs space-y-2">
            <span className="font-mono font-bold uppercase text-neutral-900 block">
              ĐẶC TÍNH ĐIỆN VÀ TÍN HIỆU CẦN GHI NHỚ KHI ĐO:
            </span>
            <ul className="list-disc pl-5 space-y-1 text-neutral-700 font-mono">
              <li><strong>Chân 1 (L) & Chân 2 (N):</strong> Cấp nguồn xoay chiều 220V AC từ dàn lạnh ra bo mạch công suất dàn nóng.</li>
              <li><strong>Chân 2 (N) & Chân 3 (Signal):</strong> Kênh truyền dữ liệu số nối tiếp (Serial Data), sử dụng điện áp DC dao động nhịp (thường từ 15V đến 55V DC).</li>
              <li><strong>Cách ly quang (Optocoupler):</strong> Để bảo vệ vi xử lý khỏi sốc điện áp cao 300V DC từ khối Inverter ngoài dàn nóng, toàn bộ tín hiệu đi qua cặp opto quang PC1 và PC2.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Cảnh báo an toàn */}
        <section id="can-bao-an-toan" className="scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 mb-2 flex items-center justify-between">
            <span>2. CẢNH BÁO AN TOÀN ĐIỆN & NGUY CƠ ĐIỆN CAO ÁP DC 300V</span>
            <span className="font-mono text-xs text-neutral-400">#02</span>
          </h2>

          <SafetyCallout
            type="DANGER"
            title="NGUY CƠ ĐIỆN GIẬT TỬ VONG DO TỤ NGUỒN DC 300V TRÊN BO DÀN NÓNG"
            ruleCode="SAFETY-STD-01"
          >
            <p className="font-medium mb-1">
              Khi kiểm tra mạch giao tiếp hoặc tháo bo mạch dàn nóng, ngắt aptomat nguồn là <strong>CHƯA ĐỦ AN TOÀN</strong>.
            </p>
            <p className="text-[11px] leading-relaxed">
              Các tụ lọc nguồn DC Bus công suất lớn (thường từ 450V - 1000µF) vẫn tích điện áp trên 300V DC trong vòng 3 đến 5 phút sau khi ngắt điện. Luôn sử dụng điện trở xả điện (5kΩ - 10kΩ / 10W) để xả hết điện áp trên hai cực tụ hoặc kiểm tra bằng thang đo DC của đồng hồ VOM về dưới 10V DC trước khi chạm tay vào linh kiện.
            </p>
          </SafetyCallout>
        </section>

        {/* Section 3: Bảng thông số kỹ thuật */}
        <section id="thong-so-ky-thuat" className="scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 mb-2 flex items-center justify-between">
            <span>3. BẢNG THÔNG SỐ KỸ THUẬT TIÊU CHUẨN MODEL FTKC25</span>
            <span className="font-mono text-xs text-neutral-400">#03</span>
          </h2>

          <p className="text-xs text-neutral-600 mb-2">
            Các thông số điện áp và định mức làm việc tiêu chuẩn của nhà máy phục vụ cho việc đối chiếu khi đo kiểm ngoài công trình:
          </p>

          <SpecsTable equipment={SAMPLE_EQUIPMENT_SPECS} />
        </section>

        {/* Section 4: Sơ đồ mạch điện & Test point (Có chuyển động xung) */}
        <section id="so-do-mach-u4" className="scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 mb-2 flex items-center justify-between">
            <span>4. SƠ ĐỒ MẠCH ĐIỆN & PHÂN TÍCH CÁC ĐIỂM TEST POINT</span>
            <span className="font-mono text-xs text-neutral-400">#04</span>
          </h2>

          <p className="text-xs text-neutral-600 mb-2">
            Click vào các nút điểm đo kiểm (TP1, TP2, TP3, TP4) bên dưới sơ đồ để xem điện áp định danh, dải đo cho phép và quy trình thao tác que đo ngoài thực tế:
          </p>

          <SchematicViewer schematic={SAMPLE_SCHEMATIC} />
        </section>

        {/* Section 5: Quy trình 4 bước đo kiểm ngoài hiện trường */}
        <section id="quy-trinh-do-kiem" className="space-y-4 my-8 scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 flex items-center justify-between">
            <span>5. QUY TRÌNH 4 BƯỚC CHẨN ĐOÁN LỖI U4 BẰNG ĐỒNG HỒ VOM</span>
            <span className="font-mono text-xs text-neutral-400">#05</span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Step 1 */}
            <div className="p-3 border border-neutral-300 bg-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono font-black text-xs bg-blue-950 text-white px-2 py-0.5">
                  BƯỚC 1
                </span>
                <span className="font-bold text-neutral-950 uppercase">
                  KIỂM TRA NGUỒN CẤP CHÂN 1 - 2 (AC 220V)
                </span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                Chỉnh đồng hồ về thang đo <strong>AC 500V</strong> hoặc Auto. Đặt que đo vào chân 1 và chân 2 tại domino dàn lạnh hoặc dàn nóng.
              </p>
              <div className="mt-2 font-mono text-[11px] p-2 bg-neutral-100 text-neutral-900">
                ➔ Nếu không có 220V: Kiểm tra rơ-le cấp nguồn trên bo dàn lạnh hoặc dây kết nối 1-2 bị chuột cắn đứt.
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 border border-neutral-300 bg-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono font-black text-xs bg-blue-950 text-white px-2 py-0.5">
                  BƯỚC 2
                </span>
                <span className="font-bold text-neutral-950 uppercase">
                  ĐO XUNG DAO ĐỘNG CHÂN 2 - 3 (DC DATA PULSE)
                </span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                Chuyển đồng hồ sang thang đo <strong>DC 50V</strong> (nên dùng đồng hồ kim cơ để dễ quan sát nhịp vẩy kim). Que đen kẹp cố định chân 2 (N), que đỏ chấm vào chân 3 (Data).
              </p>
              <div className="mt-2 font-mono text-[11px] p-2 bg-neutral-100 text-neutral-900">
                ➔ Kim nhấp nháy liên tục 15V - 55V: Đường truyền bình thường.
                <br />➔ Kim đứng im ở 0V: Đứt dây tín hiệu hoặc bo phát tín hiệu bị chết nguồn nuôi.
                <br />➔ Kim treo cố định ở 48V - 50V không nhịp: Mất xung giao tiếp từ một phía.
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 border border-neutral-300 bg-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono font-black text-xs bg-blue-950 text-white px-2 py-0.5">
                  BƯỚC 3
                </span>
                <span className="font-bold text-neutral-950 uppercase">
                  CÔ LẬP BO DÀN LẠNH HAY BO DÀN NÓNG BỊ HỎNG
                </span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                Tháo rời dây số 3 tại dàn nóng. Đo trực tiếp tại chân 2 - 3 trên bo dàn lạnh khi bật nguồn:
              </p>
              <div className="mt-2 font-mono text-[11px] p-2 bg-neutral-100 text-neutral-900">
                ➔ Nếu chân 2-3 dàn lạnh vẫn nhịp kim: Bo dàn lạnh TỐT ➔ Hỏng bo dàn nóng.
                <br />➔ Nếu chân 2-3 dàn lạnh đứng im 0V: Hỏng mạch phát tín hiệu bo dàn lạnh.
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3 border border-neutral-300 bg-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono font-black text-xs bg-blue-950 text-white px-2 py-0.5">
                  BƯỚC 4
                </span>
                <span className="font-bold text-neutral-950 uppercase">
                  KIỂM TRA LINH KIỆN CÁCH LY QUANG (OPTO PC1, PC2)
                </span>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                Rút điện, dùng thang đo Diode đo chân 1-2 của Optocoupler (điện áp rơi ~1.1V). Đo chân 3-4 không được thông mạch khi chân 1-2 chưa có dòng kích.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Bảng tra cứu áp suất nhiệt độ Gas R32 */}
        <section id="tra-bang-ap-suat" className="scroll-mt-20">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 mb-2 flex items-center justify-between">
            <span>6. BẢNG TRA CỨU ÁP SUẤT BÃO HÒA P-T CHART MÔI CHẤT R32</span>
            <span className="font-mono text-xs text-neutral-400">#06</span>
          </h2>
          <p className="text-xs text-neutral-600 mb-2">
            Hỗ trợ kỹ thuật viên kiểm tra áp suất bão hòa tương ứng với nhiệt độ cuộn cánh dàn lạnh và nhiệt độ ngưng tụ dàn nóng khi nạp môi chất:
          </p>
          <PTChartLookup />
        </section>

        {/* Section 7: Tra cứu mã lỗi liên quan */}
        <section id="tra-cuu-ma-loi" className="scroll-mt-20 pt-4">
          <h2 className="text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 mb-2 flex items-center justify-between">
            <span>7. TRA CỨU NHANH CÁC MÃ LỖI BIẾN TẦN LIÊN QUAN</span>
            <span className="font-mono text-xs text-neutral-400">#07</span>
          </h2>
          <p className="text-xs text-neutral-600 mb-2">
            Công cụ tra cứu trực tiếp các sự cố thường gặp trên điều hòa Daikin, Panasonic, Casper phục vụ thao tác ngoài hiện trường:
          </p>
          <ErrorCodeSearch initialQuery="U4" />
        </section>

        {/* Bottom Navigation */}
        <div className="mt-10 pt-4 border-t-2 border-neutral-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 font-mono text-xs">
          {prevLesson ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectLesson(prevLesson.slug)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 min-h-[34px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>BÀI TRƯỚC ({prevLesson.code})</span>
            </Button>
          ) : <div />}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {onTakeExam && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onTakeExam("dl-202")}
                className="font-bold flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[34px]"
              >
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>LÀM ĐỀ THI MÔN (DL-205)</span>
              </Button>
            )}

            {onBackToCurriculum && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToCurriculum}
                className="flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[34px]"
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>BẢN ĐỒ MÔN HỌC</span>
              </Button>
            )}
          </div>

          {nextLesson && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectLesson(nextLesson.slug)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold min-h-[34px]"
            >
              <span>BÀI SAU ({nextLesson.code})</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE B: Dedicated Structured Articles from DETAILED_LESSON_ARTICLES
  // =========================================================================
  if (customArticle) {
    const articleTOC = customArticle.sections.map((s) => ({
      id: s.id,
      title: s.title,
      level: 2 as const,
    }));

    return (
      <div className={cn("space-y-6 min-w-0 font-sans", className)}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase flex-wrap">
          <span>HỌC KỲ {customArticle.semesterNumber}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{customArticle.subjectCode}: {customArticle.subjectTitle}</span>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold">
            BÀI {customArticle.lessonCode}: {customArticle.title}
          </span>
        </div>

        {/* Header */}
        <header className="space-y-3 border-b border-neutral-300 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5">
              {customArticle.subjectCode}
            </span>
            <Badge variant="info" size="sm">
              THỜI LƯỢNG: {customArticle.durationHours} GIỜ
            </Badge>
            <Badge variant="warning" size="sm">
              BÀI {customArticle.lessonCode}
            </Badge>
            {onToggleComplete && (
              <button
                type="button"
                onClick={onToggleComplete}
                className={cn(
                  "text-xs font-mono font-bold px-2.5 py-1 border flex items-center gap-1.5 transition-colors cursor-pointer ml-auto",
                  isCompleted
                    ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                    : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                )}
              >
                <CheckCircle className={cn("w-3.5 h-3.5", isCompleted ? "text-emerald-700" : "text-neutral-400")} />
                <span>{isCompleted ? "ĐÃ HỌC XONG" : "ĐÁNH DẤU HOÀN THÀNH"}</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight leading-tight break-words">
            {customArticle.title}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            {customArticle.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono border-t border-neutral-200 py-1.5 text-neutral-600">
            <div>
              <span className="block text-[10px] text-neutral-400">KIẾN THỨC TIÊN QUYẾT:</span>
              <span className="font-bold text-neutral-900">{customArticle.prerequisites}</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400">HỌC KỲ:</span>
              <span className="font-bold text-neutral-900">Kỳ {customArticle.semesterNumber} (Năm {customArticle.yearNumber})</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400">HỆ THỐNG:</span>
              <span className="font-bold text-blue-950">Pudo Refrigeration Academy</span>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <TableOfContents
          items={articleTOC}
          activeId={activeSectionId}
          onSelect={scrollToSection}
        />

        {/* Circuit Diagram Renderer if specified */}
        {customArticle.circuitType && (
          <div className="space-y-2">
            <CircuitDiagramRenderer
              type={customArticle.circuitType}
              testPoints={customArticle.testPoints}
            />
          </div>
        )}

        {/* Article Sections */}
        <div className="space-y-8">
          {customArticle.sections.map((sec, sIdx) => (
            <section key={sec.id} id={sec.id} className="space-y-3.5 scroll-mt-20">
              <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1 flex items-center justify-between">
                <span>{sec.title}</span>
                <span className="font-mono text-xs text-neutral-400">#{sIdx + 1}</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans break-words">
                <MathText text={sec.content} />
              </p>

              {/* Safety notice if present */}
              {sec.safetyNotice && (
                <SafetyCallout
                  type={sec.safetyNotice.type}
                  title="CẢNH BÁO AN TOÀN HIỆN TRƯỜNG"
                  ruleCode={`SEC-${sIdx + 1}`}
                >
                  <p className="text-xs leading-relaxed font-medium">
                    <MathText text={sec.safetyNotice.text} />
                  </p>
                </SafetyCallout>
              )}

              {/* Bullet points if present */}
              {sec.keyBulletPoints && sec.keyBulletPoints.length > 0 && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 font-sans">
                  <span className="font-mono font-bold text-[11px] text-neutral-900 block uppercase">
                    CÁC ĐIỂM CỐT LÕI CẦN GHI NHỚ:
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-700">
                    {sec.keyBulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="leading-relaxed">
                        <MathText text={bp} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Formula box if present */}
              {sec.formulaBox && (
                <div className="p-3.5 bg-blue-50/50 border border-blue-200 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-blue-950 font-bold text-xs">
                    <Calculator className="w-4 h-4 text-blue-900" />
                    <span>CÔNG THỨC TOÁN KỸ THUẬT:</span>
                  </div>
                  <div className="p-2 bg-white border border-blue-200 text-neutral-950 text-sm text-center">
                    <MathFormula formula={sec.formulaBox.formula} displayMode="block" className="my-0 bg-transparent border-none text-sm" />
                  </div>
                  <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                    <strong>Giải thích đại lượng:</strong> <MathText text={sec.formulaBox.explanation} />
                  </p>
                  <div className="p-2 bg-neutral-100 border border-neutral-200 text-[11px] text-neutral-800 font-sans">
                    <strong>Ví dụ tính toán thực nghiệm:</strong> <MathText text={sec.formulaBox.exampleCalculation} />
                  </div>
                </div>
              )}

              {/* Field steps if present */}
              {sec.fieldSteps && sec.fieldSteps.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="font-mono font-bold text-xs uppercase text-neutral-900 block">
                    QUY TRÌNH THAO TÁC TỪNG BƯỚC NGOÀI HIỆN TRƯỜNG:
                  </span>
                  <div className="space-y-2">
                    {sec.fieldSteps.map((fs) => (
                      <div key={fs.stepNumber} className="p-3 bg-white border border-neutral-300 space-y-1 text-xs font-sans">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-blue-950 text-white px-1.5 py-0.5">
                            BƯỚC {fs.stepNumber}
                          </span>
                          <span className="font-bold text-neutral-950 uppercase">
                            {fs.title}
                          </span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed pt-1">
                          <strong>Thao tác:</strong> {fs.action}
                        </p>
                        <div className="p-1.5 bg-neutral-50 font-mono text-[11px] text-neutral-900 border-l-2 border-emerald-600">
                          ➔ <strong>Kết quả tiêu chuẩn:</strong> {fs.expectedResult}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* P-T Chart Widget if requested */}
        {customArticle.showPTChart && (
          <div className="space-y-2 pt-4 border-t border-neutral-300">
            <h3 className="font-bold text-sm uppercase text-neutral-950">
              BẢNG TRA CỨU ÁP SUẤT NHIỆT ĐỘ P-T CHART GAS R32
            </h3>
            <PTChartLookup />
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-10 pt-4 border-t-2 border-neutral-900 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          {prevLesson ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectLesson(prevLesson.slug)}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BÀI TRƯỚC ({prevLesson.code})</span>
            </Button>
          ) : <div />}

          <div className="flex items-center gap-2">
            {onTakeExam && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onTakeExam(customArticle.subjectCode.toLowerCase())}
                className="font-bold flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>LÀM ĐỀ THI MÔN {customArticle.subjectCode}</span>
              </Button>
            )}

            {onBackToCurriculum && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToCurriculum}
                className="flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>BẢN ĐỒ MÔN HỌC</span>
              </Button>
            )}
          </div>

          {nextLesson && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectLesson(nextLesson.slug)}
              className="flex items-center gap-1.5 font-bold"
            >
              <span>BÀI SAU ({nextLesson.code})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE C: General Curriculum Lesson Template (Dynamic Auto-Renderer)
  // =========================================================================
  const detail = SUBJECT_KNOWLEDGE_MAP[matchedSubject.id];

  const renderSubjectDiagram = () => {
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

  const isThermodynamics = ["dl-102", "dl-106", "dl-201", "dl-202", "dl-206", "dl-301", "dl-302", "dl-303"].includes(matchedSubject.id);
  const isDiagnostic = ["dl-101", "dl-104", "dl-105", "dl-203", "dl-204", "dl-205", "dl-305", "dl-306"].includes(matchedSubject.id);

  return (
    <div className={cn("space-y-6 min-w-0 max-w-full font-sans", className)}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase flex-wrap">
        <span>HỌC KỲ {matchedSemester.semesterNumber}</span>
        <ChevronRight className="w-3 h-3" />
        <span>{matchedSubject.code}: {matchedSubject.title}</span>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="text-neutral-900 font-bold">
          BÀI {matchedLesson.code}: {matchedLesson.title}
        </span>
      </div>

      {/* Header */}
      <header className="space-y-3 border-b border-neutral-300 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5">
            {matchedSubject.code}
          </span>
          <Badge variant="info" size="sm">
            THỜI LƯỢNG: {matchedLesson.durationHours} GIỜ
          </Badge>
          <Badge variant="warning" size="sm">
            BÀI {matchedLesson.code}
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            {onToggleComplete && (
              <button
                type="button"
                onClick={onToggleComplete}
                className={cn(
                  "text-xs font-mono font-bold px-2.5 py-1 border flex items-center gap-1.5 transition-colors cursor-pointer",
                  isCompleted
                    ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                    : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                )}
              >
                <CheckCircle className={cn("w-3.5 h-3.5", isCompleted ? "text-emerald-700" : "text-neutral-400")} />
                <span>{isCompleted ? "ĐÃ HỌC XONG" : "ĐÁNH DẤU HOÀN THÀNH"}</span>
              </button>
            )}
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              HỆ CAO ĐẲNG 3 NĂM • KỲ {matchedSemester.semesterNumber}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight leading-tight break-words">
          {matchedLesson.title}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
          {matchedLesson.summary}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono border-t border-neutral-200 py-1.5 text-neutral-600">
          <div>
            <span className="block text-[10px] text-neutral-400">CẤP ĐỘ HỌC PHẦN:</span>
            <span className="font-bold text-neutral-900">{matchedSubject.level}</span>
          </div>
          <div>
            <span className="block text-[10px] text-neutral-400">TRỌNG TÂM KỲ:</span>
            <span className="font-bold text-neutral-900">Kỳ {matchedSemester.semesterNumber} ({matchedSemester.focusTheme.split(":")[0]})</span>
          </div>
          <div>
            <span className="block text-[10px] text-neutral-400">SỐ TÍN CHỈ:</span>
            <span className="font-bold text-blue-950">{matchedSubject.credits} TÍN CHỈ</span>
          </div>
        </div>
      </header>

      {/* Section 1: Mục tiêu & Tầm quan trọng */}
      <section className="space-y-3 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
          1. TẦM QUAN TRỌNG VÀ MỤC TIÊU NGHỀ NGHIỆP CỦA BÀI HỌC
        </h2>
        <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
          {matchedSubject.whyLearn}
        </p>
        <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 font-sans">
          <span className="font-mono font-bold text-[11px] text-neutral-900 block uppercase">
            KỸ NĂNG THỰC CHIẾN SAU KHI HOÀN THÀNH:
          </span>
          <ul className="list-disc pl-4 space-y-1 text-neutral-700">
            {matchedSubject.practicalFieldSkills.map((sk, skIdx) => (
              <li key={skIdx} className="leading-relaxed">{sk}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 2: Sơ đồ kỹ thuật minh họa */}
      {detail && (
        <section className="space-y-2 min-w-0">
          <div className="flex items-center justify-between gap-2 text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider border-b border-neutral-200 pb-1">
            <div className="flex items-center gap-1.5">
              <Setting2 className="w-4 h-4 text-blue-950" />
              <span>2. SƠ ĐỒ KỸ THUẬT MINH HỌA NGHỀ ĐIỆN LẠNH</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold hidden sm:inline">
              ● MÔ PHỎNG NGUYÊN LÝ VẬT LÝ
            </span>
          </div>
          {renderSubjectDiagram()}
        </section>
      )}

      {/* Section 3: Cơ sở lý thuyết chuyên sâu */}
      {detail && detail.coreTheory.length > 0 && (
        <section className="space-y-3 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            3. CƠ SỞ LÝ THUYẾT & NGUYÊN LÝ HOẠT ĐỘNG CHUYÊN SÂU
          </h2>
          <div className="space-y-3 text-xs">
            {detail.coreTheory.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-white border border-neutral-300 space-y-2 min-w-0">
                <h3 className="font-bold text-sm text-neutral-950 uppercase break-words">
                  {item.heading}
                </h3>
                {item.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-neutral-800 break-words font-sans">
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
        </section>
      )}

      {/* Section 4: Công thức toán kỹ thuật & Định mức an toàn */}
      {detail && detail.formulas.length > 0 && (
        <section className="space-y-3 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            4. CÔNG THỨC TOÁN KỸ THUẬT & ĐỊNH MỨC AN TOÀN
          </h2>
          <div className="space-y-4">
            {detail.formulas.map((f, idx) => (
              <div key={idx} className="p-4 bg-white border border-neutral-300 space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                  <span className="font-bold text-sm text-neutral-950 uppercase break-words">
                    {f.name}
                  </span>
                  <Badge variant="info" size="sm">
                    CÔNG THỨC #{idx + 1}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-blue-50/60 border border-blue-200">
                    <span className="font-bold text-blue-950 uppercase text-[10px] block mb-0.5">
                      MỤC ĐÍCH TÍNH TOÁN:
                    </span>
                    <p className="text-neutral-800 leading-relaxed break-words">
                      {f.calculatesWhat}
                    </p>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 border border-amber-200">
                    <span className="font-bold text-amber-950 uppercase text-[10px] block mb-0.5">
                      KHI NÀO SỬ DỤNG:
                    </span>
                    <p className="text-neutral-800 leading-relaxed break-words">
                      {f.whenToUse}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-950 text-white font-mono font-bold text-xs sm:text-sm break-all text-center tracking-wide border border-neutral-800">
                  {f.expression}
                </div>

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

                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2 bg-neutral-100 border-l-2 border-neutral-700 text-neutral-800">
                    <strong>Ngưỡng an toàn / Trị số bình thường:</strong> {f.safeStandard}
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-950 font-mono text-[11px] leading-relaxed break-words">
                    <strong>Ví dụ tính toán thực tế:</strong> {f.sampleCalculation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Quy trình thao tác đo kiểm */}
      {detail && detail.practicalSteps.length > 0 && (
        <section className="space-y-3 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            5. QUY TRÌNH THAO TÁC ĐO KIỂM THỰC HÀNH TẠI XƯỞNG
          </h2>
          <div className="space-y-2">
            {detail.practicalSteps.map((s) => (
              <div key={s.step} className="p-3 bg-white border border-neutral-300 space-y-1.5 text-xs min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-blue-950 text-white px-2 py-0.5">
                    BƯỚC {s.step}
                  </span>
                  <span className="font-bold text-neutral-950 uppercase">
                    {s.title}
                  </span>
                </div>
                <p className="text-neutral-700 leading-relaxed font-sans">
                  <strong>Thao tác:</strong> {s.action}
                </p>
                <div className="p-2 bg-neutral-100 font-mono text-[11px] text-neutral-900 border-l-2 border-emerald-600">
                  ➔ <strong>Kết quả tiêu chuẩn nghiệm thu:</strong> {s.expectedResult}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 6: Cảnh báo sai lầm hiện trường */}
      {detail && detail.fieldPitfalls.length > 0 && (
        <section className="space-y-3 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            6. CẢNH BÁO SAI LẦM HIỆN TRƯỜNG & BIỆN PHÁP PHÒNG TRÁNH
          </h2>
          <div className="space-y-2">
            {detail.fieldPitfalls.map((p, idx) => (
              <div key={idx} className="p-3 bg-amber-50/50 border-l-4 border-l-amber-600 border border-amber-200 text-xs space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 font-bold text-amber-950 uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>SAI LẦM THƯỜNG GẶP #{idx + 1}: {p.mistake}</span>
                </div>
                <p className="text-neutral-800 leading-relaxed">
                  <strong>Hậu quả thực tế:</strong> {p.consequence}
                </p>
                <p className="text-emerald-900 font-medium">
                  ➔ <strong>Biện pháp phòng tránh chuẩn:</strong> {p.prevention}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 7: Dụng cụ & Thiết bị */}
      <section className="space-y-3 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
          7. DỤNG CỤ & THIẾT BỊ ĐO KIỂM BẮT BUỘC TRANG BỊ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {matchedSubject.requiredTools.map((tool, tIdx) => (
            <div key={tIdx} className="p-2.5 bg-white border border-neutral-300 space-y-1">
              <span className="text-[10px] text-neutral-400 block">DỤNG CỤ #{tIdx + 1}</span>
              <span className="font-bold text-neutral-900 block">{tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Công cụ tra cứu kỹ thuật thực chiến */}
      {isThermodynamics && (
        <section className="space-y-2 pt-2 border-t border-neutral-300 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            8. BẢNG TRA CỨU ÁP SUẤT NHIỆT ĐỘ P-T CHART MÔI CHẤT LẠNH
          </h2>
          <PTChartLookup />
        </section>
      )}

      {isDiagnostic && (
        <section className="space-y-2 pt-2 border-t border-neutral-300 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950 uppercase border-b-2 border-neutral-900 pb-1">
            8. TRA CỨU MÃ LỖI BIẾN TẦN & KHÍ CỤ BẢO VỆ
          </h2>
          <ErrorCodeSearch initialQuery="U4" />
        </section>
      )}

      {/* Bottom Navigation */}
      <div className="mt-10 pt-4 border-t-2 border-neutral-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 font-mono text-xs">
        {prevLesson ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectLesson(prevLesson.slug)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 min-h-[34px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>BÀI TRƯỚC ({prevLesson.code})</span>
          </Button>
        ) : <div />}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {onTakeExam && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onTakeExam(matchedSubject.code.toLowerCase())}
              className="font-bold flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[34px]"
            >
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>LÀM ĐỀ THI MÔN {matchedSubject.code}</span>
            </Button>
          )}

          {onBackToCurriculum && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBackToCurriculum}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[34px]"
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span>BẢN ĐỒ MÔN HỌC</span>
            </Button>
          )}
        </div>

        {nextLesson && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectLesson(nextLesson.slug)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold min-h-[34px]"
          >
            <span>BÀI SAU ({nextLesson.code})</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Button>
        )}
      </div>
    </div>
  );
};
