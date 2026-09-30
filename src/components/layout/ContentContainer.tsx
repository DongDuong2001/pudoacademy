import React from "react";
import { cn } from "@/lib/utils";

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isWide?: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  isWide = false,
  ...props
}) => {
  return (
    <article
      className={cn(
        "w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 text-neutral-900 min-w-0 max-w-full",
        isWide ? "max-w-6xl" : "max-w-[840px]",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};
