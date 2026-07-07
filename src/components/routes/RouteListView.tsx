import React, { useMemo, useState } from "react";
import type { Place, Region, RouteModule } from "../../types";
import { RegionTabs } from "../ui/RegionTabs";
import { SearchBar } from "../ui/SearchBar";
import { RouteCard } from "./RouteCard";
import { Compass } from "lucide-react";

interface RouteListViewProps {
  routes: readonly RouteModule[];
  places: readonly Place[];
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  visited?: string[];
  onToggleVisited?: (id: string, e?: React.MouseEvent) => void;
  onViewOnMap: (routeId: string) => void;
  initialRegion?: Region | "all";
}

export const RouteListView: React.FC<RouteListViewProps> = ({
  routes,
  places,
  favorites,
  onToggleFavorite,
  visited = [],
  onToggleVisited,
  onViewOnMap,
  initialRegion = "all",
}) => {
  const [region, setRegion] = useState<Region | "all">(initialRegion);
  const [searchQuery, setSearchQuery] = useState("");

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: routes.length };
    routes.forEach((r) => {
      counts[r.region] = (counts[r.region] || 0) + 1;
    });
    return counts;
  }, [routes]);

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      if (region !== "all" && r.region !== region) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = r.titleZh.toLowerCase().includes(q);
        const matchTitleEn = r.titleEn?.toLowerCase().includes(q) || false;
        const matchSub = r.subtitle.toLowerCase().includes(q);
        const matchWhy = r.whyTogether.toLowerCase().includes(q);
        const matchPlaces = r.placeIds.some((id) => {
          const place = places.find((p) => p.id === id);
          return place && (place.nameZh.toLowerCase().includes(q) || place.displayName?.toLowerCase().includes(q));
        });

        if (!matchTitle && !matchTitleEn && !matchSub && !matchWhy && !matchPlaces) {
          return false;
        }
      }

      return true;
    });
  }, [routes, region, searchQuery, places]);

  return (
    <div className="space-y-6 animate-view-appear">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-2 font-sans">
          <Compass className="w-6 h-6 text-teal" />
          <span>路线组合与打包顺路打法 · Route Modules</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-1">
          将散落的景点科学串联：减少周折、避过炎热与拥堵，享受丝滑海岛度假
        </p>
      </div>

      <div className="glass-card p-4 sm:p-5 rounded-3xl border border-line/80 space-y-4 shadow-sm">
        <RegionTabs
          selected={region}
          onChange={(r) => setRegion(r)}
          counts={regionCounts}
        />
        <div className="pt-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm text-muted font-medium px-1">
        <span>
          显示 <strong className="text-text">{filteredRoutes.length}</strong> / {routes.length} 条路线
        </span>
        {(region !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setRegion("all");
              setSearchQuery("");
            }}
            className="text-teal hover:underline font-semibold"
          >
            重置筛选
          </button>
        )}
      </div>

      {filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-view-appear">
          {filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              places={places}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              visited={visited}
              onToggleVisited={onToggleVisited}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 rounded-3xl text-center border border-line/80 space-y-3">
          <div className="w-16 h-16 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-muted">
            <Compass className="w-8 h-8 text-teal/60" />
          </div>
          <h3 className="text-lg font-bold text-text">没有找到匹配的路线</h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            请尝试重新输入关键词或选择其他区域分组。
          </p>
          <button
            onClick={() => {
              setRegion("all");
              setSearchQuery("");
            }}
            className="btn-primary text-xs py-2 px-4 mt-2 inline-flex"
          >
            重置搜索
          </button>
        </div>
      )}
    </div>
  );
};
