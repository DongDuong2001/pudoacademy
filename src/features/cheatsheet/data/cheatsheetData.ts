/**
 * PUDO ACADEMY - CHEATSHEET CẨM NANG NGHỀ ĐIỆN - ĐIỆN LẠNH
 * Dữ liệu chuẩn xác 100% theo tài liệu hãng (Daikin, Panasonic, Mitsubishi, TCVN, IEC)
 * Dành cho học viên ôn luyện trước khi bước vào hệ Cao Đẳng chính quy 3 năm.
 */

export interface RefrigerantSpec {
  code: string;
  name: string;
  composition: string;
  colorCode: string;
  staticPressure: string;      // Áp suất tĩnh khi tắt máy (ở 25-30°C)
  suctionPressure: string;     // Áp suất hút (chạy lạnh)
  dischargePressure: string;   // Áp suất nén (chạy sưởi/đầu đẩy)
  evapTemp: string;            // Nhiệt độ bay hơi chuẩn
  condTemp: string;            // Nhiệt độ ngưng tụ chuẩn
  chargingState: string;       // Nạp Lỏng hay Nạp Hơi
  oilType: string;             // Dầu bôi trơn tương thích
  pipeExtraCharge: string;     // Lượng gas nạp bổ sung vượt 7.5m
  flammability: string;        // Cấp độ an toàn/cháy nổ (ASHRAE)
  note: string;
}

export interface EngineeringFormula {
  category: "ĐIỆN" | "NHIỆT" | "CƠ KHÍ";
  title: string;
  formulaLatex: string;
  formulaDisplay: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  example: string;
  practicalRule: string;
}

export interface SensorSpec {
  brand: string;
  roomSensor25C: string;       // Sensor nhiệt độ phòng (gió hồi)
  coilSensor25C: string;       // Sensor đồng ngâm dàn lạnh
  dischargeSensor25C: string;  // Sensor đầu đẩy / đỉnh máy nén
  outdoorCoilSensor25C: string;// Sensor dàn ngưng tụ ngoài trời
  ambientSensor25C: string;    // Sensor môi trường ngoài trời
  type: string;                // NTC hay PTC
  testMethod: string;
  faultSymptom: string;
}

export interface CopperPipeSpec {
  inchSize: string;
  mmSize: string;
  minWallThickness: string;   // Độ dày thành ống tối thiểu cho R32/R410A
  flareOverhang: string;      // Cữ nhô ống khi loe lệch tâm
  flareDiameter: string;      // Đường kính miệng loe chuẩn
  torqueNm: string;           // Lực siết cờ lê lực (N·m)
  wrenchSize: string;         // Cỡ cờ lê mở rắc co
  applications: string;
}

export interface CoreErrorCode {
  brand: string;
  code: string;
  title: string;
  rootCause: string;
  testStep: string;
  fixAction: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}

export interface VomTestProcedure {
  title: string;
  component: string;
  vomRange: string;
  probePlacement: string;
  normalValue: string;
  faultValue: string;
  safetyWarning?: string;
  goldenRule: string;
}

