"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Props for the WaterWaveWrapper component
 */
export interface WaterWaveWrapperProps {
  /**
   * The URL of the image to use as the background
   */
  imageUrl: string;

  /**
   * The size (in pixels) of the drop that results by clicking or moving the mouse
   * @default 20
   */
  dropRadius?: number;

  /**
   * The amount of refraction caused by a ripple (0 means no refraction)
   * @default 0.3
   */
  perturbance?: number;

  /**
   * The width and height of the WebGL texture to render to
   * @default 256
   */
  resolution?: number;

  /**
   * Child components to render inside the water wave effect
   */
  children?: React.ReactNode;
}

/**
 * Props for the underlying WaterWave component from react-water-wave
 */
interface WaterWaveProps {
  imageUrl: string;
  dropRadius?: number;
  perturbance?: number;
  resolution?: number;
  children: (methods: {
    pause: () => void;
    play: () => void;
    hide: () => void;
    show: () => void;
    drop: (params: {
      x: number;
      y: number;
      radius?: number;
      strength?: number;
    }) => void;
    destroy: () => void;
    set: (property: string, value: any) => void;
  }) => React.ReactElement;
}

/**
 * Type import for react-water-wave
 */
import type { ComponentType } from "react";
import type WaterWaveComponent from "react-water-wave";
type WaterWaveType = ComponentType<WaterWaveProps>;

// Dynamically import WaterWave to prevent SSR issues
const WaterWave: WaterWaveType = dynamic<WaterWaveProps>(
  () => import("react-water-wave"),
  {
    ssr: false,
  }
);
/**
 * A wrapper component that applies a water wave effect to its children
 * Only renders the effect on desktop devices
 */
const WaterWaveWrapper: React.FC<WaterWaveWrapperProps> = ({
  imageUrl,
  dropRadius = 20,
  perturbance = 0.3,
  resolution = 256,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const checkIfDesktop = () => {
      const width = window.innerWidth;
      const mobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsDesktop(width >= 768 && !mobileDevice);
    };

    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);

    return () => {
      window.removeEventListener("resize", checkIfDesktop);
    };
  }, []);

  if (!isMounted || !isDesktop || !imageUrl) {
    return <>{children}</>;
  }

  return (
    <WaterWave
      imageUrl={imageUrl}
      dropRadius={dropRadius}
      perturbance={perturbance}
      resolution={resolution}
    >
      {(methods) => (
        <div className="water-wave-container relative w-full h-full">
          {children}
        </div>
      )}
    </WaterWave>
  );
};

export default WaterWaveWrapper;
