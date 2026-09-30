"use client";

import React, { useState } from "react";
import { SchematicData, TestPoint } from "@/types/schematic";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Activity } from "reicon-react";

interface SchematicViewerProps {
  schematic: SchematicData;
  className?: string;
}

export const SchematicViewer: React.FC<SchematicViewerProps> = ({
  schematic,
  className,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<TestPoint>(
    schematic.testPoints[0]
  );

  return (
    <figure
      className={cn(
        "my-6 border border-neutral-300 bg-white p-3 sm:p-4 min-w-0 overflow-hidden",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3 mb-4 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-xs bg-neutral-200 text-neutral-800 px-1.5 py-0.5 shrink-0">
              MÃ SƠ ĐỒ: {schematic.diagramCode}
            </span>
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider truncate">
              {schematic.title}
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-1 break-words">
            {schematic.description}
          </p>
        </div>

        <Badge variant="info" size="sm" className="shrink-0">
          {schematic.testPoints.length} ĐIỂM TEST POINT
        </Badge>
      </div>

      {/* SVG Diagram Canvas with Motion */}
      <div className="w-full bg-neutral-50 border border-neutral-300 relative overflow-hidden p-2 sm:p-4">
        <svg
          viewBox="0 0 760 260"
          className="w-full h-auto text-neutral-900 font-mono"
        >
          <defs>
            <style>{`
              @keyframes smoothDataFlow {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              .smooth-data-line {
                stroke-dasharray: 10 8;
                animation: smoothDataFlow 5s linear infinite;
              }
            `}</style>
          </defs>

          {/* Background grid */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="760" height="260" fill="url(#grid)" />

          {/* Dàn lạnh (Indoor Unit) Block */}
          <rect
            x="40"
            y="30"
            width="180"
            height="200"
            fill="#ffffff"
            stroke="#27272a"
            strokeWidth="1.5"
          />
          <text x="50" y="55" fontSize="12" fontWeight="bold" fill="#09090b">
            DÀN LẠNH (INDOOR)
          </text>
          <text x="50" y="75" fontSize="10" fill="#71717a">
            MCU Điều khiển 5V DC
          </text>

          {/* Opto PC1 inside Indoor */}
          <rect
            x="140"
            y="95"
            width="60"
            height="40"
            fill="#f4f4f5"
            stroke="#27272a"
            strokeWidth="1"
          />
          <text x="150" y="120" fontSize="10" fontWeight="bold" fill="#1e3a8a">
            PC1 (Rx)
          </text>

          {/* Terminal Block Indoor */}
          <circle cx="220" cy="100" r="4" fill="#09090b" />
          <text x="190" y="92" fontSize="9" fontWeight="bold" fill="#b91c1c">
            L (1)
          </text>
          <circle cx="220" cy="140" r="4" fill="#09090b" />
          <text x="190" y="132" fontSize="9" fontWeight="bold" fill="#1d4ed8">
            N (2)
          </text>
          <circle cx="220" cy="180" r="4" fill="#09090b" />
          <text x="175" y="172" fontSize="9" fontWeight="bold" fill="#047857">
            DATA (3)
          </text>

          {/* Dàn nóng (Outdoor Unit) Block */}
          <rect
            x="540"
            y="30"
            width="180"
            height="200"
            fill="#ffffff"
            stroke="#27272a"
            strokeWidth="1.5"
          />
          <text x="550" y="55" fontSize="12" fontWeight="bold" fill="#09090b">
            DÀN NÓNG (OUTDOOR)
          </text>
          <text x="550" y="75" fontSize="10" fill="#71717a">
            Vi xử lý & Khối Biến tần
          </text>

          {/* Opto PC2 inside Outdoor */}
          <rect
            x="560"
            y="155"
            width="60"
            height="40"
            fill="#f4f4f5"
            stroke="#27272a"
            strokeWidth="1"
          />
          <text x="570" y="180" fontSize="10" fontWeight="bold" fill="#1e3a8a">
            PC2 (Tx)
          </text>

          {/* Terminal Block Outdoor */}
          <circle cx="540" cy="100" r="4" fill="#09090b" />
          <text x="548" y="92" fontSize="9" fontWeight="bold" fill="#b91c1c">
            L (1)
          </text>
          <circle cx="540" cy="140" r="4" fill="#09090b" />
          <text x="548" y="132" fontSize="9" fontWeight="bold" fill="#1d4ed8">
            N (2)
          </text>
          <circle cx="540" cy="180" r="4" fill="#09090b" />
          <text x="548" y="172" fontSize="9" fontWeight="bold" fill="#047857">
            DATA (3)
          </text>

          {/* Interconnecting Wire Lines */}
          {/* Wire 1: AC 220V Phase */}
          <line
            x1="220"
            y1="100"
            x2="540"
            y2="100"
            stroke="#b91c1c"
            strokeWidth="2"
          />
          <text x="340" y="92" fontSize="10" fontWeight="bold" fill="#b91c1c">
            DÂY 1 [L - AC 220V]
          </text>

          {/* Wire 2: AC Neutral / Reference GND */}
          <line
            x1="220"
            y1="140"
            x2="540"
            y2="140"
            stroke="#1d4ed8"
            strokeWidth="2"
          />
          <text x="340" y="132" fontSize="10" fontWeight="bold" fill="#1d4ed8">
            DÂY 2 [N - Mass quy chiếu]
          </text>

          {/* Wire 3: Serial Communication Data - ANIMATED */}
          <line
            x1="220"
            y1="180"
            x2="540"
            y2="180"
            stroke="#047857"
            strokeWidth="2.5"
            className="smooth-data-line"
          />
          <text x="325" y="172" fontSize="10" fontWeight="bold" fill="#047857">
            DÂY 3 [Xung Serial Data 15V-55V DC] ➔
          </text>

          {/* Interactive Test Points on Diagram */}
          {schematic.testPoints.map((tp) => {
            const isSelected = selectedPoint.id === tp.id;
            const cx = (tp.coordinate.x / 100) * 760;
            const cy = (tp.coordinate.y / 100) * 260;

            return (
              <g
                key={tp.id}
                className="cursor-pointer select-none"
                onClick={() => setSelectedPoint(tp)}
              >
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "13" : "10"}
                  fill={isSelected ? "#1e3a8a" : "#27272a"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#ffffff"
                >
                  {tp.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Test Points Selector & Detail Card - FIXED TEXT OVERFLOW */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3 min-w-0">
        {/* Point Buttons (Left 5 cols) */}
        <div className="space-y-1.5 md:col-span-5 border border-neutral-300 p-2.5 bg-neutral-50 min-w-0">
          <div className="text-[11px] font-mono font-bold text-neutral-600 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>CHỌN ĐIỂM TEST POINT:</span>
            <span className="text-[10px] text-blue-900 font-bold">CLICK ĐỂ XEM</span>
          </div>

          <div className="space-y-1.5 min-w-0">
            {schematic.testPoints.map((point) => {
              const isSelected = selectedPoint.id === point.id;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setSelectedPoint(point)}
                  className={cn(
                    "w-full text-left p-2 border transition-none min-w-0 flex flex-col gap-1 overflow-hidden",
                    isSelected
                      ? "bg-blue-950 text-white border-blue-950"
                      : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                  )}
                >
                  {/* Top row: ID and voltage */}
                  <div className="flex items-center justify-between gap-1 w-full min-w-0">
                    <span className="font-mono font-bold text-xs shrink-0 flex items-center gap-1">
                      <span className={cn("px-1 py-0.2 text-[10px]", isSelected ? "bg-blue-800 text-white" : "bg-neutral-200 text-neutral-900")}>
                        {point.id}
                      </span>
                      <span className="text-[11px] uppercase font-bold truncate">
                        {point.signalType}
                      </span>
                    </span>
                    <span className={cn("font-mono text-[10px] px-1.5 py-0.5 border shrink-0", isSelected ? "bg-blue-900 border-blue-700 text-blue-100" : "bg-neutral-100 border-neutral-300 text-neutral-700")}>
                      {point.nominalVoltage}
                    </span>
                  </div>

                  {/* Bottom row: Full Name safely wrapped */}
                  <div className={cn("text-[11px] leading-tight break-words font-medium", isSelected ? "text-neutral-100" : "text-neutral-900")}>
                    {point.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Test Point Live Diagnostics Spec (Right 7 cols) */}
        <div className="md:col-span-7 p-3.5 bg-white border border-neutral-300 space-y-2.5 text-xs min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-2 min-w-0">
              <Activity className="w-4 h-4 text-blue-900 shrink-0" />
              <span className="font-mono font-bold text-xs sm:text-sm text-neutral-950 break-words">
                [{selectedPoint.id}] {selectedPoint.name}
              </span>
            </div>
            <Badge variant="warning" size="sm" className="shrink-0">
              THANG ĐO: {selectedPoint.signalType}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] py-1">
            <div className="bg-neutral-50 p-2 border border-neutral-200 min-w-0">
              <span className="text-neutral-500 block text-[10px]">ĐIỆN ÁP ĐỊNH MỨC</span>
              <span className="font-bold text-neutral-950 text-xs break-words">
                {selectedPoint.nominalVoltage}
              </span>
            </div>
            <div className="bg-neutral-50 p-2 border border-neutral-200 min-w-0">
              <span className="text-neutral-500 block text-[10px]">DẢI ĐO CHẤP NHẬN</span>
              <span className="font-bold text-blue-950 text-xs break-words">
                {selectedPoint.expectedRange}
              </span>
            </div>
          </div>

          <div className="text-[11px] leading-relaxed text-neutral-800 pt-1 border-t border-neutral-100">
            <span className="font-bold uppercase text-neutral-600 block text-[10px] mb-0.5">
              QUY TRÌNH THAO TÁC QUE ĐO NGOÀI HIỆN TRƯỜNG:
            </span>
            <p className="break-words">
              {selectedPoint.description}
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[11px] font-mono text-neutral-500 text-right">
        * Hình 1.1 - Sơ đồ phân tích mạch truyền xung dữ liệu & cấp nguồn Inverter (Đường Data chuyển động)
      </figcaption>
    </figure>
  );
};
