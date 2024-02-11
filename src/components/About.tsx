import React from "react";
import Image from "next/image";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="
        min-h-screen
        flex 
        flex-col 
        justify-center
        bg-black 
        text-white
      "
    >
      <div className="container min-h-[50em] mx-auto flex flex-col items-center px-4 md:flex-row ">
        <div className="mb-10 md:mb-0 md:w-1/3 flex justify-center md:justify-start ">
          <Image
            className="rounded-full extra"
            src="/foto4.jpeg"
            alt="Profile"
            width={300}
            height={300}
            quality={100}
          />
        </div>
        <div
          className={
            "md:w-2/3 mt-8 md:mt-0 md:ml-10 transition-opacity duration-1000"
          }
        >
          <h2
            className="text-3xl  text-center text-white mb-4  text-pop"
            // style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            About Me
          </h2>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 items-center md:items-start text-lg">
            {/* Experience Box */}
            <div className="flex-1 card-inner">
              <div className="border-2 border-dashed p-4 border-solid-gray-400 rounded-lg shadow-lg text-center">
                <div className="rounded-lg p-4 bg-white text-black flex flex-col text-center justify-center items-center min-h-[100%]">
                  <FaBriefcase className="inline-block mb-2 text-xl text-center " />
                  <h3 className="gamer-font text-lg font-semibold">
                    Experience
                  </h3>
                  <ul className="font-sixtyfour list-disc pl-5">
                    <li>2+ years Frontend Development</li>
                    <li>1+ years Backend Development and Databases</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Box */}
            <div className="flex-1 card-inner">
              <div className="border-2 border-dashed p-4 border-solid-gray-400 rounded-lg shadow-lg text-center">
                <div className="rounded-lg p-4 bg-white text-black flex flex-col text-center justify-center items-center min-h-[100%]">
                  <FaGraduationCap className="inline-block mb-2 text-xl" />
                  <h3 className="gamer-font text-lg font-semibold">
                    Education
                  </h3>
                  <ul className="font-sixtyfour list-disc pl-5">
                    <li>UNQUI (Argentina, Buenos Aires)</li>
                    <li>Degree in computer science, Currently studying</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mt-6 text-center md:text-left text-xl">
            Hello! I&apos;m a driven Junior Frontend Developer, skilled in
            Next.js, Node.js, C#, .NET, and full-stack fundamentals. With
            expertise in databases like MySQL and PostgreSQL and a proficiency
            in CSS, HTML5, and JavaScript, I craft responsive interfaces that
            prioritize user experience. I am committed to continuous skill
            enhancement and apply a learner&apos;s mindset to every project. My
            goal is to deliver efficient, maintainable code, while staying
            abreast of cutting-edge web technologies.
          </p>
        </div>
      </div>

      {/* Page Divider */}
      <div className="mb-4 min-h-20" style={{ overflow: "hidden" }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 180"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "#ffffff",
            width: "225%",
            height: 190,
            transform: "rotate(180deg)",
          }}
        >
          <path
            d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
            opacity=".10"
          />
          <path
            d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
            opacity=".3"
          />
          <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
        </svg>
      </div>
    </section>
  );
};

export default About;
