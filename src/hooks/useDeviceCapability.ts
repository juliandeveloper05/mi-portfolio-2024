import { useState, useEffect } from "react";

interface DeviceCapability {
  isMobile: boolean;
  gpuTier: number; // 0 = no WebGL, 1 = low, 2 = mid, 3 = high
  prefersReducedMotion: boolean;
  memoryGB: number;
  shouldRender3D: boolean;
}

function detectGPUTier(): number {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return 0;

    const debugExt = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugExt) {
      const renderer = gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL).toLowerCase();
      // High-end GPUs
      if (/nvidia|geforce|rtx|gtx|radeon rx|apple gpu|apple m[1-9]/.test(renderer)) return 3;
      // Mid-tier
      if (/intel iris|intel uhd|radeon|adreno 6|mali-g7/.test(renderer)) return 2;
    }
    // Check max texture size as fallback
    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if (maxTexture >= 16384) return 3;
    if (maxTexture >= 8192) return 2;
    return 1;
  } catch {
    return 0;
  }
}

function detectMemory(): number {
  if (typeof navigator !== "undefined" && "deviceMemory" in navigator) {
    return (navigator as { deviceMemory: number }).deviceMemory || 4;
  }
  return 4; // default assumption
}

function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isSmallScreen = window.innerWidth < 768;
  const isTouchOnly = "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches;
  return isMobileUA || (isSmallScreen && isTouchOnly);
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isMobile: false,
    gpuTier: 2,
    prefersReducedMotion: false,
    memoryGB: 4,
    shouldRender3D: false, // default false until client-side check
  });

  useEffect(() => {
    const isMobile = detectMobile();
    const gpuTier = detectGPUTier();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const memoryGB = detectMemory();
    const shouldRender3D = !isMobile && gpuTier >= 2 && !prefersReducedMotion;

    setCapability({ isMobile, gpuTier, prefersReducedMotion, memoryGB, shouldRender3D });
  }, []);

  return capability;
}
