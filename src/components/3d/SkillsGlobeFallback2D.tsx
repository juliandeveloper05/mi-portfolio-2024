import React from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { label: "Next.js", category: "Frontend" },
  { label: "React", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },
  { label: "Tailwind", category: "Frontend" },
  { label: "React Native", category: "Frontend" },
  { label: "Node.js", category: "Backend" },
  { label: "PostgreSQL", category: "Backend" },
  { label: "MongoDB", category: "Backend" },
  { label: "PHP", category: "Backend" },
  { label: "Python", category: "AI/ML" },
  { label: "PyTorch", category: "AI/ML" },
  { label: "TensorFlow", category: "AI/ML" },
  { label: "FastAPI", category: "AI/ML" },
  { label: "Three.js", category: "Architecture" },
  { label: "OOP", category: "Architecture" },
  { label: "Cloud", category: "Architecture" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "rgba(18, 184, 134, 0.15)",
  Backend: "rgba(32, 201, 151, 0.15)",
  "AI/ML": "rgba(56, 217, 169, 0.15)",
  Architecture: "rgba(99, 230, 190, 0.15)",
};

const SkillsGlobeFallback2D: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="px-4 py-2 rounded-full border border-[var(--theme-border)] text-sm text-[var(--theme-text-secondary)] cursor-default"
            style={{ background: CATEGORY_COLORS[skill.category] }}
          >
            {skill.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGlobeFallback2D;
