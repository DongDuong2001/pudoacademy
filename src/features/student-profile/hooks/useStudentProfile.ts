"use client";

import { useState, useEffect, useCallback } from "react";
import { StudentProfile, DEFAULT_STUDENT_PROFILE, SubjectExamRecord } from "@/types/student";

const STORAGE_KEY = "pudo_precollege_student_profile";
const TOKEN_KEY = "pudo_auth_token";

export function useStudentProfile() {
  // Lazy initializers to avoid setState inside useEffect and avoid cascading renders
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window === "undefined") return DEFAULT_STUDENT_PROFILE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STUDENT_PROFILE,
          ...parsed,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          masteredFlashcards: Array.isArray(parsed.masteredFlashcards) ? parsed.masteredFlashcards : [],
          examRecords: Array.isArray(parsed.examRecords) ? parsed.examRecords : [],
        };
      }
    } catch {
      // LocalStorage unavailable
    }
    return DEFAULT_STUDENT_PROFILE;
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Save helper
  const saveProfile = useCallback((updated: StudentProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage full
    }
  }, []);

  // Async sync with Academy Backend API on mount & when token changes (via HTTPOnly cookie + Bearer)
  useEffect(() => {
    const headers: Record<string, string> = {};
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    // Verify token & profile via HTTPOnly Cookie (credentials: "include") or Bearer header
    fetch("/api/auth/me", {
      headers,
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && data.student) {
          if (data.token && !authToken) {
            setAuthToken(data.token);
            try {
              localStorage.setItem(TOKEN_KEY, data.token);
            } catch {}
          }
          setProfile((prev) => {
            const updated: StudentProfile = {
              ...prev,
              id: data.student.id,
              email: data.student.email,
              name: data.student.name,
              targetSchool: data.student.targetCollege || prev.targetSchool,
              academicYear: data.student.academicYear || prev.academicYear,
              notes: data.student.notes || prev.notes,
              isCloudSynced: true,
              examRecords:
                data.student.examsTaken && data.student.examsTaken.length > 0
                  ? data.student.examsTaken
                  : prev.examRecords,
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      })
      .catch(() => {
        // Keep offline profile if network fails
      });

    // Also fetch completed lessons from backend
    fetch("/api/student/lesson-complete", {
      headers,
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.completedSlugs)) {
          setProfile((prev) => {
            const merged = Array.from(new Set([...prev.completedLessons, ...data.completedSlugs]));
            const updated: StudentProfile = {
              ...prev,
              completedLessons: merged,
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      })
      .catch(() => {});
  }, [authToken]);

  // Register new student with Academy Backend
  const registerWithNeon = async (
    email: string,
    password: string,
    name: string,
    targetCollege?: string,
    academicYear?: string,
    rememberMe = true
  ): Promise<{ success: boolean; message?: string }> => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Receives HTTPOnly Cookie
        body: JSON.stringify({
          email,
          password,
          name,
          targetCollege: targetCollege || "Trường Cao đẳng Kỹ thuật Công nghệ",
          academicYear: academicYear || "K2026 - K2029 (Hệ chính quy 3 năm)",
          rememberMe,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = data.error || "Đăng ký thất bại. Vui lòng thử lại.";
        setAuthError(errMsg);
        return { success: false, message: errMsg };
      }

      // Success
      if (data.token) {
        setAuthToken(data.token);
        try {
          localStorage.setItem(TOKEN_KEY, data.token);
        } catch {}
      }

      const newProfile: StudentProfile = {
        ...profile,
        id: data.student.id,
        email: data.student.email,
        name: data.student.name,
        targetSchool: data.student.targetCollege,
        academicYear: data.student.academicYear,
        isCloudSynced: true,
      };
      saveProfile(newProfile);

      return { success: true, message: data.message };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Lỗi mạng hoặc không thể kết nối tới máy chủ học viện.";
      setAuthError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Login student with Academy Backend
  const loginWithNeon = async (
    email: string,
    password: string,
    rememberMe = true
  ): Promise<{ success: boolean; message?: string }> => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Receives HTTPOnly Cookie
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = data.error || "Đăng nhập thất bại. Kiểm tra lại thông tin.";
        setAuthError(errMsg);
        return { success: false, message: errMsg };
      }

      if (data.token) {
        setAuthToken(data.token);
        try {
          localStorage.setItem(TOKEN_KEY, data.token);
        } catch {}
      }

      const updatedProfile: StudentProfile = {
        ...profile,
        id: data.student.id,
        email: data.student.email,
        name: data.student.name,
        targetSchool: data.student.targetCollege || profile.targetSchool,
        academicYear: data.student.academicYear || profile.academicYear,
        notes: data.student.notes || profile.notes,
        isCloudSynced: true,
        examRecords: data.student.examsTaken || profile.examRecords,
      };
      saveProfile(updatedProfile);

      return { success: true, message: data.message };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Không thể kết nối máy chủ học viện.";
      setAuthError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Logout - clears HTTPOnly cookie and local state
  const logout = useCallback(() => {
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    setAuthToken(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setProfile((prev) => ({
      ...prev,
      isCloudSynced: false,
    }));
  }, []);

  const updateProfileInfo = useCallback(
    (name: string, targetSchool: string, notes?: string, academicYear?: string) => {
      saveProfile({
        ...profile,
        name: name.trim() || DEFAULT_STUDENT_PROFILE.name,
        targetSchool: targetSchool.trim() || DEFAULT_STUDENT_PROFILE.targetSchool,
        academicYear: academicYear?.trim() || profile.academicYear,
        notes: notes ?? profile.notes,
      });
    },
    [profile, saveProfile]
  );

  const recordExamScore = useCallback(
    (record: SubjectExamRecord) => {
      const existingIdx = profile.examRecords.findIndex(
        (r) => r.subjectCode === record.subjectCode
      );
      const newRecords = [...profile.examRecords];
      if (existingIdx >= 0) {
        newRecords[existingIdx] = record;
      } else {
        newRecords.push(record);
      }

      const updated = {
        ...profile,
        examRecords: newRecords,
      };
      saveProfile(updated);

      // Async sync to Backend DB via cookie & auth token
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      fetch("/api/student/exam", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(record),
      }).catch((err) => console.warn("Failed to sync exam score to academy:", err));
    },
    [profile, saveProfile, authToken]
  );

  const toggleMasteredFlashcard = useCallback(
    (cardId: string) => {
      const exists = profile.masteredFlashcards.includes(cardId);
      const updatedList = exists
        ? profile.masteredFlashcards.filter((id) => id !== cardId)
        : [...profile.masteredFlashcards, cardId];

      saveProfile({
        ...profile,
        masteredFlashcards: updatedList,
      });
    },
    [profile, saveProfile]
  );

  const toggleLessonCompleted = useCallback(
    (slug: string) => {
      const isAlreadyCompleted = profile.completedLessons.includes(slug);
      const nextCompleted = isAlreadyCompleted
        ? profile.completedLessons.filter((s) => s !== slug)
        : [...profile.completedLessons, slug];

      saveProfile({
        ...profile,
        completedLessons: nextCompleted,
      });

      // Async sync to Academy Backend DB
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      fetch("/api/student/lesson-complete", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          lessonSlug: slug,
          isCompleted: !isAlreadyCompleted,
        }),
      }).catch((err) => console.warn("Failed to sync completed lesson to academy:", err));
    },
    [profile, saveProfile, authToken]
  );

  const resetAllProgress = useCallback(() => {
    logout();
    saveProfile(DEFAULT_STUDENT_PROFILE);
  }, [logout, saveProfile]);

  // Readiness Calculation: Exams (50%) + Completed Lessons (30%) + Flashcards (20%)
  const examPoints = Math.min(50, profile.examRecords.length * 5); // 10 exams = 50%
  const lessonPoints = Math.min(30, Math.round((profile.completedLessons.length / 30) * 30));
  const flashcardPoints = Math.min(20, Math.round((profile.masteredFlashcards.length / 20) * 20));
  const readinessPercent = Math.min(100, examPoints + lessonPoints + flashcardPoints);

  const isLoggedIn = Boolean((authToken || profile.email) && profile.isCloudSynced);

  return {
    profile,
    authToken,
    isLoggedIn,
    authError,
    isAuthenticating,
    registerWithNeon,
    loginWithNeon,
    registerStudent: registerWithNeon,
    loginStudent: loginWithNeon,
    logout,
    updateProfileInfo,
    recordExamScore,
    toggleMasteredFlashcard,
    toggleLessonCompleted,
    resetAllProgress,
    readinessPercent,
  };
}
