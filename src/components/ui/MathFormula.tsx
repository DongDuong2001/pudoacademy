"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

interface MathFormulaProps {
  formula?: string;
  children?: React.ReactNode;
  displayMode?: "inline" | "block";
  className?: string;
}

/**
 * Standard MathFormula component powered by KaTeX
 * Converts LaTeX formulas to crisp, typography-accurate mathematical expressions
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  children,
  displayMode = "inline",
  className,
}) => {
  const formulaString = useMemo(() => {
    if (formula) return formula;
    if (typeof children === "string") return children;
    return "";
  }, [formula, children]);

  const renderedHtml = useMemo(() => {
    if (!formulaString) return null;
    // Strip surrounding $ or $$ if present
    const clean = formulaString
      .replace(/^(\${1,2})|(\${1,2})$/g, "")
      .trim();

    try {
      return katex.renderToString(clean, {
        displayMode: displayMode === "block",
        throwOnError: false,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [formulaString, displayMode]);

  if (renderedHtml) {
    if (displayMode === "block") {
      return (
        <div
          className={cn(
            "p-3 bg-neutral-50 border border-neutral-300 text-neutral-950 text-center font-mono my-2 overflow-x-auto select-text",
            className
          )}
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      );
    }
    return (
      <span
        className={cn(
          "inline-flex items-center px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-xs text-neutral-900 font-mono text-[0.9em] select-text",
          className
        )}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  // Fallback to plain text if rendering failed
  return (
    <span className={cn("font-mono font-semibold", className)}>
      {children || formula}
    </span>
  );
};

/**
 * MathText helper component:
 * Parses standard text containing inline math `$ ... $` or block math `$$ ... $$`
 * and renders LaTeX formulas seamlessly with KaTeX while preserving regular text.
 */
export const MathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const parts = useMemo(() => {
    if (!text) return [];
    // Split by $$...$$ or $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g;
    const tokens: Array<{ isMath: boolean; content: string; isBlock: boolean }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          isMath: false,
          content: text.slice(lastIndex, match.index),
          isBlock: false,
        });
      }
      const raw = match[0];
      const isBlock = raw.startsWith("$$");
      const clean = isBlock
        ? raw.slice(2, -2).trim()
        : raw.slice(1, -1).trim();
      tokens.push({
        isMath: true,
        content: clean,
        isBlock,
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push({
        isMath: false,
        content: text.slice(lastIndex),
        isBlock: false,
      });
    }

    return tokens;
  }, [text]);

  if (parts.length === 0) return null;

  return (
    <span className={className}>
      {parts.map((p, idx) => {
        if (!p.isMath) {
          return <React.Fragment key={idx}>{p.content}</React.Fragment>;
        }
        return (
          <MathFormula
            key={idx}
            formula={p.content}
            displayMode={p.isBlock ? "block" : "inline"}
          />
        );
      })}
    </span>
  );
};
