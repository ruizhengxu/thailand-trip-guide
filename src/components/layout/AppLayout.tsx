import React from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text selection:bg-teal selection:text-white transition-colors duration-300">
      <Header activeTab={activeTab} onTabChange={onTabChange} isDark={isDark} onToggleTheme={onToggleTheme} />
      
      {/* Main content area with padding at bottom on mobile for BottomNav */}
      <main className="flex-1 pb-20 md:pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {children}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Desktop footer */}
      <footer className="hidden md:block py-6 border-t border-line/40 text-center text-xs text-muted">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
          <span className="font-semibold tracking-wider">Rémi & Catarina 2026 Thailand Trip</span>
        </div>
      </footer>
    </div>
  );
};
