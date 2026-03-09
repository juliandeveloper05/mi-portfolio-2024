import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  rounded = "rounded-2xl",
  className = "",
}) => {
  return (
    <div
      className={`skeleton-shimmer ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
