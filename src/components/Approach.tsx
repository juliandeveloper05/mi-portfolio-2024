"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../components/ui/canvas-reveal-effect";
import { useTranslation } from "next-i18next";
import SectionHeading from "./section-heading";

const Approach = () => {
  const { t } = useTranslation("approach");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <section className="w-full py-20 md:py-28 unselectable" aria-hidden="true" />;
  }

  return (
    <section className="w-full py-20 md:py-28 unselectable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("approach1")}</SectionHeading>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-5">
          <Card
            title={t("showme_title1")}
            icon={<StepNumber number="01" label={t("showme1")} />}
            description={t("showme_description1")}
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
            />
          </Card>
          <Card
            title={t("showme_title2")}
            icon={<StepNumber number="02" label={t("showme2")} />}
            description={t("showme_description2")}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
          </Card>
          <Card
            title={t("showme_title3")}
            icon={<StepNumber number="03" label={t("showme3")} />}
            description={t("showme_description3")}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-[var(--theme-border)] group/canvas-card flex flex-col items-center justify-center max-w-sm w-full mx-auto p-6 relative h-[24rem] lg:h-[28rem] rounded-2xl bg-[var(--theme-surface-1)] backdrop-blur-sm hover:border-[var(--theme-surface-3)] transition-all duration-300"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 rounded-2xl overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-5 unselectable">
        <div className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-300">
          {icon}
        </div>
        <h2 className="opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-white mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-300 text-center text-2xl lg:text-3xl">
          {title}
        </h2>
        <p className="text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-white/80 mt-4 group-hover/canvas-card:-translate-y-2 transition duration-300 text-center leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const StepNumber = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-6xl font-bold text-[var(--theme-text-muted)]/30">{number}</span>
      <span className="text-sm text-[var(--theme-text-muted)] font-medium">{label}</span>
    </div>
  );
};

export default Approach;