// =========================================================================
// 1. CHEATSHEET MÔI CHẤT LẠNH & ÁP SUẤT
// =========================================================================
export const REFRIGERANT_SPECS: RefrigerantSpec[] = [
  {
    code: "R32",
    name: "Difluoromethane (CH₂F₂)",
    composition: "Đơn chất 100% R32",
    colorCode: "bg-red-600 text-white",
    staticPressure: "230 ~ 260 PSI (1.6 ~ 1.8 MPa)",
    suctionPressure: "125 ~ 150 PSI (0.86 ~ 1.03 MPa)",
    dischargePressure: "380 ~ 450 PSI (2.62 ~ 3.10 MPa)",
    evapTemp: "0°C ~ 5°C",
    condTemp: "45°C ~ 52°C",
    chargingState: "Nạp LỎNG hoặc HƠI (Khuyên dùng nạp lỏng úp bình)",
    oilType: "Dầu tổng hợp Polyolester (POE) hoặc PVE",
    pipeExtraCharge: "20 g/m (vượt quá 7.5m ống)",
    flammability: "A2L (Cháy nhẹ, an toàn cao, cấm dùng lửa gần bình xả)",
    note: "Không phá hủy tầng ozone (ODP = 0), GWP = 675 thấp hơn 3 lần so với R410A. Hiệu suất lạnh COP cao hơn 10%.",
  },
  {
    code: "R410A",
    name: "Hỗn Hợp Đồng Phôi (R32 / R125)",
    composition: "50% R32 + 50% R125 (Không đẳng phí gần)",
    colorCode: "bg-pink-600 text-white",
    staticPressure: "220 ~ 250 PSI (1.52 ~ 1.72 MPa)",
    suctionPressure: "120 ~ 140 PSI (0.83 ~ 0.97 MPa)",
    dischargePressure: "370 ~ 430 PSI (2.55 ~ 2.96 MPa)",
    evapTemp: "0°C ~ 4°C",
    condTemp: "45°C ~ 50°C",
    chargingState: "BẮT BUỘC NẠP LỎNG (Úp ngược bình)",
    oilType: "Dầu tổng hợp Polyolester (POE)",
    pipeExtraCharge: "20 g/m (vượt quá 7.5m ống)",
    flammability: "A1 (Không độc, không cháy)",
    note: "Tuyệt đối không nạp hơi vì hai thành phần R32 và R125 bay hơi ở nhiệt độ khác nhau làm sai lệch tỷ lệ hỗn hợp.",
  },
  {
    code: "R22",
    name: "Chlorodifluoromethane (CHClF₂)",
    composition: "Đơn chất 100% R22",
    colorCode: "bg-emerald-600 text-white",
    staticPressure: "140 ~ 160 PSI (0.97 ~ 1.10 MPa)",
    suctionPressure: "65 ~ 75 PSI (0.45 ~ 0.52 MPa)",
    dischargePressure: "220 ~ 260 PSI (1.52 ~ 1.80 MPa)",
    evapTemp: "2°C ~ 7°C",
    condTemp: "45°C ~ 50°C",
    chargingState: "Nạp Lỏng hoặc Hơi đều được",
    oilType: "Dầu khoáng Mineral Oil (MO) hoặc Alkylbenzene (AB)",
    pipeExtraCharge: "15 ~ 20 g/m",
    flammability: "A1 (Không cháy)",
    note: "Môi chất cũ (phá hủy ozone ODP = 0.055), đang bị khai tử theo Nghị định thư Montreal. Áp suất thấp hơn R32 khoảng 1.6 lần.",
  },
  {
    code: "R134a",
    name: "Tetrafluoroethane (CH₂FCF₃)",
    composition: "Đơn chất 100% R134a",
    colorCode: "bg-cyan-600 text-white",
    staticPressure: "80 ~ 100 PSI (0.55 ~ 0.69 MPa)",
    suctionPressure: "10 ~ 20 PSI (0.07 ~ 0.14 MPa)",
    dischargePressure: "150 ~ 190 PSI (1.03 ~ 1.31 MPa)",
    evapTemp: "-10°C ~ 0°C (Tủ lạnh / Điều hòa ô tô)",
    condTemp: "45°C ~ 55°C",
    chargingState: "Nạp Hơi hoặc Lỏng",
    oilType: "Dầu tổng hợp POE (Tủ lạnh dân dụng) hoặc PAG (Ô tô)",
    pipeExtraCharge: "Nạp theo định lượng tem cân điện tử (gam)",
    flammability: "A1 (Không độc, không cháy)",
    note: "Rất nhạy cảm với độ ẩm. Độ ẩm trong hệ thống biến dầu POE thành axit hữu cơ ăn mòn cuộn dây máy nén và tắc ẩm ống mao.",
  },
  {
    code: "R600a",
    name: "Isobutane (C₄H₁₀)",
    composition: "Đơn chất 100% Isobutane",
    colorCode: "bg-amber-600 text-white",
    staticPressure: "40 ~ 50 PSI (0.28 ~ 0.35 MPa)",
    suctionPressure: "-2 ~ 2 PSI (Chạy áp âm hoặc gần 0 PSI)",
    dischargePressure: "80 ~ 110 PSI (0.55 ~ 0.76 MPa)",
    evapTemp: "-25°C ~ -15°C (Tủ lạnh Inverter)",
    condTemp: "40°C ~ 48°C",
    chargingState: "Nạp theo cân điện tử gram (Lượng nạp cực ít: 40g ~ 80g)",
    oilType: "Dầu khoáng Mineral Oil (MO)",
    pipeExtraCharge: "Không nối dài ống, nạp chuẩn từng gram",
    flammability: "A3 (DỄ CHÁY NỔ - CẤM DÙNG MỎ HÀN LỬA TRỰC TIẾP)",
    note: "Áp suất hút chạy dưới áp suất khí quyển. Cấm dùng lửa xả ga, phải dùng kìm bấm ống hoặc kẹp cơ khí khi sửa chữa.",
  },
];

