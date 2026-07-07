import React from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { TripCountdown } from "./TripCountdown";

interface HeroCardProps {
  onNavigate?: (tab: string) => void;
}

export const HeroCard: React.FC<HeroCardProps> = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-dark via-teal to-[#0f3d3a] text-white shadow-floating border border-white/10 p-6 sm:p-10 md:p-12">
      {/* Decorative background glow & circles */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-light/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-orange-light mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Rémi & Catarina · 2026 泰国浪漫之旅</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans leading-tight mb-6">
          Rémi & Catarina 2026 Thailand Trip
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-medium text-sand/90">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 text-orange-light" />
            <span>10–23 August 2026</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
            <MapPin className="w-4 h-4 text-teal-100" />
            <span>Bangkok + Phuket + Koh Yao Yai</span>
          </div>
        </div>

        {/* Live Trip Countdown / Elapsed Time Dashboard */}
        <TripCountdown />
      </div>
    </div>
  );
};
