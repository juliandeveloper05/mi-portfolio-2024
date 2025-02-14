// src/components/cards/featured/featured-card.tsx
import { FC, ReactNode } from "react";
import Video from "./video";

interface FeaturedCardProps {
  logo?: ReactNode;
  title: string;
  tag: string;
  video: string;
  active: boolean;
}

const FeaturedCard: FC<FeaturedCardProps> = ({
  logo,
  title,
  tag,
  video,
  active,
}) => {
  return (
    <div className="link w-full h-full bg-secondary-background border border-border shadow-lg rounded-3xl cursor-pointer">
      <div className="relative h-full overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between text-white">
          <div className="flex items-start justify-between">
            {logo && <div>{logo}</div>}
            <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
              {tag}
            </span>
          </div>
          <h3 className="text-2xl font-bold z-10">{title}</h3>
        </div>
        <Video video={video} active={active} />
      </div>
    </div>
  );
};

export default FeaturedCard;
