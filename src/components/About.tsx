import React from "react";
import Image from "next/image";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="bg-black py-20 text-white mb-20">
      <div className="mb-20"></div>
      <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
        <div className="mb-10 md:mb-0 md:w-1/3 flex justify-center md:justify-start">
          <Image
            className="rounded-full profile-image"
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
          <h2 className="text-4xl font-bold text-center md:text-left mb-6  my-4 text-pop">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 items-center md:items-start">
            {/* Experience Box */}
            <div className="flex-1 card-inner">
              <div className="p-4 border border-gray-400 rounded shadow-lg text-center ">
                <FaBriefcase className="inline-block mb-2 text-xl text-center" />
                <h3 className="text-lg font-semibold">Experience</h3>
                <p className="text-gray-300">2+ years Frontend Development</p>
                <p className="text-gray-300">
                  1+ years Backend Development and Databases
                </p>
              </div>
            </div>

            {/* Education Box */}
            <div className="flex-1 card-inner">
              <div className="p-4 border border-gray-400 rounded shadow-lg text-center">
                <FaGraduationCap className="inline-block mb-2 text-xl" />
                <h3 className="text-lg font-semibold">Education</h3>
                <p className="text-gray-300">Universidad Nacional de Quilmes</p>
                <p className="text-gray-300">
                  Degree in computer science, Currently studying
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-6 text-center md:text-left">
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
      <div className="mb-20"></div>
    </section>
  );
};

export default About;
