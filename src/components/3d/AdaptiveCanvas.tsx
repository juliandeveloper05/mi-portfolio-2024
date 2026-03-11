import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

interface AdaptiveCanvasProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const AdaptiveCanvas: React.FC<AdaptiveCanvasProps> = ({
  children,
  className = "",
  style,
}) => {
  const quality = useAdaptiveQuality();

  return (
    <Canvas
      className={className}
      style={style}
      dpr={quality.pixelRatio}
      gl={{
        antialias: quality.antialias,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 60, near: 0.1, far: 100 }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AdaptiveCanvas;
