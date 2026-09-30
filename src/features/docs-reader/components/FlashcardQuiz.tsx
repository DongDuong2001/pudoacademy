"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  generateAllFlashcards,
  generateRandomExam,
} from "../utils/knowledgeGenerator";
import { KnowledgeCategory, QuizQuestion } from "@/types/quiz";
import {
  Refresh,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
} from "reicon-react";
import { MathText } from "@/components/ui/MathFormula";

type LeitnerBox = 1 | 2 | 3;

export const FlashcardQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"FLASHCARD" | "QUIZ">("FLASHCARD");

  // FLASHCARD STATE
  const allFlashcards = useMemo(() => generateAllFlashcards(), []);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory>("ALL");

  // SRS Leitner Boxes (Box 1: Cần ôn gấp, Box 2: Đang nhớ, Box 3: Thành thạo)
  const [cardBoxes, setCardBoxes] = useState<Record<string, LeitnerBox>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("pudo_flashcards_srs_boxes");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [boxFilter, setBoxFilter] = useState<"ALL" | 1 | 2 | 3>("ALL");

  // Filtered Cards based on Subject, Category, and SRS Box
  const filteredCards = useMemo(() => {
    return allFlashcards.filter((c) => {
      const matchSub = selectedSubject === "ALL" || c.subjectCode === selectedSubject;
      const matchCat = selectedCategory === "ALL" || c.category === selectedCategory;
      const currentBox = cardBoxes[c.id] || 1;
      const matchBox = boxFilter === "ALL" || currentBox === boxFilter;
      return matchSub && matchCat && matchBox;
    });
  }, [allFlashcards, selectedSubject, selectedCategory, boxFilter, cardBoxes]);

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];

  // SRS Stats
  const srsStats = useMemo(() => {
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    allFlashcards.forEach((c) => {
      const b = cardBoxes[c.id] || 1;
      if (b === 1) b1++;
      else if (b === 2) b2++;
      else if (b === 3) b3++;
    });
    const percentMastered = Math.round((b3 / allFlashcards.length) * 100);
    return { b1, b2, b3, percentMastered };
  }, [allFlashcards, cardBoxes]);

  const handleNextCard = () => {
    setIsFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }
  };

  const setCardLevel = (id: string, box: LeitnerBox) => {
    setCardBoxes((prev) => {
      const next = { ...prev, [id]: box };
      try {
        localStorage.setItem("pudo_flashcards_srs_boxes", JSON.stringify(next));
      } catch {}
      return next;
    });
    handleNextCard();
  };

  // QUIZ STATE (DYNAMIC GENERATION BASED ON KNOWLEDGE)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    generateRandomExam(8)
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, number>>({});
  const [quizSubjectFilter, setQuizSubjectFilter] = useState<string>("ALL");

  const currentQuiz = quizQuestions[currentQuizIndex];
  const isAnswered = answeredMap[currentQuizIndex] !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuiz) return;
    setAnsweredMap((prev) => ({ ...prev, [currentQuizIndex]: idx }));
    if (idx === currentQuiz.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex((prev) => prev - 1);
    }
  };

  const handleGenerateNewExam = () => {
    const newExam = generateRandomExam(8, quizSubjectFilter);
    setQuizQuestions(newExam);
    setCurrentQuizIndex(0);
    setScore(0);
    setAnsweredMap({});
  };

  const subjectsList = [
    { code: "ALL", label: "TẤT CẢ" },
    { code: "DL-101", label: "DL-101: An toàn điện" },
    { code: "DL-102", label: "DL-102: Khí cụ & Máy nén" },
    { code: "DL-103", label: "DL-103: Gia công ống đồng" },
    { code: "DL-201", label: "DL-201: Nhiệt động & Gas lạnh" },
    { code: "DL-202", label: "DL-202: Hút chân không" },
    { code: "DL-203", label: "DL-203: Mạch điện Inverter" },
    { code: "INVERTER-DIAG", label: "Mã lỗi Inverter" },
  ];

  const categoriesList: { key: KnowledgeCategory; label: string }[] = [
    { key: "ALL", label: "TẤT CẢ DẠNG" },
    { key: "FORMULA", label: "CÔNG THỨC" },
    { key: "MEASUREMENT", label: "ĐO KIỂM HIỆN TRƯỜNG" },
    { key: "PITFALL", label: "CẢNH BÁO SAI LẦM" },
    { key: "DIAGNOSTIC", label: "MÃ LỖI BIẾN TẦN" },
    { key: "THEORY", label: "KỸ NĂNG NGHỀ" },
  ];

  return (
    <div className="space-y-6 my-4 w-full min-w-0 font-sans">
      {/* Header Mode Switcher */}
      <div className="p-4 bg-white border border-neutral-300">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 bg-blue-950 text-white font-mono font-bold text-xs shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <h2 className="font-mono font-bold text-sm text-neutral-950 uppercase tracking-wider truncate">
                ÔN TẬP GHI NHỚ SRS & TRẮC NGHIỆM ĐƯỢC TỰ ĐỘNG SINH TỪ GIÁO TRÌNH
              </h2>
              <p className="text-[11px] text-neutral-500 truncate">
                Hệ thống trích xuất trực tiếp công thức, số đo chuẩn, sai lầm phổ biến và mã lỗi Inverter
              </p>
            </div>
          </div>

          {/* Tab Selectors */}
          <div className="flex border border-neutral-300 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("FLASHCARD")}
              className={cn(
                "px-3 py-1.5 text-xs font-mono font-bold transition-none border-r border-neutral-300",
                activeTab === "FLASHCARD"
                  ? "bg-blue-950 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              )}
            >
              1. FLASHCARDS SRS ({allFlashcards.length} THẺ)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("QUIZ")}
              className={cn(
                "px-3 py-1.5 text-xs font-mono font-bold transition-none",
                activeTab === "QUIZ"
                  ? "bg-blue-950 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              )}
            >
              2. TRẮC NGHIỆM TỰ SINH ĐỀ THI
            </button>
          </div>
        </div>

        {/* ----------------- TAB 1: FLASHCARDS SRS ----------------- */}
        {activeTab === "FLASHCARD" && (
          <div className="space-y-4">
            {/* SRS Leitner Bins Summary Bar */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900 uppercase">HỘP GHI NHỚ LEITNER:</span>
                <button
                  type="button"
                  onClick={() => {
                    setBoxFilter("ALL");
                    setCurrentCardIndex(0);
                  }}
                  className={cn(
                    "px-2 py-0.5 border text-[11px]",
                    boxFilter === "ALL" ? "bg-neutral-900 text-white font-bold" : "bg-white text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  Tất cả ({allFlashcards.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBoxFilter(1);
                    setCurrentCardIndex(0);
                  }}
                  className={cn(
                    "px-2 py-0.5 border text-[11px]",
                    boxFilter === 1 ? "bg-red-700 text-white font-bold border-red-700" : "bg-red-50 text-red-900 border-red-300 hover:bg-red-100"
                  )}
                >
                  🔴 Hộp 1: Cần ôn ({srsStats.b1})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBoxFilter(2);
                    setCurrentCardIndex(0);
                  }}
                  className={cn(
                    "px-2 py-0.5 border text-[11px]",
                    boxFilter === 2 ? "bg-amber-600 text-white font-bold border-amber-600" : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                  )}
                >
                  🟡 Hộp 2: Tạm nhớ ({srsStats.b2})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBoxFilter(3);
                    setCurrentCardIndex(0);
                  }}
                  className={cn(
                    "px-2 py-0.5 border text-[11px]",
                    boxFilter === 3 ? "bg-emerald-700 text-white font-bold border-emerald-700" : "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                  )}
                >
                  🟢 Hộp 3: Thành thạo ({srsStats.b3})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-500">MỨC ĐỘ THUỘC BÀI:</span>
                <strong className="text-emerald-700 font-bold text-sm">{srsStats.percentMastered}%</strong>
              </div>
            </div>

            {/* Subject Filters */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase mr-1">
                  MÔN HỌC:
                </span>
                {subjectsList.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(item.code);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                    }}
                    className={cn(
                      "px-2 py-0.5 text-[11px] font-mono font-bold border transition-none",
                      selectedSubject === item.code
                        ? "bg-blue-950 text-white border-blue-950"
                        : "bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase mr-1">
                  DẠNG BÀI:
                </span>
                {categoriesList.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                    }}
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-mono border transition-none",
                      selectedCategory === cat.key
                        ? "bg-neutral-900 text-white border-neutral-900 font-bold"
                        : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcard Box */}
            {currentCard ? (
              <div className="space-y-3">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={cn(
                    "w-full min-h-[250px] p-5 border-2 cursor-pointer transition-none flex flex-col justify-between select-none relative",
                    isFlipped
                      ? "bg-blue-50/40 border-blue-950 text-neutral-950"
                      : "bg-white border-neutral-800 text-neutral-900 hover:border-blue-950"
                  )}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-blue-950 text-white px-2 py-0.5">
                        {currentCard.subjectCode}
                      </span>
                      <span className="text-xs text-neutral-600 font-medium">
                        {currentCard.subjectTitle}
                      </span>
                      <Badge variant="info" size="sm">
                        {currentCard.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-neutral-500">
                        THẺ {currentCardIndex + 1} / {filteredCards.length}
                      </span>
                      <span
                        className={cn(
                          "px-1.5 py-0.2 font-bold",
                          (cardBoxes[currentCard.id] || 1) === 3
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : (cardBoxes[currentCard.id] || 1) === 2
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-red-100 text-red-900 border border-red-300"
                        )}
                      >
                        HỘP {cardBoxes[currentCard.id] || 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="py-4">
                    {!isFlipped ? (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                          [MẶT TRƯỚC - CÂU HỎI THỰC CHIẾN]
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug">
                          <MathText text={currentCard.question} />
                        </h3>
                        <p className="text-xs text-blue-900 font-medium pt-2 flex items-center gap-1">
                          <Refresh className="w-3.5 h-3.5" />
                          <span>Nhấp chuột vào khung để lật xem lời giải & tiêu chuẩn kỹ thuật...</span>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-blue-950 uppercase tracking-wider block">
                          [MẶT SAU - ĐÁP ÁN & BẢN CHẤT KỸ THUẬT]
                        </span>
                        <div className="text-sm text-neutral-900 leading-relaxed font-medium whitespace-pre-line">
                          <MathText text={currentCard.answer} />
                        </div>

                        {currentCard.formulaOrRule && (
                          <div className="p-2 bg-neutral-900 text-white font-mono text-xs font-bold">
                            ➔ QUY TẮC CỐT LÕI: <MathText text={currentCard.formulaOrRule} />
                          </div>
                        )}

                        {currentCard.sampleCalculation && (
                          <div className="p-2.5 bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-800">
                            <span className="font-bold text-blue-950 block text-[10px] uppercase">
                              VÍ DỤ TÍNH TOÁN HIỆN TRƯỜNG:
                            </span>
                            <MathText text={currentCard.sampleCalculation} />
                          </div>
                        )}

                        <div className="p-2.5 bg-amber-50 border-l-2 border-amber-600 text-xs text-amber-950 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong>Lưu ý công trình:</strong> <MathText text={currentCard.fieldTip} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer status */}
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-2 text-[11px] font-mono text-neutral-500">
                    <span>ACTIVE RECALL • SPATIAL REPETITION</span>
                    <span>CLICK ĐỂ LẬT THẺ</span>
                  </div>
                </div>

                {/* SRS Card Controls: Rate retention level */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevCard}
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>THẺ TRƯỚC</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextCard}
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <span>THẺ TIẾP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* 3 Leitner Rating Buttons */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setCardLevel(currentCard.id, 1)}
                      className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 border border-red-400 text-red-950 font-bold"
                      title="Chưa nhớ - Xếp vào Hộp 1 để ôn lại thường xuyên"
                    >
                      🔴 Chưa nhớ (Hộp 1)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardLevel(currentCard.id, 2)}
                      className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 border border-amber-400 text-amber-950 font-bold"
                      title="Tạm nhớ - Cần củng cố thêm"
                    >
                      🟡 Tạm nhớ (Hộp 2)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardLevel(currentCard.id, 3)}
                      className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 text-emerald-950 font-bold"
                      title="Đã thuộc - Chuyển vào Hộp 3 thành thạo"
                    >
                      🟢 Thành thạo (Hộp 3)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-neutral-300 font-mono text-xs text-neutral-500">
                Không tìm thấy thẻ nào trong mục lọc này. Hãy chọn &quot;TẤT CẢ&quot; để hiển thị lại.
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: QUIZ GENERATOR ----------------- */}
        {activeTab === "QUIZ" && (
          <div className="space-y-4">
            {/* Subject Selector for Random Exam */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-800">
                  CHỌN PHẠM VI MÔN THI:
                </span>
                <select
                  value={quizSubjectFilter}
                  onChange={(e) => setQuizSubjectFilter(e.target.value)}
                  className="font-mono text-xs p-1 border border-neutral-300 bg-white"
                >
                  <option value="ALL">Tất cả các môn (Tổng hợp)</option>
                  <option value="DL-101">DL-101: An toàn điện</option>
                  <option value="DL-102">DL-102: Động cơ máy nén</option>
                  <option value="DL-103">DL-103: Gia công ống đồng</option>
                  <option value="DL-201">DL-201: Nhiệt động học</option>
                  <option value="DL-202">DL-202: Hút chân không</option>
                  <option value="DL-203">DL-203: Mạch Inverter</option>
                </select>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleGenerateNewExam}
                className="font-mono text-xs flex items-center gap-1.5"
              >
                <Refresh className="w-3.5 h-3.5" />
                <span>SINH BỘ ĐỀ THI MỚI (XÁO TRỘN ĐÁP ÁN)</span>
              </Button>
            </div>

            {/* Quiz Progress & Score */}
            {currentQuiz ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="info" size="sm">
                      CÂU HỎI {currentQuizIndex + 1} / {quizQuestions.length}
                    </Badge>
                    <span className="font-mono font-bold text-xs text-neutral-900">
                      [{currentQuiz.subjectCode}] {currentQuiz.subjectTitle}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {currentQuiz.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span>
                      ĐIỂM SỐ: <strong>{score}</strong> / {Object.keys(answeredMap).length}
                    </span>
                  </div>
                </div>

                {/* Scenario Callout */}
                <div className="p-2.5 bg-neutral-100 border-l-2 border-neutral-600 text-xs text-neutral-700">
                  <span className="font-bold uppercase text-[10px] text-neutral-500 block">
                    TÌNH HUỐNG HIỆN TRƯỜNG GIẢ ĐỊNH:
                  </span>
                  <MathText text={currentQuiz.scenario} />
                </div>

                {/* Question Text */}
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 leading-snug">
                  <MathText text={currentQuiz.question} />
                </h3>

                {/* 4 Options */}
                <div className="space-y-2">
                  {currentQuiz.options.map((opt, oIdx) => {
                    const isSelected = answeredMap[currentQuizIndex] === oIdx;
                    const isCorrect = oIdx === currentQuiz.correctIndex;

                    let btnStyle = "bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-900";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-red-50 border-red-600 text-red-950";
                      } else {
                        btnStyle = "bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(oIdx)}
                        className={cn(
                          "w-full text-left p-3 border transition-none flex items-start gap-2.5 text-xs min-w-0 overflow-hidden",
                          btnStyle
                        )}
                      >
                        <span className="font-mono font-bold px-1.5 py-0.5 bg-neutral-200 text-neutral-900 shrink-0 text-[11px]">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <div className="min-w-0 flex-1 break-words">
                          <div>
                            <MathText text={opt.text} />
                          </div>
                          {isAnswered && (isCorrect || isSelected) && (
                            <div className="mt-1 pt-1 border-t border-neutral-200 text-[11px] text-neutral-600 font-sans">
                              <strong>Giải thích:</strong> <MathText text={opt.explanation} />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Core Rule Feedback */}
                {isAnswered && (
                  <div className="p-3 bg-blue-50/60 border border-blue-200 text-xs text-blue-950 font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-900" />
                      <span>QUY TẮC NGHỀ CỐT LÕI:</span>
                    </div>
                    <div className="text-[11px] font-sans text-neutral-800">
                      <MathText text={currentQuiz.coreRule} />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentQuizIndex === 0}
                    onClick={handlePrevQuiz}
                    className="font-mono text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>CÂU TRƯỚC</span>
                  </Button>

                  <Button
                    variant={isAnswered ? "primary" : "outline"}
                    size="sm"
                    disabled={currentQuizIndex === quizQuestions.length - 1}
                    onClick={handleNextQuiz}
                    className="font-mono text-xs flex items-center gap-1"
                  >
                    <span>CÂU TIẾP THEO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
