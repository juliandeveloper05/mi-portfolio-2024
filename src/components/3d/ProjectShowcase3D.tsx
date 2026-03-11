import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment } from "@react-three/drei";
import * as THREE from "three";
import ProjectCard3D from "./ProjectCard3D";
import AdaptiveCanvas from "./AdaptiveCanvas";

// Sample project data - will be replaced by actual data from Projects component
const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with payment integration",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
  },
  {
    title: "Dumu AI Bass Extraction",
    description: "AI-powered audio processing tool for bass isolation",
    technologies: ["Python", "PyTorch", "FastAPI", "React"],
  },
  {
    title: "Portfolio 2024",
    description: "Modern portfolio with 3D effects and animations",
    technologies: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application",
    technologies: ["React Native", "Node.js", "MongoDB", "TypeScript"],
  },
];

const ScrollCameraRig: React.FC = () => {
  const scroll = useScroll();
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (!scroll) return;
    const offset = scroll.offset;

    // Move camera along a path as user scrolls
    const targetZ = 10 - offset * (PROJECTS.length * 5);
    const targetY = 2 + Math.sin(offset * Math.PI) * 1;
    const targetX = Math.sin(offset * Math.PI * 2) * 2;

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    camera.lookAt(0, 0, targetZ - 5);
  });

  return <group ref={cameraGroupRef} />;
};

const ShowcaseScene: React.FC = () => {
  return (
    <ScrollControls pages={PROJECTS.length} damping={0.3}>
      <ScrollCameraRig />
      <Scroll>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />

        {PROJECTS.map((project, i) => {
          // Arrange cards in a spiral path
          const angle = (i / PROJECTS.length) * Math.PI * 2;
          const radius = 3;
          const x = Math.sin(angle) * radius * 0.5;
          const y = 0;
          const z = -i * 5;
          const rotY = Math.sin(angle) * 0.2;

          return (
            <ProjectCard3D
              key={i}
              position={[x, y, z]}
              rotation={[0, rotY, 0]}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              index={i}
            />
          );
        })}
      </Scroll>
      <Environment preset="night" />
    </ScrollControls>
  );
};

interface ProjectShowcase3DCanvasProps {
  className?: string;
}

const ProjectShowcase3DCanvas: React.FC<ProjectShowcase3DCanvasProps> = ({
  className,
}) => {
  return (
    <div className={`w-full h-[600px] md:h-[800px] ${className || ""}`}>
      <AdaptiveCanvas>
        <ShowcaseScene />
      </AdaptiveCanvas>
    </div>
  );
};

export default ProjectShowcase3DCanvas;
