"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Calculator, CheckCircle, AlertTriangle, InfoCircle } from "reicon-react";

type Refrigerant = "R32" | "R410A" | "R22";

// P-T lookup points for interpolation (gauge pressure psig to boiling saturation temp in °C)
const LOW_SIDE_PT: Record<Refrigerant, Array<{ psi: number; tempC: number }>> = {
  R32: [
    { psi: 90, tempC: -6.5 },
    { psi: 100, tempC: -3.5 },
    { psi: 110, tempC: -0.7 },
    { psi: 118, tempC: 1.5 },
    { psi: 125, tempC: 3.3 },
    { psi: 135, tempC: 5.7 },
    { psi: 145, tempC: 8.0 },
    { psi: 155, tempC: 10.2 },
    { psi: 170, tempC: 13.3 },
  ],
  R410A: [
    { psi: 90, tempC: -5.8 },
    { psi: 100, tempC: -2.8 },
    { psi: 110, tempC: 0.0 },
    { psi: 118, tempC: 2.2 },
    { psi: 125, tempC: 4.0 },
    { psi: 135, tempC: 6.5 },
    { psi: 145, tempC: 8.8 },
    { psi: 155, tempC: 11.0 },
    { psi: 170, tempC: 14.2 },
  ],
  R22: [
    { psi: 50, tempC: -8.0 },
    { psi: 58, tempC: -4.0 },
    { psi: 65, tempC: -0.5 },
    { psi: 70, tempC: 2.0 },
    { psi: 75, tempC: 4.4 },
    { psi: 80, tempC: 6.7 },
    { psi: 85, tempC: 8.9 },
    { psi: 95, tempC: 13.0 },
  ],
};

const HIGH_SIDE_PT: Record<Refrigerant, Array<{ psi: number; tempC: number }>> = {
  R32: [
    { psi: 320, tempC: 38.0 },
    { psi: 350, tempC: 41.5 },
    { psi: 380, tempC: 44.7 },
    { psi: 400, tempC: 46.8 },
    { psi: 430, tempC: 49.8 },
    { psi: 460, tempC: 52.6 },
    { psi: 500, tempC: 56.1 },
  ],
  R410A: [
    { psi: 300, tempC: 36.5 },
    { psi: 330, tempC: 40.0 },
    { psi: 360, tempC: 43.3 },
    { psi: 390, tempC: 46.4 },
    { psi: 420, tempC: 49.3 },
    { psi: 450, tempC: 52.0 },
    { psi: 480, tempC: 54.6 },
  ],
  R22: [
    { psi: 200, tempC: 38.5 },
    { psi: 220, tempC: 42.0 },
    { psi: 240, tempC: 45.2 },
    { psi: 260, tempC: 48.2 },
    { psi: 280, tempC: 51.1 },
    { psi: 300, tempC: 53.8 },
  ],
};

function interpolateSatTemp(pressurePsi: number, table: Array<{ psi: number; tempC: number }>): number {
  if (pressurePsi <= table[0].psi) return table[0].tempC;
  if (pressurePsi >= table[table.length - 1].psi) return table[table.length - 1].tempC;

  for (let i = 0; i < table.length - 1; i++) {
    const p1 = table[i].psi;
    const p2 = table[i + 1].psi;
    if (pressurePsi >= p1 && pressurePsi <= p2) {
      const t1 = table[i].tempC;
      const t2 = table[i + 1].tempC;
      return t1 + ((pressurePsi - p1) / (p2 - p1)) * (t2 - t1);
    }
  }
  return 0;
}

