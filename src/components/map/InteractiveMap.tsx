import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Place, Priority, Region, RouteModule } from "../../types";
import { PriorityBadge } from "../ui/PriorityBadge";
import { ExternalMapButton } from "../ui/ExternalMapButton";
import { PlaceDetailSheet } from "../places/PlaceDetailSheet";
import { MapLegend } from "./MapLegend";
import { RegionTabs } from "../ui/RegionTabs";
import { FilterChips } from "../ui/FilterChips";
import { filterPlaces, getUniqueCategories } from "../../utils/filters";
import { getPriorityInfo } from "../../utils/priorities";
import { getPlaceImage } from "../../utils/images";
import { googleMapsMultiRouteUrl } from "../../utils/googleMaps";
import { Compass, Layers, Map as MapIcon, SlidersHorizontal, X, Navigation, ChevronDown, ChevronUp } from "lucide-react";

interface InteractiveMapProps {
  places: readonly Place[];
  routes: readonly RouteModule[];
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  visited?: string[];
  onToggleVisited?: (id: string, e?: React.MouseEvent) => void;
  initialRegion?: Region | "all";
  selectedRouteId?: string;
  onClearRouteId?: () => void;
}

const defaultCenters: Record<string, [number, number]> = {
  all: [10.5, 98.8],
  bangkok: [13.746, 100.505],
  phuket: [7.88, 98.35],
  "koh-yao-yai": [8.01, 98.58],
};

const defaultZooms: Record<string, number> = {
  all: 7,
  bangkok: 12,
  phuket: 11,
  "koh-yao-yai": 12,
};

