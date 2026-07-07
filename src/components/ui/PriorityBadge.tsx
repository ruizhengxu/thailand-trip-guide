import React from "react";
import type { Priority, FoodPriority } from "../../types";
import { getPriorityInfo } from "../../utils/priorities";

interface PriorityBadgeProps {
  priority: Priority | FoodPriority | string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showDot = true,
  size = "md",
  className = "",
}) => {
  const info = getPriorityInfo(priority);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5 font-medium",
    lg: "px-3 py-1.5 text-sm gap-2 font-medium",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${info.bgClass} ${info.textClass} ${info.borderClass} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span
          className={`rounded-full ${info.dotClass} ${dotSizes[size]} animate-pulse-subtle`}
        />
      )}
      <span>{info.labelZh}</span>
    </span>
  );
};
