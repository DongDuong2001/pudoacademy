import React from "react";
import { ErrorCodeItem } from "@/types/diagnostic";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { cn } from "@/lib/utils";

interface ErrorCodeCardProps {
  errorItem: ErrorCodeItem;
  className?: string;
}

export const ErrorCodeCard: React.FC<ErrorCodeCardProps> = ({ errorItem, className }) => {
  const badgeVariants = {
    INFO: "info",
    WARNING: "warning",
    DANGER: "danger",
  } as const;

  return (
    <div
      className={cn(
        "my-4 border border-neutral-300 bg-white p-4 space-y-4",
        className
      )}
    >
      {/* Title & Brand */}
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl font-black bg-neutral-900 text-white px-2.5 py-1">
            {errorItem.code}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs uppercase text-blue-900">
                {errorItem.brand}
              </span>
              <Badge variant={badgeVariants[errorItem.safetyLevel]} size="sm">
                MỨC ĐỘ: {errorItem.safetyLevel}
              </Badge>
            </div>
            <h4 className="text-sm font-bold text-neutral-950 uppercase tracking-wide">
              {errorItem.title}
            </h4>
          </div>
        </div>
      </div>

      {/* Symptom */}
      <div className="p-2.5 bg-neutral-100 border-l-2 border-blue-900 text-xs">
        <span className="font-bold uppercase text-neutral-600 block text-[10px]">
          HIỆN TƯỢNG BAN BỆNH THỰC TẾ:
        </span>
        <span className="text-neutral-900 font-medium">
          {errorItem.symptom}
        </span>
      </div>

      {/* Root Causes */}
      <div className="space-y-1 text-xs">
        <span className="font-mono font-bold text-[11px] text-neutral-600 uppercase tracking-wider block">
          CÁC NGUYÊN NHÂN KHẢ DĨ:
        </span>
        <ul className="space-y-1 pl-2">
          {errorItem.rootCauses.map((cause, i) => (
            <li key={i} className="flex items-start gap-2 text-neutral-800">
              <span className="font-mono text-neutral-400 select-none">-</span>
              <span>{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Measurement Steps Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-[11px] text-neutral-600 uppercase tracking-wider">
            QUY TRÌNH ĐO KIỂM & XỬ LÝ:
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">
            DÙNG ĐỒNG HỒ ĐO CHUYÊN DỤNG
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">BƯỚC</TableHead>
              <TableHead className="w-1/2">THAO TÁC ĐO KIỂM</TableHead>
              <TableHead className="w-1/3">KẾT QUẢ TIÊU CHUẨN</TableHead>
              <TableHead className="w-24 text-center">THANG ĐO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errorItem.steps.map((step) => (
              <TableRow key={step.stepNumber}>
                <TableCell className="font-mono font-bold text-center">
                  #{step.stepNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {step.action}
                </TableCell>
                <TableCell className="text-blue-950 font-mono">
                  {step.expectedResult}
                </TableCell>
                <TableCell className="text-center font-mono text-[10px]">
                  <span className="px-1.5 py-0.5 bg-neutral-200 font-bold">
                    {step.measuredTool}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
