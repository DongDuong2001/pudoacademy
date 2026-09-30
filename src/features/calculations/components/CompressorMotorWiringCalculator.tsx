"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { AlertTriangle } from "reicon-react";

export const CompressorMotorWiringCalculator: React.FC = () => {
  // Resistance measured between 3 terminal pairs (Pin 1, Pin 2, Pin 3)
  const [r12, setR12] = useState<string>("5.5"); // R(1-2)
  const [r23, setR23] = useState<string>("2.2"); // R(2-3)
  const [r31, setR31] = useState<string>("3.3"); // R(3-1)

  // Quick preset buttons for common compressors
  const loadPreset = (val12: number, val23: number, val31: number) => {
    setR12(val12.toString());
    setR23(val23.toString());
    setR31(val31.toString());
  };

  const analysis = useMemo(() => {
    const v12 = parseFloat(r12);
    const v23 = parseFloat(r23);
    const v31 = parseFloat(r31);

    if (isNaN(v12) || isNaN(v23) || isNaN(v31) || v12 <= 0 || v23 <= 0 || v31 <= 0) {
      return {
        isValid: false,
        error: "Vui lòng nhập đầy đủ giá trị điện trở dương (> 0 Ω) giữa 3 cặp cọc đấu dây.",
        cPin: null,
        rPin: null,
        sPin: null,
        rcr: 0,
        rcs: 0,
        rrs: 0,
      };
    }

    // Find the pair with max resistance
    const maxVal = Math.max(v12, v23, v31);
    let cPin = 0;
    let otherA = 0;
    let otherB = 0;
    const rrsVal = maxVal;
    let r_CA = 0;
    let r_CB = 0;

    if (maxVal === v12) {
      cPin = 3;
      otherA = 1;
      otherB = 2;
      r_CA = v31;
      r_CB = v23;
    } else if (maxVal === v23) {
      cPin = 1;
      otherA = 2;
      otherB = 3;
      r_CA = v12;
      r_CB = v31;
    } else {
      cPin = 2;
      otherA = 3;
      otherB = 1;
      r_CA = v23;
      r_CB = v12;
    }

    // Between otherA and otherB: smaller resistance to C is Run (R), larger is Start (S)
    let rPin = 0;
    let sPin = 0;
    let rcr = 0;
    let rcs = 0;

    if (r_CA < r_CB) {
      rPin = otherA;
      sPin = otherB;
      rcr = r_CA;
      rcs = r_CB;
    } else {
      rPin = otherB;
      sPin = otherA;
      rcr = r_CB;
      rcs = r_CA;
    }

    // Check sum rule: R_RS ≈ R_CR + R_CS
    const expectedSum = rcr + rcs;
    const diff = Math.abs(rrsVal - expectedSum);
    const percentDiff = (diff / expectedSum) * 100;

    const isSumValid = percentDiff <= 12; // allow 12% measurement error margin

    return {
      isValid: true,
      error: !isSumValid
        ? `LƯU Ý: Tổng trở R(C-R) + R(C-S) = ${expectedSum.toFixed(1)}Ω lệch ${percentDiff.toFixed(1)}% so với R(R-S) = ${rrsVal.toFixed(1)}Ω. Hãy kiểm tra que đo đồng hồ hoặc tiếp xúc cọc máy nén có bị rỉ sét không.`
        : null,
      cPin,
      rPin,
      sPin,
      rcr,
      rcs,
      rrs: rrsVal,
      percentDiff,
    };
  }, [r12, r23, r31]);

  return (
    <div className="border border-neutral-300 p-4 sm:p-5 bg-white space-y-5 font-sans">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-blue-950 text-white px-2 py-0.5 uppercase">
              CRS COMPRESSOR DIAGNOSTIC
            </span>
            <Badge variant="info" size="sm">
              ĐỊNH LUẬT KIRCHHOFF • TỤ ĐỘNG CƠ 1 PHA
            </Badge>
          </div>
          <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase mt-1">
            Xác Định Chân C - R - S Máy Nén 1 Pha & Sơ Đồ Đấu Tụ
          </h2>
        </div>
        <div className="text-[11px] font-mono text-neutral-500">
          CHỐNG NỔ TỤ • CHỐNG CHÁY CUỘN ĐỀ DO ĐẤU SAI DÂY
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-neutral-500">MẪU ĐO THỰC TẾ:</span>
        <button
          type="button"
          onClick={() => loadPreset(5.5, 2.2, 3.3)}
          className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800"
        >
          Máy 1.0 HP (5.5Ω, 2.2Ω, 3.3Ω)
        </button>
        <button
          type="button"
          onClick={() => loadPreset(3.8, 1.5, 2.3)}
          className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800"
        >
          Máy 1.5 HP (3.8Ω, 1.5Ω, 2.3Ω)
        </button>
        <button
          type="button"
          onClick={() => loadPreset(2.4, 0.9, 1.5)}
          className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800"
        >
          Máy 2.0 HP (2.4Ω, 0.9Ω, 1.5Ω)
        </button>
      </div>

      {/* Input 3 Resistances */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-neutral-50 border border-neutral-200 text-xs">
        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-800 block">
            1. ĐIỆN TRỞ CẶP CỌC (1 - 2):
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              step={0.1}
              value={r12}
              onChange={(e) => setR12(e.target.value)}
              className="font-mono text-xs h-8"
              placeholder="VD: 5.5"
            />
            <span className="font-mono font-bold text-neutral-600">Ω</span>
          </div>
          <span className="text-[10px] text-neutral-500 block">Đo que đỏ cọc 1, que đen cọc 2</span>
        </div>

        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-800 block">
            2. ĐIỆN TRỞ CẶP CỌC (2 - 3):
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              step={0.1}
              value={r23}
              onChange={(e) => setR23(e.target.value)}
              className="font-mono text-xs h-8"
              placeholder="VD: 2.2"
            />
            <span className="font-mono font-bold text-neutral-600">Ω</span>
          </div>
          <span className="text-[10px] text-neutral-500 block">Đo que đỏ cọc 2, que đen cọc 3</span>
        </div>

        <div className="space-y-1">
          <label className="font-mono font-bold text-neutral-800 block">
            3. ĐIỆN TRỞ CẶP CỌC (3 - 1):
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              step={0.1}
              value={r31}
              onChange={(e) => setR31(e.target.value)}
              className="font-mono text-xs h-8"
              placeholder="VD: 3.3"
            />
            <span className="font-mono font-bold text-neutral-600">Ω</span>
          </div>
          <span className="text-[10px] text-neutral-500 block">Đo que đỏ cọc 3, que đen cọc 1</span>
        </div>
      </div>

      {/* Diagnosis Verdict */}
      {analysis.isValid ? (
        <div className="space-y-4">
          {analysis.error && (
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-950 text-xs font-mono flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>{analysis.error}</div>
            </div>
          )}

          {/* 3 Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card C */}
            <div className="border-2 border-neutral-900 p-3 bg-white space-y-1.5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-1">
                <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase">
                  CHÂN CHUNG (COMMON)
                </span>
                <span className="text-xs font-mono font-black bg-blue-950 text-white px-1.5 py-0.2">
                  CHÂN C
                </span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl font-mono font-black text-neutral-950">
                  CỌC SỐ {analysis.cPin}
                </div>
                <div className="text-xs text-neutral-600 font-mono mt-0.5">
                  (Điểm chung giữa cuộn Chạy & Đề)
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-700 bg-neutral-50 p-2 border border-neutral-200">
                ➔ <strong>Cách đấu dây:</strong> Nối trực tiếp vào dây Trung Tính (N) nguồn 220V qua Rơle nhiệt OLP bảo vệ vỏ lốc.
              </div>
            </div>

            {/* Card R */}
            <div className="border-2 border-emerald-700 p-3 bg-emerald-50/30 space-y-1.5">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-1">
                <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase">
                  CHÂN CHẠY (RUN)
                </span>
                <span className="text-xs font-mono font-black bg-emerald-700 text-white px-1.5 py-0.2">
                  CHÂN R
                </span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl font-mono font-black text-emerald-950">
                  CỌC SỐ {analysis.rPin}
                </div>
                <div className="text-xs text-emerald-800 font-mono mt-0.5">
                  Điện trở R(C-R) = <strong>{analysis.rcr} Ω</strong> (Nhỏ nhất)
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-700 bg-white p-2 border border-emerald-200">
                ➔ <strong>Cách đấu dây:</strong> Nối chung với 1 cực của Tụ Ngậm (Capacitor) và cấp thẳng dây Pha / Dây Lửa (L) 220V vào đây.
              </div>
            </div>

            {/* Card S */}
            <div className="border-2 border-amber-600 p-3 bg-amber-50/30 space-y-1.5">
              <div className="flex items-center justify-between border-b border-amber-200 pb-1">
                <span className="text-[11px] font-mono font-bold text-amber-900 uppercase">
                  CHÂN KHỞI ĐỘNG (START)
                </span>
                <span className="text-xs font-mono font-black bg-amber-600 text-white px-1.5 py-0.2">
                  CHÂN S
                </span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl font-mono font-black text-amber-950">
                  CỌC SỐ {analysis.sPin}
                </div>
                <div className="text-xs text-amber-900 font-mono mt-0.5">
                  Điện trở R(C-S) = <strong>{analysis.rcs} Ω</strong> (Trung bình)
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-700 bg-white p-2 border border-amber-200">
                ➔ <strong>Cách đấu dây:</strong> Nối độc lập vào cực còn lại của Tụ Ngậm. TUYỆT ĐỐI KHÔNG cấp nguồn trực tiếp vào chân S!
              </div>
            </div>
          </div>

          {/* Schematic Blueprint Wiring Guide */}
          <div className="border border-neutral-300 p-3 bg-white space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-900 uppercase flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>SƠ ĐỒ NGUYÊN LÝ ĐẤU NỐI MẠCH ĐIỆN TỤ NGẬM CHO MÁY NÉN:</span>
            </div>

            <div className="p-3 bg-neutral-900 text-green-400 font-mono text-xs rounded-xs overflow-x-auto space-y-1">
              <div className="text-neutral-400 text-[10px]">
                # SƠ ĐỒ ĐẤU DÂY TIÊU CHUẨN MÁY LẠNH 1 PHA (PSC - PERMANENT SPLIT CAPACITOR):
              </div>
              <div>[Nguồn Lửa L 220V] ───────────────┬───────────────────────────➔ [Chân R (Cọc {analysis.rPin})]</div>
              <div>                                 │</div>
              <div>                                 └───[TỤ NGẬM RUN CAP]───────➔ [Chân S (Cọc {analysis.sPin})]</div>
              <div>                                                               (Cuộn đề lệch pha 90°)</div>
              <div>[Nguồn Nguội N 220V] ──[RƠ-LE NHIỆT OLP]─────────────────────➔ [Chân C (Cọc {analysis.cPin})]</div>
            </div>

            <div className="text-[11px] text-neutral-600 font-mono leading-relaxed pt-1">
              <strong>Quy tắc xác minh nhanh:</strong> Cuộn chạy (C-R) dây to nên điện trở nhỏ nhất ({analysis.rcr}Ω). Cuộn đề (C-S) dây mảnh nhiều vòng nên điện trở lớn hơn ({analysis.rcs}Ω). Cặp R-S có điện trở bằng tổng hai cuộn ({analysis.rrs}Ω = {analysis.rcr}Ω + {analysis.rcs}Ω).
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-neutral-100 border border-neutral-300 text-center font-mono text-xs text-neutral-600">
          {analysis.error}
        </div>
      )}
    </div>
  );
};
