import { useMemo } from "react";
import { useDeviceCapability } from "./useDeviceCapability";

interface QualitySettings {
  pixelRatio: [number, number];
  particleCount: number;
  terrainSegments: number;
  enablePostProcessing: boolean;
  enableShadows: boolean;
  antialias: boolean;
}

export function useAdaptiveQuality(): QualitySettings {
  const { gpuTier } = useDeviceCapability();

  return useMemo(() => {
    switch (gpuTier) {
      case 3: // High-end
        return {
          pixelRatio: [1, 2] as [number, number],
          particleCount: 500,
          terrainSegments: 128,
          enablePostProcessing: true,
          enableShadows: true,
          antialias: true,
        };
      case 2: // Mid-tier
        return {
          pixelRatio: [1, 1.5] as [number, number],
          particleCount: 250,
          terrainSegments: 80,
          enablePostProcessing: true,
          enableShadows: false,
          antialias: true,
        };
      default: // Low-end or unknown
        return {
          pixelRatio: [1, 1] as [number, number],
          particleCount: 100,
          terrainSegments: 48,
          enablePostProcessing: false,
          enableShadows: false,
          antialias: false,
        };
    }
  }, [gpuTier]);
}
