import React, { useState, useMemo } from "react";
import type { Region, FoodType, FoodPriority, Place } from "../../types";
import { foodItems } from "../../data/foodItems";
import { restaurants } from "../../data/restaurants";
import { getAssetUrl } from "../../utils/images";
import { RegionTabs } from "../ui/RegionTabs";
import { FilterChips } from "../ui/FilterChips";
import { PriorityBadge } from "../ui/PriorityBadge";
import { RestaurantModal } from "./RestaurantModal";
import {
  Utensils,
  Store,
  Sparkles,
  MapPin,
  Search,
  Trash2,
  ExternalLink,
  Compass,
  Award,
  ChevronRight,
  Flame,
  Coffee,
  Fish,
  DollarSign,
  Clock,
  BookOpen,
} from "lucide-react";

interface FoodGuideViewProps {
  initialRegion?: Region | "all";
  onViewRestaurantOnMap?: (restaurantId: string) => void;
}

export const FoodGuideView: React.FC<FoodGuideViewProps> = ({
  initialRegion = "all",
  onViewRestaurantOnMap,
}) => {
  // Top view mode switcher: "dishes" vs "restaurants"
  const [viewMode, setViewMode] = useState<"dishes" | "restaurants">("dishes");

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">(initialRegion);
  const [selectedTypes, setSelectedTypes] = useState<FoodType[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<FoodPriority[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state for viewing restaurant details
  const [selectedRestaurant, setSelectedRestaurant] = useState<Place | null>(null);

  // Map restaurant IDs to Place objects for fast lookup
  const restaurantMap = useMemo(() => {
    const map: Record<string, Place> = {};
    restaurants.forEach((r) => {
      map[r.id] = r;
    });
    return map;
  }, []);

  // Filtered Food Items
  const filteredDishes = useMemo(() => {
    return foodItems.filter((item) => {
      if (selectedRegion !== "all" && item.region !== selectedRegion) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(item.priority)) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchNameZh = item.nameZh.toLowerCase().includes(q);
        const matchNameEn = item.nameEn.toLowerCase().includes(q);
        const matchDesc = item.shortDescription.toLowerCase().includes(q);
        const matchWhy = item.whyTry.toLowerCase().includes(q);
        if (!matchNameZh && !matchNameEn && !matchDesc && !matchWhy) return false;
      }
      return true;
    });
  }, [selectedRegion, selectedTypes, selectedPriorities, searchQuery]);

  // Filtered Restaurants (for the restaurants tab)
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((rest) => {
      if (selectedRegion !== "all" && rest.region !== selectedRegion) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchNameZh = rest.nameZh.toLowerCase().includes(q);
        const matchNameEn = rest.nameEn.toLowerCase().includes(q);
        const matchArea = rest.area?.toLowerCase().includes(q) || false;
        const matchDesc = rest.shortDescription?.toLowerCase().includes(q) || false;
        if (!matchNameZh && !matchNameEn && !matchArea && !matchDesc) return false;
      }
      return true;
    });
  }, [selectedRegion, searchQuery]);

  // Calculate region counts for current view
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: viewMode === "dishes" ? foodItems.length : restaurants.length,
      bangkok: 0,
      phuket: 0,
      "koh-yao-yai": 0,
    };
    const source = viewMode === "dishes" ? foodItems : restaurants;
    source.forEach((item) => {
      counts[item.region] = (counts[item.region] || 0) + 1;
    });
    return counts;
  }, [viewMode]);

  // Options for Category filter
  const categoryOptions = [
    { label: "经典主食", value: "dish" as FoodType, icon: <Utensils className="w-3.5 h-3.5" /> },
    { label: "街头小吃", value: "street-food" as FoodType, icon: <Flame className="w-3.5 h-3.5" /> },
    { label: "甜品甜点", value: "dessert" as FoodType, icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "特色饮品", value: "drink" as FoodType, icon: <Coffee className="w-3.5 h-3.5" /> },
    { label: "海鲜大餐", value: "seafood" as FoodType, icon: <Fish className="w-3.5 h-3.5" /> },
    { label: "元气早餐", value: "breakfast" as FoodType, icon: <Utensils className="w-3.5 h-3.5" /> },
    { label: "休闲小吃", value: "snack" as FoodType, icon: <Flame className="w-3.5 h-3.5" /> },
    { label: "浪漫餐饮体验", value: "dining-experience" as FoodType, icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  // Options for Priority filter
  const priorityOptions = [
    { label: "必吃 Must-Try", value: "must-try" as FoodPriority, colorClass: "bg-rose-500 text-white" },
    { label: "重点推荐", value: "recommended" as FoodPriority, colorClass: "bg-amber-500 text-white" },
    { label: "场景备选", value: "situational" as FoodPriority, colorClass: "bg-teal text-white" },
  ];

  const hasActiveFilters = selectedTypes.length > 0 || selectedPriorities.length > 0 || searchQuery.trim() !== "";

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedPriorities([]);
    setSearchQuery("");
  };

  const getCategoryBadgeColor = (cat: FoodType) => {
    switch (cat) {
      case "dish":
        return "bg-teal/15 text-teal border-teal/30";
      case "street-food":
      case "snack":
        return "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30";
      case "dessert":
      case "drink":
      case "breakfast":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "seafood":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "dining-experience":
        return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
      default:
        return "bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryLabel = (cat: FoodType) => {
    switch (cat) {
      case "dish": return "经典主食";
      case "street-food": return "街头小吃";
      case "dessert": return "甜品甜点";
      case "drink": return "特色饮品";
      case "seafood": return "海鲜大餐";
      case "breakfast": return "元气早餐";
      case "snack": return "休闲小吃";
      case "dining-experience": return "浪漫餐饮体验";
      default: return "美味推荐";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24 animate-view-appear">
      {/* Hero Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-card via-sand/30 to-card p-6 sm:p-8 rounded-3xl border border-line/60 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-teal/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-1.5 border border-rose-500/20">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              情侣专属美食与餐厅体系
            </span>
            <span className="text-xs text-muted font-medium">泰国3大目的地</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text tracking-tight flex items-center gap-3">
            <span>泰美味 Thailand Food & Dining</span>
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            区分<span className="font-semibold text-text">“美食图鉴 (吃什么)”</span>与<span className="font-semibold text-text">“餐厅名录 (去哪吃)”</span>。你可以浏览核心必吃美食，点击推荐餐厅即可一键调起地图与攻略。
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-sand/60 p-1.5 rounded-2xl border border-line/80 self-start md:self-center z-10 shrink-0 shadow-inner">
          <button
            onClick={() => setViewMode("dishes")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              viewMode === "dishes"
                ? "bg-card text-text shadow-md border border-white/60 scale-105"
                : "text-muted hover:text-text"
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>美食图鉴 ({foodItems.length})</span>
          </button>
          <button
            onClick={() => setViewMode("restaurants")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              viewMode === "restaurants"
                ? "bg-card text-text shadow-md border border-white/60 scale-105"
                : "text-muted hover:text-text"
            }`}
          >
            <Store className="w-4 h-4 text-teal" />
            <span>餐厅名单 ({restaurants.length})</span>
          </button>
        </div>
      </div>

      {/* Region Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal" />
            <span>选择目的地区域</span>
          </span>
        </div>
        <RegionTabs
          selected={selectedRegion}
          onChange={setSelectedRegion}
          counts={regionCounts}
          size="lg"
        />
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-card p-5 rounded-3xl border border-line/60 shadow-sm space-y-4">
        {viewMode === "dishes" ? (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="space-y-2 flex-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  美食分类 (支持多选 / 点击取消)
                </span>
                <FilterChips
                  options={categoryOptions}
                  selected={selectedTypes}
                  onChange={(val) => setSelectedTypes(val as FoodType[])}
                  multiSelect={true}
                />
              </div>

              {/* Search Box */}
              <div className="w-full lg:w-72">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">
                  搜索名称或特色
                </span>
                <div className="relative">
                  <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索冬阴功、芒果、生腌..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-sand/40 border border-line/80 focus:border-teal focus:ring-2 focus:ring-teal/20 text-text outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-line/40">
              {/* Priority Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  优先级筛选 (支持多选)
                </span>
                <FilterChips
                  options={priorityOptions}
                  selected={selectedPriorities}
                  onChange={(val) => setSelectedPriorities(val as FoodPriority[])}
                  multiSelect={true}
                />
              </div>

              {/* Clear Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="self-start sm:self-center flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/30 transition-all shadow-sm active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>一键清空筛选</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索餐厅名称、位置或描述..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-sand/40 border border-line/80 focus:border-teal focus:ring-2 focus:ring-teal/20 text-text outline-none transition-all"
                />
              </div>
            </div>
            {searchQuery.trim() !== "" && (
              <button
                onClick={() => setSearchQuery("")}
                className="self-start sm:self-center flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/30 transition-all shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空搜索</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Grid Section */}
      {viewMode === "dishes" ? (
        /* DISHES GRID */
        filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-line/60 p-8">
            <Utensils className="w-12 h-12 text-muted mx-auto mb-4 opacity-40" />
            <h3 className="text-lg font-bold text-text mb-1">未找到匹配的美食</h3>
            <p className="text-sm text-muted mb-4">当前区域和筛选条件下没有符合条件的菜品，请尝试调整或清空条件。</p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-teal text-white font-bold text-sm shadow-md"
              >
                一键清空筛选
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-card rounded-3xl border border-line/60 shadow-md md:hover:shadow-xl transition-all duration-300 overflow-hidden md:hover:-translate-y-1"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full bg-sand/60 overflow-hidden">
                  <img
                    src={getAssetUrl(item.imagePath)}
                    alt={item.imageAlt || item.nameZh}
                    onError={(e) => {
                      // Fallback when image is not uploaded yet
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Fallback styling when image is not present */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-teal/20 text-center -z-10">
                    <Utensils className="w-8 h-8 text-rose-500/60 mb-2" />
                    <span className="text-xs font-bold text-muted">待补充实拍图片</span>
                    <span className="text-[10px] text-muted font-mono">{item.id}.jpg</span>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-semibold text-[11px]">
                      {item.region === "bangkok"
                        ? "曼谷"
                        : item.region === "phuket"
                        ? "普吉岛"
                        : "瑶亚岛"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <PriorityBadge priority={item.priority} size="sm" solid />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getCategoryBadgeColor(
                          item.type
                        )}`}
                      >
                        {getCategoryLabel(item.type)}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-text tracking-tight md:group-hover:text-rose-500 transition-colors">
                      {item.nameZh}
                    </h3>
                    <p className="text-xs font-semibold text-muted font-sans">
                      {item.nameEn}
                    </p>
                    <p className="text-xs sm:text-sm text-text/90 leading-relaxed pt-1">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Why Try Callout */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/5 via-amber-500/5 to-teal/5 border border-rose-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>情侣必吃理由 / 特色</span>
                    </div>
                    <p className="text-xs text-text/90 leading-normal">
                      {item.whyTry}
                    </p>
                  </div>

                  {/* Recommended Restaurants Section */}
                  <div className="pt-2 border-t border-line/40 space-y-2">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                      <Store className="w-3 h-3 text-teal" />
                      <span>推荐去哪吃 (点击查看餐厅详情):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.recommendedRestaurantIds.map((restId) => {
                        const rest = restaurantMap[restId];
                        if (!rest) return null;
                        return (
                          <button
                            key={restId}
                            onClick={() => setSelectedRestaurant(rest)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand/80 hover:bg-teal/15 hover:border-teal/40 border border-line text-xs font-bold text-text transition-all group/btn shadow-sm active:scale-95"
                          >
                            <Utensils className="w-3 h-3 text-rose-500 group-hover/btn:scale-110 transition-transform" />
                            <span>{rest.nameZh.split(" ")[0]}</span>
                            <ChevronRight className="w-3 h-3 text-muted" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* RESTAURANTS GRID */
        filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-line/60 p-8">
            <Store className="w-12 h-12 text-muted mx-auto mb-4 opacity-40" />
            <h3 className="text-lg font-bold text-text mb-1">未找到匹配的餐厅</h3>
            <p className="text-sm text-muted">当前筛选条件无餐厅，请尝试清空搜索。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRestaurants.map((rest) => {
              // Find which dishes from our guide are served here
              const servedDishes = foodItems.filter((f) => f.recommendedRestaurantIds.includes(rest.id));
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                rest.googleMapsQuery || rest.nameEn || rest.nameZh
              )}`;

              return (
                <div
                  key={rest.id}
                  className="flex flex-col justify-between bg-card p-6 rounded-3xl border border-line/60 shadow-md md:hover:shadow-xl transition-all duration-300 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal/10 text-teal text-[11px] font-bold mb-1">
                          {rest.region === "bangkok" ? "曼谷" : rest.region === "phuket" ? "普吉岛" : "瑶亚岛"}
                        </span>
                        <h3 className="text-xl font-black text-text tracking-tight">
                          {rest.nameZh}
                        </h3>
                        <p className="text-xs font-semibold text-muted">{rest.nameEn}</p>
                      </div>
                      <PriorityBadge priority={rest.priority as any} size="sm" />
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      {rest.area && (
                        <span className="px-2.5 py-1 rounded-lg bg-sand/60 border border-line/50 text-text flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal" />
                          {rest.area}
                        </span>
                      )}
                      {rest.budgetLevel && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {rest.budgetLevel}
                        </span>
                      )}
                      {rest.bestTime && (
                        <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rest.bestTime}
                        </span>
                      )}
                    </div>

                    {rest.shortDescription && (
                      <p className="text-sm text-text/90 leading-relaxed bg-sand/30 p-3 rounded-2xl border border-line/30">
                        {rest.shortDescription}
                      </p>
                    )}

                    {/* Served Dishes */}
                    {servedDishes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          <span>相关推荐美食:</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {servedDishes.map((dish) => (
                            <span
                              key={dish.id}
                              className="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20"
                            >
                              {dish.nameZh}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-line/40 flex flex-wrap gap-3">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Maps 导航</span>
                    </a>
                    {onViewRestaurantOnMap && (
                      <button
                        onClick={() => onViewRestaurantOnMap(rest.id)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sand hover:bg-line text-text font-bold text-xs sm:text-sm border border-line transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5 text-teal" />
                        <span>地图定位</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Restaurant Details Modal */}
      <RestaurantModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onViewOnMap={onViewRestaurantOnMap}
      />
    </div>
  );
};
