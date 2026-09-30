"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Calculator, CheckCircle, AlertTriangle } from "reicon-react";
import { MathFormula } from "@/components/ui/MathFormula";

interface CableStandard {
  crossSection: number; // mm2
  maxCurrentCuPVC: number; // A (Cadivi CV đi trong ống)
  mcbRating: number; // A
  cadiviCode: string;
}

const CADIVI_STANDARDS: CableStandard[] = [
  { crossSection: 1.5, maxCurrentCuPVC: 14.5, mcbRating: 16, cadiviCode: "CV 1.5 mm²" },
  { crossSection: 2.5, maxCurrentCuPVC: 19.5, mcbRating: 20, cadiviCode: "CV 2.5 mm²" },
  { crossSection: 4.0, maxCurrentCuPVC: 26.0, mcbRating: 25, cadiviCode: "CV 4.0 mm²" },
  { crossSection: 6.0, maxCurrentCuPVC: 34.0, mcbRating: 32, cadiviCode: "CV 6.0 mm²" },
  { crossSection: 10.0, maxCurrentCuPVC: 46.0, mcbRating: 50, cadiviCode: "CV 10.0 mm²" },
  { crossSection: 16.0, maxCurrentCuPVC: 61.0, mcbRating: 63, cadiviCode: "CV 16.0 mm²" },
  { crossSection: 25.0, maxCurrentCuPVC: 80.0, mcbRating: 80, cadiviCode: "CV 25.0 mm²" },
  { crossSection: 35.0, maxCurrentCuPVC: 99.0, mcbRating: 100, cadiviCode: "CV 35.0 mm²" },
];

