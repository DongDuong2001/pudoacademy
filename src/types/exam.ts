export type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_MATH" | "ESSAY_CIRCUIT";

export interface MultipleChoiceExamQuestion {
  id: string;
  type: "MULTIPLE_CHOICE";
  question: string;
  scenario: string;
  options: {
    text: string;
    explanation: string;
  }[];
  correctIndex: number;
  points: number; // e.g. 2 điểm
  coreRule: string;
}

export interface MathEssayQuestion {
  id: string;
  type: "ESSAY_MATH";
  title: string;
  scenario: string; // Tình huống và số liệu bài toán
  givenData: {
    symbol: string;
    label: string;
    value: string;
    unit: string;
  }[];
  questions: string[]; // Các yêu cầu tính toán (1, 2, 3...)
  formulaHint?: string; // Gợi ý công thức nếu cần
  stepByStepSolution: {
    step: string;
    calculation: string;
    result: string;
    note: string;
    points: number;
  }[];
  evaluationCriteria: string[]; // Barem tiêu chí đánh giá kết quả
  totalPoints: number; // e.g. 10 điểm
}

export interface CircuitEssayQuestion {
  id: string;
  type: "ESSAY_CIRCUIT";
  title: string;
  circuitType: "INVERTER_COMMUNICATION" | "COMPRESSOR_MOTOR" | "DC_BUS_POWER" | "GROUNDING_RCBO";
  circuitDescription: string;
  testPoints: {
    point: string;
    location: string;
    nominalValue: string;
    significance: string;
  }[];
  diagnosticQuestions: string[]; // Câu hỏi phân tích mạch và pan bệnh
  stepByStepSolution: {
    analysis: string;
    keyPoints: string[];
    dangerWarning?: string;
    points: number;
  }[];
  totalPoints: number; // e.g. 10 điểm
}

export interface SubjectExam {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  examName: string;
  durationMinutes: number;
  description: string;
  multipleChoiceQuestions: MultipleChoiceExamQuestion[];
  mathEssayQuestions: MathEssayQuestion[];
  circuitEssayQuestions: CircuitEssayQuestion[];
  passingScore: number; // e.g. 60/100
}
