import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium select-none text-xs uppercase tracking-wider transition-none disabled:opacity-50 disabled:cursor-not-allowed rounded-none border text-center break-words max-w-full";

  const variants = {
    primary:
      "bg-blue-950 text-white border-blue-950 hover:bg-blue-900 active:bg-blue-950",
    secondary:
      "bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200 active:bg-neutral-300",
    outline:
      "bg-transparent text-neutral-900 border-neutral-400 hover:bg-neutral-100 active:bg-neutral-200",
    danger:
      "bg-red-800 text-white border-red-800 hover:bg-red-700 active:bg-red-900",
  };

  const sizes = {
    sm: "min-h-[30px] h-auto py-1 px-2.5 text-[11px] leading-tight",
    md: "min-h-[36px] h-auto py-1.5 px-3.5 text-xs leading-normal",
    lg: "min-h-[44px] h-auto py-2 px-4 sm:px-5 text-xs sm:text-sm leading-normal",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
