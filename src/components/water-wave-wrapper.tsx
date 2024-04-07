/**
 * @react.skipNextRefresh true
 */

import { FC, ReactNode, useEffect, useState, lazy, Suspense } from "react";

const WaterWave = lazy(() => import("react-water-wave"));

interface WaterWaveProps {
  imageUrl: string;
  dropRadius: string;
  perturbance: string;
  resolution: string;
  children: () => ReactNode;
}

interface WaterWaveWrapperProps extends WaterWaveProps {}

const WaterWaveWrapper: FC<WaterWaveWrapperProps> = ({
  imageUrl,
  dropRadius,
  perturbance,
  resolution,
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaterWave
        imageUrl={imageUrl}
        dropRadius={dropRadius}
        perturbance={perturbance}
        resolution={resolution}
      >
        {children}
      </WaterWave>
    </Suspense>
  );
};

export default WaterWaveWrapper;
