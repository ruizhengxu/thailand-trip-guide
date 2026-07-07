export type Region = "bangkok" | "phuket" | "koh-yao-yai";

export type Priority =
  | "core"
  | "optional"
  | "transport"
  | "remote"
  | "caution";

export interface Place {
  id: string;
  region: Region;
  number: number;
  nameZh: string;
  nameEn: string;
  displayName: string;
  lat: number;
  lng: number;
  category: string;
  priority: Priority;
  priorityZh?: string;
  routeIds: readonly string[];
  shortDescription: string;
  description?: string;
  notes: readonly string[];
  bestTime?: string;
  googleMapsQuery: string;
  image?: string;
  kind?: "place" | "restaurant" | string;
  area?: string;
  budgetLevel?: string;
  coordinatesConfidence?: string;
}

export interface RouteModule {
  id: string;
  region: Region;
  titleZh: string;
  titleEn?: string;
  subtitle: string;
  placeIds: readonly string[];
  duration: string;
  bestTime: string;
  intensity: "easy" | "medium" | "high";
  weatherFit: "sunny" | "rainy" | "flexible";
  whyTogether: string;
  notes: readonly string[];
}

export interface TimelineStage {
  date: string;
  title: string;
  description: string;
}

export interface AppState {
  selectedRegion: Region | "all";
  selectedPriorities: Priority[];
  selectedRouteId?: string;
  selectedPlaceId?: string;
  searchQuery: string;
  favorites: string[];
}

export type FoodType =
  | "dish"
  | "drink"
  | "dessert"
  | "street-food"
  | "seafood"
  | "breakfast"
  | "snack"
  | "dining-experience";

export type FoodPriority =
  | "must-try"
  | "recommended"
  | "optional"
  | "situational";

export interface FoodItem {
  id: string;
  region: Region;
  nameZh: string;
  nameEn: string;
  displayName: string;
  type: FoodType;
  priority: FoodPriority;
  imagePath: string;
  imageAlt: string;
  recommendedRestaurantIds: string[];
  routeIds: string[];
  shortDescription: string;
  whyTry: string;
  tasteProfile: string[];
  bestTime?: string;
  notes: string[];
}
