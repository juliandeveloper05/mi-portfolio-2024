import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: string | number;
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "100%",
  from = "bottom",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.2,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const controls = useAnimation();

  const getInitialPosition = () => {
    const distance = 75;
    switch (from) {
      case "top":
        return { y: -distance, opacity: 0 };
      case "bottom":
        return { y: distance, opacity: 0 };
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (from) {
      case "top":
      case "bottom":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getFinalPosition());
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={controls}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1], // Custom easing function
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