export const SuperheatCalculator: React.FC = () => {
  const [gas, setGas] = useState<Refrigerant>("R32");

  // Mode: Superheat (Dàn lạnh / Ống hút) or Subcooling (Dàn nóng / Ống lỏng)
  const [calcTab, setCalcTab] = useState<"SUPERHEAT" | "SUBCOOLING">("SUPERHEAT");

  // Low-side inputs (Superheat)
  const [suctionPressurePsi, setSuctionPressurePsi] = useState<number>(135); // psi
  const [suctionPipeTempC, setSuctionPipeTempC] = useState<number>(12); // °C

  // High-side inputs (Subcooling)
  const [dischargePressurePsi, setDischargePressurePsi] = useState<number>(390); // psi
  const [liquidPipeTempC, setLiquidPipeTempC] = useState<number>(40); // °C

  // Saturation temperatures
  const evapSatTempC = interpolateSatTemp(suctionPressurePsi, LOW_SIDE_PT[gas]);
  const condSatTempC = interpolateSatTemp(dischargePressurePsi, HIGH_SIDE_PT[gas]);

  // Results
  const superheatValue = suctionPipeTempC - evapSatTempC;
  const subcoolingValue = condSatTempC - liquidPipeTempC;

  // Diagnosis logic
  let shStatus: "OPTIMAL" | "LOW_FLOOD" | "HIGH_STARVE" = "OPTIMAL";
  if (superheatValue < 3.0) {
    shStatus = "LOW_FLOOD";
  } else if (superheatValue > 11.0) {
    shStatus = "HIGH_STARVE";
  }

  let scStatus: "OPTIMAL" | "LOW_SHORT" | "HIGH_OVERCHARGE" = "OPTIMAL";
  if (subcoolingValue < 3.0) {
    scStatus = "LOW_SHORT";
  } else if (subcoolingValue > 10.0) {
    scStatus = "HIGH_OVERCHARGE";
  }

  return (
    <div className="border border-neutral-300 bg-white p-4 sm:p-5 space-y-5">
      {/* Header */}
      <div className="border-b border-neutral-300 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info" size="sm">
              KỸ THUẬT NẠP GAS CHUYÊN NGHIỆP
            </Badge>
            <span className="font-mono text-[11px] text-neutral-500 uppercase">
              TIÊU CHUẨN ĐO LƯỜNG NHIỆT ĐỘNG HỌC HVAC
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-950 shrink-0" />
            Máy Tính Độ Quá Nhiệt (Superheat) & Độ Quá Lạnh (Subcooling)
          </h2>
        </div>
      </div>

      {/* Select Gas & Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50 p-3 border border-neutral-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-neutral-700 uppercase">Loại Môi Chất Lạnh:</span>
          <div className="flex border border-neutral-300">
            {(["R32", "R410A", "R22"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGas(g);
                  if (g === "R22") {
                    setSuctionPressurePsi(68);
                    setDischargePressurePsi(230);
                  } else {
                    setSuctionPressurePsi(135);
                    setDischargePressurePsi(390);
                  }
                }}
                className={`px-3 py-1 text-xs font-mono font-bold transition-none border-r last:border-r-0 border-neutral-300 ${
                  gas === g ? "bg-blue-950 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex border border-neutral-300">
          <button
            type="button"
            onClick={() => setCalcTab("SUPERHEAT")}
            className={`px-3 py-1 text-xs font-mono font-bold border-r border-neutral-300 ${
              calcTab === "SUPERHEAT" ? "bg-neutral-900 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            ĐỘ QUÁ NHIỆT (SUPERHEAT - DÀN LẠNH)
          </button>
          <button
            type="button"
            onClick={() => setCalcTab("SUBCOOLING")}
            className={`px-3 py-1 text-xs font-mono font-bold ${
              calcTab === "SUBCOOLING" ? "bg-neutral-900 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            ĐỘ QUÁ LẠNH (SUBCOOLING - DÀN NÓNG)
          </button>
        </div>
      </div>

      {/* CALCULATOR 1: SUPERHEAT */}
      {calcTab === "SUPERHEAT" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Input 1: Áp suất thấp */}
            <div className="border border-neutral-300 p-3 bg-white space-y-2">
              <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase">
                1. Áp Suất Hút (Đồng Hồ Áp Thấp - Psi)
              </label>
              <Input
                type="number"
                value={suctionPressurePsi}
                onChange={(e) => setSuctionPressurePsi(Number(e.target.value) || 0)}
                className="h-9 font-mono text-sm font-bold text-blue-950"
              />
              <div className="text-[11px] font-mono text-neutral-600 bg-neutral-100 p-2 border border-neutral-200">
                Nhiệt độ bão hòa bay hơi tương ứng:
                <strong className="block text-sm text-neutral-900 mt-0.5">
                  T_sat = {evapSatTempC.toFixed(1)}°C
                </strong>
              </div>
            </div>

            {/* Input 2: Nhiệt độ ống hút */}
            <div className="border border-neutral-300 p-3 bg-white space-y-2">
              <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase">
                2. Nhiệt Độ Ống Hút Đồng Về (Cảm Biến Kẹp - °C)
              </label>
              <Input
                type="number"
                value={suctionPipeTempC}
                onChange={(e) => setSuctionPipeTempC(Number(e.target.value) || 0)}
                className="h-9 font-mono text-sm font-bold text-neutral-950"
              />
              <div className="text-[11px] font-mono text-neutral-600 bg-neutral-100 p-2 border border-neutral-200">
                Vị trí kẹp: Ống đồng hơi về cách đầu lốc khoảng 15–20cm, cách nhiệt kỹ que đo.
              </div>
            </div>

            {/* Result: Superheat */}
            <div
              className={`border-2 p-3 space-y-2 ${
                shStatus === "OPTIMAL"
                  ? "border-emerald-600 bg-emerald-50/40"
                  : shStatus === "LOW_FLOOD"
                  ? "border-red-600 bg-red-50/40"
                  : "border-amber-600 bg-amber-50/40"
              }`}
            >
              <div className="text-[11px] font-mono font-bold uppercase flex items-center justify-between">
                <span>KẾT QUẢ ĐỘ QUÁ NHIỆT (SH)</span>
                {shStatus === "OPTIMAL" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div className="text-center py-1">
                <div className="text-3xl font-mono font-black text-neutral-950">
                  {superheatValue.toFixed(1)}°C
                </div>
                <div className="text-xs font-mono font-semibold text-neutral-700 mt-0.5">
                  Công thức: SH = T_ống - T_sat ({suctionPipeTempC}°C - {evapSatTempC.toFixed(1)}°C)
                </div>
              </div>
              <div className="text-xs font-mono pt-1 border-t border-neutral-300">
                Dải chuẩn máy lạnh dân dụng: <strong>5.0°C – 8.0°C</strong>
              </div>
            </div>
          </div>

          {/* Diagnostic Assessment Card */}
          <div
            className={`p-3.5 border text-xs leading-relaxed font-mono ${
              shStatus === "OPTIMAL"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : shStatus === "LOW_FLOOD"
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-amber-500 bg-amber-50 text-amber-900"
            }`}
          >
            <div className="font-bold uppercase mb-1 flex items-center gap-1.5 text-[12px]">
              <InfoCircle className="w-4 h-4 shrink-0" />
              CHẨN ĐOÁN HIỆN TRƯỜNG & KHUYẾN NGHỊ THAO TÁC:
            </div>
            {shStatus === "OPTIMAL" && (
              <p>
                <strong>HỆ THỐNG ĐẠT CHUẨN TỐI ƯU:</strong> Độ quá nhiệt {superheatValue.toFixed(1)}°C nằm trong khoảng
                vàng 5 - 8°C. Môi chất lạnh đã hóa hơi 100% trước khi đi vào máy nén, ngăn chặn hoàn toàn nguy cơ ngập
                dịch, đồng thời buồng lạnh trao đổi nhiệt hiệu suất cao nhất.
              </p>
            )}
            {shStatus === "LOW_FLOOD" && (
              <p>
                <strong>NGUY CƠ NGẬP DỊCH VỀ MÁY NÉN (LIQUID SLUGGING):</strong> Độ quá nhiệt quá thấp (
                {superheatValue.toFixed(1)}°C &lt; 3°C). Gas lỏng chưa kịp sôi hết trong dàn lạnh, lọt vào buồng nén.
                Dầu bôi trơn bị cuốn trôi làm bó kẹt cốt lốc hoặc gãy đĩa van clappe!
                <br />
                <span className="underline font-bold">Cách xử lý:</span> Kiểm tra quạt dàn lạnh có chạy yếu/nghẹt bụi
                không; kiểm tra van tiết lưu mở quá lớn hoặc hệ thống đang bị <strong>THỪA GAS</strong> (cần thu hồi bớt
                gas).
              </p>
            )}
            {shStatus === "HIGH_STARVE" && (
              <p>
                <strong>HỆ THỐNG ĐANG BỊ THIẾU GAS HOẶC NGHẸT TIẾT LƯU:</strong> Độ quá nhiệt quá cao (
                {superheatValue.toFixed(1)}°C &gt; 11°C). Dàn lạnh đói dịch môi chất (Evaporator starving), hơi hút về
                lốc quá nóng làm mất khả năng làm mát cuộn dây stator. Lốc sẽ nhanh chóng ngắt relay bảo vệ nhiệt
                (Overload).
                <br />
                <span className="underline font-bold">Cách xử lý:</span> Tìm và vá điểm rò rỉ xì gas, dùng cân điện tử
                nạp bổ sung gas lỏng đúng theo định lượng dập trên tem máy (Nameplate).
              </p>
            )}
          </div>
        </div>
      )}

      {/* CALCULATOR 2: SUBCOOLING */}
      {calcTab === "SUBCOOLING" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Input 1: Áp suất cao */}
            <div className="border border-neutral-300 p-3 bg-white space-y-2">
              <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase">
                1. Áp Suất Đẩy (Đồng Hồ Áp Cao - Psi)
              </label>
              <Input
                type="number"
                value={dischargePressurePsi}
                onChange={(e) => setDischargePressurePsi(Number(e.target.value) || 0)}
                className="h-9 font-mono text-sm font-bold text-red-950"
              />
              <div className="text-[11px] font-mono text-neutral-600 bg-neutral-100 p-2 border border-neutral-200">
                Nhiệt độ bão hòa ngưng tụ dàn nóng:
                <strong className="block text-sm text-neutral-900 mt-0.5">
                  T_cond_sat = {condSatTempC.toFixed(1)}°C
                </strong>
              </div>
            </div>

            {/* Input 2: Nhiệt độ ống lỏng */}
            <div className="border border-neutral-300 p-3 bg-white space-y-2">
              <label className="block text-[11px] font-mono font-bold text-neutral-700 uppercase">
                2. Nhiệt Độ Ống Lỏng Dàn Nóng Ra (Cảm Biến Kẹp - °C)
              </label>
              <Input
                type="number"
                value={liquidPipeTempC}
                onChange={(e) => setLiquidPipeTempC(Number(e.target.value) || 0)}
                className="h-9 font-mono text-sm font-bold text-neutral-950"
              />
              <div className="text-[11px] font-mono text-neutral-600 bg-neutral-100 p-2 border border-neutral-200">
                Vị trí kẹp: Đầu ống đẩy lỏng đi ra khỏi dàn nóng (trước khi vào van tiết lưu/ống mao).
              </div>
            </div>

            {/* Result: Subcooling */}
            <div
              className={`border-2 p-3 space-y-2 ${
                scStatus === "OPTIMAL"
                  ? "border-emerald-600 bg-emerald-50/40"
                  : scStatus === "LOW_SHORT"
                  ? "border-amber-600 bg-amber-50/40"
                  : "border-red-600 bg-red-50/40"
              }`}
            >
              <div className="text-[11px] font-mono font-bold uppercase flex items-center justify-between">
                <span>KẾT QUẢ ĐỘ QUÁ LẠNH (SC)</span>
                {scStatus === "OPTIMAL" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div className="text-center py-1">
                <div className="text-3xl font-mono font-black text-neutral-950">
                  {subcoolingValue.toFixed(1)}°C
                </div>
                <div className="text-xs font-mono font-semibold text-neutral-700 mt-0.5">
                  SC = T_cond_sat - T_ống_lỏng ({condSatTempC.toFixed(1)}°C - {liquidPipeTempC}°C)
                </div>
              </div>
              <div className="text-xs font-mono pt-1 border-t border-neutral-300">
                Dải chuẩn hệ thống van tiết lưu (TXV/EEV): <strong>4.0°C – 8.0°C</strong>
              </div>
            </div>
          </div>

          {/* Subcooling Diagnostic Assessment */}
          <div
            className={`p-3.5 border text-xs leading-relaxed font-mono ${
              scStatus === "OPTIMAL"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : scStatus === "LOW_SHORT"
                ? "border-amber-500 bg-amber-50 text-amber-900"
                : "border-red-500 bg-red-50 text-red-900"
            }`}
          >
            <div className="font-bold uppercase mb-1 flex items-center gap-1.5 text-[12px]">
              <InfoCircle className="w-4 h-4 shrink-0" />
              CHẨN ĐOÁN HIỆN TRƯỜNG & KHUYẾN NGHỊ:
            </div>
            {scStatus === "OPTIMAL" && (
              <p>
                <strong>NGƯNG TỤ HOÀN TOÀN:</strong> Độ quá lạnh {subcoolingValue.toFixed(1)}°C bảo đảm 100% môi chất
                lỏng nguyên chất đi tới đầu vào van tiết lưu (không bị sủi bọt khí Flash Gas). Năng suất lạnh đạt tối đa.
              </p>
            )}
            {scStatus === "LOW_SHORT" && (
              <p>
                <strong>THIẾU GAS HOẶC DÀN NÓNG GIẢI NHIỆT KÉM:</strong> Độ quá lạnh &lt; 3°C chứng tỏ đáy dàn nóng
                không tích trữ đủ lỏng. Có hiện tượng bọt khí đi vào van tiết lưu làm giảm lưu lượng và phát tiếng kêu
                rít xì xoè tại dàn lạnh. Cần nạp bổ sung gas lỏng.
              </p>
            )}
            {scStatus === "HIGH_OVERCHARGE" && (
              <p>
                <strong>DƯ THỪA GAS HOẶC NGHẸT PHIN LỌC ĐƯỜNG LỎNG:</strong> Độ quá lạnh &gt; 10°C chứng tỏ lỏng ngưng
                tụ dâng cao ngập các hàng ống dàn nóng, làm giảm diện tích giải nhiệt khiến áp suất nén vọt cao. Cần xả
                bớt gas hoặc thay phin lọc sấy nếu có độ chênh nhiệt hai đầu phin.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
