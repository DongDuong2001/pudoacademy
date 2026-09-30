"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { Sidebar } from "@/features/docs-reader/components/Sidebar";
import { CurriculumViewer } from "@/features/docs-reader/components/CurriculumViewer";
import { FlashcardQuiz } from "@/features/docs-reader/components/FlashcardQuiz";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  FileText,
  Printer,
  Sparkles,
  Award,
  BookOpen,
} from "reicon-react";
import { SubjectExamView } from "@/features/docs-reader/components/SubjectExamView";
import { getSubjectExam, generateRandomSubjectExam } from "@/features/docs-reader/data/subjectExamsData";
import { SubjectExam } from "@/types/exam";
import { useStudentProfile } from "@/features/student-profile/hooks/useStudentProfile";
import { StudentProfileModal } from "@/features/student-profile/components/StudentProfileModal";
import { AuthModal } from "@/features/student-profile/components/AuthModal";
import { LandingPage } from "@/features/landing/components/LandingPage";
import { DynamicLessonViewer } from "@/features/docs-reader/components/DynamicLessonViewer";
import { CheatsheetViewer } from "@/features/cheatsheet/components/CheatsheetViewer";

// Helper to read initial navigation state from browser URL on mount
const getInitialUrlState = () => {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasDashboard = params.get("dashboard") === "1" || params.has("view");
    const viewParam = params.get("view")?.toUpperCase();
    const slugParam = params.get("slug");
    const subjectParam = params.get("subject")?.toLowerCase();
    const validViews = ["CURRICULUM", "LESSON", "QUIZ", "EXAM", "CHEATSHEET"];
    return {
      inside: hasDashboard,
      view: (validViews.includes(viewParam || "") ? (viewParam as "CURRICULUM" | "LESSON" | "QUIZ" | "EXAM" | "CHEATSHEET") : "CURRICULUM"),
      slug: slugParam || "inverter/communication-circuit-u4",
      subject: subjectParam || "dl-101",
    };
  } catch {
    return null;
  }
};

