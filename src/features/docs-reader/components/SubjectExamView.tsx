"use client";

import React, { useState, useEffect } from "react";
import { SubjectExam } from "@/types/exam";
import { CircuitDiagramRenderer } from "./CircuitDiagramRenderer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Printer,
  Refresh,
  CheckCircle,
  Calculator,
  Award,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
} from "reicon-react";
import { MathFormula, MathText } from "@/components/ui/MathFormula";
import { FormulaInputToolbar } from "./FormulaInputToolbar";

interface SubjectExamViewProps {
  exam: SubjectExam;
  studentName?: string;
  onGenerateNewExam: () => void;
  onRecordScore?: (score: number, maxScore: number) => void;
  onBackToSubject?: () => void;
  onOpenCheatsheet?: () => void;
  className?: string;
}

export const SubjectExamView: React.FC<SubjectExamViewProps> = ({
  exam,
  studentName,
  onGenerateNewExam,
  onRecordScore,
  onBackToSubject,
  onOpenCheatsheet,
  className,
}) => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(exam.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Render-time adjustment when exam prop changes (avoids setState in effect)
  const [prevExamId, setPrevExamId] = useState(exam.id);
  if (exam.id !== prevExamId) {
    setPrevExamId(exam.id);
    setTimeLeft(exam.durationMinutes * 60);
    setIsTimerRunning(true);
  }

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Multiple Choice State
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Essay Text State
  const [mathAnswers, setMathAnswers] = useState<Record<string, string>>({});
  const [circuitAnswers, setCircuitAnswers] = useState<Record<string, string>>({});

  // Reveal Solution State
  const [showMathSolutions, setShowMathSolutions] = useState<Record<string, boolean>>({});
  const [showCircuitSolutions, setShowCircuitSolutions] = useState<Record<string, boolean>>({});

  // Self-graded checklist points
  const [selfGradedMathPoints, setSelfGradedMathPoints] = useState<Record<string, number>>({});
  const [selfGradedCircuitPoints, setSelfGradedCircuitPoints] = useState<Record<string, number>>({});

  const handleInsertSymbolToMath = (mathId: string, symbol: string) => {
    setMathAnswers((prev) => {
      const current = prev[mathId] || "";
      const needsSpace =
        current.length > 0 &&
        !current.endsWith(" ") &&
        !current.endsWith("\n") &&
        !symbol.startsWith(" ");
      return {
        ...prev,
        [mathId]: current + (needsSpace ? " " : "") + symbol,
      };
    });
  };

  const handleInsertSymbolToCircuit = (cktId: string, symbol: string) => {
    setCircuitAnswers((prev) => {
      const current = prev[cktId] || "";
      const needsSpace =
        current.length > 0 &&
        !current.endsWith(" ") &&
        !current.endsWith("\n") &&
        !symbol.startsWith(" ");
      return {
        ...prev,
        [cktId]: current + (needsSpace ? " " : "") + symbol,
      };
    });
  };

  const handleSelectMC = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setMcAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  // Tính điểm trắc nghiệm
  const mcScore = exam.multipleChoiceQuestions.reduce((acc, q) => {
    if (mcAnswers[q.id] === q.correctIndex) {
      return acc + q.points;
    }
    return acc;
  }, 0);

  const totalMcPoints = exam.multipleChoiceQuestions.reduce((acc, q) => acc + q.points, 0);
  const totalMathPoints = exam.mathEssayQuestions.reduce((acc, q) => acc + q.totalPoints, 0);
  const totalCircuitPoints = exam.circuitEssayQuestions.reduce((acc, q) => acc + q.totalPoints, 0);
  const maxPossibleScore = totalMcPoints + totalMathPoints + totalCircuitPoints;

  const currentSelfMath = Object.values(selfGradedMathPoints).reduce((a, b) => a + b, 0);
  const currentSelfCircuit = Object.values(selfGradedCircuitPoints).reduce((a, b) => a + b, 0);
  const totalCalculatedScore = mcScore + currentSelfMath + currentSelfCircuit;

  useEffect(() => {
    if (isSubmitted && onRecordScore) {
      onRecordScore(totalCalculatedScore, maxPossibleScore);
    }
  }, [isSubmitted, totalCalculatedScore, maxPossibleScore, onRecordScore]);

  const handleResetExam = () => {
    setMcAnswers({});
    setMathAnswers({});
    setCircuitAnswers({});
    setShowMathSolutions({});
    setShowCircuitSolutions({});
    setSelfGradedMathPoints({});
    setSelfGradedCircuitPoints({});
    setIsSubmitted(false);
    setTimeLeft(exam.durationMinutes * 60);
    setIsTimerRunning(true);
  };

  return (
    <div className={cn("space-y-6 my-4 w-full min-w-0 print:m-0", className)}>
      {/* EXAM HEADER BANNER */}
      <div className="p-3.5 sm:p-4 bg-white border border-neutral-300 space-y-3 print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-300 pb-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-mono font-bold text-xs bg-blue-950 text-white px-2 py-0.5">
                {exam.subjectCode}
              </span>
              <span className="font-mono text-xs text-neutral-600 font-semibold uppercase truncate">
                {exam.subjectTitle}
              </span>
              {studentName && (
                <span className="font-mono text-xs bg-amber-100 text-amber-950 px-2 py-0.5 border border-amber-300 font-bold truncate">
                  HỌC VIÊN: {studentName}
                </span>
              )}
              <Badge variant="warning" size="sm">
                ĐỀ THI TIỀN ĐỀ CHÍNH QUY
              </Badge>
            </div>
            <h1 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight break-words">
              {exam.examName}
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
              {exam.description}
            </p>
          </div>

          {/* TIMER & CONTROLS */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-neutral-300 bg-neutral-50 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
              <span className="font-bold text-neutral-950">{formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-[10px] text-blue-950 underline ml-1 cursor-pointer"
              >
                {isTimerRunning ? "DỪNG" : "TIẾP"}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={onGenerateNewExam}
                className="h-8 font-mono text-[11px] sm:text-xs flex items-center gap-1"
                title="Tạo đề thi mới ngẫu nhiên từ ngân hàng câu hỏi"
              >
                <Refresh className="w-3.5 h-3.5" />
                <span>TẠO ĐỀ MỚI</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="h-8 font-mono text-[11px] sm:text-xs flex items-center gap-1"
                title="In đề thi ra giấy hoặc file PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">IN ĐỀ</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Exam Structure Notice */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between text-[11px] font-mono text-neutral-600 bg-neutral-100 p-2.5 border border-neutral-200 gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span><strong>CẤU TRÚC ĐỀ:</strong> 3 PHẦN</span>
            <span>• TRẮC NGHIỆM ({totalMcPoints} ĐIỂM)</span>
            <span>• TOÁN TỰ LUẬN ({totalMathPoints} ĐIỂM)</span>
            <span>• SƠ ĐỒ MẠCH ({totalCircuitPoints} ĐIỂM)</span>
          </div>
          <div className="font-bold text-neutral-950">
            ĐIỂM ĐẠT: {exam.passingScore} / {maxPossibleScore} ĐIỂM
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHẦN I: TRẮC NGHIỆM TIÊU CHUẨN KỸ THUẬT & HIỆN TRƯỜNG */}
      {/* ============================================================== */}
      <section className="p-4 bg-white border border-neutral-300 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black bg-neutral-900 text-white px-2 py-0.5">
              PHẦN I
            </span>
            <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
              TRẮC NGHIỆM TIÊU CHUẨN KỸ THUẬT & AN TOÀN HIỆN TRƯỜNG ({totalMcPoints} ĐIỂM)
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            {exam.multipleChoiceQuestions.length} CÂU HỎI
          </span>
        </div>

        <div className="space-y-6">
          {exam.multipleChoiceQuestions.map((q, qIdx) => {
            const selectedOpt = mcAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={q.id} className="p-3.5 border border-neutral-200 bg-neutral-50/50 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-blue-950 text-white px-1.5 py-0.2">
                      CÂU {qIdx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      ({q.points} điểm)
                    </span>
                  </div>
                  {isSubmitted && (
                    <span
                      className={cn(
                        "font-mono text-xs font-bold px-2 py-0.5",
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      )}
                    >
                      {isCorrect ? "ĐÚNG + " + q.points + " ĐIỂM" : "SAI (0 ĐIỂM)"}
                    </span>
                  )}
                </div>

                <div className="text-xs text-neutral-600 bg-white p-2 border-l-2 border-neutral-400 font-sans">
                  <strong>Tình huống:</strong> {q.scenario}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug">
                  {q.question}
                </h3>

                {/* 4 Options */}
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isOptionCorrect = optIdx === q.correctIndex;

                    let btnStyle = "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100";
                    if (isSubmitted) {
                      if (isOptionCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold";
                      } else if (isSelected && !isOptionCorrect) {
                        btnStyle = "bg-red-50 border-red-600 text-red-950";
                      } else {
                        btnStyle = "bg-neutral-100 border-neutral-200 text-neutral-400 opacity-60";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-blue-50 border-blue-950 text-blue-950 font-bold";
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectMC(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={cn(
                          "w-full text-left p-2.5 border transition-none flex items-start gap-2 text-xs",
                          btnStyle
                        )}
                      >
                        <span className="font-mono font-bold px-1.5 py-0.2 bg-neutral-200 text-neutral-900 shrink-0 text-[10px]">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="flex-1 break-words">
                          <div>{opt.text}</div>
                          {isSubmitted && (isOptionCorrect || isSelected) && (
                            <div className="mt-1 text-[11px] font-normal leading-relaxed text-neutral-600 border-t border-neutral-200 pt-1">
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="p-2 bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-950">
                    <strong>➔ Quy tắc cốt lõi:</strong> {q.coreRule}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* PHẦN II: TỰ LUẬN TOÁN KỸ THUẬT & TƯ DUY TÍNH TOÁN */}
      {/* ============================================================== */}
      <section className="p-4 bg-white border border-neutral-300 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black bg-neutral-900 text-white px-2 py-0.5">
              PHẦN II
            </span>
            <div className="flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                TỰ LUẬN TOÁN KỸ THUẬT & TƯ DUY TÍNH TOÁN ({totalMathPoints} ĐIỂM)
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            TRÌNH BÀY CÁC BƯỚC VÀ ĐƠN VỊ ĐO
          </span>
        </div>

        <div className="space-y-6">
          {exam.mathEssayQuestions.map((math, mIdx) => {
            const isSolutionOpen = showMathSolutions[math.id] ?? false;

            return (
              <div key={math.id} className="p-4 border border-neutral-300 bg-neutral-50/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                  <span className="font-mono font-bold text-xs text-blue-950">
                    BÀI TOÁN SỐ #{mIdx + 1}: {math.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    THANG ĐIỂM: {math.totalPoints} ĐIỂM
                  </span>
                </div>

                {/* Tình huống và số liệu cho trước */}
                <div className="p-3 bg-white border border-neutral-200 space-y-2 text-xs">
                  <span className="font-mono font-bold uppercase text-neutral-600 block text-[10px]">
                    DỮ LIỆU ĐO ĐẠC HIỆN TRƯỜNG CHO TRƯỚC:
                  </span>
                  <p className="text-neutral-800 leading-relaxed whitespace-pre-line font-medium">
                    <MathText text={math.scenario} />
                  </p>

                  {/* Bảng thông số cho trước */}
                  <div className="overflow-x-auto border border-neutral-200 mt-2">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-1.5 border-r border-neutral-200 w-20">KÝ HIỆU</th>
                          <th className="p-1.5 border-r border-neutral-200">ĐẠI LƯỢNG</th>
                          <th className="p-1.5 border-r border-neutral-200 w-24">GIÁ TRỊ</th>
                          <th className="p-1.5 w-24">ĐƠN VỊ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {math.givenData.map((d, dIdx) => (
                          <tr key={dIdx} className="border-b border-neutral-200">
                            <td className="p-1.5 border-r border-neutral-200 font-mono font-bold text-blue-950">
                              {d.symbol}
                            </td>
                            <td className="p-1.5 border-r border-neutral-200 text-neutral-800">
                              {d.label}
                            </td>
                            <td className="p-1.5 border-r border-neutral-200 font-mono font-bold text-neutral-950">
                              {d.value}
                            </td>
                            <td className="p-1.5 font-mono text-neutral-600">
                              {d.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Các yêu cầu tính toán */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-neutral-900 block">
                    CÁC YÊU CẦU TÍNH TOÁN VÀ BIỆN LUẬN:
                  </span>
                  <div className="space-y-1.5 pl-2">
                    {math.questions.map((req, rIdx) => (
                      <div key={rIdx} className="text-xs text-neutral-900 font-medium">
                        <MathText text={req} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Khu vực học viên nhập bài làm tự luận */}
                <div className="space-y-1.5">
                  <FormulaInputToolbar
                    onInsertSymbol={(sym) => handleInsertSymbolToMath(math.id, sym)}
                    mode="MATH"
                    onOpenFullCheatsheet={onOpenCheatsheet}
                  />
                  <textarea
                    value={mathAnswers[math.id] || ""}
                    onChange={(e) =>
                      setMathAnswers((prev) => ({ ...prev, [math.id]: e.target.value }))
                    }
                    placeholder="Trình bày chi tiết từng bước: Viết công thức -> Thay số liệu -> Tính toán ra kết quả kèm đơn vị -> Nhận xét tiêu chuẩn kỹ thuật..."
                    rows={6}
                    className="w-full p-3 font-mono text-xs border border-neutral-300 bg-white focus:border-blue-950 outline-none leading-relaxed"
                  />
                </div>

                {/* NÚT MỞ BAREM ĐIỂM & ĐÁP ÁN CHI TIẾT */}
                {/* NÚT MỞ BAREM ĐIỂM & ĐÁP ÁN CHI TIẾT */}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowMathSolutions((prev) => ({
                        ...prev,
                        [math.id]: !isSolutionOpen,
                      }))
                    }
                    className="w-full sm:w-auto font-mono text-xs flex items-center justify-center gap-1.5 border-blue-900 text-blue-950 py-1.5 px-3 min-h-[34px] h-auto"
                  >
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                    <span className="hidden sm:inline">{isSolutionOpen ? "ẨN ĐÁP ÁN BAREM" : "XEM ĐÁP ÁN CHI TIẾT & BAREM CHẤM ĐIỂM"}</span>
                    <span className="sm:hidden">{isSolutionOpen ? "ẨN ĐÁP ÁN BAREM" : "XEM ĐÁP ÁN & BAREM ĐIỂM"}</span>
                  </Button>
                </div>

                {/* LỜI GIẢI & BAREM TỰ CHẤM ĐIỂM */}
                {isSolutionOpen && (
                  <div className="p-3 sm:p-4 bg-blue-50/40 border border-blue-200 space-y-3 text-xs">
                    <span className="font-mono font-bold uppercase text-blue-950 block text-[11px]">
                      LỜI GIẢI MẪU TỪNG BƯỚC & BAREM ĐIỂM CHUẨN:
                    </span>

                    <div className="space-y-3">
                      {math.stepByStepSolution.map((sol, sIdx) => (
                        <div key={sIdx} className="p-2.5 bg-white border border-blue-100 space-y-1">
                          <div className="flex items-center justify-between font-mono text-[11px] font-bold text-blue-950">
                            <span>{sol.step}</span>
                            <span className="text-emerald-700">+{sol.points} ĐIỂM</span>
                          </div>
                          <div className="font-mono text-xs text-neutral-900 bg-neutral-50 p-2 border border-neutral-200 flex flex-wrap items-center gap-1.5">
                            <MathFormula formula={sol.calculation} />
                            <span>➔</span>
                            <span className="font-bold text-blue-950 bg-white px-1.5 py-0.5 border border-neutral-300">
                              {sol.result}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 leading-snug">
                            {sol.note}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Barem tiêu chí đánh giá */}
                    <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                      <span className="font-mono font-bold text-[10px] uppercase text-neutral-600 block">
                        TIÊU CHÍ ĐÁNH GIÁ KẾT QUẢ ĐẠT YÊU CẦU:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-neutral-700">
                        {math.evaluationCriteria.map((crit, cIdx) => (
                          <li key={cIdx}>{crit}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tự chấm điểm bài toán */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-blue-200 gap-2">
                      <span className="font-mono text-xs text-neutral-800">
                        Tự đánh giá số điểm đạt được cho bài này:
                      </span>
                      <div className="flex flex-wrap items-center gap-1 sm:justify-end">
                        {[0, 2, 4, 6, 8, 10].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            onClick={() =>
                              setSelfGradedMathPoints((prev) => ({
                                ...prev,
                                [math.id]: pts,
                              }))
                            }
                            className={cn(
                              "flex-1 sm:flex-none px-2 py-1 text-xs font-mono border transition-none min-h-[28px] text-center",
                              (selfGradedMathPoints[math.id] ?? 0) === pts
                                ? "bg-blue-950 text-white border-blue-950 font-bold"
                                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                            )}
                          >
                            {pts}đ
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* PHẦN III: TỰ LUẬN VẬT LÝ ĐIỆN & PHÂN TÍCH SƠ ĐỒ MẠCH */}
      {/* ============================================================== */}
      <section className="p-4 bg-white border border-neutral-300 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black bg-neutral-900 text-white px-2 py-0.5">
              PHẦN III
            </span>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-900" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                TỰ LUẬN VẬT LÝ ĐIỆN & PHÂN TÍCH SƠ ĐỒ MẠCH ({totalCircuitPoints} ĐIỂM)
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            SƠ ĐỒ NGUYÊN LÝ & PAN BỆNH THỰC TẾ
          </span>
        </div>

        <div className="space-y-6">
          {exam.circuitEssayQuestions.map((ckt, cIdx) => {
            const isSolutionOpen = showCircuitSolutions[ckt.id] ?? false;

            return (
              <div key={ckt.id} className="p-4 border border-neutral-300 bg-neutral-50/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                  <span className="font-mono font-bold text-xs text-blue-950">
                    BÀI THỰC HÀNH MẠCH ĐIỆN SỐ #{cIdx + 1}: {ckt.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    THANG ĐIỂM: {ckt.totalPoints} ĐIỂM
                  </span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  {ckt.circuitDescription}
                </p>

                {/* SƠ ĐỒ MẠCH ĐIỆN SVG TRỰC QUAN */}
                <CircuitDiagramRenderer
                  type={ckt.circuitType}
                  testPoints={ckt.testPoints}
                />

                {/* Câu hỏi chẩn đoán sơ đồ mạch */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-neutral-900 block">
                    CÂU HỎI PHÂN TÍCH NGUYÊN LÝ & CHẨN ĐOÁN PAN BỆNH:
                  </span>
                  <div className="space-y-1.5 pl-2">
                    {ckt.diagnosticQuestions.map((qText, qIdx) => (
                      <div key={qIdx} className="text-xs text-neutral-900 font-medium">
                        {qText}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Khu vực nhập bài phân tích */}
                <div className="space-y-1.5">
                  <FormulaInputToolbar
                    onInsertSymbol={(sym) => handleInsertSymbolToCircuit(ckt.id, sym)}
                    mode="CIRCUIT"
                    onOpenFullCheatsheet={onOpenCheatsheet}
                  />
                  <textarea
                    value={circuitAnswers[ckt.id] || ""}
                    onChange={(e) =>
                      setCircuitAnswers((prev) => ({ ...prev, [ckt.id]: e.target.value }))
                    }
                    placeholder="Mô tả đường đi của dòng điện -> Giải thích giá trị điện áp tại các Test Point -> Phân tích linh kiện hư hỏng khi mạch có hiện tượng bất thường..."
                    rows={6}
                    className="w-full p-3 font-mono text-xs border border-neutral-300 bg-white focus:border-blue-950 outline-none leading-relaxed"
                  />
                </div>

                {/* NÚT MỞ BAREM ĐIỂM PHÂN TÍCH */}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowCircuitSolutions((prev) => ({
                        ...prev,
                        [ckt.id]: !isSolutionOpen,
                      }))
                    }
                    className="w-full sm:w-auto font-mono text-xs flex items-center justify-center gap-1.5 border-blue-900 text-blue-950 py-1.5 px-3 min-h-[34px] h-auto"
                  >
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                    <span className="hidden sm:inline">{isSolutionOpen ? "ẨN ĐÁP ÁN BAREM" : "XEM ĐÁP ÁN PHÂN TÍCH MẠCH & BAREM ĐIỂM"}</span>
                    <span className="sm:hidden">{isSolutionOpen ? "ẨN ĐÁP ÁN BAREM" : "XEM ĐÁP ÁN PHÂN TÍCH MẠCH"}</span>
                  </Button>
                </div>

                {/* BAREM PHÂN TÍCH CHI TIẾT */}
                {isSolutionOpen && (
                  <div className="p-3 sm:p-4 bg-blue-50/40 border border-blue-200 space-y-3 text-xs">
                    <span className="font-mono font-bold uppercase text-blue-950 block text-[11px]">
                      HƯỚNG DẪN CHẤM ĐIỂM & PHÂN TÍCH MẠCH CHUẨN:
                    </span>

                    <div className="space-y-3">
                      {ckt.stepByStepSolution.map((sol, sIdx) => (
                        <div key={sIdx} className="p-2.5 bg-white border border-blue-100 space-y-1.5">
                          <div className="flex items-center justify-between font-mono text-[11px] font-bold text-blue-950">
                            <span>{sol.analysis}</span>
                            <span className="text-emerald-700">+{sol.points} ĐIỂM</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-neutral-800">
                            {sol.keyPoints.map((kp, kpIdx) => (
                              <li key={kpIdx} className="leading-relaxed">{kp}</li>
                            ))}
                          </ul>
                          {sol.dangerWarning && (
                            <div className="p-2 bg-red-50 border border-red-200 text-red-950 font-bold text-[10px]">
                              ⚠ CẢNH BÁO AN TOÀN: {sol.dangerWarning}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tự chấm điểm bài mạch điện */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-blue-200 gap-2">
                      <span className="font-mono text-xs text-neutral-800">
                        Tự đánh giá số điểm đạt được cho bài mạch điện này:
                      </span>
                      <div className="flex flex-wrap items-center gap-1 sm:justify-end">
                        {[0, 2, 4, 6, 8, 10].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            onClick={() =>
                              setSelfGradedCircuitPoints((prev) => ({
                                ...prev,
                                [ckt.id]: pts,
                              }))
                            }
                            className={cn(
                              "flex-1 sm:flex-none px-2 py-1 text-xs font-mono border transition-none min-h-[28px] text-center",
                              (selfGradedCircuitPoints[ckt.id] ?? 0) === pts
                                ? "bg-blue-950 text-white border-blue-950 font-bold"
                                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                            )}
                          >
                            {pts}đ
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* FINAL SUBMIT & SCORE SUMMARY BAR */}
      {/* ============================================================== */}
      <div className="p-3 sm:p-4 bg-white border-2 border-neutral-900 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sticky bottom-2 z-20 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-950 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="font-mono font-bold text-[10px] sm:text-xs uppercase text-neutral-500 truncate">
              TỔNG KẾT ĐIỂM BÀI THI:
            </div>
            <div className="text-sm sm:text-lg font-black text-neutral-950 font-mono flex flex-wrap items-baseline gap-1.5">
              <span>{totalCalculatedScore} / {maxPossibleScore} ĐIỂM</span>
              <span className="text-[10px] sm:text-xs font-normal text-neutral-600">
                (TN: {mcScore}/{totalMcPoints} • Toán: {currentSelfMath}/{totalMathPoints} • Mạch: {currentSelfCircuit}/{totalCircuitPoints})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          {!isSubmitted ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsSubmitted(true);
                setIsTimerRunning(false);
                if (onRecordScore) {
                  onRecordScore(totalCalculatedScore, maxPossibleScore);
                }
              }}
              className="font-mono text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[38px] py-1.5 px-3"
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">NỘP BÀI THI & CHẤM ĐIỂM TRẮC NGHIỆM</span>
              <span className="sm:hidden">NỘP BÀI & CHẤM ĐIỂM</span>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <span
                className={cn(
                  "font-mono font-bold text-xs px-2.5 py-1.5 border text-center",
                  totalCalculatedScore >= exam.passingScore
                    ? "bg-emerald-100 border-emerald-600 text-emerald-950"
                    : "bg-red-100 border-red-600 text-red-950"
                )}
              >
                {totalCalculatedScore >= exam.passingScore ? "ĐẠT YÊU CẦU NGHỀ" : "CHƯA ĐẠT (CẦN ÔN LẠI)"}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetExam}
                className="font-mono text-xs flex items-center justify-center gap-1 w-full sm:w-auto min-h-[34px]"
              >
                <Refresh className="w-3.5 h-3.5 shrink-0" />
                <span>LÀM LẠI ĐỀ NÀY</span>
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateNewExam}
            className="font-mono text-xs flex items-center justify-center gap-1.5 border-blue-900 text-blue-950 font-bold w-full sm:w-auto min-h-[34px]"
          >
            <Refresh className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">SINH ĐỀ THI MỚI (RANDOM)</span>
            <span className="sm:hidden">SINH ĐỀ MỚI (NGẪU NHIÊN)</span>
          </Button>

          {onBackToSubject && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onBackToSubject}
              className="font-mono text-xs w-full sm:w-auto min-h-[34px] justify-center"
            >
              QUAY LẠI MÔN HỌC
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
