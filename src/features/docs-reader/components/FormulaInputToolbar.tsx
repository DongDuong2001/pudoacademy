"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calculator, HelpCircle, CheckCircle } from "reicon-react";
import { Button } from "@/components/ui/Button";

interface FormulaInputToolbarProps {
  onInsertSymbol: (symbol: string) => void;
  mode?: "MATH" | "CIRCUIT";
  className?: string;
  onOpenFullCheatsheet?: () => void;
}

type SymbolCategory = "ALL" | "MATH" | "ELECTRICAL" | "HVAC" | "CIRCUIT";

interface SymbolItem {
  label: string;
  insertValue: string;
  category: "MATH" | "ELECTRICAL" | "HVAC" | "CIRCUIT";
  tooltip?: string;
}

const QUICK_SYMBOLS: SymbolItem[] = [
  // Toán & toán tử
  { label: "×", insertValue: " × ", category: "MATH", tooltip: "Phép nhân" },
  { label: "÷", insertValue: " ÷ ", category: "MATH", tooltip: "Phép chia" },
  { label: "±", insertValue: " ± ", category: "MATH", tooltip: "Cộng trừ dung sai" },
  { label: "≤", insertValue: " ≤ ", category: "MATH", tooltip: "Nhỏ hơn hoặc bằng" },
  { label: "≥", insertValue: " ≥ ", category: "MATH", tooltip: "Lớn hơn hoặc bằng" },
  { label: "≈", insertValue: " ≈ ", category: "MATH", tooltip: "Xấp xỉ bằng" },
  { label: "≠", insertValue: " ≠ ", category: "MATH", tooltip: "Khác" },
  { label: "√2", insertValue: "√2", category: "MATH", tooltip: "Căn bậc hai của 2 (~1.414)" },
  { label: "²", insertValue: "²", category: "MATH", tooltip: "Bình phương" },
  { label: "³", insertValue: "³", category: "MATH", tooltip: "Lập phương" },
  { label: "Δ", insertValue: "Δ", category: "MATH", tooltip: "Độ biến thiên Delta" },
  { label: "→", insertValue: " ➔ ", category: "MATH", tooltip: "Mũi tên suy ra" },

  // Điện & công suất
  { label: "Ω", insertValue: " Ω", category: "ELECTRICAL", tooltip: "Ohm (Điện trở)" },
  { label: "kΩ", insertValue: " kΩ", category: "ELECTRICAL", tooltip: "Kilo-ohm" },
  { label: "MΩ", insertValue: " MΩ", category: "ELECTRICAL", tooltip: "Mega-ohm" },
  { label: "µF", insertValue: " µF", category: "ELECTRICAL", tooltip: "Micro-farad (Dung lượng tụ)" },
  { label: "cosφ", insertValue: "cosφ", category: "ELECTRICAL", tooltip: "Hệ số công suất cos phi" },
  { label: "η", insertValue: "η", category: "ELECTRICAL", tooltip: "Hiệu suất eta" },
  { label: "I_đm", insertValue: "I_đm", category: "ELECTRICAL", tooltip: "Dòng điện định mức" },
  { label: "I_start", insertValue: "I_start", category: "ELECTRICAL", tooltip: "Dòng điện khởi động" },
  { label: "LRA", insertValue: "LRA", category: "ELECTRICAL", tooltip: "Dòng hãm Locked Rotor Amps" },
  { label: "U_DC", insertValue: "U_DC", category: "ELECTRICAL", tooltip: "Điện áp một chiều DC" },
  { label: "U_AC", insertValue: "U_AC", category: "ELECTRICAL", tooltip: "Điện áp xoay chiều AC" },
  { label: "V", insertValue: " V", category: "ELECTRICAL", tooltip: "Volt" },
  { label: "A", insertValue: " A", category: "ELECTRICAL", tooltip: "Ampe" },
  { label: "mA", insertValue: " mA", category: "ELECTRICAL", tooltip: "Mili-ampe" },
  { label: "W", insertValue: " W", category: "ELECTRICAL", tooltip: "Watt" },
  { label: "kW", insertValue: " kW", category: "ELECTRICAL", tooltip: "Kilowatt" },
  { label: "HP", insertValue: " HP", category: "ELECTRICAL", tooltip: "Mã lực (Horsepower)" },

  // Nhiệt độ & Áp suất & Môi chất
  { label: "°C", insertValue: "°C", category: "HVAC", tooltip: "Độ Celsius" },
  { label: "°F", insertValue: "°F", category: "HVAC", tooltip: "Độ Fahrenheit" },
  { label: "PSI", insertValue: " PSI", category: "HVAC", tooltip: "Pound trên inch vuông" },
  { label: "bar", insertValue: " bar", category: "HVAC", tooltip: "Bar (Áp suất)" },
  { label: "Micron", insertValue: " Micron", category: "HVAC", tooltip: "Độ sâu chân không Micron" },
  { label: "SH", insertValue: "SH (Superheat)", category: "HVAC", tooltip: "Độ quá nhiệt" },
  { label: "SC", insertValue: "SC (Subcooling)", category: "HVAC", tooltip: "Độ quá lạnh" },
  { label: "ΔT", insertValue: "ΔT", category: "HVAC", tooltip: "Độ chênh lệch nhiệt độ" },
  { label: "N·m", insertValue: " N·m", category: "HVAC", tooltip: "Newton mét (Lực siết cờ lê lực)" },
  { label: "CFM", insertValue: " CFM", category: "HVAC", tooltip: "Lưu lượng gió (ft³/phút)" },
  { label: "m³/h", insertValue: " m³/h", category: "HVAC", tooltip: "Lưu lượng m³ trên giờ" },
  { label: "g/m", insertValue: " g/m", category: "HVAC", tooltip: "Gram trên mét ống nạp bù" },
  { label: "R32", insertValue: "gas R32", category: "HVAC", tooltip: "Môi chất R32" },
  { label: "R410A", insertValue: "gas R410A", category: "HVAC", tooltip: "Môi chất R410A" },
  { label: "R600a", insertValue: "gas R600a", category: "HVAC", tooltip: "Môi chất R600a" },

  // Cọc đấu & Chân mạch
  { label: "Chân C", insertValue: "Chân C (Common)", category: "CIRCUIT", tooltip: "Chân chung máy nén 1 pha" },
  { label: "Chân R", insertValue: "Chân R (Run)", category: "CIRCUIT", tooltip: "Chân chạy máy nén 1 pha" },
  { label: "Chân S", insertValue: "Chân S (Start)", category: "CIRCUIT", tooltip: "Chân đề máy nén 1 pha" },
  { label: "Cọc U-V-W", insertValue: "3 cọc U - V - W", category: "CIRCUIT", tooltip: "3 pha động cơ Inverter BLDC" },
  { label: "Chân 2-3 (Data)", insertValue: "Chân 2 (N) và Chân 3 (Data)", category: "CIRCUIT", tooltip: "Đường truyền dữ liệu Inverter" },
  { label: "TP1", insertValue: "Điểm đo TP1 (220V AC)", category: "CIRCUIT", tooltip: "Nguồn cấp AC vào bo" },
  { label: "TP2", insertValue: "Điểm đo TP2 (Chân 2 - 3)", category: "CIRCUIT", tooltip: "Xung giao tiếp Data 15-55V" },
  { label: "TP3", insertValue: "Điểm đo TP3 (DC 300V Bus)", category: "CIRCUIT", tooltip: "Điện áp một chiều trên tụ nguồn" },
  { label: "Opto PC817", insertValue: "Optocoupler PC817", category: "CIRCUIT", tooltip: "IC cách ly quang học" },
  { label: "IPM", insertValue: "Module công suất IPM", category: "CIRCUIT", tooltip: "Intelligent Power Module" },
];

