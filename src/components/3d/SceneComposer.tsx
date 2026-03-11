import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import Skeleton from "@/components/skeleton";

// Dynamic imports for 3D scenes (no SSR)
const TerrainHeroCanvas = dynamic(() => import("./TerrainHero"), { ssr: false });
const SkillsGlobeCanvas = dynamic(() => import("./SkillsGlobe"), { ssr: false });
const ProjectShowcase3DCanvas = dynamic(() => import("./ProjectShowcase3D"), { ssr: false });

// 2D Fallbacks
import TerrainFallback2D from "./TerrainFallback2D";
import SkillsGlobeFallback2D from "./SkillsGlobeFallback2D";

interface SceneComposerProps {
  activeScene: "terrain" | "skills" | "projects" | null;
  className?: string;
}

const SceneComposer: React.FC<SceneComposerProps> = ({ activeScene, className }) => {
  const { shouldRender3D } = useDeviceCapability();

  if (!activeScene) return null;

  if (!shouldRender3D) {
    switch (activeScene) {
      case "terrain":
        return <TerrainFallback2D />;
      case "skills":
        return <SkillsGlobeFallback2D />;
      case "projects":
        return null; // Uses existing 2D grid
      default:
        return null;
    }
  }

  return (
    <Suspense fallback={<Skeleton height="400px" rounded="rounded-none" />}>
      <div className={className}>
        {activeScene === "terrain" && <TerrainHeroCanvas />}
        {activeScene === "skills" && <SkillsGlobeCanvas />}
        {activeScene === "projects" && <ProjectShowcase3DCanvas />}
      </div>
    </Suspense>
  );
};

export default SceneComposer;