// =========================================================================
// 2. CHEATSHEET CÔNG THỨC TOÁN & LÝ KỸ THUẬT
// =========================================================================
export const ENGINEERING_FORMULAS: EngineeringFormula[] = [
  {
    category: "ĐIỆN",
    title: "1. Tính dòng điện định mức phụ tải 1 pha (I_đm)",
    formulaLatex: "I_{\\text{đm}} = \\frac{P}{U \\cdot \\cos\\varphi \\cdot \\eta}",
    formulaDisplay: "I_đm = P / (U · cosφ · η)",
    variables: [
      { symbol: "P", meaning: "Công suất cơ khí hoặc điện máy nén", unit: "W (Watt)" },
      { symbol: "U", meaning: "Điện áp lưới xoay chiều hiệu dụng", unit: "220 V" },
      { symbol: "cosφ", meaning: "Hệ số công suất tải cảm kháng", unit: "0.85 ~ 0.95" },
      { symbol: "η", meaning: "Hiệu suất động cơ điện", unit: "0.80 ~ 0.90" },
    ],
    example: "Máy điều hòa 1.5 HP (P = 1119W), cosφ = 0.9, η = 0.85 -> I_đm = 1119 / (220 · 0.9 · 0.85) ≈ 6.65 A",
    practicalRule: "Kinh nghiệm thực tế thợ lạnh: Máy 1.0 HP ≈ 4A - 4.5A; Máy 1.5 HP ≈ 6.5A - 7A; Máy 2.0 HP ≈ 8.5A - 9.5A.",
  },
  {
    category: "ĐIỆN",
    title: "2. Dòng khởi động & Dòng hãm máy nén (I_start & LRA)",
    formulaLatex: "I_{\\text{start}} \\approx (4 \\sim 6) \\cdot I_{\\text{đm}} = \\text{LRA}",
    formulaDisplay: "I_start ≈ (4 ~ 6) · I_đm = LRA",
    variables: [
      { symbol: "I_start", meaning: "Dòng xung kích khi lốc bắt đầu đề pa", unit: "A" },
      { symbol: "LRA", meaning: "Locked Rotor Amps (Dòng khi rotor bị kẹt cứng)", unit: "A (ghi trên tem lốc)" },
    ],
    example: "Máy có I_đm = 4.2A -> I_start vọt lên 20A ~ 25A trong 0.2s rồi tụt về 4.2A khi rotor đạt 75% tốc độ.",
    practicalRule: "Nếu kẹp ampe kìm thấy kim vọt lên chạm LRA (>25A) và giữ nguyên không tụt xuống -> Máy nén bị kẹt cơ hoặc chết tụ ngậm.",
  },
  {
    category: "ĐIỆN",
    title: "3. Chọn tiết diện dây dẫn điện Cadivi (S)",
    formulaLatex: "S = \\frac{I_{\\text{đm}}}{J}",
    formulaDisplay: "S = I_đm / J",
    variables: [
      { symbol: "S", meaning: "Tiết diện lõi đồng", unit: "mm²" },
      { symbol: "J", meaning: "Mật độ dòng điện kinh tế (đồng)", unit: "4 ~ 6 A/mm² (khuyên chọn 4A/mm²)" },
    ],
    example: "Tải I_đm = 10A -> S = 10 / 4 = 2.5 mm² -> Chọn dây đôi Cadivi 2 x 2.5 mm².",
    practicalRule: "Quy ước chuẩn an toàn TCVN: Máy 1.0 HP dùng dây tối thiểu 1.5 mm²; Máy 1.5 - 2.5 HP dùng dây 2.5 mm²; Máy 3.0 HP dùng dây 4.0 mm².",
  },
  {
    category: "ĐIỆN",
    title: "4. Chọn Aptomat bảo vệ máy nén (MCB Curve C)",
    formulaLatex: "I_{\\text{MCB}} \\approx (1.25 \\sim 1.5) \\cdot I_{\\text{đm}}",
    formulaDisplay: "I_MCB ≈ (1.25 ~ 1.5) · I_đm",
    variables: [
      { symbol: "I_MCB", meaning: "Dòng ngắt định mức của Aptomat", unit: "A (10A, 16A, 20A, 25A, 32A)" },
    ],
    example: "I_đm = 7A -> I_MCB = 7 x 1.5 = 10.5A -> Chọn Aptomat MCB 2P 16A hoặc 20A đặc tính Curve C.",
    practicalRule: "Bắt buộc dùng MCB đặc tính Curve C (chịu dòng khởi động gấp 5-10 lần trong tích tắc mà không nhảy nhầm).",
  },
  {
    category: "NHIỆT",
    title: "5. Độ Quá Nhiệt Hơi Hút (Superheat - SH)",
    formulaLatex: "\\text{SH} = T_{\\text{ống hút}} - T_{\\text{sôi bão hòa}}",
    formulaDisplay: "SH = T_ống_hút - T_sôi_bão_hòa",
    variables: [
      { symbol: "T_ống_hút", meaning: "Nhiệt độ đo tại ống đồng lớn (đo bằng kẹp nhiệt)", unit: "°C" },
      { symbol: "T_sôi", meaning: "Nhiệt độ tương ứng với áp suất hút (tra bảng P-T)", unit: "°C" },
    ],
    example: "Gas R32 có P_hút = 135 PSI (tra bảng T_sôi = 2°C). Cặp nhiệt độ ống hút đo được 8°C -> SH = 8 - 2 = 6°C (ĐẠT).",
    practicalRule: "Chuẩn van tiết lưu cơ/ống mao: SH = 5°C ~ 7°C. Nếu SH > 10°C: Thiếu gas. Nếu SH < 2°C: Dư gas, nguy cơ ngập dịch lỏng về phá lốc.",
  },
  {
    category: "NHIỆT",
    title: "6. Độ Quá Lạnh Dòng Lỏng (Subcooling - SC)",
    formulaLatex: "\\text{SC} = T_{\\text{ngưng bão hòa}} - T_{\\text{ống lỏng}}",
    formulaDisplay: "SC = T_ngưng_bão_hòa - T_ống_lỏng",
    variables: [
      { symbol: "T_ngưng", meaning: "Nhiệt độ tương ứng với áp suất ngưng dàn nóng", unit: "°C" },
      { symbol: "T_ống_lỏng", meaning: "Nhiệt độ đo tại ống đồng nhỏ sau dàn ngưng", unit: "°C" },
    ],
    example: "P_nén = 400 PSI (T_ngưng = 48°C), đo ống lỏng được 44°C -> SC = 48 - 44 = 4°C (ĐẠT).",
    practicalRule: "Chuẩn van tiết lưu điện tử EEV: SC = 3°C ~ 5°C. Đảm bảo 100% môi chất hóa lỏng hoàn toàn trước khi vào van tiết lưu.",
  },
  {
    category: "NHIỆT",
    title: "7. Độ chênh lệch nhiệt độ dàn lạnh (Delta T)",
    formulaLatex: "\\Delta T = T_{\\text{gió hồi}} - T_{\\text{gió thổi ra}}",
    formulaDisplay: "ΔT = T_gió_hồi - T_gió_thổi",
    variables: [
      { symbol: "T_gió_hồi", meaning: "Nhiệt độ không khí phòng hút vào đỉnh dàn lạnh", unit: "°C" },
      { symbol: "T_gió_thổi", meaning: "Nhiệt độ không khí lạnh thổi ra ở cửa gió", unit: "°C" },
    ],
    example: "Gió hồi 28°C, gió miệng gió thổi ra 15°C -> ΔT = 28 - 15 = 13°C (ĐẠT YÊU CẦU LẠNH TỐT).",
    practicalRule: "Tiêu chuẩn kiểm tra nhanh bàn giao máy: ΔT phải đạt từ 10°C đến 15°C sau khi bật máy 15-20 phút.",
  },
  {
    category: "CƠ KHÍ",
    title: "8. Chuyển đổi đơn vị công suất & áp suất nhanh",
    formulaLatex: "1\\text{ HP} \\approx 746\\text{ W} \\approx 9000\\text{ BTU/h}; \\quad 1\\text{ bar} = 14.5038\\text{ PSI} = 0.1\\text{ MPa}",
    formulaDisplay: "1 HP ≈ 746W ≈ 9000 BTU/h | 1 bar = 14.5 PSI = 0.1 MPa",
    variables: [
      { symbol: "1 Ton lạnh", meaning: "Tấn lạnh Mỹ (RT)", unit: "12,000 BTU/h ≈ 3.517 kW" },
      { symbol: "1 MPa", meaning: "Mega-pascal", unit: "10 bar ≈ 145 PSI" },
    ],
    example: "Máy 2.0 HP = 2 x 9000 = 18,000 BTU/h ≈ 1492W cơ khí ≈ 5.27 kW lạnh.",
    practicalRule: "Ước tính thể tích phòng: 1 HP làm mát tối đa cho phòng 45 m³ (khoảng 15 m² sàn chiều cao 3m).",
  },
];

