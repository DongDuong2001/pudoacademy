import { ErrorCodeItem } from "@/types/diagnostic";

export const ERROR_CODES_DATA: ErrorCodeItem[] = [
  // =========================================================================
  // 1. DAIKIN INVERTER CODES
  // =========================================================================
  {
    code: "U4",
    brand: "DAIKIN",
    title: "Lỗi đường truyền tín hiệu giữa Dàn nóng và Dàn lạnh",
    symptom: "Máy chạy 1-3 phút chớp đèn Timer, quạt dàn lạnh chạy nhưng lốc không đề ba.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Đấu nhầm hoặc đứt dây truyền tín hiệu số 3 (Dây Data).",
      "Hỏng cặp Opto quang (PC1/PC2) cách ly trên bo mạch dàn nóng hoặc dàn lạnh.",
      "Mất nguồn nuôi 24V-50V cho mạch giao tiếp (chết diode hoặc điện trở hạ áp).",
      "Nhiễu điện từ do đi chung dây điện động lực với nguồn 3 pha khác.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp AC giữa chân 1 (L) và chân 2 (N) tại domino dàn lạnh và dàn nóng.",
        expectedResult: "Điện áp ổn định trong khoảng 210V ~ 230V AC.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo điện áp DC giữa chân 2 (dây N) và chân 3 (dây Data).",
        expectedResult: "Kim đồng hồ hoặc chỉ số VOM phải nhảy dao động liên tục từ 15V đến 55V DC.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 3,
        action: "Nếu áp chân 2-3 đứng im ở 0V hoặc treo cố định ở 48V không dao động: tháo dây số 3 ra khỏi domino dàn nóng và đo lại điện áp ra từ dàn lạnh.",
        expectedResult: "Xác định bo dàn lạnh hay bo dàn nóng bị mất xung phát tín hiệu.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "L5",
    brand: "DAIKIN",
    title: "Lỗi quá dòng tức thời máy nén biến tần (Inverter Compressor Overcurrent)",
    symptom: "Máy nén rít nhẹ 2-3 giây rồi ngắt hoàn toàn, đèn Operation nháy đỏ.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Kẹt cơ khí lốc máy nén DC Inverter.",
      "Chập ngắn mạch cuộn dây động cơ máy nén (U, V, W).",
      "Hỏng module công suất IPM (IGBT bị thủng dẫn thẳng 300V vào lốc).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Ngắt CB nguồn, chờ xả hết điện áp tụ lọc DC 300V. Rút giắc 3 chân cọc lốc U-V-W khỏi bo mạch.",
        expectedResult: "Điện áp đo trên tụ nguồn DC phải về dưới 10V DC trước khi chạm tay.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo điện trở giữa từng cặp cuộn dây lốc: U-V, V-W, W-U.",
        expectedResult: "Cả 3 giá trị điện trở phải cân bằng tuyệt đối (thường 0.6Ω ~ 1.5Ω tùy công suất).",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 3,
        action: "Đo chạm vỏ giữa từng cọc U, V, W với vỏ đồng/ống đồng máy nén.",
        expectedResult: "Điện trở cách điện phải đạt vô cùng (>50MΩ). Nếu có kim nhảy -> Máy nén bị rò điện, phải thay máy nén.",
        measuredTool: "MEGOHM_METER",
      },
    ],
  },
  {
    code: "A6",
    brand: "DAIKIN",
    title: "Lỗi động cơ quạt dàn lạnh (DC Indoor Fan Motor / Mất xung Hall)",
    symptom: "Quạt dàn lạnh giật nhẹ rồi dừng hẳn, máy báo lỗi A6 sau 1 phút.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Hỏng IC Driver quạt DC trên bo dàn lạnh.",
      "Chập cuộn dây động cơ quạt DC (chập cuộn stator 300V hoặc 140V).",
      "Đứt đường hồi tiếp cảm biến Hall (chân FB / Vsp mất xung).",
      "Kẹt lồng sóc cơ khí do dị vật hoặc khô bạc đạn.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Dùng tay quay nhẹ lồng sóc quạt khi máy tắt.",
        expectedResult: "Quạt quay êm, trơn tru, không có tiếng rít cơ khí hoặc kẹt dị vật.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo điện áp cấp cho quạt DC tại giắc cắm: Vm (khoảng 300V DC) và Vcc (15V DC).",
        expectedResult: "Vm = 280V ~ 320V DC, Vcc = 14.5V ~ 15.5V DC ổn định.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 3,
        action: "Đo điện áp chân hồi tiếp Hall (Vsp/FG) trong khi quay nhẹ quạt bằng tay.",
        expectedResult: "Điện áp phải nhảy dao động liên tục từ 0V đến 5V DC báo hiệu xung Hall hoạt động.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "C4",
    brand: "DAIKIN",
    title: "Lỗi cảm biến nhiệt độ ống đồng dàn lạnh (Liquid Pipe Thermistor)",
    symptom: "Máy lạnh không lạnh sâu, chạy một lúc rồi báo lỗi C4 trên remote.",
    safetyLevel: "INFO",
    rootCauses: [
      "Cảm biến nhiệt độ ống đồng bị tuột khỏi kẹp đồng dàn tản nhiệt.",
      "Nhiệt điện trở bị đứt mạch, chập mạch hoặc thoái hóa trôi chỉ số ở 25°C.",
      "Đứt dây hoặc oxy hóa chân giắc cắm cắm trên bo mạch.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc cắm sensor khỏi bo dàn lạnh, đo điện trở cảm biến ở nhiệt độ môi trường 25°C.",
        expectedResult: "Giá trị chuẩn Daikin sensor đồng: ~20kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Kẹp đầu que đo và làm ấm đầu đồng bằng ngón tay.",
        expectedResult: "Điện trở phải giảm đều mượt mà. Nếu điện trở = 0Ω (ngắn mạch) hoặc vô cùng (đứt) -> Thay sensor.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "C9",
    brand: "DAIKIN",
    title: "Lỗi cảm biến nhiệt độ gió hồi dàn lạnh (Room Air Thermistor)",
    symptom: "Máy không kiểm soát được nhiệt độ cài đặt, quạt chạy nhưng báo lỗi C9.",
    safetyLevel: "INFO",
    rootCauses: [
      "Đứt hoặc lỏng giắc cắm cảm biến nhiệt độ gió hồi phòng.",
      "Sensor biến trị số do bụi bẩn ẩm mốc bám dày hoặc chết linh kiện.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc cắm sensor phòng, đo điện trở ở 25°C.",
        expectedResult: "Giá trị chuẩn Daikin sensor gió phòng: ~20kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo điện áp 5V cấp từ vi xử lý xuống chân sensor trên bo mạch khi chưa cắm giắc.",
        expectedResult: "Điện áp phân áp phải đạt chuẩn ~5V DC từ IC nguồn.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "E7",
    brand: "DAIKIN",
    title: "Lỗi động cơ quạt dàn nóng (DC Outdoor Fan Motor Fault)",
    symptom: "Dàn nóng mở nguồn quạt giật lắc rồi dừng, lốc không chạy được hoặc chạy quá nhiệt ngắt.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Động cơ quạt dàn nóng DC bị bó bạc, cháy cuộn dây hoặc chết IC công suất quạt.",
      "Chập cháy mạch nguồn DC 300V hoặc đường 15V cấp cho motor quạt ngoài trời.",
      "Dị vật cành cây, tổ côn trùng làm kẹt cánh quạt.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Quay thử cánh quạt bằng tay xem có bị kẹt lá nhôm hay dị vật cơ khí không.",
        expectedResult: "Cánh quạt quay trơn láng tự do.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Rút giắc quạt, đo điện trở các cặp chân U-V-W của motor quạt DC dàn nóng.",
        expectedResult: "Điện trở 3 cuộn phải cân bằng hoàn toàn (khoảng 40Ω ~ 80Ω tùy model).",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 3,
        action: "Đo áp DC tại bo mạch cấp ra: Chân Vm (300V DC) và Vcc (15V DC).",
        expectedResult: "Đầy đủ nguồn 300V và 15V. Nếu mất 15V -> Chết IC nguồn xung bo dàn nóng.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "J3",
    brand: "DAIKIN",
    title: "Lỗi cảm biến nhiệt độ ống đẩy máy nén (Discharge Pipe Thermistor)",
    symptom: "Máy chạy khoảng 5-10 phút rồi báo lỗi J3, dừng lốc.",
    safetyLevel: "INFO",
    rootCauses: [
      "Đứt dây cảm biến ống đẩy do rung lắc máy nén khi chạy tải nặng.",
      "Sensor ống đẩy bị thoái hóa trị số (loại chịu nhiệt độ cao 100°C+).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc sensor ống đẩy trên bo dàn nóng, đo điện trở ở nhiệt độ 25°C.",
        expectedResult: "Sensor ống đẩy Daikin có giá trị đặc thù: ~200kΩ ở 25°C (hoặc ~50kΩ tùy dòng).",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Kiểm tra vị trí kẹp sensor vào ống đồng đầu đẩy lốc xem có bị tuột gen cách nhiệt không.",
        expectedResult: "Sensor phải được kẹp chặt và bọc kín băng mút cách nhiệt chống ảnh hưởng gió quạt.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "J6",
    brand: "DAIKIN",
    title: "Lỗi cảm biến dàn trao đổi nhiệt dàn nóng (Outdoor Coil Thermistor)",
    symptom: "Máy nén giảm tua bất thường hoặc ngắt báo lỗi J6.",
    safetyLevel: "INFO",
    rootCauses: [
      "Tuột hoặc hỏng cảm biến gắn tại ống đồng giữa dàn nóng tản nhiệt.",
      "Chuột cắn đứt dây giắc cắm cảm biến.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc đo điện trở tại nhiệt độ 25°C.",
        expectedResult: "Điện trở tiêu chuẩn: ~20kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "LC",
    brand: "DAIKIN",
    title: "Lỗi truyền thông giữa Bo điều khiển chính và Bo Inverter Dàn nóng",
    symptom: "Dàn nóng không có bất kỳ phản hồi nào, đèn LED trên bo nhấp nháy mã lỗi LC.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Lỏng cáp bẹ kết nối giữa bo xử lý chính và bo điều khiển biến tần.",
      "Chết khối vi điều khiển phụ trách phát xung PWM cho IPM.",
      "Mất nguồn 5V/12V cấp nội bộ giữa hai bo.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Vệ sinh, cắm lại thật chặt cáp truyền thông phẳng (Ribbon cable) giữa hai bo.",
        expectedResult: "Tiếp xúc kim loại sáng bóng, không oxy hóa chân hàn.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo nguồn 5V DC cấp cho vi xử lý biến tần.",
        expectedResult: "Nguồn 5.0V DC phẳng, không bị gợn sóng nhiễu.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "F3",
    brand: "DAIKIN",
    title: "Nhiệt độ ống xả máy nén quá cao (High Discharge Pipe Temperature)",
    symptom: "Máy chạy được 15-20 phút, lốc nóng bỏng tay rồi ngắt bảo vệ, báo lỗi F3.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Hệ thống bị xì rò rỉ thiếu gas nghiêm trọng khiến hơi hút về không làm mát được lốc.",
      "Nghẹt van tiết lưu điện tử (EEV) hoặc gãy/tắc ống mao đường lỏng.",
      "Máy nén mòn piston cơ khí sinh ma sát nội bộ cực lớn.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Kẹp đồng hồ áp suất thấp vào van dịch vụ.",
        expectedResult: "Áp suất chạy lạnh phải đạt chuẩn (120-140 PSI với R32). Nếu áp chỉ còn 20-50 PSI -> Thiếu gas nghiêm trọng.",
        measuredTool: "MANIFOLD_GAUGE",
      },
      {
        stepNumber: 2,
        action: "Dùng súng nhiệt kế hồng ngoại bắn vào ống đẩy máy nén.",
        expectedResult: "Nhiệt độ an toàn < 95°C. Nếu vượt quá 115°C -> Cắt bảo vệ nhiệt khẩn cấp.",
        measuredTool: "VOM_DC",
      },
    ],
  },

  // =========================================================================
  // 2. PANASONIC INVERTER CODES
  // =========================================================================
  {
    code: "H11",
    brand: "PANASONIC",
    title: "Lỗi mất đồng bộ giao tiếp Dàn nóng và Dàn lạnh",
    symptom: "Máy bật 1 phút sau đó đèn Timer nhấp nháy, quạt dàn lạnh dừng.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Dây kết nối số 3 bị oxy hóa hoặc chập với dây mass.",
      "Mạch tạo xung giao tiếp tại bo dàn nóng bị mất nguồn phụ 12V/5V.",
      "Hỏng IC vi xử lý nhận tín hiệu trên bo dàn lạnh.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Kiểm tra siết chặt lại vít cọc đấu dây 1-2-3 ở cả hai đầu dàn lạnh và dàn nóng.",
        expectedResult: "Các tiếp điểm đồng không bị ten rỉ, tiếp xúc cơ khí chắc chắn.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo áp DC chân 2-3: que đen vào chân 2 (N), que đỏ vào chân 3 (Signal).",
        expectedResult: "Dao động xung nhịp từ 18V ~ 45V DC. Nếu kim đứng yên ở 0V -> Hỏng nguồn phát bo lạnh.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "H14",
    brand: "PANASONIC",
    title: "Lỗi cảm biến nhiệt độ gió hút vào dàn lạnh (Intake Air Thermistor)",
    symptom: "Đèn Timer nhấp nháy ngay khi bật máy, remote check mã lỗi ra H14.",
    safetyLevel: "INFO",
    rootCauses: [
      "Đứt cảm biến đo nhiệt độ phòng Panasonic.",
      "Sai trị số cảm biến (bị tăng hoặc giảm ôm bất thường).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc sensor, đo điện trở thang 20kΩ ở nhiệt độ 25°C.",
        expectedResult: "Giá trị chuẩn Panasonic: ~15kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "H16",
    brand: "PANASONIC",
    title: "Lỗi biến dòng CT biến tần dàn nóng (CT Open / Current Transformer Error)",
    symptom: "Máy nén khởi động tăng tốc được khoảng 20-30 giây rồi ngắt, nháy đèn Timer.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Đứt cuộn dây biến dòng CT trên bo mạch dàn nóng (dùng giám sát dòng điện máy nén).",
      "Hỏng diode chỉnh lưu hoặc điện trở dập xung mạch cảm biến dòng điện.",
      "Máy nén không tiêu thụ dòng do lỗi bo phát xung.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện trở hai đầu cuộn thứ cấp của biến dòng CT trên bo mạch.",
        expectedResult: "Điện trở vài chục Ω (thường 20Ω ~ 60Ω). Nếu vô cùng (OL) -> CT bị đứt.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Kẹp ampe kìm vào dây pha nguồn cấp máy nén khi khởi động.",
        expectedResult: "Dòng điện phải tăng dần từ 1A lên 3A-5A. Nếu lốc rung không dòng -> Chết cuộn lốc.",
        measuredTool: "AMPERE_METER",
      },
    ],
  },
  {
    code: "H23",
    brand: "PANASONIC",
    title: "Lỗi cảm biến nhiệt độ dàn trao đổi nhiệt dàn lạnh",
    symptom: "Máy lạnh không lạnh hoặc ngắt ngưng hoạt động sau vài phút.",
    safetyLevel: "INFO",
    rootCauses: [
      "Hỏng sensor kẹp ống đồng dàn lạnh.",
      "Trôi trị số điện trở gây báo đóng tuyết ảo.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc đo điện trở sensor đồng dàn lạnh ở 25°C.",
        expectedResult: "Điện trở chuẩn Panasonic: ~15kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "H97",
    brand: "PANASONIC",
    title: "Lỗi quạt dàn nóng Inverter bị kẹt cơ hoặc hỏng mạch hồi tiếp",
    symptom: "Dàn nóng bật lên quạt không quay hoặc quay giật cục rồi báo lỗi H97.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Kẹt cánh quạt ngoài trời.",
      "Chết motor quạt DC dàn nóng hoặc nổ IC Driver quạt trên bo mạch.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện trở các cuộn dây quạt DC dàn nóng và kiểm tra quay tay cơ khí.",
        expectedResult: "Cánh quạt trơn tru, cuộn dây cân bằng trở.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "F91",
    brand: "PANASONIC",
    title: "Lỗi bất thường chu trình môi chất lạnh (Refrigeration Cycle / Hết gas)",
    symptom: "Máy chạy quạt gió mát như quạt thường, sau 20 phút báo lỗi F91.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Hệ thống bị xì rò rỉ hết sạch gas lạnh.",
      "Tắc nghẹt phin lọc hoặc van tiết lưu hoàn toàn.",
      "Lốc tụt hơi (piston không nén tạo chênh lệch áp suất).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Lắp đồng hồ nạp gas vào đường ống dịch vụ dàn nóng.",
        expectedResult: "Áp suất tĩnh phải > 150 PSI (R32/R410A). Nếu kim = 0 PSI -> Hệ thống thủng xì hết gas.",
        measuredTool: "MANIFOLD_GAUGE",
      },
      {
        stepNumber: 2,
        action: "Dùng máy dò gas điện tử hoặc bọt xà phòng kiểm tra các đầu nối rắc co nối ống.",
        expectedResult: "Tìm thấy vết dầu loang xì gas tại côn loe ống đồng.",
        measuredTool: "VOM_AC",
      },
    ],
  },
  {
    code: "F99",
    brand: "PANASONIC",
    title: "Lỗi quá dòng DC máy nén Inverter (DC Peak Overcurrent / IPM Fault)",
    symptom: "Máy nén vừa đề pa rung mạnh 1 giây rồi ngắt lập tức, đèn Timer chớp đỏ.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Hỏng module công suất IPM (chập một trong các nhánh IGBT bên trong).",
      "Kẹt cứng cơ khí máy nén DC Inverter.",
      "Chập ngắn mạch cuộn dây stator máy nén.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Ngắt điện, đo thang diode/thang trở kiểm tra 6 van IGBT của module IPM giữa chân P(+)/N(-) với 3 chân ra U, V, W.",
        expectedResult: "6 van phải có điện áp thuận ~0.4V-0.5V và chiều ngược vô cùng. Nếu có nhánh = 0Ω -> IPM bị thủng chập.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo điện trở 3 cọc lốc U, V, W và đo chạm mass vỏ lốc.",
        expectedResult: "Điện trở 3 cuộn bằng nhau (~0.8Ω - 1.2Ω), cách điện vỏ >50MΩ.",
        measuredTool: "MEGOHM_METER",
      },
    ],
  },
  {
    code: "F97",
    brand: "PANASONIC",
    title: "Nhiệt độ máy nén quá cao (Compressor Overheating Protection)",
    symptom: "Máy chạy một lúc khi ngoài trời nắng gắt thì ngắt, thân máy nén nóng rực.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Dàn nóng bẩn nghẹt bụi không giải nhiệt được.",
      "Thiếu gas lạnh hồi về làm mát cuộn dây stator.",
      "Hỏng cảm biến nhiệt độ gắn đầu lốc.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện trở cảm biến đầu lốc Panasonic ở 25°C.",
        expectedResult: "Giá trị chuẩn cảm biến đầu lốc Panasonic: ~50kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Vệ sinh xịt rửa sạch sẽ lá nhôm tản nhiệt dàn nóng bằng máy bơm áp lực.",
        expectedResult: "Không khí lưu thông thông thoáng, dòng điện vận hành giảm về định mức.",
        measuredTool: "AMPERE_METER",
      },
    ],
  },

  // =========================================================================
  // 3. TOSHIBA INVERTER CODES
  // =========================================================================
  {
    code: "01",
    brand: "TOSHIBA",
    title: "Lỗi đường truyền tín hiệu tiếp nối giữa Dàn lạnh và Dàn nóng",
    symptom: "Dàn lạnh báo lỗi 01 trên remote hoặc đèn nhấp nháy, không khởi động được.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Đứt hoặc tiếp xúc kém đường dây số 3 giữa 2 dàn.",
      "Hỏng mạch nguồn tạo điện áp giao tiếp trên bo điều khiển.",
      "Hỏng bộ ghép quang optocoupler.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp DC giữa chân 2 và chân 3 tại domino dàn lạnh.",
        expectedResult: "Điện áp phải dao động nhịp nhàng từ 15V đến 40V DC.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Kiểm tra điện trở cuộn dây kết nối và siết lại các ốc bắt dây.",
        expectedResult: "Dây dẫn thông mạch < 1Ω.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "02",
    brand: "TOSHIBA",
    title: "Lỗi khối công suất biến tần Inverter (IPM / Giao tiếp công suất)",
    symptom: "Bật máy quạt dàn lạnh chạy, dàn nóng im lìm rồi báo lỗi 02.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Hỏng khối công suất IPM trên bo dàn nóng.",
      "Mất nguồn 300V DC trên dàn tụ lọc nguồn chính.",
      "Đứt cầu chì bảo vệ mạch công suất biến tần.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp trên tụ lọc nguồn DC chính sau cầu Diode.",
        expectedResult: "Điện áp một chiều đạt ~300V ~ 320V DC.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo kiểm tra cầu chì gốm bảo vệ mạch công suất (thường 20A-30A).",
        expectedResult: "Cầu chì thông mạch 0Ω. Nếu đứt -> Tuyệt đối không nối tắt vì IPM đang chập ngắn mạch.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "03",
    brand: "TOSHIBA",
    title: "Hết thời gian chờ tín hiệu từ dàn nóng (Time-out Communication)",
    symptom: "Máy chờ tín hiệu phản hồi quá 3 phút không thấy, dừng hoạt động.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Bo dàn nóng bị mất nguồn AC cấp vào (chết biến áp hoặc nguồn xung switching).",
      "Hỏng IC vi xử lý trên bo mạch dàn nóng.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp AC 220V cấp tới cọc đấu nguồn bo dàn nóng.",
        expectedResult: "Có điện áp 220V AC đầy đủ.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Quan sát đèn LED chỉ thị trạng thái nguồn trên bo dàn nóng.",
        expectedResult: "Đèn LED phải sáng hoặc nhấp nháy chu kỳ. Nếu tắt ngóm -> Bo dàn nóng mất nguồn.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "04",
    brand: "TOSHIBA",
    title: "Lỗi động cơ quạt dàn lạnh (DC Fan Motor Fault)",
    symptom: "Quạt lồng sóc không quay hoặc quay vài vòng rồi dừng báo lỗi 04.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Chết motor quạt dàn lạnh.",
      "Hỏng mạch kích và nhận tín hiệu xung Hall tốc độ quạt.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp cấp cho quạt DC trên giắc bo: Chân Vm, Vcc và Vsp.",
        expectedResult: "Vm = 300V DC, Vcc = 15V DC, Vsp điều khiển = 1.5V ~ 5V DC.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "1C",
    brand: "TOSHIBA",
    title: "Lỗi dẫn động máy nén Inverter (Compressor Drive Error / Không đề ba)",
    symptom: "Máy nén cố gắng khởi động 3 lần không thành công rồi khóa mã lỗi 1C.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Máy nén bị kẹt cơ khí do thiếu nhớt hoặc nghẹt đường dầu.",
      "Lệch pha điện áp từ bo Inverter điều khiển ra 3 cọc U-V-W.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc cọc lốc, đo trở 3 pha cuộn dây động cơ lốc.",
        expectedResult: "Cân bằng chính xác từng cuộn (~0.7Ω - 1.4Ω).",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Lắp bộ test xung 6 LED vào 3 ngõ ra U-V-W để kiểm tra xung kích từ IPM.",
        expectedResult: "Cả 6 bóng LED phải sáng chớp đều nhau. Nếu có bóng tắt -> Hỏng IPM nhánh tương ứng.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "1E",
    brand: "TOSHIBA",
    title: "Nhiệt độ ống đẩy máy nén xả quá cao (High Discharge Temperature)",
    symptom: "Máy chạy một lúc rồi ngắt nhiệt, báo lỗi 1E trên màn hình điều khiển.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Thiếu gas lạnh.",
      "Cảm biến nhiệt độ ống đẩy bị sai lệch ôm hoặc tuột khỏi vị trí.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo kiểm tra điện trở cảm biến ống đẩy Toshiba ở 25°C.",
        expectedResult: "Giá trị chuẩn: ~50kΩ ở 25°C (giảm còn ~3kΩ khi nóng 80°C).",
        measuredTool: "VOM_DC",
      },
    ],
  },

  // =========================================================================
  // 4. MITSUBISHI ELECTRIC / HEAVY CODES
  // =========================================================================
  {
    code: "E6",
    brand: "MITSUBISHI",
    title: "Lỗi truyền thông giữa Dàn lạnh và Dàn nóng (Serial Signal Error)",
    symptom: "Đèn Operation nhấp nháy 6 lần hoặc hiển thị lỗi E6 trên điều khiển.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Đấu lộn cọc dây số 2 và 3.",
      "Cháy cầu chì mạch giao tiếp hoặc nổ đi-ốt zener bảo vệ quá áp.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Kiểm tra đúng sơ đồ đấu dây: Chân 1 (L), Chân 2 (N), Chân 3 (Signal/Data).",
        expectedResult: "Đúng thứ tự, không bị đảo pha hoặc chập đất.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo áp DC dao động chân 2-3.",
        expectedResult: "Điện áp nhịp dao động 12V ~ 30V DC.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "E7",
    brand: "MITSUBISHI",
    title: "Lỗi vi xử lý hoặc mất nguồn cấp bo mạch Dàn nóng",
    symptom: "Dàn lạnh chạy quạt nhưng dàn nóng hoàn toàn không có dấu hiệu đóng rơ-le.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Mất nguồn nuôi cấp cho bo dàn nóng (đứt dây nguồn liên kết).",
      "Chết khối nguồn xung switching tạo 12V/5V trên bo dàn nóng.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp 220V AC tại cọc cấp nguồn ngoài dàn nóng.",
        expectedResult: "220V AC ổn định.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo áp 12V và 5V sau IC ổn áp (7805/7812) trên bo dàn nóng.",
        expectedResult: "Chuẩn 12V DC và 5V DC.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "P8",
    brand: "MITSUBISHI",
    title: "Lỗi nhiệt độ ống xả máy nén vượt ngưỡng an toàn",
    symptom: "Lốc máy nén ngắt sau khi chạy tải cao, đèn nhấp nháy chu kỳ báo lỗi P8.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Thiếu hụt gas do rò rỉ.",
      "Van tiết lưu điện tử EEV không mở đúng bước.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Kiểm tra trở cuộn dây van tiết lưu điện tử EEV (thường 5 dây hoặc 6 dây).",
        expectedResult: "Điện trở các cuộn dây EEV khoảng 40Ω ~ 50Ω cân đối.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "U02",
    brand: "MITSUBISHI",
    title: "Lỗi giảm điện áp DC Bus (DC Voltage Drop / Hỏng tụ lọc nguồn)",
    symptom: "Khi máy nén bắt đầu tăng tua thì máy tắt phụt ngắt nguồn báo lỗi U02.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Nguồn điện lưới đầu vào bị sụt áp dưới 180V AC khi khởi động.",
      "Khô phù các tụ hóa lọc nguồn DC 300V trên bo dàn nóng.",
      "Hỏng rơ-le nạp đệm bảo vệ tụ (cháy tiếp điểm rơ-le bypass).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện áp lưới 220V tại thời điểm lốc bắt đầu đề pa tăng tua.",
        expectedResult: "Điện áp không được sụt dưới 200V AC.",
        measuredTool: "VOM_AC",
      },
      {
        stepNumber: 2,
        action: "Đo dung lượng tụ lọc DC bằng đồng hồ đo tụ chuyên dụng (hoặc quan sát lưng tụ xem có phồng rộp không).",
        expectedResult: "Dung lượng tụ phải đạt trị số ghi trên thân (thường 1500uF - 2500uF 450V).",
        measuredTool: "VOM_DC",
      },
    ],
  },

  // =========================================================================
  // 5. LG DUAL INVERTER CODES
  // =========================================================================
  {
    code: "CH05",
    brand: "LG",
    title: "Lỗi mất tín hiệu giao tiếp giữa Dàn lạnh và Dàn nóng",
    symptom: "Máy nhấp nháy đèn báo 5 lần (CH05) sau khi bật CB nguồn 3 phút.",
    safetyLevel: "WARNING",
    rootCauses: [
      "Đứt dây truyền tín hiệu giữa dàn trong và ngoài.",
      "Hỏng mạch giao tiếp opto quang PC817 trên bo mạch dàn nóng hoặc lạnh.",
      "Nhiễu tín hiệu do tiếp đất không đúng tiêu chuẩn.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo thông mạch dây cáp kết nối từ dàn lạnh ra dàn nóng.",
        expectedResult: "Dây dẫn không bị chuột cắn đứt ngậm, thông mạch hoàn toàn.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo áp DC dao động giữa dây N và dây truyền tín hiệu.",
        expectedResult: "Xung điện áp dao động từ 15V đến 50V DC.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "CH21",
    brand: "LG",
    title: "Lỗi quá dòng tức thời bo Inverter (IPM DC Peak Overcurrent)",
    symptom: "Máy nén khởi động giật 1 phát rồi tắt ngúm, báo lỗi CH21.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Chết chập module IPM dàn nóng LG.",
      "Kẹt lốc máy nén Dual Inverter.",
      "Tuột giắc cọc lốc hoặc chập cuộn dây lốc.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc cọc lốc, đo kiểm tra 6 van bán dẫn bên trong IPM.",
        expectedResult: "Không có van nào bị đánh thủng ngắn mạch 0Ω.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Đo điện trở 3 cọc U-V-W của lốc LG Dual Inverter.",
        expectedResult: "Cân bằng điện trở ~0.8Ω - 1.1Ω.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "CH26",
    brand: "LG",
    title: "Lỗi máy nén DC Inverter không khởi động được (Compressor Lock)",
    symptom: "Lốc phát tiếng kêu ừ ừ trong 3 giây nhưng không quay được, ngắt báo CH26.",
    safetyLevel: "DANGER",
    rootCauses: [
      "Bó kẹt cơ khí phần piston lốc nén do cạn dầu hoặc ngập dịch.",
      "Hỏng mạch tạo góc lệch pha khởi động trên bo Inverter.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Thử dùng kích đề hoặc xả bớt áp suất cân bằng hai đầu hút đẩy trước khi cho chạy lại.",
        expectedResult: "Áp suất hệ thống phải cân bằng hoàn toàn trước khi khởi động máy nén Inverter.",
        measuredTool: "MANIFOLD_GAUGE",
      },
    ],
  },
  {
    code: "CH44",
    brand: "LG",
    title: "Lỗi cảm biến nhiệt độ gió ngoài trời (Outdoor Air Sensor)",
    symptom: "Máy báo lỗi CH44, quạt dàn nóng chạy tốc độ tối đa không kiểm soát.",
    safetyLevel: "INFO",
    rootCauses: [
      "Tuột giắc hoặc đứt dây sensor nhiệt độ môi trường ngoài trời.",
      "Sensor sai lệch giá trị điện trở.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Đo điện trở cảm biến gió ngoài trời LG ở 25°C.",
        expectedResult: "Giá trị chuẩn cảm biến gió LG: ~10kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
    ],
  },
  {
    code: "CH45",
    brand: "LG",
    title: "Lỗi cảm biến nhiệt độ ống đẩy máy nén (Pipe Discharge Sensor)",
    symptom: "Máy chạy một lát ngắt báo lỗi CH45.",
    safetyLevel: "INFO",
    rootCauses: [
      "Đứt cảm biến ống đẩy máy nén LG.",
      "Trôi trị số điện trở do nhiệt độ cao lâu ngày.",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc đo điện trở cảm biến đầu lốc LG ở 25°C.",
        expectedResult: "Giá trị chuẩn: ~200kΩ ở 25°C.",
        measuredTool: "VOM_DC",
      },
    ],
  },

  // =========================================================================
  // 6. CASPER CODES
  // =========================================================================
  {
    code: "E4",
    brand: "CASPER",
    title: "Lỗi cảm biến nhiệt độ phòng hoặc cảm biến đồng dàn lạnh",
    symptom: "Điều hòa báo lỗi E4 trên màn hình LED ngay sau khi cấp nguồn hoặc chạy 1 phút.",
    safetyLevel: "INFO",
    rootCauses: [
      "Đứt dây hoặc giắc cắm cảm biến Sensor bị tuột, ẩm ướt.",
      "Sensor biến trị số điện trở (sai lệch do nhiệt ẩm môi trường).",
    ],
    steps: [
      {
        stepNumber: 1,
        action: "Rút giắc sensor ra khỏi bo mạch, đo giá trị điện trở ở nhiệt độ 25°C môi trường.",
        expectedResult: "Sensor phòng: ~15kΩ hoặc ~5kΩ; Sensor đồng dàn lạnh: ~5kΩ ~ 10kΩ.",
        measuredTool: "VOM_DC",
      },
      {
        stepNumber: 2,
        action: "Hơ ấm đầu cảm biến và quan sát biến thiên điện trở (NTC).",
        expectedResult: "Nhiệt độ tăng thì điện trở phải giảm mượt mà, không bị nhảy loạn hoặc ngắt quãng.",
        measuredTool: "VOM_DC",
      },
    ],
  },
];
