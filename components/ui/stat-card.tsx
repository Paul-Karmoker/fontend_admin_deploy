"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * StatCard - Enterprise statistic display component
 * Displays a key metric with optional trend indicator
 * 
 * Features:
 * - Clean typography hierarchy
 * - Trend indicator (up/down/neutral)
 * - Icon support
 * - Smooth hover effects
 * - Loading state support
 */
export interface StatCardProps {
  /** Main title of the stat */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Optional description or subtitle */
  description?: string;
  /** Icon component to display */
  icon?: React.ReactNode;
  /** CSS class for icon tint */
  iconColor?: string;
  /** Trend information */
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  /** Optional prefix for value (e.g., $, %, etc.) */
  valuePrefix?: string;
  /** Optional suffix for value */
  valueSuffix?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  iconColor = "text-primary",
  trend,
  valuePrefix,
  valueSuffix,
  isLoading = false,
  className,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className={cn("card p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-muted rounded animate-pulse-soft" />
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse-soft" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-32 bg-muted rounded animate-pulse-soft" />
          <div className="h-3 w-40 bg-muted rounded animate-pulse-soft" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "card p-6 transition-all duration-200",
        "hover:shadow-md hover:border-primary/20",
        "group",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center h-9 w-9 rounded-lg",
              "bg-muted/50 text-muted-foreground",
              "group-hover:bg-primary/10 group-hover:text-primary",
              "transition-colors duration-200"
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        {valuePrefix && (
          <span className="text-lg font-medium text-muted-foreground">
            {valuePrefix}
          </span>
        )}
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {valueSuffix && (
          <span className="text-lg font-medium text-muted-foreground">
            {valueSuffix}
          </span>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-3 flex items-center gap-2">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center text-sm font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              {trend.value}
            </span>
          )}
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;
