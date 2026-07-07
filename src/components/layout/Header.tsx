import React from "react";
import { Compass, Heart, Luggage, Map, MapPin, Moon, Sparkles, Sun, Utensils } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, isDark, onToggleTheme }) => {
  const navItems = [
    { id: "home", label: "首页", icon: <Compass className="w-4 h-4" /> },
    { id: "map", label: "地图", icon: <Map className="w-4 h-4" /> },
    { id: "routes", label: "路线", icon: <MapPin className="w-4 h-4" /> },
    { id: "places", label: "地点", icon: <Sparkles className="w-4 h-4" /> },
    { id: "food", label: "美食", icon: <Utensils className="w-4 h-4" /> },
    { id: "prep", label: "准备", icon: <Luggage className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div
          onClick={() => onTabChange("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-teal flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-text tracking-tight font-sans">
              Our Trip in Thailand
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-sand/40 p-1 rounded-2xl border border-line/50">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? "bg-card text-teal font-semibold shadow-sm border border-line/60"
                    : "text-muted hover:text-text hover:bg-card/30"
                }`}
              >
                <span className={active ? "text-teal" : "text-muted"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-card hover:bg-sand/60 border border-line/60 transition-all duration-200 shadow-sm flex items-center justify-center"
            title={isDark ? "切换为浅色模式" : "切换为深色模式"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-orange animate-fade-in" />
            ) : (
              <Moon className="w-4 h-4 text-teal animate-fade-in" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
