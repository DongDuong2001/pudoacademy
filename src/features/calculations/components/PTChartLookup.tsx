"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

interface PTEntry {
  tempC: number;
  r32_psi: number;
  r32_bar: number;
  r410a_psi: number;
  r410a_bar: number;
  r22_psi: number;
  r22_bar: number;
}

const PT_DATA: PTEntry[] = [
  { tempC: 0, r32_psi: 118, r32_bar: 8.14, r410a_psi: 116, r410a_bar: 8.0, r22_psi: 72, r22_bar: 4.97 },
  { tempC: 2, r32_psi: 126, r32_bar: 8.69, r410a_psi: 124, r410a_bar: 8.55, r22_psi: 77, r22_bar: 5.31 },
  { tempC: 4, r32_psi: 135, r32_bar: 9.31, r410a_psi: 133, r410a_bar: 9.17, r22_psi: 83, r22_bar: 5.72 },
  { tempC: 6, r32_psi: 144, r32_bar: 9.93, r410a_psi: 142, r410a_bar: 9.79, r22_psi: 89, r22_bar: 6.14 },
  { tempC: 8, r32_psi: 154, r32_bar: 10.62, r410a_psi: 152, r410a_bar: 10.48, r22_psi: 95, r22_bar: 6.55 },
  { tempC: 10, r32_psi: 164, r32_bar: 11.31, r410a_psi: 162, r410a_bar: 11.17, r22_psi: 101, r22_bar: 6.96 },
  { tempC: 45, r32_psi: 395, r32_bar: 27.23, r410a_psi: 387, r410a_bar: 26.68, r22_psi: 251, r22_bar: 17.31 },
  { tempC: 50, r32_psi: 454, r32_bar: 31.30, r410a_psi: 442, r410a_bar: 30.48, r22_psi: 282, r22_bar: 19.44 },
];

export const PTChartLookup: React.FC = () => {
  const [selectedGas, setSelectedGas] = useState<"R32" | "R410A" | "R22">("R32");
  const [unit, setUnit] = useState<"psi" | "bar">("psi");

  return (
    <div className="my-6 border border-neutral-300 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-300 pb-3 mb-3">
        <div>
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-neutral-900">
            BẢNG TRA CỨU ÁP SUẤT - NHIỆT ĐỘ BÃO HÒA (P-T CHART)
          </span>
          <p className="text-[11px] text-neutral-500">
            Dùng để đo nhiệt độ bay hơi dàn lạnh & nhiệt độ ngưng tụ dàn nóng khi nạp gas
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {/* Gas selector */}
          <div className="flex border border-neutral-300">
            {(["R32", "R410A", "R22"] as const).map((gas) => (
              <button
                key={gas}
                type="button"
                onClick={() => setSelectedGas(gas)}
                className={cn(
                  "px-2.5 py-1 text-xs font-mono font-bold transition-none border-r last:border-r-0 border-neutral-300",
                  selectedGas === gas
                    ? "bg-blue-950 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                {gas}
              </button>
            ))}
          </div>

          {/* Unit selector */}
          <div className="flex border border-neutral-300">
            {(["psi", "bar"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={cn(
                  "px-2 py-1 text-xs font-mono font-bold uppercase transition-none border-r last:border-r-0 border-neutral-300",
                  unit === u
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700"
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">NHIỆT ĐỘ BÃO HÒA (°C)</TableHead>
            <TableHead className="w-1/3">ÁP SUẤT TƯƠNG ỨNG ({unit.toUpperCase()})</TableHead>
            <TableHead className="w-1/3">TRẠNG THÁI ỨNG DỤNG ĐIỆN LẠNH</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PT_DATA.map((row, idx) => {
            let pressureVal = 0;
            if (selectedGas === "R32") {
              pressureVal = unit === "psi" ? row.r32_psi : row.r32_bar;
            } else if (selectedGas === "R410A") {
              pressureVal = unit === "psi" ? row.r410a_psi : row.r410a_bar;
            } else {
              pressureVal = unit === "psi" ? row.r22_psi : row.r22_bar;
            }

            const isEvaporating = row.tempC <= 10;
            return (
              <TableRow key={idx}>
                <TableCell className="font-mono font-bold text-neutral-950">
                  {row.tempC > 0 ? `+${row.tempC}` : row.tempC} °C
                </TableCell>
                <TableCell className="font-mono font-bold text-blue-950">
                  {pressureVal} {unit}
                </TableCell>
                <TableCell>
                  {isEvaporating ? (
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Điểm sôi dàn lạnh (Nhiệt độ bay hơi chuẩn)
                    </span>
                  ) : (
                    <span className="text-[11px] text-red-800 font-medium">
                      Điểm ngưng tụ dàn nóng (Áp cao dàn nóng)
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
