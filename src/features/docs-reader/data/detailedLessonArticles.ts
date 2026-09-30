export interface FieldStep {
  stepNumber: number;
  title: string;
  action: string;
  expectedResult: string;
  warning?: string;
}

export interface FormulaBox {
  formula: string;
  explanation: string;
  exampleCalculation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  keyBulletPoints?: string[];
  formulaBox?: FormulaBox;
  safetyNotice?: {
    type: "DANGER" | "WARNING" | "INFO";
    text: string;
  };
  fieldSteps?: FieldStep[];
  commonFaults?: {
    symptom: string;
    rootCause: string;
    solution: string;
  }[];
}

export interface DetailedLessonArticle {
  slug: string;
  lessonCode: string;
  title: string;
  subtitle: string;
  subjectCode: string;
  subjectTitle: string;
  semesterNumber: number;
  yearNumber: number;
  durationHours: number;
  prerequisites: string;
  circuitType?: "INVERTER_COMMUNICATION" | "COMPRESSOR_MOTOR" | "DC_BUS_POWER" | "GROUNDING_RCBO";
  testPoints?: {
    point: string;
    location: string;
    nominalValue: string;
    significance: string;
  }[];
  showPTChart?: boolean;
  showErrorCodeSearch?: boolean;
  initialErrorCode?: string;
  sections: LessonSection[];
}

