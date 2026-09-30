export interface LessonItem {
  id: string;
  code: string;
  title: string;
  slug: string;
  type: "THEORY" | "PRACTICE" | "WORKSHOP";
  durationHours: number;
  summary: string;
}

export interface Prerequisite {
  code: string;
  name: string;
  reason: string;
}

export interface DownstreamUnlock {
  code: string;
  name: string;
  relationship?: string;
  reason?: string;
}

export interface Subject {
  id: string;
  code: string; // e.g., "DL-101"
  semester: number; // 1, 2, 3
  title: string;
  credits: number;
  level: "CƠ SỞ NGHỀ (NỀN TẢNG)" | "CHUYÊN NGÀNH CƠ BẢN" | "CHUYÊN NGÀNH NÂNG CAO" | "THỰC TẬP & TỐT NGHIỆP";
  tagline: string; // Tóm tắt 1 câu mục tiêu môn học
  whyLearn: string; // Tại sao phải học môn này trước?
  prerequisites: Prerequisite[];
  downstreamUnlocks: DownstreamUnlock[];
  practicalFieldSkills: string[]; // Ra công trình tự tay làm được gì
  requiredTools: string[]; // Dụng cụ đồ nghề cần trang bị
  lessons: LessonItem[];
}

export interface Semester {
  semesterNumber: number;
  semesterName: string;
  yearNumber: number; // 1, 2, 3 (Năm 1, Năm 2, Năm 3)
  yearName: string; // "NĂM 1: NỀN TẢNG KỸ THUẬT & VẬT LÝ NHIỆT LẠNH"
  focusTheme: string;
  description: string;
  subjects: Subject[];
}
