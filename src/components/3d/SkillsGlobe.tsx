import React, { useMemo } from "react";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import SkillNode from "./SkillNode";
import AdaptiveCanvas from "./AdaptiveCanvas";

interface Skill {
  label: string;
  category: string;
  color: string;
}

const SKILLS: Skill[] = [
  { label: "Next.js", category: "Frontend", color: "#12b886" },
  { label: "React", category: "Frontend", color: "#12b886" },
  { label: "TypeScript", category: "Frontend", color: "#12b886" },
  { label: "Tailwind", category: "Frontend", color: "#12b886" },
  { label: "React Native", category: "Frontend", color: "#12b886" },
  { label: "Node.js", category: "Backend", color: "#20c997" },
  { label: "PostgreSQL", category: "Backend", color: "#20c997" },
  { label: "MongoDB", category: "Backend", color: "#20c997" },
  { label: "PHP", category: "Backend", color: "#20c997" },
  { label: "Python", category: "AI/ML", color: "#38d9a9" },
  { label: "PyTorch", category: "AI/ML", color: "#38d9a9" },
  { label: "TensorFlow", category: "AI/ML", color: "#38d9a9" },
  { label: "FastAPI", category: "AI/ML", color: "#38d9a9" },
  { label: "Three.js", category: "Architecture", color: "#63e6be" },
  { label: "OOP", category: "Architecture", color: "#63e6be" },
  { label: "Cloud", category: "Architecture", color: "#63e6be" },
];

// Fibonacci sphere distribution for even spacing
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([
      Math.cos(theta) * radiusAtY * radius,
      y * radius,
      Math.sin(theta) * radiusAtY * radius,
    ]);
  }
  return points;
}

const GlobeScene: React.FC = () => {
  const positions = useMemo(
    () => fibonacciSphere(SKILLS.length, 2.5),
    []
  );

  // Connection lines between skills in the same category
  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < SKILLS.length; i++) {
      for (let j = i + 1; j < SKILLS.length; j++) {
        if (SKILLS[i].category === SKILLS[j].category) {
          lines.push({
            start: positions[i],
            end: positions[j],
            color: SKILLS[i].color,
          });
        }
      }
    }
    return lines;
  }, [positions]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />

      {/* Central wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#12b886"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Skill nodes */}
      {SKILLS.map((skill, i) => (
        <SkillNode
          key={skill.label}
          position={positions[i]}
          label={skill.label}
          category={skill.category}
          color={skill.color}
        />
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color={conn.color}
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </>
  );
};

interface SkillsGlobeCanvasProps {
  className?: string;
}

const SkillsGlobeCanvas: React.FC<SkillsGlobeCanvasProps> = ({ className }) => {
  return (
    <div className={`w-full h-[400px] md:h-[500px] ${className || ""}`}>
      <AdaptiveCanvas>
        <GlobeScene />
      </AdaptiveCanvas>
    </div>
  );
};

export default SkillsGlobeCanvas;
