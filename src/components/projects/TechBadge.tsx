import React from "react";
import { motion } from "framer-motion";
import { Technology } from "./types";

interface TechBadgeProps {
  tech: Technology;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const Icon = tech.icon;

  return (
    <motion.div
      className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.05] hover:bg-black/60 hover:border-[#12b886]/30 transition-all duration-300 group/badge"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-3.5 h-3.5 text-[#12b886] opacity-80 group-hover/badge:opacity-100 transition-opacity" />
      <span className="text-xs font-medium text-white/60 group-hover/badge:text-white transition-colors">
        {tech.label}
      </span>
    </motion.div>
  );
};
