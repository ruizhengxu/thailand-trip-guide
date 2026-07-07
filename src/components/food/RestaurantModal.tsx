import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Place } from "../../types";
import { X, ExternalLink, MapPin, Clock, DollarSign, Info, Compass } from "lucide-react";

interface RestaurantModalProps {
  restaurant: Place | null;
  onClose: () => void;
  onViewOnMap?: (restaurantId: string) => void;
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurant,
  onClose,
  onViewOnMap,
}) => {
  const [renderedRestaurant, setRenderedRestaurant] = useState<Place | null>(restaurant);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setRenderedRestaurant(restaurant);
      setIsClosing(false);
    } else if (renderedRestaurant) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRenderedRestaurant(null);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [restaurant]);

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
    if (renderedRestaurant && !isClosing) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderedRestaurant, isClosing]);

  if (!renderedRestaurant) return null;

  const activeRestaurant = renderedRestaurant;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activeRestaurant.googleMapsQuery || activeRestaurant.nameEn || activeRestaurant.nameZh
  )}`;

  return createPortal(
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      <div
        className={`relative w-full max-w-none sm:max-w-lg overflow-hidden rounded-none sm:rounded-3xl bg-card border-0 sm:border sm:border-white/20 shadow-2xl h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col ${isClosing ? "animate-pop-out" : "animate-pop-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative h-28 bg-gradient-to-br from-amber-500/80 via-rose-500/80 to-teal/80 p-6 flex items-end justify-between text-white flex-shrink-0">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-semibold mb-1 uppercase tracking-wider">
              {activeRestaurant.region === "bangkok"
                ? "曼谷 Bangkok"
                : activeRestaurant.region === "phuket"
                ? "普吉岛 Phuket"
                : "瑶亚岛 Koh Yao Yai"}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
              {activeRestaurant.nameZh}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">
              {activeRestaurant.nameEn}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin flex-1">
          {/* Info Tags */}
          <div className="flex flex-wrap gap-2">
            {activeRestaurant.area && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand/60 border border-line/50 text-xs font-semibold text-text">
                <MapPin className="w-3.5 h-3.5 text-teal" />
                <span>位置: {activeRestaurant.area}</span>
              </div>
            )}
            {activeRestaurant.budgetLevel && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                <span>消费水平: {activeRestaurant.budgetLevel}</span>
              </div>
            )}
            {activeRestaurant.bestTime && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                <span>最佳时段: {activeRestaurant.bestTime}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {activeRestaurant.shortDescription && (
            <div className="p-4 rounded-2xl bg-sand/40 border border-line/40">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-muted uppercase tracking-wider">
                <Info className="w-4 h-4 text-teal" />
                <span>餐厅特色简介</span>
              </div>
              <p className="text-sm sm:text-base text-text leading-relaxed">
                {activeRestaurant.shortDescription}
              </p>
            </div>
          )}

          {/* Notes */}
          {activeRestaurant.notes && activeRestaurant.notes.length > 0 && (
            <div className="p-4 rounded-2xl bg-teal/5 border border-teal/20 space-y-1.5">
              <span className="text-xs font-bold text-teal block uppercase tracking-wider">
                贴士与注意事项 Tips
              </span>
              <ul className="list-disc list-inside text-xs sm:text-sm text-text/90 space-y-1">
                {activeRestaurant.notes.map((note, idx) => (
                  <li key={idx} className="leading-normal">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <ExternalLink className="w-4 h-4" />
              <span>在 Google Maps 导航</span>
            </a>
            {onViewOnMap && (
              <button
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    onViewOnMap(activeRestaurant.id);
                  }, 50);
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sand hover:bg-line text-text font-bold text-sm border border-line transition-colors"
              >
                <Compass className="w-4 h-4 text-teal" />
                <span>地图中查看点位</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
