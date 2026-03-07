import React, { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { ProjectCardProps } from "./types";
import { TechBadge } from "./TechBadge";
import { ProjectImage } from "./ProjectImage";
import { useSpotlight } from "./useSpotlight";
import { SpotlightEffect } from "./SpotlightEffect";

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onHover }) => {
  const { t } = useTranslation("projects");
  const cardRef = useRef<HTMLElement>(null);
  const spotlight = useSpotlight(cardRef);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = spotlight.x;
  const mouseY = spotlight.y;
  const cardWidth = spotlight.width || 1;
  const cardHeight = spotlight.height || 1;

  const normX = (mouseX / cardWidth) * 2 - 1;
  const normY = (mouseY / cardHeight) * 2 - 1;

  const xSpring = useSpring(0, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(0, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    if (shouldReduceMotion) return;

    if (spotlight.opacity > 0) {
      xSpring.set(normX * -10);
      ySpring.set(normY * -10);
    } else {
        xSpring.set(0);
        ySpring.set(0);
    }
  }, [normX, normY, spotlight.opacity, xSpring, ySpring, shouldReduceMotion]);

  return (
    <motion.article
      ref={cardRef}
      className="relative h-[420px] md:h-[480px] w-full rounded-2xl bg-[var(--theme-surface-1)] backdrop-blur-sm border border-[var(--theme-border)] overflow-hidden group"
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

      <motion.div
        className="absolute inset-0 z-0"
        style={{
            x: shouldReduceMotion ? 0 : xSpring,
            y: shouldReduceMotion ? 0 : ySpring,
            scale: 1.1
        }}
      >
        <ProjectImage
          src={project.image}
          alt={project.title}
          priority={project.id === 1}
        />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
        <div className="flex justify-between items-start mb-auto">
           <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.08]">
             <span className="text-xs font-mono text-[var(--theme-accent)]">{project.date}</span>
           </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo motion-reduce:transition-none motion-reduce:translate-y-0">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--theme-accent)] transition-colors duration-300 drop-shadow-lg">
              {project.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-white/80 transition-colors">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out-expo motion-reduce:transition-none motion-reduce:translate-y-0">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>

          <div className="flex gap-3 pt-3 border-t border-white/[0.06] md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100 ease-out-expo motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors bg-white/[0.06] hover:bg-white/[0.12] px-3 py-1.5 rounded-lg backdrop-blur-sm"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 hover:bg-[var(--theme-accent)]/20 px-3 py-1.5 rounded-lg backdrop-blur-sm hover:scale-105 transition-all ml-auto border border-[var(--theme-accent)]/20"
                aria-label={`Visit live demo for ${project.title}`}
              >
                <span className="font-medium">Live Demo</span>
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 border-2 border-transparent rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:animate-gradient-xy motion-reduce:animate-none`}
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          backgroundSize: '200% 200%'
        }}
      />
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";
