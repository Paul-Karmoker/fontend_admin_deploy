"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * EmptyState - Enterprise empty state component
 * Displays when no data is available with optional action
 */
export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Main title */
  title: string;
  /** Optional description */
  description?: string;
  /** Action button */
  action?: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const sizes = {
    sm: { container: "py-8", icon: "h-8 w-8", title: "text-base", description: "text-sm" },
    md: { container: "py-12", icon: "h-12 w-12", title: "text-lg", description: "text-sm" },
    lg: { container: "py-16", icon: "h-16 w-16", title: "text-xl", description: "text-base" },
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizes[size].container,
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted mb-4",
            sizes[size].icon
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn("font-semibold text-foreground", sizes[size].title)}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-muted-foreground mt-2 max-w-sm", sizes[size].description)}>
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
