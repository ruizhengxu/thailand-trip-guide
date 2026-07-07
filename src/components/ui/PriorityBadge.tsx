import React from "react";
import type { Priority, FoodPriority } from "../../types";
import { getPriorityInfo } from "../../utils/priorities";

interface PriorityBadgeProps {
  priority: Priority | FoodPriority | string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  solid?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showDot = true,
  size = "md",
  className = "",
  solid = false,
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

  const solidClasses: Record<string, string> = {
    core: "bg-emerald-600 text-white border-transparent shadow-sm",
    optional: "bg-amber-500 text-white border-transparent shadow-sm",
    transport: "bg-sky-600 text-white border-transparent shadow-sm",
    remote: "bg-purple-600 text-white border-transparent shadow-sm",
    caution: "bg-rose-600 text-white border-transparent shadow-sm",
    "must-try": "bg-rose-600 text-white font-bold border-transparent shadow-sm",
    recommended: "bg-amber-600 text-white font-bold border-transparent shadow-sm",
    situational: "bg-teal text-white font-medium border-transparent shadow-sm",
  };

  const badgeStyle = solid
    ? solidClasses[priority as string] || "bg-teal text-white border-transparent shadow-sm"
    : `${info.bgClass} ${info.textClass} ${info.borderClass}`;

  return (
    <span
      className={`inline-flex items-center rounded-full border ${badgeStyle} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span
          className={`rounded-full ${solid ? "bg-white" : info.dotClass} ${dotSizes[size]} animate-pulse-subtle`}
        />
      )}
      <span>{info.labelZh}</span>
    </span>
  );
};
