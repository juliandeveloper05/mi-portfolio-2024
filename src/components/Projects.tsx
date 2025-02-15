import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiStripe,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
} from "react-icons/si";

const Projects = () => {
  const { t } = useTranslation("projects");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "MP Pantuflones",
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
      id: 2,
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
  ];

  const TechItem = ({ Icon, label }: { Icon: any; label: string }) => (
    <motion.div
      className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-black/60 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5 text-[#00ff9d]" />
      <span className="text-sm text-white">{label}</span>
    </motion.div>
  );

  return (
    <section
      id="projects"
      className="min-h-screen bg-transparent py-12 md:py-20"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative rounded-3xl bg-gradient-to-br ${project.gradient} p-[1px] group overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-full bg-[#0B1121] rounded-3xl overflow-hidden">
                {/* Imagen de fondo con overlay */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3
                      className="text-2xl text-[#00ff9d] font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                      {project.date}
                    </span>
                  </div>

                  {/* Descripción */}
                  <motion.p
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <AnimatePresence>
                      {project.technologies.map((tech, idx) => (
                        <motion.div
                          key={`${project.id}-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <TechItem Icon={tech.icon} label={tech.label} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Enlaces */}
                  <div className="flex gap-4 mt-auto">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-[#00ff9d] transition-colors bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-xl" />
                      <span>{t("buttons.code")}</span>
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-[#00ff9d] transition-colors bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-lg" />
                      <span>{t("buttons.live_demo")}</span>
                    </motion.a>
                  </div>

                  {/* Círculo decorativo */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#00ff9d]"
                    animate={{
                      scale: hoveredProject === project.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: hoveredProject === project.id ? Infinity : 0,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
