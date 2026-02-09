"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * ErrorState - Enterprise error state component
 * Displays error messages with optional retry action
 */
export interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error description */
  description?: string;
  /** Callback when retry is clicked */
  onRetry?: () => void;
  /** Error code to display */
  errorCode?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  errorCode,
  size = "md",
  className,
}: ErrorStateProps) {
  const sizes = {
    sm: { container: "py-8", icon: "h-8 w-8", title: "text-base", description: "text-sm" },
    md: { container: "py-12", icon: "h-10 w-10", title: "text-lg", description: "text-sm" },
    lg: { container: "py-16", icon: "h-12 w-12", title: "text-xl", description: "text-base" },
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizes[size].container,
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-destructive/10 mb-4",
          sizes[size].icon
        )}
      >
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
      <h3 className={cn("font-semibold text-foreground", sizes[size].title)}>
        {title}
      </h3>
      <p className={cn("text-muted-foreground mt-2 max-w-sm", sizes[size].description)}>
        {description}
      </p>
      {errorCode && (
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Code: {errorCode}
        </p>
      )}
      {onRetry && (
        <div className="mt-6">
          <Button variant="outline" onClick={onRetry}>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
