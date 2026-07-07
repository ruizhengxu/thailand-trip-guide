import React from "react";
import type { TimelineStage } from "../../types";
import { Calendar, ChevronRight, MapPin } from "lucide-react";

interface TimelineCardProps {
  stages: readonly TimelineStage[];
  onSelectRegion?: (region: string) => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  stages,
  onSelectRegion,
}) => {
  const stageRegions = ["bangkok", "phuket", "koh-yao-yai", "phuket"];

  const stageColors = [
    { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-700 dark:text-emerald-300", badge: "bg-emerald-500 text-white" },
    { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-700 dark:text-amber-300", badge: "bg-amber-500 text-white" },
    { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-700 dark:text-purple-300", badge: "bg-purple-500 text-white" },
    { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-700 dark:text-sky-300", badge: "bg-sky-500 text-white" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2 font-sans">
            <Calendar className="w-5 h-5 text-teal" />
            <span>行程阶段总览 · Trip Timeline</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            14 天完美节奏：老城风光、绝美日落、七夕庆贺与轻松离境
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, idx) => {
          const color = stageColors[idx % stageColors.length];
          const regionKey = stageRegions[idx];
          return (
            <div
              key={stage.date}
              onClick={() => onSelectRegion && onSelectRegion(regionKey)}
              className={`glass-card p-5 rounded-2xl border ${color.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-sand/30 opacity-50 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${color.badge}`}
                  >
                    Stage {idx + 1}
                  </span>
                  <span className="text-xs font-mono font-semibold text-muted bg-sand/50 px-2 py-0.5 rounded-md">
                    {stage.date}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-text mb-2 flex items-center justify-between group-hover:text-teal transition-colors">
                  <span>{stage.title}</span>
                  <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                </h3>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between text-[11px] font-medium text-teal">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>查看区域地图</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  进入 →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
