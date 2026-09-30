import { NavSection } from "@/types/navigation";

export const HVAC_ROADMAP: NavSection[] = [
  {
    id: "fundamentals",
    title: "1. NGUYÊN LÝ NHIỆT LẠNH CƠ BẢN",
    items: [
      {
        id: "cycle",
        title: "Chu trình nén hơi 4 thiết bị chính",
        slug: "fundamentals/vapor-compression-cycle",
      },
      {
        id: "refrigerants",
        title: "Đặc tính môi chất R32, R410A, R22",
        slug: "fundamentals/refrigerants-properties",
        badge: "Gas A2L",
      },
      {
        id: "superheat-subcooling",
        title: "Độ quá nhiệt (Superheat) & Quá lạnh (Subcooling)",
        slug: "fundamentals/superheat-subcooling",
      },
    ],
  },
  {
    id: "inverter-electronics",
    title: "2. MẠCH ĐIỆN TỬ BIẾN TẦN (INVERTER)",
    items: [
      {
        id: "u4-communication",
        title: "Mạch giao tiếp Data Dàn nóng - Dàn lạnh",
        slug: "inverter/communication-circuit-u4",
        badge: "Quan trọng",
      },
      {
        id: "igbt-ipm",
        title: "Khối công suất IPM & Điều khiển máy nén DC",
        slug: "inverter/ipm-compressor-drive",
      },
      {
        id: "pfc-rectifier",
        title: "Mạch nâng áp PFC & Lọc nguồn DC 300V",
        slug: "inverter/pfc-dc-bus",
      },
    ],
  },
  {
    id: "diagnostics",
    title: "3. QUY TRÌNH CHẨN ĐOÁN SỰ CỐ",
    items: [
      {
        id: "vom-measuring",
        title: "Kỹ thuật đo kiểm nguội & đo sống bằng VOM",
        slug: "diagnostics/vom-measurement-guide",
      },
      {
        id: "error-codes-daikin",
        title: "Bảng mã lỗi điều hòa Daikin Inverter",
        slug: "diagnostics/daikin-error-codes",
        badge: "Tra cứu",
      },
      {
        id: "error-codes-panasonic",
        title: "Bảng mã lỗi điều hòa Panasonic Inverter",
        slug: "diagnostics/panasonic-error-codes",
        badge: "Tra cứu",
      },
    ],
  },
  {
    id: "field-service",
    title: "4. KỸ THUẬT LẮP ĐẶT & THAO TÁC NGOÀI HIỆN TRƯỜNG",
    items: [
      {
        id: "vacuum-procedure",
        title: "Tiêu chuẩn hút chân không (<500 Micron)",
        slug: "field/vacuum-standard",
      },
      {
        id: "gas-charging",
        title: "Quy trình nạp gas lỏng theo cân định lượng",
        slug: "field/weigh-in-refrigerant-charging",
      },
    ],
  },
];
