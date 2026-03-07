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
  SiExpo,
  SiSupabase,
  SiWordpress,
  SiPhp,
  SiMysql,
  SiPython,
  SiFastapi,
  SiPytorch,
} from "react-icons/si";
import { TbApi, TbBrandCodesandbox, TbWaveSine } from "react-icons/tb";
import { Project } from "./projects/types";
import { ProjectCard } from "./projects/ProjectCard";

const Projects = () => {
  const { t } = useTranslation("projects");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = React.useMemo(() => [
    {
      id: 1,
      title: "Bitrova",
      description: t("bitrova.description"),
      date: t("bitrova.date"),
      technologies: [
        { icon: SiReact, label: "React Native 0.81" },
        { icon: SiExpo, label: "Expo 54" },
        { icon: SiSupabase, label: "Supabase" },
        { icon: TbBrandCodesandbox, label: "Reanimated 4" },
      ],
      image: "/assets/bitrova-preview.png",
      githubUrl: "https://github.com/juliandeveloper05/tasklist-app",
      liveUrl: "",
      gradient: "from-violet-600/20 via-violet-800/20 to-violet-900/20",
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
      title: "Dumu — AI Bass Extraction",
      description: t("dumu.description"),
      date: t("dumu.date"),
      technologies: [
        { icon: SiPython, label: "Python" },
        { icon: SiFastapi, label: "FastAPI" },
        { icon: SiPytorch, label: "PyTorch" },
        { icon: SiReact, label: "React" },
      ],
      image: "/assets/dumu-preview.png",
      githubUrl: "https://github.com/juliandeveloper05/Dumu-AI-Bass-Extraction",
      liveUrl: "https://dumu.vercel.app/",
      gradient: "from-green-600/20 via-green-800/20 to-green-900/20",
    },
    {
      id: 5,
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
    {
      id: 6,
      title: "Forma Real",
      description: t("forma_real.description"),
      date: t("forma_real.date"),
      technologies: [
        { icon: SiWordpress, label: "WordPress 6.9" },
        { icon: SiPhp, label: "PHP 8+" },
        { icon: SiMysql, label: "MySQL" },
        { icon: TbBrandCodesandbox, label: "OOP Architecture" },
      ],
      image: "/assets/forma-real-preview.png",
      githubUrl: "https://github.com/juliandeveloper05/forma-real",
      liveUrl: "",
      gradient: "from-orange-600/20 via-red-700/20 to-red-900/20",
    },
  ], [t]);

  return (
    <section
      id="projects"
      className="bg-transparent py-20 md:py-28 unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent mb-4" />
          <h2 className="text-heading font-semibold text-center text-[var(--theme-text)]">
            {t("projects_title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
