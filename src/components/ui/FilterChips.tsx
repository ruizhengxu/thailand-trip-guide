import React from "react";

export interface ChipOption<T> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  badge?: number | string;
  colorClass?: string;
}

interface FilterChipsProps<T> {
  options: ChipOption<T>[];
  selected: T | T[];
  onChange: (value: T | T[]) => void;
  multiSelect?: boolean;
  className?: string;
  allowEmpty?: boolean;
}

export function FilterChips<T extends string | number>({
  options,
  selected,
  onChange,
  multiSelect = false,
  className = "",
  allowEmpty = true,
}: FilterChipsProps<T>) {
  const isSelected = (val: T) => {
    if (Array.isArray(selected)) {
      return selected.includes(val);
    }
    return selected === val;
  };

  const handleSelect = (val: T) => {
    if (multiSelect) {
      const current = Array.isArray(selected) ? [...selected] : [];
      if (current.includes(val)) {
        if (!allowEmpty && current.length === 1) return;
        onChange(current.filter((item) => item !== val));
      } else {
        onChange([...current, val]);
      }
    } else {
      onChange(val);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      {options.map((opt) => {
        const active = isSelected(opt.value);
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`chip ${
              active
                ? opt.colorClass
                  ? `${opt.colorClass} shadow-sm font-semibold`
                  : "chip-active font-semibold"
                : "chip-inactive"
            }`}
          >
            {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] leading-tight ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-sand/60 text-muted font-normal"
                }`}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
