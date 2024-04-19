import { FC, ReactNode, memo } from "react";
import styled from "styled-components";
import withClientOnly from "./withClientOnly";
import React from "react";

const WaterWave = React.lazy(() => import("react-water-wave"));

interface WaterWaveProps {
  imageUrl: string;
  dropRadius: string;
  perturbance: string;
  resolution: string;
  children: () => ReactNode;
}

interface WaterWaveWrapperProps extends WaterWaveProps {}

const ResponsiveContainer = styled.div`
  @media (max-width: 740px) {
    display: none;
  }
`;

// eslint-disable-next-line react/display-name
const WaterWaveWrapper: FC<WaterWaveWrapperProps> = memo(
  ({ imageUrl, dropRadius, perturbance, resolution, children }) => {
    return (
      <ResponsiveContainer>
        <React.Suspense fallback={<div>Loading...</div>}>
          <WaterWave
            imageUrl={imageUrl}
            dropRadius={dropRadius}
            perturbance={perturbance}
            resolution={resolution}
          >
            {children}
          </WaterWave>
        </React.Suspense>
      </ResponsiveContainer>
    );
  }
);

const WaterWaveWrapperWithClientOnly = withClientOnly(WaterWaveWrapper);

export default WaterWaveWrapperWithClientOnly;
