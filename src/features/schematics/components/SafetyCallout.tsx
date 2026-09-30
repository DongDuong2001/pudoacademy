import React from "react";
import { AlertTriangle, AlertSquare, InfoCircle } from "reicon-react";
import { cn } from "@/lib/utils";

interface SafetyCalloutProps {
  type?: "DANGER" | "WARNING" | "INFO";
  title: string;
  children: React.ReactNode;
  ruleCode?: string;
}

export const SafetyCallout: React.FC<SafetyCalloutProps> = ({
  type = "WARNING",
  title,
  children,
  ruleCode,
}) => {
  const styles = {
    DANGER: {
      container:
        "border-l-4 border-l-red-700 border-t border-r border-b border-red-300 bg-red-50 text-red-950",
      icon: <AlertSquare className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />,
      badge: "bg-red-700 text-white",
    },
    WARNING: {
      container:
        "border-l-4 border-l-amber-600 border-t border-r border-b border-amber-300 bg-amber-50 text-amber-950",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      badge: "bg-amber-600 text-white",
    },
    INFO: {
      container:
        "border-l-4 border-l-blue-900 border-t border-r border-b border-blue-300 bg-blue-50 text-blue-950",
      icon: <InfoCircle className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />,
      badge: "bg-blue-900 text-white",
    },
  };

  const current = styles[type];

  return (
    <aside className={cn("p-4 my-5 rounded-none font-sans", current.container)}>
      <div className="flex items-start gap-3">
        {current.icon}
        <div className="space-y-1.5 flex-1 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono font-bold text-sm tracking-wide uppercase">
              {title}
            </span>
            {ruleCode && (
              <span
                className={cn(
                  "font-mono text-[10px] px-1.5 py-0.2 tracking-wider font-semibold uppercase",
                  current.badge
                )}
              >
                {ruleCode}
              </span>
            )}
          </div>
          <div className="leading-relaxed text-neutral-800">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};
