import { FlashcardItem, QuizQuestion, KnowledgeCategory } from "@/types/quiz";
import { SUBJECT_KNOWLEDGE_MAP } from "../data/subjectDetailsData";
import { COLLEGE_CURRICULUM_DATA } from "../data/collegeCurriculum";
import { ERROR_CODES_DATA } from "@/features/diagnostics/data/errorCodesData";

// Tự động trích xuất toàn bộ flashcard từ kho kiến thức môn học
export function generateAllFlashcards(): FlashcardItem[] {
  const flashcards: FlashcardItem[] = [];

  // 1. Trích xuất từ các môn học trong giáo trình Cao Đẳng
  COLLEGE_CURRICULUM_DATA.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      const detail = SUBJECT_KNOWLEDGE_MAP[subject.id];

      // A. Tạo flashcard từ CÔNG THỨC KỸ THUẬT
      if (detail && detail.formulas) {
        detail.formulas.forEach((f, idx) => {
          flashcards.push({
            id: `fc-form-${subject.id}-${idx}`,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            category: "FORMULA",
            question: `Công thức tính "${f.name}" (${f.expression}) dùng để tính gì và khi nào áp dụng?`,
            answer: `• Mục đích: ${f.calculatesWhat}\n• Bối cảnh hiện trường: ${f.whenToUse}\n• Ngưỡng an toàn kỹ thuật: ${f.safeStandard}`,
            formulaOrRule: f.expression,
            fieldTip: `Các biến số: ${f.variables.map((v) => `${v.symbol} (${v.name} - ${v.unit})`).join(", ")}`,
            sampleCalculation: f.sampleCalculation,
          });
        });
      }

      // B. Tạo flashcard từ THAO TÁC ĐO KIỂM HIỆN TRƯỜNG
      if (detail && detail.practicalSteps) {
        detail.practicalSteps.forEach((s) => {
          flashcards.push({
            id: `fc-step-${subject.id}-${s.step}`,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            category: "MEASUREMENT",
            question: `Quy trình đo kiểm #${s.step}: "${s.title}" thực hiện thế nào và tiêu chuẩn đạt là gì?`,
            answer: `• Thao tác đo: ${s.action}\n• Tiêu chuẩn nghiệm thu: ${s.expectedResult}`,
            fieldTip: "Tuyệt đối kiểm tra que đo và thang đo đồng hồ trước khi chạm vào mạch mang điện.",
          });
        });
      }

      // C. Tạo flashcard từ SAI LẦM HIỆN TRƯỜNG & BIỆN PHÁP PHÒNG TRÁNH
      if (detail && detail.fieldPitfalls) {
        detail.fieldPitfalls.forEach((p, idx) => {
          flashcards.push({
            id: `fc-pitfall-${subject.id}-${idx}`,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            category: "PITFALL",
            question: `Cảnh báo sai lầm: Thói quen "${p.mistake}" sẽ gây ra hậu quả gì?`,
            answer: `• Hậu quả thực tế: ${p.consequence}\n• Quy trình khắc phục đúng chuẩn: ${p.prevention}`,
            fieldTip: "Luôn tuân thủ quy trình chuẩn quốc tế, không làm tắt bước.",
          });
        });
      }

      // D. Tạo flashcard từ KỸ NĂNG NGHỀ CỐT LÕI
      if (subject.practicalFieldSkills && subject.practicalFieldSkills.length > 0) {
        flashcards.push({
          id: `fc-skills-${subject.id}`,
          subjectCode: subject.code,
          subjectTitle: subject.title,
          category: "THEORY",
          question: `Những kỹ năng thực chiến cốt lõi cần đạt được của môn học ${subject.code} - ${subject.title}?`,
          answer: subject.practicalFieldSkills.map((sk, i) => `${i + 1}. ${sk}`).join("\n"),
          fieldTip: `Môn này là nền tảng mở khóa cho: ${subject.downstreamUnlocks.map((u) => u.name).join(", ")}`,
        });
      }
    });
  });

  // 2. Trích xuất từ KHO MÃ LỖI BIẾN TẦN INVERTER
  ERROR_CODES_DATA.forEach((err) => {
    flashcards.push({
      id: `fc-err-${err.brand}-${err.code}`,
      subjectCode: "INVERTER-DIAG",
      subjectTitle: `Chẩn đoán mã lỗi ${err.brand}`,
      category: "DIAGNOSTIC",
      question: `Mã lỗi "${err.code}" trên điều hòa ${err.brand}: Triệu chứng và nguyên nhân cốt lõi là gì?`,
      answer: `• Tên sự cố: ${err.title}\n• Triệu chứng: ${err.symptom}\n• Mức độ an toàn: ${err.safetyLevel}\n• Nguyên nhân chính:\n${err.rootCauses.map((c) => `- ${c}`).join("\n")}`,
      fieldTip: `Bước kiểm tra đầu tiên: ${err.steps[0]?.action || "Đo kiểm áp nguồn và thông mạch"} (Dụng cụ: ${err.steps[0]?.measuredTool || "VOM"})`,
    });
  });

  return flashcards;
}

