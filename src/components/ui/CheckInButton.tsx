import React from "react";
import { CheckCircle2 } from "lucide-react";

interface CheckInButtonProps {
  isVisited: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  withLabel?: boolean;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({
  isVisited,
  onToggle,
  size = "md",
  className = "",
  withLabel = false,
}) => {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4.5 h-4.5",
    lg: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(e);
      }}
      className={`rounded-full flex items-center justify-center transition-all duration-200 ${
        withLabel ? "px-3 py-1.5 w-auto gap-1.5" : sizeClasses[size]
      } ${
        isVisited
          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 shadow-sm border border-emerald-500/30"
          : "bg-card hover:bg-sand/40 text-muted hover:text-text border border-line/60"
      } ${className}`}
      aria-label={isVisited ? "取消打卡" : "打卡标记"}
      title={isVisited ? "取消打卡" : "打卡标记"}
    >
      <CheckCircle2
        className={`${iconSizes[size]} transition-transform duration-200 ${
          isVisited ? "fill-emerald-500 text-white scale-110" : ""
        }`}
      />
      {withLabel && (
        <span className="font-medium text-xs">
          {isVisited ? "已打卡" : "去打卡"}
        </span>
      )}
    </button>
  );
};
