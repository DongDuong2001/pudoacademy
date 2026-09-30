import { SubjectExam, MultipleChoiceExamQuestion } from "@/types/exam";

export const SUBJECT_EXAMS_DATA: Record<string, SubjectExam> = {
  // ==========================================
  // ĐỀ THI HẾT MÔN DL-101: AN TOÀN ĐIỆN & ĐIỆN CƠ SỞ
  // ==========================================
  "dl-101": {
    id: "exam-dl-101",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & An toàn Điện lạnh",
    examName: "ĐỀ THI KẾT THÚC HỌC PHẦN: ĐIỆN CƠ SỞ & AN TOÀN ĐIỆN NGHỀ LẠNH",
    durationMinutes: 60,
    description: "Kiểm tra năng lực tính toán dòng điện định mức, chọn dây dẫn - khí cụ bảo vệ, quy chuẩn an toàn tiếp địa chống rò điện vỏ máy và kỹ năng phân tích sơ đồ mạch an toàn.",
    passingScore: 60,
    multipleChoiceQuestions: [
      {
        id: "dl101-mc-1",
        type: "MULTIPLE_CHOICE",
        scenario: "Kiểm tra hệ thống tiếp địa bảo vệ cho máy lạnh treo tường 220V tại công trình căn hộ chung cư.",
        question: "Theo Quy chuẩn Quốc gia về kỹ thuật điện QCVN 12:2014/BCT, điện trở nối đất an toàn bảo vệ R_đất tối đa cho phép là bao nhiêu?",
        options: [
          { text: "R_đất ≤ 4.0 Ω (đo bằng máy đo điện trở đất chuyên dụng)", explanation: "Chính xác. Điện trở tiếp địa cho mạng hạ áp dân dụng bảo vệ người bắt buộc R ≤ 4Ω." },
          { text: "R_đất ≤ 30.0 Ω (đo bằng đồng hồ VOM kim thang x10)", explanation: "Sai. 30Ω không đủ tiêu chuẩn để thoát nhanh dòng rò, và VOM không đo được điện trở bãi tiếp địa." },
          { text: "R_đất ≤ 100.0 Ω (nối tạm vào khung cửa nhôm)", explanation: "Sai phạm nguy hiểm. Cửa nhôm không có khả năng tản điện xuống đất, dễ làm nhiễm điện cả khung cửa." },
          { text: "R_đất ≥ 10.0 MΩ (càng lớn càng tốt)", explanation: "Sai. Đây là nhầm lẫn tai hại giữa điện trở cách điện và điện trở tiếp địa." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Điện trở tiếp địa an toàn R_đất ≤ 4Ω. Đo kiểm định kỳ bằng đồng hồ Megger đo đất.",
      },
      {
        id: "dl101-mc-2",
        type: "MULTIPLE_CHOICE",
        scenario: "Lựa chọn thiết bị đóng cắt bảo vệ cho máy lạnh công suất 2.0 HP (dòng làm việc định mức khoảng 8.5A, dòng khởi động đạt tới 42A).",
        question: "Cần chọn loại Aptomat nào để chống nhảy sai khi máy nén khởi động và bảo vệ quá tải hiệu quả?",
        options: [
          { text: "MCB 16A hoặc 20A loại đường đặc tính C (Curve C - chịu dòng đề gấp 5 - 10 lần dòng định mức)", explanation: "Chính xác. Động cơ máy nén cần Aptomat Curve C để không bị ngắt oan khi máy nén đề ba." },
          { text: "MCB 10A loại đường đặc tính B (Curve B - chịu dòng đề gấp 3 - 5 lần)", explanation: "Sai. MCB 10A Curve B sẽ bị nhảy tức thì mỗi khi máy nén khởi động kéo tải." },
          { text: "Cầu dao đảo chiều hoặc công tắc quả nhót 10A", explanation: "Sai hoàn toàn. Thiết bị này không có chức năng tự động dập hồ quang và bảo vệ quá tải." },
          { text: "Aptomat 63A công nghiệp để không bao giờ bị nhảy", explanation: "Sai nghiêm trọng. Chọn quá lớn sẽ mất hoàn toàn chức năng bảo vệ khi máy nén chập cháy dây đồng." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Chọn Aptomat cho tải động cơ máy nén: Dòng định mức MCB = (1.5 - 2.0) × I_đm, loại Curve C.",
      },
      {
        id: "dl101-mc-3",
        type: "MULTIPLE_CHOICE",
        scenario: "Dùng đồng hồ đo điện trở cách điện (Megohmmeter) để kiểm tra độ an toàn cách điện giữa cuộn dây máy nén và vỏ sắt trước khi đóng điện.",
        question: "Điện áp thử nghiệm chuẩn và trị số điện trở cách điện tối thiểu đạt yêu cầu an toàn là bao nhiêu?",
        options: [
          { text: "Điện áp thử 500V DC, điện trở cách điện R_cách điện ≥ 1.0 MΩ (lý tưởng > 5.0 MΩ)", explanation: "Chính xác. Tiêu chuẩn an toàn thiết bị lạnh yêu cầu điện trở cách điện cuộn dây vỏ máy R ≥ 1.0 MΩ khi đo ở điện áp 500V DC." },
          { text: "Điện áp thử 12V DC, điện trở cách điện = 0 Ω", explanation: "Sai. 0Ω nghĩa là cuộn dây đã chạm thẳng ra vỏ máy, cấp điện sẽ nổ hoặc giật chết người." },
          { text: "Điện áp thử 220V AC, điện trở cách điện ≥ 0.2 MΩ", explanation: "Sai. Đồng hồ Megger dùng nguồn DC điện áp cao (500V/1000V) để phát hiện đánh thủng cách điện." },
          { text: "Dùng bút thử điện chạm vào cuộn dây không sáng là đạt", explanation: "Sai. Bút thử điện không thể đo lường và phát hiện dòng rò vi sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Tiêu chuẩn cách điện an toàn: R_cách điện ≥ 1.0 MΩ đo bằng Megohmmeter ở cấp điện áp 500V DC.",
      },
      {
        id: "dl101-mc-4",
        type: "MULTIPLE_CHOICE",
        scenario: "Kỹ thuật viên muốn đo điện trở cuộn dây của quạt dàn lạnh nhưng đồng hồ vạn năng đang để nhầm thang đo điện trở Ohm x1.",
        question: "Nếu cắm que đo trực tiếp vào nguồn điện 220V AC trong tình trạng này, điều gì sẽ xảy ra?",
        options: [
          { text: "Đồng hồ sẽ nổ nát mạch in bên trong, đứt cầu chì bảo vệ hoặc cháy que đo do đo nhầm thang Ohm vào nguồn điện áp cao", explanation: "Chính xác. Thang đo Ohm dùng nguồn pin nội bộ cấp dòng, khi đưa 220V AC vào sẽ tạo dòng ngắn mạch cực lớn phá hủy đồng hồ." },
          { text: "Đồng hồ tự động chuyển thang sang đo Volt xoay chiều mà không hư hại", explanation: "Sai. Trừ một số đồng hồ chuyên dụng cao cấp tự động (Auto-ranging chống cháy), phần lớn VOM sẽ hỏng ngay." },
          { text: "Kim đồng hồ chỉ quay ngược về phía bên trái", explanation: "Sai. Dòng điện ngắn mạch sẽ bốc khói nổ tung điện trở shunt trên bo mạch đồng hồ." },
          { text: "Không có hiện tượng gì xảy ra", explanation: "Sai phạm cơ bản." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Nguyên tắc sống còn: Tuyệt đối không đo thang Ohm vào điểm có điện áp. Kiểm tra thang đo trước khi chạm que đo.",
      },
      {
        id: "dl101-mc-5",
        type: "MULTIPLE_CHOICE",
        scenario: "Phân biệt nguyên lý bảo vệ giữa Aptomat tép thường (MCB) và Aptomat chống giật tích hợp bảo vệ quá tải (RCBO).",
        question: "RCBO ngắt nguồn điện dựa trên nguyên lý vật lý nào?",
        options: [
          { text: "Sử dụng cuộn biến dòng thứ tự không (ZCT) để phát hiện sự mất cân bằng giữa dòng đi (dây L) và dòng về (dây N) khi có dòng rò xuống đất vượt quá 30mA", explanation: "Chính xác. Khi người bị giật hoặc dòng rò qua dây PE, dòng I_L ≠ I_N, từ thông trong lõi ZCT không triệt tiêu sinh ra suất điện động kích nhả lẫy ngắt." },
          { text: "Đo nhiệt độ của dây dẫn khi dây bị nóng đỏ", explanation: "Sai. Đây là chức năng bảo vệ nhiệt của thanh lưỡng kim trong MCB, không phải chức năng chống giật." },
          { text: "Đo áp suất không khí xung quanh máy lạnh", explanation: "Sai hoàn toàn." },
          { text: "Chờ dòng điện vượt quá 100A mới dập hồ quang", explanation: "Sai. Dòng điện giật người qua 50mA trong 0.1s đã có thể gây ngừng tim tử vong." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "RCBO bảo vệ tính mạng nhờ cảm ứng mất cân bằng dòng vi sai qua cuộn ZCT: ΔI ≥ 30mA, cắt điện trong < 0.1s.",
      }
    ],
    mathEssayQuestions: [
      {
        id: "dl101-math-1",
        type: "ESSAY_MATH",
        title: "BÀI TOÁN TÍNH TOÁN DÒNG TẢI, CHỌN TIẾT DIỆN CÁP ĐIỆN VÀ APTOMAT CHO MÁY ĐIỀU HÒA 2 HP",
        scenario: "Một công trình biệt thự lắp đặt cụm máy điều hòa không khí 1 pha công suất lạnh 18.000 BTU/h (tương đương 2.0 HP). Nhà sản xuất cung cấp thông số kỹ thuật điện của máy như sau:\n• Công suất điện tiêu thụ định mức: P = 1650 W\n• Điện áp danh định mạng điện: U = 220 V AC, tần số 50 Hz\n• Hệ số công suất toàn tải: cosφ = 0.85\n• Hệ số dòng khởi động máy nén: k_start = 5.0 (dòng đề gấp 5 lần dòng định mức)\n• Khoảng cách dây dẫn từ tủ điện phân phối chính đến dàn nóng là L = 25 mét, đi ngầm trong ống gen luồn tường.",
        givenData: [
          { symbol: "P", label: "Công suất điện tiêu thụ", value: "1650", unit: "W" },
          { symbol: "U", label: "Điện áp định mức", value: "220", unit: "V" },
          { symbol: "cosφ", label: "Hệ số công suất", value: "0.85", unit: "không thứ nguyên" },
          { symbol: "k_start", label: "Hệ số dòng khởi động", value: "5.0", unit: "lần" },
          { symbol: "L", label: "Chiều dài đường dây cấp nguồn", value: "25", unit: "m" },
        ],
        questions: [
          "Câu 1 (3 điểm): Tính dòng điện làm việc định mức I_đm của máy điều hòa theo biểu thức công suất điện xoay chiều 1 pha.",
          "Câu 2 (3 điểm): Tính dòng điện khởi động tức thời I_start của máy nén khi bắt đầu đề ba.",
          "Câu 3 (4 điểm): Áp dụng mật độ dòng điện an toàn cho dây đồng luồn ống J = 4.5 A/mm² để tính tiết diện lõi dây dẫn S_dây. Tra quy cách tiêu chuẩn cáp điện thực tế trên thị trường (1.5mm², 2.5mm², 4.0mm²) và lựa chọn thông số Aptomat MCB/RCBO phù hợp nhất."
        ],
        formulaHint: "Dòng định mức: I = P / (U × cosφ). Dòng khởi động: I_start = k_start × I_đm. Tiết diện cáp: S = I_đm / J.",
        stepByStepSolution: [
          {
            step: "Bước 1: Tính dòng điện làm việc định mức I_đm",
            calculation: "I_đm = P / (U × cosφ) = 1650 / (220 × 0.85) = 1650 / 187",
            result: "I_đm = 8.82 A",
            note: "Dòng điện tải thực tế xấp xỉ 8.82 Ampe.",
            points: 3,
          },
          {
            step: "Bước 2: Tính dòng khởi động máy nén I_start",
            calculation: "I_start = k_start × I_đm = 5.0 × 8.82",
            result: "I_start = 44.1 A",
            note: "Dòng khởi động tồn tại trong 0.2 - 0.5 giây đầu tiên.",
            points: 3,
          },
          {
            step: "Bước 3: Tính toán và lựa chọn tiết diện dây dẫn",
            calculation: "S_tính = I_đm / J = 8.82 / 4.5 = 1.96 mm²",
            result: "Chọn cáp đồng tiêu chuẩn: S = 2.5 mm² (Cadivi/LS Vina 2 × 2.5 mm² + 1 × 1.5 mm² PE tiếp địa).",
            note: "Không được chọn cáp 1.5mm² vì S_tính (1.96mm²) > 1.5mm², dây sẽ quá tải nóng chảy cách điện khi đi trong ống gen luồn tường dài 25m.",
            points: 2,
          },
          {
            step: "Bước 4: Chọn Aptomat bảo vệ",
            calculation: "I_Aptomat ≥ 1.5 × I_đm = 1.5 × 8.82 = 13.23 A. Chọn nấc định mức chuẩn 16A hoặc 20A.",
            result: "Chọn RCBO 2P - 20A / 30mA (Curve C, dòng cắt ngắn mạch 4.5kA hoặc 6kA).",
            note: "Đặc tính Curve C cho phép dòng khởi động 44.1A (gấp 2.2 lần dòng định mức 20A) đi qua trong 0.5s mà không bị nhảy lẫy sai.",
            points: 2,
          }
        ],
        evaluationCriteria: [
          "Viết đúng công thức I = P / (U × cosφ) và thay số chuẩn xác (8.82A).",
          "Tính đúng dòng khởi động I_start = 44.1A.",
          "Tính đúng tiết diện tính toán ~1.96 mm² và có lập luận chọn dây 2.5 mm² theo dải tiêu chuẩn.",
          "Chọn đúng Aptomat 20A (hoặc 16A) loại Curve C và nêu rõ lý do chống nhảy sai khi máy nén đề ba."
        ],
        totalPoints: 10,
      }
    ],
    circuitEssayQuestions: [
      {
        id: "dl101-circuit-1",
        type: "ESSAY_CIRCUIT",
        title: "PHÂN TÍCH NGUYÊN LÝ AN TOÀN TRÊN SƠ ĐỒ MẠCH TIẾP ĐỊA BẢO VỆ VÀ APTOMAT CHỐNG GIẬT RCBO",
        circuitType: "GROUNDING_RCBO",
        circuitDescription: "Sơ đồ nguyên lý bảo vệ an toàn điện mạng hạ thế 220V cho điều hòa dân dụng gồm Aptomat chống giật RCBO 30mA (tích hợp biến dòng thứ tự không ZCT), dây Pha (L), dây Trung tính (N), vỏ sắt máy điều hòa và hệ thống dây tiếp địa PE nối bãi cọc đồng.",
        testPoints: [
          {
            point: "TP1",
            location: "Nguồn vào trước RCBO (L - N)",
            nominalValue: "220V - 230V AC",
            significance: "Điện áp lưới điện sinh hoạt, ổn định 50Hz."
          },
          {
            point: "TP2",
            location: "Đầu ra sau RCBO tới vỏ máy điều hòa",
            nominalValue: "220V AC (khi bình thường), 0V (khi RCBO nhảy)",
            significance: "Cấp nguồn cho máy nén và bo mạch."
          },
          {
            point: "TP3",
            location: "Dây tiếp địa PE nối giữa vỏ kim loại máy và bãi cọc đất",
            nominalValue: "R_đất ≤ 4.0 Ω, Điện áp so với đất xấp xỉ 0V",
            significance: "Thoát tức thì dòng điện rò khi máy nén hỏng cách điện chạm vỏ."
          }
        ],
        diagnosticQuestions: [
          "Câu hỏi 1 (4 điểm): Trình bày đường đi của dòng điện trong 2 kịch bản: (A) Máy nén bị lão hóa cách điện chạm vỏ nhưng hệ thống CÓ DÂY TIẾP ĐỊA PE (R_đất = 3Ω); và (B) Máy nén chạm vỏ nhưng hệ thống KHÔNG CÓ DÂY TIẾP ĐỊA.",
          "Câu hỏi 2 (3 điểm): Giải thích cơ chế tác động của cuộn biến dòng ZCT trong Aptomat RCBO khi xảy ra sự cố ở kịch bản (A). Tại sao RCBO lại ngắt điện trong vòng 0.04 giây?",
          "Câu hỏi 3 (3 điểm): Tại sao nghiêm cấm dùng ống cấp nước kim loại hoặc khung cửa sổ nhôm kính làm cọc tiếp địa thay thế?"
        ],
        stepByStepSolution: [
          {
            analysis: "Phân tích 2 kịch bản dòng điện chạm vỏ:",
            keyPoints: [
              "Kịch bản A (Có tiếp địa PE): Dòng điện từ dây Pha (L) rò ra vỏ sắt máy điều hòa -> lập tức chạy theo dây tiếp địa PE màu vàng-xanh -> tản trực tiếp xuống lòng đất qua bãi cọc đồng (do R_đất chỉ 3Ω, thấp hơn nhiều so với điện trở người 2000Ω) -> Điện áp trên vỏ máy được ghim ở mức an toàn (< 25V) -> Người chạm vào vỏ máy hoàn toàn an toàn.",
              "Kịch bản B (Không có tiếp địa): Dòng điện từ dây L rò ra vỏ sắt máy điều hòa nhưng không có đường thoát -> Vỏ kim loại mang điện áp 220V AC -> Khi người dùng hoặc thợ chạm tay vào vỏ máy, dòng điện chạy thẳng qua tim người xuống đất -> Gây co giật cơ, rung tâm thất và tử vong chỉ sau 0.5 giây."
            ],
            points: 4,
          },
          {
            analysis: "Cơ chế tác động của cuộn biến dòng vi sai ZCT trong RCBO:",
            keyPoints: [
              "Khi bình thường: Dòng điện đi vào dây L bằng đúng dòng điện quay về dây N (I_L = I_N). Từ trường sinh ra ngược chiều và triệt tiêu nhau hoàn toàn trong lõi thép xuyến ZCT -> Từ thông tổng bằng 0 -> Cuộn thứ cấp không có điện.",
              "Khi chạm vỏ có tiếp địa (Kịch bản A): Dòng điện dây L = I_tải + I_rò. Dòng dây N chỉ bằng I_tải. Chênh lệch ΔI = I_rò ≥ 30mA chạy xuống đất -> Phá vỡ cân bằng từ thông -> Lõi ZCT xuất hiện từ thông biến thiên -> Sinh ra suất điện động cảm ứng kích hoạt nam châm điện nhả lẫy cơ khí ngắt tiếp điểm RCBO chỉ trong 0.03s - 0.05s, dập tắt dòng rò."
            ],
            points: 3,
          },
          {
            analysis: "Cảnh báo an toàn về cọc tiếp địa thay thế:",
            keyPoints: [
              "Ống nước hiện nay đa phần là ống nhựa PVC/PPR có đệm cao su cách điện, không có khả năng dẫn điện xuống đất.",
              "Khung nhôm cửa sổ chỉ gắn vào tường gạch khô, điện trở đất lên tới hàng trăm kΩ. Khi rò điện, toàn bộ khung nhôm cửa sổ của ngôi nhà sẽ nhiễm điện 220V, biến thành bẫy chết người cho bất kỳ ai vô tình chạm vào."
            ],
            dangerWarning: "Tuyệt đối không nối mass vào ống nước hoặc khung cửa. Bắt buộc phải đóng cọc đồng tiếp địa chuyên dụng sâu tối thiểu 2.5m.",
            points: 3,
          }
        ],
        totalPoints: 10,
      }
    ]
  },
  // ==========================================
  // ĐỀ THI HẾT MÔN DL-102: NHIỆT ĐỘNG HỌC & ĐỒ THỊ LOG P-H
  // ==========================================
  "dl-102": {
    id: "exam-dl-102",
    subjectCode: "DL-102",
    subjectTitle: "Nhiệt động học Ứng dụng & Môi chất lạnh",
    examName: "ĐỀ THI KẾT THÚC HỌC PHẦN: NHIỆT ĐỘNG HỌC & ĐỒ THỊ LOG P-H",
    durationMinutes: 60,
    description: "Kiểm tra năng lực đọc đồ thị Log p-h Mollier, tính toán độ quá nhiệt Superheat, độ quá lạnh Subcooling, năng suất lạnh riêng q0, công nén l và hệ số COP của chu trình lạnh.",
    passingScore: 60,
    multipleChoiceQuestions: [
      {
        id: "dl102-mc-1",
        type: "MULTIPLE_CHOICE",
        scenario: "Kỹ thuật viên nạp gas R32 cho máy điều hòa treo tường vào buổi trưa nắng 38°C.",
        question: "Đo được áp suất hút là 135 PSI (tra bảng P-T được T_sat = 5.7°C), nhiệt độ kẹp trên ống đồng hơi về là 12°C. Độ quá nhiệt Superheat là bao nhiêu và hệ thống hoạt động ra sao?",
        options: [
          { text: "SH = 6.3°C ➔ Trạng thái tối ưu chuẩn kỹ thuật (5°C - 8°C), máy nén an toàn", explanation: "Chính xác. SH = 12°C - 5.7°C = 6.3°C, nằm hoàn hảo trong dải vàng 5°C - 8°C." },
          { text: "SH = 17.7°C ➔ Máy đang bị thiếu gas nghiêm trọng", explanation: "Sai vì tính nhầm thành phép cộng (12 + 5.7)." },
          { text: "SH = 0.5°C ➔ Máy đang bị ngập dịch nặng", explanation: "Sai kết quả tính toán." },
          { text: "SH = -5.7°C ➔ Cần xả bớt gas ngay", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Độ quá nhiệt SH = T_đo_ống_hút - T_bão_hòa_bay_hơi (Dải chuẩn: 5°C ~ 8°C).",
      },
      {
        id: "dl102-mc-2",
        type: "MULTIPLE_CHOICE",
        scenario: "Xem xét đồ thị Log p-h của môi chất lạnh R410A.",
        question: "Quá trình tiết lưu môi chất từ áp suất ngưng tụ Pk xuống áp suất bay hơi P0 qua van tiết lưu là quá trình nhiệt động gì?",
        options: [
          { text: "Quá trình đoạn nhiệt đẳng Enthalpy (h = const, h3 = h4)", explanation: "Chính xác. Tiết lưu không sinh công và không trao đổi nhiệt với môi trường nên hằng số Enthalpy h = const." },
          { text: "Quá trình đẳng nhiệt (T = const)", explanation: "Sai. Nhiệt độ sau van tiết lưu tụt sâu xuống nhiệt độ bay hơi." },
          { text: "Quá trình đẳng áp (P = const)", explanation: "Sai. Áp suất tụt mạnh từ áp cao xuống áp thấp." },
          { text: "Quá trình đẳng entropy (s = const)", explanation: "Sai. Quá trình nén trong máy nén lý tưởng mới là đẳng entropy." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Quá trình tiết lưu lý tưởng là quá trình đẳng Enthalpy: h_trước_tiết_lưu = h_sau_tiết_lưu (h3 = h4).",
      },
      {
        id: "dl102-mc-3",
        type: "MULTIPLE_CHOICE",
        scenario: "Phân tích chỉ số tác động môi trường của các môi chất lạnh hiện đại.",
        question: "Chỉ số ODP (Ozone Depletion Potential) và GWP (Global Warming Potential) của gas R32 so với gas R22 và R410A như thế nào?",
        options: [
          { text: "R32 có ODP = 0 (không phá hủy tầng Ozone) và GWP = 675 (thấp hơn 3 lần so với R410A có GWP = 2088)", explanation: "Chính xác. R32 là HFC đơn chất thân thiện với môi trường và có GWP thấp." },
          { text: "R32 có ODP = 0.05 và GWP = 1810", explanation: "Sai. R32 không chứa Clo nên ODP tuyệt đối bằng 0." },
          { text: "R32 có GWP cao hơn R410A", explanation: "Sai. GWP của R32 chỉ bằng 1/3 so với R410A." },
          { text: "R32 phá hủy tầng ozone mạnh nhất", explanation: "Sai. R22 (HCFC) mới là chất phá hủy tầng ozone (ODP = 0.055)." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Môi chất hiện đại R32: ODP = 0 và GWP = 675.",
      },
      {
        id: "dl102-mc-4",
        type: "MULTIPLE_CHOICE",
        scenario: "Kiểm tra nhiệt độ ngưng tụ của dàn nóng điều hòa trong phòng thí nghiệm kiểm định.",
        question: "Độ quá lạnh Subcooling đo được là 1°C. Hiện tượng gì đang xảy ra trong hệ thống?",
        options: [
          { text: "Dàn nóng giải nhiệt kém hoặc hệ thống đang bị thiếu gas, đáy dàn ngưng chưa tích đủ lỏng gây hiện tượng sủi bọt Flash Gas trước van tiết lưu", explanation: "Chính xác. Subcooling chuẩn là 4°C - 8°C. SC = 1°C chứng tỏ gas chưa ngưng tụ hoàn toàn thành lỏng nguyên chất." },
          { text: "Hệ thống đang thừa gas nghiêm trọng", explanation: "Sai. Thừa gas làm Subcooling tăng cao (> 10°C) do lỏng ngập các hàng ống dàn nóng." },
          { text: "Máy nén bị hỏng van lá", explanation: "Sai." },
          { text: "Dàn lạnh bị đóng tuyết", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Subcooling chuẩn: 4°C ~ 8°C. Subcooling < 2°C cảnh báo thiếu gas hoặc giải nhiệt yếu.",
      },
      {
        id: "dl102-mc-5",
        type: "MULTIPLE_CHOICE",
        scenario: "Tính toán hệ số hiệu quả năng lượng làm lạnh COP (Coefficient of Performance).",
        question: "Một máy điều hòa tiêu thụ công suất điện nén là P_điện = 1.0 kW và tạo ra năng suất làm lạnh Q0 = 3.5 kW (tương đương 12,000 BTU/h). Hệ số COP bằng bao nhiêu?",
        options: [
          { text: "COP = 3.5", explanation: "Chính xác. COP = Q0 / P = 3.5 kW / 1.0 kW = 3.5 (nghĩa là 1 kW điện sinh ra 3.5 kW nhiệt lạnh)." },
          { text: "COP = 0.28", explanation: "Sai vì lấy ngược 1.0 / 3.5." },
          { text: "COP = 4.5", explanation: "Sai số liệu." },
          { text: "COP = 12.0", explanation: "Sai vì nhầm lẫn với chỉ số BTU." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Hệ số làm lạnh COP = Năng suất lạnh Q0 (kW) / Công suất tiêu thụ điện P (kW).",
      }
    ],
    mathEssayQuestions: [
      {
        id: "dl102-math-1",
        type: "ESSAY_MATH",
        title: "BÀI TOÁN XÁC ĐỊNH CHU TRÌNH LẠNH R32 TRÊN ĐỒ THỊ LOG P-H & TÍNH COP",
        scenario: "Một chu trình máy lạnh R32 hoạt động ở nhiệt độ bay hơi T0 = 5°C (áp suất P0 = 9.3 bar) và nhiệt độ ngưng tụ Tk = 45°C (áp suất Pk = 27.2 bar). Hơi hút vào máy nén được quá nhiệt lên T1 = 12°C. Lỏng ra khỏi dàn ngưng được quá lạnh xuống T3 = 40°C.\nTra bảng Enthalpy môi chất R32 ta có các giá trị:\n- Trạng thái 1 (Hơi quá nhiệt vào lốc): h1 = 525 kJ/kg\n- Trạng thái 2 (Hơi nén sau lốc): h2 = 565 kJ/kg\n- Trạng thái 3 (Lỏng quá lạnh ra khỏi dàn ngưng): h3 = 265 kJ/kg\n- Trạng thái 4 (Hỗn hợp sau van tiết lưu): h4 = h3 = 265 kJ/kg\nLưu lượng khối lượng môi chất tuần hoàn qua hệ thống là m = 0.025 kg/s.",
        givenData: [
          { symbol: "h1", label: "Enthalpy đầu hút máy nén", value: "525", unit: "kJ/kg" },
          { symbol: "h2", label: "Enthalpy đầu đẩy máy nén", value: "565", unit: "kJ/kg" },
          { symbol: "h3 = h4", label: "Enthalpy sau tiết lưu", value: "265", unit: "kJ/kg" },
          { symbol: "m", label: "Lưu lượng khối lượng", value: "0.025", unit: "kg/s" },
        ],
        questions: [
          "Câu 1 (3 điểm): Tính năng suất lạnh riêng q0 (kJ/kg) và năng suất lạnh toàn phần Q0 (kW).",
          "Câu 2 (3 điểm): Tính công nén riêng l (kJ/kg) và công suất điện máy nén tiêu thụ P_nén (kW).",
          "Câu 3 (4 điểm): Tính hệ số làm lạnh lý thuyết COP của chu trình và nhiệt lượng dàn nóng thải ra môi trường Qk (kW)."
        ],
        formulaHint: "q0 = h1 - h4. Q0 = m × q0. l = h2 - h1. P = m × l. COP = q0 / l = Q0 / P. Qk = m × (h2 - h3).",
        stepByStepSolution: [
          {
            step: "Bước 1: Tính năng suất lạnh riêng q0 và công suất lạnh Q0",
            calculation: "q0 = h1 - h4 = 525 - 265 = 260 kJ/kg. Q0 = m × q0 = 0.025 × 260",
            result: "q0 = 260 kJ/kg, Q0 = 6.5 kW (~22,000 BTU/h)",
            note: "Mỗi kg môi chất R32 bay hơi hấp thu được 260 kJ nhiệt lượng từ phòng.",
            points: 3,
          },
          {
            step: "Bước 2: Tính công nén riêng l và công suất điện nén P",
            calculation: "l = h2 - h1 = 565 - 525 = 40 kJ/kg. P = m × l = 0.025 × 40",
            result: "l = 40 kJ/kg, P = 1.0 kW",
            note: "Máy nén tiêu thụ 1.0 kW cơ công suất để nén lượng gas tương ứng.",
            points: 3,
          },
          {
            step: "Bước 3: Tính hệ số COP và nhiệt thải dàn nóng Qk",
            calculation: "COP = q0 / l = 260 / 40 = 6.5. Qk = m × (h2 - h3) = 0.025 × (565 - 265) = 0.025 × 300 = 7.5 kW",
            result: "COP = 6.5, Qk = 7.5 kW",
            note: "Hệ số COP đạt 6.5 chứng minh chu trình R32 có độ quá nhiệt và quá lạnh tối ưu mang lại hiệu quả tiết kiệm điện vượt trội.",
            points: 4,
          }
        ],
        evaluationCriteria: [
          "Tính đúng năng suất lạnh riêng q0 = 260 kJ/kg và năng suất lạnh toàn phần Q0 = 6.5 kW.",
          "Tính đúng công nén riêng l = 40 kJ/kg và công suất nén P = 1.0 kW.",
          "Tính đúng hệ số hiệu quả COP = 6.5 và nhiệt thải ngưng tụ Qk = 7.5 kW.",
          "Nắm vững định luật bảo toàn năng lượng trong chu trình máy lạnh."
        ],
        totalPoints: 10,
      }
    ],
    circuitEssayQuestions: [
      {
        id: "dl102-circuit-1",
        type: "ESSAY_CIRCUIT",
        title: "PHÂN TÍCH SƠ ĐỒ ĐẤU DÂY KHỞI ĐỘNG VÀ BẢO VỆ MÁY NÉN (C-R-S & RƠ-LE NHIỆT OLP)",
        circuitType: "COMPRESSOR_MOTOR",
        circuitDescription: "Sơ đồ nguyên lý mạch khởi động máy nén 1 pha động cơ không đồng bộ rô-to lồng sóc: Cọc Chung (C), Cọc Chạy (R), Cọc Đề (Start - S), Tụ ngậm dầu (Run Capacitor 35uF) và Rơ-le bảo vệ quá tải nhiệt Overload Protector (OLP) gắn tiếp xúc thân vỏ lốc.",
        testPoints: [
          {
            point: "TP1",
            location: "Cọc Chung (C) sau rơ-le nhiệt OLP",
            nominalValue: "220V AC (khi lốc chạy)",
            significance: "Cấp nguồn trực tiếp vào điểm nút chung 2 cuộn dây."
          },
          {
            point: "TP2",
            location: "Cọc Chạy (R) nối dây nguội N",
            nominalValue: "0V AC so với dây N",
            significance: "Chân làm việc liên tục chịu dòng tải chính của máy nén."
          },
          {
            point: "TP3",
            location: "Cọc Đề (S) nối qua tụ ngậm 35uF",
            nominalValue: "280V ~ 350V AC khi đang vận hành",
            significance: "Điện áp lệch pha do tụ sinh ra để duy trì từ trường quay."
          }
        ],
        diagnosticQuestions: [
          "Câu hỏi 1 (4 điểm): Trình bày vai trò của tụ ngậm tạo góc lệch pha 90 độ giữa dòng điện cuộn Đề và cuộn Chạy. Hiện tượng gì xảy ra nếu tụ ngậm bị đứt hở mạch hoàn toàn?",
          "Câu hỏi 2 (3 điểm): Rơ-le nhiệt OLP (Klixon) bảo vệ máy nén dựa trên 2 yếu tố vật lý nào? Khi OLP nhảy ngắt mạch, cần kiểm tra những thông số gì trước khi cho lốc chạy lại?",
          "Câu hỏi 3 (3 điểm): Dùng đồng hồ VOM đo được điện áp tại cọc S lên tới 320V AC trong khi nguồn điện nhà chỉ có 220V AC. Máy nén có bị quá áp hay không? Giải thích bản chất."
        ],
        stepByStepSolution: [
          {
            analysis: "Vai trò lệch pha của tụ ngậm:",
            keyPoints: [
              "Động cơ 1 pha không có từ trường quay tự nhiên. Tụ ngậm làm dòng điện cuộn Đề sớm pha 90 độ so với cuộn Chạy, tạo nên từ trường quay hình elip kéo rô-to quay liên tục.",
              "Nếu tụ hỏng đứt (C = 0): Từ trường chỉ là từ trường đập mạch, rô-to đứng im rung giật tại chỗ, dòng điện tăng gấp 5 lần làm nhảy rơ-le nhiệt OLP sau 3 giây."
            ],
            points: 4,
          },
          {
            analysis: "Nguyên lý bảo vệ kép của rơ-le nhiệt OLP:",
            keyPoints: [
              "Bảo vệ kép bởi: (1) Dòng điện chạy qua thanh lưỡng kim nhiệt sinh nhiệt Joule (I²Rt); và (2) Nhiệt độ dẫn truyền từ vỏ lốc máy nén.",
              "Khi OLP nhảy ngắt: Bắt buộc kiểm tra độ quá nhiệt Superheat (có bị thiếu gas làm lốc quá nhiệt không), kiểm tra quạt dàn nóng và kiểm tra dung lượng tụ ngậm."
            ],
            points: 3,
          },
          {
            analysis: "Hiện tượng điện áp 320V trên cọc S:",
            keyPoints: [
              "Đây là hiện tượng cộng hưởng điện áp hoàn toàn bình thường trong mạch R-L-C nối tiếp.",
              "Suất điện động cảm ứng sinh ra trên cuộn Đề cộng hưởng pha với điện áp tích phóng trên tụ ngậm, tạo nên điện áp 300V-350V AC khi động cơ đang quay đúng tua."
            ],
            dangerWarning: "Không được nhầm điện áp 320V cọc S là nguồn điện lưới bị quá áp mà cắt bỏ tụ.",
            points: 3,
          }
        ],
        totalPoints: 10,
      }
    ]
  },

  // ==========================================
  // ĐỀ THI HẾT MÔN DL-204: CẢM BIẾN NHIỆT NTC & MODULE IPM IGBT
  // ==========================================
  "dl-204": {
    id: "exam-dl-204",
    subjectCode: "DL-204",
    subjectTitle: "Linh kiện & Cảm biến Điện tử Lạnh Inverter",
    examName: "ĐỀ THI KẾT THÚC HỌC PHẦN: CẢM BIẾN NHIỆT NTC & MODULE IPM IGBT",
    durationMinutes: 60,
    description: "Đánh giá năng lực đo kiểm tra trị số cảm biến nhiệt điện trở âm NTC, mạch phân áp vi xử lý, cấu trúc 6 van IGBT bên trong module công suất IPM và phương pháp kích mở van bằng xung PWM.",
    passingScore: 60,
    multipleChoiceQuestions: [
      {
        id: "dl204-mc-1",
        type: "MULTIPLE_CHOICE",
        scenario: "Kiểm tra cảm biến nhiệt độ gắn trên dàn trao đổi nhiệt điều hòa Inverter.",
        question: "Khi nhiệt độ môi trường tăng từ 20°C lên 35°C, điện trở của cảm biến NTC sẽ biến thiên như thế nào?",
        options: [
          { text: "Điện trở giảm dần theo đường cong phi tuyến", explanation: "Chính xác. NTC có hệ số nhiệt điện trở âm (Negative Temperature Coefficient), nhiệt độ tăng thì điện trở giảm." },
          { text: "Điện trở tăng tuyến tính tỷ lệ thuận", explanation: "Sai. Đây là đặc tính của cảm biến PTC hoặc điện trở kim loại." },
          { text: "Điện trở không đổi", explanation: "Sai." },
          { text: "Điện trở rơi ngay về 0 Ohm", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Đặc tính cảm biến NTC: T (°C) TĂNG ➔ R (kΩ) GIẢM.",
      },
      {
        id: "dl204-mc-2",
        type: "MULTIPLE_CHOICE",
        scenario: "Dùng thang đo Diode của đồng hồ VOM để kiểm tra 6 van IGBT trong khối IPM.",
        question: "Tại sao khi đo phân cực thuận giữa cực N(-) và 3 chân U, V, W ta lại đo được sụt áp khoảng 0.4V - 0.55V?",
        options: [
          { text: "Do đồng hồ đo được điện áp rơi trên diode dập xung ngược (Flyback Diode) mắc song song ngược cực giữa C-E của từng van IGBT", explanation: "Chính xác. Bên trong module IPM luôn tích hợp sẵn các diode chạy song song ngược để xả năng lượng phản kháng từ cuộn dây máy nén." },
          { text: "Do điện trở kênh dẫn của transistor IGBT bằng 0.4 Ohm", explanation: "Sai. Thang đo Diode đo điện áp rơi (Volt) chứ không phải điện trở Ohm." },
          { text: "Do tụ điện bên trong phóng điện", explanation: "Sai." },
          { text: "Do module IPM đã bị rò điện", explanation: "Sai. 0.4V-0.55V là trị số hoàn toàn bình thường." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Mỗi van IGBT trong IPM có một diode xả xung ngược song song, đo thang diode cho sụt áp thuận ~0.45V.",
      },
      {
        id: "dl204-mc-3",
        type: "MULTIPLE_CHOICE",
        scenario: "Điều hòa Daikin báo mã lỗi C9 trên remote cầm tay.",
        question: "Mã lỗi C9 chỉ ra lỗi ở linh kiện nào và giá trị điện trở chuẩn ở 25°C là bao nhiêu?",
        options: [
          { text: "Lỗi cảm biến nhiệt độ gió hồi phòng dàn lạnh, giá trị chuẩn là 20 kΩ ở 25°C", explanation: "Chính xác. C9 là cảm biến gió phòng Daikin (20kΩ @ 25°C)." },
          { text: "Lỗi cảm biến ống đồng dàn lạnh, giá trị chuẩn là 5 kΩ", explanation: "Sai. Cảm biến ống đồng Daikin báo lỗi C4." },
          { text: "Lỗi cảm biến ống đẩy máy nén, giá trị chuẩn là 200 kΩ", explanation: "Sai. Cảm biến ống đẩy Daikin báo lỗi J3." },
          { text: "Lỗi cảm biến dàn nóng, giá trị chuẩn là 10 kΩ", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Mã lỗi Daikin: C9 = Sensor gió phòng (20kΩ @ 25°C); C4 = Sensor ống đồng dàn lạnh (20kΩ @ 25°C).",
      },
      {
        id: "dl204-mc-4",
        type: "MULTIPLE_CHOICE",
        scenario: "Kiểm tra động cơ quạt dàn lạnh DC Inverter loại 5 dây (Vm, GND, Vcc, Vsp, FG).",
        question: "Dây Vsp có chức năng gì và dải điện áp làm việc bình thường là bao nhiêu?",
        options: [
          { text: "Là chân điện áp điều khiển tốc độ quạt (Speed Control) từ vi xử lý, biến thiên từ 1.5V DC (chạy chậm) đến 4.8V DC (chạy tối đa)", explanation: "Chính xác. Điện áp DC tỷ lệ với tốc độ quay mong muốn của lồng sóc." },
          { text: "Là nguồn cấp động lực DC 300V cho cuộn dây stator", explanation: "Sai. Nguồn động lực 300V là chân Vm." },
          { text: "Là chân hồi tiếp xung Hall về vi xử lý", explanation: "Sai. Chân hồi tiếp xung Hall là chân FG." },
          { text: "Là chân cấp nguồn nuôi vi mạch 15V", explanation: "Sai. Nguồn 15V nuôi IC Hall là chân Vcc." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Chân Vsp của quạt DC: 1.5V ~ 5V DC điều khiển tốc độ quay theo lệnh của vi xử lý.",
      },
      {
        id: "dl204-mc-5",
        type: "MULTIPLE_CHOICE",
        scenario: "Bo mạch Inverter sử dụng mạch bảo vệ mất pha (Phase Failure Detection) ngõ ra máy nén.",
        question: "Nếu 1 trong 3 dây U, V, W bị tuột hoặc 1 nhánh IGBT bị đứt chân kích, máy nén sẽ phản ứng ra sao?",
        options: [
          { text: "Máy nén rung giật mạnh trong 1-2 giây rồi dừng hẳn, bo mạch khóa và báo lỗi quá dòng DC (L5 trên Daikin hoặc F99 trên Panasonic)", explanation: "Chính xác. Mất pha làm lệch từ trường stator, dòng điện ở 2 pha còn lại tăng vọt khiến biến dòng CT hoặc shunt resistor kích hoạt bảo vệ quá dòng tức thì." },
          { text: "Máy nén vẫn chạy bình thường với công suất giảm 1/3", explanation: "Sai. Động cơ xoay chiều 3 pha không thể khởi động nếu mất 1 pha." },
          { text: "Máy nén đảo chiều quay ngược lại", explanation: "Sai." },
          { text: "Quạt dàn nóng sẽ tăng tốc gấp đôi để bù lại", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Mất pha ngõ ra lốc Inverter: Gây dòng điện tăng vọt, vi xử lý cắt lệnh phát xung IPM trong 2 giây.",
      }
    ],
    mathEssayQuestions: [
      {
        id: "dl204-math-1",
        type: "ESSAY_MATH",
        title: "BÀI TOÁN TÍNH TOÁN ĐIỆN ÁP CẦU PHÂN ÁP SENSOR NTC VÀ CHẨN ĐOÁN VI XỬ LÝ",
        scenario: "Trên bo mạch điều hòa, cảm biến nhiệt độ NTC (ký hiệu R_ntc) được mắc trong mạch cầu phân áp với một điện trở định thiên cố định R1 = 10 kΩ nối lên nguồn chuẩn Vcc = 5.0V DC. Đầu ra phân áp V_out được đưa trực tiếp vào chân chuyển đổi tương tự - số (ADC) của vi xử lý vi điều khiển.\nỞ nhiệt độ chuẩn 25°C, cảm biến có điện trở R_ntc = 10.0 kΩ.\nKhi nhiệt độ phòng tăng lên 35°C (ngày nắng nóng), điện trở cảm biến giảm xuống còn R_ntc = 6.5 kΩ.\nKhi nhiệt độ phòng giảm xuống 18°C (lạnh sâu), điện trở cảm biến tăng lên R_ntc = 14.0 kΩ.",
        givenData: [
          { symbol: "Vcc", label: "Điện áp nguồn chuẩn", value: "5.0", unit: "V DC" },
          { symbol: "R1", label: "Điện trở định thiên", value: "10", unit: "kΩ (10.000 Ω)" },
          { symbol: "R_ntc (25°C)", label: "Trở kháng ở 25°C", value: "10.0", unit: "kΩ" },
          { symbol: "R_ntc (35°C)", label: "Trở kháng ở 35°C", value: "6.5", unit: "kΩ" },
          { symbol: "R_ntc (18°C)", label: "Trở kháng ở 18°C", value: "14.0", unit: "kΩ" },
        ],
        questions: [
          "Câu 1 (3 điểm): Tính điện áp V_out (V) đưa về chân vi xử lý ở nhiệt độ chuẩn 25°C.",
          "Câu 2 (3 điểm): Tính điện áp V_out (V) khi nhiệt độ phòng tăng lên 35°C và khi giảm xuống 18°C. Rút ra quy luật biến thiên của điện áp V_out theo nhiệt độ phòng.",
          "Câu 3 (4 điểm): Nếu dùng que đo VOM đo chân ADC thấy điện áp = 5.0V DC hoặc = 0.0V DC, hãy chẩn đoán các nguyên nhân hư hỏng phần cứng."
        ],
        formulaHint: "Mạch cầu phân áp: V_out = Vcc × [ R_ntc / (R1 + R_ntc) ].",
        stepByStepSolution: [
          {
            step: "Bước 1: Tính điện áp V_out ở 25°C",
            calculation: "V_out (25°C) = 5.0 × [ 10.0 / (10.0 + 10.0) ] = 5.0 × (10 / 20) = 5.0 × 0.5",
            result: "V_out = 2.50V DC",
            note: "Tại 25°C, hai điện trở bằng nhau nên điện áp chia đôi đúng 2.5V.",
            points: 3,
          },
          {
            step: "Bước 2: Tính điện áp V_out ở 35°C và 18°C",
            calculation: "- Ở 35°C: V_out = 5.0 × [ 6.5 / (10.0 + 6.5) ] = 5.0 × (6.5 / 16.5) = 1.97V DC\n- Ở 18°C: V_out = 5.0 × [ 14.0 / (10.0 + 14.0) ] = 5.0 × (14.0 / 24.0) = 2.92V DC",
            result: "Nhiệt độ Tăng (25°C ➔ 35°C) thì V_out GIẢM (2.5V ➔ 1.97V). Nhiệt độ Giảm (25°C ➔ 18°C) thì V_out TĂNG (2.5V ➔ 2.92V).",
            note: "Vi xử lý dựa vào điện áp tụt để biết phòng đang nóng lên và ra lệnh tăng tua máy nén.",
            points: 3,
          },
          {
            step: "Bước 3: Chẩn đoán ca bệnh VOM đo 5.0V hoặc 0.0V",
            calculation: "- Khi V_out = 5.0V DC: Sensor bị đứt hở mạch (R_ntc = ∞) hoặc tuột giắc cắm, kéo toàn bộ áp lên 5V.\n- Khi V_out = 0.0V DC: Sensor bị chập ngắn mạch (R_ntc = 0Ω) hoặc tụ gốm lọc nhiễu mắc song song chân ADC bị đánh thủng nối mass.",
            result: "V_out = 5V ➔ Đứt sensor / hở giắc; V_out = 0V ➔ Chập sensor / chập tụ gốm lọc mass.",
            note: "Đây là phương pháp cô lập nhanh pan cảm biến không cần rút giắc ra ngoài.",
            points: 4,
          }
        ],
        evaluationCriteria: [
          "Tính đúng điện áp phân áp V_out ở 25°C = 2.50V DC.",
          "Tính đúng điện áp V_out ở 35°C (1.97V) và 18°C (2.92V), rút ra đúng quy luật nghịch biến.",
          "Phân tích chính xác nguyên nhân pan bệnh khi đo được 5.0V (đứt/hở) và 0.0V (chập).",
          "Nắm vững kỹ năng đo kiểm tra chân ADC trên bo mạch vi xử lý."
        ],
        totalPoints: 10,
      }
    ],
    circuitEssayQuestions: [
      {
        id: "dl204-circuit-1",
        type: "ESSAY_CIRCUIT",
        title: "PHÂN TÍCH SƠ ĐỒ CẦU NGHỊCH LƯU 6 VAN IGBT TRONG MODULE IPM VÀ MẠCH BOOTSTRAP",
        circuitType: "DC_BUS_POWER",
        circuitDescription: "Sơ đồ nguyên lý khối công suất biến tần 3 pha: Đường nguồn DC Bus 300V từ cầu Diode chỉnh lưu và cụm tụ hóa 450V, module IPM tích hợp 6 van IGBT (3 van High-side và 3 van Low-side), 3 nhánh tụ Bootstrap cấp áp cực cổng và trở Shunt giám sát quá dòng chân mass N(-).",
        testPoints: [
          {
            point: "TP1",
            location: "Cực dương DC Bus P(+) trên tụ lọc nguồn chính",
            nominalValue: "300V - 320V DC",
            significance: "Điện áp một chiều phẳng cung cấp cho cực Collector 3 van nhánh trên."
          },
          {
            point: "TP2",
            location: "Điểm giữa 3 pha ngõ ra cọc lốc (U, V, W)",
            nominalValue: "Xung nhịp PWM biến tần (điện áp hiệu dụng 50V ~ 200V AC 3 pha)",
            significance: "Cấp điện áp 3 pha có tần số thay đổi điều khiển tốc độ máy nén."
          },
          {
            point: "TP3",
            location: "Chân điện trở Shunt nối cực N(-) về mass 0V",
            nominalValue: "0V DC (khi không tải), < 0.5V DC (khi đầy tải)",
            significance: "Cảm biến dòng điện thời gian thực bảo vệ ngắn mạch và quá dòng tức thời."
          }
        ],
        diagnosticQuestions: [
          "Câu hỏi 1 (4 điểm): Trình bày nguy cơ trùng dẫn khi cả hai van IGBT cùng một nhánh (High-side và Low-side) cùng kích mở đồng thời. Vi xử lý sử dụng cơ chế gì để loại trừ nguy cơ này?",
          "Câu hỏi 2 (3 điểm): Giải thích vai trò của 3 tụ hóa Bootstrap trong việc kích mở 3 van IGBT nhánh trên (High-side). Hiện tượng gì xảy ra nếu 1 trong 3 tụ Bootstrap bị khô giảm dung lượng?",
          "Câu hỏi 3 (3 điểm): Trình bày các bước kiểm tra cách ly nguội 6 van IGBT bằng thang đo Diode của đồng hồ VOM trước khi quyết định thay thế module IPM mới."
        ],
        stepByStepSolution: [
          {
            analysis: "Nguy cơ trùng dẫn và khoảng trễ Dead-time:",
            keyPoints: [
              "Nếu UH và UL cùng dẫn đồng thời, thanh dẫn 300V sẽ bị nối tắt trực tiếp xuống mass 0V -> Dòng ngắn mạch hàng ngàn Ampe đánh nổ nát cấu trúc bán dẫn IPM và nổ cầu chì nguồn.",
              "Vi xử lý bắt buộc chèn một khoảng thời gian trễ Dead-time (1.5 - 3 micro-giây) giữa lúc tắt van này và bật van kia để đảm bảo van trước đã khóa hoàn toàn."
            ],
            points: 4,
          },
          {
            analysis: "Vai trò của tụ Bootstrap và hậu quả khi tụ khô:",
            keyPoints: [
              "Van High-side có cực Emitter nối vào cọc pha máy nén (điện thế dao động 0-300V). Tụ Bootstrap tích điện khi van Low-side mở, để sau đó cung cấp điện thế cao hơn cọc pha 15V giúp IGBT High-side dẫn bão hòa.",
              "Nếu tụ Bootstrap khô giảm dung lượng: Điện áp kích cổng thiếu hụt khiến IGBT rơi vào vùng tích cực (chưa dẫn bão hòa), nội trở tăng cao sinh nhiệt khổng lồ làm nổ IGBT chỉ sau vài phút chạy tải."
            ],
            points: 3,
          },
          {
            analysis: "Quy trình đo kiểm tra nguội 6 van IPM:",
            keyPoints: [
              "Ngắt điện, xả sạch tụ 300V. Đặt que đen ở P, que đỏ lần lượt vào U, V, W: Phải có sụt áp diode thuận 0.4V - 0.55V cân đối cả 3 chân. Đảo que đo ngược lại phải ngắt vô cùng (OL).",
              "Đặt que đỏ ở N, que đen lần lượt vào U, V, W: Phải có sụt áp diode thuận 0.4V - 0.55V cân đối. Đảo que đo phải ngắt vô cùng (OL).",
              "Nếu có bất kỳ chân nào đo được 0Ω ở cả 2 chiều: Module IPM đã bị đánh thủng ngắn mạch, bắt buộc phải thay thế."
            ],
            dangerWarning: "Trước khi đo IPM bắt buộc phải xả sạch điện áp tụ DC 300V để bảo vệ tính mạng và đồng hồ đo.",
            points: 3,
          }
        ],
        totalPoints: 10,
      }
    ]
  },

  // ==========================================
  // ĐỀ THI HẾT MÔN DL-301: HỆ THỐNG KHO LẠNH CÔNG NGHIỆP
  // ==========================================
  "dl-301": {
    id: "exam-dl-301",
    subjectCode: "DL-301",
    subjectTitle: "Hệ thống Kho lạnh Công nghiệp",
    examName: "ĐỀ THI KẾT THÚC HỌC PHẦN: KỸ THUẬT KHO LẠNH & XẢ ĐÁ GAS NÓNG",
    durationMinutes: 60,
    description: "Đánh giá kiến thức vận hành hệ thống kho lạnh âm sâu, chu trình xả băng bằng hơi quá nhiệt gas nóng, tiêu chuẩn thử bền - thử kín áp lực bằng khí Nitơ theo TCVN 6104 và an toàn dầu bôi trơn.",
    passingScore: 60,
    multipleChoiceQuestions: [
      {
        id: "dl301-mc-1",
        type: "MULTIPLE_CHOICE",
        scenario: "Hệ thống kho trữ đông thủy sản nhiệt độ -20°C sử dụng môi chất R404A.",
        question: "Phương pháp xả đá dàn bay hơi bằng Gas nóng (Hot Gas Defrost) lấy nhiệt từ đâu để làm tan băng?",
        options: [
          { text: "Trích hơi nén quá nhiệt áp suất cao từ đầu đẩy máy nén đưa trực tiếp vào dàn lạnh", explanation: "Chính xác. Hơi quá nhiệt 70°C-90°C từ đầu xả máy nén mang ẩn nhiệt ngưng tụ cực lớn, làm tan băng từ trong lòng ống ra ngoài rất nhanh." },
          { text: "Lấy nước nóng từ tháp giải nhiệt phun lên cánh nhôm", explanation: "Sai. Nước phun vào phòng -20°C sẽ đóng băng ngay lập tức." },
          { text: "Bật quạt dàn lạnh chạy đảo chiều", explanation: "Sai." },
          { text: "Dùng bình chứa lỏng cao áp", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Xả đá gas nóng: Dùng hơi quá nhiệt đầu đẩy máy nén để giải phóng nhiệt ngưng tụ làm tan băng dàn lạnh.",
      },
      {
        id: "dl301-mc-2",
        type: "MULTIPLE_CHOICE",
        scenario: "Thử áp lực đường ống đồng hệ thống lạnh công nghiệp bằng khí Nitơ (N2) theo tiêu chuẩn an toàn TCVN 6104.",
        question: "Quy trình thử kín áp lực yêu cầu ngâm áp trong bao lâu và có được dùng bình Oxy thay thế không?",
        options: [
          { text: "Ngâm áp ở áp suất thử kín tối thiểu 24 giờ; TUYỆT ĐỐI CẤM dùng khí Oxy vì Oxy kết hợp với màng dầu bôi trơn sẽ gây nổ thể tích như bom", explanation: "Chính xác. Cấm tuyệt đối oxy và khí nén thường. Chỉ dùng khí Nitơ khô tinh khiết." },
          { text: "Ngâm áp 15 phút là đủ; Có thể dùng bình Oxy nếu hết Nitơ", explanation: "Sai lầm chết người. Dùng oxy đã gây ra hàng loạt vụ nổ kinh hoàng cướp đi sinh mạng nhiều thợ điện lạnh." },
          { text: "Ngâm áp 2 giờ bằng gas R22", explanation: "Sai. Gas lạnh đắt tiền và xả ra môi trường gây phá hủy tầng ozone." },
          { text: "Không cần thử áp nếu mối hàn nhìn đẹp mắt", explanation: "Sai hoàn toàn." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Thử áp lực: Duy nhất dùng khí Nitơ khô (N2). Cấm tuyệt đối Oxy (O2) gây nổ áp lực hóa dầu.",
      },
      {
        id: "dl301-mc-3",
        type: "MULTIPLE_CHOICE",
        scenario: "Lắp đặt cụm máy nén kho lạnh trên tầng lửng, dàn bay hơi đặt trong phòng kho thấp hơn máy nén 6 mét.",
        question: "Trên đường ống hút hơi về (Suction Line), biện pháp kỹ thuật bắt buộc để đưa dầu bôi trơn hồi về máy nén là gì?",
        options: [
          { text: "Làm bẫy dầu chữ U (Oil Trap) ở chân ống đứng và cứ mỗi 3 - 4 mét ống đứng làm thêm một bẫy dầu tiếp theo", explanation: "Chính xác. Bẫy dầu gom lượng dầu lại tạo nút chặn để vận tốc hơi gas thổi bùng dầu lên từng nấc thang hồi về các-te." },
          { text: "Tăng đường kính ống hút lên gấp đôi", explanation: "Sai. Tăng đường kính làm giảm vận tốc hơi gas, dầu càng dễ bị đọng lại không về được." },
          { text: "Đổ thêm 5 lít dầu vào máy nén mỗi tháng", explanation: "Sai. Đổ thừa dầu sẽ gây ngập dầu và giảm trao đổi nhiệt dàn lạnh." },
          { text: "Tháo bỏ phin lọc gas", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Ống đứng đường hút cao > 3m: Bắt buộc làm bẫy dầu chữ U chân dốc và mỗi 3-4m tiếp theo.",
      },
      {
        id: "dl301-mc-4",
        type: "MULTIPLE_CHOICE",
        scenario: "Bình tách lỏng (Suction Accumulator) đặt ở đầu vào máy nén kho lạnh.",
        question: "Chi tiết lỗ hồi dầu (Oil Return Orifice) ở đáy ống chữ U bên trong bình tách lỏng có chức năng gì?",
        options: [
          { text: "Tiết lưu và hút lượng dầu bôi trơn đọng ở đáy bình hòa lẫn từ từ vào dòng hơi gas để hồi về lốc, đồng thời có lưới lọc chống cặn bẩn làm tắc lỗ", explanation: "Chính xác. Lỗ hồi dầu có kích thước tính toán kỹ lưỡng (~1.0 - 1.5mm) để chỉ cho dầu và lượng lỏng rất nhỏ qua, ngăn ngập dịch ồ ạt." },
          { text: "Xả nước ngưng tụ ra ngoài", explanation: "Sai. Hệ thống kín không có nước tự do." },
          { text: "Để nạp gas bổ sung khi thiếu", explanation: "Sai." },
          { text: "Để đo áp suất chân không", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Lỗ hồi dầu đáy bình tách lỏng: Hồi dầu bôi trơn liên tục về các-te máy nén có kiểm soát lưu lượng.",
      },
      {
        id: "dl301-mc-5",
        type: "MULTIPLE_CHOICE",
        scenario: "Dầu bôi trơn tổng hợp Ester (POE) dùng trong hệ thống kho lạnh R404A/R507.",
        question: "Đặc tính nguy hiểm nhất của dầu POE khi tiếp xúc với không khí ẩm môi trường là gì?",
        options: [
          { text: "Tính hút ẩm cực mạnh, phản ứng thủy phân với nước sinh ra axit hữu cơ ăn mòn cuộn dây stator và làm tắc van tiết lưu", explanation: "Chính xác. Dầu POE hút ẩm rất nhanh, lon dầu mở nắp quá 15 phút không dùng hết sẽ bị biến tính sinh axit." },
          { text: "Dầu POE dễ bốc cháy tự phát", explanation: "Sai. Điểm chớp cháy của dầu POE rất cao (> 240°C)." },
          { text: "Dầu POE làm đông cứng gas lạnh", explanation: "Sai." },
          { text: "Dầu POE làm nở mục cao su gioăng cửa kho", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Dầu POE có tính hút ẩm cực mạnh: Hút ẩm ➔ Sinh axit hữu cơ ➔ Ăn mòn cháy cuộn dây động cơ.",
      }
    ],
    mathEssayQuestions: [
      {
        id: "dl301-math-1",
        type: "ESSAY_MATH",
        title: "BÀI TOÁN BÙ TRỪ NHIỆT ĐỘ KHI THỬ KÍN HỆ THỐNG KHO LẠNH BẰNG KHÍ NITƠ",
        scenario: "Sau khi thi công xong hệ thống đường ống kho lạnh thương mại, kỹ sư nạp khí Nitơ khô vào hệ thống để thử kín ở áp suất ban đầu P1 = 28.0 bar (áp suất tuyệt đối P1_abs = 29.0 bar) tại thời điểm 10h sáng khi nhiệt độ môi trường là t1 = 32°C.\nSau 24 giờ ngâm áp (10h sáng hôm sau), đồng hồ áp kế đo được áp suất P2 = 27.2 bar (P2_abs = 28.2 bar). Tuy nhiên, tại thời điểm này trời đổ mưa to, nhiệt độ môi trường giảm mạnh xuống còn t2 = 22°C.\nKỹ sư cần xác định xem hệ thống có bị rò rỉ xì mối hàn hay sự sụt áp này chỉ đơn thuần do nhiệt độ môi trường giảm làm khí Nitơ co lại theo định luật Gay-Lussac (P / T = const).",
        givenData: [
          { symbol: "P1_abs", label: "Áp suất tuyệt đối ban đầu", value: "29.0", unit: "bar" },
          { symbol: "T1", label: "Nhiệt độ tuyệt đối ban đầu", value: "32 + 273 = 305", unit: "K" },
          { symbol: "t2", label: "Nhiệt độ môi trường sau 24h", value: "22", unit: "°C" },
          { symbol: "T2", label: "Nhiệt độ tuyệt đối sau 24h", value: "22 + 273 = 295", unit: "K" },
          { symbol: "P2_đo", label: "Áp suất tuyệt đối đo được sau 24h", value: "28.2", unit: "bar" },
        ],
        questions: [
          "Câu 1 (3 điểm): Dựa vào định luật khí lý tưởng đẳng tích (P1 / T1 = P2_tc / T2), hãy tính áp suất tuyệt đối lý thuyết P2_tc (bar) của khí Nitơ ở nhiệt độ 22°C nếu hệ thống kín 100% không bị rò rỉ.",
          "Câu 2 (3 điểm): Tính áp suất đo đồng hồ lý thuyết P2_gauge_tc (bar) và so sánh với giá trị thực tế đo được 27.2 bar.",
          "Câu 3 (4 điểm): Đưa ra kết luận nghiệm thu: Hệ thống đường ống có đạt tiêu chuẩn thử kín hay không? Giải thích rõ cơ sở vật lý."
        ],
        formulaHint: "Định luật biến đổi trạng thái: P2_tc = P1_abs × (T2 / T1). P_gauge = P_abs - 1.0 bar.",
        stepByStepSolution: [
          {
            step: "Bước 1: Tính áp suất tuyệt đối lý thuyết P2_tc sau khi bù nhiệt độ",
            calculation: "P2_tc = P1_abs × (T2 / T1) = 29.0 × (295 / 305) = 29.0 × 0.9672",
            result: "P2_tc = 28.05 bar (áp suất tuyệt đối)",
            note: "Do nhiệt độ giảm 10°C (từ 32°C xuống 22°C), áp suất tuyệt đối khí Nitơ tự động giảm từ 29.0 bar xuống 28.05 bar.",
            points: 3,
          },
          {
            step: "Bước 2: Tính áp suất đồng hồ lý thuyết và so sánh",
            calculation: "P2_gauge_tc = P2_tc - 1.0 = 28.05 - 1.0 = 27.05 bar.\nÁp suất đồng hồ thực tế đo được là: P2_thực tế = 27.2 bar.",
            result: "P2_thực tế (27.2 bar) ≥ P2_gauge_tc (27.05 bar)",
            note: "Áp suất thực tế đo được thậm chí còn cao hơn một chút so với mức sụt giảm do nhiệt độ (chênh lệch +0.15 bar nằm trong dung sai sai số áp kế).",
            points: 3,
          },
          {
            step: "Bước 3: Kết luận nghiệm thu thử kín",
            calculation: "Độ chênh lệch áp suất thực tế so với lý thuyết: ΔP = 27.2 - 27.05 = +0.15 bar (hoàn toàn không có hiện tượng sụt giảm áp suất do rò rỉ).",
            result: "KẾT LUẬN: ĐẠT TIÊU CHUẨN THỬ KÍN TCVN 6104. HỆ THỐNG KÍN HOÀN TOÀN 100%.",
            note: "Nếu không biết công thức bù nhiệt độ, người thợ sẽ phán đoán sai lầm rằng hệ thống bị xì và mất công đi tìm rò rỉ ảo.",
            points: 4,
          }
        ],
        evaluationCriteria: [
          "Áp dụng chính xác định luật Gay-Lussac đẳng tích chuyển đổi nhiệt độ tuyệt đối Kelvin.",
          "Tính đúng áp suất tuyệt đối lý thuyết P2_tc = 28.05 bar và áp suất đồng hồ 27.05 bar.",
          "So sánh chính xác với số liệu thực tế đo được 27.2 bar và rút ra kết luận hệ thống đạt chuẩn thử kín.",
          "Giải thích rõ ràng cơ chế bù trừ nhiệt độ để tránh nhận định sai sót rò rỉ ảo."
        ],
        totalPoints: 10,
      }
    ],
    circuitEssayQuestions: [
      {
        id: "dl301-circuit-1",
        type: "ESSAY_CIRCUIT",
        title: "PHÂN TÍCH HỆ THỐNG ĐIỀU KHIỂN ĐIỆN TỬ & VAN ĐIỆN TỪ XẢ ĐÁ KHO LẠNH",
        circuitType: "COMPRESSOR_MOTOR",
        circuitDescription: "Sơ đồ nguyên lý mạch điều khiển tự động chu trình xả đá kho lạnh công nghiệp: Bộ vi điều khiển nhiệt độ Dixell/Carel, Khởi động từ máy nén (KM1), Khởi động từ quạt dàn lạnh (KM2), Van điện từ cấp gas nóng (Solenoid Hot Gas SV1) và Rơ-le bảo vệ áp suất dầu chênh lệch (Oil Differential Pressure Switch OPS).",
        testPoints: [
          {
            point: "TP1",
            location: "Tiếp điểm điều khiển cuộn hút van điện từ xả đá SV1",
            nominalValue: "220V AC (khi chu trình Defrost kích hoạt)",
            significance: "Cấp điện mở màng van dẫn hơi nén nóng vào dàn lạnh."
          },
          {
            point: "TP2",
            location: "Khởi động từ quạt dàn lạnh KM2",
            nominalValue: "0V AC (quạt phải tắt tuyệt đối khi xả đá)",
            significance: "Ngăn hơi nóng thổi tràn lan vào buồng kho làm tăng nhiệt độ hàng hóa."
          },
          {
            point: "TP3",
            location: "Tiếp điểm rơ-le áp suất dầu OPS (Chân L - M)",
            nominalValue: "Thông mạch 0Ω khi áp suất bơm dầu đạt chuẩn (> 1.0 bar chênh lệch)",
            significance: "Bảo vệ cốt máy nén không bị bó kẹt khi thiếu dầu bôi trơn."
          }
        ],
        diagnosticQuestions: [
          "Câu hỏi 1 (4 điểm): Trình bày trình tự logic 3 bước của chu trình xả đá gas nóng: (1) Thu hồi dịch (Pump-down); (2) Cấp gas nóng xả băng; (3) Thoát nước nhỏ giọt và trễ quạt (Drip time & Fan delay).",
          "Câu hỏi 2 (3 điểm): Tại sao rơ-le chênh áp dầu OPS lại tích hợp sẵn một bộ đếm thời gian trễ nhiệt (Time Delay) 90 giây khi khởi động máy nén?",
          "Câu hỏi 3 (3 điểm): Nếu van một chiều (Check Valve) trên đường hồi lỏng xả đá bị kẹt mở hoặc rò rỉ ngược, hiện tượng bất thường gì sẽ xuất hiện khi kho lạnh trở lại chế độ làm lạnh?"
        ],
        stepByStepSolution: [
          {
            analysis: "Trình tự 3 bước chu trình xả đá gas nóng an toàn:",
            keyPoints: [
              "Bước 1 (Pump-down): Đóng van lỏng, máy nén hút cạn gas lỏng tồn đọng trong dàn lạnh về bình chứa cao áp để tránh hiện tượng ngập lỏng khi mở gas nóng.",
              "Bước 2 (Defrost): Tắt quạt dàn lạnh hoàn toàn, mở van điện từ gas nóng SV1 đưa hơi 80°C vào làm tan băng trong 8-12 phút.",
              "Bước 3 (Drip & Fan delay): Đóng van gas nóng, chờ 3 phút cho nước băng tan chảy róc hết ra máng xả. Bật máy nén chạy lạnh trước 2 phút, khi cánh nhôm dàn lạnh đạt -5°C mới cho quạt chạy để chống thổi sương mù ẩm vào kho."
            ],
            points: 4,
          },
          {
            analysis: "Cơ chế trễ 90 giây của rơ-le chênh áp dầu OPS:",
            keyPoints: [
              "Khi máy nén vừa khởi động, bơm dầu bánh răng cần khoảng 10-30 giây để hút dầu từ các-te điền đầy các rãnh trục khuỷu và tạo áp suất làm việc.",
              "Bộ trễ nhiệt 90 giây cho phép máy nén khởi động mà không bị ngắt oan. Nếu sau 90 giây mà áp suất dầu vẫn chưa đạt độ chênh tối thiểu (1.0 bar), thanh lưỡng kim sẽ nhảy ngắt mạch điều khiển bảo vệ lốc."
            ],
            points: 3,
          },
          {
            analysis: "Hiện tượng khi van một chiều xả đá bị kẹt hở:",
            keyPoints: [
              "Khi trở lại chế độ làm lạnh bình thường, gas lỏng cao áp từ bình chứa sẽ rò rỉ ngược theo đường xả đá tràn vào dàn bay hơi.",
              "Hậu quả: Áp suất hút tăng cao bất thường, dàn lạnh mất khả năng làm lạnh sâu và máy nén có nguy cơ ngập dịch liên tục."
            ],
            dangerWarning: "Kiểm tra định kỳ độ kín của van một chiều và van điện từ xả đá để chống tràn dịch ngược.",
            points: 3,
          }
        ],
        totalPoints: 10,
      }
    ]
  },

  // ==========================================
  // ĐỀ THI HẾT MÔN DL-305: ĐIỀU HÒA TRUNG TÂM VRV/VRF & CHILLER NƯỚC
  // ==========================================
  "dl-305": {
    id: "exam-dl-305",
    subjectCode: "DL-305",
    subjectTitle: "Hệ thống Điều hòa Trung tâm VRV / VRF & Chiller Nước",
    examName: "ĐỀ THI KẾT THÚC HỌC PHẦN: ĐIỀU HÒA TRUNG TÂM VRV & CHILLER NƯỚC",
    durationMinutes: 60,
    description: "Kiểm tra năng lực tính toán nạp gas bổ sung hệ thống VRV theo mét ống thực tế, quy chuẩn lắp đặt bộ chia Refnet Joint, thông số nhiệt độ Chiller nước lạnh và bảo vệ chống đông bình bay hơi.",
    passingScore: 60,
    multipleChoiceQuestions: [
      {
        id: "dl305-mc-1",
        type: "MULTIPLE_CHOICE",
        scenario: "Thi công lắp đặt bộ chia gas Refnet Joint chữ Y cho hệ thống Daikin VRV IV.",
        question: "Quy chuẩn độ nghiêng cho phép của bộ chia Refnet theo phương ngang và khoảng cách ống thẳng tối thiểu trước bộ chia là bao nhiêu?",
        options: [
          { text: "Góc nghiêng cho phép trong khoảng ±15° so với phương ngang; Chiều dài đoạn ống thẳng tối thiểu trước bộ chia là 500 mm", explanation: "Chính xác theo sổ tay lắp đặt Daikin VRV Installation Manual. Lắp sai góc làm lệch pha phân phối lỏng." },
          { text: "Có thể lắp chĩa thẳng đứng lên trần nhà; Đoạn ống thẳng 100 mm", explanation: "Sai phạm nghiêm trọng gây ngập dịch nhánh thấp và đói gas nhánh cao." },
          { text: "Nghiêng góc 45°; Không cần ống thẳng", explanation: "Sai." },
          { text: "Tùy thuộc vào vị trí vướng ống nước", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Bộ chia Refnet: Góc nghiêng ngang ±15°, khoảng cách đoạn ống thẳng trước bộ chia ≥ 500mm.",
      },
      {
        id: "dl305-mc-2",
        type: "MULTIPLE_CHOICE",
        scenario: "Vận hành hệ thống điều hòa trung tâm Chiller giải nhiệt nước (Water-cooled Chiller).",
        question: "Cặp nhiệt độ nước lạnh vào/ra (Chilled Water) tiêu chuẩn của bình bay hơi theo tiêu chuẩn AHRI là bao nhiêu?",
        options: [
          { text: "Nước vào 12°C, nước ra 7°C (độ chênh ΔT = 5°C)", explanation: "Chính xác. Tiêu chuẩn quốc tế AHRI 550/590: Cấp nước 7°C, hồi về 12°C, độ chênh 5°C." },
          { text: "Nước vào 20°C, nước ra 0°C", explanation: "Sai. Ra 0°C sẽ làm đóng băng nứt vỡ ống chùm bình bay hơi." },
          { text: "Nước vào 35°C, nước ra 30°C", explanation: "Sai. Đây là dải nhiệt độ của tháp giải nhiệt nước bình ngưng (Condenser Water)." },
          { text: "Nước vào 15°C, nước ra 14°C", explanation: "Sai. Độ chênh 1°C chứng tỏ lưu lượng bơm quá lớn hoặc Chiller non tải." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Nhiệt độ Chiller nước tiêu chuẩn AHRI: Nước ra 7°C, nước vào 12°C, ΔT = 5°C.",
      },
      {
        id: "dl305-mc-3",
        type: "MULTIPLE_CHOICE",
        scenario: "Tính toán nạp gas bổ sung cho công trình VRV.",
        question: "Lượng môi chất lạnh nạp bổ sung cho hệ thống VRV được tính dựa trên đường kính ống nào?",
        options: [
          { text: "Chỉ tính toán dựa trên đường kính và chiều dài của đường ỐNG LỎNG (Liquid Pipe)", explanation: "Chính xác. Môi chất lạnh tích lũy dạng lỏng đặc có khối lượng riêng lớn, toàn bộ công thức hãng đều tính theo mét ống lỏng." },
          { text: "Tính theo đường ống hơi hút (Gas Pipe)", explanation: "Sai." },
          { text: "Tính theo công suất ngựa (HP) của dàn nóng", explanation: "Sai. Máy nén xuất xưởng chỉ chứa đủ lượng gas cho nội bộ dàn nóng." },
          { text: "Tính theo diện tích sàn m² của phòng", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Nạp gas bổ sung VRV: Tính 100% theo tổng chiều dài và cỡ đường kính các đoạn ỐNG LỎNG.",
      },
      {
        id: "dl305-mc-4",
        type: "MULTIPLE_CHOICE",
        scenario: "Bình bay hơi Chiller giải nhiệt nước loại ống chùm nằm ngang (Shell & Tube Evaporator).",
        question: "Thiết bị bảo vệ nào có nhiệm vụ ngắt máy nén khẩn cấp khi bơm nước lạnh ngừng chạy để chống đóng băng nứt vỡ ống đồng?",
        options: [
          { text: "Công tắc dòng chảy (Flow Switch / Paddle Switch) lắp trên đường ống nước lạnh", explanation: "Chính xác. Khi mất lưu lượng nước, lá đồng của công tắc dòng chảy nhả ra ngắt tiếp điểm điều khiển Chiller lập tức." },
          { text: "Đồng hồ đo áp suất nước", explanation: "Sai. Đồng hồ áp suất vẫn có áp tĩnh khi bơm tắt nên không thể báo mất dòng chảy." },
          { text: "Phao báo mức nước", explanation: "Sai." },
          { text: "Cảm biến nhiệt độ phòng", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Bảo vệ Chiller số 1: Công tắc dòng chảy (Flow Switch) liên động ngắt máy nén khi mất lưu lượng nước.",
      },
      {
        id: "dl305-mc-5",
        type: "MULTIPLE_CHOICE",
        scenario: "Dàn lạnh VRV sử dụng van tiết lưu điện tử EEV tích hợp sẵn.",
        question: "Khi dàn lạnh tắt (ở trạng thái chờ Standby trong khi các phòng khác đang chạy), van EEV của dàn lạnh đó sẽ ở trạng thái nào?",
        options: [
          { text: "Đóng gần kín chỉ mở hé ở bước tối thiểu (khoảng vài chục xung) để lượng dầu bôi trơn không bị đọng bẫy lại trong dàn lạnh", explanation: "Chính xác. EEV không đóng kín 100% mà hé nhẹ một lượng rất nhỏ để quét dầu hồi về đường hút trung tâm." },
          { text: "Mở toang 100% (480 bước)", explanation: "Sai. Mở toang sẽ gây ngập dịch làm máy nén vỡ đĩa van." },
          { text: "Đóng kín hoàn toàn 0 bước tuyệt đối", explanation: "Sai. Đóng kín hoàn toàn sẽ làm dầu bôi trơn bị bẫy lại trong dàn lạnh không thể hồi về máy nén." },
          { text: "Rút điện van tiết lưu", explanation: "Sai." }
        ],
        correctIndex: 0,
        points: 4,
        coreRule: "Van EEV dàn lạnh Standby: Mở hé tối thiểu để tuần hoàn dầu bôi trơn, ngăn hiện tượng đọng dầu.",
      }
    ],
    mathEssayQuestions: [
      {
        id: "dl305-math-1",
        type: "ESSAY_MATH",
        title: "BÀI TOÁN TÍNH TOÁN NẠP GAS BỔ SUNG CHO HỆ THỐNG TRUNG TÂM VRV THEO MÉT ỐNG THỰC TẾ",
        scenario: "Một tổ hợp dàn nóng trung tâm Daikin VRV IV công suất 16 HP kết nối với 6 dàn lạnh cassette âm trần. Bản vẽ hoàn công đo đạc thực tế chiều dài các đoạn ống lỏng (chất liệu đồng) như sau:\n- Đoạn ống lỏng đường kính Ø15.9 mm (5/8\"): Tổng chiều dài L1 = 25 mét (đơn suất nạp: 0.18 kg/m)\n- Đoạn ống lỏng đường kính Ø12.7 mm (1/2\"): Tổng chiều dài L2 = 35 mét (đơn suất nạp: 0.11 kg/m)\n- Đoạn ống lỏng đường kính Ø9.52 mm (3/8\"): Tổng chiều dài L3 = 40 mét (đơn suất nạp: 0.057 kg/m)\n- Đoạn ống lỏng đường kính Ø6.35 mm (1/4\"): Tổng chiều dài L4 = 50 mét (đơn suất nạp: 0.022 kg/m)\nDàn nóng 16 HP xuất xưởng đã nạp sẵn lượng gas cơ bản cho bản thân máy. Hệ thống sử dụng môi chất R410A.",
        givenData: [
          { symbol: "L1 (Ø15.9)", label: "Chiều dài ống lỏng Ø15.9", value: "25m (đơn suất 0.18 kg/m)", unit: "m" },
          { symbol: "L2 (Ø12.7)", label: "Chiều dài ống lỏng Ø12.7", value: "35m (đơn suất 0.11 kg/m)", unit: "m" },
          { symbol: "L3 (Ø9.52)", label: "Chiều dài ống lỏng Ø9.52", value: "40m (đơn suất 0.057 kg/m)", unit: "m" },
          { symbol: "L4 (Ø6.35)", label: "Chiều dài ống lỏng Ø6.35", value: "50m (đơn suất 0.022 kg/m)", unit: "m" },
        ],
        questions: [
          "Câu 1 (4 điểm): Tính lượng gas R410A nạp bổ sung cho từng cỡ đường kính ống đồng m1, m2, m3, m4 (đơn vị kg).",
          "Câu 2 (3 điểm): Tính tổng khối lượng gas bổ sung M_tổng (kg) cần nạp vào hệ thống.",
          "Câu 3 (3 điểm): Trình bày quy trình nạp gas bổ sung bằng cân điện tử: Nạp ở trạng thái lỏng hay hơi? Vị trí nạp tại đâu trên dàn nóng?"
        ],
        formulaHint: "Khối lượng gas bổ sung: M = Σ (L_i × Đơn_suất_i). Nạp lỏng 100% qua cổng kiểm tra ống lỏng.",
        stepByStepSolution: [
          {
            step: "Bước 1: Tính lượng gas nạp bổ sung theo từng cỡ ống lỏng",
            calculation: "- Ống Ø15.9: m1 = 25 × 0.18 = 4.50 kg\n- Ống Ø12.7: m2 = 35 × 0.11 = 3.85 kg\n- Ống Ø9.52: m3 = 40 × 0.057 = 2.28 kg\n- Ống Ø6.35: m4 = 50 × 0.022 = 1.10 kg",
            result: "m1 = 4.50kg; m2 = 3.85kg; m3 = 2.28kg; m4 = 1.10kg",
            note: "Mỗi cỡ ống có một tỷ lệ nạp gas riêng theo thể tích hình trụ của lòng ống.",
            points: 4,
          },
          {
            step: "Bước 2: Tính tổng khối lượng gas nạp bổ sung M_tổng",
            calculation: "M_tổng = m1 + m2 + m3 + m4 = 4.50 + 3.85 + 2.28 + 1.10 = 11.73 kg",
            result: "M_tổng = 11.73 kg R410A",
            note: "Cần chuẩn bị 1 bình gas R410A nguyên seal trọng lượng tịnh 11.3kg và bù thêm 0.43kg từ bình thứ 2.",
            points: 3,
          },
          {
            step: "Bước 3: Quy trình thao tác nạp chuẩn hiện trường",
            calculation: "- Đặt bình gas lên cân điện tử, lộn ngược bình nạp lỏng.\n- Nối dây sạc vào cổng dịch vụ đường ống lỏng khi máy chưa chạy (ngắt điện).\n- Mở van nạp để chân không hút tự do lỏng vào hệ thống. Ghi lại số kg trên tem kiểm định dán ở mặt trong nắp dàn nóng.",
            result: "Nạp ở THỂ LỎNG 100% qua van chặn ĐƯỜNG LỎNG bằng CÂN ĐIỆN TỬ.",
            note: "Ghi nhật ký nạp gas dán vào cửa tủ điện dàn nóng phục vụ công tác bảo trì sau này.",
            points: 3,
          }
        ],
        evaluationCriteria: [
          "Tính đúng lượng gas nạp bổ sung cho từng cỡ ống lỏng: m1=4.5kg, m2=3.85kg, m3=2.28kg, m4=1.1kg.",
          "Tính chính xác tổng khối lượng gas nạp bù M_tổng = 11.73 kg R410A.",
          "Nêu đúng quy trình nạp gas ở thể lỏng bằng cân điện tử qua cổng kiểm tra đường lỏng khi máy chưa chạy.",
          "Có ý thức ghi chép nhật ký tem nạp gas hoàn công dán cửa tủ điện dàn nóng."
        ],
        totalPoints: 10,
      }
    ],
    circuitEssayQuestions: [
      {
        id: "dl305-circuit-1",
        type: "ESSAY_CIRCUIT",
        title: "PHÂN TÍCH MẠCH TRUYỀN THÔNG DIII-NET VÀ ĐIỀU KHIỂN LIÊN ĐỘNG DÀN LẠNH TRUNG TÂM VRV",
        circuitType: "INVERTER_COMMUNICATION",
        circuitDescription: "Sơ đồ mạng truyền thông DIII-Net (F1/F2) liên kết giữa Bo điều khiển chính dàn nóng VRV và 6 bo mạch dàn lạnh: Cáp xoắn chống nhiễu 2 lõi có lớp bọc kim chống can nhiễu điện từ, các công tắc gạt địa chỉ (Dip-switch) và tiếp điểm liên động bơm nước ngưng dàn lạnh (Drain Pump Float Switch).",
        testPoints: [
          {
            point: "TP1",
            location: "Cặp cọc truyền thông F1 - F2 tại dàn nóng",
            nominalValue: "Điện áp DC 16V ~ 20V có xung dao động dữ liệu số",
            significance: "Đường trục chính truyền lệnh điều khiển tốc độ máy nén và mở bước van EEV."
          },
          {
            point: "TP2",
            location: "Cọc phao báo tràn nước ngưng dàn lạnh (Float Switch S1L)",
            nominalValue: "Thông mạch 0Ω khi nước ngưng bình thường, hở mạch khi tràn máng nước",
            significance: "Bảo vệ ngắt van EEV và phát mã lỗi A3 chống tràn nước làm ướt trần thạch cao."
          },
          {
            point: "TP3",
            location: "Cực nguồn nuôi 220V cấp cho từng dàn lạnh",
            nominalValue: "220V AC liên tục 24/7",
            significance: "Duy trì vi xử lý nhận dạng hệ thống ngay cả khi tắt điều hòa bằng remote."
          }
        ],
        diagnosticQuestions: [
          "Câu hỏi 1 (4 điểm): Tại sao tiêu chuẩn lắp đặt cáp truyền thông F1-F2 của hệ VRV bắt buộc phải đấu nối tiếp từ máy này sang máy khác (Daisy-chain) mà nghiêm cấm tuyệt đối đấu hình sao hoặc nối chung nhiều nhánh?",
          "Câu hỏi 2 (3 điểm): Trình bày phản ứng của hệ thống VRV khi một dàn lạnh bị tràn máng nước ngưng (phao nước ngưng S1L hở mạch): Dàn lạnh báo mã lỗi gì và van EEV của dàn lạnh đó sẽ xử lý ra sao?",
          "Câu hỏi 3 (3 điểm): Khi tiến hành thủ tục chạy tự kiểm tra hệ thống (Check Operation), dàn nóng kiểm tra những thông số vật lý nào trước khi cho phép bàn giao công trình?"
        ],
        stepByStepSolution: [
          {
            analysis: "Nguyên tắc đấu dây truyền thông Daisy-chain chống phản xạ sóng:",
            keyPoints: [
              "Mạng DIII-Net truyền dữ liệu xung số tốc độ cao. Đấu hình sao hoặc rẽ nhánh tự do sẽ tạo ra các điểm trở kháng không phối hợp, gây hiện tượng phản xạ sóng tín hiệu (Signal Reflection) làm triệt tiêu dữ liệu.",
              "Hậu quả khi đấu sai: Dàn nóng mất tín hiệu ngắt quãng, báo lỗi U9 hoặc UF liên tục mặc dù dây đo vẫn thông mạch."
            ],
            points: 4,
          },
          {
            analysis: "Cơ chế bảo vệ khi tràn nước ngưng (Mã lỗi A3):",
            keyPoints: [
              "Khi máng nước dâng cao, phao nước ngưng nâng lên làm hở tiếp điểm công tắc S1L.",
              "Bo dàn lạnh lập tức kích hoạt bơm nước ngưng chạy hết công suất, đồng thời đóng chặt van tiết lưu điện tử EEV về 0 bước để ngừng làm lạnh ngưng tạo ẩm.",
              "Nếu sau 5 phút nước không hạ, dàn lạnh khóa lỗi A3 và gửi tín hiệu qua chân F1-F2 ngắt tua dàn nóng bảo vệ trần nhà."
            ],
            points: 3,
          },
          {
            analysis: "Quy trình chạy tự kiểm tra (Check Operation):",
            keyPoints: [
              "Kiểm tra van chặn: Dàn nóng kích hoạt máy nén chạy tần số thấp để kiểm tra áp suất, nếu van chặn chưa mở sẽ báo lỗi khóa máy.",
              "Kiểm tra chiều quay: Tự phát hiện đấu lộn pha nguồn điện 3 pha để cảnh báo lỗi U1.",
              "Kiểm tra van EEV và cân chỉnh nạp gas: Tự động điều chỉnh các bước van EEV từng phòng và đo độ quá nhiệt để xác định lượng gas nạp bù đã đủ tiêu chuẩn hay chưa."
            ],
            dangerWarning: "Trước khi bấm Check Operation bắt buộc phải mở toàn bộ các van chặn đường lỏng và đường hơi.",
            points: 3,
          }
        ],
        totalPoints: 10,
      }
    ]
  }
};

// Hàm sinh đề thi kết thúc môn ngẫu nhiên từ kho dữ liệu hoặc trích xuất biến đổi
export function getSubjectExam(subjectCode: string): SubjectExam | null {
  const codeKey = subjectCode.toLowerCase().replace(/[^a-z0-9]/g, "-");
  if (SUBJECT_EXAMS_DATA[codeKey]) {
    return SUBJECT_EXAMS_DATA[codeKey];
  }
  // Detailed mapping
  if (codeKey.includes("101")) return SUBJECT_EXAMS_DATA["dl-101"];
  if (codeKey.includes("102")) return SUBJECT_EXAMS_DATA["dl-102"];
  if (codeKey.includes("201")) return SUBJECT_EXAMS_DATA["dl-201"];
  if (codeKey.includes("203") || codeKey.includes("inverter")) return SUBJECT_EXAMS_DATA["dl-203"];
  if (codeKey.includes("204")) return SUBJECT_EXAMS_DATA["dl-204"];
  if (codeKey.includes("301")) return SUBJECT_EXAMS_DATA["dl-301"];
  if (codeKey.includes("305") || codeKey.includes("304") || codeKey.includes("vrv") || codeKey.includes("chiller")) {
    return SUBJECT_EXAMS_DATA["dl-305"];
  }
  return SUBJECT_EXAMS_DATA["dl-101"];
}

// BỘ TẠO ĐỀ THI NGẪU NHIÊN TOÀN DIỆN (RANDOM COMPREHENSIVE EXAM GENERATOR)
export function generateRandomSubjectExam(preferredSubject?: string): SubjectExam {
  const allExams = Object.values(SUBJECT_EXAMS_DATA);
  const baseExam = (preferredSubject && getSubjectExam(preferredSubject)) || allExams[Math.floor(Math.random() * allExams.length)];

  // Xáo trộn trắc nghiệm
  const shuffledMC = [...baseExam.multipleChoiceQuestions].sort(() => Math.random() - 0.5);

  // Xáo trộn đáp án trong từng câu trắc nghiệm
  const randomizedMC: MultipleChoiceExamQuestion[] = shuffledMC.map((q) => {
    const optsWithFlag = q.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === q.correctIndex,
    }));
    for (let i = optsWithFlag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optsWithFlag[i], optsWithFlag[j]] = [optsWithFlag[j], optsWithFlag[i]];
    }
    const newCorrectIdx = optsWithFlag.findIndex((o) => o.isCorrect);
    return {
      ...q,
      options: optsWithFlag.map(({ text, explanation }) => ({ text, explanation })),
      correctIndex: newCorrectIdx,
    };
  });

  return {
    ...baseExam,
    id: `random-exam-${Date.now()}`,
    examName: `ĐỀ THI ÔN LUYỆN TOÀN DIỆN (MÃ ĐỀ #${Math.floor(100 + Math.random() * 900)}): ${baseExam.subjectTitle}`,
    multipleChoiceQuestions: randomizedMC,
  };
}
