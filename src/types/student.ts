export interface SubjectExamRecord {
  examId: string;
  subjectCode: string;
  subjectTitle: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface StudentProfile {
  id?: string;
  email?: string;
  name: string;
  targetSchool: string; // Tên trường chuẩn bị nhập học
  academicYear?: string; // Niên khóa (e.g. K2026 - K2029)
  startDate: string;
  notes: string;
  masteredFlashcards: string[]; // Danh sách ID thẻ flashcard đã thuộc
  completedLessons: string[]; // Danh sách slug bài học đã học xong
  examRecords: SubjectExamRecord[];
  isCloudSynced?: boolean; // Đã liên kết máy chủ học viện
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: "Học Viên Tiền Đề",
  targetSchool: "Trường Cao đẳng Kỹ thuật Công nghệ",
  academicYear: "K2026 - K2029 (Hệ chính quy 3 năm)",
  startDate: new Date().toISOString(),
  notes: "Mục tiêu: Nắm vững bản chất điện - nhiệt động học - sơ đồ mạch trước khi vào trường.",
  masteredFlashcards: [],
  completedLessons: [],
  examRecords: [],
  isCloudSynced: false,
};
