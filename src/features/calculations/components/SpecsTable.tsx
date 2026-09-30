import React from "react";
import { EquipmentSpecs } from "@/types/specs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SpecsTableProps {
  equipment: EquipmentSpecs;
  className?: string;
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ equipment, className }) => {
  return (
    <div className={cn("my-6 space-y-3", className)}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-neutral-100 border border-neutral-300">
        <div>
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-neutral-900 mr-2">
            THÔNG SỐ KỸ THUẬT: {equipment.brand} {equipment.modelNumber}
          </span>
          <span className="text-xs text-neutral-600">
            ({equipment.type})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="info" size="sm">
            GAS: {equipment.refrigerant}
          </Badge>
          <Badge variant="neutral" size="sm">
            TIÊU CHUẨN IEC
          </Badge>
        </div>
      </div>

      {/* Tables by group */}
      <div className="space-y-4">
        {equipment.groups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-[11px] font-mono font-bold text-neutral-700 uppercase px-1">
              ▶ {group.groupName}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5">HẠNG MỤC THÔNG SỐ</TableHead>
                  <TableHead className="w-1/4">GIÁ TRỊ TIÊU CHUẨN</TableHead>
                  <TableHead className="w-1/6">DUNG SAI</TableHead>
                  <TableHead className="w-1/6">ĐƠN VỊ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.specs.map((spec, sIdx) => (
                  <TableRow key={sIdx}>
                    <TableCell className="font-medium text-neutral-950">
                      {spec.parameter}
                      {spec.notes && (
                        <span className="block text-[10px] text-neutral-500 font-normal">
                          {spec.notes}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono font-bold text-blue-950">
                      {spec.nominalValue}
                    </TableCell>
                    <TableCell className="font-mono text-neutral-600">
                      {spec.tolerance || "—"}
                    </TableCell>
                    <TableCell className="font-mono font-semibold text-neutral-800">
                      {spec.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};
