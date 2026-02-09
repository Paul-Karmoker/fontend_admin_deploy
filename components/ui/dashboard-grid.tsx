"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * DashboardGrid - Responsive grid layout for dashboard components
 * Provides consistent spacing and responsive breakpoints
 */
export interface DashboardGridProps {
  /** Grid content */
  children: React.ReactNode;
  /** Grid columns configuration */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Gap size */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Additional CSS classes */
  className?: string;
}

export function DashboardGrid({
  children,
  columns = 4,
  gap = "lg",
  className,
}: DashboardGridProps) {
  const gapSizes = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-6",
    xl: "gap-8",
  };

  const columnConfig = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
    7: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7",
  };

  return (
    <div
      className={cn(
        "grid",
        columnConfig[columns],
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

export default DashboardGrid;
