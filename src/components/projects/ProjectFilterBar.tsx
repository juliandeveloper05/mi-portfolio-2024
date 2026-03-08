import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { FiSearch, FiX } from "react-icons/fi";
import { ProjectCategory } from "./types";

const CATEGORIES: ("all" | ProjectCategory)[] = [
  "all",
  "web",
  "mobile",
  "ai",
  "consulting",
];

interface ProjectFilterBarProps {
  activeCategory: "all" | ProjectCategory;
  onCategoryChange: (category: "all" | ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProjectFilterBar = React.memo(function ProjectFilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProjectFilterBarProps) {
  const { t } = useTranslation("projects");

  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* Category pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                transition-all duration-200 ease-out
                ${
                  isActive
                    ? "bg-[var(--theme-accent)] text-white shadow-md shadow-[var(--theme-accent)]/20"
                    : "bg-[var(--theme-surface-1)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:bg-[var(--theme-surface-2)] hover:text-[var(--theme-text)]"
                }
              `}
            >
              {t(`filters.${category}`)}
            </button>
          );
        })}
      </div>

      {/* Search input */}
      <div className="relative w-full md:w-64">
        <label htmlFor="project-search" className="sr-only">
          {t("filters.search_placeholder")}
        </label>
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text-muted)]" />
        <input
          id="project-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("filters.search_placeholder")}
          className="
            w-full pl-9 pr-9 py-2 rounded-full text-sm
            bg-[var(--theme-surface-1)] backdrop-blur-sm
            border border-[var(--theme-border)]
            text-[var(--theme-text)]
            placeholder:text-[var(--theme-input-placeholder)]
            focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/30 focus:border-[var(--theme-accent)]/50
            transition-all duration-200
          "
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
});
