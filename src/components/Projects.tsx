import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import {
  SiNextdotjs,
  SiMongodb,
  SiStripe,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiReact,
} from "react-icons/si";
import { TbApi, TbBrandCodesandbox, TbWaveSine } from "react-icons/tb";
import { Project } from "./projects/types";
import { ProjectCard } from "./projects/ProjectCard";

/**
 * Main Projects Section Orchestrator.
 * 
 * Responsibility:
 * - Manages the domain data (Projects array).
 * - Handles layout and responsive grid structure.
 * - Coordinates shared state (though currently minimal, it sets up the structure for it).
 * 
 * Performance:
 * - The 'projects' array is memoized to ensure referential stability. 
 *   This allows child components (ProjectCard) to effective use React.memo.
 */
const Projects = () => {
  const { t } = useTranslation("projects");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = React.useMemo(() => [
    {
      id: 1,
      title: "Bass Academy",
      description: t("bass_academy.description"),
      date: t("bass_academy.date"),
      technologies: [
        { icon: SiReact, label: "React 19" },
        { icon: TbWaveSine, label: "Web Audio API" },
        { icon: SiTypescript, label: "TypeScript" },
        { icon: TbBrandCodesandbox, label: "Architecture" },
      ],
      image: "/assets/bass-academy-preview.png",
      githubUrl:
        "https://github.com/juliandeveloper05/Bass-Academy-Interactive-Bass-Training",
      liveUrl: "https://bass-academy-interactive-bass-train.vercel.app/",
      gradient: "from-emerald-600/20 via-emerald-800/20 to-emerald-900/20",
    },
    {
      id: 2,
      title: "NexusShop E-Commerce",
      description: t("mp_pantuflones.description"),
      date: t("mp_pantuflones.date"),
      technologies: [
        { icon: SiNextdotjs, label: "Next.js" },
        { icon: SiMongodb, label: "MongoDB" },
        { icon: SiStripe, label: "Stripe" },
        { icon: SiRedux, label: "Redux Toolkit" },
      ],
      image: "/assets/mp-preview.jpg",
      githubUrl:
        "https://github.com/juliandeveloper05/e-commerce-project-mp-2024/tree/main",
      liveUrl: "https://e-commerce-project-mp-2024-second.vercel.app/",
      gradient: "from-purple-600/20 via-purple-800/20 to-purple-900/20",
    },
    {
      id: 3,
      title: "portfolio | Julian Soto",
      description: t("portfolio_2024.description"),
      date: t("portfolio_2024.date"),
      technologies: [
        { icon: SiNextdotjs, label: "Next.js" },
        { icon: SiTailwindcss, label: "Tailwind" },
        { icon: SiFramer, label: "Framer Motion" },
        { icon: SiTypescript, label: "TypeScript" },
      ],
      image: "/assets/portfolio-preview.jpg",
      githubUrl: "https://github.com/juliandeveloper05/mi-portfolio-2024",
      liveUrl: "/",
      gradient: "from-cyan-600/20 via-cyan-800/20 to-cyan-900/20",
    },
    {
      id: 4,
      title: "Soul Solutions",
      description: t("soul_solutions.description"),
      date: t("soul_solutions.date"),
      technologies: [
        { icon: TbBrandCodesandbox, label: "Legacy Migration" },
        { icon: TbApi, label: "System Design" },
        { icon: SiTypescript, label: "API Integration" },
      ],
      image: "/assets/soul-solutions-preview.jpg",
      githubUrl: "https://github.com/juliandeveloper05/soul-solutions",
      liveUrl: "https://soul-solutions-mauve.vercel.app/",
      gradient: "from-blue-600/20 via-blue-800/20 to-blue-900/20",
    },
  ], [t]);

  return (
    <section
      id="projects"
      className="min-h-screen bg-transparent py-12 md:py-20 unselectable"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("projects_title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onHover={setHoveredProject}
              isHovered={hoveredProject === project.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
