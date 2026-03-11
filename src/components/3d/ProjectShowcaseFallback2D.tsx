import React from "react";
import { motion } from "framer-motion";

interface ProjectShowcaseFallback2DProps {
  children: React.ReactNode;
}

const ProjectShowcaseFallback2D: React.FC<ProjectShowcaseFallback2DProps> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Existing project grid wrapped with subtle parallax */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default ProjectShowcaseFallback2D;
