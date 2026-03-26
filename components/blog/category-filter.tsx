"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-8">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="relative group py-2"
        >
          <span
            className={`mono-md transition-colors duration-300 ${
              activeCategory === category 
                ? "text-white" 
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {category}
          </span>
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
