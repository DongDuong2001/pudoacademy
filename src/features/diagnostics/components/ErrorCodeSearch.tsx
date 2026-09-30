"use client";

import React, { useState, useMemo } from "react";
import { ERROR_CODES_DATA } from "../data/errorCodesData";
import { ErrorCodeCard } from "./ErrorCodeCard";
import { Input } from "@/components/ui/Input";
import { Search, Filter } from "reicon-react";
import { cn } from "@/lib/utils";

interface ErrorCodeSearchProps {
  initialQuery?: string;
}

const BRANDS = ["TẤT CẢ", "DAIKIN", "PANASONIC", "TOSHIBA", "MITSUBISHI", "LG", "CASPER"] as const;

export const ErrorCodeSearch: React.FC<ErrorCodeSearchProps> = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>("TẤT CẢ");

  const filteredErrors = useMemo(() => {
    return ERROR_CODES_DATA.filter((item) => {
      const matchBrand =
        selectedBrand === "TẤT CẢ" || item.brand === selectedBrand;
      const q = query.trim().toLowerCase();
      if (!q) return matchBrand;

      const matchText =
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.symptom.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q);

      return matchBrand && matchText;
    });
  }, [query, selectedBrand]);

  return (
    <div className="space-y-4 my-6">
      {/* Search Header and Inputs */}
      <div className="p-3 bg-neutral-100 border border-neutral-300 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-600" />
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-neutral-900">
              TRA CỨU NHANH MÃ LỖI BIẾN TẦN
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            {filteredErrors.length} KẾT QUẢ TÌM THẤY
          </span>
        </div>

        {/* Brand selection tabs */}
        <div className="flex flex-wrap gap-1 border-t border-neutral-300 pt-2">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono font-bold transition-none border",
                selectedBrand === brand
                  ? "bg-blue-950 text-white border-blue-950"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-200"
              )}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Input query */}
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gõ mã lỗi (vd: U4, L5, H11) hoặc triệu chứng (lốc ngắt, mất xung)..."
            className="h-9 pl-9 pr-3 text-xs font-mono"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredErrors.length > 0 ? (
          filteredErrors.map((err) => (
            <ErrorCodeCard key={`${err.brand}-${err.code}`} errorItem={err} />
          ))
        ) : (
          <div className="p-6 text-center border border-dashed border-neutral-300 text-neutral-500 font-mono text-xs">
            Không tìm thấy mã lỗi khớp với từ khóa &quot;{query}&quot;. Vui lòng kiểm tra lại ký tự hoặc chọn hãng &quot;TẤT CẢ&quot;.
          </div>
        )}
      </div>
    </div>
  );
};