// Bộ câu hỏi trắc nghiệm thực chiến được tổng hợp và chuẩn hóa trực tiếp từ kho kiến thức
export const KNOWLEDGE_BASE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "kb-q1",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & An toàn Điện lạnh",
    category: "MEASUREMENT",
    scenario: "Kỹ thuật viên đo kiểm hệ thống tiếp địa bảo vệ (PE) cho vỏ máy điều hòa 1 pha 220V tại nhà khách hàng trước khi bàn giao.",
    question: "Điện trở tiếp địa an toàn tối đa cho phép là bao nhiêu theo Quy chuẩn Kỹ thuật Quốc gia?",
    options: [
      {
        text: "R_đất ≤ 4Ω (đo bằng đồng hồ đo điện trở đất chuyên dụng)",
        explanation: "Chính xác. Theo QCVN 12:2014/BCT, điện trở nối đất an toàn cho mạng điện hạ áp chống rò vỏ bảo vệ người không được vượt quá 4Ω.",
      },
      {
        text: "R_đất ≤ 50Ω (đo bằng thang đo x1kΩ của đồng hồ VOM kim)",
        explanation: "Sai. 50Ω là quá lớn, không đủ tiêu tán dòng rò nhanh để nhảy RCBO, đồng thời VOM kim không thể đo chính xác điện trở đất.",
      },
      {
        text: "R_đất ≤ 100Ω (đo giữa vỏ máy và cọc tiếp địa bất kỳ)",
        explanation: "Sai. Ngưỡng 100Ω không đảm bảo an toàn tính mạng khi máy nén chạm vỏ rò điện 220V.",
      },
      {
        text: "R_đất ≥ 10 MΩ (càng cao càng tốt để dòng rò không đi qua)",
        explanation: "Sai. Bạn đang nhầm lẫn giữa điện trở cách điện (cần lớn) và điện trở tiếp địa (cần càng nhỏ càng tốt để thoát dòng).",
      },
    ],
    correctIndex: 0,
    coreRule: "Điện trở tiếp địa an toàn R_đất ≤ 4Ω. Dòng rò tác động RCBO cho điều hòa dân dụng là 30mA (thời gian cắt < 0.1s).",
  },
  {
    id: "kb-q2",
    subjectCode: "DL-201",
    subjectTitle: "Nhiệt động Kỹ thuật & Chu trình Lạnh",
    category: "FORMULA",
    scenario: "Đang nạp gas R32 cho máy điều hòa Inverter 1.5 HP. Nhiệt độ đường ống hút đo được 12°C. Đồng hồ áp suất đường hút chỉ 135 psi (tương ứng nhiệt độ sôi bão hòa 4°C trên bảng P-T).",
    question: "Độ quá nhiệt dòng hút (Superheat - SH) của hệ thống là bao nhiêu và cần xử lý thế nào?",
    options: [
      {
        text: "SH = 8°C. Hơi quá nhiệt nằm gần dải chuẩn nhưng hơi cao nhẹ (chuẩn tối ưu 5°C - 7°C), có thể châm thêm lượng nhỏ gas lỏng qua van hút.",
        explanation: "Chính xác! Áp dụng công thức SH = T_hút - T_bão hòa = 12°C - 4°C = 8°C. Dải tối ưu bảo vệ máy nén là 5°C - 7°C.",
      },
      {
        text: "SH = 16°C. Thừa gas nghiêm trọng, phải xả bớt gas ngay lập tức.",
        explanation: "Sai. Công thức Superheat là phép trừ T_hút - T_bão hòa chứ không phải phép cộng.",
      },
      {
        text: "SH = 3°C. Máy nén đang bị quá nhiệt, cuộn dây sắp cháy do thiếu gas.",
        explanation: "Sai. SH = 3°C là độ quá nhiệt quá thấp (thừa gas nguy cơ ngập lỏng), không phải 8°C.",
      },
      {
        text: "SH = -8°C. Áp suất hút quá cao làm đóng tuyết trên dàn lạnh.",
        explanation: "Sai. Độ quá nhiệt luôn mang giá trị dương trong điều kiện máy hoạt động ổn định.",
      },
    ],
    correctIndex: 0,
    coreRule: "Công thức: Superheat SH = T_suction - T_evap. Chuẩn an toàn cho máy lạnh dân dụng là 5°C đến 7°C.",
  },
  {
    id: "kb-q3",
    subjectCode: "DL-103",
    subjectTitle: "Kỹ thuật Gia công Kim loại & Hàn Đường ống",
    category: "MEASUREMENT",
    scenario: "Kỹ thuật viên sử dụng bộ vam loe lệch tâm (eccentric flaring tool) để loe ống đồng phi 6 và phi 10 đấu nối rắc-co dàn lạnh.",
    question: "Quy chuẩn khoảng cách nhô đầu ống đồng ra khỏi mặt phẳng vam loe là bao nhiêu?",
    options: [
      {
        text: "Nhô từ 1.0 mm đến 1.5 mm (tạo góc côn 45° kín khít, mép loe phẳng đều không nứt)",
        explanation: "Chính xác. Theo tiêu chuẩn lắp đặt điều hòa, đầu ống nhô 1.0 - 1.5mm đảm bảo mép loe ôm vừa khít côn rắc-co mà không bị mỏng rách mép.",
      },
      {
        text: "Nhô từ 4.0 mm đến 5.0 mm (để mép loe càng to càng chống tuột ống)",
        explanation: "Sai. Nhô quá dài khi siết rắc-co sẽ bị cấn ren, làm nứt mép loe hoặc móp méo gây xì gas sau vài tháng vận hành.",
      },
      {
        text: "Nhô bằng phẳng 0 mm với mặt vam loe",
        explanation: "Sai. Bằng mặt vam loe sẽ không đủ vật liệu để tạo hình mặt nón 45°, rắc-co sẽ tuột ngay khi có áp suất gas.",
      },
      {
        text: "Tùy ý kỹ thuật viên, sau đó quấn băng tan (cao su non) vào ren rắc-co để bù sai số",
        explanation: "Sai nghiêm trọng. Tuyệt đối không dùng băng tan trên ren rắc-co côn 45° vì làm trượt ren và gây hở gas.",
      },
    ],
    correctIndex: 0,
    coreRule: "Quy chuẩn loe ống đồng: Đầu nón lệch tâm 45°, độ nhô ống 1.0 - 1.5mm, vát ba-via hướng xuống dưới trước khi loe.",
  },
  {
    id: "kb-q4",
    subjectCode: "DL-202",
    subjectTitle: "Lắp đặt, Vận hành Hệ thống Điều hòa & Bơm Hút Chân Không",
    category: "MEASUREMENT",
    scenario: "Sau khi hoàn thành kết nối đường ống đồng giữa dàn lạnh và dàn nóng, kỹ thuật viên tiến hành hút chân không hệ thống trước khi mở van gas.",
    question: "Chỉ số độ chân không và quy trình kiểm tra nào sau đây chứng nhận hệ thống đạt chuẩn kín tuyệt đối?",
    options: [
      {
        text: "Độ chân không đạt dưới 500 Micron (≤ 66 Pa) và giữ áp tĩnh 15 phút không tăng kim",
        explanation: "Chính xác! Chuẩn quốc tế ISO 5149 và các hãng Daikin/Panasonic bắt buộc hút sâu dưới 500 Micron để triệt tiêu hơi ẩm.",
      },
      {
        text: "Chạy bơm hút 5 phút hoặc kim đồng hồ cơ chỉ về -30 inHg là khóa van mở gas ngay",
        explanation: "Sai. Đồng hồ cơ không đo được độ chân không sâu của hơi ẩm, 5 phút chưa đủ làm sôi bay hơi các giọt ẩm trong đường ống.",
      },
      {
        text: "Đạt 2500 Micron là đủ, không cần khóa van kiểm tra giữ áp tĩnh",
        explanation: "Sai. Ở mức 2500 Micron lượng hơi ẩm vẫn còn đọng lại, khi tiếp xúc dầu POE/PVE sẽ tạo axit ăn mòn cuộn dây lốc.",
      },
      {
        text: "Dùng chính gas lạnh trong máy xả đuổi khí qua đầu van nạp không cần dùng bơm",
        explanation: "Sai phạm nghiêm trọng! Xả đuổi gas bị cấm vì gây thủng tầng ozone, làm sai lệch lượng gas và không hút được ẩm.",
      },
    ],
    correctIndex: 0,
    coreRule: "Tiêu chuẩn hút chân không: < 500 Micron, giữ áp tĩnh tối thiểu 15 phút. Tuyệt đối cấm xả đuổi gas.",
  },
  {
    id: "kb-q5",
    subjectCode: "DL-203",
    subjectTitle: "Mạch điện & Bo điều khiển Inverter",
    category: "DIAGNOSTIC",
    scenario: "Điều hòa Daikin Inverter bật máy chạy được 3 phút thì dừng lốc, đèn nguồn nhấp nháy, kiểm tra mã lỗi trên remote báo lỗi 'U4'.",
    question: "Nguyên nhân cốt lõi của mã lỗi U4 và phương pháp đo kiểm sơ bộ là gì?",
    options: [
      {
        text: "Lỗi mất giao tiếp giữa dàn nóng và dàn lạnh; kiểm tra dây tín hiệu số 3 và đo điện áp dao động DC nhịp giữa chân 2 và 3",
        explanation: "Chính xác! Lỗi U4 trên máy Daikin là lỗi tín hiệu truyền thông (Communication Error). Cần đo áp dao động DC 15V - 55V nhịp giữa chân 2 và 3.",
      },
      {
        text: "Lỗi kẹt cơ máy nén Inverter; cần lập tức thay máy nén mới và xả hết dầu",
        explanation: "Sai. Lỗi kẹt cơ hoặc quá dòng máy nén trên Daikin báo lỗi L5 hoặc L8, không phải U4.",
      },
      {
        text: "Lỗi hỏng cảm biến nhiệt độ gió hồi dàn lạnh; thay thế sensor 10kΩ",
        explanation: "Sai. Lỗi cảm biến nhiệt độ phòng mặt lạnh Daikin báo lỗi C9.",
      },
      {
        text: "Lỗi quạt dàn nóng không quay do đứt cầu chì 3.15A",
        explanation: "Sai. Lỗi quạt dàn nóng Daikin báo lỗi E7 hoặc H7.",
      },
    ],
    correctIndex: 0,
    coreRule: "Lỗi U4 Daikin: Lỗi đường truyền tín hiệu Data dàn nóng - dàn lạnh. Kiểm tra dây số 3, cặp opto quang PC1-PC2 và nguồn 5V cấp MCU.",
  },
  {
    id: "kb-q6",
    subjectCode: "DL-101",
    subjectTitle: "Kỹ thuật Điện Cơ sở & Khí cụ Điện",
    category: "FORMULA",
    scenario: "Máy nén 1 pha 220V có công suất cơ $P_{\\text{điện}} = 1100\\text{W}$, hệ số công suất $\\cos\\varphi = 0.85$. Kỹ thuật viên cần tính dòng làm việc định mức $I_{\\text{đm}}$ để chọn dây dẫn và Aptomat bảo vệ.",
    question: "Dòng điện làm việc định mức tính toán gần đúng là bao nhiêu?",
    options: [
      {
        text: "I ≈ 5.88 A (Áp dụng công thức I = P / (U × cosφ) = 1100 / (220 × 0.85))",
        explanation: "Chính xác! Dòng định mức I = 1100 / (220 × 0.85) ≈ 5.88 A. Chọn Aptomat MCB 10A hoặc 16A loại tải động cơ (Curve C).",
      },
      {
        text: "I ≈ 2.5 A (Tính theo I = P / U đơn thuần mà bỏ qua hệ số công suất)",
        explanation: "Sai. Nếu tính 1100 / 220 = 5A, và nếu tính 2.5A là hoàn toàn sai công thức.",
      },
      {
        text: "I ≈ 12.5 A (Lấy công suất nhân với hệ số công suất)",
        explanation: "Sai công thức. Dòng điện tỷ lệ nghịch với điện áp và hệ số công suất, không phải tỷ lệ thuận.",
      },
      {
        text: "I ≈ 25 A (Nhầm lẫn giữa dòng làm việc và dòng khởi động)",
        explanation: "Sai. 25A là dòng khởi động cực đại lúc đề ba (Starting Current), không phải dòng làm việc định mức.",
      },
    ],
    correctIndex: 0,
    coreRule: "Công thức tính dòng điện 1 pha: I = P / (U × cosφ). Chọn dây dẫn với mật độ dòng J ≤ 4 - 6 A/mm² đối với dây đồng.",
  },
  {
    id: "kb-q7",
    subjectCode: "DL-102",
    subjectTitle: "Khí cụ Điện & Động cơ Máy Nén",
    category: "MEASUREMENT",
    scenario: "Kỹ thuật viên dùng đồng hồ VOM đo điện trở giữa 3 cọc cắm của máy nén 1 pha: Cọc 1 - Cọc 2 đo được 3.5Ω; Cọc 2 - Cọc 3 đo được 8.5Ω; Cọc 1 - Cọc 3 đo được 5.0Ω.",
    question: "Xác định chính xác các chân Chung (C - Common), Chạy (R - Run) và Đề (S - Start):",
    options: [
      {
        text: "Cọc 1 là chân Chung (C), Cọc 2 là chân Chạy (R), Cọc 3 là chân Đề (S)",
        explanation: "Chính xác! Nguyên tắc vàng: R(R-S) lớn nhất (8.5Ω) => chân còn lại Cọc 1 là Chung (C). Từ chân Chung: R(C-R) nhỏ hơn (3.5Ω) => Cọc 2 là Chạy; R(C-S) lớn hơn (5.0Ω) => Cọc 3 là Đề.",
      },
      {
        text: "Cọc 2 là chân Chung (C), Cọc 1 là chân Chạy (R), Cọc 3 là chân Đề (S)",
        explanation: "Sai. Cọc 2 nằm trên cặp có điện trở lớn nhất (2-3), nên cọc 2 không thể là chân Chung.",
      },
      {
        text: "Cọc 3 là chân Chung (C), Cọc 1 là chân Chạy (R), Cọc 2 là chân Đề (S)",
        explanation: "Sai nguyên tắc xác định chân lốc máy nén một pha.",
      },
      {
        text: "Cuộn dây đã bị chập vì điện trở cuộn đề nhỏ hơn cuộn chạy",
        explanation: "Sai. Cuộn đề (5.0Ω) lớn hơn cuộn chạy (3.5Ω), đây là động cơ hoàn toàn khỏe mạnh bình thường.",
      },
    ],
    correctIndex: 0,
    coreRule: "Quy tắc tam giác điện trở cọc lốc: R(R-S) = R(C-R) + R(C-S). Chân Chung đối diện cặp điện trở lớn nhất. Cuộn Chạy có điện trở nhỏ hơn cuộn Đề.",
  },
  {
    id: "kb-q8",
    subjectCode: "DL-203",
    subjectTitle: "Mạch điện & Bo điều khiển Inverter",
    category: "MEASUREMENT",
    scenario: "Trước khi dùng đồng hồ chạm que đo kiểm tra linh kiện công suất IGBT trên bo dàn nóng Inverter sau khi ngắt cầu dao 220V.",
    question: "Quy tắc an toàn tính mạng bắt buộc đầu tiên kỹ thuật viên phải thực hiện là gì?",
    options: [
      {
        text: "Đo kiểm tra điện áp trên 2 cực tụ lọc DC 300V và xả điện áp dư qua tải trở sứ hoặc bóng đèn 220V công suất 40W - 60W",
        explanation: "Chính xác! Tụ nguồn DC 300V (thường 450V - 1000μF) tích trữ năng lượng rất lớn sau khi ngắt nguồn, nếu không xả sẽ gây giật chết người hoặc làm nổ linh kiện khi chạm que đo.",
      },
      {
        text: "Dùng tua-vít kim loại chập trực tiếp 2 chân tụ DC 300V để xả cho nhanh",
        explanation: "Tuyệt đối cấm! Chập trực tiếp gây tia lửa hàn nổ cực mạnh, bắn vụn kim loại vào mắt và làm thủng nổ tụ điện, đứt mạch in.",
      },
      {
        text: "Chờ khoảng 10 giây là điện áp tụ tự động về 0V nên có thể sửa ngay",
        explanation: "Sai. Nếu mạch trở xả trên bo bị đứt, tụ điện có thể ngậm điện áp DC 300V suốt nhiều giờ đồng hồ.",
      },
      {
        text: "Rút ngay giắc cắm động cơ máy nén ra khi máy đang chạy để xả điện",
        explanation: "Cực kỳ nguy hiểm! Rút giắc máy nén khi đang cấp xung PWM sẽ tạo suất điện động cảm ứng hàng nghìn vôn đánh thủng IC công suất IGBT ngay lập tức.",
      },
    ],
    correctIndex: 0,
    coreRule: "Cảnh báo cao áp DC 300V: Luôn đo điện áp dư trên tụ nguồn và xả bằng tải bóng đèn sợi đốt 220V trước khi thao tác sửa bo mạch.",
  },
];

