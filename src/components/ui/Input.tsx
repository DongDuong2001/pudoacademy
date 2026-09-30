import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, helperText, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-neutral-800 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full h-9 px-3 text-sm rounded-none border bg-white text-neutral-950 placeholder:text-neutral-400",
            "border-neutral-400 focus:border-blue-900 focus:outline-none focus:ring-0",
            "disabled:bg-neutral-100 disabled:cursor-not-allowed",
            error && "border-red-600 focus:border-red-600",
            className
          )}
          {...props}
        />
        {error && <span className="text-[11px] font-medium text-red-600">{error}</span>}
        {!error && helperText && (
          <span className="text-[11px] text-neutral-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
