"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useTranslation } from "next-i18next";

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
      className="py-20 bg-transparent overflow-hidden unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-300">{t("subtitle")}</p>
        </motion.div>

        <div className="relative">
          {!isMobile && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#00ff9d]/20"
              style={{ scaleY: scaleX }}
            />
          )}

          <div className="space-y-12 md:space-y-8">
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
          </div>
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

  const desktopEventContent = (
    <motion.div
      className={`flex items-center w-full ${
        index % 2 === 0 ? "flex-row-reverse" : "flex-row"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20 mx-4">
        <div className="flex items-center justify-center w-3 h-3 bg-[#00ff9d] rounded-full" />
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
  );

  const mobileEventContent = (
    <div className="w-full px-4">
      <motion.div className="cursor-pointer" onClick={onToggle}>
        <EventCard event={event} isExpanded={isExpanded} />
      </motion.div>
    </div>
  );

  return (
    <div ref={ref}>{isMobile ? mobileEventContent : desktopEventContent}</div>
  );
};

const EventCard = ({
  event,
  isExpanded,
}: {
  event: TimelineEventProps["event"];
  isExpanded: boolean;
}) => (
  <div className="p-4 backdrop-blur-sm bg-black/50 rounded-lg shadow-md border border-[#00ff9d]/10">
    <span className="font-bold text-[#00ff9d]">{event.year}</span>
    <h3 className="text-lg font-semibold mb-1 text-white">{event.title}</h3>
    <p className="text-gray-300">{event.description}</p>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="mt-2 text-sm text-gray-400">{event.details}</p>
    </motion.div>
  </div>
);

export default Timeline;
