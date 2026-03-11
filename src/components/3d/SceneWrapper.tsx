import React, { Suspense } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import Skeleton from "@/components/skeleton";

interface SceneWrapperProps {
  scene3D: React.ReactNode;
  fallback2D: React.ReactNode;
  className?: string;
  loadingHeight?: string;
}

const SceneWrapper: React.FC<SceneWrapperProps> = ({
  scene3D,
  fallback2D,
  className = "",
  loadingHeight = "100%",
}) => {
  const { shouldRender3D } = useDeviceCapability();

  return (
    <div className={className}>
      {shouldRender3D ? (
        <Suspense fallback={<Skeleton height={loadingHeight} rounded="rounded-none" />}>
          {scene3D}
        </Suspense>
      ) : (
        fallback2D
      )}
    </div>
  );
};

export default SceneWrapper;
