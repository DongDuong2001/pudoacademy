export type KnowledgeCategory = "ALL" | "FORMULA" | "MEASUREMENT" | "PITFALL" | "DIAGNOSTIC" | "THEORY";

export interface FlashcardItem {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  category?: KnowledgeCategory;
  question: string;
  answer: string;
  formulaOrRule?: string;
  fieldTip: string;
  sampleCalculation?: string;
}

export interface QuizOption {
  text: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  category?: KnowledgeCategory;
  question: string;
  scenario: string; // Tình huống hiện trường giả định
  options: QuizOption[];
  correctIndex: number;
  coreRule: string; // Quy tắc cốt lõi cần nhớ
}