export const FormulaInputToolbar: React.FC<FormulaInputToolbarProps> = ({
  onInsertSymbol,
  mode = "MATH",
  className,
  onOpenFullCheatsheet,
}) => {
  const [activeCategory, setActiveCategory] = useState<SymbolCategory>(
    mode === "CIRCUIT" ? "CIRCUIT" : "ALL"
  );
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [guideTab, setGuideTab] = useState<"RULES" | "CHEAT_SHEET" | "SAMPLE" | "QUICK_CHEATS">("RULES");

  const filteredSymbols = QUICK_SYMBOLS.filter((sym) => {
    if (activeCategory === "ALL") return true;
    return sym.category === activeCategory;
  });

  return (
    <div className={cn("space-y-2 border border-neutral-300 bg-neutral-100 p-2 text-xs font-mono", className)}>
      {/* Top Header: Label & Guide Toggle Button */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-300 pb-1.5">
        <div className="flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-blue-950" />
          <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-900">
            HỖ TRỢ GÕ CÔNG THỨC & SỐ ĐO
          </span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            (Bấm nút để chèn nhanh ký hiệu vào bài làm)
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 border text-[10px] sm:text-[11px] font-bold transition-none cursor-pointer shrink-0 leading-tight",
            isGuideOpen
              ? "bg-blue-950 text-white border-blue-950"
              : "bg-white text-blue-950 border-neutral-300 hover:bg-neutral-50"
          )}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="hidden sm:inline">{isGuideOpen ? "ẨN BẢNG HƯỚNG DẪN ▴" : "BẢNG HƯỚNG DẪN GÕ & QUY CHUẨN ▾"}</span>
          <span className="sm:hidden">{isGuideOpen ? "ẨN HƯỚNG DẪN ▴" : "HƯỚNG DẪN GÕ ▾"}</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 -webkit-overflow-scrolling-touch">
        <span className="text-[10px] text-neutral-500 font-bold uppercase shrink-0 mr-1">
          LỌC NHANH:
        </span>
        {(
          [
            { id: "ALL", label: "TẤT CẢ" },
            { id: "MATH", label: "TOÁN HỌC" },
            { id: "ELECTRICAL", label: "ĐIỆN & CÔNG SUẤT" },
            { id: "HVAC", label: "NHIỆT & ÁP SUẤT" },
            { id: "CIRCUIT", label: "CỌC & CHÂN MẠCH" },
          ] as const
        ).map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold border transition-none shrink-0 cursor-pointer",
              activeCategory === cat.id
                ? "bg-blue-950 text-white border-blue-950"
                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quick Insert Symbols Bar (Scrollable on mobile) */}
      <div className="flex flex-wrap gap-1 bg-white p-1.5 border border-neutral-300 max-h-28 overflow-y-auto">
        {filteredSymbols.map((sym, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onInsertSymbol(sym.insertValue)}
            title={sym.tooltip || sym.label}
            className="px-2 py-1 bg-neutral-50 hover:bg-blue-100 hover:text-blue-950 border border-neutral-200 hover:border-blue-400 text-neutral-800 text-xs font-mono font-bold transition-none cursor-pointer flex items-center gap-1 active:scale-95 leading-tight"
          >
            <span className="text-[10px] text-neutral-400">+</span>
            <span>{sym.label}</span>
          </button>
        ))}
      </div>

      {/* EXPANDABLE GUIDE PANEL (BẢNG HƯỚNG DẪN CHI TIẾT) */}
      {isGuideOpen && (
        <div className="p-3 sm:p-3.5 bg-white border-2 border-blue-900 space-y-3 mt-2 text-xs font-sans text-neutral-900 shadow-sm animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs bg-blue-950 text-white px-2 py-0.5 shrink-0">
                CẨM NANG THI TỰ LUẬN
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-950 uppercase font-mono">
                HƯỚNG DẪN GÕ & QUY CHUẨN ĐO LƯỜNG
              </h3>
            </div>

            {/* Inner Tabs */}
            <div className="flex flex-wrap border border-neutral-300 font-mono text-[10px] sm:text-[11px] w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setGuideTab("RULES")}
                className={cn(
                  "flex-1 sm:flex-none px-2 sm:px-2.5 py-1 font-bold cursor-pointer transition-none border-r border-neutral-300 text-center leading-tight",
                  guideTab === "RULES" ? "bg-blue-950 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                1. QUY CHUẨN
              </button>
              <button
                type="button"
                onClick={() => setGuideTab("CHEAT_SHEET")}
                className={cn(
                  "flex-1 sm:flex-none px-2 sm:px-2.5 py-1 font-bold cursor-pointer transition-none border-r border-neutral-300 text-center leading-tight",
                  guideTab === "CHEAT_SHEET" ? "bg-blue-950 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                2. PHÍM TẮT
              </button>
              <button
                type="button"
                onClick={() => setGuideTab("SAMPLE")}
                className={cn(
                  "flex-1 sm:flex-none px-2 sm:px-2.5 py-1 font-bold cursor-pointer transition-none border-r border-neutral-300 text-center leading-tight",
                  guideTab === "SAMPLE" ? "bg-blue-950 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                3. BÀI MẪU 10/10
              </button>
              <button
                type="button"
                onClick={() => setGuideTab("QUICK_CHEATS")}
                className={cn(
                  "flex-1 sm:flex-none px-2 sm:px-2.5 py-1 font-bold cursor-pointer transition-none text-center leading-tight text-blue-950",
                  guideTab === "QUICK_CHEATS" ? "bg-blue-950 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                <span className="hidden sm:inline">4. CHEATSHEET NHANH</span>
                <span className="sm:hidden">4. SỔ TAY</span>
              </button>
            </div>
          </div>

          {/* TAB 1: 4 BƯỚC TRÌNH BÀY ĐẠT ĐIỂM TỐI ĐA */}
          {guideTab === "RULES" && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-700 leading-relaxed">
                Để đạt điểm tối đa (10/10) trong các bài thi tự luận toán kỹ thuật và phân tích sơ đồ mạch, học viên bắt buộc phải trình bày tuần tự theo <strong>Quy tắc 4 bước của kỹ sư thực chiến</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-blue-950">
                    <span className="w-5 h-5 rounded-full bg-blue-950 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>BƯỚC 1: NÊU CÔNG THỨC TỔNG QUÁT</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed pl-6.5">
                    Ghi rõ công thức vật lý áp dụng trước khi thay số. Ví dụ: <code className="bg-neutral-200 px-1 font-mono">I_đm = P / (U × cosφ × η)</code> hoặc <code className="bg-neutral-200 px-1 font-mono">R_RS = R_CR + R_CS</code>.
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-blue-950">
                    <span className="w-5 h-5 rounded-full bg-blue-950 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>BƯỚC 2: TÓM TẮT SỐ LIỆU & ĐỔI ĐƠN VỊ</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed pl-6.5">
                    Liệt kê các biến số đề bài cho kèm đơn vị chuẩn SI. Đổi đơn vị nếu cần (vd: công suất kW đổi ra W, HP đổi ra Watt: 1 HP ≈ 746W).
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-blue-950">
                    <span className="w-5 h-5 rounded-full bg-blue-950 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>BƯỚC 3: THAY SỐ & TÍNH KÈM ĐƠN VỊ</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed pl-6.5">
                    Thế số vào biểu thức và tính ra kết quả. <strong>Tuyệt đối không được quên đơn vị đo</strong> (A, V, Ω, µF, °C, PSI, bar, N·m). Không có đơn vị bị trừ 50% điểm số câu đó!
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-blue-950">
                    <span className="w-5 h-5 rounded-full bg-blue-950 text-white flex items-center justify-center text-[10px]">4</span>
                    <span>BƯỚC 4: BIỆN LUẬN & KẾT LUẬN THỰC CHIẾN</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed pl-6.5">
                    So sánh đối chiếu với ngưỡng an toàn kỹ thuật: Chọn tiết diện dây dẫn Cadivi (1.5mm², 2.5mm² hay 4mm²), chọn định mức Aptomat MCB Curve C, hoặc kết luận linh kiện sống hay chết.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BẢNG TRA CỨU PHÍM TẮT & KÝ HIỆU THAY THẾ */}
          {guideTab === "CHEAT_SHEET" && (
            <div className="space-y-2">
              <p className="text-xs text-neutral-700 leading-relaxed">
                Học viên có thể gõ trực tiếp từ bàn phím bằng các ký tự thay thế thông dụng nếu không muốn bấm các nút chèn ký hiệu:
              </p>

              <div className="overflow-x-auto border border-neutral-300">
                <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                  <thead className="bg-neutral-100 text-neutral-700 font-mono font-bold border-b border-neutral-300">
                    <tr>
                      <th className="p-2 border-r border-neutral-300 w-36">ĐẠI LƯỢNG / THAO TÁC</th>
                      <th className="p-2 border-r border-neutral-300 w-28">KÝ HIỆU CHUẨN</th>
                      <th className="p-2 border-r border-neutral-300 w-44">CÁCH GÕ NHANH BÀN PHÍM</th>
                      <th className="p-2">VÍ DỤ TRÌNH BÀY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono text-[11px] bg-white">
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Điện trở</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">Ω, kΩ, MΩ</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">Ohm, kOhm, Mohm</td>
                      <td className="p-2 text-neutral-600">R_RS = 6.5 Ohm, R_cách điện &gt; 5 Mohm</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Dung lượng tụ</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">µF, nF</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">uF, nF</td>
                      <td className="p-2 text-neutral-600">C_ngậm = 35 uF - 450V AC</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Hệ số công suất</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">cosφ</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">cos phi, cosphi</td>
                      <td className="p-2 text-neutral-600">cos phi = 0.85</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Căn bậc hai</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">√2, √3</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">sqrt(2), căn 2</td>
                      <td className="p-2 text-neutral-600">U_DC = 220 * sqrt(2) = 311V DC</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Phép nhân / chia</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">×, ÷</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">*, /</td>
                      <td className="p-2 text-neutral-600">I = 1650 / (220 * 0.85) = 8.82A</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Nhiệt độ</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">°C, °F</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">do C, degC</td>
                      <td className="p-2 text-neutral-600">SH = T_ống - T_sôi = 10 - 4 = 6 do C</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-2 font-bold text-neutral-900 border-r border-neutral-200">Lực siết rắc co</td>
                      <td className="p-2 font-bold text-blue-950 border-r border-neutral-200">N·m</td>
                      <td className="p-2 text-neutral-700 border-r border-neutral-200">Nm, N.m</td>
                      <td className="p-2 text-neutral-600">Mô-men siết ống Ø9.52 = 38 Nm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BÀI GIẢI MẪU HOÀN HẢO ĐẠT 10/10 ĐIỂM */}
          {guideTab === "SAMPLE" && (
            <div className="space-y-2">
              <div className="p-2 bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  MẪU TRÌNH BÀY ĐẠT ĐIỂM 10/10 TUYỆT ĐỐI (CÂU HỎI TÍNH DÒNG VÀ CHỌN DÂY)
                </span>
                <span className="font-mono text-[11px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 font-bold">
                  CHUẨN THI KỸ SƯ
                </span>
              </div>

              <div className="p-3 bg-neutral-900 text-emerald-400 font-mono text-[11px] leading-relaxed border border-neutral-700 space-y-2 whitespace-pre-wrap select-text">
{`1. CÔNG THỨC TÍNH DÒNG ĐIỆN LÀM VIỆC ĐỊNH MỨC:
   I_đm = P / (U × cosφ × η)
   Trong đó:
   - P = 1,650 W (Công suất điện tiêu thụ)
   - U = 220 V (Điện áp nguồn 1 pha hiệu dụng)
   - cosφ = 0.85 (Hệ số công suất cuộn dây máy nén)
   - η = 0.85 (Hiệu suất động cơ máy nén)

2. THAY SỐ VÀO BIỂU THỨC TÍNH TOÁN:
   I_đm = 1650 / (220 × 0.85 × 0.85) = 1650 / 158.95 ≈ 10.38 A
   Dòng khởi động cực đại khi lốc đề ba (LRA):
   I_start = 5.0 × I_đm = 5.0 × 10.38 = 51.9 A (kéo dài trong < 0.5 giây)

3. LỰA CHỌN TIẾT DIỆN CÁP ĐIỆN VÀ KHÍ CỤ BẢO VỆ:
   - Với dòng làm việc liên tục I_đm = 10.38 A và chiều dài đường dây L = 25m:
     Kỹ thuật viên chọn cáp điện đồng đôi bọc PVC Cadivi 2 × 2.5 mm²
     (Mật độ dòng J = 10.38 / 2.5 = 4.15 A/mm² < J_cho_phép 6 A/mm², đảm bảo sụt áp ΔU < 2.5%).
   - Chọn Aptomat: Chọn loại MCB 20A có đường đặc tính C (Curve C - chịu được dòng khởi động gấp 5-10 lần dòng định mức mà không nhảy sai).`}
              </div>
            </div>
          )}

          {/* TAB 4: SỔ TAY CHEATSHEET TRA CỨU NHANH TRONG PHÒNG THI */}
          {guideTab === "QUICK_CHEATS" && (
            <div className="space-y-3 font-sans text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50 p-2.5 border border-blue-200">
                <span className="font-mono font-bold text-blue-950 text-xs">
                  SỔ TAY TRA CỨU THÔNG SỐ VÀNG TRONG PHÒNG THI:
                </span>
                {onOpenFullCheatsheet && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onOpenFullCheatsheet}
                    className="h-7 text-[10px] font-mono border-blue-950 text-blue-950 shrink-0 self-start sm:self-auto"
                  >
                    MỞ TRUNG TÂM CHEATSHEET ➔
                  </Button>
                )}
              </div>

              {/* Grid 4 Quick Mini Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* 1. Gas Pressures */}
                <div className="p-2.5 border border-neutral-300 bg-neutral-50 space-y-1">
                  <div className="font-mono font-bold text-[11px] text-neutral-900 border-b border-neutral-200 pb-1">
                    1. ÁP SUẤT HÚT GAS CHUẨN (PSI):
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="font-bold text-red-700">R32:</span>
                      <span>125 ~ 150 PSI (0.86 ~ 1.03 MPa)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-pink-700">R410A:</span>
                      <span>120 ~ 140 PSI (Nạp lỏng úp bình)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-emerald-700">R22:</span>
                      <span>65 ~ 75 PSI (0.45 ~ 0.52 MPa)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-cyan-700">R134a:</span>
                      <span>15 ~ 25 PSI (Tủ lạnh / Ô tô)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-amber-700">R600a:</span>
                      <span>-2 ~ 2 PSI (Chạy áp âm)</span>
                    </div>
                  </div>
                </div>

                {/* 2. Sensor Values */}
                <div className="p-2.5 border border-neutral-300 bg-neutral-50 space-y-1">
                  <div className="font-mono font-bold text-[11px] text-neutral-900 border-b border-neutral-200 pb-1">
                    2. TRỞ KHÁNG SENSOR @ 25°C:
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-950">Daikin:</span>
                      <span>Đồng 15kΩ • Gió 20kΩ • Đẩy 200kΩ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-950">Panasonic:</span>
                      <span>Đồng 15kΩ • Gió 15kΩ • Đẩy 50kΩ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-950">Toshiba:</span>
                      <span>Đồng 10kΩ • Gió 10kΩ • Đẩy 50kΩ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-950">LG:</span>
                      <span>Đồng 10kΩ • Gió 10kΩ • Đẩy 200kΩ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-950">Casper/Midea:</span>
                      <span>Đồng 5k/10kΩ • Gió 5k/10kΩ</span>
                    </div>
                  </div>
                </div>

                {/* 3. Torque Specs */}
                <div className="p-2.5 border border-neutral-300 bg-neutral-50 space-y-1">
                  <div className="font-mono font-bold text-[11px] text-neutral-900 border-b border-neutral-200 pb-1">
                    3. LỰC SIẾT CỜ LÊ LỰC ỐNG ĐỒNG:
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span>1/4&quot; (Ø6.35):</span>
                      <strong className="text-red-700">14 ~ 18 N·m</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>3/8&quot; (Ø9.52):</span>
                      <strong className="text-red-700">34 ~ 42 N·m</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>1/2&quot; (Ø12.7):</span>
                      <strong className="text-red-700">49 ~ 61 N·m</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>5/8&quot; (Ø15.88):</span>
                      <strong className="text-red-700">68 ~ 82 N·m</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Electrical Sizing */}
                <div className="p-2.5 border border-neutral-300 bg-neutral-50 space-y-1">
                  <div className="font-mono font-bold text-[11px] text-neutral-900 border-b border-neutral-200 pb-1">
                    4. CHỌN DÂY CADIVI & APTOMAT:
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span>Máy 1.0 HP (4.5A):</span>
                      <span>Dây 1.5 mm² • MCB 16A (C)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Máy 1.5 HP (7.0A):</span>
                      <span>Dây 2.5 mm² • MCB 20A (C)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Máy 2.0 HP (9.5A):</span>
                      <span>Dây 2.5 mm² • MCB 20A (C)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Máy 2.5 HP (12A):</span>
                      <span>Dây 4.0 mm² • MCB 25A (C)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
