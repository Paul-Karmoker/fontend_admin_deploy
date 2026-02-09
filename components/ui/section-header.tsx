"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeader - Enterprise section title component
 * Provides consistent styling for section headers with optional actions
 */
export interface SectionHeaderProps {
  /** Main title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action buttons or content */
  actions?: React.ReactNode;
  /** Title size variant */
  size?: "sm" | "md" | "lg";
  /** Whether to show a divider line */
  showDivider?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  size = "lg",
  showDivider = false,
  className,
}: SectionHeaderProps) {
  const titleSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", className)}>
      <div className={cn("flex flex-col", showDivider && "pb-4 border-b border-border")}>
        <h2 className={cn("font-bold tracking-tight text-foreground", titleSizes[size])}>
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
