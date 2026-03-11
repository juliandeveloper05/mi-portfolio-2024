import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface ProjectCard3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  color?: string;
  index: number;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  position,
  rotation = [0, 0, 0],
  title,
  description,
  technologies,
  color = "#12b886",
  index,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Subtle floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.1;

    // Hover zoom
    const targetScale = hovered ? 1.08 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color={hovered ? "#1a1a2e" : "#0a0a0a"}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.06, 2.06]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML overlay */}
      <Html
        center
        distanceFactor={6}
        transform
        position={[0, 0, 0.01]}
        style={{ pointerEvents: "none", width: "280px" }}
      >
        <div className="text-center p-4">
          <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
          <p className="text-white/60 text-xs mb-2 line-clamp-2">{description}</p>
          <div className="flex flex-wrap justify-center gap-1">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default ProjectCard3D;
