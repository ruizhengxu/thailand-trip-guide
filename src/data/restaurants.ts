import { allAnchorsWithFood } from "./allAnchorsWithFood";
import type { Place } from "../types";

export const restaurants: readonly Place[] = allAnchorsWithFood.filter(
  (item) => item.kind === "restaurant"
) as unknown as readonly Place[];