// =========================================================================
// 3. CHEATSHEET SENSOR CẢM BIẾN NHIỆT (KΩ Ở 25°C & 30°C)
// =========================================================================
export const SENSOR_SPECS: SensorSpec[] = [
  {
    brand: "DAIKIN (Inverter)",
    roomSensor25C: "20 kΩ",
    coilSensor25C: "15 kΩ (hoặc 20 kΩ)",
    dischargeSensor25C: "200 kΩ (Nắp lốc)",
    outdoorCoilSensor25C: "20 kΩ",
    ambientSensor25C: "20 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Tháo giắc cắm trên bo mạch, dùng VOM thang 200kΩ kẹp vào 2 chân sensor. Dùng tay xoa làm ấm đầu cảm biến, trị số điện trở phải giảm dần.",
    faultSymptom: "Báo lỗi C4/C9 (Sensor dàn/phòng lạnh); Báo J3 (Sensor đầu đẩy nén ngắt lốc sau 3 phút chạy).",
  },
  {
    brand: "PANASONIC (Inverter)",
    roomSensor25C: "15 kΩ",
    coilSensor25C: "15 kΩ",
    dischargeSensor25C: "50 kΩ",
    outdoorCoilSensor25C: "20 kΩ",
    ambientSensor25C: "15 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Đo tại nhiệt độ phòng 25°C giá trị 15kΩ. Nhúng đầu cảm biến vào ly nước đá, điện trở phải tăng vọt lên 35kΩ - 40kΩ.",
    faultSymptom: "Báo lỗi H14 (Lỗi cảm biến gió phòng); H15 (Lỗi cảm biến máy nén); H23 (Lỗi cảm biến dàn lạnh). Đèn Timer nhấp nháy liên tục.",
  },
  {
    brand: "TOSHIBA / CARRIER",
    roomSensor25C: "10 kΩ",
    coilSensor25C: "10 kΩ",
    dischargeSensor25C: "50 kΩ",
    outdoorCoilSensor25C: "10 kΩ",
    ambientSensor25C: "10 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Đo thang 20kΩ tại nhiệt độ 25°C. Đảm bảo sai số không vượt quá ± 5% so với 10kΩ.",
    faultSymptom: "Nháy đèn Operation/Timer, máy không cho đóng điện rơ-le cấp nguồn dàn nóng.",
  },
  {
    brand: "MITSUBISHI ELECTRIC / HEAVY",
    roomSensor25C: "10 kΩ (Electric) / 5 kΩ (Heavy)",
    coilSensor25C: "10 kΩ (Electric) / 5 kΩ (Heavy)",
    dischargeSensor25C: "50 kΩ",
    outdoorCoilSensor25C: "10 kΩ",
    ambientSensor25C: "10 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Chú ý phân biệt Mitsubishi Electric (10k) và Mitsubishi Heavy (5k). Lắp nhầm sensor sẽ khiến máy chạy ngắt liên tục.",
    faultSymptom: "Báo lỗi E1, E2 hoặc nháy đèn chớp 2 lần, máy nén không kích xung PWM.",
  },
  {
    brand: "LG (Dual Inverter)",
    roomSensor25C: "10 kΩ",
    coilSensor25C: "10 kΩ",
    dischargeSensor25C: "200 kΩ",
    outdoorCoilSensor25C: "10 kΩ",
    ambientSensor25C: "10 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Đo thang 20kΩ với sensor phòng/dàn và thang 2MΩ với sensor đầu lốc.",
    faultSymptom: "Báo lỗi CH01 (Sensor phòng hở mạch), CH02 (Sensor đồng dàn lạnh chập), CH06 (Sensor đầu đẩy bất thường).",
  },
  {
    brand: "CASPER / MIDEA / FUNIKI",
    roomSensor25C: "5 kΩ hoặc 10 kΩ",
    coilSensor25C: "5 kΩ hoặc 10 kΩ",
    dischargeSensor25C: "50 kΩ",
    outdoorCoilSensor25C: "10 kΩ",
    ambientSensor25C: "10 kΩ",
    type: "NTC (Nhiệt điện trở âm)",
    testMethod: "Đo thang 20kΩ. Thông thường thế hệ mới dùng chuẩn 10kΩ, thế hệ cũ dùng 5kΩ.",
    faultSymptom: "Báo lỗi E1, E2 trên màn hình LED dàn lạnh; quạt gió quay nhưng lốc không đề.",
  },
];

