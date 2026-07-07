import React from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  withLabel?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
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
        isFavorite
          ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/50 shadow-sm"
          : "bg-card hover:bg-sand/40 text-muted hover:text-text border border-line/60"
      } ${className}`}
      aria-label={isFavorite ? "取消收藏" : "加入收藏"}
      title={isFavorite ? "取消收藏" : "加入收藏"}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-200 ${
          isFavorite ? "fill-rose-500 scale-110" : ""
        }`}
      />
      {withLabel && (
        <span className="font-medium text-xs">
          {isFavorite ? "已收藏" : "收藏"}
        </span>
      )}
    </button>
  );
};
