"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * ChartCard - Enterprise chart container component
 * Wraps charts with consistent styling and header/footer sections
 * 
 * Features:
 * - Consistent header with title and optional actions
 * - Loading, empty, and error state support
 * - Responsive design
 * - Card elevation and hover effects
 */
export interface ChartCardProps {
  /** Title of the chart */
  title: string;
  /** Optional description */
  description?: string;
  /** Chart content (ResponsiveContainer from Recharts) */
  children?: React.ReactNode;
  /** Optional action buttons to display in header */
  actions?: React.ReactNode;
  /** Height of the chart container */
  height?: number | string;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  isEmpty?: boolean;
  /** Empty state content override */
  emptyMessage?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Callback when retry is clicked */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  footer?: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  children,
  actions,
  height = 300,
  isLoading = false,
  isEmpty = false,
  emptyMessage = "No data available",
  error = false,
  errorMessage = "Failed to load chart data",
  onRetry,
  className,
  footer,
}: ChartCardProps) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div
            className="flex items-center justify-center bg-muted/30 rounded-lg animate-pulse-soft"
            style={{ height }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading chart...</span>
            </div>
          </div>
        ) : error ? (
          <div
            className="flex flex-col items-center justify-center bg-muted/30 rounded-lg"
            style={{ height }}
          >
            <div className="text-center max-w-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
                <svg
                  className="w-6 h-6 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground mb-2">{errorMessage}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        ) : isEmpty ? (
          <div
            className="flex flex-col items-center justify-center bg-muted/30 rounded-lg"
            style={{ height }}
          >
            <div className="text-center max-w-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check back later for data
              </p>
            </div>
          </div>
        ) : children ? (
          <div style={{ height }} className="w-full">
            {children}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-border bg-muted/20">
          {footer}
        </div>
      )}
    </div>
  );
}

export default ChartCard;
