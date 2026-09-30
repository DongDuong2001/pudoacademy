"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  AlertTriangle,
  Refresh,
  ArrowRight,
  ArrowLeft,
  Activity,
} from "reicon-react";

interface DiagnosticStep {
  id: string;
  title: string;
  question: string;
  options: {
    label: string;
    description: string;
    nextStepId?: string; // If next question
    verdict?: DiagnosticVerdict; // If leaf node (conclusion)
  }[];
}

interface DiagnosticVerdict {
  faultName: string;
  rootCause: string;
  defectivePart: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  measurementsSummary: string;
  fixSteps: string[];
  safetyRule: string;
}

const DIAGNOSTIC_DECISION_TREE: Record<string, DiagnosticStep> = {
  // ROOT LEVEL: Initial primary symptoms
  ROOT: {
    id: "ROOT",
    title: "BƯỚC 1: XÁC ĐỊNH HIỆN TƯỢNG BAN ĐẦU KHI KHÔNG CÓ MÃ LỖI",
    question: "Quan sát hiện tượng thực tế của máy lạnh khi vừa cấp nguồn và bật điều khiển:",
    options: [
      {
        label: "A. Máy hoàn toàn mất nguồn hoặc bật CB nhảy sập nguồn ngay",
        description: "Đèn dàn lạnh không sáng, không có tiếng bíp, hoặc vừa gạt Aptomat lên là nhảy lập tức.",
        nextStepId: "STEP_POWER_CHECK",
      },
      {
        label: "B. Quạt dàn lạnh chạy vù vù nhưng gió không mát (Block không chạy)",
        description: "Dàn lạnh hoạt động bình thường, cài đặt 16°C nhưng chờ 5 phút máy nén ngoài trời vẫn im lìm.",
        nextStepId: "STEP_COMPRESSOR_SILENT",
      },
      {
        label: "C. Dàn lạnh hoặc đường ống đồng bị bám tuyết trắng xóa",
        description: "Gió thổi ra kèm hơi sương hoặc nhỏ giọt nước, mở nắp thấy dàn lạnh hoặc ống nhỏ/lớn phủ tuyết.",
        nextStepId: "STEP_ICE_LOCATION",
      },
      {
        label: "D. Máy nén chạy 3 - 5 phút mát nhẹ rồi ngắt lốc đột ngột",
        description: "Dàn nóng rung chạy một lúc rồi ngắt nghe tiếng 'tạch' từ rơ-le OLP, sau đó chỉ còn quạt chạy.",
        nextStepId: "STEP_TRIP_AFTER_MINUTES",
      },
      {
        label: "E. Máy chạy suốt nhưng kém lạnh, áp suất hút cao bất thường",
        description: "Gió ra chỉ hơi man mát, kẹp đồng hồ áp suất hút thấy kim vọt cao (>150 PSI với R32) dòng ampe tụt sâu.",
        nextStepId: "STEP_HIGH_SUCTION_CHECK",
      },
    ],
  },

  // 1. Branch POWER
  STEP_POWER_CHECK: {
    id: "STEP_POWER_CHECK",
    title: "BƯỚC 2: ĐO ĐIỆN ÁP & ĐIỆN TRỞ CÁCH ĐIỆN CHỐNG NGẮN MẠCH",
    question: "Dùng đồng hồ VOM kiểm tra nguồn cấp và tình trạng nhảy CB:",
    options: [
      {
        label: "Gạt CB lên nhảy ngay lập tức kèm tiếng nổ xẹt lửa",
        description: "Ngắn mạch trực tiếp giữa Pha (L) và Trung tính (N) hoặc rò chạm vỏ sắt.",
        verdict: {
          faultName: "Ngắn mạch nguồn cấp hoặc chạm chập công suất IGBT / Cầu Diode",
          rootCause: "Chập cầu Diode chỉnh lưu hoặc nổ khối công suất IPM trên bo biến tần, hoặc chập cuộn dây lốc chạm vỏ sắt.",
          defectivePart: "Cầu Diode / Modul công suất IPM / Cuộn dây máy nén chạm mass",
          severity: "CRITICAL",
          measurementsSummary: "Điện trở L - N hoặc L - PE đo được 0 Ω (chập thông mạch).",
          fixSteps: [
            "1. Ngắt hoàn toàn điện nguồn, rút 3 cọc U-V-W của máy nén ra khỏi bo mạch.",
            "2. Dùng thang đo Mega-Ohm kẹp vào từng cọc máy nén với vỏ sắt (tiêu chuẩn phải > 5 MΩ). Nếu = 0Ω là lốc chạm vỏ phải thay máy nén.",
            "3. Nếu lốc tốt, đo thang Diode trên bo mạch: Đo cực (+)/(-) của cầu Diode và các chân U, V, W của khối IPM. Nếu cặp nào thông 0Ω thì thay thế cầu Diode hoặc thay IC công suất IPM.",
          ],
          safetyRule: "Tuyệt đối không gạt lại CB nhiều lần khi bị ngắn mạch vì sẽ làm nổ văng tia lửa điện phá hỏng hoàn toàn đường mạch in!",
        },
      },
      {
        label: "CB không nhảy nhưng đo điện áp đầu vào bo mạch đủ 220V, cầu chì đứt",
        description: "Đo nguồn cấp có 220V AC nhưng máy không khởi động, kiểm tra cầu chì ống 3.15A trên bo bị nổ đen.",
        verdict: {
          faultName: "Nổ cầu chì bo mạch do sốc sét hoặc chập tụ chống sét biến trở VDR",
          rootCause: "Lưới điện bị xung sét lan truyền hoặc điện áp vọt trên 275V AC làm nổ tụ chống sét (Varistor/VDR) nối tắt dòng nổ cầu chì bảo vệ.",
          defectivePart: "Cầu chì bảo vệ 3.15A và Tụ chống sét VDR",
          severity: "HIGH",
          measurementsSummary: "Cầu chì đứt vô cùng (∞), tụ chống sét nứt vỡ hoặc đen xém.",
          fixSteps: [
            "1. Kiểm tra hình dáng tụ chống sét biến trở (viên tròn màu xanh/vàng gần cầu chì). Nếu nứt vỡ, dùng kìm bấm xả bỏ hoặc thay tụ mới 275V AC.",
            "2. Đo kiểm tra cầu Diode phía sau xem có bị chập ké theo không.",
            "3. Thay đúng cầu chì sứ nguyên bản 3.15A - 250V (Tuyệt đối không lấy sợi dây đồng to câu tắt).",
          ],
          safetyRule: "Không được câu tắt dây đồng to thay cầu chì vì lần sét đánh tiếp theo sẽ nổ nát vi xử lý và gây cháy nhà!",
        },
      },
    ],
  },

  // 2. Branch COMPRESSOR SILENT
  STEP_COMPRESSOR_SILENT: {
    id: "STEP_COMPRESSOR_SILENT",
    title: "BƯỚC 2: KIỂM TRA ĐIỆN ÁP CẤP RA CỤC NÓNG & TỤ KHỞI ĐỘNG",
    question: "Kỹ thuật viên ra dàn nóng, đo điện áp tại cọc cầu đấu dây (L - N hoặc Chân 1 - 2):",
    options: [
      {
        label: "Đo tại cọc cấp dàn nóng KHÔNG CÓ điện áp 220V AC",
        description: "Dàn lạnh chạy nhưng không chịu đóng điện ra dàn nóng sau 3 phút chờ trễ.",
        verdict: {
          faultName: "Hỏng Rơ-le cấp nguồn trên bo dàn lạnh hoặc đứt dây tín hiệu liên kết",
          rootCause: "Rơ-le chính (Power Relay) trên bo mạch dàn lạnh bị cháy tiếp điểm hoặc chuột cắn đứt dây điện liên kết 1-2 ngoài tường.",
          defectivePart: "Rơ-le đóng lốc (12VDC - 20A) trên bo dàn lạnh / Dây cáp điện liên kết",
          severity: "MEDIUM",
          measurementsSummary: "Điện áp lệnh đóng từ vi xử lý có (12V tại chân cuộn hút rơ-le) nhưng tiếp điểm ra tải = 0V.",
          fixSteps: [
            "1. Kiểm tra thông mạch từng sợi dây cáp điện nối giữa dàn lạnh và dàn nóng.",
            "2. Tháo bo dàn lạnh, kiểm tra cuộn hút và tiếp điểm rơ-le đóng lốc. Hàn thay rơ-le mới 12VDC-20A chịu tải.",
            "3. Kiểm tra cảm biến nhiệt độ phòng: Nếu sensor phòng bị tăng trị số làm vi xử lý tưởng phòng đã đủ lạnh sẽ không đóng lốc.",
          ],
          safetyRule: "Cắt nguồn điện trước khi tháo gỡ bo mạch dàn lạnh để tránh chạm que đo vào mạch nguồn xung.",
        },
      },
      {
        label: "Đo tại dàn nóng có 220V AC, nghe block gầm 'ừ ừ' rồi ngắt",
        description: "Điện áp cấp đầy đủ nhưng máy nén không thể quay nổi, rung mạnh gầm rú trong 3-5 giây rồi ngắt.",
        nextStepId: "STEP_CAPACITOR_OR_STUCK",
      },
    ],
  },

  STEP_CAPACITOR_OR_STUCK: {
    id: "STEP_CAPACITOR_OR_STUCK",
    title: "BƯỚC 3: PHÂN BIỆT CHẾT TỤ NGẬM VÀ KẸT CƠ KHÍ MÁY NÉN",
    question: "Tháo nắp cục nóng, dùng đồng hồ VOM thang đo điện dung (Capacitance) đo tụ ngậm tròn nhôm:",
    options: [
      {
        label: "Tụ ngậm bị phồng đít, đo điện dung tụ tụt về 0 hoặc dưới 50% trị số nhãn",
        description: "Tụ 35μF nhưng đo thực tế chỉ còn 2μF hoặc kim đo thang x10k không nạp xả.",
        verdict: {
          faultName: "Hỏng tụ ngậm khởi động máy nén (Run Capacitor Defect)",
          rootCause: "Tụ điện làm việc lâu năm dưới nhiệt độ cao của dàn nóng làm dầu tản nhiệt bên trong bay hơi hoặc đánh thủng màng điện môi.",
          defectivePart: "Tụ ngậm động cơ 1 pha (30μF - 45μF / 450V AC)",
          severity: "MEDIUM",
          measurementsSummary: "Dung lượng thực tế giảm sâu so với giá trị ghi trên vỏ tụ.",
          fixSteps: [
            "1. Dùng tô vít có cán cách điện xả điện tích còn lại trên 2 chân tụ xuống vỏ mass.",
            "2. Rút dây cắm và thay thế tụ ngậm mới có cùng điện dung (±5%) và điện áp chịu đựng ≥ 450V AC.",
            "3. Cắm điện bật thử máy nén, kẹp ampe kìm kiểm tra dòng chạy lốc về mức định mức (3.5A - 6.5A).",
          ],
          safetyRule: "Bắt buộc xả điện tụ trước khi chạm tay vào cực để chống điện giật từ điện tích tích trữ hàng trăm Vôn!",
        },
      },
      {
        label: "Tụ ngậm còn tốt nguyên (đo đủ 35μF), lốc vẫn gầm kẹp dòng vọt chạm LRA > 30A",
        description: "Thay tụ mới vào lốc vẫn không đề ba được, dòng điện vọt lên ngưỡng LRA rồi rơ-le OLP nhảy cạch.",
        verdict: {
          faultName: "Máy nén bị kẹt cơ khí hoàn toàn (Mechanical Piston / Scroll Seizure)",
          rootCause: "Hệ thống bị mất dầu bôi trơn, ngập dịch lỏng làm vỡ lá van hoặc mạt sắt cọ xát kẹt cứng piston trong xi-lanh.",
          defectivePart: "Cụm cơ khí máy nén khí kín (Compressor Block)",
          severity: "CRITICAL",
          measurementsSummary: "Dòng khởi động đạt ngưỡng hãm LRA (Locked Rotor Amps), lốc không quay được.",
          fixSteps: [
            "1. Thử dùng tụ ngậm kích dung lượng gấp đôi kết hợp rơ-le khởi động nhanh (Hard Start Kit) để kích đề 1-2 lần.",
            "2. Nếu vẫn không thoát kẹt: Kết luận máy nén hỏng cơ hoàn toàn.",
            "3. Bắt buộc thay máy nén mới, súc rửa sạch hệ thống đường ống bằng khí Nitơ và dung dịch làm sạch R141b, thay phin lọc mới.",
          ],
          safetyRule: "Không ngâm điện lốc kẹt cơ quá lâu vì dòng LRA cực lớn sẽ làm cháy cách điện bốc khói độc bên trong vỏ kín máy nén.",
        },
      },
    ],
  },

  // 3. Branch ICE
  STEP_ICE_LOCATION: {
    id: "STEP_ICE_LOCATION",
    title: "BƯỚC 2: XÁC ĐỊNH VỊ TRÍ ĐÓNG TUYẾT TRÊN HỆ THỐNG",
    question: "Mở dàn nóng và dàn lạnh, quan sát chính xác vị trí bắt đầu xuất hiện mảng tuyết trắng:",
    options: [
      {
        label: "Chỉ đóng tuyết duy nhất ở ĐẦU ĐẨY (Ống đồng nhỏ) ngay tại van chặn dàn nóng",
        description: "Ống nhỏ đóng một lớp tuyết trắng xóa từ van khóa kéo dài vào trong, ống lớn không có tuyết.",
        verdict: {
          faultName: "Thiếu môi chất lạnh (Thiếu Gas) do rò rỉ rắc-co hoặc dàn trao đổi nhiệt",
          rootCause: "Gas bị xì qua mối loe rắc co hoặc mọt dàn làm áp suất bay hơi tụt sâu dưới 0°C ngay tại điểm bắt đầu tiết lưu.",
          defectivePart: "Mối nối loe ống đồng (Flare Fitting) / Rò rỉ thủng dàn",
          severity: "HIGH",
          measurementsSummary: "Áp suất hút P_hút tụt sâu (< 90 PSI với R32, < 40 PSI với R22). Độ quá nhiệt SH > 12°C.",
          fixSteps: [
            "1. Dùng bọt xà phòng hoặc máy dò gas điện tử quét kỹ 4 đầu rắc-co dàn nóng và dàn lạnh.",
            "2. Thu hồi gas (nếu còn), cắt bỏ đầu loe cũ và loe lại theo chuẩn góc 45° bằng dao chuyên dụng, siết đúng lực siết Torque.",
            "3. Hút chân không sâu < 500 Micron và nạp lại toàn bộ gas đúng trọng lượng bằng cân điện tử theo tem máy.",
          ],
          safetyRule: "Với gas R410A là hỗn hợp 50/50, nếu rò rỉ trên 30% bắt buộc phải xả sạch hút chân không nạp lại dạng lỏng, không được châm dặm.",
        },
      },
      {
        label: "Đóng tuyết kín mít TOÀN BỘ DÀN LẠNH và lan tràn ra cả Ống đồng lớn (Ống hút)",
        description: "Ống to đổ mồ hôi đọng đá về tận máy nén, quạt dàn lạnh thổi gió yếu xìu.",
        verdict: {
          faultName: "Tắc nghẽn trao đổi nhiệt dàn lạnh do quá bẩn hoặc quạt quay yếu / hỏng tụ quạt",
          rootCause: "Lưới lọc bụi và cánh tản nhiệt bám kín mảng bẩn dày đặc hoặc quạt lồng sóc bị kẹt lông bụi không giải nhiệt được, làm gas lỏng không sôi hóa hơi được trong dàn.",
          defectivePart: "Lưới lọc & Lá nhôm dàn lạnh bẩn / Tụ quạt dàn lạnh bị giảm dung lượng",
          severity: "MEDIUM",
          measurementsSummary: "Áp suất hút thấp, độ quá nhiệt SH xấp xỉ 0°C (nguy cơ ngập dịch lỏng).",
          fixSteps: [
            "1. Tắt máy, xịt rửa bảo dưỡng toàn diện lưới lọc và dàn tản nhiệt nhôm bằng máy bơm áp lực.",
            "2. Kiểm tra tốc độ quay của quạt lồng sóc dàn lạnh. Nếu quay lờ đờ, đo kiểm tra tụ quạt dàn lạnh (thường 1.2μF - 2.0μF).",
            "3. Kiểm tra mô-tơ quạt xem có bị bó bạc đạn khô dầu không.",
          ],
          safetyRule: "Hiện tượng đóng tuyết ống hút rất nguy hiểm vì giọt gas lỏng chưa bay hơi sẽ tràn vào xilanh máy nén gây thủy lực phá vỡ lá van nén!",
        },
      },
    ],
  },

  // 4. Branch OVERHEAT TRIP
  STEP_TRIP_AFTER_MINUTES: {
    id: "STEP_TRIP_AFTER_MINUTES",
    title: "BƯỚC 2: ĐO ÁP SUẤT NÉN VÀ DÒNG LÀM VIỆC KHI LỐC CHẠY",
    question: "Kẹp ampe kìm và gắn đồng hồ đo áp suất cao trong 3 phút máy đang chạy trước khi bị ngắt:",
    options: [
      {
        label: "Dòng điện tăng dần vượt định mức, quạt dàn nóng không quay hoặc quay lờ đờ",
        description: "Quạt giải nhiệt cục nóng không thổi ra gió nóng, vỏ dàn nóng bỏng rát.",
        verdict: {
          faultName: "Hỏng quạt giải nhiệt dàn nóng làm áp suất ngưng tụ vọt đỉnh giải nhiệt kém",
          rootCause: "Cháy cuộn dây động cơ quạt dàn nóng hoặc chết tụ quạt (thường 2.5μF - 3.5μF), không tản được nhiệt ngưng tụ.",
          defectivePart: "Mô-tơ quạt dàn nóng hoặc Tụ quạt dàn nóng",
          severity: "HIGH",
          measurementsSummary: "Áp suất nén vọt trên 550 PSI (R32/R410A), dòng điện tăng lên 12A - 15A làm OLP nhảy cắt.",
          fixSteps: [
            "1. Kiểm tra tụ quạt dàn nóng bằng thang điện dung VOM và thay mới nếu tụt dung lượng.",
            "2. Nếu tụ tốt, đo 3 dây quạt dàn nóng xem có đứt cuộn dây không. Thay động cơ quạt mới nếu cháy.",
            "3. Xịt rửa thông thoáng dàn nóng bằng nước áp lực loại bỏ bụi bẩn cản gió tản nhiệt.",
          ],
          safetyRule: "Khi áp suất ngưng tụ vượt quá 45 bar, lốc có thể nổ phin lọc hoặc biến dạng vỏ nếu rơ-le áp suất bảo vệ bị kẹt tiếp điểm.",
        },
      },
      {
        label: "Quạt dàn nóng quay tít bình thường, nhưng nạp quá thừa gas làm áp suất vọt cao",
        description: "Thợ trước châm quá nhiều gas lỏng, dòng ampe cao hơn 30% tem máy, quạt thổi gió bỏng rát.",
        verdict: {
          faultName: "Hệ thống bị nạp quá thừa môi chất lạnh (Dư Gas nghiêm trọng)",
          rootCause: "Nạp gas không dùng cân định lượng, châm gas theo cảm tính dưới trời lạnh làm khi trời nắng áp suất ngưng tụ dâng cao chiếm hết thể tích dàn ngưng.",
          defectivePart: "Lượng gas nạp dư thừa trong hệ thống",
          severity: "MEDIUM",
          measurementsSummary: "Dòng làm việc I_lv > 1.3 × I_đm, độ quá lạnh Subcooling SC > 8°C.",
          fixSteps: [
            "1. Gắn máy thu hồi gas hoặc xả bớt môi chất lạnh từ từ ở van dịch vụ đường ống lỏng vào bình chứa.",
            "2. Theo dõi dòng ampe kìm cho tới khi dòng tụt về đúng giá trị định mức ghi trên tem Nameplate máy.",
            "3. Kiểm tra độ quá nhiệt SH đạt từ 5°C đến 7°C là chuẩn xác nhất.",
          ],
          safetyRule: "Tuyệt đối không xả xì gas trực tiếp ra phòng kín hoặc gần ngọn lửa trần vì gas R32 có tính bắt cháy nhẹ (A2L).",
        },
      },
    ],
  },

  // 5. Branch HIGH SUCTION
  STEP_HIGH_SUCTION_CHECK: {
    id: "STEP_HIGH_SUCTION_CHECK",
    title: "BƯỚC 2: ĐO CHÊNH LỆCH ÁP SUẤT VÀ KIỂM TRA ĐỘ KÍN CỦA BƠM",
    question: "Quan sát chỉ số áp suất hút và so sánh dòng điện ampe làm việc:",
    options: [
      {
        label: "Áp suất hút cao (>160 PSI với R32), dòng điện lại tụt rất thấp so với tem, sờ lốc mát lạnh",
        description: "Máy nén chạy êm ru nhưng không nén được gas, chênh lệch áp suất giữa đầu hút và đẩy gần như bằng nhau.",
        verdict: {
          faultName: "Tụt hơi máy nén / Gãy lá van hút hoặc hở xéc-măng (Compressor Valve Loss)",
          rootCause: "Lá van hút (Suction Reed Valve) bị biến dạng mỏi kim loại hoặc kẹt mạt kim loại làm hơi gas nén bị phụt ngược lại khoang hút.",
          defectivePart: "Lá van nén / Cụm xilanh piston máy nén",
          severity: "CRITICAL",
          measurementsSummary: "Áp hút rất cao, áp đẩy thấp, dòng làm việc chỉ bằng 40-50% định mức vì máy nén chạy không tải.",
          fixSteps: [
            "1. Khóa van ống lỏng (đầu đẩy) để test thử nghiệm bơm nhốt gas (Pump-down test).",
            "2. Nếu lốc không thể hút chân không được đường ống về dưới 0 PSI hoặc vừa tắt máy áp suất vọt ngược lại ngay: Khẳng định 100% tụt van.",
            "3. Bắt buộc thay cụm máy nén mới chính hãng.",
          ],
          safetyRule: "Máy nén tụt hơi không thể sửa chữa phục hồi bên ngoài vì là lốc hàn kín (Hermetic), cố chạy chỉ gây tốn điện vô ích.",
        },
      },
      {
        label: "Áp suất hút cao nhưng kiểm tra van 4 ngả (Reversing Valve) bị ấm nóng cả 2 ống",
        description: "Máy 2 chiều nóng lạnh, cuộn hút van 4 ngả bị rò rỉ khí làm gas nóng xả thông thẳng về ống hút.",
        verdict: {
          faultName: "Kẹt hở con trượt van đảo chiều 4 ngả (Reversing Valve Blow-by)",
          rootCause: "Con trượt Teflon bên trong thân van 4 ngả bị kẹt lửng ở giữa hành trình hoặc cuộn hút điện từ bị chập rỉ.",
          defectivePart: "Van đảo chiều 4 ngả (4-Way Reversing Valve)",
          severity: "HIGH",
          measurementsSummary: "Độ chênh lệch nhiệt độ giữa ống hút và thân van 4 ngả bị sụt giảm.",
          fixSteps: [
            "1. Cấp điện trực tiếp vào cuộn hút van 4 ngả rồi ngắt nhiều lần kết hợp dùng cán tô vít nhựa gõ nhẹ thân van để kích nhả con trượt.",
            "2. Nếu con trượt vẫn kẹt xả thông hơi nóng: Tiến hành xả gas, dùng khăn ướt quấn bảo vệ thân van và hàn thay van 4 ngả mới.",
            "3. Khi hàn van 4 ngả bắt buộc phải quấn giẻ ướt liên tục để nhiệt độ thân van không vượt quá 120°C tránh làm chảy phớt cao su bên trong.",
          ],
          safetyRule: "Luôn quấn khăn ướt khi hàn van 4 ngả, quá nhiệt sẽ làm cháy phớt cao su biến van mới thành phế liệu!",
        },
      },
    ],
  },
};

