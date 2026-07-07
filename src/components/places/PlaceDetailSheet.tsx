import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Place } from "../../types";
import { PriorityBadge } from "../ui/PriorityBadge";
import { FavoriteButton } from "../ui/FavoriteButton";
import { CheckInButton } from "../ui/CheckInButton";
import { ExternalMapButton } from "../ui/ExternalMapButton";
import { getPlaceImage } from "../../utils/images";
import { normalizeCategory } from "../../utils/filters";
import { BookOpen, CheckCircle2, Clock, MapPin, Sparkles, X } from "lucide-react";
import { placeDescriptions } from "../../data/placeDescriptions";

interface PlaceDetailSheetProps {
  place: Place | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  isVisited?: boolean;
  onToggleVisited?: (id: string, e: React.MouseEvent) => void;
}

export const PlaceDetailSheet: React.FC<PlaceDetailSheetProps> = ({
  place,
  onClose,
  isFavorite,
  onToggleFavorite,
  isVisited = false,
  onToggleVisited,
}) => {
  const [renderedPlace, setRenderedPlace] = useState<Place | null>(place);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (place) {
      setRenderedPlace(place);
      setIsClosing(false);
    } else if (renderedPlace) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRenderedPlace(null);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [place]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (renderedPlace && !isClosing) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderedPlace, isClosing]);

  if (!renderedPlace) return null;

  const activePlace = renderedPlace;
  const imageUrl = getPlaceImage(activePlace, false);
  const regionNames: Record<string, string> = {
    bangkok: "曼谷 Bangkok",
    phuket: "普吉岛 Phuket",
    "koh-yao-yai": "瑶亚岛 Santhiya",
  };

  return createPortal(
    <div className={`fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Sheet Container */}
      <div className={`relative z-10 w-full max-w-none sm:max-w-2xl bg-card rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-white/20 h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden ${isClosing ? "animate-pop-out" : "animate-pop-in"}`}>
        {/* Top Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-sand/40 flex-shrink-0">
          <img
            src={imageUrl}
            alt={activePlace.displayName || activePlace.nameZh}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all"
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Left Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-100" />
              <span>{regionNames[activePlace.region] || activePlace.region}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-mono text-xs border border-white/20">
              {activePlace.id}
            </span>
          </div>

          {/* Bottom Title Area */}
          <div className="absolute bottom-4 inset-x-5 text-white flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <PriorityBadge priority={activePlace.priority} size="sm" />
                <span className="bg-teal px-2 py-0.5 rounded text-[11px] font-semibold text-white">
                  {normalizeCategory(activePlace.category, activePlace.kind)}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans">
                {activePlace.displayName || activePlace.nameZh}
              </h2>
              {activePlace.nameEn && (
                <p className="text-sm text-sand/80 font-normal italic mt-0.5">
                  {activePlace.nameEn}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onToggleVisited && activePlace && (
                <CheckInButton
                  isVisited={!!isVisited}
                  onToggle={(e) => onToggleVisited(activePlace.id, e)}
                  size="lg"
                  withLabel
                />
              )}
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={(e) => onToggleFavorite(activePlace.id, e)}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Quick Info Bar */}
          <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-sand/30 border border-line/60 text-xs sm:text-sm">
            {activePlace.bestTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal flex-shrink-0" />
                <span>
                  <strong className="text-text font-semibold">推荐时间：</strong>
                  <span className="text-muted">{activePlace.bestTime}</span>
                </span>
              </div>
            )}
            {activePlace.routeIds && activePlace.routeIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange flex-shrink-0" />
                <span>
                  <strong className="text-text font-semibold">所属路线：</strong>
                  <span className="text-muted">{activePlace.routeIds.join(", ")}</span>
                </span>
              </div>
            )}
          </div>

          {/* Background / Wiki Introduction */}
          {(placeDescriptions[activePlace.id] || activePlace.description) && (
            <div className="p-4 sm:p-5 rounded-2xl bg-teal/10 border border-teal/20 text-text space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-teal font-bold text-xs sm:text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                <span>景点背景与百科 · About</span>
              </div>
              <p className="text-sm sm:text-base text-text leading-relaxed font-normal">
                {placeDescriptions[activePlace.id] || activePlace.description}
              </p>
            </div>
          )}

          {/* Short Description */}
          <div>
            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">
              核心特点 · Overview
            </h3>
            <p className="text-base text-text leading-relaxed font-medium">
              {activePlace.shortDescription}
            </p>
          </div>

          {/* Notes & Tips */}
          {activePlace.notes && activePlace.notes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">
                达人秘籍与避坑须知 · Pro Tips
              </h3>
              <div className="space-y-2.5">
                {activePlace.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-line/80 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-text/90 leading-relaxed">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Google Maps query */}
          {activePlace.googleMapsQuery && (
            <div className="p-4 rounded-2xl bg-teal/5 border border-teal/20">
              <h4 className="text-xs font-bold text-teal uppercase tracking-wider mb-1">
                Google Maps 搜索词 / 坐标
              </h4>
              <code className="text-xs sm:text-sm text-text bg-white/60 dark:bg-black/20 px-2 py-1 rounded select-all block break-all font-mono">
                {activePlace.googleMapsQuery}
              </code>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-line/60 bg-sand/20 flex flex-wrap items-center justify-end gap-3 flex-shrink-0">
          <button
            onClick={handleClose}
            className="btn-secondary text-sm py-2.5 px-5"
          >
            关闭
          </button>
          <ExternalMapButton
            place={activePlace}
            type="search"
            variant="primary"
            className="py-2.5 px-5 text-sm"
          />
          <ExternalMapButton
            place={activePlace}
            type="directions"
            variant="outline"
            className="py-2.5 px-5 text-sm"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
