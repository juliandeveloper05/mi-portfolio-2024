import React from "react";
import Image from "next/image";
import { FaBriefcase, FaCode } from "react-icons/fa";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation("about");

  const frontendStack = [
    "Next.js", "React 19", "React Native", "TypeScript", "HTML5", "CSS3", "Tailwind CSS",
  ];

  const backendStack = [
    "Node.js", "PHP 8", "WordPress", "MySQL", "PostgreSQL", "MongoDB", "Supabase",
  ];

  const aiStack = [
    "Python", "FastAPI", "PyTorch", "TensorFlow", "Machine Learning", "Hugging Face",
  ];

  const otherStack = [
    "OOP Patterns", "Cloud Sync", "Web Audio API", "Architecture", "Systems Design",
  ];

  return (
    <section
      id="about"
      className="bg-transparent text-[var(--theme-text)] unselectable"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {/* Image Card */}
          <div className="md:col-span-2 glass rounded-2xl overflow-hidden p-1">
            <div className="rounded-xl overflow-hidden relative aspect-square md:aspect-auto md:h-full">
              <Image
                className="object-cover rounded-xl"
                src="/about-me.jpg"
                alt="About Julian Soto"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                priority
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
          <div className="md:col-span-1 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <FaBriefcase className="text-2xl text-[var(--theme-accent)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">{t("experience1")}</h3>
            <div className="text-sm text-[var(--theme-text-secondary)] space-y-1">
              <p>{t("experience2")}</p>
              <p>{t("experience3")}</p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="md:col-span-1 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <FaCode className="text-2xl text-[var(--theme-accent)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--theme-text)] mb-2">{t("projects1")}</h3>
            <div className="text-sm text-[var(--theme-text-secondary)] space-y-1">
              <p>{t("projects2")}</p>
              <p>{t("projects3")}</p>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-2 glass rounded-2xl p-6 md:p-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--theme-accent)] mb-4">Tech Stack</h3>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider">Frontend</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {frontendStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[var(--theme-surface-2)] hover:bg-[var(--theme-surface-3)] px-3 py-1.5 rounded-full text-xs text-[var(--theme-text-secondary)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider">Backend & Data</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {backendStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[var(--theme-surface-2)] hover:bg-[var(--theme-surface-3)] px-3 py-1.5 rounded-full text-xs text-[var(--theme-text-secondary)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider">AI & ML</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {aiStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[var(--theme-surface-2)] hover:bg-[var(--theme-surface-3)] px-3 py-1.5 rounded-full text-xs text-[var(--theme-text-secondary)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider">Architecture</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {otherStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[var(--theme-surface-2)] hover:bg-[var(--theme-surface-3)] px-3 py-1.5 rounded-full text-xs text-[var(--theme-text-secondary)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
