import React from "react";
import Image from "next/image";
import { FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import ScrollDown from "./scroll-down";
import MagneticWrapper from "./magnetic-wrapper";
import { Link } from "react-scroll";

const SectionTitle = styled.div`
  font-size: 3rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechBadge = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const About = () => {
  const { t } = useTranslation("about");

  const techStack = [
    "Next.js",
    "React 19",
    "React Native",
    "TypeScript",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Cloud Sync",
    "Web Audio API",
    "Architecture",
    "Systems Design",
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center bg-transparent text-white unselectable"
    >
      <div className="container min-h-[40em] mx-auto flex flex-col items-center px-4 md:flex-row">
        <div className="md:mb-0 md:w-1/3 flex justify-center md:justify-start">
          <Image
            className="rounded-full extra border-4 w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
            src="/about-me.jpg"
            alt="Profile"
            width={400}
            height={400}
            quality={100}
          />
        </div>

        <div className="md:w-2/3 mt-8 md:mt-0 md:ml-10 flex flex-col">
          <div className="flex flex-col">
            <SectionTitle className="text-gray-300 text-center md:text-left font-thin">
              {t("about_description_hello")}
            </SectionTitle>

            <div className="text-gray-300 text-center mt-4 md:text-left text-xl font-light">
              {t("about_description1")}
            </div>

            <div className="text-gray-300 text-center md:text-left text-xl font-light">
              {t("about_description2")}
            </div>

            <TechStack>
              {techStack.map((tech, index) => (
                <TechBadge key={index}>{tech}</TechBadge>
              ))}
            </TechStack>
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-start mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 card-inner">
              <div className="flex-auto border-2 border-dashed p-4 border-solid-gray-400 rounded-lg">
                <div className="rounded-lg p-4 bg-white text-black flex flex-col items-center">
                  <FaBriefcase className="text-2xl mb-2" />
                  <h3 className="text-xl font-semibold">{t("experience1")}</h3>
                  <ul className="list-disc pl-5">
                    <div>{t("experience2")}</div>
                    <div>{t("experience3")}</div>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex-1 card-inner">
              <div className="flex-auto border-2 border-dashed p-4 border-solid-gray-400 rounded-lg">
                <div className="rounded-lg p-4 bg-white text-black flex flex-col items-center">
                  <FaCode className="text-2xl mb-2" />
                  <h3 className="text-xl font-semibold">{t("projects1")}</h3>
                  <ul className="list-disc pl-5">
                    <div>{t("projects2")}</div>
                    <div>{t("projects3")}</div>
                  </ul>
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