export const CadiviCableCalculator: React.FC = () => {
  // Inputs
  const [powerHp, setPowerHp] = useState<number>(2.0); // HP
  const [voltageType, setVoltageType] = useState<"1P" | "3P">("1P");
  const [isCompressorInverter, setIsCompressorInverter] = useState<boolean>(true);
  const [cableLengthMeters, setCableLengthMeters] = useState<number>(15);
  const cosPhi = 0.85;

  // Calculations
  // 1 HP ~ 746W electrical power for motor (hoặc tính theo hệ số máy lạnh thương mại ~ 0.85-0.9 kW/HP)
  const electricalPowerWatts = powerHp * 750;
  const voltage = voltageType === "1P" ? 220 : 380;

  // Dòng định mức Idm (A)
  // 1 Pha: I = P / (U * cosPhi)
  // 3 Pha: I = P / (sqrt(3) * U * cosPhi)
  const ratedCurrent =
    voltageType === "1P"
      ? electricalPowerWatts / (voltage * cosPhi)
      : electricalPowerWatts / (Math.sqrt(3) * voltage * cosPhi);

  // Dòng khởi động Istart
  // Inverter: Khởi động mềm bằng biến tần, Istart <= 1.2 * Idm
  // Non-inverter: Khởi động trực tiếp (DOL), Istart = 5 - 7 * Idm
  const startCurrent = isCompressorInverter ? ratedCurrent * 1.2 : ratedCurrent * 6.0;

  // Lựa chọn tiết diện dây theo tiêu chuẩn Cadivi:
  // Chọn dây sao cho I_dm * 1.25 <= I_cho_phep (hệ số an toàn k = 1.25)
  const designCurrent = ratedCurrent * 1.25;
  const recommendedCable =
    CADIVI_STANDARDS.find((c) => c.maxCurrentCuPVC >= designCurrent) ||
    CADIVI_STANDARDS[CADIVI_STANDARDS.length - 1];

  // Độ sụt áp Delta U:
  // Điện trở suất của đồng: rho = 0.0178 Ohm.mm2/m
  // 1 Pha: Delta U = 2 * L * I * rho / S
  // 3 Pha: Delta U = sqrt(3) * L * I * rho / S
  const rho = 0.0178;
  const deltaUVolts =
    voltageType === "1P"
      ? (2 * cableLengthMeters * ratedCurrent * rho) / recommendedCable.crossSection
      : (Math.sqrt(3) * cableLengthMeters * ratedCurrent * rho) / recommendedCable.crossSection;

  const deltaUPercent = (deltaUVolts / voltage) * 100;
  const isVoltageDropSafe = deltaUPercent <= 3.0; // Tiêu chuẩn TCVN cho phép <= 3% - 5%

  return (
    <div className="border border-neutral-300 bg-white p-4 sm:p-5 space-y-5">
      {/* Header */}
      <div className="border-b border-neutral-300 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info" size="sm">
              CÔNG CỤ TÍNH TOÁN HIỆN TRƯỜNG
            </Badge>
            <span className="font-mono text-[11px] text-neutral-500 uppercase">
              TIÊU CHUẨN CADIVI & TCVN 9207
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-950 shrink-0" />
            Tính Toán Tiết Diện Dây Cadivi & Chọn CB / MCB Cấp Nguồn Máy Lạnh
          </h2>
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-neutral-50 p-4 border border-neutral-200">
        <div>
          <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase mb-1">
            Công Suất Máy Lạnh (HP / Ngựa)
          </label>
          <div className="flex items-center gap-1">
            {[1.0, 1.5, 2.0, 2.5, 3.0, 5.0].map((hp) => (
              <button
                key={hp}
                type="button"
                onClick={() => setPowerHp(hp)}
                className={`flex-1 py-1 text-xs font-mono font-bold border ${
                  powerHp === hp
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {hp}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-neutral-500 font-mono mt-1">
            ~ {(powerHp * 9000).toLocaleString()} BTU/h ({electricalPowerWatts}W điện)
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase mb-1">
            Hệ Thống Điện Cấp
          </label>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setVoltageType("1P")}
              className={`py-1 text-xs font-mono font-bold border text-center ${
                voltageType === "1P"
                  ? "bg-blue-950 text-white border-blue-950"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              1 Pha (220V AC)
            </button>
            <button
              type="button"
              onClick={() => setVoltageType("3P")}
              className={`py-1 text-xs font-mono font-bold border text-center ${
                voltageType === "3P"
                  ? "bg-blue-950 text-white border-blue-950"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              3 Pha (380V AC)
            </button>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono mt-1">
            {voltageType === "1P" ? "Dân dụng tiêu chuẩn" : "Thương mại & Công nghiệp"}
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase mb-1">
            Công Nghệ Máy Nén
          </label>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setIsCompressorInverter(true)}
              className={`py-1 text-xs font-mono font-bold border text-center ${
                isCompressorInverter
                  ? "bg-emerald-900 text-white border-emerald-900"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              Inverter (Biến tần)
            </button>
            <button
              type="button"
              onClick={() => setIsCompressorInverter(false)}
              className={`py-1 text-xs font-mono font-bold border text-center ${
                !isCompressorInverter
                  ? "bg-amber-900 text-white border-amber-900"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              Mono (Cơ / On-Off)
            </button>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono mt-1">
            {isCompressorInverter ? "Khởi động êm (Soft Start)" : "Dòng đề cao gấp 5-7 lần"}
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase mb-1">
            Khoảng Cách Nguồn Đến Máy (Mét)
          </label>
          <Input
            type="number"
            value={cableLengthMeters}
            onChange={(e) => setCableLengthMeters(Math.max(1, Number(e.target.value) || 1))}
            className="h-8 font-mono text-xs"
            min={1}
            max={200}
          />
          <p className="text-[10px] text-neutral-500 font-mono mt-1">
            Kiểm tra sụt áp tải đường xa (Delta U)
          </p>
        </div>
      </div>

      {/* Output Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Dòng điện */}
        <div className="border border-neutral-300 p-3 bg-white space-y-2">
          <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase">
            1. DÒNG ĐIỆN VẬN HÀNH
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-neutral-600 font-mono">Dòng định mức (I_đm):</span>
              <span className="text-base font-mono font-black text-blue-950">
                {ratedCurrent.toFixed(2)} A
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-neutral-600 font-mono">Dòng khởi động (I_start):</span>
              <span className="text-sm font-mono font-bold text-amber-700">
                {startCurrent.toFixed(1)} A
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-neutral-600 font-mono">Dòng thiết kế an toàn (x1.25):</span>
              <span className="text-xs font-mono font-semibold text-neutral-900">
                {designCurrent.toFixed(2)} A
              </span>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-1.5 flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] text-neutral-500 font-mono">Công thức tính toán:</span>
            <MathFormula
              formula={voltageType === "1P" ? `I_{\\text{đm}} = \\frac{P}{U \\cdot \\cos\\varphi}` : `I_{\\text{đm}} = \\frac{P}{\\sqrt{3} \\cdot U \\cdot \\cos\\varphi}`}
              className="text-[11px]"
            />
          </div>
        </div>

        {/* Card 2: Dây dẫn Cadivi */}
        <div className="border-2 border-blue-900 p-3 bg-blue-50/30 space-y-2">
          <div className="text-[11px] font-mono font-bold text-blue-900 uppercase flex items-center justify-between">
            <span>2. KHUYẾN NGHỊ TIẾT DIỆN DÂY</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-center py-1">
            <div className="text-2xl font-mono font-black text-neutral-950">
              {recommendedCable.cadiviCode}
            </div>
            <div className="text-xs text-neutral-600 font-mono mt-0.5">
              (Dây đồng Cadivi bọc PVC luồn ống)
            </div>
          </div>
          <div className="text-xs space-y-1 font-mono pt-1 border-t border-blue-200">
            <div className="flex justify-between">
              <span className="text-neutral-600">Khả năng tải an toàn:</span>
              <span className="font-bold text-neutral-900">{recommendedCable.maxCurrentCuPVC} A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Độ sụt áp ({cableLengthMeters}m):</span>
              <span className={`font-bold ${isVoltageDropSafe ? "text-emerald-700" : "text-red-700"}`}>
                {deltaUPercent.toFixed(2)}% ({deltaUVolts.toFixed(1)}V)
              </span>
            </div>
          </div>
          {!isVoltageDropSafe && (
            <div className="text-[10px] text-red-700 font-bold flex items-center gap-1 bg-red-50 p-1 border border-red-200">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Sụt áp vượt 3%! Cần tăng tiết diện lên cỡ tiếp theo.
            </div>
          )}
        </div>

        {/* Card 3: MCB / Aptomat bảo vệ */}
        <div className="border border-neutral-300 p-3 bg-white space-y-2">
          <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase">
            3. CHỌN APTOMAT / MCB
          </div>
          <div className="text-center py-1">
            <div className="text-2xl font-mono font-black text-neutral-950">
              MCB {recommendedCable.mcbRating}A
            </div>
            <div className="text-xs text-neutral-600 font-mono mt-0.5">
              Đường đặc tính Curve C (Chống nhảy khi lốc đề)
            </div>
          </div>
          <div className="text-xs space-y-1 font-mono pt-1 border-t border-neutral-200">
            <div className="flex justify-between">
              <span className="text-neutral-600">Loại cực:</span>
              <span className="font-bold text-neutral-900">
                {voltageType === "1P" ? "2P (Cắt L và N)" : "3P hoặc 4P (3P+N)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Dòng cắt ngắn mạch Icu:</span>
              <span className="font-bold text-neutral-900">≥ 4.5 kA hoặc 6 kA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cadivi Reference Table */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-neutral-800 uppercase">
          BẢNG TRA CỨU TIÊU CHUẨN CÁP ĐỒNG CADIVI CV LUỒN TRONG ỐNG (TCVN 9207 / IEC 60364)
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TIẾT DIỆN (MM²)</TableHead>
              <TableHead>MÃ CÁP CADIVI</TableHead>
              <TableHead>DÒNG TẢI TỐI ĐA (A)</TableHead>
              <TableHead>MCB PHỐI HỢP</TableHead>
              <TableHead>ỨNG DỤNG MÁY LẠNH PHỔ BIẾN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CADIVI_STANDARDS.map((item) => (
              <TableRow
                key={item.crossSection}
                className={recommendedCable.crossSection === item.crossSection ? "bg-blue-50/60 font-bold" : ""}
              >
                <TableCell className="font-mono">{item.crossSection} mm²</TableCell>
                <TableCell className="font-mono">{item.cadiviCode}</TableCell>
                <TableCell className="font-mono">{item.maxCurrentCuPVC} A</TableCell>
                <TableCell className="font-mono">{item.mcbRating}A Curve C</TableCell>
                <TableCell className="text-xs">
                  {item.crossSection === 1.5 && "Máy lạnh 1.0 HP – 1.5 HP (Dây nguồn nhánh ngắn)"}
                  {item.crossSection === 2.5 && "Máy lạnh 1.5 HP – 2.5 HP (Chuẩn vàng thợ lắp đặt)"}
                  {item.crossSection === 4.0 && "Máy lạnh 3.0 HP – 4.0 HP hoặc Multi 2 dàn lạnh"}
                  {item.crossSection === 6.0 && "Máy lạnh 5.0 HP (1 pha) hoặc Dàn nóng Multi lớn"}
                  {item.crossSection >= 10.0 && "Hệ thống VRV / VRF hoặc Máy lạnh tủ đứng công nghiệp"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
