import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { terrainVertexShader, terrainFragmentShader } from "./TerrainShader";
import FloatingParticles from "./FloatingParticles";
import AdaptiveCanvas from "./AdaptiveCanvas";

const Terrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();
  const quality = useAdaptiveQuality();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 1.2 },
      uFrequency: { value: 0.35 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#12b886") },
      uColorHigh: { value: new THREE.Color("#38d9a9") },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.getElapsedTime();

    // Smooth mouse follow
    mouseRef.current.lerp(pointer, 0.05);
    material.uniforms.uMouse.value.copy(mouseRef.current);
  });

  const segments = quality.terrainSegments;

  return (
    <>
      <fog attach="fog" args={["#000000", 5, 25]} />
      <ambientLight intensity={0.3} />

      <mesh
        ref={meshRef}
        rotation={[-Math.PI * 0.35, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <planeGeometry args={[20, 20, segments, segments]} />
        <shaderMaterial
          vertexShader={terrainVertexShader}
          fragmentShader={terrainFragmentShader}
          uniforms={uniforms}
          wireframe
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <FloatingParticles count={quality.particleCount} />
    </>
  );
};

interface TerrainHeroCanvasProps {
  className?: string;
}

const TerrainHeroCanvas: React.FC<TerrainHeroCanvasProps> = ({ className }) => {
  return (
    <AdaptiveCanvas
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <Terrain />
    </AdaptiveCanvas>
  );
};

export default TerrainHeroCanvas;
