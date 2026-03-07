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
  SiSupabase,
  SiPostgresql,
  SiWordpress,
  SiPhp,
  SiMysql,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiFastapi,
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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#12b886]/10 to-[#20c997]/10 rounded-2xl"
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
          "relative z-10 h-full rounded-2xl border bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300",
          isHovered ? "border-white/[0.12] bg-white/[0.04]" : "border-white/[0.06]"
        )}
      >
        <h3 className="mb-4 text-xl font-semibold text-[#12b886]">{title}</h3>
        <p className="mb-6 text-white/60 text-sm leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 transition-all duration-300 hover:bg-white/[0.08] hover:text-white/80"
            >
              <tech.icon className="h-3.5 w-3.5 text-[#12b886]/60 group-hover:text-[#12b886] transition-colors duration-300" />
              <span>{tech.name}</span>
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
        { icon: SiPhp, name: "PHP 8" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiTypescript, name: "TypeScript" },
      ],
    },
    {
      title: t("database_dev.title"),
      description: t("database_dev.description"),
      technologies: [
        { icon: SiMysql, name: "MySQL" },
        { icon: SiPostgresql, name: "PostgreSQL" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiSupabase, name: "Supabase" },
      ],
    },
    {
      title: t("fullstack_dev.title"),
      description: t("fullstack_dev.description"),
      technologies: [
        { icon: SiReact, name: "React" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiSupabase, name: "Supabase" },
        { icon: SiMongodb, name: "MongoDB" },
        { icon: SiTailwindcss, name: "Tailwind" },
      ],
    },
    {
      title: t("cms_dev.title"),
      description: t("cms_dev.description"),
      technologies: [
        { icon: SiWordpress, name: "WordPress" },
        { icon: SiPhp, name: "PHP OOP" },
        { icon: SiMysql, name: "MySQL" },
        { icon: SiTypescript, name: "TypeScript" },
      ],
    },
    {
      title: t("ai_audio.title"),
      description: t("ai_audio.description"),
      technologies: [
        { icon: SiPython, name: "Python" },
        { icon: SiFastapi, name: "FastAPI" },
        { icon: SiPytorch, name: "PyTorch" },
        { icon: SiTensorflow, name: "TensorFlow" },
      ],
    },
  ];

  return (
    <section id="services" className="bg-transparent unselectable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#12b886] to-transparent mb-4" />
          <h2 className="text-heading font-semibold text-center text-white">
            {t("services1")}
          </h2>
        </motion.div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
