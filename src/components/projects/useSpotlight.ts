import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

/**
 * State interface for the spotlight effect.
 * Includes position (x, y), visibility (opacity), and container dimensions
 * to support both positioning and parallax calculations.
 */
interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
  width: number;
  height: number;
}

/**
 * Custom hook to track mouse position relative to a container element.
 * 
 * Performance Note:
 * This hook uses requestAnimationFrame (rAF) to throttle updates to the 
 * browser's refresh rate (typically 60fps). This avoids the performance 
 * penalty of updating React state on every single 'mousemove' event, 
 * which can fire much more frequently than the screen refreshes.
 *
 * @param cardRef - Reference to the DOM element to track
 * @returns Current spotlight state (x, y, opacity, width, height)
 */
export const useSpotlight = (cardRef: RefObject<HTMLElement | null>) => {
  // Initialize width/height to safe non-zero defaults to avoid division by zero
  const [spotlight, setSpotlight] = useState<SpotlightState>({ 
    x: 0, 
    y: 0, 
    opacity: 0,
    width: 0,
    height: 0
  });
  const requestRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      setSpotlight({ x, y, opacity: 1, width, height });
    });
  }, [cardRef]);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
         const { width, height } = cardRef.current.getBoundingClientRect();
         setSpotlight(prev => ({ ...prev, opacity: 1, width, height }));
    } else {
        setSpotlight(prev => ({ ...prev, opacity: 1 }));
    }
  }, [cardRef]);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Initial size
    const { width, height } = element.getBoundingClientRect();
    setSpotlight(prev => ({ ...prev, width, height }));

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [cardRef, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return spotlight;
};