// =========================================================================
// 4. CHEATSHEET TIÊU CHUẨN CƠ KHÍ ỐNG ĐỒNG & LỰC SIẾT
// =========================================================================
export const COPPER_PIPE_SPECS: CopperPipeSpec[] = [
  {
    inchSize: '1/4" (Ø6)',
    mmSize: "6.35 mm",
    minWallThickness: "0.71 mm (R32 / R410A) • 0.61 mm (R22)",
    flareOverhang: "1.0 ~ 1.2 mm (vam lệch tâm cữ bi)",
    flareDiameter: "8.7 ~ 9.1 mm",
    torqueNm: "14 ~ 18 N·m (1.4 ~ 1.8 kgf·m)",
    wrenchSize: "Cờ lê 17 mm",
    applications: "Đường ống lỏng (ống đẩy nhỏ) cho máy 1.0 HP đến 2.5 HP.",
  },
  {
    inchSize: '3/8" (Ø10)',
    mmSize: "9.52 mm",
    minWallThickness: "0.71 mm (R32 / R410A) • 0.61 mm (R22)",
    flareOverhang: "1.0 ~ 1.2 mm",
    flareDiameter: "12.8 ~ 13.2 mm",
    torqueNm: "34 ~ 42 N·m (3.4 ~ 4.2 kgf·m)",
    wrenchSize: "Cờ lê 22 mm",
    applications: "Đường ống hơi (ống hút lớn) máy 1.0 HP; Đường lỏng máy 3.0 - 5.0 HP.",
  },
  {
    inchSize: '1/2" (Ø12)',
    mmSize: "12.70 mm",
    minWallThickness: "0.81 mm (R32 / R410A) • 0.71 mm (R22)",
    flareOverhang: "1.0 ~ 1.2 mm",
    flareDiameter: "16.2 ~ 16.6 mm",
    torqueNm: "49 ~ 61 N·m (4.9 ~ 6.1 kgf·m)",
    wrenchSize: "Cờ lê 24 mm",
    applications: "Đường ống hơi (ống hút) máy 1.5 HP và 2.0 HP.",
  },
  {
    inchSize: '5/8" (Ø16)',
    mmSize: "15.88 mm",
    minWallThickness: "1.00 mm (R32 / R410A) • 0.81 mm (R22)",
    flareOverhang: "1.2 ~ 1.5 mm",
    flareDiameter: "19.3 ~ 19.7 mm",
    torqueNm: "68 ~ 82 N·m (6.8 ~ 8.2 kgf·m)",
    wrenchSize: "Cờ lê 27 mm",
    applications: "Đường ống hơi (ống hút) máy 2.5 HP và 3.0 HP.",
  },
  {
    inchSize: '3/4" (Ø19)',
    mmSize: "19.05 mm",
    minWallThickness: "1.00 mm (R32 / R410A) • 0.89 mm (R22)",
    flareOverhang: "1.2 ~ 1.5 mm",
    flareDiameter: "23.6 ~ 24.0 mm",
    torqueNm: "100 ~ 120 N·m (10.0 ~ 12.0 kgf·m)",
    wrenchSize: "Cờ lê 32 mm / 36 mm",
    applications: "Đường ống hơi hệ máy thương mại SkyAir / VRV công suất lớn.",
  },
];

