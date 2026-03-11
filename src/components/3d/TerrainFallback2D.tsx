import React from "react";
import { motion } from "framer-motion";

const TerrainFallback2D: React.FC = () => {
  return (
    <div className="terrain-fallback absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated gradient background */}
      <div className="absolute inset-0 terrain-gradient" />

      {/* SVG grid lines with perspective */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        style={{ opacity: 0.15 }}
      >
        {/* Horizontal lines with perspective convergence */}
        {Array.from({ length: 15 }, (_, i) => {
          const y = 300 + (i * 25);
          const spread = 1 + i * 0.15;
          return (
            <line
              key={`h-${i}`}
              x1={400 - 400 * spread}
              y1={y}
              x2={400 + 400 * spread}
              y2={y}
              stroke="var(--theme-accent)"
              strokeWidth={0.5 + i * 0.1}
              opacity={0.3 + i * 0.05}
            />
          );
        })}
        {/* Vertical converging lines */}
        {Array.from({ length: 20 }, (_, i) => {
          const x = (i / 19) * 800;
          return (
            <line
              key={`v-${i}`}
              x1={400}
              y1={280}
              x2={x}
              y2={600}
              stroke="var(--theme-accent)"
              strokeWidth={0.5}
              opacity={0.2}
            />
          );
        })}
      </svg>

      {/* Floating CSS particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--theme-accent)]"
            style={{
              left: `${10 + (i * 7.5)}%`,
              top: `${30 + (i % 4) * 15}%`,
              opacity: 0.3 + (i % 3) * 0.15,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TerrainFallback2D;