// Hàm lọc câu hỏi quiz theo môn học hoặc danh mục
export function getFilteredQuizQuestions(
  subjectFilter?: string,
  categoryFilter?: KnowledgeCategory,
  limit?: number
): QuizQuestion[] {
  let list = [...KNOWLEDGE_BASE_QUIZ_QUESTIONS];

  if (subjectFilter && subjectFilter !== "ALL") {
    list = list.filter(
      (q) => q.subjectCode === subjectFilter || q.subjectTitle.includes(subjectFilter)
    );
  }

  if (categoryFilter && categoryFilter !== "ALL") {
    list = list.filter((q) => q.category === categoryFilter);
  }

  // Shuffle nhẹ nếu cần đề ngẫu nhiên
  if (limit && limit > 0) {
    return list.slice(0, limit);
  }

  return list;
}

// Hàm sinh đề thi trắc nghiệm ngẫu nhiên với đáp án xáo trộn
export function generateRandomExam(
  count: number = 5,
  subjectFilter?: string,
  categoryFilter?: KnowledgeCategory
): QuizQuestion[] {
  let pool = [...KNOWLEDGE_BASE_QUIZ_QUESTIONS];

  if (subjectFilter && subjectFilter !== "ALL") {
    pool = pool.filter(
      (q) => q.subjectCode === subjectFilter || q.subjectTitle.includes(subjectFilter)
    );
  }

  if (categoryFilter && categoryFilter !== "ALL") {
    pool = pool.filter((q) => q.category === categoryFilter);
  }

  // Thuật toán xáo trộn Fisher-Yates
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, Math.min(count, pool.length));

  // Xáo trộn vị trí 4 đáp án của mỗi câu hỏi để tránh học vẹt
  return selected.map((q) => {
    const optionsWithFlag = q.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === q.correctIndex,
    }));

    for (let i = optionsWithFlag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithFlag[i], optionsWithFlag[j]] = [optionsWithFlag[j], optionsWithFlag[i]];
    }

    const newCorrectIndex = optionsWithFlag.findIndex((opt) => opt.isCorrect);

    return {
      ...q,
      options: optionsWithFlag.map(({ text, explanation }) => ({ text, explanation })),
      correctIndex: newCorrectIndex,
    };
  });
}
