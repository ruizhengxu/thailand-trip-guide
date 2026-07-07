import React from "react";
import type { Region } from "../../types";
import { MapPin } from "lucide-react";

interface RegionTabsProps {
  selected: Region | "all";
  onChange: (region: Region | "all") => void;
  showAllOption?: boolean;
  counts?: Record<string, number>;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const RegionTabs: React.FC<RegionTabsProps> = ({
  selected,
  onChange,
  showAllOption = true,
  counts,
  className = "",
  size = "md",
}) => {
  const tabs = [
    ...(showAllOption ? [{ id: "all" as const, label: "全部区域", short: "全部" }] : []),
    { id: "bangkok" as const, label: "曼谷 Bangkok", short: "曼谷" },
    { id: "phuket" as const, label: "普吉岛 Phuket", short: "普吉" },
    { id: "koh-yao-yai" as const, label: "瑶亚岛 Santhiya", short: "瑶亚岛" },
  ];

  const paddingClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <div
      className={`flex bg-sand/40 p-1 rounded-2xl border border-line/50 overflow-x-auto scrollbar-none ${className}`}
    >
      {tabs.map((tab) => {
        const active = selected === tab.id;
        const count = counts ? counts[tab.id] : undefined;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 min-w-max rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              paddingClasses[size]
            } ${
              active
                ? "bg-card text-text shadow-sm border border-white/60 font-semibold"
                : "text-muted hover:text-text hover:bg-white/20"
            }`}
          >
            {active && <MapPin className="w-3.5 h-3.5 text-teal animate-bounce" style={{ animationDuration: '2s' }} />}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.short}</span>
            {count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] leading-tight ${
                  active
                    ? "bg-teal/15 text-teal font-semibold"
                    : "bg-sand/60 text-muted"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
