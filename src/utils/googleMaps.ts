import type { Place } from "../types";

export function googleMapsUrl(place: Place | { googleMapsQuery: string }): string {
  if (!place.googleMapsQuery) {
    return "https://www.google.com/maps";
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.googleMapsQuery)}`;
}

export function googleMapsDirectionsUrl(place: Place): string {
  if (!place.googleMapsQuery) {
    return "https://www.google.com/maps";
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.googleMapsQuery)}`;
}

export function googleMapsMultiRouteUrl(places: readonly (Place | { googleMapsQuery: string })[]): string {
  if (!places || places.length === 0) return "https://www.google.com/maps";
  if (places.length === 1) return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(places[0].googleMapsQuery)}`;

  const origin = encodeURIComponent(places[0].googleMapsQuery);
  const destination = encodeURIComponent(places[places.length - 1].googleMapsQuery);
  if (places.length === 2) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }

  const waypoints = places
    .slice(1, places.length - 1)
    .map((p) => encodeURIComponent(p.googleMapsQuery))
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
}
