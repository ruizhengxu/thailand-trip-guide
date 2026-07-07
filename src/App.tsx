import React, { useEffect, useState, useRef } from "react";
import { places } from "./data/places";
import { routes } from "./data/routes";
import { timeline } from "./data/timeline";
import { AppLayout } from "./components/layout/AppLayout";
import { HeroCard } from "./components/home/HeroCard";
import { TimelineCard } from "./components/home/TimelineCard";
import { StrategyCards } from "./components/home/StrategyCards";
import { InteractiveMap } from "./components/map/InteractiveMap";
import { RouteListView } from "./components/routes/RouteListView";
import { PlaceListView } from "./components/places/PlaceListView";
import { FoodGuideView } from "./components/food/FoodGuideView";
import { PrepGuideView } from "./components/prep/PrepGuideView";
import { subscribeToFavorites, saveFavoritesToCloud, subscribeToVisited, saveVisitedToCloud } from "./utils/firebase";
import type { Region } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("thailand_trip_favorites");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    // Default favorite recommendations for couples
    return ["bkk-03", "bkk-15", "hkt-03", "hkt-11", "yya-01", "yya-04"];
  });

  const [visited, setVisited] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("thailand_trip_visited");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load visited", e);
    }
    return [];
  });

  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [selectedRouteIdForMap, setSelectedRouteIdForMap] = useState<string | undefined>(undefined);
  const [selectedPlaceIdForMap, setSelectedPlaceIdForMap] = useState<string | undefined>(undefined);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("thailand_trip_theme");
      if (saved !== null) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("thailand_trip_theme", isDark ? "dark" : "light");
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Subscribe to real-time cloud favorites
  useEffect(() => {
    const defaultList = ["bkk-03", "bkk-15", "hkt-03", "hkt-11", "yya-01", "yya-04"];
    const initialList = (() => {
      try {
        const saved = localStorage.getItem("thailand_trip_favorites");
        return saved ? JSON.parse(saved) : defaultList;
      } catch {
        return defaultList;
      }
    })();

    const unsubscribe = subscribeToFavorites((cloudFavorites) => {
      setFavorites(cloudFavorites);
    }, initialList);

    return () => unsubscribe();
  }, []);

  // Save favorites to localStorage as offline backup
  useEffect(() => {
    try {
      localStorage.setItem("thailand_trip_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveFavoritesToCloud(next);
      return next;
    });
  };

  // Subscribe to real-time cloud visited places
  useEffect(() => {
    const initialVisited = (() => {
      try {
        const saved = localStorage.getItem("thailand_trip_visited");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    })();

    const unsubscribe = subscribeToVisited((cloudVisited) => {
      setVisited(cloudVisited);
    }, initialVisited);

    return () => unsubscribe();
  }, []);

  // Save visited to localStorage as offline backup
  useEffect(() => {
    try {
      localStorage.setItem("thailand_trip_visited", JSON.stringify(visited));
    } catch (e) {
      console.error("Failed to save visited", e);
    }
  }, [visited]);

  const handleToggleVisited = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVisited((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveVisitedToCloud(next);
      return next;
    });
  };

  const scrollPositions = useRef<Record<string, number>>({});

  const switchTab = (newTab: string) => {
    if (newTab === activeTab) return;
    scrollPositions.current[activeTab] = window.scrollY;
    setActiveTab(newTab);
    setTimeout(() => {
      window.scrollTo(0, scrollPositions.current[newTab] || 0);
      if (newTab === "map") {
        window.dispatchEvent(new Event("resize"));
      }
    }, 10);
  };

  const handleNavigateToMapWithRoute = (routeId: string) => {
    setSelectedRouteIdForMap(routeId);
    switchTab("map");
  };

  const handleSelectRegionFromTimeline = (regionKey: string) => {
    if (regionKey === "bangkok" || regionKey === "phuket" || regionKey === "koh-yao-yai") {
      setSelectedRegion(regionKey);
      switchTab("map");
    }
  };

  const handleNavigateToMapWithRestaurant = (restId: string) => {
    const rest = places.find((p) => p.id === restId);
    if (rest) {
      setSelectedRegion(rest.region);
    }
    setSelectedPlaceIdForMap(restId);
    switchTab("map");
  };

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={switchTab}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
    >
      <div className={activeTab === "home" ? "block space-y-8 animate-view-appear" : "hidden"}>
        <HeroCard onNavigate={switchTab} />
        <TimelineCard
          stages={timeline}
          onSelectRegion={handleSelectRegionFromTimeline}
        />
        <StrategyCards onNavigatePrep={() => switchTab("prep")} />
      </div>

      <div className={activeTab === "map" ? "block" : "hidden"}>
        <InteractiveMap
          places={places}
          routes={routes}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          visited={visited}
          onToggleVisited={handleToggleVisited}
          initialRegion={selectedRegion}
          selectedRouteId={selectedRouteIdForMap}
          onClearRouteId={() => setSelectedRouteIdForMap(undefined)}
          selectedPlaceId={selectedPlaceIdForMap}
          onClearPlaceId={() => setSelectedPlaceIdForMap(undefined)}
        />
      </div>

      <div className={activeTab === "routes" ? "block" : "hidden"}>
        <RouteListView
          routes={routes}
          places={places}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          visited={visited}
          onToggleVisited={handleToggleVisited}
          onViewOnMap={handleNavigateToMapWithRoute}
          initialRegion={selectedRegion}
        />
      </div>

      <div className={activeTab === "places" ? "block" : "hidden"}>
        <PlaceListView
          places={places}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          visited={visited}
          onToggleVisited={handleToggleVisited}
          initialRegion={selectedRegion}
        />
      </div>

      <div className={activeTab === "food" ? "block" : "hidden"}>
        <FoodGuideView
          initialRegion={selectedRegion}
          onViewRestaurantOnMap={handleNavigateToMapWithRestaurant}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          visited={visited}
          onToggleVisited={handleToggleVisited}
        />
      </div>

      <div className={activeTab === "prep" ? "block" : "hidden"}>
        <PrepGuideView />
      </div>
    </AppLayout>
  );
}