export default function TechnicalDocPage() {
  const init = getInitialUrlState();

  // Navigation state initialized directly from URL
  const [isInsideDashboard, setIsInsideDashboard] = useState<boolean>(() => init ? init.inside : false);
  const [viewMode, setViewMode] = useState<"CURRICULUM" | "LESSON" | "QUIZ" | "EXAM" | "CHEATSHEET">(() => init ? init.view : "CURRICULUM");
  const [activeSlug, setActiveSlug] = useState<string>(() => init?.slug || "inverter/communication-circuit-u4");
  const [examSubject, setExamSubject] = useState<string>(() => init?.subject || "dl-101");
  const [currentExam, setCurrentExam] = useState<SubjectExam>(() => {
    const subj = init?.subject || "dl-101";
    return getSubjectExam(subj) || generateRandomSubjectExam(subj);
  });
  const [cheatsheetTab, setCheatsheetTab] = useState<"ALL" | "GAS" | "CALCULATORS" | "WIZARD" | "GLOSSARY" | "FORMULAS" | "SENSORS" | "PIPES" | "ERRORS" | "VOM">("ALL");

  // Student Profile & Backend Authentication
  const {
    profile,
    readinessPercent,
    isLoggedIn,
    registerWithNeon,
    loginWithNeon,
    logout,
    updateProfileInfo,
    recordExamScore,
    toggleLessonCompleted,
    resetAllProgress,
  } = useStudentProfile();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync state to URL search parameters without reloading (F5 will keep view)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (isInsideDashboard) {
      params.set("dashboard", "1");
      params.set("view", viewMode.toLowerCase());
      if (viewMode === "LESSON") params.set("slug", activeSlug);
      if (viewMode === "EXAM") params.set("subject", examSubject.toLowerCase());
    }
    const q = params.toString();
    const nextUrl = q ? `/?${q}` : "/";
    window.history.replaceState(null, "", nextUrl);
  }, [isInsideDashboard, viewMode, activeSlug, examSubject]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleGlobalSearch = () => {
    setIsInsideDashboard(true);
    setViewMode("LESSON");
    setTimeout(() => {
      scrollToSection("tra-cuu-ma-loi");
    }, 50);
  };

  const handleOpenLesson = (slug: string) => {
    setIsInsideDashboard(true);
    setActiveSlug(slug);
    setViewMode("LESSON");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTakeExam = (subjectCode: string) => {
    setIsInsideDashboard(true);
    setExamSubject(subjectCode);
    const ex = getSubjectExam(subjectCode) || generateRandomSubjectExam(subjectCode);
    setCurrentExam(ex);
    setViewMode("EXAM");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerateNewExam = () => {
    const ex = generateRandomSubjectExam(examSubject);
    setCurrentExam(ex);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* ============================================================== */}
      {/* 1. STANDALONE LANDING PAGE (SEPARATE FROM DASHBOARD)           */}
      {/* ============================================================== */}
      {!isInsideDashboard ? (
        <LandingPage
          onEnterDashboard={() => {
            if (!isLoggedIn) {
              setInitialAuthTab("REGISTER");
              setIsAuthModalOpen(true);
            } else {
              setIsInsideDashboard(true);
              setViewMode("CURRICULUM");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onNavigate={(mode, subj) => {
            if (!isLoggedIn) {
              setInitialAuthTab("REGISTER");
              setIsAuthModalOpen(true);
            } else {
              setIsInsideDashboard(true);
              if (subj) {
                handleTakeExam(subj);
              } else {
                setViewMode(mode);
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onOpenProfile={() => {
            if (isLoggedIn) {
              setIsProfileModalOpen(true);
            } else {
              setInitialAuthTab("LOGIN");
              setIsAuthModalOpen(true);
            }
          }}
          onOpenAuth={(tab) => {
            setInitialAuthTab(tab);
            setIsAuthModalOpen(true);
          }}
          studentName={profile.name}
          readinessPercent={readinessPercent}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        /* ============================================================== */
        /* 2. LEARNING HUB / DASHBOARD VIEW                               */
        /* ============================================================== */
        <div className="min-h-screen flex flex-col bg-white">
          {/* Header with Exit to Landing option */}
          <Header
            onSearchSubmit={handleGlobalSearch}
            studentProfile={profile}
            readinessPercent={readinessPercent}
            onOpenProfileModal={() => {
              setIsProfileModalOpen(true);
            }}
            onGoHome={() => setIsInsideDashboard(false)}
            onExitToLanding={() => setIsInsideDashboard(false)}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
            onOpenCheatsheet={() => setViewMode("CHEATSHEET")}
          />

          {/* Mobile Drawer Sidebar */}
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              {/* Slide-in Menu */}
              <div className="relative z-10 w-72 max-w-[85vw] h-full bg-neutral-100 shadow-xl flex flex-col">
                <Sidebar
                  activeSlug={activeSlug}
                  completedLessons={profile.completedLessons}
                  onSelectSlug={(slug) => {
                    setIsMobileSidebarOpen(false);
                    if (slug === "field-tools/error-lookup") {
                      setViewMode("LESSON");
                      setTimeout(() => scrollToSection("tra-cuu-ma-loi"), 100);
                    } else if (slug === "field-tools/pt-chart") {
                      setViewMode("LESSON");
                      setTimeout(() => scrollToSection("tra-bang-ap-suat"), 100);
                    } else if (slug === "field-tools/cheatsheet") {
                      setCheatsheetTab("ALL");
                      setViewMode("CHEATSHEET");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (slug === "field-tools/piping-sizer") {
                      setCheatsheetTab("CALCULATORS");
                      setViewMode("CHEATSHEET");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (slug === "field-tools/diagnostic-wizard") {
                      setCheatsheetTab("WIZARD");
                      setViewMode("CHEATSHEET");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      handleOpenLesson(slug);
                    }
                  }}
                  onOpenLanding={() => {
                    setIsInsideDashboard(false);
                    setIsMobileSidebarOpen(false);
                  }}
                  isLandingMode={false}
                  onOpenCurriculumOverview={() => {
                    setViewMode("CURRICULUM");
                    setIsMobileSidebarOpen(false);
                  }}
                  isCurriculumMode={viewMode === "CURRICULUM"}
                  onCloseMobile={() => setIsMobileSidebarOpen(false)}
                  className="h-full w-full border-r-0"
                />
              </div>
            </div>
          )}

          {/* Main Dashboard Layout with Left Sidebar */}
          <div className="flex-1 flex w-full min-w-0">
            <Sidebar
              activeSlug={activeSlug}
              completedLessons={profile.completedLessons}
              onSelectSlug={(slug) => {
                if (slug === "field-tools/error-lookup") {
                  setViewMode("LESSON");
                  setTimeout(() => scrollToSection("tra-cuu-ma-loi"), 100);
                } else if (slug === "field-tools/pt-chart") {
                  setViewMode("LESSON");
                  setTimeout(() => scrollToSection("tra-bang-ap-suat"), 100);
                } else if (slug === "field-tools/cheatsheet") {
                  setCheatsheetTab("ALL");
                  setViewMode("CHEATSHEET");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (slug === "field-tools/piping-sizer") {
                  setCheatsheetTab("CALCULATORS");
                  setViewMode("CHEATSHEET");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (slug === "field-tools/diagnostic-wizard") {
                  setCheatsheetTab("WIZARD");
                  setViewMode("CHEATSHEET");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  handleOpenLesson(slug);
                }
              }}
              onOpenLanding={() => setIsInsideDashboard(false)}
              isLandingMode={false}
              onOpenCurriculumOverview={() => setViewMode("CURRICULUM")}
              isCurriculumMode={viewMode === "CURRICULUM"}
              className="hidden md:block"
            />

            <main className="flex-1 min-w-0 overflow-y-auto">
              <ContentContainer isWide={viewMode !== "LESSON"}>
                {/* Top 4 Learning Mode Tabs - Fully Responsive for Mobile & Desktop */}
                <div className="border-b border-neutral-300 pb-3 mb-5 sm:mb-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 w-full sm:w-auto">
                      <Button
                        variant={viewMode === "CURRICULUM" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("CURRICULUM")}
                        className="font-mono text-[11px] flex items-center justify-center gap-1.5 h-9 sm:h-8"
                      >
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">1. BẢN ĐỒ 6 KỲ</span>
                      </Button>

                      <Button
                        variant={viewMode === "LESSON" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("LESSON")}
                        className="font-mono text-[11px] flex items-center justify-center gap-1.5 h-9 sm:h-8"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">2. BÀI GIẢNG</span>
                      </Button>

                      <Button
                        variant={viewMode === "QUIZ" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("QUIZ")}
                        className="font-mono text-[11px] flex items-center justify-center gap-1.5 h-9 sm:h-8"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">3. FLASHCARD</span>
                      </Button>

                      <Button
                        variant={viewMode === "EXAM" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("EXAM")}
                        className="font-mono text-[11px] flex items-center justify-center gap-1.5 h-9 sm:h-8"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">4. THI HẾT MÔN</span>
                      </Button>

                      <Button
                        variant={viewMode === "CHEATSHEET" ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("CHEATSHEET")}
                        className="font-mono text-[11px] flex items-center justify-center gap-1.5 h-9 sm:h-8 col-span-2 sm:col-span-1"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">5. SỔ TAY CHEATSHEET</span>
                      </Button>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="font-mono text-[10px] flex items-center gap-1"
                        title="In tài liệu"
                      >
                        <Printer className="w-3 h-3" />
                        <span>IN TÀI LIỆU</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* VIEW 1: 3-YEAR CURRICULUM OVERVIEW */}
                {viewMode === "CURRICULUM" && (
                  <div className="space-y-6">
                    <div className="border-b border-neutral-300 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="info" size="sm">
                          LỘ TRÌNH ĐÀO TẠO TIỀN ĐỀ
                        </Badge>
                        <span className="font-mono text-xs text-neutral-500">
                          HÀNH TRANG TRƯỚC KHI VÀO HỌC CHÍNH QUY (6 HỌC KỲ / 18 HỌC PHẦN)
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight break-words">
                        Bản Đồ Môn Học 3 Năm & Nền Tảng Kỹ Thuật Điện Lạnh Tiền Đề
                      </h1>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed break-words">
                        Hệ thống ôn luyện được thiết kế theo nguyên lý <strong>&quot;Đặt móng vững trước - Lên tầng cao sau&quot;</strong>. Giúp học viên nắm chắc bản chất vật lý (Dòng điện, Áp suất, Môi chất lạnh, Sơ đồ khối bo mạch) trước khi bước chân vào học chính quy tại trường.
                      </p>
                    </div>

                    <CurriculumViewer
                      onOpenLesson={handleOpenLesson}
                      onTakeExam={handleTakeExam}
                    />
                  </div>
                )}

                {/* VIEW 2: DYNAMIC LESSON VIEWER */}
                {viewMode === "LESSON" && (
                  <DynamicLessonViewer
                    slug={activeSlug}
                    isCompleted={profile.completedLessons.includes(activeSlug)}
                    onToggleComplete={() => toggleLessonCompleted(activeSlug)}
                    onSelectLesson={(newSlug) => {
                      setActiveSlug(newSlug);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onTakeExam={(subjCode) => handleTakeExam(subjCode)}
                    onBackToCurriculum={() => setViewMode("CURRICULUM")}
                  />
                )}

                {/* VIEW 3: FLASHCARD & QUIZ */}
                {viewMode === "QUIZ" && (
                  <div className="space-y-6">
                    <div className="border-b border-neutral-300 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="warning" size="sm">
                          ACTIVE RECALL & THỰC CHIẾN
                        </Badge>
                        <span className="font-mono text-xs text-neutral-500">
                          GHI NHỚ ĐẶC TÍNH KỸ THUẬT VÀ PHẢN XẠ HIỆN TRƯỜNG
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight break-words">
                        Thẻ Ghi Nhớ Nhanh Flashcard & Trắc Nghiệm Tình Huống Điện Lạnh
                      </h1>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed break-words">
                        Rèn luyện trí nhớ và phản xạ phán đoán sự cố nghề: Thử thách giải quyết các tình huống nổ que đo, rò điện, đo chân cọc lốc và nạp gas đúng kỹ thuật.
                      </p>
                    </div>

                    <FlashcardQuiz />
                  </div>
                )}

                {/* VIEW 4: COMPREHENSIVE SUBJECT EXAM */}
                {viewMode === "EXAM" && (
                  <div className="space-y-6">
                    <SubjectExamView
                      exam={currentExam}
                      studentName={profile.name}
                      onGenerateNewExam={handleGenerateNewExam}
                      onRecordScore={(score, maxScore) => {
                        recordExamScore({
                          examId: currentExam.id,
                          subjectCode: currentExam.subjectCode,
                          subjectTitle: currentExam.subjectTitle,
                          score,
                          maxScore,
                          completedAt: new Date().toISOString(),
                        });
                      }}
                      onBackToSubject={() => setViewMode("CURRICULUM")}
                      onOpenCheatsheet={() => setViewMode("CHEATSHEET")}
                    />
                  </div>
                )}

                {/* VIEW 5: COMPREHENSIVE TECHNICAL CHEATSHEETS */}
                {viewMode === "CHEATSHEET" && (
                  <div className="space-y-6">
                    <CheatsheetViewer
                      initialTab={cheatsheetTab}
                      onOpenExam={() => setViewMode("EXAM")}
                    />
                  </div>
                )}
              </ContentContainer>
            </main>
          </div>
        </div>
      )}

      {/* 1. Student Auth Modal (Sign In & Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialAuthTab}
        onSuccess={() => {
          setIsInsideDashboard(true);
          setViewMode("CURRICULUM");
        }}
        onGuestPreview={() => {
          setIsInsideDashboard(true);
          setViewMode("CURRICULUM");
        }}
        onRegisterWithNeon={registerWithNeon}
        onLoginWithNeon={loginWithNeon}
      />

      {/* 2. Personal Student Profile Modal (Inside Dashboard Only) */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        readinessPercent={readinessPercent}
        isLoggedIn={isLoggedIn}
        onUpdateProfile={updateProfileInfo}
        onResetProgress={resetAllProgress}
        onLogout={logout}
      />
    </div>
  );
}