// =========================================================================
// 5. CHEATSHEET MÃ LỖI BIẾN TẦN CỐT LÕI
// =========================================================================
export const CORE_ERROR_CODES: CoreErrorCode[] = [
  {
    brand: "DAIKIN",
    code: "U4",
    title: "Mất tín hiệu giao tiếp bo dàn lạnh và bo dàn nóng",
    rootCause: "Đứt dây kết nối số 3; Cắm nhầm dây 1-2-3 chéo pha; Hỏng Optocoupler PC1/PC3 trên bo dàn lạnh hoặc dàn nóng.",
    testStep: "Đo AC 500V chân 1-2 phải đủ 220V. Đo DC 50V chân 2-3 kim VOM phải nhấp nháy 15V-55V. Tháo dây 3 dàn nóng để cô lập.",
    fixAction: "Thay thế dây điện liên dàn ruột đồng đúng chuẩn; Nếu dây tốt ➔ thay IC Opto PC817 hoặc thay bo mạch giao tiếp.",
    severity: "CRITICAL",
  },
  {
    brand: "DAIKIN",
    code: "L5",
    title: "Quá dòng máy nén Inverter (DC Peak Instantaneous Overcurrent)",
    rootCause: "Máy nén bị kẹt cơ; Chết chập một trong 6 van IGBT trong module IPM; Chập cuộn dây lốc U-V-W chạm vỏ.",
    testStep: "Rút giắc 3 chân lốc nén U-V-W. Dùng thang Diode đo trở kháng giữa U-V, V-W, W-U phải cân bằng tuyệt đối (~1.5Ω-3Ω).",
    fixAction: "Nếu trở lốc lệch hoặc chạm vỏ ➔ Thay máy nén mới; Nếu lốc tốt mà mở máy báo L5 ngay sau 5 giây ➔ Hỏng IC công suất IPM.",
    severity: "CRITICAL",
  },
  {
    brand: "DAIKIN",
    code: "E7",
    title: "Lỗi động cơ quạt dàn nóng (DC Fan Motor)",
    rootCause: "Kẹt cánh quạt bởi rác hoặc dây điện; Chết IC Hall cảm biến tốc độ trong motor quạt; Hỏng mạch cấp nguồn 310V/15V nuôi quạt.",
    testStep: "Lấy tay quay cánh quạt xem có trơn tru không. Đo nguồn cấp DC 300V và DC 15V tại giắc quạt 8 chân trên bo dàn nóng.",
    fixAction: "Vệ sinh gỡ kẹt; Thay mô-tơ quạt DC dàn nóng; Nếu motor mới vẫn báo lỗi ➔ sửa khối nguồn xung cấp cho quạt trên bo.",
    severity: "HIGH",
  },
  {
    brand: "PANASONIC",
    code: "H11",
    title: "Mất đồng bộ truyền dữ liệu Dàn Lạnh - Dàn Nóng",
    rootCause: "Đứt dây tín hiệu; Cầu đấu domino ẩm ướt rò điện; Chết khối vi xử lý truyền nhận bo dàn nóng.",
    testStep: "Đo điện áp chân 2 (Nguội) và chân 3 (Data). Đồng hồ kim phải dao động liên tục nhịp 2Hz trong dải 15V - 55V DC.",
    fixAction: "Đấu lại dây 3; Khắc phục ẩm ướt domino; Sửa mạch Opto đệm tín hiệu bo dàn nóng.",
    severity: "CRITICAL",
  },
  {
    brand: "PANASONIC",
    code: "F99",
    title: "Dòng một chiều DC quá cao bảo vệ khối biến tần (DC Peak)",
    rootCause: "Nguồn điện lưới chập chờn; Tụ lọc nguồn 300V bị khô; Chập van công suất IGBT bên trong Module IPM.",
    testStep: "Đo áp DC Bus trên tụ nguồn: Phải đạt ~310V DC phẳng. Kiểm tra ngắn mạch giữa chân P (+) và N (-) với 3 chân U, V, W.",
    fixAction: "Thay tụ lọc nguồn; Thay IC công suất IPM; Kiểm tra thông gió dàn nóng không để nhiệt độ ngưng tụ quá cao.",
    severity: "CRITICAL",
  },
  {
    brand: "PANASONIC",
    code: "F91",
    title: "Bất thường chu trình lạnh (Thiếu gas nghiêm trọng)",
    rootCause: "Xì rò rỉ gas tại rắc-co hoặc dàn trao đổi nhiệt; Hỏng cảm biến nhiệt độ ống hút dẫn đến đọc sai.",
    testStep: "Gắn đồng hồ đo áp suất hút: Gas R32/R410A dưới 60 PSI (bình thường 125-140 PSI). Dòng chạy chỉ bằng 30-50% dòng định mức.",
    fixAction: "Tìm và khắc phục điểm xì rắc-co; Thử kín Nitơ 40 bar; Hút chân không sâu <500 Micron và nạp lại gas chuẩn theo tem.",
    severity: "HIGH",
  },
];

