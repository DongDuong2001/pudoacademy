"use client";

import React from "react";
import { TableOfContentsItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onSelect,
}) => {
  return (
    <div className="my-6 p-4 bg-neutral-50 border border-neutral-300">
      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 mb-2 border-b border-neutral-300 pb-1">
        MỤC LỤC BÀI VIẾT KỸ THUẬT
      </div>
      <ul className="space-y-1 text-xs">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.level === 3 ? "pl-4" : "pl-0"
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "hover:underline text-left",
                activeId === item.id
                  ? "text-blue-950 font-bold"
                  : "text-neutral-700"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