// Center control helper component
const MapController: React.FC<{
  center: [number, number];
  zoom: number;
  places: readonly Place[];
  filterKey: string;
}> = ({ center, zoom, places, filterKey }) => {
  const map = useMap();

  useEffect(() => {
    let prevSize = map.getSize();

    const updateBounds = (animate: boolean) => {
      map.invalidateSize();
      const size = map.getSize();
      if (size.x === 0 || size.y === 0) return;
      if (places.length > 1) {
        const bounds = L.latLngBounds(
          places.map((p) => [p.lat, p.lng] as [number, number])
        );
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, animate });
      } else if (places.length === 1) {
        map.setView([places[0].lat, places[0].lng], 15, { animate });
      } else {
        map.setView(center, zoom, { animate });
      }
    };

    updateBounds(true);

    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      const size = map.getSize();
      if ((prevSize.x === 0 || prevSize.y === 0) && size.x > 0 && size.y > 0) {
        updateBounds(false);
      }
      prevSize = size;
    });
    observer.observe(container);

    const handleResize = () => updateBounds(false);
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [filterKey, map, places, center, zoom]);

  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  routes,
  favorites,
  onToggleFavorite,
  visited = [],
  onToggleVisited,
  initialRegion = "all",
  selectedRouteId,
  onClearRouteId,
}) => {
  const [region, setRegion] = useState<Region | "all">(initialRegion);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeRouteId, setActiveRouteId] = useState<string | undefined>(selectedRouteId);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedKind, setSelectedKind] = useState<"all" | "place" | "restaurant">("all");
  const [isRouteCardExpanded, setIsRouteCardExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (selectedRouteId) {
      setActiveRouteId(selectedRouteId);
      setIsRouteCardExpanded(false);
      const route = routes.find((r) => r.id === selectedRouteId);
      if (route) {
        setRegion(route.region);
      }
    }
  }, [selectedRouteId, routes]);

  const activeRoute = useMemo(() => routes.find((r) => r.id === activeRouteId), [routes, activeRouteId]);

  const routePlaces = useMemo(() => {
    if (!activeRoute) return [];
    return activeRoute.placeIds
      .map((id) => places.find((p) => p.id === id))
      .filter(Boolean) as Place[];
  }, [activeRoute, places]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: places.length };
    places.forEach((p) => {
      counts[p.region] = (counts[p.region] || 0) + 1;
    });
    return counts;
  }, [places]);

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
      priorities: selectedPriorities,
      category: selectedCategories.length > 0 ? selectedCategories : "all",
      routeId: activeRouteId,
    });
    if (selectedKind === "place") {
      res = res.filter((p) => (p.kind || "place") !== "restaurant");
    } else if (selectedKind === "restaurant") {
      res = res.filter((p) => p.kind === "restaurant");
    }
    return res;
  }, [places, region, selectedPriorities, selectedCategories, activeRouteId, selectedKind]);

  const filterKey = `${region}-${selectedPriorities.join(",")}-${selectedCategories.join(",")}-${activeRouteId || ""}-${selectedKind}`;

  const currentCenter = defaultCenters[region] || defaultCenters.all;
  const currentZoom = defaultZooms[region] || 10;

  const createCustomIcon = (place: Place, isSelected: boolean, isFav: boolean) => {
    const info = getPriorityInfo(place.priority);
    const isFood = place.kind === "restaurant";
    let dotClass = info.dotClass;
    let markerContent = `<span>${place.id.split("-")[1] || place.id}</span>`;

    if (isFood) {
      const txt = `${place.nameZh} ${place.category || ""} ${place.shortDescription || ""}`;
      if (/海鲜|河景|景观|观景|海边|海湾|日落晚餐|度假|沙洲|海滩/.test(txt)) {
        dotClass = "bg-gradient-to-br from-cyan-500 to-blue-600 border-white shadow-cyan-500/50";
        markerContent = `<span class="text-base leading-none">🦞</span>`;
      } else if (/甜品|冰淇淋|茶|奶|咖啡|芒果|酒吧|轻食|Karun|Pangcha|Torry/.test(txt)) {
        dotClass = "bg-gradient-to-br from-pink-500 to-rose-600 border-white shadow-pink-500/50";
        markerContent = `<span class="text-base leading-none">🧋</span>`;
      } else if (/面|小吃|夜市|夜宵|快餐|排骨|猪血|干饭|Thong Smith|Jeh O|Benz/.test(txt)) {
        dotClass = "bg-gradient-to-br from-orange-500 to-red-600 border-white shadow-orange-500/50";
        markerContent = `<span class="text-base leading-none">🍜</span>`;
      } else {
        dotClass = "bg-gradient-to-br from-amber-500 to-yellow-600 border-white shadow-amber-500/50";
        markerContent = `<span class="text-base leading-none">🍛</span>`;
      }
    } else {
      const txt = `${place.nameZh} ${place.category || ""} ${place.shortDescription || ""}`;
      if (/机场|国际机场|接送|飞机|接机|送机/.test(txt)) {
        markerContent = `<span class="text-base leading-none">✈️</span>`;
      } else if (/船|码头|快艇|轮渡|出海|坐船|穿梭/.test(txt)) {
        markerContent = `<span class="text-base leading-none">⚓</span>`;
      } else if (/酒店|度假村|Santhiya|住宿|入住|民宿|泳池/.test(txt)) {
        markerContent = `<span class="text-base leading-none">🏨</span>`;
      } else if (/海滩|沙滩|日落|卡伦|芭东|三大海滩|查龙|海湾|西海岸/.test(txt)) {
        markerContent = `<span class="text-base leading-none">🏖️</span>`;
      } else if (/寺|大皇宫|佛|卧佛|郑王庙|查龙寺|四面佛|王权|神庙/.test(txt)) {
        markerContent = `<span class="text-base leading-none">⛩️</span>`;
      } else if (/商城|商场|购物|免税|夜市|集市|iconsiam|paragon|central|big c|7-11|罗勇/i.test(txt)) {
        markerContent = `<span class="text-base leading-none">🛍️</span>`;
      } else if (/避坑|防骗|谨慎|大象|出租车|拉客|诈骗|风险|安全|假/.test(txt) || place.priority === "caution") {
        markerContent = `<span class="text-base leading-none">⚠️</span>`;
      } else if (/按摩|SPA|马杀鸡|休闲|Relax|Health Land|潜水|皮划艇|冲浪|俱乐部/i.test(txt)) {
        markerContent = `<span class="text-base leading-none">💆‍♂️</span>`;
      } else if (place.priority === "core") {
        markerContent = `<span class="text-base leading-none">📌</span>`;
      } else if (place.priority === "transport") {
        markerContent = `<span class="text-base leading-none">🚕</span>`;
      } else if (place.priority === "remote") {
        markerContent = `<span class="text-base leading-none">🏝️</span>`;
      } else {
        markerContent = `<span class="text-base leading-none">🎡</span>`;
      }
    }

    const scaleClass = isSelected ? "scale-125 z-50 ring-4 ring-white shadow-xl" : "hover:scale-110";
    const favBadge = isFav
      ? `<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white"></span>`
      : "";

    const stopIdx = activeRoute ? activeRoute.placeIds.indexOf(place.id) : -1;
    const stopBadge = stopIdx >= 0
      ? `<span class="absolute -bottom-1 -left-1 px-1.5 py-0.5 bg-orange text-white rounded-full text-[10px] font-black border border-white shadow-md z-10">#${stopIdx + 1}</span>`
      : "";

    const html = `
      <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${dotClass} text-white font-mono text-[11px] font-bold shadow-lg border-2 border-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass}">
        ${markerContent}
        ${favBadge}
        ${stopBadge}
      </div>
    `;

    return L.divIcon({
      html,
      className: "custom-map-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });
  };

  const priorityOptions = [
    { label: "核心优先", value: "core" as Priority, colorClass: "bg-emerald-500 text-white border-emerald-500" },
    { label: "选配", value: "optional" as Priority, colorClass: "bg-amber-500 text-white border-amber-500" },
    { label: "交通/机场", value: "transport" as Priority, colorClass: "bg-sky-500 text-white border-sky-500" },
    { label: "远程/出海", value: "remote" as Priority, colorClass: "bg-purple-500 text-white border-purple-500" },
    { label: "谨慎/跳过", value: "caution" as Priority, colorClass: "bg-rose-500 text-white border-rose-500" },
  ];

  const categoryOptions = categories.map((cat) => ({ label: cat, value: cat }));

  const hasActiveFilters = region !== "all" || selectedPriorities.length > 0 || selectedCategories.length > 0 || activeRouteId !== undefined || selectedKind !== "all";

  const handleClearAll = () => {
    setRegion("all");
    setSelectedPriorities([]);
    setSelectedCategories([]);
    setActiveRouteId(undefined);
    setSelectedKind("all");
    if (onClearRouteId) onClearRouteId();
  };

  return (
    <div className="space-y-6 animate-view-appear">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-2 font-sans">
            <MapIcon className="w-6 h-6 text-teal" />
            <span>泰国多区域空间分布地图 · Interactive Map</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            支持双指触控捏合缩放、鼠标滚轮与触控板双指缩放，体验原生地图交互
          </p>
        </div>
      </div>

      {/* Filter Controls Panel */}
      <div className="glass-card p-4 sm:p-5 rounded-3xl border border-line/80 space-y-4 shadow-sm">
        {/* Kind Toggle Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-line/50 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-muted mr-1">显示类型：</span>
            <button
              onClick={() => { setSelectedKind("all"); setSelectedCategories([]); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedKind === "all" ? "bg-teal text-white shadow-md scale-105" : "bg-sand/60 text-muted hover:text-text hover:bg-sand"}`}
            >
              🏷️ 全部地点 & 美食 ({places.length})
            </button>
            <button
              onClick={() => { setSelectedKind("place"); setSelectedCategories([]); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedKind === "place" ? "bg-teal text-white shadow-md scale-105" : "bg-sand/60 text-muted hover:text-text hover:bg-sand"}`}
            >
              ⛩️ 景点与体验 ({places.filter(p => (p.kind || "place") !== "restaurant").length})
            </button>
            <button
              onClick={() => { setSelectedKind("restaurant"); setSelectedCategories([]); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedKind === "restaurant" ? "bg-teal text-white shadow-md scale-105" : "bg-sand/60 text-muted hover:text-text hover:bg-sand"}`}
            >
              🍜 浪漫餐厅与美食 ({places.filter(p => p.kind === "restaurant").length})
            </button>
          </div>
        </div>

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

        <div className="pt-2 border-t border-line/50 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal" />
              <span>优先级过滤（支持多选与取消）</span>
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
              <Layers className="w-3.5 h-3.5 text-orange" />
              <span>分类过滤（支持多选与取消）</span>
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

      {/* Map Area */}
      <div className="relative h-[600px] sm:h-[680px] w-full rounded-3xl overflow-hidden border border-line/80 shadow-premium bg-sand/40">
        <MapContainer
          center={currentCenter}
          zoom={currentZoom}
          className="w-full h-full z-0"
          zoomControl={true}
          scrollWheelZoom={true}
          touchZoom={true}
          doubleClickZoom={true}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController
            center={currentCenter}
            zoom={currentZoom}
            places={filteredPlaces}
            filterKey={filterKey}
          />

          {routePlaces.length > 1 && (
            <>
              {/* Background glowing path */}
              <Polyline
                positions={routePlaces.map((p) => [p.lat, p.lng])}
                pathOptions={{ color: "#0D9488", weight: 8, opacity: 0.35, lineCap: "round", lineJoin: "round" }}
              />
              {/* Foreground dashed path */}
              <Polyline
                positions={routePlaces.map((p) => [p.lat, p.lng])}
                pathOptions={{ color: "#F97316", weight: 4, dashArray: "10, 8", opacity: 0.95, lineCap: "round", lineJoin: "round" }}
              />
            </>
          )}

          {filteredPlaces.map((place) => {
            const isFav = favorites.includes(place.id);
            const isSel = selectedPlace?.id === place.id;
            const icon = createCustomIcon(place, isSel, isFav);

            return (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={icon}
              >
                <Popup className="custom-popup rounded-2xl overflow-hidden shadow-xl border-0 p-0" minWidth={280} maxWidth={300}>
                  <div className="p-3.5 bg-card text-text space-y-2">
                    <div className="relative h-32 -mx-3.5 -mt-3.5 mb-2 overflow-hidden bg-sand/40">
                      <img
                        src={getPlaceImage(place, true)}
                        alt={place.displayName || place.nameZh}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <PriorityBadge priority={place.priority} size="sm" />
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-text leading-tight">
                      {place.displayName || place.nameZh}
                    </h4>
                    <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                      {place.shortDescription}
                    </p>

                    <div className="pt-2.5 border-t border-line/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedPlace(place)}
                        className="text-xs font-bold text-white bg-teal hover:bg-teal-light transition-colors flex items-center gap-1 px-3 py-1.5 rounded-xl shadow-xs flex-shrink-0"
                      >
                        <span>更多详情 →</span>
                      </button>
                      <ExternalMapButton place={place} variant="outline" label="导航" className="py-1.5 px-3 text-xs flex-shrink-0" />
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Collapsible Floating Bottom Bar for Active Route - non-blocking mobile UX */}
        {!selectedPlace && activeRoute && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4 sm:bottom-4 z-[400] max-w-none sm:max-w-md bg-card/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-line shadow-2xl transition-all duration-300 animate-pop-in">
            <div className="flex items-center justify-between gap-2">
              <div
                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none"
                onClick={() => setIsRouteCardExpanded(!isRouteCardExpanded)}
              >
                <div className="p-2 rounded-xl bg-orange text-white flex-shrink-0 shadow-sm">
                  <Compass className="w-4 h-4 animate-spin-slow" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-text text-xs sm:text-sm truncate">
                      {activeRoute.titleZh}
                    </span>
                    <span className="text-[10px] bg-orange/15 text-orange font-black px-1.5 py-0.5 rounded flex-shrink-0">
                      {activeRoute.placeIds.length}站
                    </span>
                  </div>
                  <div className="text-[11px] text-muted truncate">
                    {activeRoute.subtitle} · {activeRoute.duration}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setIsRouteCardExpanded(!isRouteCardExpanded)}
                  className="p-2 rounded-xl bg-sand hover:bg-line text-text transition-colors flex items-center gap-1 text-xs font-bold"
                  title={isRouteCardExpanded ? "收起停靠点" : "展开停靠点"}
                >
                  {isRouteCardExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isRouteCardExpanded ? "收起" : "展开详情"}</span>
                </button>
                <a
                  href={googleMapsMultiRouteUrl(routePlaces)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:px-3 rounded-xl bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark text-white shadow-md transition-transform active:scale-95 flex items-center gap-1 text-xs font-bold"
                  title="打开 Google Maps 导航"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">导航</span>
                </a>
                <button
                  onClick={() => {
                    setActiveRouteId(undefined);
                    if (onClearRouteId) onClearRouteId();
                  }}
                  className="p-2 hover:bg-rose-500/10 text-muted hover:text-rose-500 rounded-xl transition-colors"
                  title="退出路线联动模式"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {isRouteCardExpanded && (
              <div className="mt-3 pt-3 border-t border-line/40 space-y-3 animate-fade-in">
                <div className="text-xs text-muted font-medium flex flex-wrap gap-1.5 items-center max-h-36 overflow-y-auto pr-1">
                  {routePlaces.map((p, idx) => (
                    <React.Fragment key={p.id}>
                      <span className="text-text font-bold bg-sand/60 px-2.5 py-1 rounded-xl border border-line/50 shadow-xs flex items-center gap-1">
                        <span className="text-orange font-black">#{idx + 1}</span>
                        <span>{p.displayName || p.nameZh}</span>
                      </span>
                      {idx < routePlaces.length - 1 && <span className="text-teal font-black">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                <a
                  href={googleMapsMultiRouteUrl(routePlaces)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>🚗 打开 Google Maps 多点真实路线导航</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Floating Route Selector - hidden when PlaceDetailSheet is open */}
        {!selectedPlace && (
          <div className="absolute top-4 right-4 z-[400] bg-card/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-line shadow-lg text-xs flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal flex-shrink-0" />
            <select
              value={activeRouteId || ""}
              onChange={(e) => {
                const val = e.target.value;
                setActiveRouteId(val ? val : undefined);
                if (val) {
                  const route = routes.find((r) => r.id === val);
                  if (route) setRegion(route.region);
                } else if (onClearRouteId) {
                  onClearRouteId();
                }
              }}
              className="bg-transparent text-text font-semibold focus:outline-none cursor-pointer"
            >
              <option value="">查看全部路线 (查看所有地点)</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  📍 {r.titleZh}
                </option>
              ))}
            </select>
            {activeRouteId && (
              <button
                type="button"
                onClick={() => {
                  setActiveRouteId(undefined);
                  if (onClearRouteId) onClearRouteId();
                }}
                className="hover:bg-sand/40 p-1 rounded-full text-muted hover:text-text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Map Legend moved below the map container so it never blocks cards or markers */}
      <MapLegend className="mt-4" />

      {/* Place Detail Bottom Sheet / Modal */}
      <PlaceDetailSheet
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isFavorite={selectedPlace ? favorites.includes(selectedPlace.id) : false}
        onToggleFavorite={onToggleFavorite}
        isVisited={selectedPlace ? (visited || []).includes(selectedPlace.id) : false}
        onToggleVisited={onToggleVisited}
      />
    </div>
  );
};