// =========================================================================
// 6. CHEATSHEET QUY TRÌNH ĐO KIỂM ĐỒNG HỒ VOM
// =========================================================================
export const VOM_TEST_PROCEDURES: VomTestProcedure[] = [
  {
    title: "1. Xác định 3 cọc máy nén 1 pha (C - R - S)",
    component: "Máy nén Piston / Rotary Mono",
    vomRange: "Thang đo Điện trở (Ω x 1 hoặc Ω x 10)",
    probePlacement: "Đo 3 cặp chân: 1-2, 2-3, 3-1",
    normalValue: "Cặp có điện trở lớn nhất là R và S. Cọc còn lại là C. Đo từ C ra 2 cọc: Cọc có Ω nhỏ là R (Chạy), cọc có Ω lớn là S (Đề).",
    faultValue: "R_RS ≠ R_CR + R_CS hoặc một cuộn đứt (Ω vô cùng) -> Máy nén đã cháy đứt cuộn dây.",
    goldenRule: "CÔNG THỨC VÀNG: R_RS = R_CR + R_CS. Điện trở cuộn Đề (S) luôn lớn hơn cuộn Chạy (R).",
  },
  {
    title: "2. Kiểm tra cuộn dây máy nén chạm vỏ (Rò Mass)",
    component: "Vỏ sắt máy nén & Cuộn dây Stator",
    vomRange: "Thang đo Điện trở cao (10 kΩ hoặc MΩ)",
    probePlacement: "1 que cắm cọc đồng máy nén, 1 que cạo sạch sơn tiếp xúc vỏ sắt lốc",
    normalValue: "Kim đồng hồ nằm im ở mức VÔ CÙNG (∞). Cách điện tuyệt đối > 10 MΩ.",
    faultValue: "Kim nhúc nhích dịch chuyển về phía 0Ω -> Lốc nén bị cháy cách điện chạm vỏ, gây giật chết người.",
    safetyWarning: "CẢNH BÁO AN TOÀN: Lốc nén chạm vỏ bắt buộc phải thay thế ngay, tuyệt đối không được cấp điện chạy thử.",
    goldenRule: "Bất kỳ máy nén nào kim nhảy khỏi mức vô cùng khi đo chạm vỏ đều là phế phẩm.",
  },
  {
    title: "3. Kiểm tra 6 van IGBT trong Module công suất IPM",
    component: "Intelligent Power Module (IPM Biến tần)",
    vomRange: "Thang đo DIODE (có tiếng bíp hoặc hiển thị mV)",
    probePlacement: "Que ĐEN vào cực P (+), que ĐỎ lần lượt vào U, V, W. Sau đó que ĐỎ vào cực N (-), que ĐEN vào U, V, W.",
    normalValue: "Cả 6 phép đo thuận phải hiển thị điện áp rơi khoảng 0.400V ~ 0.550V. Đảo ngược que đo phải hiển thị 'OL' (Vô cùng).",
    faultValue: "Có một chân kêu bíp thông mạch (0V) hoặc đảo que vẫn lên số -> Van IGBT bị đánh thủng ngắn mạch.",
    safetyWarning: "Rút điện và xả hết điện áp trên tụ nguồn 310V trước khi đo để tránh nổ đồng hồ VOM.",
    goldenRule: "6 van bán dẫn trong IPM phải có điện áp rơi bằng nhau tuyệt đối (chênh lệch không quá 0.03V).",
  },
  {
    title: "4. Kiểm tra Optocoupler cách ly quang (PC817)",
    component: "IC Opto cách ly giao tiếp & nguồn xung",
    vomRange: "Thang đo Diode",
    probePlacement: "Chân 1-2 (Anode/Cathode) và Chân 3-4 (Collector/Emitter)",
    normalValue: "Đo chân 1 (Que đỏ) và 2 (Que đen): Điện áp rơi LED ~ 1.05V - 1.15V. Đo chân 3-4 phải cách ly hoàn toàn (OL).",
    faultValue: "Chân 1-2 thông mạch (0V) hoặc đứt (OL cả 2 chiều); Chân 3-4 bị rò rỉ dẫn điện khi chưa có dòng kích LED.",
    goldenRule: "Opto tốt: Chiều 1-2 như một diode thường (~1.1V), chiều 3-4 mở dẫn thông mạch khi cấp dòng cho chân 1-2.",
  },
  {
    title: "5. Kiểm tra Tụ Ngậm Máy Nén (Run Capacitor)",
    component: "Tụ nhôm ngâm dầu 25µF ~ 60µF / 450V AC",
    vomRange: "Thang đo Điện Dung (CAP / µF)",
    probePlacement: "2 que đo vào 2 cọc tụ (đã xả điện trước đó)",
    normalValue: "Giá trị đo được nằm trong dung sai ± 5% so với trị số ghi trên vỏ tụ (Ví dụ tụ 35µF đo được 33.5 ~ 36.5µF).",
    faultValue: "Tụ bị khô giảm dung lượng (chỉ còn vài µF) hoặc tụ bị đánh thủng chập 0Ω.",
    safetyWarning: "Dùng tuốc-nơ-vít có cán cách điện chạm chập 2 cọc tụ để xả điện tích trước khi kẹp que đo.",
    goldenRule: "Tụ ngậm giảm quá 10% dung lượng sẽ làm máy nén không đề được, gầm rú rồi nhảy rơ-le OLP.",
  },
];
