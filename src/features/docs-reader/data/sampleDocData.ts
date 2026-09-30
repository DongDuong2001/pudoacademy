import { EquipmentSpecs } from "@/types/specs";
import { SchematicData } from "@/types/schematic";
import { TableOfContentsItem } from "@/types/navigation";

export const SAMPLE_EQUIPMENT_SPECS: EquipmentSpecs = {
  modelNumber: "FTKC25UAVMV / RKC25UAVMV",
  brand: "DAIKIN",
  type: "Treo tường Inverter 1 chiều",
  refrigerant: "R32",
  groups: [
    {
      groupName: "1. THÔNG SỐ ĐIỆN NĂNG & CÔNG SUẤT",
      specs: [
        { parameter: "Công suất định mức làm lạnh", nominalValue: "8,500 (3,400 ~ 9,600)", unit: "BTU/h", tolerance: "±5%" },
        { parameter: "Điện năng tiêu thụ định mức", nominalValue: "680", unit: "W", notes: "Tiết kiệm điện chuẩn 5 sao" },
        { parameter: "Điện áp hoạt động", nominalValue: "220 ~ 240", unit: "V AC", tolerance: "±10%" },
        { parameter: "Dòng điện định mức làm việc", nominalValue: "3.2", unit: "A", notes: "Dòng max lốc tăng tốc: 5.8A" },
        { parameter: "Tần số danh định", nominalValue: "50", unit: "Hz" },
      ],
    },
    {
      groupName: "2. THÔNG SỐ MÔI CHẤT & ĐƯỜNG ỐNG",
      specs: [
        { parameter: "Loại môi chất nạp sẵn", nominalValue: "R32", unit: "Purity 99.8%" },
        { parameter: "Lượng nạp môi chất ban đầu", nominalValue: "0.70", unit: "kg", notes: "Áp dụng cho chiều dài ống ≤ 10m" },
        { parameter: "Lượng nạp bổ sung nếu > 10m", nominalValue: "20", unit: "g/m" },
        { parameter: "Đường kính ống dẫn lỏng (ống đi)", nominalValue: "Ø 6.35 (1/4\")", unit: "mm" },
        { parameter: "Đường kính ống dẫn hơi (ống về)", nominalValue: "Ø 9.52 (3/8\")", unit: "mm" },
        { parameter: "Áp suất hút làm việc (hè 35°C)", nominalValue: "135 ~ 150", unit: "PSI", tolerance: "±5 PSI" },
        { parameter: "Áp suất tĩnh ngưng tụ (máy nghỉ)", nominalValue: "240 ~ 260", unit: "PSI" },
      ],
    },
  ],
};

export const SAMPLE_SCHEMATIC: SchematicData = {
  id: "sch-u4-comm",
  diagramCode: "DK-E-2026-U4",
  title: "Mạch truyền xung tín hiệu nối tiếp Serial Data 1-2-3",
  description: "Phân tích cấu trúc ghép quang (Optocoupler Isolation) giữa vi xử lý dàn lạnh và dàn nóng Inverter.",
  warningNotice: "Tụ nguồn DC 300V trên bo dàn nóng duy trì điện áp nguy hiểm trong ít nhất 3 phút sau khi ngắt nguồn AC.",
  testPoints: [
    {
      id: "TP1",
      name: "Nguồn AC Cấp Dàn Nóng (Chân 1 - Chân 2)",
      nominalVoltage: "220V AC",
      signalType: "AC",
      expectedRange: "200V ~ 240V AC",
      description: "Đo trực tiếp tại domino cầu đấu dây. Nếu không có áp 220V: Rơ-le cấp nguồn trên bo dàn lạnh chưa đóng hoặc đứt cầu chì F1.",
      coordinate: { x: 45, y: 38 },
    },
    {
      id: "TP2",
      name: "Tín Hiệu Giao Tiếp Serial (Chân 2 - Chân 3)",
      nominalVoltage: "15V ~ 55V DC",
      signalType: "PULSE",
      expectedRange: "Kim nhịp liên tục 20V-45V DC",
      description: "Que đen đặt ở chân 2 (N), que đỏ đặt ở chân 3 (Data). Đồng hồ cơ (VOM kim) phải nhấp nháy đều đặn theo nhịp gửi gói tin. Nếu đứng yên ở 0V hoặc treo 48V -> Đứt liên lạc.",
      coordinate: { x: 50, y: 70 },
    },
    {
      id: "TP3",
      name: "Điện Áp Bus DC Cao Áp Dàn Nóng",
      nominalVoltage: "300V ~ 320V DC",
      signalType: "DC",
      expectedRange: "290V ~ 330V DC",
      description: "Đo tại hai chân tụ lọc nguồn chính sau cầu diode chỉnh lưu. Tuyệt đối không chạm tay vào cọc tụ khi chưa xả điện trở tải.",
      coordinate: { x: 80, y: 35 },
    },
    {
      id: "TP4",
      name: "Xung Phát Quang Opto Thu Nhận PC1",
      nominalVoltage: "5V DC Pulse",
      signalType: "PULSE",
      expectedRange: "0V ~ 4.8V Logic",
      description: "Đo chân 3-4 của linh kiện cách ly quang PC1 trên bo dàn lạnh. Xác nhận vi điều khiển nhận được gói tin phản hồi từ dàn nóng.",
      coordinate: { x: 23, y: 44 },
    },
  ],
  components: [
    { id: "c1", code: "PC1", name: "Optocoupler PC817", functionDesc: "Cách ly quang đường nhận Rx dàn lạnh" },
    { id: "c2", code: "PC2", name: "Optocoupler TLP521", functionDesc: "Cách ly quang đường phát Tx dàn nóng" },
    { id: "c3", code: "D1", name: "Diode 1N4007", functionDesc: "Chỉnh lưu nửa chu kỳ nạp tụ phân áp cho đường Data" },
  ],
};

export const ARTICLE_TOC: TableOfContentsItem[] = [
  { id: "tong-quan", title: "1. Nguyên lý truyền tin Data 3 dây trên điều hòa Inverter", level: 2 },
  { id: "can-bao-an-toan", title: "2. Cảnh báo an toàn điện & Xả tụ cao áp DC 300V", level: 2 },
  { id: "thong-so-ky-thuat", title: "3. Bảng thông số kỹ thuật tiêu chuẩn model FTKC25", level: 2 },
  { id: "so-do-mach-u4", title: "4. Sơ đồ mạch điện & Phân tích các điểm Test Point", level: 2 },
  { id: "quy-trinh-do-kiem", title: "5. Quy trình 4 bước chẩn đoán bằng đồng hồ VOM ngoài hiện trường", level: 2 },
  { id: "tra-bang-ap-suat", title: "6. Bảng tra cứu áp suất bão hòa P-T Chart Gas R32", level: 2 },
  { id: "tra-cuu-ma-loi", title: "7. Tra cứu nhanh các mã lỗi liên quan", level: 2 },
];
