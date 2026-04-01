"use client";

import { CATEGORIES } from "@/lib/constants";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-[57px] z-40 w-full border-b border-dr-border bg-dr-bg/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
        <div
          className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.slug)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-dr-pink text-white shadow-lg shadow-dr-pink/20"
                    : "border border-dr-border-hover bg-transparent text-dr-text-muted hover:border-dr-pink hover:text-dr-pink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
