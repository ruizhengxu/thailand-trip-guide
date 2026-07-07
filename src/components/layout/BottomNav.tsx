import React from "react";
import { Compass, Luggage, Map, MapPin, Sparkles, Utensils } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: "home", label: "首页", icon: Compass },
    { id: "map", label: "地图", icon: Map },
    { id: "routes", label: "路线", icon: MapPin },
    { id: "places", label: "地点", icon: Sparkles },
    { id: "food", label: "美食", icon: Utensils },
    { id: "prep", label: "准备", icon: Luggage },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-nav transition-all duration-200">
      <div className="grid grid-cols-6 h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 relative py-1 rounded-2xl ${
                active ? "text-teal font-extrabold bg-teal/10 scale-105" : "text-muted hover:text-text"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  active ? "scale-110 text-teal drop-shadow-sm" : "text-muted"
                }`}
              />
              <span className="text-[11px] leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
      {/* iOS safe area bottom padding */}
      <div className="h-safe-area-inset-bottom bg-card/95" />
    </nav>
  );
};
