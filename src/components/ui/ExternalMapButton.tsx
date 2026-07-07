import React from "react";
import { ExternalLink, Navigation } from "lucide-react";
import type { Place } from "../../types";
import { googleMapsDirectionsUrl, googleMapsUrl } from "../../utils/googleMaps";

interface ExternalMapButtonProps {
  place: Place;
  type?: "search" | "directions";
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "compact";
  label?: string;
}

export const ExternalMapButton: React.FC<ExternalMapButtonProps> = ({
  place,
  type = "search",
  className = "",
  variant = "primary",
  label,
}) => {
  const url =
    type === "directions" ? googleMapsDirectionsUrl(place) : googleMapsUrl(place);

  const defaultLabel = type === "directions" ? "路线导航" : "打开 Google Maps";
  const displayLabel = label || defaultLabel;

  const variantClasses = {
    primary:
      "bg-teal text-white hover:bg-teal-light shadow-sm px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
    secondary:
      "bg-sand/60 text-text hover:bg-sand px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
    outline:
      "border border-line/80 bg-card hover:bg-sand/30 text-text px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
    compact:
      "text-teal hover:text-teal-light underline underline-offset-2 text-xs font-medium inline-flex items-center gap-1 transition-colors",
  };

  const Icon = type === "directions" ? Navigation : ExternalLink;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${variantClasses[variant]} ${className}`}
      title={displayLabel}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{displayLabel}</span>
    </a>
  );
};
