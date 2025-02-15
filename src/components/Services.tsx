// components/Services.tsx
import React from "react";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";
import { cn } from "@/utils/cn";

interface ServiceCardProps {
  title: string;
  description: string;
  technologies: { icon: React.ElementType; name: string }[];
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  technologies,
  index,
  isHovered,
  onHover,
}) => {
  return (
    <motion.div
      className="relative group block p-4 h-full w-full"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 h-full rounded-xl border border-slate-800 bg-black/50 p-6 backdrop-blur-sm transition-colors",
          isHovered ? "border-slate-700" : "border-slate-800"
        )}
      >
        <h3 className="mb-4 text-2xl font-semibold text-[#00ff9d]">{title}</h3>
        <p className="mb-6 text-gray-300">{description}</p>

        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-sm text-gray-400 transition-all duration-300 hover:bg-black/50"
            >
              <tech.icon className="h-4 w-4 transform transition-all duration-300 group-hover:scale-110 group-hover:text-[#00ff9d]" />
              <span className="transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation("services");
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const services = [
    {
      title: t("frontend_dev.title"),
      description: t("frontend_dev.description"),
      technologies: [
        { icon: SiReact, name: "React" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiTailwindcss, name: "Tailwind" },
        { icon: SiTypescript, name: "TypeScript" },
      ],
    },
    {
      title: t("backend_dev.title"),
      description: t("backend_dev.description"),
      technologies: [
        { icon: SiNodedotjs, name: "Node.js" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiTypescript, name: "TypeScript" },
      ],
    },
    {
      title: t("database_dev.title"),
      description: t("database_dev.description"),
      technologies: [
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiNextdotjs, name: "Next.js API" },
      ],
    },
    {
      title: t("fullstack_dev.title"),
      description: t("fullstack_dev.description"),
      technologies: [
        { icon: SiReact, name: "React" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiTailwindcss, name: "Tailwind" },
      ],
    },
  ];

  return (
    <section id="services" className="bg-transparent">
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("services1")}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
