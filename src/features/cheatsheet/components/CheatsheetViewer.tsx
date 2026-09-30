"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  REFRIGERANT_SPECS,
  ENGINEERING_FORMULAS,
  SENSOR_SPECS,
  COPPER_PIPE_SPECS,
  CORE_ERROR_CODES,
  VOM_TEST_PROCEDURES,
} from "../data/cheatsheetData";
import { MathFormula } from "@/components/ui/MathFormula";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Calculator,
  Printer,
  AlertTriangle,
  CheckCircle,
  Copy,
  BookOpen,
} from "reicon-react";
import { CadiviCableCalculator } from "@/features/calculations/components/CadiviCableCalculator";
import { SuperheatCalculator } from "@/features/calculations/components/SuperheatCalculator";
import { CopperPipingCalculator } from "@/features/calculations/components/CopperPipingCalculator";
import { CompressorMotorWiringCalculator } from "@/features/calculations/components/CompressorMotorWiringCalculator";
import { DiagnosticWizard } from "@/features/diagnostics/components/DiagnosticWizard";
import { HVAC_GLOSSARY } from "../data/hvacGlossaryData";

type CheatsheetTab =
  | "ALL"
  | "GAS"
  | "CALCULATORS"
  | "WIZARD"
  | "GLOSSARY"
  | "FORMULAS"
  | "SENSORS"
  | "PIPES"
  | "ERRORS"
  | "VOM";

interface CheatsheetViewerProps {
  initialTab?: CheatsheetTab;
  className?: string;
  onOpenExam?: () => void;
}

