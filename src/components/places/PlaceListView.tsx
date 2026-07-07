import React, { useMemo, useState } from "react";
import type { Place, Priority, Region } from "../../types";
import { RegionTabs } from "../ui/RegionTabs";
import { SearchBar } from "../ui/SearchBar";
import { FilterChips } from "../ui/FilterChips";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetailSheet } from "./PlaceDetailSheet";
import { filterPlaces, getUniqueCategories } from "../../utils/filters";
import { CheckCircle2, Heart, SlidersHorizontal, Sparkles } from "lucide-react";

interface PlaceListViewProps {
  places: readonly Place[];
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  visited?: string[];
  onToggleVisited?: (id: string, e?: React.MouseEvent) => void;
  initialRegion?: Region | "all";
  initialKind?: "all" | "place" | "restaurant";
}

export const PlaceListView: React.FC<PlaceListViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  visited = [],
  onToggleVisited,
  initialRegion = "all",
  initialKind = "place",
}) => {
  const [region, setRegion] = useState<Region | "all">(initialRegion);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyVisited, setOnlyVisited] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedKind, setSelectedKind] = useState<"all" | "place" | "restaurant">(initialKind);

  React.useEffect(() => {
    if (initialKind) setSelectedKind(initialKind);
  }, [initialKind]);

  const regionCounts = useMemo(() => {
    const relevantPlaces =
      selectedKind === "place"
        ? places.filter((p) => (p.kind || "place") !== "restaurant")
        : selectedKind === "restaurant"
        ? places.filter((p) => p.kind === "restaurant")
        : places;
    const counts: Record<string, number> = { all: relevantPlaces.length };
    relevantPlaces.forEach((p) => {
      counts[p.region] = (counts[p.region] || 0) + 1;
    });
    return counts;
  }, [places, selectedKind]);

  const basePlacesCount = useMemo(() => {
    if (selectedKind === "place") {
      return places.filter((p) => (p.kind || "place") !== "restaurant").length;
    } else if (selectedKind === "restaurant") {
      return places.filter((p) => p.kind === "restaurant").length;
    }
    return places.length;
  }, [places, selectedKind]);

  const categories = useMemo(() => {
    let regionPlaces =
      region === "all" ? places : places.filter((p) => p.region === region);
    if (selectedKind === "place") {
      regionPlaces = regionPlaces.filter((p) => (p.kind || "place") !== "restaurant");
    } else if (selectedKind === "restaurant") {
      regionPlaces = regionPlaces.filter((p) => p.kind === "restaurant");
    }
    return getUniqueCategories(regionPlaces);
  }, [places, region, selectedKind]);

  const filteredPlaces = useMemo(() => {
    let res = filterPlaces(places, {
      region,
      searchQuery,
      priorities: selectedPriorities,
      category: selectedCategories.length > 0 ? selectedCategories : "all",
      onlyFavorites,
      favoritesList: favorites,
    });
    if (selectedKind === "place") {
      res = res.filter((p) => (p.kind || "place") !== "restaurant");
    } else if (selectedKind === "restaurant") {
      res = res.filter((p) => p.kind === "restaurant");
    }
    if (onlyVisited) {
      res = res.filter((p) => visited.includes(p.id));
    }
    return res;
  }, [
    places,
    region,
    searchQuery,
    selectedPriorities,
    selectedCategories,
    onlyFavorites,
    onlyVisited,
    favorites,
    visited,
    selectedKind,
  ]);

  const priorityOptions = [
    { label: "核心优先", value: "core" as Priority, colorClass: "bg-emerald-500 text-white border-emerald-500" },
    { label: "选配", value: "optional" as Priority, colorClass: "bg-amber-500 text-white border-amber-500" },
    { label: "交通/机场", value: "transport" as Priority, colorClass: "bg-sky-500 text-white border-sky-500" },
    { label: "远程/出海", value: "remote" as Priority, colorClass: "bg-purple-500 text-white border-purple-500" },
    { label: "谨慎/跳过", value: "caution" as Priority, colorClass: "bg-rose-500 text-white border-rose-500" },
  ];

  const categoryOptions = categories.map((cat) => ({ label: cat, value: cat }));

  const hasActiveFilters = region !== "all" || selectedPriorities.length > 0 || selectedCategories.length > 0 || searchQuery.trim() !== "" || onlyFavorites || onlyVisited || selectedKind !== "all";

  const handleClearAll = () => {
    setRegion("all");
    setSelectedPriorities([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setOnlyFavorites(false);
    setOnlyVisited(false);
    setSelectedKind("all");
  };

  return (
    <div className="space-y-6 animate-view-appear">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-2 font-sans">
            <Sparkles className="w-6 h-6 text-teal" />
            <span>全量地点清单 · All Places</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            筛选、检索与收藏 14 天旅途中的核心打卡点、交通驳接与美食日落
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => {
              setOnlyVisited(!onlyVisited);
              if (!onlyVisited) setOnlyFavorites(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              onlyVisited
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-card hover:bg-sand/40 text-muted hover:text-text border border-line/80"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${onlyVisited ? "fill-white text-emerald-600" : ""}`} />
            <span>仅看打卡 ({visited.length})</span>
          </button>
          <button
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
              if (!onlyFavorites) setOnlyVisited(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              onlyFavorites
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                : "bg-card hover:bg-sand/40 text-muted hover:text-text border border-line/80"
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? "fill-white" : ""}`} />
            <span>仅看收藏 ({favorites.length})</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-4 sm:p-5 rounded-3xl border border-line/80 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <RegionTabs
            selected={region}
            onChange={(r) => {
              setRegion(r);
              setSelectedCategories([]);
            }}
            counts={regionCounts}
          />
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/30 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>🗑️ 一键清空筛选</span>
            </button>
          )}
        </div>

        <div className="pt-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="pt-2 border-t border-line/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal" />
              <span>优先级筛选（支持多选与取消）</span>
            </div>
            {selectedPriorities.length > 0 && (
              <button onClick={() => setSelectedPriorities([])} className="text-[11px] text-teal hover:underline font-medium">
                清空优先级
              </button>
            )}
          </div>
          <FilterChips
            options={priorityOptions}
            selected={selectedPriorities}
            onChange={(val) => setSelectedPriorities(val as Priority[])}
            multiSelect
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase">
              <span>类型分类（支持多选与取消）</span>
            </div>
            {selectedCategories.length > 0 && (
              <button onClick={() => setSelectedCategories([])} className="text-[11px] text-teal hover:underline font-medium">
                清空分类
              </button>
            )}
          </div>
          <FilterChips
            options={categoryOptions}
            selected={selectedCategories}
            onChange={(val) => setSelectedCategories(val as string[])}
            multiSelect={true}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm text-muted font-medium px-1">
        <span>
          显示 <strong className="text-text">{filteredPlaces.length}</strong> / {basePlacesCount} 个地点
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-teal hover:underline font-bold flex items-center gap-1"
          >
            <span>重置所有筛选</span>
          </button>
        )}
      </div>

      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-view-appear">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isFavorite={favorites.includes(place.id)}
              onToggleFavorite={onToggleFavorite}
              isVisited={visited.includes(place.id)}
              onToggleVisited={onToggleVisited}
              onSelect={setSelectedPlace}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 rounded-3xl text-center border border-line/80 space-y-3">
          <div className="w-16 h-16 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-muted">
            <Sparkles className="w-8 h-8 text-teal/60" />
          </div>
          <h3 className="text-lg font-bold text-text">没有找到匹配的地点</h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            尝试更改或重置筛选条件、搜索关键词或切换区域选项。
          </p>
          <button
            onClick={() => {
              setSelectedPriorities([]);
              setSelectedCategories([]);
              setSearchQuery("");
              setOnlyFavorites(false);
              setOnlyVisited(false);
            }}
            className="btn-primary text-xs py-2 px-4 mt-2 inline-flex"
          >
            重置筛选
          </button>
        </div>
      )}

      <PlaceDetailSheet
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isFavorite={selectedPlace ? favorites.includes(selectedPlace.id) : false}
        onToggleFavorite={onToggleFavorite}
        isVisited={selectedPlace ? visited.includes(selectedPlace.id) : false}
        onToggleVisited={onToggleVisited}
      />
    </div>
  );
};
