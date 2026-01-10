import React, { useRef, useMemo } from "react";
import { motion, useMotionTemplate, useSpring, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { ProjectCardProps } from "./types";
import { TechBadge } from "./TechBadge";
import { ProjectImage } from "./ProjectImage";
import { useSpotlight } from "./useSpotlight";
import { SpotlightEffect } from "./SpotlightEffect";

/**
 * Individual Project Card Component.
 * 
 * Architectural Decisions:
 * 1. React.memo: This component is wrapped in React.memo to prevent unnecessary re-renders
 *    when sibling cards update their state. Props must be stable (memoized) in the parent.
 * 2. Reduced Motion: Respects 'prefers-reduced-motion' by disabling expensive animations
 *    (spotlight, parallax) and simplifying transitions to instantaneous or simple fades.
 * 3. Spotlight Integration: Decoupled logic via useSpotlight hook.
 * 
 * @param props - ProjectCardProps containing project data and hover handlers
 */
export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onHover }) => {
  const { t } = useTranslation("projects");
  const cardRef = useRef<HTMLElement>(null);
  const spotlight = useSpotlight(cardRef);
  const shouldReduceMotion = useReducedMotion();

  // Parallax Calculation
  const mouseX = spotlight.x;
  const mouseY = spotlight.y;
  const cardWidth = spotlight.width || 1; // Avoid division by zero
  const cardHeight = spotlight.height || 1;

  // Calculate normalized coordinates (-1 to 1)
  const normX = (mouseX / cardWidth) * 2 - 1;
  const normY = (mouseY / cardHeight) * 2 - 1;

  // Use spring for smooth parallax
  const xSpring = useSpring(0, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(0, { stiffness: 50, damping: 20 });

  // Update springs when spotlight changes (only if inside and motion is allowed)
  React.useEffect(() => {
    if (shouldReduceMotion) return;
    
    if (spotlight.opacity > 0) {
      xSpring.set(normX * -10); // Move opposite to mouse for depth
      ySpring.set(normY * -10);
    } else {
        xSpring.set(0);
        ySpring.set(0);
    }
  }, [normX, normY, spotlight.opacity, xSpring, ySpring, shouldReduceMotion]);

  // Bezier curves
  const easeOut = [0.4, 0.0, 0.2, 1];
  const easeIn = [0.0, 0.0, 0.2, 1];

  return (
    <motion.article
      ref={cardRef}
      className={`relative h-[480px] w-full rounded-2xl bg-[#0B1121] border border-white/5 overflow-hidden group`}
      onMouseEnter={() => onHover && onHover(project.id)}
      onMouseLeave={() => onHover && onHover(null)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {!shouldReduceMotion && (
        <SpotlightEffect x={spotlight.x} y={spotlight.y} opacity={spotlight.opacity} />
      )}

      {/* Image Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
            x: shouldReduceMotion ? 0 : xSpring, 
            y: shouldReduceMotion ? 0 : ySpring, 
            scale: 1.1 
        }} // Scale up slightly to avoid edge clipping
      >
        <ProjectImage 
          src={project.image} 
          alt={project.title} 
          priority={project.id === 1} 
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-auto">
           <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
             <span className="text-xs font-mono text-[#00ff9d]">{project.date}</span>
           </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-auto space-y-4">
          <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-premium motion-reduce:transition-none motion-reduce:translate-y-0">
            <h3 className="text-2xl font-bold text-white group-hover:text-[#00ff9d] transition-colors duration-300 drop-shadow-lg">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-white/90 transition-colors">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-premium motion-reduce:transition-none motion-reduce:translate-y-0">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-premium motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 px-3 py-1.5 rounded-lg backdrop-blur-sm hover:scale-105 transition-all ml-auto border border-[#00ff9d]/20"
              aria-label={`Visit live demo for ${project.title}`}
            >
              <span className="text-[#00ff9d] font-medium">Live Demo</span>
              <FaExternalLinkAlt className="text-xs text-[#00ff9d]" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Border */}
      <div 
        className={`absolute inset-0 border-2 border-transparent rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:animate-gradient-xy motion-reduce:animate-none`} 
        style={{ 
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
          maskComposite: 'exclude', 
          WebkitMaskComposite: 'xor',
          backgroundSize: '200% 200%' // Ensure gradient has room to move
        }} 
      />
    </motion.article>
  );
});
