"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { useTranslation } from "next-i18next";
import { FiChevronDown } from "react-icons/fi";
import StaggerReveal from "./stagger-reveal";

const Timeline = () => {
  const { t } = useTranslation("timeline");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const timelineEvents = [
    {
      year: "2024",
      title: t("events.apx.title"),
      description: t("events.apx.description"),
      details: t("events.apx.details"),
    },
    {
      year: "2023",
      title: t("events.unq.title"),
      description: t("events.unq.description"),
      details: t("events.unq.details"),
    },
    {
      year: "2020-2024",
      title: t("events.soul.title"),
      description: t("events.soul.description"),
      details: t("events.soul.details"),
    },
    {
      year: "2003-2014",
      title: t("events.school.title"),
      description: t("events.school.description"),
      details: t("events.school.details"),
    },
  ];

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-20 md:py-28 bg-transparent overflow-hidden unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent mb-4" />
          <h2 className="text-heading font-semibold text-[var(--theme-text)]">
            {t("title")}
          </h2>
          <p className="mt-3 text-body-lg text-[var(--theme-text-muted)]">{t("subtitle")}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - visible on both mobile and desktop */}
          <motion.div
            className={`absolute ${isMobile ? 'left-4' : 'left-1/2 -translate-x-1/2'} w-px h-full bg-[var(--theme-accent)]/20`}
            style={{ scaleY: scaleX }}
          />

          <StaggerReveal className="space-y-8" staggerDelay={0.12}>
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={event.year}
                event={event}
                index={index}
                isExpanded={expandedEvent === index}
                onToggle={() =>
                  setExpandedEvent(expandedEvent === index ? null : index)
                }
                isMobile={isMobile}
              />
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
};

interface TimelineEventProps {
  event: {
    year: string;
    title: string;
    description: string;
    details: string;
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const TimelineEvent = ({
  event,
  index,
  isExpanded,
  onToggle,
  isMobile,
}: TimelineEventProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (isMobile) {
    return (
      <div ref={ref} className="relative pl-10">
        {/* Dot */}
        <div className="absolute left-4 top-6 -translate-x-1/2">
          <div className="w-2.5 h-2.5 bg-[var(--theme-accent)] rounded-full relative">
            <div className="absolute inset-0 rounded-full bg-[var(--theme-accent)] animate-pulse-ring" />
          </div>
        </div>
        <motion.div
          className="cursor-pointer"
          onClick={onToggle}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <EventCard event={event} isExpanded={isExpanded} />
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        className={`flex items-center w-full ${
          index % 2 === 0 ? "flex-row-reverse" : "flex-row"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className="w-5/12" />
        <div className="z-20 mx-4">
          <div className="relative">
            <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full" />
            <div className="absolute inset-0 rounded-full bg-[var(--theme-accent)] animate-pulse-ring" />
          </div>
        </div>
        <motion.div
          className="w-5/12 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggle}
        >
          <EventCard event={event} isExpanded={isExpanded} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const EventCard = ({
  event,
  isExpanded,
}: {
  event: TimelineEventProps["event"];
  isExpanded: boolean;
}) => (
  <div className="p-5 backdrop-blur-sm bg-[var(--theme-surface-1)] rounded-2xl border border-[var(--theme-border)] border-l-2 border-l-[var(--theme-accent)]/40 hover:border-[var(--theme-surface-3)] transition-all duration-300">
    <span className="inline-block bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] px-3 py-1 rounded-full text-xs font-mono mb-2">
      {event.year}
    </span>
    <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-1">{event.title}</h3>
    <p className="text-[var(--theme-text-muted)] text-sm">{event.description}</p>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="mt-3 text-sm text-[var(--theme-text-muted)] leading-relaxed">{event.details}</p>
    </motion.div>
    <div className="mt-2 flex items-center gap-1 text-[var(--theme-text-muted)] text-xs">
      <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      <span>{isExpanded ? 'Less' : 'More'}</span>
    </div>
  </div>
);

export default Timeline;
