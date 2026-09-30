import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "info" | "warning" | "danger" | "success";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "neutral",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center font-mono font-bold uppercase tracking-wider border rounded-none select-none";

  const variants = {
    neutral:
      "bg-neutral-100 text-neutral-800 border-neutral-300",
    info:
      "bg-blue-50 text-blue-950 border-blue-800",
    warning:
      "bg-amber-50 text-amber-950 border-amber-600",
    danger:
      "bg-red-50 text-red-950 border-red-700",
    success:
      "bg-emerald-50 text-emerald-950 border-emerald-700",
  };

  const sizes = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-0.5 text-xs",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
