import { allAnchorsWithFood } from "./allAnchorsWithFood";
import type { Place } from "../types";

export const places: readonly Place[] = allAnchorsWithFood as unknown as readonly Place[];
