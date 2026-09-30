/**
 * Schema chuẩn hóa dữ liệu kỹ thuật trích xuất từ tài liệu chính thống
 * (Daikin, Panasonic, Danfoss, Carrier, .edu)
 */
export interface ExtractedTechnicalKnowledge {
  title: string;
  category: "Lý thuyết cơ bản" | "Thực hành" | "Mã lỗi" | "Sơ đồ điện";
  level: "Cơ bản" | "Nâng cao" | "Đi làm thực chiến";
  key_concepts: string[];
  content: string;
  technical_parameters: Record<string, string>;
  source_url: string;
}