export const CheatsheetViewer: React.FC<CheatsheetViewerProps> = ({
  initialTab = "ALL",
  className,
  onOpenExam,
}) => {
  const [activeTab, setActiveTab] = useState<CheatsheetTab>(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const q = searchQuery.toLowerCase().trim();

  // Filtered lists
  const filteredGas = REFRIGERANT_SPECS.filter(
    (g) =>
      g.code.toLowerCase().includes(q) ||
      g.name.toLowerCase().includes(q) ||
      g.suctionPressure.toLowerCase().includes(q) ||
      g.oilType.toLowerCase().includes(q)
  );

  const filteredFormulas = ENGINEERING_FORMULAS.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.formulaDisplay.toLowerCase().includes(q) ||
      f.practicalRule.toLowerCase().includes(q)
  );

  const filteredSensors = SENSOR_SPECS.filter(
    (s) =>
      s.brand.toLowerCase().includes(q) ||
      s.coilSensor25C.toLowerCase().includes(q) ||
      s.dischargeSensor25C.toLowerCase().includes(q) ||
      s.faultSymptom.toLowerCase().includes(q)
  );

  const filteredPipes = COPPER_PIPE_SPECS.filter(
    (p) =>
      p.inchSize.toLowerCase().includes(q) ||
      p.mmSize.toLowerCase().includes(q) ||
      p.torqueNm.toLowerCase().includes(q) ||
      p.applications.toLowerCase().includes(q)
  );

  const filteredErrors = CORE_ERROR_CODES.filter(
    (e) =>
      e.code.toLowerCase().includes(q) ||
      e.brand.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q) ||
      e.rootCause.toLowerCase().includes(q)
  );

  const filteredVom = VOM_TEST_PROCEDURES.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.component.toLowerCase().includes(q) ||
      v.goldenRule.toLowerCase().includes(q)
  );

  const filteredGlossary = HVAC_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      item.fullNameEn.toLowerCase().includes(q) ||
      item.fullNameVi.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.fieldApplication.toLowerCase().includes(q) ||
      item.technicalRule.toLowerCase().includes(q)
  );

  return (
    <div className={cn("space-y-6 max-w-full min-w-0 font-sans text-neutral-900", className)}>
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-3 print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-300 pb-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-black text-xs bg-blue-950 text-white px-2 py-0.5">
                CẨM NANG CHEATSHEET
              </span>
              <Badge variant="warning" size="sm">
                TRA CỨU KỸ THUẬT NHANH 1-CHẠM
              </Badge>
              <span className="font-mono text-xs text-neutral-500">
                CHUẨN CAO ĐẲNG NGHỀ 3 NĂM
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-950 break-words">
              Sổ Tay Tra Cứu Số Liệu & Công Thức Cứu Nguy Hiện Trường
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Tổng hợp toàn bộ bảng tra áp suất gas, trở kháng cảm biến Sensor nhiệt, lực siết ống đồng, công thức toán lý điện lạnh và mã lỗi biến tần thường gặp.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 print:hidden self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-mono text-xs flex items-center gap-1.5 h-8"
              title="In toàn bộ cẩm nang tra cứu ra giấy hoặc lưu PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IN SỔ TAY</span>
            </Button>
          </div>
        </div>

        {/* Search Bar & Instant Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 print:hidden">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Gõ từ khóa tra nhanh: R32, U4, Daikin, 15k, Cadivi, Lực siết, OLP, C-R-S..."
              className="w-full pl-9 pr-3 py-2 border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-blue-950 font-mono text-xs outline-none"
            />
          </div>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="font-mono text-xs shrink-0 h-9"
            >
              XÓA LỌC
            </Button>
          )}
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 -webkit-overflow-scrolling-touch print:hidden">
          {(
            [
              { id: "ALL", label: "TẤT CẢ SỔ TAY" },
              { id: "GAS", label: "1. MÔI CHẤT & ÁP SUẤT GAS" },
              { id: "CALCULATORS", label: "2. BỘ 4 THƯỚC TÍNH HIỆN TRƯỜNG" },
              { id: "WIZARD", label: "3. CÂY BẮT BỆNH KHÔNG MÃ LỖI" },
              { id: "GLOSSARY", label: "4. TỪ ĐIỂN THUẬT NGỮ HVAC" },
              { id: "FORMULAS", label: "5. CÔNG THỨC TOÁN & LÝ" },
              { id: "SENSORS", label: "6. SENSOR KΩ @ 25°C" },
              { id: "PIPES", label: "7. ỐNG ĐỒNG & LỰC SIẾT" },
              { id: "ERRORS", label: "8. MÃ LỖI BIẾN TẦN" },
              { id: "VOM", label: "9. QUY TRÌNH ĐO VOM" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-2.5 py-1.5 font-mono text-[11px] font-bold border transition-none shrink-0 cursor-pointer whitespace-nowrap leading-tight",
                activeTab === tab.id
                  ? "bg-blue-950 text-white border-blue-950"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {copiedText && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-400 text-emerald-950 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Đã sao chép vào bộ nhớ tạm: {copiedText}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. CHEATSHEET MÔI CHẤT LẠNH & ÁP SUẤT */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "GAS") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #01
              </span>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                BẢNG THÔNG SỐ VẬN HÀNH & ÁP SUẤT CÁC LOẠI GAS LẠNH
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              R32 • R410A • R22 • R134a • R600a
            </span>
          </div>

          <div className="overflow-x-auto border border-neutral-300">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead className="bg-neutral-100 text-neutral-900 font-bold border-b border-neutral-300 font-mono">
                <tr>
                  <th className="p-2.5 border-r border-neutral-200 w-24">MÃ GAS</th>
                  <th className="p-2.5 border-r border-neutral-200">ÁP SUẤT HÚT (CHẠY LẠNH)</th>
                  <th className="p-2.5 border-r border-neutral-200">ÁP SUẤT NÉN (SƯỞI/ĐẨY)</th>
                  <th className="p-2.5 border-r border-neutral-200">ÁP TĨNH (TẮT MÁY 30°C)</th>
                  <th className="p-2.5 border-r border-neutral-200">CÁCH NẠP GAS</th>
                  <th className="p-2.5">DẦU LẠNH</th>
                </tr>
              </thead>
              <tbody>
                {filteredGas.map((gas) => (
                  <tr key={gas.code} className="border-b border-neutral-200 hover:bg-neutral-50 font-sans">
                    <td className="p-2.5 border-r border-neutral-200 font-mono">
                      <span className={cn("px-2 py-0.5 font-bold text-xs inline-block", gas.colorCode)}>
                        {gas.code}
                      </span>
                      <div className="text-[10px] text-neutral-500 mt-1">{gas.composition}</div>
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-blue-950 text-xs">
                      {gas.suctionPressure}
                      <div className="text-[10px] font-normal text-neutral-500">T_sôi: {gas.evapTemp}</div>
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-red-950 text-xs">
                      {gas.dischargePressure}
                      <div className="text-[10px] font-normal text-neutral-500">T_ngưng: {gas.condTemp}</div>
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-semibold text-neutral-900 text-xs">
                      {gas.staticPressure}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 text-neutral-800 leading-snug">
                      <strong className="text-neutral-950">{gas.chargingState}</strong>
                      <div className="text-[10px] text-neutral-500 font-mono">Bù: {gas.pipeExtraCharge}</div>
                    </td>
                    <td className="p-2.5 text-neutral-700 leading-snug font-mono text-[11px]">
                      {gas.oilType}
                      <div className="text-[10px] text-amber-700 font-bold mt-0.5">{gas.flammability}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-50 border-l-4 border-amber-600 border border-amber-200 text-xs space-y-1">
            <strong className="font-mono text-amber-950 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              QUY TẮC CỐT LÕI KHẮC CỐT GHI TÂM KHI NẠP GAS:
            </strong>
            <p className="text-neutral-900 leading-relaxed">
              • <strong>R410A:</strong> Bắt buộc phải <strong>ÚP NGƯỢC BÌNH NẠP LỎNG</strong> qua van tiết lưu đồng hồ manifold. Nạp hơi sẽ làm thay đổi tỷ lệ 50/50 của môi chất khiến máy mất lạnh hoàn toàn.<br />
              • <strong>R32:</strong> Tuy là môi chất A2L an toàn, áp suất làm việc rất cao (đến 450 PSI). Tuyệt đối không dùng bình nạp oxy hoặc mỏ hàn lửa khi hệ thống đang có áp suất.
            </p>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 2. BỘ 4 CÔNG CỤ TÍNH TOÁN HIỆN TRƯỜNG TƯƠNG TÁC                */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "CALCULATORS") && (
        <section className="space-y-6">
          <CadiviCableCalculator />
          <SuperheatCalculator />
          <CopperPipingCalculator />
          <CompressorMotorWiringCalculator />
        </section>
      )}

      {/* ============================================================== */}
      {/* 3. CÂY PHÁN ĐOÁN PAN BỆNH HIỆN TRƯỜNG KHI KHÔNG CÓ MÃ LỖI       */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "WIZARD") && (
        <section className="space-y-4">
          <DiagnosticWizard />
        </section>
      )}

      {/* ============================================================== */}
      {/* 4. TỪ ĐIỂN THUẬT NGỮ & KÝ HIỆU VIẾT TẮT HVAC SONG NGỮ         */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "GLOSSARY") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4 font-sans">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #04
              </span>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-950" />
                <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                  TỪ ĐIỂN THUẬT NGỮ & KÝ HIỆU VIẾT TẮT HVAC SONG NGỮ (A - Z)
                </h2>
              </div>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              CHUẨN SERVICE MANUAL CHÍNH HÃNG
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredGlossary.map((item, gIdx) => (
              <div
                key={gIdx}
                className="p-3.5 border border-neutral-300 bg-neutral-50/60 space-y-2 font-sans"
              >
                <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-1.5 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm sm:text-base text-blue-950 px-2 py-0.5 bg-blue-100 border border-blue-300">
                      {item.term}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    {item.fullNameVi}
                  </span>
                </div>

                <div className="text-xs font-mono text-neutral-500 italic">
                  Tên tiếng Anh: <strong>{item.fullNameEn}</strong>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  {item.definition}
                </p>

                <div className="p-2 bg-white border border-neutral-200 text-xs space-y-1">
                  <div className="text-neutral-900 leading-snug">
                    <strong>Ứng dụng thực chiến:</strong> {item.fieldApplication}
                  </div>
                  <div className="text-blue-950 font-mono text-[11px] pt-0.5 border-t border-neutral-100">
                    ➔ <strong>Quy tắc kỹ thuật:</strong> {item.technicalRule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 3. CHEATSHEET CÔNG THỨC TOÁN & LÝ KỸ THUẬT */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "FORMULAS") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #03
              </span>
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-950" />
                <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                  BẢNG CÔNG THỨC TOÁN - LÝ & TƯ DUY TÍNH TOÁN HIỆN TRƯỜNG
                </h2>
              </div>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              CHUẨN TCVN & IEC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredFormulas.map((f, idx) => (
              <div key={idx} className="p-3.5 border border-neutral-300 bg-neutral-50/50 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                  <span className="font-mono font-bold text-xs text-neutral-950 uppercase">
                    {f.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(f.formulaDisplay, f.title)}
                    className="text-[11px] font-mono text-blue-950 hover:underline flex items-center gap-1 cursor-pointer"
                    title="Sao chép công thức"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="p-2.5 bg-white border border-neutral-300 text-center font-mono">
                  <div className="text-xs sm:text-sm font-bold text-blue-950">
                    <MathFormula formula={f.formulaLatex} />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-mono font-bold text-[10px] text-neutral-500 uppercase">
                    Ý NGHĨA BIẾN SỐ:
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-neutral-700">
                    {f.variables.map((v, vIdx) => (
                      <div key={vIdx} className="bg-neutral-100 p-1 border border-neutral-200">
                        <strong>{v.symbol}:</strong> {v.meaning} ({v.unit})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-neutral-800 leading-relaxed font-sans bg-white p-2 border-l-2 border-neutral-400">
                  <strong>Ví dụ thực tế:</strong> {f.example}
                </div>

                <div className="text-[11px] text-blue-950 font-mono font-medium bg-blue-50/60 p-2 border border-blue-200">
                  ➔ <strong>Quy tắc thợ nghề:</strong> {f.practicalRule}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 4. CHEATSHEET SENSOR NHIỆT (KΩ Ở 25°C) */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "SENSORS") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #04
              </span>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                BẢNG TRA CỨU ĐIỆN TRỞ CẢM BIẾN SENSOR CÁC HÃNG (Ở 25°C)
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              DAIKIN • PANASONIC • TOSHIBA • MITSUBISHI • LG
            </span>
          </div>

          <div className="overflow-x-auto border border-neutral-300">
            <table className="w-full text-xs text-left border-collapse min-w-[720px]">
              <thead className="bg-neutral-100 text-neutral-900 font-bold border-b border-neutral-300 font-mono">
                <tr>
                  <th className="p-2.5 border-r border-neutral-200 w-36">HÃNG MÁY</th>
                  <th className="p-2.5 border-r border-neutral-200">SENSOR PHÒNG (GIÓ)</th>
                  <th className="p-2.5 border-r border-neutral-200">SENSOR DÀN LẠNH</th>
                  <th className="p-2.5 border-r border-neutral-200">SENSOR ĐẦU ĐẨY LỐC</th>
                  <th className="p-2.5 border-r border-neutral-200">SENSOR NGOÀI TRỜI</th>
                  <th className="p-2.5">MÃ LỖI ĐIỂN HÌNH</th>
                </tr>
              </thead>
              <tbody>
                {filteredSensors.map((s, idx) => (
                  <tr key={idx} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-blue-950">
                      {s.brand}
                      <span className="block text-[10px] font-normal text-neutral-500 font-sans">{s.type}</span>
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-emerald-800 text-xs">
                      {s.roomSensor25C}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-emerald-800 text-xs">
                      {s.coilSensor25C}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-red-700 text-xs">
                      {s.dischargeSensor25C}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono text-neutral-800 text-xs">
                      {s.outdoorCoilSensor25C}
                    </td>
                    <td className="p-2.5 text-neutral-700 text-[11px] leading-snug">
                      {s.faultSymptom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-neutral-100 border border-neutral-300 text-xs space-y-1 font-mono">
            <strong className="text-neutral-950 uppercase">MẸO KIỂM TRA SENSOR CÒN SỐNG HAY ĐÃ CHẾT NGOÀI HIỆN TRƯỜNG:</strong>
            <p className="text-neutral-700 leading-relaxed font-sans">
              1. Cắm que đo VOM thang 20kΩ vào 2 chân sensor. Giá trị ở nhiệt độ bình thường phải khớp bảng trên.<br />
              2. Lấy ngón tay bóp chặt đầu đồng cảm biến để truyền thân nhiệt (~37°C): <strong>Điện trở bắt buộc phải tụt dần dần</strong> (do là nhiệt điện trở âm NTC). Nếu số đứng im, nhảy loạn xạ về 0Ω hoặc vô cùng (OL) ➔ Sensor đã chết đứt hoặc thoái hóa.
            </p>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 5. CHEATSHEET TIÊU CHUẨN ỐNG ĐỒNG & LỰC SIẾT */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "PIPES") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #05
              </span>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                TIÊU CHUẨN ỐNG ĐỒNG, ĐỘ NHÔ KHI LOE & LỰC SIẾT CỜ LÊ LỰC
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              TIÊU CHUẨN DAIKIN / PANASONIC
            </span>
          </div>

          <div className="overflow-x-auto border border-neutral-300">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead className="bg-neutral-100 text-neutral-900 font-bold border-b border-neutral-300 font-mono">
                <tr>
                  <th className="p-2.5 border-r border-neutral-200">CỠ ỐNG (INCH)</th>
                  <th className="p-2.5 border-r border-neutral-200">ĐƯỜNG KÍNH (MM)</th>
                  <th className="p-2.5 border-r border-neutral-200">ĐỘ DÀY TỐI THIỂU</th>
                  <th className="p-2.5 border-r border-neutral-200">CỮ NHÔ KHI LOE</th>
                  <th className="p-2.5 border-r border-neutral-200">LỰC SIẾT CHUẨN (N·M)</th>
                  <th className="p-2.5">ỨNG DỤNG</th>
                </tr>
              </thead>
              <tbody>
                {filteredPipes.map((p, idx) => (
                  <tr key={idx} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-blue-950 text-sm">
                      {p.inchSize}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-neutral-900">
                      {p.mmSize}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono text-neutral-800">
                      {p.minWallThickness}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-emerald-800">
                      {p.flareOverhang}
                    </td>
                    <td className="p-2.5 border-r border-neutral-200 font-mono font-bold text-red-700 text-xs">
                      {p.torqueNm}
                      <span className="block text-[10px] font-normal text-neutral-500 font-sans">{p.wrenchSize}</span>
                    </td>
                    <td className="p-2.5 text-neutral-700 text-[11px] leading-snug">
                      {p.applications}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-100 border border-neutral-300 space-y-1">
              <strong className="font-mono text-neutral-950 uppercase block">TIÊU CHUẨN HÚT CHÂN KHÔNG:</strong>
              <p className="text-neutral-700 leading-relaxed font-sans">
                • Bắt buộc dùng bơm 2 cấp và đồng hồ điện tử Micron Gauge.<br />
                • Áp suất hút phải đạt <strong>dưới 500 Micron</strong> (&lt; 0.067 kPa).<br />
                • Khóa van manifold ngâm áp 15 phút: Áp suất không được tăng vượt quá 1000 Micron.
              </p>
            </div>
            <div className="p-3 bg-neutral-100 border border-neutral-300 space-y-1">
              <strong className="font-mono text-neutral-950 uppercase block">TIÊU CHUẨN THỬ KÍN NITƠ (N₂):</strong>
              <p className="text-neutral-700 leading-relaxed font-sans">
                • Dùng khí Nitơ khô tinh khiết (tuyệt đối cấm dùng Oxy gây nổ dầu).<br />
                • Nén phân cấp: Bước 1 (0.5 MPa / 75 PSI) ➔ Bước 2 (1.5 MPa / 220 PSI) ➔ Bước 3 nén giữ áp ở <strong>4.0 MPa (580 PSI)</strong> trong 24 giờ.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 6. CHEATSHEET MÃ LỖI BIẾN TẦN */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "ERRORS") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #06
              </span>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                BẢNG TRA CỨU CÁC MÃ LỖI BIẾN TẦN CỐT LÕI & CÁCH SỬA
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              DAIKIN • PANASONIC
            </span>
          </div>

          <div className="space-y-3">
            {filteredErrors.map((err, idx) => (
              <div key={idx} className="p-3.5 border border-neutral-300 bg-white space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2 py-0.5 bg-blue-950 text-white">
                      {err.brand}
                    </span>
                    <span className="font-mono font-black text-sm text-red-700 bg-red-50 px-2 py-0.5 border border-red-300">
                      MÃ LỖI: {err.code}
                    </span>
                    <span className="text-xs font-bold text-neutral-950 uppercase">
                      {err.title}
                    </span>
                  </div>
                  <Badge variant={err.severity === "CRITICAL" ? "danger" : "warning"} size="sm">
                    {err.severity === "CRITICAL" ? "NGUY HIỂM / KHẨN CẤP" : "CẢNH BÁO"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2 bg-neutral-50 border border-neutral-200 space-y-1">
                    <span className="font-mono font-bold text-[10px] text-neutral-500 uppercase block">
                      NGUYÊN NHÂN GỐC RỄ:
                    </span>
                    <p className="text-neutral-800 leading-relaxed font-sans">{err.rootCause}</p>
                  </div>

                  <div className="p-2 bg-blue-50/50 border border-blue-200 space-y-1">
                    <span className="font-mono font-bold text-[10px] text-blue-950 uppercase block">
                      BƯỚC ĐO KIỂM VOM XÁC ĐỊNH:
                    </span>
                    <p className="text-blue-950 leading-relaxed font-sans">{err.testStep}</p>
                  </div>

                  <div className="p-2 bg-emerald-50/50 border border-emerald-200 space-y-1">
                    <span className="font-mono font-bold text-[10px] text-emerald-900 uppercase block">
                      HÀNH ĐỘNG KHẮC PHỤC TRIỆT ĐỂ:
                    </span>
                    <p className="text-emerald-950 leading-relaxed font-sans">{err.fixAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 7. CHEATSHEET QUY TRÌNH ĐO KIỂM VOM */}
      {/* ============================================================== */}
      {(activeTab === "ALL" || activeTab === "VOM") && (
        <section className="p-4 sm:p-5 bg-white border border-neutral-300 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-blue-950 text-white px-2 py-0.5">
                #07
              </span>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 uppercase">
                QUY TRÌNH ĐO KIỂM LINH KIỆN ĐIỆN TỬ BẰNG ĐỒNG HỒ VOM
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              LỐC NÉN • IPM • OPTO • TỤ NGẬM • CHẠM MASS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredVom.map((v, idx) => (
              <div key={idx} className="p-3.5 border border-neutral-300 bg-white space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                  <span className="font-mono font-bold text-xs text-blue-950 uppercase">
                    {v.title}
                  </span>
                  <span className="font-mono text-[10px] bg-neutral-200 text-neutral-800 px-1.5 py-0.2">
                    {v.vomRange}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] text-neutral-700">
                    <strong>Vị trí đặt que đo:</strong> {v.probePlacement}
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
                    <strong>Trị số chuẩn (SỐNG):</strong> {v.normalValue}
                  </div>
                  <div className="p-2 bg-red-50 border border-red-200 text-red-950 text-[11px] leading-relaxed">
                    <strong>Trị số hỏng (CHẾT):</strong> {v.faultValue}
                  </div>
                </div>

                {v.safetyWarning && (
                  <div className="p-2 bg-amber-50 border border-amber-300 text-amber-950 text-[10px] font-bold">
                    ⚠ {v.safetyWarning}
                  </div>
                )}

                <div className="p-2 bg-neutral-100 border border-neutral-300 text-neutral-900 font-mono text-[11px]">
                  <strong>➔ {v.goldenRule}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Exam CTA */}
      {onOpenExam && (
        <div className="pt-4 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-3 bg-neutral-50 p-4">
          <div>
            <span className="font-mono text-xs font-bold text-neutral-900 uppercase block">
              ĐÃ NẮM VỮNG THÔNG SỐ VÀ CÔNG THỨC?
            </span>
            <p className="text-xs text-neutral-600">
              Thử sức ngay với phòng thi hết môn (Trắc nghiệm thực tế, Tự luận toán kỹ thuật và Phân tích sơ đồ mạch).
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenExam}
            className="font-mono text-xs font-bold"
          >
            VÀO THI HẾT MÔN NGAY ➔
          </Button>
        </div>
      )}
    </div>
  );
};