export const DiagnosticWizard: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<string>("ROOT");
  const [history, setHistory] = useState<string[]>([]);
  const [currentVerdict, setCurrentVerdict] = useState<DiagnosticVerdict | null>(null);

  const currentStep = DIAGNOSTIC_DECISION_TREE[currentStepId] || DIAGNOSTIC_DECISION_TREE["ROOT"];

  const handleSelectOption = (opt: (typeof currentStep.options)[0]) => {
    if (opt.verdict) {
      setCurrentVerdict(opt.verdict);
    } else if (opt.nextStepId) {
      setHistory((prev) => [...prev, currentStepId]);
      setCurrentStepId(opt.nextStepId);
    }
  };

  const handleBack = () => {
    if (currentVerdict) {
      setCurrentVerdict(null);
      return;
    }
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentStepId(prev);
    }
  };

  const handleReset = () => {
    setCurrentStepId("ROOT");
    setHistory([]);
    setCurrentVerdict(null);
  };

  return (
    <div className="border border-neutral-300 p-4 sm:p-5 bg-white space-y-5 font-sans">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5 uppercase">
              DIAGNOSTIC DECISION WIZARD
            </span>
            <Badge variant="warning" size="sm">
              BẮT BỆNH KHÔNG CẦN MÃ LỖI
            </Badge>
          </div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase mt-1">
            Cây Phán Đoán Pan Bệnh Hiện Trường Tương Tác
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {(history.length > 0 || currentVerdict) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="font-mono text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>QUAY LẠI</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="font-mono text-xs flex items-center gap-1 border-neutral-400"
          >
            <Refresh className="w-3.5 h-3.5" />
            <span>BẮT ĐẦU LẠI</span>
          </Button>
        </div>
      </div>

      {/* Decision Tree Body */}
      {!currentVerdict ? (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50/50 border border-blue-200 space-y-1">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-blue-950 uppercase">
              <Activity className="w-4 h-4 text-blue-900" />
              <span>{currentStep.title}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-950 pt-0.5">
              {currentStep.question}
            </h3>
          </div>

          <div className="space-y-2">
            {currentStep.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left p-3.5 bg-white border border-neutral-300 hover:border-blue-950 hover:bg-neutral-50 transition-none flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-neutral-950 group-hover:text-blue-950">
                    {opt.label}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {opt.description}
                  </p>
                </div>
                <div className="p-1 bg-neutral-100 group-hover:bg-blue-950 group-hover:text-white shrink-0 mt-0.5 border border-neutral-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Final Verdict Display */
        <div className="space-y-4 border-2 border-neutral-900 p-4 sm:p-5 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5 uppercase">
                KẾT QUẢ PHÁN ĐOÁN XÁC ĐỊNH
              </span>
              <Badge
                variant={
                  currentVerdict.severity === "CRITICAL"
                    ? "danger"
                    : currentVerdict.severity === "HIGH"
                    ? "warning"
                    : "info"
                }
                size="sm"
              >
                MỨC ĐỘ: {currentVerdict.severity}
              </Badge>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              TIÊU CHUẨN KỸ SƯ THỰC HÀNH PUDO
            </span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase">
              {currentVerdict.faultName}
            </h3>
            <div className="text-xs font-mono text-neutral-600 mt-1">
              Linh kiện nghi vấn / Hư hỏng chính: <strong>{currentVerdict.defectivePart}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="font-mono font-bold text-neutral-800 uppercase block">
                NGUYÊN NHÂN GỐC RỄ (ROOT CAUSE):
              </span>
              <p className="text-neutral-700 leading-relaxed">{currentVerdict.rootCause}</p>
            </div>

            <div className="p-3 bg-blue-50/50 border border-blue-200 space-y-1">
              <span className="font-mono font-bold text-blue-950 uppercase block">
                DẤU HIỆU ĐO KIỂM THỰC TẾ:
              </span>
              <p className="text-neutral-800 font-mono text-[11px] leading-relaxed">
                {currentVerdict.measurementsSummary}
              </p>
            </div>
          </div>

          {/* Fix Steps */}
          <div className="space-y-2 pt-1">
            <span className="font-mono font-bold text-xs uppercase text-neutral-900 block">
              QUY TRÌNH XỬ LÝ & KHẮC PHỤC CHUẨN TỪNG BƯỚC:
            </span>
            <div className="p-3 bg-neutral-100 border border-neutral-300 space-y-2 text-xs">
              {currentVerdict.fixSteps.map((step, sIdx) => (
                <div key={sIdx} className="leading-relaxed font-sans text-neutral-800">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Safety Rule */}
          <div className="p-3 bg-amber-50 border-l-4 border-amber-600 text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Quy tắc an toàn sống còn:</strong> {currentVerdict.safetyRule}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={handleReset}
              className="font-mono text-xs flex items-center gap-1.5"
            >
              <Refresh className="w-3.5 h-3.5" />
              <span>CHẨN ĐOÁN MÁY KHÁC HOẶC HIỆN TƯỢNG MỚI</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
