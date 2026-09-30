"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Calculator, CheckCircle, AlertTriangle } from "reicon-react";

interface PipeDimensionSpec {
  btu: number;
  hpText: string;
  suctionInch: string;
  suctionMm: number;
  liquidInch: string;
  liquidMm: number;
  minWallThicknessMm: number;
  standardPrechargeLengthM: number;
  additionalGasPerMeterGram: number;
}

const PIPE_DATABASE: Record<string, PipeDimensionSpec[]> = {
  R32: [
    { btu: 9000, hpText: "1.0 HP", suctionInch: "3/8\"", suctionMm: 9.52, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 15 },
    { btu: 12000, hpText: "1.5 HP", suctionInch: "3/8\"", suctionMm: 9.52, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 15 },
    { btu: 18000, hpText: "2.0 HP", suctionInch: "1/2\"", suctionMm: 12.7, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 20 },
    { btu: 24000, hpText: "2.5 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.81, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 20 },
    { btu: 36000, hpText: "4.0 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.81, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 35 },
    { btu: 48000, hpText: "5.0 HP", suctionInch: "3/4\"", suctionMm: 19.05, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.89, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 45 },
  ],
  R410A: [
    { btu: 9000, hpText: "1.0 HP", suctionInch: "3/8\"", suctionMm: 9.52, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 20 },
    { btu: 12000, hpText: "1.5 HP", suctionInch: "1/2\"", suctionMm: 12.7, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 20 },
    { btu: 18000, hpText: "2.0 HP", suctionInch: "1/2\"", suctionMm: 12.7, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 20 },
    { btu: 24000, hpText: "2.5 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.81, standardPrechargeLengthM: 7.5, additionalGasPerMeterGram: 30 },
    { btu: 36000, hpText: "4.0 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.81, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 40 },
    { btu: 48000, hpText: "5.0 HP", suctionInch: "3/4\"", suctionMm: 19.05, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.89, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 50 },
  ],
  R22: [
    { btu: 9000, hpText: "1.0 HP", suctionInch: "3/8\"", suctionMm: 9.52, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.65, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 20 },
    { btu: 12000, hpText: "1.5 HP", suctionInch: "1/2\"", suctionMm: 12.7, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.65, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 20 },
    { btu: 18000, hpText: "2.0 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "1/4\"", liquidMm: 6.35, minWallThicknessMm: 0.71, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 25 },
    { btu: 24000, hpText: "2.5 HP", suctionInch: "5/8\"", suctionMm: 15.88, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.71, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 30 },
    { btu: 36000, hpText: "4.0 HP", suctionInch: "3/4\"", suctionMm: 19.05, liquidInch: "3/8\"", liquidMm: 9.52, minWallThicknessMm: 0.81, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 45 },
    { btu: 48000, hpText: "5.0 HP", suctionInch: "7/8\"", suctionMm: 22.22, liquidInch: "1/2\"", liquidMm: 12.7, minWallThicknessMm: 0.89, standardPrechargeLengthM: 5.0, additionalGasPerMeterGram: 60 },
  ],
};

export const CopperPipingCalculator: React.FC = () => {
  const [gasType, setGasType] = useState<"R32" | "R410A" | "R22">("R32");
  const [selectedBtu, setSelectedBtu] = useState<number>(12000);
  const [pipeLength, setPipeLength] = useState<number>(12);
  const [heightDiff, setHeightDiff] = useState<number>(5);
  const [outdoorPosition, setOutdoorPosition] = useState<"HIGHER" | "LOWER">("HIGHER");
  const [elbowCount, setElbowCount] = useState<number>(4);

  // Equivalent length calculation (each 90° elbow ≈ 0.35m equivalent straight length)
  const equivalentLength = useMemo(() => {
    return Number((pipeLength + elbowCount * 0.35).toFixed(1));
  }, [pipeLength, elbowCount]);

  // Current spec match
  const currentSpec = useMemo(() => {
    const list = PIPE_DATABASE[gasType] || PIPE_DATABASE["R32"];
    return list.find((s) => s.btu === selectedBtu) || list[1];
  }, [gasType, selectedBtu]);

  // Extra refrigerant charge
  const extraGasGrams = useMemo(() => {
    if (pipeLength <= currentSpec.standardPrechargeLengthM) return 0;
    const extraMeters = pipeLength - currentSpec.standardPrechargeLengthM;
    return Math.round(extraMeters * currentSpec.additionalGasPerMeterGram);
  }, [pipeLength, currentSpec]);

  // Oil trap count calculation
  const oilTrapInfo = useMemo(() => {
    if (outdoorPosition === "LOWER") {
      return {
        needed: false,
        trapsCount: 0,
        advice: "Dàn nóng đặt thấp hơn dàn lạnh: Dầu bôi trơn tự chảy xuôi theo dòng gas về máy nén, KHÔNG CẦN làm bẫy dầu chữ P trên ống đứng. Chỉ cần uốn cổ ngỗng ngược (Inverted Trap) tại cửa thoát dàn lạnh để chống chảy tràn dịch gas khi máy tắt.",
      };
    }

    if (heightDiff < 3) {
      return {
        needed: false,
        trapsCount: 0,
        advice: "Chênh lệch độ cao dưới 3 mét: Vận tốc gas trong ống hút (≥ 5 m/s) đủ lớn để cuốn màng dầu hồi về máy nén mà không cần bẫy chữ P.",
      };
    }

    // When Outdoor > 3m
    const count = 1 + Math.floor((heightDiff - 3) / 5);
    return {
      needed: true,
      trapsCount: count,
      advice: `Dàn nóng cao hơn dàn lạnh ${heightDiff}m: BẮT BUỘC uốn 1 bẫy dầu chữ P tại chân ống đứng (sát dàn lạnh) và thêm ${
        count - 1
      } bẫy dầu phụ trung gian (cứ mỗi 5m chiều cao uốn 1 bẫy) để dầu không bị đọng lại làm cháy block do thiếu dầu.`,
    };
  }, [outdoorPosition, heightDiff]);

  return (
    <div className="border border-neutral-300 p-4 sm:p-5 bg-white space-y-5 font-sans">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5 uppercase">
              HVAC PIPING SIZER
            </span>
            <Badge variant="info" size="sm">
              TCVN 6104 • AHRI 550/590
            </Badge>
          </div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase mt-1">
            Thước Tính Đường Kính Ống Đồng, Bẫy Dầu & Nạp Gas Bổ Sung
          </h2>
        </div>
        <div className="text-[11px] font-mono text-neutral-500">
          CHUYÊN DỤNG CHO MÁY TREO TƯỜNG, MULTI & VRV
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-neutral-50 border border-neutral-200 text-xs">
        {/* Gas Type */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            1. LOẠI MÔI CHẤT LẠNH (GAS):
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(["R32", "R410A", "R22"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGasType(g)}
                className={`py-1 text-center font-mono font-bold border ${
                  gasType === g
                    ? "bg-blue-950 text-white border-blue-950"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            2. CÔNG SUẤT MÁY (BTU / HP):
          </label>
          <select
            value={selectedBtu}
            onChange={(e) => setSelectedBtu(Number(e.target.value))}
            className="w-full p-1.5 font-mono text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-hidden focus:border-blue-950"
          >
            <option value={9000}>9,000 BTU/h (1.0 HP)</option>
            <option value={12000}>12,000 BTU/h (1.5 HP)</option>
            <option value={18000}>18,000 BTU/h (2.0 HP)</option>
            <option value={24000}>24,000 BTU/h (2.5 HP)</option>
            <option value={36000}>36,000 BTU/h (4.0 HP)</option>
            <option value={48000}>48,000 BTU/h (5.0 HP)</option>
          </select>
        </div>

        {/* Pipe Length */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            3. CHIỀU DÀI ĐƯỜNG ỐNG THỰC TẾ (M):
          </label>
          <Input
            type="number"
            min={2}
            max={70}
            step={0.5}
            value={pipeLength}
            onChange={(e) => setPipeLength(Math.max(1, Number(e.target.value) || 0))}
            className="font-mono text-xs h-8"
          />
        </div>

        {/* Outdoor unit position */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            4. VỊ TRÍ DÀN NÓNG SO VỚI DÀN LẠNH:
          </label>
          <select
            value={outdoorPosition}
            onChange={(e) => setOutdoorPosition(e.target.value as "HIGHER" | "LOWER")}
            className="w-full p-1.5 font-mono text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-hidden focus:border-blue-950"
          >
            <option value="HIGHER">Dàn nóng ĐẶT CAO HƠN dàn lạnh (Trên mái tôn / tường cao)</option>
            <option value="LOWER">Dàn nóng ĐẶT THẤP HƠN dàn lạnh (Dưới nền / ban công thấp)</option>
          </select>
        </div>

        {/* Height difference */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            5. CHÊNH LỆCH ĐỘ CAO ΔH (M):
          </label>
          <Input
            type="number"
            min={0}
            max={40}
            step={0.5}
            value={heightDiff}
            onChange={(e) => setHeightDiff(Math.max(0, Number(e.target.value) || 0))}
            className="font-mono text-xs h-8"
          />
        </div>

        {/* Elbow count */}
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-700 block">
            6. SỐ LƯỢNG CO CÚT 90° UỐN ỐNG:
          </label>
          <Input
            type="number"
            min={0}
            max={20}
            value={elbowCount}
            onChange={(e) => setElbowCount(Math.max(0, Number(e.target.value) || 0))}
            className="font-mono text-xs h-8"
          />
        </div>
      </div>

      {/* Results Dashboard: 3 Main Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Pipe Diameters */}
        <div className="border-2 border-neutral-900 p-3 bg-white space-y-2">
          <div className="text-[11px] font-mono font-bold text-neutral-900 uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
            <span>1. QUY CÁCH ĐƯỜNG KÍNH ỐNG</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-2 pt-1 font-mono text-xs">
            <div className="p-2 bg-blue-50/60 border border-blue-200">
              <span className="text-[10px] text-blue-900 font-bold block">
                ỐNG HƠI / ỐNG HÚT (SUCTION LINE):
              </span>
              <div className="text-xl font-black text-neutral-950 mt-0.5">
                {currentSpec.suctionInch} (Φ {currentSpec.suctionMm} mm)
              </div>
            </div>

            <div className="p-2 bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] text-neutral-600 font-bold block">
                ỐNG LỎNG (LIQUID LINE):
              </span>
              <div className="text-xl font-black text-neutral-950 mt-0.5">
                {currentSpec.liquidInch} (Φ {currentSpec.liquidMm} mm)
              </div>
            </div>

            <div className="text-[11px] text-neutral-600 space-y-0.5 pt-1">
              <div>
                Độ dày thành ống tối thiểu: <strong>≥ {currentSpec.minWallThicknessMm} mm</strong>
              </div>
              <div className="text-[10px] text-neutral-500">
                (Gas {gasType} áp suất cao yêu cầu ống tiêu chuẩn ASTM B280 / JIS H3300)
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Extra Refrigerant Charge */}
        <div className="border-2 border-blue-900 p-3 bg-blue-50/30 space-y-2">
          <div className="text-[11px] font-mono font-bold text-blue-900 uppercase flex items-center justify-between border-b border-blue-200 pb-1.5">
            <span>2. NẠP GAS BỔ SUNG</span>
            <Calculator className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-center py-2">
            <div className="text-3xl font-mono font-black text-blue-950">
              {extraGasGrams > 0 ? `+${extraGasGrams} g` : "0 g (Đủ)"}
            </div>
            <div className="text-xs text-neutral-600 font-mono mt-1">
              {extraGasGrams > 0
                ? `Vượt ${pipeLength - currentSpec.standardPrechargeLengthM}m so với tiêu chuẩn máy (${currentSpec.standardPrechargeLengthM}m)`
                : `Chiều dài trong khoảng gas nạp sẵn của nhà sản xuất (≤ ${currentSpec.standardPrechargeLengthM}m)`}
            </div>
          </div>
          <div className="text-[11px] space-y-1 font-mono pt-1 border-t border-blue-200 text-neutral-700">
            <div className="flex justify-between">
              <span>Định mức nạp thêm:</span>
              <span className="font-bold">{currentSpec.additionalGasPerMeterGram} g/mét</span>
            </div>
            <div className="flex justify-between">
              <span>Chiều dài tương đương:</span>
              <span className="font-bold">{equivalentLength} mét</span>
            </div>
          </div>
        </div>

        {/* Card 3: Oil Trap & Height Check */}
        <div
          className={`border-2 p-3 space-y-2 ${
            oilTrapInfo.needed
              ? "border-amber-600 bg-amber-50/40 text-amber-950"
              : "border-neutral-900 bg-neutral-50 text-neutral-900"
          }`}
        >
          <div className="text-[11px] font-mono font-bold uppercase flex items-center justify-between border-b border-neutral-200 pb-1.5">
            <span>3. KHUYẾN CÁO BẪY DẦU (P-TRAP)</span>
            {oilTrapInfo.needed ? (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            )}
          </div>

          <div className="text-center py-1">
            <div className="text-2xl font-mono font-black">
              {oilTrapInfo.needed ? `${oilTrapInfo.trapsCount} BẪY DẦU P-TRAP` : "KHÔNG CẦN BẪY"}
            </div>
            <div className="text-[11px] mt-1 font-mono">
              Chênh lệch cao độ: <strong>{heightDiff} mét</strong>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed pt-1 border-t border-neutral-300">
            {oilTrapInfo.advice}
          </p>
        </div>
      </div>

      {/* Field Reference Summary Table */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-mono font-bold text-neutral-800 uppercase flex items-center justify-between">
          <span>BẢNG TRA CỨU ĐƯỜNG KÍNH ỐNG ĐỒNG TOÀN DẢI THEO MÔI CHẤT {gasType}</span>
          <span className="text-[10px] text-neutral-500 font-normal">ĐƠN VỊ: INCH / MM</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CÔNG SUẤT (BTU/HP)</TableHead>
              <TableHead>ỐNG HÚT (SUCTION)</TableHead>
              <TableHead>ỐNG LỎNG (LIQUID)</TableHead>
              <TableHead>ĐỘ DÀY THÀNH ỐNG</TableHead>
              <TableHead>CHIỀU DÀI SẴN GAS</TableHead>
              <TableHead>NẠP BỔ SUNG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(PIPE_DATABASE[gasType] || PIPE_DATABASE["R32"]).map((row) => (
              <TableRow
                key={row.btu}
                className={selectedBtu === row.btu ? "bg-blue-50/70 font-bold" : ""}
              >
                <TableCell className="font-mono">
                  {row.btu.toLocaleString()} BTU ({row.hpText})
                </TableCell>
                <TableCell className="font-mono text-blue-950 font-bold">
                  {row.suctionInch} ({row.suctionMm} mm)
                </TableCell>
                <TableCell className="font-mono">
                  {row.liquidInch} ({row.liquidMm} mm)
                </TableCell>
                <TableCell className="font-mono">≥ {row.minWallThicknessMm} mm</TableCell>
                <TableCell className="font-mono">{row.standardPrechargeLengthM} m</TableCell>
                <TableCell className="font-mono">{row.additionalGasPerMeterGram} g/m</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Technical Notes */}
      <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1 font-mono">
        <div className="font-bold text-neutral-900 uppercase">
          QUY TẮC SỐNG CÒN CỦA NGHỀ ĐIỆN LẠNH KHI LẮP ĐẶT ĐƯỜNG ỐNG:
        </div>
        <ul className="list-disc pl-4 space-y-0.5 text-[11px] leading-relaxed">
          <li>Tuyệt đối không dùng ống mỏng dưới 0.71 mm cho Gas R32 và R410A vì áp suất nén có thể vượt 42 bar gây nổ vỡ ống.</li>
          <li>Khi hàn ống đồng, bắt buộc thổi khí Nitơ áp suất nhẹ (0.2 bar) qua lòng ống để chống oxy hóa tạo muội than làm tắc cáp và cháy lốc.</li>
          <li>Đường ống hút nằm ngang phải tạo độ dốc nhẹ từ 0.5% đến 1% nghiêng dần về phía máy nén để dầu bôi trơn dễ dàng tự chảy về.</li>
        </ul>
      </div>
    </div>
  );
};
