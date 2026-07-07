import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "搜索地点、中英文名称、路线或关键词...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-card/90 border border-line/80 rounded-xl text-text placeholder-muted/70 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal shadow-sm transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-text transition-colors"
          aria-label="清除搜索"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
