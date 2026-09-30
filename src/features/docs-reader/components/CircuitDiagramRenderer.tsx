"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRight } from "reicon-react";

interface CircuitDiagramRendererProps {
  type: "INVERTER_COMMUNICATION" | "COMPRESSOR_MOTOR" | "DC_BUS_POWER" | "GROUNDING_RCBO";
  testPoints?: {
    point: string;
    location: string;
    nominalValue: string;
    significance: string;
  }[];
  className?: string;
}

export const CircuitDiagramRenderer: React.FC<CircuitDiagramRendererProps> = ({
  type,
  testPoints = [],
  className,
}) => {
  const [activePoint, setActivePoint] = useState<string | null>(null);

  return (
    <div className={cn("border border-neutral-300 bg-white p-3 sm:p-4 space-y-4 max-w-full min-w-0 font-sans", className)}>
      {/* Header Banner - LaTeX / Textbook Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-300 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-neutral-900 shrink-0"></span>
          <span className="font-mono font-black text-xs uppercase tracking-wider text-neutral-950">
            SƠ ĐỒ NGUYÊN LÝ CHUẨN LATEX (GIÁO TRÌNH ĐIỆN - ĐIỆN LẠNH)
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-300 self-start sm:self-auto">
          TIÊU CHUẨN IEC / TCVN • TĨNH RÕ NÉT
        </span>
      </div>

      {/* SVG Canvas - Crisp LaTeX Engineering Aesthetic (Zero Distracting Animations) */}
      <div className="w-full overflow-x-auto bg-white border border-neutral-300 p-2 sm:p-3 flex justify-center">
        {/* ========================================================================= */}
        {/* SƠ ĐỒ 1: MẠCH GIAO TIẾP INVERTER (LỖI U4 DAIKIN / PANASONIC) */}
        {/* ========================================================================= */}
        {type === "INVERTER_COMMUNICATION" && (
          <svg viewBox="0 0 760 310" className="w-full max-w-[760px] h-auto select-none font-mono text-xs text-neutral-900">
            {/* Subtle Engineering Grid */}
            <defs>
              <pattern id="latex-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
              </pattern>
              <marker id="latex-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#0f172a" />
              </marker>
              <marker id="latex-arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#b91c1c" />
              </marker>
            </defs>
            <rect width="760" height="310" fill="url(#latex-grid)" />

            {/* KHỐI BO DÀN LẠNH (INDOOR UNIT) */}
            <rect x="25" y="25" width="210" height="260" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="25" y="25" width="210" height="26" fill="#0f172a" />
            <text x="35" y="42" fontWeight="bold" fill="#ffffff" fontSize="11">BO DÀN LẠNH (INDOOR)</text>
            <text x="35" y="68" fill="#475569" fontSize="9">MCU TX/RX (5V DC)</text>

            {/* Opto PC1 phát tín hiệu TX */}
            <rect x="40" y="85" width="95" height="48" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="48" y="102" fontWeight="bold" fill="#0f172a" fontSize="9.5">OPTO PC1 (TX)</text>
            <text x="48" y="116" fill="#64748b" fontSize="8.5">Phát tín hiệu</text>
            <text x="48" y="126" fill="#b91c1c" fontSize="8">LED 1-2: 1.1V</text>

            {/* Opto PC2 nhận tín hiệu RX */}
            <rect x="40" y="145" width="95" height="48" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="48" y="162" fontWeight="bold" fill="#0f172a" fontSize="9.5">OPTO PC2 (RX)</text>
            <text x="48" y="176" fill="#64748b" fontSize="8.5">Nhận tín hiệu</text>
            <text x="48" y="186" fill="#1e3a8a" fontSize="8">Transistor 3-4</text>

            {/* Cầu đấu Domino Dàn Lạnh (Terminals 1 - 2 - 3) */}
            <rect x="180" y="80" width="45" height="185" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="187" y="95" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="194" y="113" fontWeight="bold" fill="#b91c1c" fontSize="11">1 (L)</text>

            <rect x="187" y="155" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="194" y="173" fontWeight="bold" fill="#1e3a8a" fontSize="11">2 (N)</text>

            <rect x="187" y="215" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="194" y="233" fontWeight="bold" fill="#0f172a" fontSize="11">3 (S)</text>

            {/* KHỐI BO DÀN NÓNG (OUTDOOR UNIT) */}
            <rect x="525" y="25" width="210" height="260" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="525" y="25" width="210" height="26" fill="#0f172a" />
            <text x="535" y="42" fontWeight="bold" fill="#ffffff" fontSize="11">BO DÀN NÓNG (OUTDOOR)</text>
            <text x="535" y="68" fill="#475569" fontSize="9">MCU BIẾN TẦN & IPM</text>

            {/* Cầu đấu Domino Dàn Nóng (Terminals 1 - 2 - 3) */}
            <rect x="535" y="80" width="45" height="185" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="542" y="95" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="549" y="113" fontWeight="bold" fill="#b91c1c" fontSize="11">1 (L)</text>

            <rect x="542" y="155" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="549" y="173" fontWeight="bold" fill="#1e3a8a" fontSize="11">2 (N)</text>

            <rect x="542" y="215" width="30" height="28" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <text x="549" y="233" fontWeight="bold" fill="#0f172a" fontSize="11">3 (S)</text>

            {/* Opto PC3 nhận RX Dàn Nóng */}
            <rect x="625" y="85" width="95" height="48" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="633" y="102" fontWeight="bold" fill="#0f172a" fontSize="9.5">OPTO PC3 (RX)</text>
            <text x="633" y="116" fill="#64748b" fontSize="8.5">Nhận tín hiệu</text>
            <text x="633" y="126" fill="#1e3a8a" fontSize="8">Transistor 3-4</text>

            {/* Opto PC4 phát TX Dàn Nóng */}
            <rect x="625" y="145" width="95" height="48" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="633" y="162" fontWeight="bold" fill="#0f172a" fontSize="9.5">OPTO PC4 (TX)</text>
            <text x="633" y="176" fill="#64748b" fontSize="8.5">Phát tín hiệu</text>
            <text x="633" y="186" fill="#b91c1c" fontSize="8">LED 1-2: 1.1V</text>

            {/* 3 ĐƯỜNG DÂY LIÊN DÀN KẾT NỐI (INTERCONNECTING WIRES) */}
            {/* Dây 1 (L): Pha nóng */}
            <line x1="225" y1="109" x2="535" y2="109" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="225" cy="109" r="3.5" fill="#b91c1c" />
            <circle cx="535" cy="109" r="3.5" fill="#b91c1c" />
            <rect x="310" y="96" width="140" height="22" fill="#ffffff" stroke="#b91c1c" strokeWidth="1" />
            <text x="316" y="111" fill="#b91c1c" fontWeight="bold" fontSize="9.5">DÂY 1 (L) • 220V AC</text>

            {/* Dây 2 (N): Trung tính */}
            <line x1="225" y1="169" x2="535" y2="169" stroke="#1e3a8a" strokeWidth="2.5" />
            <circle cx="225" cy="169" r="3.5" fill="#1e3a8a" />
            <circle cx="535" cy="169" r="3.5" fill="#1e3a8a" />
            <rect x="310" y="156" width="140" height="22" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1" />
            <text x="316" y="171" fill="#1e3a8a" fontWeight="bold" fontSize="9.5">DÂY 2 (N) • TRUNG TÍNH (0V)</text>

            {/* Dây 3 (Signal/Data): Xung giao tiếp DC */}
            <line x1="225" y1="229" x2="535" y2="229" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="5 4" />
            <circle cx="225" cy="229" r="3.5" fill="#0f172a" />
            <circle cx="535" cy="229" r="3.5" fill="#0f172a" />
            <rect x="290" y="216" width="180" height="24" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <text x="296" y="232" fill="#0f172a" fontWeight="bold" fontSize="9.5">DÂY 3 (DATA) • XUNG 15V ~ 55V DC</text>

            {/* Mũi tên chiều xung truyền dữ liệu */}
            <line x1="135" y1="109" x2="180" y2="109" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#latex-arrow)" />
            <line x1="580" y1="109" x2="625" y2="109" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#latex-arrow)" />

            {/* ĐIỂM TEST POINT ĐO KIỂM (CÓ TƯƠNG TÁC CHỌN) */}
            {/* TP1: Đo áp nguồn 1 - 2 */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP1" ? null : "TP1")}>
              <circle cx="265" cy="139" r="14" fill={activePoint === "TP1" ? "#b91c1c" : "#ffffff"} stroke="#b91c1c" strokeWidth="2" />
              <text x="257" y="143" fill={activePoint === "TP1" ? "#ffffff" : "#b91c1c"} fontWeight="bold" fontSize="10">TP1</text>
            </g>

            {/* TP2: Đo xung Data 2 - 3 */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP2" ? null : "TP2")}>
              <circle cx="265" cy="199" r="14" fill={activePoint === "TP2" ? "#0f172a" : "#ffffff"} stroke="#0f172a" strokeWidth="2" />
              <text x="257" y="203" fill={activePoint === "TP2" ? "#ffffff" : "#0f172a"} fontWeight="bold" fontSize="10">TP2</text>
            </g>

            {/* TP3: Đo Opto Dàn Lạnh PC1 */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP3" ? null : "TP3")}>
              <circle cx="150" cy="109" r="13" fill={activePoint === "TP3" ? "#1e3a8a" : "#ffffff"} stroke="#1e3a8a" strokeWidth="2" />
              <text x="142" y="113" fill={activePoint === "TP3" ? "#ffffff" : "#1e3a8a"} fontWeight="bold" fontSize="9.5">TP3</text>
            </g>

            {/* TP4: Đo Opto Dàn Nóng PC3 */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP4" ? null : "TP4")}>
              <circle cx="610" cy="109" r="13" fill={activePoint === "TP4" ? "#1e3a8a" : "#ffffff"} stroke="#1e3a8a" strokeWidth="2" />
              <text x="602" y="113" fill={activePoint === "TP4" ? "#ffffff" : "#1e3a8a"} fontWeight="bold" fontSize="9.5">TP4</text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SƠ ĐỒ 2: MÁY NÉN STATOR 1 PHA (TAM GIÁC CỌC C - R - S & TỤ NGẬM) */}
        {/* ========================================================================= */}
        {type === "COMPRESSOR_MOTOR" && (
          <svg viewBox="0 0 760 300" className="w-full max-w-[760px] h-auto select-none font-mono text-xs text-neutral-900">
            <rect width="760" height="300" fill="url(#latex-grid)" />

            {/* NGUỒN AC 220V */}
            <rect x="25" y="80" width="105" height="150" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="25" y="80" width="105" height="24" fill="#0f172a" />
            <text x="33" y="96" fontWeight="bold" fill="#ffffff" fontSize="10">NGUỒN LƯỚI AC</text>
            <text x="35" y="130" fill="#b91c1c" fontWeight="bold" fontSize="11">Pha L (220V)</text>
            <text x="35" y="190" fill="#1e3a8a" fontWeight="bold" fontSize="11">Nguội N (0V)</text>

            {/* RƠ-LE NHIỆT OLP BẢO VỆ MÁY NÉN */}
            <rect x="180" y="115" width="80" height="36" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="188" y="132" fontWeight="bold" fill="#854d0e" fontSize="10">RƠ-LE OLP</text>
            <text x="188" y="144" fill="#854d0e" fontSize="8.5">Bảo vệ quá nhiệt</text>
            <line x1="130" y1="133" x2="180" y2="133" stroke="#b91c1c" strokeWidth="2" />
            <line x1="260" y1="133" x2="330" y2="133" stroke="#b91c1c" strokeWidth="2" />

            {/* VỎ MÁY NÉN KIM LOẠI STATOR */}
            <circle cx="430" cy="155" r="85" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <text x="385" y="90" fontWeight="bold" fill="#0f172a" fontSize="11">STATOR MÁY NÉN</text>

            {/* Cọc Chung C (Common) */}
            <circle cx="340" cy="133" r="10" fill="#0f172a" />
            <text x="336" y="137" fill="#ffffff" fontWeight="bold" fontSize="11">C</text>
            <text x="310" y="118" fill="#0f172a" fontWeight="bold" fontSize="10">CỌC C (CHUNG)</text>

            {/* Cọc Chạy R (Run) */}
            <circle cx="490" cy="105" r="10" fill="#1e3a8a" />
            <text x="486" y="109" fill="#ffffff" fontWeight="bold" fontSize="11">R</text>
            <text x="506" y="110" fill="#1e3a8a" fontWeight="bold" fontSize="10">CỌC R (CHẠY)</text>

            {/* Cọc Đề S (Start) */}
            <circle cx="490" cy="205" r="10" fill="#b91c1c" />
            <text x="486" y="209" fill="#ffffff" fontWeight="bold" fontSize="11">S</text>
            <text x="506" y="210" fill="#b91c1c" fontWeight="bold" fontSize="10">CỌC S (ĐỀ)</text>

            {/* Cuộn Dây Chạy L_run */}
            <path d="M 345 130 Q 415 85 480 100" stroke="#1e3a8a" strokeWidth="2" fill="none" />
            <text x="375" y="118" fill="#1e3a8a" fontSize="9" fontWeight="bold">Cuộn Chạy (R_CR nhỏ)</text>

            {/* Cuộn Dây Đề L_start */}
            <path d="M 345 138 Q 415 225 480 210" stroke="#b91c1c" strokeWidth="2" fill="none" />
            <text x="375" y="195" fill="#b91c1c" fontSize="9" fontWeight="bold">Cuộn Đề (R_CS lớn)</text>

            {/* TỤ NGẬM (RUN CAPACITOR C_run) */}
            <rect x="610" y="85" width="85" height="50" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="618" y="105" fontWeight="bold" fill="#0f172a" fontSize="10">TỤ NGẬM</text>
            <text x="618" y="120" fill="#475569" fontSize="9">35µF / 450V</text>

            {/* Dây nối tụ giữa R và S */}
            <line x1="490" y1="95" x2="610" y2="95" stroke="#1e3a8a" strokeWidth="2" />
            <path d="M 695 95 L 725 95 L 725 205 L 500 205" stroke="#b91c1c" strokeWidth="2" fill="none" />

            {/* Dây Nguội N nối thẳng vào chân R */}
            <path d="M 130 190 L 290 190 L 290 250 L 570 250 L 570 95" stroke="#1e3a8a" strokeWidth="2" fill="none" />

            {/* TEST POINTS */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP1" ? null : "TP1")}>
              <circle cx="415" cy="105" r="13" fill={activePoint === "TP1" ? "#1e3a8a" : "#ffffff"} stroke="#1e3a8a" strokeWidth="2" />
              <text x="407" y="109" fill={activePoint === "TP1" ? "#ffffff" : "#1e3a8a"} fontWeight="bold" fontSize="9.5">TP1</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP2" ? null : "TP2")}>
              <circle cx="415" cy="205" r="13" fill={activePoint === "TP2" ? "#b91c1c" : "#ffffff"} stroke="#b91c1c" strokeWidth="2" />
              <text x="407" y="209" fill={activePoint === "TP2" ? "#ffffff" : "#b91c1c"} fontWeight="bold" fontSize="9.5">TP2</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP3" ? null : "TP3")}>
              <circle cx="650" cy="155" r="13" fill={activePoint === "TP3" ? "#047857" : "#ffffff"} stroke="#047857" strokeWidth="2" />
              <text x="642" y="159" fill={activePoint === "TP3" ? "#ffffff" : "#047857"} fontWeight="bold" fontSize="9.5">TP3</text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SƠ ĐỒ 3: NGUỒN DC BUS 310V & KHỐI BIẾN TẦN INVERTER IPM */}
        {/* ========================================================================= */}
        {type === "DC_BUS_POWER" && (
          <svg viewBox="0 0 760 290" className="w-full max-w-[760px] h-auto select-none font-mono text-xs text-neutral-900">
            <rect width="760" height="290" fill="url(#latex-grid)" />

            {/* NGUỒN AC 220V */}
            <rect x="20" y="85" width="85" height="120" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="20" y="85" width="85" height="22" fill="#0f172a" />
            <text x="27" y="100" fontWeight="bold" fill="#ffffff" fontSize="9.5">AC 220V</text>
            <text x="28" y="130" fill="#b91c1c" fontWeight="bold" fontSize="10">Line (L)</text>
            <text x="28" y="175" fill="#1e3a8a" fontWeight="bold" fontSize="10">Neutral (N)</text>

            {/* CẦU DIODE NẮN TOÀN KỲ (BRIDGE RECTIFIER) */}
            <line x1="105" y1="125" x2="145" y2="125" stroke="#b91c1c" strokeWidth="2" />
            <line x1="105" y1="170" x2="145" y2="170" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="145" y="100" width="80" height="95" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <text x="153" y="125" fontWeight="bold" fill="#0f172a" fontSize="10">CẦU DIODE</text>
            <text x="153" y="140" fill="#475569" fontSize="8.5">Nắn AC ➔ DC</text>
            <text x="153" y="170" fill="#047857" fontWeight="bold" fontSize="8.5">4x DIODE 600V</text>

            {/* CUỘN L REACTOR BÙ CÔNG SUẤT */}
            <line x1="225" y1="125" x2="265" y2="125" stroke="#b91c1c" strokeWidth="2" />
            <rect x="265" y="110" width="65" height="32" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            <text x="272" y="126" fontWeight="bold" fill="#0f172a" fontSize="9.5">REACTOR L</text>
            <text x="272" y="137" fill="#64748b" fontSize="8">Chặn sóng hài</text>

            {/* TỤ HÓA LỌC NGUỒN CAO ÁP 310V DC */}
            <line x1="330" y1="125" x2="400" y2="125" stroke="#b91c1c" strokeWidth="2.5" />
            <line x1="225" y1="170" x2="400" y2="170" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="400" y="95" width="70" height="95" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
            <text x="410" y="120" fontWeight="bold" fill="#0f172a" fontSize="10">TỤ NGUỒN</text>
            <text x="408" y="142" fontWeight="bold" fill="#b91c1c" fontSize="11">+311V DC</text>
            <text x="408" y="165" fill="#475569" fontSize="8.5">450V - 1000µF</text>

            {/* TRỞ XẢ NHIỆT AN TOÀN */}
            <line x1="470" y1="125" x2="520" y2="125" stroke="#b91c1c" strokeWidth="2" />
            <line x1="470" y1="170" x2="520" y2="170" stroke="#0f172a" strokeWidth="2" />
            <rect x="490" y="130" width="18" height="35" fill="#ffffff" stroke="#475569" strokeWidth="1" />
            <text x="475" y="182" fill="#475569" fontSize="7.5">R_xả 100k</text>

            {/* MODULE CÔNG SUẤT BIẾN TẦN IPM */}
            <line x1="520" y1="125" x2="570" y2="125" stroke="#b91c1c" strokeWidth="2" />
            <line x1="520" y1="170" x2="570" y2="170" stroke="#0f172a" strokeWidth="2" />
            <rect x="570" y="85" width="145" height="115" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="570" y="85" width="145" height="22" fill="#0f172a" />
            <text x="580" y="100" fontWeight="bold" fill="#ffffff" fontSize="10">IC CÔNG SUẤT IPM</text>
            <text x="580" y="125" fill="#0f172a" fontWeight="bold" fontSize="9">6 TRANSISTOR IGBT</text>
            <text x="580" y="140" fill="#64748b" fontSize="8.5">Điều chế độ rộng xung PWM</text>
            <text x="580" y="155" fill="#64748b" fontSize="8.5">Biến đổi DC ➔ 3 Pha AC</text>

            {/* 3 Pha ngõ ra cấp cho lốc nén: U - V - W */}
            <line x1="715" y1="115" x2="745" y2="115" stroke="#b91c1c" strokeWidth="2" />
            <text x="730" y="110" fill="#b91c1c" fontWeight="bold" fontSize="10">U</text>
            <line x1="715" y1="145" x2="745" y2="145" stroke="#1e3a8a" strokeWidth="2" />
            <text x="730" y="140" fill="#1e3a8a" fontWeight="bold" fontSize="10">V</text>
            <line x1="715" y1="175" x2="745" y2="175" stroke="#0f172a" strokeWidth="2" />
            <text x="730" y="170" fill="#0f172a" fontWeight="bold" fontSize="10">W</text>

            {/* TEST POINTS */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP1" ? null : "TP1")}>
              <circle cx="125" cy="147" r="13" fill={activePoint === "TP1" ? "#1e3a8a" : "#ffffff"} stroke="#1e3a8a" strokeWidth="2" />
              <text x="117" y="151" fill={activePoint === "TP1" ? "#ffffff" : "#1e3a8a"} fontWeight="bold" fontSize="9.5">TP1</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP2" ? null : "TP2")}>
              <circle cx="365" cy="125" r="13" fill={activePoint === "TP2" ? "#b91c1c" : "#ffffff"} stroke="#b91c1c" strokeWidth="2" />
              <text x="357" y="129" fill={activePoint === "TP2" ? "#ffffff" : "#b91c1c"} fontWeight="bold" fontSize="9.5">TP2</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP3" ? null : "TP3")}>
              <circle cx="545" cy="147" r="13" fill={activePoint === "TP3" ? "#047857" : "#ffffff"} stroke="#047857" strokeWidth="2" />
              <text x="537" y="151" fill={activePoint === "TP3" ? "#ffffff" : "#047857"} fontWeight="bold" fontSize="9.5">TP3</text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SƠ ĐỒ 4: TIẾP ĐỊA AN TOÀN & APTOMAT CHỐNG GIẬT RCBO */}
        {/* ========================================================================= */}
        {type === "GROUNDING_RCBO" && (
          <svg viewBox="0 0 760 280" className="w-full max-w-[760px] h-auto select-none font-mono text-xs text-neutral-900">
            <rect width="760" height="280" fill="url(#latex-grid)" />

            {/* NGUỒN ĐIỆN LƯỚI 220V */}
            <rect x="20" y="55" width="95" height="175" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="20" y="55" width="95" height="22" fill="#0f172a" />
            <text x="28" y="70" fontWeight="bold" fill="#ffffff" fontSize="9.5">LƯỚI ĐIỆN 220V</text>
            <text x="28" y="105" fill="#b91c1c" fontWeight="bold" fontSize="10">Pha L (220V)</text>
            <text x="28" y="150" fill="#1e3a8a" fontWeight="bold" fontSize="10">Nguội N (0V)</text>
            <text x="28" y="195" fill="#16a34a" fontWeight="bold" fontSize="10">Tiếp địa PE</text>

            {/* APTOMAT CHỐNG GIẬT RCBO 2P */}
            <rect x="175" y="75" width="115" height="125" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="175" y="75" width="115" height="22" fill="#0f172a" />
            <text x="183" y="90" fontWeight="bold" fill="#ffffff" fontSize="10">RCBO 2P (30mA)</text>
            <text x="183" y="115" fill="#0f172a" fontWeight="bold" fontSize="9">Định mức: 20A</text>
            <text x="183" y="130" fill="#b91c1c" fontWeight="bold" fontSize="9">Dòng rò: IΔn ≤ 30mA</text>
            <text x="183" y="145" fill="#475569" fontSize="8.5">Thời gian: t &lt; 0.03s</text>
            <text x="183" y="160" fill="#475569" fontSize="8.5">Biến dòng ZCT</text>

            {/* DÂY L & N QUA RCBO */}
            <line x1="115" y1="105" x2="175" y2="105" stroke="#b91c1c" strokeWidth="2" />
            <line x1="290" y1="105" x2="445" y2="105" stroke="#b91c1c" strokeWidth="2" />

            <line x1="115" y1="150" x2="175" y2="150" stroke="#1e3a8a" strokeWidth="2" />
            <line x1="290" y1="150" x2="445" y2="150" stroke="#1e3a8a" strokeWidth="2" />

            {/* KHỐI MÁY ĐIỀU HÒA (VỎ KIM LOẠI) */}
            <rect x="445" y="55" width="220" height="175" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="445" y="55" width="220" height="22" fill="#0f172a" />
            <text x="455" y="70" fontWeight="bold" fill="#ffffff" fontSize="10">KHUNG VỎ MÁY ĐIỀU HÒA</text>

            <rect x="465" y="95" width="180" height="85" fill="#f8fafc" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
            <text x="480" y="125" fontWeight="bold" fill="#0f172a" fontSize="10">LỐC NÉN & MOTOR QUẠT</text>
            <text x="480" y="145" fill="#64748b" fontSize="8.5">Cách điện động cơ (Class F / H)</text>

            {/* DÂY TIẾP ĐỊA PE XANH LÁ RA CỌC TIẾP ĐỊA */}
            <line x1="115" y1="195" x2="445" y2="195" stroke="#16a34a" strokeWidth="2.5" />
            <line x1="445" y1="195" x2="550" y2="195" stroke="#16a34a" strokeWidth="2.5" />
            <circle cx="550" cy="195" r="4" fill="#16a34a" />
            <line x1="550" y1="195" x2="550" y2="245" stroke="#16a34a" strokeWidth="2.5" />
            <line x1="550" y1="245" x2="710" y2="245" stroke="#16a34a" strokeWidth="2.5" />

            {/* KÝ HIỆU TIẾP ĐẤT CHUẨN IEC */}
            <line x1="710" y1="235" x2="710" y2="255" stroke="#16a34a" strokeWidth="3" />
            <line x1="716" y1="239" x2="716" y2="251" stroke="#16a34a" strokeWidth="2.5" />
            <line x1="722" y1="243" x2="722" y2="247" stroke="#16a34a" strokeWidth="2" />
            <text x="660" y="228" fill="#16a34a" fontWeight="bold" fontSize="10">R_đất ≤ 4 Ω</text>

            {/* TEST POINTS */}
            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP1" ? null : "TP1")}>
              <circle cx="145" cy="105" r="13" fill={activePoint === "TP1" ? "#b91c1c" : "#ffffff"} stroke="#b91c1c" strokeWidth="2" />
              <text x="137" y="109" fill={activePoint === "TP1" ? "#ffffff" : "#b91c1c"} fontWeight="bold" fontSize="9.5">TP1</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP2" ? null : "TP2")}>
              <circle cx="365" cy="127" r="13" fill={activePoint === "TP2" ? "#1e3a8a" : "#ffffff"} stroke="#1e3a8a" strokeWidth="2" />
              <text x="357" y="131" fill={activePoint === "TP2" ? "#ffffff" : "#1e3a8a"} fontWeight="bold" fontSize="9.5">TP2</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActivePoint(activePoint === "TP3" ? null : "TP3")}>
              <circle cx="630" cy="245" r="13" fill={activePoint === "TP3" ? "#16a34a" : "#ffffff"} stroke="#16a34a" strokeWidth="2" />
              <text x="622" y="249" fill={activePoint === "TP3" ? "#ffffff" : "#16a34a"} fontWeight="bold" fontSize="9.5">TP3</text>
            </g>
          </svg>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PHẦN ĐỌC HIỂU SƠ ĐỒ ĐƠN GIẢN CHO NGƯỜI MỚI BẮT ĐẦU (EM HỌC VIÊN TỰ ÔN) */}
      {/* ========================================================================= */}
      <div className="bg-neutral-50 border border-neutral-300 p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
          <BookOpen className="w-4 h-4 text-blue-950 shrink-0" />
          <h4 className="font-mono font-bold text-xs sm:text-sm uppercase text-neutral-950">
            HƯỚNG DẪN ĐỌC SƠ ĐỒ DỄ HIỂU (BẢN CHẤT VẬT LÝ & ĐO KIỂM HIỆN TRƯỜNG)
          </h4>
        </div>

        {/* Dòng truyền tín hiệu / Năng lượng trực quan */}
        <div className="space-y-1.5">
          <span className="font-mono font-bold text-[11px] text-neutral-700 uppercase block">
            1. DÒNG CHẢY TÍN HIỆU / NĂNG LƯỢNG TRONG MẠCH (SIGNAL & POWER FLOW):
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono bg-white p-2.5 border border-neutral-200">
            {type === "INVERTER_COMMUNICATION" && (
              <>
                <span className="bg-neutral-100 text-neutral-900 px-2 py-0.5 border border-neutral-300 font-bold">Vi xử lý Dàn Lạnh (TX)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-blue-50 text-blue-950 px-2 py-0.5 border border-blue-200 font-bold">Opto PC1 (LED 1.1V)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-amber-50 text-amber-950 px-2 py-0.5 border border-amber-300 font-bold">Dây 3 Data (Xung 15V - 55V)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-blue-50 text-blue-950 px-2 py-0.5 border border-blue-200 font-bold">Opto PC3 (Dàn Nóng RX)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-neutral-100 text-neutral-900 px-2 py-0.5 border border-neutral-300 font-bold">Vi xử lý Biến tần (RX)</span>
              </>
            )}

            {type === "COMPRESSOR_MOTOR" && (
              <>
                <span className="bg-red-50 text-red-950 px-2 py-0.5 border border-red-200 font-bold">Nguồn Pha L (220V)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-amber-50 text-amber-950 px-2 py-0.5 border border-amber-300 font-bold">Rơ-le OLP (Bảo vệ nhiệt)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">Cọc C (Chung)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-blue-50 text-blue-950 px-2 py-0.5 border border-blue-200 font-bold">Cuộn Chạy R // Cuộn Đề S</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-emerald-50 text-emerald-950 px-2 py-0.5 border border-emerald-300 font-bold">Tụ Ngậm C_run (Lệch pha 90°)</span>
              </>
            )}

            {type === "DC_BUS_POWER" && (
              <>
                <span className="bg-neutral-100 text-neutral-900 px-2 py-0.5 border border-neutral-300 font-bold">Lưới 220V AC</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-amber-50 text-amber-950 px-2 py-0.5 border border-amber-300 font-bold">Cầu Diode Nắn Toàn Kỳ</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 border border-neutral-300 font-bold">Cuộn L Reactor</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-red-50 text-red-950 px-2 py-0.5 border border-red-300 font-bold">Tụ Lọc Cao Áp +311V DC</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-blue-950 text-white px-2 py-0.5 font-bold">IPM Nghịch Lưu 3 Pha U-V-W</span>
              </>
            )}

            {type === "GROUNDING_RCBO" && (
              <>
                <span className="bg-red-50 text-red-950 px-2 py-0.5 border border-red-200 font-bold">Dòng Pha L</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">RCBO (Cuộn biến dòng ZCT)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 border border-neutral-300 font-bold">Động Cơ Máy Lạnh</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-emerald-50 text-emerald-950 px-2 py-0.5 border border-emerald-300 font-bold">Dây PE Nối Vỏ Máy</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 border border-emerald-400 font-bold">Cọc Đất (R ≤ 4Ω)</span>
              </>
            )}
          </div>
        </div>

        {/* 3 Bước đo kiểm thực chiến cho học viên */}
        <div className="space-y-1.5 pt-1">
          <span className="font-mono font-bold text-[11px] text-neutral-700 uppercase block">
            2. CÁCH ĐO KIỂM NHANH TẠI HIỆN TRƯỜNG (BẬT ĐỒNG HỒ VOM):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
            {type === "INVERTER_COMMUNICATION" && (
              <>
                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Đo Nguồn Chân 1 - 2</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Thang AC 500V. Giá trị chuẩn: <strong className="text-blue-950">220V AC ± 10%</strong>. Nếu 0V: Đứt dây hoặc chưa đóng rơ-le cấp nguồn.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Đo Xung Data Chân 2 - 3</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Thang DC 50V (dùng đồng hồ kim). Kim phải nhấp nháy liên tục <strong className="text-blue-950">15V ~ 55V</strong>. Nếu đứng im: Hỏng giao tiếp.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Cô Lập Bo Nóng Hay Lạnh</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Tháo dây 3 ở dàn nóng, đo chân 2-3 tại dàn lạnh. Kim vẫn nhịp ➔ Bo lạnh TỐT (hỏng bo nóng). Kim đứng 0V ➔ Hỏng bo lạnh.
                  </p>
                </div>
              </>
            )}

            {type === "COMPRESSOR_MOTOR" && (
              <>
                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Quy Tắc Cộng Điện Trở</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Đo 3 cặp cọc: Cặp lớn nhất là R và S. Chân còn lại là C. Công thức vàng: <strong className="text-blue-950">R_RS = R_CR + R_CS</strong>.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Phân Biệt Cọc Chạy & Đề</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Đo từ C đến 2 cọc còn lại: Cọc nào có <strong className="text-blue-950">Ω nhỏ hơn là chân R (Chạy)</strong>, cọc có <strong className="text-blue-950">Ω lớn hơn là chân S (Đề)</strong>.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Kiểm Tra Chạm Vỏ (Mass)</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Thang đo 10kΩ: 1 que kẹp cọc đồng lốc nén, 1 que chạm cạo lớp sơn vỏ sắt. Kim nhúc nhích ➔ Chạm vỏ gây rò điện nguy hiểm.
                  </p>
                </div>
              </>
            )}

            {type === "DC_BUS_POWER" && (
              <>
                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Đo Áp Ngõ Vào AC 220V</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Đo tại 2 chân xoay chiều của Cầu Diode: Phải đủ <strong className="text-blue-950">220V AC</strong>. Nếu mất áp: Kiểm tra cầu chì đứt hoặc Relay bảo vệ.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Đo Áp Trên Tụ Nguồn 310V</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Thang DC 1000V. Điện áp trên 2 chân tụ: <strong className="text-blue-950">220V × √2 ≈ 310V ~ 320V DC</strong>. Dưới 280V ➔ Khô tụ, yếu nguồn.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>An Toàn Xả Điện Trước Khi Sửa</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    <strong className="text-red-700">Cực kỳ nguy hiểm:</strong> Rút điện xong phải dùng bóng đèn sợi đốt 220V/40W chạm xả hết 310V trên tụ trước khi hàn linh kiện.
                  </p>
                </div>
              </>
            )}

            {type === "GROUNDING_RCBO" && (
              <>
                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Bấm Nút Test Định Kỳ</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Bấm nút &quot;T&quot; trên thân RCBO mỗi tháng 1 lần. Cần gạt phải nhảy ngay lập tức ngắt điện. Nếu không nhảy ➔ RCBO đã hỏng cuộn vi sai.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Đo Điện Trở Tiếp Đất</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Dùng đồng hồ đo đất chuyên dụng (Earth Tester). Tiêu chuẩn an toàn: <strong className="text-blue-950">R_đất ≤ 4 Ω</strong> để dòng rò tiêu tán tức thời.
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-neutral-200 space-y-1">
                  <div className="font-mono font-bold text-neutral-950 flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-blue-950 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Không Nhầm Tiếp Địa & Trung Tính</span>
                  </div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Tuyệt đối không lấy dây N làm dây PE. Khi đứt dây N ngoài cột điện, toàn bộ vỏ máy sẽ nhiễm điện 220V giật chết người.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Test Points Detail Table with LaTeX Formula Styling */}
      {testPoints.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-900 block">
              3. BẢNG ĐỐI CHIẾU ĐIỂM TEST POINT & BẢNG BỆNH HIỆN TRƯỜNG:
            </span>
            <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
              (Bấm vào hàng hoặc nút trên sơ đồ để kiểm tra)
            </span>
          </div>

          <div className="overflow-x-auto border border-neutral-300">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-neutral-100 text-neutral-900 font-bold border-b border-neutral-300">
                <tr>
                  <th className="p-2 border-r border-neutral-200 w-16 text-center">ĐIỂM</th>
                  <th className="p-2 border-r border-neutral-200 w-1/4">VỊ TRÍ ĐẶT QUE ĐO</th>
                  <th className="p-2 border-r border-neutral-200 w-1/4">ĐIỆN ÁP / GIÁ TRỊ CHUẨN</th>
                  <th className="p-2">Ý NGHĨA KỸ THUẬT & PHÂN TÍCH PAN BỆNH</th>
                </tr>
              </thead>
              <tbody>
                {testPoints.map((tp) => {
                  const isSelected = activePoint === tp.point;
                  return (
                    <tr
                      key={tp.point}
                      onClick={() => setActivePoint(activePoint === tp.point ? null : tp.point)}
                      className={cn(
                        "border-b border-neutral-200 cursor-pointer transition-none",
                        isSelected ? "bg-blue-50/80 font-medium" : "hover:bg-neutral-50"
                      )}
                    >
                      <td className="p-2 border-r border-neutral-200 text-center font-mono font-bold text-blue-950">
                        <span className={cn(
                          "px-1.5 py-0.5 border text-xs",
                          isSelected ? "bg-blue-950 text-white border-blue-950" : "bg-white border-neutral-300"
                        )}>
                          {tp.point}
                        </span>
                      </td>
                      <td className="p-2 border-r border-neutral-200 font-mono text-neutral-800">
                        {tp.location}
                      </td>
                      <td className="p-2 border-r border-neutral-200 font-mono font-bold text-emerald-800">
                        {tp.nominalValue}
                      </td>
                      <td className="p-2 text-neutral-700 leading-snug">
                        {tp.significance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
