import { useState, useEffect } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const navigateTo = (path: Url) => {
    router.push(path);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TailSpin color="#4fa94d" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      <div className="mb-20"></div>
      <nav className="flex justify-between items-center py-6">
        <div className="text-2xl font-bold"></div>
        <ul className="flex gap-8 list-none text-lg">
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#about")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#services")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#projects")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#contact")}
          ></li>
        </ul>
      </nav>

      <section
        id="profile"
        className="flex flex-col md:flex-row justify-center items-center py-12"
      >
        <div className="rounded-full overflow-hidden w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] relative shadow-lg profile-image">
          <Image
            src="/hero-image.jpg"
            alt="Imagen de perfil"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="text-center ml-4 sm:ml-12 mt-4 md:mt-0">
          <p className="text-xl font-semibold">Hello, I&apos;m</p>
          <h1 className="typewriter-name text-6xl font-bold ">Julian Soto</h1>
          <p className="text-2xl my-4 text-pop">Frontend Developer Junior</p>

          <div className=" justify-center gap-4  ">
            <button
              className="px-1 py-1 sm:w-fit rounded-full bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 hover:bg-slate-700 text-white mt-3 transition-transform duration-300 transform hover:scale-105 mr-5"
              onClick={() => window.open("/cv.pdf")}
            >
              <span className="block bg-[#121212] hover:bg—slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </button>
            <button
              className="px-6 py-3 sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white transition-transform duration-300 transform hover:scale-105"
              onClick={() => navigateTo("#contact")}
            >
              <span> Hire Me </span>
            </button>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/full-stack-julian-soto/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="https://github.com/juliandeveloper05"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4"></div>
        </div>
      </section>
    </>
  );
};

export default Profile;
