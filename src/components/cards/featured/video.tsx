// src/components/cards/featured/video.tsx
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const Video = ({ video, active }: { video: string; active: boolean }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (active) {
        videoRef.current.play();
      }
    }
  }, [active]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl">
      <video
        ref={videoRef}
        src={video}
        loop
        muted
        className={cn(
          "w-full h-full object-cover rounded-3xl",
          "transition-all duration-300 ease-in-out",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default Video;
