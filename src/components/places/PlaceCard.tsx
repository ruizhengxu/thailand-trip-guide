import React from "react";
import type { Place } from "../../types";
import { PriorityBadge } from "../ui/PriorityBadge";
import { FavoriteButton } from "../ui/FavoriteButton";
import { CheckInButton } from "../ui/CheckInButton";
import { ExternalMapButton } from "../ui/ExternalMapButton";
import { getPlaceImage } from "../../utils/images";
import { normalizeCategory } from "../../utils/filters";
import { Clock, MapPin } from "lucide-react";

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  isVisited?: boolean;
  onToggleVisited?: (id: string, e: React.MouseEvent) => void;
  onSelect: (place: Place) => void;
  compact?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isFavorite,
  onToggleFavorite,
  isVisited = false,
  onToggleVisited,
  onSelect,
  compact = false,
}) => {
  const imageUrl = getPlaceImage(place, true);

  const regionNames: Record<string, string> = {
    bangkok: "曼谷",
    phuket: "普吉岛",
    "koh-yao-yai": "瑶亚岛",
  };

  return (
    <div
      onClick={() => onSelect(place)}
      className="glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-line/80 relative"
    >
      {/* Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-sand/40">
        <img
          src={imageUrl}
          alt={place.displayName || place.nameZh}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <PriorityBadge priority={place.priority} size="sm" solid className="shadow-xs pointer-events-auto" />
          <div className="pointer-events-auto flex items-center gap-1.5">
            {onToggleVisited && (
              <CheckInButton
                isVisited={!!isVisited}
                onToggle={(e) => onToggleVisited(place.id, e)}
                size="sm"
              />
            )}
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={(e) => onToggleFavorite(place.id, e)}
              size="sm"
            />
          </div>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-teal-100" />
            <span>{regionNames[place.region] || place.region}</span>
          </span>
          <span className="bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 font-mono text-[11px]">
            {place.id}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-md">
              {normalizeCategory(place.category, place.kind)}
            </span>
            {place.bestTime && !compact && (
              <span className="text-[11px] text-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-orange" />
                <span>{place.bestTime}</span>
              </span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg text-text group-hover:text-teal transition-colors line-clamp-1 mb-1 font-sans">
            {place.displayName || place.nameZh}
          </h3>

          {place.nameEn && place.nameEn !== place.displayName && (
            <p className="text-xs text-muted font-normal line-clamp-1 mb-2 italic">
              {place.nameEn}
            </p>
          )}

          <p className="text-xs sm:text-sm text-text/80 line-clamp-2 mb-3 leading-relaxed">
            {place.shortDescription}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-line/50 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-teal group-hover:underline flex items-center gap-1">
            <span>查看详情</span>
            <span className="text-sm">→</span>
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <ExternalMapButton place={place} variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};
