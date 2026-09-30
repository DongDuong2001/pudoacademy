export interface PracticalStep {
  step: number;
  title: string;
  action: string;
  expectedResult: string;
}

export interface FieldPitfall {
  mistake: string;
  consequence: string;
  prevention: string;
}

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

export interface FormulaDetail {
  name: string;
  calculatesWhat: string; // Mục đích tính toán
  whenToUse: string; // Khi nào sử dụng ngoài hiện trường
  expression: string; // Biểu thức toán học
  variables: FormulaVariable[];
  safeStandard: string; // Tiêu chuẩn bình thường / Ngưỡng an toàn
  sampleCalculation: string; // Ví dụ tính toán số liệu cụ thể
}

export interface SubjectKnowledgeDetail {
  subjectId: string;
  diagramType: "ELECTRICAL_SAFETY" | "REFRIGERATION_CYCLE" | "COPPER_FLARING" | "COMPRESSOR_WIRING" | "INVERTER_PWM" | "VACUUM_STATION";
  coreTheory: {
    heading: string;
    paragraphs: string[];
    keyPoints: string[];
  }[];
  formulas: FormulaDetail[];
  practicalSteps: PracticalStep[];
  fieldPitfalls: FieldPitfall[];
}

export const SUBJECT_KNOWLEDGE_MAP: Record<string, SubjectKnowledgeDetail> = {
  // =========================================================================
  // NĂM 1 - HỌC KỲ 1
  // =========================================================================
  "dl-101": {
    subjectId: "dl-101",
    diagramType: "ELECTRICAL_SAFETY",
    coreTheory: [
      {
        heading: "1. Bản chất nguồn điện 1 pha 220V AC trong điều hòa không khí",
        paragraphs: [
          "Điện áp sử dụng cho điều hòa dân dụng tại Việt Nam là điện xoay chiều 1 pha hình sin, tần số 50Hz, hiệu điện thế hiệu dụng 220V - 240V. Nguồn điện gồm 2 dây dẫn chính: Dây Pha (L - Line, có điện áp 220V so với đất) và Dây Trung Tính (N - Neutral, điện áp lý thuyết xấp xỉ 0V so với đất).",
          "Ngoài 2 dây cấp năng lượng, bắt buộc phải có Dây Tiếp Địa Bảo Vệ (PE - Protective Earth). Khi máy nén hoặc quạt bị lão hóa cách điện, dòng rò sẽ chạy qua dây PE xuống đất làm nhảy aptomat chống giật RCBO ngay lập tức, triệt tiêu nguy cơ giật điện gây chết người khi người dùng chạm vào vỏ máy.",
        ],
        keyPoints: [
          "Dây pha L luôn là dây đi qua cầu chì và tiếp điểm đóng ngắt của Aptomat.",
          "Điện trở tiếp địa an toàn cho máy lạnh dân dụng bắt buộc phải đạt R_đất ≤ 4Ω (theo TCVN 9358:2012 / IEC 60364).",
          "Dòng rò định mức tác động của RCBO dùng cho máy lạnh gia đình là IΔn ≤ 30mA với thời gian cắt t < 0.03 giây.",
          "Điện trở cách điện cuộn dây vỏ máy đo bằng Megohmmeter ở 500V DC phải đạt R_cách_điện ≥ 1.0 MΩ (lý tưởng > 5.0 MΩ).",
        ],
      },
      {
        heading: "2. Quy tắc an toàn sống còn khi đo kiểm bằng đồng hồ vạn năng VOM",
        paragraphs: [
          "Hơn 80% trường hợp nổ que đo, cháy đồng hồ VOM ở thợ mới vào nghề là do: Đang để thang đo Điện trở (Ohm) hoặc thang đo Dòng điện (Ampe) nhưng lại chọc thẳng que đo vào ổ điện 220V AC.",
          "Khi đo kiểm tra chạm vỏ: Tuyệt đối phải ngắt cầu dao điện, dùng đồng hồ Mega-ohm (Megger) phát điện áp 500V DC để đo điện trở cách điện giữa cọc đấu dây máy nén với vỏ đồng.",
        ],
        keyPoints: [
          "Luôn kiểm tra vị trí núm vặn thang đo trước khi chạm que đo vào mạch điện.",
          "Khi đo kiểm tra bo mạch đang có điện: Que đen kẹp cố định vào điểm mass/chân N trước, tay chỉ cầm một que đỏ để chấm điểm đo, tránh dòng điện chạy qua tim.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính dòng điện làm việc định mức (I_đm)",
        calculatesWhat: "Tính toán cường độ dòng điện chạy liên tục qua máy lạnh khi đang hoạt động hết công suất.",
        whenToUse: "Dùng để chọn cỡ dây dẫn điện nguồn (tiết diện 1.5mm², 2.5mm² hay 4.0mm²) và chọn đúng trị số Aptomat (16A, 20A, 32A) trước khi lắp máy.",
        expression: "I = P / (U × cosφ × η)",
        variables: [
          { symbol: "I", name: "Cường độ dòng điện làm việc", unit: "A (Ampe)", description: "Dòng điện thực tế ampe kìm đo được trên dây pha L khi máy chạy" },
          { symbol: "P", name: "Công suất điện tiêu thụ của máy", unit: "W (Watt)", description: "Ghi trên tem nhãn dàn nóng (máy 9000 BTU ~ 750W - 850W)" },
          { symbol: "U", name: "Điện áp lưới điện sử dụng", unit: "V (Volt)", description: "Điện áp xoay chiều hiệu dụng chuẩn 220V" },
          { symbol: "cosφ", name: "Hệ số công suất tải", unit: "Không thứ nguyên", description: "Điều hòa Inverter có mạch PFC đạt cosφ ≈ 0.90 ~ 0.95" },
          { symbol: "η", name: "Hiệu suất chuyển đổi năng lượng", unit: "Không thứ nguyên", description: "Hiệu suất động cơ máy nén và quạt, thường η ≈ 0.85" },
        ],
        safeStandard: "Máy 1.0 HP (9000 BTU): I_đm = 3.5A - 4.5A | Máy 1.5 HP (12000 BTU): I_đm = 5.0A - 6.5A | Máy 2.0 HP (18000 BTU): I_đm = 7.5A - 9.0A",
        sampleCalculation: "Lắp điều hòa Daikin 1.5 HP có công suất điện ghi trên tem P = 1,050W. Ta có I = 1050 / (220 × 0.9 × 0.85) = 1050 / 168.3 ≈ 6.24 Ampe. Chọn dây Cadivi 2 × 2.5mm² và MCB 16A Curve C.",
      },
      {
        name: "Công thức tính dòng khởi động máy nén Mono (LRA)",
        calculatesWhat: "Tính dòng điện ăn tức thời (đề ba) trong 0.5 - 1.5 giây khi rotor máy nén bắt đầu quay.",
        whenToUse: "Dùng để kiểm tra lốc có bị kẹt cơ hay không. Nếu kẹp ampe kìm thấy dòng vọt lên bằng đúng giá trị LRA mà lốc không chạy và ngắt sau 3 giây thì lốc đang bị kẹt cơ hoặc chết tụ đề.",
        expression: "LRA ≈ (4 ~ 6) × I_đm",
        variables: [
          { symbol: "LRA", name: "Locked Rotor Amps (Dòng hãm rô-to)", unit: "A (Ampe)", description: "Dòng cực đại khi rô-to máy nén bị giữ đứng yên chưa quay" },
          { symbol: "I_đm", name: "Dòng điện làm việc định mức", unit: "A (Ampe)", description: "Dòng chạy ổn định bình thường" },
        ],
        safeStandard: "LRA máy 1.0 HP: ~18A - 22A | LRA máy 1.5 HP: ~28A - 32A. Dòng này chỉ được phép duy trì dưới 1.5 giây rồi phải tụt ngay về dòng định mức I_đm.",
        sampleCalculation: "Máy nén 1.5 HP có dòng định mức 5.8A. Dòng khởi động lý thuyết LRA ≈ 5.8 × 5 = 29 Ampe. Khi bật máy, kẹp ampe kìm thấy nhảy 28.5A rồi lập tức hạ về 5.6A là lốc khởi động hoàn hảo.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra điện áp nguồn cấp",
        action: "Vặn VOM sang thang AC 500V (hoặc Auto AC), cắm que đo vào 2 cực domino cấp nguồn L - N.",
        expectedResult: "Điện áp phải đạt ổn định từ 200V đến 240V AC. Dưới 190V máy Inverter sẽ báo lỗi sụt áp.",
      },
      {
        step: 2,
        title: "Đo rò điện ra vỏ máy",
        action: "Ngắt điện hoàn toàn. Vặn VOM thang đo Ohm x10k hoặc dùng Megger 500V. Một que kẹp cọc vỏ đồng dàn nóng, que kia đo lần lượt vào cọc chân lốc.",
        expectedResult: "Megger đo điện trở cách điện phải đạt > 5 MΩ. Nếu kim VOM nhích lên dù chỉ 1 chút -> lốc đã chạm vỏ.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Đo nhầm thang Ohm hoặc thang còi Buzzer vào nguồn điện lưới 220V AC.",
        consequence: "Nổ que đo, cháy nổ điện trở shunt bên trong đồng hồ VOM, bỏng tay và mắt.",
        prevention: "Tập phản xạ nhìn núm vặn thang đo đồng hồ trước khi chạm que đo vào tiếp điểm.",
      },
      {
        mistake: "Không đấu dây tiếp địa chống giật cho dàn nóng treo ngoài lan can/tường ẩm.",
        consequence: "Dòng cảm ứng hoặc dòng rò qua cuộn dây máy nén truyền thẳng ra vỏ kim loại, giật tê người hoặc ngã thang từ trên cao.",
        prevention: "Bắt buộc kéo dây PE nối cọc tiếp địa đạt R_đất ≤ 4Ω theo chuẩn TCVN.",
      },
    ],
  },

  "dl-102": {
    subjectId: "dl-102",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Nguyên lý chu trình nén hơi 4 thiết bị chính",
        paragraphs: [
          "Bản chất của máy lạnh là một hệ thống bơm nhiệt kín tuần hoàn, vận chuyển nhiệt lượng từ phòng có nhiệt độ thấp thải ra môi trường bên ngoài có nhiệt độ cao hơn nhờ môi chất lạnh (Gas).",
          "Chu trình gồm 4 giai đoạn nối tiếp nhau khép kín: (1) Nén hơi áp thấp thành hơi áp cao trong máy nén -> (2) Giải nhiệt ngưng tụ thành chất lỏng áp cao tại dàn ngưng tụ ngoài trời -> (3) Tiết lưu giảm áp đột ngột làm sôi một phần chất lỏng -> (4) Bay hơi hấp thu nhiệt của không khí trong phòng tại dàn bay hơi.",
        ],
        keyPoints: [
          "Áp suất và nhiệt độ sôi của môi chất lạnh luôn tỷ lệ thuận với nhau (Áp suất tăng -> Nhiệt độ sôi tăng; Áp suất giảm -> Nhiệt độ sôi giảm).",
          "Gas đi vào máy nén bắt buộc phải ở trạng thái 100% hơi quá nhiệt. Nếu lỏng lọt vào xi lanh, lỏng không nén được sẽ làm vỡ lá van lá thép máy nén (ngập dịch).",
        ],
      },
      {
        heading: "2. Độ quá nhiệt (Superheat) & Độ quá lạnh (Subcooling)",
        paragraphs: [
          "Độ quá nhiệt (Superheat) là hiệu số giữa nhiệt độ thực tế kẹp trên ống đồng về máy nén và nhiệt độ sôi bão hòa tương ứng với áp suất hút đo trên đồng hồ Manifold.",
          "Độ quá lạnh (Subcooling) tại đầu ra của dàn nóng chứng minh gas đã ngưng tụ 100% thành chất lỏng trước khi vào van tiết lưu.",
        ],
        keyPoints: [
          "Độ quá nhiệt tiêu chuẩn đối với điều hòa dân dụng là từ 5°C đến 7°C (hoặc 8°F đến 12°F).",
          "Nếu SH < 2°C: Nguy cơ ngập dịch gãy van lốc! Nếu SH > 10°C: Máy đang thiếu gas nghiêm trọng!",
          "Độ quá lạnh tiêu chuẩn: SC = 3°C đến 5°C.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính Độ quá nhiệt (Superheat - SH)",
        calculatesWhat: "Đo lường mức độ bốc hơi hoàn toàn của gas lỏng thành hơi trước khi chui vào buồng nén.",
        whenToUse: "Dùng để cân chỉnh lượng gas chính xác 100% khi sạc gas ngoài hiện trường.",
        expression: "SH = T_đo_ống_về - T_sôi_bão_hòa",
        variables: [
          { symbol: "SH", name: "Độ quá nhiệt (Superheat)", unit: "°C (Độ Celsius)", description: "Chênh lệch nhiệt độ giữa hơi thực tế và điểm sôi bão hòa" },
          { symbol: "T_đo_ống_về", name: "Nhiệt độ kẹp trên ống hút", unit: "°C", description: "Nhiệt kế điện tử kẹp chặt vào ống đồng to cách đầu hút máy nén 15cm" },
          { symbol: "T_sôi_bão_hòa", name: "Nhiệt độ sôi bão hòa tương ứng", unit: "°C", description: "Tra từ bảng P-T Chart tương ứng với áp suất hút" },
        ],
        safeStandard: "5°C ≤ SH ≤ 7°C (Chuẩn vàng). Nếu SH < 2°C: Ngập dịch! Nếu SH > 10°C: Thiếu gas nặng!",
        sampleCalculation: "Máy chạy gas R32, áp suất hút hiển thị 135 PSI (tra bảng P-T được T_sôi = 4°C). Nhiệt kế kẹp ống đồng đo được 10°C. Ta có SH = 10 - 4 = 6°C -> Máy đủ gas hoàn hảo.",
      },
      {
        name: "Công thức tính Độ quá lạnh (Subcooling - SC)",
        calculatesWhat: "Kiểm tra gas lỏng sau khi qua dàn nóng đã được giải nhiệt thành chất lỏng hoàn toàn hay chưa.",
        whenToUse: "Dùng để kiểm tra dàn nóng có bị bụi bẩn nghẹt quạt hay bị thừa gas hay không.",
        expression: "SC = T_ngưng_tụ_bão_hòa - T_đo_ống_lỏng",
        variables: [
          { symbol: "SC", name: "Độ quá lạnh (Subcooling)", unit: "°C", description: "Mức độ hạ nhiệt của chất lỏng dưới nhiệt độ ngưng tụ" },
          { symbol: "T_ngưng_tụ_bão_hòa", name: "Nhiệt độ ngưng tụ tương ứng áp cao", unit: "°C", description: "Tra bảng P-T theo áp suất đẩy của dàn nóng" },
          { symbol: "T_đo_ống_lỏng", name: "Nhiệt độ kẹp trên ống lỏng nhỏ", unit: "°C", description: "Đo tại đầu ống lỏng đi ra khỏi dàn nóng" },
        ],
        safeStandard: "Tiêu chuẩn: 3°C ≤ SC ≤ 5°C. Nếu SC > 8°C chứng tỏ dàn nóng giải nhiệt kém hoặc nạp thừa gas.",
        sampleCalculation: "Áp suất đẩy đo được 395 PSI (tra bảng P-T gas R32 ngưng tụ ở 45°C). Nhiệt kế kẹp ống lỏng đo được 41°C. Ta có SC = 45 - 41 = 4°C -> Dàn nóng tản nhiệt rất tốt.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Cắm đồng hồ đo áp suất và kẹp nhiệt kế",
        action: "Vặn dây đồng hồ áp thấp vào van ty sạc dàn nóng. Kẹp đầu dò nhiệt độ điện tử vào ống đồng to (ống hơi về), bọc xốp cách nhiệt kín đầu dò.",
        expectedResult: "Áp suất hiển thị trên đồng hồ ổn định (ví dụ 135 - 145 PSI với gas R32 khi máy chạy max tải).",
      },
      {
        step: 2,
        title: "Tính toán Superheat và cân chỉnh lượng gas",
        action: "Lấy nhiệt độ kẹp trừ đi nhiệt độ sôi bão hòa trên đồng hồ. Nếu SH > 10°C thì nạp thêm một lượng gas nhỏ; nếu SH < 3°C thì thu hồi bớt gas.",
        expectedResult: "Độ quá nhiệt đạt mốc 5°C - 7°C và dòng làm việc của lốc đúng bằng dòng định mức in trên tem máy.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Nạp gas theo cảm tính sờ tay thấy ống to 'buốt buốt và đọng sương' là dừng.",
        consequence: "Ống đọng sương có thể do thiếu gió dàn lạnh (lưới lọc bụi bẩn nghẹt) chứ không phải đủ gas. Lốc dễ bị ngập dịch hỏng lá van.",
        prevention: "Bắt buộc kết hợp đo 3 thông số: Áp suất hút (PSI) + Dòng kẹp tải (Ampe) + Độ quá nhiệt (Superheat).",
      },
      {
        mistake: "Dùng lửa khò hơ nóng bình gas để nạp cho nhanh khi trời rét.",
        consequence: "Áp suất bên trong bình tăng vọt cục bộ vượt quá giới hạn chịu lực của vỏ bình, nguy cơ nổ bình gas cực kỳ nguy hiểm.",
        prevention: "Chỉ được ngâm bình gas vào chậu nước ấm dưới 40°C, tuyệt đối không dùng đèn khò lửa trực tiếp.",
      },
    ],
  },

  "dl-103": {
    subjectId: "dl-103",
    diagramType: "COPPER_FLARING",
    coreTheory: [
      {
        heading: "1. Tiêu chuẩn kỹ thuật ống đồng máy lạnh ASTM B280",
        paragraphs: [
          "Ống đồng sử dụng trong ngành điện lạnh bắt buộc phải là loại ống đồng không hàn (Seamless Copper Tube), độ tinh khiết đồng nguyên chất đạt 99.9%.",
          "Áp suất làm việc của gas R410A và R32 cao hơn gas R22 cũ khoảng 1.6 lần (áp suất đẩy mùa hè có thể lên đến 450 PSI ~ 31 bar). Do đó, ống đồng lắp đặt cho máy R32/R410A bắt buộc phải có độ dày thành ống tối thiểu từ 0.71mm đến 0.81mm. Tuyệt đối không được dùng ống đồng mỏng 0.51mm - 0.61mm vì rất dễ bị bục nứt trong quá trình uốn ống hoặc rung lắc máy nén.",
        ],
        keyPoints: [
          "Kích thước đường ống phổ thông: Ø6.35mm (1/4\"), Ø9.52mm (3/8\"), Ø12.7mm (1/2\"), Ø15.88mm (5/8\").",
          "Quy cách cắt ống: Luôn dùng dao cắt ống chuyên dụng, siết dao từ từ từng 1/4 vòng, không được bóp méo ống.",
        ],
      },
      {
        heading: "2. Kỹ thuật loe ống lệch tâm và kỹ thuật hàn thổi khí trơ Nitơ",
        paragraphs: [
          "Đầu loe ống đồng đóng vai trò như một chiếc gioăng làm kín kim loại tiếp xúc trực tiếp với côn rắc co của van máy lạnh. Khi dùng bộ loe lệch tâm có cữ, ống chỉ được nhô ra khỏi mặt kẹp từ 1.0mm đến 1.2mm.",
          "Khi hàn hơi ống đồng: Đồng ở nhiệt độ 600°C - 800°C sẽ phản ứng tức thì với oxy trong không khí tạo thành lớp muội oxit đồng màu đen (CuO) bên trong lòng ống. Lớp xỉ này sẽ bong ra khi gas tuần hoàn, làm tắc van tiết lưu và làm cháy lốc. Vì vậy, bắt buộc phải thổi khí Nitơ khô áp suất nhẹ (0.2 bar / 3-5 PSI) vào trong lòng ống trong suốt quá trình đốt lửa hàn.",
        ],
        keyPoints: [
          "Trước khi loe ống: Bắt buộc phải dốc ngược đầu ống xuống đất và dùng dao gọt ba-via nạo sạch gờ sắc cạnh bên trong.",
          "Quên đút tán rắc-co vào ống trước khi loe là lỗi kinh điển của người mới học!",
        ],
      },
    ],
    formulas: [
      {
        name: "Bảng lực siết cờ lê lực (Torque) chuẩn cho rắc-co đồng",
        calculatesWhat: "Đo mô-men xoắn cần thiết khi siết tán rắc-co vào van dịch vụ.",
        whenToUse: "Dùng cờ lê cân lực khi siết đầu tán đồng, tránh siết quá tay làm bẹp nứt miệng loe hoặc siết non làm xì gas.",
        expression: "Mô-men T (Nm) = Lực tác dụng F (N) × Cánh tay đòn d (m)",
        variables: [
          { symbol: "Tán Ø6.35 (1/4\")", name: "Mô-men siết ống lỏng", unit: "14 ~ 18 Nm", description: "Lực siết vừa phải bằng 1 tay cầm cờ lê dài 20cm" },
          { symbol: "Tán Ø9.52 (3/8\")", name: "Mô-men siết ống hơi máy 9000-12000 BTU", unit: "34 ~ 42 Nm", description: "Lực siết đầm tay chắc chắn" },
          { symbol: "Tán Ø12.7 (1/2\")", name: "Mô-men siết ống hơi máy 18000 BTU", unit: "49 ~ 61 Nm", description: "Lực siết mạnh cần giữ 2 cờ lê đối lực" },
          { symbol: "Tán Ø15.88 (5/8\")", name: "Mô-men siết ống hơi máy 24000 BTU", unit: "68 ~ 82 Nm", description: "Lực siết rất mạnh dùng 2 cờ lê đối lực khóa chặt" },
        ],
        safeStandard: "Tuyệt đối không dùng mỏ lết nối thêm ống tuýp sắt để giằng siết vì sẽ làm đứt ren rắc-co đồng thau của van.",
        sampleCalculation: "Siết rắc-co ống Ø9.52 (tiêu chuẩn 38 Nm). Kỹ thuật viên cài cờ lê lực mốc 38 Nm, siết đều tay cho đến khi cờ lê kêu 'tạch' một tiếng là dừng lại.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Cắt ống và nạo ba-via",
        action: "Cắt ống phẳng 90 độ, dốc đầu ống hướng xuống, dùng lưỡi nạo xoay tròn 2-3 vòng lấy sạch gờ mạt đồng.",
        expectedResult: "Mép ống tròn đều, nhẵn thín, không có bất kỳ mạt đồng nào rơi vào trong ống.",
      },
      {
        step: 2,
        title: "Kẹp ống và loe lệch tâm",
        action: "Nhét tán rắc-co vào trước. Đặt ống vào rãnh kẹp đúng cỡ, cữ nhô 1.0mm, khóa chặt kẹp và quay vam xoay đến khi trượt ly hợp cạch cạch.",
        expectedResult: "Mặt côn loe rộng đúng 45 độ, bề mặt sáng bóng như gương, không nứt răng cưa mép.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Hàn nối ống đồng ngoài công trình mà không thổi khí trơ Nitơ.",
        consequence: "Xỉ than đen bong tróc bên trong lòng ống làm nghẹt van tiết lưu điện tử EEV, máy báo lỗi áp suất cao và chết lốc sau 3 tháng sử dụng.",
        prevention: "Luôn mang theo bình khí Nitơ nhỏ kèm đồng hồ điều áp chỉnh lưu lượng 3-5 PSI khi hàn hơi.",
      },
    ],
  },

  // =========================================================================
  // NĂM 1 - HỌC KỲ 2
  // =========================================================================
  "dl-104": {
    subjectId: "dl-104",
    diagramType: "ELECTRICAL_SAFETY",
    coreTheory: [
      {
        heading: "1. Nguyên lý Contactor (Khởi động từ) & Rơ-le nhiệt bảo vệ động cơ",
        paragraphs: [
          "Contactor là khí cụ đóng ngắt cơ điện sử dụng lực hút điện từ của cuộn dây (Coil A1-A2) để hút tiếp điểm động lực đóng điện cho máy nén 1 pha hoặc 3 pha công suất lớn. Việc dùng contactor giúp cách ly mạch điều khiển dòng nhỏ (an toàn cho vi xử lý và công tắc) khỏi mạch động lực mang dòng điện hàng chục ampe.",
          "Rơ-le nhiệt (Thermal Overload Relay) được mắc nối tiếp ngay sau contactor. Bên trong là các thanh lưỡng kim (Bimetal) quấn dây điện trở phát nhiệt. Khi động cơ máy nén bị quá tải kéo dài, nhiệt lượng làm thanh lưỡng kim cong lại đẩy cơ cấu cơ khí ngắt tiếp điểm phụ NC 95-96, cắt điện cuộn hút contactor để cứu động cơ.",
        ],
        keyPoints: [
          "Tiếp điểm chính của Contactor dùng cho điều hòa phải là cấp chịu tải AC-3 (đóng ngắt động cơ rô-to lồng sóc).",
          "Dòng cài đặt trên rơ-le nhiệt: I_cài = (1.05 ~ 1.15) × I_đm của máy nén. Tuyệt đối không vặn kịch núm rơ-le nhiệt lên cực đại.",
          "Độ sụt áp qua tiếp điểm động lực của contactor khi mang đầy tải phải < 0.2V. Nếu sụt áp > 0.5V nghĩa là tiếp điểm bị rỗ, oxy hóa đánh lửa.",
        ],
      },
      {
        heading: "2. Rơ-le áp suất bảo vệ (Pressure Switches LP / HP) & Timer trễ 3 phút",
        paragraphs: [
          "Rơ-le áp suất thấp (LP Switch) giám sát áp suất đường hút. Khi hệ thống bị xì hết gas hoặc tắc ẩm van tiết lưu, áp suất tụt xuống dưới ngưỡng an toàn (thường là 25 - 30 PSI), tiếp điểm LP sẽ mở ra ngắt máy nén để tránh lốc chạy không tải dẫn đến nóng cháy cuộn dây và hút ẩm ngoài không khí vào.",
          "Rơ-le áp suất cao (HP Switch) giám sát đường đẩy. Khi quạt dàn nóng bị hỏng, dàn nóng bị bám bụi bẩn kín mít hoặc nạp thừa gas làm áp suất vọt lên trên 420 - 450 PSI, tiếp điểm HP mở lập tức để bảo vệ giàn ống và máy nén khỏi nguy cơ bục nổ.",
        ],
        keyPoints: [
          "Timer trễ 3 phút (Anti-short cycle timer) bắt buộc phải có để ngăn máy nén khởi động lại ngay sau khi vừa tắt điện, chờ áp suất cao và thấp cân bằng.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức cài đặt dòng chỉnh định rơ-le nhiệt (I_trip)",
        calculatesWhat: "Xác định giá trị dòng điện bảo vệ quá tải cần vặn trên núm xoay của rơ-le nhiệt.",
        whenToUse: "Áp dụng khi lắp đặt hoặc thay thế rơ-le nhiệt trong tủ điều khiển máy nén lạnh.",
        expression: "I_relay = (1.05 ~ 1.15) × I_đm",
        variables: [
          { symbol: "I_relay", name: "Dòng chỉnh định rơ-le nhiệt", unit: "A (Ampe)", description: "Vạch số trên núm vặn rơ-le nhiệt" },
          { symbol: "I_đm", name: "Dòng điện làm việc định mức của máy nén", unit: "A (Ampe)", description: "Ghi trên tem nhãn Nameplate máy nén (FLA / RLA)" },
        ],
        safeStandard: "Cài đúng hệ số 1.10 × I_đm. Nếu cài quá thấp lốc sẽ nhảy oan khi trời nóng; cài quá cao lốc sẽ cháy trước khi rơ-le kịp ngắt.",
        sampleCalculation: "Máy nén tủ đông 3 pha có dòng định mức I_đm = 7.2A. Dòng cài đặt rơ-le nhiệt: I_relay = 1.10 × 7.2 = 7.92A (vặn núm chỉ số 8.0A trên rơ-le).",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Đo cuộn hút Contactor và kiểm tra độ sụt áp tiếp điểm",
        action: "Đo nguội điện trở cuộn dây A1-A2 (phải đạt 200Ω - 800Ω tùy công suất coil). Cấp điện đóng contactor, vặn VOM thang AC 20V đo chênh áp giữa cọc L1-T1 khi máy đang chạy.",
        expectedResult: "Điện áp rơi qua tiếp điểm đo được < 0.1V AC. Tiếp điểm đóng dứt khoát không kêu rè rè.",
      },
      {
        step: 2,
        title: "Thử nghiệm cơ cấu ngắt bảo vệ rơ-le nhiệt",
        action: "Dùng que nhọn gạt nhẹ lẫy Test màu đỏ trên thân rơ-le nhiệt khi mạch đang có điện.",
        expectedResult: "Tiếp điểm 95-96 mở ra, cuộn hút contactor nhả ngay lập tức, đèn báo lỗi Trip (nối qua tiếp điểm 97-98) bật sáng.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Thấy rơ-le nhiệt nhảy liên tục bèn vặn núm xoay lên mức tối đa hoặc đấu tắt tiếp điểm 95-96.",
        consequence: "Động cơ máy nén bị mất pha hoặc kẹt cơ ăn dòng cao không được ngắt, cuộn dây bốc khói cháy đen chỉ sau 15 phút.",
        prevention: "Khi rơ-le nhiệt nhảy, phải dùng ampe kìm đo dòng thực tế tìm nguyên nhân (thiếu pha, kẹt cơ, hỏng tụ) trước khi reset.",
      },
    ],
  },

  "dl-105": {
    subjectId: "dl-105",
    diagramType: "COMPRESSOR_WIRING",
    coreTheory: [
      {
        heading: "1. Cấu tạo cuộn dây động cơ máy nén 1 pha (Mono)",
        paragraphs: [
          "Động cơ máy nén 1 pha truyền thống sử dụng stator gồm 2 cuộn dây đặt lệch nhau 90 độ trong không gian: Cuộn Chạy (Run winding - ký hiệu R) và Cuộn Đề (Start winding - ký hiệu S). Hai cuộn dây được nối chung một điểm bên trong lốc đưa ra ngoài thành Chân Chung (Common - ký hiệu C).",
          "Cuộn Chạy chịu dòng làm việc liên tục nên có tiết diện dây đồng lớn, số vòng dây ít -> Điện trở cuộn Chạy nhỏ (R_CR nhỏ, thường từ 1.5Ω đến 3.5Ω). Cuộn Đề chỉ làm nhiệm vụ tạo từ trường lệch pha để khởi động nên có tiết diện dây nhỏ, số vòng dây nhiều -> Điện trở cuộn Đề lớn hơn (R_CS lớn, thường từ 3.0Ω đến 6.0Ω).",
        ],
        keyPoints: [
          "Quy tắc vàng bất biến khi đo VOM: Điện trở giữa 2 chân R và S luôn bằng tổng điện trở của 2 cuộn: R_RS = R_CR + R_CS.",
          "Chân đối diện với cặp có điện trở lớn nhất chính là chân C (Chung).",
          "Cặp có điện trở nhỏ nhất tính từ chân C chính là chân R (Chạy). Cặp còn lại là chân S (Đề).",
        ],
      },
      {
        heading: "2. Mạch khởi động dùng tụ ngậm (Run Capacitor) và Rơ-le nhiệt Klixon",
        paragraphs: [
          "Máy nén điều hòa dân dụng hầu hết sử dụng phương pháp khởi động bằng tụ ngậm thường trực (PSC - Permanent Split Capacitor). Tụ ngậm có dung lượng từ 25µF đến 55µF (chịu áp 450V AC) được mắc nối tiếp vĩnh viễn với cuộn Đề (chân S) và cuộn Chạy (chân R).",
          "Rơ-le bảo vệ quá tải nhiệt (Klixon) được gắn áp chặt vào vỏ máy nén hoặc cọc chân C. Bên trong là một thanh lưỡng kim (Bimetal). Khi nhiệt độ máy nén vượt quá 105°C - 115°C hoặc dòng điện ăn quá cao, thanh lưỡng kim sẽ cong lại ngắt nguồn điện cấp vào chân C để cứu máy nén khỏi bị cháy om cuộn dây.",
        ],
        keyPoints: [
          "Tụ điện dùng lâu ngày bị khô dầu giảm trị số (ví dụ tụ 35µF bị giảm còn 12µF) sẽ làm máy nén không đủ mô-men khởi động, lốc chỉ rít 'ừ... ừ...' 3 giây rồi ngắt Klixon.",
          "Khi thay tụ mới: Bắt buộc phải thay đúng trị số dung lượng (±5%) và điện áp chịu đựng phải ≥ 450V AC.",
        ],
      },
    ],
    formulas: [
      {
        name: "Định luật tam giác điện trở cuộn dây máy nén 1 pha",
        calculatesWhat: "Xác định chính xác tuyệt đối 3 cọc cắm Chung (C) - Chạy (R) - Đề (S) khi lốc bị mất giắc hoặc mất ký hiệu.",
        whenToUse: "Dùng đồng hồ VOM đo nguội khi thay lốc mới hoặc kiểm tra lốc bị đứt cuộn dây.",
        expression: "R_RS = R_CR + R_CS (Cặp lớn nhất luôn là R-S, chân còn lại là C)",
        variables: [
          { symbol: "R_RS", name: "Điện trở giữa cọc Chạy và cọc Đề", unit: "Ω (Ohm)", description: "Giá trị điện trở lớn nhất vì là tổng 2 cuộn dây nối tiếp" },
          { symbol: "R_CR", name: "Điện trở cuộn Chạy", unit: "Ω", description: "Giá trị điện trở nhỏ nhất vì dây đồng to gánh dòng" },
          { symbol: "R_CS", name: "Điện trở cuộn Đề", unit: "Ω", description: "Giá trị điện trở trung bình (lớn hơn cuộn Chạy)" },
        ],
        safeStandard: "Nếu đo thấy R_CR + R_CS ≠ R_RS (sai lệch > 0.5Ω) -> Lốc bị chập vòng dây, sắp cháy!",
        sampleCalculation: "Đo lốc 1.5 HP: Cặp 1-2 = 2.0Ω; Cặp 1-3 = 4.5Ω; Cặp 2-3 = 6.5Ω. Cặp 2-3 lớn nhất (6.5Ω = 2.0 + 4.5) -> Chân 1 là C. Chân 2 có 2.0Ω (< 4.5Ω) nên Chân 2 là R. Chân 3 là S.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Đo điện trở cuộn dây và xác định chân",
        action: "Rút giắc cắm trên lốc ra. Dùng thang đo Rx1 của VOM kim hoặc thang Ohm VOM số đo 3 cặp chân.",
        expectedResult: "Cả 3 giá trị điện trở đều hiển thị rõ ràng và thỏa mãn R_RS = R_CR + R_CS.",
      },
      {
        step: 2,
        title: "Kiểm tra tụ ngậm bằng thang đo Capacitance",
        action: "Xả điện tụ bằng cách chập 2 cực qua điện trở. Dùng thang nF/µF của VOM số đo trực tiếp 2 chân tụ.",
        expectedResult: "Dung lượng đo được nằm trong dải sai số ghi trên thân tụ (ví dụ 35µF ± 5% -> 33.25µF ~ 36.75µF).",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Đấu nhầm dây nguồn cấp vào chân S thay vì chân R.",
        consequence: "Cuộn Đề phải chịu dòng làm việc liên tục của toàn bộ tải, cuộn dây bị bốc khói cháy đen chỉ sau 5 đến 10 phút vận hành.",
        prevention: "Luôn kiểm tra sơ đồ đấu dây dán trong nắp hộp điện dàn nóng trước khi cấp điện.",
      },
    ],
  },

  "dl-106": {
    subjectId: "dl-106",
    diagramType: "VACUUM_STATION",
    coreTheory: [
      {
        heading: "1. Tiêu chuẩn kỹ thuật hút chân không sâu < 500 Micron",
        paragraphs: [
          "Không khí xung quanh chứa 78% Nitơ, 21% Oxy và độ ẩm hơi nước. Khi lắp đặt đường ống điều hòa mới, lượng không khí và hơi ẩm này bị nhốt lại trong ống.",
          "Dầu bôi trơn máy nén thế hệ mới (dầu tổng hợp POE) có đặc tính háo nước cực mạnh. Khi hơi ẩm kết hợp với gas R32/R410A ở nhiệt độ cao tại đầu đẩy máy nén sẽ sinh ra Axit Flohydric (HF). Axit này ăn mòn lớp sơn men cách điện của cuộn dây stator làm cháy lốc chỉ sau 6 tháng đến 1 năm. Ngoài ra, nước đóng băng tại đầu van tiết lưu gây nghẹt ẩm hoàn toàn làm máy mất lạnh.",
        ],
        keyPoints: [
          "Quy chuẩn quốc tế bắt buộc phải hút chân không đạt độ sâu dưới 500 Micron (0.5 Torr / 0.067 kPa) bằng bơm chân không 2 cấp chuyên dụng.",
          "Sau khi hút đạt dưới 500 Micron, phải khóa van ngâm trong 15 phút (Vacuum Decay Test). Nếu áp suất tăng không quá 1000 Micron chứng tỏ hệ thống hoàn toàn kín khít và không còn hơi ẩm.",
          "Thao tác 'xả đuổi gas bằng tay' (dùng gas đuổi gió) là hành vi phá hoại thiết bị bị nghiêm cấm tuyệt đối theo tiêu chuẩn của Daikin, Panasonic, Mitsubishi.",
        ],
      },
      {
        heading: "2. Quy trình thử kín áp suất cao bằng khí Nitơ khô 35 bar",
        paragraphs: [
          "Trước khi hút chân không, đối với các công trình đi ống âm tường, bắt buộc phải thử kín bằng khí Nitơ khô (N2). Tuyệt đối không được nén thử bằng oxy (nguy cơ cháy nổ kinh hoàng) hoặc nén bằng máy nén khí thường (đưa hơi nước vào làm hỏng dầu POE).",
          "Quy trình nén Nitơ thử kín thực hiện qua 3 giai đoạn: Giai đoạn 1 nén 5 bar để phát hiện rò rỉ lớn; Giai đoạn 2 nén 15 bar; Giai đoạn 3 nâng lên áp suất thiết kế 35 bar (500 PSI) và ngâm áp trong 24 giờ có bù trừ biến thiên nhiệt độ môi trường.",
        ],
        keyPoints: [
          "Đồng hồ Micron điện tử phải cắm trực tiếp vào van dịch vụ hoặc cổng T, không cắm qua bơm chân không.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức hiệu chỉnh biến thiên áp suất Nitơ theo nhiệt độ",
        calculatesWhat: "Tính độ tăng giảm áp suất tự nhiên của khí Nitơ trong đường ống khi nhiệt độ ngày và đêm thay đổi trong bài thử áp 24h.",
        whenToUse: "Dùng để xác định áp suất giảm là do đường ống bị hở xì gas hay chỉ do trời trở lạnh về đêm.",
        expression: "P2 = P1 × (T2 + 273.15) / (T1 + 273.15)",
        variables: [
          { symbol: "P1", name: "Áp suất nạp ban đầu", unit: "bar / PSI", description: "Áp suất đọc trên đồng hồ lúc vừa nạp xong khí Nitơ" },
          { symbol: "T1", name: "Nhiệt độ môi trường lúc nạp", unit: "°C", description: "Nhiệt độ đo được cạnh đường ống lúc nạp" },
          { symbol: "P2", name: "Áp suất lý thuyết sau 24h", unit: "bar / PSI", description: "Áp suất kỳ vọng tương ứng nhiệt độ mới" },
          { symbol: "T2", name: "Nhiệt độ môi trường sau 24h", unit: "°C", description: "Nhiệt độ lúc kiểm tra nghiệm thu" },
        ],
        safeStandard: "Nếu áp suất đo thực tế thấp hơn giá trị P2 tính toán quá 0.5 bar -> Chắc chắn mối hàn hoặc đầu loe bị xì lỗ mọt!",
        sampleCalculation: "Nạp 35.0 bar lúc trưa nắng T1 = 35°C. Sáng hôm sau đo T2 = 25°C. P2 = 35.0 × (25 + 273.15) / (35 + 273.15) = 35.0 × 298.15 / 308.15 = 33.86 bar. Nếu đồng hồ chỉ đúng ~33.9 bar thì hệ thống kín 100%.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kết nối hệ thống hút chân không 2 cấp và đồng hồ Micron",
        action: "Nối dây xanh manifold vào van dịch vụ dàn nóng, dây vàng vào bơm chân không, đồng hồ Micron cắm trực tiếp trên cổng T của van.",
        expectedResult: "Bật bơm chạy 15-20 phút, chỉ số đồng hồ Micron giảm dần từ 20,000µ xuống dưới 500 Micron.",
      },
      {
        step: 2,
        title: "Thực hiện bài kiểm tra ngâm chân không (Decay Test)",
        action: "Khóa chặt van manifold, tắt bơm chân không. Bấm giữ đồng hồ Micron theo dõi trong 15 phút.",
        expectedResult: "Áp suất nhích nhẹ do dầu nhả gas rồi dừng ổn định dưới 1000 Micron. Không được tăng liên tục về khí quyển.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Xả đuổi gas bằng tay không dùng máy hút chân không.",
        consequence: "Không khí và độ ẩm bị nhốt lại trong ống biến thành axit ăn mòn cuộn dây lốc, nghẹt ẩm van tiết lưu, hãng từ chối bảo hành.",
        prevention: "Bắt buộc trang bị máy hút chân không 2 cấp và đồng hồ đo chân không điện tử trong cốp đồ nghề.",
      },
    ],
  },

  // =========================================================================
  // NĂM 2 - HỌC KỲ 3
  // =========================================================================
  "dl-201": {
    subjectId: "dl-201",
    diagramType: "COMPRESSOR_WIRING",
    coreTheory: [
      {
        heading: "1. Nguyên lý mạch xả đá tự động (Defrost Circuit) tủ lạnh No-Frost",
        paragraphs: [
          "Tủ lạnh quạt gió hoạt động liên tục sẽ tích tụ tuyết dày đặc trên cánh tản nhiệt của dàn bay hơi, cản trở lưu thông gió khiến ngăn mát mất lạnh hoàn toàn. Hệ thống xả đá tự động gồm 4 linh kiện mắc phối hợp: Timer xả đá cơ (Sankyo/Paragon), Sò lạnh (Bimetal Defrost Thermostat), Cầu chì nhiệt (Thermal Fuse 73°C) và Thanh sấy điện trở (Defrost Heater).",
          "Timer cơ quay theo chu kỳ: Chế độ làm lạnh (chân 1 nối chân 4, cấp điện lốc và quạt chạy liên tục 8 tiếng) -> Chế độ xả đá (chân 1 chuyển sang đóng chân 2, ngắt lốc, cấp điện cho thanh sấy nung nóng dàn bay hơi trong 15 - 25 phút).",
        ],
        keyPoints: [
          "Sò lạnh (Sensor âm) kẹp sát vào bầu hồi dàn lạnh: Tiếp điểm chỉ đóng khi nhiệt độ dàn đóng băng sâu ≤ -4°C, và tự động ngắt khi băng tan hết đạt +8°C.",
          "Cầu chì nhiệt (73°C) mắc nối tiếp trực tiếp với thanh điện trở: Khi sò lạnh bị dính tiếp điểm không chịu nhả, nhiệt độ lên tới 73°C cầu chì sẽ đứt vĩnh viễn để chống cháy tủ lạnh.",
          "Thanh sấy điện trở công suất 120W - 160W, điện trở đo nguội đạt R = 300Ω - 450Ω.",
        ],
      },
      {
        heading: "2. Kỹ thuật cân cáp (Capillary Tube) & An toàn Gas R600a (Isobutan)",
        paragraphs: [
          "Cân cáp là thao tác đo trở lực khí động của ống mao để đảm bảo gas sau khi qua cáp đạt đúng áp suất sôi yêu cầu tại dàn lạnh. Đo bằng cách cấp khí nén qua dàn ngưng và phin lọc, dùng đồng hồ đo áp suất tại đầu ra của cáp khi lốc nén đang chạy.",
          "Gas R600a là môi chất hydrocacbon thuộc nhóm dễ cháy nổ A3. Khi sửa chữa tủ lạnh chạy gas R600a, tuyệt đối không dùng đèn khò lửa để cắt ống đuôi nạp nếu chưa xả sạch gas.",
        ],
        keyPoints: [
          "Trở lực cáp tủ lạnh quạt gió dùng gas R134a: 65 - 75 PSI; Tủ đông: 85 - 95 PSI; Tủ lạnh Inverter R600a: 60 - 70 PSI.",
          "Nạp gas R600a bắt buộc nạp bằng cân điện tử định lượng chính xác từng gram (tủ gia đình chỉ chứa từ 35g đến 65g gas).",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính điện trở que sấy xả đá (Defrost Heater)",
        calculatesWhat: "Xác định giá trị điện trở chuẩn khi dùng đồng hồ VOM đo nguội kiểm tra que sấy còn sống hay đã cháy đứt.",
        whenToUse: "Dùng khi chẩn đoán ban bệnh tủ lạnh bị bó đá dàn lạnh, quạt gió kẹt kêu cành cạch.",
        expression: "R_sấy = U² / P",
        variables: [
          { symbol: "R_sấy", name: "Điện trở que sấy", unit: "Ω (Ohm)", description: "Điện trở đo được giữa 2 đầu dây giắc cắm sấy dàn lạnh" },
          { symbol: "U", name: "Điện áp danh định mạng điện", unit: "V", description: "Chuẩn 220V AC" },
          { symbol: "P", name: "Công suất tiêu thụ thanh sấy", unit: "W", description: "Thường từ 120W đến 160W ghi trên thân que sấy thủy tinh" },
        ],
        safeStandard: "R_sấy chuẩn: 300Ω - 450Ω. Nếu đo VOM kim không nhúc nhích (R = ∞) -> Que sấy đã đứt, phải thay que sấy mới.",
        sampleCalculation: "Que sấy thủy tinh tủ lạnh Hitachi ghi 220V - 140W. Điện trở lý thuyết: R = 220² / 140 = 48400 / 140 ≈ 345.7 Ω. Dùng VOM thang x10 đo thấy 345Ω là sấy còn hoàn hảo.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra 4 linh kiện mạch xả đá bằng đồng hồ VOM",
        action: "Đo thông mạch cầu chì nhiệt 73°C (phải 0Ω); đo điện trở que sấy (300-450Ω); đo sò lạnh (ở nhiệt độ phòng phải hở mạch ∞, nhúng vào cốc nước đá -5°C phải thông mạch 0Ω).",
        expectedResult: "Tất cả thông số đều đúng chuẩn; nếu cầu chì đứt (∞) hoặc que sấy đứt thì thay thế ngay.",
      },
      {
        step: 2,
        title: "Vặn thử cưỡng bức Timer xả đá",
        action: "Dùng tô vít 2 cạnh xoay núm vặn timer theo chiều kim đồng hồ từ từ cho đến khi nghe tiếng 'tách' lớn.",
        expectedResult: "Lốc máy nén ngắt điện ngay lập tức, mạch chuyển sang cấp điện cho thanh sấy dàn lạnh.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Thấy cầu chì nhiệt 73°C bị đứt bèn lấy sợi dây đồng đấu tắt bỏ qua cầu chì.",
        consequence: "Khi sò lạnh dính tiếp điểm không ngắt, que sấy nung đỏ liên tục làm chảy biến dạng máng nhựa và bốc cháy toàn bộ tủ lạnh.",
        prevention: "Bắt buộc thay cầu chì nhiệt mới đúng trị số 73°C và thay luôn sò lạnh đi kèm.",
      },
    ],
  },

  "dl-202": {
    subjectId: "dl-202",
    diagramType: "COPPER_FLARING",
    coreTheory: [
      {
        heading: "1. Tiêu chuẩn vị trí lắp đặt & Kỹ thuật bẫy dầu (Oil Trap)",
        paragraphs: [
          "Dầu bôi trơn máy nén luôn bị cuốn theo môi chất lạnh tuần hoàn trong đường ống. Khi dàn nóng được treo cao hơn dàn lạnh, gas dạng hơi đi từ dàn lạnh lên dàn nóng phải vượt qua lực hấp dẫn.",
          "Nếu đường ống thẳng đứng cao trên 3 mét mà không làm bẫy dầu, dầu bôi trơn sẽ bám vào thành ống chảy ngược xuống tích tụ dưới đáy dàn lạnh, không thể hồi về máy nén. Hậu quả là máy nén bị thiếu dầu gây bó kẹt cơ, mòn xước xi lanh và cháy động cơ chỉ sau vài tháng vận hành.",
        ],
        keyPoints: [
          "Quy chuẩn bẫy dầu: Khi dàn nóng đặt cao hơn dàn lạnh > 3m, bắt buộc phải uốn một bẫy dầu chữ P tại chân ống đứng (ngay đầu ra dàn lạnh), và cứ mỗi 5m chiều cao tăng thêm phải bố trí thêm 1 bẫy dầu.",
          "Độ dốc đường ống thoát nước ngưng: Bắt buộc dốc tối thiểu 1% (chênh lệch 1cm trên 1m chiều dài) về phía lỗ thoát để chống đọng nước sinh rêu mốc tràn máng.",
        ],
      },
      {
        heading: "2. Quy trình nạp gas lỏng theo cân định lượng điện tử",
        paragraphs: [
          "Mỗi model máy lạnh đều được nạp sẵn một lượng gas nhất định cho chiều dài đường ống tiêu chuẩn (thường Daikin là 10m, Panasonic là 7.5m). Nếu tuyến ống thi công thực tế dài hơn chiều dài tiêu chuẩn, bắt buộc phải nạp bổ sung thêm gas.",
          "Gas R32 và R410A phải được nạp ở THỂ LỎNG (Úp ngược bình gas nạp qua van manifold áp thấp) để đảm bảo đồng nhất thành phần phân tử.",
        ],
        keyPoints: [
          "Định mức nạp bổ sung: Máy 1.0 HP - 1.5 HP nạp bù 20g/m; Máy 2.0 HP - 2.5 HP nạp bù 30g/m cho mỗi mét ống vượt chuẩn.",
          "Tuyệt đối không xả gas lỏng ồ ạt vào cổng hút khi lốc đang chạy max tải tránh nguy cơ ngập dịch gãy van.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính khối lượng gas nạp bổ sung theo chiều dài ống",
        calculatesWhat: "Tính chính xác số gram gas lỏng cần nạp thêm khi đường ống thi công dài hơn tiêu chuẩn xuất xưởng của nhà máy.",
        whenToUse: "Dùng sau khi hút chân không xong, đặt bình gas lên cân điện tử để nạp đúng số lượng gram tính được.",
        expression: "M_nạp_thêm (gram) = (L_thực_tế - L_tiêu_chuẩn) × Định_mức_nạp_bù (g/m)",
        variables: [
          { symbol: "M_nạp_thêm", name: "Khối lượng gas cần nạp bù", unit: "gram (g)", description: "Số gram gas nạp thêm hiển thị trên cân điện tử" },
          { symbol: "L_thực_tế", name: "Tổng chiều dài đường ống lắp đặt", unit: "m (Mét)", description: "Đo thực tế dọc theo tuyến ống từ dàn lạnh đến dàn nóng" },
          { symbol: "L_tiêu_chuẩn", name: "Chiều dài ống nhà máy đã nạp sẵn", unit: "m (Mét)", description: "Ghi trong catalog (thường Daikin là 10m, Panasonic là 7.5m)" },
          { symbol: "Định mức nạp bù", name: "Lượng gas cần thêm trên mỗi mét ống", unit: "g/m", description: "Máy 1.0 - 1.5 HP thường là 20g/m; máy 2.0 - 2.5 HP thường là 30g/m" },
        ],
        safeStandard: "Tuyệt đối không nạp dư quá 10% lượng gas quy định vì sẽ làm tăng áp suất ngưng tụ gây quá tải máy nén.",
        sampleCalculation: "Lắp máy Daikin FTKC25 (ống tiêu chuẩn nhà máy 10m, nạp bù 20g/m). Tuyến ống dài 17 mét. Khối lượng nạp thêm: M = (17 - 10) × 20 = 7 × 20 = 140 gram gas R32. Đặt bình gas lên cân điện tử, bấm Tare về 0, mở van nạp lỏng cho cân nhảy về -140g thì khóa van.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Cân chỉnh thăng bằng giá treo dàn lạnh bằng thước thủy Nivo",
        action: "Đặt thước nivo lên lưng giá treo, căn chỉnh bọt nước vào chính giữa hoặc hơi dốc nhẹ 2mm về phía đường thoát nước.",
        expectedResult: "Dàn lạnh lắp lên không bị nghiêng ngược về phía hộp điện, nước ngưng chảy tự nhiên không đọng góc máng.",
      },
      {
        step: 2,
        title: "Uốn bẫy dầu chữ P trên đường ống đứng",
        action: "Dùng lò xo uốn ống hoặc vam uốn thủy lực uốn ống đồng thành hình cổ ngỗng chữ P tại điểm thấp nhất của ống đứng.",
        expectedResult: "Bán kính uốn cong R ≥ 3.5 lần đường kính ống, không bị móp méo tiết diện lòng ống.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Dàn nóng đặt cao hơn dàn lạnh 8 mét nhưng đi ống thẳng tuột không làm bẫy dầu.",
        consequence: "Toàn bộ dầu nhớt nằm kẹt dưới dàn lạnh, máy nén chạy khan dầu phát tiếng gầm rú rồi bó kẹt cơ vĩnh viễn.",
        prevention: "Bắt buộc uốn bẫy dầu chữ P mỗi 3-5m khi chênh cao dàn nóng lớn hơn 3m.",
      },
    ],
  },

  "dl-203": {
    subjectId: "dl-203",
    diagramType: "INVERTER_PWM",
    coreTheory: [
      {
        heading: "1. Linh kiện bán dẫn cốt lõi: Diode cầu, Optocoupler PC817 & Triac",
        paragraphs: [
          "Bo mạch điều hòa hiện đại kết hợp giữa phần cứng công suất và mạch điện tử logic. Khối nắn nguồn sử dụng cầu Diode (Bridge Rectifier) gồm 4 van bán dẫn biến đổi điện xoay chiều AC 220V thành điện một chiều gợn sóng có điện áp đỉnh V_peak = 220 × √2 ≈ 311V DC.",
          "Optocoupler (PC817) là linh kiện cách ly quang học gồm một LED hồng ngoại và một Phototransistor nằm trong cùng một vỏ IC 4 chân. Khi LED phát sáng, ánh sáng kích mở transistor dẫn điện. PC817 cho phép truyền tín hiệu điều khiển giữa vi xử lý (điện áp thấp 5V) và mạch công suất (điện áp cao 300V) mà hoàn toàn không có tiếp xúc điện cơ học, chống sốc điện bảo vệ vi xử lý.",
        ],
        keyPoints: [
          "Đo kiểm tra Diode cầu bằng thang Diode: Chiều thuận điện áp rơi 0.5V - 0.7V; Chiều nghịch kim không nhúc nhích (điện áp vô cùng).",
          "Triac (BTA16 / BCR1AM) đóng vai trò như công tắc điện tử xoay chiều, điều khiển góc mở pha để tăng giảm tốc độ quạt dàn lạnh êm dịu.",
          "IC ổn áp 7805 biến đổi nguồn 12V thành nguồn chuẩn 5.0V DC cấp nuôi vi điều khiển MCU.",
        ],
      },
      {
        heading: "2. Cảm biến nhiệt độ (Thermistor / Sensor) âm hệ số NTC",
        paragraphs: [
          "Các cảm biến trên điều hòa (Sensor phòng, Sensor đồng dàn lạnh, Sensor đầu đẩy máy nén) đều là điện trở nhiệt có hệ số nhiệt điện trở âm NTC (Negative Temperature Coefficient). Khi nhiệt độ tăng lên -> Trị số điện trở của sensor sẽ giảm xuống.",
          "Khi sensor bị tăng trị số hoặc đứt, vi xử lý nhận sai điện áp và báo lỗi (ví dụ lỗi F3 nhiệt độ đầu đẩy máy nén Daikin, lỗi H15 Panasonic).",
        ],
        keyPoints: [
          "Sensor phòng và sensor dàn Daikin ở nhiệt độ chuẩn 25°C có trị số 10kΩ hoặc 15kΩ (máy cơ Daikin 20kΩ). Sensor đầu đẩy máy nén thường là 200kΩ.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính điện áp một chiều sau chỉnh lưu cầu Diode và tụ lọc",
        calculatesWhat: "Xác định điện áp một chiều lý thuyết trên tụ lọc DC chính để kiểm tra cầu diode và tụ nguồn còn tốt hay hỏng.",
        whenToUse: "Dùng đồng hồ VOM thang DC 500V đo tại 2 chân tụ nguồn chính khi cắm điện kiểm tra nguồn bo mạch.",
        expression: "U_DC = U_AC × √2 ≈ U_AC × 1.414",
        variables: [
          { symbol: "U_DC", name: "Điện áp một chiều trên tụ lọc", unit: "V DC", description: "Điện áp đo được tại 2 cực (+) và (-) tụ lọc nguồn" },
          { symbol: "U_AC", name: "Điện áp xoay chiều lưới điện", unit: "V AC", description: "Đo tại cổng vào domino nguồn AC 220V" },
        ],
        safeStandard: "Điện lưới 220V AC -> Đo tụ nguồn phải đạt 308V - 315V DC. Nếu chỉ đo được ~200V DC -> Tụ nguồn bị khô giảm dung lượng hoặc đứt 1 nhánh diode cầu.",
        sampleCalculation: "Cấp điện lưới 225V AC, điện áp DC chuẩn trên tụ: U_DC = 225 × 1.414 = 318.15V DC. Đồng hồ đo được 317V DC chứng tỏ khối nắn nguồn hoạt động hoàn hảo.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Đo kiểm tra Optocoupler PC817 bằng thang đo Diode",
        action: "Que đỏ vào chân 1 (Anode), que đen vào chân 2 (Cathode) đo tiếp giáp LED; sau đó que đen vào chân 4 (Collector), que đỏ vào chân 3 (Emitter).",
        expectedResult: "Chân 1-2 sụt áp 1.15V - 1.25V; chân 3-4 phải hở mạch hoàn toàn (OL / vô cùng). Đảo que cả 2 cặp đều không được thông mạch.",
      },
      {
        step: 2,
        title: "Đo kiểm tra trị số Sensor nhiệt độ NTC",
        action: "Rút giắc cắm sensor, để thang đo 20kΩ hoặc 200kΩ đo 2 chân giắc sensor ở nhiệt độ phòng 25°C. Dùng ngón tay bóp ấm đầu cảm biến.",
        expectedResult: "Ở 25°C trị số đúng barem (ví dụ 10.2kΩ), khi lấy ngón tay bóp ấm đầu sensor thì trị số điện trở phải giảm dần đều đặn.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Thay nhầm Sensor có trị số không đúng barem của hãng (lấy sensor 5kΩ lắp cho máy Daikin chuẩn 15kΩ).",
        consequence: "Vi xử lý hiểu sai nhiệt độ phòng, máy nén chạy 3 phút là ngắt lạnh hoặc đóng tuyết dàn lạnh không chịu ngắt.",
        prevention: "Luôn tra cứu bảng trị số sensor chuẩn của từng hãng trước khi thay thế.",
      },
    ],
  },

  // =========================================================================
  // NĂM 2 - HỌC KỲ 4
  // =========================================================================
  "dl-204": {
    subjectId: "dl-204",
    diagramType: "INVERTER_PWM",
    coreTheory: [
      {
        heading: "1. Nguyên lý khối biến tần Inverter và Động cơ máy nén 3 pha BLDC",
        paragraphs: [
          "Điều hòa Inverter không dùng động cơ 1 pha thông thường mà sử dụng động cơ đồng bộ nam châm vĩnh cửu không chổi than 3 pha (BLDC Motor). Động cơ có 3 cuộn dây đối xứng hoàn toàn ký hiệu là U - V - W, có điện trở hoàn toàn bằng nhau (thường từ 0.6Ω đến 1.8Ω).",
          "Bo mạch công suất dàn nóng biến đổi điện lưới AC 220V qua cầu diode và mạch nâng áp PFC thành nguồn điện một chiều DC 300V - 380V. Sau đó, module công suất thông minh IPM (gồm 6 transistor công suất IGBT) sẽ băm xung điều chế độ rộng PWM theo thuật toán vi xử lý để tạo ra dòng điện xoay chiều 3 pha biến thiên tần số từ 15Hz đến 120Hz, điều khiển tốc độ quay của máy nén linh hoạt theo tải nhiệt của phòng.",
        ],
        keyPoints: [
          "Đo 3 cuộn dây máy nén Inverter: R_UV = R_VW = R_WU (sai lệch không được vượt quá 0.05Ω).",
          "Tụ nguồn DC Bus công suất lớn (450V - 1000µF) duy trì điện áp nguy hiểm trong ít nhất 3 phút sau khi ngắt điện.",
        ],
      },
      {
        heading: "2. Mạch nâng áp chủ động Active PFC & Bảo vệ quá dòng OCP",
        paragraphs: [
          "Mạch nâng áp chủ động (Active Power Factor Correction) gồm cuộn cảm Reactor cỡ lớn, van công suất IGBT PFC và diode siêu nhanh Fast Recovery Diode. Mạch kéo dòng điện trùng pha với điện áp để nâng hệ số công suất cosφ lên tới 0.98, đồng thời đẩy điện áp DC Bus từ 310V lên 380V DC khi máy nén tăng tốc kéo tải nặng.",
          "Mạch bảo vệ quá dòng (Over Current Protection - OCP) sử dụng điện trở Shunt công suất cực nhỏ (0.01Ω - 0.05Ω) mắc nối tiếp ở cực âm nguồn cấp cho IPM. Khi máy nén bị kẹt cơ ăn dòng quá cao, điện áp rơi trên trở shunt tăng vọt kích hoạt mạch ngắt xung PWM tức thì để cứu chết cháy dàn IGBT.",
        ],
        keyPoints: [
          "Khi mạch PFC hoạt động: Đo điện áp trên tụ DC Bus phải vọt lên 360V - 385V DC. Nếu điện áp chỉ đứng ở 310V nghĩa là mạch PFC chưa kích hoạt.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính điện áp một chiều DC Bus trên tụ nguồn",
        calculatesWhat: "Xác định điện áp DC danh định sau chỉnh lưu cầu Diode và mạch nâng áp PFC để kiểm tra nguồn nuôi IC công suất.",
        whenToUse: "Dùng thang đo DC 500V đo tại 2 chân tụ nguồn chính khi kiểm tra lốc không chạy hoặc báo lỗi mất nguồn DC.",
        expression: "V_DC = V_AC × √2 ≈ 220 × 1.414 = 311V DC (Khi chưa có tải PFC)",
        variables: [
          { symbol: "V_DC", name: "Điện áp một chiều trên tụ lọc", unit: "V DC (Volt một chiều)", description: "Đo trực tiếp trên 2 cực (+) và (-) của tụ lọc nguồn to nhất bo mạch" },
          { symbol: "V_AC", name: "Điện áp xoay chiều lưới điện", unit: "V AC", description: "Đo tại chân 1 và chân 2 domino cấp nguồn" },
          { symbol: "PFC Boost", name: "Điện áp khi mạch PFC hoạt động", unit: "360V ~ 390V DC", description: "Khi máy nén tăng tốc, cuộn reactor và IGBT nâng áp sẽ kéo điện áp lên ~380V DC" },
        ],
        safeStandard: "Bình thường: 300V - 320V DC (khi nghỉ) và 360V - 380V DC (khi lốc chạy tải nặng). Nếu tụ chỉ có 200V DC -> Đứt cầu diode hoặc hỏng tụ lọc.",
        sampleCalculation: "Cấp điện lưới 220V AC, đo 2 chân tụ chính hiển thị 312V DC là cầu nắn và tụ nạp tốt. Khi lốc khởi động rít lên, đồng hồ vọt lên 378V DC chứng tỏ khối PFC hoạt động hoàn hảo.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Xả điện tích tụ nguồn DC Bus 300V an toàn",
        action: "Ngắt cầu dao điện. Dùng bóng đèn sợi đốt 220V/60W có hàn 2 dây kẹp cá sấu kẹp vào 2 cực (+) và (-) của tụ nguồn trong 5 giây cho đến khi bóng đèn tắt hẳn.",
        expectedResult: "Điện áp trên tụ tụt về 0V DC, tuyệt đối an toàn để cầm tay vào bo mạch.",
      },
      {
        step: 2,
        title: "Đo nguội 6 van bán dẫn IGBT trong module IPM",
        action: "Vặn VOM sang thang đo Diode. Que đỏ kẹp cực âm (-) tụ nguồn, que đen đo lần lượt 3 cọc U-V-W; sau đó que đen kẹp cực dương (+) tụ nguồn, que đỏ đo lần lượt 3 cọc U-V-W.",
        expectedResult: "Cả 6 phép đo đều phải hiển thị sụt áp diode đồng đều từ 0.42V đến 0.58V. Nếu có 1 chân thông mạch 0V -> IPM đã chập thủng van!",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Dùng tua vít chập tắt 2 chân tụ DC 300V để xả điện.",
        consequence: "Nổ tia lửa điện cực mạnh làm bay đứt đường mạch in, mẻ lưỡi tua vít và làm sốc chết vi xử lý.",
        prevention: "Bắt buộc dùng bóng đèn sợi đốt tải xả hoặc điện trở sứ 5kΩ / 10W để xả tụ êm dịu.",
      },
    ],
  },

  "dl-205": {
    subjectId: "dl-205",
    diagramType: "INVERTER_PWM",
    coreTheory: [
      {
        heading: "1. Nguyên lý truyền thông nối tiếp Serial Data 3 dây (Dây 1 - 2 - 3)",
        paragraphs: [
          "Điều hòa Inverter gồm 2 khối vi điều khiển độc lập: MCU dàn lạnh (quản lý nhiệt độ phòng, mắt nhận hồng ngoại remote, quạt gió) và MCU dàn nóng (quản lý biến tần IPM, quạt tản nhiệt, van tiết lưu EEV, máy nén). Hai vi xử lý liên tục trao đổi dữ liệu nối tiếp bán song công (Half-Duplex) qua 1 sợi dây Data duy nhất (Dây số 3).",
          "Dây số 2 (Trung tính N) được dùng làm mốc điện thế quy chiếu chung (0V). Để cách ly điện áp cao 300V ngoài dàn nóng không truyền vào làm cháy bo dàn lạnh, đường truyền được cách ly quang qua 4 linh kiện Optocoupler (2 opto thu/phát dàn lạnh và 2 opto thu/phát dàn nóng).",
        ],
        keyPoints: [
          "Điện áp đo được giữa chân 2 (N) và chân 3 (Data) trên thang đo DC 50V là một chuỗi xung dao động nhịp nhàng từ 15V đến 55V DC.",
          "Chu kỳ dao động: Dàn lạnh gửi gói tin hỏi (khoảng 0.5s) -> Dàn nóng gửi gói tin phản hồi trạng thái (khoảng 0.5s).",
        ],
      },
      {
        heading: "2. Phương pháp đo kiểm cô lập lỗi U4 (Daikin) & H11 (Panasonic) trong 60 giây",
        paragraphs: [
          "Khi mất kết nối dữ liệu sau 3 phút, điều hòa Daikin báo lỗi U4, Panasonic báo H11, Casper báo E7. Nguyên nhân có thể do đứt dây kết nối, hỏng nguồn cấp trước bo dàn nóng, hỏng opto phát hoặc chết cổng vi điều khiển.",
          "Quy trình cô lập: Dùng đồng hồ VOM kim cơ thang DC 50V đo trực tiếp chân 2 và chân 3 tại domino dàn lạnh:",
        ],
        keyPoints: [
          "Nếu kim đứng im ở 0V DC: Đứt dây tín hiệu số 3, hoặc hỏng nguồn cấp trước ở bo dàn lạnh.",
          "Nếu kim treo cứng ở mức +48V ~ +50V DC không nhúc nhích: Bo dàn nóng không phát xung trả lời (hỏng MCU dàn nóng, hỏng opto phát hoặc chưa có nguồn cấp ra dàn nóng).",
          "Nếu kim dao động nhịp nhàng 15V - 55V: Mạch giao tiếp hoàn hảo.",
        ],
      },
    ],
    formulas: [
      {
        name: "Điện áp xung nhịp danh định mạch giao tiếp Serial Data",
        calculatesWhat: "Biên độ dao động điện áp một chiều chuẩn giữa chân 2 (Neutral) và chân 3 (Data) của điều hòa Inverter.",
        whenToUse: "Dùng đồng hồ kim cơ thang DC 50V kẹp que đo vào chân 2-3 tại domino dàn lạnh để chẩn đoán lỗi U4/H11.",
        expression: "V_min (15V DC) ≤ V_đo (chân 2 - 3) ≤ V_max (55V DC) [Dao động nhịp]",
        variables: [
          { symbol: "V_min", name: "Mức điện áp đáy xung", unit: "V DC", description: "Điện áp khi Optocoupler dẫn dòng kéo áp xuống" },
          { symbol: "V_max", name: "Mức điện áp đỉnh xung", unit: "V DC", description: "Điện áp treo nguồn khi Optocoupler ngắt dòng" },
        ],
        safeStandard: "Kim đồng hồ VOM kim cơ phải vẩy nhịp liên tục đều đặn trong dải 15V - 55V DC. Kim đứng yên ở bất kỳ giá trị nào đều là lỗi!",
        sampleCalculation: "Kẹp que đen vào chân 2, que đỏ vào chân 3. Kim đồng hồ vẩy nhịp 22V -> 45V -> 22V -> 45V đều đặn nhịp nhàng theo chu kỳ 1 giây -> Mạch giao tiếp 100% tốt.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Đo kiểm tra điện áp chân 2 và chân 3 bằng đồng hồ VOM kim",
        action: "Vặn VOM kim về thang DC 50V. Que đen kẹp chặt ốc domino chân 2 (N), que đỏ chấm vào chân 3 (Data).",
        expectedResult: "Kim vẩy nhịp nhàng liên tục từ 15V đến 48V DC. Nếu kim đứng im ở 0V hoặc 50V thì chuyển sang bước 2.",
      },
      {
        step: 2,
        title: "Cô lập bo mạch dàn nóng hay bo dàn lạnh bị hỏng",
        action: "Tháo rời dây số 3 ở cầu đấu dàn nóng ra. Đo lại tại cầu đấu dàn lạnh: nếu có áp nhịp thì hỏng dây hoặc hỏng dàn nóng; nếu vẫn 0V thì lỗi do bo dàn lạnh.",
        expectedResult: "Xác định chính xác bo mạch cần sửa chữa trong vòng 60 giây ngoài hiện trường.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Dùng đồng hồ số điện tử (Digital Multimeter) để đo chân Data 2-3.",
        consequence: "Đồng hồ số có tốc độ lấy mẫu chậm nên màn hình nhảy số loạn xạ không đọc được, kết luận sai thành hỏng bo mạch.",
        prevention: "Bắt buộc dùng đồng hồ VOM kim cơ có quán tính kim để nhìn độ vẩy nhịp của xung Data.",
      },
    ],
  },

  "dl-206": {
    subjectId: "dl-206",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Cấu tạo & Nguyên lý Điều hòa Cassette âm trần & Giấu trần nối ống gió",
        paragraphs: [
          "Điều hòa thương mại SkyAir âm trần Cassette 4 hướng thổi hoặc giấu trần nối ống gió được thiết kế lắp chìm trên trần thạch cao, phân phối gió lạnh đồng đều cho các không gian lớn như văn phòng, nhà hàng, biệt thự.",
          "Hệ thống đòi hỏi độ chính xác cơ khí rất cao: Cân chỉnh 4 thanh ti ren treo máy đúng thăng bằng tuyệt đối để mặt nạ Panel ôm khít trần; bố trí hộp gom gió (Plenum Box), ống gió mềm cách nhiệt và miệng gió khuếch tán (Diffuser) có cánh hướng dòng.",
        ],
        keyPoints: [
          "Bơm nước ngưng tự động (Drain Pump): Cột áp bơm nâng cao từ 700mm đến 850mm tính từ đáy dàn lạnh.",
          "Công tắc phao chống tràn (Float Switch): Tự động ngắt lốc và báo lỗi A3 (Daikin) khi nước ngưng dâng cao quá 25mm do tắc ống thoát.",
        ],
      },
      {
        heading: "2. Van tiết lưu điện tử EEV (Electronic Expansion Valve)",
        paragraphs: [
          "Khác với ống mao cố định trên máy treo tường, máy SkyAir và Multi sử dụng van tiết lưu điện tử EEV. EEV được dẫn động bởi một động cơ bước (Stepper Motor) 4 pha, vi điều khiển có thể điều chỉnh độ mở van từ 0 đến 480 xung (pulses) với độ mịn từng micro-mét.",
          "Nhờ đó, hệ thống luôn duy trì độ quá nhiệt Superheat chuẩn xác 5°C tại mọi mức tải nhiệt, giúp máy tiết kiệm điện tối đa và không bao giờ bị ngập lỏng.",
        ],
        keyPoints: [
          "Đo cuộn dây van EEV: Gồm 5 hoặc 6 dây, điện trở giữa dây chung COM và 4 cuộn pha đạt 46Ω ± 3Ω.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức kiểm tra điện trở cuộn dây van tiết lưu điện tử EEV",
        calculatesWhat: "Xác định cuộn coil động cơ bước của van EEV còn sống hay đã bị cháy đứt, chập vòng.",
        whenToUse: "Dùng khi máy báo lỗi tiết lưu (Daikin lỗi A9, E9) hoặc máy mất lạnh, áp suất hút tụt sâu về chân không do kẹt van EEV.",
        expression: "R(COM - Pha A) = R(COM - Pha B) = R(COM - Pha C) = R(COM - Pha D) ≈ 46Ω ± 3Ω",
        variables: [
          { symbol: "R(COM-Pha)", name: "Điện trở cuộn dây pha", unit: "Ω (Ohm)", description: "Đo giữa chân nguồn chung COM (thường dây Đỏ/Xám) với các chân cuộn pha" },
          { symbol: "Tolerence", name: "Dung sai cho phép", unit: "± 3Ω", description: "Bốn cuộn pha phải có giá trị hoàn toàn bằng nhau" },
        ],
        safeStandard: "Điện trở chuẩn: 43Ω - 49Ω. Nếu đo thấy điện trở = ∞ (đứt) hoặc < 10Ω (chập) -> Phải thay thế cụm cuộn coil EEV mới.",
        sampleCalculation: "Rút giắc EEV 5 dây (Đỏ - Cam - Vàng - Hồng - Xanh). Que đen kẹp dây Đỏ (COM), que đỏ đo lần lượt 4 dây còn lại đều hiển thị 46.2Ω -> Cuộn coil EEV tốt 100%.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra hoạt động bơm nước ngưng và phao báo tràn",
        action: "Đổ từ từ 1 lít nước vào máng nước ngưng dàn lạnh. Quan sát bơm nước ngưng khởi động đẩy nước lên ống thoát.",
        expectedResult: "Bơm chạy êm, nước thoát nhanh. Nâng phao nước bằng tay -> Sau 5 giây máy phải ngắt lốc và nhấp nháy đèn báo lỗi A3.",
      },
      {
        step: 2,
        title: "Đo kiểm tra xung kích mở van EEV",
        action: "Cắm que đo VOM kim vào giắc van EEV lúc vừa bật máy. Vi xử lý sẽ phát chuỗi xung quay kim để định vị điểm 0 của van.",
        expectedResult: "Kim vẩy nhịp liên tục và nghe tiếng van EEV tạch tạch nhỏ bên trong là van hoạt động bình thường.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Nâng đường ống thoát nước ngưng vượt quá cột áp 850mm của bơm hoặc không làm bẫy dốc sau điểm nâng.",
        consequence: "Nước ngưng dội ngược lại tràn qua miệng máng, nhỏ nước làm ố vàng sập trần thạch cao đắt tiền của khách hàng.",
        prevention: "Sau khi nâng cao tối đa 700mm, phải tạo ngay độ dốc xuôi 1/100 thoát tự nhiên về trục đứng.",
      },
    ],
  },

  // =========================================================================
  // NĂM 3 - HỌC KỲ 5
  // =========================================================================
  "dl-301": {
    subjectId: "dl-301",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Nguyên lý Hệ thống Điều hòa Trung tâm VRV / VRF",
        paragraphs: [
          "Hệ thống VRV (Variable Refrigerant Volume - Daikin) / VRF (Variable Refrigerant Flow - Mitsubishi) là đỉnh cao công nghệ điều hòa không khí: Một cụm dàn nóng công suất lớn (lên tới 60 HP) kết nối với hàng chục dàn lạnh thuộc các phòng khác nhau qua một mạng lưới đường ống gas chung.",
          "Hệ thống sử dụng các bộ chia gas Refnet Joint và Refnet Header có cấu tạo khí động học đặc biệt để phân tách dòng môi chất lỏng và hơi đồng đều về từng dàn lạnh mà không gây sụt áp.",
        ],
        keyPoints: [
          "Quy chuẩn lắp đặt Refnet Joint: Bắt buộc phải nằm trên mặt phẳng ngang hoàn toàn (độ nghiêng không quá ±15°) hoặc nằm thẳng đứng hoàn toàn, không được đặt nghiêng vẹo.",
          "Chiều dài đường ống cho phép: Từ dàn nóng đến dàn lạnh xa nhất có thể lên tới 165 mét, tổng chiều dài mạng ống lên tới 1000 mét.",
          "Chênh lệch cao độ dàn nóng và dàn lạnh cho phép lên tới 50 mét (dàn nóng đặt trên nóc tòa nhà cao tầng).",
        ],
      },
      {
        heading: "2. Chu trình tự động hồi dầu (Oil Return Operation) & Đường truyền F1-F2",
        paragraphs: [
          "Do mạng lưới đường ống VRV quá dài, khi các dàn lạnh chạy ở công suất thấp, vận tốc gas trong ống giảm khiến dầu bôi trơn đọng lại trong các dàn lạnh. Cứ sau mỗi 2 đến 3 giờ, hệ thống sẽ tự động kích hoạt chế độ Hồi dầu (Oil Return Mode): mở rộng toàn bộ van EEV và tăng tốc máy nén trong 3 - 5 phút để cuốn toàn bộ dầu về bình tách dầu dàn nóng.",
          "Mạng truyền thông điều khiển sử dụng cặp dây F1 - F2 có vỏ bọc chống nhiễu (Shielded Twisted Pair), điện áp tín hiệu dao động 16V DC.",
        ],
        keyPoints: [
          "Bắt buộc nén Nitơ thử áp lực mạng ống VRV theo 3 bước: 5 bar -> 15 bar -> 38 bar (3.8 MPa) ngâm trong 24 giờ trước khi hút chân không.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính lượng gas R410A nạp bổ sung cho hệ thống trung tâm VRV",
        calculatesWhat: "Tính toán tổng khối lượng gas cần nạp thêm bằng phần mềm Daikin Service Checker dựa trên chiều dài từng cỡ ống lỏng thực tế.",
        whenToUse: "Áp dụng sau khi thi công xong toàn bộ mạng ống đồng và hút chân không sâu của hệ VRV.",
        expression: "R_total (kg) = Σ [L_i (m) × K_i (kg/m)]",
        variables: [
          { symbol: "L_i", name: "Chiều dài thực tế ống lỏng cỡ i", unit: "m (Mét)", description: "Đo đạc từ bản vẽ hoàn công As-built" },
          { symbol: "K_i", name: "Hệ số nạp gas cho ống lỏng cỡ i", unit: "kg/m", description: "Ống Ø6.35: 0.022 kg/m | Ø9.52: 0.057 kg/m | Ø12.7: 0.110 kg/m | Ø15.88: 0.170 kg/m" },
        ],
        safeStandard: "Nạp đúng 100% bằng cân điện tử công nghiệp. Nghiêm cấm tuyệt đối nạp gas theo ước lượng áp suất.",
        sampleCalculation: "Công trình có 45m ống Ø9.52 (K=0.057) và 30m ống Ø12.7 (K=0.110). Lượng gas nạp thêm: R = (45 × 0.057) + (30 × 0.110) = 2.565 + 3.300 = 5.865 kg gas R410A.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra độ cân bằng của bộ chia gas Refnet",
        action: "Dùng thước thủy nivo đặt lên thân bộ chia Refnet kiểm tra góc nghiêng theo cả 2 phương.",
        expectedResult: "Bộ chia nằm hoàn toàn thăng bằng trên mặt phẳng ngang, góc lệch không quá ±15 độ.",
      },
      {
        step: 2,
        title: "Thử áp lực đường ống bằng khí Nitơ mức 38 bar (3.8 MPa)",
        action: "Dùng bình khí Nitơ qua van giảm áp cao áp nạp vào cả đường lỏng và đường hơi lên 38 bar, ngâm đồng hồ trong 24h.",
        expectedResult: "Sau 24 giờ áp suất không đổi (có tính bù trừ nhiệt độ môi trường), chứng minh hàng trăm mối hàn đều kín tuyệt đối.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Lắp bộ chia gas Refnet bị nghiêng chúc đầu xuống hoặc vặn xoắn lệch phương.",
        consequence: "Gas lỏng bị dồn hết về một nhánh khiến nhánh đó quá lạnh ngập dịch, các nhánh còn lại đói gas mất lạnh hoàn toàn.",
        prevention: "Bắt buộc dùng giá treo cố định vững chắc bộ chia Refnet đúng thăng bằng trước khi hàn nối ống.",
      },
    ],
  },

  "dl-302": {
    subjectId: "dl-302",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Nguyên lý Hệ thống Kho lạnh Bảo quản Công nghiệp",
        paragraphs: [
          "Kho lạnh công nghiệp phục vụ bảo quản thực phẩm, nông sản, dược phẩm ở các dải nhiệt độ: Kho mát (+2°C đến +8°C), Kho đông (-18°C đến -25°C), và Hầm cấp đông nhanh (-35°C đến -40°C). Hệ thống sử dụng máy nén bán kín (Semi-hermetic Compressor) hoặc máy nén trục vít (Screw Compressor) có công suất nhiệt hàng chục kilowatt.",
          "Để bảo vệ máy nén khỏi sự cố dầu và ngập lỏng, hệ thống bắt buộc trang bị cụm thiết bị an toàn chu trình công nghiệp: Bình tách dầu (Oil Separator) có phao hồi dầu về đáy cacte; Bình chứa cao áp (Liquid Receiver) chứa toàn bộ lượng gas khi thu hồi; và Bình tách lỏng (Suction Accumulator) ngăn giọt lỏng tràn vào buồng nén.",
        ],
        keyPoints: [
          "Van tiết lưu nhiệt cân bằng ngoài (Externally Equalized TEV): Bắt buộc sử dụng khi dàn bay hơi có trở lực lớn để đo đúng áp suất đầu ra dàn lạnh.",
          "Xả đá bằng gas nóng (Hot Gas Defrost): Dẫn gas nóng áp cao trực tiếp vào dàn lạnh để xả đá từ bên trong ra ngoài, rút ngắn thời gian xả đá từ 45 phút xuống 12 phút.",
        ],
      },
      {
        heading: "2. Cân chỉnh quá nhiệt Van tiết lưu nhiệt TEV bằng vít chỉnh lò xo",
        paragraphs: [
          "Van tiết lưu nhiệt TEV có một màng kim loại co giãn nhận lực từ 3 phía: Áp suất bầu cảm nhiệt (P_bầu mở van), Áp suất bay hơi (P_hút đóng van) và Lực đàn hồi lò xo (P_lò_xo đóng van).",
          "Kỹ thuật viên cân chỉnh độ quá nhiệt bằng cách xoay vít chỉnh lò xo: Xoay thuận chiều kim đồng hồ làm nén lò xo -> Tăng độ quá nhiệt (giảm lưu lượng gas); Xoay ngược chiều kim đồng hồ làm nới lò xo -> Giảm độ quá nhiệt (tăng lưu lượng gas). Mỗi lần chỉnh chỉ được xoay 1/4 vòng và chờ hệ thống ổn định trong 20 phút.",
        ],
        keyPoints: [
          "Bầu cảm nhiệt TEV phải kẹp tại đoạn ống ngang đầu ra dàn lạnh (vị trí 2 giờ hoặc 10 giờ) và bọc cách nhiệt kín tuyệt đối.",
        ],
      },
    ],
    formulas: [
      {
        name: "Phương trình cân bằng lực của màng Van tiết lưu nhiệt TEV",
        calculatesWhat: "Xác định cơ chế đóng mở van TEV dựa trên sự cân bằng giữa áp suất bầu cảm nhiệt và lực lò xo.",
        whenToUse: "Dùng để cân chỉnh vít lò xo van tiết lưu nhiệt cho kho lạnh đạt độ quá nhiệt chuẩn 6°C.",
        expression: "P_bầu = P_bay_hơi + P_lò_xo",
        variables: [
          { symbol: "P_bầu", name: "Áp suất môi chất trong bầu cảm nhiệt", unit: "bar / PSI", description: "Tỷ lệ thuận với nhiệt độ kẹp đầu ra dàn lạnh" },
          { symbol: "P_bay_hơi", name: "Áp suất đường hút đầu ra dàn lạnh", unit: "bar / PSI", description: "Áp suất bay hơi môi chất trong dàn lạnh" },
          { symbol: "P_lò_xo", name: "Lực ép của lò xo van", unit: "bar / PSI", description: "Điều chỉnh được bằng vít xoay dưới đáy van TEV" },
        ],
        safeStandard: "Độ quá nhiệt SH cài đặt chuẩn cho kho lạnh: 5°C - 8°C. Không để SH < 3°C vì kho âm rất dễ ngập dịch làm nát lốc!",
        sampleCalculation: "Kho đông R404A chạy ở -20°C (P_bay hơi = 2.0 bar). Bầu cảm nhiệt đo được -14°C (tương ứng P_bầu = 2.6 bar). Độ quá nhiệt SH = -14 - (-20) = 6°C -> Màng van cân bằng mở đúng tỷ lệ.",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kẹp bầu cảm nhiệt van TEV đúng kỹ thuật",
        action: "Làm sạch bề mặt ống đồng ra dàn lạnh, kẹp bầu cảm nhiệt tại vị trí 2 giờ hoặc 10 giờ bằng đai inox, bọc xốp superlon kín.",
        expectedResult: "Bầu cảm nhiệt áp sát kim loại, đo chuẩn nhiệt độ hơi quá nhiệt, không bị ảnh hưởng bởi nhiệt độ không khí phòng lạnh.",
      },
      {
        step: 2,
        title: "Cân chỉnh vít quá nhiệt van TEV",
        action: "Vặn mở nắp đáy van TEV, dùng cờ lê xoay vít chỉnh 1/4 vòng thuận chiều kim đồng hồ để tăng độ quá nhiệt.",
        expectedResult: "Chờ 20 phút, độ quá nhiệt đo được tăng từ 3°C lên mức chuẩn 6°C, lốc không còn hiện tượng đổ mồ hôi đọng băng cacte.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Kẹp bầu cảm nhiệt van TEV ở đáy ống (vị trí 6 giờ).",
        consequence: "Dầu đọng ở đáy ống làm sai lệch nhiệt độ cảm biến, màng van luôn hiểu lầm là quá lạnh nên đóng nghẹt van làm máy mất lạnh.",
        prevention: "Bắt buộc kẹp bầu cảm nhiệt ở vị trí 2 giờ hoặc 10 giờ trên mặt cắt ống đồng.",
      },
    ],
  },

  "dl-303": {
    subjectId: "dl-303",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Nguyên lý Hệ thống Máy làm lạnh nước Water Chiller & Tháp giải nhiệt Cooling Tower",
        paragraphs: [
          "Hệ thống Water Chiller là trung tâm làm mát của các tòa nhà cao ốc, trung tâm thương mại và nhà máy bán dẫn. Máy Chiller sử dụng máy nén trục vít hoặc ly tâm để làm lạnh nước tuần hoàn (Chilled Water) từ 12°C xuống 7°C bên trong bình bay hơi ống chùm (Shell and Tube Evaporator).",
          "Nước lạnh 7°C được bơm vận chuyển đến các bộ xử lý không khí AHU và FCU trên các tầng để làm mát không gian. Nhiệt lượng hấp thu được đưa về bình ngưng tụ và thải ra môi trường qua Tháp giải nhiệt Cooling Tower bằng hiệu ứng bốc hơi nước cưỡng bức.",
        ],
        keyPoints: [
          "Thông số chuẩn chu trình nước lạnh: Nước cấp 7°C, nước hồi 12°C (ΔT = 5°C).",
          "Thông số chuẩn chu trình nước giải nhiệt tháp Cooling Tower: Nước vào tháp 37°C, nước ra khỏi tháp 32°C (ΔT = 5°C).",
          "Công tắc dòng chảy (Flow Switch): Bắt buộc đấu liên động bảo vệ. Nếu bơm nước dừng mà Chiller vẫn chạy, nước trong ống đồng sẽ đóng băng gây nứt vỡ bình bay hơi phá hủy toàn bộ hệ thống.",
        ],
      },
      {
        heading: "2. Xử lý nước chống cáu cặn ăn mòn & Hiệu suất năng lượng Chiller",
        paragraphs: [
          "Nước tháp giải nhiệt hở tiếp xúc với không khí nên liên tục bốc hơi, làm tăng nồng độ khoáng chất canxi, magie sinh ra cáu cặn bám trong lòng ống chùm bình ngưng. Chỉ 1mm cáu cặn bám trên ống đồng sẽ làm tăng điện năng tiêu thụ của máy nén lên tới 11%.",
          "Hệ thống đòi hỏi châm hóa chất ức chế cáu cặn định kỳ và xả đáy tự động (Auto Blowdown) duy trì độ dẫn điện TDS trong ngưỡng cho phép.",
        ],
        keyPoints: [
          "Chỉ số hiệu quả năng lượng Chiller: COP = Năng lượng lạnh sinh ra (kW) / Công suất điện tiêu thụ (kW) (Chiller hiện đại đạt COP ≥ 6.0).",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính công suất làm lạnh thực tế của cụm Water Chiller",
        calculatesWhat: "Tính công suất nhiệt lạnh sinh ra (kW lạnh hoặc Tấn lạnh RT) dựa trên lưu lượng nước và độ chênh nhiệt độ vào - ra.",
        whenToUse: "Dùng khi kiểm tra nghiệm thu T&C hoặc đánh giá suy giảm hiệu suất Chiller định kỳ.",
        expression: "Q_lạnh (kW) = G (m³/h) × 4.186 (kJ/kg.K) × ΔT (°C) / 3.6",
        variables: [
          { symbol: "Q_lạnh", name: "Công suất làm lạnh Chiller", unit: "kW (hoặc RT = kW / 3.517)", description: "Nhiệt lạnh thực tế cấp cho tòa nhà" },
          { symbol: "G", name: "Lưu lượng nước lạnh tuần hoàn", unit: "m³/h", description: "Đo bằng đồng hồ lưu lượng siêu âm kẹp ngoài ống" },
          { symbol: "ΔT", name: "Độ chênh nhiệt độ nước hồi và nước cấp", unit: "°C", description: "ΔT = T_hồi (12°C) - T_cấp (7°C) = 5°C" },
        ],
        safeStandard: "Độ chênh nhiệt độ thiết kế chuẩn: ΔT = 5.0°C. Nếu ΔT < 3.0°C chứng tỏ lưu lượng nước quá lớn hoặc AHU không tải.",
        sampleCalculation: "Cụm Chiller có lưu lượng bơm đo được G = 150 m³/h. Nhiệt độ nước hồi 12.2°C, nước cấp 7.2°C (ΔT = 5.0°C). Q = 150 × 4.186 × 5.0 / 3.6 = 872 kW lạnh (tương đương 872 / 3.517 ≈ 248 Tấn lạnh RT).",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra công tắc dòng chảy (Water Flow Switch)",
        action: "Khóa van cô lập bơm nước lạnh khi máy Chiller đang chạy thử không tải.",
        expectedResult: "Lá cản công tắc dòng chảy nhả ra ngay lập tức, tín hiệu liên động ngắt máy nén Chiller trong vòng 2 giây và kích hoạt chuông báo động.",
      },
      {
        step: 2,
        title: "Đo độ chênh áp qua bình ngưng tụ để đánh giá cáu cặn",
        action: "Dùng đồng hồ chênh áp đo áp lực nước vào và nước ra của bình ngưng tụ ống chùm.",
        expectedResult: "Độ sụt áp nằm trong barem nhà sản xuất (thường 0.4 - 0.6 bar). Nếu sụt áp tăng vọt chứng tỏ ống bị đóng cặn nghẹt.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Đấu tắt tiếp điểm công tắc dòng chảy Flow Switch khi công tắc bị kẹt báo lỗi.",
        consequence: "Khi bơm nước gặp sự cố mất nguồn, nước trong bình bay hơi đứng yên bị lốc làm đông đặc thành băng, nở bung nứt vỡ toàn bộ ống đồng, nước tràn vào lốc hỏng vĩnh viễn Chiller hàng tỷ đồng.",
        prevention: "Nghiêm cấm tuyệt đối việc đấu tắt Flow Switch. Phải tháo vệ sinh hoặc thay mới công tắc dòng chảy.",
      },
    ],
  },

  // =========================================================================
  // NĂM 3 - HỌC KỲ 6
  // =========================================================================
  "dl-304": {
    subjectId: "dl-304",
    diagramType: "REFRIGERATION_CYCLE",
    coreTheory: [
      {
        heading: "1. Nguyên lý Thiết kế Thông gió, Cấp khí tươi & Tính toán Tải nhiệt HVAC",
        paragraphs: [
          "Thiết kế HVAC là quá trình tính toán cân bằng nhiệt ẩm để duy trì môi trường vi khí hậu tiện nghi (Nhiệt độ 24°C ± 1°C, Độ ẩm tương đối 55% ± 5%) cho con người hoặc quy trình sản xuất công nghiệp.",
          "Tổng tải nhiệt của công trình gồm: Tải nhiệt truyền qua kết cấu bao che (tường, kính, mái); Tải bức xạ mặt trời qua kính; Tải nhiệt do người tỏa ra (nhiệt hiện và nhiệt ẩn); Tải nhiệt từ thiết bị chiếu sáng, máy tính; và Tải nhiệt do cấp khí tươi ngoài trời (Fresh Air).",
        ],
        keyPoints: [
          "Tiêu chuẩn cấp khí tươi theo TCVN 5687:2010: Văn phòng làm việc tối thiểu 25 - 30 m³/h/người để kiểm soát nồng độ CO2 dưới 1000 ppm.",
          "Hệ thống thông gió tạo áp cầu thang thoát hiểm (Stairwell Pressurization): Phải duy trì áp suất dương 20 - 50 Pa khi có hỏa hoạn để ngăn khói độc tràn vào lối thoát nạn.",
        ],
      },
      {
        heading: "2. Khí động học đường ống gió & Phương pháp ma sát đồng đều (Equal Friction)",
        paragraphs: [
          "Đường ống gió tôn mạ kẽm vận chuyển không khí từ AHU đến các miệng thổi khuếch tán. Để phân phối gió đồng đều và giảm tiếng ồn, kỹ sư thiết kế đường ống theo phương pháp tổn thất ma sát đồng đều (thường chọn tổn hao áp suất 0.8 đến 1.0 Pa trên mỗi mét dài ống gió).",
          "Vận tốc gió trong ống chính khu văn phòng khống chế ở mức 6 - 8 m/s, tại miệng thổi không vượt quá 2.0 - 2.5 m/s để tránh tiếng rít ồn gây khó chịu.",
        ],
        keyPoints: [
          "Bọc cách nhiệt bông thủy tinh hoặc cao su lưu hóa kín khít các mối ghép bích TDC/TDF chống đọng sương rỉ nước trần thạch cao.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức tính lưu lượng gió cấp cần thiết theo tải nhiệt hiện",
        calculatesWhat: "Xác định lưu lượng thể tích không khí (CFM hoặc m³/h) cần thổi vào phòng để triệt tiêu tải nhiệt hiện sinh ra.",
        whenToUse: "Dùng để chọn kích thước quạt dàn lạnh AHU, FCU và tính tiết diện đường ống gió.",
        expression: "CFM = Q_hiện (BTU/h) / [1.08 × (T_phòng - T_gió_cấp) (°F)]",
        variables: [
          { symbol: "CFM", name: "Lưu lượng không khí", unit: "CFM (ft³/min)", description: "1 CFM ≈ 1.7 m³/h" },
          { symbol: "Q_hiện", name: "Tải nhiệt hiện của không gian", unit: "BTU/h", description: "Tính toán từ phần mềm tải nhiệt HAP / Trace 700" },
          { symbol: "T_phòng", name: "Nhiệt độ thiết kế trong phòng", unit: "°F", description: "Chuẩn 24°C ≈ 75°F" },
          { symbol: "T_gió_cấp", name: "Nhiệt độ gió thổi ra từ miệng gió", unit: "°F", description: "Thường từ 13°C - 15°C ≈ 55°F - 59°F" },
        ],
        safeStandard: "Vận tốc miệng gió văn phòng: v ≤ 2.5 m/s để đạt độ ồn tiêu chuẩn NC 30 - 35.",
        sampleCalculation: "Phòng hội nghị có tải nhiệt hiện Q = 36,000 BTU/h. Nhiệt độ phòng 75°F, nhiệt độ gió cấp 55°F (chênh lệch ΔT = 20°F). CFM = 36,000 / (1.08 × 20) = 36,000 / 21.6 ≈ 1667 CFM (tương đương ~2830 m³/h).",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Đo kiểm tra lưu lượng gió miệng thổi bằng chụp Hood (Capture Hood)",
        action: "Áp chụp đo lưu lượng trùm kín miệng gió khuếch tán trần, bấm nút đo đọc chỉ số CFM trực tiếp.",
        expectedResult: "Lưu lượng đo được nằm trong dung sai ±10% so với bản vẽ thiết kế kỹ thuật.",
      },
      {
        step: 2,
        title: "Đo chênh áp cầu thang thoát hiểm bằng áp kế vi sai",
        action: "Đóng kín toàn bộ cửa thoát hiểm, bật quạt tạo áp cầu thang, đưa 2 đầu ống áp kế vào trong và ngoài cửa.",
        expectedResult: "Áp suất đo được duy trì ổn định từ 30 Pa đến 45 Pa theo đúng QCVN 06:2022/BXD.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Không bọc cách nhiệt bảo ôn hộp gió miệng cấp hoặc bọc hở mối nối đinh ghim.",
        consequence: "Không khí lạnh làm bề mặt ngoài miệng gió tụt dưới điểm sương, nhỏ nước tí tách làm mốc sập trần thạch cao.",
        prevention: "Bọc dán kín mối ghép bằng băng dính bạc có phủ keo chống lọt ẩm 100%.",
      },
    ],
  },

  "dl-305": {
    subjectId: "dl-305",
    diagramType: "ELECTRICAL_SAFETY",
    coreTheory: [
      {
        heading: "1. Nguyên lý Hệ thống Quản lý Tòa nhà Thông minh BMS & Tự động hóa HVAC",
        paragraphs: [
          "Hệ thống BMS (Building Management System) là bộ não điều hành tích hợp toàn bộ các hệ thống cơ điện trong tòa nhà: Chiller, AHU, quạt thông gió, bơm nước, chiếu sáng và báo cháy. BMS thu thập dữ liệu từ hàng nghìn cảm biến nhiệt độ, áp suất, độ ẩm, lưu lượng để điều khiển tối ưu hóa tiêu thụ năng lượng.",
          "Hạ tầng điều khiển sử dụng các bộ điều khiển khả trình DDC (Direct Digital Controller) kết nối với nhau qua mạng truyền thông công nghiệp chuẩn mở BACnet IP hoặc Modbus RTU RS-485.",
        ],
        keyPoints: [
          "Tín hiệu điều khiển chuẩn công nghiệp: Tín hiệu tương tự Analog Input/Output (4-20mA hoặc 0-10V DC); Tín hiệu số Digital Input/Output (tiếp điểm khô Dry Contact).",
          "Biến tần VFD (Variable Frequency Drive): Điều khiển tốc độ quay của quạt AHU và bơm nước Chiller theo tải thực tế.",
        ],
      },
      {
        heading: "2. Định luật đồng dạng quạt / bơm & Tiết kiệm năng lượng",
        paragraphs: [
          "Trong các hệ thống HVAC truyền thống, quạt và bơm chạy cố định 100% tốc độ, lưu lượng được điều chỉnh bằng van bướm hoặc cánh gió tiết lưu gây lãng phí năng lượng khủng khiếp.",
          "Theo định luật đồng dạng (Affinity Laws): Công suất tiêu thụ điện của bơm và quạt tỷ lệ với LẬP PHƯƠNG của tốc độ quay (P ~ n³). Khi tải nhiệt tòa nhà giảm 20%, biến tần giảm tốc độ động cơ xuống 80% thì công suất điện tiêu thụ giảm xuống còn (0.8)³ = 51.2% (tiết kiệm được tới gần 50% tiền điện!).",
        ],
        keyPoints: [
          "Hệ thống VAV (Variable Air Volume): Điều chỉnh lượng gió cấp vào từng phòng theo số lượng người thực tế bằng hộp gió VAV Box.",
        ],
      },
    ],
    formulas: [
      {
        name: "Định luật đồng dạng công suất tiêu thụ điện của quạt và bơm (Affinity Law)",
        calculatesWhat: "Tính toán mức tiết kiệm năng lượng điện khi dùng biến tần VFD giảm tốc độ động cơ quạt / bơm.",
        whenToUse: "Dùng để lập bài toán hoàn vốn kinh tế khi tư vấn lắp đặt biến tần cho hệ thống Chiller và AHU.",
        expression: "P2 / P1 = (n2 / n1)³",
        variables: [
          { symbol: "P1", name: "Công suất tiêu thụ ban đầu ở tốc độ 100%", unit: "kW", description: "Công suất động cơ chạy trực tiếp lưới điện" },
          { symbol: "P2", name: "Công suất tiêu thụ sau khi giảm tốc độ", unit: "kW", description: "Công suất đo được khi biến tần điều khiển" },
          { symbol: "n1", name: "Tốc độ quay danh định ban đầu (50Hz)", unit: "vòng/phút (rpm)", description: "Tốc độ 100%" },
          { symbol: "n2", name: "Tốc độ quay điều chỉnh qua biến tần", unit: "rpm", description: "Tốc độ mới (ví dụ 40Hz tương đương 80%)" },
        ],
        safeStandard: "Không giảm tần số biến tần động cơ quạt / bơm dưới 20Hz để tránh động cơ quá nóng do quạt tự làm mát giảm gió.",
        sampleCalculation: "Bơm nước giải nhiệt 30 kW chạy 50Hz. Khi trời mát, BMS điều khiển biến tần giảm xuống 40Hz (tỷ lệ n2/n1 = 40/50 = 0.8). Công suất điện mới: P2 = 30 × (0.8)³ = 30 × 0.512 = 15.36 kW. Tiết kiệm được gần 15 kWh điện cho mỗi giờ hoạt động!",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra tín hiệu điều khiển Analog 0-10V từ DDC tới van điều khiển",
        action: "Dùng VOM thang DC 20V đo ngõ ra Analog Output của bộ DDC khi thay đổi giá trị đặt nhiệt độ trên phần mềm BMS.",
        expectedResult: "Khi nhiệt độ thực tế cao hơn nhiệt độ đặt, điện áp tăng tuyến tính từ 0V lên 10V mở van nước lạnh 100%.",
      },
      {
        step: 2,
        title: "Đấu nối mạng truyền thông Modbus RS-485 chống nhiễu",
        action: "Đấu dây cặp xoắn tín hiệu Data+ (A) và Data- (B), nối điện trở đầu cuối 120Ω ở thiết bị cuối cùng của đường truyền.",
        expectedResult: "Phần mềm máy chủ BMS nhận đủ 100% gói tin từ các biến tần và đồng hồ điện năng không bị lỗi Timeout.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Đi dây tín hiệu mạng truyền thông RS-485 chung máng cáp với dây điện động lực 380V công suất lớn.",
        consequence: "Nhiễu điện từ trường làm mất gói tin, phần mềm BMS báo lỗi Offline hàng loạt thiết bị điều khiển.",
        prevention: "Bắt buộc đi dây tín hiệu trong ống luồn riêng, cách máng cáp lực tối thiểu 30cm và dùng cáp có vỏ bọc chống nhiễu.",
      },
    ],
  },

  "dl-306": {
    subjectId: "dl-306",
    diagramType: "ELECTRICAL_SAFETY",
    coreTheory: [
      {
        heading: "1. Quy chuẩn Thử nghiệm & Nghiệm thu T&C (Testing and Commissioning) Hệ thống HVAC",
        paragraphs: [
          "Testing and Commissioning (T&C) là giai đoạn quyết định sống còn trước khi bàn giao công trình cơ điện cho chủ đầu tư. Một hệ thống dù lắp đặt thiết bị đắt tiền đến đâu nếu không qua quy trình T&C chuẩn mực sẽ hoạt động lệch điểm làm việc, thừa lạnh chỗ này thiếu lạnh chỗ khác và tiêu tốn điện năng gấp đôi.",
          "Quy trình T&C trải qua 4 giai đoạn nghiêm ngặt: (1) Kiểm tra tĩnh trước khi cấp điện (Pre-commissioning checklist) -> (2) Thử nghiệm không tải từng thiết bị riêng lẻ -> (3) Thử nghiệm liên động toàn hệ thống có tải -> (4) Chạy thử nghiệm thu liên tục 72 giờ (Reliability Run Test) dưới sự giám sát của Tư vấn giám sát.",
        ],
        keyPoints: [
          "Bắt buộc đo kiểm tra thứ tự pha điện 3 pha bằng đồng hồ chỉ thị pha trước khi bật công tắc khởi động máy nén trục vít / ly tâm (nghiêm cấm quay ngược chiều gây gãy vỡ trục).",
          "Cân chỉnh lưu lượng nước (Water Balancing) bằng van cân bằng tĩnh/động để mọi dàn AHU/FCU đều nhận đủ lưu lượng nước lạnh thiết kế.",
        ],
      },
      {
        heading: "2. Hồ sơ hoàn công (As-Built) & Bàn giao kỹ thuật vận hành",
        paragraphs: [
          "Kỹ sư điều hành dự án HVAC chịu trách nhiệm lập toàn bộ hồ sơ chất lượng công trình: Biên bản thử áp lực đường ống gas/nước; Biên bản thử khói và thử kín đường ống gió; Bảng thông số đo kiểm dòng điện, điện áp, độ ồn, lưu lượng gió thực tế tại từng miệng thổi; và Bản vẽ hoàn công As-built chi tiết đúng với thực tế thi công ngoài hiện trường.",
        ],
        keyPoints: [
          "Biên bản nghiệm thu T&C là căn cứ pháp lý duy nhất để chủ đầu tư ký duyệt giải ngân thanh toán đợt cuối và bắt đầu tính thời hạn bảo hành công trình.",
        ],
      },
    ],
    formulas: [
      {
        name: "Công thức sai số phần trăm chấp nhận được trong cân chỉnh lưu lượng gió và nước T&C",
        calculatesWhat: "Đánh giá kết quả đo kiểm lưu lượng thực tế tại hiện trường có đạt tiêu chuẩn nghiệm thu quốc tế ASHRAE / NEBB hay không.",
        whenToUse: "Áp dụng khi điền số liệu vào biên bản nghiệm thu T&C bàn giao cho Tư vấn giám sát.",
        expression: "Sai số (%) = |(Giá_trị_thực_đo - Giá_trị_thiết_kế) / Giá_trị_thiết_kế| × 100%",
        variables: [
          { symbol: "Giá trị thực đo", name: "Số đo ampe, lưu lượng CFM, nước m³/h đo bằng máy", unit: "CFM / m³/h / A", description: "Đo bằng thiết bị đo kiểm có tem kiểm định hợp chuẩn" },
          { symbol: "Giá trị thiết kế", name: "Chỉ số ghi trong bản vẽ thiết kế thi công", unit: "CFM / m³/h / A", description: "Thông số thiết kế được duyệt" },
        ],
        safeStandard: "Tiêu chuẩn nghiệm thu quốc tế NEBB / ASHRAE 111: Sai số lưu lượng từng miệng gió và dàn coil cho phép trong ngưỡng ±10%. Sai số tổng lưu lượng hệ thống ≤ ±5%.",
        sampleCalculation: "Miệng gió thiết kế 500 CFM. Đo thực tế bằng Capture Hood được 535 CFM. Sai số: |(535 - 500) / 500| × 100% = 7.0% (nằm trong ngưỡng an toàn ≤ ±10% -> Đạt nghiệm thu xuất sắc).",
      },
    ],
    practicalSteps: [
      {
        step: 1,
        title: "Kiểm tra thứ tự pha nguồn điện 3 pha 380V trước khi bật lốc",
        action: "Kẹp 3 kẹp cá sấu của đồng hồ đo thứ tự pha vào 3 pha L1 - L2 - L3 tại tủ điện cấp nguồn Chiller.",
        expectedResult: "Vòng đèn LED trên đồng hồ quay thuận chiều kim đồng hồ (CW / Chữ OK sáng). Tuyệt đối không bật máy nếu đèn báo nghịch pha.",
      },
      {
        step: 2,
        title: "Lập biên bản đo đạc thông số chạy thử liên tục 72 giờ",
        action: "Ghi chép nhiệt độ nước cấp/hồi, áp suất hút/đẩy, dòng điện 3 pha và độ ồn mỗi 2 giờ một lần vào biểu mẫu T&C.",
        expectedResult: "Hệ thống vận hành trơn tru liên tục suốt 72 giờ không có bất kỳ cảnh báo lỗi ngắt máy nào.",
      },
    ],
    fieldPitfalls: [
      {
        mistake: "Không kiểm tra thứ tự pha mà đóng điện khởi động trực tiếp máy nén trục vít hoặc máy nén xoắn ốc Scroll.",
        consequence: "Động cơ quay ngược chiều làm khô dầu bôi trơn, kẹt cháy vỡ toàn bộ cụm trục vít chỉ trong 30 giây đầu tiên.",
        prevention: "Bắt buộc đo đồng hồ thứ tự pha và lắp đặt Rơ-le bảo vệ mất pha / đảo pha (Phase Failure Relay) trong mạch điều khiển.",
      },
    ],
  },
};
