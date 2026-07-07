import React, { useState } from "react";
import type { Place, RouteModule } from "../../types";
import { PriorityBadge } from "../ui/PriorityBadge";
import { ExternalMapButton } from "../ui/ExternalMapButton";
import { FavoriteButton } from "../ui/FavoriteButton";
import { CheckInButton } from "../ui/CheckInButton";
import { getPlaceImage, getAssetUrl } from "../../utils/images";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  MapPin,
  Sparkles,
  Sun,
  Umbrella,
} from "lucide-react";

interface RouteCardProps {
  route: RouteModule;
  places: readonly Place[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  visited?: string[];
  onToggleVisited?: (id: string, e?: React.MouseEvent) => void;
  onViewOnMap: (routeId: string) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  places,
  favorites,
  onToggleFavorite,
  visited = [],
  onToggleVisited,
  onViewOnMap,
}) => {
  const [expanded, setExpanded] = useState(false);

  const routePlaces = route.placeIds
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => !!p);

  const heroImage = routePlaces[0]
    ? getPlaceImage(routePlaces[0], true)
    : getAssetUrl("/images/bangkok/wat_arun_zhengwang_temple.jpg");


  const intensityColors = {
    easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    high: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  };

  const intensityLabels = {
    easy: "轻松休闲 · 步调缓慢",
    medium: "经典节奏 · 适度步行",
    high: "高密充实 · 暴走暴干",
  };

  const weatherColors = {
    sunny: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    rainy: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    flexible: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  };

  const weatherLabels = {
    sunny: "适合晴天 / 日落窗口",
    rainy: "雨天避备 / 室内友好",
    flexible: "晴雨皆宜 / 极度灵活",
  };

  const regionNames: Record<string, string> = {
    bangkok: "曼谷 Bangkok",
    phuket: "普吉岛 Phuket",
    "koh-yao-yai": "瑶亚岛 Santhiya",
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-line/80 hover:shadow-premium transition-all duration-300 flex flex-col">
      {/* Header Banner */}
      <div className="relative min-h-[14rem] sm:min-h-[16rem] w-full overflow-hidden bg-sand/40 flex flex-col justify-between p-4 sm:p-5">
        <img
          src={heroImage}
          alt={route.titleZh}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 pointer-events-auto">
            <MapPin className="w-3.5 h-3.5 text-teal-100" />
            <span>{regionNames[route.region] || route.region}</span>
          </span>
          <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-mono text-xs border border-white/20 pointer-events-auto">
            {route.id}
          </span>
        </div>

        {/* Bottom Title Area */}
        <div className="relative z-10 text-white mt-6">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md ${
                intensityColors[route.intensity] || intensityColors.medium
              }`}
            >
              {intensityLabels[route.intensity] || route.intensity}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md flex items-center gap-1 ${
                weatherColors[route.weatherFit] || weatherColors.flexible
              }`}
            >
              {route.weatherFit === "sunny" ? <Sun className="w-3 h-3" /> : <Umbrella className="w-3 h-3" />}
              <span>{weatherLabels[route.weatherFit] || route.weatherFit}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-sans drop-shadow-md">
            {route.titleZh}
          </h3>
          {route.titleEn && (
            <p className="text-xs text-sand/90 font-normal italic drop-shadow-sm">
              {route.titleEn}
            </p>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          <p className="text-sm sm:text-base text-text/90 font-medium leading-relaxed">
            {route.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-sand/30 border border-line/60 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-text">
              <Clock className="w-4 h-4 text-teal flex-shrink-0" />
              <span>
                <strong className="font-semibold">游览耗时：</strong> {route.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 text-text">
              <Calendar className="w-4 h-4 text-orange flex-shrink-0" />
              <span>
                <strong className="font-semibold">最佳时间：</strong> {route.bestTime}
              </span>
            </div>
          </div>

          {/* Why Together */}
          <div className="p-4 rounded-2xl bg-teal/5 border border-teal/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>情侣顺路逻辑与精髓</span>
            </div>
            <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-normal">
              {route.whyTogether}
            </p>
          </div>

          {/* Places Chain */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider">
              途经打卡点 · Timeline ({routePlaces.length} 站)
            </h4>
            <div className="space-y-2.5">
              {routePlaces.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-card border border-line/80 flex items-start justify-between gap-3 shadow-xs hover:border-teal/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-teal/15 text-teal font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-bold text-sm text-text leading-snug">
                          {item.displayName || item.nameZh}
                        </h5>
                        <PriorityBadge priority={item.priority} size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        <span className="font-medium text-text/80">{item.category}</span> · {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    {onToggleVisited && (
                      <CheckInButton
                        isVisited={visited.includes(item.id)}
                        onToggle={(e) => onToggleVisited(item.id, e)}
                        size="sm"
                      />
                    )}
                    <FavoriteButton
                      isFavorite={favorites.includes(item.id)}
                      onToggle={(e) => onToggleFavorite(item.id, e)}
                      size="sm"
                    />
                    <ExternalMapButton place={item} type="search" variant="icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Notes */}
          {route.notes && route.notes.length > 0 && (
            <div className="border-t border-line/60 pt-4">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between text-xs font-bold text-teal hover:text-teal-light py-1"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>路线贴士与避坑策略 ({route.notes.length})</span>
                </span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expanded && (
                <div className="mt-3 space-y-2 animate-slide-down">
                  {route.notes.map((note, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-sand/40 border border-line/50 text-xs sm:text-sm text-text/90 flex items-start gap-2"
                    >
                      <span className="text-teal font-bold mt-0.5">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-5 border-t border-line/60 flex items-center justify-between gap-4 mt-6">
          <span className="text-xs font-mono text-muted">
            含 {route.placeIds.length} 个坐标点
          </span>
          <button
            type="button"
            onClick={() => onViewOnMap(route.id)}
            className="btn-primary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>在地图上查看此路线</span>
          </button>
        </div>
      </div>
    </div>
  );
};
