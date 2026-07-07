import type { Place, Priority, Region } from "../types";

export function normalizeCategory(cat: string = "", kind?: string): string {
  if (kind === "restaurant" || cat.includes("泰餐") || cat.includes("夜宵") || cat.includes("小吃") || cat.includes("海鲜") || cat.includes("咖啡") || cat.includes("甜品") || cat.includes("打抛饭") || cat.includes("海南鸡饭") || cat.includes("福建面") || cat.includes("船面") || cat.includes("Mango") || cat.includes("Mama") || cat.includes("Bib") || cat.includes("餐厅") || cat.includes("餐饮")) {
    if (cat.includes("海鲜")) return "海鲜大餐";
    if (cat.includes("夜市") || cat.includes("小吃") || cat.includes("快餐") || cat.includes("美食街") || cat.includes("面") || cat.includes("鸡饭") || cat.includes("夜宵")) return "夜市与地道小吃";
    if (cat.includes("咖啡") || cat.includes("甜品") || cat.includes("泰奶") || cat.includes("糯米饭") || cat.includes("冰淇淋") || cat.includes("酒吧") || cat.includes("轻食") || cat.includes("早餐") || cat.includes("夜生活")) return "咖啡甜品与轻食";
    return "浪漫泰餐与景观餐厅";
  }
  if (cat.includes("寺庙") || cat.includes("祈福") || cat.includes("佛像") || cat.includes("郑王庙") || cat.includes("大皇宫")) return "寺庙与祈福";
  if (cat.includes("海滩") || cat.includes("海湾") || cat.includes("沙洲") || cat.includes("海岛") || cat.includes("邻岛")) return "海滩与岛屿度假";
  if (cat.includes("日落") || cat.includes("观景") || cat.includes("高空") || cat.includes("夜景") || cat.includes("展望台")) return "高空与绝美日落";
  if (cat.includes("商圈") || cat.includes("商场") || cat.includes("购物") || cat.includes("市场")) return "商圈购物与繁华街区";
  if (cat.includes("交通") || cat.includes("机场") || cat.includes("码头") || cat.includes("转船") || cat.includes("出海") || cat.includes("包车") || cat.includes("私人船") || cat.includes("补给")) return "交通驳接与出海路线";
  return "特色地标与文化体验";
}

export function filterPlaces(
  places: readonly Place[],
  options: {
    region?: Region | "all";
    priorities?: Priority[];
    category?: string | string[] | "all";
    routeId?: string | string[];
    searchQuery?: string;
    onlyFavorites?: boolean;
    favoritesList?: string[];
  }
): Place[] {
  return places.filter((place) => {
    // Region filter
    if (options.region && options.region !== "all" && place.region !== options.region) {
      return false;
    }

    // Priority filter
    if (options.priorities && options.priorities.length > 0) {
      if (!options.priorities.includes(place.priority)) {
        return false;
      }
    }

    // Category filter
    if (options.category && options.category !== "all") {
      const targetCats = Array.isArray(options.category) ? options.category : [options.category];
      if (targetCats.length > 0) {
        const normalized = normalizeCategory(place.category, place.kind);
        const matchesAny = targetCats.some((targetCat) => {
          return targetCat === normalized || place.category.includes(targetCat) || targetCat.includes(place.category);
        });
        if (!matchesAny) {
          return false;
        }
      }
    }

    // Route filter
    if (options.routeId && options.routeId !== "all") {
      const targetRoutes = Array.isArray(options.routeId) ? options.routeId : [options.routeId];
      if (targetRoutes.length > 0) {
        const matchesAnyRoute = targetRoutes.some((rid) => place.routeIds.includes(rid));
        if (!matchesAnyRoute) {
          return false;
        }
      }
    }

    // Favorites filter
    if (options.onlyFavorites && options.favoritesList) {
      if (!options.favoritesList.includes(place.id)) {
        return false;
      }
    }

    // Search query filter
    if (options.searchQuery && options.searchQuery.trim() !== "") {
      const q = options.searchQuery.toLowerCase().trim();
      const matchNameZh = place.nameZh?.toLowerCase().includes(q) || false;
      const matchNameEn = place.nameEn?.toLowerCase().includes(q) || false;
      const matchDisplay = place.displayName?.toLowerCase().includes(q) || false;
      const matchDesc = place.shortDescription?.toLowerCase().includes(q) || false;
      const matchNotes = place.notes?.some((n) => n.toLowerCase().includes(q)) || false;
      const matchId = place.id?.toLowerCase().includes(q) || false;
      const matchCat = place.category?.toLowerCase().includes(q) || false;
      const matchNormCat = normalizeCategory(place.category, place.kind).toLowerCase().includes(q) || false;

      if (!matchNameZh && !matchNameEn && !matchDisplay && !matchDesc && !matchNotes && !matchId && !matchCat && !matchNormCat) {
        return false;
      }
    }

    return true;
  });
}

export function getUniqueCategories(places: readonly Place[]): string[] {
  const catSet = new Set<string>();
  places.forEach((p) => {
    catSet.add(normalizeCategory(p.category, p.kind));
  });
  return Array.from(catSet).sort();
}
