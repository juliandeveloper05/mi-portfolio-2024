import React from 'react';
import { motion } from 'framer-motion';

interface SpotlightEffectProps {
  x: number;
  y: number;
  opacity: number;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({ x, y, opacity }) => {
  return (
    <motion.div
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-30"
      animate={{ opacity }}
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`,
      }}
    />
  );
};
