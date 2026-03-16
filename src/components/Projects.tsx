import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import SectionHeading from "./section-heading";
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
import { Project, ProjectCategory } from "./projects/types";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectFilterBar } from "./projects/ProjectFilterBar";
import { useAnalytics } from "@/hooks/useAnalytics";

const Projects = () => {
  const { t } = useTranslation("projects");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { trackEvent } = useAnalytics();

  const handleCategoryChange = useCallback(
    (category: "all" | ProjectCategory) => {
      setActiveCategory(category);
      trackEvent("filter_use", { category, searchQuery });
    },
    [trackEvent, searchQuery]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    []
  );

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
      category: "mobile",
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
      category: "web",
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
      category: "web",
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
      category: "ai",
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
      category: "consulting",
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
      category: "web",
    },
  ], [t]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) =>
          tech.label.toLowerCase().includes(query)
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section
      className="bg-transparent py-20 md:py-28 unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("projects_title")}</SectionHeading>

        <ProjectFilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProjectCard
                  project={project}
                  onHover={setHoveredProject}
                  isHovered={hoveredProject === project.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[var(--theme-text-secondary)] text-lg">
              {t("filters.no_results")}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-[var(--theme-accent)] hover:underline text-sm font-medium transition-colors"
            >
              {t("filters.clear_filters")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
