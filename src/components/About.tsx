import React, { useState } from "react";
import Image from "next/image";
import { FaBriefcase, FaCode } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Skeleton from "./skeleton";
import StaggerReveal from "./stagger-reveal";

const About = () => {
  const { t } = useTranslation("about");
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="bg-transparent text-[var(--theme-text)] unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5" staggerDelay={0.1}>
          {/* Image Card */}
          <div className="md:col-span-2 glass rounded-2xl overflow-hidden p-1">
            <div className="rounded-xl overflow-hidden relative aspect-square md:aspect-auto md:h-full">
              {!imageLoaded && <Skeleton className="absolute inset-0" rounded="rounded-xl" />}
              <Image
                className={`object-cover rounded-xl transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                src="/about-me.jpg"
                alt="About Julian Soto"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                priority
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Text Content Card */}
          <div className="md:col-span-2 glass rounded-2xl p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-heading font-semibold text-[var(--theme-text)] mb-4">
              {t("about_description_hello")}
            </h2>
            <p className="text-body-lg text-[var(--theme-text-secondary)] leading-relaxed mb-3">
              {t("about_description1")}
            </p>
            <p className="text-body-lg text-[var(--theme-text-secondary)] leading-relaxed">
              {t("about_description2")}
            </p>
          </div>

          {/* Experience Card */}
          <div className="md:col-span-2 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <FaBriefcase className="text-2xl text-[var(--theme-accent)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">{t("experience1")}</h3>
            <div className="text-sm text-[var(--theme-text-secondary)] space-y-1">
              <p>{t("experience2")}</p>
              <p>{t("experience3")}</p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="md:col-span-2 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <FaCode className="text-2xl text-[var(--theme-accent)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">{t("projects1")}</h3>
            <div className="text-sm text-[var(--theme-text-secondary)] space-y-1">
              <p>{t("projects2")}</p>
              <p>{t("projects3")}</p>
            </div>
          </div>

        </StaggerReveal>
      </div>
    </section>
  );
};

export default About;
