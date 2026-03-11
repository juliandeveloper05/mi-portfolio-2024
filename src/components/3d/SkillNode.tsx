import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface SkillNodeProps {
  position: [number, number, number];
  label: string;
  category: string;
  color?: string;
}

const SkillNode: React.FC<SkillNodeProps> = ({
  position,
  label,
  category,
  color = "#12b886",
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const scale = hovered ? 1.8 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    // Subtle pulse
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.05;
    meshRef.current.scale.multiplyScalar(pulse);
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Text
          position={[0, 0.25, 0]}
          fontSize={0.12}
          color={hovered ? "#ffffff" : "rgba(255,255,255,0.7)"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Poppins-Medium.ttf"
        >
          {label}
        </Text>
        {hovered && (
          <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
            <div className="glass rounded-lg px-3 py-2 text-xs text-[var(--theme-text)] whitespace-nowrap">
              <p className="font-semibold">{label}</p>
              <p className="text-[var(--theme-text-muted)] text-[10px]">{category}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

export default SkillNode;