export const DETAILED_LESSON_ARTICLES: Record<string, DetailedLessonArticle> = {
  // =========================================================================
  // DL-101: BÀI L1.1 - ĐỊNH LUẬT OHM & TÍNH TOÁN DÒNG TẢI DÂY DẪN
  // =========================================================================
  "curriculum/dl101-ohm-law": {
    slug: "curriculum/dl101-ohm-law",
    lessonCode: "L1.1",
    title: "Định Luật Ohm, Tính Dòng Tải Định Mức & Tiết Diện Dây Dẫn Máy Lạnh",
    subtitle: "Nền tảng sống còn: Mối quan hệ giữa Điện áp U, Dòng điện I, Công suất P và mật độ dòng điện an toàn J",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & An toàn Điện lạnh",
    semesterNumber: 1,
    yearNumber: 1,
    durationHours: 4,
    prerequisites: "Toán học cơ sở (Nhân chia tỉ lệ, đọc số thập phân)",
    circuitType: "GROUNDING_RCBO",
    sections: [
      {
        id: "tong-quan-ohm",
        title: "1. Bản chất Vật lý của Dòng điện trong Hệ thống Lạnh",
        content:
          "Dòng điện (Ampe - A) là dòng chuyển dời có hướng của các hạt mang điện (electron) qua dây dẫn. Khi máy nén hoặc quạt hoạt động, dòng điện sinh nhiệt theo định luật Joule-Lenz Q = I^2*R*t. Nếu người thợ chọn dây dẫn quá bé, dây sẽ phát nhiệt nóng chảy lớp cách điện PVC, gây chập cháy hỏa hoạn ngoài công trình.",
        keyBulletPoints: [
          "Điện áp U (Vôn - V): Chênh lệch thế năng điện giữa 2 điểm (áp lực đẩy dòng điện). Nguồn dân dụng Việt Nam là 220V AC +-10%, tần số 50Hz.",
          "Dòng điện I (Ampe - A): Lượng điện tích chạy qua tiết diện dây dẫn trong 1 giây.",
          "Điện trở R (Ohm - Ω): Trở lực cản trở dòng điện của cuộn dây động cơ hoặc tiếp điểm.",
          "Hệ số công suất cosφ: Thường dao động từ 0.85 đến 0.95 đối với máy nén điều hòa.",
        ],
      },
      {
        id: "cong-thuc-tinh-dong",
        title: "2. Công thức Tính Dòng Định Mức & Dòng Khởi Động Máy Nén",
        content:
          "Để chọn aptomat (CB) và tiết diện dây nguồn cho máy lạnh, kỹ thuật viên không được đoán mò mà phải tính toán chính xác theo công suất tiêu thụ điện P (Watt) và dòng khởi động cực đại khi lốc đề ba.",
        formulaBox: {
          formula: "I_dm = P / (U * cosφ)  |  I_start = 5 đến 7 * I_dm",
          explanation:
            "Trong đó: P là công suất điện tiêu thụ (W); U = 220V; cosφ = 0.85 (hệ số công suất cuộn dây động cơ). Dòng khởi động I_start xảy ra trong 0.2 - 0.5 giây đầu tiên khi rotor máy nén chuyển từ trạng thái đứng yên sang quay.",
          exampleCalculation:
            "Ví dụ máy lạnh 12,000 BTU có công suất điện P = 1,000W. Dòng định mức: I_dm = 1000 / (220 * 0.85) = 5.35A. Dòng đề ba: I_start = 6 * 5.35 = 32.1A. Chọn Aptomat loại C (Curve C) định mức 16A để không bị nhảy khi lốc khởi động.",
        },
        safetyNotice: {
          type: "WARNING",
          text: "Tuyệt đối không dùng Aptomat quá lớn (ví dụ máy 1HP dòng 4A nhưng lắp CB 32A). Khi lốc bị kẹt cơ ăn dòng 15A ngâm lâu, CB không chịu nhảy sẽ làm cháy rụi cuộn dây máy nén!",
        },
      },
      {
        id: "chon-tiet-dien-day",
        title: "3. Quy tắc Chọn Tiết Diện Dây Đồng Theo Mật Độ Dòng Điện J",
        content:
          "Dây điện cấp nguồn cho điều hòa thường đi luồn trong ống ghen hoặc âm tường nhiệt độ cao, do đó mật độ dòng điện kinh tế an toàn cho dây đồng (Cu) chọn J = 5 đến 6 A/mm2.",
        formulaBox: {
          formula: "S >= I_dm / J_cp (mm2)",
          explanation:
            "S: Tiết diện ruột đồng dẫn điện (mm2). J_cp: Mật độ dòng cho phép (5 A/mm2 đối với dây âm tường).",
          exampleCalculation:
            "Với dòng I = 8A (máy 18,000 BTU): S >= 8 / 5 = 1.6 mm2 -> Bắt buộc chọn dây tiêu chuẩn 2.5 mm2 (dây Cadivi / Trần Phú 2x2.5mm2). Tuyệt đối không dùng dây 1.5 mm2.",
        },
      },
      {
        id: "quy-trinh-kiem-tra-dien",
        title: "4. Quy trình 4 Bước Đo Kiểm Dòng Tải & Độ Sụt Áp Bằng Ampe Kìm",
        content:
          "Thao tác đo kiểm thực tế khi bàn giao hoặc bảo trì máy lạnh ngoài hiện trường:",
        fieldSteps: [
          {
            stepNumber: 1,
            title: "Cặp ampe kìm vào 1 sợi dây nguồn (L hoặc N)",
            action: "Kẹp hàm kìm quanh duy nhất 1 dây pha (L) hoặc trung tính (N). Tuyệt đối không kẹp cả 2 dây vào lòng kìm vì từ trường triệt tiêu nhau hiển thị 0A.",
            expectedResult: "Màn hình ampe kìm hiển thị dòng tải chạy ổn định (ví dụ 3.2A - 4.5A đối với máy 1HP).",
          },
          {
            stepNumber: 2,
            title: "Đo điện áp tải khi máy nén tăng tốc",
            action: "Cắm 2 que đo của đồng hồ VOM vào chân 1 (L) và chân 2 (N) lúc lốc bắt đầu gầm tải.",
            expectedResult: "Điện áp không được sụt quá 10% (U >= 200V AC). Nếu điện áp tụt xuống 185V: Dây nguồn quá nhỏ hoặc nguồn lưới yếu.",
          },
          {
            stepNumber: 3,
            title: "So sánh với tem thông số máy (Nameplate)",
            action: "Đối chiếu số Ampe đo được với dòng ghi trên vỏ máy (Rated Current).",
            expectedResult: "Nếu dòng thực tế cao hơn 30% định mức: Kiểm tra dàn nóng quá bẩn, thừa gas hoặc tụ điện bị giảm dung lượng.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // DL-101: BÀI L1.2 - THỰC HÀNH ĐO VOM VÀ AMPE KÌM
  // =========================================================================
  "curriculum/dl101-vom-practical": {
    slug: "curriculum/dl101-vom-practical",
    lessonCode: "L1.2",
    title: "Kỹ Thuật Sử Dụng Đồng Hồ Vạn Năng VOM & Ampe Kìm Hiện Trường",
    subtitle: "Nguyên tắc chọn thang đo, kỹ thuật que đo sống/nguội và quy tắc chống nổ đồng hồ đo",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & An toàn Điện lạnh",
    semesterNumber: 1,
    yearNumber: 1,
    durationHours: 6,
    prerequisites: "DL-101 Bài L1.1 (Điện áp, dòng điện, điện trở)",
    circuitType: "GROUNDING_RCBO",
    sections: [
      {
        id: "vom-phan-loai",
        title: "1. So sánh VOM Kim (Cơ) và VOM Số (Digital True RMS) trong Nghề Lạnh",
        content:
          "Người thợ điện lạnh chuyên nghiệp luôn phải mang theo cả 2 loại đồng hồ: Đồng hồ kim cơ để đo dao động xung nhịp (như xung Data chân 2-3 biến tần) và đồng hồ số để đo chính xác điện trở cảm biến nhiệt độ (Sensor) và điện dung tụ điện.",
        keyBulletPoints: [
          "Đồng hồ kim (VOM cơ): Có độ nhạy tức thời, kim vẩy theo nhịp truyền tin Data. Dễ hỏng nếu cắm nhầm thang Ohm vào nguồn điện.",
          "Đồng hồ số (True RMS): Đo chính xác sóng biến dạng của biến tần Inverter, có còi chip báo thông mạch nhanh.",
          "Ampe kìm (Clamp Meter): Đo dòng điện tải không cần cắt dây dẫn, tích hợp que đo vạn năng.",
        ],
      },
      {
        id: "quy-tac-chong-no",
        title: "2. Quy Tắc Vàng Chống Nổ Đồng Hồ Đo Ngoài Công Trình",
        content:
          "95% trường hợp hỏng đồng hồ là do người thợ đang để thang đo Điện trở (Ohm/Buzzer) hoặc thang đo Dòng điện (mA) rồi cắm que đo thẳng vào ổ điện 220V!",
        safetyNotice: {
          type: "DANGER",
          text: "TRƯỚC KHI ĐẶT QUE ĐO VÀO BẤT KỲ ĐIỂM NÀO, MẮT PHẢI NHÌN VÀO NÚM XOAY THANG ĐO: Xác nhận thang đo V xoay chiều (ACV) trước khi đo nguồn điện!",
        },
      },
      {
        id: "cac-phep-do-chuan",
        title: "3. Bảng 5 Phép Đo Thiết Yếu Tại Hiện Trường",
        content:
          "Hướng dẫn cài đặt thang đo và phân tích kết quả:",
        fieldSteps: [
          {
            stepNumber: 1,
            title: "Đo nguồn cấp AC 220V",
            action: "Chọn thang đo AC 500V hoặc 750V. Đặt 2 que đo vào dây nóng (L) và nguội (N).",
            expectedResult: "Hiển thị 220V +- 10V (từ 210V đến 230V).",
          },
          {
            stepNumber: 2,
            title: "Đo kiểm tra thông mạch (Còi Buzzer)",
            action: "Chọn thang hình nốt nhạc / Diode. Chạm 2 que đo với nhau còi kêu 'Bíp'. Cặp vào 2 đầu dây dẫn.",
            expectedResult: "Còi kêu liên tục: Dây tốt. Còi im lặng: Dây đứt ngầm.",
          },
          {
            stepNumber: 3,
            title: "Đo kiểm tra chạm vỏ rò điện (Rò lốc / Quạt)",
            action: "Để thang x10k hoặc đo Megger. Một que kẹp cọc cắm lốc, que kia cào vào ống đồng / vỏ sắt tiếp địa.",
            expectedResult: "Kim không được nhúc nhích (điện trở vô cùng ∞). Nếu kim lên: Lốc bị rò điện ra vỏ, có nguy cơ giật!",
          },
          {
            stepNumber: 4,
            title: "Đo dung lượng tụ điện (µF)",
            action: "Ngắt điện, xả điện tích tụ. Rút 2 chân tụ cắm vào que đo ở thang đo Capacitance (-|( -).",
            expectedResult: "Hiển thị giá trị sai số không quá +-5% so với giá trị ghi trên thân tụ (ví dụ tụ 35µF đo được >= 33µF).",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // DL-101: BÀI L1.3 - AN TOÀN ĐIỆN & TIẾP ĐỊA MÁY LẠNH CHỐNG GIẬT
  // =========================================================================
  "curriculum/dl101-electrical-safety": {
    slug: "curriculum/dl101-electrical-safety",
    lessonCode: "L1.3",
    title: "Quy Chuẩn An Toàn Điện, Tiếp Địa PE Chống Rò Vỏ & Aptomat RCBO",
    subtitle: "Bảo vệ tính mạng người thợ và gia chủ: Bản chất dòng rò điện, tiêu chuẩn cọc tiếp địa R <= 4 Ohm và nguyên lý bảo vệ RCBO 30mA",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & An toàn Điện lạnh",
    semesterNumber: 1,
    yearNumber: 1,
    durationHours: 4,
    prerequisites: "DL-101 Bài L1.1 & L1.2",
    circuitType: "GROUNDING_RCBO",
    testPoints: [
      {
        point: "PE_CHASSIS",
        location: "Vỏ máy kim loại",
        nominalValue: "0V đối với đất",
        significance: "Nếu đo vỏ máy với đất > 50V AC: Máy đang bị rò điện nguy hiểm chết người!",
      },
      {
        point: "RCBO_SENSE",
        location: "Biến dòng ZCT",
        nominalValue: "Dòng so lệch < 15mA",
        significance: "Khi dòng rò I_leak >= 30mA, RCBO ngắt mạch trong 0.03 giây.",
      },
      {
        point: "EARTH_ROD",
        location: "Cọc tiếp địa đồng",
        nominalValue: "R_td <= 4 Ohm",
        significance: "Thoát toàn bộ dòng rò xuống đất an toàn thay vì truyền qua cơ thể người.",
      },
    ],
    sections: [
      {
        id: "tai-sao-bi-giat",
        title: "1. Tại Sao Chạm Vào Vỏ Cục Nóng Thường Bị Tê Giật?",
        content:
          "Trên các dòng máy lạnh Inverter hiện đại, khối lọc nhiễu EMI đầu vào luôn có 2 tụ gốm cao tần (Tụ Y: Y-Capacitors) nối từ dây L sang vỏ máy và từ dây N sang vỏ máy để triệt tiêu sóng hài cao tần. Hai tụ này tạo thành một cầu phân áp đưa điện áp cảm ứng khoảng 110V AC ra vỏ máy kim loại! Nếu không đấu dây tiếp địa (PE), người đứng trên nền ẩm chạm vào vỏ sẽ bị giật mạnh.",
        safetyNotice: {
          type: "DANGER",
          text: "Dòng điện đi qua cơ thể từ 30mA - 50mA trong 0.1 giây có thể gây co giật cơ tim và tử vong. BẮT BUỘC phải tiếp địa vỏ dàn nóng bằng dây đồng PE tiêu chuẩn!",
        },
      },
      {
        id: "tieu-chuan-tiep-dia",
        title: "2. Quy Chuẩn Đóng Cọc Tiếp Địa & Đo Điện Trở Đất",
        content:
          "Tiêu chuẩn kỹ thuật TCVN 4756: Quy định điện trở nối đất an toàn cho thiết bị điện gia dụng và máy lạnh:",
        keyBulletPoints: [
          "Cọc đồng: Cọc tiếp địa đồng nguyên chất hoặc thép bọc đồng đường kính Ø14 - Ø16mm, dài tối thiểu 2.4m đóng sâu ngập đất ẩm.",
          "Dây tiếp địa: Dây đồng nhiều sợi vỏ vàng sọc xanh lá (Yellow/Green) tiết diện tối thiểu 2.5mm2 bắt ốc siết cosse đồng chắc chắn vào vỏ dàn nóng.",
          "Giá trị điện trở đất yêu cầu: R_td <= 4 Ohm (khu vực công nghiệp) hoặc <= 10 Ohm (dân dụng).",
        ],
      },
      {
        id: "nguyen-ly-rcbo",
        title: "3. Nguyên Lý Hoạt Động của Aptomat Chống Giật RCBO 30mA",
        content:
          "RCBO (Residual Current Breaker with Overcurrent) kết hợp 2 chức năng: Chống quá tải ngắn mạch và chống dòng rò bảo vệ tính mạng.",
        formulaBox: {
          formula: "ΔI = |I_pha - I_trung_tinh| >= 30mA  -->  Tripping trong t <= 0.03s",
          explanation:
            "Ở trạng thái bình thường, dòng đi qua dây L bằng đúng dòng về qua dây N, tổng từ trường trong lõi xuyến ZCT bằng 0. Khi có người chạm vào vỏ máy bị rò, một phần dòng điện chạy qua người xuống đất, tạo ra dòng chênh lệch ΔI. Khi ΔI đạt 30mA, cuộn nhả điện từ lập tức tác động ngắt tiếp điểm trong 30 mili-giây.",
          exampleCalculation:
            "Thời gian ngắt 0.03 giây nhanh hơn rất nhiều so với chu kỳ tim (0.75s), triệt tiêu hoàn toàn nguy cơ rung thất cơ tim gây tử vong.",
        },
      },
    ],
  },

  // =========================================================================
  // DL-102: BÀI L2.1 - CHU TRÌNH NHIỆT ĐỘNG HỌC 4 THIẾT BỊ
  // =========================================================================
  "curriculum/dl102-cycle": {
    slug: "curriculum/dl102-cycle",
    lessonCode: "L2.1",
    title: "Chu Trình Nhiệt Động Học Nén Hơi 1 Cấp & 4 Thiết Bị Chính Máy Lạnh",
    subtitle: "Hiểu bản chất 'Bơm nhiệt': Máy nén, Dàn ngưng tụ, Thiết bị tiết lưu và Dàn bay hơi",
    subjectCode: "DL-102",
    subjectTitle: "Nhiệt động học Kỹ thuật & Môi chất lạnh (Gas)",
    semesterNumber: 1,
    yearNumber: 1,
    durationHours: 6,
    prerequisites: "Vật lý nhiệt cơ sở (Nhiệt dung, sự bay hơi và ngưng tụ)",
    showPTChart: true,
    sections: [
      {
        id: "nguyen-ly-bom-nhiet",
        title: "1. Nguyên Lý 'Bơm Nhiệt': Máy Lạnh Không Tự Sinh Ra Khí Lạnh",
        content:
          "Nhiệt năng chỉ tự truyền từ vật nóng sang vật lạnh. Để chuyển nhiệt từ trong phòng mát (25°C) thải ra ngoài trời nóng bức (38°C), hệ thống phải tiêu tốn công cơ học của máy nén để nén gas lên nhiệt độ rất cao (75°C - 85°C), biến gas thành môi chất có nhiệt độ cao hơn môi trường ngoài trời để tỏa nhiệt.",
        keyBulletPoints: [
          "Quá trình 1: NÉN (Máy nén) -> Tăng áp suất và nhiệt độ gas từ hơi áp thấp lên hơi áp cao siêu nhiệt.",
          "Quá trình 2: NGƯNG TỤ (Dàn nóng) -> Tỏa nhiệt ra ngoài khí quyển, gas từ thể hơi chuyển dần sang thể lỏng cao áp.",
          "Quá trình 3: TIẾT LƯU (Ống mao / Van EEV) -> Giảm áp suất đột ngột, gas lỏng sôi sùng sục ở nhiệt độ cực thấp (từ 0°C đến 5°C).",
          "Quá trình 4: BAY HƠI (Dàn lạnh) -> Gas lỏng thu nhiệt của phòng để sôi thành hơi, làm mát luồng gió thổi qua quạt lồng sóc.",
        ],
      },
      {
        id: "hien-tuong-ngap-long",
        title: "2. Mối Nguy Cơ Lớn Nhất: Hiện Tượng Ngập Lỏng Phá Hủy Máy Nén",
        content:
          "Máy nén chỉ được thiết kế để nén HƠI, tuyệt đối không được nén CHẤT LỎNG vì chất lỏng không thể nén được (Incompressible fluid).",
        safetyNotice: {
          type: "DANGER",
          text: "Nếu dàn lạnh bị quá bẩn, quạt gió dàn lạnh bị chết, hoặc thợ nạp quá nhiều gas, gas lỏng không bay hơi hết sẽ tràn về buồng nén. Lốc nén chất lỏng sẽ tạo ra cú sốc thủy lực (Liquid Slugging) làm gãy tay biên, vỡ lá van hút đẩy ngay lập tức!",
        },
      },
    ],
  },

  // =========================================================================
  // DL-102: BÀI L2.2 - ÁP SUẤT BÃO HÒA, SUPERHEAT & SUBCOOLING
  // =========================================================================
  "curriculum/dl102-superheat": {
    slug: "curriculum/dl102-superheat",
    lessonCode: "L2.2",
    title: "Áp Suất Bão Hòa, Độ Quá Nhiệt (Superheat) & Độ Quá Lạnh (Subcooling)",
    subtitle: "Công cụ chẩn đoán sống còn của kỹ sư lạnh: Phán đoán chính xác thiếu gas, thừa gas hay tắc van tiết lưu",
    subjectCode: "DL-102",
    subjectTitle: "Nhiệt động học Kỹ thuật & Môi chất lạnh (Gas)",
    semesterNumber: 1,
    yearNumber: 1,
    durationHours: 4,
    prerequisites: "DL-102 Bài L2.1 (Chu trình nén hơi)",
    showPTChart: true,
    sections: [
      {
        id: "dinh-nghia-superheat",
        title: "1. Độ Quá Nhiệt Hơi Hút (Superheat - SH) Là Gì?",
        content:
          "Superheat là khoảng chênh lệch nhiệt độ giữa nhiệt độ thực tế đo được trên đường ống đồng hồi về lốc (Suction Line Temp) và nhiệt độ bay hơi bão hòa (Evaporating Temp) tra theo áp suất đồng hồ.",
        formulaBox: {
          formula: "SH = T_suction_pipe - T_saturation (tra từ bảng P-T)",
          explanation:
            "SH chuẩn cho máy lạnh dân dụng điều hòa: từ 5°C đến 8°C (hoặc 9°F đến 14°F).",
          exampleCalculation:
            "Ví dụ máy dùng Gas R32 đo áp suất hút P_hut = 145 PSI -> Tra bảng P-T Chart được T_sat = 4.5°C. Kẹp nhiệt kế vào ống đồng về đo được T_ong = 11.5°C. Độ quá nhiệt SH = 11.5 - 4.5 = 7°C (Rất chuẩn, gas về lốc 100% là hơi an toàn).",
        },
        keyBulletPoints: [
          "Nếu SH < 2°C (Quá thấp): Nguy cơ gas lỏng chưa bay hơi hết tràn về làm vỡ máy nén (ngập lỏng). Nguyên nhân: Thừa gas, quạt dàn lạnh chết, nghẹt lọc gió.",
          "Nếu SH > 12°C (Quá cao): Máy nén bị thiếu gas giải nhiệt, lốc chạy nóng rực ngắt nhiệt téc-mít liên tục. Nguyên nhân: Thiếu gas, xì gas, nghẹt ống mao.",
        ],
      },
      {
        id: "dinh-nghia-subcooling",
        title: "2. Độ Quá Lạnh Dòng Lỏng (Subcooling - SC) Là Gì?",
        content:
          "Subcooling là khoảng chênh lệch giữa nhiệt độ ngưng tụ bão hòa tại dàn nóng và nhiệt độ thực tế đo tại ống đồng đi (ống lỏng nhỏ) trước khi vào van tiết lưu.",
        formulaBox: {
          formula: "SC = T_condensing_sat (tra áp suất cao) - T_liquid_pipe",
          explanation:
            "SC chuẩn cho hệ thống có van tiết lưu điện tử EEV: từ 4°C đến 8°C.",
          exampleCalculation:
            "Đo áp suất đẩy cao áp Gas R32 P_day = 380 PSI -> T_sat = 48°C. Kẹp nhiệt kế ống lỏng đo được 42°C -> SC = 48 - 42 = 6°C (Đạt chuẩn lỏng ngưng tụ hoàn toàn).",
        },
      },
    ],
  },

  // =========================================================================
  // DL-105: BÀI L5.3 - ĐO KIỂM CHÂN CỌC LỐC C-R-S & KÍCH ĐỀ MÁY NÉN
  // =========================================================================
  "curriculum/dl105-compressor-lab": {
    slug: "curriculum/dl105-compressor-lab",
    lessonCode: "L5.3",
    title: "Thực Hành Đo Xác Định Chân Cọc Lốc C-R-S, Kích Đề & Kiểm Tra Tụ",
    subtitle: "Kỹ năng phân biệt chân Chung (C) - Chạy (R) - Đề (S), phát hiện lốc chết kẹt cơ khí hay hỏng tụ ngậm",
    subjectCode: "DL-105",
    subjectTitle: "Kỹ thuật Động cơ điện & Máy nén lạnh 1 Pha",
    semesterNumber: 2,
    yearNumber: 1,
    durationHours: 6,
    prerequisites: "DL-101 (Đo điện trở Ohm bằng VOM)",
    circuitType: "COMPRESSOR_MOTOR",
    testPoints: [
      {
        point: "C_TERMINAL",
        location: "Cọc Chung (Common)",
        nominalValue: "Điểm chung cuộn Chạy & cuộn Đề",
        significance: "Nối với rơ le nhiệt téc-mít (OLP) nhận pha L hoặc N.",
      },
      {
        point: "R_TERMINAL",
        location: "Cọc Chạy (Run)",
        nominalValue: "Điện trở nhỏ nhất về C",
        significance: "Cuộn dây chính mang tải, nối trực tiếp nguồn AC và 1 cực tụ ngậm.",
      },
      {
        point: "S_TERMINAL",
        location: "Cọc Đề (Start)",
        nominalValue: "Điện trở lớn hơn về C",
        significance: "Cuộn dây lệch pha, nối tiếp với cực còn lại của tụ ngậm.",
      },
    ],
    sections: [
      {
        id: "nguyen-ly-crs",
        title: "1. Nguyên Lý Điện Trở Tam Giác Cọc Lốc 1 Pha",
        content:
          "Động cơ máy nén 1 pha gồm 2 cuộn dây: Cuộn Chạy (Run) có tiết diện dây lớn, số vòng ít nên điện trở R_CR nhỏ. Cuộn Đề (Start) có tiết diện dây nhỏ, số vòng nhiều để tạo từ trường lệch pha 90° nên điện trở R_CS lớn hơn.",
        formulaBox: {
          formula: "R(R-S) = R(C-R) + R(C-S)  |  R(C-R) < R(C-S) < R(R-S)",
          explanation:
            "Quy tắc vàng: Cặp chân có điện trở lớn nhất chính là 2 chân R và S -> Chân còn lại đối diện chắc chắn là chân Chung (C). Từ chân C đo về 2 chân kia: chân nào có điện trở nhỏ hơn là chân R (Chạy), chân nào có điện trở lớn hơn là chân S (Đề).",
          exampleCalculation:
            "Đo 3 cọc lốc máy 1.5HP: Giữa cọc 1 và 2 đo được 9.5Ω. Giữa cọc 2 và 3 đo được 3.2Ω. Giữa cọc 1 và 3 đo được 6.3Ω. Ta thấy 9.5 = 3.2 + 6.3 -> Cọc 1 và 2 là R và S -> Cọc 3 là chân C. Từ cọc 3: cọc 2 có 3.2Ω (nhỏ) -> Cọc 2 là R; cọc 1 có 6.3Ω (lớn) -> Cọc 1 là S.",
        },
      },
      {
        id: "quy-trinh-kich-de",
        title: "2. Quy Trình Kích Đề Máy Nén Bị Kẹt Cơ Nhẹ Ngoài Công Trình",
        content:
          "Khi lốc để lâu không chạy hoặc tụ ngậm hỏng khiến lốc ngậm dòng gừ gừ không quay được, thợ có thể dùng phương pháp câu tụ kích phụ:",
        fieldSteps: [
          {
            stepNumber: 1,
            title: "Tăng dung lượng tụ ngậm tạm thời gấp đôi",
            action: "Đấu song song thêm 1 tụ đề 50µF - 70µF hoặc dùng bộ kích cơ chuyên dụng (Hard Start Kit SPP6).",
            expectedResult: "Tăng mô-men xoắn khởi động gấp 300% để phá vỡ lực ma sát kẹt pít-tông.",
          },
          {
            stepNumber: 2,
            title: "Cấp nguồn và nhấp nhả tức thì trong 1 giây",
            action: "Bật nguồn máy nén, khi lốc đề ba quay tít thì ngắt ngay tụ kích phụ ra khỏi chân S.",
            expectedResult: "Lốc quay êm, tiếng ồn giảm, ampe kìm tụt từ 25A xuống 4.2A ổn định.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // DL-201: BÀI L7.1 - MẠCH XẢ ĐÁ TỦ LẠNH QUẠT GIÓ NO-FROST
  // =========================================================================
  "curriculum/dl201-defrost-circuit": {
    slug: "curriculum/dl201-defrost-circuit",
    lessonCode: "L7.1",
    title: "Phân Tích Sơ Đồ Mạch Xả Đá Tự Động Tủ Lạnh Quạt Gió No-Frost",
    subtitle: "Nguyên lý đóng ngắt tiếp điểm Timer 1-2-3-4, Sò lạnh (Sensor âm), Cầu chì nhiệt 73°C & Thanh sấy",
    subjectCode: "DL-201",
    subjectTitle: "Kỹ thuật Tủ lạnh Dân dụng, Tủ đông & Tủ mát",
    semesterNumber: 3,
    yearNumber: 2,
    durationHours: 4,
    prerequisites: "DL-104 (Rơ le nhiệt & Khí cụ điều khiển)",
    sections: [
      {
        id: "so-do-xa-da",
        title: "1. Cấu Trúc 4 Linh Kiện Mạch Xả Tuyết Bắt Buộc Phải Nhớ",
        content:
          "Hiện tượng tủ lạnh ngăn đá vẫn lạnh nhưng ngăn mát mất gió hoàn toàn (85% do bó tuyết dàn lạnh). Mạch xả đá gồm 4 thành phần mắc nối tiếp:",
        keyBulletPoints: [
          "Timer xả đá (Đồng hồ cơ): Động cơ con quay chu kỳ 8 tiếng chạy lốc làm lạnh, sau đó chuyển mạch tiếp điểm sang chế độ xả đá trong 25 - 35 phút.",
          "Sò lạnh (Bimetal / Âm nhiệt -4°C): Kẹp sát vào ống đồng dàn lạnh. Chỉ đóng tiếp điểm khi nhiệt độ dàn đạt âm dưới -4°C để cho phép dòng điện chạy vào thanh sấy.",
          "Điện trở sấy (Defrost Heater 150W - 250W): Phát nhiệt làm tan chảy lớp băng tuyết bám trên cánh nhôm.",
          "Cầu chì nhiệt (Thermal Fuse 73°C): Bảo vệ chống cháy tủ. Khi nhiệt độ vượt quá 73°C (do sò lạnh bị dính tiếp điểm không ngắt), cầu chì sẽ đứt vĩnh viễn ngắt nguồn thanh sấy.",
        ],
      },
      {
        id: "quy-trinh-do-linh-kien",
        title: "2. Quy Trình 4 Phép Đo Nguội Khoanh Vùng Linh Kiện Hỏng",
        content:
          "Sử dụng đồng hồ VOM thang đo Ohm x1 để bắt đúng linh kiện chết trong 5 phút:",
        fieldSteps: [
          {
            stepNumber: 1,
            title: "Đo cầu chì nhiệt (Thermal Fuse)",
            action: "Rút giắc đo 2 đầu dây cầu chì (thường có ống ghen cách điện trắng trong).",
            expectedResult: "Phải thông mạch 0Ω. Nếu kim không lên (đứt mạch): Thay ngay cầu chì mới 73°C.",
          },
          {
            stepNumber: 2,
            title: "Đo điện trở sấy xả đá",
            action: "Đo 2 đầu thanh sấy thủy tinh hoặc thanh sấy nhôm.",
            expectedResult: "Điện trở hiển thị từ 250Ω đến 450Ω. Nếu ∞: Thanh sấy đã bị đứt dây may-so.",
          },
          {
            stepNumber: 3,
            title: "Đo kiểm tra sò lạnh (Sensor âm)",
            action: "Khi dàn lạnh đang đóng tuyết dày, đo 2 đầu dây sò lạnh.",
            expectedResult: "Phải thông mạch (0Ω). Nếu đang âm độ mà đo hở mạch (∞): Sò lạnh bị chết không đóng tiếp điểm.",
          },
          {
            stepNumber: 4,
            title: "Xoay tay kiểm tra Timer xả đá",
            action: "Dùng tô vít 2 cạnh xoay nhẹ núm timer theo chiều kim đồng hồ nghe tiếng 'Tách' nhỏ để chuyển sang chế độ xả tuyết.",
            expectedResult: "Cấp điện vào chân 1-3, mô-tơ timer phải rung nhẹ và quay tiếp điểm sang chân 2.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // DL-204: BÀI L10.2 - MODULE CÔNG SUẤT IPM (6 IGBT) BIẾN TẦN
  // =========================================================================
  "curriculum/dl204-ipm-igbt": {
    slug: "curriculum/dl204-ipm-igbt",
    lessonCode: "L10.2",
    title: "Cấu Tạo & Phương Pháp Đo Kiểm Tra Module Công Suất IPM (6 IGBT)",
    subtitle: "Kỹ thuật đo nguội 12 phép đo diode xác định chập van công suất điều khiển máy nén 3 pha U-V-W",
    subjectCode: "DL-204",
    subjectTitle: "Bo Mạch Biến Tần Inverter: Nguồn Xung, PFC & Khối Công Suất IPM",
    semesterNumber: 4,
    yearNumber: 2,
    durationHours: 6,
    prerequisites: "DL-203 (Bóng bán dẫn Transistor & Diode)",
    circuitType: "DC_BUS_POWER",
    testPoints: [
      {
        point: "DC_BUS_PLUS",
        location: "Cực dương P của IPM (+310V DC)",
        nominalValue: "+300V ~ +380V DC",
        significance: "Nguồn cao áp nuôi 3 van IGBT nhánh trên (High-side).",
      },
      {
        point: "DC_BUS_MINUS",
        location: "Cực âm N của IPM (GND)",
        nominalValue: "0V DC Reference",
        significance: "Nguồn mass nuôi 3 van IGBT nhánh dưới (Low-side qua điện trở Shunt).",
      },
      {
        point: "U_V_W",
        location: "3 chân ngõ ra lốc",
        nominalValue: "Xung AC 3 pha biến tần",
        significance: "Điện trở giữa 3 cặp U-V, V-W, W-U của cuộn dây lốc phải bằng nhau tuyệt đối.",
      },
    ],
    sections: [
      {
        id: "cau-tao-ipm",
        title: "1. Cấu Tạo Bên Trong IC Công Suất Thông Minh IPM",
        content:
          "IPM (Intelligent Power Module) tích hợp 6 bóng bán dẫn công suất cao IGBT (Insulated Gate Bipolar Transistor), 6 diode xả ngược (Freewheeling Diodes) và mạch lái Drive IC tích hợp bảo vệ quá nhiệt, quá dòng. Vi xử lý phát tín hiệu băm xung PWM điều khiển 6 cổng G để đóng ngắt điện áp 310V DC tạo thành dòng xoay chiều 3 pha tần số biến đổi 15Hz - 120Hz cấp cho lốc.",
        keyBulletPoints: [
          "3 van nhánh trên (Upper arms): Nối từ cực dương P (+310V DC) xuống các chân U, V, W.",
          "3 van nhánh dưới (Lower arms): Nối từ các chân U, V, W xuống cực âm N (GND).",
          "Khi 1 trong 6 van IGBT bị chập hoặc rò rỉ: Máy nén đề ba giật nhẹ 1 cái rồi ngắt ngay, bo mạch báo lỗi L5 (Daikin) hoặc H16 / H23 (Panasonic).",
        ],
      },
      {
        id: "12-phep-do-ipm",
        title: "2. Quy Trình Đo Nguội 12 Bước Kiểm Tra Sống Chết IPM Bằng Thang Diode",
        content:
          "Trước khi đo, PHẢI NGẮT NGUỒN VÀ XẢ HẾT ĐIỆN ÁP TRÊN TỤ 450V về dưới 5V DC!",
        safetyNotice: {
          type: "DANGER",
          text: "Đo thang Diode khi tụ nguồn DC 300V còn tích điện sẽ làm NỔ ĐỒNG HỒ VOM và phá hỏng vi xử lý bo mạch ngay lập tức!",
        },
        fieldSteps: [
          {
            stepNumber: 1,
            title: "Đo 3 van nhánh trên (Cực P với U, V, W)",
            action: "Que ĐEN đặt ở chân P (+), que ĐỎ lần lượt đo vào chân U, chân V, chân W.",
            expectedResult: "Cả 3 lần đo đều phải lên điện áp rơi diode khoảng 0.4V - 0.5V (diode mở). Đảo ngược que đo lại: cả 3 lần đo đều phải hiện 0L / ∞ (không dẫn).",
          },
          {
            stepNumber: 2,
            title: "Đo 3 van nhánh dưới (Cực N với U, V, W)",
            action: "Que ĐỎ đặt ở chân N (-), que ĐEN lần lượt đo vào chân U, chân V, chân W.",
            expectedResult: "Cả 3 lần đo đều phải lên điện áp rơi diode khoảng 0.4V - 0.5V. Đảo ngược que đo lại: cả 3 lần đo đều phải hiện 0L / ∞.",
          },
          {
            stepNumber: 3,
            title: "Kết luận hư hỏng",
            action: "Nếu bất kỳ 1 phép đo nào thông mạch 0.000V (chập còi kêu) hoặc đo cả 2 chiều đều hiện 0L (đứt hở van).",
            expectedResult: "Module công suất IPM đã chết, bắt buộc phải thay thế IC mới và bôi mỡ tản nhiệt tản nhiệt silicon kỹ càng.",
          },
        ],
      },
    ],
  },
};

export function getDetailedLessonArticle(slug: string): DetailedLessonArticle | null {
  return DETAILED_LESSON_ARTICLES[slug] || null;
}
